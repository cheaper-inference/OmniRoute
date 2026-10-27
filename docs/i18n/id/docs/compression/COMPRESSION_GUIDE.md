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

### Off

Tidak ada kompresi yang diterapkan. Semua pesan diteruskan tanpa perubahan.

### Lite Mode (penghematan ~15%, latensi <1ms)

Mode paling aman — nol perubahan semantik, hanya pembersihan format:

| Teknik                   | Deskripsi                                                     |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Menggabungkan baris kosong berurutan dan spasi di akhir baris |
| `dedupSystemPrompt`      | Menghapus pesan sistem yang duplikat                          |
| `compressToolResults`    | Mengompresi output tool/fungsi yang bertele-tele              |
| `removeRedundantContent` | Menghapus instruksi yang berulang                             |
| `replaceImageUrls`       | Memendekkan data URI gambar base64                            |

**Cocok untuk:** Penggunaan yang selalu aktif, alur kerja yang kritis terhadap keamanan.

### Standard Mode (penghematan ~30%)

Terinspirasi oleh [Caveman](https://github.com/JuliusBrussee/caveman) — menghapus kata-kata pengisi dan frasa bertele-tele sambil mempertahankan makna:

- Menghapus kata-kata pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa bertele-tele ("in order to" → "to", "as a result of" → "because")
- Menghapus basa-basi sopan ("Would you mind...", "If you could possibly...")
- 30+ aturan regex yang disetel untuk prompt coding

**Cocok untuk:** Alur kerja coding harian, tim yang sadar biaya.

### Aggressive Mode (penghematan ~50%)

Manajemen riwayat pintar untuk sesi yang panjang:

- **Message Aging** — pesan yang lebih lama dikompresi secara bertahap
- **Tool Result Compression** — output tool yang panjang dipotong atau dielisiasi (baris pertama/terakhir,
  pemfilteran baris yang cocok, pemadatan key JSON)
- **Structural Integrity Guards** — memastikan pasangan `tool_use` + `tool_result` tetap konsisten
- **Context Window Awareness** — mematuhi batas token per model

**Cocok untuk:** Sesi debugging yang panjang, basis kode besar.

### Ultra Mode (penghematan ~75%)

Kompresi maksimum untuk skenario kritis token:

- **Heuristic Pruning** — pemangkasan token prosa berbasis skor
- **Structure Preservation** — blok kode berpagar, kode inline, URL, dan identifier
  diberi tombstone dan dirangkai ulang secara verbatim, tidak pernah dipangkas
- **Tingkat SLM opsional** — model lokal kecil dapat menyempurnakan pemangkasan saat dikonfigurasi
- Independen dari mode Aggressive: tidak menjalankan message aging, kompresi hasil tool,
  atau peringkas fallback (hanya kegagalan tingkat SLM yang dapat mengarahkan
  proses fallback melalui aggressive)

**Cocok untuk:** Saat Anda berulang kali mencapai batas konteks.

### RTK Mode (rentang upstream 60-90%)

Mode RTK dioptimalkan untuk output tool yang bertele-tele yang muncul dalam sesi agen coding:

- Mendeteksi kelas perintah/output seperti `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/install, log Docker, output
  infra, dan output shell umum
- Menerapkan paket filter JSON dari `open-sse/services/compression/engines/rtk/filters/`
- Mengimpor filter RTK TOML skema v1 dari file `filters.toml` proyek atau global, dengan validasi
  uji inline dan trust-gating untuk file proyek
- Dilengkapi 56 filter bawaan dengan sampel verifikasi inline
- Menghapus urutan kontrol ANSI, progress bar, baris berulang, dan noise yang tidak dapat ditindaklanjuti
- Mempertahankan kegagalan, error, peringatan, file yang berubah, ringkasan, dan bagian akhir dari output panjang
- Mendukung filter proyek dengan trust-gating, filter global, dan pemulihan output mentah tersamarkan opsional

**Cocok untuk:** Sesi agen dengan transkrip shell, build, test, git, grep, dan output file.

### Stacked Mode (rentang yang memenuhi syarat 78-95%)

Mode Stacked menjalankan beberapa mesin kompresi dalam urutan deterministik. Pipeline default-nya adalah:

```txt
RTK -> Caveman
```

Urutan tersebut menjaga output terminal/tool tetap ringkas terlebih dahulu, lalu menerapkan kondensasi
semantik Caveman pada prompt bahasa alami yang tersisa. Pipeline Stacked dapat dikonfigurasi secara global
atau melalui kombo kompresi yang ditetapkan ke kombo routing.

**Cocok untuk:** Konteks campuran dengan log tool besar ditambah instruksi manusia atau ringkasan asisten.

---

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

Buka `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mode, paket bahasa, pratinjau, dan pengaturan bawaan global
- **RTK** — pratinjau filter perintah, pengaturan keamanan RTK, dan katalog filter
- **Kombinasi Kompresi** — pipeline mesin bernama yang ditetapkan ke kombinasi perutean
- **Ambang Pemicu Otomatis** — secara otomatis mengaktifkan kompresi ketika jumlah token melebihi ambang batas

### Penggantian Per Kombinasi

Di `Dashboard → Context & Cache → Compression Combos`, tetapkan kombinasi kompresi ke kombinasi
perutean:

```txt
Kombinasi: "free-tier-fallback"
  Kombinasi Kompresi: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Target:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Hal ini memungkinkan Anda menggunakan kompresi bertumpuk pada penyedia gratis/pemrograman sambil mempertahankan mode ringan pada
langganan berbayar.

Penetapan "Penggantian Per Kombinasi" ini merupakan kontrol yang berbeda dari penggantian **mode kompresi
kombinasi perutean** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — skema bidang tersebut
juga menerima `rtk`, `stacked`, dan `omniglyph`) — penggantian tersebut tidak memilih pipeline
kombinasi kompresi bernama; penggantian itu hanya menetapkan bidang `compressionMode` yang digunakan oleh
`resolveCompressionPlan`. Penggantian ini dapat ditetapkan pada kartu kombinasi (`Dashboard → Combos`) atau, sejak
#6760, per kombinasi perutean dalam daftar "Assign to routing" di
`Dashboard → Context & Cache → Compression Combos`, tepat di sebelah kotak centang penetapan pipeline
yang didokumentasikan di atas. Kedua antarmuka menyimpan perubahan melalui endpoint `PUT /api/combos/{id}` yang sama.

### Penggantian per permintaan

Kirim header permintaan `x-omniroute-compression` untuk mengganti rencana kompresi bagi satu
permintaan. Header ini memiliki prioritas tertinggi — mengesampingkan penggantian kombinasi perutean, profil aktif,
pemicu otomatis, dan pengaturan Default pada panel. Nilai yang tidak dikenal akan diabaikan (permintaan tidak pernah ditolak) dan
sakelar utama global tetap mengendalikan semuanya: ketika kompresi dinonaktifkan secara global, header tidak dapat
mengaktifkannya. Nilai:

| Nilai         | Efek                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tidak ada kompresi untuk permintaan ini.                                                                            |
| `default`     | Profil Default yang berasal dari panel (mengabaikan profil aktif). Mesin lossy tetap dinonaktifkan.                 |
| `safe`        | Sama seperti tidak menyertakan header: hanya deduplikasi dan peringkasan spasi kosong.                              |
| `allow-lossy` | Pertahankan rencana operator permintaan ini, termasuk ringkasan, filter relevansi, dan penulisan ulang gaya.        |
| `engine:<id>` | Satu mesin ketika diaktifkan, misalnya `engine:rtk`. Ini adalah persetujuan per permintaan untuk mesin tersebut.    |
| `<combo>`     | Kombinasi bernama, dicocokkan terlebih dahulu berdasarkan nama (tidak peka huruf besar/kecil), lalu berdasarkan id. |

Tanpa `allow-lossy`, `engine:<id>`, atau kombinasi bernama, mesin lossy tidak diterapkan.
Permintaan tetap mendapatkan deduplikasi sesi dan peringkasan spasi kosong ketika kompresi diaktifkan.

Rencana yang diterapkan dikembalikan dalam header respons `X-OmniRoute-Compression: <mode>; source=<source>`,
dengan `<source>` berupa salah satu dari `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, atau `off`.

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

# Cantumkan paket filter RTK
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

Selain 7 mode yang dijelaskan di atas (kode sumber juga menerima mode `codex-responses` dan
`omniglyph`, yang tidak dibahas dalam panduan ini), bagian di bawah membahas fitur-fitur
yang bekerja di dalam atau bersama mode-mode tersebut: Kompresi Hasil Alat dan Penuaan Progresif
merupakan langkah 1 dan 2 dari mesin agresif (mode Aggressive dan langkah `aggressive` dalam
pipeline bertumpuk), Pipeline Bertumpuk adalah cara mode Stacked dijalankan, Kompresi Sadar Cache
menurunkan `aggressive` dan `ultra` menjadi `standard` untuk penyedia yang mendukung caching saat
kompresi aktif, sedangkan Mode Output Caveman dan Gaya Output merupakan instruksi system prompt
opsional, yang secara default dinonaktifkan, yang membentuk output model alih-alih mengompresi permintaan.

### Kompresi Sadar Cache

Beberapa penyedia (seperti Anthropic dengan prompt caching) mendukung **prompt caching**,
yang memungkinkan mereka menyimpan bagian-bagian prompt dalam cache untuk mengurangi biaya dan latensi. Saat
caching diaktifkan, kompresi agresif justru dapat **merugikan** performa
karena kompresi tersebut mengubah token yang di-cache, sehingga membuat cache tidak valid.

Modul `cachingAware.ts` mengatasi hal ini dengan **mendeteksi konteks caching** dan
**menyesuaikan strategi kompresi** sebagaimana mestinya.

#### Cara kerjanya

1. **Mendeteksi konteks caching** — Memindai isi permintaan untuk penanda `cache_control`
2. **Mengidentifikasi penyedia caching** — Memeriksa apakah penyedia tujuan mendukung caching
3. **Menyesuaikan strategi** — Menurunkan `aggressive`/`ultra` menjadi `standard` untuk penyedia caching
4. **Melewati system prompt** — System prompt biasanya di-cache, jadi jangan mengompresinya

Helper strategi juga mengembalikan flag `deterministicOnly`, tetapi penyusun rencana hanya
menggunakan strategi tersebut — saat ini tidak ada komponen hilir yang membaca flag itu.

#### Contoh kode

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

#### Kapan digunakan

Kompresi sadar cache **selalu aktif** — tidak diperlukan konfigurasi. Fitur ini dijalankan setiap kali
kompresi aktif dan penyedia tujuan mendukung prompt caching (Anthropic, OpenAI,
dan sebagainya); penanda `cache_control` eksplisit tidak diperlukan — penyedia caching saja sudah
memicu penurunan strategi, sedangkan penanda saja tidak pernah memicunya (deteksi penanda memasok
telemetri cache, bukan keputusan strategi).

### Penuaan Progresif

Percakapan panjang mengakumulasi banyak giliran pesan, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **menurunkan tingkat detail pesan berdasarkan jarak giliran**
(jarak diukur dari akhir percakapan). Dengan nilai default yang disertakan
(`verbatim: 2, light: 2, moderate: 3`):

- **2 giliran terakhir (jarak ≤ 2)**: Dipertahankan apa adanya
- **Jarak 3**: Kompresi Caveman (penghapusan kata pengisi)
- **Jarak 4+**: Pesan asisten diringkas; pesan pengguna dikurangi menjadi baris
  pertamanya, dibatasi hingga 120 karakter; peran lain tidak diubah. System prompt, pesan yang
  sudah mengalami penuaan, dan pesan pengguna terbaru selalu dipertahankan apa adanya terlepas dari jaraknya.
  Tidak ada yang dihapus sepenuhnya, dan rentang `light`
  tidak dapat dicapai dengan nilai default yang disertakan (`light` sama dengan `verbatim`).

#### Contoh kode

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 giliran lagi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 giliran terakhir: apa adanya
  light: 8, // jarak <= 8: kompresi ringan
  moderate: 20, // jarak <= 20: kompresi caveman
  fullSummary: 5, // diwajibkan oleh tipe, tidak dibaca oleh kode pembagian rentang
  // jarak > 20: diringkas (asisten) / baris pertama dipertahankan (pengguna)
});

