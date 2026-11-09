# Guardrails (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber acuan:** `src/lib/guardrails/`
> **Terakhir diperbarui:** 2026-10-17 — v3.8.52 (menambahkan [Cakupan dan batasan](#coverage-and-limits):
> rute dan jalur respons mana yang dijangkau hook, header penonaktifan yang digabungkan (#16412),
> mode blokir injeksi sebagai batas wajib (#16413), dan apa yang melihat respons sebelum post-call)

Guardrail menegakkan keamanan, kebijakan, dan transformasi konten pada batas
antara OmniRoute dan penyedia upstream. Setiap guardrail dapat memeriksa (dan
secara opsional menolak, mentransformasi, atau memberi anotasi) payload
permintaan (`preCall`) dan respons upstream (`postCall`).

Sistem ini bersifat **fail-open**: jika sebuah guardrail melempar error saat
dieksekusi, registry mencatat error tersebut dan melanjutkan ke guardrail
berikutnya alih-alih menggagalkan permintaan. Pemblokiran adalah keputusan
eksplisit (`block: true`), tidak pernah terjadi tanpa sengaja. Satu-satunya
pengecualian adalah permintaan yang di-abort: ketika `signal` milik pemanggil
di-abort, guardrail yang melempar error akan me-reject eksekusi hook alih-alih
dilewati.

Hook **tidak** berjalan pada setiap rute atau setiap respons. Baca
[Cakupan dan batasan](#coverage-and-limits) sebelum mengandalkan guardrail
sebagai kontrol keamanan.

## Pagar Pembatas Bawaan

Registri secara otomatis memuat enam pagar pembatas dalam urutan prioritas saat impor (lihat `registry.ts` → `registerDefaultGuardrails()`):

| Prioritas | Nama                | Panggung       | Mengajukan            |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nomor dengan prioritas lebih rendah dijalankan** Pertama** .

### Jembatan Visi (`visionBridge.ts`) — Jembatan Modalitas PR-1

Model dasar GLM 5.3 dan `glm-5.3-{low,high,max}` memiliki metadata `supportsVision:false` registry/spec yang eksplisit. Varian GLM 5.3 Flash tetap menjadi model native-vision. Rute `/v1/messages` Kode Claude memasuki rantai pagar pembatas pra-panggilan `handleChat` bersama** sebelum** Terjemahan Claude-ke-OpenAI; gambar hasil alat `Read` yang disarangkan harus dideskripsikan atau ditangani sebelum terjemahan itu mengangkatnya ke konten OpenAI `image_url` (#17069).

Mencegat permintaan yang mengandung gambar yang ditujukan** model non-visi** dan merutekan ulang seluruh permintaan ke model berkemampuan visi atau mengganti bagian gambar dengan deskripsi teks yang dihasilkan oleh model visi yang dapat dikonfigurasi sebelum panggilan upstream. Hal ini memungkinkan penyedia layanan teks saja menangani muatan multimoda secara transparan.

Mengalir:

1. Lewati jika model target sudah mendukung visi (kecuali jika muncul dalam daftar jembatan paksa `isVisionBridgeForcedModel`).
2. Ekstrak bagian gambar melalui `extractImageParts(messages)` (`visionBridgeHelpers.ts`), yang didelegasikan ke** detektor media terpadu** `detectMediaParts()` di `open-sse/utils/mediaParts.ts` — satu-satunya sumber kebenaran yang dibagikan dengan filter kompatibilitas kombo. Ekstraksi diperbolehkan ke bentuk `replaceImageParts` dapat sambung kembali (ekstrak ↔ ganti kontrak): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, dan Responses API `input_image`. Gambar yang cocok yang bersarang di dalam kode Claude `tool_result.content` dan keluaran alat Respons juga diekstraksi dan diganti di jalur aslinya; bentuk hanya indikator adalah bahan filter kombo dan tidak diekstraksi. Lewati jika tidak ada yang ditemukan.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): kunci pengaturan `modalityBridge*` baru menang; kunci `visionBridge*` warisan tetap a** fallback satu siklus** (jendela kembalikan). Lewati sebelum traversal media apa pun saat jembatan dinonaktifkan.
4. Pemilih mode (`modalityBridgeVisionMode`, lihat tabel di bawah) memutuskan rute ulang vs deskripsi. Rute ulang mengembalikan `modifiedPayload` dengan hanya `model` yang ditukar, ditambah meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Jelaskan jalur: tutup gambar di `maxImages`, buat prompt sadar tugas, lihat cache deskripsi, panggil model visi** secara paralel** (`Promise.allSettled`), dan masukkan bagian teks `[Image N]: <description>` di tempatnya. Penjelasan yang gagal menghasilkan `null`: gambar mentah dipertahankan untuk target unknown/vision-capable (#4012), tetapi a** target langsung hanya teks yang dikonfirmasi** atau kombo zero-vision mendapat rintisan teks `(unavailable — no vision-capable provider connected)` eksplisit untuk setiap gambar yang tidak dijelaskan, termasuk kegagalan sebagian dan gambar di luar batasan panggilan deskripsi (#17069). Kombo yang semuanya gagal menjelaskan fallback tetap ada (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Pemilih mode (`modalityBridgeVisionMode`)

| Mode       | Bawaan | Perilaku                                                                                                                                                                                                                                                                                                    |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heuristik lama, tak tersentuh (#6640/#7204): model non-combo/`auto/` dialihkan ke model visi terbaik kecuali model asli telah memiliki kredensial yang dapat digunakan (lalu jelaskan); target kombo selalu dijelaskan.                                                                                     |
| `describe` |        | Selalu jelaskan — blok rute ulang dilewati seluruhnya; model yang dipilih pengguna selalu menjawab.                                                                                                                                                                                                         |
| `reroute`  |        | Perutean ulang paksa: penjaga model tetap-berkredensial dilewati. Rute ulang-** target** penjaga kredensial masih menerapkan — ketika tidak ada target visi yang dapat digunakan, jembatan memblokir dengan kesalahan yang jelas daripada mendeskripsikan atau mengirim gambar mentah ke target hanya teks. |

Hubungan pendek mode paksa** sebelum** heuristik otomatis berjalan; Perilaku `auto` identik dengan byte dengan pagar pembatas pre-PR-1.

#### Cakupan kunci API (`visionBridgeKeyScope.ts`)

Ketika kunci API pemanggil membatasi `allowedConnections`, kumpulan kuota (`allowedQuotas`) atau model (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), jembatan hanya mengambil rute ulang dan menjelaskan model yang mungkin digunakan kunci tersebut, pada koneksi yang mungkin digunakan kunci tersebut. Panggilan deskripsikan kemudian selalu melewati loop mandiri OmniRoute dengan header `x-omniroute-self-loop-key-id`, sehingga permintaan obrolan penerima menerapkan kembali kebijakan koneksi dan model kunci tersebut. `enforceApiKeyPolicy()` menghormati header itu hanya bersama dengan pembawa loop mandiri, sehingga hanya dapat mempersempit akses, dan id yang tidak terselesaikan akan ditolak.

Jika tidak ada model visi yang diizinkan untuk kunci tersebut, a** target hanya teks yang dikonfirmasi** menolak permintaan gambar secara lokal dengan HTTP 400 yang jelas daripada meneruskan byte gambar ke upstream yang tidak mampu (#17069). Untuk target dengan kemampuan visi asli atau tidak diketahui, jalur deskripsikan mempertahankan perilaku buka-gagal sebelumnya (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Permintaan tanpa kunci, dan kunci tanpa batasan ini, berperilaku persis seperti sebelumnya.

#### Prompt deskripsi sadar tugas (`modalityBridgeVisionTaskAware`)

Bawaan** BENAR** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan teks** pesan pengguna terakhir** (dipotong menjadi 500 karakter) ke perintah deskripsi dasar, mengarahkan deskripsi ke arah yang sebenarnya ditanyakan pengguna (pola codex-vision-proxy) dan meminta model visi untuk menyalin teks yang terlihat. Dengan tanda — dinonaktifkan atau tidak ada teks pengguna — prompt dasar digunakan tanpa perubahan.

Permintaan yang kompatibel dengan OpenAI dari loop mandiri (`callVisionModelSingle()` dalam `visionBridgeHelpers.ts`) selalu meminta `image_url.detail: "high"` — tanpa syarat, untuk setiap caller/provider, tidak dibatasi pada sinyal klien mana pun. Pengambilan sampel dengan detail rendah menurunkan keakuratan OCR untuk tugas transkripsi teks yang diminta oleh perintah ini, sehingga panggilan deskripsikan itu sendiri selalu meminta detail tinggi terlepas dari tingkat detail apa yang digunakan permintaan masuk asli. Ini hanya mempengaruhi isi permintaan deskripsi internal; itu tidak mengubah cara OmniRoute meneruskan `image_url.detail` milik pemanggil pada permintaan utama — yang defaultnya diterapkan secara terpisah, dan hanya untuk klien OpenCode yang terdeteksi, di `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang format kawat Anthropic dari deskripsikan self-loop tidak memiliki bidang `detail` dan tidak terpengaruh secara default.

#### Jelaskan batas keluaran (`modalityBridgeVisionMaxChars`)

| Kunci                          | Bawaan | Jangkauan          |
| ------------------------------ | ------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`    | `0` atau 100–50000 |

`0` (default) artinya** tidak ada batasan** — deskripsi yang dikembalikan oleh `callVisionModel()` diteruskan tanpa dimodifikasi, mempertahankan perilaku yang ada. Nilai apa pun dalam rentang 100–50000 akan memotong deskripsi dengan akhiran `…` sebelum disambung kembali sebagai `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` di `src/lib/guardrails/visionBridge.ts`). Naikkan ini untuk tugas OCR yang sangat detail di mana model hilir memerlukan transkripsi penuh; turunkan ke penggunaan token terikat pada model visi cerewet. Bidang dasbor berada di panel Advanced pada tab Vision (`modality-bridge-max-chars` dalam `ModalityBridgeVisionTab.tsx`) dan menjepit nilai apa pun antara 1 dan 99 hingga lantai 100 sambil membiarkan `0` tidak tersentuh secara eksplisit — `0` adalah nilai Zod yang valid dalam dirinya sendiri (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan hanya default "tidak disetel".

#### Jelaskan cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk mendeskripsikan keluaran, dibagikan di seluruh proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)` dengan framing awalan panjang (tidak ada benturan batas bidang). Komponen modelnya adalah** dikonfigurasi** model jembatan, bukan model yang benar-benar menjawab — `callVisionModel` mungkin mundur secara internal, dan mengetik setiap upaya akan memecah-mecah cache. Penjelasan yang gagal tidak pernah di-cache. Pengaturan:

| Kunci                           | Bawaan | Jangkauan |
| ------------------------------- | ------ | --------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalisasi gambar jarak jauh (pengambilan describe/base64 loop mandiri)

Ketika jembatan mengambil a** terpencil** gambar itu sendiri — Anthropic mendeskripsikan panggilan mandiri dan konversi base64 format claude-wire (`ensureBase64ImagesForClaudeWire`), keduanya melalui `fetchRemoteImageAsDataUri()` di `visionBridgeHelpers.ts` — data yang dihasilkan URI dilewatkan melalui `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sebelum disematkan dalam permintaan model visi. Gambar yang terlalu besar diperkecil menjadi a** Tepi panjang 2048 piksel** (mencocokkan batas pengubahan ukuran OpenAI/Anthropic sudah diterapkan di sisi server), yang memotong bytes/latency unggahan tanpa mengubah apa yang dilihat model visi. Mengubah ukuran menggunakan `sharp`, dimuat melalui impor dinamis: pada platform di mana biner aslinya gagal dimuat, `normalizeDataUri()`** tidak pernah melempar** — itu jatuh kembali ke passthrough byte asli, sehingga jalur describe/base64-conversion selalu berfungsi. Byte non-gambar (pengambilan yang tidak mengembalikan gambar yang dapat didekodekan) juga diteruskan tanpa disentuh. Normalisasi ini mencakup gambar yang diambil jembatan untuk panggilan mandiri — Normalisasi ini tidak pernah diterapkan pada payload passthrough mentah pemanggil, konsisten dengan prinsip mutasi opt-in-only (Aturan Keras #20).

#### Pengaturan skema migrasi +

Kunci `modalityBridge*` baru divalidasi Zod di `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan grup `modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi `141_modality_bridge_settings.sql` menyalin nilai `visionBridge*` lama yang ada ke kunci baru yang cocok (idempoten, tidak pernah menimpa nilai `modalityBridge*` yang ditetapkan operator); kunci lama tetap diterima sebagai cadangan baca untuk satu siklus rilis.

#### Statistik + header transparansi

Respons yang ditransformasikan membawa `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (dibangun oleh `buildModalityBridgeHeader()` di `modalityBridge/bridgeStats.ts`, dicap oleh `withModalityBridgeHeader()` di `src/sse/handlers/chatHelpers.ts`). Permintaan yang dialihkan diterima** TIDAK** header — payload tidak tersentuh dan pertukaran model sudah terlihat di bidang `model` badan respons.

`GET /api/modality-bridge/stats` (auth manajemen, tingkat yang sama dengan `GET /api/settings`) mengembalikan penghitung per modalitas dalam memori `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan `video`. `averageLatencyMs` menggunakan `latencySamples`, tidak semua upaya, sebagai penyebutnya; operasi tanpa pengaturan waktu tidak menghasilkan sampel nol milidetik. `bridged` tetap merupakan alias yang kompatibel dengan versi sebelumnya untuk konversi yang berhasil; upaya yang gagal tidak menambahnya. Penghitung disetel ulang pada proses dimulai ulang berdasarkan desain (telemetri, bukan akuntansi).

#### Konfigurasi dasbor

Halaman dasbor khusus adalah `/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`, dan `Video` yang dapat dialamatkan URL mempertahankan parameter kueri sambil mengalihkan nilai `tab`. Tab Vision memperlihatkan pengaktifan, mode, pemilihan model (termasuk default otomatis), perintah sadar tugas, batas timeout/image/description-length/cache lanjutan, penghitung waktu proses, dan permintaan sampel yang dilindungi. Tab Audio juga aktif: tab ini menampilkan pengaktifan, pemilih model khusus STT dengan Otomatis, batas timeout/max-clip, penghitung audio, dan pengujian sampel `input_audio`. Tab Video berfungsi: melaporkan status waktu proses FFmpeg/ffprobe — salah satu dari empat status UI eksplisit (`unknown` saat probe sedang terbang atau tidak dapat diselesaikan, `restricted` pada host dasbor non-loopback tempat probe dilewati di sisi klien, `unavailable` setelah diperiksa dan dikonfirmasi hilang, atau `available` dengan versi FFmpeg/ffprobe ) — tetap mempertahankan batas enable/model/frame/video/timeout, memfilter pemilih model ke model berkemampuan penglihatan, dan mengekspos penghitung video.

Kartu Vision Bridge sebelumnya di bawah pengaturan AI adalah tautan kompatibilitas ke halaman baru; ia tidak lagi memiliki salinan kedua formulir tersebut. Penyedia Media juga menautkan alur kerja Gambar-ke-Teks dan Ucapan-ke-Teks ke tab Jembatan Modalitas yang sesuai tanpa menghapus taman bermain Ucapan-ke-Teks yang ada.

**Bypass penerimaan loop mandiri:** ketika panggilan deskripsikan merutekan melalui loop mandiri `/v1` milik OmniRoute(model penyedia non-standar), sub-permintaan mengirimkan `x-omniroute-admission-bypass: internal` dan diautentikasi dengan kredensial loop mandiri yang diselesaikan — penjaga `sk_omniroute` lokal dalam mode lokal, atau kunci `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env yang dikonfigurasi oleh operator (#1350) sehingga penerapan `REQUIRE_API_KEY=true` masih dapat menjalankan panggilan deskripsikan. Bypass hanya berlaku untuk kredensial yang tepat, sehingga klien eksternal tidak dapat menggunakan header untuk melewati penerimaan.

Default lama ada di `src/shared/constants/visionBridgeDefaults.ts`; default mode/task-aware/cache baru dan penyelesai pengaturan ada di `src/shared/constants/modalityBridgeDefaults.ts`. Pagar pembatas memperlihatkan opsi konstruktor `deps` sehingga pengujian dapat memasukkan implementasi `getSettings` dan `callVisionModel` palsu.

### Jembatan Audio (`audioBridge.ts`) — Jembatan Modalitas PR-3

Mencegat permintaan obrolan berisi audio sebelum mencapai target yang tidak diketahui menerima input audio. Itu tidak pernah merutekan ulang permintaan obrolan: bagian audio ditranskripsi melalui titik akhir multibagian yang kompatibel dengan OpenAI dan model obrolan yang dipilih dilanjutkan dengan transkrip teks.

Mengalir:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata registrasi penyedia eksplisit menang, lalu metadata model statis, lalu `modalities_input` yang disinkronkan. Daftar masukan yang dideklarasikan tanpa `audio` adalah `false`; tidak ada bukti kemampuan yang tersisa `null`. Baik `false` maupun `null` mengaktifkan jembatan konservatif, sementara `true` melewatinya.
2. Selesaikan pengaturan `modalityBridgeAudio*` dan ekstrak bagian audio tingkat atas yang dapat disambung dari setiap pesan melalui detektor `detectMediaParts()` bersama. Bentuk kawat yang didukung adalah OpenAI `input_audio`, `audio_url`, dan `source.media_type: "audio/*"`. Audio yang disarangkan terdeteksi untuk perutean tetapi tidak dihapus oleh jalur sambungan. Pekerjaan dibatasi oleh `modalityBridgeAudioMaxClips`; bagian selanjutnya tetap tidak tersentuh.
3. Hormati `provider/model` yang dikonfigurasi, atau biarkan `selectAudioBridgeModel()` menjalankan `AUDIO_TRANSCRIPTION_PROVIDERS` dalam urutan katalog yang stabil dan pilih model pertama dengan kredensial penyedia aktif yang dapat digunakan.
4. `callAudioTranscription()` mengonversi audio base64/data-URI menjadi `file` multibagian, atau mengunduh `audio_url` jarak jauh melalui penjaga keluar khusus publik dengan penyematan DNS dan batasan 25 MB. Kemudian POSTs file dan model yang dipilih ke self-loop `/v1/audio/transcriptions` lokal, diautentikasi dengan `resolveSelfLoopBearer()`. Rute transkripsi yang ada melakukan pencarian kredensial normal, penanganan cooldown/rate-limit, dan pengiriman penyedia.
5. Panggilan yang berhasil mengganti bagiannya dengan `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`: kegagalan individual mempertahankan bagian audio asli tersebut (kontrak #4012). Jika setiap panggilan gagal dan target terbukti `supportsAudio === false`, bagian-bagiannya menjadi `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk target yang tidak diketahui (`null`), hasil yang semuanya gagal tetap tidak tersentuh. Target hanya teks yang terbukti tanpa kredensial STT yang dapat digunakan menerima stub eksplisit yang sama tanpa mengeluarkan panggilan jaringan.

Transkrip yang berhasil menggunakan cache LRU/TTL Modality Bridge di seluruh proses. Kuncinya menggabungkan referensi audio, label operasi `audio-transcription` yang stabil, dan model STT yang dipilih; kegagalan tidak pernah di-cache. Upaya audio memperbarui penghitung `bridged`, `cacheHits`, `failures`, dan `lastUsedAt` bersama. Respons yang diubah membawa `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan yang tidak tersentuh tidak menerima segmen Audio Bridge.

Pengaturan runtime didukung DB dan divalidasi Zod:

| Kunci                         | Bawaan  | Jangkauan            |
| ----------------------------- | ------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Otomatis atau STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

Cache bersama tetap dikontrol oleh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Jembatan Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Mencegat bagian video tingkat atas di Penyelesaian Obrolan `messages` dan Respons API `input` sebelum target tanpa dukungan video asli yang diketahui dipanggil. Bentuk yang didukung adalah `input_video`, `video_url`, `video_source`, HTTPS URLs, dan `data:video/*;base64,...` data URIs. Nama file biasa dalam teks tidak diperlakukan sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki traversal permintaan, pemeriksaan capability/policy, agregasi per permintaan, dan payload respons. Akuisisi — pekerjaan per video, cache hasil keseluruhan, mendeskripsikan urutan bingkai (yang menggabungkan transkrip audio yang dideklarasikan oleh penelepon), dan per upaya metrics/abort/cleanup — disembunyikan di belakang `processVideoPart` di `videoBridgePipeline.ts`, dipanggil satu kali per bagian video di dalam loop `preCall`. Modul tersebut juga mendefinisikan batas port eksplisit `VideoMediaBrokerPort` (memperoleh byte dan mengekstrak bingkai sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang dideklarasikan pemanggil dengan teks sampel), dan `VideoDrilldownPort` (batas persistensi penelusuran bingkai; belum dihubungkan ke `processVideoPart` — hanya rute `/api/modality-bridge/video/drilldown` terpisah yang menulis entri penelusuran hari ini).

Jalur permintaan `/v1` publik tidak pernah mengimpor atau memanggil subproses. Video jarak jauh diunduh dengan batas 50 MiB ; video base64 sebaris memiliki batas konservatif 36 MiB yang didekodekan per video sehingga amplop model/messages/framing dapat tetap berada di dalam batas penerimaan permintaan JSON publik sebesar 50 MiB. Perkiraan panjang sebaris dan ukuran yang diterjemahkan diperiksa sebelum alokasi. HTTPS diperlukan pada URL jarak jauh awal dan setiap pengalihan, menggunakan penjaga keluar khusus publik yang ada dengan penyematan DNS. Byte tersebut kemudian melewati batas broker `POST /api/modality-bridge/video/extract` internal yang tepat. Rute tersebut adalah `LOCAL_ONLY` dan `SPAWN_CAPABLE`, hanya menerima permintaan loopback tepercaya yang diautentikasi per proses, dan tidak pernah menerima URL, jalur sistem file, daftar yang dapat dieksekusi, atau argumen. Pipeline ukuran badan API dan pembaca badan inkremental handler secara independen menerapkan batas masukan broker 50 MiB. Antrean terbatasnya menjalankan satu ekstraksi pada satu waktu, memungkinkan empat pekerjaan tertunda, dan membatasi input yang tertunda hingga 100 MiB.

Di dalam broker, `ffprobe` membaca file lokal pribadi; daftar format tetap yang diizinkan tidak termasuk format daftar putar dan manifes. Untuk kontainer keluarga MOV yang diizinkan, referensi data MOV eksternal tetap dinonaktifkan secara default, dan perintah tetap tidak ikut serta dalam kontainer tersebut. Baik `ffprobe` maupun `ffmpeg` menggunakan daftar putih protokol `file` -only, satu thread, array argumen tetap, tanpa shell, dan executable yang diselesaikan dari `PATH`. Aliran sampul gambar terlampir bukan kandidat yang dapat dimainkan. Semua streaming yang dapat diputar harus memenuhi batas, dan streaming default eksplisit lebih diutamakan sebelum fallback indeks terendah deterministik. Video dibatasi hingga 600 detik, 8.192 piksel per dimensi, dan 33.554.432 piksel sumber. FFmpeg mengambil sampel 1–16 bingkai JPEG titik tengah, menurunkan skala tepi panjang hingga maksimal 1.024 piksel tanpa meningkatkan input yang lebih kecil, dan tidak pernah menerima URL. Pengambilan sampel adalah `uniform` secara default. Kebijakan `scene_aware` dan `segment_aware` eksperimental opsional melakukan satu penerusan FFmpeg tetap tambahan pada aliran lokal yang sudah divalidasi, memilih stempel waktu adegan `showinfo` yang dibatasi, dan kembali secara deterministik ke titik tengah seragam yang sama pada kegagalan detektor, batas waktu, keluaran yang salah format, atau kumpulan kandidat yang kosong. Mode sadar segmen mengalokasikan sampel titik tengah secara proporsional dengan interval adegan yang divalidasi; bukti sadar segmen dan perilaku fallback dirinci di bawah ini. Batasan 16 bingkai diterapkan setelah seleksi di setiap kebijakan. Jika permintaan yang peka terhadap adegan hanya memiliki anggaran satu frame, permintaan tersebut akan menggunakan titik tengah seragam dari jendela fokus atau video penuh yang aktif dan melaporkan `policyEffective: uniform`: satu frame adegan yang dipilih tidak dapat mempertahankan kedua ujung temporal. Penelepon secara opsional dapat menyediakan jendela fokus terbatas (`start`/`end` detik); batasan dibatasi pada durasi media, jendela terbalik atau tidak terbatas ditolak, dan semua kebijakan pengambilan sampel dilakukan hanya dalam interval yang dinormalisasi. Jendela yang dihasilkan disertakan dalam metadata pengambilan sampel dan awalan deskripsi tidak tepercaya sehingga model hilir dapat membedakan kutipan terfokus dari garis waktu penuh.

Fokus teks semantik adalah pengaturan yang terpisah dan eksplisit. Mode analisis `full` default mempertahankan prompt frame yang ada dan tidak pernah meneruskan teks permintaan ke model teks. Dalam mode `focused`, jembatan hanya membaca `text`/`input_text` terbaru yang tidak kosong yang ditulis pengguna dari wadah Obrolan atau Respons yang sama, menormalkannya menjadi NFC, menciutkan karakter kontrol dan spasi, dan membatasinya hingga 500 titik kode Unicode. Hasil yang kosong akan kembali ke prompt `full` yang tepat. Petunjuk yang dapat digunakan diserialkan sebagai JSON dalam blok konteks pengguna tidak tepercaya dan hanya dapat memprioritaskan detail yang dapat diamati; itu tidak dapat mengesampingkan peringatan terpisah terhadap instruksi yang terlihat atau terdengar di media. Fokus tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah sampel temporal.

#### bukti segmen struktural FU-07

`segment_aware` menggunakan satu pra-analisis terbatas yang melewati aliran video lokal yang sudah divalidasi. Rantai filter tetap pertama-tama menskalakan hingga lebar maksimal 320 piksel, mendeteksi perubahan pemandangan dan interval beku, lalu mengambil sampel pada 1 frame per detik untuk informasi blur, luma rata-rata, dan spatial/temporal. Pass ini dibatasi hingga 600 sampel struktural, satu thread FFmpeg/filter, protokol `file` -only dan daftar izin kontainer yang sama, batas output proses 1 MiB, dan paling lama 30 detik di dalam abort/deadline. bersama broker. Ia tidak pernah menerima perintah, filter, jalur, atau URL dari permintaan.

Nilai-nilai struktural adalah bukti pengambilan sampel deterministik, bukan pemahaman video semantik. Mereka tidak menyimpulkan subjek, tindakan, keterangan, ucapan, atau maksud pengguna. Batas pemandangan dan pembekuan membentuk segmen; membekukan cakupan, mengaburkan, memaparkan, detail spasial, dan perubahan waktu hanya memengaruhi cara anggaran 1–16 frame yang ada dialokasikan. Segmen yang dibekukan sepenuhnya dibatasi pada satu frame, sedangkan segmen yang tidak dibekukan bersaing untuk mendapatkan sisa anggaran. Ketika batas melebihi jumlah frame, cakupan garis waktu yang seragam dipertahankan sehingga pemotongan awal yang cepat tidak dapat menyembunyikan segmen akhir yang panjang. Batas pemandangan dalam resolusi analisis 1 detik dari batas beku digabungkan.

Filter yang hilang, bukti malformed/empty, kesalahan detektor, atau batas waktu pra-analisis yang dibatasi gagal membuka kebijakan titik tengah seragam yang tepat. Pembatalan pemanggil atau tenggat waktu broker tidak gagal dibuka: ini menghentikan subproses dalam penerbangan, mencegah ekstraksi bingkai di kemudian hari, dan pohon sementara pribadi dihapus di `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menghasilkan perlengkapan FFmpeg nyata yang deterministik untuk penghematan panggilan teks pasca-dedup, alokasi anggaran gerak padat, bukti blur/exposure/SI-TI, pemotongan cepat dengan ekor panjang, dan positif palsu yang memudar secara bertahap. Ini mencatat waktu dinding pra-analisis dan, jika `/usr/bin/time` tersedia, CPU anak dan RSS puncak. Pemeriksaan kualitasnya hanyalah ramalan struktural saja. Kualitas model caption sebenarnya tetap `HOLD` karena harness ini tidak memiliki titik akhir resmi atau juri beku. Penghematan moneter juga tetap `HOLD` kecuali `--caption-cost-per-call-usd` memberikan estimasi per panggilan positif yang eksplisit; skrip tidak pernah membuat hasil apa pun.

Setiap frame dibatasi hingga 4 MiB, semua frame mentah digabungkan menjadi 23 MiB, dan respons broker berseri hingga 32 MiB. Direktori sementara pribadi dihapus di `finally`. OmniRoute tidak menggabungkan FFmpeg dan tidak menerima jalur khusus yang dapat dieksekusi. Sebelum pemberian teks, jembatan menerapkan jalur deduplikasi visual konservatif: setiap JPEG dikurangi menjadi buffer skala abu-abu 16 × 16 dan hanya dibandingkan dengan bingkai terakhir yang dipertahankan. Untuk anggaran teks yang diminta di atas satu frame, ekstraksi menyediakan kumpulan kandidat terbatas hingga dua kali lipat anggaran tersebut dan tidak pernah lebih dari 16 frame. Batasan yang diminta diterapkan hanya setelah deduplikasi, dengan kandidat terpilih pertama dan terakhir dipertahankan selama penipisan akhir ketika anggarannya setidaknya dua. Kebijakan `grayscale-16x16-mean-cells-v2` berversi menggunakan rata-rata luma delta yang lebih besar dan rasio sel thumbnail yang delta dinormalisasinya setidaknya 0,05. Ambang batas duplikat adalah konstanta 0,04, dipilih untuk prediktabilitas, bukan diekspos sebagai pengaturan runtime. Sinyal kontras tinggi sekunder ini mempertahankan gerakan kecil dan perubahan teks yang terlihat yang hanya dapat disembunyikan oleh perbandingan rata-rata. Kesalahan komparator atau dekoder gagal terbuka dan mempertahankan cakupan. Metadata keluaran memisahkan kandidat yang diekstraksi, bingkai yang berhasil digunakan, dan duplikat visual yang dihilangkan.

Bagian video yang ditandai secara eksplisit dapat meminta lembar kontak yang diberi stempel waktu. Jembatan ini paling banyak membangun kisi JPEG 4 kolom, 16 bingkai. Setiap sel 512 piksel membakar stempel waktu sumbernya menjadi pita bawah dengan kontras tinggi, sementara stempel waktu yang sama tetap berada dalam metadata tekstual untuk asosiasi dan audit hilir. JPEG lengkap tetap dibatasi pada 32 MiB. Jika `sharp` tidak dapat memecahkan kode atau menyusun grid, jembatan akan kembali ke frame JPEG individual; pembatalan klien masih menyebar melalui operasi sheet.

Bukti promosi sengaja dipisahkan dari komposisi sintetik microbenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` mendefinisikan harness A/B berversi skema untuk model visi nyata yang kompatibel dengan OpenAI. Ini mengukur token yang dilaporkan penyedia, latensi dinding end-to-end (termasuk komposisi sheet), jumlah panggilan model, dan retensi fakta yang ditentukan manifes. Respons model mentah tidak dituliskan ke dalam laporan; hanya intisari SHA-256 dan fakta yang cocok IDs yang dipertahankan. Harness tidak melakukan panggilan jaringan atau model berbayar kecuali `--execute-real` diteruskan dan `--model`, `OMNIROUTE_BASE_URL`, dan `OMNIROUTE_API_KEY` dikonfigurasi. Tanpa proses nyata yang eksplisit, putusan yang dapat dibaca mesin tetap `HOLD`; pengukuran payload/call-count sintetis saja bukanlah bukti promosi.

Penelepon dapat melampirkan array `transcript.cues` opsional ke bagian video yang didukung ketika mereka sudah memiliki teks yang selaras. Setiap isyarat harus membawa `text`, interval `start`/`end` yang terbatas di dalam durasi yang diperiksa, dan `source` yang masuk daftar putih (`client`, `embedded`, atau `audio-bridge`); `confidence` defaultnya adalah `1` dan harus tetap berada di antara `0` dan `1`. Isyarat duplikat yang tepat akan diciutkan. OmniRoute tidak pernah memulai transkripsi dari metadata ini: isyarat yang divalidasi disalin ke dalam hasil yang dijelaskan dengan sumber, keyakinan, dan interval, dan dirender sebagai pengamatan tidak tepercaya di samping keterangan bingkai. Teks yang tidak valid, di luar jangkauan, atau bebas asal akan ditolak, bukan dicampur ke dalam aliran teks. Kedua saluran transkrip isi permintaan menormalkan asal yang disediakan ke `client`, termasuk label `embedded` atau `audio-bridge` yang ditegaskan sendiri. Hanya adaptor milik server yang dapat menetapkan label tepercaya tersebut melalui argumen `trustedSource` khusus kode; bidang permintaan JSON tidak dapat mencapai argumen itu. Teks transkrip tetap merupakan konten turunan media yang tidak dapat dipercaya, terlepas dari asalnya, dan tidak boleh ditentukan otorisasinya.

Penelepon tingkat lanjut mungkin menyediakan trek `audioTranscript` untuk video yang sama; itu diperlakukan sebagai teks yang disediakan klien, bukan bukti transkripsi server. Lapisan fusi menjalankan pengamatan visual dan audio di bawah satu tenggat waktu dan sinyal batalkan, mengurutkannya pada garis waktu yang sama, menciutkan duplikat yang tepat, dan melaporkan hasil parsial ketika hanya satu pihak yang berhasil. `audioTranscript` yang tidak valid menurunkan hasil parsial tersebut — deskripsi visual disimpan dan cabang audio mencatat kode kegagalan yang dibersihkan — alih-alih menggagalkan seluruh video. Ketersediaan per cabang, bendera parsial, dan kode kegagalan yang dibersihkan disimpan dalam hasil yang dijelaskan, dalam metadata pagar pembatas (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam penghitung fusi jembatan. Jalur Video Bridge default tidak meminta ucapan-ke-teks atau mengunduh salinan media kedua; tanpa trek eksplisit itu, itu tetap hanya video.

**Retensi transkrip (#12150 P1).** Hal ini berlaku secara otomatis setiap kali Video Bridge (yang ikut serta) merender transkrip — tidak ada tanda retensi terpisah. Saat permintaan merender isyarat transkrip apa pun ( `transcript` yang dideklarasikan oleh penelepon atau `audioTranscript` yang digabungkan), pagar pembatas menandainya `videoBridgeObserved` dan menghasilkan bayangan deskripsi video yang disunting — rendering identik yang mana setiap isi teks bebas isyarat digantikan oleh `[redacted-video-transcript]`, dibuat dengan mengganti bidang isyarat terstruktur sebelum string dirakit (tidak pernah dengan mengurai teks yang diratakan, jadi tidak ada konten isyarat — permusuhan atau biasa, termasuk benda yang mengandung `]` seperti `[inaudible]`/`[music]` — dapat bertahan). Badan permintaan log panggilan yang ada menukar setiap bagian teks turunan video dengan bayangan yang telah disunting, disesuaikan dengan kesetaraan konten; jangkar `fullText` dibaca ulang dari payload pagar pembatas pra-panggilan yang telah selesai, sehingga pencocokan masih berhasil setelah pagar pembatas rantai selanjutnya ( PII dan masker kredensial, prioritas 10/95) menulis ulang teks deskripsi di tempatnya dan setelah injeksi system-prompt/handoff/memory membentuk ulang susunan pesan. Isi yang dikirim ke hulu ke model tidak berubah. Permintaan yang diamati juga tidak mengisi Memori yang tahan lama (ekstraksi turunan permintaan dan respons dilewati), sehingga balasan model tidak dapat menggemakan teks transkrip ke dalam Memori.

**Bidang video mentah (#12430).** Ketika jembatan diaktifkan dan dukungan video asli tidak diketahui atau tidak ada, bidang `transcript`/`audioTranscript` yang ditentukan juga mengaktifkan `videoBridgeObserved`, bahkan setelah deskripsi gagal atau batas `maxVideos`. `null` dan string kosong dihitung; bidang yang tidak ada dan metadata non-video tidak. Salinan yang disimpan menyunting bidang ini atau menghilangkan permintaan, dan caches/Memory dilewati.

Pada jalur fallback tersebut, isyarat pemanggil yang valid menjadi bagian `text`/`input_text` yang didukung, bukan bidang penyedia yang tidak standar. Kedua lagu yang disediakan berdasarkan permintaan tetap tidak dipercaya oleh pengamatan `client`, dengan peringatan eksplisit bahwa video tersebut tidak dijelaskan dan stempel waktunya tidak diverifikasi oleh media. Anggaran total dan per-isyarat 256-cue/64-KiB yang ada berlaku di kedua jalur secara bersamaan; stempel waktu harus sesuai dengan batas waktu 600 detik broker dan jendela fokus apa pun yang disediakan. Trek yang tidak valid dibuang, tidak diteruskan sebagai teks sembarangan; saudara kandung yang sah masih dapat digunakan kecuali anggaran gabungannya terlampaui. bidang Null/empty tidak menambahkan teks. Tidak ada pengambilan media atau transkripsi yang ditambahkan oleh fallback ini. Bidang ekstensi transkrip dihapus dari pembawa video cadangan dan objek `video_url`/`source` -nya. Daftar yang diizinkan kawat OpenAI tetap ketat; pembawa video asli yang tidak diketahui tetap tersedia dan target hanya teks yang diketahui tetap memiliki penanda yang aman. Bayangan redaksi terstruktur melindungi teks transkrip yang ditambahkan, sedangkan permintaan asli milik penelepon tetap tidak berubah. Target yang didukung asli dan jembatan yang dinonaktifkan mempertahankan perilaku bypass yang ada.

Salinan tambahan yang disimpan menggunakan sinyal permintaan observasi yang sama. Snapshot permintaan klien pra-pagar pembatas mentah, permintaan tertunda dalam memori, dan log permintaan awal yang ditolak secara struktural menggantikan bidang transkrip di bagian video; perintah string yang disintesis oleh tahapan pipeline dan handoff konteks disunting di sink isi permintaan yang bertahan. Penanda `video_content_removed` yang bertahan membuat kelanjutan `previous_response_id` gagal ditutup daripada merekonstruksi teks yang sengaja dibuang. Jika permintaan yang diamati kehilangan bayangan redaksi per bagiannya sebelum dicatat, atau bahkan salah satu dari beberapa bayangan video gagal cocok setelah mutasi permintaan berikutnya, isi permintaan yang dipertahankan akan dihilangkan seluruhnya alih-alih mempertahankan transkrip yang telah disunting sebagian.

Untuk permintaan yang diamati, respons model mungkin mengutip bagian mana pun dari transkrip tanpa batasan isyarat yang terstruktur. Oleh karena itu, log panggilannya yang tetap `responseBody` digantikan oleh penanda kelalaian; artefak alur pipa yang terperinci (yang dapat mencakup badan upstream/client dan potongan aliran) tidak dipertahankan. Cache semantik, idempotensi, dan pemutaran ulang penalaran mengabaikan proses baca dan tulis untuk permintaan tersebut. Permintaan penyedia dan respons yang terlihat oleh klien tetap tidak berubah. Byte keepalive awal akan terkuras dari buffer sementara ketika artefak detail dihilangkan. Kiro peringatan EventStream yang salah format hanya melaporkan jumlah byte payload, tidak pernah isinya atau kesalahan mentah parser JSON. Hal ini tidak berarti bahwa setiap diagnostik provider/plugin yang tidak terkait telah diaudit; sapuan sisa wastafel yang lebih luas dilacak di #11658.

Siklus hidup `/api/modality-bridge/video/drilldown` internal adalah substrat cache loopback/token-authenticated yang terpisah. Setiap operasi juga memerlukan prinsip buram kanonik ID. Sebelum pemanggil produksi diaktifkan, pemanggil tersebut harus memperoleh ID tersebut dari penyewa yang diautentikasi dan tidak boleh meneruskan nilai yang dipilih klien. Kunci cache mengikat entitas utama tersebut ke sesi kanonik dan referensi video IDs, hanya menyimpan kunci SHA-256-derived -nya, dan mencakup pembacaan dan penghapusan ke entitas utama yang sama. Cache menyimpan paling banyak 16 frame JPEG turunan per entri, kedaluwarsa setelah sepuluh menit, dan mendukung pembacaan `start`/`end` terbatas atau penghapusan sesi eksplisit.

Setiap kepala sekolah dibatasi hingga 16 entri dan 64 MiB data JPEG kanonik. Batasan tersebut tidak bergantung pada batas atas 64-entry/256 MiB global: tekanan kuota utama hanya akan mengeluarkan entri yang paling jarang digunakan sebelum penggusuran LRU global dipertimbangkan. Entri yang kedaluwarsa dihapus dari akuntansi utama dan global pada aktivitas cache, sementara kegagalan pembatalan dan validasi tidak melakukan penggantian sebagian.

Cache menolak Base64 non-kanonik, padding berlebih, media non-JPEG, format JPEGs yang salah atau terpotong, dan JPEGs yang menghasilkan peringatan selama dekode `sharp` gambar penuh yang dibatasi. Ini mengkodekan ulang setiap gambar yang diterima sebagai JPEG kanonik, memperoleh lebar dan tinggi dari byte yang didekodekan alih-alih mempercayai bidang pemanggil, dan membuang byte poliglot yang tertinggal daripada menyimpannya. Hanya buffer terkompresi kanonik terbatas yang dibebankan ke kedua kuota. Batas kabel JSON mencakup overhead Base64 untuk batas atas input yang didekodekan 32 MiB. Setiap derivasi yang disimpan mencatat JPEG format/resolution yang divalidasi, kebijakan pengambilan sampel, versi derivasi, waktu pembuatan, hash konten yang dihitung server, dan referensi induk yang di-hash ditambah hash konten induk pemanggil tepercaya. Pembatalan diperiksa antara fase decode/hash asinkron sebelum cache atom diterapkan.

Tahap ini belum menghubungkan produsen produksi ke jalur tersebut dan tidak menyediakan pemilihan varian multi-resolusi. Oleh karena itu, jalur permintaan Video Bridge yang transparan tidak menimbulkan pekerjaan tambahan, sementara derivasi utama yang terikat penyewa dan siklus hidup multi-resolusi FU-08 penuh tetap merupakan pekerjaan tindak lanjut yang eksplisit daripada didokumentasikan sebagai perilaku lengkap.

Bingkai diberi teks secara berurutan dengan model Video yang dikonfigurasi. Penggantian Video yang kosong mewarisi pengaturan Vision; jika keduanya kosong, router otomatis Vision akan memilih model berkemampuan vision yang efektif. Teks yang berhasil menggantikan bagian asli dengan awalan `[Video description:` stabil yang juga menandai teks sebagai pengamatan yang berasal dari media yang tidak tepercaya dan memberi tahu model hilir untuk tidak mengikuti instruksi yang ditemukan di media. Kunci cache frame-caption mencakup byte JPEG, prompt, stempel waktu, dan model efektif; hanya teks yang berhasil yang di-cache. Entri cache mempertahankan model produsen sukses yang sebenarnya, termasuk model cadangan; jembatan melaporkan `mixed` ketika frame berbeda diproduksi oleh model berbeda. Cache hit menggunakan kembali identitas produsen tersebut alih-alih memberi label ulang sebagai rencana perutean yang diminta. Cache hasil seluruh video dikunci pada setiap masukan yang mengubah perintah — keluaran, model efektif, kebijakan pengambilan sampel, jumlah bingkai, mode analisis semantik, sidik jari SHA-256 dari petunjuk fokus yang dinormalisasi, jendela fokus, `transcript`, `audioTranscript`, dan tanda lembar kontak — sehingga mengubah salah satu dimensi tersebut adalah kehilangan cache, bukan penggunaan ulang yang basi. Versi kebijakan pengurangan visual, ambang batas, dan jumlah bingkai kandidat yang dibatasi juga eksplisit dalam kunci cache hasil dan metadata; Oleh karena itu, perubahan kebijakan tidak dapat menggunakan kembali deskripsi keseluruhan video yang sudah usang. Metadata Result-cache v4 mempertahankan mode dan sidik jari, bukan tugas pengguna mentah. Metadata pagar pembatas melaporkan mode analisis yang diminta dan efektif; mode `focused` yang diminta tanpa teks pengguna yang dapat digunakan dilaporkan secara efektif `full`.

Pagar pembatas mengekstrak setiap bagian video yang didukung tetapi menjelaskan tidak lebih dari `modalityBridgeVideoMaxVideos`. Untuk target yang terbukti memiliki `supportsVideo === false`, video yang gagal dan melebihi batas menjadi penanda teks aman yang eksplisit sehingga tidak ada video mentah yang bertahan. Jika kemampuannya tidak diketahui, bagian-bagian tersebut tetap mempertahankan pembawa videonya; setiap transkrip cadangan mengikuti konversi teks terikat di atas. Target dengan `supportsVideo === true` melewati jembatan. Sinyal pembatalan permintaan klien menyebar melalui pengunduhan, antrian broker, subproses, dan panggilan teks; batalkan perhentian di antara video dan tidak pernah gagal terbuka untuk media mentah.

Pengaturan runtime didukung DB dan divalidasi Zod:

| Kunci                               | Bawaan      | Rentang / perilaku                                                                                                |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Waktu proses opsional, ikut serta                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mempertahankan teks umum; `focused` menggunakan konteks pengguna terbaru yang terbatas dan tidak tepercaya |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau proporsional `segment_aware`; kegagalan detektor kembali ke `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 mdtk                                                                                                  |

Nilai batas waktu video yang bertahan lama di atas 120 detik disesuaikan dengan tenggat waktu broker; pengaturan baru yang menulis di atas batas itu ditolak. `GET /api/modality-bridge/video/runtime` memerlukan lokalitas loopback yang diberi stempel tepercaya sebelum autentikasi atau pemeriksaan runtime, kemudian memerlukan autentikasi manajemen. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe yang sudah dibersihkan, dan alasan tetap ketika runtime tidak tersedia. Titik akhir ekstraksi internal bukan unggahan publik API: saturasi antrean mengembalikan `503` plus `Retry-After`, pemutusan pemanggil mengembalikan `499`, dan tenggat waktu broker tetap mengembalikan `504`. Respons yang dikonversi menambahkan `video->text;model=<visionModel>;parts=<videos>` ke header `x-omniroute-modality-bridge` pusat tanpa menghapus segmen Vision atau Audio.

### PII Masker (`piiMasker.ts`)

Berjalan terus** keduanya** tahapan.

- **`preCall`** mengkloning payload, berjalan `system`, `messages`, `input`, dan `prompt` (termasuk item string biasa), dan menerapkan `processPII()` (dari `@/shared/utils/inputSanitizer`) ke kolom string `content`/`text`. Ketika `PII_REDACTION_ENABLED=true`, PII yang terdeteksi disunting dalam payload keluar. Ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengontrol kebijakan injeksi cepat). Saat redaksi dinonaktifkan, deteksi catatan panggilan dihitung tanpa menulis ulang konten.
- **`postCall`** mengkloning respons secara mendalam, menjalankan `sanitizePIIResponse()` plus masker berbentuk Responses-API (`maskResponsesOutput` — mencakup `output_text` dan `output[].content[].text`). Jika ada redaksi yang terjadi, respons yang dimodifikasi akan menggantikan respons asli.

Pagar pembatas tidak pernah menghalangi; itu hanya memberi anotasi (`meta.detections`, `meta.redacted`) atau menulis ulang.

#### Pemilihan per jenis, pola khusus, dan penghitung deteksi

**Dasbor → Pengaturan → Keamanan → PII masking** memilih _apa_ yang disamarkan. Itu tidak mengaktifkan masking: itu masih `PII_REDACTION_ENABLED` (permintaan) dan `PII_RESPONSE_SANITIZATION` (respons + SSE), keduanya dinonaktifkan secara default.

- **Pilihan per jenis** — id bawaan tercantum di `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Tidak disetel berarti setiap jenis (perilaku sebelum pengaturan ini ada). Pola `ssn_us` mesin permintaan dipetakan ke `ssn`. Template (Minimal, Standar, Finansial, Brazil, USA, GDPR, POPIA, Full) hanya mengisi kotak centang di UI.
- **pengidentifikasi GDPR dan POPIA** — dua belas id bawaan yang mencakup EU dan pengenal pribadi Afrika Selatan (tabel di bawah). Regex, validator, dan tag yurisdiksinya berada dalam satu tabel, `src/shared/utils/piiPatterns.ts`, yang digunakan oleh pembersih respons (`src/lib/piiSanitizer.ts`) dan masker permintaan (`src/shared/utils/inputSanitizer.ts`). Kecocokan disunting hanya jika validatornya menerimanya; jumlah digit saja tidak pernah cukup. Operator yang menyimpan pilihan yang dipersempit sebelum id ini ada, mempertahankan perilakunya hingga id baru dicentang.
- **Pola khusus** — hingga 20 pola regex atau wildcard (`*` = hingga 64 karakter non-spasi, `?` = satu). Cocok menjadi `[CUSTOM_REDACTED]`. Setiap pola melewati `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): paling banyak 500 karakter, bendera dibatasi hingga `g i m s u`, harus dikompilasi, harus melewati `safe-regex` (pelacakan balik bencana), dan tidak boleh cocok dengan string kosong atau placeholder redaksi. Pola yang gagal ditolak saat disimpan dan diuji, dan baris tersimpan yang gagal dilewati saat runtime alih-alih dikompilasi. Pola khusus hanya berjalan saat penyembunyian aktif.
- **Penghitung deteksi** — jumlah per jenis (nilai tidak pernah cocok), disimpan di memori dan disetel ulang saat restart (`src/lib/pii/piiDetectionStats.ts`). Mereka hanya meningkat saat masking aktif.

Pengaturannya ada di tabel `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 detik. API:

| Metode | Jalur                    | Tujuan                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Negara bendera, `enabledTypes`, `customPatterns`, penghitung deteksi                  |
| `PUT`  | `/api/settings/pii`      | Ganti `enabledTypes` (`null` = semua) and/or `customPatterns`                         |
| `POST` | `/api/settings/pii/test` | Jalankan kering satu pola terhadap sampel paling banyak 8 KB; tidak ada yang disimpan |

Ketiganya memerlukan autentikasi manajemen dan memvalidasi isi dengan Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### pengidentifikasi GDPR (EU) dan POPIA (Afrika Selatan).

| Pengenal            | Pengidentifikasi                | Validasi                                                                                                 |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                            | Negara yang diketahui, panjang persisnya untuk negara tersebut, ISO 13616 MOD-97-10                      |
| `eu_vat`            | nomor EU VAT                    | Awalan negara anggota yang diketahui dan format nomor negara bagian tersebut (tidak ada pencarian VIES ) |
| `es_dni_nie`        | DNI Spanyol / NIE               | Surat kendali (nilai mod 23); NIE adalah `X/Y/Z` + 7 digit                                               |
| `it_codice_fiscale` | Skala Fiskal Kodeks Italia      | Surat kendali dari tabel posisi odd/even                                                                 |
| `pl_pesel`          | PESEL Polandia                  | Checksum tertimbang dan tanggal lahir yang dikodekan yang ada                                            |
| `nl_bsn`            | BSN belanda                     | 11-bukti (bobot 9..2, -1)                                                                                |
| `de_steuer_id`      | Steuer-ID Jerman                | ISO 7064 Mod 11,10 ditambah aturan struktur digit (tanpa awalan 0)                                       |
| `se_personnummer`   | Nomor orang Swedia              | Luhn atas sepuluh digit terakhir dan tanggal lahir yang masuk akal (10 atau 12 digit)                    |
| `za_id`             | Nomor ID Afrika Selatan         | Luhn atas semua 13 digit, month/day kelahiran yang valid, digit kewarganegaraan 0 atau 1                 |
| `za_phone`          | Telepon Afrika Selatan          | awalan `+27` / `27`, atau bentuk `0..` nasional yang ditulis dengan spasi atau tanda hubung              |
| `za_vat`            | Nomor VAT Afrika Selatan        | 10 digit dimulai dengan `4`** Dan** "VAT" / "BTW" pada 48 karakter sebelumnya                            |
| `za_tax_ref`        | Referensi pajak Afrika Selatan. | 10 digit dimulai dengan `0`-`3`, Luhn,** Dan** "tax" / "SARS" pada 48 karakter sebelumnya                |

Karena format hanya digit bertabrakan dengan nomor pesanan, nomor pembuatan, dan stempel waktu, format terlemah (`za_vat`, `za_tax_ref`) memerlukan isyarat kata kunci, dan sepuluh digit nomor `0..` tidak diperlakukan sebagai nomor telepon Afrika Selatan. Spasi IBANs (`GB29 NWBK ...`) tidak cocok. Di jalur streaming, isyarat hanya dilihat di dalam potongan saat ini. Id berada di depan pola telepon umum, sehingga pengidentifikasi yang divalidasi menyimpan placeholdernya sendiri (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Templat `gdpr` dan `popia` masing-masing memilih EU dan id Afrika Selatan. Masking itu sendiri tetap ikut serta (Aturan Keras #20): tidak ada apa pun di sini yang mengubah default tanda fitur.

### Injeksi Cepat (`promptInjection.ts`)

Mendeteksi struktur permusuhan dalam konten yang disediakan pengguna dan menerapkan kebijakan yang dikonfigurasi. Perilaku didorong oleh variabel lingkungan dan opsi konstruktor:

| Pengaturan        | Env var                                                                                             | Bawaan | Memengaruhi                                                                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Diaktifkan        | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | Ketika `false`, pagar pembatas mengalami hubungan pendek.                                                                                                                                                         |
| Mode              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | Kebijakan injeksi: `block`, `warn`, atau `log`. (`redact` diterima untuk back-compat tetapi diterima** bukan** menghapus teks injeksi; permintaan PII penulisan ulang dikendalikan oleh `PII_REDACTION_ENABLED`.) |
| Ambang batas blok | opsi `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Tingkat keparahan minimum diperlukan untuk memblokir. Medium hanya dapat diamati secara default.                                                                                                                  |

**Modus diutamakan** (`getMode`): penelepon `options.mode` → `INJECTION_GUARD_MODE`**DB penggantian bendera fitur** (Dasbor → Pengaturan → Fitur Bendera) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Oleh karena itu, penggantian dasbor menang atas env vars, sehingga Feature Flags UI mengontrol running guard secara langsung (tidak ada restart). Pembacaan DB aman dari kegagalan: jika terjadi kesalahan, penjaga akan kembali ke perilaku berbasis env, dan ketika tidak ada override yang disetel, perilakunya identik dengan resolusi khusus env.

Sumber deteksi:

1. `sanitizeRequest()` dari `@/shared/utils/inputSanitizer` (set detektor bersama yang digunakan di tempat lain dalam pipa).
2. `DEFAULT_GUARD_PATTERNS` bawaan (saat ini `system_override_inline` dan `markdown_system_block`, keduanya tingkat keparahan `high` ).
3. `customPatterns` opsional diteruskan melalui opsi konstruktor (string, regex, atau catatan `{ name, pattern, severity }` ).

Ketika `mode === "block"`** Dan** setidaknya satu deteksi memenuhi ambang batas keparahan, `preCall` mengembalikan `{ block: true, message: "Request rejected: suspicious content detected" }`. Dalam mode `warn`/`log`, pagar pembatas mencatat tetapi mengizinkan panggilan. `evaluatePromptInjection()` pembantu bersama juga diekspor untuk penelepon yang perlu mengevaluasi perintah tanpa melalui registri.

**Pemindaian terikat (v3.8.20):** detektor hanya memeriksa** 16 KB pertama** dari teks prompt yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 byte) di `src/shared/utils/inputSanitizer.ts`. Baik `detectInjection()` dan `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum menjalankan loop pola. Arahan injeksi berada di dekat bagian atas masukan, jadi ini membatasi regex CPU/GC pada muatan multi-ratus KB tanpa melemahkan deteksi (lih. #3932, #4041).

### Masker Kredensial (`credentialMasker.ts`)

Berjalan terus** keduanya** tahapan, terakhir dalam rantai default (prioritas `95`). Menyunting pola kunci API/token rahasia yang terkenal dari payload keluar (konten pesan, argumen panggilan alat, hasil alat)** Dan** respons penyedia, sehingga kredensial yang ditempelkan ke prompt (atau digaungkan kembali oleh hasil alat) tidak bocor ke penyedia upstream atau kembali ke klien.

- **Hanya ikut serta** , konvensi yang sama dengan redaksi PII (Aturan Keras #20-berdekatan): dinonaktifkan kecuali `settings.credentialRedactionEnabled === true`** atau** `CREDENTIAL_REDACTION_ENABLED=true`. Jika dimatikan, pagar pembatas menjadi — tanpa operasi yang tidak pernah diblokir dan tidak pernah ditulis ulang.
- `redactCredentials()` menelusuri pohon payload/response lengkap (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) dan mengganti kecocokan dengan placeholder `[REDACTED:<type>]`, hanya mengkloning cabang yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` mencakup kunci penyedia LLM (OpenAI, OpenAI-proj, Anthropic, Google, Memeluk Wajah, Replikasi), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square), kunci cloud ( kunci akses AWS, Twilio, SendGrid, Mailgun), kunci pribadi / JWTs, string koneksi yang mengandung kredensial (`mongodb://user:pass@...`, dll.), dan pola nilai header `Authorization`/`x-api-key`/`api-key`/`apikey` generik. Kunci berbentuk header (`authorization`, `x-api-key`, `api-key`, `apikey`) disunting secara struktural (hanya nilai, awalan skema seperti `Bearer `/`Basic ` dipertahankan) daripada melalui regex teks umum.
- Pagar pembatas tidak pernah menghalangi; itu hanya menulis ulang (`modifiedPayload` / `modifiedResponse`) dan memberi anotasi (`meta.credentialsRedacted`, `meta.count`).

Penjaga regresi: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true memutus rantai (short-circuit)
  message?: string; // dimunculkan saat memblokir
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
nilai yang mengalir melalui rantai untuk guardrail hilir.
`signal?: AbortSignal` membawa siklus hidup pemanggil ke dalam guardrail. Abort permintaan adalah pengecualian fail-open yang disengaja: jembatan media menghentikan pekerjaan dan melakukan pembersihan tanpa mengembalikan media mentah ke target yang diketahui tidak mendukungnya.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` menyediakan:

- `register(guardrail)` — menambahkan (atau menggantikan berdasarkan nama yang dinormalisasi) sebuah guardrail dan
  mengurutkan ulang berdasarkan `priority` menaik.
- `clear()` / `list()` — fungsi bantu administratif.
- `runPreCallHooks(payload, context)` — mengiterasi guardrail aktif, meneruskan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` pertama.
- `runPostCallHooks(response, context)` — alur yang sama di sisi respons.
- `resetGuardrailsForTests({ registerDefaults })` — membersihkan state dan secara opsional
  mendaftarkan ulang default untuk isolasi pengujian yang bersih.

Kedua runner mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
di mana `results` adalah array dari record `GuardrailExecutionResult` yang menyertakan
field `blocked`, `skipped`, `modified`, `error`, dan `meta` per guardrail,
yang berguna untuk pelacakan.

### Menonaktifkan Guardrail per Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` menggabungkan
daftar nama guardrail yang telah di-deduplikasi yang harus dilewati untuk
permintaan saat ini. Ada lima saluran, dibaca dalam urutan ini dan digabungkan menjadi satu daftar
(kemunculan pertama menang saat deduplikasi):

1. `apiKeyInfo.disabledGuardrails`
2. Body permintaan `disabledGuardrails` (tingkat atas)
3. Body permintaan `metadata.disabledGuardrails` (hanya ketika `metadata` adalah sebuah objek)
4. Header `x-omniroute-disabled-guardrails`
5. Header lawas `x-disabled-guardrails`

Kelima saluran digabungkan, termasuk kedua header: mengirim keduanya,
`x-omniroute-disabled-guardrails` dan `x-disabled-guardrails`, akan melewati gabungan dari
daftar keduanya, dan header modern yang kosong tidak lagi menyembunyikan header lawas
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), diperbaiki di
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Nilai dapat berupa array string atau string yang dipisahkan koma; nama dipangkas
dan dinormalisasi ke kebab-case huruf kecil (`pii_masker` → `pii-masker`), dan entri
kosong dibuang. Hasilnya diteruskan melalui `context.disabledGuardrails`
ke registry, yang melewati guardrail yang cocok (`skipped: true` di `results`).

Daftar penonaktifan hanya memengaruhi **registry**. Mode `block` prompt-injection
adalah batas wajib: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) memanggil `evaluatePromptInjection()`
tanpa daftar penonaktifan yang dikontrol pemanggil (pemanggilan mati
`resolveDisabledGuardrails({ body })` yang sebelumnya dilakukan telah dihapus di
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), sehingga permintaan
yang menonaktifkan `prompt-injection` tetap ditolak dalam mode `block`. Ini memang
sesuai desain. Saluran penonaktifan dikontrol oleh pemanggil (body permintaan,
metadata, header), dan pemanggil tidak boleh dapat mematikan kontrol keamanan
yang ditetapkan operator
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Penggabungan header
dari [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
hanya mengubah guardrail registry mana yang dilewati; ini tidak memungkinkan klien
melewati (bypass) middleware. Kebijakan guardrail wajib per kunci dan per grup
dilacak dalam RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Lihat [Cakupan dan batasan](#coverage-and-limits).

## Urutan Eksekusi

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts` (rute keluarga chat yang tercantum di bawah
[Cakupan dan batasan](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` membangun daftar lewati dari API key, body,
   dan header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail dalam
   urutan prioritas menaik:
   - Guardrail yang dinonaktifkan dicatat sebagai `skipped`.
   - `preCall` setiap guardrail dapat menulis ulang payload melalui `modifiedPayload`.
   - `block: true` pertama memutus rantai (short-circuit) dan handler
     mengembalikan respons penolakan guardrail.
3. Payload (yang mungkin telah ditulis ulang) mengalir ke combo routing dan
   dispatch upstream.
4. **Khusus non-streaming:** setelah respons disusun,
   `guardrailRegistry.runPostCallHooks(...)` menjalankan rantai yang sama pada
   respons. `block: true` di sini membuang respons upstream dan mengembalikan HTTP 400. Respons streaming melewati langkah ini sepenuhnya.

Guardrail yang melempar error dicatat dengan `error: <message>` dan dilog melalui
`logger.warn`, tetapi rantai tetap berlanjut — fail-open secara desain.

## Cakupan dan batasan

Registry guardrail hanya disambungkan ke pipeline chat. Batasan-batasan ini
dikunci oleh `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` dan
`tests/unit/guardrail-pipeline-characterization.test.ts`; perbarui pengujian tersebut
secara sengaja ketika perilakunya berubah.

### Di mana hook dijalankan

| Hook / kontrol                      | Dijalankan pada                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Permintaan yang ditangani oleh `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (dan `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, dan proxy chat Telegram. Juga endpoint pengujian dashboard `/api/guardrails/test`. Pemblokiran pra-panggilan mengembalikan HTTP 400. |
| `runPostCallHooks`                  | Hanya respons chat **non-streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Respons streaming tidak pernah mencapainya.                                                                                                                                                                                                                                                                                                             |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), di-pipe dalam `streamingPipeline.ts` ketika `PII_RESPONSE_SANITIZATION` aktif. Ini bukan guardrail, sehingga saluran penonaktifan tidak memengaruhinya.                                                                                                                                                                                                                                |
| Middleware injection-guard (legacy) | Setiap rute `/v1` yang membawa prompt, termasuk keluarga chat (lihat [cakupan rute](#injection-guard-route-coverage--red-team-phase-8--block-d)). Hanya prompt injection.                                                                                                                                                                                                                                                                            |

### Apa yang tidak tercakup

- **Rute media, embeddings, dan data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) tidak pernah mencapai registry. Tidak ada
  penyamaran PII, penyamaran kredensial, atau modality bridge yang berjalan di sana. Satu-satunya
  pemeriksaan mereka adalah middleware injection-guard legacy.
- **Respons streaming** tidak mendapatkan guardrail pasca-panggilan: tidak ada `pii-masker` atau
  `credential-masker` pasca-panggilan, dan tidak ada pemblokiran pasca-panggilan. Hanya transformasi PII
  streaming yang berlaku (ketika `PII_RESPONSE_SANITIZATION` aktif). Kredensial
  yang dipantulkan kembali dalam respons streaming tidak disamarkan.
- **Saluran penonaktifan vs. middleware (secara desain):** middleware mengevaluasi
  prompt injection dengan panggilannya sendiri ke `evaluatePromptInjection()`, tanpa
  meneruskan daftar penonaktifan yang dikendalikan pemanggil. Mode `block` adalah batas
  wajib yang tidak dapat dilewati oleh penonaktifan yang dikendalikan pemanggil, termasuk pada rute keluarga chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Menonaktifkan
  `prompt-injection` hanya melewati guardrail registry.

### Apa yang melihat respons sebelum pasca-panggilan

Pada jalur non-streaming urutannya adalah: ekstraksi memori → eksekusi tool
bawaan → guardrail pasca-panggilan → keluar akibat blok pasca-panggilan → penyimpanan semantic-cache.

- **Ekstraksi memori** dan **eksekusi alat** melihat respons sebelum guardrail
  pasca-panggilan dapat menulis ulang atau memblokirnya. Sejak
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstraksi
  memori menjalankan teks hasil ekstraksi melalui `sanitizePII` saat
  `PII_RESPONSE_SANITIZATION` aktif (baik streaming maupun non-streaming),
  tetapi respons yang kemudian diblokir oleh pasca-panggilan tetap sudah
  ditawarkan ke memori dan alat.
- **Cache semantik** menyimpan respons setelah pasca-panggilan, sehingga yang
  disimpan adalah respons yang telah ditulis ulang, dan respons yang diblokir
  tidak pernah di-cache. Entri cache diberi kunci per kunci API.

## Konfigurasi

Variabel lingkungan yang dibaca oleh guardrails bawaan:

| Variabel                              | Digunakan oleh            | Efek                                                                                                   |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Atur `false` untuk menonaktifkan deteksi sepenuhnya.                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Kebijakan injeksi: `warn`, `block`, atau `log`. Nilai lawas `redact` tidak menulis ulang teks injeksi. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode untuk injection guard; juga flag fitur DB yang **menimpa** variabel env (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Tingkat keparahan minimum yang ditolak oleh `MODE=block`: `high` (bawaan), `medium`, atau `low`.       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias lawas untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Jika `true`, PII pada permintaan disamarkan (terlepas dari mode injeksi).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Mengontrol perilaku masker sisi respons.                                                               |

Guardrails Modality Bridge membaca konfigurasi runtime dari penyimpanan
pengaturan yang didukung DB (`getSettings()`), bukan variabel env. Kunci utama
Vision adalah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci lawas
`visionBridge*` hanya diterima sebagai fallback baca satu siklus yang
terdokumentasi; penulisan dashboard menggunakan kunci utama. Nilai bawaan dan
resolver fallback berada di `src/shared/constants/modalityBridgeDefaults.ts`,
dengan konstanta lawas dipertahankan di `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, ditambah
pengaturan `modalityBridgeCache*` bersama. Audio tidak memiliki fallback kunci
lawas karena kunci-kunci ini diperkenalkan bersama skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, ditambah pengaturan `modalityBridgeCache*`
bersama. Fitur ini dinonaktifkan secara bawaan karena FFmpeg/ffprobe adalah
dependensi operasional opsional dan pemberian caption frame menambah latensi
serta biaya model.

## Guardrail Kustom

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Langkah-langkah:

1. Buat `src/lib/guardrails/myGuardrail.ts` yang meng-extend `BaseGuardrail`.
2. Implementasikan `preCall` dan/atau `postCall`.
3. Daftarkan saat waktu impor (push dari `registerDefaultGuardrails`) atau
   panggil `guardrailRegistry.register(...)` saat runtime — registry akan
   menggantikan guardrail sebelumnya yang memiliki nama ternormalisasi yang sama.
4. Tambahkan pengujian di bawah `tests/unit/` (contoh yang sudah ada:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` di antara pengujian untuk memulai dari keadaan
yang diketahui. Berikan `{ registerDefaults: false }` untuk memulai dengan registry
kosong dan hanya mendaftarkan guardrail yang sedang diuji. Vision Bridge menerima
dependency injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge
menyediakan seam yang setara untuk pengaturan, kapabilitas, pemilihan model STT,
pemeriksaan kredensial, dan transkripsi. Dengan demikian, pengujian dapat menguji
kedua alur tanpa akses DB atau jaringan.

## Lihat Juga

- `src/lib/guardrails/` — implementasi
- `src/shared/utils/inputSanitizer.ts` — detektor bersama yang mendukung
  prompt-injection dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — default Vision Bridge dan
  daftar model forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — default runtime Vision/Audio bersama
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogonal (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — referensi lengkap variabel env

## Cakupan rute injection-guard & red-team (Fase 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) mencakup semua rute
yang menerima prompt pengguna. Guard ini mematuhi `INJECTION_GUARD_MODE` (default `warn`
= hanya log; `block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis           | Rute                                                                                                                                                 | Mode default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Teks (yang ada) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generatif       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstraksi teks (`extractMessageContents`) mencakup `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (malam hari, `nightly-llm-security.yml`):** promptfoo memvalidasi bahwa setiap
rute memblokir korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan probe
(dilewati tanpa secret). `moderations` disertakan demi konsistensi. Mode blokir adalah batas
wajib: `evaluatePromptInjection()` mengabaikan daftar penonaktifan per-permintaan yang
diberikan middleware, sehingga `disabledGuardrails` **tidak** mengecualikan rute dari mode
ini ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Workflow malam hari (`.github/workflows/nightly-llm-security.yml`, cron + dispatch
manual) memiliki dua job:

- **`promptfoo-guard` (pemblokir)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kasus adversarial (mis. "abaikan semua
  instruksi sebelumnya…", jailbreak gaya DAN) menegaskan bahwa respons membawa
  `error.code === "SECURITY_001"`, yaitu guard benar-benar menolak permintaan tersebut.
- **`garak` (advisori)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instance OmniRoute lokal (`http://localhost:20128/v1`). Digerbangi oleh
  secret provider (`PROMPTFOO_PROVIDER_KEY`); dilewati secara graceful dan diakhiri
  `|| true`, sehingga melaporkan tanpa menggagalkan CI.

Cakupan helper guard (`createInjectionGuard` / `withInjectionGuard`) menjangkau setiap
rute `/v1` yang membawa prompt; teks prompt diambil dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` di `src/shared/utils/inputSanitizer.ts`.
