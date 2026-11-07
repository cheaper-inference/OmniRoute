# Log export (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Eksport log panggilan OmniRoute secara berterusan dan bertokok ke stor analitik luaran.

Tab Log pada papan pemuka menyimpan sejarah permintaan dalam SQLite (`call_logs`), yang dihadkan oleh
putaran dan pengekalan. Eksport log menghantar set rekod yang sama mengikut jadual supaya rekod tersebut dapat disimpan lebih lama
daripada pangkalan data setempat dan digabungkan dengan data lain. BigQuery ialah destinasi pertama;
saluran pemprosesan ini menggunakan daftar, jadi destinasi tambahan boleh ditambah.

---

## 1. Cara ia berfungsi

```
pelayan (nyahsulit + sahkan konfigurasi, selaraskan kursor)
  → mulakan IPC → proses OS exportChild terasing
    → storage.sqlite baca sahaja → pertanyaan/pemetaan log panggilan dikongsi
      → penghidratan artifak tak segerak → prepare()/send() destinasi
        → IPC kelompok → pelayan menyimpan kursor secara kekal → IPC pengakuan
          → kelompok seterusnya; IPC selesai → pelayan merekodkan kejayaan
```

- **Jadual** — satu tugas cron `JobRegistry`, `log_export`, dengan nilai lalai `0 * * * *` (setiap jam,
  UTC). Didaftarkan dalam `src/lib/initCloudSync.ts`; boleh ditindih dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap cetusan memproses semua rekod bagi setiap destinasi yang **didayakan**, secara berurutan.
- **Kursor** — `call_logs.rowid` tersirat SQLite, disimpan secara kekal bagi setiap destinasi dalam
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak digunakan sebagai kursor: pemanggil
  boleh membekalkan nilai mereka sendiri, jadi permintaan yang perlahan mungkin ditulis selepas permintaan lebih pantas yang bermula
  kemudian, dan kursor cap masa akan melangkaunya.
- **Pengelompokan** — `batch_size` baris bagi setiap permintaan (lalai 500), `max_rows_per_run` baris bagi setiap pelaksanaan
  (lalai 10000) supaya tunggakan besar diproses sepanjang beberapa cetusan dan bukannya menyekat satu cetusan.
- **Penghantaran** — kursor bergerak ke hadapan hanya selepas `send()` selesai. Kelompok yang gagal membiarkan
  kursor pada kedudukan asalnya, supaya baris yang sama dicuba semula pada pelaksanaan seterusnya. Jaminannya ialah
  sekurang-kurangnya sekali berserta penyahduplikasian di pihak destinasi, bukannya tepat sekali yang sebenar: BigQuery menggunakan
  id log panggilan sebagai kunci setiap baris, yang dipatuhinya atas dasar usaha terbaik dalam tetingkap penyahduplikasiannya sendiri.
- **Perlindungan pertindihan** — cetusan cron dan `POST .../run` boleh berlaku serentak. Destinasi
  yang sedang diproses akan dilangkau dan bukannya diproses dua kali (`skipped: true` dalam hasil pelaksanaan),
  supaya pelaksanaan serentak tidak boleh menghantar semula kelompok atau mengundurkan kursor.
- **Pemulihan selepas pengosongan** — jika `cursor_row_id` menjadi lebih tinggi daripada `MAX(rowid)` (seluruh jadual telah
  dikosongkan dan rowid dimulakan semula), pelaksana mengundurkannya ke 0 dan bukannya terus gagal mengesan rekod baharu.

### Pelaksana terasing dan had

Setiap pelaksanaan destinasi pada Node memulakan proses anak OS berasingan yang berjangka pendek (`child_process`
dengan IPC, bukan `worker_threads`). Pembacaan badan, penghuraian/pensirian JSON muatan,
`prepare()` destinasi dan I/O rangkaian destinasi semuanya dijalankan di situ, bukan pada gelung peristiwa pelayan.
Hanya konfigurasi dan mesej kemajuan kecil merentas IPC; rekod yang dieksport tidak pernah dikembalikan kepada
pelayan. Tugas cron dan laluan Jalankan sekarang mengekalkan hasil awam dan perlindungan pertindihan yang sama.

Proses anak membuka `DATA_DIR/storage.sqlite` yang telah ditentukan oleh pelayan dalam mod baca sahaja menggunakan `node:sqlite`,
dengan `busy_timeout=5000` dan `query_only=ON`. Ia tidak mengimport sebarang singleton DB dan tidak melakukan
migrasi, sandaran atau kemas kini SQLite. Pengurusan rekod artifak yang hilang/rosak (termasuk
UPDATE artifak rosak) kekal hanya dalam laluan butiran papan pemuka. Kedua-dua laluan berkongsi
pelerai butiran tulen; eksport menggunakan pembacaan sistem fail tak segerak dan tertib peleraian artifak → sebaris
legasi → cakera legasi → tiada yang sama. Sesuatu pelaksanaan mengambil petikan rowid sisipan maksimum
apabila proses anak membuka pembacanya; sisipan kemudian menunggu pelaksanaan seterusnya. Ini ialah sempadan
sisipan, bukan transaksi SQLite berjangka panjang: penulis WAL dan titik semak kekal bebas semasa
menunggu rangkaian. Kemas kini/pemadaman baris sedia ada tidak dibekukan oleh sempadan ini.

