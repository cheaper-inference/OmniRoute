# CLI Integrations (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Информацию об общем исполняемом манифесте, ограниченных дочерних средах и постоянной настройке Gemini см. в разделе [Контракты запуска CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute предоставляет семейство команд `setup-*`, которые настраивают кодировку CLI (Codex, Claude Code, OpenCode, Cline, …) для использования OmniRoute в качестве серверной части — поэтому инструмент взаимодействует с** один** конечная точка и OmniRoute направляются к нужному провайдеру с автоматическим возвратом. Каждая команда считывает** жить** каталог моделей из работающего OmniRoute (локального или удаленного) и записывает собственный файл конфигурации инструмента на** твой** машина. На ключ API ссылается переменная среды везде, где инструмент ее поддерживает. Ниже перечислены команды, сохраняющие файл локальной среды инструмента.

Существует также универсальный лаунчер — `omniroute run <target>` — который запускает `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` или `whycodes` с правильным внедренным env, вообще без написания какой-либо конфигурации. Цели и их псевдонимы берутся из канонического манифеста `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), а `omniroute completion` предлагает те же целевые слова, производные от манифеста. Устаревшие средства запуска отдельных инструментов — `omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) — остаются доступными.

Регистрация поставщика доступна из того же контекста local/remote. Приведенные ниже команды API-first отделяют аутентификацию управления от учетных данных поставщика и никогда не печатают учетные данные в структурированном выводе:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Для сценариев отдавайте предпочтение `--credential-stdin` или `--credential-env`; `--credential` сохраняется для контролируемого локального использования. `providers remove` требует `--yes` на неинтерактивном терминале, и все пять команд учитывают активный контекст или глобальные параметры `--base-url`/`--api-key`.

Селекторы поставщиков отклоняют неоднозначные префиксы, имена или имена поставщиков ID ; используйте полное соединение ID когда совпадают несколько соединений. Команды создания и редактирования считывают сохраненное соединение обратно, а удаление проверяет, что оно больше не доступно для чтения. Импорт пропускает существующую пару provider/name. Импортированные записи не могут переопределить конечную точку управления, контекст или учетные данные управления, предоставленные CLI.

Для единовременной, написанной вручную базовой настройки двух самых богатых интеграций см. Подробное описание каждого инструмента:

- [Конфигурация кода Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [конфигурация Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Удаленный режим](./REMOTE-MODE.md) — управляйте удаленным OmniRoute (VPS /Tailnet) со своего ноутбука.
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — расширение OmniCopilot ; он также может запускать эти команды `setup-*` из редактора.

---

## Главный стол

Каждая команда чтит** активный контекст** (устанавливается с помощью `omniroute connect`, см. [Удаленный режим](./REMOTE-MODE.md) ) или явных флагов `--remote <url> --api-key <key>`. «Локальный или удаленный» ниже означает: без флагов он нацелен `http://localhost:20128`; с помощью `--remote` (или активного удаленного контекста) он извлекает каталог с этого сервера и записывает конфигурацию локально.

| Команда                    | Инструмент                         | Что пишет                                                                                                                                                                      | Ключевые флаги                                                                                                                             | Локальный или удаленный |
| -------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                   | `~/.codex/<name>.config.toml` — один профиль для каждой совместимой текстовой модели (`codex --profile <name>`)                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Оба                     |
| `omniroute setup-claude`   | Claude код                         | `~/.claude/profiles/<name>/settings.json` — один профиль для каждой подобранной модели (`CLAUDE_CONFIG_DIR`)                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Оба                     |
| `omniroute setup-opencode` | OpenCode (совместимый с OpenAI)    | `~/.config/opencode/opencode.json` — поставщик `omniroute` для каждой модели каталога (`opencode -m omniroute/<model>`)                                                        | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Оба                     |
| `omniroute setup-cline`    | Cline                              | `~/.cline/data/{globalState,secrets}.json` (режим CLI ) + печатает настройки расширения кода VS                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Оба                     |
| `omniroute setup-kilo`     | Код килограмма                     | `~/.local/share/kilo/auth.json` (CLI) + объединяет `kilocode.*` в VS Код `settings.json` если он присутствует.                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Оба                     |
| `omniroute setup-continue` | Продолжить / `cn` CLI              | `~/.continue/config.yaml` — модели `provider: openai`, ключ через `${{ secrets.OMNIROUTE_API_KEY }}`                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба                     |
| `omniroute setup-cursor`   | Cursor                             | Ничего — печатает действия в приложении (конфигурация Cursor непрозрачна SQLite)                                                                                               | `--remote` `--api-key` `--only` `--port`                                                                                                   | Оба                     |
| `omniroute setup-roo`      | Кодекс Ру                          | `~/.omniroute/roo-settings.json` (импорт документа) + устанавливает `roo-cline.autoImportSettingsPath` если существует код VS `settings.json`                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Оба                     |
| `omniroute setup-crush`    | Раздавить                          | `~/.config/crush/crush.json` — провайдер `openai-compat`, ключ через `$OMNIROUTE_API_KEY`                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба                     |
| `omniroute setup-zed`      | Zed                                | `~/.config/zed/settings.json` — поставщик `openai_compatible.omniroute` (модели с поддержкой инструментов ≤ 25), ключ через `$OMNIROUTE_API_KEY`                               | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Оба                     |
| `omniroute setup-goose`    | Гусь                               | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + печатает рецепт env                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба                     |
| `omniroute setup-aider`    | Айдер                              | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + печатает рецепт env                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба                     |
| `omniroute setup-qwen`     | Qwen код                           | `~/.qwen/settings.json` — `modelProviders.openai` V4 zqc + `OMNIROUTE_API_KEY` `~/.qwen/.env`                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Оба                     |
| `omniroute setup-5dive`    | 5 погружений (агентский флот)      | Ничего под `$HOME` — пишет 5dive** профиль аутентификации** (`/var/lib/5dive/auth-profiles/<name>/`) через `5dive agent auth set`; только root, работает на хосте парка        | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Оба                     |
| `omniroute setup-whycodes` | WhyCodes                           | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); путь — `$WHYCODES_HOME/config.toml` или `~/.whycodes/config.toml`                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба                     |
| `omniroute run <target>`   | Запуск во время выполнения (общий) | Ничего — создайте `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` с правильными env и аргументами; Qwen и Gemini используют временный изолированный дом | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Оба                     |
| `omniroute launch`         | Claude код                         | Ничего — порождает `claude` с введенным `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                            | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Оба                     |
| `omniroute launch-codex`   | OpenAI Codex CLI                   | Ничего — порождает `codex` с провайдером `omniroute`, внедренным через флаги `-c`                                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Оба                     |

Примечания к флагам (проверено в исходном коде команды):

- `--remote <url>` — получить каталог с удаленного OmniRoute (переопределяет `--port` и активный контекст). `--api-key <key>` предоставляет учетные данные для этого сервера (по умолчанию используется переменная `OMNIROUTE_API_KEY` env или токен активного контекста).
- `--only <patterns>` — подстроки, разделенные запятыми; оставляйте только соответствующие модели IDs (например, `--only glm,kimi`). Доступно на `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — вывести именно то, что будет записано, не затрагивая файловую систему. Доступно для каждой команды `setup-*`** кроме** `setup-cursor` (который никогда не записывает файлы).
- `--model <id>` — требуется (или выбирается интерактивно) для инструментов, у которых нет автоматического обнаружения модели: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Эти инструменты также принимают `--yes` для неинтерактивных запусков (для чего тогда требуется `--model`). `setup-opencode` использует `--model` для установки модели верхнего уровня по умолчанию.
- `--model <id>` на `omniroute run` соответствует привязке манифеста к каждой цели (`bin/cli/cli-manifest.mjs`):** помощник** получает `--model openai/<id>` и** открытый код** `--model omniroute/<id>` (префикс добавляется только в том случае, если идентификатор еще не содержит его);** qwen** и** Близнецы** получить идентификатор дословно;** Клод** получает его через `ANTHROPIC_MODEL`,** Гусь** через `GOOSE_MODEL`,** почему коды** через `-P omniroute -m <id>` и** кодекс** через `-c model_providers.omniroute.*` args.**Qwen — единственная цель запуска, для которой жестко требуется `--model`** — `omniroute run qwen` без него завершает работу `2` с явной ошибкой.
- `--port <port>` — локальный порт OmniRoute (по умолчанию `20128`, игнорируется, если установлен `--remote` ). Присутствует на всех `setup-*` и обоих лаунчерах.
- Коды завершения `omniroute run` : собственный код завершения дочернего CLI передается дословно; `2` = недопустимые аргументы (неподдерживаемая цель, отсутствует необходимый `--model`, защита контейнера); `127` = целевой двоичный файл отсутствует в `PATH`; `130`/`143`/`129`, когда запуск завершается командой `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = другой сбой при запуске среды выполнения.
- Два средства запуска (`launch`, `launch-codex`) принимают `--profile <name>` для выбора профиля, написанного `setup-claude` / `setup-codex`, а также сквозные аргументы для базового двоичного файла `claude` / `codex`.

Интерактивный сборщик также используется в рецептах установки:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` в настоящее время делегирует проверенные рецепты для `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`. Записи каталога только для IDE, MITM и только для руководства остаются явными потоками `setup-*`/manual и не представляются как целевые объекты для запуска.