// saved = jumlah token yang dihemat
```

#### Kapan digunakan

Penuaan progresif **selalu aktif** untuk mode `aggressive` — ini merupakan langkah 2 dari
`compressAggressive()`. Mode Ultra tidak menjalankannya. Fitur ini
sangat efektif untuk:

- Sesi pemrograman yang berjalan lama
- Percakapan selama beberapa hari
- Alur kerja agentik dengan banyak pemanggilan alat

### Mode Output Caveman

Mode output Caveman menambahkan **instruksi system prompt** yang meminta model itu sendiri untuk
menghasilkan output ringkas — tingkat `lite` meminta jawaban singkat yang tetap menggunakan kalimat lengkap, `full`
memintanya untuk "merespons secara ringkas seperti manusia gua yang cerdas", dan `ultra` meminta output bergaya telegrafis;
instruksi hanya bersifat meminta, sehingga tidak dapat menjaminnya. Permintaan menerima instruksi tersebut melalui
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` terlebih dahulu menentukan pilihan dengan shim kompatibilitas mundur
(`resolveOutputStyleSelection()` dalam
`open-sse/services/compression/outputStyles/backCompat.ts`), yang, ketika `outputStyles`
kosong, memetakan `cavemanOutputMode` yang diaktifkan ke gaya output `terse-prose` pada
`cavemanOutputMode.intensity` (lihat Kompatibilitas mundur di bawah); pilihan `outputStyles`
yang tidak kosong digunakan apa adanya, lalu `cavemanOutputMode.enabled` dan `intensity` tidak
berpengaruh, sedangkan toggle `autoClarity` tetap berlaku. `outputMode.ts` menyimpan
teks instruksi (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), bypass konten, dan
helper penempatan yang digunakan oleh injeksi; injektor `applyCavemanOutputMode()` miliknya tidak memiliki
pemanggil produksi.

