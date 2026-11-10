# CLI Integrations (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

有关共享可执行清单、受限子环境和持久Gemini设置，请参阅[CLI启动合约](./CLI-LAUNCH-CONTRACTS.md)。

OmniRoute提供了一系列`setup-*`命令，这些命令配置编码CLI （Codex、 Claude Code 、 OpenCode、 Cline等）以使用OmniRoute作为其后端 - 因此该工具与**一**端点和OmniRoute通过自动回退路由到正确的提供者。每个命令读取**居住**来自正在运行的OmniRoute （本地或远程）的模型目录，并将工具自己的配置文件写入**你的**机器。只要工具支持， API键就会被环境变量引用。下面列出了保存工具本地环境文件的命令。

还有一个通用启动器 - `omniroute run <target>` - 可以生成`claude`、 `codex`、 `aider`、 `goose`、 `opencode`、 `qwen`、 `gemini`或`whycodes`并注入正确的环境，而无需编写任何配置。目标及其别名来自规范清单`bin/cli/cli-manifest.mjs` （`claude-code|cc|anthropic`、 `codex-cli|openai-codex|openai`、 `goose-cli`、 `open-code`、 `qwen-code`、 `gemini-cli`、 `why-codes|why`），并且`omniroute completion`提供相同的源自清单的目标词。旧的每个工具启动器 - `omniroute launch` (Claude Code) 和`omniroute launch-codex` (Codex) - 仍然可用。

提供者入职可从相同的local/remote上下文获得。下面的 API-first 命令将管理身份验证与提供者凭据分开，并且从不在结构化输出中打印凭据：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

对于脚本，首选`--credential-stdin`或`--credential-env`； `--credential`保留供受控本地使用。 `providers remove`需要非交互式终端上的`--yes` ，并且所有五个命令都遵循活动上下文或全局`--base-url`/`--api-key`选项。

提供者选择器拒绝不明确的ID前缀、名称或提供者名称；当多个连接匹配时使用全连接ID 。创建和编辑命令读回保存的连接，删除则验证它不再可读。导入会跳过现有的provider/name对。导入的条目不能覆盖提供给CLI管理端点、上下文或管理凭据。

对于两个最丰富的集成的一次性、手写的基本设置，请参阅每个工具的深入研究：

- [Claude代码配置](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI配置](./CODEX-CLI-CONFIGURATION.md)
- [远程模式](./REMOTE-MODE.md)— 从您的笔记本电脑驱动远程OmniRoute (VPS / Tailnet)
- [VS代码Copilot聊天](./VSCODE-COPILOT.md)— OmniCopilot扩展；它还可以从编辑器内部为您运行这些`setup-*`命令

---

## 主表

每个命令都尊重**主动语境**（使用`omniroute connect`设置，请参阅[远程模式](./REMOTE-MODE.md)）或显式`--remote <url> --api-key <key>`标志。下面的“本地与远程”意味着：没有任何标志，它的目标是`http://localhost:20128`；使用`--remote` （或活动的远程上下文），它从该服务器获取目录并在本地写入配置。

