# Resilience Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute memiliki tiga mekanisme ketahanan yang berbeda namun terkait. Masing-masing mempunyai ruang lingkup dan tujuan yang berbeda. Pisahkan keduanya saat men-debug perilaku perutean.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Prioritas env-vs-dashboard untuk peralihan ketahanan.** Tombol ketahanan keikutsertaan yang diunggulkan dari lingkungan — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — hanya menyediakan _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean bertahan di `resilienceSettings` (Dashboard →** Pengaturan → Ketahanan** / `PATCH /api/resilience`, disimpan dalam `key_value`) memenangkan nilai env: normalisasi (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mempertahankan boolean yang disimpan setiap kali ada. Menyetel env var ke `true` pada penerapan di mana dasbor sudah menyimpan `false` oleh karena itu tidak mengubah apa pun — balikkan tombolnya** Pengaturan → Ketahanan** (atau kosongkan bidang yang disimpan) sebagai gantinya.

## 1. Circuit Breaker Provider

**Cakupan:** seluruh provider (mis., `glm`, `openai`, `anthropic`).

**Tujuan:** menghentikan pengiriman traffic ke provider yang berulang kali gagal pada tingkat upstream/layanan.

**Implementasi:**

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Penyambungan: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API reset: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- Tabel DB: `domain_circuit_breakers`

**Status:**

- `CLOSED` — traffic normal diizinkan
- `DEGRADED` — traffic masih diizinkan, tetapi kegagalan provider yang meningkat sedang dilacak; kembali ke `CLOSED` setelah cukup banyak keberhasilan, pada uji koneksi yang valid, atau setelah penahanan `OPEN` terlama untuk jenis kegagalan terakhir (nilai `cooldownByKind`-nya, jika tidak ada maka `resetTimeout`, × `maxBackoffMultiplier`, minimal satu cooldown) tanpa kegagalan baru
- `OPEN` — provider diblokir sementara; routing combo melewatinya
- `HALF_OPEN` — timeout reset telah berlalu; permintaan probe diizinkan

**Default yang dapat dikonfigurasi (`open-sse/config/constants.ts`, ditampilkan di Dashboard → Pengaturan → Ketahanan):**

| Kelas   | Degraded pada | Terbuka pada | Timeout reset |
| ------- | ------------- | ------------ | ------------- |
| OAuth   | 5 kegagalan   | 8 kegagalan  | 60s           |
| API-key | 7 kegagalan   | 12 kegagalan | 30s           |
| Local   | diturunkan    | 2 kegagalan  | 15s           |

`degradationThreshold` mengontrol kapan provider masuk ke `DEGRADED`; `failureThreshold` mengontrol kapan provider terbuka dan dilewati. Profil provider Local belum ditampilkan di halaman pengaturan Ketahanan.

**Kode trip:** hanya status tingkat provider `[408, 500, 502, 503, 504]`. JANGAN trip untuk error tingkat akun (sebagian besar 401/403/429 — itu termasuk cooldown atau lockout).

**Pemulihan lazy:** saat `OPEN` kedaluwarsa, `getStatus()`, `canExecute()`, `getRetryAfterMs()` menyegarkan status ke `HALF_OPEN`. Pembacaan yang sama (dan kegagalan berikutnya) menurunkan `DEGRADED` yang usang kembali ke `CLOSED`. Tidak perlu timer latar belakang.

---

### Cooldown Provider global opt-in (gerbang jendela)

Lapisan keempat, **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, default **nonaktif**) menyimpan memori lintas-permintaan tentang provider yang gagal di `open-sse/services/providerCooldownTracker.ts`, yang dikonsultasikan oleh resolusi target combo sehingga permintaan combo berurutan berhenti menjelajahi ulang provider yang baru saja gagal. Entri tingkat provider mematuhi gerbang jendela `PROVIDER_PROFILES`:

| Profil  | trip setelah (`providerFailureThreshold`) | dalam (`providerFailureWindowMs`) | cooldown selama (`providerCooldownMs`) |
| ------- | ----------------------------------------: | --------------------------------: | -------------------------------------: |
| OAuth   |                                      `10` |                           `15min` |                                 `5min` |
| API key |                                      `15` |                           `30min` |                                `10min` |

Di bawah ambang, provider **tidak** dianggap sedang cooldown; keberhasilan menghapus jendela. Entri tingkat koneksi (`provider:connectionId`) tetap memakai backoff eksponensial `minRetryCooldownMs → maxRetryCooldownMs`. Override: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Pengaman regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown Koneksi

**Cakupan:** penyedia tunggal connection/account/key.

**Tujuan:** lewati satu kunci buruk sementara koneksi lain untuk penyedia yang sama tetap melayani.

**Pelaksanaan:**

- Tandai tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pilihan: `getProviderCredentials*` dalam file yang sama
- Kalkulasi cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

**Bidang per koneksi:**

- stempel waktu `rateLimitedUntil` — hingga cooldown berakhir
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — penghitung backoff eksponensial

**Cooldown default:**

- basis OAuth : 5 detik
- Basis kunci API: 3 detik
- Kunci API 429: lebih memilih `Retry-After` hulu /reset headers/parseable teks reset
- Mundur: `baseCooldownMs * 2 ** failureIndex`

**Penundaan percobaan ulang per penyedia.** Halaman detail penyedia memiliki a** Coba lagi penundaan** pilih (Otomatis, 15 detik hingga 1 jam). Ini menghemat `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, hingga `PATCH /api/resilience`). Ketika kesalahan batas kecepatan tidak membawa petunjuk percobaan ulang upstream, nilai tersebut menggantikan backoff berskala untuk penyedia dan mengatur ulang `backoffLevel` ke 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Prioritas untuk kesalahan dengan tingkat terbatas, tertinggi terlebih dahulu: petunjuk percobaan ulang upstream, lalu per koneksi `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, lalu penundaan percobaan ulang per penyedia, lalu env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, lalu backoff berskala. Menghapus bidang secara otomatis. Ini hanya mempengaruhi alasan batas tarif, tidak pernah mempengaruhi keadaan terminal.

**Penjaga anti-guntur-kawanan:** mencegah kegagalan bersamaan dari perpanjangan cooldown yang berlebihan atau peningkatan ganda `backoffLevel`.

**Batas konkurensi 429 tidak menaiki tangga kemunduran.** `429` yang tubuhnya melaporkan batas konkurensi ("terlalu banyak permintaan bersamaan", "batas konkurensi", "batas permintaan paralel", GLM `并发数过高`) berarti akun tersebut sehat tetapi sibuk. `checkFallbackError()` mengembalikan alasan `concurrency_limited`: failover ke koneksi berikutnya sekarang, dinginkan yang ini untuk `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) tetap atau petunjuk coba lagi upstream, pertahankan `backoffLevel` tidak berubah, dan setel `skipProviderBreaker`. Badan kuota yang eksplisit tetap menang, sehingga badan yang juga cocok dengan pola kuota tetap merupakan keputusan kuota. Deteksi: `looksLikeConcurrencyLimit()` di `src/shared/utils/classify429.ts`; putusan: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` breaker) tidak berubah dan masih terbaca `rate_limit` untuk badan ini.

**Konten streaming terhenti tidak mendinginkan akun.** Ketika pengawas kios konten (`open-sse/utils/streamHandler.ts`) menyerah pada aliran yang tidak mengirimkan keluaran model tepat waktu, `markAccountUnavailable()` mencatat kesalahan pada koneksi tetapi tidak menyetel cooldown: penghentian tersebut termasuk dalam permintaan tersebut, paling sering merupakan putaran penalaran yang panjang tanpa keluaran. Operator dapat ikut serta kembali dengan `resilienceSettings.streamStallCooldown.enabled` (default `false`).

**Sinyal latensi ikut serta untuk pemilihan akun `p2c`.** Setiap upaya yang dikirim mencatat waktu hingga byte pertama dan hasil per koneksi (dan model + per koneksi) di jendela bergulir dalam memori: 20 sampel terakhir dalam waktu 15 menit (`open-sse/services/connectionLatencyTracker.ts`, direkam dari `safeLogEvents()` di `src/sse/handlers/chatHelpers.ts`). Ketika `resilienceSettings.p2cLatency.weight` berada di atas `0` (kisaran 0-20, `0` = nonaktif secara default), `compareP2CConnections()` di `src/sse/services/auth.ts` menambahkan hingga `weight` poin ke setiap kandidat pasangan. Setengahnya berasal dari latensi sebagai rasio terhadap kandidat yang lebih cepat (dua kali lebih lambat berarti setengahnya) dan setengahnya lagi dari tingkat kesalahan bergulir. Istilah ini hanya berlaku jika kedua kandidat memiliki setidaknya 3 sampel, sehingga akun baru tidak dikenakan sanksi, dan batas maksimumnya tetap di bawah hukuman pemblokiran kuota dan kuota habis. Ia tidak menambahkan sirkuitnya sendiri: akun yang gagal masih ditangani oleh lapisan cooldown, lockout, dan breaker. Atur dengan `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Kerangka penalaran memulai kembali anggaran kios konten.** Model penalaran dapat berpikir selama beberapa menit sebelum token pertamanya terlihat: Claude mengalirkan bingkai `thinking_delta` yang teks pemikirannya mungkin kosong, dan Responses API mengalirkan item penalaran satu demi satu. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) mengenali frame-frame ini, dan pengawas memulai kembali anggarannya pada masing-masing frame alih-alih membatalkan giliran. Mereka masih bukan keluaran model, sehingga giliran yang diakhiri dengan penalaran saja masih dilaporkan sebagai kosong, dan giliran yang menghentikan penalaran dan hanya mengirimkan detak jantung masih membuat pengawas tersandung.

Bingkai `reasoningContentEvent` biner Kiro dengan tanda tangan yang tidak kosong mempertahankan aktivitas penalaran ini melalui eksekutor sebagai delta `reasoning_content` yang kosong. Tanda tangan tidak diteruskan. Metadata, bingkai yang tidak lengkap, dan tanda tangan kosong tidak memulai kembali anggaran konten; batas waktu aliran aktif independen dan pembatalan klien masih berlaku (`open-sse/executors/kiro/reasoning.ts`).

**Status terminal ( cooldown NOT ):**

- `banned` — disetel oleh deteksi kata kunci yang dilarang / larangan akun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md) ). Penolakan per permintaan hulu (`request_rejected`, misalnya Anthropic OAuth 403 "Permintaan tidak diizinkan") tidak pernah menyetelnya: penolakan tersebut dihitung per koneksi dan model dan mengeluarkan model tersebut dari rotasi dengan cooldown yang semakin meningkat dibatasi pada `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 jam), atau mendinginkan koneksi ketika tidak ada model yang diketahui — `open-sse/services/requestRejectedStreak.ts`
- `expired` (transisi ke terminal setelah percobaan ulang terbatas — `EXPIRED_RETRY_MAX = 3` dengan backoff eksponensial — sehingga kesalahan OAuth sementara dapat pulih sendiri sebelum akun dinonaktifkan secara permanen)
- `credits_exhausted`

