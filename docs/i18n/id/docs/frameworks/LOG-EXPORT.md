# Log export (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ekspor log panggilan OmniRoute secara kontinu dan inkremental ke penyimpanan analitik eksternal.

Tab dasbor Logs menyimpan riwayat permintaan di SQLite (`call_logs`), yang dibatasi oleh
rotasi dan retensi. Ekspor log mengirimkan kumpulan catatan yang sama secara terjadwal agar dapat
bertahan lebih lama daripada basis data lokal dan digabungkan dengan data lain. BigQuery adalah
tujuan pertama; pipeline ini merupakan registry, sehingga tujuan lain dapat ditambahkan.

---

## 1. Cara kerjanya

```
server (mendekripsi + memvalidasi konfigurasi, merekonsiliasi kursor)
  → memulai IPC → proses OS exportChild yang terisolasi
    → storage.sqlite hanya-baca → kueri/pemetaan log panggilan bersama
      → hidrasi artefak asinkron → prepare()/send() tujuan
        → IPC batch → server menyimpan kursor → IPC ack
          → batch berikutnya; IPC done → server mencatat keberhasilan
```

- **Jadwal** — satu tugas cron `JobRegistry`, `log_export`, dengan nilai default `0 * * * *` (setiap jam,
  UTC). Didaftarkan di `src/lib/initCloudSync.ts`; dapat ditimpa dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap tick menguras semua tujuan yang **diaktifkan**, secara berurutan.
- **Kursor** — `call_logs.rowid` implisit milik SQLite, disimpan per tujuan di
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak digunakan sebagai kursor: pemanggil
  dapat memberikan nilainya sendiri, sehingga permintaan lambat dapat ditulis setelah permintaan lebih cepat yang dimulai
  belakangan, dan kursor berbasis stempel waktu akan melewatkannya.
- **Batching** — `batch_size` baris per permintaan (default 500), `max_rows_per_run` baris per proses
  (default 10000), sehingga backlog besar dikuras selama beberapa tick alih-alih memblokir satu tick.
- **Pengiriman** — kursor hanya maju setelah `send()` diselesaikan. Batch yang gagal membiarkan
  kursor tetap di posisinya, sehingga baris yang sama dicoba kembali pada proses berikutnya. Jaminannya adalah
  setidaknya sekali ditambah deduplikasi di sisi tujuan, bukan tepat-sekali yang sesungguhnya: BigQuery memberi kunci pada setiap
  baris berdasarkan id log panggilan, yang dipatuhinya sebisa mungkin dalam jendela deduplikasinya sendiri.
- **Pengaman tumpang tindih** — tick cron dan `POST .../run` dapat berjalan bersamaan. Tujuan yang
  sedang dikuras akan dilewati alih-alih dikuras dua kali (`skipped: true` dalam hasil proses),
  sehingga proses bersamaan tidak dapat mengirim ulang batch atau menulis mundur kursor.
- **Pemulihan setelah penghapusan** — jika `cursor_row_id` berakhir di atas `MAX(rowid)` (seluruh tabel
  telah dihapus dan rowid dimulai ulang), runner memundurkan kursor ke 0 agar tidak kehilangan visibilitas secara permanen.

### Runner terisolasi dan batasan

Setiap proses tujuan di Node memulai proses anak OS terpisah yang berumur pendek (`child_process`
dengan IPC, bukan `worker_threads`). Pembacaan body, parsing/serialisasi JSON payload, `prepare()`
tujuan, dan I/O jaringan tujuan semuanya dijalankan di sana, bukan di event loop server.
Hanya konfigurasi dan pesan progres kecil yang melewati IPC; rekaman yang diekspor tidak pernah kembali ke
server. Tugas cron dan rute Jalankan sekarang mempertahankan hasil publik dan pengaman tumpang tindih yang sama.