| 命令                       | 工具                     | 它写了什么                                                                                                                                         | 关键标志                                                                                                                                   | 本地与远程 |
| -------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `omniroute setup-codex`    | OpenAI Codex CLI         | `~/.codex/<name>.config.toml` — 每个兼容文本模型一个配置文件 (`codex --profile <name>`)                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 两个都     |
| `omniroute setup-claude`   | Claude代码               | `~/.claude/profiles/<name>/settings.json` — 每个匹配模型一个配置文件 (`CLAUDE_CONFIG_DIR`)                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 两个都     |
| `omniroute setup-opencode` | OpenCode （兼容 openai） | `~/.config/opencode/opencode.json` — 每个目录模型的`omniroute`提供者 (`opencode -m omniroute/<model>`)                                             | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 两个都     |
| `omniroute setup-cline`    | Cline                    | `~/.cline/data/{globalState,secrets}.json` （CLI模式） +打印VS代码扩展设置                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 两个都     |
| `omniroute setup-kilo`     | 基洛代码                 | `~/.local/share/kilo/auth.json` (CLI) +将`kilocode.*`合并到VS代码`settings.json`如果存在）                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 两个都     |
| `omniroute setup-continue` | 继续/ `cn` CLI           | `~/.continue/config.yaml` — `provider: openai`型号，通过`${{ secrets.OMNIROUTE_API_KEY }}`密钥                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两个都     |
| `omniroute setup-cursor`   | Cursor                   | 什么都没有 — 打印应用内步骤（Cursor配置是不透明的SQLite）                                                                                          | `--remote` `--api-key` `--only` `--port`                                                                                                   | 两个都     |
| `omniroute setup-roo`      | 袋鼠代码                 | `~/.omniroute/roo-settings.json` （导入文档）如果VS代码`settings.json`存在，则+设置`roo-cline.autoImportSettingsPath`                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 两个都     |
| `omniroute setup-crush`    | 压碎                     | `~/.config/crush/crush.json` — `openai-compat`提供者，通过`$OMNIROUTE_API_KEY`密钥                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两个都     |
| `omniroute setup-zed`      | Zed                      | `~/.config/zed/settings.json` — `openai_compatible.omniroute`提供者（≤ 25 支持工具的模型），通过`$OMNIROUTE_API_KEY`密钥                           | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | 两个都     |
| `omniroute setup-goose`    | 鹅                       | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) +打印 env 配方                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两个都     |
| `omniroute setup-aider`    | 艾德尔                   | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) +打印 env 配方                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两个都     |
| `omniroute setup-qwen`     | Qwen代码                 | `~/.qwen/settings.json` — `~/.qwen/.env`的 V4 `modelProviders.openai`数组+ `OMNIROUTE_API_KEY`                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 两个都     |
| `omniroute setup-5dive`    | 5dive（代理舰队）        | `$HOME`下什么都没有——写了 5dive**身份验证配置文件**（`/var/lib/5dive/auth-profiles/<name>/`）通过`5dive agent auth set`；仅 root，在舰队主机上运行 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 两个都     |
| `omniroute setup-whycodes` | WhyCodes                 | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`);路径是`$WHYCODES_HOME/config.toml`或`~/.whycodes/config.toml`                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两个都     |
| `omniroute run <target>`   | 运行时启动（通用）       | 什么都没有——使用正确的 env 和 args 生成`claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` ； Qwen和Gemini使用临时隔离住所      | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 两个都     |
| `omniroute launch`         | Claude代码               | 什么都没有——生成`claude`并注入`ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 两个都     |
| `omniroute launch-codex`   | OpenAI Codex CLI         | Nothing — 生成`codex`并通过`-c`标志注入`omniroute`提供程序                                                                                         | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 两个都     |

关于标志的注释（在命令源中验证）：

