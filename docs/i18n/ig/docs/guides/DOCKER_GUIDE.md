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

## Ịgba Ọsọ Ngwa Ngwa

> **Ịchọrọ iji otu iwu rụọ self-host?** Lee
> [Nduzi Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image e bipụtara +
> Redis, naanị loopback, enweghị nhọrọ profaịlụ). Quick Run dị n'okpuru bụ
> ụzọ otu container maka ndị ọrụ na-agba Redis n'ebe ọzọ ugbua.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Iji Faịlụ Gburugburụ

```bash
# Buru ụzọ detuo ma dezie .env
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

## Ọkwa Dockerfile

Ebe nchekwa a na-ebute Dockerfile nwere ọtụtụ ọkwa (`Dockerfile`). E gosipụtara ọkwa anọ; họrọ `target` kwesịrị ekwesị maka ojiji gị.

| Ọkwa          | Oyiyi ntọala          | Ebumnuche                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Na-etinye ndabere (`npm ci --legacy-peer-deps`) ma na-agba `npm run build` (Turbopack na ndabara — lee Akụrụngwa oge nrụpụta n'okpuru)                                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Gburugburụ mmepụta nwere nsonaazụ standalone nke Next.js. **Enweghị CLI ndị na-eweta ọrụ etinyere n'ime ya.**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Na-agbakwụnye `git`, `docker.io`, `docker-compose` na CLI zuru ụwa ọnụ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Họrọ nke a maka usoro ọrụ ndị nnọchi anya na-arụ.**                                                                                                     |
| `runner-web`  | `runner-base`         | Na-agbakwụnye Playwright + ihe nchọgharị Chromium (`--with-deps`) maka ndị na-eweta nnọkọ webụ: `gemini-web`, `claude-web`, `claude-turnstile`. **Họrọ nke a mgbe ị na-eji ndị na-eweta ndị ahụ** — oyiyi nkịtị ga-ada n'oge arịrịọ ma ọ bụrụ na enweghị ya (lee nkọwa `-web` n'okpuru Ọwa Mwepụta). |

Jiri aka wuo target a kapịrị ọnụ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Akụrụngwa oge nrụpụta

Arg nrụpụta atọ na-achịkwa ihe ọkwa `builder` na-eri. Ha bụ naanị maka oge nrụpụta —
`OMNIROUTE_MEMORY_MB` (n'okpuru) bụ njikwa gburugburụ dị iche.

| Arg nrụpụta                 | Ndabara | Mmetụta                                                                                              |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` na-eji webpack arụ: ebe nchekwa kachasị elu dị ala, mana ọ na-eji nwayọ. `1` na-ahọrọ Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Oke heap V8 (`--max-old-space-size`) maka `next build` e mepụtara.                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Na-enye `CIRCLE_NODE_TOTAL`; Next na-ewepụta `workers = N - 1` maka nchịkọta data peeji.             |

`OMNIROUTE_BUILD_WORKERS` bụ nke ị ga-ebuli na builder buru ibu, bụrụkwa nke ị ga-enyo enyo
mgbe nrụpụta nwere oke dara **mgbe** `✓ Compiled successfully` gasịrị. Worker
data peeji ọ bụla bụ process nke ya, otu ahụkwa ka parent `next build` n'onwe ya;
nnwale ozugbo na VPS (issue #7518) tụrụ RSS kachasị elu nke process ọ bụla dịka
~4.5 GB n'agbanyeghị flag heap `NODE_OPTIONS` (Turbopack na-achịkọta n'ime
ebe nchekwa native/Rust dị n'èzí heap V8). Ndabara `2` (→ 1 worker, process 2
na mkpokọta) ka ahaziri maka runner GitHub na-akwado nwere 16 GB / 4 vCPU nke
pipeline mbipụta na-eji. Na `8` (→ worker 7), ebe nchekwa gwụrụ na runner ahụ,
buildkit wee mee ka nzọụkwụ ahụ daa site na `ResourceExhausted: ... cannot allocate memory`;
`3` (→ worker 2) ka enweghịkwa ike ịba mgbe a tụrụ RSS nke process ọ bụla
ozugbo kama ịtụpụta ya. `tests/unit/docker-build-memory-budget.test.ts`
na-eme mgbakọ ahụ site na ọnụ ọgụgụ a tụrụ ma na-ada ma ọ bụrụ na otu n'ime
njikwa abụọ ahụ gafere ikike runner.

