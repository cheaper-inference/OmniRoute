# REASONING_REPLAY (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sumber kebenaran:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Terakhir diperbarui:** 28-06-2026 — v3.8.40

OmniRoute menangkap asisten `reasoning_content` yang dihasilkan oleh model mode berpikir dan memutar ulang secara transparan pada permintaan multi-putaran ketika penyedia upstream memerlukannya. Hal ini menghilangkan kesalahan HTTP 400 yang dimunculkan oleh penyedia ketat ketika riwayat percakapan klien tidak ada dalam alasan giliran sebelumnya.

## Mengapa Ini Ada

Beberapa penyedia mode berpikir menolak tindakan lanjutan kecuali jika** pesan asisten sebelumnya menyertakan `reasoning_content` asli** . Upstream mengembalikan 400 dengan pesan seperti:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Namun klien pada umumnya (Cursor, Cline, Roo Code, OpenAI SDK) menghapus `reasoning_content` dari riwayat yang mereka putar ulang. OmniRoute memulihkannya dari cache sisi server sehingga permintaan yang dilihat oleh upstream konsisten. Edisi #1628 memperkenalkan persistensi memory/SQLite hibrid sehingga cache bertahan saat proses dimulai ulang.

## Arsitektur

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

Pengambilan terjadi di `open-sse/handlers/chatCore.ts` (dua situs, di dua situs panggilan `cacheReasoningFromAssistantMessage` ). Pemutaran ulang terjadi di `open-sse/translator/index.ts` setelah pemaksaan skema tetapi sebelum pengiriman.

Entri panggilan alat disimpan di bawah `buildToolCallCacheKey()`, ringkasan cakupan permintaan dan id panggilan alat, sehingga id yang sama yang digunakan oleh kunci atau sesi API lain tidak memilih entri. Cakupannya berasal dari `buildReasoningCacheScope()`: id kunci API, ditambah kunci sesi jika ada permintaan. Oleh karena itu, kolom `tool_call_id` dan dasbor menampilkan intisari untuk entri tersebut.

Putaran asisten biasa (bukan panggilan alat) dikunci secara berbeda: `buildAssistantMessageCacheKey()` mencerna cakupan sesi ditambah transkrip format OpenAI yang dinormalisasi hingga giliran itu, karena DeepSeek memerlukan alasan _setiap_ giliran sebelumnya setelah `tools` ada. Untuk target Responses-API (misalnya `opencode-go/deepseek-v4-flash`, dirutekan ke `/responses`) isi upstream membawa `input`, bukan `messages`, jadi `translateRequest()` (`open-sse/translator/index.ts`) melaporkan transkrip pivot yang dicerna melalui opsi panggilan balik dan situs pengambilan mencerna transkrip yang sama. Pass replay Responses berjalan pada pivot OpenAI untuk setiap format sumber, sehingga klien Pesan Anthropic (Claude → OpenAI → Responses) juga diputar ulang.

## Penyimpanan — Memori Hibrid + SQLite

Jalur panas menggunakan `Map` dalam memori (LRU-by-creation) yang didukung oleh tabel SQLite untuk pemulihan kerusakan dan visibilitas dasbor.

| Lapisan | Pelaksanaan                                    | Tujuan                                            |
| ------- | ---------------------------------------------- | ------------------------------------------------- |
| Ingatan | `Map` di `open-sse/services/reasoningCache.ts` | Pencarian cepat, mengeluarkan yang terlama di 200 |
| DB      | tabel `reasoning_cache` (`src/lib/db/`)        | Bertahan saat restart, mendorong statistik        |

Menulis pergi ke keduanya. Pembacaan berkonsultasi dengan memori terlebih dahulu, lalu kembali ke DB ( hit DB dipromosikan kembali ke memori). Kegagalan DB tidak fatal — cache dalam memori terus melayani jalur panas.

**Default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entri memori maksimal: `200` (`MAX_MEMORY_ENTRIES`)
- Penggusuran: `createdAt` tertua dulu

