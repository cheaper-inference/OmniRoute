# 🗜️ Prompt Compression Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 自动节省符合条件的上下文的 15-95%。如需快速概览，请参阅 [README 压缩章节](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概述

OmniRoute 实现了一套模块化提示词压缩管线，会在请求到达上游提供者之前**主动**运行。这意味着可以透明地节省令牌，而无需更改现有工作流。

```
客户端请求
  → 压缩策略选择器
    → 是否有组合覆盖设置？→ 使用组合设置
    → 是否达到自动触发阈值？→ 使用自动模式
    → 是否有默认模式？→ 使用全局设置
    → 是否关闭？→ 跳过压缩
  → 选定的压缩模式
    → 关闭：不压缩
    → 轻量：安全清理空白和格式（约 15%）
    → 标准：移除电报式表达中的冗余内容（约 30%）
    → 激进：历史记录老化 + 摘要（约 50%）
    → 超强：启发式剪枝 + 精简代码块（约 75%）
    → RTK：命令感知的终端/工具输出过滤（上游节省范围为 60-90%）
    → 堆叠：有序多引擎管线，通常先运行 RTK，再运行 Caveman（符合条件的内容节省范围为 78-95%）
  → 压缩后的请求 → 提供者
```

---

## 压缩模式

### 关闭

不应用压缩。所有消息均原样传递。

### Lite 模式（约节省 15%，延迟 <1ms）

最安全的模式 — 清理格式。其工具结果截断功能具有损耗性，因此默认路径（无 `allow-lossy`、`engine:lite` 或命名组合选择加入）运行 Lite 模式，并设置
`compressToolResults: false`：较早的工具结果会原样传递给提供者。

| 技术                     | 描述                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `collapseWhitespace`     | 合并连续的空行和行尾空格                                         |
| `dedupSystemPrompt`      | 删除重复的系统消息                                               |
| `compressToolResults`    | 将较早的工具结果截断至 Lite 上限（有损：仅在请求选择加入时启用） |
| `removeRedundantContent` | 删除重复的指令                                                   |
| `replaceImageUrls`       | 缩短 base64 图像数据 URI                                         |

**最适合：** 始终启用的使用场景、安全关键型工作流。

### Standard 模式（约节省 30%）

