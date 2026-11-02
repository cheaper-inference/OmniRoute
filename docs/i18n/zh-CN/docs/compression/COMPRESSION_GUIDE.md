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

不应用任何压缩。所有消息原样通过。

### Lite 模式（节省约 15%，延迟 <1ms）

最安全的模式——零语义变更，仅进行格式清理：

| 技术                     | 描述                      |
| ------------------------ | ------------------------- |
| `collapseWhitespace`     | 合并连续空行和行尾空格    |
| `dedupSystemPrompt`      | 移除重复的系统消息        |
| `compressToolResults`    | 压缩冗长的工具/函数输出   |
| `removeRedundantContent` | 删除重复的指令            |
| `replaceImageUrls`       | 缩短 base64 图片 data URI |

**适用场景：** 常驻启用、对安全性要求极高的工作流。

### 标准模式（节省约 30%）

灵感来自 [Caveman](https://github.com/JuliusBrussee/caveman)——在保留语义的前提下移除填充词和冗长措辞：

- 移除填充词（如 "please"、"I think"、"basically"、"actually"）
- 精简冗长短语（"in order to" → "to"，"as a result of" → "because"）
- 删除礼貌性的弱化措辞（如 "Would you mind..."、"If you could possibly..."）
- 30+ 条针对编码提示调优的正则规则

**适用场景：** 日常编码工作流、注重成本的团队。

### 激进模式（节省约 50%）

面向长会话的智能历史管理：

- **消息老化（Message Aging）**——较早的消息会被逐步压缩
- **工具结果压缩**——过长的工具输出会被截断或省略（保留首/尾行、
  匹配行过滤、JSON 键压缩）
- **结构完整性保护**——确保 `tool_use` 与 `tool_result` 成对保持一致
- **上下文窗口感知**——遵守各模型的 token 上限

**适用场景：** 长时间的调试会话、大型代码库。

### 极限模式（节省约 75%）

面向 token 紧张场景的最大化压缩：

- **启发式剪枝**——基于评分对叙述性文本进行 token 剪枝
- **结构保留**——围栏代码块、行内代码、URL 和标识符会被打上墓碑标记
  （tombstone）并按原样重新拼接，绝不会被剪枝
- **可选 SLM 层**——配置后可由小型本地模型优化剪枝效果
- 独立于激进模式：不运行消息老化、工具结果压缩或回退摘要器
  （仅当 SLM 层失败时，回退处理才可能经由激进模式执行）

**适用场景：** 当你反复触及上下文上限时。

### RTK 模式（上游区间 60-90%）

RTK 模式针对编码代理会话中常见的冗长工具输出进行了优化：

- 可检测多种命令/输出类别，例如 `git status`、`git diff`、`git log`、测试运行器、
  TypeScript/Vite/Webpack 构建、ESLint/Biome/Prettier、npm audit/install、Docker 日志、
  基础设施输出以及通用 shell 输出
- 应用来自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 过滤器包
- 从项目级或全局 `filters.toml` 文件导入 RTK TOML schema v1 过滤器，
  支持内联测试验证，并对项目文件实施信任门控
- 内置 56 个过滤器，均附带内联验证示例
- 移除 ANSI 控制序列、进度条、重复行以及无操作价值的噪音
- 保留失败、错误、警告、变更文件、摘要以及长输出的尾部
- 支持信任门控的项目过滤器、全局过滤器，以及可选的脱敏原始输出恢复

**适用场景：** 包含 shell、构建、测试、git、grep 及文件输出记录的代理会话。

### 堆叠模式（符合条件部分可达 78-95%）

堆叠模式按确定性顺序运行多个压缩引擎。默认流水线为：

```txt
RTK -> Caveman
```

该顺序先压缩终端/工具输出，再对剩余的自然语言提示应用 Caveman 语义精简。
堆叠流水线可以全局配置，也可以通过分配给路由组合（routing combos）的压缩组合
（compression combos）来配置。

**适用场景：** 混合上下文——既有大量工具日志，又有人工指令或助手摘要。

---

## 上游节省量计算

OmniRoute 记录了来自两个来源的压缩节省量：上游项目基准测试和 OmniRoute 自身的引擎组合。

| 来源    | 此处使用的上游 README 数据                                                                         |
| ------- | -------------------------------------------------------------------------------------------------- |
| Caveman | 输出 token 减少 `~75%`，基准测试平均输出节省 `65%`，范围为 `22-87%`，输入压缩工具的压缩率为 `~46%` |
| RTK     | 命令输出节省 `60-90%`；示例会话从 `~118,000` 个 token 降至 `~23,900` 个，节省 `79.7%`（`~80%`）    |

对于重叠的工具/上下文负载，OmniRoute 默认组合会依次叠加使用这些引擎：

```txt
RTK -> Caveman
```

组合节省量按乘法计算，而非加法：

```txt
组合节省量 = 1 - (1 - RTK 节省量) * (1 - Caveman 输入节省量)
平均值     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
范围       = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

当 RTK 和 Caveman 都能压缩同一输入/上下文负载时，`78-95%` 这一数据才适用。Caveman 的响应输出模式是独立的：启用后，应采用 Caveman 自身的输出节省量（平均 `65%`、标称 `~75%`、范围 `22-87%`）。总计费节省量取决于提示词与输出的占比。

### “符合条件”的实际含义

标称的 15-95% 范围是真实的，但它仅适用于**冗余或啰嗦的**内容——例如重复的错误行、反复刷出相同警告的构建日志，或过大的 `grep`/文件读取转储。这**并不**意味着每个请求都能节省这么多。

实证验证（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：对一个包含 300 行相同错误信息、采用 Anthropic 格式的 `tool_result` 块执行 `stacked`（RTK + Caveman）处理后，取得了 **95.93% 的 token 节省率 / 96.26% 的字符节省率**——完全落在宣传的范围内。但对正常、非冗余的工具输出（整洁的 `grep` 匹配列表、简短的文件读取结果、普通对话文本）运行同一管线时，节省量几乎为零，这是正确的结果，因为其中没有可移除的重复内容，而且 `validateCompression()`（`validation.ts`）会拒绝输出任何可能丢弃或更改代码块、URL、标题、版本号或全大写常量标识符的改写结果。

这是符合预期的安全行为，并非缺陷：即使已完全启用压缩，以读取或检索整洁文件为主的编码会话，其总体节省量也会比较有限；而遇到失败循环或输出繁杂的 linter 时，会针对相关流量达到完整的 78-95% 节省范围。不要把单个会话较低的总体节省百分比当作压缩配置错误的证据——应先检查底层工具输出实际上是否存在冗余。

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

前往 `Dashboard → Context & Cache`：

- **Caveman** — 模式选择、语言包、预览和全局默认值
- **RTK** — 命令过滤器预览、RTK 安全设置和过滤器目录
- **Compression Combos** — 分配给路由组合的命名引擎管线
- **Auto-Trigger Threshold** — 当 token 数量超过阈值时自动启用压缩

### 按组合覆盖

在 `Dashboard → Context & Cache → Compression Combos` 中，将压缩组合分配给一个路由组合：

```txt
组合: "free-tier-fallback"
  压缩组合: "coding-agent-stack"
  管线: RTK -> Caveman
  目标:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

这样，你可以在免费/编程服务提供者上使用堆叠压缩，同时在付费订阅上保持精简模式。

此“按组合覆盖”分配与**路由组合压缩模式**覆盖是不同的控制项（Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses——该字段的 schema 也接受 `rtk`、`stacked` 和 `omniglyph`）——后者不会选择命名的压缩组合管线；它只会设置由 `resolveCompressionPlan` 读取的 `compressionMode` 字段。它既可以在组合卡片（`Dashboard → Combos`）上设置，也可以从 #6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的“Assign to routing”列表中，紧邻上述管线分配复选框，针对每个路由组合进行设置。两个界面的设置都通过同一个 `PUT /api/combos/{id}` 端点持久化。

### 按请求覆盖

发送 `x-omniroute-compression` 请求标头，可针对单个请求覆盖压缩计划。它具有最高优先级——优先于路由组合覆盖、活动配置文件、自动触发和面板中的 Default。未知值将被忽略（请求绝不会因此被拒绝），并且全局主开关仍控制所有压缩功能：当全局关闭压缩时，无法通过该标头将其开启。可用值：

| 值            | 效果                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| `off`         | 不对此请求进行压缩。                                                        |
| `default`     | 使用面板派生的 Default 配置文件（忽略活动配置文件）。有损引擎保持关闭。     |
| `safe`        | 与省略该标头相同：仅执行去重和空白折叠。                                    |
| `allow-lossy` | 保留此请求的操作员计划，包括摘要、相关性过滤器和样式重写。                  |
| `engine:<id>` | 启用时使用单个引擎，例如 `engine:rtk`。这是针对该引擎的按请求选择启用方式。 |
| `<combo>`     | 命名组合：先按名称匹配（不区分大小写），再按 id 匹配。                      |

如果未指定 `allow-lossy`、`engine:<id>` 或命名组合，则不会应用有损引擎。启用压缩时，请求仍会进行会话去重和空白折叠。

所应用的计划会通过 `X-OmniRoute-Compression: <mode>; source=<source>` 响应标头返回，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 获取压缩设置
curl http://localhost:20128/api/settings/compression

# 更新压缩设置
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 预览特定的 RTK/stacked 载荷
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 过滤器包
curl http://localhost:20128/api/context/rtk/filters

# 使用可选的命令元数据直接测试 RTK
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

## 压缩统计信息

每个压缩请求都会在服务器日志中包含统计信息：

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

## 高级压缩系统

除了上述 7 种模式之外（源代码还接受 `codex-responses` 和
`omniglyph` 模式，但本指南不予介绍），以下各节涵盖可在这些模式内部或与其配合使用的功能：工具结果压缩和渐进式老化是激进引擎的第 1 步和第 2 步（即激进模式，以及堆叠管道中的 `aggressive` 步骤），堆叠管道是堆叠模式的运行方式，缓存感知压缩会在启用压缩时，针对缓存提供者将 `aggressive` 和 `ultra` 降级为 `standard`，而穴居人输出模式和输出样式则是可选的系统提示词指令，默认关闭；它们用于塑造模型的输出，而不是压缩请求。

### 缓存感知压缩

一些提供者（例如支持提示词缓存的 Anthropic）支持**提示词缓存**，
从而可以缓存提示词的部分内容，以降低成本和延迟。启用缓存后，激进压缩实际上可能会**损害**性能，
因为它会更改已缓存的 token，导致缓存失效。

`cachingAware.ts` 模块通过**检测缓存上下文**并
相应地**调整压缩策略**来解决此问题。

#### 工作原理

1. **检测缓存上下文** — 扫描请求正文中的 `cache_control` 标记
2. **识别缓存提供者** — 检查目标提供者是否支持缓存
3. **调整策略** — 针对缓存提供者将 `aggressive`/`ultra` 降级为 `standard`
4. **跳过系统提示词** — 系统提示词通常会被缓存，因此不要压缩它们

该策略辅助函数还会返回一个 `deterministicOnly` 标志，但计划构建器只使用
策略——目前下游没有任何组件读取该标志。

#### 代码示例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← 缓存标记
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用时机

缓存感知压缩**始终启用**——无需配置。当压缩已启用且目标提供者支持提示词缓存（Anthropic、OpenAI
等）时，它就会生效；不要求显式提供 `cache_control` 标记——仅缓存提供者本身就会触发降级，而仅有标记则永远不会触发降级（标记检测用于缓存遥测，而不是策略决策）。

### 渐进式老化

长对话会累积许多轮消息，但较早的轮次会变得不那么
相关。`progressiveAging.ts` 模块会**根据轮次距离对消息进行降级**
（距离从对话末尾开始计算）。使用随附的默认值
（`verbatim: 2, light: 2, moderate: 3`）时：

- **最后 2 轮（距离 ≤ 2）**：逐字保留
- **距离 3**：穴居人压缩（移除冗余内容）
- **距离 4+**：对助手消息进行摘要；将用户消息缩减为第一行，
  最多保留 120 个字符；其他角色保持不变。无论距离如何，系统提示词、已经老化的消息以及最新的用户消息始终会逐字保留。
  不会直接丢弃任何内容，并且使用随附的默认值时，`light`
  区间不可达（`light` 等于 `verbatim`）。

#### 代码示例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 再增加 50 轮 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 最后 3 轮：逐字保留
  light: 8, // 距离 <= 8：轻量压缩
  moderate: 20, // 距离 <= 20：穴居人压缩
  fullSummary: 5, // 类型要求提供，但分区代码不会读取
  // 距离 > 20：摘要（助手）/ 保留第一行（用户）
});