Proses anak membuka `DATA_DIR/storage.sqlite` yang telah di-resolve oleh server dalam mode hanya-baca menggunakan `node:sqlite`,
dengan `busy_timeout=5000` dan `query_only=ON`. Proses ini tidak mengimpor singleton DB dan tidak melakukan
migrasi, pencadangan, atau pembaruan SQLite. Pembukuan artefak yang hilang/rusak (termasuk
UPDATE artefak rusak) tetap hanya berada di jalur detail dasbor. Kedua jalur menggunakan resolver
detail murni yang sama; ekspor menggunakan pembacaan filesystem asinkron dan urutan resolusi
artefak → inline lama → disk lama → tidak ada yang sama. Suatu proses mengambil snapshot rowid penyisipan maksimum
saat proses anak membuka reader-nya; penyisipan berikutnya menunggu hingga proses selanjutnya. Ini adalah batas
penyisipan, bukan transaksi SQLite berumur panjang: writer WAL dan checkpoint tetap bebas selama
menunggu jaringan. Pembaruan/penghapusan baris yang sudah ada tidak dibekukan oleh batas ini.

Setelah setiap batch diterima, proses anak menunggu acknowledgement. Server terlebih dahulu menyimpan
kursor dengan `advanceLogExportCursor`, lalu mengirim `ack`; tidak ada batch berikutnya yang dimulai sebelum itu.
Kegagalan pengiriman, crash, atau timeout mencatat kegagalan tanpa memajukan batch tersebut. Batch yang
sebelumnya telah menerima acknowledgement tetap di-commit; maksimal satu batch yang belum menerima acknowledgement dapat dikirim ulang.
Keberhasilan hanya dicatat setelah `done` dan proses anak keluar secara bersih. Kegagalan menghentikan proses anak
dengan SIGTERM, yang ditingkatkan menjadi SIGKILL setelah 500 ms, dan runner menunggu proses ditutup.

| Variabel lingkungan                           | Default | Tujuan                                  |
| --------------------------------------------- | ------- | --------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Batas waktu nyata per tujuan            |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Batas old-space V8 proses anak dalam MB |

Nilai yang tidak valid/tidak positif/bukan bilangan bulat menggunakan nilai default. Pengaturan heap bukanlah batas
RSS total; batch yang sangat besar masih dapat menghabiskan memori proses anak dan menggagalkan proses dengan aman.
Nilai default 1024 MB menyediakan ruang cadangan untuk batch default 500 baris berisi artefak 512 KiB dengan
body diaktifkan, termasuk serialisasi JSON BigQuery yang dipotong berdasarkan byte. Nilai ini tidak membuat
batch body 10000 baris menjadi aman. Kehabisan heap V8 mencatat kegagalan yang dapat ditindaklanjuti: kurangi ukuran
batch atau naikkan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor tetap berada pada batch terakhir yang
telah menerima acknowledgement. Body inline/disk historis tidak tercakup dalam batas artefak modern.
Operator harus mengalokasikan RSS secara terpisah, terutama di dalam container dengan memori terbatas.

Proses anak hanya mewarisi `DATA_DIR` yang telah di-resolve, `NODE_ENV`, `TZ` eksplisit (resolusi waktu lokal
untuk nama file lama), `ELECTRON_RUN_AS_NODE` jika tersedia, dan input keluar berikut:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (beserta bentuk huruf kecilnya),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Dispatcher Undici global menggunakan resolusi proxy lingkungan murni dan aturan bypass host lokal
yang sama dengan server, termasuk `NO_PROXY`; dispatcher ini tidak mengimpor `proxyFetch.ts` maupun flag DB/fiturnya.
Kredensial proxy disamarkan dari output yang diteruskan dan kesalahan yang dicatat. Kredensial tujuan
hanya dikirim melalui satu pesan IPC awal, tidak pernah melalui argv atau lingkungan; penerusan output/kesalahan
diberi prefiks dan disanitasi. Hanya `ExperimentalWarning` yang dinonaktifkan dalam argumen eksekusi proses anak untuk menghindari
pengulangan peringatan SQLite Node pada setiap proses cron; jenis peringatan lainnya tetap terlihat.

