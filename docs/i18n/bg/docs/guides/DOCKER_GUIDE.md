# 🐳 Docker Guide — OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Пълен справочник за внедряване с Docker. За бърз старт вижте [раздела за Docker в README](../README.md#-docker).

## Съдържание

- [Бързо стартиране](#quick-run)
- [С файл с променливи на средата](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Налични профили](#available-profiles)
- [Конфигуриране на CLI инструментите на хоста, когато OmniRoute работи в Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose за продукционна среда](#production-compose)
- [Етапи на Dockerfile](#dockerfile-stages)
- [Критични променливи на средата](#critical-environment-variables)
- [Docker Compose с Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Бърз тунел на Cloudflare](#cloudflare-quick-tunnel)
- [Тагове на образите](#image-tags)
- [Актуализации на таблото за управление в Docker](#dashboard-updates-in-docker)
- [Наличност: SQLite по подразбиране поддържа само една реплика](#availability-default-sqlite-is-single-replica)
- [Регионални грешки на Gemini в Docker](#gemini-regional-errors-inside-docker)
- [Важни бележки](#important-notes)

---

## Бързо бягане

> **Самостоятелен хост в една команда?** Вижте [ръководството за самостоятелно хостване](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (публикувано изображение + Redis, само обратна връзка, без избор на профил). Бързото изпълнение по-долу е пътят с един контейнер за потребители, които вече изпълняват Redis другаде.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## С файл за среда

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
# Базов профил (без CLI инструменти)
docker compose --profile base up -d

# CLI профил (с вградени Claude Code, Codex и OpenClaw)
docker compose --profile cli up -d

# Профил за хост (основно за Linux; монтира CLI изпълнимите файлове на хоста само за четене)
docker compose --profile host up -d

# Уеб профил (Chromium/Playwright за доставчици с уеб сесии)
docker compose --profile web up -d

# Комбиниране на CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Налични профили

OmniRoute предоставя Compose профили за основните варианти на внедряване. Изберете този, който съответства на вашата среда.

| Профил                   | Услуга           | Кога да се използва                                                                                                                                                      | Команда                                      |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (по подразбиране) | `omniroute-base` | Сървър без графичен интерфейс / минимална среда за изпълнение, без включени CLI инструменти на доставчици                                                                | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Агентни работни процеси, които извикват `omniroute providers/setup/doctor`, и включени CLI инструменти (Codex, Claude Code, Droid, OpenClaw)                             | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Linux хостове, които искат подобен на `network_mode` достъп до CLI инструментите на хоста чрез монтиране на `~/.local/bin`, `~/.codex`, `~/.claude` и др. само за четене | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | Изпълнява [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar на порт `8317` за проксиране към upstream CLI                                              | `docker compose --profile cliproxyapi up -d` |
| `web`                    | `omniroute-web`  | Доставчици с уеб сесии, които се нуждаят от браузър: `gemini-web`, `claude-web`, `claude-turnstile` (изгражда `runner-web`, с включен Chromium)                          | `docker compose --profile web up -d`         |

> Могат да се комбинират няколко профила: `docker compose --profile cli --profile cliproxyapi up -d`.

## Конфигуриране на CLI инструменти на хоста, когато OmniRoute работи в Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и бутонът
**Запазване на конфигурацията** в таблото за управление записват файлове като `~/.codex/*.config.toml`. Тези пътища
имат смисъл само на машината, на която действително се изпълнява CLI. Ако ги изпълните вътре
в контейнера, записът ще попадне в собствената домашна директория на контейнера (`/home/node` —
образът се изпълнява с `USER node`), откъдето никой CLI на хоста няма да го прочете и където той ще бъде
изтрит в момента, в който контейнерът бъде пресъздаден.

OmniRoute открива това и отказва записа, като вместо да
съобщава за успех, който не можете да използвате, предоставя инструкции: CLI приключва с код `2`, а API отговаря с `422`
и `containerEphemeralTarget: true`.

### Препоръчително: изпълнявайте CLI на хоста, а OmniRoute — в Docker

Контейнерът обслужва API; CLI конфигурира инструментите на хоста ви.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # насочва CLI към контейнера
omniroute setup-codex                      # записва в реалната ~/.codex на хоста ви
```

Това е правилният избор, когато Codex, Claude Code, Cursor или подобен инструмент се изпълнява на
лаптопа ви — което е обичайната конфигурация.

### Алтернатива: bind-монтирайте конфигурационните директории на хоста (профил `host`)

Ако искате самият контейнер да записва конфигурацията на хоста ви, монтирайте
директориите в него и насочете `CLI_CONFIG_HOME` към корена на монтирането. Профилът `host`
вече прави това:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind монтирането прави пътя надежден: OmniRoute прочита
`/proc/self/mountinfo` и разрешава записи в монтирани пътища (както и в директории,
чиито дъщерни директории са монтирани, което точно съответства на структурата `/host-home` по-горе), като
продължава да отказва записи в немонтирани пътища.

### Авариен вариант: конфигурирайте собствените CLI инструменти на контейнера (използвайте пестеливо)

Когато CLI инструментите действително се намират вътре в контейнера (профилът `cli`), записът
е преднамерен. Подайте `--allow-container-write` на която и да е команда `setup-*` или задайте
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` за сървъра. Записът се извършва
с предупреждение, че няма да се запази след премахването на контейнера.

> **Предупреждение за сигурността — профил `cli` + монтиране на `docker.sock`.**
> Профилът `cli` bind-монтира `/var/run/docker.sock`, така че автоматичният актуализатор
> в контейнера да може да пресъздава стека чрез демона на хоста
> (`src/lib/system/autoUpdate.ts` проверява за този сокет и пропуска
> Docker пътя, когато той липсва). Този сокет е **граница на доверие с root права върху
> хоста**: всичко, което може да получи достъп до него, управлява Docker демона на хоста като
> root — то може да създава, преглежда, спира и премахва всеки контейнер на хоста.
> Последици:
>
> 1. **Никога не излагайте порта на профила `cli` към мрежата.** Публикувайте
>    го на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — профил `cli`, достъпен от LAN, превръща всяко RCE на ниво табло за управление в
>    пълен компромис на хоста.
> 2. **Не bind-монтирайте допълнителни директории на хоста в профила `cli`.**
>    Docker сокетът заедно с всяко допълнително монтиране предоставя на контейнера пълен
>    достъп за четене/запис до файловата ви система и конфигурацията на хоста. Ако даден инструмент трябва да
>    вижда проект, изпълнете го локално чрез CLI двоичния файл — не го монтирайте
>    в контейнера `cli`.
>
> Ако не се нуждаете от автоматично актуализиране в контейнера, не включвайте профила `cli`
> (`COMPOSE_PROFILES=core,redis` или по-кратък вариант). Останалите профили не
> монтират Docker сокета.
>
> Вижте `docs/security/MITM-TPROXY-DECRYPT.md` (git; не е компилиран в `/docs`) за свързания модел на заплахи
> около MITM и `docs/security/SUPPLY_CHAIN.md` за веригата за произход на
> двоичните файлове `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute използва Redis за разпределения ограничител на честотата на заявките и споделения кеш. Услугата `redis` е **винаги дефинирана** в `docker-compose.yml` (не е ограничена от профил) и се стартира заедно с всеки друг профил.

| Детайл                  | Стойност                                        |
| ----------------------- | ----------------------------------------------- |
| Образ                   | `redis:7-alpine`                                |
| Име на контейнера       | `omniroute-redis`                               |
| Вътрешен порт           | `6379`                                          |
| Порт на хоста (замяна)  | `REDIS_PORT` (по подразбиране `6379`)           |
| Адрес на хоста (замяна) | `REDIS_BIND_HOST` (по подразбиране `127.0.0.1`) |
| Том                     | `omniroute-redis-data` → `/data`                |
| Проверка на състоянието | `redis-cli ping` (интервал от 10s)              |

Свързани променливи на средата:

- `REDIS_URL` — низ за свързване, подаден към приложението (`redis://redis:6379` по подразбиране).
- `REDIS_PORT` — съпоставяне на порта от страната на хоста за Redis контейнера.
- `REDIS_BIND_HOST` — хост интерфейсът, на който се публикува портът. По подразбиране е `127.0.0.1`.

> **Защо loopback по подразбиране:** sidecar контейнерът работи без `requirepass`, а контейнерите
> на приложението достигат до него през compose мрежата (`redis:6379`) — публикуваният порт е
> предназначен само за инструменти от страната на хоста (`redis-cli`, локално `npm run dev`). Публикуването на
> `0.0.0.0` би изложило Redis без удостоверяване на всеки хост във вашата LAN мрежа. Ако зададете
> `REDIS_BIND_HOST=0.0.0.0`, добавете също `--requirepass` към `command:` на услугата.

**Деактивирането на Redis** не се препоръчва (ограничителят на честотата на заявките ще премине към резервен вариант в паметта). Ако все пак се налага, премахнете/коментирайте блока на услугата `redis:` в `docker-compose.yml` или я мащабирайте до нула:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

За изолиран production snapshot, работещ паралелно със средата за разработка, използвайте `docker-compose.prod.yml`.

| Детайл                          | Стойност                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Файл                            | `docker-compose.prod.yml`                                                                   |
| Порт на таблото по подразбиране | `PROD_DASHBOARD_PORT=20130` (съпоставен към вътрешния `${DASHBOARD_PORT:-20128}`)           |
| API порт по подразбиране        | `PROD_API_PORT=20131`                                                                       |
| Образ                           | `omniroute:prod` (изграден от целта `runner-cli`)                                           |
| Redis контейнер                 | `omniroute-redis-prod` (`redis:8.6.2`, специализиран том `redis-prod-data`)                 |
| Том за данни                    | `omniroute-prod-data` (именуван, запазва се при повторни изграждания)                       |
| Проверки на състоянието         | `node healthcheck.mjs` + `redis-cli ping`, като `depends_on` зависи от състоянието на Redis |

Начин на използване:

```bash
# Изграждане и стартиране на production стека
docker compose -f docker-compose.prod.yml up -d --build

# Проследяване на логовете в реално време
docker compose -f docker-compose.prod.yml logs -f

# Спиране и премахване (томовете се запазват)
docker compose -f docker-compose.prod.yml down
```

Production стекът работи паралелно с dev compose конфигурацията (с различни имена на контейнери, портове и томове), така че можете да продължите локалната разработка, докато production средата остава активна.

## Етапи на Dockerfile

Хранилището доставя многоетапен Dockerfile (`Dockerfile`). Изложени са четири етапа; изберете правилния `target` за вашия случай на употреба.

| Етап          | Основно изображение   | Цел                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Инсталира deps (`npm ci --legacy-peer-deps`) и изпълнява `npm run build` (Turbopack по подразбиране — вижте ресурсите за време на изграждане по-долу)                                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Производствено време за изпълнение със самостоятелен изход Next.js.** Няма пакетен доставчик CLIs.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Добавя `git`, `docker.io`, `docker-compose` и глобален CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Изберете това за агентни работни потоци.**                                                                                                                             |
| `runner-web`  | `runner-base`         | Добавя Playwright + браузър Chromium (`--with-deps`) за доставчици на уеб сесии: `gemini-web`, `claude-web`, `claude-turnstile`.** Изберете това, когато използвате тези доставчици** — обикновеното изображение се проваля по време на заявка без него (вижте бележката `-web` под Канали за издаване). |

Създайте конкретна цел ръчно:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси за време за изграждане

Три аргумента за изграждане контролират разходите на `builder` етапа. Те са само по време на изграждане — `OMNIROUTE_MEMORY_MB` (по-долу) е отделно копче за изпълнение.

| Изграждане на арг           | По подразбиране | Ефект                                                                                             |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` се изгражда с webpack: по-ниска пикова памет, по-бавно. `1` се включва в Turbopack.           |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | V8 купчина таван (`--max-old-space-size`) за създадения `next build`.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Подава `CIRCLE_NODE_TOTAL`; След това извлича `workers = N - 1` за събиране на данни за страници. |

`OMNIROUTE_BUILD_WORKERS` е този, който рейзва на голям строител и този, който подозира, когато ограничена компилация умре** след** `✓ Compiled successfully`. Всеки работник на страница с данни е свой собствен процес, както и самият родител `next build` ; възпроизвеждане VPS на живо (проблем #7518) измерва пика RSS на всеки процес при ~ 4,5 GB независимо от флага `NODE_OPTIONS` heap (Turbopack компилира в native/Rust памет извън V8 heap). По подразбиране `2` (→ 1 работник, общо 2 процеса) е оразмерен за 16 GB / 4 vCPU, хоствани от GitHub, използвани от канала за публикуване. В `8` (→ 7 работници) този бегач изчерпа паметта и buildkit не изпълни стъпката с `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 работници) все още не се побираше, след като RSS за процес беше измерен директно вместо изведен. `tests/unit/docker-build-memory-budget.test.ts` прави аритметиката спрямо измерената цифра и се проваля, ако някое копче надрасне бегача.

Turbopack компилира в родната памет на Rust, която е жива** навън** купчината V8, така че `OMNIROUTE_BUILD_MEMORY_MB` не го ограничава. На хост с таван на паметта компилацията след това е SIGKILLed от OOM убиеца без никакъв текст за грешка — тя просто спира в средата на `Creating an optimized production build`, което се чете по-скоро като увисване, отколкото като недостиг на памет. Ето защо `Dockerfile` по подразбиране е webpack (`OMNIROUTE_USE_TURBOPACK=0`), за разлика от `npm run dev` / `npm run build`, където Turbopack е кодът по подразбиране: гол `docker build .` без аргументи за изграждане (които изпълняват Railway и други хостове с едно щракване) не трябва да умира безшумно на компилатор с ограничена памет. Публикуваните изображения вече преминават изрично `OMNIROUTE_USE_TURBOPACK=0` в `docker-publish.yml`. На строител с много RAM изберете Turbopack за по-бързо изграждане:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` е активиран, така че `next build` изпълнява родител** и** работен процес и всеки почита `OMNIROUTE_BUILD_MEMORY_MB` отделно. Оразмерете тавана на контейнера над приблизително два пъти тази стойност, а не веднъж.

Измерено на това дърво (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Пакетьор  | Таван на контейнера | Резултат                        |
| --------- | ------------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | OOM-убит и при двете, безшумно  |
| уебпакет  | 8 GiB               | build работник SIGKILLed        |
| уебпакет  | 12 GiB              | успя, достигна връх от 11,1 GiB |

### По подразбиране по време на изпълнение

По подразбиране, експортирани от `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Поведение на паметта в Docker:

- Изображението задава `OMNIROUTE_MEMORY_MB=1024` и извлича `NODE_OPTIONS=--max-old-space-size=1024` от него.
- Действителният сървърен процес се стартира от самостоятелния стартер, който чете `OMNIROUTE_MEMORY_MB` и добавя `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Възелът използва последната повторена стойност `--max-old-space-size`, така че настройката на `OMNIROUTE_MEMORY_MB` контролира ефективното ограничение Docker купчината.
- Тъй като изображението винаги го задава, собственият резервен RAM, калибриран от стартера, никога не се прилага под Docker. Увеличете го изрично за натоварването (таблицата по-долу). `2048` все още е твърде малък за кодиращ агент `/v1/responses`.

### Време на изпълнение RAM за кодиращи агенти

1 GiB Docker по подразбиране е dashboard/light-chat под, а не производствен размер. Дълги `POST /v1/responses` тела (стотици съобщения, десетки инструменти) запазват множество графики в паметта по време на компресиране. Две припокриващи се заявки за токени ~ 3 MiB / ~ 750k прекъснаха V8 на** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) и също удари 16 GiB cgroup OOM. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Размер** cgroup `--memory` над купчината** собствените буфери —, SQLite и междинните продукти за компресия се намират извън V8.

| Натовареност                           | `OMNIROUTE_MEMORY_MB`                | Контейнер / cgroup         | Бележки                                                                                                         |
| -------------------------------------- | ------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Табло за управление, един лек чат      | `1024` (изображение по подразбиране) | ≥2 GiB                     |                                                                                                                 |
| Един кодиращ агент (Claude/Codex/Grok) | `8192`                               | ≥10 GiB                    | Типична `/v1/responses` с една сесия                                                                            |
| Две едновременни дълги `/v1/responses` | `10240`–`12288`                      | ≥12–16 GiB                 | Измерено прекъсване на V8 при ~ 12 GiB heap                                                                     |
| Три + едновременни дълги контекста     | не на един процес                    | сериализиране / повече RAM | Стандартният прием за тежка категория е 1 по време на полет; повдигането му без RAM въвежда отново прекъсването |

`omniroute serve` на гол метал калибрира ~ 35% от RAM (притиснат `[512, 4096]`), когато `OMNIROUTE_MEMORY_MB` е** ненастроен** . Docker винаги задава `1024`, така че калибрирането никога да не се изпълнява в официалния образ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Критични променливи на средата

Освен стойностите по подразбиране, документирани в [ENVIRONMENT.md](../reference/ENVIRONMENT.md), следните променливи са най-важни при изпълнение под Docker:

| Променлива                    | Предназначение                                                                                                                                                                                                                                                                                | Стойност по подразбиране           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Споделена тайна за WebSocket моста. **Задължителна в продукционна среда** — задайте силен произволен низ.                                                                                                                                                                                     | не е зададена (трябва да се укаже) |
| `REDIS_URL`                   | Низ за свързване към бекенда за ограничаване на честотата / кеширане                                                                                                                                                                                                                          | `redis://redis:6379`               |
| `REDIS_PORT`                  | Порт от страната на хоста за включения Redis контейнер                                                                                                                                                                                                                                        | `6379`                             |
| `REDIS_BIND_HOST`             | Хост интерфейс, на който се публикува портът на включения Redis (loopback, освен ако не добавите AUTH)                                                                                                                                                                                        | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Път на хоста, монтиран в профила `cli` на `/workspace/omniroute` за работни процеси за самообновяване                                                                                                                                                                                         | `.` (текущата директория)          |
| `OMNIROUTE_MEMORY_MB`         | Горна граница на Node heap паметта по време на изпълнение за самостоятелния Docker сървър; заменя стойността по подразбиране на образа, посочена по-горе. Агенти за програмиране: `8192`+ (вижте [RAM по време на изпълнение](#runtime-ram-for-coding-agents)).                               | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Заменя публикуваните портове за таблото за управление (20128) и API (20129)                                                                                                                                                                                                                   | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Хост интерфейс, на който docker-compose публикува портовете за таблото за управление/API/live-WS. При `REQUIRE_API_KEY=false` (стойността по подразбиране) `0.0.0.0` излага анонимното `/v1` прокси към LAN — разширявайте достъпа само с `REQUIRE_API_KEY=true` или с обратно прокси отпред. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Хост интерфейс, на който docker-compose публикува страничния контейнер `cliproxyapi` — неговият том с данни съдържа идентификационните данни за доставчиците.                                                                                                                                 | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Директорията, която скенерът за плъгини по време на изпълнение чете и в която инсталира. Задайте я, когато плъгините са монтирани чрез bind mount: стойността по подразбиране следва `HOME`, която образът може да не експортира.                                                             | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL подпът, когато приложението е публикувано зад обратно прокси (напр. `/omniroute`)                                                                                                                                                                                                         | _(празно = корен)_                 |
| `NEXT_PUBLIC_BASE_URL`        | Публичен origin за браузъра, включително подпътя (напр. `https://host/omniroute`)                                                                                                                                                                                                             | не е зададена                      |
| `PROD_DASHBOARD_PORT`         | Порт от страната на хоста за таблото за управление за `docker-compose.prod.yml`                                                                                                                                                                                                               | `20130`                            |
| `CLIPROXYAPI_PORT`            | Порт от страната на хоста за страничния контейнер `cliproxyapi`                                                                                                                                                                                                                               | `8317`                             |

## Обратно прокси на подпът (Traefik / nginx)

Next.js `basePath` се компилира в самостоятелния пакет. OmniRoute записва изпечената стойност в контролен файл в основата на приложението (написан по време `npm run build`; прочетен от `scripts/docker/ensure-docker-base-path.mjs`) и я сравнява с `OMNIROUTE_BASE_PATH` когато контейнерът стартира. Когато се различават и изображението е изградено за корена на домейна, входната точка пренаписва самостоятелните манифести, вградените `basePath`/`assetPrefix` литерали (Следващите 16 изобразяват SSR актив URLs само от `assetPrefix` — patcher отразява подпътеката в него), изпечения `/_next/static` актив URLs (манифести за референтни клиенти, импортиране на медии, предварително изобразени страници за грешка) и клиента `process.env` shim преди `node dev/run-standalone.mjs` да работи.

### Съставяне на компилация (препоръчително)

Задайте и двете променливи в `.env`, след това изградете отново, така че изображението и времето за изпълнение да се съгласуват:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` препраща `OMNIROUTE_BASE_PATH` като Docker build-arg и като променлива на средата за изпълнение.

### Подпът за изпълнение на предварително изградено основно изображение +

Публикуваните `cheaperinference/omniroute:*` изображения са създадени за корена на домейна. Все още можете да зададете `OMNIROUTE_BASE_PATH` по време на изпълнение; контейнерът кръпва пакета веднъж при стартиране. Сдвоете го със съответстващия публичен произход:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Конфигурирайте обратния прокси за препращане на** пълен** външен път (не премахвайте префикса). Traefik трябва да насочва `PathPrefix(`/omniroute `)` към контейнера без `StripPrefix`, така че Next.js получава `/omniroute/...` и обслужва активи от `/omniroute/_next/...`.

Проверката на здравето Docker изследва олекотената крайна точка на жизнения цикъл `/healthz` с префикс активен `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остава достъпен за human/dashboard диагностика; за да насочите контейнера HEALTHCHECK обратно към него (например за дълбоко изпълнение на здравето), задайте `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Този път е а** дълбоко** проверка (DB + обобщение на мониторинга) — подходящо за Docker рядко `HEALTHCHECK` ако се включите отново, но** не** за Kubernetes `livenessProbe` интервали.

За оркестранти (Kubernetes, Nomad и др.):

| Сонда                 | Предпочитам                                                                 | Избягвайте                                                                    |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Жизненост             | HTTP `GET /livez` или TCP на главния порт (`PORT`, по подразбиране `20128`) | `/api/monitoring/health` като жизненост                                       |
| Готовност             | HTTP `GET /healthz`                                                         | Тесни изчаквания, които третират заетостта на цикъла на събитието като мъртъв |
| Дълбока / черна кутия | `/api/monitoring/health`                                                    | —                                                                             |

`/healthz` отчита жизнения цикъл на процеса (`ok` / `starting` / `stopping`). `/livez` е активен само процес (200 всеки път, когато манипулаторът може да работи; не чака готовност). И двете все още работят на един и същ цикъл на събития на Node като обработка на заявки, така че свързаният с процесора каталог или работа по компресиране може да ги забави — busy ≠ dead. Предпочитайте TCP жизнеността, ако HTTP сондите изтекат. Пълно ръководство за сонда: [Ръководство за наблюдение — Препоръки за сонда на Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Създаване с Caddy (HTTPS Auto-TLS)

OmniRoute може да бъде сигурно изложен чрез автоматичното SSL осигуряване на Caddy. Уверете се, DNS A записът на вашия домейн сочи към IP на вашия сървър.

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

Caddy задава стандартните препращащи заглавки за контейнера нагоре по веригата. OmniRoute използва `NEXT_PUBLIC_BASE_URL` като каноничен публичен източник за OAuth обратни извиквания и генерирани публични връзки; автентифицираните записи на таблото за управление използват заявки от същия произход плюс обвързана със сесия CSRF защита. Разрешете `OMNIROUTE_TRUST_PROXY` само за разширени внедрявания, при които умишлено искате OmniRoute да извлече публичния произход от доверени препратени заглавки вместо изрична конфигурация.

## Cloudflare бърз тунел

Поддръжката на таблото за управление за внедрявания Docker включва едно щракване**Cloudflare Бърз тунел** на `Dashboard → Endpoints`. Първият актив изтегля `cloudflared` само когато е необходимо, стартира временен тунел до текущата ви `/v1` крайна точка и показва генерирания `https://*.trycloudflare.com/v1` URL директно под нормалния ви публичен URL.

Тунелните панели на крайни точки (Cloudflare, Tailscale, ngrok) могат да бъдат показани или скрити от `Settings → Appearance` без да се променя състоянието на активния тунел.

### Бележки за тунела

- Quick Tunnel URLs са временни и се променят след всяко рестартиране.
- Бързите тунели не се възстановяват автоматично след рестартиране на OmniRoute или контейнер. Активирайте ги отново от таблото за управление, когато е необходимо.
- Управляваното инсталиране в момента поддържа Linux, macOS и Windows на `x64` / `arm64`.
- Управляваните бързи тунели по подразбиране използват HTTP/2 транспорт, за да избегнат шумни QUIC UDP буферни предупреждения в ограничени контейнерни среди. Задайте `CLOUDFLARED_PROTOCOL=quic` или `auto`, ако искате различен транспорт.
- Docker изображенията обединяват системните CA корени и ги предават на управляван `cloudflared`, което избягва повреди на доверието TLS когато тунелът стартира вътре в контейнера.
- Задайте `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ако искате OmniRoute да използва съществуващ двоичен файл, вместо да изтегля такъв.

## Етикети за изображения

| Изображение                  | Етикет   | Размер  | Описание                                                   |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Най-високо** публикувани** стабилен SemVer (не git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Закачете този клас маркер за GitOps                        |

Едни и същи изображения се публикуват в три хранилища, с едни и същи обобщения за всяка архитектура: `cheaperinference/omniroute` (Docker Hub, организацията Cheaper Inference, от 3.8.53 нататък), `ghcr.io/cheaper-inference/omniroute` и наследеното `diegosouzapw/omniroute`, което запазва своята история на изтегляне и все още получава всяко издание. Съществуващите внедрявания `diegosouzapw/omniroute` продължават да се актуализират; превключването на името на изображението не е задължително. Каналът за предварително пускане `:next` / `:next-web` по-долу е публикуван само в `diegosouzapw/omniroute` и GHCR.

Мултиплатформен манифест: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker автоматично избира съответстващата архитектура; преминете `--platform linux/amd64` ако трябва да принудите AMD64 емулация на ARM хостове.

### Канали за освобождаване

OmniRoute публикува отделни Docker канали за стабилни издания, активно тестване на клонове на издания и компилации за разработка.

| Канал                           | Източник                                   | Изменчивост                      | Препоръчителна употреба                                                                                                                     |
| ------------------------------- | ------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | издание Signed/versioned                   | Неизменна                        | Производствени внедрявания, които определят точна версия                                                                                    |
| `:latest` / `:latest-web`       | Най-високо** публикувани** стабилна SemVer | Променлив стабилен указател      | Следва стабилни версии** след** задача за публикуване SemVer — изпълнява** не** проследяване `main` или неиздадени `release/v*` ангажименти |
| `:next` / `:next-web`           | Текущ клон `release/v*` по подразбиране    | Променлив указател преди пускане | Тестване на корекции, които са достигнали до клона на активното издание, но все още не са в стабилно издание                                |
| `:main` / `:main-web`           | `main` клон                                | Променлив указател за развитие   | Само тестване за разработка и интеграция                                                                                                    |

#### Доставчици на уеб сесии: `-web` изображения

Всеки канал по-горе се удвоява като `-web` таг (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), изграден от етапа `runner-web` — същото изображение плюс Playwright и браузър Chromium. Обикновеното изображение се изпраща** без** хром; `gemini-web`, `claude-web` и `claude-turnstile` имат нужда от него.

Грешката е отложена, а не време за стартиране: тези доставчици изброяват своите модели и се показват като свързани в таблото за управление и само първата заявка е неуспешна с

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако използвате тези доставчици, изтеглете `-web` тага на канала, на който вече сте, — нищо друго не се променя. При npm/CLI инсталация (няма Docker изображение), еквивалентната липсваща част е двоичният файл на браузъра: стартирайте `npx playwright install chromium` на хоста.

#### Използване на канала за предварително пускане

Каналът `next` се изгражда отново при всяко натискане към текущия клон `release/v*` по подразбиране и се публикува както за AMD64 така и ARM64. По-старите клонове за поддръжка не могат да го презапишат. Каналът предоставя изтегляемо изображение за корекции, които са се слели в клона на активното издание, преди следващият стабилен етикет да бъде изрязан.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose заменете етикета на изображението, използван от избрания профил, след това изтеглете и създайте отново услугата:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безопасност и връщане назад

`next` е плаващ канал преди пускане. Може да се промени при всяко натискане към клона за активно освобождаване и е** не се поддържа за производствена употреба** . Фиксирайте резюмето на изображението, докато оценявате конкретна компилация:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Преди тестване направете резервно копие на OmniRoute тома с данни или монтираната чрез свързване директория с данни. За да върнете назад, възстановете предишната използвана стабилна версия или обобщете и създайте отново контейнера:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Изграждане на клон на освобождаване никога не може да премести `latest`; само подходяща стабилна семантична версия може да популяризира стабилния указател. Изображенията `next` запазват инспекцията на изображението за освобождаване и блокиране на вратата за КРИТИЧНА уязвимост.

**`latest` не е валутна гаранция за git.** Обединените корекции на `main` или на активния `release/v*` клон са** не** в `:latest`, докато не бъде публикувано стабилно SemVer изображение и заданието за публикуване популяризира `:latest` (същият дайджест като този SemVer). Ако `latest` изглежда замразен, докато GitHub вече показва корекцията, издърпайте `:next` за да тествате клона за освобождаване, или изчакайте маркера SemVer.

| Вие искате                                                                 | Използвайте                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------- |
| GitOps / производство, което не трябва да се отклонява                     | Закачете `:X.Y.Z` (или дайджеста на изображението) |
| Следвайте публикуваните конюшни и приемайте пресъздаване при всяко издание | `:latest`                                          |
| Тествайте неиздадени `release/v*` ангажименти                              | `:next` (не производство)                          |
| Тествайте `main`                                                           | `:main` (не производство)                          |

## Актуализации на таблото в Docker

Контейнер, стартиран от публикуван образ, не може да замени сам себе си. Когато OmniRoute установи, че работи в
контейнер (без `.git` работно копие и без npm инсталация), банерът за актуализация на началното табло показва
командата, която трябва да се изпълни на хоста, вместо инструкциите за npm/git, заедно с бутон за копиране:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Името на услугата идва от `AUTO_UPDATE_SERVICE` (по подразбиране `omniroute`, услугата в
`docker-compose.selfhost.yml`). `pull` актуализира само плаващ етикет (`latest`, `next`); при фиксиран
етикет `:X.Y.Z` първо редактирайте етикета.

### Актуализации с едно щракване чрез задействащ файл на хоста

За да запазите работата на **Актуализиране сега**, без да монтирате `/var/run/docker.sock` (което предоставя на контейнера
root достъп до хоста — вижте предупреждението за профила `cli` по-горе), задайте `DOCKER_UPDATE_TRIGGER_FILE` за
услугата OmniRoute и стартирайте наблюдател на хоста:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Пътят трябва да бъде в `DATA_DIR` (относителните стойности се разрешават спрямо него); всичко останало се
отхвърля. След това **Актуализиране сега** записва `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` в този
файл, връща `202`, а таблото периодично заявява `/api/system/version`, докато новата версия стане активна,
след което се презарежда. В този режим OmniRoute никога не изпълнява shell или Docker команда. Както при всяко действие
за актуализация, заявката се приема само от loopback/LAN клиенти.

Директория с данни, монтирана чрез bind mount, предоставя на хоста стабилен път за наблюдение. Примерни `systemd` модули
(заменете `/srv/omniroute` с директорията, съдържаща вашия compose файл и `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Наблюдение за заявки за актуализация от таблото на OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Изтегляне и повторно създаване на контейнера OmniRoute

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

Услугата премахва заявката преди изтеглянето, така че неуспешното изпълнение да не предизвика цикъл. Без
`DOCKER_UPDATE_TRIGGER_FILE` таблото запазва процеса с ръчно изпълнение на командата.

## Наличност: SQLite по подразбиране е единична реплика

Stock Docker / Kubernetes OmniRoute е** един възел процес + един SQLite писател** . Висока наличност е** не се поддържа** върху тази топология.

| Ограничение                                       | Последица                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Самотен писател                                   | Направи** не** стартирайте множество реплики срещу един и същ SQLite файл. Това разваля DB.                                                                                                                                                                                                                                                           |
| Създаване наново/рестартиране/убиване HEALTHCHECK | **Пълно прекъсване** на SSE по време на полет, сесии на таблото за управление и състояние в паметта. Всеки свързан клиент отпада. Новите заявки по време на прозореца за празна крайна точка получават обратен прокси**`502 Bad Gateway: Unknown error`** , не OmniRoute JSON — клиентите не могат да различат това от грешка на доставчика (#11015). |
| Същият цикъл на събития като `/healthz`           | Натовареният каталог или компресията могат да забавят сондите; кратко изчакване, след което рестартира** само** реплика.                                                                                                                                                                                                                              |

**Матрица на сондата** (вижте също [препоръките за сонда на Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Сонда          | Цел                                                              | Не използвайте                                                                |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Жизненост      | TCP на `PORT` (по подразбиране `20128`), или мек HTTP `/healthz` | `/api/monitoring/health`                                                      |
| Готовност      | HTTP `GET /healthz`                                              | Тесни изчаквания, които третират заетостта на цикъла на събитието като мъртъв |
| Дълбоко / хора | `/api/monitoring/health`                                         | Автоматизирана kubelet жизнеспособност                                        |

**Надстройки:** очаквайте всяка сесия да отпадне. Източете клиенти, ако можете; няма текуща актуализация на SQLite по подразбиране. Compose `restart: unless-stopped` плюс Docker `HEALTHCHECK` също ще замени единствения процес, когато контейнерът е нездравословен — същият радиус на взривяване.

Готови манифести и Helm диаграма са живи в `deploy/kubernetes/` и `deploy/helm/omniroute/` — вижте [ръководството за внедряване на Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes фрагмент за a** единична реплика** (Изисква се повторно създаване; не повдигайте `replicas` срещу един SQLite файл):

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

`preStop` sleep позволява на kube да изпусне крайните точки на услугата преди SIGTERM така** нов** трафикът спира да удря процеса на умиране. `/v1/responses` SSE по време на полет се източва до `SHUTDOWN_TIMEOUT_MS` (по подразбиране 30s) чрез лизингови договори за тежък достъп (#11015). Нови заявки, които все още достигат до процеса, получават `503` + `Retry-After: 5`. Празнината за повторно създаване на празна крайна точка, докато замяната е готова, остава тежко прекъсване — това е SQLite топологията, а не грешна конфигурация на сондата.

Външен Postgres / многозаписващ HA е** не** документиран складов път. Ако имате нужда от HA, запазете една реплика или стартирайте топология, която проектът е тествал и документирал отделно. Работата на Postgres/MySQL живее в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). До това изпращане, единственият поддържан начин за размножаване** големи** Капацитетът `/v1/responses` е N независими процеси (следващия раздел), а не `replicas > 1` на един том.

## Мащабиране: N независими процеса

### ротация Codex токени

Копията на един акаунт Codex не трябва да консумират самостоятелно своя маркер за опресняване за еднократна употреба. В екземпляри, които използват само синхронизирани идентификационни данни, задайте `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (псевдоним `cx`). Оставете го ненастроено на собственика на единична ротация. Всеки процес все още се нуждае от собствен `DATA_DIR`; тази опция нито споделя SQLite, нито предоставя синхронизация на токени или разпределено заключване.

Пасивният екземпляр препрочита връзката, когато е необходимо опресняване, и приема само различен, неизтекъл токен за достъп. В противен случай опресняването е деактивирано без изтичане или дезактивиране на връзката или отчитане на повреда на прекъсвача на опресняване. Реалните грешки при удостоверяване нагоре все още използват нормално отчитане на грешки, експоненциално охлаждане и нормална клиентска грешка; деактивирането на акаунта остава постоянно. Синхронизирайте завъртяните токени на собственика, преди токените за достъп да изтекат (по подразбиране проактивното опресняване е пет минути) или повторно импортирайте файла за удостоверяване на Codex. Пасивните импортирания съхраняват доставените токени, без да ги валидират в крайната точка на токена. Ръчното опресняване dashboard/API връща `409 refresh_disabled`; новите влизания OAuth са непроменени. Вижте [справка за околната среда](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Процесът на един възел е** един куп V8** . Два припокриващи се ~ 3 MiB / ~ 750k-токен кодиращ агент `POST /v1/responses` (RTK + Caveman) прекъсват тази купчина при ~ 12 Gi (`FATAL ERROR: Reached heap limit`) и могат OOM 16 Gi cgroup. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Това измерване е a** памет-бюджет** предупреждение, а не продукт hard-max от два едновременни дълги `/v1/responses`. Допускането на тежък чат се ограничава от автоматично извлечен байт бюджет за поглъщане (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) — оразмерен от същия таван `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` V8/cgroup. Малки чатове, `/healthz`, `/v1/models` и MCP са** не** в тази шапка.

### Един процес: повече от две дълги `/v1/responses`

А** здрави** процес (купчина под `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, по подразбиране `0.75`)** май** изпълнете повече от два едновременни дълги `POST /v1/responses` когато бюджетът на inflight байт за целия процес (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) все още има място. Телата на или над `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (по подразбиране 256 KiB) приемат същия тежък лизинг като структурно-тежките заявки и използват същия [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетки едновременни дълги SSE клиенти (операторите често се нуждаят от 40–50) е a** памет-бюджет** въпрос — размер heap + primary/headroom слотове + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — не е твърдо ограничение за „макс. 2“ продукта. Хийп под натиск все още се отделя с повторен опит `503` така че #7849 не се връща.

до** умножете купчини** (независими V8 стари пространства)** днес** :

| Направи                                                                                                                                                                   | недей                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Бягай** N containers/pods** , всеки със своето** собствени** `DATA_DIR` / обем                                                                                            | Задайте `replicas > 1` срещу един SQLite файл                                   |
| Размер тежък по време на полет + здравословен запас от купчина / бюджет на байт по време на полет; 1–2 е консервативната #7849 по подразбиране, а не твърд продуктов макс | Дайте на един процес 8 × RAM и неограничен брой                                 |
| По избор: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за** броячи на споделени квоти**                                                                           | Третирайте Redis като споделен SQLite — не е такъв                              |
| Дублирайте тайните на доставчика във всеки екземпляр (или приемете разделени табла за управление)                                                                         | Очаквайте едно табло за управление / един регистър на обажданията в инстанциите |
| Отпред с всеки балансьор на товара; sticky чрез API ключ или сесия е достатъчно                                                                                           | Изискване на специфичен за доставчика междинен софтуер, съобразен с размера     |

Афинитетът сесия към акаунт може също да бъде споделен чрез Redis: задайте `OMNIROUTE_SESSION_AFFINITY_STORE=redis` и `REDIS_URL` за всеки процес, със същия `REDIS_KEY_PREFIX` и положителна настройка `sessionAffinityTtlMs`. Пиновете преобразуват хеширани самоличности на акаунти за използване към допустимата локална връзка на всеки процес, така че OAuth акаунтите със съвпадащи метаданни за самоличност не е необходимо да имат съвпадаща връзка IDs. Известните самоличности на акаунти имат предимство пред противоречивите местни IDs при разделителна способност на ПИН кодове и защитено изгонване; записи без самоличност (или изгонващи викащи без самоличност) запазват наследения ID guard. Акаунтите без стабилна самоличност на използване все още изискват съвпадение IDs. Redis грешки или повиквания, надвишаващи 100 ms, се връщат към локалния SQLite. Всяко Redis хранилище за афинитет ограничава неизпълнените операции до 8, заобикаля Redis незабавно, когато е пълен, и освобождава слотове само когато основната работа се уреди, а не в крайния срок на повикващия. По време на прекъсване Redis няма споделена истина: всеки екземпляр се връща към собствения си локален афинитет, сесиите могат да се закачат отново веднъж на екземпляр и екземплярите могат да се разминават. Лепкавостта се събира отново чрез Redis когато се възстанови. Времето за изчакване ограничава изчакването, а не изпратеното EVAL, което може да се приземи след резервно връщане. Маршрутните записи сравняват точната стойност, наблюдавана от решението за маршрутизиране, а не ново четене по време на мутация; наблюдаван пропуск или SQLite резервно наблюдение се сравнява като отсъстващ Redis ключ. Остарелите пинове се заменят в един CAS, така че късна команда не може да замени или изтрие по-нов, различен щифт. Redis чете атомарно връща стойността и оставащия сървър TTL; положителен PTTL (или без изтичане) определя жизнеността, а не JSON времевия печат на писателя или часовника на читателя. Местните моментни снимки картографират този оставащ TTL към местен краен срок; съществуващите JSON ключове остават четими и техните необработени байтове се запазват за CAS. Redis е единственият източник на истина, докато отговаря. Потвърдените споделени въвеждания, докосвания и изтривания премахват локалния запис, никога не го инсталират или опресняват. SQLite на пътя Redis съдържа само собствените резервни решения на този екземпляр от грешки Redis, изчакване или насищане на допускане, ограничено до TTL, както преди. Липсващ локален пин при по-късно прекъсване струва едно ново избиране (едно пропускане на кеш подкана), а не грешен или изгонен акаунт. Отхвърлените upserts връщат споделения победител и оставащия му TTL атомарно: обикновеният избор проверява отново картографирания локален краен срок и използва все още жив отговарящ на условията победител, докосвайки използването и регистрирането за този акаунт без друго споделено записване. Ако не е наличен, изборът запазва локалния кандидат, оставя споделения ПИН непроменен и излъчва едно съобщение за отстраняване на грешки. Отхвърлен CAS не пише SQLite; Redis грешки, изчакване или насищане на допускане прилагат вместо това съществуващата локална операция. Ако отговорът на изпратена мутация пристигне след изчакване (прието, отхвърлено или грешка), синхронното сравняване и изтриване на точна сериализирана стойност премахва само резервния ред с идентичен на байт изчакване. Няма изчакване между това сравнение и изтриването; запазва се по-нов запис при прекъсване. Защитеното изгонване премахва собствения локален щифт на неуспешния акаунт дори при изключен Redis и го почиства отново след потвърдено споделено изгонване. Чакащите по-ранни споделени отговори не могат да възстановят изгонен локален щифт, тъй като споделените успехи никога не пишат SQLite. По-късно резервно прекъсване може да закачи отново акаунт; по-късно приет споделен запис съществува само в Redis. Redis пропуски не се консултирайте с местно резервно състояние. При изключен драйвер, новоизбраните щифтове запазват наследената форма с четири полета SQLite JSON ; само Redis маршрутизирането добавя самоличността на хеширания акаунт. Предварително избраните щифтове се проверяват отново на границата на изтичане. Изборът без лизинг Redis препрочита магазина, но планирането на синхронен лизинг все още може да използва щифт, изваден между предварително извличане и планиране (приет прозорец за най-добро усилие). Ангажиментът за лизинг не може да превключва акаунти след трайно искане: при отхвърлен upsert той запазва претендирания кандидат само за тази заявка и оставя споделения победител недокоснат, така че споразумението между инстанциите е ограничено по този път. Останалата част от таблицата все още е в сила: това не споделя залепването на комбо сесията, родните щифтове за завъртане Codex, семафори на акаунти, блокировки, лимити на разходите, конфигурация или регистрационни файлове на повикванията.

Хардуер: едновременната дълга `/v1/responses` за екземпляр е a** памет-бюджет** въпрос (куп + inflight-byte / #10110). `N` независим `DATA_DIR` s все още умножава купчини: хостът RAM трябва да покрива `N × cgroup`, а не „един 16 Gi pod с N = 8.“ Никога не `replicas > 1` на един SQLite файл.

Съставете скица (две купчини, два тома — не `deploy.replicas: 2`):

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

Плътността в процеса (компресия от HTTP изолата) е [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Един логически клъстер в споделено трайно състояние е [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Регионални грешки на Gemini в Docker

Google AI Studio / Gemini API може да върне HTTP 400 с FAILED_PRECONDITION и
`User location is not supported for the API use.` Успешна заявка на хост системата
не доказва, че контейнерът използва същия изходящ маршрут. Подредбата на DNS,
IPv4/IPv6 свързаността, маршрутизирането през VPN и конфигурираните прокси сървъри може да се различават. Проверете
[поддържаните от Google региони](https://ai.google.dev/gemini-api/docs/available-regions),
както и действителния маршрут на връзката; тази грешка сама по себе си не означава, че API ключът е невалиден.

### Предпочитайте прокси за конкретната връзка

Използвайте [конфигурацията на прокси за отделна връзка](../ops/PROXY_GUIDE.md#4-level-proxy-system)
на OmniRoute за засегнатата връзка с Gemini, след което повторете **Test Connection** и малка заявка
със същия модел. Така промяната в маршрутизирането остава ограничена до тази връзка. Проверете
дали прокси сървърът е достъпен от контейнера и дали връзката действително го избира.
Промяната на маршрута не гарантира регионална допустимост от страна на доставчика.

### Сравнете мрежовата свързаност на хоста и контейнера

Когато сравнявате удостоверени резултати, използвайте едни и същи ключ, модел и заявка; никога
не поставяйте идентификационни данни, пароли за прокси сървъри или пълни заглавки за удостоверяване в доклад за проблем.
Първо проверете кои семейства адреси предлага системният DNS преобразувател, като използвате една и съща команда
на хоста и в контейнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Заменете `omniroute` с услугата, която изпълнявате (например `omniroute-web`). Тези
команди извеждат семействата адреси без идентификационни данни или IP адреси. Върната стойност `6`
показва единствено IPv6 DNS резултат: тя **не** доказва наличието на използваем IPv6 маршрут или достъп до API.
Където е инсталиран `curl`, сравнете `curl -4 -I https://generativelanguage.googleapis.com`
с `curl -6 -I https://generativelanguage.googleapis.com` и в двете среди.
HTTP отговорът доказва свързаност за тази проверка дори ако представлява грешка поради липса на удостоверяване;
само удостоверената заявка към модела проверява допустимостта за Gemini.

### Алтернатива на ниво хост: работещ IPv6 и политика на преобразувателя

Авторът на [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) е възстановил
достъпа в своята среда, като е активирал IPv6 за контейнера и е променил избора на адреси в glibc.
Разглеждайте това като алтернатива, специфична за конкретната среда. Потвърдете, че IPv6 работи на хоста,
както и изходящата свързаност/маршрутизиране на контейнера и правилата на защитната стена, преди да променяте предпочитанията на преобразувателя.
Сам по себе си частен ULA адрес не доказва наличието на публична IPv6 свързаност.

За услуги, които вече са свързани към мрежата по подразбиране на Compose, този фрагмент активира
IPv6 в нея; запазете останалата част от конфигурацията на услугата, портовете, томовете и настройките:

```yaml
networks:
  default:
    enable_ipv6: true
```

За именувана мрежа го активирайте в мрежата, към която услугата действително е свързана. Docker може
да разпредели ULA подмрежа; избирайте изрично зададена, неприпокриваща се подмрежа само когато мрежата ви
го изисква. Вижте [IPv6 мрежова свързаност в Docker](https://docs.docker.com/engine/daemon/ipv6/)
и [мрежови опции на Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

В **образ, базиран на glibc**, `/etc/gai.conf` може да променя избора на адреси. Текущият
Dockerfile в хранилището използва Debian; персонализираните образи, базирани на musl, не използват този механизъм.
Докладваната корекция променя ULA етикета от `label fc00::/7 6` на
`label fc00::/7 1`. Започнете с пълната таблица с политики на образа и запазете останалите ѝ
записи: добавянето на запис `label` или `precedence` заменя тази таблица по подразбиране, така че файл,
съдържащ само променения ред, не е достатъчен.
[Справочникът за конфигурацията на glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
описва тази семантика. Монтирайте проверения файл само за четене в `/etc/gai.conf`
и създайте услугата отново, за да приложите промяната.

Това променя избора на адреси от операционната система за **целия изходящ трафик от този контейнер**.
То не принуждава всяко приложение да избира IPv6: редът на DNS резултатите и изборът на връзка
от Node също имат значение. По-конкретно, `--dns-result-order=ipv4first` дава предимство на IPv4 и
не е решение за проблем, който възниква само при IPv4. Вижте [подреждане на DNS резултатите в Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

След всяка промяна на ниво хост тествайте отново Gemini и останалите си доставчици. За да върнете
предишното състояние, премахнете персонализираното монтиране на `gai.conf`, възстановете предишната мрежова конфигурация и
създайте отново засегнатата услуга/мрежа по време на прозорец за поддръжка. Повторното създаване на мрежа
може да прекъсне работата на други контейнери, свързани към нея; не изтривайте тома с постоянните данни.

## Важни бележки

- **Режим WAL на SQLite:** Трябва да позволите на `docker stop` да завърши, за да може OmniRoute да запише последните промени обратно в `storage.sqlite` чрез контролна точка. Включените Compose файлове вече задават 40-секунден гратисен период за спиране. Ако стартирате образа директно, запазете `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Задайте на `true`, ако рутинните архивни копия и тези преди запис се управляват външно. Миграциите на съществуващи бази данни все пак изискват собствена надеждна защитна моментна снимка и предпазен механизъм при масова миграция.
- **Съхранение на данните:** Винаги монтирайте том към `/app/data`, за да запазите базата данни, ключовете и конфигурациите си при рестартиране на контейнера.
- **Конфигурация на порта:** Задайте друга стойност на променливата на средата `PORT`, за да промените порта по подразбиране `20128`.

## Вижте също

- [Ръководство за внедряване на виртуална машина](../ops/VM_DEPLOYMENT_GUIDE.md) — Настройка на виртуална машина + nginx + Cloudflare
- [Ръководство за внедряване във Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Внедряване във Fly.io
- [Конфигурация на средата](../reference/ENVIRONMENT.md) — Пълна справка за `.env`