Turbopack na-achịkọta n'ime ebe nchekwa Rust native nke dị **n'èzí** heap V8, ya mere
`OMNIROUTE_BUILD_MEMORY_MB` anaghị enye ya oke. N'elu host nwere oke ebe nchekwa,
OOM killer ga-eji SIGKILL kwụsị nrụpụta ahụ n'enweghị ederede njehie ọ bụla — ọ ga-akwụsị
naanị n'etiti `Creating an optimized production build`, nke yiri nkwụsị ọrụ
kama ịbụ ebe nchekwa agwụla. Ọ bụ ya mere `Dockerfile` ji eji webpack dịka ndabara
(`OMNIROUTE_USE_TURBOPACK=0`), n'adịghị ka `npm run dev` / `npm run build`, ebe
Turbopack bụ ndabara nke koodu: `docker build .` nkịtị na-enweghị arg nrụpụta (nke
Railway na host ndị ọzọ nwere otu-pịa na-agba) agaghị anwụ nwayọ n'elu builder
nwere oke ebe nchekwa. Oyiyi ndị e bipụtara enyefelarị `OMNIROUTE_USE_TURBOPACK=0`
n'ụzọ doro anya n'ime `docker-publish.yml`. N'elu builder nwere RAM buru ibu, họrọ
Turbopack maka nrụpụta dị ọsọ karịa:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Agbanyere `webpackBuildWorker`, ya mere `next build` na-agba parent **na** process
worker, nke ọ bụla na-erubekwa isi na `OMNIROUTE_BUILD_MEMORY_MB` iche iche. Hazie oke
container ka ọ dị elu karịa ihe dị ka okpukpu abụọ nke uru ahụ, ọ bụghị naanị otu ugboro.

Ihe a tụrụ n'osisi a (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Ngwá nchịkọta | Oke container  | Nsonaazụ                             |
| ------------- | -------------- | ------------------------------------ |
| Turbopack     | 8 GiB / 16 GiB | OOM gburu ya na ha abụọ, nwayọ       |
| webpack       | 8 GiB          | E jiri SIGKILL kwụsị worker nrụpụta  |
| webpack       | 12 GiB         | ọ gara nke ọma, ruru elu na 11.1 GiB |

### Ndabara gburugburụ

Ndabara ndị `runner-base` na-ebupụ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Omume ebe nchekwa n'ime Docker:

- Ihe oyiyi ahụ na-edobe `OMNIROUTE_MEMORY_MB=1024` ma na-ewepụta `NODE_OPTIONS=--max-old-space-size=1024` site na ya.
- Ihe na-ebido usoro sava n'ezie bụ standalone launcher, nke na-agụ `OMNIROUTE_MEMORY_MB` ma tinye `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node na-eji uru ikpeazụ nke `--max-old-space-size` e kwughachiri, ya mere ịtọ `OMNIROUTE_MEMORY_MB` na-achịkwa oke heap Docker a na-eji n'ezie.
- Ebe ọ bụ na ihe oyiyi ahụ na-edobe ya mgbe niile, fallback nke launcher nke na-agbakọ dabere na RAM anaghị arụ ọrụ n'okpuru Docker. Welie ya kpọmkwem maka ibu ọrụ ahụ (lee tebụl dị n'okpuru). `2048` ka dịkwa obere maka coding-agent `/v1/responses`.

### RAM oge-ngwaọrụ maka ndị nnọchi anya ide koodu

Ndabara Docker nke 1 GiB bụ opekempe maka dashboard/mkparịta ụka dị mfe, ọ bụghị nha maka mmepụta. Ahụ `POST /v1/responses` ndị toro ogologo (ọtụtụ narị ozi, ọtụtụ iri ngwaọrụ) na-edowe ọtụtụ eserese n'ime ebe nchekwa n'oge mkpakọ. Arịrịọ abụọ na-ekpuchi ibe ha nke ihe dịka ~3 MiB / ~750k-token emeela ka V8 kwụsị na old-space nke **12 GiB** (`FATAL ERROR: Reached heap limit`) ma rutekwa OOM nke cgroup 16 GiB. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Debe nha **cgroup `--memory` ka ọ dị elu karịa heap** — buffer ndị native, SQLite, na ihe etiti nke mkpakọ na-anọ n'èzí V8.

