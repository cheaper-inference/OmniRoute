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

## Saurin Gudu

> **Mai ɗaukar nauyin kai a cikin umarni ɗaya?** Dubi [Jagorar Mai watsa shiri](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (hoton da aka buga + Redis, loopback-kawai, babu zaɓin bayanin martaba). Gudun Saurin da ke ƙasa shine hanyar kwantena ɗaya don masu amfani waɗanda suka riga sun gudanar Redis a wani wuri.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Tare da Fayil na Muhalli

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

Wurin ajiya yana jigilar Dockerfile mai matakai da yawa (`Dockerfile`). An fallasa matakai huɗu; zaɓi `target` ɗin da ya dace don akwati na amfanin ku.

| Mataki        | Hoton tushe           | Manufar                                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Yana shigar da deps (`npm ci --legacy-peer-deps`) kuma yana gudanar da `npm run build` (Turbopack ta tsohuwar — duba albarkatun Gina-lokaci a ƙasa)                                                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Lokacin aikin samarwa tare da fitowar Next.js kadai.** Babu mai bada CLIs da aka haɗa.**                                                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Yana ƙara `git`, `docker.io`, `docker-compose` da CLIs na duniya : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Zaɓi wannan don hanyoyin aiki na wakili.**                                                                                                                                          |
| `runner-web`  | `runner-base`         | Yana ƙara Playwright + a Chromium browser (`--with-deps`) don masu samar da zaman yanar gizo: `gemini-web`, `claude-web`, `claude-turnstile`.** Zaɓi wannan lokacin da kuke amfani da waɗannan masu samarwa** — a sarari hoton yana kasa a lokacin buƙata ba tare da shi ba (duba bayanin `-web` ƙarƙashin Tashoshin Saki). |

Gina takamaiman manufa da hannu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Gina-lokaci albarkatun

Uku gina args suna sarrafa abin da darajar matakin `builder`. Suna lokacin ginawa ne kawai — `OMNIROUTE_MEMORY_MB` (a ƙasa) keɓantacce, kullin lokacin gudu.

| Gina arg                    | Default | Tasiri                                                                                                               |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` yana ginawa tare da fakitin gidan yanar gizo: ƙananan ƙwaƙwalwar ajiya, a hankali. `1` ya shiga cikin Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 heap rufi (`--max-old-space-size`) don `next build` da aka haɗe.                                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Ciyar da `CIRCLE_NODE_TOTAL`; Na gaba yana samun `workers = N - 1` don tarin bayanan shafi.                          |

`OMNIROUTE_BUILD_WORKERS` ita ce wadda za ta ɗaga a kan babban magini kuma wanda ake tuhuma idan ginin takura ya mutu** bayan** `✓ Compiled successfully`. Kowane ma'aikacin bayanan shafi shine tsarin kansa, haka ma iyaye `next build` kanta; Haihuwar VPS mai rai (fitilar #7518) ya auna RSS kowane tsari a ~ 4.5 GB mai zaman kansa daga tutocin `NODE_OPTIONS` (Turbopack yana tattarawa a ƙwaƙwalwar native/Rust a wajen tulin V8). Tsohuwar `2` (ma'aikacin → 1, jimillar matakai 2) yana da girma don masu gudu 16 GB /4 vCPU GitHub da aka karɓa waɗanda bututun bututun ke amfani da su. A `8` ( ma'aikatan → 7) wannan mai gudu ya ƙare da ƙwaƙwalwar ajiya kuma buildkit ya gaza matakin tare da `ResourceExhausted: ... cannot allocate memory`; `3` (ma'aikatan → 2) har yanzu basu dace ba da zarar an auna RSS na kowane-tsari kai tsaye maimakon tantancewa. `tests/unit/docker-build-memory-budget.test.ts` yayi lissafin akan siffa da aka auna kuma ya kasa idan ko dai kulli ya fi mai gudu girma.

Turbopack tana tattarawa a cikin ƙwaƙwalwar ajiyar tsatsa da ke rayuwa** waje** tulin V8, don haka `OMNIROUTE_BUILD_MEMORY_MB` ba ya ɗaure shi. A kan rundunar da ke da silin ƙwaƙwalwar ajiya ginin yana yin SIGKILLed ta mai kashe OOM ba tare da kuskuren rubutu ba kwata-kwata — kawai yana tsayawa tsakiyar `Creating an optimized production build`, wanda ke karantawa kamar rataye maimakon abin tunawa. Abin da ya sa `Dockerfile` ya ɓace zuwa fakitin yanar gizon (`OMNIROUTE_USE_TURBOPACK=0`), sabanin `npm run dev` / `npm run build`, inda Turbopack shine lambar tsoho: `docker build .` bare ba tare da gina args ba (abin da Railway da sauran rundunonin dannawa ɗaya ke gudana) dole ne kada su mutu shiru a kan maginin ƙwaƙwalwar ajiya. Hotunan da aka buga sun riga sun wuce `OMNIROUTE_USE_TURBOPACK=0` a sarari a cikin `docker-publish.yml`. A kan maginin da ke da yawan RAM, shiga cikin Turbopack don ginawa cikin sauri:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

An kunna `webpackBuildWorker`, don haka `next build` yana gudanar da iyaye** kuma** tsarin ma'aikaci kuma kowanne yana girmama `OMNIROUTE_BUILD_MEMORY_MB` daban. Girman rufin kwandon sama kusan ninki biyu waccan ƙimar, ba sau ɗaya ba.

An auna akan wannan bishiyar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler          | Rufin kwantena | Sakamako                      |
| ---------------- | -------------- | ----------------------------- |
| Turbopack        | 8 GiB / 16 GiB | OOM-kashe duka, shiru         |
| jakar yanar gizo | 8 GiB          | gina ma'aikaci SIGKILLed      |
| jakar yanar gizo | 12 GiB         | ya yi nasara, ya kai 11.1 GiB |

### Matsalolin lokacin aiki

Tsoffin abubuwan da `runner-base` ke fitarwa : `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Halin ƙwaƙwalwar ajiya a cikin Docker:

- Hoton yana saita `OMNIROUTE_MEMORY_MB=1024` kuma ya samo `NODE_OPTIONS=--max-old-space-size=1024` daga gare ta.
- Haƙiƙanin tsarin uwar garken yana farawa ta mai ƙaddamarwa mai tsaye, wanda ke karanta `OMNIROUTE_MEMORY_MB` kuma yana ƙara `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node yana amfani da ƙimar `--max-old-space-size` mai maimaita ta ƙarshe, don haka saitin `OMNIROUTE_MEMORY_MB` yana sarrafa ingantaccen iyakar tsibin Docker.
- Saboda hoton ko da yaushe yana saita shi, mai ƙaddamarwa na RAM-calibrated fallback ba zai taɓa aiki a ƙarƙashin Docker. Tada shi a sarari don nauyin aikin (tebur a ƙasa). `2048` har yanzu ya yi ƙanƙanta don wakilin-codeing `/v1/responses`.

### Runtime RAM don coding agents

Tsohuwar 1 GiB Docker bene ne na dashboard/light-chat, ba girman samarwa ba. Dogayen jikin `POST /v1/responses` (daruruwan saƙonni, dubun kayan aikin) suna riƙe da jadawalin ƙwaƙwalwar ajiya da yawa yayin matsawa. Buƙatun alamar alama guda biyu ~ 3 MiB / ~ 750k sun soke V8 a wata** 12 GiB** tsohon sarari (`FATAL ERROR: Reached heap limit`) da kuma buga 16 GiB cgroup OOM. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Girman** tara `--memory` sama da tudun** — masu buffer na asali, SQLite, da matsakaitan matsawa suna zaune a wajen V8.

| Nauyin aiki                                    | `OMNIROUTE_MEMORY_MB` | Kwantena / rukuni    | Bayanan kula                                                                                              |
| ---------------------------------------------- | --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| Dashboard, hira mai haske ɗaya                 | `1024` (hoton tsoho)  | ≥2 GiB               |                                                                                                           |
| Wakilin coding ɗaya (Claude/Codex/Grok)        | `8192`                | ≥10 GiB              | Yawan zama `/v1/responses` guda ɗaya                                                                      |
| Dogon `/v1/responses` guda biyu masu juna biyu | `10240`–`12288`       | ≥12–16 GiB           | Auna V8 zubar da ciki a ~ 12 GiB heap                                                                     |
| + guda uku masu tsayi masu tsayi iri ɗaya      | kar a kan tsari ɗaya  | serialize / more RAM | Shigar da tsoho mai nauyi shine 1 a cikin jirgin; tayar da shi ba tare da RAM ta dawo da zubar da ciki ba |

`omniroute serve` akan karafa ba tare da izni ba ~ 35% na RAM (clamped `[512, 4096]`) lokacin da `OMNIROUTE_MEMORY_MB` ke** rashin daidaitawa** . Docker koyaushe yana saita `1024`, ta yadda daidaitawar ba ta gudana a cikin hoton hukuma.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Maida Wakilci akan Tafarki Mai Raɗaɗi (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### Ƙirƙirar gini (an bada shawarar)

Saita mabambanta biyu a cikin `.env`, sannan a sake ginawa don haka hoton da lokacin gudu suka yarda:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` yana gaba da `OMNIROUTE_BASE_PATH` azaman Docker gini-arg kuma azaman canjin yanayi na lokaci-lokaci.

### Tushen hoton da aka riga aka gina + runtime subpath

An gina hotunan `cheaperinference/omniroute:*` da aka buga don tushen yankin. Kuna iya saita `OMNIROUTE_BASE_PATH` a lokacin aiki; kwandon yana faci gunkin sau ɗaya a farawa. Haɗa shi tare da madaidaicin asalin jama'a:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sanya wakili na baya don turawa** cika** hanyar waje (kada ku tube prefix). Traefik ya kamata ya bi `PathPrefix(`/omniroute `)` zuwa akwati ba tare da `StripPrefix`, don haka Next.js yana karɓar `/omniroute/...` kuma yana ba da kadarori daga `/omniroute/_next/...`.

Binciken lafiyar lafiyar Docker yana bincika ƙarshen ƙarshen zagayowar rayuwa mai nauyi `/healthz` wanda aka sa gaba tare da `OMNIROUTE_BASE_PATH` mai aiki. `/api/monitoring/health` ya rage don binciken human/dashboard ; don nuna kwandon HEALTHCHECK baya zuwa gare shi (misali don aiwatar da lafiya mai zurfi), saita `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Wannan hanyar ita ce a** zurfi** — `HEALTHCHECK` Docker bayanin DB + )** ba** don Kubernetes `livenessProbe` tazara.

Ga mawaƙa (Kubernetes, Nomad, da sauransu):

| Bincike         | Fi son                                                                            | Guji                                                                         |
| --------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Rayuwa          | HTTP `GET /livez`, ko TCP akan babban tashar jiragen ruwa (`PORT`, tsoho `20128`) | `/api/monitoring/health` as liveness                                         |
| Shiri           | HTTP `GET /healthz`                                                               | Matsakaicin lokacin ƙarewa waɗanda ke ɗaukar madaidaicin taron kamar matattu |
| Deep / blackbox | `/api/monitoring/health`                                                          | —                                                                            |

`/healthz` ya ba da rahoton tsarin tsarin rayuwa (`ok` / `starting` / `stopping`). `/livez` yana aiwatarwa-mai rai kawai (200 a duk lokacin da mai sarrafa zai iya gudu; baya jiran shiri). Dukansu har yanzu suna gudana akan madauki na Node iri ɗaya azaman sarrafa buƙatun, don haka kasida ta ɗaure CPU ko aikin matsawa na iya jinkirta su — aiki ≠ mutu. Fi son rayuwar TCP idan HTTP ya bincika lokaci. Cikakken jagorar bincike: [Jagorar sa ido — Kubernetes shawarwarin bincike](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Rubuta tare da Caddy (HTTPS Auto-TLS)

Za a iya fallasa OmniRoute amintacce ta amfani da tanadin SSL na Caddy ta atomatik. Tabbatar cewa yankinku na DNS A rikodin maki zuwa IP na uwar garken ku.

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

Caddy yana saita daidaitattun masu kai masu kai don babban akwati. OmniRoute yana amfani da `NEXT_PUBLIC_BASE_URL` azaman asalin jama'a na canonical don sake kiran OAuth da hanyoyin haɗin jama'a; ingantaccen dashboard ya rubuta amfani da buƙatun asali iri ɗaya tare da kariyar CSRF mai ɗaure. Ba da damar `OMNIROUTE_TRUST_PROXY` kawai don ƙaddamar da ci-gaba inda da gangan kuke son OmniRoute ya samo asalin jama'a daga amintattun kanun labarai da aka tura maimakon ƙayyadaddun tsari.

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

## Tags Hotuna

| Hoto                         | Tag      | Girman  | Bayani                                               |
| ---------------------------- | -------- | ------- | ---------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Mafi girma** aka buga** barga SemVer (ba git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Sanya wannan ajin tag don GitOps                     |

Ana buga hotuna iri ɗaya zuwa ɗakunan ajiya guda uku, tare da nau'ikan tsarin gine-gine iri ɗaya: `cheaperinference/omniroute` (Docker Hub, Ƙungiyar Ƙwararrun Ƙwararru, daga 3.8.53 a kan), `ghcr.io/cheaper-inference/omniroute` da kuma gadon `diegosouzapw/omniroute`, wanda ke kiyaye tarihin ja kuma har yanzu yana karɓar kowane saki. Zazzage ayyukan `diegosouzapw/omniroute` na ci gaba da sabuntawa; canza sunan hoton zaɓi ne. Ana buga tashar pre-saki `:next` / `:next-web` da ke ƙasa zuwa `diegosouzapw/omniroute` da GHCR kawai.

Bayyanar dandali da yawa: `linux/amd64` + `linux/arm64` na asali (Apple Silicon, AWS Graviton, Rasberi Pi). Docker yana zaɓar ƙirar da ta dace ta atomatik; wuce `--platform linux/amd64` idan kuna buƙatar tilasta yin koyi da AMD64 akan rundunonin ARM.

### Sakin Tashoshi

OmniRoute tana buga tashoshi daban-daban Docker don ingantaccen sakewa, gwajin reshe mai aiki, da haɓaka haɓakawa.

| Tashoshi                        | Source                                           | Sauye-sauye                  | An shawarar amfani                                                                                                         |
| ------------------------------- | ------------------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned saki                            | Mai iya canzawa              | Ƙirƙirar ƙira wanda ke nuna ainihin fitarwa                                                                                |
| `:latest` / `:latest-web`       | Mafi girma** aka buga** kwanciyar hankali SemVer | Maɓallin barga mai canzawa   | Yana bin tabbataccen sakewa** bayan** a SemVer buga aikin — yayi** ba** waƙa `main` ko `release/v*` wanda ba a sake shi ba |
| `:next` / `:next-web`           | Tsohuwar reshen `release/v*` na yanzu            | Maɓallin sakewa mai canzawa  | gyare-gyaren gwaji waɗanda suka sauka akan reshen sakin aiki amma har yanzu basu kasance cikin ingantaccen saki ba         |
| `:main` / `:main-web`           | `main` reshe                                     | Mai nuna ci gaba mai canzawa | Gwajin haɓakawa da haɗin kai kawai                                                                                         |

#### Masu samar da zaman yanar gizo: hotunan `-web`

Kowane tashar da ke sama tana ninka azaman alamar `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), wanda aka gina daga matakin `runner-web` — hoto iri ɗaya da Playwright da Chromium browser. Hoton bayyane yana jigilar kaya** ba tare da** Chromium; `gemini-web`, `claude-web` da `claude-turnstile` suna bukata.

