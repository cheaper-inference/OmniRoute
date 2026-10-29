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

### 视频桥接（`videoBridge.ts`、`videoBridgePipeline.ts`）

在调用没有已知原生视频支持的目标之前，拦截 Chat Completions `messages` 和 Responses API `input` 中的顶层视频部分。支持的格式包括 `input_video`、`video_url`、`video_source`、HTTPS URL 和 `data:video/*;base64,...` data URI。文本中的普通文件名不会被视为视频。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）负责请求遍历、能力/策略检查、每请求聚合以及响应负载。每个视频的工作——获取、整体结果缓存、描述帧序列（会融合任何调用方声明的音频转录）以及每次尝试的指标/中止/清理——都隐藏在 `videoBridgePipeline.ts` 中的 `processVideoPart` 之后，在 `preCall` 的循环中对每个视频部分调用一次。该模块还定义了显式端口边界：`VideoMediaBrokerPort`（获取字节并提取采样帧）、`VideoAudioTranscriptionPort`（将调用方声明的音频转录与采样字幕融合）和 `VideoDrilldownPort`（帧深入查看的持久化边界；尚未接入 `processVideoPart`——目前只有独立的 `/api/modality-bridge/video/drilldown` 路由写入深入查看条目）。

公共 `/v1` 请求路径从不导入或调用子进程。远程视频在 50 MiB 上限内下载；内联 base64 视频有保守的 36 MiB 解码后每视频上限，以便模型/消息/封装框架可以保持在公共 JSON 请求准入限制 50 MiB 之内。内联长度和解码大小估算在分配之前进行检查。初始远程 URL 和每次重定向都要求 HTTPS，并使用现有的仅公网出站防护和 DNS 固定。随后字节会经过确切的内部 `POST /api/modality-bridge/video/extract` 代理边界。该路由同时是 `LOCAL_ONLY` 和 `SPAWN_CAPABLE`，只接受每进程认证的可信回环请求，从不接受 URL、文件系统路径、可执行文件或参数列表。API 请求体大小管道和处理程序的增量请求体读取器各自独立强制执行 50 MiB 的代理输入上限。其有界队列一次只运行一个提取任务，允许四个待处理作业，并将待处理输入限制在 100 MiB。

在 broker 内部，`ffprobe` 读取私有本地文件；固定的格式允许列表排除了播放列表和清单（manifest）格式。对于允许的 MOV 系列容器，外部 MOV 数据引用默认保持禁用，且固定命令不会选择启用它们。`ffprobe` 和 `ffmpeg` 都使用仅 `file` 的协议白名单、单线程、固定参数数组、无 shell，可执行文件从 `PATH` 解析。附加图片（attached-picture）封面流不是可播放候选。所有可播放流都必须满足限制，并且在确定性的最低索引回退之前优先选择显式的默认流。视频限制为 600 秒、每维度 8,192 像素、33,554,432 个源像素。FFmpeg 采样 1–16 个中间点 JPEG 帧，将长边缩小至最多 1,024 像素且不放大较小的输入，并且永远不会收到 URL。采样默认采用 `uniform` 策略。可选的 `scene_aware` 和实验性的 `segment_aware` 策略会在已经验证过的本地流上执行一次额外的固定 FFmpeg 处理，选择有界的 `showinfo` 场景时间戳，并在检测器失败、超时、输出格式错误或候选集为空时确定性地回退到相同的均匀中间点。场景感知模式按已验证的场景间隔按比例分配中间点采样；场景感知的证据和回退行为详见下文。硬性 16 帧上限在每种策略中都在选择之后应用。当场景感知请求只有一帧预算时，它使用活动的全视频或聚焦窗口的均匀中间点，并报告 `policyEffective: uniform`：单个选定的场景帧无法同时保留时间上的两端。调用方可以选择提供一个有限的聚焦窗口（`start`/`end` 秒）；边界会被钳制到媒体时长，反向或非有限的窗口会被拒绝，并且所有采样策略都只在归一化后的区间内执行。生成的窗口会包含在采样元数据和不可信描述前缀中，以便下游模型能够区分聚焦片段与完整时间线。

