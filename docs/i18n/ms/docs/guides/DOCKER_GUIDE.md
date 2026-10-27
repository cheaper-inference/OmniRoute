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

## Jalankan Pantas

> **Hos sendiri dengan satu perintah?** Lihat
> [Panduan Hos Sendiri](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imej yang diterbitkan +
> Redis, gelung balik sahaja, tiada pilihan profil). Jalankan Pantas di bawah ialah
> kaedah satu bekas untuk pengguna yang telah menjalankan Redis di tempat lain.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Dengan Fail Persekitaran

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

Repositori ini menyediakan Dockerfile berbilang peringkat (`Dockerfile`). Empat peringkat didedahkan; pilih `target` yang sesuai untuk kes penggunaan anda.

| Peringkat     | Imej asas             | Tujuan                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Memasang kebergantungan (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (Turbopack secara lalai — lihat Sumber masa binaan di bawah)                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Masa jalan pengeluaran dengan output kendiri Next.js. **Tiada CLI penyedia disertakan.**                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Menambahkan `git`, `docker.io`, `docker-compose` dan CLI global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pilih ini untuk aliran kerja berasaskan ejen.**                                                                                                               |
| `runner-web`  | `runner-base`         | Menambahkan Playwright + pelayar Chromium (`--with-deps`) untuk penyedia sesi web: `gemini-web`, `claude-web`, `claude-turnstile`. **Pilih ini apabila anda menggunakan penyedia tersebut** — imej biasa akan gagal semasa permintaan tanpa ciri ini (lihat nota `-web` di bawah Saluran Keluaran). |

Bina sasaran tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Sumber masa binaan

Tiga arg binaan mengawal kos peringkat `builder`. Arg ini hanya digunakan semasa binaan —
`OMNIROUTE_MEMORY_MB` (di bawah) ialah tetapan masa jalan yang berasingan.

| Arg binaan                  | Lalai  | Kesan                                                                                                                              |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` membina dengan webpack: penggunaan memori puncak lebih rendah, tetapi lebih perlahan. `1` memilih untuk menggunakan Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Had heap V8 (`--max-old-space-size`) untuk `next build` yang dimulakan.                                                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Menyalurkan `CIRCLE_NODE_TOTAL`; Next memperoleh `workers = N - 1` untuk pengumpulan data halaman.                                 |

`OMNIROUTE_BUILD_WORKERS` ialah nilai yang perlu dinaikkan pada pembina berkuasa besar dan yang perlu
disyaki apabila binaan dengan sumber terhad terhenti **selepas** `✓ Compiled successfully`. Setiap
pekerja data halaman ialah prosesnya sendiri, begitu juga dengan proses induk `next build`;
penghasilan semula pada VPS sebenar (isu #7518) mengukur RSS puncak setiap proses pada
~4.5 GB tanpa bergantung pada bendera heap `NODE_OPTIONS` (Turbopack mengkompil dalam
memori natif/Rust di luar heap V8). Nilai lalai `2` (→ 1 pekerja, jumlah 2
proses) ditetapkan untuk pelaksana 16 GB / 4 vCPU yang dihoskan GitHub dan digunakan oleh
saluran penerbitan. Pada `8` (→ 7 pekerja), pelaksana tersebut kehabisan memori dan
buildkit menggagalkan langkah itu dengan `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 pekerja) masih tidak mencukupi selepas RSS setiap proses diukur
secara langsung dan bukannya dibuat inferens. `tests/unit/docker-build-memory-budget.test.ts`
melakukan pengiraan berdasarkan angka yang diukur dan gagal jika mana-mana tetapan
melebihi kapasiti pelaksana.

