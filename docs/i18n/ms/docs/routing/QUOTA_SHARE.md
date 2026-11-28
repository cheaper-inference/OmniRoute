# Quota Sharing Engine (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Rujukan dokumen**: `docs/routing/QUOTA_SHARE.md`
> Sebahagian daripada Kumpulan B (pelan 16 + 22).

---

## Gambaran keseluruhan

Enjin Perkongsian Kuota mengagihkan kuota berasaskan masa penyedia (contohnya, tetingkap
5 jam Codex, 1500 permintaan/j Kimi) secara adil merentasi berbilang kunci API yang berkongsi
sambungan yang sama.

**Masalah yang diselesaikannya:** OmniRoute memproksikan banyak kunci API kepada akaun
penyedia huluan yang sama. Tanpa logik perkongsian, lonjakan daripada kunci A boleh menghabiskan
kuota penyedia untuk jam tersebut, menyebabkan kunci B dan C disekat sehingga tetingkap ditetapkan semula.
Enjin ini mencegah perkara tersebut dengan:

1. Menjejaki penggunaan bergulir setiap kunci bagi setiap dimensi (%, permintaan, token, $).
2. Menggunakan algoritma perkongsian adil yang mengekalkan penggunaan sumber: sesuatu kunci boleh meminjam daripada bahagian
   yang tidak digunakan selagi kumpulan global belum tepu.
3. Menguatkuasakan hasilnya dalam laluan kritikal (`chatCore.ts`) sebelum permintaan
   sampai kepada pelaksana huluan.

---

## Algoritma: Perkongsian Adil-Pemuliharaan Kerja

Dilaksanakan dalam `src/lib/quota/fairShare.ts`.

### Mod

| keadaan                                    | Mod         | Tingkah laku                                                   |
| ------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **pemurah** | Key boleh meminjam sehingga had global tolak jumlah penggunaan |
| `globalUsedPercent >= saturationThreshold` | **Tegas**   | Menguatkuasakan bahagian adil individu dengan tegas            |

`saturationThreshold = 0.5` lalai (env `QUOTA_SATURATION_THRESHOLD`).