Modul tujuan harus dapat diimpor tanpa dependensi Next.js/khusus server. Implementasi
BigQuery yang ada sudah memenuhi kontrak tersebut. Cache token akses hanya bertahan selama
proses anak berjalan, bukan lintas proses. Node adalah runtime yang didukung (`package.json`
engines), tetapi bagian instalasi Bun di README dan `Dockerfile.bun` juga menawarkan jalur
kompatibilitas produksi yang menggunakan `bun:sqlite` (`src/lib/db/core.ts` / adaptor). Oleh
karena itu, pada Bun, proses ekspor tetap menggunakan jalur dalam proses sebelumnya dan
mengeluarkan peringatan satu kali: isolasi heap/timeout proses anak tidak tersedia. Gunakan
Node untuk isolasi event loop dan OOM; Bun tidak diperlakukan sebagai khusus pengembangan di sini.

Saat `includeBodies` diaktifkan, pilih interval per menit seperti
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` daripada menumpuk backlog payload setiap jam.
Batas batch dan baris tetap membatasi setiap proses. Biaya startup proses dikenakan per tujuan
per proses; ini menukar sedikit biaya startup dengan isolasi event loop server, bukan mengurangi
total penggunaan CPU.

### Payload (prompt dan completion)

Secara default, ekspor hanya memuat bidang ringkasan yang ditampilkan dalam tampilan **daftar**
Logs. Mengaktifkan **Ekspor prompt dan respons** (`includeBodies`) juga mengirimkan apa yang
ditampilkan panel **detail** Logs untuk setiap panggilan:

| Bidang                           | Isinya                                                             |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Payload panggilan sebagaimana dirender dasbor                      |
| `pipeline_route_decision`        | Target dan model yang dipilih router                               |
| `pipeline_client_request`        | Permintaan mentah persis seperti yang dikirim klien                |
| `pipeline_openai_request`        | Setelah diterjemahkan ke bentuk internal OpenAI                    |
| `pipeline_provider_request`      | Sebagaimana benar-benar dikirim ke upstream, dalam dialek penyedia |
| `pipeline_provider_response`     | Respons mentah dari upstream                                       |
| `pipeline_client_response`       | Yang dikembalikan kepada pemanggil                                 |
| `pipeline_error`                 | Detail galat tingkat pipeline untuk panggilan yang gagal           |
| `bodies_truncated`               | True jika salah satu bidang di atas mencapai `maxBodyBytes`        |

Ini adalah konten prompt, sehingga **dinonaktifkan secara default** dan sengaja menjadi pilihan
per tujuan. Yang dikirim adalah apa yang ditampilkan dasbor, karena ekspor dan `getCallLogById`
menggunakan resolusi detail yang sama: payload
telah dibersihkan dari PII dan disunting untuk menghapus rahasia saat ditulis, dan panggilan yang
dilakukan dengan kunci API `noLog` sama sekali tidak menyimpan payload, sehingga tidak ada yang
dapat diekspor.

Payload dibaca per baris dari artefak sistem berkas, sehingga hidrasi hanya dijalankan untuk
tujuan yang memintanya. Artefak yang hilang atau rusak mengekspor ringkasannya dengan payload
null, alih-alih menggagalkan batch dan membuat kursor tertahan.

`maxBodyBytes` (default 262144) membatasi setiap bidang. Payload yang lebih panjang akan
**dipotong, bukan dibuang** — prompt yang terpotong tetap menjawab "apa yang ditanyakan" — dan
baris tersebut ditandai dengan `bodies_truncated`. Delta streaming per chunk tidak diekspor;
respons yang telah dirakit sudah tersedia di `pipeline_provider_response` dan
`pipeline_client_response`.

---

## 2. Berkas

| Komponen               | Lokasi                                       |
| ---------------------- | -------------------------------------------- |
| Kontrak tujuan         | `src/lib/logExport/types.ts`                 |
| Registri               | `src/lib/logExport/registry.ts`              |
| Penanganan rahasia     | `src/lib/logExport/secrets.ts`               |
| Runner (IPC induk)     | `src/lib/logExport/runner.ts`                |
| Siklus hidup proses    | `src/lib/logExport/childRunner.ts`           |
| Titik masuk child      | `src/lib/logExport/exportChild.ts`           |
| Pembuka hanya-baca     | `src/lib/db/logExportReadOnly.ts`            |
| Kueri/pemetaan bersama | `src/lib/usage/callLogExportQueries.ts`      |
| Resolver detail        | `src/lib/usage/callLogDetailResolver.ts`     |
| Proyeksi API           | `src/lib/logExport/presenter.ts`             |
| Tujuan BigQuery        | `src/lib/logExport/destinations/bigquery.ts` |
| Autentikasi SA Google  | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan   | `src/lib/usage/callLogExportSource.ts`       |
| Persistensi            | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron             | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST           | `src/app/api/log-export/`                    |
| Halaman dasbor         | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Semua rute diautentikasi untuk manajemen (`requireManagementAuth`). Rahasia tidak pernah dikembalikan:
rahasia yang disimpan dikembalikan sebagai nilai literal `__stored__`, dan mengirim kembali nilai tersebut saat pembaruan
akan mempertahankan kredensial yang tersimpan.

Membuat atau memperbarui tujuan yang tipenya mendeklarasikan rahasia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpanya, `encrypt()` hanya meneruskan nilai secara diam-diam, sehingga penulisan
ditolak dengan respons 400 alih-alih menyimpan kredensial ke SQLite sebagai teks biasa (pengamanan yang sama juga
diterapkan oleh webhook Telegram).

| Metode   | Jalur                                    | Tujuan                                                             |
| -------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Tipe tujuan + daftar bidang konfigurasinya                         |
| `GET`    | `/api/log-export/destinations`           | Mencantumkan tujuan (rahasia disamarkan)                           |
| `POST`   | `/api/log-export/destinations`           | Membuat tujuan                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | Membaca satu tujuan                                                |
| `PUT`    | `/api/log-export/destinations/{id}`      | Memperbarui nama / status aktif / konfigurasi / batch              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Menghapus                                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | Menguji kredensial, tanpa menulis apa pun                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Menguras sekarang, melalui jalur yang sama dengan proses terjadwal |
| `GET`    | `/api/log-export/status`                 | Status cron, proses terbaru, backlog per target                    |

`GET /api/log-export/types` memungkinkan UI bersifat generik: formulir dasbor dirender dari
deskriptor bidang yang dikembalikan, sehingga tujuan baru tidak memerlukan perubahan UI.

---

## 4. Tujuan BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Catatan                                                                          |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Proyek GCP yang menampung dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Hanya digunakan saat dataset perlu dibuat (default `EU`)                         |
| `serviceAccountJson` | Kunci akun layanan. Rahasia: dienkripsi saat disimpan, tidak pernah dikembalikan |
| `autoCreate`         | Membuat dataset dan tabel pada ekspor pertama (default `true`)                   |

Akun layanan memerlukan `bigquery.tables.updateData` pada tabel target, ditambah
`bigquery.datasets.create` / `bigquery.tables.create` saat `autoCreate` diaktifkan.

Batch yang dikonfigurasi adalah unit **cursor**, bukan unit HTTP: `send()` membaginya menjadi beberapa panggilan insertAll
dengan maksimal 500 baris, sehingga `batch_size` yang besar tidak akan melampaui batas permintaan 10 MB milik BigQuery.
Status sementara (408/429/500/502/503/504) dicoba ulang hingga tiga kali dengan exponential
backoff, menggunakan kembali insertIds yang sama; kegagalan autentikasi dan skema langsung melempar error pada percobaan pertama
alih-alih menghabiskan proses.

Tabel yang baru dibuat belum langsung terlihat oleh endpoint streaming, yang akan merespons
404 selama beberapa detik. Respons 404 tersebut dicoba ulang, tetapi **hanya ketika proses ini membuat tabel** —
tabel yang benar-benar tidak ada tetap langsung menyebabkan kegagalan. Perhatikan bahwa membuat ulang tabel dengan nama yang
baru saja dihapus akan membuat BigQuery menolak streaming insert selama beberapa menit; hal ini merupakan
karakteristik penghapusan-lalu-pembuatan-ulang, jadi sebaiknya gunakan nama tabel baru daripada menghapus dan menambahkannya kembali.

**Kegagalan parsial diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Kondisi ini diperlakukan sebagai
kegagalan dan melempar error, sehingga cursor tidak bergerak melewati baris yang tidak pernah
diterima BigQuery; `tests/unit/log-export-bigquery.test.ts` memastikan perilaku ini.

Transport menggunakan REST biasa — assertion RS256 yang ditandatangani sendiri ditukarkan dengan token akses di
`https://oauth2.googleapis.com/token`, lalu baris dikirim ke `tabledata.insertAll`. Tidak ada Google SDK yang
disertakan. Token akses disimpan dalam cache di dalam proses untuk setiap pasangan (akun layanan, scope).