Ini bertahan sampai kredensial berubah atau operator meresetnya. Jangan menimpa status terminal dengan status cooldown sementara.

**Pemulihan yang lambat:** ketika `rateLimitedUntil` sudah lewat, koneksi menjadi memenuhi syarat lagi. Jika penggunaan berhasil, `clearAccountError()` menghapus semua bidang kesalahan.

### dinding penggunaan Claude OAuth : jalur prioritas lebih rendah pengaturan ulang batas sesi +

**Cakupan:** satu koneksi langganan Claude (OAuth). Kedua fitur tersebut** ikut serta per koneksi** (Edit koneksi → Claude bagian → `lowPriorityMode` / `autoLimitReset` di `providerSpecificData`, keduanya default nonaktif) dan mencerminkan perintah `/low-priority` dan `/limit-reset` Kode Claude (kontrak kawat diambil dari Kode Claude 2.1.263).

**Pelaksanaan:**

- Klasifikasi respons + mesin negara: `open-sse/services/claudeLowPriority.ts`
- Setel ulang klien status/claim : `open-sse/services/claudeLimitReset.ts`
- Kait pelaksana (injeksi header + percobaan ulang akun yang sama): `open-sse/executors/base.ts::execute()`
- Kegigihan ikut serta: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pemicu:** dinding penggunaan 5 jam — a `429` yang headernya memuat `anthropic-ratelimit-unified-status: rejected` dan, jika akun memenuhi syarat, `anthropic-ratelimit-unified-slow-offer: treatment`. Tidak ada yang dikirim sebelum tembok pertama itu 429; burst 429 tanpa header terpadu melewati jalur cooldown normal.

**Jalur dengan prioritas lebih rendah** (`lowPriorityMode`):

- Di dinding 429 pelaksana menerima tawaran tersebut dan segera mencoba kembali** sama** akun dengan `anthropic-usage-limit: slow`; jalur tetap aktif hingga `anthropic-ratelimit-unified-reset` diumumkan (+ 60s Grace) dan setiap permintaan di jendela itu membawa header. 429 yang dicegat tidak pernah mencapai `handleChatCore`, jadi koneksinya tercapai** bukan** dimasukkan ke dalam cooldown dan tidak diputar.
- `anthropic-ratelimit-unified-slow-status` pada tanggapan selanjutnya: `active` / `not_needed` menjaga jalur; `slot_busy` (429) atau a `529` tunggu `anthropic-ratelimit-unified-slow-retry-after` server (default 20s, jepit 5–600s, ± 30% jitter) dan coba lagi, dibatasi oleh `anthropic-ratelimit-unified-slow-max-wait` (default 20 menit, jepit 1 menit–6 jam) — setelah jalur berakhir dan penerimaan kembali blok pendinginan 10 menit. Penantian ini juga dibatasi oleh sisa waktu tunggu awal upstream permintaan (`resolveFetchStartTimeout`, 10 menit secara default) dikurangi margin 5 detik: tanpa batas tersebut, waktu tunggu maksimal default 20 menit akan bertahan lebih lama dari permintaan dan waktu tidur akan dibatalkan di tengah waktu tunggu, memunculkan `TimeoutError` alih-alih pendinginan `max_wait` end + yang anggun.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover jendela 5 jam, atau `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang berakhir sebagai `extra_usage` pada status apa pun, karena kelebihan pembayaran sekarang menutupi dinding) mengakhiri jalur; responsnya kemudian mengalir ke jalur cooldown normal. `budget_exhausted` diingat sampai anggaran disetel ulang (≤ 8 hari).
- Pemeriksaan dinding berjalan setelah percobaan ulang intra-percobaan yang dilakukan oleh eksekutor sebanyak 400 kali (pengeditan konteks, klem thinking/effort, pembelajaran otomatis param), sehingga dinding 429 yang hanya muncul pada salah satu percobaan ulang tersebut masih dicegat alih-alih mencapai jalur cooldown.
- Status ada dalam memori per koneksi (restart membutuhkan satu dinding tambahan 429 untuk menerima kembali).

**Reset batas sesi** (`autoLimitReset`, dicoba sebelum jalur saat keduanya aktif):

- blok `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ; ketika `arm: "reset"` dan `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan `{ "program": "juniper_tide" }` (organisasi UUID dari `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → permintaan dicoba ulang dengan kecepatan penuh (tidak ada header lambat). `already_used` / `not_offered` memoise `next_available_at` (default satu minggu); setiap kegagalan akan mundur 15 menit. Penyetelan ulang dilakukan seminggu sekali dan masih dihitung dalam batas mingguan.

Penjaga regresi: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Terapkan pengaturan ulang yang dibelokkan secara otomatis

**Cakupan:** koneksi langganan Codex dan Claude (OAuth).** Ikut serta** : pengaturan `bankedResetAutoApply` tidak aktif dan dalam mode `dry-run` secara default (Pengaturan → AI → Terapkan otomatis pengaturan ulang yang dibelokkan).

**Tujuan:** menghabiskan banked reset sendiri ketika akun mencapai batas penggunaan, alih-alih menunggu operator menekan "Tukarkan" di halaman Batas Penyedia.

| Jenis kredit (`creditTypes`) | Apa yang ditebus                               | Di mana ia berjalan                                                  |
| ---------------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| `codexCredits`               | Codex mengatur ulang kredit                    | pekerjaan latar belakang, setiap 60 detik                            |
| `claudeCredits`              | hibah yang disalurkan Claude (kredit `GRANT` ) | pekerjaan latar belakang, setiap 60 detik                            |
| `claudeSessionReset`         | Claude reset batas sesi mingguan (di atas)     | jalur permintaan, melalui kebijakan yang sama dengan tombol per akun |

**Pelaksanaan:**

- Keputusan murni (satu aturan ditetapkan untuk kedua jalur): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Pekerjaan latar belakang: `src/lib/services/bankedResetAutoApply.ts` (dimulai pada `src/instrumentation-node.ts`)
- gerbang jalur permintaan Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, didaftarkan melalui `setClaudeLimitResetPolicy()` di `open-sse/services/claudeLimitReset.ts`
- Sejarah, batas dan webhook: `src/lib/usage/bankedResetAudit.ts`
- Riwayat API: `GET /api/settings/banked-reset-auto/history?limit=50` (autentikasi manajemen)

**Urutan keputusan** (aturan kegagalan pertama adalah alasan yang tercatat):

1. Fitur nonaktif, jenis kredit nonaktif, atau akun di luar cakupan (`accountScope` `all` / `selected` ditambah peta `connections` per akun).
2. Di luar jadwal UTC opsional (`startHourUtc` > `endHourUtc` melewati tengah malam).
3. Batasan selama 24 jam terakhir: `maxPerAccountPerDay` (1), `maxPerDay` (3), dan `minSpacingMinutes` (30) di antara dua penukaran.
4. Pemicu: jendela `session` atau `weekly` yang ditembok (dibaca dari `getQuotaWindowStatus().reachedThreshold`, bukan `isAccountQuotaExhausted()`, yang hanya melaporkan akun dengan setiap jendela yang dihabiskan), atau kredit yang habis masa berlakunya dalam `expiringCreditHours` (24) pada akun yang telah menggunakan setidaknya `expiringCreditMinUsedPercent` (50).
5. Penjaga reset alami: lewati ketika jendela 5 jam berdinding direset dalam `sessionResetGuardMinutes` (90), atau jendela mingguan berdinding dalam `weeklyResetGuardHours` (12).
6. Batas minimum mingguan: lewati reset 5 jam ketika sisa mingguan di bawah `weeklyFloorPercent` (10).
7. mode `last-resort` : lewati sementara akun dalam cakupan lain dari penyedia yang sama memiliki setidaknya `poolHeadroomPercent` (10) tersisa di kedua jendela. Pemicu kredit yang kedaluwarsa dapat mengabaikan hal ini.
8. `dry-run` mencatat satu baris dan tidak menebus apa pun; `last-resort` dan `eager` menebus.

Data kuota yang hilang tidak pernah membuka kunci penukaran: waktu reset yang tidak diketahui atau lompatan penggunaan mingguan.

**pengaturan ulang sesi Claude :** dengan fitur nonaktif, atau `claudeSessionReset` nonaktif, tombol `autoLimitReset` per akun memutuskan persis seperti sebelumnya. Dengan mengaktifkan keduanya, fitur ini menggantikan tombol per akun: akun dalam cakupan hanya dapat mengklaim jika kebijakan mengizinkannya, dan dalam mode `dry-run` tidak ada klaim yang dibuat.

