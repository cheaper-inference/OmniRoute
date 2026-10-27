# Log export (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Eksport berterusan dan berperingkat bagi log panggilan OmniRoute ke stor analitik luaran.

Tab papan pemuka Logs menyimpan sejarah permintaan dalam SQLite (`call_logs`), yang dihadkan oleh
putaran dan pengekalan. Eksport log menghantar set rekod yang sama mengikut jadual supaya ia dapat kekal
lebih lama daripada pangkalan data setempat dan digabungkan dengan data lain. BigQuery ialah destinasi
pertama; saluran paip ini merupakan sebuah registri, jadi lebih banyak destinasi boleh ditambah.

---

## 1. Cara ia berfungsi

```
pelayan (nyahsulit + sahkan konfigurasi, selaraskan kursor)
  → mulakan IPC → proses OS exportChild terpencil
    → storage.sqlite baca sahaja → pertanyaan/pemetaan log panggilan dikongsi
      → hidrasi artifak tak segerak → prepare()/send() destinasi
        → IPC kelompok → pelayan menyimpan kursor → IPC pengakuan
          → kelompok seterusnya; IPC selesai → pelayan merekodkan kejayaan
```

- **Jadual** — satu tugas cron `JobRegistry`, `log_export`, dengan nilai lalai `0 * * * *` (setiap jam,
  UTC). Didaftarkan dalam `src/lib/initCloudSync.ts`; boleh ditindih dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap detik memproses semua destinasi yang **didayakan** sehingga selesai, secara berurutan.
- **Kursor** — `call_logs.rowid` tersirat SQLite, disimpan bagi setiap destinasi dalam
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak digunakan sebagai kursor: pemanggil
  boleh membekalkan nilai mereka sendiri, jadi permintaan yang perlahan boleh ditulis selepas permintaan lebih pantas yang bermula
  kemudian, dan kursor cap masa akan melangkaunya.
- **Pengelompokan** — `batch_size` baris bagi setiap permintaan (lalai 500), `max_rows_per_run` baris bagi setiap pelaksanaan
  (lalai 10000) supaya tunggakan besar diproses sepanjang beberapa detik dan bukannya menyekat satu detik.
- **Penghantaran** — kursor bergerak ke hadapan hanya selepas `send()` selesai. Kelompok yang gagal membiarkan
  kursor kekal pada kedudukannya, jadi baris yang sama dicuba semula pada pelaksanaan seterusnya. Jaminannya ialah
  sekurang-kurangnya-sekali berserta penyahduplikasian di pihak destinasi, bukannya tepat-sekali yang sebenar: BigQuery menetapkan kunci setiap
  baris berdasarkan id log panggilan, yang dipatuhinya atas dasar usaha terbaik dalam tetingkap penyahduplikasiannya sendiri.
- **Pengadang pertindihan** — detik cron dan `POST .../run` boleh dicetuskan serentak. Destinasi yang
  sedang diproses dilangkau dan bukannya diproses dua kali (`skipped: true` dalam hasil pelaksanaan),
  maka pelaksanaan serentak tidak boleh menghantar semula kelompok atau menulis kursor secara mengundur.
- **Pemulihan pengosongan** — jika `cursor_row_id` menjadi lebih tinggi daripada `MAX(rowid)` (seluruh jadual telah
  dikosongkan dan rowid dimulakan semula), pelaksana mengundurkannya kepada 0 dan bukannya menjadi tidak dapat mengesan data secara kekal.

### Pelaksana terpencil dan had

Setiap pelaksanaan destinasi pada Node memulakan proses anak OS berasingan yang berjangka hayat pendek (`child_process`
dengan IPC, bukan `worker_threads`). Pembacaan isi, penghuraian/pensirian JSON muatan, `prepare()` destinasi
dan I/O rangkaian destinasi semuanya berjalan di situ, bukan pada gelung peristiwa pelayan.
Hanya konfigurasi dan mesej kemajuan kecil merentasi IPC; rekod yang dieksport tidak pernah kembali kepada
pelayan. Tugas cron dan laluan Jalankan sekarang mengekalkan hasil awam dan pengadang pertindihan yang sama.

