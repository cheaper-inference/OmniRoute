# CLI Integrations (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

За дељени извршни манифест, ограничена дечија окружења и трајно подешавање Gemini, погледајте [уговоре о покретању CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute испоручује породицу `setup-*` команди које конфигуришу кодирање CLI (Codex, Claude Цоде, OpenCode, Cline, …) да користи OmniRoute као позадину — тако да алатка разговара са** један** крајња тачка и OmniRoute руте до правог провајдера са аутоматским враћањем. Свака команда чита** ливе** каталог модела из покренутог OmniRoute (локалног или удаљеног) и уписује сопствену конфигурациону датотеку алата на** твој** машина. Кључ API је референциран променљивом окружења где год да га алат подржава. Команде које постоје у фајлу локалног окружења за алате су наведене у наставку.

Постоји и генерички покретач — `omniroute run <target>` — који покреће `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` или `whycodes` са уметнутим правим енв-ом, без писања било какве конфигурације. Циљеви и њихови алиаси потичу из канонског манифеста `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), а `omniroute completion` нуди исте циљне речи изведене из манифеста. Застарели покретачи за сваки алат — `omniroute launch` (Claude Цоде) и `omniroute launch-codex` (Codex) — остају доступни.

Укључивање провајдера је доступно из истог local/remote контекста. АПИ-фирст команде у наставку држе аутентификацију управљања одвојеном од акредитива добављача и никада не штампају акредитив у структурираном излазу:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

За скрипте, радије `--credential-stdin` или `--credential-env`; `--credential` је задржан за контролисану локалну употребу. `providers remove` захтева `--yes` на неинтерактивном терминалу, а свих пет команди поштују активни контекст или глобалне опције `--base-url`/`--api-key`.

Селектори провајдера одбијају двосмислене ID префиксе, имена или имена провајдера; користите пуну везу ID када се неколико веза подудара. Команде за креирање и уређивање поново читају сачувану везу, а уклањање потврђује да више није читљива. Увоз прескаче постојећи provider/name пар. Увезени уноси не могу надјачати крајњу тачку управљања, контекст или акредитиве управљања достављене CLI.

За једнократно, руком писано основно подешавање две најбогатије интеграције, погледајте детаљне информације по алату:

- [конфигурација Claude кода](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI конфигурација](./CODEX-CLI-CONFIGURATION.md)
- [Ремоте Моде](./REMOTE-MODE.md) — возите даљински OmniRoute (VPS / Таилнет) са свог лаптопа
- [VS Цоде Copilot Цхат](./VSCODE-COPILOT.md) — OmniCopilot екстензија; такође може да покрене ове `setup-*` команде за вас из уређивача

---

## Главни сто

Свака команда поштује** активни контекст** (подешено са `omniroute connect`, погледајте [Ремоте Моде](./REMOTE-MODE.md) ) или експлицитне `--remote <url> --api-key <key>` заставице. „Локално против удаљено“ испод значи: без ознака циља `http://localhost:20128`; са `--remote` (или активним удаљеним контекстом) преузима каталог са тог сервера и локално уписује конфигурацију.

| Цомманд                    | Алат                               | Шта пише                                                                                                                                                      | Кључне заставице                                                                                                                           | Локално против удаљеног |
| -------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                   | `~/.codex/<name>.config.toml` — један профил по компатибилном текстуалном моделу (`codex --profile <name>`)                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | И једно и друго         |
| `omniroute setup-claude`   | Claude Цоде                        | `~/.claude/profiles/<name>/settings.json` — један профил по моделу који се подудара (`CLAUDE_CONFIG_DIR`)                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | И једно и друго         |
| `omniroute setup-opencode` | OpenCode (компатибилно са опенаи)  | `~/.config/opencode/opencode.json` — `omniroute` провајдер са сваким моделом каталога (`opencode -m omniroute/<model>`)                                       | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | И једно и друго         |
| `omniroute setup-cline`    | Cline                              | `~/.cline/data/{globalState,secrets}.json` (CLI режим) + штампа поставке проширења кода VS                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | И једно и друго         |
| `omniroute setup-kilo`     | Кило Цоде                          | `~/.local/share/kilo/auth.json` (CLI) + спаја `kilocode.*` у VS код `settings.json` ако постоји                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | И једно и друго         |
| `omniroute setup-continue` | Настави / `cn` CLI                 | `~/.continue/config.yaml` — `provider: openai` модели, кључ преко `${{ secrets.OMNIROUTE_API_KEY }}`                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И једно и друго         |
| `omniroute setup-cursor`   | Cursor                             | Ништа — штампа кораке у апликацији (Cursor цонфиг је непрозиран SQLite)                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | И једно и друго         |
| `omniroute setup-roo`      | Роо Цоде                           | `~/.omniroute/roo-settings.json` (увоз документа) + поставља `roo-cline.autoImportSettingsPath` ако постоји VS код `settings.json`                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | И једно и друго         |
| `omniroute setup-crush`    | Црусх                              | `~/.config/crush/crush.json` — `openai-compat` провајдер, кључ преко `$OMNIROUTE_API_KEY`                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И једно и друго         |
| `omniroute setup-zed`      | Zed                                | `~/.config/zed/settings.json` — `openai_compatible.omniroute` провајдер (≤ 25 модела са могућношћу алата), кључ преко `$OMNIROUTE_API_KEY`                    | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | И једно и друго         |
| `omniroute setup-goose`    | Гуска                              | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + штампа енв рецепт                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И једно и друго         |
| `omniroute setup-aider`    | Аидер                              | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + штампа енв рецепт                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И једно и друго         |
| `omniroute setup-qwen`     | Qwen Цоде                          | `~/.qwen/settings.json` — В4 `modelProviders.openai` низ + `OMNIROUTE_API_KEY` у `~/.qwen/.env`                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | И једно и друго         |
| `omniroute setup-5dive`    | 5 зарона (флота агената)           | Ништа под `$HOME` — пише 5диве** аутх профил** (`/var/lib/5dive/auth-profiles/<name>/`) преко `5dive agent auth set`; само роот, ради на хосту флоте          | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | И једно и друго         |
| `omniroute setup-whycodes` | WhyCodes                           | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); путања је `$WHYCODES_HOME/config.toml` или `~/.whycodes/config.toml`                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И једно и друго         |
| `omniroute run <target>`   | Покретање времена рада (генерично) | Ништа — покрените `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` са правим енв и аргс; Qwen и Gemini користе привремени изоловани дом | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | И једно и друго         |
| `omniroute launch`         | Claude Цоде                        | Ништа — ствара `claude` са убризганим `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                             | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | И једно и друго         |
| `omniroute launch-codex`   | OpenAI Codex CLI                   | Ништа — покреће `codex` са `omniroute` провајдером убризганим преко `-c` заставица                                                                            | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | И једно и друго         |

Напомене о заставама (проверено у извору команде):

- `--remote <url>` — преузима каталог са удаљеног OmniRoute (замењује `--port` и активни контекст). `--api-key <key>` даје акредитиве за тај сервер (подразумевано је `OMNIROUTE_API_KEY` енв вар, или токен активног контекста).
- `--only <patterns>` — поднизови раздвојени зарезима; задржи само модел IDs који се подудара (нпр. `--only glm,kimi`). Доступно на `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — одштампајте тачно оно што би било написано без додиривања система датотека. Доступно на свакој `setup-*` команди** осим** `setup-cursor` (који никада не пише датотеку).
- `--model <id>` — потребан (или изабран интерактивно) за алате који немају аутоматско откривање модела: Cline, Кило, Роо, Гоосе, Qwen, Аидер, 5диве, WhyCodes. Ови алати такође прихватају `--yes` за неинтерактивна покретања (што онда захтева `--model`). `setup-opencode` узима `--model` да постави подразумевани модел највишег нивоа.
- `--model <id>` на `omniroute run` прати ожичење манифеста по мети (`bin/cli/cli-manifest.mjs`):** помагач** прима `--model openai/<id>` и** опенцоде** `--model omniroute/<id>` (префикс се додаје само када га ид већ не носи);** квен** и** близанци** примите ид дословно;** цлауде** добија преко `ANTHROPIC_MODEL`,** гуска** преко `GOOSE_MODEL`,** зашто кодови** преко `-P omniroute -m <id>` и** кодекс** преко `-c model_providers.omniroute.*` аргс.**Qwen је једини циљ за покретање који тешко захтева `--model`** — `omniroute run qwen` без њега излази из `2` са експлицитном грешком.
- `--port <port>` — локални OmniRoute порт (подразумевано `20128`, игнорисано када је `--remote` подешен). Присутно на свим `setup-*` и оба покретача.
- `omniroute run` излазни кодови: сопствени излазни код детета CLI се преноси дословно; `2` = неважећи аргументи (неподржани циљ, недостаје потребан `--model`, чувар контејнера); `127` = циљни бинарни фајл није у `PATH`; `130`/`143`/`129` када се лансирање заврши са `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = други неуспех покретања током извршавања.
- Два покретача (`launch`, `launch-codex`) прихватају `--profile <name>` да изаберу профил који је написао `setup-claude` / `setup-codex`, плус пролазне аргументе за основни бинарни `claude` / `codex`.

Интерактивни бирач такође деле рецепти за подешавање:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` тренутно делегира тестиране рецепте за `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`. Уноси каталога само за ИДЕ, MITM и само за водич остају експлицитни `setup-*`/ручни токови и нису представљени као циљеви за покретање.