- `--remote <url>` — 从远程OmniRoute获取目录（覆盖`--port`和活动上下文）。 `--api-key <key>`提供该服务器的凭证（默认为`OMNIROUTE_API_KEY`环境变量，或活动上下文的令牌）。
- `--only <patterns>` — 逗号分隔的子字符串；仅保留匹配的模型IDs （例如`--only glm,kimi`）。可用于`setup-codex`、 `setup-claude`、 `setup-opencode`、 `setup-continue`、 `setup-cursor`、 `setup-crush`、 `setup-zed`。
- `--dry-run` — 准确打印将要写入的内容，而无需触及文件系统。可用于每个`setup-*`命令**除了**`setup-cursor` （从不写入文件）。
- `--model <id>` — 对于没有模型自动发现功能的工具是必需的（或交互选择）： Cline、 Kilo、 Roo、 Goose、 Qwen、 Aider、 5dive、 WhyCodes。这些工具还接受`--yes`进行非交互式运行（然后需要`--model`）。 `setup-opencode`使用`--model`设置默认的顶级模型。
- `omniroute run`上的`--model <id>`遵循清单的每个目标连接 (`bin/cli/cli-manifest.mjs`)：**助手**接收`--model openai/<id>`和**开放代码**`--model omniroute/<id>` （仅当id尚未携带时才添加前缀）；**曲文**和**双子座**逐字接收 ID；**克劳德**通过`ANTHROPIC_MODEL`获取，**鹅**通过`GOOSE_MODEL`,**原因码**通过`-P omniroute -m <id>`和**法典**通过`-c model_providers.omniroute.*`参数。**Qwen是唯一硬需要`--model`的运行目标**— 没有它的`omniroute run qwen`会退出`2` ，并出现显式错误。
- `--port <port>` — 本地OmniRoute端口（默认`20128`，设置`--remote`时忽略）。存在于所有`setup-*`和两个启动器上。
- `omniroute run`退出代码：子CLI自己的退出代码逐字传播； `2` =无效参数（不支持的目标、缺少必需的`--model`、容器防护）； `127` =目标二进制文件不在`PATH`中； `130`/`143`/`129`当启动由`SIGINT`/`SIGTERM`/`SIGHUP`结束时； `1` =其他运行时启动失败。
- 两个启动器（`launch`、 `launch-codex`）接受`--profile <name>`来选择由`setup-claude` / `setup-codex`编写的配置文件，以及底层`claude` / `codex`二进制文件的传递参数。

交互式选择器也由设置食谱共享：

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure`目前委托给`codex`、 `claude`、 `opencode`、 `qwen`、 `aider`、 `goose`、 `cline`、 `continue`、 `kilo`和`5dive`的测试配方。仅 IDE、 MITM和仅指南目录条目保留显式`setup-*`/手动流程，并且不作为可启动目标呈现。

> `setup-opencode`是**轻量级 openai 兼容**OpenCode整合。还有一个更丰富的插件集成 - `omniroute setup opencode` - 它安装`@omniroute/opencode-plugin`。它们是不同的命令；上表记录了`setup-opencode`。
>
> 该插件有两个包，每个OpenCode主要一个，因为两个加载器期望不同的入口点： `@omniroute/opencode-plugin`用于OpenCode v1， `@omniroute/opencode-plugin-v2`用于OpenCode v2。 v2 包是新的（`0.1.0`），并遵循仍在移动的主机合约，因此它将形状OpenCode种子读取到目录草稿中，而不是假设一个。通过向`opencode.json`添加`plugins`条目来安装它； `omniroute setup opencode`仍然安装v1包。选项和凭证查找顺序位于包README中。

---

## 本地使用

当 OmniRoute 运行在 `localhost:20128` 时，只需为你的工具运行设置命令即可。模型目录会从本地服务器获取。

```bash
# Codex：为每个匹配的模型将一个配置写入 ~/.codex/
omniroute setup-codex
codex --profile glm52            # 使用生成的配置

# Claude Code：写入各模型的配置，然后启动其中一个
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode：写入包含目录中所有模型的 openai-compatible provider
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # 通过 {env:OMNIROUTE_API_KEY} 引用，绝不写入磁盘
opencode -m omniroute/glm/glm-5.2 "..."

# 不支持自动发现的工具需要显式指定模型：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 预览而不写入任何内容：
omniroute setup-continue --dry-run
```

完全不写入任何配置即可启动（仅注入环境变量）：

```bash
omniroute launch                 # Claude Code → 本地 OmniRoute
omniroute launch-codex           # Codex CLI → 本地 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 显式命令路径：原样传递 -- 之后的所有内容
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 远程使用

使用 `--remote` + `--api-key` 将任意设置命令指向远程 OmniRoute。模型目录会从远程获取；配置则写入你的本地计算机。