语义字幕聚焦是一个独立的显式设置。默认的 `full` 分析模式保留现有的帧提示词，并且从不将请求文本转发给字幕模型。在 `focused` 模式下，bridge 只读取同一 Chat 或 Responses 容器中最新的非空用户撰写的 `text`/`input_text`，将其归一化为 NFC，折叠控制字符和空白字符，并将其限制为 500 个 Unicode 码位。空结果会回退到与 `full` 完全一致的提示词。可用的提示（hint）会作为 JSON 序列化到一个专用的不可信用户上下文块中，并且只能用于优先呈现可观察的细节；它不能覆盖针对遵循媒体中可见或可听指令的独立警告。文本聚焦永远不会推断 `start`/`end`，也不会改变时间采样器。

#### FU-07 结构性片段证据

`segment_aware` 在已经验证过的本地视频流上使用一次有界的预分析处理。固定的滤镜链首先缩放到最多 320 像素宽，检测场景变化和冻结区间，然后以每秒 1 帧采样模糊度、平均亮度和空间/时间信息。该处理限制为 600 个结构样本、单个 FFmpeg/滤镜线程、相同的仅 `file` 协议和容器允许列表、1 MiB 的进程输出上限，并且在 broker 共享的中止/截止时间（abort/deadline）内最多 30 秒。它从不接受来自请求的命令、滤镜、路径或 URL。

这些结构性数值是确定性的采样证据，而非语义视频理解。它们不会推断主体、动作、字幕、语音或用户意图。场景和冻结边界构成片段；冻结覆盖率、模糊度、曝光、空间细节和时间变化只影响现有 1–16 帧预算的分配方式。完全冻结的片段上限为一帧，而非冻结的片段则竞争剩余的预算。当边界数量超过帧数时，保留均匀的时间线覆盖，使得快速的前期剪切无法隐藏一个长的尾部片段。与冻结边界处于 1 秒分析分辨率之内的场景边界会被合并。

缺失滤镜、格式错误/空证据、检测器错误或有界的预分析超时都会开放失败（fail open）到与均匀中间点完全一致的策略。调用方中止或 broker 截止时间则不会开放失败：它会终止正在运行的子进程，阻止后续的帧提取，并在 `finally` 中移除私有临时目录树。

`scripts/perf/video-bridge-fu07-eval.ts` 生成确定性的真实 FFmpeg 夹具（fixture），用于去重后字幕调用节省、密集运动预算分配、模糊/曝光/SI-TI 证据、带长尾的快速剪切以及渐变误报。它记录预分析的实际耗时（wall time），并在 `/usr/bin/time` 可用时记录子进程 CPU 和峰值 RSS。其质量检查仅为结构性预言机（oracle）。真实字幕模型的质量仍为 `HOLD`，因为该测试装置没有授权端点或冻结的评判器（judge）。除非 `--caption-cost-per-call-usd` 提供明确的正的每次调用估计值，否则金钱节省也保持 `HOLD`；该脚本永远不会捏造这两种结果中的任何一种。

每帧限制为 4 MiB，所有原始帧合计限制为 23 MiB，序列化后的代理响应限制为 32 MiB。私有临时目录会在 `finally` 中移除。OmniRoute 不捆绑 FFmpeg，也不接受自定义可执行文件路径。在生成字幕之前，桥接层会执行一次保守的视觉去重处理：每张 JPEG 被缩减为 16×16 灰度缓冲区，并且仅与最近保留的一帧进行比较。当请求的字幕预算大于一帧时，提取阶段会提供一个有上限的候选池，其大小最多为预算的两倍，且永不超过 16 帧。请求的上限仅在去重之后才应用；当预算至少为两帧时，最终稀疏化过程中会保留首个和最后一个被选中的候选帧。带版本标识的
`grayscale-16x16-mean-cells-v2` 策略取平均亮度差值与归一化差值不低于 0.05 的缩略图单元格比例这两者中的较大者。
重复帧阈值是常量 0.04，出于可预测性考虑而选择固定值，而非作为运行时设置公开。这一辅助的
高对比度信号可以保留仅做均值比较时可能被掩盖的微小运动和可见文本变化。比较器或解码器错误会以开放方式失败（fail open），从而保持帧覆盖率。输出元数据会区分提取的候选帧、成功使用的帧，以及被丢弃的视觉重复帧。