> `setup-opencode` је** лагани опенаи компатибилни** OpenCode интеграција. Постоји и богатија интеграција додатака — `omniroute setup opencode` — која инсталира `@omniroute/opencode-plugin`. То су различите команде; горња табела документи `setup-opencode`.
>
> Додатак долази у два пакета, један за OpenCode мајор, јер два учитавача очекују различите улазне тачке: `@omniroute/opencode-plugin` за OpenCode в1 и `@omniroute/opencode-plugin-v2` за OpenCode в2. В2 пакет је нов (`0.1.0`) и прати уговор о хосту који се још увек креће, тако да чита OpenCode семе облика у нацрт каталога уместо да га претпоставља. Инсталирајте га додавањем `plugins` уноса у `opencode.json`; `omniroute setup opencode` и даље инсталира в1 пакет. Опције и редослед тражења акредитива налазе се у пакету README.

---

## Локална употреба

Са OmniRoute покренутим на `localhost:20128`, само покрените команду за подешавање за
свој алат. Каталог се преузима са локалног сервера.

```bash
# Codex: уписује по један профил за сваки поклопљени модел у ~/.codex/
omniroute setup-codex
codex --profile glm52            # користи генерисани профил

# Claude Code: уписује профиле по моделу, затим покреће један
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: уписује openai-compatible провајдера са свим моделима из каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # референцира се преко {env:OMNIROUTE_API_KEY}, никад на диску
opencode -m omniroute/glm/glm-5.2 "..."

# Алатима без аутоматског откривања потребан је експлицитан модел:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Преглед без уписивања било чега:
omniroute setup-continue --dry-run
```