受 [Caveman](https://github.com/JuliusBrussee/caveman) 启发 — 删除填充词和冗长措辞，同时保留原意：

- 删除填充词（“please”“I think”“basically”“actually”）
- 压缩冗长短语（“in order to” → “to”，“as a result of” → “because”）
- 删除礼貌性模糊表达（“Would you mind...”“If you could possibly...”）
- 针对编码提示优化的 30 多条正则规则

**最适合：** 日常编码工作流、注重成本的团队。

### Aggressive 模式（约节省 50%）

针对长会话的智能历史记录管理：

- **消息老化** — 较早的消息会逐步压缩
- **工具结果压缩** — 截断或省略较长的工具输出（首尾行、匹配行筛选、JSON 键压缩）
- **结构完整性保护** — 确保 `tool_use` + `tool_result` 对保持一致
- **上下文窗口感知** — 遵循每个模型的 token 限制

**最适合：** 长时间调试会话、大型代码库。

### Ultra 模式（约节省 75%）

面向 token 关键场景的最大压缩：

- **启发式裁剪** — 基于评分裁剪 prose token
- **结构保留** — 围栏代码块、内联代码、URL 和标识符会被标记并原样重新拼接，绝不会被裁剪
- **可选 SLM 层** — 配置后，小型本地模型可以优化裁剪结果
- 独立于 Aggressive 模式：不会运行消息老化、工具结果压缩或备用摘要器（只有 SLM 层失败时，才可能通过 Aggressive 运行备用处理）

**最适合：** 反复触及上下文限制时。

### RTK 模式（上游范围内节省 60-90%）

RTK 模式针对编码代理会话中出现的冗长工具输出进行了优化：

- 检测 `git status`、`git diff`、`git log`、测试运行器、TypeScript/Vite/Webpack 构建、ESLint/Biome/Prettier、npm audit/installs、Docker 日志、基础设施输出以及通用 shell 输出等命令/输出类别
- 应用来自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 筛选器包
- 从项目或全局 `filters.toml` 文件导入 RTK TOML schema v1 筛选器，并对项目文件执行内联测试验证和信任门控
- 内置 56 个带内联验证样例的筛选器
- 删除 ANSI 控制序列、进度条、重复行和无行动价值的噪声
- 保留失败信息、错误、警告、已更改文件、摘要以及长输出的末尾内容
- 支持受信任门控的项目筛选器、全局筛选器以及可选的已编辑原始输出恢复

**最适合：** 包含 shell、构建、测试、git、grep 和文件输出记录的代理会话。

### Stacked 模式（符合条件范围内节省 78-95%）

Stacked 模式按确定性顺序运行多个压缩引擎。默认管道为：

```txt
RTK -> Caveman
```

该顺序会先压缩终端/工具输出，然后对剩余的自然语言提示应用 Caveman 语义压缩。Stacked 管道可以全局配置，也可以通过分配给路由组合的压缩组合进行配置。

**最适合：** 同时包含大量工具日志以及人工指令或助手摘要的混合上下文。

## 上游储蓄数学

OmniRoute记录了来自两个来源的压缩节省：上游项目基准测试和OmniRoute自己的引擎组合。

| 来源   | 此处使用上游README号码                                                            |
| ------ | --------------------------------------------------------------------------------- |
| 穴居人 | `~75%`更少的输出令牌、 `65%`基准平均输出节省、 `22-87%`范围和`~46%`输入压缩工具   |
| RTK    | `60-90%`命令输出节省；示例会话`~118,000 -> ~23,900`令牌，或保存的`79.7%` (`~80%`) |

对于重叠的tool/context有效负载，默认的OmniRoute组合堆叠引擎：

```txt
RTK -> Caveman
```

综合节省是乘法而非加法：

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

当RTK和 Caveman 都可以减少相同的input/context有效负载时，该`78-95%`数字适用。 Caveman 响应输出模式是独立的：启用后，使用 Caveman 自己的输出节省（`65%`平均值、 `~75%`标题、 `22-87%`范围）。总的账单节省取决于您的prompt/output组合。

### “符合资格”的实际含义是什么

15-95% 的标题范围是真实的，但它仅适用于**多余或冗长**内容—重复的错误行、垃圾邮件相同警告的构建日志、超大的`grep`/文件读取转储。确实如此**不是**意味着每个请求都可以节省这么多。

经验验证 (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`)： `stacked` (RTK + Caveman) 针对包含 300 个相同错误行的人择形状`tool_result`块运行**节省 95.93% 代币/节省 96.26% 角色**—完全在广告范围内。但是，针对正常的非冗余工具输出（干净的`grep`匹配列表、短文件读取、普通对话文本）运行的相同管道会正确生成**几乎为零的节省**，因为没有任何重复内容需要删除，并且`validateCompression()` (`validation.ts`) 拒绝发布会删除或更改代码块、 URLs、标题、版本或全大写常量标识符的重写。

这是预期的安全行为，而不是错误：即使完全启用压缩，大多数reads/greps干净文件的编码会话也将看到适度的总节省，而遇到失败循环或喋喋不休的 linter 的会话将看到该流量的完整 78-95% 范围。不要使用单个会话的低聚合节省百分比，因为证据压缩配置错误—首先检查底层工具输出是否实际上是冗余的。

---

## Token 节省量可视化

```
不使用压缩：    向 LLM 发送 47K 个 token
使用 Lite：     发送 40K 个 token          （节省 15% — 安全、始终启用）
使用 Standard： 发送 33K 个 token          （节省 30% — caveman-speak 规则）
使用 Aggressive：发送 24K 个 token         （节省 50% — 老化 + 摘要）
使用 Ultra：    发送 12K 个 token          （节省 75% — 启发式剪枝）
使用 RTK：      发送 19K-5K 个 token       （命令/工具输出节省 60-90%）
使用 Stacked：  发送 10K-2.5K 个 token     （符合条件的 RTK+Caveman 内容节省 78-95%）
```

---

## 配置

### 仪表板

导航至 `Dashboard → Context & Cache`：

- **Caveman** — 模式选择、语言包、预览和全局默认值
- **RTK** — 命令过滤器预览、RTK 安全设置和过滤器目录
- **Compression Combos** — 分配给路由组合的命名引擎管道
- **Auto-Trigger Threshold** — 当令牌数量超过阈值时自动启用压缩

### 每个组合的覆盖设置

在 `Dashboard → Context & Cache → Compression Combos` 中，为路由组合分配压缩组合：

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

这样，你可以在免费/编程提供者上使用堆叠压缩，同时在付费订阅上保持 lite 模式。

此“Per-Combo Override”分配与**路由组合压缩模式**覆盖设置是不同的控制项（Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses——该字段的架构还接受 `rtk`、`stacked` 和 `omniglyph`）。后者不会选择命名的压缩组合管道；它只会设置由 `resolveCompressionPlan` 使用的 `compressionMode` 字段。该设置既可以在组合卡片（`Dashboard → Combos`）上配置，也可以自 #6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的“Assign to routing”列表中为每个路由组合配置，就位于上述管道分配复选框旁边。这两个界面都通过相同的 `PUT /api/combos/{id}` 端点持久化设置。

### 每个请求的覆盖设置

发送 `x-omniroute-compression` 请求标头，可以覆盖单个请求的压缩计划。它具有最高优先级——优先于路由组合覆盖设置、活动配置文件、自动触发和面板 Default。未知值会被忽略（请求不会被拒绝），并且全局主开关仍会控制所有功能：当全局关闭压缩时，该标头无法将其开启。可用值：

| Value         | Effect                                                                          |
| ------------- | ------------------------------------------------------------------------------- |
| `off`         | 此请求不进行压缩。                                                              |
| `default`     | 面板派生的 Default 配置文件（忽略活动配置文件）。不会启用有损引擎。             |
| `safe`        | 与省略该标头相同。                                                              |
| `allow-lossy` | 保留此请求的操作员计划，包括摘要、相关性过滤器和样式重写。                      |
| `engine:<id>` | 在启用时使用单个引擎，例如 `engine:rtk`。这是针对该引擎的每个请求选择加入设置。 |
| `<combo>`     | 按名称（不区分大小写）优先匹配，然后按 ID 匹配的命名组合。                      |

如果没有使用 `allow-lossy`、`engine:<id>` 或命名组合，则不会应用有损引擎。当有损 Default、自动触发或路由覆盖设置被降级时，OmniRoute 会按照配置顺序保留已配置堆叠管道中可识别的无损步骤。只有在没有任何已配置的无损步骤保留时，才会回退到 `session-dedup → lite`。

Settings 面板的**Effective pipeline**预览显示通常的静态计划。当可以运行自动触发时，同一预览还会显示其条件有效管道，以便面板和不带标头的运行时解析保持一致。

应用的计划会通过 `X-OmniRoute-Compression: <mode>; source=<source>` 响应标头返回，其中 `<source>` 为 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 获取压缩设置
curl http://localhost:20128/api/settings/compression

# 更新压缩设置
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 预览特定的 RTK/stacked 负载
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 过滤器包
curl http://localhost:20128/api/context/rtk/filters

# 直接测试 RTK，可选命令元数据
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 受保护的内容

压缩引擎**始终保留：**

- ✅ 代码块（围栏式和行内）
- ✅ URL 和文件路径
- ✅ JSON 结构和结构化数据
- ✅ 标识符和受保护的技术令牌
- ✅ 数学表达式
- ✅ 工具/函数调用定义
- ✅ 系统提示词（在 Lite 模式下）

在持久化任何内容之前，RTK 原始输出恢复功能会隐去常见的 API 密钥、Bearer 令牌、Slack 令牌、AWS 访问密钥、密码、令牌和密钥。

---

## 压缩统计

每个压缩请求都包含服务器日志中的统计信息：

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## 阶段路线图

| 阶段    | 模式                                                                                                                    | 状态      |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | --------- |
| 阶段 1  | 关闭、Lite                                                                                                              | ✅ 已发布 |
| 阶段 2  | Standard、Aggressive、Ultra                                                                                             | ✅ 已发布 |
| 阶段 3  | RTK、Stacked、压缩组合                                                                                                  | ✅ 已发布 |
| 阶段 4  | 输出样式、SLM 级 Ultra、评估工具                                                                                        | ✅ 已发布 |
| 阶段 4C | 自适应上下文预算（“旋钮”）——计算引擎 + API（`PUT /api/settings/compression` 上的 `contextBudget`）+ 仪表板模式/策略控件 | ✅ 已发布 |

---

## 致谢

Standard 模式的压缩规则受 **[JuliusBrussee](https://github.com/JuliusBrussee)**（⭐ 51K+）开发的 **[Caveman](https://github.com/JuliusBrussee/caveman)** 启发——这是爆火的“能用更少令牌解决问题，为何要用更多令牌”项目。Caveman 报告称，其输出令牌减少约 `~75%`，基准测试平均输出节省 `65%`，输出节省范围为 `22-87%`，输入压缩工具的压缩率约为 `~46%`。

RTK 模式受 **[RTK AI](https://github.com/rtk-ai)** 开发的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** 启发——这是一个面向终端、构建、测试、git 和工具输出过滤的高性能命令输出压缩项目。RTK 报告称可节省 `60-90%`，其 README 示例会话显示节省了约 `~80%`。

---

## 先进的压缩系统

除了上述 7 种模式（源代码还接受`codex-responses`和`omniglyph`模式，本指南未涵盖）之外，以下部分介绍了在这些模式内部或与这些模式一起工作的功能：工具结果压缩和渐进老化是积极引擎的步骤 1 和 2（积极模式和堆栈管道的`aggressive`步骤），堆栈管道是堆栈模式的运行方式，缓存感知压缩将`aggressive`和`ultra`降级为`standard`压缩打开时缓存提供程序，Caveman 输出模式和输出样式是选择加入的系统提示指令，默认情况下关闭，它们塑造模型的输出而不是压缩请求。

### 缓存感知压缩

一些提供者（例如带有提示缓存的Anthropic ）支持**提示缓存**，这让他们可以缓存部分提示，以降低成本和延迟。当启用缓存时，积极的压缩实际上可以**伤害**性能，因为它更改了缓存的令牌，使缓存无效。

`cachingAware.ts`模块通过以下方式解决了这个问题**检测缓存上下文**和**调整压缩策略**因此。

#### 它是如何运作的

1. **检测缓存上下文**—扫描请求正文中的`cache_control`标记
2. **识别缓存提供者**—检查目标提供者是否支持缓存
3. **调整策略**—将缓存提供程序`aggressive`/`ultra`降级为`standard`
4. **跳过系统提示**—系统提示通常会被缓存，所以不要压缩它们

策略助手还返回一个`deterministicOnly`标志，但计划构建器仅使用策略—下游今天不会读取该标志。

#### 代码示例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 何时使用

缓存感知压缩是**始终开启**—无需配置。只要压缩打开并且目标提供程序支持提示缓存（Anthropic、 OpenAI等），它就会启动；不需要显式的`cache_control`标记—缓存提供程序单独触发降级，而单独的标记永远不会触发降级（标记检测提供缓存遥测，而不是策略决策）。

OpenRouter仅算作`anthropic/*`模型的缓存提供程序： Claude代码请求保留其`cache_control`断点（最多 4 个），并且防护措施保护前缀，而其他所有OpenRouter系列（`openai/`、 `google/`、 `qwen/`等）保持剥离且不受防护。

### 渐进式老化

长时间的对话会积累许多消息轮次，但较旧的轮次变得不那么相关。 `progressiveAging.ts`模块**根据转弯距离降低消息质量**（从对话结束开始测量的距离）。使用附带的默认值（`verbatim: 2, light: 2, moderate: 3`）：

- **最后 2 回合（距离≤ 2）** : 逐字保留
- **距离3** ：穴居人压缩（填充物去除）
- **距离 4 +** ：助理消息汇总；用户消息减少到第一行，上限为 120 个字符；其他角色不变。无论距离如何，系统提示、已过期的消息和最新的用户消息始终逐字保留。没有任何内容被彻底删除，并且`light`带无法通过附带的默认值（`light`等于`verbatim`）访问。

#### 代码示例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### 何时使用

渐进式衰老是**始终开启**对于`aggressive`模式—它是`compressAggressive()`的步骤 2。超级模式不运行它。它对于以下方面特别有效：

- 长时间运行的编码会话
- 多日对话
- 具有许多工具调用的代理工作流程

### 穴居人输出模式

穴居人输出模式增加**系统提示说明**要求模型本身提供简洁的输出— `lite`级别要求保持完整句子的简洁答案， `full`要求它“像聪明的穴居人一样回答简洁”， `ultra`要求电报输出；说明只是询问，他们不能保证。请求通过`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) 接收它们： `open-sse/handlers/chatCore.ts`首先使用 back-compat shim ( `open-sse/services/compression/outputStyles/backCompat.ts`中的`resolveOutputStyleSelection()` ) 解析选择，当`outputStyles`为空时，它将启用的`cavemanOutputMode`映射到`cavemanOutputMode.intensity`处的`terse-prose`输出样式（请参阅下面的 Back-compat ）；非空`outputStyles`选择按原样使用，然后`cavemanOutputMode.enabled`和`intensity`无效，而其`autoClarity`切换仍然适用。 `outputMode.ts`保存指令文本（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、内容旁路和注入使用的放置助手；它自己的`applyCavemanOutputMode()`注入器没有生产调用者。

#### 它是如何运作的

该模式不压缩输入。它将指令块添加到系统提示符中（请参阅下面的注入如何工作），并且为请求选择的任何输入压缩模式仍然会在现在携带该块的主体上运行。在每个级别结束的共享边界子句之前，英语`full`级别如下：

> “像聪明的穴居人一样简洁地回答。删除文章（a/an/the）、填充物（just/really/basically/actually/simply）、寒暄、对冲。片段OK。简短的同义词（大而不广泛，修复而不实施）。保持所有技术实质、代码、错误、 URLs、标识符准确。”

这尤其适用于：

- 代码生成（terser 输出=更少的标记）
- 快速问答（无需详细解释）
- 批处理（最大化吞吐量）

#### 何时使用

Caveman输出模式是**选择加入**。打开压缩（`enabled: true`，压缩设置页面上的主开关），使用`cavemanOutputMode.enabled`将其打开； `intensity`选择`lite`、 `full`或`ultra`：

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

压缩组合**输出方式**切换（`outputMode`， `outputModeIntensity`中的级别）为组合适用的请求设置相同的开关，并且`omniroute_set_compression_engine` MCP工具通过其布尔`outputMode`参数写入它。非空`outputStyles`选择优先于此开关。在仪表板中，启用**简洁的散文**输出样式注入相同的块（请参阅下面的输出样式）。

### 输出样式（目录）

上面的Caveman输出模式是**遗留单一样式路径**。第 4 阶段将其概括为可组合输出样式的目录： `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`。每种风格都是系统提示指令，要求模型本身提供更便宜的输出；样式可以一起启用并按目录顺序注入。

| 风格                         | `id`            | 它的作用                                                                                                                                                                   | 教学语言                                      |
| ---------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 简洁的散文                   | `terse-prose`   | 删除filler/articles/hedging；保持技术实质准确。与传统穴居人输出模式相同的文本（引用，未重新输入）。                                                                        | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| 更少的代码                   | `less-code`     | YAGNI阶梯：最小的工作变化，没有未请求的抽象。                                                                                                                              | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| 马尾辫（懒惰的高级开发人员） | `ponytail`      | “最好的代码是从未编写过的代码”：重用>重写、根本原因>症状、最短工作差异。                                                                                                   | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| 我有ADHD （行动优先）        | `i-have-adhd`   | 先行动（command/path/snippet在散文之前），编号有界步骤， ONE具体下一步，无preamble/recap/closers.改编自[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT)。 | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| UI防滑过滤器                 | `antislop-ui`   | 每一种视觉技术都必须通过目的测试（层次结构、同一性、可读性）；没有默认的gradients/glass/glow、上限调色板、没有模板布局。两种防倾斜样式都添加了无死点控制/无制造声明边界。  | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| 防倾斜复制和人工过滤         | `antislop-copy` | 具体的文案（无破折号、通用CTAs、流行语、聊天机器人终结者、发明的事实）加上人员规则： WCAG AA对比度、可见焦点、键盘范围、 empty/loading/error状态、移动回流。               | en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi |
| 简洁的CJK （文言）           | `terse-cjk`     | `full`/`ultra`用文言回答； `lite`只要求简短的回答，不带虚词、寒暄或修饰。                                                                                                  | zh（区域设置门控，见下文）                    |

每种样式都提供三个强度级别— `lite`、 `full`、 `ultra` — ，每个级别都以共享边界子句（`SHARED_BOUNDARIES` in `outputMode.ts`）结尾，这使代码块、文件路径、命令、错误和URLs保持精确。 `terse-prose`和`terse-cjk`级别文本将标识符添加到该列表中。

`terse-cjk`在两个地方被区域设置连接到`zh` 。仅当仪表板UI语言为中文（`zh-CN`或`zh-TW`）时，“压缩设置”页面才会列出其行，并且仅当请求解析的语言（请参阅下面的语言选择）为`zh`时， `applyOutputStyles()`才会注入它。隐藏该行不会清除已保存的`terse-cjk`选择：设置API接受任何样式 ID，并且在页面上保存其他样式会保留它。在请求时， `applyOutputStyles()`语言检查是唯一的区域设置门。

#### 注射的工作原理

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) 根据目录解析选择（未知 id 和区域设置不匹配的样式将被删除，绝不会出现错误；解析为无样式的选择不会使正文保持不变，作为`no_styles`跳过），按目录顺序连接所选指令，附加边界子句**一次**（加上安全子句`SAFETY_BOUNDARIES`或其翻译，当选择`less-code`或`ponytail`时），并使用单个幂等性标记（`[OmniRoute Output Styles]`）启动块，因此重新应用是无操作的。当解析的语言（请参阅下面的语言选择）有翻译时，将注入本地化指令而不是英语。

在具有非空`messages`数组的正文上，幂等性检查在内容旁路之前运行：当`[OmniRoute Output Styles]`标记已位于顶级`system`字段（字符串或内容块数组）中或包含字符串内容的系统消息中时，正文将保持不变，如`already_applied`并且不运行关键字检查。否则，内容旁路（ `open-sse/services/compression/outputMode.ts`中的`shouldBypassCavemanOutputMode()` ）会检查最后三个消息的文本，无论它们的作用是什么，并在该文本与其安全性、不可逆操作或澄清关键字或顺序敏感序列匹配时跳过整个回合的样式： `first`、 `then`、 `after that`、 `before`、 `rollback`或`backup`后跟`delete`、 `drop`、 `migrate`、 `deploy`或`release`的 240 个字符内。旁路运行时**自动清晰度绕过**切换（`cavemanOutputMode.autoClarity`，默认情况下打开）打开；关闭该开关会跳过关键字检查。

当旁路允许转弯时， `placeSystemInstruction()` （同一文件）永远不会创建新的`messages[0]`，将该块放置在它找到的第一个块中：

1. 带有字符串内容的前导系统消息：该块附加在其文本之后。
2. 顶级`system`字段：该块附加在字符串文本之后，或作为新文本块添加到内容块数组中。
3. 第一条带有字符串内容的后续系统消息：该块附加在其文本之后。
4. 以上都不是：该块在`messages`末尾进入新的系统消息。

在没有`messages`数组（或空数组）的主体上，不会运行任何内容旁路，并且不会参考顶级`system`字段。该块将附加在字符串`instructions`字段的文本之后，除非该字段已包含`[OmniRoute Output Styles]`标记，在这种情况下，正文将保持不变，如`already_applied`。当主体没有字符串`instructions`字段但包含`input` （字符串或数组）时，该块将变为`instructions`，替换该字段保存的任何非字符串值。既没有字符串`instructions`字段也没有字符串或数组`input`的主体保持不变并作为`no_messages`跳过。

#### 如何启用

在仪表板中：**压缩上下文→压缩设置**(`/dashboard/context/settings`)，输出样式部分：每个样式一行，带有on/off切换器和级别选择器。样式在压缩本身打开时注入（页面的主切换， `enabled`）。这**自动清晰度绕过**切换开关位于**穴居人**页面 (`/dashboard/context/caveman`)，在其**输出方式**卡片。以编程方式，压缩配置将选择保留为：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向后兼容：当`outputStyles`为空时，旧的`cavemanOutputMode.enabled`设置映射到`cavemanOutputMode.intensity`处的`terse-prose` 。然后该块以`[OmniRoute Output Styles]`标记开始，旧的`applyCavemanOutputMode()`注入器在其中写入`[OmniRoute Caveman Output Mode]`。在标记下方，文本与 en、pt-BR、es、de、fr、it、ru、id 和 vi 中的遗留注入相匹配；在 ja 和 zh 中，它在边界子句之前带有一个额外的空格。 `terse-prose`翻译为 pt-BR、es、de、fr、it、ru、zh、ja、id 和 vi，因此解析语言为`hu`的请求将获取旧注入器使用匈牙利语文本的英语文本。

输出样式语言选择（`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`）：启用`languageConfig.enabled`时， `autoDetect`对请求的`messages`数组中包含文本（字符串内容或其内容部分的`text` ）的最新用户消息进行采样，并在其上运行 Caveman 引擎的检测器 (`detectCompressionLanguage()`)。对于包含汉字且不含假名的文本，检测器返回`zh` ；否则，它将返回`it`、 `pt-BR`、 `es`、 `de`、 `fr`、 `ru`、 `ja`、 `hu`和`id`中具有最多提示匹配的一个，而`en`当没有匹配的—文本时，它无法分类得到英语，从不`defaultLanguage`，并且`vi`永远不会被检测到，尽管样式附带`vi`文本。响应API主体保持在`input`中，它没有被采样，所以它得到`defaultLanguage`，然后是英语。当`messages`中没有用户消息包含文本或`autoDetect`关闭时，先应用`defaultLanguage` ，然后应用英语。 `languageConfig.enabled`关闭时，语言为英语—除非压缩组合应用于请求（分配给请求的路由组合的组合，或默认压缩组合chatCore回退到内置堆叠管道）：应用组合将为该请求打开`languageConfig.enabled`并从组合的语言包设置`defaultLanguage` （如果它是组合的包之一，则保存的值，否则组合的第一个包，默认为`en`），而保存的`autoDetect` （默认情况下打开）仍然适用。 Caveman 输入引擎为每个文本部分选择不同的规则包语言— ，并且在自动检测关闭的情况下，在`enabledPacks`上进行门控。

样式×语言矩阵由`tests/unit/compression/output-styles-i18n-matrix.test.ts`固定：每个目录样式都需要测试的`BASELINE_LANGUAGES`中的一个条目；非语言环境门控的样式必须提供 pt-BR 翻译（语言环境门控`terse-cjk`不受此规则约束），除非它列在`KNOWN_ENGLISH_ONLY`中，它可能只包含根本没有翻译的样式—列出的具有任何翻译的样式无法通过测试；当样式丢失其`BASELINE_LANGUAGES`条目列出的语言时，该样式将无法通过测试。要添加样式，请参阅[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) 。

### 工具结果压缩

`open-sse/services/compression/toolResultCompressor.ts`中的`compressToolResult()`压缩工具结果文本**5个策略**。它按此顺序尝试它们，并且检查与内容匹配的第一个启用的策略决定结果：

1. **`fileContent`** ：3 行或更多行的内容，其中至少一行（忽略前导缩进）以`import `、 `export `、 `function `、 `class `、 `const `、 `let `、 `var `或`return ` （关键字加一个空格）开头，或者以`if`、 `for`或`while`后跟`(`或` (`开头，保留前 20 行和后 5 行，并标记省略的中间。
2. **`grepSearch`** ：至少有一行`<path>:<digits>:`形式的内容，其中第一个冒号之前的文本没有空格，仅保留这些行，最多 30 行，后跟任何进一步匹配的计数和匹配文件的列表；其他所有行都会被删除。这样的一行足以触发该策略，因此以`12:30:45`等时间戳开头的日志行也算在内。
3. **`shellOutput`** ：包含ANSI CSI序列（`ESC[`然后数字或分号然后字母，如颜色代码）或`$`后跟文本中任何位置的空格的输出将丢失这些序列（保留其他转义符，例如`ESC[?25l`或OSC窗口标题序列）并保留最后 50 行，连续重复的行折叠。因为此检查在`json`和`errorMessage`之前运行，所以当`shellOutput`打开时，包含此类`$`的JSON或错误输出永远不会到达它们。
4. **`json`** ：以`{`或`[`开头（可选空格之后）并解析的超过 2,000 个字符的JSON负载被总结为：超过 7 个项目的数组保留其前 5 个和最后 2 个项目及其总数，对象保留其前 20 个键，每个嵌套对象或数组值替换为`{…N keys}`占位符（对于数组，N 是其长度）和`_remaining_<N>_keys`标记，对超过前 20 个的键进行计数。值被整个复制，因此 20 个或更少的键且没有嵌套值的对象只会重新缩进—一个缩小的对象会获得字符并保持不变。
5. **`errorMessage`** ：在任何位置和任何字母大小写下包含`error:`、 `error ` （后跟一个空格的单词，如`no error found`）、 `[error]`、 `exception:`、 `exception `、 `[exception]`或`traceback`的输出保留其第一行、接下来的 10 行和最后 3 行，并用`… [N frames elided] …`标记代替它们之间的行。仅当第一行后面有超过 13 行时，标记才会出现，因此 14 行或更少的错误输出不会缩短（在 12 或 13 行时，最后 3 行重复行已经保留）。

一个策略匹配后，即使是没有保存任何内容的策略，后面的策略也不会被尝试。当匹配策略未保存估计标记（长度÷ 4，向上舍入） — ，例如 25 行或更少的类似代码的文件，或者包含 7 个或更少—超过 2,000 个字符的JSON数组，激进引擎将保留原始工具结果：当`saved`为 0 或更低时，调用者（`compressAggressive()`和`compressAnthropicToolResultBlock()`）都保留原始结果，而`compressToolResult()`本身仍然返回该策略的输出。工具结果步骤并不是最终结论：引擎的后备摘要器仍然可以缩短长度超过 8,192 个字符的`tool`或`function`消息（`maxTokensPerMessage`， 2,048，乘以 4）。

#### 何时使用

工具结果压缩是积极引擎（`compressAggressive()` in `open-sse/services/compression/aggressive.ts`）的第一步，因此它在积极模式和堆叠管道的`aggressive`步骤中运行。它压缩 OpenAI 形状的`tool`和`function`消息以及Anthropic `tool_result`块内的文本。每个策略在`aggressive.toolStrategies`下都有自己的开关，默认情况下全部打开。在仪表板中，开关位于 Caveman 页面的**先进的**压缩打开时的视图，默认模式为“积极”。

### 堆叠式管道

堆叠模式运行**多个引擎按顺序排列**—通常先RTK （工具输出节省 60-90%），然后 Caveman 处理剩余文本（~节省 46% 输入）。组成的，就是**78-95% 合格范围**（参见上面的上游储蓄数学）： `1 - (1 - 0.60..0.90) × (1 - 0.46)`平均≈ 89%。

#### 它是如何运作的

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### 何时使用

使用堆叠模式用于：

- 工具密集型工作流程（代理编码、研究）
- 成本敏感的批处理
- 当您需要最大限度节省代币时

堆叠管道是通过全局`stackedPipeline`压缩设置或通过分配给路由组合的命名压缩组合（请参阅上面的每个组合覆盖） —进行配置，而不是通过自动组合`modePack` （该字段仅重新权重自动组合模型选择，并且`stacked`不是有效的包名称）。

---

## 压缩组合覆盖

你可以**针对每个组合**覆盖全局压缩模式，以便针对不同的使用场景微调行为：

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

这适用于：

- **编码组合**：在长时间会话中使用 `aggressive` 模式
- **快速问答组合**：使用 `lite` 模式以获得快速响应
- **工具密集型组合**：使用 `stacked` 模式以最大限度地节省用量
- **生产环境组合**：对于缓存提供者，请关闭覆盖选项——始终启用的缓存感知调整会自动将 `aggressive`/`ultra` 降级为 `standard`（没有可选择的 `cache-aware` 模式）

---

## 另请参阅

- [环境配置](../reference/ENVIRONMENT.md) — 压缩环境变量
- [架构指南](../architecture/ARCHITECTURE.md) — 压缩管道内部机制
- [用户指南](../guides/USER_GUIDE.md) — 压缩入门
- [RTK 压缩](./RTK_COMPRESSION.md) — RTK 过滤器、信任模型、验证门控、原始输出恢复
- [压缩引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、stacked、API、MCP、仪表板
- [压缩规则格式](./COMPRESSION_RULES_FORMAT.md) — JSON 规则包格式
- [压缩语言包](./COMPRESSION_LANGUAGE_PACKS.md) — 特定语言的 Caveman 规则
