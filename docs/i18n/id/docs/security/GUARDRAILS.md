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

## Guardrail Bawaan

Registry memuat enam guardrail secara otomatis dalam urutan prioritas saat
impor (lihat `registry.ts` → `registerDefaultGuardrails()`):

| Prioritas | Nama                | Tahap          | Berkas                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Angka prioritas yang lebih kecil berjalan **lebih dulu**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Model dasar GLM 5.3 dan `glm-5.3-{low,high,max}` memiliki metadata
registry/spec `supportsVision:false` yang eksplisit. Varian GLM 5.3 Flash
tetap menjadi model vision native. Rute `/v1/messages` milik Claude Code
memasuki rantai guardrail pre-call `handleChat` bersama **sebelum** translasi
Claude-ke-OpenAI; gambar tool-result `Read` yang bersarang harus
dideskripsikan atau ditangani sebelum translasi tersebut mengangkatnya ke
dalam konten `image_url` OpenAI (#17069).

Mencegat permintaan pembawa gambar yang ditujukan ke **model non-vision** dan
mengalihkan rute seluruh permintaan ke model berkemampuan vision, atau
mengganti bagian-bagian gambar dengan deskripsi teks yang dihasilkan oleh
model vision yang dapat dikonfigurasi sebelum panggilan upstream. Ini
memungkinkan penyedia khusus-teks menangani payload multimodal secara
transparan.

Alur:

1. Lewati jika model target sudah mendukung vision (kecuali jika model
   tersebut tercantum dalam daftar forced-bridge `isVisionBridgeForcedModel`).
2. Ekstrak bagian gambar melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mendelegasikan ke **detektor media
   terpadu** `detectMediaParts()` di `open-sse/utils/mediaParts.ts` — sumber
   acuan tunggal yang dipakai bersama dengan filter kompatibilitas combo.
   Ekstraksi dibatasi (allowlist) pada bentuk-bentuk yang dapat disisipkan
   kembali oleh `replaceImageParts` (kontrak extract↔replace): `image_url`
   OpenAI, base64 Anthropic `source.type:"base64"`, URL Anthropic
   `source.type:"url"`, dan `input_image` Responses API. Gambar yang cocok
   dan bersarang di dalam `tool_result.content` Claude Code serta output tool
   Responses juga diekstrak dan diganti di jalur aslinya; bentuk
   khusus-indikator adalah materi filter combo dan tidak diekstrak.
   Lewati jika tidak ada yang ditemukan.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kunci pengaturan
   `modalityBridge*` yang baru didahulukan; kunci `visionBridge*` lawas tetap
   menjadi **fallback satu siklus** (jendela rollback). Lewati sebelum
   penelusuran media apa pun ketika bridge dinonaktifkan.
4. Pemilih mode (`modalityBridgeVisionMode`, lihat tabel di bawah) memutuskan
   reroute vs describe. Reroute mengembalikan `modifiedPayload` dengan hanya
   `model` yang ditukar, ditambah meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Jalur describe: batasi gambar hingga `maxImages`, susun prompt yang
   disesuaikan dengan tugas, periksa cache describe, panggil model vision
   **secara paralel** (`Promise.allSettled`), dan sisipkan bagian teks
   `[Image N]: <description>` sebagai penggantinya. Describe yang gagal
   menghasilkan `null`: gambar mentah dipertahankan untuk target yang tidak
   diketahui/berkemampuan vision (#4012), tetapi **target langsung yang
   terkonfirmasi khusus-teks** atau combo tanpa vision mendapatkan stub teks
   eksplisit `(unavailable — no vision-capable provider connected)` untuk
   setiap gambar yang tidak terdeskripsikan, termasuk kegagalan parsial dan
   gambar yang melebihi batas panggilan describe (#17069). Fallback describe
   combo untuk kasus semua-gagal yang sudah ada tetap berlaku (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mode (`modalityBridgeVisionMode`)

| Mode       | Default | Perilaku                                                                                                                                                                                                                                                                                   |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔       | Heuristik lama, tidak diubah (#6640/#7204): model non-combo/`auto/` di-reroute ke model visi terbaik kecuali model aslinya sudah memiliki kredensial yang dapat digunakan (maka describe); target combo selalu describe.                                                                   |
| `describe` |         | Selalu describe — blok reroute dilewati sepenuhnya; model yang dipilih pengguna selalu menjawab.                                                                                                                                                                                           |
| `reroute`  |         | Paksa reroute: penjaga keep-credentialed-model dilewati. Penjaga kredensial **target** reroute tetap berlaku — ketika tidak ada target visi yang dapat digunakan, bridge memblokir dengan error yang jelas alih-alih melakukan describe atau mengirim gambar mentah ke target khusus teks. |

Mode paksa melakukan short-circuit **sebelum** heuristik auto berjalan; perilaku `auto`
identik secara byte dengan guardrail pra-PR-1.

#### Cakupan kunci API (`visionBridgeKeyScope.ts`)

Ketika kunci API pemanggil membatasi `allowedConnections`, pool kuota
(`allowedQuotas`) atau model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge hanya
memilih model reroute dan describe yang boleh digunakan kunci tersebut, pada
koneksi yang boleh digunakan kunci tersebut. Panggilan describe kemudian selalu
melewati self-loop OmniRoute dengan header `x-omniroute-self-loop-key-id`,
sehingga permintaan chat penerima menerapkan kembali kebijakan koneksi dan
model kunci tersebut. `enforceApiKeyPolicy()` menghormati header tersebut hanya
bersama dengan bearer self-loop, sehingga hanya dapat mempersempit akses, dan
id yang tidak dapat di-resolve akan ditolak.

Jika tidak ada model visi yang diizinkan untuk kunci tersebut, **target khusus
teks yang terkonfirmasi** menolak permintaan gambar secara lokal dengan HTTP 400
yang jelas alih-alih meneruskan byte gambar ke upstream yang tidak mampu
(#17069). Untuk target dengan kemampuan visi yang tidak diketahui atau native,
jalur describe mempertahankan perilaku fail-open sebelumnya (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Permintaan tanpa
kunci, dan kunci tanpa pembatasan ini, berperilaku persis seperti sebelumnya.

#### Prompt describe yang sadar tugas (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks **pesan pengguna terakhir** (dipotong hingga 500 karakter) ke prompt
describe dasar, mengarahkan deskripsi ke apa yang sebenarnya ditanyakan pengguna
(pola codex-vision-proxy) dan meminta model visi untuk mentranskripsikan teks
yang terlihat. Dengan flag mati — atau tanpa teks pengguna — prompt dasar
digunakan tanpa perubahan.

Permintaan OpenAI-compatible milik self-loop describe itu sendiri
(`callVisionModelSingle()` di `visionBridgeHelpers.ts`) selalu meminta
`image_url.detail: "high"` — tanpa syarat, untuk setiap pemanggil/provider,
tidak bergantung pada sinyal klien apa pun. Sampling detail rendah menurunkan
akurasi OCR tepat untuk tugas transkripsi teks yang diminta prompt ini,
sehingga panggilan describe itu sendiri selalu meminta detail tinggi terlepas
dari tingkat detail apa yang digunakan permintaan masuk asli. Ini hanya
memengaruhi body permintaan describe internal; tidak mengubah cara OmniRoute
meneruskan `image_url.detail` milik pemanggil pada permintaan utama — default
tersebut diterapkan secara terpisah, dan hanya untuk klien OpenCode yang
terdeteksi, di `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang wire-format Anthropic
dari self-loop describe tidak memiliki field `detail` dan tidak terpengaruh oleh
kedua default tersebut.

#### Batas output describe (`modalityBridgeVisionMaxChars`)

| Kunci                          | Default | Rentang            |
| ------------------------------ | ------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`     | `0` atau 100–50000 |

`0` (default) berarti **tanpa batas** — deskripsi yang dikembalikan oleh
`callVisionModel()` diteruskan tanpa modifikasi, mempertahankan perilaku yang
ada. Nilai apa pun dalam rentang 100–50000 memotong deskripsi dengan akhiran
`…` sebelum disisipkan kembali sebagai `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` di `src/lib/guardrails/visionBridge.ts`).
Naikkan nilai ini untuk tugas OCR yang padat detail di mana model hilir
membutuhkan transkripsi lengkap; turunkan untuk membatasi penggunaan token pada
model visi yang cerewet. Field dashboard berada di panel Advanced pada tab
Vision (`modality-bridge-max-chars` di `ModalityBridgeVisionTab.tsx`) dan
menaikkan nilai apa pun antara 1 dan 99 ke batas bawah 100 sambil membiarkan
`0` eksplisit tidak tersentuh — `0` adalah nilai Zod yang valid dengan
sendirinya (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
bukan sekadar default "belum diatur".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output describe, dibagikan di seluruh proses.
Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)` dengan
framing length-prefix (tanpa tabrakan batas field). Komponen model adalah model
bridge yang **dikonfigurasi**, bukan model yang benar-benar menjawab —
`callVisionModel` dapat melakukan fallback secara internal, dan keying per
percobaan akan memecah cache. Describe yang gagal tidak pernah di-cache.
Pengaturan:

| Kunci                           | Default | Rentang |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasi gambar remote (self-loop describe/base64 fetch)

Ketika bridge mengambil gambar **remote** itu sendiri — panggilan mandiri (self-call) describe Anthropic dan konversi base64 claude-wire-format (`ensureBase64ImagesForClaudeWire`), keduanya melalui `fetchRemoteImageAsDataUri()` di `visionBridgeHelpers.ts` — data URI yang dihasilkan dilewatkan melalui `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sebelum disematkan ke dalam permintaan vision-model. Gambar berukuran besar diturunkan skalanya ke **sisi panjang 2048px** (sesuai dengan batas resize yang sudah diterapkan OpenAI/Anthropic di sisi server), yang memangkas byte/latensi upload tanpa mengubah apa yang dilihat model vision. Resize menggunakan `sharp`, yang dimuat melalui dynamic import: pada platform di mana binary native-nya gagal dimuat, `normalizeDataUri()` **tidak pernah melempar error** — ia melakukan fallback ke passthrough byte asli, sehingga jalur describe/konversi-base64 selalu tetap berfungsi. Byte non-gambar (fetch yang tidak mengembalikan gambar yang dapat didekode) juga dilewatkan apa adanya tanpa perubahan. Normalisasi ini dibatasi hanya untuk gambar yang diambil bridge bagi panggilan mandirinya — tidak pernah diterapkan pada payload passthrough mentah milik pemanggil, konsisten dengan prinsip mutasi khusus opt-in (Hard Rule #20).

#### Skema pengaturan + migrasi

Kunci `modalityBridge*` yang baru divalidasi dengan Zod di `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan grup `modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi `141_modality_bridge_settings.sql` menyalin nilai `visionBridge*` lama yang sudah ada ke kunci baru yang sesuai (idempoten, tidak pernah menimpa nilai `modalityBridge*` yang telah diatur operator); kunci lama tetap diterima sebagai fallback baca selama satu siklus rilis.

#### Header transparansi + statistik

Respons hasil transformasi describe membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibangun oleh `buildModalityBridgeHeader()` di `modalityBridge/bridgeStats.ts`, ditandai oleh `withModalityBridgeHeader()` di `src/sse/handlers/chatHelpers.ts`). Permintaan yang di-reroute **tidak** mendapatkan header — payload tidak diubah dan pertukaran model sudah terlihat pada field `model` di body respons.

`GET /api/modality-bridge/stats` (autentikasi manajemen, tier yang sama dengan
`GET /api/settings`) mengembalikan penghitung per-modalitas di dalam memori
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percobaan, sebagai penyebutnya; operasi tanpa pengukuran waktu tidak mengarang sampel nol milidetik. `bridged` tetap menjadi alias kompatibel-mundur untuk konversi yang berhasil; percobaan yang gagal tidak menambahnya.
Penghitung direset saat proses dimulai ulang, sesuai desain
(telemetri, bukan akuntansi).

#### Konfigurasi dashboard

Halaman dashboard khususnya adalah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`, dan `Video` yang dapat dialamatkan melalui URL mempertahankan parameter query saat mengganti nilai `tab`. Tab Vision mengekspos pengaktifan, mode, pemilihan model (termasuk default otomatis), prompting task-aware, batas lanjutan untuk timeout/jumlah-gambar/panjang-deskripsi/cache, penghitung runtime, dan permintaan sampel yang dijaga. Tab Audio juga sudah aktif: mengekspos pengaktifan, pemilih model khusus STT dengan opsi Auto, batas timeout/klip-maks, penghitung audio, dan uji sampel `input_audio`. Tab Video sudah fungsional: ia melaporkan status runtime FFmpeg/ffprobe — salah satu dari empat status UI eksplisit (`unknown` saat probe sedang berlangsung atau tidak dapat diselesaikan, `restricted` pada host dashboard non-loopback di mana probe dilewati di sisi klien, `unavailable` setelah diprobe dan dipastikan tidak ada, atau `available` beserta versi FFmpeg/ffprobe) — menyimpan batas enable/model/frame/video/timeout, memfilter pemilih model hanya ke model berkemampuan vision, dan mengekspos penghitung video.

Kartu Vision Bridge lama di bawah pengaturan AI kini menjadi tautan kompatibilitas ke halaman baru; ia tidak lagi memiliki salinan kedua dari formulir tersebut. Media Providers juga menautkan alur kerja Image-to-Text dan Speech-to-Text ke tab Modality Bridge yang sesuai tanpa menghapus playground Speech-to-Text yang sudah ada.

**Bypass admission self-loop:** ketika panggilan describe dirutekan melalui self-loop `/v1` milik OmniRoute sendiri (model penyedia non-standar), sub-permintaan mengirim
`x-omniroute-admission-bypass: internal` dan diautentikasi dengan kredensial self-loop yang terselesaikan — sentinel `sk_omniroute` lokal dalam mode lokal, atau kunci env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang dikonfigurasi operator (#1350) agar deployment `REQUIRE_API_KEY=true` tetap dapat menjalankan panggilan describe. Bypass hanya berlaku untuk kredensial yang persis tersebut, sehingga klien eksternal tidak dapat menggunakan header itu untuk melewati admission.

Default legacy berada di `src/shared/constants/visionBridgeDefaults.ts`; default mode/task-aware/cache yang baru beserta resolver pengaturan berada di
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail mengekspos opsi konstruktor `deps` sehingga pengujian dapat menyuntikkan implementasi `getSettings` dan `callVisionModel` tiruan.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Mencegat permintaan chat bermuatan audio sebelum mencapai target yang tidak diketahui menerima input audio. Ia tidak pernah me-reroute permintaan chat: bagian audio ditranskripsikan melalui endpoint multipart kompatibel-OpenAI yang sudah ada, dan model chat yang dipilih melanjutkan dengan transkrip teks.

Alur:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   registri provider yang eksplisit diutamakan, kemudian metadata model statis,
   lalu `modalities_input` yang tersinkron. Daftar input yang dideklarasikan tanpa
   `audio` bernilai `false`; tanpa bukti kapabilitas nilainya tetap `null`. Baik
   `false` maupun `null` mengaktifkan bridge konservatif, sedangkan `true`
   melewatinya.
2. Selesaikan pengaturan `modalityBridgeAudio*` dan ekstrak bagian audio tingkat
   atas yang dapat di-splice dari setiap pesan melalui detektor bersama
   `detectMediaParts()`. Bentuk wire yang didukung adalah `input_audio` OpenAI,
   `audio_url`, dan `source.media_type: "audio/*"`. Audio bersarang terdeteksi
   untuk perutean tetapi tidak dihapus oleh jalur splice. Pekerjaan dibatasi oleh
   `modalityBridgeAudioMaxClips`; bagian-bagian berikutnya dibiarkan utuh.
3. Hormati `provider/model` yang dikonfigurasi, atau biarkan
   `selectAudioBridgeModel()` menelusuri `AUDIO_TRANSCRIPTION_PROVIDERS` dalam
   urutan katalog yang stabil dan memilih model pertama dengan kredensial
   provider aktif yang dapat digunakan.
4. `callAudioTranscription()` mengonversi audio base64/data-URI menjadi `file`
   multipart, atau mengunduh `audio_url` jarak jauh melalui pelindung outbound
   khusus-publik dengan DNS pinning dan batas 25 MB. Kemudian ia mengirimkan
   (POST) file dan model terpilih ke self-loop lokal `/v1/audio/transcriptions`,
   yang diautentikasi dengan `resolveSelfLoopBearer()`. Rute transkripsi yang ada
   melakukan pencarian kredensial normal, penanganan cooldown/rate-limit, dan
   dispatch provider.
5. Panggilan yang berhasil menggantikan bagiannya dengan
   `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`:
   kegagalan individual mempertahankan bagian audio asli tersebut (kontrak
   #4012). Jika setiap panggilan gagal dan target terbukti
   `supportsAudio === false`, bagian-bagian tersebut menjadi
   `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk
   target yang tidak diketahui (`null`), hasil kegagalan total dibiarkan utuh.
   Target yang terbukti hanya-teks tanpa kredensial STT yang dapat digunakan
   menerima stub eksplisit yang sama tanpa melakukan panggilan jaringan.

Transkrip yang berhasil menggunakan cache LRU/TTL Modality Bridge lingkup-proses.
Kuncinya menggabungkan referensi audio, label operasi `audio-transcription` yang
stabil, dan model STT terpilih; kegagalan tidak pernah di-cache. Upaya audio
memperbarui counter bersama `bridged`, `cacheHits`, `failures`, dan `lastUsedAt`.
Respons yang ditransformasikan membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak tersentuh tidak menerima segmen Audio Bridge.

Pengaturan runtime didukung DB dan divalidasi Zod:

| Kunci                         | Default | Rentang              |
| ----------------------------- | ------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Otomatis atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

Cache bersama tetap dikendalikan oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Mencegat bagian video tingkat atas di `messages` Chat Completions dan `input`
Responses API sebelum target tanpa dukungan video native yang diketahui dipanggil.
Bentuk yang didukung adalah `input_video`, `video_url`, `video_source`, URL
HTTPS, dan data URI `data:video/*;base64,...`. Nama file polos dalam teks tidak
diperlakukan sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki traversal permintaan,
pemeriksaan kapabilitas/kebijakan, agregasi per-permintaan, dan payload respons.
Pekerjaan per-video — akuisisi, cache hasil-keseluruhan, mendeskripsikan urutan
frame (yang menggabungkan transkrip audio apa pun yang dideklarasikan pemanggil),
serta metrik/abort/pembersihan per-upaya — disembunyikan di balik
`processVideoPart` di `videoBridgePipeline.ts`, yang dipanggil sekali per bagian
video di dalam loop `preCall`. Modul tersebut juga mendefinisikan batas port
eksplisit `VideoMediaBrokerPort` (mengakuisisi byte dan mengekstrak frame
sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang
dideklarasikan pemanggil dengan caption sampel), dan `VideoDrilldownPort` (batas
persistensi drill-down frame; belum dihubungkan ke `processVideoPart` — hanya
rute terpisah `/api/modality-bridge/video/drilldown` yang menulis entri
drill-down saat ini).

Jalur permintaan publik `/v1` tidak pernah mengimpor atau memanggil subproses.
Video jarak jauh diunduh dengan batas 50 MiB; video base64 inline memiliki batas
konservatif 36 MiB hasil dekode per video sehingga amplop
model/messages/framing dapat tetap berada di dalam batas penerimaan permintaan
JSON publik sebesar 50 MiB. Panjang inline dan estimasi ukuran hasil dekode
diperiksa sebelum alokasi. HTTPS diwajibkan pada URL jarak jauh awal dan setiap
redirect, menggunakan pelindung outbound khusus-publik yang ada dengan DNS
pinning. Byte tersebut kemudian melintasi batas broker internal yang tepat
`POST /api/modality-bridge/video/extract`. Rute tersebut sekaligus `LOCAL_ONLY`
dan `SPAWN_CAPABLE`, hanya menerima permintaan trusted-loopback yang
diautentikasi per-proses, dan tidak pernah menerima URL, path sistem file,
executable, atau daftar argumen. Pipeline ukuran-body API dan pembaca body
inkremental milik handler secara independen menegakkan batas input broker 50
MiB. Antrean terbatasnya menjalankan satu ekstraksi pada satu waktu, mengizinkan
empat pekerjaan tertunda, dan membatasi input tertunda pada 100 MiB.

Di dalam broker, `ffprobe` membaca file lokal privat; daftar izin format tetap mengecualikan format playlist dan manifes. Untuk kontainer keluarga MOV yang diizinkan, referensi data MOV eksternal tetap dinonaktifkan secara default, dan perintah tetap tidak mengaktifkannya. Baik `ffprobe` maupun `ffmpeg` menggunakan daftar putih protokol khusus `file`, satu thread, array argumen tetap, tanpa shell, dan executable yang diselesaikan dari `PATH`. Stream sampul gambar terlampir bukan kandidat yang dapat diputar. Semua stream yang dapat diputar harus memenuhi batas-batas tersebut, dan stream default eksplisit diprioritaskan sebelum fallback indeks terendah yang deterministik. Video dibatasi hingga 600 detik, 8,192 piksel per dimensi, dan 33,554,432 piksel sumber. FFmpeg mengambil sampel 1–16 frame JPEG titik tengah, memperkecil sisi panjang hingga maksimal 1,024 piksel tanpa memperbesar input yang lebih kecil, dan tidak pernah menerima URL. Pengambilan sampel secara default adalah `uniform`. Kebijakan opsional `scene_aware` dan kebijakan eksperimental `segment_aware` melakukan satu pass FFmpeg tetap tambahan atas stream lokal yang sudah divalidasi, memilih timestamp scene `showinfo` yang dibatasi, dan kembali secara deterministik ke titik tengah uniform yang sama saat detektor gagal, timeout, output cacat, atau kumpulan kandidat kosong. Mode segment-aware mengalokasikan sampel titik tengah secara proporsional terhadap interval scene yang tervalidasi; bukti segment-aware dan perilaku fallback dirinci di bawah. Batas keras 16 frame diterapkan setelah seleksi di setiap kebijakan. Ketika permintaan scene-aware hanya memiliki anggaran satu frame, permintaan tersebut menggunakan titik tengah uniform dari jendela aktif video penuh atau jendela fokus dan melaporkan `policyEffective: uniform`: satu frame scene terpilih tidak dapat mempertahankan kedua ujung temporal. Pemanggil dapat secara opsional menyediakan jendela fokus terbatas (`start`/`end` dalam detik); batasnya diklem pada durasi media, jendela terbalik atau tak hingga ditolak, dan semua kebijakan pengambilan sampel hanya dilakukan di dalam interval yang dinormalisasi. Jendela yang dihasilkan disertakan dalam metadata pengambilan sampel dan dalam awalan deskripsi tak tepercaya sehingga model hilir dapat membedakan kutipan terfokus dari linimasa penuh.

Fokus kaption semantik adalah pengaturan eksplisit yang terpisah. Mode analisis default `full` mempertahankan prompt frame yang ada dan tidak pernah meneruskan teks permintaan ke model kaption. Dalam mode `focused`, bridge hanya membaca `text`/`input_text` terbaru yang tidak kosong dan ditulis oleh pengguna dari kontainer Chat atau Responses yang sama, menormalisasinya ke NFC, menggabungkan karakter kontrol dan spasi, dan membatasinya hingga 500 code point Unicode. Hasil kosong akan kembali ke prompt `full` yang sama persis. Petunjuk yang dapat digunakan diserialisasikan sebagai JSON dalam blok konteks-pengguna-tak-tepercaya khusus dan hanya boleh memprioritaskan detail yang dapat diamati; petunjuk tersebut tidak dapat menimpa peringatan terpisah tentang larangan mengikuti instruksi yang terlihat atau terdengar di media. Fokus tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah pengambil sampel temporal.

#### Bukti segmen struktural FU-07

`segment_aware` menggunakan satu pass pra-analisis terbatas atas stream video lokal yang sudah divalidasi. Rantai filter tetap pertama-tama menskalakan hingga lebar maksimal 320 piksel, mendeteksi perubahan scene dan interval beku, lalu mengambil sampel pada 1 frame per detik untuk blur, luma rata-rata, dan informasi spasial/temporal. Pass ini dibatasi hingga 600 sampel struktural, satu thread FFmpeg/filter, daftar izin protokol khusus `file` dan kontainer yang sama, batas output proses 1 MiB, dan maksimal 30 detik di dalam abort/deadline bersama broker. Pass ini tidak pernah menerima perintah, filter, path, atau URL dari permintaan.

Nilai-nilai struktural adalah bukti pengambilan sampel deterministik, bukan pemahaman video semantik. Nilai-nilai tersebut tidak menyimpulkan subjek, aksi, kaption, ucapan, atau maksud pengguna. Batas scene dan batas beku membentuk segmen; cakupan beku, blur, eksposur, detail spasial, dan perubahan temporal hanya memengaruhi bagaimana anggaran 1–16 frame yang ada dialokasikan. Segmen yang sepenuhnya beku dibatasi satu frame, sementara segmen tidak beku bersaing memperebutkan sisa anggaran. Ketika jumlah batas melebihi jumlah frame, cakupan linimasa uniform dipertahankan sehingga potongan cepat di awal tidak dapat menyembunyikan segmen panjang di akhir. Batas scene yang berada dalam resolusi analisis 1 detik dari batas beku digabungkan.

Filter yang hilang, bukti cacat/kosong, kesalahan detektor, atau timeout pra-analisis terbatas akan gagal terbuka (fail open) ke kebijakan titik tengah uniform yang sama persis. Abort pemanggil atau deadline broker tidak gagal terbuka: hal tersebut menghentikan subproses yang sedang berjalan, mencegah ekstraksi frame berikutnya, dan pohon sementara privat dihapus di `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menghasilkan fixture FFmpeg nyata yang deterministik untuk penghematan panggilan kaption pasca-dedup, alokasi anggaran gerakan padat, bukti blur/eksposur/SI-TI, potongan cepat dengan ekor panjang, dan false positive fade bertahap. Skrip ini mencatat wall time pra-analisis dan, jika `/usr/bin/time` tersedia, CPU anak serta RSS puncak. Pemeriksaan kualitasnya hanyalah oracle struktural. Kualitas model kaption nyata tetap `HOLD` karena harness ini tidak memiliki endpoint resmi atau judge yang dibekukan. Penghematan moneter juga tetap `HOLD` kecuali `--caption-cost-per-call-usd` menyediakan estimasi positif eksplisit per panggilan; skrip tidak pernah memalsukan salah satu hasil tersebut.

Setiap frame dibatasi hingga 4 MiB, semua frame mentah secara keseluruhan hingga 23 MiB, dan
respons broker terserialisasi hingga 32 MiB. Direktori sementara privat dihapus
di dalam `finally`. OmniRoute tidak membundel FFmpeg dan tidak menerima path
executable kustom. Sebelum pemberian caption, bridge menerapkan satu tahap
deduplikasi visual yang konservatif: setiap JPEG direduksi menjadi buffer
grayscale 16×16 dan hanya dibandingkan dengan frame terakhir yang dipertahankan.
Untuk anggaran caption yang diminta di atas satu frame, ekstraksi menyediakan
pool kandidat terbatas hingga dua kali anggaran tersebut dan tidak pernah lebih
dari 16 frame. Batas yang diminta diterapkan hanya setelah deduplikasi, dengan
kandidat terpilih pertama dan terakhir dipertahankan selama penipisan akhir
ketika anggaran setidaknya dua. Kebijakan berversi
`grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta
luma rata-rata dan rasio sel thumbnail yang delta ternormalisasinya setidaknya
0.05. Ambang duplikat adalah konstanta 0.04, dipilih demi prediktabilitas
daripada diekspos sebagai pengaturan runtime. Sinyal kontras tinggi sekunder
ini mempertahankan gerakan kecil dan perubahan teks yang terlihat yang dapat
tersembunyi oleh perbandingan hanya-rata-rata. Error komparator atau dekoder
bersifat fail open dan mempertahankan cakupan. Metadata output memisahkan
kandidat yang diekstrak, frame yang berhasil digunakan, dan duplikat visual
yang dibuang.

Bagian video yang ditandai secara eksplisit dapat meminta contact sheet
berstempel waktu. Bridge membangun grid JPEG maksimal 4 kolom dan 16 frame.
Setiap sel 512 piksel membakar stempel waktu sumbernya ke dalam pita bawah
kontras tinggi, sementara stempel waktu yang sama tetap tersimpan dalam metadata
tekstual untuk asosiasi dan audit downstream. JPEG lengkap tetap dibatasi pada
32 MiB. Jika `sharp` tidak dapat mendekode atau menyusun grid, bridge beralih
ke frame JPEG individual; abort klien tetap merambat melalui operasi sheet.

Bukti promosi sengaja dipisahkan dari microbenchmark komposisi sintetis.
`scripts/perf/video-bridge-contact-sheet-eval.ts` mendefinisikan harness A/B
berversi skema untuk model visi nyata yang kompatibel dengan OpenAI. Harness ini
mengukur token yang dilaporkan provider, latensi wall end-to-end (termasuk
komposisi sheet), jumlah pemanggilan model, dan retensi fakta yang didefinisikan
manifest. Respons model mentah tidak ditulis ke laporan; hanya digest SHA-256
dan ID fakta yang cocok yang dipertahankan. Harness tidak melakukan pemanggilan
jaringan atau model berbayar kecuali `--execute-real` diberikan serta `--model`,
`OMNIROUTE_BASE_URL`, dan `OMNIROUTE_API_KEY` dikonfigurasi. Tanpa proses nyata
eksplisit tersebut, verdict yang dapat dibaca mesin tetap `HOLD`; pengukuran
payload/jumlah pemanggilan sintetis saja bukan bukti promosi.

Pemanggil dapat melampirkan array `transcript.cues` opsional ke bagian video
yang didukung ketika mereka sudah memiliki teks yang selaras. Setiap cue harus
membawa `text`, interval `start`/`end` yang berhingga di dalam durasi yang
di-probe, dan `source` yang termasuk daftar putih (`client`, `embedded`, atau
`audio-bridge`); `confidence` secara default `1` dan harus tetap berada antara
`0` dan `1`. Cue duplikat persis digabungkan. OmniRoute tidak pernah memulai
transkripsi dari metadata ini: cue yang tervalidasi disalin ke hasil yang
dideskripsikan beserta source, confidence, dan interval, dan dirender sebagai
observasi tidak tepercaya di samping caption frame. Teks yang tidak valid, di
luar rentang, atau tanpa provenance ditolak daripada dicampur ke dalam aliran
caption. Kedua kanal transkrip request-body menormalisasi provenance yang
diberikan ke `client`, termasuk label `embedded` atau `audio-bridge` yang
diklaim sendiri. Hanya adapter milik server yang dapat menetapkan label
tepercaya tersebut melalui argumen `trustedSource` yang khusus kode; field JSON
request tidak dapat mencapai argumen tersebut. Teks transkrip tetap merupakan
konten turunan media yang tidak tepercaya, terlepas dari provenance-nya, dan
tidak boleh pernah menentukan otorisasi.

Pemanggil tingkat lanjut dapat menyediakan track `audioTranscript` untuk video
yang sama; track ini diperlakukan sebagai teks yang disediakan klien, bukan
bukti transkripsi server. Lapisan fusi menjalankan observasi visual dan audio
di bawah satu deadline dan sinyal abort yang sama, mengurutkannya pada timeline
bersama, menggabungkan duplikat persis, dan melaporkan hasil parsial ketika
hanya satu sisi yang berhasil. `audioTranscript` yang tidak valid terdegradasi
ke hasil parsial tersebut — deskripsi visual dipertahankan dan cabang audio
mencatat kode kegagalan tersanitasi — alih-alih menggagalkan seluruh video.
Ketersediaan per cabang, flag parsial, dan kode kegagalan tersanitasi
dipertahankan dalam hasil yang dideskripsikan, dalam metadata guardrail
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), dalam
metadata cache hasil, dan dalam counter fusi bridge. Jalur Video Bridge default
tidak memanggil speech-to-text atau mengunduh salinan media kedua; tanpa track
eksplisit tersebut, jalur ini tetap hanya-video.

**Retensi transkrip (#12150 P1).** Ini berlaku secara otomatis setiap kali
Video Bridge (yang bersifat opt-in) merender cue transkrip — tidak ada flag
retensi terpisah. Ketika sebuah permintaan merender cue transkrip apa pun
(`transcript` yang dideklarasikan pemanggil atau `audioTranscript` yang
digabungkan), guardrail menandainya `videoBridgeObserved` dan menghasilkan
bayangan tersunting dari deskripsi video — rendering identik di mana setiap
isi teks bebas cue digantikan oleh `[redacted-video-transcript]`, dibangun
dengan mensubstitusi field cue terstruktur sebelum string dirangkai (tidak
pernah dengan memparsing teks yang sudah diratakan, sehingga tidak ada konten
cue — baik adversarial maupun biasa, termasuk isi yang mengandung `]` seperti
`[inaudible]`/`[music]` — yang dapat bertahan). Body permintaan log-panggilan
yang dipersistensikan menukar setiap bagian teks turunan video dengan bayangan
tersunting tersebut, dicocokkan berdasarkan kesetaraan konten; jangkar
`fullText` dibaca ulang dari payload guardrail pra-panggilan yang sudah
selesai, sehingga pencocokan tetap berhasil setelah guardrail rantai berikutnya
(pemasker PII dan kredensial, prioritas 10/95) menulis ulang teks deskripsi di
tempatnya dan setelah injeksi system-prompt/handoff/memory membentuk ulang
array pesan. Body yang dikirim upstream ke model tidak berubah. Permintaan yang
diamati juga tidak mengisi Memory yang tahan lama (ekstraksi turunan permintaan
maupun respons dilewati), sehingga balasan model itu sendiri tidak dapat
menggemakan teks transkrip ke dalam Memory.

**Field video mentah (#12430).** Ketika bridge diaktifkan dan dukungan video
native tidak diketahui atau tidak ada, field `transcript`/`audioTranscript`
yang terdefinisi juga mengaktifkan `videoBridgeObserved`, bahkan setelah
kegagalan deskripsi atau batas `maxVideos`. `null` dan string kosong dihitung;
field yang tidak ada dan metadata non-video tidak. Salinan yang diretensi
menyunting field-field ini atau menghilangkan permintaan, dan cache/Memory
dilewati.

Pada jalur fallback tersebut, cue pemanggil yang valid menjadi bagian
`text`/`input_text` yang didukung alih-alih field provider nonstandar. Kedua
track yang disuplai permintaan tetap menjadi observasi `client` yang tidak
dipercaya, dengan peringatan eksplisit bahwa video tidak dideskripsikan dan
timestamp tidak diverifikasi terhadap media. Anggaran total 256-cue/64-KiB
yang ada dan anggaran per-cue berlaku lintas kedua track secara bersama-sama;
timestamp harus memenuhi batas 600 detik broker dan jendela fokus apa pun yang
disuplai. Track yang tidak valid dibuang, tidak diteruskan sebagai teks
arbitrer; sibling yang valid masih dapat digunakan kecuali anggaran
gabungannya terlampaui. Field null/kosong tidak menambahkan teks. Tidak ada
pengambilan media atau transkripsi yang ditambahkan oleh fallback ini. Field
ekstensi transkrip dihapus dari carrier video fallback dan objek
`video_url`/`source`-nya. Allowlist wire OpenAI tetap ketat; carrier video
dengan native yang tidak dikenal tetap tersedia dan target khusus-teks yang
dikenal mempertahankan marker aman. Bayangan penyuntingan terstruktur
melindungi teks transkrip yang ditambahkan, sementara permintaan asli milik
pemanggil tetap tidak berubah. Target yang didukung native dan bridge yang
dinonaktifkan mempertahankan perilaku bypass mereka yang ada.

Salinan retensi tambahan menggunakan sinyal permintaan-teramati yang sama.
Snapshot permintaan klien pra-guardrail mentah, permintaan tertunda dalam
memori, dan log permintaan yang ditolak lebih awal secara struktural
menggantikan field transkrip dalam bagian video; prompt string yang
disintesis oleh tahapan pipeline dan handoff konteks disunting di sink
body-permintaan-yang-dipersistensikan. Marker `video_content_removed` yang
dipersistensikan membuat kelanjutan `previous_response_id` gagal secara
tertutup (fail closed) alih-alih merekonstruksi teks yang sengaja dibuang.
Jika permintaan yang diamati kehilangan bayangan penyuntingan per-bagiannya
sebelum logging, atau bahkan satu dari beberapa bayangan video gagal cocok
setelah mutasi permintaan berikutnya, body permintaan yang diretensi
dihilangkan sepenuhnya alih-alih mempertahankan transkrip yang disunting
sebagian.

Untuk permintaan yang diamati, respons model mungkin mengutip sebagian
transkrip tanpa batas cue terstruktur. Oleh karena itu `responseBody`
log-panggilan yang dipersistensikan digantikan oleh marker penghilangan;
artefak pipeline terperinci (yang dapat menyertakan body upstream/klien dan
potongan stream) tidak diretensi. Cache semantik, idempotensi, dan
replay-penalaran melewati pembacaan dan penulisan untuk permintaan tersebut.
Permintaan provider dan respons yang terlihat klien tetap tidak berubah. Byte
keepalive awal dikuras dari buffer sementara ketika artefak terperinci
dihilangkan. Peringatan EventStream rusak milik Kiro hanya melaporkan jumlah
byte payload, tidak pernah isinya atau error mentah parser JSON.
Ini tidak mengklaim bahwa setiap diagnostik provider/plugin yang tidak terkait
telah diaudit; penyisiran sink-retensi yang lebih luas dilacak di #11658.

Siklus hidup `/api/modality-bridge/video/drilldown` internal adalah substrat
cache terpisah yang diautentikasi loopback/token. Setiap operasi juga
memerlukan ID principal opak kanonis. Sebelum pemanggil produksi diaktifkan,
ia harus menurunkan ID tersebut dari tenant terautentikasi dan tidak pernah
boleh meneruskan nilai yang dipilih klien. Kunci cache mengikat principal
tersebut ke ID sesi kanonis dan ID referensi video, hanya menyimpan kunci
turunan SHA-256 mereka, dan membatasi lingkup pembacaan maupun penghapusan
pada principal yang sama. Cache menyimpan paling banyak 16 frame JPEG turunan
per entri, mengedaluwarsakannya setelah sepuluh menit, dan mendukung
pembacaan terbatas `start`/`end` atau penghapusan sesi eksplisit.

Setiap principal dibatasi hingga 16 entri dan 64 MiB data JPEG kanonis.
Batas-batas tersebut independen dari plafon global 64-entri/256 MiB: tekanan
kuota principal hanya mengeluarkan entri least-recently-used milik principal
tersebut sebelum eviksi LRU global dipertimbangkan. Entri yang kedaluwarsa
disapu dari akuntansi principal maupun global saat ada aktivitas cache,
sementara pembatalan dan kegagalan validasi tidak meng-commit penggantian
parsial.

Cache menolak Base64 non-kanonik, padding berlebih, media non-JPEG, JPEG yang rusak atau
terpotong, serta JPEG yang menghasilkan peringatan selama decode `sharp` gambar-penuh
terbatas. Cache meng-encode ulang setiap gambar yang diterima sebagai JPEG kanonik,
memperoleh lebar dan tinggi dari byte yang telah didekode alih-alih mempercayai field
pemanggil, dan membuang byte poliglot yang tertinggal di akhir daripada menyimpannya.
Hanya buffer terkompresi kanonik terbatas yang dibebankan ke kedua kuota. Batas wire JSON
mencakup overhead Base64 untuk plafon input terdekode 32 MiB. Setiap derivasi yang
tersimpan mencatat format/resolusi JPEG yang tervalidasi, kebijakan sampling, versi
derivasi, waktu pembuatan, hash konten yang dihitung server, dan referensi induk ter-hash
ditambah hash konten induk dari pemanggil tepercaya. Pembatalan diperiksa di antara fase
decode/hash asinkron sebelum commit cache atomik.

Tahap ini belum menghubungkan producer produksi ke route dan belum menyediakan pemilihan
varian multi-resolusi. Jalur permintaan Video Bridge yang transparan karenanya tidak
menimbulkan pekerjaan tambahan, sementara derivasi principal terikat tenant dan siklus
hidup multi-resolusi FU-08 penuh tetap menjadi pekerjaan lanjutan eksplisit alih-alih
didokumentasikan sebagai perilaku yang sudah selesai.

Frame diberi caption secara berurutan dengan model Video yang dikonfigurasi. Override
Video yang kosong mewarisi pengaturan Vision; jika keduanya kosong, auto-router Vision
memilih model berkemampuan visi yang efektif. Caption yang berhasil menggantikan bagian
asli dengan prefiks stabil `[Video description:` yang juga menandai teks sebagai observasi
turunan media yang tidak tepercaya dan memberi tahu model hilir untuk tidak mengikuti
instruksi yang ditemukan dalam media. Kunci cache caption frame mencakup byte JPEG,
prompt, timestamp, dan model efektif; hanya caption yang berhasil yang di-cache. Entri
cache mempertahankan model producer sukses yang sebenarnya, termasuk model fallback;
bridge melaporkan `mixed` ketika frame yang berbeda diproduksi oleh model yang berbeda.
Cache hit menggunakan kembali identitas producer tersebut alih-alih melabelinya ulang
sebagai rencana routing yang diminta. Cache hasil seluruh-video dikunci berdasarkan setiap
input yang mengubah output — prompt, model efektif, kebijakan sampling, jumlah frame,
mode analisis semantik, fingerprint SHA-256 dari petunjuk fokus yang dinormalisasi,
jendela fokus, `transcript`, `audioTranscript`, dan flag contact-sheet — sehingga mengubah
salah satu dimensi tersebut adalah cache miss, tidak pernah penggunaan ulang yang basi.
Versi kebijakan dedup visual, threshold, dan jumlah frame kandidat terbatas juga eksplisit
dalam kunci dan metadata cache hasil; perubahan kebijakan karenanya tidak dapat menggunakan
kembali deskripsi seluruh-video yang basi. Metadata cache hasil v4 menyimpan mode dan
fingerprint, tidak pernah tugas pengguna mentah. Metadata guardrail melaporkan mode
analisis yang diminta dan efektif; mode `focused` yang diminta tanpa teks pengguna yang
dapat digunakan dilaporkan sebagai efektif `full`.

Guardrail mengekstrak setiap bagian video yang didukung tetapi mendeskripsikan tidak lebih
dari `modalityBridgeVideoMaxVideos`. Untuk target yang terbukti memiliki
`supportsVideo === false`, video yang gagal dan melebihi batas menjadi penanda teks aman
eksplisit sehingga tidak ada video mentah yang tersisa. Ketika kemampuan tidak diketahui,
bagian-bagian tersebut mempertahankan pembawa video mereka; setiap transkrip fallback
mengikuti konversi teks terbatas di atas. Target dengan `supportsVideo === true` melewati
bridge. Sinyal abort permintaan klien merambat melalui unduhan, antrean broker, subproses,
dan panggilan caption; abort berhenti di antara video dan tidak pernah gagal terbuka ke
media mentah.

Pengaturan runtime didukung DB dan divalidasi Zod:

| Kunci                               | Default     | Rentang / perilaku                                                                                                  |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opsional, opt-in                                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mempertahankan caption generik; `focused` menggunakan konteks pengguna-terbaru terbatas yang tidak tepercaya |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` proporsional; kegagalan detektor kembali ke `uniform`                |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Nilai timeout Video tersimpan lama di atas 120 detik dibatasi pada tenggat broker;
penulisan pengaturan baru di atas batas tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokalitas loopback bertanda tepercaya
sebelum autentikasi atau pemeriksaan runtime, kemudian memerlukan autentikasi manajemen.
Endpoint ini hanya mengembalikan `available`, versi FFmpeg/ffprobe yang disanitasi, dan
alasan tetap ketika runtime tidak tersedia. Endpoint ekstraksi internal bukan API unggahan
publik: kejenuhan antrean mengembalikan `503` plus `Retry-After`, pemutusan pemanggil
mengembalikan `499`, dan tenggat broker tetap mengembalikan `504`. Respons terkonversi
menambahkan `video->text;model=<visionModel>;parts=<videos>` ke header pusat
`x-omniroute-modality-bridge` tanpa menghapus segmen Vision atau Audio.

### PII Masker (`piiMasker.ts`)

Berjalan pada **kedua** tahap.

- **`preCall`** menggandakan payload, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item string biasa), lalu menerapkan `processPII()` (dari
  `@/shared/utils/inputSanitizer`) pada field string `content`/`text`. Saat
  `PII_REDACTION_ENABLED=true`, PII yang terdeteksi disamarkan dalam payload
  keluar. Ini independen dari `INPUT_SANITIZER_MODE` (yang hanya mengendalikan
  kebijakan prompt-injection). Saat penyamaran nonaktif, pemanggilan mencatat
  jumlah deteksi tanpa menulis ulang konten.
- **`postCall`** menggandakan respons secara mendalam (deep-clone), menjalankan
  `sanitizePIIResponse()` ditambah penyamar untuk bentuk Responses API
  (`maskResponsesOutput` — mencakup `output_text` dan
  `output[].content[].text`). Jika terjadi penyamaran, respons yang telah
  dimodifikasi menggantikan respons asli.

Guardrail ini tidak pernah memblokir; ia hanya memberi anotasi
(`meta.detections`, `meta.redacted`) atau menulis ulang.

#### Pemilihan per tipe, pola kustom, dan penghitung deteksi

**Dashboard → Settings → Security → PII masking** memilih _apa_ yang disamarkan.
Pengaturan ini tidak mengaktifkan penyamaran: itu tetap diatur oleh
`PII_REDACTION_ENABLED` (request) dan `PII_RESPONSE_SANITIZATION` (respons +
SSE), keduanya nonaktif secara default.

- **Pemilihan per tipe** — id bawaan tercantum di
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Jika tidak diatur,
  berarti semua tipe (perilaku sebelum pengaturan ini ada). Pola `ssn_us` pada
  engine request dipetakan ke `ssn`. Template (Minimal, Standard, Financial,
  Brazilian, USA, Full) hanya mengisi kotak centang di UI.
- **Pola kustom** — hingga 20 pola regex atau wildcard (`*` = hingga 64 karakter
  non-whitespace, `?` = satu karakter). Kecocokan menjadi `[CUSTOM_REDACTED]`.
  Setiap pola melalui `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maksimal 500 karakter, flag dibatasi
  pada `g i m s u`, harus dapat dikompilasi, harus lulus `safe-regex`
  (catastrophic backtracking), dan tidak boleh cocok dengan string kosong atau
  placeholder penyamaran. Pola yang gagal ditolak saat disimpan dan saat diuji,
  dan baris tersimpan yang gagal dilewati saat runtime alih-alih dikompilasi.
  Pola kustom hanya berjalan saat penyamaran aktif.
- **Penghitung deteksi** — jumlah per tipe (tidak pernah nilai yang cocok),
  disimpan di memori dan direset saat restart
  (`src/lib/pii/piiDetectionStats.ts`). Penghitung hanya bertambah saat penyamaran
  aktif.

Pengaturan disimpan di tabel `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 detik. API:

| Method | Path                     | Tujuan                                                                    |
| ------ | ------------------------ | ------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Status flag, `enabledTypes`, `customPatterns`, penghitung deteksi         |
| `PUT`  | `/api/settings/pii`      | Mengganti `enabledTypes` (`null` = semua) dan/atau `customPatterns`       |
| `POST` | `/api/settings/pii/test` | Uji coba satu pola terhadap sampel maksimal 8 KB; tidak ada yang disimpan |

Ketiganya memerlukan autentikasi manajemen dan memvalidasi body dengan Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Mendeteksi struktur adversarial dalam konten yang diberikan pengguna dan
menegakkan kebijakan yang dikonfigurasi. Perilaku dikendalikan oleh environment
variable dan opsi konstruktor:

| Pengaturan      | Env var                                                                                             | Default | Efek                                                                                                                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                           | `true`  | Saat `false`, guardrail melakukan short-circuit.                                                                                                                                                                    |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn`  | Kebijakan injeksi: `block`, `warn`, atau `log`. (`redact` diterima demi kompatibilitas mundur tetapi **tidak** menghapus teks injeksi; penulisan ulang PII pada request dikendalikan oleh `PII_REDACTION_ENABLED`.) |
| Block threshold | Opsi `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Tingkat keparahan minimum yang diperlukan untuk memblokir. Medium hanya bersifat observasi pada pengaturan default.                                                                                                 |

**Presedensi mode** (`getMode`): `options.mode` dari pemanggil → **override
feature-flag DB** `INJECTION_GUARD_MODE` (Dashboard → Settings → Feature Flags)
→ env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` → `warn`. Karena itu,
override dashboard mengalahkan env var, sehingga UI Feature Flags mengendalikan
guard yang sedang berjalan secara langsung (tanpa restart). Pembacaan DB bersifat
fail-safe: jika terjadi error, guard kembali ke perilaku berbasis env, dan saat
tidak ada override yang diatur, perilakunya identik dengan resolusi env saja.

Sumber deteksi:

1. `sanitizeRequest()` dari `@/shared/utils/inputSanitizer` (kumpulan detektor
   bersama yang digunakan di tempat lain dalam pipeline).
2. `DEFAULT_GUARD_PATTERNS` bawaan (saat ini `system_override_inline` dan
   `markdown_system_block`, keduanya berseverity `high`).
3. `customPatterns` opsional yang diberikan melalui opsi konstruktor (string,
   regex, atau record `{ name, pattern, severity }`).

Ketika `mode === "block"` **dan** setidaknya satu deteksi memenuhi ambang
severity, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mode `warn`/`log`, guardrail hanya
mencatat tetapi tetap mengizinkan panggilan. Helper bersama
`evaluatePromptInjection()` juga diekspor untuk pemanggil yang perlu
mengevaluasi prompt tanpa melalui registry.

**Batas pemindaian (v3.8.20):** detektor hanya memeriksa **16 KB pertama**
dari teks prompt yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 byte) di `src/shared/utils/inputSanitizer.ts`. Baik `detectInjection()`
maupun `evaluatePromptInjection()` menjalankan `slice(0, MAX_INJECTION_SCAN_BYTES)`
sebelum menjalankan perulangan pola. Direktif injeksi berada di dekat bagian
atas input, sehingga ini membatasi CPU/GC regex pada payload berukuran ratusan
KB tanpa melemahkan deteksi (lihat #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Berjalan pada **kedua** tahap, paling akhir dalam rantai default (prioritas
`95`). Menyensor pola API-key / secret-token yang umum dikenal dari payload
keluar (konten pesan, argumen tool-call, hasil tool) **dan** respons provider,
sehingga kredensial yang ditempelkan ke dalam prompt (atau digaungkan kembali
oleh hasil tool) tidak bocor ke provider upstream atau kembali ke klien.

- **Hanya opt-in**, konvensi yang sama seperti redaksi PII (berdekatan dengan
  Hard Rule #20): dinonaktifkan kecuali `settings.credentialRedactionEnabled === true`
  **atau** `CREDENTIAL_REDACTION_ENABLED=true`. Jika nonaktif, guardrail
  bersifat no-op — tidak pernah memblokir dan tidak pernah menulis ulang.
- `redactCredentials()` menelusuri seluruh pohon payload/respons (`walkValue()`,
  aman terhadap prototype-pollution, aman terhadap siklus via `WeakSet`) dan
  mengganti kecocokan dengan placeholder `[REDACTED:<type>]`, hanya meng-kloning
  cabang yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` mencakup kunci provider LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square),
  kunci cloud (AWS access key, Twilio, SendGrid, Mailgun), private key / JWT,
  connection string yang membawa kredensial (`mongodb://user:pass@...`, dll.),
  dan pola nilai header generik `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kunci berbentuk header (`authorization`, `x-api-key`, `api-key`, `apikey`)
  disensor secara struktural (hanya nilainya, prefiks skema seperti
  `Bearer `/`Basic ` dipertahankan) bukan melalui regex teks generik.
- Guardrail tidak pernah memblokir; ia hanya menulis ulang (`modifiedPayload` /
  `modifiedResponse`) dan memberi anotasi (`meta.credentialsRedacted`, `meta.count`).

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