Покрените без уписивања било какве конфигурације (само убризгавање окружења):

```bash
omniroute launch                 # Claude Code → локални OmniRoute
omniroute launch-codex           # Codex CLI → локални OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Експлицитна путања команде: проследи све што долази после --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Удаљена употреба

Усмерите било коју команду за подешавање на удаљени OmniRoute помоћу `--remote` + `--api-key`. Каталог
се преузима са удаљеног сервера; конфигурација се уписује на вашем локалном рачунару.

```bash
# OpenCode против удаљеног VPS-а, задржи само glm/kimi модели
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # прво извезите OMNIROUTE_API_KEY

# Codex профили из удаљеног каталога
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Покрени CLI директно наспрам удаљеног сервера
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Уместо да прослеђујете `--remote`/`--api-key` сваки пут, пријавите се једном и пустите да
**активни контекст** аутоматски обезбеди те вредности:

```bash
omniroute connect 192.168.0.15        # генерише ограничени токен, чува контекст
omniroute setup-codex                 # ← сада користи удаљени каталог
omniroute setup-opencode              # ← исто
omniroute launch                      # ← Claude Code наспрам удаљеног сервера
```

Погледајте [Remote Mode](./REMOTE-MODE.md) за контексте, опсеге и управљање токенима.

---

## Флоте агената 5dive

