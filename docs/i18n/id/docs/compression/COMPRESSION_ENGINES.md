# Compression Engines (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Kompresi OmniRoute dibangun berdasarkan kontrak mesin. Sebuah mode dapat menjalankan satu mesin secara langsung
(`caveman` atau `rtk`) atau pipeline bertumpuk deterministik yang mengeksekusi beberapa mesin secara berurutan.

## Mode

| Mode         | Jalur mesin                                                                                    | Input yang dimaksudkan                            |
| ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `off`        | tidak ada                                                                                      | Preservasi prompt yang tepat                      |
| `lite`       | Pembantu Caveman lite                                                                          | Pembersihan berisiko rendah yang selalu aktif     |
| `standard`   | Caveman                                                                                        | Kondensasi prompt bahasa alami                    |
| `aggressive` | Caveman + perangkum riwayat/alat                                                               | Sesi obrolan panjang                              |
| `ultra`      | Caveman + pembantu pemangkasan                                                                 | Pemulihan batas konteks                           |
| `rtk`        | RTK                                                                                            | Output terminal, shell, build, test, dan git      |
| `omniglyph`  | OmniGlyph                                                                                      | Konteks sebagai gambar pada jalur penyedia asli   |
| `stacked`    | Pipeline. Default permintaan adalah `session-dedup -> lite`. `rtk -> caveman` adalah opsional. | Log alat dan prosa campuran, penghematan maksimal |

### Profil kompresi OmniGlyph

Mesin `omniglyph` (paket `omniglyph`, 1.4.0+) menerima profil semantik bernama, yang diatur
secara global melalui `omniglyph.profile` dalam pengaturan kompresi atau per langkah melalui
konfigurasi langkah pipeline bertumpuk:

| Profil        | Batasan                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Default. Kebijakan yang diukur oleh tanda terima yang diterbitkan — sistem gambar, dokumen alat, dan riwayat padat |
| `balanced`    | Menjaga status langsung tetap asli, melindungi 8 giliran terakhir, mengempiskan riwayat tertutup yang lebih lama   |
| `coding-safe` | Menjaga otoritas, skema alat, dan output alat langsung tetap asli, melindungi 12 giliran terakhir                  |
| `passthrough` | Merutekan tanpa transformasi; mesin dilewati                                                                       |

Profil adalah **batas atas, bukan batas bawah**: `mergeCompressionProfileOptions` dalam paket
menolak untuk membiarkan pemanggil menimpa membuka kembali jalur yang hilang yang ditutup oleh profil,
sehingga `preserveSystemPrompt: false` per langkah tidak dapat mengaktifkan kembali kompresi sistem di bawah `coding-safe`.

Diukur pada basis kode ini: `coding-safe` dan `balanced` menaikkan `minCompressChars` ke
maksimumnya dan menjaga sistem, skema alat, dan hasil alat tetap asli, sehingga sesi yang
belum mengumpulkan riwayat berhenti pada `below_min_chars` dan mesin tidak mengubah apa pun.
Itulah mengapa defaultnya adalah `aggressive` daripada profil teraman.

Paket menyelesaikan cakupan model dan profilnya sendiri dari konfigurasi lingkungannya.
OmniRoute tidak pernah mendelegasikan keputusan: adaptor mengunci gerbang model ke cakupan
paket yang paling ketat, sehingga pengaturan lingkungan host hanya dapat mempersempit daftar
izin, tidak pernah memperluasnya melewati tanda terima yang diukur OmniRoute.

## Registri Engine

Registri berada di `open-sse/services/compression/engines/registry.ts`. Engine menyediakan kontrak
bersama:

- `id`: id engine stabil seperti `caveman` atau `rtk`
- `apply(text, config)`: jalur eksekusi lama yang digunakan oleh pipeline bertumpuk
- `compress(input, config)`: jalur eksekusi utama yang mengembalikan teks + statistik
- `getConfigSchema()`: mengembalikan struktur mirip JSON Schema dari konfigurasi yang valid
- `validateConfig(config)`: mengembalikan `{ valid, errors[] }`

Pendaftaran menggunakan `registerCompressionEngine(engine)` (atau `registerEngine` untuk kasus lanjutan),
yang memanggil `assertValidEngine()` dan `validateConfig(defaultConfig)` sebelum menerimanya.
Gunakan `unregisterCompressionEngine(id)` untuk menghapus engine saat runtime.

`strategySelector.ts` mendaftarkan engine bawaan sebelum kompresi dijalankan. Hal ini memungkinkan pratinjau,
kompresi runtime, mode bertumpuk, pengujian, dan engine mendatang menggunakan jalur eksekusi yang sama.

### Kompresi deskripsi MCP (terkait)