#### Cara kerjanya

Mode ini tidak memampatkan input. Mode ini menambahkan blok instruksi ke prompt sistem
(lihat Cara kerja injeksi di bawah), dan mode pemampatan input apa pun yang dipilih untuk permintaan
tetap dijalankan setelahnya, pada isi yang kini memuat blok tersebut. Sebelum klausa
batasan bersama yang mengakhiri setiap level, level `full` dalam bahasa Inggris berbunyi:

> "Jawab singkat seperti manusia gua pintar. Hilangkan kata sandang (a/an/the), pengisi (just/really/basically/actually/simply), basa-basi, keraguan. Fragmen boleh. Sinonim pendek (besar, bukan ekstensif; perbaiki, bukan implementasikan). Pertahankan semua substansi teknis, kode, galat, URL, dan pengidentifikasi persis."

Ini bekerja sangat baik khususnya untuk:

- Pembuatan kode (output lebih ringkas = lebih sedikit token)
- Tanya jawab cepat (tidak perlu penjelasan panjang lebar)
- Pemrosesan batch (memaksimalkan throughput)

#### Kapan digunakan

Mode output manusia gua bersifat **opt-in**. Dengan pemampatan aktif (`enabled: true`, tombol utama
aktif pada halaman Pengaturan Pemampatan), aktifkan menggunakan `cavemanOutputMode.enabled`; `intensity`
memilih `lite`, `full`, atau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Tombol **Mode Output** milik kombinasi pemampatan (`outputMode`, dengan level di `outputModeIntensity`)
mengatur opsi yang sama untuk permintaan yang menerapkan kombinasi tersebut, dan alat MCP
`omniroute_set_compression_engine` menuliskannya melalui argumen boolean `outputMode`.
Pilihan `outputStyles` yang tidak kosong lebih diprioritaskan daripada opsi ini. Di
dasbor, mengaktifkan gaya output **Prosa ringkas** akan menginjeksikan blok yang sama (lihat Gaya
Output di bawah).