> `setup-opencode` - это** легкий, совместимый с openai** OpenCode интеграция. Существует также более богатая интеграция плагинов — `omniroute setup opencode` — которая устанавливает `@omniroute/opencode-plugin`. Это разные команды; В приведенной выше таблице документы `setup-opencode`.
>
> Плагин поставляется в двух пакетах, по одному для каждого OpenCode major, поскольку два загрузчика ожидают разные точки входа: `@omniroute/opencode-plugin` для OpenCode v1 и `@omniroute/opencode-plugin-v2` для OpenCode v2. Пакет v2 является новым (`0.1.0`) и следует хост-контракту, который все еще действует, поэтому он считывает начальные значения формы OpenCode в черновик каталога, а не предполагает его. Установите его, добавив запись `plugins` в `opencode.json`; `omniroute setup opencode` по-прежнему устанавливает пакет v1. Параметры и порядок поиска учетных данных находятся в пакете README.

---

## Локальное использование

Когда OmniRoute запущен на `localhost:20128`, просто выполните команду настройки для вашего инструмента. Каталог загружается с локального сервера.

```bash
# Codex: записать профиль для каждой сопоставленной модели в ~/.codex/
omniroute setup-codex
codex --profile glm52            # использовать сгенерированный профиль

# Claude Code: записать профили для каждой модели, затем запустить один из них
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записать OpenAI-совместимый провайдер со всеми моделями каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # используется через {env:OMNIROUTE_API_KEY}, никогда не сохраняется на диск
opencode -m omniroute/glm/glm-5.2 "..."

# Для инструментов без автоматического обнаружения модель необходимо указать явно:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Предварительный просмотр без записи каких-либо данных:
omniroute setup-continue --dry-run
```

Запуск без записи какой-либо конфигурации (только внедрение переменных окружения):

```bash
omniroute launch                 # Claude Code → локальный OmniRoute
omniroute launch-codex           # Codex CLI → локальный OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Явный путь к команде: всё после -- передаётся без изменений
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Удалённое использование

Направьте любую команду настройки на удалённый OmniRoute с помощью `--remote` и `--api-key`. Каталог загружается с удалённого сервера, а конфигурация записывается на локальном компьютере.

```bash
# OpenCode с удалённым VPS, оставить только модели glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # сначала экспортируйте OMNIROUTE_API_KEY