显式标记的视频分片可以请求带时间戳的拼贴图（contact sheet）。
桥接层最多构建一个 4 列、16 帧的 JPEG 网格。每个 512 像素的单元格会将其源时间戳烧录到
高对比度的底部条带中，同时相同的时间戳仍保留在文本元数据中，供下游关联和审计使用。完整的
JPEG 始终限制在 32 MiB 以内。如果 `sharp` 无法解码或合成该网格，
桥接层会回退到单独的 JPEG 帧；而客户端中止仍会贯穿整个拼贴图操作传播。

推广证据（promotion evidence）被刻意与合成构图
微基准测试分离。`scripts/perf/video-bridge-contact-sheet-eval.ts` 定义了一个
带模式版本的 A/B 测试框架，用于真实的 OpenAI 兼容视觉模型。它测量
提供者报告的 token 数、端到端墙钟延迟（包括拼贴图合成）、
模型调用次数，以及清单中定义的事实保留率。原始模型响应不会
写入报告；仅保留 SHA-256 摘要和匹配到的事实 ID。该
测试框架不会发起任何网络或付费模型调用，除非传入 `--execute-real` 并
配置了 `--model`、`OMNIROUTE_BASE_URL` 和 `OMNIROUTE_API_KEY`。如果
没有这次显式的真实运行，其机器可读的判定结果保持为 `HOLD`；仅凭合成
的负载/调用次数测量并不构成推广证据。

当调用方已经拥有对齐文本时，可以在受支持的视频
分片上附加一个可选的 `transcript.cues` 数组。每个提示（cue）必须携带 `text`、一个
位于探测时长范围内的有限 `start`/`end` 区间，以及一个白名单内的
`source`（`client`、`embedded` 或 `audio-bridge`）；`confidence` 默认为
`1`，且必须保持在 `0` 和 `1` 之间。完全重复的提示会被折叠。
OmniRoute 绝不会根据这些元数据启动转录：经过验证的提示会连同来源、置信度和区间一起
复制到描述结果中，并作为不可信观察内容与帧字幕一同
呈现。无效的、超出范围的或没有来源信息的文本会被拒绝，而不是混入
字幕流。两个请求体的转录通道都会将所提供的来源
归一化为 `client`，包括自我声明的 `embedded` 或 `audio-bridge`
标签。只有服务器拥有的适配器才能通过仅限代码的 `trustedSource` 参数
赋予这些可信标签；请求中的 JSON 字段无法触达
该参数。无论其来源如何，转录文本始终是不可信的媒体派生内容，
绝不能用于决定授权。

高级调用方可以为同一视频提供一个 `audioTranscript` 轨道；
它被视为客户端提供的文本，而非服务器转录的证明。
融合接缝（fusion seam）在同一个截止时间（deadline）和中止信号下运行视觉与音频观察，
将它们排列在一条共同的时间线上，折叠完全重复项，并在只有一侧成功时
报告部分结果。无效的 `audioTranscript` 会降级为该部分结果——视觉
描述被保留，而音频分支记录一个经过清洗的失败代码——
而不是让整个视频处理失败。各分支的可用性、部分结果标志，
以及清洗后的失败代码都会保留在描述结果中、
护栏元数据中（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、结果缓存元数据中，以及桥接层
融合计数器中。默认的 Video Bridge 路径不会调用语音转文字，
也不会下载第二份媒体副本；没有该显式轨道时，它保持
仅视频处理。

