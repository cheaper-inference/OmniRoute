# 🐳 Docker Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Комплетна референца за примену помоћу Docker-а. За брзи почетак погледајте [Docker одељак у README-у](../README.md#-docker).

## Садржај

- [Брзо покретање](#quick-run)
- [Са датотеком окружења](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Доступни профили](#available-profiles)
- [Подешавање CLI алата на хосту када се OmniRoute покреће у Docker-у](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis помоћни контејнер](#redis-sidecar)
- [Compose за продукцију](#production-compose)
- [Фазе Dockerfile-а](#dockerfile-stages)
- [Критичне променљиве окружења](#critical-environment-variables)
- [Docker Compose са Caddy-јем (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare брзи тунел](#cloudflare-quick-tunnel)
- [Ознаке слика](#image-tags)
- [Ажурирања контролне табле у Docker-у](#dashboard-updates-in-docker)
- [Доступност: подразумевани SQLite подржава само једну реплику](#availability-default-sqlite-is-single-replica)
- [Gemini регионалне грешке унутар Docker-а](#gemini-regional-errors-inside-docker)
- [Важне напомене](#important-notes)

---

## Брзо покретање

> **Самостално хостовање једном командом?** Погледајте
> [Водич за самостално хостовање](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (објављена слика +
> Redis, доступно само преко loopback интерфејса, без избора профила). Брзо покретање испод представља
> приступ са једним контејнером за кориснике који већ покрећу Redis на другом месту.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Са датотеком окружења

```bash
# Прво копирајте и измените .env
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
# Основни профил (без CLI алата)
docker compose --profile base up -d

# CLI профил (уграђени Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Профил хоста (првенствено за Linux; монтира CLI извршне датотеке хоста само за читање)
docker compose --profile host up -d

# Веб-профил (Chromium/Playwright за добављаче засноване на веб-сесијама)
docker compose --profile web up -d

# Комбинујте CLI + CLIProxyAPI помоћни контејнер
docker compose --profile cli --profile cliproxyapi up -d
```

## Доступни профили

OmniRoute испоручује Compose профиле за главне начине примене. Изаберите онај који одговара вашем окружењу.

| Профил                 | Услуга           | Када се користи                                                                                                                                            | Команда                                      |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (подразумевано) | `omniroute-base` | Сервер без графичког интерфејса / минимално окружење за извршавање, без укључених CLI алата добављача                                                      | `docker compose --profile base up -d`        |
| `cli`                  | `omniroute-cli`  | Агентски токови рада који позивају `omniroute providers/setup/doctor` и укључене CLI алате (Codex, Claude Code, Droid, OpenClaw)                           | `docker compose --profile cli up -d`         |
| `host`                 | `omniroute-host` | Linux хостови којима је потребан приступ CLI алатима хоста налик на `network_mode`, монтирањем `~/.local/bin`, `~/.codex`, `~/.claude` итд. само за читање | `docker compose --profile host up -d`        |
| `cliproxyapi`          | `cliproxyapi`    | Покреће [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) помоћни контејнер на порту `8317` за проксирање узводних CLI алата                     | `docker compose --profile cliproxyapi up -d` |
| `web`                  | `omniroute-web`  | Добављачи засновани на веб-сесијама којима је потребан прегледач: `gemini-web`, `claude-web`, `claude-turnstile` (гради `runner-web`, Chromium је укључен) | `docker compose --profile web up -d`         |

> Више профила се може комбиновати: `docker compose --profile cli --profile cliproxyapi up -d`.

## Конфигурисање CLI алата на хосту када се OmniRoute покреће у Docker-у

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и дугме
**Сачувај конфигурацију** на контролној табли уписују датотеке као што су `~/.codex/*.config.toml`. Те путање
имају значење само на машини на којој се CLI заиста покреће. Ако их покренете унутар
контејнера, упис се врши у сопствени матични директоријум контејнера (`/home/node` —
слика се покреће као `USER node`), одакле их ниједан CLI на хосту никада неће читати и где се
одбацују чим се контејнер поново креира.

OmniRoute то открива и одбија упис, уз приказ упутстава, уместо да
пријави успех који не можете да искористите: CLI се завршава кодом `2`, а API одговара кодом `422`
са `containerEphemeralTarget: true`.

### Препоручено: покрените CLI на хосту, а OmniRoute у Docker-у

Контејнер пружа API; CLI конфигурише ваше алате на хосту.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # усмерите CLI на контејнер
omniroute setup-codex                      # уписује стварни ~/.codex на вашем хосту
```

Ово је прави избор када се Codex, Claude Code, Cursor или слични алати покрећу на вашем
лаптопу — што је уобичајено подешавање.

### Алтернатива: монтирајте конфигурационе директоријуме хоста помоћу bind mount-а (`host` профил)

Ако желите да сам контејнер уписује вашу конфигурацију на хосту, монтирајте
директоријуме у њега и усмерите `CLI_CONFIG_HOME` на корен монтирања. Профил `host`
то већ ради:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount чини путању поузданом: OmniRoute чита
`/proc/self/mountinfo` и дозвољава упис у монтиране путање (као и у директоријуме
чији су поддиректоријуми монтирани, што тачно одговара горњој структури `/host-home`), док
и даље одбија упис у немонтиране путање.

### Излаз у крајњој нужди: конфигуришите CLI алате самог контејнера (користите умерено)

Када се CLI алати заиста налазе унутар контејнера (профил `cli`), упис
је намеран. Проследите `--allow-container-write` било којој команди `setup-*` или подесите
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` за сервер. Упис ће бити извршен
уз упозорење да неће преживети поновно креирање контејнера.

> **Безбедносно упозорење — профил `cli` + монтирање `docker.sock`.**
> Профил `cli` монтира `/var/run/docker.sock` помоћу bind mount-а како би аутоматски
> програм за ажурирање унутар контејнера могао поново да креира стек преко демона на хосту
> (`src/lib/system/autoUpdate.ts` проверава присуство тог сокета и прескаче
> Docker путању када он није присутан). Тај сокет је **граница поверења са root приступом
> хосту**: све што може да му приступи управља Docker демоном хоста као
> root — може да креира, прегледа, зауставља и уклања било који контејнер на хосту.
> Последице:
>
> 1. **Никада не излажите порт профила `cli` мрежи.** Објавите
>    га на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — профил `cli` доступан преко LAN-а претвара свако даљинско извршавање кода на нивоу контролне табле у
>    потпуну компромитацију хоста.
> 2. **Не монтирајте никакве додатне директоријуме хоста у профил `cli`.**
>    Docker сокет заједно са било којим додатним монтирањем даје контејнеру потпун
>    приступ за читање и писање у ваш систем датотека и конфигурацију хоста. Ако је потребно да алат
>    види пројекат, покрените га локално помоћу CLI бинарне датотеке — немојте га монтирати
>    у `cli` контејнер.
>
> Ако вам није потребно аутоматско ажурирање унутар контејнера, немојте укључивати профил `cli`
> (`COMPOSE_PROFILES=core,redis` или краће). Остали профили не
> монтирају Docker сокет.
>
> Погледајте `docs/security/MITM-TPROXY-DECRYPT.md` (git; није компајлиран у `/docs`) за повезани модел претњи
> у вези са MITM-ом и `docs/security/SUPPLY_CHAIN.md` за ланац порекла бинарних датотека
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis пратећи контејнер

OmniRoute се ослања на Redis као подршку за дистрибуирани ограничавач брзине и дељени кеш. Услуга `redis` је **увек дефинисана** у датотеци `docker-compose.yml` (није ограничена профилом) и покреће се заједно са било којим другим профилом.

| Детаљ                    | Вредност                                      |
| ------------------------ | --------------------------------------------- |
| Слика                    | `redis:7-alpine`                              |
| Назив контејнера         | `omniroute-redis`                             |
| Интерни порт             | `6379`                                        |
| Порт домаћина (замена)   | `REDIS_PORT` (подразумевано `6379`)           |
| Адреса домаћина (замена) | `REDIS_BIND_HOST` (подразумевано `127.0.0.1`) |
| Волумен                  | `omniroute-redis-data` → `/data`              |
| Провера исправности      | `redis-cli ping` (интервал од 10s)            |

Повезане променљиве окружења:

- `REDIS_URL` — ниска за повезивање која се прослеђује апликацији (подразумевано `redis://redis:6379`).
- `REDIS_PORT` — мапирање порта на страни домаћина за Redis контејнер.
- `REDIS_BIND_HOST` — интерфејс домаћина на којем се порт објављује. Подразумевана вредност је `127.0.0.1`.

> **Зашто се подразумевано користи повратна петља:** пратећи контејнер ради без `requirepass`, а контејнери
> апликације му приступају преко compose мреже (`redis:6379`) — објављени порт постоји
> само за алате на страни домаћина (`redis-cli`, локални `npm run dev`). Објављивање на
> `0.0.0.0` изложило би Redis без аутентификације сваком домаћину у вашој LAN мрежи. Ако подесите
> `REDIS_BIND_HOST=0.0.0.0`, додајте и `--requirepass` у `command:` услуге.

**Онемогућавање Redis-а** се не препоручује (ограничавач брзине ће прећи на резервно решење у меморији). Ако то ипак морате да урадите, уклоните/коментаришите блок услуге `redis:` у датотеци `docker-compose.yml` или смањите број њених инстанци на нулу:

```bash
docker compose up -d --scale redis=0
```

## Производни Compose

За изоловани производни снимак који ради паралелно са развојним окружењем користите `docker-compose.prod.yml`.

| Детаљ                              | Вредност                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| Датотека                           | `docker-compose.prod.yml`                                                                        |
| Подразумевани порт контролне табле | `PROD_DASHBOARD_PORT=20130` (мапиран на интерни `${DASHBOARD_PORT:-20128}`)                      |
| Подразумевани API порт             | `PROD_API_PORT=20131`                                                                            |
| Слика                              | `omniroute:prod` (изграђена из циља `runner-cli`)                                                |
| Redis контејнер                    | `omniroute-redis-prod` (`redis:8.6.2`, наменски волумен `redis-prod-data`)                       |
| Волумен података                   | `omniroute-prod-data` (именован, задржава се између поновних изградњи)                           |
| Провере исправности                | `node healthcheck.mjs` + `redis-cli ping`, при чему је `depends_on` условљен исправношћу Redis-а |

Начин употребе:

```bash
# Изградите и покрените производни стек
docker compose -f docker-compose.prod.yml up -d --build

# Пратите ток евиденције
docker compose -f docker-compose.prod.yml logs -f

# Зауставите и уклоните стек (задржите волумене)
docker compose -f docker-compose.prod.yml down
```

Производни стек ради паралелно са развојним compose окружењем (различити називи контејнера, портови и волумени), тако да можете да наставите локални развој док производно окружење остаје активно.

## Фазе Dockerfile-а

Репозиторијум садржи вишефазни Dockerfile (`Dockerfile`). Доступне су четири фазе; изаберите одговарајући `target` за свој случај употребе.

| Фаза          | Основна слика         | Намена                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Инсталира зависности (`npm ci --legacy-peer-deps`) и покреће `npm run build` (подразумевано користи Turbopack — погледајте Ресурси током изградње испод)                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Продукционо окружење за извршавање са самосталним Next.js излазом. **Не садржи CLI алатке провајдера.**                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | Додаје `git`, `docker.io`, `docker-compose` и глобалне CLI алатке: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Изаберите ово за агентске токове рада.**                                                                                                      |
| `runner-web`  | `runner-base`         | Додаје Playwright + Chromium прегледач (`--with-deps`) за провајдере веб-сесија: `gemini-web`, `claude-web`, `claude-turnstile`. **Изаберите ово када користите те провајдере** — обична слика без тога отказује у тренутку захтева (погледајте напомену о `-web` под Канали издања). |

Ручно изградите одређени циљ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси током изградње

Три аргумента изградње контролишу потрошњу ресурса фазе `builder`. Они важе само током изградње —
`OMNIROUTE_MEMORY_MB` (испод) је засебна поставка за време извршавања.

| Аргумент изградње           | Подразумевано | Ефекат                                                                                                    |
| --------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` изграђује помоћу webpack-а: мања вршна потрошња меморије, али спорије. `1` укључује Turbopack.        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Горња граница V8 heap-а (`--max-old-space-size`) за покренути `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Прослеђује вредност у `CIRCLE_NODE_TOTAL`; Next изводи `workers = N - 1` за прикупљање података страница. |

`OMNIROUTE_BUILD_WORKERS` треба повећати на снажном систему за изградњу, а на њега
треба посумњати када изградња са ограниченим ресурсима откаже **након**
`✓ Compiled successfully`. Сваки процес за податке страница је засебан процес,
као и сам родитељски `next build`; репродукција на активном VPS-у (проблем #7518)
измерила је вршни RSS сваког процеса на ~4.5 GB, независно од heap опције
`NODE_OPTIONS` (Turbopack компајлира у изворној/Rust меморији изван V8 heap-а).
Подразумевана вредност `2` (→ 1 радни процес, укупно 2 процеса) прилагођена је
GitHub-hosted извршиоцима са 16 GB / 4 vCPU које користи pipeline за објављивање.
При вредности `8` (→ 7 радних процеса) том извршиоцу је понестало меморије и
buildkit је прекинуо корак грешком `ResourceExhausted: ... cannot allocate memory`;
ни `3` (→ 2 радна процеса) се и даље није уклапало када је RSS по процесу измерен
директно уместо да буде процењен. `tests/unit/docker-build-memory-budget.test.ts`
врши прорачун на основу измерене вредности и отказује ако било која поставка
премаши могућности извршиоца.

Turbopack компајлира у изворној Rust меморији која се налази **изван** V8 heap-а,
тако да је `OMNIROUTE_BUILD_MEMORY_MB` не ограничава. На хосту са ограничењем
меморије, OOM killer затим прекида изградњу сигналом SIGKILL без икаквог текста
грешке — она се једноставно зауставља усред `Creating an optimized production build`,
што делује као застој, а не као недостатак меморије. Због тога `Dockerfile`
подразумевано користи webpack (`OMNIROUTE_USE_TURBOPACK=0`), за разлику од
`npm run dev` / `npm run build`, где је Turbopack подразумевани избор у коду:
обичан `docker build .` без аргумената изградње (што покрећу Railway и други
хостови са постављањем једним кликом) не сме тихо да се прекине на систему за
изградњу са ограниченом меморијом. Објављене слике већ изричито прослеђују
`OMNIROUTE_USE_TURBOPACK=0` у `docker-publish.yml`. На систему за изградњу са
довољно RAM-а укључите Turbopack ради брже изградње:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` је омогућен, па `next build` покреће родитељски **и** радни
процес, а сваки засебно поштује `OMNIROUTE_BUILD_MEMORY_MB`. Ограничење контејнера
поставите на нешто више од приближно двоструке вредности, а не само на ту вредност.

Измерено на овом стаблу (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Ограничење контејнера | Резултат                                        |
| --------- | --------------------- | ----------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB        | OOM прекид при обе вредности, без поруке        |
| webpack   | 8 GiB                 | радни процес изградње прекинут сигналом SIGKILL |
| webpack   | 12 GiB                | успешно, вршна потрошња 11.1 GiB                |

### Подразумеване вредности током извршавања

Подразумеване вредности које извози `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Понашање меморије у Docker-у:

- Слика поставља `OMNIROUTE_MEMORY_MB=1024` и из њега изводи `NODE_OPTIONS=--max-old-space-size=1024`.
- Стварни серверски процес покреће самостални покретач, који чита `OMNIROUTE_MEMORY_MB` и додаје `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node користи последњу поновљену вредност `--max-old-space-size`, тако да постављање `OMNIROUTE_MEMORY_MB` контролише ефективно ограничење Docker heap меморије.
- Пошто га слика увек поставља, сопствена резервна вредност покретача, калибрисана према RAM-у, никада се не примењује у Docker-у. Експлицитно је повећајте у складу са радним оптерећењем (табела испод). `2048` је и даље премало за `/v1/responses` агената за програмирање.

### RAM током извршавања за агенте за програмирање

Подразумеваних 1 GiB у Docker-у представља минимум за контролну таблу и једноставно ћаскање, а не величину за продукционо окружење. Дуга тела захтева `POST /v1/responses` (стотине порука, десетине алата) задржавају више графова у меморији током компресије. Два преклапајућа захтева од приближно 3 MiB / 750k токена изазвала су прекид V8 при **12 GiB** old-space меморије (`FATAL ERROR: Reached heap limit`), а такође су достигла OOM ограничење cgroup-а од 16 GiB. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Подесите **cgroup `--memory` изнад величине heap меморије** — изворни бафери, SQLite и међурезултати компресије налазе се изван V8.

| Радно оптерећење                                | `OMNIROUTE_MEMORY_MB`          | Контејнер / cgroup         | Напомене                                                                                                         |
| ----------------------------------------------- | ------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Контролна табла, једно једноставно ћаскање      | `1024` (подразумевано у слици) | ≥2 GiB                     |                                                                                                                  |
| Један агент за програмирање (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                    | Типична `/v1/responses` сесија са једним агентом                                                                 |
| Два истовремена дуга `/v1/responses` захтева    | `10240`–`12288`                | ≥12–16 GiB                 | Измерен прекид V8 при приближно 12 GiB heap меморије                                                             |
| Три или више истовремених дугих контекста       | немојте на једном процесу      | серијализујте / више RAM-а | Подразумевано је дозвољен 1 активан захтев великог оптерећења; повећање без додатног RAM-а поново изазива прекид |

`omniroute serve` на физичком серверу калибрише приближно 35% RAM-а (ограничено на `[512, 4096]`) када `OMNIROUTE_MEMORY_MB` **није постављен**. Docker увек поставља `1024`, па се та калибрација никада не извршава у званичној слици.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Критичне променљиве окружења

Поред подразумеваних вредности документованих у [ENVIRONMENT.md](../reference/ENVIRONMENT.md), следеће променљиве су најважније при покретању у Docker окружењу:

| Променљива                    | Намена                                                                                                                                                                                                                                                                             | Подразумевано                  |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Дељена тајна за WebSocket мост. **Обавезна у продукцији** — подесите јак насумични стринг.                                                                                                                                                                                         | није подешено (мора се задати) |
| `REDIS_URL`                   | Стринг за повезивање са позадинским системом за ограничавање брзине / кеширање                                                                                                                                                                                                     | `redis://redis:6379`           |
| `REDIS_PORT`                  | Порт на страни хоста за приложени Redis контејнер                                                                                                                                                                                                                                  | `6379`                         |
| `REDIS_BIND_HOST`             | Мрежни интерфејс хоста на ком је објављен приложени Redis порт (повратна петља, осим ако не додате AUTH)                                                                                                                                                                           | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Путања на хосту која се монтира у `cli` профил на `/workspace/omniroute` за токове рада самосталног ажурирања                                                                                                                                                                      | `.` (тренутни директоријум)    |
| `OMNIROUTE_MEMORY_MB`         | Горња граница Node heap меморије током извршавања за Docker самостални сервер; замењује горњу подразумевану вредност слике. Агенти за програмирање: `8192`+ (погледајте [RAM током извршавања](#runtime-ram-for-coding-agents)).                                                   | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Замењује изложене портове за контролну таблу (20128) и API (20129)                                                                                                                                                                                                                 | `20128` / `20129`              |
| `APP_BIND_HOST`               | Мрежни интерфејс хоста на ком docker-compose објављује портове контролне табле/API-ја/live-WS-а. Када је `REQUIRE_API_KEY=false` (подразумевано), `0.0.0.0` излаже анонимни `/v1` прокси LAN-у — проширите приступ само уз `REQUIRE_API_KEY=true` или реверзни прокси испред њега. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Мрежни интерфејс хоста на ком docker-compose објављује `cliproxyapi` пратећи контејнер — његов простор података садржи акредитиве добављача.                                                                                                                                       | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Директоријум који скенер додатака током извршавања чита и у који инсталира додатке. Подесите га када се додаци монтирају помоћу bind mount-а: подразумевана вредност прати `HOME`, који слика не мора да извезе.                                                                   | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | URL потпутања када се апликација објављује иза реверзног проксија (нпр. `/omniroute`)                                                                                                                                                                                              | _(празно = корен)_             |
| `NEXT_PUBLIC_BASE_URL`        | Јавно порекло у прегледачу, укључујући потпутању (нпр. `https://host/omniroute`)                                                                                                                                                                                                   | није подешено                  |
| `PROD_DASHBOARD_PORT`         | Порт контролне табле на страни хоста за `docker-compose.prod.yml`                                                                                                                                                                                                                  | `20130`                        |
| `CLIPROXYAPI_PORT`            | Порт на страни хоста за `cliproxyapi` пратећи контејнер                                                                                                                                                                                                                            | `8317`                         |

## Обрнути прокси на потпутањи (Traefik / nginx)

Next.js `basePath` се компајлира у самостални пакет. OmniRoute бележи уграђену
вредност у контролној датотеци у корену апликације (уписује се током `npm run build`; чита је
`scripts/docker/ensure-docker-base-path.mjs`) и пореди је са
`OMNIROUTE_BASE_PATH` када се контејнер покрене. Када се разликују, а слика је
направљена за корен домена, улазна тачка преписује самосталне манифесте,
уграђене литерале `basePath`/`assetPrefix` (Next 16 генерише URL-ове SSR ресурса само из
`assetPrefix` — алатка за закрпе пресликава потпутању и у њега), уграђене
URL-ове ресурса `/_next/static` (манифесте клијентских референци, увозе медија, унапред генерисане
странице грешака) и клијентски `process.env` посреднички слој пре него што се
`node dev/run-standalone.mjs` покрене.

### Изградња помоћу Compose-а (препоручено)

Подесите обе променљиве у `.env`, а затим поново изградите како би се слика и окружење извршавања подударали:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` прослеђује `OMNIROUTE_BASE_PATH` као Docker аргумент за изградњу и као
променљиву окружења током извршавања.

### Унапред изграђена коренска слика + потпутања током извршавања

Објављене слике `diegosouzapw/omniroute:*` изграђене су за корен домена. И даље можете
подесити `OMNIROUTE_BASE_PATH` током извршавања; контејнер једном закрпи пакет при покретању.
Упарите га са одговарајућим јавним пореклом:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Подесите обрнути прокси тако да прослеђује **целу** спољну путању (немојте уклањати
префикс). Traefik треба да усмерава `PathPrefix(`/omniroute`)` ка контејнеру без
`StripPrefix`, како би Next.js примао `/omniroute/...` и испоручивао ресурсе са
`/omniroute/_next/...`.

Docker провера здравља испитује лагану крајњу тачку животног циклуса `/healthz`, којој је додат префикс
активне вредности `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остаје доступна за
дијагностику коју користе људи/контролне табле; да бисте поново усмерили HEALTHCHECK контејнера на њу (на пример
ради спровођења дубинске провере здравља), подесите `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Та путања представља **дубинску** проверу (база података + резиме надзора) — прикладну за Docker-ов
ретки `HEALTHCHECK` ако се поново определите за њу, али **не** и за интервале Kubernetes `livenessProbe`
провере.

За оркестраторе (Kubernetes, Nomad итд.):

| Провера           | Препоручено                                                                | Избегавати                                                              |
| ----------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Живост            | HTTP `GET /livez` или TCP на главном порту (`PORT`, подразумевано `20128`) | `/api/monitoring/health` као проверу живости                            |
| Спремност         | HTTP `GET /healthz`                                                        | Кратка временска ограничења која заузету петљу догађаја сматрају мртвом |
| Дубинска / спољна | `/api/monitoring/health`                                                   | —                                                                       |

`/healthz` извештава о животном циклусу процеса (`ok` / `starting` / `stopping`). `/livez` проверава
само да ли је процес жив (200 кад год обрађивач може да се изврши; не чека
спремност). Обе се и даље извршавају у истој Node петљи догађаја као и обрада захтева, па
рад са каталогом или компресијом који интензивно користи CPU може да их одложи — заузето ≠ мртво. Дајте предност TCP
провери живости ако HTTP провере прекорачују време. Потпуне смернице за провере:
[Водич за надзор — препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose са Caddy-јем (аутоматски TLS за HTTPS)

OmniRoute се може безбедно изложити помоћу Caddy-јевог аутоматског обезбеђивања SSL сертификата. Уверите се да DNS A запис вашег домена показује на IP адресу вашег сервера.

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
      # Извор видљив прегледачу за OAuth повратне позиве, везе контролне табле и генерисане јавне URL адресе.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Интерна URL адреса између сервера за заказане задатке / самосталне захтеве.
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

Caddy поставља стандардна заглавља за прослеђивање ка узводном контејнеру. OmniRoute користи
`NEXT_PUBLIC_BASE_URL` као канонски јавни извор за OAuth повратне позиве и генерисане јавне
везе; аутентификовани уписи са контролне табле користе захтеве истог порекла уз CSRF
заштиту везану за сесију. Омогућите `OMNIROUTE_TRUST_PROXY` само за напредна постављања у којима намерно
желите да OmniRoute изведе јавни извор из поузданих прослеђених заглавља уместо из експлицитне
конфигурације.

## Cloudflare Quick Tunnel

Подршка контролне табле за Docker постављања укључује **Cloudflare Quick Tunnel** који се покреће једним кликом на `Dashboard → Endpoints`. При првом омогућавању преузима се `cloudflared` само када је потребан, покреће се привремени тунел до ваше тренутне `/v1` крајње тачке и приказује генерисана `https://*.trycloudflare.com/v1` URL адреса непосредно испод ваше уобичајене јавне URL адресе.

Панели тунела крајњих тачака (Cloudflare, Tailscale, ngrok) могу се приказати или сакрити преко `Settings → Appearance` без промене стања активног тунела.

### Напомене о тунелима

- URL адресе Quick Tunnel-а су привремене и мењају се након сваког поновног покретања.
- Quick Tunnel-и се не обнављају аутоматски након поновног покретања OmniRoute-а или контејнера. По потреби их поново омогућите са контролне табле.
- Управљана инсталација тренутно подржава Linux, macOS и Windows на архитектурама `x64` / `arm64`.
- Управљани Quick Tunnel-и подразумевано користе HTTP/2 транспорт како би се избегла бучна QUIC упозорења о UDP баферу у ограниченим контејнерским окружењима. Подесите `CLOUDFLARED_PROTOCOL=quic` или `auto` ако желите другачији транспорт.
- Docker слике садрже системске корене CA сертификата и прослеђују их управљаном `cloudflared`-у, чиме се избегавају грешке TLS поверења када се тунел покреће унутар контејнера.
- Подесите `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ако желите да OmniRoute користи постојећу бинарну датотеку уместо да је преузме.

## Ознаке слика

| Слика                    | Ознака   | Величина | Опис                                                          |
| ------------------------ | -------- | -------- | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Највиша **објављена** стабилна SemVer верзија (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Фиксирајте ову класу ознаке за GitOps                         |

Манифест за више платформи: изворни `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker аутоматски бира одговарајућу архитектуру; проследите `--platform linux/amd64` ако морате да принудно користите AMD64 емулацију на ARM домаћинима.

### Канали издања

OmniRoute објављује засебне Docker канале за стабилна издања, тестирање активне гране издања и развојне верзије.

| Канал                           | Извор                                         | Променљивост                   | Препоручена употреба                                                                                                                  |
| ------------------------------- | --------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Потписано/верзионисано издање                 | Непроменљив                    | Продукциона постављања која фиксирају тачно издање                                                                                    |
| `:latest` / `:latest-web`       | Највиша **објављена** стабилна SemVer верзија | Променљив стабилни показивач   | Прати стабилна издања **након** задатка објављивања SemVer верзије — **не** прати `main` нити необјављене комитове гране `release/v*` |
| `:next` / `:next-web`           | Тренутна подразумевана грана `release/v*`     | Променљив показивач предиздања | Тестирање исправки које су уврштене у активну грану издања, али још нису део стабилног издања                                         |
| `:main` / `:main-web`           | Грана `main`                                  | Променљив развојни показивач   | Само за развојно и интеграционо тестирање                                                                                             |

#### Добављачи веб-сесија: `-web` слике

Сваки горенаведени канал доступан је и као `-web` ознака (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), изграђена из фазе `runner-web` — иста слика уз Playwright и прегледач Chromium. Обична слика се испоручује **без** Chromium-а; `gemini-web`, `claude-web` и `claude-turnstile` га захтевају.

Грешка је одложена и не јавља се при покретању: ти добављачи наводе своје моделе и приказују се као повезани на контролној табли, а тек први захтев не успева уз поруку

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако користите те добављаче, преузмите `-web` ознаку канала који већ користите — ништа друго се не мења. Код npm/CLI инсталације (без Docker слике), одговарајући недостајући део је бинарна датотека прегледача: покрените `npx playwright install chromium` на домаћину.

#### Коришћење канала предиздања

Канал `next` се поново изграђује при сваком слању измена на тренутну подразумевану грану `release/v*` и објављује се и за AMD64 и за ARM64. Старије гране за одржавање не могу да га препишу. Канал обезбеђује слику која се може преузети за исправке спојене у активну грану издања пре него што се направи следећа стабилна ознака.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose, замените ознаку слике коју користи изабрани профил, а затим преузмите слику и поново направите сервис:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безбедност и враћање на претходну верзију

`next` је променљиви канал претходног издања. Може се променити при сваком слању измена на активну грану издања и **није подржан за употребу у продукцији**. Фиксирајте сажетак слике док процењујете одређену верзију:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Пре тестирања направите резервну копију OmniRoute волумена са подацима или директоријума са подацима монтираног помоћу повезивања. Да бисте се вратили на претходну верзију, вратите раније коришћену стабилну верзију или сажетак и поново направите контејнер:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Изградња из гране издања никада не може да помери `latest`; само одговарајућа стабилна семантичка верзија може да унапреди стабилни показивач. Слике `next` задржавају проверу слике издања и блокирајућу контролу за КРИТИЧНЕ рањивости.

**`latest` не гарантује актуелност у односу на git.** Спојене исправке на `main` или на активној грани `release/v*` **нису** у `:latest` све док се не објави слика са стабилном SemVer верзијом и задатак објављивања не унапреди `:latest` (исти сажетак као та SemVer верзија). Ако `latest` делује замрзнуто док GitHub већ приказује исправку, преузмите `:next` да бисте тестирали грану издања или сачекајте SemVer ознаку.

| Шта желите                                                               | Користите                               |
| ------------------------------------------------------------------------ | --------------------------------------- |
| GitOps / продукцију која не сме неочекивано да се мења                   | Фиксирајте `:X.Y.Z` (или сажетак слике) |
| Праћење објављених стабилних верзија уз поновно прављење за свако издање | `:latest`                               |
| Тестирање необјављених `release/v*` commit-а                             | `:next` (није за продукцију)            |
| Тестирање гране `main`                                                   | `:main` (није за продукцију)            |

## Ажурирања контролне табле у Docker-у

Контејнер покренут из објављене слике не може сам себе да замени. Када OmniRoute открије да се извршава унутар
контејнера (нема `.git` радног стабла и није npm инсталација), банер за ажурирање на почетној контролној табли приказује
команду коју треба покренути на хосту уместо npm/git упутстава, уз дугме за копирање:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Назив сервиса потиче из `AUTO_UPDATE_SERVICE` (подразумевано је `omniroute`, сервис у
`docker-compose.selfhost.yml`). `pull` помера само плутајућу ознаку (`latest`, `next`); ако користите фиксирану
ознаку `:X.Y.Z`, прво измените ознаку.

### Ажурирања једним кликом помоћу датотеке окидача на хосту

Да би **Ажурирај одмах** наставило да ради без монтирања `/var/run/docker.sock` (што контејнеру
даје root приступ хосту — погледајте упозорење за профил `cli` изнад), подесите `DOCKER_UPDATE_TRIGGER_FILE` у
OmniRoute сервису и покрените надзорни процес на хосту:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Путања мора бити унутар `DATA_DIR` (релативне вредности се разрешавају у односу на њега); све остало се
одбија. **Ажурирај одмах** затим уписује `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` у ту
датотеку, одговара статусом `202`, а контролна табла периодично проверава `/api/system/version` док нова верзија не постане активна,
након чега се поново учитава. OmniRoute у овом режиму никада не покреће shell или Docker команду. Као и код сваке радње
ажурирања, захтев се прихвата само од loopback/LAN клијената.

Директоријум података монтиран помоћу bind mount-а обезбеђује хосту стабилну путању за надзор. Примери `systemd` јединица
(прилагодите `/srv/omniroute` директоријуму који садржи вашу compose датотеку и `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Надгледање OmniRoute захтева за ажурирање са контролне табле

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Преузимање и поновно креирање OmniRoute контејнера

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

Сервис уклања захтев пре преузимања како неуспешно покретање не би направило петљу. Без
`DOCKER_UPDATE_TRIGGER_FILE` контролна табла задржава ручни ток извршавања команде.

## Доступност: подразумевани SQLite подржава једну реплику

Стандардни Docker / Kubernetes OmniRoute је **један Node процес + један SQLite процес за уписивање**. Висока доступност **није подржана** у тој топологији.

| Ограничење                                                | Последица                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Један процес за уписивање                                 | **Немојте** покретати више реплика над истом SQLite датотеком. То оштећује базу података.                                                                                                                                                                                                                                                       |
| Поновно креирање / поновно покретање / HEALTHCHECK прекид | **Потпуни прекид рада** активних SSE токова, сесија контролне табле и стања у меморији. Сваки повезани клијент губи везу. Нови захтеви током периода без доступне крајње тачке добијају од обрнутог проксија одговор **`502 Bad Gateway: Unknown error`**, а не OmniRoute JSON — клијенти то не могу да разликују од отказа добављача (#11015). |
| Иста петља догађаја као `/healthz`                        | Заузет циклус каталога или компресије може да одложи провере; кратко временско ограничење тада поново покреће **једину** реплику.                                                                                                                                                                                                               |

**Матрица провера** (погледајте и [препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Провера            | Циљ                                                                     | Немојте користити                                                               |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Провера активности | TCP на `PORT` (подразумевано `20128`) или блага HTTP провера `/healthz` | `/api/monitoring/health`                                                        |
| Провера спремности | HTTP `GET /healthz`                                                     | Кратка временска ограничења која заузету петљу догађаја третирају као неактивну |
| Дубинска / за људе | `/api/monitoring/health`                                                | Аутоматизовану kubelet проверу активности                                       |

**Надоградње:** очекујте прекид сваке сесије. Ако можете, сачекајте да клијенти заврше рад; са подразумеваним SQLite-ом нема постепеног ажурирања. Compose `restart: unless-stopped` заједно са Docker `HEALTHCHECK`-ом такође ће заменити једини процес када контејнер постане Unhealthy — са истим обимом последица.

Kubernetes исечак за **једну реплику** (Recreate је обавезан; немојте повећавати `replicas` када се користи једна SQLite датотека):

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

Пауза `preStop` омогућава Kubernetes-у да уклони Service крајње тачке пре SIGTERM-а, тако да **нови** саобраћај престане да стиже до процеса који се гаси. Активни `/v1/responses` SSE захтеви се довршавају у року до `SHUTDOWN_TIMEOUT_MS` (подразумевано 30 s) путем проширених закупа за контролу приступа (#11015). Нови захтеви који ипак стигну до процеса добијају `503` + `Retry-After: 5`. Празнина без крајњих тачака при стратегији Recreate, све док замена не постане Ready, и даље представља потпуни прекид рада — то је последица SQLite топологије, а не погрешног подешавања сонде.

Спољни Postgres / HA са више уписивача **није** документовани стандардни начин рада. Ако вам је потребан HA, задржите једну реплику или користите топологију коју је пројекат засебно тестирао и документовао. Рад на подршци за Postgres/MySQL прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Док то не буде објављено, једини подржани начин за повећање капацитета за **велике** `/v1/responses` захтеве јесте N независних процеса (следећи одељак), а не `replicas > 1` на једном волумену.

## Хоризонтално скалирање: N независних процеса

Један Node процес представља **један V8 heap**. Два преклапајућа захтева агента за кодирање `POST /v1/responses` од ~3 MiB / ~750k токена (RTK + Caveman) обарају тај heap на ~12 Gi (`FATAL ERROR: Reached heap limit`) и могу изазвати OOM у cgroup-у од 16 Gi. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). То мерење је упозорење о **меморијском буџету**, а не строго максимално ограничење производа на два истовремена дуготрајна `/v1/responses` захтева. Пријем захтевних chat захтева ограничен је аутоматски изведеним буџетом бајтова за улазне податке (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), димензионисаним на основу истог ограничења V8/cgroup-а — повећавање те вредности (или постављање застарелог ограничења броја захтева `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) на већ димензионисаном процесу поново доводи до обарања. Мали chat захтеви, `/healthz`, `/v1/models` и MCP **нису** обухваћени тим ограничењем.

### Један процес: више од два дуготрајна `/v1/responses` захтева

**Здрав** процес (heap испод `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, подразумевано `0.75`) **може** да извршава више од два истовремена дуготрајна `POST /v1/responses` захтева када у буџету бајтова активних захтева на нивоу процеса (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) и даље има простора. Тела величине једнаке или веће од `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (подразумевано 256 KiB) заузимају исту резервисану јединицу за захтевне операције као и структурно захтевни захтеви и користе исти [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) механизам излаза `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетине истовремених дуготрајних SSE клијената (оператерима је често потребно 40–50) представљају питање **меморијског буџета** — димензионишите heap + примарна/резервна места + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — а не строго ограничење производа на „највише 2“. Процес чији је heap под оптерећењем и даље одбацује захтеве уз поновљиви `503`, како се проблем #7849 не би поновио.

Да бисте **умножили heap-ове** (независне V8 old-space меморијске просторе) **данас**:

| Урадите                                                                                                                                                                                                        | Немојте                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Покрените **N контејнера/pod-ова**, сваки са **сопственим** `DATA_DIR` / волуменом                                                                                                                             | Постављати `replicas > 1` над једном SQLite датотеком                    |
| Димензионишите захтевне активне захтеве + здраву резерву на основу heap-а / буџета бајтова активних захтева; 1–2 је конзервативна подразумевана вредност из #7849, а не строго максимално ограничење производа | Дати једном процесу 8× више RAM-а и неограничено ограничење броја        |
| Опционо: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за **дељене бројаче квота**                                                                                                                      | Третирати Redis као дељени SQLite — он то није                           |
| Копирајте тајне провајдера у сваку инстанцу (или прихватите раздвојене контролне табле)                                                                                                                        | Очекивати једну контролну таблу / један дневник позива за све инстанце   |
| Поставите било који балансер оптерећења испред њих; лепљивост по API кључу или сесији је довољна                                                                                                               | Захтевати middleware специфичан за добављача који узима у обзир величину |

Хардвер: број истовремених дуготрајних `/v1/responses` захтева по инстанци представља питање **меморијског буџета** (heap + бајтови активних захтева / #10110). `N` независних `DATA_DIR` директоријума и даље умножава heap-ове: RAM хоста мора да покрије `N × cgroup`, а не „један pod од 16 Gi са N=8“. Никада немојте користити `replicas > 1` над једном SQLite датотеком.

Пример Compose конфигурације (два heap-а, два волумена — не `deploy.replicas: 2`):

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

Густина унутар процеса (компресија ван HTTP isolate-а) прати се у [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Један логички кластер над дељеним трајним стањем прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini регионалне грешке унутар Docker-а

Google AI Studio / Gemini API може да врати HTTP 400 са FAILED_PRECONDITION и
`User location is not supported for the API use.` Успешан захтев на хосту
не доказује да контејнер користи исту излазну руту. Редослед DNS резултата,
IPv4/IPv6 повезивост, VPN рутирање и подешени проксији могу да се разликују. Проверите
[регије које Google подржава](https://ai.google.dev/gemini-api/docs/available-regions),
као и стварну руту везе; ова грешка сама по себи не указује на неисправан API кључ.

### Дајте предност проксију специфичном за везу

Користите OmniRoute-ово [подешавање проксија по вези](../ops/PROXY_GUIDE.md#4-level-proxy-system)
за погођену Gemini везу, а затим поновите **Тестирај везу** и мали захтев
са истим моделом. Тиме се промена рутирања ограничава на ту везу. Проверите
да ли је прокси доступан из контејнера и да ли га веза заиста бира.
Промена руте не гарантује регионалну подобност на страни узводног сервиса.

### Упоредите умрежавање хоста и контејнера

При поређењу аутентификованих резултата користите исти кључ, модел и захтев; никада
не уносите акредитиве, лозинке за прокси или комплетна заглавља за ауторизацију у пријаву проблема.
Најпре проверите које породице адреса нуди OS разрешивач, користећи исту команду
на хосту и унутар контејнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Замените `omniroute` сервисом који покрећете (на пример, `omniroute-web`). Ове
команде приказују породице адреса без акредитива или IP адреса. Враћена вредност `6`
показује само IPv6 DNS резултат: она **не** доказује постојање употребљиве IPv6 руте нити приступ API-ју.
Тамо где је `curl` инсталиран, упоредите `curl -4 -I https://generativelanguage.googleapis.com`
са `curl -6 -I https://generativelanguage.googleapis.com` у оба окружења.
HTTP одговор доказује повезивост за ту проверу, чак и ако је у питању грешка
неаутентификованог захтева; само аутентификовани захтев моделу проверава подобност за Gemini.

### Алтернатива на нивоу хоста: функционалан IPv6 и политика разрешивача

Пријавилац проблема [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) поново је успоставио
приступ у свом окружењу омогућавањем IPv6 подршке за контејнере и променом glibc избора адреса.
Сматрајте ово алтернативом специфичном за окружење. Потврдите да IPv6 на хосту функционише,
да излазни саобраћај и рутирање контејнера раде и да су правила заштитног зида одговарајућа
пре прилагођавања поставки разрешивача.
Приватна ULA адреса сама по себи не доказује јавну IPv6 повезивост.

За сервисе који су већ повезани са подразумеваном Compose мрежом, овај фрагмент омогућава
IPv6 на тој мрежи; задржите остатак конфигурације сервиса, портове, волумене и подешавања:

```yaml
networks:
  default:
    enable_ipv6: true
```

За именовану мрежу, омогућите га на мрежи са којом се сервис заиста повезује. Docker може
да додели ULA подмрежу; изаберите изричито наведену подмрежу која се не преклапа само када то ваша мрежа
захтева. Погледајте [Docker IPv6 умрежавање](https://docs.docker.com/engine/daemon/ipv6/)
и [опције Compose мреже](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

На **слици заснованој на glibc-у**, `/etc/gai.conf` може да промени избор адресе. Dockerfile
у тренутном репозиторијуму користи Debian; прилагођене слике засноване на musl-у не користе овај механизам.
Пријављена измена мења ULA ознаку са `label fc00::/7 6` на
`label fc00::/7 1`. Почните од комплетне табеле политика у слици и сачувајте њене остале
ставке: додавање ставке `label` или `precedence` замењује ту подразумевану табелу, тако да датотека
која садржи само измењени ред није довољна.
[glibc референца за конфигурацију](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
документује ту семантику. Монтирајте прегледану датотеку као bind mount само за читање на `/etc/gai.conf`
и поново креирајте сервис да бисте применили измену.

Ово мења OS избор адреса за **сав излазни саобраћај у том контејнеру**.
Не приморава сваку апликацију да изабере IPv6: редослед Node DNS резултата и избор
везе такође су важни. Конкретно, `--dns-result-order=ipv4first` даје предност IPv4 протоколу и
није решење за проблем који се јавља само преко IPv4. Погледајте [Node DNS редослед](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Поново тестирајте Gemini и остале добављаче након сваке промене на нивоу хоста. Да бисте вратили
претходно стање, уклоните прилагођени `gai.conf` mount, вратите претходну мрежну конфигурацију и
поново креирајте погођени сервис/мрежу током планираног периода одржавања. Поновно креирање мреже
може да прекине рад других контејнера повезаних са њом; немојте брисати волумен са трајним подацима.

## Важне напомене

- **SQLite WAL режим:** Треба омогућити да се `docker stop` заврши како би OmniRoute могао да упише најновије измене из контролне тачке назад у `storage.sqlite`. Приложене Compose датотеке већ постављају период мировања од 40 секунди за заустављање. Ако директно покрећете слику, задржите `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Поставите на `true` ако се рутинским резервним копијама и резервним копијама пре уписивања управља споља. Миграције постојеће базе података и даље захтевају сопствени трајни безбедносни снимак и заштиту од масовне миграције.
- **Трајност података:** Увек монтирајте волумен на `/app/data` како бисте сачували базу података, кључеве и конфигурације након поновних покретања контејнера.
- **Конфигурација порта:** Замените вредност променљиве окружења `PORT` да бисте променили подразумевани порт `20128`.

## Погледајте и

- [Водич за постављање на VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Подешавање VM-а, nginx-а и Cloudflare-а
- [Водич за постављање на Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Постављање на Fly.io
- [Конфигурација окружења](../reference/ENVIRONMENT.md) — Комплетна референца за `.env`