Proses anak membuka `DATA_DIR/storage.sqlite` yang telah diselesaikan oleh pelayan sebagai baca sahaja menggunakan `node:sqlite`,
dengan `busy_timeout=5000` dan `query_only=ON`. Ia tidak mengimport sebarang tika tunggal DB dan tidak melakukan
migrasi, sandaran atau kemas kini SQLite. Penyimpanan rekod artifak yang hilang/rosak (termasuk
UPDATE artifak rosak) kekal hanya dalam laluan butiran papan pemuka. Kedua-dua laluan berkongsi penyelesai
butiran tulen; eksport menggunakan pembacaan sistem fail tak segerak dan tertib penyelesaian artifak → sebaris
legasi → cakera legasi → tiada yang sama. Sesuatu pelaksanaan mengambil petikan rowid sisipan maksimum
apabila proses anak membuka pembacanya; sisipan kemudian menunggu sehingga pelaksanaan seterusnya. Ini ialah sempadan
sisipan, bukan transaksi SQLite berjangka panjang: penulis dan titik semak WAL kekal bebas semasa
menunggu rangkaian. Kemas kini/pemadaman baris sedia ada tidak dibekukan oleh sempadan ini.

Selepas setiap kelompok diterima, proses anak menunggu pengakuan. Pelayan terlebih dahulu menyimpan
kursor dengan `advanceLogExportCursor`, kemudian menghantar `ack`; tiada kelompok seterusnya bermula sebelum itu.
Kegagalan penghantaran, ranap atau tamat masa merekodkan kegagalan tanpa memajukan kelompok tersebut. Kelompok yang
telah diakui sebelum ini kekal dikomit; paling banyak hanya satu kelompok yang belum diakui boleh dihantar semula.
Kejayaan direkodkan hanya selepas `done` dan proses anak keluar dengan bersih. Kegagalan menamatkan proses anak
dengan SIGTERM, yang ditingkatkan kepada SIGKILL selepas 500 ms, dan pelaksana menunggu proses ditutup.

| Pemboleh ubah persekitaran                    | Lalai  | Tujuan                                 |
| --------------------------------------------- | ------ | -------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Had masa sebenar bagi setiap destinasi |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Had ruang lama V8 proses anak dalam MB |

Nilai tidak sah/bukan positif/bukan integer menggunakan nilai lalai. Tetapan timbunan bukanlah had keseluruhan
RSS; kelompok yang sangat besar masih boleh menghabiskan memori proses anak dan menggagalkan pelaksanaan dengan selamat.
Nilai lalai 1024 MB menyediakan ruang lebihan untuk kelompok lalai 500 baris bagi artifak 512 KiB dengan
isi didayakan, termasuk pensirian JSON berketul bait BigQuery. Ia tidak menjadikan kelompok isi
10000 baris selamat. Kehabisan timbunan V8 merekodkan kegagalan yang boleh diambil tindakan: kurangkan saiz kelompok
atau tingkatkan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor kekal pada kelompok terakhir yang
diakui. Isi sebaris/cakera sejarah tidak dilindungi oleh had artifak moden.
Pengendali mesti memperuntukkan RSS secara berasingan, terutamanya di dalam bekas dengan had memori.

Proses anak hanya mewarisi `DATA_DIR` yang telah diselesaikan, `NODE_ENV`, `TZ` eksplisit (penyelesaian waktu tempatan
nama fail legasi), `ELECTRON_RUN_AS_NODE` apabila tersedia, dan input keluar berikut:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (serta bentuk huruf kecilnya),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Penghantar Undici global berkongsi penyelesaian proksi persekitaran tulen pelayan dan peraturan pintasan hos tempatan,
termasuk `NO_PROXY`; ia tidak mengimport `proxyFetch.ts` atau bendera DB/cirinya.
Kelayakan proksi disunting daripada output yang dimajukan dan ralat yang direkodkan. Kelayakan destinasi
bergerak hanya dalam satu mesej IPC permulaan, tidak sekali-kali melalui argv atau persekitaran; pemajuan output/ralat
diberi awalan dan disanitasi. Hanya `ExperimentalWarning` dilumpuhkan dalam argumen pelaksanaan proses anak untuk mengelakkan
amaran SQLite Node diulang pada setiap pelaksanaan cron; jenis amaran lain kekal kelihatan.