## Skema Basis Data

Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeks: `expires_at`, `provider`, `model`, `created_at`. `expires_at` disimpan sebagai Unix epoch detik; lapisan SELECT menormalkan nilai teks lama melalui `EXPIRES_AT_EPOCH_SQL`.

## Deteksi Penyedia / Model

Pemutaran ulang diaktifkan ketika `requiresReasoningReplay(provider, model)` mengembalikan `true`. Fungsi ini memeriksa dua daftar di `open-sse/services/reasoningCache.ts`.

**Penyedia IDs (pencocokan persis, tidak peka huruf besar-kecil):**

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

**Pola regex model (tidak peka huruf besar-kecil):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` dan `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, akhiran `-free` opsional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Menambahkan provider/model ketat baru berarti menambahkan ke salah satu daftar ini dan menulis pengujian unit yang menyatakan injeksi replay. Deskripsi PR harus mengutip string 400 upstream yang memotivasi perubahan tersebut.

## REST API

Cache memperlihatkan dua titik akhir di bawah `src/app/api/cache/reasoning/route.ts`. Keduanya memerlukan otentikasi manajemen (`isAuthenticated` dari `@/shared/utils/apiAuth`).

| Metode | Titik akhir                                               | Keterangan                                                   |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Statistik + entri paginasi                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Daftar yang difilter (`limit` dijepit ke `[1, 200]`)         |
| DELETE | `/api/cache/reasoning`                                    | Hapus semuanya (memori + DB) dan setel ulang jumlah hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Hapus hanya entri untuk satu penyedia                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Hapus satu entri                                             |

**bentuk respons GET :**

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

## Catatan Operasional