### Gaya Output (katalog)

Mode output manusia gua di atas merupakan **jalur gaya tunggal lama**. Fase 4 menggeneralisasinya
menjadi katalog gaya output yang dapat dikomposisikan: `OUTPUT_STYLE_CATALOG` di
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya adalah instruksi prompt sistem
yang meminta model itu sendiri menghasilkan output yang lebih murah; beberapa gaya dapat diaktifkan
bersamaan dan diinjeksikan sesuai urutan katalog.

| Gaya                                       | `id`            | Fungsinya                                                                                                                                                                                                                                         | Bahasa instruksi                                 |
| ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Prosa ringkas                              | `terse-prose`   | Hilangkan pengisi/kata sandang/keraguan; pertahankan substansi teknis secara persis. Teksnya sama dengan mode output manusia gua lama (dirujuk, tidak ditulis ulang).                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Lebih sedikit kode                         | `less-code`     | Tangga YAGNI: perubahan berfungsi terkecil, tanpa abstraksi yang tidak diminta.                                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Kuncir kuda (developer senior pemalas)     | `ponytail`      | "Kode terbaik adalah kode yang tidak pernah ditulis": gunakan kembali > tulis ulang, akar masalah > gejala, diff berfungsi terpendek.                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Saya memiliki ADHD (tindakan lebih dahulu) | `i-have-adhd`   | Tindakan lebih dahulu (perintah/path/cuplik sebelum prosa), langkah bernomor dan terbatas, SATU langkah konkret berikutnya, tanpa pembukaan/ringkasan/penutup. Diadaptasi dari [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Filter UI antislop                         | `antislop-ui`   | Setiap teknik visual harus lolos uji tujuan (hierarki, identitas, keterbacaan); tanpa gradien/kaca/cahaya default, palet dibatasi, tanpa tata letak templat. Kedua gaya antislop menambahkan batasan tanpa kontrol mati / tanpa klaim rekaan.     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Filter salinan dan manusia antislop        | `antislop-copy` | Salinan spesifik (tanpa tanda pisah em, CTA generik, jargon, penutup chatbot, fakta rekaan) ditambah aturan manusia: kontras WCAG AA, fokus terlihat, akses keyboard, status kosong/pemuatan/galat, penataan ulang seluler.                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| CJK ringkas (文言)                         | `terse-cjk`     | Jawaban `full`/`ultra` dalam Bahasa Tionghoa Klasik (文言); `lite` hanya meminta jawaban singkat tanpa kata fungsi, basa-basi, atau hiasan.                                                                                                       | zh (dibatasi berdasarkan locale, lihat di bawah) |

Setiap gaya menyediakan tiga level intensitas — `lite`, `full`, `ultra` — dan setiap level
diakhiri dengan klausa batasan bersama (`SHARED_BOUNDARIES` di `outputMode.ts`), yang
mempertahankan blok kode, path file, perintah, galat, dan URL secara persis. Teks level
`terse-prose` dan `terse-cjk` menambahkan pengidentifikasi ke daftar tersebut.

`terse-cjk` dibatasi ke locale `zh` di dua tempat. Halaman Pengaturan Pemampatan hanya menampilkan
barisnya saat bahasa UI dasbor adalah bahasa Tionghoa (`zh-CN` atau `zh-TW`), dan
`applyOutputStyles()` hanya menginjeksikannya saat bahasa permintaan yang ditetapkan (lihat Pemilihan
bahasa di bawah) adalah `zh`. Menyembunyikan baris tidak menghapus pilihan `terse-cjk` yang tersimpan:
API pengaturan menerima id gaya apa pun, dan menyimpan gaya lain di halaman tetap mempertahankannya. Saat
permintaan berlangsung, pemeriksaan bahasa `applyOutputStyles()` adalah satu-satunya pembatas locale.

#### Cara kerja injeksi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) mencocokkan
pilihan dengan katalog (id yang tidak dikenal dan gaya yang tidak cocok dengan lokal
dihapus, tanpa pernah menghasilkan kesalahan; pilihan yang setelah dicocokkan tidak
menghasilkan gaya apa pun membiarkan isi tetap tidak berubah, dilewati sebagai
`no_styles`), menggabungkan instruksi yang dipilih sesuai urutan katalog,
menambahkan klausa batasan **satu kali** (ditambah klausa keamanan,
`SAFETY_BOUNDARIES` atau terjemahannya, ketika `less-code` atau `ponytail` dipilih), dan
memulai blok dengan satu penanda idempotensi (`[OmniRoute Output Styles]`), sehingga
penerapan ulang tidak melakukan apa pun. Ketika bahasa yang ditentukan (lihat Pemilihan
bahasa di bawah) memiliki terjemahan, instruksi yang telah dilokalkan disisipkan sebagai
pengganti bahasa Inggris.

Pada isi dengan array `messages` yang tidak kosong, pemeriksaan idempotensi dijalankan
sebelum bypass konten: ketika penanda `[OmniRoute Output Styles]` sudah ada di kolom
`system` tingkat teratas (berupa string atau array blok konten) atau di dalam pesan
sistem dengan konten string, isi dibiarkan tidak berubah sebagai `already_applied` dan
pemeriksaan kata kunci tidak dijalankan. Jika tidak, bypass konten
(`shouldBypassCavemanOutputMode()` di
`open-sse/services/compression/outputMode.ts`) memeriksa teks dari tiga pesan terakhir,
apa pun perannya, dan melewati gaya untuk keseluruhan giliran ketika teks tersebut cocok
dengan kata kunci keamanan, tindakan yang tidak dapat dibatalkan, atau klarifikasi,
maupun dengan urutan yang peka terhadap susunan: `first`, `then`, `after that`, `before`,
`rollback`, atau `backup` yang dalam rentang 240 karakter diikuti oleh `delete`, `drop`,
`migrate`, `deploy`, atau `release`. Bypass dijalankan selama tombol **Auto-Clarity
Bypass** (`cavemanOutputMode.autoClarity`, aktif secara default) aktif; menonaktifkan
tombol tersebut akan melewati pemeriksaan kata kunci.

Ketika bypass mengizinkan giliran diproses, `placeSystemInstruction()` (dalam file yang
sama), yang tidak pernah membuat `messages[0]` baru, menempatkan blok pada lokasi pertama
yang ditemukannya dari urutan berikut:

1. Pesan sistem awal dengan konten string: blok ditambahkan setelah teksnya.
2. Kolom `system` tingkat teratas: blok ditambahkan setelah teks string, atau
   ditambahkan sebagai blok teks baru ke array blok konten.
3. Pesan sistem berikutnya yang pertama dengan konten string: blok ditambahkan setelah
   teksnya.
4. Jika tidak ada satu pun dari yang di atas: blok dimasukkan ke dalam pesan sistem baru
   di akhir `messages`.

Pada isi tanpa array `messages` (atau dengan array kosong), bypass konten tidak
dijalankan dan kolom `system` tingkat teratas tidak diperiksa. Blok ditambahkan setelah
teks dalam kolom `instructions` bertipe string, kecuali jika kolom tersebut sudah
memuat penanda `[OmniRoute Output Styles]`; dalam hal ini, isi dibiarkan tidak berubah
sebagai `already_applied`. Ketika isi tidak memiliki kolom `instructions` bertipe
string tetapi membawa `input` (berupa string atau array), blok menjadi `instructions`,
menggantikan nilai non-string apa pun yang sebelumnya dimiliki kolom tersebut. Isi
yang tidak memiliki kolom `instructions` bertipe string maupun `input` bertipe string
atau array dibiarkan tidak berubah dan dilewati sebagai `no_messages`.

#### Cara mengaktifkan

Di dasbor: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), bagian Output styles: satu baris per gaya dengan tombol
aktif/nonaktif dan pemilih tingkat. Gaya disisipkan selama kompresi itu sendiri aktif
(tombol utama halaman, `enabled`). Tombol **Auto-Clarity Bypass** berada di halaman
**Caveman** (`/dashboard/context/caveman`), dalam kartu **Output Mode**. Secara
terprogram, konfigurasi kompresi menyimpan pilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilitas mundur: selama `outputStyles` kosong, pengaturan lama
`cavemanOutputMode.enabled` dipetakan ke `terse-prose` pada
`cavemanOutputMode.intensity`. Blok kemudian dimulai dengan penanda
`[OmniRoute Output Styles]`, sedangkan penyisip lama `applyCavemanOutputMode()`
menuliskan `[OmniRoute Caveman Output Mode]`. Di bawah penanda, teksnya sama dengan
sisipan lama dalam en, pt-BR, es, de, fr, it, ru, id, dan vi; dalam ja dan zh, teks
tersebut memiliki satu spasi tambahan sebelum klausa batasan. `terse-prose`
diterjemahkan ke dalam pt-BR, es, de, fr, it, ru, zh, ja, id, dan vi, sehingga
permintaan dengan bahasa hasil penentuan `hu` mendapatkan teks bahasa Inggris, sementara
penyisip lama menggunakan teks bahasa Hungaria.