```bash
# 针对远程 VPS 配置 OpenCode，仅保留 glm/kimi 模型
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 请先导出 OMNIROUTE_API_KEY

# 根据远程模型目录生成 Codex 配置
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 直接针对远程服务启动 CLI
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

无需每次都传递 `--remote`/`--api-key`，只需登录一次，之后让**活动上下文**自动提供这些参数：

```bash
omniroute connect 192.168.0.15        # 签发一个限定作用域的令牌，并存储上下文
omniroute setup-codex                 # ← 现在使用远程模型目录
omniroute setup-opencode              # ← 同上
omniroute launch                      # ← Claude Code 连接远程服务
```

有关上下文、作用域和令牌管理，请参阅[远程模式](./REMOTE-MODE.md)。

---

## 5dive 智能体集群

[5dive](https://5dive.ai) 运行着一组长期运行的编码智能体，每个智能体都作为其各自 Unix 用户名下的一个 systemd 单元运行。它本身并不是编码 CLI，因此 `omniroute run` 没有可启动的对象——`5dive` 是一个**仅配置**目标。

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

这两种形式都会写入一个 5dive **身份验证配置**，此后绑定到该配置的每个 `claude` 席位都会与 OmniRoute 通信。此目标有三项特殊之处：

- **它以 root 身份在集群主机上运行。** 5dive 的操作命令作用于本地 systemd 单元和由 root 所有的状态目录；不存在远程模式。该方案在尚未以 root 身份运行时会通过 `sudo` 重新执行（`--no-sudo` 会禁用此行为并改为打印命令）。
- **除非端点是回环地址，否则必须使用 `https://`。** 智能体的 API 密钥会随每个请求通过该 URL 传输，而且 5dive 拒绝使用指向本机之外的明文端点。专用局域网地址也不例外。
- **每个席位自身固定的模型优先于配置。** 配置中包含 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`，但如果某个席位仍固定使用原始模型 ID，其首次交互将失败并显示 _"所选模型存在问题"_。传递 `--agent <name>`（可重复使用）也可固定这些席位；若你没有这样做，该方案会打印相应命令。

API 密钥通过 **stdin**（`--api-key=-`）传递给 5dive，因此绝不会出现在 `ps` 输出中。

将配置指向 OmniRoute **组合**而非单一模型，才能让集群获得提供者故障转移能力：在 [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) 记录的运行中，主要端点在交互中途完全宕机后，智能体通过后备端点完成了剩余步骤，且未向外暴露此次中断。

---

## 基本URL约定（哪些工具需要`/v1`）

OmniRoute在`/v1`暴露OpenAI表面，在根处Anthropic表面，并在`/v1beta`暴露本机Gemini表面。每个集成都连接到其工具期望的形式（在命令源中验证）：

| 一体化                                                                     | 基础URL编写 | `/v1`?                                 |
| -------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 根          | 否 — Cline附加`/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根          | 否 — Goose 附加路径                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根          | 否 — LiteLLM附加`/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | 与`/v1`     | 是的                                   |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | 与`/v1`     | 是的                                   |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 根          | 否 — Claude代码附加`/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | 与`/v1`     | 是的                                   |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | 与`/v1`     | 是的                                   |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根          | 否 — SDK附加`/v1beta/models/…`         |
| `setup-5dive` （身份验证配置文件中的`ANTHROPIC_BASE_URL` ）                | 根          | 否 — Claude代码附加`/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | 与`/v1`     | 是的 — WhyCodes发布`/chat/completions` |

---

## 更新时保留原生依赖：`--include=optional`

使用 `omniroute update` 更新时（确认后，或使用 `--apply`），
OmniRoute 会运行已内置 `--include=optional` 的安装命令：

```bash
npm install -g omniroute@latest --include=optional
```

这**不是**传递给 `omniroute update` 的标志，而是更新程序始终会应用的选项。
它可确保 `optionalDependencies`（`better-sqlite3`、`keytar`、
`tls-client`、LLMLingua SLM 技术栈）在更新后仍然保留，即使你的 npm 配置中
设置了 `omit=optional` 也不例外；否则，原生 SQLite 驱动程序和操作系统
密钥环绑定会被静默移除。若要在不实际执行的情况下预览确切命令：

```bash
omniroute update --dry-run
# [试运行] 将运行：npm install -g omniroute@latest --include=optional
```

其他 `omniroute update` 标志（已在源代码中验证）：`--check`（如果
已过时则以状态码 1 退出）、`--apply`（无需提示直接安装）、`--changelog`、`--no-backup`、
`--yes`。

---

## 通过 `omniroute run gemini` 使用 Google Gemini CLI

已根据 `@google/gemini-cli` 0.50.0 验证其约定：该 CLI 遵循
`GOOGLE_GEMINI_BASE_URL`，并向其发送 `POST /v1beta/models/<model>:generateContent`
（以及 `:streamGenerateContent?alt=sse`）请求——这与 OmniRoute 的原生
Gemini 接口（`/v1beta`）完全一致。`omniroute run gemini` 会自动完成以下配置：

- `GOOGLE_GEMINI_BASE_URL` → 当前生效的 OmniRoute Base URL（根地址，不含 `/v1`）；
- `GEMINI_API_KEY` → 解析后的 OmniRoute 凭据（来自选项、环境变量或上下文）；
- 一个**临时且隔离的 `GEMINI_CLI_HOME`**，其 `.gemini/settings.json`
  会选择 `gemini-api-key` 身份验证，因此已存储的 Google OAuth 会话（Code Assist）
  永远不会覆盖指向 OmniRoute 的启动配置——退出后会将其删除；
- **环境变量卫生处理**：从子进程环境中清除 `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI` 和 `GOOGLE_GENAI_USE_GCA`（这些变量会将
  身份验证重定向至 Vertex/Code Assist），并设置
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` 作为双重保险的后备方案——其他
  `run` 目标也会对各自冲突的变量执行相同处理；
