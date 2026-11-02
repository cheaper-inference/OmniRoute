# Reasoning Replay Cache (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sumber acuan:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menangkap `reasoning_content` asisten yang dihasilkan oleh model mode berpikir dan memutarnya kembali secara transparan pada permintaan multi-giliran ketika penyedia upstream mengharuskannya. Hal ini menghilangkan kesalahan HTTP 400 yang ditampilkan oleh penyedia ketat ketika riwayat percakapan klien tidak menyertakan penalaran dari giliran sebelumnya.

## Alasan Fitur Ini Ada

Beberapa penyedia mode berpikir menolak giliran lanjutan kecuali **pesan asisten sebelumnya menyertakan `reasoning_content` asli**. Upstream mengembalikan 400 dengan pesan seperti:

```
Parameter Salah: reasoning_content dalam mode berpikir harus dikirimkan kembali ke API.
```

Namun, klien pada umumnya (Cursor, Cline, Roo Code, OpenAI SDK) menghapus `reasoning_content` dari riwayat yang mereka putar kembali. OmniRoute memulihkannya dari cache sisi server sehingga permintaan yang diterima upstream tetap konsisten. Issue #1628 memperkenalkan persistensi hibrida memori/SQLite agar cache tetap bertahan setelah proses dimulai ulang.

## Arsitektur

```
Turn N (asisten membuat):
  → respons berisi reasoning_content + tool_calls
  → jika requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      menulis (memory + DB), dengan kunci setiap tool_call.id
  → meneruskan respons ke klien (yang mungkin atau mungkin tidak menyimpan penalaran)

Turn N+1 (klien mengirim tindak lanjut):
  → translator mendeteksi: requiresReasoningReplay(provider, model) === true
  → untuk setiap pesan asisten dengan tool_calls dan tanpa reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (fallback warisan untuk DeepSeek versi lama)
  → upstream melihat riwayat yang konsisten → tidak ada 400
```

Penangkapan terjadi di `open-sse/handlers/chatCore.ts` (dua lokasi, pada dua titik pemanggilan `cacheReasoningFromAssistantMessage`). Pemutaran ulang (replay) terjadi di `open-sse/translator/index.ts` setelah koersi skema tetapi sebelum pengiriman (dispatch).

Turn asisten biasa (non-tool-call) diberi kunci secara berbeda: `buildAssistantMessageCacheKey()` mencerna cakupan sesi ditambah transkrip format OpenAI yang dinormalisasi hingga turn tersebut, karena DeepSeek memerlukan penalaran dari _setiap_ turn sebelumnya setelah `tools` ada. Untuk target Responses-API (sebagai contoh `opencode-go/deepseek-v4-flash`, yang diarahkan ke `/responses`) badan upstream membawa `input`, bukan `messages`, sehingga `translateRequest()` (`open-sse/translator/index.ts`) melaporkan transkrip pivot yang dicernanya melalui opsi callback dan situs penangkapan mencerna transkrip yang sama. Pass pemutaran ulang Responses berjalan pada pivot OpenAI untuk setiap format sumber, sehingga klien Anthropic Messages (Claude → OpenAI → Responses) juga diputar ulang.

## Penyimpanan — Hibrida Memori + SQLite

Jalur utama menggunakan `Map` dalam memori (LRU berdasarkan waktu pembuatan) yang didukung oleh tabel SQLite untuk pemulihan setelah crash dan visibilitas dasbor.

| Lapisan | Implementasi                                   | Tujuan                                                       |
| ------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Memori  | `Map` di `open-sse/services/reasoningCache.ts` | Pencarian cepat, mengeluarkan entri tertua saat mencapai 200 |
| DB      | Tabel `reasoning_cache` (`src/lib/db/`)        | Bertahan setelah mulai ulang, menyediakan statistik          |

Penulisan dilakukan ke keduanya. Pembacaan memeriksa memori terlebih dahulu, lalu beralih ke DB jika tidak ditemukan (hasil yang ditemukan di DB dimasukkan kembali ke memori). Kegagalan DB tidak bersifat fatal — cache dalam memori tetap melayani jalur utama.