[5dive](https://5dive.ai) покреће флоту дуготрајних кодинг агената, сваки као
systemd јединица под сопственим Unix корисником. Није сам по себи CLI за кодирање, тако да нема
ништа за `omniroute run` да покрене — `5dive` је циљ **само за конфигурисање**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Оба облика уписују један 5dive **auth профил**, а свако `claude` место везано за тај
профил онда комуницира са OmniRoute. Три ствари су специфичне за овај циљ:

- **Извршава се на хосту флоте, као root.** 5dive-ови глаголи делују на локалне systemd јединице
  и директоријум стања који поседује root; не постоји удаљени режим. Рецепт се поново извршава преко
  `sudo` када већ није root (`--no-sudo` то искључује и уместо тога исписује
  команду).
- **Крајња тачка мора бити `https://` осим ако је loopback.** API кључ агента
  путује на том URL-у са сваким захтевом, а 5dive одбија текстуалну (plaintext) крајњу тачку изван машине.
  Приватна LAN адреса није изузетак.
- **Сопствена веза модела сваког места надјачава профил.** Профил носи
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, али место које је још везано за уобичајени
  id модела не успева при првом окретању са грешком _"There's an issue with the selected model"_.
  Проследите `--agent <name>` (може се понављати) да бисте везали и места; рецепт исписује
  команду када то не учините.

API кључ се предаје 5dive-у преко **stdin** (`--api-key=-`), тако да се никада не појављује у
изласку `ps` команде.

Усмеравање профила на OmniRoute **комбо** уместо на један модел је оно што
даје флоти опоравак провајдера при отказивању (failover): када је примарна крајња тачка потпуно отказала усред потеза
у покретању снимљеном на
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агент је завршио
своје преостале кораке на резервној опцији и прекид никада није изашао на површину.

---

## Основне URL конвенције (који алати желе `/v1`)

OmniRoute излаже OpenAI површину на `/v1`, Anthropic површину у корену и изворну Gemini површину на `/v1beta`. Свака интеграција је повезана са формом коју њен алат очекује (проверено у извору команде):

| Интеграција                                                                | База URL написана | `/v1`?                                      |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | корен             | Не — Cline додаје `/v1/chat/completions`    |
| `setup-goose` (`OPENAI_HOST`)                                              | корен             | Не — Гуска додаје путању                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корен             | Не — LiteLLM додаје `/v1/chat/completions`  |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | са `/v1`          | Да                                          |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | са `/v1`          | Да                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корен             | Не — Claude код додаје `/v1/messages`       |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | са `/v1`          | Да                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | са `/v1`          | Да                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корен             | Не — SDK додаје `/v1beta/models/…`          |
| `setup-5dive` (`ANTHROPIC_BASE_URL` у аутх профилу)                        | корен             | Не — Claude код додаје `/v1/messages`       |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | са `/v1`          | Да — WhyCodes објављује `/chat/completions` |

---

## Očuvanje nativnih zavisnosti prilikom ažuriranja: `--include=optional`

Kada ažurirate koristeći `omniroute update` (nakon potvrde, ili sa `--apply`),
OmniRoute pokreće instalaciju sa ugrađenim `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** oznaka koju prosleđujete komandi `omniroute update` — nju uvek primenjuje
alat za ažuriranje. Ona garantuje da `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM stek) opstanu nakon ažuriranja, čak i ako vaša npm konfiguracija
ima podešeno `omit=optional`, što bi inače nečujno izbacilo nativni SQLite
drajver i OS-keyring vezu. Da biste pregledali tačnu komandu bez njenog izvršavanja:

```bash
omniroute update --dry-run
# [DRY RUN] Bi pokrenuo: npm install -g omniroute@latest --include=optional
```

Ostale oznake komande `omniroute update` (verifikovano u izvornom kodu): `--check` (izlazi sa 1 ako je
zastarelo), `--apply` (instalira bez traženja potvrde), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor verifikovan u odnosu na `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i izdaje `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) prema njemu — tačno OmniRoute-ovoj nativnoj
Gemini površini (`/v1beta`). `omniroute run gemini` to povezuje automatski:

- `GOOGLE_GEMINI_BASE_URL` → aktivni OmniRoute bazni URL (root, bez `/v1`);
- `GEMINI_API_KEY` → razrešeni OmniRoute kredencijal (opcija/env/kontekst);
- **privremeni izolovani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  bira `gemini-api-key` autentifikaciju, tako da sačuvana Google OAuth sesija (Code Assist)
  nikada ne preglasi pokretanje usmereno kroz OmniRoute — uklanja se nakon izlaska;
- **higijena env promenljivih**: iz env-a podprocesa se čiste `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (koje bi preusmerile
  autentifikaciju na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` je
  postavljen kao dodatna rezervna sigurnost — ostale `run` mete dobijaju isti
  tretman za svoje sopstvene konfliktne promenljive;
- ubacivanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini-jeva zaštita poverenja radnog prostora (workspace-trust guard) i dalje se primenjuje u headless modu — sami
prosledite `--skip-trust` (ili interaktivno potvrdite poverenje direktorijumu); pokretač
namerno ne zaobilazi ovu proveru. Ovaj pokretač je različit od **ACP
registracije** (`src/lib/acp/registry.ts`, `gemini --acp`), koja i dalje predstavlja
integraciju agent-protokola za `/dashboard/acp-agents`.

---

## Стварни smoke тест (опциони)

Детерминистички regression за launch-план се извршава у CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Да би се проверили СТВАРНИ бинарни фајлови у односу на СТВАРНИ
OmniRoute сервер, постоји опциони harness на путањи
`tests/integration/upstream-cli-smoke.int.test.ts`. Он се никада не извршава аутоматски
(сваки под-тест се прескаче осим ако није постављено `RUN_CLI_SMOKE=1`), пренос акредитива се врши преко NAME
environment-променљиве (никада преко вредности), редактује (маскира) стрингове који личе на кључеве из било ког снимљеног излаза, прескаче
циљеве чији бинарни фајл није инсталиран и класифицира грешке као
auth / upstream / config уместо просте булове вредности:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Опционо: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничава обим тестирања;
`OMNIROUTE_SMOKE_TIMEOUT_MS` преписује подразумевани тајм-аут од 120s по циљу.

---

## Погледајте и

- [Конфигурација Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — детаљнији водич за Claude Code
- [Конфигурација Codex CLI](./CODEX-CLI-CONFIGURATION.md) — једнократно почетно подешавање `[model_providers.omniroute]`
- [Удаљени режим (Remote Mode)](./REMOTE-MODE.md) — контексти, ограничени приступни токени, управљање удаљеним сервером
- [Референца CLI алата](../reference/CLI-TOOLS.md) — потпуни каталог подржаних алата + странице контролне табле
- [Водич за подешавање](./SETUP_GUIDE.md) — методе инсталације и почетно упознавање при првом покретању