Selepas setiap kelompok diterima, proses anak menunggu pengakuan. Pelayan terlebih dahulu menyimpan
kursor secara kekal dengan `advanceLogExportCursor`, kemudian menghantar `ack`; tiada kelompok seterusnya bermula sebelum itu.
Kegagalan penghantaran, ranap atau tamat masa merekodkan kegagalan tanpa memajukan kursor bagi kelompok tersebut. Kelompok yang
telah diakui sebelum ini kekal dikomit; paling banyak hanya satu kelompok yang belum diakui boleh dihantar semula.
Kejayaan direkodkan hanya selepas `done` dan proses anak keluar dengan sempurna. Kegagalan menamatkan proses anak
dengan SIGTERM, kemudian beralih kepada SIGKILL selepas 500 ms, dan pelaksana menunggu proses ditutup.

| Pemboleh ubah persekitaran                    | Lalai  | Tujuan                                 |
| --------------------------------------------- | ------ | -------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Had masa sebenar bagi setiap destinasi |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Had old-space V8 proses anak dalam MB  |

Nilai yang tidak sah/bukan positif/bukan integer menggunakan nilai lalai. Tetapan timbunan bukan had
jumlah RSS; kelompok yang sangat besar masih boleh menghabiskan memori proses anak dan menyebabkan pelaksanaan gagal dengan selamat.
Nilai lalai 1024 MB menyediakan ruang tambahan untuk kelompok lalai 500 baris artifak bersaiz 512 KiB dengan
badan didayakan, termasuk pensirian JSON BigQuery yang dipecahkan kepada cebisan mengikut bait. Ini tidak menjadikan
kelompok 10000 baris yang menyertakan badan selamat. Kehabisan timbunan V8 merekodkan kegagalan yang boleh diambil tindakan: kecilkan saiz
kelompok atau naikkan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor kekal pada kelompok terakhir
yang diakui. Badan sebaris/pada cakera terdahulu tidak diliputi oleh had artifak moden.
Pengendali mesti memperuntukkan RSS secara berasingan, terutamanya dalam bekas dengan memori terhad.

Proses anak hanya mewarisi `DATA_DIR`, `NODE_ENV` yang telah ditentukan, `TZ` eksplisit (penentuan
waktu tempatan bagi nama fail legasi), `ELECTRON_RUN_AS_NODE` apabila tersedia, dan input keluar berikut:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (serta bentuk huruf kecilnya),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Dispatcher Undici global berkongsi penentuan proksi berasaskan persekitaran semata-mata dan peraturan
pintasan hos tempatan pelayan, termasuk `NO_PROXY`; ia tidak mengimport `proxyFetch.ts` atau bendera DB/fiturnya.
Bukti kelayakan proksi disunting keluar daripada output yang dimajukan dan ralat yang direkodkan. Bukti kelayakan destinasi
dihantar hanya dalam satu mesej IPC permulaan, bukan melalui argv atau persekitaran; pemajuan output/ralat
diberi awalan dan disanitasi. Hanya `ExperimentalWarning` dinyahdayakan dalam argumen exec proses anak untuk mengelakkan
amaran SQLite Node berulang pada setiap pelaksanaan cron; jenis amaran lain kekal dipaparkan.

Modul destinasi mestilah boleh diimport tanpa kebergantungan Next.js/khusus pelayan. Pelaksanaan
BigQuery sedia ada sudah memenuhi kontrak tersebut. Cache token akses hanya bertahan sepanjang pelaksanaan
proses anak, bukan merentas pelaksanaan. Node ialah persekitaran masa jalan yang disokong (`package.json` engines), tetapi bahagian
pemasangan Bun dalam README dan `Dockerfile.bun` turut menawarkan laluan keserasian pengeluaran menggunakan
`bun:sqlite` (`src/lib/db/core.ts` / penyesuai). Oleh itu, di bawah Bun, eksport mengekalkan laluan
dalam proses yang terdahulu dan mengeluarkan amaran sekali sahaja: pengasingan heap/had masa proses anak tidak tersedia. Gunakan
Node untuk pengasingan gelung peristiwa dan OOM; Bun tidak dianggap khusus untuk pembangunan sahaja di sini.