Pemilihan bahasa gaya keluaran (`resolveOutputStyleLanguage()` di
`outputStyles/apply.ts`): ketika `languageConfig.enabled` aktif, `autoDetect` mengambil
sampel pesan pengguna terbaru dalam array `messages` permintaan yang memiliki teks
(konten string, atau `text` dari bagian kontennya) dan menjalankan pendeteksi milik
mesin Caveman (`detectCompressionLanguage()`) terhadapnya. Pendeteksi mengembalikan
`zh` untuk teks yang memiliki karakter Han tanpa kana; jika tidak, pendeteksi
mengembalikan bahasa dengan kecocokan petunjuk terbanyak di antara `it`, `pt-BR`, `es`,
`de`, `fr`, `ru`, `ja`, `hu`, dan `id`, serta `en` ketika tidak ada yang cocok — teks
yang tidak dapat diklasifikasikannya akan menggunakan bahasa Inggris, bukan
`defaultLanguage`, dan `vi` tidak pernah terdeteksi meskipun gaya menyediakan teks
`vi`. Isi Responses API menyimpan gilirannya di dalam `input`, yang tidak dijadikan
sampel, sehingga menggunakan `defaultLanguage`, lalu bahasa Inggris. Ketika tidak ada
pesan pengguna dalam `messages` yang memiliki teks, atau ketika `autoDetect` nonaktif,
`defaultLanguage` diterapkan, lalu bahasa Inggris. Ketika `languageConfig.enabled`
nonaktif, bahasanya adalah bahasa Inggris — kecuali jika kombo kompresi diterapkan pada
permintaan (kombo yang ditetapkan ke kombo perutean permintaan, atau kombo kompresi
default yang digunakan chatCore sebagai fallback untuk pipeline bertumpuk bawaan):
penerapan kombo mengaktifkan `languageConfig.enabled` untuk permintaan tersebut dan
menetapkan `defaultLanguage` dari paket bahasa kombo (nilai tersimpan jika merupakan
salah satu paket kombo, atau paket pertama kombo jika bukan, yang secara default adalah
`en`), sedangkan nilai `autoDetect` yang tersimpan (aktif secara default) tetap berlaku.
Mesin input Caveman memilih bahasa paket aturannya dengan cara berbeda — per bagian
teks dan, ketika deteksi otomatis nonaktif, dibatasi berdasarkan `enabledPacks`.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: setiap gaya katalog memerlukan
entri dalam `BASELINE_LANGUAGES` milik pengujian tersebut; gaya yang tidak dibatasi berdasarkan lokal harus menyertakan
terjemahan pt-BR (`terse-cjk` yang dibatasi berdasarkan lokal dikecualikan dari aturan ini), kecuali gaya tersebut
tercantum dalam `KNOWN_ENGLISH_ONLY`, yang hanya boleh memuat gaya tanpa terjemahan sama sekali —
gaya yang tercantum akan gagal dalam pengujian jika memiliki terjemahan apa pun; dan suatu gaya akan gagal dalam pengujian jika
kehilangan bahasa yang tercantum dalam entri `BASELINE_LANGUAGES` miliknya. Untuk menambahkan gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresi Hasil Alat