**转录内容留存（#12150 P1）。** 每当 Video Bridge（本身需选择启用）渲染转录 cue 时，此机制都会自动生效——不存在单独的留存标志。当某个请求渲染了任意转录 cue（调用方声明的 `transcript` 或融合生成的 `audioTranscript`）时，护栏会将其标记为 `videoBridgeObserved`，并为视频描述生成一个脱敏影子副本——一个完全相同的渲染，只是其中每个 cue 的自由文本正文都被替换为 `[redacted-video-transcript]`；它是在字符串组装之前通过替换结构化 cue 字段构建的（绝不通过解析扁平化后的文本，因此任何 cue 内容——无论对抗性的还是普通的，包括含有 `]` 的正文，如 `[inaudible]`/`[music]`——都无法残留）。持久化的调用日志请求体会将每个视频衍生的文本部分替换为该脱敏影子副本，按内容相等性匹配；`fullText` 锚点会从已完成的调用前护栏负载中重新读取，因此即使在后续链式护栏（PII 与凭据掩码器，优先级 10/95）就地改写描述文本之后，以及在系统提示词/交接/记忆注入重塑消息数组之后，匹配仍然成功。发送给上游模型的请求体保持不变。已观测请求也不会写入任何持久化记忆（Memory）（请求衍生和响应衍生的提取都会被跳过），因此模型自身的回复无法将转录文本回显到 Memory 中。

**原始视频字段（#12430）。** 当桥接已启用且原生视频支持未知或缺失时，已定义的 `transcript`/`audioTranscript` 字段同样会激活 `videoBridgeObserved`，即使在描述生成失败或达到 `maxVideos` 限制之后亦然。`null` 和空字符串计入；缺失字段和非视频元数据不计入。留存副本会对这些字段进行脱敏或省略整个请求，并绕过缓存/Memory。

在这些回退路径上，有效的调用方 cue 会成为受支持的 `text`/`input_text` 部分，而不是非标准的提供方字段。请求提供的两条轨道都保持为不可信的 `client` 观测，并附带明确警告：视频未被描述，时间戳未针对媒体验证。现有的 256 cue/64 KiB 总量预算和单 cue 预算对两条轨道合并适用；时间戳必须符合 broker 的 600 秒上限以及任何给定的聚焦窗口。无效轨道会被丢弃，而不会作为任意文本转发；除非合并预算超限，否则有效的姊妹轨道仍可被使用。Null/空字段不添加任何文本。此回退不会增加任何媒体抓取或转写。转录扩展字段会从回退视频载体及其 `video_url`/`source` 对象中移除。OpenAI 线路协议允许列表保持严格；原生支持未知的视频载体仍然可用，已知的纯文本目标保留安全标记。结构化脱敏影子副本保护追加的转录文本，而调用方拥有的原始请求保持不变。原生支持的目标和已禁用的桥接保留其现有的绕过行为。

其他留存副本使用相同的已观测请求信号。原始的护栏前客户端请求快照、内存中的待处理请求以及早期拒绝请求日志，会在视频部分中结构性地替换转录字段；由流水线各阶段和上下文交接合成的字符串提示词，会在持久化请求体汇聚点（sink）处被脱敏。持久化的 `video_content_removed` 标记使 `previous_response_id` 续接以失败关闭（fail-closed）方式失败，而不是重建被有意丢弃的文本。如果已观测请求在记录日志之前丢失了按部分的脱敏影子副本，或者在后续请求变更之后多个视频影子副本中哪怕只有一个未能匹配，留存的请求体将被整体省略，而不是保留一份部分脱敏的转录。

对于已观测请求，模型响应可能会在没有结构化 cue 边界的情况下引用转录内容的任意部分。因此，其持久化调用日志的 `responseBody` 会被替换为省略标记；详细的流水线工件（可能包含上游/客户端请求体和流式分块）不会被留存。语义缓存、幂等缓存和推理重放缓存都会绕过该请求的读写。提供方请求和客户端可见的响应保持不变。当省略详细工件时，临时缓冲区中的早期保活字节会被排空。Kiro 的畸形 EventStream 警告只报告负载字节数，绝不报告其内容或 JSON 解析器的原始错误。这并不声称所有无关的提供方/插件诊断都已被审计；更广泛的留存汇聚点排查在 #11658 中跟踪。

内部 `/api/modality-bridge/video/drilldown` 生命周期是一个独立的、经回环/令牌认证的缓存底层。每个操作还需要一个规范的不透明主体 ID。在生产调用方启用之前，它必须从已认证租户派生该 ID，且绝不能转发客户端选择的值。缓存键将该主体与规范的会话 ID 和视频引用 ID 绑定，仅存储其 SHA-256 派生键，并将读取和删除都限定在同一主体范围内。缓存每条目最多存储 16 个派生 JPEG 帧，十分钟后过期，并支持有界的 `start`/`end` 读取或显式的会话删除。

