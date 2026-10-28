# 🐳 Docker Guide — OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Cikakken bayani kan turawa da Docker. Don farawa cikin sauri, duba [sashen Docker na README](../README.md#-docker).

## Jerin Abubuwan da ke Ciki

- [Gudanarwa Cikin Sauri](#quick-run)
- [Tare da Fayil ɗin Muhalli](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiles da Ake da Su](#available-profiles)
- [Saita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose na Production](#production-compose)
- [Matakan Dockerfile](#dockerfile-stages)
- [Muhimman Environment Variables](#critical-environment-variables)
- [Docker Compose tare da Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tags na Image](#image-tags)
- [Sabunta Dashboard a Docker](#dashboard-updates-in-docker)
- [Samuwar sabis: SQLite na asali yana amfani da replica guda ɗaya](#availability-default-sqlite-is-single-replica)
- [Kurakuran yanki na Gemini a cikin Docker](#gemini-regional-errors-inside-docker)
- [Muhimman Bayanan Kula](#important-notes)

---

## Gudanarwa Cikin Sauri

> **Kana son ɗaukar nauyin sabis ɗin da kanka da umarni guda ɗaya?** Duba
> [Jagorar Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image da aka wallafa +
> Redis, loopback kawai, babu zaɓin profile). Gudanarwa Cikin Sauri da ke ƙasa ita ce
> hanyar container guda ɗaya ga masu amfani waɗanda suka riga suka gudanar da Redis a wani wuri.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Tare da Fayil ɗin Muhalli

```bash
# Da farko, kwafi sannan ka gyara .env
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
# Profile na asali (babu kayan aikin CLI)
docker compose --profile base up -d

# Profile na CLI (Claude Code, Codex, OpenClaw a ciki)
docker compose --profile cli up -d

# Profile na host (an fi tsara shi don Linux; yana mount na binaries na CLI na host a yanayin karantawa kawai)
docker compose --profile host up -d

# Profile na yanar gizo (Chromium/Playwright don masu samar da zaman yanar gizo)
docker compose --profile web up -d

# Haɗa CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiles da Ake da Su

OmniRoute yana zuwa da Compose profiles don manyan nau'ikan turawa. Zaɓi wanda ya dace da muhallinka.

| Profile        | Sabis            | Lokacin amfani                                                                                                                                                              | Umarni                                       |
| -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (asali) | `omniroute-base` | Sabar ba tare da UI ba / mafi ƙarancin runtime, babu CLIs na masu samarwa a ciki                                                                                            | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | Tsarukan aiki na agent waɗanda ke kiran `omniroute providers/setup/doctor` da CLIs da ke ciki (Codex, Claude Code, Droid, OpenClaw)                                         | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | Linux hosts da ke son samun dama irin ta `network_mode` zuwa CLIs na host ta hanyar mount na `~/.local/bin`, `~/.codex`, `~/.claude`, da sauransu a yanayin karantawa kawai | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | Gudanar da [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar a port `8317` don proxying na CLI na upstream                                                | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | Masu samar da zaman yanar gizo da ke buƙatar browser: `gemini-web`, `claude-web`, `claude-turnstile` (yana gina `runner-web`, Chromium yana ciki)                           | `docker compose --profile web up -d`         |

> Ana iya haɗa profiles da yawa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Daidaita kayan aikin CLI na na’ura mai masaukin baki lokacin da OmniRoute ke gudana a Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` da maɓallin
**Ajiye daidaitawa** na dashboard duk suna rubuta fayiloli kamar `~/.codex/*.config.toml`. Waɗannan hanyoyin
suna da ma’ana ne kawai a kan na’urar da CLI yake gudana a kanta. Idan aka gudanar da su a cikin
container, rubutun zai sauka a home na container ɗin (`/home/node` —
image ɗin yana gudana da `USER node`), inda babu wani CLI na na’ura mai masaukin baki da zai taɓa karanta shi, kuma inda za a
share shi da zarar an sake ƙirƙirar container ɗin.

OmniRoute yana gano wannan kuma ya ƙi yin rubutun tare da bayar da umarni maimakon
bayar da rahoton nasarar da ba za ka iya amfani da ita ba: CLI yana fita da `2`, kuma API yana amsawa da `422`
tare da `containerEphemeralTarget: true`.

### Shawarar da aka fi so: gudanar da CLI a na’ura mai masaukin baki, OmniRoute kuma a Docker

Container ɗin yana samar da API; CLI kuma yana daidaita kayan aikin na’ura mai masaukin bakinka.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nuna wa CLI container ɗin
omniroute setup-codex                      # yana rubuta ainihin ~/.codex a na’ura mai masaukin bakinka
```

Wannan shi ne zaɓin da ya dace idan Codex, Claude Code, Cursor ko makamantansu suna gudana a kan
laptop ɗinka — wanda shi ne tsarin da aka saba amfani da shi.

### Wata hanya: bind-mount kundin daidaitawar na’ura mai masaukin baki (profile na `host`)

Idan kana son container ɗin kansa ya rubuta daidaitawar na’ura mai masaukin bakinka, yi mount na
kundin a ciki sannan ka nuna `CLI_CONFIG_HOME` zuwa tushen mount ɗin. Profile na `host`
ya riga ya yi wannan:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ne yake sa hanyar ta zama abin amincewa: OmniRoute yana karanta
`/proc/self/mountinfo` kuma yana ba da izinin rubutu zuwa hanyoyin da aka yi mount (da kuma zuwa kundin
da ’ya’yansu suke mounts, wanda shi ne ainihin tsarin `/host-home` da ke sama), yayin da
har yanzu yake ƙin waɗanda ba a yi mount ba.

### Mafitar gaggawa: daidaita CLI na cikin container ɗin kansa (a yi amfani da hankali)

Lokacin da CLI ɗin suke zaune da gaske a cikin container (profile na `cli`), rubutun
na ganganci ne. Tura `--allow-container-write` zuwa duk wani umarnin `setup-*`, ko saita
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ga server. Za a ci gaba da rubutun
tare da gargaɗin cewa ba zai tsira bayan container ɗin ba.

> **Gargaɗin tsaro — profile na `cli` + mount na `docker.sock`.**
> Profile na `cli` yana yin bind-mount na `/var/run/docker.sock` domin mai sabunta tsarin kai tsaye da ke cikin container
> ya iya sake ƙirƙirar stack ɗin daga daemon na na’ura mai masaukin baki
> (`src/lib/system/autoUpdate.ts` yana bincika wannan socket kuma yana tsallake
> hanyar Docker idan babu shi). Wannan socket ɗin **iyakar amincewar root ta
> na’ura mai masaukin baki ce**: duk abin da zai iya isa gare shi yana sarrafa Docker daemon na na’ura mai masaukin baki a matsayin
> root — zai iya ƙirƙira, dubawa, dakatarwa da cire kowane container a kan na’ura mai masaukin baki.
> Abubuwan da wannan ke nufi:
>
> 1. **Kada ka taɓa buɗe port na profile na `cli` ga hanyar sadarwa.** Buga
>    shi a kan `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profile na `cli` da LAN zai iya isa gare shi yana mayar da duk wani RCE na matakin dashboard zuwa
>    cikakken keta tsaron na’ura mai masaukin baki.
> 2. **Kada ka yi bind na wasu ƙarin kundin na’ura mai masaukin baki cikin profile na `cli`.**
>    Docker socket tare da duk wani ƙarin mount yana ba container cikakken
>    damar karantawa/rubutawa zuwa filesystem da daidaitawar na’ura mai masaukin bakinka. Idan kana buƙatar wani kayan aiki ya
>    ga wani project, gudanar da shi a gida ta amfani da CLI binary — kada ka yi mount ɗinsa
>    cikin container na `cli`.
>
> Idan ba ka buƙatar sabuntawa kai tsaye daga cikin container, ka bar profile na `cli` a kashe
> (`COMPOSE_PROFILES=core,redis` ko mafi gajarta). Sauran profiles ba sa
> yin mount na Docker socket.
>
> Duba `docs/security/MITM-TPROXY-DECRYPT.md` (git; ba a haɗa shi cikin `/docs` ba) don samfurin barazanar da ke da alaƙa
> da MITM, da kuma `docs/security/SUPPLY_CHAIN.md` don jerin asalin binary na
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute yana dogaro da Redis don tallafa wa mai iyakance ƙimar da aka rarraba da ma'ajiyar bayanai ta bai ɗaya. **A koyaushe ana ayyana** sabis ɗin `redis` a cikin `docker-compose.yml` (ba shi da shingen profile) kuma yana farawa tare da kowane profile.

| Bayani               | Ƙima                                         |
| -------------------- | -------------------------------------------- |
| Image                | `redis:7-alpine`                             |
| Sunan container      | `omniroute-redis`                            |
| Port na ciki         | `6379`                                       |
| Port na host (canji) | `REDIS_PORT` (tsoho shi ne `6379`)           |
| Bind na host (canji) | `REDIS_BIND_HOST` (tsoho shi ne `127.0.0.1`) |
| Volume               | `omniroute-redis-data` → `/data`             |
| Binciken lafiya      | `redis-cli ping` (tazarar 10s)               |

Environment variables masu alaƙa:

- `REDIS_URL` — connection string da ake saka wa app (`redis://redis:6379` ta tsohuwa).
- `REDIS_PORT` — taswirar port na ɓangaren host don Redis container.
- `REDIS_BIND_HOST` — interface na host da ake wallafa port ɗin a kai. Tsoho shi ne `127.0.0.1`.

> **Dalilin amfani da loopback ta tsohuwa:** sidecar ɗin yana gudana ba tare da `requirepass` ba, kuma
> containers na app suna isa gare shi ta hanyar compose network (`redis:6379`) — port ɗin da aka wallafa
> yana nan ne kawai don kayan aikin ɓangaren host (`redis-cli`, `npm run dev` na cikin gida). Wallafawa a
> `0.0.0.0` zai fallasa Redis marar tantancewa ga kowane host a LAN ɗinka. Idan ka saita
> `REDIS_BIND_HOST=0.0.0.0`, ka kuma ƙara `--requirepass` zuwa `command:` na sabis ɗin.

Ba a ba da shawarar **kashe Redis** ba (mai iyakance ƙimar zai koma amfani da madadin in-memory mai ƙarancin inganci). Idan dole ne, ko dai ka cire/ka mayar da block ɗin sabis na `redis:` zuwa comment a cikin `docker-compose.yml`, ko ka rage shi zuwa sifili:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Don snapshot na production da aka keɓe wanda ke gudana tare da dev, yi amfani da `docker-compose.prod.yml`.

| Bayani                     | Ƙima                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Fayil                      | `docker-compose.prod.yml`                                                                     |
| Port na dashboard na tsoho | `PROD_DASHBOARD_PORT=20130` (an haɗa shi da na ciki `${DASHBOARD_PORT:-20128}`)               |
| Port na API na tsoho       | `PROD_API_PORT=20131`                                                                         |
| Image                      | `omniroute:prod` (an gina daga target na `runner-cli`)                                        |
| Redis container            | `omniroute-redis-prod` (`redis:8.6.2`, keɓaɓɓen volume na `redis-prod-data`)                  |
| Volume na bayanai          | `omniroute-prod-data` (mai suna, ana adana shi duk da sake ginawa)                            |
| Binciken lafiya            | `node healthcheck.mjs` + `redis-cli ping`, tare da `depends_on` da lafiyar Redis ke sarrafawa |

Yadda ake amfani da shi:

```bash
# Gina kuma fara stack na production
docker compose -f docker-compose.prod.yml up -d --build

# Nuna logs kai tsaye
docker compose -f docker-compose.prod.yml logs -f

# Kashe stack ɗin (a bar volumes)
docker compose -f docker-compose.prod.yml down
```

Stack na prod yana gudana a layi ɗaya da compose na dev (sunayen containers, ports, da volumes daban-daban), don haka za ka iya ci gaba da yin gyare-gyare a cikin gida yayin da production yake ci gaba da aiki.

## Matakan Dockerfile

Ma'ajiyar tana zuwa da Dockerfile mai matakai da yawa (`Dockerfile`). An samar da matakai huɗu; zaɓi `target` da ya dace da yanayin amfaninka.

| Mataki        | Hoton tushe           | Manufa                                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Yana shigar da abubuwan dogaro (`npm ci --legacy-peer-deps`) sannan yana gudanar da `npm run build` (Turbopack ne ta tsohuwa — duba Albarkatun lokacin gini a ƙasa)                                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Muhallin gudanar da samarwa tare da fitarwar standalone ta Next.js. **Ba a haɗa CLI na masu samarwa ba.**                                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Yana ƙara `git`, `docker.io`, `docker-compose` da CLI na gabaɗaya: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Zaɓi wannan don tsarin aiki na wakilai.**                                                                                                                                           |
| `runner-web`  | `runner-base`         | Yana ƙara Playwright + burauzar Chromium (`--with-deps`) don masu samar da zaman yanar gizo: `gemini-web`, `claude-web`, `claude-turnstile`. **Zaɓi wannan idan kana amfani da waɗannan masu samarwa** — hoto na yau da kullum zai gaza a lokacin buƙata idan babu shi (duba bayanin `-web` a ƙarƙashin Tashoshin Fitarwa). |

Gina takamaiman target da hannu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Albarkatun lokacin gini

Build args guda uku ne ke sarrafa kuɗin albarkatun matakin `builder`. Na lokacin gini ne kawai —
`OMNIROUTE_MEMORY_MB` (a ƙasa) wani saitin lokacin gudanarwa ne dabam.

| Build arg                   | Tsoho  | Tasiri                                                                                                         |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` yana ginawa da webpack: ƙarancin iyakar amfani da ƙwaƙwalwa, amma ya fi jinkiri. `1` yana kunna Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Iyakar heap ta V8 (`--max-old-space-size`) don `next build` da aka ƙaddamar.                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Yana ciyar da `CIRCLE_NODE_TOTAL`; Next yana samo `workers = N - 1` don tattara bayanan shafi.                 |

`OMNIROUTE_BUILD_WORKERS` shi ne abin da za a ƙara a kan babban builder, kuma shi ne
abin da za a fara zargi idan gini mai ƙarancin albarkatu ya mutu **bayan** `✓ Compiled successfully`. Kowane
worker na bayanan shafi tsari ne mai zaman kansa, haka ma uwar tsarin `next build`;
gwaji kai tsaye a VPS (issue #7518) ya auna iyakar RSS na kowane tsari zuwa
~4.5 GB ba tare da la'akari da tutar heap ta `NODE_OPTIONS` ba (Turbopack yana tarawa a
ƙwaƙwalwar native/Rust da ke wajen heap ta V8). Tsohon ƙimar `2` (→ worker 1, jimillar
tsarurruka 2) an daidaita shi don GitHub-hosted runners masu 16 GB / 4 vCPU da
pipeline ɗin wallafawa ke amfani da su. A `8` (→ workers 7), wannan runner ɗin ya ƙare da ƙwaƙwalwa kuma
buildkit ya gaza matakin da `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) har yanzu bai isa ba bayan an auna RSS na kowane tsari
kai tsaye maimakon ƙiyastawa. `tests/unit/docker-build-memory-budget.test.ts`
yana yin lissafin da adadin da aka auna kuma zai gaza idan ɗaya daga cikin saitunan
ya zarce ƙarfin runner.

Turbopack yana tarawa a ƙwaƙwalwar Rust ta native wadda take **a wajen** heap ta V8, don haka
`OMNIROUTE_BUILD_MEMORY_MB` ba ya iyakance ta. A kan host mai iyakar ƙwaƙwalwa,
OOM killer zai kashe ginin da SIGKILL ba tare da wani saƙon kuskure ba — kawai zai
tsaya a tsakiyar `Creating an optimized production build`, wanda zai yi kama da ratayewa
maimakon ƙarancin ƙwaƙwalwa. Wannan ne ya sa `Dockerfile` ke amfani da webpack a matsayin tsoho
(`OMNIROUTE_USE_TURBOPACK=0`), sabanin `npm run dev` / `npm run build`, inda
Turbopack yake zama tsohon zaɓin lamba: `docker build .` kai tsaye ba tare da build args ba (wanda
Railway da sauran hosts na dannawa ɗaya ke gudanarwa) kada ya mutu a ɓoye a kan
builder mai iyakantacciyar ƙwaƙwalwa. Hotunan da aka wallafa tuni suna miƙa `OMNIROUTE_USE_TURBOPACK=0`
a sarari cikin `docker-publish.yml`. A kan builder mai yalwar RAM, kunna
Turbopack don gini mafi sauri:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

An kunna `webpackBuildWorker`, saboda haka `next build` yana gudanar da uwar tsari **da** tsarin worker,
kuma kowannensu yana mutunta `OMNIROUTE_BUILD_MEMORY_MB` daban. Saita iyakar container
ta wuce kusan ninki biyu na wannan ƙimar, ba sau ɗaya ba.

An auna a wannan bishiyar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Iyakar container | Sakamako                                          |
| --------- | ---------------- | ------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM ya kashe shi a duka biyun, ba tare da saƙo ba |
| webpack   | 8 GiB            | An kashe build worker da SIGKILL                  |
| webpack   | 12 GiB           | Ya yi nasara, ya kai kololuwar 11.1 GiB           |

### Saitunan tsoho na lokacin gudanarwa

Saitunan tsoho da `runner-base` ke fitarwa: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Halayen ƙwaƙwalwa a cikin Docker:

- Hoton yana saita `OMNIROUTE_MEMORY_MB=1024` kuma yana samo `NODE_OPTIONS=--max-old-space-size=1024` daga gare shi.
- Ana fara ainihin aikin uwar garken ta hanyar standalone launcher, wanda ke karanta `OMNIROUTE_MEMORY_MB` sannan ya ƙara `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node yana amfani da ƙimar `--max-old-space-size` ta ƙarshe idan an maimaita ta, saboda haka saita `OMNIROUTE_MEMORY_MB` yana sarrafa ainihin iyakar heap ta Docker.
- Saboda hoton koyaushe yana saita shi, madadin da launcher ɗin yake ƙididdigewa bisa RAM ba ya aiki a ƙarƙashin Docker. Ƙara shi kai tsaye gwargwadon nauyin aikin (teburin da ke ƙasa). `2048` har yanzu bai isa ga `/v1/responses` na coding-agent ba.

### RAM na lokacin aiki don coding agents

Tsohuwar ƙimar Docker ta 1 GiB ita ce mafi ƙarancin abin da dashboard/light-chat ke buƙata, ba girman da ya dace da tsarin production ba. Dogayen jikin buƙatun `POST /v1/responses` (ɗaruruwan saƙonni, kayan aiki goma-goma) suna riƙe da graphs da yawa a ƙwaƙwalwar ajiya yayin compression. Buƙatu biyu masu cin karo, kowannensu kusan ~3 MiB / ~750k-token, sun sa V8 ya tsaya a old-space na **12 GiB** (`FATAL ERROR: Reached heap limit`) sannan kuma suka kai ga cgroup OOM na 16 GiB. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Saita girman **cgroup `--memory` fiye da heap** — native buffers, SQLite, da matsaka itan compression suna wajen V8.

| Nauyin aiki                                     | `OMNIROUTE_MEMORY_MB`        | Container / cgroup | Bayani                                                                                                            |
| ----------------------------------------------- | ---------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Dashboard, light chat guda ɗaya                 | `1024` (tsohuwar ƙimar hoto) | ≥2 GiB             |                                                                                                                   |
| Coding agent guda ɗaya (Claude/Codex/Grok)      | `8192`                       | ≥10 GiB            | Zaman guda na `/v1/responses` da aka saba samu                                                                    |
| Dogayen `/v1/responses` guda biyu a lokaci guda | `10240`–`12288`              | ≥12–16 GiB         | An auna tsayawar V8 a heap na kusan ~12 GiB                                                                       |
| Dogayen contexts uku ko fiye a lokaci guda      | kada a yi a process guda     | jera su / ƙara RAM | Tsohuwar heavyweight admission ita ce buƙata 1 mai gudana; ɗaga ta ba tare da RAM ba yana sake haifar da tsayawar |

`omniroute serve` a kan bare metal yana daidaita kusan ~35% na RAM (an iyakance shi zuwa `[512, 4096]`) idan ba a saita `OMNIROUTE_MEMORY_MB` **ba**. Docker koyaushe yana saita `1024`, saboda haka wannan daidaitawar ba ta taɓa aiki a cikin hoton hukuma.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhimman Canje-canjen Muhalli

Baya ga tsoffin ƙimomin da aka rubuta a [ENVIRONMENT.md](../reference/ENVIRONMENT.md), canje-canje masu zuwa su ne mafi muhimmanci yayin aiki a ƙarƙashin Docker:

| Canji                         | Manufa                                                                                                                                                                                                                                                                | Tsohon ƙima                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sirrin haɗin gwiwa na gadar WebSocket. **Ana buƙatarsa a production** — saita shi zuwa ƙaƙƙarfan saitin haruffa na bazuwar.                                                                                                                                           | ba a saita ba (dole a bayar) |
| `REDIS_URL`                   | Saitin haɗi na backend na mai iyakance yawan buƙatu / cache                                                                                                                                                                                                           | `redis://redis:6379`         |
| `REDIS_PORT`                  | Tashar port ta ɓangaren host don container na Redis da aka haɗa                                                                                                                                                                                                       | `6379`                       |
| `REDIS_BIND_HOST`             | Interface na host da ake wallafa port na Redis da aka haɗa a kai (loopback sai dai idan ka ƙara AUTH)                                                                                                                                                                 | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path na host da aka ɗora cikin profile na `cli` a `/workspace/omniroute` don tsarin sabunta-kai                                                                                                                                                                       | `.` (directory na yanzu)     |
| `OMNIROUTE_MEMORY_MB`         | Iyakar heap na Node a lokacin aiki don sabar Docker standalone; yana maye gurbin tsohon ƙimar image da ke sama. Wakilan coding: `8192`+ (duba [RAM na lokacin aiki](#runtime-ram-for-coding-agents)).                                                                 | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Sauya ports da aka fallasa don dashboard (20128) da API (20129)                                                                                                                                                                                                       | `20128` / `20129`            |
| `APP_BIND_HOST`               | Interface na host da docker-compose ke wallafa ports na dashboard/API/live-WS a kai. Da `REQUIRE_API_KEY=false` (tsohon ƙima), `0.0.0.0` yana fallasa proxy na `/v1` marar tantancewa ga LAN — faɗaɗa shi kawai da `REQUIRE_API_KEY=true` ko reverse proxy a gabansa. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | Interface na host da docker-compose ke wallafa sidecar na `cliproxyapi` a kai — data volume ɗinsa yana ɗauke da bayanan shaidar masu samarwa.                                                                                                                         | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Directory da mai binciken plugin na lokacin aiki ke karantawa kuma yake girka plugins a ciki. Saita shi idan an ɗora plugins da bind mount: tsohon ƙimar yana bin `HOME`, wanda ba lallai image ya export ba.                                                         | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Ƙaramin path na URL lokacin da aka wallafa app a bayan reverse proxy (misali `/omniroute`)                                                                                                                                                                            | _(babu komai = root)_        |
| `NEXT_PUBLIC_BASE_URL`        | Asalin adireshin browser na jama'a wanda ya haɗa da ƙaramin path (misali `https://host/omniroute`)                                                                                                                                                                    | ba a saita ba                |
| `PROD_DASHBOARD_PORT`         | Port na dashboard a ɓangaren host don `docker-compose.prod.yml`                                                                                                                                                                                                       | `20130`                      |
| `CLIPROXYAPI_PORT`            | Port na ɓangaren host don sidecar na `cliproxyapi`                                                                                                                                                                                                                    | `8317`                       |

## Reverse Proxy a kan Ƙaramin Hanya (Traefik / nginx)

Ana haɗa `basePath` na Next.js cikin kunshin standalone yayin ginawa. OmniRoute yana rubuta
ƙimar da aka haɗa a cikin fayil ɗin sentinel da ke tushen manhajar (ana rubuta shi yayin `npm run build`; ana karanta shi ta
`scripts/docker/ensure-docker-base-path.mjs`) sannan yana kwatanta shi da
`OMNIROUTE_BASE_PATH` lokacin da container ya fara aiki. Idan ƙimomin suka bambanta kuma an
gina image ɗin don tushen domain, entrypoint ɗin zai sake rubuta manifests na standalone,
ƙimomin `basePath`/`assetPrefix` da aka saka a ciki (Next 16 yana samar da URLs na kadarorin SSR daga
`assetPrefix` kaɗai — patcher yana kwafin ƙaramin hanyar zuwa cikinsa), URLs na kadarorin
`/_next/static` da aka haɗa (client-reference manifests, shigo da media, shafukan kuskure da aka
riga aka render) da kuma shim na `process.env` na client kafin `node dev/run-standalone.mjs`
ya gudana.

### Ginawa da Compose (ana ba da shawara)

Saita duka variables ɗin a cikin `.env`, sannan a sake ginawa domin image da runtime su dace:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` yana tura `OMNIROUTE_BASE_PATH` a matsayin Docker build-arg da kuma
runtime environment variable.

### Root image da aka riga aka gina + ƙaramin hanyar runtime

Ana gina images na `diegosouzapw/omniroute:*` da aka wallafa don tushen domain. Har yanzu za ka iya
saita `OMNIROUTE_BASE_PATH` a runtime; container zai gyara kunshin sau ɗaya yayin farawa.
Haɗa shi da public origin da ya dace:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Saita reverse proxy ya tura **cikakkiyar** hanyar waje (kada a cire
prefix). Ya kamata Traefik ya tura `PathPrefix(`/omniroute`)` zuwa container ba tare da
`StripPrefix` ba, domin Next.js ya karɓi `/omniroute/...` kuma ya samar da kadarori daga
`/omniroute/_next/...`.

Docker healthcheck yana gwada endpoint na lifecycle mai sauƙi `/healthz` wanda aka saka masa
`OMNIROUTE_BASE_PATH` mai aiki a gaba. `/api/monitoring/health` zai ci gaba da kasancewa don
binciken matsaloli na mutum/dashboard; domin mayar da HEALTHCHECK na container zuwa gare shi (misali
don tilasta cikakken binciken lafiya), saita `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Wannan hanyar bincike ce mai **zurfi** (DB + taƙaitaccen monitoring) — ta dace da
`HEALTHCHECK` na Docker da ba ya yawan gudana idan ka zaɓi komawa gare shi, amma **ba** ta dace da tazarar
`livenessProbe` ta Kubernetes ba.

Ga orchestrators (Kubernetes, Nomad, da sauransu):

| Probe           | Abin da ya fi dacewa                                            | Abin da za a guje wa                                                |
| --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ko TCP a babban port (`PORT`, tsoho `20128`) | `/api/monitoring/health` a matsayin liveness                        |
| Readiness       | HTTP `GET /healthz`                                             | Gajerun timeouts da ke ɗaukar cunkoson event-loop a matsayin mutuwa |
| Deep / blackbox | `/api/monitoring/health`                                        | —                                                                   |

`/healthz` yana bayar da rahoton lifecycle na process (`ok` / `starting` / `stopping`). `/livez`
yana duba ko process yana raye ne kawai (200 a duk lokacin da handler zai iya gudana; ba ya jiran
readiness). Dukansu har yanzu suna gudana a kan Node event loop ɗaya da sarrafa requests, saboda haka
ayyukan catalog ko compression masu cin CPU na iya jinkirta su — cunkoso ≠ mutuwa. Fi son TCP
liveness idan HTTP probes suna ƙarewar lokaci. Cikakken jagorar probes:
[Jagorar monitoring — shawarwarin probes na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose tare da Caddy (HTTPS Auto-TLS)

Ana iya fallasa OmniRoute cikin tsaro ta amfani da samar da SSL ta atomatik na Caddy. Tabbatar cewa rikodin DNS A na domain ɗinka yana nuni zuwa IP na sabarka.

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
      # Asalin adireshin da burauza ke gani don kiran-komawar OAuth, hanyoyin dashboard, da URL na jama'a da aka samar.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL na ciki tsakanin sabobi don ayyukan da aka tsara / buƙatun kai-tsaye.
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

Caddy yana saita daidaitattun taken turawa don container na upstream. OmniRoute yana amfani da
`NEXT_PUBLIC_BASE_URL` a matsayin tabbataccen asalin adireshin jama'a don kiran-komawar OAuth da hanyoyin
jama'a da aka samar; rubuce-rubucen dashboard masu buƙatar tantancewa suna amfani da buƙatun asali ɗaya tare da kariyar CSRF
da ke daure da zaman. Kunna `OMNIROUTE_TRUST_PROXY` kawai don turawar matakin-gaba inda da gangan kake
son OmniRoute ya samo asalin adireshin jama'a daga amintattun taken da aka tura maimakon takamaiman
saiti.

## Cloudflare Quick Tunnel

Tallafin dashboard don turawar Docker ya haɗa da **Cloudflare Quick Tunnel** na dannawa sau ɗaya a `Dashboard → Endpoints`. Kunnawa na farko yana sauke `cloudflared` ne kawai idan ana buƙata, yana fara tunnel na ɗan lokaci zuwa endpoint `/v1` ɗinka na yanzu, sannan yana nuna URL ɗin `https://*.trycloudflare.com/v1` da aka samar kai tsaye a ƙarƙashin URL ɗin jama'a na yau da kullum.

Ana iya nuna ko ɓoye bangarorin tunnel na endpoint (Cloudflare, Tailscale, ngrok) daga `Settings → Appearance` ba tare da canza yanayin tunnel mai aiki ba.

### Bayanan Tunnel

- URL na Quick Tunnel na ɗan lokaci ne kuma suna canzawa bayan kowane sake farawa.
- Ba a maido da Quick Tunnels ta atomatik bayan sake farawa na OmniRoute ko container. Sake kunna su daga dashboard idan an buƙata.
- Shigarwar da ake sarrafawa a halin yanzu tana tallafawa Linux, macOS, da Windows a kan `x64` / `arm64`.
- Quick Tunnels da ake sarrafawa suna amfani da jigilar HTTP/2 ta tsohuwa don kauce wa gargaɗin buffer na QUIC UDP masu hayaniya a muhallan container masu ƙarancin albarkatu. Saita `CLOUDFLARED_PROTOCOL=quic` ko `auto` idan kana son wata hanyar jigilar daban.
- Images na Docker sun haɗa da tushen CA na tsarin kuma suna miƙa su ga `cloudflared` da ake sarrafawa, wanda ke hana gazawar amincewar TLS lokacin da tunnel yake fara aiki a cikin container.
- Saita `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` idan kana son OmniRoute ya yi amfani da binary da ke akwai maimakon sauke sabo.

## Tags na Image

| Image                    | Tag      | Girma  | Bayani                                                             |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer tabbatacce mafi girma da aka **wallafa** (ba git `main` ba) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Ɗaure wannan nau'in tag don GitOps                                 |

Manifest na dandamali da yawa: `linux/amd64` + `linux/arm64` na asali (Apple Silicon, AWS Graviton, Raspberry Pi). Docker yana zaɓar architecture mai dacewa ta atomatik; miƙa `--platform linux/amd64` idan kana buƙatar tilasta kwaikwayon AMD64 a kan hosts na ARM.

### Tashoshin Release

OmniRoute yana wallafa tashoshin Docker daban-daban don fitowar tabbatattu, gwajin reshen release mai aiki, da builds na ci gaba.

| Tasha                           | Tushe                                           | Sauyawa                         | Amfani da aka ba da shawara                                                                                                   |
| ------------------------------- | ----------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Release mai sa hannu/mai sigar                  | Ba ya sauyawa                   | Turawar production da ke ɗaure takamaiman release                                                                             |
| `:latest` / `:latest-web`       | SemVer tabbatacce mafi girma da aka **wallafa** | Alamar tabbatacciya mai sauyawa | Yana bin fitowar tabbatattu **bayan** aikin wallafa SemVer — **ba ya** bin `main` ko commits na `release/v*` da ba a fitar ba |
| `:next` / `:next-web`           | Reshen `release/v*` na tsohuwa na yanzu         | Alamar pre-release mai sauyawa  | Gwajin gyare-gyaren da suka shiga reshen release mai aiki amma ba su shiga tabbataccen release ba tukuna                      |
| `:main` / `:main-web`           | Reshen `main`                                   | Alamar ci gaba mai sauyawa      | Don gwajin ci gaba da haɗa tsare-tsare kawai                                                                                  |

#### Masu samar da web-session: images na `-web`

Kowane tasha da ke sama yana kuma da tag na `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), wanda aka gina daga matakin `runner-web` — image iri ɗaya tare da Playwright da burauzar Chromium. Image na yau da kullum yana zuwa **ba tare da** Chromium ba; `gemini-web`, `claude-web` da `claude-turnstile` suna buƙatarsa.

Ana jinkirta gazawar ne, ba ta faruwa lokacin farawa: waɗannan providers suna jera models ɗinsu kuma suna bayyana a matsayin haɗe a dashboard, sai dai buƙata ta farko ce kawai ke gazawa da

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Idan kana amfani da waɗannan providers, ja tag na `-web` na tashar da kake kai a halin yanzu — babu wani abu da zai canza. A shigarwar npm/CLI (ba tare da Docker image ba), abin da ya yi daidai da ɓangaren da ya ɓace shi ne browser binary: gudanar da `npx playwright install chromium` a kan host.

#### Amfani da tashar pre-release

Ana sake gina tashar `next` a duk lokacin da aka yi push zuwa reshen tsoho na yanzu na `release/v*`, kuma ana wallafa ta don AMD64 da ARM64. Tsofaffin rassan kulawa ba za su iya maye gurbinta ba. Tashar tana samar da image da za a iya pull mai ɗauke da gyare-gyaren da aka riga aka haɗa cikin reshen sakin da ke aiki kafin a ƙirƙiri stable tag na gaba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Don Docker Compose, maye gurbin image tag da profile ɗin da aka zaɓa yake amfani da shi, sannan a yi pull kuma a sake ƙirƙirar service ɗin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Tsaro da komawa baya

`next` tasha ce ta pre-release mai canzawa. Tana iya canzawa a duk wani push zuwa reshen sakin da ke aiki, kuma **ba a tallafa mata don amfani a production**. A tsayar da image digest yayin tantance takamaiman build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kafin gwaji, a yi madadin ajiya na OmniRoute data volume ko data directory da aka bind-mount. Don komawa baya, a dawo da stable version ko digest da aka yi amfani da shi a baya sannan a sake ƙirƙirar container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build na release-branch ba zai taɓa iya matsar da `latest` ba; stable semantic version da ya cancanta ne kawai zai iya ɗaukaka stable pointer. Images na `next` suna ci gaba da amfani da binciken release image da shingen raunin tsaro na CRITICAL.

**`latest` ba garantin kasancewa na baya-bayan nan ga git ba ne.** Gyare-gyaren da aka haɗa a `main` ko a reshen `release/v*` da ke aiki **ba sa cikin** `:latest` har sai an wallafa stable SemVer image kuma publish job ya ɗaukaka `:latest` (digest iri ɗaya da na wannan SemVer). Idan `latest` yana kama da ya tsaya yayin da GitHub ya riga ya nuna gyaran, a yi pull na `:next` don gwada reshen sakin ko kuma a jira SemVer tag.

| Abin da kake so                                                                   | Yi amfani da                         |
| --------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / production wanda dole kada ya kauce                                      | Tsayar da `:X.Y.Z` (ko image digest) |
| Bin stable releases da aka wallafa da amincewa da sake ƙirƙirawa a kowane release | `:latest`                            |
| Gwada commits na `release/v*` da ba a saki ba                                     | `:next` (ba production ba)           |
| Gwada `main`                                                                      | `:main` (ba production ba)           |

## Sabuntawar dashboard a cikin Docker

Container na published-image ba zai iya maye gurbin kansa ba. Lokacin da OmniRoute ya gano cewa yana aiki a cikin
container (babu `.git` checkout, kuma ba shigarwar npm ba ce), tutar sabuntawa ta dashboard na gida tana nuna
umarnin host da za a gudanar maimakon umarnin npm/git, tare da maɓallin kwafi:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Sunan service ɗin yana fitowa daga `AUTO_UPDATE_SERVICE` (tsoho shi ne `omniroute`, wato service da ke cikin
`docker-compose.selfhost.yml`). `pull` yana matsar da floating tag (`latest`, `next`) ne kawai; idan ana amfani da
pinned tag na `:X.Y.Z`, fara gyara tag ɗin.

### Sabuntawa da dannawa ɗaya ta amfani da fayil ɗin trigger na host

Don tabbatar da cewa **Sabunta Yanzu** yana ci gaba da aiki ba tare da mounting `/var/run/docker.sock` ba (wanda ke bai wa container
ikon root a kan host — duba gargaɗin profile na `cli` da ke sama), saita `DOCKER_UPDATE_TRIGGER_FILE` a kan
service na OmniRoute sannan ka gudanar da watcher a kan host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Dole ne path ɗin ya kasance a cikin `DATA_DIR` (relative values suna dogara da shi); duk wani abu dabam
za a ƙi shi. Daga nan **Sabunta Yanzu** zai rubuta `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` zuwa wannan
fayil, ya amsa da `202`, sannan dashboard ya riƙa duba `/api/system/version` har sai sabon sigar ya fara aiki
kuma ya sake lodawa. OmniRoute ba ya taɓa gudanar da umarnin shell ko Docker a wannan yanayin. Kamar kowane aikin
sabuntawa, ana karɓar buƙatar ne kawai daga clients na loopback/LAN.

Bind-mounted data directory yana bai wa host tabbataccen path da zai sa ido a kai. Misalan units na `systemd`
(daidaita `/srv/omniroute` zuwa directory da ke ɗauke da compose file ɗinka da `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Sa ido kan buƙatun sabuntawa daga dashboard na OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Ja image sannan a sake ƙirƙirar container na OmniRoute

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

Service ɗin yana cire buƙatar kafin yin pulling domin aikin da ya gaza kada ya shiga maimaitawa. Idan babu
`DOCKER_UPDATE_TRIGGER_FILE`, dashboard zai ci gaba da tsarin umarnin hannu.

## Samun: tsoho SQLite kwafi ɗaya ne

Stock Docker / Kubernetes OmniRoute ne** Node tsari guda ɗaya + ɗaya SQLite marubuci** . Babban samuwa shine** ba a tallafawa** a kan wannan topology.

| Takura                                     | Sakamakon                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marubuci guda daya                         | Yi** ba** gudanar da kwafi da yawa akan fayil ɗin SQLite iri ɗaya. Wannan yana lalata DB.                                                                                                                                                                                                                                                 |
| Sake ƙirƙira/sake farawa/ HEALTHCHECK kisa | **Cikakken fita** na SSE in-jir, zaman dashboard, da yanayin ƙwaƙwalwar ajiya. Kowane abokin ciniki da aka haɗa yana raguwa. Sabbin buƙatun yayin taga fanko-ƙarshen ƙarshen samin wakili na baya**`502 Bad Gateway: Unknown error`** , ba OmniRoute JSON — abokan ciniki ba za su iya bambanta wannan daga gazawar mai bayarwa (#11015). |
| Madauki guda ɗaya da `/healthz`            | Katalogi mai aiki ko alamar matsawa na iya jinkirta bincike; wani ɗan gajeren lokaci sannan ya sake farawa da** kawai** kwafi.                                                                                                                                                                                                            |

**Binciken matrix** (Dubi kuma [shawarwarin binciken Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Bincike       | manufa                                                  | Kada ku yi amfani                                                            |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Rayuwa        | TCP akan `PORT` (tsoho `20128`), ko zqd HTTP `/healthz` | `/api/monitoring/health`                                                     |
| Shiri         | HTTP `GET /healthz`                                     | Matsakaicin lokacin ƙarewa waɗanda ke ɗaukar madaidaicin taron kamar matattu |
| Deep / mutane | `/api/monitoring/health`                                | Kubelet rayuwa mai sarrafa kansa                                             |

**Haɓakawa:** sa ran kowane zaman ya ragu. Zuba abokan ciniki idan za ku iya; babu sabuntawa akan tsoho SQLite. Ƙirƙirar `restart: unless-stopped` da Docker `HEALTHCHECK` kuma za su maye gurbin tsarin kawai lokacin da akwati ba shi da lafiya - radius iri ɗaya.

Shirye-shiryen da aka shirya da taswirar Helm suna rayuwa a cikin `deploy/kubernetes/` da `deploy/helm/omniroute/` - duba [jagorar tura Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes snippet don a** kwafi guda ɗaya** (ana buƙatar sake ƙirƙira; kar a ɗaga `replicas` akan fayil ɗin SQLite ɗaya):

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

barci `preStop` yana barin kube sauke wuraren ƙarshen sabis kafin SIGTERM haka** sabo** zirga-zirga yana tsayawa yana bugun tsarin mutuwa. A cikin jirgin `/v1/responses` SSE ana zubar da shi har zuwa `SHUTDOWN_TIMEOUT_MS` (tsohon 30s) ta hanyar hayar shigar da nauyi (#11015). Sabbin buƙatun da har yanzu suka kai ga tsari suna samun `503` + `Retry-After: 5`. Sake ƙirƙira tazarar fanko-ƙarshen ƙarshen har sai an shirya wanda zai maye gurbin ya kasance mai wahala - wato SQLite topology, ba kuskuren bincike ba.

Postgres na waje/marubuci da yawa HA shine** ba** hanyar haja da aka rubuta. Idan kuna buƙatar HA, adana kwafi ɗaya ko gudanar da topology aikin ya gwada kuma an rubuta shi daban. Aikin Postgres/MySQL yana rayuwa a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Har sai wannan jirgi, hanya ɗaya da aka goyan baya don haɓaka** babba** Ƙarfin `/v1/responses` shine N matakai masu zaman kansu (sashe na gaba), ba `replicas > 1` akan juzu'i ɗaya ba.

## Faɗaɗa a kwance: matakai masu zaman kansu guda N

Tsarin Node guda ɗaya yana da **V8 heap guda ɗaya**. Buƙatun wakilin coding `POST /v1/responses` guda biyu masu cin karo, kusan ~3 MiB / ~750k-token (RTK + Caveman), suna sa wannan heap ɗin ya tsaya a kusan ~12 Gi (`FATAL ERROR: Reached heap limit`) kuma suna iya jawo OOM a cgroup mai 16 Gi. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Wannan ma'aunin gargadi ne na **kasafin ƙwaƙwalwa**, ba ƙayyadadden iyakar samfur na buƙatun `/v1/responses` dogaye guda biyu masu gudana lokaci guda ba. Ana sarrafa karɓar chat mai nauyi ta kasafin bytes na ingest da ake ƙirƙira ta atomatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) wanda aka ƙayyade daga wannan iyakar V8/cgroup ɗin — ɗaga ƙimarsa sama da haka (ko sa tsohon iyakar ƙidayar buƙatu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) a kan tsarin da aka riga aka ƙayyade girmansa zai sake haifar da tsayawar. Ƙananan chats, `/healthz`, `/v1/models`, da MCP **ba sa** cikin wannan iyakar.

### Tsari guda ɗaya: fiye da dogayen `/v1/responses` guda biyu

Tsari mai **lafiya** (heap yana ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, tsohuwar ƙima `0.75`) **na iya** gudanar da dogayen `POST /v1/responses` sama da guda biyu lokaci guda idan har kasafin bytes masu gudana na dukkan tsarin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) yana da sauran sarari. Bodies masu girman da ya kai ko ya wuce `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (tsohuwar ƙima 256 KiB) suna ɗaukar heavyweight lease iri ɗaya da buƙatun masu nauyin tsari kuma suna amfani da hanyar kuɓuta ta [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dubunnan goma-goma na dogayen abokan cinikin SSE masu gudana lokaci guda (sau da yawa masu gudanarwa suna buƙatar 40–50) lamari ne na **kasafin ƙwaƙwalwa** — ƙayyade girman heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ba ƙayyadadden iyakar samfur na “mafi yawa 2” ba. Heap da ke ƙarƙashin matsin lamba har yanzu yana rage kaya tare da `503` da za a iya sake gwadawa don kada #7849 ya dawo.

Don **ninka heaps** (V8 old-spaces masu zaman kansu) **a yau**:

| Yi                                                                                                                                                                 | Kada ka yi                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Gudanar da **containers/pods guda N**, kowanne da **nasa** `DATA_DIR` / volume                                                                                     | Saita `replicas > 1` kan fayil ɗin SQLite guda ɗaya                   |
| Ƙayyade heavy in-flight + healthy-headroom daga heap / kasafin inflight-byte; 1–2 ita ce tsohuwar ƙima mai taka-tsantsan ta #7849, ba ƙayyadadden iyakar samfur ba | Ba wa tsari guda ɗaya RAM ninki 8 da iyakar ƙidaya mara iyaka         |
| Na zaɓi: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` don **shared quota counters**                                                                        | Ɗauki Redis a matsayin shared SQLite — ba haka yake ba                |
| Kwafi sirrin masu samarwa zuwa kowace instance (ko amince da dashboards da aka raba)                                                                               | Yi tsammanin dashboard guda ɗaya / call-log guda ɗaya a duk instances |
| Sanya kowane load balancer a gaba; sticky ta API key ko session ya isa                                                                                             | Buƙaci middleware mai la'akari da girma na wani vendor na musamman    |

Hardware: yawan dogayen `/v1/responses` da ke gudana lokaci guda a kowace instance lamari ne na **kasafin ƙwaƙwalwa** (heap + inflight-byte / #10110). `DATA_DIR`s masu zaman kansu guda `N` har yanzu suna ninka heaps: dole ne RAM na host ya ɗauki `N × cgroup`, ba “pod guda ɗaya mai 16 Gi tare da N=8” ba. Kada a taɓa yin `replicas > 1` kan fayil ɗin SQLite guda ɗaya.

Misalin Compose (heaps guda biyu, volumes guda biyu — ba `deploy.replicas: 2` ba):

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

Yawaitar in-process (compression a wajen HTTP isolate) tana cikin [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Logical cluster guda ɗaya kan shared durable state yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Kurakuran yanki na Gemini a cikin Docker

Google AI Studio / Gemini API na iya mayar da HTTP 400 tare da FAILED_PRECONDITION da
`Ba a tallafa wa wurin mai amfani don amfani da API ba.` Nasarar wata buƙata a kan host
ba ta tabbatar da cewa container yana amfani da hanyar fita iri ɗaya ba. Tsarin DNS,
haɗin IPv4/IPv6, hanyar VPN da proxies da aka saita na iya bambanta. Duba
[yankunan da Google ke tallafawa](https://ai.google.dev/gemini-api/docs/available-regions)
da kuma ainihin hanyar haɗin; wannan kuskuren shi kaɗai ba ya nuna cewa API key ba shi da kyau.

### Fi son proxy na takamaiman haɗi

Yi amfani da [daidaitawar proxy ta kowane haɗi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
na OmniRoute don haɗin Gemini da abin ya shafa, sannan ka sake yin **Gwada Haɗi** da ƙaramar buƙata
ta amfani da model iri ɗaya. Wannan yana taƙaita canjin hanya ga wannan haɗin kawai. Tabbatar
cewa ana iya isa ga proxy daga container, kuma cewa haɗin yana zaɓar sa da gaske.
Canza hanyar ba ya tabbatar da cancantar yanki a bangaren sabis na sama.

### Kwatanta hanyar sadarwar host da container

Ka bar key, model da buƙata iri ɗaya yayin kwatanta sakamakon da aka tantance; kada ka taɓa
liƙa credentials, kalmomin sirrin proxy ko cikakkun authorization headers a cikin issue.
Da farko, bincika rukunin adireshin da OS resolver ke bayarwa, ta amfani da umarni iri ɗaya
a kan host da kuma cikin container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Maye gurbin `omniroute` da service ɗin da kake gudanarwa (misali, `omniroute-web`). Waɗannan
umarni suna buga rukunin adireshi ba tare da credentials ko IP addresses ba. Samun `6`
yana nuna sakamakon IPv6 DNS ne kawai: **ba ya** tabbatar da cewa akwai hanyar IPv6 mai aiki ko damar shiga API.
Inda aka shigar da `curl`, kwatanta `curl -4 -I https://generativelanguage.googleapis.com`
da `curl -6 -I https://generativelanguage.googleapis.com` a duka muhallan.
Amsar HTTP tana tabbatar da haɗi don wannan gwajin, ko da kuskure ne da ba a tantance ba;
buƙatar model da aka tantance ce kawai ke gwada cancantar Gemini.

### Madadin matakin host: IPv6 mai aiki da manufofin resolver

Mai bayar da rahoton [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ya dawo
da damar shiga a muhallinsa ta hanyar kunna IPv6 na container da canza zaɓin adireshin glibc.
Ɗauki wannan a matsayin madadin da ya keɓanta ga muhalli. Tabbatar da cewa IPv6 na host yana aiki,
egress/routing na container da kuma dokokin firewall kafin daidaita fifikon resolver.
Adireshin ULA na sirri shi kaɗai ba ya tabbatar da haɗin IPv6 na jama'a.

Ga services da aka riga aka haɗa da tsohuwar network ta Compose, wannan sashe yana kunna
IPv6 a wannan network; ka riƙe sauran service, ports, volumes da configuration ɗinka:

```yaml
networks:
  default:
    enable_ipv6: true
```

Don network mai suna, kunna shi a kan network ɗin da service ke shiga da gaske. Docker na iya
ware ULA subnet; zaɓi takamaiman subnet da ba ya cin karo da wani kawai idan network ɗinka
yana buƙatar hakan. Duba [hanyar sadarwar IPv6 ta Docker](https://docs.docker.com/engine/daemon/ipv6/)
da [zaɓuɓɓukan network na Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

A kan **image mai tushen glibc**, `/etc/gai.conf` na iya canza zaɓin adireshi. Dockerfile na
repository na yanzu yana amfani da Debian; custom images masu tushen musl ba sa amfani da wannan tsari.
Daidaitawar da aka bayar da rahoto tana canza label na ULA daga `label fc00::/7 6` zuwa
`label fc00::/7 1`. Fara daga cikakken teburin manufofin image ɗin kuma ka kiyaye sauran
entries ɗinsa: ƙara entry na `label` ko `precedence` yana maye gurbin tsohon teburin, don haka file
mai ɗauke da layin da aka canza kawai bai isa ba.
[Manazartar configuration ta glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ta bayyana waɗannan ƙa'idoji. Yi bind-mount na file ɗin da aka duba a matsayin read-only a `/etc/gai.conf`
sannan ka sake ƙirƙirar service ɗin don aiwatar da shi.

Wannan yana canza zaɓin adireshin OS don **duk zirga-zirgar da ke fita daga wannan container**.
Ba ya tilasta wa kowane application zaɓar IPv6: tsarin DNS na Node da zaɓin haɗi
su ma suna da tasiri. Musamman, `--dns-result-order=ipv4first` yana fifita IPv4 kuma
ba magani ba ne ga gazawar da ta shafi IPv4 kaɗai. Duba [tsarin DNS na Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Sake gwada Gemini da sauran providers ɗinka bayan kowane canji na matakin host. Don komawa baya,
cire custom mount na `gai.conf`, dawo da configuration na network na baya sannan ka sake
ƙirƙirar service/network da abin ya shafa a lokacin maintenance window. Sake ƙirƙirar network
na iya katse sauran containers da ke haɗe da shi; kada ka goge persistent data volume.

## Muhimman Bayanan Kula

- **Yanayin SQLite WAL:** Ya kamata a bar `docker stop` ya kammala domin OmniRoute ya iya rubuta sabbin canje-canje na ƙarshe zuwa `storage.sqlite` ta hanyar checkpoint. Fayilolin Compose da aka haɗa sun riga sun saita wa’adin dakatarwa na daƙiƙa 40. Idan kana gudanar da image ɗin kai tsaye, ci gaba da amfani da `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Saita shi zuwa `true` idan ana sarrafa madadin bayanai na yau da kullum/na kafin rubutawa a waje. Har yanzu ƙaura na bayanan da suke akwai suna buƙatar nasu hoton kariya mai ɗorewa da matakin kariya na ƙaura mai yawa.
- **Dawwamar Bayanai:** Koyaushe haɗa volume zuwa `/app/data` domin adana database ɗinka, maɓallai, da saituna a duk lokacin da aka sake kunna container.
- **Saitin Port:** Sauya environment variable na `PORT` domin canza port na asali mai lamba `20128`.

## Duba Kuma

- [Jagorar Tura Tsarin VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Saitin VM + nginx + Cloudflare
- [Jagorar Tura Tsarin Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Tura tsarin zuwa Fly.io
- [Saitin Environment](../reference/ENVIRONMENT.md) — Cikakken bayani game da `.env`