Apabila `includeBodies` didayakan, utamakan kekerapan pada skala minit seperti
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` berbanding mengumpulkan tunggakan muatan setiap jam.
Had kelompok dan baris masih mengehadkan setiap pelaksanaan. Kos permulaan proses ditanggung bagi setiap destinasi pada setiap pelaksanaan;
ini menukarkan kos permulaan yang kecil dengan pengasingan gelung peristiwa pelayan, bukannya mengurangkan jumlah penggunaan CPU.

### Muatan (prom dan pelengkapan)

Secara lalai, eksport hanya membawa medan ringkasan yang ditunjukkan oleh **senarai** Log. Menghidupkan
**Eksport prom dan respons** (`includeBodies`) turut menghantar perkara yang ditunjukkan oleh anak tetingkap
**butiran** Log bagi setiap panggilan:

| Medan                            | Kandungannya                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | Muatan panggilan sebagaimana dipaparkan oleh papan pemuka             |
| `pipeline_route_decision`        | Sasaran dan model yang dipilih oleh penghala                          |
| `pipeline_client_request`        | Permintaan mentah tepat seperti yang dihantar oleh klien              |
| `pipeline_openai_request`        | Selepas diterjemahkan ke dalam bentuk OpenAI dalaman                  |
| `pipeline_provider_request`      | Seperti yang benar-benar dihantar ke huluan, dalam dialek penyedia    |
| `pipeline_provider_response`     | Respons mentah daripada huluan                                        |
| `pipeline_client_response`       | Perkara yang dikembalikan kepada pemanggil                            |
| `pipeline_error`                 | Butiran ralat peringkat saluran pemprosesan bagi panggilan yang gagal |
| `bodies_truncated`               | Benar apabila mana-mana medan di atas mencapai `maxBodyBytes`         |

Ini ialah kandungan prom, jadi ia **dimatikan secara lalai** dan sengaja dijadikan pilihan bagi setiap destinasi.
Perkara yang dihantar ialah perkara yang ditunjukkan oleh papan pemuka, kerana eksport dan `getCallLogById` berkongsi penentuan
butiran: muatan telah pun
disanitasi untuk menyingkirkan PII dan disunting untuk menyembunyikan rahsia apabila ditulis, dan panggilan yang dibuat dengan
kunci API `noLog` tidak menyimpan sebarang muatan, maka tiada apa-apa untuk dieksport.

Muatan dibaca bagi setiap baris daripada artifak sistem fail, jadi penghidratan hanya dijalankan untuk destinasi
yang memintanya. Artifak yang hilang atau rosak menyebabkan ringkasannya dieksport dengan muatan null, bukannya
menggagalkan kelompok dan menyebabkan kursor tersangkut.

`maxBodyBytes` (lalai 262144) mengehadkan setiap medan. Muatan yang lebih panjang **dipangkas dan bukannya
digugurkan** — prom yang dipendekkan masih menjawab "apa yang ditanya" — dan baris itu ditandai dengan
`bodies_truncated`. Delta yang distrim cebisan demi cebisan tidak dieksport; respons yang telah digabungkan
sudah tersedia dalam `pipeline_provider_response` dan `pipeline_client_response`.

---

## 2. Fail

| Komponen                     | Lokasi                                       |
| ---------------------------- | -------------------------------------------- |
| Kontrak destinasi            | `src/lib/logExport/types.ts`                 |
| Daftaran                     | `src/lib/logExport/registry.ts`              |
| Pengendalian rahsia          | `src/lib/logExport/secrets.ts`               |
| Pelaksana (IPC induk)        | `src/lib/logExport/runner.ts`                |
| Kitar hayat proses           | `src/lib/logExport/childRunner.ts`           |
| Titik masuk anak             | `src/lib/logExport/exportChild.ts`           |
| Pembuka baca sahaja          | `src/lib/db/logExportReadOnly.ts`            |
| Pertanyaan/pemetaan dikongsi | `src/lib/usage/callLogExportQueries.ts`      |
| Penyelesai butiran           | `src/lib/usage/callLogDetailResolver.ts`     |
| Unjuran API                  | `src/lib/logExport/presenter.ts`             |
| Destinasi BigQuery           | `src/lib/logExport/destinations/bigquery.ts` |
| Pengesahan SA Google         | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan         | `src/lib/usage/callLogExportSource.ts`       |
| Penyimpanan kekal            | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron                   | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST                 | `src/app/api/log-export/`                    |
| Halaman papan pemuka         | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Semua laluan memerlukan pengesahan pengurusan (`requireManagementAuth`). Rahsia tidak pernah dikembalikan:
rahsia yang disimpan dikembalikan sebagai literal `__stored__`, dan menghantar semula nilai itu semasa kemas kini
mengekalkan bukti kelayakan yang disimpan.

Mencipta atau mengemas kini destinasi yang jenisnya mengisytiharkan rahsia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpanya, `encrypt()` meneruskan data tanpa perubahan secara senyap, jadi penulisan
ditolak dengan kod 400 dan bukannya menyimpan bukti kelayakan dalam SQLite sebagai teks biasa (perlindungan yang sama
digunakan oleh webhook Telegram).

| Kaedah   | Laluan                                   | Tujuan                                                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Jenis destinasi + senarai medan konfigurasinya                                                |
| `GET`    | `/api/log-export/destinations`           | Senaraikan destinasi (rahsia disembunyikan)                                                   |
| `POST`   | `/api/log-export/destinations`           | Cipta destinasi                                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Baca satu destinasi                                                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Kemas kini nama / status didayakan / konfigurasi / pemprosesan kelompok                       |
| `DELETE` | `/api/log-export/destinations/{id}`      | Padam                                                                                         |
| `POST`   | `/api/log-export/destinations/{id}/test` | Uji bukti kelayakan, tanpa menulis apa-apa                                                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Proses semua yang tertunggak sekarang, melalui laluan yang sama seperti pelaksanaan berjadual |
| `GET`    | `/api/log-export/status`                 | Keadaan cron, pelaksanaan terkini, tunggakan bagi setiap sasaran                              |

`GET /api/log-export/types` menjadikan UI generik: borang papan pemuka dipaparkan berdasarkan
deskriptor medan yang dikembalikan, jadi destinasi baharu tidak memerlukan perubahan UI.

---

## 4. Destinasi BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Nota                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------- |
| `projectId`          | Projek GCP yang menempatkan set data                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                         |
| `location`           | Hanya digunakan apabila set data perlu dicipta (lalai `EU`)                             |
| `serviceAccountJson` | Kunci akaun perkhidmatan. Rahsia: disulitkan semasa disimpan, tidak pernah dikembalikan |
| `autoCreate`         | Cipta set data dan jadual pada eksport pertama (lalai `true`)                           |

Akaun perkhidmatan memerlukan `bigquery.tables.updateData` pada jadual sasaran, serta
`bigquery.datasets.create` / `bigquery.tables.create` apabila `autoCreate` diaktifkan.

Kelompok yang dikonfigurasikan ialah unit **kursor**, bukan unit HTTP: `send()` membahagikannya kepada panggilan insertAll
yang mengandungi paling banyak 500 baris, jadi `batch_size` yang besar tidak akan melampaui had permintaan BigQuery sebanyak 10 MB.
Status sementara (408/429/500/502/503/504) dicuba semula sehingga tiga kali dengan sela menunggu
eksponen, menggunakan semula insertIds yang sama; kegagalan pengesahan dan skema mencetuskan pengecualian pada percubaan pertama dan bukannya
membazirkan pelaksanaan.

Jadual yang baru dicipta belum lagi kelihatan kepada titik akhir penstriman, yang membalas dengan
404 selama beberapa saat. Ralat 404 itu dicuba semula, tetapi **hanya apabila pelaksanaan ini yang mencipta jadual tersebut** —
jadual yang benar-benar tiada masih gagal dengan segera. Ambil perhatian bahawa mencipta semula jadual dengan nama yang
baru sahaja dipadam menyebabkan BigQuery menolak sisipan penstriman selama beberapa minit; itu ialah
sifat operasi padam-kemudian-cipta-semula, jadi utamakan nama jadual baharu berbanding memadam dan menambahnya semula.

**Kegagalan separa diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Ini dianggap sebagai
kegagalan dan mencetuskan pengecualian, yang menghalang kursor daripada bergerak melepasi baris yang tidak pernah
diterima oleh BigQuery; `tests/unit/log-export-bigquery.test.ts` menetapkan tingkah laku ini melalui ujian.

Pengangkutan menggunakan REST biasa — asersi RS256 yang ditandatangani sendiri ditukar dengan token akses di
`https://oauth2.googleapis.com/token`, kemudian baris dihantar ke `tabledata.insertAll`. Tiada Google SDK
disertakan. Token akses dicache dalam proses bagi setiap pasangan (akaun perkhidmatan, skop).