// saved = 节省的 token 数量
```

#### 使用时机

对于 `aggressive` 模式，渐进式老化**始终启用**——它是
`compressAggressive()` 的第 2 步。Ultra 模式不会运行它。它尤其适用于：

- 长时间运行的编码会话
- 跨越多天的对话
- 包含大量工具调用的智能体工作流

### 穴居人输出模式

穴居人输出模式会添加**系统提示词指令**，要求模型自身生成
简短输出——`lite` 级别要求使用保留完整句子的简洁回答，`full`
要求它“像聪明的穴居人一样简短回应”，而 `ultra` 要求生成电报式输出；
这些指令只是提出要求，无法保证模型一定遵循。请求通过
`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）接收这些指令：
`open-sse/handlers/chatCore.ts` 首先使用向后兼容垫片解析选择
（`open-sse/services/compression/outputStyles/backCompat.ts` 中的
`resolveOutputStyleSelection()`）；当 `outputStyles`
为空时，该垫片会将已启用的 `cavemanOutputMode` 映射为
`cavemanOutputMode.intensity` 强度下的 `terse-prose` 输出样式
（参见下文的向后兼容）；非空的 `outputStyles`
选择会原样使用，此时 `cavemanOutputMode.enabled` 和 `intensity` 不再产生任何
影响，但其 `autoClarity` 开关仍会生效。`outputMode.ts` 包含
指令文本（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、内容绕过逻辑以及注入所使用的
放置辅助函数；其自身的 `applyCavemanOutputMode()` 注入器在生产环境中没有
调用方。

