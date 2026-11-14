# OmniRoute Architecture (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ARCHITECTURE.md) · 🇪🇹 [am](../../../am/docs/architecture/ARCHITECTURE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ARCHITECTURE.md) · 🇦🇿 [az](../../../az/docs/architecture/ARCHITECTURE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ARCHITECTURE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ARCHITECTURE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ARCHITECTURE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ARCHITECTURE.md) · 🇩🇰 [da](../../../da/docs/architecture/ARCHITECTURE.md) · 🇩🇪 [de](../../../de/docs/architecture/ARCHITECTURE.md) · 🇬🇷 [el](../../../el/docs/architecture/ARCHITECTURE.md) · 🇪🇸 [es](../../../es/docs/architecture/ARCHITECTURE.md) · 🇪🇪 [et](../../../et/docs/architecture/ARCHITECTURE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ARCHITECTURE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ARCHITECTURE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ARCHITECTURE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ARCHITECTURE.md) · 🇮🇱 [he](../../../he/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ARCHITECTURE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ARCHITECTURE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ARCHITECTURE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ARCHITECTURE.md) · 🇮🇩 [id](../../../id/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ARCHITECTURE.md) · 🇮🇹 [it](../../../it/docs/architecture/ARCHITECTURE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ARCHITECTURE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ARCHITECTURE.md) · 🇰🇭 [km](../../../km/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ARCHITECTURE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ARCHITECTURE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ARCHITECTURE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ARCHITECTURE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ARCHITECTURE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ARCHITECTURE.md) · 🇲🇲 [my](../../../my/docs/architecture/ARCHITECTURE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ARCHITECTURE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ARCHITECTURE.md) · 🇳🇴 [no](../../../no/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [or](../../../or/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ARCHITECTURE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ARCHITECTURE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ARCHITECTURE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ARCHITECTURE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ARCHITECTURE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ARCHITECTURE.md) · 🇱🇰 [si](../../../si/docs/architecture/ARCHITECTURE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ARCHITECTURE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ARCHITECTURE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ARCHITECTURE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ARCHITECTURE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [te](../../../te/docs/architecture/ARCHITECTURE.md) · 🇹🇭 [th](../../../th/docs/architecture/ARCHITECTURE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ARCHITECTURE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ARCHITECTURE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ARCHITECTURE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ARCHITECTURE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ARCHITECTURE.md)

---