Registri terpisah mengompresi metadata deskripsi alat MCP pada tingkat registri — lihat
`open-sse/mcp-server/descriptionCompressor.ts` dan [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Registri ini menggunakan kembali
aturan Caveman, tetapi beroperasi pada metadata alat, bukan payload permintaan.

### Engine bawaan tambahan

Selain Caveman, RTK, dan LLMLingua-2, registri menyediakan beberapa engine lossless /
struktural khusus (digunakan oleh pipeline bertumpuk, playground, dan pengujian):

| Engine        | Id              | Fungsinya                                                                                                                                                                            |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): mengganti blok teks berurutan yang besar dengan referensi berbasis konten, sehingga blok yang berulang/besar dikirim sekali dan selanjutnya dirujuk. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): pemadatan tabular lossless untuk payload array JSON homogen menjadi bentuk kolumnar `[N rows]`.                                                              |
| ionizer       | `ionizer`       | Pengambilan sampel baris awal/tengah/akhir untuk blok homogen yang sangat besar, dengan menyimpan bagian tengah yang dihilangkan sebagai referensi berbasis konten CCR.              |
| session-dedup | `session-dedup` | Deduplikasi lintas giliran berbasis konten (terinspirasi TokenMizer): menghilangkan teks yang telah terlihat pada giliran sebelumnya dalam sesi yang sama.                           |

