# Repository Map (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **每个目录和根文件的一行说明。**
> 最后更新：2026-06-28 — OmniRoute v3.8.40
>
> 使用此映射快速浏览代码库。如需深入了解，请访问对应的专用文档链接。

## 顶层目录树

```
OmniRoute/
├── src/                  # Next.js 16 应用程序（UI + API 路由 + 库 + 领域逻辑 + 服务端）
├── open-sse/             # 流式处理引擎工作区（处理器、执行器、转换器、MCP 服务器）
├── packages/            # npm 工作区：ui-kit（内置的 Keak CI UI Kit）和 browser-pool
├── electron/             # 桌面封装程序（Electron 41 + electron-builder 26.10）
├── bin/                  # CLI 入口点和命令处理器
├── scripts/              # 构建、检查、同步和一次性脚本
├── docs/                 # 公共文档（您当前所在的位置）
├── tests/                # 所有测试套件（单元、集成、端到端、协议客户端）
├── public/               # Next.js 静态资源、PWA 清单、Service Worker、图标
├── config/               # 静态配置 + 质量门禁状态（i18n、payloadRules、quality/）
├── images/               # 营销素材 / README 图像资源
├── @omniroute/           # 可发布的配套包（opencode-plugin、opencode-provider）
├── skills/               # CLI/代理技能包（cli-* + omni-* + config-codex-cli）
├── examples/             # 示例插件 + omniroute-cmd-hello 入门项目
├── contrib/              # 社区贡献（podman/）
├── .source/              # Fumadocs 源配置（source.config.mjs + server/browser/dynamic）
├── .github/              # GitHub Actions 工作流 + Issue 模板 + PR 模板
├── .husky/               # Git 钩子（pre-commit、pre-push）
├── .claude/              # Claude Code 斜杠命令（项目作用域）
├── .agents/              # Codex / 通用代理工作流 + 技能（.claude/ 的镜像）
├── .vscode/              # VS Code 工作区设置
├── _ideia/               # 规划笔记（非正式；不会随产品发布）
├── _mono_repo/           # 历史子项目（cloud、site、vscode-extension）
├── _references/          # 来自相关开源项目的只读参考克隆
├── _tasks/               # 各版本的任务跟踪文件（非正式）
├── .build/ .worktrees/ dist/   # 本地构建 / git-worktree / 构建输出临时目录（已被 git 忽略）
├── .issues/              # 本地 Issue 缓存（已被 git 忽略）
├── .playwright-mcp/      # Playwright MCP 测试产物
├── coverage/             # c8 覆盖率输出（已被 git 忽略）
├── logs/                 # 运行时日志（已被 git 忽略）
├── node_modules/         # 依赖项（已被 git 忽略）
├── package/              # npm pack 暂存区（构建产物）
├── .next/                # Next.js 构建输出（已被 git 忽略）
└── （根文件 — 见下文）
```

---

## 根文件

