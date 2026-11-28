# CLI Integrations (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Для спільного маніфесту виконуваного файлу, обмежених дочірніх середовищ і постійного налаштування Gemini див. [контракти про запуск CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute постачає сімейство команд `setup-*`, які налаштовують кодування CLI (Codex, Claude Code, OpenCode, Cline, …) для використання OmniRoute як серверної частини —, щоб інструмент спілкувався з** один** кінцева точка та OmniRoute маршрутизують до потрібного постачальника з автоматичним відключенням. Команди налаштування використовують ваш активний локальний або віддалений контекст OmniRoute і налаштовують інструмент** ваш** машина. Рецепти на основі каталогу отримують моделі з сервера; рецепти однієї моделі приймають `--model` або підказують для моделі ID. На ключ API посилається змінна середовища скрізь, де інструмент його підтримує. Нижче наведено команди, які зберігають файл локального середовища інструменту.

Каталог і команди автоматизації охоплюють різні набори інструментів:

| Поверхня                       | Граф | Що це означає                                                                       |
| ------------------------------ | ---- | ----------------------------------------------------------------------------------- |
| Каталог інструментів           | 39   | Задокументовані інструменти кодування та агенти, включаючи інтеграцію вручну та IDE |
| `omniroute run <target>`       | 8    | Запуск адаптерів, які надають цільову кінцеву точку, облікові дані та модель        |
| `omniroute configure <target>` | 12   | Інтерактивні рецепти конфігурації, що підтримуються командами `setup-*`             |
| команди `setup-*`              | 16   | Зареєстровані команди налаштування, включаючи налаштування редактора guided/manual  |

Підрахунки відображають [маніфест інструмента](../../config/cli-tools-manifest.json) та [реєстр команд](../../bin/cli/commands/registry.mjs) 2026-11-17. Запис у каталозі не означає адаптер запуску. Перегляньте [каталог інструментів CLI](../reference/CLI-TOOLS.md) для повного переліку.

Існує також загальний засіб запуску — `omniroute run <target>` —, який створює `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` або `whycodes` із введенням правильного env, без написання будь-якої конфігурації. Цілі та їхні псевдоніми походять із канонічного маніфесту `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), а `omniroute completion` пропонує ті самі цільові слова, отримані з маніфесту. `omniroute launch <tool>` запускає підтримуваний інструмент кодування з маркером сеансу для кожного запуску та списком моделей, створеним із підключених провайдерів, і автоматично запускає локальний шлюз, коли жоден не працює (див. [LAUNCH.md](./LAUNCH.md) ). Застарілі засоби запуску для кожного інструменту — `omniroute launch` без назви інструменту ( код Claude ) і `omniroute launch-codex` (Codex) — залишаються доступними.

Реєстрація постачальника доступна з того самого контексту local/remote. Наведені нижче команди API-First зберігають автентифікацію керування окремо від облікових даних постачальника та ніколи не друкують облікові дані в структурованому виведенні:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Для сценаріїв віддайте перевагу `--credential-stdin` або `--credential-env`; `--credential` зберігається для контрольованого локального використання. `providers remove` вимагає `--yes` на неінтерактивному терміналі, і всі п’ять команд враховують активний контекст або глобальні параметри `--base-url`/`--api-key`.

Селектори провайдерів відхиляють неоднозначні префікси, назви та назви провайдерів ID ; використовувати повне з'єднання ID коли збігаються кілька з'єднань. Команди створення та редагування повертають збережене з’єднання, а видалення підтверджує, що воно більше не читається. Імпорт пропускає наявну пару provider/name. Імпортовані записи не можуть замінити кінцеву точку керування, контекст або облікові дані керування, надані в CLI.

Щоб отримати одноразову ручну базову настройку двох найбагатших інтеграцій, перегляньте докладні відомості про кожен інструмент:

- [Конфігурація коду Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [конфігурація Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Віддалений режим](./REMOTE-MODE.md) — керуйте дистанційним OmniRoute (VPS / Tailnet) зі свого ноутбука
- [VS Код Copilot Чат](./VSCODE-COPILOT.md) — розширення OmniCopilot ; він також може виконувати ці команди `setup-*` для вас із редактора

---

## Майстер стіл

Кожна команда шанує** активний контекст** (встановлюється за допомогою `omniroute connect`, див. [Віддалений режим](./REMOTE-MODE.md) ) або явні прапорці `--remote <url> --api-key <key>`. «Локальний проти віддаленого» нижче означає: без прапорів він націлений на `http://localhost:20128`; за допомогою `--remote` (або активного віддаленого контексту) він налаштовує цей сервер як серверну частину та записує конфігурацію локально. Рецепти на основі каталогу також отримують моделі з цього сервера.

