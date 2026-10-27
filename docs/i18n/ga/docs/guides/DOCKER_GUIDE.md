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

> **Féinóstáil le hordú amháin?** Féach ar an
> [Treoir Féinóstála](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (íomhá fhoilsithe +
> Redis, lúb siar amháin, gan rogha próifíle). Is é an Rith Thapa thíos an
> bealach aon choimeádáin d’úsáideoirí a ritheann Redis in áit eile cheana féin.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Le Comhad Timpeallachta

```bash
# Cóipeáil agus cuir .env in eagar ar dtús
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

Tagann Dockerfile ilchéime (`Dockerfile`) leis an stór. Cuirtear ceithre chéim ar fáil; roghnaigh an `target` ceart do do chás úsáide.

| Céim          | Buníomhá              | Cuspóir                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Suiteálann sé spleáchais (`npm ci --legacy-peer-deps`) agus ritheann sé `npm run build` (Turbopack de réir réamhshocraithe — féach Acmhainní tráth tógála thíos)                                                                                                                                                          |
| `runner-base` | `node:26-trixie-slim` | Timpeallacht rite táirgeachta le haschur neamhspleách Next.js. **Níl aon CLI soláthraí san áireamh.**                                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Cuireann sé `git`, `docker.io`, `docker-compose` agus CLIanna domhanda leis: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Roghnaigh é seo le haghaidh sreafaí oibre gníomhaireacha.**                                                                                                             |
| `runner-web`  | `runner-base`         | Cuireann sé Playwright + brabhsálaí Chromium (`--with-deps`) leis do sholáthraithe seisiúin ghréasáin: `gemini-web`, `claude-web`, `claude-turnstile`. **Roghnaigh é seo nuair a úsáideann tú na soláthraithe sin** — teipeann ar an ngnáthíomhá tráth iarratais dá uireasa (féach an nóta `-web` faoi Chainéil Eisiúna). |

Tóg sprioc shonrach de láimh:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Acmhainní tráth tógála

Rialaíonn trí argóint tógála costas na céime `builder`. Is le linn na tógála amháin a úsáidtear iad —
is socrú rite ar leith é `OMNIROUTE_MEMORY_MB` (thíos).

| Argóint tógála              | Réamhshocrú | Éifeacht                                                                                                   |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | Tógann `0` le webpack: buaicúsáid chuimhne níos ísle, ach níos moille. Cumasaíonn `1` Turbopack.           |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Uasteorainn carn V8 (`--max-old-space-size`) don `next build` a sheoltar.                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Soláthraíonn sé `CIRCLE_NODE_TOTAL`; díorthaíonn Next `workers = N - 1` chun sonraí leathanaigh a bhailiú. |

Is é `OMNIROUTE_BUILD_WORKERS` an ceann ba cheart a mhéadú ar thógálaí mór agus an ceann
ba cheart a bheith faoi amhras nuair a chliseann tógáil shrianta **tar éis** `✓ Compiled successfully`. Is
próiseas ar leith é gach oibrí sonraí leathanaigh, mar atá an máthairphróiseas `next build`
féin; i macasamhlú beo ar VPS (saincheist #7518), tomhaiseadh buaic-RSS gach próisis ag
~4.5 GB, neamhspleách ar bhratach chairn `NODE_OPTIONS` (tiomsaíonn Turbopack i
gcuimhne dhúchasach/Rust lasmuigh de charn V8). Tá an réamhshocrú `2` (→ 1 oibrí, 2
phróiseas san iomlán) méadaithe do na reathaithe 16 GB / 4 vCPU arna n-óstáil ag GitHub
a úsáideann an phíblíne foilsithe. Ag `8` (→ 7 n-oibrí), d'éirigh an reathaí sin as cuimhne agus
theip ar buildkit an chéim le `ResourceExhausted: ... cannot allocate memory`;
níor leor `3` (→ 2 oibrí) fós nuair a tomhaiseadh RSS in aghaidh an phróisis
go díreach seachas é a thuiscint go hindíreach. Déanann `tests/unit/docker-build-memory-budget.test.ts`
an uimhríocht bunaithe ar an bhfigiúr tomhaiste agus teipeann sé má fhásann ceachtar socrú
thar acmhainn an reathaí.

Tiomsaíonn Turbopack i gcuimhne dhúchasach Rust atá **lasmuigh** de charn V8, mar sin
ní chuireann `OMNIROUTE_BUILD_MEMORY_MB` teorainn léi. Ar óstach a bhfuil uasteorainn chuimhne aige,
seolann marfóir OOM SIGKILL chuig an tógáil ansin gan aon téacs earráide ar chor ar bith — ní dhéanann sí ach
stopadh i lár `Creating an optimized production build`, rud a thugann le tuiscint go bhfuil sí sáinnithe seachas
imithe as cuimhne. Sin é an fáth a n-úsáideann an `Dockerfile` webpack de réir réamhshocraithe
(`OMNIROUTE_USE_TURBOPACK=0`), murab ionann agus `npm run dev` / `npm run build`, ina bhfuil
Turbopack mar réamhshocrú an chóid: ní mór nach gclisfeadh `docker build .` lom gan argóintí tógála (mar a
ritheann Railway agus óstaigh aonchliceála eile) go ciúin ar thógálaí faoi theorainn chuimhne.
Tugann na híomhánna foilsithe `OMNIROUTE_USE_TURBOPACK=0` cheana féin
go sainráite in `docker-publish.yml`. Ar thógálaí a bhfuil neart RAM aige, cumasaigh
Turbopack le haghaidh tógála níos tapúla:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Tá `webpackBuildWorker` cumasaithe, mar sin ritheann `next build` máthairphróiseas **agus** próiseas
oibrí agus cloíonn gach ceann acu le `OMNIROUTE_BUILD_MEMORY_MB` ar leithligh. Socraigh uasteorainn an
choimeádáin os cionn thart ar dhá oiread an luacha sin, ní aon oiread amháin.

Tomhaiste ar an gcrann seo (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Beartóir  | Uasteorainn coimeádáin | Toradh                               |
| --------- | ---------------------- | ------------------------------------ |
| Turbopack | 8 GiB / 16 GiB         | maraithe ag OOM sa dá chás, go ciúin |
| webpack   | 8 GiB                  | fuair an t-oibrí tógála SIGKILL      |
| webpack   | 12 GiB                 | d'éirigh leis, buaic ag 11.1 GiB     |

### Réamhshocruithe rite

Réamhshocruithe arna n-easpórtáil ag `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Iompar cuimhne in Docker:

- Socraíonn an íomhá `OMNIROUTE_MEMORY_MB=1024` agus díorthaíonn sí `NODE_OPTIONS=--max-old-space-size=1024` uaidh.
- Tosaíonn an lainseálaí neamhspleách próiseas iarbhír an fhreastalaí; léann sé `OMNIROUTE_MEMORY_MB` agus iarcheanglaíonn sé `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Úsáideann Node an luach deireanach de `--max-old-space-size` nuair a dhéantar arís é, mar sin rialaíonn socrú `OMNIROUTE_MEMORY_MB` teorainn éifeachtach charn Docker.
- Toisc go socraíonn an íomhá é i gcónaí, ní chuirtear cúltaca an lainseálaí féin, atá calabraithe de réir RAM, i bhfeidhm faoi Docker choíche. Méadaigh go sainráite é don ualach oibre (an tábla thíos). Tá `2048` fós róbheag do `/v1/responses` gníomhaire códúcháin.

### RAM ag am rite do ghníomhairí códúcháin

Is íosmhéid do dheais/comhrá éadrom é réamhshocrú Docker de 1 GiB, ní méid táirgthe. Coinníonn coirp fhada `POST /v1/responses` (na céadta teachtaireachtaí, na deicheanna uirlisí) iliomad graf sa chuimhne le linn comhbhrúite. Chuir dhá iarratas fhorluiteacha de thart ar 3 MiB / 750k comhartha deireadh le V8 ag sean-spás **12 GiB** (`FATAL ERROR: Reached heap limit`) agus shroich siad OOM cgroup 16 GiB freisin. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Socraigh méid **cgroup `--memory` os cionn an chairn** — tá maoláin dhúchasacha, SQLite, agus torthaí idirmheánacha comhbhrúite lasmuigh de V8.

| Ualach oibre                                    | `OMNIROUTE_MEMORY_MB`           | Coimeádán / cgroup     | Nótaí                                                                                                            |
| ----------------------------------------------- | ------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Deais, comhrá éadrom amháin                     | `1024` (réamhshocrú na híomhá)  | ≥2 GiB                 |                                                                                                                  |
| Gníomhaire códúcháin amháin (Claude/Codex/Grok) | `8192`                          | ≥10 GiB                | Seisiún aonair tipiciúil `/v1/responses`                                                                         |
| Dhá `/v1/responses` fhada chomhuaineacha        | `10240`–`12288`                 | ≥12–16 GiB             | Tomhaiseadh teip V8 ag carn de thart ar 12 GiB                                                                   |
| Trí chomhthéacs fhada chomhuaineacha nó níos mó | ná déan in aon phróiseas amháin | srathú / tuilleadh RAM | Is é 1 iarratas idir lámha an réamhshocrú iontrála tromualaigh; má mhéadaítear é gan RAM, tarlaíonn an teip arís |

Calabraíonn `omniroute serve` ar ghnáthchrua-earraí thart ar 35% de RAM (teoranta do `[512, 4096]`) nuair atá `OMNIROUTE_MEMORY_MB` **gan socrú**. Socraíonn Docker `1024` i gcónaí, mar sin ní ritheann an calabrú sin san íomhá oifigiúil choíche.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Seachfhreastalaí Ionadach ar Fhoch-chonair (Traefik / nginx)

Tiomsaítear `basePath` Next.js isteach sa bheart neamhspleách. Taifeadann OmniRoute an luach
ionsuite i gcomhad faire ag fréamh na haipe (scríobhtar é le linn `npm run build`; léitear é ag
`scripts/docker/ensure-docker-base-path.mjs`) agus cuirtear i gcomparáid é le
`OMNIROUTE_BASE_PATH` nuair a thosaíonn an coimeádán. Nuair nach ionann iad agus nuair a
tógadh an íomhá d'fhréamh an fhearainn, athscríobhann an pointe iontrála na lastliostaí neamhspleácha,
na teaghráin liteartha leabaithe `basePath`/`assetPrefix` (rindreálann Next 16 URLanna sócmhainní SSR ó
`assetPrefix` amháin — déanann an paisteálaí an fhochonair a mhacasamhlú ann), na URLanna sócmhainní
ionsuite `/_next/static` (lastliostaí tagartha cliaint, iompórtálacha meán, leathanaigh earráide
réamhrindreáilte) agus an t-ionshamhlóir cliaint `process.env` sula ritear
`node dev/run-standalone.mjs`.

### Tógáil Compose (molta)

Socraigh an dá athróg in `.env`, ansin atóg ionas go mbeidh an íomhá agus an t-am rite ar aon dul:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Cuireann `docker-compose.yml` `OMNIROUTE_BASE_PATH` ar aghaidh mar argóint tógála Docker agus mar
athróg timpeallachta ama rite.

### Íomhá fréimhe réamhthógtha + fochonair ama rite

Tógtar íomhánna foilsithe `diegosouzapw/omniroute:*` d'fhréamh an fhearainn. Is féidir leat
`OMNIROUTE_BASE_PATH` a shocrú fós ag am rite; paisteálann an coimeádán an beart uair amháin agus é ag tosú.
Péireáil é leis an mbunús poiblí comhfhreagrach:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cumraigh an seachfhreastalaí ionadach chun an chonair sheachtrach **iomlán** a chur ar aghaidh (ná bain an
réimír). Ba cheart do Traefik `PathPrefix(`/omniroute`)` a ródú chuig an gcoimeádán gan
`StripPrefix`, ionas go bhfaighidh Next.js `/omniroute/...` agus go bhfreastalóidh sé sócmhainní ó
`/omniroute/_next/...`.

Déanann seiceáil sláinte Docker iniúchadh ar an gcríochphointe éadrom saolré `/healthz`, agus an
`OMNIROUTE_BASE_PATH` gníomhach mar réimír air. Tá `/api/monitoring/health` ar fáil fós le haghaidh
diagnóisic dhaonna/deais; chun HEALTHCHECK an choimeádáin a dhíriú ar ais chuige (mar shampla
chun dianfhorfheidhmiú sláinte a dhéanamh), socraigh `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Is seiceáil **dhomhain** í an chonair sin (DB + achoimre mhonatóireachta) — oiriúnach do
`HEALTHCHECK` neamh-mhinic Docker má roghnaíonn tú é a athchumasú, ach **níl** sí oiriúnach d'eatraimh
`livenessProbe` Kubernetes.

I gcás córais cheolfhoirneoireachta (Kubernetes, Nomad, etc.):

| Tástáil              | Roghnaigh                                                                  | Seachain                                                                  |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Beocht               | HTTP `GET /livez`, nó TCP ar an bpríomhphort (`PORT`, réamhshocrú `20128`) | `/api/monitoring/health` mar thástáil bheochta                            |
| Ullmhacht            | HTTP `GET /healthz`                                                        | Teorainneacha ama dochta a mheasann lúb theagmhas gnóthach a bheith marbh |
| Domhain / bosca dubh | `/api/monitoring/health`                                                   | —                                                                         |

Tuairiscíonn `/healthz` saolré an phróisis (`ok` / `starting` / `stopping`). Ní dhéanann
`/livez` ach a sheiceáil go bhfuil an próiseas beo (200 aon uair is féidir leis an láimhseálaí rith; ní
fhanann sé le hullmhacht). Ritheann an dá cheann fós ar an lúb theagmhas Node chéanna le láimhseáil
iarratas, mar sin is féidir le hobair chatalóige nó chomhbhrú atá dian ar LAP moill a chur orthu —
gnóthach ≠ marbh. Roghnaigh beocht TCP má théann tástálacha HTTP thar am. Treoir iomlán maidir le tástálacha:
[Treoir mhonatóireachta — moltaí maidir le tástálacha Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose le Caddy (Auto-TLS HTTPS)

Is féidir OmniRoute a nochtadh go slán trí úsáid a bhaint as soláthar uathoibríoch SSL Caddy. Cinntigh go bhfuil taifead DNS A d’fhearainn dírithe ar sheoladh IP do fhreastalaí.

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
      # An bhunfhoinse atá os comhair an bhrabhsálaí le haghaidh aisghlaonna OAuth, naisc an deais, agus URLanna poiblí ginte.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL inmheánach freastalaí-go-freastalaí le haghaidh jabanna sceidealaithe / féiniarrataí.
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

Socraíonn Caddy na ceanntásca caighdeánacha seolta ar aghaidh don choimeádán réamhtheachtach. Úsáideann OmniRoute
`NEXT_PUBLIC_BASE_URL` mar an mbunfhoinse phoiblí chanónach le haghaidh aisghlaonna OAuth agus naisc phoiblí
ghinte; úsáideann scríbhinní fíordheimhnithe na deais iarrataí den bhunfhoinse chéanna chomh maith le cosaint CSRF
atá ceangailte leis an seisiún. Ná cumasaigh `OMNIROUTE_TRUST_PROXY` ach amháin le haghaidh imscaradh ardleibhéil ina bhfuil sé ar intinn agat
go ndíorthódh OmniRoute an bhunfhoinse phoiblí ó cheanntásca iontaofa a seoladh ar aghaidh in ionad cumraíocht
shainráite.

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

| Íomhá                    | Clib     | Méid   | Cur Síos                                                 |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | An SemVer cobhsaí **foilsithe** is airde (ní git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Pionnáil an aicme clibe seo le haghaidh GitOps           |

Léiriúchán ilardáin: `linux/amd64` + `linux/arm64` dúchasach (Apple Silicon, AWS Graviton, Raspberry Pi). Roghnaíonn Docker an ailtireacht mheaitseála go huathoibríoch; cuir `--platform linux/amd64` ar aghaidh más gá duit aithris AMD64 a fhorchur ar óstaigh ARM.

### Cainéil Eisiúna

Foilsíonn OmniRoute cainéil Docker ar leith le haghaidh eisiúintí cobhsaí, tástáil ghníomhach ar bhrainse eisiúna, agus leaganacha forbartha.

| Cainéal                         | Foinse                                      | Inathraitheacht                    | Úsáid mholta                                                                                                                       |
| ------------------------------- | ------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Eisiúint shínithe/leaganaithe               | Do-athraithe                       | Imscaradh táirgeachta a phionnálann eisiúint bheacht                                                                               |
| `:latest` / `:latest-web`       | An SemVer cobhsaí **foilsithe** is airde    | Pointeoir cobhsaí inathraithe      | Leanann sé eisiúintí cobhsaí **tar éis** jab foilsithe SemVer — **ní** rianaíonn sé `main` ná tiomantais neamheisithe `release/v*` |
| `:next` / `:next-web`           | Brainse réamhshocraithe reatha `release/v*` | Pointeoir réamheisiúna inathraithe | Ceartúcháin a thástáil atá curtha i bhfeidhm ar an mbrainse eisiúna gníomhach ach nach bhfuil fós in eisiúint chobhsaí             |
| `:main` / `:main-web`           | Brainse `main`                              | Pointeoir forbartha inathraithe    | Forbairt agus tástáil chomhtháthaithe amháin                                                                                       |

#### Soláthraithe seisiúin ghréasáin: na híomhánna `-web`

Tá clib `-web` ann freisin do gach cainéal thuas (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), tógtha ón gcéim `runner-web` — an íomhá chéanna móide Playwright agus brabhsálaí Chromium. Seoltar an ghnáthíomhá **gan** Chromium; teastaíonn sé ó `gemini-web`, `claude-web` agus `claude-turnstile`.

Cuirtear an teip siar; ní tharlaíonn sí ag am tosaithe: liostaíonn na soláthraithe sin a gcuid samhlacha agus taispeántar mar sholáthraithe nasctha iad sa deais, agus ní theipeann ach ar an gcéad iarratas leis seo:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Má úsáideann tú na soláthraithe sin, tarraing clib `-web` an chainéil atá in úsáid agat cheana féin — ní athraíonn aon rud eile. I suiteáil npm/CLI (gan íomhá Docker), is é dénártha an bhrabhsálaí an chomhpháirt choibhéiseach atá ar iarraidh: rith `npx playwright install chromium` ar an óstach.

#### An cainéal réamheisiúna a úsáid

Déantar an cainéal `next` a atógáil le gach brú chuig an mbrainse réamhshocraithe reatha `release/v*` agus foilsítear é do AMD64 agus ARM64 araon. Ní féidir le brainsí cothabhála níos sine scríobh anuas air. Soláthraíonn an cainéal íomhá is féidir a tharraingt le haghaidh ceartúchán a cumascadh isteach sa bhrainse eisiúna gníomhach sula gcruthaítear an chéad chlib chobhsaí eile.

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

#### Sábháilteacht agus filleadh ar leagan roimhe seo

Is cainéal réamheisiúna luaineach é `next`. Féadfaidh sé athrú le haon bhrú chuig an mbrainse eisiúna gníomhach agus **ní thacaítear leis lena úsáid i dtáirgeadh**. Greamaigh achoimre na híomhá agus tú ag measúnú leagan tógála ar leith:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sula ndéanfaidh tú tástáil, cruthaigh cúltaca d’imleabhar sonraí OmniRoute nó den chomhadlann sonraí atá gléasta trí cheangal. Chun filleadh ar an leagan roimhe seo, athchóirigh an leagan cobhsaí nó an achoimre a úsáideadh roimhe seo agus athchruthaigh an coimeádán:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ní féidir le leagan tógála ó bhrainse eisiúna `latest` a bhogadh riamh; ní féidir ach le leagan séimeantach cobhsaí incháilithe an pointeoir cobhsaí a chur chun cinn. Coinníonn na híomhánna `next` an t-iniúchadh ar íomhá na heisiúna agus an geata blocála le haghaidh leochaileachtaí CRITICAL.

**Ní ráthaíocht é `latest` go bhfuil git cothrom le dáta.** Ní bhíonn ceartúcháin a cumascadh isteach i `main` nó sa bhrainse gníomhach `release/v*` in `:latest` go dtí go bhfoilsítear íomhá SemVer chobhsaí agus go gcuireann an jab foilsithe `:latest` chun cinn (an achoimre chéanna leis an SemVer sin). Más cosúil go bhfuil `latest` reoite agus an ceartúchán le feiceáil cheana féin ar GitHub, tarraing `:next` chun an brainse eisiúna a thástáil nó fan leis an gclib SemVer.

| An rud atá uait                                                            | Úsáid                                      |
| -------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps / táirgeadh nach mór dó gan imeacht ón leagan greamaithe            | Greamaigh `:X.Y.Z` (nó achoimre na híomhá) |
| Lean eisiúintí cobhsaí foilsithe agus glac le hathchruthú le gach eisiúint | `:latest`                                  |
| Tástáil déantaí `release/v*` neamheisithe                                  | `:next` (ní le haghaidh táirgeachta)       |
| Tástáil `main`                                                             | `:main` (ní le haghaidh táirgeachta)       |

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

## Infhaighteacht: is macasamhail aonair é SQLite réamhshocraithe

Is éard atá i ngnáthleagan Docker / Kubernetes de OmniRoute ná **próiseas Node amháin + scríbhneoir SQLite amháin**. **Ní thacaítear le hinfhaighteacht ard** ar an toipeolaíocht sin.

| Srian                                  | Iarmhairt                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scríbhneoir aonair                     | **Ná** rith macasamhla iolracha in aghaidh an chomhaid SQLite chéanna. Truaillíonn sé sin an DB.                                                                                                                                                                                                                                                                |
| Athchruthú / atosú / marú HEALTHCHECK  | **Briseadh iomlán** ar SSE atá idir lámha, seisiúin deaise, agus staid sa chuimhne. Dícheanglaítear gach cliant nasctha. Faigheann iarratais nua le linn na fuinneoige críochphointe folmha **`502 Bad Gateway: Unknown error`** ón seachfhreastalaí droim ar ais, seachas JSON OmniRoute — ní féidir le cliaint é seo a idirdhealú ó theip soláthraí (#11015). |
| An lúb teagmhais chéanna le `/healthz` | Is féidir le catalóg ghnóthach nó ticeáil chomhbhrúite taiscéalaithe a mhoilliú; atosaíonn teorainn ama ghearr an t-**aon** mhacasamhail ansin.                                                                                                                                                                                                                 |

**Maitrís taiscéalaithe** (féach freisin [moltaí taiscéalaithe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Taiscéalaí       | Sprioc                                                                  | Ná húsáid                                                                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Beocht           | TCP ar `PORT` (`20128` de réir réamhshocraithe), nó HTTP bog `/healthz` | `/api/monitoring/health`                                                   |
| Ullmhacht        | HTTP `GET /healthz`                                                     | Teorainneacha ama dochta a mheasann lúb teagmhais ghnóthach a bheith marbh |
| Domhain / daoine | `/api/monitoring/health`                                                | Beocht uathoibrithe kubelet                                                |

**Uasghráduithe:** bí ag súil go ndícheanglófar gach seisiún. Taosc cliaint más féidir leat; níl aon nuashonrú céimneach ar SQLite réamhshocraithe. Cuirfidh `restart: unless-stopped` Compose agus `HEALTHCHECK` Docker an t-aon phróiseas amháin in ionad freisin nuair a bhíonn an coimeádán Míshláintiúil — an ga tionchair céanna.

Blúire Kubernetes do **mhacasamhail aonair** (tá Recreate riachtanach; ná méadaigh `replicas` in aghaidh aon chomhaid SQLite amháin):

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

Ligeann codladh `preStop` do kube críochphointí Service a bhaint sula seoltar SIGTERM, ionas nach seoltar trácht **nua** chuig an bpróiseas atá ag druidim síos. Tugtar suas le `SHUTDOWN_TIMEOUT_MS` (30s de réir réamhshocraithe) do SSE `/v1/responses` atá ar siúl chun críochnú, trí léasanna iontrála tromualaithe (#11015). Faigheann iarratais nua a shroicheann an próiseas fós `503` + `Retry-After: 5`. Is briseadh crua seirbhíse fós í an bhearna gan chríochphointí de bharr Recreate go dtí go mbíonn an t-ionadaí Ready — is saintréith de thoipeolaíocht SQLite í sin, ní míchumrú taiscéalaí.

**Ní** conair chaighdeánach dhoiciméadaithe é Postgres seachtrach / HA ilscríbhneora. Má theastaíonn HA uait, coinnigh macasamhail aonair nó rith toipeolaíocht a ndearna an tionscadal tástáil uirthi agus a dhoiciméadaigh sé ar leithligh. Tá an obair Postgres/MySQL in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Go dtí go seolfar é sin, is é an t-aon bhealach tacaithe chun acmhainn `/v1/responses` **mhór** a iolrú ná N próiseas neamhspleácha (an chéad rannán eile), seachas `replicas > 1` ar imleabhar amháin.

## Scálú amach: N próiseas neamhspleácha

Is ionann próiseas Node amháin agus **carn V8 amháin**. Cuireann dhá iarratas gníomhaire códúcháin `POST /v1/responses` (RTK + Caveman) de thart ar ~3 MiB / ~750k comhartha, agus iad ag forluí, deireadh leis an gcarn sin ag thart ar ~12 Gi (`FATAL ERROR: Reached heap limit`) agus féadann siad OOM a chur ar cgroup 16 Gi. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Is rabhadh maidir le **buiséad cuimhne** é an tomhas sin, ní uasteorainn dhocht táirge de dhá `/v1/responses` fhada chomhthráthacha. Rialaítear cead isteach do chomhráite troma le buiséad beart ionghabhála a dhíorthaítear go huathoibríoch (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), agus é tomhaiste ón teorainn chéanna V8/cgroup — má sháraítear é aníos (nó má shocraítear an tseanteorainn bunaithe ar líon iarratas `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) ar phróiseas atá tomhaiste cheana féin, tabharfar an scor ar ais. Níl comhráite beaga, `/healthz`, `/v1/models`, ná MCP **san áireamh** sa teorainn sin.

### Próiseas amháin: níos mó ná dhá `/v1/responses` fhada

**Féadfaidh** próiseas **sláintiúil** (carn faoi bhun `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, réamhshocrú `0.75`) níos mó ná dhá `POST /v1/responses` fhada chomhthráthacha a rith nuair atá spás fós i mbuiséad beart ar eitilt an phróisis ar fad (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Faigheann coirp atá ag `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nó os a chionn (réamhshocrú 256 KiB) an léas trom céanna le hiarratais atá trom ó thaobh struchtúir de agus úsáideann siad an bealach éalaithe `tryAcquireHealthyHeadroom` céanna ó [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Is ceist **buiséid cuimhne** iad na deicheanna cliant fada SSE atá comhthráthach (is minic a bhíonn 40–50 de dhíth ar oibreoirí) — tomhais an carn + na sliotáin phríomhúla/spáis chinn + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ní uasteorainn dhocht táirge de “2 ar a mhéad”. Leanann carn atá faoi bhrú de lucht a laghdú le `503` in-atriallach ionas nach bhfillfidh #7849.

Chun **cairn a iolrú** (sean-spásanna neamhspleácha V8) **inniu**:

| Déan                                                                                                                                                                    | Ná déan                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Rith **N coimeádán/pod**, agus a `DATA_DIR` / imleabhar **féin** ag gach ceann acu                                                                                      | Socraigh `replicas > 1` i gcoinne comhad SQLite amháin                            |
| Tomhais líon na n-iarratas trom ar eitilt + an spás cinn sláintiúil ón gcarn / buiséad beart ar eitilt; is réamhshocrú coimeádach #7849 é 1–2, ní uasmhéid docht táirge | Tabhair 8× RAM do phróiseas amháin agus teorainn lín neamhcheangailte             |
| Roghnach: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` le haghaidh **áiritheoirí cuóta comhroinnte**                                                            | Ná caith le Redis mar SQLite comhroinnte — ní hé sin é                            |
| Cóipeáil rúin soláthraithe isteach i ngach ásc (nó glac le deais dheighilte)                                                                                            | Ná bí ag súil le deais amháin / loga glaonna amháin thar áscanna                  |
| Cuir aon chothromóir lóid chun tosaigh; is leor greamaitheacht de réir eochair API nó seisiúin                                                                          | Ná héiligh lárearraí a bhaineann go sonrach le díoltóir agus atá feasach ar mhéid |

Crua-earraí: is ceist **buiséid cuimhne** é líon na `/v1/responses` fada comhthráthacha in aghaidh an áisc (carn + bearta ar eitilt / #10110). Iolraíonn `N` `DATA_DIR` neamhspleácha na cairn fós: ní mór do RAM an óstríomhaire `N × cgroup` a chlúdach, ní “pod amháin 16 Gi le N=8.” Ná húsáid `replicas > 1` riamh ar chomhad SQLite amháin.

Dréacht Compose (dhá charn, dhá imleabhar — ní `deploy.replicas: 2`):

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

Tá dlús laistigh den phróiseas (comhbhrú lasmuigh den aonad leithlisithe HTTP) in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Tá braisle loighciúil amháin ar staid mharthanach chomhroinnte in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