An jinkirta gazawar, ba lokacin farawa ba: waɗannan masu samarwa suna jera samfuran su kuma suna nunawa kamar yadda aka haɗa a cikin dashboard, kuma buƙatun farko kawai ta gaza tare da

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Idan kuna amfani da waɗancan masu ba da sabis, ja alamar `-web` ta tashar da kuke kan — babu wani abin da zai canza. A kan shigar npm/CLI (babu hoton Docker ), daidaitaccen gunkin da ya ɓace shine binary na burauza: gudanar da `npx playwright install chromium` akan mai watsa shiri.

#### Amfani da tashar riga-kafi

Ana sake gina tashar `next` akan kowane tura zuwa reshen `release/v*` na yanzu kuma ana buga shi duka biyun AMD64 da ARM64. Tsofaffin rassan kulawa ba za su iya sake rubuta shi ba. Tashar tana ba da hoto mai yuwuwa don gyare-gyaren da suka haɗa cikin reshen sakin aiki kafin a yanke alamar ta gaba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Don rubuta Docker, soke alamar hoton da aka zaɓa ta hanyar bayanin martaba, sannan ja da sake ƙirƙirar sabis ɗin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Aminci da sake dawowa

`next` tashar farko ce mai iyo. Yana iya canzawa akan kowane turawa zuwa reshen sakin aiki kuma shine** ba a tallafawa don amfanin samarwa** . Sanya narke hoton yayin da ake kimanta takamaiman gini:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kafin gwaji, yi tanadin ƙarar bayanan OmniRoute ko kundin bayanan da aka ɗaure. Don mirgine baya, mayar da sigar da aka yi amfani da ita a baya ko narkar da kuma sake ƙirƙirar akwati:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Ginin reshen saki ba zai taɓa motsa `latest`; sigar tatsuniyoyi tabbatacciya ce kawai zata iya haɓaka ma'anar barga. Hotunan `next` suna riƙe da duban hoton sakin da kuma toshe Ƙofar rashin lahani mai mahimmanci.

