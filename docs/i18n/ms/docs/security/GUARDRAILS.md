# Guardrails (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber kebenaran:** `src/lib/guardrails/`
> **Kemas kini terakhir:** 2026-10-17 — v3.8.52 (menambah [Liputan dan had](#coverage-and-limits):
> laluan dan laluan respons mana yang dicapai oleh cangkuk, pengepala pelumpuhan yang
> digabungkan (#16412), mod sekatan suntikan sebagai sempadan mandatori (#16413), dan apa
> yang melihat respons sebelum post-call)

Guardrails menguatkuasakan transformasi keselamatan, dasar, dan kandungan di sempadan
antara OmniRoute dan pembekal hulu. Setiap guardrail boleh memeriksa (dan secara pilihan
menolak, mengubah, atau menganotasi) beban data permintaan (`preCall`) dan respons hulu
(`postCall`).

Sistem ini bersifat **fail-open**: jika sesebuah guardrail melontarkan ralat semasa
pelaksanaan, registri merekodkan ralat tersebut dan meneruskan dengan guardrail seterusnya
daripada menggagalkan permintaan itu. Sekatan adalah keputusan eksplisit (`block: true`),
tidak pernah berlaku secara tidak sengaja. Satu-satunya pengecualian ialah permintaan yang
dibatalkan: apabila `signal` pemanggil dibatalkan, guardrail yang melontarkan ralat akan
menolak larian cangkuk dan bukannya dilangkau.

Cangkuk ini **tidak** dijalankan pada setiap laluan atau setiap respons. Baca
[Liputan dan had](#coverage-and-limits) sebelum bergantung pada guardrail sebagai kawalan
keselamatan.

## Guardrail Terbina Dalam

Registri memuatkan enam guardrail secara automatik mengikut susunan keutamaan semasa
import (lihat `registry.ts` → `registerDefaultGuardrails()`):

| Keutamaan | Nama                | Peringkat      | Fail                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nombor keutamaan yang lebih rendah dijalankan **terlebih dahulu**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Model asas GLM 5.3 dan `glm-5.3-{low,high,max}` mempunyai metadata registri/spesifikasi
`supportsVision:false` yang eksplisit. Varian GLM 5.3 Flash kekal sebagai model penglihatan
asli. Laluan `/v1/messages` Claude Code memasuki rantai guardrail pra-panggilan `handleChat`
yang dikongsi **sebelum** terjemahan Claude-ke-OpenAI; imej hasil alat `Read` yang tersarang
mesti diterangkan atau dikendalikan sebelum terjemahan itu mengangkatnya ke dalam kandungan
`image_url` OpenAI (#17069).

Memintas permintaan yang membawa imej yang ditujukan kepada **model bukan penglihatan** dan
sama ada menghala semula keseluruhan permintaan kepada model berkemampuan penglihatan atau
menggantikan bahagian imej dengan penerangan teks yang dihasilkan oleh model penglihatan
boleh konfigurasi sebelum panggilan hulu. Ini membolehkan pembekal teks sahaja mengendalikan
beban data multimod secara telus.

Aliran:

1. Langkau jika model sasaran sudah menyokong penglihatan (melainkan ia muncul dalam
   senarai jambatan paksa `isVisionBridgeForcedModel`).
2. Ekstrak bahagian imej melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mewakilkan kepada **pengesan media bersatu**
   `detectMediaParts()` dalam `open-sse/utils/mediaParts.ts` — sumber kebenaran tunggal
   yang dikongsi dengan penapis keserasian kombo. Pengekstrakan disenaraibenarkan kepada
   bentuk-bentuk yang `replaceImageParts` boleh sisipkan semula (kontrak ekstrak↔ganti):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, dan Responses API `input_image`. Imej yang sepadan tersarang di
   dalam `tool_result.content` Claude Code dan output alat Responses turut diekstrak dan
   digantikan pada laluan asalnya; bentuk penunjuk sahaja adalah bahan penapis kombo dan
   tidak diekstrak. Langkau jika tiada ditemui.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kunci tetapan `modalityBridge*`
   baharu diutamakan; kunci `visionBridge*` warisan kekal sebagai **sandaran satu
   kitaran** (tetingkap rollback). Langkau sebelum sebarang rentasan media apabila
   jambatan dilumpuhkan.
4. Pemilih mod (`modalityBridgeVisionMode`, lihat jadual di bawah) memutuskan antara hala
   semula dan terang. Hala semula mengembalikan `modifiedPayload` dengan hanya `model`
   ditukar, bersama meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Laluan terang: hadkan imej pada `maxImages`, gubah prompt peka tugas, rujuk cache
   terang, panggil model penglihatan **secara selari** (`Promise.allSettled`), dan suntik
   bahagian teks `[Image N]: <description>` di tempatnya. Terang yang gagal menghasilkan
   `null`: imej mentah dikekalkan untuk sasaran yang tidak diketahui/berkemampuan
   penglihatan (#4012), tetapi **sasaran langsung teks sahaja yang disahkan** atau kombo
   tanpa penglihatan menerima stub teks eksplisit
   `(unavailable — no vision-capable provider connected)` untuk setiap imej yang tidak
   diterangkan, termasuk kegagalan separa dan imej yang melebihi had panggilan terang
   (#17069). Sandaran terang kombo semua-gagal sedia ada kekal di tempatnya (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mod (`modalityBridgeVisionMode`)

| Mod        | Lalai | Tingkah laku                                                                                                                                                                                                                                                                                                  |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Heuristik legasi, tidak diusik (#6640/#7204): model bukan-kombo/`auto/` di-reroute ke model penglihatan terbaik melainkan model asal sudah mempunyai kelayakan yang boleh digunakan (kemudian describe); sasaran kombo sentiasa describe.                                                                     |
| `describe` |       | Sentiasa describe — blok reroute dilangkau sepenuhnya; model pilihan pengguna sentiasa menjawab.                                                                                                                                                                                                              |
| `reroute`  |       | Paksa reroute: pengawal kekalkan-model-berkelayakan dipintas. Pengawal kelayakan **sasaran** reroute masih terpakai — apabila tiada sasaran penglihatan yang boleh digunakan wujud, bridge menyekat dengan ralat yang jelas berbanding melakukan describe atau menghantar imej mentah ke sasaran teks sahaja. |

Mod paksa memintas litar **sebelum** heuristik auto dijalankan; tingkah laku `auto`
adalah identik sebait dengan guardrail pra-PR-1.

#### Skop kunci API (`visionBridgeKeyScope.ts`)

Apabila kunci API pemanggil menyekat `allowedConnections`, kelompok kuota
(`allowedQuotas`) atau model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge hanya
memilih model reroute dan describe yang boleh digunakan oleh kunci itu, pada
sambungan yang boleh digunakan oleh kunci itu. Panggilan describe kemudiannya
sentiasa melalui self-loop OmniRoute dengan pengepala
`x-omniroute-self-loop-key-id`, supaya permintaan chat yang menerima
menguatkuasakan semula dasar sambungan dan model bagi kunci itu.
`enforceApiKeyPolicy()` menghormati pengepala itu hanya bersama bearer
self-loop, jadi ia hanya boleh menyempitkan akses, dan id yang tidak dapat
diresolusi akan ditolak.

Jika tiada model penglihatan yang dibenarkan untuk kunci itu, **sasaran teks
sahaja yang disahkan** menolak permintaan imej secara setempat dengan HTTP 400
yang jelas berbanding memajukan bait imej ke upstream yang tidak berkeupayaan
(#17069). Untuk sasaran dengan keupayaan penglihatan yang tidak diketahui atau
natif, laluan describe mengekalkan tingkah laku fail-open sebelumnya (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Permintaan tanpa
kunci, dan kunci tanpa sekatan ini, berkelakuan sama persis seperti sebelumnya.

#### Prompt describe sedar-tugas (`modalityBridgeVisionTaskAware`)

Lalai **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) melampirkan
teks **mesej pengguna terakhir** (dipenggal kepada 500 aksara) pada prompt
describe asas, mengemudikan penerangan ke arah apa yang sebenarnya ditanya oleh
pengguna (corak codex-vision-proxy) dan meminta model penglihatan
mentranskripsikan teks yang kelihatan. Dengan bendera dimatikan — atau tiada
teks pengguna — prompt asas digunakan tanpa perubahan.

Permintaan serasi-OpenAI milik self-loop describe itu sendiri
(`callVisionModelSingle()` dalam `visionBridgeHelpers.ts`) sentiasa meminta
`image_url.detail: "high"` — tanpa syarat, untuk setiap pemanggil/pembekal,
tidak terikat pada sebarang isyarat klien. Pensampelan butiran rendah
merendahkan ketepatan OCR tepat untuk tugas transkripsi teks yang diminta oleh
prompt ini, jadi panggilan describe itu sendiri sentiasa meminta butiran tinggi
tanpa mengira tahap butiran yang digunakan oleh permintaan masuk asal. Ini
hanya menjejaskan badan permintaan describe dalaman; ia tidak mengubah cara
OmniRoute memajukan `image_url.detail` milik pemanggil sendiri pada permintaan
utama — lalai itu digunakan secara berasingan, dan hanya untuk klien OpenCode
yang dikesan, dalam `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Cawangan format-wayar Anthropic
bagi self-loop describe tidak mempunyai medan `detail` dan tidak terjejas oleh
mana-mana satu lalai.

#### Had output describe (`modalityBridgeVisionMaxChars`)

| Kunci                          | Lalai | Julat              |
| ------------------------------ | ----- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`   | `0` atau 100–50000 |

`0` (lalai) bermaksud **tiada had** — penerangan yang dikembalikan oleh
`callVisionModel()` disalurkan tanpa pengubahsuaian, mengekalkan tingkah laku
sedia ada. Sebarang nilai dalam julat 100–50000 memenggal penerangan dengan
akhiran `…` sebelum ia disambung semula sebagai `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` dalam `src/lib/guardrails/visionBridge.ts`).
Naikkan nilai ini untuk tugas OCR yang padat dengan butiran di mana model
hiliran memerlukan transkripsi penuh; rendahkan ia untuk mengehadkan penggunaan
token pada model penglihatan yang banyak bercakap. Medan papan pemuka terletak
pada panel Advanced di tab Vision (`modality-bridge-max-chars` dalam
`ModalityBridgeVisionTab.tsx`) dan mengetap sebarang nilai antara 1 dan 99 naik
ke paras minimum 100 sambil membiarkan `0` yang eksplisit tidak diusik — `0`
ialah nilai Zod yang sah dengan sendirinya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan
sekadar lalai "belum ditetapkan".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam ingatan untuk output describe, dikongsi di seluruh
proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
dengan pembingkaian awalan-panjang (tiada perlanggaran sempadan-medan).
Komponen model ialah model bridge yang **dikonfigurasikan**, bukan model yang
sebenarnya menjawab — `callVisionModel` mungkin melakukan fallback secara
dalaman, dan penguncian mengikut percubaan akan memecahkan cache. Describe yang
gagal tidak pernah dicachekan. Tetapan:

| Kunci                           | Lalai  | Julat   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Penormalan imej jarak jauh (fetch describe/base64 gelung diri)

Apabila bridge mengambil sendiri imej **jarak jauh** — panggilan sendiri describe Anthropic dan penukaran base64 format-wayar-claude
(`ensureBase64ImagesForClaudeWire`), kedua-duanya melalui
`fetchRemoteImageAsDataUri()` dalam `visionBridgeHelpers.ts` — URI data yang terhasil dihantar melalui `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sebelum dibenamkan dalam permintaan model visi. Imej yang terlalu besar diperkecilkan kepada **sisi panjang 2048px** (menyamai had ubah saiz yang telah diterapkan oleh OpenAI/Anthropic di sisi pelayan), yang mengurangkan bait/kependaman muat naik tanpa mengubah apa yang dilihat oleh model visi. Pengubahan saiz menggunakan `sharp`, dimuatkan melalui import dinamik: pada platform di mana binari aslinya gagal dimuatkan, `normalizeDataUri()` **tidak pernah melontarkan pengecualian** — ia kembali kepada passthrough bait asal, jadi laluan describe/penukaran-base64 sentiasa terus berfungsi. Bait bukan imej (fetch yang tidak mengembalikan imej yang boleh dinyahkod) turut diluluskan tanpa diubah. Penormalan ini terhad kepada imej yang diambil bridge untuk panggilan sendirinya — ia tidak pernah digunakan pada payload passthrough mentah pemanggil, selaras dengan prinsip mutasi opt-in sahaja (Peraturan Keras #20).

#### Skema tetapan + migrasi

Kunci `modalityBridge*` baharu disahkan Zod dalam `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan
kumpulan `modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi
`141_modality_bridge_settings.sql` menyalin nilai legasi
`visionBridge*` sedia ada ke kunci baharu yang sepadan (idempon, tidak pernah menulis ganti nilai `modalityBridge*` yang ditetapkan operator); kunci legasi kekal diterima sebagai fallback bacaan untuk satu kitaran keluaran.

#### Pengepala ketelusan + statistik

Respons yang diubah suai describe membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibina oleh `buildModalityBridgeHeader()` dalam `modalityBridge/bridgeStats.ts`,
dicap oleh `withModalityBridgeHeader()` dalam `src/sse/handlers/chatHelpers.ts`).
Permintaan yang dilalukan semula **tidak** menerima sebarang pengepala — payload tidak disentuh dan pertukaran model sudah kelihatan dalam medan `model` pada badan respons.

`GET /api/modality-bridge/stats` (pengesahan pengurusan, tahap yang sama seperti
`GET /api/settings`) mengembalikan pembilang per-modalti dalam ingatan
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percubaan, sebagai penyebutnya; operasi tanpa pemasaan tidak mengada-adakan sampel sifar milisaat. `bridged` kekal sebagai alias serasi ke belakang untuk penukaran yang berjaya; percubaan gagal tidak menambahkannya.
Pembilang diset semula apabila proses dimulakan semula mengikut reka bentuk
(telemetri, bukan perakaunan).

#### Konfigurasi papan pemuka

Halaman papan pemuka khusus ialah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`, dan `Video` yang boleh dialamatkan melalui URL mengekalkan parameter pertanyaan semasa menukar nilai `tab`.
Tab Vision mendedahkan pengaktifan, mod, pemilihan model (termasuk lalai automatik), penggesaan sedar tugas, had tamat masa/imej/panjang penerangan/cache lanjutan, pembilang runtime, dan permintaan contoh yang dilindungi. Tab Audio juga telah aktif: ia mendedahkan pengaktifan, pemilih model khusus STT dengan Auto, had tamat masa/klip maksimum, pembilang audio, dan ujian contoh `input_audio`. Tab Video turut berfungsi: ia melaporkan keadaan runtime FFmpeg/ffprobe — salah satu daripada empat keadaan UI eksplisit (`unknown` semasa prob sedang berjalan atau tidak dapat disiapkan, `restricted` pada hos papan pemuka bukan gelung balik di mana prob dilangkau di sisi klien, `unavailable` setelah diprob dan disahkan tiada, atau `available` bersama versi FFmpeg/ffprobe) — mengekalkan had pengaktifan/model/bingkai/video/tamat masa, menapis pemilih model kepada model berkeupayaan visi, dan mendedahkan pembilang video.

Kad Vision Bridge terdahulu di bawah tetapan AI kini menjadi pautan keserasian ke halaman baharu; ia tidak lagi memiliki salinan kedua borang tersebut. Media Providers turut memautkan aliran kerja Image-to-Text dan Speech-to-Text ke tab Modality Bridge yang sepadan tanpa mengalih keluar kawasan uji cuba Speech-to-Text sedia ada.

**Pintasan kemasukan gelung diri:** apabila panggilan describe dirutkan melalui gelung diri `/v1` OmniRoute sendiri (model pembekal bukan standard), sub-permintaan menghantar
`x-omniroute-admission-bypass: internal` dan disahkan dengan kredential gelung diri yang diselesaikan — sentinel `sk_omniroute` setempat dalam mod setempat, atau kunci env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang dikonfigurasi operator (#1350) supaya penyebaran `REQUIRE_API_KEY=true` masih boleh menjalankan panggilan describe. Pintasan ini hanya dihormati untuk kredential tepat tersebut, jadi klien luaran tidak boleh menggunakan pengepala itu untuk melangkau kemasukan.

Lalai legasi terletak dalam `src/shared/constants/visionBridgeDefaults.ts`; lalai mod/sedar-tugas/cache baharu dan penyelesai tetapan terletak dalam
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail mendedahkan pilihan pembina `deps` supaya ujian dapat menyuntik pelaksanaan `getSettings` dan
`callVisionModel` palsu.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Memintas permintaan sembang yang mengandungi audio sebelum ia mencapai sasaran yang tidak diketahui menerima input audio. Ia tidak pernah melalukan semula permintaan sembang: bahagian audio ditranskripsikan melalui titik hujung multipart serasi OpenAI sedia ada dan model sembang yang dipilih meneruskan dengan transkrip teks.

Aliran:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata daftar penyedia eksplisit diutamakan, kemudian metadata model statik, kemudian `modalities_input` yang disegerakkan. Senarai input yang diisytiharkan tanpa `audio` ialah `false`; tiada bukti keupayaan kekal `null`. Kedua-dua `false` dan `null` mengaktifkan jambatan konservatif, manakala `true` memintasnya.
2. Selesaikan tetapan `modalityBridgeAudio*` dan ekstrak bahagian audio peringkat atasan yang boleh dicantumkan daripada setiap mesej melalui pengesan kongsi `detectMediaParts()`. Bentuk wayar yang disokong ialah OpenAI `input_audio`, `audio_url`, dan `source.media_type: "audio/*"`. Audio bersarang dikesan untuk penghalaan tetapi tidak dibuang oleh laluan pencantuman. Kerja dihadkan oleh `modalityBridgeAudioMaxClips`; bahagian kemudiannya kekal tidak diusik.
3. Hormati `provider/model` yang dikonfigurasikan, atau biarkan `selectAudioBridgeModel()` menelusuri `AUDIO_TRANSCRIPTION_PROVIDERS` mengikut susunan katalog yang stabil dan memilih model pertama dengan kelayakan penyedia aktif yang boleh digunakan.
4. `callAudioTranscription()` menukarkan audio base64/data-URI kepada `file` multipart, atau memuat turun `audio_url` jauh melalui pengawal keluar khusus awam dengan DNS pinning dan had 25 MB. Ia kemudian menghantar POST fail dan model terpilih ke gelung kendiri tempatan `/v1/audio/transcriptions`, disahkan dengan `resolveSelfLoopBearer()`. Laluan transkripsi sedia ada melakukan pencarian kelayakan biasa, pengendalian cooldown/had kadar, dan penghantaran ke penyedia.
5. Panggilan yang berjaya menggantikan bahagiannya dengan `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`: kegagalan individu mengekalkan bahagian audio asal tersebut (kontrak #4012). Jika setiap panggilan gagal dan sasaran terbukti `supportsAudio === false`, bahagian tersebut menjadi `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk sasaran yang tidak diketahui (`null`), hasil semua-gagal kekal tidak diusik. Sasaran teks sahaja yang terbukti tanpa kelayakan STT yang boleh digunakan menerima stub eksplisit yang sama tanpa mengeluarkan panggilan rangkaian.

Transkrip yang berjaya menggunakan cache LRU/TTL Jambatan Modaliti seluruh proses. Kuncinya menggabungkan rujukan audio, label operasi `audio-transcription` yang stabil, dan model STT terpilih; kegagalan tidak pernah dicachekan. Percubaan audio mengemas kini pembilang kongsi `bridged`, `cacheHits`, `failures`, dan `lastUsedAt`. Respons yang diubah membawa `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan yang tidak diusik tidak menerima segmen Jambatan Audio.

Tetapan masa jalan disokong DB dan disahkan Zod:

| Kekunci                       | Lalai   | Julat            |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Cache kongsi kekal dikawal oleh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Jambatan Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Memintas bahagian video peringkat atasan dalam `messages` Chat Completions dan `input` Responses API sebelum sasaran tanpa sokongan video asli yang diketahui dipanggil. Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`, URL HTTPS, dan URI data `data:video/*;base64,...`. Nama fail biasa dalam teks tidak dianggap sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki penelusuran permintaan, semakan keupayaan/dasar, pengagregatan setiap permintaan, dan muatan respons. Kerja setiap video — pemerolehan, cache hasil keseluruhan, penerangan jujukan bingkai (yang menggabungkan mana-mana transkrip audio yang diisytiharkan pemanggil), dan metrik/batal/bersih setiap percubaan — disembunyikan di sebalik `processVideoPart` dalam `videoBridgePipeline.ts`, dipanggil sekali bagi setiap bahagian video di dalam gelung `preCall`. Modul itu juga mentakrifkan sempadan port eksplisit `VideoMediaBrokerPort` (memperoleh bait dan mengekstrak bingkai sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang diisytiharkan pemanggil dengan kapsyen sampel), dan `VideoDrilldownPort` (sempadan kekekalan drill-down bingkai; belum disambungkan ke `processVideoPart` — hanya laluan berasingan `/api/modality-bridge/video/drilldown` yang menulis entri drill-down pada masa ini).

Laluan permintaan awam `/v1` tidak pernah mengimport atau memanggil subproses. Video jauh dimuat turun di bawah had 50 MiB; video base64 sebaris mempunyai had ternyahkod konservatif 36 MiB setiap video supaya sampul model/mesej/pembingkaian boleh kekal di dalam had kemasukan permintaan JSON awam sebanyak 50 MiB. Anggaran panjang sebaris dan saiz ternyahkod disemak sebelum peruntukan. HTTPS diperlukan pada URL jauh awal dan setiap ubah hala, menggunakan pengawal keluar khusus awam sedia ada dengan DNS pinning. Bait kemudian melintasi sempadan broker dalaman yang tepat `POST /api/modality-bridge/video/extract`. Laluan itu adalah kedua-duanya `LOCAL_ONLY` dan `SPAWN_CAPABLE`, menerima hanya permintaan loopback dipercayai yang disahkan setiap proses, dan tidak pernah menerima URL, laluan sistem fail, boleh laku, atau senarai hujah. Pipeline saiz badan API dan pembaca badan berperingkat pengendali secara bebas menguatkuasakan had input broker 50 MiB. Giliran terbatasnya menjalankan satu pengekstrakan pada satu masa, membenarkan empat kerja tertangguh, dan menghadkan input tertangguh pada 100 MiB.

Di dalam broker, `ffprobe` membaca fail tempatan peribadi; senarai benar format tetap mengecualikan format senarai main dan manifes. Bagi kontena keluarga MOV yang dibenarkan, rujukan data MOV luaran kekal dilumpuhkan secara lalai, dan perintah tetap tidak memilih untuk menggunakannya. Kedua-dua `ffprobe` dan `ffmpeg` menggunakan senarai putih protokol `file` sahaja, satu thread, tatasusunan argumen tetap, tiada shell, dan boleh laku yang diselesaikan daripada `PATH`. Strim kulit gambar terlampir bukan calon boleh main. Semua strim boleh main mesti mematuhi had, dan strim lalai eksplisit diutamakan sebelum sandaran indeks terendah berketentuan. Video dihadkan kepada 600 saat, 8,192 piksel setiap dimensi, dan 33,554,432 piksel sumber. FFmpeg mengambil sampel 1–16 bingkai JPEG titik tengah, mengecilkan tepi panjang kepada maksimum 1,024 piksel tanpa menaikkan skala input yang lebih kecil, dan tidak pernah menerima URL. Pensampelan adalah `uniform` secara lalai. Dasar `scene_aware` pilihan dan `segment_aware` eksperimen melakukan satu laluan FFmpeg tetap tambahan ke atas strim tempatan yang telah disahkan, memilih cap masa babak `showinfo` yang terhad, dan kembali secara berketentuan kepada titik tengah seragam yang sama apabila pengesan gagal, tamat masa, output cacat, atau set calon kosong. Mod sedar segmen memperuntukkan sampel titik tengah secara berkadar dengan selang babak yang disahkan; bukti sedar segmen dan tingkah laku sandaran diperincikan di bawah. Had tegar 16 bingkai dikenakan selepas pemilihan dalam setiap dasar. Apabila permintaan sedar babak hanya mempunyai bajet satu bingkai, ia menggunakan titik tengah seragam bagi tetingkap video penuh atau fokus yang aktif dan melaporkan `policyEffective: uniform`: satu bingkai babak terpilih tidak dapat mengekalkan kedua-dua hujung temporal. Pemanggil boleh secara pilihan menyediakan tetingkap fokus terhingga (`start`/`end` saat); sempadan diapit kepada tempoh media, tetingkap terbalik atau tidak terhingga ditolak, dan semua dasar pensampelan dilakukan hanya di dalam selang yang dinormalkan. Tetingkap yang terhasil disertakan dalam metadata pensampelan dan dalam awalan penerangan tidak dipercayai supaya model hilir dapat membezakan petikan berfokus daripada garis masa penuh.

Fokus kapsyen semantik ialah tetapan eksplisit yang berasingan. Mod analisis `full` lalai mengekalkan gesaan bingkai sedia ada dan tidak pernah memajukan teks permintaan kepada model kapsyen. Dalam mod `focused`, jambatan hanya membaca `text`/`input_text` yang ditulis pengguna, tidak kosong dan terkini daripada kontena Chat atau Responses yang sama, menormalkannya kepada NFC, merapatkan aksara kawalan dan ruang putih, serta menghadkannya kepada 500 titik kod Unicode. Hasil kosong kembali kepada gesaan `full` yang tepat. Petunjuk yang boleh digunakan disirikan sebagai JSON dalam blok konteks pengguna tidak dipercayai khusus dan hanya boleh mengutamakan butiran yang dapat diperhatikan; ia tidak boleh mengatasi amaran berasingan terhadap mengikut arahan yang kelihatan atau kedengaran dalam media. Fokus teks tidak pernah menyimpulkan `start`/`end` atau mengubah pensampel temporal.

#### Bukti segmen struktur FU-07

`segment_aware` menggunakan satu laluan pra-analisis terhad ke atas strim video tempatan yang telah disahkan. Rantai penapis tetap mula-mula menskalakan kepada maksimum 320 piksel lebar, mengesan perubahan babak dan selang beku, kemudian mengambil sampel pada 1 bingkai sesaat untuk kekaburan, luma purata, dan maklumat keruangan/temporal. Laluan ini dihadkan kepada 600 sampel struktur, satu thread FFmpeg/penapis, senarai benar protokol `file` sahaja dan kontena yang sama, had output proses 1 MiB, dan maksimum 30 saat di dalam abort/had masa kongsi broker. Ia tidak pernah menerima perintah, penapis, laluan, atau URL daripada permintaan.

Nilai struktur ialah bukti pensampelan berketentuan, bukan pemahaman video semantik. Nilai-nilai ini tidak menyimpulkan subjek, tindakan, kapsyen, pertuturan, atau niat pengguna. Sempadan babak dan beku membentuk segmen; liputan beku, kekaburan, pendedahan, butiran keruangan, dan perubahan temporal hanya mempengaruhi cara bajet bingkai 1–16 sedia ada diperuntukkan. Segmen yang beku sepenuhnya dihadkan kepada satu bingkai, manakala segmen tidak beku bersaing untuk baki bajet. Apabila sempadan melebihi bilangan bingkai, liputan garis masa seragam dikekalkan supaya potongan awal yang pantas tidak dapat menyembunyikan segmen ekor yang panjang. Sempadan babak dalam resolusi analisis 1 saat bagi sempadan beku digabungkan.

Penapis hilang, bukti cacat/kosong, ralat pengesan, atau tamat masa pra-analisis terhad gagal terbuka kepada dasar titik tengah seragam yang tepat. Abort pemanggil atau had masa broker tidak gagal terbuka: ia menamatkan subproses yang sedang berjalan, menghalang pengekstrakan bingkai seterusnya, dan pepohon sementara peribadi dialih keluar dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menjana fixture FFmpeg sebenar berketentuan untuk penjimatan panggilan kapsyen pasca-dedup, peruntukan bajet gerakan padat, bukti kekaburan/pendedahan/SI-TI, potongan pantas dengan ekor panjang, dan positif palsu pudar beransur. Ia merekodkan masa dinding pra-analisis dan, di mana `/usr/bin/time` tersedia, CPU anak dan RSS puncak. Semakan kualitinya ialah orakel struktur sahaja. Kualiti model kapsyen sebenar kekal `HOLD` kerana harness ini tiada titik akhir yang dibenarkan atau hakim beku. Penjimatan kewangan juga kekal `HOLD` melainkan `--caption-cost-per-call-usd` membekalkan anggaran positif eksplisit setiap panggilan; skrip tidak pernah merekayasa mana-mana hasil.

Setiap bingkai dihadkan kepada 4 MiB, semua bingkai mentah secara keseluruhan kepada 23 MiB, dan respons broker yang disirikan kepada 32 MiB. Direktori sementara peribadi dibuang dalam `finally`. OmniRoute tidak menyertakan FFmpeg dan tidak menerima laluan boleh laku tersuai. Sebelum pengekapsyenan, jambatan melaksanakan laluan penyahpenduaan visual yang konservatif: setiap JPEG dikecilkan kepada buffer skala kelabu 16×16 dan dibandingkan hanya dengan bingkai terakhir yang dikekalkan. Untuk bajet kapsyen yang diminta melebihi satu bingkai, pengekstrakan membekalkan kumpulan calon terhad sehingga dua kali ganda bajet itu dan tidak pernah lebih daripada 16 bingkai. Had yang diminta dikenakan hanya selepas penyahpenduaan, dengan calon terpilih pertama dan terakhir dikekalkan semasa penipisan akhir apabila bajet sekurang-kurangnya dua. Dasar berversi `grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta luma min dan nisbah sel imej kenit yang delta ternormalnya sekurang-kurangnya 0.05. Ambang pendua ialah pemalar 0.04, dipilih demi kebolehjangkaan dan bukannya didedahkan sebagai tetapan runtime. Isyarat kontras tinggi sekunder ini mengekalkan gerakan kecil dan perubahan teks yang kelihatan yang mungkin tersembunyi dalam perbandingan min sahaja. Ralat pembanding atau penyahkod akan gagal terbuka dan mengekalkan liputan. Metadata output memisahkan calon yang diekstrak, bingkai yang berjaya digunakan, dan pendua visual yang digugurkan.

Bahagian video yang ditandakan secara eksplisit boleh meminta helaian sentuh bercap masa. Jambatan membina grid JPEG maksimum 4 lajur dan 16 bingkai. Setiap sel 512 piksel membakar cap masa sumbernya ke dalam jalur bawah berkontras tinggi, manakala cap masa yang sama kekal dalam metadata teks untuk pengaitan hiliran dan audit. JPEG lengkap kekal dihadkan pada 32 MiB. Jika `sharp` tidak dapat menyahkod atau menggubah grid, jambatan beralih kembali kepada bingkai JPEG individu; pembatalan klien masih disebarkan melalui operasi helaian.

Bukti promosi sengaja diasingkan daripada mikropenanda aras komposisi sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan abah-abah A/B berversi skema untuk model penglihatan serasi OpenAI yang sebenar. Ia mengukur token yang dilaporkan penyedia, latensi masa dinding hujung ke hujung (termasuk komposisi helaian), bilangan panggilan model, dan pengekalan fakta yang ditakrifkan manifes. Respons model mentah tidak ditulis ke dalam laporan; hanya cernaan SHA-256 dan ID fakta yang sepadan dikekalkan. Abah-abah tidak membuat panggilan rangkaian atau model berbayar melainkan `--execute-real` diberikan dan `--model`, `OMNIROUTE_BASE_URL`, serta `OMNIROUTE_API_KEY` dikonfigurasikan. Tanpa larian sebenar yang eksplisit itu, keputusan boleh baca mesinnya kekal `HOLD`; pengukuran muatan/bilangan panggilan sintetik sahaja bukan bukti promosi.

Pemanggil boleh melampirkan tatasusunan `transcript.cues` pilihan pada bahagian video yang disokong apabila mereka sudah memiliki teks yang dijajarkan. Setiap cue mesti membawa `text`, selang `start`/`end` yang terhingga dalam tempoh yang diperiksa, dan `source` yang disenaraiputihkan (`client`, `embedded`, atau `audio-bridge`); `confidence` bernilai lalai `1` dan mesti kekal antara `0` dan `1`. Cue pendua tepat digabungkan. OmniRoute tidak pernah memulakan transkripsi daripada metadata ini: cue yang disahkan disalin ke dalam hasil yang diterangkan bersama sumber, keyakinan, dan selang, serta dipaparkan sebagai pemerhatian tidak dipercayai di samping kapsyen bingkai. Teks yang tidak sah, di luar julat, atau tanpa provenans ditolak dan bukannya dicampurkan ke dalam aliran kapsyen. Kedua-dua saluran transkrip badan permintaan menormalkan provenans yang dibekalkan kepada `client`, termasuk label `embedded` atau `audio-bridge` yang didakwa sendiri. Hanya penyesuai milik pelayan boleh memberikan label dipercayai itu melalui argumen `trustedSource` khusus kod; medan JSON permintaan tidak dapat mencapai argumen itu. Teks transkrip kekal sebagai kandungan terbitan media yang tidak dipercayai, tanpa mengira provenansnya, dan tidak boleh sekali-kali menentukan kebenaran.

Pemanggil lanjutan boleh menyediakan trek `audioTranscript` untuk video yang sama; ia dianggap sebagai teks yang dibekalkan klien, bukan bukti transkripsi pelayan. Sendi penggabungan menjalankan pemerhatian visual dan audio di bawah satu had masa dan isyarat pembatalan, menyusunnya pada garis masa sepunya, menggabungkan pendua tepat, dan melaporkan hasil separa apabila hanya satu pihak berjaya. `audioTranscript` yang tidak sah merosot kepada hasil separa itu — penerangan visual dikekalkan dan cabang audio merekodkan kod kegagalan yang disanitasi — dan bukannya menggagalkan keseluruhan video. Ketersediaan setiap cabang, bendera separa, dan kod kegagalan yang disanitasi dikekalkan dalam hasil yang diterangkan, dalam metadata pagar pelindung (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam pembilang penggabungan jambatan. Laluan Video Bridge lalai tidak memanggil pertuturan-ke-teks atau memuat turun salinan media kedua; tanpa trek eksplisit itu, ia kekal khusus video sahaja.

**Pengekalan transkrip (#12150 P1).** Ini terpakai secara automatik apabila
Video Bridge (yang penggunaannya sendiri perlu didayakan) memaparkan kiu transkrip — tiada
bendera pengekalan yang berasingan. Apabila permintaan memaparkan sebarang kiu transkrip (`transcript`
yang diisytiharkan oleh pemanggil atau `audioTranscript` yang digabungkan), mekanisme pengadang menandakannya sebagai
`videoBridgeObserved` dan menghasilkan salinan bayang tersunting bagi perihalan video —
paparan serupa yang menggantikan kandungan teks bebas setiap kiu dengan
`[redacted-video-transcript]`, yang dibina dengan menggantikan medan kiu berstruktur
sebelum rentetan dipasang (tidak sekali-kali dengan menghuraikan teks yang telah diratakan, supaya tiada kandungan
kiu — sama ada berniat jahat atau biasa, termasuk kandungan yang mengandungi `]` seperti
`[inaudible]`/`[music]` — boleh terselamat). Kandungan badan permintaan log panggilan yang disimpan menukar
setiap bahagian teks yang berasal daripada video dengan salinan bayang tersunting tersebut, yang dipadankan berdasarkan
kesamaan kandungan; penambat `fullText` dibaca semula daripada muatan mekanisme pengadang prapanggilan
yang telah lengkap, supaya padanan masih berjaya selepas mekanisme pengadang berantai berikutnya (penyamar PII dan
bukti kelayakan, keutamaan 10/95) menulis semula teks perihalan secara setempat dan
selepas penyuntikan gesaan sistem/serahan/memori membentuk semula tatasusunan mesej. Badan
yang dihantar kepada model tidak berubah. Permintaan yang diperhatikan juga tidak mengisi
sebarang Memory kekal (pengekstrakan yang berasal daripada permintaan dan respons dilangkau),
supaya balasan model itu sendiri tidak dapat menggemakan teks transkrip ke dalam Memory.

**Medan video mentah (#12430).** Apabila jambatan didayakan dan sokongan video natif tidak diketahui atau tiada, medan `transcript`/`audioTranscript` yang ditakrifkan turut mengaktifkan `videoBridgeObserved`, walaupun selepas kegagalan perihalan atau had `maxVideos`. `null` dan rentetan kosong dikira; medan yang tiada dan metadata bukan video tidak dikira. Salinan yang dikekalkan menyunting medan ini atau menggugurkan permintaan, manakala cache/Memory dipintas.

Pada laluan sandaran tersebut, kiu pemanggil yang sah menjadi bahagian `text`/`input_text`
yang disokong dan bukannya medan penyedia bukan standard. Kedua-dua trek yang dibekalkan oleh permintaan
kekal sebagai pemerhatian `client` yang tidak dipercayai, dengan amaran jelas bahawa video
tidak dihuraikan dan cap masa tidak disahkan terhadap media. Belanjawan sedia ada sebanyak
256 kiu/64 KiB secara keseluruhan dan bagi setiap kiu terpakai merentasi kedua-dua trek secara bersama;
cap masa mesti berada dalam had maksimum 600 saat broker dan sebarang tetingkap fokus
yang dibekalkan. Trek tidak sah dibuang, bukannya dimajukan sebagai teks sembarangan; trek
saudara yang sah masih boleh digunakan melainkan belanjawan gabungannya dilebihi. Medan null/kosong
tidak menambahkan teks. Tiada pengambilan media atau transkripsi ditambahkan oleh sandaran ini.
Medan sambungan transkrip dialih keluar daripada pembawa video sandaran serta objek
`video_url`/`source` miliknya. Senarai dibenarkan OpenAI pada penghantaran kekal ketat; pembawa video
natif yang tidak diketahui kekal tersedia dan sasaran diketahui yang hanya menyokong teks mengekalkan penanda selamat.
Salinan bayang penyuntingan berstruktur melindungi teks transkrip yang ditambahkan, manakala
permintaan asal milik pemanggil kekal tidak berubah. Sasaran yang menyokong video natif dan
jambatan yang dilumpuhkan mengekalkan tingkah laku pintasan sedia ada.

Salinan tambahan yang dikekalkan menggunakan isyarat permintaan diperhatikan yang sama. Petikan
permintaan klien mentah sebelum mekanisme pengadang, permintaan tertunda dalam memori dan log
permintaan ditolak awal menggantikan medan transkrip dalam bahagian video secara berstruktur;
gesaan rentetan yang disintesis oleh peringkat saluran paip dan serahan konteks disunting
pada singki badan permintaan yang disimpan. Penanda `video_content_removed` yang disimpan
menyebabkan penerusan `previous_response_id` gagal secara tertutup dan bukannya membina semula
teks yang sengaja dibuang. Jika permintaan yang diperhatikan kehilangan salinan bayang
penyuntingan bagi setiap bahagiannya sebelum pengelogan, atau walaupun hanya satu daripada beberapa salinan bayang video
gagal dipadankan selepas mutasi permintaan berikutnya, keseluruhan badan permintaan yang dikekalkan
digugurkan dan bukannya mengekalkan transkrip yang hanya disunting sebahagiannya.

Bagi permintaan yang diperhatikan, respons model mungkin memetik mana-mana bahagian
transkrip tanpa sempadan kiu berstruktur. Oleh itu, `responseBody` log panggilan
yang disimpan digantikan dengan penanda pengguguran; artifak saluran paip terperinci (yang boleh
merangkumi badan huluan/klien dan cebisan strim) tidak dikekalkan. Cache semantik,
idempoten dan main semula penaakulan memintas bacaan serta penulisan bagi permintaan tersebut.
Permintaan penyedia dan respons yang dapat dilihat oleh klien kekal tidak berubah. Bait keepalive awal
disalirkan keluar daripada penimbal sementara apabila artifak terperinci digugurkan.
Amaran EventStream Kiro yang cacat hanya melaporkan kiraan bait muatan, tidak sekali-kali
kandungannya atau ralat mentah penghurai JSON.
Ini tidak mendakwa bahawa setiap diagnostik penyedia/pemalam yang tidak berkaitan telah
diaudit; semakan singki kekal yang lebih luas dijejaki dalam #11658.

Kitar hayat dalaman `/api/modality-bridge/video/drilldown` ialah substrat cache
berasingan yang disahkan melalui gelung balik/token. Setiap operasi turut memerlukan ID prinsipal
legap yang kanonik. Sebelum pemanggil pengeluaran didayakan, ia mesti memperoleh
ID tersebut daripada penyewa yang disahkan dan tidak boleh sekali-kali memajukan nilai yang dipilih oleh
klien. Kekunci cache mengikat prinsipal tersebut kepada ID sesi dan rujukan video yang kanonik,
hanya menyimpan kekunci terbitan SHA-256 mereka, serta mengehadkan skop bacaan dan
pemadaman kepada prinsipal yang sama. Cache menyimpan paling banyak 16 bingkai JPEG terbitan
bagi setiap entri, meluputkannya selepas sepuluh minit dan menyokong bacaan `start`/`end`
terbatas atau pemadaman sesi secara jelas.

Setiap prinsipal dihadkan kepada 16 entri dan 64 MiB data JPEG kanonik. Had tersebut
tidak bergantung pada had global sebanyak 64 entri/256 MiB: tekanan kuota prinsipal
hanya menyingkirkan entri paling kurang digunakan baru-baru ini milik prinsipal tersebut sebelum
penyingkiran LRU global dipertimbangkan. Entri yang luput dibersihkan daripada perakaunan
prinsipal dan global ketika aktiviti cache, manakala pembatalan dan kegagalan pengesahan tidak
melakukan komit bagi penggantian separa.

Cache menolak Base64 bukan kanonikal, padding berlebihan, media bukan JPEG, JPEG yang cacat atau
terpenggal, dan JPEG yang menghasilkan amaran semasa penyahkodan `sharp` imej penuh terbatas.
Ia mengekod semula setiap imej yang diterima sebagai JPEG kanonikal, memperoleh lebar dan
ketinggian daripada bait ternyahkod dan bukannya mempercayai medan pemanggil, serta membuang
sebarang bait poliglot hujung dan bukannya mengekalkannya. Hanya penimbal termampat kanonikal
terbatas yang dicaj kepada kedua-dua kuota. Had wayar JSON merangkumi overhed Base64 untuk
siling input ternyahkod 32 MiB. Setiap
terbitan tersimpan merekodkan format/resolusi JPEG yang disahkan, dasar pensampelan,
versi terbitan, masa penciptaan, hash kandungan yang dikira pelayan, dan rujukan induk
terhash serta hash kandungan induk pemanggil yang dipercayai. Pembatalan disemak
antara fasa penyahkodan/hash tak segerak sebelum komit cache atom.

Tranche ini belum menghubungkan pengeluar produksi ke laluan dan tidak
menyediakan pemilihan varian berbilang resolusi. Oleh itu, laluan permintaan Video Bridge
yang telus tidak menanggung kerja tambahan, manakala terbitan prinsipal terikat penyewa
dan kitar hayat penuh berbilang resolusi FU-08 kekal sebagai kerja susulan eksplisit dan
bukannya didokumentasikan sebagai tingkah laku yang lengkap.

Bingkai diberi kapsyen secara berurutan dengan model Video yang dikonfigurasikan.
Override Video yang kosong mewarisi tetapan Vision; jika kedua-duanya kosong,
penghala auto Vision memilih model berkeupayaan penglihatan yang berkesan. Kapsyen
yang berjaya menggantikan bahagian asal dengan awalan stabil `[Video description:`
yang turut menandakan teks sebagai pemerhatian terbitan media tidak dipercayai dan
memberitahu model hiliran untuk tidak mengikut arahan yang ditemui dalam media.
Kunci cache kapsyen bingkai merangkumi bait JPEG, prompt, cap masa, dan model
berkesan; hanya kapsyen yang berjaya dicache. Entri cache mengekalkan model
pengeluar sebenar yang berjaya, termasuk model fallback; jambatan melaporkan
`mixed` apabila bingkai berbeza dihasilkan oleh model berbeza. Cache hit
menggunakan semula identiti pengeluar tersebut dan bukannya melabel semula ia
sebagai pelan penghalaan yang diminta. Cache hasil keseluruhan video dikunci pada
setiap input yang mengubah output — prompt, model berkesan, dasar pensampelan,
bilangan bingkai, mod analisis semantik, cap jari SHA-256 bagi petunjuk fokus
ternormal, tetingkap fokus, `transcript`, `audioTranscript`, dan bendera helaian
kontak — jadi perubahan pada mana-mana dimensi tersebut ialah cache miss, bukan
sekali-kali penggunaan semula yang lapuk. Versi dasar dedup visual, ambang, dan
bilangan bingkai calon terbatas juga eksplisit dalam kunci cache hasil dan metadata;
oleh itu, perubahan dasar tidak boleh menggunakan semula penerangan keseluruhan
video yang lapuk. Metadata cache hasil v4 menyimpan mod dan cap jari, bukan
sekali-kali tugas pengguna mentah. Metadata guardrail melaporkan kedua-dua mod
analisis yang diminta dan yang berkesan; mod `focused` yang diminta tanpa teks
pengguna yang boleh digunakan dilaporkan sebagai `full` secara berkesan.

Guardrail mengekstrak setiap bahagian video yang disokong tetapi menerangkan tidak
lebih daripada `modalityBridgeVideoMaxVideos`. Bagi sasaran yang terbukti mempunyai
`supportsVideo === false`, video yang gagal dan melebihi had menjadi penanda teks
selamat yang eksplisit supaya tiada video mentah yang tinggal. Apabila keupayaan
tidak diketahui, bahagian tersebut mengekalkan pembawa videonya; sebarang transkrip
fallback mengikut penukaran teks terbatas di atas. Sasaran dengan
`supportsVideo === true` memintasi jambatan. Isyarat batal permintaan klien merambat
melalui muat turun, baris gilir broker, subproses, dan panggilan kapsyen; pembatalan
berhenti antara video dan tidak sekali-kali gagal terbuka kepada media mentah.

Tetapan runtime disokong DB dan disahkan Zod:

| Kunci                               | Lalai       | Julat / tingkah laku                                                                                                  |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime pilihan, opt-in                                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mengekalkan kapsyen generik; `focused` menggunakan konteks pengguna terkini yang terbatas dan tidak dipercayai |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` berkadar; kegagalan pengesan kembali kepada `uniform`                  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

Nilai tamat masa Video legasi yang tersimpan melebihi 120 saat dihadkan kepada
had akhir broker; penulisan tetapan baharu melebihi had tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokaliti loopback bertera
yang dipercayai sebelum pengesahan atau pengujian runtime, kemudian memerlukan
pengesahan pengurusan. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe
yang disanitasi, dan sebab tetap apabila runtime tidak tersedia. Titik akhir
pengekstrakan dalaman bukan API muat naik awam: ketepuan baris gilir mengembalikan
`503` serta `Retry-After`, pemutusan pemanggil mengembalikan `499`, dan had akhir
tetap broker mengembalikan `504`. Respons yang ditukar menambah
`video->text;model=<visionModel>;parts=<videos>` pada pengepala pusat
`x-omniroute-modality-bridge` tanpa mengalih keluar segmen Vision atau Audio.

### Penyamar PII (`piiMasker.ts`)

Berjalan pada **kedua-dua** peringkat.

- **`preCall`** mengklon payload, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item string biasa), serta mengaplikasikan `processPII()`
  (daripada `@/shared/utils/inputSanitizer`) pada medan string
  `content`/`text`. Apabila `PII_REDACTION_ENABLED=true`, PII yang dikesan
  disamarkan dalam payload keluar. Ini bebas daripada `INPUT_SANITIZER_MODE`
  (yang hanya mengawal dasar suntikan prompt). Apabila penyamaran dimatikan,
  panggilan tersebut merekodkan kiraan pengesanan tanpa menulis semula
  kandungan.
- **`postCall`** mengklon respons secara mendalam, menjalankan
  `sanitizePIIResponse()` bersama penyamar berbentuk Responses-API
  (`maskResponsesOutput` — merangkumi `output_text` dan
  `output[].content[].text`). Jika sebarang penyamaran berlaku, respons yang
  diubah suai menggantikan respons asal.

Guardrail tidak pernah menyekat; ia hanya menganotasi (`meta.detections`,
`meta.redacted`) atau menulis semula.

#### Pemilihan mengikut jenis, corak tersuai dan pembilang pengesanan

**Papan Pemuka → Tetapan → Keselamatan → Penyamaran PII** memilih _apa_ yang
disamarkan. Ia tidak menghidupkan penyamaran: itu masih
`PII_REDACTION_ENABLED` (permintaan) dan `PII_RESPONSE_SANITIZATION` (respons +
SSE), kedua-duanya dimatikan secara lalai.

- **Pemilihan mengikut jenis** — id terbina dalam disenaraikan dalam
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Tidak ditetapkan
  bermaksud semua jenis (tingkah laku sebelum tetapan ini wujud). Corak
  `ssn_us` enjin permintaan dipetakan kepada `ssn`. Templat (Minimal, Standard,
  Financial, Brazilian, USA, Full) hanya mengisi kotak semak dalam UI.
- **Corak tersuai** — sehingga 20 corak regex atau wildcard (`*` = sehingga 64
  aksara bukan ruang kosong, `?` = satu). Padanan menjadi `[CUSTOM_REDACTED]`.
  Setiap corak melalui `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maksimum 500 aksara, flag dihadkan
  kepada `g i m s u`, mesti berjaya dikompil, mesti lulus `safe-regex`
  (backtracking bencana), dan tidak boleh memadankan string kosong atau
  placeholder penyamaran. Corak yang gagal ditolak semasa disimpan dan semasa
  diuji, dan baris tersimpan yang gagal dilangkau semasa runtime dan bukannya
  dikompil. Corak tersuai hanya berjalan semasa penyamaran dihidupkan.
- **Pembilang pengesanan** — kiraan mengikut jenis (bukan nilai yang
  dipadankan), disimpan dalam ingatan dan diset semula apabila restart
  (`src/lib/pii/piiDetectionStats.ts`). Ia hanya meningkat semasa penyamaran
  dihidupkan.

Tetapan disimpan dalam jadual `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 s. API:

| Kaedah | Laluan                   | Tujuan                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Keadaan flag, `enabledTypes`, `customPatterns`, pembilang pengesanan |
| `PUT`  | `/api/settings/pii`      | Gantikan `enabledTypes` (`null` = semua) dan/atau `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Dry-run satu corak terhadap sampel maksimum 8 KB; tiada apa disimpan |

Ketiga-tiganya memerlukan pengesahan pengurusan dan mengesahkan body dengan
Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Suntikan Prompt (`promptInjection.ts`)

Mengesan struktur adversarial dalam kandungan yang diberikan pengguna dan
menguatkuasakan dasar yang dikonfigurasikan. Tingkah laku dikawal oleh
pemboleh ubah persekitaran dan pilihan konstruktor:

| Tetapan        | Pemboleh ubah env                                                                                      | Lalai  | Kesan                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dihidupkan     | `INPUT_SANITIZER_ENABLED`                                                                              | `true` | Apabila `false`, guardrail dipintas.                                                                                                                                                                      |
| Mod            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn` | Dasar suntikan: `block`, `warn`, atau `log`. (`redact` diterima untuk keserasian belakang tetapi **tidak** membuang teks suntikan; penulisan semula PII permintaan dikawal oleh `PII_REDACTION_ENABLED`.) |
| Ambang sekatan | pilihan `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Keterukan minimum yang diperlukan untuk menyekat. Medium hanya untuk pemerhatian pada tetapan lalai.                                                                                                      |

**Keutamaan mod** (`getMode`): `options.mode` pemanggil →
`INJECTION_GUARD_MODE` **override feature-flag DB** (Papan Pemuka → Tetapan →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Oleh itu, override papan pemuka mengatasi pemboleh ubah env, jadi UI
Feature Flags mengawal guardrail yang sedang berjalan secara langsung (tanpa
restart). Bacaan DB bersifat fail-safe: jika berlaku ralat, guardrail kembali
kepada tingkah laku berasaskan env, dan apabila tiada override ditetapkan,
tingkah lakunya sama dengan penentuan berasaskan env sahaja.

Sumber pengesanan:

1. `sanitizeRequest()` daripada `@/shared/utils/inputSanitizer` (set pengesan
   dikongsi yang digunakan di tempat lain dalam pipeline).
2. `DEFAULT_GUARD_PATTERNS` terbina dalam (kini `system_override_inline` dan
   `markdown_system_block`, kedua-duanya berketerukan `high`).
3. `customPatterns` pilihan yang dihantar melalui pilihan konstruktor (string,
   regex, atau rekod `{ name, pattern, severity }`).

Apabila `mode === "block"` **dan** sekurang-kurangnya satu pengesanan memenuhi
ambang keterukan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mod `warn`/`log`, guardrail merekodkan tetapi
membenarkan panggilan itu. Helper kongsi `evaluatePromptInjection()` turut dieksport
untuk pemanggil yang perlu menilai prompt tanpa melalui registri.

**Had imbasan (v3.8.20):** pengesan hanya memeriksa **16 KB pertama** daripada
teks prompt yang dicantumkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bait) dalam
`src/shared/utils/inputSanitizer.ts`. Kedua-dua `detectInjection()` dan
`evaluatePromptInjection()` memotong dengan `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum
menjalankan gelung corak. Arahan suntikan berada berhampiran bahagian atas sesebuah
input, jadi ini mengehadkan CPU/GC regex pada payload bersaiz beratus-ratus KB
tanpa melemahkan pengesanan (rujuk #3932, #4041).

### Penyamar Kredential (`credentialMasker.ts`)

Berjalan pada **kedua-dua** peringkat, terakhir dalam rantai lalai (keutamaan `95`).
Menyamar corak kunci API / token rahsia yang terkenal daripada payload keluar
(kandungan mesej, argumen panggilan alat, hasil alat) **dan** respons pembekal,
supaya kredential yang ditampal ke dalam prompt (atau diulang semula oleh hasil alat)
tidak bocor kepada pembekal hulu atau kembali kepada klien.

- **Hanya opt-in**, konvensyen yang sama seperti redaksi PII (berkaitan Peraturan
  Tegas #20): dilumpuhkan melainkan `settings.credentialRedactionEnabled === true`
  **atau** `CREDENTIAL_REDACTION_ENABLED=true`. Apabila dimatikan, guardrail ini
  adalah no-op — ia tidak pernah menyekat dan tidak pernah menulis semula.
- `redactCredentials()` menyusuri keseluruhan pepohon payload/respons (`walkValue()`,
  selamat daripada pencemaran prototaip, selamat daripada kitaran melalui `WeakSet`)
  dan menggantikan padanan dengan placeholder `[REDACTED:<type>]`, mengklon hanya
  cabang yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` merangkumi kunci pembekal LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square), kunci
  awan (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci peribadi / JWT,
  string sambungan yang membawa kredential (`mongodb://user:pass@...`, dsb.), dan
  corak nilai pengepala generik
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Kunci berbentuk pengepala
  (`authorization`, `x-api-key`, `api-key`, `apikey`) disamar secara berstruktur
  (nilai sahaja, awalan skim seperti `Bearer `/`Basic ` dikekalkan) dan bukannya
  melalui regex teks generik.
- Guardrail tidak pernah menyekat; ia hanya menulis semula (`modifiedPayload` /
  `modifiedResponse`) dan menganotasi (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true memintas rantai
  message?: string; // dipaparkan semasa menyekat
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

Guardrail menandakan "tiada perubahan" dengan mengembalikan sama ada `void`, `{}`, atau
`{ block: false }`. Mengembalikan `modifiedPayload`/`modifiedResponse` menggantikan
nilai yang mengalir melalui rantai untuk guardrail hiliran.
`signal?: AbortSignal` membawa kitar hayat pemanggil ke dalam guardrail. Pembatalan permintaan ialah pengecualian fail-open yang disengajakan: jambatan media menghentikan kerja dan pembersihan tanpa memulihkan media mentah kepada sasaran yang diketahui tidak menyokongnya.

## Registri (`registry.ts`)

Singleton `guardrailRegistry` mendedahkan:

- `register(guardrail)` — menambah (atau menggantikan mengikut nama ternormal) guardrail dan
  menyusun semula mengikut `priority` menaik.
- `clear()` / `list()` — pembantu pentadbiran.
- `runPreCallHooks(payload, context)` — mengulangi guardrail aktif, menyalurkan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` pertama.
- `runPostCallHooks(response, context)` — aliran yang sama pada bahagian respons.
- `resetGuardrailsForTests({ registerDefaults })` — mengosongkan keadaan dan secara pilihan
  mendaftar semula nilai lalai untuk pengasingan ujian yang bersih.

Kedua-dua runner mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
di mana `results` ialah tatasusunan rekod `GuardrailExecutionResult` yang merangkumi
medan `blocked`, `skipped`, `modified`, `error`, dan `meta` bagi setiap guardrail,
berguna untuk penjejakan.

### Menyahdayakan Guardrail Bagi Setiap Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengagregatkan senarai
nama guardrail tanpa pendua yang patut dilangkau untuk permintaan
semasa. Terdapat lima saluran, dibaca mengikut susunan ini dan digabungkan ke dalam satu senarai
(kejadian pertama diutamakan semasa penyahpenduaan):

1. `apiKeyInfo.disabledGuardrails`
2. Badan permintaan `disabledGuardrails` (peringkat teratas)
3. Badan permintaan `metadata.disabledGuardrails` (hanya apabila `metadata` ialah objek)
4. Pengepala `x-omniroute-disabled-guardrails`
5. Pengepala legasi `x-disabled-guardrails`

Kesemua lima saluran digabungkan, termasuk kedua-dua pengepala: menghantar kedua-dua
`x-omniroute-disabled-guardrails` dan `x-disabled-guardrails` melangkau kesatuan
senarai mereka, dan pengepala moden yang kosong tidak lagi menyembunyikan pengepala legasi
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), diperbaiki dalam
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Nilai boleh berupa tatasusunan rentetan atau rentetan terpisah koma; nama dipangkas
dan dinormalkan kepada kebab-case huruf kecil (`pii_masker` → `pii-masker`), dan
entri kosong digugurkan. Hasilnya disalurkan melalui `context.disabledGuardrails`
kepada registri, yang melangkau guardrail yang sepadan (`skipped: true` dalam `results`).

Senarai nyahdaya hanya menjejaskan **registri**. Mod `block` suntikan prompt ialah
sempadan mandatori: middleware pengawal suntikan
(`src/middleware/promptInjectionGuard.ts`) memanggil `evaluatePromptInjection()`
tanpa sebarang senarai nyahdaya yang dikawal pemanggil (panggilan mati
`resolveDisabledGuardrails({ body })` yang pernah dibuatnya telah dialih keluar dalam
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), jadi permintaan
yang menyahdayakan `prompt-injection` masih ditolak dalam mod `block`. Ini adalah
mengikut reka bentuk. Saluran nyahdaya dikawal oleh pemanggil (badan permintaan,
metadata, pengepala), dan pemanggil tidak boleh mematikan kawalan keselamatan
yang ditetapkan oleh pengendali
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Kesatuan
pengepala daripada [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
hanya mengubah guardrail registri mana yang dilangkau; ia tidak membenarkan klien
memintas middleware. Dasar guardrail mandatori setiap kunci dan setiap kumpulan
dijejak dalam RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Lihat [Liputan dan had](#coverage-and-limits).

## Turutan Pelaksanaan

Bagi setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts` (laluan keluarga chat yang disenaraikan di bawah
[Liputan dan had](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` membina senarai langkau daripada kunci API,
   badan, dan pengepala.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail mengikut
   turutan keutamaan menaik:
   - Guardrail yang dilumpuhkan direkodkan sebagai `skipped`.
   - `preCall` setiap guardrail boleh menulis semula muatan melalui `modifiedPayload`.
   - `block: true` yang pertama memintas rantai dan pengendali mengembalikan
     respons penolakan guardrail.
3. Muatan (yang mungkin telah ditulis semula) mengalir ke penghalaan kombo dan
   penghantaran upstream.
4. **Bukan penstriman sahaja:** selepas respons dipasang,
   `guardrailRegistry.runPostCallHooks(...)` menjalankan rantai yang sama pada
   respons tersebut. `block: true` di sini menggugurkan respons upstream dan mengembalikan HTTP 400. Respons penstriman melangkau langkah ini sepenuhnya.

Guardrail yang melontarkan ralat direkodkan dengan `error: <message>` dan dilogkan melalui
`logger.warn`, tetapi rantai diteruskan — fail-open mengikut reka bentuk.

## Liputan dan had

Pendaftar guardrail disambungkan ke saluran paip chat sahaja. Had-had ini
dipaku oleh `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` dan
`tests/unit/guardrail-pipeline-characterization.test.ts`; kemas kini ujian tersebut
secara sengaja apabila tingkah laku berubah.

### Tempat hook dijalankan

| Hook / kawalan                      | Dijalankan pada                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Permintaan yang dikendalikan oleh `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (dan `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, dan proksi chat Telegram. Juga titik hujung ujian papan pemuka `/api/guardrails/test`. Sekatan pra-panggilan mengembalikan HTTP 400. |
| `runPostCallHooks`                  | Respons chat **bukan penstriman** sahaja (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Respons penstriman tidak pernah sampai kepadanya.                                                                                                                                                                                                                                                                                                      |
| PII penstriman                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), disalurkan dalam `streamingPipeline.ts` apabila `PII_RESPONSE_SANITIZATION` dihidupkan. Ia bukan guardrail, jadi saluran pelumpuhan tidak mempengaruhinya.                                                                                                                                                                                                                                |
| Middleware injection-guard (legasi) | Setiap laluan `/v1` yang membawa prompt, termasuk keluarga chat (lihat [liputan laluan](#injection-guard-route-coverage--red-team-phase-8--block-d)). Suntikan prompt sahaja.                                                                                                                                                                                                                                                                           |

### Apa yang tidak dilindungi

- **Laluan media, embeddings dan data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) tidak pernah sampai ke pendaftar. Tiada
  penyamaran PII, penyamaran kelayakan atau jambatan modaliti berjalan di sana. Satu-satunya
  semakan mereka ialah middleware injection-guard legasi.
- **Respons penstriman** tidak mendapat guardrail pasca-panggilan: tiada `pii-masker` atau
  `credential-masker` pasca-panggilan, dan tiada sekatan pasca-panggilan. Hanya transformasi PII
  penstriman digunakan (apabila `PII_RESPONSE_SANITIZATION` dihidupkan). Kelayakan
  yang digaungkan semula dalam respons penstriman tidak diredaksikan.
- **Saluran pelumpuhan lwn middleware (mengikut reka bentuk):** middleware menilai
  suntikan prompt dengan panggilannya sendiri kepada `evaluatePromptInjection()`, tanpa
  menyerahkan sebarang senarai pelumpuhan yang dikawal pemanggil. Mod `block` ialah
  sempadan mandatori yang tidak dapat dipintas oleh pelumpuhan yang dikawal pemanggil, termasuk pada laluan keluarga chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Melumpuhkan
  `prompt-injection` hanya melangkau guardrail pendaftar.

### Apa yang melihat respons sebelum pasca-panggilan

Pada laluan bukan penstriman, turutannya ialah: pengekstrakan memori → pelaksanaan alat
terbina dalam → guardrail pasca-panggilan → keluar sekatan pasca-panggilan → storan cache semantik.

- **Pengekstrakan memori** dan **pelaksanaan alat** melihat respons sebelum
  pagar perlindungan pasca-panggilan dapat menulis semula atau menyekatnya. Sejak
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), pengekstrakan
  memori melaraskan teks yang diekstrak melalui `sanitizePII` apabila
  `PII_RESPONSE_SANITIZATION` diaktifkan (kedua-dua penstriman dan bukan penstriman), tetapi
  respons yang kemudiannya disekat oleh pasca-panggilan masih telah ditawarkan kepada memori dan
  alat.
- **Cache semantik** menyimpan respons selepas pasca-panggilan, jadi ia menyimpan
  respons yang telah ditulis semula, dan respons yang disekat tidak pernah dicachekan. Entri cache
  dikunci mengikut kunci API.

## Konfigurasi

Pembolehubah persekitaran yang dibaca oleh pengawal terbina dalam:

| Pembolehubah                          | Digunakan oleh         | Kesan                                                                                                      |
| ------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Tetapkan `false` untuk menyahaktifkan pengesanan sepenuhnya.                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Dasar suntikan: `warn`, `block`, atau `log`. Nilai legasi `redact` tidak menulis semula teks suntikan.     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Mod untuk pengawal suntikan; juga bendera ciri DB yang **mengatasi** pembolehubah persekitaran (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Keterukan minimum yang ditolak oleh `MODE=block`: `high` (lalai), `medium`, atau `low`.                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Alias legasi untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Apabila `true`, PII permintaan disunting (tidak bergantung pada mod suntikan).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (hiliran) | Mengawal tingkah laku penyamaran di sebelah respons.                                                       |

Pengawal Modality Bridge membaca konfigurasi masa jalan daripada stor tetapan
berasaskan DB (`getSettings()`), bukan pembolehubah persekitaran. Kunci utama
Vision ialah `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci legasi
`visionBridge*` hanya diterima sebagai fallback bacaan satu kitaran yang
didokumentasikan; penulisan papan pemuka menggunakan kunci utama. Nilai lalai
dan penyelesai fallback berada dalam `src/shared/constants/modalityBridgeDefaults.ts`,
dengan pemalar legasi dikekalkan dalam `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, serta tetapan
`modalityBridgeCache*` yang dikongsi. Audio tidak mempunyai fallback kunci
legasi kerana kunci-kunci ini diperkenalkan bersama skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, serta tetapan `modalityBridgeCache*` yang dikongsi.
Ia dinyahaktifkan secara lalai kerana FFmpeg/ffprobe ialah kebergantungan
operasi pilihan dan pemberian kapsyen bingkai menambah latensi serta kos model.

## Guardrail Tersuai

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

1. Cipta `src/lib/guardrails/myGuardrail.ts` yang melanjutkan `BaseGuardrail`.
2. Laksanakan `preCall` dan/atau `postCall`.
3. Sama ada daftar semasa masa import (push dari `registerDefaultGuardrails`) atau
   panggil `guardrailRegistry.register(...)` semasa runtime — registri akan menggantikan
   mana-mana guardrail terdahulu yang mempunyai nama ternormal yang sama.
4. Tambah ujian di bawah `tests/unit/` (contoh sedia ada:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` antara ujian untuk bermula dari keadaan yang diketahui.
Hantar `{ registerDefaults: false }` untuk bermula dengan registri kosong dan
daftarkan hanya guardrail yang sedang diuji. Vision Bridge menerima suntikan
kebergantungan (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge mendedahkan
titik sambungan yang setara untuk tetapan, keupayaan, pemilihan model STT, semakan
kredential, dan transkripsi. Oleh itu, ujian boleh melaksanakan kedua-dua aliran tanpa
akses pangkalan data atau rangkaian.

## Lihat Juga

- `src/lib/guardrails/` — pelaksanaan
- `src/shared/utils/inputSanitizer.ts` — pengesan dikongsi yang menggerakkan
  pengesanan prompt-injection dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — nilai lalai Vision Bridge dan
  senarai model forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — nilai lalai runtime Vision/Audio dikongsi
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogon (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — rujukan penuh pemboleh ubah persekitaran

## Liputan laluan injection-guard & red-team (Fasa 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) meliputi semua laluan
yang menerima prompt pengguna. Ia mematuhi `INJECTION_GUARD_MODE` (lalai `warn` = log sahaja;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis            | Laluan                                                                                                                                               | Mod lalai |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Teks (sedia ada) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| Generatif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

Pengekstrakan teks (`extractMessageContents`) meliputi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (setiap malam, `nightly-llm-security.yml`):** promptfoo mengesahkan bahawa setiap laluan menyekat
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan prob (dilangkau tanpa rahsia).
`moderations` disertakan untuk konsistensi. Mod block ialah sempadan mandatori: `evaluatePromptInjection()`
mengabaikan senarai nyahaktif setiap permintaan yang diserahkan kepadanya oleh middleware, jadi `disabledGuardrails`
**tidak** mengecualikan sesebuah laluan daripadanya ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Aliran kerja malam (`.github/workflows/nightly-llm-security.yml`, cron + dispatch manual)
mempunyai dua job:

- **`promptfoo-guard` (menyekat)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kes berlawanan (cth. "ignore all
  previous instructions…", jailbreak gaya DAN) menegaskan bahawa respons membawa
  `error.code === "SECURITY_001"`, iaitu pengawal itu benar-benar menolak permintaan tersebut.
- **`garak` (bersifat nasihat)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instans OmniRoute tempatan (`http://localhost:20128/v1`). Disyaratkan pada
  rahsia penyedia (`PROMPTFOO_PROVIDER_KEY`); dilangkau dengan lancar dan diakhiri
  `|| true`, jadi ia melapor tanpa menggagalkan CI.

Liputan pembantu pengawal (`createInjectionGuard` / `withInjectionGuard`)
merangkumi setiap laluan `/v1` yang membawa prompt; teks prompt diambil dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` dalam `src/shared/utils/inputSanitizer.ts`.
