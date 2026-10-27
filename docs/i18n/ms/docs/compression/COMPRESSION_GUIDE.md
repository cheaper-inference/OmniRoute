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

Tiada pemampatan digunakan. Semua mesej diteruskan tanpa perubahan.

### Mod Ringan (penjimatan ~15%, kependaman <1ms)

Mod paling selamat — sifar perubahan semantik, hanya pembersihan pemformatan:

| Teknik                   | Penerangan                                            |
| ------------------------ | ----------------------------------------------------- |
| `collapseWhitespace`     | Gabungkan baris kosong berturutan dan ruang di hujung |
| `dedupSystemPrompt`      | Alih keluar mesej sistem pendua                       |
| `compressToolResults`    | Mampatkan output alat/fungsi yang berjela-jela        |
| `removeRedundantContent` | Buang arahan berulang                                 |
| `replaceImageUrls`       | Pendekkan URI data imej base64                        |

**Terbaik untuk:** Penggunaan sentiasa aktif, aliran kerja kritikal keselamatan.

### Mod Standard (penjimatan ~30%)

Diilhamkan oleh [Caveman](https://github.com/JuliusBrussee/caveman) — mengalih keluar kata pengisi dan ungkapan berjela-jela sambil mengekalkan makna:

- Mengalih keluar kata pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa berjela-jela ("in order to" → "to", "as a result of" → "because")
- Membuang ungkapan sopan yang tidak tegas ("Would you mind...", "If you could possibly...")
- Lebih 30 peraturan regex yang ditala untuk gesaan pengekodan

**Terbaik untuk:** Aliran kerja pengekodan harian, pasukan yang mementingkan kos.

### Mod Agresif (penjimatan ~50%)

Pengurusan sejarah pintar untuk sesi yang panjang:

- **Penuaan Mesej** — mesej yang lebih lama dimampatkan secara beransur-ansur
- **Pemampatan Hasil Alat** — output alat yang panjang dipangkas atau digugurkan (baris pertama/terakhir,
  penapisan baris padanan, pemadatan kunci JSON)
- **Pelindung Integriti Struktur** — memastikan pasangan `tool_use` + `tool_result` kekal konsisten
- **Kesedaran Tetingkap Konteks** — mematuhi had token setiap model

**Terbaik untuk:** Sesi penyahpepijatan yang panjang, pangkalan kod yang besar.

### Mod Ultra (penjimatan ~75%)

Pemampatan maksimum untuk senario yang sangat memerlukan penjimatan token:

- **Pemangkasan Heuristik** — pemangkasan token berasaskan skor bagi prosa
- **Pemeliharaan Struktur** — blok kod berpagar, kod sebaris, URL dan pengecam
  ditandakan sementara dan dicantumkan semula tanpa sebarang perubahan, serta tidak pernah dipangkas
- **Peringkat SLM pilihan** — model setempat yang kecil boleh memperhalus pemangkasan apabila dikonfigurasikan
- Bebas daripada mod Agresif: ia tidak menjalankan penuaan mesej, pemampatan hasil alat
  atau peringkas sandaran (hanya kegagalan peringkat SLM boleh menghalakan laluan sandaran melalui
  mod agresif)

**Terbaik untuk:** Apabila anda berulang kali mencapai had konteks.

### Mod RTK (julat huluan 60-90%)

Mod RTK dioptimumkan untuk output alat berjela-jela yang muncul dalam sesi ejen pengekodan:

- Mengesan kelas perintah/output seperti `git status`, `git diff`, `git log`, pelaksana ujian,
  binaan TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/pemasangan npm, log Docker, output
  infrastruktur dan output shell generik
- Menggunakan pek penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- Mengimport penapis skema RTK TOML v1 daripada fail `filters.toml` projek atau global, dengan
  pengesahan ujian sebaris dan kawalan kepercayaan untuk fail projek
- Disertakan dengan 55 penapis terbina dalam berserta sampel pengesahan sebaris
- Mengalih keluar jujukan kawalan ANSI, bar kemajuan, baris berulang dan hingar yang tidak boleh diambil tindakan
- Mengekalkan kegagalan, ralat, amaran, fail yang diubah, ringkasan dan bahagian akhir output yang panjang
- Menyokong penapis projek terkawal kepercayaan, penapis global dan pemulihan output mentah yang telah disunting secara pilihan

**Terbaik untuk:** Sesi ejen dengan transkrip shell, binaan, ujian, git, grep dan output fail.

### Mod Bertindan (julat layak 78-95%)

Mod Bertindan menjalankan berbilang enjin pemampatan dalam susunan yang deterministik. Saluran paip lalai ialah:

```txt
RTK -> Caveman
```

Susunan tersebut memadatkan output terminal/alat terlebih dahulu, kemudian menggunakan pemadatan semantik Caveman pada
gesaan bahasa semula jadi yang selebihnya. Saluran paip bertindan boleh dikonfigurasikan secara global atau melalui
kombo pemampatan yang ditetapkan kepada kombo penghalaan.

**Terbaik untuk:** Konteks bercampur dengan log alat yang besar serta arahan manusia atau ringkasan pembantu.

---

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

- **Caveman** — pemilihan mod, pek bahasa, pratonton dan tetapan lalai global
- **RTK** — pratonton penapis perintah, tetapan keselamatan RTK dan katalog penapis
- **Compression Combos** — saluran pemprosesan enjin bernama yang ditetapkan kepada kombo penghalaan
- **Auto-Trigger Threshold** — aktifkan pemampatan secara automatik apabila kiraan token melebihi ambang

### Penggantian Per Kombo

Dalam `Dashboard → Context & Cache → Compression Combos`, tetapkan kombo pemampatan kepada kombo
penghalaan:

```txt
Kombo: "free-tier-fallback"
  Kombo Pemampatan: "coding-agent-stack"
  Saluran Pemprosesan: RTK -> Caveman
  Sasaran:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ini membolehkan anda menggunakan pemampatan bertindan pada penyedia percuma/pengekodan sambil mengekalkan mod ringkas pada
langganan berbayar.

Penetapan "Penggantian Per Kombo" ini ialah kawalan yang berbeza daripada penggantian **mod pemampatan kombo
penghalaan** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — skema medan tersebut
turut menerima `rtk`, `stacked` dan `omniglyph`) — penggantian itu tidak memilih saluran pemprosesan
kombo pemampatan bernama; ia hanya menetapkan medan `compressionMode` yang dirujuk oleh
`resolveCompressionPlan`. Ia boleh ditetapkan sama ada pada kad kombo (`Dashboard → Combos`) atau, sejak
#6760, bagi setiap kombo penghalaan dalam senarai "Assign to routing" pada
`Dashboard → Context & Cache → Compression Combos`, betul-betul di sebelah kotak pilihan penetapan saluran pemprosesan
yang didokumenkan di atas. Kedua-dua antara muka menyimpan perubahan melalui titik akhir `PUT /api/combos/{id}` yang sama.

### Penggantian per permintaan

Hantar pengepala permintaan `x-omniroute-compression` untuk menggantikan pelan pemampatan bagi satu
permintaan. Ia mempunyai keutamaan tertinggi — ia mengatasi penggantian kombo penghalaan, profil aktif,
pencetus automatik dan Default panel. Nilai yang tidak diketahui akan diabaikan (permintaan tidak akan ditolak) dan
suis induk global masih mengawal segala-galanya: apabila pemampatan dimatikan secara global, pengepala tidak boleh
menghidupkannya. Nilai:

| Nilai         | Kesan                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tiada pemampatan untuk permintaan ini.                                                                                 |
| `default`     | Profil Default yang diperoleh daripada panel (mengabaikan profil aktif). Enjin lossy kekal dimatikan.                  |
| `safe`        | Sama seperti tidak menyertakan pengepala: nyahduplikasi dan pelipatan ruang putih sahaja.                              |
| `allow-lossy` | Kekalkan pelan pengendali permintaan ini, termasuk ringkasan, penapis kerelevanan dan penulisan semula gaya.           |
| `engine:<id>` | Satu enjin apabila didayakan, contohnya `engine:rtk`. Ini ialah pilihan ikut serta per permintaan bagi enjin tersebut. |
| `<combo>`     | Kombo bernama, dipadankan mengikut nama (tanpa mengira huruf besar atau kecil) terlebih dahulu, kemudian mengikut id.  |

Tanpa `allow-lossy`, `engine:<id>` atau kombo bernama, enjin lossy tidak digunakan. Permintaan
masih menerima nyahduplikasi sesi dan pelipatan ruang putih apabila pemampatan dihidupkan.

Pelan yang digunakan dipantulkan kembali dalam pengepala respons `X-OmniRoute-Compression: <mode>; source=<source>`,
dengan `<source>` ialah salah satu daripada `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` atau `off`.

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

# Uji RTK secara langsung dengan metadata perintah pilihan
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

## Sistem Pemampatan Lanjutan

Selain 7 mod yang diterangkan di atas (sumber turut menerima mod `codex-responses` dan
`omniglyph`, yang tidak dibincangkan dalam panduan ini), bahagian di bawah merangkumi ciri
yang berfungsi dalam atau bersama-sama mod tersebut: Pemampatan Hasil Alat dan Penuaan Progresif
ialah langkah 1 dan 2 enjin agresif (mod Agresif dan langkah `aggressive` dalam
talian paip bertindan), Talian Paip Bertindan ialah cara mod Bertindan dijalankan, Pemampatan Sedar Cache
menurunkan taraf `aggressive` dan `ultra` kepada `standard` untuk penyedia cache semasa pemampatan
diaktifkan, manakala Mod Output Caveman dan Gaya Output ialah arahan gesaan sistem yang boleh dipilih,
dilumpuhkan secara lalai, yang membentuk output model dan bukannya memampatkan permintaan.

### Pemampatan Sedar Cache

Sesetengah penyedia (seperti Anthropic dengan cache gesaan) menyokong **cache gesaan**,
yang membolehkan mereka menyimpan bahagian gesaan dalam cache untuk mengurangkan kos dan kependaman. Apabila
cache diaktifkan, pemampatan agresif sebenarnya boleh **menjejaskan** prestasi
kerana ia mengubah token yang dicache, sekali gus membatalkan cache tersebut.

Modul `cachingAware.ts` menyelesaikan masalah ini dengan **mengesan konteks cache** dan
**melaraskan strategi pemampatan** dengan sewajarnya.

#### Cara ia berfungsi

1. **Kesan konteks cache** — Mengimbas kandungan permintaan untuk penanda `cache_control`
2. **Kenal pasti penyedia cache** — Menyemak sama ada penyedia sasaran menyokong cache
3. **Laraskan strategi** — Menurunkan taraf `aggressive`/`ultra` kepada `standard` untuk penyedia cache
4. **Langkau gesaan sistem** — Gesaan sistem biasanya dicache, jadi jangan mampatkannya

Pembantu strategi turut mengembalikan bendera `deterministicOnly`, tetapi pembina pelan hanya menggunakan
strategi tersebut — tiada komponen hiliran yang membaca bendera itu pada masa ini.

#### Contoh kod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Penanda cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Bila hendak digunakan

Pemampatan sedar cache **sentiasa aktif** — tiada konfigurasi diperlukan. Ia berkuat kuasa apabila
pemampatan diaktifkan dan penyedia sasaran menyokong cache gesaan (Anthropic, OpenAI,
dan sebagainya); penanda `cache_control` secara eksplisit tidak diperlukan — penyedia cache sahaja
sudah mencetuskan penurunan taraf, manakala penanda sahaja tidak akan berbuat demikian (pengesanan penanda membekalkan
telemetri cache, bukan keputusan strategi).

### Penuaan Progresif

Perbualan panjang mengumpulkan banyak giliran mesej, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **meringkaskan mesej berdasarkan jarak giliran**
(jarak diukur dari penghujung perbualan). Dengan nilai lalai yang disediakan
(`verbatim: 2, light: 2, moderate: 3`):

- **2 giliran terakhir (jarak ≤ 2)**: Dikekalkan kata demi kata
- **Jarak 3**: Pemampatan Caveman (penyingkiran kata pengisi)
- **Jarak 4+**: Mesej pembantu diringkaskan; mesej pengguna dikurangkan kepada baris
  pertamanya, dihadkan kepada 120 aksara; peranan lain tidak disentuh. Gesaan sistem, mesej yang
  telah melalui penuaan dan mesej pengguna terkini sentiasa dikekalkan kata demi kata tanpa mengira jarak.
  Tiada apa-apa yang digugurkan sepenuhnya, dan jalur `light`
  tidak boleh dicapai dengan nilai lalai yang disediakan (`light` sama dengan `verbatim`).

#### Contoh kod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 giliran lagi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 giliran terakhir: kata demi kata
  light: 8, // jarak <= 8: pemampatan ringan
  moderate: 20, // jarak <= 20: pemampatan caveman
  fullSummary: 5, // diperlukan oleh jenis, tidak dibaca oleh kod pengelompokan jalur
  // jarak > 20: diringkaskan (pembantu) / baris pertama dikekalkan (pengguna)
});

// saved = bilangan token yang dijimatkan
```

#### Bila hendak digunakan

Penuaan progresif **sentiasa aktif** untuk mod `aggressive` — ia merupakan langkah 2 dalam
`compressAggressive()`. Mod Ultra tidak menjalankannya. Ia
amat berkesan untuk:

- Sesi pengekodan yang berjalan lama
- Perbualan berbilang hari
- Aliran kerja berasaskan ejen dengan banyak panggilan alat

### Mod Output Caveman

Mod output Caveman menambahkan **arahan gesaan sistem** yang meminta model itu sendiri menghasilkan
output ringkas — tahap `lite` meminta jawapan padat yang mengekalkan ayat lengkap, `full`
memintanya untuk "memberikan respons ringkas seperti manusia gua pintar", manakala `ultra` meminta output telegrafik;
arahan hanya meminta, ia tidak dapat menjamin hasil tersebut. Permintaan menerima arahan ini melalui
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` terlebih dahulu menentukan pilihan dengan penyesuai keserasian ke belakang
(`resolveOutputStyleSelection()` dalam
`open-sse/services/compression/outputStyles/backCompat.ts`), yang, semasa `outputStyles`
kosong, memetakan `cavemanOutputMode` yang diaktifkan kepada gaya output `terse-prose` pada
`cavemanOutputMode.intensity` (lihat Keserasian ke belakang di bawah); pilihan `outputStyles`
yang tidak kosong digunakan sebagaimana adanya, dan `cavemanOutputMode.enabled` serta `intensity` kemudiannya tidak
memberikan kesan, manakala togol `autoClarity` masih digunakan. `outputMode.ts` mengandungi
teks arahan (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), pintasan kandungan dan
pembantu penempatan yang digunakan oleh proses suntikan; penyuntik `applyCavemanOutputMode()` miliknya sendiri tidak mempunyai
pemanggil produksi.

#### Cara ia berfungsi

Mod ini tidak memampatkan input. Ia menambahkan blok arahan pada gesaan sistem
(lihat Cara penyuntikan berfungsi di bawah), dan sebarang mod pemampatan input yang dipilih untuk permintaan
masih dijalankan selepas itu, pada isi yang kini mengandungi blok tersebut. Sebelum klausa
sempadan dikongsi yang mengakhiri setiap tahap, tahap `full` bahasa Inggeris berbunyi:

> "Balas secara ringkas seperti manusia gua pintar. Gugurkan kata sandang (a/an/the), kata pengisi (just/really/basically/actually/simply), basa-basi, kata berpagar. Fragmen dibenarkan. Sinonim pendek (big bukan extensive, fix bukan implement). Kekalkan semua kandungan teknikal, kod, ralat, URL, pengecam dengan tepat."

Ini berfungsi dengan sangat baik khususnya untuk:

- Penjanaan kod (output lebih ringkas = token lebih sedikit)
- Soal jawab pantas (tidak memerlukan penjelasan terperinci)
- Pemprosesan kelompok (memaksimumkan daya pemprosesan)

#### Bila hendak digunakan

Mod output manusia gua adalah **ikut serta**. Dengan pemampatan dihidupkan (`enabled: true`, suis utama
pada halaman Tetapan Pemampatan), hidupkannya dengan `cavemanOutputMode.enabled`; `intensity`
memilih `lite`, `full` atau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Togol **Mod Output** gabungan pemampatan (`outputMode`, tahap dalam `outputModeIntensity`)
menetapkan suis yang sama untuk permintaan yang menggunakan gabungan tersebut, dan alat MCP
`omniroute_set_compression_engine` menulisnya melalui argumen boolean `outputMode`.
Pemilihan `outputStyles` yang tidak kosong mengatasi suis ini. Dalam papan pemuka,
menghidupkan gaya output **Prosa ringkas** menyuntik blok yang sama (lihat Gaya Output
di bawah).

### Gaya Output (katalog)

Mod output manusia gua di atas ialah **laluan gaya tunggal legasi**. Fasa 4 mengembangkannya
menjadi katalog gaya output yang boleh digabungkan: `OUTPUT_STYLE_CATALOG` dalam
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya ialah arahan gesaan sistem
yang meminta model itu sendiri menghasilkan output lebih murah; gaya boleh dihidupkan
bersama-sama dan disuntik mengikut susunan katalog.

| Gaya                                 | `id`            | Fungsinya                                                                                                                                                                                                                                                | Bahasa arahan                                 |
| ------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa ringkas                        | `terse-prose`   | Gugurkan kata pengisi/kata sandang/kata berpagar; kekalkan kandungan teknikal dengan tepat. Teks yang sama seperti mod output manusia gua legasi (dirujuk, bukan ditaip semula).                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kurang kod                           | `less-code`     | Tangga YAGNI: perubahan berfungsi paling kecil, tiada abstraksi yang tidak diminta.                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ekor kuda (pembangun kanan malas)    | `ponytail`      | "Kod terbaik ialah kod yang tidak pernah ditulis": guna semula > tulis semula, punca utama > gejala, perbezaan berfungsi terpendek.                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Saya ada ADHD (tindakan dahulu)      | `i-have-adhd`   | Tindakan dahulu (perintah/laluan/cebis kod sebelum prosa), langkah bernombor dan terhad, SATU langkah seterusnya yang konkrit, tiada mukadimah/ringkasan/penutup. Diadaptasi daripada [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Penapis UI antislop                  | `antislop-ui`   | Setiap teknik visual mesti lulus ujian tujuan (hierarki, identiti, kebolehbacaan); tiada kecerunan/kaca/cahaya lalai, palet terhad, tiada reka letak templat. Kedua-dua gaya antislop menambahkan sempadan tiada kawalan mati / tiada dakwaan rekaan.    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Penapis salinan dan manusia antislop | `antislop-copy` | Salinan khusus (tiada tanda pisah em, CTA generik, kata-kata popular, penutup chatbot, fakta rekaan) serta peraturan manusia: kontras WCAG AA, fokus kelihatan, akses papan kekunci, keadaan kosong/pemuatan/ralat, aliran semula mudah alih.            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK ringkas (文言)                   | `terse-cjk`     | Jawapan `full`/`ultra` dalam bahasa Cina Klasik (文言); `lite` hanya meminta jawapan ringkas tanpa kata tugas, basa-basi atau hiasan.                                                                                                                    | zh (dihadkan mengikut lokal, lihat di bawah)  |

Setiap gaya menyediakan tiga tahap keamatan — `lite`, `full`, `ultra` — dan setiap tahap
berakhir dengan klausa sempadan dikongsi (`SHARED_BOUNDARIES` dalam `outputMode.ts`), yang
mengekalkan blok kod, laluan fail, perintah, ralat dan URL dengan tepat. Teks tahap
`terse-prose` dan `terse-cjk` menambahkan pengecam pada senarai tersebut.

`terse-cjk` dihadkan kepada lokal `zh` di dua tempat. Halaman Tetapan Pemampatan menyenaraikan
barisnya hanya apabila bahasa UI papan pemuka ialah bahasa Cina (`zh-CN` atau `zh-TW`), dan
`applyOutputStyles()` menyuntiknya hanya apabila bahasa permintaan yang ditentukan (lihat Pemilihan
bahasa di bawah) ialah `zh`. Menyembunyikan baris tersebut tidak mengosongkan pemilihan
`terse-cjk` yang disimpan: API tetapan menerima sebarang id gaya, dan menyimpan gaya lain
pada halaman mengekalkannya. Pada waktu permintaan, semakan bahasa `applyOutputStyles()`
ialah satu-satunya sekatan lokal.

#### Cara penyuntikan berfungsi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) memadankan
pemilihan dengan katalog (id yang tidak diketahui dan gaya yang tidak sepadan dengan lokal
digugurkan, dan tidak sekali-kali dianggap sebagai ralat; pemilihan yang tidak menghasilkan
sebarang gaya membiarkan isi tidak berubah, dilangkau sebagai `no_styles`), menggabungkan
arahan yang dipilih mengikut turutan katalog,
menambahkan klausa sempadan **sekali sahaja** (berserta klausa keselamatan,
`SAFETY_BOUNDARIES` atau terjemahannya, apabila `less-code` atau `ponytail` dipilih), dan
memulakan blok dengan satu penanda keidempotenan (`[OmniRoute Output Styles]`), supaya
penggunaan semula tidak menghasilkan sebarang perubahan. Apabila bahasa yang ditentukan
(lihat Pemilihan bahasa di bawah) mempunyai terjemahan, arahan setempat disuntik bagi
menggantikan bahasa Inggeris.

Pada isi dengan tatasusunan `messages` yang tidak kosong, semakan keidempotenan dijalankan
sebelum pintasan kandungan: apabila penanda `[OmniRoute Output Styles]` sudah wujud dalam
medan `system` peringkat teratas (rentetan atau tatasusunan blok kandungan) atau dalam mesej
sistem dengan kandungan rentetan, isi dibiarkan tidak berubah sebagai `already_applied` dan
tiada semakan kata kunci dijalankan. Jika tidak, pintasan kandungan
(`shouldBypassCavemanOutputMode()` dalam
`open-sse/services/compression/outputMode.ts`) menyemak teks bagi tiga mesej terakhir,
tanpa mengira peranannya, dan melangkau gaya untuk keseluruhan giliran apabila teks tersebut
sepadan dengan kata kunci keselamatan, tindakan tidak boleh balik atau penjelasan, atau
urutan yang sensitif terhadap tertib: `first`, `then`, `after that`, `before`, `rollback`
atau `backup` yang diikuti dalam lingkungan 240 aksara oleh `delete`, `drop`, `migrate`,
`deploy` atau `release`. Pintasan dijalankan selagi togol **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, dihidupkan secara lalai) dihidupkan; mematikan togol
akan melangkau semakan kata kunci.

Apabila pintasan membenarkan giliran diteruskan, `placeSystemInstruction()` (fail yang sama),
yang tidak sekali-kali mencipta `messages[0]` baharu, meletakkan blok di lokasi pertama yang
ditemuinya antara yang berikut:

1. Mesej sistem pendahulu dengan kandungan rentetan: blok ditambahkan selepas teksnya.
2. Medan `system` peringkat teratas: blok ditambahkan selepas teks rentetan, atau
   ditambahkan sebagai blok teks baharu pada tatasusunan blok kandungan.
3. Mesej sistem terkemudian yang pertama dengan kandungan rentetan: blok ditambahkan selepas
   teksnya.
4. Tiada satu pun di atas: blok dimasukkan ke dalam mesej sistem baharu pada penghujung
   `messages`.

Pada isi tanpa tatasusunan `messages` (atau dengan tatasusunan kosong), tiada pintasan
kandungan dijalankan dan medan `system` peringkat teratas tidak dirujuk. Blok ditambahkan
selepas teks dalam medan `instructions` berbentuk rentetan, melainkan medan tersebut sudah
mengandungi penanda `[OmniRoute Output Styles]`, yang menyebabkan isi dibiarkan tidak
berubah sebagai `already_applied`. Apabila isi tidak mempunyai medan `instructions`
berbentuk rentetan tetapi mengandungi `input` (rentetan atau tatasusunan), blok menjadi
`instructions`, menggantikan apa-apa nilai bukan rentetan yang sebelum ini terkandung dalam
medan tersebut. Isi yang tidak mempunyai medan `instructions` berbentuk rentetan mahupun
`input` berbentuk rentetan atau tatasusunan dibiarkan tidak berubah dan dilangkau sebagai
`no_messages`.

#### Cara mendayakan

Dalam papan pemuka: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), bahagian gaya output: satu baris bagi setiap gaya dengan
togol hidup/mati dan pemilih tahap. Gaya disuntik selagi pemampatan itu sendiri dihidupkan
(togol utama halaman, `enabled`). Togol **Auto-Clarity Bypass** berada pada halaman
**Caveman** (`/dashboard/context/caveman`), dalam kad **Output Mode**. Secara pengaturcaraan,
konfigurasi pemampatan menyimpan pemilihan seperti berikut:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Keserasian ke belakang: selagi `outputStyles` kosong, tetapan legasi
`cavemanOutputMode.enabled` dipetakan kepada `terse-prose` pada
`cavemanOutputMode.intensity`. Blok itu kemudiannya bermula dengan penanda
`[OmniRoute Output Styles]`, manakala penyuntik legasi `applyCavemanOutputMode()` menulis
`[OmniRoute Caveman Output Mode]`. Di bawah penanda tersebut, teks sepadan dengan suntikan
legasi dalam en, pt-BR, es, de, fr, it, ru, id dan vi; dalam ja dan zh, teks itu mempunyai
satu ruang tambahan sebelum klausa sempadan. `terse-prose` diterjemahkan ke dalam pt-BR,
es, de, fr, it, ru, zh, ja, id dan vi, maka permintaan yang bahasa ditentukannya ialah
`hu` mendapat teks bahasa Inggeris, sedangkan penyuntik legasi menggunakan teks bahasa
Hungary.

Pemilihan bahasa gaya output (`resolveOutputStyleLanguage()` dalam
`outputStyles/apply.ts`): apabila `languageConfig.enabled` dihidupkan, `autoDetect`
mengambil sampel mesej pengguna terkini dalam tatasusunan `messages` permintaan yang
mempunyai teks (kandungan rentetan, atau `text` bagi bahagian kandungannya) dan menjalankan
pengesan enjin Caveman (`detectCompressionLanguage()`) padanya. Pengesan mengembalikan
`zh` untuk teks yang mengandungi aksara Han tanpa kana; jika tidak, ia mengembalikan mana-mana
daripada `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` dan `id` yang mempunyai padanan
petunjuk terbanyak, serta `en` apabila tiada padanan — teks yang tidak dapat dikelaskannya
menggunakan bahasa Inggeris, bukan sekali-kali `defaultLanguage`, dan `vi` tidak pernah
dikesan walaupun gaya menyediakan teks `vi`. Isi Responses API menyimpan gilirannya dalam
`input`, yang tidak diambil sebagai sampel, maka ia menggunakan `defaultLanguage`, kemudian
bahasa Inggeris. Apabila tiada mesej pengguna dalam `messages` yang mempunyai teks, atau
apabila `autoDetect` dimatikan, `defaultLanguage` digunakan, kemudian bahasa Inggeris.
Apabila `languageConfig.enabled` dimatikan, bahasanya ialah bahasa Inggeris — melainkan
kombo pemampatan digunakan pada permintaan (kombo yang ditetapkan kepada kombo penghalaan
permintaan, atau kombo pemampatan lalai yang digunakan oleh chatCore sebagai sandaran untuk
saluran paip bertindan terbina dalam): penggunaan kombo menghidupkan
`languageConfig.enabled` untuk permintaan tersebut dan menetapkan `defaultLanguage`
daripada pek bahasa kombo (nilai tersimpan jika nilai itu merupakan salah satu pek kombo,
atau pek pertama kombo jika tidak, yang secara lalai ialah `en`), manakala tetapan
`autoDetect` yang disimpan (dihidupkan secara lalai) masih digunakan. Enjin input Caveman
memilih bahasa pek peraturannya dengan cara yang berbeza — bagi setiap bahagian teks dan,
apabila pengesanan automatik dimatikan, bergantung pada `enabledPacks`.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: setiap gaya katalog memerlukan
entri dalam `BASELINE_LANGUAGES` ujian tersebut; gaya yang tidak dihadkan mengikut penempatan mesti disertakan dengan
terjemahan pt-BR (`terse-cjk` yang dihadkan mengikut penempatan dikecualikan daripada peraturan ini) melainkan gaya itu
disenaraikan dalam `KNOWN_ENGLISH_ONLY`, yang hanya boleh mengandungi gaya tanpa sebarang terjemahan —
gaya yang disenaraikan tetapi mempunyai apa-apa terjemahan akan gagal dalam ujian; dan gaya akan gagal dalam ujian apabila
ia kehilangan bahasa yang disenaraikan oleh entri `BASELINE_LANGUAGES`-nya. Untuk menambah gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Pemampatan Hasil Alat

`compressToolResult()` dalam `open-sse/services/compression/toolResultCompressor.ts`
memampatkan teks hasil alat menggunakan **5 strategi**. Ia mencubanya mengikut urutan ini, dan
strategi didayakan pertama yang semakannya sepadan dengan kandungan akan menentukan hasilnya:

1. **`fileContent`**: kandungan 3 baris atau lebih dengan sekurang-kurangnya satu baris, selepas mengabaikan
   pengengsotan di hadapan, bermula dengan `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` atau `return ` (kata kunci diikuti ruang), atau dengan `if`,
   `for` atau `while` diikuti `(` atau ` (`, mengekalkan 20 baris pertama dan 5 baris terakhir,
   dengan bahagian tengah yang ditiadakan ditandakan.
2. **`grepSearch`**: kandungan yang mempunyai sekurang-kurangnya satu baris dalam bentuk `<path>:<digits>:`,
   dengan teks sebelum titik bertindih pertama tidak mengandungi ruang putih, hanya mengekalkan baris tersebut,
   sehingga maksimum 30 baris, diikuti kiraan padanan selebihnya dan senarai fail yang sepadan;
   setiap baris lain digugurkan. Satu baris sedemikian sudah memadai untuk mencetuskan strategi ini, maka
   baris log yang bermula dengan cap masa seperti `12:30:45` juga dikira.
3. **`shellOutput`**: output yang mengandungi jujukan ANSI CSI (`ESC[` diikuti digit atau
   koma bernoktah dan kemudian huruf, seperti dalam kod warna) atau `$` yang diikuti ruang putih
   di mana-mana sahaja dalam teks akan kehilangan jujukan tersebut (jujukan lepas lain, seperti `ESC[?25l` atau
   jujukan tajuk tetingkap OSC, dikekalkan) dan mengekalkan 50 baris terakhir, dengan baris berulang
   berturutan diringkaskan. Oleh sebab semakan ini dijalankan sebelum `json` dan `errorMessage`,
   output JSON atau ralat yang mengandungi `$` sedemikian tidak akan sampai kepada strategi tersebut selagi
   `shellOutput` dihidupkan.
4. **`json`**: muatan JSON melebihi 2,000 aksara yang bermula dengan `{` atau `[` (selepas
   ruang putih pilihan) dan berjaya dihuraikan akan diringkaskan: tatasusunan yang mempunyai lebih daripada 7 item mengekalkan
   5 item pertama dan 2 item terakhir serta jumlah keseluruhannya, manakala objek mengekalkan 20
   kunci pertamanya, dengan setiap nilai objek atau tatasusunan tersarang digantikan oleh ruang letak `{…N keys}`
   (bagi tatasusunan, N ialah panjangnya) dan penanda `_remaining_<N>_keys` yang mengira kunci
   yang digugurkan selepas 20 kunci pertama. Nilai skalar disalin sepenuhnya, maka objek dengan 20 kunci
   atau kurang tanpa nilai tersarang hanya diinden semula — objek yang diminimumkan akan bertambah aksara
   dan kekal tidak berubah.
5. **`errorMessage`**: output yang mengandungi, di mana-mana sahaja dan tanpa mengira huruf besar atau kecil, `error:`,
   `error ` (perkataan yang diikuti ruang, seperti dalam `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` atau `traceback` mengekalkan baris pertamanya,
   10 baris seterusnya dan 3 baris terakhir, dengan penanda `… [N frames elided] …` menggantikan
   baris di antaranya. Penanda hanya muncul apabila lebih daripada 13 baris mengikuti baris pertama,
   maka output ralat yang mempunyai 14 baris atau kurang tidak dipendekkan (pada 12 atau 13 baris,
   3 baris terakhir mengulangi baris yang telah dikekalkan).

Selepas sesuatu strategi sepadan, strategi berikutnya tidak akan dicuba, walaupun strategi itu tidak
menjimatkan apa-apa. Apabila strategi yang sepadan tidak menjimatkan anggaran token (panjang ÷ 4, dibundarkan ke atas) —
contohnya fail mirip kod yang mempunyai 25 baris atau kurang, atau tatasusunan JSON melebihi 2,000
aksara dengan 7 item atau kurang — enjin agresif mengekalkan hasil alat asal:
kedua-dua pemanggil (`compressAggressive()` dan `compressAnthropicToolResultBlock()`)
mengekalkan hasil asal apabila `saved` ialah 0 atau kurang, manakala `compressToolResult()` sendiri masih
mengembalikan output strategi tersebut. Langkah hasil alat bukanlah penentu terakhir:
peringkas sandaran enjin masih boleh memendekkan mesej `tool` atau `function` yang lebih panjang
daripada 8,192 aksara (`maxTokensPerMessage`, 2,048, didarab 4).

#### Masa untuk digunakan

Pemampatan hasil alat ialah langkah 1 enjin agresif (`compressAggressive()` dalam
`open-sse/services/compression/aggressive.ts`), maka ia dijalankan dalam mod Agresif dan dalam langkah
`aggressive` bagi saluran paip bertindan. Ia memampatkan mesej `tool` dan `function`
berbentuk OpenAI serta teks dalam blok `tool_result` Anthropic. Setiap strategi mempunyai
suis tersendiri di bawah `aggressive.toolStrategies`, dan semuanya dihidupkan secara lalai. Dalam papan pemuka,
suis tersebut berada dalam paparan **Advanced** pada halaman Caveman apabila pemampatan dihidupkan dan
mod lalai ialah Agresif.

### Saluran Paip Bertindan

Mod bertindan menjalankan **berbilang enjin secara berurutan** — lazimnya RTK terlebih dahulu
(penjimatan 60-90% pada output alat), kemudian Caveman pada teks yang berbaki (~46% penjimatan
input). Apabila digabungkan, julat layaknya ialah **78-95%** (lihat Matematik Penjimatan Huluan
di atas): `1 - (1 - 0.60..0.90) × (1 - 0.46)` memberikan purata ≈89%.

#### Cara ia berfungsi

```
Input (1000 token)
  → RTK (penapis peka perintah) → 200 token
    → Caveman (penyingkiran kata pengisi) → 108 token
  → Output (108 token, ~89% penjimatan)
```

#### Masa untuk digunakan

Gunakan mod bertindan untuk:

- Aliran kerja yang banyak menggunakan alat (pengekodan berasaskan ejen, penyelidikan)
- Pemprosesan kelompok yang sensitif terhadap kos
- Apabila anda memerlukan penjimatan token maksimum

Saluran paip bertindan dikonfigurasikan melalui tetapan pemampatan `stackedPipeline`
global, atau melalui gabungan pemampatan bernama yang ditetapkan kepada gabungan penghalaan (lihat
Penggantian Per Gabungan di atas) — bukan melalui `modePack` gabungan automatik (medan itu hanya
memberikan pemberat semula kepada pemilihan model gabungan automatik, dan `stacked` bukan nama pek yang sah).

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