`compressToolResult()` dalam `open-sse/services/compression/toolResultCompressor.ts`
mengompresi teks hasil alat dengan **5 strategi**. Fungsi ini mencobanya dalam urutan berikut, dan
strategi aktif pertama yang pemeriksaannya cocok dengan konten akan menentukan hasilnya:

1. **`fileContent`**: konten sebanyak 3 baris atau lebih, dengan setidaknya satu baris, setelah
   indentasi awal diabaikan, dimulai dengan `import `, `export `, `function `, `class `,
   `const `, `let `, `var `, atau `return ` (kata kunci diikuti spasi), atau dengan `if`,
   `for`, atau `while` yang diikuti `(` atau ` (`, mempertahankan 20 baris pertama dan 5 baris terakhir,
   dengan bagian tengah yang dihilangkan diberi penanda.
2. **`grepSearch`**: konten dengan setidaknya satu baris berbentuk `<path>:<digits>:`,
   dengan teks sebelum titik dua pertama tidak mengandung spasi kosong, hanya mempertahankan baris-baris tersebut, maksimal
   30 baris, diikuti jumlah kecocokan tambahan dan daftar file yang cocok;
   setiap baris lainnya dihapus. Satu baris semacam itu sudah cukup untuk memicu strategi ini, sehingga
   baris log yang dimulai dengan stempel waktu seperti `12:30:45` juga dihitung.