Tabel yang dibuat memiliki satu kolom untuk setiap bidang tab Logs ditambah `exported_at`, dan disusun sesuai
cara log panggilan sebenarnya dikueri:

- **Dipartisi per hari berdasarkan `timestamp`**, sehingga kueri yang dibatasi berdasarkan tanggal hanya memindai hari-hari tersebut.
- **Dikelompokkan berdasarkan `api_key_name`, `provider`, `model`, `status`** (dalam urutan tersebut), sehingga pemfilteran berdasarkan
  siapa yang menjalankannya, ke mana permintaan diteruskan, atau apakah terjadi kegagalan akan memangkas blok di dalam setiap partisi. BigQuery
  mengizinkan maksimal empat kolom pengelompokan dan urutannya penting: filter hanya pada `api_key_name`
  dapat memangkas, sedangkan filter hanya pada `status` tidak.
- **Retensi partisi opsional** melalui `partitionExpirationDays` (0 menyimpan semuanya), diterapkan
  saat tabel dibuat.

Kedua pengaturan diterapkan saat pembuatan. Tabel yang sudah ada tetap mempertahankan tata letak yang dimilikinya, jadi
arahkan tujuan ke id tabel baru jika Anda ingin menerapkannya.

`tests/unit/log-export-bigquery.test.ts` memastikan mapper dan skema tabel tetap
selaras, sehingga kolom log panggilan baru tidak dapat dihilangkan secara diam-diam saat diekspor.