Jadual yang dicipta mengandungi satu lajur bagi setiap medan tab Logs serta `exported_at`, dan disusun mengikut
cara log panggilan sebenarnya dikueri:

- **Dipartisikan mengikut hari berdasarkan `timestamp`**, supaya kueri yang dihadkan mengikut tarikh hanya mengimbas hari-hari tersebut.
- **Dikelompokkan mengikut `api_key_name`, `provider`, `model`, `status`** (dalam urutan itu), supaya penapisan mengikut
  siapa yang menjalankannya, ke mana ia dihantar, atau sama ada ia gagal dapat mengecualikan blok dalam setiap partisi. BigQuery
  membenarkan paling banyak empat lajur pengelompokan dan urutannya penting: penapis pada `api_key_name` sahaja
  mengecualikan blok, manakala penapis pada `status` sahaja tidak.
- **Pengekalan partisi pilihan** melalui `partitionExpirationDays` (0 menyimpan semuanya), diterapkan
  semasa jadual dicipta.

Kedua-dua tetapan diterapkan semasa penciptaan. Jadual sedia ada mengekalkan susun aturnya yang asal, jadi
halakan destinasi kepada id jadual baharu jika anda mahu menggunakannya.

`tests/unit/log-export-bigquery.test.ts` mengesahkan bahawa pemeta dan skema jadual kekal
selaras, supaya lajur log panggilan baharu tidak boleh digugurkan secara senyap semasa dieksport.

