# Resilience Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute mempunyai tiga mekanisme ketahanan yang berbeza tetapi berkaitan. Masing-masing mempunyai skop dan tujuan yang berbeza. Pastikan mereka berasingan apabila menyahpepijat gelagat penghalaan.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Keutamaan Env-vs-papan pemuka untuk togol daya tahan.** Ketahanan ikut serta menogol daripada persekitaran — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — hanya membekalkan _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean berterusan dalam `resilienceSettings` (Papan pemuka →** Tetapan → Ketahanan** / `PATCH /api/resilience`, disimpan dalam `key_value`) memenangi nilai env: normalisasi (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mengekalkan boolean yang disimpan apabila wujud. Menetapkan env var kepada `true` pada penempatan di mana papan pemuka sudah menyimpan `false` oleh itu tidak mengubah apa-apa — flip togol masuk** Tetapan → Ketahanan** (atau kosongkan medan yang disimpan) sebaliknya.

## 1. Pemutus Litar Pembekal

**Skop:** keseluruhan pembekal (cth., `glm`, `openai`, `anthropic`).

**Tujuan:** menghentikan penghantaran trafik ke pembekal yang gagal berulang kali pada peringkat huluan/perkhidmatan.

**Pelaksanaan:**

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Pendawaian: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API set semula: `POST /api/resilience/reset`
- Pembalut: `open-sse/services/accountFallback.ts`
- Jadual DB: `domain_circuit_breakers`

**Keadaan:**

- `CLOSED` — trafik normal dibenarkan
- `DEGRADED` — trafik masih dibenarkan, tetapi kegagalan pembekal yang meningkat sedang dijejaki; kembali kepada `CLOSED` apabila terdapat kejayaan yang mencukupi, apabila ujian sambungan sah, atau selepas tempoh pegangan `OPEN` yang paling lama bagi jenis kegagalan terakhir (nilai `cooldownByKind` miliknya, jika tiada `resetTimeout`, × `maxBackoffMultiplier`, sekurang-kurangnya satu tempoh bertenang) tanpa kegagalan baharu
- `OPEN` — pembekal disekat buat sementara; penghalaan kombo melangkauinya
- `HALF_OPEN` — tamat tempoh set semula telah berlalu; permintaan siasatan dibenarkan

**Nilai lalai boleh konfigurasi (`open-sse/config/constants.ts`, didedahkan dalam Dashboard → Settings → Resilience):**

| Kelas    | Merosot pada | Terbuka pada | Tempoh set semula |
| -------- | ------------ | ------------ | ----------------- |
| OAuth    | 5 kegagalan  | 8 kegagalan  | 60s               |
| API-key  | 7 kegagalan  | 12 kegagalan | 30s               |
| Tempatan | diterbitkan  | 2 kegagalan  | 15s               |

`degradationThreshold` mengawal bila sesebuah pembekal memasuki `DEGRADED`; `failureThreshold` mengawal bila ia terbuka dan dilangkau. Profil pembekal tempatan belum didedahkan pada halaman tetapan Resilience lagi.

**Kod pencetus:** hanya status peringkat pembekal `[408, 500, 502, 503, 504]`. JANGAN cetuskan untuk ralat peringkat akaun (kebanyakan 401/403/429 — itu tergolong dalam tempoh bertenang atau sekatan akaun).

**Pemulihan malas:** apabila `OPEN` tamat tempoh, `getStatus()`, `canExecute()`, `getRetryAfterMs()` menyegarkan keadaan kepada `HALF_OPEN`. Bacaan yang sama (dan kegagalan seterusnya) menyusutkan `DEGRADED` yang lapuk kembali kepada `CLOSED`. Tiada pemasa latar belakang diperlukan.

---

### Provider Cooldown global opt-in (pintu tetingkap)

Lapisan keempat yang bersifat **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, lalai **mati**) menyimpan ingatan merentas permintaan bagi pembekal yang gagal dalam
`open-sse/services/providerCooldownTracker.ts`, dirujuk oleh penentuan sasaran kombo supaya permintaan kombo berturut-turut berhenti menjejaki semula pembekal yang baru sahaja gagal. Entri peringkat pembekal mematuhi pintu tetingkap `PROVIDER_PROFILES`:

| Profil  | tercetus selepas (`providerFailureThreshold`) | dalam (`providerFailureWindowMs`) | bertenang selama (`providerCooldownMs`) |
| ------- | --------------------------------------------: | --------------------------------: | --------------------------------------: |
| OAuth   |                                          `10` |                           `15min` |                                  `5min` |
| API key |                                          `15` |                           `30min` |                                 `10min` |

Di bawah ambang, pembekal **tidak** dianggap sedang bertenang; kejayaan mengosongkan tetingkap. Entri peringkat sambungan (`provider:connectionId`) mengekalkan peningkatan eksponen `minRetryCooldownMs → maxRetryCooldownMs` sebaliknya. Penggantian:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Pengawal regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Tempoh Bertenang Sambungan

**Skop:** sambungan/akaun/kunci penyedia tunggal.

**Tujuan:** langkau satu kunci bermasalah sementara sambungan lain untuk penyedia yang sama terus memberikan perkhidmatan.

**Pelaksanaan:**

- Tandakan tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan: `getProviderCredentials*` dalam fail yang sama
- Pengiraan tempoh bertenang: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

**Medan bagi setiap sambungan:**

- `rateLimitedUntil` — cap masa sehingga tempoh bertenang tamat
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — pembilang exponential backoff

**Tempoh bertenang lalai:**

- Asas OAuth: 5s
- Asas kunci API: 3s
- API-key 429: mengutamakan pengepala `Retry-After`/reset daripada upstream/teks reset yang boleh dihuraikan
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Kelewatan percubaan semula bagi setiap penyedia.** Halaman butiran penyedia mempunyai pilihan **Kelewatan percubaan semula** (Auto, 15s hingga 1h). Ia menyimpan `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, melalui `PATCH /api/resilience`). Apabila ralat had kadar tidak membawa petunjuk percubaan semula daripada upstream, nilai tersebut menggantikan backoff berskala bagi penyedia dan menetapkan semula `backoffLevel` kepada 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Keutamaan bagi ralat yang dihadkan kadar, daripada tertinggi: petunjuk percubaan semula daripada upstream, kemudian `providerSpecificData.rotationOverrides.rateLimitResetSeconds` bagi setiap sambungan, kemudian kelewatan percubaan semula bagi setiap penyedia, kemudian `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` daripada env, kemudian backoff berskala. Auto mengalih keluar medan tersebut. Ia hanya mempengaruhi sebab had kadar, bukan keadaan terminal.

**Perlindungan anti-thundering-herd:** menghalang kegagalan serentak daripada memanjangkan tempoh bertenang secara berlebihan atau menambah `backoffLevel` dua kali.

**429 had konkurensi tidak menaikkan tangga backoff.** `429` yang badannya melaporkan had konkurensi ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) bermaksud akaun sihat tetapi sibuk. `checkFallbackError()` mengembalikan sebab `concurrency_limited`: beralih ke sambungan seterusnya sekarang, menyejukkan sambungan ini selama `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) yang tetap atau petunjuk percubaan semula daripada upstream, mengekalkan `backoffLevel` tanpa perubahan, dan menetapkan `skipProviderBreaker`. Badan kuota eksplisit tetap diutamakan, jadi badan yang turut sepadan dengan corak kuota kekal sebagai keputusan kuota. Pengesanan: `looksLikeConcurrencyLimit()` dalam `src/shared/utils/classify429.ts`; keputusan: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` pemutus litar) tidak berubah dan masih membaca `rate_limit` bagi badan-badan ini.

**Kebuntuan kandungan strim tidak menyejukkan akaun.** Apabila pemantau kebuntuan kandungan (`open-sse/utils/streamHandler.ts`) berputus asa terhadap strim yang tidak menghantar output model dalam tempoh yang ditetapkan, `markAccountUnavailable()` merekodkan ralat pada sambungan tetapi tidak menetapkan tempoh bertenang: kebuntuan itu berkaitan dengan permintaan tersebut, lazimnya giliran penaakulan yang panjang tanpa output lagi. Pengendali boleh memilih untuk mengaktifkannya semula dengan `resilienceSettings.streamStallCooldown.enabled` (lalai `false`).

**Isyarat kependaman pilihan untuk pemilihan akaun `p2c`.** Setiap percubaan yang dihantar merekodkan masa hingga bait pertama dan hasil bagi setiap sambungan (serta bagi setiap sambungan + model) dalam tetingkap bergulir dalam memori: 20 sampel terakhir dalam tempoh 15 minit (`open-sse/services/connectionLatencyTracker.ts`, direkodkan daripada `safeLogEvents()` dalam `src/sse/handlers/chatHelpers.ts`). Apabila `resilienceSettings.p2cLatency.weight` melebihi `0` (julat 0-20, lalai `0` = dimatikan), `compareP2CConnections()` dalam `src/sse/services/auth.ts` menambah sehingga `weight` mata kepada setiap calon dalam pasangan tersebut. Separuh daripadanya datang daripada kependaman sebagai nisbah kepada calon yang lebih pantas (dua kali lebih perlahan mengambil separuh penuh itu) dan separuh lagi daripada kadar ralat bergulir. Istilah ini hanya digunakan apabila kedua-dua calon mempunyai sekurang-kurangnya 3 sampel, supaya akaun baharu tidak dikenakan penalti, dan silingnya kekal di bawah penalti disekat kuota dan kuota habis. Ia tidak menambah litar tersendiri: akaun yang gagal masih diuruskan oleh lapisan tempoh bertenang, kunci keluar dan pemutus litar. Tetapkannya dengan `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Bingkai penaakulan memulakan semula bajet kebuntuan kandungan.** Model penaakulan boleh berfikir selama beberapa minit sebelum token kelihatan pertamanya: Claude menstrim bingkai `thinking_delta` yang teks fikirannya mungkin kosong, dan Responses API menstrim satu item penaakulan demi satu. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) mengenali bingkai-bingkai ini, dan pemantau memulakan semula bajetnya pada setiap bingkai dan bukannya membatalkan giliran tersebut. Bingkai-bingkai ini masih bukan output model, jadi giliran yang berakhir dengan penaakulan sahaja masih dilaporkan sebagai kosong, dan giliran yang berhenti menaakul lalu hanya menghantar denyutan jantung masih mencetuskan pemantau.