| Ibu ọrụ                                                       | `OMNIROUTE_MEMORY_MB`      | Container / cgroup         | Nkọwa                                                                                                 |
| ------------------------------------------------------------- | -------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Dashboard, otu mkparịta ụka dị mfe                            | `1024` (ndabara ihe oyiyi) | ≥2 GiB                     |                                                                                                       |
| Otu onye nnọchi anya ide koodu (Claude/Codex/Grok)            | `8192`                     | ≥10 GiB                    | `/v1/responses` nke otu session a na-ahụkarị                                                          |
| `/v1/responses` abụọ toro ogologo na-arụkọ ọrụ n'otu oge      | `10240`–`12288`            | ≥12–16 GiB                 | A tụrụ nkwụsị V8 na heap ihe dịka ~12 GiB                                                             |
| Context atọ ma ọ bụ karịa toro ogologo na-arụkọ ọrụ n'otu oge | emela ya n'otu process     | hazie ha n'usoro / RAM ọzọ | Ndabara nnabata ibu ọrụ dị arọ bụ 1 na-arụ ọrụ; iweli ya na-enweghị RAM ga-eme ka nkwụsị ahụ lọghachi |

`omniroute serve` na bare metal na-agbakọ ihe dịka ~35% nke RAM (a kpachiri ya na `[512, 4096]`) mgbe `OMNIROUTE_MEMORY_MB` **anaghị edobe**. Docker na-edobe `1024` mgbe niile, ya mere ngụkọ ahụ anaghị arụ ọrụ n'ime ihe oyiyi gọọmentị.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reverse Proxy n’ụzọ nta (Traefik / nginx)

A na-etinye `basePath` nke Next.js n’ime standalone bundle mgbe a na-emepụta ya. OmniRoute na-edekọ uru ahụ etinyegoro
n’ime faịlụ sentinel dị na mgbọrọgwụ ngwa ahụ (a na-ede ya mgbe `npm run build` na-arụ ọrụ; `scripts/docker/ensure-docker-base-path.mjs` na-agụ ya) ma jiri ya tụnyere
`OMNIROUTE_BASE_PATH` mgbe container malitere. Mgbe ha dị iche, ma e wuru image ahụ
maka mgbọrọgwụ domain, entrypoint na-edegharị standalone manifests, literals
`basePath`/`assetPrefix` ndị etinyegoro (Next 16 na-emepụta URL asset SSR site naanị na
`assetPrefix` — patcher na-etinyekwa ụzọ nta ahụ n’ime ya), URL asset
`/_next/static` ndị etinyegoro (client-reference manifests, mbubata media, ibe njehie
ndị e mere prerender), yana shim `process.env` nke client tupu `node dev/run-standalone.mjs`
arụ ọrụ.

### Mwube Compose (a tụrụ aro)