Kelompok dibahagikan berdasarkan **kedua-dua** bilangan baris dan bait yang disirikan. Bilangan baris sahaja tidak mencukupi
apabila muatan dieksport: 500 baris yang mengandungi prom boleh mencecah puluhan megabait, dan insertAll
menolak permintaan yang melebihi 10 MB. Setiap pecahan ditutup apabila mencapai 500 baris atau 9 MB, yang mana dicapai dahulu.

---

## 5. Destinasi jejak OTLP/HTTP

Konfigurasi menggunakan `type: "otlp-http"`. Ini ialah eksport log panggilan tersimpan yang berjadual
dan berasaskan kursor, bukannya sink peristiwa penghalaan langsung usaha terbaik dalam
`open-sse/services/routing/otel.ts`. Ia tidak membaca atau mengubah pemboleh ubah persekitaran,
pemasa atau penimbal sink tersebut. Mengaktifkan kedua-duanya boleh menghasilkan dua jenis span yang bebas;
gunakan skop instrumentasi `omniroute.log-export` untuk membezakan span log panggilan ini.

| Kunci                    | Lalai / tujuan                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `endpoint`               | URL jejak HTTP(S) penuh diperlukan; tiada akhiran `/v1/traces` ditambahkan            |
| `headers`                | Baris `Name: value` atau objek JSON rentetan pilihan; disulitkan                      |
| `requestHeaderAllowlist` | Kosong (dimatikan); nama/awalan pengepala klien untuk direkodkan sebagai atribut span |
| `serviceName`            | `omniroute`; sumber `service.name`                                                    |
| `langfuseMapping`        | `false`; menambahkan atribut penjanaan/sesi/pengguna Langfuse                         |
| `identity`               | `pseudonymous`, `keyName`, atau `none`                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                               |
| `timeoutMs`              | `30000` bagi setiap percubaan HTTP                                                    |
| `environment`            | Tidak ditetapkan; `langfuse.environment` pilihan                                      |

Papan pemuka generik memaparkan medan ini. `paths` menerima tatasusunan API atau kawasan teks
dengan laluan tepat yang dipisahkan oleh baris baharu/koma. Embeddings, rerank dan laluan lain
dilangkau melainkan dibenarkan secara eksplisit. Baris yang dilangkau masih memajukan kursor; pembilang
`exported`/`exportedTotal` pelaksana sedia ada mengira baris sumber yang diproses, termasuk baris
yang ditapis, bukannya span yang diterima. Penapisan dilakukan dalam proses anak, tanpa mengubah
kontrak IPC/kursornya.

Pengesahan URL menggunakan pembantu `parseAndValidateNonMetadataUrl` yang tidak bergantung pada DB daripada
`src/shared/network/outboundUrlGuard.ts`: dasar `block-metadata`. Ia mempunyai semakan
metadata/protokol/kelayakan terbenam tanpa syarat yang sama seperti pengesah webhook dengan
URL peribadi dibenarkan secara pilihan, tetapi sengaja membenarkan sasaran localhost/LAN tanpa
penggantian bendera ciri global. Ini membolehkan titik akhir Langfuse, Phoenix, Tempo dan Collector
hos kendiri, termasuk titik akhir HTTP peribadi. Hos metadata awan sentiasa disekat.
Pengalihan tidak diikuti, jadi pengumpul tidak boleh mengalihkan kelayakan ke hos yang berbeza.
Seperti pengawal URL leksikal sedia ada, ini tidak menetapkan resolusi DNS secara tetap; hanya konfigurasikan
hos yang dikawal oleh pengendali. Utamakan HTTPS apabila titik akhir tidak berada pada rangkaian yang dipercayai.

### Muatan dan penghantaran

JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) membawa satu
span CLIENT bagi setiap baris yang dibenarkan, dinamakan mengikut laluan permintaannya yang tepat. Penamaan laluan membezakan
Chat Completions, Responses dan Messages tanpa membenamkan data model atau identiti dalam
nama span. Atribut sumber termasuk `service.name` dan `service.version` pakej.

Pencatat percubaan sembang biasa (`open-sse/handlers/chatCore/attemptLogging.ts`) menulis
`duration = Date.now() - startTime` ketika selesai dan tidak membekalkan cap masa;
`saveCallLogOperation` dalam `src/lib/usage/callLogs.ts` menetapkan cap masa secara lalai kepada masa penulisan
(penyelesaian). Oleh itu, eksport menetapkan tamat = cap masa baris dan mula = tamat − tempoh
(milisaat, ditukar kepada nanosaat perpuluhan). Cap masa sejarah yang dibekalkan oleh pemanggil
juga dikekalkan sebagai masa tamat; tiada pembeza mula/penyelesaian bagi setiap baris.
Tempoh null menjadi sifar. Cap masa yang tidak sah/tiada menyebabkan kelompok gagal dan bukannya menghasilkan
span yang tidak deterministik. `ttftMs` boleh bernilai null dan dipetakan kepada `omniroute.ttft_ms`.

