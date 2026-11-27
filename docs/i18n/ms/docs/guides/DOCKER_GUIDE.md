# 🐳 Docker Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Rujukan lengkap penggunaan Docker. Untuk mula pantas, lihat [bahagian Docker README](../README.md#-docker).

## Kandungan

- [Jalankan Pantas](#quick-run)
- [Dengan Fail Persekitaran](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profil yang Tersedia](#available-profiles)
- [Mengkonfigurasi alat CLI hos apabila OmniRoute dijalankan dalam Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose Produksi](#production-compose)
- [Peringkat Dockerfile](#dockerfile-stages)
- [Pemboleh Ubah Persekitaran Kritikal](#critical-environment-variables)
- [Docker Compose dengan Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Terowong Pantas Cloudflare](#cloudflare-quick-tunnel)
- [Tag Imej](#image-tags)
- [Kemas kini papan pemuka dalam Docker](#dashboard-updates-in-docker)
- [Ketersediaan: SQLite lalai hanya menyokong satu replika](#availability-default-sqlite-is-single-replica)
- [Ralat serantau Gemini dalam Docker](#gemini-regional-errors-inside-docker)
- [Nota Penting](#important-notes)

---

## Lari Pantas

> **Hos sendiri dalam satu arahan?** Lihat [Panduan Hos Sendiri](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (imej diterbitkan + Redis, gelung balik sahaja, tiada pilihan profil). Larian Pantas di bawah ialah laluan satu bekas untuk pengguna yang sudah menjalankan Redis di tempat lain.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Dengan Fail Persekitaran

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# Profil asas (tanpa alat CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw terbina dalam)
docker compose --profile cli up -d

# Profil hos (mengutamakan Linux; melekapkan perduaan CLI hos sebagai baca sahaja)
docker compose --profile host up -d

# Profil web (Chromium/Playwright untuk penyedia sesi web)
docker compose --profile web up -d

# Gabungkan CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profil yang Tersedia

OmniRoute menyediakan profil Compose untuk bentuk penggunaan utama. Pilih profil yang sepadan dengan persekitaran anda.

| Profil         | Perkhidmatan     | Masa untuk digunakan                                                                                                                                                | Perintah                                     |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (lalai) | `omniroute-base` | Pelayan tanpa antara muka / masa jalan minimum, tanpa CLI penyedia yang disertakan                                                                                  | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | Aliran kerja berasaskan ejen yang memanggil `omniroute providers/setup/doctor` dan CLI disertakan (Codex, Claude Code, Droid, OpenClaw)                             | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | Hos Linux yang memerlukan akses seperti `network_mode` kepada CLI hos dengan melekapkan `~/.local/bin`, `~/.codex`, `~/.claude`, dan sebagainya sebagai baca sahaja | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | Jalankan sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pada port `8317` untuk pemproksian CLI huluan                                          | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | Penyedia sesi web yang memerlukan pelayar: `gemini-web`, `claude-web`, `claude-turnstile` (membina `runner-web`, termasuk Chromium)                                 | `docker compose --profile web up -d`         |

> Berbilang profil boleh digabungkan: `docker compose --profile cli --profile cliproxyapi up -d`.

## Mengkonfigurasi alat CLI hos apabila OmniRoute dijalankan dalam Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` dan butang
**Simpan konfigurasi** pada papan pemuka semuanya menulis fail seperti `~/.codex/*.config.toml`. Laluan tersebut
hanya bermakna pada mesin tempat CLI sebenarnya dijalankan. Jalankannya di dalam
bekas dan penulisan akan dilakukan dalam direktori utama bekas itu sendiri (`/home/node` —
imej dijalankan sebagai `USER node`), yang tidak akan pernah dibaca oleh CLI hos dan akan
dibuang sebaik sahaja bekas dicipta semula.

OmniRoute mengesan keadaan ini dan menolak penulisan dengan memberikan arahan, bukannya
melaporkan kejayaan yang tidak dapat anda gunakan: CLI keluar dengan kod `2`, dan API membalas `422`
dengan `containerEphemeralTarget: true`.

### Disyorkan: jalankan CLI pada hos, OmniRoute dalam Docker

Bekas menyediakan API; CLI mengkonfigurasi alat hos anda.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # halakan CLI kepada bekas
omniroute setup-codex                      # menulis ~/.codex sebenar pada hos anda
```

Ini ialah pilihan yang tepat apabila Codex, Claude Code, Cursor atau alat serupa dijalankan pada
komputer riba anda — yang merupakan persediaan biasa.

### Alternatif: lekap-ikat direktori konfigurasi hos (profil `host`)

Jika anda mahu bekas itu sendiri menulis konfigurasi hos anda, lekapkan
direktori tersebut dan halakan `CLI_CONFIG_HOME` kepada punca lekapan. Profil `host`
sudah melakukan perkara ini:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Lekapan ikat menjadikan laluan itu boleh dipercayai: OmniRoute membaca
`/proc/self/mountinfo` dan membenarkan penulisan ke laluan yang dilekapkan (serta ke direktori
yang anak direktorinya merupakan lekapan, tepat seperti struktur `/host-home` di atas), sambil
terus menolak laluan yang tidak dilekapkan.

### Jalan keluar: konfigurasikan CLI milik bekas itu sendiri (gunakan secara berhemat)

Apabila CLI benar-benar berada di dalam bekas (profil `cli`), penulisan tersebut
adalah disengajakan. Berikan `--allow-container-write` kepada mana-mana perintah `setup-*`, atau tetapkan
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` untuk pelayan. Penulisan akan diteruskan
dengan amaran bahawa ia tidak akan kekal selepas bekas tersebut tamat.

> **Amaran keselamatan — profil `cli` + lekapan `docker.sock`.**
> Profil `cli` melekap-ikat `/var/run/docker.sock` supaya pengemas kini automatik
> dalam bekas boleh mencipta semula tindanan melalui daemon hos
> (`src/lib/system/autoUpdate.ts` mengesan soket tersebut dan melangkau laluan
> Docker apabila soket itu tiada). Soket tersebut ialah **sempadan kepercayaan root hos**:
> apa-apa sahaja yang boleh mencapainya boleh mengawal daemon Docker hos sebagai
> root — ia boleh mencipta, memeriksa, menghentikan dan mengalih keluar mana-mana bekas pada hos.
> Implikasinya:
>
> 1. **Jangan sekali-kali dedahkan port profil `cli` kepada rangkaian.** Terbitkannya
>    pada `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` yang boleh dicapai melalui LAN menukar sebarang RCE pada peringkat papan pemuka
>    kepada pencerobohan penuh hos.
> 2. **Jangan ikat sebarang direktori hos tambahan ke dalam profil `cli`.**
>    Soket Docker bersama sebarang lekapan tambahan memberikan bekas akses baca/tulis penuh
>    kepada sistem fail dan konfigurasi hos anda. Jika anda memerlukan alat untuk
>    mengakses sesuatu projek, jalankannya secara setempat menggunakan perduaan CLI — jangan lekapkannya
>    ke dalam bekas `cli`.
>
> Jika anda tidak memerlukan kemas kini automatik dalam bekas, jangan aktifkan profil `cli`
> (`COMPOSE_PROFILES=core,redis` atau yang lebih ringkas). Profil lain tidak
> melekapkan soket Docker.
>
> Lihat `docs/security/MITM-TPROXY-DECRYPT.md` (git; tidak dikompilasikan ke dalam `/docs`) untuk model ancaman berkaitan
> MITM, dan `docs/security/SUPPLY_CHAIN.md` untuk
> rantaian asal-usul perduaan `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute bergantung pada Redis untuk menyokong pengehad kadar teragih dan cache dikongsi. Perkhidmatan `redis` **sentiasa ditakrifkan** dalam `docker-compose.yml` (ia tidak mempunyai sekatan profil) dan dimulakan bersama mana-mana profil lain.

| Butiran                  | Nilai                                        |
| ------------------------ | -------------------------------------------- |
| Imej                     | `redis:7-alpine`                             |
| Nama bekas               | `omniroute-redis`                            |
| Port dalaman             | `6379`                                       |
| Port hos (penggantian)   | `REDIS_PORT` (lalai kepada `6379`)           |
| Pengikatan hos (gantian) | `REDIS_BIND_HOST` (lalai kepada `127.0.0.1`) |
| Volum                    | `omniroute-redis-data` → `/data`             |
| Semakan kesihatan        | `redis-cli ping` (selang 10 saat)            |

Pemboleh ubah persekitaran berkaitan:

- `REDIS_URL` — rentetan sambungan yang disuntik ke dalam aplikasi (`redis://redis:6379` secara lalai).
- `REDIS_PORT` — pemetaan port pada sisi hos untuk bekas Redis.
- `REDIS_BIND_HOST` — antara muka hos tempat port diterbitkan. Lalai kepada `127.0.0.1`.

> **Mengapa gelung balik digunakan secara lalai:** sidecar berjalan tanpa `requirepass`, dan bekas
> aplikasi mencapainya melalui rangkaian compose (`redis:6379`) — port yang diterbitkan
> hanya disediakan untuk alat pada sisi hos (`redis-cli`, `npm run dev` setempat). Penerbitan pada
> `0.0.0.0` akan mendedahkan Redis tanpa pengesahan kepada setiap hos dalam LAN anda. Jika anda menetapkan
> `REDIS_BIND_HOST=0.0.0.0`, tambahkan juga `--requirepass` pada `command:` perkhidmatan.

**Melumpuhkan Redis** tidak disyorkan (pengehad kadar akan beralih kepada sandaran dalam memori yang kurang berkesan). Jika perlu, sama ada alih keluar/ulas blok perkhidmatan `redis:` dalam `docker-compose.yml` atau skalakannya kepada sifar:

```bash
docker compose up -d --scale redis=0
```

## Compose Produksi

Untuk petikan produksi terpencil yang berjalan bersama persekitaran pembangunan, gunakan `docker-compose.prod.yml`.

| Butiran                 | Nilai                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| Fail                    | `docker-compose.prod.yml`                                                                      |
| Port papan pemuka lalai | `PROD_DASHBOARD_PORT=20130` (dipetakan kepada `${DASHBOARD_PORT:-20128}` dalaman)              |
| Port API lalai          | `PROD_API_PORT=20131`                                                                          |
| Imej                    | `omniroute:prod` (dibina daripada sasaran `runner-cli`)                                        |
| Bekas Redis             | `omniroute-redis-prod` (`redis:8.6.2`, volum `redis-prod-data` khusus)                         |
| Volum data              | `omniroute-prod-data` (bernama, dikekalkan merentas binaan semula)                             |
| Semakan kesihatan       | `node healthcheck.mjs` + `redis-cli ping`, dengan `depends_on` bergantung pada kesihatan Redis |

Cara penggunaan:

```bash
# Bina & mulakan tindanan produksi
docker compose -f docker-compose.prod.yml up -d --build

# Strim log
docker compose -f docker-compose.prod.yml logs -f

# Hentikan tindanan (kekalkan volum)
docker compose -f docker-compose.prod.yml down
```

Tindanan produksi berjalan selari dengan compose pembangunan (nama bekas, port dan volum yang berbeza), jadi anda boleh terus membuat perubahan secara setempat sementara produksi kekal berjalan.

## Peringkat Dockerfile

Repositori menghantar fail Docker berbilang peringkat (`Dockerfile`). Empat peringkat terdedah; pilih `target` yang sesuai untuk kes penggunaan anda.

| pentas        | Imej asas             | Tujuan                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Memasang deps (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (Turbopack secara lalai — lihat sumber masa binaan di bawah)                                                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Masa jalan pengeluaran dengan keluaran kendiri Next.js.** Tiada pembekal CLIs dihimpunkan.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Menambah `git`, `docker.io`, `docker-compose` dan CLIs global : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Pilih ini untuk aliran kerja ejen.**                                                                                                                          |
| `runner-web`  | `runner-base`         | Menambahkan Playwright + penyemak imbas Chromium (`--with-deps`) untuk penyedia sesi web: `gemini-web`, `claude-web`, `claude-turnstile`.** Pilih ini apabila anda menggunakan penyedia tersebut** — imej biasa gagal pada masa permintaan tanpanya (lihat nota `-web` di bawah Saluran Keluaran). |

Bina sasaran tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Sumber masa binaan

Tiga binaan arg mengawal kos peringkat `builder`. Mereka adalah masa bina sahaja — `OMNIROUTE_MEMORY_MB` (di bawah) ialah tombol masa jalan yang berasingan.

| Membina arg                 | Lalai  | Kesan                                                                                               |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` membina dengan webpack: memori puncak rendah, lebih perlahan. `1` mengikut serta Turbopack.     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Siling timbunan V8 (`--max-old-space-size`) untuk `next build` yang bertelur .                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Suapan `CIRCLE_NODE_TOTAL`; Seterusnya memperoleh `workers = N - 1` untuk pengumpulan data halaman. |

`OMNIROUTE_BUILD_WORKERS` adalah orang yang menaikkan pembina yang besar dan orang yang mengesyaki apabila binaan yang dikekang mati** selepas** `✓ Compiled successfully`. Setiap pekerja data halaman adalah prosesnya sendiri, begitu juga dengan `next build` induk itu sendiri; pengeluaran semula VPS langsung (isu #7518) mengukur RSS puncak setiap proses pada ~ 4.5 GB bebas daripada bendera timbunan `NODE_OPTIONS` (Turbopack menyusun dalam memori native/Rust di luar timbunan V8). Lalai `2` (→ 1 pekerja, 2 proses jumlah) adalah bersaiz untuk 16 GB / 4 vCPU pelari dihoskan GitHub yang digunakan saluran paip penerbitan. Pada `8` (→ 7 pekerja) pelari itu kehabisan ingatan dan buildkit gagal langkah dengan `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 pekerja) masih tidak sesuai apabila RSS setiap proses diukur secara langsung dan bukannya disimpulkan. `tests/unit/docker-build-memory-budget.test.ts` melakukan aritmetik terhadap angka yang diukur dan gagal jika salah satu tombol melebihi pelari.

Turbopack menyusun dalam ingatan Rust asli yang hidup** luar** timbunan V8, jadi `OMNIROUTE_BUILD_MEMORY_MB` tidak mengikatnya. Pada hos dengan siling memori binaan kemudiannya SIGKILLed oleh pembunuh OOM tanpa teks ralat sama sekali — ia hanya berhenti pada pertengahan `Creating an optimized production build`, yang berbunyi seperti hang dan bukannya ingatan hilang. Itulah sebabnya `Dockerfile` lalai kepada webpack (`OMNIROUTE_USE_TURBOPACK=0`), tidak seperti `npm run dev` / `npm run build`, di mana Turbopack ialah kod lalai: `docker build .` kosong tanpa args binaan (apa yang dijalankan oleh Railway dan hos satu klik lain) tidak boleh mati secara senyap pada pembina yang dihadkan memori. Imej yang diterbitkan sudah melepasi `OMNIROUTE_USE_TURBOPACK=0` secara eksplisit dalam `docker-publish.yml`. Pada pembina dengan banyak RAM, ikut serta dalam Turbopack untuk binaan yang lebih pantas:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` didayakan, jadi `next build` menjalankan induk** dan** proses pekerja dan setiap satu menghormati `OMNIROUTE_BUILD_MEMORY_MB` secara berasingan. Saiz siling bekas di atas kira-kira dua kali ganda nilai itu, bukan sekali.

Diukur pada pokok ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pengikat  | Siling bekas   | Hasilnya                                     |
| --------- | -------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM-dibunuh pada kedua-duanya, secara senyap |
| webpack   | 8 GiB          | bina pekerja SIGKILLed                       |
| webpack   | 12 GiB         | berjaya, memuncak pada 11.1 GiB              |

### Lalai masa jalan

Lalai dieksport oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tingkah laku ingatan dalam Docker:

- Imej menetapkan `OMNIROUTE_MEMORY_MB=1024` dan memperoleh `NODE_OPTIONS=--max-old-space-size=1024` daripadanya.
- Proses pelayan sebenar dimulakan oleh pelancar kendiri, yang berbunyi `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Nod menggunakan nilai `--max-old-space-size` berulang terakhir, jadi tetapan `OMNIROUTE_MEMORY_MB` mengawal had timbunan Docker berkesan.
- Oleh kerana imej sentiasa menetapkannya, sandaran tertentukur RAM pelancar itu sendiri tidak pernah digunakan di bawah Docker. Naikkannya secara eksplisit untuk beban kerja (jadual di bawah). `2048` masih terlalu kecil untuk coding-agent `/v1/responses`.

### Runtime RAM untuk ejen pengekodan

1 GiB Docker lalai ialah lantai dashboard/light-chat, bukan saiz pengeluaran. Badan `POST /v1/responses` yang panjang (beratus-ratus mesej, berpuluh-puluh alatan) mengekalkan berbilang graf dalam ingatan semasa pemampatan. Dua permintaan token ~ 3 MiB / ~ 750k yang bertindih telah membatalkan V8 pada** 12 GiB** ruang lama (`FATAL ERROR: Reached heap limit`) dan juga mencecah 16 GiB cgroup OOM. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Saiz** cgroup `--memory` di atas timbunan** penimbal asli —, SQLite dan perantaraan mampatan terletak di luar V8.

| Beban kerja                              | `OMNIROUTE_MEMORY_MB`   | Bekas / cgroup      | Nota                                                                                                            |
| ---------------------------------------- | ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Papan pemuka, satu sembang ringan        | `1024` (imej lalai)     | ≥2 GiB              |                                                                                                                 |
| Satu ejen pengekodan (Claude/Codex/Grok) | `8192`                  | ≥10 GiB             | `/v1/responses` sesi tunggal biasa                                                                              |
| Dua `/v1/responses` panjang serentak     | `10240`–`12288`         | ≥12–16 GiB          | V8 yang diukur digugurkan pada timbunan ~ 12 GiB                                                                |
| Tiga + konteks panjang serentak          | jangan pada satu proses | bersiri / lebih RAM | Kemasukan kelas berat lalai ialah 1 dalam penerbangan; menaikkannya tanpa RAM memperkenalkan semula pengguguran |

`omniroute serve` pada logam kosong menentukur ~ 35% daripada RAM ( `[512, 4096]` diapit ) apabila `OMNIROUTE_MEMORY_MB` ialah** tidak ditetapkan** . Docker sentiasa menetapkan `1024`, supaya penentukuran tidak pernah berjalan dalam imej rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Pemboleh Ubah Persekitaran Kritikal

Selain nilai lalai yang didokumentasikan dalam [ENVIRONMENT.md](../reference/ENVIRONMENT.md), pemboleh ubah berikut paling penting apabila dijalankan menggunakan Docker:

| Pemboleh ubah                 | Tujuan                                                                                                                                                                                                                                                                     | Lalai                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rahsia dikongsi untuk jambatan WebSocket. **Diperlukan dalam persekitaran pengeluaran** — tetapkan kepada rentetan rawak yang kukuh.                                                                                                                                       | tidak ditetapkan (mesti diberikan) |
| `REDIS_URL`                   | Rentetan sambungan untuk pengehad kadar / bahagian belakang cache                                                                                                                                                                                                          | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port pada hos untuk bekas Redis terbina dalam                                                                                                                                                                                                                              | `6379`                             |
| `REDIS_BIND_HOST`             | Antara muka hos tempat port Redis terbina dalam diterbitkan (gelung balik melainkan anda menambahkan AUTH)                                                                                                                                                                 | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Laluan hos yang dilekapkan ke dalam profil `cli` pada `/workspace/omniroute` untuk aliran kerja kemas kini kendiri                                                                                                                                                         | `.` (direktori semasa)             |
| `OMNIROUTE_MEMORY_MB`         | Had heap Node masa jalan untuk pelayan kendiri Docker; mengatasi nilai lalai imej di atas. Ejen pengekodan: `8192`+ (lihat [RAM masa jalan](#runtime-ram-for-coding-agents)).                                                                                              | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Mengatasi port yang didedahkan untuk papan pemuka (20128) dan API (20129)                                                                                                                                                                                                  | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Antara muka hos tempat docker-compose menerbitkan port papan pemuka/API/WS langsung. Dengan `REQUIRE_API_KEY=false` (nilai lalai), `0.0.0.0` mendedahkan proksi `/v1` tanpa nama kepada LAN — hanya luaskan dengan `REQUIRE_API_KEY=true` atau proksi songsang di hadapan. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Antara muka hos tempat docker-compose menerbitkan sidecar `cliproxyapi` — volum datanya menyimpan kelayakan penyedia.                                                                                                                                                      | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori yang dibaca dan digunakan oleh pengimbas pemalam masa jalan untuk pemasangan. Tetapkannya apabila pemalam dilekapkan melalui bind mount: nilai lalai mengikut `HOME`, yang tidak semestinya dieksport oleh imej.                                                 | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | Sub laluan URL apabila aplikasi diterbitkan di belakang proksi songsang (cth. `/omniroute`)                                                                                                                                                                                | _(kosong = akar)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origin pelayar awam termasuk sub laluan (cth. `https://host/omniroute`)                                                                                                                                                                                                    | tidak ditetapkan                   |
| `PROD_DASHBOARD_PORT`         | Port papan pemuka pada hos untuk `docker-compose.prod.yml`                                                                                                                                                                                                                 | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port pada hos untuk sidecar `cliproxyapi`                                                                                                                                                                                                                                  | `8317`                             |

## Proksi Songsang pada Subpath (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Karang binaan (disyorkan)

Tetapkan kedua-dua pembolehubah dalam `.env`, kemudian bina semula supaya imej dan masa jalan bersetuju:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` memajukan `OMNIROUTE_BASE_PATH` sebagai Docker build-arg dan sebagai pembolehubah persekitaran masa jalan.

### Imej akar pra-binaan + sublaluan masa jalan

Imej `cheaperinference/omniroute:*` yang diterbitkan dibina untuk akar domain. Anda masih boleh menetapkan `OMNIROUTE_BASE_PATH` pada masa jalan; bekas itu menampal berkas sekali pada permulaan. Gandingkannya dengan asal umum yang sepadan:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan proksi terbalik untuk memajukan** penuh** laluan luaran (jangan tanggalkan awalan). Traefik harus menghalakan `PathPrefix(`/omniroute `)` ke bekas tanpa `StripPrefix`, jadi Next.js menerima `/omniroute/...` dan menyediakan aset daripada `/omniroute/_next/...`.

Pemeriksaan kesihatan Docker menyelidik titik akhir kitaran hayat `/healthz` ringan yang diawali dengan `OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` kekal tersedia untuk diagnostik human/dashboard ; untuk menghalakan bekas HEALTHCHECK ke arahnya (contohnya untuk penguatkuasaan kesihatan yang mendalam), tetapkan `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Jalan itu ialah a** dalam** semak ( ringkasan pemantauan DB + ) — sesuai untuk Docker jarang `HEALTHCHECK` jika anda ikut serta semula, tetapi** bukan** untuk selang `livenessProbe` Kubernetes.

Untuk orkestra (Kubernetes, Nomad, dll.):

| Siasatan            | lebih suka                                                           | elakkan                                                               |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Kemeriahan          | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, `20128` lalai ) | `/api/monitoring/health` sebagai hidup                                |
| Kesediaan           | HTTP `GET /healthz`                                                  | Tamat masa yang ketat yang menganggap gelung acara sibuk sebagai mati |
| Dalam / kotak hitam | `/api/monitoring/health`                                             | —                                                                     |

`/healthz` melaporkan kitaran hayat proses (`ok` / `starting` / `stopping`). `/livez` adalah proses-hidup sahaja (200 bila-bila masa pengendali boleh berjalan; ia tidak menunggu untuk kesediaan). Kedua-duanya masih berjalan pada gelung peristiwa Node yang sama seperti pengendalian permintaan, jadi katalog terikat CPU atau kerja mampatan boleh melambatkan mereka — sibuk ≠ mati. Lebih suka TCP liveness jika HTTP kuar masa tamat. Panduan siasatan penuh: [Panduan pemantauan — cadangan siasatan Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Karang dengan Caddy (HTTPS Auto-TLS)

OmniRoute boleh didedahkan dengan selamat menggunakan peruntukan SSL automatik Caddy. Pastikan rekod DNS A domain anda menghala ke IP pelayan anda.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
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

Caddy menetapkan pengepala pemajuan standard untuk bekas huluan. OmniRoute menggunakan `NEXT_PUBLIC_BASE_URL` sebagai asal awam berkanun untuk panggilan balik OAuth dan pautan awam yang dijana; penulisan papan pemuka yang disahkan menggunakan permintaan asal yang sama serta perlindungan CSRF terikat sesi. Hanya dayakan `OMNIROUTE_TRUST_PROXY` untuk penempatan lanjutan di mana anda sengaja mahu OmniRoute memperoleh asal umum daripada pengepala yang dimajukan dipercayai dan bukannya konfigurasi eksplisit.

## Terowong Pantas Cloudflare

Sokongan papan pemuka untuk penggunaan Docker merangkumi **Terowong Pantas Cloudflare** satu klik pada `Dashboard → Endpoints`. Pengaktifan pertama memuat turun `cloudflared` hanya apabila diperlukan, memulakan terowong sementara ke titik akhir `/v1` semasa anda dan memaparkan URL `https://*.trycloudflare.com/v1` yang dijana terus di bawah URL awam biasa anda.

Panel terowong titik akhir (Cloudflare, Tailscale, ngrok) boleh dipaparkan atau disembunyikan daripada `Settings → Appearance` tanpa mengubah keadaan terowong aktif.

### Nota Terowong

- URL Terowong Pantas bersifat sementara dan berubah selepas setiap mula semula.
- Terowong Pantas tidak dipulihkan secara automatik selepas OmniRoute atau bekas dimulakan semula. Dayakannya semula daripada papan pemuka apabila diperlukan.
- Pemasangan terurus pada masa ini menyokong Linux, macOS dan Windows pada `x64` / `arm64`.
- Terowong Pantas terurus menggunakan pengangkutan HTTP/2 secara lalai untuk mengelakkan amaran bising tentang penimbal UDP QUIC dalam persekitaran bekas yang terkekang. Tetapkan `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika anda mahukan pengangkutan yang berbeza.
- Imej Docker menyertakan punca CA sistem dan menyerahkannya kepada `cloudflared` terurus, yang mengelakkan kegagalan kepercayaan TLS apabila terowong dibut di dalam bekas.
- Tetapkan `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jika anda mahu OmniRoute menggunakan binari sedia ada dan bukannya memuat turun binari baharu.

## Tag Imej

| Imej                         | Tag      | Saiz    | Penerangan                                                 |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Tertinggi** diterbitkan** SemVer stabil (bukan git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Sematkan kelas teg ini untuk GitOps                        |

Imej yang sama diterbitkan ke tiga repositori, dengan ringkasan setiap seni bina yang sama: `cheaperinference/omniroute` (Docker Hub, organisasi Inferens Lebih Murah, dari 3.8.53 pada), `ghcr.io/cheaper-inference/omniroute` dan `diegosouzapw/omniroute` warisan , yang mengekalkan sejarah tarikannya dan masih menerima setiap keluaran. Arahan `diegosouzapw/omniroute` sedia ada terus dikemas kini; menukar nama imej adalah pilihan. Saluran prakeluaran `:next` / `:next-web` di bawah diterbitkan kepada `diegosouzapw/omniroute` dan GHCR sahaja.

Manifes berbilang platform: `linux/amd64` + `linux/arm64` asli (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih seni bina yang sepadan secara automatik; lulus `--platform linux/amd64` jika anda perlu memaksa emulasi AMD64 pada hos ARM.

### Keluarkan Saluran

OmniRoute menerbitkan saluran Docker yang berasingan untuk keluaran stabil, ujian cawangan keluaran aktif dan binaan pembangunan.

| Saluran                         | Sumber                                  | Kebolehubahan                    | Penggunaan yang disyorkan                                                                                                              |
| ------------------------------- | --------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned lepaskan               | tidak boleh ubah                 | Penggunaan pengeluaran yang menyematkan keluaran tepat                                                                                 |
| `:latest` / `:latest-web`       | Tertinggi** diterbitkan** stabil SemVer | Penunjuk stabil boleh ubah       | Mengikut keluaran stabil** selepas** a SemVer publish job — does** bukan** jejak `main` atau `release/v*` yang belum dikeluarkan komit |
| `:next` / `:next-web`           | Cawangan `release/v*` lalai semasa      | Penunjuk pra-keluaran boleh ubah | Ujian pembetulan yang telah mendarat pada cawangan keluaran aktif tetapi belum lagi dalam keluaran stabil                              |
| `:main` / `:main-web`           | cawangan `main`                         | Penunjuk pembangunan boleh ubah  | Ujian pembangunan dan integrasi sahaja                                                                                                 |

#### Penyedia sesi web: imej `-web`

Setiap saluran di atas berfungsi sebagai teg `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), dibina daripada peringkat `runner-web` — imej yang sama ditambah Playwright dan penyemak imbas Chromium. Gambar biasa dihantar** tanpa** Chromium; `gemini-web`, `claude-web` dan `claude-turnstile` memerlukannya.

Kegagalan ditangguhkan, bukan masa permulaan: penyedia tersebut menyenaraikan model mereka dan menunjukkan sebagai disambungkan dalam papan pemuka, dan hanya permintaan pertama gagal dengan

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jika anda menggunakan penyedia tersebut, tarik tag `-web` pada saluran yang anda sudah pun menggunakan — tiada apa-apa lagi yang berubah. Pada pemasangan npm/CLI (tiada imej Docker ), bahagian yang setara yang hilang ialah binari penyemak imbas: jalankan `npx playwright install chromium` pada hos.

#### Menggunakan saluran prakeluaran

Saluran `next` dibina semula pada setiap tolak ke cawangan `release/v*` lalai semasa dan diterbitkan untuk AMD64 dan ARM64. Cawangan penyelenggaraan lama tidak boleh menimpanya. Saluran menyediakan imej boleh tarik untuk pembetulan yang telah digabungkan ke dalam cawangan keluaran aktif sebelum teg stabil seterusnya dipotong.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, ganti teg imej yang digunakan oleh profil yang dipilih, kemudian tarik dan buat semula perkhidmatan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keselamatan dan rollback

`next` ialah saluran pra-keluaran terapung. Ia boleh berubah pada sebarang tolakan kepada cawangan keluaran aktif dan adalah** tidak disokong untuk kegunaan pengeluaran** . Sematkan ringkasan imej semasa menilai binaan tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum ujian, sandarkan volum data OmniRoute atau direktori data yang dilekapkan. Untuk melancarkan semula, pulihkan versi stabil yang digunakan sebelum ini atau cerna dan buat semula bekas:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Binaan cawangan keluaran tidak boleh menggerakkan `latest`; hanya versi semantik stabil yang layak boleh mempromosikan penunjuk stabil. Imej `next` mengekalkan pemeriksaan imej keluaran dan menyekat pintu kerentanan KRITIKAL.

**`latest` bukan jaminan mata wang untuk git.** Pembetulan gabungan pada `main` atau pada cawangan `release/v*` aktif ialah** bukan** dalam `:latest` sehingga imej SemVer yang stabil diterbitkan dan kerja terbitkan mempromosikan `:latest` (cernaan yang sama seperti SemVer itu). Jika `latest` kelihatan beku manakala GitHub sudah menunjukkan pembetulan, tarik `:next` untuk menguji cawangan pelepas atau tunggu teg SemVer.

| awak nak                                                                      | guna                                    |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / pengeluaran yang tidak boleh hanyut                                  | Sematkan `:X.Y.Z` (atau ringkasan imej) |
| Ikuti kandang yang diterbitkan dan terima ciptaan semula pada setiap keluaran | `:latest`                               |
| Uji `release/v*` yang belum dikeluarkan                                       | `:next` (bukan pengeluaran)             |
| Uji `main`                                                                    | `:main` (bukan pengeluaran)             |

## Kemas kini papan pemuka dalam Docker

Bekas daripada imej yang diterbitkan tidak boleh menggantikan dirinya sendiri. Apabila OmniRoute mengesan bahawa ia berjalan di dalam
bekas (tiada checkout `.git`, bukan pemasangan npm), sepanduk kemas kini pada papan pemuka utama memaparkan
perintah hos yang perlu dijalankan dan bukannya arahan npm/git, berserta butang salin:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Nama perkhidmatan diperoleh daripada `AUTO_UPDATE_SERVICE` (lalai `omniroute`, iaitu perkhidmatan dalam
`docker-compose.selfhost.yml`). `pull` hanya mengalihkan tag terapung (`latest`, `next`); dengan tag
`:X.Y.Z` yang ditetapkan, edit tag tersebut terlebih dahulu.

### Kemas kini satu klik dengan fail pencetus hos

Untuk memastikan **Kemas Kini Sekarang** terus berfungsi tanpa melekapkan `/var/run/docker.sock` (yang memberikan bekas
akses root pada hos — lihat amaran profil `cli` di atas), tetapkan `DOCKER_UPDATE_TRIGGER_FILE` pada
perkhidmatan OmniRoute dan jalankan pemantau pada hos:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Laluan tersebut mestilah berada dalam `DATA_DIR` (nilai relatif diselesaikan berdasarkan direktori itu); apa-apa yang lain akan
ditolak. **Kemas Kini Sekarang** kemudiannya menulis `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` ke dalam fail
tersebut, membalas dengan `202`, dan papan pemuka meninjau `/api/system/version` sehingga versi baharu tersedia
lalu memuat semula. OmniRoute tidak pernah menjalankan shell atau perintah Docker dalam mod ini. Seperti setiap tindakan
kemas kini, permintaan hanya diterima daripada klien gelung balik/LAN.

Direktori data yang dilekapkan secara ikatan memberikan laluan stabil pada hos untuk dipantau. Contoh unit `systemd`
(laraskan `/srv/omniroute` kepada direktori yang mengandungi fail compose anda dan `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Pantau permintaan kemas kini papan pemuka OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Tarik dan cipta semula bekas OmniRoute

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

Perkhidmatan tersebut mengalih keluar permintaan sebelum menarik imej supaya pelaksanaan yang gagal tidak berulang tanpa henti. Tanpa
`DOCKER_UPDATE_TRIGGER_FILE`, papan pemuka mengekalkan aliran perintah manual.

## Ketersediaan: SQLite lalai ialah replika tunggal

Stok Docker / Kubernetes OmniRoute adalah** satu proses Nod + satu penulis SQLite** . Ketersediaan yang tinggi adalah** tidak disokong** pada topologi itu.

| Kekangan                                        | Akibat                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Penulis tunggal                                 | buat** bukan** jalankan berbilang replika terhadap fail SQLite yang sama. Itu merosakkan DB.                                                                                                                                                                                                                                                                 |
| Buat semula / mulakan semula / HEALTHCHECK kill | **Gangguan sepenuhnya** SSE dalam penerbangan, sesi papan pemuka dan keadaan dalam ingatan. Setiap pelanggan yang disambungkan jatuh. Permintaan baharu semasa tetingkap titik akhir kosong mendapat proksi terbalik**`502 Bad Gateway: Unknown error`** , bukan OmniRoute JSON — pelanggan tidak dapat membezakan ini daripada kegagalan pembekal (#11015). |
| Gelung peristiwa yang sama seperti `/healthz`   | Katalog yang sibuk atau tanda mampatan boleh melambatkan probe; tamat masa yang singkat kemudian memulakan semula** sahaja** replika.                                                                                                                                                                                                                        |

**Matriks siasatan** (lihat juga [cadangan siasatan Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Siasatan        | Sasaran                                                        | Jangan gunakan                                                        |
| --------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| Kemeriahan      | TCP pada `PORT` ( `20128` lalai ), atau HTTP `/healthz` lembut | `/api/monitoring/health`                                              |
| Kesediaan       | HTTP `GET /healthz`                                            | Tamat masa yang ketat yang menganggap gelung acara sibuk sebagai mati |
| Dalam / manusia | `/api/monitoring/health`                                       | Keaktifan kubelet automatik                                           |

**Peningkatan:** menjangkakan setiap sesi akan turun. Toskan pelanggan jika anda boleh; tiada kemas kini bergulir pada SQLite lalai. Karang `restart: unless-stopped` tambah Docker `HEALTHCHECK` juga akan menggantikan satu-satunya proses apabila bekas itu Tidak Sihat — jejari letupan yang sama.

Manifes sedia dibuat dan carta Helm secara langsung dalam `deploy/kubernetes/` dan `deploy/helm/omniroute/` — lihat [panduan penggunaan Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Coretan Kubernetes untuk a** replika tunggal** (Buat semula diperlukan; jangan naikkan `replicas` pada satu fail SQLite ):

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

`preStop` sleep membolehkan kube menggugurkan titik akhir Perkhidmatan sebelum SIGTERM jadi** baru** lalu lintas berhenti melanda proses mati. `/v1/responses` SSE dalam penerbangan disalirkan sehingga `SHUTDOWN_TIMEOUT_MS` (lalai 30s) melalui pajakan kemasukan kelas berat (#11015). Permintaan baharu yang masih mencapai proses dapatkan `503` + `Retry-After: 5`. Cipta semula jurang titik akhir kosong sehingga penggantian Sedia kekal sebagai gangguan yang teruk — iaitu topologi SQLite, bukan misconfig probe.

Postgres luaran / HA berbilang penulis ialah** bukan** laluan stok yang didokumenkan. Jika anda memerlukan HA, simpan satu replika atau jalankan topologi yang telah diuji dan didokumenkan oleh projek secara berasingan. Kerja Postgres/MySQL tinggal di [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sehingga kapal itu, satu-satunya cara yang disokong untuk membiak** besar** kapasiti `/v1/responses` ialah N proses bebas (bahagian seterusnya), bukan `replicas > 1` pada satu volum.

## Skala keluar: N proses bebas

### pemilikan giliran token Codex

Salinan satu akaun Codex tidak boleh menggunakan token muat semula sekali gunanya secara bebas. Pada keadaan yang hanya menggunakan bukti kelayakan yang disegerakkan, tetapkan `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Biarkan ia tidak ditetapkan pada pemilik putaran tunggal. Setiap proses masih memerlukan `DATA_DIR` sendiri; pilihan ini tidak berkongsi SQLite mahupun membekalkan penyegerakan token atau kunci yang diedarkan.

Contoh pasif membaca semula sambungan apabila muat semula diperlukan dan hanya menggunakan token akses yang berbeza dan belum tamat tempoh. Jika tidak, muat semula dinyahdayakan tanpa tamat tempoh atau menyahaktifkan sambungan atau mengira kegagalan pemutus semula. Kegagalan pengesahan huluan sebenar masih menggunakan perakaunan kegagalan biasa, penyejukan eksponen dan ralat pelanggan biasa; penyahaktifan akaun kekal kekal. Segerakkan token yang diputar oleh pemilik sebelum token akses tamat tempoh (panduan muat semula proaktif lalai ialah lima minit), atau import semula fail Codex auth. Import pasif menyimpan token yang dibekalkan tanpa mengesahkannya di titik akhir token. Muat semula dashboard/API manual mengembalikan `409 refresh_disabled`; log masuk OAuth baharu tidak berubah. Lihat [rujukan persekitaran](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Satu proses Nod ialah** satu timbunan V8** . Dua pertindihan ~ 3 MiB / ~ 750k-token pengekodan-ejen `POST /v1/responses` (RTK + Caveman) membatalkan timbunan itu pada ~ 12 Gi (`FATAL ERROR: Reached heap limit`) dan boleh OOM a 16 Gi cgroup. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran itu ialah a** bajet ingatan** amaran, bukan produk maksimum keras dua `/v1/responses` panjang serentak . Kemasukan sembang heavyweight dikawal oleh belanjawan bait sedutan terbitan automatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) bersaiz daripada siling V8/cgroup yang sama — mengatasinya ke atas (atau menetapkan had kiraan permintaan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` lama) pada proses yang sudah bersaiz memperkenalkan semula pengguguran. Sembang kecil, `/healthz`, `/v1/models` dan MCP adalah** bukan** dalam topi itu.

### Satu proses: lebih daripada dua `/v1/responses` panjang

A** sihat** proses (timbunan di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, lalai `0.75`)** boleh** jalankan lebih daripada dua `POST /v1/responses` panjang serentak apabila belanjawan bait dalam penerbangan seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) masih mempunyai ruang. Badan pada `OMNIROUTE_CHAT_LARGE_BODY_BYTES` atau lebih tinggi (lalai 256 KiB) mengambil pajakan wajaran berat yang sama seperti permintaan berat struktur dan menggunakan [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape yang sama (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Berpuluh-puluh pelanggan SSE panjang serentak (pengendali selalunya memerlukan 40–50) ialah a** bajet ingatan** soalan timbunan saiz — + primary/headroom slot + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukan had produk "maks 2" yang keras. Timbunan bertekanan masih hilang dengan `503` yang boleh dicuba semula jadi #7849 tidak kembali.

Kepada** membiak timbunan** (ruang lama V8 bebas)** hari ini** :

| buat                                                                                                                                                              | jangan                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Lari** N containers/pods** , masing-masing dengannya** sendiri** `DATA_DIR` / isipadu                                                                             | Tetapkan `replicas > 1` terhadap satu fail SQLite                  |
| Saiz berat dalam penerbangan + healthy-headroom daripada belanjawan timbunan / dalam penerbangan-bait; 1–2 ialah lalai #7849 konservatif, bukan maks produk keras | Berikan satu proses 8 × RAM dan had kiraan tidak terhad            |
| Pilihan: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk** kaunter kuota kongsi**                                                                      | Layan Redis sebagai SQLite — yang dikongsi bukan                   |
| Rahsia pembekal pendua ke dalam setiap contoh (atau terima papan pemuka yang dipisahkan)                                                                          | Jangkakan satu papan pemuka / satu log panggilan merentas kejadian |
| Depan dengan mana-mana pengimbang beban; sticky by API key or session dah memadai                                                                                 | Memerlukan perisian pertengahan sedar saiz khusus vendor           |

Perkaitan sesi ke akaun juga boleh dikongsi melalui Redis: tetapkan `OMNIROUTE_SESSION_AFFINITY_STORE=redis` dan `REDIS_URL` pada setiap proses, dengan `REDIS_KEY_PREFIX` yang sama dan tetapan `sessionAffinityTtlMs` positif. Pin menyelesaikan identiti akaun penggunaan yang dicincang pada sambungan setempat yang layak bagi setiap proses, jadi akaun OAuth dengan metadata identiti yang sepadan tidak perlu mempunyai sambungan yang sepadan IDs. Identiti akaun yang diketahui lebih diutamakan daripada IDs tempatan yang bercanggah dalam resolusi pin dan pengusiran terkawal; rekod tanpa identiti (atau pemanggil pengusiran tanpa identiti) mengekalkan pengawal ID legasi. Akaun tanpa identiti penggunaan yang stabil masih memerlukan padanan IDs. ralat Redis atau panggilan melebihi 100 ms kembali ke SQLite setempat. Setiap kedai perkaitan Redis mengehadkan operasi tertunggak pada 8, memintas Redis serta-merta apabila penuh dan melepaskan slot hanya apabila kerja asas selesai, bukan pada tarikh akhir pemanggil. Semasa pemadaman Redis tidak ada kebenaran yang dikongsi: setiap kejadian kembali kepada perkaitan setempatnya sendiri, sesi boleh disemat semula sekali setiap kejadian dan kejadian mungkin berbeza. Kelekatan menumpu semula melalui Redis apabila ia pulih. Tamat masa menunggu, bukan EVAL yang dihantar, yang mungkin mendarat selepas sandaran. Penulisan penghalaan membandingkan nilai tepat yang diperhatikan oleh keputusan penghalaan, bukan bacaan masa mutasi baru; kehilangan yang diperhatikan atau pemerhatian sandaran SQLite dibandingkan dengan kunci Redis yang tidak hadir. Pin usang digantikan dalam satu CAS, jadi arahan lewat tidak boleh menggantikan atau memadamkan pin yang lebih baharu dan berbeza. Redis membaca secara atom mengembalikan nilai dan pelayan yang tinggal TTL; PTTL positif (atau tiada tamat tempoh) menentukan keaktifan, bukan cap waktu JSON penulis atau jam pembaca. Gambar tempatan memetakan baki TTL itu kepada tarikh akhir setempat; kekunci JSON sedia ada kekal boleh dibaca dan bait mentahnya dikekalkan untuk CAS. Redis adalah satu-satunya sumber kebenaran semasa ia menjawab. Upserts dikongsi, sentuhan dan pemadaman yang disahkan mengalih keluar masukan setempat, jangan sekali-kali memasang atau memuat semulanya. SQLite pada laluan Redis hanya memegang keputusan sandaran contoh ini sendiri daripada ralat Redis, tamat masa atau ketepuan kemasukan, bersempadan TTL seperti sebelumnya. Pin tempatan yang hilang pada pemadaman kemudian memerlukan satu pilihan baharu (satu kehilangan cache segera), bukan akaun yang salah atau diusir. Penafian yang ditolak mengembalikan pemenang yang dikongsi dan baki TTL secara atom: pemilihan biasa menyemak semula tarikh akhir setempat yang dipetakan dan menggunakan pemenang layak yang masih hidup, menyentuh penggunaan dan mengelog untuk akaun itu tanpa penulisan kongsi lain. Jika ia tidak tersedia, pemilihan mengekalkan calon tempatan, membiarkan pin kongsi tidak berubah dan mengeluarkan satu mesej nyahpepijat. CAS yang ditolak tidak menulis SQLite; ralat Redis, tamat masa atau ketepuan kemasukan menggunakan operasi tempatan sedia ada. Jika balasan mutasi yang dihantar tiba selepas tamat masa (diterima, ditolak atau ralat), perbandingan dan padam nilai bersiri yang tepat akan mengalih keluar baris sandaran tamat masa yang sama bait sahaja. Tidak ada penantian antara perbandingan dan pemadaman itu; penulisan gangguan yang lebih baru dikekalkan. Pengusiran terkawal mengalih keluar pin tempatan akaun yang gagal itu sendiri walaupun dengan Redis turun, dan membersihkannya semula selepas pengesahan pengusiran dikongsi. Menunggu balasan yang dikongsi lebih awal tidak boleh memulihkan pin tempatan yang dialih keluar kerana kejayaan yang dikongsi tidak pernah menulis SQLite. Pengurangan gangguan kemudian boleh memasang semula akaun; Tulisan kongsi yang diterima kemudian hanya wujud dalam Redis. Redis terlepas jangan rujuk negeri sandaran tempatan. Dengan pemacu dimatikan, pin yang baru dipilih mengekalkan bentuk SQLite JSON empat medan legasi; hanya penghalaan Redis menambah identiti akaun cincang. Pin yang telah diambil disemak semula pada sempadan tamat tempohnya. Redis pilihan bukan pajakan membaca semula kedai, tetapi perancangan pajakan segerak masih boleh menggunakan pin yang dikeluarkan antara prefetch dan perancangan (tetingkap usaha terbaik yang diterima). Komit pajakan tidak boleh menukar akaun selepas tuntutan yang tahan lama: apabila ditolak, ia mengekalkan calon yang dituntut untuk permintaan itu sahaja dan meninggalkan pemenang yang dikongsi tidak disentuh, jadi persetujuan merentas keadaan terikat pada laluan itu. Selebihnya jadual masih terpakai: ini tidak berkongsi kelekatan sesi kombo, pin giliran Codex asli, semafor akaun, sekatan, had perbelanjaan, konfigurasi atau log panggilan.

Perkakasan: `/v1/responses` panjang serentak setiap contoh ialah a** bajet ingatan** soalan (timbunan + inflight-bait / #10110). `N` bebas `DATA_DIR` s masih mendarab timbunan: RAM hos mesti meliputi `N × cgroup`, bukan "satu pod 16 Gi dengan N = 8." Jangan sekali-kali `replicas > 1` pada satu fail SQLite.

Karang lakaran (dua timbunan, dua jilid — bukan `deploy.replicas: 2`):

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

Ketumpatan dalam proses (mampatan daripada pengasingan HTTP ) ialah [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu kelompok logik pada keadaan tahan lama yang dikongsi ialah [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Ralat serantau Gemini di dalam Docker

Google AI Studio / Gemini API boleh mengembalikan HTTP 400 dengan FAILED_PRECONDITION dan
`User location is not supported for the API use.` Permintaan yang berjaya pada hos
tidak membuktikan bahawa bekas menggunakan laluan keluar yang sama. Susunan DNS,
kesambungan IPv4/IPv6, penghalaan VPN dan proksi yang dikonfigurasikan mungkin berbeza. Semak
[wilayah yang disokong Google](https://ai.google.dev/gemini-api/docs/available-regions)
serta laluan sambungan sebenar; ralat ini sahaja tidak menunjukkan bahawa kunci API bermasalah.

### Utamakan proksi khusus sambungan

Gunakan [konfigurasi proksi bagi setiap sambungan](../ops/PROXY_GUIDE.md#4-level-proxy-system)
OmniRoute untuk sambungan Gemini yang terjejas, kemudian ulangi **Uji Sambungan** dan permintaan kecil
dengan model yang sama. Ini mengehadkan perubahan penghalaan kepada sambungan tersebut. Sahkan
bahawa proksi boleh dicapai dari bekas dan sambungan itu benar-benar memilihnya.
Menukar laluan tidak menjamin kelayakan serantau pihak huluan.

### Bandingkan rangkaian hos dan bekas

Pastikan kunci, model dan permintaan kekal sama apabila membandingkan hasil yang disahkan; jangan sekali-kali
tampal kelayakan, kata laluan proksi atau pengepala kebenaran lengkap ke dalam isu.
Mula-mula periksa keluarga alamat yang ditawarkan oleh penyelesai OS dengan menggunakan perintah yang sama
pada hos dan di dalam bekas:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Gantikan `omniroute` dengan perkhidmatan yang anda jalankan (contohnya, `omniroute-web`). Perintah ini
mencetak keluarga alamat tanpa kelayakan atau alamat IP. Nilai `6` yang dikembalikan
hanya menunjukkan hasil DNS IPv6: ia **tidak** membuktikan laluan IPv6 yang boleh digunakan atau akses API.
Jika `curl` dipasang, bandingkan `curl -4 -I https://generativelanguage.googleapis.com`
dengan `curl -6 -I https://generativelanguage.googleapis.com` dalam kedua-dua persekitaran.
Respons HTTP membuktikan kesambungan untuk ujian tersebut, walaupun ia merupakan ralat tanpa pengesahan;
hanya permintaan model yang disahkan dapat menguji kelayakan Gemini.

### Alternatif peringkat hos: IPv6 yang berfungsi dan dasar penyelesai

Pelapor [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) memulihkan
akses dalam persekitaran mereka dengan mendayakan IPv6 bekas dan mengubah pemilihan
alamat glibc. Anggap ini sebagai alternatif khusus persekitaran. Sahkan IPv6 hos
yang berfungsi, laluan trafik keluar/penghalaan bekas dan peraturan tembok api sebelum melaraskan keutamaan penyelesai.
Alamat ULA peribadi sahaja tidak membuktikan kesambungan IPv6 awam.

Bagi perkhidmatan yang telah disambungkan kepada rangkaian lalai Compose, fragmen ini mendayakan
IPv6 pada rangkaian tersebut; kekalkan perkhidmatan, port, volum dan konfigurasi anda yang selebihnya:

```yaml
networks:
  default:
    enable_ipv6: true
```

Bagi rangkaian bernama, dayakannya pada rangkaian yang benar-benar disertai oleh perkhidmatan tersebut. Docker boleh
memperuntukkan subnet ULA; pilih subnet eksplisit yang tidak bertindih hanya apabila rangkaian anda
memerlukannya. Lihat [rangkaian IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
dan [pilihan rangkaian Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Pada **imej berasaskan glibc**, `/etc/gai.conf` boleh mengubah pemilihan alamat. Dockerfile repositori
semasa menggunakan Debian; imej tersuai berasaskan musl tidak berkongsi mekanisme ini.
Pelarasan yang dilaporkan mengubah label ULA daripada `label fc00::/7 6` kepada
`label fc00::/7 1`. Mulakan dengan jadual dasar lengkap imej dan kekalkan entri lain;
penambahan entri `label` atau `precedence` menggantikan jadual lalai tersebut, maka fail
yang hanya mengandungi baris yang diubah adalah tidak mencukupi.
[Rujukan konfigurasi glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
mendokumentasikan semantik tersebut. Lekap-ikat fail yang telah disemak sebagai baca sahaja pada `/etc/gai.conf`
dan cipta semula perkhidmatan untuk menerapkannya.

Ini mengubah pemilihan alamat OS bagi **semua trafik keluar dalam bekas tersebut**.
Ia tidak memaksa setiap aplikasi memilih IPv6: susunan DNS dan pemilihan sambungan
Node juga penting. Khususnya, `--dns-result-order=ipv4first` mengutamakan IPv4 dan
bukan penyelesaian bagi kegagalan yang hanya berlaku pada IPv4. Lihat [susunan DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Uji semula Gemini dan penyedia anda yang lain selepas sebarang perubahan peringkat hos. Untuk membuat asal,
alih keluar lekapan `gai.conf` tersuai, pulihkan konfigurasi rangkaian sebelumnya dan
cipta semula perkhidmatan/rangkaian yang terjejas semasa tempoh penyelenggaraan. Mencipta semula rangkaian
boleh mengganggu bekas lain yang disambungkan kepadanya; jangan padam volum data berterusan.

## Nota Penting

- **Mod WAL SQLite:** `docker stop` hendaklah dibiarkan selesai supaya OmniRoute boleh membuat titik semak bagi perubahan terkini kembali ke dalam `storage.sqlite`. Fail Compose yang disertakan telah menetapkan tempoh ihsan berhenti selama 40 saat. Jika anda menjalankan imej secara langsung, kekalkan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tetapkan kepada `true` jika sandaran rutin/sebelum tulis diuruskan secara luaran. Migrasi pangkalan data sedia ada masih memerlukan syot kilat keselamatan tahan lama tersendiri dan kawalan perlindungan migrasi besar-besaran.
- **Pengekalan Data:** Sentiasa lekapkan volum pada `/app/data` untuk mengekalkan pangkalan data, kunci dan konfigurasi anda apabila bekas dimulakan semula.
- **Konfigurasi Port:** Gantikan pemboleh ubah persekitaran `PORT` untuk menukar port lalai `20128`.

## Lihat Juga

- [Panduan Penggunaan VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Persediaan VM + nginx + Cloudflare
- [Panduan Penggunaan Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Gunakan pada Fly.io
- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Rujukan lengkap `.env`
