# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Hemat 15-95% pada konteks yang memenuhi syarat secara otomatis. Untuk ringkasan singkat, lihat [bagian Kompresi README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ringkasan

OmniRoute mengimplementasikan pipeline kompresi prompt modular yang berjalan secara **proaktif** sebelum permintaan mencapai penyedia upstream. Artinya, penghematan token berlangsung secara transparan — tidak perlu mengubah alur kerja Anda.

```
Permintaan Klien
  → Pemilih Strategi Kompresi
    → Ada penggantian combo? → Gunakan pengaturan combo
    → Ambang pemicu otomatis tercapai? → Gunakan mode otomatis
    → Ada mode default? → Gunakan pengaturan global
    → Nonaktif? → Lewati kompresi
  → Mode Kompresi yang Dipilih
    → Nonaktif: Tanpa kompresi
    → Ringan: Pembersihan spasi/format yang aman (~15%)
    → Standar: Penghapusan kata pengisi bergaya manusia gua (~30%)
    → Agresif: Penuaan riwayat + peringkasan (~50%)
    → Ultra: Pemangkasan heuristik + penipisan blok kode (~75%)
    → RTK: Pemfilteran output terminal/alat yang memahami perintah (rentang upstream 60-90%)
    → Bertumpuk: Pipeline multi-mesin berurutan, biasanya RTK lalu Caveman (rentang yang memenuhi syarat 78-95%)
  → Permintaan Terkompresi → Penyedia
```

---

## Mode Kompresi

### Nonaktif

Tidak ada kompresi yang diterapkan. Semua pesan diteruskan tanpa perubahan.

### Mode Lite (~15% penghematan, latensi <1ms)

Mode paling aman — pembersihan format. Pemotongan hasil alat bersifat lossy, sehingga jalur default
(tanpa opt-in `allow-lossy`, `engine:lite` atau kombinasi bernama) menjalankan lite dengan
`compressToolResults: false`: hasil alat sebelumnya diteruskan ke provider tanpa perubahan.

| Teknik                   | Deskripsi                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Menggabungkan baris kosong berurutan dan spasi di akhir                              |
| `dedupSystemPrompt`      | Menghapus pesan sistem duplikat                                                      |
| `compressToolResults`    | Memotong hasil alat sebelumnya ke batas lite (lossy: hanya dengan opt-in permintaan) |
| `removeRedundantContent` | Menghapus instruksi yang berulang                                                    |
| `replaceImageUrls`       | Memperpendek URI data gambar base64                                                  |

**Terbaik untuk:** Penggunaan yang selalu aktif, alur kerja yang kritis terhadap keselamatan.

### Mode Standard (~30% penghematan)