Tọọ variables abụọ ahụ na `.env`, wee wughachi ka image na runtime kwekọọ:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` na-ebufe `OMNIROUTE_BASE_PATH` dịka Docker build-arg nakwa dịka
runtime environment variable.

### Root image e wuburu + ụzọ nta runtime

A na-ewu images `diegosouzapw/omniroute:*` ndị e bipụtara maka mgbọrọgwụ domain. Ị ka nwere ike
ịtọ `OMNIROUTE_BASE_PATH` n’oge runtime; container ahụ ga-eme patch bundle otu ugboro mgbe ọ na-amalite.
Jikọta ya na public origin kwekọrọ ekwekọ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Hazie reverse proxy ka o zipụ ụzọ mpụga ahụ **n’uju** (ewepụla
prefix ahụ). Traefik kwesịrị iziga `PathPrefix(`/omniroute`)` na container ahụ na-enweghị
`StripPrefix`, ka Next.js wee nata `/omniroute/...` ma nye assets site na
`/omniroute/_next/...`.

Docker healthcheck na-enyocha endpoint lifecycle `/healthz` dị mfe, nke e tinyere
`OMNIROUTE_BASE_PATH` na-arụ ọrụ n’ihu ya. `/api/monitoring/health` ka dị maka
nchọpụta nsogbu mmadụ/dashboard; iji mee ka container HEALTHCHECK laghachi na ya (dịka ọmụmaatụ,
maka mmanye nyocha ahụike miri emi), tọọ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ụzọ ahụ bụ nyocha **miri emi** (DB + nchịkọta monitoring) — ọ dabara maka
`HEALTHCHECK` Docker nke anaghị eme ọtụtụ ugboro ma ọ bụrụ na ịhọrọ ịlaghachi na ya, mana ọ **dabaraghị** maka oge n’etiti
`livenessProbe` nke Kubernetes.

Maka orchestrators (Kubernetes, Nomad, wdg.):

| Probe           | Họrọ karịa                                                              | Zere                                                                   |
| --------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ma ọ bụ TCP na port bụ isi (`PORT`, ndabara `20128`) | Iji `/api/monitoring/health` dịka liveness                             |
| Readiness       | HTTP `GET /healthz`                                                     | Timeout dị mkpụmkpụ nke na-ewere event-loop ji ọrụ dịka nke nwụrụ anwụ |
| Deep / blackbox | `/api/monitoring/health`                                                | —                                                                      |

`/healthz` na-akọ lifecycle process (`ok` / `starting` / `stopping`). `/livez` bụ naanị
nlele na process ka dị ndụ (200 mgbe ọ bụla handler nwere ike ịrụ ọrụ; ọ naghị echere
readiness). Ha abụọ ka na-arụ ọrụ n’otu Node event loop ahụ request handling na-eji, ya mere
ọrụ catalog ma ọ bụ compression nke CPU na-ejide nwere ike igbu oge nzaghachi ha — ịnọ n’ọrụ ≠ ịnwụ anwụ. Họrọ TCP
liveness ma ọ bụrụ na HTTP probes na-eru timeout. Ntuziaka probe zuru ezu:
[Ntuziaka monitoring — ndụmọdụ probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose na Caddy (HTTPS Auto-TLS)

Enwere ike iji nhazi SSL akpaka nke Caddy kpughee OmniRoute n'ụzọ echekwara. Gbaa mbọ hụ na ndekọ DNS A nke ngalaba gị na-atụ aka na adreesị IP sava gị.

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
      # Ebe mmalite nke ihe nchọgharị na-ahụ maka nzaghachi OAuth, njikọ dashboard, na URL ọha emepụtara.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL sava-na-sava dị n'ime maka ọrụ ahaziri oge / njide data nke onwe.
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

Caddy na-edobe nkụnyeisi mbugharị ọkọlọtọ maka konteena dị n'azụ ya. OmniRoute na-eji
`NEXT_PUBLIC_BASE_URL` dịka ebe mmalite ọha bụ isi maka nzaghachi OAuth na njikọ ọha
emepụtara; ide ihe na dashboard nke chọrọ nkwenye njirimara na-eji arịrịọ sitere n'otu ebe mmalite yana nchedo CSRF
ejikọtara na nnọkọ. Kwado naanị `OMNIROUTE_TRUST_PROXY` maka ntinye dị elu ebe i kpachapụrụ anya
chọọ ka OmniRoute nweta ebe mmalite ọha site na nkụnyeisi mbugharị ndị a tụkwasịrị obi kama iji nhazi
doro anya.

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

## Tag Imēji

| Imēji                    | Tag      | Nha    | Nkọwa                                                               |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer kwụsiri ike kachasị elu **ebipụtarala** (ọ bụghị git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kpọchie ụdị tag a maka GitOps                                       |

Manifest ọtụtụ nyiwe: `linux/amd64` + `linux/arm64` nke ala (Apple Silicon, AWS Graviton, Raspberry Pi). Docker na-ahọrọ nhazi kwekọrọ na-akpaghị aka; nyefee `--platform linux/amd64` ma ọ bụrụ na ịchọrọ ịmanye nṅomi AMD64 na ndị nnabata ARM.

### Ọwa Mwepụta

OmniRoute na-ebipụta ọwa Docker dị iche iche maka mwepụta kwụsiri ike, nnwale alaka mwepụta na-arụ ọrụ, na build mmepe.

| Ọwa                             | Isi mmalite                                    | Mgbanwe                            | Ojiji akwadoro                                                                                                                       |
| ------------------------------- | ---------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Mwepụta e binyere aka/nwere ụdị                | Enweghị ike ịgbanwe                | Ntinye mmepụta nke na-akpọchi otu mwepụta kpọmkwem                                                                                   |
| `:latest` / `:latest-web`       | SemVer kwụsiri ike kachasị elu **ebipụtarala** | Ntụaka kwụsiri ike a pụrụ ịgbanwe  | Na-eso mwepụta kwụsiri ike **mgbe** ọrụ mbipụta SemVer gasịrị — ọ naghị eso `main` ma ọ bụ commit `release/v*` ndị a na-ewepụtabeghị |
| `:next` / `:next-web`           | Alaka `release/v*` ndabara ugbu a              | Ntụaka tupu mwepụta a pụrụ ịgbanwe | Nnwale ndozi ndị batara na alaka mwepụta na-arụ ọrụ mana ha abanyebeghị na mwepụta kwụsiri ike                                       |
| `:main` / `:main-web`           | Alaka `main`                                   | Ntụaka mmepe a pụrụ ịgbanwe        | Maka mmepe na nnwale njikọta naanị                                                                                                   |

#### Ndị na-eweta nnọkọ webụ: imēji `-web`

Ọwa ọ bụla dị n'elu nwekwara tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), nke e wuru site na ọkwa `runner-web` — otu imēji ahụ tinyere Playwright na ihe nchọgharị Chromium. Imēji nkịtị na-abịa **na-enweghị** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` chọrọ ya.