Kedua-dua mod ini menerangkan kumpulan dalam mod pinjaman lalai, `saturation`. Kumpulan dalam mod `consent` sentiasa menggunakan peraturan yang ketat, tidak kira ketepuan. Lihat [Pinjaman yang dipersetujui (ikut serta setiap kumpulan)](#consented-lending-per-pool-opt-in).

### Keputusan per-dimensi

Untuk setiap dimensi aktif dalam kumpulan, enjin mengira:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Untuk dimensi `percent`, `consumed` datang daripada buku atribusi sebaliknya (lihat [Dimensi peratusan: atribusi setiap kunci](#percent-dimensions-per-key-attribution) ).

Kemudian:

- **`policy = hard`** : jika `consumed > fairShareAllowed` dan mod adalah → yang ketat** blok** .
- **`policy = soft`** : jika `consumed > fairShareAllowed` dan mod adalah → yang ketat** menghukum** (kurangkan keutamaan dalam kombo; jangan sekali-kali hard-block).
- **`policy = burst`** : benarkan sementara ruang kepala global wujud tanpa mengira bahagian saksama.

### Cap absoluto

`capValue` + `capUnit` pada peruntukan adalah siling keras yang bebas daripada mod atau dasar. Mana-mana dimensi di mana `consumed >= capValue` sentiasa** blok** permintaan itu. Untuk topi `percent`, `consumed` hanyalah bahagian yang dikaitkan dengan kunci.

### Semakan pelbagai dimensi

Permintaan disekat jika** mana-mana** dimensi dalam kolam akan menghalangnya. Dimensi adalah — bebas a keletihan 5j% tidak menjejaskan dimensi% mingguan.

### Meminjam

Dalam mod murah hati, kunci yang peruntukannya kurang digunakan boleh menggunakan lebihan daripada saham kunci lain yang tidak diperuntukkan. Formulanya ialah:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

mana `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (pool `limit` untuk dimensi itu) sentiasa siling keras.

### Pinjaman yang dipersetujui (ikut serta setiap kumpulan)

Setiap kolam mempunyai mod pinjaman. `saturation` ialah lalai dan mengekalkan peraturan di atas. Dalam mod `consent` kunci `hard` melepasi bahagiannya hanya dalam kapasiti yang dipersetujui oleh kunci lain untuk dipinjamkan. Pentadbir menetapkan mod setiap kumpulan. Setiap pemegang kunci menetapkan persetujuan mereka sendiri melalui [persetujuan Pinjaman](#lending-consent).

Persetujuan ialah peratusan daripada 0 hingga 100 dan tarikh akhir pilihan dalam milisaat zaman. Kunci meminjamkan peratusan bahagian terbiarnya sementara tarikh akhir adalah pada masa hadapan.

Untuk satu dimensi, `L` ialah had berkesan: had pelan menggandakan akaun dalam kumpulan. Gerbang mengira, untuk kunci yang meminta:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` ialah berat kunci, atau `100 / n` untuk setiap kunci apabila tiada berat melebihi 0. `lend_k` ialah peratusan aktif kunci dan 0 apabila tarikh akhir kunci tersebut telah berlalu. Keizinan kunci permintaan sendiri tidak pernah dikira. Kunci `hard` ditolak apabila penggunaannya mencapai bahagiannya ditambah `borrowAvailable`.

Kapasiti yang tiada tuntutan peruntukan (100 tolak jumlah wajaran) tidak boleh dipinjamkan. Tiada kunci bersetuju untuk meminjamkannya.

**Contoh.** `L` ialah 1000.

| kunci | Berat badan | Kongsi | Dimakan | Meminjamkan |
| ----- | ----------- | ------ | ------- | ----------- |
| A     | 50          | 500    | 530     | 0%          |
| B     | 30          | 300    | 100     | 50%         |
| C     | 0           | 0      | 60      | 0%          |

- B meminjamkan 50% daripada 200 terbiarnya, iaitu 100. C sudah mengambil 60 melebihi bahagiannya. A boleh meminjam 40.
- A dihidangkan pada 530 dan ditolak apabila penggunaannya mencapai 540.
- Sebelum C menggunakan apa-apa, dengan A pada atau di bawah bahagiannya, C boleh meminjam 100.
- Sebelum C menggunakan apa-apa, dengan A pada 530, C boleh meminjam 70.

**Berat sifar.** Kunci dengan berat 0 mempunyai bahagian 0. Ia dihidangkan hanya semasa penggunaannya lebih rendah daripada yang dipinjamkan oleh orang lain. Apabila tiada siapa yang memberi pinjaman, ia ditolak dari permintaan pertamanya.

**Tarikh akhir.** Tiada tugas latar belakang tamat tempoh persetujuan. Setiap permintaan membandingkan tarikh akhir dengan masanya sendiri, dan tarikh akhir yang sama dengan masa itu telah berlalu. Tarikh akhir tersimpan yang bukan nombor terhingga, atau melepasi tarikh terbesar yang boleh dipegang oleh `Date`, dikira sebagai lulus.

**`soft` dan `burst`.** Pinjaman tidak menghadkan mereka. Kunci `soft` dikurangkan keutamaannya sebaik sahaja melepasi bahagiannya. Kunci `burst` berlalu manakala kolam mempunyai ruang. Siling kolam masih menolak setiap kunci apabila jumlah kolam mencapai hadnya.

**Kos pada laluan permintaan.** Kolam `saturation` tidak lebih daripada sebelumnya. Dalam kolam `consent`, dimensi boleh dikira membaca kekunci lain hanya untuk kunci `hard` pada atau di atas bahagiannya manakala kunci lain dipinjamkan. Ia kemudian menjadikan satu bacaan setiap kunci lain, selari. Bacaan yang gagal dikira sebagai penggunaan 0 untuk kunci itu. Dimensi `percent` tidak menambah bacaan, kerana buku atribusi memegang setiap kunci.

**Mengedit kolam.** Suntingan mengekalkan persetujuan kunci yang kekal. Ini berlaku untuk pengeditan peruntukan, penggantian seluruh kumpulan dan panggilan `ensure`. Kunci yang dialih keluar kehilangan persetujuannya dan kunci yang ditambahkan kembali bermula pada 0. Laluan pentadbir mengembalikan setiap persetujuan kunci dan tidak pernah menulisnya. Menukar kolam kembali kepada `saturation` mengekalkan setiap persetujuan yang disimpan, yang tidak mempunyai kesan dalam mod itu. Menukar kumpulan kepada `consent` sekali lagi mengaktifkan semula persetujuan yang disimpan yang tarikh akhirnya belum berlalu. Pemegang kunci boleh mengosongkan persetujuan yang disimpan dalam mana-mana mod.

**Menaik taraf.** Jika lajur `lending_percent` dan `lending_until` sudah wujud, penghijrahan hanya menambah `borrow_mode`, dan peratusan yang disimpan kekal seperti sedia ada. Setiap kumpulan bermula dalam mod `saturation`. Hidupkan `consent` setiap kolam dalam wizard kolam. Tiada apa-apa yang disimpulkan daripada nilai yang disimpan.

**Had.**

- Pemberi pinjaman boleh mencari kolam di silingnya sebelum ia menggunakan bahagiannya sendiri. Kapasiti yang dipinjam orang lain dikira dalam jumlah keseluruhan kolam.
- Cek dijalankan sebelum permintaan dan tidak menyimpan apa-apa. Permintaan serentak membaca penggunaan sebelum apa-apa direkodkan, jadi kapasiti pinjaman boleh dibelanjakan lebih daripada sekali, dibatasi oleh permintaan dalam penerbangan. Semakan saham mod `saturation` mempunyai sifat yang sama.

---

## Pembilang Tetingkap Gelongsor

Dilaksanakan dalam `src/lib/quota/sqliteQuotaStore.ts` dan `redisQuotaStore.ts`.

Dua baldi bagi setiap `(apiKeyId, dimensionKey)`:

- `curr`: baldi semasa (`floor(nowMs / windowMs)`)
- `prev`: baldi sebelumnya (`curr - 1`)

Nilai bergulir berkesan:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Ketepatan**: ~99% tepat. Ralat adalah paling banyak 1% daripada saiz tetingkap pada
sempadan antara baldi (sememangnya wujud dalam penghampiran 2 baldi).

### Keserentakan

Pemacu SQLite: mutex dalam memori bagi setiap kunci `(apiKeyId | dimensionKey)` menghalang
keadaan perlumbaan baca-ubah-tulis. Corak ini menyerupai mekanisme anti-thundering-herd dalam `src/sse/services/auth.ts`.

Pemacu Redis: skrip Lua EVAL untuk penambahan atomik — dijalankan sebagai satu perintah Redis.

---

## Pemacu

### SQLite (lalai, pemasangan sifar)

- Jadual: `quota_consumption` (lihat migrasi `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Paling sesuai untuk penggunaan tika tunggal.
- Semua pengekalan data berada dalam DB SQLite OmniRoute sedia ada (`DATA_DIR/storage.sqlite`).

### Redis (pilihan, berbilang tika)

- Memerlukan pakej npm `ioredis`.
- Pembilang disimpan dalam Redis; metadata (kumpulan/peruntukan) masih disimpan dalam SQLite.
- Paling sesuai untuk penggunaan berbilang replika yang memerlukan pembilang dikongsi.

### Menukar pemacu

Melalui UI tetapan (`/dashboard/settings` → Storan Kuota), atau melalui pemboleh ubah persekitaran:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Tetapan DB mempunyai keutamaan berbanding persekitaran. Jika `driver=redis` tetapi URL tiada atau
`ioredis` tidak dipasang, kilang akan kembali menggunakan SQLite dan merekodkan amaran.

Urutan pemilihan pemacu:

1. Tetapan DB `quotaStore.driver`
2. Persekitaran `QUOTA_STORE_DRIVER`
3. Lalai: `sqlite`

---

## Pelbagai Dimensi

Kolam boleh mempunyai pelbagai dimensi. Setiap dimensi adalah bebas:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Contoh: pelan Codex** (5j% + mingguan%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Permintaan mesti memenuhi semua dimensi untuk dibenarkan.

### Dimensi peratusan: atribusi setiap kunci

Pelan peratus melaporkan satu angka penggunaan bagi setiap akaun dan tetingkap pelan. Pembekal tidak memberikan pembilang setiap kunci API.

Untuk membahagikan angka itu antara kunci, setiap kumpulan menyimpan buku atribusi bagi setiap akaun dan tetingkap pelan. `src/lib/quota/percentLedger.ts` memegang peraturan buku. `src/lib/quota/percentAttribution.ts` menukar buku kepada nombor yang digunakan oleh penguatkuasaan. Hasilnya ialah anggaran yang dibina daripada token setiap laluan utama.

#### Bacaan yang menggerakkan buku

Buku ini bergerak hanya pada angka penyedia sendiri untuk tetingkap pelan yang diminta. Sambungan ini melaporkan satu:

| Pembekal                        | Rancang tingkap |
| ------------------------------- | --------------- |
| Claude, melalui sambungan OAuth | `5h`, `weekly`  |
| Codex                           | `5h`, `weekly`  |

Ini tidak dikira sebagai bacaan:

- respons yang ditandakan oleh pelanggan pembekal sebagai basi
- tetingkap Claude yang peratusannya tidak dilaporkan oleh pembekal
- angka tingkap lain, atau kes terburuk di seluruh tingkap
- sandaran pengepala had kadar
- bacaan yang gagal

Penyedia lain, termasuk Claude dengan kunci API, tidak mempunyai buku. Setiap kunci dicaj 0 pada dimensi peratusnya, seperti sebelum perubahan ini.

Bacaan berkongsi cache 30 saat isyarat tepu. Bacaan Claude bertarikh apabila angka itu diperhatikan dalam pengepala respons atau dibaca dari titik akhir penggunaan, apabila masa itu diketahui. Bacaan lain bertarikh semasa entri cache itu dibina.

#### Apa yang disimpan oleh buku itu

Setiap permintaan yang direkodkan menambah tokennya, sekali, ke kaunter setiap kumpulan, akaun dan kunci. Kaunter hanya tumbuh. Buku ini menyimpan tiga perkara:

- garis dasar: angka semasa buku dibuka atau kali terakhir tingkap dipusing
- angka yang digunakan terakhir
- setiap kunci, kaunter tokennya pada masa yang sama, memanggil tandanya

Buku ini dikemas kini apabila penguatkuasaan atau laluan penggunaan mengira atribusi. Tulisan dibandingkan dan ditetapkan pada nombor semakan. Seorang penulis yang kalah mencuba sekali lagi pada bacaan baru.

#### Bagaimana bahagian kunci dikira

Setiap bahagian kunci dikira apabila buku dibaca. Pertumbuhan angka sejak garis dasar dibahagikan antara kekunci mengikut perkadaran dengan token yang setiap satu dihalakan sejak tandanya.

Together, token tersebut menerangkan paling banyak satu titik angka bagi setiap token `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (lalai 1,000). Pertumbuhan yang mereka tidak jelaskan adalah luaran. Garis asas adalah luaran juga.

Sebagai contoh, sebuah buku dibuka pada 0. Kunci A kemudian mengarahkan 900,000 token dan laluan kunci B 100,000. Pada angka 60, bahagian A ialah 54 mata dan bahagian B ialah 6.

Pembilang di bawah tanda kuncinya telah dimulakan semula dan dikira sepenuhnya. Kunci tanpa tanda, seperti kunci yang bercantum dengan kolam di tengah tetingkap, mengira semua tokennya. Angka yang ketinggalan token menyebabkan ralat hilang pada bacaan seterusnya. Ia tidak terkumpul.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` dibaca pada setiap atribusi. Nilai yang bukan nombor terhingga sekurang-kurangnya 1 akan kembali kepada 1,000.

#### Bagaimana pembacaan mengubah buku

Peraturan padanan pertama digunakan:

1. **Tiada buku lagi:** bacaan membuka buku. Angkanya ialah garis dasar dan setiap pembilang ditandakan.
2. **Bacaan lama:** bacaan bertarikh sebelum yang terakhir digunakan diabaikan. Begitu juga bacaan yang masa penetapan semulanya lebih 30 minit lebih awal daripada yang disimpan.
3. **Tetingkap pembekal baharu:** masa penetapan semula lebih daripada 30 minit lewat daripada masa yang disimpan memusingkan buku. Angka tersebut menjadi garis dasar dan setiap pembilang ditanda semula. Kunci tanpa kaunter tinggalkan buku.
4. **Tetingkap tamat:** masa tetapan semula yang disimpan yang tidak selepas masa data bacaan bermakna tetingkap itu telah tamat. Pembacaan mengubah buku, walau apa pun bentuknya.
5. **Angka yang lebih tinggi:** hanya angka terakhir yang bergerak. Garis dasar dan markah kekal.
6. **Angka yang sama:** angka, garis dasar dan markah kekal. Hanya masa set semula kekurangan buku ditulis.
7. **Angka bawah:** angka yang lebih rendah tidak pernah digunakan seperti itu. Ia memusing buku hanya apabila tiga perkara berlaku. Ia sekurang-kurangnya dua minit lebih baharu daripada bacaan yang digunakan terakhir. Tiada apa-apa yang mengatakan bahawa tingkap adalah sama terbuka. Ia lebih daripada satu mata lebih rendah.

Tetingkap dikira sebagai tetingkap yang sama terbuka apabila tiga perkara dipegang. Kedua-dua masa tetapan semula diketahui. Mereka berada dalam masa 30 minit antara satu sama lain. Yang disimpan masih mendahului bacaan. Angka yang lebih rendah di dalam tetingkap itu tidak mengubah apa-apa.

Masa tetapan semula disimpan hanya semasa ia mendahului masa data bacaan yang membawanya. Angka yang lebih tinggi menyimpan masa tetapan semula bacaannya apabila angka itu boleh digunakan, dan mengekalkan yang disimpan sebaliknya. Angka yang sama merekodkan masa tetapan semula bacaannya hanya apabila buku itu tiada. Ia tidak mengubah apa-apa lagi. Angka yang lebih rendah yang tidak mengubah rekod buku tiada masa penetapan semula.

#### Apabila buku itu digunakan

Selepas membaca, buku itu digunakan melainkan masa tetapan semula yang disimpan bukan selepas masa semasa. Kes itu timbul apabila bacaan yang diambil sejurus sebelum penetapan semula, seperti yang disampaikan daripada cache, diperhatikan sejurus selepas itu.

Tanpa bacaan yang boleh digunakan, buku yang disimpan hanya digunakan semasa ia masih boleh menjadi buku tetingkap semasa. Itu berlaku dalam dua kes:

- masa penetapan semulanya diketahui dan masih di hadapan
- ia tidak mempunyai masa tetapan semula, dan bacaan terakhir yang mengubahnya adalah paling lama 15 minit

Jika tidak, tiada apa yang dikaitkan, seperti ketika tiada buku. Buku yang masa tetapan semula disimpan telah berlalu tidak pernah dicaj.

#### Penguatkuasaan

Penggunaan kunci pada dimensi peratus ialah bahagian yang dikaitkan ditambah bahagian bahagian luaran. Bahagian luar mula-mula menggunakan kapasiti tanpa tuntutan peruntukan (100 tolak jumlah pemberat). Hanya lebihan dikongsi antara kunci mengikut berat.

Penggunaan itu dibandingkan dengan bahagian saksama kunci seperti mana-mana dimensi lain. Mod ketat masih bermula apabila isyarat tepu mencapai `QUOTA_SATURATION_THRESHOLD` (lalai 0.5). Setiap nombor diskalakan mengikut had berkesan: had setiap akaun digandakan bilangan akaun dalam kumpulan.

Had mutlak dengan `capUnit: "percent"` hanya mengira bahagian yang dikaitkan dengan kunci, diskalakan dengan cara yang sama. Ambil had setiap akaun sebanyak 100 dan k akaun. Had N kemudian dicapai apabila bahagian kunci pada angka akaun sajian mencapai mata N/k. Setiap akaun disemak dengan bukunya sendiri. Sebagai contoh, dengan dua akaun, had 10 dicapai pada 5 mata daripada satu angka akaun.

Apabila kedai tidak boleh dibaca, tiada apa-apa dikaitkan dan setiap kunci dicaj 0 pada dimensi tersebut. Apabila penulisan buku gagal, atribusi itu menggunakan buku seperti yang dibaca. Token yang gagal menulis meninggalkan token permintaan itu daripada buku. Tiada satu pun daripada kegagalan ini menghalang permintaan.

Dalam kumpulan `consent`, formula pemberian pinjaman menggunakan setiap penggunaan kunci pada dimensi peratus seperti yang diterangkan di atas. Apabila kunci lain dipinjamkan, buku itu dibaca sekali dan dikaitkan dengan setiap kunci. Tanpa buku yang boleh digunakan setiap kunci dicaj 0. Kunci dengan berat kemudian melepasi, dan kunci dengan berat 0 melepasi hanya apabila kunci lain meminjamkan.

#### Laluan penggunaan

`GET /api/quota/pools/{id}/usage` melaporkan nombor yang sama melalui fungsi yang sama. Dimensi peratus mempunyai satu kemasukan bagi setiap sambungan kolam dalam `accounts`. `consumedTotal` dan `perKey` peringkat atasnya mencerminkan entri pertama.

Laluan menggunakan bacaan semasa juga, jadi ia boleh memajukan buku seperti yang dilakukan oleh permintaan. `internal + external` boleh berbeza daripada `consumedTotal` apabila tiada bacaan yang boleh digunakan, atau apabila angka yang lebih rendah tidak digunakan.

#### Penyimpanan dan pengekalan

Kedua-dua kedai kuota menyimpan buku itu. Pada SQLite, pembersihan pangkalan data automatik, apabila didayakan, mengalih keluar baris yang tidak dikemas kini selama 60 hari. Pada Redis, buku dan kaunter sambungan kolam berkongsi satu kunci. Ia tamat tempoh 60 hari selepas token terakhir menulis atau menukar buku. Buku yang tidak berubah tidak ditulis semula, jadi potongan ditetapkan di atas tetingkap pelan terpanjang. Tetapan semula sejarah penggunaan manual juga mengosongkan buku pada SQLite (lihat Had).

#### Had

- Semua pertumbuhan angka akaun sejak garis dasar dibahagikan dengan token setiap kunci yang dihalakan sejak itu. Apabila pertumbuhan itu berlaku tidak mengapa.
- Jadi penggunaan yang dibuat di luar OmniRoute dicaj kepada kunci sehingga apa yang dibenarkan oleh token mereka. Itu termasuk penggunaan yang dibuat sebelum permintaan pertama kunci terhadap tetingkap, apabila buku itu sudah dibuka.
- Sebagai contoh, penggunaan luar meningkatkan akaun 60 mata manakala tiada laluan utama. Kunci kemudian mengarahkan 30,000 token dan angka itu mencapai 60.6.
- Jika buku itu dibuka sebelum penggunaan itu, bahagian kunci ialah 30 mata. Ia juga membawa 7.65 penggunaan luaran, dengan empat kunci berat 25.
- Jika buku dibuka selepas penggunaan itu, 60 mata adalah garis dasar. Bahagian kunci ialah 0.6 mata, dan ia membawa 15 penggunaan luaran.
- Permintaan atau lawatan ke laluan penggunaan membuka buku. Jadi sama ada penggunaan sedemikian dikira sebagai garis dasar bergantung pada masa buku dibuka.
- Dengan tingkat lalai, kunci yang mengarahkan 60,000 token semasa penggunaan di luar meningkatkan akaun 60 mata mendapat kesemua 60 sebagai bahagiannya sendiri.
- Dengan lantai pada 50,000, bahagiannya sendiri ialah 1.2 mata. 58.8 yang lain adalah luaran dan dicas mengikut berat, seperti mana-mana penggunaan luaran.
- Tetapkan `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` hampir dengan kos satu mata pada pelan anda. Penggunaan luar termasuk trafik pada akaun yang sama daripada kunci di luar kolam.
- Had peratus dikenakan dalam setiap mod. Kunci berhad boleh ditolak semasa akaun berada jauh di bawah ambang tepu.
- Ambil had 10 dan 12 mata penggunaan luar lebih awal di tingkap. Kunci yang mengarahkan 20,000 token kemudiannya ditolak pada angka akaun 12.4%.
- Pembahagian ialah anggaran mengikut volum token. Permintaan dikira sebagai token segera ditambah dengan token penyiapannya. Diskaun cache dan harga model tidak mengubah kiraan itu.
- Permintaan yang tidak berakhir dengan status 200 merekodkan tiada token. Contohnya ialah aliran yang diputuskan oleh pelanggan dan ralat huluan selepas penggunaan telah digunakan.
- Penggunaan permintaan sedemikian dicaj kepada kunci yang merekodkan token, sehingga apa yang dibenarkan oleh token mereka. Selebihnya adalah luaran. Ia tidak bergerak ke belakang. Respons yang melaporkan tiada penggunaan token juga tidak merekodkan token.
- Penggunaan permintaan yang sedang dijalankan boleh muncul di bahagian kunci aktif lain untuk keseluruhan permintaan. Ia bergerak kembali hanya apabila permintaan berakhir dengan status 200.
- Penggunaan yang sudah ada pada akaun apabila buku dibuka dikira sebagai luaran. Ini meliputi peningkatan, kumpulan baharu dan akaun baharu. Penggunaan dalam tetingkap baharu sebelum bacaan pertamanya dikira sebagai luaran juga.
- Setiap kunci bermula dengan bahagian berat penggunaan itu, selepas kapasiti tiada tuntutan peruntukan. Dengan satu akaun pada 85% dan lima kunci dengan berat 20, setiap satu bermula dengan 17 daripada 20 yang digunakan.
- Dalam kumpulan dengan beberapa akaun, angka akaun siaran digunakan pada belanjawan yang dijumlahkan. Ini tidak diubah oleh buku itu.
- Angka yang lebih rendah di dalam tetingkap yang dilaporkan penyedia sebagai terbuka tidak digunakan. Masa tetapan semula yang bergerak ke belakang lebih daripada 30 minit dianggap sebagai bacaan lama.
- Dalam kedua-dua kes, buku mengekalkan keadaannya sehingga masa tetapan semula yang disimpan berlalu. Selepas itu, buku itu tidak dicaj sehingga pembacaan mengubahnya.
- Ubatnya ialah tetapan semula sejarah penggunaan manual (`POST /api/settings/purge-usage-history`). Ia mengosongkan buku atribusi dan kaunter token mereka dalam pangkalan data SQLite.
- Tempoh `all` membersihkan setiap buku dan kaunter. Tempoh yang lebih singkat mula-mula membersihkan buku yang tidak ditulis di dalamnya. Ia kemudian mengosongkan kaunter yang tidak tertulis di dalamnya, tetapi hanya untuk sambungan kolam yang tidak mempunyai buku lagi. Buku yang disimpan masih menandakan setiap kunci pada kaunternya.
- Buku yang angkanya tidak bergerak tidak ditulis semula, jadi tempoh yang lebih singkat juga boleh mengosongkan buku tetingkap semasa. Bacaan seterusnya membuka buku baru pada angka semasa.
- Tetapan semula tidak menyentuh kedai kuota Redis. Terdapat buku berakhir dengan tetingkapnya, atau tamat tempoh 60 hari selepas penulisan terakhirnya.
- Apabila pembekal tidak menghantar masa tetapan semula, tetingkap yang menetapkan semula dan mengisi semula di atas angka lama antara dua bacaan kelihatan seperti angka yang lebih tinggi. Buku ini mengekalkan garis dasar dan markah lama.
- Pembacaan bertarikh mengikut jam tempatan. Apabila ia berjalan lebih awal daripada pembekal, atau sumber melaporkan masa penetapan semula sedikit lebih awal, buku itu boleh mencapai perbezaan itu lebih awal.
- Pertumbuhan dalam jangka pendek itu dipecah oleh token yang disalurkan di dalamnya. Bacaan pertama tetingkap seterusnya membetulkannya. Apabila buku yang dihidupkan tidak mempunyai masa tetapan semula, pembetulan itu memerlukan angka yang lebih rendah sekurang-kurangnya dua minit lebih baharu daripada bacaan yang digunakan terakhir.
- Kejadian yang berkongsi bacaan tarikh kedai Redis dengan jam mereka sendiri, jadi pastikan jam itu segerak. Pembacaan contoh yang jam di belakangnya kelihatan lebih lama dan diabaikan.
- Apabila tiada bacaan yang boleh digunakan tiba selepas masa tetapan semula yang disimpan, bahagian peratusan setiap kunci dan had peratus tidak dikuatkuasakan sehingga bacaan kembali. Tanpa masa tetapan semula, ini bermula 15 minit selepas bacaan terakhir yang menukar buku.
- Di kedai Redis, buku terbiar selama 60 hari boleh tamat tempoh antara cek penulis dan penulisannya. Ia kemudian dibuat semula pada semakan di atas 1, yang merupakan keadaan yang sah.

---

## Penyelesai Pelan

Dilaksanakan dalam `src/lib/quota/planResolver.ts`.

Keutamaan (tertinggi hingga terendah):

1. **Penggantian manual DB** — jadual `provider_plans`, bagi setiap `connectionId`.
2. **Katalog yang diketahui** — `src/lib/quota/planRegistry.ts` (data sahaja).
3. **Pelan kosong** — tiada dimensi, konfigurasi manual diperlukan.

### Katalog yang diketahui

| Penyedia              | Dimensi                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tidak diketahui), `tokens/weekly`       |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Tiada lalai — konfigurasi manual diperlukan                   |

---

## Integrasi Saluran Paip

### cangkuk PRE (`open-sse/handlers/chatCore.ts`)

Dijalankan sebelum pelaksana huluan, selepas semakan pengesahan dan dasar:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Gagal-terbuka** : jika `enforceQuotaShare` melontar, permintaan dibenarkan melalui log `pino.warn`. Ini menghalang pepijat enjin kuota daripada menyekat semua trafik.

**Apabila kapasiti kembali.** Penolakan di bahagian kunci atau di siling kolam berakhir dengan satu daripada dua ayat, dalam kedua-dua mod pinjaman:

- tetingkap `percent` : `. The <window> window resets at <time>.` Masa ialah penetapan semula yang dilaporkan oleh pembekal.
- Unit boleh dikira: `. Enough <window> usage is expected to clear by <time>.` Masa ialah sempadan atas dari tetingkap gelongsor, jika kunci tidak menghantar apa-apa lagi.

`<time>` ialah ISO 8601 segera dalam UTC. Penolakan itu kemudiannya membawa `Retry-After`: seluruh saat sehingga saat itu, ditambah satu. Pelanggan yang menunggu selama itu mencuba semula paling lama satu saat selepas seketika. Apabila segera tidak diketahui, penolakan tidak membawa sama ada ayat mahupun tajuk. Penolakan had mutlak tidak membawa kedua-duanya. Kod awam kekal `quota_share_blocked`.

Penolakan perkongsian tidak menyentuh sambungan yang dikongsi. Ia tidak menetapkan tempoh bertenang, tiada kunci model dan tiada kegagalan pemutus pembekal, dan kunci kolam yang lain terus disampaikan. Apabila setiap sasaran kombo menolak kunci untuk bahagiannya, kombo menjawab 429 tanpa menunggu. Jawapannya membawa petunjuk sebagai `Retry-After`. Laluan embeddings menamatkan penolakannya dengan ayat yang sama dan tidak menghantar `Retry-After`.

### cangkuk POST (rekod penggunaan)

Selepas jawapan yang berjaya:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Nota hanyut** : jika `consume` gagal post-response, rolling counter kurang dikira. Isyarat tepu daripada pembekal (cth `anthropic-ratelimit-unified-5h-utilization`) membetulkan anggaran global pada permintaan seterusnya.

### Kombo penalti lembut (`open-sse/services/combo.ts`)

Apabila `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Penalti dikenakan selepas semua faktor pemarkahan lain. Ia mengurangkan kebarangkalian kombo automatik untuk memilih kunci tepu tanpa menyekatnya dengan keras.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Halaman kolam utama

Komponen (semua dalam `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponen               | Tujuan                                                                           |
| ---------------------- | -------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Kad pengenalan yang menerangkan perkongsian kuota kepada pengguna baharu         |
| `CreatePoolModal`      | Buat kumpulan kuota baharu (sambungan + nama + peruntukan awal)                  |
| `PoolCard`             | Ringkasan setiap kumpulan: nama, sambungan, kiraan peruntukan                    |
| `DimensionBar`         | Bar tindanan setiap dimensi: penggunaan global + bahagian setiap kunci           |
| `AllocationTable`      | Meja dengan dimakan, bahagian saksama, deficit/surplus, bendera pinjaman         |
| `BurnRateChart`        | carta garis kadar pembakaran EMA (carta semula malas melalui `dynamic()`)        |
| `EditAllocationsModal` | Edit pemberat peruntukan, had dan dasar untuk kumpulan                           |
| `BorrowModeField`      | Pemilih mod pinjam (`saturation` atau `consent`) dalam wizard                    |
| `LendingBadge`         | Lencana baca sahaja pada kunci yang meminjamkan, dalam kumpulan `consent` sahaja |

Lencana pinjaman menunjukkan peratusan dan, apabila ditetapkan, tarikh akhir dalam UTC dengan zon dinamakan. Ia menilai tarikh akhir pada masa syot kilat penggunaan. Tarikh akhir tamat tempoh atau tidak boleh dibaca ditunjukkan sebagai `lending expired`.

Cangkuk halaman:

- `usePools` — mengambil `GET /api/quota/pools` setiap 30s.
- `usePoolUsage` — mengambil `GET /api/quota/pools/[id]/usage` atas permintaan.
- `useLocalStoragePoolMigration` — berjalan sekali pada mount untuk memindahkan data LS legasi.

Langkah kunci wizard kolam mempunyai kotak `Show usage by member to key holders`. Ia menetapkan pilihan `memberBreakdown` kolam (lihat [Penggunaan ahli](#member-usage) ). Di bawahnya, wizard memberi amaran bahawa seseorang yang mengetahui satu kekunci yang digunakan boleh memadankan bar dengan kekunci itu. Dengan kotak ditandakan, ia berkata demikian apabila langkah menyenaraikan kurang daripada tiga atau lebih daripada 20 kekunci, kerana bar kemudian kekal tersembunyi. Ia mengira kunci dalam langkah dan tidak dapat memberitahu yang mana antara mereka boleh membuat permintaan.

### `/dashboard/costs/quota-share/plans` — Konfigurasi pelan pembekal

- `ProviderPlanConfigClient.tsx`: lungsur turun untuk memilih pembekal, melihat pelan yang diselesaikan (auto daripada katalog atau ganti manual) dan mengedit dimensi.
- Perubahan tulis kepada `PUT /api/quota/plans/[connectionId]`.
- Pemadaman kembali kepada katalog atau pelan kosong.

---

## Kuota Layan Diri API (ikut serta)

`GET /api/v1/me/quota/{provider}` (juga dihidangkan di `/v1/me/quota/{provider}`) membolehkan pemegang kunci API membaca, dengan kunci mereka sendiri, jumlah langganan kongsi milik mereka dan perkara yang menyekat mereka. Laluan adalah cangkerang nipis di atas `src/server/selfService/quotaHandler.ts`; pandangan dibina oleh `src/lib/quota/selfView.ts` dan kontrak tindak balasnya ialah `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` dalam `docs/openapi.yaml`).

### Mendayakan dan pengesahan

- Bendera ciri `QUOTA_SELF_PANEL`, `false` lalai . Semasa ia dimatikan, permintaan yang mencapai laluan mendapat 404. Dengan `REQUIRE_API_KEY=true`, dasar API pelanggan menolak kunci yang hilang atau tidak sah dengan 401 sebelum laluan berjalan, walau apa pun benderanya. Permintaan tanpa kunci tetapi sesi papan pemuka yang dilog masuk melepasi dasar itu dan mendapat jawapan laluan itu sendiri. Bendera diselesaikan seperti setiap bendera lain (papan pemuka atau REST override, kemudian pembolehubah persekitaran dengan nama yang sama); lihat [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Nama paparan setiap kumpulan dan label setiap jadual dikembalikan kepada pemegang kunci kumpulan sama seperti yang ditulis oleh pentadbir. Sebelum menghidupkan bendera, pastikan ia sesuai untuk dibaca oleh pemegang kunci tersebut.
- Kunci dibaca daripada pengepala sahaja: `Authorization: Bearer <key>` atau `x-api-key: <key>`. Apabila kedua-duanya dihantar, yang pertama yang mengesahkan digunakan. Kunci dalam rentetan pertanyaan atau kuki diabaikan. Kunci persekitaran pelayan ditolak (401).
- Kunci memerlukan skop `self:usage` (403 tanpanya).
- Segmen penyedia dipangkas, huruf kecil dan disemak terhadap `^[a-z0-9][a-z0-9._-]{0,63}$` (400 sebaliknya), kemudian diselesaikan melalui pendaftaran pembekal, jadi alias seperti `cc` membaca kumpulan `claude`. `claude` dan `anthropic` membaca kumpulan yang sama.

### Perkara yang ditunjukkan oleh setiap keterlihatan

| Keterlihatan     | Memerlukan                                                                           | Padang                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bahagian sendiri | `self:usage`                                                                         | `pools[]` (rujuk, nama, pembekal, polisi, berat, topi), `dimensions[].yourShare`, `accounts[]` dengan `yourShare` (pada tetingkap `percent` tanpa `attributed` dan `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                |
| Tahap akaun      | `self:usage` + `self:account-quota`, dan pembekal dalam `sharedQuotaProviders` kunci | menambah `dimensions[].total`, `accounts[].dimensions[].account` dan `accounts[].modelWindows`, `attributed` dan `external` pada `yourShare` tetingkap `percent` dan `members` pada kolam dengan penggunaan ahli dihidupkan (lihat [Penggunaan ahli](#member-usage) ) |

- `sharedQuotaProviders` ialah tetapan setiap kekunci (`PUT /api/keys/[id]/self-service`): `null`, lalai, bermaksud setiap pembekal yang dicapai oleh kunci; `[]` bermaksud tiada. `accountVisible` setiap kolam menyatakan keterlihatan yang digunakan padanya.
- Bar akaun dan tetingkap model ditunjukkan hanya untuk akaun yang sambungannya mungkin digunakan oleh kunci. Apabila kunci mempunyai senarai sambungan yang dibenarkan, akaun di luarnya menyimpan entri `Account N` tanpa `account` atau `modelWindows`. Senarai kosong bermakna tiada sekatan, seperti untuk `/v1/me/status`. Jumlah kolam (`dimensions[].total`) tidak bergantung pada senarai itu.
- Dua angka yang ditunjukkan dengan `self:usage` sahaja datang daripada penggunaan kunci lain. `exhausted` belanjawan jadual menggambarkan penggunaan setiap kunci di bawah jadual tersebut. Dalam kolam yang beratnya semuanya sifar, `weight` kunci ialah `100 / number of members`. Kedua-duanya adalah penguatkuasaan yang digunakan untuk kunci.
- Kumpulan hanya dikenal pasti oleh `ref`, nilai legap yang terikat pada kunci panggilan. Nama paparannya (`name`) disertakan semasa pentadbir menulisnya. `ref` diperoleh daripada kunci dan kumpulan dengan rahsia kunci API pelayan (`API_KEY_SECRET`). Pelanggan tidak boleh meneruskannya: ia berubah jika rahsia itu diputar.
- Akaun disenaraikan sebagai `Account 1`, `Account 2`, … dalam susunan kumpulan. Tiada id kumpulan, id sambungan, e-mel akaun atau nama akaun dikembalikan, dan respons melalui skema kontrak, yang menjatuhkan sebarang medan di luarnya.
- Countable units (`requests`, `tokens`, `usd`) are reported as the pool bucket the quota gate enforces: `limit` = plan limit × accounts in the pool, `fairShare` = weight / 100 × `limit` (equal split when every weight is 0), `consumed` = the key's own counter in the quota store, `remaining` = `fairShare` − `consumed`, floored at 0.
- `blocks.schedules` menyenaraikan tetingkap jadual kunci (`open`/`closed`, `blackout` atau `outside-window`, `retryAfterSeconds`, tingkat simpanan dan sama ada belanjawan tetingkap itu dibelanjakan); `blocks.modelCaps` menyenaraikan had setiap model setiap jamnya dengan penggunaan.
- Kunci di luar setiap kumpulan penyedia mendapat 200 dengan `pools: []`; `availableModels` ( `qtSd/` id yang dilihat oleh kunci dalam `/v1/models`), `expiresAt` dan `apiBaseUrl` masih terisi.
- `apiBaseUrl` ialah `OMNIROUTE_PUBLIC_API_BASE_URL`, kemudian `OMNIROUTE_PUBLIC_BASE_URL`, lain `null`. Ia tidak pernah asal permintaan itu sendiri.

### `status` dan `reason`

| `status`      | Maknanya                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ok`          | Bacaan semasa.                                                                                                                                                                                                                                                                                                                                                                 |
| `stale`       | Pembacaan akaun cache ditandai basi, atau yang masa penetapan semulanya telah berlalu sejak ia dibaca. Nombor disimpan. Satu tetingkap model yang masa penetapannya telah berlalu menandakan keseluruhan kumpulan `modelWindows` `stale`. Untuk bahagian kunci sendiri bagi tetingkap `percent` : buku itu dibaca tanpa bacaan akaun dalam cache gerbang untuk mengesahkannya. |
| `unavailable` | Tiada bacaan; nombornya adalah `null`, tidak pernah `0`. `reason` berkata mengapa.                                                                                                                                                                                                                                                                                             |

| `reason`                          | bila                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kedai kuota tidak boleh dibaca atau tidak boleh membaca buku atribusi.                                                                            |
| `percent_attribution_unavailable` | Bahagian kunci sendiri bagi tetingkap `percent` : belum ada buku atribusi untuk akaun dan tetingkap itu, atau buku itu tidak menyenaraikan kunci. |
| `percent_window_ended`            | Bahagian kunci sendiri bagi tetingkap `percent` : buku itu tergolong dalam tetingkap pelan yang telah tamat.                                      |
| `account_not_used_by_key`         | Bahagian kunci sendiri bagi tetingkap `percent` : sambungan akaun berada di luar sambungan yang dibenarkan oleh kunci. Bukunya tidak dibaca.      |
| `window_not_reported`             | Cache had pembekal tidak mempunyai bacaan untuk tetingkap pelan itu.                                                                              |
| `connection_lookup_failed`        | Sambungan akaun tidak dapat dibaca.                                                                                                               |
| `not_supported`                   | OmniRoute tidak boleh membaca had penggunaan untuk pembekal akaun.                                                                                |
| `fetch_failed`                    | Tiada bacaan cache boleh digunakan dan muat semula had pembekal gagal.                                                                            |
| `not_available`                   | Pembacaan tidak membawa tingkap penggunaan, atau akaun tidak mempunyai bacaan sama sekali.                                                        |

Apabila stor kuota tidak boleh dibaca, medan `blocks` yang disokong kedai ( `exhausted` belanjawan jadual, `consumed` dan `reached` had model ) adalah `null` juga.

### Keizinan pinjaman

`PATCH /api/v1/me/quota/{provider}` merekodkan persetujuan kunci panggilan sendiri untuk satu kumpulan. Ia menggunakan bendera, pengepala dan peraturan pembekal `GET`. Skop `self:usage` membenarkan penulisan ini, walaupun namanya dibaca sebagai baca sahaja.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` ialah `ref` yang `GET` pulangkan untuk kolam itu.
- `lendingPercent` ialah integer dari 0 hingga 100. Nilai 0 mengosongkan persetujuan dan tarikh akhirnya. Badan dengan `lendingPercent` 0 diterima dalam mana-mana mod.
- `lendingUntil` adalah pilihan: milisaat zaman, atau `null` tanpa tarikh akhir. Ia mestilah pada masa hadapan dan paling banyak 8640000000000000. Nilai di bawah 100000000000 dibaca sebagai saat dan ditolak.
- Mana-mana bidang lain ditolak. Badan yang lebih panjang daripada 4096 bait ditolak. Bacaan berhenti pada saiz itu, jadi badan yang lebih panjang tidak pernah dipegang sepenuhnya.

Semakan dijalankan mengikut susunan jadual ini. Setiap penolakan menggunakan badan ralat standard dengan mesej tetap. Penolakan oleh salah satu cek ini tidak akan menulis apa-apa.

| Status | Mesej                                                                                              | bila                                                                   |
| ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | Bendera `QUOTA_SELF_PANEL` dimatikan.                                  |
| 401    | `Valid API key required`                                                                           | Kunci itu tiada atau tidak sah, atau ialah kunci persekitaran pelayan. |
| 403    | `API key lacks the self:usage scope`                                                               | Kuncinya tiada `self:usage`.                                           |
| 400    | `Invalid provider`                                                                                 | Segmen pembekal tidak sah.                                             |
| 429    | `Too many lending changes. Retry later.`                                                           | Kunci melepasi hadnya. Jawapannya membawa `Retry-After`.               |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Badan tidak JSON, terlalu panjang, atau tidak sepadan dengan skema.    |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Tarikh akhir dibaca sebagai saat.                                      |
| 400    | `lendingUntil must be in the future`                                                               | Tarikh akhir adalah pada atau sebelum masa permintaan.                 |
| 404    | `Pool not found`                                                                                   | `ref` tidak menamakan kumpulan kunci ini untuk pembekal ini.           |
| 403    | `Lending is not enabled for this pool`                                                             | Kolam berada dalam mod `saturation` dan `lendingPercent` melebihi 0.   |
| 500    | `Failed to build quota view`                                                                       | Mana-mana kegagalan lain. Puncanya dilog masuk pada pelayan.           |

Had ialah 20 permintaan setiap 60 saat untuk setiap kunci. Setiap permintaan yang lulus semakan pembekal dikira, walaupun satu ditolak kemudian atau yang tidak mengubah apa-apa. Ia mempunyai kaunter sendiri, selain daripada had kadar permintaan kunci.

Permintaan yang mengubah persetujuan disimpan menulis satu rekod audit `quota.pool.lending.updated`. Ia menamakan kunci dengan nilai lama dan baharu. Badan yang sama dihantar dua kali menulis sekali dan mengaudit sekali. Jawapannya ialah 200 dengan paparan `GET` penuh, dibina selepas penulisan.

The `GET` view melaporkan pemberian pinjaman seperti berikut:

- Setiap kolam membawa `borrowMode` (`saturation` atau `consent`), dan `lendingPercent` dan `lendingUntil` kunci itu sendiri.
- `lendingActive` ialah `true` hanya dalam kumpulan `consent`, dengan peratusan melebihi 0 dan tarikh akhir tidak dicapai.
- Dalam kolam `consent`, setiap `dimensions[].yourShare` boleh dikira membawa `borrowAvailable`. Itulah yang mungkin digunakan oleh kunci di atas bahagiannya sekarang, yang dipinjamkan oleh kunci lain.
- `borrowAvailable` menggunakan formula gate. Ia membaca setiap kunci lain, juga semasa kunci itu berada di bawah bahagiannya. Untuk kunci `hard` yang merupakan satu bacaan tambahan bagi setiap kunci lain dan dimensi boleh dikira, secara selari.
- `borrowAvailable` ialah `null` untuk kunci `soft` atau `burst`, dan `null` apabila bacaan gagal.
- `borrowAvailable` ialah satu angka untuk semua kunci lain bersama-sama. Dalam kumpulan dua kekunci ia adalah angka kunci yang satu lagi itu sendiri.
- `borrowAvailable` belum dilaporkan untuk tetingkap `percent` atau dalam `accounts[]` lagi.
- Dalam kumpulan `saturation` paparan melaporkan persetujuan yang disimpan dengan `lendingActive: false` dan tiada `borrowAvailable`.

### Kesilapan

Setiap tindak balas laluan ini, kejayaan atau kesilapan, membawa `Cache-Control: no-store`. Penolakan yang berlaku sebelum laluan berjalan tidak membawanya, contohnya polisi API pelanggan 401 atau penapis IP 403. Ralat laluan menggunakan badan ralat standard dengan mesej tetap: 400 (pembekal tidak sah), 401 (kunci hilang atau tidak sah), 403 ( `self:usage` hilang), 40 (flag off) dan 40 (`Failed to build quota view`) 0). 500 meliputi sebarang kegagalan sebaik sahaja permintaan mencapai laluan, termasuk carian kunci itu sendiri; puncanya dilog masuk pada pelayan dan tidak pernah dikembalikan. Kesilapan `PATCH` disenaraikan dalam [persetujuan Pinjaman](#lending-consent).

### Had

- `remaining` ialah sebahagian daripada bahagian saksama kunci yang tidak digunakannya. Ia bukan jaminan. Kunci masih boleh dihidangkan di luarnya sementara kolam mempunyai ruang. Setelah jumlah kolam mencecah `limit`, setiap kunci kolam akan ditolak, tidak kira `remaining` sendiri dan kunci tanpa `self:account-quota` tidak dapat melihat jumlah itu.
- `remaining` tidak mengambil kira `cap` mutlak peruntukan tersebut. Penguatkuasaan menolak kunci apabila penggunaannya sendiri dalam tetingkap unit penutup mencapai nilai penutup.
- Bar peringkat akaun datang daripada cache had pembekal dan boleh ketinggalan beberapa minit keputusan penguatkuasaan. Bacaan yang masa penetapannya telah berlalu dilaporkan sebagai `stale`.
- Tingkap setiap model (`modelWindows`) dilaporkan hanya untuk penyedia yang mempunyai pemetaan tetingkap pelan: Claude dan Codex hari ini. Untuk pembekal lain `modelWindows` masih ada apabila data akaun ditunjukkan, dengan senarai `windows` kosong.
- Bahagian kunci sendiri bagi tetingkap `percent` adalah anggaran. Ia datang daripada buku atribusi dan membawa setiap had yang disenaraikan di bawah "Dimensi peratus: atribusi setiap kunci" di atas.
- `consumed` ialah bilangan penguatkuasaan yang dibandingkan dengan bahagian saksama. Ia adalah `attributed` tambah `external`, betul-betul. `attributed` ialah bahagian yang buku memberikan kunci untuk token yang dihalakannya. `external` ialah bahagian kunci daripada penggunaan akaun yang tidak diambil kira oleh kunci kumpulan.
- Kedua-dua bahagian dihantar hanya apabila `accountVisible` kolam adalah benar: kunci mempunyai `self:account-quota` dan pembekal berada dalam `sharedQuotaProviders`. Kunci tanpanya mendapat `consumed` sahaja, dengan `status` dan `reason` yang sama.
- Dengan kedua-dua bahagian dan beratnya sendiri, pemegang boleh menyelesaikan penggunaan yang dibuat di luar kolam yang dicaj ke kunci kolam. Pemegang dengan skop akaun sudah melihat jumlah akaun.
- Kunci yang tidak menghalakan apa-apa dalam tetingkap masih boleh membaca cas luarannya daripada `consumed`, kerana bahagian yang diatributkannya ialah 0.
- Sebagai contoh, sebuah buku dibuka pada 0, dengan kunci A dan B pada berat 50 setiap satu. Laluan Kunci A 900,000 token dan kunci B 100,000. Akaun kemudiannya mencapai 60% daripada had 100. Kemudian `attributed` ialah 54 untuk kunci A dan 6 untuk kunci B, dan `external` ialah 0 untuk kedua-duanya.
- Pandangan membaca buku dan tidak pernah menulis keadaannya. Ia tidak membuka buku, dan ia tidak pernah meminta pembekal untuk membaca. Dengan kedai Redis, bacaan mengalih keluar medan semakan yang digantikan di latar belakang, seperti yang dilakukan oleh bacaan gerbang.
- Bahagian adalah `ok` sahaja manakala cache pintu menyimpan bacaan akaun. Tanpa satu ia adalah `stale`, jadi dalam kolam tanpa permintaan terbaharu ia ditunjukkan sebagai mungkin ketinggalan zaman.
- Sehingga permintaan melalui kumpulan, bahagian itu tidak tersedia. Permintaan itu membuka buku dan angka akaun pada masa itu dikira sebagai penggunaan yang dibuat di luar kolam.
- Dalam kumpulan dengan beberapa akaun, setiap entri akaun menggunakan buku akaun itu sendiri dan had satu akaun. Penguatkuasaan menskalakan kedua-dua belah pihak mengikut bilangan akaun, jadi perkadarannya adalah sama.
- Tingkap setiap model tidak membawa bahagian untuk kunci. Buku ini tidak menyimpan data setiap model.
- Tingkat rizab jadual tidak dinilai oleh paparan: jadual boleh ditunjukkan sebagai `open` manakala permintaan ditolak dengan sebab `schedule-reserve`.
- Apabila dua kumpulan kunci yang sama berkongsi sambungan, penguatkuasaan menggunakan salah satu daripadanya dan paparan menyenaraikan kedua-duanya.
- Tiada had setiap alamat pada percubaan kunci yang gagal: di sebalik proksi terbalik, pemanggil boleh berkongsi satu alamat (ia bergantung pada sama ada alamat klien yang dimajukan dipercayai), jadi sekatan keluar boleh menafikan laluan kepada setiap pemegang kunci. Dengan `REQUIRE_API_KEY=true`, kunci yang tidak sah ditolak oleh dasar API pelanggan sebelum laluan berjalan, dengan badan 401 dasar itu dan bukannya laluan ini.

### Penggunaan ahli

Pentadbir boleh membenarkan pemegang kunci melihat cara penggunaan tetingkap berpecah antara ahli kumpulan. Pilihannya ialah `memberBreakdown` kolam , dimatikan secara lalai. Ia ditetapkan dalam wizard kolam atau dengan `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` dan `GET /api/quota/pools/{id}` melaporkannya.

Dimensi pandangan membawa `members` hanya apabila semua ini memegang:

- pilihan kolam dihidupkan
- kolam mempunyai paling banyak 20 kunci yang diperuntukkan, dan sekurang-kurangnya tiga daripadanya boleh membuat permintaan: aktif, tidak dibatalkan, tidak diharamkan dan tidak melepasi tarikh luputnya
- `accountVisible` pool adalah benar: kunci mempunyai `self:account-quota` dan penyedia berada dalam `sharedQuotaProviders`
- pada tetingkap `percent`, sambungan akaun adalah salah satu kunci yang boleh digunakan
- bahagian kunci sendiri pada tetingkap itu dibaca: `status` bukan `unavailable`

Kalau tidak `members` tiada. Ia bukan senarai kosong.

- Setiap keping adalah `{ slot, consumed, isYou }`. Skema respons menolak sebarang sifat lain pada kepingan dan senarai lebih daripada 20 kepingan. Kepingan disenaraikan dalam susunan slot.
- Terdapat satu keping bagi setiap kunci yang diperuntukkan, termasuk kunci yang tidak lagi boleh membuat permintaan. Ahli tanpa guna menunjukkan sifar sebenar.
- Slot 1 sentiasa menjadi kunci bertanya, dengan `isYou` benar. Nombor slot yang lain ialah pangkat cincangan berkunci. Ia dikunci dengan `API_KEY_SECRET` dan meliputi kolam, kunci bertanya dan ahli.
- Jadi nombor tidak sejajar antara pemegang. Bagi satu pemegang, mereka tetap sama antara lawatan. Ia boleh berubah apabila kunci bergabung atau meninggalkan kolam, atau apabila rahsia itu diputar.
- Pada tetingkap boleh dikira satu keping ialah kaunter ahli di kedai kuota, kaunter yang sama dengan `consumed` sendiri.
- Pada tetingkap `percent` hirisan ialah bahagian `attributed` ahli, daripada buku yang sama dibaca sebagai bahagian kunci sendiri. Penggunaan yang dibuat di luar kolam tidak pernah dipecah menjadi kepingan. Caj itu dibahagikan mengikut berat, jadi kepingan yang membawanya akan menunjukkan pemberat.
- Setiap paparan membaca satu nilai bagi setiap ahli lain dan tetingkap boleh dikira, secara selari. Pada tetingkap `percent` potongan tidak boleh dibaca melebihi bacaan buku milik sendiri. Apabila satu nilai tidak boleh dibaca, tetingkap itu tidak mempunyai `members`, dan bahagian kunci itu sendiri kekal.
- Pilihan dan bilangan kunci yang boleh digunakan dibaca sekali setiap kumpulan, dan hanya untuk kunci yang mungkin melihat data akaun. Kegagalan membaca pilihan atau kiraan kunci boleh guna mematikan bar untuk kumpulan itu. Pelayan mencatatkan amaran, dan paparan selebihnya dibina.

Bar tidak mempunyai nama atau id. Mereka masih memberitahu pemegang kunci perkara tentang ahli lain:

- Pemegang masih boleh memadankan kepingan mengikut nilai mereka.
- Penomboran yang stabil membolehkan pemegang mengikut satu ahli dari semasa ke semasa.
- Bilangan kepingan menunjukkan bilangan kunci yang diperuntukkan dalam kolam.
- Dalam kumpulan tiga kunci, seseorang yang mengetahui apa yang digunakan oleh satu kunci boleh memberitahu perkara yang digunakan oleh kunci terakhir.
- Apabila kolam jatuh di bawah tiga kekunci yang boleh digunakan, bar hilang. Pandangan yang diambil sebelum ini masih menunjukkan apa yang digunakan oleh setiap ahli.
- Pada tetingkap boleh dikira, jumlah kolam tolak kepingan boleh menunjukkan penggunaan kekunci yang tidak lagi diperuntukkan.
- Ahli yang menunjukkan sifar pada satu akaun dan menggunakan pada akaun lain boleh menunjukkan ahli yang menggunakan akaun mana.
- Dalam kumpulan boleh dikira dengan dasar `hard`, kepingan yang berhenti berkembang pada bahagian saksama ahli membayangkan berat ahli itu.

### Siri penggunaan (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (juga disampaikan di `/v1/me/usage`) mengembalikan penggunaan dan kos permintaan kunci panggilan sendiri: jumlah, satu entri setiap UTC hari, setiap hari dan model, setiap model dan setiap pembekal. Ia berkongsi bendera, peraturan pengesahan, skop `self:usage`, `Cache-Control: no-store` dan gelagat ralat laluan kuota di atas. Kunci disemak sebelum `range`. Ralat ialah 400 (`Invalid range`), 401, 403, 404 dan 500 (`Failed to build usage`).

- `range` ialah salah satu daripada `1d`, `7d`, `30d` (lalai) atau `90d`. Sebarang nilai lain, nilai kosong atau parameter berulang ialah 400. Set berhenti pada `90d` untuk mengikat kos panggilan. Pandangan hanya membaca sejarah penggunaan mentah, bukan ringkasan harian, yang tidak membawa kunci.
- Baris dipilih oleh id kunci panggilan. Lajur nama kunci tidak pernah dipadankan, dan baris yang direkodkan tanpa id kunci tidak pernah dikira.
- Membina siri menjalankan lima pertanyaan berkumpulan di atas baris kunci dalam tetingkap. Siri terbina digunakan semula selama 60 saat bagi setiap kekunci dan julat, dan panggilan yang digunakan semula tidak dijalankan. `generatedAt` memberikan umurnya.
- Tetingkap tamat apabila siri itu dibina. Baris yang dicop kemudian, contohnya dengan condong jam, tidak dikira.
- `coverage.retentionDays` ialah tetapan pengekalan sejarah penggunaan mentah operator (`retention.usageHistory` dalam tetapan pangkalan data). `coverage.truncatedByRetention` adalah benar apabila julat yang diminta lebih panjang daripada tetapan itu. Ia membandingkan dua nombor dan tidak menyemak sama ada baris sebenarnya tiada.
- Pembekal dikembalikan seperti yang direkodkan untuk permintaan kunci itu sendiri. Model ialah nama yang direkodkan selepas `/` terakhirnya dan baris dihimpunkan olehnya. Permintaan kombo yang setiap sasarannya ditolak direkodkan dengan label penghalaan sebagai pembekal (nama kombo, `auto` atau `combo`) dan rentetan model yang dihantar oleh pelanggan. Permintaan lain yang ditolak, contohnya oleh pemutus litar terbuka, model bertenang atau langkau letak kuota, kekalkan pembekal dan model sasaran.
- Selain kiraan dan kos, respons membawa kependaman purata, kadar kejayaan dan masa permintaan pertama dan terakhir.
- `byModel` menyenaraikan 50 pasangan penyedia dan model dengan permintaan terbanyak. Dengan lebih banyak pasangan entrinya tidak menambah sehingga `summary`, dan `summary.uniqueModels` mengira setiap ejaan model yang direkodkan. `byModelTruncated` kemudiannya benar, dan model yang pasangannya jatuh pada kedua-dua belah potongan menunjukkan jumlah separa.
- Dua kos dilaporkan. `costUsd` ialah kos yang dibilkan, seperti yang ditunjukkan oleh analitis penggunaan. Pembekal langganan kadar rata, seperti pelan Kod Claude, mengira $0 di sana. `listPriceUsd` ialah harga penggunaan yang sama pada harga senarai, termasuk langganan. Permintaan yang modelnya tidak mempunyai baris harga mengira kos tersimpannya: kos yang dilaporkan oleh pembekal, atau satu dikira apabila permintaan itu direkodkan. Hanya permintaan tanpa mengira 0, tanpa penanda, jadi jumlah boleh menjadi sebahagian.
- Kontrak tindak balas ialah `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` dalam `docs/openapi.yaml`).

### Halaman layan diri

Dengan `QUOTA_SELF_PANEL` dihidupkan, `/quota/{provider}` ialah halaman awam. Pemegang kunci menaip kunci API di sana dan melihat kumpulan kunci itu untuk pembekal. Setiap kolam menunjukkan satu kad setiap tetingkap kolam, dengan penggunaan kolam untuk semua orang dan bahagian kunci sendiri. Setiap akaun kumpulan mempunyai kad sendiri, dengan penggunaan akaun dan bahagian kunci. Penggunaan akaun muncul hanya apabila kunci boleh melihat data akaun. Halaman ini juga menyenaraikan had setiap model bagi setiap akaun dan penggunaan kunci itu sendiri. Notis muncul apabila jadual menyekat kunci sekarang. Kad menyenaraikan setiap penutup setiap model kunci dengan penggunaannya dan menandakan yang telah dicapai. `{provider}` ialah id pembekal atau aliasnya (`/quota/claude`, `/quota/cc`). Pembekal yang tidak diketahui dan setiap laluan `/quota/*` semasa bendera dimatikan, jawab 404. Kumpulan pada nod serasi OpenAI- atau Anthropic tersuai tidak mempunyai halaman. API masih menjawab untuk mereka.

Halaman tidak mempunyai sesi. Kunci dihantar hanya dalam pengepala `Authorization` `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` dan `GET /api/v1/me/usage`, tidak pernah dalam URL. Kunci yang diterima pelayan disimpan dalam `sessionStorage` tab. Dengan "Ingat pada peranti ini" ia disimpan dalam `localStorage` sebaliknya "Lupakan kunci" mengalih keluarnya daripada kedua-duanya. Kunci yang ditolak pelayan dikeluarkan daripada storan.

Kumpulan dalam mod `consent` menunjukkan kad pinjaman. Di sana pemegang kunci menetapkan keseluruhan peratusan daripada 0 hingga 100 bahagian terbiar kunci untuk dipinjamkan. Pemegang juga memilih tempoh masa persetujuan: sehingga dimatikan, 1 jam, 8 jam, 24 jam, 7 hari atau 30 hari. Tempoh dikira dari saat menyimpan. Semasa tarikh akhir berkuat kuasa, pemegang boleh menyimpannya. Jika tarikh akhir itu berlalu sebelum Simpan, kad tidak menghantar apa-apa dan meminta pilihan lain. Dengan 0% tiada tarikh akhir dihantar. Kad menunjukkan tarikh akhir yang disimpan dengan zon waktunya dinamakan. Persetujuan yang tarikh akhir telah berlalu ditunjukkan sebagai berakhir.

Untuk kunci `hard` kad itu juga menyenaraikan, setiap tetingkap pool, apa kunci lain yang dipinjamkan kepada kunci itu sekarang. Setiap baris ialah satu angka untuk semua kunci lain bersama-sama. Dalam kumpulan dua kekunci ia adalah angka kunci yang satu lagi itu sendiri. Angka yang tidak dilaporkan oleh paparan dibaca sebagai tidak tersedia, bukan sebagai sifar. Untuk kunci `soft` atau `burst` kad menyatakan bahawa tiada angka digunakan.

Kumpulan dalam mod `saturation` yang kuncinya menyimpan peratusan melebihi 0 menunjukkan pengeluaran sahaja. Ia mengatakan bahawa peratusan yang disimpan tidak mempunyai kesan di sana. Butang Tariknya menghantar 0 tanpa tarikh akhir. Kumpulan dalam mod `saturation` dengan 0 yang disimpan tidak menunjukkan kad pinjaman. Selepas disimpan, kad yang tidak diperlukan oleh paparan yang dikembalikan akan kekal bersama mesejnya sehingga paparan halaman berubah lagi.

Tiada apa-apa disimpan sehingga pemegang menekan Save atau Withdraw. Setiap akhbar menghantar satu permintaan `PATCH /api/v1/me/quota/{provider}`, dan akhbar kedua tidak menghantar apa-apa semasa yang pertama belum selesai. Badan membawa `ref` legap kolam dari pandangan, peratusan dan tarikh akhir. Jawapannya ialah paparan kuota yang dibina semula, dan halaman menunjukkannya tanpa bacaan kedua. Apabila dua simpanan bertindih, halaman membaca kuota sekali selepas jawapan terakhir. Halaman tidak menyimpan kebenaran dalam storan penyemak imbas.

Perubahan yang ditolak dijelaskan pada kad oleh teks yang dipilih daripada status HTTP. Badan ralat tidak dibaca. A 401 mengatakan kunci tidak diterima dan memuatkan semula kuota. A 403 mengatakan kolam tidak menerima perubahan pinjaman, dan 404 mengatakan kolam itu hilang. Kedua-duanya menawarkan butang yang memuatkan semula kuota. Jawapan 400 atau 4xx lain meminta pemegang menyemak peratusan dan tarikh akhir. A 429 meminta pemegangnya menunggu, dengan saat `Retry-After` apabila jawapan memberi mereka. Jawapan 5xx, 408 atau kegagalan rangkaian mengatakan perubahan itu mungkin tidak disimpan dan menyimpan nilai yang ditaip. Jawapan di luar kontrak menambah kuota. Simpanan yang gagal tidak mengeluarkan kunci dengan sendirinya. Apabila muat semula selepas ia ditolak, halaman mengalih keluar kunci seperti mana-mana bacaan yang ditolak.

Setelah kunci diterima, halaman itu juga menunjukkan kad "Sediakan alat anda" dengan tiga tab. " Kod Claude " memberikan blok `env` untuk `~/.claude/settings.json`. "Shell" memberikan pembolehubah yang sama seperti garis `export`. "Claude Desktop" memberikan nilai untuk tetingkap inferens pihak ketiganya. Model tersebut ialah model perkongsian kuota yang mungkin dipanggil oleh kunci untuk pembekal tersebut. Apabila tiada senarai sedemikian disertakan dengan kunci, blok itu menghidupkan penemuan model get laluan. Alamat get laluan ialah asal API awam yang dilaporkan pelayan (`OMNIROUTE_PUBLIC_API_BASE_URL`, kemudian `OMNIROUTE_PUBLIC_BASE_URL`). Apabila kedua-duanya tidak ditetapkan, kad menunjukkan pemegang tempat dan memberitahu pemegang untuk meminta pentadbir. Kunci ditunjukkan sebagai pemegang tempat. "Sertakan kunci saya" meletakkan keseluruhan kunci dalam teks pada skrin dan dalam apa yang disalin oleh butang salin. Itu berlangsung sehingga kotak dikosongkan, kunci dilupakan atau diganti, atau halaman ditinggalkan. Kad tidak menghantar permintaan dan tidak menawarkan muat turun fail.

Pembacaan API menandakan `stale` ditunjukkan sebagai mungkin ketinggalan zaman. Bacaan yang bertanda `unavailable` ditunjukkan dengan sebabnya, bukan sebagai sifar.

Pada pelan peratusan halaman menarik bahagian kunci sendiri apabila API melaporkannya. Ia mengatakan bahawa nombor itu adalah anggaran dan menamakan dua bahagiannya. Had setiap model menunjukkan akaun sahaja.

Apabila tetingkap membawa `members`, kadnya juga menunjukkan bar dengan satu segmen bagi setiap ahli, dalam susunan slot. Segmen kunci bertanya menggunakan warna aksen. Segmen lain mengitari warna carta tema. Legenda teks menyenaraikan setiap segmen dengan nilainya, jadi tiada apa yang bergantung pada warna. Segmen dilabelkan `You` atau `Member N`, di mana N ialah slot.

### Port khusus untuk halaman

`QUOTA_PANEL_PORT` membuka pendengar kedua yang hanya menyediakan halaman layan diri. Ia dimatikan melainkan pembolehubah ditetapkan. `QUOTA_PANEL_HOST` ialah alamat bind dan lalai kepada `127.0.0.1`.

Pendengar menyampaikan laluan ini ke port utama dan menjawab 404 untuk setiap laluan lain:

| Laluan                                                                   | Hidangkan                      |
| ------------------------------------------------------------------------ | ------------------------------ |
| `/quota/{provider}`                                                      | halaman                        |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Kuota paparan halaman dibaca   |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Siri penggunaan halaman dibaca |
| `/_next/static/`                                                         | Skrip, gaya dan fon binaan     |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | ikon                           |

`GET` dan `HEAD` dihantar tanpa badan. Satu permintaan dengan badan juga disampaikan: `PATCH` laluan paparan kuota, yang dihantar oleh halaman untuk menyimpan pilihan pinjaman. Mana-mana kaedah lain menjawab 404, kecuali permintaan CONNECT, yang sambungannya ditutup tanpa jawapan. Sebarang permintaan lain yang mengisytiharkan badan menjawab 404 dan sambungannya ditutup. Permintaan naik taraf ditolak dan sambungannya ditutup. Laluan dengan segmen titik atau penanda serpihan ditolak, seperti pada port API. Begitu juga dengan sasaran permintaan dengan aksara di luar ASCII yang boleh dicetak. Watak kawalan mentah dalam sasaran dijawab 400 oleh penghurai HTTP, sebelum semakan port ini sendiri. Minta pengepala supaya rangka kerja rizab untuk kegunaannya sendiri tidak disampaikan: nama yang bermula dengan `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` atau `x-next-`, dan nama `x-matched-path` dan `next-resume`. Permintaan itu disampaikan tanpa mereka. Papan pemuka, halaman log masuk, API pengurusan dan laluan inferens tidak boleh dicapai melalui port ini.

`PATCH` mesti membawa `Content-Type: application/json`, tanpa parameter atau dengan `charset=utf-8` sahaja. Ia mesti membawa satu `Content-Length` daripada 1 hingga 4096, ditulis sebagai digit biasa dan tiada `Transfer-Encoding`. `PATCH` yang melanggar salah satu peraturan ini menjawab 404. Beberapa panjang yang cacat, seperti yang ditandatangani atau yang berulang, dijawab 400 oleh penghurai HTTP sebelum semakan port ini sendiri. Port membaca bait yang diisytiharkan sebelum ia menghubungi port utama dan menunggu paling lama 5 saat untuknya. Badan yang tidak lengkap pada masa itu menjawab 404 dan sambungannya ditutup. Tiada apa-apa yang sampai ke port utama dalam kes itu, atau apabila pelanggan pergi dahulu. Port menyampaikan tepat bait yang diisytiharkan, dengan `Content-Length` yang sama. Bait selepasnya dibaca sebagai permintaan seterusnya pada sambungan. Proksi terbalik TLS di hadapan mesti memajukan `Content-Length` dan tidak boleh memotong semula badan permintaan. Port utama menyemak kekunci API dalam pengepala `Authorization`, seperti untuk `GET`.

Badan 404 ialah `{"error":"not_found","message":"Not found."}`. Geganti yang gagal menjawab 502 (`api_bridge_unavailable`) atau 504 (`api_bridge_timeout`) tanpa medan `detail`.

Pendengar tidak membaca `QUOTA_SELF_PANEL`, dan ia tidak menghidupkan halaman. Semasa bendera dimatikan, halaman dan API menjawab 404 pada port utama dan pendengar menyampaikan jawapan itu.

Di bawah pelayan pembangunan (`next dev`), halaman tidak menjadi interaktif melalui port ini. Soket muat semula panas pembangunan ialah permintaan naik taraf, dan port menolaknya. Gunakan pelabuhan utama semasa membangun.

Port menyediakan HTTP biasa dan halaman menghantar kekunci API. Simpan alamat ikatan lalai dan letakkan proksi terbalik dengan TLS di hadapannya. Alamat bind selain daripada loopback mencatatkan notis ini:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Rakan gelung balik yang tidak menghantar pengepala pemajuan dikira sebagai setempat pada port utama. Jadi proksi pada hos yang sama mesti menghantar `X-Forwarded-For`. Proksi pada alamat peribadi dipercayai untuk pengepala itu hanya dengan `OMNIROUTE_TRUST_PROXY=private` (atau `lan`). Mana-mana rakan sebaya lain dilaporkan oleh alamat sambungannya, dan pengepala pemajuan yang dihantarnya digugurkan.

Pendengar memegang paling banyak 256 sambungan pada satu masa. Pelanggan mempunyai 10 saat untuk menghantar pengepala permintaan dan 30 saat untuk menghantar keseluruhan permintaan. Sambungan terbiar terus hidup ditutup selepas kira-kira 5 saat. Sambungan tanpa aktiviti selama 60 saat ditutup. Nilai ini ditetapkan. Tetapkan had sambungan dan kadar pada proksi terbalik di hadapan juga. Proksi terbalik di hadapan harus mengekalkan sambungan hulu terbiarnya selama kurang daripada 5 saat, atau tidak menggunakannya semula. Geganti ke port utama menggunakan tamat masa hulu port API (`API_BRIDGE_*`).

Pendengar juga bermula apabila `API_PORT` tidak ditetapkan. `QUOTA_PANEL_PORT` mestilah port dari 1 hingga 65535, ditulis dalam digit sahaja. Ia mesti berbeza daripada port papan pemuka dan port API. Semasa pelayan WebSocket langsung dihidupkan, ia juga mesti berbeza daripada `LIVE_WS_PORT` (lalai 20132). Sebarang nilai lain tidak membuka apa-apa dan mencatatkan amaran. Amaran tentang nilai yang ditolak menamakan pembolehubah dan tidak mengulangi nilai. Port yang sudah digunakan tidak membuka apa-apa dan mencatatkan amaran ini:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Dengan set `OMNIROUTE_BASE_PATH`, pendengar menjangkakan setiap laluan di atas di bawah awalan itu. Gunakan `OMNIROUTE_BASE_PATH` yang sama pada masa binaan dan pada masa jalankan. Tulisnya dengan garis miring hadapan dan tiada garis miring mengekor, contohnya `/omniroute`. Bentuk lain, termasuk `/` dan `/omniroute/`, meninggalkan port dengan amaran, walaupun binaan menerima borang tersebut. Begitu juga laluan asas yang segmen pertamanya menamakan laluan aplikasi: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` atau `connect`, dalam apa jua keadaan.

Had:

- `/quota/{provider}/` dengan garis miring mengekor menjawab 404 pada port ini.
- Pekerja perkhidmatan dan manifes apl web tidak disampaikan pada port ini.
- Set favicon tersuai dalam papan pemuka tidak ditunjukkan pada port ini.
- Ikon tidak ditunjukkan apabila aplikasi berjalan di bawah laluan asas.
- Pelabuhan bercakap HTTP/1.1. biasa
- Ikatan yang gagal tidak dicuba semula sehingga proses dimulakan semula.
- Pendengar tidak mempunyai sambungan atau had kadar bagi setiap alamat klien.
- Persediaan bekas tidak diliputi oleh bahagian ini.

---

## Pembolehubah Persekitaran

| Pembolehubah                         | Lalai                | Penerangan                                                                       |
| ------------------------------------ | -------------------- | -------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`             | Pemandu untuk digunakan: `sqlite` atau `redis`                                   |
| `QUOTA_STORE_REDIS_URL`              | _(kosong)_           | Redis URL, cth `redis://localhost:6379`                                          |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`                | 0..1; `>= threshold` mengaktifkan mod ketat                                      |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`               | Token yang menerangkan paling banyak satu titik tetingkap pelan peratus          |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`                | 0..1; pengganda untuk skor kombo dasar lembut                                    |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`                 | Beberapa hari sebelum GC mengeluarkan baldi `quota_consumption` lama             |
| `QUOTA_PANEL_PORT`                   | _(tidak ditetapkan)_ | Port khusus untuk halaman layan diri. Tidak ditetapkan bermakna tiada pendengar. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`          | Ikatan alamat untuk pelabuhan itu                                                |

tetapan DB (`quotaStore.*`) mengatasi env vars.

---

## Penyelesaian Masalah

### Redis dikonfigurasi tetapi tidak bersambung

Pastikan `ioredis` dipasang (`npm ls ioredis`) dan `QUOTA_STORE_REDIS_URL`
boleh dicapai. Jika sambungan gagal, kilang akan kembali menggunakan SQLite (direkodkan pada
`warn`).

### `peek` mengembalikan data lapuk / gagal-terbuka

Jika `peek` menghasilkan ralat, `enforceQuotaShare` menganggap hasil tersebut sebagai "benarkan" (gagal-terbuka).
Semak log `pino` untuk entri `quota:enforce` dan `quota:factory` bagi mengenal pasti
punca utama.

### Hanyutan pembilang penggunaan

Jika penggunaan sebenar penyedia berbeza daripada pembilang, keadaan ini dijangka — tetingkap
gelongsor 2 bakul mempunyai ralat ~1% pada sempadan tetingkap, dan `consume`
dijalankan tanpa menunggu hasil selepas respons. Isyarat ketepuan (`saturationSignals.ts`)
membaca penggunaan sebenar penyedia dengan TTL 30 saat dan melaraskan `globalUsedPercent`
dengan sewajarnya.

### Kumpulan menunjukkan "tiada data" untuk kadar penggunaan

`computeBurnRate` memerlukan sekurang-kurangnya 2 sampel sejarah. Kumpulan baharu tanpa
panggilan `consume` terdahulu akan menunjukkan `tokensPerSecond: 0` dan `timeToExhaustionMs: null`.

---

## Migrasi daripada localStorage

Apabila `/dashboard/costs/quota-share` dimuatkan buat kali pertama, hook `useLocalStoragePoolMigration`
menyemak:

1. `localStorage.getItem("omniroute:quota-share:pools")` tidak kosong.
2. `GET /api/quota/pools` mengembalikan `[]` (DB kosong).

Jika kedua-duanya benar, ia menghantar setiap pool lama kepada `POST /api/quota/pools` secara kelompok,
kemudian mengalih keluar kunci localStorage. Migrasi ini bersifat idempoten: syarat 2 menghalang
migrasi semula.

---

## Pengelasan Strategi Dalaman

`quota-share` ialah strategi penghalaan **dalaman sahaja** (`INTERNAL_ROUTING_STRATEGY_VALUES` dalam
`src/shared/constants/routingStrategies.ts`). Ia digunakan secara eksklusif oleh gabungan pool `qtSd/`
yang dijana oleh sistem dan sengaja dikecualikan daripada `ROUTING_STRATEGY_VALUES` supaya ia tidak pernah
muncul sebagai pilihan yang boleh dipilih oleh pengguna dalam UI atau API.

---

## Liputan Ujian

Dua lapisan liputan automatik dihantar dengan enjin perkongsian kuota:

| Suite             | Perintah                                                               | Apa yang terkandung di dalamnya                                                                                                                                                                                              |
| :---------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 ujian)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | penjadual DRR, gating tepu, topi konkurensi, matematik fairShare, baris beratur tertunggak                                                                                                                                   |
| Matriks integrasi | `npm run test:combo:matrix`                                            | Keputusan penghalaan hujung ke hujung melalui saluran paip kombo sebenar; DRR fairness + ketepuan penolakan keutamaan melalui jahitan langsung (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matriks penyepaduan berjalan dalam CI bersama kesemua 22 strategi awam. Suite unit boleh dijalankan secara bersendirian.

---

## DB Ringkasan Skema

Tiga jadual ditambah dengan migrasi `078`, `079` dan `085`:

- takrifan kolam `quota_pools` + `quota_allocations` — dan peruntukan setiap kunci.
- `quota_consumption` — bergolek kaunter 2 baldi setiap `(apiKeyId, dimensionKey)`.
- pelan pembekal manual `provider_plans` — menimpa (dimensi JSON setiap connectionId).

Semua jadual ditambah melalui migrasi `CREATE TABLE IF NOT EXISTS` idempoten.

Pemberian pinjaman yang dibenarkan menambah tiga lajur: `quota_allocations.lending_percent` (integer, lalai 0), `quota_allocations.lending_until` (zaman milisaat atau `NULL` tanpa tarikh akhir) dan `quota_pools.borrow_mode` ( `saturation` lalai ). Penghijrahannya hanya menambah lajur ini dan tidak menulis baris sedia ada.

Buku atribusi peratus menambah `quota_percent_ledger` (satu baris setiap kumpulan, akaun dan tetingkap pelan) dan `quota_percent_ledger_tokens` (satu kaunter token setiap kumpulan, akaun dan kunci API ). `src/lib/db/quotaPercentLedger.ts` membaca dan menulisnya.
