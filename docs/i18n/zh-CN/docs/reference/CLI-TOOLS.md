# CLI Tools — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇪🇹 [am](../../../am/docs/reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇧🇦 [bs](../../../bs/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇳🇬 [ha](../../../ha/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇦🇲 [hy](../../../hy/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇳🇬 [ig](../../../ig/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇬🇪 [ka](../../../ka/docs/reference/CLI-TOOLS.md) · 🇰🇭 [km](../../../km/docs/reference/CLI-TOOLS.md) · 🇮🇳 [kn](../../../kn/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ml](../../../ml/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇲🇲 [my](../../../my/docs/reference/CLI-TOOLS.md) · 🇳🇵 [ne](../../../ne/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇮🇳 [or](../../../or/docs/reference/CLI-TOOLS.md) · 🇮🇳 [pa](../../../pa/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇱🇰 [si](../../../si/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇺🇿 [uz](../../../uz/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇳🇬 [yo](../../../yo/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

最后更新: 2026-08-23

OmniRoute与分布在三个专用仪表板页面上的三类CLI工具集成：

| 页          | 路线                    | 概念                                                             | 数数       |
| ----------- | ----------------------- | ---------------------------------------------------------------- | ---------- |
| **CLI代码** | `/dashboard/cli-code`   | 你指向OmniRoute的编码工具（Client → CLI → OmniRoute → Provider） | 26         |
| **CLI代理** | `/dashboard/cli-agents` | 您指向OmniRoute自治代理（相同流程，范围更广）                    | 11         |
| **ACP代理** | `/dashboard/acp-agents` | CLIs ， OmniRoute通过stdio/ACP作为后端生成（反向流）             | 参见注册表 |

旧路由通过 308 重定向： `/dashboard/cli-tools` → `/dashboard/cli-code`、 `/dashboard/agents` → `/dashboard/acp-agents`。

---

## 工作原理

```
CLI 代码 / CLI 智能体（消费流程）：
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  （全部指向 OmniRoute）
    http://YOUR_SERVER:20128/v1
           │
           ▼  （OmniRoute 将请求路由到正确的提供者）
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 智能体（反向生成流程）：
    客户端请求 → OmniRoute → 通过 stdio/ACP 生成 CLI → 响应
```

**优势：**

- 使用一个 API 密钥管理所有工具
- 在仪表板中跟踪所有 CLI 的成本
- 无需重新配置每个工具即可切换模型
- 支持本地和远程服务器（VPS、Docker、Akamai、Cloudflare Tunnel）

---

## 使用`setup-*`自动配置

