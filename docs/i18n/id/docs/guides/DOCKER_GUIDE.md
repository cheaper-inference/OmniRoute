# 🐳 Docker Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referensi lengkap deployment Docker. Untuk memulai dengan cepat, lihat [bagian Docker di README](../README.md#-docker).

## Daftar Isi

- [Menjalankan dengan Cepat](#quick-run)
- [Dengan File Environment](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profil yang Tersedia](#available-profiles)
- [Mengonfigurasi alat CLI host saat OmniRoute berjalan di Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose Produksi](#production-compose)
- [Tahapan Dockerfile](#dockerfile-stages)
- [Variabel Environment Penting](#critical-environment-variables)
- [Docker Compose dengan Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tag Image](#image-tags)
- [Pembaruan dasbor di Docker](#dashboard-updates-in-docker)
- [Ketersediaan: SQLite bawaan hanya mendukung satu replika](#availability-default-sqlite-is-single-replica)
- [Error regional Gemini di dalam Docker](#gemini-regional-errors-inside-docker)
- [Catatan Penting](#important-notes)

---

## Menjalankan dengan Cepat

> **Self-host dengan satu perintah?** Lihat
> [Panduan Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image yang dipublikasikan +
> Redis, hanya loopback, tanpa pilihan profil). Menjalankan dengan Cepat di bawah ini adalah
> metode satu container untuk pengguna yang sudah menjalankan Redis di tempat lain.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Dengan File Environment

```bash
# Salin dan edit .env terlebih dahulu
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profil dasar (tanpa alat CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, dan OpenClaw sudah disertakan)
docker compose --profile cli up -d

# Profil host (utamanya untuk Linux; memasang binary CLI host dalam mode hanya-baca)
docker compose --profile host up -d

# Profil web (Chromium/Playwright untuk penyedia sesi web)
docker compose --profile web up -d

# Gabungkan CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profil yang Tersedia

OmniRoute menyediakan profil Compose untuk bentuk deployment utama. Pilih profil yang sesuai dengan environment Anda.

| Profil          | Layanan          | Kapan digunakan                                                                                                                                           | Perintah                                     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (bawaan) | `omniroute-base` | Server headless / runtime minimal, tanpa CLI penyedia yang disertakan                                                                                     | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Alur kerja agentik yang memanggil `omniroute providers/setup/doctor` dan CLI yang disertakan (Codex, Claude Code, Droid, OpenClaw)                        | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Host Linux yang menginginkan akses seperti `network_mode` ke CLI host dengan memasang `~/.local/bin`, `~/.codex`, `~/.claude`, dll. dalam mode hanya-baca | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Jalankan sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pada port `8317` untuk melakukan proxy CLI upstream                          | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Penyedia sesi web yang memerlukan browser: `gemini-web`, `claude-web`, `claude-turnstile` (membangun `runner-web`, termasuk Chromium)                     | `docker compose --profile web up -d`         |

> Beberapa profil dapat digabungkan: `docker compose --profile cli --profile cliproxyapi up -d`.

## Mengonfigurasi alat CLI host saat OmniRoute berjalan di Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>`, dan tombol
**Simpan konfigurasi** di dasbor semuanya menulis berkas seperti `~/.codex/*.config.toml`. Jalur tersebut
hanya bermakna pada mesin tempat CLI benar-benar berjalan. Jika dijalankan di dalam
kontainer, penulisan akan masuk ke direktori home milik kontainer (`/home/node` —
image berjalan sebagai `USER node`), yang tidak akan pernah dibaca oleh CLI host dan akan
dihapus saat kontainer dibuat ulang.

OmniRoute mendeteksi hal ini dan menolak penulisan dengan memberikan instruksi alih-alih
melaporkan keberhasilan yang tidak dapat Anda gunakan: CLI keluar dengan kode `2`, dan API merespons `422`
dengan `containerEphemeralTarget: true`.

### Direkomendasikan: jalankan CLI di host, OmniRoute di Docker

Kontainer menyediakan API; CLI mengonfigurasi alat-alat host Anda.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # arahkan CLI ke kontainer
omniroute setup-codex                      # menulis ke ~/.codex yang sebenarnya di host Anda
```

Ini adalah pilihan yang tepat ketika Codex, Claude Code, Cursor, atau alat serupa berjalan di
laptop Anda — yang merupakan konfigurasi paling umum.

### Alternatif: bind-mount direktori konfigurasi host (profil `host`)

Jika Anda ingin kontainer itu sendiri menulis konfigurasi host, mount
direktori tersebut dan arahkan `CLI_CONFIG_HOME` ke root mount. Profil `host`
sudah melakukannya:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount membuat jalur tersebut dapat dipercaya: OmniRoute membaca
`/proc/self/mountinfo` dan mengizinkan penulisan ke jalur yang di-mount (serta ke direktori
yang anak direktorinya merupakan mount, persis seperti struktur `/host-home` di atas), sembari
tetap menolak jalur yang tidak di-mount.

### Jalan keluar: konfigurasikan CLI milik kontainer sendiri (gunakan seperlunya)

Ketika CLI benar-benar berada di dalam kontainer (profil `cli`), penulisan tersebut
memang disengaja. Berikan `--allow-container-write` ke perintah `setup-*` apa pun, atau tetapkan
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` untuk server. Penulisan akan dilanjutkan
dengan peringatan bahwa hasilnya tidak akan bertahan setelah kontainer dibuat ulang.

> **Peringatan keamanan — profil `cli` + mount `docker.sock`.**
> Profil `cli` melakukan bind-mount `/var/run/docker.sock` agar pemutakhir otomatis
> di dalam kontainer dapat membuat ulang stack melalui daemon host
> (`src/lib/system/autoUpdate.ts` memeriksa socket tersebut dan melewati
> jalur Docker ketika socket tidak tersedia). Socket tersebut adalah **batas kepercayaan
> setara root pada host**: apa pun yang dapat mengaksesnya dapat mengendalikan daemon Docker host sebagai
> root — termasuk membuat, memeriksa, menghentikan, dan menghapus kontainer apa pun di host.
> Implikasinya:
>
> 1. **Jangan pernah mengekspos port profil `cli` ke jaringan.** Publikasikan
>    port tersebut pada `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` yang dapat dijangkau dari LAN akan mengubah RCE tingkat dasbor menjadi
>    pengambilalihan host secara penuh.
> 2. **Jangan bind direktori host tambahan apa pun ke profil `cli`.**
>    Socket Docker beserta mount tambahan apa pun memberikan kontainer akses baca/tulis penuh
>    ke sistem berkas dan konfigurasi host Anda. Jika sebuah alat perlu
>    mengakses suatu proyek, jalankan alat tersebut secara lokal menggunakan biner CLI — jangan mount proyek itu
>    ke dalam kontainer `cli`.
>
> Jika Anda tidak memerlukan pemutakhiran otomatis di dalam kontainer, jangan aktifkan profil `cli`
> (`COMPOSE_PROFILES=core,redis` atau yang lebih singkat). Profil lainnya tidak
> melakukan mount socket Docker.
>
> Lihat `docs/security/MITM-TPROXY-DECRYPT.md` (git; tidak dikompilasi ke dalam `/docs`) untuk model ancaman terkait
> MITM, dan `docs/security/SUPPLY_CHAIN.md` untuk rantai asal-usul biner
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute mengandalkan Redis untuk mendukung pembatas laju terdistribusi dan cache bersama. Layanan `redis` **selalu didefinisikan** dalam `docker-compose.yml` (tidak memiliki pembatas profil) dan dimulai bersama profil lainnya.

| Detail                | Nilai                                   |
| --------------------- | --------------------------------------- |
| Image                 | `redis:7-alpine`                        |
| Nama container        | `omniroute-redis`                       |
| Port internal         | `6379`                                  |
| Port host (override)  | `REDIS_PORT` (default `6379`)           |
| Bind host (override)  | `REDIS_BIND_HOST` (default `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`        |
| Pemeriksaan kesehatan | `redis-cli ping` (interval 10 detik)    |

Variabel lingkungan terkait:

- `REDIS_URL` — string koneksi yang diinjeksikan ke aplikasi (`redis://redis:6379` secara default).
- `REDIS_PORT` — pemetaan port sisi host untuk container Redis.
- `REDIS_BIND_HOST` — antarmuka host tempat port dipublikasikan. Default-nya adalah `127.0.0.1`.

> **Mengapa menggunakan loopback secara default:** sidecar berjalan tanpa `requirepass`, dan
> container aplikasi mengaksesnya melalui jaringan compose (`redis:6379`) — port yang dipublikasikan
> hanya disediakan untuk alat sisi host (`redis-cli`, `npm run dev` lokal). Mempublikasikannya pada
> `0.0.0.0` akan mengekspos Redis tanpa autentikasi ke setiap host di LAN Anda. Jika Anda menetapkan
> `REDIS_BIND_HOST=0.0.0.0`, tambahkan juga `--requirepass` ke `command:` layanan.

**Menonaktifkan Redis** tidak direkomendasikan (pembatas laju akan beralih ke fallback dalam memori dengan kemampuan yang lebih terbatas). Jika harus, hapus/beri komentar pada blok layanan `redis:` dalam `docker-compose.yml` atau skalakan menjadi nol:

```bash
docker compose up -d --scale redis=0
```

## Compose Produksi

Untuk snapshot produksi terisolasi yang berjalan berdampingan dengan lingkungan pengembangan, gunakan `docker-compose.prod.yml`.

| Detail                 | Nilai                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| File                   | `docker-compose.prod.yml`                                                                           |
| Port dashboard default | `PROD_DASHBOARD_PORT=20130` (dipetakan ke `${DASHBOARD_PORT:-20128}` internal)                      |
| Port API default       | `PROD_API_PORT=20131`                                                                               |
| Image                  | `omniroute:prod` (dibuat dari target `runner-cli`)                                                  |
| Container Redis        | `omniroute-redis-prod` (`redis:8.6.2`, volume khusus `redis-prod-data`)                             |
| Volume data            | `omniroute-prod-data` (bernama, dipertahankan saat pembuatan ulang)                                 |
| Pemeriksaan kesehatan  | `node healthcheck.mjs` + `redis-cli ping`, dengan `depends_on` yang bergantung pada kesehatan Redis |

Cara menggunakan:

```bash
# Buat dan mulai stack produksi
docker compose -f docker-compose.prod.yml up -d --build

# Pantau log secara langsung
docker compose -f docker-compose.prod.yml logs -f

# Hentikan stack (pertahankan volume)
docker compose -f docker-compose.prod.yml down
```

Stack produksi berjalan secara paralel dengan compose pengembangan (nama container, port, dan volume yang berbeda), sehingga Anda dapat terus melakukan iterasi secara lokal saat produksi tetap berjalan.

## Tahapan Dockerfile

Repositori ini menyertakan Dockerfile multi-tahap (`Dockerfile`). Empat tahapan diekspos; pilih `target` yang tepat untuk kasus penggunaan Anda.

| Tahap         | Image dasar           | Tujuan                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Menginstal dependensi (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (secara default menggunakan Turbopack — lihat Sumber daya waktu build di bawah)                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Runtime produksi dengan output standalone Next.js. **Tidak menyertakan CLI penyedia.**                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Menambahkan `git`, `docker.io`, `docker-compose`, dan CLI global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pilih ini untuk alur kerja agentik.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Menambahkan Playwright + browser Chromium (`--with-deps`) untuk penyedia sesi web: `gemini-web`, `claude-web`, `claude-turnstile`. **Pilih ini saat Anda menggunakan penyedia tersebut** — image biasa akan gagal saat menerima permintaan tanpa ini (lihat catatan `-web` pada Kanal Rilis). |

Build target tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Sumber daya waktu build

Tiga argumen build mengendalikan biaya sumber daya tahap `builder`. Ketiganya hanya berlaku saat build —
`OMNIROUTE_MEMORY_MB` (di bawah) adalah pengaturan runtime yang terpisah.

| Argumen build               | Default | Efek                                                                                                                        |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` melakukan build dengan webpack: penggunaan memori puncak lebih rendah, tetapi lebih lambat. `1` mengaktifkan Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Batas heap V8 (`--max-old-space-size`) untuk `next build` yang dijalankan.                                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Mengisi `CIRCLE_NODE_TOTAL`; Next menentukan `workers = N - 1` untuk pengumpulan data halaman.                              |

`OMNIROUTE_BUILD_WORKERS` adalah pengaturan yang perlu dinaikkan pada builder besar dan yang perlu
dicurigai saat build dengan sumber daya terbatas gagal **setelah** `✓ Compiled successfully`. Setiap
worker data halaman merupakan proses tersendiri, begitu pula proses induk `next build`;
reproduksi pada VPS aktif (isu #7518) mengukur RSS puncak setiap proses sebesar
~4,5 GB, terlepas dari flag heap `NODE_OPTIONS` (Turbopack melakukan kompilasi dalam
memori native/Rust di luar heap V8). Nilai default `2` (→ 1 worker, total 2
proses) disesuaikan untuk runner yang dihosting GitHub dengan 16 GB / 4 vCPU yang
digunakan oleh pipeline publikasi. Pada `8` (→ 7 worker), runner tersebut kehabisan memori dan
buildkit menggagalkan langkah dengan `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 worker) masih tidak mencukupi setelah RSS per proses diukur
secara langsung, bukan diperkirakan. `tests/unit/docker-build-memory-budget.test.ts`
melakukan perhitungan berdasarkan angka hasil pengukuran dan akan gagal jika salah satu pengaturan
melampaui kapasitas runner.

Turbopack melakukan kompilasi dalam memori native Rust yang berada **di luar** heap V8, sehingga
`OMNIROUTE_BUILD_MEMORY_MB` tidak membatasinya. Pada host dengan batas memori,
build kemudian dihentikan dengan SIGKILL oleh OOM killer tanpa teks galat sama sekali — proses hanya
berhenti di tengah `Creating an optimized production build`, sehingga tampak seperti macet,
bukan kehabisan memori. Itulah sebabnya `Dockerfile` menggunakan webpack secara default
(`OMNIROUTE_USE_TURBOPACK=0`), tidak seperti `npm run dev` / `npm run build`, yang
secara default dalam kode menggunakan Turbopack: perintah `docker build .` biasa tanpa argumen build (seperti yang
dijalankan oleh Railway dan host sekali klik lainnya) tidak boleh berhenti diam-diam pada
builder yang memorinya dibatasi. Image yang dipublikasikan telah meneruskan `OMNIROUTE_USE_TURBOPACK=0`
secara eksplisit dalam `docker-publish.yml`. Pada builder dengan RAM yang besar, aktifkan
Turbopack untuk build yang lebih cepat:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` diaktifkan, sehingga `next build` menjalankan proses induk **dan** proses worker,
dan masing-masing mematuhi `OMNIROUTE_BUILD_MEMORY_MB` secara terpisah. Tetapkan batas memori container
sedikit di atas dua kali nilai tersebut, bukan hanya satu kali.

Diukur pada tree ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Batas container | Hasil                                     |
| --------- | --------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | Dihentikan OOM pada keduanya, tanpa pesan |
| webpack   | 8 GiB           | Worker build dihentikan dengan SIGKILL    |
| webpack   | 12 GiB          | Berhasil, mencapai puncak 11,1 GiB        |

### Default runtime

Default yang diekspor oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Perilaku memori dalam Docker:

- Image menetapkan `OMNIROUTE_MEMORY_MB=1024` dan memperoleh `NODE_OPTIONS=--max-old-space-size=1024` darinya.
- Proses server aktual dimulai oleh peluncur standalone, yang membaca `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node menggunakan nilai `--max-old-space-size` berulang yang terakhir, sehingga pengaturan `OMNIROUTE_MEMORY_MB` mengontrol batas heap Docker yang efektif.
- Karena image selalu menetapkannya, fallback peluncur yang dikalibrasi berdasarkan RAM tidak pernah diterapkan di Docker. Naikkan nilainya secara eksplisit sesuai beban kerja (tabel di bawah). `2048` masih terlalu kecil untuk `/v1/responses` agen coding.

### RAM runtime untuk agen coding

Nilai default Docker sebesar 1 GiB merupakan batas minimum untuk dasbor/percakapan ringan, bukan ukuran untuk produksi. Body `POST /v1/responses` yang panjang (ratusan pesan, puluhan alat) mempertahankan beberapa graf dalam memori selama kompresi. Dua permintaan yang tumpang tindih sebesar ~3 MiB / ~750 ribu token telah menyebabkan V8 berhenti pada old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) dan juga memicu OOM cgroup 16 GiB. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tetapkan ukuran **cgroup `--memory` di atas heap** — buffer native, SQLite, dan data perantara kompresi berada di luar V8.

| Beban kerja                          | `OMNIROUTE_MEMORY_MB`   | Container / cgroup            | Catatan                                                                                                              |
| ------------------------------------ | ----------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Dasbor, satu percakapan ringan       | `1024` (default image)  | ≥2 GiB                        |                                                                                                                      |
| Satu agen coding (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                       | `/v1/responses` satu sesi pada umumnya                                                                               |
| Dua `/v1/responses` panjang serentak | `10240`–`12288`         | ≥12–16 GiB                    | V8 terukur berhenti pada heap ~12 GiB                                                                                |
| Tiga+ konteks panjang serentak       | jangan pada satu proses | serialisasi / RAM lebih besar | Penerimaan beban berat default adalah 1 yang sedang diproses; menaikkannya tanpa RAM akan memicu kembali penghentian |

`omniroute serve` pada bare metal mengalibrasi ~35% RAM (dibatasi dalam rentang `[512, 4096]`) ketika `OMNIROUTE_MEMORY_MB` **tidak ditetapkan**. Docker selalu menetapkan `1024`, sehingga kalibrasi tersebut tidak pernah dijalankan pada image resmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabel Lingkungan Penting

Selain nilai default yang didokumentasikan dalam [ENVIRONMENT.md](../reference/ENVIRONMENT.md), variabel berikut paling penting saat dijalankan menggunakan Docker:

| Variabel                      | Tujuan                                                                                                                                                                                                                                                                              | Default                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rahasia bersama untuk bridge WebSocket. **Wajib di lingkungan produksi** — atur ke string acak yang kuat.                                                                                                                                                                           | tidak diatur (harus disediakan) |
| `REDIS_URL`                   | String koneksi untuk backend pembatas laju/cache                                                                                                                                                                                                                                    | `redis://redis:6379`            |
| `REDIS_PORT`                  | Port sisi host untuk kontainer Redis bawaan                                                                                                                                                                                                                                         | `6379`                          |
| `REDIS_BIND_HOST`             | Antarmuka host tempat port Redis bawaan dipublikasikan (loopback kecuali jika Anda menambahkan AUTH)                                                                                                                                                                                | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path host yang dipasang ke profil `cli` di `/workspace/omniroute` untuk alur kerja pembaruan mandiri                                                                                                                                                                                | `.` (direktori saat ini)        |
| `OMNIROUTE_MEMORY_MB`         | Batas maksimum heap Node saat runtime untuk server mandiri Docker; menggantikan nilai default image di atas. Agen pengodean: `8192`+ (lihat [RAM runtime](#runtime-ram-for-coding-agents)).                                                                                         | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Mengganti port yang diekspos untuk dasbor (20128) dan API (20129)                                                                                                                                                                                                                   | `20128` / `20129`               |
| `APP_BIND_HOST`               | Antarmuka host tempat docker-compose memublikasikan port dasbor/API/live-WS. Dengan `REQUIRE_API_KEY=false` (nilai default), `0.0.0.0` mengekspos proksi anonim `/v1` ke LAN — perluas akses hanya dengan `REQUIRE_API_KEY=true` atau dengan menempatkan reverse proxy di depannya. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Antarmuka host tempat docker-compose memublikasikan sidecar `cliproxyapi` — volume datanya menyimpan kredensial penyedia.                                                                                                                                                           | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori yang dibaca oleh pemindai plugin runtime dan menjadi lokasi instalasi. Atur variabel ini saat plugin dipasang dengan bind mount: nilai default mengikuti `HOME`, yang mungkin tidak diekspor oleh image.                                                                  | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Subpath URL saat aplikasi dipublikasikan di belakang reverse proxy (misalnya `/omniroute`)                                                                                                                                                                                          | _(kosong = root)_               |
| `NEXT_PUBLIC_BASE_URL`        | Origin browser publik, termasuk subpath (misalnya `https://host/omniroute`)                                                                                                                                                                                                         | tidak diatur                    |
| `PROD_DASHBOARD_PORT`         | Port dasbor sisi host untuk `docker-compose.prod.yml`                                                                                                                                                                                                                               | `20130`                         |
| `CLIPROXYAPI_PORT`            | Port sisi host untuk sidecar `cliproxyapi`                                                                                                                                                                                                                                          | `8317`                          |

## Reverse Proxy pada Subpath (Traefik / nginx)

`basePath` Next.js dikompilasi ke dalam bundle standalone. OmniRoute mencatat nilai
yang disematkan dalam file sentinel di root aplikasi (ditulis selama `npm run build`;
dibaca oleh `scripts/docker/ensure-docker-base-path.mjs`) dan membandingkannya dengan
`OMNIROUTE_BASE_PATH` saat container dimulai. Jika nilainya berbeda dan image dibuat
untuk root domain, entrypoint menulis ulang manifest standalone, literal
`basePath`/`assetPrefix` yang disematkan (Next 16 merender URL aset SSR hanya dari
`assetPrefix` — patcher mencerminkan subpath ke dalamnya), URL aset
`/_next/static` yang disematkan (manifest referensi klien, impor media, halaman error
yang diprarender), serta shim `process.env` klien sebelum
`node dev/run-standalone.mjs` dijalankan.

### Build Compose (direkomendasikan)

Tetapkan kedua variabel dalam `.env`, lalu build ulang agar image dan runtime selaras:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` meneruskan `OMNIROUTE_BASE_PATH` sebagai build-arg Docker dan
sebagai variabel lingkungan runtime.

### Image root siap pakai + subpath runtime

Image `diegosouzapw/omniroute:*` yang dipublikasikan dibuat untuk root domain. Anda tetap
dapat menetapkan `OMNIROUTE_BASE_PATH` saat runtime; container akan melakukan patch
pada bundle satu kali saat startup. Pasangkan dengan origin publik yang sesuai:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan reverse proxy untuk meneruskan path eksternal **secara lengkap** (jangan
hapus prefix). Traefik harus merutekan `PathPrefix(`/omniroute`)` ke container tanpa
`StripPrefix`, sehingga Next.js menerima `/omniroute/...` dan menyajikan aset dari
`/omniroute/_next/...`.

Healthcheck Docker memeriksa endpoint siklus hidup ringan `/healthz` yang diberi prefix
`OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` tetap tersedia untuk diagnostik
oleh manusia/dashboard; untuk mengarahkan HEALTHCHECK container kembali ke endpoint
tersebut (misalnya untuk menerapkan pemeriksaan kesehatan mendalam), tetapkan
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Path tersebut merupakan pemeriksaan
**mendalam** (DB + ringkasan pemantauan) — sesuai untuk `HEALTHCHECK` Docker yang jarang
dijalankan jika Anda memilih untuk mengaktifkannya kembali, tetapi **tidak** untuk
interval `livenessProbe` Kubernetes.

Untuk orkestrator (Kubernetes, Nomad, dll.):

| Probe           | Utamakan                                                              | Hindari                                                     |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, default `20128`) | `/api/monitoring/health` sebagai pemeriksaan liveness       |
| Readiness       | HTTP `GET /healthz`                                                   | Timeout ketat yang menganggap event loop sibuk sebagai mati |
| Deep / blackbox | `/api/monitoring/health`                                              | —                                                           |

`/healthz` melaporkan siklus hidup proses (`ok` / `starting` / `stopping`). `/livez`
hanya memeriksa apakah proses hidup (200 setiap kali handler dapat berjalan; endpoint
ini tidak menunggu readiness). Keduanya tetap berjalan pada event loop Node yang sama
dengan penanganan permintaan, sehingga pekerjaan katalog atau kompresi yang terikat CPU
dapat menundanya — sibuk ≠ mati. Utamakan liveness TCP jika probe HTTP mengalami
timeout. Panduan probe lengkap:
[Panduan pemantauan — rekomendasi probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose dengan Caddy (HTTPS Auto-TLS)

OmniRoute dapat diekspos secara aman menggunakan penyediaan SSL otomatis dari Caddy. Pastikan record DNS A domain Anda mengarah ke alamat IP server Anda.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin yang diakses browser untuk callback OAuth, tautan dasbor, dan URL publik yang dihasilkan.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL internal antarpeladen untuk tugas terjadwal / pengambilan mandiri.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy menetapkan header penerusan standar untuk kontainer upstream. OmniRoute menggunakan
`NEXT_PUBLIC_BASE_URL` sebagai origin publik kanonis untuk callback OAuth dan tautan publik yang
dihasilkan; penulisan dasbor terautentikasi menggunakan permintaan same-origin beserta perlindungan
CSRF yang terikat sesi. Aktifkan `OMNIROUTE_TRUST_PROXY` hanya untuk deployment tingkat lanjut ketika
Anda memang ingin OmniRoute memperoleh origin publik dari header penerusan tepercaya, bukan dari
konfigurasi eksplisit.

## Cloudflare Quick Tunnel

Dukungan dasbor untuk deployment Docker mencakup **Cloudflare Quick Tunnel** sekali klik di `Dashboard → Endpoints`. Saat pertama kali diaktifkan, `cloudflared` hanya diunduh ketika diperlukan, tunnel sementara ke endpoint `/v1` Anda saat ini dimulai, dan URL `https://*.trycloudflare.com/v1` yang dihasilkan ditampilkan langsung di bawah URL publik normal Anda.

Panel tunnel endpoint (Cloudflare, Tailscale, ngrok) dapat ditampilkan atau disembunyikan dari `Settings → Appearance` tanpa mengubah status tunnel yang aktif.

### Catatan Tunnel

- URL Quick Tunnel bersifat sementara dan berubah setelah setiap mulai ulang.
- Quick Tunnel tidak dipulihkan secara otomatis setelah OmniRoute atau kontainer dimulai ulang. Aktifkan kembali dari dasbor saat diperlukan.
- Instalasi terkelola saat ini mendukung Linux, macOS, dan Windows pada `x64` / `arm64`.
- Quick Tunnel terkelola secara default menggunakan transport HTTP/2 untuk menghindari peringatan buffer UDP QUIC yang mengganggu dalam lingkungan kontainer dengan sumber daya terbatas. Atur `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika Anda menginginkan transport yang berbeda.
- Image Docker menyertakan root CA sistem dan meneruskannya ke `cloudflared` terkelola, sehingga menghindari kegagalan kepercayaan TLS ketika tunnel melakukan bootstrap di dalam kontainer.
- Atur `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jika Anda ingin OmniRoute menggunakan biner yang sudah ada, alih-alih mengunduhnya.

## Tag Image

| Image                    | Tag      | Ukuran | Deskripsi                                                   |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer stabil **terpublikasi** tertinggi (bukan git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Sematkan kelas tag ini untuk GitOps                         |

Manifes multiplatform: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih arsitektur yang sesuai secara otomatis; gunakan `--platform linux/amd64` jika Anda perlu memaksakan emulasi AMD64 pada host ARM.

### Kanal Rilis

OmniRoute menerbitkan kanal Docker terpisah untuk rilis stabil, pengujian cabang rilis aktif, dan build pengembangan.

| Kanal                           | Sumber                                   | Mutabilitas                              | Penggunaan yang disarankan                                                                                                         |
| ------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilis bertanda tangan/berversi           | Imutabel                                 | Deployment produksi yang menyematkan rilis tertentu                                                                                |
| `:latest` / `:latest-web`       | SemVer stabil **terpublikasi** tertinggi | Penunjuk stabil yang dapat berubah       | Mengikuti rilis stabil **setelah** tugas publikasi SemVer — **tidak** mengikuti `main` atau commit `release/v*` yang belum dirilis |
| `:next` / `:next-web`           | Cabang `release/v*` default saat ini     | Penunjuk prarilis yang dapat berubah     | Menguji perbaikan yang telah diterapkan pada cabang rilis aktif, tetapi belum disertakan dalam rilis stabil                        |
| `:main` / `:main-web`           | Cabang `main`                            | Penunjuk pengembangan yang dapat berubah | Hanya untuk pengembangan dan pengujian integrasi                                                                                   |

#### Penyedia sesi web: image `-web`

Setiap kanal di atas juga tersedia sebagai tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), yang dibuat dari tahap `runner-web` — image yang sama ditambah Playwright dan browser Chromium. Image biasa dikirimkan **tanpa** Chromium; `gemini-web`, `claude-web`, dan `claude-turnstile` memerlukannya.

Kegagalan ditunda, bukan terjadi saat startup: penyedia tersebut mencantumkan model mereka dan ditampilkan sebagai terhubung di dasbor, lalu baru gagal pada permintaan pertama dengan pesan

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jika Anda menggunakan penyedia tersebut, tarik tag `-web` dari kanal yang sedang Anda gunakan — tidak ada hal lain yang berubah. Pada instalasi npm/CLI (tanpa image Docker), komponen setara yang hilang adalah biner browser: jalankan `npx playwright install chromium` pada host.

#### Menggunakan kanal prarilis

Kanal `next` dibangun ulang pada setiap push ke branch default `release/v*` saat ini dan dipublikasikan untuk AMD64 maupun ARM64. Branch pemeliharaan yang lebih lama tidak dapat menimpanya. Kanal ini menyediakan image yang dapat di-pull untuk perbaikan yang telah digabungkan ke branch rilis aktif sebelum tag stabil berikutnya dibuat.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, timpa tag image yang digunakan oleh profil yang dipilih, lalu pull dan buat ulang layanan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keamanan dan rollback

`next` adalah kanal prarilis yang selalu berubah. Kanal ini dapat berubah pada setiap push ke branch rilis aktif dan **tidak didukung untuk penggunaan produksi**. Sematkan digest image saat mengevaluasi build tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum menguji, cadangkan volume data OmniRoute atau direktori data yang di-bind mount. Untuk melakukan rollback, pulihkan versi stabil atau digest yang digunakan sebelumnya, lalu buat ulang container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build branch rilis tidak pernah dapat memindahkan `latest`; hanya versi semantik stabil yang memenuhi syarat yang dapat mempromosikan penunjuk stabil tersebut. Image `next` tetap menjalani pemeriksaan image rilis dan gerbang pemblokiran kerentanan CRITICAL.

**`latest` bukan jaminan kebaruan untuk git.** Perbaikan yang digabungkan ke `main` atau ke branch `release/v*` aktif **belum** tersedia di `:latest` hingga image SemVer stabil dipublikasikan dan job publikasi mempromosikan `:latest` (dengan digest yang sama seperti SemVer tersebut). Jika `latest` tampak tidak berubah sementara GitHub sudah menampilkan perbaikannya, pull `:next` untuk menguji branch rilis atau tunggu tag SemVer.

| Yang Anda inginkan                                                                        | Gunakan                               |
| ----------------------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / produksi yang tidak boleh berubah                                                | Sematkan `:X.Y.Z` (atau digest image) |
| Mengikuti rilis stabil yang dipublikasikan dan menerima pembuatan ulang pada setiap rilis | `:latest`                             |
| Menguji commit `release/v*` yang belum dirilis                                            | `:next` (bukan untuk produksi)        |
| Menguji `main`                                                                            | `:main` (bukan untuk produksi)        |

## Pembaruan dasbor di Docker

Container dari image yang dipublikasikan tidak dapat mengganti dirinya sendiri. Ketika OmniRoute mendeteksi bahwa dirinya berjalan di dalam
container (tanpa checkout `.git`, bukan instalasi npm), banner pembaruan di dasbor utama menampilkan
perintah host yang harus dijalankan sebagai pengganti petunjuk npm/git, disertai tombol salin:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Nama layanan berasal dari `AUTO_UPDATE_SERVICE` (default `omniroute`, yaitu layanan dalam
`docker-compose.selfhost.yml`). `pull` hanya memindahkan tag mengambang (`latest`, `next`); jika menggunakan tag
`:X.Y.Z` yang disematkan, ubah tag tersebut terlebih dahulu.

### Pembaruan sekali klik dengan file pemicu host

Agar **Perbarui Sekarang** tetap berfungsi tanpa memasang `/var/run/docker.sock` (yang memberikan container
akses root pada host — lihat peringatan profil `cli` di atas), tetapkan `DOCKER_UPDATE_TRIGGER_FILE` pada
layanan OmniRoute dan jalankan pemantau pada host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Path harus berada di dalam `DATA_DIR` (nilai relatif diresolusikan terhadapnya); nilai lain
akan ditolak. **Perbarui Sekarang** kemudian menulis `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` ke
file tersebut, memberikan respons `202`, dan dasbor melakukan polling terhadap `/api/system/version` hingga versi baru aktif
lalu memuat ulang. OmniRoute tidak pernah menjalankan perintah shell atau Docker dalam mode ini. Seperti setiap tindakan
pembaruan, permintaan hanya diterima dari klien loopback/LAN.

Direktori data yang dipasang dengan bind mount memberikan path stabil pada host untuk dipantau. Contoh unit `systemd`
(sesuaikan `/srv/omniroute` dengan direktori yang berisi file compose dan `data/` Anda):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Memantau permintaan pembaruan dasbor OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Menarik dan membuat ulang container OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

Layanan menghapus permintaan sebelum melakukan penarikan agar eksekusi yang gagal tidak berulang tanpa henti. Tanpa
`DOCKER_UPDATE_TRIGGER_FILE`, dasbor tetap menggunakan alur perintah manual.

## Ketersediaan: SQLite default hanya mendukung satu replika

Konfigurasi standar Docker/Kubernetes OmniRoute terdiri atas **satu proses Node + satu penulis SQLite**. Ketersediaan tinggi **tidak didukung** pada topologi tersebut.

| Batasan                                                      | Konsekuensi                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Penulis tunggal                                              | **Jangan** menjalankan beberapa replika menggunakan file SQLite yang sama. Hal tersebut akan merusak DB.                                                                                                                                                                                                                                                              |
| Pembuatan ulang / mulai ulang / penghentian oleh HEALTHCHECK | **Gangguan layanan penuh** pada SSE yang sedang berlangsung, sesi dasbor, dan status dalam memori. Setiap klien yang terhubung akan terputus. Permintaan baru selama tidak ada endpoint yang tersedia akan menerima **`502 Bad Gateway: Unknown error`** dari reverse proxy, bukan JSON OmniRoute — klien tidak dapat membedakannya dari kegagalan penyedia (#11015). |
| Event loop yang sama dengan `/healthz`                       | Tick katalog atau kompresi yang sibuk dapat menunda probe; timeout singkat kemudian memulai ulang **satu-satunya** replika.                                                                                                                                                                                                                                           |

**Matriks probe** (lihat juga [rekomendasi probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe              | Target                                                        | Jangan gunakan                                              |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Liveness           | TCP pada `PORT` (default `20128`), atau HTTP lunak `/healthz` | `/api/monitoring/health`                                    |
| Readiness          | HTTP `GET /healthz`                                           | Timeout ketat yang menganggap event loop sibuk sebagai mati |
| Mendalam / manusia | `/api/monitoring/health`                                      | Liveness kubelet otomatis                                   |

**Peningkatan versi:** perkirakan setiap sesi akan terputus. Alihkan klien jika memungkinkan; tidak ada rolling update pada SQLite default. Compose `restart: unless-stopped` beserta Docker `HEALTHCHECK` juga akan mengganti satu-satunya proses ketika container berstatus Unhealthy — dengan dampak yang sama luasnya.

Cuplikan Kubernetes untuk **satu replika** (Recreate wajib digunakan; jangan tingkatkan `replicas` untuk satu file SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Jeda `preStop` memungkinkan kube menghapus endpoint Service sebelum SIGTERM sehingga lalu lintas **baru** berhenti mencapai proses yang sedang dihentikan. SSE `/v1/responses` yang sedang berlangsung diberi waktu untuk diselesaikan hingga `SHUTDOWN_TIMEOUT_MS` (bawaan 30 detik) melalui lease penerimaan kelas berat (#11015). Permintaan baru yang masih mencapai proses akan menerima `503` + `Retry-After: 5`. Jeda tanpa endpoint pada Recreate hingga pengganti berstatus Ready tetap merupakan gangguan layanan total — itu merupakan konsekuensi topologi SQLite, bukan kesalahan konfigurasi probe.

Postgres eksternal/HA multi-writer **bukan** jalur standar yang terdokumentasi. Jika Anda membutuhkan HA, pertahankan satu replika atau jalankan topologi yang telah diuji dan didokumentasikan secara terpisah oleh proyek. Pekerjaan Postgres/MySQL tersedia di [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hingga fitur tersebut dirilis, satu-satunya cara yang didukung untuk meningkatkan kapasitas `/v1/responses` **besar** adalah menggunakan N proses independen (bagian berikutnya), bukan `replicas > 1` pada satu volume.

## Scale-out: N proses independen

Satu proses Node adalah **satu heap V8**. Dua coding-agent `POST /v1/responses` (RTK + Caveman) yang tumpang tindih, masing-masing berukuran ~3 MiB / ~750 ribu token, menghentikan heap tersebut pada ~12 Gi (`FATAL ERROR: Reached heap limit`) dan dapat menyebabkan OOM pada cgroup 16 Gi. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran tersebut merupakan peringatan **anggaran memori**, bukan batas maksimum produk sebesar dua `/v1/responses` panjang yang berjalan bersamaan. Penerimaan chat kelas berat dibatasi oleh anggaran byte ingest yang diturunkan secara otomatis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dan ditentukan berdasarkan batas V8/cgroup yang sama — menaikkan nilainya secara manual (atau menetapkan batas jumlah permintaan lama `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) pada proses yang kapasitasnya sudah ditentukan akan kembali menyebabkan penghentian. Chat kecil, `/healthz`, `/v1/models`, dan MCP **tidak** termasuk dalam batas tersebut.

### Satu proses: lebih dari dua `/v1/responses` panjang

Proses yang **sehat** (heap di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`) **dapat** menjalankan lebih dari dua `POST /v1/responses` panjang secara bersamaan selama anggaran byte inflight seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) masih memiliki ruang. Body dengan ukuran sama dengan atau di atas `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) menggunakan lease kelas berat yang sama seperti permintaan dengan struktur kompleks dan menggunakan mekanisme pelepasan `tryAcquireHealthyHeadroom` yang sama dari [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Puluhan klien SSE panjang yang berjalan bersamaan (operator sering kali memerlukan 40–50) merupakan persoalan **anggaran memori** — sesuaikan ukuran heap + slot utama/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukan batas produk tetap “maksimal 2”. Heap yang berada di bawah tekanan tetap melakukan shedding dengan `503` yang dapat dicoba ulang agar #7849 tidak terjadi kembali.

Untuk **melipatgandakan heap** (old-space V8 independen) **saat ini**:

| Lakukan                                                                                                                                                   | Jangan lakukan                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Jalankan **N container/pod**, masing-masing dengan `DATA_DIR` / volume **sendiri**                                                                        | Tetapkan `replicas > 1` terhadap satu file SQLite          |
| Sesuaikan heavy in-flight + healthy-headroom berdasarkan anggaran heap / byte inflight; 1–2 adalah default konservatif #7849, bukan batas maksimum produk | Berikan satu proses RAM 8× dan batas jumlah tanpa maksimum |
| Opsional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk **penghitung kuota bersama**                                                         | Perlakukan Redis sebagai SQLite bersama — bukan demikian   |
| Duplikasikan secret provider ke setiap instance (atau terima dashboard yang terpisah-pisah)                                                               | Harapkan satu dashboard / satu call-log lintas-instance    |
| Gunakan load balancer apa pun di bagian depan; sticky berdasarkan API key atau session sudah cukup                                                        | Wajibkan middleware size-aware khusus vendor               |

Perangkat keras: jumlah `/v1/responses` panjang per instance yang berjalan bersamaan merupakan persoalan **anggaran memori** (heap + byte inflight / #10110). `N` `DATA_DIR` independen tetap melipatgandakan heap: RAM host harus mampu menampung `N × cgroup`, bukan “satu pod 16 Gi dengan N=8.” Jangan pernah menggunakan `replicas > 1` pada satu file SQLite.

Sketsa Compose (dua heap, dua volume — bukan `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Kepadatan dalam proses (kompresi dipindahkan dari isolate HTTP) dibahas di [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu cluster logis pada state persisten bersama dibahas di [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Error regional Gemini di dalam Docker

Google AI Studio / Gemini API dapat mengembalikan HTTP 400 dengan FAILED_PRECONDITION dan
`User location is not supported for the API use.` Permintaan yang berhasil pada host
tidak membuktikan bahwa kontainer menggunakan rute keluar yang sama. Urutan DNS,
konektivitas IPv4/IPv6, perutean VPN, dan proksi yang dikonfigurasi dapat berbeda. Periksa
[wilayah yang didukung Google](https://ai.google.dev/gemini-api/docs/available-regions)
serta rute koneksi yang sebenarnya; error ini saja tidak menunjukkan bahwa API key bermasalah.

### Utamakan proksi khusus koneksi

Gunakan [konfigurasi proksi per koneksi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
OmniRoute untuk koneksi Gemini yang terdampak, lalu ulangi **Uji Koneksi** dan permintaan kecil
dengan model yang sama. Ini menjaga agar perubahan perutean hanya berlaku pada koneksi tersebut. Pastikan
proksi dapat dijangkau dari kontainer, dan bahwa koneksi tersebut benar-benar memilihnya.
Mengubah rute tidak menjamin kelayakan regional di sisi upstream.

### Bandingkan jaringan host dan kontainer

Pertahankan key, model, dan permintaan yang identik saat membandingkan hasil terautentikasi; jangan pernah
menempelkan kredensial, kata sandi proksi, atau header otorisasi lengkap ke dalam issue.
Pertama, periksa keluarga alamat yang ditawarkan resolver OS menggunakan perintah yang sama
pada host dan di dalam kontainer:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Ganti `omniroute` dengan layanan yang Anda jalankan (misalnya, `omniroute-web`). Perintah-perintah ini
mencetak keluarga alamat tanpa kredensial atau alamat IP. Nilai `6` yang dikembalikan
hanya menunjukkan hasil DNS IPv6: ini **tidak** membuktikan adanya rute IPv6 yang dapat digunakan atau akses API.
Jika `curl` terinstal, bandingkan `curl -4 -I https://generativelanguage.googleapis.com`
dengan `curl -6 -I https://generativelanguage.googleapis.com` di kedua lingkungan.
Respons HTTP membuktikan konektivitas untuk pengujian tersebut, meskipun berupa error tanpa autentikasi;
hanya permintaan model terautentikasi yang menguji kelayakan Gemini.

### Alternatif tingkat host: IPv6 yang berfungsi dan kebijakan resolver

Pelapor [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) memulihkan
akses di lingkungannya dengan mengaktifkan IPv6 kontainer dan mengubah pemilihan alamat
glibc. Perlakukan ini sebagai alternatif khusus lingkungan. Pastikan IPv6 host berfungsi,
egress/perutean kontainer, dan aturan firewall sudah benar sebelum menyesuaikan preferensi resolver.
Alamat ULA privat saja tidak membuktikan konektivitas IPv6 publik.

Untuk layanan yang sudah terhubung ke jaringan default Compose, fragmen ini mengaktifkan
IPv6 pada jaringan tersebut; pertahankan konfigurasi layanan, port, volume, dan konfigurasi lainnya:

```yaml
networks:
  default:
    enable_ipv6: true
```

Untuk jaringan bernama, aktifkan fitur tersebut pada jaringan yang benar-benar digunakan layanan. Docker dapat
mengalokasikan subnet ULA; pilih subnet eksplisit yang tidak tumpang tindih hanya jika jaringan Anda
memerlukannya. Lihat [jaringan IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
dan [opsi jaringan Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Pada **image berbasis glibc**, `/etc/gai.conf` dapat mengubah pemilihan alamat. Dockerfile
repositori saat ini menggunakan Debian; image kustom berbasis musl tidak menggunakan mekanisme yang sama.
Penyesuaian yang dilaporkan mengubah label ULA dari `label fc00::/7 6` menjadi
`label fc00::/7 1`. Mulailah dari tabel kebijakan lengkap milik image dan pertahankan entri
lainnya: menambahkan entri `label` atau `precedence` akan menggantikan tabel default tersebut, sehingga file
yang hanya berisi baris yang diubah tidaklah memadai.
[Referensi konfigurasi glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
mendokumentasikan semantik tersebut. Bind-mount file yang telah ditinjau sebagai hanya-baca di `/etc/gai.conf`
dan buat ulang layanan untuk menerapkannya.

Ini mengubah pemilihan alamat OS untuk **semua lalu lintas keluar di kontainer tersebut**.
Ini tidak memaksa setiap aplikasi memilih IPv6: urutan DNS dan pemilihan koneksi
Node juga berpengaruh. Secara khusus, `--dns-result-order=ipv4first` memprioritaskan IPv4 dan
bukan solusi untuk kegagalan yang hanya terjadi pada IPv4. Lihat [pengurutan DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Uji kembali Gemini dan penyedia Anda lainnya setelah perubahan tingkat host apa pun. Untuk melakukan rollback,
hapus mount `gai.conf` kustom, pulihkan konfigurasi jaringan sebelumnya, dan
buat ulang layanan/jaringan yang terdampak dalam periode pemeliharaan. Membuat ulang jaringan
dapat mengganggu kontainer lain yang terhubung dengannya; jangan hapus volume data persisten.

## Catatan Penting

- **Mode WAL SQLite:** `docker stop` harus dibiarkan selesai agar OmniRoute dapat melakukan checkpoint terhadap perubahan terbaru kembali ke `storage.sqlite`. File Compose yang disertakan sudah menetapkan masa tenggang penghentian selama 40 detik. Jika Anda menjalankan image secara langsung, tetap gunakan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Atur ke `true` jika pencadangan rutin/sebelum penulisan dikelola secara eksternal. Migrasi basis data yang sudah ada tetap memerlukan snapshot keamanan tahan lama tersendiri dan pengaman migrasi massal.
- **Persistensi Data:** Selalu mount volume ke `/app/data` agar basis data, kunci, dan konfigurasi Anda tetap tersimpan setelah container dimulai ulang.
- **Konfigurasi Port:** Timpa variabel lingkungan `PORT` untuk mengubah port default `20128`.

## Lihat Juga

- [Panduan Deployment VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Penyiapan VM + nginx + Cloudflare
- [Panduan Deployment Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Deploy ke Fly.io
- [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Referensi lengkap `.env`