**Keamanan:** pekerjaan menebus paling banyak satu kredit per tick, memutuskan sebelum mendaftarkan kredit (akun yang dilewati tidak pernah terdaftar), menggunakan kunci idempotensi `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, dan membatalkan akun selama 1 jam setelah gagal dalam pencatatan atau penukaran. Setiap keputusan penebusan, kegagalan, dan uji coba ditulis ke `audit_log` (`action: "bankedReset.redeem"`, tanpa token atau id kredit); batasnya dihitung dari baris tersebut, sehingga dapat bertahan jika dimulai ulang. Penukaran yang berhasil juga mengaktifkan webhook `provider.reset_redeemed`.

Penjaga regresi: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinitas sesi (#7274)

**Cakupan:** satu sesi klien (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) disematkan ke satu koneksi, misalnya** setiap** penyedia.

**Tujuan:** pertahankan agen multi-turn (Kode Claude, aider, agen khusus) pada akun yang sama di seluruh permintaan, mengurangi kehilangan konteks lintas akun dan cold-start berulang 429 pada penyedia dengan status sesi per akun.

**Pelaksanaan:**

- resolusi TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstraksi header (generik, penyedia apa pun): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabel pin yang bertahan: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setelan: `sessionAffinityTtlMs` ( TTL global dalam ms, `0` menonaktifkan) — `src/lib/db/settings.ts`. Berganti nama dari `codexSessionAffinityTtlMs` khusus Codex dengan migrasi `124_generic_session_affinity_ttl.sql`, yang membawa Codex TTL yang dikonfigurasi sebelumnya sebagai default baru.

Sebelum #7274, `resolveSessionAffinityTtlMs()` melakukan hard-baid ke `0` untuk setiap penyedia kecuali `codex`, sehingga pengaturan TTL (dan header sesi) tidak berpengaruh di tempat lain meskipun mekanisme penyematan dan ekstraksi header sudah bersifat agnostik penyedia. Perbaikan ini menghapus pengembalian awal itu; TTL sekarang berlaku secara seragam untuk setiap penyedia setelah ditetapkan secara global di atas `0`.

Tiga header afinitas sesi tidak pernah diteruskan ke hulu — pelaksana membuat header upstream mereka sendiri dari awal daripada meneruskan header klien, jadi ini tetap menjadi id korelasi internal saja.

### Sewa koneksi sesi terkelola eksklusif

**Cakupan:** satu HTTP client/session terkelola yang aktif memiliki satu koneksi OmniRoute yang memenuhi syarat.

**Tujuan:** memberikan kepemilikan koneksi eksklusif yang tahan lama untuk klien yang memerlukan pagar perutean yang kuat di seluruh permintaan. Hal ini berbeda dari afinitas sesi, yang merupakan preferensi kontinuitas lunak: sewa eksklusif mempertahankan status siklus hidup di SQLite, menerapkan keunikan pemilik aktif dan koneksi aktif global, dan menolak pembuatan yang sudah usang sebelum pengiriman penyedia.

Fiturnya adalah opt-in per kunci API. Kunci yang dikelola harus memiliki cakupan `lease:exclusive` dan daftar `allowedConnections` yang tidak kosong dan eksplisit. Klien HTTP mana pun dapat menggunakan titik akhir siklus hidup; tidak diperlukan nama klien, agen pengguna, penyedia, metode OAuth, atau model. Sewa memiliki koneksi, bukan model, jadi perubahan model tetap mengikat sementara koneksi biasanya tetap memenuhi syarat. Aturan model normal, kuota, kesehatan, waktu tunggu, dan daftar yang diizinkan tetap berlaku dan dapat mentransisikan generasi yang sama ke koneksi gratis lain yang memenuhi syarat.

Siklus hidupnya adalah `POST /api/v1/session-leases` dengan tindakan JSON `acquire`, `renew`, dan `release`. Permintaan inferensi terkelola menampilkan nilai `X-OmniRoute-Lease-Owner` buram dan `X-OmniRoute-Lease-Generation` tepat. Pemiliknya menggunakan `vlo_` diikuti oleh 43 karakter base64url; hanya hash SHA-256 -nya yang disimpan. Setiap pagar pengiriman terakhir juga mengikat kunci API yang diautentikasi ID dan koneksi aktif ID. Header kontrol sewa dihapus dari log, snapshot permintaan yang disimpan, dan header pelaksana upstream.

Jika perutean biasa memiliki kandidat terkelola yang memenuhi syarat tetapi setiap kandidat bebas ditempati oleh sewa aktif asing, OmniRoute mengembalikan HTTP `429`, kode sewa-kapasitas-tidak tersedia, status kapasitas tunggu, dan `Retry-After` terbatas yang berasal dari masa berlaku relevan paling awal. Kelayakan kosong biasa bukanlah perselisihan sewa dan mempertahankan semantik kesalahan perutean yang ada.

Mekanisme terkait tetap terpisah:

- okupansi sesi OAuth adalah proses distribusi lunak lokal untuk akun OAuth.
- Semafor akun memberikan izin konkurensi permintaan dan berakhir ketika permintaan selesai.
- Sewa sesi terkelola eksklusif adalah kepemilikan siklus hidup yang tahan lama dengan pagar pembangkitan.

---

## 3. Penguncian Model

**Cakupan:** triple provider + connection + model.

**Cakupan berdasarkan status:** status yang gagal menentukan kunci yang digunakan oleh penguncian
(`resolveLockoutScope()` di `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinyal kuota atau hak akses — mengunci **keluarga kuota**:
  untuk codex, seluruh cakupan `codex` / `spark` (setiap model
  `gpt-5*` dari connection), untuk provider lain `getQuotaScopedModelForProvider()`.
- `404` mengunci model dasar (`getModelLockKey()` mempersempit `not_found`).
- Status lainnya — kegagalan transport/server `5xx` dan `502` yang disintesis oleh OmniRoute
  sendiri dari validasi kualitas — hanya mengunci tuple provider/connection/model **yang
  tepat**. Stream yang buruk pada satu model bukan bukti tentang kuota account; sebelum
  aturan ini, satu respons kosong pada `codex/gpt-5.6-luna` menghapus setiap model
  `gpt-5*` dari connection tersebut dari routing selama 2–30 menit (meningkat secara
  bertahap), sementara kuotanya tidak tersentuh.
- Opsi `scope` eksplisit dari caller selalu diprioritaskan (Antigravity meneruskan `"exact"`).

**Tujuan:** menghindari penonaktifan seluruh connection ketika hanya satu model yang tidak
tersedia atau dibatasi kuota.

**Contoh:**

- Provider dengan kuota per model yang mengembalikan 429
- Provider lokal yang mengembalikan 404 untuk satu model yang tidak ada
- Kegagalan izin mode/model khusus provider (misalnya mode Grok)

**Implementasi:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dasbor Cooldown Model (v3.8.0)

UI: Pengaturan → Cooldown Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menampilkan penguncian aktif dengan: provider, connection, model, alasan, expiresAt. Operator
dapat mengaktifkan kembali model secara manual dari kartu tersebut.

**REST API:**

- `GET /api/resilience/model-cooldowns` — mencantumkan penguncian aktif
- `DELETE /api/resilience/model-cooldowns` — mengaktifkan kembali secara manual. Body: `{provider, connection, model}`. Auth: management.

### Pengelola Cooldown

UI: Pemantauan → Pengelola Cooldown (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Satu halaman untuk setiap connection yang berada di luar routing karena alasan sementara, alih-alih
membuka halaman setiap provider. Halaman ini mencantumkan cooldown connection, penguncian
model, dan status terminal, menghapusnya per connection, untuk pilihan tertentu, atau untuk
semua connection dari suatu provider, serta mengedit aturan cooldown yang paling sering
disesuaikan: `streamStallCooldown.enabled` dan cooldown dasar `connectionCooldown` OAuth /
API-key serta jumlah langkah backoff maksimum (disimpan melalui
`PATCH /api/resilience`). Status terminal (`banned`, `expired`, `credits_exhausted`) dicantumkan
tetapi tidak pernah dihapus di sini.

Kartu **Aturan cooldown error** di halaman yang sama mengedit aturan error operator
(`settings.providerErrorRules`) dan default catch-all per provider
(`settings.providerErrorDefaults`) melalui `PATCH /api/settings` — lihat "Aturan yang
dideklarasikan operator" di §7 untuk cara pencocokannya. Durasi yang tersedia adalah Bawaan
(tidak ada cooldown eksplisit), 30 menit, 1 jam, 5 jam, 24 jam, atau 1 hingga 43.200 menit
(30 hari) khusus.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connection dengan status, sisa cooldown,
  level backoff, tipe error terakhir, dan penguncian model (tanpa kredensial)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` atau
  `{all: true, provider?}`; mengembalikan `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI pengaturan penguncian + pemulihan success-decay (v3.8.23)

Penguncian model berubah dari perilaku hardcode yang selalu aktif menjadi fitur yang sepenuhnya
dapat dikonfigurasi dan bersifat opt-in, dengan kartu pengaturan tersendiri serta jalur
pemulihan yang dapat memperbaiki dirinya sendiri.

**Kartu pengaturan:** Pengaturan → Penguncian Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ini **berbeda** dari `ModelCooldownsCard` yang hanya-baca di atas (yang hanya
_mencantumkan_ penguncian aktif) — kartu baru ini _mengonfigurasi parameternya_. Default
berada di `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Pengaturan              | Default                          | Arti                                                                            |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Toggle utama — penguncian model **nonaktif secara default**.                    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream yang dihitung sebagai kegagalan berskala model.                 |
| `baseCooldownMs`        | `120_000` (120 s)                | Durasi penguncian awal untuk kegagalan pertama.                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Batas atas cooldown yang meningkat.                                             |
| `maxBackoffSteps`       | `10`                             | Jumlah maksimum langkah peningkatan exponential-backoff.                        |
| `useExponentialBackoff` | `true`                           | Menentukan apakah kegagalan berulang meningkatkan cooldown secara eksponensial. |

Pengaturan disimpan melalui penyimpanan pengaturan normal dan divalidasi melalui skema
pengaturan resilience; kartu membatasi `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) dan `maxBackoffSteps`.