Bingkai `reasoningContentEvent` binari Kiro dengan tandatangan yang tidak kosong mengekalkan aktiviti penaakulan ini melalui pelaksana sebagai delta `reasoning_content` yang kosong. Tandatangan tersebut tidak dihantar. Metadata, bingkai tidak lengkap dan tandatangan kosong tidak memulakan semula bajet kandungan; tamat masa strim aktif yang bebas dan pembatalan oleh klien masih terpakai (`open-sse/executors/kiro/reasoning.ts`).

**Keadaan terminal (BUKAN tempoh bertenang):**

- `banned` — ditetapkan oleh pengesanan kata kunci larangan / larangan akaun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md)). Penolakan per permintaan daripada upstream (`request_rejected`, contohnya OAuth Anthropic 403 "Request not allowed") tidak pernah menetapkannya: penolakan tersebut dikira mengikut sambungan dan model serta mengeluarkan model itu daripada putaran dengan tempoh bertenang yang semakin meningkat dan dihadkan pada `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), atau menyejukkan sambungan apabila tiada model diketahui — `open-sse/services/requestRejectedStreak.ts`
- `expired` (beralih kepada terminal selepas percubaan semula yang terhad — `EXPIRED_RETRY_MAX = 3` dengan exponential backoff — supaya ralat OAuth sementara boleh pulih sendiri sebelum akaun dinyahaktifkan secara kekal)
- `credits_exhausted`

Ini kekal sehingga kelayakan berubah atau operator menetapkannya semula. Jangan tulis ganti keadaan terminal dengan keadaan penyejukan sementara.

**Pemulihan malas:** apabila `rateLimitedUntil` telah berlalu, sambungan menjadi layak semula. Selepas penggunaan yang berjaya, `clearAccountError()` mengosongkan semua medan ralat.

### Tembok penggunaan Claude OAuth: lorong keutamaan lebih rendah + penetapan semula had sesi

**Skop:** satu sambungan langganan Claude (OAuth). Kedua-dua ciri adalah **pilihan per sambungan** (Edit connection → bahagian Claude → `lowPriorityMode` / `autoLimitReset` dalam `providerSpecificData`, kedua-duanya dinyahaktifkan secara lalai) dan mencerminkan perintah `/low-priority` dan `/limit-reset` Claude Code (kontrak wayar diambil daripada Claude Code 2.1.263).

**Pelaksanaan:**

- Mesin keadaan + pengelasan respons: `open-sse/services/claudeLowPriority.ts`
- Klien status/tuntutan penetapan semula: `open-sse/services/claudeLimitReset.ts`
- Cangkuk pelaksana (suntikan pengepala + percubaan semula akaun yang sama): `open-sse/executors/base.ts::execute()`
- Pengekalan pilihan: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pencetus:** tembok penggunaan 5 jam — `429` yang pengepalanya membawa
`anthropic-ratelimit-unified-status: rejected` dan, apabila akaun layak,
`anthropic-ratelimit-unified-slow-offer: treatment`. Tiada apa-apa dihantar sebelum
`429` tembok pertama itu; `429` berderet tanpa pengepala unified melalui laluan penyejukan biasa.

**Lorong keutamaan lebih rendah** (`lowPriorityMode`):

- Pada `429` tembok, pelaksana menerima tawaran tersebut dan segera mencuba semula **akaun**
  yang sama dengan `anthropic-usage-limit: slow`; lorong kekal aktif sehingga
  `anthropic-ratelimit-unified-reset` yang diumumkan (+ grace 60 saat) dan setiap permintaan
  dalam tempoh itu membawa pengepala tersebut. `429` yang dipintas tidak pernah sampai ke
  `handleChatCore`, jadi sambungan **tidak** dimasukkan ke dalam penyejukan dan tidak dipindahkan
  ke sambungan lain.
- `anthropic-ratelimit-unified-slow-status` pada respons seterusnya: `active` / `not_needed`
  mengekalkan lorong; `slot_busy` (429) atau `529` menunggu
  `anthropic-ratelimit-unified-slow-retry-after` pelayan (lalai 20 saat, had 5–600 saat, jitter
  ±30%) dan mencuba semula, dengan had yang ditentukan oleh
  `anthropic-ratelimit-unified-slow-max-wait` (lalai 20 minit, had
  1 minit–6 jam) — selepas itu lorong tamat dan tempoh bertenang 10 minit menghalang penerimaan
  semula. Tempoh menunggu juga dihadkan oleh baki masa tamat mula huluan permintaan itu sendiri
  (`resolveFetchStartTimeout`, lalai 10 minit) ditolak margin 5 saat: tanpa had ini, max-wait
  lalai 20 minit akan melebihi tempoh hayat permintaan dan tidur akan dibatalkan di tengah-tengah
  penantian, lalu memaparkan `TimeoutError` dan bukannya tamat `max_wait` + tempoh bertenang yang
  terkawal.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, penggiliran tetingkap 5 jam, atau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang menamatkannya sebagai
  `extra_usage` pada apa-apa status, kerana lebihan berbayar kini meliputi tembok tersebut)
  menamatkan lorong; respons kemudiannya mengalir ke laluan penyejukan biasa.
  `budget_exhausted` diingati sehingga penetapan semula bajet yang diumumkan (≤ 8 hari).
- Semakan tembok berjalan selepas percubaan semula dalam percubaan yang dipacu 400 oleh pelaksana
  sendiri (pengeditan konteks, had pemikiran/usaha, pembelajaran automatik parameter), jadi
  `429` tembok yang hanya muncul pada salah satu percubaan semula itu masih dipintas dan bukannya
  sampai ke laluan penyejukan.
- Keadaan disimpan dalam memori bagi setiap sambungan (mula semula memerlukan satu `429` tembok
  tambahan untuk menerima semula).

**Penetapan semula had sesi** (`autoLimitReset`, dicuba sebelum lorong apabila kedua-duanya aktif):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok
  `juniper_tide`; apabila `arm: "reset"` dan `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan
  `{ "program": "juniper_tide" }` (UUID organisasi daripada `providerSpecificData.organizationUUID`,
  sandaran bootstrap).
- `result: reset|not_limited` → permintaan dicuba semula pada kelajuan penuh (tanpa pengepala
  slow). `already_used` / `not_offered` mengingat `next_available_at` (lalai satu minggu);
  sebarang kegagalan mengundurkan percubaan selama 15 minit. Penetapan semula dilakukan sekali
  seminggu dan masih dikira dalam had mingguan.