Turbopack mengkompil dalam memori Rust natif yang berada **di luar** heap V8, jadi
`OMNIROUTE_BUILD_MEMORY_MB` tidak mengehadkannya. Pada hos yang mempunyai had memori,
binaan kemudiannya dihentikan secara SIGKILL oleh pembunuh OOM tanpa sebarang teks ralat — ia hanya
terhenti di tengah-tengah `Creating an optimized production build`, yang kelihatan seperti tersekat dan
bukannya kehabisan memori. Itulah sebabnya `Dockerfile` menggunakan webpack secara lalai
(`OMNIROUTE_USE_TURBOPACK=0`), tidak seperti `npm run dev` / `npm run build`, yang
menggunakan Turbopack sebagai lalai kod: `docker build .` biasa tanpa arg binaan (seperti yang
dijalankan oleh Railway dan hos satu klik lain) tidak boleh terhenti secara senyap pada
pembina yang dihadkan memorinya. Imej yang diterbitkan sudah menghantar
`OMNIROUTE_USE_TURBOPACK=0` secara eksplisit dalam `docker-publish.yml`. Pada pembina
dengan RAM yang banyak, pilih untuk menggunakan Turbopack bagi binaan yang lebih pantas:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` didayakan, jadi `next build` menjalankan proses induk **dan** pekerja,
dan setiap satunya mematuhi `OMNIROUTE_BUILD_MEMORY_MB` secara berasingan. Tetapkan had
kontena kepada lebih kurang dua kali ganda nilai tersebut, bukannya sekali ganda.

Diukur pada pepohon ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pembundel | Had kontena    | Hasil                                           |
| --------- | -------------- | ----------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | Dihentikan OOM pada kedua-duanya, secara senyap |
| webpack   | 8 GiB          | Pekerja binaan dihentikan secara SIGKILL        |
| webpack   | 12 GiB         | Berjaya, memuncak pada 11.1 GiB                 |

### Lalai masa jalan

Nilai lalai yang dieksport oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Gelagat memori dalam Docker:

- Imej menetapkan `OMNIROUTE_MEMORY_MB=1024` dan memperoleh `NODE_OPTIONS=--max-old-space-size=1024` daripadanya.
- Proses pelayan sebenar dimulakan oleh pelancar kendiri, yang membaca `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node menggunakan nilai `--max-old-space-size` berulang yang terakhir, jadi penetapan `OMNIROUTE_MEMORY_MB` mengawal had heap Docker yang berkuat kuasa.
- Oleh sebab imej sentiasa menetapkannya, nilai sandaran pelancar yang ditentukur berdasarkan RAM tidak pernah digunakan di bawah Docker. Tingkatkannya secara eksplisit mengikut beban kerja (jadual di bawah). `2048` masih terlalu kecil untuk `/v1/responses` ejen pengekodan.

### RAM masa jalan untuk ejen pengekodan

Nilai lalai Docker 1 GiB ialah paras minimum untuk papan pemuka/sembang ringan, bukan saiz untuk penggunaan pengeluaran. Kandungan `POST /v1/responses` yang panjang (ratusan mesej, puluhan alat) mengekalkan berbilang graf dalam memori semasa pemampatan. Dua permintaan bertindih bersaiz ~3 MiB / ~750k token telah menyebabkan V8 terhenti pada ruang lama **12 GiB** (`FATAL ERROR: Reached heap limit`) dan turut mencapai OOM cgroup 16 GiB. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tetapkan saiz **cgroup `--memory` melebihi heap** — penimbal natif, SQLite dan perantaraan pemampatan berada di luar V8.

| Beban kerja                              | `OMNIROUTE_MEMORY_MB`      | Bekas / cgroup   | Catatan                                                                                                                   |
| ---------------------------------------- | -------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Papan pemuka, satu sembang ringan        | `1024` (lalai imej)        | ≥2 GiB           |                                                                                                                           |
| Satu ejen pengekodan (Claude/Codex/Grok) | `8192`                     | ≥10 GiB          | `/v1/responses` sesi tunggal biasa                                                                                        |
| Dua `/v1/responses` panjang serentak     | `10240`–`12288`            | ≥12–16 GiB       | V8 diukur terhenti pada heap ~12 GiB                                                                                      |
| Tiga+ konteks panjang serentak           | jangan gunakan satu proses | siri / lebih RAM | Kemasukan beban berat lalai ialah 1 yang sedang diproses; meningkatkannya tanpa RAM akan menyebabkan hentian itu berulang |

`omniroute serve` pada perkakasan fizikal menentukur ~35% daripada RAM (dihadkan kepada `[512, 4096]`) apabila `OMNIROUTE_MEMORY_MB` **tidak ditetapkan**. Docker sentiasa menetapkan `1024`, jadi penentukuran tersebut tidak pernah dijalankan dalam imej rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