每个主体限制为 16 个条目和 64 MiB 的规范 JPEG 数据。这些限制独立于全局 64 条目/256 MiB 上限：主体配额压力会先仅逐出该主体最近最少使用的条目，然后才考虑全局 LRU 逐出。过期条目会在缓存活动时从主体和全局记账中一并清除，而取消和验证失败不会提交部分替换。

缓存会拒绝非规范的 Base64、多余填充、非 JPEG 媒体、畸形或被截断的 JPEG，以及在有界全图 `sharp` 解码过程中产生警告的 JPEG。它会将每张被接受的图像重新编码为规范 JPEG，从解码后的字节中推导宽度和高度，而不是信任调用方字段，并丢弃任何尾随的多语言混合（polyglot）字节而非保留它们。只有经过界限约束的规范压缩缓冲区会计入两项配额。JSON 传输限制包含了 32 MiB 解码输入上限的 Base64 开销。每条存储的派生记录都会记录其经过验证的 JPEG 格式/分辨率、采样策略、派生版本、创建时间、服务器计算的内容哈希，以及哈希化的父级引用，外加可信调用方的父级内容哈希。在原子化缓存提交之前的各个异步解码/哈希阶段之间会检查取消操作。

本阶段尚未将生产端生产者接入路由，也不提供多分辨率变体选择。因此，透明的 Video Bridge 请求路径不会产生额外工作，而租户绑定的主体派生和完整的 FU-08 多分辨率生命周期仍属于明确的后续工作，而非已记录为完成的行为。

各帧使用配置的 Video 模型按顺序生成描述（caption）。空的 Video 覆盖项会继承 Vision 设置；如果两者均为空，Vision 自动路由器会选择实际具备视觉能力的模型。成功的描述会用稳定的 `[Video description:` 前缀替换原始部分，该前缀同时将文本标记为不可信的媒体派生观察结果，并告知下游模型不要遵循在媒体中发现的指令。帧描述缓存键包含 JPEG 字节、提示词、时间戳和实际生效的模型；只有成功的描述会被缓存。缓存条目保留实际成功的生产者模型，包括回退模型；当不同帧由不同模型生成时，桥接器会报告 `mixed`。缓存命中会复用该生产者身份，而不是将其重新标记为所请求的路由计划。整段视频结果缓存以所有会改变输出的输入为键——提示词、实际生效的模型、采样策略、帧数、语义分析模式、归一化焦点提示的 SHA-256 指纹、焦点窗口、`transcript`、`audioTranscript` 以及拼图（contact-sheet）标志——因此更改其中任何一个维度都是缓存未命中，绝不会出现陈旧复用。视觉去重策略版本、阈值和有界候选帧数也在结果缓存键和元数据中明确列出；因此策略变更不可能复用陈旧的整段视频描述。结果缓存 v4 元数据保留模式和指纹，绝不保留原始用户任务。防护栏元数据同时报告请求的分析模式和实际生效的分析模式；在缺少可用用户文本的情况下请求的 `focused` 模式会被报告为实际生效的 `full`。

防护栏会提取每个受支持的视频部分，但描述数量不超过 `modalityBridgeVideoMaxVideos`。对于已证实 `supportsVideo === false` 的目标，失败和超限的视频会变成明确的安全文本标记，从而不会有任何原始视频残留。当能力未知时，这些部分会保留其视频载体；任何回退转录文本都遵循上述有界文本转换。`supportsVideo === true` 的目标会绕过桥接器。客户端请求中止信号会贯穿下载、代理队列、子进程和描述调用传播；中止操作会在视频之间停止，绝不会以开放失败的方式回退到原始媒体。

运行时设置由数据库支持并经 Zod 验证：