**Pemulihan success-decay:** pemulihan **tidak** semata-mata bergantung pada berakhirnya timer.
Respons yang sehat menurunkan kembali jumlah kegagalan model sehingga model yang pulih
di tengah-window berhenti mengalami peningkatan (dan dibersihkan) sebelum timer berakhir.
Pada target combo yang berhasil, `open-sse/services/combo.ts` memanggil `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), yang **membagi dua** `failureCount` yang tersimpan
(`Math.floor(failureCount / 2)`); ketika mencapai `0`, entri penguncian dihapus sepenuhnya.
Pasangannya, `recordModelLockoutFailure()`, menambah jumlah tersebut (dan meningkatkan
cooldown) pada kegagalan dalam window peningkatan. Success-decay ini merupakan tambahan
dari berakhirnya timer biasa — kedua jalur tersebut dapat mengaktifkan kembali model.

**Status:** lockout disimpan **di dalam memori** (`Map`s per proses dari
`ModelLockoutEntry` yang dikunci berdasarkan `provider:connectionId:model`, kunci dengan cakupan exact berdasarkan
`provider:connectionId:exact:model`), bukan dipersistenkan ke
DB — lockout tersebut hilang saat dimulai ulang. _Pengaturan_ dipersistenkan; _status lockout_ aktif bersifat sementara.

---

## 4. Kontrol Konkurensi Kuota-Bagikan (v3.8.36)

Akun langganan (GLM, MiniMax, dll.) sering kali hanya menerima ~ 1–3 permintaan bersamaan; melebihi itu akan memicu 429 detik dan cooldown. Ini akut di bawah** pembagian kuota** (`qtSd/…`) kombo, di mana beberapa kunci API berbagi satu akun upstream. Tiga lapisan menjaga akun bersama agar tidak kebanjiran.

### Batas konkurensi per koneksi (`max_concurrent`)

Setiap koneksi penyedia dapat mendeklarasikan plafon `max_concurrent` (`provider_connections.max_concurrent`, diatur dalam modal koneksi / API / DB). Biarkan kosong tanpa batas. Ini adalah tombol tunggal yang menggerakkan lapisan serialisasi di bawah — mengaturnya ke konkurensi nyata akun (misalnya GLM ~ 1, MiniMax ~ 2).

### Batas konkurensi per model (`modelConcurrency`)

Koneksi juga dapat mendeklarasikan batas konkurensi per model yang tepat di dalam peta `rateLimitOverrides` -nya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Atur di modal koneksi (** Batas nilai menggantikan → Batas konkurensi per model** , satu `model=cap` per baris) atau melalui `PATCH /api/providers/[id]` dengan bentuk JSON yang sama. Semantik kunci:

- **Seluruh koneksi vs spesifik model:** `maxConcurrent` tetap menjadi batas atas koneksi bersama. Ketika keduanya diterapkan, kedua gerbang diperoleh secara atom dalam gerbang komposit yang sama (`global → provider → account → model`); perilaku efektif adalah batas ketat yang berlaku.
- **Pencocokan model-kunci yang tepat:** kuncinya adalah string model yang diteruskan ke pelaksana setelah resolusi perutean — biasanya id model upstream kosong (`glm-5`), bukan alias `provider/model` sisi klien (`zai/glm-5` tidak cocok dengan `glm-5`). Nilai adalah batas atas permintaan bersamaan dengan bilangan bulat positif.
- **Antrian lokal, tidak ada penemuan:** kelebihan antrian permintaan secara lokal dengan semantik queue/timeout yang ada (mengetik kesalahan penerimaan `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute tidak menemukan atau menyimpulkan kebijakan hulu — ia menerapkan batas atas yang dikonfigurasikan oleh operator. Gerbang model jenuh tidak pernah menonaktifkan penyedia dan tidak pernah membuat penguncian model permanen; perilaku 429/cooldown/fallback hulu tetap menjadi penghalang kesalahan.
- **Per koneksi, cakupan per proses:** batasnya adalah per koneksi database dan disimpan dalam memori, jadi dua koneksi yang menggunakan kembali kunci API upstream yang sama tidak berkoordinasi satu sama lain.
- **Tidak dikonfigurasi berarti tidak berubah:** menghilangkan peta (atau membiarkan bidang dasbor kosong) tidak menambah gerbang model. Contoh konfigurasi tanpa menetapkan batas penyedia universal:

```text
glm-5=1
glm-4.7=3
```

### Serialisasi permintaan pembagian kuota

Ketika pengiriman pembagian kuota menargetkan koneksi yang mendeklarasikan `max_concurrent` positif, permintaan akan dilakukan secara bersamaan** akun** diserialkan melalui semaphore per koneksi (kunci `qsconn:<connectionId>`): permintaan berlebih** tunggu di antrian** daripada membanjiri akun. Dia** gagal-terbuka** — antrian jenuh atau batas waktu berlangsung tanpa slot daripada menolak permintaan yang dapat dikirim. Aktifkan** Pengaturan → Ketahanan → Pembagian kuota per konkurensi koneksi** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, default aktif). Tanpa batas `max_concurrent` perilakunya tidak akan berubah.

> Gerbang perutean pembagian kuota (`selectQuotaShareTarget`, DRR + P2C) itu sendiri gagal dibuka dan hanya _deprioritizes_ koneksi at-cap — dengan kumpulan koneksi tunggal yang tidak dapat dibatasi secara ketat, jadi semaphore inilah yang sebenarnya mengandung banjir.

### Coba lagi dengan sadar cooldown kombo

Untuk setiap strategi kombo (bila diaktifkan), permintaan yang akan mengkristalkan 429 untuk cooldown sementara SHORT akan menunggunya dan mengirimkannya kembali alih-alih mengembalikan 429 — Ini mencakup jendela TPM/RPM kelas Gemini (~ 60s coba lagi setelahnya) pada kombo multi-model, misalnya kedua target dari kombo 2 model mencapai batas kecepatan per model. Dibatasi oleh `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) di** Pengaturan → Ketahanan** . Itu tidak pernah menunggu alasan `quota_exhausted` (terkunci sampai tengah malam) atau auth/not-found. Dengan `comboTimeoutMs` disetel, penantian yang tidak dapat diselesaikan sebelum batas waktu tersebut tidak dimulai (#18998): kombo menjawab sekaligus dengan respons terminalnya, bukan `COMBO_TIMEOUT` 504.

Kombo dapat memilih untuk tidak ikut dengan `config.comboCooldownWaitEnabled: false`. Hanya `false` literal yang menonaktifkan penantian kombo bersama ini (cooldown pasca-pengiriman dan penantian circuit-open/model-lock pra-pengiriman) dan perpanjangan batas waktu tunggu anggarannya. Hilang atau `true` mempertahankan kebijakan global; `true` tidak dapat mengaktifkan penantian yang dinonaktifkan secara global. `targetTimeoutMs` eksplisit masih menang. Penyisihan ini tidak mengubah waktu tunggu pra-pengiriman turn-pin Codex asli yang terpisah.

Gerbang yang sama mencakup kasus pra-pengiriman (#16319): ketika setiap target kombo dilewati sebelum upaya apa pun dilakukan karena modelnya berada dalam penguncian sementara yang singkat, jalur upaya nol menunggu penguncian di bawah langit-langit yang sama dan pengiriman ulang, alih-alih menjawab `503 ALL_TARGETS_SKIPPED` tanpa petunjuk. Ketika tidak ada waktu tunggu yang diizinkan (batas waktu, upaya atau anggaran habis, atau fitur nonaktif), respons terminal ditingkatkan menjadi `429 rate_limit_error` yang membawa `retry_after` / `reset_at` dari masa berlaku kunci sementara yang paling awal; kuota, autentikasi, dan kunci tidak ditemukan mempertahankan 503 tanpa petunjuk.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Kontrol Admisi Antrean Permintaan (v3.8.49 · issue #6593)

**Cakupan**: antrean rate-limit lokal per-provider+koneksi (`open-sse/services/rateLimitManager.ts`,
didukung oleh Bottleneck), satu lapisan di bawah tiga mekanisme di atas.

**`maxWaitMs` membatasi waktu tunggu antrean; `executionMaxWaitMs` membatasi eksekusi.**
Keduanya sengaja dipisahkan, dan tidak ada yang mempengaruhi satu sama lain.

`resilienceSettings.requestQueue.maxWaitMs` adalah **anggaran waktu tunggu antrean**: ia
mencakup menunggu slot provider dan kemudian berada dalam status QUEUED, dan timernya
dihapus begitu job meninggalkan QUEUED dan mulai dieksekusi
(`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melampauinya tidak pernah sampai
ke upstream. Default 30000ms, disediakan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
di `src/lib/resilience/settings.ts` dan dikunci oleh
`tests/unit/ratelimit-admission-control-6593.test.ts`, sehingga perubahan padanya membuat
pengujian tersebut merah daripada membiarkan paragraf ini diam-diam usang.

`resilienceSettings.requestQueue.executionMaxWaitMs` adalah apa yang diterima Bottleneck
sebagai `expiration` job, yang timernya baru dimulai setelah dispatch. Ia
merupakan pengaman bagi executor yang tidak memiliki timeout upstream sendiri, dan ia
dinaikkan ke timeout fetch-start milik executor ketika itu lebih lama, sehingga ia
tidak dapat memutus respons yang sedang berjalan dengan sehat. Default 600000ms (10 menit).

Memasukkan anggaran antrean ke dalam `expiration` adalah hal yang dulu mematikan gateway
non-inkremental di tengah jalan — gateway tersebut memang berjalan selama beberapa menit sebelum byte pertama —
dan itulah mengapa expiration dimunculkan sebagai `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) sementara anggaran antrean membawa
kode queue-timeout. Ganti salah satunya melalui `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) atau dashboard
(**Settings → Resilience**). Keduanya dibatasi ke rentang 1ms–24 jam saat dinormalisasi.

**Prioritas, untuk keduanya:** env var hanya menyediakan _default_. Nilai
yang tersimpan di `resilienceSettings.requestQueue` (dashboard / patch API, disimpan
di `key_value`) mengalahkannya, dan
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per-koneksi mengalahkan itu. Jadi, mengatur
env var pada deployment yang sudah memiliki nilai tersimpan tidak
mengubah apa pun — bersihkan atau perbarui pengaturan yang tersimpan sebagai gantinya.

Waktu tinggal dalam antrean dibatasi oleh `maxWaitMs`; `maxQueueDepth` di bawah membatasi
berapa banyak pemanggil yang boleh mengantre sekaligus.