Terinspirasi oleh [Caveman](https://github.com/JuliusBrussee/caveman) — menghapus kata pengisi dan
frasa yang bertele-tele sambil mempertahankan makna:

- Menghapus kata pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa yang bertele-tele ("in order to" → "to", "as a result of" → "because")
- Menghapus ungkapan kesantunan yang bersifat ragu-ragu ("Would you mind...", "If you could possibly...")
- Lebih dari 30 aturan regex yang disesuaikan untuk prompt coding

**Terbaik untuk:** Alur kerja coding sehari-hari, tim yang memperhatikan biaya.

### Mode Aggressive (~50% penghematan)

Manajemen riwayat cerdas untuk sesi yang panjang:

- **Penuaan Pesan** — pesan yang lebih lama dikompresi secara bertahap
- **Kompresi Hasil Alat** — output alat yang panjang dipotong atau dihilangkan (baris pertama/terakhir,
  pemfilteran baris yang cocok, pemadatan kunci JSON)
- **Penjaga Integritas Struktural** — memastikan pasangan `tool_use` + `tool_result` tetap konsisten
- **Kesadaran Jendela Konteks** — mematuhi batas token per model

**Terbaik untuk:** Sesi debugging yang panjang, codebase besar.

### Mode Ultra (~75% penghematan)

Kompresi maksimum untuk skenario yang kritis terhadap token:

- **Pemangkasan Heuristik** — pemangkasan token berbasis skor pada teks prosa
- **Pelestarian Struktur** — blok kode berpagar, kode inline, URL, dan identifier ditandai dan
  disusun kembali secara verbatim, tidak pernah dipangkas
- **Tingkat SLM Opsional** — model lokal kecil dapat menyempurnakan pemangkasan saat dikonfigurasi
- Independen dari mode Aggressive: mode ini tidak menjalankan penuaan pesan, kompresi hasil alat,
  atau summarizer fallback (hanya kegagalan tingkat SLM yang dapat merutekan pass fallback melalui
  aggressive)

**Terbaik untuk:** Saat Anda berulang kali mencapai batas konteks.

### Mode RTK (rentang upstream 60-90%)

Mode RTK dioptimalkan untuk output alat yang bertele-tele dan muncul dalam sesi coding-agent:

- Mendeteksi kelas perintah/output seperti `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/instalasi npm, log Docker, output
  infrastruktur, dan output shell generik
- Menerapkan paket filter JSON dari `open-sse/services/compression/engines/rtk/filters/`
- Mengimpor filter skema TOML RTK v1 dari file `filters.toml` proyek atau global, dengan validasi
  inline-test dan gating kepercayaan untuk file proyek
- Menyertakan 56 filter bawaan dengan sampel verifikasi inline
- Menghapus urutan kontrol ANSI, bilah progres, baris berulang, dan noise yang tidak dapat ditindaklanjuti
- Mempertahankan kegagalan, error, peringatan, file yang berubah, ringkasan, dan bagian akhir output yang panjang
- Mendukung filter proyek dengan gating kepercayaan, filter global, dan pemulihan output mentah
  yang telah disamarkan secara opsional

**Terbaik untuk:** Sesi agent dengan transkrip shell, build, test, git, grep, dan output file.

### Mode Stacked (rentang yang memenuhi syarat 78-95%)

Mode Stacked menjalankan beberapa mesin kompresi dalam urutan deterministik. Pipeline default adalah:

```txt
RTK -> Caveman
```

Urutan tersebut terlebih dahulu membuat output terminal/alat menjadi ringkas, lalu menerapkan pemadatan
semantik Caveman pada prompt bahasa alami yang tersisa. Pipeline Stacked dapat dikonfigurasi secara
global atau melalui kombinasi kompresi yang ditetapkan ke kombinasi perutean.

**Terbaik untuk:** Konteks campuran dengan log alat yang besar serta instruksi manusia atau ringkasan assistant.

## Perhitungan Penghematan Upstream

OmniRoute mendokumentasikan penghematan kompresi dari dua sumber: tolok ukur proyek upstream dan
komposisi mesin OmniRoute sendiri.

| Sumber  | Angka README upstream yang digunakan di sini                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` lebih sedikit token output, rata-rata penghematan output tolok ukur `65%`, rentang `22-87%`, dan alat kompresi input `~46%` |
| RTK     | Penghematan output perintah sebesar `60-90%`; sesi contoh `~118,000 -> ~23,900` token, atau penghematan `79.7%` (`~80%`)           |

Untuk payload alat/konteks yang tumpang tindih, kombinasi default OmniRoute menumpuk mesin-mesin tersebut:

```txt
RTK -> Caveman
```

Penghematan gabungannya bersifat multiplikatif, bukan aditif:

```txt
gabungan  = 1 - (1 - penghematan RTK) * (1 - penghematan input Caveman)
rata-rata = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rentang   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Angka `78-95%` tersebut berlaku ketika RTK dan Caveman sama-sama dapat mengurangi payload input/konteks yang sama.
Mode output respons Caveman bersifat terpisah: ketika diaktifkan, gunakan penghematan output Caveman sendiri (rata-rata
`65%`, angka utama `~75%`, rentang `22-87%`). Total penghematan biaya bergantung pada komposisi prompt/output Anda.

### Arti sebenarnya dari "eligible"

Rentang utama 15-95% memang nyata, tetapi hanya berlaku untuk konten yang **redundan atau bertele-tele** — baris
error yang berulang, log build yang membanjiri output dengan peringatan yang sama, dump `grep`/pembacaan file yang terlalu besar. Ini
**bukan** berarti setiap permintaan menghemat sebanyak itu.

Terverifikasi secara empiris (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): proses
`stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang berisi 300 baris
error identik menghasilkan **penghematan token 95.93% / penghematan karakter 96.26%** — tepat di dalam rentang yang diiklankan.
Namun, pipeline yang sama saat dijalankan terhadap output alat yang normal dan tidak redundan (daftar kecocokan `grep` yang bersih,
pembacaan file singkat, teks percakapan biasa) dengan benar menghasilkan **penghematan mendekati nol**, karena
tidak ada pengulangan yang perlu dihapus dan `validateCompression()` (`validation.ts`) menolak mengirim
penulisan ulang yang akan menghilangkan atau mengubah blok kode, URL, judul, versi, atau identifier konstanta ALL-CAPS.

Ini adalah perilaku aman yang diharapkan, bukan bug: sesi pemrograman yang sebagian besar membaca/melakukan grep pada file bersih akan
menghasilkan total penghematan yang tidak besar meskipun kompresi sepenuhnya diaktifkan, sedangkan sesi yang mengalami loop gagal
atau linter yang cerewet akan menghasilkan rentang penuh 78-95% pada lalu lintas tersebut. Jangan gunakan rendahnya
persentase penghematan agregat dari satu sesi sebagai bukti bahwa kompresi salah dikonfigurasi — periksa terlebih dahulu apakah
output alat yang mendasarinya benar-benar redundan.

---

## Visualisasi Penghematan Token

```
Tanpa kompresi:      47K token dikirim ke LLM
Dengan Lite:         40K token dikirim          (hemat 15% — aman, selalu aktif)
Dengan Standard:     33K token dikirim          (hemat 30% — aturan caveman-speak)
Dengan Aggressive:   24K token dikirim          (hemat 50% — penuaan + peringkasan)
Dengan Ultra:        12K token dikirim          (hemat 75% — pemangkasan heuristik)
Dengan RTK:          19K-5K token dikirim       (hemat 60-90% pada output perintah/alat)
Dengan Stacked:      10K-2.5K token dikirim     (rentang RTK+Caveman yang memenuhi syarat 78-95%)
```

---

## Konfigurasi

### Dasbor

Navigasikan ke `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mode, paket bahasa, pratinjau, dan default global
- **RTK** — pratinjau filter perintah, pengaturan keamanan RTK, dan katalog filter
- **Compression Combos** — pipeline engine bernama yang ditetapkan ke combo perutean
- **Auto-Trigger Threshold** — secara otomatis mengaktifkan kompresi ketika jumlah token melebihi ambang batas

### Penggantian Per-Combo

Di `Dashboard → Context & Cache → Compression Combos`, tetapkan combo kompresi ke combo
perutean:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ini memungkinkan Anda menggunakan kompresi bertingkat pada penyedia gratis/pengodean, sambil tetap
menggunakan mode ringan pada langganan berbayar.

Penetapan "Per-Combo Override" ini merupakan kontrol yang berbeda dari penggantian **mode kompresi
combo perutean** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — skema field tersebut
juga menerima `rtk`, `stacked`, dan `omniglyph`) — penggantian tersebut tidak memilih pipeline
compression-combo bernama; penggantian tersebut hanya menetapkan field `compressionMode` yang
digunakan oleh `resolveCompressionPlan`. Pengaturan ini dapat diterapkan pada kartu combo
(`Dashboard → Combos`) atau, sejak #6760, per combo perutean dalam daftar "Assign to routing" di
`Dashboard → Context & Cache → Compression Combos`, tepat di samping kotak centang penetapan pipeline
yang didokumentasikan di atas. Kedua tampilan tersebut disimpan melalui endpoint `PUT /api/combos/{id}`
yang sama.

### Penggantian per permintaan

Kirim header permintaan `x-omniroute-compression` untuk mengganti rencana kompresi pada satu
permintaan. Header ini memiliki prioritas tertinggi — mengesampingkan penggantian combo perutean,
profil aktif, pemicu otomatis, dan Default panel. Nilai yang tidak dikenal akan diabaikan (permintaan
tidak pernah ditolak), dan sakelar utama global tetap mengatur semuanya: ketika kompresi dinonaktifkan
secara global, header ini tidak dapat mengaktifkannya. Nilai:

| Value         | Effect                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tidak ada kompresi untuk permintaan ini.                                                                              |
| `default`     | Profil Default yang diturunkan dari panel (mengabaikan profil aktif). Engine lossy tetap dinonaktifkan.               |
| `safe`        | Sama seperti tidak menyertakan header.                                                                                |
| `allow-lossy` | Mempertahankan rencana operator permintaan ini, termasuk ringkasan, filter relevansi, dan penulisan ulang gaya.       |
| `engine:<id>` | Satu engine ketika diaktifkan, misalnya `engine:rtk`. Ini adalah opt-in per permintaan untuk engine tersebut.         |
| `<combo>`     | Combo bernama, dicocokkan berdasarkan nama (tidak membedakan huruf besar-kecil) terlebih dahulu, lalu berdasarkan id. |

Tanpa `allow-lossy`, `engine:<id>`, atau combo bernama, engine lossy tidak akan diterapkan. Ketika
Default lossy, pemicu otomatis, atau penggantian perutean diturunkan, OmniRoute mempertahankan
langkah lossless yang dikenali dari pipeline bertingkat yang dikonfigurasi, dalam urutan yang
dikonfigurasi. OmniRoute hanya kembali ke `session-dedup → lite` ketika tidak ada langkah lossless
yang dikonfigurasi yang tersisa.

Pratinjau **Effective pipeline** pada panel Settings menampilkan rencana biasa saat tidak aktif.
Ketika pemicu otomatis dapat dijalankan, pratinjau yang sama juga menampilkan pipeline efektif
bersyaratnya agar resolusi runtime pada panel dan tanpa header tetap selaras.

Rencana yang diterapkan dikembalikan melalui header respons
`X-OmniRoute-Compression: <mode>; source=<source>`, dengan `<source>` berupa salah satu dari
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, atau `off`.

### API

```bash
# Dapatkan pengaturan kompresi
curl http://localhost:20128/api/settings/compression

# Perbarui pengaturan kompresi
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pratinjau payload RTK/stacked tertentu
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Daftar paket filter RTK
curl http://localhost:20128/api/context/rtk/filters

# Uji RTK secara langsung dengan metadata perintah opsional
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Apa yang Dilindungi

Mesin kompresi **selalu mempertahankan:**

- ✅ Blok kode (berpagar dan sebaris)
- ✅ URL dan jalur file
- ✅ Struktur JSON dan data terstruktur
- ✅ Identifier dan token teknis yang dilindungi
- ✅ Ekspresi matematika
- ✅ Definisi pemanggilan alat/fungsi
- ✅ Prompt sistem (dalam mode lite)

Pemulihan output mentah RTK menyunting kunci API umum, bearer token, token Slack, kunci akses AWS,
kata sandi, token, dan rahasia sebelum apa pun disimpan.

---

## Statistik Kompresi

Setiap permintaan yang dikompresi menyertakan statistik dalam log server:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Peta Jalan Fase

| Fase    | Mode                                                                                                                                             | Status     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Fase 1  | Off, Lite                                                                                                                                        | ✅ Dirilis |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                      | ✅ Dirilis |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                 | ✅ Dirilis |
| Fase 4  | Output Styles, SLM-tier Ultra, harness evaluasi                                                                                                  | ✅ Dirilis |
| Fase 4C | Anggaran konteks adaptif ("dial") — mesin komputasi + API (`contextBudget` pada `PUT /api/settings/compression`) + kontrol mode/kebijakan dasbor | ✅ Dirilis |

---

## Ucapan Terima Kasih

Aturan kompresi mode Standard terinspirasi oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** karya **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — proyek viral "mengapa menggunakan banyak token ketika sedikit token sudah cukup". Caveman melaporkan token output `~75%` lebih sedikit, penghematan output rata-rata tolok ukur sebesar `65%`, rentang output `22-87%`, dan alat kompresi input sebesar `~46%`.

Mode RTK terinspirasi oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** karya **[RTK AI](https://github.com/rtk-ai)** — proyek kompresi output perintah berkinerja tinggi untuk pemfilteran output terminal, build, pengujian, git, dan alat. RTK melaporkan penghematan sebesar `60-90%`, dengan contoh sesi dalam README-nya menunjukkan penghematan `~80%`.

---

## Sistem Kompresi Tingkat Lanjut

Di luar 7 mode yang dijelaskan di atas (sumber juga menerima mode `codex-responses` dan `omniglyph`, yang tidak tercakup dalam panduan ini), bagian di bawah mencakup fitur yang bekerja di dalam atau di samping mode tersebut: Kompresi Hasil Alat dan Penuaan Progresif adalah langkah 1 dan 2 dari mesin agresif (Mode agresif dan langkah `aggressive` dari pipeline bertumpuk), Stacked Pipeline adalah cara mode Stacked berjalan, Kompresi Sadar Cache menurunkan `aggressive` dan `ultra` ke `standard` untuk penyedia cache sementara kompresi aktif, dan Mode Output Caveman serta Gaya Output adalah instruksi prompt sistem yang disertakan, dinonaktifkan secara default, yang membentuk output model alih-alih mengompresi permintaan.

### Kompresi Sadar Cache

Beberapa penyedia (seperti Anthropic dengan caching cepat) mendukung** cache yang cepat** , yang memungkinkan mereka melakukan cache bagian dari perintah untuk mengurangi biaya dan latensi. Saat caching diaktifkan, kompresi agresif sebenarnya bisa** terluka** kinerja karena mengubah token yang disimpan dalam cache, membuat cache menjadi tidak valid.

Modul `cachingAware.ts` memecahkan masalah ini dengan** mendeteksi konteks cache** Dan** menyesuaikan strategi kompresi** demikian.

#### Bagaimana cara kerjanya

1. **Deteksi konteks cache** — Memindai isi permintaan untuk penanda `cache_control`
2. **Identifikasi penyedia cache** — Memeriksa apakah penyedia target mendukung caching
3. **Sesuaikan strategi** — Menurunkan versi `aggressive`/`ultra` ke `standard` untuk penyedia caching
4. **Lewati perintah sistem** — Perintah sistem biasanya di-cache, jadi jangan dikompres

Pembantu strategi juga mengembalikan tanda `deterministicOnly`, namun pembuat rencana hanya menggunakan strategi — tidak ada apa pun di hilir yang membaca tanda tersebut hari ini.

#### Contoh kode

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kapan harus digunakan

Kompresi sadar cache adalah** selalu menyala** — tidak diperlukan konfigurasi. Ini dimulai setiap kali kompresi aktif dan penyedia target mendukung cache cepat (Anthropic, OpenAI, dll.); penanda `cache_control` yang eksplisit tidak diperlukan — penyedia caching saja yang memicu penurunan versi, dan penanda saja tidak akan pernah melakukannya (deteksi penanda memberi umpan pada telemetri cache, bukan keputusan strategi).

OpenRouter dihitung sebagai penyedia cache hanya untuk model `anthropic/*` : Claude Permintaan kode mempertahankan titik henti sementara `cache_control` mereka (paling banyak 4) dan penjaga melindungi awalan, sementara setiap keluarga OpenRouter lainnya (`openai/`, `google/`, `qwen/`, …) tetap dilucuti dan tidak dijaga.

### Penuaan Progresif

Percakapan panjang mengumpulkan banyak pesan, namun percakapan lama menjadi kurang relevan. Modul `progressiveAging.ts`** mendegradasi pesan berdasarkan jarak giliran** (jarak diukur dari akhir percakapan). Dengan default yang dikirimkan (`verbatim: 2, light: 2, moderate: 3`):

- **2 putaran terakhir (jarak ≤ 2)** : Disimpan kata demi kata
- **Jarak 3** : Kompresi manusia gua (penghapusan pengisi)
- **Jarak 4 +** : Pesan Asisten diringkas; pesan pengguna dikurangi menjadi baris pertama, dibatasi hingga 120 karakter; peran lain tidak tersentuh. Perintah sistem, pesan lama, dan pesan pengguna terbaru selalu disimpan kata demi kata tanpa memandang jarak. Tidak ada yang langsung dihapus, dan pita `light` tidak dapat dijangkau dengan default yang dikirimkan (`light` sama dengan `verbatim`).

#### Contoh kode

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Kapan harus digunakan

Penuaan progresif adalah** selalu menyala** untuk mode `aggressive` — itu adalah langkah 2 dari `compressAggressive()`. Mode ultra tidak menjalankannya. Ini sangat efektif untuk:

- Sesi pengkodean yang berjalan lama
- Percakapan beberapa hari
- Alur kerja agen dengan banyak panggilan alat

### Mode Keluaran Manusia Gua

Mode keluaran manusia gua menambahkan** instruksi cepat sistem** yang menanyakan model itu sendiri untuk keluaran singkat — tingkat `lite` meminta jawaban ringkas yang berisi kalimat lengkap, `full` memintanya untuk "merespons singkat seperti manusia gua yang cerdas", dan `ultra` meminta keluaran telegraf; instruksi hanya meminta, mereka tidak dapat menjaminnya. Permintaan menerimanya melalui `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` pertama-tama menyelesaikan pilihan dengan shim back-compat (`resolveOutputStyleSelection()` di `open-sse/services/compression/outputStyles/backCompat.ts`), yang, meskipun `outputStyles` kosong, memetakan `cavemanOutputMode` yang diaktifkan ke gaya keluaran `terse-prose` di `cavemanOutputMode.intensity` (lihat Back-compat di bawah); pilihan `outputStyles` yang tidak kosong digunakan sebagaimana adanya, dan `cavemanOutputMode.enabled` serta `intensity` tidak berpengaruh, sementara tombol `autoClarity` -nya masih berlaku. `outputMode.ts` menyimpan teks instruksi (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), bypass konten dan pembantu penempatan yang digunakan injeksi; injektor `applyCavemanOutputMode()` sendiri tidak memiliki pemanggil produksi.

#### Bagaimana cara kerjanya

Mode ini tidak memampatkan input. Ia menambahkan blok instruksi ke prompt sistem (lihat Cara kerja injeksi di bawah), dan mode kompresi input apa pun yang dipilih untuk permintaan masih berjalan setelahnya, pada badan yang sekarang membawa blok tersebut. Di depan klausa batas bersama yang diakhiri dengan setiap level, level `full` bahasa Inggris berbunyi:

> "Respon singkat seperti manusia gua yang pintar. Jatuhkan artikel (a/an/the), pengisi (just/really/basically/actually/simply), basa-basi, lindung nilai. Fragmen OK. Sinonim pendek (besar tidak ekstensif, perbaiki tidak diterapkan). Jaga semua substansi teknis, kode, kesalahan, URLs, pengidentifikasi tepat."

Ini bekerja sangat baik untuk:

- Pembuatan kode (keluaran terser = token lebih sedikit)
- Tanya Jawab Cepat (tidak perlu penjelasan panjang lebar)
- Pemrosesan batch (memaksimalkan throughput)

#### Kapan harus digunakan

Mode keluaran manusia gua adalah** ikut serta** . Dengan kompresi aktif (`enabled: true`, tombol utama di halaman Pengaturan Kompresi), aktifkan dengan `cavemanOutputMode.enabled`; `intensity` memilih `lite`, `full` atau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kombo kompresi** Modus Keluaran** toggle (`outputMode`, level dalam `outputModeIntensity`) menyetel sakelar yang sama untuk permintaan yang menerapkan kombo, dan alat `omniroute_set_compression_engine` MCP menuliskannya melalui argumen boolean `outputMode`. Pilihan `outputStyles` yang tidak kosong lebih diutamakan daripada peralihan ini. Di dasbor, aktifkan** Prosa singkat** gaya keluaran menyuntikkan blok yang sama (lihat Gaya Keluaran di bawah).

### Gaya Output (katalog)

Mode keluaran manusia gua di atas adalah** jalur gaya tunggal warisan** . Fase 4 menggeneralisasikannya ke dalam katalog gaya keluaran yang dapat dikomposisi: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya adalah instruksi cepat sistem yang meminta model itu sendiri untuk menghasilkan keluaran yang lebih murah; gaya dapat diaktifkan bersama-sama dan dimasukkan dalam urutan katalog.

| Gaya                                     | `id`            | Apa fungsinya                                                                                                                                                                                                                                         | Bahasa instruksi                              |
| ---------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa singkat                            | `terse-prose`   | Jatuhkan filler/articles/hedging; menjaga substansi teknis tetap tepat. Teks yang sama dengan mode keluaran manusia gua lama (direferensikan, tidak diketik ulang).                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Lebih sedikit kode                       | `less-code`     | tangga YAGNI : perubahan kerja terkecil, tidak ada abstraksi yang tidak diminta.                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ekor kuda (pengembang senior yang malas) | `ponytail`      | "Kode terbaik adalah kode yang tidak pernah ditulis": gunakan kembali penulisan ulang >, akar penyebab gejala >, perbedaan kerja terpendek.                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Saya punya ADHD (aksi pertama)           | `i-have-adhd`   | Tindakan pertama (command/path/snippet sebelum prosa), langkah berbatas bernomor, ONE langkah selanjutnya yang konkrit, tanpa preamble/recap/closers. Diadaptasi dari [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filter antislop UI                       | `antislop-ui`   | Setiap teknik visual harus lulus uji tujuan (hierarki, identitas, keterbacaan); tidak ada gradients/glass/glow default, palet terbatas, tidak ada tata letak templat. Kedua gaya antislop menambahkan batas tanpa kontrol mati/klaim tanpa pabrikasi. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Salinan antislop dan filter manusia      | `antislop-copy` | Salinan spesifik (tanpa tanda hubung em, CTAs umum, kata kunci, penutup chatbot, fakta yang ditemukan) ditambah aturan orang: kontras WCAG AA, fokus terlihat, jangkauan keyboard, status empty/loading/error, perubahan posisi seluler.              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                         | `terse-cjk`     | jawaban `full`/`ultra` dalam bahasa Cina Klasik (文言); `lite` hanya meminta jawaban singkat tanpa kata-kata fungsi, basa-basi atau hiasan.                                                                                                           | zh (berpagar lokal, lihat di bawah)           |

Setiap gaya mengirimkan tiga tingkat intensitas — `lite`, `full`, `ultra` — dan setiap level diakhiri dengan klausa batas bersama (`SHARED_BOUNDARIES` dalam `outputMode.ts`), yang menjaga blok kode, jalur file, perintah, kesalahan, dan URLs tetap tepat. Teks tingkat `terse-prose` dan `terse-cjk` menambahkan pengidentifikasi ke daftar itu.

`terse-cjk` memiliki gerbang lokal ke `zh` di dua tempat. Halaman Pengaturan Kompresi mencantumkan barisnya hanya jika bahasa UI dasbor adalah bahasa China (`zh-CN` atau `zh-TW`), dan `applyOutputStyles()` memasukkannya hanya jika bahasa permintaan yang diselesaikan (lihat Pilihan bahasa di bawah) adalah `zh`. Menyembunyikan baris tidak menghapus pilihan `terse-cjk` yang disimpan: pengaturan API menerima id gaya apa pun, dan menyimpan gaya lain di halaman akan menyimpannya. Pada waktu permintaan, pemeriksaan bahasa `applyOutputStyles()` adalah satu-satunya gerbang lokal.

#### Cara kerja injeksi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) menyelesaikan pemilihan terhadap katalog (id yang tidak dikenal dan gaya yang tidak cocok dengan lokal dihilangkan, tidak pernah terjadi kesalahan; pilihan yang memutuskan tidak ada gaya membuat isi tidak berubah, dilewati sebagai `no_styles`), menggabungkan instruksi yang dipilih dalam urutan katalog, menambahkan klausa batas** sekali** (ditambah klausa keselamatan, `SAFETY_BOUNDARIES` atau terjemahannya, ketika `less-code` atau `ponytail` dipilih), dan memulai blok dengan penanda idempotensi tunggal (`[OmniRoute Output Styles]`), jadi mengajukan permohonan kembali adalah hal yang dilarang. Ketika bahasa yang diselesaikan (lihat Pilihan bahasa di bawah) memiliki terjemahan, instruksi yang dilokalkan akan dimasukkan, bukan bahasa Inggris.

Pada isi dengan larik `messages` yang tidak kosong, pemeriksaan idempotensi dijalankan sebelum bypass konten: ketika penanda `[OmniRoute Output Styles]` sudah berada di bidang `system` tingkat atas (string atau larik blok konten) atau dalam pesan sistem dengan konten string, isi dibiarkan tidak berubah sebagai `already_applied` dan tidak ada pemeriksaan kata kunci yang dijalankan. Jika tidak, bypass konten (`shouldBypassCavemanOutputMode()` dalam `open-sse/services/compression/outputMode.ts`) akan memeriksa teks dari tiga pesan terakhir, apa pun perannya, dan melewatkan gaya untuk keseluruhan giliran ketika teks tersebut cocok dengan kata kunci keamanan, tindakan yang tidak dapat diubah atau klarifikasi, atau urutan yang peka terhadap urutan: `first`, `then`, `after that`, `before`, `rollback` atau `backup` diikuti dalam 240 karakter oleh `delete`, `drop`, `migrate`, `deploy` atau `release`. Bypass berjalan sementara** Bypass Kejelasan Otomatis** tombol (`cavemanOutputMode.autoClarity`, aktif secara default) aktif; mematikan tombol akan melewatkan pemeriksaan kata kunci.

Ketika bypass memungkinkan pergantian, `placeSystemInstruction()` (file yang sama), yang tidak pernah membuat `messages[0]` baru, menempatkan blok di blok pertama yang ditemukannya:

1. Pesan sistem utama dengan konten string: blok ditambahkan setelah teksnya.
2. Bidang `system` tingkat atas: blok ditambahkan setelah teks string, atau ditambahkan sebagai blok teks baru ke array blok konten.
3. Pesan sistem pertama yang kemudian dengan konten string: blok ditambahkan setelah teksnya.
4. Tak satu pun dari yang di atas: blok masuk ke pesan sistem baru di akhir `messages`.

Pada isi tanpa array `messages` (atau dengan array kosong), tidak ada bypass konten yang dijalankan dan bidang `system` tingkat atas tidak dikonsultasikan. Blok ditambahkan setelah teks bidang string `instructions`, kecuali bidang tersebut sudah berisi penanda `[OmniRoute Output Styles]`, dalam hal ini isi tidak diubah sebagai `already_applied`. Ketika isi tidak memiliki bidang string `instructions` tetapi membawa `input` (string atau array), blok menjadi `instructions`, menggantikan nilai non-string apa pun yang dimiliki bidang tersebut. Isi yang tidak memiliki bidang string `instructions` maupun string atau array `input` tidak diubah dan dilewati sebagai `no_messages`.

#### Cara mengaktifkan

Di dasbor:** Konteks Kompresi → Pengaturan Kompresi** (`/dashboard/context/settings`), Bagian gaya keluaran: satu baris per gaya dengan sakelar on/off dan pemilih level. Gaya disuntikkan saat kompresi itu sendiri aktif (pengalih utama halaman, `enabled`). Itu** Bypass Kejelasan Otomatis** tombol aktif** Manusia Gua** halaman (`/dashboard/context/caveman`), di dalamnya** Modus Keluaran** kartu. Secara terprogram, konfigurasi kompresi tetap memilih sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilitas kembali: saat `outputStyles` kosong, pengaturan `cavemanOutputMode.enabled` lama dipetakan ke `terse-prose` di `cavemanOutputMode.intensity`. Blok kemudian dimulai dengan penanda `[OmniRoute Output Styles]`, tempat injektor `applyCavemanOutputMode()` lama menulis `[OmniRoute Caveman Output Mode]`. Di bawah penanda, teks cocok dengan injeksi lama di en, pt-BR, es, de, fr, it, ru, id dan vi; di ja dan zh ia membawa satu spasi tambahan sebelum klausa batas. `terse-prose` diterjemahkan menjadi pt-BR, es, de, fr, it, ru, zh, ja, id dan vi, jadi permintaan yang bahasa penyelesaiannya adalah `hu` mendapatkan teks bahasa Inggris di mana injektor lama menggunakan bahasa Hongaria.

Pemilihan bahasa gaya keluaran (`resolveOutputStyleLanguage()` dalam `outputStyles/apply.ts`): dengan `languageConfig.enabled` aktif, `autoDetect` mengambil sampel pesan pengguna terbaru dalam larik `messages` permintaan yang memiliki teks (konten string, atau `text` bagian kontennya) dan menjalankan detektor mesin Caveman (`detectCompressionLanguage()`) di atasnya. Detektor mengembalikan `zh` untuk teks dengan karakter Han dan tanpa kana; jika tidak, ia mengembalikan mana saja dari `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` dan `id` yang memiliki petunjuk paling banyak yang cocok, dan `en` ketika tidak ada yang cocok dengan teks — maka ia tidak dapat mengklasifikasikan mendapat bahasa Inggris, tidak pernah `defaultLanguage`, dan `vi` tidak pernah terdeteksi meskipun gaya mengirimkan teks `vi`. Tubuh Responses API terus bergantian `input`, yang tidak dijadikan sampel, sehingga mendapat `defaultLanguage`, lalu bahasa Inggris. Jika tidak ada pesan pengguna di `messages` yang berisi teks, atau `autoDetect` nonaktif, `defaultLanguage` berlaku, lalu bahasa Inggris. Dengan `languageConfig.enabled` nonaktif, bahasanya adalah bahasa Inggris — kecuali kombo kompresi berlaku pada permintaan (kombo ditetapkan ke kombo perutean permintaan, atau kombo kompresi default chatCore akan digunakan kembali untuk pipeline bertumpuk bawaan): menerapkan kombo akan mengaktifkan `languageConfig.enabled` untuk permintaan tersebut dan menetapkan `defaultLanguage` dari paket bahasa kombo (nilai yang disimpan jika itu adalah salah satu paket kombo, jika tidak, paket pertama kombo, yang defaultnya adalah `en`), sedangkan yang disimpan `autoDetect` (diaktifkan secara default) masih berlaku. Mesin input Caveman memilih bahasa paket aturannya secara berbeda — per bagian teks dan, dengan deteksi otomatis nonaktif, diaktifkan `enabledPacks`.

Matriks bahasa gaya × disematkan oleh `tests/unit/compression/output-styles-i18n-matrix.test.ts`: setiap gaya katalog memerlukan entri dalam `BASELINE_LANGUAGES` pengujian; gaya yang tidak memiliki gerbang lokal harus mengirimkan terjemahan pt-BR ( `terse-cjk` dengan gerbang lokal dikecualikan dari aturan ini) kecuali jika tercantum dalam `KNOWN_ENGLISH_ONLY`, yang hanya dapat menampung gaya tanpa terjemahan sama sekali — gaya terdaftar yang terjemahannya gagal dalam pengujian; dan sebuah gaya gagal dalam pengujian ketika ia kehilangan bahasa yang dicantumkan dalam daftar entri `BASELINE_LANGUAGES`. Untuk menambahkan gaya, lihat [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresi Hasil Alat

`compressToolResult()` di `open-sse/services/compression/toolResultCompressor.ts` mengompresi teks hasil alat dengan** 5 strategi** . Ia mencobanya dalam urutan ini, dan strategi pertama yang diaktifkan yang pemeriksaannya cocok dengan konten akan menentukan hasilnya:

1. **`fileContent`** : isi dari 3 baris atau lebih yang setidaknya satu barisnya, mengabaikan lekukan di depan, dimulai dengan `import `, `export `, `function `, `class `, `const `, `let `, `var ` atau `return ` (kata kunci ditambah spasi), atau dengan `if`, `for` atau `while` diikuti oleh `(` atau ` (`, mempertahankan 20 baris pertama dan 5 baris terakhir, dengan tanda tengah yang dihilangkan.
2. **`grepSearch`** : konten dengan setidaknya satu baris berbentuk `<path>:<digits>:`, dengan teks sebelum titik dua pertama tidak memiliki spasi, hanya menyimpan baris tersebut, paling banyak 30, diikuti dengan hitungan kecocokan lebih lanjut dan daftar file yang cocok; setiap baris lainnya dibatalkan. Satu baris tersebut cukup untuk memicu strategi, sehingga baris log yang dimulai dengan stempel waktu seperti `12:30:45` juga diperhitungkan.
3. **`shellOutput`** : keluaran yang berisi urutan ANSI CSI (`ESC[` lalu angka atau titik koma lalu huruf, seperti dalam kode warna) atau `$` yang diikuti dengan spasi di mana pun dalam teks akan kehilangan urutan tersebut (pelarian lainnya, seperti `ESC[?25l` atau urutan judul jendela OSC, dipertahankan) dan mempertahankan 50 baris terakhirnya, dengan baris berulang yang berurutan diciutkan. Karena pemeriksaan ini dijalankan sebelum `json` dan `errorMessage`, JSON atau output kesalahan yang berisi `$` tidak pernah mencapainya saat `shellOutput` aktif.
4. **`json`** : payload JSON lebih dari 2.000 karakter yang dimulai dengan `{` atau `[` (setelah spasi opsional) dan parsing diringkas: array yang terdiri lebih dari 7 item menyimpan 5 item pertama dan 2 item terakhir serta jumlah totalnya, dan sebuah objek menyimpan 20 kunci pertamanya, dengan setiap objek bertumpuk atau nilai array diganti dengan placeholder `{…N keys}` (untuk array, N adalah panjangnya) dan penanda `_remaining_<N>_keys` menghitung kunci yang dijatuhkan melewati 20 kunci pertama. Skalar nilai-nilai disalin secara keseluruhan, sehingga objek dengan 20 kunci atau kurang tanpa nilai-nilai yang disarangkan hanya akan diindentasi ulang — objek yang diperkecil akan mendapatkan karakter dan tetap tidak berubah.
5. **`errorMessage`** : keluaran yang berisi, di mana saja dan dalam huruf apa pun, `error:`, `error ` (kata yang diikuti spasi, seperti dalam `no error found`), `[error]`, `exception:`, `exception `, `[exception]` atau `traceback` mempertahankan baris pertama, 10 baris berikutnya, dan 3 baris terakhir, dengan penanda `… [N frames elided] …` sebagai pengganti garis di antaranya. Penanda hanya muncul ketika lebih dari 13 baris mengikuti baris pertama, sehingga keluaran kesalahan 14 baris atau kurang tidak dipersingkat (pada 12 atau 13 baris, 3 baris berulang terakhir sudah disimpan).

Setelah suatu strategi cocok, bahkan strategi yang tidak menyimpan apa pun, strategi selanjutnya tidak dicoba. Ketika strategi pencocokan tidak menyimpan token yang diperkirakan (panjang ÷ 4, dibulatkan ke atas) — misalnya file seperti kode yang terdiri dari 25 baris atau kurang, atau larik JSON lebih dari 2.000 karakter dengan 7 item atau kurang — mesin agresif mempertahankan hasil alat asli: kedua pemanggil (`compressAggressive()` dan `compressAnthropicToolResultBlock()`) menyimpan yang asli ketika `saved` bernilai 0 atau lebih rendah, sementara `compressToolResult()` sendiri masih mengembalikan keluaran strategi tersebut. Langkah hasil alat bukanlah kata terakhir: peringkas cadangan mesin masih dapat mempersingkat pesan `tool` atau `function` yang panjangnya lebih dari 8.192 karakter (`maxTokensPerMessage`, 2.048, kali 4).

#### Kapan harus digunakan

Kompresi hasil alat adalah langkah 1 dari mesin agresif (`compressAggressive()` di `open-sse/services/compression/aggressive.ts`), sehingga berjalan dalam mode Agresif dan dalam langkah `aggressive` dari pipa bertumpuk. Ini memampatkan pesan `tool` dan `function` berbentuk OpenAI dan teks di dalam blok Anthropic `tool_result`. Setiap strategi memiliki tombolnya sendiri di bawah `aggressive.toolStrategies`, semuanya aktif secara default. Di dasbor, sakelar ada di halaman Caveman** Canggih** lihat saat kompresi aktif dan mode default adalah Agresif.

### Pipa Bertumpuk

Mode bertumpuk berjalan** beberapa mesin secara berurutan** — biasanya RTK terlebih dahulu (penghematan 60-90% pada keluaran alat), kemudian Caveman pada teks yang tersisa (~ 46% penghematan masukan). Terdiri, itulah** 78-95% rentang yang memenuhi syarat** (lihat Matematika Penghematan Hulu di atas): rata-rata `1 - (1 - 0.60..0.90) × (1 - 0.46)` ≈ 89%.

#### Bagaimana cara kerjanya

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kapan harus digunakan

Gunakan mode bertumpuk untuk:

- Alur kerja yang banyak alat (pengkodean agen, penelitian)
- Pemrosesan batch yang sensitif terhadap biaya
- Saat Anda membutuhkan penghematan token maksimal

Alur bertumpuk dikonfigurasikan melalui pengaturan kompresi `stackedPipeline` global, atau melalui kombo kompresi bernama yang ditetapkan ke kombo perutean (lihat Per-Combo Override di atas) — bukan melalui kombo otomatis `modePack` (bidang tersebut hanya memberi bobot ulang pada pemilihan model kombo otomatis, dan `stacked` bukan nama paket yang valid).

---

## Penggantian Kombinasi Kompresi

Anda dapat mengganti mode kompresi global **per kombinasi** untuk menyempurnakan perilaku
bagi berbagai kasus penggunaan:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Ini berguna untuk:

- **Kombinasi pengodean**: Gunakan mode `aggressive` untuk sesi panjang
- **Kombinasi tanya jawab cepat**: Gunakan mode `lite` untuk respons cepat
- **Kombinasi dengan penggunaan alat intensif**: Gunakan mode `stacked` untuk penghematan maksimal
- **Kombinasi produksi**: biarkan penggantian dinonaktifkan untuk penyedia caching — penyesuaian
  yang selalu aktif dan sadar-cache menurunkan `aggressive`/`ultra` menjadi `standard` secara otomatis
  (tidak ada mode `cache-aware` yang dapat dipilih)

---

## Lihat Juga

- [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Variabel lingkungan kompresi
- [Panduan Arsitektur](../architecture/ARCHITECTURE.md) — Bagian internal pipeline kompresi
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Memulai penggunaan kompresi
- [Kompresi RTK](./RTK_COMPRESSION.md) — Filter RTK, model kepercayaan, gerbang verifikasi, pemulihan output mentah
- [Mesin Kompresi](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, dasbor
- [Format Aturan Kompresi](./COMPRESSION_RULES_FORMAT.md) — Format paket aturan JSON
- [Paket Bahasa Kompresi](./COMPRESSION_LANGUAGE_PACKS.md) — Aturan Caveman khusus bahasa
