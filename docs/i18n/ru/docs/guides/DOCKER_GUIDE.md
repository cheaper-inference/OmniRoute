# 🐳 Docker Guide — OmniRoute (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Полное справочное руководство по развертыванию Docker. Для быстрого старта см. [раздел Docker в README](../README.md#-docker).

## Содержание

- [Быстрый запуск](#quick-run)
- [С файлом окружения](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Доступные профили](#available-profiles)
- [Настройка инструментов CLI хоста при запуске OmniRoute в Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Вспомогательный контейнер Redis](#redis-sidecar)
- [Compose для продакшена](#production-compose)
- [Стадии Dockerfile](#dockerfile-stages)
- [Критически важные переменные окружения](#critical-environment-variables)
- [Docker Compose с Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Быстрый туннель Cloudflare](#cloudflare-quick-tunnel)
- [Теги образов](#image-tags)
- [Обновления панели управления в Docker](#dashboard-updates-in-docker)
- [Доступность: SQLite по умолчанию поддерживает только одну реплику](#availability-default-sqlite-is-single-replica)
- [Региональные ошибки Gemini внутри Docker](#gemini-regional-errors-inside-docker)
- [Важные примечания](#important-notes)

---

## Быстрый бег

> **Самостоятельный хостинг в одной команде?** См. [руководство по самостоятельному хостингу](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (опубликованное изображение + Redis, только петлевая проверка, без выбора профиля). Приведенный ниже быстрый запуск представляет собой путь с одним контейнером для пользователей, которые уже запускали Redis где-либо еще.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## С файлом среды

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
# Базовый профиль (без инструментов CLI)
docker compose --profile base up -d

# Профиль CLI (встроенные Claude Code, Codex и OpenClaw)
docker compose --profile cli up -d

# Профиль хоста (прежде всего для Linux; монтирует двоичные файлы CLI хоста только для чтения)
docker compose --profile host up -d

# Веб-профиль (Chromium/Playwright для провайдеров веб-сеансов)
docker compose --profile web up -d

# Совместное использование CLI и вспомогательного контейнера CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Доступные профили

OmniRoute предоставляет профили Compose для основных вариантов развертывания. Выберите профиль, соответствующий вашей среде.

| Профиль               | Сервис           | Когда использовать                                                                                                                                                      | Команда                                      |
| --------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (по умолчанию) | `omniroute-base` | Безголовый сервер / минимальная среда выполнения, без встроенных CLI провайдеров                                                                                        | `docker compose --profile base up -d`        |
| `cli`                 | `omniroute-cli`  | Агентные рабочие процессы, вызывающие `omniroute providers/setup/doctor` и встроенные CLI (Codex, Claude Code, Droid, OpenClaw)                                         | `docker compose --profile cli up -d`         |
| `host`                | `omniroute-host` | Хосты Linux, которым необходим аналогичный `network_mode` доступ к CLI хоста посредством монтирования `~/.local/bin`, `~/.codex`, `~/.claude` и т. д. только для чтения | `docker compose --profile host up -d`        |
| `cliproxyapi`         | `cliproxyapi`    | Запуск вспомогательного контейнера [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) на порту `8317` для проксирования вышестоящих CLI                        | `docker compose --profile cliproxyapi up -d` |
| `web`                 | `omniroute-web`  | Провайдеры веб-сеансов, которым требуется браузер: `gemini-web`, `claude-web`, `claude-turnstile` (собирает `runner-web`, Chromium включен)                             | `docker compose --profile web up -d`         |

> Можно объединять несколько профилей: `docker compose --profile cli --profile cliproxyapi up -d`.

## Настройка CLI-инструментов хоста, когда OmniRoute работает в Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и кнопка
**Сохранить конфигурацию** на панели управления записывают файлы наподобие `~/.codex/*.config.toml`. Эти пути
имеют смысл только на машине, где фактически работает CLI. Если запустить
эти команды внутри контейнера, запись будет выполнена в собственный домашний каталог контейнера (`/home/node` —
образ работает от имени `USER node`), откуда ни один CLI на хосте никогда не прочитает данные и где они будут
удалены при пересоздании контейнера.

OmniRoute обнаруживает такую ситуацию и вместо сообщения об успехе, которым невозможно
воспользоваться, отклоняет запись и выводит инструкции: CLI завершается с кодом `2`, а API отвечает `422`
с `containerEphemeralTarget: true`.

### Рекомендуемый вариант: запускать CLI на хосте, а OmniRoute — в Docker

Контейнер предоставляет API, а CLI настраивает ваши инструменты на хосте.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # направить CLI на контейнер
omniroute setup-codex                      # записывает данные в настоящий каталог ~/.codex на вашем хосте
```

Это правильный выбор, когда Codex, Claude Code, Cursor или аналогичные инструменты работают на вашем
ноутбуке — а это обычная конфигурация.

### Альтернатива: bind-монтирование каталогов конфигурации хоста (профиль `host`)

Если вы хотите, чтобы сам контейнер записывал конфигурацию на хост, подключите
каталоги через монтирование и укажите корень монтирования в `CLI_CONFIG_HOME`. Профиль `host`
уже настроен таким образом:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Именно bind-монтирование делает путь доверенным: OmniRoute читает
`/proc/self/mountinfo` и разрешает запись в смонтированные пути (а также в каталоги,
дочерние элементы которых являются точками монтирования, что в точности соответствует приведённой выше структуре `/host-home`), при этом
по-прежнему отклоняя запись в несмонтированные пути.

### Обходной вариант: настройка собственных CLI контейнера (используйте с осторожностью)

Если CLI действительно находятся внутри контейнера (профиль `cli`), такая запись
является намеренной. Передайте `--allow-container-write` любой команде `setup-*` или задайте
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` для сервера. Запись будет выполнена
с предупреждением о том, что она не сохранится после удаления контейнера.

> **Предупреждение о безопасности — профиль `cli` + монтирование `docker.sock`.**
> Профиль `cli` bind-монтирует `/var/run/docker.sock`, чтобы работающий внутри контейнера
> модуль автоматического обновления мог пересоздавать стек через демон хоста
> (`src/lib/system/autoUpdate.ts` проверяет наличие этого сокета и не использует
> путь Docker, если сокет отсутствует). Этот сокет является **границей доверия с root-доступом
> к хосту**: всё, что может получить к нему доступ, управляет демоном Docker на хосте от имени
> root — и может создавать, проверять, останавливать и удалять любые контейнеры на хосте.
> Следствия:
>
> 1. **Никогда не открывайте порт профиля `cli` для доступа из сети.** Публикуйте
>    его на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — профиль `cli`, доступный из локальной сети, превращает любую возможность RCE на уровне панели управления
>    в полную компрометацию хоста.
> 2. **Не подключайте дополнительные каталоги хоста к профилю `cli`.**
>    Сокет Docker в сочетании с любым дополнительным монтированием предоставляет контейнеру полный
>    доступ на чтение и запись к вашей файловой системе и конфигурации хоста. Если инструменту требуется
>    доступ к проекту, запускайте его локально с помощью исполняемого файла CLI — не монтируйте проект
>    в контейнер `cli`.
>
> Если вам не требуется автоматическое обновление внутри контейнера, не включайте профиль `cli`
> (`COMPOSE_PROFILES=core,redis` или более короткий вариант). Остальные профили не
> монтируют сокет Docker.
>
> Связанную модель угроз для MITM см. в `docs/security/MITM-TPROXY-DECRYPT.md` (git; не включается в собранный каталог `/docs`),
> а цепочку происхождения бинарных файлов `codex`/`claude-code`/`droid`/`openclaw` —
> в `docs/security/SUPPLY_CHAIN.md`.

## Сайдкар Redis

OmniRoute использует Redis для обеспечения работы распределённого ограничителя частоты запросов и общего кэша. Сервис `redis` **всегда определён** в `docker-compose.yml` (он не ограничен профилем) и запускается вместе с любым другим профилем.

| Параметр                                | Значение                                     |
| --------------------------------------- | -------------------------------------------- |
| Образ                                   | `redis:7-alpine`                             |
| Имя контейнера                          | `omniroute-redis`                            |
| Внутренний порт                         | `6379`                                       |
| Порт хоста (переопределяемый)           | `REDIS_PORT` (по умолчанию `6379`)           |
| Адрес привязки хоста (переопределяемый) | `REDIS_BIND_HOST` (по умолчанию `127.0.0.1`) |
| Том                                     | `omniroute-redis-data` → `/data`             |
| Проверка работоспособности              | `redis-cli ping` (интервал 10 с)             |

Связанные переменные окружения:

- `REDIS_URL` — строка подключения, передаваемая приложению (по умолчанию `redis://redis:6379`).
- `REDIS_PORT` — порт хоста, сопоставленный с контейнером Redis.
- `REDIS_BIND_HOST` — сетевой интерфейс хоста, на котором публикуется порт. По умолчанию `127.0.0.1`.

> **Почему по умолчанию используется loopback-интерфейс:** сайдкар запускается без `requirepass`, а контейнеры
> приложения обращаются к нему через сеть Compose (`redis:6379`) — опубликованный порт
> нужен только для инструментов на стороне хоста (`redis-cli`, локальный `npm run dev`). Публикация на
> `0.0.0.0` сделала бы Redis без аутентификации доступным каждому хосту в вашей локальной сети. Если вы задаёте
> `REDIS_BIND_HOST=0.0.0.0`, также добавьте `--requirepass` в `command:` сервиса.

**Отключать Redis** не рекомендуется (ограничитель частоты запросов переключится на менее эффективный резервный вариант в памяти). Если это необходимо, удалите или закомментируйте блок сервиса `redis:` в `docker-compose.yml` либо уменьшите количество его экземпляров до нуля:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Для изолированного production-снимка, работающего параллельно со средой разработки, используйте `docker-compose.prod.yml`.

| Параметр                            | Значение                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Файл                                | `docker-compose.prod.yml`                                                                        |
| Порт панели управления по умолчанию | `PROD_DASHBOARD_PORT=20130` (сопоставляется с внутренним `${DASHBOARD_PORT:-20128}`)             |
| Порт API по умолчанию               | `PROD_API_PORT=20131`                                                                            |
| Образ                               | `omniroute:prod` (собирается из целевого этапа `runner-cli`)                                     |
| Контейнер Redis                     | `omniroute-redis-prod` (`redis:8.6.2`, выделенный том `redis-prod-data`)                         |
| Том данных                          | `omniroute-prod-data` (именованный, сохраняется при повторных сборках)                           |
| Проверки работоспособности          | `node healthcheck.mjs` + `redis-cli ping`, при этом `depends_on` ожидает успешной проверки Redis |

Использование:

```bash
# Сборка и запуск production-стека
docker compose -f docker-compose.prod.yml up -d --build

# Потоковый просмотр журналов
docker compose -f docker-compose.prod.yml logs -f

# Остановка и удаление стека (с сохранением томов)
docker compose -f docker-compose.prod.yml down
```

Production-стек работает параллельно со средой разработки Compose (используются другие имена контейнеров, порты и тома), поэтому можно продолжать локальную разработку, не останавливая production-среду.

## Этапы Dockerfile

В репозитории поставляется многоэтапный файл Dockerfile (`Dockerfile`). Выявлены четыре этапа; выберите правильный `target` для вашего случая использования.

| Этап          | Базовое изображение   | Цель                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Устанавливает deps (`npm ci --legacy-peer-deps`) и запускает `npm run build` (Turbopack по умолчанию — см. ресурсы времени сборки ниже).                                                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Рабочая среда выполнения с автономным выходом Next.js.** В комплекте нет провайдера CLIs.**                                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Добавляет `git`, `docker.io`, `docker-compose` и глобальный CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Выберите это для агентских рабочих процессов.**                                                                                                                                 |
| `runner-web`  | `runner-base`         | Добавляет Playwright + браузер Chromium (`--with-deps`) для провайдеров веб-сессий: `gemini-web`, `claude-web`, `claude-turnstile`.** Выберите это, когда пользуетесь услугами этих поставщиков.** — без него простой образ завершается с ошибкой во время запроса (см. примечание `-web` в разделе «Каналы выпуска»). |

Создайте конкретную цель вручную:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурсы времени сборки

Три аргумента сборки контролируют стоимость этапа `builder`. Они доступны только во время сборки. — `OMNIROUTE_MEMORY_MB` (ниже) — это отдельный регулятор времени выполнения.

| Построить аргумент          | По умолчанию | Эффект                                                                                                    |
| --------------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` собирает с помощью веб-пакета: меньшая пиковая нагрузка на память, медленнее. `1` выбирает Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Потолок кучи V8 (`--max-old-space-size`) для порожденного `next build`.                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Потоки `CIRCLE_NODE_TOTAL`; Далее извлекается `workers = N - 1` для сбора данных страницы.                |

`OMNIROUTE_BUILD_WORKERS` — это тот, кто поднимает ставку на крупного сборщика, и тот, кто подозревает, когда ограниченная сборка умирает** после** `✓ Compiled successfully`. Каждый обработчик страничных данных представляет собой отдельный процесс, как и сам родительский `next build` ; живое воспроизведение VPS (выпуск #7518) измеряло пиковое RSS каждого процесса при ~ 4,5 GB независимо от флага кучи `NODE_OPTIONS` (Turbopack компилируется в памяти native/Rust вне кучи V8). Значение по умолчанию `2` (→ 1 рабочий процесс, всего 2 процесса) рассчитано на 16 GB /4 vCPU размещенных на GitHub, которые использует конвейер публикации. В `8` (рабочие → 7) этому бегуну не хватило памяти, и сборочный комплект не смог выполнить шаг с `ResourceExhausted: ... cannot allocate memory`; `3` (рабочие → 2) по-прежнему не подходили, поскольку RSS для каждого процесса измерялся напрямую, а не предполагался. `tests/unit/docker-build-memory-budget.test.ts` выполняет арифметические действия с измеренным значением и терпит неудачу, если какая-либо ручка превышает бегун.

Turbopack компилируется в встроенную память Rust, которая живет** снаружи** кучу V8, поэтому `OMNIROUTE_BUILD_MEMORY_MB` не ограничивает ее. На хосте с пределом памяти сборка затем SIGKILLed выполняется утилитой OOM killer без какого-либо текста ошибки. — она просто останавливается в середине `Creating an optimized production build`, что читается как зависание, а не нехватка памяти. Вот почему `Dockerfile` по умолчанию использует веб-пакет (`OMNIROUTE_USE_TURBOPACK=0`), в отличие от `npm run dev` / `npm run build`, где Turbopack это код по умолчанию: голый `docker build .` без аргументов сборки (то, что запускают Railway и другие хосты с одним щелчком мыши) не должен молча умирать в сборщике с ограниченным объемом памяти. Опубликованные изображения уже явно передают `OMNIROUTE_USE_TURBOPACK=0` в `docker-publish.yml`. В сборщике с большим количеством RAM выберите Turbopack для более быстрой сборки:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` включен, поэтому `next build` запускает родительский** и** рабочий процесс, и каждый соблюдает `OMNIROUTE_BUILD_MEMORY_MB` отдельно. Размер потолка контейнера превышает это значение примерно в два раза, а не один раз.

Измерено на этом дереве (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Бандлер   | Контейнерный потолок | Результат                       |
| --------- | -------------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | ООМ-убит обоих, молча           |
| веб-пакет | 8 GiB                | строитель SIGKILLed             |
| веб-пакет | 12 GiB               | удалось, достиг пика в 11,1 GiB |

### Параметры времени выполнения по умолчанию

Значения по умолчанию, экспортируемые `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Поведение памяти в Docker:

- Изображение устанавливает `OMNIROUTE_MEMORY_MB=1024` и извлекает из него `NODE_OPTIONS=--max-old-space-size=1024`.
- Фактический серверный процесс запускается автономной программой запуска, которая считывает `OMNIROUTE_MEMORY_MB` и добавляет `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Узел использует последнее повторенное значение `--max-old-space-size`, поэтому установка `OMNIROUTE_MEMORY_MB` контролирует эффективный предел кучи Docker.
- Поскольку образ всегда устанавливает его, собственный резервный вариант средства запуска, откалиброванный по ОЗУ, никогда не применяется под Docker. Поднимите его явно для рабочей нагрузки (таблица ниже). `2048` все еще слишком мал для агента кодирования `/v1/responses`.

### Среда выполнения RAM для агентов кодирования

Значение по умолчанию 1 GiB Docker — это минимальный размер dashboard/light-chat, а не производственный размер. Длинные тела `POST /v1/responses` (сотни сообщений, десятки инструментов) сохраняют в памяти несколько графов во время сжатия. Два перекрывающихся запроса ~ 3 MiB / ~ на 750 тыс. токенов прервали работу V8.** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`), а также попал в 16 GiB cgroup OOM. См [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Размер** cgroup `--memory` над кучей** Собственные буферы —, SQLite и промежуточные компоненты сжатия находятся за пределами V8.

| Рабочая нагрузка                           | `OMNIROUTE_MEMORY_MB`             | Контейнер/группа            | Примечания                                                                                                  |
| ------------------------------------------ | --------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Панель управления, один легкий чат         | `1024` (изображение по умолчанию) | ≥2 GiB                      |                                                                                                             |
| Один агент кодирования (Claude/Codex/Grok) | `8192`                            | ≥10 GiB                     | Типичный односессионный `/v1/responses`                                                                     |
| Два одновременных длинных `/v1/responses`  | `10240`–`12288`                   | ≥12–16 GiB                  | Измеренное прерывание V8 в ~ 12 GiB                                                                         |
| Три параллельных длинных контекста +       | не делайте ни одного процесса     | сериализовать/подробнее RAM | По умолчанию допуск в тяжелом весе составляет 1 в полете; повышение его без RAM снова приводит к прерыванию |

`omniroute serve` на голом металле калибрует ~ 35% от RAM (зафиксированный `[512, 4096]`), когда `OMNIROUTE_MEMORY_MB`** не установлен** . Docker всегда устанавливает `1024`, поэтому калибровка никогда не выполняется в официальном образе.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Критически важные переменные окружения

Помимо значений по умолчанию, описанных в [ENVIRONMENT.md](../reference/ENVIRONMENT.md), при запуске в Docker наиболее важны следующие переменные:

| Переменная                    | Назначение                                                                                                                                                                                                                                                                                                        | Значение по умолчанию          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Общий секрет для моста WebSocket. **Обязателен в рабочей среде** — задайте стойкую случайную строку.                                                                                                                                                                                                              | не задано (необходимо указать) |
| `REDIS_URL`                   | Строка подключения к бэкенду ограничения частоты запросов / кэша                                                                                                                                                                                                                                                  | `redis://redis:6379`           |
| `REDIS_PORT`                  | Порт хоста для входящего в комплект контейнера Redis                                                                                                                                                                                                                                                              | `6379`                         |
| `REDIS_BIND_HOST`             | Интерфейс хоста, на котором публикуется порт входящего в комплект Redis (кольцевой интерфейс, если вы не добавили AUTH)                                                                                                                                                                                           | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Путь на хосте, подключаемый в профиль `cli` по адресу `/workspace/omniroute` для рабочих процессов самообновления                                                                                                                                                                                                 | `.` (текущий каталог)          |
| `OMNIROUTE_MEMORY_MB`         | Максимальный размер кучи Node во время выполнения для автономного сервера Docker; переопределяет указанное выше значение по умолчанию для образа. Для агентов программирования: `8192`+ (см. [ОЗУ среды выполнения](#runtime-ram-for-coding-agents)).                                                             | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Переопределяют опубликованные порты панели управления (20128) и API (20129)                                                                                                                                                                                                                                       | `20128` / `20129`              |
| `APP_BIND_HOST`               | Интерфейс хоста, на котором docker-compose публикует порты панели управления/API/live-WS. При `REQUIRE_API_KEY=false` (значение по умолчанию) `0.0.0.0` открывает анонимный прокси `/v1` для локальной сети — расширяйте доступ только при `REQUIRE_API_KEY=true` или наличии обратного прокси перед приложением. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Интерфейс хоста, на котором docker-compose публикует сайдкар `cliproxyapi`; его том данных содержит учетные данные поставщика.                                                                                                                                                                                    | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Каталог, который сканер плагинов среды выполнения читает и использует для установки. Задайте его, если плагины подключаются через bind mount: путь по умолчанию зависит от `HOME`, которую образ может не экспортировать.                                                                                         | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Подпуть URL, когда приложение публикуется за обратным прокси (например, `/omniroute`)                                                                                                                                                                                                                             | _(пусто = корневой путь)_      |
| `NEXT_PUBLIC_BASE_URL`        | Публичный источник для браузера, включая подпуть (например, `https://host/omniroute`)                                                                                                                                                                                                                             | не задано                      |
| `PROD_DASHBOARD_PORT`         | Порт панели управления на стороне хоста для `docker-compose.prod.yml`                                                                                                                                                                                                                                             | `20130`                        |
| `CLIPROXYAPI_PORT`            | Порт на стороне хоста для сайдкара `cliproxyapi`                                                                                                                                                                                                                                                                  | `8317`                         |

## Обратный прокси на подпути (Traefik/nginx)

Next.js `basePath` скомпилирован в автономный пакет. OmniRoute записывает запеченное значение в дозорный файл в корне приложения (записывается во время `npm run build`; читается `scripts/docker/ensure-docker-base-path.mjs`) и сравнивает его с `OMNIROUTE_BASE_PATH` при запуске контейнера. Если они различаются и образ был создан для корня домена, точка входа перезаписывает автономные манифесты, встроенные литералы `basePath`/`assetPrefix` (следующие 16 визуализируют ресурс SSR URLs только из `assetPrefix` — патчер зеркально отображает в нем подпуть), запеченный актив `/_next/static` URLs (манифесты ссылок на клиента, импорт мультимедиа, предварительно обработанные страницы ошибок) и клиентскую прокладку `process.env` перед запуском `node dev/run-standalone.mjs`.

### Создать сборку (рекомендуется)

Установите обе переменные в `.env`, затем перестройте так, чтобы изображение и среда выполнения согласовывались:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` пересылает `OMNIROUTE_BASE_PATH` как аргумент сборки Docker и как переменную среды выполнения.

### Предварительно созданный подпуть среды выполнения + к корневому образу

Опубликованные образы `cheaperinference/omniroute:*` создаются для корня домена. Вы по-прежнему можете установить `OMNIROUTE_BASE_PATH` во время выполнения; контейнер исправляет пакет один раз при запуске. Соедините его с соответствующим общедоступным источником:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Настройте обратный прокси-сервер для пересылки** полный** внешний путь (не удаляйте префикс). Traefik должен маршрутизировать `PathPrefix(`/omniroute `)` в контейнер без `StripPrefix`, чтобы Next.js получал `/omniroute/...` и обслуживал активы из `/omniroute/_next/...`.

Проверка работоспособности Docker проверяет облегченную конечную точку жизненного цикла `/healthz` с префиксом активного `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остается доступным для диагностики human/dashboard ; чтобы указать контейнеру HEALTHCHECK обратно на него (например, для глубокого обеспечения работоспособности), установите `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Этот путь представляет собой** глубокий** проверьте (сводка мониторинга DB + ) — подходит для нечастого использования Docker `HEALTHCHECK` если вы снова согласитесь, но** нет** для интервалов Kubernetes `livenessProbe`.

Для оркестраторов (Kubernetes, Nomad и т. д.):

| Зонд                 | Предпочитать                                                               | Избегать                                                                      |
| -------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| живость              | HTTP `GET /livez` или TCP на основном порту (`PORT`, по умолчанию `20128`) | `/api/monitoring/health` как живость                                          |
| Готовность           | HTTP `GET /healthz`                                                        | Жесткие тайм-ауты, которые рассматривают занятость цикла событий как мертвую. |
| Глубокий/черный ящик | `/api/monitoring/health`                                                   | —                                                                             |

`/healthz` сообщает о жизненном цикле процесса (`ok` / `starting` / `stopping`). `/livez` активен только в процессе (200 всякий раз, когда обработчик может запуститься; он не ожидает готовности). Оба по-прежнему выполняются в том же цикле событий Node, что и обработка запросов, поэтому работа по каталогизации или сжатию, связанная с ЦП ≠ может — их работу. Предпочитайте жизнеспособность TCP, если HTTP проверяет тайм-аут. Полное руководство по проверке: [Руководство по мониторингу Рекомендации по проверке — Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose с Caddy (HTTPS Auto-TLS)

OmniRoute можно безопасно открыть с помощью автоматической подготовки SSL Caddy. Убедитесь, что запись DNS A вашего домена указывает на IP вашего сервера.

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

Caddy устанавливает стандартные заголовки пересылки для вышестоящего контейнера. OmniRoute использует `NEXT_PUBLIC_BASE_URL` в качестве канонического общедоступного источника для обратных вызовов OAuth и созданных общедоступных ссылок; При записи на панель мониторинга с аутентификацией используются запросы того же источника, а также защита CSRF с привязкой к сеансу. Включайте `OMNIROUTE_TRUST_PROXY` только для расширенных развертываний, в которых вы намеренно хотите, чтобы OmniRoute получал общедоступный источник из доверенных пересылаемых заголовков вместо явной конфигурации.

## Cloudflare Быстрый туннель

Поддержка информационной панели для развертываний Docker включает в себя один щелчок мыши.**Cloudflare Быстрый туннель** на `Dashboard → Endpoints`. Первое разрешение загружает `cloudflared` только при необходимости, запускает временный туннель к вашей текущей конечной точке `/v1` и показывает сгенерированный `https://*.trycloudflare.com/v1` URL непосредственно под вашим обычным общедоступным URL.

Панели туннеля конечной точки (Cloudflare, Tailscale, ngrok) можно отображать или скрывать из `Settings → Appearance` без изменения активного состояния туннеля.

### Примечания к туннелю

- URLs Quick Tunnel являются временными и изменяются после каждого перезапуска.
- Быстрые туннели не восстанавливаются автоматически после перезапуска OmniRoute или контейнера. При необходимости повторно включите их с панели управления.
- Управляемая установка в настоящее время поддерживает Linux, macOS и Windows на `x64` / `arm64`.
- Управляемые быстрые туннели по умолчанию используют транспорт HTTP/2, чтобы избежать шумных предупреждений буфера QUIC UDP в ограниченных контейнерных средах. Установите `CLOUDFLARED_PROTOCOL=quic` или `auto` если вам нужен другой транспорт.
- Образы Docker объединяют системные корни CA и передают их управляемому `cloudflared`, что позволяет избежать сбоев доверия TLS при загрузке туннеля внутри контейнера.
- Установите `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` если хотите, чтобы OmniRoute использовал существующий двоичный файл вместо его загрузки.

## Теги изображений

| Изображение                  | Ярлык    | Размер   | Описание                                                         |
| ---------------------------- | -------- | -------- | ---------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 МБ | Самый высокий** опубликовано** стабильная SemVer (не git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 МБ | Закрепите тег этого класса для GitOps                            |

Одни и те же образы публикуются в трех репозиториях с одинаковыми дайджестами для каждой архитектуры: `cheaperinference/omniroute` (Docker Hub, организация Cheaper Inference, начиная с 3.8.53), `ghcr.io/cheaper-inference/omniroute` и устаревший `diegosouzapw/omniroute`, который хранит историю запросов и по-прежнему получает каждый выпуск. Существующие развертывания `diegosouzapw/omniroute` постоянно обновляются; переключение имени изображения не является обязательным. Канал предварительной версии `:next` / `:next-web`, представленный ниже, доступен только для `diegosouzapw/omniroute` и GHCR.

Многоплатформенный манифест: собственный `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker автоматически выбирает подходящую архитектуру; передайте `--platform linux/amd64` если вам нужно принудительно эмулировать AMD64 на хостах ARM.

### Каналы выпуска

OmniRoute публикует отдельные каналы Docker для стабильных выпусков, активного тестирования ветвей выпусков и сборок для разработки.

| Канал                           | Источник                                         | Мутабельность                               | Рекомендуемое использование                                                                                                                               |
| ------------------------------- | ------------------------------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | выпуск Signed/versioned                          | Неизменяемый                                | Производственные развертывания, фиксирующие точный выпуск                                                                                                 |
| `:latest` / `:latest-web`       | Самый высокий** опубликовано** стабильная SemVer | Изменяемый стабильный указатель             | Следит за стабильными выпусками** после** задание публикации SemVer, которое выполняет —** нет** отслеживать `main` или невыпущенные коммиты `release/v*` |
| `:next` / `:next-web`           | Текущая ветка `release/v*` по умолчанию          | Изменяемый указатель предварительной версии | Тестирование исправлений, которые попали в активную ветку выпуска, но еще не вошли в стабильную версию.                                                   |
| `:main` / `:main-web`           | филиал `main`                                    | Изменяемый указатель разработки             | Только разработка и интеграционное тестирование                                                                                                           |

#### Поставщики веб-сессий: изображения `-web`

Каждый канал выше дублируется тегом `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), созданным на этапе `runner-web` — того же изображения плюс Playwright и браузера Chromium. Простое изображение отправляется** без** хром; `gemini-web`, `claude-web` и `claude-turnstile` это нужно.

Сбой происходит отсроченно, а не во время запуска: эти поставщики перечисляют свои модели и отображаются на информационной панели как подключенные, и только первый запрос завершается с ошибкой с

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Если вы используете этих провайдеров, потяните тег `-web` канала, на котором вы уже находитесь, — больше ничего не изменится. При установке npm/CLI (без образа Docker ) эквивалентным недостающим элементом является двоичный файл браузера: запустите `npx playwright install chromium` на хосте.

#### Использование канала предварительной версии

Канал `next` перестраивается при каждом нажатии на текущую ветку `release/v*` по умолчанию и публикуется как для AMD64 так и для ARM64. Старые ветки обслуживания не могут его перезаписать. Канал предоставляет извлекаемый образ для исправлений, которые были объединены в активную ветку выпуска до того, как будет удален следующий стабильный тег.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Для Docker Compose переопределите тег изображения, используемый выбранным профилем, затем извлеките и воссоздайте сервис:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безопасность и откат

`next` — это плавающий канал предварительной версии. Он может измениться при любом нажатии на активную ветку выпуска и является** не поддерживается для производственного использования** . Закрепите дайджест изображения при оценке конкретной сборки:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Перед тестированием создайте резервную копию тома данных OmniRoute или каталога данных, смонтированного привязкой. Для отката восстановите ранее использовавшуюся стабильную версию или дайджест и воссоздайте контейнер:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Сборка релизной ветки никогда не может переместить `latest`; только подходящая стабильная семантическая версия может продвигать стабильный указатель. Образы `next` сохраняют проверку образа выпуска и блокируют ворота КРИТИЧЕСКОЙ уязвимости.

**`latest` не является гарантией валюты для git.** Объединенные исправления в `main` или в активной ветке `release/v*`** нет** в `:latest` до тех пор, пока не будет опубликован стабильный образ SemVer и задание публикации не будет продвигать `:latest` (тот же дайджест, что и SemVer). Если `latest` выглядит зависшим, в то время как GitHub уже показывает исправление, извлеките `:next` чтобы протестировать ветку выпуска, или дождитесь тега SemVer.

| Ты хочешь                                                                                | Использовать                                  |
| ---------------------------------------------------------------------------------------- | --------------------------------------------- |
| GitOps / производство, которое не должно дрейфовать                                      | Закрепите `:X.Y.Z` (или дайджест изображения) |
| Следуйте опубликованным стабильным версиям и принимайте воссоздание для каждого выпуска. | `:latest`                                     |
| Тестовые невыпущенные коммиты `release/v*`                                               | `:next` (не производство)                     |
| Тест `main`                                                                              | `:main` (не производство)                     |

## Обновления панели управления в Docker

Контейнер, запущенный из опубликованного образа, не может заменить сам себя. Когда OmniRoute обнаруживает, что работает внутри
контейнера (без рабочей копии `.git` и не как npm-установка), баннер обновления на главной панели управления вместо инструкций npm/git показывает
команду для запуска на хосте и кнопку копирования:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Имя сервиса берётся из `AUTO_UPDATE_SERVICE` (по умолчанию `omniroute` — сервис в
`docker-compose.selfhost.yml`). `pull` обновляет только плавающий тег (`latest`, `next`); при закреплённом
теге `:X.Y.Z` сначала измените тег.

### Обновление одним щелчком с помощью триггерного файла на хосте

Чтобы кнопка **Обновить сейчас** продолжала работать без монтирования `/var/run/docker.sock` (которое предоставляет контейнеру
root-доступ к хосту — см. предупреждение о профиле `cli` выше), задайте `DOCKER_UPDATE_TRIGGER_FILE` для сервиса
OmniRoute и запустите наблюдатель на хосте:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Путь должен находиться внутри `DATA_DIR` (относительные значения разрешаются относительно него); все остальные пути
отклоняются. После этого кнопка **Обновить сейчас** записывает `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` в этот
файл, возвращает ответ `202`, а панель управления опрашивает `/api/system/version`, пока новая версия не будет запущена,
после чего перезагружается. В этом режиме OmniRoute никогда не запускает команды оболочки или Docker. Как и для любого действия
обновления, запрос принимается только от клиентов из loopback-интерфейса или локальной сети.

Каталог данных, подключённый через bind mount, предоставляет хосту стабильный путь для наблюдения. Примеры юнитов `systemd`
(замените `/srv/omniroute` на каталог, содержащий ваш compose-файл и `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Наблюдение за запросами обновления OmniRoute из панели управления

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Загрузка образа и пересоздание контейнера OmniRoute

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

Сервис удаляет запрос перед загрузкой образа, чтобы неудачный запуск не зациклился. Без
`DOCKER_UPDATE_TRIGGER_FILE` панель управления сохраняет сценарий с ручным выполнением команды.

## Доступность: по умолчанию SQLite представляет собой одну реплику.

Стандартный Docker /Kubernetes OmniRoute — это** один процесс узла + один модуль записи SQLite** . Высокая доступность – это** не поддерживается** по этой топологии.

| Ограничение                                | Последствие                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Одинокий писатель                          | Делать** нет** запустить несколько реплик для одного и того же файла SQLite. Это повреждает DB.                                                                                                                                                                                                                                |
| Воссоздать/перезапустить/ HEALTHCHECK kill | **Полное отключение** текущего SSE, сеансов информационной панели и состояния в памяти. Каждый подключенный клиент падает. Новые запросы во время пустого окна конечной точки получают обратный прокси.**`502 Bad Gateway: Unknown error`** , а не OmniRoute JSON — клиенты не могут отличить это от сбоя провайдера (#11015). |
| Тот же цикл событий, что и `/healthz`      | Перегруженный каталог или тик сжатия могут задержать зондирование; короткий тайм-аут, затем перезапускает** только** реплика.                                                                                                                                                                                                  |

**Матрица зондов** (см. также [рекомендации по зондированию Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Зонд            | Цель                                                                 | Не используйте                                                                |
| --------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| живость         | TCP на `PORT` (по умолчанию `20128`) или программный HTTP `/healthz` | `/api/monitoring/health`                                                      |
| Готовность      | HTTP `GET /healthz`                                                  | Жесткие тайм-ауты, которые рассматривают занятость цикла событий как мертвую. |
| Глубокий / люди | `/api/monitoring/health`                                             | Автоматизированная жизнеспособность кубелетов                                 |

**Обновления:** ожидайте, что каждая сессия прервется. Увольняйте клиентов, если можете; в SQLite по умолчанию нет скользящих обновлений. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` также заменит единственный процесс, когда контейнер неработоспособен — тот же радиус взрыва.

Готовые манифесты и Helm-чарт живут в `deploy/kubernetes/` и `deploy/helm/omniroute/` — см. [руководство по развертыванию Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Фрагмент Kubernetes для** единственная реплика** (Необходимо повторное создание; не поднимайте `replicas` для одного файла SQLite ):

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

`preStop` Sleep позволяет Kube удалять конечные точки службы перед SIGTERM поэтому** новый** трафик перестает влиять на процесс умирания. `/v1/responses` в полете SSE истощается до `SHUTDOWN_TIMEOUT_MS` (по умолчанию 30 с) посредством аренды тяжелого доступа (#11015). Новые запросы, которые все еще достигают процесса, получают `503` + `Retry-After: 5`. Разрыв «Восстановить пустую конечную точку», пока замена не будет готова, остается серьезным сбоем — это топология SQLite, а не неправильная конфигурация зонда.

Внешний Postgres / HA с несколькими записывающими устройствами** нет** документированный путь запаса. Если вам нужен HA, сохраните одну реплику или запустите топологию, которую проект протестировал и задокументировал отдельно. Работа Postgres/MySQL находится в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). До этого момента единственный поддерживаемый способ умножения** большой** Емкость `/v1/responses` — это N независимых процессов (следующий раздел), а не `replicas > 1` на одном томе.

## Масштабирование: N независимых процессов

### владение ротацией токена Codex

Копии одной учетной записи Codex не должны независимо использовать ее одноразовый токен обновления. В экземплярах, которые используют только синхронизированные учетные данные, установите `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (псевдоним `cx`). Оставьте этот параметр отключенным для владельца одной ротации. Каждому процессу по-прежнему нужен собственный `DATA_DIR`; этот вариант не использует SQLite, не обеспечивает синхронизацию токенов или распределенную блокировку.

Пассивный экземпляр перечитывает соединение, когда требуется обновление, и принимает только другой токен доступа с неистекшим сроком действия. В противном случае обновление отключается без истечения срока действия, деактивации соединения или учета сбоя прерывателя обновления. Реальные сбои аутентификации восходящего потока по-прежнему используют обычный учет сбоев, экспоненциальное время восстановления и обычную ошибку клиента; деактивация учетной записи остается постоянной. Синхронизируйте ротированные токены владельца до истечения срока действия токенов доступа (время упреждающего обновления по умолчанию составляет пять минут) или повторно импортируйте файл аутентификации Codex. Пассивный импорт сохраняет предоставленные токены без их проверки в конечной точке токена. Ручное обновление dashboard/API возвращает `409 refresh_disabled`; новые логины OAuth не изменяются. См. [ссылку на среду](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Процесс One Node** одна куча V8** . Два перекрывающихся ~ 3 MiB / ~ кодирующий агент с 750 тысячами токенов `POST /v1/responses` (RTK + Caveman ) прерывают эту кучу на ~ 12 Ги (`FATAL ERROR: Reached heap limit`) и могут OOM cgroup 16 Ги. См. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Это измерение представляет собой** бюджет памяти** предупреждение, это не хард-макс продукта из двух одновременных длинных `/v1/responses`. Допуск в тяжеловесный чат ограничивается автоматически определяемым бюджетом принимаемых байтов (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), размер которого соответствует тому же самому потолку V8/cgroup — переопределяя его вверх (или устанавливая устаревшее ограничение количества запросов `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) для процесса уже имеющегося размера, повторно вводит прерывание. Небольшие чаты `/healthz`, `/v1/models` и MCP** нет** в этой кепке.

### Один процесс: более двух длинных `/v1/responses`

А** здоровый** процесс (куча ниже `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, по умолчанию `0.75`)** может** запускайте более двух одновременных длинных `POST /v1/responses` когда в бюджете байтов в полете для всего процесса (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) еще есть место. Тела с `OMNIROUTE_CHAT_LARGE_BODY_BYTES` или выше (по умолчанию 256 KiB) берут ту же самую тяжеловесную аренду, что и запросы с тяжелой структурой, и используют тот же escape-последовательность [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десятки одновременных длинных клиентов SSE (операторам часто требуется 40–50) — это** бюджет памяти** вопрос — размер кучи + primary/headroom слоты + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — не жесткий лимит продукта «максимум 2». Нажатая куча по-прежнему теряется с помощью повторной попытки `503` поэтому #7849 не возвращается.

К** умножать кучи** (независимые старые пространства V8)** сегодня** :

| Делать                                                                                                                                                             | Не                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Бегать** Н containers/pods** , каждый со своим** собственный** `DATA_DIR` /объем                                                                                   | Установите `replicas > 1` для одного файла SQLite                                       |
| Размер тяжелого резерва + в реальном времени из кучи/бюджета в байтах; 1–2 — это консервативное значение по умолчанию #7849, а не фиксированный максимум продукта. | Дайте одному процессу 8 × RAM и неограниченное количество счетчиков.                    |
| Необязательно: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` для** общие счетчики квот**                                                                    | Рассматривать Redis как общий SQLite — это не так.                                      |
| Дублируйте секреты поставщика в каждом экземпляре (или примите секционированные информационные панели).                                                            | Ожидайте одну панель мониторинга/один журнал вызовов для всех экземпляров.              |
| Передняя с любым балансировщиком нагрузки; достаточно закрепить ключом API или сеансом                                                                             | Требовать промежуточное программное обеспечение с учетом размера конкретного поставщика |

Привязку сеанса к учетной записи также можно распределить через Redis: установите `OMNIROUTE_SESSION_AFFINITY_STORE=redis` и `REDIS_URL` для каждого процесса с одинаковым `REDIS_KEY_PREFIX` и положительным параметром `sessionAffinityTtlMs`. Пины разрешают хешированные идентификаторы учетных записей использования для подходящего локального соединения каждого процесса, поэтому учетные записи OAuth с совпадающими метаданными идентификаторов не обязательно должны иметь соответствующее соединение IDs. Известные учетные записи имеют приоритет над противоречивыми локальными IDs при разрешении контактов и защищенном выселении; записи без личности (или выселение вызывающих абонентов без личности) сохраняют устаревшую защиту ID. Учетные записи без стабильного идентификатора использования по-прежнему требуют соответствия IDs. Ошибки Redis или вызовы, превышающие 100 мс, возвращаются к локальному SQLite. Каждое родственное хранилище Redis ограничивает число невыполненных операций до 8, обходит Redis сразу же после заполнения и освобождает слоты только после завершения основной работы, а не по истечении крайнего срока вызывающего объекта. Во время сбоя Redis не существует общей истины: каждый экземпляр возвращается к своей собственной локальной привязке, сеансы могут повторно закрепляться один раз для каждого экземпляра, а экземпляры могут расходиться. Липкость снова сходится через Redis когда он восстанавливается. Тайм-аут ограничивает ожидание, а не отправленный EVAL, который может произойти после отката. При записи маршрутизации сравнивается точное значение, полученное в результате решения о маршрутизации, а не новое чтение времени мутации; наблюдаемый промах или наблюдение резервного варианта SQLite сравнивается с отсутствующим ключом Redis. Устаревшие контакты заменяются за один CAS, поэтому поздняя команда не может заменить или удалить более новый, другой контакт. Redis читает атомарно, возвращает значение и оставшийся сервер TTL; положительный PTTL (или отсутствие срока действия) определяет жизнеспособность, а не временную метку JSON автора или часы читателя. Локальные снимки сопоставляют оставшиеся TTL с локальным крайним сроком; существующие ключи JSON остаются читаемыми, а их необработанные байты сохраняются для CAS. Redis — единственный источник истины, пока он отвечает. Подтвержденные общие обновления, касания и удаления удаляют локальную запись, никогда не устанавливают и не обновляют ее. SQLite на пути Redis хранит только собственные резервные решения этого экземпляра от ошибок Redis, тайм-аутов или насыщения доступа, как и раньше, ограниченные TTL. Отсутствие локального PIN-кода при более позднем отключении будет стоить одного нового выбора (одного промаха в кэше подсказок), а не неправильной или удаленной учетной записи. Отклоненные обновления возвращают общего победителя и оставшийся TTL атомарно: обычный выбор перепроверяет сопоставленный локальный крайний срок и использует еще живого подходящего победителя, затрагивая использование и регистрацию для этой учетной записи без другой общей записи. Если он недоступен, выбор сохраняет локального кандидата, оставляет общий контакт без изменений и выдает одно отладочное сообщение. Отклоненный CAS не записывает SQLite; При ошибках Redis, тайм-аутах или насыщении доступа вместо этого применяется существующая локальная операция. Если ответ на отправленную мутацию поступает после тайм-аута (принят, отклонен или ошибочен), синхронное точное сравнение и удаление сериализованных значений удаляет только идентичную по байту резервную строку тайм-аута. Между сравнением и удалением нет ожидания; сохраняется новая запись об отключении. Защищенное выселение удаляет собственный локальный PIN-код неудачной учетной записи даже при отключенном Redis и очищает его снова после подтверждения общего выселения. Ожидающие более ранние общие ответы не могут восстановить удаленный локальный PIN-код, поскольку общие успехи никогда не записывают SQLite. Более поздний резервный вариант отключения может повторно закрепить учетную запись; более поздняя принятая общая запись существует только в Redis. Промахи Redis не учитывают локальное резервное состояние. При выключенном драйвере вновь выбранные контакты сохраняют прежнюю форму SQLite JSON с четырьмя полями; только маршрутизация Redis добавляет хешированные идентификаторы учетной записи. Предварительно выбранные выводы перепроверяются по истечении срока их действия. Выбор Redis без аренды перечитывает хранилище, но при синхронном планировании аренды все равно можно использовать булавку, вытесненную между предварительной выборкой и планированием (приемлемое окно наилучших усилий). Фиксация аренды не может переключать учетные записи после устойчивой заявки: при отклонении обновления она сохраняет только заявленного кандидата для этого запроса и оставляет общего победителя нетронутым, поэтому соглашение между экземплярами ограничено этим путем. Остальная часть таблицы по-прежнему применима: здесь не учитываются привязка комбинированных сеансов, встроенные контакты поворота Codex, семафоры учетных записей, блокировки, лимиты расходов, конфигурация или журналы вызовов.

Аппаратное обеспечение: параллельный длинный `/v1/responses` для каждого экземпляра — это** бюджет памяти** вопрос (куча + inflight-byte / #10110). Независимые `N` `DATA_DIR` по-прежнему умножают кучу: хост RAM должен покрывать `N × cgroup`, а не «один модуль 16 Gi с N = 8». Никогда не `replicas > 1` для одного файла SQLite.

Составьте эскиз (две кучи, два тома — а не `deploy.replicas: 2`):

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

Плотность в процессе обработки (сжатие изолята HTTP ) составляет [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Один логический кластер в общем устойчивом состоянии — [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Региональные ошибки Gemini внутри Docker

Google AI Studio/Gemini API может возвращать HTTP 400 с помощью FAILED_PRECONDITION и `User location is not supported for the API use.` Успешный запрос на хосте не доказывает, что контейнер использует тот же исходящий маршрут. Порядок DNS, подключение IPv4/IPv6, маршрутизация VPN и настроенные прокси могут различаться. Проверьте [регионы, поддерживаемые Google,](https://ai.google.dev/gemini-api/docs/available-regions) а также фактический маршрут подключения; сама по себе эта ошибка не идентифицирует плохой ключ API.

### Предпочитайте прокси-сервер для конкретного соединения

Используйте конфигурацию прокси-сервера OmniRoute для [каждого соединения](../ops/PROXY_GUIDE.md#4-level-proxy-system) для затронутого соединения Gemini, а затем повторите действия.** Тестовое соединение** и небольшая просьба с такой же моделью. Это сохраняет область изменения маршрутизации для этого соединения. Убедитесь, что прокси-сервер доступен из контейнера и что соединение действительно выбирает его. Изменение маршрута не гарантирует права региона верхнего течения.

### Сравните сети хоста и контейнера

Сохраняйте ключ, модель и запрос идентичными при сравнении проверенных результатов; никогда не вставляйте учетные данные, пароли прокси или полные заголовки авторизации в задачу. Сначала проверьте, какие семейства адресов предлагает преобразователь OS, используя одну и ту же команду на хосте и внутри контейнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Замените `omniroute` на службу, которую вы запускаете (например, `omniroute-web`). Эти команды печатают семейства адресов без учетных данных или адресов IP. Возвращенный `6` показывает только результат IPv6 DNS : он** нет** подтвердите работоспособность маршрута IPv6 или доступа API. Если установлен `curl`, сравните `curl -4 -I https://generativelanguage.googleapis.com` и `curl -6 -I https://generativelanguage.googleapis.com` в обеих средах. Ответ HTTP подтверждает возможность подключения для этого зонда, даже если это неаутентифицированная ошибка; только подтвержденный запрос модели проверяет право на участие в программе Gemini.

### Альтернатива на уровне хоста: работающая политика IPv6 и преобразователя

Репортер [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) восстановил доступ в своей среде, включив контейнер IPv6 и изменив выбор адреса glibc. Относитесь к этому как к альтернативе, зависящей от окружающей среды. Прежде чем настраивать параметры преобразователя, подтвердите рабочие правила хоста IPv6, контейнера egress/routing и брандмауэра. Частный адрес ULA сам по себе не обеспечивает общедоступное соединение IPv6.

Для служб, уже подключенных к сети Compose по умолчанию, этот фрагмент включает IPv6 в этой сети; сохраните остальную часть вашего сервиса, портов, томов и конфигурации:

```yaml
networks:
  default:
    enable_ipv6: true
```

Для именованной сети включите ее в сети, к которой фактически присоединяется служба. Docker может выделить подсеть ULA ; выбирайте явную непересекающуюся подсеть только тогда, когда этого требует ваша сеть. См. [разделы «Сеть Docker IPv6](https://docs.docker.com/engine/daemon/ipv6/) и [«Параметры создания сети»](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

На** образ на основе glibc** , `/etc/gai.conf` может изменить выбор адреса. Текущий репозиторий Dockerfile использует Debian; пользовательские изображения на основе musl не используют этот механизм. Сообщаемая корректировка меняет метку ULA с `label fc00::/7 6` на `label fc00::/7 1`. Начните с полной таблицы политик образа и сохраните другие ее записи: добавление записи `label` или `precedence` заменяет эту таблицу по умолчанию, поэтому файла, содержащего только измененную строку, недостаточно. [Справочник по конфигурации glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf) документирует эту семантику. Привяжите проверенный файл только для чтения на `/etc/gai.conf` и заново создайте службу, чтобы применить его.

Это меняет выбор адреса OS для** весь исходящий трафик в этом контейнере** . Это не заставляет каждое приложение выбирать IPv6: порядок DNS узла и выбор соединения также имеют значение. В частности, `--dns-result-order=ipv4first` предпочитает IPv4 и не является средством устранения сбоя IPv4-only. См. [Порядок узлов DNS](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Повторно протестируйте Gemini и других ваших провайдеров после любого изменения на уровне хоста. Чтобы выполнить откат, удалите пользовательское монтирование `gai.conf`, восстановите предыдущую конфигурацию сети и заново создайте затронутый service/network во время периода обслуживания. Повторное создание сети может прервать работу других контейнеров, подключенных к ней; не удаляйте постоянный том данных.

## Важные примечания

- **Режим SQLite WAL:** необходимо дождаться завершения `docker stop`, чтобы OmniRoute успел выполнить контрольную точку и записать последние изменения обратно в `storage.sqlite`. Включённые файлы Compose уже задают 40-секундный льготный период остановки. Если вы запускаете образ напрямую, используйте `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** установите значение `true`, если регулярные резервные копии и резервные копии перед записью создаются внешними средствами. Для миграций существующей базы данных по-прежнему требуются отдельный надёжный снимок для обеспечения безопасности и защита от массовой миграции.
- **Сохранность данных:** всегда подключайте том к `/app/data`, чтобы сохранять базу данных, ключи и конфигурации при перезапусках контейнера.
- **Настройка порта:** переопределите переменную окружения `PORT`, чтобы изменить порт `20128`, используемый по умолчанию.

## См. также

- [Руководство по развёртыванию на виртуальной машине](../ops/VM_DEPLOYMENT_GUIDE.md) — настройка виртуальной машины + nginx + Cloudflare
- [Руководство по развёртыванию на Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — развёртывание на Fly.io
- [Настройка окружения](../reference/ENVIRONMENT.md) — полное справочное описание `.env`