**Percobaan ulang yang dinyatakan di body: pacing vs lockout.** Body 429 dapat menyebutkan waktu tunggunya sendiri
(Gemini `RetryInfo.retryDelay`, teks "retry after Ns"), yang
dibaca oleh `updateFromResponseBody`. Waktu tunggu yang sesuai dengan `maxWaitMs`
koneksi adalah pacing: limiter mengosongkan reservoirnya selama itu dan panggilan yang mengantre
dikirim saat reservoir terisi kembali. Waktu tunggu yang lebih lama dari `maxWaitMs` bukanlah sesuatu yang
bisa ditunggu oleh antrean — Gemini menjawab kuota harian yang habis dengan
`retryDelay: "86399s"`. `Retry-After` yang diteruskan pada 429 yang dibangun ulang (#16528)
sudah membuat mesin fallback mengunci model untuk jendela waktu tersebut, tetapi menghentikan sementara
limiter untuk itu juga tetap akan menghentikan panggilan apa pun yang mencapai key lebih awal
(setelah reset resiliensi, misalnya) selama `maxWaitMs` penuh. Ketika waktu tunggu seperti itu berasal dari detail
`RetryInfo` Google yang bertipe (provenance `google_rpc_retry_info`) dan limiter key
sudah terlingkup pada model (lihat `getLimiterKey`), 429 tersebut menjadi
lockout model pada koneksi itu (`lockModelForLongBodyRetry` di
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, dibatasi maksimal 24 jam), dan
limiter dibiarkan tidak dijeda. Pemilihan akun dilewati pada kunci tersebut melalui
`isModelLocked()`, dan begitu juga gerbang pra-dispatch combo untuk target yang dipin ke
koneksi tersebut. Pada antigravity, yang limiternya per keluarga kuota, kuncinya
ada pada model yang tepat, seperti kunci kuota lainnya. Nama yang diminta klien
juga dikunci ketika sebuah alias me-resolve-nya ke model tersebut, karena pemeriksaan tersebut menggunakan
nama yang diminta; ia dikunci secara tepat (`lockExactModel`), sehingga alias yang
melintasi keluarga kuota antigravity atau cakupan codex tidak pernah mengunci miliknya sendiri.
Petunjuk berupa prosa, `retryDelay` yang tidak bertipe, atau
limiter yang dipakai bersama oleh seluruh koneksi tetap mempertahankan jeda. Ketika limiter yang baru saja
dibangun ulang oleh jalur 429 benar-benar dijeda, pemanggil yang sisa waktu antreannya berakhir
sebelum jeda tersebut berakhir langsung ditolak dengan kode queue-timeout
(`checkLimiterPause`) alih-alih menunggu waktu itu habis; waktu akhir yang tercatat
ditambatkan sebelum limiter dibangun, di mana Bottleneck memulai jam refresh-nya,
dan perubahan apa pun kemudian pada reservoir akan melupakannya. Dicakup oleh
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` dan
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — batas admisi opt-in (baru).** `resilienceSettings.requestQueue.maxQueueDepth`
membatasi berapa banyak permintaan yang boleh mengantre (belum dikirim) untuk satu
provider+koneksi sekaligus. Ketika antrean sudah menampung `maxQueueDepth`
permintaan, permintaan baru ditolak dengan cepat (fast-reject) dengan error bertipe
`code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** ia pernah mencapai `limiter.schedule()`
— sehingga penolakan itu murah dan terjadi sebelum pekerjaan
kompresi-prompt / translasi apa pun di hilir untuk permintaan tersebut. Default `0` =
dinonaktifkan, mempertahankan perilaku antrean tak terbatas yang sudah ada; dibatasi 0–100000.
Ganti melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) atau
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch API).

Pemeriksaan admisi itu sendiri adalah fungsi murni
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) sehingga
dapat diuji unit tanpa limiter Bottleneck sungguhan.

> RFC yang membuka #6593 juga mengusulkan flag
> `bypassCompressionOnRateLimit`. Pipeline `open-sse/services/compression/`
> di repo ini adalah kompresi prompt/konteks pada request LLM keluar
> (`chatCore.ts`, sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`),
> bukan kompresi respons HTTP pada body 429 yang disintesis — tidak ada
> code path yang cocok untuk flag bypass literal. Langkah kompresi prompt
> tersebut juga saat ini berjalan _sebelum_ `withRateLimit()` dalam pipeline
> request, sehingga menyusun ulang urutan untuk melewatinya saat penolakan
> antrean-penuh adalah perubahan terpisah yang lebih besar daripada cakupan
> issue ini; perubahan itu sengaja **tidak** diimplementasikan di sini dan
> ditinggalkan sebagai tindak lanjut jika penghematan CPU sepadan dengan
> risiko penyusunan ulang.

### Jaring Pengaman Auto-Enable Rate-Limit & Perlindungan Koneksi (`rateLimitProtection`)

**Jaring pengaman auto-enable** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
Secara default, OmniRoute secara otomatis mengaktifkan perlindungan antrean rate-limit untuk semua koneksi provider API-key yang aktif (`getProviderCategory(provider) === "apikey"`). Ini memastikan request masuk ke API key upstream yang sensitif terhadap rate akan diantrekan dan dibatasi lajunya melalui Bottleneck, alih-alih membanjiri upstream hingga memicu error 429. Jaring pengaman ini dapat ditimpa melalui variabel lingkungan `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` menonaktifkan, `true`/`1`/`on` memaksa aktif), yang lebih diutamakan daripada pengaturan dashboard yang tersimpan (**Pengaturan → Resiliensi** / `PATCH /api/resilience`).

**Semantik `rateLimitProtection` per koneksi:**
Perlindungan rate-limit per koneksi dilacak melalui field boolean `rateLimitProtection` pada koneksi provider (disimpan sebagai `rate_limit_protection` di SQLite):

- **Aktif eksplisit (`rateLimitProtection === true`)**: Perlindungan rate-limit secara eksplisit diaktifkan untuk koneksi ini, terlepas dari kategori provider atau apakah jaring pengaman auto-enable dinyalakan.
- **Nonaktif eksplisit (`rateLimitProtection === false`)**: Menonaktifkan perlindungan eksplisit, tetapi **tidak** mengeluarkan koneksi API-key aktif dari jaring pengaman auto-enable global. Di `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` dan `undefined` setara: hanya `rateLimitProtection === true` yang diperlakukan sebagai override eksplisit. Jika `rateLimitProtection` bernilai `false` (atau tidak diatur), koneksi API-key aktif tetap memenuhi kondisi auto-enable dan tetap dilindungi rate-limit.
- **Tidak ada opt-out per koneksi**: Operator saat ini tidak dapat menyatakan "koneksi API-key aktif tunggal ini harus berjalan tanpa perlindungan antrean rate-limit" sambil tetap menjaga auto-enable aktif untuk koneksi lainnya. Untuk menjalankan koneksi API-key sepenuhnya tanpa antrean rate-limit, jaring pengaman harus dimatikan secara global (`RATE_LIMIT_AUTO_ENABLE=false` atau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Jalur penulisan yang didukung:**

- **`POST /api/rate-limits`**: Jalur penulisan manajemen yang didukung untuk mengubah `rateLimitProtection` suatu koneksi (`{ connectionId: string, enabled: boolean }`). Memanggil endpoint ini dengan `enabled: true` mengaktifkan perlindungan eksplisit; memanggilnya dengan `enabled: false` menghapus perlindungan eksplisit (meskipun koneksi API-key aktif tetap tercakup oleh jaring pengaman global jika auto-enable aktif).
- **`PUT /api/providers/[id]`**: Dengan sengaja **tidak** menerima atau mengubah `rateLimitProtection` (#11278). Memperbarui metadata koneksi provider melalui `PUT /api/providers/[id]` tidak akan pernah mengubah status perlindungan rate-limit yang tersimpan.

---

## 6. Pengawas throughput aliran lambat (#9709)

`resilienceSettings.streamRecovery.throughputWatchdog` guard opsional mendeteksi upstream yang masih mengirimkan potongan tetapi menghasilkan keluaran asisten di bawah tingkat keluaran berguna yang dikonfigurasi. Ini sengaja dibedakan dari waktu tunggu diam: detak jantung dan metadata tidak mengatur ulang pengatur waktu dan tidak dihitung sebagai kemajuan. Batas waktu ini juga berbeda dengan batas waktu upaya keras (#9153), yang tetap merupakan batas keamanan mutlak, apa pun kualitas hasilnya.

Pengawas memerlukan periode pemanasan diikuti dengan jendela bergulir penuh sebelum dapat dibatalkan. Ini menghitung delta teks dari peristiwa keluaran API Penyelesaian dan Respons Obrolan (proksi byte UTF-8 konservatif), mengabaikan peristiwa yang hanya digunakan dan kosong, dan menangguhkan penilaian saat peristiwa pemanggilan alat atau penalaran sedang berlangsung. Ini dinonaktifkan secara default dan dapat diaktifkan dengan `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (nilai env itu hanya menyemai — default, `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean yang disimpan menang; lihat catatan prioritas env-vs-dashboard di bagian atas panduan ini); jendela, pemanasan, laju minimum, dan keluaran terukur minimum dibatasi oleh lapisan normalisasi pengaturan ketahanan normal.

Jika diaktifkan, pembatalan pengawas hanya diterapkan pada upaya hulu yang aktif. Sebelum byte yang terlihat oleh klien, jalur pemulihan awal akun yang sama dapat membuka kembali upaya tersebut. Setelah dilakukan, streaming tidak pernah diputar ulang secara membabi buta; hanya kontrak kelanjutan mid-stream aman yang dapat menyatukan akhiran. Finalisasi tetap dilakukan satu kali, sehingga penghitungan penggunaan dan rilis semaphore tidak diduplikasi.

---

## 7. Restatement Status Upstream (kesalahan status kuota)

**Cakupan:** satu gateway upstream yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** memperbaiki status yang menyesatkan SEBELUM klasifikasi, sehingga konsumen downstream (mesin fallback, agregasi combo, respons yang ditujukan kepada klien) melihat sifat kegagalan yang sebenarnya dapat dicoba ulang.

Beberapa gateway menandai kehabisan kuota SEMENTARA dengan status HTTP yang tidak dapat dicoba ulang. `agentrouter.org` mengembalikan `403` (terkadang `400`) dengan body berbahasa Tionghoa
(`用户额度不足` / `额度不足`) alih-alih `429` standar. Klien seperti Claude
Code menganggap `403` sebagai kesalahan permanen dan menghentikan sesi, dan tanpa
koreksi mesin fallback akan mengklasifikasikannya sebagai `AUTH_ERROR`, bukan
sebagai peristiwa kuota.

**Implementasi:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — daftar
  aturan per penyedia (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), yang dicocokkan melalui
  `applyStatusRestatement()`.
- Call site: blok `providerFailure:` di `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), tepat setelah `parseUpstreamError()` mengurai respons
  upstream dengan status HTTP error (`!providerResponse.ok`), dan sebelum
  klasifikasi apa pun dijalankan, sehingga setiap konsumen downstream melihat
  status yang telah dikoreksi. Error yang disisipkan di dalam stream SSE
  `200` mengikuti jalur parsing stream terpisah yang dijalankan kemudian dan
  **belum** tercakup oleh hook ini — keterbatasan yang diketahui dan belum
  diperlukan untuk kesalahan status agentrouter (yang muncul sebagai status
  HTTP error).
- Kelayakan percobaan ulang: `429` terdapat di
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), sehingga error yang
  telah di-restatement membawa jendela percobaan ulang yang nyata, alih-alih
  muncul sebagai `403` yang tidak dapat dipulihkan.