3. **`shellOutput`**: keluaran yang mengandung urutan ANSI CSI (`ESC[` lalu digit atau
   titik koma, kemudian sebuah huruf, seperti dalam kode warna) atau `$` yang diikuti spasi kosong
   di bagian mana pun dalam teks akan kehilangan urutan tersebut (escape lain, seperti `ESC[?25l` atau
   urutan judul jendela OSC, tetap dipertahankan) dan mempertahankan 50 baris terakhir, dengan baris
   berulang yang berurutan diringkas. Karena pemeriksaan ini dijalankan sebelum `json` dan `errorMessage`,
   keluaran JSON atau galat yang mengandung `$` semacam itu tidak pernah mencapai keduanya selama
   `shellOutput` aktif.
4. **`json`**: payload JSON dengan lebih dari 2.000 karakter yang dimulai dengan `{` atau `[` (setelah
   spasi kosong opsional) dan berhasil diuraikan akan diringkas: array berisi lebih dari 7 item mempertahankan
   5 item pertama dan 2 item terakhir beserta jumlah totalnya, sedangkan objek mempertahankan 20
   kunci pertamanya, dengan setiap nilai objek atau array bertingkat diganti oleh placeholder `{…N keys}`
   (untuk array, N adalah panjangnya) dan penanda `_remaining_<N>_keys` yang menghitung kunci
   yang dihapus setelah 20 kunci pertama. Nilai skalar disalin secara utuh, sehingga objek dengan 20 kunci
   atau kurang tanpa nilai bertingkat hanya diberi indentasi ulang — objek yang diminifikasi justru bertambah panjang
   dan tetap tidak berubah.
