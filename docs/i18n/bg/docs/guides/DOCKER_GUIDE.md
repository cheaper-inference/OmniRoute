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

## Бързо стартиране

> **Самостоятелно хостване с една команда?** Вижте
> [Ръководството за самостоятелно хостване](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (публикуван образ +
> Redis, достъпен само през loopback, без избор на профил). Бързото стартиране по-долу е
> вариантът с един контейнер за потребители, които вече изпълняват Redis другаде.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## С файл с променливи на средата

```bash
# Първо копирайте и редактирайте .env
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

Хранилището включва многоетапен Dockerfile (`Dockerfile`). Предоставени са четири етапа; изберете подходящата `target` за вашия случай на употреба.

| Етап          | Базов образ           | Предназначение                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Инсталира зависимостите (`npm ci --legacy-peer-deps`) и изпълнява `npm run build` (по подразбиране с Turbopack — вижте „Ресурси по време на изграждане“ по-долу)                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Среда за изпълнение в продукция със самостоятелния изходен пакет на Next.js. **Не са включени CLI инструменти на доставчици.**                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Добавя `git`, `docker.io`, `docker-compose` и глобални CLI инструменти: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Изберете това за агентни работни процеси.**                                                                                                       |
| `runner-web`  | `runner-base`         | Добавя Playwright и браузър Chromium (`--with-deps`) за доставчици на уеб сесии: `gemini-web`, `claude-web`, `claude-turnstile`. **Изберете това, когато използвате тези доставчици** — стандартният образ се проваля при заявка без него (вижте бележката за `-web` под „Канали за издания“). |

Изграждане на конкретна цел ръчно:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси по време на изграждане

Три аргумента за изграждане контролират ресурсите, използвани от етапа `builder`. Те се прилагат само по време на изграждане —
`OMNIROUTE_MEMORY_MB` (по-долу) е отделна настройка за средата на изпълнение.

| Аргумент за изграждане      | По подразбиране | Ефект                                                                                                         |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` изгражда с webpack: по-нисък пик на паметта, но по-бавно. `1` включва Turbopack.                          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Горна граница на heap паметта на V8 (`--max-old-space-size`) за стартирания `next build`.                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Подава стойност към `CIRCLE_NODE_TOTAL`; Next извежда `workers = N - 1` за събирането на данни за страниците. |

`OMNIROUTE_BUILD_WORKERS` е настройката, която трябва да увеличите при мощна машина за изграждане, и тази, която трябва да
проверите, когато изграждане с ограничени ресурси прекъсне **след** `✓ Compiled successfully`. Всеки
работен процес за данни на страници е отделен процес, както и самият родителски процес `next build`;
възпроизвеждане на работещ VPS (проблем #7518) измери пиковата RSS стойност на всеки процес на
~4.5 GB независимо от флага за heap паметта `NODE_OPTIONS` (Turbopack компилира в
собствена/Rust памет извън heap паметта на V8). Стойността по подразбиране `2` (→ 1 работен процес, общо 2
процеса) е оразмерена за хостваните от GitHub изпълняващи среди с 16 GB / 4 vCPU, които
конвейерът за публикуване използва. При `8` (→ 7 работни процеса) тази изпълняваща среда изчерпа паметта и
buildkit прекрати стъпката с `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 работни процеса) отново не се побра, след като RSS на процес беше измерена
директно, вместо да бъде изчислена косвено. `tests/unit/docker-build-memory-budget.test.ts`
извършва изчисленията спрямо измерената стойност и се проваля, ако която и да е от настройките
надхвърли ресурсите на изпълняващата среда.

Turbopack компилира в собствена Rust памет, която се намира **извън** heap паметта на V8, затова
`OMNIROUTE_BUILD_MEMORY_MB` не я ограничава. На хост с ограничение на паметта
изграждането впоследствие бива прекратено със SIGKILL от OOM механизма без никакъв текст за грешка — то просто
спира по средата на `Creating an optimized production build`, което изглежда като блокиране, а не
като недостиг на памет. Ето защо `Dockerfile` използва webpack по подразбиране
(`OMNIROUTE_USE_TURBOPACK=0`), за разлика от `npm run dev` / `npm run build`, където
Turbopack е стойността по подразбиране в кода: обикновена команда `docker build .` без аргументи за изграждане (каквато
изпълняват Railway и други хостове с разгръщане с едно щракване) не трябва да прекъсва без съобщение на
машина за изграждане с ограничена памет. Публикуваните образи вече задават изрично
`OMNIROUTE_USE_TURBOPACK=0` в `docker-publish.yml`. На машина за изграждане с достатъчно RAM включете
Turbopack за по-бързо изграждане:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` е активиран, затова `next build` изпълнява родителски **и** работен
процес, като всеки от тях спазва `OMNIROUTE_BUILD_MEMORY_MB` поотделно. Задайте лимита на контейнера
над приблизително два пъти тази стойност, а не само над самата стойност.

Измерено за това дърво (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Пакетиращ инструмент | Лимит на контейнера | Резултат                                               |
| -------------------- | ------------------- | ------------------------------------------------------ |
| Turbopack            | 8 GiB / 16 GiB      | Прекратено от OOM и при двата лимита, без съобщение    |
| webpack              | 8 GiB               | Работният процес за изграждане е прекратен със SIGKILL |
| webpack              | 12 GiB              | Успешно, с пик от 11.1 GiB                             |

### Настройки по подразбиране по време на изпълнение

Настройки по подразбиране, експортирани от `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Поведение на паметта в Docker:

- Образът задава `OMNIROUTE_MEMORY_MB=1024` и извежда от него `NODE_OPTIONS=--max-old-space-size=1024`.
- Действителният сървърен процес се стартира от самостоятелната програма за стартиране, която прочита `OMNIROUTE_MEMORY_MB` и добавя `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node използва последната повторена стойност на `--max-old-space-size`, така че задаването на `OMNIROUTE_MEMORY_MB` контролира ефективното ограничение на heap паметта в Docker.
- Тъй като образът винаги го задава, собственият резервен механизъм на програмата за стартиране, калибриран спрямо RAM, никога не се прилага под Docker. Увеличете го изрично според натоварването (таблицата по-долу). `2048` все още е твърде малко за `/v1/responses` на агенти за програмиране.

### Оперативна RAM за агенти за програмиране

Стойността по подразбиране от 1 GiB за Docker е минималната за таблото за управление и леки чатове, а не размер за продукционна среда. Дългите тела на `POST /v1/responses` (стотици съобщения, десетки инструменти) задържат множество графи в паметта по време на компресирането. Две припокриващи се заявки с размер ~3 MiB / ~750k токена са прекъсвали V8 при **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) и също са достигали OOM ограничението на cgroup от 16 GiB. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Задайте **cgroup `--memory` над размера на heap паметта** — нативните буфери, SQLite и междинните данни при компресиране се намират извън V8.

| Натоварване                                       | `OMNIROUTE_MEMORY_MB`             | Контейнер / cgroup                       | Бележки                                                                                                                                |
| ------------------------------------------------- | --------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Табло за управление, един лек чат                 | `1024` (по подразбиране в образа) | ≥2 GiB                                   |                                                                                                                                        |
| Един агент за програмиране (Claude/Codex/Grok)    | `8192`                            | ≥10 GiB                                  | Типична едносесийна заявка към `/v1/responses`                                                                                         |
| Две едновременни дълги заявки към `/v1/responses` | `10240`–`12288`                   | ≥12–16 GiB                               | Измерено прекъсване на V8 при ~12 GiB heap памет                                                                                       |
| Три или повече едновременни дълги контекста       | не използвайте един процес        | изпълнявайте последователно / повече RAM | По подразбиране се допуска 1 изпълнявана тежка заявка; увеличаването на тази стойност без допълнителна RAM отново води до прекъсването |

`omniroute serve` на физическа машина се калибрира до ~35% от RAM (ограничено в диапазона `[512, 4096]`), когато `OMNIROUTE_MEMORY_MB` **не е зададена**. Docker винаги задава `1024`, така че това калибриране никога не се изпълнява в официалния образ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Обратен прокси в подпът (Traefik / nginx)

`basePath` на Next.js се компилира в самостоятелния пакет. OmniRoute записва вградената
стойност в sentinel файл в основната директория на приложението (записван по време на `npm run build`; прочитан от
`scripts/docker/ensure-docker-base-path.mjs`) и я сравнява с
`OMNIROUTE_BASE_PATH` при стартиране на контейнера. Когато стойностите се различават и образът е
създаден за корена на домейна, entrypoint скриптът пренаписва самостоятелните манифести,
вградените литерали `basePath`/`assetPrefix` (Next 16 визуализира URL адресите на SSR ресурсите само от
`assetPrefix` — коригиращият скрипт копира подпътя и в него), вградените
URL адреси на ресурсите в `/_next/static` (манифести с клиентски референции, импорти на медийни файлове, предварително визуализирани
страници за грешки) и клиентския shim за `process.env`, преди да се изпълни `node dev/run-standalone.mjs`.

### Изграждане с Compose (препоръчително)

Задайте и двете променливи в `.env`, след което изградете отново, така че образът и средата за изпълнение да съвпадат:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` предава `OMNIROUTE_BASE_PATH` като аргумент за изграждане на Docker и като
променлива на средата за изпълнение.

### Предварително изграден root образ + подпът по време на изпълнение

Публикуваните образи `diegosouzapw/omniroute:*` са изградени за корена на домейна. Все пак можете
да зададете `OMNIROUTE_BASE_PATH` по време на изпълнение; контейнерът коригира пакета еднократно при стартиране.
Комбинирайте го със съответстващия публичен origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Конфигурирайте обратния прокси да препраща **пълния** външен път (не премахвайте
префикса). Traefik трябва да маршрутизира `PathPrefix(`/omniroute`)` към контейнера без
`StripPrefix`, така че Next.js да получава `/omniroute/...` и да обслужва ресурсите от
`/omniroute/_next/...`.

Docker healthcheck проверява олекотената крайна точка `/healthz` за жизнения цикъл с префикс
от активния `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остава налична за
диагностика от потребители/табла за управление; за да насочите HEALTHCHECK на контейнера обратно към нея (например
за задълбочена проверка на състоянието), задайте `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Този път извършва **задълбочена** проверка (БД + обобщение от наблюдението) — подходяща за редкия
`HEALTHCHECK` на Docker, ако решите отново да я използвате, но **не** и за интервалите на Kubernetes `livenessProbe`.

За оркестратори (Kubernetes, Nomad и др.):

| Проверка             | За предпочитане                                                              | Избягвайте                                                         |
| -------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Жизненост            | HTTP `GET /livez` или TCP на основния порт (`PORT`, по подразбиране `20128`) | `/api/monitoring/health` като проверка за жизненост                |
| Готовност            | HTTP `GET /healthz`                                                          | Кратки изчаквания, които приемат за мъртъв зает цикъл на събитията |
| Задълбочена / външна | `/api/monitoring/health`                                                     | —                                                                  |

`/healthz` отчита жизнения цикъл на процеса (`ok` / `starting` / `stopping`). `/livez` проверява
само дали процесът е жив (200 винаги когато обработчикът може да се изпълни; не изчаква
готовност). И двете все пак се изпълняват в същия Node цикъл на събитията като обработката на заявките, така че
натоварваща процесора работа по каталога или компресирането може да ги забави — зает ≠ мъртъв. Предпочитайте TCP
проверка за жизненост, ако HTTP проверките изтичат по време. Пълни насоки за проверките:
[Ръководство за наблюдение — препоръки за проверки на Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose с Caddy (автоматичен TLS за HTTPS)

OmniRoute може да бъде публикуван защитено чрез автоматичното предоставяне на SSL от Caddy. Уверете се, че DNS записът от тип A на домейна ви сочи към IP адреса на сървъра ви.

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
      # Публичният адрес, достъпен от браузъра, за OAuth обратни извиквания, връзки към таблото и генерирани публични URL адреси.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Вътрешен URL адрес между сървърите за планирани задачи / заявки към самата услуга.
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

Caddy задава стандартните заглавки за препращане към контейнера нагоре по веригата. OmniRoute използва
`NEXT_PUBLIC_BASE_URL` като каноничен публичен източник за OAuth обратни извиквания и генерирани публични
връзки; удостоверените операции за запис от таблото използват заявки от същия източник и обвързана със сесията CSRF
защита. Активирайте `OMNIROUTE_TRUST_PROXY` само за разширени внедрявания, при които умишлено
искате OmniRoute да извлича публичния източник от доверени препратени заглавки вместо от изрична
конфигурация.

## Бърз тунел на Cloudflare

Поддръжката в таблото за внедрявания с Docker включва **бърз тунел на Cloudflare** с едно щракване в `Табло → Крайни точки`. При първото активиране `cloudflared` се изтегля само когато е необходимо, стартира се временен тунел към текущата ви крайна точка `/v1` и генерираният URL адрес `https://*.trycloudflare.com/v1` се показва директно под обичайния ви публичен URL адрес.

Панелите за тунели на крайните точки (Cloudflare, Tailscale, ngrok) могат да се показват или скриват от `Настройки → Облик`, без да се променя състоянието на активния тунел.

### Бележки за тунелите

- URL адресите на бързите тунели са временни и се променят след всяко рестартиране.
- Бързите тунели не се възстановяват автоматично след рестартиране на OmniRoute или контейнера. Активирайте ги отново от таблото, когато е необходимо.
- Управляваната инсталация понастоящем поддържа Linux, macOS и Windows на `x64` / `arm64`.
- Управляваните бързи тунели по подразбиране използват HTTP/2 транспорт, за да се избегнат многобройните предупреждения за UDP буфера на QUIC в ограничени контейнерни среди. Задайте `CLOUDFLARED_PROTOCOL=quic` или `auto`, ако искате различен транспорт.
- Docker образите включват системните коренови CA сертификати и ги предоставят на управлявания `cloudflared`, което предотвратява грешки при TLS удостоверяването, когато тунелът се инициализира в контейнера.
- Задайте `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, ако искате OmniRoute да използва съществуващ изпълним файл, вместо да изтегля такъв.

## Тагове на образите

| Образ                    | Таг      | Размер | Описание                                                     |
| ------------------------ | -------- | ------ | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Най-високата **публикувана** стабилна SemVer (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Фиксирайте този клас тагове за GitOps                        |

Мултиплатформен манифест: вградена поддръжка на `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker избира съответстващата архитектура автоматично; подайте `--platform linux/amd64`, ако трябва принудително да използвате AMD64 емулация на ARM хостове.

### Канали за издания

OmniRoute публикува отделни Docker канали за стабилни издания, тестване на активния клон за издания и компилации за разработка.

| Канал                           | Източник                                     | Изменяемост                                | Препоръчителна употреба                                                                                                            |
| ------------------------------- | -------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Подписано/версионирано издание               | Неизменяем                                 | Продукционни внедрявания, фиксирани към точно определено издание                                                                   |
| `:latest` / `:latest-web`       | Най-високата **публикувана** стабилна SemVer | Изменяем стабилен указател                 | Следва стабилните издания **след** задача за публикуване на SemVer — **не** следва `main` или непубликувани промени в `release/v*` |
| `:next` / `:next-web`           | Текущият стандартен клон `release/v*`        | Изменяем указател за предварително издание | Тестване на корекции, включени в активния клон за издания, но все още невключени в стабилно издание                                |
| `:main` / `:main-web`           | Клонът `main`                                | Изменяем указател за разработка            | Само за разработка и интеграционно тестване                                                                                        |

#### Доставчици с уеб сесии: образите `-web`

Всеки канал по-горе има и вариант с таг `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), изграден от етапа `runner-web` — същият образ плюс Playwright и браузъра Chromium. Стандартният образ се доставя **без** Chromium; `gemini-web`, `claude-web` и `claude-turnstile` се нуждаят от него.

Грешката възниква при използване, а не при стартиране: тези доставчици изброяват моделите си и се показват като свързани в таблото, като едва първата заявка завършва неуспешно със

```
[500]: Неуспешно зареждане на външния модул playwright: Грешка: Модулът не може да бъде намерен
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако използвате тези доставчици, изтеглете тага `-web` на канала, който вече използвате — нищо друго не се променя. При инсталация чрез npm/CLI (без Docker образ) еквивалентният липсващ компонент е изпълнимият файл на браузъра: изпълнете `npx playwright install chromium` на хоста.

#### Използване на канала за предварителни издания

Каналът `next` се изгражда наново при всяко качване към текущия подразбиращ се клон `release/v*` и се публикува както за AMD64, така и за ARM64. По-старите клонове за поддръжка не могат да го презапишат. Каналът предоставя образ, който може да бъде изтеглен и съдържа корекциите, слети в активния клон на изданието, преди да бъде създаден следващият стабилен таг.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose заменете тага на образа, използван от избрания профил, след което изтеглете и създайте услугата отново:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безопасност и връщане към предишна версия

`next` е плаващ канал за предварителни издания. Той може да се промени при всяко качване към активния клон на изданието и **не се поддържа за използване в продукционна среда**. Фиксирайте хеша на образа, докато оценявате конкретна компилация:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Преди тестване архивирайте тома с данни на OmniRoute или монтираната чрез bind директория с данни. За да се върнете към предишна версия, възстановете използваната преди това стабилна версия или хеш и създайте контейнера отново:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Компилация от клон на издание никога не може да премести `latest`; само отговаряща на условията стабилна семантична версия може да премести указателя към стабилното издание. Образите `next` запазват проверката на образа на изданието и блокиращия механизъм при уязвимости с ниво CRITICAL.

**`latest` не е гаранция за актуалност спрямо git.** Слетите корекции в `main` или в активния клон `release/v*` **не** са включени в `:latest`, докато не бъде публикуван стабилен SemVer образ и задачата за публикуване не премести `:latest` към него (със същия хеш като съответния SemVer). Ако `latest` изглежда непроменен, докато GitHub вече показва корекцията, изтеглете `:next`, за да тествате клона на изданието, или изчакайте SemVer тага.

| Какво искате                                                                                  | Използвайте                              |
| --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / продукционна среда, която не трябва да се отклонява                                  | Фиксирайте `:X.Y.Z` (или хеша на образа) |
| Следване на публикуваните стабилни издания и приемане на повторно създаване при всяко издание | `:latest`                                |
| Тестване на непубликувани комити от `release/v*`                                              | `:next` (не за продукционна среда)       |
| Тестване на `main`                                                                            | `:main` (не за продукционна среда)       |

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

## Наличност: SQLite по подразбиране е с една реплика

Стандартната Docker / Kubernetes конфигурация на OmniRoute представлява **един Node процес + един SQLite процес за запис**. Висока наличност **не се поддържа** при тази топология.

| Ограничение                                                     | Последствие                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Един процес за запис                                            | **Не** изпълнявайте множество реплики с един и същ SQLite файл. Това поврежда базата данни.                                                                                                                                                                                                                                                             |
| Повторно създаване / рестартиране / прекратяване от HEALTHCHECK | **Пълно прекъсване** на активните SSE връзки, сесиите на таблото и състоянието в паметта. Връзката на всеки свързан клиент се прекъсва. Новите заявки през периода без активна крайна точка получават от обратния прокси **`502 Bad Gateway: Unknown error`**, а не OmniRoute JSON — клиентите не могат да различат това от срив на доставчик (#11015). |
| Същият event loop като `/healthz`                               | Натоварена операция на каталога или цикъл на компресиране може да забави проверките; кратък timeout след това рестартира **единствената** реплика.                                                                                                                                                                                                      |

**Матрица на проверките** (вижте също [Препоръки за проверки в Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Проверка              | Цел                                                                             | Да не се използва                                                     |
| --------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Работоспособност      | TCP на `PORT` (по подразбиране `20128`) или щадяща HTTP проверка към `/healthz` | `/api/monitoring/health`                                              |
| Готовност             | HTTP `GET /healthz`                                                             | Кратки timeout периоди, които третират зает event loop като неработещ |
| Задълбочена / за хора | `/api/monitoring/health`                                                        | Автоматизирана kubelet проверка за работоспособност                   |

**Надстройки:** очаквайте всяка сесия да бъде прекъсната. Постепенно изключете клиентите, ако можете; при SQLite по подразбиране няма поетапно обновяване. Compose `restart: unless-stopped` заедно с Docker `HEALTHCHECK` също ще замени единствения процес, когато контейнерът е Unhealthy — със същия обхват на прекъсването.

Kubernetes фрагмент за **една реплика** (изисква се Recreate; не увеличавайте `replicas` при един SQLite файл):

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

Изчакването чрез `preStop` позволява на kube да премахне крайните точки на Service преди SIGTERM, така че **новият** трафик да спре да достига до прекратяващия се процес. Текущите SSE връзки към `/v1/responses` се изчакват да приключат до `SHUTDOWN_TIMEOUT_MS` (по подразбиране 30 s) чрез heavyweight admission leases (#11015). Новите заявки, които все пак достигнат до процеса, получават `503` + `Retry-After: 5`. Празният интервал без крайни точки при Recreate, докато заместващият процес стане Ready, остава пълно прекъсване на услугата — това се дължи на топологията със SQLite, а не на неправилна конфигурация на проверките.

Външен Postgres / HA с множество записващи процеси **не** е документиран стандартно поддържан вариант. Ако се нуждаете от HA, запазете една реплика или използвайте топология, която проектът е тествал и документирал отделно. Работата по Postgres/MySQL се проследява в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Докато това не бъде реализирано, единственият поддържан начин за увеличаване на капацитета за **големи** `/v1/responses` е чрез N независими процеса (в следващия раздел), а не чрез `replicas > 1` върху един том.

## Хоризонтално мащабиране: N независими процеса

Един Node процес е **една V8 динамична памет**. Две припокриващи се заявки на coding-agent с размер ~3 MiB / ~750k токена към `POST /v1/responses` (RTK + Caveman) сриват тази динамична памет при ~12 Gi (`FATAL ERROR: Reached heap limit`) и могат да причинят OOM в cgroup с 16 Gi. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Това измерване е предупреждение за **бюджета на паметта**, а не твърд продуктов максимум от две едновременни дълги заявки към `/v1/responses`. Допускането на тежки чат заявки се ограничава чрез автоматично изчислен бюджет за байтовете при приемане (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), оразмерен спрямо същия лимит на V8/cgroup — увеличаването му чрез ръчна настройка (или задаването на стария лимит за брой заявки `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) при вече оразмерен процес отново води до срив. Малките чатове, `/healthz`, `/v1/models` и MCP **не** са включени в този лимит.

### Един процес: повече от две дълги заявки към `/v1/responses`

Един **нормално работещ** процес (динамична памет под `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, по подразбиране `0.75`) **може** да изпълнява повече от две едновременни дълги заявки към `POST /v1/responses`, когато в общия за процеса бюджет за байтове на текущите заявки (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) все още има място. Телата с размер, равен на или по-голям от `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (по подразбиране 256 KiB), заемат същия слот за тежки заявки като структурно сложните заявки и използват същия механизъм за заобикаляне `tryAcquireHealthyHeadroom` от [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетки едновременни дълги SSE клиенти (операторите често се нуждаят от 40–50) са въпрос на **бюджет на паметта** — оразмерете динамичната памет + основните/резервните слотове + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — а не твърд продуктов лимит „максимум 2“. Процес с натоварена динамична памет продължава да отхвърля заявки с позволяващ повторен опит отговор `503`, така че проблемът от #7849 да не се повтори.

За да **умножите динамичните памети** (независими V8 old-space области) **още сега**:

| Правете                                                                                                                                                                                                                                | Не правете                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Изпълнявайте **N контейнера/pod-а**, всеки със собствен `DATA_DIR` / том                                                                                                                                                               | Не задавайте `replicas > 1` за един SQLite файл                                           |
| Оразмерявайте тежките текущи заявки + резервния капацитет при нормална работа според динамичната памет / бюджета за байтове на текущите заявки; 1–2 е консервативната стойност по подразбиране от #7849, а не твърд продуктов максимум | Не предоставяйте на един процес 8× RAM и неограничен лимит за броя заявки                 |
| По избор: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за **споделени броячи на квоти**                                                                                                                                        | Не третирайте Redis като споделен SQLite — той не е такъв                                 |
| Дублирайте тайните за доставчиците във всяка инстанция (или приемете разделени табла за управление)                                                                                                                                    | Не очаквайте едно табло за управление / един регистър на извикванията за всички инстанции |
| Поставете отпред произволен балансьор на натоварването; достатъчно е фиксиране по API ключ или сесия                                                                                                                                   | Не изисквайте специфичен за доставчика middleware, съобразен с размера                    |

Хардуер: броят на едновременните дълги заявки към `/v1/responses` за всяка инстанция е въпрос на **бюджет на паметта** (динамична памет + байтове на текущите заявки / #10110). `N` независими `DATA_DIR` все пак умножават динамичните памети: RAM паметта на хоста трябва да покрива `N × cgroup`, а не „един pod с 16 Gi и N=8“. Никога не използвайте `replicas > 1` за един SQLite файл.

Примерна Compose конфигурация (две динамични памети, два тома — не `deploy.replicas: 2`):

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
      QUOTA_STORE_REDIS_URL: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Плътността в рамките на процеса (компресията извън HTTP isolate) се проследява в [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Един логически клъстер върху споделено устойчиво състояние се проследява в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