**Nilai default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entri memori maksimum: `200` (`MAX_MEMORY_ENTRIES`)
- Pengeluaran: `createdAt` paling lama terlebih dahulu

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

Indeks: `expires_at`, `provider`, `model`, `created_at`. `expires_at` disimpan sebagai detik epoch Unix; lapisan SELECT menormalisasi nilai teks lama melalui `EXPIRES_AT_EPOCH_SQL`.

## Deteksi Penyedia / Model

Replay diaktifkan ketika `requiresReasoningReplay(provider, model)` mengembalikan `true`. Fungsi tersebut memeriksa dua daftar di `open-sse/services/reasoningCache.ts`.

**ID penyedia (harus sama persis, tidak peka huruf besar-kecil):**

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
- `/deepseek[-/]?v4[-.]flash/i` dan `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, dengan akhiran opsional `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Menambahkan penyedia/model ketat baru berarti menambahkannya ke salah satu daftar ini dan menulis pengujian unit yang memastikan injeksi replay. Deskripsi PR harus menyebutkan string 400 upstream persis yang menjadi alasan perubahan tersebut.

## REST API

Cache menyediakan dua endpoint di bawah `src/app/api/cache/reasoning/route.ts`. Keduanya memerlukan autentikasi manajemen (`isAuthenticated` dari `@/shared/utils/apiAuth`).

| Metode | Endpoint                                                  | Deskripsi                                                   |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + entri dengan paginasi                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Daftar terfilter (`limit` dibatasi ke `[1, 200]`)           |
| DELETE | `/api/cache/reasoning`                                    | Hapus semuanya (memori + DB) dan atur ulang jumlah hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Hapus hanya entri untuk satu penyedia                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Hapus satu entri                                            |

**Bentuk respons GET:**

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