| Команда                    | Інструмент                              | Що пише                                                                                                                                                                         | Ключові прапори                                                                                                                            | Місцеве проти віддаленого |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                        | `~/.codex/<name>.config.toml` — один профіль на сумісну текстову модель (`codex --profile <name>`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Обидва                    |
| `omniroute setup-claude`   | Код Claude                              | `~/.claude/profiles/<name>/settings.json` — один профіль на відповідну модель (`CLAUDE_CONFIG_DIR`)                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Обидва                    |
| `omniroute setup-opencode` | OpenCode (сумісний з openai)            | `~/.config/opencode/opencode.json` — `omniroute` постачальник з кожною моделлю каталогу (`opencode -m omniroute/<model>`)                                                       | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Обидва                    |
| `omniroute setup-cline`    | Cline                                   | `~/.cline/data/{globalState,secrets}.json` (режим CLI ) + друкує налаштування розширення коду VS                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Обидва                    |
| `omniroute setup-kilo`     | Код кіло                                | `~/.local/share/kilo/auth.json` (CLI) + об’єднує `kilocode.*` у VS Код `settings.json` якщо присутній                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Обидва                    |
| `omniroute setup-continue` | Продовжити / `cn` CLI                   | `~/.continue/config.yaml` — `provider: openai` моделі, ключ через `${{ secrets.OMNIROUTE_API_KEY }}`                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Обидва                    |
| `omniroute setup-cursor`   | Cursor                                  | Ніщо — не друкує кроки в програмі ( конфігурація Cursor непрозора SQLite)                                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | Обидва                    |
| `omniroute setup-roo`      | Ру код                                  | `~/.omniroute/roo-settings.json` (імпорт документа) + встановлює `roo-cline.autoImportSettingsPath` якщо існує код VS `settings.json`                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Обидва                    |
| `omniroute setup-crush`    | розчавити                               | `~/.config/crush/crush.json` — `openai-compat` постачальник, ключ через `$OMNIROUTE_API_KEY`                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Обидва                    |
| `omniroute setup-zed`      | Zed                                     | `~/.config/zed/settings.json` — `openai_compatible.omniroute` постачальник (моделі з підтримкою інструментів ≤ 25), ключ через `$OMNIROUTE_API_KEY`                             | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Обидва                    |
| `omniroute setup-goose`    | Гусак                                   | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + друкує рецепт env                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Обидва                    |
| `omniroute setup-aider`    | Айдер                                   | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + друкує рецепт env                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Обидва                    |
| `omniroute setup-qwen`     | Код Qwen                                | `~/.qwen/settings.json` — V4 `modelProviders.openai` масив + `OMNIROUTE_API_KEY` у `~/.qwen/.env`                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Обидва                    |
| `omniroute setup-gemini`   | Gemini CLI (рідний Gemini API)          | вибір і модель автентифікації `~/.gemini/settings.json` — ; `~/.gemini/.env` ключ —, корінь сервера та середовище Gemini                                                        | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Обидва                    |
| `omniroute setup-5dive`    | 5dive (агентський флот)                 | Нічого під `$HOME` — не пише 5dive** профіль авторизації** (`/var/lib/5dive/auth-profiles/<name>/`) через `5dive agent auth set`; лише root, працює на хості флоту              | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Обидва                    |
| `omniroute setup-whycodes` | WhyCodes                                | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); шлях – це `$WHYCODES_HOME/config.toml` або `~/.whycodes/config.toml`                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Обидва                    |
| `omniroute run <target>`   | Запуск середовища виконання (загальний) | Nothing — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` with the right env and args; Qwen і Gemini використовують тимчасовий ізольований будинок | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Обидва                    |
| `omniroute launch`         | Код Claude                              | Нічого — не породжує `claude` із введеним `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Обидва                    |
| `omniroute launch <tool>`  | Будь-який інструмент для запуску        | Nothing in your own config: per-launch config in a private temp dir, a session token                                                                                            | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Обидва                    |
| `omniroute launch-codex`   | OpenAI Codex CLI                        | Nothing — spawns `codex` with the `omniroute` provider injected via `-c` flags                                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Обидва                    |