- **Pembersihan:** `cleanupReasoningCache()` membersihkan entri memori yang kedaluwarsa dan menjalankan `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pekerja pemeriksaan kesehatan menghubungi ini secara berkala.
- **Pemulihan kerusakan:** Setelah restart, memori kosong tetapi DB masih menyimpan entri yang belum kedaluwarsa. Pencarian pertama untuk `tool_call_id` tertentu adalah DB hit; pencarian selanjutnya adalah memory hits.
- **Tanpa alasan, tanpa cache:** `cacheReasoningFromAssistantMessage` mengembalikan `0` ketika pesan asisten tidak memiliki bidang `reasoning_content` / `reasoning`, jadi respons tanpa berpikir tidak memerlukan biaya apa pun.
- **Menulis juga terjaga keamanannya:** kedua situs panggilan di `chatCore.ts` (non-streaming dan streaming) hanya memanggil `cacheReasoningFromAssistantMessage()` ketika `requiresReasoningReplay(provider, model)` adalah `true` — predikat yang sama pemeriksaan sisi baca. Penginstalan yang tidak pernah menyentuh penyedia replay berhenti membayar untuk penulisan, pembaruan indeks, dan try/catch pada setiap respons yang mengandung alasan.
- **Penyedia yang tidak ketat:** Jika `requiresReasoningReplay` adalah `false` dan format targetnya adalah OpenAI, penerjemahnya** strip** bidang `reasoning_content` apa pun dari pesan keluar — OpenAI Penyelesaian Obrolan tidak menerimanya.

## Kepemilikan Penalaran Muse Buram

Muse (`muse-code`) mengembalikan alasan buram yang terikat pada pemanggil (`encrypted_content`). Memutar ulang di bawah akun lain atau kredensial yang dikirimkan kembali gagal di bagian hulu, sehingga permintaan OAuth asli menggunakan kepemilikan tingkat sesi alih-alih rotasi per permintaan (`src/sse/services/museSessionOwnership.ts`, diterapkan di `src/sse/handlers/chat.ts`). Koneksi kunci API yang dipilih secara eksplisit dan konfigurasi khusus kunci API mempertahankan perutean yang ada tanpa mode kepemilikan ini.

- Menyediakan sesi ID yang stabil di setiap kesempatan: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, atau `x-codex-session-id`; alternatifnya gunakan `prompt_cache_key`, `session_id`, `conversation_id`, atau `metadata.session_id` di badan (dalam urutan prioritas tersebut). IDs hilang atau kosong menghasilkan 400 ketika dua atau lebih akun OAuth asli aktif; dengan satu akun OAuth tidak ada yang perlu diputar, jadi permintaan seperti itu tetap membuat perutean tidak dipasangi pin. Cakupannya mencakup kunci API OmniRoute ID pemanggil.
- Sesi independen baru secara round-robin di seluruh akun OAuth asli aktif yang diizinkan oleh kebijakan koneksi kunci API, diurutkan berdasarkan koneksi ID. Round-robin melewati akun dalam cooldown koneksi, dengan status terminal (`banned`, `expired`, `credits_exhausted`), atau model dikunci untuk model yang diminta; Kegagalan muse upstream mencatat cooldown dan status pemutus seperti penyedia lainnya. Koneksi yang dipaksakan secara eksplisit melewati round-robin untuk sesi baru namun tidak dapat menggantikan pemilik yang sudah ada.
- Hingga pemilik memberikan respons yang berhasil, sesi yang pemiliknya tidak tersedia akan diklaim ulang ke akun yang sehat. Setelah respons pertama berhasil, sesi tetap disematkan ke pemilik tersebut hingga tidak aktif selama 30 hari (`MUSE_SESSION_IDLE_TTL_MS`).
- Setiap kelanjutan dan pergantian hasil alat tetap disematkan ke pemilik sesi: koneksi, identitas akun, dan pembuatan kredensial inferensi, diperiksa lagi sebelum upaya upstream, termasuk percobaan ulang penyegaran kredensial. Referensi panggilan respons IDs/item dan panggilan alat Penyelesaian Obrolan IDs harus sudah direkam untuk sesi dan pembuatan tersebut.
- SQLite `key_value` mencatat dalam namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) kepemilikan tetap ada dan kursor rotasi melintasi restart. Setiap klaim dan respons yang ditayangkan menyegarkan stempel aktivitas sesi; sesi menganggur lebih lama dari `MUSE_SESSION_IDLE_TTL_MS` dipangkas (pin pemilik, bendera yang dilayani, dan hash opaque/reference yang direkam), paling banyak sekali setiap 10 menit dan dalam kelompok yang dibatasi, sehingga pemutaran ulang riwayatnya gagal ditutup karena pemilik yang tidak diketahui. Catatan berisi IDs koneksi dan hash identitas akun, kredensial, konten buram, dan referensi kelanjutan, bukan rahasia atau riwayat percakapan. Klien harus menyimpan dan mengirimkan riwayat lengkap dan alasan yang tidak jelas.
- Alasan tidak jelas atau asing yang tidak diketahui, pemilik yang hilang, akun pemilik yang tidak tersedia, atau perubahan generasi dengan riwayat yang tercatat gagal ditutup dengan 4xx/503 — yang eksplisit tidak pernah membungkam failover lintas akun dan tidak pernah menghilangkan alasan.
- Kunci akun yang sama yang dikirim ulang hanya digunakan ketika sesi tidak mencatat riwayat yang dapat diputar ulang; sesi yang direkam tetap gagal ditutup hingga dimulai dari awal.
- Respons upstream yang kosong (`upstream_empty_response` / `empty_response`, tidak ada yang dikirimkan ke pemanggil) dicoba ulang paling banyak dua kali pada pemilik yang sama, setelah 0,5 detik kemudian 1,5 detik (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jika semua upaya gagal, 502 asli dikembalikan tanpa tanda cooldown atau pemutus, sehingga balasan yang tidak stabil tidak akan pernah mengunci pemiliknya.
- Semua permintaan `muse-code` melewati pembacaan dan penulisan cache semantik, termasuk penulisan streaming, sehingga keluaran buram yang di-cache tidak dapat memperoleh pemilik sesi yang berbeda.

Penjaga regresi: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, dan `tests/unit/chatcore-semantic-cache.test.ts`.

## Lihat Juga

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus sirkuit, cooldown, penguncian model
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — mendiagnosis 400an hulu
- Sumber: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- rute API : `src/app/api/cache/reasoning/route.ts`
- Edisi asli: #1628