- 根据 `--provider`/`--model` 注入 `--model <id>`。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini 的工作区信任防护在无头模式下仍然有效——请自行传递
`--skip-trust`（或以交互方式信任该目录）；启动器刻意不会绕过此防护。
此启动器不同于 **ACP 注册**
（`src/lib/acp/registry.ts`、`gemini --acp`），后者仍然是
`/dashboard/acp-agents` 的智能体协议集成。

---

## 真实冒烟扫描（选择启用）

确定性的启动计划回归测试会在 CI 中运行（`tests/unit/cli/run-command.test.ts`、
`tests/unit/cli/run-execution.test.ts`）。为了针对真实的 OmniRoute 服务器验证真实的二进制文件，
项目在 `tests/integration/upstream-cli-smoke.int.test.ts` 中提供了一个选择启用的测试工具。
它绝不会自动运行（除非设置 `RUN_CLI_SMOKE=1`，否则每个子测试都会跳过）；它通过环境变量的
名称（绝不会通过值）传递凭据；从所有记录的输出中脱敏形似密钥的字符串；跳过未安装对应
二进制文件的目标；并将失败分类为身份验证 / 上游 / 配置，而不是仅返回布尔值：

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

可选：`OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` 可限制扫描目标；
`OMNIROUTE_SMOKE_TIMEOUT_MS` 可覆盖每个目标 120 秒的超时时间。

---

## 另请参阅

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md) — 更深入的 Claude Code 指南
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md) — 一次性的 `[model_providers.omniroute]` 基础设置
- [远程模式](./REMOTE-MODE.md) — 上下文、限定范围的访问令牌以及远程服务器操作
- [CLI 工具参考](../reference/CLI-TOOLS.md) — 受支持工具及仪表板页面的完整目录
- [设置指南](./SETUP_GUIDE.md) — 安装方法和首次运行引导