您不必手动编写每个工具的配置。 OmniRoute为每个受支持的CLI提供一个`setup-*`命令，该命令读取**居住**从正在运行的OmniRoute （本地或远程）中获取模型目录，并将该工具自己的配置写入您的计算机上：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive        omniroute setup-zed
omniroute setup-whycodes
```

每个都接受`--remote <url> --api-key <key>` （针对远程OmniRoute配置本地工具）、 `--dry-run` （无需编写即可预览）和`--port`。没有模型自动发现的工具（Cline、 Kilo、 Roo、 Goose、 Aider、 Qwen、 5dive、 WhyCodes）采用`--model <id>` （以及用于非交互式运行的`--yes` ）。 `setup-5dive`是不在`$HOME`下编写的一个配方：它通过在舰队主机上写入 root 拥有的身份验证配置文件来配置 5dive 代理舰队，因此它通过`sudo`重新执行，并且没有自己的远程模式。要在注入正确的环境且根本不编写配置的情况下启动CLI ，请使用通用`omniroute run <target>`启动器（claude、codex、aider、goose、opencode、qwen、gemini、whycodes - 目标和别名来自`bin/cli/cli-manifest.mjs`）；旧版每个工具启动器`omniroute launch` （Claude代码）和`omniroute launch-codex` （Codex）仍然可用。 Gemini CLI仅启动：它是`omniroute run`目标，但没有`setup-*`/`configure`配方。

> **完整参考：**主表——每个命令写入的内容、每个标志、本地与远程以及哪些工具需要`/v1`后缀——位于**[CLI集成](../guides/CLI-INTEGRATIONS.md)**。

### 在容器内运行它们

在OmniRoute容器内执行的`setup-*`命令会写入容器自己的 home，主机CLI不会读取该 home，并且该命令会随容器一起消失。 OmniRoute检测到这一点并使用指令而不是写入退出`2` 。有两种受支持的方法 — 在主机上安装CLI ，在容器上安装`omniroute connect` ，或者绑定挂载配置目录并设置`CLI_CONFIG_HOME` （撰写`host`配置文件）。每个`setup-*`命令，加上`omniroute configure`和`omniroute config set`，在配置容器自己的CLIs时接受`--allow-container-write`是您实际的意思； `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`对服务器做同样的事情。请参阅[Docker指南→配置主机CLI工具](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)。

仪表板的**应用端点**(`POST /api/cli-tools/apply`) 强制执行相同的保护：在容器中，目标未从主机答案绑定安装的写入**`422`**使用`containerEphemeralTarget: true`，安全错误文本，以及 - 对于具有主机配方的工具（claude、codex、opencode、cline、kilo、 continue） - 在主机上运行的`hostSetupCommand` （例如`omniroute setup-opencode`）；什么也没写。 `dryRun: true`继续在容器模式下工作，并返回经过编辑的预览+目标路径，而无需接触磁盘。预览内容不是要复制或导入的带有凭据的配置。应用主机上的原始tool/base URL/API key/model输入，或使用指示的主机端设置命令。请参阅预览标头和请求合约的[CLI配置安全性](../security/CLI-CONFIGURATION.md)。这种行为是故意的，并且由`tests/unit/api/cli-tools/apply-container-guard.test.ts`进行回归保护——永远不要通过删除保护来“修复”422。

---

## 事实来源

统一目录位于 `src/shared/constants/cliTools.ts` 中，定义为 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每个条目均包含以下字段（定义于 `src/shared/schemas/cliCatalog.ts`）：

| 字段                                            | 类型                                                         | 描述                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | 工具显示在哪个页面                           |
| `vendor`                                        | `string`                                                     | 工具来源（"Anthropic"、"OSS (P. Gauthier)"） |
| `acpSpawnable`                                  | `boolean`                                                    | 是否也可用作 ACP Agent（显示徽章）           |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | 自定义端点支持级别。`"none"` = MITM 待办事项 |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 配置机制                                     |
| `id`, `name`, `color`, `description`, `docsUrl` | 标准                                                         | 核心显示字段                                 |

具有 `baseUrlSupport: "none"` 的条目**不会显示**在仪表板页面中——它们已登记到计划 11 的 MITM 待办事项中（请参阅 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

### 能力层级（已收录 × 可检测 × 可配置 × 可启动）

并非每个已收录的工具都可检测、可配置或可启动。每个层级都有一个
声明来源，并通过偏差测试确保它们保持一致：

| 层级       | 含义                                                        | 声明位置                                                      |
| ---------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| **已收录** | 显示在仪表板目录中（名称、供应商、文档、配置类型）          | `src/shared/constants/cliTools.ts`（`CLI_TOOLS`）             |
| **可检测** | 二进制文件/配置检测、健康检查、配置路径                     | `src/shared/services/cliRuntime.ts`（`CLI_TOOLS` 运行时目录） |
| **可配置** | 受 `omniroute configure <cli>` 支持（存在设置方案）         | `bin/cli/cli-manifest.mjs`（`configure: true`）               |
| **可启动** | 受 `omniroute run <target>` 支持（已定义环境变量/参数注入） | `bin/cli/cli-manifest.mjs`（`run: true`）                     |

`bin/cli/cli-manifest.mjs` 是 CLI 命令界面的规范可执行清单：
`run`、`configure` 和 shell 补全生成器均从中派生其
目标列表、别名解析（例如 `kilocode`/`kilo-code`/`kilo_cli` → `kilo`）
以及 `--model` 标志绑定。偏差防护测试
`tests/unit/cli/cli-manifest-drift.test.ts` 会断言清单、运行时
目录、UI 目录以及每个使用方界面保持同步——如果只将目标添加到
其中一个界面而未同步到其他界面，测试套件将失败，而不会任由偏差悄然产生。

---

## 1. CLI代码目录（27个工具）

`/dashboard/cli-code`中出现的所有工具。那些带有`baseUrlSupport: none`连接通过MITM或手动指南而不是自定义基础URL：

| ID           | 姓名                 | 小贩                  | 基本Url支持 | 配置类型   | acp可生成 |
| ------------ | -------------------- | --------------------- | ----------- | ---------- | --------- |
| 克劳德       | Claude代码           | Anthropic             | 满的        | 环境       | 真的      |
| 法典         | OpenAI Codex CLI     | OpenAI                | 满的        | 风俗       | 真的      |
| 零码         | ZCode（GLM编码计划） | 爱                    | 没有任何    | 风俗       | 错误的    |
| 克莱因       | Cline                | OSS （前克劳德·戴夫） | 满的        | 风俗       | 真的      |
| 公斤         | 基洛代码             | 基洛组织              | 满的        | 风俗       | 错误的    |
| 袋鼠         | 袋鼠代码             | 袋鼠 (OSS)            | 满的        | 指导       | 错误的    |
| 继续         | 继续                 | 继续.dev              | 满的        | 指导       | 错误的    |
| 助手         | 艾德尔               | OSS （P.高蒂尔）      | 满的        | 指导       | 真的      |
| 锻造         | ForgeCode            | HQ                    | 满的        | 风俗       | 真的      |
| 代码         | 代码                 | 1杰黄 (OSS)           | 满的        | 风俗       | 错误的    |
| 深度搜索-tui | DeepSeek TUI         | 猎人弓 (OSS)          | 满的        | 风俗       | 错误的    |
| 码鲸         | CodeWhale            | 赫姆本 (OSS)          | 满的        | 风俗       | 错误的    |
| 开放代码     | OpenCode             | 异常（前 SST）        | 满的        | 指导       | 真的      |
| 机器人       | 工厂机器人           | 工厂AI                | 部分的      | 指导       | 错误的    |
| 副驾驶       | GitHub Copilot CLI   | GitHub/MS             | 满的        | 风俗       | 错误的    |
| 光标 CLI     | Cursor CLI           | 任何领域              | 部分的      | 指导       | 真的      |
| 冶炼         | 冶炼                 | 伦纳德塞尔 (OSS)      | 满的        | 风俗       | 错误的    |
| 圆周率       | Pi（pi 编码代理）    | M.泽克纳（OSS）       | 满的        | 风俗       | 错误的    |
| 格罗克构建   | Grok构建             | 人工智能              | 满的        | 风俗       | 错误的    |
| 压碎         | 压碎                 | OSS （魅力）          | 满的        | 风俗       | 错误的    |
| 曲文         | Qwen代码             | Alibaba               | 满的        | 指导       | 真的      |
| 泽德         | Zed                  | Zed实业               | 满的        | 指导       | 错误的    |
| 光标         | Cursor               | 任何领域              | 没有任何    | 指导       | 错误的    |
| 反重力       | Antigravity          | Google                | 没有任何    | 中间人     | 错误的    |
| 爱马仕       | 赫尔墨斯             | 诺斯研究              | 没有任何    | 指导       | 错误的    |
| 基罗         | Kiro AI              | Amazon                | 没有任何    | 中间人     | 错误的    |
| 风俗         | 定制CLI              | —                     | 满的        | 定制建造者 | 错误的    |

使用`baseUrlSupport: "partial"`的工具会在仪表板卡中显示徽章“⚠ Base URL parcial”。
---

## CLI代理目录（11个工具）

`/dashboard/cli-agents`中出现的自治代理：

| ID         | 姓名         | 小贩                 | 基本Url支持 | acp可生成 |
| ---------- | ------------ | -------------------- | ----------- | --------- |
| 爱马仕代理 | 爱马仕代理   | 诺斯研究             | 满的        | 错误的    |
| 开爪       | OpenClaw     | OSS （P.斯坦伯格）   | 满的        | 真的      |
| 鹅         | 鹅           | 区块 / Linux基金会   | 满的        | 真的      |
| 口译员     | 打开解释器   | OSS                  | 满的        | 真的      |
| 经         | Warp AI      | Warp公司             | 部分的      | 真的      |
| 代理平台   | 特工套牌     | 阿什什戈普拉尼 (OSS) | 满的        | 错误的    |
| 奥普       | 哦我的圆周率 | OSS                  | 满的        | 真的      |
| 莱塔       | 莱塔CLI      | 莱塔                 | 满的        | 错误的    |
| 主要代理人 | 首席经纪人   | 原始智力 (OSS)       | 满的        | 错误的    |
| 5次潜水    | 5次潜水      | OSS (5dive-ai)       | 满的        | 错误的    |
| 原因码     | WhyCodes     | 为什么选择公司       | 满的        | 错误的    |

---

## 3. ACP 智能体（/dashboard/acp-agents）

此页面（由 `/dashboard/agents` 重命名而来）显示 OmniRoute 可通过 stdio/ACP 协议作为后端执行引擎**启动**的 CLI。该目录单独维护在 `src/lib/acp/registry.ts` 中，与 `CLI_TOOLS` **并不**相同。

---

## 4. MITM 待办事项（未在仪表板中显示）

以下 CLI 原生不支持自定义基础 URL，因此**未列出**在 CLI Code 或 CLI 智能体页面中。它们是计划 11 中进行 MITM 拦截的候选对象：

| CLI                 | 原因                                           |
| ------------------- | ---------------------------------------------- |
| windsurf            | BYOK 仅限于选定的 Claude 模型以及企业 URL/令牌 |
| amp                 | 封闭生态系统（Sourcegraph）                    |
| amazon-q / kiro-cli | AWS SSO 身份验证，不支持自定义 URL             |
| cowork              | Anthropic Desktop，无可配置端点                |

完整的交叉引用请参阅 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`。