**`latest` ba garantin kuɗi ba ne don git.** Haɗaɗɗen gyare-gyare akan `main` ko akan reshen `release/v*` mai aiki suna** ba** a cikin `:latest` har sai an buga hoton SemVer tsayayye kuma aikin buga yana inganta `:latest` (narke ɗaya kamar wancan SemVer). Idan `latest` yayi kama da sanyi yayin da GitHub ya riga ya nuna gyara, ja `:next` don gwada reshen sakin ko jira alamar SemVer.

| Kuna so                                                       | Amfani                        |
| ------------------------------------------------------------- | ----------------------------- |
| GitOps / samarwa wanda ba dole ba ne ya yi nisa               | Pin `:X.Y.Z` (ko hoton narke) |
| Bi barga da aka buga kuma karɓi sake ƙirƙira akan kowane saki | `:latest`                     |
| Gwajin `release/v*` da ba a saki ba                           | `:next` (ba samarwa)          |
| Gwajin `main`                                                 | `:main` (ba samarwa)          |

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

| Bincike       | manufa                                                   | Kada ku yi amfani                                                            |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Rayuwa        | TCP on `PORT` (default `20128`), or soft HTTP `/healthz` | `/api/monitoring/health`                                                     |
| Shiri         | HTTP `GET /healthz`                                      | Matsakaicin lokacin ƙarewa waɗanda ke ɗaukar madaidaicin taron kamar matattu |
| Deep / mutane | `/api/monitoring/health`                                 | Kubelet rayuwa mai sarrafa kansa                                             |