Примітки щодо прапорів (перевірено в джерелі команд):

- `--remote <url>` — use a remote OmniRoute (overrides `--port` and the active context). `--api-key <key>` supplies the credential for that server (defaults to the `OMNIROUTE_API_KEY` env var, or the active context's token).
- `--only <patterns>` — розділені комами підрядки; зберігати лише модель IDs яка відповідає (наприклад, `--only glm,kimi`). Available on `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — print exactly what would be written without touching the filesystem. Доступно для кожної команди `setup-*`** крім** `setup-cursor` (який ніколи не записує файл).
- `--model <id>` — необхідний (або вибраний інтерактивно) для інструментів, які не мають автоматичного визначення моделі: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Those tools also accept `--yes` for non-interactive runs (which then requires `--model`). `setup-opencode` takes `--model` to set the default top-level model.
- `--model <id>` на `omniroute run` відповідає маніфесту для кожної цілі (`bin/cli/cli-manifest.mjs`):** помічник** отримує `--model openai/<id>` і** відкритий код** `--model omniroute/<id>` (префікс додається лише тоді, коли ідентифікатор його ще не містить);** qwen** і** близнюки** отримати ідентифікатор дослівно;** Клод** отримує через `ANTHROPIC_MODEL`,** гусак** через `GOOSE_MODEL`,** whycodes** через `-P omniroute -m <id>` і** кодекс** через `-c model_providers.omniroute.*` args.**Qwen — це єдина мета запуску, яка жорстко вимагає `--model`** — `omniroute run qwen` без нього завершує роботу `2` із явною помилкою.
- `--port <port>` — local OmniRoute port (default `20128`, ignored when `--remote` is set). Присутній на всіх `setup-*` і обох лаунчерах.
- `omniroute run` exit codes: the child CLI's own exit code is propagated verbatim; `2` = invalid arguments (unsupported target, missing required `--model`, container guard); `127` = цільовий двійковий файл не в `PATH`; `130`/`143`/`129`, коли запуск завершується `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = інша помилка запуску середовища виконання.
- Два засоби запуску (`launch`, `launch-codex`) приймають `--profile <name>` для вибору профілю, написаного `setup-claude` / `setup-codex`, а також наскрізні аргументи для основного двійкового файлу `claude` / `codex`.

The interactive picker is also shared by the setup recipes:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` наразі делегує перевірені рецепти для `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` та `whycodes`. IDE-only, MITM, and guide-only catalog entries remain explicit `setup-*`/manual flows and are not presented as launchable targets.

> `setup-opencode` це** легкий openai-сумісний** інтеграція OpenCode. Існує також розширена інтеграція плагіна — `omniroute setup opencode` —, яка встановлює `@omniroute/opencode-plugin`. Це різні команди; таблиця вище документів `setup-opencode`.
>
> Плагін постачається у двох пакетах, по одному на OpenCode major, оскільки два завантажувачі очікують різних точок входу: `@omniroute/opencode-plugin` для OpenCode v1 і `@omniroute/opencode-plugin-v2` для OpenCode v2. Пакет v2 є новим (`0.1.0`) і відповідає хост-контракту, який ще переміщується, тому він зчитує початкові значення форми OpenCode у чернетці каталогу, а не приймає його. Встановіть його, додавши запис `plugins` до `opencode.json`; `omniroute setup opencode` все ще встановлює пакет v1. Параметри та порядок пошуку облікових даних знаходяться в пакеті README.

---

## Локальне використання

Коли OmniRoute працює на `localhost:20128`, просто виконайте команду налаштування для свого
інструмента. Каталог отримується з локального сервера.

```bash
# Codex: записати профіль для кожної відповідної моделі в ~/.codex/
omniroute setup-codex
codex --profile glm52            # використати згенерований профіль

# Claude Code: записати профілі для кожної моделі, а потім запустити один із них
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записати сумісний з openai провайдер з усіма моделями каталогу
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # використовується через {env:OMNIROUTE_API_KEY}, ніколи не зберігається на диску
opencode -m omniroute/glm/glm-5.2 "..."

# Для інструментів без автоматичного виявлення потрібно явно вказати модель:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Попередній перегляд без запису будь-яких даних:
omniroute setup-continue --dry-run
```

Запуск узагалі без запису конфігурації (лише через передавання змінних середовища):

```bash
omniroute launch                 # Claude Code → локальний OmniRoute
omniroute launch-codex           # Codex CLI → локальний OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Явний шлях до команди: передати далі все, що йде після --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Віддалене використання

Спрямуйте будь-яку команду налаштування на віддалений OmniRoute за допомогою `--remote` + `--api-key`.
Каталог отримується з віддаленого сервера, а конфігурація записується на вашому локальному комп’ютері.

```bash
# OpenCode із віддаленим VPS, залишити лише моделі glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # спочатку експортуйте OMNIROUTE_API_KEY

# Профілі Codex із віддаленого каталогу
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Запустити CLI безпосередньо з підключенням до віддаленого сервера
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Замість того щоб щоразу передавати `--remote`/`--api-key`, увійдіть один раз і дозвольте
**активному контексту** надавати їх автоматично:

```bash
omniroute connect 192.168.0.15        # створює токен з обмеженою областю дії та зберігає контекст
omniroute setup-codex                 # ← тепер використовує віддалений каталог
omniroute setup-opencode              # ← так само
omniroute launch                      # ← Claude Code із підключенням до віддаленого сервера
```

Відомості про контексти, області дії та керування токенами дивіться в розділі [Віддалений режим](./REMOTE-MODE.md).

---

## 5 флотів дайв-агентів

[5dive](https://5dive.ai) керує флотом довготривалих агентів кодування, кожен з яких є модулем systemd під своїм власним користувачем Unix. Це не кодування CLI, тому `omniroute run` не має нічого для запуску — `5dive`** лише для налаштування** мета.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Обидві форми пишуть один 5dive** профіль авторизації** , і кожне місце `claude` прив’язане до цього профілю, спілкується з OmniRoute. Для цієї цілі характерні три речі:

- **Він працює на хості флоту як root.** Дієслова 5dive діють на локальні системні одиниці та кореневий каталог стану; дистанційного режиму немає. Рецепт повторно виконується через `sudo` якщо він ще не є адміністратором (`--no-sudo` вимикає це та замість цього друкує команду).
- **Кінцевою точкою має бути `https://` якщо вона не петлева.** Ключ API агента керує цим URL під час кожного запиту, а 5dive відмовляється використовувати вихідну кінцеву точку з відкритим текстом. Приватна адреса LAN не є винятком.
- **Власний штифт моделі кожного сидіння випереджає профіль.** Профіль містить `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, але сидіння, яке все ще прикріплене до стандартного ідентифікатора моделі, не проходить свій перший хід із повідомленням _"Існує проблема з вибраною моделлю"_. Пройдіть `--agent <name>` (повторюється), щоб також закріпити сидіння; рецепт друкує команду, якщо ви цього не робите.

Ключ API передається 5dive on** stdin** (`--api-key=-`), тому він ніколи не з’являється у виводі `ps`.

Наведення профілю на OmniRoute** комбо** а не окрема модель — це те, що забезпечує відмову постачальника парку: коли основна кінцева точка жорстко відключилася в середині циклу в циклі, записаному на [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578), агент завершив свої кроки, що залишилися на резервному варіанті, і ніколи не виявив збою.

---

## Основні правила URL (які інструменти потребують `/v1`)

OmniRoute розкриває поверхню OpenAI у `/v1`, поверхню Anthropic у корені та рідну поверхню Gemini у `/v1beta`. Кожна інтеграція підключена до форми, яку очікує її інструмент (перевірено в джерелі команди):

| Інтеграція                                                                 | Написана база URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | корінь            | Ні — Cline додає `/v1/chat/completions`    |
| `setup-goose` (`OPENAI_HOST`)                                              | корінь            | Ні — гусак додає шлях                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корінь            | Ні — LiteLLM додає `/v1/chat/completions`  |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | з `/v1`           | так                                        |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | з `/v1`           | так                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корінь            | Ні — код Claude додає `/v1/messages`       |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | з `/v1`           | так                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | з `/v1`           | так                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корінь            | Ні — SDK додає `/v1beta/models/…`          |
| `setup-5dive` (`ANTHROPIC_BASE_URL` у профілі авторизації)                 | корінь            | Ні — код Claude додає `/v1/messages`       |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | з `/v1`           | Так — WhyCodes дописує `/chat/completions` |

---

## Збереження нативних залежностей під час оновлення: `--include=optional`

Коли ви виконуєте оновлення за допомогою `omniroute update` (після підтвердження або з `--apply`),
OmniRoute запускає встановлення з уже вбудованим параметром `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Це **не** прапорець, який потрібно передавати команді `omniroute update`, — засіб
оновлення завжди застосовує його автоматично. Це гарантує, що `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, стек SLM LLMLingua) збережуться після
оновлення, навіть якщо у вашій конфігурації npm встановлено `omit=optional`, через
що інакше без жодного попередження було б видалено нативний драйвер SQLite і прив’язку
до сховища ключів ОС. Щоб переглянути точну команду без її виконання:

```bash
omniroute update --dry-run
# [ПРОБНИЙ ЗАПУСК] Буде виконано: npm install -g omniroute@latest --include=optional
```

Інші прапорці `omniroute update` (перевірено у вихідному коді): `--check` (код виходу 1,
якщо версія застаріла), `--apply` (встановити без запиту підтвердження), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI через `omniroute run gemini`

Контракт перевірено з `@google/gemini-cli` 0.50.0: CLI враховує
`GOOGLE_GEMINI_BASE_URL` і надсилає `POST /v1beta/models/<model>:generateContent`
(і `:streamGenerateContent?alt=sse`) на цю адресу — саме так працює нативний
інтерфейс Gemini в OmniRoute (`/v1beta`). `omniroute run gemini` налаштовує це автоматично:

- `GOOGLE_GEMINI_BASE_URL` → активний базовий URL OmniRoute (корінь, без `/v1`);
- `GEMINI_API_KEY` → визначені облікові дані OmniRoute (параметр/середовище/контекст);
- **тимчасовий ізольований `GEMINI_CLI_HOME`**, у якому `.gemini/settings.json`
  вибирає автентифікацію `gemini-api-key`, щоб збережений сеанс Google OAuth (Code Assist)
  ніколи не перевизначав запуск, спрямований через OmniRoute, — видаляється після завершення;
- **гігієна середовища**: із середовища дочірнього процесу видаляються `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` і `GOOGLE_GENAI_USE_GCA` (які переспрямували б
  автентифікацію до Vertex/Code Assist), а `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  встановлюється як додатковий запобіжний механізм — інші цілі `run` отримують таке саме
  опрацювання власних конфліктних змінних;
- додавання `--model <id>` із `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Захист довіри до робочого простору Gemini продовжує діяти в безінтерфейсному режимі —
самостійно передайте `--skip-trust` (або інтерактивно позначте каталог як довірений);
засіб запуску навмисно не обходить цей захист. Цей засіб запуску відрізняється від
**реєстрації ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), яка залишається
інтеграцією протоколу агентів для `/dashboard/acp-agents`.

---

## Реальна димова перевірка (за бажанням)

Детерміновані регресійні запуски плану запуску виконуються в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Для перевірки РЕАЛЬНИХ бінарних файлів із РЕАЛЬНИМ
сервером OmniRoute доступний опціональний тестовий модуль за адресою
`tests/integration/upstream-cli-smoke.int.test.ts`. Він ніколи не запускається автоматично
(кожен підтест пропускається, якщо не встановлено `RUN_CLI_SMOKE=1`), передає облікові дані за НАЗВОЮ
змінної середовища (ніколи не за значенням), маскує рядки, схожі на ключі, у всіх записаних вихідних даних, пропускає
цілі, бінарні файли яких не встановлено, і класифікує помилки як
автентифікаційні / висхідного сервера / конфігураційні замість простого булевого значення:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Необов’язково: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` обмежує перевірку;
`OMNIROUTE_SMOKE_TIMEOUT_MS` перевизначає 120-секундний тайм-аут для кожної цілі.

---

## Дивіться також

- [Конфігурація Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — докладніший посібник із Claude Code
- [Конфігурація Codex CLI](./CODEX-CLI-CONFIGURATION.md) — одноразове базове налаштування `[model_providers.omniroute]`
- [Віддалений режим](./REMOTE-MODE.md) — контексти, токени доступу з обмеженою областю дії та керування віддаленим сервером
- [Довідник інструментів CLI](../reference/CLI-TOOLS.md) — повний каталог підтримуваних інструментів і сторінок панелі керування
- [Посібник із налаштування](./SETUP_GUIDE.md) — способи встановлення та початкове налаштування під час першого запуску