Modul destinasi mestilah boleh diimport tanpa kebergantungan Next.js/khusus pelayan. Pelaksanaan
BigQuery sedia ada telah pun memenuhi kontrak tersebut. Cache token akses hanya bertahan sepanjang
pelaksanaan proses anak, bukan merentas pelaksanaan. Node ialah masa jalan yang disokong (`package.json` engines), tetapi bahagian
pemasangan Bun dalam README dan `Dockerfile.bun` turut mengiklankan laluan keserasian pengeluaran yang menggunakan
`bun:sqlite` (`src/lib/db/core.ts` / penyesuai). Oleh itu, di bawah Bun, eksport mengekalkan laluan
dalam proses yang terdahulu dan mengeluarkan amaran sekali sahaja: pengasingan heap/masa tamat proses anak tidak tersedia. Gunakan
Node untuk pengasingan gelung peristiwa dan OOM; Bun tidak dianggap sebagai untuk pembangunan sahaja di sini.

Apabila `includeBodies` didayakan, utamakan kekerapan peringkat minit seperti
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` dan bukannya mengumpulkan tunggakan muatan setiap jam.
Had kelompok dan baris masih mengehadkan setiap pelaksanaan. Kos permulaan proses dikenakan bagi setiap destinasi untuk setiap pelaksanaan;
ini menukar sedikit kos permulaan dengan pengasingan gelung peristiwa pelayan, bukan mengurangkan jumlah penggunaan CPU.

### Muatan (prom dan pelengkapan)

Secara lalai, eksport hanya membawa medan ringkasan yang ditunjukkan oleh **senarai** Log. Menghidupkan
**Eksport prom dan respons** (`includeBodies`) turut menghantar kandungan yang ditunjukkan oleh anak tetingkap
**butiran** Log bagi setiap panggilan:

| Medan                            | Kandungannya                                                    |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Muatan panggilan sebagaimana dipaparkan oleh papan pemuka       |
| `pipeline_route_decision`        | Sasaran dan model yang dipilih oleh penghala                    |
| `pipeline_client_request`        | Permintaan mentah tepat seperti yang dihantar oleh klien        |
| `pipeline_openai_request`        | Selepas diterjemahkan kepada bentuk OpenAI dalaman              |
| `pipeline_provider_request`      | Seperti yang sebenarnya dihantar ke hulu, dalam dialek penyedia |
| `pipeline_provider_response`     | Respons hulu mentah                                             |
| `pipeline_client_response`       | Kandungan yang dikembalikan kepada pemanggil                    |
| `pipeline_error`                 | Butiran ralat peringkat saluran paip bagi panggilan yang gagal  |
| `bodies_truncated`               | Benar apabila mana-mana medan di atas mencapai `maxBodyBytes`   |

Ini ialah kandungan prom, maka ia **dimatikan secara lalai** dan sengaja dijadikan pilihan bagi setiap destinasi.
Kandungan yang dihantar ialah kandungan yang dipaparkan oleh papan pemuka kerana eksport dan `getCallLogById` berkongsi penyelesaian
butiran: muatan telah pun
dinyahkenal pasti daripada PII dan disunting untuk membuang rahsia apabila ditulis, dan panggilan yang dibuat menggunakan
kunci API `noLog` tidak menyimpan sebarang muatan, maka tiada apa-apa untuk dieksport.

Muatan dibaca bagi setiap baris daripada artifak sistem fail, maka penghidratan hanya berjalan untuk destinasi
yang memintanya. Artifak yang hilang atau rosak akan mengeksport ringkasannya dengan muatan nol dan bukannya
menggagalkan kelompok serta menyebabkan kursor terkandas.

`maxBodyBytes` (lalai 262144) mengehadkan setiap medan. Muatan yang lebih panjang akan **dipangkas dan bukannya
digugurkan** — prom yang dipotong masih menjawab "apa yang ditanyakan" — dan baris tersebut ditandai dengan
`bodies_truncated`. Delta yang distrim ketul demi ketul tidak dieksport; respons yang telah dihimpunkan sudah pun
terkandung dalam `pipeline_provider_response` dan `pipeline_client_response`.

---

## 2. Fail

| Komponen                   | Lokasi                                       |
| -------------------------- | -------------------------------------------- |
| Kontrak destinasi          | `src/lib/logExport/types.ts`                 |
| Pendaftaran                | `src/lib/logExport/registry.ts`              |
| Pengendalian rahsia        | `src/lib/logExport/secrets.ts`               |
| Pelaksana (IPC induk)      | `src/lib/logExport/runner.ts`                |
| Kitar hayat proses         | `src/lib/logExport/childRunner.ts`           |
| Titik masuk anak           | `src/lib/logExport/exportChild.ts`           |
| Pembuka baca sahaja        | `src/lib/db/logExportReadOnly.ts`            |
| Pertanyaan/pemetaan kongsi | `src/lib/usage/callLogExportQueries.ts`      |
| Penyelesai butiran         | `src/lib/usage/callLogDetailResolver.ts`     |
| Unjuran API                | `src/lib/logExport/presenter.ts`             |
| Destinasi BigQuery         | `src/lib/logExport/destinations/bigquery.ts` |
| Pengesahan SA Google       | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan       | `src/lib/usage/callLogExportSource.ts`       |
| Pengekalan data            | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron                 | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST               | `src/app/api/log-export/`                    |
| Halaman papan pemuka       | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Semua laluan disahkan untuk pengurusan (`requireManagementAuth`). Rahsia tidak pernah dikembalikan:
rahsia yang disimpan dikembalikan sebagai nilai literal `__stored__`, dan menghantar semula nilai tersebut semasa kemas kini
akan mengekalkan kelayakan yang disimpan.

Mencipta atau mengemas kini destinasi yang jenisnya mengisytiharkan rahsia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpanya, `encrypt()` hanya meneruskan nilai secara senyap, maka operasi penulisan
ditolak dengan 400 dan bukannya meletakkan kelayakan ke dalam SQLite sebagai teks biasa (perlindungan yang sama
digunakan oleh webhook Telegram).

| Kaedah   | Laluan                                   | Tujuan                                                           |
| -------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Jenis destinasi + senarai medan konfigurasinya                   |
| `GET`    | `/api/log-export/destinations`           | Senaraikan destinasi (rahsia disunting)                          |
| `POST`   | `/api/log-export/destinations`           | Cipta destinasi                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Baca satu destinasi                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Kemas kini nama / didayakan / konfigurasi / pengumpulan          |
| `DELETE` | `/api/log-export/destinations/{id}`      | Padam                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | Uji kelayakan, tanpa menulis apa-apa                             |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kosongkan sekarang, laluan sama seperti pelaksanaan berjadual    |
| `GET`    | `/api/log-export/status`                 | Keadaan cron, pelaksanaan terkini, tunggakan bagi setiap sasaran |

`GET /api/log-export/types` menjadikan UI generik: borang papan pemuka dipaparkan berdasarkan
penerang medan yang dikembalikan, maka destinasi baharu tidak memerlukan perubahan UI.

---

## 4. Destinasi BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Catatan                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| `projectId`          | Projek GCP yang mengandungi set data                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                         |
| `location`           | Hanya digunakan apabila set data perlu dicipta (lalai `EU`)                             |
| `serviceAccountJson` | Kunci akaun perkhidmatan. Rahsia: disulitkan semasa disimpan, tidak pernah dikembalikan |
| `autoCreate`         | Cipta set data dan jadual pada eksport pertama (lalai `true`)                           |

Akaun perkhidmatan memerlukan `bigquery.tables.updateData` pada jadual sasaran, serta
`bigquery.datasets.create` / `bigquery.tables.create` apabila `autoCreate` dihidupkan.

Kelompok yang dikonfigurasikan ialah unit **kursor**, bukannya unit HTTP: `send()` membahagikannya kepada panggilan insertAll
dengan maksimum 500 baris, maka `batch_size` yang besar tidak akan melanggar had permintaan 10 MB BigQuery.
Status sementara (408/429/500/502/503/504) dicuba semula sehingga tiga kali dengan sela masa
eksponen, menggunakan semula insertIds yang sama; kegagalan pengesahan dan skema akan mencetuskan ralat pada percubaan pertama
dan bukannya menghabiskan pelaksanaan tersebut.

Jadual yang baru sahaja dicipta belum kelihatan kepada titik akhir penstriman, yang memberikan respons
404 selama beberapa saat. 404 tersebut dicuba semula, tetapi **hanya apabila pelaksanaan ini mencipta jadual** —
jadual yang benar-benar tiada tetap gagal serta-merta. Ambil perhatian bahawa mencipta semula jadual menggunakan nama yang
baru-baru ini dipadam menyebabkan BigQuery menolak sisipan penstriman selama beberapa minit; ini ialah
sifat operasi padam-kemudian-cipta-semula, maka gunakan nama jadual baharu dan bukannya menggugurkan lalu menambah semula jadual.

**Kegagalan separa diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Ini dianggap sebagai
kegagalan dan akan mencetuskan ralat, yang menghentikan kursor daripada bergerak melepasi baris yang tidak pernah diterima
oleh BigQuery; `tests/unit/log-export-bigquery.test.ts` menetapkan tingkah laku ini.

Pengangkutan menggunakan REST biasa — pernyataan RS256 yang ditandatangani sendiri ditukarkan dengan token akses di
`https://oauth2.googleapis.com/token`, kemudian baris dihantar ke `tabledata.insertAll`. Tiada SDK Google
disertakan. Token akses dicache dalam proses bagi setiap (akaun perkhidmatan, skop).