---

## 5. 批量检测 API

所有工具检测均通过单一端点聚合：

**`GET /api/cli-tools/all-statuses`**

- 身份验证：`requireCliToolsAuth(request)`（与其他 `/api/cli-tools/` 路由相同）
- 返回：`Record<toolId, ToolBatchStatus>`（类型：`src/shared/types/cliBatchStatus.ts`）
- 策略：对所有工具使用 `Promise.all`，每个工具的超时时间为 5 秒
- 缓存：以内存 LRU 形式存储，并按配置文件的 `mtime` 建立索引。当 mtime 发生变化时，缓存失效。服务器重启时重置。

每个工具的响应结构：

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // 已清理，不包含堆栈跟踪
}
```

---

## 6. 新工具的设置处理程序

具有 `configType: "custom"` 的新工具拥有专用的设置 API 路由：

| 路由                                        | 工具                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode（--base-url 标志）                                         |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI（OPENAI_BASE_URL，旧版）                            |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale（OPENAI_BASE_URL，主要配置 + 旧版 `~/.deepseek` 同步） |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi 编码智能体                                                    |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build（~/.grok/config.toml，`[model.omniroute]`）           |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code（`~/.qwen/settings.json` + 专用 `.env` 键）            |

所有路由都使用 `sanitizeErrorMessage()` 处理错误响应（硬性规则 #12）。

---

## 7. 仪表板页面架构

### CLI Code (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 服务端组件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具详情页面
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 个专用工具卡片 + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 服务端组件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 复用 `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 服务端组件（从 `agents/` 移出）

