# REASONING_REPLAY (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sumber kebenaran:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute menangkap pembantu `reasoning_content` yang dihasilkan oleh model mod pemikiran dan memainkannya semula secara telus pada permintaan berbilang pusingan apabila penyedia huluan memerlukannya. Ini menghapuskan ralat HTTP 400 yang ditimbulkan oleh pembekal ketat apabila sejarah perbualan pelanggan tiada alasan giliran sebelumnya.

## Mengapa Ini Wujud

Beberapa pembekal mod pemikiran menolak giliran susulan melainkan jika** mesej pembantu sebelumnya termasuk `reasoning_content` asal** . Hulu mengembalikan 400 dengan mesej seperti:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Tetapi pelanggan biasa (Cursor, Cline, Roo Code, OpenAI SDK) menanggalkan `reasoning_content` daripada sejarah yang mereka mainkan semula. OmniRoute memulihkannya daripada cache sebelah pelayan supaya permintaan yang dilihat oleh huluan adalah konsisten. Isu #1628 memperkenalkan kegigihan memory/SQLite hibrid supaya cache bertahan proses dimulakan semula.

## Seni bina

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Tangkapan berlaku dalam `open-sse/handlers/chatCore.ts` (dua tapak, di dua tapak panggilan `cacheReasoningFromAssistantMessage` ). Main semula berlaku dalam `open-sse/translator/index.ts` selepas paksaan skema tetapi sebelum penghantaran.

Entri panggilan alat disimpan di bawah `buildToolCallCacheKey()`, ringkasan skop permintaan dan id panggilan alat, jadi id yang sama yang digunakan oleh kunci atau sesi API lain tidak memilih masukan. Skop datang daripada `buildReasoningCacheScope()`: id kunci API, ditambah dengan kunci sesi apabila permintaan mempunyai satu. Oleh itu, lajur `tool_call_id` dan papan pemuka menunjukkan ringkasan ini untuk entri tersebut.

Pusingan pembantu biasa (bukan panggilan alat) dikunci secara berbeza: `buildAssistantMessageCacheKey()` mencerna skop sesi serta transkrip format OpenAI yang dinormalkan sehingga pusingan itu, kerana DeepSeek memerlukan alasan _setiap_ pusingan sebelumnya setelah `tools` hadir. Untuk sasaran Respons-API (contohnya `opencode-go/deepseek-v4-flash`, dihalakan ke `/responses`) badan huluan membawa `input`, bukan `messages`, jadi `translateRequest()` (`open-sse/translator/index.ts`) melaporkan transkrip pangsi yang dihadamnya melalui pilihan panggil balik dan tapak tangkapan mencerna transkrip yang sama. Pas main semula Respons berjalan pada pangsi OpenAI untuk setiap format sumber, jadi pelanggan Mesej Anthropic (Claude → OpenAI → Responses) dimainkan semula juga.

## Storan — Memori Hibrid + SQLite

Laluan panas menggunakan `Map` dalam memori (LRU-by-creation) yang disokong oleh jadual SQLite untuk pemulihan ranap dan keterlihatan papan pemuka.

| Lapisan | Perlaksanaan                                      | Tujuan                                                  |
| ------- | ------------------------------------------------- | ------------------------------------------------------- |
| Ingatan | `Map` dalam `open-sse/services/reasoningCache.ts` | Pencarian pantas, diusir paling tua pada usia 200       |
| DB      | jadual `reasoning_cache` (`src/lib/db/`)          | Berterusan sepanjang permulaan semula, memacu statistik |

Tulisan pergi ke kedua-duanya. Membaca rujuk ingatan dahulu, kemudian kembali ke DB ( hits DB dinaikkan semula ke dalam ingatan). Kegagalan DB adalah — yang tidak membawa maut, cache dalam memori terus berkhidmat kepada laluan panas.

**Lalai:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entri memori maksimum: `200` (`MAX_MEMORY_ENTRIES`)
- Pengusiran: `createdAt` tertua dahulu

## Skema Pangkalan Data