# Профили Codex из удалённого каталога
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Запустить CLI непосредственно с подключением к удалённому серверу
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Вместо того чтобы каждый раз передавать `--remote`/`--api-key`, войдите один раз, и **активный контекст** будет автоматически предоставлять эти параметры:

```bash
omniroute connect 192.168.0.15        # выпускает токен с ограниченной областью действия и сохраняет контекст
omniroute setup-codex                 # ← теперь использует удалённый каталог
omniroute setup-opencode              # ← аналогично
omniroute launch                      # ← Claude Code с подключением к удалённому серверу
```

Сведения о контекстах, областях действия и управлении токенами см. в разделе [Удалённый режим](./REMOTE-MODE.md).

---

## Парки агентов 5dive

[5dive](https://5dive.ai) запускает парк длительно работающих агентов для программирования, каждый из которых является юнитом systemd под отдельным пользователем Unix. Сам по себе он не является CLI для программирования, поэтому `omniroute run` нечего запускать — `5dive` является целью **только для настройки**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Обе формы записывают один **профиль аутентификации** 5dive, после чего каждое место `claude`, привязанное к этому профилю, взаимодействует с OmniRoute. Для этой цели характерны три особенности:

- **Команда выполняется на хосте парка от имени root.** Команды 5dive работают с локальными юнитами systemd и принадлежащим root каталогом состояния; удалённый режим отсутствует. Если команда ещё не выполняется от имени root, рецепт повторно запускает её через `sudo` (`--no-sudo` отключает это поведение и вместо выполнения выводит команду).
- **Конечная точка должна использовать `https://`, если только это не loopback-адрес.** API-ключ агента передаётся через этот URL с каждым запросом, и 5dive отклоняет незашифрованную конечную точку за пределами хоста. Адрес частной локальной сети не является исключением.
- **Закреплённая за каждым местом модель имеет приоритет над профилем.** Профиль содержит `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, однако место, всё ещё закреплённое за стандартным идентификатором модели, завершит первый запрос ошибкой _«Возникла проблема с выбранной моделью»_. Передайте `--agent <name>` (можно указывать несколько раз), чтобы также закрепить модели за местами; если этого не сделать, рецепт выведет соответствующую команду.

API-ключ передаётся 5dive через **stdin** (`--api-key=-`), поэтому он никогда не отображается в выводе `ps`.

Чтобы обеспечить переключение провайдера для парка при сбое, профиль следует направить на **комбинацию** OmniRoute, а не на отдельную модель: когда основной сервер стал полностью недоступен в середине запроса во время запуска, зафиксированного в [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агент завершил оставшиеся шаги с помощью резервного сервера, не показывая пользователю сбой.

---

## Базовые соглашения URL (какие инструменты хотят использовать `/v1`)

OmniRoute предоставляет поверхность OpenAI в `/v1`, поверхность Anthropic в корне и собственную поверхность Gemini в `/v1beta`. Каждая интеграция привязана к форме, которую ожидает ее инструмент (проверено в источнике команды):

| Интеграция                                                                 | База URL написана | `/v1`?                                         |
| -------------------------------------------------------------------------- | ----------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | корень            | Нет — Cline добавляет `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | корень            | Нет — Гусь добавляет путь                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корень            | Нет — LiteLLM добавляет `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | с `/v1`           | Да                                             |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | с `/v1`           | Да                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корень            | Нет — код Claude добавляет `/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | с `/v1`           | Да                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | с `/v1`           | Да                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корень            | Нет — SDK добавляет `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` в профиле аутентификации)              | корень            | Нет — код Claude добавляет `/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | с `/v1`           | Да — WhyCodes публикует `/chat/completions`    |

---

## Сохранение нативных зависимостей при обновлении: `--include=optional`

При обновлении с помощью `omniroute update` (после подтверждения или с флагом `--apply`)
OmniRoute запускает установку со встроенным флагом `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Это **не** флаг, который нужно передавать в `omniroute update`, — средство обновления
всегда применяет его автоматически. Это гарантирует, что `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, стек SLM LLMLingua) сохранятся после
обновления, даже если в конфигурации npm задано `omit=optional`, из-за чего в противном
случае нативный драйвер SQLite и привязка к хранилищу ключей ОС были бы незаметно
удалены. Чтобы просмотреть точную команду без её выполнения:

```bash
omniroute update --dry-run
# [ПРОБНЫЙ ЗАПУСК] Будет выполнено: npm install -g omniroute@latest --include=optional
```

Другие флаги `omniroute update` (проверено по исходному коду): `--check` (завершиться с кодом 1,
если версия устарела), `--apply` (установить без запроса подтверждения), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI через `omniroute run gemini`

Контракт проверен с `@google/gemini-cli` 0.50.0: CLI учитывает
`GOOGLE_GEMINI_BASE_URL` и отправляет `POST /v1beta/models/<model>:generateContent`
(а также `:streamGenerateContent?alt=sse`) по этому адресу — в точности на нативный
интерфейс Gemini OmniRoute (`/v1beta`). `omniroute run gemini` настраивает это автоматически:

- `GOOGLE_GEMINI_BASE_URL` → активный базовый URL OmniRoute (корень, без `/v1`);
- `GEMINI_API_KEY` → определённые учётные данные OmniRoute (параметр/переменная окружения/контекст);
- **временный изолированный `GEMINI_CLI_HOME`**, в котором `.gemini/settings.json`
  выбирает аутентификацию `gemini-api-key`, поэтому сохранённый сеанс Google OAuth (Code Assist)
  никогда не переопределяет запуск, направленный через OmniRoute; каталог удаляется после завершения;
- **гигиена переменных окружения**: из окружения дочернего процесса удаляются
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` и `GOOGLE_GENAI_USE_GCA` (которые перенаправили бы
  аутентификацию на Vertex/Code Assist), а `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  задаётся как дополнительная страховка; другие цели `run` подвергаются такой же
  обработке собственных конфликтующих переменных;
- добавление `--model <id>` на основе `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Проверка доверия к рабочей области Gemini по-прежнему действует в безголовом режиме — передайте
`--skip-trust` (или подтвердите доверие к каталогу интерактивно) самостоятельно; средство запуска
намеренно не обходит эту проверку. Это средство запуска отличается от **регистрации ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), которая остаётся интеграцией
агентского протокола для `/dashboard/acp-agents`.