### 共享 UI 组件 (`src/shared/components/cli/`)

| 文件                    | 用途                               |
| ----------------------- | ---------------------------------- |
| `CliToolCard.tsx`       | 智能状态卡片（检测 + 配置 + 端点） |
| `CliConceptCard.tsx`    | 各页面的概念说明卡片               |
| `CliComparisonCard.tsx` | CLI 类型的三列对比                 |
| `BaseUrlSelect.tsx`     | 端点下拉菜单（本地/云端/自定义）   |
| `ApiKeySelect.tsx`      | API 密钥选择器                     |
| `ManualConfigModal.tsx` | 可复制配置片段的模态框             |

### 共享 Hook (`src/shared/hooks/cli/`)

| 文件                      | 用途                                                  |
| ------------------------- | ----------------------------------------------------- |
| `useToolBatchStatuses.ts` | 获取 `/api/cli-tools/all-statuses`，管理加载/刷新状态 |

---

## 8. i18n

计划 14 F9 中新增了以下命名空间：

| 命名空间    | 用途                                              |
| ----------- | ------------------------------------------------- |
| `cliCommon` | 共享字符串（卡片标签、概念/比较文本、详情页标签） |
| `cliCode`   | CLI Code 页面字符串                               |
| `cliAgents` | CLI Agents 页面字符串                             |
| `acpAgents` | ACP Agents 页面字符串                             |