| 键                                  | 默认值      | 范围 / 行为                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 可选运行时，需显式启用                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留通用描述；`focused` 使用有界的、不可信的最新用户上下文                     |
| `modalityBridgeVideoModel`          | `""`        | 继承 Vision Bridge 模型                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware` 或按比例分配的 `segment_aware`；检测器失败时回退到 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                                      |

超过 120 秒的旧有持久化 Video 超时值会被钳制到代理截止时间；超过该限制的新设置写入会被拒绝。
`GET /api/modality-bridge/video/runtime` 在身份验证或运行时探测之前要求带有可信标记的回环本地性，然后要求管理授权。它仅返回 `available`、经过净化处理的 FFmpeg/ffprobe 版本，以及运行时不可用时的固定原因。内部提取端点不是公开的上传 API：队列饱和返回 `503` 加上 `Retry-After`，调用方断开连接返回 `499`，固定的代理截止时间返回 `504`。转换后的响应会在中央的 `x-omniroute-modality-bridge` 标头中追加 `video->text;model=<visionModel>;parts=<videos>`，而不会移除 Vision 或 Audio 段。

### PII 掩码器（`piiMasker.ts`）

在**两个**阶段都会运行。

- **`preCall`** 会克隆请求负载（payload），遍历 `system`、`messages`、`input` 和 `prompt`（包括纯字符串项），并对字符串类型的 `content`/`text` 字段应用 `processPII()`（来自 `@/shared/utils/inputSanitizer`）。当 `PII_REDACTION_ENABLED=true` 时，检测到的 PII 会在出站负载中被脱敏。这与 `INPUT_SANITIZER_MODE` 相互独立（后者仅控制提示注入策略）。当脱敏关闭时，该调用只记录检测计数，而不改写内容。
- **`postCall`** 会深克隆响应，运行 `sanitizePIIResponse()` 以及针对 Responses-API 结构的掩码器（`maskResponsesOutput` — 覆盖 `output_text` 和 `output[].content[].text`）。如果发生了任何脱敏，修改后的响应将替换原始响应。

该护栏从不阻断请求；它只进行标注（`meta.detections`、`meta.redacted`）或改写。

#### 按类型选择、自定义模式与检测计数器

**仪表盘 → 设置 → 安全 → PII 脱敏** 用于选择脱敏的_对象_。它并不负责开启脱敏：开启仍由 `PII_REDACTION_ENABLED`（请求）和 `PII_RESPONSE_SANITIZATION`（响应 + SSE）控制，二者默认均为关闭。

- **按类型选择** — 内置 id 列于 `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）。未设置表示启用所有类型（即此设置引入之前的行为）。请求引擎的 `ssn_us` 模式会映射到 `ssn`。模板（Minimal、Standard、Financial、Brazilian、USA、Full）仅用于填充 UI 中的复选框。
- **自定义模式** — 最多 20 个正则或通配符模式（`*` = 最多 64 个非空白字符，`?` = 一个字符）。匹配内容会被替换为 `[CUSTOM_REDACTED]`。每个模式都会经过 `compilePiiCustomPattern()`（`src/shared/utils/piiCustomPatterns.ts`）校验：最多 500 个字符，标志位仅限 `g i m s u`，必须能编译，必须通过 `safe-regex` 检查（防止灾难性回溯），且不得匹配空字符串或脱敏占位符。校验失败的模式在保存和测试时都会被拒绝；已存储的某条记录若校验失败，则会在运行时被跳过，而不会被编译。自定义模式仅在脱敏开启时运行。
- **检测计数器** — 按类型计数（绝不记录匹配到的具体值），保存在内存中，重启后重置（`src/lib/pii/piiDetectionStats.ts`）。计数仅在脱敏开启时增加。

这些设置存储在 `key_value` 表中（命名空间 `pii_settings`，`src/lib/db/piiSettings.ts`），并通过 1 秒缓存读取。API：

| 方法   | 路径                     | 用途                                                       |
| ------ | ------------------------ | ---------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 标志状态、`enabledTypes`、`customPatterns`、检测计数器     |
| `PUT`  | `/api/settings/pii`      | 替换 `enabledTypes`（`null` = 全部）和/或 `customPatterns` |
| `POST` | `/api/settings/pii/test` | 针对最多 8 KB 的样本对单个模式进行试运行；不存储任何内容   |

这三个接口都需要管理权限认证，并使用 Zod 校验请求体（`src/shared/validation/schemas/piiSettings.ts`）。

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