Atribut termasuk `gen_ai.operation.name="chat"`, penyedia, model yang diminta/model respons,
token input/output, token bacaan cache/penciptaan cache/penaakulan pilihan, status HTTP,
kombo, sumber cache, tag sesi dan ID korelasi. Nilai integer OTLP dan cap masa
ialah rentetan perpuluhan; rentetan, boolean dan nombor pecahan menggunakan varian nilai OTLP
asalnya. Span ralat mempunyai status ERROR dan mesej status yang disanitasi. Rekod
kanonik tidak mempunyai URL hos huluan, jadi `server.address` digugurkan dan bukannya tersilap
mengenal pasti pengumpul sebagai pelayan model. Kos tidak dieksport.

Hanya `includeBodies=true` memuatkan kandungan. Dengan `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` membawa JSON badan permintaan/respons
yang disanitasi seperti yang disimpan oleh OmniRoute (dikanonikkan apabila boleh dihuraikan), bukannya tatasusunan
mesej semconv yang dibentuk semula. Badan yang dipotong/bukan JSON kekal sebagai teks mentah. Dengan `langfuseMapping=true`,
badan hanya dikeluarkan sebagai `langfuse.observation.input` / `langfuse.observation.output`;
atribut `gen_ai.*.messages` digugurkan supaya setiap badan dihantar sekali sahaja. Kedua-dua mod
mewarisi `maxBodyBytes` daripada laluan pemuatan sedia ada;
`omniroute.bodies_truncated=true` menandakan pemotongan.
Tiada petikan keadaan saluran pemprosesan tambahan atau pembacaan artifak yang tidak disanitasi ditambahkan oleh destinasi ini;
perekodan pengepala permintaan pilihan menggunakan petikan keadaan klien termuat sedia ada yang diterangkan di bawah.
Gunakan kekerapan pada skala minit seperti `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` apabila mengeksport
badan, dan bukannya mengumpulkan tunggakan setiap jam.

### Pengepala permintaan klien pilihan

Perekodan pengepala **dimatikan secara lalai**. Tetapkan `requestHeaderAllowlist` dalam konfigurasi destinasi
dan aktifkan **Eksport prom dan respons** (`includeBodies: true` pada destinasi).
Senarai dibenarkan menerima tatasusunan API atau kawasan teks dengan nama yang dipisahkan oleh baris baharu/koma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nama dipadankan secara tepat tanpa mengira huruf besar atau kecil, melainkan satu `*` di hujung memilih awalan
nama pengepala yang tidak kosong. `*` sahaja, kad bebas terbenam dan nama pengepala HTTP yang tidak sah ditolak.
Terdapat paling banyak 64 pemilih, setiap satunya dengan nama/awalan sepanjang paling banyak 256 bait ASCII.
Tetapan ini berasingan daripada `headers`, yang mengesahkan pengeksport kepada pengumpul.

Penangkapan hanya membaca `pipeline_client_request`, yang diisi daripada `clientRawRequest`
(atau `clientRequest` legasi) dalam saluran pemprosesan terperinci yang disimpan. Ia tidak sekali-kali menggunakan pengepala permintaan penyedia sebagai sandaran.
Pengelogan saluran pemprosesan terperinci mestilah telah didayakan semasa permintaan direkodkan. Apabila
`includeBodies` dinyahdayakan, atau JSON petikan klien tiada, rosak atau terpotong, tiada atribut
pengepala dikeluarkan. Meningkatkan `maxBodyBytes` boleh mengelakkan pemotongan petikan semasa eksport;
ia tidak dapat memulihkan butiran yang tidak pernah disimpan. Petikan melebihi 1 MiB atau mengandungi lebih daripada
256 entri pengepala diabaikan. Eksport prom/respons sedia ada kekal didayakan bersama
penangkapan pengepala; senarai izin tidak menyediakan mod penghidratan pengepala sahaja.

Nilai yang dipilih menjadi tatasusunan rentetan OTLP `http.request.header.<full lowercase header name>`,
walaupun untuk satu rentetan sahaja. Contohnya, `X-OmniRoute-Meta-Team: example-team` menjadi
`http.request.header.x-omniroute-meta-team` dengan
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Awalan penuh dikekalkan: ini ialah pengepala biasa, tanpa penghuraian medan perniagaan atau
penukaran metadata `omniroute.metadata.*` / Langfuse. `langfuseMapping` tidak mengubah semantik
pengepala. `User-Agent` bernilai tunggal yang dipilih turut menetapkan skalar standard
`user_agent.original`. Koma dalam satu nilai tidak digunakan untuk memisahkan nilai. Varian huruf besar/kecil digabungkan mengikut susunan
entri yang disimpan; sebarang varian yang tidak sah menyebabkan seluruh pengepala itu digugurkan. Atribut disusun mengikut nama huruf kecil.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, pengepala kunci API, nama yang mengandungi
penanda auth/token/secret/password/credential, dan kelayakan get laluan dalaman sentiasa
dikecualikan, walaupun dipilih atau ditopeng sebahagiannya dalam storan. Corak kelayakan yang diketahui menggunakan semula
pengesan kelayakan yang dikongsi; penanda penyuntingan digugurkan, bukan dieksport sebagai nilai yang selamat.
Hanya rentetan dan tatasusunan rentetan yang tidak kosong diterima; nombor atau objek tidak ditukar secara paksa.
Nama tidak sah, kunci prototaip, aksara kawalan (kecuali tab mendatar) dan Unicode yang cacat
diabaikan tanpa menggagalkan kelompok atau memaparkan kandungannya dalam ralat.