Pengawal regresi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afiniti sesi (#7274)

**Skop:** satu sesi klien (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
dipasangkan kepada satu sambungan, untuk **mana-mana** penyedia.

**Tujuan:** mengekalkan ejen berbilang giliran (Claude Code, aider, ejen tersuai) pada akaun yang
sama merentas permintaan, sekali gus mengurangkan kehilangan konteks merentas akaun dan `429`
cold-start berulang pada penyedia yang mempunyai keadaan sesi mengikut akaun.

**Pelaksanaan:**

- Penyelesaian TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pemilihan/penciptaan pasangan: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pengekstrakan pengepala (generik, mana-mana penyedia): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Jadual pasangan yang dikekalkan: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Tetapan: `sessionAffinityTtlMs` (TTL global dalam ms, `0` menyahaktifkan) —
  `src/lib/db/settings.ts`. Dinamakan semula daripada `codexSessionAffinityTtlMs` yang hanya untuk
  Codex oleh migrasi `124_generic_session_affinity_ttl.sql`, yang membawa masuk sebarang TTL Codex
  yang telah dikonfigurasi sebelum ini sebagai lalai baharu.

Sebelum #7274, `resolveSessionAffinityTtlMs()` berhenti awal dengan nilai `0` bagi setiap penyedia
kecuali `codex`, jadi tetapan TTL (dan pengepala sesi) tidak memberi kesan di tempat lain walaupun
mekanisme pemasangan dan pengekstrakan pengepala sudah bebas daripada penyedia. Pembaikan ini
membuang pemulangan awal tersebut; TTL kini digunakan secara seragam pada setiap penyedia setelah
ditetapkan secara global melebihi `0`.

Ketiga-tiga pengepala afiniti sesi tidak pernah diteruskan ke huluan — pelaksana membina pengepala
huluan mereka sendiri dari awal dan bukannya meneruskan pengepala klien, jadi ini kekal sebagai
id korelasi dalaman sahaja.

### Pajakan sambungan sesi terurus eksklusif

**Skop:** satu klien HTTP/sesi terurus aktif memiliki satu sambungan OmniRoute yang layak.

**Tujuan:** menyediakan pemilikan sambungan eksklusif yang tahan lama untuk klien yang memerlukan
pagar penghalaan tegas merentas permintaan. Ini berbeza daripada keafinan sesi, iaitu keutamaan
kesinambungan longgar: pajakan eksklusif mengekalkan keadaan kitar hayat dalam SQLite,
menguatkuasakan keunikan pemilik aktif dan sambungan aktif secara global, serta menolak generasi
yang lapuk sebelum penghantaran kepada penyedia.

Ciri ini bersifat pilihan mengikut kunci API. Kunci terurus mesti mempunyai skop `lease:exclusive`
dan senarai `allowedConnections` yang jelas serta tidak kosong. Mana-mana klien HTTP boleh menggunakan
titik akhir kitar hayat; tiada nama klien, ejen pengguna, penyedia, kaedah OAuth atau model diperlukan.
Pajakan memiliki sambungan, bukannya model, maka perubahan model mengekalkan pengikatan tersebut
selagi sambungan itu kekal layak seperti biasa. Peraturan model, kuota, kesihatan, tempoh bertenang
dan senarai benarkan biasa kekal berkuasa dan boleh memindahkan generasi yang sama kepada sambungan
layak lain yang bebas.

Kitar hayat ialah `POST /api/v1/session-leases` dengan tindakan JSON `acquire`, `renew` dan `release`.
Permintaan inferens terurus mengemukakan nilai legap `X-OmniRoute-Lease-Owner` dan
`X-OmniRoute-Lease-Generation` yang tepat. Pemilik menggunakan `vlo_` diikuti 43 aksara base64url;
hanya cincang SHA-256nya disimpan. Setiap pagar penghantaran akhir turut mengikat ID kunci API yang
disahkan dan ID sambungan aktif. Pengepala kawalan pajakan dibuang daripada log, petikan permintaan
yang disimpan dan pengepala pelaksana huluan.

Jika penghalaan biasa mempunyai calon terurus yang layak tetapi setiap calon bebas diduduki oleh
pajakan aktif asing, OmniRoute mengembalikan HTTP `429`, kod lease-capacity-unavailable, keadaan
waiting-for-capacity dan `Retry-After` yang terhad, yang diperoleh daripada tempoh luput relevan
yang paling awal. Kelayakan kosong biasa bukan perebutan pajakan dan mengekalkan semantik ralat
penghalaan sedia ada.

Mekanisme berkaitan kekal berasingan:

- Penghunian sesi OAuth ialah pengagihan lembut setempat proses untuk akaun OAuth.
- Semaphore akaun memberikan permit keserentakan permintaan dan tamat apabila permintaan selesai.
- Pajakan sesi terurus eksklusif ialah pemilikan kitar hayat yang tahan lama dengan pagar generasi.

## 3. Penguncian Model

**Skop:** gabungan penyedia + sambungan + model.

**Skop mengikut status:** status kegagalan menentukan kunci yang digunakan oleh penguncian
kepada (`resolveLockoutScope()` dalam `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — isyarat kuota atau kelayakan — kunci **keluarga kuota**:
  bagi codex, keseluruhan skop `codex` / `spark` (setiap model
  `gpt-5*` bagi sambungan tersebut), manakala bagi penyedia lain gunakan
  `getQuotaScopedModelForProvider()`.
- `404` mengunci model asas (`getModelLockKey()` memperincikan `not_found`).
- Sebarang status lain — kegagalan pengangkutan/pelayan `5xx` dan `502` yang
  disintesis sendiri oleh OmniRoute daripada pengesahan kualiti — hanya mengunci
  tuple **tepat** penyedia/sambungan/model. Strim yang rosak pada satu model bukan
  bukti tentang kuota akaun; sebelum peraturan ini, satu respons kosong pada
  `codex/gpt-5.6-luna` mengeluarkan setiap model `gpt-5*` bagi sambungan tersebut
  daripada penghalaan selama 2–30 minit (semakin meningkat), sedangkan kuotanya tidak berubah.
- Pilihan `scope` eksplisit pemanggil sentiasa diutamakan (Antigravity menghantar `"exact"`).

**Tujuan:** mengelakkan pelumpuhan keseluruhan sambungan apabila hanya satu model tidak
tersedia atau terhad kuota.

**Contoh:**

- Penyedia kuota setiap model yang mengembalikan 429
- Penyedia tempatan yang mengembalikan 404 untuk satu model yang tiada
- Kegagalan kebenaran mod/model khusus penyedia (contohnya mod Grok)

**Pelaksanaan:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Papan Pemuka Tempoh Bertenang Model (v3.8.0)

UI: Tetapan → Tempoh Bertenang Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menyenaraikan penguncian aktif dengan: penyedia, sambungan, model, sebab, expiresAt. Pengendali
boleh mendayakan semula model secara manual daripada kad tersebut.

**API REST:**

- `GET /api/resilience/model-cooldowns` — menyenaraikan penguncian aktif
- `DELETE /api/resilience/model-cooldowns` — pendayaan semula secara manual. Kandungan: `{provider, connection, model}`. Pengesahan: pengurusan.

### Pengurus Tempoh Bertenang

UI: Pemantauan → Pengurus Tempoh Bertenang (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Satu halaman untuk setiap sambungan yang terkeluar daripada penghalaan atas sebab sementara, dan bukannya
membuka halaman setiap penyedia. Halaman ini menyenaraikan tempoh bertenang sambungan, penguncian
model dan keadaan terminal, mengosongkannya mengikut sambungan, pilihan, atau semua sambungan bagi
sesuatu penyedia, serta menyunting peraturan tempoh bertenang yang paling kerap ditala:
`streamStallCooldown.enabled` dan tempoh bertenang asas `connectionCooldown` serta langkah
undur maksimum untuk OAuth / kunci API (disimpan melalui
`PATCH /api/resilience`). Keadaan terminal (`banned`, `expired`, `credits_exhausted`) disenaraikan
tetapi tidak pernah dikosongkan di sini.

Kad **Peraturan tempoh bertenang ralat** pada halaman yang sama menyunting peraturan ralat
pengendali (`settings.providerErrorRules`) dan lalai tangkapan semua bagi setiap penyedia
(`settings.providerErrorDefaults`) melalui `PATCH /api/settings` — lihat "Peraturan yang
diisytiharkan pengendali" di bawah §7 untuk cara padanannya. Tempoh ialah Lalai (tiada tempoh
bertenang eksplisit), 30 minit, 1 jam, 5 jam, 24 jam atau 1 hingga 43,200 minit tersuai (30 hari).

**API REST** (`src/lib/resilience/cooldownManager.ts`, pengesahan: pengurusan):

- `GET /api/resilience/cooldowns[?provider=]` — sambungan dengan status, tempoh bertenang yang
  berbaki, tahap undur, jenis ralat terakhir dan penguncian model (tiada kelayakan)
- `POST /api/resilience/cooldowns` — kandungan `{connectionIds: string[]}` atau
  `{all: true, provider?}`; mengembalikan `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tetapan penguncian + pemulihan pereputan selepas kejayaan (v3.8.23)

Penguncian model berubah daripada tingkah laku berkod keras yang sentiasa aktif kepada ciri
pilihan yang boleh dikonfigurasikan sepenuhnya, dengan kad tetapannya sendiri dan laluan
pemulihan pembaikan kendiri.

**Kad tetapan:** Tetapan → Penguncian Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Kad ini **berbeza** daripada `ModelCooldownsCard` baca sahaja di atas (yang hanya
_menyenaraikan_ penguncian aktif) — kad baharu ini _mengkonfigurasikan parameter_. Lalai
terletak dalam `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Tetapan                 | Lalai                            | Maksud                                                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Togol induk — penguncian model **dimatikan secara lalai**.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status huluan yang dikira sebagai kegagalan berskop model.                 |
| `baseCooldownMs`        | `120_000` (120 s)                | Tempoh penguncian awal untuk kegagalan pertama.                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Had atas tempoh bertenang yang ditingkatkan.                               |
| `maxBackoffSteps`       | `10`                             | Bilangan maksimum langkah peningkatan undur eksponen.                      |
| `useExponentialBackoff` | `true`                           | Sama ada kegagalan berulang meningkatkan tempoh bertenang secara eksponen. |

Tetapan disimpan melalui stor tetapan biasa dan disahkan melalui skema tetapan daya tahan;
kad ini mengehadkan `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) serta `maxBackoffSteps`.

**Pemulihan pereputan selepas kejayaan:** pemulihan **bukan** semata-mata tamat tempoh pemasa.
Respons yang sihat mengurangkan kiraan kegagalan model supaya model yang pulih di tengah-tengah
tetingkap berhenti meningkatkan kiraan (dan dikosongkan) sebelum pemasanya tamat. Pada sasaran
gabungan yang berjaya, `open-sse/services/combo.ts` memanggil `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), yang **membahagikan dua** nilai
`failureCount` yang disimpan (`Math.floor(failureCount / 2)`); apabila nilainya mencapai `0`,
entri penguncian dipadam sepenuhnya. Pasangan pelengkapnya, `recordModelLockoutFailure()`,
menambah kiraan (dan meningkatkan tempoh bertenang) bagi kegagalan dalam tetingkap peningkatan.
Pereputan selepas kejayaan ini adalah tambahan kepada tamat tempoh pemasa biasa — mana-mana
laluan boleh mendayakan semula model.

**Keadaan:** lockout disimpan **dalam memori** ( `Map` per proses bagi
`ModelLockoutEntry` yang dikunci mengikut `provider:connectionId:model`, kunci skop tepat mengikut
`provider:connectionId:exact:model`), bukannya disimpan dalam
DB — ia hilang apabila dimulakan semula. _Tetapan_ disimpan; _keadaan_ lockout aktif adalah sementara.

---

## 4. Kawalan Keserentakan Quota-Share (v3.8.36)

Akaun langganan (GLM, MiniMax, dll.) lazimnya hanya menerima ~1–3 permintaan serentak; melebihi had ini akan mencetuskan 429 dan tempoh penyejukan. Keadaan ini lebih ketara di bawah gabungan **quota-share** (`qtSd/…`), apabila beberapa kunci API berkongsi satu akaun huluan. Tiga lapisan memastikan akaun yang dikongsi tidak dibanjiri.

### Had keserentakan setiap sambungan (`max_concurrent`)

Setiap sambungan penyedia boleh mengisytiharkan had maksimum `max_concurrent`
(`provider_connections.max_concurrent`, ditetapkan dalam modal sambungan / API / DB).
Biarkan kosong untuk tiada had. Ini ialah satu-satunya tetapan yang memacu lapisan
pensiriilan di bawah — tetapkan kepada keserentakan sebenar akaun tersebut
(contohnya GLM ~1, MiniMax ~2).

### Had keserentakan setiap model (`modelConcurrency`)

Sambungan juga boleh mengisytiharkan had keserentakan tepat bagi setiap model
dalam peta `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Tetapkannya dalam modal sambungan (**Rate limit overrides → Per-model
concurrency caps**, satu `model=cap` bagi setiap baris) atau melalui
`PATCH /api/providers/[id]` dengan bentuk JSON yang sama. Semantik utama:

- **Seluruh sambungan berbanding khusus model:** `maxConcurrent` kekal sebagai had
  dikongsi untuk seluruh sambungan. Apabila kedua-duanya terpakai, kedua-dua pintu
  gerbang diperoleh secara atomik dalam gerbang komposit yang sama
  (`global → provider → account → model`); tingkah laku berkesan ialah had yang
  lebih ketat yang terpakai.
- **Padanan kunci model tepat:** kunci tersebut ialah rentetan model yang dihantar
  kepada pelaksana selepas penyelesaian penghalaan — biasanya id model huluan
  mentah (`glm-5`), bukannya alias `provider/model` di sisi klien
  (`zai/glm-5` tidak sepadan dengan `glm-5`). Nilai mestilah had permintaan
  serentak dalam integer positif.
- **Pengehadan baris gilir setempat, tanpa penemuan:** permintaan berlebihan
  menunggu dalam baris gilir setempat dengan semantik baris gilir/masa tamat
  sedia ada (ralat kemasukan bertipkan `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute tidak menemui atau membuat inferens tentang
  dasar huluan — ia menguatkuasakan had tepat yang dikonfigurasikan oleh
  pengendali. Gerbang model yang penuh tidak pernah menyahdayakan penyedia dan
  tidak pernah mencipta sekatan model kekal; tingkah laku 429/penyejukan/
  sandaran huluan kekal sebagai mekanisme sandaran ralat.
- **Skop setiap sambungan, setiap proses:** had adalah bagi setiap sambungan
  pangkalan data dan disimpan dalam memori, jadi dua sambungan yang menggunakan
  semula kunci API huluan yang sama tidak menyelaras antara satu sama lain.
- **Tidak dikonfigurasikan bermaksud tiada perubahan:** meninggalkan peta
  tersebut (atau membiarkan medan papan pemuka kosong) tidak menambah gerbang
  model. Contoh konfigurasi tanpa menetapkan sebarang had universal penyedia:

```text
glm-5=1
glm-4.7=3
```

### Pensiriilan permintaan quota-share

Apabila penghantaran quota-share menyasarkan sambungan yang mengisytiharkan
`max_concurrent` positif, permintaan serentak kepada **akaun** tersebut disiri
melalui semafor setiap sambungan (kunci `qsconn:<connectionId>`): permintaan
berlebihan **menunggu dalam baris gilir** dan bukannya membanjiri akaun. Ia
bersifat **fail-open** — baris gilir yang penuh atau tamat masa akan meneruskan
permintaan tanpa slot dan bukannya menolak permintaan yang boleh dihantar.
Hidupkan atau matikan dalam **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, lalai
dihidupkan). Tanpa had `max_concurrent`, tingkah laku tidak berubah.

> Gerbang penghalaan quota-share (`selectQuotaShareTarget`, DRR + P2C) itu sendiri
> bersifat fail-open dan hanya _menurunkan keutamaan_ sambungan yang mencapai had —
> dengan kumpulan satu sambungan, ia tidak boleh mengehadkan secara keras, jadi
> semafor inilah yang sebenarnya mengekang limpahan.

### Percubaan semula sedar-penyejukan gabungan

Bagi setiap strategi gabungan (apabila didayakan), permintaan yang akan
menghasilkan 429 untuk tempoh penyejukan sementara SHORT akan menunggu tempoh
tersebut dan dihantar semula, bukannya mengembalikan 429 — ini meliputi tetingkap
TPM/RPM kelas Gemini (~60s `retry-after`) pada gabungan berbilang model, contohnya
apabila kedua-dua sasaran gabungan 2 model mencapai had kadar bagi setiap model.
Dihadkan oleh `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) dalam **Settings → Resilience**. Ia tidak pernah menunggu pada
`quota_exhausted` (dikunci sehingga tengah malam) atau sebab pengesahan/tidak
ditemui.

Gabungan boleh memilih untuk tidak menyertainya dengan
`config.comboCooldownWaitEnabled: false`. Hanya `false` literal menyahdayakan
penantian gabungan dikongsi ini (penyejukan selepas penghantaran dan penantian
litar terbuka/kunci model sebelum penghantaran) serta lanjutan aras dasar masa
tamat belanjawan penantian. Nilai yang tiada atau `true` mengekalkan dasar global;
`true` tidak boleh mendayakan penantian yang dinyahdayakan secara global.
`targetTimeoutMs` yang ditetapkan secara eksplisit tetap diutamakan. Pilihan ini
tidak mengubah penantian penghantaran awal pin giliran native-Codex yang berasingan.

Gerbang yang sama meliputi kes sebelum penghantaran (#16319): apabila setiap
sasaran gabungan dilangkau sebelum sebarang percubaan dibuat kerana modelnya
berada dalam sekatan sementara yang singkat, laluan sifar-percubaan akan menunggu
sekatan tersebut di bawah had yang sama dan menghantar semula, bukannya
mengembalikan `503 ALL_TARGETS_SKIPPED` tanpa petunjuk. Apabila tiada penantian
dibenarkan (had, percubaan atau belanjawan telah habis, atau ciri dimatikan),
respons terminal dinaik taraf kepada `429 rate_limit_error` yang membawa
`retry_after` / `reset_at` daripada tamat tempoh sekatan sementara yang paling
awal; sekatan kuota, pengesahan dan tidak ditemui mengekalkan 503 tanpa petunjuk.

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

## 5. Kawalan Kemasukan Giliran Permintaan (v3.8.49 · isu #6593)

**Skop**: giliran had kadar setiap pembekal+sambungan setempat (`open-sse/services/rateLimitManager.ts`, disokong oleh Bottleneck), satu lapisan di bawah tiga mekanisme di atas.

**`maxWaitMs` menghadkan masa menunggu giliran; `executionMaxWaitMs` menghadkan pelaksanaan.**
Kedua-duanya sengaja dipisahkan, dan tidak ada satu pun yang memberi masukan kepada yang lain.

`resilienceSettings.requestQueue.maxWaitMs` ialah **bajet menunggu giliran**: ia meliputi menunggu slot pembekal dan kemudian berada dalam keadaan QUEUED, dan pemasanya dikosongkan sebaik sahaja tugas meninggalkan QUEUED dan mula dilaksanakan (`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melebihinya tidak akan sampai ke hulu. Lalai 30000ms, dibekalkan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` dalam `src/lib/resilience/settings.ts` dan dipaut oleh `tests/unit/ratelimit-admission-control-6593.test.ts`, jadi perubahan kepadanya menjadikan ujian itu merah dan bukannya membiarkan perenggan ini lapuk secara senyap.

`resilienceSettings.requestQueue.executionMaxWaitMs` ialah apa yang diterima Bottleneck sebagai `expiration` tugas, yang pemasanya bermula hanya selepas penghantaran. Ia adalah sandaran untuk pelaksana yang tiada tamat masa hulu tersendiri, dan ia dinaikkan kepada tamat masa permulaan fetch pelaksana itu sendiri apabila ia lebih panjang, supaya ia tidak dapat memutuskan respons sihat yang sedang berjalan. Lalai 600000ms (10 min).

Memberi bajet giliran ke dalam `expiration` adalah apa yang dahulu membunuh gerbang tidak berperingkat di tengah jalan — ia sah berjalan selama beberapa minit sebelum bait pertama — dan itulah sebabnya tamat tempoh ditunjukkan sebagai `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) manakala bajet giliran membawa kod tamat masa giliran. Tindih mana-mana satu melalui `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) atau papan pemuka (**Tetapan → Ketahanan**). Kedua-duanya diapit kepada 1ms–24j apabila dinormalkan.

**Keutamaan, untuk kedua-duanya:** pemboleh ubah env hanya membekalkan _lalai_. Nilai yang dikekalkan dalam `resilienceSettings.requestQueue` (papan pemuka / tampalan API, disimpan dalam `key_value`) mengatasinya, dan `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` setiap sambungan pula mengatasi itu. Menetapkan pemboleh ubah env pada penggelaran yang sudah mempunyai nilai berterusan oleh itu tidak mengubah apa-apa — kosongkan atau kemas kini tetapan berterusan itu sebaliknya.

Masa berada dalam giliran dihadkan oleh `maxWaitMs`; `maxQueueDepth` di bawah menghadkan berapa ramai pemanggil boleh beratur pada satu masa.

**Cubaan semula yang dinyatakan dalam badan: pengaturan rentak vs penguncian.** Badan 429 boleh menyatakan masa tunggunya sendiri (Gemini `RetryInfo.retryDelay`, teks "retry after Ns"), yang dibaca oleh `updateFromResponseBody`. Masa tunggu yang muat dalam `maxWaitMs` sambungan ialah pengaturan rentak: pengehad mengosongkan takungannya selama itu dan panggilan beratur dihantar apabila ia diisi semula. Masa tunggu yang lebih panjang daripada `maxWaitMs` bukan sesuatu yang boleh ditunggui habis oleh giliran — Gemini menjawab kuota harian yang kehabisan dengan `retryDelay: "86399s"`. `Retry-After` yang disampaikan pada 429 yang dibina semula (#16528) sudah menyebabkan enjin sandaran mengunci model untuk tempoh itu, tetapi menjeda pengehad untuknya juga masih akan menyekat mana-mana panggilan yang sampai ke kunci lebih awal (selepas set semula ketahanan, sebagai contoh) untuk keseluruhan `maxWaitMs`. Apabila masa tunggu sedemikian datang daripada butiran Google `RetryInfo` bertaip (provenans `google_rpc_retry_info`) dan pengehad kunci sudah berskop kepada model (lihat `getLimiterKey`), 429 itu menjadi penguncian model pada sambungan tersebut sebaliknya (`lockModelForLongBodyRetry` dalam `open-sse/services/rateLimitManager/bodyRetryPause.ts`, dihadkan kepada 24j), dan pengehad dibiarkan tidak dijeda. Pemilihan akaun melangkau kunci itu melalui `isModelLocked()`, dan begitu juga pintu pra-penghantaran kombo untuk sasaran yang dipaut pada sambungan. Pada antigravity, yang pengehadnya mengikut keluarga kuota, kunci itu adalah pada model tepat, seperti kunci kuotanya yang lain. Nama yang diminta klien turut dikunci apabila alias menyelesaikannya kepada model itu, kerana semakan tersebut menggunakan nama yang diminta; ia dikunci secara tepat (`lockExactModel`), supaya alias yang merentasi keluarga kuota antigravity atau skop codex tidak pernah mengunci miliknya sendiri. Petunjuk prosa, `retryDelay` tidak bertaip, atau pengehad yang dikongsi oleh keseluruhan sambungan mengekalkan jeda. Apabila pengehad yang baru dibina semula oleh laluan 429 memang menjeda, pemanggil yang baki masa gilirannya berakhir sebelum jeda itu ditolak serta-merta dengan kod tamat masa giliran (`checkLimiterPause`) dan bukannya menunggu masa itu tamat; penghujung yang direkodkan ditambatkan sebelum pengehad dibina, di mana Bottleneck memulakan jam muat semulanya, dan sebarang perubahan kemudian pada takungan melupakannya. Diliputi oleh `tests/unit/rate-limit-long-body-retry-lockout.test.ts` dan `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — had kemasukan pilihan (baharu).** `resilienceSettings.requestQueue.maxQueueDepth` menghadkan bilangan permintaan yang boleh berada dalam giliran (belum dihantar) untuk satu pembekal+sambungan pada satu masa. Apabila giliran sudah memegang `maxQueueDepth` permintaan, permintaan baharu ditolak pantas dengan ralat bertaip `code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** ia sampai ke `limiter.schedule()` — jadi penolakan itu murah dan berlaku sebelum sebarang kerja pemampatan gesaan / terjemahan di hilir untuk permintaan itu. Lalai `0` = dinyahdayakan, mengekalkan tingkah laku giliran tanpa had sedia ada; dihadkan 0–100000. Tindih melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) atau `resilienceSettings.requestQueue.maxQueueDepth` (papan pemuka/tampalan API).

Semakan kemasukan itu sendiri ialah fungsi tulen (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) supaya ia boleh diuji unit tanpa pengehad Bottleneck sebenar.

> RFC yang membuka #6593 turut mencadangkan flag `bypassCompressionOnRateLimit`. Saluran paip `open-sse/services/compression/` dalam repo ini ialah pemampatan prompt/konteks pada permintaan LLM keluar (`chatCore.ts`, sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`), bukan pemampatan respons HTTP pada badan 429 yang disintesis — tiada laluan kod yang sepadan untuk flag pintasan literal. Langkah pemampatan prompt itu juga kini berjalan _sebelum_ `withRateLimit()` dalam saluran paip permintaan, jadi menyusun semula untuk melangkaunya pada penolakan queue-penuh ialah perubahan berasingan yang lebih besar daripada skop isu ini; ia dengan sengaja **tidak** dilaksanakan di sini dan ditinggalkan sebagai susulan jika penjimatan CPU berbaloi dengan risiko penyusunan semula.

### Jaring Keselamatan Pengaktifan Auto Had Kadar & Perlindungan Sambungan (`rateLimitProtection`)

**Jaring keselamatan pengaktifan auto** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, lalai `true`):
Secara lalai, OmniRoute secara automatik mengaktifkan perlindungan queue had kadar untuk semua sambungan pembekal kunci API yang aktif (`getProviderCategory(provider) === "apikey"`). Ini memastikan permintaan masuk ke kunci API upstream yang sensitif kadar diatur gilir dan disebat melalui Bottleneck dan bukannya meletus menjadi ralat 429 upstream. Jaring keselamatan boleh ditindih melalui pemboleh ubah persekitaran `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` menyahaktifkan, `true`/`1`/`on` memaksa aktif), yang mengambil keutamaan ke atas tetapan papan pemuka yang dikekalkan (**Tetapan → Resilience** / `PATCH /api/resilience`).

**Semantik `rateLimitProtection` setiap sambungan:**
Perlindungan had kadar setiap sambungan dijejak melalui medan boolean `rateLimitProtection` pada sambungan pembekal (dikekalkan sebagai `rate_limit_protection` dalam SQLite):

- **Aktif eksplisit (`rateLimitProtection === true`)**: Perlindungan had kadar diaktifkan secara eksplisit untuk sambungan ini, tanpa mengira kategori pembekal atau sama ada jaring keselamatan pengaktifan auto dihidupkan.
- **Nyahaktif eksplisit (`rateLimitProtection === false`)**: Menyahaktifkan perlindungan eksplisit, tetapi **tidak** menarik diri sambungan kunci API aktif daripada jaring keselamatan pengaktifan auto global. Dalam `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` dan `undefined` adalah setara: hanya `rateLimitProtection === true` dianggap sebagai penindihan eksplisit. Jika `rateLimitProtection` ialah `false` (atau tidak ditetapkan), sambungan kunci API aktif masih memenuhi syarat pengaktifan auto dan kekal dilindungi had kadar.
- **Tiada penarikan diri setiap sambungan**: Pengendali buat masa ini tidak dapat menyatakan "sambungan kunci API aktif tunggal ini mesti berjalan tanpa perlindungan queue had kadar" sambil mengekalkan pengaktifan auto aktif untuk yang lain. Untuk menjalankan sambungan kunci API sepenuhnya tanpa queue had kadar, jaring keselamatan mesti dimatikan secara global (`RATE_LIMIT_AUTO_ENABLE=false` atau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Laluan penulisan yang disokong:**

- **`POST /api/rate-limits`**: Laluan penulisan pengurusan yang disokong untuk menogol `rateLimitProtection` bagi sambungan (`{ connectionId: string, enabled: boolean }`). Memanggil ini dengan `enabled: true` mengaktifkan perlindungan eksplisit; memanggil ini dengan `enabled: false` mengalih keluar perlindungan eksplisit (walaupun sambungan kunci API aktif kekal dilindungi di bawah jaring keselamatan global jika pengaktifan auto aktif).
- **`PUT /api/providers/[id]`**: Dengan sengaja **tidak** menerima atau mengalihkan `rateLimitProtection` (#11278). Mengemas kini metadata sambungan pembekal melalui `PUT /api/providers/[id]` tidak akan sekali-kali mengubah keadaan perlindungan had kadar yang dikekalkan.

---

## 6. Badan pemerhati throughput strim perlahan (#9709)

Pengawal `resilienceSettings.streamRecovery.throughputWatchdog` pilihan mengesan huluan yang masih menghantar ketulan tetapi menghasilkan output pembantu di bawah kadar output berguna yang dikonfigurasikan. Ia sengaja berbeza daripada tamat masa melahu: degupan jantung dan metadata menetapkan semula kedua-dua pemasa dan tidak dikira sebagai kemajuan. Ia juga berbeza daripada tarikh akhir percubaan keras (#9153), yang kekal sebagai siling keselamatan mutlak tanpa mengira kualiti output.

Anjing pemerhati memerlukan tempoh memanaskan badan diikuti dengan tetingkap berguling lengkap sebelum ia boleh digugurkan. Ia mengira delta teks daripada acara output API Pelengkapan dan Respons Sembang (proksi bait UTF-8 konservatif), mengabaikan peristiwa penggunaan sahaja dan kosong, dan menggantung penghakiman semasa acara panggilan alat atau penaakulan sedang dalam penerbangan. Ia dilumpuhkan secara lalai dan boleh didayakan dengan `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (nilai env hanya membenihkan — lalai `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean menang yang disimpan; lihat nota keutamaan env-vs-papan pemuka di bahagian atas panduan ini); tetingkap, memanaskan badan, kadar minimum dan keluaran terukur minimum dibatasi oleh lapisan normalisasi tetapan-ketahanan biasa.

Apabila didayakan, pengguguran pengawas hanya digunakan pada percubaan huluan yang aktif. Sebelum sebarang bait yang boleh dilihat oleh pelanggan, laluan pemulihan awal akaun yang sama sedia ada boleh membuka semula percubaan. Selepas komit, strim tidak pernah ditayangkan semula secara membuta tuli; hanya kontrak penerusan pertengahan aliran selamat sedia ada boleh mencantumkan akhiran. Penyelesaian kekal satu pukulan, jadi perakaunan penggunaan dan keluaran semaphore tidak diduplikasi.

---

## 7. Pengisytiharan Semula Status Upstream (ralat kuota yang tersalah nyatakan)

**Skop:** satu get laluan upstream yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** membetulkan status yang mengelirukan SEBELUM pengelasan, supaya pengguna hiliran (enjin fallback, pengagregatan combo, respons yang menghadap klien) melihat sifat kegagalan yang sebenarnya boleh dicuba semula.

Sesetengah get laluan menandakan kehabisan kuota SEMENTARA dengan status HTTP yang tidak boleh dicuba semula. `agentrouter.org` mengembalikan `403` (kadangkala `400`) dengan isi Cina
(`用户额度不足` / `额度不足`) dan bukannya `429` standard. Klien seperti Claude
Code menganggap `403` sebagai kekal lalu membatalkan sesi, dan tanpa pembetulan
enjin fallback akan mengelaskannya sebagai `AUTH_ERROR`, bukannya peristiwa
kuota.

**Pelaksanaan:**

- Pendaftaran + pemadan: `open-sse/config/upstreamStatusRestatement.ts` — senarai peraturan bagi setiap penyedia (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), dipadankan melalui `applyStatusRestatement()`.
- Titik panggilan: blok `providerFailure:` dalam `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), sejurus selepas `parseUpstreamError()` menghurai respons
  upstream dengan status HTTP ralat (`!providerResponse.ok`), dan sebelum sebarang
  pengelasan dijalankan, supaya setiap pengguna hiliran melihat status yang telah
  dibetulkan. Ralat yang disematkan dalam strim SSE `200` mengikuti laluan
  penghuraian strim yang berasingan dan lebih lewat, dan **belum** diliputi oleh
  hook ini — ini ialah had yang diketahui dan belum diperlukan untuk misstatus
  agentrouter (yang muncul sebagai status HTTP ralat).
- Kelayakan cuba semula: `429` terdapat dalam `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), jadi ralat yang diisytiharkan
  semula membawa tetingkap cuba semula sebenar dan bukannya muncul sebagai
  `403` yang tidak boleh dipulihkan.
- `defaultRetryAfterMs` sintetik `60s` (`upstreamStatusRestatement.ts`) hanyalah
  tempoh yang dimaklumkan oleh respons yang diisytiharkan semula kepada
  **klien**; ia bukan tempoh cooldown/sekatan dalaman sambungan itu sendiri —
  tempoh tersebut ditentukan secara berasingan oleh mekanisme yang sebenarnya
  mengendalikan ralat yang diisytiharkan semula (backoff meningkat Connection Cooldown,
  §2, asas `3s` untuk penyedia API-key; atau Model Lockout, §3, untuk penyedia
  kuota setiap model seperti agentrouter). Penghala boleh menjadi layak untuk
  mencuba semula secara dalaman lebih awal daripada tetingkap 60s yang
  diiklankannya kepada klien — ini ialah ruang lebihan yang disengajakan, bukan
  pepijat.

Ralat kekal (`无权访问模型` agentrouter — tiada akses kepada model ini) TIDAK
PERNAH diisytiharkan semula: `excludeMarkers` membatalkan peraturan walaupun
`textMarkers` sepadan, jadi ralat itu mengekalkan status asalnya dan tiada apa-apa
akan mencubanya semula selama-lamanya. Peraturan pengelasan penyedia yang sepadan
(`agentrouter-model-access-denied` dalam `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown asas yang diisytiharkan selama
`6h`) dirujuk oleh `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_sebelum_ pemulangan awal kategori apikey generik `FORBIDDEN`, dengan syarat
`honorsRuleLockScope(provider)` (#10334 — pada masa ini eksklusif untuk agentrouter
melalui senarai benarkan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam
`providerErrorRules.ts`). Cooldown 6h yang diisytiharkan oleh peraturan mengalir
sebagai `fallbackResult.baseCooldownMs`, tetapi ia masih menggunakan laluan
sekatan setiap model-kuota yang sedia ada (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tidak berubah oleh #10334 kecuali sumber cooldown):
ia dihadkan kepada `mlSettings.maxCooldownMs` milik operator (lalai
`1_800_000ms` / 30min), seperti setiap sekatan model yang lain, dan
_sebab sekatan yang disimpan_ kekal `"forbidden"` yang diprakodkan secara keras,
bukan `"auth_error"` milik peraturan — hanya tempoh cooldown yang dihormati
secara menyeluruh, bukan rentetan sebab. Sambungan itu sendiri kekal aktif;
model bersaudara pada sambungan yang sama tidak terjejas.

Ralat kuota yang diisytiharkan semula (`额度不足`) mencapai peraturan penyedia dalam
produksi (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, tanpa cooldown yang diisytiharkan sendiri — backoff berskala lalai
lapisan kegigihan digunakan). Sejak #10334, `scope` pada
`ProviderErrorRuleMatch` DIGUNAKAN secara menyeluruh, tetapi **hanya** untuk
penyedia dalam senarai benarkan `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — kini hanya `"agentrouter"`, melalui
`honorsRuleLockScope()`). Bagi setiap penyedia lain, `scope` kekal sebagai
maklumat sahaja, sama seperti sebelum #10334.
`checkFallbackError` mendedahkan skop peraturan yang sepadan sebagai
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ialah pengawal dikongsi yang mengesahkan bahawa
`ruleScope` benar-benar selamat untuk dihormati sebagai isyarat seluruh sambungan
yang pulih sendiri (skop `"connection"`, sebab `quota_exhausted`, tidak pernah
`permanent`, tidak pernah `creditsExhausted` — perlindungan terhadap gandingan
masa hadapan antara skop `"connection"` dengan keadaan akaun kekal). Dua pengguna
memanggilnya:

- **Kegigihan** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  bukannya masuk ke cawangan **penguncian setiap model** penyedia passthrough
  (agentrouter ialah `passthroughModels: true` → `hasPerModelQuota()`
  mengembalikan `true`), ia menggunakan **tempoh bertenang sambungan sementara** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, tidak pernah menjadi status terminal
  (`credits_exhausted`/`banned`/`expired`) — supaya sambungan pulih sendiri
  setelah tempoh bertenang tamat dan bukannya memerlukan tetapan semula kelayakan secara manual.
  Dilangkau untuk sambungan dengan `disableCooling: true` (#2997): pilihan keluar
  itu sebaliknya diteruskan ke penguncian setiap model (pertukaran yang didokumenkan —
  lihat komen kod di atas cawangan tersebut).
- **Penghalaan gabungan dalam permintaan yang sama** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): pengawal yang sama menandakan
  sambungan ke dalam set `exhaustedConnections` dalam memori, dengan kunci
  `${provider}:${connectionId}`. Ini hanya melangkau sasaran SAME-REQUEST yang berbaki
  yang _sendiri sudah membawa `connectionId` tepat itu_ pada objek sasarannya sendiri
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` sebelum carian `exhaustedConnections`) — gabungan senarai model biasa,
  yang sasaran saudaranya tidak membawa `connectionId` terikat pada sasaran masing-masing
  dan hanya diselesaikan setiap penghantaran daripada pengepala respons
  `X-OmniRoute-Selected-Connection-Id`, tidak pernah mencapai padanan kunci itu. Bagi
  kes lazim tersebut, perlindungan sebenar terhadap leg yang berbaki daripada menggunakan semula
  akaun yang baru sahaja kehabisan bukanlah set ini — sebaliknya lapisan kegigihan di atas
  (`rateLimitedUntil` sambungan kini berada pada masa hadapan) digabungkan dengan
  pengawal yang sama yang menindas `transientRateLimitedProviders` untuk kegagalan itu (lihat "Reka bentuk dua peringkat" dan komen kod pada cawangan
  `isAgentrouterConnectionQuotaScope` dalam `targetExhaustion.ts`): dengan set itu dibiarkan
  tidak ditanda, pembenaran paksa `allowRateLimitedConnection` dalam `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) TIDAK dicetuskan
  untuk leg penyedia yang berbaki, jadi penapis `rateLimitedUntil` pemilihan kelayakan
  (`src/sse/services/auth.ts:1238`) dipatuhi seperti biasa dan leg yang berbaki sama ada memilih
  sambungan agentrouter lain yang masih layak atau gagal kerana tiada kelayakan tersedia —
  ia tidak memaksa kembali ke sambungan yang baru disejukkan oleh cawangan ini.

### Reka bentuk dua peringkat: penyataan semula status, kemudian pengelasan

Penyataan semula status (`upstreamStatusRestatement.ts`) dan peraturan
pengelasan penyedia (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ialah pendaftaran berasingan yang kedua-duanya menggunakan id penyedia
dan penanda teks sebagai kunci, tetapi dijalankan di tempat berbeza dan mempunyai tujuan
berbeza: penyataan semula menulis semula status HTTP lebih awal dalam `chatCore.ts`;
peraturan pengelasan memilih `reason` sandaran dan mengunci `scope`
(`model` / `provider` / `connection`) di dalam `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Peraturan pengelasan hanya melihat **teks** ralat penuh (diperlukan untuk memadankan
penanda isi seperti `额度不足`) bagi penyedia yang disenaraikan dalam senarai benarkan
`FULL_TEXT_RULE_PROVIDERS` dalam `providerErrorRules.ts` — pada masa ini hanya
`"agentrouter"`. Bagi setiap penyedia **katalog terbina dalam** yang lain,
`checkFallbackError` hanya menyerahkan ralat berstruktur (`{code, type}`) kepada
`getProviderErrorRuleMatch`, yang mencukupi untuk peraturan berasaskan pengepala/status/kod tetapi
tidak dapat melihat penanda teks isi. Pembantu `resolveRuleMatchBody()` melaksanakan pemilihan ini:
teks ralat penuh bagi penyedia yang dibenarkan, dan ralat berstruktur sebaliknya. Menambah penyedia
**terbina dalam** ke `FULL_TEXT_RULE_PROVIDERS` ialah pilihan masuk eksplisit bagi setiap penyedia —
ia wujud supaya laluan lalai bagi setiap penyedia yang tiada dalam senarai kekal tidak berubah
bait demi bait.

`scope` sesuatu peraturan (`model` / `provider` / `connection`) ialah pilihan masuk yang berasingan
daripada `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` hanya mendedahkannya sebagai
`fallbackResult.ruleScope`, dan pengguna hiliran hanya menghormatinya sebagai sesuatu selain label
maklumat, bagi penyedia dalam senarai benarkan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail
yang sama (dikawal melalui `honorsRuleLockScope()` — hari ini hanya `"agentrouter"`). Lihat "Ralat
kuota yang dinyatakan semula" di atas untuk perkara yang sebenarnya dilakukan oleh padanan
`scope: "connection"` setelah penyedia berada dalam senarai benarkan itu.

**#11104 — peraturan yang diisytiharkan operator memintas kedua-dua senarai benarkan.** Operator boleh
mengisytiharkan peraturan setiap penyedia pada masa jalan melalui `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
tanpa mengedit fail ini. Menyekat peraturan operator di belakang
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — senarai benarkan
yang bertujuan melindungi tingkah laku **lalai** peraturan katalog terbina dalam — akan
menjadikan mekanisme tetapan tidak berfungsi bagi setiap penyedia kecuali yang sudah disenaraikan
di situ, kerana pengisytiharan peraturan itu sendiri sudah merupakan pilihan masuk eksplisit operator.
`resolveRuleMatchBody()` dan `honorsRuleLockScope()` kedua-duanya menyemak
`hasOperatorRuleForProvider()` terlebih dahulu: penyedia dengan peraturan operator mendapat teks
ralat mentah dan `scope` yang diisytiharkan dihormati, tanpa mengira sama ada ia turut muncul dalam
mana-mana senarai benarkan.

**Peraturan yang diisytiharkan operator** (`OperatorProviderErrorRule`): setiap peraturan mempunyai
`status` pilihan dan `match` pilihan (subrentetan biasa, tidak peka huruf besar-kecil bagi teks ralat,
tidak pernah RegExp, jadi ia tidak boleh menyebabkan ReDoS), dan mesti menetapkan sekurang-kurangnya
satu daripada kedua-duanya. Apabila kedua-duanya ditetapkan, ia digabungkan dengan AND; medan yang
ditinggalkan sepadan dengan apa-apa, jadi `{match: "insufficient_quota"}` sepadan dengan apa-apa status
yang membawa kod itu. Peraturan padanan pertama digunakan. `cooldownMs` menerima sehingga 30 hari;
paling banyak 50 peraturan secara keseluruhan.

**Lalai tangkap-semua** (`settings.providerErrorDefaults`, pilihan ikut serta, ditetapkan melalui
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
dengan `cooldownMs` daripada 1 minit hingga 30 hari. Lalai hanya digunakan apabila tiada
peraturan operator dan tiada peraturan katalog terbina dalam yang sepadan, dan hanya untuk
ralat 402, 403, 408, 429 serta 5xx. Ralat bentuk permintaan (400, 404, 409, 413, 422) dan
401 tanpa maklumat tambahan mengekalkan pengendalian masing-masing. Jika tiada `reason`
yang dinyatakan secara jelas, sebabnya datang daripada status, dengan cara yang sama seperti
yang dilakukan oleh `classifyError`. Pengisytiharan lalai dikira sebagai peraturan operator
untuk `hasOperatorRuleForProvider()`, jadi `scope`-nya (lalai `"connection"`) dihormati.
Tempoh penyejukan berkesan bagi lalai ialah yang lebih panjang antara `cooldownMs` dan
petunjuk percubaan semula milik penyedia (`Retry-After`, `x-ratelimit-reset` atau petunjuk
set semula dalam isi kandungan, petunjuk yang sama yang dihormati oleh enjin apabila tetapan
penyejukan sambungan "use upstream retry hints" dihidupkan), jadi lalai boleh memanjangkan
petunjuk huluan yang pendek tetapi tidak akan memendekkan set semula sebenar. Peraturan
operator yang dinyatakan secara jelas mengekalkan `cooldownMs` tepatnya. Peraturan mahupun
lalai tidak memintas pengawal penyejukan sambungan dalam `markAccountUnavailable`: penyejukan
aktif yang lebih panjang tidak pernah dipendekkan dan status terminal tidak pernah ditulis
ganti. Pengesan teks terbina dalam yang dijalankan lebih awal dalam `checkFallbackError`
(kredit habis, kuota harian, akaun dinyahaktifkan) masih mempunyai keutamaan untuk frasa
masing-masing.

**Jurang yang diketahui — `providerRuleRegistry` tidak pernah dirujuk untuk HTTP 400.**
Cawangan `BAD_REQUEST` dalam `checkFallbackError` mengelaskan status 400 sepenuhnya melalui
tatasusunan coraknya sendiri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, dan sebagainya dalam `accountFallback.ts`) dan kembali sebelum
cawangan `configuredRule`/`getProviderErrorRuleMatch` di atasnya dicapai. Peraturan katalog
terbina dalam (atau peraturan operator) dengan `status: 400` sah dari segi sintaks tetapi
tidak akan pernah dicetuskan. Tiada peraturan sedia ada menyasarkan 400 pada masa ini, jadi
tiada apa-apa dalam produksi terjejas — tetapi peraturan 400 pada masa hadapan memerlukan
cawangan ini diubah dahulu, yang merupakan perubahan lebih besar daripada sekadar menambah
peraturan (ia mengelaskan semula 400 untuk setiap penyedia yang sudah bergantung pada
kelakuan tatasusunan corak tersebut) dan berada di luar skop penambahan peraturan untuk
satu penyedia.

### Menambah get laluan baharu yang tersalah menyatakan kuota

1. Daftarkan satu tatasusunan peraturan dalam `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pastikan `textMarkers`
   khusus kepada penyedia; jangan gunakan semula frasa bahasa Inggeris generik yang
   bertembung dengan `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Daftarkan peraturan pengelasan secara pilihan dalam
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk memilih skop
   kunci yang betul (`connection` untuk kuota seluruh akaun, `model` untuk ralat
   setiap model). Langkah ini hanya berkuat kuasa dalam produksi bagi penyedia yang
   peraturannya memerlukan teks ralat penuh (penanda isi kandungan): tambahkan id penyedia
   itu kepada `FULL_TEXT_RULE_PROVIDERS` dalam fail yang sama — jika tidak,
   `checkFallbackError` hanya akan menyerahkan ralat berstruktur `{code, type}` kepada
   peraturan tersebut dan peraturan teks isi kandungan tidak akan pernah sepadan dengan
   trafik langsung. Peraturan yang sepadan semata-mata berdasarkan `status`/`headers`
   (seperti peraturan Opencode atau Minimax) tidak memerlukan pilihan ikut serta ini.
   Secara berasingan, jika peraturan mengisytiharkan `scope: "connection"` dan tujuannya
   ialah penyejukan seluruh sambungan sebenar serta langkauan gabungan bagi permintaan yang
   sama (bukan sekadar label bermaklumat), tambahkan id penyedia itu kepada
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail yang sama — inilah yang mengawal penggunaan
   bergaya `isAgentrouterConnectionQuotaScope()` dalam `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) dan `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope` masih mengalir melalui
   `fallbackResult.ruleScope` tetapi tiada apa-apa akan bertindak berdasarkannya.
3. Tambahkan ujian unit yang mencerminkan
   `tests/unit/upstream-status-restatement.test.ts` dan
   `tests/unit/agentrouter-error-rules.test.ts` (termasuk pengawal
   bukan kekal / bukan `creditsExhausted`, dan — jika penyedia memerlukan senarai
   yang dibenarkan — ujian yang mengesahkan `resolveRuleMatchBody()` mengembalikan teks
   penuh hanya untuk penyedia tersebut).

Tiada perubahan kepada `chatCore.ts`, `classifyError` atau combo diperlukan.

#### Kunci berasaskan kelompok egress (#10880)

Penyedia dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) dianggap sebagai
huluan berkelompok mengikut IP (peringkat percuma opencode dikelompokkan mengikut IP,
bukan akaun — lihat #9611): status-429 yang dikelaskan sebagai `quota_exhausted`
**atau** `rate_limit_exceeded` akan menyejukkan setiap sambungan daripada keluarga yang
dibenarkan yang alamat IP egress terakhir diketahuinya sepadan dengan alamat sambungan
yang gagal, sebelum putaran boleh mencubanya
— sekali gus mengelakkan panggilan huluan yang dijamin gagal sebanyak N-1 (bentuk yang
sama seperti #10460/#10525). `rate_limit_exceeded` disertakan dengan sengaja: pada laluan
`markAccountUnavailable`, peraturan khusus opencode tidak pernah sepadan (tiada pengepala/
isi kandungan diserahkan kepada `checkFallbackError`, opencode tidak berada dalam
`FULL_TEXT_RULE_PROVIDERS`), jadi 429 yang isi kandungannya membawa teks kuota langganan
("monthly usage limit reached") dikelaskan sebagai `quota_exhausted` oleh sandaran teks kuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; penyejukan 1 jam) sebelum peraturan
`status_429` dicapai — manakala 429 tanpa teks kuota (pengehadan kadar biasa) dikelaskan
melalui peraturan `status_429` sebagai `rate_limit_exceeded` dan masih menyejukkan keluarga
IP tersebut. Bagi penyedia yang dibenarkan, had kadar berkelompok mengikut IP merupakan
isyarat yang sama seperti kuota yang habis. Had sebenar:

- **Usaha terbaik**: kunci menyelesaikan `egress_ip` terakhir yang diketahui bagi sambungan
  daripada `proxy_logs` (tetingkap 24j, segerak, tanpa cache). Cache sejuk (`egress
IP` tidak pernah diproba) atau tiada baris → sambungan yang gagal masih disejukkan oleh
  cabang (direkodkan seperti hari ini), cuma tiada sambungan seinduk yang dikunci.
- **Tidak pernah terminal**: penyejukan ialah tetingkap kuota yang diperbaharui
  (`testStatus: "unavailable"`); keadaan kekal tidak pernah diterbitkan daripada isyarat
  peringkat IP. Sambungan `disableCooling` melangkaui cabang sepenuhnya.
- **Granulariti kunci berubah untuk keluarga yang disenaraikan sebagai dibenarkan**: ini ialah
  perubahan skop, bukan sekadar pengoptimuman sambungan seinduk. opencode ialah pembekal
  `passthroughModels`, jadi sebelum cabang ini, 429 menghasilkan penguncian setiap-MODEL;
  kini ia menghasilkan penyejukan sambungan — termasuk bagi operator yang menjalankan satu
  sambungan tanpa sebarang sambungan seinduk. Itulah granulariti yang telah diisytiharkan betul
  oleh jadual peraturan opencode (`scope: "connection"`,
  `providerErrorRules.ts`), tetapi setakat ini tidak pernah dipatuhi kerana opencode tidak
  berada dalam `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Cabang ini menulis sendiri penyejukan
  sambungan yang gagal + `backoffLevel`, meniru cabang agentrouter berskop sambungan, lalu
  mengembalikan hasil — sekatan setiap model dan laluan generik di bawah tidak pernah dicapai.
- **Combo turut disertakan**: seperti cabang agentrouter, skop ini sengaja mengabaikan
  penurunan taraf `persistUnavailableState`/`isCombo` yang digunakan oleh pemanggil combo
  terhadap 429. Penguncian setiap model bukan bentuk skop ini yang lebih lemah, sebaliknya
  unit yang salah: ia tidak menyatakan apa-apa tentang IP yang telah kehabisan kuota, jadi
  putaran combo akan terus membakar satu panggilan yang pasti gagal bagi setiap sambungan seinduk.
- **Keselamatan sambungan seinduk**: sambungan seinduk yang sudah terminal (banned/credits_exhausted)
  atau sudah berada dalam penyejukan yang lebih lama tidak pernah ditulis ganti.
- **Senarai dibenarkan eksklusif**: meluaskan `EGRESS_BUCKETED_LOCK_PROVIDERS` ialah
  keputusan pemilik yang jelas; tiada pendawaian generik (corak #10334/#10419). Pertanyaan
  sambungan seinduk mengikat senarai dibenarkan yang sama dan bukannya mengulanginya sebagai
  literal SQL, jadi meluaskannya kekal sebagai perubahan satu baris.
- **Putaran IP egress, kedua-dua arah**: tetingkap carian (24j) jauh lebih luas daripada TTL
  cache IP egress (5 min), jadi "IP terakhir yang diketahui" ialah sejarah,
  bukan keadaan semasa. Jika proksi sambungan berputar dalam tetingkap tersebut, kunci mungkin
  **terlepas** daripada IP yang benar-benar dikongsi (IP yang direkodkan ialah IP baharu yang
  belum kehabisan kuota) — dan secara simetri mungkin **menyejukkan sambungan seinduk yang telah
  berputar menjauhi** IP yang kehabisan kuota. Kes kedua menyebabkan sambungan seinduk itu
  menanggung satu tetingkap penyejukan; kedua-duanya diterima sebagai had usaha terbaik bagi
  carian berasaskan sejarah.
- **Kos**: dua imbasan terhad terhadap `proxy_logs` (ditapis mengikut tetingkap melalui
  `idx_pl_timestamp`), hanya pada kekerapan 429. Tiada indeks baharu (migrasi 134
  YAGNI). Diukur pada salinan DB trafik sebenar bersaiz sederhana; tika berdaya pemprosesan
  tinggi menyimpan lebih banyak baris secara berkadaran dalam tetingkap yang sama.

## Ciri Daya Tahan Lain

- **20 strategi penghalaan** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Penghalaan peka set semula** (v3.8.0) — mengutamakan sambungan mengikut masa set semula kuota.
- **Degradasi mod latar belakang** — Responses API `background: true` didegradasikan kepada segerak dengan amaran.
- **Pengesanan had alat dinamik** — menarik balik daripada pembekal apabila had bilangan alat dicapai.
- **Fallback kecemasan** — dikawal oleh `OMNIROUTE_EMERGENCY_FALLBACK`; operator boleh mengatasinya daripada halaman Feature Flags tanpa mula semula.

---

## Penyahpepijatan

- Combo berwajaran menjawab `503 all_targets_cooling_down` (`Retry-After` ditetapkan, `diagnostics.excluded` menyenaraikan setiap sasaran dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool telah dikonfigurasikan dan disambungkan, setiap sasaran hanya dikecualikan oleh pemasa daya tahan; amaran `[COMBO] Weighted selection: every target excluded before dispatch — …` menyatakan sebab dan baki saat. `404 no_executable_targets` daripada combo yang sama bermakna tiada pemasa daya tahan yang terlibat (tiada apa untuk dijalankan, atau setiap akaun gagal ujian ketersediaan). Dibina dalam `open-sse/services/combo/pinRecovery.ts` daripada pengecualian yang dikumpulkan dalam `targetResolution.ts`.
- Semua kunci untuk sesebuah pembekal dilangkau → semak kedua-dua keadaan pemutus litar DAN `rateLimitedUntil`/`testStatus` setiap sambungan.
- Pembekal dikecualikan secara kekal selepas tetingkap set semula → kod membaca `state` mentah dan bukannya `getStatus()`/`canExecute()`.
- Satu kunci gagal, yang lain sepatutnya berfungsi → utamakan cooldown sambungan berbanding pemutus litar.
- Hanya satu model gagal → utamakan lockout model berbanding cooldown sambungan.
- Keadaan sepatutnya pulih sendiri tetapi tidak → semak cap masa pada masa hadapan + laluan baca yang menyegarkan keadaan yang luput. Status kekal memerlukan perubahan manual.

---

## Keadaan masa jalan — rujukan pantas ejen

> Dipindahkan verbatim daripada `AGENTS.md` → "Resilience Runtime State" (PR #12743) supaya panduan
> ejen kekal di bawah bajet konteks 40k. Ia adalah paparan ringkas bersemuka ejen bagi
> bahagian di atas; bahagian bernombor kekal sebagai rujukan penuh.

OmniRoute mempunyai tiga mekanisme kegagalan sementara yang berkaitan tetapi berbeza. Kekalkan
skopnya berasingan semasa menyahpepijat tingkah laku penghalaan. Lihat
[gambar rajah daya tahan 3 lapisan](../diagrams/exported/resilience-3layers.svg)
(sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
untuk peta sepintas lalu.

### Pemutus Litar Pembekal

**Skop**: keseluruhan pembekal, cth. `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan penghantaran trafik kepada pembekal yang berulang kali gagal di
peringkat upstream/perkhidmatan, supaya satu pembekal yang tidak sihat tidak melambatkan setiap permintaan.

**Implementasi**:

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Pendawaian gate/perlaksanaan chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status masa jalan: `src/app/api/monitoring/health/route.ts`
- Pembungkus dikongsi: `open-sse/services/accountFallback.ts`
- Jadual keadaan berterusan: `domain_circuit_breakers`

**Keadaan** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: trafik biasa dibenarkan.
- `DEGRADED`: jalur amaran awal — kegagalan telah melepasi ambang degradasi tetapi belum lagi
  ambang pemutus; trafik masih mengalir, papan pemuka memaparkan amaran. Ujian sambungan
  yang sah atau tetingkap tenang tanpa kegagalan baharu mengembalikannya kepada `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` mempunyai tetingkap tersebut).
- `OPEN`: pembekal disekat buat sementara; pemanggil menerima respons provider-circuit-open
  atau penghalaan combo melangkau ke sasaran lain.
- `HALF_OPEN`: tamat masa set semula telah berlalu; benarkan permintaan ujian. Kejayaan menutup
  pemutus, kegagalan membukanya semula.

**Lalai** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, digunakan melalui
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` dalam `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` dalam `src/sse/handlers/chatHelpers.ts`). Pemutus seluruh
pembekal berjalan pada `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | terdegradasi pada | terbuka pada (`circuitBreakerThreshold`) | set semula (`circuitBreakerReset`) |
| ------- | ----------------: | ---------------------------------------: | ---------------------------------: |
| OAuth   |               `5` |                                      `8` |                              `60s` |
| API key |               `7` |                                     `12` |                              `30s` |
| Local   |       (diperoleh) |                                      `2` |                              `15s` |

`PROVIDER_PROFILES` juga mentakrifkan `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) dan `providerCooldownMs` (5/10/1 min): ini menggerakkan
**pintu tetingkap Provider Cooldown global opt-in** (`PROVIDER_COOLDOWN_ENABLED`, lalai
mati) — entri peringkat pembekal dalam `open-sse/services/providerCooldownTracker.ts` hanya dikira
sebagai menyejuk selepas `providerFailureThreshold` kegagalan dalam `providerFailureWindowMs`, dan kemudian
menyejuk selama `providerCooldownMs`. Ia BUKAN ambang pemutus langsung — jangan laraskannya
dengan menjangkakan tingkah laku pemutus. Setiap lalai boleh ditukar melalui
pembolehubah persekitaran `OMNIROUTE_PROVIDER_BREAKER_*` dan `OMNIROUTE_CIRCUIT_BREAKER_*`;
jadual rujukan yang tepat mengikut masa jalan terdapat dalam `docs/architecture/RESILIENCE_GUIDE.md`.

Hanya status kegagalan peringkat pembekal yang harus mengaktifkan pemutus pembekal:

```ts
(408, 500, 502, 503, 504);
```

Jangan aktifkan pemutus seluruh pembekal untuk ralat akaun/kunci/model biasa seperti kebanyakan
kes `401`, `403`, atau `429`. Kes tersebut biasanya tergolong dalam cooldown sambungan atau
lockout model. `403` pembekal kunci API generik sepatutnya boleh pulih melainkan ia diklasifikasikan
sebagai ralat pembekal/akaun terminal.

Breaker menggunakan pemulihan malas (lazy recovery), bukan pemasa latar belakang. Apabila `OPEN` tamat tempoh, bacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` menyegarkan semula keadaan kepada `HALF_OPEN`, supaya papan pemuka dan pembina calon kombo tidak terus mengecualikan penyedia yang telah tamat tempoh selama-lamanya.

### Cooldown Sambungan

**Skop**: satu sambungan/akaun/kunci penyedia.

**Tujuan**: melangkau buat sementara satu kunci/akaun yang bermasalah sambil membenarkan sambungan lain untuk penyedia yang sama terus melayani permintaan.

**Implementasi**:

- Laluan tulis/kemas kini: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/penapisan akaun: `src/sse/services/auth.ts::getProviderCredentials...`
- Pengiraan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

Medan penting pada sambungan penyedia:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Semasa pemilihan akaun, sesebuah sambungan akan dilangkau apabila:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga bersifat malas: apabila `rateLimitedUntil` telah berlalu, sambungan itu menjadi layak semula. Selepas penggunaan yang berjaya, `clearAccountError()` mengosongkan `testStatus`, `rateLimitedUntil`, medan ralat, dan `backoffLevel`.

Kelakuan cooldown sambungan lalai:

- Cooldown asas OAuth: `5s`.
- Cooldown asas kunci API: `3s`.
- `429` kunci API harus mengutamakan petunjuk cuba semula hulu (`Retry-After`, pengepala reset, atau teks reset yang boleh dihuraikan) apabila tersedia.
- Kegagalan boleh pulih yang berulang menggunakan backoff eksponen:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Pengawal anti-thundering-herd menghalang kegagalan serentak pada sambungan yang sama daripada memanjangkan cooldown berulang kali atau menokok `backoffLevel` dua kali.

Keadaan terminal bukanlah cooldown. `banned`, `expired` (yang menjadi terminal hanya selepas N percubaan semula terhad melalui `EXPIRED_RETRY_MAX`), dan `credits_exhausted` dimaksudkan untuk kekal tidak tersedia sehingga kelayakan/tetapan berubah atau operator menetapkannya semula. Jangan tulis ganti keadaan terminal dengan keadaan cooldown sementara.

### Penguncian Model

**Skop**: penyedia + sambungan + model.

**Tujuan**: mengelakkan pemadaman keseluruhan sambungan apabila hanya satu model tidak tersedia atau terhad kuota untuk sambungan tersebut.

Contoh:

- Penyedia kuota setiap model yang mengembalikan `429`.
- Penyedia tempatan yang mengembalikan `404` untuk satu model yang tiada.
- Kegagalan kebenaran mod/model khusus penyedia seperti mod Grok terpilih.

Penguncian model terletak dalam `open-sse/services/accountFallback.ts` dan membenarkan sambungan yang sama terus melayani model lain.

### Panduan Penyahpepijatan

- Jika semua kunci untuk sesebuah penyedia dilangkau, periksa kedua-dua keadaan breaker penyedia dan `rateLimitedUntil`/`testStatus` setiap sambungan.
- Jika sesebuah penyedia kelihatan dikecualikan secara kekal selepas tetingkap reset, semak sama ada kod membaca `state` mentah dan bukannya menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci penyedia gagal tetapi yang lain sepatutnya berfungsi, utamakan cooldown sambungan berbanding breaker penyedia.
- Jika hanya satu model gagal, utamakan penguncian model berbanding cooldown sambungan.
- Jika sesuatu keadaan sepatutnya pulih sendiri, ia perlu mempunyai cap masa masa depan/had masa reset dan laluan bacaan yang menyegarkan keadaan yang tamat tempoh. Status kekal memerlukan perubahan kelayakan atau konfigurasi secara manual.

---

## Pengecapan Jari TLS & Stealth

Stealth khusus penyedia (JA3/JA4, CCH, pengeliruan) didokumentasikan secara berasingan — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompilkan ke dalam `/docs`).

---

## Ujian ketahanan (Fasa 8 · Blok C)

Selain ujian unit untuk logik ketahanan, tiga ujian menguji runtime di bawah
keadaan tekanan/kegagalan sebenar (semuanya integrasi/nightly — tiada yang menyekat PR):

| Ujian       | Keterangan                                                                                                                                                                                        | Jalankan                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nod fake-upstream menyuntik kependaman/reset/timeout/503 sebenar; mengesahkan bahawa pemutus litar membuka/pulih dan `checkFallbackError` mengelaskan 503 sebagai fallback yang boleh dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 strim setiap `createSSEStream` di bawah `--expose-gc`; gagal jika heap berkembang melebihi had siling (pengawal OOM #3069).                                                                  | `npm run test:heap`                      |
| k6 soak     | Beban berterusan terhadap `/api/monitoring/health`; ambang p95/ralat.                                                                                                                             | `k6 run tests/load/k6-soak.js` (nightly) |

Diatur oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dalam
`test:integration` lalai, chaos dan heap akan melangkau secara automatik (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Seni Bina](./ARCHITECTURE.md) — Seni bina sistem dan komponen dalaman
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Penyedia, kombo, integrasi CLI
- [Enjin Auto-Combo](../routing/AUTO-COMBO.md) — Pemarkahan 16 faktor, pek mod
