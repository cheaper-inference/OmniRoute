# Guardrails (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber kebenaran:** `src/lib/guardrails/`
> **Terakhir diperbarui:** 2026-08-29 — v3.8.51 (provenans transkrip Video Bridge dideklarasikan oleh pemanggil,
> belum diverifikasi oleh server — diperjelas sesuai #11661)

Guardrail memberlakukan keamanan, kebijakan, dan transformasi konten pada batas
antara OmniRoute dan penyedia upstream. Setiap guardrail dapat memeriksa (dan
secara opsional menolak, mentransformasi, atau menganotasi) payload permintaan (`preCall`) dan
respons upstream (`postCall`).

Sistem ini bersifat **fail-open**: jika guardrail melemparkan error saat dijalankan, registry
mencatat error tersebut dan melanjutkan ke guardrail berikutnya alih-alih menggagalkan
permintaan. Pemblokiran merupakan keputusan eksplisit (`block: true`), bukan terjadi secara tidak sengaja.

## Guardrail Bawaan

Registry secara otomatis memuat enam guardrail berdasarkan urutan prioritas saat diimpor
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Prioritas | Nama                | Tahap          | File                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Angka prioritas yang lebih rendah dijalankan **lebih dahulu**.

### Vision Bridge (`visionBridge.ts`) — Jembatan Modalitas PR-1

Mencegat permintaan yang memuat gambar dan ditujukan ke **model non-vision**, lalu mengalihkan seluruh permintaan ke model yang mendukung vision atau mengganti bagian gambar dengan deskripsi teks yang dihasilkan oleh model vision yang dapat dikonfigurasi sebelum pemanggilan upstream. Hal ini memungkinkan penyedia khusus teks menangani payload multimodal secara transparan.

Alur:

1. Lewati jika model target sudah mendukung vision (kecuali jika model tersebut tercantum dalam daftar bridge paksa `isVisionBridgeForcedModel`).
2. Ekstrak bagian gambar melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mendelegasikan ke **detektor media terpadu**
   `detectMediaParts()` di `open-sse/utils/mediaParts.ts` — satu-satunya sumber
   acuan yang juga digunakan bersama filter kompatibilitas combo.
   Ekstraksi menggunakan daftar yang diizinkan, terbatas pada bagian tingkat atas
   dengan bentuk yang dapat disisipkan kembali oleh `replaceImageParts` (kontrak
   ekstrak↔ganti): `image_url` OpenAI, `source.type:"base64"` berbasis base64
   Anthropic, `source.type:"url"` Anthropic, dan `input_image` Responses API.
   Temuan bertingkat dan bentuk yang hanya berupa indikator merupakan materi
   filter combo dan tidak pernah diekstrak. Lewati jika tidak ada yang ditemukan.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kunci pengaturan
   `modalityBridge*` yang baru lebih diutamakan; kunci lama `visionBridge*`
   tetap menjadi **fallback satu siklus** (jendela rollback). Lewati sebelum
   penelusuran media apa pun saat bridge dinonaktifkan.
4. Pemilih mode (`modalityBridgeVisionMode`, lihat tabel di bawah) menentukan
   pengalihan rute atau pendeskripsian. Pengalihan rute mengembalikan
   `modifiedPayload` dengan hanya `model` yang ditukar, beserta meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Jalur pendeskripsian: batasi gambar hingga `maxImages`, susun prompt yang
   mempertimbangkan tugas, periksa cache deskripsi, panggil model vision
   **secara paralel** (`Promise.allSettled`), lalu masukkan bagian teks
   `[Image N]: <description>` sebagai penggantinya. Pendeskripsian yang gagal
   menghasilkan `null` dan bagian gambar asli **dipertahankan** (#4012) —
   kecuali pada jalur pendeskripsian combo ketika semua pendeskripsian gagal;
   dalam kasus tersebut, upstream yang telah dipastikan tidak mendukung vision
   menerima stub `(unavailable — no vision-capable provider connected)` sebagai
   gantinya (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mode (`modalityBridgeVisionMode`)

| Mode       | Default | Perilaku                                                                                                                                                                                                                                                                                                         |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristik lama, tidak diubah (#6640/#7204): model non-combo/`auto/` dialihkan ke model vision terbaik, kecuali model asli sudah memiliki kredensial yang dapat digunakan (maka dideskripsikan); target combo selalu dideskripsikan.                                                                              |
| `describe` |         | Selalu deskripsikan — blok pengalihan rute dilewati sepenuhnya; model pilihan pengguna selalu memberikan jawaban.                                                                                                                                                                                                |
| `reroute`  |         | Paksa pengalihan rute: guard untuk mempertahankan model berkredensial dilewati. Guard kredensial **target** pengalihan rute tetap berlaku — ketika tidak tersedia target vision yang dapat digunakan, permintaan beralih ke pendeskripsian agar gambar mentah tidak pernah mencapai backend khusus teks (#8430). |

Mode paksa melakukan short-circuit **sebelum** heuristik otomatis dijalankan; perilaku `auto`
identik per byte dengan guardrail sebelum PR-1.

#### Cakupan kunci API (`visionBridgeKeyScope.ts`)

Ketika kunci API pemanggil membatasi `allowedConnections`, pool kuota
(`allowedQuotas`), atau model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge hanya
memilih model pengalihan rute dan pendeskripsian yang boleh digunakan oleh
kunci tersebut, pada koneksi yang boleh digunakan oleh kunci tersebut.
Pemanggilan pendeskripsian kemudian selalu melewati self-loop OmniRoute dengan
header `x-omniroute-self-loop-key-id`, sehingga permintaan chat yang menerima
akan menerapkan kembali kebijakan koneksi dan model milik kunci tersebut.
`enforceApiKeyPolicy()` hanya mematuhi header tersebut jika digunakan bersama
bearer self-loop, sehingga akses hanya dapat dipersempit, dan ID yang tidak
dapat di-resolve akan ditolak.

Jika tidak ada model vision yang diizinkan untuk kunci tersebut, jalur
pendeskripsian tidak melakukan intervensi dan permintaan diteruskan tanpa
perubahan, dengan perilaku fail-open yang sama seperti guardrail yang
dinonaktifkan (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Permintaan tanpa kunci, serta kunci tanpa pembatasan ini, berperilaku sama
persis seperti sebelumnya.

#### Prompt pendeskripsian yang mempertimbangkan tugas (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks dari **pesan pengguna terakhir** (dipotong hingga 500 karakter) ke prompt
deskripsi dasar, sehingga mengarahkan deskripsi pada hal yang benar-benar diminta
pengguna (pola codex-vision-proxy) dan meminta model visi untuk mentranskripsikan
teks yang terlihat. Jika flag dinonaktifkan — atau tidak ada teks pengguna —
prompt dasar digunakan tanpa perubahan.

Permintaan yang kompatibel dengan OpenAI milik self-loop deskripsi itu sendiri (`callVisionModelSingle()`
di `visionBridgeHelpers.ts`) selalu meminta `image_url.detail: "high"` —
tanpa syarat, untuk setiap pemanggil/penyedia, dan tidak bergantung pada sinyal
klien apa pun. Pengambilan sampel dengan detail rendah menurunkan akurasi OCR
untuk tugas transkripsi teks yang diminta prompt ini, sehingga panggilan deskripsi
itu sendiri selalu meminta detail tinggi, terlepas dari tingkat detail yang
digunakan permintaan masuk asli. Ini hanya memengaruhi body permintaan deskripsi
internal; hal ini tidak mengubah cara OmniRoute meneruskan `image_url.detail`
milik pemanggil pada permintaan utama — default tersebut diterapkan secara
terpisah, dan hanya untuk klien OpenCode yang terdeteksi, dalam
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang
format wire Anthropic dari self-loop deskripsi tidak memiliki field `detail`
dan tidak terpengaruh oleh kedua default tersebut.

#### Batas output deskripsi (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Rentang            |
| ------------------------------ | ------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`     | `0` atau 100–50000 |

`0` (default) berarti **tanpa batas** — deskripsi yang dikembalikan oleh
`callVisionModel()` diteruskan tanpa perubahan, mempertahankan perilaku yang
ada. Nilai apa pun dalam rentang 100–50000 memotong deskripsi dengan akhiran
`…` sebelum disisipkan kembali sebagai `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` di `src/lib/guardrails/visionBridge.ts`).
Naikkan nilai ini untuk tugas OCR yang sarat detail ketika model downstream
memerlukan transkripsi lengkap; turunkan untuk membatasi penggunaan token pada
model visi yang terlalu banyak menghasilkan teks. Field dasbor berada di panel
Advanced pada tab Vision (`modality-bridge-max-chars` di
`ModalityBridgeVisionTab.tsx`) dan membatasi nilai apa pun antara 1 dan 99 ke
batas minimum 100, sembari membiarkan nilai eksplisit `0` tidak berubah —
`0` merupakan nilai Zod yang valid secara mandiri
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan sekadar
default "belum diatur".

#### Cache deskripsi (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output deskripsi, digunakan bersama di
seluruh proses. Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
dengan framing berprefiks panjang (tanpa benturan batas field). Komponen model
adalah model bridge yang **dikonfigurasi**, bukan model yang benar-benar
menjawab — `callVisionModel` dapat melakukan fallback secara internal, dan
pembuatan key per percobaan akan memecah cache. Deskripsi yang gagal tidak
pernah disimpan dalam cache. Pengaturan:

| Key                             | Default | Rentang |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasi gambar jarak jauh (deskripsi self-loop/pengambilan base64)

Ketika bridge mengambil sendiri gambar **jarak jauh** — panggilan mandiri
deskripsi Anthropic dan konversi base64 berformat wire Claude
(`ensureBase64ImagesForClaudeWire`), keduanya melalui
`fetchRemoteImageAsDataUri()` di `visionBridgeHelpers.ts` — URI data yang
dihasilkan diteruskan melalui `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sebelum disematkan dalam permintaan model
visi. Gambar yang terlalu besar diperkecil hingga memiliki **sisi terpanjang
2048px** (sesuai dengan batas pengubahan ukuran yang telah diterapkan OpenAI/Anthropic
di sisi server), sehingga mengurangi byte/latensi unggahan tanpa mengubah apa
yang dilihat model visi. Pengubahan ukuran menggunakan `sharp`, yang dimuat
melalui impor dinamis: pada platform tempat binary native-nya gagal dimuat,
`normalizeDataUri()` **tidak pernah melempar error** — fungsi tersebut melakukan
fallback dengan meneruskan byte asli tanpa perubahan, sehingga jalur
deskripsi/konversi base64 selalu tetap berfungsi. Byte non-gambar (hasil
pengambilan yang tidak mengembalikan gambar yang dapat didekodekan) juga
diteruskan tanpa perubahan. Normalisasi ini dibatasi pada gambar yang diambil
bridge untuk panggilan mandirinya sendiri — normalisasi tidak pernah diterapkan
pada payload passthrough mentah milik pemanggil, selaras dengan prinsip mutasi
hanya jika dipilih (Hard Rule #20).

#### Skema pengaturan + migrasi

Key `modalityBridge*` baru divalidasi oleh Zod dalam `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan grup
`modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi
`141_modality_bridge_settings.sql` menyalin nilai legacy `visionBridge*` yang
ada ke key baru yang sesuai (idempoten, tidak pernah menimpa nilai
`modalityBridge*` yang telah ditetapkan operator); key legacy tetap diterima
sebagai fallback pembacaan selama satu siklus rilis.

#### Header transparansi + statistik

Respons yang ditransformasi melalui deskripsi membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibuat oleh `buildModalityBridgeHeader()` di `modalityBridge/bridgeStats.ts`,
ditambahkan oleh `withModalityBridgeHeader()` di `src/sse/handlers/chatHelpers.ts`).
Permintaan yang dialihkan ulang **tidak** mendapatkan header — payload tidak
diubah dan pertukaran model sudah terlihat dalam field `model` pada body respons.

`GET /api/modality-bridge/stats` (autentikasi manajemen, tingkat yang sama dengan
`GET /api/settings`) mengembalikan penghitung per modalitas dalam memori
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percobaan,
sebagai penyebutnya; operasi tanpa pengukuran waktu tidak membuat sampel nol
milidetik secara artifisial. `bridged` tetap menjadi alias yang kompatibel ke
belakang untuk konversi yang berhasil; percobaan yang gagal tidak
menambah nilainya.
Penghitung direset saat proses dimulai ulang sesuai desain
(telemetri, bukan akuntansi).

#### Konfigurasi dasbor

Halaman dasbor khusus berada di
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`,
dan `Video` yang dapat diakses melalui URL mempertahankan parameter kueri saat
mengganti nilai `tab`.
Tab Vision menyediakan pengaktifan, mode, pemilihan model (termasuk default
otomatis), prompting berbasis tugas, batas lanjutan untuk timeout/gambar/panjang
deskripsi/cache, penghitung runtime, dan permintaan sampel yang dilindungi.
Tab Audio juga aktif: tab ini menyediakan pengaktifan, pemilih model khusus STT
dengan Auto, batas timeout/durasi klip maksimum, penghitung audio, dan pengujian
sampel `input_audio`. Tab Video berfungsi penuh: tab ini melaporkan status runtime
FFmpeg/ffprobe — salah satu dari empat status UI eksplisit (`unknown` saat
pemeriksaan sedang berlangsung atau tidak dapat diselesaikan, `restricted` pada
host dasbor non-loopback saat pemeriksaan dilewati di sisi klien, `unavailable`
setelah diperiksa dan dipastikan tidak tersedia, atau `available` beserta versi
FFmpeg/ffprobe) — mempertahankan batas pengaktifan/model/frame/video/timeout,
memfilter pemilih model agar hanya menampilkan model yang mendukung visi, dan
menyediakan penghitung video.

Kartu Vision Bridge sebelumnya di bawah pengaturan AI kini menjadi tautan
kompatibilitas ke halaman baru; kartu tersebut tidak lagi memiliki salinan kedua
formulir. Media Providers juga menautkan alur kerja Image-to-Text dan
Speech-to-Text ke tab Modality Bridge yang sesuai tanpa menghapus playground
Speech-to-Text yang sudah ada.

**Bypass penerimaan self-loop:** saat panggilan deskripsi dirutekan melalui
self-loop `/v1` milik OmniRoute sendiri (model penyedia nonstandar), subpermintaan
mengirimkan `x-omniroute-admission-bypass: internal` dan diautentikasi dengan
kredensial self-loop yang telah di-resolve — sentinel lokal `sk_omniroute` dalam
mode lokal, atau kunci env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang
dikonfigurasi operator (#1350), sehingga deployment dengan
`REQUIRE_API_KEY=true` tetap dapat menjalankan panggilan deskripsi. Bypass hanya
diterima untuk kredensial yang sama persis tersebut, sehingga klien eksternal
tidak dapat menggunakan header itu untuk melewati penerimaan.

Default lama berada di `src/shared/constants/visionBridgeDefaults.ts`; default
mode/task-aware/cache baru dan resolver pengaturan berada di
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail menyediakan opsi
konstruktor `deps` agar pengujian dapat menyuntikkan implementasi palsu
`getSettings` dan `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Mencegat permintaan chat yang memuat audio sebelum mencapai target yang tidak
diketahui dapat menerima input audio. Ini tidak pernah mengalihkan rute
permintaan chat: bagian audio ditranskripsikan melalui endpoint multipart
kompatibel OpenAI yang sudah ada, dan model chat yang dipilih melanjutkan proses
dengan transkrip teks.

Alur:

1. Resolve `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   registry penyedia eksplisit diprioritaskan, lalu metadata model statis,
   kemudian `modalities_input` yang disinkronkan. Daftar input yang dideklarasikan
   tanpa `audio` bernilai `false`; jika tidak ada bukti kapabilitas, nilainya tetap
   `null`. Baik `false` maupun `null` mengaktifkan bridge konservatif, sedangkan
   `true` melewatinya.
2. Resolve pengaturan `modalityBridgeAudio*` dan ekstrak bagian audio tingkat atas
   yang dapat disisipkan dari setiap pesan melalui detektor bersama
   `detectMediaParts()`. Bentuk wire yang didukung adalah `input_audio` OpenAI,
   `audio_url`, dan `source.media_type: "audio/*"`. Audio bertingkat terdeteksi
   untuk perutean, tetapi tidak dihapus oleh jalur penyisipan. Pekerjaan dibatasi
   oleh `modalityBridgeAudioMaxClips`; bagian selanjutnya tetap tidak berubah.
3. Gunakan `provider/model` yang dikonfigurasi, atau biarkan
   `selectAudioBridgeModel()` menelusuri `AUDIO_TRANSCRIPTION_PROVIDERS` dalam
   urutan katalog yang stabil dan memilih model pertama dengan kredensial
   penyedia aktif yang dapat digunakan.
4. `callAudioTranscription()` mengonversi audio base64/data-URI menjadi `file`
   multipart, atau mengunduh `audio_url` jarak jauh melalui pengaman outbound
   khusus publik dengan DNS pinning dan batas 25 MB. Kemudian fungsi tersebut
   melakukan POST terhadap file dan model yang dipilih ke self-loop lokal
   `/v1/audio/transcriptions`, yang diautentikasi dengan
   `resolveSelfLoopBearer()`. Rute transkripsi yang sudah ada menjalankan
   pencarian kredensial, penanganan cooldown/batas laju, dan dispatch penyedia
   secara normal.
5. Panggilan yang berhasil mengganti bagiannya dengan
   `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`:
   kegagalan individual mempertahankan bagian audio asli tersebut (kontrak
   #4012). Jika setiap panggilan gagal dan target terbukti memiliki
   `supportsAudio === false`, bagian tersebut menjadi
   `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk
   target yang tidak diketahui (`null`), hasil ketika semuanya gagal tetap tidak
   berubah. Target yang terbukti hanya mendukung teks dan tidak memiliki
   kredensial STT yang dapat digunakan menerima stub eksplisit yang sama tanpa
   melakukan panggilan jaringan.

Transkrip yang berhasil menggunakan cache LRU/TTL Modality Bridge untuk seluruh
proses. Kuncinya menggabungkan referensi audio, label operasi stabil
`audio-transcription`, dan model STT yang dipilih; kegagalan tidak pernah
disimpan dalam cache. Percobaan audio memperbarui penghitung bersama `bridged`,
`cacheHits`, `failures`, dan `lastUsedAt`. Respons yang ditransformasi membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak diubah tidak menerima segmen Audio Bridge.

Pengaturan runtime didukung oleh DB dan divalidasi dengan Zod:

| Kunci                         | Bawaan  | Rentang              |
| ----------------------------- | ------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Otomatis atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

Cache bersama tetap dikendalikan oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Bridge Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Mengintersepsi bagian video tingkat teratas dalam `messages` Chat Completions dan
`input` Responses API sebelum target yang diketahui tidak memiliki dukungan video
native dipanggil. Bentuk yang didukung adalah `input_video`, `video_url`,
`video_source`, URL HTTPS, dan URI data `data:video/*;base64,...`. Nama file biasa
dalam teks tidak diperlakukan sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) menangani penelusuran permintaan,
pemeriksaan kapabilitas/kebijakan, agregasi per permintaan, dan payload respons.
Pekerjaan per video — akuisisi, cache hasil keseluruhan, pendeskripsian urutan
frame (yang menggabungkan transkrip audio apa pun yang dideklarasikan oleh
pemanggil), serta metrik/pembatalan/pembersihan per upaya — disembunyikan di balik
`processVideoPart` dalam `videoBridgePipeline.ts`, yang dipanggil sekali untuk
setiap bagian video di dalam loop `preCall`. Modul tersebut juga mendefinisikan
batas port eksplisit `VideoMediaBrokerPort` (mengakuisisi byte dan mengekstrak
frame sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang
dideklarasikan pemanggil dengan keterangan frame sampel), dan
`VideoDrilldownPort` (batas persistensi penelusuran mendalam frame; belum
dihubungkan ke `processVideoPart` — saat ini hanya rute terpisah
`/api/modality-bridge/video/drilldown` yang menulis entri penelusuran mendalam).

Jalur permintaan publik `/v1` tidak pernah mengimpor atau menjalankan subproses.
Video jarak jauh diunduh dengan batas 50 MiB; video base64 inline memiliki batas
konservatif sebesar 36 MiB hasil dekode per video agar amplop
model/pesan/framing tetap berada dalam batas penerimaan permintaan JSON publik
sebesar 50 MiB. Panjang inline dan estimasi ukuran hasil dekode diperiksa sebelum
alokasi. HTTPS diwajibkan pada URL jarak jauh awal dan setiap pengalihan, dengan
menggunakan pengaman keluar khusus publik yang sudah ada dengan penyematan DNS.
Byte tersebut kemudian melewati batas broker internal yang tepat,
`POST /api/modality-bridge/video/extract`. Rute tersebut bersifat `LOCAL_ONLY`
dan `SPAWN_CAPABLE`, hanya menerima permintaan loopback tepercaya yang
diautentikasi per proses, serta tidak pernah menerima URL, jalur sistem file,
berkas yang dapat dieksekusi, atau daftar argumen. Pipeline ukuran isi API dan
pembaca isi inkremental milik handler secara independen menerapkan batas input
broker sebesar 50 MiB. Antrean terbatasnya menjalankan satu ekstraksi pada satu
waktu, mengizinkan empat pekerjaan tertunda, dan membatasi input tertunda hingga
100 MiB.

Di dalam broker, `ffprobe` membaca file lokal privat; daftar format tetap yang
diizinkan mengecualikan format daftar putar dan manifes. Untuk kontainer keluarga
MOV yang diizinkan, referensi data MOV eksternal tetap dinonaktifkan secara
bawaan, dan perintah tetap tersebut tidak mengaktifkannya. Baik `ffprobe` maupun
`ffmpeg` menggunakan daftar putih protokol khusus `file`, satu thread, array
argumen tetap, tanpa shell, dan berkas yang dapat dieksekusi yang ditemukan dari
`PATH`. Stream gambar sampul terlampir bukan kandidat yang dapat diputar. Semua
stream yang dapat diputar harus memenuhi batasan, dan stream bawaan eksplisit
diprioritaskan sebelum fallback deterministik dengan indeks terendah. Video
dibatasi hingga 600 detik, 8.192 piksel per dimensi, dan 33.554.432 piksel
sumber. FFmpeg mengambil sampel 1–16 frame JPEG titik tengah, memperkecil sisi
panjang hingga maksimal 1.024 piksel tanpa memperbesar input yang lebih kecil,
dan tidak pernah menerima URL. Pengambilan sampel secara bawaan adalah
`uniform`. Kebijakan opsional `scene_aware` dan eksperimental `segment_aware`
melakukan satu lintasan FFmpeg tetap tambahan atas stream lokal yang telah
divalidasi, memilih stempel waktu adegan `showinfo` yang dibatasi, dan melakukan
fallback secara deterministik ke titik tengah seragam yang sama jika detektor
gagal, mengalami timeout, menghasilkan keluaran yang salah format, atau
menghasilkan kumpulan kandidat kosong. Mode berbasis segmen mengalokasikan
sampel titik tengah secara proporsional terhadap interval adegan yang telah
divalidasi; bukti berbasis segmen dan perilaku fallback dijelaskan secara
mendetail di bawah. Batas maksimum 16 frame diterapkan setelah pemilihan pada
setiap kebijakan. Ketika permintaan berbasis adegan hanya memiliki anggaran satu
frame, permintaan tersebut menggunakan titik tengah seragam dari seluruh video
aktif atau jendela fokus dan melaporkan `policyEffective: uniform`: satu frame
adegan terpilih tidak dapat mempertahankan kedua ujung temporal. Pemanggil secara
opsional dapat menyediakan jendela fokus terbatas (`start`/`end` dalam detik);
batasnya dijepit ke durasi media, jendela terbalik atau nonfinite ditolak, dan
semua kebijakan pengambilan sampel hanya dilakukan dalam interval yang telah
dinormalisasi. Jendela yang dihasilkan disertakan dalam metadata pengambilan
sampel dan dalam prefiks deskripsi yang tidak tepercaya agar model hilir dapat
membedakan cuplikan terfokus dari linimasa lengkap.

Fokus keterangan semantik merupakan pengaturan terpisah dan eksplisit. Mode
analisis bawaan `full` mempertahankan prompt frame yang sudah ada dan tidak
pernah meneruskan teks permintaan ke model keterangan. Dalam mode `focused`,
bridge hanya membaca `text`/`input_text` terbaru yang tidak kosong dan dibuat
oleh pengguna dari kontainer Chat atau Responses yang sama, menormalisasinya ke
NFC, merapatkan karakter kontrol dan spasi putih, serta membatasinya hingga 500
titik kode Unicode. Hasil kosong akan melakukan fallback ke prompt `full` yang
sama persis. Petunjuk yang dapat digunakan diserialisasi sebagai JSON dalam blok
konteks pengguna tidak tepercaya khusus dan hanya boleh memprioritaskan detail
yang dapat diamati; petunjuk tersebut tidak dapat mengesampingkan peringatan
terpisah agar tidak mengikuti instruksi yang terlihat atau terdengar di dalam
media. Fokus tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah
pengambil sampel temporal.

#### Bukti segmen struktural FU-07

`segment_aware` menggunakan satu lintasan pra-analisis berbatas pada stream video lokal yang telah divalidasi. Rantai filter tetap terlebih dahulu menskalakan video hingga lebar maksimum 320 piksel, mendeteksi perubahan adegan dan interval beku, lalu mengambil sampel dengan laju 1 frame per detik untuk mengukur keburaman, luma rata-rata, serta informasi spasial/temporal. Lintasan ini dibatasi hingga 600 sampel struktural, satu thread FFmpeg/filter, daftar izin protokol khusus `file` dan kontainer yang sama, batas keluaran proses sebesar 1 MiB, serta maksimum 30 detik dalam pembatalan/tenggat bersama milik broker. Lintasan ini tidak pernah menerima perintah, filter, jalur, atau URL dari permintaan.

Nilai struktural merupakan bukti pengambilan sampel yang deterministik, bukan pemahaman semantik terhadap video. Nilai tersebut tidak menyimpulkan subjek, tindakan, teks keterangan, ucapan, atau maksud pengguna. Batas adegan dan pembekuan membentuk segmen; cakupan pembekuan, keburaman, eksposur, detail spasial, dan perubahan temporal hanya memengaruhi cara anggaran 1–16 frame yang sudah ada dialokasikan. Segmen yang sepenuhnya beku dibatasi maksimal satu frame, sedangkan segmen yang tidak beku bersaing untuk memperoleh sisa anggaran. Ketika jumlah batas melebihi jumlah frame, cakupan linimasa yang seragam dipertahankan agar potongan cepat di bagian awal tidak dapat menyembunyikan segmen panjang di bagian akhir. Batas adegan yang berada dalam resolusi analisis 1 detik dari batas pembekuan digabungkan.

Filter yang tidak tersedia, bukti yang rusak/kosong, kesalahan detektor, atau habisnya waktu pra-analisis berbatas akan gagal secara terbuka dan kembali ke kebijakan titik tengah seragam yang persis sama. Pembatalan oleh pemanggil atau tenggat broker tidak gagal secara terbuka: kondisi tersebut menghentikan subproses yang sedang berjalan, mencegah ekstraksi frame berikutnya, dan pohon sementara privat dihapus dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menghasilkan fixture FFmpeg nyata yang deterministik untuk mengukur penghematan pemanggilan pembuatan teks keterangan setelah deduplikasi, alokasi anggaran pada gerakan padat, bukti keburaman/eksposur/SI-TI, potongan cepat dengan bagian akhir yang panjang, dan positif palsu akibat transisi memudar bertahap. Skrip ini mencatat waktu nyata pra-analisis dan, jika `/usr/bin/time` tersedia, CPU proses anak serta RSS puncak. Pemeriksaan kualitasnya hanya berupa oracle struktural. Kualitas model pembuatan teks keterangan nyata tetap berstatus `HOLD` karena harness ini tidak memiliki endpoint yang diotorisasi atau penilai yang dibekukan. Penghematan moneter juga tetap berstatus `HOLD`, kecuali `--caption-cost-per-call-usd` memberikan estimasi positif per pemanggilan secara eksplisit; skrip tidak pernah merekayasa salah satu dari kedua hasil tersebut.

Setiap frame dibatasi hingga 4 MiB, seluruh frame mentah secara keseluruhan hingga 23 MiB, dan respons broker yang diserialisasi hingga 32 MiB. Direktori sementara privat dihapus dalam `finally`. OmniRoute tidak menyertakan FFmpeg dan tidak menerima jalur executable khusus. Sebelum membuat teks keterangan, bridge menerapkan lintasan deduplikasi visual yang konservatif: setiap JPEG diperkecil menjadi buffer skala abu-abu 16×16 dan hanya dibandingkan dengan frame terakhir yang dipertahankan. Untuk anggaran teks keterangan yang diminta di atas satu frame, ekstraksi menyediakan kumpulan kandidat berbatas hingga dua kali anggaran tersebut dan tidak pernah melebihi 16 frame. Batas yang diminta baru diterapkan setelah deduplikasi, dengan kandidat pertama dan terakhir yang dipilih tetap dipertahankan selama penjarangan akhir apabila anggaran setidaknya dua. Kebijakan berversi `grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta luma rata-rata dan rasio sel thumbnail dengan delta ternormalisasi setidaknya 0,05. Ambang duplikat adalah konstanta 0,04, yang dipilih demi prediktabilitas alih-alih diekspos sebagai pengaturan runtime. Sinyal sekunder berkontras tinggi ini mempertahankan gerakan kecil dan perubahan teks yang terlihat, yang dapat disembunyikan oleh perbandingan berbasis rata-rata saja. Kesalahan pembanding atau decoder akan gagal secara terbuka dan mempertahankan cakupan. Metadata keluaran memisahkan kandidat yang diekstrak, frame yang berhasil digunakan, dan duplikat visual yang dibuang.

Bagian video yang ditandai secara eksplisit dapat meminta lembar kontak dengan stempel waktu. Bridge membuat grid JPEG berisi maksimal 16 frame dalam paling banyak 4 kolom. Setiap sel berukuran 512 piksel menanamkan stempel waktu sumbernya ke dalam pita bawah berkontras tinggi, sementara stempel waktu yang sama tetap disertakan dalam metadata tekstual untuk pengaitan dan audit pada tahap hilir. JPEG lengkap tetap dibatasi hingga 32 MiB. Jika `sharp` tidak dapat mendekode atau menyusun grid, bridge akan kembali menggunakan masing-masing frame JPEG; pembatalan oleh klien tetap diteruskan selama operasi pembuatan lembar.

Bukti promosi sengaja dipisahkan dari microbenchmark komposisi sintetis. `scripts/perf/video-bridge-contact-sheet-eval.ts` mendefinisikan harness A/B dengan skema berversi untuk model visi nyata yang kompatibel dengan OpenAI. Harness ini mengukur token yang dilaporkan penyedia, latensi nyata ujung ke ujung (termasuk penyusunan lembar), jumlah pemanggilan model, dan retensi fakta yang ditentukan manifes. Respons model mentah tidak ditulis ke laporan; hanya digest SHA-256 dan ID fakta yang cocok yang dipertahankan. Harness tidak melakukan panggilan jaringan atau model berbayar kecuali `--execute-real` diteruskan dan `--model`, `OMNIROUTE_BASE_URL`, serta `OMNIROUTE_API_KEY` telah dikonfigurasi. Tanpa eksekusi nyata yang eksplisit tersebut, verdict yang dapat dibaca mesin tetap berstatus `HOLD`; pengukuran payload/jumlah pemanggilan sintetis saja bukan merupakan bukti promosi.

Pemanggil dapat melampirkan array `transcript.cues` opsional ke bagian video yang didukung apabila mereka sudah memiliki teks yang selaras. Setiap cue harus memuat `text`, interval `start`/`end` terbatas yang berada dalam durasi hasil probing, serta `source` dalam daftar izin (`client`, `embedded`, atau `audio-bridge`); nilai default `confidence` adalah `1` dan harus tetap berada di antara `0` dan `1`. Cue duplikat yang identik digabungkan. OmniRoute tidak pernah memulai transkripsi berdasarkan metadata ini: cue yang divalidasi disalin ke hasil yang dideskripsikan beserta sumber, tingkat keyakinan, dan intervalnya, lalu dirender sebagai pengamatan yang tidak tepercaya bersama teks keterangan frame. Teks yang tidak valid, berada di luar rentang, atau tidak memiliki provenans ditolak alih-alih dicampurkan ke dalam stream teks keterangan. Kedua saluran transkrip isi permintaan menormalisasi provenans yang diberikan menjadi `client`, termasuk label `embedded` atau `audio-bridge` yang dinyatakan sendiri. Hanya adapter milik server yang dapat menetapkan label tepercaya tersebut melalui argumen khusus kode `trustedSource`; field JSON permintaan tidak dapat mencapai argumen itu. Teks transkrip tetap merupakan konten tidak tepercaya yang berasal dari media, terlepas dari provenansnya, dan tidak boleh pernah menentukan otorisasi.

Pemanggil tingkat lanjut dapat menyediakan trek `audioTranscript` untuk video yang sama;
trek tersebut diperlakukan sebagai teks yang disediakan klien, bukan bukti transkripsi server.
Lapisan fusi menjalankan observasi visual dan audio dengan satu tenggat waktu dan
sinyal pembatalan, mengurutkannya pada linimasa yang sama, menggabungkan
duplikat identik, dan melaporkan hasil parsial ketika hanya satu sisi yang berhasil.
`audioTranscript` yang tidak valid menurun menjadi hasil parsial tersebut — deskripsi
visual dipertahankan dan cabang audio mencatat kode kegagalan yang telah disanitasi —
alih-alih menggagalkan seluruh video. Ketersediaan per cabang, penanda parsial,
dan kode kegagalan yang telah disanitasi dipertahankan dalam hasil yang dideskripsikan, dalam
metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam penghitung
fusi bridge. Jalur Video Bridge default tidak memanggil speech-to-text
atau mengunduh salinan media kedua; tanpa trek eksplisit tersebut, jalur ini tetap
hanya menggunakan video.

**Retensi transkrip (#12150 P1).** Ini berlaku secara otomatis setiap kali
Video Bridge (yang juga bersifat opsional) merender cue transkrip — tidak ada
penanda retensi terpisah. Ketika suatu permintaan merender cue transkrip apa pun
(`transcript` yang dideklarasikan pemanggil atau `audioTranscript` yang telah difusikan),
guardrail menandainya sebagai `videoBridgeObserved` dan menghasilkan bayangan video
yang telah disunting dari deskripsi video — rendering identik yang mengganti isi
teks bebas setiap cue dengan `[redacted-video-transcript]`, yang dibuat dengan
mengganti kolom cue terstruktur sebelum string dirangkai (tidak pernah dengan
mengurai teks yang telah diratakan, sehingga tidak ada isi cue — baik yang bersifat
adversarial maupun biasa, termasuk isi yang mengandung `]` seperti
`[inaudible]`/`[music]` — yang dapat bertahan). Isi permintaan log panggilan yang
dipersistenkan mengganti setiap bagian teks yang berasal dari video dengan bayangan
yang telah disunting tersebut, yang dicocokkan berdasarkan kesamaan konten;
jangkar `fullText` dibaca ulang dari payload guardrail pra-panggilan yang telah
selesai, sehingga pencocokan tetap berhasil setelah guardrail berantai berikutnya
(penyamar PII dan kredensial, prioritas 10/95) menulis ulang teks deskripsi secara
langsung dan setelah injeksi prompt sistem/handoff/memori membentuk ulang larik
pesan. Isi yang dikirim ke model upstream tidak berubah. Permintaan yang teramati
juga tidak mengisi Memory persisten apa pun (ekstraksi yang berasal dari permintaan
maupun respons dilewati), sehingga balasan model sendiri tidak dapat menyalin teks
transkrip ke dalam Memory.

**Kolom video mentah (#12430).** Ketika bridge diaktifkan dan dukungan video native tidak diketahui atau tidak tersedia, kolom `transcript`/`audioTranscript` yang didefinisikan juga mengaktifkan `videoBridgeObserved`, bahkan setelah kegagalan deskripsi atau batas `maxVideos`. `null` dan string kosong tetap dihitung; kolom yang tidak ada dan metadata non-video tidak dihitung. Salinan yang dipertahankan menyunting kolom-kolom ini atau menghilangkan permintaan, serta melewati cache/Memory.

Pada jalur fallback tersebut, cue pemanggil yang valid menjadi bagian
`text`/`input_text` yang didukung, bukan kolom penyedia nonstandar. Kedua trek
yang disediakan dalam permintaan tetap menjadi observasi `client` yang tidak
tepercaya, dengan peringatan eksplisit bahwa video tidak dideskripsikan dan
stempel waktu tidak diverifikasi terhadap media. Batas gabungan 256 cue/64 KiB
dan batas per cue yang sudah ada berlaku untuk kedua trek secara keseluruhan;
stempel waktu harus berada dalam batas maksimum 600 detik milik broker dan
jendela fokus yang disediakan. Trek yang tidak valid dibuang, bukan diteruskan
sebagai teks sembarang; trek pasangan yang valid masih dapat digunakan kecuali
batas gabungan keduanya terlampaui. Kolom null/kosong tidak menambahkan teks.
Fallback ini tidak menambahkan pengambilan media atau transkripsi.
Kolom ekstensi transkrip dihapus dari pembawa video fallback serta objek
`video_url`/`source` miliknya. Daftar izin wire OpenAI tetap ketat; pembawa video
dengan dukungan native yang tidak diketahui tetap tersedia dan target yang
diketahui hanya mendukung teks tetap mempertahankan penanda aman.
Bayangan penyuntingan terstruktur melindungi teks transkrip yang ditambahkan,
sementara permintaan asli milik pemanggil tetap tidak berubah. Target yang
mendukung native dan bridge yang dinonaktifkan mempertahankan perilaku bypass
yang sudah ada.

Salinan tambahan yang dipertahankan menggunakan sinyal permintaan teramati yang
sama. Snapshot permintaan klien mentah pra-guardrail, permintaan tertunda dalam
memori, dan log permintaan yang ditolak lebih awal secara struktural mengganti
kolom transkrip dalam bagian video; prompt string yang disintesis oleh tahapan
pipeline dan handoff konteks disunting di tujuan akhir isi permintaan yang
dipersistenkan. Penanda `video_content_removed` yang dipersistenkan membuat
kelanjutan `previous_response_id` gagal secara tertutup alih-alih merekonstruksi
teks yang sengaja dibuang. Jika permintaan teramati kehilangan bayangan
penyuntingan per bagiannya sebelum pencatatan log, atau bahkan satu dari beberapa
bayangan video gagal cocok setelah mutasi permintaan berikutnya, isi permintaan
yang dipertahankan dihilangkan sepenuhnya alih-alih mempertahankan transkrip yang
hanya disunting sebagian.

Untuk permintaan yang teramati, respons model mungkin mengutip bagian mana pun
dari transkrip tanpa batas cue terstruktur. Oleh karena itu, `responseBody`
dalam log panggilan yang dipersistenkan diganti dengan penanda penghilangan;
artefak pipeline terperinci (yang dapat mencakup isi upstream/klien dan potongan
stream) tidak dipertahankan. Cache semantik, idempotensi, dan pemutaran ulang
penalaran melewati operasi baca dan tulis untuk permintaan tersebut. Permintaan
penyedia dan respons yang terlihat oleh klien tetap tidak berubah. Byte keepalive
awal dikuras dari buffer sementara ketika artefak terperinci dihilangkan.
Peringatan EventStream Kiro yang salah format hanya melaporkan jumlah byte
payload, tidak pernah isinya atau error mentah dari parser JSON.
Hal ini tidak mengklaim bahwa setiap diagnostik penyedia/plugin yang tidak
terkait telah diaudit; pemeriksaan lebih luas terhadap tujuan penyimpanan yang
dipertahankan dilacak dalam #11658.

Siklus hidup internal `/api/modality-bridge/video/drilldown` merupakan substrat cache terpisah yang diautentikasi melalui loopback/token. Setiap operasi juga memerlukan ID prinsipal opak kanonis. Sebelum pemanggil produksi diaktifkan, pemanggil tersebut harus memperoleh ID itu dari tenant yang terautentikasi dan tidak boleh meneruskan nilai yang dipilih klien. Kunci cache mengikat prinsipal tersebut dengan ID sesi dan referensi video kanonis, hanya menyimpan kunci turunannya yang berbasis SHA-256, serta membatasi pembacaan dan penghapusan pada prinsipal yang sama. Cache menyimpan paling banyak 16 frame JPEG turunan per entri, menghapusnya setelah sepuluh menit, dan mendukung pembacaan `start`/`end` yang dibatasi atau penghapusan sesi secara eksplisit.

Setiap prinsipal dibatasi hingga 16 entri dan 64 MiB data JPEG kanonis. Batas tersebut terpisah dari batas global sebanyak 64 entri/256 MiB: tekanan kuota prinsipal hanya mengeluarkan entri prinsipal tersebut yang paling lama tidak digunakan sebelum pengeluaran LRU global dipertimbangkan. Entri yang kedaluwarsa dibersihkan dari penghitungan prinsipal maupun global saat ada aktivitas cache, sedangkan pembatalan dan kegagalan validasi tidak melakukan commit atas penggantian parsial.

Cache menolak Base64 nonkanonis, padding berlebih, media non-JPEG, JPEG yang rusak atau terpotong, serta JPEG yang menghasilkan peringatan selama dekode gambar penuh `sharp` yang dibatasi. Cache mengodekan ulang setiap gambar yang diterima sebagai JPEG kanonis, memperoleh lebar dan tinggi dari byte hasil dekode alih-alih memercayai kolom dari pemanggil, serta membuang byte poliglot tambahan di akhir alih-alih menyimpannya. Hanya buffer terkompresi kanonis yang dibatasi yang diperhitungkan terhadap kedua kuota. Batas wire JSON mencakup overhead Base64 untuk batas input terdekode sebesar 32 MiB. Setiap derivasi yang disimpan mencatat format/resolusi JPEG yang telah divalidasi, kebijakan sampling, versi derivasi, waktu pembuatan, hash konten yang dihitung server, serta referensi induk yang di-hash beserta hash konten induk dari pemanggil tepercaya. Pembatalan diperiksa di antara fase dekode/hash asinkron sebelum commit cache atomik.

Tahap ini belum menghubungkan produsen produksi ke rute tersebut dan belum menyediakan pemilihan varian multiresolusi. Oleh karena itu, jalur permintaan Video Bridge yang transparan tidak menimbulkan pekerjaan tambahan, sementara derivasi prinsipal yang terikat tenant dan siklus hidup multiresolusi FU-08 secara penuh tetap menjadi pekerjaan lanjutan yang eksplisit, bukan didokumentasikan sebagai perilaku yang telah selesai.

Frame diberi caption secara berurutan menggunakan model Video yang dikonfigurasi. Override Video yang kosong mewarisi pengaturan Vision; jika keduanya kosong, auto-router Vision memilih model efektif yang mendukung penglihatan. Caption yang berhasil menggantikan bagian asli dengan prefiks stabil `[Video description:` yang juga menandai teks sebagai observasi tidak tepercaya yang berasal dari media dan memberi tahu model downstream agar tidak mengikuti instruksi yang ditemukan dalam media. Kunci cache caption frame mencakup byte JPEG, prompt, stempel waktu, dan model efektif; hanya caption yang berhasil yang di-cache. Entri cache mempertahankan model produsen aktual yang berhasil, termasuk model fallback; bridge melaporkan `mixed` saat frame yang berbeda dihasilkan oleh model yang berbeda. Cache hit menggunakan kembali identitas produsen tersebut alih-alih melabelinya ulang sebagai rencana routing yang diminta. Cache hasil seluruh video menggunakan sebagai kunci setiap input yang mengubah output — prompt, model efektif, kebijakan sampling, jumlah frame, mode analisis semantik, fingerprint SHA-256 dari petunjuk fokus yang dinormalisasi, jendela fokus, `transcript`, `audioTranscript`, dan flag contact-sheet — sehingga perubahan pada salah satu dimensi tersebut menghasilkan cache miss, bukan penggunaan ulang data usang. Versi kebijakan deduplikasi visual, ambang batas, dan jumlah frame kandidat yang dibatasi juga dicantumkan secara eksplisit dalam kunci serta metadata cache hasil; karena itu, perubahan kebijakan tidak dapat menggunakan ulang deskripsi seluruh video yang usang. Metadata cache hasil v4 menyimpan mode dan fingerprint, tetapi tidak pernah menyimpan tugas mentah pengguna. Metadata guardrail melaporkan mode analisis yang diminta maupun yang efektif; mode `focused` yang diminta tanpa teks pengguna yang dapat digunakan dilaporkan efektif sebagai `full`.

Guardrail mengekstrak setiap bagian video yang didukung, tetapi mendeskripsikan tidak lebih dari `modalityBridgeVideoMaxVideos`. Untuk target yang terbukti memiliki `supportsVideo === false`, video yang gagal dan yang melampaui batas diubah menjadi penanda teks aman yang eksplisit sehingga tidak ada video mentah yang lolos. Jika kapabilitas tidak diketahui, bagian tersebut mempertahankan pembawa videonya; setiap transkrip fallback mengikuti konversi teks terbatas di atas. Target dengan `supportsVideo === true` melewati bridge. Sinyal pembatalan permintaan klien diteruskan melalui pengunduhan, antrean broker, subproses, dan panggilan caption; pembatalan menghentikan proses di antara video dan tidak pernah gagal secara terbuka dengan meneruskan media mentah.

Pengaturan runtime disimpan di DB dan divalidasi oleh Zod:

| Kunci                               | Default     | Rentang / perilaku                                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opsional, harus diaktifkan secara eksplisit                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mempertahankan keterangan generik; `focused` menggunakan konteks pengguna terbaru yang terbatas dan tidak tepercaya |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` proporsional; kegagalan detektor akan kembali ke `uniform`                  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                             |

Nilai batas waktu Video lama yang tersimpan di atas 120 detik dibatasi hingga
tenggat broker; penulisan pengaturan baru di atas batas tersebut akan ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokalitas loopback tepercaya
yang telah diberi stempel sebelum autentikasi atau pemeriksaan runtime, kemudian
memerlukan autentikasi manajemen. Endpoint ini hanya mengembalikan `available`,
versi FFmpeg/ffprobe yang telah disanitasi, dan alasan tetap saat runtime tidak
tersedia. Endpoint ekstraksi internal bukan API unggahan publik: kejenuhan antrean
mengembalikan `503` beserta `Retry-After`, pemutusan koneksi oleh pemanggil
mengembalikan `499`, dan tenggat tetap broker mengembalikan `504`. Respons yang
dikonversi menambahkan `video->text;model=<visionModel>;parts=<videos>` ke header
pusat `x-omniroute-modality-bridge` tanpa menghapus segmen Vision atau Audio.

### Penyamar PII (`piiMasker.ts`)

Berjalan pada **kedua** tahap.

- **`preCall`** mengkloning payload, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item string biasa), lalu menerapkan `processPII()` (dari
  `@/shared/utils/inputSanitizer`) pada bidang string `content`/`text`. Ketika
  `PII_REDACTION_ENABLED=true`, PII yang terdeteksi disamarkan dalam payload
  keluar. Hal ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya
  mengontrol kebijakan injeksi prompt). Ketika penyamaran dinonaktifkan,
  pemanggilan mencatat jumlah deteksi tanpa menulis ulang konten.
- **`postCall`** melakukan kloning mendalam pada respons, menjalankan
  `sanitizePIIResponse()` beserta penyamar bentuk Responses API
  (`maskResponsesOutput` — mencakup `output_text` dan
  `output[].content[].text`). Jika terjadi penyamaran, respons yang telah
  dimodifikasi menggantikan respons asli.

Guardrail tidak pernah memblokir; guardrail hanya memberikan anotasi
(`meta.detections`, `meta.redacted`) atau menulis ulang.

#### Pemilihan per jenis, pola khusus, dan penghitung deteksi

**Dasbor → Pengaturan → Keamanan → Penyamaran PII** memilih _apa_ yang
disamarkan. Ini tidak mengaktifkan penyamaran: pengaktifannya tetap dikendalikan
oleh `PII_REDACTION_ENABLED` (permintaan) dan `PII_RESPONSE_SANITIZATION`
(respons + SSE), yang keduanya dinonaktifkan secara default.

- **Pemilihan per jenis** — ID bawaan tercantum di
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Jika tidak
  ditetapkan, semua jenis digunakan (perilaku sebelum pengaturan ini tersedia).
  Pola `ssn_us` milik mesin permintaan dipetakan ke `ssn`. Templat (Minimal,
  Standar, Finansial, Brasil, AS, Lengkap) hanya mengisi kotak centang di UI.
- **Pola khusus** — hingga 20 pola regex atau wildcard (`*` = hingga 64
  karakter non-spasi, `?` = satu karakter). Kecocokan menjadi
  `[CUSTOM_REDACTED]`. Setiap pola diproses melalui
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  maksimal 500 karakter, flag dibatasi pada `g i m s u`, harus dapat
  dikompilasi, harus lolos `safe-regex` (backtracking katastrofik), dan tidak
  boleh cocok dengan string kosong atau placeholder penyamaran. Pola yang gagal
  akan ditolak saat disimpan dan diuji, sedangkan baris tersimpan yang gagal
  akan dilewati saat runtime alih-alih dikompilasi. Pola khusus hanya dijalankan
  ketika penyamaran aktif.
- **Penghitung deteksi** — jumlah per jenis (tidak pernah menyimpan nilai yang
  cocok), disimpan dalam memori dan diatur ulang saat dimulai ulang
  (`src/lib/pii/piiDetectionStats.ts`). Jumlah ini hanya meningkat ketika
  penyamaran aktif.

Pengaturan disimpan dalam tabel `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 detik. API:

| Metode | Jalur                    | Tujuan                                                                    |
| ------ | ------------------------ | ------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Status flag, `enabledTypes`, `customPatterns`, penghitung deteksi         |
| `PUT`  | `/api/settings/pii`      | Mengganti `enabledTypes` (`null` = semua) dan/atau `customPatterns`       |
| `POST` | `/api/settings/pii/test` | Uji coba satu pola terhadap sampel maksimal 8 KB; tidak ada yang disimpan |

Ketiganya memerlukan autentikasi manajemen dan memvalidasi body dengan Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injeksi Prompt (`promptInjection.ts`)

Mendeteksi struktur adversarial dalam konten yang diberikan pengguna dan
menerapkan kebijakan yang dikonfigurasi. Perilaku ditentukan oleh variabel
lingkungan dan opsi konstruktor:

| Pengaturan    | Variabel lingkungan                                                                                 | Default | Efek                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Diaktifkan    | `INPUT_SANITIZER_ENABLED`                                                                           | `true`  | Jika `false`, guardrail langsung dihentikan.                                                                                                                                                                     |
| Mode          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn`  | Kebijakan injeksi: `block`, `warn`, atau `log`. (`redact` diterima untuk kompatibilitas mundur, tetapi **tidak** menghapus teks injeksi; penulisan ulang PII permintaan dikontrol oleh `PII_REDACTION_ENABLED`.) |
| Ambang blokir | Opsi `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Tingkat keparahan minimum yang diperlukan untuk memblokir. Tingkat sedang hanya dipantau secara default.                                                                                                         |

**Presedensi mode** (`getMode`): `options.mode` pemanggil →
**penggantian feature flag DB** `INJECTION_GUARD_MODE` (Dasbor → Pengaturan →
Feature Flags) → variabel lingkungan `INJECTION_GUARD_MODE` → variabel lingkungan `INPUT_SANITIZER_MODE` →
`warn`. Karena itu, penggantian melalui dasbor lebih diprioritaskan daripada variabel lingkungan, sehingga UI Feature
Flags mengontrol guard yang sedang berjalan secara langsung (tanpa memulai ulang). Pembacaan DB bersifat aman dari kegagalan:
jika terjadi kesalahan, guard kembali ke perilaku berbasis variabel lingkungan, dan jika tidak ada
penggantian yang ditetapkan, perilakunya identik dengan resolusi yang hanya menggunakan variabel lingkungan.

Sumber deteksi:

1. `sanitizeRequest()` dari `@/shared/utils/inputSanitizer` (kumpulan detektor bersama
   yang digunakan di bagian lain dalam pipeline).
2. `DEFAULT_GUARD_PATTERNS` bawaan (saat ini `system_override_inline` dan
   `markdown_system_block`, keduanya memiliki tingkat keparahan `high`).
3. `customPatterns` opsional yang diteruskan melalui opsi konstruktor (string, regex,
   atau record `{ name, pattern, severity }`).

Saat `mode === "block"` **dan** setidaknya satu deteksi memenuhi ambang
tingkat keparahan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mode `warn`/`log`, guardrail mencatat log tetapi
mengizinkan pemanggilan. Helper bersama `evaluatePromptInjection()` juga diekspor
untuk pemanggil yang perlu mengevaluasi prompt tanpa melalui registry.

**Batas pemindaian (v3.8.20):** detektor hanya memeriksa **16 KB pertama** dari
teks prompt yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 byte) dalam
`src/shared/utils/inputSanitizer.ts`. Baik `detectInjection()` maupun
`evaluatePromptInjection()` menjalankan `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum
menjalankan loop pola. Direktif injeksi berada di dekat bagian atas input, sehingga hal ini
membatasi penggunaan CPU/GC regex pada payload berukuran ratusan KB tanpa melemahkan deteksi (lihat
#3932, #4041).

### Penyamar Kredensial (`credentialMasker.ts`)

Berjalan pada **kedua** tahap dan berada di urutan terakhir dalam rantai default (prioritas `95`). Menyamarkan
pola kunci API / token rahasia yang umum dikenal dari payload keluar (konten
pesan, argumen pemanggilan alat, hasil alat) **dan** respons penyedia, sehingga
kredensial yang ditempelkan ke prompt (atau dikembalikan oleh hasil alat) tidak bocor
ke penyedia hulu maupun kembali ke klien.

- **Hanya ikut serta secara eksplisit**, mengikuti konvensi yang sama seperti penyamaran PII (berdekatan dengan Hard Rule #20):
  dinonaktifkan kecuali `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Saat dinonaktifkan, guardrail tidak melakukan apa pun —
  tidak pernah memblokir dan tidak pernah menulis ulang.
- `redactCredentials()` menelusuri seluruh struktur payload/respons (`walkValue()`,
  aman dari prototype pollution, aman terhadap siklus melalui `WeakSet`) dan mengganti kecocokan dengan
  placeholder `[REDACTED:<type>]`, dengan hanya mengkloning cabang yang benar-benar
  berubah.
- `CREDENTIAL_PATTERNS` mencakup kunci penyedia LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square), kunci
  cloud (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci privat / JWT,
  string koneksi yang memuat kredensial (`mongodb://user:pass@...`, dll.), serta
  pola umum untuk nilai header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kunci berbentuk header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) disamarkan secara struktural (hanya nilainya, sedangkan prefiks skema seperti
  `Bearer `/`Basic ` dipertahankan), bukan melalui regex teks generik.
- Guardrail tidak pernah memblokir; guardrail hanya menulis ulang (`modifiedPayload` /
  `modifiedResponse`) dan menambahkan anotasi (`meta.credentialsRedacted`, `meta.count`).

Pengaman regresi: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrak Dasar (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true menghentikan rantai secara langsung
  message?: string; // ditampilkan saat pemblokiran
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // dikembalikan oleh preCall untuk menulis ulang permintaan
  modifiedResponse?: TValue; // dikembalikan oleh postCall untuk menulis ulang respons
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Sebuah guardrail menandakan "tidak ada perubahan" dengan mengembalikan `void`, `{}`, atau
`{ block: false }`. Mengembalikan `modifiedPayload`/`modifiedResponse` akan menggantikan
nilai yang diteruskan melalui rantai untuk guardrail berikutnya.
`signal?: AbortSignal` membawa siklus hidup pemanggil ke dalam guardrail. Pembatalan permintaan merupakan pengecualian fail-open yang disengaja: penghubung media menghentikan pekerjaan dan melakukan pembersihan tanpa memulihkan media mentah ke target yang diketahui tidak mendukungnya.

## Registri (`registry.ts`)

Singleton `guardrailRegistry` menyediakan:

- `register(guardrail)` — menambahkan (atau mengganti berdasarkan nama yang dinormalisasi) sebuah guardrail dan
  mengurutkan ulang berdasarkan `priority` secara menaik.
- `clear()` / `list()` — utilitas administratif.
- `runPreCallHooks(payload, context)` — mengiterasi guardrail aktif, meneruskan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` pertama.
- `runPostCallHooks(response, context)` — alur yang sama pada sisi respons.
- `resetGuardrailsForTests({ registerDefaults })` — menghapus status dan secara opsional
  mendaftarkan ulang guardrail default untuk isolasi pengujian yang bersih.

Kedua runner mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
dengan `results` berupa array rekaman `GuardrailExecutionResult` yang menyertakan
kolom `blocked`, `skipped`, `modified`, `error`, dan `meta` untuk setiap guardrail,
yang berguna untuk penelusuran.

### Menonaktifkan Guardrail Per Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengumpulkan daftar
nama guardrail tanpa duplikat yang harus dilewati untuk permintaan saat ini.
Sumbernya (semuanya opsional dan digabungkan):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` pada isi permintaan (tingkat teratas)
- `metadata.disabledGuardrails` pada isi permintaan
- Header `x-omniroute-disabled-guardrails` (atau versi lama
  `x-disabled-guardrails`)

Nilai dapat berupa array string atau string yang dipisahkan koma; nama
dinormalisasi menjadi kebab-case huruf kecil (`pii_masker` → `pii-masker`). Hasilnya
diteruskan melalui `context.disabledGuardrails` ke registri, yang melewati
guardrail yang cocok (`skipped: true` dalam `results`).

## Urutan Eksekusi

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` membuat daftar lewati berdasarkan kunci API, body,
   dan header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail dalam urutan
   prioritas menaik:
   - Guardrail yang dinonaktifkan dicatat sebagai `skipped`.
   - `preCall` setiap guardrail dapat menulis ulang payload melalui `modifiedPayload`.
   - `block: true` pertama menghentikan rantai lebih awal dan handler mengembalikan
     respons penolakan guardrail.
3. Payload (yang mungkin telah ditulis ulang) diteruskan ke perutean kombo dan pengiriman
   ke upstream.
4. Setelah respons disusun, `guardrailRegistry.runPostCallHooks(...)`
   menjalankan rantai yang sama pada respons. `block: true` di sini membuang respons
   upstream.

Guardrail yang melempar pengecualian dicatat dengan `error: <message>` dan dicatat dalam log melalui
`logger.warn`, tetapi rantai tetap berlanjut — secara desain tetap terbuka saat terjadi kegagalan.

## Konfigurasi

Variabel lingkungan yang dibaca oleh guardrail bawaan:

| Variabel                              | Digunakan oleh            | Efek                                                                                                         |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Atur ke `false` untuk menonaktifkan deteksi sepenuhnya.                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Kebijakan injeksi: `warn`, `block`, atau `log`. Nilai lama `redact` tidak menulis ulang teks injeksi.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode untuk guard injeksi; juga merupakan flag fitur DB yang **menggantikan** variabel lingkungan (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Tingkat keparahan minimum yang ditolak oleh `MODE=block`: `high` (bawaan), `medium`, atau `low`.             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias lama untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Jika `true`, PII dalam permintaan disamarkan (tidak bergantung pada mode injeksi).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Mengontrol perilaku masker pada sisi respons.                                                                |

Guardrail Modality Bridge membaca konfigurasi runtime dari penyimpanan pengaturan
berbasis DB (`getSettings()`), bukan dari variabel lingkungan. Kunci utama Vision adalah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci lama
`visionBridge*` hanya diterima sebagai fallback pembacaan satu siklus yang telah didokumentasikan;
penulisan dari dasbor menggunakan kunci utama. Nilai bawaan dan resolver fallback
berada di `src/shared/constants/modalityBridgeDefaults.ts`, dengan konstanta lama
tetap dipertahankan di `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, ditambah pengaturan
bersama `modalityBridgeCache*`. Audio tidak memiliki fallback kunci lama karena kunci-kunci
ini diperkenalkan bersama skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, ditambah pengaturan bersama `modalityBridgeCache*`.
Fitur ini dinonaktifkan secara bawaan karena FFmpeg/ffprobe merupakan dependensi operasional
opsional dan pemberian keterangan pada frame menambah latensi serta biaya model.

## Guardrail Kustom

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Anggaran harian terlampaui" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Langkah-langkah:

1. Buat `src/lib/guardrails/myGuardrail.ts` yang memperluas `BaseGuardrail`.
2. Implementasikan `preCall` dan/atau `postCall`.
3. Daftarkan saat impor (tambahkan dari `registerDefaultGuardrails`) atau
   panggil `guardrailRegistry.register(...)` saat runtime — registry akan mengganti
   guardrail sebelumnya yang memiliki nama ternormalisasi yang sama.
4. Tambahkan pengujian di bawah `tests/unit/` (contoh yang tersedia:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` di antara pengujian agar dimulai dari keadaan yang diketahui.
Berikan `{ registerDefaults: false }` untuk memulai dengan registry kosong dan
hanya mendaftarkan guardrail yang sedang diuji. Vision Bridge menerima injeksi dependensi
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge menyediakan titik injeksi
yang setara untuk pengaturan, kapabilitas, pemilihan model STT, pemeriksaan kredensial,
dan transkripsi. Dengan demikian, pengujian dapat menjalankan kedua alur tanpa akses DB
atau jaringan.

## Lihat Juga

- `src/lib/guardrails/` — implementasi
- `src/shared/utils/inputSanitizer.ts` — detektor bersama yang mendukung
  injeksi prompt dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — nilai default Vision Bridge dan
  daftar model forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — nilai default runtime bersama Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogonal (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — referensi lengkap variabel lingkungan

## Cakupan rute injection-guard & red-team (Fase 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) mencakup semua rute
yang menerima prompt pengguna. Guard ini mematuhi `INJECTION_GUARD_MODE` (nilai default `warn` = hanya mencatat log;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis           | Rute                                                                                                                                                 | Mode default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Teks (tersedia) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generatif       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstraksi teks (`extractMessageContents`) mencakup `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (setiap malam, `nightly-llm-security.yml`):** promptfoo memvalidasi bahwa setiap rute memblokir
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan probe (dilewati tanpa secret).
`moderations` disertakan untuk konsistensi — operator dalam mode blokir dapat mengecualikannya melalui
`resolveDisabledGuardrails`.

Workflow setiap malam (`.github/workflows/nightly-llm-security.yml`, cron + dispatch
manual) memiliki dua job:

- **`promptfoo-guard` (memblokir)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kasus adversarial (misalnya "abaikan semua
  instruksi sebelumnya…", jailbreak bergaya DAN) memastikan respons memuat
  `error.code === "SECURITY_001"`, yaitu guard benar-benar menolak permintaan tersebut.
- **`garak` (advisory)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instans OmniRoute lokal (`http://localhost:20128/v1`). Bergantung pada
  secret penyedia (`PROMPTFOO_PROVIDER_KEY`); dilewati dengan baik jika tidak tersedia dan diberi akhiran
  `|| true`, sehingga job ini melaporkan hasil tanpa menggagalkan CI.

Cakupan helper guard (`createInjectionGuard` / `withInjectionGuard`)
meliputi setiap rute `/v1` yang memuat prompt; teks prompt diambil dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` di `src/shared/utils/inputSanitizer.ts`.
