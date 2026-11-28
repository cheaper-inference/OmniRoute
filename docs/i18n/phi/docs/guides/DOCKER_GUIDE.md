# 🐳 Docker Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kumpletong sanggunian para sa deployment gamit ang Docker. Para sa mabilisang pagsisimula, tingnan ang [seksyon ng Docker sa README](../README.md#-docker).

## Talaan ng mga Nilalaman

- [Mabilis na Pagtakbo](#quick-run)
- [Gamit ang Environment File](#with-environment-file)
- [Docker Gumawa](#docker-compose)
- [Mga Magagamit na Profile](#available-profiles)
- [Pagpapatigas ng lalagyan](#container-hardening)
- [Pag-configure ng mga tool ng host CLI kapag tumatakbo ang OmniRoute sa Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Mga Yugto ng Dockerfile](#dockerfile-stages)
- [Mga Variable ng Kritikal na Kapaligiran](#critical-environment-variables)
- [Docker Mag-compose kasama si Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Mabilis na Tunnel](#cloudflare-quick-tunnel)
- [Mga Tag ng Larawan](#image-tags)
- [Mga update sa dashboard sa Docker](#dashboard-updates-in-docker)
- [Availability: ang default SQLite ay single-replica](#availability-default-sqlite-is-single-replica)
- [Gemini rehiyonal na mga error sa loob ng Docker](#gemini-regional-errors-inside-docker)
- [Mahalagang Tala](#important-notes)

---

## Mabilis na Pagtakbo

> **Self-host sa isang utos?** Tingnan ang [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (naka-publish na larawan + Redis, loopback-only, walang pagpipilian sa profile). Ang Quick Run sa ibaba ay ang single-container path para sa mga user na nagpapatakbo na Redis sa ibang lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Gamit ang Environment File

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
# Base profile (walang mga CLI tool)
docker compose --profile base up -d

# CLI profile (built-in ang Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Host profile (pangunahing para sa Linux; mino-mount nang read-only ang mga host CLI binary)
docker compose --profile host up -d

# Web profile (Chromium/Playwright para sa mga web-session provider)
docker compose --profile web up -d

# Pagsamahin ang CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Mga Available na Profile

May kasamang mga Compose profile ang OmniRoute para sa mga pangunahing uri ng deployment. Piliin ang naaangkop sa iyong environment.

| Profile          | Serbisyo         | Kailan gagamitin                                                                                                                                                                  | Command                                      |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (default) | `omniroute-base` | Headless server / minimal na runtime, walang kasamang mga provider CLI                                                                                                            | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Mga agentic workflow na tumatawag sa `omniroute providers/setup/doctor` at sa mga kasamang CLI (Codex, Claude Code, Droid, OpenClaw)                                              | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Mga Linux host na nangangailangan ng access na tulad ng `network_mode` sa mga host CLI sa pamamagitan ng read-only na pag-mount sa `~/.local/bin`, `~/.codex`, `~/.claude`, atbp. | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Patakbuhin ang [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar sa port `8317` para sa upstream CLI proxying                                                   | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Mga web-session provider na nangangailangan ng browser: `gemini-web`, `claude-web`, `claude-turnstile` (bine-build ang `runner-web`, kasama ang Chromium)                         | `docker compose --profile web up -d`         |

> Maaaring pagsamahin ang maraming profile: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pagpapatigas ng lalagyan

Ang `base`, `web`, `cli`, at `host` app na mga serbisyo sa `docker-compose.yml` ay gumagamit `cap_drop: [ALL]` at ang `no-new-privileges:true` na opsyon sa seguridad. Gumagana ang imahe bilang hindi-root na user `node` at nakikinig sa matataas na port, kaya hindi ito nangangailangan ng mga kakayahan Linux. Pinipigilan ng opsyon sa seguridad ang mga proseso na makakuha ng mga pribilehiyo sa pamamagitan ng setuid binary.

Ang `cli` profile lang ang nag-mount sa Docker socket para sa auto-updater. Tingnan ang [Escape hatch: i-configure ang sariling CLIs ng container](#escape-hatch-configure-the-containers-own-clis-use-sparingly) para sa mga implikasyon sa seguridad.

Ang root filesystem ay mananatiling masusulat bilang default. Ang `cli` profile ay nagsusulat ng CLI configuration at mga cache sa home directory ng container, ang `web` profile ay nag-iimbak ng Chromium session state, at ang Next.js runtime ay maaaring magsulat ng mga cache sa labas `/app/data`.

Upang subukan ang isang read-only na root filesystem na may `base` profile, i-save ito bilang `docker-compose.override.yml` sa tabi ng `docker-compose.yml`. Awtomatikong binabasa ng Compose ang override.

```yaml
services:
  omniroute-base:
    read_only: true
    tmpfs:
      - /tmp
```

```bash
docker compose --profile base up -d
```

Ang umiiral `/app/data` mount ay mananatiling nasusulat. Subukan ang iyong workload bago gamitin ang override na ito sa produksyon, dahil maaaring kailanganin nitong magsulat sa ibang mga path.

## Pag-configure ng mga host CLI tool kapag tumatakbo ang OmniRoute sa Docker

Ang `omniroute setup-codex`, `setup-claude`, `config set <tool>`, at ang button na
**I-save ang config** ng dashboard ay nagsusulat ng mga file tulad ng `~/.codex/*.config.toml`. May
kahulugan lamang ang mga path na iyon sa machine kung saan aktuwal na tumatakbo ang CLI. Kung patatakbuhin
ang mga ito sa loob ng container, mapupunta ang isinusulat sa sariling home ng container (`/home/node` —
tumatakbo ang image bilang `USER node`), kung saan hindi ito kailanman babasahin ng anumang host CLI at
mabubura ito sa sandaling muling gawin ang container.

Natutukoy ito ng OmniRoute at tinatanggihan ang pagsusulat habang nagbibigay ng mga tagubilin sa halip na
mag-ulat ng tagumpay na hindi mo naman magagamit: lalabas ang CLI na may `2`, at tutugon ang API ng `422`
na may `containerEphemeralTarget: true`.

### Inirerekomenda: patakbuhin ang CLI sa host at ang OmniRoute sa Docker

Ang container ang naghahatid ng API; kino-configure naman ng CLI ang mga host tool mo.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ituon ang CLI sa container
omniroute setup-codex                      # isinusulat ang totoong ~/.codex sa iyong host
```

Ito ang tamang piliin kapag tumatakbo sa laptop mo ang Codex, Claude Code, Cursor, o mga katulad nito —
na siyang karaniwang setup.

### Alternatibo: i-bind-mount ang mga host config dir (`host` profile)

Kung gusto mong ang container mismo ang magsulat sa host config mo, i-mount ang
mga directory at ituon ang `CLI_CONFIG_HOME` sa mount root. Ginagawa na ito ng `host` profile:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ang bind mount ang dahilan kung bakit mapagkakatiwalaan ang path: binabasa ng OmniRoute ang
`/proc/self/mountinfo` at pinapayagan ang pagsusulat sa mga naka-mount na path (at sa mga directory
na may mga anak na mount, na siyang eksaktong anyo ng `/host-home` sa itaas), habang
patuloy na tinatanggihan ang mga hindi naka-mount.

### Pang-emergency na opsyon: i-configure ang sariling mga CLI ng container (gamitin nang matipid)

Kapag talagang nasa loob ng container ang mga CLI (ang `cli` profile), sinasadya ang pagsusulat.
Ipasa ang `--allow-container-write` sa anumang `setup-*` command, o itakda ang
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para sa server. Magpapatuloy ang pagsusulat
na may babalang hindi ito mananatili pagkatapos mawala ang container.

> **Babala sa seguridad — `cli` profile + `docker.sock` mount.**
> Ibi-bind-mount ng `cli` profile ang `/var/run/docker.sock` upang magawa ng
> auto-updater sa loob ng container na muling likhain ang stack mula sa host daemon
> (sinusuri ng `src/lib/system/autoUpdate.ts` ang socket na iyon at nilalaktawan ang
> Docker path kapag wala ito). Ang socket na iyon ay **isang hangganan ng pagtitiwala na
> katumbas ng host-root**: anumang makaka-access dito ay makokontrol ang host Docker daemon bilang
> root — maaari itong gumawa, magsiyasat, huminto, at mag-alis ng anumang container sa host.
> Mga implikasyon:
>
> 1. **Huwag kailanman ilantad sa network ang port ng `cli` profile.** I-publish
>    ito sa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — kapag naaabot mula sa LAN ang isang `cli` profile, anumang dashboard-level RCE ay nagiging
>    ganap na kompromiso ng host.
> 2. **Huwag mag-bind ng anumang karagdagang host directory sa `cli` profile.**
>    Ang Docker socket kasama ng anumang karagdagang mount ay nagbibigay sa container ng ganap na
>    read/write na access sa filesystem at host config mo. Kung kailangan ng isang tool na
>    makita ang isang project, patakbuhin ito nang lokal gamit ang CLI binary — huwag itong i-mount
>    sa `cli` container.
>
> Kung hindi mo kailangan ang auto-update sa loob ng container, panatilihing naka-off ang `cli` profile
> (`COMPOSE_PROFILES=core,redis` o mas maikli). Hindi mina-mount ng ibang mga profile ang
> Docker socket.
>
> Tingnan ang `docs/security/MITM-TPROXY-DECRYPT.md` (git; hindi kino-compile sa `/docs`) para sa kaugnay na threat model
> tungkol sa MITM, at ang `docs/security/SUPPLY_CHAIN.md` para sa
> binary provenance chain ng `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

Umaasa ang OmniRoute sa Redis para suportahan ang distributed rate limiter at shared cache. **Palaging nakadefine** ang serbisyong `redis` sa `docker-compose.yml` (wala itong profile gate) at nagsisimula kasabay ng anumang ibang profile.

| Detalye               | Halaga                                     |
| --------------------- | ------------------------------------------ |
| Image                 | `redis:7-alpine`                           |
| Pangalan ng container | `omniroute-redis`                          |
| Internal na port      | `6379`                                     |
| Host port (override)  | `REDIS_PORT` (default ay `6379`)           |
| Host bind (override)  | `REDIS_BIND_HOST` (default ay `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`           |
| Healthcheck           | `redis-cli ping` (10s na interval)         |

Mga kaugnay na environment variable:

- `REDIS_URL` — connection string na ini-inject sa app (`redis://redis:6379` bilang default).
- `REDIS_PORT` — host-side na port mapping para sa Redis container.
- `REDIS_BIND_HOST` — host interface kung saan inilalathala ang port. Ang default ay `127.0.0.1`.

> **Bakit loopback ang default:** tumatakbo ang sidecar nang walang `requirepass`, at naaabot
> ito ng mga app container sa pamamagitan ng compose network (`redis:6379`) — naroon lamang
> ang inilathalang port para sa host-side tooling (`redis-cli`, isang lokal na `npm run dev`).
> Kapag inilathala sa `0.0.0.0`, malalantad ang Redis na walang authentication sa bawat host
> sa iyong LAN. Kung itatakda mo ang `REDIS_BIND_HOST=0.0.0.0`, idagdag din ang
> `--requirepass` sa `command:` ng serbisyo.

Hindi inirerekomenda ang **pag-disable sa Redis** (bababa ang rate limiter sa in-memory fallback). Kung kailangan talaga, alisin o i-comment ang service block na `redis:` sa `docker-compose.yml`, o i-scale ito sa zero:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Para sa isang nakahiwalay na production snapshot na tumatakbo kasabay ng dev, gamitin ang `docker-compose.prod.yml`.

| Detalye                   | Halaga                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| File                      | `docker-compose.prod.yml`                                                                         |
| Default na dashboard port | `PROD_DASHBOARD_PORT=20130` (naka-map sa internal na `${DASHBOARD_PORT:-20128}`)                  |
| Default na API port       | `PROD_API_PORT=20131`                                                                             |
| Image                     | `omniroute:prod` (binuo mula sa target na `runner-cli`)                                           |
| Redis container           | `omniroute-redis-prod` (`redis:8.6.2`, nakalaang volume na `redis-prod-data`)                     |
| Data volume               | `omniroute-prod-data` (may pangalan, nananatili sa mga rebuild)                                   |
| Mga healthcheck           | `node healthcheck.mjs` + `redis-cli ping`, na may `depends_on` na nakabatay sa kalusugan ng Redis |

Paraan ng paggamit:

```bash
# I-build at simulan ang production stack
docker compose -f docker-compose.prod.yml up -d --build

# I-stream ang mga log
docker compose -f docker-compose.prod.yml logs -f

# Ihinto at alisin (panatilihin ang mga volume)
docker compose -f docker-compose.prod.yml down
```

Tumatakbo ang prod stack nang kasabay ng dev compose (magkakaiba ang mga pangalan ng container, port, at volume), kaya maaari kang magpatuloy sa lokal na pag-iterate habang nananatiling tumatakbo ang production.

## Mga Yugto ng Dockerfile

Nagpapadala ang repositoryo ng multi-stage Dockerfile (`Dockerfile`). Apat na yugto ang nakalantad; piliin ang tamang `target` para sa iyong use case.

| entablado     | Batayang larawan      | Layunin                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nag-install ng mga deps (`npm ci --legacy-peer-deps`) at nagpapatakbo ng `npm run build` (Turbopack bilang default — tingnan ang Build-time na mga mapagkukunan sa ibaba)                                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Runtime ng produksyon na may Next.js standalone na output.** Walang naka-bundle na provider CLIs.**                                                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Nagdadagdag ng `git`, `docker.io`, `docker-compose` at global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Piliin ito para sa mga ahenteng daloy ng trabaho.**                                                                                                                                              |
| `runner-web`  | `runner-base`         | Nagdaragdag ng Playwright + ng Chromium browser (`--with-deps`) para sa mga provider ng web-session: `gemini-web`, `claude-web`, `claude-turnstile`.** Piliin ito kapag ginamit mo ang mga provider na iyon** — ang plain image ay nabigo sa oras ng kahilingan nang wala ito (tingnan ang `-web` note sa ilalim ng Mga Release Channel). |

Bumuo ng isang partikular na target nang manu-mano:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Mga mapagkukunan ng oras ng pagbuo

Kinokontrol ng tatlong build arg ang halaga ng `builder` stage. Ang mga ito ay build-time lang — `OMNIROUTE_MEMORY_MB` (sa ibaba) ay isang hiwalay, runtime knob.

| Bumuo ng arg                | Default | Epekto                                                                                                  |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | Binubuo `0` gamit ang webpack: mas mababang peak memory, mas mabagal. Nag-opt in ang `1` sa Turbopack.  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 heap ceiling (`--max-old-space-size`) para sa mga spawned `next build`.                              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Mga feed `CIRCLE_NODE_TOTAL`; Susunod na nakukuha `workers = N - 1` para sa pagkolekta ng data ng page. |

Ang `OMNIROUTE_BUILD_WORKERS` ang itataas sa isang malaking builder at ang maghihinala kapag namatay ang isang napilitang build** pagkatapos** `✓ Compiled successfully`. Ang bawat page-data worker ay sarili nitong proseso, at gayundin ang parent `next build` mismo; sinukat ng live VPS reproduction (isyu #7518) ang rurok ng bawat proseso na RSS sa ~ 4.5 GB na independyente sa `NODE_OPTIONS` heap flag (Turbopack ay nagko-compile sa native/Rust memory sa labas ng V8 heap). Ang default ng `2` (→ 1 manggagawa, 2 proseso sa kabuuan) ay may sukat para sa 16 GB / 4 vCPU GitHub-host na runner na ginagamit ng pipeline ng pag-publish. Sa `8` (→ 7 manggagawa) naubusan ng memorya ang runner na iyon at nabigo ang buildkit sa hakbang na may `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 manggagawa) ay hindi pa rin magkasya kapag ang bawat proseso RSS ay direktang nasukat sa halip na ipahiwatig. Ginagawa `tests/unit/docker-build-memory-budget.test.ts` ang aritmetika laban sa sinusukat na pigura at nabigo kung ang alinmang knob ay lumampas sa runner.

Turbopack compiles sa katutubong Rust memory na nabubuhay** sa labas** ang V8 heap, kaya hindi ito tinalian `OMNIROUTE_BUILD_MEMORY_MB`. Sa isang host na may memory ceiling ang build ay pagkatapos ay SIGKILLed ng OOM killer na walang error na text sa lahat — ito ay humihinto lamang sa kalagitnaan ng `Creating an optimized production build`, na nagbabasa tulad ng isang hang sa halip na isang out-of-memory. Iyon ang dahilan kung bakit ang `Dockerfile` ay nagde-default sa webpack (`OMNIROUTE_USE_TURBOPACK=0`), hindi tulad `npm run dev` / `npm run build`, kung saan Turbopack ay ang code default: isang bare `docker build .` na walang build args (kung ano ang tumatakbo sa Railway at iba pang isang-click na host) ay hindi dapat mamatay nang tahimik sa isang memory-capped builder. Ang mga nai-publish na larawan ay tahasang pumasa sa `OMNIROUTE_USE_TURBOPACK=0` sa `docker-publish.yml`. Sa isang builder na maraming RAM, mag-opt in sa Turbopack para sa mas mabilis na build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ay pinagana, kaya `next build` ay nagpapatakbo ng isang magulang** at** isang proseso ng manggagawa at ang bawat isa ay pinarangalan `OMNIROUTE_BUILD_MEMORY_MB` nang hiwalay. Sukatin ang kisame ng lalagyan sa itaas ng humigit-kumulang dalawang beses sa halagang iyon, hindi isang beses.

Sinukat sa punong ito (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Lalagyan ng kisame | Resulta                         |
| --------- | ------------------ | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | OOM-pinatay sa pareho, tahimik  |
| webpack   | 8 GiB              | magtayo ng manggagawa SIGKILLed |
| webpack   | 12 GiB             | nagtagumpay, umabot sa 11.1 GiB |

### Mga default ng runtime

Mga default na na-export ng `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Pag-uugali ng memorya sa Docker:

- Ang imahe ay nagtatakda `OMNIROUTE_MEMORY_MB=1024` at nakukuha ang `NODE_OPTIONS=--max-old-space-size=1024` mula dito.
- Ang aktwal na proseso ng server ay sinimulan ng standalone na launcher, na nagbabasa ng `OMNIROUTE_MEMORY_MB` at nagdaragdag `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Ginagamit ng node ang huling inuulit na halaga `--max-old-space-size`, kaya kinokontrol ng setting ng `OMNIROUTE_MEMORY_MB` ang epektibong limitasyon Docker heap.
- Dahil palaging itinatakda ito ng larawan, hindi kailanman nalalapat ang sariling RAM-calibrated fallback ng launcher sa ilalim ng Docker. Itaas ito nang tahasan para sa workload (talahanayan sa ibaba). Masyadong maliit ang `2048` para sa coding-agent `/v1/responses`.

### Runtime RAM para sa mga ahente ng coding

Ang 1 GiB Docker default ay isang dashboard/light-chat floor, hindi isang laki ng produksyon. Ang mga mahahabang katawan `POST /v1/responses` (daan-daang mga mensahe, sampu ng mga tool) ay nagpapanatili ng maraming in-memory na graph sa panahon ng compression. Dalawang nagsasapawan na ~ 3 MiB / ~ 750k-token na kahilingan ang nag-abort ng V8 sa isang** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) at tumama din ng 16 GiB cgroup OOM. Tingnan ang [#7849](https://github.com/cheaper-inference/OmniRoute/issues/7849).

Sukat** cgroup `--memory` sa itaas ng heap** — native buffers, SQLite, at compression intermediate ay nasa labas ng V8.

| Workload                                        | `OMNIROUTE_MEMORY_MB`       | Lalagyan / cgroup        | Mga Tala                                                                                                                     |
| ----------------------------------------------- | --------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, isang magaan na chat                 | `1024` (default ng larawan) | ≥2 GiB                   |                                                                                                                              |
| Isang coding agent (Claude/Codex/Grok)          | `8192`                      | ≥10 GiB                  | Karaniwang single-session `/v1/responses`                                                                                    |
| Dalawang magkasabay na mahabang `/v1/responses` | `10240`–`12288`             | ≥12–16 GiB               | Nasusukat na V8 abort sa ~ 12 GiB heap                                                                                       |
| Tatlong + na magkakasabay na mahabang konteksto | huwag sa isang proseso      | serialize / higit pa RAM | Ang default na pagpasok sa heavyweight ay 1 in-flight; pagpapalaki nito nang walang RAM muling ipinakilala ang pagpapalaglag |

`omniroute serve` sa bare metal ay nagca-calibrate ng ~ 35% ng RAM (naka-clamp na `[512, 4096]`) kapag `OMNIROUTE_MEMORY_MB` ay** hindi nakatakda** . Docker ay palaging nagtatakda ng `1024`, upang ang pagkakalibrate ay hindi kailanman tatakbo sa opisyal na imahe.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Mahahalagang Environment Variable

Bukod sa mga default na nakadokumento sa [ENVIRONMENT.md](../reference/ENVIRONMENT.md), ang mga sumusunod na variable ang pinakamahalaga kapag pinapatakbo sa ilalim ng Docker:

| Variable                      | Layunin                                                                                                                                                                                                                                                                                | Default                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Nakabahaging secret para sa WebSocket bridge. **Kinakailangan sa production** — itakda sa isang malakas at random na string.                                                                                                                                                           | hindi nakatakda (dapat ibigay) |
| `REDIS_URL`                   | Connection string para sa rate limiter / cache backend                                                                                                                                                                                                                                 | `redis://redis:6379`           |
| `REDIS_PORT`                  | Host-side na port para sa kasamang Redis container                                                                                                                                                                                                                                     | `6379`                         |
| `REDIS_BIND_HOST`             | Host interface kung saan inilalathala ang port ng kasamang Redis (loopback maliban kung magdaragdag ka ng AUTH)                                                                                                                                                                        | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host path na naka-mount sa `cli` profile sa `/workspace/omniroute` para sa mga self-update workflow                                                                                                                                                                                    | `.` (kasalukuyang directory)   |
| `OMNIROUTE_MEMORY_MB`         | Limitasyon ng Node heap sa runtime para sa Docker standalone server; ino-override nito ang default ng image sa itaas. Mga coding agent: `8192`+ (tingnan ang [runtime RAM](#runtime-ram-for-coding-agents)).                                                                           | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | I-override ang mga inilalantad na port para sa dashboard (20128) at API (20129)                                                                                                                                                                                                        | `20128` / `20129`              |
| `APP_BIND_HOST`               | Host interface kung saan inilalathala ng docker-compose ang mga port ng dashboard/API/live-WS. Kapag `REQUIRE_API_KEY=false` (ang default), inilalantad ng `0.0.0.0` ang anonymous na `/v1` proxy sa LAN — palawakin lamang gamit ang `REQUIRE_API_KEY=true` o reverse proxy sa harap. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Host interface kung saan inilalathala ng docker-compose ang `cliproxyapi` sidecar — ang data volume nito ang naglalaman ng mga credential ng provider.                                                                                                                                 | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Directory na binabasa at ini-install-an ng runtime plugin scanner. Itakda ito kapag bind-mounted ang mga plugin: sinusunod ng default ang `HOME`, na hindi kinakailangang i-export ng isang image.                                                                                     | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | URL subpath kapag inilathala ang app sa likod ng reverse proxy (hal. `/omniroute`)                                                                                                                                                                                                     | _(walang laman = root)_        |
| `NEXT_PUBLIC_BASE_URL`        | Pampublikong browser origin kasama ang subpath (hal. `https://host/omniroute`)                                                                                                                                                                                                         | hindi nakatakda                |
| `PROD_DASHBOARD_PORT`         | Host-side na dashboard port para sa `docker-compose.prod.yml`                                                                                                                                                                                                                          | `20130`                        |
| `CLIPROXYAPI_PORT`            | Host-side na port para sa `cliproxyapi` sidecar                                                                                                                                                                                                                                        | `8317`                         |

## Reverse Proxy sa isang Subpath (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Gumawa ng pagbuo (inirerekomenda)

Itakda ang parehong mga variable sa `.env`, pagkatapos ay buuin muli upang magkasundo ang imahe at runtime:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Ipinapasa ng `docker-compose.yml` `OMNIROUTE_BASE_PATH` bilang isang Docker build-arg at bilang isang runtime environment variable.

### Pre-built na root image + runtime subpath

Ang mga na-publish `cheaperinference/omniroute:*` na imahe ay binuo para sa root ng domain. Maaari mo pa ring itakda `OMNIROUTE_BASE_PATH` sa runtime; tina-patch ng container ang bundle nang isang beses sa pagsisimula. Ipares ito sa tumutugmang pampublikong pinagmulan:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

I-configure ang reverse proxy para ipasa ang** puno na** panlabas na landas (huwag hubarin ang prefix). Dapat iruta ng Traefik `PathPrefix(`/omniroute `)` sa container nang walang `StripPrefix`, kaya tumatanggap ang Next.js `/omniroute/...` at naghahatid ng mga asset mula sa `/omniroute/_next/...`.

Sinusuri ng Docker healthcheck ang lightweight na `/healthz` lifecycle endpoint na may prefix na aktibong `OMNIROUTE_BASE_PATH`. nananatiling available `/api/monitoring/health` para sa mga diagnostic human/dashboard ; upang ituro ang lalagyang HEALTHCHECK pabalik dito (halimbawa para sa malalim na pagpapatupad ng kalusugan), itakda ang `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ang landas na iyon ay a** malalim** suriin (DB + monitoring summary) — na angkop para sa madalang `HEALTHCHECK` ni Docker kung muli kang sumali, ngunit** hindi** para sa mga Kubernetes `livenessProbe` na pagitan.

Para sa mga orkestra (Kubernetes, Nomad, atbp.):

| Probe              | Mas gusto                                                              | Iwasan                                                                      |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Kasiglahan         | HTTP `GET /livez`, o TCP sa pangunahing port (`PORT`, default `20128`) | `/api/monitoring/health` bilang kabuhayan                                   |
| Kahandaan          | HTTP `GET /healthz`                                                    | Mahigpit na pag-timeout na itinuturing na abala ang event-loop bilang patay |
| Malalim / blackbox | `/api/monitoring/health`                                               | —                                                                           |

proseso ng proseso ng mga ulat ng `/healthz` (`ok` / `starting` / `stopping`). `/livez` ay process-alive lamang (200 sa tuwing makakatakbo ang handler; hindi ito naghihintay ng kahandaan). Pareho pa rin tumatakbo sa parehong Node event loop bilang paghawak ng kahilingan, kaya ang CPU-bound catalog o compression work ay maaaring maantala ang mga ito — busy ≠ dead. Mas gusto ang TCP liveness kung HTTP probe time out. Gabay sa buong pagsisiyasat: [Gabay sa pagsubaybay — Kubernetes probe rekomendasyon](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute ay maaaring ligtas na mailantad gamit ang awtomatikong SSL provisioning ni Caddy. Tiyakin na DNS A record ng iyong domain ay tumuturo sa IP ng iyong server.

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

Itinatakda ni Caddy ang karaniwang mga header ng pagpapasa para sa upstream na lalagyan. Ginagamit OmniRoute `NEXT_PUBLIC_BASE_URL` bilang kanonikal na pampublikong pinagmulan para sa OAuth callback at nakabuo ng mga pampublikong link; Ang mga na-authenticate na pagsusulat sa dashboard ay gumagamit ng mga kahilingan sa parehong pinagmulan at proteksyon CSRF na nakatali sa session. Paganahin lang `OMNIROUTE_TRUST_PROXY` para sa mga advanced na deployment kung saan sinasadya mong makuha ng OmniRoute ang pampublikong pinagmulan mula sa mga pinagkakatiwalaang naipasa na mga header sa halip na tahasang configuration.

## Cloudflare Quick Tunnel

Kasama sa suporta ng dashboard para sa mga Docker deployment ang isang one-click na **Cloudflare Quick Tunnel** sa `Dashboard → Endpoints`. Dina-download lamang ng unang pagpapagana ang `cloudflared` kapag kailangan, nagsisimula ng pansamantalang tunnel patungo sa kasalukuyan mong `/v1` endpoint, at ipinapakita ang nabuong `https://*.trycloudflare.com/v1` URL sa ibaba mismo ng iyong karaniwang pampublikong URL.

Maaaring ipakita o itago mula sa `Settings → Appearance` ang mga tunnel panel ng endpoint (Cloudflare, Tailscale, ngrok) nang hindi binabago ang aktibong estado ng tunnel.

### Mga Tala tungkol sa Tunnel

- Pansamantala ang mga Quick Tunnel URL at nagbabago pagkatapos ng bawat pag-restart.
- Hindi awtomatikong ibinabalik ang mga Quick Tunnel pagkatapos ng pag-restart ng OmniRoute o container. Muling paganahin ang mga ito mula sa dashboard kapag kailangan.
- Kasalukuyang sinusuportahan ng managed install ang Linux, macOS, at Windows sa `x64` / `arm64`.
- Gumagamit bilang default ang mga managed Quick Tunnel ng HTTP/2 transport upang maiwasan ang maingay na mga babala tungkol sa QUIC UDP buffer sa mga container environment na limitado ang resource. Itakda ang `CLOUDFLARED_PROTOCOL=quic` o `auto` kung gusto mo ng ibang transport.
- Kasama sa mga Docker image ang mga system CA root at ipinapasa ang mga ito sa managed na `cloudflared`, na umiiwas sa mga kabiguan sa TLS trust kapag nag-bootstrap ang tunnel sa loob ng container.
- Itakda ang `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` kung gusto mong gumamit ang OmniRoute ng umiiral na binary sa halip na mag-download nito.

## Mga Tag ng Larawan

| Imahe                        | Tag      | Sukat   | Paglalarawan                                                     |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Pinakamataas** inilathala** matatag na SemVer (hindi git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | I-pin ang klase ng tag na ito para sa GitOps                     |

Ang parehong mga larawan ay na-publish sa tatlong mga repository, na may parehong mga digest sa bawat arkitektura: `cheaperinference/omniroute` (Docker Hub, ang Cheaper Inference organization, mula 3.8.53 on), `ghcr.io/cheaper-inference/omniroute` at ang legacy `diegosouzapw/omniroute`, na nagpapanatili sa kasaysayan ng paghila nito at natatanggap pa rin ang bawat release. Ang mga kasalukuyang deployment `diegosouzapw/omniroute` ay patuloy na nag-a-update; Ang pagpapalit ng pangalan ng larawan ay opsyonal. Ang `:next` / `:next-web` pre-release na channel sa ibaba ay na-publish sa `diegosouzapw/omniroute` at GHCR lang.

Multi-platform na manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Awtomatikong pinipili ng Docker ang katugmang arkitektura; ipasa `--platform linux/amd64` kung kailangan mong pilitin ang AMD64 emulation sa mga host ARM.

### Ilabas ang Mga Channel

Nag-publish ang OmniRoute ng hiwalay na mga channel Docker para sa mga stable na release, aktibong release-branch testing, at development build.

| Channel                         | Pinagmulan                                 | Pagbabago                         | Inirerekumendang paggamit                                                                                                                                         |
| ------------------------------- | ------------------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned release                   | hindi nababago                    | Mga deployment ng produksyon na nagpi-pin ng eksaktong release                                                                                                    |
| `:latest` / `:latest-web`       | Pinakamataas** inilathala** matatag SemVer | Nababagong stable na pointer      | Sumusunod sa mga stable na release** pagkatapos** isang SemVer publish job ang ginagawa —** hindi** subaybayan ang `main` o hindi na-release `release/v*` commits |
| `:next` / `:next-web`           | Kasalukuyang default `release/v*` branch   | Nababagong pre-release na pointer | Pagsubok ng mga pag-aayos na napunta sa aktibong release branch ngunit wala pa sa isang stable na release                                                         |
| `:main` / `:main-web`           | sangay ng `main`                           | Nababagong pointer ng pag-unlad   | Pagsubok sa pag-unlad at pagsasama-sama lamang                                                                                                                    |

#### Mga provider ng web-session: ang `-web` images

Ang bawat channel sa itaas ay nagdodoble bilang `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), na binuo mula sa `runner-web` stage — ang parehong larawan kasama Playwright at isang Chromium browser. Nagpapadala ang plain image** wala** Chromium; Kailangan ito `gemini-web`, `claude-web` at `claude-turnstile`.

Ang pagkabigo ay ipinagpaliban, hindi ang oras ng pagsisimula: inilista ng mga provider na iyon ang kanilang mga modelo at ipinapakita bilang konektado sa dashboard, at ang unang kahilingan lamang ang nabigo sa

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kung gagamit ka ng mga provider na iyon, hilahin ang `-web` tag ng channel na nasa — ka na, walang ibang magbabago. Sa isang npm/CLI install (walang Docker image), ang katumbas na nawawalang piraso ay ang browser binary: patakbuhin `npx playwright install chromium` sa host.

#### Gamit ang pre-release na channel

Ang `next` channel ay itinayong muli sa bawat push sa kasalukuyang default `release/v*` branch at na-publish para sa parehong AMD64 at ARM64. Hindi ito ma-overwrite ng mga lumang maintenance branch. Nagbibigay ang channel ng nahugot na larawan para sa mga pag-aayos na sumanib sa aktibong sangay ng pagpapalabas bago maputol ang susunod na stable na tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para sa Docker Compose, i-override ang tag ng larawan na ginamit ng napiling profile, pagkatapos ay hilahin at likhain muli ang serbisyo:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Kaligtasan at rollback

`next` ay isang lumulutang na pre-release na channel. Maaari itong magbago sa anumang push sa aktibong sangay ng paglabas at ito ay** hindi suportado para sa paggamit ng produksyon** . I-pin ang image digest habang sinusuri ang isang partikular na build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Bago subukan, i-back up ang OmniRoute data volume o bind-mounted data directory. Upang ibalik, i-restore ang dating ginamit na stable na bersyon o digest at muling likhain ang container:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Hindi kailanman magagalaw ng isang release-branch build `latest`; tanging isang kwalipikadong stable semantic na bersyon lamang ang maaaring magsulong ng stable pointer. Ang mga `next` na imahe ay nagpapanatili ng pag-inspeksyon ng imahe ng paglabas at hinaharangan ang CRITICAL-vulnerability gate.

**`latest` ay hindi isang garantiya ng pera para sa git.** Ang mga pinagsamang pag-aayos sa `main` o sa aktibong sangay `release/v*` ay** hindi** sa `:latest` hanggang sa ma-publish ang isang stable SemVer na imahe at ang publish job ay nagpo-promote ng `:latest` (parehong digest ng SemVer na iyon). Kung mukhang nagyelo `latest` habang ipinapakita na GitHub ang pag-aayos, hilahin ang `:next` upang subukan ang sangay ng paglabas o hintayin ang tag SemVer.

| Gusto mo                                                                                      | Gamitin                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------- |
| GitOps / produksyon na hindi dapat naaanod                                                    | I-pin `:X.Y.Z` (o ang image digest) |
| Sundin ang mga naka-publish na stables at tanggapin ang isang muling likhain sa bawat release | `:latest`                           |
| Subukan ang hindi na-release `release/v*` commit                                              | `:next` (hindi produksyon)          |
| Subukan `main`                                                                                | `:main` (hindi produksyon)          |

## Mga update sa dashboard sa Docker

Hindi mapapalitan ng isang container mula sa na-publish na image ang sarili nito. Kapag natukoy ng OmniRoute na tumatakbo ito sa loob ng isang container (walang `.git` checkout at hindi npm install), ipinapakita ng banner ng update sa home dashboard ang host command na dapat patakbuhin sa halip na mga tagubilin para sa npm/git, kasama ang isang button para kumopya:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Nagmumula ang pangalan ng service sa `AUTO_UPDATE_SERVICE` (default na `omniroute`, ang service sa
`docker-compose.selfhost.yml`). Isinusulong lamang ng `pull` ang isang floating tag (`latest`, `next`); kapag gumagamit ng naka-pin na
`:X.Y.Z` tag, i-edit muna ang tag.

### Mga one-click update gamit ang host trigger file

Upang patuloy na gumana ang **Update Now** nang hindi mina-mount ang `/var/run/docker.sock` (na nagbibigay sa container
ng root access sa host — tingnan ang babala para sa `cli` profile sa itaas), itakda ang `DOCKER_UPDATE_TRIGGER_FILE` sa
OmniRoute service at magpatakbo ng watcher sa host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Dapat nasa loob ng `DATA_DIR` ang path (ang mga relative value ay nire-resolve batay rito); tatanggihan ang
anumang iba pa. Pagkatapos, isusulat ng **Update Now** ang `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` sa file na iyon,
tutugon ng `202`, at paulit-ulit na susuriin ng dashboard ang `/api/system/version` hanggang sa maging aktibo
ang bagong bersyon at mag-reload. Hindi kailanman nagpapatakbo ang OmniRoute ng shell o Docker command sa mode na ito. Tulad ng bawat pagkilos
sa pag-update, tinatanggap lamang ang request mula sa mga loopback/LAN client.

Nagbibigay ang isang bind-mounted na data directory ng matatag na path na masusubaybayan ng host. Mga halimbawang `systemd` unit
(iakma ang `/srv/omniroute` sa directory na naglalaman ng iyong compose file at `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Subaybayan ang mga request sa pag-update mula sa OmniRoute dashboard

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=I-pull at muling likhain ang OmniRoute container

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

Inaalis ng service ang request bago mag-pull upang hindi paulit-ulit na tumakbo ang isang nabigong pagpapatakbo. Kapag walang
`DOCKER_UPDATE_TRIGGER_FILE`, mananatili sa dashboard ang daloy ng manu-manong command.

## Availability: ang default SQLite ay single-replica

Ang stock Docker / Kubernetes OmniRoute ay** isang Node na proseso + isang SQLite na manunulat** . Mataas ang availability ay** hindi suportado** sa topology na iyon.

| Pagpigil                                      | Bunga                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nag-iisang manunulat                          | Gawin** hindi** magpatakbo ng maramihang mga replika laban sa parehong SQLite file. Na corrupt ang DB.                                                                                                                                                                                                                                                                                          |
| Muling likhain / i-restart / HEALTHCHECK kill | **Full outage** ng in-flight SSE, mga session sa dashboard, at in-memory na estado. Bawat konektadong kliyente ay bumababa. Ang mga bagong kahilingan sa panahon ng window ng walang laman na endpoint ay nakakakuha ng reverse-proxy**`502 Bad Gateway: Unknown error`** , hindi OmniRoute JSON — na mga kliyente ay hindi maaaring makilala ito mula sa isang pagkabigo ng provider (#11015). |
| Parehong loop ng kaganapan bilang `/healthz`  | Ang isang abalang catalog o compression tick ay maaaring maantala ang mga probe; isang maikling timeout pagkatapos ay i-restart ang** lamang** replika.                                                                                                                                                                                                                                         |

**Probe matrix** (tingnan din [ang mga rekomendasyon sa pagsisiyasat ng Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Probe         | Target                                                      | Huwag gamitin                                                               |
| ------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Kasiglahan    | TCP sa `PORT` (default `20128`), o malambot HTTP `/healthz` | `/api/monitoring/health`                                                    |
| Kahandaan     | HTTP `GET /healthz`                                         | Mahigpit na pag-timeout na itinuturing na abala ang event-loop bilang patay |
| Malalim / tao | `/api/monitoring/health`                                    | Automated kubelet liveness                                                  |

**Mga upgrade:** asahan na babagsak ang bawat session. Alisin ang mga kliyente kung maaari mo; walang rolling update sa default SQLite. Ang mag-compose ng `restart: unless-stopped` plus Docker `HEALTHCHECK` ay papalitan din ang tanging proseso kapag ang lalagyan ay hindi malusog — parehong blast radius.

Mga ready-made na manifest at isang Helm chart nang live sa `deploy/kubernetes/` at `deploy/helm/omniroute/` — tingnan ang [gabay sa pag-deploy ng Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes snippet para sa a** nag-iisang replika** (Kinakailangan ang muling likhain; huwag itaas `replicas` laban sa isang SQLite file):

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

Hinahayaan `preStop` sleep si kube na mag-drop ng mga endpoint ng Serbisyo bago SIGTERM kaya** bago** humihinto ang trapiko sa proseso ng namamatay. In-flight `/v1/responses` SSE ay pinatuyo hanggang `SHUTDOWN_TIMEOUT_MS` (default 30s) sa pamamagitan ng heavyweight admission leases (#11015). Ang mga bagong kahilingan na umaabot pa rin sa proseso ay nakakakuha `503` + `Retry-After: 5`. Ang Recreate empty-endpoint gap hanggang ang kapalit ay Ready ay nananatiling isang hard outage — na SQLite topology, hindi isang probe misconfig.

Ang panlabas Postgres / multi-writer HA ay** hindi** isang dokumentadong stock path. Kung kailangan mo ng HA, panatilihin ang isang solong replika o magpatakbo ng topology na sinubukan at naidokumento ng proyekto nang hiwalay. Ang Postgres/MySQL work ay nakatira sa [#8075](https://github.com/cheaper-inference/OmniRoute/issues/8075). Hanggang sa nagpapadala iyon, ang tanging suportadong paraan upang dumami** malaki** Ang kapasidad `/v1/responses` ay N independiyenteng mga proseso (susunod na seksyon), hindi `replicas > 1` sa isang volume.

## Scale-out: N independiyenteng mga proseso

### pagmamay-ari ng Codex token rotation

Ang mga kopya ng isang Codex account ay hindi dapat hiwalay na ubusin ang single-use na refresh token nito. Sa mga pagkakataong gumagamit lang ng mga naka-synchronize na kredensyal, itakda `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Iwanan itong hindi nakatakda sa nag-iisang may-ari ng pag-ikot. Ang bawat proseso ay nangangailangan pa rin ng sarili nitong `DATA_DIR`; ang opsyong ito ay hindi nagbabahagi ng SQLite o nagbibigay ng token synchronization o isang ipinamahagi na lock.

Binabasa muli ng passive instance ang koneksyon kapag kailangan ang pag-refresh at gumagamit lang ng ibang hindi pa natatapos na access token. Kung hindi, ang pag-refresh ay hindi pinagana nang hindi nag-e-expire o nagde-deactivate ng koneksyon o nagbibilang ng pagkabigo sa pag-refresh-breaker. Ang mga tunay na upstream authentication failure ay gumagamit pa rin ng normal na failure accounting, exponential cooldown at ang normal na error ng kliyente; nananatiling permanente ang pag-deactivate ng account. I-synchronize ang mga na-rotate na token ng may-ari bago mag-expire ang mga access token (ang default na proactive na lead sa pag-refresh ay limang minuto), o muling i-import ang Codex auth file. Iniimbak ng mga passive import ang mga ibinigay na token nang hindi pinapatunayan ang mga ito sa endpoint ng token. Ang manu-manong dashboard/API refresh ay nagbabalik `409 refresh_disabled`; ang mga bagong OAuth login ay hindi nagbabago. Tingnan [ang sanggunian sa kapaligiran](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Ang isang proseso ng Node ay** isang V8 heap** . Dalawang magkakapatong ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman) ang nag-abort ng heap na iyon sa ~ 12 Gi (`FATAL ERROR: Reached heap limit`) at maaaring OOM ng 16 Gi cgroup. Tingnan [#7849](https://github.com/cheaper-inference/OmniRoute/issues/7849). Ang pagsukat na iyon ay a** memorya-badyet** babala, hindi isang produkto hard-max ng dalawang magkasabay na mahabang `/v1/responses`. Ang mabigat na pagpasok sa chat ay may gate ng isang auto-derived na ingest byte na badyet (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) na may laki mula sa parehong V8/cgroup ceiling — na nag-o-override dito pataas (o ang pagtatakda ng legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) sa isang kalakihang proseso ay muling ipinakilala ang abort. Ang mga maliliit na chat, `/healthz`, `/v1/models`, at MCP ay** hindi** sa cap na iyon.

### Isang proseso: higit sa dalawang mahabang `/v1/responses`

A** malusog** proseso (bunton sa ibaba `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`)** maaaring** magpatakbo ng higit sa dalawang magkasabay na mahabang `POST /v1/responses` kapag ang buong proseso ng inflight-byte na badyet (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ay may puwang pa rin. Ang mga katawan sa o mas mataas na `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) ay tumatanggap ng parehong heavyweight na lease gaya ng mga structure-heavy na kahilingan at gumagamit ng parehong [#10437](https://github.com/cheaper-inference/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Sampu-sampung magkakasabay na mahahabang SSE na kliyente (madalas na kailangan ng mga operator ng 40–50) ay a** memorya-badyet** tanong — size heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — hindi isang mahirap na "max 2" na limitasyon ng produkto. Ang isang pressured heap ay nahuhulog pa rin na may retryable `503` kaya #7849 ay hindi bumalik.

Upang** multiply tambak** (mga independiyenteng V8 old-spaces)** ngayon** :

| Gawin                                                                                                                                                          | huwag                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Takbo** N containers/pods** , bawat isa ay may nito** sariling** `DATA_DIR` / dami                                                                             | Itakda `replicas > 1` laban sa isang SQLite file                              |
| Sukat ng mabigat na in-flight + healthy-headroom mula sa heap / inflight-byte na badyet; 1–2 ay ang konserbatibong #7849 default, hindi isang hard product max | Magbigay ng isang proseso ng 8 × RAM at isang walang hangganang bilang ng cap |
| Opsyonal: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para sa** mga nakabahaging quota counter**                                                      | Tratuhin Redis bilang nakabahaging SQLite — ito ay hindi                      |
| I-duplicate ang mga lihim ng provider sa bawat instance (o tanggapin ang mga naka-partition na dashboard)                                                      | Asahan ang isang dashboard / isang call-log sa mga pagkakataon                |
| Harapan na may anumang load balancer; malagkit sa pamamagitan ng API key o session ay sapat na                                                                 | Nangangailangan ng middleware na may alam sa laki na partikular sa vendor     |

Ang affinity ng session-to-account ay maaari ding ibahagi sa pamamagitan ng Redis: itakda `OMNIROUTE_SESSION_AFFINITY_STORE=redis` at `REDIS_URL` sa bawat proseso, na may parehong `REDIS_KEY_PREFIX` at positibong `sessionAffinityTtlMs` na setting. Niresolba ng mga pin ang mga pagkakakilanlan ng na-hash na paggamit-account sa karapat-dapat na lokal na koneksyon ng bawat proseso, kaya ang mga OAuth account na may katugmang metadata ng pagkakakilanlan ay hindi kailangang magkaroon ng katugmang koneksyon IDs. Ang mga kilalang pagkakakilanlan ng account ay inuuna kaysa sa kontradiksyon na lokal na IDs sa pin resolution at binabantayang pagpapaalis; ang mga talaang walang pagkakakilanlan (o mga tumatawag sa pagpapaalis na walang pagkakakilanlan) ay nagpapanatili ng legacy ID guard. Ang mga account na walang stable na pagkakakilanlan sa paggamit ay nangangailangan pa rin ng pagtutugma IDs. Redis error o mga tawag na lumalagpas sa 100 ms ay bumabalik sa lokal na SQLite. Ang bawat Redis affinity store ay nagtatakda ng mga natitirang operasyon sa 8, agad na nilalampasan Redis kapag puno na, at naglalabas lamang ng mga slot kapag naayos na ang pinagbabatayan na gawain, hindi sa deadline ng tumatawag. Sa panahon ng Redis outage walang ibinahaging katotohanan: ang bawat instance ay bumabalik sa sarili nitong lokal na affinity, ang mga session ay maaaring muling i-pin nang isang beses bawat instance, at ang mga instance ay maaaring magkaiba. Ang lagkit ay muling nagsasama-sama sa pamamagitan ng Redis kapag ito ay nakabawi. Ang timeout ay may hangganan sa paghihintay, hindi isang ipinadalang EVAL, na maaaring mapunta pagkatapos ng fallback. Isinulat ng pagruruta ang eksaktong halaga na sinusunod ng desisyon sa pagruruta, hindi isang bagong mutation-time na nabasa; ang isang naobserbahang miss o isang SQLite fallback na obserbasyon ay inihahambing bilang isang absent Redis key. Ang mga hindi na ginagamit na pin ay pinapalitan sa isang CAS, kaya ang isang late command ay hindi maaaring palitan o tanggalin ang isang mas bago, ibang pin. Redis reads atomically ibalik ang halaga at natitirang server TTL; positive PTTL (o walang expiry) ang tumutukoy sa liveness, hindi ang JSON timestamp ng manunulat o ang orasan ng mambabasa. Mapa ng mga lokal na snapshot ang natitirang TTL sa isang lokal na deadline; Ang mga umiiral JSON key ay nananatiling nababasa at ang kanilang mga raw byte ay pinananatili para sa CAS. Redis ang tanging pinagmumulan ng katotohanan habang ito ay sumasagot. Ang mga kumpirmadong ibinahaging upsert, pagpindot, at pagtanggal ay alisin ang lokal na entry, hindi kailanman i-install o i-refresh ito. SQLite sa Redis path ay nagtataglay lamang ng sariling fallback na desisyon ng pagkakataong ito mula sa mga error Redis, timeout o admission saturation, TTL-bounded gaya ng dati. Ang nawawalang lokal na pin sa isang outage sa ibang pagkakataon ay nagkakahalaga ng isang bagong pagpili (isang prompt-cache miss), hindi isang mali o na-evict na account. Ibinabalik ng mga tinanggihang upserts ang nakabahaging panalo at ang natitirang TTL nito sa atomically: sinusuri muli ng ordinaryong seleksyon ang naka-map na lokal na deadline at gumagamit ng live na karapat-dapat na panalo, humipo sa paggamit at pag-log para sa account na iyon nang walang isa pang nakabahaging sulat. Kung hindi ito available, pinapanatili ng pagpili ang lokal na kandidato, iniiwan ang nakabahaging pin na hindi nagbabago at naglalabas ng isang mensahe sa pag-debug. Ang tinanggihang CAS ay hindi nagsusulat SQLite; Ang mga Redis error, timeout o admission saturation ay inilapat sa halip ang umiiral na lokal na operasyon. Kung dumating ang tugon ng ipinadalang mutation pagkatapos ng timeout (tinanggap, tinanggihan o error), ang isang kasabay na eksaktong serialized-value na paghahambing-at-delete ay nag-aalis lamang ng byte-magkaparehong timeout fallback na row. Walang naghihintay sa pagitan ng paghahambing at pagtanggal; isang mas bagong outage write ay napanatili. Inaalis ng binabantayang pagpapaalis ang sariling lokal na pin ng nabigong account kahit na nakababa ang Redis, at nililinis itong muli pagkatapos ng kumpirmadong ibinahaging pagpapalayas. Ang mga nakabinbing naunang nakabahaging tugon ay hindi makapagpapanumbalik ng isang pinaalis na lokal na pin dahil ang mga nakabahaging tagumpay ay hindi kailanman sumulat SQLite. Maaaring i-repin muli ng isang fallback na outage ang isang account; ang isang susunod na tinanggap na nakabahaging pagsulat ay umiiral lamang sa Redis. Redis miss ay hindi kumunsulta sa lokal na fallback na estado. Kapag naka-off ang driver, napapanatili ng mga bagong napiling pin ang legacy na four-field SQLite JSON na hugis; tanging pagruruta ng Redis ang nagdaragdag ng pagkakakilanlan ng na-hash na account. Ang mga prefetch na pin ay muling sinusuri sa kanilang expiry boundary. Binabasa muli ng Redis non-lease selection ang tindahan, ngunit ang sabay-sabay na pagpaplano sa pag-upa ay maaari pa ring gumamit ng pin na pinaalis sa pagitan ng prefetch at pagpaplano (isang tinatanggap na window ng pinakamahusay na pagsisikap). Ang isang lease commit ay hindi makakapagpalit ng mga account pagkatapos ng isang matibay na paghahabol: sa tinanggihang upsert ay pinapanatili nito ang na-claim na kandidato para sa kahilingang iyon lamang at iniiwan ang nakabahaging nanalo na hindi nagalaw, kaya ang kasunduan sa mga pagkakataon ay limitado sa landas na iyon. Nalalapat pa rin ang natitirang bahagi ng talahanayan: hindi ito nagbabahagi ng combo session stickiness, native Codex turn pins, account semaphores, lockout, limitasyon sa paggastos, configuration o call logs.

Hardware: per-instance concurrent long `/v1/responses` is a** memorya-badyet** tanong (magbunton ng + inflight-byte / #10110). `N` independent `DATA_DIR` s still multiply heps: dapat saklawin ng host RAM `N × cgroup`, hindi “one 16 Gi pod na may N = 8.” Huwag kailanman `replicas > 1` sa isang SQLite file.

Gumawa ng sketch (dalawang tambak, dalawang volume — hindi `deploy.replicas: 2`):

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

In-process density (compression off ang HTTP isolate) ay [#11023](https://github.com/cheaper-inference/OmniRoute/issues/11023). Ang isang lohikal na kumpol sa nakabahaging matibay na estado ay [#8075](https://github.com/cheaper-inference/OmniRoute/issues/8075).

## Gemini rehiyonal na mga error sa loob ng Docker

Google AI Studio / Gemini API ay maaaring ibalik HTTP 400 na may FAILED_PRECONDITION at `User location is not supported for the API use.` Ang isang matagumpay na kahilingan sa host ay hindi nagpapatunay na ang container ay gumagamit ng parehong papalabas na ruta. Ang pag-order DNS, pagkakakonekta IPv4/IPv6, pagruruta VPN at mga naka-configure na proxy ay maaaring magkaiba. Suriin [ang mga suportadong rehiyon ng Google](https://ai.google.dev/gemini-api/docs/available-regions) pati na rin ang aktwal na ruta ng koneksyon; ang error na ito lamang ay hindi nakikilala ang isang masamang API key.

### Mas gusto ang isang proxy na tukoy sa koneksyon

Gamitin [ang per-connection proxy configuration](../ops/PROXY_GUIDE.md#4-level-proxy-system) ng OmniRoute para sa apektadong Gemini connection, pagkatapos ay ulitin** Subukan ang Koneksyon** at isang maliit na kahilingan na may parehong modelo. Pinapanatili nitong saklaw ang pagbabago sa pagruruta sa koneksyong iyon. I-verify na ang proxy ay naaabot mula sa lalagyan, at talagang pinipili ito ng koneksyon. Ang pagpapalit ng ruta ay hindi ginagarantiyahan ang upstream na pagiging karapat-dapat sa rehiyon.

### Ihambing ang host at container networking

Panatilihing magkapareho ang susi, modelo at kahilingan kapag naghahambing ng mga napatotohanang resulta; huwag na huwag mag-paste ng mga kredensyal, proxy password o kumpletong authorization header sa isang isyu. Suriin muna kung aling mga address sa pamilya ang inaalok ng OS resolver, gamit ang parehong command sa host at sa loob ng container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Palitan `omniroute` ng serbisyong pinapatakbo mo (halimbawa, `omniroute-web`). Ang mga command na ito ay nagpi-print ng mga pamilya ng address na walang mga kredensyal o IP address. Ang ibinalik na `6` ay nagpapakita lamang ng isang IPv6 DNS na resulta: ginagawa nito** hindi** patunayan ang isang magagamit na IPv6 ruta o API access. Kung saan naka-install `curl`, ihambing ang `curl -4 -I https://generativelanguage.googleapis.com` sa `curl -6 -I https://generativelanguage.googleapis.com` sa parehong mga kapaligiran. Ang tugon HTTP ay nagpapatunay ng pagkakakonekta para sa probe na iyon, kahit na ito ay isang hindi napatotohanang error; tanging ang na-authenticate na kahilingan sa modelo ang sumusubok sa pagiging kwalipikado Gemini.

### Alternatibong antas ng host: gumaganang IPv6 at patakaran sa solver

Ibinalik ng reporter ng [#12762](https://github.com/cheaper-inference/OmniRoute/issues/12762) ang access sa kanilang kapaligiran sa pamamagitan ng pagpapagana ng container IPv6 at pagbabago ng pagpili ng address ng glibc. Tratuhin ito bilang isang alternatibong partikular sa kapaligiran. Kumpirmahin ang gumaganang host IPv6, container egress/routing at mga panuntunan sa firewall bago isaayos ang mga kagustuhan sa solver. Ang pribadong ULA address mismo ay hindi nagtatatag ng pampublikong IPv6 na koneksyon.

Para sa mga serbisyong naka-attach na sa default na network ng Compose, pinapagana ng fragment na ito IPv6 sa network na iyon; panatilihin ang natitirang bahagi ng iyong serbisyo, port, volume at configuration:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para sa isang pinangalanang network, paganahin ito sa network na aktwal na sinasalihan ng serbisyo. Docker ay maaaring maglaan ng isang ULA subnet; pumili ng tahasan, hindi nagsasapawan na subnet lamang kapag kailangan ito ng iyong network. Tingnan ang [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/) at [Gumawa ng mga opsyon sa network](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Sa isang** glibc-based na imahe** , maaaring baguhin `/etc/gai.conf` ang pagpili ng address. Ang kasalukuyang repositoryong Dockerfile ay gumagamit ng Debian; Ang mga custom na imaheng batay sa musl ay hindi nagbabahagi ng mekanismong ito. Binago ng iniulat na pagsasaayos ang ULA label mula `label fc00::/7 6` patungong `label fc00::/7 1`. Magsimula sa kumpletong talahanayan ng patakaran ng larawan at panatilihin ang iba pang mga entry nito: ang pagdaragdag ng `label` o `precedence` entry ay papalitan ang default na talahanayan na iyon, kaya hindi sapat ang isang file na naglalaman lamang ng binagong linya. Ang [glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf) ay nagdodokumento ng mga semantika na iyon. I-bind-mount ang sinuri na file na read-only sa `/etc/gai.conf` at muling likhain ang serbisyo upang ilapat ito.

Binabago nito ang pagpili ng OS address para sa** lahat ng papalabas na trapiko sa lalagyang iyon** . Hindi nito pinipilit ang bawat application na pumili IPv6: Mahalaga rin ang DNS order at pagpili ng koneksyon ng Node. Sa partikular, mas gusto ng `--dns-result-order=ipv4first` IPv4 at hindi isang lunas para sa pagkabigo IPv4-only. Tingnan [ang Node DNS na pag-order](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Muling subukan Gemini at ang iyong iba pang mga provider pagkatapos ng anumang pagbabago sa antas ng host. Para i-roll back, alisin ang custom `gai.conf` mount, i-restore ang dating network configuration at muling likhain ang apektadong service/network sa panahon ng maintenance window. Ang muling paggawa ng network ay maaaring makagambala sa iba pang mga lalagyan na nakakabit dito; huwag tanggalin ang patuloy na dami ng data.

## Mahahalagang Tala

- **SQLite WAL Mode:** Dapat hayaang matapos ang `docker stop` upang mai-checkpoint ng OmniRoute ang mga pinakabagong pagbabago pabalik sa `storage.sqlite`. Nakatakda na sa mga kasamang Compose file ang 40s na palugit sa paghinto. Kung direkta mong pinapatakbo ang image, panatilihin ang `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Itakda sa `true` kung ang mga regular/paunang-write na backup ay pinamamahalaan sa labas. Nangangailangan pa rin ang mga migration ng kasalukuyang database ng sarili nitong matibay na safety snapshot at pananggalang laban sa maramihang migration.
- **Pagpapanatili ng Data:** Palaging mag-mount ng volume sa `/app/data` upang mapanatili ang iyong database, mga key, at mga configuration sa bawat pag-restart ng container.
- **Configuration ng Port:** I-override ang `PORT` environment variable upang baguhin ang default na port na `20128`.

## Tingnan Din

- [Gabay sa Pag-deploy sa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Pag-setup ng VM + nginx + Cloudflare
- [Gabay sa Pag-deploy sa Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Mag-deploy sa Fly.io
- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Kumpletong sanggunian ng `.env`