- `defaultRetryAfterMs` sintetis sebesar `60s` (`upstreamStatusRestatement.ts`)
  hanya merupakan informasi yang disampaikan respons hasil restatement kepada
  **klien**; nilai ini bukan durasi cooldown/lockout internal koneksi — durasi
  tersebut diatur secara terpisah oleh mekanisme yang benar-benar menangani
  error hasil restatement (backoff bertingkat Connection Cooldown, §2, dengan
  nilai dasar `3s` untuk penyedia berbasis API-key; atau Model Lockout, §3, untuk
  penyedia berbasis kuota per model seperti agentrouter). Router dapat menjadi
  eligible untuk mencoba ulang secara internal sebelum jendela `60s` yang
  diberitahukan kepada klien berakhir — ini merupakan kelonggaran yang
  disengaja, bukan bug.

Error permanen (`无权访问模型` milik agentrouter — tidak memiliki akses ke model
ini) TIDAK PERNAH di-restatement: `excludeMarkers` membatalkan aturan meskipun
`textMarkers` cocok, sehingga error mempertahankan status aslinya dan tidak ada
yang mencoba ulang tanpa batas. Aturan klasifikasi penyedia yang cocok
(`agentrouter-model-access-denied` di `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, base cooldown yang dideklarasikan
`6h`) dikonsultasikan oleh `checkFallbackError`
(`open-sse/services/accountFallback.ts`)
_sebelum_ early-return kategori apikey generik `FORBIDDEN`, dengan syarat
`honorsRuleLockScope(provider)` (#10334 — saat ini eksklusif untuk agentrouter
melalui allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di
`providerErrorRules.ts`). Cooldown 6 jam yang dideklarasikan aturan tersebut
diteruskan sebagai `fallbackResult.baseCooldownMs`, tetapi tetap masuk ke jalur
lockout per model berbasis kuota yang sudah ada
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, yang tidak berubah oleh #10334 selain sumber
cooldown): nilainya dibatasi oleh `mlSettings.maxCooldownMs` milik operator
(default `1_800_000ms` / 30 menit), seperti semua lockout model lainnya, dan
_alasan lockout yang disimpan_ tetap berupa `"forbidden"` hardcode yang sudah
ada, bukan `"auth_error"` milik aturan — hanya durasi cooldown yang dihormati
secara menyeluruh, bukan string alasannya. Koneksi itu sendiri tetap aktif;
model-model saudara pada koneksi yang sama tidak terpengaruh.

Error kuota hasil restatement (`额度不足`) mencapai aturan penyedia di produksi
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, tanpa cooldown yang dideklarasikan sendiri — default backoff
berskala milik lapisan persistensi yang berlaku). Sejak #10334, `scope` pada
`ProviderErrorRuleMatch` DIKONSUMSI secara menyeluruh, tetapi **hanya** untuk
penyedia dalam allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — saat ini hanya `"agentrouter"`, melalui
`honorsRuleLockScope()`). Untuk penyedia lainnya, `scope` tetap bersifat
informasi, persis seperti sebelum #10334.
`checkFallbackError` meneruskan scope aturan yang cocok sebagai
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) adalah guard bersama yang memastikan bahwa
`ruleScope` benar-benar aman untuk diterapkan sebagai sinyal pemulihan mandiri
yang berlaku di seluruh koneksi (scope `"connection"`, reason
`quota_exhausted`, tidak pernah `permanent`, tidak pernah `creditsExhausted` —
sebagai perlindungan terhadap kemungkinan aturan di masa mendatang yang
memasangkan scope `"connection"` dengan status akun permanen). Dua konsumen
memanggilnya:

- **Persistensi** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  alih-alih masuk ke cabang penguncian **per-model** passthrough-provider
  (`agentrouter` memiliki `passthroughModels: true` → `hasPerModelQuota()`
  mengembalikan `true`), mekanisme ini menerapkan **cooldown koneksi sementara** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, tidak pernah menjadi status
  terminal (`credits_exhausted`/`banned`/`expired`) — sehingga koneksi pulih
  sendiri setelah cooldown berakhir, tanpa memerlukan reset kredensial manual.
  Dilewati untuk koneksi dengan `disableCooling: true` (#2997): opt-out tersebut
  justru diteruskan ke penguncian per-model (trade-off yang telah
  didokumentasikan — lihat komentar kode di atas cabang tersebut).
- **Perutean combo dalam permintaan yang sama** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard yang sama menandai
  koneksi ke dalam set `exhaustedConnections` di memori, dengan kunci
  `${provider}:${connectionId}`. Ini hanya melewati target SAME-REQUEST yang
  tersisa dan _target itu sendiri sudah membawa `connectionId` yang persis sama_
  pada objek targetnya sendiri (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` sebelum pencarian `exhaustedConnections`) — combo daftar-model
  biasa, yang target saudaranya tidak membawa `connectionId` tersemat miliknya
  sendiri dan hanya diselesaikan per-dispatch dari header
  `X-OmniRoute-Selected-Connection-Id` pada respons, tidak pernah menemukan
  kecocokan kunci tersebut. Untuk kasus umum itu, perlindungan sebenarnya
  terhadap leg yang tersisa agar tidak menggunakan kembali akun yang baru saja
  kehabisan kuota BUKAN set ini — melainkan lapisan persistensi di atas
  (`rateLimitedUntil` koneksi kini berada di masa mendatang), yang digabungkan
  dengan guard yang sama untuk menekan `transientRateLimitedProviders` pada
  kegagalan (lihat "Desain dua tahap" dan komentar kode pada cabang
  `isAgentrouterConnectionQuotaScope` di `targetExhaustion.ts`): karena set
  tersebut tidak ditandai, force-allow `allowRateLimitedConnection` milik
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) TIDAK
  aktif untuk leg penyedia yang tersisa, sehingga filter
  `rateLimitedUntil` pada pemilihan kredensial (`src/sse/services/auth.ts:1238`)
  dipatuhi secara normal dan leg yang tersisa akan memilih koneksi agentrouter
  lain yang masih memenuhi syarat atau gagal karena tidak ada kredensial yang
  tersedia — leg tersebut tidak memaksa kembali ke koneksi yang baru saja
  didinginkan oleh cabang ini.

### Desain dua tahap: penyataan ulang status, lalu klasifikasi

Penyataan ulang status (`upstreamStatusRestatement.ts`) dan aturan klasifikasi
penyedia (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) adalah registry terpisah yang sama-sama menggunakan id
penyedia dan penanda teks sebagai kunci, tetapi dijalankan di tempat yang
berbeda dan memiliki tujuan yang berbeda: penyataan ulang menulis ulang status
HTTP lebih awal di `chatCore.ts`; aturan klasifikasi memilih `reason` fallback
dan mengunci `scope` (`model` / `provider` / `connection`) di dalam
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Aturan klasifikasi hanya melihat **teks** kesalahan lengkap (diperlukan untuk
mencocokkan penanda body seperti `额度不足`) untuk penyedia yang tercantum dalam
allowlist `FULL_TEXT_RULE_PROVIDERS` di `providerErrorRules.ts` — saat ini hanya
`"agentrouter"`. Untuk setiap penyedia **katalog bawaan** lainnya,
`checkFallbackError` hanya memberikan kesalahan terstruktur (`{code, type}`)
kepada `getProviderErrorRuleMatch`, yang cukup untuk aturan berbasis
header/status/code tetapi tidak dapat melihat penanda teks body.
Helper `resolveRuleMatchBody()` melakukan pemilihan ini: teks kesalahan lengkap
untuk penyedia dalam allowlist, dan kesalahan terstruktur untuk penyedia
lainnya. Menambahkan penyedia **bawaan** ke `FULL_TEXT_RULE_PROVIDERS` adalah
opt-in eksplisit per penyedia — mekanisme ini ada agar jalur default untuk setiap
penyedia yang tidak berada dalam daftar tetap tidak berubah byte demi byte.

`scope` suatu aturan (`model` / `provider` / `connection`) adalah opt-in yang
terpisah dari `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` hanya
menampilkannya sebagai `fallbackResult.ruleScope`, dan konsumen downstream hanya
menghormatinya sebagai sesuatu selain label informasional untuk penyedia yang
tercantum dalam allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di file yang sama
(dikendalikan melalui `honorsRuleLockScope()` — saat ini hanya
`"agentrouter"`). Lihat "Kesalahan kuota yang dinyatakan ulang" di atas untuk
penjelasan tentang apa yang sebenarnya dilakukan kecocokan
`scope: "connection"` setelah penyedia berada dalam allowlist tersebut.

**#11104 — aturan yang dideklarasikan operator melewati kedua allowlist.**
Operator dapat mendeklarasikan aturan per penyedia saat runtime melalui
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
tanpa mengedit file ini. Menempatkan aturan operator di balik
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist yang
dimaksudkan untuk melindungi perilaku **default** aturan katalog bawaan — akan
membuat mekanisme settings tidak berfungsi untuk setiap penyedia kecuali yang
sudah tercantum di sana, karena deklarasi aturan tersebut sudah merupakan
opt-in eksplisit dari operator. `resolveRuleMatchBody()` dan
`honorsRuleLockScope()` sama-sama memeriksa `hasOperatorRuleForProvider()` lebih
dahulu: penyedia yang memiliki aturan operator akan mendapatkan teks kesalahan
mentah dan `scope` yang dideklarasikannya akan dihormati, terlepas dari apakah
penyedia tersebut juga muncul dalam salah satu allowlist.

**Aturan yang dideklarasikan operator** (`OperatorProviderErrorRule`): setiap
aturan memiliki `status` opsional dan `match` opsional (substring biasa yang
tidak membedakan huruf besar-kecil dari teks kesalahan, bukan RegExp, sehingga
tidak dapat menyebabkan ReDoS), dan harus menetapkan setidaknya salah satunya.
Jika keduanya ditetapkan, keduanya digabungkan dengan AND; field yang dihilangkan
cocok dengan apa pun, sehingga `{match: "insufficient_quota"}` cocok dengan
status apa pun yang membawa kode tersebut. Aturan pertama yang cocok akan
digunakan. `cooldownMs` menerima hingga 30 hari; total maksimal 50 aturan.