`basePath` Next.js dikompil ke dalam berkas standalone. OmniRoute merekodkan nilai yang
telah diterapkan dalam fail sentinel pada akar aplikasi (ditulis semasa `npm run build`;
dibaca oleh `scripts/docker/ensure-docker-base-path.mjs`) dan membandingkannya dengan
`OMNIROUTE_BASE_PATH` apabila bekas dimulakan. Apabila nilainya berbeza dan imej dibina
untuk akar domain, titik masuk menulis semula manifes standalone, literal
`basePath`/`assetPrefix` terbenam (Next 16 memaparkan URL aset SSR hanya daripada
`assetPrefix` — penampal mencerminkan subpath ke dalamnya), URL aset
`/_next/static` yang telah diterapkan (manifes rujukan klien, import media, halaman
ralat yang diprapapar) dan shim `process.env` klien sebelum
`node dev/run-standalone.mjs` dijalankan.

### Binaan Compose (disyorkan)

Tetapkan kedua-dua pemboleh ubah dalam `.env`, kemudian bina semula supaya imej dan
persekitaran masa jalan adalah selaras:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` meneruskan `OMNIROUTE_BASE_PATH` sebagai argumen binaan Docker dan
sebagai pemboleh ubah persekitaran masa jalan.

### Imej akar prabina + subpath masa jalan

Imej `diegosouzapw/omniroute:*` yang diterbitkan dibina untuk akar domain. Anda masih
boleh menetapkan `OMNIROUTE_BASE_PATH` pada masa jalan; bekas menampal berkas sekali
semasa permulaan. Padankannya dengan asalan awam yang sepadan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan proksi songsang untuk memajukan laluan luaran **penuh** (jangan buang
awalan). Traefik hendaklah menghalakan `PathPrefix(`/omniroute`)` ke bekas tanpa
`StripPrefix`, supaya Next.js menerima `/omniroute/...` dan menyediakan aset daripada
`/omniroute/_next/...`.

Pemeriksaan kesihatan Docker menguji titik akhir kitar hayat ringan `/healthz` yang
diawali dengan `OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` kekal tersedia
untuk diagnostik manusia/papan pemuka; untuk menghalakan HEALTHCHECK bekas kembali
kepadanya (contohnya bagi penguatkuasaan kesihatan mendalam), tetapkan
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Laluan tersebut ialah pemeriksaan
**mendalam** (DB + ringkasan pemantauan) — sesuai untuk `HEALTHCHECK` Docker yang jarang
dilakukan jika anda memilih untuk mendayakannya semula, tetapi **tidak** sesuai untuk
selang `livenessProbe` Kubernetes.

Untuk pengorkestra (Kubernetes, Nomad dan sebagainya):

| Probe                  | Utamakan                                                            | Elakkan                                                        |
| ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| Keaktifan              | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, lalai `20128`) | `/api/monitoring/health` sebagai keaktifan                     |
| Kesediaan              | HTTP `GET /healthz`                                                 | Had masa ketat yang menganggap gelung acara sibuk sebagai mati |
| Mendalam / kotak hitam | `/api/monitoring/health`                                            | —                                                              |

`/healthz` melaporkan kitar hayat proses (`ok` / `starting` / `stopping`). `/livez`
hanya melaporkan bahawa proses masih hidup (200 apabila pengendali boleh dijalankan;
ia tidak menunggu kesediaan). Kedua-duanya masih berjalan pada gelung acara Node yang
sama seperti pengendalian permintaan, jadi kerja katalog atau pemampatan yang terikat
kepada CPU boleh melengahkannya — sibuk ≠ mati. Utamakan keaktifan TCP jika probe HTTP
tamat masa. Panduan probe lengkap:
[Panduan pemantauan — cadangan probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose dengan Caddy (HTTPS Auto-TLS)

OmniRoute boleh didedahkan dengan selamat menggunakan penyediaan SSL automatik Caddy. Pastikan rekod A DNS domain anda menghala ke IP pelayan anda.

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
      # Asal yang dihadapkan kepada pelayar untuk panggil balik OAuth, pautan papan pemuka dan URL awam yang dijana.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL dalaman pelayan-ke-pelayan untuk tugas berjadual / pengambilan kendiri.
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

Caddy menetapkan pengepala pemajuan standard untuk bekas huluan. OmniRoute menggunakan
`NEXT_PUBLIC_BASE_URL` sebagai asal awam kanonik untuk panggil balik OAuth dan pautan awam yang
dijana; operasi tulis papan pemuka yang disahkan menggunakan permintaan asal-sama serta perlindungan
CSRF terikat sesi. Hanya dayakan `OMNIROUTE_TRUST_PROXY` untuk penggunaan lanjutan apabila anda
sengaja mahu OmniRoute memperoleh asal awam daripada pengepala yang dimajukan dan dipercayai,
dan bukannya daripada konfigurasi eksplisit.

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

| Imej                     | Tag      | Saiz   | Perihalan                                                  |
| ------------------------ | -------- | ------ | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer stabil **diterbitkan** tertinggi (bukan git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Sematkan kelas tag ini untuk GitOps                        |

Manifes berbilang platform: `linux/amd64` + `linux/arm64` natif (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih seni bina yang sepadan secara automatik; gunakan `--platform linux/amd64` jika anda perlu memaksa emulasi AMD64 pada hos ARM.

### Saluran Keluaran

OmniRoute menerbitkan saluran Docker berasingan untuk keluaran stabil, pengujian cabang keluaran aktif dan binaan pembangunan.

| Saluran                         | Sumber                                  | Kebolehubahan                   | Penggunaan yang disyorkan                                                                                                                 |
| ------------------------------- | --------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Keluaran ditandatangani/berversi        | Tidak boleh ubah                | Penggunaan produksi yang menyematkan keluaran tepat                                                                                       |
| `:latest` / `:latest-web`       | SemVer stabil **diterbitkan** tertinggi | Penuding stabil boleh ubah      | Mengikuti keluaran stabil **selepas** tugas penerbitan SemVer — **tidak** menjejaki komit `main` atau `release/v*` yang belum dikeluarkan |
| `:next` / `:next-web`           | Cabang `release/v*` lalai semasa        | Penuding prakeluaran boleh ubah | Menguji pembaikan yang telah dimasukkan ke dalam cabang keluaran aktif tetapi belum disertakan dalam keluaran stabil                      |
| `:main` / `:main-web`           | Cabang `main`                           | Penuding pembangunan boleh ubah | Untuk pembangunan dan pengujian integrasi sahaja                                                                                          |

#### Penyedia sesi web: imej `-web`

Setiap saluran di atas turut tersedia sebagai tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), yang dibina daripada peringkat `runner-web` — imej yang sama berserta Playwright dan pelayar Chromium. Imej biasa dihantar **tanpa** Chromium; `gemini-web`, `claude-web` dan `claude-turnstile` memerlukannya.

Kegagalan ditangguhkan, bukannya berlaku semasa permulaan: penyedia tersebut menyenaraikan model mereka dan ditunjukkan sebagai tersambung dalam papan pemuka, dan hanya permintaan pertama gagal dengan

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jika anda menggunakan penyedia tersebut, tarik tag `-web` bagi saluran yang sedang anda gunakan — tiada perkara lain yang berubah. Pada pemasangan npm/CLI (tanpa imej Docker), komponen setara yang tiada ialah binari pelayar: jalankan `npx playwright install chromium` pada hos.

#### Menggunakan saluran prakeluaran

Saluran `next` dibina semula pada setiap push ke cawangan lalai `release/v*` semasa dan diterbitkan untuk AMD64 serta ARM64. Cawangan penyelenggaraan yang lebih lama tidak boleh menimpanya. Saluran ini menyediakan imej yang boleh ditarik untuk pembaikan yang telah digabungkan ke dalam cawangan keluaran aktif sebelum tag stabil seterusnya dibuat.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, gantikan tag imej yang digunakan oleh profil yang dipilih, kemudian tarik dan cipta semula perkhidmatan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keselamatan dan pengunduran

`next` ialah saluran prakeluaran terapung. Ia mungkin berubah pada setiap push ke cawangan keluaran aktif dan **tidak disokong untuk kegunaan pengeluaran**. Sematkan digest imej semasa menilai binaan tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum menguji, sandarkan volum data OmniRoute atau direktori data yang dilekapkan melalui bind mount. Untuk mengundur, pulihkan versi stabil atau digest yang digunakan sebelum ini dan cipta semula bekas:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Binaan cawangan keluaran tidak sekali-kali boleh mengalihkan `latest`; hanya versi semantik stabil yang layak boleh menaik taraf penuding stabil. Imej `next` mengekalkan pemeriksaan imej keluaran dan get penyekat kerentanan CRITICAL.

**`latest` bukan jaminan kemutakhiran untuk git.** Pembaikan yang digabungkan pada `main` atau pada cawangan `release/v*` aktif **tidak** terdapat dalam `:latest` sehingga imej SemVer stabil diterbitkan dan tugas penerbitan menaik taraf `:latest` (digest yang sama seperti SemVer tersebut). Jika `latest` kelihatan tidak berubah sedangkan GitHub sudah menunjukkan pembaikan itu, tarik `:next` untuk menguji cawangan keluaran atau tunggu tag SemVer.

| Keperluan anda                                                                           | Gunakan                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / pengeluaran yang tidak boleh menyimpang                                         | Sematkan `:X.Y.Z` (atau digest imej) |
| Ikuti keluaran stabil yang diterbitkan dan terima penciptaan semula pada setiap keluaran | `:latest`                            |
| Uji commit `release/v*` yang belum dikeluarkan                                           | `:next` (bukan untuk pengeluaran)    |
| Uji `main`                                                                               | `:main` (bukan untuk pengeluaran)    |

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

Docker / Kubernetes OmniRoute standard ialah **satu proses Node + satu penulis SQLite**. Ketersediaan tinggi **tidak disokong** pada topologi tersebut.

| Kekangan                                           | Akibat                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Penulis tunggal                                    | **Jangan** jalankan berbilang replika terhadap fail SQLite yang sama. Tindakan itu akan merosakkan DB.                                                                                                                                                                                                                                                                                     |
| Cipta semula / mula semula / penamatan HEALTHCHECK | **Gangguan perkhidmatan sepenuhnya** bagi SSE yang sedang berjalan, sesi papan pemuka dan keadaan dalam memori. Setiap klien yang tersambung akan terputus. Permintaan baharu semasa tempoh tanpa titik akhir akan menerima **`502 Bad Gateway: Unknown error`** daripada proksi songsang, bukannya JSON OmniRoute — klien tidak dapat membezakannya daripada kegagalan penyedia (#11015). |
| Gelung peristiwa yang sama dengan `/healthz`       | Kitaran katalog atau pemampatan yang sibuk boleh melengahkan prob; tamat masa yang singkat kemudiannya memulakan semula **satu-satunya** replika.                                                                                                                                                                                                                                          |

**Matriks prob** (lihat juga [Cadangan prob Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Prob               | Sasaran                                                      | Jangan gunakan                                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Keaktifan          | TCP pada `PORT` (lalai `20128`), atau HTTP lembut `/healthz` | `/api/monitoring/health`                                                        |
| Kesediaan          | HTTP `GET /healthz`                                          | Tamat masa ketat yang menganggap gelung peristiwa sibuk sebagai tidak berfungsi |
| Mendalam / manusia | `/api/monitoring/health`                                     | Keaktifan kubelet automatik                                                     |

**Naik taraf:** jangkakan setiap sesi akan terputus. Salirkan klien jika boleh; tiada kemas kini berperingkat pada SQLite lalai. Compose `restart: unless-stopped` bersama Docker `HEALTHCHECK` juga akan menggantikan satu-satunya proses apabila bekas berstatus Unhealthy — dengan skop kesan yang sama.

Petikan Kubernetes untuk **replika tunggal** (Recreate diperlukan; jangan tingkatkan `replicas` terhadap satu fail SQLite):

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

Jeda `preStop` membolehkan kube menggugurkan titik akhir Service sebelum SIGTERM supaya trafik **baharu** berhenti mencapai proses yang sedang ditamatkan. SSE `/v1/responses` yang sedang berlangsung dikosongkan sehingga `SHUTDOWN_TIMEOUT_MS` (lalai 30s) melalui pajakan kemasukan heavyweight (#11015). Permintaan baharu yang masih sampai kepada proses akan menerima `503` + `Retry-After: 5`. Jurang tanpa titik akhir Recreate sehingga pengganti menjadi Ready masih merupakan gangguan menyeluruh — itu ialah topologi SQLite, bukannya salah konfigurasi probe.

Postgres luaran / HA multi-penulis **bukan** laluan standard yang didokumentasikan. Jika anda memerlukan HA, kekalkan satu replika atau jalankan topologi yang telah diuji dan didokumentasikan secara berasingan oleh projek. Kerja Postgres/MySQL terdapat dalam [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sehingga ia dilancarkan, satu-satunya cara yang disokong untuk meningkatkan kapasiti `/v1/responses` **besar** ialah N proses bebas (bahagian seterusnya), bukannya `replicas > 1` pada satu volum.

## Penskalaan keluar: N proses bebas

Satu proses Node ialah **satu timbunan V8**. Dua `POST /v1/responses` ejen pengekodan (RTK + Caveman) yang bertindih, masing-masing ~3 MiB / ~750k token, menyebabkan timbunan tersebut dihentikan pada sekitar 12 Gi (`FATAL ERROR: Reached heap limit`) dan boleh menyebabkan OOM bagi cgroup 16 Gi. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran tersebut ialah amaran **bajet memori**, bukannya had maksimum produk sebanyak dua `/v1/responses` panjang yang serentak. Kemasukan sembang beban berat dikawal oleh bajet bait pengingesan yang diterbitkan secara automatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dan ditentukan saiznya berdasarkan had V8/cgroup yang sama — mengatasinya dengan nilai lebih tinggi (atau menetapkan had kiraan permintaan legasi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) pada proses yang telah ditentukan saiznya akan menyebabkan penghentian itu berlaku semula. Sembang kecil, `/healthz`, `/v1/models`, dan MCP **tidak** termasuk dalam had tersebut.

### Satu proses: lebih daripada dua `/v1/responses` panjang

Proses yang **sihat** (timbunan di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, lalai `0.75`) **boleh** menjalankan lebih daripada dua `POST /v1/responses` panjang secara serentak apabila bajet bait dalam penerbangan seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) masih mempunyai ruang. Badan permintaan yang bersaiz sama dengan atau melebihi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (lalai 256 KiB) mengambil pajakan beban berat yang sama seperti permintaan sarat struktur dan menggunakan laluan keluar `tryAcquireHealthyHeadroom` [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) yang sama (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Puluhan klien SSE panjang yang serentak (pengendali lazimnya memerlukan 40–50) ialah persoalan **bajet memori** — tentukan saiz timbunan + slot utama/ruang lega + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukannya had produk keras “maksimum 2”. Timbunan yang tertekan masih melepaskan beban dengan `503` yang boleh dicuba semula supaya #7849 tidak berulang.

Untuk **menggandakan timbunan** (ruang lama V8 yang bebas) **pada masa ini**:

| Lakukan                                                                                                                                                                          | Jangan lakukan                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Jalankan **N bekas/pod**, setiap satunya dengan `DATA_DIR` / volum **sendiri**                                                                                                   | Tetapkan `replicas > 1` terhadap satu fail SQLite              |
| Tentukan saiz dalam penerbangan berat + ruang lega sihat daripada bajet timbunan / bait dalam penerbangan; 1–2 ialah nilai lalai konservatif #7849, bukannya had maksimum produk | Berikan satu proses RAM 8× dan had kiraan tanpa batas          |
| Pilihan: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk **kaunter kuota dikongsi**                                                                                   | Anggap Redis sebagai SQLite dikongsi — ia bukan sedemikian     |
| Duplikasikan rahsia penyedia ke dalam setiap tika (atau terima papan pemuka yang dibahagikan)                                                                                    | Jangkakan satu papan pemuka / satu log panggilan merentas tika |
| Letakkan sebarang pengimbang beban di hadapan; kelekitan berdasarkan kunci API atau sesi sudah mencukupi                                                                         | Memerlukan perisian tengah sedar saiz khusus vendor            |

Perkakasan: bilangan `/v1/responses` panjang yang serentak bagi setiap tika ialah persoalan **bajet memori** (timbunan + bait dalam penerbangan / #10110). `N` `DATA_DIR` bebas masih menggandakan timbunan: RAM hos mesti menampung `N × cgroup`, bukannya “satu pod 16 Gi dengan N=8.” Jangan sesekali gunakan `replicas > 1` pada satu fail SQLite.

Lakaran Compose (dua timbunan, dua volum — bukan `deploy.replicas: 2`):

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

Ketumpatan dalam proses (pemampatan dialihkan daripada pengasing HTTP) dibincangkan dalam [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu kelompok logik pada keadaan tahan lama yang dikongsi dibincangkan dalam [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