Setiap span menangkap paling banyak 32 pengepala, 16 nilai bagi setiap pengepala, 4096 bait UTF-8 bagi setiap nilai,
dan jumlah keseluruhan 16384 bait UTF-8 merangkumi nama dan nilai pengepala yang ditangkap. Pengepala yang terlalu besar/tidak sah
digugurkan sepenuhnya, bukan dipotong. Pemilihan ialah keputusan privasi pengendali: nama yang kelihatan selamat
masih boleh mengandungi data peribadi, dan had/pengesan ini bukan alat pembersihan PII umum.

### Had penghantaran

Permintaan dihadkan kepada 500 span dan 4 MiB JSON UTF-8, termasuk sampul.
Saiz setiap span yang dibenarkan diperiksa sebelum permintaan pertama bagi kelompok kursor. Satu
span yang lebih besar daripada had menyebabkan tiada bahagian kelompok itu dihantar dan gagal dengan panduan untuk mengurangkan
`maxBodyBytes`; ia tidak digugurkan secara senyap. Prapemeriksaan hanya mengekalkan rujukan rekod dan
kiraan bait, sambil membuang setiap span/JSON sementara; span dibina semula untuk cebisan terhad
dan bukannya menyimpan salinan tersiri kedua bagi kelompok tersebut. HTTP 408/429/5xx, kegagalan rangkaian dan tamat masa diberi paling banyak
tiga percubaan, dengan sela undur eksponen 250/500 ms. Saat atau tarikh HTTP dalam `Retry-After`
boleh memanjangkan penangguhan sehingga 5 saat. Status lain gagal serta-merta. Penolakan separa OTLP 2xx juga mencetuskan ralat dan bukannya
mengakui span yang hilang; pengakuan kosong atau JSON yang sah diterima, dengan
had bacaan respons 64 KiB.

Ralat hanya mengandungi fakta milik pengeksport: status HTTP, kelas percubaan semula, bilangan percubaan dan
bilangan span yang dihantar, atau ungkapan tetap bagi kegagalan pengakuan/rangkaian. Badan respons pengumpul,
kiraan kejayaan separa dan pengepala respons tidak sekali-kali disalin ke dalam ralat, log atau
papan pemuka. Kelompok yang gagal atau diterima sebahagiannya tidak diakui: destinasi memaparkan
Gagal dengan status tersebut, kursor kekal pada kelompok terakhir yang diakui, dan pelaksanaan seterusnya
menghantar semula baris yang sama. Status kekal terus menyebabkan kegagalan sehingga pengumpul atau konfigurasi
dibetulkan. Gunakan log pengumpul sendiri untuk butiran respons. Ringkasan ralat log panggilan mengekalkan
penyuntingannya yang berasingan.
`prepare()` tidak menyediakan apa-apa; Uji menghantar tepat `{"resourceSpans":[]}` dan melaporkan
status HTTP tanpa menulis span log panggilan.

ID surih dan ID span ialah 32/16 digit heks pertama SHA-256 bagi
`"omniroute.trace\\0" + callLogId` dan `"omniroute.span\\0" + callLogId`. Penghantaran semula membawa
ID yang sama. Ini bukan jaminan penyahduplikasian: sesetengah sistem bahagian belakang, termasuk pengingesan Langfuse
v4, tidak menyahduplikasi span dengan ID yang sama. Ranap atau kegagalan separa cebisan boleh
menyebabkan penghantaran semula paling banyak satu kelompok kursor yang belum diakui; seluruh kelompok itu mungkin diduplikasi,
bukan sekadar cebisan HTTP terakhirnya. Pilih saiz kelompok kursor dengan mengambil kira pertimbangan tersebut.

### Contoh Langfuse

Konfigurasikan medan ini untuk tika Langfuse yang dihoskan sendiri:

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