#### 工作原理

此模式不会压缩输入。它会向系统提示词添加一个指令块
（请参阅下文的“注入方式”），而且为请求选择的任何输入压缩模式
仍会随后对现已包含该指令块的正文运行。在每个级别结尾共有的
边界条款之前，英文 `full` 级别内容如下：

> “像聪明的穴居人一样简短回答。省略冠词（a/an/the）、填充词（just/really/basically/actually/simply）、客套话和模棱两可的措辞。可以使用句子片段。使用简短的同义词（用 big，不用 extensive；用 fix，不用 implement）。所有技术内容、代码、错误、URL 和标识符必须保持原样。”

此模式尤其适合：

- 代码生成（输出更简短 = token 更少）
- 快速问答（无需详尽解释）
- 批处理（最大化吞吐量）

#### 何时使用

穴居人输出模式是**选择启用**的。开启压缩（`enabled: true`，即“压缩设置”页面上的总开关）
后，可通过 `cavemanOutputMode.enabled` 将其开启；`intensity`
可选择 `lite`、`full` 或 `ultra`：

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

压缩组合的 **Output Mode** 开关（`outputMode`，级别位于 `outputModeIntensity`）
会为该组合所应用的请求设置同一开关，而
`omniroute_set_compression_engine` MCP 工具会通过其布尔参数 `outputMode`
写入该设置。非空的 `outputStyles` 选择优先于此开关。在
仪表板中，启用 **Terse prose** 输出样式会注入相同的指令块（请参阅下文的“输出
样式”）。