| 文件                                        | 用途                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| **README.md**                               | 营销落地页 + 快速入门 + 功能矩阵（另请参阅 `llm.txt`）                         |
| **CHANGELOG.md**                            | 各版本变更日志（由 `/version-bump-cc` 技能自动生成）                           |
| **LICENSE**                                 | MIT 许可证文本                                                                 |
| **CLAUDE.md**                               | Claude Code 智能体的项目规则（硬性规则、约定、场景）                           |
| **AGENTS.md**                               | 与 CLAUDE.md 相同，但适用于非 Claude AI 智能体（Codex、Cursor 等）             |
| **GEMINI.md**                               | 面向 Gemini 智能体的精简规则（CLAUDE.md 的子集）                               |
| **CONTRIBUTING.md**                         | 贡献者指南：设置、约定式提交、测试、PR 流程                                    |
| **SECURITY.md**                             | 漏洞报告政策、支持的版本、威胁模型                                             |
| **CODE_OF_CONDUCT.md**                      | 贡献者公约——社区行为规范                                                       |
| **llm.txt**                                 | 针对 LLM 爬虫优化的纯文本落地页（面向 AI 助手的 SEO）                          |
| **package.json**                            | npm 清单、脚本、依赖项、引擎、c8 覆盖率门禁                                    |
| **package-lock.json**                       | 锁定的依赖关系树                                                               |
| **tsconfig.json**                           | 根 TypeScript 配置                                                             |
| **tsconfig.typecheck-core.json**            | `src/` 核心代码的类型检查配置                                                  |
| **tsconfig.typecheck-noimplicit-core.json** | 严格（`noImplicitAny`）类型检查                                                |
| **tsconfig.tsbuildinfo**                    | TS 增量构建缓存（已被 git 忽略）                                               |
| **next.config.mjs**                         | Next.js 16 构建配置（独立输出）                                                |
| **next-env.d.ts**                           | Next.js 自动生成的环境类型                                                     |
| **eslint.config.mjs**                       | ESLint 扁平配置（按项目区域划分规则）                                          |
| **prettier.config.mjs**                     | Prettier 格式化规则                                                            |
| **postcss.config.mjs**                      | Tailwind/CSS 流水线的 PostCSS 配置                                             |
| **playwright.config.ts**                    | Playwright E2E 测试配置                                                        |
| **vitest.config.ts**                        | Vitest 配置（默认测试套件）                                                    |
| **vitest.mcp.config.ts**                    | MCP 服务器 / autoCombo / 缓存测试套件的 Vitest 配置                            |
| **sonar-project.properties**                | SonarQube/SonarCloud 配置（代码质量）                                          |
| **Dockerfile**                              | 多阶段 Docker 构建（builder → runner-base → runner-cli）                       |
| **docker-compose.yml**                      | 包含 4 个配置集（base、cli、host、cliproxyapi）和 redis sidecar 的开发 compose |
| **docker-compose.prod.yml**                 | 生产环境 compose（端口 20130、redis、命名卷）                                  |
| **.dockerignore**                           | 从 Docker 上下文中排除的文件                                                   |
| **fly.toml**                                | Fly.io 部署配置（区域 `sin`、端口 20128、/data 卷）                            |
| **.env.example**                            | 环境文件模板（首次安装时自动复制到 `.env`）                                    |
| **.gitignore**                              | Git 忽略模式                                                                   |
| **.npmignore**                              | npm 发布排除列表                                                               |
| **.npmrc**                                  | npm 配置（注册表、锁文件策略）                                                 |
| **.node-version**                           | Node 版本锁定（由兼容 nvm 的工具使用）                                         |
| **.nvmrc**                                  | nvm 的 Node 版本锁定                                                           |
| **eslint.complexity.config.mjs**            | 复杂度棘轮的 ESLint 配置（`scripts/check/check-complexity.mjs --config`）      |
| **eslint.sonarjs.config.mjs**               | SonarJS 规则（认知复杂度 / 重复）的 ESLint 配置                                |
| **source.config.ts**                        | Fumadocs `defineDocs` 源配置（供 `.source/` 使用）                             |
| **knip.json**                               | Knip 配置——未使用的文件/导出/依赖项（供死代码门禁使用）                        |
| **stryker.conf.json**                       | Stryker 变异测试配置                                                           |
| **.size-limit.json**                        | size-limit bundle 预算配置                                                     |
| **promptfooconfig.yaml**                    | promptfoo 评估配置                                                             |
| **.gitleaks.toml**                          | gitleaks 密钥扫描规则集                                                        |
| **.zizmor.yml**                             | zizmor GitHub Actions 安全检查配置                                             |
| **socket.yml**                              | Socket.dev 软件供应链配置                                                      |
| **news.json**                               | 本地化的 v2 公告源；Radar 发布项默认处于未启用状态                             |
| **flake.nix** / **flake.lock**              | Nix 开发 shell 定义和锁定文件                                                  |
| **.env**                                    | 本地密钥（已被 git 忽略——从 `.env.example` 生成）                              |