---

## Реальная smoke-проверка (по запросу)

Детерминированные регрессионные тесты плана запуска выполняются в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Для проверки РЕАЛЬНЫХ исполняемых файлов с РЕАЛЬНЫМ
сервером OmniRoute предусмотрен запускаемый по запросу тестовый стенд:
`tests/integration/upstream-cli-smoke.int.test.ts`. Он никогда не запускается автоматически
(каждый подтест пропускается, если не задано `RUN_CLI_SMOKE=1`), передаёт учётные данные по ИМЕНИ
переменной окружения (никогда не передавая само значение), скрывает строки, похожие на ключи, во всех записываемых выходных данных, пропускает
цели, исполняемые файлы которых не установлены, и классифицирует сбои как
auth / upstream / config вместо простого логического значения:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Необязательно: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничивает набор проверяемых целей;
`OMNIROUTE_SMOKE_TIMEOUT_MS` переопределяет 120-секундный тайм-аут для каждой цели.

---

## См. также

- [Настройка Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — подробное руководство по Claude Code
- [Настройка Codex CLI](./CODEX-CLI-CONFIGURATION.md) — первоначальная базовая настройка `[model_providers.omniroute]`
- [Удалённый режим](./REMOTE-MODE.md) — контексты, токены доступа с ограниченной областью действия и управление удалённым сервером
- [Справочник по инструментам CLI](../reference/CLI-TOOLS.md) — полный каталог поддерживаемых инструментов и страниц панели управления
- [Руководство по установке](./SETUP_GUIDE.md) — способы установки и первоначальная настройка при первом запуске