Jadual yang dicipta mempunyai satu lajur bagi setiap medan tab Log serta `exported_at`, dan disusun mengikut
cara log panggilan sebenarnya disoal:

- **Dipartisikan mengikut hari pada `timestamp`**, maka pertanyaan yang dibatasi mengikut tarikh hanya mengimbas hari-hari tersebut.
- **Dikelompokkan mengikut `api_key_name`, `provider`, `model`, `status`** (dalam susunan tersebut), maka penapisan berdasarkan
  siapa yang menjalankannya, ke mana ia dihantar, atau sama ada ia gagal akan menyingkirkan blok dalam setiap partisi. BigQuery
  membenarkan maksimum empat lajur pengelompokan dan susunannya penting: penapis pada `api_key_name` sahaja
  akan menyingkirkan blok, manakala penapis pada `status` sahaja tidak.
- **Pengekalan partisi pilihan** melalui `partitionExpirationDays` (0 mengekalkan semuanya), digunakan
  apabila jadual dicipta.

Kedua-dua tetapan digunakan semasa penciptaan. Jadual sedia ada mengekalkan apa-apa susun atur yang sudah dimilikinya, jadi
halakan destinasi kepada id jadual baharu jika anda mahu menggunakannya.

`tests/unit/log-export-bigquery.test.ts` memastikan pemetaan dan skema jadual kekal
selaras, supaya lajur log panggilan baharu tidak boleh digugurkan secara senyap ketika dieksport.

