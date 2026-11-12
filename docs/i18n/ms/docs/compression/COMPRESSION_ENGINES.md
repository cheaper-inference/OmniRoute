# Compression Engines (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Pemampatan OmniRoute dibina berasaskan kontrak enjin. Sesuatu mod boleh menjalankan satu enjin secara langsung
(`caveman` atau `rtk`) atau saluran paip bertindan yang deterministik, yang melaksanakan berbilang enjin mengikut turutan.

## Mod

| Mod          | Laluan enjin                                                                          | Input yang dimaksudkan                           |
| ------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `off`        | none                                                                                  | Pengekalan gesaan yang tepat                     |
| `lite`       | Caveman lite helpers                                                                  | Pembersihan berisiko rendah yang sentiasa aktif  |
| `standard`   | Caveman                                                                               | Pemeluwapan gesaan bahasa semula jadi            |
| `aggressive` | Caveman + history/tool summarizers                                                    | Sesi sembang yang panjang                        |
| `ultra`      | Caveman + pruning helpers                                                             | Pemulihan had konteks                            |
| `rtk`        | RTK                                                                                   | Output Terminal, shell, bina, uji, dan git       |
| `omniglyph`  | OmniGlyph                                                                             | Konteks-sebagai-imej pada wayar pembekal asli    |
| `stacked`    | Pipeline. The request default is `session-dedup -> lite`. `rtk -> caveman` is opt-in. | Log alat campuran dan prosa, penjimatan maksimum |

### Profil pemampatan OmniGlyph

Enjin `omniglyph` (pakej `omniglyph`, 1.4.0+) menerima profil semantik bernama, yang ditetapkan
secara global melalui `omniglyph.profile` dalam `compression settings` atau setiap langkah melalui
`stacked pipeline's step config`:

| Profil        | Sempadan                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `aggressive`  | Lalai. Polisi yang diukur oleh resit yang diterbitkan — images system, tool docs dan dense history |
| `balanced`    | Mengekalkan live state native, melindungi the last 8 turns, meruntuhkan older closed history       |
| `coding-safe` | Mengekalkan authority, tool schemas dan live tool output native, melindungi the last 12 turns      |
| `passthrough` | Menghala tanpa mengubah; the engine is skipped                                                     |

Profil adalah **siling, bukan lantai**: `mergeCompressionProfileOptions` dalam pakej
enggan membenarkan pemanggil menimpa membuka semula `lossy lane` yang ditutup oleh profil, jadi
`preserveSystemPrompt: false` setiap langkah tidak boleh mengaktifkan semula `system compression` di bawah `coding-safe`.

Diukur pada pangkalan kod ini: `coding-safe` dan `balanced` menaikkan `minCompressChars` ke
maksimumnya dan mengekalkan system, tool schemas dan tool results native, jadi sesi yang belum
mengumpul sejarah berhenti pada `below_min_chars` dan enjin tidak mengubah apa-apa. Itulah
sebabnya lalai adalah `aggressive` dan bukannya `safest profile`.

Pakej menyelesaikan `model scope` dan `profile` sendiri daripada `environment configuration`nya.
OmniRoute tidak pernah mewakilkan keputusan: `adapter pins` `model gate` kepada `package's`
`most restrictive scope`, jadi `host environment settings` hanya boleh mengecilkan `allowlist`,
tidak pernah meluaskannya melebihi `OmniRoute's measured receipts`.

## Pendaftar Enjin

Pendaftar terletak di `open-sse/services/compression/engines/registry.ts`. Enjin mendedahkan kontrak
bersama:

- `id`: id enjin stabil seperti `caveman` atau `rtk`
- `apply(text, config)`: laluan pelaksanaan legasi yang digunakan oleh saluran bertindan
- `compress(input, config)`: laluan pelaksanaan utama yang mengembalikan teks + statistik
- `getConfigSchema()`: mengembalikan bentuk seakan-JSON-Schema bagi konfigurasi yang sah
- `validateConfig(config)`: mengembalikan `{ valid, errors[] }`

Pendaftaran menggunakan `registerCompressionEngine(engine)` (atau `registerEngine` untuk kes lanjutan),
yang memanggil `assertValidEngine()` dan `validateConfig(defaultConfig)` sebelum menerima.
Gunakan `unregisterCompressionEngine(id)` untuk mengalih keluar enjin semasa masa jalan.

`strategySelector.ts` mendaftarkan enjin terbina dalam sebelum pemampatan dijalankan. Ini membolehkan pratonton,
pemampatan masa jalan, mod bertindan, ujian dan enjin akan datang menggunakan laluan pelaksanaan yang sama.

### Pemampatan perihalan MCP (berkaitan)