**Default serba-cakup** (`settings.providerErrorDefaults`, opt-in, ditetapkan melalui
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
dengan `cooldownMs` dari 1 menit hingga 30 hari. Default hanya berlaku jika tidak
ada aturan operator maupun aturan katalog bawaan yang cocok, dan hanya untuk error
402, 403, 408, 429, dan 5xx. Error berbentuk permintaan (400, 404, 409, 413, 422)
dan 401 tanpa detail tetap menggunakan penanganannya sendiri. Jika tidak ada
`reason` yang eksplisit, alasan diambil dari status, dengan cara yang sama seperti
yang dilakukan `classifyError`. Mendeklarasikan default dianggap sebagai aturan
operator oleh `hasOperatorRuleForProvider()`, sehingga `scope`-nya (default
`"connection"`) diterapkan. Cooldown efektif dari sebuah default adalah yang lebih
lama antara `cooldownMs`-nya dan petunjuk percobaan ulang milik provider
(`Retry-After`, `x-ratelimit-reset`, atau petunjuk reset di body, yaitu petunjuk
yang sama yang diterapkan engine saat pengaturan connection-cooldown
"use upstream retry hints" aktif), sehingga default dapat memperpanjang petunjuk
upstream yang singkat, tetapi tidak pernah mempersingkat reset yang sebenarnya.
Aturan operator eksplisit mempertahankan `cooldownMs`-nya secara persis. Baik
aturan maupun default tidak melewati guard connection-cooldown di
`markAccountUnavailable`: cooldown aktif yang lebih lama tidak pernah dipersingkat
dan status terminal tidak pernah ditimpa. Detektor teks bawaan yang berjalan lebih
awal di `checkFallbackError` (kredit habis, kuota harian, akun dinonaktifkan) tetap
mendapat prioritas untuk frasa masing-masing.

**Kesenjangan yang diketahui — `providerRuleRegistry` tidak pernah diperiksa untuk HTTP 400.**
Cabang `BAD_REQUEST` pada `checkFallbackError` sepenuhnya mengklasifikasikan status
400 melalui array pola miliknya sendiri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, dan sebagainya di `accountFallback.ts`) dan keluar
sebelum cabang `configuredRule`/`getProviderErrorRuleMatch` di atasnya tercapai.
Aturan katalog bawaan (atau aturan operator) dengan `status: 400` valid secara
sintaksis, tetapi tidak akan pernah dijalankan. Saat ini tidak ada aturan yang
menargetkan 400, sehingga tidak ada dampak pada production — tetapi aturan 400 di
masa mendatang perlu menyentuh cabang ini terlebih dahulu, yang merupakan perubahan
lebih besar daripada sekadar menambahkan aturan (perubahan ini
mengklasifikasikan ulang 400 untuk setiap provider yang sudah mengandalkan perilaku
array pola tersebut) dan berada di luar cakupan penambahan aturan untuk satu
provider.

### Menambahkan gateway baru yang salah menyatakan kuota

1. Daftarkan satu array aturan di `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pertahankan `textMarkers`
   khusus untuk provider; jangan pernah menggunakan ulang frasa bahasa Inggris
   generik yang bertabrakan dengan `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Secara opsional, daftarkan aturan klasifikasi di
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk memilih
   cakupan lock yang tepat (`connection` untuk kuota seluruh akun, `model` untuk
   error per model). Langkah ini hanya berlaku di production untuk provider yang
   aturannya memerlukan teks error lengkap (penanda body): tambahkan id provider ke
   `FULL_TEXT_RULE_PROVIDERS` di file yang sama — jika tidak, `checkFallbackError`
   hanya akan memberikan error terstruktur `{code, type}` kepada aturan tersebut dan
   aturan berbasis teks body tidak akan pernah cocok dengan traffic langsung.
   Aturan yang hanya mencocokkan `status`/`headers` (seperti milik Opencode atau
   Minimax) tidak memerlukan opt-in ini. Secara terpisah, jika aturan mendeklarasikan
   `scope: "connection"` dan tujuannya adalah cooldown seluruh koneksi yang
   sebenarnya sekaligus combo skip untuk request yang sama (bukan sekadar label
   informatif), tambahkan id provider ke `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di file
   yang sama — inilah yang mengatur konsumsi bergaya
   `isAgentrouterConnectionQuotaScope()` di `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) dan `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope` tetap mengalir
   melalui `fallbackResult.ruleScope`, tetapi tidak ada tindakan yang dilakukan
   terhadapnya.
3. Tambahkan pengujian unit yang meniru
   `tests/unit/upstream-status-restatement.test.ts`
   dan `tests/unit/agentrouter-error-rules.test.ts` (termasuk guard
   not-permanent / not-creditsExhausted, serta — jika provider memerlukan
   allowlist — pengujian yang memastikan `resolveRuleMatchBody()` mengembalikan
   teks lengkap hanya untuk provider tersebut).

Tidak diperlukan perubahan pada `chatCore.ts`, `classifyError`, atau combo.

#### Lock berbasis bucket egress (#10880)

Provider dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) diperlakukan
sebagai upstream berbasis bucket IP (free tier opencode berbasis IP, bukan berbasis
akun — lihat #9611): status-429 yang diklasifikasikan sebagai `quota_exhausted`
**atau** `rate_limit_exceeded` mendinginkan setiap koneksi dari keluarga yang
diizinkan yang IP egress terakhirnya diketahui cocok dengan IP koneksi yang gagal,
sebelum rotasi dapat mencoba koneksi tersebut
— sehingga menghindari pemanggilan upstream yang dijamin gagal sebanyak N-1
(bentuk yang sama seperti #10460/#10525).
`rate_limit_exceeded` disertakan secara sengaja: pada jalur
`markAccountUnavailable`, aturan khusus opencode tidak pernah cocok (tidak ada
headers/body yang diberikan ke `checkFallbackError`, opencode tidak termasuk dalam
`FULL_TEXT_RULE_PROVIDERS`), sehingga 429 yang body-nya memuat teks kuota
langganan ("monthly usage limit reached") diklasifikasikan sebagai
`quota_exhausted` oleh fallback teks kuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 jam) sebelum
aturan `status_429` tercapai — sementara 429 tanpa teks kuota (pembatasan laju
biasa) diklasifikasikan melalui aturan `status_429` sebagai
`rate_limit_exceeded` dan tetap mendinginkan keluarga IP tersebut. Untuk provider
yang diizinkan, rate limit berbasis IP merupakan sinyal yang sama dengan kuota yang
habis. Batasan yang wajar:

- **Upaya terbaik**: lock menyelesaikan `egress_ip` terakhir yang diketahui dari koneksi
  melalui `proxy_logs` (jendela 24 jam, sinkron, tanpa cache). Cache dingin (IP
  egress belum pernah diproba) atau tidak ada baris → koneksi yang gagal tetap
  didinginkan oleh branch (dicatat seperti saat ini), hanya sibling yang tidak
  di-lock.
- **Tidak pernah terminal**: cooldown adalah jendela kuota yang diperbarui
  (`testStatus: "unavailable"`); state permanen tidak pernah diturunkan dari
  sinyal tingkat IP. Koneksi `disableCooling` melewati branch sepenuhnya.
- **Granularitas lock berubah untuk keluarga yang di-allowlist**: ini adalah
  perubahan scope, bukan hanya optimasi sibling. opencode adalah provider
  `passthroughModels`, sehingga sebelum branch ini, 429 menghasilkan lockout
  per-MODEL; sekarang 429 menghasilkan cooldown koneksi — termasuk bagi operator
  yang menjalankan satu koneksi tanpa sibling sama sekali. Itulah granularitas
  yang sudah dinyatakan benar oleh tabel aturan opencode (`scope: "connection"`,
  `providerErrorRules.ts`), tetapi sejauh ini tidak pernah dipatuhi karena opencode
  tidak ada di `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Branch ini menulis cooldown
  koneksi yang gagal + `backoffLevel` itu sendiri, meniru branch
  agentrouter dengan scope koneksi, lalu mengembalikan hasil — blok per-model dan
  jalur generik di bawahnya tidak pernah tercapai.
- **Combo disertakan**: seperti branch agentrouter, scope ini sengaja
  mengabaikan downgrade `persistUnavailableState`/`isCombo` yang diterapkan
  caller combo pada 429. Lockout per-model bukan bentuk yang lebih lemah dari
  scope ini, melainkan unit yang keliru: ia tidak memberi informasi apa pun
  tentang IP yang telah kehabisan kuota, sehingga rotasi combo akan terus
  menghabiskan satu panggilan yang dijamin gagal pada setiap sibling.
- **Keamanan sibling**: sibling yang sudah terminal (banned/credits_exhausted)
  atau sudah berada dalam cooldown yang lebih lama tidak pernah ditimpa.
- **Allowlist eksklusif**: memperluas `EGRESS_BUCKETED_LOCK_PROVIDERS` adalah
  keputusan eksplisit pemilik; tidak ada wiring generik (pattern #10334/#10419).
  Query sibling menggunakan allowlist yang sama tersebut, bukan mengulanginya
  sebagai literal SQL, sehingga perluasan tetap menjadi perubahan satu baris.
- **Rotasi IP egress, kedua arah**: jendela pencarian (24 jam) jauh lebih lebar
  daripada TTL cache IP egress (5 menit), sehingga "IP terakhir yang diketahui"
  adalah riwayat, bukan state saat ini. Jika proxy suatu koneksi berotasi dalam
  jendela tersebut, lock dapat **melewatkan** IP yang benar-benar digunakan
  bersama (IP yang tercatat adalah IP baru yang belum kehabisan kuota) — dan
  secara simetris dapat **mendinginkan sibling yang sejak itu telah berotasi
  menjauh** dari IP yang kehabisan kuota. Kasus kedua membebani sibling tersebut
  dengan satu jendela cooldown; keduanya diterima sebagai batasan best-effort
  dari pencarian berbasis riwayat.
- **Biaya**: dua pemindaian terbatas pada `proxy_logs` (difilter berdasarkan
  jendela melalui `idx_pl_timestamp`), hanya pada frekuensi 429. Tidak ada indeks
  baru (migrasi 134 YAGNI). Diukur pada salinan DB dengan lalu lintas nyata
  berukuran sedang; instance dengan throughput tinggi menyimpan lebih banyak
  baris secara proporsional dalam jendela yang sama.

## Fitur Ketahanan Lainnya

- **22 strategi perutean** (prioritas, berbobot, round-robin, relai konteks, isi terlebih dahulu, p2c, acak, paling jarang digunakan, dioptimalkan biaya, sadar-reset, jendela-reset, kedaluwarsa-pertama, ruang kepala, berbobot kuota, acak ketat, otomatis, lkgp, dioptimalkan konteks, dioptimalkan cache, fusion, pipeline, jev) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Perutean yang sadar akan pengaturan ulang** (v3.8.0) — memprioritaskan koneksi berdasarkan waktu reset kuota.
- **Degradasi mode latar belakang** — Responses API `background: true` terdegradasi untuk disinkronkan dengan peringatan.
- **Deteksi batas alat dinamis** — mundur dari penyedia ketika batas jumlah alat tercapai.
- **Penggantian darurat** — dikendalikan oleh `OMNIROUTE_EMERGENCY_FALLBACK`; operator dapat menimpanya dari halaman Feature Flags tanpa memulai ulang.

---

## Debugging

- Weighted combo menjawab `503 all_targets_cooling_down` (`Retry-After` diatur, `diagnostics.excluded` mencantumkan setiap target dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool sudah dikonfigurasi dan terhubung, setiap target hanya dikecualikan oleh timer ketahanan; peringatan `[COMBO] Weighted selection: every target excluded before dispatch — …` menyebutkan alasan dan detik yang tersisa. `404 no_executable_targets` dari combo yang sama berarti tidak ada timer ketahanan yang terlibat (tidak ada yang bisa dijalankan, atau setiap akun gagal dalam probe ketersediaan). Dibangun di `open-sse/services/combo/pinRecovery.ts` dari pengecualian yang dikumpulkan di `targetResolution.ts`.
- Semua key untuk suatu provider dilewati → periksa state circuit breaker DAN `rateLimitedUntil`/`testStatus` setiap koneksi.
- Provider dikecualikan secara permanen setelah jendela reset → kode membaca `state` mentah alih-alih `getStatus()`/`canExecute()`.
- Satu key gagal, yang lain seharusnya berfungsi → utamakan cooldown koneksi daripada circuit breaker.
- Hanya satu model yang gagal → utamakan model lockout daripada cooldown koneksi.
- State seharusnya pulih sendiri tetapi tidak → periksa timestamp di masa depan + jalur baca yang menyegarkan state kedaluwarsa. Status permanen memerlukan perubahan manual.

---

## State runtime — referensi cepat agen

> Dipindahkan apa adanya dari `AGENTS.md` → "Resilience Runtime State" (PR #12743) agar
> panduan agen tetap di bawah anggaran konteks 40k. Ini adalah tampilan ringkas yang ditujukan
> untuk agen dari bagian-bagian di atas; bagian bernomor tetap menjadi referensi lengkap.

OmniRoute memiliki tiga mekanisme kegagalan sementara yang saling terkait tetapi berbeda.
Jaga agar cakupannya tetap terpisah saat men-debug perilaku routing. Lihat
[diagram ketahanan 3 lapis](../diagrams/exported/resilience-3layers.svg)
(sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
untuk peta sekilas.

### Circuit Breaker Provider

**Cakupan**: seluruh provider, mis. `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan pengiriman trafik ke provider yang berulang kali gagal di tingkat
upstream/layanan, sehingga satu provider yang tidak sehat tidak memperlambat setiap permintaan.

**Implementasi**:

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Pengkabelan gate/eksekusi chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper bersama: `open-sse/services/accountFallback.ts`
- Tabel state yang dipersistensikan: `domain_circuit_breakers`

**State** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: trafik normal diizinkan.
- `DEGRADED`: pita peringatan dini — kegagalan telah melewati ambang degradasi tetapi belum
  melewati ambang breaker; trafik masih mengalir, dashboard menampilkan peringatan. Uji koneksi
  yang valid atau jendela tenang tanpa kegagalan baru mengembalikannya ke `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` memuat jendelanya).
