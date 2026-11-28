# Quota Sharing Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referensi dokumen**: `docs/routing/QUOTA_SHARE.md`
> Bagian dari Grup B (rencana 16 + 22).

---

## Gambaran Umum

Mesin Berbagi Kuota mendistribusikan kuota berbasis waktu milik penyedia (misalnya
jendela 5 jam Codex, Kimi 1500 permintaan/jam) secara adil ke beberapa kunci API
yang menggunakan koneksi yang sama.

**Masalah yang diselesaikan:** OmniRoute memproksikan banyak kunci API ke akun
penyedia upstream yang sama. Tanpa logika berbagi, lonjakan dari kunci A dapat
menghabiskan kuota penyedia untuk satu jam, sehingga kunci B dan C diblokir hingga
jendela direset. Mesin ini mencegahnya dengan:

1. Melacak konsumsi bergulir setiap kunci per dimensi (%, permintaan, token, $).
2. Menerapkan algoritma pembagian adil yang mempertahankan penggunaan kapasitas: sebuah kunci dapat meminjam dari
   bagian yang tidak digunakan selama kumpulan global belum jenuh.
3. Menerapkan hasilnya di jalur kritis (`chatCore.ts`) sebelum permintaan
   mencapai eksekutor upstream.

---

## Algoritma: Pembagian Kerja yang Adil dan Pelestarian

Diimplementasikan di `src/lib/quota/fairShare.ts`.

### Mode

| Kondisi                                    | Mode         | Perilaku                                                          |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Dermawan** | Kunci dapat meminjam hingga batas global dikurangi total konsumsi |
| `globalUsedPercent >= saturationThreshold` | **Ketat**    | Tegakkan pembagian yang adil secara individu dengan ketat         |

`saturationThreshold = 0.5` bawaan (env `QUOTA_SATURATION_THRESHOLD`).