Hijrah: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indeks: `expires_at`, `provider`, `model`, `created_at`. `expires_at` disimpan sebagai saat zaman Unix; lapisan SELECT menormalkan nilai teks lama melalui `EXPIRES_AT_EPOCH_SQL`.

## Pembekal / Pengesanan Model

Main semula didayakan apabila `requiresReasoningReplay(provider, model)` mengembalikan `true`. Fungsi menyemak dua senarai dalam `open-sse/services/reasoningCache.ts`.

**IDs pembekal (padanan tepat, tidak sensitif huruf besar-besaran):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Corak regex model (tidak sensitif huruf besar-besaran):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` dan `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, akhiran `-free` pilihan)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Menambah provider/model ketat baharu bermakna menambah pada salah satu senarai ini dan menulis ujian unit yang menegaskan suntikan ulangan. Perihalan PR harus memetik rentetan huluan 400 tepat yang memotivasikan perubahan.

## REST API

Cache mendedahkan dua titik akhir di bawah `src/app/api/cache/reasoning/route.ts`. Kedua-duanya memerlukan pengesahan pengurusan (`isAuthenticated` dari `@/shared/utils/apiAuth`).

| Kaedah | Titik akhir                                               | Penerangan                                                                 |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + masukan penomboran                                             |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Penyenaraian ditapis (`limit` diapit ke `[1, 200]`)                        |
| DELETE | `/api/cache/reasoning`                                    | Kosongkan segala-galanya (memori + DB) dan tetapkan semula kiraan hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Kosongkan hanya entri untuk satu pembekal                                  |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Padamkan satu entri                                                        |

**bentuk tindak balas GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Nota Operasi