**Instruksi protokol pengambilan CCR (#8033):** saat pertama kali CCR mengganti ≥1 blok dalam suatu
permintaan, engine menambahkan satu pesan `system` idempoten di awal (diawali dengan
sentinel `[CCR protocol]`) yang mengajarkan kontrak penanda → alat kepada pemanggil: arti
penanda `[CCR retrieve hash=<24hex> chars=N]`, bahwa hash harus disalin apa adanya
(semua 24 karakter heksadesimal — hash yang salah disalin kemungkinan menjadi penyebab kegagalan
"blok tidak ditemukan"), dan bahwa penanda `[dedup:ref sha=...]` berarti "lihat kembali riwayat", bukan "panggil
alat". Catatan tersebut disisipkan **hanya ketika `tools[]` yang diumumkan pemanggil membuktikan bahwa pemanggil benar-benar dapat
mengakses `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` dalam
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — pemanggil biasa yang kompatibel dengan
OpenAI tanpa alat tersebut tidak pernah menerima instruksi untuk memanggil sesuatu yang
tidak dapat diaksesnya. Idempotensi diberlakukan dengan memindai riwayat pesan untuk mencari sentinel
sebelum penyisipan, sehingga permintaan multi-giliran (yang memutar ulang pesan sebelumnya) tidak menumpuk
catatan sekali per giliran.

## Caveman

Mode Caveman berfokus pada pemadatan semantik prosa normal:

- mempertahankan blok kode, URL, JSON, jalur, dan data terstruktur
- menghapus kata-kata pengisi, ungkapan keraguan, konteks berulang, dan frasa penghubung yang bertele-tele
- mendukung paket aturan berkas yang mengenali bahasa di `open-sse/services/compression/rules/`
- tetap tersedia melalui mode lama `standard`, `aggressive`, dan `ultra`

Tampilan dasbornya berada di `Dashboard -> Context & Cache -> Caveman`.

Proyek hulu Caveman melaporkan token keluaran `~75%` lebih sedikit, penghematan keluaran rata-rata `65%` dalam tolok ukur
dengan rentang `22-87%`, serta alat kompresi masukan sebesar `~46%`. OmniRoute menggunakan angka sisi masukan Caveman
saat mendokumentasikan penghematan prompt/konteks bertumpuk; mode keluaran Caveman tetap merupakan fitur
perilaku respons yang terpisah.

## RTK

Mode RTK berfokus pada keluaran perintah dan alat:

- mendeteksi kelas keluaran seperti `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  pengujian Cargo/Go, build TypeScript/Vite/Webpack, ESLint, audit/instalasi npm, log Docker,
  `find`/`grep` shell, stack trace, dan log generik
- menerapkan 49 filter JSON dari `open-sse/services/compression/engines/rtk/filters/`
- mendukung pipeline deklaratif bergaya RTK: penghapusan ANSI, penggantian, penghentian singkat berdasarkan kecocokan keluaran,
  penghapusan/penyimpanan baris, pemotongan per baris, pemotongan bagian awal/akhir/jumlah baris maksimum, dan fallback saat kosong
- mendukung filter proyek berbasis kepercayaan di `.rtk/filters.json` dan filter global di
  `DATA_DIR/rtk/filters.json`
- menghapus urutan ANSI, derau progres, baris berulang, dan teks standar yang tidak membantu
- mempertahankan kegagalan yang dapat ditindaklanjuti, peringatan, ringkasan, berkas yang berubah, dan konteks bagian akhir
- dapat secara opsional menyimpan keluaran mentah yang telah disunting untuk pemulihan/debugging melalui rute pengelolaan
  terautentikasi

Tampilan dasbornya berada di `Dashboard -> Context & Cache -> RTK`.

Detail operasional untuk filter khusus, kepercayaan, verifikasi, dan pemulihan keluaran mentah tersedia di
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Proyek hulu RTK melaporkan penghematan `60-90%` untuk kompresi keluaran perintah. Contoh dalam README-nya menunjukkan
sesi Claude Code selama 30 menit berkurang dari `~118,000` token menjadi `~23,900`, atau menghemat `79.7%`.

## LLMLingua-2 (Pemangkasan Semantik)

Mode LLMLingua-2 melakukan **pemangkasan token semantik** pada prosa menggunakan pengklasifikasi
token ONNX berukuran kecil, sebagai pelengkap mesin Caveman dan RTK yang berbasis aturan:

- mengompresi prosa hanya dalam pesan non-sistem; blok kode berpagar dan konstruksi lain yang dipertahankan
  tidak pernah diubah
- menjalankan backend `@atjsh/llmlingua-2` (ONNX melalui `@huggingface/transformers`) dalam
  thread pekerja, sehingga inferensi model tidak pernah memblokir event loop permintaan
- **dapat ditumpuk** (`stackPriority` 35): dalam pipeline bertumpuk, mode ini berjalan setelah
  mesin struktural (CCR, session-dedup, headroom, Caveman), tetapi sebelum `ultra`, karena
  pemangkasan semantik paling efektif pada teks yang sudah dikompresi secara struktural — mis.
  `rtk -> caveman -> llmlingua`
- **tetap beroperasi saat terjadi kesalahan apa pun** (dependensi opsional tidak tersedia, pembuatan pekerja, pemuatan model, inferensi,
  atau timeout) → teks asli dikembalikan tanpa perubahan, bukan kesalahan

Lokasi mesin: `open-sse/services/compression/engines/llmlingua/`. Tampilan dasbornya
berada di `Dashboard -> Context & Cache -> LLMLingua`.

### Model

Model default adalah **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
cepat). Model **BERT-base** dengan akurasi lebih tinggi (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) tersedia melalui kolom `model` dalam konfigurasi mesin. `@huggingface/transformers`
mengunduh model yang dipilih secara tertunda dari HuggingFace Hub ke
`${DATA_DIR}/models/llmlingua` pada pemanggilan pertama (`modelStore.ts`); penimpaan konfigurasi `modelPath`
akan mengarahkannya ke salinan lokal (untuk instalasi offline / terisolasi).

### Dependensi opsional & instalasi sesuai permintaan

Stack peer runtime LLMLingua yang dapat dipangkas bersifat **opsional**. Dua paket dideklarasikan sebagai
`optionalDependencies` dalam `package.json` dan tetap **eksternal** pada build produksi
(`scripts/build/prepublish.ts` tidak membundelkannya):

| Paket                | Versi (pin) | Catatan                                           |
| -------------------- | ----------- | ------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`     | Paket entri; mendeklarasikan lainnya sebagai peer |
| `js-tiktoken`        | `^1.0.20`   | Tokenizer                                         |

`@huggingface/transformers` dipatok pada `^4.2.0` (digunakan bersama jalur embedding lokal dan
juga ditelusuri ke dalam bundle mandiri); `@atjsh/llmlingua-2@2.0.5` menggunakan dependensi peer
`"^3.5.2 || ^4.0.0"` untuk paket tersebut, sehingga Transformers.js v3 dan v4 sama-sama didukung. Sejak 2.0.4,
`@atjsh/llmlingua-2` tidak lagi memerlukan `@tensorflow/tfjs`, yang menghapus kontributor tunggal
terbesar (TensorFlow.js) dari stack SLM. Hanya dua paket di atas yang merupakan peer SLM yang
dapat dipangkas. `npm install` standar (dev) menginstal stack opsional secara otomatis, kecuali dependensi
opsional dihilangkan.

**Alasan instalasi sesuai permintaan:** paket yang dipublikasikan di npm, bundle mandiri, dan image Docker
dikirim **tanpa** dependensi ini agar tetap ramping. Jika dependensi tersebut tidak tersedia, pemeriksaan
dependensi milik pekerja (probe resolusi `@atjsh/llmlingua-2` dalam `worker.ts`) akan gagal dan mesin
**tetap beroperasi tanpa menampilkan kesalahan** — memilih LLMLingua tidak akan melakukan apa pun (teks dikembalikan tanpa perubahan dan tidak ada
kesalahan yang dicatat). Untuk mengaktifkannya di lingkungan yang telah dipangkas, instal stack opsional:

```bash
# patok ke versi yang dideklarasikan dalam optionalDependencies di package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Penghapusan `@tensorflow/tfjs` (2.0.4+) meniadakan kontributor yang sebelumnya dominan sebesar ~800 MB
— ruang yang tersisa digunakan oleh runtime transformers.js + onnxruntime-node,
ditambah model TinyBERT (~57 MB) yang diunduh saat penggunaan pertama (bukan melalui npm).

Per lingkungan:

- **Dev / `npm install`** — diinstal secara otomatis kecuali Anda menggunakan `--omit=optional`
  (atau `--no-optional`). Tidak diperlukan tindakan apa pun.
- **npm global (`npm i -g omniroute`) / mandiri** — jalankan perintah instalasi di atas di dalam
  direktori paket yang telah diinstal, atau instal ulang tanpa menghilangkan dependensi opsional.
- **Docker** — tambahkan perintah instalasi dalam sebuah lapisan image turunan; image yang dipublikasikan
  sengaja dibuat ramping.
- **VPS (PM2)** — instal ke dalam `node_modules` milik aplikasi, lalu mulai ulang proses agar
  worker memeriksa ulang gate.
- **Next mandiri mentah (`npm run build` → `.build/next/standalone/server.js`)** — trace
  mandiri TIDAK menyertakan worker maupun dependensi opsional, sehingga engine secara diam-diam
  terbuka saat gagal. `scripts/build/colocate-standalone.mjs` menerapkan kembali keduanya (esbuild worker +
  closure dependensi opsional ke dalam struktur mandiri); skrip ini berjalan secara otomatis melalui hook npm
  `postbuild` setelah setiap build. Idempoten, gagal secara lunak ketika dependensi tidak tersedia.

**Verifikasi bahwa fitur ini aktif:** saat LLMLingua dipilih, prosa nyata benar-benar menyusut (engine
tidak lagi terbuka saat gagal), dan permintaan pertama memicu pengunduhan model ke
`${DATA_DIR}/models/llmlingua`. Gate sengaja hanya memeriksa `@atjsh/llmlingua-2` —
peer lainnya hanya mendukung ESM dan `require.resolve` melempar error untuk peer tersebut meskipun tersedia — sehingga
worker tetap terbuka saat gagal jika ada peer yang benar-benar tidak tersedia pada waktu `import()`.

## Pipeline Bertumpuk

Mode bertumpuk menjalankan langkah-langkah pipeline secara berurutan. Urutan default-nya adalah:

```txt
rtk -> caveman
```

Gunakan ini untuk sesi agen pengodean ketika prompt menggabungkan output perintah dengan prosa dari manusia atau asisten. RTK terlebih dahulu mengurangi log alat yang berisik, lalu Caveman memampatkan bahasa alami yang tersisa.

Langkah-langkah pipeline dikonfigurasi dengan `stackedPipeline` dalam pengaturan kompresi atau melalui kombinasi kompresi.

Ketika kedua mesin mengurangi payload sama yang memenuhi syarat, penghematannya terakumulasi:

```txt
gabungan = 1 - (1 - penghematan RTK) * (1 - penghematan input Caveman)
rata-rata = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rentang   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter Pohon Aksesibilitas MCP

Filter cerdas pohon aksesibilitas MCP adalah lapisan kompresi pascaeksekusi yang berjalan pada **hasil alat** MCP, bukan pada prompt atau konteks. Filter ini menyasar payload pohon aksesibilitas dan snapshot browser yang panjang, yang dikembalikan oleh alat seperti Playwright, computer-use, dan server MCP otomatisasi browser.

### Fungsinya

1. **Penghapusan derau** — menghapus entri generik/teks kosong (`- generic:`, `- text: ""`)
2. **Penciutan saudara** — ketika ≥ `collapseThreshold` (default 30) baris berurutan merupakan pengulangan struktural, baris-baris tersebut diciutkan menjadi `collapseKeepHead` (default 10) baris pertama + ringkasan jumlah + `collapseKeepTail` (default 5) baris terakhir
3. **Pelestarian ref** — jangkar `[ref=eXX]` yang diperlukan oleh Playwright/computer-use tidak pernah diubah
4. **Pemotongan tegas** — jika teks setelah penciutan masih melebihi `maxTextChars` (default 50.000), teks dipotong dengan petunjuk navigasi agar agen dapat melanjutkan pekerjaan

### Lokasi mesin

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← titik masuk smartFilterText()
  collapseRepeated.ts ← algoritma penciutan saudara
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurasi

Dikendalikan oleh `compression.mcpAccessibility` dalam pengaturan global (migrasi 056). Konfigurasi default:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filter hanya diterapkan pada payload hasil alat yang `type`-nya adalah `"text"` dan panjangnya melebihi `minLengthToProcess`. Filter ini tidak memengaruhi kompresi prompt atau payload permintaan.

### Penghematan yang diharapkan

60–80% pada hasil alat snapshot browser, bergantung pada kompleksitas halaman. Algoritma penciutan memiliki kompleksitas O(n) berdasarkan jumlah baris dan menambahkan latensi yang dapat diabaikan.

### Perbandingan filter ini dengan mesin kompresi di atas

| Aspek       | Caveman / RTK / Bertumpuk   | Filter aksesibilitas MCP               |
| ----------- | --------------------------- | -------------------------------------- |
| Sasaran     | Prompt / konteks permintaan | Hasil alat MCP                         |
| Pemicu      | Pengaturan mode kompresi    | `compression.mcpAccessibility.enabled` |
| Cakupan     | Semua pesan SSE             | Hanya hasil alat                       |
| Jangkar ref | Tidak berlaku               | Selalu dipertahankan                   |

---

## Kombinasi Kompresi

Kombinasi kompresi adalah profil kompresi bernama yang dapat ditetapkan ke kombinasi perutean:

- `compression_combos`: menyimpan mode, pipeline, konfigurasi RTK, konfigurasi bahasa, dan penanda default
- `compression_combo_assignments`: memetakan kombinasi kompresi ke kombinasi perutean
- integrasi runtime menyelesaikan kombinasi kompresi yang ditetapkan sebelum penggantian kombinasi generik
- analitik mencakup `compression_combo_id` dan `engine`

Lokasi di dasbor: `Dashboard -> Context & Cache -> Compression Combos`.

## Prasyarat / panduan operator (CCR & sesi-dedup)

CCR (`ccr`) dan `session-dedup` ganti atau hilangkan teks dan tinggalkan a** penanda** di belakang. Bagian ini adalah referensi operator untuk menghubungkan klien, membaca dua penanda, dan mengambil atau mendiagnosis konten yang dihilangkan. Mekanika masing-masing mesin dibahas di atas; ini adalah lapisan "bagaimana cara menjalankannya".

### Transportasi & titik akhir

Server MCP yang mengekspos alat CCR dapat dijangkau dengan tiga cara. Basis default URL adalah `http://localhost:20128` (`OMNIROUTE_BASE_URL`):

| Mengangkut                                          | URL / perintah                          | Catatan                                                                                                                                                    |
| --------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP yang dapat dialirkan (klien, direkomendasikan) | `http://localhost:20128/api/mcp/stream` | Titik akhir yang diajak bicara oleh klien MCP saat ini.                                                                                                    |
| SSE singleton lawas                                 | `http://localhost:20128/api/mcp/sse`    | Transportasi tunggal yang lebih tua. Dia** menutup** sesi yang dapat dialirkan; gunakan klien `streamable-http` melawan `/api/mcp/stream`, bukan yang ini. |
| stdio                                               | `omniroute --mcp`                       | Untuk konfigurasi IDE MCP yang memunculkan proses. Tidak ada bendera `--dev` ; `omniroute --mcp` adalah titik masuk stdio.                                 |

### Tingkat penyimpanan (yang bertahan jika dimulai ulang)

CCR adalah a** dua tingkat** simpan, bukan hanya di memori:

- **Tingkat dalam memori yang panas** — per blok tutup 2 MiB, per kepala sekolah 16 MiB, global 64 MiB. Entri default ke TTL 24 jam (maksimum 7 hari). Pengambilan MCP penuh dari memori dibatasi pada 256 KiB; apa pun yang lebih besar masih dapat dijangkau melalui mode jarak jauh/grep.
- **Tingkat SQLite yang tahan lama** (`ccr_blocks`, `COMPRESSION_CCR_DURABLE_STORE`, aktif secara default) — mendukung tingkat dalam memori sehingga sebuah blok bertahan dari penggusuran LRU, restart, atau pengambilan kembali di instance lain. Baris tersebut mempertahankan TTL blok, sehingga blok yang melewati TTL hilang dari kedua tingkatan.

Tiga penjaga menjaga tingkat tahan lama yang dibatasi — sebuah blok tetap hanya untuk memori ketika:

1. blok sudah berakhir** 512 KB** (`MAX_DURABLE_BLOCK_BYTES`);
2. runtime adalah runtime cloud (tidak ada disk lokal);
3. `COMPRESSION_CCR_DURABLE_STORE=false`.

Jadi "blok menghilang" bukanlah cerita restart menyeluruh: blok sub-512 KB pada runtime non-cloud lokal akan bertahan jika restart melalui tingkat tahan lama sampai TTL -nya habis. Lihat [Referensi lingkungan](../reference/ENVIRONMENT.md) untuk variabel.

### Kedua penanda itu

| Penanda                               | Arti                                                                                                                                                                                     | Apa yang harus dilakukan oleh model tersebut                                                                                                                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[CCR retrieve hash=<24hex> chars=N]` | Sebuah blok besar disimpan dengan alamat konten.                                                                                                                                         | Hubungi `omniroute_ccr_retrieve` dengan** Hash 24-hex disalin kata demi kata** untuk mendapatkan teks aslinya kembali.                                                                                                                               |
| `[dedup:ref sha=…]`                   | `session-dedup` teks yang dihilangkan sudah dikirim pada giliran sebelumnya di sesi yang sama. Ini adalah sebuah** melihat ke belakang dengan sengaja** , bukan kerugian atau kesalahan. | Melakukan** bukan** panggil alat apa pun dan lakukan** bukan** cobalah untuk "merekonstruksinya". Kemunculan pertama teks tersebut adalah salinan kanonik; giliran saat ini tidak pernah ditulis ulang, melainkan dikurangi pada giliran berikutnya. |

`[dedup:ref]` melihat kembali adalah keputusan protokol yang disengaja — tidak ada rekonstruksi sebelum pengiriman. Anggap saja sebagai "teks persis seperti ini sudah disampaikan pada awal sesi ini."

### Prasyarat klien

- **Kunci (stdio):** penelepon stdio tidak membawa identitas per permintaan, sehingga diautentikasi dengan `OMNIROUTE_API_KEY` (diatur dalam `env` server MCP ). Tanpanya, penelepon bersifat anonim dan alat yang memerlukan prinsipal dapat menurun.
- **`tools[]` adalah prasyarat injeksi.** Instruksi protokol pengambilan CCR (#8033) disuntikkan** hanya** ketika permintaan yang diiklankan `tools[]` membuktikan bahwa klien benar-benar dapat mencapai `omniroute_ccr_retrieve`. Pencocokannya adalah pencocokan segmen tambahan yang dibatasi oleh pemisah (`__`, `.`, `/`, `:`) — tidak pernah berupa substring kosong — sehingga nama dengan namespace seperti `mcp__gateway__omniroute_ccr_retrieve` tetap dihitung. `tools[]` yang tidak ada atau tidak cocok berarti instruksinya _tidak_ disuntikkan, sesuai desain.
- **`codemode:false` (klien OpenCode ).** OpenCode defaultnya adalah Mode Kode, yang hanya mengiklankan alat aslinya ke model dan** tidak** letakkan alat MCP di daftar `tools[]` asli. Setel `codemode: false` pada entri server MCP sehingga alat `omniroute_ccr_*` diiklankan. Ini adalah sebuah** klien** pengaturan, bukan yang OmniRoute. Itu belum memasukkan instruksi CCR : OpenCode memberi nama alat `<server>_<tool>`, sehingga server bernama `omniroute` mengekspos `omniroute_omniroute_ccr_retrieve`, dan `_` bukan salah satu pemisah yang cocok.
- **Kepala Sekolah.** Penyimpanan dan pengambilan diisolasi per prinsipal yang diautentikasi (per kunci API ). Sebuah kunci hanya melihat bloknya sendiri.

### Cakupan per alat

Penegakan cakupan selalu aktif untuk penelepon HTTP/SSE dengan cakupan sempit. Alat `omniroute_` CCR memerlukan:

| Alat                     | Cakupan             |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

Cakupan yang hilang mengembalikan sebuah** hasil kesalahan alat MCP** (`isError: true`, bukan HTTP 403 — `403 LOCAL_ONLY` adalah auth penjaga rute loopback yang terpisah): `Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` Kunci jarak jauh minimal dapat menampung `mcp:connect` (mengotorisasi `/api/mcp/` ukiran lokal saja) ditambah cakupan read/write spesifik yang dibutuhkannya.

### Matriks klien

| Klien                    | Mengangkut                                                | Konfigurasi yang akan digunakan                                                                                                                                                                                                                           | `tools[]` diiklankan? (instruksi → CCR disuntikkan)                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kode Claude              | dapat dialirkan-http                                      | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                                                         | Ya — berkemampuan MCP; disuntikkan.                                                                                                                                                                 |
| Cursor / Cline           | `stdio`** atau** `streamable-http`                        | stdio: `omniroute --mcp` dengan `OMNIROUTE_API_KEY` di `env`; atau entri MCP jarak jauh yang menunjuk ke `http://localhost:20128/api/mcp/stream` (lihat [Panduan Pengaturan → MCP Konfigurasi Klien](../guides/SETUP_GUIDE.md#mcp-client-configuration) ) | Ya — mengiklankan alat `omniroute_ccr_*`.                                                                                                                                                           |
| OpenCode                 | dapat dialirkan-http                                      | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream`, ditambah `codemode: false`                                                                                                                                                      | Alat yang diiklankan hanya dengan `codemode: false`; instruksinya masih belum disuntikkan, karena `omniroute_omniroute_ccr_retrieve` tidak cocok (lihat [Prasyarat klien](#client-prerequisites) ). |
| Kompatibel dengan OpenAI | HTTP yang kompatibel dengan OpenAI (penyelesaian obrolan) | klien penyelesaian obrolan standar terhadap titik akhir yang kompatibel dengan OpenAI                                                                                                                                                                     | **Tidak pernah** — penelepon biasa yang kompatibel dengan OpenAI tidak pernah diminta untuk memanggil alat tersebut, dan instruksinya tidak dimasukkan.                                             |

### Batas pengambilan & penomoran halaman

hasil teks alat MCP terpotong di sekitar `mcpAccessibility.maxTextChars` (default `50000`). Pengambilan `full` suatu blok dibatasi pada 256 KiB —** tidak ada pengambilan penuh tanpa batas** . Ketika `chars=N` suatu blok besar, halamankanlah blok tersebut alih-alih menarik semuanya:

- Aturan praktisnya:**`chars > 40000` → gunakan `mode`** , tidak pernah penuh.
- `mode:"grep"` — regex `pattern` mencocokkan baris demi baris, hingga 1.000 baris yang cocok (`unique: true` tetes berulang), termurah untuk "temukan satu baris yang saya perlukan."
- `mode:"lines"` — rentang garis 1 yang diindeks; membutuhkan `start` dan `end`.
- garis `mode:"head"` / `mode:"tail"` — first/last `n`.
- `mode:"stats"` — jumlah baris, karakter, dan byte tanpa isi.

Gunakan `mode:"lines"` dengan `start`/`end` untuk berjalan dalam satu blok panjang di halaman daripada meminta semuanya sekaligus.

### Penamaan alat

Alat pengambilan saat ini bernama `omniroute_ccr_retrieve` (awalan `omniroute_` adalah solusi tertanggal untuk tabrakan nama lintas server). Nama alat akhiran terbatas yang lebih bersih dan perbaikan untuk hasil MCP JSON terpotong di tengah string dilacak sebagai tindak lanjut hulu; halaman ini hanya mendokumentasikan perilaku yang dikirimkan saat ini.

### Siklus hidup sesi

Sesi HTTP yang dapat dialirkan tidak aktif dan server mengambilnya; jendela idle adalah konstanta `MCP_SESSION_IDLE_MS` (direferensikan berdasarkan nama, bukan nilai hardcode, sehingga halaman ini tidak melayang saat diubah). Gejala sesi yang menganggur adalah HTTP 404 dengan `Unknown Mcp-Session-Id` — solusinya adalah menyambungkan kembali atau memulai kembali sesi,** bukan** untuk memutar kunci, mengubah cakupan, atau mengganti nama alat.

## Permukaan API

| Rute                                   | Tujuan                                                               |
| -------------------------------------- | -------------------------------------------------------------------- |
| `/api/settings/compression`            | Pengaturan kompresi global (mencakup konfigurasi `mcpAccessibility`) |
| `/api/compression/preview`             | Pratinjau mode kompresi apa pun                                      |
| `/api/compression/language-packs`      | Mencantumkan paket bahasa Caveman yang tersedia                      |
| `/api/context/caveman/config`          | Alias pengaturan Caveman                                             |
| `/api/context/rtk/config`              | Default dan pengaturan RTK                                           |
| `/api/context/rtk/filters`             | Katalog filter RTK                                                   |
| `/api/context/rtk/test`                | Endpoint pratinjau/pengujian RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Pemulihan output mentah tersensor yang diautentikasi                 |
| `/api/context/combos`                  | CRUD kombinasi kompresi                                              |
| `/api/context/combos/[id]/assignments` | CRUD penetapan kombinasi perutean                                    |
| `/api/context/analytics`               | Alias analitik kompresi                                              |

Rute pengelolaan memerlukan autentikasi pengelolaan atau pemeriksaan kebijakan kunci API.

## Alat MCP

Kompresi menyediakan lima alat MCP:

| Alat                                | Cakupan             | Tujuan                                |
| ----------------------------------- | ------------------- | ------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Pengaturan, analitik, statistik cache |
| `omniroute_compression_configure`   | `write:compression` | Memperbarui pengaturan global         |
| `omniroute_set_compression_engine`  | `write:compression` | Menetapkan mode dan pipeline opsional |
| `omniroute_list_compression_combos` | `read:compression`  | Mencantumkan kombinasi kompresi       |
| `omniroute_compression_combo_stats` | `read:compression`  | Membaca analitik kombinasi/mesin      |

## Cakupan & pengecualian

**Embedding tidak pernah dikompresi.** `open-sse/handlers/embeddings.ts` tidak pernah memanggil
mesin kompresi apa pun — isi permintaan/respons diteruskan langsung ke eksekutor tanpa perubahan.
Saat ini hal ini bersifat struktural (embedding dan penyelesaian chat memiliki handler yang terpisah), bukan
pemeriksaan runtime, tetapi ini berarti kekhawatiran distorsi vektor dalam #8034 tidak memiliki permukaan paparan
pada jalur embedding.

**Filter pengecualian per model/endpoint (#8034).** Untuk penyelesaian chat, operator dapat menentukan
ID model / target `provider/model` yang tidak boleh dikompresi — pengaman yang berguna jika
kompresi nantinya dihubungkan lebih dekat ke jalur yang berdekatan dengan embedding, dan secara umum berguna
untuk model apa pun yang memerlukan prompt yang sama persis byte demi byte (evaluasi deterministik, prefiks
yang sensitif terhadap cache, dan sebagainya).

- Kolom pengaturan: `exclusions?: string[]` pada konfigurasi kompresi global
  (`GET`/`PUT /api/settings/compression`), dipersistenkan melalui namespace kompresi `key_value` yang sudah ada
  (`src/lib/db/compression.ts`) — tanpa tabel baru.
- Tab dasbor: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaks pola: `*` adalah satu-satunya wildcard. Setiap metakarakter regex lain dalam pola
  di-escape sebelum pencocokan, sehingga `gpt-5.6` hanya cocok dengan string literal tersebut, tidak pernah dengan `gpt-5x6`
  (aman dari ReDoS, terbatas, tanpa kuantifier bersarang). Pola dicocokkan tanpa membedakan huruf besar-kecil terhadap
  ID model saja maupun gabungan `provider/model` — `gpt-5-6`, `openai/gpt-5-6`,
  dan `openai/*` semuanya berfungsi, dan `*` saja mengecualikan setiap model.
- Pencocokan: `isCompressionExcluded()` / `normalizeCompressionExclusions()` dalam
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` memeriksa target yang dikecualikan
  tepat setelah menyelesaikan pengaturan kompresi, **sebelum mesin apa pun dijalankan**, dan memperlakukan kecocokan
  sama persis seperti saat kompresi dinonaktifkan secara global — isi permintaan terbukti
  identik byte demi byte. Pelewatan dicatat melalui `writeCompressionSkip(..., "excluded")` agar
  terlihat dalam analitik.
- Default (daftar kosong/tidak ada): identik dengan perilaku sebelum #8034 — tidak ada yang dikecualikan.

## Keterbatasan yang diketahui

- **LLMLingua-2 (SLM) memerlukan dependensi opsional yang ditempatkan bersama.** Worker hanya berjalan dalam build
  produksi ketika `@atjsh/llmlingua-2` + peer-nya ditempatkan bersama ke dalam
  `dist/node_modules` (lihat `scripts/build/colocateOptionals.mjs`, #4286). Tanpa dependensi tersebut,
  engine akan mengalami fail-open (mengembalikan teks asli). Resolusi worker tidak lagi bergantung pada
  `import.meta.url` (yang gagal dalam bundle mandiri) — resolusi tersebut berpatokan pada
  cwd runtime / `argv[1]`.
- **Paket bahasa Caveman `de` / `fr` / `ja` masih parsial.** Paket tersebut menyertakan aturan `context` +
  `filler` + `structural`, tetapi tidak memiliki paket `dedup` / `ultra`, sehingga intensitas `ultra`
  tidak lebih kuat daripada `full` untuk bahasa-bahasa tersebut (paket ini hanya menggunakan aturannya sendiri — tidak ada
  fallback diam-diam ke aturan `dedup`/`ultra` bahasa Inggris, yang dapat merusak teks berbahasa asing).
  `en` / `es` / `id` / `pt-BR` sudah lengkap. Kontribusi `dedup.json` + `ultra.json`
  untuk paket parsial sangat diharapkan.
- **Telemetri bertumpuk hanya mencantumkan engine yang melakukan kompresi.** Langkah pipeline bertumpuk yang
  engine-nya berjalan tetapi menghasilkan penghematan 0 % akan mengembalikan `stats:null`, sehingga tidak muncul dalam
  `engineBreakdown` — tidak dapat dibedakan dari langkah yang dilewati. Membedakan antara
  "berjalan, 0 %" dan "dilewati" akan memerlukan perubahan model breakdown dan ditangguhkan.

## Validasi

Gerbang fokus untuk area ini adalah:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
