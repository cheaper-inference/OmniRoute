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

Memintas bahagian video peringkat atas dalam Pelengkapan Sembang `messages` dan Respons API `input` sebelum sasaran tanpa sokongan video asli yang diketahui dipanggil. Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`, HTTPS URLs dan `data:video/*;base64,...` data URIs. Nama fail biasa dalam teks tidak dianggap sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki traversal permintaan, cek capability/policy, pengagregatan setiap permintaan dan muatan respons. Pemerolehan — kerja setiap video, cache hasil keseluruhan, menerangkan jujukan bingkai (yang menggabungkan mana-mana transkrip audio yang diisytiharkan oleh pemanggil), dan metrics/abort/cleanup — setiap percubaan tersembunyi di belakang `processVideoPart` dalam `videoBridgePipeline.ts`, dipanggil sekali setiap bahagian video dalam gelung `preCall`. Modul itu juga mentakrifkan sempadan port eksplisit `VideoMediaBrokerPort` (memperoleh bait dan mengekstrak bingkai sampel), `VideoAudioTranscriptionPort` (mencantumkan transkrip audio yang diisytiharkan pemanggil dengan kapsyen sampel) dan `VideoDrilldownPort` (bentuk kedai mentah warisan). Pengeluaran STT dan pengekalan bingkai terdiri di sekitar port yang menerangkan melalui `createVideoSttAdapter` dan `createVideoDrilldownAdapter`; yang kedua menggunakan kitaran hayat pemegang legap yang dikongsi.

Laluan permintaan `/v1` awam tidak pernah mengimport atau menggunakan subproses. Video jauh dimuat turun di bawah had 50 MiB ; video base64 sebaris mempunyai had konservatif 36 MiB yang dinyahkod setiap video supaya sampul surat model/messages/framing boleh kekal dalam had kemasukan permintaan JSON awam sebanyak 50 MiB. Anggaran panjang sebaris dan saiz dinyahkod disemak sebelum diperuntukkan. HTTPS diperlukan pada URL jauh awal dan setiap ubah hala, menggunakan pengawal keluar awam sahaja sedia ada dengan penyematan DNS. Bait kemudiannya melintasi sempadan broker `POST /api/modality-bridge/video/extract` dalaman yang tepat. Laluan itu ialah `LOCAL_ONLY` dan `SPAWN_CAPABLE`, hanya menerima permintaan per-proses yang disahkan, gelung balik dipercayai dan tidak sekali-kali menerima URL, laluan sistem fail, boleh laku atau senarai argumen. Saluran paip saiz badan API dan pembaca badan tambahan pengendali secara bebas menguatkuasakan had input broker 50 MiB. Baris gilir terhadnya menjalankan satu pengekstrakan pada satu masa, membenarkan empat kerja yang belum selesai dan mengehadkan input yang belum selesai pada 100 MiB.

Di dalam broker, `ffprobe` membaca fail tempatan peribadi; senarai dibenarkan format tetap tidak termasuk senarai main dan format manifes. Untuk bekas keluarga MOV yang dibenarkan, rujukan data MOV luaran kekal dilumpuhkan secara lalai dan arahan tetap tidak mengikut sertakannya. Kedua-dua `ffprobe` dan `ffmpeg` menggunakan senarai putih protokol `file` -only, satu utas, tatasusunan hujah tetap, tiada shell dan boleh laku yang diselesaikan daripada `PATH`. Strim muka depan gambar yang dilampirkan bukan calon yang boleh dimainkan. Semua strim yang boleh dimainkan mesti memenuhi had dan strim lalai yang eksplisit diutamakan sebelum sandaran indeks terendah yang menentukan. Video dihadkan kepada 600 saat, 8,192 piksel setiap dimensi dan 33,554,432 piksel sumber. FFmpeg sampel 1–16 bingkai JPEG titik tengah, mengecilkan tepi panjang kepada paling banyak 1,024 piksel tanpa meningkatkan input yang lebih kecil dan tidak pernah menerima URL. Pensampelan ialah `uniform` secara lalai. Dasar `scene_aware` dan `segment_aware` percubaan pilihan melaksanakan satu pas FFmpeg tetap tambahan ke atas strim tempatan yang telah disahkan, pilih cap waktu pemandangan `showinfo` yang dihadkan dan kembali secara deterministik ke titik tengah seragam yang sama pada kegagalan pengesan, tamat masa, output cacat atau set calon kosong. Mod sedar segmen memperuntukkan sampel titik tengah secara berkadar dengan selang adegan yang disahkan; bukti sedar segmen dan tingkah laku sandaran diperincikan di bawah. Penutup keras 16 bingkai digunakan selepas pemilihan dalam setiap dasar. Apabila permintaan yang menyedari pemandangan hanya mempunyai belanjawan satu bingkai, ia menggunakan titik tengah seragam bagi tetingkap video penuh atau fokus yang aktif dan melaporkan `policyEffective: uniform`: satu bingkai pemandangan yang dipilih tidak dapat mengekalkan kedua-dua hujung sementara. Pemanggil boleh secara pilihan menyediakan tetingkap fokus terhingga (`start`/`end` saat); sempadan diapit pada tempoh media, tetingkap terbalik atau tidak terhingga ditolak, dan semua dasar pensampelan dilakukan hanya dalam selang yang dinormalkan. Tetingkap yang terhasil disertakan dalam metadata pensampelan dan dalam awalan perihalan yang tidak dipercayai supaya model hiliran boleh membezakan petikan fokus daripada garis masa penuh.

Fokus kapsyen semantik ialah tetapan yang berasingan dan eksplisit. Mod analisis `full` lalai mengekalkan gesaan bingkai sedia ada dan tidak sekali-kali memajukan teks permintaan kepada model kapsyen. Dalam mod `focused`, jambatan hanya membaca `text`/`input_text` bukan kosong yang ditulis oleh pengguna daripada bekas Sembang atau Respons yang sama, menormalkannya kepada NFC, meruntuhkan aksara kawalan dan ruang kosong dan mengehadkannya kepada 500 titik kod Unicode. Keputusan kosong kembali kepada gesaan `full` yang tepat. Pembayang yang boleh digunakan disiri sebagai JSON dalam blok konteks pengguna-tidak dipercayai khusus dan hanya boleh mengutamakan butiran yang boleh diperhatikan; ia tidak boleh mengatasi amaran berasingan terhadap arahan yang boleh dilihat atau didengar dalam media. Fokus teks tidak pernah menyimpulkan `start`/`end` atau mengubah pensampel temporal.

#### bukti segmen struktur FU-07

`segment_aware` menggunakan satu pas pra-analisis terhad ke atas strim video tempatan yang telah disahkan. Rantaian penapis tetap mula-mula menskalakan kepada paling banyak 320 piksel lebar, mengesan perubahan pemandangan dan selang masa beku, kemudian sampel pada 1 bingkai sesaat untuk maklumat kabur, luma purata dan spatial/temporal. Pas dihadkan kepada 600 sampel struktur, satu benang FFmpeg/filter, protokol `file` -only dan senarai dibenarkan kontena yang sama, had 1 MiB proses-output, dan paling lama 30 saat dalam abort/deadline. kongsi broker Ia tidak pernah menerima arahan, penapis, laluan atau URL daripada permintaan.

Nilai struktur adalah bukti pensampelan deterministik, bukan pemahaman video semantik. Mereka tidak membuat kesimpulan subjek, tindakan, kapsyen, pertuturan atau niat pengguna. Pemandangan dan sempadan beku membentuk segmen; membekukan liputan, kabur, dedahan, butiran spatial dan perubahan temporal hanya mempengaruhi cara belanjawan bingkai 1–16 sedia ada diperuntukkan. Segmen beku sepenuhnya dihadkan pada satu bingkai, manakala segmen tidak beku bersaing untuk baki belanjawan. Apabila sempadan melebihi bilangan bingkai, liputan garis masa seragam dikekalkan supaya pemotongan awal yang pantas tidak dapat menyembunyikan segmen mengekor yang panjang. Sempadan pemandangan dalam resolusi analisis 1 saat bagi sempadan beku disatukan.

Penapis yang tiada, bukti malformed/empty, ralat pengesan atau tamat masa pra-analisis terhad gagal dibuka kepada dasar titik tengah seragam yang tepat. Pemanggil membatalkan atau tarikh akhir broker tidak gagal dibuka: ia menamatkan subproses dalam penerbangan, menghalang pengekstrakan bingkai kemudian dan pokok sementara persendirian dialih keluar dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menjana lekapan FFmpeg sebenar yang menentukan untuk penjimatan kapsyen-panggilan selepas pemotongan, peruntukan belanjawan gerakan padat, bukti blur/exposure/SI-TI, pemotongan pantas dengan ekor panjang dan positif palsu pudar secara beransur-ansur. Ia merekodkan masa dinding pra-analisis dan, di mana `/usr/bin/time` tersedia, CPU kanak-kanak dan RSS puncak . Semakan kualitinya adalah ramalan struktur sahaja. Kualiti model kapsyen sebenar kekal `HOLD` kerana abah-abah ini tidak mempunyai titik akhir yang dibenarkan atau hakim beku. Simpanan kewangan juga kekal `HOLD` melainkan `--caption-cost-per-call-usd` membekalkan anggaran setiap panggilan positif yang jelas; skrip tidak pernah mengada-adakan mana-mana hasil.

Setiap bingkai dihadkan kepada 4 MiB, semua bingkai mentah bersama-sama kepada 23 MiB, dan tindak balas broker bersiri kepada 32 MiB. Direktori sementara peribadi dialih keluar dalam `finally`. OmniRoute tidak menghimpunkan FFmpeg dan tidak menerima laluan boleh laku tersuai. Sebelum kapsyen, jambatan menggunakan pas deduplikasi visual konservatif: setiap JPEG dikurangkan kepada penimbal skala kelabu 16 × 16 dan hanya dibandingkan dengan bingkai terakhir yang dikekalkan. Untuk belanjawan kapsyen yang diminta di atas satu bingkai, pengekstrakan membekalkan kumpulan calon terhad sehingga dua kali ganda belanjawan itu dan tidak lebih daripada 16 bingkai. Had yang diminta hanya digunakan selepas penduadua, dengan calon terpilih pertama dan terakhir dikekalkan semasa penipisan akhir apabila belanjawan sekurang-kurangnya dua. Dasar `grayscale-16x16-mean-cells-v2` versi menggunakan purata delta luma yang lebih besar dan nisbah sel lakaran kenit yang delta ternormalnya ialah sekurang-kurangnya 0.05. Ambang pendua ialah pemalar 0.04, dipilih untuk kebolehramalan dan bukannya didedahkan sebagai tetapan masa jalan. Isyarat kontras tinggi sekunder ini mengekalkan pergerakan kecil dan perubahan teks yang boleh dilihat yang boleh disembunyikan oleh perbandingan min sahaja. Ralat pembanding atau penyahkod gagal dibuka dan mengekalkan liputan. Metadata output memisahkan calon yang diekstrak, bingkai yang berjaya digunakan dan pendua visual digugurkan.

Bahagian video yang ditanda secara eksplisit mungkin meminta helaian kenalan bercap masa. Jambatan membina paling banyak grid JPEG 4 lajur, 16 bingkai. Setiap sel 512 piksel membakar cap masa sumbernya ke jalur bawah kontras tinggi, manakala cap masa yang sama kekal dalam metadata teks untuk perkaitan dan audit hiliran. JPEG lengkap kekal dihadkan pada 32 MiB. Jika `sharp` tidak boleh menyahkod atau menyusun grid, jambatan akan kembali ke bingkai JPEG individu; pengguguran pelanggan masih merambat melalui operasi helaian.

Bukti promosi sengaja diasingkan daripada penanda aras komposisi sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan abah-abah A/B versi skema untuk model penglihatan serasi OpenAI sebenar. Ia mengukur token yang dilaporkan pembekal, kependaman dinding hujung ke hujung (termasuk komposisi helaian), kiraan panggilan model dan pengekalan fakta yang ditakrifkan secara nyata. Respons model mentah tidak ditulis pada laporan; hanya SHA-256 digest dan fakta dipadankan IDs dikekalkan. Abah-abah tidak membuat panggilan rangkaian atau model berbayar melainkan `--execute-real` diluluskan dan `--model`, `OMNIROUTE_BASE_URL` dan `OMNIROUTE_API_KEY` dikonfigurasikan. Tanpa larian sebenar yang jelas itu, keputusan yang boleh dibaca mesinnya kekal `HOLD`; ukuran payload/call-count sintetik sahaja bukanlah bukti promosi.

Pemanggil boleh melampirkan tatasusunan `transcript.cues` pilihan pada bahagian video yang disokong apabila mereka sudah memiliki teks sejajar. Setiap kiu mesti membawa `text`, selang `start`/`end` terhingga dalam tempoh siasatan dan `source` yang disenarai putih (`client`, `embedded` atau `audio-bridge`); `confidence` lalai kepada `1` dan mesti kekal di antara `0` dan `1`. Petunjuk pendua tepat diruntuhkan. OmniRoute tidak sekali-kali memulakan transkripsi daripada metadata ini: isyarat yang disahkan disalin ke dalam hasil yang diterangkan dengan sumber, keyakinan dan selang waktu, dan dijadikan sebagai pemerhatian yang tidak dipercayai bersama kapsyen bingkai. Teks tidak sah, di luar julat atau bebas asal ditolak dan bukannya dicampur ke dalam strim kapsyen. Kedua-dua saluran transkrip badan permintaan menormalkan asal yang dibekalkan kepada `client`, termasuk label `embedded` atau `audio-bridge` yang ditegaskan sendiri. Hanya penyesuai milik pelayan boleh menetapkan label yang dipercayai tersebut melalui hujah `trustedSource` kod sahaja; medan JSON permintaan tidak boleh mencapai hujah itu. Teks transkrip kekal sebagai kandungan terbitan media yang tidak dipercayai, tanpa mengira asalnya dan tidak boleh sekali-kali menentukan kebenaran.

Pemanggil lanjutan boleh menyediakan trek `audioTranscript` untuk video yang sama; ia dianggap sebagai teks yang disediakan pelanggan, bukan bukti transkripsi pelayan. Jahitan gabungan menjalankan pemerhatian visual dan audio di bawah satu tarikh akhir dan isyarat membatalkan, memerintahkannya pada garis masa biasa, meruntuhkan pendua tepat dan melaporkan hasil separa apabila hanya satu pihak yang berjaya. `audioTranscript` yang tidak sah merendahkan kepada hasil separa — perihalan visual disimpan dan cabang audio merekodkan kod kegagalan yang telah dibersihkan — dan bukannya gagal pada keseluruhan video. Ketersediaan setiap cawangan, bendera separa dan kod kegagalan yang telah dibersihkan dikekalkan dalam hasil yang diterangkan, dalam metadata pagar (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), dalam metadata cache hasil dan dalam pembilang gabungan jambatan. Laluan Video Bridge lalai tidak menggunakan pertuturan ke teks atau memuat turun salinan media kedua; tanpa trek eksplisit itu, ia kekal sebagai video sahaja.

**Pengekalan transkrip (#12150 P1).** Ini terpakai secara automatik apabila Video Bridge (sendiri ikut serta) memaparkan isyarat transkrip — tiada bendera pengekalan yang berasingan. Apabila permintaan memberikan sebarang kiu transkrip ( `transcript` yang diisytiharkan oleh pemanggil atau `audioTranscript` yang dicantumkan ), pagar penghadang menandakannya `videoBridgeObserved` dan menghasilkan bayang-bayang yang disunting bagi perihalan video — pemaparan yang sama di mana setiap badan teks bebas kiu digantikan dengan `[redacted-video-transcript]`, dibina dengan menggantikan teks berstruktur itu dengan medan kiu yang tersusun (tiada rentetan tersusun dengan medan kiu). kandungan isyarat — adversarial atau biasa, termasuk badan yang mengandungi `]` seperti `[inaudible]`/`[music]` — boleh bertahan). Badan permintaan log panggilan yang berterusan menukar setiap bahagian teks terbitan video untuk bayang yang disunting itu, dipadankan dengan kesaksamaan kandungan; sauh `fullText` dibaca semula daripada muatan pagar pra-panggilan yang telah siap, jadi perlawanan masih berjaya selepas pagar rantai kemudian (penutup PII dan kelayakan, keutamaan 10/95) tulis semula teks penerangan di tempatnya dan selepas suntikan system-prompt/handoff/memory membentuk semula tatasusunan mesej. Badan yang dihantar ke hulu ke model tidak berubah. Permintaan yang diperhatikan juga tidak mengisi Memori yang tahan lama (kedua-dua pengekstrakan permintaan dan tindak balas dilangkau), jadi balasan model itu sendiri tidak boleh menggemakan teks transkrip ke dalam Memori.

**Medan video mentah (#12430).** Apabila jambatan didayakan dan sokongan video asli tidak diketahui atau tiada, medan `transcript`/`audioTranscript` yang ditentukan turut mengaktifkan `videoBridgeObserved`, walaupun selepas kegagalan perihalan atau had `maxVideos`. `null` dan rentetan kosong dikira; medan tidak hadir dan metadata bukan video tidak. Salinan yang disimpan menyunting medan ini atau meninggalkan permintaan dan caches/Memory dipintas.

Pada laluan sandaran tersebut, isyarat pemanggil yang sah menjadi bahagian `text`/`input_text` yang disokong dan bukannya medan penyedia bukan standard. Kedua-dua runut yang dibekalkan permintaan kekal sebagai pemerhatian `client` yang tidak dipercayai, dengan amaran jelas bahawa video itu tidak diterangkan dan cap masa tidak disahkan terhadap media. Jumlah 256-cue/64-KiB sedia ada dan belanjawan per-kiu terpakai pada kedua-dua landasan bersama-sama; cap masa mesti sesuai dengan siling 600 saat broker dan sebarang tetingkap fokus yang dibekalkan. Runut yang tidak sah dibuang, bukan dimajukan sebagai teks sewenang-wenangnya; adik beradik yang sah masih boleh digunakan melainkan bajet gabungan mereka melebihi. medan Null/empty tidak menambah teks. Tiada pengambilan media atau transkripsi ditambahkan oleh sandaran ini. Medan sambungan transkrip dialih keluar daripada pembawa video sandaran dan objek `video_url`/`source`. Senarai kebenaran wayar OpenAI kekal ketat; pembawa video asli yang tidak diketahui kekal tersedia dan sasaran teks sahaja yang diketahui mengekalkan penanda selamat. Bayang-bayang redaksi berstruktur melindungi teks transkrip yang dilampirkan, manakala permintaan asal milik pemanggil kekal tidak berubah. Sasaran yang disokong asli dan jambatan yang dilumpuhkan mengekalkan gelagat pintasan sedia ada mereka.

Salinan tersimpan tambahan menggunakan isyarat permintaan diperhatikan yang sama. Gambar permintaan pelanggan pra-pengawal mentah, permintaan belum selesai dalam memori dan log permintaan awal yang ditolak secara berstruktur menggantikan medan transkrip dalam bahagian video; gesaan rentetan yang disintesis oleh peringkat saluran paip dan serahan konteks disunting pada sinki badan permintaan berterusan. Penanda `video_content_removed` yang berterusan menjadikan sambungan `previous_response_id` gagal ditutup dan bukannya membina semula teks yang sengaja dibuang. Jika permintaan yang diperhatikan kehilangan bayang redaksi setiap bahagiannya sebelum mengelog, atau malah salah satu daripada beberapa bayang video gagal dipadankan selepas permintaan mutasi kemudian, badan permintaan yang dikekalkan akan ditinggalkan sepenuhnya dan bukannya mengekalkan transkrip yang telah disunting sebahagian.

Untuk permintaan yang diperhatikan, respons model mungkin memetik mana-mana bahagian transkrip tanpa sempadan kiu berstruktur. Oleh itu, `responseBody` log panggilan yang berterusan digantikan dengan penanda peninggalan; artifak saluran paip terperinci (yang boleh termasuk badan upstream/client dan ketulan aliran) tidak dikekalkan. Cache semantik, idempotency dan reasoning-replay memintas membaca dan menulis untuk permintaan itu. Permintaan pembekal dan respons yang boleh dilihat oleh pelanggan kekal tidak berubah. Bait keepalive awal disalirkan daripada penimbal sementara apabila artifak terperinci ditinggalkan. Amaran EventStream yang cacat Kiro hanya melaporkan kiraan bait muatan, tidak sekali-kali kandungannya atau ralat mentah penghurai JSON. Ini tidak mendakwa bahawa setiap diagnostik provider/plugin yang tidak berkaitan telah diaudit; sapuan singki tertahan yang lebih luas dijejaki dalam #11658.

Kitaran hayat `/api/modality-bridge/video/drilldown` dalaman ialah substrat cache loopback/token-authenticated yang berasingan. Setiap operasi juga memerlukan ID prinsipal legap kanonik. Sebelum pemanggil pengeluaran didayakan, ia mesti memperoleh ID itu daripada penyewa yang disahkan dan tidak boleh memajukan nilai yang dipilih pelanggan. Kekunci cache mengikat prinsipal itu kepada sesi kanonik dan rujukan video IDs, simpan kunci SHA-256-derived sahaja dan skop kedua-dua bacaan dan pemadaman kepada prinsipal yang sama. Cache menyimpan paling banyak 16 bingkai JPEG terbitan bagi setiap entri, tamat tempohnya selepas sepuluh minit dan menyokong bacaan `start`/`end` terhad atau pemadaman sesi eksplisit.

Setiap prinsipal dihadkan kepada 16 entri dan 64 MiB data JPEG kanonik. Had tersebut adalah bebas daripada siling 64-entry/256 MiB global: tekanan kuota prinsipal hanya mengusir entri yang paling kurang digunakan oleh prinsipal sebelum pengusiran LRU global dipertimbangkan. Entri tamat tempoh disapu daripada perakaunan utama dan global pada aktiviti cache, manakala pembatalan dan kegagalan pengesahan tidak melakukan penggantian separa.

Cache menolak Base64 bukan kanonik, pelapik berlebihan, media bukan JPEG, JPEGs cacat atau terpotong dan JPEGs yang menghasilkan amaran semasa penyahkod `sharp` imej penuh terhad. Ia mengekod semula setiap imej yang diterima sebagai JPEG berkanun , memperoleh lebar dan ketinggian daripada bait yang dinyahkod dan bukannya mempercayai medan pemanggil dan membuang mana-mana bait poliglot yang tertinggal daripada mengekalkannya. Hanya penimbal termampat kanonik yang dibatasi dicaj kepada kedua-dua kuota. Had wayar JSON termasuk overhed Base64 untuk siling input dinyahkod 32 MiB. Setiap terbitan yang disimpan merekodkan JPEG format/resolution yang telah disahkan, dasar pensampelan, versi terbitan, masa penciptaan, cincang kandungan yang dikira pelayan dan rujukan induk dicincang serta cincang kandungan induk pemanggil yang dipercayai. Pembatalan disemak antara fasa decode/hash tak segerak sebelum cache atom dilakukan.

Pengeluar pengeluaran menggunakan semula bingkai broker yang telah diperoleh hanya selepas analisis visual yang berjaya, tanpa download/extraction. video kedua Ia memerlukan operator `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` setiap bahagian yang ketat dan rekod kunci API yang disahkan ID. Nilai principal/session yang diisytiharkan pelanggan tidak pernah mewujudkan pemilikan. Tanpa ketiga-tiga syarat ia tidak mencincang, mengubah saiz atau mengekalkan bingkai tambahan. Kegagalan pengekalan mengekalkan tindak balas visual yang boleh digunakan. Permintaan yang dipersetujui memintas cache hasil keseluruhan video supaya hasil yang dicache tidak akan dapat dimainkan semula.

Respons JSON dan SSE yang berjaya mendedahkan paling banyak empat pemegang legap dalam pengepala `x-omniroute-video-drilldown` yang dibatasi. Asal pelayar yang dibenarkan boleh membaca pengepala itu tanpa meluaskan dasar asal CORS. Pengendali baharu menggunakan `v1.<32-byte random base64url token>`, dan pendaftaran hanya mengekalkan cincang SHA-256 mereka. Penghurai reader/header juga menerima token 64-hex warisan. Pengguna awam yang disahkan adalah `GET /api/v1/video-bridge/drilldown?handle=...`, dikawal secara bebas oleh `modalityBridgeVideoDrilldownRemoteEnabled=true`. Palsu berterusan yang eksplisit membatalkan akses walaupun apabila sandaran `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env warisan didayakan. Pengekalan pengeluaran mempunyai sandaran `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` legasi yang serupa. Kedua-dua sandaran lalai dimatikan.

Pengguna memperoleh pemilikan daripada kunci yang disahkan dan menggunakan dasar utama: kedua-dua GET dan DELETE tergolong dalam kategori titik akhir `video`, termasuk alias `/v1` dan `/api/v1`. Kunci dengan senarai dibenarkan titik akhir yang tidak kosong mesti termasuk `video`; kunci tanpa had kekal serasi. Pengguna mengembalikan 404 yang sama untuk pemegang kunci yang tidak diketahui, tamat tempoh dan satu lagi kunci. Ia menerima `variant=preview|standard|detail` (dimensi JPEG maksimum 320/640/1280, tidak pernah ditingkatkan), `limit=1..8` (atau alias `frames` warisan, tidak pernah kedua-duanya), `page` berasaskan sifar dan saat fokus `start`/`end` pilihan. Kekunci pertanyaan pendua dan tetingkap fokus terbalik ditolak. Setiap varian yang dikembalikan mempunyai cincang kandungan sebenar dan metadata peleraian sebenar, dipautkan kepada sumber yang dikekalkan. Varian diperoleh apabila dibaca dan bukannya disimpan sebagai salinan simpanan tambahan. Respons JSON, termasuk Base64/envelope, dihadkan pada 32 MiB; halaman bersaiz besar mengembalikan 413 dan pelanggan mesti meminta lebih sedikit bingkai. Membaca semakan pembatalan sekitar setiap saiz semula dan menyemak semula kesahihan pemegang sebelum kembali. `DELETE` oleh pemilik adalah idempoten; pemadaman atau tamat tempoh TTL mengeluarkan sumber yang disimpan dan perakaunan penggunaan.

Kedai kongsi adalah proses setempat: pemegang tamat tempoh semasa dimulakan semula dan tidak boleh dipindahkan antara proses OmniRoute bebas. Statistik pengurusan mendedahkan pengekalan berkesan/ dasar jauh dan agregat dikekalkan entries/bytes sahaja, bukan media, rujukan, IDs atau pemegang utama. Panel tetapan Video menunjukkan nilai tersebut dan boleh mengekalkan kedua-dua suis persetujuan. Dokumentasi pelaksanaan ini bukan bukti penggunaan langsung atau promosi; penerimaan model sebenar dijejaki secara berasingan.

Bingkai diberi kapsyen secara berurutan dengan model Video yang dikonfigurasikan. Penggantian Video kosong mewarisi tetapan Visi; jika kedua-duanya kosong, penghala auto Visi memilih model berkeupayaan penglihatan yang berkesan. Kapsyen yang berjaya menggantikan bahagian asal dengan awalan `[Video description:` yang stabil yang turut menandakan teks sebagai pemerhatian terbitan media yang tidak dipercayai dan memberitahu model hiliran supaya tidak mengikut arahan yang terdapat dalam media. Kekunci cache kapsyen bingkai termasuk bait JPEG, gesaan, cap masa dan model berkesan; hanya kapsyen yang berjaya dicache. Entri cache mengekalkan model pengeluar sebenar yang berjaya, termasuk model sandaran; jambatan melaporkan `mixed` apabila bingkai yang berbeza dihasilkan oleh model yang berbeza. Hit cache menggunakan semula identiti pengeluar itu dan bukannya melabelkannya semula sebagai pelan penghalaan yang diminta. Cache hasil keseluruhan video dikunci pada setiap input yang mengubah gesaan — output, model berkesan, dasar pensampelan, kiraan bingkai, mod analisis semantik, cap jari SHA-256 bagi pembayang fokus yang dinormalkan, tetingkap fokus, `transcript`, `audioTranscript`, dan bendera helaian kenalan — jadi menukar mana-mana dimensi tersebut adalah kehilangan cache, tidak pernah basi digunakan semula. Versi dasar pelupusan visual, ambang dan kiraan bingkai calon terhad juga eksplisit dalam kunci cache hasil dan metadata; oleh itu perubahan dasar tidak boleh menggunakan semula perihalan keseluruhan video yang lapuk. Metadata v4 cache hasil mengekalkan mod dan cap jari, bukan tugas pengguna mentah. Metadata Guardrail melaporkan kedua-dua mod analisis yang diminta dan berkesan; mod `focused` yang diminta tanpa teks pengguna yang boleh digunakan dilaporkan dengan berkesan `full`.

Pagar mengekstrak setiap bahagian video yang disokong tetapi menerangkan tidak lebih daripada `modalityBridgeVideoMaxVideos`. Untuk sasaran yang terbukti mempunyai `supportsVideo === false`, video yang gagal dan lebih had menjadi penanda teks selamat yang jelas supaya tiada video mentah yang terselamat. Apabila keupayaan tidak diketahui, bahagian tersebut mengekalkan pembawa videonya; sebarang transkrip sandaran mengikuti penukaran teks terhad di atas. Sasaran dengan `supportsVideo === true` memintas jambatan. Permintaan pelanggan membatalkan isyarat disebarkan melalui muat turun, baris gilir broker, subproses dan panggilan kapsyen; membatalkan berhenti antara video dan tidak pernah gagal terbuka kepada media mentah.

Tetapan masa jalan disokong DB dan disahkan Zod:

| kunci                               | Lalai       | Julat / tingkah laku                                                                                                |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Masa jalan pilihan, ikut serta                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mengekalkan kapsyen generik; `focused` menggunakan konteks pengguna terkini yang terhad dan tidak dipercayai |
| `modalityBridgeVideoModel`          | `""`        | Warisi model Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` berkadar ; kegagalan pengesan jatuh kembali ke `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Nilai tamat masa Video berterusan lama melebihi 120 saat diapit pada tarikh akhir broker; tetapan baharu menulis di atas had itu ditolak. `GET /api/modality-bridge/video/runtime` memerlukan lokaliti gelung balik dicop dipercayai sebelum pengesahan atau penyelidikan masa jalan, kemudian memerlukan pengesahan pengurusan. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe yang telah dibersihkan dan sebab tetap apabila masa jalan tidak tersedia. Titik akhir pengekstrakan dalaman bukan muat naik awam API: ketepuan baris gilir mengembalikan `503` tambah `Retry-After`, pemanggil memutuskan sambungan mengembalikan `499` dan tarikh akhir broker tetap mengembalikan `504`. Respons yang ditukar menambahkan `video->text;model=<visionModel>;parts=<videos>` pada pengepala `x-omniroute-modality-bridge` pusat tanpa mengalih keluar segmen Visi atau Audio.

### PII Masker (`piiMasker.ts`)

berjalan terus **kedua-duanya** peringkat.

- **`preCall`** mengklonkan muatan, berjalan `system`, `messages`, `input` dan `prompt` (termasuk item rentetan biasa), dan menggunakan `processPII()` (dari `@/shared/utils/inputSanitizer`) ke rentetan medan `content`/`text`. Apabila `PII_REDACTION_ENABLED=true`, PII yang dikesan disunting dalam muatan keluar. Ini adalah bebas daripada `INPUT_SANITIZER_MODE` (yang hanya mengawal dasar suntikan segera). Apabila redaksi dimatikan, pengesanan merekodkan panggilan dikira tanpa menulis semula kandungan.
- **`postCall`** mendalamkan tindak balas, menjalankan `sanitizePIIResponse()` serta topeng bentuk Respons-API (`maskResponsesOutput` — meliputi `output_text` dan `output[].content[].text`). Jika sebarang redaksi berlaku, respons yang diubah suai menggantikan yang asal.

Pengawal tidak pernah menghalang; ia hanya memberi anotasi (`meta.detections`, `meta.redacted`) atau menulis semula.

#### Pemilihan setiap jenis, corak tersuai dan kaunter pengesanan

**Papan pemuka Tetapan → → Keselamatan → PII masking** memilih _apa_ bertopeng. Ia tidak menghidupkan pelekat: itu masih `PII_REDACTION_ENABLED` (permintaan) dan `PII_RESPONSE_SANITIZATION` (tindak balas + SSE), kedua-duanya dimatikan secara lalai.

- **Pemilihan setiap jenis** — id terbina dalam disenaraikan dalam `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nyahset bermaksud setiap jenis (tingkah laku sebelum tetapan ini wujud). Corak `ssn_us` enjin permintaan memetakan kepada `ssn`. Templat (Minimal, Standard, Kewangan, Brazil, USA, GDPR, POPIA, Penuh) hanya mengisi kotak pilihan dalam UI.
- **Pengecam GDPR dan POPIA** — dua belas id terbina dalam meliputi pengecam peribadi EU dan Afrika Selatan (jadual di bawah). Regex, pengesah dan teg bidang kuasa mereka ada dalam satu jadual, `src/shared/utils/piiPatterns.ts`, yang digunakan oleh kedua-dua sanitizer respons (`src/lib/piiSanitizer.ts`) dan masker permintaan (`src/shared/utils/inputSanitizer.ts`). Padanan disunting hanya apabila pengesahnya menerimanya; satu angka kosong tidak pernah cukup. Pengendali yang menyimpan pilihan yang disempitkan sebelum id ini wujud mengekalkan gelagat yang dimilikinya sehingga id baharu ditandakan.
- **Corak tersuai** — sehingga 20 corak regex atau kad bebas (`*` = sehingga 64 aksara bukan ruang putih, `?` = satu). Perlawanan menjadi `[CUSTOM_REDACTED]`. Setiap corak melalui `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): paling banyak 500 aksara, bendera terhad kepada `g i m s u`, mesti disusun, mesti melepasi `safe-regex` (penjejakan belakang bencana), dan tidak boleh sepadan dengan rentetan kosong atau pemegang tempat redaksi. Corak yang gagal ditolak apabila disimpan dan apabila diuji, dan baris tersimpan yang gagal dilangkau pada masa jalan dan bukannya dikompilasi. Corak tersuai hanya berjalan semasa topeng dihidupkan.
- **Kaunter pengesanan** Kiraan setiap jenis — (nilai tidak pernah sepadan), disimpan dalam memori dan tetapkan semula semasa dimulakan semula (`src/lib/pii/piiDetectionStats.ts`). Mereka hanya meningkat semasa topeng dihidupkan.

Tetapan hidup dalam jadual `key_value` (ruang nama `pii_settings`, `src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 s. API:

| Kaedah | Laluan                   | Tujuan                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Keadaan flag, `enabledTypes`, `customPatterns`, pembilang pengesanan |
| `PUT`  | `/api/settings/pii`      | Gantikan `enabledTypes` (`null` = semua) dan/atau `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Dry-run satu corak terhadap sampel maksimum 8 KB; tiada apa disimpan |

Ketiganya memerlukan pengesahan pengurusan dan mengesahkan badan dengan Zod (`src/shared/validation/schemas/piiSettings.ts`). Dengan log masuk dilumpuhkan (`requireLogin=false`) `GET` dan titik akhir ujian dibuka, tetapi `PUT` masih memerlukan sesi papan pemuka, kunci `manage` -scope API, token akses `oma_` dengan skop tulis atau lebih tinggi, atau token CLI atau token perkhidmatan dalaman yang dihantar dari gelung balik.

#### Pengecam GDPR (EU) dan POPIA (Afrika Selatan).

| Id                  | Pengenal                     | Pengesahan                                                                               |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `iban`              | IBAN                         | Negara dikenali, panjang tepat bagi negara itu, ISO 13616 MOD-97-10                      |
| `eu_vat`            | Nombor VAT Kesatuan Eropah   | Awalan negara anggota dikenali dan format nombor negara itu (tanpa carian VIES)          |
| `es_dni_nie`        | DNI / NIE Sepanyol           | Huruf kawalan (nilai mod 23); NIE ialah `X/Y/Z` + 7 digit                                |
| `it_codice_fiscale` | Codice Fiscale Itali         | Huruf kawalan daripada jadual kedudukan ganjil/genap                                     |
| `pl_pesel`          | PESEL Poland                 | Checksum berwajaran dan julat bulan/hari lahir terenkod yang munasabah                   |
| `nl_bsn`            | BSN Belanda                  | Ujian 11 (wajaran 9..2, -1)                                                              |
| `de_steuer_id`      | Steuer-ID Jerman             | ISO 7064 Mod 11,10 serta peraturan struktur digit (tiada 0 di hadapan)                   |
| `se_personnummer`   | personnummer Sweden          | Luhn pada sepuluh digit terakhir dan tarikh lahir munasabah (10 atau 12 digit)           |
| `za_id`             | Nombor ID Afrika Selatan     | Luhn pada kesemua 13 digit, bulan/hari lahir sah, digit kewarganegaraan 0 atau 1         |
| `za_phone`          | Telefon Afrika Selatan       | Awalan `+27` / `27`, atau bentuk kebangsaan `0..` yang ditulis dengan ruang atau sempang |
| `za_vat`            | Nombor VAT Afrika Selatan    | 10 digit bermula dengan `4` **dan** "VAT" / "BTW" dalam 48 aksara sebelumnya             |
| `za_tax_ref`        | Rujukan cukai Afrika Selatan | 10 digit bermula `0`-`3`, Luhn, **dan** "tax" / "SARS" dalam 48 aksara sebelumnya        |

Oleh kerana format digit sahaja bertembung dengan nombor pesanan, nombor binaan dan cap masa, yang paling lemah (`za_vat`, `za_tax_ref`) memerlukan isyarat kata kunci dan nombor `0..` sepuluh digit kosong tidak dianggap sebagai nombor telefon Afrika Selatan. IBANs Berjarak (`GB29 NWBK ...`) tidak sepadan. Pada laluan penstriman isyarat dilihat di dalam bahagian semasa sahaja. Id berada di hadapan corak telefon generik, jadi pengecam yang disahkan mengekalkan pemegang tempatnya sendiri (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Templat `gdpr` dan `popia` masing-masing memilih id EU dan Afrika Selatan. Masking sendiri kekal ikut serta (Hard Rule #20): tiada apa-apa di sini mengubah lalai bendera ciri.

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