Pendaftar berasingan memampatkan metadata perihalan alat MCP pada peringkat pendaftar — lihat
`open-sse/mcp-server/descriptionCompressor.ts` dan [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ia menggunakan semula
peraturan Caveman tetapi beroperasi pada metadata alat, bukan muatan permintaan.

### Enjin terbina dalam tambahan

Selain Caveman, RTK dan LLMLingua-2, pendaftar menyediakan beberapa enjin tanpa kehilangan /
berstruktur yang khusus (digunakan oleh saluran bertindan, ruang uji dan ujian):

| Enjin         | Id              | Fungsinya                                                                                                                                                                            |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): menggantikan blok teks berterusan yang besar dengan rujukan beralamat kandungan, supaya blok berulang/besar dihantar sekali dan dirujuk selepas itu. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): pemadatan berjadual tanpa kehilangan bagi muatan tatasusunan JSON homogen kepada bentuk berkolum `[N rows]`.                                                 |
| ionizer       | `ionizer`       | Pensampelan baris kepala/tengah/ekor untuk blok homogen yang sangat besar, dengan menyimpan bahagian tengah yang ditiadakan sebagai rujukan beralamat kandungan CCR.                 |
| session-dedup | `session-dedup` | Penyahduplikasian merentas giliran beralamat kandungan (diilhamkan oleh TokenMizer): meniadakan teks yang telah dilihat dalam giliran terdahulu bagi sesi yang sama.                 |