### 输出样式（目录）

上述穴居人输出模式是**旧版单样式路径**。第 4 阶段将其扩展为
可组合的输出样式目录：`open-sse/services/compression/outputStyles/catalog.ts` 中的
`OUTPUT_STYLE_CATALOG`。每种样式都是一条系统提示词指令，要求模型自身生成成本更低的输出；样式可以
同时启用，并按目录顺序注入。

| 样式                       | `id`            | 作用                                                                                                                                                                                        | 指令语言                                      |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 简洁文风                   | `terse-prose`   | 省略填充词、冠词和模棱两可的措辞；保持技术内容准确。与旧版穴居人输出模式的文本相同（引用而非重新输入）。                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 更少代码                   | `less-code`     | YAGNI 阶梯：采用能运行的最小改动，不添加未要求的抽象。                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 马尾辫（懒惰的高级开发者） | `ponytail`      | “最好的代码是从未写下的代码”：复用 > 重写，根因 > 症状，使用最短且能运行的差异。                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 我有 ADHD（行动优先）      | `i-have-adhd`   | 行动优先（先给命令/路径/代码片段，再给说明），步骤编号且数量有限，只给一个具体的后续步骤，不写前言/回顾/结束语。改编自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 反低质 UI 过滤器           | `antislop-ui`   | 每种视觉技巧都必须通过目的测试（层次、辨识度、可读性）；不默认使用渐变/玻璃效果/光晕，限制配色，不使用模板化布局。两种反低质样式都会添加禁止无效控件/禁止捏造声明的边界。                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 反低质文案与人性化过滤器   | `antislop-copy` | 使用具体文案（不使用破折号、通用 CTA、流行语、聊天机器人式结束语或虚构事实），并遵循面向用户的规则：WCAG AA 对比度、可见焦点、键盘可访问、空白/加载/错误状态以及移动端重排。                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 简洁 CJK（文言）           | `terse-cjk`     | `full`/`ultra` 使用文言文回答；`lite` 仅要求简短回答，不使用虚词、客套话或修饰。                                                                                                            | zh（受区域设置限制，见下文）                  |