- **Pembersihan:** `cleanupReasoningCache()` menghapus entri memori yang kedaluwarsa dan menjalankan `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Worker pemeriksaan kesehatan memanggilnya secara berkala.
- **Pemulihan setelah crash:** Setelah dimulai ulang, memori kosong, tetapi DB masih menyimpan entri yang belum kedaluwarsa. Pencarian pertama untuk `tool_call_id` tertentu merupakan hit DB; pencarian berikutnya merupakan hit memori.
- **Tanpa penalaran, tanpa cache:** `cacheReasoningFromAssistantMessage` mengembalikan `0` ketika pesan asisten tidak memiliki bidang `reasoning_content` / `reasoning`, sehingga respons tanpa proses berpikir tidak menimbulkan biaya apa pun.
- **Penulisan juga dibatasi:** kedua lokasi pemanggilan di `chatCore.ts` (non-streaming dan streaming) hanya memanggil `cacheReasoningFromAssistantMessage()` ketika `requiresReasoningReplay(provider, model)` bernilai `true` — predikat yang sama dengan yang diperiksa oleh sisi pembacaan. Instalasi yang tidak pernah menggunakan penyedia replay tidak lagi menanggung biaya penulisan, pembaruan indeks, dan try/catch pada setiap respons yang memuat penalaran.
- **Penyedia non-ketat:** Ketika `requiresReasoningReplay` bernilai `false` dan format target adalah OpenAI, penerjemah **menghapus** bidang `reasoning_content` dari pesan keluar — OpenAI Chat Completions tidak menerimanya.

## Kepemilikan reasoning opak Muse

Muse (`muse-code`) mengembalikan reasoning opak yang terikat pada pemanggil (`encrypted_content`). Memutarnya ulang dengan akun lain atau kredensial yang diterbitkan ulang akan gagal di upstream, sehingga permintaan OAuth native memakai kepemilikan tingkat sesi, bukan rotasi per permintaan (`src/sse/services/museSessionOwnership.ts`, ditegakkan di `src/sse/handlers/chat.ts`). Koneksi kunci API yang dipilih secara eksplisit dan konfigurasi yang hanya memakai kunci API mempertahankan perutean yang ada tanpa mode kepemilikan ini.

- Berikan ID sesi stabil pada setiap turn: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, atau `x-codex-session-id`; sebagai alternatif gunakan `prompt_cache_key`, `session_id`, `conversation_id`, atau `metadata.session_id` di body (dengan urutan prioritas tersebut). ID yang hilang atau kosong mengembalikan 400 ketika dua akun OAuth native atau lebih aktif; dengan satu akun OAuth tidak ada tujuan rotasi, sehingga permintaan tersebut mempertahankan perutean tanpa pin. Scope mencakup ID kunci API OmniRoute milik pemanggil.
- Sesi independen baru memakai round-robin antar-akun OAuth native aktif yang diizinkan kebijakan koneksi kunci API, diurutkan menurut ID koneksi. Round-robin melewati akun dalam cooldown koneksi, berstatus terminal (`banned`, `expired`, `credits_exhausted`), atau terkunci untuk model yang diminta; kegagalan upstream Muse mencatat cooldown dan status breaker seperti provider lain. Koneksi yang dipaksakan secara eksplisit melewati round-robin untuk sesi baru, tetapi tidak dapat menggantikan pemilik setelah pemilik tersebut memberikan respons sukses.
- Sampai pemilik memberikan respons sukses, sesi yang pemiliknya tidak lagi tersedia diklaim ulang oleh akun sehat. Setelah respons sukses pertama, sesi tetap dipasangkan ke pemilik tersebut sampai menganggur selama 30 hari (`MUSE_SESSION_IDLE_TTL_MS`).
- Setiap kelanjutan dan turn hasil tool tetap dipasangkan ke pemilik sesi: koneksi, identitas akun, dan generasi kredensial inferensi, yang diperiksa kembali sebelum percobaan upstream, termasuk percobaan ulang penyegaran kredensial. ID panggilan/referensi item Responses dan ID panggilan tool Chat Completions harus sudah tercatat untuk sesi dan generasi itu.
- Rekaman SQLite `key_value` dalam namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) menyimpan kepemilikan dan kursor rotasi melewati restart. Setiap klaim dan respons yang disajikan memperbarui penanda aktivitas sesi; sesi yang menganggur lebih lama daripada `MUSE_SESSION_IDLE_TTL_MS` dibersihkan (pin pemilik, penanda sudah dilayani, serta hash opak/referensi yang tercatat), paling sering sekali setiap 10 menit dan dalam batch terbatas, sehingga pemutaran ulang riwayatnya nanti ditolak secara fail-closed karena pemilik tidak dikenal. Rekaman memuat ID koneksi serta hash identitas akun, kredensial, konten opak, dan referensi kelanjutan, bukan rahasia atau riwayat percakapan. Klien harus menyimpan dan mengirim seluruh riwayat serta reasoning opaknya.
- Reasoning opak yang tidak dikenal atau asing, pemilik yang hilang, akun pemilik yang tidak tersedia, atau perubahan generasi dengan riwayat tercatat akan ditolak secara fail-closed dengan 4xx/503 eksplisit; tidak pernah beralih akun diam-diam atau membuang reasoning.
- Kunci yang diterbitkan ulang untuk akun yang sama hanya diadopsi bila sesi belum mencatat riwayat yang dapat diputar ulang; sesi dengan rekaman tetap ditolak secara fail-closed sampai dimulai dari awal.
- Respons upstream kosong (`upstream_empty_response` / `empty_response`, tidak ada keluaran ke pemanggil) dicoba ulang paling banyak dua kali pada pemilik yang sama, setelah 0.5 detik lalu 1.5 detik (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jika semua percobaan kosong, 502 asli dikembalikan tanpa menandai cooldown atau breaker, sehingga jawaban yang tidak stabil tidak pernah mengunci pemilik.
- Semua permintaan `muse-code` melewati pembacaan dan penulisan cache semantik, termasuk penulisan streaming, sehingga keluaran opak yang tersimpan di cache tidak dapat memperoleh pemilik sesi lain.

Penjaga regresi: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, dan `tests/unit/chatcore-semantic-cache.test.ts`.

## Lihat Juga

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus sirkuit, periode pendinginan, penguncian model
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — mendiagnosis error 400 dari upstream
- Sumber: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rute API: `src/app/api/cache/reasoning/route.ts`
- Isu awal: #1628
