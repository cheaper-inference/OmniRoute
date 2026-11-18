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
server (dekripsi + validasi konfigurasi, rekonsiliasi kursor)
  → mulai IPC → proses OS exportChild terisolasi
    → storage.sqlite hanya-baca → kueri/pemetaan log panggilan bersama
      → hidrasi artefak asinkron → prepare()/send() tujuan
        → IPC batch → server menyimpan kursor secara persisten → IPC ack
          → batch berikutnya; IPC done → server mencatat keberhasilan
```

- **Jadwal** — satu tugas cron `JobRegistry`, `log_export`, dengan nilai default `0 * * * *` (setiap jam,
  UTC). Didaftarkan di `src/lib/initCloudSync.ts`; dapat ditimpa dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap pemicu memproses seluruh data tertunda dari setiap tujuan yang **diaktifkan**, secara berurutan.
- **Kursor** — `call_logs.rowid` implisit milik SQLite, disimpan secara persisten per tujuan di
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak dijadikan kursor: pemanggil
  dapat memberikan nilainya sendiri, sehingga permintaan yang lambat dapat ditulis setelah permintaan yang lebih cepat yang dimulai
  belakangan, dan kursor berbasis stempel waktu akan melewatkannya.
- **Pemrosesan batch** — `batch_size` baris per permintaan (default 500), `max_rows_per_run` baris per eksekusi
  (default 10000) agar tumpukan data yang besar diproses dalam beberapa pemicu alih-alih memblokir satu pemicu.
- **Pengiriman** — kursor hanya maju setelah `send()` selesai dengan sukses. Batch yang gagal membiarkan
  kursor tetap di posisinya, sehingga baris yang sama dicoba ulang pada eksekusi berikutnya. Jaminannya adalah
  pengiriman setidaknya sekali ditambah deduplikasi di sisi tujuan, bukan tepat sekali yang sesungguhnya: BigQuery menggunakan id log panggilan sebagai kunci setiap
  baris, yang dipatuhinya sebatas upaya terbaik dalam rentang waktu deduplikasinya sendiri.
- **Pencegah tumpang tindih** — pemicu cron dan `POST .../run` dapat berjalan bersamaan. Tujuan
  yang sedang diproses akan dilewati alih-alih diproses dua kali (`skipped: true` dalam hasil eksekusi),
  sehingga eksekusi serentak tidak dapat mengirim ulang batch atau memundurkan kursor.
- **Pemulihan setelah penghapusan menyeluruh** — jika `cursor_row_id` menjadi lebih besar daripada `MAX(rowid)` (seluruh tabel telah
  dihapus dan rowid dimulai ulang), runner mengembalikannya ke 0 alih-alih kehilangan kemampuan mendeteksi data secara permanen.

### Runner terisolasi dan batasan

Setiap eksekusi tujuan di Node memulai proses anak OS terpisah yang berumur singkat (`child_process`
dengan IPC, bukan `worker_threads`). Pembacaan isi, penguraian/serialisasi JSON payload,
`prepare()` tujuan, dan I/O jaringan tujuan semuanya dijalankan di sana, bukan di event loop server.
Hanya konfigurasi dan pesan progres kecil yang melintasi IPC; rekaman yang diekspor tidak pernah dikembalikan ke
server. Tugas cron dan rute Run now mempertahankan hasil publik dan pencegah tumpang tindih yang sama.

Proses anak membuka `DATA_DIR/storage.sqlite` yang telah diresolusikan oleh server dalam mode hanya-baca menggunakan `node:sqlite`,
dengan `busy_timeout=5000` dan `query_only=ON`. Proses ini tidak mengimpor singleton DB dan tidak melakukan
migrasi, pencadangan, atau pembaruan SQLite. Pencatatan artefak yang hilang/rusak (termasuk
UPDATE untuk artefak rusak) tetap hanya berada di jalur detail dasbor. Kedua jalur menggunakan resolver
detail murni yang sama; ekspor menggunakan pembacaan sistem berkas asinkron dan urutan resolusi yang sama: artefak → inline
lama → disk lama → tidak ada. Sebuah eksekusi mengambil snapshot rowid penyisipan maksimum
saat proses anak membuka pembacanya; penyisipan berikutnya menunggu eksekusi berikutnya. Ini adalah batas
penyisipan, bukan transaksi SQLite yang berumur panjang: penulis WAL dan checkpoint tetap dapat berjalan selama
menunggu jaringan. Pembaruan/penghapusan baris yang sudah ada tidak dibekukan oleh batas ini.

Setelah setiap batch diterima, proses anak menunggu konfirmasi. Server terlebih dahulu menyimpan
kursor secara persisten dengan `advanceLogExportCursor`, lalu mengirim `ack`; batch berikutnya tidak dimulai sebelum itu.
Kegagalan pengiriman, crash, atau batas waktu yang terlampaui akan mencatat kegagalan tanpa memajukan kursor untuk batch tersebut. Batch yang sebelumnya
telah dikonfirmasi tetap tersimpan; paling banyak hanya satu batch yang belum dikonfirmasi yang dapat dikirim ulang.
Keberhasilan dicatat hanya setelah `done` dan proses anak keluar secara normal. Kegagalan menghentikan proses anak
dengan SIGTERM, lalu meningkatkannya ke SIGKILL setelah 500 ms, dan runner menunggu hingga proses ditutup.

| Variabel lingkungan                           | Default | Tujuan                                  |
| --------------------------------------------- | ------- | --------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Batas waktu aktual per tujuan           |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Batas old-space V8 proses anak dalam MB |

Nilai yang tidak valid/tidak positif/bukan bilangan bulat menggunakan nilai default. Pengaturan heap bukan batas
RSS total; batch yang sangat besar masih dapat menghabiskan memori proses anak dan menggagalkan eksekusi dengan aman.
Nilai default 1024 MB menyediakan ruang cadangan untuk batch default 500 baris artefak berukuran 512 KiB dengan
isi diaktifkan, termasuk serialisasi JSON BigQuery yang dibagi menjadi potongan berdasarkan byte. Nilai ini tidak membuat
batch 10000 baris dengan isi menjadi aman. Kehabisan heap V8 mencatat kegagalan yang disertai tindakan perbaikan: kurangi ukuran
batch atau tingkatkan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor tetap berada pada batch terakhir
yang telah dikonfirmasi. Isi inline/disk historis tidak tercakup dalam batas artefak modern.
Operator harus mengalokasikan anggaran RSS secara terpisah, terutama di dalam container dengan memori terbatas.

Proses anak hanya mewarisi `DATA_DIR` yang telah diresolusikan, `NODE_ENV`, `TZ` eksplisit (resolusi
waktu lokal untuk nama file lama), `ELECTRON_RUN_AS_NODE` jika ada, serta input koneksi keluar berikut:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (dan bentuk huruf kecilnya),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Dispatcher Undici global menggunakan resolusi proksi berbasis lingkungan murni dan aturan
pengecualian host lokal yang sama dengan server, termasuk `NO_PROXY`; dispatcher ini tidak mengimpor `proxyFetch.ts` ataupun flag DB/fiturnya.
Kredensial proksi disamarkan dari keluaran yang diteruskan dan kesalahan yang dicatat. Kredensial tujuan
hanya dikirim dalam satu pesan IPC saat mulai, tidak pernah melalui argv atau lingkungan; penerusan keluaran/kesalahan
diberi prefiks dan disanitasi. Hanya `ExperimentalWarning` yang dinonaktifkan dalam argumen eksekusi proses anak untuk menghindari
pengulangan peringatan SQLite Node setiap kali cron berjalan; jenis peringatan lain tetap ditampilkan.

Modul tujuan harus dapat diimpor tanpa dependensi Next.js/server-only. Implementasi
BigQuery yang ada sudah memenuhi kontrak tersebut. Cache token akses hanya bertahan selama proses anak
berjalan, bukan lintas eksekusi. Node adalah runtime yang didukung (`package.json` engines), tetapi bagian
instalasi Bun di README dan `Dockerfile.bun` juga menawarkan jalur kompatibilitas produksi menggunakan
`bun:sqlite` (`src/lib/db/core.ts` / adaptor). Oleh karena itu, di Bun, ekspor tetap menggunakan jalur
dalam proses yang sebelumnya dan menampilkan peringatan satu kali: isolasi heap/batas waktu proses anak tidak tersedia. Gunakan
Node untuk isolasi event loop dan OOM; Bun tidak diperlakukan sebagai runtime khusus pengembangan di sini.

Saat `includeBodies` diaktifkan, utamakan jadwal pada tingkat menit seperti
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` daripada menumpuk antrean payload per jam.
Batas batch dan baris tetap membatasi setiap eksekusi. Biaya memulai proses ditanggung per tujuan per eksekusi;
ini menukar sedikit biaya awal dengan isolasi event loop server, bukan mengurangi total penggunaan CPU.