每种样式均提供三个强度级别——`lite`、`full`、`ultra`——且每个级别
均以共有的边界条款结尾（`outputMode.ts` 中的 `SHARED_BOUNDARIES`），该条款会
确保代码块、文件路径、命令、错误和 URL 保持原样。`terse-prose` 和
`terse-cjk` 的级别文本还会将标识符加入该列表。

`terse-cjk` 在两个位置受 `zh` 区域设置限制。仅当仪表板 UI 语言为中文（`zh-CN` 或 `zh-TW`）时，
“压缩设置”页面才会列出其所在行，而
`applyOutputStyles()` 仅在请求解析后的语言（请参阅下文的“语言
选择”）为 `zh` 时才会注入该样式。隐藏该行不会清除已保存的 `terse-cjk` 选择：
设置 API 接受任何样式 id，而且在页面上保存其他样式时会保留它。在
请求处理期间，`applyOutputStyles()` 的语言检查是唯一的区域设置门控。

#### 注入方式

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) 会根据目录解析所选样式（未知 id 和区域设置不匹配的样式会被丢弃，且绝不会导致错误；如果所选内容解析后没有任何样式，则正文保持不变，并以 `no_styles` 为原因跳过），按照目录顺序拼接所选指令，追加**一次**边界条款（当选择 `less-code` 或 `ponytail` 时，还会追加安全条款 `SAFETY_BOUNDARIES` 或其译文），并以单个幂等性标记 (`[OmniRoute Output Styles]`) 开始该区块，因此重复应用不会执行任何操作。如果解析出的语言（参见下文的语言选择）存在译文，则会注入本地化指令而非英文指令。