> **在 v3.8.26 中移出根目录（精简）：**
>
> - **→ `config/quality/`：** `quality-baseline.json`、`complexity-baseline.json`、`duplication-baseline.json`、`file-size-baseline.json`、`test-discovery-baseline.json`、`dependency-allowlist.json`、`.license-allowlist.json`，以及生成的 `quality-metrics.json`（已被 git 忽略）。请参阅 [`## config/`](#config--static-configs--quality-gate-state)。

---

## `src/` — Next.js应用程序

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — 应用程序路由器 (Next.js 16)

| 小路                                                                         | 目的                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | 公共 OpenAI-compat API （~ 25 条子路线：聊天、完成、嵌入、文件、批次、音频、图像、视频、音乐、重新排名、审核、搜索、ws、代理、帐户、提供者等）                                                                                                                                                                                          |
| `app/api/v1beta/`                                                            | Gemini 风格的API端点                                                                                                                                                                                                                                                                                                                    |
| `app/api/playground/`                                                        | Playground Studio 路线： `improve-prompt/` (POST — LLM提示符重写器)、 `presets/` (GET list / POST create)、 `presets/[id]/` (GET / PUT / DELETE) — 请参阅`docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                                         |
| `app/api/` （非 v1）                                                         | Management/admin路由（~ 60 目录：提供者、组合、设置、mcp、a2a、evals、内存、技能、webhooks、合规性、弹性、监控、隧道、cli 工具等）                                                                                                                                                                                                      |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 条路由（服务器控制、代理state/DNS/mappings、旁路、证书、上游 CA）。 LOCAL_ONLY + SPAWN_CAPABLE。参见`docs/frameworks/AGENTBRIDGE.md §7`。                                                                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 个+路由（请求、会话、主机、捕获模式、导出、ws）。 LOCAL_ONLY + SPAWN_CAPABLE。参见`docs/frameworks/TRAFFIC_INSPECTOR.md §8`。                                                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 入口点 (`POST /a2a`)                                                                                                                                                                                                                                                                                                   |
| `app/.well-known/agent.json/`                                                | A2A代理卡（发现）                                                                                                                                                                                                                                                                                                                       |
| `app/(dashboard)/dashboard/`                                                 | 仪表板UI页面（50 个+部分、 ~ 118 个page.tsx文件：提供程序、组合、设置、内存、技能、webhooks、评估、审计、批处理、缓存、成本、运行状况、系统、活动等）                                                                                                                                                                                   |
| `app/(dashboard)/dashboard/search-tools/`                                    | 搜索工具 Studio UI （3 个选项卡： Search/Scrape/Compare + SearchConceptCard + ProviderCatalog） — 请参阅`docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                                        |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（计划 21）： `page.tsx` （3-tab shell）、 `components/` （MemoryConceptCard、 MemoryEngineStatus、 EmbeddingSourceSelector、 EditMemoryModal、 RetrievePreview、 QdrantConfigCard、 RerankConfigCard）、 `components/tabs/` （MemoriesTab、 PlaygroundTab、 EngineTab）、 `hooks/` （useEngineStatus、useMemorySettings） |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge仪表板页面 — 服务器卡、9 个代理卡、设置向导、模型映射、旁路列表。 i18n PT-BR + EN。参见`docs/frameworks/AGENTBRIDGE.md`。                                                                                                                                                                                                    |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector 仪表板页面 — DevTools拆分、7 个详细信息选项卡、4 个捕获模式切换、会话记录器、上下文着色。 i18n PT-BR + EN。参见`docs/frameworks/TRAFFIC_INSPECTOR.md`。                                                                                                                                                               |
| `app/(dashboard)/dashboard/activity/`                                        | 活动提要页面（B 组）： `page.tsx` （服务器） + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — 参见`docs/architecture/MONITORING_SECTIONS.md`                                                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | 配额分享页面（B组）： `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | 提供者计划配置页面（B 组）： `page.tsx` + `ProviderPlanConfigClient.tsx` — 每个连接覆盖的配额维度                                                                                                                                                                                                                                       |
| `app/docs/`                                                                  | 嵌入式文档查看器（呈现`docs/*.md`）                                                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | 营销登陆页面                                                                                                                                                                                                                                                                                                                            |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Auth相关页面                                                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP错误页面                                                                                                                                                                                                                                                                                                                            |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status页面                                                                                                                                                                                                                                                                                                                       |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | 根布局、home、 PWA清单、全局CSS                                                                                                                                                                                                                                                                                                         |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | 误差边界                                                                                                                                                                                                                                                                                                                                |

### `src/lib/` — 核心库（~ 50 个模块）

| 模块                                     | 目的                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A协议任务管理器、技能（5）、流式传输                                                                                                                                                                                                                                                                                |
| `acp/`                                   | CLI代理注册表（本地CLI发现 — 请参阅`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`）                                                                                                                                                                                                                                       |
| `api/`                                   | 共享API助手（`requireManagementAuth`、验证）                                                                                                                                                                                                                                                                          |
| `auth/`                                  | 会话、密码哈希、令牌验证                                                                                                                                                                                                                                                                                              |
| `batches/`                               | OpenAI批次API处理程序                                                                                                                                                                                                                                                                                                 |
| `catalog/`                               | 提供者目录Zod验证+能力解析                                                                                                                                                                                                                                                                                            |
| `cloudAgent/`                            | 云代理（Codex Cloud、 Devin、 Jules） — 请参阅`docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | 组合解析+重新排序助手                                                                                                                                                                                                                                                                                                 |
| `audit/`                                 | 活动提要助手： `highLevelActions.ts` （允许列表+ `isHighLevelAction()`）、 `activityIcons.ts` （操作→ icon/verb地图）、 `timeline.ts` (groupByDay/relativeTime) — 请参阅`docs/architecture/MONITORING_SECTIONS.md`                                                                                                    |
| `compliance/`                            | 审核日志+提供者审核 — 参见`docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                               |
| `compression/`                           | 压缩发动机胶（发动机住`open-sse/services/compression/`）                                                                                                                                                                                                                                                              |
| `config/`                                | 运行时配置助手                                                                                                                                                                                                                                                                                                        |
| `db/`                                    | 120 +域DB模块+ 168 迁移（对于SQLite始终通过此处）                                                                                                                                                                                                                                                                     |
| `quota/`                                 | 配额共享引擎： `dimensions.ts` (types/Zod)、 `types.ts` (QuotaStore接口)、 `sqliteQuotaStore.ts`、 `redisQuotaStore.ts`、 `storeFactory.ts`、 `fairShare.ts`、 `burnRate.ts`、 `planResolver.ts`、 `planRegistry.ts`、 `saturationSignals.ts`、 `enforce.ts`、 `spendRecorder.ts` — 参见`docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | 雷达自由模型目录客户端： `feedSchema.ts`、 `pinnedKeys.ts`、 `verify.ts`、 `sync.ts`、 `applyFeed.ts`、 `index.ts` (`getRadarCatalog()`) — 参见`docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | UI格式化助手（成本、延迟等）                                                                                                                                                                                                                                                                                          |
| `embeddings/`                            | 嵌入服务助手                                                                                                                                                                                                                                                                                                          |
| `env/`                                   | Env变量解析+验证                                                                                                                                                                                                                                                                                                      |
| `evals/`                                 | Eval 框架（套件、运行程序、运行时）- 参见`docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                   |
| `guardrails/`                            | PII masker、提示注入、视觉桥 — 参见`docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                      |
| `jobs/`                                  | 后台作业（类似 cron）                                                                                                                                                                                                                                                                                                 |
| `memory/`                                | 对话记忆（SQLite FTS5 + sqlite-vec 混合RRF + Qdrant第 2 层） - 参见`docs/frameworks/MEMORY.md`                                                                                                                                                                                                                        |
| `memory/embedding/`                      | 多源嵌入层： `index.ts` （解析器）、 `remote.ts`、 `staticPotion.ts`、 `transformersLocal.ts`、 `cache.ts`、 `types.ts` （方案21）                                                                                                                                                                                    |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 包装器 — KNN暴力+混合RRF （FTS5 +向量，k = 60）。 Lazy-init，当 sqlite-vec 不可用时优雅地降级。 （计划21）                                                                                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — 在后台使用`needs_reindex=1`处理内存；由`POST /api/memory/reindex`和惰性回填路径调用。 （计划21）                                                                                                                                                                                                |
| `monitoring/`                            | 健康检查、指标排放                                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | 22 个提供者模块的OAuth/import流程（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、zed-hosted、zed）                                                        |
| `plugins/`                               | 插件注册表                                                                                                                                                                                                                                                                                                            |
| `promptCache/`                           | 人类风格的提示缓存断点                                                                                                                                                                                                                                                                                                |
| `skills/`                                | 技能框架（内置+市场+ SkillsSH）—参见`docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                       |
| `playground/`                            | Playground Studio 共享助手： `codeExport.ts` （curl/Python/TS生成器）、 `promptImprover.ts` （元提示构建器）、 `streamMetrics.ts` （纯TTFT/TPS）、 `types.ts` （定价表）— 请参阅`docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                |
| `webhookDispatcher.ts`                   | HMAC webhook 交付 — 参见`docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | 隧道管理器 — 参见`docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                          |
| `cloudSync.ts`, `initCloudSync.ts`       | 可选的状态云同步                                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                             | 重新导出数据库模块的桶（无逻辑 - 仅重新导出）                                                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | 请求缓存+幂等性                                                                                                                                                                                                                                                                                                       |
| （~ 30多个顶级文件）                     | 专门的助手（logEnv、modelsDevSync、piiSanitizer 等）                                                                                                                                                                                                                                                                  |

### `src/lib/db/` — 数据库（147 个模块+ 208 个迁移）

| 子目录                    | 目的                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | 带有WAL日志功能的`getDbInstance()`单例                                                                                                                               |
| `db/migrations/`          | 版本化的SQL文件（幂等、事务）。 `073_memory_vec.sql`增加`memory_vec_meta` + `needs_reindex`列（方案 21）。                                                           |
| `db/playgroundPresets.ts` | Playground Studio 预设的CRUD模块（`listPlaygroundPresets`、 `getPlaygroundPreset`、 `createPlaygroundPreset`、 `updatePlaygroundPreset`、 `deletePlaygroundPreset`） |
| `db/memoryVec.ts`         | CRUD for `memory_vec_meta` （active_dim、embedding_signature、last_reset_at、vec_loaded） + `markMemoryNeedsReindex`、 `getMemoryReindexQueue`等（计划 21）          |
| `db/<domain>.ts`          | 每个域一个模块：providers、combos、apiKeys、users、sessions、usage、audit log、webhooks、skills、memory_entries、cloud_agent_tasks、evals* \* 、推理缓存等           |

### `src/domain/`

| 模块                   | 目的                                     |
| ---------------------- | ---------------------------------------- |
| `policy.ts`            | 策略引擎                                 |
| `fallbackPolicy.ts`    | 后备决策树                               |
| `costRules.ts`         | 成本计算规则                             |
| `lockoutPolicy.ts`     | Model/connection锁定政策                 |
| `tagRouter.ts`         | 基于标签的路由                           |
| `comboResolver.ts`     | 组合分辨率（由组合引擎使用）             |
| `modelAvailability.ts` | 每个型号的可用性检查                     |
| `assessment/`          | 模型评估（RFC-AUTO-ASSESSMENT 第一阶段） |

### `src/server/`

| 模块     | 目的                                                                                    |
| -------- | --------------------------------------------------------------------------------------- |
| `authz/` | 授权管道： `classify` → `policies` → `enforce` — 参见`docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS配置                                                                                |
| `auth/`  | 会话中间件                                                                              |

### `src/shared/`

| 模块                             | 目的                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `components/`                    | 仪表板组件API： `packages/ui-kit`上的适配器 — 请参阅`docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`：屏幕使用的图标名称→ Lucide 组件 (`<Icon>`)                                   |
| `constants/providers.ts`         | **377 提供者**通过Zod验证（事实来源）                                                    |
| `constants/cliTools.ts`          | 外部CLI工具注册表                                                                        |
| `constants/routingStrategies.ts` | **20种路由策略**有优先事项                                                               |
| `constants/publicApiRoutes.ts`   | 需要承载（与管理）身份验证的路由                                                         |
| `constants/upstreamHeaders.ts`   | 上游请求的标头拒绝列表                                                                   |
| `validation/schemas.ts`          | ~ 80 Zod模式（ API合约的单一事实来源）                                                   |
| `validation/helpers.ts`          | Zod验证助手（`validateBody`等）                                                          |
| `types/`                         | 共享TS类型                                                                               |
| `contracts/`                     | 公共API合约（由`package.json`中的`files:`使用）                                          |
| `utils/circuitBreaker.ts`        | 提供者断路器（参见`docs/architecture/RESILIENCE_GUIDE.md`）                              |
| `utils/apiAuth.ts`               | API密钥验证、范围检查                                                                    |
| `utils/fetchTimeout.ts`          | 用于上游获取的Timeout/abort包装器                                                        |
| `utils/releaseNotes.ts`          | 关闭v2/legacy公告解析器、本地化和ID解雇                                                  |

---

## `open-sse/` — 流式引擎工作区

独立的 npm 工作区（`@omniroute/open-sse`）。负责请求处理和提供者执行。

```
open-sse/
├── handlers/            # 16 个文件（12 个处理器 + 4 个辅助模块）：chatCore、responsesHandler、embeddings、audio、image、video、music、rerank、moderations、search 等
├── executors/           # 150 个执行器模块（扩展 BaseExecutor 的类 + 各提供者辅助模块）
├── translator/          # 格式转换器（9 个请求转换器、9 个响应转换器、9 个辅助模块）
├── transformer/         # Responses API ↔ Chat Completions（TransformStream）
├── services/            # 约 80+ 个服务模块（combo、accountFallback、autoCombo、reasoningCache、claude code/chatgpt stealth、modelDeprecation、taskAwareRouter、workflowFSM 等）
├── mcp-server/          # MCP 服务器（110 个工具、3 种传输方式、33 个作用域）
├── config/              # 提供者/模型注册表、请求头配置、模型别名
├── utils/               # TLS 客户端、代理 fetch/dispatcher、网络辅助模块
├── index.ts             # 工作区入口
├── package.json         # 工作区清单
├── tsconfig.json        # 工作区 TS 配置
└── types.d.ts           # 工作区类型声明
```

### `open-sse/mcp-server/`

| 路径                        | 用途                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `server.ts`                 | MCP 服务器生命周期（stdio + HTTP 传输）                               |
| `httpTransport.ts`          | HTTP Streamable + SSE 传输（`/api/mcp/sse`、`/api/mcp/stream`）       |
| `audit.ts`                  | 将审计日志记录到 `mcp_tool_audit` 表                                  |
| `scopeEnforcement.ts`       | 按工具验证作用域                                                      |
| `runtimeHeartbeat.ts`       | 将健康状态心跳写入 `DATA_DIR/runtime/mcp-heartbeat.json`              |
| `descriptionCompressor.ts`  | 压缩工具描述元数据以节省上下文                                        |
| `schemas/tools.ts`          | 36 个基础工具定义 + 作用域                                            |
| `tools/advancedTools.ts`    | 高级工具实现                                                          |
| `tools/memoryTools.ts`      | 3 个记忆工具（搜索/添加/清除）                                        |
| `tools/skillTools.ts`       | 4 个技能工具（列表/启用/执行/执行记录）                               |
| `tools/compressionTools.ts` | 5 个压缩工具                                                          |
| `README.md`                 | 内部 MCP 服务器 README（从 `docs/frameworks/MCP-SERVER.md` 交叉链接） |

---

## `packages/` — 工作区

| 路径                     | 用途                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — Keak CI UI Kit 的内置快照（`private`、`UNLICENSED`），以源码形式使用（无需构建）。`UPSTREAM.md` 固定上游提交并记录许可证授权；`PATCHES.md` 列出本地补丁（无）；`src/` 仅由 `scripts/dev/sync-ui-kit.sh` 同步，并由 `npm run check:ui-kit-snapshot` 检查。参见 `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — 可选的浏览器池服务（由 CloakBrowser 和 Playwright 支持的聊天）                                                                                                                                                                                                                               |

---

## `electron/` — 桌面封装

| 文件             | 用途                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| `main.js`        | Electron 主进程（BrowserWindow、嵌入式 Next.js 服务器、托盘、自动更新） |
| `preload.js`     | IPC 桥接（contextBridge → `window.omniroute`）                          |
| `package.json`   | electron-builder 配置 + Electron 41 + electron-builder 26.10 依赖项     |
| `assets/`        | 应用图标（Windows .ico、macOS .icns、Linux .png）                       |
| `dist-electron/` | 构建输出（已被 git 忽略）                                               |
| `types.d.ts`     | 渲染器桥接的类型声明                                                    |
| `README.md`      | 内部 Electron README（另请参阅 `docs/guides/ELECTRON_GUIDE.md`）        |

---

## `bin/` — CLI

| 文件                                                                                                        | 用途                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | 主 CLI 入口 — `omniroute serve`、`omniroute setup`、`omniroute doctor`、`omniroute providers`、`omniroute combos` 等 |
| `reset-password.mjs`                                                                                        | 独立的密码重置 CLI                                                                                                   |
| `cli/commands/setup.mjs`                                                                                    | 交互式 + 非交互式设置向导                                                                                            |
| `cli/commands/doctor.mjs`                                                                                   | 系统健康诊断（8 项以上检查）                                                                                         |
| `cli/commands/providers.mjs`                                                                                | 提供者列表/测试/验证                                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI 辅助模块                                                                                                         |
| `cli/tray/tray.ts`                                                                                          | 系统托盘集成（跨平台：Windows 上使用 NotifyIcon，macOS/Linux 上使用 systray2）                                       |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon 后端（Windows，无新增二进制文件）                                                              |
| `cli/tray/autostart.ts`                                                                                     | 跨平台自动启动（LaunchAgent / .desktop / 注册表）                                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 步 SQLite 驱动解析链（捆绑 → 运行时 → 延迟安装 → node:sqlite → sql.js）                                            |
| `cli/runtime/magicBytes.mjs`                                                                                | 二进制魔数验证（ELF / Mach-O / Mach-O fat / PE）                                                                     |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — 在安装后/首次启动时预解析驱动程序                                                               |
| `nodeRuntimeSupport.mjs`                                                                                    | 安装时验证受支持的 Node.js 版本                                                                                      |

---

## `skills/` — 公共 Agent 技能

| 文件                         | 用途                                                                        |
| ---------------------------- | --------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 面向外部 AI Agent（Claude Desktop、ChatGPT、Cursor、Cline）的 10 个技能清单 |

---

## `scripts/` — 构建与检查脚本

| 脚本                                | 用途                                                                  |
| ----------------------------------- | --------------------------------------------------------------------- |
| `run-next.mjs`                      | 支持环境变量填充的开发/启动运行器                                     |
| `build-next-isolated.mjs`           | 独立构建（Next.js 16 standalone）                                     |
| `prepublish.ts`                     | 执行 `npm pack` 前的包准备                                            |
| `postinstall.mjs`                   | 首次安装时根据 `.env.example` 自动创建 `.env`                         |
| `sync-env.mjs`                      | 重新将 `.env` 中的键与 `.env.example` 同步                            |
| `check-cycles.mjs`                  | 检测循环依赖                                                          |
| `check-route-validation.mjs`        | 验证所有 API 路由均使用 Zod 验证                                      |
| `check-t11-any-budget.mjs`          | 强制执行每个文件的显式 `any` 配额                                     |
| `check-docs-sync.mjs`               | 验证文档版本同步（现有的 pre-commit 检查）                            |
| **`check-env-doc-sync.mjs`**        | 新增：交叉检查代码、`.env.example` 和 `ENVIRONMENT.md` 中的环境变量   |
| **`check-docs-counts-sync.mjs`**    | 新增：验证数量（执行器、策略、OAuth、A2A 技能）与文档一致             |
| **`check-deprecated-versions.mjs`** | 新增：标记文档中过时的版本/日期                                       |
| `check-supported-node-runtime.ts`   | 验证当前 Node 版本是否受支持                                          |
| `check-pr-test-policy.mjs`          | 对生产代码变更强制执行“必须测试”规则                                  |
| **`gen-provider-reference.ts`**     | 新增：根据目录自动生成 `docs/reference/PROVIDER_REFERENCE.md`         |
| `i18n/generate-multilang.mjs`       | 通过 Google Translate 翻译 UI 字符串和文档                            |
| `i18n_autotranslate.py`             | 基于 LLM 的文档翻译流水线                                             |
| `validate_translation.py`           | 按区域设置进行翻译验证                                                |
| `check_translations.py`             | 代码侧 i18n 键检查                                                    |
| `run-playwright-tests.mjs`          | Playwright E2E 运行器                                                 |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E 运行器                                                    |
| `run-ecosystem-tests.mjs`           | 生态系统（提供者集成）测试                                            |
| `test-report-summary.mjs`           | 生成覆盖率摘要 Markdown                                               |
| `smoke-electron-packaged.mjs`       | 对打包后的 Electron 构建执行冒烟测试                                  |
| `native-binary-compat.mjs`          | 验证原生依赖（`better-sqlite3`）与 Electron 的 Node 匹配              |
| `validate-pack-artifact.ts`         | 验证 npm 打包输出                                                     |
| `responses-ws-proxy.mjs`            | Codex Responses API 的 WebSocket 桥接器                               |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` 端点的 WebSocket 桥接器                                  |
| `standalone-server-ws.mjs`          | 独立 WS 服务器运行器                                                  |
| `system-info.mjs`                   | 打印用于支持的系统/运行时信息                                         |
| `healthcheck.mjs`                   | 单次健康检查（由 Docker HEALTHCHECK 使用）                            |
| `uninstall.mjs`                     | 清理卸载脚本                                                          |
| `dev/sync-ui-kit.sh`                | 将固定提交版本的 CI UI Kit `src/` 复制到 `packages/ui-kit/src`        |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit 门禁：确保 `packages/ui-kit/src` 与固定的上游提交一致      |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — 查找正在使用但未由 `ICON_MAP` 映射的图标名称 |
| `dev/codemod-material-icons.mjs`    | 将字面量 Material Symbols span 重写为 `<Icon>`（迁移工具）            |

---

## `docs/` — 公共文档（7 个根文件+ 17 个子目录）

### 顶级指南

| 医生                        | 目的                                                                       |
| --------------------------- | -------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高层架构、子系统图、仪表板表面                                             |
| `CODEBASE_DOCUMENTATION.md` | 工程参考：目录、模块、约定                                                 |
| `FEATURES.md`               | v3.8 亮点功能矩阵                                                          |
| `USER_GUIDE.md`             | 最终用户手册（设置、模型、组合、 CLIs、音频等）                            |
| `API_REFERENCE.md`          | 具有身份验证模型的API端点参考                                              |
| `openapi.yaml`              | OpenAPI 3.0 规范（121 个路径）                                             |
| `SETUP_GUIDE.md`            | 安装方法（npm、npx、 Docker、 Electron、Termux、源）                       |
| `ENVIRONMENT.md`            | 所有环境变量（~ 800 记录， ~ 3,050 行`.env.example`）                      |
| `TROUBLESHOOTING.md`        | 常见错误+ v3.8.0 已知问题                                                  |
| `RELEASE_CHECKLIST.md`      | 完整的发布流程（技能、husky、常规提交、部署）                              |
| `COVERAGE_PLAN.md`          | 覆盖目标和现状                                                             |
| `FREE_TIERS.md`             | 精选的免费提供者（48 +免费+ 11 OAuth）                                     |
| `CLI-TOOLS.md`              | 外部CLI集成+内部OmniRoute CLI                                              |
| `I18N.md`                   | i18n 架构，添加语言，67 个语言环境                                         |
| `UNINSTALL.md`              | 干净卸载步骤                                                               |
| `PROVIDER_REFERENCE.md`     | **自动生成**377 个提供者的目录（regen： `npm run gen:provider-reference`） |

### 子系统深入研究

| 医生                                          | 目的                                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP服务器：110 个工具、3 个传输、33 个范围、 REST端点 |
| `A2A-SERVER.md`                               | A2A v0.3：JSON-RPC、6 种技能、 REST助手、代理卡       |
| `AGENT_PROTOCOLS_GUIDE.md`                    | 统一指南： A2A 、 ACP 、云代理                        |
| `CLOUD_AGENT.md`                              | Codex云/ Devin / Jules编排                            |
| `SKILLS.md`                                   | 技能框架（内置+市场+ SkillsSH +沙箱）                 |
| `RADAR.md`                                    | 雷达自由模型目录覆盖（`RADAR_ENABLED`，默认关闭）     |
| `MEMORY.md`                                   | 内存系统（SQLite FTS5 + Qdrant）                      |
| `EVALS.md`                                    | 评估框架（套件、运行、评分标准）                      |
| `GUARDRAILS.md`                               | PII masker、即时注入、视觉桥                          |
| `COMPLIANCE.md`                               | 审核日志、保留、noLog 选择退出                        |
| `WEBHOOKS.md`                                 | HMAC 签名的 Webhook 交付                              |
| `REASONING_REPLAY.md`                         | `reasoning_content`的混合memory/SQLite缓存            |
| `AUTHZ_GUIDE.md`                              | 授权管道（`classify` → `policies` → `enforce`）       |
| `RESILIENCE_GUIDE.md`                         | 断路器+冷却+模型锁定                                  |
| `docs/security/STEALTH_GUIDE.md` （仅限 git） | TLS指纹 (JA3/JA4)、 Claude代码CCH、 MITM证书          |
| `AUTO-COMBO.md`                               | 自动组合引擎（16 因素评分、6 个模式包、虚拟工厂）     |

### 压缩

| 医生                            | 目的                          |
| ------------------------------- | ----------------------------- |
| `COMPRESSION_GUIDE.md`          | 压缩模式概述+路线图           |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK引擎、注册表合约 |
| `COMPRESSION_RULES_FORMAT.md`   | 穴居人规则包JSON模式          |
| `COMPRESSION_LANGUAGE_PACKS.md` | 每种语言的规则包清单          |
| `RTK_COMPRESSION.md`            | RTK声明式管道（56 个过滤器）  |

### 部署

| 医生                         | 目的                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker构建、配置文件 (base/cli/host/cliproxyapi)、 Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | 通用VM/VPS部署（Ubuntu/Debian + nginx + systemd）                |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io部署（目前仅限中文）                                       |
| `TERMUX_GUIDE.md`            | 通过 Termux 实现 Android 无头                                    |
| `PWA_GUIDE.md`               | 渐进式 Web 应用程序安装+ Service Worker                          |
| `ELECTRON_GUIDE.md`          | 桌面应用程序构建+签名+分发                                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale漏斗                              |
| `PROXY_GUIDE.md`             | 4 级出站代理+ 1proxy 市场                                        |

### 子目录

| 子目录                | 目的                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | 本地化文档翻译（41 个语言环境）                                                                                                                 |
| `docs/screenshots/`   | 指南的图像资源                                                                                                                                  |
| `_tasks/superpowers/` | 来自超级大国（`writing-plans`/`brainstorming`）的Plans/specs +研究 — 孤立的、单独版本的存储库，被主树忽略。参见CLAUDE.md → 《规划与研究工件》。 |

---

## `tests/` — 测试套件

| 子目录                               | 类型                                  | 运行器                            |
| ------------------------------------ | ------------------------------------- | --------------------------------- |
| `tests/unit/`                        | 单元测试（约 4,800 个文件，速度最快） | Node 原生测试运行器               |
| `tests/integration/`                 | 多模块 + 数据库集成测试               | Node 原生测试运行器（并发数为 1） |
| `tests/e2e/`                         | UI + 工作流 E2E                       | Playwright                        |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A 真实客户端 E2E              | 自定义协议客户端                  |
| `tests/e2e/ecosystem.test.ts`        | 提供者集成（涉及网络访问）            | Node 原生测试运行器               |

---

## `public/` — 静态资源

| 路径                | 用途                                                 |
| ------------------- | ---------------------------------------------------- |
| `public/`（根目录） | 网站图标、robots.txt、清单、Service Worker、营销图片 |
| `public/providers/` | 提供者徽标 PNG/SVG（用于仪表板）                     |

---

## `config/` — 静态配置 + 质量门禁状态

随附的配置模板以及已提交的质量门禁基线
（在 v3.8.26 中从仓库根目录移至此处，以保持根目录简洁）。

| 路径                                          | 用途                                                               |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `config/i18n.json`                            | 区域设置列表 + 元数据（42 个区域设置数量的规范来源）               |
| `config/i18n-schema.json`                     | 用于验证 `i18n.json` 的 JSON schema                                |
| `config/payloadRules.json`                    | 上游载荷清理规则                                                   |
| `config/quality/quality-baseline.json`        | 多指标棘轮基线（`scripts/quality/check-quality-ratchet.mjs`）      |
| `config/quality/complexity-baseline.json`     | 冻结的 ESLint 复杂度基线（`check-complexity.mjs`）                 |
| `config/quality/duplication-baseline.json`    | 冻结的 jscpd 重复代码基线（`check-duplication.mjs`）               |
| `config/quality/file-size-baseline.json`      | 冻结的每文件大小基线（`check-file-size.mjs`）                      |
| `config/quality/test-discovery-baseline.json` | 冻结的孤立测试基线（`check-test-discovery.mjs`）                   |
| `config/quality/dependency-allowlist.json`    | 已批准的依赖项允许列表（`check-deps.mjs`）                         |
| `config/quality/.license-allowlist.json`      | SPDX 许可证允许列表（`check-licenses.mjs`）                        |
| `config/quality/quality-metrics.json`         | 临时收集的指标（由 `collect-metrics.mjs` 生成；**已被 git 忽略**） |

---

## `.github/` — GitHub 集成

| 路径                               | 用途                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD 工作流（代码检查、测试、覆盖率、发布） |
| `.github/ISSUE_TEMPLATE/`          | Bug/功能议题模板                                            |
| `.github/pull_request_template.md` | PR 模板                                                     |
| `.github/dependabot.yml`           | 依赖项更新配置                                              |

---

## `.husky/` — Git 钩子

| 文件         | 用途                                                        |
| ------------ | ----------------------------------------------------------- |
| `pre-commit` | 运行 `lint-staged + check-docs-sync + check:any-budget:t11` |
| `pre-push`   | 当前已禁用（已注释）。请手动运行 `npm run test:unit`。      |
| `_/`         | Husky 内部文件                                              |

---

## `.claude/` — Claude Code 斜杠命令

| 文件                                                | 用途                                              |
| --------------------------------------------------- | ------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — 提升版本号并自动生成变更日志 |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — 完整发布工作流           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | 部署到 VPS                                        |
| `commands/capture-release-evidences-cc.md`          | 在浏览器中将新功能录制为 WebP                     |
| `commands/review-{prs,discussions}-cc.md`           | 分类处理 GitHub PR/讨论                           |
| `commands/{review-issues,implement-features}-cc.md` | 议题工作流                                        |
| `settings.local.json`                               | 项目级 Claude Code 设置                           |

---

## `.agents/` — 通用代理工作流（Codex / Cursor / 等）

| 路径                     | 用途                                          |
| ------------------------ | --------------------------------------------- |
| `workflows/*-ag.md`      | 11 个工作流定义（`.claude/commands/` 的镜像） |
| `skills/<name>/SKILL.md` | 9 个技能定义，包含 Codex 执行说明             |

> **注意：** 工作流和命令目前在字节层面完全相同。如果 `.agents/` 旨在面向不同的代理运行时（Codex），则这些变体需要有实质性的差异。

---

## `_ideia/`、`_mono_repo/`、`_references/`、`_tasks/` — 树外目录

这些以下划线开头的目录用于存放不随软件发布的内容：

- **`_ideia/`** — 设计说明（defer / notfit / viable 分类）
- **`_mono_repo/`** — 历史子项目（omnirouteCloud、omnirouteSite、vscode-extension）
- **`_references/`** — 相关开源软件项目（LiteLLM、9router、ClawRouter、CLIProxyAPI、modelrelay、new-api 等）的只读克隆，用于开发期间交叉参考
- **`_tasks/`** — 各版本的任务跟踪文件（非正式）

不包含在 `npm pack` 输出中。请参阅 `.npmignore`。

---

## 生成内容 / 已被 Git 忽略

| 路径                   | 用途                    |
| ---------------------- | ----------------------- |
| `node_modules/`        | npm 依赖                |
| `.next/`               | Next.js 构建输出        |
| `coverage/`            | c8 覆盖率报告           |
| `logs/`                | 运行时日志              |
| `package/`             | npm pack 暂存目录       |
| `.playwright-mcp/`     | Playwright MCP 测试产物 |
| `.issues/`             | 本地 issue 缓存         |
| `tsconfig.tsbuildinfo` | TS 增量编译缓存         |

---

## 导航提示

- **新贡献者？** 请依次阅读 `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`。
- **添加提供者？** 请遵循 `docs/architecture/ARCHITECTURE.md § Adding a New Provider`，并与 `docs/reference/PROVIDER_REFERENCE.md` 交叉核对。
- **添加路由？** 请参阅 `docs/architecture/ARCHITECTURE.md § Adding a New API Route` 和 `src/shared/validation/schemas.ts`。
- **添加 MCP 工具？** 请参阅 `docs/frameworks/MCP-SERVER.md § Adding a Tool`。
- **添加 A2A 技能？** 请参阅 `docs/frameworks/A2A-SERVER.md § Adding a New Skill`。
- **在本地运行？** 请参阅 `docs/guides/SETUP_GUIDE.md`。
- **部署？** 请参阅 `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`。
- **发布？** 请参阅 `docs/ops/RELEASE_CHECKLIST.md`（以及 `/generate-release-cc` Claude Code 技能）。
