# CLI Integrations (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

За споделения изпълним манифест, ограничени дъщерни среди и постоянна настройка Gemini вижте [договори за стартиране на CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute доставя семейство от `setup-*` команди, които конфигурират кодиране CLI (Codex, Claude код, OpenCode, Cline, …), за да използва OmniRoute като негов бекенд – така че инструментът говори с** един** крайна точка и OmniRoute маршрути до правилния доставчик с автоматично резервно връщане. Всяка команда чете** на живо** модел каталог от работещ OmniRoute (локален или отдалечен) и записва собствения конфигурационен файл на инструмента на** вашият** машина. Ключът API се посочва от променлива на средата, където инструментът го поддържа. По-долу са отбелязани команди, които поддържат файл за локална среда на инструмента.

Има и общ стартер — `omniroute run <target>` — който ражда `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` или `whycodes` с инжектиран правилен env, без изобщо да пише каквато и да е конфигурация. Целите и техните псевдоними идват от каноничния манифест `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), а `omniroute completion` предлага същите целеви думи, извлечени от манифеста. Наследените стартери за всеки инструмент — `omniroute launch` (Claude код) и `omniroute launch-codex` (Codex) — остават налични.

Включването на доставчик е достъпно от същия local/remote контекст. Първите API команди по-долу пазят удостоверяването на управлението отделно от идентификационните данни на доставчика и никога не отпечатват идентификационни данни в структуриран изход:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

За скриптове предпочитайте `--credential-stdin` или `--credential-env`; `--credential` се запазва за контролирана локална употреба. `providers remove` изисква `--yes` на неинтерактивен терминал и всичките пет команди зачитат активния контекст или глобалните `--base-url`/`--api-key` опции.

Селекторите на доставчици отхвърлят двусмислени ID префикси, имена или имена на доставчици; използвайте пълна връзка ID когато съвпадат няколко връзки. Командите за създаване и редактиране четат обратно запазената връзка и премахването потвърждава, че тя вече не е четлива. Импортирането пропуска съществуваща двойка provider/name. Импортираните записи не могат да заменят крайната точка за управление, контекста или идентификационните данни за управление, предоставени на CLI.

За еднократна, ръкописна базова настройка на двете най-богати интеграции вижте дълбоките гмуркания за всеки инструмент:

- [Claude конфигурация на кода](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI конфигурация](./CODEX-CLI-CONFIGURATION.md)
- [Дистанционен режим](./REMOTE-MODE.md) — управлявайте дистанционно OmniRoute (VPS / Tailnet) от вашия лаптоп
- [VS код Copilot чат](./VSCODE-COPILOT.md) — разширението OmniCopilot ; може също така да изпълнява тези `setup-*` команди вместо вас от вътрешността на редактора

---

## Главна маса

Всяка команда почита** активен контекст** (зададено с `omniroute connect`, вижте [Отдалечен режим](./REMOTE-MODE.md) ) или изрични `--remote <url> --api-key <key>` флагове. „Локално срещу отдалечено“ по-долу означава: без флагове е насочено към `http://localhost:20128`; с `--remote` (или активен отдалечен контекст) той извлича каталога от този сървър и записва конфигурацията локално.

| командване                 | Инструмент                                    | Какво пише                                                                                                                                                           | Ключови знамена                                                                                                                            | Локално срещу отдалечено |
| -------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI                              | `~/.codex/<name>.config.toml` — един профил на съвместим текстов модел (`codex --profile <name>`)                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | И двете                  |
| `omniroute setup-claude`   | Claude код                                    | `~/.claude/profiles/<name>/settings.json` — един профил на съответстващ модел (`CLAUDE_CONFIG_DIR`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | И двете                  |
| `omniroute setup-opencode` | OpenCode (съвместим с openai)                 | `~/.config/opencode/opencode.json` — `omniroute` доставчик с всеки каталожен модел (`opencode -m omniroute/<model>`)                                                 | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | И двете                  |
| `omniroute setup-cline`    | Cline                                         | `~/.cline/data/{globalState,secrets}.json` (режим CLI ) + отпечатва VS настройки за разширение на код                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | И двете                  |
| `omniroute setup-kilo`     | Кило код                                      | `~/.local/share/kilo/auth.json` (CLI) + слива `kilocode.*` в VS Код `settings.json` ако присъства                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | И двете                  |
| `omniroute setup-continue` | Продължете / `cn` CLI                         | `~/.continue/config.yaml` — `provider: openai` модели, ключ чрез `${{ secrets.OMNIROUTE_API_KEY }}`                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И двете                  |
| `omniroute setup-cursor`   | Cursor                                        | Нищо — отпечатва стъпките в приложението (Cursor config е непрозрачен SQLite)                                                                                        | `--remote` `--api-key` `--only` `--port`                                                                                                   | И двете                  |
| `omniroute setup-roo`      | Ру кодекс                                     | `~/.omniroute/roo-settings.json` (импортиране на документ) + задава `roo-cline.autoImportSettingsPath` ако съществува VS код `settings.json`                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | И двете                  |
| `omniroute setup-crush`    | Смачкайте                                     | `~/.config/crush/crush.json` — `openai-compat` доставчик, ключ чрез `$OMNIROUTE_API_KEY`                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И двете                  |
| `omniroute setup-zed`      | Zed                                           | `~/.config/zed/settings.json` — доставчик `openai_compatible.omniroute` (модели с възможност за използване ≤ 25), ключ чрез `$OMNIROUTE_API_KEY`                     | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | И двете                  |
| `omniroute setup-goose`    | гъска                                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + отпечатва env рецепта                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И двете                  |
| `omniroute setup-aider`    | Помощник                                      | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + отпечатва env рецепта                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И двете                  |
| `omniroute setup-qwen`     | Qwen код                                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` масив + `OMNIROUTE_API_KEY` в `~/.qwen/.env`                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | И двете                  |
| `omniroute setup-5dive`    | 5dive (агентски флот)                         | Нищо под `$HOME` — пише 5dive** профил за удостоверяване** (`/var/lib/5dive/auth-profiles/<name>/`) чрез `5dive agent auth set`; само root, работи на хоста на флота | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | И двете                  |
| `omniroute setup-whycodes` | WhyCodes                                      | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); пътят е `$WHYCODES_HOME/config.toml` или `~/.whycodes/config.toml`                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И двете                  |
| `omniroute run <target>`   | Стартиране по време на изпълнение (генерично) | Нищо — генериране на `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` с правилните env и args; Qwen и Gemini използват временно изолиран дом   | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | И двете                  |
| `omniroute launch`         | Claude код                                    | Нищо — създава `claude` с инжектиран `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | И двете                  |
| `omniroute launch-codex`   | OpenAI Codex CLI                              | Нищо — създава `codex` с доставчика на `omniroute`, инжектиран чрез `-c` флагове                                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | И двете                  |

Бележки относно флаговете (проверени в източника на команда):

- `--remote <url>` — извличане на каталога от отдалечен OmniRoute (заменя `--port` и активния контекст). `--api-key <key>` предоставя идентификационните данни за този сървър (по подразбиране е `OMNIROUTE_API_KEY` env var или токена на активния контекст).
- `--only <patterns>` — поднизове, разделени със запетая; запазете само модел IDs, който съвпада (напр. `--only glm,kimi`). Предлага се на `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — отпечатайте точно това, което би било написано, без да докосвате файловата система. Предлага се за всяка команда `setup-*`** освен** `setup-cursor` (който никога не записва файл).
- `--model <id>` — изисква се (или се избира интерактивно) за инструментите, които нямат автоматично откриване на модел: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Тези инструменти също приемат `--yes` за неинтерактивни изпълнения (което след това изисква `--model`). `setup-opencode` взема `--model`, за да зададе модела от най-високо ниво по подразбиране.
- `--model <id>` на `omniroute run` следва окабеляването на манифеста за цел (`bin/cli/cli-manifest.mjs`):** помощник** получава `--model openai/<id>` и** отворен код** `--model omniroute/<id>` (префиксът се добавя само когато идентификаторът вече не го носи);** куен** и** близнаци** получи идентификацията дословно;** Клод** получава го чрез `ANTHROPIC_MODEL`,** гъска** чрез `GOOSE_MODEL`,** защо кодове** чрез `-P omniroute -m <id>` и** кодекс** чрез `-c model_providers.omniroute.*` args.**Qwen е единствената цел за изпълнение, която твърдо изисква `--model`** — `omniroute run qwen` без него излиза от `2` с изрична грешка.
- `--port <port>` — локален OmniRoute порт (по подразбиране `20128`, игнорира се, когато е зададен `--remote` ). Присъства във всички `setup-*` и двата лаунчера.
- `omniroute run` изходни кодове: собственият изходен код на дъщерния CLI се разпространява дословно; `2` = невалидни аргументи (неподдържана цел, липсващ необходим `--model`, предпазител на контейнер); `127` = целевият двоичен файл не е в `PATH`; `130`/`143`/`129`, когато стартирането приключи от `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = друга грешка при стартиране по време на изпълнение.
- Двете програми за стартиране (`launch`, `launch-codex`) приемат `--profile <name>`, за да изберат профил, написан от `setup-claude` / `setup-codex`, плюс аргументи за преминаване за основния двоичен файл `claude` / `codex`.

Интерактивният избор също се споделя от рецептите за настройка:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` в момента делегира на тестваните рецепти за `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`. Записите в каталога само за IDE, MITM и само за ръководство остават изрични `setup-*`/ръчни потоци и не се представят като цели за стартиране.

> `setup-opencode` е** лек openai-съвместим** OpenCode интеграция. Има и по-богата интеграция на плъгин — `omniroute setup opencode` — който инсталира `@omniroute/opencode-plugin`. Те са различни команди; таблицата по-горе документи `setup-opencode`.
>
> Добавката се предлага в два пакета, по един за OpenCode major, тъй като двата зареждащи програми очакват различни входни точки: `@omniroute/opencode-plugin` за OpenCode v1 и `@omniroute/opencode-plugin-v2` за OpenCode v2. Пакетът v2 е нов (`0.1.0`) и следва хост договор, който все още се движи, така че чете семената на формата OpenCode в черновата на каталога, вместо да приема такъв. Инсталирайте го, като добавите `plugins` запис към `opencode.json`; `omniroute setup opencode` все още инсталира пакета v1. Опциите и редът за търсене на идентификационни данни са в пакета README.

---

## Локално използване

Когато OmniRoute работи на `localhost:20128`, просто изпълнете командата за настройка за вашия инструмент. Каталогът се извлича от локалния сървър.

```bash
# Codex: записва отделен профил за всеки съответстващ модел в ~/.codex/
omniroute setup-codex
codex --profile glm52            # използва генериран профил

# Claude Code: записва профили за отделните модели, след което стартира един от тях
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записва съвместимия с OpenAI доставчик с всички модели от каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # използва се чрез {env:OMNIROUTE_API_KEY}, никога не се записва на диска
opencode -m omniroute/glm/glm-5.2 "..."

# Инструментите без автоматично откриване изискват изрично зададен модел:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Преглед без записване на каквото и да било:
omniroute setup-continue --dry-run
```

Стартиране без записване на каквато и да е конфигурация (само чрез инжектиране на променливи на средата):

```bash
omniroute launch                 # Claude Code → локален OmniRoute
omniroute launch-codex           # Codex CLI → локален OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Изричен път до командата: предава без промени всичко след --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Отдалечено използване

Насочете която и да е команда за настройка към отдалечен OmniRoute чрез `--remote` + `--api-key`. Каталогът се извлича от отдалечения сървър, а конфигурацията се записва на локалната ви машина.

```bash
# OpenCode срещу отдалечен VPS, като се запазват само моделите glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # първо експортирайте OMNIROUTE_API_KEY

# Профили на Codex от отдалечен каталог
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Директно стартиране на CLI срещу отдалечения сървър
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Вместо всеки път да подавате `--remote`/`--api-key`, влезте веднъж и оставете **активния контекст** да ги предоставя автоматично:

```bash
omniroute connect 192.168.0.15        # създава токен с ограничен обхват и съхранява контекста
omniroute setup-codex                 # ← вече използва отдалечения каталог
omniroute setup-opencode              # ← същото
omniroute launch                      # ← Claude Code срещу отдалечения сървър
```

Вижте [Отдалечен режим](./REMOTE-MODE.md) за контексти, обхвати и управление на токени.

---

## Флотове от агенти на 5dive

[5dive](https://5dive.ai) управлява флот от дългосрочно работещи агенти за програмиране, всеки от които е systemd модул под собствен Unix потребител. Самият той не е CLI за програмиране, затова няма какво да бъде стартирано чрез `omniroute run` — `5dive` е цел **само за конфигуриране**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

И двете форми записват един **профил за удостоверяване** на 5dive, след което всяко място на `claude`, свързано с този профил, комуникира с OmniRoute. Три неща са специфични за тази цел:

- **Изпълнява се на хоста на флота като root.** Командите на 5dive действат върху локални systemd модули и директория за състоянието, притежавана от root; няма отдалечен режим. Рецептата се стартира повторно чрез `sudo`, когато още не се изпълнява като root (`--no-sudo` изключва това и вместо него извежда командата).
- **Крайната точка трябва да използва `https://`, освен ако не е loopback.** API ключът на агента се предава чрез този URL при всяка заявка и 5dive отказва некриптирана крайна точка извън машината. Частният LAN адрес не е изключение.
- **Собственото фиксиране на модел за всяко място има предимство пред профила.** Профилът съдържа `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, но място, което все още е фиксирано към стандартен идентификатор на модел, се проваля още при първата си стъпка със съобщението _„Има проблем с избрания модел“_. Подайте `--agent <name>` (може да се повтори), за да фиксирате и местата; ако не го направите, рецептата извежда командата.

API ключът се подава към 5dive чрез **stdin** (`--api-key=-`), така че никога не се появява в изхода на `ps`.

Насочването на профила към **комбинация** на OmniRoute вместо към единичен модел е това, което осигурява резервиране на доставчика за флота: когато основната крайна точка напълно прекъсна по средата на стъпка при изпълнението, документирано в [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агентът завърши оставащите си стъпки чрез резервната крайна точка, без прекъсването да стане видимо.

---

## Основни URL конвенции (кои инструменти искат `/v1`)

OmniRoute разкрива OpenAI повърхността при `/v1`, Anthropic повърхността в основата и естествената Gemini повърхност при `/v1beta`. Всяка интеграция е свързана с формата, която неговият инструмент очаква (проверено в източника на команда):

| Интеграция                                                                 | Основен URL написан | `/v1`?                                      |
| -------------------------------------------------------------------------- | ------------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | корен               | Не — Cline добавя `/v1/chat/completions`    |
| `setup-goose` (`OPENAI_HOST`)                                              | корен               | Не — Goose добавя пътя                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корен               | Не — LiteLLM добавя `/v1/chat/completions`  |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | със `/v1`           | да                                          |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | със `/v1`           | да                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корен               | Не — Claude кодът добавя `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | със `/v1`           | да                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | със `/v1`           | да                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корен               | Не — SDK добавя `/v1beta/models/…`          |
| `setup-5dive` (`ANTHROPIC_BASE_URL` в профила за удостоверяване)           | корен               | Не — Claude кодът добавя `/v1/messages`     |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | със `/v1`           | Да — WhyCodes публикува `/chat/completions` |

---

## Запазване на нативните зависимости при актуализация: `--include=optional`

Когато актуализирате с `omniroute update` (след потвърждение или с `--apply`),
OmniRoute изпълнява инсталацията с вградено `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Това **не** е флаг, който подавате към `omniroute update` — той винаги се прилага
от модула за актуализация. Това гарантира, че `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM стекът) ще се запазят
при актуализацията дори ако npm конфигурацията ви съдържа `omit=optional`, което
иначе без предупреждение би премахнало нативния SQLite драйвер и свързването с
хранилището за ключове на операционната система. За да прегледате точната команда,
без да я прилагате:

```bash
omniroute update --dry-run
# [СУХО ИЗПЪЛНЕНИЕ] Ще бъде изпълнено: npm install -g omniroute@latest --include=optional
```

Други флагове на `omniroute update` (проверени в изходния код): `--check`
(изход с код 1, ако версията е остаряла), `--apply` (инсталиране без подкана),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI чрез `omniroute run gemini`

Договорът е проверен спрямо `@google/gemini-cli` 0.50.0: CLI зачита
`GOOGLE_GEMINI_BASE_URL` и изпраща `POST /v1beta/models/<model>:generateContent`
(и `:streamGenerateContent?alt=sse`) към него — точно както изисква нативният
Gemini интерфейс на OmniRoute (`/v1beta`). `omniroute run gemini` конфигурира
това автоматично:

- `GOOGLE_GEMINI_BASE_URL` → активният базов URL на OmniRoute (корен, без `/v1`);
- `GEMINI_API_KEY` → определените идентификационни данни за OmniRoute
  (опция/среда/контекст);
- **временен изолиран `GEMINI_CLI_HOME`**, чийто `.gemini/settings.json`
  избира удостоверяване чрез `gemini-api-key`, така че съхранена Google OAuth
  сесия (Code Assist) никога да не замества стартирането, насочено към OmniRoute —
  премахва се след приключване;
- **хигиена на средата**: от средата на дъщерния процес се премахват
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` и `GOOGLE_GENAI_USE_GCA` (които
  биха пренасочили удостоверяването към Vertex/Code Assist), а
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` се задава като допълнителна предпазна
  мярка — останалите цели на `run` получават същото третиране за собствените си
  конфликтни променливи;
- добавяне на `--model <id>` от `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Защитата на Gemini за доверие към работната директория продължава да се прилага
в режим без потребителски интерфейс — подайте сами `--skip-trust` (или се
доверете интерактивно на директорията); стартиращият модул умишлено не я
заобикаля. Този стартиращ модул е различен от **ACP регистрацията**
(`src/lib/acp/registry.ts`, `gemini --acp`), която остава интеграцията с
агентния протокол за `/dashboard/acp-agents`.

---

## Реална smoke проверка (по избор)

Детерминистичните регресионни изпълнения на плана за стартиране се извършват в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). За валидиране на РЕАЛНИТЕ изпълними файлове спрямо РЕАЛЕН
OmniRoute сървър има тестов механизъм по избор в
`tests/integration/upstream-cli-smoke.int.test.ts`. Той никога не се изпълнява автоматично
(всеки подтест се пропуска, освен ако не е зададено `RUN_CLI_SMOKE=1`), предава идентификационните данни чрез ИМЕТО на променлива на средата
(никога чрез стойността), редактира низове, наподобяващи ключове, от всеки записан изход, пропуска
целите, чиито изпълними файлове не са инсталирани, и класифицира неуспехите като
удостоверяване / услуга нагоре по веригата / конфигурация вместо само като булева стойност:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

По избор: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничава проверката;
`OMNIROUTE_SMOKE_TIMEOUT_MS` заменя 120-секундното време за изчакване за всяка цел.

---

## Вижте също

- [Конфигуриране на Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — по-подробното ръководство за Claude Code
- [Конфигуриране на Codex CLI](./CODEX-CLI-CONFIGURATION.md) — еднократната основна настройка на `[model_providers.omniroute]`
- [Отдалечен режим](./REMOTE-MODE.md) — контексти, токени за достъп с ограничен обхват и управление на отдалечен сървър
- [Справочник за CLI инструменти](../reference/CLI-TOOLS.md) — пълният каталог на поддържаните инструменти и страниците на таблото за управление
- [Ръководство за настройване](./SETUP_GUIDE.md) — методи за инсталиране и първоначално въвеждане в работата