A na-eyigharị ọdịda ahụ, ọ bụghị n'oge mmalite: ndị na-eweta ahụ na-edepụta model ha ma na-egosi dịka ejikọrọ na dashboard, naanị arịrịọ mbụ ga-ada site na ozi a

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ọ bụrụ na ị na-eji ndị na-eweta ahụ, dọpụta tag `-web` nke ọwa ị nọ na ya ugbu a — ọ dịghị ihe ọzọ na-agbanwe. Na nrụnye npm/CLI (na-enweghị imēji Docker), ihe kwekọrọ na ya nke na-efu bụ binary ihe nchọgharị: gbaa `npx playwright install chromium` na nnabata ahụ.

#### Iji ọwa tupu mwepụta

A na-ewughachi chanelụ `next` mgbe ọ bụla e mere push na ngalaba ndabara `release/v*` dị ugbu a, a na-ebipụta ya maka ma AMD64 ma ARM64. Ngalaba ndozi ndị ochie enweghị ike idegharị ya. Chanelụ ahụ na-enye image enwere ike ịdọta maka ndozi ndị etinyerela na ngalaba release nọ n'ọrụ tupu e mepụta tag stable na-esote.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Maka Docker Compose, gbanwee tag image nke profaịlụ ahọpụtara na-eji, wee dọta ma mepụtaghachi ọrụ ahụ:

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

`next` bụ chanelụ pre-release na-agbanwe agbanwe. Ọ nwere ike ịgbanwe mgbe push ọ bụla gasịrị na ngalaba release nọ n'ọrụ, **anaghị akwadokwa ya maka ojiji production**. Kpọgide image digest mgbe ị na-enyocha build akọwapụtara:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tupu nnwale, mee nkwado ndabere nke data volume OmniRoute ma ọ bụ data directory e ji bind-mount jikọta. Iji laghachi azụ, weghachite stable version ma ọ bụ digest e jiri na mbụ, ma mepụtaghachi container ahụ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build sitere na ngalaba release enweghị ike ibugharị `latest`; naanị stable semantic version tozuru etozu nwere ike ịkwalite pointer stable ahụ. Image `next` na-edowe nyocha image release na ọnụ ụzọ mgbochi adịghị ike CRITICAL.

**`latest` abụghị nkwa na ọ bụ nke kacha ọhụrụ maka git.** Ndozi ndị etinyere na `main` ma ọ bụ na ngalaba `release/v*` nọ n'ọrụ adịghị na `:latest` ruo mgbe ebipụtara image stable SemVer ma ọrụ mbipụta ahụ kwalite `:latest` (otu digest ahụ dị ka SemVer ahụ). Ọ bụrụ na `latest` yiri ka ọ kwụsịrị ebe GitHub egosilarị ndozi ahụ, dọta `:next` iji nwalee ngalaba release ahụ, ma ọ bụ chere tag SemVer.

| Ihe ị chọrọ                                                          | Ihe ị ga-eji                            |
| -------------------------------------------------------------------- | --------------------------------------- |
| GitOps / production nke na-ekwesịghị ịgbanwe n'onwe ya               | Kpọgide `:X.Y.Z` (ma ọ bụ image digest) |
| Soro stable ndị e bipụtara ma nabata mmepụtaghachi na release ọ bụla | `:latest`                               |
| Nwalee commit `release/v*` ndị a na-ebipụtabeghị                     | `:next` (ọ bụghị production)            |
| Nwalee `main`                                                        | `:main` (ọ bụghị production)            |

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