5. **`errorMessage`**: keluaran yang mengandung, di bagian mana pun dan tanpa memedulikan kapitalisasi, `error:`,
   `error ` (kata tersebut diikuti spasi, seperti dalam `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]`, atau `traceback` mempertahankan baris pertamanya,
   10 baris berikutnya, dan 3 baris terakhir, dengan penanda `… [N frames elided] …` menggantikan
   baris-baris di antaranya. Penanda hanya muncul ketika lebih dari 13 baris mengikuti baris pertama,
   sehingga keluaran galat sebanyak 14 baris atau kurang tidak dipersingkat (pada 12 atau 13 baris,
   3 baris terakhir mengulangi baris yang sudah dipertahankan).

Setelah suatu strategi cocok, bahkan jika strategi tersebut tidak menghemat apa pun, strategi berikutnya tidak
akan dicoba. Ketika strategi yang cocok tidak menghemat estimasi token (panjang ÷ 4, dibulatkan ke atas) —
misalnya file mirip kode dengan 25 baris atau kurang, atau array JSON dengan lebih dari 2.000
karakter tetapi berisi 7 item atau kurang — mesin agresif mempertahankan hasil alat asli:
kedua pemanggil (`compressAggressive()` dan `compressAnthropicToolResultBlock()`)
mempertahankan hasil asli ketika `saved` bernilai 0 atau kurang, sedangkan `compressToolResult()` sendiri tetap
mengembalikan keluaran strategi tersebut. Langkah hasil alat bukanlah keputusan akhir:
peringkas fallback milik mesin masih dapat mempersingkat pesan `tool` atau `function` yang lebih panjang
dari 8.192 karakter (`maxTokensPerMessage`, 2.048, dikali 4).

#### Kapan digunakan

Kompresi hasil alat merupakan langkah 1 dari mesin agresif (`compressAggressive()` dalam
`open-sse/services/compression/aggressive.ts`), sehingga dijalankan dalam mode Agresif dan dalam
langkah `aggressive` pada pipeline bertumpuk. Fitur ini mengompresi pesan `tool` dan `function`
berformat OpenAI serta teks di dalam blok `tool_result` Anthropic. Setiap strategi memiliki
saklarnya sendiri di bawah `aggressive.toolStrategies`, dan semuanya aktif secara default. Di dasbor,
saklar tersebut berada dalam tampilan **Advanced** di halaman Caveman ketika kompresi aktif dan
mode default-nya adalah Agresif.

### Pipeline Bertumpuk

Mode bertumpuk menjalankan **beberapa mesin secara berurutan** — biasanya RTK terlebih dahulu
(penghematan 60-90% pada keluaran alat), lalu Caveman pada teks yang tersisa (penghematan masukan
~46%). Jika digabungkan, hasilnya adalah **rentang kelayakan 78-95%** (lihat Perhitungan Penghematan Hulu
di atas): `1 - (1 - 0.60..0.90) × (1 - 0.46)` rata-rata ≈89%.

#### Cara kerjanya

```
Masukan (1000 token)
  → RTK (filter berbasis perintah) → 200 token
    → Caveman (penghapusan kata pengisi) → 108 token
  → Keluaran (108 token, penghematan ~89%)
```

#### Kapan digunakan

Gunakan mode bertumpuk untuk:

- Alur kerja yang banyak menggunakan alat (pemrograman agentik, riset)
- Pemrosesan batch yang sensitif terhadap biaya
- Ketika Anda memerlukan penghematan token maksimum

Pipeline bertumpuk dikonfigurasi melalui pengaturan kompresi global `stackedPipeline`,
atau melalui combo kompresi bernama yang ditetapkan ke combo perutean (lihat
Pengesampingan Per Combo di atas) — bukan melalui `modePack` milik auto-combo (bidang tersebut hanya
mengubah bobot pemilihan model auto-combo, dan `stacked` bukan nama paket yang valid).

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
