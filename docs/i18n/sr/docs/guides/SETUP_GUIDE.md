# 📖 Setup Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Комплетна референца за подешавање OmniRoute-а. За брзу верзију погледајте [Брзи почетак у README-у](../README.md#-quick-start).

## Садржај

- [Начини инсталације](#install-methods)
- [Конфигурација CLI алата](#cli-tool-configuration)
- [Подешавање протокола (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Конфигурација временског ограничења](#timeout-configuration)
- [Режим одвојених портова](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Деинсталација](#uninstalling)

---

## Методе инсталације

### нпм (препоручено)

```bash
npm install -g omniroute
omniroute
```

Контролна табла се отвара на `http://localhost:20128` и API база URL је `http://localhost:20128/v1`.

> **нпм корисници:** Ако нпм упозорава да су инсталационе скрипте блокиране (нпр. `omniroute`, `better-sqlite3`), погледајте [Решавање проблема — нпм инсталационе скрипте су блокиране](./TROUBLESHOOTING.md#npm-install-scripts-blocked-warning-global-install).

### пнпм

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **пнпм корисници:** `--allow-build` заставица је потребна да би се омогућиле изворне скрипте за прављење `better-sqlite3` и `@swc/core`. Команда `pnpm approve-builds -g` није подржана за глобалне инсталације на пнпм в11.

### Арцх Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR пакет](https://aur.archlinux.org/packages/omniroute-bin) инсталира OmniRoute и пружа системски кориснички сервис.

### Фром Соурце

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows напомена:** Подразумевано, OmniRoute користи `%APPDATA%\omniroute` када стари `%USERPROFILE%\.omniroute` директоријум није присутан. Подесите `DATA_DIR` да изабере другу локацију директоријума података.

> **Напомена:** `npm install` аутоматски генерише `.env` из `.env.example` при првом покретању. Наредне инсталације неће преписати постојећи `.env`, тако да су прилагођавања сачувана. Да бисте поново започели, избришите `.env` пре поновног покретања.

### Docker

Погледајте [водич Docker](./DOCKER_GUIDE.md) за комплетно подешавање Docker укључујући Цомпосе профиле и Цадди HTTPS.

### Апликација за рачунар (Electron)

OmniRoute испоручује десктоп омот направљен на Electron 41 + елецтрон-буилдер 26.10. Доступне скрипте (основни радни простор):

```bash
npm run electron:dev          # Run desktop with hot-reload
npm run electron:build        # Build for current OS (auto-detected)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test packaged build
```

Издања десктоп инсталационих програма су приложена уз GitHub издања. За комплетан Electron дееп-диве (потписивање, IPC бридге, дистрос), погледајте [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(цриадо ем фасе постериор)_.

### Сервер без главе (CI/automation)

За подешавања без надзора (Docker, Кубернетес, CI), користите:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

У комбинацији са енв варс-има (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, итд.), ово вам омогућава да покренете OmniRoute инстанцу која је потпуно скриптована.

### CLI Опције

| Цомманд                 | Опис                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `omniroute`             | Покрените сервер (`PORT=20128`, API и контролна табла на истом порту)                      |
| `omniroute setup`       | Вођени CLI онбоардинг за лозинку и првог провајдера                                        |
| `omniroute doctor`      | Покрените локалне здравствене провере без покретања сервера                                |
| `omniroute providers`   | Откријте, наведите, потврдите и тестирајте добављаче из CLI                                |
| `omniroute config`      | конфигурација CLI алата — листа, добијање, подешавање, провера конфигурација               |
| `omniroute status`      | Контролна табла статуса ван мреже — верзија, DB, алати, конфигурација                      |
| `omniroute logs`        | Стреам евиденције коришћења из API (подржава `--follow`)                                   |
| `omniroute update`      | Проверите или примените OmniRoute ажурирања                                                |
| `omniroute provider`    | Управљајте конекцијама провајдера — додајте, листајте, уклоните, тестирајте, подразумевано |
| `omniroute --port 3000` | Поставите canonical/API порт на 3000                                                       |
| `omniroute --mcp`       | Покрените MCP сервер (стдио транспорт)                                                     |
| `omniroute --no-open`   | Немојте аутоматски отварати претраживач                                                    |
| `omniroute --help`      | Покажи помоћ                                                                               |

Подешавање без главе може бити скриптовано са заставицама или променљивим окружења:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Покрените локалну дијагностику без отварања контролне табле:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Управљајте провајдерима из SSH или скрипти без отварања контролне табле:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Конфигурација алата CLI

### 1) Повежите добављаче и креирајте API кључ

1. Отворите Дасхбоард → `Providers` и повежите најмање једног провајдера (OAuth или API кључ).
2. Отворите Дасхбоард → `Endpoints` и креирајте API кључ.
3. (Опционално) Отворите Дасхбоард → `Combos` и поставите резервни ланац.

### 2) Усмерите свој алат за кодирање

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/qwen3.8-max-preview (or any provider/model prefix)
```

Ако ваш уређивач не може да пошаље `Authorization: Bearer ...`, уместо тога користите токенизовану базу компатибилности:

```txt
Base URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Models URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Ради са Claude Цоде, Codex CLI, Cursor, Cline, OpenClaw, OpenCode и SDKs компатибилним са ОпенАИ.

#### Аутоматско конфигурисање помоћу `setup-*`

Уместо да ручно лепите основни URL и кључ, нека OmniRoute напише сопствену конфигурацију сваког алата из каталога модела уживо. Једна команда по алату:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profiles
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (openai-compatible)
omniroute setup-cline        # Cline CLI + VS Code extension settings
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # prints Cursor's in-app steps
omniroute setup-roo          # Roo Code import + autoImport pointer
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-zed          # ~/.config/zed/settings.json (openai_compatible)
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Сваки прихвата `--remote <url> --api-key <key>` да конфигурише локални алат против а** даљински** OmniRoute, плус `--dry-run` за преглед. Да бисте покренули CLI са убаченим правим енв-ом и без написане конфигурације, користите генерички покретач `omniroute run <target>` (цлауде, цодек, аидер, гоосе, опенцоде, квен, гемини); застарели покретачи по алату `omniroute launch` (Claude код) и `omniroute launch-codex` (Codex) остају доступни.

За пуну табелу (шта свака команда пише, сваку заставицу, локалне против удаљене, `/v1` конвенције о основном УРЛ-у), погледајте** [CLI Интегратионс](./CLI-INTEGRATIONS.md)** .

За детаљну конфигурацију по алату (Claude Цоде, Codex CLI, Cursor, Cline, OpenClaw, Кило Цоде, Copilot, и више), погледајте** [CLI Водич за алате](../reference/CLI-TOOLS.md)** .

---

## Подешавање протокола (MCP + A2A)

### MCP подешавање (протокол контекста модела)

Покрените MCP транспорт у стдио режиму:

```bash
omniroute --mcp
```

Препоручени ток валидације:

```bash
# 1. Start MCP server
omniroute --mcp

# 2. From your MCP client, call:
omniroute_get_health        # Should return system health
omniroute_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### Конфигурација MCP клијента

**Claude код:**

Claude код се повезује преко HTTP, који `omniroute --mcp` (стдио) не покреће. HTTP транспорт је подразумевано искључен: прво га омогућите на покренутом серверу. Када је пријава на контролну таблу омогућена, захтев без акредитива добија `401`, па проследите API кључ који држи `mcp:connect` (или `manage`); кључу без `manage`/`admin` такође је потребан опсег сваке алатке (погледајте [MCP Сервер → MCP опсег алата](../frameworks/MCP-SERVER.md#mcp-tool-scopes) ).

```bash
omniroute mcp enable --transport streamable-http
claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream \
  --header "Authorization: Bearer your-key"
```

**Cursor / Cline:**

Додајте у своја MCP подешавања (стдио, са кључем тако да позивалац има принципала):

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {
        "OMNIROUTE_API_KEY": "your-key",
        "OMNIROUTE_BASE_URL": "http://localhost:20128"
      }
    }
  }
}
```

Или, када је `mcpTransport` `streamable-http` (подесите га на `/dashboard/mcp` или са `omniroute mcp enable --transport streamable-http`), усмерите клијентов даљински унос MCP сервера на `http://localhost:20128/api/mcp/stream`.

Кључ путује као `Authorization: Bearer <api-key>` (погледајте [MCP сервер → Даљински приступ](../frameworks/MCP-SERVER.md#remote-access-manage-scope-bypass) за удаљене хостове; удаљеном кључу је потребан `mcp:connect` плус његови read/write опсеги).

**Комплетна MCP документација:** [MCP сервер README](../../open-sse/mcp-server/README.md) — 110 алати, IDE конфигурације, Python/TS/Go клијенти. Референца за оператера за алате за компресију CCR/dedup (маркери, предуслови, опсези по алату, пагинација за проналажење, дијагностика): [Мотори компресије → Предуслови / водич за оператера](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

### A2A подешавање (протокол агент-то-агент)

Верификујте картицу агента:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Пошаљите задатак:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Комплетна A2A документација:** [A2A сервер README](../../src/lib/a2a/README.md) — ЈСОН-РПЦ 2.0, вештине, стримовање, животни циклус задатка.

---

## Конфигурација временских ограничења

### Основна временска ограничења

За већину примена потребне су вам само ове две променљиве:

| Променљива               | Подразумевано                  | Намена                                                                                                                                                                                               |
| ------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Заједничка основна вредност за временско ограничење почетка одговора узводног сервера, скривена Undici временска ограничења, захтеве за TLS отисак и временска ограничења захтева/проксија API моста |
| `STREAM_IDLE_TIMEOUT_MS` | наслеђује `REQUEST_TIMEOUT_MS` | Највећи дозвољени размак између делова стрима пре него што OmniRoute прекине SSE стрим                                                                                                               |

Компатибилност са претходним верзијама је очувана: постојеће променљиве `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` и друге променљиве временских ограничења по слојевима и даље функционишу и имају предност у односу на заједничку основну вредност.

### Напомене специфичне за добављаче

За узводне сервисе компатибилне са Claude Code-ом (`anthropic-compatible-cc-*`), OmniRoute изводи одлазно заглавље `X-Stainless-Timeout` из разрешеног временског ограничења преузимања, тако да временска ограничења читања на страни добављача остану усклађена са вашом конфигурацијом окружења.

За независне обрнуте проксије компатибилне са Claude Code-ом, OmniRoute задржава конзервативан подразумевани скуп `anthropic-beta` и, када је `Client Cache Control` остављен на `Auto`, прослеђује само ознаке `cache_control` које је задао клијент. Омогућите прекидач „Enable redact-thinking beta“ за појединачну везу само када узводни сервис изричито захтева Claude стримове размишљања са редигованим садржајем.

### Напредно замењивање временских ограничења

| Променљива                               | Подразумевано                               | Намена                                                                                                |
| ---------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | наслеђује `REQUEST_TIMEOUT_MS`              | Временско ограничење почетка одговора узводног сервера које се примењује до пријема заглавља одговора |
| `FETCH_HEADERS_TIMEOUT_MS`               | наслеђује `FETCH_TIMEOUT_MS`                | Undici временско ограничење за пријем заглавља одговора узводног сервера                              |
| `FETCH_BODY_TIMEOUT_MS`                  | наслеђује `FETCH_TIMEOUT_MS`                | Undici временско ограничење између делова тела одговора узводног сервера (`0` га онемогућава)         |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Undici временско ограничење за успостављање TCP везе                                                  |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Undici временско ограничење неактивности keep-alive сокета                                            |
| `TLS_CLIENT_TIMEOUT_MS`                  | наслеђује `FETCH_TIMEOUT_MS`                | Временско ограничење за захтеве за TLS отисак упућене преко `wreq-js`                                 |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | наслеђује `REQUEST_TIMEOUT_MS` или `600000` | Временско ограничење за прокси прослеђивање `/v1` са API порта на порт контролне табле                |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Временско ограничење долазног захтева на серверу API моста                                            |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Временско ограничење долазних заглавља на серверу API моста                                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Keep-alive временско ограничење на серверу API моста                                                  |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Временско ограничење неактивности сокета на серверу API моста (`0` га онемогућава)                    |

> **Напомена:** За захтеве са стримовањем, `FETCH_TIMEOUT_MS` покрива само успостављање везе / чекање на први одговор узводног сервера. Када стрим постане активан, OmniRoute ће га прекинути само у случају стварног застоја (`STREAM_IDLE_TIMEOUT_MS`) или неактивности Undici тела (`FETCH_BODY_TIMEOUT_MS`).

### Компатибилност са обрнутим проксијем

Ако OmniRoute покрећете иза Nginx-а, Caddy-ја, Cloudflare-а или другог обрнутог проксија, уверите се да су временска ограничења проксија такође већа од временских ограничења OmniRoute стрима/преузимања.

---

## Режим одвојених портова

Покрените API и контролну таблу на одвојеним портовима за напредне сценарије (обрнути прокси, умрежавање контејнера):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Контролна табла:  http://localhost:20129
```

---

## Воид Linux (кбпс-срц) шаблон

За кориснике Воид Linux, можете да направите изворни пакет користећи `xbps-src`. Сачувајте овај блок као `srcpkgs/omniroute/template`:

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Regenerate the checksum for each release with:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Деинсталација

| Команда                  | Радња                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Уклања системску апликацију, али **задржава вашу базу података и конфигурације** у `~/.omniroute`. |
| `npm run uninstall:full` | Уклања апликацију И трајно **брише све конфигурације, кључеве и базе података**.                   |

> Детаљна упутства за деинсталацију за све методе потражите у [UNINSTALL.md](./UNINSTALL.md).
