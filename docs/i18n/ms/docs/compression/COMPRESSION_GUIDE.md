# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Jimat 15-95% pada konteks yang layak secara automatik. Untuk gambaran keseluruhan ringkas, lihat [bahagian Pemampatan README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Gambaran Keseluruhan

OmniRoute melaksanakan saluran paip pemampatan gesaan modular yang berjalan **secara proaktif** sebelum permintaan sampai kepada penyedia huluan. Ini bermakna penjimatan token anda berlaku secara telus — tiada perubahan diperlukan pada aliran kerja anda.

```
Permintaan Klien
  → Pemilih Strategi Pemampatan
    → Penggantian kombo? → Gunakan tetapan kombo
    → Ambang pencetus automatik? → Gunakan mod automatik
    → Mod lalai? → Gunakan tetapan global
    → Dimatikan? → Langkau pemampatan
  → Mod Pemampatan yang Dipilih
    → Dimatikan: Tiada pemampatan
    → Ringan: Pembersihan ruang kosong/pemformatan yang selamat (~15%)
    → Standard: Penyingkiran kata pengisi gaya manusia gua (~30%)
    → Agresif: Penuaan sejarah + peringkasan (~50%)
    → Ultra: Pemangkasan heuristik + penipisan blok kod (~75%)
    → RTK: Penapisan output terminal/alat yang peka terhadap perintah (julat huluan 60-90%)
    → Bertindan: Saluran paip berbilang enjin yang tersusun, biasanya RTK kemudian Caveman (julat layak 78-95%)
  → Permintaan Dimampatkan → Penyedia
```

---

## Mod Pemampatan

### Dimatikan

Tiada pemampatan digunakan. Semua mesej dihantar tanpa perubahan.

### Mod Lite (~15% penjimatan, kependaman <1ms)

Mod paling selamat — pembersihan pemformatan. Pemendekan hasil alatnya bersifat kehilangan data, jadi laluan lalai
(tanpa `allow-lossy`, `engine:lite` atau pilihan masuk kombi bernama) menjalankan Lite dengan
`compressToolResults: false`: hasil alat terdahulu sampai kepada penyedia tanpa perubahan.

| Teknik                   | Penerangan                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Menggabungkan baris kosong berturutan dan ruang di hujung                                                 |
| `dedupSystemPrompt`      | Mengalih keluar mesej sistem pendua                                                                       |
| `compressToolResults`    | Memendekkan hasil alat terdahulu kepada had Lite (kehilangan data: hanya dengan pilihan masuk permintaan) |
| `removeRedundantContent` | Menanggalkan arahan berulang                                                                              |
| `replaceImageUrls`       | Memendekkan URI data imej base64                                                                          |

**Terbaik untuk:** Penggunaan sentiasa aktif, aliran kerja kritikal keselamatan.

### Mod Standard (~30% penjimatan)