已提供完整的 PT-BR 和 EN 翻译。其他 39 个语言区域通过 `src/i18n/request.ts` 中的命名空间级合并自动回退到 EN。

---

## 9. 快速开始

### 第 1 步 — 获取 OmniRoute API 密钥

1. 打开 `/dashboard/api-manager` → **创建 API 密钥**
2. 为其命名（例如 `cli-tools`），并选择所有权限
3. 复制密钥 — 后续每个 CLI 都需要使用它

> 你的密钥格式如下：`sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 第 2 步 — 安装 CLI 工具

所有基于 npm 的工具都需要 Node.js 22.22.2+ 或 24.x：

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI（可通过 `omniroute run gemini` 启动 → /v1beta 接口）
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # 基于 Rust

# Pi 编码代理
# 安装方法请参阅 https://github.com/zechnerj/pi-coding-agent

# jcode
# 安装方法请参阅 https://github.com/1jehuang/jcode
```

---

### 第 3 步 — 通过仪表板配置

1. 前往 `http://localhost:20128/dashboard/cli-code`
2. 在网格中找到你的工具
3. 点击卡片打开工具详情页
4. 选择你的 API 密钥和基础 URL
5. 点击 **应用配置**，或复制手动配置代码片段

---

### 第 4 步 — 设置全局环境变量

```bash
# OmniRoute 通用端点
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI 从根地址读取 GOOGLE_GEMINI_BASE_URL（其 SDK 会自行追加 /v1beta/...）
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 对于**远程服务器**，请将 `localhost:20128` 替换为服务器 IP 或域名，
> 例如 `http://<your-server-ip>:20128`。

---

### 第 4 步 — 配置每个工具

#### Claude Code

```bash
# 创建 ~/.claude/settings.json：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

为 Claude Code 使用统一的 Anthropic 网关根地址。此处不要追加 `/v1`。

**测试：** `claude "say hello"`

---

#### OpenAI Codex

现代版 Codex（v0.137+）仅会读取 `~/.codex/config.toml` — 旧的
`config.yaml` 属于旧版 npm CLI，会被静默忽略。API
密钥应保存在 `OMNIROUTE_API_KEY` 环境变量（`env_key`）中，绝不能
写入文件：

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

完整参考（配置文件、`wire_api`、上下文窗口）：[CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)。

**测试：** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**测试：** `opencode`

> 使用 `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> 发送思考变体。

---

#### Cline（CLI 或 VS Code）

**CLI 模式：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 模式：**
Cline 扩展设置 → API 提供者：`OpenAI Compatible` → 基础 URL：`http://localhost:20128/v1`

或者使用 OmniRoute 仪表板 → **CLI 工具 → Cline → 应用配置**。

---

#### KiloCode（CLI 或 VS Code）

**CLI 模式：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 设置：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

或者使用 OmniRoute 仪表板 → **CLI 工具 → KiloCode → 应用配置**。

---

#### Continue（VS Code 扩展）

编辑 `~/.continue/config.yaml`：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

编辑后重启 VS Code。

---

#### VS Code Insiders（`chatLanguageModels.json`）

当 VS Code Insiders 配置为使用自定义端点模型，并且你希望 OmniRoute 无需自定义请求头字段即可工作时，请使用此配置。

**推荐位置：**

- Linux：`~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows：`%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用令牌化 OmniRoute 别名的示例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意事项：**

