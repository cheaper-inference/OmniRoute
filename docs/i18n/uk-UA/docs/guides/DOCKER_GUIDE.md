# 🐳 Docker Guide — OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Повний довідник із розгортання Docker. Для швидкого старту див. [розділ Docker у README](../README.md#-docker).

## Зміст

- [Швидкий запуск](#quick-run)
- [З файлом середовища](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Доступні профілі](#available-profiles)
- [Налаштування інструментів CLI хоста, коли OmniRoute працює в Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Допоміжний контейнер Redis](#redis-sidecar)
- [Compose для продакшену](#production-compose)
- [Етапи Dockerfile](#dockerfile-stages)
- [Критично важливі змінні середовища](#critical-environment-variables)
- [Docker Compose із Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Швидкий тунель Cloudflare](#cloudflare-quick-tunnel)
- [Теги образів](#image-tags)
- [Оновлення панелі керування в Docker](#dashboard-updates-in-docker)
- [Доступність: стандартна конфігурація SQLite підтримує лише одну репліку](#availability-default-sqlite-is-single-replica)
- [Регіональні помилки Gemini у Docker](#gemini-regional-errors-inside-docker)
- [Важливі примітки](#important-notes)

---

## Швидкий запуск

> **Самостійне розгортання однією командою?** Див.
> [посібник із самостійного розгортання](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (опублікований образ +
> Redis, доступ лише через loopback, без вибору профілю). Наведений нижче швидкий запуск —
> це варіант з одним контейнером для користувачів, які вже запускають Redis в іншому місці.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## З файлом середовища

```bash
# Спочатку скопіюйте та відредагуйте .env
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
# Базовий профіль (без інструментів CLI)
docker compose --profile base up -d

# Профіль CLI (вбудовані Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Профіль хоста (передусім для Linux; монтує бінарні файли CLI хоста лише для читання)
docker compose --profile host up -d

# Вебпрофіль (Chromium/Playwright для постачальників вебсеансів)
docker compose --profile web up -d

# Поєднання CLI + допоміжного контейнера CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Доступні профілі

OmniRoute постачається з профілями Compose для основних варіантів розгортання. Виберіть той, що відповідає вашому середовищу.

| Профіль              | Сервіс           | Коли використовувати                                                                                                                                    | Команда                                      |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (стандартний) | `omniroute-base` | Безголовий сервер / мінімальне середовище виконання без включених CLI постачальників                                                                    | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Агентні робочі процеси, які викликають `omniroute providers/setup/doctor` і вбудовані CLI (Codex, Claude Code, Droid, OpenClaw)                         | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Хости Linux, яким потрібен доступ до CLI хоста на кшталт `network_mode` шляхом монтування `~/.local/bin`, `~/.codex`, `~/.claude` тощо лише для читання | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Запуск допоміжного контейнера [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) на порту `8317` для проксування до зовнішніх CLI              | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Постачальники вебсеансів, яким потрібен браузер: `gemini-web`, `claude-web`, `claude-turnstile` (збирає `runner-web`, Chromium включено)                | `docker compose --profile web up -d`         |

> Можна поєднувати кілька профілів: `docker compose --profile cli --profile cliproxyapi up -d`.

## Налаштування CLI-інструментів хоста, коли OmniRoute працює в Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` і кнопка
**Зберегти конфігурацію** на панелі керування записують файли на кшталт `~/.codex/*.config.toml`. Ці шляхи
мають значення лише на машині, де фактично працює CLI. Якщо виконати ці команди
всередині контейнера, запис потрапить у власній домашній каталог контейнера (`/home/node` —
образ працює з `USER node`), звідки жоден CLI на хості його не прочитає і де його буде
видалено одразу після повторного створення контейнера.

OmniRoute виявляє це й замість повідомлення про успіх, яким ви не зможете
скористатися, відхиляє запис і надає інструкції: CLI завершує роботу з кодом `2`, а API відповідає `422`
з `containerEphemeralTarget: true`.

### Рекомендовано: запускайте CLI на хості, а OmniRoute — у Docker

Контейнер обслуговує API; CLI налаштовує ваші інструменти на хості.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # спрямуйте CLI на контейнер
omniroute setup-codex                      # записує справжній ~/.codex на вашому хості
```

Це правильний вибір, коли Codex, Claude Code, Cursor або подібні інструменти працюють на вашому
ноутбуці, — а це типовий варіант.

### Альтернатива: підключіть каталоги конфігурації хоста як bind mount (профіль `host`)

Якщо ви хочете, щоб сам контейнер записував конфігурацію на хості, підключіть
каталоги та спрямуйте `CLI_CONFIG_HOME` на корінь точки монтування. Профіль `host`
уже робить це:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Саме bind mount робить шлях надійним: OmniRoute читає
`/proc/self/mountinfo` і дозволяє запис у змонтовані шляхи (а також у каталоги,
дочірні елементи яких є точками монтування, що точно відповідає структурі `/host-home` вище), водночас
продовжуючи відхиляти запис у незмонтовані шляхи.

### Обхідний варіант: налаштуйте власні CLI контейнера (використовуйте обережно)

Коли CLI справді розміщені всередині контейнера (профіль `cli`), такий запис
є навмисним. Передайте `--allow-container-write` будь-якій команді `setup-*` або встановіть
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` для сервера. Запис буде виконано
з попередженням, що він не збережеться після видалення контейнера.

> **Попередження щодо безпеки — профіль `cli` + монтування `docker.sock`.**
> Профіль `cli` підключає `/var/run/docker.sock` як bind mount, щоб засіб
> автоматичного оновлення всередині контейнера міг повторно створювати стек через демон хоста
> (`src/lib/system/autoUpdate.ts` перевіряє наявність цього сокета й пропускає
> шлях Docker, якщо сокет відсутній). Цей сокет є **межею довіри з root-доступом до хоста**:
> усе, що може отримати до нього доступ, керує демоном Docker на хості від імені
> root — воно може створювати, перевіряти, зупиняти й видаляти будь-який контейнер на хості.
> Наслідки:
>
> 1. **Ніколи не відкривайте порт профілю `cli` для мережі.** Публікуйте
>    його на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — доступний із локальної мережі профіль `cli` перетворює будь-яку RCE на рівні панелі керування
>    на повну компрометацію хоста.
> 2. **Не підключайте до профілю `cli` жодних додаткових каталогів хоста.**
>    Сокет Docker у поєднанні з будь-яким додатковим монтуванням надає контейнеру повний
>    доступ на читання й запис до вашої файлової системи та конфігурації хоста. Якщо інструменту потрібен
>    доступ до проєкту, запускайте його локально за допомогою виконуваного файла CLI — не монтуйте проєкт
>    у контейнер `cli`.
>
> Якщо вам не потрібне автоматичне оновлення всередині контейнера, не вмикайте профіль `cli`
> (`COMPOSE_PROFILES=core,redis` або коротший варіант). Інші профілі не
> монтують сокет Docker.
>
> Пов’язану модель загроз для MITM див. у `docs/security/MITM-TPROXY-DECRYPT.md` (git; не скомпільовано в `/docs`),
> а ланцюжок походження виконуваних файлів
> `codex`/`claude-code`/`droid`/`openclaw` — у `docs/security/SUPPLY_CHAIN.md`.

## Сайдкар Redis

OmniRoute використовує Redis як основу для розподіленого обмежувача частоти запитів і спільного кешу. Сервіс `redis` **завжди визначено** у `docker-compose.yml` (він не має обмеження профілем) і запускається разом із будь-яким іншим профілем.

| Деталь                           | Значення                               |
| -------------------------------- | -------------------------------------- |
| Образ                            | `redis:7-alpine`                       |
| Ім’я контейнера                  | `omniroute-redis`                      |
| Внутрішній порт                  | `6379`                                 |
| Порт хоста (перевизначення)      | `REDIS_PORT` (типово `6379`)           |
| Прив’язка хоста (перевизначення) | `REDIS_BIND_HOST` (типово `127.0.0.1`) |
| Том                              | `omniroute-redis-data` → `/data`       |
| Перевірка працездатності         | `redis-cli ping` (інтервал 10 с)       |

Пов’язані змінні середовища:

- `REDIS_URL` — рядок підключення, що передається застосунку (типово `redis://redis:6379`).
- `REDIS_PORT` — зіставлення порту хоста для контейнера Redis.
- `REDIS_BIND_HOST` — інтерфейс хоста, на якому публікується порт. Типове значення — `127.0.0.1`.

> **Чому типово використовується інтерфейс зворотного зв’язку:** сайдкар працює без `requirepass`, а контейнери
> застосунку звертаються до нього через мережу compose (`redis:6379`) — опублікований порт
> потрібен лише для інструментів на боці хоста (`redis-cli`, локального `npm run dev`). Публікація на
> `0.0.0.0` відкрила б доступ до Redis без автентифікації для кожного хоста у вашій локальній мережі. Якщо ви встановлюєте
> `REDIS_BIND_HOST=0.0.0.0`, також додайте `--requirepass` до `command:` сервісу.

**Вимикати Redis** не рекомендовано (обмежувач частоти запитів перейде до резервного режиму в пам’яті). Якщо це необхідно, видаліть або закоментуйте блок сервісу `redis:` у `docker-compose.yml` чи масштабуйте його до нуля:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Для ізольованого виробничого знімка, що працює паралельно із середовищем розробки, використовуйте `docker-compose.prod.yml`.

| Деталь                        | Значення                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Файл                          | `docker-compose.prod.yml`                                                                       |
| Типовий порт панелі керування | `PROD_DASHBOARD_PORT=20130` (зіставлено з внутрішнім `${DASHBOARD_PORT:-20128}`)                |
| Типовий порт API              | `PROD_API_PORT=20131`                                                                           |
| Образ                         | `omniroute:prod` (зібрано з цілі `runner-cli`)                                                  |
| Контейнер Redis               | `omniroute-redis-prod` (`redis:8.6.2`, окремий том `redis-prod-data`)                           |
| Том даних                     | `omniroute-prod-data` (іменований, зберігається між повторними збірками)                        |
| Перевірки працездатності      | `node healthcheck.mjs` + `redis-cli ping`, з `depends_on`, що залежить від працездатності Redis |

Як використовувати:

```bash
# Зібрати й запустити виробничий стек
docker compose -f docker-compose.prod.yml up -d --build

# Виводити журнали в потоковому режимі
docker compose -f docker-compose.prod.yml logs -f

# Зупинити й видалити стек (зберегти томи)
docker compose -f docker-compose.prod.yml down
```

Виробничий стек працює паралельно з compose-середовищем розробки (з іншими іменами контейнерів, портами й томами), тому ви можете продовжувати локальну розробку, поки виробниче середовище залишається запущеним.

## Етапи Dockerfile

Репозиторій містить багатоетапний Dockerfile (`Dockerfile`). Доступні чотири етапи; виберіть відповідний `target` для вашого сценарію використання.

| Етап          | Базовий образ         | Призначення                                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Установлює залежності (`npm ci --legacy-peer-deps`) і запускає `npm run build` (за замовчуванням із Turbopack — див. розділ «Ресурси під час збирання» нижче)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Середовище виконання для продакшену з автономним результатом збирання Next.js. **CLI постачальників не включені.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Додає `git`, `docker.io`, `docker-compose` і глобальні CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Виберіть цей етап для агентних робочих процесів.**                                                                                                                                      |
| `runner-web`  | `runner-base`         | Додає Playwright і браузер Chromium (`--with-deps`) для постачальників вебсеансів: `gemini-web`, `claude-web`, `claude-turnstile`. **Виберіть цей етап, якщо використовуєте цих постачальників** — звичайний образ завершується помилкою під час запиту без нього (див. примітку про `-web` у розділі «Канали випуску»). |

Зберіть певний цільовий етап вручну:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси під час збирання

Три аргументи збирання визначають ресурсоємність етапу `builder`. Вони діють лише під час збирання —
`OMNIROUTE_MEMORY_MB` (нижче) є окремим параметром середовища виконання.

| Аргумент збирання           | Типове значення | Вплив                                                                                                             |
| --------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` виконує збирання за допомогою webpack: нижчий пік використання пам’яті, але повільніше. `1` вмикає Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Верхня межа купи V8 (`--max-old-space-size`) для запущеного процесу `next build`.                                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Передає значення в `CIRCLE_NODE_TOTAL`; Next визначає `workers = N - 1` для збирання даних сторінок.              |

`OMNIROUTE_BUILD_WORKERS` — це параметр, який варто збільшувати на потужному сервері збирання і насамперед перевіряти, коли збирання в обмеженому середовищі завершується аварійно **після** `✓ Compiled successfully`. Кожен воркер збирання даних сторінок є окремим процесом, як і сам батьківський процес `next build`; відтворення на реальному VPS (проблема #7518) показало, що піковий RSS кожного процесу становить ~4,5 ГБ незалежно від прапорця купи `NODE_OPTIONS` (Turbopack компілює в нативній пам’яті/Rust поза купою V8). Типове значення `2` (→ 1 воркер, загалом 2 процеси) розраховане на розміщені в GitHub середовища виконання з 16 ГБ пам’яті / 4 vCPU, які використовує конвеєр публікації. За значення `8` (→ 7 воркерів) у цьому середовищі забракло пам’яті, а buildkit завершив етап із помилкою `ResourceExhausted: ... cannot allocate memory`; значення `3` (→ 2 воркери) також не вмістилося після того, як RSS кожного процесу виміряли безпосередньо, а не оцінили опосередковано. `tests/unit/docker-build-memory-budget.test.ts` виконує розрахунки на основі виміряного показника й завершується помилкою, якщо будь-який із параметрів перевищує можливості середовища виконання.

Turbopack компілює в нативній пам’яті Rust, яка розташована **поза** купою V8, тому `OMNIROUTE_BUILD_MEMORY_MB` її не обмежує. На хості з обмеженням пам’яті OOM-killer завершує збирання сигналом SIGKILL узагалі без тексту помилки — процес просто зупиняється посеред `Creating an optimized production build`, що виглядає як зависання, а не нестача пам’яті. Саме тому в `Dockerfile` за замовчуванням використовується webpack (`OMNIROUTE_USE_TURBOPACK=0`), на відміну від `npm run dev` / `npm run build`, де типовим вибором у коді є Turbopack: звичайна команда `docker build .` без аргументів збирання (яку запускають Railway та інші хостинги з розгортанням в один клік) не повинна мовчки завершуватися аварійно на сервері збирання з обмеженою пам’яттю. Для опублікованих образів у `docker-publish.yml` уже явно передається `OMNIROUTE_USE_TURBOPACK=0`. На сервері збирання з великим обсягом оперативної пам’яті можна ввімкнути Turbopack для швидшого збирання:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` увімкнено, тому `next build` запускає батьківський процес **і** процес-воркер, кожен із яких окремо враховує `OMNIROUTE_BUILD_MEMORY_MB`. Установлюйте обмеження контейнера приблизно вдвічі вище за це значення, а не на рівні одного такого значення.

Виміряно для цього дерева (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Збирач    | Обмеження контейнера | Результат                                                   |
| --------- | -------------------- | ----------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | OOM-killer завершив процес в обох випадках без повідомлення |
| webpack   | 8 GiB                | Воркер збирання завершено сигналом SIGKILL                  |
| webpack   | 12 GiB               | Успішно, пікове використання становило 11,1 GiB             |

### Типові параметри середовища виконання

Типові значення, які експортує `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Поведінка пам’яті в Docker:

- Образ задає `OMNIROUTE_MEMORY_MB=1024` і на його основі визначає `NODE_OPTIONS=--max-old-space-size=1024`.
- Фактичний серверний процес запускається автономним засобом запуску, який зчитує `OMNIROUTE_MEMORY_MB` і додає `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node використовує останнє повторюване значення `--max-old-space-size`, тому налаштування `OMNIROUTE_MEMORY_MB` визначає фактичний ліміт купи в Docker.
- Оскільки образ завжди задає це значення, власний резервний механізм засобу запуску з калібруванням за обсягом оперативної пам’яті ніколи не застосовується в Docker. Явно збільште його відповідно до навантаження (див. таблицю нижче). `2048` усе ще замало для `/v1/responses` агентів програмування.

### Оперативна пам’ять для агентів програмування під час виконання

Стандартне значення Docker у 1 GiB — це мінімум для панелі керування та легких чатів, а не конфігурація для промислового використання. Довгі тіла запитів `POST /v1/responses` (сотні повідомлень, десятки інструментів) утримують у пам’яті кілька графів під час стиснення. Два запити розміром приблизно 3 MiB / 750 тис. токенів, що виконувалися одночасно, спричинили аварійне завершення V8 із розміром old space **12 GiB** (`FATAL ERROR: Reached heap limit`), а також перевищення ліміту пам’яті cgroup у 16 GiB із завершенням через OOM. Див. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Установлюйте **ліміт cgroup `--memory` вище за розмір купи** — нативні буфери, SQLite і проміжні дані стиснення розміщуються поза V8.

| Навантаження                                 | `OMNIROUTE_MEMORY_MB`               | Контейнер / cgroup                                        | Примітки                                                                                                                                              |
| -------------------------------------------- | ----------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Панель керування, один легкий чат            | `1024` (стандартне значення образу) | ≥2 GiB                                                    |                                                                                                                                                       |
| Один агент програмування (Claude/Codex/Grok) | `8192`                              | ≥10 GiB                                                   | Типовий один сеанс `/v1/responses`                                                                                                                    |
| Два одночасні довгі запити `/v1/responses`   | `10240`–`12288`                     | ≥12–16 GiB                                                | Зафіксовано аварійне завершення V8 із купою розміром приблизно 12 GiB                                                                                 |
| Три або більше одночасних довгих контекстів  | не запускайте в одному процесі      | виконуйте послідовно / надайте більше оперативної пам’яті | Стандартний ліміт для ресурсоємних запитів — 1 активний запит; його збільшення без додаткової оперативної пам’яті знову спричиняє аварійне завершення |

`omniroute serve` на фізичному сервері калібрує значення приблизно до 35% оперативної пам’яті (у межах `[512, 4096]`), коли `OMNIROUTE_MEMORY_MB` **не задано**. Docker завжди задає `1024`, тому в офіційному образі таке калібрування ніколи не виконується.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Критичні змінні середовища

Окрім типових значень, задокументованих у [ENVIRONMENT.md](../reference/ENVIRONMENT.md), під час роботи в Docker найважливішими є такі змінні:

| Змінна                        | Призначення                                                                                                                                                                                                                                                                                 | Типове значення              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Спільний секрет для мосту WebSocket. **Обов’язковий у виробничому середовищі** — задайте надійний випадковий рядок.                                                                                                                                                                         | не задано (потрібно вказати) |
| `REDIS_URL`                   | Рядок підключення до серверної частини обмежувача частоти запитів / кешу                                                                                                                                                                                                                    | `redis://redis:6379`         |
| `REDIS_PORT`                  | Порт хоста для контейнера Redis, що входить до комплекту                                                                                                                                                                                                                                    | `6379`                       |
| `REDIS_BIND_HOST`             | Інтерфейс хоста, на якому публікується порт Redis із комплекту (loopback, якщо ви не додасте AUTH)                                                                                                                                                                                          | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Шлях на хості, змонтований у профіль `cli` за адресою `/workspace/omniroute` для робочих процесів самооновлення                                                                                                                                                                             | `.` (поточний каталог)       |
| `OMNIROUTE_MEMORY_MB`         | Граничний розмір купи Node під час виконання для автономного сервера Docker; перевизначає наведене вище типове значення образу. Агенти програмування: `8192`+ (див. [оперативна пам’ять середовища виконання](#runtime-ram-for-coding-agents)).                                             | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Перевизначає відкриті порти для панелі керування (20128) та API (20129)                                                                                                                                                                                                                     | `20128` / `20129`            |
| `APP_BIND_HOST`               | Інтерфейс хоста, на якому docker-compose публікує порти панелі керування/API/live-WS. Якщо `REQUIRE_API_KEY=false` (типове значення), `0.0.0.0` відкриває анонімний проксі `/v1` для локальної мережі — розширюйте доступ лише з `REQUIRE_API_KEY=true` або за наявності зворотного проксі. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | Інтерфейс хоста, на якому docker-compose публікує допоміжний контейнер `cliproxyapi` — його том даних містить облікові дані постачальника.                                                                                                                                                  | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Каталог, який сканер плагінів середовища виконання зчитує та використовує для встановлення. Задайте його, коли плагіни монтуються через bind mount: типове значення залежить від `HOME`, яку образ може не експортувати.                                                                    | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Підшлях URL, коли застосунок опубліковано за зворотним проксі (наприклад, `/omniroute`)                                                                                                                                                                                                     | _(порожньо = корінь)_        |
| `NEXT_PUBLIC_BASE_URL`        | Загальнодоступний origin браузера, включно з підшляхом (наприклад, `https://host/omniroute`)                                                                                                                                                                                                | не задано                    |
| `PROD_DASHBOARD_PORT`         | Порт панелі керування на стороні хоста для `docker-compose.prod.yml`                                                                                                                                                                                                                        | `20130`                      |
| `CLIPROXYAPI_PORT`            | Порт на стороні хоста для допоміжного контейнера `cliproxyapi`                                                                                                                                                                                                                              | `8317`                       |

## Зворотний проксі на підшляху (Traefik / nginx)

`basePath` Next.js компілюється в автономний пакет. OmniRoute записує вбудоване
значення у сигнальний файл у корені застосунку (записується під час `npm run build`;
зчитується `scripts/docker/ensure-docker-base-path.mjs`) і порівнює його з
`OMNIROUTE_BASE_PATH` під час запуску контейнера. Якщо значення відрізняються, а образ
було зібрано для кореня домену, точка входу переписує автономні маніфести,
вбудовані літерали `basePath`/`assetPrefix` (Next 16 формує URL-адреси ресурсів SSR
виключно з `assetPrefix` — засіб виправлення також додає до нього підшлях), вбудовані
URL-адреси ресурсів `/_next/static` (маніфести клієнтських посилань, імпорти
медіафайлів, попередньо відрендерені сторінки помилок) і клієнтську підстановку
`process.env` перед запуском `node dev/run-standalone.mjs`.

### Збирання за допомогою Compose (рекомендовано)

Задайте обидві змінні у `.env`, а потім повторно зберіть образ, щоб параметри образу
та середовища виконання збігалися:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` передає `OMNIROUTE_BASE_PATH` як аргумент збирання Docker і як
змінну середовища виконання.

### Попередньо зібраний кореневий образ + підшлях під час виконання

Опубліковані образи `diegosouzapw/omniroute:*` зібрано для кореня домену. Ви все одно
можете задати `OMNIROUTE_BASE_PATH` під час виконання; контейнер одноразово виправить
пакет під час запуску. Використовуйте його разом із відповідним публічним джерелом:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Налаштуйте зворотний проксі так, щоб він пересилав **повний** зовнішній шлях (не
видаляйте префікс). Traefik має спрямовувати `PathPrefix(`/omniroute`)` до контейнера
без `StripPrefix`, щоб Next.js отримував `/omniroute/...` і обслуговував ресурси з
`/omniroute/_next/...`.

Перевірка працездатності Docker звертається до полегшеної кінцевої точки життєвого
циклу `/healthz` із префіксом активного значення `OMNIROUTE_BASE_PATH`.
`/api/monitoring/health` залишається доступною для діагностики вручну або через панель
моніторингу; щоб знову спрямувати контейнерний HEALTHCHECK до неї (наприклад, для
поглибленої перевірки працездатності), задайте
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Цей шлях виконує **поглиблену**
перевірку (база даних + зведення моніторингу) — це підходить для нечастого Docker
`HEALTHCHECK`, якщо ви знову його ввімкнете, але **не** для інтервалів Kubernetes
`livenessProbe`.

Для оркестраторів (Kubernetes, Nomad тощо):

| Перевірка             | Рекомендовано                                                         | Уникайте                                                          |
| --------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Життєздатність        | HTTP `GET /livez` або TCP на основному порту (`PORT`, типово `20128`) | `/api/monitoring/health` як перевірки життєздатності              |
| Готовність            | HTTP `GET /healthz`                                                   | Коротких тайм-аутів, які вважають зайнятий цикл подій непрацюючим |
| Поглиблена / зовнішня | `/api/monitoring/health`                                              | —                                                                 |

`/healthz` повідомляє про стан життєвого циклу процесу (`ok` / `starting` /
`stopping`). `/livez` перевіряє лише, чи працює процес (повертає 200 щоразу, коли
обробник може виконатися; вона не очікує готовності). Обидві кінцеві точки все одно
виконуються в тому самому циклі подій Node, що й обробка запитів, тому обмежена
ресурсами CPU робота з каталогом або стисненням може спричинити затримку їхньої
відповіді — зайнятий ≠ непрацюючий. Якщо HTTP-перевірки завершуються через тайм-аут,
віддавайте перевагу перевірці життєздатності через TCP. Повні рекомендації щодо
перевірок:
[Посібник із моніторингу — рекомендації щодо перевірок Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose із Caddy (автоматичний TLS для HTTPS)

OmniRoute можна безпечно опублікувати за допомогою автоматичного налаштування SSL у Caddy. Переконайтеся, що DNS-запис A вашого домену вказує на IP-адресу вашого сервера.

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
      # Джерело, доступне браузеру, для зворотних викликів OAuth, посилань панелі керування та згенерованих публічних URL-адрес.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Внутрішня URL-адреса між серверами для запланованих завдань / запитів до самого сервісу.
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

Caddy встановлює стандартні заголовки переспрямування для висхідного контейнера. OmniRoute використовує
`NEXT_PUBLIC_BASE_URL` як канонічне публічне джерело для зворотних викликів OAuth і згенерованих публічних
посилань; автентифіковані операції запису в панелі керування використовують запити з того самого джерела та прив’язаний до сеансу захист від CSRF.
Вмикайте `OMNIROUTE_TRUST_PROXY` лише для розширених розгортань, у яких ви навмисно
хочете, щоб OmniRoute визначав публічне джерело з довірених пересланих заголовків замість явно заданої
конфігурації.

## Швидкий тунель Cloudflare

Підтримка панелі керування для розгортань Docker включає **Cloudflare Quick Tunnel**, який можна запустити одним натисканням у `Dashboard → Endpoints`. Під час першого ввімкнення `cloudflared` завантажується лише за потреби, запускається тимчасовий тунель до вашої поточної кінцевої точки `/v1`, а згенерована URL-адреса `https://*.trycloudflare.com/v1` відображається безпосередньо під вашою звичайною публічною URL-адресою.

Панелі тунелів кінцевих точок (Cloudflare, Tailscale, ngrok) можна показувати або приховувати через `Settings → Appearance`, не змінюючи стан активного тунелю.

### Примітки щодо тунелю

- URL-адреси Quick Tunnel є тимчасовими та змінюються після кожного перезапуску.
- Quick Tunnels не відновлюються автоматично після перезапуску OmniRoute або контейнера. За потреби повторно ввімкніть їх із панелі керування.
- Кероване встановлення наразі підтримує Linux, macOS і Windows на `x64` / `arm64`.
- Керовані Quick Tunnels за замовчуванням використовують транспорт HTTP/2, щоб уникнути надмірних попереджень про буфер UDP для QUIC в обмежених контейнерних середовищах. Установіть `CLOUDFLARED_PROTOCOL=quic` або `auto`, якщо потрібен інший транспорт.
- Образи Docker містять системні кореневі сертифікати CA та передають їх керованому `cloudflared`, що запобігає помилкам довіри TLS під час початкового запуску тунелю всередині контейнера.
- Установіть `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, якщо хочете, щоб OmniRoute використовував наявний виконуваний файл замість завантаження нового.

## Теги образів

| Образ                    | Тег      | Розмір | Опис                                                             |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Найвища **опублікована** стабільна версія SemVer (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Закріплюйте цей клас тегів для GitOps                            |

Мультиплатформний маніфест: нативні `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker автоматично вибирає відповідну архітектуру; передайте `--platform linux/amd64`, якщо потрібно примусово використовувати емуляцію AMD64 на хостах ARM.

### Канали випусків

OmniRoute публікує окремі канали Docker для стабільних випусків, тестування активної гілки випуску та збірок для розробки.

| Канал                           | Джерело                                   | Змінюваність                      | Рекомендоване використання                                                                                                        |
| ------------------------------- | ----------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Підписаний/версійований випуск            | Незмінний                         | Робочі розгортання, у яких закріплено точний випуск                                                                               |
| `:latest` / `:latest-web`       | Найвища **опублікована** стабільна SemVer | Змінюваний стабільний покажчик    | Слідує за стабільними випусками **після** завдання публікації SemVer — **не** відстежує `main` або невипущені коміти `release/v*` |
| `:next` / `:next-web`           | Поточна стандартна гілка `release/v*`     | Змінюваний передрелізний покажчик | Тестування виправлень, які вже додано до активної гілки випуску, але які ще не ввійшли до стабільного випуску                     |
| `:main` / `:main-web`           | Гілка `main`                              | Змінюваний покажчик розробки      | Лише для розробки та інтеграційного тестування                                                                                    |

#### Постачальники вебсеансів: образи `-web`

Кожен наведений вище канал також має тег `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), зібраний зі стадії `runner-web` — це той самий образ із доданими Playwright і браузером Chromium. Звичайний образ постачається **без** Chromium; він потрібен для `gemini-web`, `claude-web` і `claude-turnstile`.

Помилка виникає не під час запуску, а пізніше: ці постачальники відображають списки своїх моделей і показуються як підключені в панелі керування, а помилкою завершується лише перший запит:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Якщо ви використовуєте цих постачальників, завантажте тег `-web` каналу, який уже використовуєте, — більше нічого змінювати не потрібно. Для встановлення через npm/CLI (без образу Docker) відповідним відсутнім компонентом є виконуваний файл браузера: виконайте `npx playwright install chromium` на хості.

#### Використання передрелізного каналу

Канал `next` перебудовується після кожного надсилання змін до поточної типової гілки `release/v*` і публікується як для AMD64, так і для ARM64. Старіші гілки обслуговування не можуть його перезаписати. Канал надає образ, доступний для завантаження, що містить виправлення, які вже об’єднано з активною гілкою випуску до створення наступного стабільного тегу.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Для Docker Compose перевизначте тег образу, який використовує вибраний профіль, а потім завантажте образ і повторно створіть сервіс:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безпека та відкат

`next` — це рухомий канал попередніх випусків. Він може змінюватися після кожного надсилання змін до активної гілки випуску та **не підтримується для використання у виробничому середовищі**. Під час оцінювання конкретної збірки закріпіть дайджест образу:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Перед тестуванням створіть резервну копію тому даних OmniRoute або каталогу даних, підключеного через bind mount. Для відкату відновіть стабільну версію або дайджест, які використовувалися раніше, і повторно створіть контейнер:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Збірка з гілки випуску ніколи не може перемістити `latest`; стабільний вказівник може бути оновлено лише відповідною стабільною версією із семантичним керуванням версіями. Образи `next` зберігають перевірку образу випуску та блокувальний шлюз для вразливостей рівня CRITICAL.

**`latest` не гарантує актуальності щодо git.** Об’єднані виправлення в `main` або в активній гілці `release/v*` **не** потрапляють до `:latest`, доки не буде опубліковано стабільний образ SemVer і завдання публікації не оновить `:latest` (із тим самим дайджестом, що й відповідна версія SemVer). Якщо здається, що `latest` не оновлюється, хоча на GitHub уже видно виправлення, завантажте `:next`, щоб протестувати гілку випуску, або дочекайтеся тегу SemVer.

| Що вам потрібно                                                                                     | Що використовувати                       |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / виробниче середовище, у якому не має бути відхилень                                        | Закріпіть `:X.Y.Z` (або дайджест образу) |
| Використовувати опубліковані стабільні випуски та приймати повторне створення після кожного випуску | `:latest`                                |
| Тестувати неопубліковані коміти `release/v*`                                                        | `:next` (не для виробничого середовища)  |
| Тестувати `main`                                                                                    | `:main` (не для виробничого середовища)  |

## Оновлення панелі керування в Docker

Контейнер, створений з опублікованого образу, не може замінити сам себе. Коли OmniRoute виявляє, що працює всередині
контейнера (немає робочої копії `.git`, це не встановлення через npm), банер оновлення на головній панелі керування показує
команду, яку потрібно виконати на хості, замість інструкцій npm/git, а також кнопку копіювання:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Назва сервісу береться з `AUTO_UPDATE_SERVICE` (за замовчуванням `omniroute` — сервіс у
`docker-compose.selfhost.yml`). `pull` оновлює лише рухомий тег (`latest`, `next`); якщо використовується зафіксований
тег `:X.Y.Z`, спочатку змініть його.

### Оновлення одним натисканням за допомогою тригерного файлу на хості

Щоб кнопка **Оновити зараз** продовжувала працювати без монтування `/var/run/docker.sock` (що надає контейнеру
root-доступ до хоста — див. попередження щодо профілю `cli` вище), задайте `DOCKER_UPDATE_TRIGGER_FILE` для сервісу
OmniRoute і запустіть спостерігач на хості:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Шлях має бути всередині `DATA_DIR` (відносні значення обчислюються відносно нього); усі інші шляхи
відхиляються. Після цього кнопка **Оновити зараз** записує `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` у цей
файл, повертає відповідь `202`, а панель керування опитує `/api/system/version`, доки нова версія не запрацює,
після чого перезавантажується. У цьому режимі OmniRoute ніколи не виконує команди оболонки або Docker. Як і для будь-якої дії
оновлення, запит приймається лише від клієнтів у loopback/LAN.

Каталог даних, змонтований через bind mount, надає хосту стабільний шлях для спостереження. Приклади модулів `systemd`
(замініть `/srv/omniroute` на каталог, що містить ваш compose-файл і `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Стежити за запитами на оновлення з панелі керування OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Завантажити та повторно створити контейнер OmniRoute

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

Сервіс видаляє запит перед завантаженням образу, тому невдалий запуск не спричиняє зациклення. Без
`DOCKER_UPDATE_TRIGGER_FILE` панель керування й надалі використовує сценарій із ручним виконанням команди.

## Доступність: за замовчуванням SQLite має одну репліку

Stock Docker / Kubernetes OmniRoute є** один процес Node + один запис SQLite** . Висока доступність є** не підтримується** на цій топології.

| обмеження                                          | наслідок                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Самотній письменник                                | робити** ні** запустити кілька реплік для одного файлу SQLite. Це псує DB.                                                                                                                                                                                                                                                                  |
| Повторне створення / перезапуск / HEALTHCHECK kill | **Повне відключення** SSE під час польоту, сеансів приладової панелі та стану в пам’яті. Кожен підключений клієнт відключається. Нові запити під час вікна порожньої кінцевої точки отримують зворотний проксі**`502 Bad Gateway: Unknown error`** , а не OmniRoute JSON — клієнти не можуть відрізнити це від збою постачальника (#11015). |
| Той самий цикл подій, що й `/healthz`              | Завантажений каталог або тик стиснення можуть затримувати зонди; короткий тайм-аут, а потім перезапускає** тільки** репліка.                                                                                                                                                                                                                |

**Матриця зонда** (див. також [рекомендації щодо зонда Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Зонд          | Цільова                                                             | Не використовувати                                                 |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Жвавість      | TCP на `PORT` (за замовчуванням `20128`) або м’який HTTP `/healthz` | `/api/monitoring/health`                                           |
| Готовність    | HTTP `GET /healthz`                                                 | Короткі тайм-аути, які вважають, що цикл подій зайнятий як мертвий |
| Глибина / люд | `/api/monitoring/health`                                            | Живучість автоматизованого kubelet                                 |

**Оновлення:** очікувати падіння кожного сеансу. Злийте клієнтів, якщо можете; немає постійного оновлення для SQLite за замовчуванням. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` також замінить єдиний процес, коли контейнер несправний — той самий радіус вибуху.

Готові маніфести та діаграма Helm доступні в `deploy/kubernetes/` та `deploy/helm/omniroute/` — дивіться [посібник із розгортання Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Фрагмент Kubernetes для a** одна репліка** (Потрібне повторне створення; не створюйте `replicas` для одного файлу SQLite ):

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

`preStop` sleep дозволяє kube видаляти кінцеві точки служби перед SIGTERM так** новий** рух зупиняється, вражаючи процес вмирання. Під час польоту `/v1/responses` SSE витрачається до `SHUTDOWN_TIMEOUT_MS` (за замовчуванням 30 с) через оренду надходжень у важкій вазі (#11015). Нові запити, які все ще досягають процесу, отримують `503` + `Retry-After: 5`. Проміжок «Відтворити порожню кінцеву точку», доки заміна не стане готовою, залишається важким збоєм — це топологія SQLite, а не неправильна конфігурація зонду.

Зовнішній Postgres / багатозаписний HA є** ні** задокументований запасний шлях. Якщо вам потрібен HA, збережіть одну репліку або запустіть топологію, яку проект перевірив і задокументував окремо. Робота Postgres/MySQL знаходиться в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Поки це кораблі, єдиний підтримуваний спосіб розмноження** великий** Ємність `/v1/responses` — це N незалежних процесів (наступний розділ), а не `replicas > 1` на одному тому.

## Горизонтальне масштабування: N незалежних процесів

Один процес Node — це **одна купа V8**. Два паралельні запити агента програмування `POST /v1/responses` (RTK + Caveman) розміром ~3 MiB / ~750 тис. токенів аварійно завершують роботу цієї купи приблизно на 12 Gi (`FATAL ERROR: Reached heap limit`) і можуть спричинити OOM у cgroup на 16 Gi. Див. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Цей результат вимірювання є попередженням щодо **бюджету пам’яті**, а не жорстким обмеженням продукту на два одночасні довгі запити `/v1/responses`. Допуск ресурсомістких чатів обмежується автоматично визначеним бюджетом байтів вхідних запитів (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), розрахованим на основі тієї самої межі V8/cgroup — перевизначення його в бік збільшення (або встановлення застарілого обмеження кількості запитів `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) у процесі з уже визначеним розміром знову призведе до аварійного завершення. Невеликі чати, `/healthz`, `/v1/models` і MCP **не** підпадають під це обмеження.

### Один процес: більше двох довгих запитів `/v1/responses`

**Справний** процес (купа нижче `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, типове значення `0.75`) **може** виконувати більше двох одночасних довгих запитів `POST /v1/responses`, якщо в загальнопроцесному бюджеті байтів активних запитів (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ще є місце. Тіла розміром не менше `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (типове значення — 256 KiB) отримують ту саму ресурсомістку оренду, що й структурно складні запити, і використовують той самий механізм обходу `tryAcquireHealthyHeadroom` із [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десятки одночасних довгих SSE-клієнтів (операторам часто потрібно 40–50) — це питання **бюджету пам’яті**: потрібно належно визначити розмір купи, кількість основних і резервних слотів та `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, — а не жорстке обмеження продукту «максимум 2». Під тиском пам’яті купа все одно відхиляє запити з повторюваною помилкою `503`, щоб проблема #7849 не повернулася.

Щоб **збільшити кількість куп** (незалежних старих просторів V8) **сьогодні**:

| Робіть                                                                                                                                                                                                      | Не робіть                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Запускайте **N контейнерів/подів**, кожен із **власним** `DATA_DIR` / томом                                                                                                                                 | Не встановлюйте `replicas > 1` для одного файлу SQLite                            |
| Розраховуйте кількість активних ресурсомістких запитів і резервних слотів на основі бюджету купи / байтів активних запитів; 1–2 — це консервативне типове значення з #7849, а не жорсткий максимум продукту | Не виділяйте одному процесу у 8 разів більше RAM із необмеженим лімітом кількості |
| Необов’язково: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` для **спільних лічильників квот**                                                                                                       | Не розглядайте Redis як спільний SQLite — це не так                               |
| Дублюйте секрети провайдерів у кожному екземплярі (або погодьтеся з розділеними панелями моніторингу)                                                                                                       | Не очікуйте одну панель моніторингу / один журнал викликів для всіх екземплярів   |
| Розмістіть попереду будь-який балансувальник навантаження; достатньо прив’язки за API-ключем або сеансом                                                                                                    | Не вимагайте специфічного для постачальника проміжного ПЗ, що враховує розмір     |

Апаратні ресурси: кількість одночасних довгих запитів `/v1/responses` для кожного екземпляра — це питання **бюджету пам’яті** (купа + байти активних запитів / #10110). `N` незалежних `DATA_DIR` усе одно множать кількість куп: RAM хоста має покривати `N × cgroup`, а не «один под на 16 Gi з N=8». Ніколи не використовуйте `replicas > 1` для одного файлу SQLite.

Приклад Compose (дві купи, два томи — не `deploy.replicas: 2`):

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

Щільність усередині процесу (винесення стиснення за межі HTTP-ізоляту) описано в [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Один логічний кластер зі спільним надійним станом описано в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Регіональні помилки Gemini всередині Docker

Google AI Studio / Gemini API може повертати HTTP 400 із FAILED_PRECONDITION та повідомленням
`User location is not supported for the API use.` Успішний запит на хості
не доводить, що контейнер використовує той самий вихідний маршрут. Порядок DNS,
доступність IPv4/IPv6, маршрутизація VPN і налаштовані проксі можуть відрізнятися. Перевірте
[підтримувані Google регіони](https://ai.google.dev/gemini-api/docs/available-regions),
а також фактичний маршрут з’єднання; сама по собі ця помилка не свідчить про недійсний API-ключ.

### Надавайте перевагу проксі для окремого з’єднання

Використовуйте [налаштування проксі для окремого з’єднання](../ops/PROXY_GUIDE.md#4-level-proxy-system)
OmniRoute для проблемного з’єднання Gemini, а потім повторіть **Перевірку з’єднання** та невеликий запит
із тією самою моделлю. Так зміна маршрутизації буде обмежена лише цим з’єднанням. Переконайтеся,
що проксі доступний із контейнера й що з’єднання справді використовує
його. Зміна маршруту не гарантує відповідності регіональним вимогам зовнішнього сервісу.

### Порівняйте мережеві налаштування хоста й контейнера

Під час порівняння автентифікованих результатів використовуйте ті самі ключ, модель і запит; ніколи
не вставляйте в опис проблеми облікові дані, паролі проксі або повні заголовки авторизації.
Спочатку перевірте, які сімейства адрес пропонує системний DNS-резолвер, використовуючи ту саму команду
на хості та всередині контейнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Замініть `omniroute` на назву запущеного вами сервісу (наприклад, `omniroute-web`). Ці
команди виводять сімейства адрес без облікових даних або IP-адрес. Повернуте значення `6`
показує лише наявність результату DNS для IPv6: воно **не** доводить наявність придатного маршруту IPv6 або доступу до API.
Якщо встановлено `curl`, порівняйте `curl -4 -I https://generativelanguage.googleapis.com`
із `curl -6 -I https://generativelanguage.googleapis.com` в обох середовищах.
HTTP-відповідь підтверджує доступність з’єднання для цієї перевірки, навіть якщо це помилка
неавтентифікованого запиту; лише автентифікований запит до моделі перевіряє доступність Gemini.

### Альтернатива на рівні хоста: працездатний IPv6 і політика резолвера

Автор повідомлення [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) відновив
доступ у своєму середовищі, увімкнувши IPv6 для контейнерів і змінивши порядок вибору адрес
glibc. Розглядайте це як альтернативу, специфічну для конкретного середовища. Перш ніж змінювати параметри резолвера,
переконайтеся в працездатності IPv6 на хості, вихідної маршрутизації контейнера та правил брандмауера.
Сама по собі приватна ULA-адреса не підтверджує наявність публічного IPv6-з’єднання.

Для сервісів, уже підключених до стандартної мережі Compose, цей фрагмент вмикає
IPv6 у такій мережі; збережіть решту налаштувань сервісу, портів, томів і конфігурації:

```yaml
networks:
  default:
    enable_ipv6: true
```

Для іменованої мережі ввімкніть IPv6 у тій мережі, до якої фактично підключається сервіс. Docker може
виділити ULA-підмережу; указуйте явну підмережу без перетинів лише тоді, коли цього потребує ваша мережа.
Див. [мережеву підтримку IPv6 у Docker](https://docs.docker.com/engine/daemon/ipv6/)
та [параметри мереж Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

В **образі на основі glibc** файл `/etc/gai.conf` може змінювати порядок вибору адрес. Поточний
Dockerfile репозиторію використовує Debian; власні образи на основі musl не підтримують цей механізм.
Описана зміна замінює мітку ULA з `label fc00::/7 6` на
`label fc00::/7 1`. Візьміть за основу повну таблицю політик образу та збережіть решту її
записів: додавання запису `label` або `precedence` замінює цю стандартну таблицю, тому файлу,
що містить лише змінений рядок, недостатньо. У
[довідці з конфігурації glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
описано цю семантику. Підключіть перевірений файл як bind mount лише для читання до `/etc/gai.conf`
і повторно створіть сервіс, щоб застосувати зміни.

Це змінює вибір адрес на рівні ОС для **всього вихідного трафіку в цьому контейнері**.
Це не змушує всі застосунки вибирати IPv6: порядок DNS і вибір з’єднання в Node
також мають значення. Зокрема, `--dns-result-order=ipv4first` надає перевагу IPv4 і
не усуває проблему, яка виникає лише з IPv4. Див. [порядок DNS у Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Після будь-якої зміни на рівні хоста повторно перевірте Gemini та інших постачальників.
Щоб відкотити зміни, видаліть підключення власного `gai.conf`, відновіть попередню конфігурацію мережі та
повторно створіть відповідний сервіс/мережу під час вікна технічного обслуговування. Повторне створення мережі
може перервати роботу інших підключених до неї контейнерів; не видаляйте том із постійними даними.

## Важливі примітки

- **Режим WAL у SQLite:** Команда `docker stop` повинна мати змогу завершити роботу, щоб OmniRoute міг записати останні зміни з контрольної точки назад у `storage.sqlite`. Файли Compose, що входять до комплекту, уже встановлюють 40-секундний пільговий період для зупинки. Якщо ви запускаєте образ безпосередньо, використовуйте `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Установіть значення `true`, якщо планове резервне копіювання та резервне копіювання перед записом виконуються зовнішніми засобами. Міграції наявної бази даних усе одно потребують власного надійного знімка для безпеки та захисту від масової міграції.
- **Збереження даних:** Завжди монтуйте том у `/app/data`, щоб зберігати базу даних, ключі та конфігурації після перезапусків контейнера.
- **Налаштування порту:** Перевизначте змінну середовища `PORT`, щоб змінити стандартний порт `20128`.

## Дивіться також

- [Посібник із розгортання на VM](../ops/VM_DEPLOYMENT_GUIDE.md) — налаштування VM + nginx + Cloudflare
- [Посібник із розгортання на Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — розгортання на Fly.io
- [Налаштування середовища](../reference/ENVIRONMENT.md) — повний довідник щодо `.env`