Kelompok dipecahkan berdasarkan **kedua-dua** bilangan baris dan bait bersiri. Bilangan baris sahaja tidak mencukupi
apabila muatan dieksport: 500 baris yang mengandungi prom boleh mencecah puluhan megabait, dan insertAll
menolak permintaan yang melebihi 10 MB. Setiap pecahan ditutup apabila mencapai 500 baris atau 9 MB, mana-mana yang dicapai dahulu.

---

## 5. Menambah destinasi

1. Cipta `src/lib/logExport/destinations/<name>.ts` yang mengeksport `LogExportDestinationType`:
   `configSchema` Zod, tatasusunan deskriptor `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkannya pada tatasusunan `DESTINATIONS` dalam `src/lib/logExport/registry.ts`.
3. Tulis ujian di bawah `tests/unit/`.

Itulah keseluruhan perubahan yang diperlukan: pengekalan data, tugas cron, lapisan REST, penyulitan rahsia dan
borang papan pemuka semuanya membaca registri.

Dua peraturan untuk destinasi baharu:

- `send()` **mesti membuang pengecualian** apabila berlaku kegagalan separa. Penyelesaian bermaksud "destinasi mempunyai baris-baris ini",
  dan kursor bergerak melepasi baris-baris tersebut secara kekal.
- Destinasi yang menerima URL yang dibekalkan pengguna mesti mengesahkannya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum membuat permintaan,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukannya: hosnya ialah pemalar.

---

## 6. Mengendalikannya

- **Papan pemuka**: Integrations → Log export. Tambah destinasi, jalankan **Test** untuk menyemak kelayakan
  tanpa menulis baris, kemudian dayakannya.
- **Tunggakan**: setiap kad destinasi menunjukkan baris yang belum selesai dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama serta 20 pelaksanaan tugas terakhir.
- **Destinasi yang gagal tidak menyebabkan destinasi lain gagal** — ringkasan pelaksanaan merekodkan status setiap destinasi
  dalam `last_status` / `last_error`, dan sejarah pelaksanaan tugas menyimpan agregat.
- **Memadamkan destinasi akan memadamkan kursornya.** Menambahkannya semula bermula daripada log panggilan tersimpan
  yang paling lama, yang menghantar semula baris yang mungkin sudah dimiliki oleh destinasi tersebut. Dalam BigQuery, `insertId`
  bagi setiap baris hanya menangani perkara itu dalam tetingkap penyahduplikasian BigQuery sendiri, jadi sebaik-baiknya
  nyahdayakan destinasi dan bukannya memadamkannya.
