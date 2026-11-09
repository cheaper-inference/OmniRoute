# Guardrails (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **事实来源：** `src/lib/guardrails/`
> **最后更新：** 2026-10-17 — v3.8.52（新增[覆盖范围与限制](#coverage-and-limits)：
> 钩子所能触达的路由与响应路径、合并后的禁用请求头 (#16412)、作为强制边界的注入
> 阻断模式 (#16413)，以及在 post-call 之前哪些组件会看到响应）

护栏（Guardrails）在 OmniRoute 与上游提供者之间的边界上强制执行安全、策略与内容转换。每个护栏都可以检查（并可选地拒绝、转换或标注）请求负载（`preCall`）与上游响应（`postCall`）。

该系统采用**故障开放（fail-open）**设计：如果某个护栏在执行时抛出异常，注册表会记录该错误并继续执行下一个护栏，而不是让请求失败。阻断是一个显式决策（`block: true`），绝不会意外发生。唯一的例外是被中止的请求：当调用方的 `signal` 被中止时，抛出异常的护栏会使本次钩子运行被拒绝，而不是被跳过。

这些钩子**不会**在每条路由或每个响应上运行。在将护栏当作安全控制手段依赖之前，请先阅读[覆盖范围与限制](#coverage-and-limits)。

## 内置护栏

注册表在导入时会按优先级顺序自动加载六个护栏
（参见 `registry.ts` → `registerDefaultGuardrails()`）：

| 优先级 | 名称                | 阶段           | 文件                  |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

优先级数字越小，**越先**运行。

### 视觉桥 Vision Bridge（`visionBridge.ts`）—— 模态桥 PR-1

GLM 5.3 基础模型与 `glm-5.3-{low,high,max}` 在注册表/规格元数据中带有显式的
`supportsVision:false`。GLM 5.3 Flash 各变体仍是原生视觉模型。
Claude Code 的 `/v1/messages` 路由会在 Claude 到 OpenAI 的转换**之前**进入共享的
`handleChat` 调用前护栏链；嵌套的 `Read` 工具结果图像必须在该转换将它们提升为
OpenAI `image_url` 内容之前完成描述或处理 (#17069)。

它会拦截发往**非视觉模型**的携图请求，并且要么将整个请求重新路由到具备视觉能力的模型，
要么在上游调用之前用可配置视觉模型生成的文本描述替换图像部分。
这使得纯文本提供者能够透明地处理多模态负载。

流程：

1. 若目标模型已支持视觉则跳过（除非它出现在强制桥接列表
   `isVisionBridgeForcedModel` 中）。
2. 通过 `extractImageParts(messages)`（`visionBridgeHelpers.ts`）提取图像部分，
   该函数委托给 `open-sse/utils/mediaParts.ts` 中的**统一媒体检测器**
   `detectMediaParts()`——与组合（combo）兼容性过滤器共享的单一事实来源。
   提取范围以允许名单限定为 `replaceImageParts` 能够拼回的结构
   （即 extract↔replace 契约）：OpenAI `image_url`、Anthropic base64
   `source.type:"base64"`、Anthropic URL `source.type:"url"`，以及 Responses
   API `input_image`。嵌套在 Claude Code `tool_result.content` 与 Responses
   工具输出中的匹配图像也会被提取，并在其原始路径处替换；
   仅作指示用途的结构属于组合过滤器的素材，不会被提取。
   未找到则跳过。
3. 通过 `resolveVisionBridgeRuntimeSettings()`
   （`src/shared/constants/modalityBridgeDefaults.ts`）解析运行时配置：新的
   `modalityBridge*` 设置键优先生效；旧的 `visionBridge*` 键保留为
   **单周期回退**（回滚窗口）。桥接被禁用时，在任何媒体遍历之前即跳过。
4. 模式选择器（`modalityBridgeVisionMode`，见下表）决定重新路由还是描述。
   重新路由返回的 `modifiedPayload` 仅替换了 `model`，并附带元数据
   `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路径：将图像数量限制在 `maxImages` 以内，组装任务感知提示词，
   查询描述缓存，**并行**调用视觉模型（`Promise.allSettled`），并在原位置注入
   `[Image N]: <description>` 文本部分。描述失败时得到 `null`：对于未知或具备
   视觉能力的目标，原始图像会被保留 (#4012)；但对于**已确认的纯文本直接目标**
   或零视觉组合，每一张未被描述的图像都会获得显式的
   `(unavailable — no vision-capable provider connected)` 文本占位符，
   包括部分失败以及超出描述调用上限的图像 (#17069)。
   现有的组合描述全部失败时的回退逻辑保持不变 (#8430)。
6. 返回 `modifiedPayload` 与元数据（`imagesProcessed`、`descriptions`、
   `processingTimeMs`、`visionModel`）。

#### 模式选择器（`modalityBridgeVisionMode`）

| 模式       | 默认值 | 行为                                                                                                                                                                                     |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | 传统启发式逻辑，保持不变 (#6640/#7204)：非组合/`auto/` 模型会重路由到最佳视觉模型，除非原始模型已拥有可用凭据（此时执行 describe）；组合目标始终执行 describe。                          |
| `describe` |        | 始终 describe —— 完全跳过重路由块；始终由用户选择的模型作答。                                                                                                                            |
| `reroute`  |        | 强制重路由：绕过"保留已配置凭据模型"的守卫。重路由**目标**的凭据守卫仍然生效——当不存在可用的视觉目标时，桥接会以明确的错误中断，而不是执行 describe 或将原始图像发送给仅支持文本的目标。 |

强制模式在 auto 启发式逻辑运行**之前**短路；`auto` 行为与 PR-1 之前的防护逻辑
逐字节一致。

#### API 密钥作用域 (`visionBridgeKeyScope.ts`)

当调用方的 API 密钥限制了 `allowedConnections`、配额池
（`allowedQuotas`）或模型（`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`）时，桥接只会在该密钥
可使用的连接上，选择该密钥可使用的重路由模型和 describe 模型。随后 describe 调用
始终通过带有 `x-omniroute-self-loop-key-id` 请求头的 OmniRoute 自环（self-loop）
进行，因此接收端的 chat 请求会再次强制执行该密钥的连接和模型策略。
`enforceApiKeyPolicy()` 仅在同时存在自环 bearer 凭据时才认可该请求头，因此它
只能缩小访问范围；无法解析的 id 将被拒绝。

如果该密钥不被允许使用任何视觉模型，**已确认的纯文本目标**会在本地以
明确的 HTTP 400 拒绝图像请求，而不是将图像字节转发给不具备该能力的上游 (#17069)。
对于视觉能力未知或原生支持视觉的目标，describe 路径保留之前的
失败开放（fail-open）行为（meta `{ skipped: true, reason: "no_permitted_vision_model" }`）。
没有密钥的请求，以及没有这些限制的密钥，行为与之前完全一致。

#### 任务感知的 describe 提示词 (`modalityBridgeVisionTaskAware`)

默认为 **true**。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）会将
**最后一条用户消息**的文本（截断至 500 个字符）附加到基础 describe
提示词之后，使描述倾向于用户实际询问的内容（codex-vision-proxy 模式），
并要求视觉模型转录可见文本。当该标志关闭——或没有用户文本——时，
基础提示词原样使用。

describe 自环自身的 OpenAI 兼容请求（`visionBridgeHelpers.ts` 中的
`callVisionModelSingle()`）始终请求 `image_url.detail: "high"` ——
无条件地，对每个调用方/提供者都是如此，不受任何客户端信号控制。
低细节采样会降低 OCR 准确率，而这正是该提示词所要求的文本转录任务，
因此无论原始入站请求使用了什么细节级别，describe 调用本身始终请求
高细节。这仅影响内部 describe 请求体；它不会改变 OmniRoute 在主请求上
转发调用方自己的 `image_url.detail` 的方式——该默认值是单独应用的，
并且仅针对检测到的 OpenCode 客户端，在 `defaultImageDetail()`
（`open-sse/handlers/chatCore/upstreamBody.ts`）中。describe 自环的
Anthropic 线格式分支没有 `detail` 字段，不受任一默认值的影响。

#### Describe 输出上限 (`modalityBridgeVisionMaxChars`)

| 键                             | 默认值 | 范围             |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 或 100–50000 |

`0`（默认）表示**无上限**——`callVisionModel()` 返回的描述将原样
传递，保留现有行为。100–50000 范围内的任何值都会截断描述并附加
`…` 后缀，然后再拼回为 `[Image N]: <description>`
（`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`）。
对于下游模型需要完整转录内容的细节密集型 OCR 任务，可提高此值；
降低它可限制话多的视觉模型的 token 用量。仪表板字段位于 Vision 选项卡的
Advanced 面板中（`ModalityBridgeVisionTab.tsx` 中的
`modality-bridge-max-chars`），它会将 1 到 99 之间的任何值向上钳制到
100 的下限，同时保留显式的 `0` 不变——`0` 本身就是一个有效的 Zod 值
（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`），
而不仅仅是"未设置"的默认值。

#### Describe 缓存 (`modalityBridge/bridgeCache.ts`)

用于 describe 输出的内存内 LRU + TTL 缓存，在整个进程范围内共享。
键 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，采用
长度前缀分帧（无字段边界冲突）。模型部分是**配置的**桥接模型，
而不是实际作答的模型——`callVisionModel` 可能会在内部回退，而按
每次尝试做键会使缓存碎片化。失败的 describe 永远不会被缓存。设置：

| 键                              | 默认值 | 范围    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 远程图像归一化（自循环 describe/base64 获取）

当桥接器自行获取**远程**图像时——Anthropic describe 自调用以及 claude 线格式（wire format）的 base64 转换
（`ensureBase64ImagesForClaudeWire`），两者都通过
`visionBridgeHelpers.ts` 中的
`fetchRemoteImageAsDataUri()`——生成的 data
URI 会在嵌入视觉模型请求之前先经过 `normalizeDataUri()`
（`open-sse/utils/imageNormalize.ts`）处理。尺寸过大的图像会被缩放到 **2048px 长边**（与
OpenAI/Anthropic 在服务端已应用的缩放上限一致），从而在不改变视觉模型所见内容的前提下减少
上传字节数/延迟。缩放使用 `sharp`，通过动态导入加载：在其原生
二进制无法加载的平台上，`normalizeDataUri()` **绝不会抛出异常**——它会回退为
直接透传原始字节，因此 describe/base64 转换路径始终能正常工作。非图像字节（一次
未能返回可解码图像的获取请求）同样会原样透传。此归一化仅作用于
桥接器为自身自调用而获取的图像——它永远不会应用于调用方的原始透传负载，
这与仅可选启用的变更原则（硬性规则 #20）保持一致。

#### 设置 Schema + 迁移

新的 `modalityBridge*` 键在 `updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）中通过 Zod 校验：`modalityBridgeVisionEnabled`、
`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、
`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、
`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、
`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` 三件套，以及
Audio Bridge 使用的 `modalityBridgeAudio*` 组。迁移
`141_modality_bridge_settings.sql` 将现有的旧版
`visionBridge*` 值复制到对应的新键（幂等，绝不覆盖
运维人员已设置的 `modalityBridge*` 值）；旧版键仍作为
读取回退被接受，为期一个发布周期。

#### 透明性标头 + 统计信息

经过 describe 转换的响应携带
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
（由 `modalityBridge/bridgeStats.ts` 中的
`buildModalityBridgeHeader()` 构建，
由 `src/sse/handlers/chatHelpers.ts` 中的
`withModalityBridgeHeader()` 盖章附加）。
被改道的请求**不会**获得该标头——负载未被改动，且模型
切换已在响应体的 `model` 字段中可见。

`GET /api/modality-bridge/stats`（管理鉴权，与
`GET /api/settings` 同级）返回按模态分类的内存计数器
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`，分别对应 `vision`、`audio` 和
`video`。`averageLatencyMs` 以 `latencySamples` 而非全部 attempts 作为
分母；没有计时的操作不会凭空捏造一个零毫秒
样本。`bridged` 仍是成功转换的向后兼容别名；
失败的尝试不会使其递增。
计数器在进程重启时按设计重置
（属于遥测，而非账务）。

#### 仪表盘配置

专用仪表盘页面为
`/dashboard/settings/modality-bridge`。其可通过 URL 寻址的 `Vision`、`Audio`
和 `Video` 标签页在切换 `tab` 值时保留查询参数。
Vision 标签页提供启用开关、模式、模型选择（包括自动
默认值）、任务感知提示词、高级超时/图像/描述长度/缓存
上限、运行时
计数器，以及一个受保护的示例请求。Audio 标签页也已上线：它提供
启用开关、仅 STT 的模型选择器（含 Auto）、超时/片段时长上限、音频
计数器，以及一个 `input_audio` 示例测试。Video 标签页具备完整功能：它报告
FFmpeg/ffprobe 运行时状态——四种明确的 UI 状态之一（探测进行中或
无法完成时为 `unknown`；在非回环
仪表盘主机上探测在客户端被跳过时为 `restricted`；探测后
确认缺失时为 `unavailable`；或附带 FFmpeg/ffprobe 版本信息的 `available`）——持久化
启用/模型/帧数/视频/超时上限，将模型选择器过滤为具备视觉能力的
模型，并提供视频计数器。

此前位于 AI 设置下的 Vision Bridge 卡片现在是指向
新页面的兼容性链接；它不再持有表单的第二份副本。Media Providers 也
将 Image-to-Text 和 Speech-to-Text 工作流链接到相应的 Modality
Bridge 标签页，同时不移除现有的 Speech-to-Text 演练场。

**自循环准入绕过：** 当 describe 调用通过 OmniRoute
自身的 `/v1` 自循环路由时（非标准提供方模型），子请求会发送
`x-omniroute-admission-bypass: internal`，并使用解析出的
自循环凭据进行认证——本地模式下的本地 `sk_omniroute` 哨兵值，或
运维人员配置的 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 环境变量键（#1350），从而
使 `REQUIRE_API_KEY=true` 的部署仍能运行 describe 调用。该绕过
仅对这些确切的凭据生效，因此外部客户端无法利用该
标头跳过准入检查。

旧版默认值位于 `src/shared/constants/visionBridgeDefaults.ts`；
新的模式/任务感知/缓存默认值以及设置解析器位于
`src/shared/constants/modalityBridgeDefaults.ts`。护栏（guardrail）暴露了一个
`deps` 构造函数选项，以便测试注入伪造的 `getSettings` 和
`callVisionModel` 实现。

### Audio Bridge（`audioBridge.ts`）—— Modality Bridge PR-3

在携带音频的聊天请求到达未确认接受音频输入的目标之前将其拦截。它绝不会
改道聊天请求：音频部分通过现有的 OpenAI 兼容 multipart 端点进行
转写，所选聊天模型继续使用文本转写结果。

流程：

1. 通过 `getResolvedModelCapabilities()` 解析 `supportsAudio`。显式的提供方注册表（provider-registry）元数据优先，其次是静态模型元数据，然后是同步的 `modalities_input`。声明的输入列表中不含 `audio` 则为 `false`；没有任何能力证据时保持为 `null`。`false` 和 `null` 都会激活保守桥接，而 `true` 会绕过桥接。
2. 解析 `modalityBridgeAudio*` 设置，并通过共享的 `detectMediaParts()` 检测器从每条消息中提取可拼接的顶层音频部分。支持的线上传输格式包括 OpenAI 的 `input_audio`、`audio_url` 和 `source.media_type: "audio/*"`。嵌套音频会被检测以用于路由，但不会被拼接路径移除。工作量受 `modalityBridgeAudioMaxClips` 限制；超出部分保持原样。
3. 使用配置的 `provider/model`，或让 `selectAudioBridgeModel()` 按稳定的目录顺序遍历 `AUDIO_TRANSCRIPTION_PROVIDERS`，选择第一个具有可用活动提供方凭证的模型。
4. `callAudioTranscription()` 将 base64/data-URI 音频转换为 multipart `file`，或通过仅公网出站防护（带 DNS 固定和 25 MB 上限）下载远程 `audio_url`。然后它将文件和所选模型 POST 到本地 `/v1/audio/transcriptions` 自循环端点，并使用 `resolveSelfLoopBearer()` 进行认证。现有的转录路由执行常规的凭证查找、冷却/速率限制处理和提供方分发。
5. 成功的调用会将其对应部分替换为 `[Audio N]: <transcript>`。调用以 `Promise.allSettled` 运行：单个失败会保留该原始音频部分（#4012 契约）。如果所有调用都失败且目标被证明为 `supportsAudio === false`，这些部分将变为 `[Audio N]: (unavailable — no STT provider connected)`（#8430 契约）。对于未知目标（`null`），全部失败的结果保持原样。被证明为纯文本且没有可用 STT 凭证的目标会收到相同的显式占位内容，且不会发起网络调用。

成功的转录使用进程范围的 Modality Bridge LRU/TTL 缓存。缓存键由音频引用、稳定的 `audio-transcription` 操作标签和所选 STT 模型组合而成；失败从不被缓存。音频尝试会更新共享的 `bridged`、`cacheHits`、`failures` 和 `lastUsedAt` 计数器。转换后的响应携带 `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；未被修改的请求不会携带 Audio Bridge 段。

运行时设置由数据库支持并经 Zod 验证：

| 键                            | 默认值  | 范围          |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | 自动或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

共享缓存仍由 `modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和 `modalityBridgeCacheMaxEntries` 控制。

### 视频桥（`videoBridge.ts`、 `videoBridgePipeline.ts`）

在调用没有已知本机视频支持的目标之前，拦截 Chat Completions `messages`和 Responses API `input`中的顶级视频部分。支持的形状有`input_video`、 `video_url`、 `video_source`、 HTTPS URLs和`data:video/*;base64,...`数据URIs。文本中的纯文件名不会被视为视频。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 拥有请求遍历、 capability/policy检查、每个请求聚合和响应负载。每个视频工作—获取、整体结果缓存、描述帧序列（融合任何调用者声明的音频转录），以及每次尝试metrics/abort/cleanup —隐藏在`videoBridgePipeline.ts`中的`processVideoPart`后面，在`preCall`循环内每个视频部分调用一次。该模块还定义了显式端口边界`VideoMediaBrokerPort` （获取字节并提取采样帧）、 `VideoAudioTranscriptionPort` （将调用者声明的音频转录与采样字幕融合）和`VideoDrilldownPort` （传统原始存储形状）。生成STT和帧保留通过`createVideoSttAdapter`和`createVideoDrilldownAdapter`围绕描述端口组成；后者使用共享的不透明句柄生命周期。

公共`/v1`请求路径从不导入或调用子流程。远程视频下载50 MiB绑定；内联 Base64 视频具有保守的 36 MiB解码每个视频上限，因此model/messages/framing信封可以保留在 50 MiB的公共JSON请求准入限制内。在分配之前检查内联长度和解码大小估计。初始远程URL和每个重定向都需要HTTPS ，使用现有的仅限公共出站防护和DNS固定。然后，字节穿过确切的内部`POST /api/modality-bridge/video/extract`代理边界。该路由既是`LOCAL_ONLY`又是`SPAWN_CAPABLE`，仅接受每个进程经过身份验证的可信环回请求，并且从不接受URL、文件系统路径、可执行文件或参数列表。 API正文大小管道和处理程序的增量正文读取器独立强制执行 50 个MiB代理输入上限。它的有界队列一次运行一个提取，允许四个挂起作业，并将挂起输入上限为 100 MiB。

在broker内部， `ffprobe`读取一个私有的本地文件；固定格式允许列表不包括播放列表和清单格式。对于允许的 MOV 系列容器，默认情况下外部MOV数据引用保持禁用状态，并且固定命令不会选择加入它们。 `ffprobe`和`ffmpeg`都使用`file` -only协议白名单、单线程、固定参数数组、无 shell 以及从`PATH`解析的可执行文件。附加图片封面流不是可播放的候选者。所有可播放的流都必须满足限制，并且在确定性最低索引回退之前首选显式默认流。视频时长限制为 600 秒，每维 8,192 像素，源像素为 33,554,432 个。 FFmpeg对 1-16 个中点JPEG帧进行采样，将长边缩小到最多 1,024 像素，而不放大较小的输入，并且从不接收URL。默认采样为`uniform` 。可选的`scene_aware`和实验性`segment_aware`策略对已验证的本地流执行额外的固定FFmpeg传递，选择有界`showinfo`场景时间戳，并在检测器故障、超时、格式错误的输出或空候选集时确定性地回退到相同的统一中点。分段感知模式根据已验证的场景间隔按比例分配中点样本；下面详细介绍了段感知证据和后备行为。在每个策略中选择后都会应用 16 帧硬上限。当场景感知请求只有一帧预算时，它使用活动全视频或焦点窗口的统一中点并报告`policyEffective: uniform`：单个选定的场景帧无法保留两个时间端。调用者可以选择提供有限焦点窗口（`start`/`end`秒）；边界被限制为媒体持续时间，拒绝反向或非有限窗口，并且所有采样策略仅在标准化间隔内执行。生成的窗口包含在采样元数据和不受信任的描述前缀中，因此下游模型可以将重点摘录与完整时间线区分开来。

语义标题焦点是一个单独的、显式的设置。默认的`full`分析模式保留现有的帧提示，并且从不将请求文本转发到标题模型。在`focused`模式下，桥仅从同一 Chat 或 Responses 容器中读取最新的非空用户编写的`text`/`input_text` ，将其规范化为NFC，折叠控制字符和空格，并将其限制为 500 个 Unicode 代码点。空结果会回退到确切的`full`提示符。可用提示在专用的不受信任用户上下文块中序列化为JSON ，并且可能仅优先考虑可观察的细节；它不能覆盖针对遵循媒体中可见或可听指令的单独警告。文本焦点永远不会推断`start`/`end`或更改时间采样器。

#### FU-07结构片段证据

`segment_aware`对已验证的本地视频流使用一次有界预分析。固定滤波器链首先缩放至最多 320 像素宽，检测场景变化和冻结间隔，然后以每秒 1 帧的速度采样以获得模糊、平均亮度和spatial/temporal信息。该通道仅限于 600 个结构样本、1 个FFmpeg/filter线程、相同的`file` -only协议和容器允许列表、1 个MiB进程输出绑定，并且在代理的共享abort/deadline.内最多保留 30 秒，它从不接受来自请求的命令、过滤器、路径或URL 。

结构值是确定性采样证据，而不是语义视频理解。它们不会推断主题、动作、字幕、语音或用户意图。场景和冻结边界形成片段；冻结覆盖、模糊、曝光、空间细节和时间变化仅影响现有 1-16 帧预算的分配方式。完全冻结的段的上限为一帧，而非冻结的段则竞争剩余的预算。当边界数量超过帧数时，会保留统一的时间线覆盖范围，因此快速的早期剪切无法隐藏较长的尾随片段。冻结边界的 1 秒分析分辨率内的场景边界被合并。

缺少过滤器、 malformed/empty证据、检测器错误或有限的预分析超时无法实现精确的统一中点策略。调用者中止或代理截止时间不会失败打开：它终止正在进行的子进程，防止稍后的帧提取，并且私有临时树在`finally`中被删除。

`scripts/perf/video-bridge-fu07-eval.ts`生成确定性的真实FFmpeg固定装置，用于重复数据删除后的字幕调用节省、密集运动预算分配、 blur/exposure/SI-TI证据、长尾快速剪切和逐渐淡出误报。它记录预分析墙时间，以及`/usr/bin/time`可用的子CPU和峰值RSS。它的质量检查只是结构性的预言。真正的字幕模型质量仍然是`HOLD`因为该工具没有授权端点或冻结判断。除非`--caption-cost-per-call-usd`提供明确的每次调用正估计，否则货币节省也仍然是`HOLD` ；该脚本永远不会伪造任何结果。

每个帧限制为 4 MiB，所有原始帧总共限制为 23 MiB，序列化代理响应限制为 32 MiB。 `finally`中的私有临时目录被删除。 OmniRoute不捆绑FFmpeg并且不接受自定义可执行路径。在添加字幕之前，桥接器会应用保守的视觉重复数据删除过程：每个JPEG都减少为 16 × 16 灰度缓冲区，并且仅与保留的最后一帧进行比较。对于超过一帧的请求字幕预算，提取会提供最多两倍于预算的有界候选池，但绝不超过 16 帧。所请求的上限仅在重复数据删除后应用，并且当预算至少为 2 时，在最终稀疏期间保留第一个和最终选定的候选者。版本化`grayscale-16x16-mean-cells-v2`策略使用平均亮度增量和归一化增量至少为 0.05 的缩略图单元的比率中的较大者。重复阈值是常数 0.04，选择它是为了可预测性，而不是作为运行时设置公开。这种辅助高对比度信号保留了仅平均值比较可以隐藏的小运动和可见文本变化。比较器或解码器错误打开并保持覆盖。输出元数据将提取的候选帧、成功使用的帧和丢弃的视觉重复项分开。

明确标记的视频部分可能会请求带时间戳的联系表。该桥最多构建一个4列、16帧的JPEG网格。每个 512 像素单元将其源时间戳刻录到高对比度底部带中，而相同的时间戳保留在文本元数据中以供下游关联和审核。完整的JPEG上限仍然为 32 MiB。如果`sharp`无法解码或组合网格，则桥接器会回退到各个JPEG帧；客户端中止仍然通过工作表操作传播。

促销证据故意与合成成分微基准分开。 `scripts/perf/video-bridge-contact-sheet-eval.ts`为真正的 OpenAI 兼容视觉模型定义了模式版本化的A/B工具。它测量提供者报告的令牌、端到端墙延迟（包括工作表组成）、模型调用计数和清单定义的事实保留。原始模型响应不会写入报告；仅保留SHA-256摘要和匹配的事实IDs 。除非传递`--execute-real`并配置`--model`、 `OMNIROUTE_BASE_URL`和`OMNIROUTE_API_KEY` ，否则该工具不会进行网络或付费模型调用。如果没有明确的实际运行，其机器可读的判决仍然是`HOLD`；综合payload/call-count测量值本身并不能作为晋升证据。

当调用者已经拥有对齐文本时，可以将可选的`transcript.cues`数组附加到支持的视频部分。每个提示必须携带`text`、探测持续时间内的有限`start`/`end`间隔以及白名单`source` （`client`、 `embedded`或`audio-bridge`）； `confidence`默认为`1`并且必须保持在`0`和`1`之间。完全相同的重复提示被折叠。 OmniRoute永远不会从此元数据开始转录：经过验证的线索会被复制到具有来源、置信度和间隔的描述结果中，并与帧标题一起呈现为不受信任的观察结果。无效、超出范围或无出处的文本将被拒绝，而不是混合到字幕流中。两个请求正文转录通道都将提供的来源标准化为`client`，包括自断言的`embedded`或`audio-bridge`标签。只有服务器拥有的适配器才能通过仅代码`trustedSource`参数分配这些可信标签；请求JSON字段无法到达该参数。转录文本仍然是不受信任的媒体衍生内容，无论其来源如何，并且绝不能确定授权。

高级调用者可以为同一视频提供`audioTranscript`轨道；它被视为客户端提供的文本，而不是服务器转录的证明。融合缝在一个截止日期和中止信号下运行视觉和音频观察，在公共时间线上对它们进行排序，折叠精确的重复项，并在只有一侧成功时报告部分结果。无效的`audioTranscript`会降级为部分结果—保留视觉描述，并且音频分支记录经过净化的故障代码—而不是使整个视频失败。每个分支的可用性、部分标志和清理后的故障代码都保留在所描述的结果、护栏元数据 (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`)、结果缓存元数据和桥融合计数器中。默认视频桥路径不会调用语音转文本或下载第二个媒体副本；如果没有明确的轨道，它仍然只是视频。

**转录本保留（#12150 P1）。**每当视频桥（本身选择加入）呈现转录提示—时，这会自动应用，没有单独的保留标志。当请求呈现任何转录提示（调用者声明的`transcript`或融合的`audioTranscript`）时，护栏将其标记为`videoBridgeObserved`并生成视频描述—的编辑阴影，其中每个提示的自由文本正文都被替换为`[redacted-video-transcript]`，通过在组装字符串之前替换结构化提示字段来构建（从不解析扁平文本，因此没有提示内容—对抗性或普通的，包括包含以下内容的正文`]`如`[inaudible]`/`[music]` —可以生存）。持久的呼叫日志请求正文将每个视频派生的文本部分交换为经过内容相等匹配的经过编辑的阴影； `fullText`锚点是从完成的预调用 Guardrail 有效负载中重新读取的，因此在后面的链 Guardrail（ PII和凭证掩码器、优先级10/95）重写描述文本并在system-prompt/handoff/memory注入重塑消息数组之后，匹配仍然会成功。向上游发送到模型的主体保持不变。观察到的请求也不会填充持久内存（请求和响应派生的提取都会被跳过），因此模型自己的回复无法将转录文本回显到内存中。

**原始视频字段 (#12430)。**当启用桥接且本机视频支持未知或不存在时，定义的`transcript`/`audioTranscript`字段也会激活`videoBridgeObserved`，即使在描述失败或`maxVideos`限制之后也是如此。 `null`和空字符串计数；缺失字段和非视频元数据则不会。保留的副本会编辑这些字段或省略请求，并且caches/Memory会被绕过。

在这些后备路径上，有效的调用者提示将成为受支持的`text`/`input_text`部分，而不是非标准提供程序字段。请求提供的两个轨道仍然不受信任的`client`观察，并明确警告该视频没有被描述，时间戳也没有根据媒体进行验证。现有的256-cue/64-KiB总预算和每个提示预算同时适用于两个轨道；时间戳必须符合经纪商的 600 秒上限和任何提供的焦点窗口。无效的曲目将被丢弃，而不是作为任意文本转发；除非超出其合并预算，否则仍可使用有效的兄弟姐妹。 Null/empty字段不添加文本。此后备不会添加任何媒体获取或转录。转录扩展字段将从后备视频载体及其`video_url`/`source`对象中删除。 OpenAI电线允许名单仍然严格；未知的本地视频载体仍然可用，已知的纯文本目标保留安全标记。结构化修订阴影保护附加的转录文本，而原始调用者拥有的请求保持不变。本机支持的目标和禁用的网桥保留其现有的旁路行为。

其他保留的副本使用相同的观察请求信号。原始的护栏前客户端请求快照、内存中的待处理请求和早期拒绝的请求日志在结构上取代了视频部分中的转录字段；由管道阶段和上下文切换合成的字符串提示在持久请求主体接收器中进行编辑。持久化的`video_content_removed`标记使`previous_response_id`延续无法关闭，而不是重建故意丢弃的文本。如果观察到的请求在记录之前丢失了其每部分的编辑阴影，或者甚至在稍后的请求突变后几个视频阴影之一无法匹配，则保留的请求正文将被完全省略，而不是保留部分编辑的转录本。

对于观察到的请求，模型响应可能会引用转录本的任何部分，而无需结构化提示边界。因此，其持久的呼叫日志`responseBody`被遗漏标记所取代；详细的管道工件（可以包括upstream/client主体和流块）不会保留。语义、幂等性和推理重放缓存会绕过该请求的读取和写入。提供者请求和客户端可见的响应保持不变。当详细的工件被省略时，早期的保活字节将从临时缓冲区中耗尽。 Kiro的格式错误的EventStream警告仅报告有效负载字节计数，而不报告其内容或JSON解析器的原始错误。这并不是说每个不相关的provider/plugin诊断都已经过审核； #11658中跟踪更广泛的保留汇扫描。

内部`/api/modality-bridge/video/drilldown`生命周期是一个单独的loopback/token-authenticated缓存底层。每个操作还需要一个规范的不透明主体ID。在启用生产调用方之前，它必须从经过身份验证的租户派生ID ，并且绝不能转发客户端选择的值。缓存键将该主体绑定到规范会话和视频引用IDs，仅存储它们的SHA-256-derived键，并将读取和删除范围限定为同一主体。缓存每个条目最多存储 16 个派生JPEG帧，十分钟后过期，并支持有界`start`/`end`读取或显式会话删除。

每个主体仅限于 16 个条目和 64 个MiB规范JPEG数据。这些限制独立于全局64-entry/256 MiB上限：在考虑全局LRU驱逐之前，主体配额压力仅驱逐主体最近最少使用的条目。过期的条目将从缓存活动的主体和全局记帐中清除，而取消和验证失败不会提交部分替换。

缓存拒绝在有界全图像`sharp`解码期间产生警告的非规范 Base64、过多填充、非 JPEG 媒体、格式错误或截断的JPEGs和JPEGs 。它将每个接受的图像重新编码为规范的JPEG，从解码的字节中导出宽度和高度，而不是信任调用者字段，并丢弃任何尾随的多语言字节而不是保留它们。只有有界规范压缩缓冲区才计入这两个配额。 JSON线路限制包括 32 MiB解码输入上限的 Base64 开销。每个存储的派生都会记录其经过验证的JPEG format/resolution、采样策略、派生版本、创建时间、服务器计算的内容哈希、哈希父引用以及可信调用者的父内容哈希。在原子缓存提交之前，在异步decode/hash阶段之间检查取消情况。

制作制作人仅在成功的视觉分析后重用已派生的代理帧，无需第二个视频download/extraction.它需要操作员`modalityBridgeVideoDrilldownEnabled=true`、严格的每部分`drilldown: true`和经过身份验证的 API 密钥记录ID。客户声明的principal/session值永远不会建立所有权。如果没有这三个条件，它就不会散列、调整大小或保留其他帧。保留失败保留了可用的视觉反应。同意的请求会绕过整个视频结果缓存，因此缓存的结果永远不会重播句柄。

成功的JSON和SSE响应在有界`x-omniroute-video-drilldown`标头中最多公开四个不透明句柄。授权浏览器源可以读取该标头，而无需扩大CORS源策略。新句柄使用`v1.<32-byte random base64url token>`，注册表仅保留其SHA-256哈希值。 reader/header解析器还接受旧的 64 进制标记。经过身份验证的公共消费者是`GET /api/v1/video-bridge/drilldown?handle=...`，由`modalityBridgeVideoDrilldownRemoteEnabled=true`独立控制。即使启用了旧版`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env 回退，显式持久 false 也会撤销访问权限。生产保留具有类似的传统`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`后备。两个后备选项均默认关闭。

消费者从经过身份验证的密钥中获取所有权并应用密钥策略： GET和DELETE都属于`video`端点类别，包括`/v1`和`/api/v1`别名。具有非空端点白名单的键必须包含`video`；不受限制的密钥保持兼容。对于未知、过期和另一个密钥的句柄，消费者返回相同的 404。它接受`variant=preview|standard|detail` （最大JPEG维度320/640/1280，从不升级）、 `limit=1..8` （或旧版`frames`别名，从不两者兼而有之）、从零开始的`page`和可选的`start`/`end`焦点秒。重复的查询键和反向焦点窗口将被拒绝。每个返回的变体都有其实际内容和实际分辨率元数据的哈希值，链接到保留的源。变体是在读取时派生的，而不是存储为额外保留的副本。 JSON响应（包括Base64/envelope）的上限为 32 MiB；过大的页面会返回 413，并且客户端必须请求更少的帧。在每次调整大小时读取检查取消并在返回之前重新检查句柄有效性。所有者的`DELETE`是幂等的；删除或TTL到期会释放保留的源和使用记帐。

共享存储是进程本地的：句柄在重新启动时过期，并且不能在独立的OmniRoute进程之间传输。管理统计数据仅公开有效的保留/远程策略和聚合保留的entries/bytes ，而不是媒体、引用、主体IDs或句柄。视频设置面板显示这些值，并且可以保留这两个同意开关。本实施文档并非实时部署或推广证据；真实模型的验收情况是单独跟踪的。

使用配置的视频模型按顺序为帧添加字幕。空视频覆盖继承视觉设置；如果两者都是空的，视觉自动布线器会选择有效的具有视觉功能的模型。成功的字幕用稳定的`[Video description:`前缀替换原始部分，该前缀还将文本标记为不受信任的媒体派生观察，并告诉下游模型不要遵循媒体中的指令。帧字幕缓存键包括JPEG字节、提示符、时间戳和有效模型；仅缓存成功的字幕。缓存条目保留实际成功的生产者模型，包括回退模型；当不同型号生产不同车架时，桥会报告`mixed` 。缓存命中重用该生产者身份，而不是将其重新标记为请求的路由计划。整个视频结果缓存取决于每个更改输出—提示、有效模型、采样策略、帧计数、语义分析模式、归一化焦点提示的SHA-256指纹、焦点窗口、 `transcript`、 `audioTranscript`和联系表标志—的输入，因此更改任何这些维度都是缓存未命中，永远不会重复使用。视觉重复数据删除策略版本、阈值和有界候选帧计数也在结果缓存键和元数据中明确显示；因此，策略更改无法重复使用过时的整个视频描述。结果缓存 v4 元数据保留模式和指纹，而不是原始用户任务。 Guardrail 元数据报告所请求的和有效的分析模式；没有可用用户文本的请求`focused`模式将被报告为有效`full`。

护栏提取每个支持的视频部分，但仅描述`modalityBridgeVideoMaxVideos`。对于被证明具有`supportsVideo === false`目标，失败和超出限制的视频将成为明确的安全文本标记，因此没有原始视频能够幸存。当功能未知时，这些部分保留其视频载体；任何后备转录均遵循上面的有界文本转换。带有`supportsVideo === true`目标绕过桥。客户端请求中止信号通过下载、代理队列、子进程和字幕调用传播；中止在视频之间停止，并且永远不会对原始媒体开放。

运行时设置由 DB 支持并经过 Zod 验证：

| 钥匙                                | 默认        | 范围/行为                                                                 |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 可选运行时，选择加入                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full`保留通用标题； `focused`使用有界的、不受信任的最新用户上下文        |
| `modalityBridgeVideoModel`          | `""`        | 继承Vision Bridge模型                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、 `scene_aware`或比例`segment_aware`；检测器故障回落至`uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                          |

超过 120 秒的传统持久视频超时值被限制在代理截止日期内；高于该限制的新设置写入将被拒绝。 `GET /api/modality-bridge/video/runtime`在身份验证或运行时探测之前需要受信任的标记环回位置，然后需要管理身份验证。当运行时不可用时，它仅返回`available`、清理后的FFmpeg/ffprobe版本和固定原因。内部提取端点不是公共上传API：队列饱和返回`503`加`Retry-After`，调用者断开连接返回`499`，固定代理截止时间返回`504`。转换后的响应将`video->text;model=<visionModel>;parts=<videos>`添加到中央`x-omniroute-modality-bridge`标头，而不删除视觉或音频段。

### PII掩码器 (`piiMasker.ts`)

运行于**两个都**阶段。

- **`preCall`**克隆有效负载，遍历`system`、 `messages`、 `input`和`prompt` （包括纯字符串项），并将`processPII()` （来自`@/shared/utils/inputSanitizer`）应用于字符串`content`/`text`字段。当`PII_REDACTION_ENABLED=true`时，检测到的PII会在出站负载中进行编辑。这独立于`INPUT_SANITIZER_MODE` （它仅控制提示注入策略）。关闭密文后，呼叫会记录检测计数，而不会重写内容。
- **`postCall`**深度克隆响应，运行`sanitizePIIResponse()`加上 Responses-API-shape masker（`maskResponsesOutput` —涵盖`output_text`和`output[].content[].text`）。如果发生任何编辑，修改后的响应将替换原始响应。

护栏永不遮挡；它仅注释（`meta.detections`， `meta.redacted`）或重写。

#### 按类型选择、自定义模式和检测计数器

**仪表板→设置→安全→ PII屏蔽**选择_什么_被屏蔽。它不会打开屏蔽：仍然是`PII_REDACTION_ENABLED` （请求）和`PII_RESPONSE_SANITIZATION` （响应+ SSE），默认情况下两者都是关闭的。

- **按类型选择**—内置 ID 列在`src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) 中。未设置意味着每种类型（此设置存在之前的行为）。请求引擎的`ssn_us`模式映射到`ssn`。模板（最小、标准、财务、巴西、 USA、 GDPR、 POPIA、完整）仅填充UI中的复选框。
- **GDPR和POPIA标识符**— 12 个内置 ID，涵盖EU和南非个人标识符（下表）。它们的正则表达式、验证器和管辖权标记位于一张表`src/shared/utils/piiPatterns.ts`中，响应清理器 (`src/lib/piiSanitizer.ts`) 和请求屏蔽器 (`src/shared/utils/inputSanitizer.ts`) 都会使用该表。仅当验证器接受匹配时才会对其进行编辑；仅仅一串数字是远远不够的。在这些 id 存在之前保存缩小选择的操作员将保持其行为，直到勾选新 id。
- **定制图案**—最多 20 个正则表达式或通配符模式（`*` =最多 64 个非空白字符， `?` = 1 个）。比赛变成`[CUSTOM_REDACTED]`。每个模式都经过`compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)：最多 500 个字符，标志仅限于`g i m s u`，必须编译，必须通过`safe-regex` （灾难性回溯），并且不得匹配空字符串或密文占位符。保存和测试时会拒绝失败的模式，并且在运行时会跳过失败的存储行而不是进行编译。自定义模式仅在屏蔽打开时运行。
- **检测计数器**—每个类型计数（从不匹配的值），保存在内存中并在重新启动时重置（`src/lib/pii/piiDetectionStats.ts`）。它们只会在屏蔽开启时增加。

设置位于`key_value`表（命名空间`pii_settings`、 `src/lib/db/piiSettings.ts`）中，并通过 1 秒缓存读取。 API：

| 方法   | 路径                     | 用途                                                       |
| ------ | ------------------------ | ---------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 标志状态、`enabledTypes`、`customPatterns`、检测计数器     |
| `PUT`  | `/api/settings/pii`      | 替换 `enabledTypes`（`null` = 全部）和/或 `customPatterns` |
| `POST` | `/api/settings/pii/test` | 针对最多 8 KB 的样本对单个模式进行试运行；不存储任何内容   |

所有这三个都需要管理身份验证并使用Zod (`src/shared/validation/schemas/piiSettings.ts`) 验证主体。禁用登录 (`requireLogin=false`) 时， `GET`和测试端点处于打开状态，但`PUT`仍然需要仪表板会话、 `manage` -scope API密钥、具有写入范围或更高范围的`oma_`访问令牌，或者从环回发送的CLI令牌或内部服务令牌。

#### GDPR (EU) 和POPIA (南非) 标识符

| ID                  | 标识符                | 验证                                                                                  |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `iban`              | IBAN                  | 已知国家、该国家的精确长度、ISO 13616 MOD-97-10                                       |
| `eu_vat`            | 欧盟 VAT 号码         | 已知成员国前缀及该国号码格式（不查询 VIES）                                           |
| `es_dni_nie`        | 西班牙 DNI / NIE      | 校验字母（数值 mod 23）；NIE 为 `X/Y/Z` + 7 位数字                                    |
| `it_codice_fiscale` | 意大利 Codice Fiscale | 根据奇数/偶数位置表计算校验字母                                                       |
| `pl_pesel`          | 波兰 PESEL            | 加权校验和及编码出生月/日的合理范围                                                   |
| `nl_bsn`            | 荷兰 BSN              | 11-proof 校验（权重 9..2, -1）                                                        |
| `de_steuer_id`      | 德国 Steuer-ID        | ISO 7064 Mod 11,10 及数字结构规则（首位不能为 0）                                     |
| `se_personnummer`   | 瑞典 personnummer     | 对最后十位数字执行 Luhn 校验，并检查出生日期合理性（10 或 12 位）                     |
| `za_id`             | 南非身份证号          | 对全部 13 位数字执行 Luhn 校验、有效出生月/日、公民身份位为 0 或 1                    |
| `za_phone`          | 南非电话号码          | `+27` / `27` 前缀，或包含空格或连字符的国内 `0..` 格式                                |
| `za_vat`            | 南非 VAT 号码         | 以 `4` 开头的 10 位数字，**并且**前面的 48 个字符内包含 "VAT" / "BTW"                 |
| `za_tax_ref`        | 南非税务编号          | 以 `0`-`3` 开头的 10 位数字、Luhn 校验，**并且**前面的 48 个字符内包含 "tax" / "SARS" |

由于纯数字格式与订单号、内部版本号和时间戳发生冲突，因此最弱的格式（`za_vat`、 `za_tax_ref`）需要关键字提示，并且裸露的十位`0..`号码不会被视为南非电话号码。间隔IBANs (`GB29 NWBK ...`) 不匹配。在流路径上，仅在当前块内查找提示。 id 位于通用电话模式之前，因此经过验证的标识符保留其自己的占位符（`[IBAN_REDACTED]`、 `[NL_BSN_REDACTED]`等）。 `gdpr`和`popia`模板分别选择EU和南非 id。屏蔽本身保持选择加入（硬规则#20）：这里没有任何内容改变功能标志默认值。

### 提示注入（`promptInjection.ts`）

检测用户提供内容中的对抗性结构，并执行所配置的策略。其行为由环境变量和构造函数选项驱动：

| 设置     | 环境变量                                                                                            | 默认值 | 作用                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 启用     | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | 为 `false` 时，护栏直接短路跳过。                                                                                                               |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | 注入策略：`block`、`warn` 或 `log`。（为向后兼容仍接受 `redact`，但它**不会**剥离注入文本；请求侧的 PII 改写由 `PII_REDACTION_ENABLED` 控制。） |
| 阻断阈值 | `blockThreshold` 选项 / `INPUT_SANITIZER_BLOCK_THRESHOLD`（别名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 触发阻断所需的最低严重级别。默认配置下，Medium 级别仅观察、不阻断。                                                                             |

**模式优先级**（`getMode`）：调用方 `options.mode` → `INJECTION_GUARD_MODE` 的**数据库功能标志覆盖**（仪表盘 → 设置 → 功能标志）→ `INJECTION_GUARD_MODE` 环境变量 → `INPUT_SANITIZER_MODE` 环境变量 → `warn`。因此，仪表盘中的覆盖优先于环境变量，功能标志 UI 可实时控制运行中的护栏（无需重启）。数据库读取是故障安全的：如果读取出错，护栏将回退到基于环境变量的行为；当未设置覆盖时，行为与仅使用环境变量解析的结果完全一致。

检测来源：

1. 来自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（管道中其他地方也在使用的共享检测器集合）。
2. 内置的 `DEFAULT_GUARD_PATTERNS`（当前为 `system_override_inline` 和 `markdown_system_block`，均为 `high` 严重级别）。
3. 通过构造函数选项传入的可选 `customPatterns`（字符串、正则，或 `{ name, pattern, severity }` 记录）。

当 `mode === "block"` **且**至少有一个检测结果达到严重性
阈值时，`preCall` 返回 `{ block: true, message: "Request rejected:
suspicious content detected" }`。在 `warn`/`log` 模式下，护栏仅记录日志
但放行调用。共享辅助函数 `evaluatePromptInjection()` 也会被导出，
供需要绕过注册表直接评估提示词的调用方使用。

**扫描上限（v3.8.20）：** 检测器仅检查拼接后提示文本的**前 16 KB**
——即 `src/shared/utils/inputSanitizer.ts` 中的
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 字节）。`detectInjection()` 和
`evaluatePromptInjection()` 都会在运行模式匹配循环之前执行
`slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令通常位于输入的开头部分，因此该上限
可在数百 KB 级的负载上限制正则表达式的 CPU/GC 开销，而不会削弱检测能力（参见
#3932、#4041）。

### 凭据脱敏器（`credentialMasker.ts`）

在**两个**阶段都会运行，位于默认链的末尾（优先级 `95`）。它会从出站负载
（消息内容、工具调用参数、工具结果）**以及**提供者响应中抹除
常见的 API 密钥 / 机密令牌模式，从而避免粘贴进提示词中
（或被工具结果回显）的凭据泄露给上游提供者或返回给客户端。

- **仅限显式启用**，与 PII 脱敏采用相同约定（与硬规则 #20 相近）：
  除非 `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否则处于禁用状态。关闭时，该护栏为空操作——
  既不阻断也不重写。
- `redactCredentials()` 会遍历完整的负载/响应树（`walkValue()`，
  可防原型污染，并通过 `WeakSet` 实现循环安全），将匹配项替换为
  `[REDACTED:<type>]` 占位符，且仅克隆实际发生更改的分支。
- `CREDENTIAL_PATTERNS` 涵盖 LLM 提供者密钥（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS 令牌（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、支付密钥（Stripe、Square）、云
  密钥（AWS 访问密钥、Twilio、SendGrid、Mailgun）、私钥 / JWT、
  携带凭据的连接字符串（`mongodb://user:pass@...` 等），以及
  通用的 `Authorization`/`x-api-key`/`api-key`/`apikey` 请求头值
  模式。请求头形式的键（`authorization`、`x-api-key`、`api-key`、
  `apikey`）通过结构化方式脱敏（仅处理值，保留
  `Bearer `/`Basic ` 等方案前缀），而不是使用通用文本正则。
- 该护栏从不阻断；仅执行重写（`modifiedPayload` /
  `modifiedResponse`）和标注（`meta.credentialsRedacted`、`meta.count`）。

回归防护：`tests/unit/credential-masker-guardrail.test.ts`。

## 基础契约（`base.ts`）

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true 表示短路整条链
  message?: string; // 阻断时向调用方展示
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 由 preCall 返回，用于重写请求
  modifiedResponse?: TValue; // 由 postCall 返回，用于重写响应
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

护栏通过返回 `void`、`{}` 或 `{ block: false }` 来表示“无更改”。返回 `modifiedPayload`/`modifiedResponse` 会替换在链中流动、供下游护栏使用的值。
`signal?: AbortSignal` 将调用方的生命周期传递进护栏。请求中止是有意设计的故障开放（fail-open）例外：媒体桥接会停止工作并进行清理，而不会把原始媒体恢复到已知不支持它的目标。

## 注册表（`registry.ts`）

单例 `guardrailRegistry` 提供：

- `register(guardrail)` —— 添加一个护栏（若规范化名称相同则替换），并按 `priority` 升序重新排序。
- `clear()` / `list()` —— 管理辅助方法。
- `runPreCallHooks(payload, context)` —— 遍历已启用的护栏，通过 `modifiedPayload` 在链中传递载荷，并在遇到第一个 `block: true` 时停止。
- `runPostCallHooks(response, context)` —— 在响应侧执行相同的流程。
- `resetGuardrailsForTests({ registerDefaults })` —— 清空状态，并可选择重新注册默认护栏，以实现干净的测试隔离。

两个运行器都返回 `{ blocked, payload|response, results, guardrail?, message? }`，其中 `results` 是 `GuardrailExecutionResult` 记录数组，包含每个护栏的 `blocked`、`skipped`、`modified`、`error` 和 `meta` 字段，便于追踪。

### 按请求禁用护栏

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` 汇总一份去重后的护栏名称列表，这些护栏将在当前请求中被跳过。共有五个通道，按以下顺序读取并合并为一个列表（去重时以首次出现为准）：

1. `apiKeyInfo.disabledGuardrails`
2. 请求体中的 `disabledGuardrails`（顶层）
3. 请求体中的 `metadata.disabledGuardrails`（仅当 `metadata` 为对象时）
4. 请求头 `x-omniroute-disabled-guardrails`
5. 旧版请求头 `x-disabled-guardrails`

五个通道全部会被合并，包括两个请求头：同时发送 `x-omniroute-disabled-guardrails` 和 `x-disabled-guardrails` 时，跳过的是两者列表的并集；而空的现代请求头不再遮蔽旧版请求头（[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)，已在 [#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) 中修复）。

值可以是字符串数组，也可以是逗号分隔的字符串；名称会被去除首尾空白并规范化为小写 kebab-case（`pii_masker` → `pii-masker`），空条目会被丢弃。结果通过 `context.disabledGuardrails` 传递给注册表，注册表会跳过匹配的护栏（在 `results` 中标记为 `skipped: true`）。

禁用列表仅影响**注册表**。提示注入的 `block` 模式是一条强制性边界：注入防护中间件（`src/middleware/promptInjectionGuard.ts`）在调用 `evaluatePromptInjection()` 时不接受任何调用方控制的禁用列表（它过去那个无效的 `resolveDisabledGuardrails({ body })` 调用已在 [#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) 中移除），因此即使请求禁用了 `prompt-injection`，在 `block` 模式下仍会被拒绝。这是有意为之的设计。禁用通道由调用方控制（请求体、元数据、请求头），而调用方绝不能关闭运维人员设置的安全控制（[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) 引入的请求头并集只改变哪些注册表护栏会被跳过；它不会让客户端绕过中间件。强制性的按密钥（per-key）和按分组（per-group）护栏策略在 v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) 中跟踪。参见[覆盖范围与限制](#coverage-and-limits)。

## 执行顺序

对于流经 `src/sse/handlers/chat.ts` 和
`open-sse/handlers/chatCore.ts` 的每个请求（即
[覆盖范围与限制](#coverage-and-limits)中列出的聊天家族路由）：

1. `resolveDisabledGuardrails(...)` 根据 API key、请求体和请求头构建跳过列表。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 按优先级升序运行护栏：
   - 被禁用的护栏会被记录为 `skipped`。
   - 每个护栏的 `preCall` 可以通过 `modifiedPayload` 重写负载。
   - 第一个 `block: true` 会使链路短路，处理器随即返回护栏拒绝响应。
3. （可能被重写过的）负载进入 combo 路由和上游分发。
4. **仅限非流式：** 在响应组装完成后，
   `guardrailRegistry.runPostCallHooks(...)` 会在响应上运行同一条链路。此处的 `block: true` 会丢弃上游响应并返回 HTTP 400。流式响应完全跳过此步骤。

抛出异常的护栏会以 `error: <message>` 记录，并通过
`logger.warn` 记录日志，但链路仍会继续——这是设计上的故障开放（fail-open）。

## 覆盖范围与限制

护栏注册表仅接入聊天管道。这些限制由
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` 和
`tests/unit/guardrail-pipeline-characterization.test.ts` 固定；当行为发生变化时，请有意识地更新这些测试。

### 钩子的运行位置

| 钩子 / 控制项          | 运行位置                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`      | 由 `handleChat`（`src/sse/handlers/chat.ts`）处理的请求：`/v1/chat/completions`、`/v1/completions`、`/v1/messages`、`/v1/responses`（以及 `/v1/responses/*`）、`/v1/relay/chat/completions`、`/v1/providers/{provider}/chat/completions`、`/v1/api/chat`、`/v1/antigravity`、`/v1beta/models/*`，以及 Telegram 聊天代理。还包括仪表板测试端点 `/api/guardrails/test`。调用前阻断会返回 HTTP 400。 |
| `runPostCallHooks`     | 仅限**非流式**聊天响应（`open-sse/handlers/chatCore/nonStreamingResponse.ts`）。流式响应永远不会到达它。                                                                                                                                                                                                                                                                                          |
| 流式 PII               | `createPiiSseTransform`（`src/lib/streamingPiiTransform.ts`），当 `PII_RESPONSE_SANITIZATION` 开启时在 `streamingPipeline.ts` 中接入管道。它不是护栏，因此禁用通道对它没有影响。                                                                                                                                                                                                                  |
| 注入防护中间件（旧版） | 每个携带提示词的 `/v1` 路由，包括聊天家族（参见[路由覆盖范围](#injection-guard-route-coverage--red-team-phase-8--block-d)）。仅针对提示词注入。                                                                                                                                                                                                                                                   |

### 未覆盖的内容

- **媒体、嵌入和数据路由**（`/v1/images/*`、`/v1/embeddings`、
  `/v1/audio/*`、`/v1/videos/generations`、`/v1/music/generations`、
  `/v1/rerank`、`/v1/search`、`/v1/moderations`）永远不会到达注册表。那里不会运行
  PII 掩码、凭据掩码或模态桥接。它们唯一的
  检查是旧版注入防护中间件。
- **流式响应**没有调用后护栏：没有 `pii-masker` 或
  `credential-masker` 的调用后处理，也没有调用后阻断。仅应用流式 PII
  转换（当 `PII_RESPONSE_SANITIZATION` 开启时）。在流式响应中
  被回显的凭据不会被脱敏。
- **禁用通道与中间件（设计使然）：** 中间件通过自行调用
  `evaluatePromptInjection()` 来评估提示词注入，不传递任何调用方控制的禁用列表。`block` 模式是一条强制边界，调用方控制的禁用无法绕过它，包括在聊天家族路由上
  （[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。禁用
  `prompt-injection` 只会跳过注册表护栏。

### 在调用后处理之前看到响应的环节

在非流式路径上，顺序为：记忆提取 → 内置工具
执行 → 调用后护栏 → 调用后阻断退出 → 语义缓存存储。

- **记忆提取（memory extraction）**和**工具执行（tool execution）**会在调用后（post-call）护栏有机会改写或阻止响应之前看到该响应。自 [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) 起，当 `PII_RESPONSE_SANITIZATION` 开启时，记忆提取会将提取的文本通过 `sanitizePII` 处理（流式和非流式均如此），但一个随后被调用后护栏阻止的响应，仍然已经被提供给了记忆和工具。
- **语义缓存（semantic cache）**在调用后处理之后才存储响应，因此它存储的是改写后的响应，而被阻止的响应永远不会被缓存。缓存条目按 API key 进行键控。

## 配置

内置防护栏读取的环境变量：

| 变量                                  | 使用者               | 作用                                                                         |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`   | 设为 `false` 可完全禁用检测。                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`   | 注入策略：`warn`、`block` 或 `log`。旧值 `redact` 不会重写注入文本。         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`   | 注入防护的模式；同时也是一个数据库功能标志，会**覆盖**环境变量（DB > ENV）。 |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`   | `MODE=block` 时拒绝的最低严重级别：`high`（默认）、`medium` 或 `low`。       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`   | `INPUT_SANITIZER_BLOCK_THRESHOLD` 的旧别名。                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`         | 为 `true` 时，请求中的 PII 会被脱敏（独立于注入模式）。                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（下游） | 控制响应侧掩码器的行为。                                                     |

Modality Bridge 防护栏从数据库支持的设置存储（`getSettings()`）读取运行时配置，而不是环境变量。Vision 的主要键为
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和
`modalityBridgeCacheMaxEntries`。旧的
`visionBridge*` 键仅作为文档中说明的一个周期的读取回退而被接受；仪表板写入操作使用主要键。默认值和回退解析器位于 `src/shared/constants/modalityBridgeDefaults.ts`，旧常量保留在 `src/shared/constants/visionBridgeDefaults.ts` 中。

Audio 使用 `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout` 和 `modalityBridgeAudioMaxClips`，以及共享的
`modalityBridgeCache*` 设置。Audio 没有旧键回退，因为这些键是随 Modality Bridge 架构一起引入的。

Video 使用 `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos` 和
`modalityBridgeVideoTimeout`，以及共享的 `modalityBridgeCache*` 设置。
它默认处于禁用状态，因为 FFmpeg/ffprobe 是可选的运行依赖，且帧描述生成会增加延迟和模型成本。

## 自定义护栏

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

步骤：

1. 创建继承自 `BaseGuardrail` 的 `src/lib/guardrails/myGuardrail.ts`。
2. 实现 `preCall` 和/或 `postCall`。
3. 在导入时注册（从 `registerDefaultGuardrails` 推送），或在运行时调用
   `guardrailRegistry.register(...)` —— 注册表会替换任何具有相同
   规范化名称的已有护栏。
4. 在 `tests/unit/` 下添加测试（现有示例：
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## 测试

在测试之间使用 `resetGuardrailsForTests()` 从已知状态开始。
传入 `{ registerDefaults: false }` 以空注册表开始，仅注册
被测的护栏。Vision Bridge 接受依赖
注入（`deps.getSettings`、`deps.callVisionModel`）；Audio Bridge 为设置、
能力、STT 模型选择、凭证检查和转录暴露了
等效的接缝。因此，测试可以在无需数据库
或网络访问的情况下执行这两种流程。

## 另请参阅

- `src/lib/guardrails/` —— 实现
- `src/shared/utils/inputSanitizer.ts` —— 为提示注入和 PII 屏蔽
  提供支持的共享检测器
- `src/shared/constants/visionBridgeDefaults.ts` —— Vision Bridge 默认值和
  强制桥接模型列表
- `src/shared/constants/modalityBridgeDefaults.ts` —— 共享的 Vision/Audio 运行时默认值
- `docs/architecture/RESILIENCE_GUIDE.md` —— 正交层（断路器、冷却期）
- `docs/reference/ENVIRONMENT.md` —— 完整的环境变量参考

## 注入防护路由覆盖与红队测试（第 8 阶段 · D 区块）

注入防护（`createInjectionGuard` / `withInjectionGuard`）覆盖所有
接受用户提示词的路由。它遵循 `INJECTION_GUARD_MODE`（默认 `warn` = 仅记录日志；
`block` = 返回 HTTP 400 `SECURITY_001`）。

| 类型         | 路由                                                                                                                                                 | 默认模式 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 文本（现有） | `/v1/chat/completions`、`/v1/completions`、`/v1/relay/chat/completions`                                                                              | warn     |
| 生成式       | `/v1/messages`、`/v1/responses`、`/v1/images/generations`、`/v1/images/edits`、`/v1/videos/generations`、`/v1/music/generations`、`/v1/audio/speech` | warn     |
| 数据         | `/v1/embeddings`、`/v1/rerank`、`/v1/search`、`/v1/moderations`                                                                                      | warn     |

文本提取（`extractMessageContents`）覆盖 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`。

**红队测试（每夜运行，`nightly-llm-security.yml`）：** promptfoo 验证每条路由在
`INJECTION_GUARD_MODE=block` 下拦截 OWASP-LLM 语料库；garak 运行探针（没有密钥时跳过）。
`moderations` 为保持一致性也被包含在内。Block 模式是一个强制性边界：`evaluatePromptInjection()`
会忽略中间件传给它的按请求禁用列表，因此 `disabledGuardrails` **不能**
使路由豁免于此（[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。

该每夜工作流（`.github/workflows/nightly-llm-security.yml`，cron + 手动
触发）包含两个任务：

- **`promptfoo-guard`（阻塞性）** —— 在 `INJECTION_GUARD_MODE=block`
  下运行 `promptfoo eval -c promptfooconfig.yaml`。每个对抗性用例
  （例如 "ignore all previous instructions…"、DAN 风格的越狱）断言响应携带
  `error.code === "SECURITY_001"`，即防护确实拒绝了该请求。
- **`garak`（建议性）** —— 针对本地 OmniRoute 实例
  （`http://localhost:20128/v1`）运行 garak `--probes promptinject,dan,leakreplay`。
  由提供者密钥（`PROMPTFOO_PROVIDER_KEY`）门控；无密钥时优雅跳过，
  并以 `|| true` 作为后缀，因此它会报告结果而不会导致 CI 失败。

防护辅助器（`createInjectionGuard` / `withInjectionGuard`）的覆盖范围
涵盖每条携带提示词的 `/v1` 路由；提示词文本由
`src/shared/utils/inputSanitizer.ts` 中的 `extractMessageContents()` 从
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
中提取。