- 将 `sk-your-omniroute-key` 替换为在 OmniRoute 中创建的 API 密钥。
- `url` 字段应指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 字段应指向 `/api/v1/vscode/{token}/models`。
- 当客户端支持自定义请求头时，优先使用常规的 `/v1` + Bearer 请求头流程。
- URL 中嵌入令牌是一种兼容性后备方案，令牌可能会出现在编辑器日志或代理历史记录中。

---

#### Kiro CLI (Amazon)

```bash
# 登录您的 AWS/Kiro 账户：
kiro-cli login

# CLI 使用自身的身份验证——Kiro CLI 本身不需要将 OmniRoute 用作后端。
# 可将 kiro-cli 与 OmniRoute 一起用于其他工具。
kiro-cli status
```

对于 **Kiro IDE** 桌面应用，请使用 OmniRoute 在
`/dashboard/cli-tools → Kiro` 下公开的 MITM 端点。

---

## 10. 内部 OmniRoute CLI

`omniroute` 二进制文件提供用于服务器生命周期、设置、诊断和提供者管理的命令。入口点：`bin/omniroute.mjs`。

```bash
omniroute                              # 启动服务器（默认端口 20128）
omniroute setup                        # 交互式设置向导
omniroute doctor                       # 检查配置、数据库、端口和运行时
omniroute providers list               # 已配置的提供者连接
omniroute providers test-all           # 测试每个活跃连接
omniroute reset-password               # 重置管理员密码
omniroute logs                         # 实时输出请求日志
omniroute health                       # 详细运行状况（断路器、缓存、内存）
omniroute --version                    # 输出版本
omniroute --help                       # 显示所有命令
```

### 设置与初始化

```bash
omniroute setup                        # 交互式设置向导
omniroute setup --non-interactive      # CI/自动化模式（读取环境变量和标志）
omniroute setup --password '<value>'   # 直接设置管理员密码
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 一次性添加并测试提供者
```

非交互式设置可识别的环境变量：

| 变量                | 用途                                                          |
| ------------------- | ------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 提供者 API 密钥（通过 Commander `.env()` 绑定到 `--api-key`） |
| `DATA_DIR`          | 覆盖 OmniRoute 数据目录                                       |

所有其他非交互式输入均作为标志传递，而非环境变量：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（请参阅上面的 `omniroute setup` 选项）。

### 诊断

```bash
omniroute doctor                       # 检查配置、数据库、端口、运行时、内存和存活状态
omniroute doctor --json                # 机器可读的 JSON
omniroute doctor --no-liveness         # 跳过 HTTP 运行状况探测
omniroute doctor --host 0.0.0.0        # 覆盖存活状态检查主机
omniroute doctor --liveness-url <url>  # 覆盖完整的运行状况端点 URL
```

doctor 会运行以下检查：`Config`、`Database`、`Storage/encryption`、
`Port availability`、`Node runtime`、`Native binary`（better-sqlite3）、
`Memory` 和 `Server liveness`。如果任何检查结果为 `fail`，则以非零状态码退出。

### 提供者管理

```bash
omniroute providers available                       # OmniRoute 提供者目录
omniroute providers available --search openai       # 按 ID/名称/别名/类别筛选目录
omniroute providers available --category api-key    # 按类别筛选（api-key、oauth、free 等）
omniroute providers available --json                # 机器可读的 JSON

omniroute providers list                            # 已配置的提供者连接
omniroute providers list --json

omniroute providers test <id|name>                  # 测试一个已配置的连接
omniroute providers test-all                        # 测试每个活跃连接
omniroute providers validate                        # 仅本地结构验证
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 现有 OAuth 流程
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` 以 API 为优先，因此可针对活跃的本地或远程上下文运行。凭据输入应使用
`--credential-stdin` 或 `--credential-env`；`--dry-run --json` 仅报告
经过脱敏处理的存在性/结构信息。`providers available` 读取 OmniRoute 目录；
`providers list/test/test-all/validate` 保留其本地 SQLite 行为，
无需服务器处于运行状态。

