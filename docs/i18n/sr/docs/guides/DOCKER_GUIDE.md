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

## Куицк Рун

> **Селф-хост у једној команди?** Погледајте [Водич за само-хост](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (објављена слика + Redis, само повратна петља, без избора профила). Брзи рад испод је пут са једним контејнером за кориснике који већ покрећу Redis негде другде.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Са датотеком окружења

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

## Доцкерфиле Стагес

Репозиторијум шаље вишестепени Доцкерфиле (`Dockerfile`). Изложене су четири фазе; изаберите прави `target` за ваш случај употребе.

| Стаге         | Основна слика         | Сврха                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Инсталира депс (`npm ci --legacy-peer-deps`) и покреће `npm run build` (Turbopack подразумевано — види ресурсе за време изградње испод)                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Време извођења производње са самосталним излазом Next.js.** Нема провајдера CLIs у пакету.**                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Додаје `git`, `docker.io`, `docker-compose` и глобални CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Изаберите ово за агентске токове посла.**                                                                                                    |
| `runner-web`  | `runner-base`         | Додаје Playwright + Цхромиум прегледач (`--with-deps`) за добављаче веб сесија: `gemini-web`, `claude-web`, `claude-turnstile`.** Изаберите ово када користите те провајдере** — обична слика не успева у време захтева без ње (погледајте `-web` напомену под Канали издања). |

Ручно направите одређени циљ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси за време изградње

Три аргумента за изградњу контролишу колико кошта `builder` фаза. Они су само за време изградње. — `OMNIROUTE_MEMORY_MB` (испод) је засебно дугме за време извођења.

| Буилд арг                   | Подразумевано | Ефекат                                                                                           |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` гради са веб пакетом: нижа вршна меморија, спорија. `1` се одлучује за Turbopack.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | В8 горња граница (`--max-old-space-size`) за настали `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Феедс `CIRCLE_NODE_TOTAL`; Следеће изводи `workers = N - 1` за прикупљање података о страницама. |

`OMNIROUTE_BUILD_WORKERS` је онај који треба да подигне на великог градитеља и онај за кога се сумња када ограничена грађа умре** после** `✓ Compiled successfully`. Сваки радник са подацима о страници је сопствени процес, као и сам родитељ `next build` ; жива VPS репродукција (проблем #7518) мерила је врх RSS сваког процеса на ~ 4,5 GB независно од `NODE_OPTIONS` хеап заставице (Turbopack се компилира у native/Rust меморији изван В8 гомиле). Подразумевана величина `2` (→ 1 радник, укупно 2 процеса) је величине за 16 GB / 4 vCPU покретача хостованих на ГитХуб-у које користи цевовод за објављивање. На `8` (→ 7 радника) том покретачу је понестало меморије и буилдкит није успео у кораку са `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 радника) и даље се није уклапао када је RSS по процесу измерен директно уместо да се закључи. `tests/unit/docker-build-memory-budget.test.ts` врши аритметику у односу на измерену цифру и не успева ако било које дугме прерасте тркач.

Turbopack компилира у изворну Руст меморију која живи** споља** В8 гомилу, тако да га `OMNIROUTE_BUILD_MEMORY_MB` не везује. На хосту са плафоном меморије, буилд се тада SIGKILLed од стране OOM убице без икаквог текста грешке — једноставно се зауставља у средини `Creating an optimized production build`, што се чита као ханг, а не као недостатак меморије. Зато је `Dockerfile` подразумевано постављен на вебпацк (`OMNIROUTE_USE_TURBOPACK=0`), за разлику од `npm run dev` / `npm run build`, где је Turbopack подразумевани код: голи `docker build .` без аргова за изградњу (оно што железница и други хостови једним кликом покрећу) не сме тихо да умре на градилишту ограниченом меморијом. Објављене слике већ експлицитно пролазе `OMNIROUTE_USE_TURBOPACK=0` у `docker-publish.yml`. На буилдеру са доста RAM, изаберите Turbopack за бржу градњу:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` је омогућен, тако да `next build` покреће родитељ** и** раднички процес и сваки посебно поштује `OMNIROUTE_BUILD_MEMORY_MB`. Димензионирајте плафон контејнера изнад отприлике двоструко веће вредности, а не једном.

Измерено на овом стаблу (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Бундлер   | Плафон контејнера | Резултат                               |
| --------- | ----------------- | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | ООМ-убио на оба, тихо                  |
| вебпацк   | 8 GiB             | градити радник SIGKILLed               |
| вебпацк   | 12 GiB            | успео, достигао је врхунац на 11,1 GiB |

### Рунтиме дефаултс

Подразумеване вредности које извози `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Понашање меморије у Docker:

- Слика поставља `OMNIROUTE_MEMORY_MB=1024` и из ње изводи `NODE_OPTIONS=--max-old-space-size=1024`.
- Стварни процес сервера покреће самостални покретач, који чита `OMNIROUTE_MEMORY_MB` и додаје `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Чвор користи последњу поновљену `--max-old-space-size` вредност, тако да подешавање `OMNIROUTE_MEMORY_MB` контролише ефективно Docker ограничење гомиле.
- Пошто га слика увек поставља, резервни лансер калибрисан у РАМ-у никада се не примењује под Docker. Експлицитно га повећајте за радно оптерећење (табела испод). `2048` је и даље премали за агента за кодирање `/v1/responses`.

### Рунтиме RAM за агенте за кодирање

Подразумевана вредност 1 GiB Docker је dashboard/light-chat спрат, а не величина производње. Дуга `POST /v1/responses` тела (стотине порука, десетине алата) задржавају више графова у меморији током компресије. Два преклапајућа захтева за ~ 3 MiB / ~ 750к токена прекинула су В8 у** 12 GiB** олд-спаце (`FATAL ERROR: Reached heap limit`) и такође погодио 16 GiB цгроуп OOM. Види [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Величина** цгроуп `--memory` изнад гомиле** — изворни бафери, SQLite и међупродукти компресије налазе се изван В8.

| Оптерећење посла                            | `OMNIROUTE_MEMORY_MB`        | Контејнер / цгроуп   | Напомене                                                                                   |
| ------------------------------------------- | ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------ |
| Контролна табла, једно светло ћаскање       | `1024` (подразумевана слика) | ≥2 GiB               |                                                                                            |
| Један агент за кодирање (Claude/Codex/Grok) | `8192`                       | ≥10 GiB              | Типична `/v1/responses` за једну сесију                                                    |
| Два истовремена дуга `/v1/responses`        | `10240`–`12288`              | ≥12–16 GiB           | Измерено прекидање В8 на ~ 12 GiB хрпи                                                     |
| Три + истовремена дуга контекста            | не на једном процесу         | сериализе / море RAM | Подразумевани пријем у тешкој категорији је 1 у лету; подизање без RAM поново уводи прекид |

`omniroute serve` на голом металу калибрише ~ 35% RAM (затегнуто `[512, 4096]`) када је `OMNIROUTE_MEMORY_MB`** унсет** . Docker увек поставља `1024`, тако да се калибрација никада не изводи у званичној слици.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Обрнути прокси на подпутању (Траефик / нгинк)

Next.js `basePath` се компајлира у самостални пакет. OmniRoute бележи печену вредност у датотеци стражара у корену апликације (написано током `npm run build`; чита `scripts/docker/ensure-docker-base-path.mjs`) и упоређује је са `OMNIROUTE_BASE_PATH` када се контејнер покрене. Када се разликују и слика је направљена за корен домена, улазна тачка преписује самосталне манифесте, уграђене `basePath`/`assetPrefix` литерале (Следећих 16 приказује SSR средство URLs само од `assetPrefix` — пачер одражава подпуту у њега), печену `/_next/static` ассет-референтну страницу грешку у вези са увезивањем URLs (претходно манифестује грешку зкм ассет-а зкнц) а клијент `process.env` схим пре него што се `node dev/run-standalone.mjs` покрене.

### Цомпосе буилд (препоручено)

Поставите обе променљиве у `.env`, а затим поново направите тако да се слика и време извршавања слажу:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` прослеђује `OMNIROUTE_BASE_PATH` као Docker буилд-арг и као променљиву окружења за извршавање.

### Унапред изграђена основна слика + рунтиме субпатх

Објављене `cheaperinference/omniroute:*` слике су направљене за корен домена. Још увек можете подесити `OMNIROUTE_BASE_PATH` у току рада; контејнер закрпи пакет једном приликом покретања. Упарите га са одговарајућим јавним пореклом:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Конфигуришите обрнути прокси да прослеђује** пуна** спољни пут (не уклањајте префикс). Траефик треба да усмери `PathPrefix(`/омнироуте `)` до контејнера без `StripPrefix`, тако да Next.js прима `/omniroute/...` и опслужује средства од `/omniroute/_next/...`.

Docker Хеалтхцхецк испитује лагану крајњу тачку животног циклуса `/healthz` са префиксом активног `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остаје доступан за human/dashboard дијагностику; да бисте контејнер HEALTHCHECK усмерили назад на њега (на пример за дубоко спровођење здравствене заштите), поставите `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Тај пут је а** дубоко** провери ( резиме праћења DB + ) — прикладно за Docker-ов ретки `HEALTHCHECK` ако се поново укључиш, али** не** за Кубернетес `livenessProbe` интервале.

За оркестраторе (Кубернетес, Номад, итд.):

| Сонда                | Префер                                                                      | Избегавајте                                                       |
| -------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Живост               | HTTP `GET /livez`, или TCP на главном порту (`PORT`, подразумевани `20128`) | `/api/monitoring/health` као живост                               |
| Спремност            | HTTP `GET /healthz`                                                         | Кратки тајмаути који третирају заузетост петље догађаја као мртву |
| Дубоко / црна кутија | `/api/monitoring/health`                                                    | —                                                                 |

`/healthz` извештава о животном циклусу процеса (`ok` / `starting` / `stopping`). `/livez` је само процес који је активан (200 кад год руковалац може да се покрене; не чека на спремност). Оба и даље раде у истој петљи догађаја чвора као и руковање захтевима, тако да рад на каталогу или компресији везан за процесор може да их одложи — заузетим ≠ мртвим. Радије TCP живост ако HTTP сонде истекне. Пуно навођење сонде: [Водич за надгледање — Препоруке за Кубернетес сонду](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Цомпосе витх Цадди (HTTPS Ауто-ТЛС)

OmniRoute може бити безбедно изложен коришћењем Цадди-јевог аутоматског обезбеђивања SSL. Уверите се DNS А запис вашег домена указује на IP вашег сервера.

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

Цадди поставља стандардна заглавља за прослеђивање за горњи контејнер. OmniRoute користи `NEXT_PUBLIC_BASE_URL` као канонско јавно порекло за OAuth повратне позиве и генерисане јавне везе; аутентификовани записи на контролној табли користе захтеве истог порекла плус CSRF заштиту везану за сесију. Омогућите `OMNIROUTE_TRUST_PROXY` само за напредне примене где намерно желите да OmniRoute изведе јавно порекло из поузданих прослеђених заглавља уместо експлицитне конфигурације.

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

## Имаге Тагс

| Слика                        | Таг      | Величина | Опис                                                  |
| ---------------------------- | -------- | -------- | ----------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250МБ  | Највиша** објављено** стабилан SemVer (не гит `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250МБ  | Закачите ову класу ознаке за GitOps                   |

Исте слике се објављују у три спремишта, са истим прегледима по архитектури: `cheaperinference/omniroute` (Docker Хуб, Цхеапер Инференце организација, од 3.8.53 надаље), `ghcr.io/cheaper-inference/omniroute` и застарели `diegosouzapw/omniroute`, који чува своју историју повлачења и још увек прима свако издање. Постојећа `diegosouzapw/omniroute` имплементација се стално ажурира; промена имена слике је опциона. `:next` / `:next-web` канал пре издања испод је објављен само за `diegosouzapw/omniroute` и GHCR.

Манифест на више платформи: изворни `linux/amd64` + `linux/arm64` (Аппле Силицон, AWS Гравитон, Распберри Пи). Docker аутоматски бира одговарајућу архитектуру; пренесите `--platform linux/amd64` ако треба да форсирате AMD64 емулацију на ARM хостовима.

### Релеасе Цханнелс

OmniRoute објављује засебне Docker канале за стабилна издања, активно тестирање гране издања и развојне верзије.

| Канал                           | Извор                                     | Променљивост                    | Препоручена употреба                                                                                                       |
| ------------------------------- | ----------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned релеасе                  | Непроменљиво                    | Продукцијска имплементација која закачи тачно издање                                                                       |
| `:latest` / `:latest-web`       | Највиша** објављено** стабилна SemVer     | Променљив стабилан показивач    | Прати стабилна издања** после** посао SemVer публисх — обавља** не** пратити `main` или необјављена `release/v*` урезивања |
| `:next` / `:next-web`           | Тренутна подразумевана `release/v*` грана | Променљиви показивач пре издања | Тестирање поправки које су стигле на грану активног издања, али још увек нису у стабилном издању                           |
| `:main` / `:main-web`           | `main` бранцх                             | Променљиви показивач развоја    | Само тестирање развоја и интеграције                                                                                       |

#### Провајдери веб сесија: `-web` слике

Сваки канал изнад се удвостручује као `-web` ознака (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), направљена од `runner-web` фазе — исте слике плус Playwright и Цхромиум претраживач. Обична слика се шаље** без** Цхромиум; `gemini-web`, `claude-web` и `claude-turnstile` треба.

Грешка је одложена, а не време покретања: ти добављачи наводе своје моделе и приказују их као повезане на контролној табли, а само први захтев не успе са

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако користите те провајдере, повуците `-web` ознаку канала на којем се већ налазите — ништа друго се не мења. На npm/CLI инсталацији (без Docker слике), еквивалентни део који недостаје је бинарни претраживач: покрените `npx playwright install chromium` на хосту.

#### Коришћење канала пре издања

`next` канал се поново гради при сваком гурању на тренутну подразумевану `release/v*` грану и објављује се и за AMD64 и ARM64. Старије огранке за одржавање не могу да га замене. Канал пружа слику која се може повући за поправке које су се спојиле у грану активног ослобађања пре него што се исече следећа стабилна ознака.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Цомпосе, замените ознаку слике коју користи изабрани профил, а затим повуците и поново креирајте услугу:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Сигурност и враћање уназад

`next` је плутајући канал пре издања. Може се променити при било ком гурању на грану активног издања и јесте** није подржано за употребу у производњи** . Закачите сажетак слике док процењујете одређену верзију:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Пре тестирања, направите резервну копију волумена података OmniRoute или директоријума података монтираног на везу. Да бисте вратили назад, вратите претходно коришћену стабилну верзију или прегледајте и поново креирајте контејнер:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Грана издања никада не може да помери `latest`; само прихватљива стабилна семантичка верзија може промовисати стабилни показивач. `next` слике задржавају инспекцију слике ослобађања и блокирају капију КРИТИЧНЕ рањивости.

**`latest` није валутна гаранција за гит.** Спојене поправке на `main` или на активној `release/v*` грани су** не** у `:latest` док се не објави стабилна SemVer слика и посао објављивања промовише `:latest` (исти сажетак као и SemVer). Ако `latest` изгледа замрзнуто док GitHub већ показује исправку, повуците `:next` да бисте тестирали грану за ослобађање или сачекајте SemVer ознаку.

| Ви желите                                                              | Користите                             |
| ---------------------------------------------------------------------- | ------------------------------------- |
| GitOps / производња која не сме да дрифта                              | Закачите `:X.Y.Z` (или сажетак слике) |
| Пратите објављене штале и прихватите поновно креирање на сваком издању | `:latest`                             |
| Тестирајте необјављена `release/v*` урезивања                          | `:next` (није производња)             |
| Тест `main`                                                            | `:main` (није производња)             |

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

## Доступност: подразумевана SQLite је једна реплика

Стоцк Docker / Кубернетес OmniRoute је** један Чвор процес + један SQLite писац** . Висока доступност је** није подржано** на тој топологији.

| Ограничење                            | Последица                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Сингле вритер                         | Уради** не** покрените више реплика на исту SQLite датотеку. То квари DB.                                                                                                                                                                                                                                |
| Рецреате / рестарт / HEALTHCHECK килл | **Пун прекид** SSE-а у лету, сесија контролне табле и стања у меморији. Сваки повезани клијент пада. Нови захтеви током прозора празне крајње тачке добијају обрнути прокси**`502 Bad Gateway: Unknown error`** , а не OmniRoute JSON — клијенти не могу да разликују ово од грешке провајдера (#11015). |
| Иста петља догађаја као `/healthz`    | Заузет каталог или компресија може да одложи сонде; кратко време, а затим поново покреће** само** реплика.                                                                                                                                                                                               |

**Матрица сонде** (погледајте и [препоруке Кубернетес сонде](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Сонда         | Таргет                                                          | Немојте користити                                                 |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| Живост        | TCP на `PORT` (подразумевано `20128`), или меки HTTP `/healthz` | `/api/monitoring/health`                                          |
| Спремност     | HTTP `GET /healthz`                                             | Кратки тајмаути који третирају заузетост петље догађаја као мртву |
| Дубоко / људи | `/api/monitoring/health`                                        | Аутоматизована живост кубелета                                    |

**Надоградње:** очекујте да свака сесија падне. Испразните клијенте ако можете; нема текућег ажурирања за подразумевани SQLite. Цомпосе `restart: unless-stopped` плус Docker `HEALTHCHECK` ће такође заменити једини процес када је контејнер Нездрав — исти радијус експлозије.

Готови манифести и Хелм графикон живе у `deploy/kubernetes/` и `deploy/helm/omniroute/` — погледајте [водич за примену Кубернетеса](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Кубернетес исечак за а** појединачна реплика** (Поновно креирање је потребно; немојте подизати `replicas` у односу на једну SQLite датотеку):

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

`preStop` слееп омогућава кубе-у да испусти крајње тачке услуге пре SIGTERM а** ново** саобраћај престаје да погађа процес умирања. `/v1/responses` SSE током лета се исцрпљује до `SHUTDOWN_TIMEOUT_MS` (подразумевано 30с) путем закупа за примање тешке категорије (#11015). Нови захтеви који и даље стигну до процеса добијају `503` + `Retry-After: 5`. Поново креирање празнине крајње тачке док замена не буде спремна остаје тежак прекид — то је SQLite топологија, а не погрешна конфигурација сонде.

Екстерни Postgres / мулти-вритер HA је** не** документовани пут залиха. Ако вам је потребан HA, задржите једну реплику или покрените топологију коју је пројекат тестирао и посебно документовао. Postgres/MySQL рад живи у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Док се то не испоручи, једини подржани начин множења** велики** `/v1/responses` капацитет је Н независних процеса (следећи одељак), а не `replicas > 1` на једном волумену.

## Сцале-оут: Н независних процеса

### власништво ротације Codex токена

Копије једног Codex налога не смеју самостално да троше његов токен за једнократну употребу. На инстанцама које користе само синхронизоване акредитиве, поставите `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (алиас `cx`). Оставите га неподешеним на власнику једне ротације. Сваки процес и даље треба свој `DATA_DIR`; ова опција не дели SQLite нити обезбеђује синхронизацију токена или дистрибуирано закључавање.

Пасивна инстанца поново чита везу када је потребно освежавање и усваја само другачији, токен приступа који није истекао. У супротном, освежавање је онемогућено без истека или деактивације везе или рачунања грешке прекидача освежавања. Прави кварови узводне аутентификације и даље користе нормално обрачунавање грешака, експоненцијално хлађење и нормалну грешку клијента; деактивација налога остаје трајно. Синхронизујте власникове ротиране токене пре истека токена приступа (подразумевано проактивно освежавање је пет минута) или поново увезите Codex аутх датотеку. Пасивни увози чувају испоручене токене без њихове валидације на крајњој тачки токена. Ручно освежавање dashboard/API враћа `409 refresh_disabled`; нове OAuth пријаве су непромењене. Погледајте [референцу за окружење](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Процес једног чвора је** једна В8 гомила** . Два преклапања агента за кодирање ~ 3 MiB / ~ 750к токена `POST /v1/responses` (RTK + Цавеман) прекидају ту хрпу на ~ 12 Ги (`FATAL ERROR: Reached heap limit`) и могу OOM цгрупу од 16 Ги. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). То мерење је а** меморија-буџет** упозорење, није производ хард-мак два истовремена дуга `/v1/responses`. Прихватање у ћаскању тешке категорије је ограничено аутоматски изведеним буџетом за унос бајтова (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) величине тог истог V8/cgroup плафона — који га надјачава (или поставља застарело `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ограничење броја захтева) на процесу већ величине поново уводи прекид. Мала ћаскања, `/healthz`, `/v1/models` и MCP су** не** у тој капи.

### Један процес: више од два дуга `/v1/responses`

А** здраво** процес (гомила испод `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, подразумевани `0.75`)** маја** покрените више од два истовремена дуга `POST /v1/responses` када буџет у бајтовима за читав процес (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) још увек има места. Тела на или изнад `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (подразумевано 256 KiB) узимају исти закуп тешке категорије као захтеви са тешким структуром и користе исти [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` есцапе (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетине истовремених дугих SSE клијената (оператерима је често потребно 40–50) је а** меморија-буџет** питање — величина гомиле + primary/headroom слотови + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — није тврдо ограничење производа „мак 2“. Притиснута гомила се и даље одбацује са `503` који се може поново покушати, тако да се #7849 не враћа.

То** множи гомиле** (независни В8 стари размаци)** данас** :

| Уради                                                                                                                                                     | немој                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Трчи** Н containers/pods** , сваки са својим** сопствени** `DATA_DIR` / волумен                                                                           | Поставите `replicas > 1` на једну SQLite датотеку                                        |
| Величина тешка у лету + Хеалтх-Хеадроом из хеап / инфлигхт-бите буџета; 1–2 је конзервативна подразумевана вредност #7849, а не максимални тврди производ | Дајте једном процесу 8 × RAM и неограничено ограничење бројања                           |
| Опционо: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` фор** заједничких бројача квота**                                                           | Третирајте Redis као заједнички SQLite — то није                                         |
| Дуплирајте тајне добављача у сваку инстанцу (или прихватите партициониране контролне табле)                                                               | Очекујте једну контролну таблу / једну евиденцију позива на свим инстанцама              |
| Предња са било којим балансом оптерећења; довољно је стицки би API кеи или сессион                                                                        | Захтевајте међуверски програм који је специфичан за произвођача који је свестан величине |

Афинитет између сесије и налога се такође може делити преко Redis: поставите `OMNIROUTE_SESSION_AFFINITY_STORE=redis` и `REDIS_URL` за сваки процес, са истим `REDIS_KEY_PREFIX` и позитивним `sessionAffinityTtlMs` поставком. Пинови решавају хеширане идентитете налога за коришћење у одговарајућу локалну везу сваког процеса, тако да OAuth налози са одговарајућим метаподацима идентитета не морају да имају одговарајућу везу IDs. Познати идентитети налога имају предност над контрадикторним локалним IDs у резолуцији пинова и заштићеном избацивању; записи без идентитета (или позиваоци за деложацију без идентитета) задржавају стари ID чувар. Налози без стабилног идентитета коришћења и даље захтевају подударање IDs. Redis грешке или позиви дужи од 100 мс враћају се на локални SQLite. Свака Redis продавница афинитета ограничава неизвршене операције на 8, заобилази Redis одмах када је пуна и ослобађа места само када се основни посао слегне, а не у крајњем року позиваоца. Током Redis нестанка нема заједничке истине: свака инстанца се враћа на свој локални афинитет, сесије се могу поново закачити једном по инстанци, а инстанце се могу разликовати. Лепљивост се поново конвергира кроз Redis када се опорави. Временско ограничење ограничава чекање, а не послани EVAL, који може слетети после резервног. Уписи о рутирању упоређују тачну вредност која је примећена одлуком о рутирању, а не читање свежег времена мутације; уочени промашај или SQLite резервно посматрање упоређује се као одсутан Redis кључ. Застарели пинови се замењују у једном CAS, тако да касна команда не може заменити или избрисати новији, другачији пин. Redis чита атомски враћа вредност и преостали сервер TTL; позитиван PTTL (или без истека) одређује животност, а не JSON временска ознака писца или сат читаоца. Локални снимци мапирају преостали TTL у локални рок; постојећи JSON кључеви остају читљиви и њихови необрађени бајтови се задржавају за CAS. Redis је једини извор истине док одговара. Потврђени дељени додаци, додири и брисања уклањају локални унос, никада га не инсталирајте или освежите. SQLite на Redis путањи садржи само резервне одлуке ове инстанце од Redis грешака, тајм-аута или засићења пријема, ТТЛ-ограничено као и раније. Локални пин који недостаје у каснијем прекиду кошта један нови избор (један промашај промпт-кеша), а не погрешан или избачен налог. Одбијени упсерти враћају заједничког победника и његов преостали TTL атомски: обична селекција поново проверава мапирани локални рок и користи још живог квалификованог победника, додирујући коришћење и евидентирање за тај налог без другог заједничког писања. Ако је недоступан, избор задржава локалног кандидата, оставља дељени пин непромењен и емитује једну поруку за отклањање грешака. Одбијен CAS не пише SQLite; Redis грешке, временска ограничења или засићење пријема уместо њих примењују постојећу локалну операцију. Ако одговор послате мутације стигне након истека (прихваћено, одбијено или грешка), синхроно тачно упоређивање и брисање серијализованих вредности уклања само резервни ред за временско ограничење идентичан бајту. Између тог поређења и брисања нема чекања; сачуван је новији запис о прекиду. Заштићено избацивање уклања сопствени локални пин неуспелог налога чак и када је Redis искључен, и поново га чисти након потврђеног заједничког избацивања. Ранији заједнички одговори на чекању не могу да врате избачени локални пин јер заједнички успеси никада не пишу SQLite. Каснији резервни испад може поново да врати налог; касније прихваћено заједничко уписивање постоји само у Redis. Redis пропусти не консултују локално резервно стање. Са искљученим драјвером, новоизабрани пинови задржавају застарели облик SQLite JSON са четири поља; само Redis рутирање додаје хеширани идентитет налога. Унапријед ухваћене чиоде се поново провјеравају на граници истека. Redis избор без закупа поново чита продавницу, али синхроно планирање закупа и даље може да користи пин који је избачен између претходног преузимања и планирања (прихваћени прозор најбољег труда). Обавеза закупа не може да промени налог након трајног потраживања: по одбијеном захтеву задржава кандидата на који се полаже само за тај захтев и оставља заједничког победника нетакнутим, тако да је споразум између инстанци ограничен на том путу. Остатак табеле и даље важи: ово не дели лепљивост комбиноване сесије, изворне Codex игле за окретање, семафоре налога, блокаде, ограничења потрошње, конфигурацију или евиденцију позива.

Хардвер: по инстанци истовремени дуги `/v1/responses` је а** меморија-буџет** питање (гомила + инфлигхт-бајта / #10110). `N` независни `DATA_DIR` с и даље множе хрпе: хост RAM мора покрити `N × cgroup`, а не „један 16 Ги под са Н = 8.“ Никада `replicas > 1` на једној SQLite датотеци.

Саставите скицу (две гомиле, два тома — не `deploy.replicas: 2`):

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

Густина у процесу (компресија са HTTP изолата) је [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Један логички кластер у дељеном трајном стању је [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