Diilhamkan oleh [Caveman](https://github.com/JuliusBrussee/caveman) — mengalih keluar kata pengisi dan frasa berlebihan sambil mengekalkan maksud:

- Mengalih keluar kata pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa berlebihan ("in order to" → "to", "as a result of" → "because")
- Menanggalkan ungkapan berlapik yang sopan ("Would you mind...", "If you could possibly...")
- Lebih daripada 30 peraturan regex yang ditala untuk gesaan pengekodan

**Terbaik untuk:** Aliran kerja pengekodan harian, pasukan yang peka terhadap kos.

### Mod Agresif (~50% penjimatan)

Pengurusan sejarah pintar untuk sesi yang panjang:

- **Penuaan Mesej** — mesej lama dimampatkan secara beransur-ansur
- **Pemampatan Hasil Alat** — output alat yang panjang dipendekkan atau disembunyikan (baris pertama/terakhir,
  penapisan baris padanan, pemadatan kunci JSON)
- **Pengawal Integriti Struktur** — memastikan pasangan `tool_use` + `tool_result` kekal konsisten
- **Kesedaran Tetingkap Konteks** — mematuhi had token bagi setiap model

**Terbaik untuk:** Sesi penyahpepijatan lanjutan, pangkalan kod besar.

### Mod Ultra (~75% penjimatan)

Pemampatan maksimum untuk senario yang kritikal terhadap token:

- **Pemangkasan Heuristik** — pemangkasan token berasaskan skor pada prosa
- **Pengekalan Struktur** — blok kod berpagar, kod sebaris, URL dan pengecam
  ditanda dan dicantum semula secara verbatim, tidak pernah dipangkas
- **Peringkat SLM Pilihan** — model tempatan kecil boleh memperhalus pemangkasan apabila dikonfigurasikan
- Tidak bergantung pada mod Agresif: ia tidak menjalankan penuaan mesej, pemampatan hasil alat
  atau peringkas sandaran (hanya kegagalan peringkat SLM boleh menghala pemprosesan sandaran melalui
  agresif)

**Terbaik untuk:** Apabila anda berulang kali menghadapi had konteks.

### Mod RTK (julat huluan 60-90%)

Mod RTK dioptimumkan untuk output alat yang berlebihan yang muncul dalam sesi ejen pengekodan:

- Mengesan kelas perintah/output seperti `git status`, `git diff`, `git log`, pelaksana ujian,
  binaan TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/pemasangan npm, log Docker, output infrastruktur
  dan output shell generik
- Menggunakan pek penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- Mengimport penapis skema TOML RTK v1 daripada fail `filters.toml` projek atau global, dengan pengesahan
  ujian sebaris dan kawalan kepercayaan untuk fail projek
- Menyertakan 56 penapis terbina dalam dengan sampel pengesahan sebaris
- Mengalih keluar jujukan kawalan ANSI, bar kemajuan, baris berulang dan hingar yang tidak boleh diambil tindakan
- Mengekalkan kegagalan, ralat, amaran, fail yang berubah, ringkasan dan penghujung output yang panjang
- Menyokong penapis projek berkawal kepercayaan, penapis global dan pemulihan output mentah yang disunting secara pilihan

**Terbaik untuk:** Sesi ejen dengan transkrip shell, binaan, ujian, git, grep dan output fail.

### Mod Bertindan (julat layak 78-95%)

Mod Bertindan menjalankan berbilang enjin pemampatan dalam susunan yang deterministik. Saluran paip lalai ialah:

```txt
RTK -> Caveman
```

Susunan ini memastikan output terminal/alat dipadatkan dahulu, kemudian pemeluwapan semantik Caveman digunakan pada
gesaan bahasa semula jadi yang selebihnya. Saluran paip bertindan boleh dikonfigurasikan secara global atau melalui
kombi pemampatan yang ditetapkan kepada kombi penghalaan.

**Terbaik untuk:** Konteks bercampur dengan log alat yang besar serta arahan manusia atau ringkasan pembantu.

## Matematik Penjimatan Upstream

OmniRoute mendokumenkan penjimatan pemampatan daripada dua sumber: penanda aras projek upstream dan
komposisi enjin OmniRoute sendiri.

| Sumber  | Angka README upstream yang digunakan di sini                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` kurang token output, purata penjimatan output penanda aras sebanyak `65%`, julat `22-87%`, dan alat pemampatan input `~46%` |
| RTK     | Penjimatan output perintah sebanyak `60-90%`; sesi contoh `~118,000 -> ~23,900` token, atau penjimatan `79.7%` (`~80%`)            |

Untuk muatan alat/konteks yang bertindih, gabungan lalai OmniRoute menyusun enjin seperti berikut:

```txt
RTK -> Caveman
```

Penjimatan gabungan adalah secara daraban, bukan penambahan:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Angka `78-95%` itu terpakai apabila kedua-dua RTK dan Caveman boleh mengurangkan muatan input/konteks yang sama.
Mod output respons Caveman adalah berasingan: apabila didayakan, gunakan penjimatan output Caveman sendiri (purata `65%`,
angka utama `~75%`, julat `22-87%`). Jumlah penjimatan pengebilan bergantung pada campuran gesaan/output anda.

### Maksud sebenar "layak"

Julat utama 15-95% adalah benar, tetapi ia hanya terpakai pada kandungan **berlebihan atau berjela-jela** — baris
ralat berulang, log binaan yang membanjiri output dengan amaran yang sama, lambakan `grep`/bacaan fail yang terlalu besar. Ia
**tidak** bermaksud setiap permintaan menjimatkan sebanyak itu.

Disahkan secara empirikal (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): pelaksanaan
`stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang mengandungi 300 baris
ralat yang sama menghasilkan **penjimatan token sebanyak 95.93% / penjimatan aksara sebanyak 96.26%** — tepat dalam julat yang
diiklankan. Namun, saluran paip yang sama apabila dijalankan terhadap output alat yang normal dan tidak berlebihan (senarai padanan `grep` yang bersih,
bacaan fail yang pendek, teks perbualan biasa) sewajarnya menghasilkan **penjimatan hampir sifar**, kerana
tiada kandungan berulang untuk dibuang dan `validateCompression()` (`validation.ts`) enggan menghantar
penulisan semula yang akan menggugurkan atau mengubah blok kod, URL, tajuk, versi, atau pengecam pemalar HURUF BESAR SEPENUHNYA.

Ini ialah tingkah laku selamat yang dijangkakan, bukannya pepijat: sesi pengekodan yang kebanyakannya membaca/menggunakan grep pada fail bersih akan
mencatatkan jumlah penjimatan yang sederhana walaupun pemampatan didayakan sepenuhnya, manakala sesi yang mengalami
gelung kegagalan atau linter yang banyak mengeluarkan mesej akan mencatatkan julat penuh 78-95% bagi trafik tersebut. Jangan gunakan
peratusan penjimatan agregat yang rendah daripada satu sesi sebagai bukti bahawa pemampatan tersalah konfigurasi — semak dahulu sama ada
output alat yang mendasarinya benar-benar berlebihan.

---

## Visualisasi Penjimatan Token

```
Tanpa pemampatan:    47K token dihantar kepada LLM
Dengan Lite:         40K token dihantar          (15% dijimatkan — selamat, sentiasa aktif)
Dengan Standard:     33K token dihantar          (30% dijimatkan — peraturan caveman-speak)
Dengan Aggressive:   24K token dihantar          (50% dijimatkan — penuaan + peringkasan)
Dengan Ultra:        12K token dihantar          (75% dijimatkan — pemangkasan heuristik)
Dengan RTK:          19K-5K token dihantar       (60-90% dijimatkan pada output perintah/alat)
Dengan Stacked:      10K-2.5K token dihantar     (julat RTK+Caveman layak sebanyak 78-95%)
```

---

## Konfigurasi

### Papan Pemuka

Navigasi ke `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mod, pek bahasa, pratonton dan lalai global
- **RTK** — pratonton penapis perintah, tetapan keselamatan RTK dan katalog penapis
- **Compression Combos** — saluran paip enjin bernama yang ditetapkan kepada kombo penghalaan
- **Auto-Trigger Threshold** — aktifkan pemampatan secara automatik apabila jumlah token melebihi ambang

### Penggantian Per-Combo

Dalam `Dashboard → Context & Cache → Compression Combos`, tetapkan kombo pemampatan kepada
kombo penghalaan:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ini membolehkan anda menggunakan pemampatan bertingkat pada pembekal percuma/pengekodan sambil
mengekalkan mod lite pada langganan berbayar.

Tugasan "Per-Combo Override" ini ialah kawalan yang berbeza daripada penggantian **routing-combo compression
mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — skema medan itu juga menerima
`rtk`, `stacked` dan `omniglyph`) — penggantian tersebut tidak memilih saluran paip
compression-combo yang bernama; sebaliknya, ia hanya menetapkan medan `compressionMode` yang
dirujuk oleh `resolveCompressionPlan`. Ia boleh ditetapkan sama ada pada kad kombo
(`Dashboard → Combos`) atau, sejak #6760, bagi setiap kombo penghalaan dalam senarai "Assign to routing" di
`Dashboard → Context & Cache → Compression Combos`, betul-betul di sebelah kotak pilihan penetapan saluran paip
yang didokumenkan di atas. Kedua-dua permukaan menyimpan data melalui titik akhir `PUT /api/combos/{id}` yang sama.

### Penggantian bagi setiap permintaan

Hantar pengepala permintaan `x-omniroute-compression` untuk menggantikan pelan pemampatan bagi satu
permintaan. Ia mempunyai keutamaan tertinggi — ia mengatasi penggantian kombo penghalaan, profil
aktif, pencetus automatik dan Default panel. Nilai yang tidak diketahui diabaikan (permintaan tidak
pernah ditolak) dan suis induk global masih mengawal segala-galanya: apabila pemampatan dimatikan
secara global, pengepala ini tidak boleh menghidupkannya. Nilai:

| Nilai         | Kesan                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tiada pemampatan untuk permintaan ini.                                                                                          |
| `default`     | Profil Default yang diperoleh daripada panel (mengabaikan profil aktif). Enjin lossy dibiarkan dimatikan.                       |
| `safe`        | Sama seperti tidak menyertakan pengepala.                                                                                       |
| `allow-lossy` | Kekalkan pelan operator permintaan ini, termasuk ringkasan, penapis perkaitan dan penulisan semula gaya.                        |
| `engine:<id>` | Satu enjin apabila didayakan, contohnya `engine:rtk`. Ini ialah pilihan ikut serta bagi setiap permintaan untuk enjin tersebut. |
| `<combo>`     | Kombo bernama, dipadankan mengikut nama (tidak peka huruf besar-kecil) terlebih dahulu, kemudian mengikut id.                   |

Tanpa `allow-lossy`, `engine:<id>` atau kombo bernama, enjin lossy tidak akan digunakan. Apabila
Default lossy, pencetus automatik atau penggantian penghalaan diturunkan taraf, OmniRoute
mengekalkan langkah lossless yang dikenali daripada saluran paip bertingkat yang dikonfigurasikan,
mengikut susunan yang dikonfigurasikan. Ia kembali kepada `session-dedup → lite` hanya apabila tiada
langkah lossless yang dikonfigurasikan kekal.

Pratonton **Effective pipeline** panel Settings memaparkan pelan biasa pada keadaan rehat. Apabila
pencetus automatik boleh dijalankan, pratonton yang sama turut memaparkan saluran paip berkesan
bersyaratnya supaya penyelesaian masa jalan panel dan tanpa pengepala kekal selaras.

Pelan yang digunakan dikembalikan dalam pengepala respons
`X-OmniRoute-Compression: <mode>; source=<source>`, dengan `<source>` ialah salah satu daripada
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` atau `off`.

### API

```bash
# Dapatkan tetapan pemampatan
curl http://localhost:20128/api/settings/compression

# Kemas kini tetapan pemampatan
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pratonton muatan RTK/stacked tertentu
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Senaraikan pek penapis RTK
curl http://localhost:20128/api/context/rtk/filters

# Uji RTK secara terus dengan metadata perintah pilihan
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Perkara yang Dilindungi

Enjin pemampatan **sentiasa mengekalkan:**

- ✅ Blok kod (berpagar dan sebaris)
- ✅ URL dan laluan fail
- ✅ Struktur JSON dan data berstruktur
- ✅ Pengecam dan token teknikal yang dilindungi
- ✅ Ungkapan matematik
- ✅ Takrif panggilan alat/fungsi
- ✅ Prom sistem (dalam mod lite)

Pemulihan output mentah RTK menyunting keluar kunci API lazim, token bearer, token Slack, kunci akses AWS,
kata laluan, token dan rahsia sebelum apa-apa disimpan.

---

## Statistik Pemampatan

Setiap permintaan yang dimampatkan menyertakan statistik dalam log pelayan:

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

## Pelan Hala Tuju Fasa

| Fasa    | Mod                                                                                                                                            | Status         |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Fasa 1  | Off, Lite                                                                                                                                      | ✅ Dilancarkan |
| Fasa 2  | Standard, Aggressive, Ultra                                                                                                                    | ✅ Dilancarkan |
| Fasa 3  | RTK, Stacked, Compression Combos                                                                                                               | ✅ Dilancarkan |
| Fasa 4  | Output Styles, SLM-tier Ultra, abah-abah penilaian                                                                                             | ✅ Dilancarkan |
| Fasa 4C | Bajet konteks adaptif ("dial") — enjin pengiraan + API (`contextBudget` pada `PUT /api/settings/compression`) + kawalan mod/dasar papan pemuka | ✅ Dilancarkan |

---

## Penghargaan

Peraturan pemampatan mod Standard diilhamkan oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** oleh **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — projek tular "mengapa guna banyak token apabila sedikit token sudah memadai". Caveman melaporkan `~75%` lebih sedikit token output, purata penjimatan output penanda aras sebanyak `65%`, julat output `22-87%` dan alat pemampatan input sebanyak `~46%`.

Mod RTK diilhamkan oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** oleh **[RTK AI](https://github.com/rtk-ai)** — projek pemampatan output perintah berprestasi tinggi untuk terminal, binaan, ujian, git dan penapisan output alat. RTK melaporkan penjimatan `60-90%`, dengan sesi sampel dalam READMEnya menunjukkan penjimatan `~80%`.

---

## Sistem Mampatan Lanjutan

Di luar 7 mod yang diterangkan di atas (sumber juga menerima mod `codex-responses` dan `omniglyph`, yang mana panduan ini tidak merangkumi), bahagian di bawah merangkumi ciri yang berfungsi di dalam atau di samping mod tersebut: Pemampatan Hasil Alat dan Penuaan Progresif ialah langkah 1 dan 2 enjin agresif (Mod agresif dan langkah `aggressive` bagi saluran paip bertindan), bagaimana Stacked Pichegred Aging dijalankan. `aggressive` dan `ultra` ke `standard` untuk penyedia caching semasa pemampatan dihidupkan, dan Mod Output Caveman dan Gaya Output ialah arahan segera sistem ikut serta, dimatikan secara lalai, yang membentuk output model dan bukannya memampatkan permintaan.

### Pemampatan Sedar Cache

Sesetengah pembekal (seperti Anthropic dengan caching segera) menyokong** caching segera** , yang membolehkan mereka menyimpan sebahagian daripada gesaan untuk mengurangkan kos dan kependaman. Apabila caching didayakan, pemampatan agresif sebenarnya boleh** sakit hati** prestasi kerana ia menukar token cache, membatalkan cache.

Modul `cachingAware.ts` menyelesaikannya dengan** mengesan konteks caching** dan** melaraskan strategi mampatan** sewajarnya.

#### Bagaimana ia berfungsi

1. **Kesan konteks caching** — Mengimbas badan permintaan untuk penanda `cache_control`
2. **Kenal pasti pembekal caching** — Semak sama ada pembekal sasaran menyokong caching
3. **Laraskan strategi** — Menurunkan `aggressive`/`ultra` kepada `standard` untuk penyedia caching
4. **Langkau gesaan sistem** Gesaan Sistem — biasanya dicache, jadi jangan mampatkannya

Pembantu strategi juga mengembalikan bendera `deterministicOnly`, tetapi pembina pelan hanya menggunakan strategi — tiada apa-apa di hiliran membaca bendera hari ini.

#### Contoh kod

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

#### Bila nak guna

Mampatan sedar cache adalah** sentiasa hidup** — tiada konfigurasi diperlukan. Ia bermula apabila pemampatan dihidupkan dan pembekal sasaran menyokong caching segera (Anthropic, OpenAI, dsb.); penanda `cache_control` eksplisit tidak diperlukan — penyedia caching sahaja mencetuskan penurunan taraf, dan penanda sahaja tidak pernah melakukannya (pengesanan penanda suapan telemetri cache, bukan keputusan strategi).

OpenRouter dikira sebagai penyedia caching hanya untuk model `anthropic/*` : Permintaan Kod Claude mengekalkan titik putus `cache_control` mereka (paling banyak 4) dan pengawal melindungi awalan, manakala setiap keluarga OpenRouter yang lain (`openai/`, `google/`, `qwen/`, …) kekal dilucutkan dan tidak dikawal.

### Penuaan Progresif

Perbualan yang panjang mengumpulkan banyak giliran mesej, tetapi giliran yang lebih lama menjadi kurang relevan. Modul `progressiveAging.ts`** merendahkan mesej mengikut jarak belokan** (jarak diukur dari akhir perbualan). Dengan lalai yang dihantar (`verbatim: 2, light: 2, moderate: 3`):

- **2 pusingan terakhir (jarak ≤ 2)** : Disimpan kata demi kata
- **Jarak 3** : Pemampatan manusia gua (penyingkiran pengisi)
- **Jarak 4 +** : Mesej pembantu diringkaskan; mesej pengguna dikurangkan kepada baris pertama mereka, dihadkan pada 120 aksara; peranan lain tidak disentuh. Gesaan sistem, mesej yang sudah lama dan mesej pengguna terkini sentiasa disimpan secara lisan tanpa mengira jarak. Tiada apa-apa yang digugurkan secara langsung dan jalur `light` tidak dapat dicapai dengan lalai yang dihantar (`light` sama dengan `verbatim`).

#### Contoh kod

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

#### Bila nak guna

Penuaan progresif adalah** sentiasa hidup** untuk mod `aggressive` — ia adalah langkah 2 daripada `compressAggressive()`. Mod ultra tidak menjalankannya. Ia amat berkesan untuk:

- Sesi pengekodan yang berlangsung lama
- Perbualan berbilang hari
- Aliran kerja agen dengan banyak panggilan alat

### Mod Output Manusia Gua

Mod keluaran Caveman menambah** arahan segera sistem** yang meminta model itu sendiri untuk keluaran singkat — tahap `lite` meminta jawapan ringkas yang menyimpan ayat penuh, `full` memintanya untuk "membalas ringkas seperti manusia gua pintar", dan `ultra` meminta output telegraf; arahan hanya bertanya, mereka tidak dapat menjaminnya. Permintaan menerimanya melalui `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` terlebih dahulu menyelesaikan pemilihan dengan shim compat belakang (`resolveOutputStyleSelection()` dalam `open-sse/services/compression/outputStyles/backCompat.ts`), yang, semasa `outputStyles` kosong, memetakan `cavemanOutputMode` yang didayakan kepada gaya output `terse-prose` pada `cavemanOutputMode.intensity` (lihat Back-compat di bawah); pilihan `outputStyles` yang tidak kosong digunakan sebagaimana adanya, dan `cavemanOutputMode.enabled` dan `intensity` kemudiannya tidak mempunyai kesan, sementara togol `autoClarity` masih terpakai. `outputMode.ts` memegang teks arahan (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), pintasan kandungan dan pembantu peletakan yang digunakan suntikan; penyuntik `applyCavemanOutputMode()` sendiri tidak mempunyai pemanggil pengeluaran.

#### Bagaimana ia berfungsi

Mod ini tidak memampatkan input. Ia menambahkan blok arahan pada gesaan sistem (lihat Cara suntikan berfungsi di bawah), dan sebarang mod mampatan input yang dipilih untuk permintaan masih berjalan selepas itu, pada badan yang kini membawa blok itu. Menjelang klausa sempadan kongsi yang setiap peringkat berakhir, tahap `full` bahasa Inggeris berbunyi:

> "Balas ringkas seperti manusia gua yang bijak. Gugurkan artikel (a/an/the), pengisi (just/really/basically/actually/simply), kata-kata yang menyenangkan, lindung nilai. Serpihan OK. Sinonim pendek (besar tidak meluas, betulkan tidak laksana). Pastikan semua bahan teknikal, kod, ralat, URLs, pengecam tepat."

Ini berfungsi terutamanya untuk:

- Penjanaan kod (terser mengeluarkan token = lebih sedikit)
- Soal Jawab Pantas (tidak memerlukan penjelasan yang terperinci)
- Pemprosesan kelompok (maksimumkan pemprosesan)

#### Bila nak guna

Mod keluaran Caveman ialah** ikut serta** . Dengan mampatan dihidupkan (`enabled: true`, togol induk pada halaman Tetapan Mampatan), hidupkannya dengan `cavemanOutputMode.enabled`; `intensity` memilih `lite`, `full` atau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kombo mampatan** Mod Output** togol (`outputMode`, level dalam `outputModeIntensity`) menetapkan suis yang sama untuk permintaan yang kombo digunakan dan alat `omniroute_set_compression_engine` MCP menulisnya melalui hujah `outputMode` boolean. Pilihan `outputStyles` yang tidak kosong diutamakan daripada suis ini. Dalam papan pemuka, mendayakan** Terse prosa** gaya output menyuntik blok yang sama (lihat Gaya Output di bawah).

### Gaya Output (katalog)

Mod keluaran Caveman di atas ialah** laluan gaya tunggal warisan** . Fasa 4 menggeneralisasikannya ke dalam katalog gaya keluaran boleh gubah: `OUTPUT_STYLE_CATALOG` dalam `open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya ialah arahan segera sistem yang meminta model itu sendiri untuk output yang lebih murah; gaya boleh didayakan bersama dan disuntik dalam susunan katalog.

| Gaya                                     | `id`            | Apa yang dilakukannya                                                                                                                                                                                                                                 | Bahasa arahan                                 |
| ---------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Terse prosa                              | `terse-prose`   | Jatuhkan filler/articles/hedging; pastikan bahan teknikal tepat. Teks yang sama seperti mod keluaran manusia gua warisan (dirujuk, bukan ditaip semula).                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kurang kod                               | `less-code`     | tangga YAGNI : perubahan kerja terkecil, tiada abstraksi yang tidak diminta.                                                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ekor kuda (pembangunan kanan yang malas) | `ponytail`      | "Kod terbaik ialah kod yang tidak pernah ditulis": guna semula > tulis semula, punca simptom >, perbezaan kerja terpendek.                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Saya ada ADHD (tindakan dahulu)          | `i-have-adhd`   | Tindakan dahulu (command/path/snippet sebelum prosa), langkah bernombor berbatas, ONE konkrit langkah seterusnya, tiada preamble/recap/closers. Diadaptasi daripada [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Penapis UI antislop                      | `antislop-ui`   | Setiap teknik visual mesti lulus ujian tujuan (hierarki, identiti, kebolehbacaan); tiada gradients/glass/glow lalai, palet berhad, tiada reka letak templat. Kedua-dua gaya antislop menambah sempadan tiada-mati-kawalan / tiada-fabrikasi-tuntutan. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Salinan antislop dan penapis manusia     | `antislop-copy` | Salinan khusus (tiada sengkang em, CTAs generik, kata kunci, penyekat chatbot, fakta ciptaan) serta peraturan orang: WCAG AA kontras, fokus boleh dilihat, jangkauan papan kekunci, keadaan empty/loading/error, aliran semula mudah alih.            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                         | `terse-cjk`     | jawapan `full`/`ultra` dalam bahasa Cina Klasik (文言); `lite` hanya meminta jawapan ringkas tanpa kata-kata fungsi, kesenangan atau perhiasan.                                                                                                       | zh (berpagar tempatan, lihat di bawah)        |

Setiap gaya menghantar tiga tahap keamatan — `lite`, `full`, `ultra` — dan setiap tahap berakhir dengan klausa sempadan kongsi (`SHARED_BOUNDARIES` dalam `outputMode.ts`), yang memastikan blok kod, laluan fail, arahan, ralat dan URLs tepat. Teks tahap `terse-prose` dan `terse-cjk` menambah pengecam pada senarai itu.

`terse-cjk` berpagar setempat ke `zh` di dua tempat. Halaman Tetapan Mampatan menyenaraikan barisnya hanya apabila bahasa UI papan pemuka adalah bahasa Cina (`zh-CN` atau `zh-TW`), dan `applyOutputStyles()` menyuntiknya hanya apabila bahasa permintaan yang diselesaikan (lihat Pilihan bahasa di bawah) ialah `zh`. Menyembunyikan baris tidak mengosongkan pilihan `terse-cjk` yang disimpan: tetapan API menerima sebarang id gaya dan menyimpan gaya lain pada halaman menyimpannya. Pada masa permintaan, semakan bahasa `applyOutputStyles()` adalah satu-satunya pintu tempatan.

#### Bagaimana suntikan berfungsi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) menyelesaikan pemilihan terhadap katalog (id tidak diketahui dan gaya tidak padan setempat digugurkan, tidak pernah berlaku ralat; pilihan yang menyelesaikan kepada tiada gaya meninggalkan kandungan tidak berubah, dilangkau sebagai `no_styles`), menggabungkan arahan yang dipilih dalam susunan katalog, menambahkan klausa sempadan** sekali** (ditambah dengan klausa keselamatan, `SAFETY_BOUNDARIES` atau terjemahannya, apabila `less-code` atau `ponytail` dipilih), dan memulakan blok dengan penanda idempotency tunggal (`[OmniRoute Output Styles]`), jadi permohonan semula adalah no-op. Apabila bahasa yang diselesaikan (lihat Pilihan bahasa di bawah) mempunyai terjemahan, arahan setempat disuntik dan bukannya bahasa Inggeris.

Pada badan dengan tatasusunan `messages` yang tidak kosong, semakan idempotensi dijalankan sebelum pintasan kandungan: apabila penanda `[OmniRoute Output Styles]` sudah berada dalam medan `system` peringkat atas (rentetan atau tatasusunan blok kandungan) atau dalam mesej sistem dengan kandungan rentetan, kandungan dibiarkan tidak berubah sebagai `already_applied` dan tiada semakan kata kunci dijalankan. Jika tidak, pintasan kandungan (`shouldBypassCavemanOutputMode()` dalam `open-sse/services/compression/outputMode.ts`) menyemak teks bagi tiga mesej terakhir, walau apa pun peranannya dan melangkau gaya untuk keseluruhan giliran apabila teks itu sepadan dengan kata kunci keselamatan, tindakan tidak boleh balik atau penjelasannya, atau urutan sensitif tertib: `first`, `then`, `after that`, `before`, diikuti dengan `rollback` atau `backup` `drop` `delete` `migrate` atau `deploy` `release` Pintasan berjalan manakala** Pintasan Auto-Kejelasan** togol (`cavemanOutputMode.autoClarity`, hidup secara lalai) dihidupkan; mematikan togol melangkau semakan kata kunci.

Apabila pintasan membenarkan pusingan melalui, `placeSystemInstruction()` (fail yang sama), yang tidak pernah mencipta `messages[0]` baharu, meletakkan blok pada blok pertama yang ditemuinya:

1. Mesej sistem terkemuka dengan kandungan rentetan: blok itu dilampirkan selepas teksnya.
2. Medan `system` peringkat atas: blok dilampirkan selepas teks rentetan atau ditambah sebagai blok teks baharu pada tatasusunan blok kandungan.
3. Mesej sistem pertama kemudian dengan kandungan rentetan: blok itu dilampirkan selepas teksnya.
4. Tiada satu pun di atas: blok masuk ke dalam mesej sistem baharu pada penghujung `messages`.

Pada badan tanpa tatasusunan `messages` (atau dengan tatasusunan kosong), tiada pintasan kandungan dijalankan dan medan `system` peringkat atas tidak dirujuk. Blok itu dilampirkan selepas teks medan `instructions` rentetan, melainkan medan itu sudah mengandungi penanda `[OmniRoute Output Styles]`, dalam keadaan ini badan dibiarkan tidak berubah sebagai `already_applied`. Apabila badan tidak mempunyai medan `instructions` rentetan tetapi membawa `input` (rentetan atau tatasusunan), blok menjadi `instructions`, menggantikan sebarang nilai bukan rentetan medan yang dipegang itu. Badan yang tidak mempunyai medan `instructions` rentetan mahupun rentetan atau tatasusunan `input` dibiarkan tidak berubah dan dilangkau sebagai `no_messages`.

#### Bagaimana untuk membolehkan

Dalam papan pemuka:** Konteks Mampatan → Tetapan Mampatan** (`/dashboard/context/settings`), Bahagian gaya output: satu baris setiap gaya dengan togol on/off dan pemilih tahap. Gaya menyuntik semasa pemampatan itu sendiri dihidupkan (togol induk halaman, `enabled`). The** Pintasan Auto-Kejelasan** togol adalah pada** manusia gua** halaman (`/dashboard/context/caveman`), di dalamnya** Mod Output** kad. Secara pemrograman, konfigurasi mampatan mengekalkan pemilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: semasa `outputStyles` kosong, tetapan `cavemanOutputMode.enabled` warisan dipetakan kepada `terse-prose` di `cavemanOutputMode.intensity`. Blok itu kemudiannya bermula dengan penanda `[OmniRoute Output Styles]`, di mana penyuntik `applyCavemanOutputMode()` legasi menulis `[OmniRoute Caveman Output Mode]`. Di bawah penanda, teks sepadan dengan suntikan warisan dalam en, pt-BR, es, de, fr, it, ru, id dan vi; dalam ja dan zh ia membawa satu ruang tambahan sebelum klausa sempadan. `terse-prose` diterjemahkan ke dalam pt-BR, es, de, fr, it, ru, zh, ja, id dan vi, jadi permintaan dengan bahasa yang diselesaikan ialah `hu` mendapat teks bahasa Inggeris di mana penyuntik warisan menggunakan bahasa Hungarynya.

Pemilihan bahasa gaya output (`resolveOutputStyleLanguage()` dalam `outputStyles/apply.ts`): dengan `languageConfig.enabled` dihidupkan, `autoDetect` sampel mesej pengguna terkini dalam tatasusunan `messages` permintaan yang mempunyai teks (kandungan rentetan atau `text` bahagian kandungannya) dan menjalankan pengesan enjin Caveman (`detectCompressionLanguage()`) padanya. Pengesan mengembalikan `zh` untuk teks dengan aksara Han dan tiada kana; jika tidak, ia mengembalikan mana-mana `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` dan `id` yang mempunyai paling banyak padanan petunjuk dan `en` apabila tiada padanan teks — yang tidak dapat diklasifikasikan mendapat bahasa Inggeris, tidak pernah `defaultLanguage` dan `vi` tidak pernah dikesan walaupun gaya dihantar `vi`. A Responses API body mengekalkan gilirannya dalam `input`, yang tidak dijadikan sampel, jadi ia mendapat `defaultLanguage`, kemudian bahasa Inggeris. Apabila tiada mesej pengguna dalam `messages` mempunyai teks, atau dengan `autoDetect` dimatikan, `defaultLanguage` digunakan, kemudian bahasa Inggeris. Dengan `languageConfig.enabled` dimatikan, bahasanya ialah bahasa Inggeris — melainkan kombo mampatan digunakan pada permintaan (kombo yang diperuntukkan kepada kombo penghalaan permintaan, atau kombo mampatan lalai chatCore kembali ke untuk saluran paip bertindan terbina dalam): menggunakan kombo menghidupkan `languageConfig.enabled` untuk permintaan itu dan menetapkan `defaultLanguage` daripada nilai kombo itu (kombo yang disimpan daripada kombo itu) pek, jika tidak, pek pertama kombo, yang lalai kepada `en`), manakala `autoDetect` yang disimpan (dihidupkan secara lalai) masih terpakai. Enjin input Caveman memilih bahasa pek peraturannya secara berbeza — setiap bahagian teks dan, dengan pengesanan automatik dimatikan, berpagar pada `enabledPacks`.

Matriks bahasa × gaya disematkan oleh `tests/unit/compression/output-styles-i18n-matrix.test.ts`: setiap gaya katalog memerlukan entri dalam `BASELINE_LANGUAGES` ujian; gaya yang tidak berpagar setempat mesti menghantar terjemahan pt-BR ( `terse-cjk` berpagar setempat dikecualikan daripada peraturan ini) melainkan jika ia disenaraikan dalam `KNOWN_ENGLISH_ONLY`, yang mungkin mengandungi hanya gaya tanpa terjemahan langsung — gaya tersenarai yang mempunyai sebarang terjemahan gagal dalam ujian; dan gaya gagal dalam ujian apabila ia kehilangan bahasa yang disenaraikan entri `BASELINE_LANGUAGES`. Untuk menambah gaya, lihat [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Pemampatan Hasil Alat

`compressToolResult()` dalam `open-sse/services/compression/toolResultCompressor.ts` memampatkan teks hasil alat dengan** 5 strategi** . Ia mencubanya dalam susunan ini dan strategi pertama yang didayakan yang semakannya sepadan dengan kandungan menentukan keputusannya:

1. **`fileContent`** : kandungan 3 atau lebih baris di mana sekurang-kurangnya satu baris, mengabaikan lekukan di hadapan, bermula dengan `import `, `export `, `function `, `class `, `const `, `let `, `var ` atau `return ` (kata kunci ditambah ruang), atau dengan `if`, `for` atau `while` diikuti dengan `(` atau ` (` 20, dengan penutupnya yang terakhir ditandakan dengan baris pertamanya.
2. **`grepSearch`** : kandungan dengan sekurang-kurangnya satu baris dalam bentuk `<path>:<digits>:`, di mana teks sebelum titik bertindih pertama tidak mempunyai ruang putih, hanya menyimpan baris tersebut, paling banyak 30, diikuti dengan kiraan sebarang padanan selanjutnya dan senarai fail yang dipadankan; setiap baris lain digugurkan. Satu baris sedemikian sudah cukup untuk mencetuskan strategi, jadi baris log yang bermula dengan cap masa seperti `12:30:45` juga dikira.
3. **`shellOutput`** : output yang mengandungi jujukan ANSI CSI (`ESC[` kemudian digit atau koma bertitik kemudian huruf, seperti dalam kod warna) atau `$` diikuti dengan ruang putih di mana-mana dalam teks kehilangan jujukan tersebut (melarikan diri lain, seperti `ESC[?25l` atau jujukan tajuk tetingkap OSC, disimpan) dan mengekalkan 50 baris terakhirnya, dengan baris berturut-turut. Oleh kerana semakan ini dijalankan sebelum `json` dan `errorMessage`, JSON atau output ralat yang mengandungi `$` sedemikian tidak pernah mencapainya semasa `shellOutput` dihidupkan.
4. **`json`**: a JSON payload over 2,000 characters that starts with `{` or `[` (after optional whitespace) and parses is summarized: an array of more than 7 items keeps its first 5 and last 2 items and its total count, and an object keeps its first 20 keys, with each nested object or array value replaced by a `{…N keys}` placeholder (for an array, N is its length) and a `_remaining_<N>_keys` marker counting the keys dropped past the first 20. Scalar values are copied whole, so an object of 20 keys or fewer with no nested values is only re-indented — a minified one gains characters and stays unchanged.
5. **`errorMessage`** : output yang mengandungi, di mana-mana dan dalam mana-mana huruf, `error:`, `error ` (perkataan diikuti dengan ruang, seperti dalam `no error found`), `[error]`, `exception:`, `exception `, `[exception]` atau `traceback` mengekalkan baris pertamanya, 10 baris seterusnya dan 3 terakhir, dengan penanda `… [N frames elided] …` sebagai ganti baris di antaranya. Penanda muncul hanya apabila lebih daripada 13 baris mengikut baris pertama, jadi output ralat sebanyak 14 baris atau kurang tidak dipendekkan (pada 12 atau 13 baris, 3 baris ulangan terakhir telah disimpan).

Selepas perlawanan strategi, walaupun yang tidak menjimatkan apa-apa, strategi kemudian tidak dicuba. Apabila strategi padanan tidak menyimpan token anggaran (panjang ÷ 4, dibundarkan ke atas) — contohnya fail seperti kod sebanyak 25 baris atau kurang, atau tatasusunan JSON melebihi 2,000 aksara dengan 7 item atau kurang — enjin agresif mengekalkan hasil alat asal: kedua-dua pemanggil (`compressAggressive()` dan `compressAnthropicToolResultBlock()`) kekalkan yang asal apabila `saved` atau di bawahnya adalah 0. keluaran `compressToolResult()`. Langkah hasil alat bukanlah perkataan terakhir: ringkasan sandaran enjin masih boleh memendekkan mesej `tool` atau `function` lebih panjang daripada 8,192 aksara (`maxTokensPerMessage`, 2,048, darab 4).

#### Bila nak guna

Mampatan hasil alat ialah langkah 1 enjin agresif (`compressAggressive()` dalam `open-sse/services/compression/aggressive.ts`), jadi ia berjalan dalam mod Agresif dan dalam langkah `aggressive` saluran paip bertindan. Ia memampatkan mesej `tool` dan `function` bentuk OpenAI dan teks di dalam blok Anthropic `tool_result`. Setiap strategi mempunyai suis sendiri di bawah `aggressive.toolStrategies`, semuanya dihidupkan secara lalai. Dalam papan pemuka, suis berada dalam halaman Caveman** Maju** lihat semasa pemampatan dihidupkan dan mod lalai ialah Agresif.

### Talian Paip Bertindan

Mod bertindan berjalan** berbilang enjin dalam urutan** — biasanya RTK dahulu (60-90% penjimatan pada output alat), kemudian Caveman pada baki teks (~ 46% penjimatan input). Dikarang, iaitu** 78-95% julat yang layak** (lihat Matematik Simpanan Hulu di atas): `1 - (1 - 0.60..0.90) × (1 - 0.46)` purata ≈ 89%.

#### Bagaimana ia berfungsi

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Bila nak guna

Gunakan mod bertindan untuk:

- Aliran kerja berat alatan (pengekodan agen, penyelidikan)
- Pemprosesan kelompok sensitif kos
- Apabila anda memerlukan penjimatan token maksimum

Talian paip bertindan dikonfigurasikan melalui tetapan mampatan `stackedPipeline` global atau melalui kombo mampatan bernama yang diperuntukkan kepada kombo penghalaan (lihat Per-Combo Override di atas) — bukan melalui `modePack` auto-combo (medan itu hanya menimbang semula pemilihan model auto-combo dan `stacked` bukanlah nama pek yang sah).

---

## Penggantian Gabungan Pemampatan

Anda boleh menggantikan mod pemampatan global **bagi setiap gabungan** untuk memperhalus tingkah laku
bagi kes penggunaan yang berbeza:

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

- **Gabungan pengekodan**: Gunakan mod `aggressive` untuk sesi yang panjang
- **Gabungan Soal Jawab pantas**: Gunakan mod `lite` untuk respons yang pantas
- **Gabungan intensif alat**: Gunakan mod `stacked` untuk penjimatan maksimum
- **Gabungan produksi**: biarkan penggantian dimatikan untuk penyedia caching — pelarasan peka cache yang sentiasa aktif menurunkan taraf `aggressive`/`ultra` kepada `standard` secara automatik
  (tiada mod `cache-aware` yang boleh dipilih)

---

## Lihat Juga

- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Pemboleh ubah persekitaran pemampatan
- [Panduan Seni Bina](../architecture/ARCHITECTURE.md) — Komponen dalaman saluran pemampatan
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Bermula dengan pemampatan
- [Pemampatan RTK](./RTK_COMPRESSION.md) — Penapis RTK, model kepercayaan, get pengesahan, pemulihan output mentah
- [Enjin Pemampatan](./COMPRESSION_ENGINES.md) — Caveman, RTK, bertindan, API, MCP, papan pemuka
- [Format Peraturan Pemampatan](./COMPRESSION_RULES_FORMAT.md) — Format pek peraturan JSON
- [Pek Bahasa Pemampatan](./COMPRESSION_LANGUAGE_PACKS.md) — Peraturan Caveman khusus bahasa