Kedua mode ini menggambarkan kumpulan dalam mode peminjaman default, `saturation`. Kumpulan dalam mode `consent` selalu menerapkan aturan ketat, apa pun saturasinya. Lihat [Pinjaman yang disetujui (keikutsertaan per kumpulan)](#consented-lending-per-pool-opt-in).

### Keputusan per dimensi

Untuk setiap dimensi aktif di kumpulan, mesin menghitung:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Untuk dimensi `percent`, `consumed` berasal dari buku atribusi (lihat [Dimensi persen: atribusi per kunci](#percent-dimensions-per-key-attribution) ).

Kemudian:

- **`policy = hard`** : jika `consumed > fairShareAllowed` dan modenya ketat →** memblokir** .
- **`policy = soft`** : jika `consumed > fairShareAllowed` dan modenya ketat →** menghukum** (kurangi prioritas dalam kombo; jangan pernah melakukan hard-block).
- **`policy = burst`** : mengizinkan selama ruang utama global masih ada, terlepas dari pembagian yang adil.

### Tutup absolut

`capValue` + `capUnit` pada suatu alokasi adalah batasan maksimum yang tidak bergantung pada mode atau kebijakan. Dimensi apa pun di mana `consumed >= capValue` selalu** blok** permintaan tersebut. Untuk batas `percent`, `consumed` hanyalah bagian yang dikaitkan dengan kunci.

### Pemeriksaan multi-dimensi

Permintaan diblokir jika** setiap** dimensi di kolam akan menghalanginya. Dimensi bersifat independen — kelelahan 5 jam% tidak memengaruhi dimensi% mingguan.

### Peminjaman

Dalam mode murah hati, kunci yang alokasinya kurang terpakai dapat menggunakan surplus dari bagian kunci lain yang tidak terisi. Rumusnya adalah:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

dimana `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (kumpulan `limit` untuk dimensi tersebut) selalu menjadi batas tertinggi.

### Pinjaman yang disetujui (keikutsertaan per kumpulan)

Setiap kumpulan memiliki mode pinjaman. `saturation` adalah default dan menjaga aturan di atas. Dalam mode `consent` kunci `hard` meneruskan bagiannya hanya dalam kapasitas yang disetujui untuk dipinjamkan oleh kunci lain. Administrator mengatur mode setiap kumpulan. Setiap pemegang kunci menetapkan persetujuannya sendiri melalui [persetujuan Peminjaman](#lending-consent).

Persetujuan adalah persentase dari 0 hingga 100 dan tenggat waktu opsional dalam waktu milidetik. Kuncinya meminjamkan persentase bagian menganggurnya sementara tenggat waktunya masih di masa depan.

Untuk satu dimensi, `L` adalah batas efektif: batas rencana dikalikan akun dalam kumpulan. Gerbang menghitung, untuk kunci yang meminta:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` adalah bobot kunci, atau `100 / n` untuk setiap kunci bila tidak ada bobot yang melebihi 0. `lend_k` adalah persentase aktif kunci, dan 0 setelah batas waktu telah berlalu. Persetujuan dari kunci yang meminta tidak pernah dihitung. Kunci `hard` ditolak setelah konsumsinya mencapai bagiannya ditambah `borrowAvailable`.

Kapasitas yang tidak memiliki klaim alokasi (100 dikurangi jumlah bobot) tidak dapat dipinjamkan. Tidak ada kunci yang setuju untuk meminjamkannya.

**Contoh.** `L` adalah 1000.

| Kunci | Berat | Membagikan | Dikonsumsi | Meminjamkan |
| ----- | ----- | ---------- | ---------- | ----------- |
| A     | 50    | 500        | 530        | 0%          |
| B     | 30    | 300        | 100        | 50%         |
| C     | 0     | 0          | 60         | 0%          |

- B meminjamkan 50% dari 200 yang menganggur, yaitu 100. C sudah mengambil 60 di atas bagiannya. A boleh meminjam 40.
- A disajikan pada 530 dan ditolak setelah konsumsinya mencapai 540.
- Sebelum C menggunakan sesuatu, dengan A pada atau di bawah bagiannya, C dapat meminjam 100.
- Sebelum C menggunakan apa pun, dengan A pada 530, C dapat meminjam 70.

**Berat nol.** Kunci dengan bobot 0 memiliki bagian 0. Kunci tersebut dilayani hanya ketika konsumsinya berada di bawah jumlah yang dipinjamkan oleh pihak lain. Ketika tidak ada yang meminjamkan, permintaan pertamanya ditolak.

**Tenggat waktu.** Tidak ada tugas latar belakang yang masa berlakunya habis masa berlaku persetujuannya. Setiap permintaan membandingkan tenggat waktu dengan waktunya sendiri, dan tenggat waktu yang sama dengan waktu tersebut telah berlalu. Batas waktu tersimpan yang bukan merupakan angka terbatas, atau melewati tanggal terbesar yang dapat ditampung oleh `Date`, dianggap telah berlalu.

**`soft` dan `burst`.** Pinjaman tidak membatasi mereka. Kunci `soft` diturunkan prioritasnya setelah melewati bagiannya. Kunci `burst` lewat saat kolam memiliki ruang. Langit-langit kolam masih menolak setiap kunci setelah total kolam mencapai batasnya.

**Biaya pada jalur permintaan.** Kumpulan `saturation` tidak membaca lebih dari sebelumnya. Dalam kumpulan `consent`, dimensi yang dapat dihitung membaca kunci lain hanya untuk kunci `hard` pada atau di atas bagiannya sementara kunci lain meminjamkan. Ini kemudian membuat satu pembacaan per kunci lainnya, secara paralel. Pembacaan yang gagal dihitung sebagai konsumsi 0 untuk kunci tersebut. Dimensi `percent` tidak menambahkan pembacaan, karena buku atribusi menampung setiap kunci.

**Mengedit kumpulan.** Pengeditan mempertahankan persetujuan kunci yang tetap ada. Ini berlaku untuk pengeditan alokasi, penggantian seluruh grup, dan panggilan `ensure`. Kunci yang dihapus kehilangan persetujuannya, dan kunci yang ditambahkan kembali dimulai dari 0. Rute admin mengembalikan persetujuan setiap kunci dan tidak pernah menulisnya. Mengalihkan kumpulan kembali ke `saturation` mempertahankan setiap persetujuan yang disimpan, yang tidak berpengaruh dalam mode tersebut. Mengalihkan kumpulan ke `consent` akan mengaktifkan kembali persetujuan tersimpan yang tenggat waktunya belum lewat. Pemegang kunci dapat menghapus persetujuan yang disimpan dalam mode mana pun.

**Perbaikan.** Jika kolom `lending_percent` dan `lending_until` sudah ada, migrasi hanya menambahkan `borrow_mode`, dan persentase yang disimpan tetap seperti semula. Setiap kumpulan dimulai dalam mode `saturation`. Aktifkan `consent` per pool di wizard pool. Tidak ada yang disimpulkan dari nilai yang disimpan.

**Keterbatasan.**

- Pemberi pinjaman dapat menemukan pool di batas atas sebelum menggunakan bagiannya sendiri. Kapasitas yang dipinjam pihak lain diperhitungkan dalam total kumpulan.
- Pemeriksaan berjalan sebelum permintaan dan tidak mencadangkan apa pun. Permintaan serentak membaca konsumsi sebelum dicatat, sehingga kapasitas yang dipinjamkan dapat digunakan lebih dari satu kali, dibatasi oleh permintaan dalam penerbangan. Pemeriksaan berbagi mode `saturation` memiliki properti yang sama.

---

## Penghitung Jendela Bergulir

Diimplementasikan dalam `src/lib/quota/sqliteQuotaStore.ts` dan `redisQuotaStore.ts`.

Dua bucket per `(apiKeyId, dimensionKey)`:

- `curr`: bucket saat ini (`floor(nowMs / windowMs)`)
- `prev`: bucket sebelumnya (`curr - 1`)

Nilai bergulir efektif:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Presisi**: akurat ~99%. Galat paling banyak sebesar 1% dari ukuran jendela pada
batas antar-bucket (melekat pada aproksimasi 2 bucket).

### Konkurensi

Driver SQLite: mutex dalam memori per kunci `(apiKeyId | dimensionKey)` mencegah
race baca-modifikasi-tulis. Polanya menyerupai mekanisme anti-thundering-herd di `src/sse/services/auth.ts`.

Driver Redis: skrip Lua EVAL untuk inkremen atomik — berjalan sebagai satu perintah Redis.

---

## Driver

### SQLite (default, tanpa instalasi)

- Tabel: `quota_consumption` (lihat migrasi `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Paling sesuai untuk deployment satu instans.
- Semua persistensi berada dalam DB SQLite OmniRoute yang sudah ada (`DATA_DIR/storage.sqlite`).

### Redis (opsional, multi-instans)

- Memerlukan package npm `ioredis`.
- Penghitung disimpan di Redis; metadata (pool/alokasi) tetap berada di SQLite.
- Paling sesuai untuk deployment dengan banyak replika ketika penghitung harus digunakan bersama.

### Mengganti driver

Melalui UI pengaturan (`/dashboard/settings` → Penyimpanan Kuota), atau melalui variabel lingkungan:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Pengaturan DB lebih diprioritaskan daripada variabel lingkungan. Jika `driver=redis` tetapi URL tidak tersedia atau
`ioredis` tidak terinstal, factory akan kembali menggunakan SQLite dan mencatat peringatan.

Urutan pemilihan driver:

1. Pengaturan DB `quotaStore.driver`
2. Variabel lingkungan `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Multi-Dimensi

Sebuah kolam dapat memiliki banyak dimensi. Setiap dimensi bersifat independen:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Contoh: rencana Codex** (5 jam% + mingguan%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Permintaan harus memenuhi semua dimensi agar dapat diizinkan.

### Dimensi persen: atribusi per kunci

Paket persen melaporkan satu angka penggunaan per akun dan jendela paket. Penyedia tidak memberikan counter per kunci API.

Untuk membagi angka tersebut antar kunci, setiap kumpulan menyimpan buku atribusi per akun dan jendela paket. `src/lib/quota/percentLedger.ts` memegang aturan buku. `src/lib/quota/percentAttribution.ts` mengubah buku menjadi angka-angka yang digunakan penegakan hukum. Hasilnya adalah perkiraan yang dibuat dari token yang dirutekan oleh setiap rute utama.

#### Bacaan yang menggerakkan buku

Buku hanya berpindah pada figur penyedia sendiri untuk jendela paket yang diminta. Koneksi ini melaporkan satu hal:

| Penyedia                      | Rencanakan jendela |
| ----------------------------- | ------------------ |
| Claude, melalui koneksi OAuth | `5h`, `weekly`     |
| Codex                         | `5h`, `weekly`     |

Ini tidak dihitung sebagai bacaan:

- respons yang ditandai oleh klien penyedia sebagai basi
- jendela Claude yang persentasenya tidak dilaporkan oleh penyedia
- gambar jendela lain, atau kasus terburuk di seluruh jendela
- fallback header batas kecepatan
- pembacaan yang gagal

Penyedia lain, termasuk Claude dengan kunci API, tidak memiliki buku. Setiap kunci dikenakan biaya 0 pada persentase dimensinya, seperti sebelum perubahan ini.

Pembacaan membagikan cache 30 detik dari sinyal saturasi. Pembacaan Claude diberi tanggal pada saat angka tersebut diamati di header respons atau dibaca dari titik akhir penggunaan, ketika waktu tersebut diketahui. Pembacaan lainnya diberi tanggal pada saat entri cache tersebut dibuat.

#### Apa yang disimpan buku itu

Setiap permintaan yang tercatat menambahkan tokennya, satu kali, ke penghitung per kumpulan, akun, dan kunci. Penghitung hanya tumbuh. Buku ini menyimpan tiga hal:

- garis dasar: angka saat buku dibuka atau jendela terakhir diputar
- angka yang terakhir diterapkan
- per kunci, penghitung tokennya pada saat yang sama, disebut tandanya

Buku diperbarui ketika penegakan atau rute penggunaan menghitung atribusi. Penulisan dibandingkan dan ditetapkan pada nomor revisi. Seorang penulis yang kehilangan percobaan ulang sekali pada bacaan baru.

#### Bagaimana bagian kunci dihitung

Setiap bagian kunci dihitung saat buku dibaca. Pertumbuhan angka sejak garis dasar dibagi di antara kunci-kunci secara proporsional dengan token yang masing-masing dirutekan sejak tandanya.

Together, token tersebut menjelaskan paling banyak satu titik dari angka per token `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (default 1.000). Pertumbuhan yang tidak mereka jelaskan bersifat eksternal. Garis dasarnya juga bersifat eksternal.

Misalnya, sebuah buku dibuka pada 0. Kunci A kemudian merutekan 900.000 token dan kunci B merutekan 100.000. Pada angka 60, bagian A berjumlah 54 poin dan bagian B berjumlah 6.

Penghitung di bawah tanda kuncinya telah dimulai ulang dan dihitung penuh. Kunci tanpa tanda, seperti kunci yang bergabung dengan kumpulan di tengah jendela, menghitung semua tokennya. Angka yang tertinggal dari token menyebabkan kesalahan yang hilang pada pembacaan berikutnya. Itu tidak terakumulasi.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` dibaca di setiap atribusi. Nilai yang bukan angka berhingga minimal 1 akan kembali ke 1.000.

#### Bagaimana bacaan mengubah buku

Aturan pencocokan pertama berlaku:

1. **Belum ada buku:** bacaan membuka buku. Angkanya adalah garis dasar dan setiap penghitung ditandai.
2. **Bacaan lama:** pembacaan bertanggal sebelum pembacaan terakhir diabaikan. Begitu juga dengan pembacaan yang waktu resetnya lebih dari 30 menit lebih awal dari pembacaan yang disimpan.
3. **Jendela penyedia baru:** waktu reset lebih dari 30 menit lebih lambat dari yang disimpan membalik buku. Angka tersebut menjadi garis dasar dan setiap penghitung ditandai lagi. Kunci tanpa counter tinggalkan buku.
4. **Jendela berakhir:** waktu reset yang disimpan tidak setelah waktu data pembacaan berarti jendela telah berakhir. Pembacaannya membalikkan buku, apapun bentuknya.
5. **Angka yang lebih tinggi:** hanya angka terakhir yang bergerak. Garis dasar dan tandanya tetap ada.
6. **Angka yang sama:** angka, garis dasar dan tanda tetap. Hanya waktu reset yang tidak dimiliki buku ini yang ditulis.
7. **Angka yang lebih rendah:** angka yang lebih rendah tidak pernah diterapkan seperti itu. Ia membalikkan buku hanya jika tiga hal terpenuhi. Setidaknya dua menit lebih baru dari pembacaan terakhir yang diterapkan. Tidak ada yang mengatakan jendelanya sama dengan jendela terbuka. Ini lebih dari satu poin lebih rendah.

Jendela dihitung sebagai jendela terbuka yang sama ketika tiga benda ditahan. Kedua waktu reset diketahui. Mereka berada dalam jarak 30 menit satu sama lain. Yang disimpan masih menjelang pembacaan. Angka yang lebih rendah di dalam jendela itu tidak mengubah apa pun.

Waktu reset disimpan hanya ketika waktu tersebut mendahului waktu data pembacaan yang membawanya. Angka yang lebih tinggi menyimpan waktu reset pembacaannya ketika angka tersebut dapat digunakan, dan menyimpan waktu yang disimpan sebaliknya. Angka yang sama mencatat waktu reset pembacaannya hanya jika buku tersebut tidak memilikinya. Itu tidak mengubah apa pun. Angka yang lebih rendah yang tidak mengubah catatan buku tidak ada waktu reset.

#### Saat buku itu digunakan

Setelah dibaca, buku akan digunakan kecuali waktu reset yang disimpan tidak melebihi waktu saat ini. Kasus tersebut muncul ketika pembacaan yang dilakukan sesaat sebelum reset, misalnya pembacaan yang disajikan dari cache, diamati tepat setelahnya.

Tanpa bacaan yang dapat digunakan, buku yang disimpan hanya digunakan selagi masih menjadi buku jendela saat ini. Hal ini berlaku dalam dua kasus:

- waktu resetnya diketahui dan masih di depan
- tidak ada waktu reset, dan pembacaan terakhir yang mengubahnya paling lama 15 menit

Kalau tidak, tidak ada yang dapat dikaitkan, seperti ketika tidak ada buku. Buku yang waktu pengaturan ulangnya telah lewat tidak akan dikenakan biaya.

#### Pelaksanaan

Konsumsi suatu kunci pada dimensi persen adalah bagian yang diatribusikan ditambah bagian eksternalnya. Bagian eksternal pertama-tama menggunakan kapasitas tanpa klaim alokasi (100 dikurangi jumlah bobot). Hanya kelebihannya yang dibagi di antara kunci berdasarkan beratnya.

Konsumsi tersebut dibandingkan dengan bagian kunci yang adil seperti pada dimensi lainnya. Mode ketat masih dimulai ketika sinyal saturasi mencapai `QUOTA_SATURATION_THRESHOLD` (default 0,5). Setiap angka diukur berdasarkan batas efektif: batas per akun dikalikan jumlah akun dalam kumpulan.

Batas absolut dengan `capUnit: "percent"` hanya menghitung bagian yang dikaitkan dengan kunci, yang diskalakan dengan cara yang sama. Ambil batas per akun 100 dan k akun. Batasan N kemudian tercapai ketika bagian kunci dari angka akun penayangan mencapai N/k poin. Setiap akun diperiksa berdasarkan bukunya sendiri. Misalnya, dengan dua akun, batas 10 dicapai pada 5 poin dari angka satu akun.

Ketika penyimpanan tidak dapat dibaca, tidak ada yang diatribusikan dan setiap kunci dikenakan biaya 0 pada dimensi tersebut. Jika penulisan buku gagal, atribusi tersebut menggunakan buku yang sedang dibaca. Penulisan token yang gagal membuat token permintaan tersebut tidak dimasukkan dalam buku. Tak satu pun dari kegagalan ini yang memblokir permintaan.

Dalam kumpulan `consent`, rumus peminjaman menggunakan konsumsi setiap kunci pada dimensi persen seperti dijelaskan di atas. Ketika kunci lain dipinjamkan, buku tersebut dibaca satu kali dan diatribusikan ke setiap kunci. Tanpa buku yang dapat digunakan, setiap kunci dikenakan biaya 0. Kunci dengan bobot kemudian lolos, dan kunci dengan bobot 0 hanya lolos ketika kunci lain meminjamkan.

#### Rute penggunaan

`GET /api/quota/pools/{id}/usage` melaporkan angka yang sama melalui fungsi yang sama. Dimensi persen memiliki satu entri per koneksi kumpulan di `accounts`. `consumedTotal` dan `perKey` tingkat atasnya mencerminkan entri pertama.

Rute tersebut juga menerapkan bacaan saat ini, sehingga dapat memajukan buku sesuai permintaan. `internal + external` dapat berbeda dari `consumedTotal` bila tidak ada pembacaan yang dapat digunakan, atau bila angka yang lebih rendah tidak diterapkan.

#### Penyimpanan dan retensi

Kedua toko kuota menyimpan buku tersebut. Di SQLite, pembersihan basis data otomatis, bila diaktifkan, menghapus baris yang tidak diperbarui selama 60 hari. Di Redis, buku dan penghitung koneksi kumpulan berbagi satu kunci. Masa berlakunya habis 60 hari setelah penulisan token atau perubahan buku terakhirnya. Buku yang tidak berubah tidak ditulis ulang, sehingga batasnya ditetapkan di atas jendela rencana terpanjang. Penyetelan ulang riwayat penggunaan secara manual juga menghapus buku-buku di SQLite (lihat Batasan).

#### Keterbatasan

- Semua pertumbuhan angka akun sejak baseline dibagi dengan token yang setiap kunci dirutekan sejak saat itu. Kapan pertumbuhan itu terjadi tidak menjadi masalah.
- Jadi penggunaan yang dilakukan di luar OmniRoute dibebankan ke kunci sesuai dengan izin tokennya. Itu termasuk penggunaan yang dilakukan sebelum permintaan pertama kunci pada jendela, ketika buku sudah terbuka.
- Misalnya, penggunaan luar meningkatkan akun 60 poin sementara tidak ada rute utama. Sebuah kunci kemudian merutekan 30,000 token dan angkanya mencapai 60,6.
- Jika buku dibuka sebelum penggunaan itu, bagian kuncinya adalah 30 poin. Ini juga membawa penggunaan eksternal 7,65, dengan empat kunci berbobot 25.
- Jika buku dibuka setelah penggunaan itu, 60 poin adalah garis dasar. Bagian kuncinya adalah 0,6 poin, dan membawa 15 penggunaan eksternal.
- Permintaan atau kunjungan ke rute penggunaan membuka buku. Jadi apakah penggunaan tersebut dihitung sebagai dasar tergantung pada kapan buku dibuka.
- Dengan lantai default, kunci yang merutekan 60.000 token saat digunakan di luar meningkatkan akun 60 poin dan mendapatkan semua 60 sebagai bagiannya sendiri.
- Dengan batas bawah 50.000, bagiannya sendiri adalah 1,2 poin. 58,8 lainnya bersifat eksternal dan dibebankan berdasarkan beratnya, seperti penggunaan eksternal lainnya.
- Tetapkan `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` mendekati biaya satu poin pada rencana Anda. Penggunaan luar mencakup lalu lintas pada akun yang sama dari kunci di luar kumpulan.
- Batasan persen berlaku di setiap mode. Kunci yang dibatasi dapat ditolak ketika akun berada jauh di bawah ambang batas saturasi.
- Ambil batas 10 dan 12 poin penggunaan luar tadi di jendela. Kunci yang merutekan 20.000 token kemudian ditolak dengan angka akun 12,4%.
- Pembagiannya merupakan perkiraan berdasarkan volume token. Permintaan dihitung sebagai token cepatnya ditambah token penyelesaiannya. Diskon cache dan harga model tidak mengubah jumlah tersebut.
- Permintaan yang tidak diakhiri dengan status 200 tidak mencatat token. Contohnya adalah aliran yang terputus oleh klien dan kesalahan hulu setelah penggunaan digunakan.
- Penggunaan yang disebabkan oleh permintaan tersebut dibebankan ke kunci yang mencatat token, hingga tokennya mengizinkan. Sisanya bersifat eksternal. Itu tidak bergerak mundur. Respons yang melaporkan tidak ada catatan penggunaan token juga tidak mencatat token.
- Penggunaan permintaan yang sedang berlangsung dapat muncul di bagian kunci aktif lainnya untuk keseluruhan permintaan. Ini berpindah kembali hanya ketika permintaan berakhir dengan status 200.
- Penggunaan yang sudah ada di akun saat buku dibuka dihitung sebagai penggunaan eksternal. Ini mencakup peningkatan, kumpulan baru, dan akun baru. Penggunaan di jendela baru sebelum pembacaan pertamanya juga dihitung sebagai penggunaan eksternal.
- Setiap kunci dimulai dengan pembagian bobot penggunaan tersebut, setelah kapasitas tidak ada klaim alokasi. Dengan satu akun pada 85% dan lima kunci berbobot 20, masing-masing dimulai dengan 17 dari 20 kunci yang digunakan.
- Dalam kumpulan dengan beberapa akun, angka akun penayangan diterapkan ke jumlah anggaran. Hal ini tidak diubah oleh buku ini.
- Angka yang lebih rendah di dalam jendela yang dilaporkan penyedia sebagai terbuka tidak diterapkan. Waktu reset yang mundur lebih dari 30 menit dianggap sebagai pembacaan lama.
- Dalam kedua kasus, buku mempertahankan statusnya hingga waktu reset yang disimpan berlalu. Setelah itu, buku tersebut tidak dikenakan biaya hingga ada yang membacanya.
- Solusinya adalah reset riwayat penggunaan secara manual (`POST /api/settings/purge-usage-history`). Ini menghapus buku atribusi dan penghitung tokennya di database SQLite.
- Periode `all` membersihkan setiap buku dan counter. Periode yang lebih singkat pertama-tama menghapus buku-buku yang tidak tertulis di dalamnya. Ini kemudian menghapus penghitung yang tidak tertulis di dalamnya, tetapi hanya untuk koneksi kumpulan yang tidak memiliki buku tersisa. Sebuah buku yang disimpan masih menandai setiap kunci pada counternya.
- Buku yang angkanya tidak berpindah tidak akan ditulis ulang, jadi waktu yang lebih singkat juga dapat menghapus buku di jendela saat ini. Pembacaan berikutnya kemudian membuka buku baru pada angka saat ini.
- Reset tidak menyentuh penyimpanan kuota Redis. Di sana sebuah buku berakhir dengan jendelanya, atau kedaluwarsa 60 hari setelah penulisan terakhirnya.
- Ketika penyedia tidak mengirimkan waktu reset, jendela yang mengatur ulang dan mengisi ulang di atas angka lama di antara dua pembacaan tampak seperti angka yang lebih tinggi. Buku ini mempertahankan garis dasar dan tanda lama.
- Pembacaan diberi tanggal berdasarkan jam lokal. Jika buku tersebut berjalan lebih awal dari penyedia, atau sumber melaporkan waktu penyetelan ulang sedikit lebih awal, buku tersebut dapat menampilkan perbedaan tersebut lebih awal.
- Pertumbuhan dalam rentang pendek tersebut dibagi berdasarkan token yang disalurkan ke dalamnya. Pembacaan pertama jendela berikutnya mengoreksinya. Ketika buku yang dibalik tidak memiliki waktu reset, koreksi tersebut memerlukan angka yang lebih rendah setidaknya dua menit lebih baru dari pembacaan terakhir yang diterapkan.
- Instance yang berbagi pembacaan tanggal penyimpanan Redis dengan jamnya sendiri, jadi jaga agar jam tersebut tetap sinkron. Pembacaan sebuah instance yang jamnya berjalan di belakang terlihat lebih tua dan diabaikan.
- Ketika tidak ada pembacaan yang dapat digunakan setelah waktu reset yang disimpan, persentase pembagian per kunci dan batas persen tidak diterapkan hingga pembacaan kembali. Tanpa waktu reset, ini dimulai 15 menit setelah pembacaan terakhir yang mengubah buku.
- Di toko Redis, buku yang tidak digunakan selama 60 hari dapat kedaluwarsa antara cek penulis dan penulisannya. Kemudian dibuat kembali pada revisi di atas 1, yang merupakan keadaan valid.

---

## Resolver Paket

Diimplementasikan dalam `src/lib/quota/planResolver.ts`.

Urutan prioritas (tertinggi ke terendah):

1. **Override DB manual** — tabel `provider_plans`, per `connectionId`.
2. **Katalog yang dikenal** — `src/lib/quota/planRegistry.ts` (hanya data).
3. **Paket kosong** — tanpa dimensi, memerlukan konfigurasi manual.

### Katalog yang dikenal

| Penyedia              | Dimensi                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tidak diketahui), `tokens/weekly`       |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Tanpa default — memerlukan konfigurasi manual                 |

---

## Integrasi Saluran Pipa

### kait PRE (`open-sse/handlers/chatCore.ts`)

Berjalan sebelum pelaksana upstream, setelah pemeriksaan autentikasi dan kebijakan:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Buka-gagal** : jika `enforceQuotaShare` dilempar, permintaan diizinkan melalui log `pino.warn`. Hal ini mencegah bug mesin kuota memblokir semua lalu lintas.

**Ketika kapasitas kembali.** Penolakan pada bagian kunci atau pada batas atas kumpulan diakhiri dengan salah satu dari dua kalimat, dalam kedua mode peminjaman:

- `percent` window: `. The <window> window resets at <time>.` Waktunya reset laporan penyedia.
- Satuan yang dapat dihitung: `. Enough <window> usage is expected to clear by <time>.` Waktu adalah batas atas dari jendela geser, jika kunci tidak mengirimkan apa pun lagi.

`<time>` adalah ISO 8601 instan di UTC. Penolakan tersebut kemudian membawa `Retry-After`: seluruh detik hingga saat itu, ditambah satu. Klien yang menunggu selama itu akan mencoba ulang paling lama satu detik setelah instan. Jika instannya tidak diketahui, penolakan tersebut tidak membawa hukuman maupun header. Penolakan batasan mutlak tidak membawa keduanya. Kode publik tetap `quota_share_blocked`.

Penolakan berbagi tidak menyentuh koneksi bersama. Ini tidak menetapkan cooldown, tidak ada kunci model, dan tidak ada kegagalan pemutus penyedia, dan kunci kumpulan lainnya tetap disajikan. Ketika setiap target kombo menolak kunci untuk bagiannya, kombo tersebut menjawab 429 tanpa menunggu. Jawabannya membawa petunjuk sebagai `Retry-After`. Jalur embeddings mengakhiri penolakannya dengan kalimat yang sama dan tidak mengirimkan `Retry-After`.

### POST hook (konsumsi catatan)

Setelah respons berhasil:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Catatan melayang** : jika `consume` gagal pasca-respons, penghitung bergulir dihitung terlalu rendah. Sinyal saturasi dari penyedia (misalnya `anthropic-ratelimit-unified-5h-utilization`) mengoreksi perkiraan global pada permintaan berikutnya.

### Kombo penalti lunak (`open-sse/services/combo.ts`)

Ketika `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Penalti diterapkan setelah semua faktor penilaian lainnya. Ini menurunkan kemungkinan kombo otomatis untuk memilih kunci jenuh tanpa memblokirnya secara keras.

---

## Panduan UI

### `/dashboard/costs/quota-share` — Halaman kumpulan utama

Komponen (semua dalam `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponen               | Tujuan                                                                      |
| ---------------------- | --------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Kartu perkenalan yang menjelaskan pembagian kuota kepada pengguna baru      |
| `CreatePoolModal`      | Buat kumpulan kuota baru (koneksi + nama + alokasi awal)                    |
| `PoolCard`             | Ringkasan per kumpulan: nama, koneksi, jumlah alokasi                       |
| `DimensionBar`         | Bilah tumpuk per dimensi: setiap kunci berbagi + penggunaan global          |
| `AllocationTable`      | Tabel dengan konsumsi, pembagian adil, deficit/surplus, bendera peminjaman  |
| `BurnRateChart`        | grafik garis tingkat pembakaran EMA (malas Recharts melalui `dynamic()`)    |
| `EditAllocationsModal` | Edit bobot alokasi, batas, dan kebijakan untuk kumpulan                     |
| `BorrowModeField`      | Pemilih mode pinjam (`saturation` atau `consent`) di wizard                 |
| `LendingBadge`         | Lencana hanya-baca pada kunci yang dipinjamkan, hanya di kumpulan `consent` |

Lencana peminjaman menunjukkan persentase dan, jika ditetapkan, batas waktu dalam UTC dengan nama zona. Ini menilai tenggat waktu pada saat snapshot penggunaan. Batas waktu yang kedaluwarsa atau tidak dapat dibaca ditampilkan sebagai `lending expired`.

Kait halaman:

- `usePools` — mengambil `GET /api/quota/pools` setiap 30 detik.
- `usePoolUsage` — mengambil `GET /api/quota/pools/[id]/usage` sesuai permintaan.
- `useLocalStoragePoolMigration` — berjalan sekali saat dipasang untuk memigrasikan data LS lama.

Langkah kunci dari pool wizard memiliki kotak `Show usage by member to key holders`. Ini menetapkan opsi `memberBreakdown` kumpulan (lihat [Penggunaan anggota](#member-usage) ). Di bawahnya, wizard memperingatkan bahwa seseorang yang mengetahui salah satu kunci yang digunakan dapat mencocokkan bilah dengan kunci tersebut. Jika kotak dicentang, maka akan dikatakan demikian ketika langkah mencantumkan kurang dari tiga atau lebih dari 20 kunci, karena bilah akan tetap tersembunyi. Ini menghitung kunci dalam langkah tersebut dan tidak dapat membedakan kunci mana yang dapat membuat permintaan.

### `/dashboard/costs/quota-share/plans` — Konfigurasi paket penyedia

- `ProviderPlanConfigClient.tsx`: dropdown untuk memilih penyedia, melihat paket yang diselesaikan (otomatis dari katalog atau penggantian manual), dan mengedit dimensi.
- Perubahan tulis ke `PUT /api/quota/plans/[connectionId]`.
- Penghapusan kembali ke katalog atau paket kosong.

---

## Kuota Layanan Mandiri API (ikut serta)

`GET /api/v1/me/quota/{provider}` (juga disajikan di `/v1/me/quota/{provider}`) memungkinkan pemegang kunci API membaca, dengan kuncinya sendiri, berapa banyak langganan bersama yang dimilikinya dan apa yang memblokirnya. Rutenya tipis `src/server/selfService/quotaHandler.ts`; tampilan dibuat oleh `src/lib/quota/selfView.ts` dan kontrak responsnya adalah `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Mengaktifkan dan otentikasi

- Tanda fitur `QUOTA_SELF_PANEL`, `false` default . Saat tidak aktif, permintaan yang mencapai rute mendapat 404. Dengan `REQUIRE_API_KEY=true`, kebijakan API klien menolak kunci yang hilang atau tidak valid dengan 401 sebelum rute dijalankan, apa pun tandanya. Permintaan tanpa kunci tetapi sesi dasbor masuk melewati kebijakan tersebut dan mendapatkan jawaban rutenya sendiri. Bendera tersebut terselesaikan seperti bendera lainnya (penggantian dasbor atau REST, lalu variabel lingkungan dengan nama yang sama); lihat [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Nama tampilan setiap kumpulan dan label setiap jadwal dikembalikan ke pemegang kunci kumpulan persis seperti yang ditulis oleh administrator. Sebelum menyalakan bendera, periksa apakah cocok untuk dibaca oleh pemegang kunci tersebut.
- Kuncinya dibaca dari header saja: `Authorization: Bearer <key>` atau `x-api-key: <key>`. Ketika keduanya dikirim, yang pertama yang memvalidasi digunakan. Kunci dalam string kueri atau cookie diabaikan. Kunci lingkungan server ditolak (401).
- Kuncinya membutuhkan cakupan `self:usage` (403 tanpanya).
- Segmen penyedia dipangkas, menggunakan huruf kecil dan diperiksa terhadap `^[a-z0-9][a-z0-9._-]{0,63}$` (jika tidak, 400), kemudian diselesaikan melalui registri penyedia, sehingga alias seperti `cc` membaca kumpulan `claude`. `claude` dan `anthropic` membaca kumpulan yang sama.

### Apa yang ditunjukkan oleh setiap visibilitas

| Visibilitas    | Memerlukan                                                                        | Bidang                                                                                                                                                                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bagian sendiri | `self:usage`                                                                      | `pools[]` (ref, nama, penyedia, kebijakan, berat, batas), `dimensions[].yourShare`, `accounts[]` dengan `yourShare` (di jendela `percent` tanpa `attributed` dan `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                    |
| Tingkat akun   | `self:usage` + `self:account-quota`, dan penyedia di `sharedQuotaProviders` kunci | menambahkan `dimensions[].total`, `accounts[].dimensions[].account` dan `accounts[].modelWindows`, `attributed` dan `external` di `yourShare` jendela `percent`, dan `members` di kumpulan dengan penggunaan anggota aktif (lihat [Penggunaan anggota](#member-usage) ) |

- `sharedQuotaProviders` adalah pengaturan per kunci (`PUT /api/keys/[id]/self-service`): `null`, default, berarti setiap penyedia yang dijangkau kunci; `[]` berarti tidak ada. `accountVisible` setiap kumpulan menunjukkan visibilitas mana yang diterapkan padanya.
- Bilah akun dan jendela model hanya ditampilkan untuk akun yang koneksinya mungkin digunakan oleh kunci tersebut. Ketika kunci memiliki daftar koneksi yang diizinkan, akun di luar kunci tersebut menyimpan entri `Account N` tanpa `account` atau `modelWindows`. Daftar kosong berarti tidak ada batasan, seperti halnya `/v1/me/status`. Total kumpulan (`dimensions[].total`) tidak bergantung pada daftar itu.
- Dua angka yang ditunjukkan dengan `self:usage` saja berasal dari penggunaan kunci lain. `exhausted` anggaran jadwal mencerminkan konsumsi setiap kunci di bawah jadwal tersebut. Dalam kumpulan yang bobotnya semuanya nol, `weight` kuncinya adalah `100 / number of members`. Keduanya adalah penerapan yang diterapkan pada kunci tersebut.
- Kumpulan diidentifikasi hanya dengan `ref`, nilai buram yang terikat pada kunci panggilan. Nama tampilannya (`name`) disertakan sesuai tulisan administrator. `ref` diturunkan dari kunci dan kumpulan dengan rahasia kunci API server (`API_KEY_SECRET`). Klien tidak boleh menyimpannya: rahasia itu akan berubah jika diputar.
- Akun terdaftar sebagai `Account 1`, `Account 2`, … dalam urutan kumpulan. Tidak ada id kumpulan, id koneksi, email akun, atau nama akun yang dikembalikan, dan responsnya melewati skema kontrak, yang menghilangkan bidang apa pun di luarnya.
- Unit yang dapat dihitung (`requests`, `tokens`, `usd`) dilaporkan sebagai keranjang kumpulan yang diberlakukan oleh gerbang kuota: `limit` = plan limit × akun di kumpulan, `fairShare` = bobot / 100 × `limit` (pembagian sama ketika setiap bobot adalah 0), `consumed` = penghitung kunci sendiri di penyimpanan kuota, `remaining` = `fairShare` − `consumed`, berlantai 0.
- `blocks.schedules` mencantumkan jendela jadwal kunci (`open`/`closed`, `blackout` atau `outside-window`, `retryAfterSeconds`, lantai cadangan, dan apakah anggaran jendela tersebut dibelanjakan); `blocks.modelCaps` mencantumkan batas per jam per model dengan konsumsi.
- Kunci di luar setiap kumpulan penyedia mendapat 200 dengan `pools: []`; `availableModels` (id `qtSd/` yang dilihat kuncinya `/v1/models`), `expiresAt` dan `apiBaseUrl` masih terisi.
- `apiBaseUrl` adalah `OMNIROUTE_PUBLIC_API_BASE_URL`, lalu `OMNIROUTE_PUBLIC_BASE_URL`, jika tidak `null`. Ini tidak pernah menjadi asal usul permintaan itu sendiri.

### `status` dan `reason`

| `status`      | Arti                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Bacaan saat ini.                                                                                                                                                                                                                                                                                                                                                    |
| `stale`       | Pembacaan akun yang disimpan dalam cache ditandai basi, atau akun yang waktu penyetelannya telah berlalu sejak dibaca. Nomor disimpan. Salah satu jendela model yang waktu resetnya telah berlalu menandai seluruh grup `modelWindows` `stale`. Untuk bagian kunci dari jendela `percent` : buku dibaca tanpa akun membaca di cache gerbang untuk mengonfirmasinya. |
| `unavailable` | Tidak membaca; jumlahnya `null`, tidak pernah `0`. `reason` mengatakan alasannya.                                                                                                                                                                                                                                                                                   |

| `reason`                          | Kapan                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Penyimpanan kuota tidak dapat dibaca, atau tidak dapat membaca buku atribusi.                                                         |
| `percent_attribution_unavailable` | Bagian kunci dari jendela `percent` : belum ada buku atribusi untuk akun dan jendela tersebut, atau buku tidak mencantumkan kuncinya. |
| `percent_window_ended`            | Bagian kunci dari jendela `percent` : buku tersebut milik jendela rencana yang telah berakhir.                                        |
| `account_not_used_by_key`         | Bagian kunci itu sendiri dari jendela `percent` : koneksi akun berada di luar koneksi kunci yang diizinkan. Bukunya tidak dibaca.     |
| `window_not_reported`             | Cache batas penyedia tidak memiliki pembacaan untuk jendela paket tersebut.                                                           |
| `connection_lookup_failed`        | Koneksi akun tidak dapat dibaca.                                                                                                      |
| `not_supported`                   | OmniRoute tidak dapat membaca batas penggunaan penyedia akun.                                                                         |
| `fetch_failed`                    | Tidak ada pembacaan cache yang dapat digunakan dan penyegaran batas penyedia gagal.                                                   |
| `not_available`                   | Pembacaan tidak memiliki jendela penggunaan, atau akun tidak memiliki pembacaan sama sekali.                                          |

Ketika penyimpanan kuota tidak dapat dibaca, bidang `blocks` yang didukung penyimpanan ( `exhausted` anggaran jadwal, `consumed` dan `reached` dari batas model) juga merupakan `null`.

### Persetujuan peminjaman

`PATCH /api/v1/me/quota/{provider}` mencatat persetujuan kunci panggilan itu sendiri untuk satu kumpulan. Ia menggunakan aturan flag, header, dan penyedia `GET`. Cakupan `self:usage` mengizinkan penulisan yang satu ini, meskipun namanya dibaca sebagai hanya-baca.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` adalah `ref` yang dikembalikan `GET` untuk kumpulan itu.
- `lendingPercent` adalah bilangan bulat dari 0 hingga 100. Nilai 0 menghapus persetujuan dan batas waktunya. Badan dengan `lendingPercent` 0 diterima dalam mode mana pun.
- `lendingUntil` bersifat opsional: epoch milidetik, atau `null` tanpa batas waktu. Itu harus di masa depan dan paling banyak 8640000000000000. Nilai di bawah 100000000000 dibaca sebagai detik dan ditolak.
- Bidang lainnya ditolak. Isi yang lebih panjang dari 4096 byte ditolak. Pembacaannya berhenti pada ukuran tersebut, sehingga bodi yang lebih panjang tidak akan pernah utuh.

Pemeriksaan dijalankan sesuai urutan tabel ini. Setiap penolakan menggunakan badan kesalahan standar dengan pesan tetap. Penolakan salah satu cek ini tidak berarti apa-apa.

| Status | Pesan                                                                                              | Kapan                                                                     |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Bendera `QUOTA_SELF_PANEL` dimatikan.                                     |
| 401    | `Valid API key required`                                                                           | Kuncinya hilang atau tidak valid, atau merupakan kunci lingkungan server. |
| 403    | `API key lacks the self:usage scope`                                                               | Kuncinya kurang `self:usage`.                                             |
| 400    | `Invalid provider`                                                                                 | Segmen penyedia tidak valid.                                              |
| 429    | `Too many lending changes. Retry later.`                                                           | Kuncinya melewati batasnya. Jawabannya membawa `Retry-After`.             |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Isinya tidak JSON, terlalu panjang, atau tidak sesuai skema.              |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Batas waktu dibaca dalam hitungan detik.                                  |
| 400    | `lendingUntil must be in the future`                                                               | Batas waktunya adalah pada atau sebelum waktu permintaan.                 |
| 404    | `Pool not found`                                                                                   | `ref` tidak menyebutkan kumpulan kunci ini untuk penyedia ini.            |
| 403    | `Lending is not enabled for this pool`                                                             | Kumpulan berada dalam mode `saturation` dan `lendingPercent` di atas 0.   |
| 500    | `Failed to build quota view`                                                                       | Kegagalan lainnya. Penyebabnya login di server.                           |

Batasnya adalah 20 permintaan per 60 detik untuk setiap kunci. Setiap permintaan yang lolos pemeriksaan penyedia dihitung, bahkan permintaan yang ditolak kemudian atau permintaan yang tidak mengubah apa pun. Ia memiliki penghitungnya sendiri, terlepas dari batas tingkat permintaan kunci.

Permintaan yang mengubah persetujuan yang disimpan menulis satu catatan audit `quota.pool.lending.updated`. Ini memberi nama kunci dengan nilai lama dan baru. Badan yang sama dikirim dua kali, menulis satu kali, dan mengaudit satu kali. Jawabannya adalah 200 dengan tampilan `GET` penuh, dibuat setelah penulisan.

Tampilan `GET` melaporkan peminjaman sebagai berikut:

- Setiap kumpulan membawa `borrowMode` (`saturation` atau `consent`), dan `lendingPercent` dan `lendingUntil` milik kuncinya sendiri.
- `lendingActive` adalah `true` hanya di kumpulan `consent`, dengan persentase di atas 0 dan tenggat waktu tidak tercapai.
- Dalam kumpulan `consent`, setiap `dimensions[].yourShare` yang dapat dihitung membawa `borrowAvailable`. Ini adalah apa yang dapat digunakan oleh kunci tersebut di atas bagiannya sekarang, yang dipinjamkan oleh kunci lainnya.
- `borrowAvailable` menggunakan rumus gerbang. Ia membaca setiap kunci lainnya, juga ketika kunci tersebut berada di bawah bagiannya. Untuk kunci `hard` yang merupakan satu pembacaan tambahan per kunci lain dan dimensi yang dapat dihitung, secara paralel.
- `borrowAvailable` adalah `null` untuk kunci `soft` atau `burst`, dan `null` ketika pembacaan gagal.
- `borrowAvailable` adalah satu angka untuk semua kunci lainnya secara bersamaan. Dalam kumpulan dua kunci, itu adalah figur kunci lainnya.
- `borrowAvailable` belum dilaporkan untuk `percent` windows atau di `accounts[]`.
- Dalam kumpulan `saturation` tampilan melaporkan persetujuan yang disimpan dengan `lendingActive: false` dan tanpa `borrowAvailable`.

### Kesalahan

Setiap respons dari rute ini, berhasil atau salah, membawa `Cache-Control: no-store`. Penolakan yang terjadi sebelum rute berjalan tidak membawanya, misalnya kebijakan API klien 401 atau filter IP 403. Kesalahan rute menggunakan isi kesalahan standar dengan pesan tetap: 400 (penyedia tidak valid), 401 (kunci hilang atau tidak valid), 403 ( `self:usage` hilang), 404 (flag off) dan 500 (`Failed to build quota view`). 500 mencakup segala kegagalan setelah permintaan mencapai rute, termasuk pencarian kunci itu sendiri; penyebabnya login di server dan tidak pernah kembali. Kesalahan `PATCH` tercantum dalam [Persetujuan peminjaman](#lending-consent).

### Keterbatasan

- `remaining` adalah bagian dari bagian kunci yang belum digunakan. Ini bukan jaminan. Kunci mungkin masih diberikan di luarnya selama kolam masih memiliki ruang. Setelah total kumpulan mencapai `limit`, setiap kunci kumpulan ditolak, apa pun `remaining` miliknya, dan kunci tanpa `self:account-quota` tidak dapat melihat total tersebut.
- `remaining` tidak memperhitungkan `cap` absolut alokasi. Penegakan menolak kunci setelah konsumsinya sendiri di jendela unit batasan mencapai nilai batasan.
- Bilah tingkat akun berasal dari cache batas penyedia dan dapat memperlambat keputusan penerapan selama beberapa menit. Pembacaan yang waktu resetnya telah berlalu dilaporkan sebagai `stale`.
- Jendela per model (`modelWindows`) dilaporkan hanya untuk penyedia yang memiliki pemetaan jendela rencana: Claude dan Codex hari ini. Untuk penyedia lain `modelWindows` masih ada saat data akun ditampilkan, dengan daftar `windows` kosong.
- Bagian kunci dari jendela `percent` adalah perkiraan. Ini berasal dari buku atribusi dan memiliki setiap batasan yang tercantum pada "Dimensi persen: atribusi per kunci" di atas.
- `consumed` adalah jumlah penegakan dibandingkan dengan bagian yang adil. Tepatnya `attributed` plus `external`. `attributed` adalah bagian yang buku berikan kunci untuk token yang dirutekan. `external` adalah bagian kunci dari penggunaan akun yang tidak diperhitungkan oleh kunci kumpulan.
- Kedua bagian dikirim hanya jika `accountVisible` kumpulan benar: kuncinya memiliki `self:account-quota` dan penyedia ada di `sharedQuotaProviders` nya. Kunci tanpanya mendapat `consumed` sendiri, dengan `status` dan `reason` yang sama.
- Dengan bagian-bagian dan beratnya sendiri, pemegang dapat menghitung penggunaan yang dilakukan di luar kolam yang dibebankan pada kunci kolam. Pemegang dengan cakupan akun sudah melihat total akun.
- Kunci yang tidak merutekan apa pun di jendela masih dapat membaca muatan eksternalnya `consumed`, karena bagian yang diatribusikan adalah 0.
- Misalnya, sebuah buku dibuka pada angka 0, dengan kunci A dan B masing-masing berbobot 50. Kunci A merutekan 900.000 token dan kunci B 100.000. Akun tersebut kemudian mencapai 60% dari batas 100. Kemudian `attributed` adalah 54 untuk kunci A dan 6 untuk kunci B, dan `external` adalah 0 untuk keduanya.
- Tampilan membaca buku dan tidak pernah menulis statusnya. Ia tidak membuka buku, dan tidak pernah meminta bacaan kepada penyedianya. Dengan penyimpanan Redis, pembacaan menghapus bidang revisi yang digantikan di latar belakang, seperti yang dilakukan pembacaan gerbang.
- Bagiannya hanya `ok` sementara cache gerbang menyimpan pembacaan akun. Tanpa satu, itu adalah `stale`, jadi dalam kumpulan tanpa permintaan terbaru, itu mungkin terlihat ketinggalan jaman.
- Sampai permintaan melewati kumpulan, pembagian tidak tersedia. Permintaan itu membuka buku, dan jumlah akun pada saat itu dihitung sebagai penggunaan yang dilakukan di luar kumpulan.
- Dalam kumpulan dengan beberapa akun, setiap entri akun menggunakan buku akun itu sendiri dan batas satu akun. Penegakan hukum menskalakan kedua sisi berdasarkan jumlah akun, sehingga proporsinya sama.
- Jendela per model tidak memiliki bagian untuk kuncinya. Buku ini tidak menyimpan data per model.
- Batas minimum jadwal tidak dievaluasi oleh tampilan: jadwal dapat ditampilkan sebagai `open` sementara permintaan ditolak dengan alasan `schedule-reserve`.
- Ketika dua kumpulan kunci yang sama berbagi koneksi, penegakan menerapkan salah satunya, dan tampilan mencantumkan keduanya.
- Tidak ada batasan per alamat pada upaya kunci yang gagal: di belakang proxy terbalik, penelepon dapat berbagi satu alamat (tergantung pada apakah alamat klien yang diteruskan dapat dipercaya), sehingga penguncian dapat menolak rute ke setiap pemegang kunci. Dengan `REQUIRE_API_KEY=true`, kunci yang tidak valid ditolak oleh kebijakan API klien sebelum rute berjalan, dengan isi 401 kebijakan tersebut dan bukan rute ini.

### Penggunaan anggota

Administrator dapat membiarkan pemegang kunci melihat bagaimana penggunaan jendela terbagi di antara anggota kumpulan. Opsinya adalah `memberBreakdown` kumpulan, dinonaktifkan secara default. Itu diatur di pool wizard atau dengan `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` dan `GET /api/quota/pools/{id}` laporkan.

Dimensi tampilan membawa `members` hanya jika semua ini memenuhi:

- opsi kolam aktif
- kumpulan tersebut memiliki paling banyak 20 kunci yang dialokasikan, dan setidaknya tiga di antaranya dapat membuat permintaan: aktif, tidak dicabut, tidak dilarang, dan belum habis masa berlakunya
- `accountVisible` kumpulan itu benar: kuncinya memiliki `self:account-quota` dan penyedia ada di `sharedQuotaProviders`-nya
- di jendela `percent`, koneksi akun adalah salah satu kunci yang dapat digunakan
- bagian kunci dari jendela itu telah dibaca: `status` -nya bukan `unavailable`

Kalau tidak, `members` tidak ada. Ini bukanlah daftar kosong.

- Setiap irisan adalah `{ slot, consumed, isYou }`. Skema respons menolak properti lain pada satu irisan, dan daftar lebih dari 20 irisan. Irisan dicantumkan dalam urutan slot.
- Terdapat satu irisan per kunci yang dialokasikan, termasuk kunci yang tidak dapat lagi membuat permintaan. Anggota yang tidak berguna menunjukkan angka nol yang sebenarnya.
- Slot 1 selalu menjadi kunci pertanyaan, dengan `isYou` benar. Nomor slot lainnya adalah peringkat hash yang dikunci. Itu dikunci dengan `API_KEY_SECRET` dan mencakup kumpulan, kunci permintaan, dan anggota.
- Jadi angkanya tidak berbaris antar pemegang. Untuk satu pemegang, jumlah tersebut tetap sama di antara kunjungan. Mereka dapat berubah ketika kunci bergabung atau meninggalkan kumpulan, atau ketika rahasia itu diputar.
- Pada jendela terhitung, sebuah irisan adalah penghitung anggota di penyimpanan kuota, penghitung yang sama dengan `consumed` miliknya sendiri.
- Pada jendela `percent` sebuah irisan adalah bagian `attributed` milik anggota, dari buku yang sama yang dibaca sebagai bagian kuncinya sendiri. Penggunaan yang dilakukan di luar kolam tidak pernah dibagi menjadi beberapa bagian. Muatan tersebut dibagi berdasarkan beratnya, sehingga irisan yang membawanya akan menunjukkan beratnya.
- Setiap tampilan membaca satu nilai per anggota lain dan jendela yang dapat dihitung, secara paralel. Pada jendela `percent` irisan tersebut tidak perlu dibaca selain buku yang dibaca milik bagian tersebut. Ketika satu nilai tidak dapat dibaca, jendela itu tidak memiliki `members`, dan bagian kuncinya tetap ada.
- Opsi dan jumlah kunci yang dapat digunakan dibaca satu kali per kumpulan, dan hanya untuk kunci yang dapat melihat data akun. Kegagalan membaca opsi atau jumlah kunci yang dapat digunakan akan mematikan bilah untuk kumpulan itu. Server mencatat peringatan, dan tampilan lainnya dibuat.

Batangan tersebut tidak memuat nama atau identitas. Mereka masih memberi tahu pemegang kunci hal-hal tentang anggota lainnya:

- Pemegang masih dapat mencocokkan irisan berdasarkan nilainya.
- Penomoran yang stabil memungkinkan pemegang mengikuti satu anggota dari waktu ke waktu.
- Jumlah irisan menunjukkan berapa banyak kunci yang dialokasikan di kumpulan.
- Dalam kumpulan tiga kunci, seseorang yang mengetahui salah satu kunci yang digunakan dapat mengetahui kunci apa yang terakhir digunakan.
- Ketika kumpulan turun di bawah tiga kunci yang dapat digunakan, bilah akan hilang. Tampilan yang diambil sebelumnya masih menunjukkan apa yang digunakan masing-masing anggota.
- Pada jendela yang dapat dihitung, total kumpulan dikurangi irisan dapat menunjukkan penggunaan kunci yang tidak lagi dialokasikan.
- Anggota yang menunjukkan angka nol di satu akun dan digunakan di akun lain dapat menunjukkan anggota mana yang menggunakan akun mana.
- Dalam kelompok yang dapat dihitung dengan kebijakan `hard`, potongan yang berhenti tumbuh pada bagian yang adil dari anggota mengisyaratkan bobot anggota tersebut.

### Seri penggunaan (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (juga disajikan di `/v1/me/usage`) mengembalikan penggunaan dan biaya permintaan kunci panggilan itu sendiri: total, satu entri per UTC hari, per hari dan model, per model dan per penyedia. Ini berbagi tanda, aturan otentikasi, cakupan `self:usage`, `Cache-Control: no-store` dan perilaku kesalahan rute kuota di atas. Kuncinya diperiksa sebelum `range`. Kesalahannya adalah 400 (`Invalid range`), 401, 403, 404 dan 500 (`Failed to build usage`).

- `range` adalah salah satu dari `1d`, `7d`, `30d` (default) atau `90d`. Nilai lainnya, nilai kosong, atau parameter berulang adalah 400. Himpunan berhenti di `90d` untuk membatasi biaya panggilan. Tampilan hanya membaca riwayat penggunaan mentah, tidak pernah membaca ringkasan harian, yang tidak membawa kunci.
- Baris dipilih berdasarkan id kunci panggilan. Kolom nama kunci tidak pernah cocok, dan baris yang direkam tanpa id kunci tidak pernah dihitung.
- Membangun rangkaian menjalankan lima kueri yang dikelompokkan pada baris kunci di jendela. Seri yang dibuat digunakan kembali selama 60 detik per tombol dan rentang, dan panggilan yang digunakan kembali tidak dijalankan. `generatedAt` -nya menunjukkan umurnya.
- Jendela berakhir ketika rangkaian dibuat. Baris yang dicap kemudian, misalnya dengan kemiringan jam, tidak dihitung.
- `coverage.retentionDays` adalah pengaturan retensi riwayat penggunaan mentah operator (`retention.usageHistory` dalam pengaturan database). `coverage.truncatedByRetention` bernilai benar jika rentang yang diminta lebih panjang dari pengaturan tersebut. Ini membandingkan dua angka dan tidak memeriksa apakah baris benar-benar hilang.
- Penyedia dikembalikan seperti yang dicatat untuk permintaan kunci itu sendiri. Model adalah nama yang direkam setelah `/` terakhirnya, dan baris dikelompokkan berdasarkan model tersebut. Permintaan kombo yang setiap targetnya ditolak dicatat dengan label perutean sebagai penyedia (nama kombo, `auto` atau `combo`) dan string model yang dikirim klien. Permintaan lain yang ditolak, misalnya oleh pemutus sirkuit terbuka, cooldown model, atau lompatan kuota, tetap menggunakan penyedia dan model target.
- Selain jumlah dan biaya, respons juga membawa latensi rata-rata, tingkat keberhasilan, dan waktu permintaan pertama dan terakhir.
- `byModel` mencantumkan 50 pasangan penyedia dan model dengan permintaan terbanyak. Dengan lebih banyak pasangan, entri-entrinya tidak berjumlah `summary`, dan `summary.uniqueModels` menghitung setiap ejaan model yang direkam. `byModelTruncated` maka benar, dan model yang pasangannya berada di kedua sisi potongan menunjukkan total parsial.
- Dua biaya dilaporkan. `costUsd` adalah biaya yang ditagih, seperti yang ditunjukkan oleh analisis penggunaan. Penyedia langganan tarif tetap, seperti paket Kode Claude, menghitung $0 di sana. `listPriceUsd` adalah penggunaan yang sama dengan harga daftar, termasuk langganan. Permintaan yang modelnya tidak memiliki baris harga menghitung biaya tersimpannya: biaya yang dilaporkan penyedia, atau biaya yang dihitung saat permintaan dicatat. Hanya permintaan yang tidak dihitung 0, tanpa penanda, jadi totalnya bisa sebagian.
- Kontrak responsnya adalah `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` di `docs/openapi.yaml`).

### Halaman layanan mandiri

Dengan `QUOTA_SELF_PANEL` aktif, `/quota/{provider}` adalah halaman publik. Pemegang kunci mengetikkan kunci API di sana dan melihat kumpulan kunci tersebut untuk penyedia. Setiap kumpulan menunjukkan satu kartu per jendela kumpulan, dengan penggunaan kumpulan untuk semua orang dan bagian kuncinya sendiri. Setiap akun kumpulan memiliki kartunya sendiri, dengan penggunaan akun dan pembagian kuncinya. Penggunaan akun hanya muncul ketika kunci dapat melihat data akun. Halaman ini juga mencantumkan batas per model setiap akun dan penggunaan kuncinya sendiri. Pemberitahuan muncul ketika jadwal memblokir kunci saat ini. Sebuah kartu mencantumkan setiap batas kunci per model beserta penggunaannya, dan menandai yang tercapai. `{provider}` adalah id penyedia atau aliasnya (`/quota/claude`, `/quota/cc`). Penyedia yang tidak dikenal, dan setiap jalur `/quota/*` saat bendera tidak aktif, jawab 404. Kumpulan pada node kustom yang kompatibel dengan OpenAI atau Anthropic tidak memiliki halaman. API masih menjawab mereka.

Halaman ini tidak memiliki sesi. Kuncinya hanya dikirim di header `Authorization` dari `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` dan `GET /api/v1/me/usage`, tidak pernah di URL. Kunci yang diterima server disimpan di `sessionStorage` tab. Dengan "Ingat di perangkat ini", kunci tersebut disimpan di `localStorage`, dan "Lupa kunci" menghapusnya dari keduanya. Kunci yang ditolak server akan dihapus dari penyimpanan.

Kumpulan dalam mode `consent` menunjukkan kartu pinjaman. Di sana pemegang kunci menetapkan persentase keseluruhan dari 0 hingga 100 dari bagian kunci yang menganggur untuk dipinjamkan. Pemegang juga memilih berapa lama persetujuan tersebut berlaku: hingga dimatikan, 1 jam, 8 jam, 24 jam, 7 hari, atau 30 hari. Durasi dihitung sejak saat penyimpanan. Meskipun tenggat waktu berlaku, pemegangnya dapat menaatinya. Jika batas waktu tersebut lewat sebelum Simpan, kartu tidak mengirimkan apa pun dan meminta pilihan lain. Dengan 0% tidak ada batas waktu yang dikirim. Kartu menunjukkan tenggat waktu yang disimpan dengan nama zona waktunya. Persetujuan yang batas waktunya telah berlalu akan ditampilkan sebagai berakhir.

Untuk kunci `hard` kartu juga mencantumkan, per jendela kumpulan, kunci lain apa yang dipinjamkan ke kunci tersebut saat ini. Setiap baris adalah satu angka untuk semua kunci lainnya secara bersamaan. Dalam kumpulan dua kunci, itu adalah figur kunci lainnya. Angka yang tidak dilaporkan oleh tampilan dibaca sebagai tidak tersedia, bukan nol. Untuk kunci `soft` atau `burst` pada kartu tertulis bahwa tidak ada angka yang berlaku.

Kumpulan dalam mode `saturation` yang kuncinya menyimpan persentase di atas 0 hanya menunjukkan penarikan. Dikatakan bahwa persentase yang disimpan tidak berpengaruh di sana. Tombol Penarikannya mengirimkan 0 tanpa batas waktu. Kumpulan dalam mode `saturation` dengan 0 yang disimpan tidak menunjukkan kartu pinjaman. Setelah disimpan, kartu yang tidak diperlukan lagi oleh tampilan yang dikembalikan akan tetap berada dalam pesannya hingga tampilan halaman berubah lagi.

Tidak ada yang disimpan sampai pemegangnya menekan Simpan atau Tarik. Setiap pengepresan mengirimkan satu permintaan `PATCH /api/v1/me/quota/{provider}`, dan pengepresan kedua tidak mengirimkan apa pun sementara pengepresan pertama tertunda. Badan membawa `ref` buram kolam dari tampilan, persentase, dan tenggat waktu. Jawabannya adalah tampilan kuota yang dibangun kembali, dan halaman tersebut menampilkannya tanpa perlu dibaca lagi. Ketika dua penyimpanan tumpang tindih, halaman membaca kuota satu kali setelah jawaban terakhir. Halaman tersebut tidak menyimpan persetujuan di penyimpanan browser.

Perubahan yang ditolak dijelaskan pada kartu dengan teks yang dipilih dari status HTTP. Badan kesalahan tidak terbaca. A 401 mengatakan kuncinya tidak diterima dan memuat ulang kuota. A 403 mengatakan kumpulan tersebut tidak menerima perubahan pinjaman, dan 404 mengatakan kumpulan tersebut hilang. Keduanya menawarkan tombol isi ulang kuota. Jawaban 400 atau 4xx lainnya meminta pemegangnya untuk memeriksa persentase dan tenggat waktu. A 429 meminta pemegangnya untuk menunggu, dengan detik `Retry-After` saat jawabannya diberikan. Jawaban 5xx, 408, atau kegagalan jaringan menyatakan bahwa perubahan mungkin tidak disimpan, dan tetap mempertahankan nilai yang diketik. Jawaban di luar kontrak akan memuat ulang kuota. Penyimpanan yang gagal tidak menghapus kunci dengan sendirinya. Ketika pemuatan ulang setelah ditolak, halaman tersebut menghapus kunci seperti pada penolakan pembacaan.

Setelah kunci diterima, halaman tersebut juga menampilkan kartu "Siapkan alat Anda" dengan tiga tab. "Claude Code" memberikan blok `env` untuk `~/.claude/settings.json`. "Shell" memberikan variabel yang sama dengan baris `export`. "Claude Desktop" memberikan nilai untuk jendela inferensi pihak ketiga. Modelnya adalah model pembagian kuota yang mungkin dipanggil oleh kunci untuk penyedia tersebut. Jika tidak ada daftar seperti itu yang disertai kuncinya, blok tersebut akan mengaktifkan penemuan model gateway. Alamat gateway adalah API publik asal server melaporkan (`OMNIROUTE_PUBLIC_API_BASE_URL`, lalu `OMNIROUTE_PUBLIC_BASE_URL`). Jika tidak ada yang disetel, kartu akan menampilkan placeholder dan memberitahukan pemegangnya untuk bertanya kepada administrator. Kuncinya ditampilkan sebagai pengganti. "Sertakan kunci saya" menempatkan seluruh kunci dalam teks di layar dan di mana tombol salin menyalin. Hal ini berlangsung sampai kotaknya dibersihkan, kuncinya dilupakan atau diganti, atau halamannya tertinggal. Kartu tidak mengirimkan permintaan dan tidak menawarkan pengunduhan file.

Pembacaan tanda API `stale` ditampilkan mungkin sudah ketinggalan zaman. Pembacaan yang diberi tanda `unavailable` ditampilkan dengan alasannya, tidak pernah sebagai nol.

Pada rencana persentase, halaman tersebut mengambil bagian kuncinya sendiri ketika API melaporkannya. Dikatakan bahwa angka tersebut adalah perkiraan dan menyebutkan dua bagiannya. Batas per model hanya menampilkan akun.

Ketika sebuah jendela membawa `members`, kartunya juga menunjukkan sebuah bar dengan satu segmen per anggota, dalam urutan slot. Segmen kunci permintaan menggunakan warna aksen. Segmen lainnya menelusuri warna bagan tema. Legenda teks mencantumkan setiap segmen beserta nilainya, jadi tidak ada yang bergantung pada warna. Segmen diberi label `You` atau `Member N`, dengan N adalah slotnya.

### Port khusus untuk halaman tersebut

`QUOTA_PANEL_PORT` membuka pendengar kedua yang hanya melayani halaman layanan mandiri. Ini tidak aktif kecuali variabelnya disetel. `QUOTA_PANEL_HOST` adalah alamat pengikatan dan defaultnya adalah `127.0.0.1`.

Listener meneruskan jalur ini ke port utama dan menjawab 404 untuk setiap jalur lainnya:

| Jalur                                                                    | Melayani                                     |
| ------------------------------------------------------------------------ | -------------------------------------------- |
| `/quota/{provider}`                                                      | Halaman                                      |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Tampilan kuota yang dibaca halaman tersebut  |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Seri penggunaan yang dibaca halaman tersebut |
| `/_next/static/`                                                         | Skrip, gaya, dan font build                  |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ikon                                         |

`GET` dan `HEAD` diteruskan tanpa badan. Satu permintaan dengan isi juga diteruskan: `PATCH` dari jalur tampilan kuota, yang dikirimkan halaman untuk menyimpan pilihan peminjaman. Metode lain apa pun menjawab 404, kecuali permintaan CONNECT, yang koneksinya ditutup tanpa jawaban. Permintaan lain apa pun yang menyatakan badan menjawab 404 dan koneksinya ditutup. Permintaan peningkatan ditolak dan koneksinya ditutup. Jalur dengan segmen titik atau penanda fragmen ditolak, seperti pada port API. Begitu juga dengan target permintaan dengan karakter di luar ASCII yang dapat dicetak. Karakter kontrol mentah di target dijawab 400 oleh parser HTTP, sebelum port ini diperiksa sendiri. Header permintaan yang dicadangkan oleh kerangka kerja untuk penggunaannya sendiri tidak diteruskan: nama yang dimulai dengan `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` atau `x-next-`, dan nama `x-matched-path` dan `next-resume`. Permintaan diteruskan tanpa mereka. Dasbor, halaman login, API manajemen, dan rute inferensi tidak dapat dijangkau melalui port ini.

`PATCH` harus membawa `Content-Type: application/json`, tanpa parameter atau hanya dengan `charset=utf-8`. Itu harus membawa satu `Content-Length` dari 1 hingga 4096, ditulis sebagai angka biasa, dan tidak ada `Transfer-Encoding`. `PATCH` yang melanggar salah satu aturan ini menjawab 404. Beberapa panjang yang salah format, seperti yang ditandatangani atau diulang, dijawab 400 oleh parser HTTP sebelum pemeriksaan port ini sendiri. Port membaca byte yang dideklarasikan sebelum menghubungi port utama, dan menunggu paling lama 5 detik. Badan yang belum lengkap kemudian menjawab 404 dan sambungannya ditutup. Tidak ada yang mencapai port utama dalam kasus tersebut, atau saat klien keluar terlebih dahulu. Port menyampaikan byte yang dideklarasikan dengan tepat, dengan `Content-Length` yang sama. Byte setelahnya dibaca sebagai permintaan koneksi berikutnya. Proksi terbalik TLS di depan harus meneruskan `Content-Length` dan tidak boleh memotong ulang isi permintaan. Port utama memeriksa kunci API di header `Authorization`, seperti untuk `GET`.

Tubuh 404 adalah `{"error":"not_found","message":"Not found."}`. Relai yang gagal menjawab 502 (`api_bridge_unavailable`) atau 504 (`api_bridge_timeout`) tanpa bidang `detail`.

Pendengar tidak membaca `QUOTA_SELF_PANEL`, dan tidak membuka halamannya. Saat bendera dimatikan, halaman dan API -nya menjawab 404 di port utama, dan pendengar menyampaikan jawaban tersebut.

Di bawah server pengembangan (`next dev`), halaman tidak menjadi interaktif melalui port ini. Soket hot-reload pengembangan adalah permintaan peningkatan, dan port menolaknya. Gunakan port utama saat mengembangkan.

Port menyajikan HTTP biasa dan halaman mengirimkan kunci API. Pertahankan alamat pengikatan default dan letakkan proxy terbalik dengan TLS di depannya. Alamat pengikatan selain loopback mencatat pemberitahuan ini:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Rekan loopback yang tidak mengirimkan header penerusan dihitung sebagai lokal pada port utama. Jadi proxy di host yang sama harus mengirimkan `X-Forwarded-For`. Proksi pada alamat pribadi dipercaya untuk header tersebut hanya dengan `OMNIROUTE_TRUST_PROXY=private` (atau `lan`). Rekan lainnya dilaporkan berdasarkan alamat koneksinya, dan header penerusan yang dikirimkannya akan dihapus.

Pendengar memegang paling banyak 256 koneksi sekaligus. Klien memiliki waktu 10 detik untuk mengirim header permintaan dan 30 detik untuk mengirim seluruh permintaan. Sambungan yang tidak aktif dan tetap aktif ditutup setelah sekitar 5 detik. Koneksi tanpa aktivitas selama 60 detik ditutup. Nilai-nilai ini bersifat tetap. Tetapkan juga batas koneksi dan kecepatan pada proxy terbalik di depan. Proksi terbalik di depan harus mempertahankan koneksi upstream yang menganggur selama kurang dari 5 detik, atau tidak menggunakannya kembali. Relai ke port utama menggunakan batas waktu upstream dari port API (`API_BRIDGE_*`).

Pendengar juga memulai ketika `API_PORT` tidak disetel. `QUOTA_PANEL_PORT` harus berupa port dari 1 hingga 65535, ditulis dalam angka saja. Harus berbeda dengan port dashboard dan port API. Selama server live WebSocket aktif, server tersebut juga harus berbeda dari `LIVE_WS_PORT` (default 20132). Nilai lainnya tidak membuka apa pun dan mencatat peringatan. Peringatan tentang nilai yang ditolak akan memberi nama variabel dan tidak mengulangi nilainya. Port yang sudah digunakan tidak membuka apa pun dan mencatat peringatan ini:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Dengan set `OMNIROUTE_BASE_PATH`, pendengar mengharapkan setiap jalur di atas di bawah awalan itu. Gunakan `OMNIROUTE_BASE_PATH` yang sama pada waktu pembuatan dan waktu proses. Tulis dengan garis miring di depan dan tanpa garis miring di akhir, misalnya `/omniroute`. Bentuk lain, termasuk `/` dan `/omniroute/`, membiarkan port dimatikan dengan peringatan, meskipun build menerima bentuk tersebut. Begitu juga dengan jalur dasar yang segmen pertamanya menamai rute aplikasi: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` atau `connect`, dalam hal apa pun.

Keterbatasan:

- `/quota/{provider}/` dengan garis miring menjawab 404 pada port ini.
- Pekerja layanan dan manifes aplikasi web tidak disajikan pada port ini.
- Kumpulan favicon khusus di dasbor tidak ditampilkan di port ini.
- Ikon tidak ditampilkan ketika aplikasi berjalan di bawah jalur dasar.
- Pelabuhan berbicara dengan jelas HTTP/1.1.
- Pengikatan yang gagal tidak akan dicoba lagi hingga proses dimulai ulang.
- Pendengar tidak memiliki batas koneksi atau kecepatan per alamat klien.
- Penyiapan kontainer tidak tercakup dalam bagian ini.

---

## Variabel Lingkungan

| Variabel                             | Bawaan            | Keterangan                                                                            |
| ------------------------------------ | ----------------- | ------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`          | Driver yang digunakan: `sqlite` atau `redis`                                          |
| `QUOTA_STORE_REDIS_URL`              | _(kosong)_        | Redis URL, misalnya `redis://localhost:6379`                                          |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`             | 0..1; `>= threshold` mengaktifkan mode ketat                                          |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`            | Token yang menjelaskan paling banyak satu poin dari jendela paket persen              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`             | 0..1; pengganda untuk skor kombo kebijakan lunak                                      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`              | Beberapa hari sebelum GC menghapus ember `quota_consumption` lama                     |
| `QUOTA_PANEL_PORT`                   | _(tidak disetel)_ | Port khusus untuk halaman layanan mandiri. Tidak disetel berarti tidak ada pendengar. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`       | Ikat alamat untuk port itu                                                            |

pengaturan DB (`quotaStore.*`) menimpa env vars.

---

## Pemecahan Masalah

### Redis dikonfigurasi tetapi tidak terhubung

Pastikan `ioredis` telah terinstal (`npm ls ioredis`) dan `QUOTA_STORE_REDIS_URL`
dapat dijangkau. Jika koneksi gagal, factory akan beralih kembali ke SQLite (dicatat
pada level `warn`).

### `peek` mengembalikan data usang / fail-open

Jika `peek` melempar error, `enforceQuotaShare` memperlakukan hasilnya sebagai "izinkan" (fail-open).
Periksa log `pino` untuk entri `quota:enforce` dan `quota:factory` guna mengidentifikasi
akar penyebabnya.

### Penyimpangan penghitung konsumsi

Jika penggunaan aktual dari penyedia berbeda dari penghitung, hal tersebut wajar — jendela
geser 2 bucket memiliki galat ~1% pada batas jendela, dan `consume` dijalankan secara
fire-and-forget setelah respons. Sinyal saturasi (`saturationSignals.ts`)
membaca pemanfaatan penyedia yang sebenarnya dengan TTL 30 detik dan menyesuaikan `globalUsedPercent`
sebagaimana mestinya.

### Pool menampilkan "tidak ada data" untuk laju pemakaian

`computeBurnRate` memerlukan setidaknya 2 sampel historis. Pool baru tanpa pemanggilan
`consume` sebelumnya akan menampilkan `tokensPerSecond: 0` dan `timeToExhaustionMs: null`.

---

## Migrasi dari localStorage

Saat `/dashboard/costs/quota-share` pertama kali dimuat, hook `useLocalStoragePoolMigration`
memeriksa:

1. `localStorage.getItem("omniroute:quota-share:pools")` tidak kosong.
2. `GET /api/quota/pools` mengembalikan `[]` (DB kosong).

Jika keduanya benar, hook tersebut mengirim setiap pool lama secara batch ke `POST /api/quota/pools`,
lalu menghapus key localStorage. Migrasi ini idempoten: kondisi 2 mencegah
migrasi ulang.

---

## Klasifikasi Strategi Internal

`quota-share` adalah strategi perutean **khusus internal** (`INTERNAL_ROUTING_STRATEGY_VALUES` di
`src/shared/constants/routingStrategies.ts`). Strategi ini digunakan secara eksklusif oleh
kombinasi pool `qtSd/` yang dibuat oleh sistem dan sengaja dikecualikan dari `ROUTING_STRATEGY_VALUES` agar tidak pernah
muncul sebagai opsi yang dapat dipilih pengguna di UI atau API.

---

## Cakupan Tes

Dua lapisan cakupan otomatis dikirimkan bersama mesin pembagian kuota:

| Rangkaian         | Memerintah                                                             | Apa yang dicakupnya                                                                                                                                                                                              |
| :---------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Satuan (29 tes)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | penjadwal DRR, gerbang saturasi, batas konkurensi, matematika fairShare, antrian backlog                                                                                                                         |
| Matriks integrasi | `npm run test:combo:matrix`                                            | Keputusan perutean ujung ke ujung melalui pipa kombo yang sebenarnya; DRR keadilan deprioritas saturasi + melalui jahitan langsung (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matriks integrasi berjalan di CI bersama dengan 22 strategi publik. Unit suite dapat dijalankan secara mandiri.

---

## Ringkasan Skema DB

Tiga tabel ditambahkan oleh migrasi `078`, `079` dan `085`:

- `quota_pools` + `quota_allocations` — definisi kumpulan dan alokasi per kunci.
- `quota_consumption` — menggulirkan penghitung 2 ember per `(apiKeyId, dimensionKey)`.
- `provider_plans` — penggantian paket penyedia manual (dimensi JSON per connectionId).

Semua tabel ditambahkan melalui migrasi `CREATE TABLE IF NOT EXISTS` idempoten.

Pinjaman yang disetujui menambahkan tiga kolom: `quota_allocations.lending_percent` (integer, default 0), `quota_allocations.lending_until` (epoch milidetik, atau `NULL` tanpa batas waktu) dan `quota_pools.borrow_mode` (default `saturation`). Migrasinya hanya menambahkan kolom-kolom ini dan tidak menulis baris yang ada.

Buku atribusi persen menambahkan `quota_percent_ledger` (satu baris per kumpulan, jendela akun dan paket) dan `quota_percent_ledger_tokens` (satu penghitung token per kumpulan, akun, dan kunci API ). `src/lib/db/quotaPercentLedger.ts` membaca dan menulisnya.