对于自定义的 OpenAI 兼容或 Anthropic 兼容节点，请将凭据附加到
`omniroute nodes add` 返回的节点 ID，使用 `omniroute keys add "$NODE_ID" --stdin`。
这要求服务器正在运行，并且活跃上下文具有管理身份验证。
CLI 使用 `POST /api/providers`，该接口会验证节点，并将其端点
设置复制到连接中。如果节点缺失、授权失败或服务器不可用，
则会返回错误，且不会创建本地后备凭据。

`nodes add --base-url` 用于设置节点端点；它不同于
`OMNIROUTE_BASE_URL` 中的服务器地址。对于 OpenAPI 文件，请使用
`omniroute openapi dump --format json --out ./openapi.json`；全局 `--output`
用于选择 CLI 显示格式，而不是指定目标文件名。

### 恢复与重置

```bash
omniroute reset-password                # 重置管理员密码（也可使用：omniroute-reset-password）
omniroute reset-encrypted-columns       # 显示警告并对加密凭据重置执行试运行
omniroute reset-encrypted-columns --force  # 实际将 SQLite 中的加密凭据置空
```

### 凭据导出（⚠ 请谨慎处理）

```bash
omniroute auth export                                 # 显示警告和确认关卡——不访问数据库
omniroute auth export --force                          # 将所有连接的已解密凭据以 JSON 形式导出到标准输出
omniroute auth export --force --id <id>                 # 仅导出匹配的连接
omniroute auth export --force --format env               # 输出 OMNIROUTE_<PROVIDER>_<FIELD>=<value> 格式的行
omniroute auth export --force --out creds.json           # 写入文件（创建时使用 0600 权限）
```

`auth export` **仅限本地使用**（直接读取 SQLite，不通过 HTTP 路由），并且会有意打印/写入
**明文** `apiKey`/`accessToken`/`refreshToken`/`idToken` 值——这是功能特性，并非
错误。如果未指定 `--force`，则不会从数据库读取任何内容，也不会解密任何内容。在输出任何明文之前，始终会先向 stderr
打印警告横幅。需要设置 `STORAGE_ENCRYPTION_KEY`。
如果某个字段解密失败（密钥已失效、密文损坏），则会报告为
`<field>DecryptFailed: true`，而不是中止整个导出过程或泄露底层错误。

### 其他子命令

除非另有说明，否则这些命令均假定 OmniRoute 服务器正在运行：

```bash
omniroute status                       # 全面的运行时状态
omniroute logs                         # 流式传输请求日志（--json、--search、--follow）
omniroute config list                  # 显示已配置的 CLI 工具

omniroute provider list                # 列出可用的提供者（providers list 的别名）
omniroute provider add                 # 在工具上将 OmniRoute 注册为提供者
omniroute keys add | list | remove     # 管理 API 密钥
omniroute models [provider]            # 列出模型（--json、--search）
omniroute combo list | switch | create | delete

omniroute backup                       # 创建配置和数据库的快照
omniroute restore                      # 从之前的快照恢复

omniroute health                       # 详细的运行状况（断路器、缓存、内存）
omniroute quota                        # 提供者配额使用情况
omniroute cache                        # 缓存状态
omniroute cache clear                  # 清除语义缓存和签名缓存

omniroute mcp status | restart         # MCP 服务器状态/重启
omniroute a2a status | card            # A2A 服务器状态/智能体卡片

omniroute tunnel list | create | stop  # 管理隧道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 检查/设置环境变量（临时）

omniroute test                         # 提供者连接冒烟测试
omniroute update                       # 检查更新
omniroute completion                   # 生成 shell 补全脚本
```

### 常用标志

| 标志                | 说明                                         |
| ------------------- | -------------------------------------------- |
| `--no-open`         | 启动时不自动打开浏览器                       |
| `--port <n>`        | 覆盖 API 端口（默认值为 20128）              |
| `--mcp`             | 通过 stdio 作为 MCP 服务器运行（用于 IDE）   |
| `--non-interactive` | CI 模式（不显示提示；从环境变量/标志读取）   |
| `--json`            | 机器可读的 JSON 输出（doctor、providers 等） |
| `--help`, `-h`      | 显示特定于命令的帮助                         |
| `--version`, `-v`   | 打印已安装的版本                             |