对于具有非空 `messages` 数组的正文，幂等性检查会先于内容绕过检查运行：当顶层 `system` 字段（字符串或内容块数组）中，或内容为字符串的系统消息中，已经存在 `[OmniRoute Output Styles]` 标记时，正文将保持不变，并标记为 `already_applied`，且不会运行关键词检查。否则，内容绕过（`open-sse/services/compression/outputMode.ts` 中的 `shouldBypassCavemanOutputMode()`）会检查最后三条消息的文本，无论其角色为何；当该文本匹配安全、不可逆操作或澄清类关键词，或者匹配以下顺序敏感的序列时，会在整个轮次中跳过这些样式：`first`、`then`、`after that`、`before`、`rollback` 或 `backup`，后面 240 个字符以内出现 `delete`、`drop`、`migrate`、`deploy` 或 `release`。只要 **Auto-Clarity Bypass** 开关（`cavemanOutputMode.autoClarity`，默认开启）处于开启状态，就会运行绕过检查；关闭该开关则会跳过关键词检查。

当绕过检查允许处理该轮次时，`placeSystemInstruction()`（同一文件中）会将区块放入它找到的以下第一个位置，并且绝不会新建 `messages[0]`：

1. 位于开头且内容为字符串的系统消息：将区块追加到其文本之后。
2. 顶层 `system` 字段：如果是字符串，则将区块追加到文本之后；如果是内容块数组，则添加一个新的文本块。
3. 后续第一条内容为字符串的系统消息：将区块追加到其文本之后。
4. 以上均不存在：将区块放入新增的系统消息中，并把该消息添加到 `messages` 末尾。

对于没有 `messages` 数组（或该数组为空）的正文，不会运行内容绕过检查，也不会读取顶层 `system` 字段。区块会追加到字符串 `instructions` 字段的文本之后；但如果该字段已包含 `[OmniRoute Output Styles]` 标记，则正文保持不变，并标记为 `already_applied`。当正文没有字符串 `instructions` 字段，但包含 `input`（字符串或数组）时，该区块会成为 `instructions` 的值，并替换该字段原有的任何非字符串值。如果正文既没有字符串 `instructions` 字段，也没有字符串或数组形式的 `input`，则正文保持不变，并以 `no_messages` 为原因跳过。

#### 如何启用

在仪表板中：**压缩上下文 → 压缩设置**
(`/dashboard/context/settings`) 的“输出样式”部分：每种样式占一行，包含一个开关和一个级别选择器。只要压缩功能本身处于开启状态（即页面的总开关 `enabled`），样式就会被注入。**Auto-Clarity Bypass** 开关位于 **Caveman** 页面 (`/dashboard/context/caveman`) 的 **Output Mode** 卡片中。通过编程方式配置时，压缩配置会按以下形式持久化所选内容：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向后兼容：当 `outputStyles` 为空时，旧版 `cavemanOutputMode.enabled` 设置会映射到 `cavemanOutputMode.intensity` 级别的 `terse-prose`。此时区块会以 `[OmniRoute Output Styles]` 标记开头，而旧版 `applyCavemanOutputMode()` 注入器使用的是 `[OmniRoute Caveman Output Mode]`。在该标记下方，en、pt-BR、es、de、fr、it、ru、id 和 vi 的文本与旧版注入内容一致；ja 和 zh 的文本则会在边界条款前多出一个空格。`terse-prose` 提供 pt-BR、es、de、fr、it、ru、zh、ja、id 和 vi 的翻译，因此解析语言为 `hu` 的请求会获得英文文本，而旧版注入器会使用其匈牙利语文本。

