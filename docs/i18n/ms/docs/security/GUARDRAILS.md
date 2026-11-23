# Guardrails (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber kebenaran:** `src/lib/guardrails/`
> **Terakhir dikemas kini:** 2026-08-29 — v3.8.51 (Asal transkrip Video Bridge diisytiharkan oleh pemanggil,
> belum disahkan oleh pelayan — dijelaskan mengikut #11661)

Guardrail menguatkuasakan keselamatan, dasar, dan transformasi kandungan pada sempadan
antara OmniRoute dan penyedia hulu. Setiap guardrail boleh memeriksa (dan
secara pilihan menolak, mengubah, atau menganotasi) muatan permintaan (`preCall`) dan
respons hulu (`postCall`).

Sistem ini adalah **fail-open**: jika guardrail membuang ralat semasa pelaksanaan, pendaftar
merekodkan ralat tersebut dan meneruskan dengan guardrail seterusnya daripada menggagalkan
permintaan. Penyekatan adalah keputusan yang jelas (`block: true`), bukan kemalangan.

## Pagar Keselamatan Terbina Dalam

Daftar secara automatik memuatkan enam pagar keselamatan mengikut urutan keutamaan semasa import
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Keutamaan | Nama                | Peringkat      | Fail                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nombor keutamaan yang lebih rendah dijalankan **terlebih dahulu**.

### Jambatan Penglihatan (`visionBridge.ts`) — Jambatan Modaliti PR-1

Memintas permintaan yang mengandungi imej dan ditujukan kepada **model tanpa keupayaan penglihatan**, kemudian sama ada
menghalakan semula keseluruhan permintaan kepada model berkeupayaan penglihatan atau menggantikan bahagian
imej dengan perihalan teks yang dihasilkan oleh model penglihatan yang boleh dikonfigurasikan sebelum
panggilan huluan. Ini membolehkan penyedia teks sahaja mengendalikan
muatan berbilang modaliti secara telus.

Aliran:

1. Langkau jika model sasaran sudah menyokong penglihatan (melainkan model itu terdapat dalam
   senarai jambatan paksa `isVisionBridgeForcedModel`).
2. Ekstrak bahagian imej melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mewakilkan tugas kepada **pengesan media
   bersepadu** `detectMediaParts()` dalam `open-sse/utils/mediaParts.ts` — satu-satunya
   sumber kebenaran yang dikongsi dengan penapis keserasian gabungan.
   Pengekstrakan dihadkan oleh senarai dibenarkan kepada bahagian peringkat teratas dengan bentuk
   yang boleh dicantumkan semula oleh `replaceImageParts` (kontrak ekstrak↔ganti): OpenAI
   `image_url`, `source.type:"base64"` base64 Anthropic, URL Anthropic
   `source.type:"url"`, dan `input_image` Responses API. Padanan bersarang dan
   bentuk penunjuk sahaja ialah bahan untuk penapis gabungan dan tidak akan diekstrak.
   Langkau jika tiada yang ditemui.
3. Selesaikan konfigurasi masa jalan melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kekunci tetapan `modalityBridge*`
   baharu diutamakan; kekunci `visionBridge*` legasi kekal sebagai **sandaran satu kitaran**
   (tempoh pengembalian). Langkau sebelum sebarang penelusuran media apabila
   jambatan dinyahdayakan.
4. Pemilih mod (`modalityBridgeVisionMode`, lihat jadual di bawah) menentukan
   sama ada hendak menghala semula atau menerangkan. Penghalaan semula mengembalikan `modifiedPayload` dengan hanya `model`
   ditukar, berserta metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Laluan perihalan: hadkan imej kepada `maxImages`, bina gesaan yang peka terhadap tugas,
   rujuk cache perihalan, panggil model penglihatan **secara selari**
   (`Promise.allSettled`), dan suntik bahagian teks `[Image N]: <description>` untuk
   menggantikannya. Perihalan yang gagal menghasilkan `null` dan bahagian imej asal
   **dikekalkan** (#4012) — kecuali pada laluan perihalan gabungan apabila setiap
   perihalan gagal, yang mana huluan tanpa keupayaan penglihatan yang disahkan akan menerima stub
   `(unavailable — no vision-capable provider connected)` sebagai ganti (#8430).
6. Kembalikan `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mod (`modalityBridgeVisionMode`)

| Mod        | Lalai | Tingkah laku                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Heuristik legasi, tidak diubah (#6640/#7204): model bukan gabungan/`auto/` dihalakan semula kepada model penglihatan terbaik melainkan model asal sudah mempunyai bukti kelayakan yang boleh digunakan (kemudian diterangkan); sasaran gabungan sentiasa diterangkan.                                                                       |
| `describe` |       | Sentiasa terangkan — blok penghalaan semula dilangkau sepenuhnya; model pilihan pengguna sentiasa memberikan jawapan.                                                                                                                                                                                                                       |
| `reroute`  |       | Paksa penghalaan semula: pengawal kekalkan-model-dengan-bukti-kelayakan dipintas. Pengawal bukti kelayakan **sasaran** penghalaan semula masih digunakan — apabila tiada sasaran penglihatan yang boleh digunakan, permintaan beralih kepada perihalan supaya imej mentah tidak pernah sampai kepada bahagian belakang teks sahaja (#8430). |

Mod paksa membuat litar pintas **sebelum** heuristik automatik dijalankan; tingkah laku `auto`
adalah seiras bait dengan pagar keselamatan sebelum PR-1.

#### Skop kekunci API (`visionBridgeKeyScope.ts`)

Apabila kekunci API pemanggil mengehadkan `allowedConnections`, kelompok kuota
(`allowedQuotas`) atau model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), jambatan hanya
memilih model penghalaan semula dan perihalan yang boleh digunakan oleh kekunci tersebut, pada sambungan yang boleh
digunakan oleh kekunci tersebut. Panggilan perihalan kemudiannya sentiasa melalui gelung kendiri OmniRoute dengan
pengepala `x-omniroute-self-loop-key-id`, supaya permintaan sembang penerima
menguatkuasakan semula dasar sambungan dan model kekunci tersebut. `enforceApiKeyPolicy()`
menghormati pengepala itu hanya bersama token pembawa gelung kendiri, maka ia hanya boleh
mengehadkan akses, dan id yang tidak dapat diselesaikan akan ditolak.

Jika tiada model penglihatan dibenarkan untuk kekunci tersebut, laluan perihalan tidak mengambil tindakan dan
permintaan diteruskan tanpa perubahan, iaitu tingkah laku gagal-terbuka yang sama seperti pagar keselamatan yang dinyahdayakan
(metadata `{ skipped: true, reason: "no_permitted_vision_model" }`).
Permintaan tanpa kekunci, dan kekunci tanpa sekatan ini, berkelakuan sama seperti
sebelumnya.

#### Gesaan perihalan peka tugas (`modalityBridgeVisionTaskAware`)

Lalai **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks daripada **mesej pengguna terakhir** (dipangkas kepada 500 aksara) pada
gesaan penerangan asas, lalu menghalakan penerangan kepada perkara yang
sebenarnya diminta oleh pengguna (corak codex-vision-proxy) dan meminta model
penglihatan mentranskripsikan teks yang kelihatan. Apabila bendera dimatikan —
atau tiada teks pengguna — gesaan asas digunakan tanpa perubahan.

Permintaan serasi OpenAI milik gelung kendiri penerangan
(`callVisionModelSingle()` dalam `visionBridgeHelpers.ts`) sentiasa meminta
`image_url.detail: "high"` — tanpa syarat, bagi setiap pemanggil/penyedia, dan
tidak bergantung pada sebarang isyarat klien. Pensampelan berbutiran rendah
mengurangkan ketepatan OCR khususnya untuk tugas transkripsi teks yang diminta
oleh gesaan ini, maka panggilan penerangan itu sendiri sentiasa meminta butiran
tinggi tanpa mengira aras butiran yang digunakan oleh permintaan masuk asal.
Ini hanya mempengaruhi isi permintaan penerangan dalaman; ia tidak mengubah cara
OmniRoute memajukan `image_url.detail` milik pemanggil dalam permintaan utama —
lalai tersebut digunakan secara berasingan, dan hanya untuk klien OpenCode yang
dikesan, dalam `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang format wayar Anthropic
bagi gelung kendiri penerangan tidak mempunyai medan `detail` dan tidak
dipengaruhi oleh mana-mana lalai tersebut.

#### Had output penerangan (`modalityBridgeVisionMaxChars`)

| Kunci                          | Lalai | Julat              |
| ------------------------------ | ----- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`   | `0` atau 100–50000 |

`0` (lalai) bermaksud **tiada had** — penerangan yang dikembalikan oleh
`callVisionModel()` diteruskan tanpa pengubahsuaian, sekali gus mengekalkan
tingkah laku sedia ada. Sebarang nilai dalam julat 100–50000 memangkas
penerangan dengan akhiran `…` sebelum ia disisipkan semula sebagai
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dalam
`src/lib/guardrails/visionBridge.ts`). Naikkan nilai ini untuk tugas OCR yang
memerlukan banyak butiran apabila model hiliran memerlukan transkripsi penuh;
turunkannya untuk mengehadkan penggunaan token pada model penglihatan yang
banyak menghasilkan teks. Medan papan pemuka terletak pada panel Advanced
dalam tab Vision (`modality-bridge-max-chars` dalam
`ModalityBridgeVisionTab.tsx`) dan mengepit sebarang nilai antara 1 hingga 99
kepada had minimum 100, sambil membiarkan nilai `0` yang dinyatakan secara
jelas tanpa perubahan — `0` ialah nilai Zod yang sah secara tersendiri
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan
sekadar nilai lalai "tidak ditetapkan".

#### Cache penerangan (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output penerangan, dikongsi oleh seluruh
proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
dengan pembingkaian awalan panjang (tiada perlanggaran sempadan medan).
Komponen model ialah model jambatan yang **dikonfigurasikan**, bukan model yang
sebenarnya memberikan respons — `callVisionModel` mungkin menggunakan sandaran
secara dalaman, dan penguncian bagi setiap percubaan akan memecah-belahkan
cache. Penerangan yang gagal tidak pernah dicache. Tetapan:

| Kunci                           | Lalai  | Julat   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Penormalan imej jauh (penerangan gelung kendiri/pengambilan base64)

Apabila jambatan itu sendiri mengambil imej **jauh** — panggilan kendiri
penerangan Anthropic dan penukaran base64 berformat wayar claude
(`ensureBase64ImagesForClaudeWire`), kedua-duanya melalui
`fetchRemoteImageAsDataUri()` dalam `visionBridgeHelpers.ts` — URI data yang
terhasil diproses melalui `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sebelum dibenamkan dalam permintaan model
penglihatan. Imej yang terlalu besar dikecilkan kepada **sisi panjang 2048px**
(sepadan dengan had saiz semula yang telah digunakan oleh OpenAI/Anthropic pada
sisi pelayan), sekali gus mengurangkan bait muat naik/kependaman tanpa mengubah
apa yang dilihat oleh model penglihatan. Pengubahan saiz menggunakan `sharp`,
yang dimuatkan melalui import dinamik: pada platform yang gagal memuatkan binari
asalnya, `normalizeDataUri()` **tidak sekali-kali melemparkan ralat** — ia
kembali kepada penerusan bait asal tanpa perubahan, supaya laluan
penerangan/penukaran base64 terus berfungsi. Bait bukan imej (pengambilan yang
tidak mengembalikan imej yang boleh dinyahkod) juga diteruskan tanpa perubahan.
Penormalan ini dihadkan kepada imej yang diambil oleh jambatan untuk panggilan
kendirinya sendiri — ia tidak pernah digunakan pada muatan penerusan mentah
milik pemanggil, selaras dengan prinsip pengubahan ikut serta sahaja
(Peraturan Tegas #20).

#### Skema tetapan + migrasi

Kunci `modalityBridge*` baharu disahkan oleh Zod dalam `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan kumpulan
`modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi
`141_modality_bridge_settings.sql` menyalin nilai legasi `visionBridge*` sedia
ada kepada kunci baharu yang sepadan (idempoten, tidak sekali-kali menulis ganti
nilai `modalityBridge*` yang ditetapkan oleh pengendali); kunci legasi terus
diterima sebagai sandaran bacaan untuk satu kitaran keluaran.

#### Pengepala ketelusan + statistik

Respons yang diubah oleh penerangan membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibina oleh `buildModalityBridgeHeader()` dalam
`modalityBridge/bridgeStats.ts`, dicap oleh `withModalityBridgeHeader()` dalam
`src/sse/handlers/chatHelpers.ts`). Permintaan yang dihalakan semula **tidak**
menerima pengepala — muatan tidak diubah dan pertukaran model sudah kelihatan
dalam medan `model` pada isi respons.

`GET /api/modality-bridge/stats` (pengesahan pengurusan, peringkat yang sama seperti
`GET /api/settings`) mengembalikan pembilang dalam memori bagi setiap modaliti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukannya semua percubaan,
sebagai penyebutnya; operasi tanpa pemasaan tidak mereka-reka sampel sifar milisaat.
`bridged` kekal sebagai alias serasi ke belakang untuk penukaran yang berjaya;
percubaan yang gagal tidak menambah nilainya.
Pembilang ditetapkan semula apabila proses dimulakan semula seperti yang direka
(telemetri, bukan perakaunan).

#### Konfigurasi papan pemuka

Halaman papan pemuka khusus ialah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`, dan `Video` yang
boleh dialamatkan melalui URL mengekalkan parameter pertanyaan semasa menukar nilai
`tab`. Tab Vision menyediakan pengaktifan, mod, pemilihan model (termasuk lalai
automatik), gesaan peka tugas, had lanjutan bagi tamat masa/imej/panjang huraian/cache,
pembilang masa jalan, dan permintaan sampel yang dilindungi. Tab Audio juga aktif:
ia menyediakan pengaktifan, pemilih model STT sahaja dengan Auto, had tamat masa/klip
maksimum, pembilang audio, dan ujian sampel `input_audio`. Tab Video berfungsi: ia
melaporkan keadaan masa jalan FFmpeg/ffprobe — salah satu daripada empat keadaan UI
yang jelas (`unknown` semasa prob sedang berjalan atau tidak dapat diselesaikan,
`restricted` pada hos papan pemuka bukan gelung balik apabila prob dilangkau pada
sisi klien, `unavailable` setelah diprob dan disahkan tiada, atau `available` dengan
versi FFmpeg/ffprobe) — menyimpan had pengaktifan/model/bingkai/video/tamat masa,
menapis pemilih model kepada model berkeupayaan penglihatan, dan menyediakan
pembilang video.

Kad Vision Bridge terdahulu di bawah tetapan AI ialah pautan keserasian ke halaman
baharu; ia tidak lagi mempunyai salinan kedua borang tersebut. Media Providers juga
memautkan aliran kerja Image-to-Text dan Speech-to-Text ke tab Modality Bridge yang
sepadan tanpa mengalih keluar ruang uji Speech-to-Text sedia ada.

**Pintasan kemasukan gelung kendiri:** apabila panggilan huraian dihalakan melalui
gelung kendiri `/v1` milik OmniRoute (model penyedia bukan standard), subpermintaan
menghantar `x-omniroute-admission-bypass: internal` dan disahkan menggunakan
kelayakan gelung kendiri yang telah diselesaikan — sentinel `sk_omniroute` setempat
dalam mod setempat, atau kekunci persekitaran `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` yang dikonfigurasikan oleh pengendali (#1350), supaya pelaksanaan
dengan `REQUIRE_API_KEY=true` masih boleh menjalankan panggilan huraian. Pintasan
hanya diterima untuk kelayakan tepat tersebut, maka klien luaran tidak boleh
menggunakan pengepala itu untuk melangkau kemasukan.

Lalai legasi terletak dalam `src/shared/constants/visionBridgeDefaults.ts`; lalai
mod/peka tugas/cache yang baharu dan penyelesai tetapan terletak dalam
`src/shared/constants/modalityBridgeDefaults.ts`. Rel pengadang menyediakan pilihan
pembina `deps` supaya ujian boleh menyuntik pelaksanaan `getSettings` dan
`callVisionModel` palsu.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Memintas permintaan sembang yang mengandungi audio sebelum permintaan tersebut
sampai ke sasaran yang tidak diketahui menerima input audio. Ia tidak pernah
menghalakan semula permintaan sembang: bahagian audio ditranskripsikan melalui
titik akhir berbilang bahagian sedia ada yang serasi dengan OpenAI dan model sembang
yang dipilih meneruskan proses dengan transkrip teks.

Aliran:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   daftar penyedia yang dinyatakan secara jelas diberi keutamaan, diikuti metadata
   model statik, kemudian `modalities_input` yang disegerakkan. Senarai input yang
   diisytiharkan tanpa `audio` ialah `false`; ketiadaan bukti keupayaan kekal sebagai
   `null`. Kedua-dua `false` dan `null` mengaktifkan jambatan konservatif, manakala
   `true` memintasnya.
2. Selesaikan tetapan `modalityBridgeAudio*` dan ekstrak bahagian audio aras atas
   yang boleh dicantumkan daripada setiap mesej melalui pengesan
   `detectMediaParts()` yang dikongsi. Bentuk wayar yang disokong ialah
   `input_audio`, `audio_url` OpenAI, dan `source.media_type: "audio/*"`. Audio
   tersarang dikesan untuk penghalaan tetapi tidak dialih keluar oleh laluan
   cantuman. Kerja dihadkan oleh `modalityBridgeAudioMaxClips`; bahagian selepasnya
   kekal tidak disentuh.
3. Patuhi `provider/model` yang dikonfigurasikan, atau biarkan
   `selectAudioBridgeModel()` menelusuri `AUDIO_TRANSCRIPTION_PROVIDERS` mengikut
   turutan katalog yang stabil dan memilih model pertama dengan kelayakan penyedia
   aktif yang boleh digunakan.
4. `callAudioTranscription()` menukar audio base64/URI data kepada `file` berbilang
   bahagian, atau memuat turun `audio_url` jauh melalui pengadang keluar awam sahaja
   dengan penyematan DNS dan had 25 MB. Ia kemudian menghantar fail dan model yang
   dipilih melalui POST ke gelung kendiri `/v1/audio/transcriptions` setempat, yang
   disahkan dengan `resolveSelfLoopBearer()`. Laluan transkripsi sedia ada melakukan
   carian kelayakan biasa, pengendalian tempoh bertenang/had kadar, dan penghantaran
   penyedia.
5. Panggilan yang berjaya menggantikan bahagiannya dengan
   `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`:
   kegagalan individu mengekalkan bahagian audio asal tersebut (kontrak #4012).
   Jika setiap panggilan gagal dan sasaran terbukti mempunyai
   `supportsAudio === false`, bahagian tersebut menjadi
   `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Bagi
   sasaran yang tidak diketahui (`null`), hasil apabila semua panggilan gagal kekal
   tidak disentuh. Sasaran teks sahaja yang terbukti tanpa kelayakan STT yang boleh
   digunakan menerima stub jelas yang sama tanpa membuat panggilan rangkaian.

Transkrip yang berjaya menggunakan cache LRU/TTL Modality Bridge seluruh proses.
Kekunci menggabungkan rujukan audio, label operasi `audio-transcription` yang stabil,
dan model STT yang dipilih; kegagalan tidak pernah dicache. Percubaan audio
mengemas kini pembilang `bridged`, `cacheHits`, `failures`, dan `lastUsedAt` yang
dikongsi. Respons yang diubah membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak disentuh tidak menerima segmen Audio Bridge.

Tetapan masa jalan disokong oleh DB dan disahkan dengan Zod:

| Kunci                         | Lalai   | Julat                 |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Automatik atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Cache dikongsi kekal dikawal oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Jambatan Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Memintas bahagian video peringkat teratas dalam `messages` Chat Completions dan
`input` API Responses sebelum sasaran tanpa sokongan video natif yang diketahui
dipanggil. Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`,
URL HTTPS dan URI data `data:video/*;base64,...`. Nama fail biasa dalam teks
tidak dianggap sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) mengendalikan penelusuran
permintaan, semakan keupayaan/dasar, pengagregatan bagi setiap permintaan dan
muatan respons. Kerja bagi setiap video — pemerolehan, cache hasil penuh,
penerangan jujukan bingkai (yang menggabungkan sebarang transkrip audio yang
diisytiharkan oleh pemanggil), serta metrik/pembatalan/pembersihan bagi setiap
percubaan — disembunyikan di sebalik `processVideoPart` dalam
`videoBridgePipeline.ts`, yang dipanggil sekali bagi setiap bahagian video dalam
gelung `preCall`. Modul tersebut turut mentakrifkan sempadan port eksplisit
`VideoMediaBrokerPort` (memperoleh bait dan mengekstrak bingkai tersampel),
`VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang diisytiharkan
oleh pemanggil dengan kapsyen tersampel), dan `VideoDrilldownPort` (sempadan
pengekalan perincian bingkai; belum disambungkan kepada `processVideoPart` —
hanya laluan `/api/modality-bridge/video/drilldown` yang berasingan menulis
entri perincian pada masa ini).

Laluan permintaan awam `/v1` tidak pernah mengimport atau menjalankan
subproses. Video jauh dimuat turun dengan had 50 MiB; video base64 sebaris
mempunyai had dinyahkod konservatif sebanyak 36 MiB bagi setiap video supaya
sampul model/mesej/pembingkaian dapat kekal dalam had penerimaan permintaan JSON
awam sebanyak 50 MiB. Anggaran panjang sebaris dan saiz dinyahkod disemak
sebelum penguntukan. HTTPS diperlukan pada URL jauh awal dan setiap ubah hala,
dengan menggunakan pengawal keluar awam sahaja yang sedia ada dengan
pengepitan DNS. Bait tersebut kemudiannya merentasi sempadan broker dalaman
`POST /api/modality-bridge/video/extract` yang tepat. Laluan tersebut ialah
`LOCAL_ONLY` dan `SPAWN_CAPABLE`, hanya menerima permintaan gelung balik
dipercayai yang disahkan bagi setiap proses, dan tidak pernah menerima URL,
laluan sistem fail, boleh laku atau senarai argumen. Saluran saiz badan API dan
pembaca badan bertokok pengendali masing-masing menguatkuasakan had input broker
50 MiB secara berasingan. Baris gilir terhadnya menjalankan satu pengekstrakan
pada satu-satu masa, membenarkan empat tugas menunggu dan mengehadkan input
tertunda kepada 100 MiB.

Di dalam broker, `ffprobe` membaca fail setempat persendirian; senarai izin
format tetap mengecualikan format senarai main dan manifes. Bagi bekas keluarga
MOV yang dibenarkan, rujukan data MOV luaran kekal dilumpuhkan secara lalai dan
perintah tetap tidak memilih untuk mendayakannya. Kedua-dua `ffprobe` dan
`ffmpeg` menggunakan senarai putih protokol `file` sahaja, satu jalur, tatasusunan
argumen tetap, tanpa cangkerang dan boleh laku yang diselesaikan daripada
`PATH`. Strim kulit muka bergambar terlampir bukan calon yang boleh dimainkan.
Semua strim yang boleh dimainkan mesti memenuhi had dan strim lalai eksplisit
diutamakan sebelum sandaran indeks terendah yang deterministik. Video dihadkan
kepada 600 saat, 8,192 piksel bagi setiap dimensi dan 33,554,432 piksel sumber.
FFmpeg mengambil sampel 1–16 bingkai JPEG titik tengah, mengecilkan skala sisi
panjang kepada paling banyak 1,024 piksel tanpa membesarkan input yang lebih
kecil dan tidak pernah menerima URL. Pensampelan ialah `uniform` secara lalai.
Dasar pilihan `scene_aware` dan percubaan `segment_aware` melakukan satu lagi
laluan FFmpeg tetap terhadap strim setempat yang telah disahkan, memilih cap
masa adegan `showinfo` yang terhad dan berundur secara deterministik kepada
titik tengah seragam yang sama apabila pengesan gagal, tamat masa, menghasilkan
output cacat atau set calon kosong. Mod sedar segmen memperuntukkan sampel titik
tengah secara berkadar kepada selang adegan yang disahkan; bukti sedar segmen
dan tingkah laku sandaran diperincikan di bawah. Had keras 16 bingkai digunakan
selepas pemilihan dalam setiap dasar. Apabila permintaan sedar adegan hanya
mempunyai belanjawan satu bingkai, ia menggunakan titik tengah seragam bagi
tetingkap video penuh atau fokus yang aktif dan melaporkan
`policyEffective: uniform`: satu bingkai adegan yang dipilih tidak dapat
mengekalkan kedua-dua hujung temporal. Pemanggil boleh menyediakan tetingkap
fokus terhingga (`start`/`end` saat) secara pilihan; sempadan diapit kepada
tempoh media, tetingkap songsang atau tidak terhingga ditolak dan semua dasar
pensampelan dilakukan hanya dalam selang ternormal. Tetingkap yang terhasil
disertakan dalam metadata pensampelan dan awalan perihalan tidak dipercayai
supaya model hiliran dapat membezakan petikan berfokus daripada garis masa
penuh.

Fokus kapsyen semantik ialah tetapan berasingan dan eksplisit. Mod analisis
`full` lalai mengekalkan gesaan bingkai sedia ada dan tidak pernah memajukan
teks permintaan kepada model kapsyen. Dalam mod `focused`, jambatan hanya
membaca `text`/`input_text` karangan pengguna terkini yang tidak kosong daripada
bekas Chat atau Responses yang sama, menormalkannya kepada NFC, meruntuhkan
aksara kawalan dan ruang putih, serta mengehadkannya kepada 500 titik kod
Unicode. Hasil kosong berundur kepada gesaan `full` yang tepat. Petunjuk yang
boleh digunakan disirikan sebagai JSON dalam blok konteks pengguna tidak
dipercayai yang dikhususkan dan hanya boleh mengutamakan butiran yang dapat
diperhatikan; petunjuk tersebut tidak boleh mengatasi amaran berasingan agar
tidak mengikuti arahan yang kelihatan atau kedengaran dalam media. Fokus
tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah pensampel
temporal.

#### Bukti segmen struktur FU-07

`segment_aware` menggunakan satu laluan pra-analisis terbatas ke atas strim video setempat yang telah disahkan. Rantaian penapis tetap mula-mula menskalakan lebar kepada maksimum 320 piksel, mengesan perubahan adegan dan selang beku, kemudian membuat pensampelan pada kadar 1 bingkai sesaat untuk kekaburan, luma purata serta maklumat ruang/masa. Laluan ini dihadkan kepada 600 sampel struktur, satu bebenang FFmpeg/penapis, senarai dibenarkan protokol `file` sahaja dan bekas yang sama, had output proses sebanyak 1 MiB, serta maksimum 30 saat dalam pembatalan/tarikh akhir dikongsi broker. Ia tidak pernah menerima perintah, penapis, laluan atau URL daripada permintaan.

Nilai struktur ialah bukti pensampelan deterministik, bukannya pemahaman semantik video. Nilai tersebut tidak menyimpulkan subjek, tindakan, kapsyen, pertuturan atau niat pengguna. Sempadan adegan dan beku membentuk segmen; liputan beku, kekaburan, dedahan, perincian ruang dan perubahan masa hanya mempengaruhi cara bajet sedia ada sebanyak 1–16 bingkai diperuntukkan. Segmen yang beku sepenuhnya dihadkan kepada satu bingkai, manakala segmen yang tidak beku bersaing untuk baki bajet. Apabila bilangan sempadan melebihi bilangan bingkai, liputan garis masa yang seragam dikekalkan supaya potongan pantas pada bahagian awal tidak dapat menyembunyikan segmen panjang di bahagian hujung. Sempadan adegan yang berada dalam resolusi analisis 1 saat daripada sempadan beku digabungkan.

Penapis yang tiada, bukti yang cacat/kosong, ralat pengesan atau tamat masa pra-analisis terbatas akan gagal secara terbuka kepada dasar titik tengah seragam yang tepat. Pembatalan oleh pemanggil atau tarikh akhir broker tidak gagal secara terbuka: ia menamatkan subproses yang sedang berjalan, menghalang pengekstrakan bingkai seterusnya dan pepohon sementara peribadi dialih keluar dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menjana lekapan FFmpeg sebenar yang deterministik untuk penjimatan panggilan kapsyen selepas penyahduplikasian, peruntukan bajet gerakan padat, bukti kekaburan/dedahan/SI-TI, potongan pantas dengan bahagian hujung yang panjang dan positif palsu akibat pudar secara beransur-ansur. Ia merekodkan masa sebenar pra-analisis dan, apabila `/usr/bin/time` tersedia, CPU proses anak serta RSS puncak. Semakan kualitinya hanyalah orakel struktur. Kualiti model kapsyen sebenar kekal `HOLD` kerana abah-abah ini tidak mempunyai titik akhir yang dibenarkan atau penilai beku. Penjimatan kewangan juga kekal `HOLD` melainkan `--caption-cost-per-call-usd` membekalkan anggaran positif yang jelas bagi setiap panggilan; skrip tersebut tidak pernah mereka-reka mana-mana hasil.

Setiap bingkai dihadkan kepada 4 MiB, semua bingkai mentah secara keseluruhan kepada 23 MiB dan respons broker bersiri kepada 32 MiB. Direktori sementara peribadi dialih keluar dalam `finally`. OmniRoute tidak menyertakan FFmpeg dan tidak menerima laluan boleh laku tersuai. Sebelum pengapsyenan, penghubung menggunakan laluan penyahduplikasian visual yang konservatif: setiap JPEG dikecilkan kepada penimbal skala kelabu 16×16 dan hanya dibandingkan dengan bingkai terakhir yang dikekalkan. Bagi bajet kapsyen yang diminta melebihi satu bingkai, pengekstrakan menyediakan kumpulan calon terbatas sehingga dua kali ganda bajet tersebut dan tidak pernah melebihi 16 bingkai. Had yang diminta hanya digunakan selepas penyahduplikasian, dengan calon pertama dan terakhir yang dipilih dikekalkan semasa penipisan akhir apabila bajet sekurang-kurangnya dua. Dasar berversi `grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta luma purata dengan nisbah sel imej kecil yang delta ternormalnya sekurang-kurangnya 0.05. Ambang pendua ialah pemalar 0.04, yang dipilih demi kebolehramalan dan bukannya didedahkan sebagai tetapan masa jalan. Isyarat sekunder berkontras tinggi ini mengekalkan gerakan kecil dan perubahan teks yang boleh dilihat, yang mungkin disembunyikan oleh perbandingan berasaskan purata sahaja. Ralat pembanding atau penyahkod akan gagal secara terbuka dan mengekalkan liputan. Metadata output membezakan calon yang diekstrak, bingkai yang berjaya digunakan dan pendua visual yang digugurkan.

Bahagian video yang ditandai secara jelas boleh meminta helaian kenalan dengan cap masa. Penghubung membina grid JPEG dengan maksimum 4 lajur dan 16 bingkai. Setiap sel 512 piksel menerakan cap masa sumbernya pada jalur bawah berkontras tinggi, manakala cap masa yang sama dikekalkan dalam metadata tekstual untuk perkaitan dan audit hiliran. JPEG lengkap kekal dihadkan kepada 32 MiB. Jika `sharp` tidak dapat menyahkod atau menggubah grid, penghubung kembali menggunakan bingkai JPEG individu; pembatalan klien masih disebarkan melalui operasi helaian tersebut.

Bukti promosi sengaja diasingkan daripada penanda aras mikro komposisi sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan abah-abah A/B berversi skema untuk model penglihatan sebenar yang serasi dengan OpenAI. Ia mengukur token yang dilaporkan penyedia, kependaman masa sebenar hujung ke hujung (termasuk penggubahan helaian), bilangan panggilan model dan pengekalan fakta yang ditakrifkan oleh manifes. Respons model mentah tidak ditulis ke dalam laporan; hanya cernaan SHA-256 dan ID fakta yang sepadan dikekalkan. Abah-abah tersebut tidak membuat sebarang panggilan rangkaian atau model berbayar melainkan `--execute-real` diberikan dan `--model`, `OMNIROUTE_BASE_URL` serta `OMNIROUTE_API_KEY` dikonfigurasikan. Tanpa pelaksanaan sebenar yang jelas itu, keputusan boleh baca mesinnya kekal `HOLD`; ukuran muatan/bilangan panggilan sintetik sahaja bukan bukti promosi.

Pemanggil boleh melampirkan tatasusunan `transcript.cues` pilihan pada bahagian video yang disokong apabila mereka sudah mempunyai teks yang dijajarkan. Setiap kiu mesti mengandungi `text`, selang `start`/`end` terhingga dalam tempoh yang disiasat dan `source` yang disenaraikan sebagai dibenarkan (`client`, `embedded` atau `audio-bridge`); `confidence` ditetapkan secara lalai kepada `1` dan mesti kekal antara `0` dengan `1`. Kiu pendua yang tepat diruntuhkan. OmniRoute tidak pernah memulakan transkripsi daripada metadata ini: kiu yang disahkan disalin ke dalam hasil yang dihuraikan bersama sumber, keyakinan dan selang, serta dipaparkan sebagai pemerhatian tidak dipercayai bersama kapsyen bingkai. Teks yang tidak sah, di luar julat atau tanpa asal-usul ditolak dan bukannya dicampurkan ke dalam strim kapsyen. Kedua-dua saluran transkrip badan permintaan menormalkan asal-usul yang dibekalkan kepada `client`, termasuk label `embedded` atau `audio-bridge` yang diisytiharkan sendiri. Hanya penyesuai milik pelayan boleh menetapkan label dipercayai tersebut melalui argumen kod sahaja `trustedSource`; medan JSON permintaan tidak boleh mencapai argumen itu. Teks transkrip kekal sebagai kandungan tidak dipercayai yang diterbitkan daripada media, tanpa mengira asal-usulnya, dan tidak sekali-kali boleh menentukan pemberian kuasa.

Pemanggil lanjutan boleh menyediakan trek `audioTranscript` untuk video yang sama;
ia dianggap sebagai teks yang disediakan oleh klien, bukan bukti transkripsi pelayan.
Titik gabungan menjalankan pemerhatian visual dan audio di bawah
satu tarikh akhir dan isyarat batal, menyusunnya pada garis masa yang sama, menggabungkan
pendua tepat, dan melaporkan hasil separa apabila hanya satu bahagian berjaya.
`audioTranscript` yang tidak sah diturunkan kepada hasil separa tersebut — perihalan
visual dikekalkan dan cabang audio merekodkan kod kegagalan yang telah disanitasi —
dan bukannya menggagalkan keseluruhan video. Ketersediaan setiap cabang, penanda separa,
dan kod kegagalan yang telah disanitasi dikekalkan dalam hasil yang dihuraikan, dalam
metadata batas keselamatan (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam pembilang
gabungan jambatan. Laluan Video Bridge lalai tidak menjalankan pertuturan-ke-teks
atau memuat turun salinan media kedua; tanpa trek eksplisit tersebut, ia kekal
sebagai video sahaja.

**Pengekalan transkrip (#12150 P1).** Ini digunakan secara automatik apabila
Video Bridge (yang juga perlu didayakan secara pilihan) memaparkan kiu transkrip — tiada
penanda pengekalan yang berasingan. Apabila permintaan memaparkan sebarang kiu transkrip
(`transcript` yang diisytiharkan oleh pemanggil atau `audioTranscript` yang digabungkan),
batas keselamatan menandakannya sebagai `videoBridgeObserved` dan menghasilkan salinan
bayangan perihalan video yang telah disunting — pemaparan serupa yang menggantikan isi
teks bebas setiap kiu dengan `[redacted-video-transcript]`, dibina dengan menggantikan
medan kiu berstruktur sebelum rentetan dihimpunkan (tidak sekali-kali dengan menghuraikan
teks yang telah diratakan, maka tiada kandungan kiu — sama ada berniat jahat atau biasa,
termasuk isi yang mengandungi `]` seperti `[inaudible]`/`[music]` — boleh kekal).
Isi permintaan log panggilan yang disimpan menukar setiap bahagian teks yang diterbitkan
daripada video dengan salinan bayangan yang telah disunting tersebut, dipadankan melalui
kesamaan kandungan; sauh `fullText` dibaca semula daripada muatan batas keselamatan
prapanggilan yang telah siap, supaya padanan masih berjaya selepas batas keselamatan
rantaian berikutnya (penutup PII dan kelayakan, keutamaan 10/95) menulis semula teks
perihalan di tempatnya dan selepas suntikan gesaan sistem/penyerahan/memori membentuk
semula tatasusunan mesej. Isi yang dihantar ke hulu kepada model tidak berubah.
Permintaan yang diperhatikan juga tidak mengisi sebarang Memori tahan lama (pengekstrakan
yang diterbitkan daripada permintaan dan respons kedua-duanya dilangkau), maka balasan
model itu sendiri tidak boleh menggemakan teks transkrip ke dalam Memori.

**Medan video mentah (#12430).** Apabila jambatan didayakan dan sokongan video natif tidak diketahui atau tiada, medan `transcript`/`audioTranscript` yang ditakrifkan turut mengaktifkan `videoBridgeObserved`, walaupun selepas kegagalan perihalan atau had `maxVideos`. `null` dan rentetan kosong dikira; medan yang tiada dan metadata bukan video tidak dikira. Salinan yang dikekalkan menyunting medan ini atau mengabaikan permintaan, manakala cache/Memori dilangkau.

Pada laluan sandaran tersebut, kiu pemanggil yang sah menjadi bahagian `text`/`input_text`
yang disokong dan bukannya medan penyedia bukan standard. Kedua-dua trek yang dibekalkan
oleh permintaan kekal sebagai pemerhatian `client` yang tidak dipercayai, dengan amaran
eksplisit bahawa video tidak dihuraikan dan cap masa tidak disahkan terhadap media. Bajet
256 kiu/64 KiB keseluruhan dan setiap kiu yang sedia ada digunakan merentasi kedua-dua
trek secara bersama; cap masa mesti berada dalam had maksimum 600 saat broker dan
sebarang tetingkap fokus yang dibekalkan. Trek yang tidak sah dibuang, bukan dimajukan
sebagai teks sewenang-wenangnya; trek saudara yang sah masih boleh digunakan melainkan
bajet gabungannya dilampaui. Medan nol/kosong tidak menambahkan teks. Tiada pengambilan
media atau transkripsi ditambahkan oleh sandaran ini. Medan sambungan transkrip dialih
keluar daripada pembawa video sandaran serta objek `video_url`/`source` miliknya.
Senarai izin penghantaran OpenAI kekal ketat; pembawa video natif yang tidak diketahui
kekal tersedia dan sasaran teks sahaja yang diketahui mengekalkan penanda selamat.
Salinan bayangan suntingan berstruktur melindungi teks transkrip yang ditambahkan,
manakala permintaan asal milik pemanggil kekal tidak berubah. Sasaran yang menyokong
secara natif dan jambatan yang dilumpuhkan mengekalkan tingkah laku pintasan sedia ada.

Salinan tambahan yang dikekalkan menggunakan isyarat permintaan diperhatikan yang sama.
Petikan permintaan klien mentah prabatas keselamatan, permintaan belum selesai dalam
memori, dan log permintaan ditolak awal menggantikan medan transkrip dalam bahagian video
secara berstruktur; gesaan rentetan yang disintesiskan oleh peringkat saluran paip dan
penyerahan konteks disunting pada penerima isi permintaan yang disimpan. Penanda
`video_content_removed` yang disimpan menyebabkan penerusan `previous_response_id`
gagal secara tertutup dan bukannya membina semula teks yang sengaja dibuang.
Jika permintaan yang diperhatikan kehilangan salinan bayangan suntingan setiap bahagiannya
sebelum pengelogan, atau walaupun hanya satu daripada beberapa salinan bayangan video
gagal dipadankan selepas mutasi permintaan berikutnya, isi permintaan yang dikekalkan
diabaikan sepenuhnya dan bukannya mengekalkan transkrip yang hanya disunting sebahagian.

Bagi permintaan yang diperhatikan, respons model mungkin memetik mana-mana bahagian
transkrip tanpa sempadan kiu berstruktur. Oleh itu, `responseBody` log panggilan yang
disimpan digantikan dengan penanda pengabaian; artifak saluran paip terperinci (yang
boleh merangkumi isi hulu/klien dan cebisan strim) tidak dikekalkan. Cache semantik,
idempotensi dan main semula penaakulan memintas pembacaan dan penulisan bagi permintaan
tersebut. Permintaan penyedia dan respons yang boleh dilihat oleh klien kekal tidak
berubah. Bait kekal hidup awal disalirkan daripada penimbal sementara apabila artifak
terperinci diabaikan. Amaran EventStream cacat Kiro hanya melaporkan kiraan bait muatan,
tidak sekali-kali kandungannya atau ralat mentah penghurai JSON.
Ini tidak mendakwa bahawa setiap diagnostik penyedia/pemalam yang tidak berkaitan telah
diaudit; pemeriksaan lebih luas terhadap penerima data yang disimpan dijejaki dalam
#11658.

Kitar hayat dalaman `/api/modality-bridge/video/drilldown` ialah substrat cache berasingan yang disahkan melalui gelung balik/token. Setiap operasi juga memerlukan ID prinsipal legap kanonik. Sebelum pemanggil produksi didayakan, ia mesti memperoleh ID tersebut daripada penyewa yang telah disahkan dan tidak boleh sama sekali memajukan nilai yang dipilih oleh klien. Kekunci cache mengikat prinsipal tersebut kepada ID sesi dan rujukan video kanonik, menyimpan hanya kekunci terbitan SHA-256, serta mengehadkan skop bacaan dan pemadaman kepada prinsipal yang sama. Cache menyimpan paling banyak 16 bingkai JPEG terbitan bagi setiap entri, menamatkan tempohnya selepas sepuluh minit, dan menyokong bacaan `start`/`end` berbatas atau pemadaman sesi secara eksplisit.

Setiap prinsipal dihadkan kepada 16 entri dan 64 MiB data JPEG kanonik. Had tersebut adalah bebas daripada had global 64 entri/256 MiB: tekanan kuota prinsipal hanya menyingkirkan entri yang paling lama tidak digunakan bagi prinsipal tersebut sebelum penyingkiran LRU global dipertimbangkan. Entri yang tamat tempoh dikeluarkan daripada perakaunan prinsipal dan global apabila cache aktif, manakala pembatalan dan kegagalan pengesahan tidak melakukan penggantian separa.

Cache menolak Base64 bukan kanonik, pelapik berlebihan, media bukan JPEG, JPEG yang rosak atau terpotong, serta JPEG yang menghasilkan amaran semasa penyahkodan imej penuh `sharp` berbatas. Ia mengekod semula setiap imej yang diterima sebagai JPEG kanonik, memperoleh lebar dan tinggi daripada bait yang dinyahkod dan bukannya mempercayai medan pemanggil, serta membuang sebarang bait poliglot di hujung dan bukannya mengekalkannya. Hanya penimbal termampat kanonik berbatas dicaj kepada kedua-dua kuota. Had wayar JSON merangkumi overhed Base64 bagi had input ternyahkod 32 MiB. Setiap terbitan yang disimpan merekodkan format/resolusi JPEG yang telah disahkan, dasar pensampelan, versi terbitan, masa penciptaan, cincangan kandungan yang dikira oleh pelayan, serta rujukan induk yang dicincangkan bersama cincangan kandungan induk daripada pemanggil yang dipercayai. Pembatalan diperiksa antara fasa penyahkodan/cincangan tak segerak sebelum komit cache atomik.

Fasa ini belum menghubungkan pengeluar produksi kepada laluan tersebut dan tidak menyediakan pemilihan varian berbilang resolusi. Oleh itu, laluan permintaan Video Bridge yang telus tidak menanggung kerja tambahan, manakala penerbitan prinsipal terikat penyewa dan keseluruhan kitar hayat berbilang resolusi FU-08 kekal sebagai kerja susulan yang eksplisit dan bukannya didokumenkan sebagai tingkah laku yang telah lengkap.

Bingkai diberikan kapsyen secara berurutan menggunakan model Video yang dikonfigurasikan. Penggantian Video yang kosong mewarisi tetapan Vision; jika kedua-duanya kosong, penghala automatik Vision memilih model berkeupayaan penglihatan yang berkesan. Kapsyen yang berjaya menggantikan bahagian asal dengan awalan `[Video description:` yang stabil, yang turut menandakan teks tersebut sebagai pemerhatian tidak dipercayai yang diterbitkan daripada media dan mengarahkan model hiliran supaya tidak mengikuti arahan yang ditemui dalam media. Kekunci cache kapsyen bingkai merangkumi bait JPEG, gesaan, cap masa dan model berkesan; hanya kapsyen yang berjaya disimpan dalam cache. Entri cache mengekalkan model pengeluar sebenar yang berjaya, termasuk model sandaran; jambatan melaporkan `mixed` apabila bingkai yang berbeza dihasilkan oleh model yang berbeza. Padanan cache menggunakan semula identiti pengeluar tersebut dan bukannya melabelkannya semula sebagai pelan penghalaan yang diminta. Cache hasil keseluruhan video dikunci berdasarkan setiap input yang mengubah output — gesaan, model berkesan, dasar pensampelan, bilangan bingkai, mod analisis semantik, cap jari SHA-256 bagi petunjuk fokus ternormal, tetingkap fokus, `transcript`, `audioTranscript` dan bendera helaian kenalan — maka perubahan pada mana-mana dimensi tersebut menghasilkan cache tidak padan dan bukannya penggunaan semula data lapuk. Versi dasar penyahduplikasian visual, ambang dan bilangan bingkai calon berbatas turut dinyatakan secara eksplisit dalam kekunci serta metadata cache hasil; oleh itu, perubahan dasar tidak boleh menggunakan semula perihalan keseluruhan video yang lapuk. Metadata cache hasil v4 mengekalkan mod dan cap jari, tetapi tidak sekali-kali menyimpan tugas pengguna mentah. Metadata pagar keselamatan melaporkan kedua-dua mod analisis yang diminta dan yang berkesan; mod `focused` yang diminta tanpa teks pengguna yang boleh digunakan dilaporkan sebagai `full` secara berkesan.

Pagar keselamatan mengekstrak setiap bahagian video yang disokong tetapi tidak menghuraikan lebih daripada `modalityBridgeVideoMaxVideos`. Bagi sasaran yang terbukti mempunyai `supportsVideo === false`, video yang gagal dan melebihi had menjadi penanda teks selamat yang eksplisit supaya tiada video mentah kekal. Apabila keupayaan tidak diketahui, bahagian tersebut mengekalkan pembawa videonya; sebarang transkrip sandaran mengikuti penukaran teks berbatas di atas. Sasaran dengan `supportsVideo === true` memintas jambatan. Isyarat henti permintaan klien disebarkan melalui muat turun, baris gilir broker, subproses dan panggilan kapsyen; penghentian berhenti antara video dan tidak sekali-kali gagal secara terbuka kepada media mentah.

Tetapan masa jalan disokong oleh DB dan disahkan oleh Zod:

| Kunci                               | Lalai       | Julat / tingkah laku                                                                                             |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Masa jalan pilihan, perlu diikut serta                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mengekalkan kapsyen umum; `focused` menggunakan konteks pengguna terkini yang terhad dan tidak dipercayai |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` berkadar; kegagalan pengesan kembali kepada `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                   |

Nilai tamat masa Video legasi tersimpan yang melebihi 120 saat dihadkan kepada
tarikh akhir broker; penulisan tetapan baharu yang melebihi had tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokaliti gelung balik bercap
yang dipercayai sebelum pengesahan atau pemeriksaan masa jalan, kemudian memerlukan
pengesahan pengurusan. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe
yang disanitasi, dan sebab tetap apabila masa jalan tidak tersedia. Titik akhir
pengekstrakan dalaman bukan API muat naik awam: ketepuan baris gilir mengembalikan
`503` bersama `Retry-After`, pemutusan sambungan pemanggil mengembalikan `499`,
dan tarikh akhir broker yang tetap mengembalikan `504`. Respons yang ditukar menambahkan
`video->text;model=<visionModel>;parts=<videos>` pada pengepala pusat
`x-omniroute-modality-bridge` tanpa mengalih keluar segmen Vision atau Audio.

### Penyamar PII (`piiMasker.ts`)

Berjalan pada **kedua-dua** peringkat.

- **`preCall`** mengklon muatan, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item rentetan biasa), serta menggunakan `processPII()` (daripada
  `@/shared/utils/inputSanitizer`) pada medan `content`/`text` berbentuk rentetan. Apabila
  `PII_REDACTION_ENABLED=true`, PII yang dikesan disunting dalam muatan
  keluar. Ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengawal
  dasar suntikan gesaan). Apabila penyuntingan dimatikan, panggilan merekodkan kiraan
  pengesanan tanpa menulis semula kandungan.
- **`postCall`** mengklon respons secara mendalam, menjalankan `sanitizePIIResponse()` serta
  penyamar bentuk Responses-API (`maskResponsesOutput` — merangkumi
  `output_text` dan `output[].content[].text`). Jika berlaku sebarang penyuntingan,
  respons yang diubah suai menggantikan respons asal.

Kawalan keselamatan tidak pernah menyekat; ia hanya menganotasi (`meta.detections`,
`meta.redacted`) atau menulis semula.

#### Pemilihan mengikut jenis, corak tersuai dan pembilang pengesanan

**Papan Pemuka → Tetapan → Keselamatan → Penyamaran PII** memilih _apa_ yang disamarkan. Ia
tidak menghidupkan penyamaran: perkara itu masih dikawal oleh `PII_REDACTION_ENABLED` (permintaan) dan
`PII_RESPONSE_SANITIZATION` (respons + SSE), kedua-duanya dimatikan secara lalai.

- **Pemilihan mengikut jenis** — id terbina dalam disenaraikan dalam
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Tidak ditetapkan bermakna setiap
  jenis (tingkah laku sebelum tetapan ini wujud). Corak `ssn_us` bagi enjin permintaan
  dipetakan kepada `ssn`. Templat (Minimum, Standard, Kewangan,
  Brazil, AS, Penuh) hanya mengisi kotak pilihan dalam UI.
- **Corak tersuai** — sehingga 20 corak regex atau kad bebas (`*` = sehingga 64
  aksara bukan ruang putih, `?` = satu). Padanan menjadi `[CUSTOM_REDACTED]`.
  Setiap corak melalui `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): paling banyak 500 aksara, bendera terhad
  kepada `g i m s u`, mesti boleh dikompil, mesti lulus `safe-regex` (penjejakan balik
  dahsyat), dan tidak boleh memadankan rentetan kosong atau ruang letak penyuntingan.
  Corak yang gagal akan ditolak apabila disimpan dan apabila diuji, manakala baris tersimpan
  yang gagal akan dilangkau semasa masa jalan dan bukannya dikompil. Corak tersuai hanya
  berjalan semasa penyamaran dihidupkan.
- **Pembilang pengesanan** — kiraan mengikut jenis (bukan nilai yang dipadankan), disimpan dalam
  memori dan ditetapkan semula apabila dimulakan semula (`src/lib/pii/piiDetectionStats.ts`). Kiraan hanya
  meningkat semasa penyamaran dihidupkan.

Tetapan disimpan dalam jadual `key_value` (ruang nama `pii_settings`,
`src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 s. API:

| Kaedah | Laluan                   | Tujuan                                                                             |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Keadaan bendera, `enabledTypes`, `customPatterns`, pembilang pengesanan            |
| `PUT`  | `/api/settings/pii`      | Gantikan `enabledTypes` (`null` = semua) dan/atau `customPatterns`                 |
| `POST` | `/api/settings/pii/test` | Ujian kering satu corak terhadap sampel paling banyak 8 KB; tiada apa-apa disimpan |

Ketiga-tiganya memerlukan pengesahan pengurusan dan mengesahkan badan dengan Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Suntikan Gesaan (`promptInjection.ts`)

Mengesan struktur berniat jahat dalam kandungan yang dibekalkan pengguna dan menguatkuasakan
dasar yang dikonfigurasikan. Tingkah laku ditentukan oleh pemboleh ubah persekitaran dan pilihan
pembina:

| Tetapan        | Pemboleh ubah persekitaran                                                                             | Lalai  | Kesan                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Didayakan      | `INPUT_SANITIZER_ENABLED`                                                                              | `true` | Apabila `false`, pagar pengadang dipintas.                                                                                                                                                                   |
| Mod            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn` | Dasar suntikan: `block`, `warn`, atau `log`. (`redact` diterima untuk keserasian ke belakang tetapi **tidak** membuang teks suntikan; penulisan semula PII permintaan dikawal oleh `PII_REDACTION_ENABLED`.) |
| Ambang sekatan | Pilihan `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Keterukan minimum yang diperlukan untuk menyekat. Tahap sederhana hanya diperhatikan secara lalai.                                                                                                           |

**Keutamaan mod** (`getMode`): `options.mode` pemanggil →
**penggantian bendera ciri DB** `INJECTION_GUARD_MODE` (Papan Pemuka → Tetapan →
Bendera Ciri) → persekitaran `INJECTION_GUARD_MODE` → persekitaran `INPUT_SANITIZER_MODE` →
`warn`. Oleh itu, penggantian papan pemuka mengatasi pemboleh ubah persekitaran,
maka UI Bendera Ciri mengawal pagar pengadang yang sedang berjalan secara langsung
(tanpa mula semula). Pembacaan DB adalah selamat sekiranya gagal: jika berlaku
ralat, pagar pengadang kembali kepada tingkah laku berasaskan persekitaran, dan
apabila tiada penggantian ditetapkan, tingkah lakunya sama seperti penyelesaian
yang hanya menggunakan persekitaran.

Sumber pengesanan:

1. `sanitizeRequest()` daripada `@/shared/utils/inputSanitizer` (set pengesan
   dikongsi yang digunakan di bahagian lain dalam saluran pemprosesan).
2. `DEFAULT_GUARD_PATTERNS` terbina dalam (pada masa ini `system_override_inline`
   dan `markdown_system_block`, kedua-duanya berketerukan `high`).
3. `customPatterns` pilihan yang dihantar melalui pilihan pembina (rentetan,
   regex, atau rekod `{ name, pattern, severity }`).

Apabila `mode === "block"` **dan** sekurang-kurangnya satu pengesanan memenuhi
ambang keterukan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mod `warn`/`log`, pagar pengadang membuat
log tetapi membenarkan panggilan. Pembantu dikongsi `evaluatePromptInjection()`
turut dieksport untuk pemanggil yang perlu menilai gesaan tanpa melalui daftaran.

**Had imbasan (v3.8.20):** pengesan hanya memeriksa **16 KB pertama** daripada
teks gesaan yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bait)
dalam `src/shared/utils/inputSanitizer.ts`. Kedua-dua `detectInjection()` dan
`evaluatePromptInjection()` menggunakan `slice(0, MAX_INJECTION_SCAN_BYTES)`
sebelum menjalankan gelung corak. Arahan suntikan terletak berhampiran bahagian
atas input, maka ini mengehadkan penggunaan CPU/GC regex pada muatan bersaiz
ratusan KB tanpa melemahkan pengesanan (rujuk #3932, #4041).

### Penutup Kelayakan (`credentialMasker.ts`)

Berjalan pada **kedua-dua** peringkat, terakhir dalam rantaian lalai (keutamaan
`95`). Menyunting keluar corak kunci API / token rahsia yang diketahui umum
daripada muatan keluar (kandungan mesej, argumen panggilan alat, hasil alat)
**dan** respons penyedia, supaya kelayakan yang ditampal ke dalam gesaan (atau
digemakan semula oleh hasil alat) tidak terbocor kepada penyedia huluan atau
kembali kepada klien.

- **Ikut serta sahaja**, menggunakan kelaziman yang sama seperti penyuntingan
  PII (berkaitan Peraturan Keras #20): dilumpuhkan melainkan
  `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Apabila dimatikan, pagar pengadang tidak
  melakukan apa-apa — ia tidak pernah menyekat dan tidak pernah menulis semula.
- `redactCredentials()` merentasi seluruh pepohon muatan/respons (`walkValue()`,
  selamat daripada pencemaran prototaip, selamat daripada kitaran melalui
  `WeakSet`) dan menggantikan padanan dengan ruang letak `[REDACTED:<type>]`,
  dengan hanya mengklon cabang yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` merangkumi kunci penyedia LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square),
  kunci awan (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci peribadi / JWT,
  rentetan sambungan yang mengandungi kelayakan (`mongodb://user:pass@...`, dan
  sebagainya), serta corak nilai pengepala generik `Authorization`/`x-api-key`/
  `api-key`/`apikey`. Kunci berbentuk pengepala (`authorization`, `x-api-key`,
  `api-key`, `apikey`) disunting keluar secara berstruktur (nilai sahaja,
  awalan skema seperti `Bearer `/`Basic ` dikekalkan), bukannya melalui regex
  teks generik.
- Pagar pengadang tidak pernah menyekat; ia hanya menulis semula
  (`modifiedPayload` / `modifiedResponse`) dan membuat anotasi
  (`meta.credentialsRedacted`, `meta.count`).

Pengawal regresi: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrak Asas (`base.ts`)

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
  block?: boolean; // true memintas terus rantaian
  message?: string; // dipaparkan apabila disekat
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // dikembalikan oleh preCall untuk menulis semula permintaan
  modifiedResponse?: TValue; // dikembalikan oleh postCall untuk menulis semula respons
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

Sesuatu guardrail menandakan "tiada perubahan" dengan mengembalikan sama ada `void`, `{}`, atau
`{ block: false }`. Pengembalian `modifiedPayload`/`modifiedResponse` menggantikan
nilai yang mengalir melalui rantaian untuk guardrail hiliran.
`signal?: AbortSignal` membawa kitaran hayat pemanggil ke dalam guardrail. Pembatalan permintaan ialah pengecualian fail-terbuka yang disengajakan: jambatan media menghentikan kerja dan melakukan pembersihan tanpa memulihkan media mentah kepada sasaran yang diketahui tidak menyokongnya.

## Pendaftar (`registry.ts`)

`guardrailRegistry` singleton mendedahkan:

- `register(guardrail)` — menambah (atau menggantikan mengikut nama yang dinormalisasi) guardrail dan
  menyusun semula mengikut `priority` menaik.
- `clear()` / `list()` — pembantu pentadbiran.
- `runPreCallHooks(payload, context)` — mengulangi guardrail aktif, mengalirkan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` yang pertama.
- `runPostCallHooks(response, context)` — aliran yang sama di bahagian respons.
- `resetGuardrailsForTests({ registerDefaults })` — mengosongkan keadaan dan secara pilihan
  mendaftar semula lalai untuk pengasingan ujian yang bersih.

Kedua-dua pelari mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
di mana `results` adalah tatasusunan rekod `GuardrailExecutionResult` yang merangkumi
medan `blocked`, `skipped`, `modified`, `error`, dan `meta` bagi setiap guardrail,
berguna untuk pengesanan.

### Melumpuhkan Guardrail Setiap Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengagregatkan
senarai nama guardrail yang tidak diduplikasi yang harus dilangkau untuk permintaan semasa. Sumber (semua pilihan, semua digabungkan):

- `apiKeyInfo.disabledGuardrails`
- Badan permintaan `disabledGuardrails` (peringkat atas)
- Badan permintaan `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (atau warisan
  `x-disabled-guardrails`)

Nilai boleh berupa tatasusunan rentetan atau rentetan yang dipisahkan koma; nama
dinormalisasi kepada kebab-case huruf kecil (`pii_masker` → `pii-masker`). Hasilnya
dihantar melalui `context.disabledGuardrails` ke pendaftar, yang melangkau
guardrail yang sepadan (`skipped: true` dalam `results`).

## Urutan Pelaksanaan

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` membina senarai langkau daripada kunci API, badan,
    dan pengepala.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail mengikut
    susunan keutamaan menaik:
    - Guardrail yang dilumpuhkan direkodkan sebagai `skipped`.
    - `preCall` setiap guardrail mungkin menulis semula muatan melalui `modifiedPayload`.
    - `block: true` yang pertama akan memendekkan rantaian dan pengendali mengembalikan
      respons penolakan guardrail.
3.  Muatan (yang berpotensi ditulis semula) mengalir ke dalam penghalaan kombo dan
    penghantaran huluan.
4.  Selepas respons dipasang, `guardrailRegistry.runPostCallHooks(...)`
    menjalankan rantaian yang sama pada respons. `block: true` di sini menggugurkan
    respons huluan.

Guardrail yang membuang ralat direkodkan dengan `error: <message>` dan dicatat melalui
`logger.warn`, tetapi rantaian berterusan — reka bentuk fail-open.

## Konfigurasi

Pembolehubah persekitaran yang dibaca oleh guardrail terbina dalam:

| Pembolehubah                          | Digunakan oleh        | Kesan                                                                                                      |
| :------------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`    | Tetapkan `false` untuk melumpuhkan pengesanan sepenuhnya.                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`    | Polisi suntikan: `warn`, `block`, atau `log`. Nilai warisan `redact` tidak menulis semula teks suntikan.   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`    | Mod untuk pengawal suntikan; juga bendera ciri DB yang **mengatasi** pembolehubah persekitaran (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`    | Keterukan minimum yang `MODE=block` tolak: `high` (lalai), `medium`, atau `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`    | Alias warisan untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`          | Apabila `true`, PII permintaan disunting (tidak bergantung pada mod suntikan).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (huluan) | Mengawal tingkah laku masker di sisi respons.                                                              |

Guardrail Modality Bridge membaca konfigurasi masa jalan daripada stor tetapan yang disokong DB
(`getSettings()`), bukan pembolehubah persekitaran. Kunci utama Vision ialah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci `visionBridge*` warisan diterima hanya sebagai
penyelesaian sandaran bacaan satu kitaran yang didokumenkan; penulisan papan pemuka menggunakan
kunci utama. Nilai lalai dan penyelesaian sandaran terdapat dalam
`src/shared/constants/modalityBridgeDefaults.ts`, dengan pemalar warisan dikekalkan dalam
`src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, serta tetapan
`modalityBridgeCache*` yang dikongsi. Audio tidak mempunyai sandaran kunci warisan kerana
kunci-kunci ini diperkenalkan dengan skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, serta tetapan `modalityBridgeCache*` yang dikongsi.
Ia dilumpuhkan secara lalai kerana FFmpeg/ffprobe adalah kebergantungan operasi pilihan
dan kapsyen bingkai menambah kependaman serta kos model.

## Pengawal Tersuai

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

1.  Cipta `src/lib/guardrails/myGuardrail.ts` yang melanjutkan `BaseGuardrail`.
2.  Laksanakan `preCall` dan/atau `postCall`.
3.  Sama ada daftar pada masa import (tolak dari `registerDefaultGuardrails`) atau
    panggil `guardrailRegistry.register(...)` pada masa jalan — pendaftar menggantikan
    mana-mana pengawal terdahulu dengan nama yang dinormalisasi yang sama.
4.  Tambah ujian di bawah `tests/unit/` (contoh sedia ada:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` antara ujian untuk bermula dari keadaan yang diketahui.
Luluskan `{ registerDefaults: false }` untuk bermula dengan pendaftar kosong dan
daftar hanya pengawal yang sedang diuji. Vision Bridge menerima suntikan kebergantungan
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge mendedahkan sambungan yang setara untuk tetapan, keupayaan, pemilihan model STT, semakan kelayakan, dan transkripsi. Ujian oleh itu boleh melaksanakan kedua-dua aliran tanpa akses DB atau rangkaian.

## Lihat Juga

- `src/lib/guardrails/` — pelaksanaan
- `src/shared/utils/inputSanitizer.ts` — pengesan kongsi yang menggerakkan
  suntikan prompt dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — lalai Vision Bridge dan
  senarai model jambatan paksa
- `src/shared/constants/modalityBridgeDefaults.ts` — lalai masa jalan Vision/Audio kongsi
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogonal (pemutus litar, penyejukan)
- `docs/reference/ENVIRONMENT.md` — rujukan pemboleh ubah persekitaran penuh

## Liputan laluan pengawal suntikan & pasukan merah (Fasa 8 · Blok D)

Pengawal suntikan (`createInjectionGuard` / `withInjectionGuard`) meliputi semua laluan
yang menerima prompt pengguna. Ia menghormati `INJECTION_GUARD_MODE` (lalai `warn` = log sahaja;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis            | Laluan                                                                                                                                               | Mod lalai |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| Teks (sedia ada) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| Generatif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

Pengekstrakan teks (`extractMessageContents`) meliputi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Pasukan merah (malam, `nightly-llm-security.yml`):** promptfoo mengesahkan bahawa setiap laluan menyekat
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan probe (melangkau tanpa rahsia).
`moderations` disertakan untuk konsistensi — pengendali dalam mod sekat boleh mengecualikannya melalui
`resolveDisabledGuardrails`.

Aliran kerja malam (`.github/workflows/nightly-llm-security.yml`, cron + penghantaran manual) mempunyai dua tugas:

- **`promptfoo-guard` (menyekat)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kes adversari (cth. "abaikan semua
  arahan sebelumnya...", jailbreak gaya DAN) menegaskan bahawa respons membawa
  `error.code === "SECURITY_001"`, iaitu pengawal sebenarnya menolak permintaan tersebut.
- **`garak` (nasihat)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instans OmniRoute tempatan (`http://localhost:20128/v1`). Terkawal oleh
  rahsia pembekal (`PROMPTFOO_PROVIDER_KEY`); melangkau dengan lancar dan diakhiri
  `|| true`, jadi ia melaporkan tanpa menyebabkan CI gagal.

Liputan pembantu pengawal (`createInjectionGuard` / `withInjectionGuard`)
merangkumi setiap laluan `/v1` yang membawa prompt; teks prompt ditarik dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` dalam `src/shared/utils/inputSanitizer.ts`.
