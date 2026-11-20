# 🐳 Docker Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Ntụaka zuru ezu maka ibunye Docker. Maka ibido ngwa ngwa, lee [ngalaba Docker dị na README](../README.md#-docker).

## Ndepụta Ihe Dị N'ime

- [Ịgba Ọsọ Ngwa Ngwa](#quick-run)
- [Iji Faịlụ Gburugburụ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profaịlụ Ndị Dị](#available-profiles)
- [Ịhazigharị ngwa CLI nke host mgbe OmniRoute na-arụ ọrụ n'ime Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose Maka Production](#production-compose)
- [Nzọụkwụ Dockerfile](#dockerfile-stages)
- [Promagbanwe Gburugburụ Ndị Dị Mkpa](#critical-environment-variables)
- [Docker Compose na Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Mkpado Image](#image-tags)
- [Mmelite Dashboard n'ime Docker](#dashboard-updates-in-docker)
- [Nnweta: SQLite ndabara na-akwado naanị otu replica](#availability-default-sqlite-is-single-replica)
- [Njehie mpaghara Gemini n'ime Docker](#gemini-regional-errors-inside-docker)
- [Ihe Ndị Dị Mkpa Ịmara](#important-notes)

---

## Ọsọ ọsọ

> **Onye nnabata onwe ya n'otu iwu?** Hụ [ntuziaka onye ọbịa nke onwe](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (onyinyo ebipụtara + Redis, loopback-only, enweghị nhọrọ profaịlụ). Ọsọ ọsọ ọsọ dị n'okpuru bụ ụzọ otu akpa maka ndị ọrụ agbagoro Redis n'ebe ọzọ.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Site na faịlụ gburugburu

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
# Profaịlụ ntọala (enweghị ngwa CLI)
docker compose --profile base up -d

# Profaịlụ CLI (Claude Code, Codex, OpenClaw arụnyere n'ime ya)
docker compose --profile cli up -d

# Profaịlụ host (e bu ụzọ chepụta maka Linux; na-mount binary CLI nke host dị ka read-only)
docker compose --profile host up -d

# Profaịlụ web (Chromium/Playwright maka ndị na-eweta ọrụ web-session)
docker compose --profile web up -d

# Jikọta CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profaịlụ Ndị Dị

OmniRoute na-abịa na profaịlụ Compose maka ụdị mbunye ndị bụ isi. Họrọ nke dabara na gburugburụ gị.

| Profaịlụ         | Ọrụ              | Mgbe a ga-eji ya                                                                                                                          | Iwu                                          |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ndabara) | `omniroute-base` | Sava na-enweghị interface eserese / runtime kacha nta, enweghị CLI nke ndị na-eweta ọrụ etinyere n'ime ya                                 | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Usoro ọrụ agentic ndị na-akpọ `omniroute providers/setup/doctor` na CLI ndị etinyere n'ime ya (Codex, Claude Code, Droid, OpenClaw)       | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Host Linux chọrọ nnweta yiri `network_mode` na CLI nke host site na ị-mount `~/.local/bin`, `~/.codex`, `~/.claude`, wdg. dị ka read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Gbaa [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar na port `8317` maka proxy CLI upstream                           | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Ndị na-eweta ọrụ web-session chọrọ browser: `gemini-web`, `claude-web`, `claude-turnstile` (na-build `runner-web`, Chromium dị n'ime)     | `docker compose --profile web up -d`         |

> Enwere ike ijikọta ọtụtụ profaịlụ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ịhazigharị ngwa CLI nke kọmputa nnabata mgbe OmniRoute na-arụ ọrụ n'ime Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na bọtịnụ
**Chekwaa nhazi** dị na dashboard na-ede faịlụ dịka `~/.codex/*.config.toml`. Ụzọ ndị ahụ
nwere naanị ihe ha pụtara n'igwe ebe CLI ahụ na-arụ ọrụ n'ezie. Ọ bụrụ na ị mee ha
n'ime container, ihe a na-ede ga-abanye na home nke container ahụ (`/home/node` —
image ahụ na-arụ ọrụ dịka `USER node`), ebe CLI ọ bụla dị na kọmputa nnabata na-agaghị
agụ ya ma a ga-ehichapụkwa ya ozugbo e megharịrị container ahụ.

OmniRoute na-achọpụta nke a ma jụ ide ihe ahụ, na-enye ntuziaka kama
ịkọ na ọ gara nke ọma mgbe ị na-enweghị ike iji ya: CLI na-eji `2` kwụsị, API na-azakwa `422`
ya na `containerEphemeralTarget: true`.

### Nke akwadoro: mee ka CLI rụọ ọrụ na kọmputa nnabata, ebe OmniRoute na-arụ ọrụ n'ime Docker

Container ahụ na-enye API; CLI na-ahazi ngwa ndị dị na kọmputa nnabata gị.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # mee ka CLI rụtụ aka na container ahụ
omniroute setup-codex                      # na-ede ezigbo ~/.codex na kọmputa nnabata gị
```

Nke a bụ nhọrọ ziri ezi mgbe Codex, Claude Code, Cursor ma ọ bụ ngwa yiri ha na-arụ ọrụ na
laptop gị — nke bụ nhazi a na-ahụkarị.

### Nhọrọ ọzọ: jiri bind-mount tinye ebe ndekọ nhazi nke kọmputa nnabata (profaịlụ `host`)

Ọ bụrụ na ịchọrọ ka container ahụ n'onwe ya dee nhazi kọmputa nnabata gị, tinye
ebe ndekọ ndị ahụ site na mount ma mee ka `CLI_CONFIG_HOME` rụtụ aka na mgbọrọgwụ mount ahụ. Profaịlụ `host`
emelarị nke a:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount bụ ihe na-eme ka ụzọ ahụ bụrụ nke a pụrụ ịtụkwasị obi: OmniRoute na-agụ
`/proc/self/mountinfo` ma kwe ka e dee ihe n'ụzọ ndị e tinyere site na mount (nakwa n'ebe ndekọ
nke ụmụ ya bụ mount, nke bụ kpọmkwem ụdị `/host-home` dị n'elu), ma
ka na-ajụ ndị a na-etinyeghị site na mount.

### Ụzọ mgbapụ: hazie CLI nke container ahụ n'onwe ya (jiri ya naanị mgbe ọ dị mkpa)

Mgbe CLI ndị ahụ nọ n'ezie n'ime container (profaịlụ `cli`), ide ihe ahụ
bụ nke e bu n'obi mee. Nyefee `--allow-container-write` na iwu `setup-*` ọ bụla, ma ọ bụ tọọ
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` maka sava ahụ. Ide ihe ahụ ga-aga n'ihu
ya na ịdọ aka ná ntị na ọ gaghị adịgide mgbe container ahụ kwụsịrị ịdị.

> **Ịdọ aka ná ntị gbasara nchekwa — profaịlụ `cli` + mount nke `docker.sock`.**
> Profaịlụ `cli` na-eji bind-mount tinye `/var/run/docker.sock` ka ngwa
> mmelite akpaaka dị n'ime container nwee ike imegharị stack ahụ site na daemon nke kọmputa nnabata
> (`src/lib/system/autoUpdate.ts` na-enyocha ma socket ahụ ọ dị ma hapụ ụzọ
> Docker mgbe ọ na-adịghị). Socket ahụ bụ **oke ntụkwasị obi nke root kọmputa
> nnabata**: ihe ọ bụla nwere ike iru ya na-achịkwa daemon Docker nke kọmputa nnabata dịka
> root — ọ nwere ike ịmepụta, nyochaa, kwụsị ma wepụ container ọ bụla na kọmputa nnabata.
> Ihe nke a pụtara:
>
> 1. **Ekpughela ọdụ ụgbọ mmiri profaịlụ `cli` na netwọkụ ma ọlị.** Bipụta
>    ya na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profaịlụ `cli` nke LAN nwere ike iru na-eme ka RCE ọ bụla n'ogo dashboard
>    bụrụ nbibi zuru oke nke kọmputa nnabata.
> 2. **Ejila bind tinye ebe ndekọ kọmputa nnabata ndị ọzọ n'ime profaịlụ `cli`.**
>    Socket Docker tinyere mount ọ bụla ọzọ na-enye container ikike zuru oke
>    ịgụ/dee na filesystem na nhazi kọmputa nnabata gị. Ọ bụrụ na ịchọrọ ka otu ngwa
>    hụ otu project, jiri binary CLI mee ya na kọmputa gị — etinyela ya site na mount
>    n'ime container `cli`.
>
> Ọ bụrụ na ịchọghị mmelite akpaaka n'ime container, agbanyela profaịlụ `cli`
> (`COMPOSE_PROFILES=core,redis` ma ọ bụ nke dị mkpụmkpụ). Profaịlụ ndị ọzọ anaghị
> etinye socket Docker site na mount.
>
> Hụ `docs/security/MITM-TPROXY-DECRYPT.md` (git; a naghị akpụnye ya n'ime `/docs`) maka ụdị iyi egwu metụtara
> MITM, nakwa `docs/security/SUPPLY_CHAIN.md` maka usoro mmalite binary
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute na-adabere na Redis iji kwado ihe mgbochi ọnụego kesara ekesa na cache e kekọrịtara. A na-akọwa ọrụ `redis` **mgbe niile** na `docker-compose.yml` (ọ nweghị mgbochi profaịlụ), ọ na-amalitekwa yana profaịlụ ọ bụla ọzọ.

| Nkọwa                | Uru                                        |
| -------------------- | ------------------------------------------ |
| Ihe oyiyi            | `redis:7-alpine`                           |
| Aha konteena         | `omniroute-redis`                          |
| Ọdụ ụgbọ mmiri ime   | `6379`                                     |
| Ọdụ host (mgbanwe)   | `REDIS_PORT` (ndabara bụ `6379`)           |
| Njikọ host (mgbanwe) | `REDIS_BIND_HOST` (ndabara bụ `127.0.0.1`) |
| Voluum               | `omniroute-redis-data` → `/data`           |
| Nlele ahụike         | `redis-cli ping` (oghere nke 10s)          |

Mgbanwe gburugburu metụtara ya:

- `REDIS_URL` — eriri njikọ a na-etinye n'ime ngwa (`redis://redis:6379` na ndabara).
- `REDIS_PORT` — nhazi ọdụ ụgbọ mmiri n'akụkụ host maka konteena Redis.
- `REDIS_BIND_HOST` — interface host ebe a na-ebipụta ọdụ ụgbọ mmiri ahụ. Ndabara bụ `127.0.0.1`.

> **Ihe mere loopback ji bụrụ ndabara:** sidecar ahụ na-agba ọsọ na-enweghị `requirepass`, konteena
> ngwa ndị ahụ na-esikwa na netwọkụ compose (`redis:6379`) ruo ya — ọdụ ụgbọ mmiri e bipụtara dị
> naanị maka ngwaọrụ ndị dị n'akụkụ host (`redis-cli`, `npm run dev` mpaghara). Ibi ya na
> `0.0.0.0` ga-eme ka Redis na-enweghị nkwenye njirimara pụta ìhè nye host niile dị na LAN gị. Ọ bụrụ na ịtọ
> `REDIS_BIND_HOST=0.0.0.0`, tinyekwa `--requirepass` na `command:` nke ọrụ ahụ.

A naghị atụ aro **ịkwụsị Redis** (ihe mgbochi ọnụego ga-adalata gaa na nchekwa in-memory ndabere). Ọ bụrụ na ị ga-emerịrị ya, wepụ/tinye akara nkọwa na blọk ọrụ `redis:` dị na `docker-compose.yml`, ma ọ bụ belata ya ruo efu:

```bash
docker compose up -d --scale redis=0
```

## Compose Mmepụta

Maka snapshot mmepụta dịpụrụ adịpụ nke na-agba ọsọ yana dev, jiri `docker-compose.prod.yml`.

| Nkọwa                 | Uru                                                                                |
| --------------------- | ---------------------------------------------------------------------------------- |
| Faịlụ                 | `docker-compose.prod.yml`                                                          |
| Ọdụ dashboard ndabara | `PROD_DASHBOARD_PORT=20130` (e jikọtara ya na `${DASHBOARD_PORT:-20128}` nke ime)  |
| Ọdụ API ndabara       | `PROD_API_PORT=20131`                                                              |
| Ihe oyiyi             | `omniroute:prod` (e wuru site na target `runner-cli`)                              |
| Konteena Redis        | `omniroute-redis-prod` (`redis:8.6.2`, voluum `redis-prod-data` nke ya)            |
| Voluum data           | `omniroute-prod-data` (nwere aha, na-adịgide mgbe ewughachiri ya)                  |
| Nlele ahụike          | `node healthcheck.mjs` + `redis-cli ping`, ebe `depends_on` dabere na ahụike Redis |

Otu esi eji ya:

```bash
# Wuo ma malite stack mmepụta
docker compose -f docker-compose.prod.yml up -d --build

# Gosipụta log ka ha na-abata
docker compose -f docker-compose.prod.yml logs -f

# Kwụsị ya (debe voluum ndị ahụ)
docker compose -f docker-compose.prod.yml down
```

Stack prod ahụ na-agba ọsọ n'otu oge na compose dev (aha konteena, ọdụ ụgbọ mmiri, na voluum dị iche iche), ya mere ị nwere ike ịga n'ihu na-eme mgbanwe na mpaghara ebe mmepụta ka na-agba ọsọ.

## Usoro Dockerfile

Ebe nchekwa ahụ na-ebupu Dockerfile multi-stage (`Dockerfile`). A na-ekpughe ọkwa anọ; họrọ `target` ziri ezi maka ikpe ojiji gị.

| Ogbo          | Onyonyo isi           | Ebumnuche                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Wụnye deps (`npm ci --legacy-peer-deps`) ma na-agba `npm run build` (Turbopack na ndabara — akụrụngwa oge-ewu n'okpuru)                                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Oge mmepụta ihe na mmepụta Next.js kwụ ọtọ.** Ọ nweghị onye na-eweta CLIs jikọtara.**                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Na-agbakwụnye `git`, `docker.io`, `docker-compose` na CLIs zuru ụwa ọnụ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Họrọ nke a maka usoro ihe eji arụ ọrụ.**                                                                                                   |
| `runner-web`  | `runner-base`         | Na-agbakwunye Playwright + ihe nchọgharị Chromium (`--with-deps`) maka ndị na-eweta oge webụ: `gemini-web`, `claude-web`, `claude-turnstile`.** Họrọ nke a mgbe ị na-eji ndị na-eweta ya** — onyonyo dị larịị na-ada n'oge arịrịọ na-enweghị ya (lee ndetu `-web` n'okpuru ọwa mwepụta). |

Jiri aka wuo otu ebumnuche:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ihe eji eme ihe oge

Atọ wuru args na-achịkwa ihe ọkwa `builder` na-efu. Ha bụ oge-mgbe naanị — `OMNIROUTE_MEMORY_MB` (n'okpuru) bụ ihe dị iche, oge ịgba ọsọ.

| Mee arg                     | Ọdabara | Mmetụta                                                                                 |
| --------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` ji akpa webụ wuo: ebe nchekwa dị ala, jiri nwayọ nwayọ. `1` na-abanye na Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 kpokọtara elu ụlọ (`--max-old-space-size`) maka `next build` a kpara akpa .          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Nri `CIRCLE_NODE_TOTAL`; Ọzọ na-enweta `workers = N - 1` maka mkpokọta data ibe.        |

`OMNIROUTE_BUILD_WORKERS` bụ onye na-ebuli elu n'elu nnukwu onye na-ewu ụlọ na onye na-enyo enyo mgbe ụlọ nwere mmachi nwụrụ** emechaa** `✓ Compiled successfully`. Onye ọrụ ibe-data ọ bụla bụ usoro nke ya, ya mere nne na nna `next build` n'onwe ya; mmeputakwa VPS dị ndụ (okwu #7518) tụrụ usoro kachasị elu RSS na ~ 4.5 GB na-adabereghị na ọkọlọtọ `NODE_OPTIONS` kpokọtara (Turbopack na-achịkọta na ebe nchekwa native/Rust na mpụga obo V8). Akara ndabara nke `2` (onye ọrụ → 1, ngụkọta usoro 2) maka ndị ọgba ọsọ 16 GB / 4 vCPU GitHub kwadoro ndị na-ebipụta pipeline na-eji. Na `8` (ndị ọrụ → 7) onye na-agba ọsọ ahụ agwụla ebe nchekwa na buildkit dara nzọụkwụ na `ResourceExhausted: ... cannot allocate memory`; `3` (ndị ọrụ → 2) adabaghị ozugbo a tụrụ usoro RSS ozugbo kama ịtụnye ya. `tests/unit/docker-build-memory-budget.test.ts` na-eme mgbakọ na mwepụ megide ọnụ ọgụgụ a tụrụ wee daa ma ọ bụrụ na otu isi na-eto onye na-agba ọsọ.

Turbopack na-achịkọta na ebe nchekwa ajari dị ndụ** n'èzí** obo V8, ya mere `OMNIROUTE_BUILD_MEMORY_MB` anaghị agbụ ya. N'elu onye ọbịa nwere uko ụlọ ebe nchekwa ihe a na-ewu SIGKILLed site na onye na-egbu OOM na-enweghị ederede ọ bụla — ọ na-akwụsị n'etiti `Creating an optimized production build`, nke na-agụ dị ka kpọgidere kama ịbụ ihe na-enweghị ncheta. Ọ bụ ya mere `Dockerfile` na-adaba na webpack (`OMNIROUTE_USE_TURBOPACK=0`), n'adịghị ka `npm run dev` / `npm run build`, ebe Turbopack bụ koodu ndabara: `docker build .` na-enweghị ihe ọ bụla na-arụ ọrụ args (ihe okporo ụzọ ụgbọ okporo ígwè na ndị ọzọ otu-pịa ndị ọbịa na-agba ọsọ) agaghị anwụ na nzuzo na onye na-ewu ebe nchekwa. Onyonyo ebipụtara agafeela `OMNIROUTE_USE_TURBOPACK=0` n'ụzọ doro anya na `docker-publish.yml`. N'elu onye na-ewu ụlọ nwere ọtụtụ RAM, banye Turbopack maka wuo ngwa ngwa:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

agbanyere `webpackBuildWorker`, yabụ `next build` na-agba nne na nna** na** usoro onye ọrụ na onye ọ bụla na-asọpụrụ `OMNIROUTE_BUILD_MEMORY_MB` iche iche. Mee elu ụlọ nke akpa ahụ n'elu ihe ruru okpukpu abụọ karịa uru ahụ, ọ bụghị otu ugboro.

A tụrụ n'elu osisi a (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler    | Uko ụlọ akpa   | Nsonaazụ                          |
| ---------- | -------------- | --------------------------------- |
| Turbopack  | 8 GiB / 16 GiB | OOM-gburu na abụọ, nkiti          |
| akpa weebụ | 8 GiB          | wu onye ọrụ SIGKILLed             |
| akpa weebụ | 12 GiB         | gara nke ọma, gbagoro na 11.1 GiB |

### Ọdịnihu nke oge ojiri gaa

Mbupu site na `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Omume ebe nchekwa na Docker:

- Ihe onyonyo a na-esetịpụ `OMNIROUTE_MEMORY_MB=1024` wee nweta `NODE_OPTIONS=--max-old-space-size=1024` na ya.
- A na-amalite usoro ihe nkesa n'ezie site na onye na-ebupụta ihe kwụ ọtọ, nke na-agụ `OMNIROUTE_MEMORY_MB` ma tinye `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node na-eji uru `--max-old-space-size` ikpeazụ emegharịrị, yabụ ịtọlite `OMNIROUTE_MEMORY_MB` na-ejikwa oke mkpọ Docker dị irè.
- N'ihi na onyonyo a na-edobe ya mgbe niile, ndaghachi azụ nke RAM nke onye nrụpụta anaghị emetụta n'okpuru Docker. Welite ya n'ụzọ doro anya maka ibu ọrụ (okpokoro dị n'okpuru). `2048` ka dị obere maka onye nnọchite koodu `/v1/responses`.

### Oge ojiri gaa RAM maka ndị nnọchite koodu

Ihe ndabara 1 GiB Docker bụ ala dashboard/light-chat, ọ bụghị nha mmepụta. Ogologo `POST /v1/responses` (ọtụtụ narị ozi, iri ngwaọrụ) na-ejigide ọtụtụ eserese ebe nchekwa n'oge mkpakọ. Arịrịọ abụọ jikọtara ~ 3 MiB / ~ 750k akwụsịla V8 na a.** 12 GiB** Oghere ochie (`FATAL ERROR: Reached heap limit`) ma kụọkwa otu 16 GiB cgroup OOM. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nha** otu `--memory` n'elu ikpo** — nwa afọ buffers, SQLite, na mkpakọ etiti na-anọdụ na mpụga V8.

| Ibu ọrụ                                | `OMNIROUTE_MEMORY_MB`    | Akpa / otu          | Ihe ndetu                                                                                               |
| -------------------------------------- | ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------- |
| Dashboard, otu nkata ọkụ               | `1024` (ndabara onyonyo) | ≥2 GiB              |                                                                                                         |
| Otu onye ọrụ koodu (Claude/Codex/Grok) | `8192`                   | ≥10 GiB             | Otu oge `/v1/responses`                                                                                 |
| `/v1/responses` abụọ na-ejikọta ọnụ    | `10240`–`12288`          | ≥12–16 GiB          | Atụtara V8 ime na ~ 12 GiB ikpo                                                                         |
| Atọ + n'otu oge ogologo okirikiri      | emela n'otu usoro        | serialize / ọzọ RAM | Nbanye dị arọ nke ezighi ezi bụ 1 n'ime ụgbọ elu; na-ebuli ya na-enweghị RAM na-eweghachite ime ime ahụ |

`omniroute serve` on iferi metal calibrates ~ 35% nke RAM (clamped `[512, 4096]`) mgbe `OMNIROUTE_MEMORY_MB` bụ** ịtọhapụ** . Docker na-edobe `1024` mgbe niile, nke mere na nhazigharị agaghị aga na onyonyo gọọmentị.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Mgbanwe Gburugburụ Dị Oke Mkpa

E wezụga ndabara ndị edepụtara na [ENVIRONMENT.md](../reference/ENVIRONMENT.md), mgbanwe ndị a bụ ndị kacha mkpa mgbe a na-arụ ọrụ n'okpuru Docker:

| Mgbanwe                       | Ebumnuche                                                                                                                                                                                                                                                              | Ndabara                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Ihe nzuzo a na-ekekọrịta maka njikọ WebSocket. **Achọrọ ya na production** — tọọ ya ka ọ bụrụ eriri mkpụrụedemede siri ike nke emepụtara n'usoro enweghị atụ.                                                                                                          | atọọbeghị (a ga-enye ya)  |
| `REDIS_URL`                   | Eriri njikọ maka rate limiter / cache backend                                                                                                                                                                                                                          | `redis://redis:6379`      |
| `REDIS_PORT`                  | Port dị n'akụkụ host maka container Redis e tinyere n'usoro                                                                                                                                                                                                            | `6379`                    |
| `REDIS_BIND_HOST`             | Interface host nke a na-ebipụta port Redis e tinyere n'usoro na ya (loopback belụsọ ma ị gbakwunye AUTH)                                                                                                                                                               | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ụzọ host a na-etinye n'ime profaịlụ `cli` na `/workspace/omniroute` maka usoro ọrụ mmelite onwe                                                                                                                                                                        | `.` (directory dị ugbu a) |
| `OMNIROUTE_MEMORY_MB`         | Oke heap Node n'oge ọrụ maka sava Docker standalone; ọ na-anọchi ndabara image dị n'elu. Ndị nnọchiteanya coding: `8192`+ (lee [RAM oge ọrụ](#runtime-ram-for-coding-agents)).                                                                                         | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Na-anọchi port ndị ekpughere maka dashboard (20128) na API (20129)                                                                                                                                                                                                     | `20128` / `20129`         |
| `APP_BIND_HOST`               | Interface host nke docker-compose na-ebipụta port dashboard/API/live-WS na ya. Site na `REQUIRE_API_KEY=false` (ndabara), `0.0.0.0` na-ekpughere LAN proxy `/v1` na-enweghị njirimara — gbasaa ya naanị site na `REQUIRE_API_KEY=true` ma ọ bụ reverse proxy dị n'ihu. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | Interface host nke docker-compose na-ebipụta sidecar `cliproxyapi` na ya — data volume ya na-edobe ozi njirimara provider.                                                                                                                                             | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Directory nke runtime plugin scanner na-agụ ma na-etinye ihe n'ime ya. Tọọ ya mgbe ejiri bind mount tinye plugins: ndabara na-eso `HOME`, nke image nwere ike ọ gaghị ebupụta.                                                                                         | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | Ụzọ nta URL mgbe e bipụtara app n'azụ reverse proxy (dịka `/omniroute`)                                                                                                                                                                                                | _(oghere = root)_         |
| `NEXT_PUBLIC_BASE_URL`        | Origin ọhaneze nke browser gụnyere ụzọ nta ahụ (dịka `https://host/omniroute`)                                                                                                                                                                                         | atọọbeghị                 |
| `PROD_DASHBOARD_PORT`         | Port dashboard dị n'akụkụ host maka `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                   |
| `CLIPROXYAPI_PORT`            | Port dị n'akụkụ host maka sidecar `cliproxyapi`                                                                                                                                                                                                                        | `8317`                    |

## Weghachite Proxy n'obere ụzọ (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Mepụta ihe nrụpụta (atụ aro)

Tọọ mgbanwe abụọ ahụ na `.env`, wee wughachi ya ka onyonyo na oge ọsọ kwekọrịta:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` na-aga n'ihu `OMNIROUTE_BASE_PATH` dị ka Docker ewu-arg na dị ka oge gburugburu gburugburu.

### Oyiyi mgbọrọgwụ arụgoro nke ọma + oge osote ụzọ

A na-ewu onyonyo `cheaperinference/omniroute:*` ebipụtara maka mgbọrọgwụ ngalaba. Ị ka nwere ike ịtọ `OMNIROUTE_BASE_PATH` n'oge ọ na-agba ọsọ; akpa ahụ na-akwachi ùkwù otu ugboro na mmalite. Jikọọ ya na mmalite ọha dabara adaba:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Hazie proxy azụ ka ibugharịa ya** juputara** ụzọ mpụga (Edopụla prefix). Traefik kwesịrị iji `PathPrefix(`/omniroute `)` gaa na akpa na-enweghị `StripPrefix`, yabụ Next.js na-enweta `/omniroute/...` ma na-enye akụ site na `/omniroute/_next/...`.

Healthcheck Docker na-enyocha ebe ngwụcha okirikiri ndụ `/healthz` dị fechaa nke `OMNIROUTE_BASE_PATH` na-arụ ọrụ. `/api/monitoring/health` ka dị maka nchọpụta human/dashboard ; iji tụọ akpa HEALTHCHECK azụ na ya (dịka ọmụmaatụ maka mmanye ahụike miri emi), tọọ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ụzọ ahụ bụ a** miri emi** lelee (DB + nlekota nchịkọta nhọrọ) — dabara maka Docker's na `HEALTHCHECK` adịghị adịkarị ma ọ bụrụ na ị banyeghachi, mana** ọ bụghị** maka Kubernetes `livenessProbe` etiti oge.

Maka ndị egwu egwu (Kubernetes, Nomad, wdg):

| Nyocha           | Mmasị                                                                          | Zere                                                                     |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Ịdị ndụ          | HTTP `GET /livez`, ma ọ bụ TCP na isi ọdụ ụgbọ mmiri (`PORT`, ndabara `20128`) | `/api/monitoring/health` dị ka ndụ                                       |
| Njikere          | HTTP `GET /healthz`                                                            | Oge nkwụsịtụ siri ike na-ewere mmemme-loop na-arụ ọrụ ka onye nwụrụ anwụ |
| Deep / igbe ojii | `/api/monitoring/health`                                                       | —                                                                        |

`/healthz` na-akọ usoro ndụ okirikiri (`ok` / `starting` / `stopping`). `/livez` bụ usoro-ndụ naanị (200 mgbe ọ bụla onye njikwa nwere ike ịgba ọsọ; ọ naghị echere njikere). Ha abụọ ka na-agba ọsọ n'otu akaghị ihe omume Node dị ka njikwa arịrịọ, yabụ katalọgụ jikọtara CPU ma ọ bụ ọrụ mkpakọ nwere ike igbu oge — na-arụ ọrụ ≠ nwụrụ anwụ. Họta ịdị ndụ TCP ma ọ bụrụ HTTP nyochaa oge. Nduzi nyocha zuru oke: [ntuziaka nleba anya — Kubernetes probe ndụmọdụ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Jiri Caddy dee (HTTPS Auto-TLS)

Enwere ike kpughee OmniRoute nke ọma site na iji ntinye SSL akpaaka nke Caddy. Gbaa mbọ hụ DNS ngalaba gị Ndekọ na-atụ aka na IP nkesa gị.

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

Caddy na-esetịpụrụ nkụnye eji isi mee ihe ọkọlọtọ maka akpa elu. OmniRoute na-eji `NEXT_PUBLIC_BASE_URL` dị ka mmalite ọha na eze maka OAuth oku azụ na njikọ ọha ewepụtara; dashboard ezitere na-ede na-eji arịrịọ mmalite gbakwunyere nchekwa CSRF nwere oge. Naanị mee `OMNIROUTE_TRUST_PROXY` maka mbugharị elu ebe ị na-ama ụma chọọ ka OmniRoute nweta mmalite ọha site na nkụnye eji isi mee ndị tụkwasịrị obi kama nhazi nke ọma.

## Ọwara Ngwa Ngwa Cloudflare

Nkwado dashboard maka ntinye Docker gụnyere **Cloudflare Quick Tunnel** eji otu pịa na `Dashboard → Endpoints`. Mgbe mbụ akwadoro ya, ọ na-ebudata `cloudflared` naanị mgbe ọ dị mkpa, malite ọwara nwa oge gaa na endpoint `/v1` gị ugbu a, ma gosi URL `https://*.trycloudflare.com/v1` emepụtara ozugbo n'okpuru URL ọha gị nkịtị.

Enwere ike igosi ma ọ bụ zoo ogwe ọwara endpoint (Cloudflare, Tailscale, ngrok) site na `Settings → Appearance` n'agbanweghị ọnọdụ ọwara na-arụ ọrụ.

### Ihe Ị Ga-ama Banyere Ọwara

- URL Quick Tunnel bụ nke nwa oge ma na-agbanwe mgbe ọ bụla e bidoro ya ọzọ.
- A naghị eweghachi Quick Tunnels na-akpaghị aka mgbe OmniRoute ma ọ bụ konteena bidoro ọzọ. Kwado ha ọzọ site na dashboard mgbe achọrọ.
- Nrụnye a na-achịkwa na-akwado Linux, macOS, na Windows ugbu a na `x64` / `arm64`.
- Quick Tunnels ndị a na-achịkwa na-eji mbufe HTTP/2 na ndabara iji zere ịdọ aka ná ntị mkpọtụ banyere nchekwa nwa oge QUIC UDP n'ime gburugburu konteena nwere oke. Tọọ `CLOUDFLARED_PROTOCOL=quic` ma ọ bụ `auto` ma ọ bụrụ na ịchọrọ mbufe ọzọ.
- Imēji Docker nwere mgbọrọgwụ CA nke sistemụ ma na-enyefe ha na `cloudflared` a na-achịkwa, nke na-egbochi ọdịda ntụkwasị obi TLS mgbe ọwara na-amalite n'ime konteena.
- Tọọ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ma ọ bụrụ na ịchọrọ ka OmniRoute jiri binary dị adị kama ibudata nke ọhụrụ.

## Mkpado onyonyo

| Onyonyo                      | Mkpado   | Nha     | Nkọwa                                                            |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Kachasị elu** bipụtara** SemVer kwụsiri ike (ọ bụghị git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Tinye klaasị mkpado maka GitOps                                  |

A na-ebipụta otu ihe oyiyi ahụ na ebe nchekwa atọ, na-eji otu ihe nrụpụta ihe ọ bụla: `cheaperinference/omniroute` (Docker Hub, Ụlọ Ọrụ Na-ahụ Maka Ọnụ ego, site na 3.8.53 na), `ghcr.io/cheaper-inference/omniroute` na ihe nketa `diegosouzapw/omniroute`, nke na-edebe akụkọ ihe mere eme ya ma ka na-enweta ntọhapụ ọ bụla. Nkwanye `diegosouzapw/omniroute` dị adị na-emelite; ịgbanwee aha onyonyo bụ nhọrọ. Ọwa ewepụtara `:next` / `:next-web` dị n'okpuru ka ebipụtara naanị `diegosouzapw/omniroute` na GHCR.

Ngosipụta ọtụtụ nyiwe: `linux/amd64` + `linux/arm64` nwa afọ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker na-ahọrọ ụkpụrụ ụlọ dabara adaba na-akpaghị aka; gafere `--platform linux/amd64` ma ọ bụrụ na ịchọrọ ịmanye nṅomi AMD64 na ndị ọbịa ARM.

### Wepụta ọwa

OmniRoute na-ebipụta ọwa Docker dị iche iche maka mwepụta kwụsiri ike, nnwale ngalaba ntọhapụ na-arụ ọrụ, yana mmepe mmepe.

| Ọwa                             | Isi mmalite                              | Mgbanwe                                 | akwadoro ojiji                                                                                                                  |
| ------------------------------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ntọhapụ Signed/versioned                 | Enweghị ike ịgbanwe                     | Nbugharị mmepụta nke na-atụnye ntọhapụ ziri ezi                                                                                 |
| `:latest` / `:latest-web`       | Kachasị elu** bipụtara** ziri ezi SemVer | Ntuziaka kwụsiri ike na-agbanwe agbanwe | Na-eso mwepụta kwụsiri ike** emechaa** a SemVer bipụta ọrụ — eme** ọ bụghị** soro `main` ma ọ bụ `release/v*` na-ewepụtaghị eme |
| `:next` / `:next-web`           | Alaka `release/v*` ndabara ugbu a        | Ntụnye ntọhapụ ga-agbanwe agbanwe       | Ndozi nnwale nke rutere na ngalaba ntọhapụ na-arụ ọrụ mana ọ nọbeghị na ntọhapụ kwụsiri ike                                     |
| `:main` / `:main-web`           | alaka `main`                             | Ntụnye mmepe mgbanwe                    | Nnwale mmepe na ntinye naanị                                                                                                    |

#### Ndị na-eweta nnọkọ weebụ: onyonyo `-web`

Ọwa ọ bụla dị n'elu na-agbakọ okpukpu abụọ dị ka mkpado `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), nke e wuru site na `runner-web` ogbo — otu onyonyo gbakwunyere Playwright na ihe nchọgharị Chromium. Ihe oyiyi nkịtị na-ebugharị** na-enweghị** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` chọrọ ya.

Akwụsịla ọdịda ahụ, ọ bụghị oge mmalite: ndị na-eweta ya depụtara ụdị ha wee gosi dị ka ejikọtara na dashboard, naanị arịrịọ mbụ agaghị ada na ya.

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ọ bụrụ na ị na-eji ndị na-eweta ya, dọpụta akara `-web` nke ọwa ị nọ na — ọ nweghị ihe ọzọ na-agbanwe. Na nrụnye npm/CLI (enweghị foto Docker ), ibe ya na-efu efu bụ ọnụọgụ abụọ ihe nchọgharị: mee `npx playwright install chromium` na onye ọbịa.

#### Iji ọwa ewepụtara tupu ahapụ ya

A na-ewughachi ọwa `next` na ntinye ọ bụla gaa na ngalaba `release/v*` dị ugbu a ma ebipụtara ya maka AMD64 na ARM64. Alaka nlekọta ochie enweghị ike idegharị ya. Ọwa ahụ na-enye onyonyo nwere ike ịdọrọ maka ndozi jikọtara n'ime ngalaba ntọhapụ na-arụ ọrụ tupu ebipụ mkpado kwụsiri ike na-esote.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Maka Docker Compose, kagbuo mkpado onyonyo nke profaịlụ ahọpụtara na-eji, wee dọpụta ma megharịa ọrụ ahụ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Nchekwa na nlọghachi azụ

`next` bụ ọwa ntọhapụ na-ese n'elu mmiri. Ọ nwere ike ịgbanwe na ntinye ọ bụla na ngalaba ntọhapụ na-arụ ọrụ ma bụrụ** akwadoghị maka mmepụta ihe** . Tinye ihe onyonyo a ka ị na-enyocha ihe nrụpụta akọwapụtara:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tupu ịnwale, kwadoo olu data OmniRoute ma ọ bụ ndekọ data agbakwunyere. Iji tụgharịa, weghachite ụdị kwụsiri ike ejiribu ma ọ bụ gbarie wee megharịa akpa ahụ:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Ụlọ ntọhapụ-alaka ụlọ enweghị ike ịkwaga `latest`; naanị ụdị semantic siri ike tozuru oke nwere ike ịkwalite nrịbama kwụsiri ike. Onyonyo `next` a na-ejigide nyocha onyonyo ewepụtara yana igbochi ọnụ ụzọ adịghị ike dị egwu.

**`latest` abụghị nkwa ego maka git.** Ndozi ejikọta na `main` ma ọ bụ na ngalaba `release/v*` na-arụ ọrụ bụ** ọ bụghị** na `:latest` ruo mgbe ebipụtara onyonyo SemVer kwụsiri ike na ọrụ mbipụta na-akwalite `:latest` (otu mgbari dị ka SemVer ahụ). Ọ bụrụ na `latest` dị ka oyi kpọnwụrụ ebe GitHub na-egosilarị ihe ndozi ahụ, dọpụta `:next` iji nwalee ngalaba ntọhapụ ma ọ bụ chere maka mkpado SemVer.

| Ị chọrọ                                                     | Jiri                                   |
| ----------------------------------------------------------- | -------------------------------------- |
| GitOps / mmepụta nke na-ekwesịghị ịkpafu                    | Pin `:X.Y.Z` (ma ọ bụ ihe mgbaze foto) |
| Soro ụlọ ndị ebipụtara ma nabata mmeghari na ntọhapụ ọ bụla | `:latest`                              |
| Nwalee `release/v*` na-ewepụtabeghị                         | `:next` (abụghị mmepụta)               |
| Nwale `main`                                                | `:main` (abụghị mmepụta)               |

## Mmelite dashboard na Docker

Container sitere na image e bipụtara enweghị ike dochie onwe ya. Mgbe OmniRoute chọpụtara na ọ na-arụ ọrụ n'ime
container (enweghị checkout `.git`, ọ bụghị ntinye npm), banner mmelite dị na dashboard ụlọ na-egosi
iwu host a ga-agba kama ntuziaka npm/git, tinyere bọtịnụ idetuo:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Aha service ahụ sitere na `AUTO_UPDATE_SERVICE` (ndabara bụ `omniroute`, service dị na
`docker-compose.selfhost.yml`). `pull` na-emelite naanị tag na-agbanwe agbanwe (`latest`, `next`); ma ọ bụrụ na
ejiri tag `:X.Y.Z` kwụsie ike, buru ụzọ dezie tag ahụ.

### Mmelite otu-pịa site na faịlụ trigger dị na host

Iji mee ka **Melite Ugbu a** nọgide na-arụ ọrụ n'ebughị `/var/run/docker.sock` dịka mount (nke na-enye container
ikike root na host — lee ịdọ aka ná ntị profaịlụ `cli` dị n'elu), tọọ `DOCKER_UPDATE_TRIGGER_FILE` na
service OmniRoute ma mee ka watcher rụọ ọrụ na host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Path ahụ ga-adịrịrị n'ime `DATA_DIR` (a na-ekpebi uru relative dabere na ya); a ga-ajụ
ihe ọ bụla ọzọ. **Melite Ugbu a** ga-edezi `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` n'ime
faịlụ ahụ, zaghachi `202`, dashboard ahụ ga na-enyocha `/api/system/version` ruo mgbe ụdị ọhụrụ malitere ịrụ ọrụ
ma weghachite ibe ahụ. OmniRoute anaghị agba shell ma ọ bụ iwu Docker n'ụdị a. Dịka omume mmelite
ọ bụla, a na-anabata arịrịọ ahụ naanị site n'aka ndị ahịa loopback/LAN.

Akwụkwọ ndekọ data e ji bind mount na-enye host path kwụsiri ike ọ ga-enyocha. Ihe atụ unit `systemd`
(gbanwee `/srv/omniroute` ka ọ bụrụ akwụkwọ ndekọ nwere faịlụ compose gị na `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Na-enyocha arịrịọ mmelite sitere na dashboard OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Dọrọ ma mepụtaghachi container OmniRoute

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

Service ahụ na-ewepụ arịrịọ ahụ tupu ọ dọrọ image ka mmegharị dara ada ghara ịbanye na loop. Enweghị
`DOCKER_UPDATE_TRIGGER_FILE`, dashboard ahụ ga-edobe usoro iwu aka.

## Nnweta: SQLite ndabara bụ otu oyiri

Stock Docker / Kubernetes OmniRoute bụ** otu Node usoro + otu SQLite odee** . Nnukwu nnweta bụ** akwadoghị** na topology.

| Mmachi                                     | Ihe si na ya pụta                                                                                                                                                                                                                                                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Otu onye edemede                           | Mee** ọ bụghị** mee ọtụtụ oyiri megide otu faịlụ SQLite. Nke ahụ na-emebi DB.                                                                                                                                                                                                                              |
| Megharịa / malitegharịa / HEALTHCHECK igbu | **Ọpụpụ zuru oke** nke SSE ụgbọ elu, nnọkọ dashboard, na steeti ebe nchekwa. Onye ahịa ọ bụla ejikọrọ na-ada. Arịrịọ ọhụrụ n'oge mpio ihe efu na-enweta proxy reverse**`502 Bad Gateway: Unknown error`** , ọ bụghị OmniRoute JSON — ndị ahịa enweghị ike ịmata nke a na ọdịda onye na-eweta ọrụ (#11015). |
| Otu ihe omume dị ka `/healthz`             | Katalọgụ na-arụsi ọrụ ike ma ọ bụ akara mkpakọ nwere ike igbu oge nyocha; obere oge wee malitegharịa** naanị** oyiri.                                                                                                                                                                                      |

**Nyocha matrix** (leekwa [ndụmọdụ Kubernetes nyocha](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Nyocha       | Ebumnuche                                                        | Ejila ya                                                                 |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Ịdị ndụ      | TCP na `PORT` ( `20128` ndabara), ma ọ bụ HTTP `/healthz` dị nro | `/api/monitoring/health`                                                 |
| Njikere      | HTTP `GET /healthz`                                              | Oge nkwụsịtụ siri ike na-ewere mmemme-loop na-arụ ọrụ ka onye nwụrụ anwụ |
| Deep / mmadụ | `/api/monitoring/health`                                         | Kubelet ndụ akpaaka                                                      |

**Nkwalite:** na-atụ anya ka nnọkọ ọ bụla daa. Wepu ndị ahịa ma ọ bụrụ na ị nwere ike; enweghị mmelite mkpọgharị na ndabara SQLite. Mepụta `restart: unless-stopped` gbakwunyere Docker `HEALTHCHECK` ga-anọchikwa naanị usoro mgbe akpa adịghị mma - otu mgbawa radius.

Ngosipụta emebere emebere yana eserese Helm na-ebi na `deploy/kubernetes/` na `deploy/helm/omniroute/` - lee [ntuziaka ntinye nke Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes snippet maka a** otu oyiri** (Achọrọ imegharia; ebulila `replicas` megide otu faịlụ SQLite ):

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

ụra `preStop` na-ahapụ kube dobe njedebe ọrụ tupu SIGTERM so** ọhụrụ** okporo ụzọ na-akwụsị ịkụ usoro ịnwụ anwụ. A na-ekpochapụ `/v1/responses` SSE n'ime ụgbọ elu ruo `SHUTDOWN_TIMEOUT_MS` (30s ndabara) site na mgbazinye nnabata arọ (#11015). Arịrịọ ọhụrụ ka ruru usoro a ga-enweta `503` + `Retry-After: 5`. Megharia oghere ngwụcha ngwụcha ruo mgbe nnọchi ya dị njikere na-anọgide na-apụ apụ - ya bụ SQLite topology, ọ bụghị nyocha misconfig.

Mpụga Postgres / ọtụtụ odee HA bụ** ọ bụghị** ụzọ ngwaahịa edepụtara. Ọ bụrụ na ịchọrọ HA, debe otu oyiri ma ọ bụ mee topology ihe oru ngo nwalere wee detuo ya iche. Ọrụ Postgres/MySQL bi na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ruo mgbe ụgbọ mmiri ahụ, naanị ụzọ akwadoro iji mụbaa** nnukwu** ikike `/v1/responses` bụ N usoro nnwere onwe (ngalaba na-esote), ọ bụghị `replicas > 1` n'otu olu.

## Ọnụ ọgụgụ: N usoro nke onwe

### Codex token ntụgharị nwe

Mpempe akwụkwọ nke otu akaụntụ Codex agaghị eripịa ihe ngosi ume ọhụrụ na-eji otu ya. N'oge na-eri naanị nzere emekọrịtara ọnụ, tọọ `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (utu aha `cx`). Hapụ ya na ịtọghị ya na otu onye nwe ntụgharị. Usoro ọ bụla ka chọrọ `DATA_DIR` nke ya; nhọrọ a anaghị ekekọrịta SQLite ma ọ bụ na-eweta mmekọrịta token ma ọ bụ mkpọchi ekesara.

Ihe atụ na-agafe agafe na-agụghachi njikọ ahụ mgbe ọ dị mkpa ume ọhụrụ wee nabata naanị ihe dị iche, akara ohere agwụbeghị. Ma ọ bụghị ya, a ga-enwe nkwarụ na-emepeghị ma ọ bụ gbanyụọ njikọ ahụ ma ọ bụ na-agụta ọdịda na-emebi ume ọhụrụ. Ezi upstream nyocha ọdịda ka na-eji nkịtị ndekọ ọdịda, exponential cooldown na nkịtị ahịa njehie; nkwụsị akaụntụ na-adịgide adịgide. Mekọrịta akara ntugharị nke onye nwe tupu ohere akara agwụ (nduzi ume ọhụrụ na-arụ ọrụ bụ nkeji ise), ma ọ bụ bubata faịlụ Codex auth ọzọ. Mbubata na-agafe agafe na-echekwa akara ngosi enyere na-akwadoghị ha na njedebe akara. Akwụkwọ ntuziaka dashboard/API ume eweghachi `409 refresh_disabled`; nbanye OAuth ọhụrụ agbanwebeghị. Hụ [ntụnye aka gburugburu](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### Otu usoro: ihe karịrị `/v1/responses` ogologo abụọ

A** ahụike** usoro (kpobo n'okpuru `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ndabara `0.75`)** nwere ike** na-agba ọsọ karịa `POST /v1/responses` abụọ na-emekọ ihe ọnụ mgbe usoro mmefu ego inflight-byte (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ka nwere ohere. Ahụ na ma ọ bụ karịa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ndabara 256 KiB) na-ewere otu mgbazinye arọ dị arọ dị ka arịrịọ nhazi-dị arọ ma jiri otu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` mgbapụ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ọtụtụ iri ndị ahịa SSE ogologo oge (ndị ọrụ na-achọkarị 40-50) bụ a** ebe nchekwa-mmefu ego** ajụjụ — nha obo + primary/headroom oghere + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — abụghị oke ngwaahịa “max 2” siri ike. Obo nrụgide ka na-awụfu na `503` enwere ike ịnwale ya #7849 agaghị alaghachi.

Iji** mụbaa ikpo** (oghere ochie V8 nọọrọ onwe ya)** taa** :

| Mee                                                                                                                                              | Emela                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Gbaa ọsọ** N containers/pods** , nke ọ bụla nwere ya** nke onwe** `DATA_DIR` / olu                                                               | Tọọ `replicas > 1` megide otu faịlụ SQLite           |
| Nha dị arọ n'ime ụgbọ elu + ahụike-isi ụlọ si na mmefu ego nke ikpo ọkụ / inflight-byte; 1-2 bụ mgbanwe #7849 ndabara, ọ bụghị ngwaahịa siri ike | Nye otu usoro 8 × RAM na okpu ọnụ na-enweghị oke     |
| Nhọrọ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` maka** òkè ọnụ ọgụgụ**                                                               | Na-emeso Redis ka òkè SQLite — ọ bụghị               |
| Mepụta ihe nzuzo ndị na-eweta ihe n'ime ihe atụ ọ bụla (ma ọ bụ nabata dashboard nke kewara)                                                     | Na-atụ anya otu dashboard / otu ndekọ oku n'ofe oge  |
| N'ihu na ihe nkwụnye ibu ọ bụla; nnyapade site API igodo ma ọ bụ nnọkọ zuru ezu                                                                  | Chọrọ onye na-ere ahịa akọwapụtara nke ọma nke etiti |

Enwere ike ịkekọrịta mmekọrịta na akaụntụ site na Redis: tọọ `OMNIROUTE_SESSION_AFFINITY_STORE=redis` na `REDIS_URL` na usoro ọ bụla, yana otu `REDIS_KEY_PREFIX` na ntọala `sessionAffinityTtlMs` dị mma. Pins na-edozi njirimara akaụntụ ojiji hashed na njikọ mpaghara nke usoro ọ bụla tozuru oke, yabụ akaụntụ OAuth nwere metadata njirimara dabara enweghị mkpa inwe njikọ IDs. Ihe njirimara akaụntụ ama ama na-ebute ụzọ karịa IDs mpaghara na-emegiderịta onwe ya na mkpebi pin na nchụpụ echedoro; ndekọ na-enweghị njirimara (ma ọ bụ ndị na-akpọ nchụpụ na-enweghị njirimara) na-ejigide ihe nchekwa ID. Akaụntụ na-enweghị njirimara ojiji kwụsiri ike ka chọrọ IDs dakọtara. mperi Redis ma ọ bụ oku gafere 100 ms daa azụ na SQLite mpaghara. Storelọ ahịa mmekọ Redis ọ bụla na-arụ ọrụ pụtara ìhè na 8, na-agafe Redis ozugbo ọ juputara, ma wepụta oghere naanị mgbe ọrụ dị n'okpuru ga-edozi, ọ bụghị n'oge ngwụcha nke onye ọkpụkpọ. N'oge mwepu Redis enweghị eziokwu na-ekerịta: ihe atụ ọ bụla na-adaghachi na mmekọ obodo nke ya, nnọkọ nwere ike ịtụgharị otu ugboro n'otu ihe atụ, na oge nwere ike ịdịgasị iche. Nrapara na-agbakọta ọzọ site na Redis mgbe ọ gbakere. Oge nkwụsịtụ na-echere, ọ bụghị EVAL ezitere, nke nwere ike ịdata ma ọ daa azụ. Routing na-ede na-atụnyere kpọmkwem uru a hụrụ site na ntugharị mkpebi, ọ bụghị a ọhụrụ mutation-oge ọgụgụ; ihe nlebanya anya ma ọ bụ SQLite nleba anya na-atụnyere dị ka igodo Redis adịghị. A na-edochi ntụtụ ochie n'otu CAS, yabụ iwu mbubreyo enweghị ike dochie ma ọ bụ hichapụ pin ọhụrụ dị iche. Redis na-agụ atomically weghachi uru na nke fọdụrụ TTL; ziri ezi PTTL (ma ọ bụ enweghị expiry) na-ekpebi ịdị ndụ, ọ bụghị akara JSON nke onye edemede ma ọ bụ elekere onye na-agụ ya. Ihe onyonyo onyonyo mpaghara nke fọdụrụ TTL ruo oge ngwụcha mpaghara; igodo JSON dị adị na-anọgide na-agụ ma na-edobe bytes raw ha maka CAS. Redis bụ naanị isi iyi nke eziokwu ka ọ na-aza. Nkwukọrịta nkekọrịta akwadoro, metụ na ihichapụ na-ewepụ ntinye mpaghara, wụnyela ma ọ bụ megharịa ya. SQLite n'ụzọ Redis na-ejide naanị mkpebi ndaghachi azụ nke ihe atụ a site na njehie Redis, nkwụsị oge ma ọ bụ nnabata nnabata, nwere TTL dị ka ọ dị na mbụ. Ntụtụ mpaghara na-efu efu n'oge mgbụsị akwụkwọ na-efu otu nhọrọ ọhụrụ (otu oghere cache ozugbo), ọ bụghị akaụntụ na-ezighi ezi ma ọ bụ chụpụrụ. Mkpesa ndị a jụrụ ajụ na-eweghachi onye mmeri nkekọrịtara na TTL nke fọdụrụ n'ụzọ atọ: nhọrọ nkịtị na-enyocha oge imecha mpaghara ma na-eji onye mmeri tozuru oke na-adị ndụ, na-emetụ aka na ịbanye maka akaụntụ ahụ na-enweghị ederede ọzọ. Ọ bụrụ na ọ dịghị, nhọrọ na-edobe onye ndoro-ndoro ochichi obodo, hapụ pin pin na-agbanweghị ma wepụta otu ozi nbipu. CAS jụrụ ajụ anaghị ede SQLite; njehie Redis, nkwụsị oge ma ọ bụ nnabata nnabata na-etinye ọrụ mpaghara dị ugbu a kama. Ọ bụrụ na nzaghachi ngbanwe ezitere abịarute ka oge gwụchara (anabatara, jụrụ ma ọ bụ njehie), ntụnyere na-ehichapụ ọnụ na-emekọrịtara ọnụ na-ewepụ naanị byte yiri ahịrị ọdịda oge. Enweghị nchere n'etiti ntụnyere na ihichapụ ahụ; A na-echekwa ederede mpụ ọhụrụ. Nchụpụ echedoro na-ewepụ pin mpaghara akaụntụ nke dara ada ọbụlagodi na Redis gbadaa, wee sachaa ya ọzọ ka ekwenyechara nchụpụ nkekọrịta. Azịza ekekọrịtara na-echere na mbụ enweghị ike iweghachi ntụtụ mpaghara a chụpụrụ n'ihi na ihe ịga nke ọma nkekọrịtara anaghị ede SQLite. Nkwụghachi azụ n'ikpeazụ nwere ike iweghachi akaụntụ; Edemekọrịta nkekọrịta nabata emechara dị naanị na Redis. Redis efu anaghị agụta steeti ọdịda ọdịda mpaghara. Mgbe onye ọkwọ ụgbọ ala gbanyụrụ, ntụtụ ahọpụtara ọhụrụ na-ejigide udi nke ubi SQLite JSON anọ; naanị Redis routing na-agbakwunye njirimara akaụntụ hashed. A na-enyocha ntụtụ ebutegoro na oke njedebe ha. Nhọrọ nke anaghị agbazinye ego Redis na-agụgharị ụlọ ahịa ahụ, mana atụmatụ ịgbazinye ego na-emekọrịta ihe ka nwere ike iji ntụtụ chụpụrụ n'etiti prefetch na atụmatụ (mpio mbọ kacha mma anabatara). Nkwekọrịta mgbazinye enweghị ike ịgbanwee akaụntụ ma ọ gafechara: na nkwupụta a jụrụ ajụ, ọ na-edobe onye a na-arịọ arịrịọ maka arịrịọ ahụ naanị wee hapụ onye meriri na-emeri ihe, yabụ nkwekọrịta n'ofe ikpe ga-adabere n'ụzọ ahụ. Tebụl ndị ọzọ ka na-emetụta: nke a anaghị ekere òkè nnọkọ nnọkọ, ntudo Codex nwa afọ, semaphores akaụntụ, mkpọchi mkpọchi, oke oke, nhazi ma ọ bụ ndekọ oku.

Akụrụngwa: kwa oge n'otu oge ogologo `/v1/responses` bụ a** ebe nchekwa-mmefu ego** ajụjụ (kpokoro + inflight-byte / #10110). `N` nnwere onwe `DATA_DIR` s ka na-amụba obo: onye ọbịa RAM ga-ekpuchi `N × cgroup`, ọ bụghị "otu 16 Gi pod na N = 8." Ọ dịghị mgbe `replicas > 1` na otu faịlụ SQLite.

Dee sketch (obo abụọ, mpịakọta abụọ — abụghị `deploy.replicas: 2`):

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

Njupụta n'ime usoro (mkpakọ kwụsịrị HTTP iche) bụ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Otu ụyọkọ ezi uche dị na steeti na-adịgide adịgide bụ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Njehie mpaghara Gemini n'ime Docker

Google AI Studio / Gemini API nwere ike iweghachi HTTP 400 nwere FAILED_PRECONDITION na
`User location is not supported for the API use.` Arịrịọ gara nke ọma na host
anaghị egosi na container na-eji otu ụzọ ọpụpụ ahụ. Nhazi usoro DNS,
njikọ IPv4/IPv6, ụzọ VPN na proxy ahaziri nwere ike ịdị iche. Lelee
[mpaghara Google na-akwado](https://ai.google.dev/gemini-api/docs/available-regions)
yana ụzọ njikọ a na-eji n'ezie; naanị njehie a anaghị egosi na API key adịghị mma.

### Họrọ proxy akọwapụtara maka otu njikọ

Jiri [nhazi proxy maka njikọ ọ bụla](../ops/PROXY_GUIDE.md#4-level-proxy-system) nke OmniRoute
maka njikọ Gemini emetụtara, wee megharịa **Nwalee Njikọ** na obere arịrịọ
jiri otu model ahụ. Nke a na-eme ka mgbanwe ụzọ ahụ metụta naanị njikọ ahụ. Nyochaa
na container nwere ike iru proxy ahụ, nakwa na njikọ ahụ na-ahọrọ
ya n'ezie. Ịgbanwe ụzọ anaghị ekwe nkwa na mpaghara ahụ ga-eru eru n'akụkụ upstream.

### Tụnyere netwọkụ host na container

Debe key, model na arịrịọ ka ha bụrụ otu mgbe ị na-atụnyere nsonaazụ e nyere nkwenye njirimara; etinyela
ozi nzuzo, okwuntughe proxy ma ọ bụ authorization headers zuru ezu n'ime issue.
Buru ụzọ lelee address families nke OS resolver na-enye, site n'iji otu command ahụ
na host nakwa n'ime container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Dochie `omniroute` na service ị na-agba (dịka ọmụmaatụ, `omniroute-web`). Command ndị a
na-ebipụta address families na-enweghị ozi nzuzo ma ọ bụ IP addresses. `6` eweghachiri
na-egosi naanị nsonaazụ IPv6 DNS: ọ **naghị** egosi na e nwere ụzọ IPv6 a pụrụ iji ma ọ bụ ohere API.
Ebe arụnyere `curl`, tụnyere `curl -4 -I https://generativelanguage.googleapis.com`
na `curl -6 -I https://generativelanguage.googleapis.com` na gburugburu abụọ ahụ.
Nzaghachi HTTP na-egosi na njikọ dị maka ule ahụ, ọbụlagodi ma ọ bụrụ njehie
na-enweghị nkwenye njirimara; naanị arịrịọ model nwere nkwenye njirimara na-anwale ntozu Gemini.

### Nhọrọ n'ọkwa host: IPv6 na-arụ ọrụ na iwu resolver

Onye kọrọ [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) weghachiri
ohere n'ime gburugburu ha site n'ịgbanye IPv6 nke container na ịgbanwe nhọpụta address
nke glibc. Were nke a dị ka nhọrọ pụrụ iche maka gburugburu ahụ. Kwenye na IPv6 nke host
na-arụ ọrụ, na container nwere egress/routing, nakwa na iwu firewall ziri ezi tupu ịgbanwe mmasị resolver.
Private ULA address naanị ya anaghị egosi na njikọ IPv6 ọha dị.

Maka services etinyelarị na default network nke Compose, iberibe nhazi a na-agbanye
IPv6 na network ahụ; debe akụkụ ndị ọzọ nke service, ports, volumes na configuration gị:

```yaml
networks:
  default:
    enable_ipv6: true
```

Maka named network, gbanye ya na network nke service ahụ sonyere n'ezie. Docker nwere ike
ikenye ULA subnet; họrọ subnet doro anya nke na-adịghị ekpuchi nke ọzọ naanị mgbe network gị
chọrọ ya. Hụ [netwọkụ IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
na [nhọrọ network Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na **image dabere na glibc**, `/etc/gai.conf` nwere ike ịgbanwe nhọpụta address. Dockerfile nke
repository dị ugbu a na-eji Debian; images ahaziri ahazi dabere na musl anaghị eji otu usoro a.
Mgbanwe a kọrọ na-agbanwe label ULA site na `label fc00::/7 6` gaa na
`label fc00::/7 1`. Malite na policy table zuru ezu nke image ahụ ma debe entries ndị ọzọ:
ịgbakwunye entry `label` ma ọ bụ `precedence` na-anọchi default table ahụ, ya mere file
nwere naanị ahịrị a gbanwere ezughị oke.
[ntụaka nhazi glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
na-akọwa usoro ndị ahụ. Jiri bind-mount tinye file a nyochara dị ka read-only na `/etc/gai.conf`
ma mepụtaghachi service ahụ iji tinye mgbanwe ahụ n'ọrụ.

Nke a na-agbanwe nhọpụta address nke OS maka **okporo ụzọ ọpụpụ niile n'ime container ahụ**.
Ọ naghị amanye application ọ bụla ịhọrọ IPv6: usoro DNS nke Node na nhọpụta
njikọ dịkwa mkpa. Karịsịa, `--dns-result-order=ipv4first` na-ahọrọ IPv4 karịa
ma ọ bụghị ihe ngwọta maka ọdịda metụtara naanị IPv4. Hụ [usoro DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Nwalee Gemini na providers ndị ọzọ gị ọzọ mgbe mgbanwe ọ bụla n'ọkwa host gasịrị. Iji laghachi azụ,
wepụ custom `gai.conf` mount, weghachite nhazi network gara aga ma
mepụtaghachi service/network emetụtara n'oge mmezi. Imegharị network
nwere ike ịkwụsị containers ndị ọzọ ejikọrọ na ya; ehichapụla persistent data volume.

## Ihe Ndị Dị Mkpa Ịmara

- **Ọnọdụ WAL nke SQLite:** E kwesịrị ikwe ka `docker stop` mechaa ka OmniRoute nwee ike ideghachi mgbanwe ndị kachasị ọhụrụ n'ime `storage.sqlite` site na checkpoint. Faịlụ Compose ndị e tinyere esorola ya ahazi oge amara nke sekọnd 40 tupu nkwụsị. Ọ bụrụ na ị na-agba image ahụ ozugbo, debe `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tọọ ya ka ọ bụrụ `true` ma ọ bụrụ na a na-ejikwa nkwado ndabere oge niile/tupu ide ihe site na sistemụ mpụga. Mbugharị database dị adị ka chọrọ snapshot nchekwa na-adịgide adịgide nke ha na ihe mgbochi mbugharị n'ìgwè.
- **Ịdịgide nke Data:** Na-etinye volume na `/app/data` mgbe niile iji chekwaa database, keys, na nhazi gị n'oge a na-amalitegharị container.
- **Nhazi Port:** Gbanwee environment variable `PORT` iji dochie port ndabara `20128`.

## Hụkwa

- [Ntuziaka Nrụnye VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nhazi VM + nginx + Cloudflare
- [Ntuziaka Nrụnye Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Wụnye na Fly.io
- [Nhazi Environment](../reference/ENVIRONMENT.md) — Ntụaka `.env` zuru ezu