输出样式语言选择（`outputStyles/apply.ts` 中的 `resolveOutputStyleLanguage()`）：当 `languageConfig.enabled` 开启时，`autoDetect` 会从请求的 `messages` 数组中选取最新一条包含文本的用户消息（字符串内容，或其内容部分中的 `text`），并对其运行 Caveman 引擎的检测器 (`detectCompressionLanguage()`)。对于包含汉字但不含假名的文本，检测器返回 `zh`；否则，它会在 `it`、`pt-BR`、`es`、`de`、`fr`、`ru`、`ja`、`hu` 和 `id` 中返回提示匹配数最多的语言；如果没有任何匹配，则返回 `en`——无法分类的文本会使用英语，绝不会使用 `defaultLanguage`，而且即使样式提供了 `vi` 文本，也永远不会检测出 `vi`。Responses API 正文将其轮次保存在 `input` 中，而该字段不会被采样，因此它会先使用 `defaultLanguage`，然后回退到英语。当 `messages` 中没有包含文本的用户消息，或者 `autoDetect` 关闭时，会先应用 `defaultLanguage`，然后回退到英语。当 `languageConfig.enabled` 关闭时，语言为英语——除非某个压缩组合适用于该请求（分配给请求路由组合的压缩组合，或 chatCore 为内置堆叠管线回退使用的默认压缩组合）：应用组合会为该请求开启 `languageConfig.enabled`，并根据组合的语言包设置 `defaultLanguage`（如果已保存的值属于该组合的语言包，则使用该值；否则使用组合的第一个语言包，而其默认值为 `en`），同时仍然应用已保存的 `autoDetect` 设置（默认开启）。Caveman 输入引擎选择其规则包语言的方式不同——它会按各个文本部分进行选择；当自动检测关闭时，还会受到 `enabledPacks` 的限制。