## Nnweta: SQLite ndabara bụ otu replica

Docker / Kubernetes OmniRoute ndabara bụ **otu usoro Node + otu onye na-ede SQLite**. **Anaghị akwado** nnweta dị elu na topology ahụ.

| Mmachi                                            | Nsonaazụ                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Otu onye na-ede                                   | **Agbala** ọtụtụ replica megide otu faịlụ SQLite ahụ. Nke ahụ ga-emebi DB.                                                                                                                                                                                                                                                                                  |
| Mepụtaghachi / malitegharịa / ogbugbu HEALTHCHECK | **Nkwụsị ọrụ zuru ezu** nke SSE ndị na-aga n'ihu, session dashboard, na state dị na memory. Njikọ onye ahịa ọ bụla ga-akwụsị. Arịrịọ ọhụrụ n'oge windo endpoint tọgbọ chakoo ga-enweta **`502 Bad Gateway: Unknown error`** site na reverse proxy, ọ bụghị JSON OmniRoute — ndị ahịa enweghị ike ịmata ọdịiche dị n'etiti nke a na ọdịda provider (#11015). |
| Otu event loop ahụ dịka `/healthz`                | Catalog ji ọrụ n'aka ma ọ bụ tick compression nwere ike igbu oge probe; timeout dị mkpụmkpụ ga-amalitegharị **naanị** replica ahụ.                                                                                                                                                                                                                          |