Batch dipecah berdasarkan **baik** jumlah baris **maupun** byte yang diserialisasi. Jumlah baris saja tidak cukup
setelah payload diekspor: 500 baris yang berisi prompt dapat berukuran puluhan megabyte, dan insertAll
menolak permintaan yang melebihi 10 MB. Chunk ditutup saat mencapai 500 baris atau 9 MB, mana pun yang tercapai lebih dahulu.

---

## 5. Menambahkan destinasi

1. Buat `src/lib/logExport/destinations/<name>.ts` yang mengekspor `LogExportDestinationType`:
   sebuah `configSchema` Zod, array deskriptor `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkan ke array `DESTINATIONS` di `src/lib/logExport/registry.ts`.
3. Tulis pengujian di bawah `tests/unit/`.

Itulah keseluruhan perubahannya: persistensi, cron job, lapisan REST, enkripsi rahasia, dan
formulir dasbor semuanya membaca registri.

Dua aturan untuk destinasi baru:

- `send()` **harus melempar error** saat terjadi kegagalan parsial. Jika berhasil diselesaikan, artinya "destinasi memiliki baris-baris ini",
  dan kursor akan bergerak melewatinya secara permanen.
- Destinasi yang menerima URL dari pengguna harus memvalidasinya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum melakukan pengambilan,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukan ini: host-nya adalah konstanta.

---

## 6. Mengoperasikannya

- **Dasbor**: Integrasi → Ekspor log. Tambahkan destinasi, jalankan **Uji** untuk memeriksa kredensial
  tanpa menulis baris, lalu aktifkan.
- **Antrean tertunda**: setiap kartu destinasi menampilkan baris tertunda dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama beserta 20 eksekusi job terakhir.
- **Destinasi yang gagal tidak menyebabkan destinasi lain gagal** — ringkasan eksekusi mencatat status per destinasi
  dalam `last_status` / `last_error`, dan riwayat eksekusi job menyimpan hasil agregat.
- **Menghapus destinasi akan menghapus kursornya.** Menambahkannya kembali akan dimulai dari log panggilan tersimpan
  yang paling lama, sehingga baris yang mungkin sudah dimiliki destinasi akan dikirim ulang. Di BigQuery, `insertId`
  per baris hanya menangani hal tersebut dalam jangka waktu deduplikasi milik BigQuery, jadi sebaiknya
  nonaktifkan destinasi daripada menghapusnya.