**Haɓakawa:** sa ran kowane zaman ya ragu. Zuba abokan ciniki idan za ku iya; babu sabuntawa akan tsoho SQLite. Ƙirƙirar `restart: unless-stopped` da Docker `HEALTHCHECK` kuma za su maye gurbin tsari ɗaya kawai lokacin da kwantena mara lafiya — radius ɗin fashewa ɗaya.

Shirye-shiryen da aka shirya da taswirar Helm suna rayuwa a cikin `deploy/kubernetes/` da `deploy/helm/omniroute/` — duba [jagorar tura Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

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

barci `preStop` yana barin kube sauke wuraren ƙarshen sabis kafin SIGTERM haka** sabuwa** zirga-zirga yana tsayawa yana bugun tsarin mutuwa. A cikin jirgin `/v1/responses` SSE ana zubar da shi har zuwa `SHUTDOWN_TIMEOUT_MS` (tsoho na 30s) ta hanyar haya mai nauyi (#11015). Sabbin buƙatun da har yanzu suka kai ga aiwatar da samun `503` + `Retry-After: 5`. Sake ƙirƙira tazarar ƙarshen ƙarshen fanko har sai an shirya wanda zai maye gurbin ya kasance mai wuyar ƙarancin — wanda shine SQLite topology, ba kuskuren bincike ba.

Postgres na waje/marubuci da yawa HA shine** ba** hanyar haja da aka rubuta. Idan kuna buƙatar HA, adana kwafi ɗaya ko gudanar da topology aikin ya gwada kuma an rubuta shi daban. Aikin Postgres/MySQL yana zaune a cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Har sai wannan jirgi, hanya ɗaya da aka goyan baya don haɓaka** babba** Ƙarfin `/v1/responses` shine N matakai masu zaman kansu (sashe na gaba), ba `replicas > 1` akan ƙarar ɗaya ba.

## Sikeli-fita: N matakai masu zaman kansu

### Codex alamar juyawa ikon mallakar

Dole ne kwafin asusun Codex ɗaya kada ya cinye alamar wartsakewar amfanin guda ɗaya da kansa. A kan al'amuran da kawai ke cinye takaddun aiki tare, saita `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Bar shi a kwance akan mai juyawa guda ɗaya. Kowane tsari har yanzu yana buƙatar nasa `DATA_DIR`; wannan zaɓin ba ya raba SQLite ko samar da aiki tare da alamar ko kulle da aka rarraba.

Misalin m yana sake karanta haɗin kai lokacin da ake buƙatar wartsakewa kuma yana ɗaukar wata alama ce ta daban, mara ƙarewa. In ba haka ba ana kashe wartsakewa ba tare da ƙarewa ko kashe haɗin haɗin gwiwa ko ƙirga gazawar mai wartsawa ba. Haƙiƙanin gazawar tantancewa ta sama har yanzu tana amfani da lissafin gazawar al'ada, sanyi mai faɗi da kuskuren abokin ciniki na yau da kullun; kashe asusu ya kasance na dindindin. Haɗa alamun jujjuyawar mai shi kafin alamun samun damar ƙarewa (tsofaffin jagorar wartsakewa shine mintuna biyar), ko sake shigo da fayil ɗin Codex auth. Shigo da keɓaɓɓu yana adana alamun da aka kawo ba tare da inganta su a ƙarshen alamar ba. Manual dashboard/API refresh dawo `409 refresh_disabled`; sababbin login OAuth ba su canzawa. Duba [bayanin muhalli](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Ɗayan tsari na Node shine** guda V8** . ~ 3 MiB / ~ 750k-token codeing-agent `POST /v1/responses` (RTK + Caveman) sun zubar da tsibin a ~ 12 Gi (`FATAL ERROR: Reached heap limit`) kuma suna iya OOM a 16 Gi rukuni. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Wannan ma'aunin shine a** ƙwaƙwalwar ajiya-kasafin kuɗi** gargadi, ba samfur mai wuya-max na tsayin `/v1/responses` guda biyu na lokaci ɗaya ba. An shigar da shigar da hira mai nauyi ta hanyar kasafin kudin shigar da aka samu ta atomatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) mai girman daga wancan V8/cgroup rufin — ya tsallake shi sama (ko saita madaidaicin ƙidaya `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) akan tsari mai girman gaske yana sake dawo da zubar da ciki. Ƙananan hirarraki, `/healthz`, `/v1/models`, da MCP sune** ba** a cikin wannan hular.

### Tsari ɗaya: fiye da dogayen `/v1/responses` biyu

A** lafiya** tsari (tuni kasa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, tsoho `0.75`)** mai yiwuwa** gudanar da `POST /v1/responses` fiye da guda biyu na lokaci ɗaya lokacin da tsarin kasafin-faɗin inflight-byte (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) har yanzu yana da ɗaki. Jiki a ko sama da `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (tsoho 256 KiB) suna ɗaukar haya mai nauyi iri ɗaya kamar buƙatun-nauyin tsari kuma suna amfani da guda [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` gudun hijira (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dubun abokan ciniki na SSE masu tsayi (masu aiki galibi suna buƙatar 40-50) shine a** ƙwaƙwalwar ajiya-kasafin kuɗi** tambaya — girman tsibi + primary/headroom ramummuka + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ba ƙaƙƙarfan ƙayyadaddun samfur na “max 2”. Har yanzu tulin matsi yana zubar da `503` mai sake gwadawa don haka #7849 baya dawowa.

Zuwa** ninka tsibi** (tsofaffin wuraren V8 masu zaman kansu)** yau** :

| Yi                                                                                                                                                   | Kar ka                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Gudu** N containers/pods** , kowacce da ta** nasa** `DATA_DIR` / girma                                                                               | Saita `replicas > 1` akan fayil ɗin SQLite ɗaya                           |
| Girman nauyi a cikin jirgin + lafiyayyan-ɗakin kai daga tudun kasafin kuɗi-byte; 1-2 shine tsohowar #7849 mai ra'ayin mazan jiya, ba max samfurin ba | Ba da tsari guda 8 × RAM da hular ƙidayar da ba ta da iyaka               |
| Na zaɓi: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` don** raba adadin ƙididdiga**                                                          | Bi da Redis kamar yadda aka raba SQLite — ba haka bane                    |
| Kwafin sirrin mai badawa cikin kowane misali (ko karɓar dashboards da aka raba)                                                                      | Yi tsammanin dashboard ɗaya / log-log ɗin kira guda ɗaya a cikin al'amura |
| Gaba tare da kowane ma'aunin nauyi; m ta maɓallin API ko zaman ya isa                                                                                | Bukatar ƙayyadaddun ƙayyadaddun dillali-sane mai matsakaici               |

Hakanan za'a iya musayar alaƙa-zuwa-asusu ta hanyar Redis: saita `OMNIROUTE_SESSION_AFFINITY_STORE=redis` da `REDIS_URL` akan kowane tsari, tare da `REDIS_KEY_PREFIX` iri ɗaya da ingantaccen saitin `sessionAffinityTtlMs`. Fil suna warware hashed-account-account ga kowane tsari na cancantar haɗin gida, don haka asusun OAuth tare da madaidaitan metadata na ainihi baya buƙatar samun haɗin daidai IDs. Sanannun bayanan asusu suna gaba da IDs na gida masu cin karo da juna a cikin ƙudurin fil da korar da aka tsare; rubutattun bayanai ba tare da ainihi ba (ko masu kiran korar ba tare da ainihi ba) suna riƙe gadin ID gado. Lissafi ba tare da tsayayyen asalin amfani ba har yanzu suna buƙatar daidaita IDs. kurakurai Redis ko kira da suka wuce 100 ms suna komawa zuwa SQLite na gida. Kowane kantin Redis affinity yana ɗaukar fitattun ayyuka a 8, yana ƙetare Redis nan da nan idan ya cika, kuma yana fitar da ramummuka kawai lokacin da aikin da ke ƙasa ya daidaita, ba a ranar ƙarshe na mai kira ba. A lokacin fitar Redis babu gaskiya guda ɗaya: kowane misali yana komawa ga kusancinsa na gida, zaman na iya sake turawa sau ɗaya kowane misali, kuma al'amura na iya bambanta. Dankowa yana sake haɗuwa ta hanyar Redis lokacin da ya murmure. Ƙayyadaddun ƙayyadaddun lokacin jira, ba aika EVAL ba, wanda zai iya sauka bayan faɗuwa. Rubuce-rubucen ba da hanya tsakanin hanyoyin sadarwa kwatanta ainihin ƙimar da aka lura ta hanyar yanke shawara, ba sabon lokacin karatun maye gurbin ba; kuskuren da aka gani ko kallon faɗuwar SQLite yana kwatanta shi azaman maɓallin Redis da ba ya nan. Ana maye gurbin fil ɗin da aka daina amfani da su a cikin CAS ɗaya, don haka umarnin da ya ƙare ba zai iya maye gurbin ko share sabon fil ɗin daban ba. Redis karanta atomically mayar da darajar da sauran uwar garken TTL; tabbatacce PTTL (ko babu ƙarewa) yana ƙayyade rayuwa, ba tambarin lokaci JSON na marubuci ko agogon mai karatu ba. Taswirar hoto na gida wanda ya rage TTL zuwa ranar ƙarshe na gida; Maɓallan JSON da ake da su sun kasance ana iya karanta su kuma ana ajiye ɗanyen bytes ɗin su don CAS. Redis shine kawai tushen gaskiya yayin da yake amsawa. Tabbatar da abubuwan da aka raba, taɓawa da sharewa suna cire shigarwar gida, kar a taɓa shigar ko sabunta ta. SQLite akan hanyar Redis yana riƙe da wannan misalin nasa yanke shawara na koma baya daga kurakuran Redis, ƙarewar lokaci ko jimlar shiga, TTL mai iyaka kamar da. Fitin gida da ya ɓace a kan kashewa daga baya yana biyan sabon zaɓi guda ɗaya (raɓawar cache ɗaya), ba asusun da ba daidai ba ko korar. Abubuwan da aka ƙi yarda sun dawo da wanda ya ci nasara da sauran TTL ta atomatik: zaɓi na yau da kullun yana sake duba ranar ƙarshe na gida kuma yana amfani da wanda ya cancanci ci gaba mai rai, taɓa amfani da shiga wannan asusun ba tare da wani rubutaccen rubutu ba. Idan babu shi, zaɓi yana riƙe ɗan takara na gida, yana barin fil ɗin da aka raba baya canzawa kuma yana fitar da saƙon kuskure guda ɗaya. An ƙi CAS baya rubuta SQLite; Kurakurai Redis, ƙarewar lokaci ko jikewar shigar suna amfani da aikin gida na yanzu maimakon. Idan amsar maye gurbin da aka aika ta zo bayan ɓata lokaci (an yarda, ƙi ko kuskure), daidaitaccen daidaitaccen ƙimar kwatankwacin-da-share yana kawar da jeri na faɗuwar lokaci mai kama da byte. Babu jira tsakanin wancan kwatanta da shafewa; Ana adana sabon rubutaccen rubutu. Korar da aka keɓe yana cire fil ɗin asusun asusun da ya gaza koda tare da saukar Redis, kuma yana sake tsaftace shi bayan an tabbatar da korar da aka raba. Amsoshin da aka raba a baya ba za su iya dawo da fil ɗin gida da aka kora ba saboda nasarar da aka raba ba ta taɓa rubuta SQLite ba. Faɗuwar faɗuwa daga baya na iya mayar da asusu; Rubutun rabawa da aka karɓa daga baya ya wanzu a cikin Redis kawai. kuskuren Redis baya tuntuɓar jihar koma bayan gida. Tare da kashe direban, sabbin fitilun da aka zaɓa suna riƙe da siffar filin SQLite JSON huɗu; Hanyar hanyar Redis kawai tana ƙara ainihin asusun hashed. Ana sake bincika fil ɗin da aka riga aka gama a kan iyakar ƙarewarsu. Redis wanda ba na haya ba yana sake karanta kantin sayar da kayayyaki, amma tsarin hayar haɗin gwiwa na iya amfani da fil ɗin da aka fitar tsakanin prefetch da tsarawa (taga mafi kyawun ƙoƙarin da aka yarda). Yarjejeniyar hayar ba za ta iya canza asusu ba bayan da'awar mai ɗorewa: a kan ƙididdigewa yana riƙe ɗan takarar wannan buƙatar kawai kuma ya bar wanda ya ci nasara ba a taɓa shi ba, don haka yarjejeniya a kowane yanayi tana kan wannan hanyar. Sauran teburin har yanzu yana aiki: wannan baya raba haɗakar zaman mannewa, ɗan asalin Codex juya fil, semaphores na asusu, makullai, iyakoki, daidaitawa ko rajistan ayyukan kira.

Hardware: lokaci-lokaci tsayin `/v1/responses` shine a** ƙwaƙwalwar ajiya-kasafin kuɗi** tambaya (heap + inflight-byte / #10110). `N` mai zaman kansa `DATA_DIR` s har yanzu yana ninka tsibirai: mai masaukin RAM dole ne ya rufe `N × cgroup`, ba "16 Gi pod guda ɗaya tare da N = 8." Kada a taɓa `replicas > 1` akan fayil ɗin SQLite ɗaya.

Ƙirƙirar zane (tuba biyu, juzu'i biyu — ba `deploy.replicas: 2`):

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

Yawan aiki (matsi daga keɓewar HTTP ) shine [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ɗayan tari mai ma'ana akan yanayi mai dorewa da aka raba shine [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Kuskuren yanki na Gemini a cikin Docker

Google AI Studio / Gemini API na iya dawo da HTTP 400 tare da FAILED_PRECONDITION da `User location is not supported for the API use.` Buƙatar nasara akan mai masaukin ba ta tabbatar da cewa kwandon yana amfani da hanyar fita ɗaya ɗaya ba. odar DNS, haɗin IPv4/IPv6, hanyar VPN da kuma ƙayyadaddun proxies na iya bambanta. Bincika [yankuna masu goyan bayan Google](https://ai.google.dev/gemini-api/docs/available-regions) da kuma ainihin hanyar haɗin gwiwa; wannan kuskuren kadai baya gano maɓalli mara kyau API.

### Fi son takamaiman wakili na haɗi

Yi amfani da [saitin wakili na kowane haɗin haɗin](../ops/PROXY_GUIDE.md#4-level-proxy-system) OmniRoute don haɗin Gemini da abin ya shafa, sannan maimaita** Gwaji Haɗin** da ƙaramar buƙata tare da samfurin iri ɗaya. Wannan yana kiyaye canjin kwatance zuwa wannan haɗin. Tabbatar cewa ana iya samun wakili daga akwati, kuma haɗin yana zaɓe ta da gaske. Canza hanya baya bada garantin cancantar yanki.

### Kwatanta mai masaukin baki da sadarwar kwantena

Kiyaye maɓalli, samfuri da buƙatun daidai lokacin da ake kwatanta ingantattun sakamako; kar a taɓa manna takaddun shaida, kalmomin shiga na wakili ko cikakken kanun izini a cikin matsala. Da farko duba wanne adireshin iyalai mai warware OS ke bayarwa, ta amfani da umarni iri ɗaya akan mai gida da cikin akwati:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Sauya `omniroute` tare da sabis ɗin da kuke gudanarwa (misali, `omniroute-web`). Waɗannan umarni suna buga iyalai na adireshi ba tare da takaddun shaida ko adiresoshin IP. `6` da aka dawo kawai yana nuna DNS IPv6 yana aikatawa** ba** tabbatar da hanyar IPv6 mai amfani ko hanyar API. Inda aka shigar da `curl`, kwatanta `curl -4 -I https://generativelanguage.googleapis.com` da `curl -6 -I https://generativelanguage.googleapis.com` a cikin mahalli biyu. Martanin HTTP yana tabbatar da haɗin kai don wannan binciken, koda kuwa kuskure ne mara tabbas; buƙatun ƙirar ƙira kawai yana gwada cancantar Gemini.

### Madadin matakin mai watsa shiri: IPv6 aiki da manufofin warwarewa

Mai ba da rahoto na [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ya dawo da damar shiga cikin muhallinsu ta hanyar ba da damar IPv6 kwantena da canza zaɓin adireshin glibc. Bi da wannan azaman madadin takamaiman yanayi. Tabbatar da IPv6 mai aiki, kwantena egress/routing da dokokin Tacewar zaɓi kafin daidaita abubuwan zaɓi. Adireshin ULA mai zaman kansa da kansa baya kafa haɗin IPv6 na jama'a.

Don ayyukan da aka riga aka haɗe zuwa tsohuwar hanyar sadarwa ta Compose, wannan guntu yana ba da damar IPv6 akan wannan hanyar sadarwa; Riƙe sauran sabis ɗinku, tashar jiragen ruwa, kundin girma da daidaitawa:

```yaml
networks:
  default:
    enable_ipv6: true
```

Don cibiyar sadarwa mai suna, kunna ta akan hanyar sadarwar da sabis ɗin ke haɗawa. Docker na iya kasafta wani yanki na ULA ; zaži fayyace, cibiyar sadarwa mara sa6owa kawai lokacin da hanyar sadarwarka ta bukace ta. Duba [Docker IPv6 sadarwar](https://docs.docker.com/engine/daemon/ipv6/) kuma [Rubuta zaɓuɓɓukan cibiyar sadarwa](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na a** Hoton tushen glibc** , `/etc/gai.conf` na iya canza zaɓin adireshin. Dockerfile na yanzu yana amfani da Debian; Hotunan tushen musl na al'ada ba sa raba wannan tsarin. Daidaiton da aka ruwaito yana canza alamar ULA daga `label fc00::/7 6` zuwa `label fc00::/7 1`. Fara daga cikakken teburin manufofin hoton kuma adana sauran shigarwar sa: ƙara `label` ko shigarwar `precedence` ya maye gurbin wancan tsohuwar tebur, don haka fayil ɗin da ke ɗauke da layin da aka canza kawai bai isa ba. [Ƙa'idar daidaitawar glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf) ta rubuta waɗannan ilimin tarukan. Haɗa fayil ɗin da aka sake dubawa kawai a `/etc/gai.conf` kuma sake ƙirƙira sabis don amfani da shi.

Wannan yana canza zaɓin adireshin OS don** duk zirga-zirga mai fita a cikin wannan akwati** . Ba ya tilasta kowane aikace-aikace don zaɓar IPv6: Node's DNS order da zaɓin haɗin suna da mahimmanci. Musamman `--dns-result-order=ipv4first` ya fi son IPv4 kuma ba magani bane ga gazawar IPv4-only. Duba [Node DNS yana oda](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Sake gwada Gemini da sauran masu samar da ku bayan kowane canjin matakin runduna. Don jujjuya baya, cire dutsen `gai.conf` na al'ada, maido da saitunan cibiyar sadarwar da ta gabata kuma sake ƙirƙirar service/network ɗin da abin ya shafa yayin taga gyarawa. Sake ƙirƙira hanyar sadarwa na iya katse sauran kwantena da ke makale da ita; kar a share ƙarar bayanan dagewa.

## Muhimman Bayanan Kula

- **Yanayin SQLite WAL:** Ya kamata a bar `docker stop` ya kammala domin OmniRoute ya iya rubuta sabbin canje-canje na ƙarshe zuwa `storage.sqlite` ta hanyar checkpoint. Fayilolin Compose da aka haɗa sun riga sun saita wa’adin dakatarwa na daƙiƙa 40. Idan kana gudanar da image ɗin kai tsaye, ci gaba da amfani da `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Saita shi zuwa `true` idan ana sarrafa madadin bayanai na yau da kullum/na kafin rubutawa a waje. Har yanzu ƙaura na bayanan da suke akwai suna buƙatar nasu hoton kariya mai ɗorewa da matakin kariya na ƙaura mai yawa.
- **Dawwamar Bayanai:** Koyaushe haɗa volume zuwa `/app/data` domin adana database ɗinka, maɓallai, da saituna a duk lokacin da aka sake kunna container.
- **Saitin Port:** Sauya environment variable na `PORT` domin canza port na asali mai lamba `20128`.

## Duba Kuma

- [Jagorar Tura Tsarin VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Saitin VM + nginx + Cloudflare
- [Jagorar Tura Tsarin Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Tura tsarin zuwa Fly.io
- [Saitin Environment](../reference/ENVIRONMENT.md) — Cikakken bayani game da `.env`