**Matriks probe** (leekwa [ndụmọdụ probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe         | Ebe a na-elekwasị anya                                          | Ejila                                                                     |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Ịdị ndụ       | TCP na `PORT` (ndabara `20128`), ma ọ bụ HTTP dị nro `/healthz` | `/api/monitoring/health`                                                  |
| Ịdị njikere   | HTTP `GET /healthz`                                             | Timeout siri ike nke na-ewere event loop ji ọrụ n'aka dịka nke nwụrụ anwụ |
| Omimi / mmadụ | `/api/monitoring/health`                                        | Liveness kubelet akpaaka                                                  |

**Nkwalite:** tụọ anya na session ọ bụla ga-akwụsị. Mee ka ndị ahịa kwụsị nke ọma ma ọ bụrụ na ị nwere ike; enweghị rolling update na SQLite ndabara. Compose `restart: unless-stopped` tinyere Docker `HEALTHCHECK` ga-edochikwa naanị usoro ahụ mgbe container ghọrọ Unhealthy — otu oke mmetụta ahụ.

Iberibe Kubernetes maka **otu replica** (Recreate dị mkpa; amụbawanye `replicas` megide otu faịlụ SQLite):

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

Nkwụsịtụ `preStop` na-enye kube ohere iwepụ njedebe Service tupu SIGTERM ka okporo ụzọ **ọhụrụ** kwụsị iru usoro ahụ na-anwụ anwụ. A na-enye SSE `/v1/responses` ndị ka na-aga n'ihu ohere imecha ruo `SHUTDOWN_TIMEOUT_MS` (ndabara bụ 30s) site na ikike nnabata heavyweight (#11015). Arịrịọ ọhụrụ ndị ka rutere usoro ahụ ga-enweta `503` + `Retry-After: 5`. Oghere enweghị-endpoint nke Recreate ruo mgbe ihe nnọchi ahụ ghọrọ Ready ka bụ nkwụsị ọrụ zuru oke — nke ahụ bụ nhazi SQLite, ọ bụghị nhazi probe na-ezighi ezi.

External Postgres / multi-writer HA **abụghị** ụzọ stock e depụtara n’akwụkwọ. Ọ bụrụ na ịchọrọ HA, jiri otu replica naanị ma ọ bụ mee nhazi nke project ahụ nwalere ma depụta iche n’akwụkwọ. Ọrụ Postgres/MySQL dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ruo mgbe ewepụtara nke ahụ, naanị ụzọ akwadoro iji mụbaa ikike `/v1/responses` **buru ibu** bụ usoro N ndị nọọrọ onwe ha (akụkụ na-esote), ọ bụghị `replicas > 1` n’otu volume.

## Ịgbasa ikike: usoro N nọọrọ onwe ha

Otu usoro Node bụ **otu V8 heap**. Arịrịọ coding-agent abụọ na-adakọta, nke ọ bụla dị ihe dịka ~3 MiB / ~750k-token, `POST /v1/responses` (RTK + Caveman), na-eme ka heap ahụ kwụsị na ihe dịka ~12 Gi (`FATAL ERROR: Reached heap limit`) ma nwee ike ime ka cgroup 16 Gi banye OOM. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ntụle ahụ bụ ịdọ aka ná ntị gbasara **oke ebe nchekwa**, ọ bụghị oke ngwaahịa siri ike nke arịrịọ ogologo `/v1/responses` abụọ na-aga n'otu oge. A na-achịkwa nnabata chat dị arọ site na oke ingest byte a na-ewepụta na-akpaghị aka (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) nke a haziri site n'otu oke V8/cgroup ahụ — ịbawanye ya site n'ịgbanwe ntọala (ma ọ bụ ịtọ oke ọnụọgụ arịrịọ ochie `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) n'usoro ahazirilarị nha ga-eme ka nkwụsị ahụ laghachi. Chat ndị pere mpe, `/healthz`, `/v1/models`, na MCP **anọghị** n'oke ahụ.

### Otu usoro: karịa arịrịọ ogologo `/v1/responses` abụọ

Usoro **dị mma** (heap dị n'okpuru `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ndabara ya bụ `0.75`) **nwere ike** ime arịrịọ ogologo `POST /v1/responses` karịrị abụọ n'otu oge ma ọ bụrụ na oke inflight-byte nke usoro niile (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ka nwere ohere. Body ndị hà ma ọ bụ karịa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ndabara ya bụ 256 KiB) na-ewere otu heavyweight lease ahụ arịrịọ nwere nhazi dị arọ na-eji, ma jiri otu ụzọ mgbapụ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ọtụtụ iri client SSE ogologo na-aga n'otu oge (ndị na-ahụ maka sistemụ na-achọkarị 40–50) bụ ajụjụ gbasara **oke ebe nchekwa** — hazie nha heap + oghere primary/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ọ bụghị oke ngwaahịa siri ike nke “karịa 2 agaghị ekwe omume.” Heap nọ n'okpuru nrụgide ka ga-ewepụ ibu site na `503` enwere ike ịnwale ọzọ, ka #7849 ghara ịlaghachi.

Iji **mụbaa heap** (V8 old-spaces nọọrọ onwe ha) **taa**:

| Mee                                                                                                                                          | Emela                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Gbaa **container/pod N**, nke ọ bụla nwere `DATA_DIR` / volume nke **ya onwe ya**                                                            | Tọọ `replicas > 1` ka ha jiri otu faịlụ SQLite                  |
| Hazie heavy in-flight + healthy-headroom dabere na heap / oke inflight-byte; 1–2 bụ ndabara nchekwa nke #7849, ọ bụghị oke ngwaahịa siri ike | Nye otu usoro RAM ji okpukpu 8 na oke ọnụọgụ na-enweghị njedebe |
| Nhọrọ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` maka **quota counter ndị a na-ekekọrịta**                                        | Were Redis dị ka SQLite a na-ekekọrịta — ọ bụghị ya             |
| Tinye otu provider secret ahụ n'ime instance ọ bụla (ma ọ bụ nabata dashboard ndị kewara ekewa)                                              | Tụọ anya otu dashboard / otu call-log n'ofe instance niile      |
| Debe load balancer ọ bụla n'ihu; sticky site na API key ma ọ bụ session ezuola                                                               | Chọọ middleware pụrụ iche nke vendor nke na-eburu nha n'uche    |

Akụrụngwa: ọnụ ọgụgụ arịrịọ ogologo `/v1/responses` nke instance ọ bụla nwere ike ime n'otu oge bụ ajụjụ gbasara **oke ebe nchekwa** (heap + inflight-byte / #10110). `DATA_DIR` N nọọrọ onwe ha ka na-amụba heap: RAM host ga-ezuru `N × cgroup`, ọ bụghị “otu pod 16 Gi nwere N=8.” Etinyela `replicas > 1` n'otu faịlụ SQLite ma ọlị.

Ihe atụ Compose (heap abụọ, volume abụọ — ọ bụghị `deploy.replicas: 2`):

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

Njupụta n'ime usoro (ịwepụ compression na HTTP isolate) dị na [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Otu cluster ezi uche dị na ya nke nọ n'elu durable state a na-ekekọrịta dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