Bina nilai Authorization secara setempat sebagai Base64 bagi rentetan literal `public-key:secret-key`
(contohnya dengan `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Jangan tampalkan kelayakan sebenar ke dalam log, tangkapan skrin atau isu. Pemetaan secara automatik
menetapkan `x-langfuse-ingestion-version: 4`; Authorization masih dibekalkan dalam `headers`.
Kedua-dua pengepala dan garam identiti yang dijana menggunakan mekanisme medan rahsia tersulit
dan pemegang tempat API yang sedia ada; `STORAGE_ENCRYPTION_KEY` diperlukan.

Pemetaan menambah jenis/model penjanaan, butiran penggunaan JSON (input/output/jumlah dan
kunci cache yang tersedia), petikan keadaan input/output JSON, tahap ERROR/DEFAULT, mesej status yang disanitasi,
nama jejak, id sesi, persekitaran pilihan dan
`langfuse.observation.metadata.<key>` yang boleh ditapis untuk penyedia, model yang diminta, laluan, kombo, sumber
cache dan status. `langfuse.observation.completion_start_time` ialah ISO 8601 pada
masa mula + TTFT hanya apabila TTFT diketahui dan berada dalam tempoh tersebut. Tiada atribut kos dihantar.

Mod identiti digunakan pada `langfuse.user.id`:

- `pseudonymous` (lalai): HMAC-SHA256 bagi id dalaman kunci API dengan salt rawak
  32 bait bagi setiap destinasi. Salt dijana semasa penciptaan jika tiada, disulitkan
  sebagai `identitySalt`, tidak pernah dikembalikan, dan dikekalkan semasa penyuntingan. Id kunci mentah tidak pernah
  dimasukkan ke dalam atribut span. Mencipta semula/menggilirkan salt destinasi akan mengubah identiti.
- `keyName`: nama kunci API yang dikonfigurasikan, yang sengaja mendedahkan label pengendali tersebut.
- `none`: tiada id pengguna. Tag sesi masih dieksport apabila tersedia; mod ini tidak
  menyahnamakan kandungan prom sewenang-wenangnya atau label sesi/korelasi yang dibekalkan oleh pengendali.

### Bermula tanpa pengisian semula

Semasa penciptaan sahaja, dayakan **Mula dari kedudukan semasa (langkau log sedia ada)** atau hantarkan
`startFromCurrentPosition: true` pada peringkat teratas muatan API penciptaan. Ini memulakan
`cursor_row_id` kepada rowid maksimum semasa bagi log panggilan yang dikekalkan menggunakan fungsi pembantu kursor
sedia ada, tanpa migrasi. Nilai lalai ialah false (kursor 0 dan pengisian semula sejarah yang dikekalkan).
Ini bukan tetapan penetapan semula kursor semasa kemas kini.

Penambahan `ttftMs` yang dikongsi turut menambah lajur `ttft_ms` yang boleh bernilai null pada pemeta BigQuery
dan skema jadual baharu: ujian skemanya memerlukan setiap medan rekod kanonik mempunyai
lajur. Jadual sedia ada terus dieksport tanpa perubahan: `prepare()` membaca skema jadual dan
hanya menggugurkan `ttft_ms` apabila lajur tersebut tiada. Tambahkan lajur INT64 yang boleh bernilai null untuk mendapatkan TTFT
pada pelaksanaan seterusnya, atau gunakan jadual baharu. Tiada PATCH, perubahan skema automatik atau kebenaran
tambahan diperlukan; semua medan baris lain mengekalkan pemeriksaan skema yang ketat.

---

## 6. Menambah destinasi

1. Cipta `src/lib/logExport/destinations/<name>.ts` yang mengeksport `LogExportDestinationType`:
   `configSchema` Zod, tatasusunan pemerihal `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkannya pada tatasusunan `DESTINATIONS` dalam `src/lib/logExport/registry.ts`.
3. Tulis ujian di bawah `tests/unit/`.

Itulah keseluruhan perubahan: penyimpanan berterusan, tugas cron, lapisan REST, penyulitan rahsia dan
borang papan pemuka semuanya membaca daftar tersebut.

Dua peraturan untuk destinasi baharu:

- `send()` **mesti melontarkan pengecualian** apabila berlaku kegagalan separa. Penyelesaian yang berjaya bermaksud "destinasi mempunyai baris-baris ini",
  dan kursor bergerak melepasinya secara kekal.
- Destinasi yang menerima URL yang dibekalkan pengguna mesti mengesahkannya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum membuat pengambilan,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukannya: hosnya ialah pemalar.

---

## 7. Mengendalikannya

- **Papan pemuka**: Integrasi → Eksport log. Tambah destinasi, jalankan **Uji** untuk menyemak kelayakan
  tanpa menulis baris, kemudian dayakannya.
- **Tunggakan**: setiap kad destinasi menunjukkan baris yang belum diproses dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama berserta 20 pelaksanaan tugas terakhir.
- **Destinasi yang gagal tidak menyebabkan destinasi lain gagal** — ringkasan pelaksanaan merekodkan status setiap destinasi
  dalam `last_status` / `last_error`, dan sejarah pelaksanaan tugas menyimpan agregatnya.
- **Memadam destinasi turut memadam kursornya.** Menambahkannya semula bermula daripada
  log panggilan tertua yang masih disimpan, lalu menghantar semula baris yang mungkin sudah ada di destinasi. Pada BigQuery, `insertId`
  bagi setiap baris hanya menangani pendua tersebut dalam tempoh penyahduplikasian BigQuery sendiri, jadi utamakan menyahdayakan
  destinasi berbanding memadamkannya.