title: "OmniRoute 架构"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute 架构

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ARCHITECTURE.md) · 🇪🇹 [am](../../../am/docs/architecture/ARCHITECTURE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ARCHITECTURE.md) · 🇦🇿 [az](../../../az/docs/architecture/ARCHITECTURE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ARCHITECTURE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ARCHITECTURE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ARCHITECTURE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ARCHITECTURE.md) · 🇩🇰 [da](../../../da/docs/architecture/ARCHITECTURE.md) · 🇩🇪 [de](../../../de/docs/architecture/ARCHITECTURE.md) · 🇬🇷 [el](../../../el/docs/architecture/ARCHITECTURE.md) · 🇪🇸 [es](../../../es/docs/architecture/ARCHITECTURE.md) · 🇪🇪 [et](../../../et/docs/architecture/ARCHITECTURE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ARCHITECTURE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ARCHITECTURE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ARCHITECTURE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ARCHITECTURE.md) · 🇮🇱 [he](../../../he/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ARCHITECTURE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ARCHITECTURE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ARCHITECTURE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ARCHITECTURE.md) · 🇮🇩 [id](../../../id/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ARCHITECTURE.md) · 🇮🇹 [it](../../../it/docs/architecture/ARCHITECTURE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ARCHITECTURE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ARCHITECTURE.md) · 🇰🇭 [km](../../../km/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ARCHITECTURE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ARCHITECTURE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ARCHITECTURE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ARCHITECTURE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ARCHITECTURE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ARCHITECTURE.md) · 🇲🇲 [my](../../../my/docs/architecture/ARCHITECTURE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ARCHITECTURE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ARCHITECTURE.md) · 🇳🇴 [no](../../../no/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [or](../../../or/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ARCHITECTURE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ARCHITECTURE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ARCHITECTURE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ARCHITECTURE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ARCHITECTURE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ARCHITECTURE.md) · 🇱🇰 [si](../../../si/docs/architecture/ARCHITECTURE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ARCHITECTURE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ARCHITECTURE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ARCHITECTURE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ARCHITECTURE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ARCHITECTURE.md) · 🇮🇳 [te](../../../te/docs/architecture/ARCHITECTURE.md) · 🇹🇭 [th](../../../th/docs/architecture/ARCHITECTURE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ARCHITECTURE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ARCHITECTURE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ARCHITECTURE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ARCHITECTURE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ARCHITECTURE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ARCHITECTURE.md)

---

_最后更新：2026-06-28_

## 执行摘要

OmniRoute是基于Next.js构建的本地AI路由网关和仪表板。它提供单个 OpenAI 兼容端点 (`/v1/*`)，并通过转换、回退、令牌刷新和使用跟踪在多个上游提供者之间路由流量。

核心能力：

- 用于CLI/tools的 OpenAI 兼容API表面（394 个提供程序，159 个执行程序模块）
- 跨提供者格式的Request/response翻译
- 模型组合后备（多模型序列）
- 结构化组合步骤 (`provider + model + connection`)，运行时按`compositeTiers`排序
- 账户级回退（每个提供者多个账户）
- 主聊天路径中的配额预检和配额感知P2C帐户选择
- OAuth + API 密钥提供者连接管理（27 个OAuth提供者模块）
- 通过`/v1/embeddings`嵌入生成（18 个提供者）
- 通过`/v1/images/generations`生成图像（10 个+提供者，20 个+模型）
- 通过`/v1/audio/transcriptions`进行音频转录（18 个提供者）
- 通过`/v1/audio/speech`进行文本转语音（24 个内置提供者）
- 通过`/v1/videos/generations`生成视频 (ComfyUI + SD WebUI)
- 通过`/v1/music/generations` (ComfyUI) 生成音乐
- 通过`/v1/search`进行网络搜索（20 个提供者）
- 通过`/v1/moderations`进行审核
- 通过`/v1/rerank`重新排名
- 考虑标签解析（`<think>...</think>`）用于推理模型
- 响应清理以实现严格的OpenAI SDK兼容性
- 角色规范化（开发者→系统、系统→用户）以实现跨提供者兼容性
- 结构化输出转换（json_schema → Gemini responseSchema）
- 提供者、密钥、别名、组合、设置、定价的本地持久性（122 个DB模块）
- Usage/cost跟踪和请求记录
- 用于multi-device/state同步的可选云同步
- IP allowlist/blocklist用于API访问控制
- 预算管理思维（passthrough/auto/custom/adaptive）
- 全局系统提示注入
- 会话跟踪和指纹识别
- 通过特定于提供者的配置文件增强每个帐户的速率限制
- 提供者弹性的断路器模式
- 通过互斥锁实现防雷群保护
- 基于签名的请求重复数据删除缓存
- 领域层：成本规则、回退策略、锁定策略
- 上下文中继：帐户轮换连续性的会话切换摘要
- 域状态持久性（用于回退、预算、锁定、断路器的SQLite直写式缓存）
- 用于集中请求评估的策略引擎（锁定→预算→后备）
- 使用p50/p95/p99延迟聚合请求遥测
- 通过`combo_execution_key` / `combo_step_id`组合目标遥测和历史组合目标健康状况
- 用于端到端跟踪的关联ID (X-Request-Id)
- 根据API密钥选择退出的合规性审核日志记录
- LLM质量保证评估框架
- 具有实时提供者断路器状态的健康仪表板
- MCP服务器（110 个工具），具有 3 种传输方式 (stdio/SSE/Streamable HTTP)
- A2A服务器（JSON-RPC 2.0 + SSE）具有技能和任务生命周期
- 记忆系统（提取、注入、检索、总结）
- 技能系统（注册中心、执行器、沙箱、内置技能）
- 具有证书管理和DNS处理功能的MITM代理
- 提示注入防护中间件
- 使用 Caveman、 RTK、堆叠管道、压缩组合、语言包和分析来提示压缩管道
- ACP （代理通信协议）注册表
- 模块化OAuth提供程序（ `src/lib/oauth/providers/`下有 22 个单独的模块）
- Uninstall/full-uninstall脚本
- OAuth环境修复行动
- 用于兼容 OpenAI 的WS客户端的WebSocket桥接器 (`/v1/ws`)
- 同步令牌管理（issue/revoke、ETag 版本配置包下载）
- GLM思维（`glmt`）一流提供者预设
- 混合令牌计数（具有估计回退的提供者方`/messages/count_tokens` ）
- 模型别名自动播种（启动时 30 个+跨代理方言标准化）
- 通过SSRF防护、私有URL阻止和可配置重试进行安全出站提取
- 使用可配置的`requestRetry`和`maxRetryIntervalSec`进行冷却感知聊天重试
- 启动时使用Zod验证运行时环境
- 具有分页、提供者CRUD事件和 SSRF 阻止的验证日志记录的合规性审核 v2

主要运行时模型：

- `src/app/api/*`下的Next.js应用程序路由同时实现仪表板APIs和兼容性APIs
- `src/sse/*` + `open-sse/*`中的共享SSE/routing核心处理提供程序执行、转换、流式传输、回退和使用

## 参考架构图

v3.8.0 平台的权威版本控制 Mermaid 源文件位于
[`docs/diagrams/`](../diagrams/README.md)。以下展示其中两幅以供概览；
其余图表可从各自领域指南中获取。

![请求管线 (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> 源文件：[diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

![三层容灾模型](../diagrams/exported/resilience-3layers.svg)

> 源文件：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd) — 另见
> [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) 和 `CLAUDE.md` 中的容灾参考。

## 范围与边界

### 范围内

- 本地网关运行时
- 控制台管理 API
- 服务商认证与 Token 刷新
- 请求格式转换和 SSE 流式传输
- 本地状态 + 用量持久化
- 可选的云端同步编排

### 范围外

- `NEXT_PUBLIC_CLOUD_URL` 背后的云端服务实现
- 本地进程之外的服务商 SLA/控制面
- 外部 CLI 二进制程序本身（Claude Code、Codex CLI 等）

## 仪表盘界面（当前）

`src/app/(dashboard)/dashboard/` 下的主要页面：

- `/dashboard` — 快速入门 + 提供者概览
- `/dashboard/endpoint` — 端点代理 + MCP + A2A + API 端点标签页
- `/dashboard/providers` — 提供者连接和凭据
- `/dashboard/combos` — 组合策略、模板、分步构建器、模型路由规则、手动持久化排序
- `/dashboard/auto-combo` — Auto Combo Engine：评分权重、模式包、虚拟工厂预设、遥测
- `/dashboard/costs` — 成本汇总和定价可见性
- `/dashboard/analytics` — 使用情况分析、评估、组合目标运行状况
- `/dashboard/limits` — 配额/速率控制
- `/dashboard/cli-tools` — CLI 引导、运行时检测、配置生成
- `/dashboard/agents` — 检测到的 ACP 智能体 + 自定义智能体注册
- `/dashboard/cloud-agents` — 云托管智能体任务（Codex Cloud、Devin、Jules）及任务生命周期
- `/dashboard/skills` — A2A 技能注册表、沙盒执行、内置技能目录
- `/dashboard/memory` — 持久化对话记忆的检查和检索
- `/dashboard/webhooks` — 出站 Webhook 订阅、密钥轮换、重试统计
- `/dashboard/batch` — 批处理作业提交和进度
- `/dashboard/cache` — 直读缓存和推理缓存统计、驱逐控制
- `/dashboard/playground` — 面向任意已配置组合/模型的交互式聊天演练场
- `/dashboard/changelog` — 应用内变更日志查看器（渲染 `CHANGELOG.md`）
- `/dashboard/system` — 运行时诊断、版本信息、环境验证界面
- `/dashboard/onboarding` — 面向新安装实例的首次运行设置向导
- `/dashboard/media` — 图像/视频/音乐演练场
- `/dashboard/search-tools` — 搜索提供者测试和历史记录
- `/dashboard/health` — 正常运行时间、断路器、速率限制、配额监控会话
- `/dashboard/logs` — 请求/代理/审计/控制台日志
- `/dashboard/settings` — 系统设置标签页（常规、路由、组合默认值等）
- `/dashboard/context/caveman` — Caveman 压缩规则、语言包、预览和输出模式
- `/dashboard/context/rtk` — RTK 命令输出过滤器、预览和运行时安全设置
- `/dashboard/context/combos` — 分配给路由组合的命名压缩管线
- `/dashboard/translator` — 翻译器检查和请求格式转换预览
- `/dashboard/audit` — 支持分页和结构化元数据的合规审计日志浏览器
- `/dashboard/usage` — 与 `usage_history` 关联的逐请求使用情况浏览器
- `/dashboard/compression` — 压缩分析、统计和管线分配
- `/dashboard/api-manager` — API 密钥生命周期和模型权限

UI 层：每个页面都渲染在同一个外壳中 — `src/app/(dashboard)/layout.tsx` →
`src/shared/components/layouts/DashboardLayout.tsx` → `DashboardShell.tsx`（该工具包的
`SidebarProvider`/`SidebarInset`，以及 OmniRoute 的 `Sidebar.tsx` 和 `Header.tsx`）。页面从
`@/shared/components`（对 `packages/ui-kit` 中随附的 Keak CI UI Kit 的适配器）或工具包组件子路径（`@omniroute/ui-kit/table`、`…/page-header`）导入其
构建块，并通过 `<Icon>`（`ICON_MAP` → Lucide）导入图标。主题（默认为 `system`，支持浅色/深色）和令牌通过
`src/app/globals.css` 中的桥接层来自该工具包。详细信息：`docs/architecture/DESIGN_SYSTEM.md`。

## 高层系统上下文

```mermaid
flowchart LR
    subgraph Clients[开发者客户端]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[自定义 OpenAI 兼容客户端]
        BROWSER[浏览器仪表板]
    end

    subgraph Router[OmniRoute 本地进程]
        API[V1 兼容 API\n/v1/*]
        DASH[仪表板 + 管理 API\n/api/*]
        CORE[SSE + 转换核心\nopen-sse + src/sse]
        DB[(storage.sqlite)]
        UDB[(用量表 + 日志制品)]
    end

    subgraph Upstreams[上游提供者]
        P1[OAuth 提供者\nClaude/Codex/Gemini/Qoder/GitHub/Kiro/Cursor/Antigravity]
        P2[API 密钥提供者\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[兼容节点\nOpenAI 兼容 / Anthropic 兼容]
    end

    subgraph Cloud[可选的云同步]
        CLOUD[云同步端点\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## 核心运行时组件

## 1) API 与路由层（Next.js App Routes）

主要目录：

- `src/app/api/v1/*` 和 `src/app/api/v1beta/*` — 兼容 API
- `src/app/api/*` — 管理/配置 API
- `next.config.mjs` 中的 Next.js 重写规则将 `/v1/*` 映射到 `/api/v1/*`

重要的兼容路由：

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — 包含标记为 `custom: true` 的自定义模型
- `src/app/api/v1/embeddings/route.ts` — 向量嵌入生成（6 个服务商）
- `src/app/api/v1/images/generations/route.ts` — 图片生成（4+ 个服务商，含 Antigravity/Nebius）
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — 专用每服务商聊
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — 专用每服务商向量嵌入
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — 专用每服务商图片生成
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

管理领域：

- 认证/设置：`src/app/api/auth/*`, `src/app/api/settings/*`
- 服务商/连接：`src/app/api/providers*`
- 服务商节点：`src/app/api/provider-nodes*`
- 自定义模型：`src/app/api/provider-models` (GET/POST/DELETE)
- 模型目录：`src/app/api/models/route.ts` (GET)
- 代理配置：`src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth：`src/app/api/oauth/*`
- API Key/别名/Combo/定价：`src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- 用量：`src/app/api/usage/*`
- 同步/云端：`src/app/api/sync/*`, `src/app/api/cloud/*`
- CLI 工具辅助：`src/app/api/cli-tools/*`
- IP 过滤：`src/app/api/settings/ip-filter` (GET/PUT)
- Thinking Budget：`src/app/api/settings/thinking-budget` (GET/PUT)
- 系统提示：`src/app/api/settings/system-prompt` (GET/PUT)
- 压缩：`src/app/api/settings/compression`, `src/app/api/compression/*` 和
  `src/app/api/context/*`
- 会话：`src/app/api/sessions` (GET)
- 速率限制：`src/app/api/rate-limits` (GET)
- 容灾：`src/app/api/resilience` (GET/PATCH) — 请求队列、连接冷却、服务商熔断器、等待冷却配置
- 容灾重置：`src/app/api/resilience/reset` (POST) — 重置服务商熔断器
- 缓存统计：`src/app/api/cache/stats` (GET/DELETE)
- 遥测：`src/app/api/telemetry/summary` (GET)
- 预算：`src/app/api/usage/budget` (GET/POST)
- 容灾链：`src/app/api/fallback/chains` (GET/POST/DELETE)
- 合规审计：`src/app/api/compliance/audit-log` (GET, 含分页 + 结构化元数据)
- 评估：`src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- 策略：`src/app/api/policies` (GET/POST)
- 同步 Token：`src/app/api/sync/tokens` (GET/POST), `src/app/api/sync/tokens/[id]` (GET/DELETE)
- 配置包：`src/app/api/sync/bundle` (GET, ETag 版本控制的设置/服务商/Combo/Key 快照)
- WebSocket：`src/app/api/v1/ws/route.ts` — OpenAI 兼容 WS 客户端的 Upgrade 处理

## 2) SSE +翻译核心

主要流程模块：

- 条目： `src/sse/handlers/chat.ts`
- 核心编排： `open-sse/handlers/chatCore.ts`
- 提供者执行适配器： `open-sse/executors/*`
- 格式detection/provider配置： `open-sse/services/provider.ts`
- 型号parse/resolve: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- 账户回退逻辑： `open-sse/services/accountFallback.ts`
- 翻译登记处： `open-sse/translator/index.ts`
- 流转换： `open-sse/utils/stream.ts`、 `open-sse/utils/streamHandler.ts`
- 用法extraction/normalization: `open-sse/utils/usageTracking.ts`
- 认为标签解析器： `open-sse/utils/thinkTagParser.ts`
- 嵌入处理程序： `open-sse/handlers/embeddings.ts`
- 嵌入提供者注册表： `open-sse/config/embeddingRegistry.ts`
- 图像生成处理程序： `open-sse/handlers/imageGeneration.ts`
- 图像提供者注册表： `open-sse/config/imageRegistry.ts`
- 响应清理： `open-sse/handlers/responseSanitizer.ts`
- 角色规范化： `open-sse/services/roleNormalizer.ts`

服务（业务逻辑）：

- 帐号selection/scoring: `open-sse/services/accountSelector.ts`
- 上下文生命周期管理： `open-sse/services/contextManager.ts`
- IP过滤器执行： `open-sse/services/ipFilter.ts`
- 会话跟踪： `open-sse/services/sessionManager.ts`
- 请求重复数据删除： `open-sse/services/signatureCache.ts`
- 系统提示注入： `open-sse/services/systemPrompt.ts`
- 预算管理思维： `open-sse/services/thinkingBudget.ts`
- 通配符模型路由： `open-sse/services/wildcardRouter.ts`
- 速率限制管理： `open-sse/services/rateLimitManager.ts`
- 断路器： `src/shared/utils/circuitBreaker.ts`
- 上下文切换： `open-sse/services/contextHandoff.ts` —切换摘要生成和上下文中继策略注入
- 压缩：提供者翻译之前的`open-sse/services/compression/*` —主动压缩；包括 Caveman 规则、 RTK过滤器、堆叠管道、压缩组合、统计数据和验证
- Codex配额获取器： `open-sse/services/codexQuotaFetcher.ts` —获取Codex配额以进行上下文中继切换决策
- 冷却感知重试： `src/sse/services/cooldownAwareRetry.ts` —每个模型冷却重试，可配置`requestRetry` / `maxRetryIntervalSec`
- 安全出站提取： `src/shared/network/safeOutboundFetch.ts` —保护的provider/model提取，具有SSRF保护、私有 URL 阻止、重试和超时
- 出站URL防护： `src/shared/network/outboundUrlGuard.ts` —主机检查提供者URLs； `src/shared/network/outboundUrlGuardPolicy.ts`从`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`、 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`及其仪表板切换中选择模式（请参阅`docs/reference/ENVIRONMENT.md`）
- 提供者请求默认值： `open-sse/services/providerRequestDefaults.ts` —提供者级别`maxTokens`、 `temperature`、 `thinkingBudgetTokens`默认值
- GLM提供者常量： `open-sse/config/glmProvider.ts` —共享GLM模型、配额URLs、 GLMT timeout/defaults
- Antigravity上游： `open-sse/config/antigravityUpstream.ts` —基础URL和发现路径常量
- Codex客户端常量： `open-sse/config/codexClient.ts` —版本化用户代理和客户端版本值
- 模型别名种子： `src/lib/modelAliasSeed.ts` — seeds 启动时的 30 个+跨代理方言别名

领域层模块：

- 成本rules/budgets: `src/domain/costRules.ts`
- 后备策略： `src/domain/fallbackPolicy.ts`
- 预留组合解析合约： `src/domain/comboResolver.ts`；实时路由使用`open-sse/services/combo.ts`
- 锁定政策： `src/domain/lockoutPolicy.ts`
- 预留策略评估合约： `src/domain/policyEngine.ts`；请求路径通过`src/shared/utils/apiKeyPolicy.ts`强制执行 API 密钥策略，并通过`src/sse/handlers/chat/resolvedModelPolicy.ts`强制解析目标授权
- 错误代码目录： `src/shared/constants/errorCodes.ts`
- 请求ID: `src/shared/utils/requestId.ts`
- 获取超时： `src/shared/utils/fetchTimeout.ts`
- 请求遥测： `src/shared/utils/requestTelemetry.ts`
- Compliance/audit: `src/lib/compliance/index.ts`
- 评估跑步者： `src/lib/evals/evalRunner.ts`
- 域状态持久性： `src/lib/db/domainState.ts` — SQLite CRUD用于后备链、预算、成本历史记录、锁定状态、断路器

OAuth提供者模块（ `src/lib/oauth/providers/`下有 27 个单独的文件）：

- 注册表索引： `src/lib/oauth/providers/index.ts`
- 个体提供者： `agy.ts`、 `antigravity.ts`、 `claude.ts`、 `cline.ts`、 `codebuddy-cn.ts`、 `codebuddy-intl.ts`、 `codex.ts`、 `cursor.ts`、 `devin-desktop.ts`、 `ghe-copilot.ts`、 `github.ts`、 `gitlab-duo.ts`、 `grok-cli-oauth.ts`、 `grok-cli.ts`、 `kilocode.ts`、 `kimi-coding.ts`、 `kiro.ts`、 `muse-code.ts`、 `openference.ts`、 `qoder.ts`、 `trae.ts`、 `workbuddy.ts`、 `xai-oauth.ts`、 `zed-hosted.ts`, `zed.ts`
- 共享助手： `codebuddyDeviceAuth.ts` （CodeBuddy CN/intl设备流程）、 `museCodeDeviceResponse.ts`
- 瘦包装器： `src/lib/oauth/providers.ts` —从各个模块重新导出

## 5) 嵌入式服务（v3.8.4）

OmniRoute 可以安装、监管并路由到本地运行的 AI 工具进程，称为**嵌入式服务**。
v3.8.4 中发布了两项：9Router 和 CLIProxyAPI。

架构层级：

- **UI** (`/dashboard/providers/services`) — 双标签页页面，含生命周期控制、
  实时日志流式传输、API Key 管理，以及（针对 9Router）通过内部反向代理提供嵌入式原生 UI。
- **API** (`/api/services/{name}/*`) — 9Router 8 个端点，CLIProxyAPI 7 个端点，
  均归类为 **LOCAL_ONLY**（硬规则 #17）。共享的 `GET /api/services/[name]/logs`
  SSE 端点同时服务于两者。
- **监管进程** (`src/lib/services/`) — 泛型 `ServiceSupervisor` 类封装了
  `child_process.spawn`，持有一个 5 MB 环形缓冲区用于 SSE 日志流式传输、一个健康
  探测循环、一个原子操作锁，以及 SIGTERM→SIGKILL 优雅关闭流程。
  `bootstrap.ts` 在进程启动时自动配置所有已启用的服务。
- **服务商/执行器** (`open-sse/executors/ninerouter.ts`) — 9Router 作为
  真实服务商对外暴露。模型前缀为 `9router/{sub}/{model}`，每 5 分钟从 9Router 的
  `/v1/models` 端点同步一次。

深入阅读：`docs/frameworks/EMBEDDED-SERVICES.md`

## 主要子系统 (v3.8.0)

### A. 汽车组合发动机

自动组合在请求时动态评分和选择路由目标，而不是依赖于静态组合定义。它为`auto/*`模型前缀系列提供支持。

- 引擎条目： `open-sse/services/autoCombo/` （`autoComboEngine.ts`， `scoringEngine.ts`， `virtualFactory.ts`， `modePacks.ts`）
- 实时组合条目： `open-sse/services/combo.ts` （`handleComboChat`， `resolveComboTargets`），由`src/sse/handlers/chat.ts`调用
- 仪表板： `/dashboard/auto-combo`
- 遥测： `auto_combo_decisions` SQLite表

关键能力：

- **22种路由策略**（优先级、加权、先填充、循环、 P2C、随机、最少使用、成本优化、重置感知、重置窗口、到期优先、净空、配额加权、严格随机、**汽车**、lkgp、上下文优化、缓存优化、上下文中继、**融合**、pipeline、jev) — auto 是 v3.8.0 中的标题添加内容； `fusion` （面板扇出+判断综合， `open-sse/services/fusion.ts`）是 v3.8.36 中的新增功能。
- **16因素评分**：配额、运行状况、逆成本、逆延迟、任务适合度等等。因素的规范表及其默认权重位于[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md) —中，在这里重述它会使其成为第二个过时的地方。
- **虚拟工厂**当不存在匹配的命名组合时，会实现临时组合，从健康的活跃提供者连接中寻找候选人。
- **自动前缀**： `auto/coding`、 `auto/cheap`、 `auto/fast`、 `auto/offline`、 `auto/smart`、 `auto/lkgp` —每个都由调整后的权重配置文件支持。
- **6 个模式包**： `ship-fast`、 `cost-saver`、 `quality-first`、 `offline-friendly`、 `reliability-first`和`chaos-mode` —可从仪表板调用的预设权重配置。 （不要与上面的`auto/*`前缀混淆，它们是请求时的变体。）

有关完整的算法详细信息（因子公式、权重调整），请参阅[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md) 。

### B. 云代理

云代理将第三方托管代码代理平台（Codex Cloud、 Devin、 Jules）包装在统一的数据库支持的任务生命周期后面。所有任务creation/inspection端点都需要管理身份验证。

- 模块根： `src/lib/cloudAgent/` （`baseAgent.ts`、 `registry.ts`、 `api.ts`、 `types.ts`、 `db.ts`，以及`agents/`下的每个代理子目录）
- 每个代理实现： `agents/codex/`、 `agents/devin/`、 `agents/jules/`
- 公共端点： `/api/v1/agents/tasks/*` （list/create/get/cancel）
- 管理端点： `/api/cloud/*` （配置、状态、批次）
- 仪表板： `/dashboard/cloud-agents`
- 存储： `cloud_agent_tasks`表

有关每个代理配置和OAuth详细信息，请参阅[`docs/frameworks/CLOUD_AGENT.md`](../frameworks/CLOUD_AGENT.md) 。

### C、护栏

Guardrails 模块是一个可热重载的中间件层，用于检查PII、提示注入和不安全视觉内容的请求和响应。违规使HTTP短路请求**503**加上结构化错误代码，允许下游调用者重试或分支。

- 模块根： `src/lib/guardrails/` (`base.ts`, `registry.ts`, `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`)
- 热重载：注册表监视配置更改并就地重建链
- 接入点：聊天处理程序入口、图像生成处理程序、响应清理程序
- HTTP合约：违规行为表现为`503`和`error.code = "GUARDRAIL_VIOLATION"`

有关规则集创作和阈值调整，请参阅[`docs/security/GUARDRAILS.md`](../security/GUARDRAILS.md) 。

### D. 域层

`src/domain/`命名空间包含域服务和保留的评估合约。它不是每个请求的强制策略入口点。

实时聊天路径从`src/shared/utils/apiKeyPolicy.ts`调用`enforceApiKeyPolicy()` ；解析模型和组合成员的授权是在`src/sse/handlers/chat/resolvedModelPolicy.ts`中实现的。 `src/app/api/v1/chat/completions/route.ts`中的自托管条目还在调度之前强制执行 API 密钥策略。组合解析通过`open-sse/services/combo.ts`进行。

`src/domain/policyEngine.ts`、 `src/domain/comboResolver.ts`和`src/lib/container.ts`仍然是经过测试的合约，而不是该请求路径的接线。容器注册策略引擎，但检查的生产请求路径未解析它。单独更改这些合同不会更改实时聊天策略或组合路由；连接或移除它们需要单独的设计决策。

- 预留策略引擎： `src/domain/policyEngine.ts` —锁定→预算→后备评估
- 费用规则： `src/domain/costRules.ts`
- 后备策略： `src/domain/fallbackPolicy.ts`
- 锁定政策： `src/domain/lockoutPolicy.ts`
- 基于标签的路由： `src/domain/tagRouter.ts`
- 预留组合解析器： `src/domain/comboResolver.ts` —独立选择合约；实时组合路由是在`open-sse/services/combo.ts`中实现的
- Connection/model规则加入者： `src/domain/connectionModelRules.ts`
- 模型可用性快照： `src/domain/modelAvailability.ts`
- 提供者到期跟踪： `src/domain/providerExpiration.ts`
- 配额缓存： `src/domain/quotaCache.ts`。提供者添加和删除配额窗口（OpenAI删除了某些计划的 5 小时Codex窗口），因此读取提供者的适配器证明已完成的使用（`quotasComplete`，请参阅`src/lib/usage/usageReading.ts`）是帐户的完整窗口集：之前已知但不存在的窗口已退休，在缓存中，在`quota_snapshots`中重新启动补水（附加的退休记录），在持久的Codex配额状态和Claude的饱和桶中。部分证据（响应标头、陈旧副本）仅更新其携带的窗口。
- 降解状态： `src/domain/degradation.ts`
- 配置审核： `src/domain/configAudit.ts`
- OmniRoute响应元数据生成器： `src/domain/omnirouteResponseMeta.ts`
- 评估子系统： `src/domain/assessment/` —定期评估作业

### E. 授权管道

授权管道对每个传入请求进行分类，并在分派之前应用适当的策略链。

- 管道入口： `src/server/authz/pipeline.ts`
- 请求分类器： `src/server/authz/classify.ts` —区分公共兼容路由和管理路由
- 公共路线库存： `src/shared/constants/publicApiRoutes.ts`
- 策略： `src/server/authz/policies/` —可组合谓词（`requireApiKey`、 `requireManagement`、 `requireFreshAuth`等）
- 标头实用程序： `src/server/authz/headers.ts`
- 断言助手： `src/server/authz/assertAuth.ts`
- 请求上下文： `src/server/authz/context.ts`

公共路由与管理路由是一个硬边界： agent/cooldown APIs和提供者突变需要管理身份验证（如果缺少，则为HTTP 401）。

完整的路由分类规则请参见[`docs/architecture/AUTHZ_GUIDE.md`](./AUTHZ_GUIDE.md) 。

### F. 工作流FSM和任务感知路由器

有限状态机驱动的路由器位于组合选择之上，可根据检测到的工作流程阶段（计划、执行、审查）和后台任务关联来引导流量。

- 工作流程FSM: `open-sse/services/workflowFSM.ts`
- 任务感知路由器： `open-sse/services/taskAwareRouter.ts`
- 后台任务检测器： `open-sse/services/backgroundTaskDetector.ts`
- 意图分类器： `open-sse/services/intentClassifier.ts`

FSM转换纳入 Auto Combo 的评分中，偏向于background/automation任务的更便宜的模型，以及用于交互式planning/review转弯的更强的模型。

### G. 特定于提供者的弹性

一些提供者提供了专用的弹性和隐形模块，这些模块搭载在全局断路器/连接冷却/模型锁定层上：

- Antigravity 429 引擎： `open-sse/services/antigravity429Engine.ts` （轮换身份、清理响应标头、通过`antigravityCredits.ts`、 `antigravityHeaderScrub.ts`、 `antigravityHeaders.ts`、 `antigravityIdentity.ts`、 `antigravityVersion.ts`驱动credits/version跟踪）
- Antigravity 429 防护： `open-sse/services/antigravity429Guard.ts` （所有主机上的上游 429 的每个请求预算， `ANTIGRAVITY_MAX_429_ATTEMPTS`；本地应答拒绝正文的相同重新发送； `src/sse/handlers/chat.ts`不会通过冷却感知重试重新启动此类请求）
- ModelScope配额政策： `open-sse/services/modelscopePolicy.ts`
- Claude代码CCH （兼容通道握手）： `open-sse/services/claudeCodeCCH.ts`，加上`claudeCodeCompatible.ts`、 `claudeCodeConstraints.ts`、 `claudeCodeExtraRemap.ts`、 `claudeCodeToolRemapper.ts`
- Claude代码指纹整形： `open-sse/services/claudeCodeFingerprint.ts`
- Claude代码混淆： `open-sse/services/claudeCodeObfuscation.ts`

有关完整的隐形剧本和操作指南，请参阅`docs/security/STEALTH_GUIDE.md` （git；未编译到`/docs`中）。

### H. Webhooks、推理缓存、读取缓存

- **网络钩子**—用于provider/account/task事件的出站调度。
  - 调度员： `src/lib/webhookDispatcher.ts`
  - 存储： `webhooks` SQLite表（通过`src/lib/db/webhooks.ts`）
  - 仪表板： `/dashboard/webhooks` （订阅、机密、重试历史记录）
  - 有关事件分类和重试语义，请参阅[`docs/frameworks/WEBHOOKS.md`](../frameworks/WEBHOOKS.md) 。
- **推理缓存**—可重播推理块，用于发出思考标记（Claude、 GLMT等）的提供者，因此连续回合可以跳过重新思考。
  - DB层： `src/lib/db/reasoningCache.ts`
  - 服务层： `open-sse/services/reasoningCache.ts`
  - 有关重播语义，请参阅[`docs/routing/REASONING_REPLAY.md`](../routing/REASONING_REPLAY.md) 。
- **读取缓存**—短期响应缓存，由签名键控，用于崩溃来自损坏的上游SDKs相同重试。
  - DB层： `src/lib/db/readCache.ts`
  - 统计端点： `GET /api/cache/stats`，仪表板位于`/dashboard/cache`

## 3）持久层

主状态DB (SQLite):

- 核心基础设施： `src/lib/db/core.ts` （better-sqlite3、迁移、 WAL）
- DB接入：直接导入特定的`src/lib/db/*`模块（旧的`localDb.ts`桶被移除）
- 文件： `${DATA_DIR}/storage.sqlite` （或设置时为`$XDG_CONFIG_HOME/omniroute/storage.sqlite` ，否则`~/.omniroute/storage.sqlite`）
- 实体（表+ KV命名空间）： providerConnections、 providerNodes、 modelAliases、组合、 apiKeys、设置、定价、**customModels** ,**proxyConfig** ,**ipFilter** ,**thinkingBudget** ,**systemPrompt**

使用持久性：

- 门面： `src/lib/usageDb.ts` （ `src/lib/usage/*`中分解的模块）
- `storage.sqlite`中的SQLite表： `usage_history`、 `call_logs`、 `proxy_logs`
- compatibility/debug保留可选文件工件（`${DATA_DIR}/log.txt`、 `${DATA_DIR}/call_logs/`、 `<repo>/logs/...`）
- 旧版JSON文件通过启动迁移迁移到SQLite如果存在）

域状态DB (SQLite):

- `src/lib/db/domainState.ts` — CRUD域状态操作
- 表（在`src/lib/db/core.ts`中创建）： `domain_fallback_chains`、 `domain_budgets`、 `domain_cost_history`、 `domain_lockout_state`、 `domain_circuit_breakers`
- 直写式缓存模式：内存中的Map在运行时具有权威性；突变同步写入SQLite；冷启动时状态从DB恢复

## 4) 身份验证 + 安全接口

- 仪表板 Cookie 身份验证：`src/proxy.ts`、`src/app/api/auth/login/route.ts`
- API 密钥生成/验证：`src/shared/utils/apiKey.ts`
- 提供者密钥持久化存储在 `providerConnections` 条目中
- 出站代理支持：通过 `open-sse/utils/proxyFetch.ts`（环境变量）以及 `open-sse/utils/networkProxy.ts`（可按提供者或全局配置）
- SSRF / 出站 URL 防护：`src/shared/network/outboundUrlGuard.ts` — 对提供者调用和 Webhook 目标执行主机检查；模式来自 `src/shared/network/outboundUrlGuardPolicy.ts`（相关标志位参见 `docs/reference/ENVIRONMENT.md`）
- 运行时环境变量验证：`src/lib/env/runtimeEnv.ts` — 针对所有环境变量的 Zod schema，验证结果以启动错误/警告的形式呈现
- 同步令牌：`src/lib/db/syncTokens.ts` — 用于配置包下载端点的作用域令牌；由 `sync_tokens` SQLite 表提供支持（迁移文件 `024_create_sync_tokens.sql`）
- WebSocket 握手身份验证：`src/lib/ws/handshake.ts` — 通过 API 密钥或会话 Cookie 验证 WS 升级请求
- 实时仪表板 WebSocket 身份验证：`src/server/ws/liveServer.ts` — Sidecar（端口 `LIVE_WS_PORT`）接受仪表板会话 Cookie，或持有管理作用域（`manage`/`admin`）的 Bearer API 密钥；仅限推理的密钥将被拒绝。其内部 `POST /__omniroute_event` 发布端点仅在不存在代理跳转标头（`x-forwarded-*`、`x-real-ip`、`forwarded`、`via`）时接受来自环回地址的对等端请求

## 5) 云端同步

- 调度器初始化：`src/lib/initCloudSync.ts`、`src/shared/services/initializeCloudSync.ts`、`src/shared/services/modelSyncScheduler.ts`
- 周期任务：`src/shared/services/cloudSyncScheduler.ts`
- 周期任务：`src/shared/services/modelSyncScheduler.ts`
- 控制路由：`src/app/api/sync/cloud/route.ts`

## 请求生命周期 (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK 客户端
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as 模型解析器
    participant Auth as 凭据选择器
    participant Exec as 提供者执行器
    participant Prov as 上游提供者
    participant Stream as 流转换器
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: 解析/解析确定模型或组合

    alt 组合模型
        Chat->>Chat: 遍历组合模型 (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: 活跃账户 + 令牌/API 密钥

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: 检测源格式
    Core->>Core: 将请求转换为目标格式
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: 调用上游 API
    Prov-->>Exec: SSE/JSON 响应
    Exec-->>Core: 响应 + 元数据

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: 更新后的令牌
        Core->>Exec: 重试请求
    end

    Core->>Stream: 将流转换/规范化为客户端格式
    Stream-->>Client: SSE 数据块 / JSON 响应

    Stream->>Usage: 提取用量 + 持久化历史记录/日志
```

## 组合 + 账户回退流程

```mermaid
flowchart TD
    A[传入的模型字符串] --> B{是组合名称吗？}
    B -- 是 --> C[加载组合模型序列]
    B -- 否 --> D[单一模型路径]

    C --> E[尝试模型 N]
    E --> F[解析提供者/模型]
    D --> F

    F --> G[选择账户凭据]
    G --> H{凭据可用吗？}
    H -- 否 --> I[返回提供者不可用]
    H -- 是 --> J[执行请求]

    J --> K{成功吗？}
    K -- 是 --> L[返回响应]
    K -- 否 --> M{错误符合回退条件吗？}

    M -- 否 --> N[返回错误]
    M -- 是 --> O[将账户标记为在冷却期内不可用]
    O --> P{该提供者还有其他账户吗？}
    P -- 是 --> G
    P -- 否 --> Q{当前位于组合中且还有下一个模型吗？}
    Q -- 是 --> E
    Q -- 否 --> R[返回全部不可用]
```

回退决策由 `open-sse/services/accountFallback.ts` 根据状态码和错误消息启发式规则驱动。组合路由增加了一项额外保护：限定于提供者的 400 错误（例如上游内容拦截和角色验证失败）会被视为模型局部故障，因此后续组合目标仍可继续运行。

## OAuth 接入与令牌刷新生命周期

```mermaid
sequenceDiagram
    autonumber
    participant UI as 仪表板 UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as 提供者授权服务器
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as 提供者执行器

    UI->>OAuth: GET authorize 或 device-code
    OAuth->>ProvAuth: 创建授权/设备流程
    ProvAuth-->>OAuth: 授权 URL 或设备代码载荷
    OAuth-->>UI: 流程数据

    UI->>OAuth: POST exchange 或 poll
    OAuth->>ProvAuth: 令牌交换/轮询
    ProvAuth-->>OAuth: 访问/刷新令牌
    OAuth->>DB: createProviderConnection(OAuth 数据)
    OAuth-->>UI: 成功 + 连接 ID

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: 验证凭据/可选刷新
    Exec-->>Test: 有效或已刷新的令牌信息
    Test->>DB: 更新状态/令牌/错误
    Test-->>UI: 验证结果
```

实时流量期间的刷新在 `open-sse/handlers/chatCore.ts` 内通过执行器的 `refreshCredentials()` 执行。

## 云同步生命周期（启用 / 同步 / 禁用）

```mermaid
sequenceDiagram
    autonumber
    participant UI as 端点页面 UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as 外部云同步
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: 设置 cloudEnabled=true
    Sync->>DB: 确保 API 密钥存在
    Sync->>Cloud: POST /sync/{machineId}（提供者/别名/组合/密钥）
    Cloud-->>Sync: 同步结果
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: 已启用 + 验证状态

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: 远程数据
    Sync->>DB: 更新本地较新的令牌/状态
    Sync-->>UI: 已同步

    UI->>Sync: POST action=disable
    Sync->>DB: 设置 cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: 将 ANTHROPIC_BASE_URL 切换回本地地址（如有需要）
    Sync-->>UI: 已禁用
```

启用云同步后，`CloudSyncScheduler` 会触发定期同步。

## 数据模型与存储映射

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

物理存储文件：

- 主运行时数据库：`${DATA_DIR}/storage.sqlite`
- 请求日志行：`${DATA_DIR}/log.txt`（兼容/调试工件）
- 结构化调用载荷存档：`${DATA_DIR}/call_logs/`
- 可选的翻译器/请求调试会话：`<repo>/logs/...`

## 部署拓扑

```mermaid
flowchart LR
    subgraph LocalHost[开发者主机]
        CLI[CLI 工具]
        Browser[仪表板浏览器]
    end

    subgraph ContainerOrProcess[OmniRoute 运行时]
        Next[Next.js 服务器\nPORT=20128]
        Core[SSE 核心 + 执行器]
        MainDB[(storage.sqlite)]
        UsageDB[(用量表 + 日志工件)]
    end

    subgraph External[外部服务]
        Providers[AI 提供者]
        SyncCloud[云同步服务]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## 模块映射（决策关键）

### 路由和API模块

- `src/app/api/v1/*`、 `src/app/api/v1beta/*`：兼容性APIs
- `src/app/api/v1/providers/[provider]/*`：每个提供者的专用路由（聊天、嵌入、图像）
- `src/app/api/providers*`：提供者CRUD，验证，测试
- `src/app/api/provider-nodes*`：自定义兼容节点管理
- `src/app/api/provider-models`：自定义模型管理（CRUD）
- `src/app/api/models/route.ts`：模型目录API （别名+自定义模型）
- `src/app/api/oauth/*`： OAuth/device-code流
- `src/app/api/keys*`：本地API密钥生命周期
- `src/app/api/models/alias`：别名管理
- `src/app/api/combos*`：后备组合管理
- `src/app/api/pricing`：成本计算的定价覆盖
- `src/app/api/settings/proxy`：代理配置（GET/PUT/DELETE）
- `src/app/api/settings/proxy/test`：出站代理连接测试 (POST)
- `src/app/api/usage/*`：使用和日志APIs
- `src/app/api/sync/*` + `src/app/api/cloud/*`：云同步和面向云的助手
- `src/app/api/cli-tools/*`：本地CLI配置writers/checkers
- `src/app/api/settings/ip-filter`: IP allowlist/blocklist (GET/PUT)
- `src/app/api/settings/thinking-budget`：思考代币预算配置（GET/PUT）
- `src/app/api/settings/system-prompt`：全局系统提示符（GET/PUT）
- `src/app/api/settings/compression`：全局压缩设置（GET/PUT）
- `src/app/api/compression/*`：压缩预览、规则元数据和语言包
- `src/app/api/context/caveman/config`：穴居人设置别名 (GET/PUT)
- `src/app/api/context/rtk/*`： RTK配置、过滤器目录、测试端点和原始输出恢复
- `src/app/api/context/combos*`：压缩组合CRUD和路由组合分配
- `src/app/api/context/analytics`：压缩分析别名
- `src/app/api/sessions`：活动会话列表（GET）
- `src/app/api/rate-limits`: 每个账户的速率限制状态 (GET)
- `src/app/api/sync/tokens`: 同步令牌CRUD (GET/POST)
- `src/app/api/sync/tokens/[id]`: 同步令牌get/delete (GET/DELETE)
- `src/app/api/sync/bundle`：配置包下载（GET、 ETag版本控制）
- `src/app/api/v1/ws`：OpenAI 兼容WS客户端的WebSocket升级处理程序

### 路由和执行核心

- `src/sse/handlers/chat.ts`：请求解析、组合处理、帐户选择循环
- `open-sse/handlers/chatCore.ts`：翻译、执行器调度、 retry/refresh处理、流设置
- `open-sse/executors/*`：提供者特定的网络和格式行为

### 翻译注册表和格式转换器

- `open-sse/translator/index.ts`：翻译器注册和编排
- 请求翻译器： `open-sse/translator/request/*` （9 个模块— `antigravity-to-openai`、 `claude-to-gemini`、 `claude-to-openai`、 `gemini-to-openai`、 `openai-responses`、 `openai-to-claude`、 `openai-to-cursor`、 `openai-to-gemini`、 `openai-to-kiro`）
- 响应翻译器： `open-sse/translator/response/*` （11 个模块— `claude-to-openai`、 `cursor-to-openai`、 `gemini-to-claude`、 `gemini-to-openai`、 `kiro-to-openai`、 `openai-responses`、 `openai-to-antigravity`、 `openai-to-claude`、 `openai-to-gemini`、 `openai-to-gemini-sse`、 `responsesToolItem`）
- 助手： `open-sse/translator/helpers/*` （12 个模块— `claudeHelper`、 `geminiHelper`、 `geminiToolsSanitizer`、 `jsonUtil`、 `markdownBoundary`、 `maxTokensHelper`、 `openaiHelper`、 `responsesApiHelper`、 `schemaCoercion`、 `strictSystemHoist`、 `toolCallHelper`、 `toolCallShim`）
- 格式常量： `open-sse/translator/formats.ts`
- 引导程序和注册表： `open-sse/translator/bootstrap.ts`、 `open-sse/translator/registry.ts`
- 图像格式助手： `open-sse/translator/image/`

### 坚持

- `src/lib/db/*`： config/state持久化和SQLite上的域持久化
- `src/lib/db/*`：直接导入特定模块—无桶（旧的`localDb.ts`重新导出层已被删除）
- `src/lib/usageDb.ts`：使用history/call在SQLite表顶部记录外观

## 提供者执行者覆盖范围（策略模式）

每个提供者都有一个扩展`BaseExecutor`专门执行器（在`open-sse/executors/base.ts`中），它提供URL构建、标头构建、指数退避重试、凭证刷新挂钩和`execute()`编排方法。

| 执行者                    | 提供者                                                                                                                                                                | 特殊处理                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `DefaultExecutor`         | OpenAI、 Claude、 Gemini、 Qwen、 OpenRouter、 GLM、 Kimi、 MiniMax、 DeepSeek、 Groq、 xAI、 Mistral、困惑度、 Together、 Fireworks、 Cerebras、 Cohere、 NVIDIA等。 | 每个提供者的动态URL/header配置                        |
| `AntigravityExecutor`     | Google Antigravity                                                                                                                                                    | 自定义project/session IDs，解析后重试，429混淆        |
| `AzureOpenAIExecutor`     | 蔚蓝OpenAI                                                                                                                                                            | 基于部署的路由、api 版本查询执行                      |
| `BlackboxWebExecutor`     | Blackbox AI （网络模式）                                                                                                                                              | 使用TLS指纹模拟进行 Web 会话反向                      |
| `ClaudeIdentityExecutor`  | Claude（CCH路径）                                                                                                                                                     | 约束+工具-重映射管道、指纹整形                        |
| `CliProxyApiExecutor`     | CLIProxyAPI 兼容的提供程序                                                                                                                                            | 自定义身份验证和协议处理                              |
| `CloudflareAiExecutor`    | Cloudflare工人AI                                                                                                                                                      | 账户ID注入，基于神经元的使用跟踪                      |
| `CodexExecutor`           | OpenAI Codex                                                                                                                                                          | 注入系统指令，强制推理工作                            |
| `ChatGptWebCodexExecutor` | ChatGPT网 (Codex)                                                                                                                                                     | 浏览器会话响应API桥接thread/turn固定                  |
| `CommandCodeExecutor`     | 命令码                                                                                                                                                                | OAuth +每会话标头轮换                                 |
| `CursorExecutor`          | Cursor IDE                                                                                                                                                            | ConnectRPC协议、Protobuf 编码、通过校验和进行请求签名 |
| `DevinCliExecutor`        | Devin CLI                                                                                                                                                             | 通过云代理模块进行Devin任务生命周期桥接               |
| `GithubExecutor`          | GitHub Copilot                                                                                                                                                        | Copilot令牌刷新，模仿 VSCode 的标头                   |
| `GitlabExecutor`          | GitLab朵                                                                                                                                                              | GitLab OAuth +项目范围路由                            |
| `GlmExecutor`             | AI GLM （包括`glmt`预设）                                                                                                                                             | 思维-预算意识， GLMT预设常量                          |
| `GrokWebExecutor`         | xAI Grok网站                                                                                                                                                          | Web 会话反向、模式选择 (think/standard)               |
| `KieExecutor`             | KIE                                                                                                                                                                   | 具有旋转会话锚点的自定义令牌发行                      |
| `KiroExecutor`            | AWS CodeWhisperer/Kiro                                                                                                                                                | AWS EventStream二进制格式→ SSE转换                    |
| `MuseSparkWebExecutor`    | 缪斯火花（网络）                                                                                                                                                      | 通过图像消息桥接实现网络会话反向                      |
| `NlpCloudExecutor`        | NLP汽云                                                                                                                                                               | 提供者特定的请求正文形状                              |
| `OpenCodeExecutor`        | OpenCode                                                                                                                                                              | AI SDK兼容提供者设置                                  |
| `PerplexityWebExecutor`   | 困惑网                                                                                                                                                                | 网络会话反向以继续聊天                                |
| `PetalsExecutor`          | 花瓣分布式推理                                                                                                                                                        | 分散群路由                                            |
| `PollinationsExecutor`    | 授粉AI                                                                                                                                                                | 无需API密钥，请求速率受限                             |
| `QoderExecutor`           | Qoder AI                                                                                                                                                              | PAT和OAuth支持，多模型免费套餐                        |
| `VertexExecutor`          | Google顶点AI                                                                                                                                                          | 服务帐户身份验证、基于区域的端点                      |
| `DevinDesktopExecutor`    | Devin桌面                                                                                                                                                             | 导入API密钥+ Connect-protobuf 聊天流                  |

所有其他提供者（包括自定义兼容节点）都使用`DefaultExecutor`。

### 自动探测和网络会话帐户

模型测试、测试全部、组合测试和评估发送真实的聊天请求。网络会话提供者充当登录用户，因此每个请求都将保存为该帐户上的对话；留下此类对话的自动探测会导致帐户被暂停（#14780）。因此，一旦目标的提供者被解析并且在选择凭证之前（`src/lib/providers/chatProbePolicy.ts`），聊天管道就会拒绝自动探测到达的每个提供者获取网络会话凭证的目标。拒绝是`422`和`error.code` `chat_probe_not_isolated`，探测运行器将其报告为跳过，而不是失败。

在提供者自己的无历史模式下运行每个聊天的执行器使用`ChatProbeIsolatingExecutor` (`open-sse/executors/chatProbeIsolation.ts`) 进行声明；然后允许对该提供者进行探测。 ChatGPT Web 声明`temporary-chat`。通过测试将声明固定到其机制上，因此该声明不能比使其成立的代码更长久。

## 提供者兼容性矩阵

> **笔记：**下面的矩阵是OmniRoute v3.8.0 中 351 个注册提供者的代表性样本。对于规范且持续更新的列表，请参阅[`docs/reference/PROVIDER_REFERENCE.md`](../reference/PROVIDER_REFERENCE.md) （自动生成）或`src/shared/constants/providers.ts`的真实来源（Zod 在加载时验证）。

| 提供者            | 格式       | 授权              | 溪流             | 非流媒体 | 令牌刷新 | 用法API      |
| ----------------- | ---------- | ----------------- | ---------------- | -------- | -------- | ------------ |
| Claude            | 克劳德     | API密钥 / OAuth   | ✅               | ✅       | ✅       | 仅限⚠️管理员 |
| Gemini            | 双子座     | API密钥 / OAuth   | ✅               | ✅       | ✅       | ⚠️云控制台   |
| Antigravity       | 反重力     | OAuth             | ✅               | ✅       | ✅       | ✅满额API    |
| OpenAI            | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Codex             | 开放式回应 | OAuth             | 强制✅           | ❌       | ✅       | ✅速率限制   |
| ChatGPT网 (Codex) | 开放式回应 | 浏览器会话        | 强制✅           | ❌       | ❌       | ❌           |
| GitHub Copilot    | 开放性     | OAuth + Copilot币 | ✅               | ✅       | ✅       | ✅配额快照   |
| Cursor            | 光标       | 自定义校验和      | ✅               | ✅       | ❌       | ❌           |
| Kiro              | 基罗       | AWS SSO OIDC      | ✅ (EventStream) | ❌       | ✅       | ✅使用限制   |
| Qoder             | 开放性     | OAuth / PAT       | ✅               | ✅       | ✅       | ⚠️按请求     |
| 基洛代码          | 开放性     | OAuth             | ✅               | ✅       | ✅       | ❌           |
| Cline             | 开放性     | OAuth             | ✅               | ✅       | ✅       | ❌           |
| Kimi编码          | 开放性     | OAuth             | ✅               | ✅       | ✅       | ❌           |
| OpenRouter        | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| GLM/Kimi/MiniMax  | 克劳德     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| DeepSeek          | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Groq              | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| xAI (Grok)        | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Mistral           | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| 困惑              | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Together AI       | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Fireworks AI      | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Cerebras          | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Cohere            | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| NVIDIA NIM        | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Cloudflare AI     | 开放性     | API币+账户ID      | ✅               | ✅       | ❌       | ❌           |
| 授粉              | 开放性     | 无（无钥匙）      | ✅               | ✅       | ❌       | ❌           |
| Scaleway AI       | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| LongCat           | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Ollama汽云        | 开放性     | API密钥（可选）   | ✅               | ✅       | ❌       | ❌           |
| HuggingFace       | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| 内比乌斯          | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| SiliconFlow       | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| 双曲线            | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| 顶点AI            | 双子座     | 服务帐号          | ✅               | ✅       | ✅       | ⚠️云控制台   |
| 命令码            | 开放性     | OAuth             | ✅               | ✅       | ✅       | ⚠️按请求     |
| AI / GLM          | 开放性     | API密钥 / OAuth   | ✅               | ✅       | ❌       | ❌           |
| GLMT （预设）     | 克劳德     | API密钥           | ✅               | ✅       | ❌       | ⚠️按请求     |
| Kimi编码          | 开放性     | OAuth / API密钥   | ✅               | ✅       | ✅       | ❌           |
| KIE               | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Devin桌面         | 开放性     | 导入的API密钥     | ✅ （连接→SSE）  | ✅       | ❌       | ⚠️按请求     |
| GitLab朵          | 开放性     | OAuth (GitLab)    | ✅               | ✅       | ✅       | ❌           |
| Devin CLI         | 开放性     | 本地CLI登录       | ✅               | ✅       | ❌       | ✅任务API    |
| Codex汽云         | 开放式回应 | OAuth             | ✅               | ❌       | ✅       | ✅速率限制   |
| Jules             | 开放性     | OAuth             | ✅               | ✅       | ✅       | ✅任务API    |
| AgentRouter       | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| Grok-Web          | 开放性     | 会话cookie        | ✅               | ✅       | ❌       | ❌           |
| 困惑网            | 开放性     | 会话cookie        | ✅               | ✅       | ❌       | ❌           |
| BlackBox-Web      | 开放性     | 会话cookie + TLS  | ✅               | ✅       | ❌       | ❌           |
| Muse-Spark-Web    | 开放性     | 会话cookie        | ✅               | ✅       | ❌       | ❌           |
| ModelScope        | 开放性     | API密钥           | ✅               | ✅       | ❌       | ⚠️配额政策   |
| BazaarLink        | 开放性     | API密钥           | ✅               | ✅       | ❌       | ❌           |
| 花瓣              | 开放性     | 没有任何          | ✅               | ✅       | ❌       | ❌           |
| Qoder             | 开放性     | OAuth / PAT       | ✅               | ✅       | ✅       | ⚠️按请求     |
| OpenCode (Go/Zen) | 开放性     | OAuth             | ✅               | ✅       | ✅       | ❌           |
| CLIProxyAPI       | 开放性     | 风俗              | ✅               | ✅       | ❌       | ❌           |

## 格式转换覆盖

检测到的源格式包括：

- `openai`
- `openai-responses`
- `claude`
- `gemini`

目标格式包括：

- OpenAI chat/Responses
- Claude
- Gemini/Antigravity 封装
- Kiro
- Cursor

格式转换采用 **OpenAI 作为中枢格式** — 所有转换都经过 OpenAI 作为中间格式：

```
源格式 → OpenAI（中枢）→ 目标格式
```

格式转换根据源载荷形态和服务商目标格式动态选择。

格式转换管线中的额外处理层：

- **响应净化** — 从 OpenAI 格式响应中剥离非标准字段（流式和非流式），确保严格的 SDK 兼容性
- **角色归一化** — 将 `developer` 转换为 `system`（面向非 OpenAI 目标）；将 `system` 合并为 `user`（针对拒绝 system 角色的模型，如 GLM、ERNIE）
- **Think 标签提取** — 将内容中的 `<think>...</think>` 块解析为 `reasoning_content` 字段
- **结构化输出** — 将 OpenAI 的 `response_format.json_schema` 转换为 Gemini 的 `responseMimeType` + `responseSchema`

## 支持的 API 端点

| 端点                                               | 格式               | 处理器                                        |
| -------------------------------------------------- | ------------------ | --------------------------------------------- |
| `POST /v1/chat/completions`                        | OpenAI Chat        | `src/sse/handlers/chat.ts`                    |
| `POST /v1/messages`                                | Claude Messages    | 同一处理器（自动检测）                        |
| `POST /v1/responses`                               | OpenAI Responses   | `open-sse/handlers/responsesHandler.ts`       |
| `POST /v1/embeddings`                              | OpenAI Embeddings  | `open-sse/handlers/embeddings.ts`             |
| `GET /v1/embeddings`                               | 模型列表           | API 路由                                      |
| `POST /v1/images/generations`                      | OpenAI Images      | `open-sse/handlers/imageGeneration.ts`        |
| `GET /v1/images/generations`                       | 模型列表           | API 路由                                      |
| `POST /v1/providers/{provider}/chat/completions`   | OpenAI Chat        | 带模型校验的专用每服务商路由                  |
| `POST /v1/providers/{provider}/embeddings`         | OpenAI Embeddings  | 带模型校验的专用每服务商路由                  |
| `POST /v1/providers/{provider}/images/generations` | OpenAI Images      | 带模型校验的专用每服务商路由                  |
| `POST /v1/messages/count_tokens`                   | Claude Token Count | API 路由                                      |
| `GET /v1/models`                                   | OpenAI Models 列表 | API 路由（聊 + 向量嵌入 + 图片 + 自定义模型） |
| `GET /api/models/catalog`                          | 目录               | 按服务商 + 类型分组的所有模型                 |
| `POST /v1beta/models/*:streamGenerateContent`      | Gemini native      | API 路由                                      |
| `GET/PUT/DELETE /api/settings/proxy`               | 代理配置           | 网络代理配置                                  |
| `POST /api/settings/proxy/test`                    | 代理连通性         | 代理健康/连通性测试端点                       |
| `GET/POST/DELETE /api/provider-models`             | 服务商模型         | 服务商模型元数据，支撑自定义和管理可用模型    |

## 旁路处理器

旁路处理器（`open-sse/utils/bypassHandler.ts`）拦截来自 Claude Code CLI 的已知"一次性"请求 — 预热 ping、标题提取和 Token 计数 — 并返回**伪响应**，不消耗上游服务商 Token。仅当 `User-Agent` 包含 `claude-cli` 时触发。

## 请求日志与工件

旧版基于文件的请求日志记录器（`open-sse/utils/requestLogger.ts`）仅为
旧版兼容而保留。当前运行时使用：

- `APP_LOG_TO_FILE=true` 则将应用和审计日志写入 `<repo>/logs/` 下
- `call_logs` 中基于 SQLite 的调用日志记录
- 当调用日志管线启用时，`${DATA_DIR}/call_logs/YYYY-MM-DD/...` 工件

## 故障模式与容灾

## 1) 帐户/服务商可用性

- 可在重试时有上游故障时执行连接冷却
- 在请求失败前进行帐户容灾
- 当前模型/服务商路径耗尽时的 Combo 模型容灾

## 2) Token 过期

- 对可刷新服务商进行预检查和刷新重试
- 核心路径中在刷新尝试后重试 401/403

## 3) 流安全性

- 连接断开感知的流控制器
- 带流结束刷新的转换流和 `[DONE]` 处理
- 服务商用量元数据缺失时的用量估算容灾

## 4) 云端同步降级

- 同步错误会暴露出来，但本地运行继续
- 调度器具有可重试的逻辑，但周期执行默认调用单次同步

## 5) 数据完整性

- SQLite Schema 迁移和启动时自动升级钩子
- 旧 JSON → SQLite 迁移兼���路径

## 6) SSRF /出站URL守卫

- `BaseExecutor.assertOutboundUrlAllowed` (`open-sse/executors/base.ts`) 将`src/shared/network/outboundUrlGuard.ts`应用于通过`BaseExecutor.execute()`调度的聊天请求。在仅限公共模式（`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS=false`且私有标志关闭）下，它会阻止私有和环回主机以及169.254.0.0/16；在所有其他模式下，它都会阻止云元数据主机。在任何DNS查找之前，它会检查写入的主机名或IP文字。内置本地提供者会跳过它。
- 提供者模型发现和验证路由使用`src/shared/network/safeOutboundFetch.ts` ，它在每个出站请求之前应用防护
- 防护错误表现为`URL_GUARD_BLOCKED`和HTTP 503（`getSafeOutboundFetchErrorStatus`；模型发现路径返回 400），验证期间的真实SSRF块将作为`provider.validation.ssrf_blocked`事件记录到审计跟踪中

## 可观测性与运维信号

运行时可见性来源：

- `src/sse/utils/logger.ts` 的控制台日志
- SQLite 中的每请求用量聚合（`usage_history`、`call_logs`、`proxy_logs`）
- 当 `settings.detailed_logs_enabled=true` 时 SQLite 中的四阶段详细载荷捕获（`request_detail_logs`）
- `log.txt` 中的文本请求状态日志（可选/兼容）
- 当 `APP_LOG_TO_FILE=true` 时 `logs/` 下的可选应用日志文件
- 当调用日志管线启用时 `${DATA_DIR}/call_logs/` 下的可选请求工件
- 控制台用量端点（`/api/usage/*`）供 UI 消费

详细请求载荷捕获为每个路由调用存储最多四个 JSON 载荷阶段：

- 从客户端接收的原始请求
- 实际发送到上游的翻译后请求
- 以 JSON 重构的服务商响应；流式响应压缩为最终摘要加流元数据
- OmniRoute 返回的最终客户端响应；流式响应以相同压缩摘要形式存储

## 安全敏感边界

- JWT 密钥（`JWT_SECRET`）保护控制台会话 Cookie 验证/签名
- 初始密码引导（`INITIAL_PASSWORD`）用于首次运行配置时显式设定
- API Key HMAC 密钥（`API_KEY_SECRET`）保护生成的本地 API Key 格式
- 服务商密钥（API Key/Token）持久化存储在本地数据库中，应在文件系统层面加以保护
- 云端同步端点依赖 API Key 认证 + 机器 ID 语义

## 环境与运行时矩阵

代码中活跃使用的环境变量：

- 应用/认证：`JWT_SECRET`、`INITIAL_PASSWORD`
- 存储：`DATA_DIR`
- 兼容节点行为：`ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- 可选存储基础路径覆盖（Linux/macOS，`DATA_DIR` 未设置时）：`XDG_CONFIG_HOME`
- 安全哈希：`API_KEY_SECRET`、`MACHINE_ID_SALT`
- 日志：`APP_LOG_TO_FILE`、`APP_LOG_RETENTION_DAYS`、`CALL_LOG_RETENTION_DAYS`
- 同步/云 URL：`NEXT_PUBLIC_BASE_URL`、`NEXT_PUBLIC_CLOUD_URL`
- 出站代理：`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY` 及小写变体
- SOCKS5 特性开关：`ENABLE_SOCKS5_PROXY`、`NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- 平台/运行时辅助（非应用特定配置）：`APPDATA`、`NODE_ENV`、`PORT`、`HOSTNAME`

## 已知架构说明

1. `usageDb` 和 `localDb` 共享相同的基础目录策略（`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`），并有旧文件迁移机制。
2. `/api/v1/route.ts` 委托给 `/api/v1/models`（`src/app/api/v1/models/catalog.ts`）使用的同一统一目录构建器，避免语义漂移。
3. 请求日志记录器在启用时写入完整的 Header 和 Body；应将日志目录视为敏感信息。
4. 云端行为取决于正确的 `NEXT_PUBLIC_BASE_URL` 和云端端点可达性。
5. `open-sse/` 目录作为 `@omniroute/open-sse` **npm workspace 包**发布。源码通过 `@omniroute/open-sse/...` 导入（由 Next.js 的 `transpilePackages` 解析）。本文档中的文件路径为了一致性仍使用目录名 `open-sse/`。
6. 控制台图表使用 **Recharts**（基于 SVG），提供可访问的交互式分析可视化（模型用量柱状图、带成功率的服务商分组表）。
7. E2E 测试使用 **Playwright**（`tests/e2e/`），通过 `npm run test:e2e` 运行。单元测试使用 **Node.js 测试运行器**（`tests/unit/`），通过 `npm run test:unit` 运行。`src/` 下的源码为 **TypeScript**（`.ts`/`.tsx`）；`open-sse/` workspace 保留 JavaScript（`.js`）。
8. 设置页面分为 7 个标签页：通用、外观、AI、安全、路由、容灾、高级。容灾页面仅配置请求队列、连接冷却、服务商熔断器和等待冷却行为；熔断器的实时运行时状态显示在健康页面。
9. **Context Relay** 策略（`context-relay`）分布在两个层中：`combo.ts` 决定是否应生成交接信息，`chat.ts` 在帐户解析后注入交接信息。交接数据存储在 `context_handoffs` SQLite 表中。这种分离是故意的，因为只有 `chat.ts` 知道实际帐户是否发生了变更。
10. **代理执行**现已全面覆盖：`tokenHealthCheck.ts` 按连接解析代理，`/api/providers/validate` 使用 `runWithProxyContext`，`proxyFetch.ts` 使用 `undici.fetch()` 以在 Node 22 上保持 dispatcher 兼容性。
11. **Node.js 运行时策略检测**：`/api/settings/require-login` 返回 `nodeVersion` 和 `nodeCompatible` 字段。当运行时不在支持的 Node.js 安全版本范围内时，登录页面会渲染警告横幅。

## 运维验证清单

- 从源码构建：`npm run build`
- 构建 Docker 镜像：`docker build -t omniroute .`
- 启动服务并验证：
- `GET /api/settings`
- `GET /api/v1/models`
- 当 `PORT=20128` 时，CLI 目标基 URL 应为 `http://<host>:20128/v1`