---

## 可用的 API 端点

| 端点                       | 描述                         | 用途                    |
| -------------------------- | ---------------------------- | ----------------------- |
| `/v1/chat/completions`     | 标准聊天（所有提供者）       | 所有现代工具            |
| `/v1/responses`            | Responses API（OpenAI 格式） | Codex、智能体工作流     |
| `/v1/completions`          | 旧版文本补全                 | 使用 `prompt:` 的旧工具 |
| `/v1/embeddings`           | 文本嵌入                     | RAG、搜索               |
| `/v1/images/generations`   | 图像生成                     | GPT-Image、Flux 等      |
| `/v1/audio/speech`         | 文本转语音                   | ElevenLabs、OpenAI TTS  |
| `/v1/audio/transcriptions` | 语音转文本                   | Deepgram、AssemblyAI    |

包含已令牌化 OmniRoute URL、可直接粘贴使用的示例：

```txt
令牌示例：sk-a3ab3c080beaee3a-69f4a4-070d71af

标准 OpenAI 基础地址：http://localhost:20128/v1
VS Code 模型：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code Responses：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 标签：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 故障排除

| 错误                           | 原因                   | 修复方法                                   |
| ------------------------------ | ---------------------- | ------------------------------------------ |
| `Connection refused`           | OmniRoute 未运行       | `omniroute serve`                          |
| `401 Unauthorized`             | API 密钥错误           | 在 `/dashboard/api-manager` 中检查         |
| `No combo configured`          | 没有活动的路由组合     | 在 `/dashboard/combos` 中设置              |
| CLI 显示“not installed”        | 二进制文件不在 PATH 中 | 检查 `which <command>`                     |
| 安装后仪表板显示“not detected” | 缓存已过期             | 在仪表板中点击“⟳ Refresh detection”        |
| 旧链接 `/dashboard/cli-tools`  | v3.8.6 之前的书签      | 自动重定向到 `/dashboard/cli-code` (308)   |
| 旧链接 `/dashboard/agents`     | v3.8.6 之前的书签      | 自动重定向到 `/dashboard/acp-agents` (308) |

## 使用 OmniRoute CLI 管理推理密钥策略

使用经过身份验证的管理上下文（请参阅[远程模式](../guides/REMOTE-MODE.md)），
通过现有推理密钥的 ID 检查或更新该密钥：

```bash
omniroute --output json keys policy show KEY_ID
omniroute keys policy set KEY_ID --unrestricted
omniroute --output json keys policy show KEY_ID
```

`--unrestricted` 是 `--model-access-mode all` 的别名。此更新会清除
模型允许列表。它会保留作用域、连接规则、被阻止的模型、速率限制
和成本限制，因此这些其他控制项仍可能拒绝请求。显式指定
`--allowed-models ""` 也会选择 `all`；将其与
`--model-access-mode restricted` 结合使用，可保留一个没有任何允许模型的受限密钥。
除非明确指定，否则非空的逗号分隔列表会选择 `restricted`。
相互矛盾的 `all` 与非空允许列表组合会在发送请求前被拒绝。

`--rate-limit 30` 设置每分钟请求数，并保留其他时间
窗口的规则。`--max-cost 5` 会启用每日美元上限，而不会更改每周上限；
`--max-cost 0` 会移除每日上限，并保留现有的用量限制开关
和每周上限。省略的策略字段保持不变。更改速率时会先读取
当前策略；请避免并发编辑同一密钥的速率限制数组。

策略命令使用经过身份验证的 `GET`/`PATCH /api/keys/{id}`，并遵循当前
上下文和全局 `--api-key` 选项。JSON 输出仅包含策略字段，
不包含已存储的密钥或其掩码表示。仅限推理的凭据
无法授权管理更改。出现 401/403 时，需要检查管理
凭据和上下文；这并不能证明本地 CLI 令牌或盐值发生故障。
有关独立的本地身份验证约定，请参阅 [CLI 令牌](../security/CLI_TOKEN.md)。