**Arahan protokol pemerolehan CCR (#8033):** kali pertama CCR menggantikan ≥1 blok dalam sesuatu
permintaan, enjin menambahkan satu mesej `system` yang idempoten di hadapan (bermula dengan
sentinel `[CCR protocol]`) untuk menerangkan kepada pemanggil kontrak penanda → alat: maksud
penanda `[CCR retrieve hash=<24hex> chars=N]`, bahawa hash mesti disalin kata demi kata
(semua 24 aksara perenambelasan — hash yang tersilap salin berkemungkinan menjadi punca ralat
"block not found"), dan bahawa penanda `[dedup:ref sha=...]` bermaksud "rujuk kembali sejarah", bukan "panggil
alat". Nota tersebut disuntik **hanya apabila `tools[]` yang diiklankan oleh pemanggil membuktikan bahawa ia
benar-benar boleh mencapai `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` dalam
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — pemanggil biasa yang
serasi dengan OpenAI tanpa alat tersebut tidak akan menerima arahan untuk memanggil sesuatu
yang tidak boleh dicapainya. Keidempotentan dikuatkuasakan dengan mengimbas sejarah mesej untuk mencari sentinel
sebelum suntikan, supaya permintaan berbilang giliran (yang memainkan semula mesej terdahulu) tidak menimbunkan
nota sekali bagi setiap giliran.

## Caveman

Mod Caveman memfokuskan pemadatan semantik bagi prosa biasa:

- mengekalkan blok kod, URL, JSON, laluan dan data berstruktur
- membuang pengisi, ungkapan keraguan, konteks berulang dan frasa penghubung yang berjela-jela
- menyokong pek peraturan fail yang peka bahasa dalam `open-sse/services/compression/rules/`
- kekal tersedia melalui mod legasi `standard`, `aggressive` dan `ultra`

Permukaan papan pemuka ialah `Dashboard -> Context & Cache -> Caveman`.

Caveman huluan melaporkan `~75%` kurang token output, purata penjimatan output sebanyak `65%` dalam penanda aras
dengan julat `22-87%`, serta alat pemampatan input sebanyak `~46%`. OmniRoute menggunakan angka sisi input Caveman
semasa mendokumentasikan penjimatan prom/konteks bertindan; mod output Caveman kekal sebagai ciri
tingkah laku respons yang berasingan.

## RTK

Mod RTK memfokuskan output perintah dan alat:

- mengesan kelas output seperti `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  ujian Cargo/Go, binaan TypeScript/Vite/Webpack, ESLint, audit/pemasangan npm, log Docker,
  `find`/`grep` shell, surih tindanan dan log generik
- menggunakan 49 penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- menyokong saluran paip deklaratif gaya RTK: penyingkiran ANSI, penggantian, pintasan match-output,
  pembuangan/pengekalan baris, pemangkasan setiap baris, pemangkasan kepala/ekor/baris maksimum dan sandaran apabila kosong
- menyokong penapis projek berpagar kepercayaan dalam `.rtk/filters.json` dan penapis global dalam
  `DATA_DIR/rtk/filters.json`
- menyingkirkan jujukan ANSI, hingar kemajuan, baris berulang dan teks templat yang tidak membantu
- mengekalkan kegagalan yang boleh diambil tindakan, amaran, ringkasan, fail yang diubah dan konteks ekor
- secara pilihan boleh mengekalkan output mentah yang disunting untuk pemulihan/penyahpepijatan melalui laluan pengurusan
  yang disahkan

Permukaan papan pemuka ialah `Dashboard -> Context & Cache -> RTK`.

Butiran operasi untuk penapis tersuai, kepercayaan, pengesahan dan pemulihan output mentah tersedia dalam
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK huluan melaporkan penjimatan `60-90%` bagi pemampatan output perintah. Contoh READMEnya menunjukkan sesi
Claude Code selama 30 minit berubah daripada `~118,000` token kepada `~23,900`, atau penjimatan sebanyak `79.7%`.

## LLMLingua-2 (Pemangkasan Semantik)

Mod LLMLingua-2 melakukan **pemangkasan token semantik** pada prosa menggunakan pengelas token ONNX
yang kecil, melengkapi enjin Caveman dan RTK berasaskan peraturan:

- memampatkan prosa dalam mesej bukan sistem sahaja; blok kod berpagar dan binaan lain yang dikekalkan
  tidak pernah diubah
- menjalankan bahagian belakang `@atjsh/llmlingua-2` (ONNX melalui `@huggingface/transformers`) dalam
  bebenang pekerja, supaya inferens model tidak pernah menyekat gelung peristiwa permintaan
- **boleh ditindan** (`stackPriority` 35): dalam saluran paip bertindan, ia berjalan selepas
  enjin struktur (CCR, session-dedup, headroom, Caveman) tetapi sebelum `ultra`, kerana
  pemangkasan semantik paling berkesan pada teks yang telah dimampatkan secara struktur — contohnya
  `rtk -> caveman -> llmlingua`
- **membuka laluan jika berlaku sebarang ralat** (kebergantungan pilihan tiada, penghasilan pekerja, pemuatan model, inferens
  atau tamat masa) → teks asal dikembalikan tanpa perubahan, bukan ralat

Lokasi enjin: `open-sse/services/compression/engines/llmlingua/`. Permukaan papan pemuka
ialah `Dashboard -> Context & Cache -> LLMLingua`.

### Model

Model lalai ialah **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
pantas). Model **BERT-base** dengan ketepatan lebih tinggi (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) tersedia melalui medan `model` dalam konfigurasi enjin. `@huggingface/transformers`
memuat turun model yang dipilih secara malas daripada HuggingFace Hub ke dalam
`${DATA_DIR}/models/llmlingua` pada panggilan pertama (`modelStore.ts`); penggantian konfigurasi `modelPath`
mengarahkan ia kepada salinan setempat (pemasangan luar talian / terasing daripada rangkaian).

### Kebergantungan pilihan & pemasangan atas permintaan

Tindanan rakan setara masa jalan LLMLingua yang boleh dipangkas adalah **pilihan**. Dua pakej diisytiharkan sebagai
`optionalDependencies` dalam `package.json` dan dikekalkan sebagai **luaran** oleh binaan pengeluaran
(`scripts/build/prepublish.ts` tidak menggabungkannya):

| Pakej                | Versi (ditetapkan) | Catatan                                                         |
| -------------------- | ------------------ | --------------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Pakej kemasukan; mengisytiharkan yang lain sebagai rakan setara |
| `js-tiktoken`        | `^1.0.20`          | Pentoken                                                        |

`@huggingface/transformers` ditetapkan pada `^4.2.0` (dikongsi dengan laluan pembenaman setempat dan
turut dijejaki ke dalam berkas kendiri); `@atjsh/llmlingua-2@2.0.5` bergantung secara rakan setara padanya dengan
`"^3.5.2 || ^4.0.0"`, maka kedua-dua Transformers.js v3 dan v4 disokong. Sejak 2.0.4,
`@atjsh/llmlingua-2` tidak lagi memerlukan `@tensorflow/tfjs`, yang menyingkirkan penyumbang tunggal
terbesar (TensorFlow.js) daripada tindanan SLM. Hanya dua pakej di atas merupakan rakan setara SLM
yang boleh dipangkas. `npm install` standard (pembangunan) memasang tindanan pilihan secara automatik melainkan kebergantungan
pilihan dikecualikan.

**Mengapa atas permintaan:** pakej yang diterbitkan di npm, berkas kendiri dan imej Docker
dihantar **tanpa** kebergantungan ini untuk kekal ringan. Apabila kebergantungan tersebut tiada, pagar kebergantungan
pekerja (prob penyelesaian `@atjsh/llmlingua-2` dalam `worker.ts`) gagal dan enjin
**membuka laluan secara senyap** — pemilihan LLMLingua tidak melakukan apa-apa (teks dikembalikan tanpa perubahan, tiada
ralat dicatat). Untuk mengaktifkannya dalam persekitaran yang dipangkas, pasang tindanan pilihan:

```bash
# tetapkan kepada versi yang diisytiharkan dalam optionalDependencies package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Penyingkiran `@tensorflow/tfjs` (2.0.4+) menghapuskan penyumbang ~800 MB yang sebelum ini dominan
— jejak yang tinggal terdiri daripada masa jalan transformers.js + onnxruntime-node,
serta model TinyBERT (~57 MB) yang dimuat turun pada penggunaan pertama (bukan melalui npm).

Mengikut persekitaran:

- **Pembangunan / `npm install`** — dipasang secara automatik melainkan anda memberikan `--omit=optional`
  (atau `--no-optional`). Tiada tindakan diperlukan.
- **npm global (`npm i -g omniroute`) / kendiri** — jalankan perintah pemasangan di atas dalam
  direktori pakej yang dipasang, atau pasang semula tanpa mengecualikan dependensi pilihan.
- **Docker** — tambahkan perintah pemasangan dalam lapisan imej terbitan; imej yang diterbitkan
  direka agar ringkas.
- **VPS (PM2)** — pasang ke dalam `node_modules` aplikasi, kemudian mulakan semula proses supaya
  worker menguji semula get tersebut.
- **Next kendiri mentah (`npm run build` → `.build/next/standalone/server.js`)** — surihan
  kendiri tidak menyertakan SAMA ADA worker ATAU dependensi pilihan, maka enjin beralih secara
  senyap kepada mod benarkan apabila gagal. `scripts/build/colocate-standalone.mjs` menerapkan semula kedua-duanya (esbuild worker +
  penutupan dependensi pilihan ke dalam pepohon kendiri); ia berjalan secara automatik melalui
  cangkuk npm `postbuild` selepas setiap binaan. Idempoten dan gagal secara lembut apabila dependensi tiada.

**Sahkan ia aktif:** apabila LLMLingua dipilih, prosa sebenar benar-benar mengecil (enjin
berhenti beralih kepada mod benarkan apabila gagal), dan permintaan pertama mencetuskan muat turun model ke dalam
`${DATA_DIR}/models/llmlingua`. Get tersebut sengaja menguji hanya `@atjsh/llmlingua-2` —
peer yang lain hanya menyokong ESM dan `require.resolve` menghasilkan ralat untuknya walaupun tersedia — maka
worker masih beralih kepada mod benarkan apabila gagal jika mana-mana peer benar-benar tiada semasa `import()`.

## Talian Paip Bertindan

Mod bertindan menjalankan langkah talian paip secara berurutan. Lalai ialah:

```txt
rtk -> caveman
```

Gunakan ini untuk sesi ejen pengekodan apabila gesaan menggabungkan output perintah dengan prosa manusia atau pembantu. RTK mengurangkan log alat yang bising terlebih dahulu, kemudian Caveman memampatkan bahasa semula jadi yang berbaki.

Langkah talian paip dikonfigurasikan dengan `stackedPipeline` dalam tetapan pemampatan atau melalui gabungan pemampatan.

Apabila kedua-dua enjin mengurangkan muatan layak yang sama, penjimatan berganda:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Penapis Pepohon Kebolehcapaian MCP

Penapis pintar pepohon kebolehcapaian MCP ialah lapisan pemampatan selepas pelaksanaan yang berjalan pada **hasil alat** MCP, bukan pada gesaan atau konteks. Penapis ini menyasarkan muatan pepohon kebolehcapaian dan petikan pelayar yang berjela-jela, yang dikembalikan oleh alat seperti Playwright, computer-use dan pelayan MCP automasi pelayar.

### Fungsinya

1. **Penyingkiran hingar** — mengalih keluar entri generik/teks kosong (`- generic:`, `- text: ""`)
2. **Perapatan item setara** — apabila ≥ `collapseThreshold` (lalai 30) baris berturutan merupakan pengulangan struktur, baris tersebut dirapatkan kepada `collapseKeepHead` baris pertama (lalai 10) + ringkasan kiraan + `collapseKeepTail` baris terakhir (lalai 5)
3. **Pengekalan rujukan** — penambat `[ref=eXX]` yang diperlukan oleh Playwright/computer-use tidak pernah diubah
4. **Pemangkasan keras** — jika teks selepas perapatan masih melebihi `maxTextChars` (lalai 50,000), teks dipangkas dengan petunjuk navigasi supaya ejen boleh terus bekerja

### Lokasi enjin

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← titik masuk smartFilterText()
  collapseRepeated.ts ← algoritma perapatan item setara
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurasi

Dikawal oleh `compression.mcpAccessibility` dalam tetapan global (migrasi 056). Konfigurasi lalai:

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

Penapis hanya digunakan pada muatan hasil alat yang `type`-nya ialah `"text"` dan panjangnya melebihi `minLengthToProcess`. Penapis ini tidak menjejaskan pemampatan gesaan atau muatan permintaan.

### Penjimatan yang dijangkakan

60–80% pada hasil alat petikan pelayar, bergantung pada kerumitan halaman. Algoritma perapatan ialah O(n) berdasarkan bilangan baris dan menambahkan kependaman yang boleh diabaikan.

### Penapis ini berbanding enjin pemampatan di atas

| Aspek            | Caveman / RTK / Bertindan   | Penapis kebolehcapaian MCP             |
| ---------------- | --------------------------- | -------------------------------------- |
| Sasaran          | Gesaan / konteks permintaan | Hasil alat MCP                         |
| Pencetus         | Tetapan mod pemampatan      | `compression.mcpAccessibility.enabled` |
| Skop             | Semua mesej SSE             | Hasil alat sahaja                      |
| Penambat rujukan | T/B                         | Dikekalkan tanpa syarat                |

---

## Gabungan Pemampatan

Gabungan pemampatan ialah profil pemampatan bernama yang boleh ditetapkan kepada gabungan penghalaan:

- `compression_combos`: menyimpan mod, saluran pemprosesan, konfigurasi RTK, konfigurasi bahasa dan penanda lalai
- `compression_combo_assignments`: memetakan gabungan pemampatan kepada gabungan penghalaan
- penyepaduan masa jalan menyelesaikan gabungan pemampatan yang ditetapkan sebelum penggantian gabungan generik
- analitik merangkumi `compression_combo_id` dan `engine`

Antara muka papan pemuka: `Dashboard -> Context & Cache -> Compression Combos`.

## Prasyarat / panduan pengendali (CCR & sesi-dedup)

CCR (`ccr`) dan `session-dedup` menggantikan atau memadam teks dan meninggalkan a** penanda** belakang. Bahagian ini ialah rujukan pengendali untuk pendawaian pelanggan, membaca dua penanda dan mendapatkan semula atau mendiagnosis kandungan yang hilang. Mekanik setiap enjin dibincangkan di atas; ini ialah lapisan "bagaimana saya menjalankannya".

### Pengangkutan & titik akhir

Pelayan MCP yang mendedahkan alat CCR boleh dicapai dengan tiga cara. URL asas lalai ialah `http://localhost:20128` (`OMNIROUTE_BASE_URL`):

| Pengangkutan                            | URL / perintah                          | Nota                                                                                                                                                      |
| --------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP boleh strim (pelanggan, disyorkan) | `http://localhost:20128/api/mcp/stream` | Titik akhir pelanggan MCP semasa bercakap dengan.                                                                                                         |
| Legacy SSE singleton                    | `http://localhost:20128/api/mcp/sse`    | Pengangkutan singleton yang lebih tua. Ia** menutup** sesi boleh distrim; gunakan pelanggan `streamable-http` terhadap `/api/mcp/stream`, bukan yang ini. |
| stdio                                   | `omniroute --mcp`                       | Untuk konfigurasi IDE MCP yang menghasilkan proses. Tiada bendera `--dev` ; `omniroute --mcp` ialah titik masuk stdio.                                    |

### Peringkat storan (apa yang kekal apabila dimulakan semula)

CCR ialah a** dua peringkat** simpan, bukan dalam ingatan sahaja:

- **Tahap dalam ingatan panas** — setiap blok had 2 MiB, setiap prinsipal 16 MiB, global 64 MiB. Entri lalai kepada TTL 24 jam (maksimum 7 hari). Pengambilan MCP penuh dari ingatan dihadkan pada 256 KiB; apa-apa yang lebih besar masih boleh dicapai melalui mod julat / grep.
- **Tier SQLite tahan lasak** (`ccr_blocks`, `COMPRESSION_CCR_DURABLE_STORE`, dihidupkan secara lalai) — menyandarkan peringkat dalam ingatan supaya satu blok bertahan dengan pengusiran LRU, mulakan semula atau pendaratan mendapatkan semula pada kejadian lain. Baris mengekalkan TTL blok itu, jadi blok melepasi TTL hilang dari kedua-dua peringkat.

Tiga pengawal mengekalkan tier bounded tahan lama — a blok kekal ingatan apabila:

1. blok sudah tamat** 512 KB** (`MAX_DURABLE_BLOCK_BYTES`);
2. masa jalan ialah masa jalan awan (tiada cakera tempatan);
3. `COMPRESSION_CCR_DURABLE_STORE=false`.

Jadi "blok hilang" bukanlah cerita mulakan semula secara menyeluruh: blok sub-512 KB pada masa jalan bukan awan tempatan kekal apabila dimulakan semula melalui peringkat tahan lama sehingga TTL habis. Lihat [rujukan Persekitaran](../reference/ENVIRONMENT.md) untuk pembolehubah.

### Dua penanda

| Penanda                               | Maknanya                                                                                                                                                                          | Apa yang patut dilakukan oleh model                                                                                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[CCR retrieve hash=<24hex> chars=N]` | Satu blok besar disimpan beralamat kandungan.                                                                                                                                     | Panggil `omniroute_ccr_retrieve` dengan** Cincang 24-hex disalin kata kerja** untuk mendapatkan semula teks asal.                                                                                                   |
| `[dedup:ref sha=…]`                   | `session-dedup` menghapuskan teks yang telah dihantar pada giliran awal sesi yang sama. Ini adalah sebuah** pandang belakang yang disengajakan** , bukan kerugian atau kesilapan. | buat** bukan** panggil sebarang alat dan lakukan** bukan** cuba "membina semula"nya. Kejadian pertama teks ialah salinan kanonik; giliran semasa tidak pernah ditulis semula, ia dikurangkan pada giliran kemudian. |

Tinjauan ke belakang `[dedup:ref]` ialah keputusan protokol yang disengajakan — tiada pembinaan semula pra-hantaran. Anggap ia sebagai "teks tepat ini sudah ada pada wayar lebih awal dalam sesi ini."

### Prasyarat pelanggan

- **Kunci (stdio):** pemanggil stdio tidak membawa identiti setiap permintaan, jadi ia mengesahkan dengan `OMNIROUTE_API_KEY` (ditetapkan dalam `env` pelayan MCP ). Tanpa itu pemanggil adalah tanpa nama dan alat yang memerlukan pengetua mungkin merendahkan.
- **`tools[]` adalah prasyarat suntikan.** Arahan protokol ambil semula CCR (#8033) disuntik** sahaja** apabila `tools[]` yang diiklankan permintaan itu membuktikan pelanggan benar-benar boleh mencapai `omniroute_ccr_retrieve`. Padanan ialah padanan segmen mengekori yang dibatasi oleh pemisah (`__`, `.`, `/`, `:`) — tidak pernah subrentetan kosong — jadi nama ruang nama seperti `mcp__gateway__omniroute_ccr_retrieve` masih dikira. `tools[]` yang tidak hadir atau tidak sepadan bermakna arahan _tidak_ disuntik, mengikut reka bentuk.
- **`codemode:false` (pelanggan OpenCode ).** OpenCode lalai kepada Mod Kod, yang mengiklankan hanya alat asalnya kepada model dan** tidak** letakkan alat MCP pada senarai `tools[]` asli. Tetapkan `codemode: false` pada entri pelayan MCP supaya alat `omniroute_ccr_*` diiklankan. Ini adalah a** pelanggan** tetapan, bukan satu OmniRoute. Ia belum mendapat arahan CCR yang disuntik lagi: OpenCode menamakan alat `<server>_<tool>`, jadi pelayan yang dipanggil `omniroute` mendedahkan `omniroute_omniroute_ccr_retrieve`, dan `_` bukanlah salah satu pemisah yang dipadankan.
- **Pengetua.** Penyimpanan dan pengambilan diasingkan setiap prinsipal yang disahkan (setiap kunci API ). Kunci melihat bloknya sendiri sahaja.

### Skop setiap alat

Penguatkuasaan skop sentiasa dihidupkan untuk pemanggil HTTP/SSE berskop sempit. Alat `omniroute_` CCR memerlukan:

| alat                     | Skop                |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

Skop yang hilang mengembalikan an** hasil ralat alat MCP** (`isError: true`, bukan HTTP 403 — `403 LOCAL_ONLY` ialah auth pengawal laluan gelung balik yang berasingan): `Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` Kunci jauh minimum boleh menahan `mcp:connect` (membenarkan ukiran tempatan sahaja `/api/mcp/` ) serta skop read/write khusus yang diperlukannya.

### Matriks pelanggan

| Pelanggan      | Pengangkutan                              | Konfigurasi untuk digunakan                                                                                                                                                                                                                           | `tools[]` diiklankan? ( arahan → CCR disuntik)                                                                                                                                                   |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kod Claude     | boleh strim-http                          | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                                                     | Ya — MCP-mampu; disuntik.                                                                                                                                                                        |
| Cursor / Cline | `stdio`** atau** `streamable-http`        | stdio: `omniroute --mcp` dengan `OMNIROUTE_API_KEY` dalam `env`; atau entri MCP jauh menghala ke `http://localhost:20128/api/mcp/stream` (lihat [Panduan Persediaan → MCP Konfigurasi Pelanggan](../guides/SETUP_GUIDE.md#mcp-client-configuration) ) | Ya — mengiklankan alat `omniroute_ccr_*`.                                                                                                                                                        |
| OpenCode       | boleh strim-http                          | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream`, tambah `codemode: false`                                                                                                                                                    | Alat yang diiklankan hanya dengan `codemode: false`; arahan masih tidak disuntik, kerana `omniroute_omniroute_ccr_retrieve` tidak sepadan (lihat [prasyarat Pelanggan](#client-prerequisites) ). |
| Serasi OpenAI  | HTTP serasi OpenAI (penyelesaian sembang) | pelanggan pelengkap sembang standard terhadap titik akhir serasi OpenAI                                                                                                                                                                               | **tidak pernah** — pemanggil biasa yang serasi dengan OpenAI tidak pernah diberitahu untuk memanggil alat dan arahan tidak disuntik.                                                             |

### Had pengambilan & penomboran

hasil teks alat MCP digunting di sekeliling `mcpAccessibility.maxTextChars` (lalai `50000`). Satu `full` mendapatkan blok dihadkan pada 256 KiB —** tiada pengambilan penuh tanpa had** . Apabila `chars=N` blok adalah besar, halamannya dan bukannya menarik keseluruhannya:

- Peraturan biasa:**`chars > 40000` → guna `mode`** , tidak pernah kosong kosong.
- `mode:"grep"` — regex `pattern` dipadankan baris demi baris, sehingga 1,000 baris yang sepadan (`unique: true` jatuh berulang), paling murah untuk "cari satu baris yang saya perlukan."
- `mode:"lines"` — julat baris 1 diindeks; memerlukan kedua-dua `start` dan `end`.
- `mode:"head"` / `mode:"tail"` — first/last `n` baris.
- kiraan baris `mode:"stats"` —, aksara dan bait tanpa badan.

Gunakan `mode:"lines"` dengan `start`/`end` untuk berjalan blok panjang dalam halaman dan bukannya meminta semuanya sekaligus.

### Penamaan alat

Alat mendapatkan semula pada masa ini dinamakan `omniroute_ccr_retrieve` (awalan `omniroute_` ialah penyelesaian bertarikh untuk perlanggaran nama silang pelayan). Nama alat akhiran sempadan yang lebih bersih dan pembetulan untuk hasil MCP JSON yang dipotong rentetan tengah dijejaki sebagai susulan huluan; halaman ini mendokumenkan tingkah laku semasa yang dihantar sahaja.

### Kitaran hayat sesi

Sesi boleh strim-HTTP melahu dan pelayan menuainya; tetingkap melahu dikonfigurasikan oleh `OMNIROUTE_MCP_SESSION_IDLE_MS`, jatuh kembali ke `DEFAULT_MCP_SESSION_IDLE_MS` dalam `open-sse/mcp-server/httpTransport.ts`. Gejala sesi terbiar adalah HTTP 404 dengan `Unknown Mcp-Session-Id` — ubatnya ialah menyambung semula atau memulakan semula sesi,**bukan** untuk memutar kunci, menukar skop atau menamakan semula alat.

## Antara Muka API

| Laluan                                 | Tujuan                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `/api/settings/compression`            | Tetapan pemampatan global (termasuk konfigurasi `mcpAccessibility`) |
| `/api/compression/preview`             | Pratonton sebarang mod pemampatan                                   |
| `/api/compression/language-packs`      | Senaraikan pek bahasa Caveman yang tersedia                         |
| `/api/context/caveman/config`          | Alias tetapan Caveman                                               |
| `/api/context/rtk/config`              | Nilai lalai dan tetapan RTK                                         |
| `/api/context/rtk/filters`             | Katalog penapis RTK                                                 |
| `/api/context/rtk/test`                | Titik akhir pratonton/ujian RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Pemulihan output mentah tersunting yang disahkan                    |
| `/api/context/combos`                  | CRUD gabungan pemampatan                                            |
| `/api/context/combos/[id]/assignments` | CRUD penetapan gabungan penghalaan                                  |
| `/api/context/analytics`               | Alias analitik pemampatan                                           |

Laluan pengurusan memerlukan pengesahan pengurusan atau semakan dasar kunci API.

## Alat MCP

Pemampatan menyediakan lima alat MCP:

| Alat                                | Skop                | Tujuan                             |
| ----------------------------------- | ------------------- | ---------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Tetapan, analitik, statistik cache |
| `omniroute_compression_configure`   | `write:compression` | Kemas kini tetapan global          |
| `omniroute_set_compression_engine`  | `write:compression` | Tetapkan mod dan saluran pilihan   |
| `omniroute_list_compression_combos` | `read:compression`  | Senaraikan gabungan pemampatan     |
| `omniroute_compression_combo_stats` | `read:compression`  | Baca analitik gabungan/enjin       |

## Skop & pengecualian

**Pembenaman tidak pernah dimampatkan.** `open-sse/handlers/embeddings.ts` tidak pernah memanggil sebarang
enjin pemampatan — kandungan permintaan/respons dihantar terus kepada pelaksana tanpa diubah.
Ini bersifat struktur pada masa ini (pembenaman dan pelengkapan sembang dikendalikan oleh pengendali yang berasingan), bukannya
semakan masa jalan, tetapi ini bermakna kebimbangan herotan vektor dalam #8034 tidak mempunyai permukaan pendedahan
dalam laluan pembenaman.

**Penapis pengecualian setiap model/titik akhir (#8034).** Untuk pelengkapan sembang, pengendali boleh menentukan
id model / sasaran `provider/model` yang tidak boleh dimampatkan sama sekali — langkah perlindungan yang berguna jika
pemampatan kelak disambungkan lebih dekat kepada laluan bersebelahan pembenaman, dan secara umumnya berguna
untuk mana-mana model yang memerlukan gesaan tepat bait demi bait (penilaian deterministik, awalan sensitif
cache dan sebagainya).

- Medan tetapan: `exclusions?: string[]` pada konfigurasi pemampatan global
  (`GET`/`PUT /api/settings/compression`), disimpan melalui ruang nama pemampatan `key_value` sedia ada
  (`src/lib/db/compression.ts`) — tiada jadual baharu.
- Tab papan pemuka: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaks corak: `*` ialah satu-satunya kad bebas. Setiap metakarakter regex lain dalam corak akan
  diapit sebelum pemadanan, maka `gpt-5.6` hanya sepadan dengan rentetan literal tersebut dan tidak sekali-kali dengan `gpt-5x6`
  (selamat daripada ReDoS, terbatas, tanpa pengkuantiti tersarang). Corak dipadankan tanpa mengira huruf besar atau kecil terhadap
  kedua-dua id model kendiri dan gabungan `provider/model` — `gpt-5-6`, `openai/gpt-5-6`,
  dan `openai/*` semuanya boleh digunakan, manakala `*` sahaja mengecualikan setiap model.
- Pemadanan: `isCompressionExcluded()` / `normalizeCompressionExclusions()` dalam
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` menyemak sasaran yang dikecualikan
  sejurus selepas menyelesaikan tetapan pemampatan, **sebelum sebarang enjin dijalankan**, dan menganggap padanan
  sama seperti pemampatan dilumpuhkan secara global — kandungan permintaan terbukti
  seiras bait demi bait. Langkauan tersebut direkodkan melalui `writeCompressionSkip(..., "excluded")` untuk
  keterlihatan analitik.
- Lalai (senarai kosong/tiada): sama seperti tingkah laku sebelum #8034 — tiada apa-apa yang dikecualikan.

## Batasan yang diketahui

- **LLMLingua-2 (SLM) memerlukan kebergantungan pilihan yang ditempatkan bersama.** Worker hanya berjalan dalam binaan
  pengeluaran apabila `@atjsh/llmlingua-2` + rakan setaranya ditempatkan bersama ke dalam
  `dist/node_modules` (lihat `scripts/build/colocateOptionals.mjs`, #4286). Tanpanya,
  enjin akan gagal secara terbuka (mengembalikan teks asal). Resolusi worker tidak lagi bergantung pada
  `import.meta.url` (ia gagal dalam berkas kendiri) — sebaliknya, ia berasaskan
  cwd masa jalan / `argv[1]`.
- **Pek bahasa Caveman `de` / `fr` / `ja` adalah separa.** Pek tersebut menyertakan peraturan `context` +
  `filler` + `structural` tetapi tiada pek `dedup` / `ultra`, maka keamatan `ultra`
  tidak lebih kuat daripada `full` untuk bahasa tersebut (ia hanya menggunakan peraturannya sendiri — tiada
  penurunan balik secara senyap kepada peraturan `dedup`/`ultra` bahasa Inggeris, yang boleh merosakkan teks bahasa asing).
  `en` / `es` / `id` / `pt-BR` adalah lengkap. Sumbangan `dedup.json` + `ultra.json`
  untuk pek separa amat dialu-alukan.
- **Telemetri bertindan hanya menyenaraikan enjin yang melakukan pemampatan.** Langkah saluran paip bertindan yang
  enjinnya berjalan tetapi menghasilkan penjimatan 0 % mengembalikan `stats:null`, lalu tidak muncul dalam
  `engineBreakdown` — tidak dapat dibezakan daripada langkah yang dilangkau. Membezakan
  "berjalan, 0 %" daripada "dilangkau" memerlukan perubahan model pecahan dan ditangguhkan.

## Pengesahan

Pintu yang difokuskan untuk kawasan ini ialah:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
