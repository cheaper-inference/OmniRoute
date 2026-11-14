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

## Pengawal Terbina dalam

Pendaftaran automatik memuatkan enam pagar dalam susunan keutamaan semasa import (lihat `registry.ts` → `registerDefaultGuardrails()`):

| Keutamaan | Nama                | Peringkat      | Fail                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nombor keutamaan yang lebih rendah dijalankan** pertama** .

### Jambatan Penglihatan (`visionBridge.ts`) — Jambatan Modaliti PR-1

Model asas GLM 5.3 dan `glm-5.3-{low,high,max}` mempunyai metadata `supportsVision:false` registry/spec yang jelas. Varian GLM 5.3 Flash kekal sebagai model penglihatan asli. Laluan `/v1/messages` Kod Claude memasuki rantaian pagar pra-panggilan `handleChat` yang dikongsi** sebelum ini** Terjemahan Claude-to-OpenAI; imej hasil alat `Read` bersarang mesti diterangkan atau dikendalikan sebelum terjemahan itu mengangkatnya ke dalam kandungan OpenAI `image_url` (#17069).

Memintas permintaan yang mengandungi imej yang ditujukan** model bukan penglihatan** dan sama ada mengalihkan keseluruhan permintaan kepada model berkeupayaan penglihatan atau menggantikan bahagian imej dengan penerangan teks yang dihasilkan oleh model penglihatan boleh dikonfigurasikan sebelum panggilan huluan. Ini membolehkan penyedia teks sahaja mengendalikan muatan berbilang mod dengan telus.

Aliran:

1. Langkau jika model sasaran sudah menyokong penglihatan (melainkan jika ia muncul dalam senarai jambatan paksa `isVisionBridgeForcedModel`).
2. Ekstrak bahagian imej melalui `extractImageParts(messages)` (`visionBridgeHelpers.ts`), yang mewakilkan kepada** pengesan media bersatu** `detectMediaParts()` dalam `open-sse/utils/mediaParts.ts` — sumber tunggal kebenaran yang dikongsi dengan penapis keserasian kombo. Pengekstrakan dibenarkan kepada bentuk `replaceImageParts` boleh sambung kembali (ekstrak ↔ menggantikan kontrak): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, dan Responses API `input_image`. Imej yang sepadan yang bersarang di dalam Kod Claude `tool_result.content` dan Output alat Respons juga diekstrak dan diganti pada laluan asalnya; bentuk penunjuk sahaja adalah bahan penapis kombo dan tidak diekstrak. Langkau jika tiada ditemui.
3. Selesaikan konfigurasi masa jalan melalui `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): kunci tetapan `modalityBridge*` baharu menang; kunci `visionBridge*` warisan kekal a** sandaran satu kitaran** (tingkap balik). Langkau sebelum sebarang laluan media apabila jambatan dilumpuhkan.
4. Pemilih mod (`modalityBridgeVisionMode`, lihat jadual di bawah) memutuskan laluan semula vs huraikan. Laluan semula mengembalikan `modifiedPayload` dengan hanya `model` ditukar, ditambah dengan meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Huraikan laluan: tutup imej di `maxImages`, karang gesaan sedar tugas, rujuk cache huraikan, panggil model penglihatan** selari** (`Promise.allSettled`), dan menyuntik bahagian teks `[Image N]: <description>` di tempatnya. Perihalan yang gagal menghasilkan `null`: imej mentah dikekalkan untuk sasaran unknown/vision-capable (#4012), tetapi** sasaran langsung teks sahaja yang disahkan** atau kombo sifar penglihatan mendapat stub teks `(unavailable — no vision-capable provider connected)` eksplisit untuk setiap imej yang tidak diterangkan, termasuk kegagalan separa dan imej di luar had huraikan-panggilan (#17069). Kombo semua gagal yang sedia ada menggambarkan sandaran kekal di tempatnya (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Pemilih mod (`modalityBridgeVisionMode`)

| Mod        | Lalai | Tingkah laku                                                                                                                                                                                                                                                                                                          |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Heuristik warisan, tidak disentuh (#6640/#7204): model bukan kombo/`auto/` ubah hala ke model penglihatan terbaik melainkan model asal sudah mempunyai kelayakan yang boleh digunakan (kemudian huraikan); sasaran kombo sentiasa menerangkan.                                                                        |
| `describe` |       | Sentiasa huraikan — blok laluan semula dilangkau sepenuhnya; model pilihan pengguna sentiasa menjawab.                                                                                                                                                                                                                |
| `reroute`  |       | Paksa ubah hala: pengawal model yang mempunyai kelayakan dipintas. Laluan semula-** sasaran** pengawal kelayakan masih menggunakan — apabila tiada sasaran penglihatan yang boleh digunakan wujud, jambatan menyekat dengan ralat yang jelas daripada menerangkan atau menghantar imej mentah ke sasaran teks sahaja. |

Mod paksa litar pintas** sebelum ini** auto heuristik berjalan; Tingkah laku `auto` adalah sama bait dengan pagar pre-PR-1.

#### Skop kunci API (`visionBridgeKeyScope.ts`)

Apabila kunci API pemanggil mengehadkan `allowedConnections`, kumpulan kuota (`allowedQuotas`) atau model (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), jambatan hanya memilih laluan semula dan menerangkan model yang mungkin digunakan oleh kunci, pada sambungan yang mungkin digunakan oleh kunci. Panggilan huraikan kemudiannya sentiasa melalui gelung kendiri OmniRoute dengan pengepala `x-omniroute-self-loop-key-id`, jadi permintaan sembang yang menerima menguatkuasakan sambungan kunci itu dan dasar model sekali lagi. `enforceApiKeyPolicy()` menghormati pengepala itu hanya bersama-sama dengan pembawa gelung kendiri, jadi ia hanya boleh menyempitkan akses dan id yang tidak diselesaikan akan ditolak.

Jika tiada model penglihatan dibenarkan untuk kunci, a** sasaran teks sahaja yang disahkan** menolak permintaan imej secara setempat dengan HTTP 400 yang jelas dan bukannya memajukan bait imej ke hulu yang tidak mampu (#17069). Untuk sasaran dengan keupayaan penglihatan yang tidak diketahui atau asli, laluan huraikan mengekalkan gelagat gagal terbuka sebelumnya (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Permintaan tanpa kunci, dan kunci tanpa sekatan ini, berkelakuan sama seperti sebelumnya.

#### gesaan huraikan peka tugas (`modalityBridgeVisionTaskAware`)

Lalai** benar** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan teks bagi** mesej pengguna terakhir** (dipotong kepada 500 aksara) kepada gesaan penerangan asas, mengarahkan penerangan ke arah perkara yang sebenarnya ditanya oleh pengguna (corak proksi penglihatan codex) dan meminta model penglihatan menyalin teks yang boleh dilihat. Dengan tanda dimatikan — atau tiada teks pengguna — gesaan asas digunakan tidak berubah.

Perihalkan permintaan serasi OpenAI sendiri gelung sendiri (`callVisionModelSingle()` dalam `visionBridgeHelpers.ts`) sentiasa meminta `image_url.detail: "high"` — tanpa syarat, untuk setiap caller/provider, tidak berpagar pada mana-mana isyarat pelanggan. Pensampelan terperinci rendah merendahkan ketepatan OCR untuk tugas transkripsi teks yang diminta oleh gesaan ini, jadi panggilan huraikan itu sendiri sentiasa meminta butiran tinggi tanpa mengira tahap butiran apa yang digunakan oleh permintaan masuk asal. Ini hanya mempengaruhi badan permintaan penerangan dalaman; ia tidak mengubah cara OmniRoute memajukan `image_url.detail` pemanggil sendiri pada — permintaan utama yang lalai digunakan secara berasingan, dan hanya untuk pelanggan OpenCode yang dikesan, dalam `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cawangan format wayar Anthropic bagi gelung kendiri huraikan tidak mempunyai medan `detail` dan tidak terjejas oleh mana-mana lalai.

#### Terangkan had keluaran (`modalityBridgeVisionMaxChars`)

| kunci                          | Lalai | Julat              |
| ------------------------------ | ----- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`   | `0` atau 100–50000 |

`0` (lalai) bermaksud** tiada topi** — perihalan yang dikembalikan oleh `callVisionModel()` diteruskan tanpa diubah suai, mengekalkan tingkah laku sedia ada. Sebarang nilai dalam julat 100–50000 memotong perihalan dengan akhiran `…` sebelum ia disambung semula sebagai `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dalam `src/lib/guardrails/visionBridge.ts`). Naikkan ini untuk tugasan OCR yang berat terperinci di mana model hiliran memerlukan transkripsi penuh; turunkannya kepada penggunaan token terikat pada model penglihatan cerewet. Medan papan pemuka hidup pada panel Lanjutan tab Visi (`modality-bridge-max-chars` dalam `ModalityBridgeVisionTab.tsx`) dan mengapit sebarang nilai antara 1 dan 99 sehingga tingkat 100 sambil membiarkan `0` yang jelas tidak disentuh — `0` ialah nilai Zod yang sah dengan sendirinya (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan sekadar lalai "tidak ditetapkan".

#### Terangkan cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam ingatan untuk menerangkan output, dikongsi seluruh proses. = `sha256(imageRef + composedPrompt + configuredBridgeModel)` kunci dengan pembingkaian awalan panjang (tiada perlanggaran sempadan medan). Komponen model ialah** dikonfigurasikan** model jambatan, bukan model yang sebenarnya menjawab — `callVisionModel` mungkin akan kembali secara dalaman, dan kekunci setiap percubaan akan memecah cache. Perihalan yang gagal tidak pernah dicache. tetapan:

| kunci                           | Lalai  | Julat   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalisasi imej jauh (gelung kendiri describe/base64 ambil)

Apabila jambatan mengambil a** jauh** imej itu sendiri — Anthropic menerangkan panggilan kendiri dan penukaran base64 format claude-wire (`ensureBase64ImagesForClaudeWire`), kedua-duanya melalui `fetchRemoteImageAsDataUri()` dalam `visionBridgeHelpers.ts` — data yang terhasil URI dihantar melalui `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sebelum dibenamkan dalam permintaan model penglihatan. Imej bersaiz besar dikecilkan kepada a** 2048px tepi panjang** (memadankan had ubah saiz OpenAI/Anthropic sudah digunakan di bahagian pelayan), yang memotong muat naik bytes/latency tanpa mengubah perkara yang dilihat oleh model penglihatan. Saiz semula menggunakan `sharp`, dimuatkan melalui import dinamik: pada platform yang perduaan asalnya gagal dimuatkan, `normalizeDataUri()`** tidak pernah membuang** — ia kembali kepada laluan lalu bait asal, jadi laluan describe/base64-conversion sentiasa berfungsi. Bait bukan imej (pengambilan yang tidak mengembalikan imej yang boleh dinyahkod) juga disalurkan tanpa disentuh. Normalisasi ini merangkumi imej yang diambil oleh jambatan untuk — panggilan kendirinya sendiri. Ia tidak pernah digunakan pada muatan laluan mentah pemanggil, selaras dengan prinsip mutasi ikut serta sahaja (Peraturan Keras #20).

#### Skema tetapan migrasi +

Kekunci `modalityBridge*` baharu adalah Zod-disahkan dalam `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio dan kumpulan `modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Penghijrahan `141_modality_bridge_settings.sql` menyalin nilai `visionBridge*` warisan sedia ada ke kunci baharu yang sepadan (idempoten, tidak pernah menimpa nilai `modalityBridge*` set operator); kunci warisan kekal diterima sebagai sandaran baca untuk satu kitaran keluaran.

#### Tajuk ketelusan + statistik

Huraikan-transformasi respons membawa `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (dibina oleh `buildModalityBridgeHeader()` dalam `modalityBridge/bridgeStats.ts`, dicap oleh `withModalityBridgeHeader()` dalam `src/sse/handlers/chatHelpers.ts`). Permintaan dihalakan semula mendapat** tidak** pengepala — muatan tidak disentuh dan pertukaran model sudah kelihatan dalam medan `model` badan tindak balas.

`GET /api/modality-bridge/stats` (pengesahan pengurusan, peringkat yang sama dengan `GET /api/settings`) mengembalikan pembilang per moditi dalam ingatan `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio` dan `video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percubaan, sebagai penyebutnya; operasi tanpa pemasaan tidak menghasilkan sampel sifar milisaat. `bridged` kekal sebagai alias serasi ke belakang untuk penukaran yang berjaya; percubaan yang gagal tidak menambahnya. Kaunter ditetapkan semula semasa proses dimulakan semula mengikut reka bentuk (telemetri, bukan perakaunan).

#### Konfigurasi papan pemuka

Halaman papan pemuka khusus ialah `/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio` dan `Video` yang boleh dialamatkan URLnya mengekalkan parameter pertanyaan sambil menukar nilai `tab`. Tab Visi mendedahkan pembolehan, mod, pemilihan model (termasuk lalai automatik), gesaan sedar tugas, had timeout/image/description-length/cache lanjutan, pembilang masa jalan dan permintaan sampel terkawal. Tab Audio juga disiarkan secara langsung: ia mendedahkan pendayaan, pemilih model STT sahaja dengan Auto, had timeout/max-clip, pembilang audio dan ujian sampel `input_audio`. Tab Video berfungsi: ia melaporkan keadaan masa jalan FFmpeg/ffprobe — satu daripada empat keadaan UI eksplisit (`unknown` semasa siasatan sedang dalam penerbangan atau tidak dapat dilengkapkan, `restricted` pada hos papan pemuka bukan gelung belakang di mana siasatan dilangkau sisi klien, `unavailable` sekali disiasat dan disahkan hilang, atau `available` dengan versi FFmpeg/ffprobe tetap boleh menapis — model enable/model/frame/video/timeout -caps) model, dan mendedahkan kaunter video.

Kad Vision Bridge dahulu di bawah tetapan AI ialah pautan keserasian ke halaman baharu; ia tidak lagi memiliki salinan kedua borang itu. Pembekal Media juga memautkan aliran kerja Imej-ke-Teks dan Pertuturan-ke-Teks ke tab Modality Bridge yang sepadan tanpa mengalih keluar taman permainan Pertuturan-ke-Teks sedia ada.

**Pintasan kemasukan gelung sendiri:** apabila laluan huraikan panggilan melalui OmniRoute sendiri `/v1` gelung sendiri (model pembekal bukan standard), sub-permintaan menghantar `x-omniroute-admission-bypass: internal` dan disahkan dengan bukti kelayakan gelung kendiri yang diselesaikan — pengawal `sk_omniroute` tempatan dalam mod tempatan, atau `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env yang dikonfigurasikan pengendali (#1350) supaya `REQUIRE_API_KEY=true` tetapan boleh dijalankan. Pintasan hanya diberikan untuk kelayakan yang tepat tersebut, jadi pelanggan luar tidak boleh menggunakan pengepala untuk melangkau kemasukan.

Tetapan lalai warisan secara langsung dalam `src/shared/constants/visionBridgeDefaults.ts`; lalai mode/task-aware/cache baharu dan penyelesai tetapan hidup dalam `src/shared/constants/modalityBridgeDefaults.ts`. Pagar pembatas mendedahkan pilihan pembina `deps` supaya ujian boleh menyuntik pelaksanaan `getSettings` dan `callVisionModel` palsu.

### Jambatan Audio (`audioBridge.ts`) — Jambatan Modaliti PR-3

Memintas permintaan sembang yang mengandungi audio sebelum ia mencapai sasaran yang tidak diketahui menerima input audio. Ia tidak pernah mengubah hala permintaan sembang: bahagian audio ditranskripsikan melalui titik akhir berbilang bahagian yang serasi OpenAI sedia ada dan model sembang yang dipilih diteruskan dengan transkrip teks.

Aliran:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata pendaftaran pembekal yang jelas menang, kemudian metadata model statik, kemudian disegerakkan `modalities_input`. Senarai input yang diisytiharkan tanpa `audio` ialah `false`; tiada bukti keupayaan kekal `null`. Kedua-dua `false` dan `null` mengaktifkan jambatan konservatif, manakala `true` memintasnya.
2. Selesaikan tetapan `modalityBridgeAudio*` dan ekstrak bahagian audio peringkat atas yang boleh disambung daripada setiap mesej melalui pengesan `detectMediaParts()` yang dikongsi. Bentuk wayar yang disokong ialah OpenAI `input_audio`, `audio_url` dan `source.media_type: "audio/*"`. Audio bersarang dikesan untuk penghalaan tetapi tidak dialih keluar oleh laluan splice. Kerja dihadkan oleh `modalityBridgeAudioMaxClips`; bahagian kemudiannya tetap tidak disentuh.
3. Hormati `provider/model` yang dikonfigurasikan, atau biarkan `selectAudioBridgeModel()` berjalan `AUDIO_TRANSCRIPTION_PROVIDERS` dalam susunan katalog yang stabil dan pilih model pertama dengan bukti kelayakan penyedia aktif yang boleh digunakan.
4. `callAudioTranscription()` menukar audio base64/data-URI kepada `file` berbilang bahagian, atau memuat turun `audio_url` jauh melalui pengawal keluar awam sahaja dengan penyematan DNS dan sempadan 25 MB. Ia kemudian POSTs fail dan model yang dipilih ke gelung kendiri `/v1/audio/transcriptions` tempatan, disahkan dengan `resolveSelfLoopBearer()`. Laluan transkripsi sedia ada melakukan carian kelayakan biasa, pengendalian cooldown/rate-limit dan penghantaran pembekal.
5. Panggilan yang berjaya menggantikan bahagiannya dengan `[Audio N]: <transcript>`. Panggilan dijalankan dengan `Promise.allSettled`: kegagalan individu mengekalkan bahagian audio asal itu ( kontrak #4012 ). Jika setiap panggilan gagal dan sasaran terbukti `supportsAudio === false`, bahagian menjadi `[Audio N]: (unavailable — no STT provider connected)` ( kontrak #8430 ). Untuk sasaran yang tidak diketahui (`null`), hasil semua kegagalan kekal tidak disentuh. Sasaran teks sahaja yang terbukti tanpa bukti kelayakan STT yang boleh digunakan menerima stub eksplisit yang sama tanpa mengeluarkan panggilan rangkaian.

Transkrip yang berjaya menggunakan cache LRU/TTL Modality Bridge seluruh proses. Kekunci menggabungkan rujukan audio, label operasi `audio-transcription` yang stabil dan model STT terpilih; kegagalan tidak pernah di-cache. Percubaan audio mengemas kini pembilang `bridged`, `cacheHits`, `failures` dan `lastUsedAt` yang dikongsi. Respons yang diubah membawa `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan yang tidak disentuh tidak menerima segmen Jambatan Audio.

Tetapan masa jalan disokong DB dan disahkan Zod:

| kunci                         | Lalai   | Julat            |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto atau STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Cache yang dikongsi kekal dikawal oleh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` dan `modalityBridgeCacheMaxEntries`.

### Jambatan Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Memintas bahagian video peringkat atas dalam Pelengkapan Sembang `messages` dan Respons API `input` sebelum sasaran tanpa sokongan video asli yang diketahui dipanggil. Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`, HTTPS URLs dan `data:video/*;base64,...` data URIs. Nama fail biasa dalam teks tidak dianggap sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki traversal permintaan, cek capability/policy, pengagregatan setiap permintaan dan muatan respons. Pemerolehan — kerja setiap video, cache hasil keseluruhan, menerangkan jujukan bingkai (yang menggabungkan mana-mana transkrip audio yang diisytiharkan oleh pemanggil), dan metrics/abort/cleanup — setiap percubaan tersembunyi di belakang `processVideoPart` dalam `videoBridgePipeline.ts`, dipanggil sekali setiap bahagian video dalam gelung `preCall`. Modul itu juga mentakrifkan sempadan port eksplisit `VideoMediaBrokerPort` (memperoleh bait dan mengekstrak bingkai sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang diisytiharkan pemanggil dengan kapsyen sampel) dan `VideoDrilldownPort` (bentuk kedai mentah warisan). Pengeluaran STT dan pengekalan bingkai terdiri di sekitar port penggambaran melalui `createVideoSttAdapter` dan `createVideoDrilldownAdapter`; yang kedua menggunakan kitaran hayat pemegang legap yang dikongsi.

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

Bukti promosi sengaja dipisahkan daripada penanda aras komposisi sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan abah-abah A/B versi skema untuk model penglihatan serasi OpenAI sebenar. Ia mengukur token yang dilaporkan pembekal, kependaman dinding hujung ke hujung (termasuk komposisi helaian), kiraan panggilan model dan pengekalan fakta yang ditakrifkan secara nyata. Respons model mentah tidak ditulis pada laporan; hanya SHA-256 digest dan fakta dipadankan IDs dikekalkan. Abah-abah tidak membuat panggilan rangkaian atau model berbayar melainkan `--execute-real` diluluskan dan `--model`, `OMNIROUTE_BASE_URL` dan `OMNIROUTE_API_KEY` dikonfigurasikan. Tanpa larian sebenar yang jelas itu, keputusan yang boleh dibaca mesinnya kekal `HOLD`; ukuran payload/call-count sintetik sahaja bukanlah bukti promosi.

`scripts/perf/video-bridge-promotion-eval.ts` yang berasingan menggunakan pemerhatian FU-07 atau FU-09. Kemasukan kenaikan pangkat memerlukan kesemua lapan jenis senario sintetik serta klip sebenar yang telah dibersihkan, sekurang-kurangnya tiga ulangan terukur bagi setiap peranan dan kes, kesemua sepuluh metrik yang diisytiharkan, ringkasan media/prompt/expected-fact/settings beku, IDs pemerhatian unik dan pesanan A/B berbiji yang disahkan. Resit pelaksanaan mengikat corpus digest, calon tepat SHA dan semakan model. Ukuran yang tiada atau tidak sah kekal `HOLD`, termasuk CPU melebihi 30 saat, RSS puncak melebihi 512 MiB atau pra-analisis melebihi 30 saat. Ini adalah had kemasukan bukti, bukan jaminan penguatkuasaan RSS masa jalan baharu.

FU-07 memerlukan sekurang-kurangnya 98% pengekalan kualiti dan kependaman p95 tidak lebih daripada 1.2x garis dasar, ditambah sama ada 0.05 penambahbaikan min ingatan semula seimbang kes mutlak pada min panggilan kapsyen bersamaan atau sekurang-kurangnya 10% kurang min panggilan kapsyen pasca-penutup. FU-09 memerlukan sekurang-kurangnya 0.85 kualiti, 95% pengekalan, 20% pengurangan kependaman median dan 10% pengurangan token. Kehilangan fakta kritikal, pematuhan suntikan atau kehilangan penggunaan menghalang promosi. Satu pelaksanaan tidak boleh mempromosikan apa-apa: `--previous-report` mengesahkan dua pelaksanaan yang berbeza, tidak bertindih, layak berturut-turut bagi policy/model revision/candidate/corpus. yang sama Percubaan pensampelan tidak boleh mengesahkan percubaan helaian kenalan.

Pengumpul hendaklah menjaringkan respons dalam ingatan dan menyimpan `responseDigest` tambah metrik dan pengikatan pemerhatian, jangan sekali-kali teks respons. Pengguna juga membaca pemerhatian mentah warisan tetapi tidak pernah menyalin teks itu ke dalam laporannya. Tepat satu daripada `responseDigest` atau `rawResponseText` diterima untuk setiap pemerhatian. Senarai dibenarkan versi kekal kosong dengan lalai `hold` yang tidak boleh diubah. Penyertaan yang layak memerlukan rujukan bukti, dasar, semakan model, SHA calon tepat, ringkasan nyata dan dua IDs larian yang berbeza; konteks yang bercanggah ditolak. Metadata ini adalah kontrak audit, bukan bukti bahawa fail yang dirujuk mengandungi ukuran tulen. Semak resit sebenar sebelum menambah sebarang entri. Titik akhir statistik pengurusan dan papan pemuka Video mendedahkan kesediaan konservatif. Alias model yang dikonfigurasikan sahaja tidak menetapkan semakannya atau calon yang sedang berjalan SHA, jadi papan pemuka semasa melaporkan `HOLD` dan bukannya menggunakan semula kelayakan daripada konteks pelaksanaan yang lain. Pemilihan percubaan eksplisit kekal berasingan daripada promosi; tiada lalai diubah secara automatik.

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

Pengguna memperoleh pemilikan daripada kunci yang disahkan dan menggunakan dasar utama: kedua-dua GET dan DELETE tergolong dalam kategori titik akhir `video`, termasuk alias `/v1` dan `/api/v1`. Kunci dengan senarai dibenarkan titik akhir yang tidak kosong mesti termasuk `video`; kunci tanpa had kekal serasi. Pengguna mengembalikan 404 yang sama untuk pemegang kunci yang tidak diketahui, tamat tempoh dan satu lagi kunci. Ia menerima `variant=preview|standard|detail` (dimensi JPEG maksimum 320/640/1280, tidak pernah ditingkatkan), `limit=1..8` (atau alias `frames` warisan, tidak pernah kedua-duanya), `page` berasaskan sifar dan saat fokus `start`/`end` pilihan. Kekunci pertanyaan pendua dan tetingkap fokus terbalik ditolak. Setiap varian yang dikembalikan mempunyai cincang kandungan sebenar dan metadata peleraian sebenar, dipautkan kepada sumber yang dikekalkan. Varian diperoleh apabila dibaca dan bukannya disimpan sebagai salinan simpanan tambahan. Respons JSON, termasuk Base64/envelope, dihadkan pada 32 MiB; halaman bersaiz besar mengembalikan 413 dan pelanggan mesti meminta lebih sedikit bingkai. Membaca pembatalan semakan di sekeliling setiap saiz semula dan menyemak semula kesahihan pemegang sebelum kembali. `DELETE` oleh pemilik adalah idempoten; pemadaman atau tamat tempoh TTL mengeluarkan sumber yang disimpan dan perakaunan penggunaan.

Kedai kongsi adalah proses setempat: pemegang tamat tempoh semasa dimulakan semula dan tidak boleh dipindahkan antara proses OmniRoute bebas. Statistik pengurusan mendedahkan pengekalan berkesan/ dasar jauh dan agregat dikekalkan entries/bytes sahaja, tidak sekali-kali media, rujukan, IDs atau pemegang utama. Panel tetapan Video menunjukkan nilai tersebut dan boleh mengekalkan kedua-dua suis persetujuan. Dokumentasi pelaksanaan ini bukan bukti penggunaan langsung atau promosi; penerimaan model sebenar dijejaki secara berasingan.

Bingkai diberi kapsyen secara berurutan dengan model Video yang dikonfigurasikan. Penggantian Video kosong mewarisi tetapan Visi; jika kedua-duanya kosong, penghala auto Visi memilih model berkeupayaan penglihatan yang berkesan. Kapsyen yang berjaya menggantikan bahagian asal dengan awalan `[Video description:` yang stabil yang turut menandakan teks sebagai pemerhatian terbitan media yang tidak dipercayai dan memberitahu model hiliran supaya tidak mengikut arahan yang terdapat dalam media. Kekunci cache kapsyen bingkai termasuk bait JPEG, gesaan, cap masa dan model berkesan; hanya kapsyen yang berjaya dicache. Entri cache mengekalkan model pengeluar sebenar yang berjaya, termasuk model sandaran; jambatan melaporkan `mixed` apabila bingkai yang berbeza dihasilkan oleh model yang berbeza. Hit cache menggunakan semula identiti pengeluar itu dan bukannya melabelkannya semula sebagai pelan penghalaan yang diminta. Cache hasil keseluruhan video dikunci pada setiap input yang mengubah gesaan — output, model berkesan, dasar pensampelan, kiraan bingkai, mod analisis semantik, cap jari SHA-256 bagi pembayang fokus yang dinormalkan, tetingkap fokus, `transcript`, `audioTranscript`, dan bendera helaian kenalan — jadi menukar mana-mana dimensi tersebut adalah kehilangan cache, tidak pernah basi digunakan semula. Versi dasar deup visual, ambang dan kiraan bingkai calon terhad juga jelas dalam kunci cache hasil dan metadata; oleh itu perubahan dasar tidak boleh menggunakan semula perihalan keseluruhan video yang lapuk. Metadata v4 cache hasil mengekalkan mod dan cap jari, bukan tugas pengguna mentah. Metadata Guardrail melaporkan kedua-dua mod analisis yang diminta dan berkesan; mod `focused` yang diminta tanpa teks pengguna yang boleh digunakan dilaporkan dengan berkesan `full`.

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

berjalan terus** kedua-duanya** peringkat.

- **`preCall`** mengklonkan muatan, berjalan `system`, `messages`, `input` dan `prompt` (termasuk item rentetan biasa), dan menggunakan `processPII()` (dari `@/shared/utils/inputSanitizer`) ke medan `content`/`text` rentetan. Apabila `PII_REDACTION_ENABLED=true`, PII yang dikesan disunting dalam muatan keluar. Ini adalah bebas daripada `INPUT_SANITIZER_MODE` (yang hanya mengawal dasar suntikan segera). Apabila redaksi dimatikan, pengesanan merekodkan panggilan dikira tanpa menulis semula kandungan.
- **`postCall`** mendalamkan tindak balas, menjalankan `sanitizePIIResponse()` serta topeng bentuk Respons-API (`maskResponsesOutput` — meliputi `output_text` dan `output[].content[].text`). Jika sebarang redaksi berlaku, respons yang diubah suai menggantikan yang asal.

Pengawal tidak pernah menghalang; ia hanya menganotasi (`meta.detections`, `meta.redacted`) atau menulis semula.

**Bilik kebal boleh diterbalikkan (`PII_REVERSIBLE_VAULT_ENABLED`, `false` lalai ).** Apabila kedua-dua `PII_REDACTION_ENABLED` dan `PII_REVERSIBLE_VAULT_ENABLED` dihidupkan (DB override > env > lalai, baca sekali setiap permintaan), `handleChat` membuka satu bilik kebal bagi setiap permintaan pelanggan (`src/lib/pii/requestTokenVaultScope.ts`) dan menghantarnya ke pas pra-panggilan sebagai `GuardrailContext.tokenVault`. Masker kemudian menulis token pengganti seperti `<<PII_EMAIL_QWERTYUI_1>>` dan bukannya `[EMAIL_REDACTED]`, untuk peraturan terbina dalam, disahkan (GDPR/POPIA) dan tersuai. Nonce ialah 8 huruf besar rawak setiap permintaan, dan nilai yang sama mendapat token yang sama dalam permintaan. Hanya topeng pudina: pengawal suntikan segera dan `/api/guardrails/test` berjalan tanpa peti besi dan mengekalkan ruang letak.

- Pembekal, setiap kaki kombo, cuba semula, ahli panel gabungan dan hakim gabungan melihat token sahaja. Token dipulihkan sekali, pada respons 2xx yang meninggalkan `handleChat`: setiap medan pada SSE yang dihuraikan (pemisahan token merentas peristiwa masih diselesaikan; argumen panggilan alat dilepaskan dari JSON) atau setiap medan pada badan JSON, dengan `Content-Length` yang dikira semula. Teks kandungan dan penaakulan serta argumen panggilan alat dipulihkan. Badan ralat (4xx/5xx) menyimpan token.
- Kegagalan kekal peribadi: jika pencetakan gagal atau peti besi menolak nilai (1000 entri, 256 aksara setiap nilai, 64 KB kesemuanya), pemegang tempat ditulis sebaliknya; token peti besi tidak dapat diselesaikan, atau pemulihan yang gagal, kekal literal dan hanya kiraan dilog. Bilik kebal tidak mempunyai pemasa dan tiada keadaan global; ia dikosongkan apabila aliran respons tamat, dibatalkan atau ralat.
- Apabila permintaan mencetak token, pengekstrakan memori, penjimatan idempotensi dan kedua-dua penulisan cache semantik dilangkau, kerana tiada permintaan kemudian dapat menyelesaikan token tersebut. Dalam log panggilan permintaan pembekal dan respons membawa token; badan permintaan pelanggan yang dilog masih merupakan input pelanggan mentah, seperti dengan redaksi biasa.
- Token menggunakan nonce rawak setiap permintaan, jadi awalan gesaan berubah setiap kali: caching gesaan pihak penyedia tidak terkena untuk pusingan bertopeng dan token yang datang kembali dalam giliran kemudian (contohnya melalui `previous_response_id`) tergolong dalam permintaan lama dan kekal literal.

#### Pemilihan setiap jenis, corak tersuai dan kaunter pengesanan

**Papan pemuka → Tetapan → Keselamatan → PII masking** memilih _apa_ bertopeng. Ia tidak menghidupkan masking: iaitu masih `PII_REDACTION_ENABLED` (permintaan) dan `PII_RESPONSE_SANITIZATION` (respons + SSE), kedua-duanya dimatikan secara lalai.

- **Pemilihan setiap jenis** — id terbina dalam disenaraikan dalam `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Tidak ditetapkan bermaksud setiap jenis (tingkah laku sebelum tetapan ini wujud). Corak `ssn_us` enjin permintaan memetakan kepada `ssn`. Templat (Minimal, Standard, Kewangan, Brazil, USA, GDPR, POPIA, Penuh) hanya mengisi kotak pilihan dalam UI.
- **GDPR dan POPIA** — dua belas id terbina dalam meliputi EU dan pengecam peribadi Afrika Selatan (jadual di bawah). Regeks, pengesah dan teg bidang kuasa mereka tinggal dalam satu jadual, `src/shared/utils/piiPatterns.ts`, yang digunakan oleh kedua-dua sanitizer respons (`src/lib/piiSanitizer.ts`) dan masker permintaan (`src/shared/utils/inputSanitizer.ts`). Padanan disunting hanya apabila pengesahnya menerimanya; satu angka kosong tidak pernah cukup. Pengendali yang menyimpan pilihan yang disempitkan sebelum id ini wujud mengekalkan gelagat yang dimilikinya sehingga id baharu ditandakan.
- **Corak tersuai** — sehingga 20 corak regex atau kad bebas (`*` = sehingga 64 aksara bukan ruang putih, `?` = satu). Perlawanan menjadi `[CUSTOM_REDACTED]`. Setiap corak melalui `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): paling banyak 500 aksara, bendera terhad kepada `g i m s u`, mesti dikompil, mesti melepasi `safe-regex` (penjejakan belakang malapetaka) dan tidak boleh sepadan dengan rentetan kosong atau pemegang tempat redaksi. Corak yang gagal ditolak apabila disimpan dan apabila diuji, dan baris tersimpan yang gagal dilangkau pada masa jalan dan bukannya dikompilasi. Corak tersuai hanya berjalan semasa topeng dihidupkan.
- **Kaunter pengesanan** kiraan setiap jenis — (nilai tidak pernah sepadan), disimpan dalam memori dan tetapkan semula semasa mulakan semula (`src/lib/pii/piiDetectionStats.ts`). Mereka hanya meningkat semasa topeng dihidupkan.

Tetapan hidup dalam jadual `key_value` (ruang nama `pii_settings`, `src/lib/db/piiSettings.ts`) dan dibaca melalui cache 1 s. API:

| Kaedah | Laluan                   | Tujuan                                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Keadaan bendera, `enabledTypes`, `customPatterns`, kaunter pengesanan                |
| `PUT`  | `/api/settings/pii`      | Gantikan `enabledTypes` (`null` = semua) and/or `customPatterns`                     |
| `POST` | `/api/settings/pii/test` | Larian kering satu corak terhadap sampel paling banyak 8 KB; tiada apa yang disimpan |

Ketiganya memerlukan pengesahan pengurusan dan mengesahkan badan dengan Zod (`src/shared/validation/schemas/piiSettings.ts`). Dengan log masuk dilumpuhkan (`requireLogin=false`) `GET` dan titik akhir ujian dibuka, tetapi `PUT` masih memerlukan sesi papan pemuka, kunci `manage` -scope API, token akses `oma_` dengan skop tulis atau lebih tinggi, atau token CLI atau token perkhidmatan dalaman yang dihantar dari gelung balik.

#### pengecam GDPR (EU) dan POPIA (Afrika Selatan).

| Id                  | Pengecam                  | Pengesahan                                                                               |
| ------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Negara yang diketahui, panjang tepat untuk negara itu, ISO 13616 MOD-97-10               |
| `eu_vat`            | nombor EU VAT             | Awalan negara ahli yang diketahui dan format nombor negeri itu (tiada carian VIES )      |
| `es_dni_nie`        | DNI bahasa Sepanyol / NIE | Surat kawalan (mod nilai 23); NIE ialah `X/Y/Z` + 7 digit                                |
| `it_codice_fiscale` | Fiskal Codice Itali       | Surat kawalan daripada jadual kedudukan odd/even                                         |
| `pl_pesel`          | Poland PESEL              | Checksum berwajaran dan tarikh lahir berkod yang wujud                                   |
| `nl_bsn`            | BSN Belanda               | 11 kalis (berat 9..2, -1)                                                                |
| `de_steuer_id`      | Jerman Steuer-ID          | ISO 7064 Mod 11,10 serta peraturan struktur digit (tiada pendahuluan 0)                  |
| `se_personnummer`   | nombor orang Sweden       | Luhn melebihi sepuluh digit terakhir dan tarikh lahir yang munasabah (10 atau 12 digit)  |
| `za_id`             | Nombor ID Afrika Selatan  | Luhn atas kesemua 13 digit, month/day kelahiran yang sah, digit kewarganegaraan 0 atau 1 |
| `za_phone`          | telefon Afrika Selatan    | awalan `+27` / `27`, atau bentuk `0..` kebangsaan yang ditulis dengan ruang atau sempang |
| `za_vat`            | Nombor VAT Afrika Selatan | 10 digit bermula dengan `4`** dan** "VAT" / "BTW" dalam 48 aksara sebelum ini            |
| `za_tax_ref`        | Ruj cukai Afrika Selatan. | 10 digit bermula `0`-`3`, Luhn,** dan** "cukai" / "SARS" dalam 48 aksara sebelum ini     |

Oleh kerana format digit sahaja bertembung dengan nombor pesanan, nombor binaan dan cap masa, yang paling lemah (`za_vat`, `za_tax_ref`) memerlukan kiu kata kunci dan nombor `0..` sepuluh digit kosong tidak dianggap sebagai nombor telefon Afrika Selatan. Ruang IBANs (`GB29 NWBK ...`) tidak sepadan. Pada laluan penstriman isyarat dilihat di dalam bahagian semasa sahaja. Id berada di hadapan corak telefon generik, jadi pengecam yang disahkan mengekalkan pemegang tempatnya sendiri (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Templat `gdpr` dan `popia` masing-masing memilih EU dan id Afrika Selatan. Masking sendiri kekal ikut serta (Peraturan Keras #20): tiada apa-apa di sini mengubah lalai bendera ciri.

### Suntikan Segera (`promptInjection.ts`)

Mengesan struktur musuh dalam kandungan yang dibekalkan pengguna dan menguatkuasakan dasar yang dikonfigurasikan. Tingkah laku didorong oleh pembolehubah persekitaran dan pilihan pembina:

| Tetapan     | Env var                                                                                                | Lalai  | Kesan                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Didayakan   | `INPUT_SANITIZER_ENABLED`                                                                              | `true` | Apabila `false`, pagar litar pintas.                                                                                                                                                     |
| Mod         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn` | Dasar suntikan: `block`, `warn`, atau `log`. (`redact` diterima untuk back-compat tetapi tidak** bukan** teks suntikan jalur; request PII rewrite dikawal oleh `PII_REDACTION_ENABLED`.) |
| Ambang blok | pilihan `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Keterukan minimum diperlukan untuk menyekat. Sederhana adalah pemerhatian sahaja secara lalai.                                                                                           |

**Keutamaan mod** (`getMode`): pemanggil `options.mode` → `INJECTION_GUARD_MODE`**DB feature-flag override** (Papan pemuka → Tetapan → Bendera Ciri) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Oleh itu, penggantian papan pemuka memenangi env vars, jadi Feature Flags UI mengawal pengawal berjalan secara langsung (tiada mulakan semula). Bacaan DB adalah selamat gagal: jika ralat, pengawal akan kembali kepada gelagat berasaskan env, dan apabila tiada override ditetapkan gelagat adalah sama dengan resolusi env sahaja.

Sumber pengesanan:

1. `sanitizeRequest()` daripada `@/shared/utils/inputSanitizer` (set pengesan dikongsi digunakan di tempat lain dalam saluran paip).
2. `DEFAULT_GUARD_PATTERNS` terbina dalam (kini `system_override_inline` dan `markdown_system_block`, kedua-dua keterukan `high` ).
3. `customPatterns` pilihan diluluskan melalui pilihan pembina (rentetan, regex atau rekod `{ name, pattern, severity }` ).

Apabila `mode === "block"`** dan** sekurang-kurangnya satu pengesanan memenuhi ambang keterukan, `preCall` mengembalikan `{ block: true, message: "Request rejected: suspicious content detected" }`. Dalam mod `warn`/`log`, pagar dilog tetapi membenarkan panggilan. `evaluatePromptInjection()` pembantu kongsi juga dieksport untuk pemanggil yang perlu menilai gesaan tanpa melalui pendaftaran.

**Imbas terikat (v3.8.20):** pengesan hanya memeriksa** 16 KB pertama** daripada teks gesaan yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bait) dalam `src/shared/utils/inputSanitizer.ts`. Kedua-dua `detectInjection()` dan `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum menjalankan gelung corak. Arahan suntikan terletak berhampiran bahagian atas input, jadi ini mengehadkan regex CPU/GC pada muatan berbilang ratus KB tanpa pengesanan yang melemahkan (rujuk #3932, #4041).

### Masker Kredensial (`credentialMasker.ts`)

berjalan terus** kedua-duanya** peringkat, terakhir dalam rantaian lalai (keutamaan `95`). Mengedit pola kunci API / token rahsia yang terkenal daripada muatan keluar (kandungan mesej, hujah panggilan alat, hasil alat)** dan** respons pembekal, jadi bukti kelayakan yang ditampal ke dalam gesaan (atau digemakan semula oleh hasil alat) tidak dibocorkan kepada pembekal huluan atau kembali kepada pelanggan.

- **Ikut serta sahaja** , konvensyen yang sama seperti redaksi PII (Peraturan Keras #20-bersebelahan): dilumpuhkan melainkan `settings.credentialRedactionEnabled === true`** atau** `CREDENTIAL_REDACTION_ENABLED=true`. Dengan ia dimatikan, guardrail adalah tiada-op — ia tidak pernah menyekat dan tidak pernah menulis semula.
- `redactCredentials()` berjalan pada pokok payload/response penuh (`walkValue()`, prototaip-pencemaran-selamat, kitaran-selamat melalui `WeakSet`) dan menggantikan padanan dengan pemegang tempat `[REDACTED:<type>]`, mengklon hanya cawangan yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` meliputi kunci pembekal LLM (OpenAI, OpenAI-proj, Anthropic, Google, Muka Memeluk, Replika), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Posmen, Discord), kunci pembayaran (Stripe, Square), kunci awan (AWS, kunci akses SendGrid, JWTs rentetan sambungan galas kelayakan (`mongodb://user:pass@...`, dsb.), dan corak nilai pengepala `Authorization`/`x-api-key`/`api-key`/`apikey` generik. Kekunci berbentuk pengepala (`authorization`, `x-api-key`, `api-key`, `apikey`) disunting secara struktur (nilai sahaja, awalan skema seperti `Bearer `/`Basic ` dipelihara) dan bukannya melalui regex teks generik.
- Pengawal tidak pernah menghalang; ia hanya menulis semula (`modifiedPayload` / `modifiedResponse`) dan menganotasi (`meta.credentialsRedacted`, `meta.count`).

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

## Perintah Pelaksanaan

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan `open-sse/handlers/chatCore.ts` (laluan sembang-keluarga yang disenaraikan di bawah [Liputan dan had](#coverage-and-limits) ):

1. `resolveDisabledGuardrails(...)` membina senarai langkau daripada kunci API, badan dan pengepala.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan pagar dalam urutan keutamaan menaik:
   - Pagar pagar yang kurang upaya direkodkan sebagai `skipped`.
   - Setiap `preCall` pagar boleh menulis semula muatan melalui `modifiedPayload`.
   - `block: true` pertama membuat litar pintas rantai dan pengendali mengembalikan tindak balas penolakan pagar.
3. Muatan (berpotensi ditulis semula) mengalir ke dalam penghalaan kombo dan penghantaran huluan.
4. **Bukan penstriman sahaja:** selepas respons dipasang, `guardrailRegistry.runPostCallHooks(...)` menjalankan rantaian yang sama pada respons. `block: true` di sini menjatuhkan respons huluan dan mengembalikan HTTP 400. Respons yang distrim melangkau langkah ini sepenuhnya.
5. **Bilik kebal boleh balik sahaja:** apabila permintaan itu menghasilkan token, `handleChat` memulihkannya pada respons 2xx ia kembali, selepas cangkuk pasca panggilan dan penstriman PII berubah, jadi `PII_RESPONSE_SANITIZATION` melihat token dan PII yang dijana model, tidak pernah menjadi asal yang dipulihkan.

Pengawal yang melontar direkodkan dengan `error: <message>` dan dilog melalui `logger.warn`, tetapi rantaian terus — gagal-dibuka dengan reka bentuk.

## Liputan dan had

Pendaftaran guardrail disambungkan ke saluran paip sembang sahaja. Had ini disematkan oleh `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` dan `tests/unit/guardrail-pipeline-characterization.test.ts`; kemas kini ujian tersebut dengan sengaja apabila tingkah laku berubah.

### Di mana mata kail berjalan

| Cangkuk / kawalan                           | berjalan terus                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                           | Permintaan dikendalikan oleh `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (dan `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` dan proksi sembang Telegram. Juga titik akhir ujian papan pemuka `/api/guardrails/test`. Blok pra-panggilan mengembalikan HTTP 400. |
| `runPostCallHooks`                          | **Bukan penstriman** balasan sembang sahaja (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Respons yang distrim tidak pernah sampai.                                                                                                                                                                                                                                                                                                    |
| Menstrim PII                                | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), disalurkan ke dalam `streamingPipeline.ts` apabila `PII_RESPONSE_SANITIZATION` dihidupkan. Ia bukan pagar, jadi saluran lumpuhkan tidak menjejaskannya.                                                                                                                                                                                                                            |
| Bilik kebal PII boleh diterbalikkan         | Permintaan dikendalikan oleh `handleChat` sahaja, apabila `PII_REDACTION_ENABLED` dan `PII_REVERSIBLE_VAULT_ENABLED` dihidupkan. Token dicetak oleh pra-panggilan `pii-masker` dan dipulihkan pada `handleChat` exit (`src/lib/pii/requestTokenVaultScope.ts`). Melumpuhkan `pii-masker` untuk permintaan bermakna tiada apa yang dicetak.                                                                                                       |
| Perisian tengah pengawal suntikan (warisan) | Setiap laluan `/v1` cepat, termasuk keluarga sembang (lihat [liputan laluan](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Suntikan segera sahaja.                                                                                                                                                                                                                                                                              |

### Apa yang tidak dilindungi

- **Media, benam dan laluan data** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) tidak pernah sampai ke registri. Tiada penyamaran PII, penyamaran kelayakan atau jambatan modaliti berjalan di sana. Satu-satunya semakan mereka ialah perisian tengah pengawal suntikan warisan.
- **Respons distrim** tiada pagar selepas panggilan: tiada `pii-masker` atau `credential-masker` pasca panggilan, dan tiada blok pasca panggilan. Hanya transformasi PII penstriman digunakan (apabila `PII_RESPONSE_SANITIZATION` dihidupkan). Bukti kelayakan yang digemakan semula dalam respons yang distrim tidak disunting.
- **Lumpuhkan saluran berbanding perisian tengah (mengikut reka bentuk):** middleware menilai suntikan segera dengan panggilan sendiri ke `evaluatePromptInjection()`, tanpa melepasi sebarang senarai lumpuh kawalan pemanggil. mod `block` ialah sempadan wajib yang dilumpuhkan kawalan pemanggil tidak boleh memintas, termasuk pada laluan sembang-keluarga ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ). Melumpuhkan `prompt-injection` hanya melangkau pagar pengawal pendaftaran.

### Perkara yang melihat respons sebelum pasca panggilan

Pada laluan bukan penstriman susunannya ialah: pengekstrakan memori → pelaksanaan alat terbina dalam → pagar penghadang pasca panggilan → blok pasca panggilan keluar → stor cache semantik.

- **Pengekstrakan memori** dan** pelaksanaan alat** lihat respons sebelum pagar selepas panggilan boleh menulis semula atau menyekatnya. Sejak [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), pengekstrakan memori menjalankan teks yang diekstrak melalui `sanitizePII` apabila `PII_RESPONSE_SANITIZATION` dihidupkan (kedua-dua penstriman dan bukan penstriman), tetapi respons yang disekat selepas panggilan kemudian masih ditawarkan kepada memori dan alatan.
- **Cache semantik** menyimpan respons selepas pasca panggilan, jadi ia menyimpan respons yang ditulis semula dan respons yang disekat tidak pernah dicache. Entri cache dikunci setiap kunci API.

## Konfigurasi

Pembolehubah persekitaran dibaca oleh pagar terbina dalam:

| Pembolehubah                          | Digunakan oleh             | Kesan                                                                                                   |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Tetapkan `false` untuk melumpuhkan pengesanan sepenuhnya.                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Dasar suntikan: `warn`, `block`, atau `log`. Nilai warisan `redact` tidak menulis semula teks suntikan. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Mod untuk pengawal suntikan; juga bendera ciri DB yang** mengatasi** env vars (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Keterukan minimum yang ditolak oleh `MODE=block` : `high` (lalai), `medium`, atau `low`.                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias warisan untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Apabila `true`, minta PII disunting (bebas daripada mod suntikan).                                      |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Dengan `PII_REDACTION_ENABLED`, token boleh balik pudina dan pulihkannya dalam respons 2xx.             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (hiliran)     | Mengawal tingkah laku topeng sisi tindak balas.                                                         |

Pengawal Modality Bridge membaca konfigurasi masa jalan daripada stor tetapan yang disokong DB (`getSettings()`), bukan env vars. Kekunci utama Vision ialah `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` dan `modalityBridgeCacheMaxEntries`. Kekunci `visionBridge*` warisan hanya diterima sebagai sandaran bacaan satu kitaran yang didokumenkan; penulisan papan pemuka menggunakan kekunci utama. Lalai dan penyelesai sandaran hidup dalam `src/shared/constants/modalityBridgeDefaults.ts`, dengan pemalar warisan dikekalkan dalam `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` dan `modalityBridgeAudioMaxClips`, serta tetapan `modalityBridgeCache*` yang dikongsi. Audio tidak mempunyai sandaran kunci warisan kerana kunci ini telah diperkenalkan dengan skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` dan `modalityBridgeVideoTimeout`, serta tetapan `modalityBridgeCache*` yang dikongsi. Ia dilumpuhkan secara lalai kerana FFmpeg/ffprobe ialah kebergantungan operasi pilihan dan kapsyen bingkai menambah kependaman dan kos model.

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
