# Contributing to OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini mencakup semua hal yang Anda perlukan untuk memulai.

Untuk alur kerja resmi bagi setiap perubahan, mulailah dengan
[Alur Utama Kontribusi](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Panduan tersebut memetakan perubahan penyedia, perutean,
UI/UX, i18n, CLI, basis data, serta build/deploy ke kontrak, pengujian terfokus, cakupan CI,
dan langkah-langkah rekonsiliasinya.

---

## Penyiapan Pengembangan

### Prasyarat

- **Node.js** `>=22.22.2 <23`, atau `>=24.0.0 <27` (disarankan: 24 LTS)
- **npm** 10+

> **Windows dengan Node 24:** gunakan rilis patch 24 LTS saat ini (setidaknya 24.20.0).
> Rilis sebelumnya dapat berhenti setelah pengujian berhasil ketika `--test-force-exit` menutup
> proses. [Perbaikan libuv Windows](https://github.com/nodejs/node/pull/61999) dari Node
> mengatasi crash runtime ini; tetap aktifkan assertion pengujian dan pemeriksaan keluar runner.

> **Pengguna npm v11+ (Node 24+):** Setelah `npm install`, verifikasi bahwa modul native telah terpasang:
> `node -e "require('better-sqlite3')"`. Jika gagal dengan `MODULE_NOT_FOUND`,
> jalankan `npm approve-scripts better-sqlite3 && npm install`. Lihat
> [Pemecahan Masalah](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloning & Instalasi

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabel Lingkungan

```bash
# Buat .env Anda dari templat
cp .env.example .env

# Buat rahasia yang diperlukan
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabel utama untuk pengembangan:

| Variabel               | Default Pengembangan     | Deskripsi                   |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | Port server                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL dasar untuk frontend    |
| `JWT_SECRET`           | (buat di atas)           | Rahasia penandatanganan JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Kata sandi login pertama    |
| `APP_LOG_LEVEL`        | `info`                   | Tingkat detail log          |

### Pengaturan Dasbor

Dasbor menyediakan toggle UI untuk fitur yang juga dapat dikonfigurasi melalui variabel lingkungan:

| Lokasi Pengaturan   | Toggle             | Deskripsi                            |
| ------------------- | ------------------ | ------------------------------------ |
| Settings → Advanced | Debug Mode         | Aktifkan log permintaan debug (UI)   |
| Settings → General  | Sidebar Visibility | Tampilkan/sembunyikan bagian sidebar |

Pengaturan ini disimpan di database dan tetap berlaku setelah restart, serta mengesampingkan default variabel lingkungan jika ditetapkan.

### Menjalankan Secara Lokal

```bash
# Mode pengembangan (muat ulang otomatis)
npm run dev

# Build produksi
npm run build    # next build → .build/next/ lalu assembleStandalone → dist/
npm run start

# Kompilasi backend/API saja yang cepat untuk perubahan kontributor
npm run build:contributor

# Build rilis (build ulang bersih + sentinel HEAD — diperlukan untuk deployment)
npm run build:release   # rm -rf .build dist lalu build + menulis dist/BUILD_SHA

# Konfigurasi port umum
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Build kontributor melakukan validasi khusus kompilasi: build ini tidak merakit
distribusi standalone atau membangun aset pengemasan native opsional. Gunakan build produksi biasa saat
Anda perlu memvalidasi bundel yang siap dikirim.

### Tata Letak Output Build

| Direktori | Isi                                                                      | Dilacak |
| --------- | ------------------------------------------------------------------------ | ------- |
| `src/`    | Sumber aplikasi (TypeScript / TSX)                                       | Ya      |
| `.build/` | Perantara — output `next build` (diabaikan git, `distDir = .build/next`) | Tidak   |
| `dist/`   | Bundel siap dikirim — dirakit oleh `assembleStandalone` (diabaikan git)  | Tidak   |

Pipeline build adalah satu tahap:

```
npm run build
  └─ next build → .build/next/standalone  (output Next.js)
  └─ assembleStandalone()                 (menyalin standalone + static + public + aset native)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` juga membersihkan kedua direktori terlebih dahulu dan menulis
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) sebagai sentinel integritas deployment.

`npm run build:contributor` menggunakan profil build khusus backend. Profil ini sementara mengganti file
UI dasbor dengan stub saat melakukan build, mempertahankan handler rute API, lalu memulihkan file asli
setelah build selesai. Gunakan `npm run build` untuk perubahan yang memengaruhi UI dasbor atau untuk validasi
rilis lengkap; profil kontributor bukan pengganti build rilis.

> **Catatan deployment VPS:** direktori image jarak jauh `/usr/lib/node_modules/omniroute/app/`
> tidak berubah. Skill deployment melakukan rsync terhadap isi `dist/` ke dalamnya.
> Hanya jalur output build di dalam repositori yang berpindah (`app/` → `dist/`).

URL default:

- **Dasbor**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Alur Kerja Git

> ⚠️ **JANGAN PERNAH melakukan commit langsung ke `main`.** Selalu gunakan branch fitur.
>
> **Basis PR:** targetkan branch `release/vX.Y.Z` yang aktif (bukan `main`). Lihat
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) untuk model
> satu branch per rilis + tag saat peluncuran.

```bash
# Buat branch dari ujung rilis aktif (contoh: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... lakukan perubahan ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Buka Pull Request dengan base = release/v3.8.49
```

### Penamaan Branch

| Prefiks     | Tujuan                         |
| ----------- | ------------------------------ |
| `feat/`     | Fitur baru                     |
| `fix/`      | Perbaikan bug                  |
| `refactor/` | Restrukturisasi kode           |
| `docs/`     | Perubahan dokumentasi          |
| `test/`     | Penambahan/perbaikan pengujian |
| `chore/`    | Peralatan, CI, dependensi      |

### Pesan Commit

Ikuti [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambahkan circuit breaker untuk pemanggilan penyedia
fix: selesaikan kasus khusus validasi rahasia JWT
docs: perbarui SECURITY.md dengan perlindungan PII
test: tambahkan pengujian unit observabilitas
refactor(db): gabungkan tabel batas laju
```

Cakupan (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Menjalankan Pengujian

```bash
# Semua pengujian (unit + vitest + ekosistem + e2e)
npm run test:all

# Satu file pengujian (runner pengujian bawaan Node.js — sebagian besar pengujian menggunakan ini)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Hanya pengujian unit yang terdampak oleh perubahan Anda (pemilih TIA yang sama dengan gerbang CI, #8084)
npm run test:scoped            # perubahan dalam commit terakhir (atau working tree)
npm run test:scoped:staged     # hanya perubahan yang di-stage — cocok digunakan dengan proses pre-commit
npm run test:scoped:full       # buat ulang peta graf impor terlebih dahulu (setelah menambah/memindahkan file)
# Exit 1 + "run the full suite" berarti file hub (tsconfig, package.json, …) atau sumber
# yang belum dipetakan berubah — pemilih gagal dengan aman dan tidak pernah melewati pengujian secara diam-diam.

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Pengujian E2E (memerlukan Playwright)
npm run test:e2e

# E2E klien protokol (transport MCP, A2A)
npm run test:protocols:e2e

# Pengujian kompatibilitas ekosistem
npm run test:ecosystem

# Gerbang cakupan: 60% pernyataan/baris/fungsi/cabang
npm run test:coverage
npm run coverage:report

# Pemeriksaan lint + format
npm run lint
npm run check

# Smoke test kombo real-upstream berpagar (memerlukan akses VPS + kredit penyedia sungguhan)
# Mengakses penyedia SUNGGUHAN — memerlukan sedikit biaya. TIDAK PERNAH dijalankan di CI. Dilewati dengan aman tanpa gerbang.
# Memerlukan: akses ssh root@192.168.0.15 (mengambil snapshot DB hanya-baca dari VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Smoke test langsung VPS fase 3 — skrip Node ESM biasa, mengakses server .15 yang aktif secara langsung.
# Memerlukan: akses ssh root@192.168.0.15 (kombo dibuat/dihapus melalui SSH sqlite).
# Mengakses penyedia SUNGGUHAN (biaya kecil). Hanya membuat/menghapus kombo __live_test__*. TIDAK PERNAH dijalankan di CI.
# REQUIRE_API_KEY=false pada .15 sehingga kunci API tidak diperlukan, tetapi mematuhi COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY jika ditetapkan.
npm run test:combo:live:vps              # 7 skenario HTTP (prioritas/round-robin/berbobot/biaya/fusi/otomatis + kesehatan)
npm run test:combo:live:vps:failover     # menambahkan skenario failover lintas penyedia sungguhan (total 8)
```

Catatan cakupan:

- `npm run test:coverage` mengukur cakupan sumber untuk rangkaian pengujian unit utama, mengecualikan `tests/**`, dan menyertakan `open-sse/**`
- Pull request harus mempertahankan gerbang cakupan pada **60%+** untuk pernyataan/baris/fungsi/cabang
- Jika PR mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/`, PR tersebut harus menambah atau memperbarui pengujian otomatis dalam PR yang sama
- `npm run coverage:report` menampilkan laporan terperinci per file dari proses cakupan terbaru
- `npm run test:coverage:legacy` mempertahankan metrik lama untuk perbandingan historis
- Lihat `docs/ops/COVERAGE_PLAN.md` untuk roadmap peningkatan cakupan bertahap

### Persyaratan Pull Request

Sebelum membuka PR, gunakan
[Alur Utama Kontribusi](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) untuk menjalankan siklus terfokus bagi
perubahan yang Anda buat. Rangkaian pengujian unit lengkap (4 shard CI), Vitest, gerbang cakupan **60%+**, dan
build produksi merupakan tanggung jawab CI — menjalankannya secara lokal tidak memberikan informasi tambahan
yang belum disediakan oleh pemeriksaan PR, dan pada mesin yang lebih kecil hal ini dapat membebani host hingga penuh (#8084):

- Jalankan file pengujian yang mencakup perubahan Anda: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Jalankan `npm run lint`
- Sertakan atau perbarui pengujian otomatis dalam PR yang sama setiap kali kode produksi berubah
- Dalam file `node:test`, letakkan setiap `await` tingkat teratas (seperti `await import(...)`) sebelum `test()` / `describe()` pertama: saat menggunakan `--test-force-exit`, pengujian yang didaftarkan setelahnya dapat tidak pernah berjalan tanpa pemberitahuan (#18045; diberlakukan oleh `npm run check:test-tla-order`)
- Sertakan file pengujian yang diubah atau ditambahkan dalam deskripsi PR ketika kode produksi berubah
- Periksa hasil SonarQube pada PR ketika secret proyek dikonfigurasi di CI

Status pengujian saat ini: **122 file pengujian unit** yang mencakup:

- Penerjemah penyedia dan konversi format
- Pembatasan laju, circuit breaker, dan ketahanan
- Cache semantik, idempotensi, pelacakan progres
- Operasi dan skema database (21 modul DB)
- Alur OAuth dan autentikasi
- Validasi endpoint API (Zod v4)
- Tool server MCP dan penegakan cakupan
- Sistem Memory dan Skills

---

## Gaya Kode

- **ESLint** — Jalankan `npm run lint` sebelum melakukan commit
- **Prettier** — Diformat otomatis melalui `lint-staged` saat commit (2 spasi, titik koma, tanda kutip ganda, lebar 100 karakter, koma penutup es5)
- **TypeScript** — Semua kode `src/` menggunakan `.ts`/`.tsx`; `open-sse/` menggunakan `.ts`/`.js`; dokumentasikan dengan TSDoc (`@param`, `@returns`, `@throws`)
- **Tanpa `eval()`** — ESLint memberlakukan `no-eval`, `no-implied-eval`, `no-new-func`
- **Validasi Zod** — Gunakan skema Zod v4 untuk semua validasi input API
- **Penamaan**: File = camelCase/kebab-case, komponen = PascalCase, konstanta = UPPER_SNAKE

### Penanganan kesalahan / blok catch kosong

Jangan pernah membiarkan `catch` tanpa penjelasan. Klasifikasikan ke dalam salah satu dari dua kategori (menerapkan
aturan tegas "jangan pernah mengabaikan kesalahan secara diam-diam dalam aliran SSE"):

- **Disengaja (pembersihan/telemetri best-effort milik kita sendiri)** — kegagalan di sini memang diharapkan dan
  tidak berbahaya; tambahkan komentar alasan satu baris, tanpa logging (logging pada setiap permintaan merupakan
  gangguan yang ingin dihindari oleh konvensi ini).

  ```ts
  } catch {} // menutup controller yang sudah ditutup setelah klien terputus memang diharapkan
  ```

- **Harus dicatat (kode eksternal/yang disediakan pemanggil, atau pengabaian mengubah alur kontrol)** — pertahankan
  catch (jangan pernah membiarkannya merusak aliran), tetapi keluarkan `console.debug`/`warn` kontekstual agar
  kegagalan dapat ditemukan.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Lihat `open-sse/utils/stream.ts` dan `open-sse/utils/streamHandler.ts` untuk contoh penerapannya.

---

## Struktur Proyek

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Menambahkan Provider Baru

### Langkah 1: Daftarkan Konstanta Provider

Tambahkan ke `src/shared/constants/providers.ts` — divalidasi dengan Zod saat modul dimuat.

### Langkah 2: Tambahkan Executor (jika memerlukan logika khusus)

Buat executor di `open-sse/executors/your-provider.ts` dengan memperluas executor dasar.

### Langkah 3: Tambahkan Translator (jika formatnya bukan OpenAI)

Buat translator permintaan/respons di `open-sse/translator/`.

### Langkah 4: Tambahkan Konfigurasi OAuth (jika berbasis OAuth)

Tambahkan kredensial OAuth di `src/lib/oauth/constants/oauth.ts` dan layanan di `src/lib/oauth/services/`.

Jika provider upstream mendistribusikan `client_id`/secret OAuth publik atau kunci Firebase Web API di dalam CLI publik / bundle browser-nya, **jangan** menyematkannya sebagai literal string. Gunakan `resolvePublicCred()` dari `open-sse/utils/publicCreds.ts` dan tambahkan entri byte yang disamarkan ke `EMBEDDED_DEFAULTS`. Alur kerja wajib selengkapnya didokumentasikan di [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Di dalam handler/executor, pesan kesalahan yang sampai ke klien harus diproses melalui `buildErrorBody()` / `sanitizeErrorMessage()` dari `open-sse/utils/error.ts` — jangan pernah memasukkan `err.stack` atau `err.message` mentah ke dalam body Response. Lihat [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Langkah 5: Daftarkan Model

Tambahkan definisi model di `open-sse/config/providerRegistry.ts`.

### Langkah 6: Tambahkan Pengujian

Tulis pengujian unit di `tests/unit/` yang sekurang-kurangnya mencakup:

- Pendaftaran provider
- Translasi permintaan/respons
- Penanganan kesalahan

---

## Daftar Periksa Pull Request

- [ ] Pengujian lulus (`npm test`)
- [ ] Linting lulus (`npm run lint`)
- [ ] Build berhasil (`npm run build`)
- [ ] Tipe TypeScript ditambahkan untuk fungsi dan antarmuka publik baru
- [ ] Tidak ada rahasia atau nilai fallback yang di-hardcode
- [ ] Kredensial upstream publik disematkan melalui `resolvePublicCred()` (lihat [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), tidak pernah sebagai literal
- [ ] Respons kesalahan diproses melalui `buildErrorBody()` / `sanitizeErrorMessage()` — tidak ada stack trace mentah dalam isi respons (lihat [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Perintah shell (`exec` / `spawn`) meneruskan nilai runtime melalui `env`, bukan melalui interpolasi string
- [ ] Semua input divalidasi dengan skema Zod
- [ ] **Fragmen** changelog ditambahkan di bawah `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` untuk perubahan yang terlihat oleh pengguna (lihat [`changelog.d/README.md`](./changelog.d/README.md)) — **jangan** mengedit `CHANGELOG.md` secara langsung; fragmen diagregasikan saat rilis dan tidak pernah berkonflik antar-PR
- [ ] Dokumentasi diperbarui (jika berlaku)
- [ ] Tidak ada peringatan CodeQL / Secret-Scanning baru yang dibuka, atau setiap peringatan ditolak dengan justifikasi teknis yang merujuk pada dokumen `docs/security/` yang relevan
- [ ] Rute yang menjalankan proses turunan (`/api/mcp/`, `/api/cli-tools/runtime/`) diklasifikasikan sebagai `isLocalOnlyPath()` dalam `src/server/authz/routeGuard.ts` — lihat [Aturan Ketat #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Tidak ada trailer `Co-authored-by` dari AI/bot dalam pesan commit (Aturan Ketat #16) — kolaborator manusia yang karyanya digunakan kembali diberi kredit dengan trailer standar `Co-authored-by: Name <email>`

---

## Rilis

Rilis dikelola melalui alur kerja `/generate-release`. Saat GitHub Release baru dibuat, paket akan **secara otomatis dipublikasikan ke npm** melalui GitHub Actions.

Untuk deployment VPS, gunakan `npm run build:release` (bukan `npm run build`) — perintah ini melakukan build ulang secara bersih, menyusun bundle ke dalam `dist/`, dan menulis sentinel `dist/BUILD_SHA`.
Kemudian gunakan skill `/deploy-vps-*-cc` yang menyinkronkan `dist/` melalui rsync ke direktori `app/` jarak jauh.

---

## Mendapatkan Bantuan

- **Arsitektur**: Lihat [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referensi API**: Lihat [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentasi keamanan**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentasi operasional**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Masalah**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
