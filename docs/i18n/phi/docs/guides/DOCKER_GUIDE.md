# 🐳 Docker Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kumpletong sanggunian para sa deployment gamit ang Docker. Para sa mabilisang pagsisimula, tingnan ang [seksyon ng Docker sa README](../README.md#-docker).

## Talaan ng mga Nilalaman

- [Mabilisang Pagpapatakbo](#quick-run)
- [Gamit ang Environment File](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mga Available na Profile](#available-profiles)
- [Pag-configure ng mga host CLI tool kapag tumatakbo ang OmniRoute sa Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose para sa Production](#production-compose)
- [Mga Stage ng Dockerfile](#dockerfile-stages)
- [Mahahalagang Environment Variable](#critical-environment-variables)
- [Docker Compose gamit ang Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Mga Tag ng Image](#image-tags)
- [Mga update sa dashboard sa Docker](#dashboard-updates-in-docker)
- [Availability: iisang replica lamang ang default na SQLite](#availability-default-sqlite-is-single-replica)
- [Mga regional error ng Gemini sa loob ng Docker](#gemini-regional-errors-inside-docker)
- [Mahahalagang Tala](#important-notes)

---

## Mabilisang Pagpapatakbo

> **Mag-self-host gamit ang isang command?** Tingnan ang
> [Gabay sa Self-Hosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (naka-publish na image +
> Redis, loopback-only, walang pagpili ng profile). Ang Mabilisang Pagpapatakbo sa ibaba ay ang
> single-container na paraan para sa mga user na nagpapatakbo na ng Redis sa ibang lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Gamit ang Environment File

```bash
# Kopyahin at i-edit muna ang .env
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

## Mga Stage ng Dockerfile

Ang repository ay may kasamang multi-stage na Dockerfile (`Dockerfile`). Apat na stage ang available; piliin ang tamang `target` para sa iyong use case.

| Stage         | Base image            | Layunin                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nag-i-install ng mga dependency (`npm ci --legacy-peer-deps`) at nagpapatakbo ng `npm run build` (Turbopack bilang default — tingnan ang Mga resource sa oras ng build sa ibaba)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Production runtime na may standalone output ng Next.js. **Walang kasamang mga CLI ng provider.**                                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Nagdaragdag ng `git`, `docker.io`, `docker-compose` at mga global CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Piliin ito para sa mga agentic workflow.**                                                                                                                                                          |
| `runner-web`  | `runner-base`         | Nagdaragdag ng Playwright + Chromium browser (`--with-deps`) para sa mga provider ng web session: `gemini-web`, `claude-web`, `claude-turnstile`. **Piliin ito kapag ginagamit mo ang mga provider na iyon** — mabibigo ang plain image sa oras ng request kung wala ito (tingnan ang tala tungkol sa `-web` sa ilalim ng Mga Release Channel). |

Manu-manong bumuo ng isang partikular na target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Mga resource sa oras ng build

Tatlong build arg ang kumokontrol sa resource na ginagamit ng stage na `builder`. Para lamang ang mga ito sa oras ng build —
ang `OMNIROUTE_MEMORY_MB` (sa ibaba) ay isang hiwalay na setting para sa runtime.

| Build arg                   | Default | Epekto                                                                                                                      |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | Kapag `0`, nagbu-build gamit ang webpack: mas mababang peak memory, ngunit mas mabagal. Kapag `1`, ginagamit ang Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Limitasyon ng V8 heap (`--max-old-space-size`) para sa inilunsad na `next build`.                                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Nagbibigay ng value sa `CIRCLE_NODE_TOTAL`; kinukuha ng Next ang `workers = N - 1` para sa pagkolekta ng page data.         |

Ang `OMNIROUTE_BUILD_WORKERS` ang dapat taasan sa isang malaking builder at ang
dapat paghinalaan kapag nabigo ang isang build na may limitadong resource **pagkatapos** ng `✓ Compiled successfully`. Ang bawat
page-data worker ay sarili nitong process, at gayundin ang parent na `next build`;
sa isang aktuwal na reproduction sa VPS (issue #7518), nasukat ang peak RSS ng bawat process sa
~4.5 GB nang hiwalay sa heap flag na `NODE_OPTIONS` (nagko-compile ang Turbopack sa
native/Rust memory sa labas ng V8 heap). Ang default na `2` (→ 1 worker, 2
process sa kabuuan) ay itinakda para sa 16 GB / 4 vCPU na GitHub-hosted runner na
ginagamit ng publish pipeline. Sa `8` (→ 7 worker), naubusan ng memory ang runner na iyon at
nabigo ang buildkit sa hakbang na may `ResourceExhausted: ... cannot allocate memory`;
hindi pa rin nagkasya ang `3` (→ 2 worker) nang direktang sukatin ang RSS ng bawat process
sa halip na tantiyahin. Ginagawa ng `tests/unit/docker-build-memory-budget.test.ts`
ang pagkalkula batay sa nasukat na value at nabibigo ito kung lumampas ang alinmang setting
sa kapasidad ng runner.

Nagko-compile ang Turbopack sa native Rust memory na nasa **labas** ng V8 heap, kaya
hindi ito nalilimitahan ng `OMNIROUTE_BUILD_MEMORY_MB`. Sa isang host na may limitasyon sa memory,
isi-SIGKILL ng OOM killer ang build nang walang anumang text ng error — basta na lamang itong
hihinto sa kalagitnaan ng `Creating an optimized production build`, na tila isang pag-hang sa halip
na pagkaubos ng memory. Iyon ang dahilan kung bakit webpack ang default ng `Dockerfile`
(`OMNIROUTE_USE_TURBOPACK=0`), hindi tulad ng `npm run dev` / `npm run build`, kung saan
Turbopack ang default sa code: ang isang simpleng `docker build .` na walang mga build arg (na siyang
pinapatakbo ng Railway at iba pang one-click host) ay hindi dapat tahimik na mabigo sa isang builder
na may limitadong memory. Tahasang ipinapasa na ng mga naka-publish na image ang
`OMNIROUTE_USE_TURBOPACK=0` sa `docker-publish.yml`. Sa isang builder na may maraming RAM, gamitin
ang Turbopack para sa mas mabilis na build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Naka-enable ang `webpackBuildWorker`, kaya nagpapatakbo ang `next build` ng parent **at** worker
process at hiwalay na sinusunod ng bawat isa ang `OMNIROUTE_BUILD_MEMORY_MB`. Itakda ang limitasyon
ng container nang higit sa humigit-kumulang dalawang beses ng value na iyon, hindi isang beses lamang.

Sinukat sa tree na ito (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitasyon ng container | Resulta                                 |
| --------- | ----------------------- | --------------------------------------- |
| Turbopack | 8 GiB / 16 GiB          | Na-OOM-kill sa pareho, nang tahimik     |
| webpack   | 8 GiB                   | Na-SIGKILL ang build worker             |
| webpack   | 12 GiB                  | Nagtagumpay, umabot sa peak na 11.1 GiB |

### Mga default sa runtime

Mga default na ine-export ng `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Pag-uugali ng memory sa Docker:

- Itinatakda ng image ang `OMNIROUTE_MEMORY_MB=1024` at hinango rito ang `NODE_OPTIONS=--max-old-space-size=1024`.
- Sinisimulan ng standalone launcher ang aktuwal na proseso ng server; binabasa nito ang `OMNIROUTE_MEMORY_MB` at idinaragdag ang `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Ginagamit ng Node ang huling inulit na value ng `--max-old-space-size`, kaya kinokontrol ng pagtatakda sa `OMNIROUTE_MEMORY_MB` ang epektibong limitasyon ng Docker heap.
- Dahil palagi itong itinatakda ng image, hindi kailanman nalalapat sa Docker ang sariling fallback ng launcher na naka-calibrate ayon sa RAM. Tahasang taasan ito para sa workload (talahanayan sa ibaba). Masyadong maliit pa rin ang `2048` para sa coding-agent `/v1/responses`.

### Runtime RAM para sa mga coding agent

Ang default na 1 GiB ng Docker ay minimum para sa dashboard/light-chat, hindi sukat para sa production. Ang mahahabang body ng `POST /v1/responses` (daan-daang mensahe, sampu-sampung tool) ay nagpapanatili ng maraming in-memory graph habang nagsasagawa ng compression. Dalawang nagsasabay na request na ~3 MiB / ~750k-token ang nagpa-abort sa V8 sa **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) at umabot din sa cgroup OOM na 16 GiB. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Itakda ang laki ng **cgroup `--memory` nang mas mataas kaysa sa heap** — nasa labas ng V8 ang mga native buffer, SQLite, at compression intermediate.

| Workload                                            | `OMNIROUTE_MEMORY_MB`     | Container / cgroup                          | Mga tala                                                                                                                       |
| --------------------------------------------------- | ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard, isang magaang chat                       | `1024` (default ng image) | ≥2 GiB                                      |                                                                                                                                |
| Isang coding agent (Claude/Codex/Grok)              | `8192`                    | ≥10 GiB                                     | Karaniwang single-session na `/v1/responses`                                                                                   |
| Dalawang magkasabay na mahabang `/v1/responses`     | `10240`–`12288`           | ≥12–16 GiB                                  | Nasukat na pag-abort ng V8 sa ~12 GiB heap                                                                                     |
| Tatlo o higit pang magkakasabay na mahabang context | huwag sa iisang proseso   | isagawa nang sunod-sunod / mas maraming RAM | Ang default na heavyweight admission ay 1 in-flight; ang pagtataas nito nang walang sapat na RAM ay muling magdudulot ng abort |

Kina-calibrate ng `omniroute serve` sa bare metal ang ~35% ng RAM (nililimitahan sa `[512, 4096]`) kapag **hindi nakatakda** ang `OMNIROUTE_MEMORY_MB`. Palaging itinatakda ng Docker ang `1024`, kaya hindi kailanman tumatakbo ang calibration na iyon sa opisyal na image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

Ang `basePath` ng Next.js ay kino-compile sa standalone bundle. Itinatala ng OmniRoute ang naka-bake na
value sa isang sentinel file sa app root (isinusulat habang isinasagawa ang `npm run build`; binabasa ng
`scripts/docker/ensure-docker-base-path.mjs`) at inihahambing ito sa
`OMNIROUTE_BASE_PATH` kapag nagsisimula ang container. Kapag magkaiba ang mga ito at
binuo ang image para sa domain root, muling isinusulat ng entrypoint ang mga standalone manifest, ang
mga naka-embed na literal na `basePath`/`assetPrefix` (nagre-render ang Next 16 ng mga SSR asset URL mula
lamang sa `assetPrefix` — kinokopya rito ng patcher ang subpath), ang mga naka-bake na
`/_next/static` asset URL (mga client-reference manifest, media import, at paunang na-render na
error page), at ang client `process.env` shim bago patakbuhin ang `node dev/run-standalone.mjs`.

### Compose build (inirerekomenda)

Itakda ang parehong variable sa `.env`, pagkatapos ay muling buuin upang magkatugma ang image at runtime:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Ipinapasa ng `docker-compose.yml` ang `OMNIROUTE_BASE_PATH` bilang Docker build-arg at bilang
runtime environment variable.

### Paunang binuong root image + runtime subpath

Ang mga naka-publish na `diegosouzapw/omniroute:*` image ay binuo para sa domain root. Maaari mo pa ring
itakda ang `OMNIROUTE_BASE_PATH` sa runtime; isang beses ipa-patch ng container ang bundle sa pagsisimula.
Ipares ito sa katugmang pampublikong origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

I-configure ang reverse proxy upang ipasa ang **buong** external path (huwag alisin ang
prefix). Dapat i-route ng Traefik ang `PathPrefix(`/omniroute`)` patungo sa container nang walang
`StripPrefix`, upang matanggap ng Next.js ang `/omniroute/...` at maihatid ang mga asset mula sa
`/omniroute/_next/...`.

Sinusuri ng Docker healthcheck ang magaan na `/healthz` lifecycle endpoint na nilagyan
ng aktibong `OMNIROUTE_BASE_PATH` bilang prefix. Mananatiling available ang `/api/monitoring/health` para sa
mga diagnostic ng tao/dashboard; upang muling ituro rito ang HEALTHCHECK ng container (halimbawa,
para sa mahigpit na pagpapatupad ng kalusugan), itakda ang `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ang path na iyon ay isang **malalim** na pagsusuri (DB + buod ng monitoring) — angkop para sa
madalang na `HEALTHCHECK` ng Docker kung pipiliin mong muli itong gamitin, ngunit **hindi** para sa mga interval ng
`livenessProbe` ng Kubernetes.

Para sa mga orchestrator (Kubernetes, Nomad, atbp.):

| Probe           | Mas piliin                                                                | Iwasan                                                           |
| --------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, o TCP sa pangunahing port (`PORT`, default na `20128`) | `/api/monitoring/health` bilang liveness                         |
| Readiness       | HTTP `GET /healthz`                                                       | Maiikling timeout na itinuturing na patay ang abalang event loop |
| Deep / blackbox | `/api/monitoring/health`                                                  | —                                                                |

Iniuulat ng `/healthz` ang lifecycle ng proseso (`ok` / `starting` / `stopping`). Ang `/livez` ay
para lamang sa pagiging buhay ng proseso (200 sa tuwing maaaring tumakbo ang handler; hindi ito naghihintay ng
readiness). Pareho pa ring tumatakbo ang mga ito sa parehong Node event loop na ginagamit sa pagproseso ng request, kaya
maaari silang maantala ng CPU-bound na gawain sa catalog o compression — abala ≠ patay. Mas piliin ang TCP
liveness kung nagta-timeout ang mga HTTP probe. Kumpletong gabay sa probe:
[Gabay sa monitoring — mga rekomendasyon sa Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose gamit ang Caddy (HTTPS Auto-TLS)

Maaaring ligtas na ilantad ang OmniRoute gamit ang awtomatikong paglalaan ng SSL ng Caddy. Tiyaking nakaturo ang DNS A record ng iyong domain sa IP ng iyong server.

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
      # Origin na nakikita ng browser para sa mga OAuth callback, link ng dashboard, at nabuong pampublikong URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Panloob na server-to-server URL para sa mga nakaiskedyul na gawain / self-fetch.
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

Itinatakda ng Caddy ang mga karaniwang forwarding header para sa upstream container. Ginagamit ng OmniRoute ang
`NEXT_PUBLIC_BASE_URL` bilang canonical na pampublikong origin para sa mga OAuth callback at nabuong pampublikong
link; gumagamit ang mga authenticated na pagsusulat sa dashboard ng mga same-origin request kasama ang session-bound na
proteksyon laban sa CSRF. Paganahin lamang ang `OMNIROUTE_TRUST_PROXY` para sa mga advanced na deployment kung saan sadya mong
gustong kunin ng OmniRoute ang pampublikong origin mula sa mga pinagkakatiwalaang forwarded header sa halip na mula sa tahasang
configuration.

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

## Mga Image Tag

| Image                    | Tag      | Laki   | Paglalarawan                                                              |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Pinakamataas na **na-publish** na stable na SemVer (hindi ang git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | I-pin ang ganitong uri ng tag para sa GitOps                              |

Multi-platform manifest: native na `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Awtomatikong pinipili ng Docker ang tumutugmang architecture; ipasa ang `--platform linux/amd64` kung kailangan mong puwersahin ang AMD64 emulation sa mga ARM host.

### Mga Release Channel

Nagpa-publish ang OmniRoute ng magkakahiwalay na Docker channel para sa mga stable release, pagsubok sa aktibong release branch, at mga development build.

| Channel                         | Pinagmulan                                         | Kakayahang mabago              | Inirerekomendang paggamit                                                                                                                                                |
| ------------------------------- | -------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Nilagdaan/may-bersyong release                     | Hindi nababago                 | Mga production deployment na naka-pin sa eksaktong release                                                                                                               |
| `:latest` / `:latest-web`       | Pinakamataas na **na-publish** na stable na SemVer | Nababagong stable pointer      | Sinusundan ang mga stable release **pagkatapos** ng isang SemVer publish job — **hindi** sinusubaybayan ang `main` o mga hindi pa nare-release na commit ng `release/v*` |
| `:next` / `:next-web`           | Kasalukuyang default na `release/v*` branch        | Nababagong pre-release pointer | Pagsubok sa mga pag-aayos na naisama na sa aktibong release branch ngunit wala pa sa isang stable release                                                                |
| `:main` / `:main-web`           | `main` branch                                      | Nababagong development pointer | Para lamang sa development at integration testing                                                                                                                        |

#### Mga web-session provider: ang mga `-web` image

Ang bawat channel sa itaas ay mayroon ding katumbas na `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), na binuo mula sa `runner-web` stage — ang parehong image kasama ang Playwright at isang Chromium browser. Ipinapadala ang karaniwang image nang **walang** Chromium; kailangan ito ng `gemini-web`, `claude-web` at `claude-turnstile`.

Naantala ang error at hindi ito nangyayari sa pagsisimula: inililista ng mga provider na iyon ang kanilang mga modelo at lumalabas bilang konektado sa dashboard, at ang unang request lamang ang nabibigo nang may

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kung ginagamit mo ang mga provider na iyon, i-pull ang `-web` tag ng channel na ginagamit mo na — wala nang ibang magbabago. Sa isang npm/CLI install (walang Docker image), ang katumbas na nawawalang bahagi ay ang browser binary: patakbuhin ang `npx playwright install chromium` sa host.

#### Paggamit sa pre-release channel

Ang channel na `next` ay muling bina-build sa bawat push sa kasalukuyang default na branch na `release/v*` at inilalathala para sa AMD64 at ARM64. Hindi ito maaaring ma-overwrite ng mas lumang mga maintenance branch. Nagbibigay ang channel ng image na maaaring i-pull para sa mga pag-aayos na nai-merge na sa aktibong release branch bago gawin ang susunod na stable tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para sa Docker Compose, i-override ang image tag na ginagamit ng napiling profile, pagkatapos ay i-pull at muling gawin ang service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Kaligtasan at pag-rollback

Ang `next` ay isang nagbabagong pre-release channel. Maaari itong magbago sa anumang push sa aktibong release branch at **hindi sinusuportahan para sa paggamit sa production**. I-pin ang image digest habang sinusuri ang isang partikular na build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Bago magsubok, i-back up ang data volume ng OmniRoute o ang bind-mounted na direktoryo ng data. Upang mag-rollback, ibalik ang dating ginamit na stable na bersyon o digest at muling gawin ang container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Hindi kailanman maililipat ng isang release-branch build ang `latest`; tanging isang kwalipikadong stable na semantic version lamang ang maaaring mag-promote sa stable pointer. Pinapanatili ng mga `next` image ang inspeksyon sa release image at ang gate na humaharang kapag may CRITICAL na kahinaan.

**Ang `latest` ay hindi garantiya na napapanahon ito sa git.** Ang mga na-merge na pag-aayos sa `main` o sa aktibong branch na `release/v*` ay **wala** sa `:latest` hangga't hindi nailalathala ang isang stable na SemVer image at hindi pino-promote ng publish job ang `:latest` (kaparehong digest ng SemVer na iyon). Kung tila hindi nagbabago ang `latest` kahit ipinapakita na ng GitHub ang pag-aayos, i-pull ang `:next` upang subukan ang release branch o hintayin ang SemVer tag.

| Ang gusto mo                                                                            | Gamitin                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / production na hindi dapat kusang magbago                                       | I-pin ang `:X.Y.Z` (o ang image digest) |
| Subaybayan ang mga nailathalang stable at tanggapin ang muling paggawa sa bawat release | `:latest`                               |
| Subukan ang mga hindi pa nailalathalang commit ng `release/v*`                          | `:next` (hindi para sa production)      |
| Subukan ang `main`                                                                      | `:main` (hindi para sa production)      |

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

| Pagpigil                                      | Bunga                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nag-iisang manunulat                          | Gawin** hindi** magpatakbo ng maraming replika laban sa parehong SQLite file. Na corrupt ang DB.                                                                                                                                                                                                                                                                              |
| Muling likhain / i-restart / HEALTHCHECK kill | **Full outage** ng in-flight SSE, mga session sa dashboard, at in-memory na estado. Bawat konektadong kliyente ay bumababa. Ang mga bagong kahilingan sa panahon ng window ng walang laman na endpoint ay nakakakuha ng reverse-proxy**`502 Bad Gateway: Unknown error`** , hindi OmniRoute JSON — hindi ito makilala ng mga kliyente mula sa pagkabigo ng provider (#11015). |
| Parehong loop ng kaganapan bilang `/healthz`  | Ang isang abalang catalog o compression tick ay maaaring maantala ang mga probe; isang maikling timeout pagkatapos ay i-restart ang** lamang** replika.                                                                                                                                                                                                                       |

**Probe matrix** (tingnan din [ang mga rekomendasyon sa pagsisiyasat ng Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Probe         | Target                                                      | Huwag gamitin                                                               |
| ------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Kasiglahan    | TCP sa `PORT` (default `20128`), o malambot HTTP `/healthz` | `/api/monitoring/health`                                                    |
| Kahandaan     | HTTP `GET /healthz`                                         | Mahigpit na pag-timeout na itinuturing na abala ang event-loop bilang patay |
| Malalim / tao | `/api/monitoring/health`                                    | Automated kubelet liveness                                                  |

**Mga upgrade:** asahan na babagsak ang bawat session. Alisin ang mga kliyente kung maaari mo; walang rolling update sa default SQLite. Papalitan din ng mag-compose ang `restart: unless-stopped` plus Docker `HEALTHCHECK` ang tanging proseso kapag hindi malusog ang container — parehong blast radius.

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

Hinahayaan `preStop` sleep si kube na mag-drop ng mga endpoint ng Serbisyo bago SIGTERM kaya** bago** humihinto ang trapiko sa proseso ng namamatay. In-flight `/v1/responses` SSE ay na-drain hanggang `SHUTDOWN_TIMEOUT_MS` (default 30s) sa pamamagitan ng heavyweight admission leases (#11015). Ang mga bagong kahilingan na umaabot pa rin sa proseso ay makakakuha ng `503` + `Retry-After: 5`. Ang Recreate empty-endpoint gap hanggang ang kapalit ay Ready ay nananatiling mahirap na pagkawala — iyon ay ang SQLite topology, hindi isang probe misconfig.

Ang panlabas Postgres / multi-writer HA ay** hindi** isang dokumentadong stock path. Kung kailangan mo ng HA, panatilihin ang isang solong replika o magpatakbo ng topology na sinubukan at naidokumento ng proyekto nang hiwalay. Ang Postgres/MySQL work ay nakatira sa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hanggang sa nagpapadala iyon, ang tanging suportadong paraan upang dumami** malaki** Ang kapasidad `/v1/responses` ay N independiyenteng mga proseso (susunod na seksyon), hindi `replicas > 1` sa isang volume.

## Scale-out: N independiyenteng proseso

Ang isang proseso ng Node ay **isang V8 heap**. Dalawang magkakapatong na ~3 MiB / ~750k-token na coding-agent na `POST /v1/responses` (RTK + Caveman) ang nagpapa-abort sa heap na iyon sa ~12 Gi (`FATAL ERROR: Reached heap limit`) at maaaring magdulot ng OOM sa isang 16 Gi cgroup. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ang sukat na iyon ay isang babala tungkol sa **badyet ng memory**, hindi isang ganap na maximum ng produkto na dalawang magkakasabay na mahabang `/v1/responses`. Ang pagpasok ng mabibigat na chat ay nililimitahan ng awtomatikong kinukuwentang badyet ng ingest bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) na ibinatay sa parehong limitasyon ng V8/cgroup — ang pag-override nito pataas (o ang pagtatakda ng legacy na request-count cap na `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) sa isang prosesong nakalaan na ang laki ay muling magdudulot ng abort. Ang maliliit na chat, `/healthz`, `/v1/models`, at MCP ay **hindi** kasama sa cap na iyon.

### Isang proseso: higit sa dalawang mahabang `/v1/responses`

Ang isang **malusog** na proseso (heap na mas mababa sa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default na `0.75`) ay **maaaring** magpatakbo ng higit sa dalawang magkakasabay na mahabang `POST /v1/responses` kapag may natitira pang espasyo sa badyet ng inflight bytes sa buong proseso (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Ang mga body na nasa o lampas sa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default na 256 KiB) ay kumukuha ng parehong heavyweight lease gaya ng mga request na mabigat sa istruktura at gumagamit ng parehong [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) na `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ang sampu-sampung magkakasabay na mahahabang SSE client (madalas na kailangan ng mga operator ang 40–50) ay isang usapin ng **badyet ng memory** — iangkop ang laki ng heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — at hindi isang ganap na limitasyon ng produkto na “max 2.” Ang isang heap na nasa ilalim ng pressure ay nagbabawas pa rin ng load gamit ang retryable na `503` upang hindi maulit ang #7849.

Upang **paramihin ang mga heap** (mga independiyenteng V8 old-space) **ngayon**:

| Gawin                                                                                                                                                                   | Huwag gawin                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Magpatakbo ng **N container/pod**, bawat isa ay may **sarili nitong** `DATA_DIR` / volume                                                                               | Magtakda ng `replicas > 1` para sa iisang SQLite file              |
| Iangkop ang heavy in-flight + healthy-headroom batay sa heap / badyet ng inflight bytes; ang 1–2 ay konserbatibong default ng #7849, hindi ganap na maximum ng produkto | Bigyan ang isang proseso ng 8× RAM at walang limitasyong count cap |
| Opsyonal: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para sa **mga nakabahaging quota counter**                                                               | Ituring ang Redis bilang nakabahaging SQLite — hindi ito ganoon    |
| Kopyahin ang mga provider secret sa bawat instance (o tanggapin ang magkakahiwalay na dashboard)                                                                        | Umasa sa iisang dashboard / iisang call-log sa lahat ng instance   |
| Ilagay sa likod ng anumang load balancer; sapat na ang sticky routing ayon sa API key o session                                                                         | Mangailangan ng vendor-specific na size-aware middleware           |

Hardware: ang magkakasabay na mahahabang `/v1/responses` sa bawat instance ay isang usapin ng **badyet ng memory** (heap + inflight-byte / #10110). Pinararami pa rin ng `N` independiyenteng `DATA_DIR` ang mga heap: kailangang masuportahan ng host RAM ang `N × cgroup`, hindi “isang 16 Gi pod na may N=8.” Huwag kailanman gumamit ng `replicas > 1` sa iisang SQLite file.

Halimbawa ng Compose (dalawang heap, dalawang volume — hindi `deploy.replicas: 2`):

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

Ang in-process density (compression sa labas ng HTTP isolate) ay nasa [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ang isang lohikal na cluster sa nakabahaging durable state ay nasa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Mga panrehiyong error ng Gemini sa loob ng Docker

Maaaring magbalik ang Google AI Studio / Gemini API ng HTTP 400 na may FAILED_PRECONDITION at
`User location is not supported for the API use.` Hindi pinatutunayan ng matagumpay na kahilingan sa host
na gumagamit ang container ng parehong outbound route. Maaaring magkaiba ang pagkakasunod-sunod ng DNS,
konektibidad ng IPv4/IPv6, pagruruta ng VPN, at mga naka-configure na proxy. Suriin ang
[mga sinusuportahang rehiyon ng Google](https://ai.google.dev/gemini-api/docs/available-regions)
pati ang aktuwal na ruta ng koneksyon; hindi natutukoy ng error na ito lamang kung hindi wasto ang API key.

### Mas piliin ang proxy na partikular sa koneksyon

Gamitin ang [configuration ng proxy para sa bawat koneksyon](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ng OmniRoute para sa apektadong koneksyon sa Gemini, pagkatapos ay ulitin ang **Subukan ang Koneksyon** at isang maliit na kahilingan
gamit ang parehong model. Pinananatili nitong nakatuon sa koneksyong iyon ang pagbabago sa pagruruta. Tiyaking
naaabot ang proxy mula sa container, at talagang pinipili ito ng koneksyon.
Hindi ginagarantiya ng pagbabago sa ruta ang pagiging kwalipikado sa rehiyon ng upstream.

### Paghambingin ang networking ng host at container

Panatilihing magkapareho ang key, model, at kahilingan kapag naghahambing ng mga authenticated na resulta; huwag kailanman
mag-paste ng mga credential, password ng proxy, o kumpletong authorization header sa isang issue.
Suriin muna kung aling mga address family ang iniaalok ng OS resolver, gamit ang parehong command
sa host at sa loob ng container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Palitan ang `omniroute` ng service na pinapatakbo mo (halimbawa, `omniroute-web`). Ang mga
command na ito ay nagpi-print ng mga address family nang walang mga credential o IP address. Ang ibinalik na `6`
ay nagpapakita lamang ng resulta ng IPv6 DNS: **hindi** nito pinatutunayan na may nagagamit na IPv6 route o API access.
Kung naka-install ang `curl`, paghambingin ang `curl -4 -I https://generativelanguage.googleapis.com`
at `curl -6 -I https://generativelanguage.googleapis.com` sa parehong environment.
Pinatutunayan ng isang HTTP response ang konektibidad para sa probe na iyon, kahit isa itong hindi authenticated na
error; tanging ang authenticated na kahilingan sa model ang sumusubok sa pagiging kwalipikado sa Gemini.

### Alternatibo sa antas ng host: gumaganang IPv6 at patakaran ng resolver

Naibalik ng nag-ulat ng [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ang
access sa kanilang environment sa pamamagitan ng pag-enable ng IPv6 ng container at pagbabago sa pagpili
ng address ng glibc. Ituring ito bilang alternatibong partikular sa environment. Kumpirmahing gumagana ang IPv6
ng host, ang egress/pagruruta ng container, at ang mga panuntunan ng firewall bago baguhin ang mga preference ng resolver.
Ang isang pribadong ULA address lamang ay hindi nagpapatunay ng pampublikong konektibidad ng IPv6.

Para sa mga service na nakakabit na sa default network ng Compose, ine-enable ng fragment na ito
ang IPv6 sa network na iyon; panatilihin ang natitirang bahagi ng iyong service, mga port, volume, at configuration:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para sa isang pinangalanang network, i-enable ito sa network na aktuwal na sinasalihan ng service. Maaaring
maglaan ang Docker ng ULA subnet; pumili lamang ng tahasan at hindi nagsasapawang subnet kapag kinakailangan
ito ng iyong network. Tingnan ang [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
at [mga opsyon sa network ng Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Sa isang **image na nakabatay sa glibc**, maaaring baguhin ng `/etc/gai.conf` ang pagpili ng address. Gumagamit
ng Debian ang kasalukuyang Dockerfile ng repository; hindi gumagamit ng parehong mekanismo ang mga custom na image na nakabatay sa musl.
Binabago ng iniulat na pagsasaayos ang ULA label mula `label fc00::/7 6` patungong
`label fc00::/7 1`. Magsimula sa kumpletong policy table ng image at panatilihin ang iba pa nitong
mga entry: pinapalitan ng pagdaragdag ng isang `label` o `precedence` na entry ang default na table na iyon, kaya hindi
sapat ang isang file na naglalaman lamang ng binagong linya. Idinodokumento ng
[reference sa configuration ng glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ang mga semantikang iyon. I-bind-mount ang nasuring file bilang read-only sa `/etc/gai.conf`
at muling likhain ang service upang mailapat ito.

Binabago nito ang pagpili ng address ng OS para sa **lahat ng outbound traffic sa container na iyon**.
Hindi nito pinipilit ang bawat application na piliin ang IPv6: mahalaga rin ang pagkakasunod-sunod ng DNS at pagpili
ng koneksyon ng Node. Sa partikular, mas pinipili ng `--dns-result-order=ipv4first` ang IPv4 at
hindi ito solusyon para sa isang pagkabigong nauugnay sa IPv4 lamang. Tingnan ang [pagkakasunod-sunod ng DNS ng Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Muling subukan ang Gemini at ang iba mo pang provider pagkatapos ng anumang pagbabago sa antas ng host. Upang ibalik
ang dating configuration, alisin ang custom na `gai.conf` mount, ibalik ang nakaraang network configuration, at
muling likhain ang apektadong service/network sa panahon ng maintenance window. Maaaring maantala ng muling paglikha ng network
ang iba pang container na nakakabit dito; huwag burahin ang persistent data volume.

## Mahahalagang Tala

- **SQLite WAL Mode:** Dapat hayaang matapos ang `docker stop` upang mai-checkpoint ng OmniRoute ang mga pinakabagong pagbabago pabalik sa `storage.sqlite`. Nakatakda na sa mga kasamang Compose file ang 40s na palugit sa paghinto. Kung direkta mong pinapatakbo ang image, panatilihin ang `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Itakda sa `true` kung ang mga regular/paunang-write na backup ay pinamamahalaan sa labas. Nangangailangan pa rin ang mga migration ng kasalukuyang database ng sarili nitong matibay na safety snapshot at pananggalang laban sa maramihang migration.
- **Pagpapanatili ng Data:** Palaging mag-mount ng volume sa `/app/data` upang mapanatili ang iyong database, mga key, at mga configuration sa bawat pag-restart ng container.
- **Configuration ng Port:** I-override ang `PORT` environment variable upang baguhin ang default na port na `20128`.

## Tingnan Din

- [Gabay sa Pag-deploy sa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Pag-setup ng VM + nginx + Cloudflare
- [Gabay sa Pag-deploy sa Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Mag-deploy sa Fly.io
- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Kumpletong sanggunian ng `.env`