### Payload (prompt dan penyelesaian)

Secara default, ekspor hanya memuat kolom ringkasan yang ditampilkan dalam **daftar** Log. Mengaktifkan
**Ekspor prompt dan respons** (`includeBodies`) juga mengirimkan apa yang ditampilkan panel **detail**
Log untuk setiap panggilan:

| Kolom                            | Isinya                                                               |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Payload panggilan sebagaimana ditampilkan dasbor                     |
| `pipeline_route_decision`        | Tujuan dan model yang dipilih router                                 |
| `pipeline_client_request`        | Permintaan mentah persis seperti yang dikirim klien                  |
| `pipeline_openai_request`        | Setelah dikonversi ke format OpenAI internal                         |
| `pipeline_provider_request`      | Sebagaimana dikirim ke upstream, dalam dialek penyedia               |
| `pipeline_provider_response`     | Respons upstream mentah                                              |
| `pipeline_client_response`       | Yang dikembalikan kepada pemanggil                                   |
| `pipeline_error`                 | Detail kesalahan tingkat pipeline untuk panggilan yang gagal         |
| `bodies_truncated`               | Bernilai benar jika salah satu kolom di atas mencapai `maxBodyBytes` |

Ini adalah konten prompt, sehingga **dinonaktifkan secara default** dan sengaja dijadikan pilihan per tujuan.
Yang dikirim adalah yang ditampilkan dasbor, karena ekspor dan `getCallLogById` menggunakan resolusi
detail yang sama: payload
sudah disanitasi dari PII dan rahasianya disamarkan saat ditulis, dan panggilan yang dibuat dengan
kunci API `noLog` tidak menyimpan payload sama sekali, sehingga tidak ada yang diekspor.

Payload dibaca per baris dari artefak sistem berkas, sehingga hidrasi hanya dijalankan untuk tujuan
yang memintanya. Jika artefak hilang atau rusak, ringkasannya diekspor dengan payload null alih-alih
menggagalkan batch dan membuat kursor terhenti.

`maxBodyBytes` (default 262144) membatasi setiap kolom. Payload yang lebih panjang **dipotong, bukan
dibuang** — prompt yang terpotong tetap menjawab "apa yang ditanyakan" — dan baris tersebut ditandai dengan
`bodies_truncated`. Delta yang dialirkan potongan demi potongan tidak diekspor; respons yang telah dirangkai
sudah tersedia di `pipeline_provider_response` dan `pipeline_client_response`.

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