- `OPEN`: provider diblokir sementara; pemanggil mendapat respons provider-circuit-open
  atau routing combo beralih ke target lain.
- `HALF_OPEN`: timeout reset telah berlalu; izinkan satu permintaan probe. Keberhasilan menutup
  breaker, kegagalan membukanya lagi.

**Default** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, dikonsumsi melalui
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` di `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` di `src/sse/handlers/chatHelpers.ts`). Breaker seluruh
provider berjalan pada `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | terdegradasi pada | terbuka pada (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ----------------: | ---------------------------------------: | ----------------------------: |
| OAuth   |               `5` |                                      `8` |                         `60s` |
| API key |               `7` |                                     `12` |                         `30s` |
| Local   |      (diturunkan) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` juga mendefinisikan `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 menit) dan `providerCooldownMs` (5/10/1 menit): ketiganya
menggerakkan **window gate dari Provider Cooldown global yang bersifat opt-in**
(`PROVIDER_COOLDOWN_ENABLED`, default nonaktif) — entri tingkat provider di
`open-sse/services/providerCooldownTracker.ts` hanya dihitung sebagai cooling setelah
kegagalan sebanyak `providerFailureThreshold` di dalam `providerFailureWindowMs`, lalu
cooling selama `providerCooldownMs`. Keduanya BUKAN ambang breaker yang aktif — jangan
menyetelnya dengan harapan mengubah perilaku breaker. Setiap default dapat ditimpa melalui
env var `OMNIROUTE_PROVIDER_BREAKER_*` dan `OMNIROUTE_CIRCUIT_BREAKER_*`; tabel referensi
yang akurat sesuai runtime ada di `docs/architecture/RESILIENCE_GUIDE.md`.

Hanya status kegagalan tingkat provider yang boleh memicu breaker provider:

```ts
(408, 500, 502, 503, 504);
```

Jangan memicu breaker seluruh provider untuk kesalahan akun/key/model biasa seperti kebanyakan
kasus `401`, `403`, atau `429`. Biasanya itu termasuk ranah cooldown koneksi atau model
lockout. `403` provider API-key generik seharusnya dapat dipulihkan kecuali jika diklasifikasikan
sebagai kesalahan provider/akun yang terminal.

Breaker menggunakan pemulihan lazy, bukan timer latar belakang. Ketika `OPEN` kedaluwarsa, pembacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` akan menyegarkan state menjadi `HALF_OPEN`, sehingga dashboard dan pembuat kandidat combo tidak terus mengecualikan provider yang sudah kedaluwarsa selamanya.

### Cooldown Koneksi

**Cakupan**: satu koneksi/akun/kunci provider.

**Tujuan**: melewati sementara satu kunci/akun yang bermasalah sambil membiarkan koneksi lain untuk provider yang sama tetap melayani permintaan.

**Implementasi**:

- Jalur penulisan/pembaruan: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/penyaringan akun: `src/sse/services/auth.ts::getProviderCredentials...`
- Perhitungan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

Field penting pada koneksi provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Selama pemilihan akun, koneksi dilewati ketika:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga bersifat lazy: ketika `rateLimitedUntil` sudah berlalu, koneksi menjadi memenuhi syarat lagi. Setelah penggunaan berhasil, `clearAccountError()` membersihkan `testStatus`, `rateLimitedUntil`, field error, dan `backoffLevel`.

Perilaku cooldown koneksi default:

- Cooldown dasar OAuth: `5s`.
- Cooldown dasar API-key: `3s`.
- `429` pada API-key sebaiknya mengutamakan petunjuk retry dari upstream (`Retry-After`, header reset, atau teks reset yang dapat di-parse) bila tersedia.
- Kegagalan berulang yang dapat dipulihkan menggunakan exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Perlindungan anti-thundering-herd mencegah kegagalan konkuren pada koneksi yang sama berulang kali memperpanjang cooldown atau menaikkan `backoffLevel` dua kali.

State terminal bukanlah cooldown. `banned`, `expired` (yang baru menjadi terminal setelah N percobaan ulang terbatas melalui `EXPIRED_RETRY_MAX`), dan `credits_exhausted` dimaksudkan untuk tetap tidak tersedia sampai kredensial/pengaturan berubah atau operator mengatur ulang secara manual. Jangan menimpa state terminal dengan state cooldown sementara.

### Penguncian Model

**Cakupan**: provider + koneksi + model.

**Tujuan**: menghindari penonaktifan seluruh koneksi ketika hanya satu model yang tidak tersedia atau dibatasi kuotanya untuk koneksi tersebut.

Contoh:

- Provider dengan kuota per model yang mengembalikan `429`.
- Provider lokal yang mengembalikan `404` untuk satu model yang tidak ditemukan.
- Kegagalan izin mode/model spesifik provider seperti mode Grok tertentu.

Penguncian model berada di `open-sse/services/accountFallback.ts` dan memungkinkan koneksi yang sama tetap melayani model lain.

### Panduan Debugging

- Jika semua kunci untuk suatu provider dilewati, periksa state breaker provider maupun `rateLimitedUntil`/`testStatus` setiap koneksi.
- Jika provider tampak dikeluarkan secara permanen setelah jendela reset, periksa apakah kode membaca `state` mentah alih-alih menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci provider gagal tetapi kunci lain seharusnya berfungsi, utamakan cooldown koneksi daripada breaker provider.
- Jika hanya satu model yang gagal, utamakan penguncian model daripada cooldown koneksi.
- Jika suatu state seharusnya pulih sendiri, state tersebut harus memiliki timestamp masa depan/timeout reset dan jalur pembacaan yang menyegarkan state yang kedaluwarsa. Status permanen memerlukan perubahan kredensial atau konfigurasi secara manual.

---

## Fingerprinting TLS & Stealth

Stealth spesifik provider (JA3/JA4, CCH, obfuskasi) didokumentasikan secara terpisah — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompilasi ke dalam `/docs`).

---

## Pengujian resiliensi (Phase 8 · Block C)

Selain unit test untuk logika resiliensi, tiga pengujian menguji runtime dalam kondisi stres/kegagalan nyata (semuanya integration/nightly — tidak ada yang memblokir PR):

| Pengujian   | Apa                                                                                                                                                                                                      | Jalankan                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Node fake-upstream menyuntikkan latensi/reset/timeout/503 nyata; memvalidasi bahwa circuit breaker terbuka/pulih dan `checkFallbackError` mengklasifikasikan 503 sebagai fallback yang dapat dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream per `createSSEStream` dengan `--expose-gc`; gagal jika heap tumbuh melampaui batas (pengaman OOM #3069).                                                                                     | `npm run test:heap`                      |
| k6 soak     | Beban berkelanjutan terhadap `/api/monitoring/health`; ambang batas p95/error.                                                                                                                           | `k6 run tests/load/k6-soak.js` (nightly) |

Diorkestrasikan oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Pada `test:integration` default, chaos dan heap dilewati secara otomatis (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Arsitektur](./ARCHITECTURE.md) — Arsitektur sistem dan internalnya
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Provider, kombo, integrasi CLI
- [Mesin Auto-Combo](../routing/AUTO-COMBO.md) — Penskoran 16 faktor, paket mode
