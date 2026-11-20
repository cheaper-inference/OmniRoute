# 🐳 Docker Guide — OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tagairt iomlán d’imscaradh Docker. Chun tosú go tapa, féach ar [rannán Docker sa README](../README.md#-docker).

## Clár na nÁbhar

- [Rith Thapa](#quick-run)
- [Le Comhad Timpeallachta](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Próifílí atá ar Fáil](#available-profiles)
- [Uirlisí CLI an óstríomhaire a chumrú nuair a ritheann OmniRoute in Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Taobh-choimeádán Redis](#redis-sidecar)
- [Compose Táirgthe](#production-compose)
- [Céimeanna Dockerfile](#dockerfile-stages)
- [Athróga Timpeallachta Ríthábhachtacha](#critical-environment-variables)
- [Docker Compose le Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tollán Tapa Cloudflare](#cloudflare-quick-tunnel)
- [Clibeanna Íomhá](#image-tags)
- [Nuashonruithe deais in Docker](#dashboard-updates-in-docker)
- [Infhaighteacht: is macasamhail aonair é SQLite de réir réamhshocraithe](#availability-default-sqlite-is-single-replica)
- [Earráidí réigiúnacha Gemini laistigh de Docker](#gemini-regional-errors-inside-docker)
- [Nótaí Tábhachtacha](#important-notes)

---

## Rith Thapa

> **Féin-óstach in aon ordú amháin?** Féach ar an [Treoir Féin-Ósta](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (íomhá foilsithe + Redis, loopback-amháin, gan aon rogha próifíle). Is é an Quick Run thíos an cosán aon-choimeádáin d'úsáideoirí a ritheann Redis in áiteanna eile cheana féin.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Le Comhad Timpeallachta

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
# Bunphróifíl (gan uirlisí CLI)
docker compose --profile base up -d

# Próifíl CLI (Claude Code, Codex, OpenClaw ionsuite)
docker compose --profile cli up -d

# Próifíl óstríomhaire (Linux ar dtús; feistíonn sé dénárthaigh CLI an óstríomhaire mar inléite amháin)
docker compose --profile host up -d

# Próifíl ghréasáin (Chromium/Playwright do sholáthraithe seisiún gréasáin)
docker compose --profile web up -d

# Comhcheangail CLI + taobh-choimeádán CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Próifílí atá ar Fáil

Tagann OmniRoute le próifílí Compose do na príomhleaganacha imscartha. Roghnaigh an ceann a oireann do do thimpeallacht.

| Próifíl              | Seirbhís         | Cathain is ceart í a úsáid                                                                                                                                                  | Ordú                                         |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (réamhshocrú) | `omniroute-base` | Freastalaí gan chomhéadan grafach / timpeallacht rite íosta, gan CLIanna soláthraithe a bheith cuachta                                                                      | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Sreafaí oibre gníomhairíocha a ghlaonn `omniroute providers/setup/doctor` agus CLIanna cuachta (Codex, Claude Code, Droid, OpenClaw)                                        | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Óstríomhairí Linux ar mian leo rochtain cosúil le `network_mode` ar CLIanna an óstríomhaire trí `~/.local/bin`, `~/.codex`, `~/.claude`, srl. a fheistiú mar inléite amháin | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Rith taobh-choimeádán [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ar phort `8317` le haghaidh seachfhreastalaíocht CLI réamhtheachtach                      | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Soláthraithe seisiún gréasáin a dteastaíonn brabhsálaí uathu: `gemini-web`, `claude-web`, `claude-turnstile` (tógann sé `runner-web`, Chromium san áireamh)                 | `docker compose --profile web up -d`         |

> Is féidir próifílí iomadúla a chomhcheangal: `docker compose --profile cli --profile cliproxyapi up -d`.

## Uirlisí CLI an óstaigh a chumrú nuair a ritheann OmniRoute in Docker

Scríobhann `omniroute setup-codex`, `setup-claude`, `config set <tool>` agus cnaipe
**Sábháil an chumraíocht** na deaise comhaid amhail `~/.codex/*.config.toml`. Ní bhíonn
ciall leis na conairí sin ach ar an ríomhaire ar a ritheann an CLI féin. Má ritheann
tú iad laistigh den choimeádán, scríobhtar chuig fillteán baile an choimeádáin féin
(`/home/node` — ritheann an íomhá mar `USER node`), áit nach léifidh aon CLI ar an
óstach iad choíche agus a scriostar iad a luaithe a athchruthaítear an coimeádán.

Braitheann OmniRoute é seo agus diúltaíonn sé don scríobh, agus treoracha á dtabhairt
aige in ionad rath nach féidir leat úsáid a bhaint as a thuairisciú: scoireann an CLI
le `2`, agus freagraíonn an API le `422` agus `containerEphemeralTarget: true`.

### Molta: rith an CLI ar an óstach agus OmniRoute in Docker

Freastalaíonn an coimeádán ar an API; cumraíonn an CLI uirlisí d'óstaigh.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # dírigh an CLI ar an gcoimeádán
omniroute setup-codex                      # scríobhann sé chuig an bhfíor-~/.codex ar d'óstach
```

Seo é an rogha cheart nuair a ritheann Codex, Claude Code, Cursor nó uirlisí
comhchosúla ar do ríomhaire glúine — mar is gnách.

### Rogha eile: ceangal-fheistigh fillteáin chumraíochta an óstaigh (próifíl `host`)

Más mian leat go scríobhfadh an coimeádán féin chuig cumraíocht d'óstaigh,
feistigh na fillteáin ann agus dírigh `CLI_CONFIG_HOME` ar fhréamh na feiste.
Déanann an phróifíl `host` é seo cheana féin:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Is é ceangal-fheiste a fhágann gur féidir muinín a bheith agat as an gconair:
léann OmniRoute `/proc/self/mountinfo` agus ceadaíonn sé scríobh chuig conairí
feistithe (agus chuig fillteáin ar feistí iad a bhfochomhadlanna, arb é sin go
díreach struchtúr `/host-home` thuas), agus leanann sé de dhiúltú do chonairí
nach bhfuil feistithe.

### Bealach éalaithe: cumraigh CLIanna an choimeádáin féin (úsáid go spárálach)

Nuair atá na CLIanna laistigh den choimeádán i ndáiríre (an phróifíl `cli`), bíonn
an scríobh d'aon ghnó. Tabhair `--allow-container-write` d'aon ordú `setup-*`, nó
socraigh `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` don fhreastalaí. Leanann an
scríobh ar aghaidh le rabhadh nach mairfidh sé tar éis an coimeádán.

> **Rabhadh slándála — próifíl `cli` + feiste `docker.sock`.**
> Ceangal-fheistíonn an phróifíl `cli` `/var/run/docker.sock` ionas gur féidir leis
> an nuashonraitheoir uathoibríoch laistigh den choimeádán an chruach a athchruthú
> ó dheamhan an óstaigh (`src/lib/system/autoUpdate.ts` a dhéanann cuardach don
> tsoicéad sin agus a sheachnaíonn conair Docker nuair nach mbíonn sé ann). Is
> **teorainn iontaoibhe fhréimhe an óstaigh** é an soicéad sin: rialaíonn aon ní
> atá in ann é a bhaint amach deamhan Docker an óstaigh mar fhréamh — is féidir
> leis coimeádán ar bith ar an óstach a chruthú, a iniúchadh, a stopadh agus a bhaint.
> Impleachtaí:
>
> 1. **Ná nocht port na próifíle `cli` don líonra choíche.** Foilsigh é
>    ar `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — má bhíonn próifíl `cli` inrochtana ón LAN, déanfaidh aon RCE ar leibhéal na
>    deaise dochar iomlán don óstach.
> 2. **Ná ceangail aon fhillteáin bhreise ón óstach leis an bpróifíl `cli`.**
>    Tugann soicéad Docker, mar aon le haon fheiste eile, rochtain iomlán
>    léite/scríofa don choimeádán ar do chóras comhad agus ar chumraíocht an óstaigh.
>    Más gá d'uirlis tionscadal a fheiceáil, rith go háitiúil í leis an dénártha CLI
>    — ná feistigh isteach sa choimeádán `cli` í.
>
> Mura bhfuil nuashonrú uathoibríoch laistigh den choimeádán de dhíth ort, ná cuir
> an phróifíl `cli` ar siúl (`COMPOSE_PROFILES=core,redis` nó ceann níos giorra).
> Ní fheistíonn na próifílí eile soicéad Docker.
>
> Féach `docs/security/MITM-TPROXY-DECRYPT.md` (git; níl sé tiomsaithe isteach in `/docs`) don tsamhail bhagartha ghaolmhar
> maidir le MITM, agus `docs/security/SUPPLY_CHAIN.md` don slabhra tionscnaimh
> dhénártha `codex`/`claude-code`/`droid`/`openclaw`.

## Taobhchoimeádán Redis

Braitheann OmniRoute ar Redis chun tacú leis an teorantóir ráta dáilte agus leis an taisce chomhroinnte. Sainítear an tseirbhís `redis` **i gcónaí** in `docker-compose.yml` (níl aon gheata próifíle aici) agus tosaíonn sí in éineacht le haon phróifíl eile.

| Sonra                  | Luach                                           |
| ---------------------- | ----------------------------------------------- |
| Íomhá                  | `redis:7-alpine`                                |
| Ainm an choimeádáin    | `omniroute-redis`                               |
| Port inmheánach        | `6379`                                          |
| Port óstaigh (sárú)    | `REDIS_PORT` (`6379` mar réamhshocrú)           |
| Ceangal óstaigh (sárú) | `REDIS_BIND_HOST` (`127.0.0.1` mar réamhshocrú) |
| Imleabhar              | `omniroute-redis-data` → `/data`                |
| Seiceáil sláinte       | `redis-cli ping` (eatramh 10s)                  |

Athróga timpeallachta gaolmhara:

- `REDIS_URL` — teaghrán ceangail a instealltar san aip (`redis://redis:6379` mar réamhshocrú).
- `REDIS_PORT` — mapáil poirt ar thaobh an óstaigh don choimeádán Redis.
- `REDIS_BIND_HOST` — comhéadan an óstaigh ar a bhfoilsítear an port. Is é `127.0.0.1` an réamhshocrú.

> **Cén fáth a n-úsáidtear an lúb siar mar réamhshocrú:** ritheann an taobhchoimeádán gan `requirepass`, agus sroicheann
> coimeádáin na haipe é thar líonra compose (`redis:6379`) — níl an port foilsithe ann
> ach amháin le haghaidh uirlisí ar thaobh an óstaigh (`redis-cli`, `npm run dev` áitiúil). Dá bhfoilseofaí é ar
> `0.0.0.0`, nochtfaí Redis gan fíordheimhniú do gach óstach ar do LAN. Má shocraíonn tú
> `REDIS_BIND_HOST=0.0.0.0`, cuir `--requirepass` le `command:` na seirbhíse freisin.

Ní mholtar **Redis a dhíchumasú** (díghrádóidh an teorantóir ráta go dtí cúltaca cuimhneacháin). Más gá duit é sin a dhéanamh, bain amach nó cuir an bloc seirbhíse `redis:` in `docker-compose.yml` mar nóta tráchta, nó scálaigh go nialas é:

```bash
docker compose up -d --scale redis=0
```

## Compose Táirgthe

Le haghaidh léargas táirgthe leithlisithe a ritheann taobh leis an timpeallacht forbartha, úsáid `docker-compose.prod.yml`.

| Sonra                         | Luach                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Comhad                        | `docker-compose.prod.yml`                                                                |
| Port réamhshocraithe an deais | `PROD_DASHBOARD_PORT=20130` (mapáilte chuig `${DASHBOARD_PORT:-20128}` inmheánach)       |
| Port réamhshocraithe API      | `PROD_API_PORT=20131`                                                                    |
| Íomhá                         | `omniroute:prod` (tógtha ón sprioc `runner-cli`)                                         |
| Coimeádán Redis               | `omniroute-redis-prod` (`redis:8.6.2`, imleabhar tiomnaithe `redis-prod-data`)           |
| Imleabhar sonraí              | `omniroute-prod-data` (ainmnithe, marthanach thar atógálacha)                            |
| Seiceálacha sláinte           | `node healthcheck.mjs` + `redis-cli ping`, agus `depends_on` geataithe ar shláinte Redis |

Conas é a úsáid:

```bash
# Tóg agus tosaigh an chruach táirgthe
docker compose -f docker-compose.prod.yml up -d --build

# Sruthaigh na logaí
docker compose -f docker-compose.prod.yml logs -f

# Leag síos í (coinnigh na himleabhair)
docker compose -f docker-compose.prod.yml down
```

Ritheann an chruach táirgthe go comhthreomhar leis an compose forbartha (ainmneacha coimeádán, poirt agus imleabhair éagsúla), mar sin is féidir leat leanúint den atriall go háitiúil fad a fhanann an córas táirgthe ag rith.

## Céimeanna Dockerfile

Seoltar Dockerfile ilchéime (`Dockerfile`) sa stór. Tá ceithre chéim nochta; roghnaigh an `target` ceart do do chás úsáide.

| Céim          | Buníomhá              | Cuspóir                                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Suiteáil deps (`npm ci --legacy-peer-deps`) agus ritheann `npm run build` (Turbopack de réir réamhshocraithe — féach acmhainní Tóg-am thíos)                                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Am rite táirgeachta leis an aschur aonair Next.js.** Níl aon soláthraí CLIs cuachta.**                                                                                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | Cuireann sé `git`, `docker.io`, `docker-compose` agus CLIs domhanda leis: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Roghnaigh é seo le haghaidh sreabhadh oibre gníomhaireach.**                                                                                                                 |
| `runner-web`  | `runner-base`         | Cuireann sé Playwright + le brabhsálaí Cróimiam (`--with-deps`) le haghaidh soláthraithe seisiúin ghréasáin: `gemini-web`, `claude-web`, `claude-turnstile`.** Roghnaigh é seo nuair a úsáideann tú na soláthraithe sin** — teipeann ar an ngnáthíomhá nuair a iarrtar é gan é (féach an nóta `-web` faoi Cainéil Eisiúna). |

Tóg sprioc ar leith de láimh:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Tógáil-acmhainní ama

Rialaíonn trí airg tógála cad a chosnaíonn an chéim `builder`. Níl iontu ach am tógála — `OMNIROUTE_MEMORY_MB` (thíos) is knob am rite ar leith.

| Tóg arg                     | Réamhshocrú | Éifeacht                                                                                                   |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | Tógann `0` le webpack: cuimhne buaic níos ísle, níos moille. roghnaíonn `1` isteach Turbopack.             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Uasteorainn charn V8 (`--max-old-space-size`) don `next build` sceite .                                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Fothaí `CIRCLE_NODE_TOTAL`; Tagann an chéad chéim eile `workers = N - 1` chun sonraí leathanach a bhailiú. |

Is é `OMNIROUTE_BUILD_WORKERS` an ceann a thógann sé ar thógálaí mór agus an ceann a bhfuil amhras air nuair a fhaigheann tógáil srianta bás** tar éis** `✓ Compiled successfully`. Is é gach oibrí sonraí leathanaigh a phróiseas féin, agus mar sin is é an tuismitheoir `next build` féin; rinne atáirgeadh beo VPS (eisiúint #7518) RSS gach próiseas a thomhas ag ~ 4.5 GB neamhspleách ar bhratach an chairn `NODE_OPTIONS` (tiomsaíonn Turbopack i gcuimhne native/Rust lasmuigh den gcarn V8). Is é an réamhshocrú `2` (→ 1 oibrí, 2 phróiseas iomlán) meánmhéide do na reathaithe 16 GB / 4 vCPU -óstáil GitHub a úsáideann an phíblíne foilsitheoireachta. Ag `8` (→ 7 oibrí) d'imigh an rádala sin as cuimhne agus theip ar buildkit an chéim le `ResourceExhausted: ... cannot allocate memory`; Ní raibh `3` (→ 2 oibrí) oiriúnach fós nuair a rinneadh an RSS in aghaidh an phróisis a thomhas go díreach in ionad an tátal a bhaint as. déanann `tests/unit/docker-build-memory-budget.test.ts` an uimhríochtúil in aghaidh an fhíor tomhaiste agus teipeann air má éiríonn le ceachtar den dá chnap an reathaí.

Tiomsaíonn Turbopack i gcuimhne Rust dúchais a chónaíonn** amuigh** an gcarn V8, mar sin ní cheanglaíonn `OMNIROUTE_BUILD_MEMORY_MB` é. Ar óstach le síleáil chuimhne déantar an tógáil ansin SIGKILLed ag an marfóir OOM gan aon téacs earráide ar bith — stopann sé ach lár-`Creating an optimized production build`, a léann cosúil le croch seachas cuimhneachán. Sin é an fáth go mainneachtainí an `Dockerfile` le webpack (`OMNIROUTE_USE_TURBOPACK=0`), murab ionann agus `npm run dev` / `npm run build`, áit a bhfuil Turbopack an réamhshocrú cód: `docker build .` lom gan aon args tógála (an méid a ritheann Iarnróid agus óstaigh aon-cliceáil eile) ní féidir bás ciúin ar thógálaí cuimhne-theorainn. Gabhann na híomhánna foilsithe `OMNIROUTE_USE_TURBOPACK=0` go sainráite i `docker-publish.yml` cheana féin. Ar thógálaí le neart RAM, rogha an diúltaithe i Turbopack chun tógáil níos tapúla:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Tá `webpackBuildWorker` cumasaithe, mar sin ritheann `next build` tuismitheoir** agus** próiseas oibrithe agus gach onóracha `OMNIROUTE_BUILD_MEMORY_MB` ar leithligh. Méid uasteorainn an choimeádáin os cionn thart ar dhá uair an luach sin, ní uair amháin.

Arna thomhas ar an gcrann seo (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Cuachóir          | Uasteorainn coimeádán | Toradh                                  |
| ----------------- | --------------------- | --------------------------------------- |
| Turbopack         | 8 GiB / 16 GiB        | OOM-maraíodh ag an dá, go ciúin         |
| pacáiste gréasáin | 8 GiB                 | oibrí tógála SIGKILLed                  |
| pacáiste gréasáin | 12 GiB                | d'éirigh leis, buaicphointe ag 11.1 GiB |

### Réamhshocrú ama rite

Réamhshocruithe arna n-onnmhairiú ag `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Iompar cuimhne i Docker:

- Socraíonn an íomhá `OMNIROUTE_MEMORY_MB=1024` agus díorthaítear `NODE_OPTIONS=--max-old-space-size=1024` uaidh.
- Is é an tosaitheoir neamhspleách a chuireann tús le próiseas an fhreastalaí féin, a léann `OMNIROUTE_MEMORY_MB` agus a chuireann `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Úsáideann Nód an luach `--max-old-space-size` deireanach arís agus arís eile, mar sin rialaíonn socrú `OMNIROUTE_MEMORY_MB` teorainn éifeachtach an charn Docker.
- Toisc go leagann an íomhá í i gcónaí, ní bhíonn feidhm ag cúl-ais-chalabrú RAM-chalabraithe an lainseálaí féin faoi Docker. Ardaigh go sainráite é don ualach oibre (tábla thíos). tá `2048` fós róbheag le haghaidh códaithe-ghníomhaire `/v1/responses`.

### Runtime RAM le haghaidh gníomhairí códaithe

Is é an réamhshocrú 1 GiB Docker urlár dashboard/light-chat, ní méid táirgeachta. Coinníonn comhlachtaí fada `POST /v1/responses` (na céadta teachtaireachtaí, na mílte uirlisí) graif ilchuimhne le linn comhbhrú. Tá deireadh tagtha le dhá iarratas forluiteacha ~ 3 MiB / ~ 750k-chomhartha V8 ag a** 12 GiB** sean-spás (`FATAL ERROR: Reached heap limit`) agus freisin bhuail 16 GiB cgroup OOM. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Méid** cgroup `--memory` os cionn an chairn** suíonn maoláin dhúchasacha —, SQLite, agus idirmheánacha comhbhrú lasmuigh de V8.

| Ualach oibre                                   | `OMNIROUTE_MEMORY_MB`          | Coimeádán / cgroup       | Nótaí                                                                                                            |
| ---------------------------------------------- | ------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Painéal, comhrá éadrom amháin                  | `1024` (réamhshocraithe íomhá) | ≥2 GiB                   |                                                                                                                  |
| Gníomhaire códaithe amháin (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                  | `/v1/responses` seisiún aonair tipiciúil                                                                         |
| Dhá `/v1/responses` fada comhthráthach         | `10240`–`12288`                | ≥12–16 GiB               | Toirmisctear V8 tomhaiste ag ~ 12 GiB heap                                                                       |
| Trí + comhthéacs fada comhthráthach            | ná ar phróiseas amháin         | sraitheach / níos mó RAM | Is é an t-iontráil thrommheáchain réamhshocraithe ná 1 in-eitilt; é a ardú gan RAM athbhunaítear an ginmhilleadh |

calabraíonn `omniroute serve` ar mhiotal lom ~ 35% de RAM ( clampáilte `[512, 4096]`) nuair a bhíonn `OMNIROUTE_MEMORY_MB`** neamhshonraithe** . Leagann Docker `1024` i gcónaí , ionas nach ritheann calabrú san íomhá oifigiúil.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Athróga Criticiúla Timpeallachta

De bhreis ar na réamhshocruithe atá doiciméadaithe in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), is iad na hathróga seo a leanas is tábhachtaí agus Docker á rith:

| Athróg                        | Cuspóir                                                                                                                                                                                                                                                                                          | Réamhshocrú                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rún comhroinnte don droichead WebSocket. **Riachtanach sa timpeallacht táirgthe** — socraigh é mar theaghrán láidir randamach.                                                                                                                                                                   | gan socrú (ní mór é a sholáthar) |
| `REDIS_URL`                   | Teaghrán ceangail don teorantóir ráta / inneall taisce                                                                                                                                                                                                                                           | `redis://redis:6379`             |
| `REDIS_PORT`                  | Port ar thaobh an óstaigh don choimeádán Redis cuachta                                                                                                                                                                                                                                           | `6379`                           |
| `REDIS_BIND_HOST`             | Comhéadan óstaigh ar a bhfoilsítear port cuachta Redis (aislúb mura gcuireann tú AUTH leis)                                                                                                                                                                                                      | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Conair óstaigh atá feistithe sa phróifíl `cli` ag `/workspace/omniroute` le haghaidh sreafaí oibre féin-nuashonraithe                                                                                                                                                                            | `.` (an chomhadlann reatha)      |
| `OMNIROUTE_MEMORY_MB`         | Uasteorainn charn Node ag am rite don fhreastalaí neamhspleách Docker; sáraíonn sé réamhshocrú na híomhá thuas. Gníomhairí códúcháin: `8192`+ (féach [RAM ag am rite](#runtime-ram-for-coding-agents)).                                                                                          | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | Sáraigh na poirt nochta don deais (20128) agus don API (20129)                                                                                                                                                                                                                                   | `20128` / `20129`                |
| `APP_BIND_HOST`               | Comhéadan óstaigh ar a bhfoilsíonn docker-compose poirt na deaise/an API/live-WS. Le `REQUIRE_API_KEY=false` (an réamhshocrú), nochtann `0.0.0.0` an seachfhreastalaí anaithnid `/v1` don LAN — ná leathnaigh é ach le `REQUIRE_API_KEY=true` nó le seachfhreastalaí droim ar ais os a chomhair. | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | Comhéadan óstaigh ar a bhfoilsíonn docker-compose an taobhcharr `cliproxyapi` — coinníonn a imleabhar sonraí dintiúir soláthraithe.                                                                                                                                                              | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | Comhadlann a léann scanóir breiseán na timpeallachta rite agus a suiteálann sé breiseáin inti. Socraigh í nuair a bhíonn breiseáin feistithe trí nascadh: leanann an réamhshocrú `HOME`, rud nach gá d’íomhá a easpórtáil.                                                                       | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | Fo-chonair URL nuair a fhoilsítear an aip taobh thiar de sheachfhreastalaí droim ar ais (e.g. `/omniroute`)                                                                                                                                                                                      | _(folamh = fréamh)_              |
| `NEXT_PUBLIC_BASE_URL`        | Bunús poiblí an bhrabhsálaí, an fho-chonair san áireamh (e.g. `https://host/omniroute`)                                                                                                                                                                                                          | gan socrú                        |
| `PROD_DASHBOARD_PORT`         | Port na deaise ar thaobh an óstaigh do `docker-compose.prod.yml`                                                                                                                                                                                                                                 | `20130`                          |
| `CLIPROXYAPI_PORT`            | Port ar thaobh an óstaigh don taobhcharr `cliproxyapi`                                                                                                                                                                                                                                           | `8317`                           |

## Seachfhreastalaí Droim ar Ais ar Fhochonair (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Cum tógáil (molta)

Socraigh an dá athróg in `.env`, ansin aththóg ionas go n-aontaíonn an íomhá agus an t-am rite:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

cuireann `docker-compose.yml` ar aghaidh `OMNIROUTE_BASE_PATH` mar Docker build-arg agus mar athróg timpeallachta rite.

### Íomhá fréimhe réamhthógtha + subpath am rite

Tógtar íomhánna foilsithe `cheaperinference/omniroute:*` don fhréamh fearainn. Is féidir leat `OMNIROUTE_BASE_PATH` a shocrú fós ag am rite; paistí an coimeádán an beart uair amháin ar tosaithe. Péireáil leis an mbunús poiblí meaitseála é:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cumraigh an seachfhreastalaí cúl chun an seachfhreastalaí a chur ar aghaidh** lán** cosán seachtrach (ná stiall an réimír). Ba cheart do Traefik `PathPrefix(`/omniroute `)` a threorú chuig an gcoimeádán gan `StripPrefix`, mar sin faigheann Next.js `/omniroute/...` agus freastalaíonn sé ar shócmhainní ó `/omniroute/_next/...`.

Scrúdaíonn an seiceáil sláinte Docker críochphointe saolré éadrom `/healthz` arna réamhshocrú leis an `OMNIROUTE_BASE_PATH` gníomhach. tá `/api/monitoring/health` fós ar fáil le haghaidh diagnóisic human/dashboard ; chun an coimeádán HEALTHCHECK a dhíriú ar ais air (mar shampla le haghaidh forghníomhú sláinte domhain), socraigh `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Is é an cosán sin a** domhain** seiceáil ( achoimre monatóireachta DB + ) — oiriúnach le haghaidh `HEALTHCHECK` neamhmhinic Docker má roghnaíonn tú ar ais isteach, ach** nach bhfuil** le haghaidh eatraimh `livenessProbe` Kubernetes.

Do cheolfhoireann (Kubernetes, Nomad, etc.):

| Tóraigh           | Is fearr                                                                       | Seachain                                                                        |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Beo               | HTTP `GET /livez`, nó TCP ar an bpríomhphort (`PORT`, réamhshocraithe `20128`) | `/api/monitoring/health` mar bheocht                                            |
| ullmhacht         | HTTP `GET /healthz`                                                            | Teorainneacha ama daingean a dhéileálann le lúb imeachta gnóthach mar rud marbh |
| Deep / bosca dubh | `/api/monitoring/health`                                                       | —                                                                               |

tuairiscíonn `/healthz` saolré an phróisis (`ok` / `starting` / `stopping`). tá `/livez` beo próiseas amháin (200 nuair is féidir leis an láimhseálaí rith; ní fhanann sé réidh). Ritheann an dá cheann fós ar an lúb imeacht Nód céanna le láimhseáil iarratais, agus mar sin is féidir le catalóg faoi cheangal CPU nó obair chomhbhrú moill a chur orthu — gnóthach ≠ marbh. Is fearr beocht TCP má aimsíonn HTTP am amuigh. Treoir iomlán an taiscéalaithe: [Treoir monatóireachta — Moltaí probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Cum le Caddy (HTTPS Auto-TLS)

Is féidir OmniRoute a nochtadh go slán trí úsáid a bhaint as soláthar uathoibríoch SSL Caddy. Cinntigh go léiríonn an taifead DNS A d'fhearainn go dtí IP do fhreastalaí .

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

Socraíonn Caddy na ceanntásca caighdeánacha seolta ar aghaidh don choimeádán in aghaidh an tsrutha. úsáideann OmniRoute `NEXT_PUBLIC_BASE_URL` mar bhunús canónach poiblí le haghaidh aisghlaonna OAuth agus naisc phoiblí ginte; scríobhann painéal fíordheimhnithe úsáideann iarratais den bhunadh céanna móide cosaint CSRF atá faoi cheangal seisiúin. Ná cumasaigh `OMNIROUTE_TRUST_PROXY` ach le haghaidh ard-imlonnaithe nuair is mian leat d'aon ghnó OmniRoute an tionscnamh poiblí a dhíorthú ó cheanntásca iontaofa ar aghaidh seachas cumraíocht shainráite.

## Tollán Tapa Cloudflare

Áirítear le tacaíocht deaise d’imscaradh Docker **Tollán Tapa Cloudflare** aonchliceáilte ar `Dashboard → Endpoints`. Le linn an chéad chumasaithe, íoslódáiltear `cloudflared` nuair is gá amháin, cuirtear tús le tollán sealadach chuig do chríochphointe reatha `/v1`, agus taispeántar an URL ginte `https://*.trycloudflare.com/v1` díreach faoi do ghnáth-URL poiblí.

Is féidir painéil tolláin críochphointe (Cloudflare, Tailscale, ngrok) a thaispeáint nó a chur i bhfolach ó `Settings → Appearance` gan staid an tolláin ghníomhaigh a athrú.

### Nótaí faoin Tollán

- Is URLanna sealadacha iad URLanna Tolláin Thapa agus athraíonn siad tar éis gach atosaithe.
- Ní athchóirítear Tolláin Thapa go huathoibríoch tar éis OmniRoute nó coimeádán a atosú. Cumasaigh arís iad ón deais nuair is gá.
- Tacaíonn an tsuiteáil bhainistithe faoi láthair le Linux, macOS, agus Windows ar `x64` / `arm64`.
- Úsáideann Tolláin Thapa bhainistithe iompar HTTP/2 de réir réamhshocraithe chun rabhaidh fhothrópacha faoi mhaolán UDP QUIC a sheachaint i dtimpeallachtaí coimeádáin srianta. Socraigh `CLOUDFLARED_PROTOCOL=quic` nó `auto` más mian leat iompar eile.
- Cuimsíonn íomhánna Docker fréamhacha CA an chórais agus cuireann siad ar aghaidh chuig `cloudflared` bainistithe iad, rud a sheachnaíonn teipeanna iontaoibhe TLS nuair a thosaíonn an tollán taobh istigh den choimeádán.
- Socraigh `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` más mian leat go n-úsáidfeadh OmniRoute dénártha atá ann cheana féin in ionad ceann a íoslódáil.

## Clibeanna Íomhá

| Íomhá                        | Chlib    | Méid | Cur síos                                              |
| ---------------------------- | -------- | ---- | ----------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~    | is airde** foilsithe** SemVer cobhsaí (ní git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~    | PIN an rang seo de chlib le haghaidh GitOps           |

Foilsítear na híomhánna céanna i dtrí stór, leis na achoimrí céanna in aghaidh na hailtireachta: `cheaperinference/omniroute` (Docker Hub, an eagraíocht Tátal Saoire, ó 3.8.53 ar aghaidh), `ghcr.io/cheaper-inference/omniroute` agus an oidhreacht `diegosouzapw/omniroute`, a choinníonn a stair tarraingthe agus a fhaigheann gach eisiúint fós. Coinníonn imscaradh `diegosouzapw/omniroute` reatha cothrom le dáta; tá sé roghnach ainm na híomhá a athrú. Foilsítear an cainéal réamhscaoilte `:next` / `:next-web` thíos go `diegosouzapw/omniroute` agus GHCR amháin.

Léiriú il-ardán: `linux/amd64` + `linux/arm64` dúchais (Apple Silicon, AWS Graviton, Raspberry Pi). roghnaíonn Docker an ailtireacht mheaitseála go huathoibríoch; pas `--platform linux/amd64` más gá duit aithrise AMD64 a bhrú ar óstach ARM.

### Cainéil Eisiúna

Foilsíonn OmniRoute cainéil ar leith Docker le haghaidh eisiúintí cobhsaí, tástáil bhrainse scaoileadh gníomhach, agus tógáil forbartha.

| Cainéal                         | Foinse                                      | Mutability                      | Úsáid molta                                                                                                                            |
| ------------------------------- | ------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | scaoileadh Signed/versioned                 | do-mhothúchánach                | Imscaradh táirgeachta a chruthaíonn scaoileadh cruinn                                                                                  |
| `:latest` / `:latest-web`       | is airde** foilsithe** cobhsaí SemVer       | Pointeoir cobhsaí mutable       | Leanann eisiúintí cobhsaí** tar éis** a SemVer a fhoilsiú a dhéanann —** nach bhfuil** rianaíonn `main` nó `release/v*` nár scaoileadh |
| `:next` / `:next-web`           | Brainse `release/v*` réamhshocraithe reatha | Pointeoir réamhscaoilte comhshó | Ceartúcháin tástála a tháinig i dtír ar an brainse scaoileadh gníomhach ach nach bhfuil fós i scaoileadh cobhsaí                       |
| `:main` / `:main-web`           | brainse `main`                              | Pointeoir forbartha mutable     | Tástáil forbartha agus comhtháthaithe amháin                                                                                           |

#### Soláthraithe seisiún Gréasáin: na híomhánna `-web`

Déantar gach cainéal thuas a dhúbailt mar chlib `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), a tógadh ón gcéim `runner-web` — an íomhá céanna móide Playwright agus brabhsálaí Cróimiam. Na long íomhá simplí** sin** Cróimiam; Tá sé de dhíth `gemini-web`, `claude-web` agus `claude-turnstile`.

Cuirtear an teip ar athló, ní am tosaithe: liostaíonn na soláthraithe sin a gcuid samhlacha agus taispeánann siad mar atá ceangailte sa deais, agus ní theipeann ach ar an gcéad iarratas le

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Má úsáideann tú na soláthraithe sin, tarraing an chlib `-web` den chainéil a bhfuil tú cheana féin ar — ní athraíonn aon rud eile. Ar shuiteáil npm/CLI (gan íomhá Docker ), is é an píosa coibhéiseach atá ar iarraidh ná an dénártha brabhsálaí: reáchtáil `npx playwright install chromium` ar an ósta.

#### Ag baint úsáide as an cainéal réamhscaoileadh

Atógtar an cainéal `next` ar gach brú go dtí an brainse `release/v*` réamhshocraithe reatha agus foilsítear é le haghaidh AMD64 agus ARM64 araon . Ní féidir le craobhacha cothabhála níos sine é a fhorscríobh. Soláthraíonn an cainéal íomhá intarraingthe le haghaidh réitigh atá cumaiscthe isteach sa bhrainse scaoileadh gníomhach sula ngearrtar an chéad chlib chobhsaí eile.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Le haghaidh Docker Compose, sáraigh an chlib íomhá a úsáideann an phróifíl roghnaithe, ansin tarraing agus athchruthaigh an tseirbhís:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sábháilteacht agus ais-rolladh

Is cainéal réamhscaoilte ar snámh `next`. Féadfaidh sé athrú ar aon bhrú go dtí an brainse scaoileadh gníomhach agus tá** gan tacaíocht d'úsáid táirgthe** . PIN an achoimre íomhá agus tógáil ar leith á mheas:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Roimh an tástáil, déan cúltaca de thoirt sonraí OmniRoute nó eolaire sonraí ceangailte-suite. Le rolladh siar, cuir ar ais an leagan cobhsaí a úsáideadh roimhe seo nó díolama agus athchruthaigh an coimeádán:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Ní féidir le tógáil brainse scaoileadh `latest` riamh; ní fhéadfaidh ach leagan séimeantach cobhsaí incháilithe an pointeoir cobhsaí a chur chun cinn. Coinníonn na híomhánna `next` an t-iniúchadh íomhá scaoileadh agus blocáil geata CRITICIÚIL-leochaileacht.

**Ní ráthaíocht airgeadra é `latest` do git.** Tá socruithe cumaisc ar `main` nó ar an mbrainse `release/v*` gníomhach** nach bhfuil** in `:latest` go dtí go bhfoilsítear íomhá cobhsaí SemVer agus cuireann post an fhoilsithe chun cinn `:latest` (coiméad céanna leis an SemVer). Má fhéachann `latest` reoite agus GitHub ag taispeáint an tsocraithe cheana féin, tarraing `:next` chun an brainse scaoileadh a thástáil nó fanacht leis an gclib SemVer.

| Ba mhaith leat                                                     | Úsáid                                |
| ------------------------------------------------------------------ | ------------------------------------ |
| GitOps / táirgeadh nach mór nach sruthóidh                         | Pin `:X.Y.Z` (nó achoimre na híomhá) |
| Lean stáblaí foilsithe agus glac le hathchruthú ar gach scaoileadh | `:latest`                            |
| Tá `release/v*` neamheisiúint geallta                              | `:next` (ní táirgeadh)               |
| Tástáil `main`                                                     | `:main` (ní táirgeadh)               |

## Nuashonruithe an deais in Docker

Ní féidir le coimeádán ó íomhá fhoilsithe é féin a athsholáthar. Nuair a bhraitheann OmniRoute go bhfuil sé ag rith laistigh de
choimeádán (gan seiceáil amach `.git`, agus nach suiteáil npm é), taispeánann meirge nuashonraithe na deaise baile an
t-ordú óstaigh atá le rith in ionad na dtreoracha npm/git, mar aon le cnaipe cóipeála:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Tagann ainm na seirbhíse ó `AUTO_UPDATE_SERVICE` (`omniroute` de réir réamhshocraithe, an tseirbhís in
`docker-compose.selfhost.yml`). Ní bhogann `pull` ach clib shochorraithe (`latest`, `next`); le clib sheasta
`:X.Y.Z`, cuir an chlib in eagar ar dtús.

### Nuashonruithe aonchliceáil le comhad truicear ar an óstach

Chun **Nuashonraigh Anois** a choinneáil ag obair gan `/var/run/docker.sock` a fheistiú (rud a thugann
rochtain fréimhe don choimeádán ar an óstach — féach an rabhadh faoin bpróifíl `cli` thuas), socraigh `DOCKER_UPDATE_TRIGGER_FILE` ar an
tseirbhís OmniRoute agus rith faireoir ar an óstach:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Ní mór don chonair a bheith laistigh de `DATA_DIR` (réitítear luachanna coibhneasta ina aghaidh); diúltaítear do
gach rud eile. Ansin scríobhann **Nuashonraigh Anois** `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` chuig an
gcomhad sin, freagraíonn sé le `202`, agus déanann an deais `/api/system/version` a pholláil go dtí go mbeidh an leagan nua beo
agus go n-athlódálfar í. Ní ritheann OmniRoute blaosc ná ordú Docker riamh sa mhód seo. Mar is amhlaidh le gach gníomh
nuashonraithe, ní ghlactar leis an iarratas ach ó chliaint lúb-ais/LAN.

Tugann eolaire sonraí atá feistithe le ceangal conair chobhsaí don óstach le faire uirthi. Aonaid shamplacha `systemd`
(coigeartaigh `/srv/omniroute` chuig an eolaire ina bhfuil do chomhad compose agus `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Faire ar iarratais nuashonraithe ó dheais OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Tarraing agus athchruthaigh an coimeádán OmniRoute

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

Baineann an tseirbhís an t-iarratas sula dtarraingíonn sí, ionas nach lúbfaidh rith teipthe. Gan
`DOCKER_UPDATE_TRIGGER_FILE`, coinníonn an deais sreabhadh an ordaithe láimhe.

## Infhaighteacht: is macasamhail singil é SQLite réamhshocraithe

Tá stoc Docker / Kubernetes OmniRoute** próiseas Nód amháin + scríbhneoir SQLite amháin** . Tá infhaighteacht ard** gan tacaíocht** ar an topology sin.

| Srian                                     | Iarmhairt                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scríbhneoir aonair                        | Déan** nach bhfuil** rith macasamhla iolracha i gcoinne an chomhaid SQLite céanna. Éillíonn sé sin an DB.                                                                                                                                                                                                                                     |
| Athchruthaigh / atosú / HEALTHCHECK mharú | **Briseadh iomlán** de SSE san eitilt , seisiúin deais, agus staid cuimhneacháin. Titeann gach cliant nasctha. Faigheann iarratais nua le linn na fuinneoige críochphointe folamh seachfhreastalaí droim ar ais**`502 Bad Gateway: Unknown error`** , ní OmniRoute JSON — ní féidir le cliaint é seo a idirdhealú ó theip soláthraí (#11015). |
| Lúb an imeachta céanna agus `/healthz`    | Is féidir le catalóg ghnóthach nó tic comhbhrú moill a chur ar thaiscéalaithe; atosú gearr ansin an** amháin** macasamhail.                                                                                                                                                                                                                   |

**Maitrís taiscéalaithe** (féach freisin [moltaí probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Tóraigh          | Sprioc                                                           | Ná húsáid                                                                       |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Beo              | TCP ar `PORT` ( `20128` réamhshocraithe), nó HTTP `/healthz` bog | `/api/monitoring/health`                                                        |
| ullmhacht        | HTTP `GET /healthz`                                              | Teorainneacha ama daingean a dhéileálann le lúb imeachta gnóthach mar rud marbh |
| Doimhne / daoine | `/api/monitoring/health`                                         | beocht cubelet uathoibrithe                                                     |

**Uasghráduithe:** ag súil go dtitfidh gach seisiún. Taosc cliaint más féidir leat; níl aon nuashonrú rollach ar SQLite réamhshocraithe . Beidh Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` freisin in ionad an phróisis amháin nuair a bhíonn an coimeádán Míshláintiúil - ga soinneáin céanna.

Tá manifests réamhdhéanta agus cairt Helm beo i `deploy/kubernetes/` agus `deploy/helm/omniroute/` — féach [treoir imscartha Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Gearrthóg Kubernetes le haghaidh a** macasamhail singil** (Tá athchruthú ag teastáil; ná ardaigh `replicas` i gcoinne comhad amháin SQLite ):

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

Ligeann codlata `preStop` do kube críochphointí na Seirbhíse a laghdú roimh SIGTERM mar sin** nua** stopann trácht ag bualadh leis an bpróiseas ag fáil bháis. Déantar `/v1/responses` SSE san eitilt a dhraenáil suas go `SHUTDOWN_TIMEOUT_MS` (30idí réamhshocraithe) trí léasanna iontrála trom-mheáchain (#11015). Faigheann iarratais nua a shroicheann an próiseas fós `503` + `Retry-After: 5`. Is briseadh crua fós é an bhearna chríochphointe Recreate folamh go dtí go bhfuil an t-athsholáthar Réidh - is é sin topology SQLite, ní misconfig taiscéalaithe.

Tá Postgres seachtrach / il-scríbhneoir HA** nach bhfuil** cosán stoc doiciméadaithe. Más gá duit HA, coinnigh macasamhail amháin nó rith topology a ndearna an tionscadal tástáil air agus doiciméadaithe ar leithligh. Tá cónaí ar an obair Postgres/MySQL i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Go dtí go long, an t-aon bhealach tacaithe a iolrú** mór** Is éard atá in acmhainn `/v1/responses` ná N próisis neamhspleácha (an chéad chuid eile), ní `replicas > 1` ar imleabhar amháin.

## Scála amach: N próisis neamhspleácha

### Codex úinéireacht uainíochta chomhartha

Ní ceadmhach cóipeanna de chuntas Codex amháin a chomhartha athnuachana aonúsáide a úsáid go neamhspleách. I gcásanna nach n-itheann ach dintiúir sioncrónaithe, socraigh `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Fág é gan socrú ar an úinéir rothlaithe aonair. Tá a `DATA_DIR` féin fós ag teastáil ó gach próiseas; ní roinneann an rogha seo SQLite ná ní sholáthraíonn sé sioncrónú dearbhán ná glas dáilte.

Athléann an cás éighníomhach an nasc nuair a bhíonn gá le hathnuachan agus ní ghlacann sé ach comhartha rochtana eile nach bhfuil caite. Seachas sin díchumasaítear athnuachan gan an nasc a dhul in éag nó a dhíghníomhachtú nó teip athnuachana a chur san áireamh. Úsáideann teipeanna fíordheimhnithe réamhtheachtacha fós gnáthchuntas teip, fuarú easpónantúil agus gnáthearráid an chliaint; tá díghníomhachtú cuntais fós buan. Sioncrónaigh comharthaí rothlaithe an úinéara sula dtéann na comharthaí rochtana in éag (cúig nóiméad an treoir athnuachana réamhghníomhach réamhshocraithe), nó athiompórtáil an comhad Codex auth arís. Stórálann allmhairí éighníomhacha na comharthaí soláthraithe gan iad a bhailíochtú ag críochphointe an chomharthaí. Tuairisceáin athnuachana dashboard/API láimhe `409 refresh_disabled`; níl aon athrú ar logáil isteach nua OAuth. Féach [tagairt don chomhshaol](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Is próiseas Nód amháin** gcarn amháin V8** . Toirmeascann dhá ghníomhaire códaithe ~ 3 MiB / ~ 750k-token `POST /v1/responses` (RTK + Caveman) an gcarn sin ag ~ 12 Gi (`FATAL ERROR: Reached heap limit`) agus is féidir leo OOM a 16 Gi cgroup. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Is é an tomhas sin a** buiséad cuimhne** rabhadh, ní táirge crua-uas de dhá `/v1/responses` fada comhthráthach . Tá iontráil comhrá trom-mheáchain faoi réir ag buiséad beart ingest uathdhíorthaithe (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) meánmhéide ón uasteorainn V8/cgroup céanna sin — á shárú aníos (nó ag socrú an chaipín iarratais ar chomhaireamh `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` oidhreachta) ar phróiseas atá ar mhéid cheana féin a thugann an ginmhilleadh isteach arís. Tá comhráite beaga, `/healthz`, `/v1/models`, agus MCP** nach bhfuil** sa chaipín sin.

### Próiseas amháin: níos mó ná dhá `/v1/responses` fada

A** sláintiúil** próiseas (carn thíos `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, `0.75` réamhshocraithe )** féadfaidh** níos mó ná dhá `POST /v1/responses` fada comhthráthach a reáchtáil nuair a bhíonn spás fós sa bhuiséad inflight-byte ar fud an phróisis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Tógann comhlachtaí ag `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nó os a chionn (réamhshocraithe 256 KiB) an léas trom-mheáchain céanna agus a thógann iarratais ar struchtúir throma agus úsáideann siad an t-éalú céanna [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Na mílte cliant SSE comhthráthach fada (ní mór oibritheoirí go minic 40-50) is a** buiséad cuimhne** ceist — méid gcarn + sliotáin primary/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ní teorainn táirge chrua “uasmhéid 2”. Cailleann carn faoi bhrú fós le `503` in-athraithe ionas nach bhfilleann #7849.

Chuig** heaps iolrú** (seanspásanna neamhspleácha V8)** inniu** :

| Déan                                                                                                                                           | Ná déan                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Rith** Ná containers/pods** , gach ceann lena** féin** `DATA_DIR` / toirt                                                                      | Socraigh `replicas > 1` i gcoinne comhad amháin SQLite              |
| Méid trom in-eitilte + sláintiúil-seomra cloiginn ó bhuiséad carn / eitilt-beart; Is é 1–2 an réamhshocrú coimeádach #7849, ní táirge crua max | Tabhair próiseas amháin 8 × RAM agus caipín comhairimh gan teorainn |
| Roghnach: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` le haghaidh** cuntair cuóta roinnte**                                           | Caitheamh Redis mar SQLite — roinnte nach bhfuil sé                 |
| Déan rúin an tsoláthraí a dhúbailt i ngach cás (nó glac le deais deighilte)                                                                    | Bí ag súil le painéal amháin / logáil glaonna amháin trasna cásanna |
| Tosaigh le haon chothromóir ualaigh; Is leor greamaitheach le heochair nó seisiún API                                                          | Teastaíonn meánearraí atá feasach ar mhéid an díoltóra              |

Is féidir cleamhnas seisiún le cuntas a roinnt freisin trí Redis: socraigh `OMNIROUTE_SESSION_AFFINITY_STORE=redis` agus `REDIS_URL` ar gach próiseas, leis an `REDIS_KEY_PREFIX` céanna agus suíomh dearfach `sessionAffinityTtlMs`. Réitíonn pionnaí féiniúlachtaí úsáide-chuntais hashed chuig nasc áitiúil incháilithe gach próiseas, mar sin ní gá go mbeadh nasc meaitseála IDs ag cuntais OAuth le meiteashonraí aitheantais meaitseála. Bíonn tosaíocht ag sainaitheanta cuntais ar IDs áitiúil contrártha maidir le taifeach bioráin agus díshealbhú cosanta; coinníonn taifid gan aitheantas (nó glaoiteoirí díshealbhaithe gan aitheantas) an garda ID oidhreacht. Teastaíonn IDs a mheaitseáil le cuntais nach bhfuil aitheantas úsáide cobhsaí acu fós. Titeann earráidí Redis nó glaonna os cionn 100 ms ar ais go SQLite áitiúil . Cuireann gach siopa cleamhnais Redis teorainn le hoibríochtaí gan íoc ag 8, seachnaíonn sé Redis láithreach nuair a bhíonn sé lán, agus ní scaoileann sé sliotáin ach amháin nuair a shocraíonn an obair bhunúsach, ní ag spriocdháta an ghlaoiteora. Le linn briseadh Redis níl aon fhírinne roinnte: titeann gach cás ar ais go dtí a cleamhnas áitiúil féin, féadfaidh seisiúin athphionáil uair amháin in aghaidh na huaire, agus d'fhéadfadh cásanna éagsúla a bheith eatarthu. Tagann greamaitheacht le chéile arís trí Redis nuair a thagann sé ar ais. Níl teorainn leis an teorainn ama ag fanacht, ní EVAL seolta , a d'fhéadfadh teacht i dtír tar éis titim siar. Scríobhann ródú déan comparáid idir an luach beacht a bhreathnaítear leis an gcinneadh ródaithe, ní léamh úr sóchán; déantar comparáid idir easnamh breathnaithe nó breathnóireacht chúltaca SQLite agus eochair Redis as láthair. Athsholáthraítear bioráin as feidhm in aon CAS, mar sin ní féidir le hordú déanach bioráin eile a athsholáthar nó a scriosadh. léann Redis adamhach ar ais ar an luach agus an freastalaí atá fágtha TTL; PTTL dearfach (nó gan éaga) a chinneann beocht, ní stampa ama JSON an scríbhneora nó clog an léitheora. Léarscáil na ngióga áitiúla a fhanann TTL de réir spriocdháta áitiúil; fanann na heochracha JSON reatha inléite agus coinnítear a mbearta amh le haghaidh CAS. Is é Redis an t-aon fhoinse fírinne cé go bhfreagraíonn sé. Baineann upserts, tadhaill agus scriosta comhroinnte deimhnithe an iontráil áitiúil, ná suiteáil ná athnuachan riamh é. Ní choinníonn SQLite ar chosán Redis ach na cinntí cúl-teagmhála seo féin ó earráidí Redis, teorainn ama nó sáithiú iontrála, TTL-teoranta mar a rinneadh cheana. Cosnaíonn bioráin áitiúil a bhíonn ar iarraidh ar bhriseadh níos déanaí pioc úr amháin (caillteanas leid amháin), ní cuntas mícheart nó díshealbhaithe. Tugann na hionsaitheoirí diúltaithe an buaiteoir roinnte agus TTL atá fágtha ar ais go adamhach: déanann gnáthroghnú athsheiceáil ar an spriocdháta áitiúil mapáilte agus úsáideann buaiteoir incháilithe atá fós beo, ag baint úsáide as agus ag logáil don chuntas sin gan scríobh comhroinnte eile. Mura bhfuil sé ar fáil, coinníonn an roghnú an t-iarrthóir áitiúil, fágtar an biorán roinnte gan athrú agus scaoileann sé teachtaireacht dífhabhtaithe amháin. Ní scríobhann CAS diúltaithe SQLite; cuireann earráidí Redis, am istigh nó sáithiú iontrála an oibríocht áitiúil reatha i bhfeidhm ina ionad sin. Má thagann freagra sóchán seolta isteach tar éis teorainn ama (ghlactha, diúltaithe nó earráid), ní bhainfidh ríomhluach srathach sioncronach comparáideach-agus-scrios ach an tsraith chúl-ama atá comhionann le beart-am istigh. Níl aon fanacht idir an chomparáid sin agus an scriosadh; caomhnaítear scríobh briste níos nuaí. Baineann díshealbhú cosanta amach biorán áitiúil an chuntais theipthe fiú nuair a bhíonn Redis síos, agus glanann sé arís é tar éis díshealbhú comhroinnte deimhnithe. Ní féidir biorán áitiúil díshealbhaithe a aischur ar feitheamh freagraí comhroinnte níos luaithe mar ní scríobhann rath roinnte SQLite riamh . Is féidir cuntas a athphéinteáil nuair a bhíonn briseadh siar níos déanaí; tá scríobh comhroinnte a nglactar leis níos déanaí i Redis amháin. Ní théann misses Redis i gcomhairle leis an stát áitiúil cúltaca. Agus an tiománaí ar ceal, coinníonn bioráin nua-roghnaithe an oidhreacht ceithre-réimse cruth SQLite JSON ; ní chuireann ach ródú Redis céannacht an chuntais hashed leis. Déantar bioráin réamhfheistithe a athsheiceáil ag a dteorainn éaga. Athléann roghnú neamh-léas Redis an stór, ach is féidir le pleanáil léasa sioncrónach fós úsáid a bhaint as bioráin a dhíshealbhaítear idir an réamhbheart agus an phleanáil (fuinneog a nglactar leis an iarracht is fearr). Ní féidir le léas-gealltanas cuntais a aistriú tar éis éilimh bhuan: má dhiúltaítear cur isteach coinníonn sé an t-iarrthóir éilithe don iarratas sin amháin agus fágtar an comhbhuaiteoir gan teagmháil, agus mar sin tá comhaontú trasna cásanna teoranta don chosán sin. Tá feidhm fós ag an gcuid eile den tábla: ní roinneann sé seo greamaitheacht seisiúin teaglama, bioráin casa Codex dúchais, semaphores cuntais, frithdhúnadh, teorainneacha caiteachais, cumraíocht nó logaí glaonna.

Crua-earraí: in aghaidh na huaire tá `/v1/responses` fada comhthráthach a** buiséad cuimhne** ceist (carn + inflight-byte / #10110). `N` neamhspleách `DATA_DIR` s a iolrú fós: caithfidh an t-óstach RAM `N × cgroup` a chlúdach, ní “pod 16 Gi amháin le N = 8.” Ná `replicas > 1` riamh ar chomhad SQLite amháin.

Scríobh sceitse (dhá charn, dhá imleabhar — ní `deploy.replicas: 2`):

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

Is é [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) an dlús inphróisis (comhbhrú as an leithlis HTTP ). Is é [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) braisle loighciúil amháin ar staid marthanach roinnte.

## Earráidí réigiúnacha Gemini taobh istigh de Docker

Is féidir le Google AI Studio / Gemini API HTTP 400 le FAILED_PRECONDITION agus
`User location is not supported for the API use.` a chur ar ais. Ní chruthaíonn iarratas rathúil ar an óstach
go n-úsáideann an coimeádán an bealach amach céanna. D’fhéadfadh ord DNS,
nascacht IPv4/IPv6, ródú VPN agus seachfhreastalaithe cumraithe a bheith éagsúil. Seiceáil
[réigiúin tacaithe Google](https://ai.google.dev/gemini-api/docs/available-regions)
chomh maith leis an mbealach ceangail iarbhír; ní thugann an earráid seo amháin le fios go bhfuil an eochair API lochtach.

### Tabhair tús áite do sheachfhreastalaí atá sonrach don cheangal

Úsáid [cumraíocht seachfhreastalaí in aghaidh an cheangail](../ops/PROXY_GUIDE.md#4-level-proxy-system)
de chuid OmniRoute don cheangal Gemini lena mbaineann, ansin déan **Test Connection** arís agus seol iarratas beag
leis an tsamhail chéanna. Coinníonn sé seo an t-athrú ródaithe teoranta don cheangal sin. Deimhnigh
gur féidir an seachfhreastalaí a rochtain ón gcoimeádán, agus go roghnaíonn an ceangal
é i ndáiríre. Ní ráthaíonn athrú an bhealaigh incháilitheacht réigiúnach ag an soláthraí réamhtheachtach.

### Déan comparáid idir líonrú an óstaigh agus líonrú an choimeádáin

Coinnigh an eochair, an tsamhail agus an t-iarratas mar an gcéanna agus torthaí fíordheimhnithe á gcur i gcomparáid; ná greamaigh
dintiúir, pasfhocail seachfhreastalaí ná ceanntásca údaraithe iomlána in eagrán riamh.
Ar dtús, scrúdaigh na teaghlaigh seoltaí a thairgeann réiteoir an OS, agus an t-ordú céanna á úsáid
ar an óstach agus taobh istigh den choimeádán:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Cuir an tseirbhís a ritheann tú in ionad `omniroute` (mar shampla, `omniroute-web`). Priontálann na
horduithe seo teaghlaigh seoltaí gan dintiúir ná seoltaí IP. Ní léiríonn `6`
a chuirtear ar ais ach toradh DNS IPv6: ní chruthaíonn sé bealach IPv6 inúsáidte ná rochtain API.
Nuair atá `curl` suiteáilte, déan comparáid idir `curl -4 -I https://generativelanguage.googleapis.com`
agus `curl -6 -I https://generativelanguage.googleapis.com` sa dá thimpeallacht.
Cruthaíonn freagra HTTP nascacht don taiscéalaí sin, fiú más earráid neamhfhíordheimhnithe
é; is é an t-iarratas fíordheimhnithe ar an tsamhail amháin a thástálann incháilitheacht Gemini.

### Rogha eile ar leibhéal an óstaigh: IPv6 oibríoch agus beartas réiteora

D’athchóirigh tuairisceoir [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)
rochtain ina dtimpeallacht trí IPv6 coimeádáin a chumasú agus roghnú seoltaí glibc
a athrú. Caith leis seo mar rogha eile a bhaineann go sonrach leis an timpeallacht. Deimhnigh IPv6 oibríoch ar an óstach,
imeacht/ródú an choimeádáin agus rialacha an bhalla dóiteáin sula n-athraítear sainroghanna an réiteora.
Ní dheimhníonn seoladh príobháideach ULA ann féin nascacht phoiblí IPv6.

I gcás seirbhísí atá ceangailte cheana féin le líonra réamhshocraithe Compose, cumasaíonn an blúire seo
IPv6 ar an líonra sin; coinnigh an chuid eile de do sheirbhís, calafoirt, imleabhair agus cumraíocht:

```yaml
networks:
  default:
    enable_ipv6: true
```

I gcás líonra ainmnithe, cumasaigh é ar an líonra a dtéann an tseirbhís isteach ann i ndáiríre. Is féidir le Docker
folíon ULA a leithdháileadh; ná roghnaigh folíon sainráite nach bhfuil ag forluí ach amháin nuair a éilíonn do líonra
é. Féach [líonrú IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
agus [roghanna líonra Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Ar **íomhá atá bunaithe ar glibc**, is féidir le `/etc/gai.conf` roghnú seoltaí a athrú. Úsáideann Dockerfile
reatha na stórtha Debian; ní úsáideann íomhánna saincheaptha atá bunaithe ar musl an mheicníocht seo.
Athraíonn an coigeartú a tuairiscíodh lipéad ULA ó `label fc00::/7 6` go
`label fc00::/7 1`. Tosaigh le tábla beartais iomlán na híomhá agus caomhnaigh a chuid iontrálacha
eile: cuirtear tábla réamhshocraithe eile in ionad an tábla sin nuair a chuirtear iontráil `label` nó `precedence` leis, mar sin ní leor comhad
nach bhfuil ann ach an líne athraithe. Déantar na séimeantaicí sin a dhoiciméadú i
[dtagairt chumraíochta glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf).
Feistigh an comhad athbhreithnithe mar ghléas ceangailte inléite amháin ag `/etc/gai.conf`
agus athchruthaigh an tseirbhís chun é a chur i bhfeidhm.

Athraíonn sé seo roghnú seoltaí an OS don **trácht amach ar fad sa choimeádán sin**.
Ní chuireann sé iallach ar gach feidhmchlár IPv6 a roghnú: tá tábhacht freisin le hord DNS agus roghnú
ceangail Node. Go háirithe, tugann `--dns-result-order=ipv4first` tús áite do IPv4 agus
ní réiteach é ar theip IPv4 amháin. Féach [ord DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Déan Gemini agus do sholáthraithe eile a atástáil tar éis aon athrú ar leibhéal an óstaigh. Chun an t-athrú a chealú,
bain feistiú saincheaptha `gai.conf`, athchóirigh cumraíocht an líonra roimhe seo agus
athchruthaigh an tseirbhís/líonra lena mbaineann le linn tréimhse chothabhála. D’fhéadfadh athchruthú líonra
cur isteach ar choimeádáin eile atá ceangailte leis; ná scrios an t-imleabhar sonraí seasmhacha.

## Nótaí Tábhachtacha

- **Mód WAL SQLite:** Ba cheart ligean do `docker stop` críochnú ionas gur féidir le OmniRoute seicphointe a dhéanamh de na hathruithe is déanaí ar ais isteach in `storage.sqlite`. Socraíonn na comhaid Compose atá san áireamh tréimhse chairde 40s don stopadh cheana féin. Má ritheann tú an íomhá go díreach, coinnigh `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Socraigh go `true` é má dhéantar gnáthchúltacaí/cúltacaí réamhscríofa a bhainistiú go seachtrach. Teastaíonn a seat slándála marthanach féin agus cosaint ollaistrithe fós le haghaidh aistrithe bunachar sonraí atá ann cheana féin.
- **Marthanacht Sonraí:** Feistigh imleabhar ar `/app/data` i gcónaí chun do bhunachar sonraí, eochracha agus cumraíochtaí a chaomhnú thar atosuithe coimeádáin.
- **Cumraíocht Poirt:** Sáraigh an athróg timpeallachta `PORT` chun an port réamhshocraithe `20128` a athrú.

## Féach Freisin

- [Treoir Imscartha VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Cumraíocht VM + nginx + Cloudflare
- [Treoir Imscartha Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Imscaradh chuig Fly.io
- [Cumraíocht Timpeallachta](../reference/ENVIRONMENT.md) — Tagairt iomlán `.env`