样式 × 语言矩阵由
`tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：目录中的每种样式都需要在测试的
`BASELINE_LANGUAGES` 中有一个条目；未受区域设置限制的样式必须提供
pt-BR 翻译（受区域设置限制的 `terse-cjk` 不受此规则约束），除非该样式被
列入 `KNOWN_ENGLISH_ONLY`，而此列表只能包含完全没有任何翻译的样式 —
如果列出的样式存在任何翻译，测试就会失败；如果某种样式缺少其
`BASELINE_LANGUAGES` 条目中列出的语言，测试也会失败。要添加样式，请参阅
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具结果压缩

`open-sse/services/compression/toolResultCompressor.ts` 中的 `compressToolResult()`
使用 **5 种策略**压缩工具结果文本。它会按以下顺序尝试这些策略，第一个已启用且检查结果与内容
匹配的策略将决定最终结果：

1. **`fileContent`**：对于包含 3 行或更多行的内容，如果其中至少一行忽略
   前导缩进后以 `import `、`export `、`function `、`class `、
   `const `、`let `、`var ` 或 `return ` 开头（关键字后跟一个空格），或者以 `if`、
   `for` 或 `while` 后跟 `(` 或 ` (` 开头，则保留开头 20 行和末尾 5 行，并
   标记中间被省略的内容。
2. **`grepSearch`**：对于至少包含一行 `<path>:<digits>:` 形式的内容，
   其中第一个冒号之前的文本不含空白字符，则仅保留这些行，最多保留 30 行，随后附上其余匹配项的数量和匹配文件列表；
   其他所有行都会被丢弃。只需有一行这样的内容即可触发该策略，因此
   以时间戳开头的日志行（例如 `12:30:45`）也会被计入。
3. **`shellOutput`**：对于包含 ANSI CSI 序列（`ESC[` 后跟数字或
   分号，再跟一个字母，如颜色代码）或文本任意位置存在后跟空白字符的 `$` 的输出，
   会移除这些序列（其他转义序列，例如 `ESC[?25l` 或
   OSC 窗口标题序列，将被保留），并保留其最后 50 行，同时折叠连续的重复行。
   由于此检查在 `json` 和 `errorMessage` 之前运行，
   包含此类 `$` 的 JSON 或错误输出在启用
   `shellOutput` 时永远不会进入这些策略。
4. **`json`**：对于长度超过 2,000 个字符、在可选空白字符之后以 `{` 或 `[` 开头且
   能够解析的 JSON 负载，会进行摘要：包含超过 7 个条目的数组会
   保留前 5 个和最后 2 个条目以及条目总数；对象会保留前 20 个
   键，并将每个嵌套对象或数组值替换为 `{…N keys}` 占位符
   （对于数组，N 为其长度），同时添加 `_remaining_<N>_keys` 标记，用于统计
   前 20 个键之后被丢弃的键数。标量值会被完整复制，因此键数不超过 20 且
   不含嵌套值的对象只会被重新缩进 — 压缩格式的对象反而会增加字符数，
   因此保持不变。
5. **`errorMessage`**：对于任意位置包含以下内容且不区分大小写的输出：`error:`、
   `error `（该词后跟一个空格，例如 `no error found`）、`[error]`、
   `exception:`、`exception `、`[exception]` 或 `traceback`，会保留其第一行、
   接下来的 10 行和最后 3 行，并使用 `… [N frames elided] …` 标记替换
   它们之间的行。仅当第一行之后超过 13 行时才会出现该标记，
   因此 14 行或更少的错误输出不会被缩短（在 12 或 13 行时，最后 3 行会重复已保留的行）。

某个策略一旦匹配，即使没有节省任何内容，也不会再尝试后续策略。
如果匹配策略未节省任何估算 token（长度 ÷ 4，向上取整）—
例如，不超过 25 行的类代码文件，或超过 2,000
个字符但条目不超过 7 个的 JSON 数组 — 激进引擎会保留原始工具
结果：两个调用方（`compressAggressive()` 和 `compressAnthropicToolResultBlock()`）
在 `saved` 为 0 或更低时都会保留原始内容，而 `compressToolResult()` 本身仍会
返回该策略的输出。工具结果步骤并非最后一道处理：引擎的后备摘要器仍可缩短
长度超过 8,192 个字符（`maxTokensPerMessage` 为 2,048，再乘以 4）的 `tool` 或 `function` 消息。

#### 使用时机

工具结果压缩是激进引擎的第 1 步（`open-sse/services/compression/aggressive.ts` 中的
`compressAggressive()`），因此它会在 Aggressive 模式和堆叠流水线的
`aggressive` 步骤中运行。它会压缩 OpenAI 结构的 `tool` 和 `function`
消息，以及 Anthropic `tool_result` 块内的文本。每种策略在
`aggressive.toolStrategies` 下都有各自的开关，默认全部启用。在控制面板中，当压缩开启且
默认模式为 Aggressive 时，这些开关位于 Caveman 页面的 **Advanced** 视图中。

### 堆叠流水线

堆叠模式会**依次运行多个引擎** — 通常先运行 RTK
（工具输出可节省 60-90%），然后对剩余文本运行 Caveman（输入可节省约 46%）。
组合后，即为 **78-95% 的适用范围**（请参阅上文的上游节省量计算）：
`1 - (1 - 0.60..0.90) × (1 - 0.46)` 平均约为 89%。

#### 工作原理

```
输入（1000 个 token）
  → RTK（命令感知过滤器）→ 200 个 token
    → Caveman（移除填充内容）→ 108 个 token
  → 输出（108 个 token，节省约 89%）
```

#### 使用时机

以下情况适合使用堆叠模式：

- 大量使用工具的工作流（智能体编程、研究）
- 成本敏感型批处理
- 需要最大限度节省 token 时

堆叠流水线通过全局 `stackedPipeline` 压缩设置进行配置，
也可以通过分配给路由组合的命名压缩组合进行配置（请参阅上文的
“按组合覆盖”）— 而不是通过自动组合的 `modePack` 进行配置（该字段仅用于
重新调整自动组合模型选择的权重，且 `stacked` 不是有效的包名称）。

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