- **Pembersihan:** `cleanupReasoningCache()` membersihkan entri memori yang telah tamat tempoh dan menjalankan `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pekerja pemeriksaan kesihatan memanggil ini secara berkala.
- **Pemulihan ranap sistem:** Selepas dimulakan semula, memori kosong tetapi DB masih menyimpan entri yang belum tamat tempoh. Carian pertama untuk `tool_call_id` yang diberikan ialah hit DB ; carian seterusnya adalah hits memori.
- **Tiada alasan, tiada cache:** `cacheReasoningFromAssistantMessage` mengembalikan `0` apabila mesej pembantu tidak mempunyai medan `reasoning_content` / `reasoning`, jadi respons tidak berfikir tidak memerlukan sebarang bayaran.
- **Tulis juga berpagar:** kedua-dua tapak panggilan dalam `chatCore.ts` (bukan penstriman dan penstriman) hanya memanggil `cacheReasoningFromAssistantMessage()` apabila `requiresReasoningReplay(provider, model)` ialah `true` — predikat yang sama cek sisi baca. Pemasangan yang tidak pernah menyentuh penyedia main semula berhenti membayar untuk penulisan, kemas kini indeks dan try/catch pada setiap respons yang membawa alasan.
- **Pembekal yang tidak ketat:** Apabila `requiresReasoningReplay` ialah `false` dan format sasaran ialah OpenAI, penterjemah** jalur** sebarang medan `reasoning_content` daripada mesej keluar — OpenAI Chat Completions tidak menerimanya.

## Muse Opaque-Reasoning Pemilikan

Muse (`muse-code`) mengembalikan alasan legap terikat pemanggil (`encrypted_content`). Memainkannya semula di bawah akaun lain atau bukti kelayakan yang diingatkan gagal di hulu, jadi permintaan OAuth asli menggunakan pemilikan peringkat sesi dan bukannya putaran setiap permintaan (`src/sse/services/museSessionOwnership.ts`, dikuatkuasakan dalam `src/sse/handlers/chat.ts`). Sambungan kunci API yang dipilih secara eksplisit dan konfigurasi kunci API sahaja mengekalkan penghalaan sedia ada tanpa mod pemilikan ini.

- Bekalkan ID sesi yang stabil pada setiap pusingan: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, atau `x-codex-session-id`; sebagai alternatif gunakan `prompt_cache_key`, `session_id`, `conversation_id`, atau `metadata.session_id` dalam badan (dalam susunan keutamaan itu). IDs hilang atau kosong mengembalikan 400 apabila dua atau lebih akaun OAuth asli aktif; dengan satu akaun OAuth tiada apa-apa untuk diputarkan, jadi permintaan sedemikian terus menyahsemat penghalaan. Skop termasuk OmniRoute API-key ID pemanggil.
- Round-robin sesi bebas baharu merentas akaun OAuth asli aktif yang dibenarkan oleh dasar sambungan kunci API, yang dipesan melalui sambungan ID. Round-robin melangkau akaun dalam sambungan cooldown, dengan status terminal (`banned`, `expired`, `credits_exhausted`), atau model-locked untuk model yang diminta; Kegagalan hulu Muse merekodkan keadaan bertenang dan pemutus seperti penyedia lain. Sambungan yang dipaksa secara eksplisit memintas round-robin untuk sesi baharu tetapi tidak boleh mengatasi pemilik sedia ada.
- Sehingga pemilik menyampaikan respons yang berjaya, sesi yang pemiliknya tidak tersedia akan dituntut semula ke akaun yang sihat. Selepas respons pertama yang berjaya, sesi kekal disematkan kepada pemilik tersebut sehingga ia melahu selama 30 hari (`MUSE_SESSION_IDLE_TTL_MS`).
- Setiap kesinambungan dan giliran hasil alat kekal disematkan kepada pemilik sesi: sambungan, identiti akaun dan penjanaan kelayakan inferens, diperiksa semula sebelum percubaan huluan, termasuk percubaan semula semula bukti kelayakan. Jawapan panggilan rujukan IDs/item dan panggilan alat Selesai Sembang IDs mesti telah direkodkan untuk sesi dan penjanaan itu.
- SQLite `key_value` rekod dalam ruang nama `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) kekal pemilikan dan kursor putaran merentas dimulakan semula. Setiap tuntutan dan respons yang disampaikan menyegarkan setem aktiviti sesi; sesi melahu yang lebih lama daripada `MUSE_SESSION_IDLE_TTL_MS` dipangkas (pin pemilik, bendera yang disampaikan dan cincang opaque/reference direkodkan), paling banyak sekali setiap 10 minit dan dalam kelompok terhad, jadi ulangan kemudian sejarahnya gagal ditutup sebagai pemilik yang tidak diketahui. Rekod mengandungi IDs sambungan dan cincang identiti akaun, bukti kelayakan, kandungan legap dan rujukan sambungan, bukan rahsia atau sejarah perbualan. Pelanggan mesti mengekalkan dan menghantar sejarah penuh dan alasan legap mereka.
- Penaakulan legap yang tidak diketahui atau asing, pemilik yang hilang, akaun pemilik yang tidak tersedia atau perubahan generasi dengan sejarah yang direkodkan gagal ditutup dengan 4xx/503 — yang eksplisit tidak pernah membisu silang akaun dan tidak pernah menggugurkan alasan.
- Kunci akaun sama yang diingatkan hanya diguna pakai apabila sesi merekodkan tiada sejarah boleh dimainkan semula; sesi yang dirakam terus gagal ditutup sehingga bermula baru.
- Respons huluan kosong (`upstream_empty_response` / `empty_response`, tiada apa-apa yang dipancarkan kepada pemanggil) dicuba semula paling banyak dua kali pada pemilik yang sama, selepas 0.5 s kemudian 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jika semua percubaan kosong, 502 asal akan dikembalikan tanpa penandaan cooldown atau pemutus, jadi balasan yang tidak jelas tidak akan menghalang pemiliknya.
- Semua permintaan `muse-code` memintas membaca dan menulis cache semantik, termasuk penstriman menulis, jadi output legap yang dicache tidak boleh memperoleh pemilik sesi yang berbeza.

Pengawal regresi: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, dan `tests/unit/chatcore-semantic-cache.test.ts`.

## Lihat Juga

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus litar, cooldown, model lockout
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — mendiagnosis hulu 400s
- Sumber: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Hijrah: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- laluan API : `src/app/api/cache/reasoning/route.ts`
- Keluaran asal: #1628
