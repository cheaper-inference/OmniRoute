# Repository Map (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **什么存在于哪里：每个跟踪的顶级目录和根文件，具有一行目的。**最后更新：2026-11-13（OmniRoute v3.8.54）
>
> 使用此地图来查找代码库，然后点击专用文档的链接。文件计数是在上述日期使用`git ls-files`进行测量的。它们几乎随着每个版本的发布而变化，因此将它们视为数量级。

## 顶级树

```
OmniRoute/
├── src/              # Next.js 16 app: dashboard, /api and /v1 routes, server libs, domain, i18n
├── open-sse/         # Streaming engine workspace (@omniroute/open-sse): handlers, executors, translator, services, MCP server
├── packages/         # npm workspaces: ui-kit (vendored Keak CI UI Kit) and browser-pool
├── @omniroute/       # Separately published npm packages (OpenCode plugins and provider)
├── bin/              # Published `omniroute` CLI, MCP/bridge entry points, self-host ops scripts (*.sh)
├── electron/         # Desktop app (Electron main/preload + helpers + icons)
├── public/           # Static assets served by Next.js (provider logos, PWA icons, sw.js, openapi.yaml copy)
├── skills/           # Agent Skills (SKILL.md) served by /api/agent-skills, MCP and A2A
├── tests/            # All test suites: unit, integration, e2e, homolog, fixtures, snapshots
├── scripts/          # Build, quality gates, i18n, release, ops, perf and one-off scripts (allow-listed subfolders)
├── config/           # Versioned config: i18n, payload rules, CLI manifest, quality-gate baselines, release inventories
├── changelog.d/      # Per-PR changelog fragments, aggregated into CHANGELOG.md at release time
├── docs/             # Public documentation (served at /docs via Fumadocs) + translated mirrors in docs/i18n/
├── examples/         # Example plugins and quickstart clients
├── deploy/           # Kubernetes deployment: Helm chart + Kustomize base/overlays
├── docker/           # Auxiliary container images (not the main image, which is the root Dockerfile)
├── contrib/          # Community recipes: Podman quadlets, VPS compose, Windows launchers, session-sync note
├── .github/          # GitHub Actions workflows, composite actions, issue/PR templates, CODEOWNERS, labels
├── .husky/           # Tracked git hooks: commit-msg, pre-commit, pre-push
├── .vale/            # Vale prose-lint vocabulary (styles/Vocab/OmniRoute/accept.txt)
├── .vscode/          # Shared VS Code workspace settings (settings.json)
└── (root files — see below)
```

本地、生成或私有路径（所有 gitignored，从未提交，不进一步描述）：

```
node_modules/            # npm dependencies
.build/                  # Next.js build output (default distDir .build/next, see next.config.mjs)
dist/                    # npm staging directory assembled by scripts/build/prepublish.ts
.source/                 # fumadocs-mdx output that feeds the /docs viewer
.husky/_/                # Husky runtime generated on install (core.hooksPath target)
coverage/ logs/ test-results/ playwright-report/   # coverage, runtime logs, Playwright output
.env                     # local secrets generated from .env.example
_*/                      # private local-only folders (anchored /_* ignore); never tracked
.claude/ .agents/        # local AI-assistant state and skills; never tracked
```

---

## 根文件

存储库根 (`git ls-files | grep -v /`) 中的所有跟踪文件，按功能分组。

### 项目文档

| 文件                     | 目的                                                  |
| ------------------------ | ----------------------------------------------------- |
| `README.md`              | 登陆页面：功能概述、快速入门、安装方法                |
| `CHANGELOG.md`           | 每个版本的变更日志（ `changelog.d/`的片段折叠在此处） |
| `ROADMAP.md`             | 公共路线图                                            |
| `LICENSE`                | MIT许可证                                             |
| `THIRD_PARTY_NOTICES.md` | 捆绑第三方代码的注意事项（例如 wreq-js 绑定）         |
| `CONTRIBUTING.md`        | 贡献者指南：设置、常规提交、测试矩阵、 PR流程         |
| `SECURITY.md`            | 漏洞报告政策                                          |
| `CODE_OF_CONDUCT.md`     | 社区行为期望                                          |
| `llm.txt`                | LLM爬虫和助手的纯文本项目总结                         |

### AI辅助指令

| 文件        | 目的                                           |
| ----------- | ---------------------------------------------- |
| `AGENTS.md` | 每个AI助理的单一事实来源：惯例、质量门、硬规则 |
| `CLAUDE.md` | 克劳德代码 - 特定的增量；进口`AGENTS.md`       |
| `GEMINI.md` | 双子座特有的三角洲；指向`AGENTS.md`            |

嵌套指南也存在于它们描述的代码旁边： `open-sse/services/AGENTS.md`和`src/lib/db/AGENTS.md`。

### 包清单和节点工具链

| 文件                       | 目的                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| `package.json`             | npm 清单：脚本、依赖项、 `engines`、 `workspaces`、已发布的`files` |
| `package-lock.json`        | 锁定的依赖树                                                       |
| `pnpm-workspace.yaml`      | pnpm 工作区列表（`packages/*`、 `open-sse`）和本机构建白名单       |
| `.npmrc` / `.npmignore`    | npm 配置和发布排除                                                 |
| `.node-version` / `.nvmrc` | 版本管理器的节点版本引脚                                           |
| `flake.nix` / `flake.lock` | Nix dev shell 及其锁                                               |
| `Makefile`                 | 委托给 npm 脚本的`make`快捷方式                                    |

### TypeScript、 Next.js和文档构建

| 文件                                      | 目的                                                                |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `tsconfig.json`                           | 基本TypeScript配置和路径别名（`@/*`、 `@omniroute/open-sse`）       |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core`切片                                        |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` （严格`noImplicitAny`）切片     |
| `tsconfig.typecheck-api.json`             | API 路由类型检查切片 (`scripts/check/check-api-typecheck.mjs`)      |
| `tsconfig.typecheck-dashboard.json`       | 仪表板类型检查切片 (`npm run check:dashboard-typecheck`)            |
| `tsconfig.build.json`                     | 生产型式检查（`npm run typecheck:build`、 `check:build-typecheck`） |
| `tsconfig.mitm.json`                      | `scripts/build/buildMitm.mjs`使用的MITM构建配置                     |
| `next.config.mjs`                         | Next.js 16 配置（独立输出，构建配置文件别名）                       |
| `source.config.ts`                        | Fumadocs `defineDocs`配置：哪些`docs/`部分编译成`/docs`             |
| `postcss.config.mjs`                      | PostCSS / Tailwind管道                                              |

### Lint 和格式化

| 文件                                      | 目的                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | 主要ESLint平面配置（`npm run lint`，与`config/quality/eslint-suppressions.json`） |
| `eslint.complexity-ratchets.config.mjs`   | 一次ESLint传递中的复杂性和认知复杂性棘轮使用的独立配置                            |
| `eslint.complexity.config.mjs`            | 仅具有核心`complexity` + `max-lines-per-function`独立配置（由测试使用）           |
| `prettier.config.mjs` / `.prettierignore` | Prettier规则和排除                                                                |
| `.editorconfig`                           | 编辑器默认值（2 个空格缩进）                                                      |
| `.markdownlint.json`                      | 咨询 Markdown lint (`npm run lint:md`)                                            |
| `.vale.ini`                               | 咨询性散文 lint (`npm run lint:prose`)， `.vale/`中的词汇                         |

### 测试、评估和覆盖范围

| 文件                          | 目的                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest套件： `npm run test:vitest:ui` （仪表板`.tsx`、hooks、 memory/skills测试）      |
| `vitest.mcp.config.ts`        | 节点Vitest套件： `npm run test:vitest` （MCP服务器， autoCombo，组合， API `.spec.ts`）      |
| `vitest.quarantine.config.ts` | 运行`config/quality/vitest-exclusions.json`中列出的隔离文件                                  |
| `vitest.e2e-live.config.ts`   | 实时服务器Vitest套件（`tests/e2e/ecosystem.test.ts`、 `tests/e2e/protocol-clients.test.ts`） |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                |
| `stryker.conf.mjs`            | Stryker 突变测试（`npm run test:mutation`；根据`mutate`计算`tap.testFiles` ）                |
| `stryker.disablebail.mjs`     | 不带卡环的 Stryker 型号，用于测试冗余测量                                                    |
| `promptfooconfig.yaml`        | Promptfoo LLM-安全套件                                                                       |
| `codecov.yml`                 | Codecov 补丁覆盖设置                                                                         |

### Docker和部署

| 文件                              | 目的                                                                   |
| --------------------------------- | ---------------------------------------------------------------------- |
| `Dockerfile`                      | 多阶段图像 (`builder` → `runner-base` → `runner-web` / `runner-cli*`)  |
| `Dockerfile.bun`                  | Bun运行时上的替代图像（由`docker-publish.yml`构建）                    |
| `docker-compose.yml`              | 默认使用配置文件（base、web、cli、host、内存、cliproxyapi 等）进行组合 |
| `docker-compose.prod.yml`         | 端口 20130 上的单独生产快照实例                                        |
| `docker-compose.selfhost.yml`     | 一命令环回自主机（与`.env.selfhost.example`配对）                      |
| `docker-compose.ollama-local.yml` | Docker OmniRoute与主机本地Ollama对话                                   |
| `.dockerignore`                   | Docker构建上下文排除                                                   |
| `fly.toml`                        | Fly.io 应用程序配置（端口 20128， `/data`卷）                          |

### 安全、供应链和存储库机器人

| 文件                                         | 目的                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks 秘密扫描规则和白名单                                        |
| `.trivyignore`                               | 容器镜像扫描的可接受风险抑制                                         |
| `.zizmor.yml`                                | zizmor GitHub操作安全审核配置                                        |
| `socket.yml`                                 | Socket.dev 应用程序配置（路径忽略；不是CI门）                        |
| `sonar-project.properties`                   | SonarQube/SonarCloud项目配置                                         |
| `knip.json`                                  | Knip 未使用的files/exports/deps配置（提供`npm run check:dead-code`） |
| `.size-limit.json`                           | 捆绑预算                                                             |
| `.mergify.yml`                               | Mergify 合并队列配置                                                 |
| `.coderabbit.yaml`                           | CodeRabbit审核配置                                                   |
| `.cbmignore`                                 | 忽略 codebase-memory-mcp 代码索引列表                                |
| `.gitignore` / `.gitattributes` / `.mailmap` | 忽略规则、脚本的LF行结尾、规范作者身份                               |

### 环境模板、状态和源

| 文件                        | 目的                                              |
| --------------------------- | ------------------------------------------------- |
| `.env.example`              | 首次安装时将模板复制到`.env` ；环境变量的参考列表 |
| `.env.selfhost.example`     | `docker-compose.selfhost.yml`模板                 |
| `.env.homolog.example`      | 认证跑步者的模板 (`npm run homolog`)              |
| `.env.devin-bridge.example` | Devin桥设置的示例 env 文件                        |
| `.i18n-state.json`          | 增量翻译状态（每个文档和区域设置的源哈希）        |
| `news.json`                 | 由仪表板读取的本地化公告提要（架构 v2）           |

---

## `src/` — Next.js应用

大约 4,550 个跟踪文件。路径别名`@/*` → `src/*`。

```
src/
├── app/                  # App Router: pages, layouts and route handlers (file-convention loaded)
│   ├── (dashboard)/      # Route group for the dashboard: dashboard/<section>/ pages + home widgets
│   ├── api/              # HTTP routes: v1/ (OpenAI-compatible), v1beta/ (Gemini-style), management routes
│   ├── docs/             # Embedded docs viewer (lib/openapi.generated.ts is generated)
│   ├── a2a/ .well-known/ # A2A JSON-RPC entry point and Agent Card discovery
│   ├── healthz/ livez/ readyz/ status/   # Health probes and status page
│   ├── landing/ login/ auth/ authorize/ callback/ connect/   # Public, auth and OAuth pages
│   ├── miniapp/          # Telegram Mini App page
│   └── 400/ … 503/       # Static HTTP error pages
├── lib/                  # Server-side libraries and domain modules (largest folder)
├── shared/               # Code shared by server and client: components, constants, validation, utils
├── sse/                  # Next.js side of the SSE pipeline: handlers/ (chat*), services/ (auth, leases, quotas)
├── mitm/                 # MITM / TPROXY capture: cert/, dns/, handlers/, targets/, inspector/, tproxy/ (C addon)
├── server/               # Server-only: authz/ (route guard pipeline), auth/, cors/, origin/, ws/
├── domain/               # Policy engine, fallback, cost rules, lockout, quota cache, assessment/
├── i18n/                 # next-intl: messages/ (67 locales), global-error-messages/ (generated), routeNamespaces.generated.json
├── store/                # Zustand client stores (theme, notifications, …)
├── hooks/                # Client hooks (live dashboard, compression preview, breaker health)
├── types/                # Ambient and shared type declarations
├── models/               # Compatibility barrel re-exporting db functions
├── middleware/           # promptInjectionGuard.ts (facade over the guardrail system)
├── scripts/              # backfillAggregation.ts (`npm run backfill-aggregation`)
├── proxy.ts              # Next.js 16 proxy: headless gate + authz pipeline for dashboard, /api and /v1-style paths
├── instrumentation.ts    # Next.js instrumentation hook (delegates Node-only work)
└── instrumentation-node.ts   # Node-only startup work
```

### `src/app/` —应用路由器

| 小路                                                                | 目的                                                                                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | 公共 OpenAI 兼容API：聊天、完成、响应、消息、嵌入、图像、音频、视频、音乐、重新排名、审核、搜索、文件、批次、ws、模型……         |
| `app/api/v1beta/`                                                   | 双子座风格的端点                                                                                                                |
| `app/api/` （其他文件夹）                                           | 管理和管理路线：提供程序、组合、设置、密钥、使用情况、日志、mcp、a2a、acp、内存、技能、评估、webhooks、隧道、插件、雷达、工具…… |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API —参见[AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                        |
| `app/api/tools/traffic-inspector/`                                  | 交通督察REST API —参见[TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                |
| `app/(dashboard)/dashboard/`                                        | 每个仪表板部分一个文件夹（提供程序、组合、日志、使用情况、成本、缓存、压缩、内存、游乐场、搜索工具、设置、工具等）              |
| `app/(dashboard)/home/`                                             | 主屏幕及其小部件                                                                                                                |
| `app/docs/`                                                         | 文档查看器呈现`source.config.ts`中列出的 Fumadocs 部分                                                                          |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | 根布局、根条目（重定向）、 PWA清单、全局CSS                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | 错误边界和回退                                                                                                                  |

API路线遵循`Route → CORS → Zod validation → optional auth → policy → handler`；请参阅[ARCHITECTURE.md](ARCHITECTURE.md)和[API_REFERENCE.md](../reference/API_REFERENCE.md) 。

### `src/lib/` —服务器库

大约 90 个子文件夹加上大约 90 个顶级模块。主要群体：

| 区域               | 文件夹/文件                                                                                                         | 深潜                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 数据库             | `db/` —域模块、 `migrations/`、 `adapters/`、 `repositories/`、 `migrationRunner/`                                  | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE](../ops/DATABASE_GUIDE.md)                                            |
| 使用量、配额和支出 | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE](../routing/QUOTA_SHARE.md), [COST_TRACKING](../guides/COST_TRACKING.md)                                                       |
| 提供者和模型       | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                    |
| OAuth和凭证        | `oauth/` （提供者/、服务/、utils/）、 `zed-oauth/`、 `copilot/`、 `cursor/`、 `credentialHealth/`                   | `resolvePublicCred()` （运营商文档，未公开提供）                                                                                            |
| 安全与治理         | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                      |
| 代理特点           | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| 插件和服务         | `plugins/`、 `services/` （嵌入式服务安装人员和主管）                                                               | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                          |
| 路由和弹性         | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                     |
| 代理和网络         | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, 隧道模块                                       | [PROXY_GUIDE](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE](../ops/TUNNELS_GUIDE.md)                                                              |
| 工作和日程安排     | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                             |
| 可观察性和导出     | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                      |
| CLI和IDE集成       | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                 |
| 上下文来源         | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| 其他特点           | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

值得了解的顶级模块：

| 文件                                                           | 目的                                            |
| -------------------------------------------------------------- | ----------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | 响应缓存和幂等性                                |
| `webhookDispatcher.ts`                                         | HMAC 签名的 Webhook 交付                        |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | 隧道管理者                                      |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | 后台凭证健康检查和刷新电路                      |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | 流媒体响应消毒剂                                |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | 流程生命周期                                    |
| `*.stub.ts`                                                    | 构建配置文件存根由`next.config.mjs`中的别名交换 |

### `src/lib/db/` —数据库

| 小路                  | 目的                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()`单例（WAL日志）                                                          |
| `db/migrations/`      | 编号、幂等`.sql`迁移（撰写本文时有 236 个文件； `check-migration-numbering.mjs`保护编号） |
| `db/migrationRunner/` | 迁移运行者                                                                                |
| `db/adapters/`        | SQLite驱动适配器（better-sqlite3、node:sqlite、bun:sqlite、 sql.js）                      |
| `db/repositories/`    | SQLite存储库实现（组合、游乐场预设、路由配置）                                            |
| `db/<domain>.ts`      | 大约 175 个域模块（提供程序、组合、 apiKeys、设置、用法等） —总是直接导入这些模块         |

### `src/domain/`, `src/server/`, `src/shared/`

| 小路                                                           | 目的                                                                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | 策略引擎                                                                                                                                 |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | 后备决策、锁定政策、成本规则                                                                                                             |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | 配额缓存和快照持久化                                                                                                                     |
| `domain/assessment/`                                           | 模型评估（评估器、分类器、自我修复器）                                                                                                   |
| `server/authz/`                                                | 授权管道和路由保护 (`routeGuard.ts`) —请参阅[AUTHZ_GUIDE.md](AUTHZ_GUIDE.md) 、 [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS原点解析和CORS —参见[CORS.md](../security/CORS.md)                                                                          |
| `server/ws/`                                                   | 实时仪表板WebSocket服务器                                                                                                                |
| `shared/components/`                                           | `packages/ui-kit` —上的仪表板组件和适配器请参阅[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                      |
| `shared/constants/`                                            | 提供者目录 (`providers.ts`)、路由策略、 CLI工具、图标图、上游标头拒绝列表等                                                              |
| `shared/validation/`                                           | Zod模式和验证助手                                                                                                                        |
| `shared/utils/`                                                | 断路器、API 密钥身份验证、获取超时、功能标志……                                                                                           |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | 聊天准入中间件、网络助手、客户端服务、 React挂钩                                                                                         |

---

## `open-sse/` —流媒体引擎工作区

npm 工作区`@omniroute/open-sse` （大约 2,390 个跟踪文件）。它负责请求处理和提供者执行。概述： [OPEN_SSE_ARCHITECTURE](../frameworks/OPEN_SSE_ARCHITECTURE.md) 。

```
open-sse/
├── handlers/       # Request handlers: chatCore.ts + chatCore/, responses, embeddings, audio, imageGeneration/,
│                   #   videoGeneration/, search/, fal/, mediaGeneration/, sseParser/, responseSanitizer/, …
├── executors/      # Provider-specific HTTP dispatch, registered in executors/registry.ts; base/ holds shared recovery helpers
├── translator/     # Format conversion: request/, response/, helpers/, image/, registry.ts, bootstrap.ts
├── transformer/    # responsesTransformer.ts (Responses API ↔ Chat Completions TransformStream)
├── services/       # Combo routing, rate limits, fallback, caching, usage, token refresh, compression (see below)
├── config/         # Provider registry (config/providers/registry/<id>/), constants, model/media registries
├── mcp-server/     # MCP server: tools/, schemas/, toolSearch/, transports, audit, scopes, __tests__/
├── utils/          # Stream, error, TLS, proxy-fetch and logging utilities
├── vendor/         # codex-chatgpt-web/ — vendored adapter (provenance in vendor.json)
├── lib/            # DeepSeek proof-of-work worker and hash
├── shared/         # zedAuth.ts
├── index.ts        # Workspace entry
└── package.json · tsconfig.json · types.d.ts
```

### `open-sse/services/`

| 小路                                                                                           | 目的                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `combo.ts` + `combo/`                                                                          | 组合路由策略—参见[AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                       |
| `autoCombo/`                                                                                   | 自动组合评分和模式包                                                                                                                             |
| `accountFallback.ts` + `accountFallback/`                                                      | 连接冷却和模型锁定—参见[RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | 速率限制跟踪和标头解析                                                                                                                           |
| `compression/`                                                                                 | 压缩引擎 (`engines/`)、规则包 (`rules/`)、 `eval/`、 `harness/`、 `riskGate/` —请参阅[COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | 令牌刷新、使用情况统计、缓存、准入通道、会话池、 Codex帐户、路由助手                                                                             |
| `__tests__/`                                                                                   | 共置Vitest套件（由Vitest配置收集）                                                                                                               |
| `AGENTS.md`                                                                                    | 此文件夹的代理指南                                                                                                                               |

模式：文件夹`X/`旁边的大模块`X.ts`意味着该模块被拆分为较小的文件（`handlers/chatCore.ts` + `handlers/chatCore/`、 `services/combo.ts` + `services/combo/`）。

### `open-sse/mcp-server/`

| 小路                  | 目的                                                                   |
| --------------------- | ---------------------------------------------------------------------- |
| `server.ts`           | MCP服务器生命周期                                                      |
| `httpTransport.ts`    | 可流式传输HTTP和SSE                                                    |
| `scopeEnforcement.ts` | 每个工具范围检查                                                       |
| `audit.ts`            | 工具调用审核日志记录                                                   |
| `schemas/`            | 工具定义和范围                                                         |
| `tools/`              | 工具实现（内存、技能、压缩……）                                         |
| `toolSearch/`         | 工具搜索                                                               |
| `README.md`           | 内部架构笔记；完整目录在[MCP-SERVER.md](../frameworks/MCP-SERVER.md)中 |

---

## `packages/` — npm 工作区

| 小路                     | 目的                                                                                                                                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`：Keak CI UI套件的供应快照，用作源。 `UPSTREAM.md`固定上游提交， `PATCHES.md`列出本地补丁。 `src/`仅由`scripts/dev/sync-ui-kit.sh`同步并由`npm run check:ui-kit-snapshot`保护。参见[DESIGN_SYSTEM](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`：浏览器池接口和实现（`packages/browser-pool/src/index.ts`， `packages/browser-pool/src/interfaces.ts`）。列于`workspaces`；网关使用的运行时浏览器池位于`open-sse/services/`中                                 |

## `@omniroute/` —单独发布包

这些不是 npm 工作区。每个都有自己的`package.json`和锁文件；该文件夹以`omniroute` tarball (`files: ["@omniroute/"]`) 形式提供。

| 小路                             | 目的                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | OpenCode插件（模型发现、 `/connect` auth）； `omniroute setup-opencode`使用—参见[OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | v2 Promise 的OpenCode插件API —参见[OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                               |
| `@omniroute/opencode-provider/`  | 静态配置生成器；在自己的`package.json`中标记为弃用，转而使用`opencode-plugin`                                            |

---

## `bin/` — CLI和 ops 脚本

| 小路                                                                        | 目的                                                                            |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | 主要CLI条目（`omniroute serve`、 `setup`、 `doctor`、 `providers`、 `combo`等） |
| `reset-password.mjs`                                                        | `omniroute-reset-password`二进制文件                                            |
| `mcp-server.mjs`                                                            | MCP stdio 入口点                                                                |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | 辅助桥/ MCP入口点                                                               |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM解析钩子，映射全局安装的 tsconfig 路径别名                                   |
| `nodeRuntimeSupport.mjs`                                                    | 支持Node.js版本检查                                                             |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | 自托管事件恢复脚本（共享`_ops-common.sh`）                                      |
| `cold-start-bench.sh`                                                       | 冷启动基准—请参阅[PERF_BASELINE.md](../ops/PERF_BASELINE.md)                    |
| `cli/commands/`                                                             | 每个CLI命令一个模块（大约 100 个，包括`setup-*`集成）                           |
| `cli/api-commands/`                                                         | 由`npm run build:cli-api` —从`docs/openapi.yaml`生成，请勿编辑                  |
| `cli/locales/`                                                              | CLI消息目录（67 个语言环境）                                                    |
| `cli/tui/`, `cli/tui-components/`                                           | 终端UI                                                                          |
| `cli/tray/`                                                                 | 系统托盘和自动启动（Windows PowerShell后端， macOS/Linux上的系统托盘）          |
| `cli/runtime/`                                                              | 本机运行时解析（`sqliteRuntime.mjs`、 `magicBytes.mjs`）、进程管理器            |
| `cli/*.mjs`                                                                 | 共享助手（参数、 API客户端、数据目录、加密、提供程序存储、设置存储等）          |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI内部结构和约定                                                               |

请参阅[CLI-TOOLS.md](../reference/CLI-TOOLS.md)和[CLI-COMPANION.md](../guides/CLI-COMPANION.md) 。

## `electron/` —桌面应用程序

| 小路                                                       | 目的                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `main.js`                                                  | Electron主流程（窗口、嵌入式服务器、托盘、更新）                 |
| `preload.js`                                               | IPC桥暴露给渲染器                                                |
| `lib/`                                                     | 窗口生命周期、服务器准备情况、运行状况监视程序、远程服务器首选项 |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | 远程服务器提示窗口                                               |
| `processTree.js`, `sqlite-inspection.js`                   | 子进程清理和SQLite检查助手                                       |
| `package.json` / `package-lock.json`                       | Electron-builder 配置和Electron依赖项                            |
| `assets/`                                                  | 应用程序和托盘图标（`.ico`、 `.icns`、 `.png`）                  |
| `README.md`                                                | 内部注释—参见[ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)    |

## `public/` —静态资产

| 小路                                        | 目的                                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `providers/`                                | 由 id (`/providers/<id>.svg`) 加载的提供者徽标；出处`config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | 浏览器和PWA图标                                                                                       |
| `sw.js`                                     | 服务工作者—参见[PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                 |
| `openapi.yaml`                              | `npm run gen:public-openapi`生成的`docs/openapi.yaml`的副本                                           |
| `images/`, `sponsors/`, `deyin.svg`         | 层级流程图、赞助商横幅、 README图稿                                                                   |

## `skills/` —代理技能

46个技能，一个文件夹每个有一个`SKILL.md` （`cli-*`， `omni-*`， `config-codex-cli`， `ponytail`），加上`skills/README.md`。 `src/lib/agentSkills/catalog.ts`在运行时读取它们并通过`/api/agent-skills`、 MCP和A2A公开它们。大多数清单是由`src/lib/agentSkills/generator.ts`生成的（`scripts/skills/generate-agent-skills.mjs`； `npm run check:agent-skills-sync`检查漂移）。参见[AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md) 。

---

## `scripts/` —构建、大门和工具

大约 435 个跟踪文件。新脚本进入`AGENTS.md`允许的子文件夹之一；一次性代码放入`scripts/ad-hoc/`中。

```
scripts/
├── check-permissions.sh   # Container ENTRYPOINT (copied to /app by the Dockerfile)
├── postinstall.mjs        # Native-runtime warm-up run after scripts/build/postinstall.mjs
├── start-ws-server.mjs    # Starts the live-dashboard WebSocket server as a separate process
├── build/                 # Build, standalone assembly, npm pack/publish, postinstall, MITM, Electron prep
├── check/                 # Quality gates behind most `npm run check:*` scripts; lib/ holds shared helpers
├── quality/               # Ratchets, gate manifest, impact map, mutation tooling, release acceptance
├── ci/                    # Steps invoked only by workflows (Docker publish, Release-Green, scanners)
├── dev/                   # Dev runners (run-next, Playwright/protocol/ecosystem runners) and runtime helpers shipped in the package
├── docs/                  # README SVG/diagram generators, OpenAPI module, provider reference, wiki sync
├── i18n/                  # UI and docs translation pipeline, coverage checks, glossary/, lib/
├── release/               # Changelog aggregation, contributors, merge train, LTS cut, publish verification
├── ops/                   # Canary deploy, OpenCode free relay, runner janitor, allowlist sync
├── perf/                  # Benchmarks and one-off performance A/B scripts
├── cli/                   # CLI tooling (API-command generator, SSO, CLI smoke tests, media MCP)
├── homolog/               # Homologation against a running instance + promptfoo config generation
├── features/              # Feature-triage engine and its lib/
├── router-eval/           # Offline router evaluation (`npm run eval:router*`)
├── compression/           # Compression benchmark (`npm run bench:compression`, runs on Bun)
├── compression-eval/      # Compression quality evaluation (`npm run eval:compression`)
├── devin-bridge/          # Shell entry points for the Devin bridge (build, launch, tests)
├── docker/                # Base-path patching for the standalone server inside containers
├── integrations/          # MarkItDown MCP launchers — see docs/integrations/MARKITDOWN_MCP.md
├── launchers/             # Double-click launchers and desktop-shortcut creators (Windows/macOS/Linux)
├── packs/                 # Optional-pack manifest and installer (shipped in the npm package)
├── test/                  # Live smoke scripts (combo-live, OpenCode/ChatGPT Web)
├── sre/                   # On-call rotation, log redaction, TCP close analyzer
├── vps/                   # Start/stop the release runner
├── skills/                # Agent Skills generator CLI
├── research/              # Free-tier budget card SVG generator
└── ad-hoc/                # One-shot diagnostics and migrations
```

常用的入口点：

| 脚本                                                                | 目的                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start`跑步者                                                    |
| `build/build-next-isolated.mjs`                                     | `npm run build` （Next.js独立构建）                                                  |
| `build/prepublish.ts`                                               | `npm run build:cli`：组装 npm `dist/`                                                |
| `build/postinstall.mjs`                                             | npm `postinstall`钩子                                                                |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` （重新生成PROVIDER_REFERENCE.md）                   |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` （生成`src/app/docs/lib/openapi.generated.ts`）                      |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` （文档镜像）                                                      |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                            |
| `release/aggregate-changelog.mjs`                                   | 将`changelog.d/`片段折叠成`CHANGELOG.md`                                             |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` （文档准确性门）                                     |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` （阻止跟踪的根`_*`路径）                           |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` （针对`config/quality/`公制棘轮）                          |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                               |
| `dev/new-worktree.sh`                                               | 创建一个独立的开发工作树—请参阅[WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | 将`packages/ui-kit/src`同步到固定的上游提交                                          |

门库存和政策： [QUALITY_GATES.md](QUALITY_GATES.md) 。

## `config/` —版本化配置和门状态

| 小路                                     | 目的                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | 支持的区域设置（区域设置计数的来源）及其架构                                         |
| `payloadRules.json`                      | 上游负载规则 (`open-sse/services/payloadRules.ts`)                                   |
| `cli-tools-manifest.json`                | 可集成CLI工具清单 (`bin/cli/cli-manifest.mjs`)                                       |
| `alibaba-free-tier-allowlist.json`       | Alibaba免费层模型白名单                                                              |
| `ci/toolchain.json`                      | CI工具链版本                                                                         |
| `quality/quality-baseline.json`          | 多指标棘轮基线（覆盖、警告、重复……）                                                 |
| `quality/*-baseline.json`                | 各个门的冻结基线（复杂性、重复、文件大小、类型检查切片、测试发现……）                 |
| `quality/*-allowlist.json`               | 限制许可名单（依赖项、许可证、 AI归因、遗忘兄弟测试等）                              |
| `quality/eslint-suppressions.json`       | `npm run lint`应用的冻结ESLint抑制                                                   |
| `quality/gate-manifest.json`             | `scripts/quality/gate-manifest.mjs`检查的登机口清单                                  |
| `quality/vitest-exclusions.json`         | `vitest.quarantine.config.ts`检疫库存                                                |
| `quality/skill-templates/`               | 由`scripts/quality/check-skill-contract.mjs`检查的规范SKILL.md模板                   |
| `quality/release-acceptance.schema.json` | 发布-接受证据模式—请参阅[QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md) |
| `release/`                               | 变更日志协调和 wreq-js 本机清单、许可证清单和通知                                    |

## `changelog.d/` —变更日志片段

PR添加一个片段，而不是编辑`CHANGELOG.md`： `features/`、 `fixes/`或`maintenance/`，名为`<PR-number>-<slug>.md`。在发布时`scripts/release/aggregate-changelog.mjs`将它们折叠到`CHANGELOG.md`中并删除它们； `npm run check:changelog-integrity`验证了它们。详情见`changelog.d/README.md`。

---

## `docs/` —公共文档

`source.config.ts`中列出的部分编译到`/docs`站点中（不包括一些仅限操作员的安全页面）； `docs/meta.json`设置侧边栏顺序。从[README.md](../README.md)开始。

| 小路               | 内容                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/` | 快速启动、自托管、提供者、免费套餐、自动组合和网络 cookie 指南                                                                               |
| `guides/`          | 操作员和开发人员指南：设置、 Docker、 Electron、 PWA、Termux、 CLIs、i18n、故障排除、用户指南                                                |
| `architecture/`    | 架构、代码库参考、修改配方、授权、弹性、质量门、设计系统、这张地图                                                                           |
| `reference/`       | API参考、环境变量、功能标志、 CLI工具、免费套餐、生成的提供程序参考、删除的提供程序                                                          |
| `frameworks/`      | MCP、 A2A、 ACP、技能、内存、插件、云代理、webhooks、evals、日志导出、雷达、Playground，...                                                  |
| `routing/`         | 自动连击、推理replay/routing、配额份额、认购阶梯、严格零成本……                                                                               |
| `security/`        | 护栏、错误清理、 CORS、 SSO、出口策略、路由保护层、供应链……                                                                                  |
| `compression/`     | 压缩指南、引擎、 RTK、规则格式、语言包、上下文编辑                                                                                           |
| `ops/`             | 发布流程、分支、合并训练、部署（VM、Fly.io、Kubernetes）、数据库、代理、工作树、硬规则详细信息                                               |
| `providers/`       | 每个提供者的指南（Claude Code、 ChatGPT Web、 Cursor、 GitHub Copilot等）                                                                    |
| `comparison/`      | OmniRoute与替代方案的比较                                                                                                                    |
| `integrations/`    | 集成说明（fal.ai 原生、 MarkItDown MCP）；没有编译进`/docs`                                                                                  |
| `openapi.yaml`     | OpenAPI来源；提供`src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml`和`bin/cli/api-commands/`                                     |
| `diagrams/`        | Mermaid sources (`.mmd`), rendered SVGs (`exported/`) and README SVGs from `scripts/docs/gen-readme-*`                                       |
| `assets/`          | 语言标记SVGs和其他README资产                                                                                                                 |
| `screenshots/`     | README和指南使用的屏幕截图                                                                                                                   |
| `i18n/`            | Translated mirrors: one folder per locale (66) with root docs and a `docs/` subset;由`npm run i18n:run`制作—参见[I18N.md](../guides/I18N.md) |
| 顶级`*.md`         | `README.md` （文档索引）、 `DEVELOPER-ENVIRONMENT.md`和一些独立注释                                                                          |

关键入口点： [ARCHITECTURE.md](ARCHITECTURE.md) 、 [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md) 、 [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md) 、 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 、 [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) （由`npm run gen:provider-reference`生成）。

---

## `tests/` —测试套件

大约 9,670 个跟踪文件。测试文件属于此处，而不是项目根目录。例外： Vitest配置收集的`src/`和`open-sse/`中的同位`__tests__/`文件夹。

| 小路                                                   | 内容                                                                                                                                                                 | 跑步者                                                                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | 单元测试（超过 9,000 个文件）：许多位于顶层，加上域文件夹（`ui/`、 `compression/`、 `build/`、 `guardrails/`、 `db/`、 `cli/`、 `api/`、 `dashboard/`、 `combo/`等） | 节点测试运行器（`npm run test:unit`）； `*.tsx`通过`test:vitest:ui`                     |
| `tests/unit/serial/`                                   | CPU 敏感测试以并发 1 运行                                                                                                                                            | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | 单元树内的Vitest套件                                                                                                                                                 | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | 多模块和DB集成测试； `combo-matrix/`, , , `combo-live/`, , , , , , , `services/`                                                                                     | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` +现场套房`ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                      | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts`针对正在运行的实例                                                                                                                                   | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | 认证套件（`api/`、 `ui/`及其自己的Playwright配置）                                                                                                                   | `npm run homolog` —参见[HOMOLOGATION.md](../ops/HOMOLOGATION.md)                        |
| `tests/load/`                                          | 加载和浸泡脚本 (k6)                                                                                                                                                  | 夜间弹性工作流程                                                                        |
| `tests/_setup/`                                        | `--import` / 设置文件（隔离数据目录、出口防护、 Vitest UI polyfills）                                                                                                | 由跑步者加载                                                                            |
| `tests/_helpers/`, `tests/helpers/`                    | 共享测试助手（黄金快照、管理会话……）                                                                                                                                 | 通过测试导入                                                                            |
| `tests/fixtures/`                                      | 夹具数据和子进程夹具                                                                                                                                                 | 通过测试导入                                                                            |
| `tests/snapshots/`                                     | `tests/helpers/goldenSnapshot.ts`的黄金文件                                                                                                                          | 通过测试导入                                                                            |
| `tests/manual/`                                        | 用于手动REST调用的`.http`文件                                                                                                                                        | 手动的                                                                                  |
| `tests/security/`                                      | 安全 shell 脚本                                                                                                                                                      | 手动/单元测试装置                                                                       |
| `tests/types/`                                         | 类型级合约装置                                                                                                                                                       | —                                                                                       |

完整矩阵： `CONTRIBUTING.md` → “运行测试”和[COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md) 。

---

## `deploy/` — Kubernetes

| 小路                                               | 目的                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Helm 图表（`Chart.yaml`、 `values.yaml`、部署模板、服务、入口、 PVC、秘密、configmap） |
| `deploy/kubernetes/base/`                          | Kustomize 基础（命名空间、部署、服务、 PVC、 configmap 、 `secret.example.yaml`）      |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | 特定于集群的覆盖（入口、存储类、资源、探测器）                                         |

请参阅[KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) 。

## `docker/` —辅助图像

| 小路                                | 目的                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | 无头浏览器图像，带有ChatGPT Web 执行器CDP代理—请参阅[CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin桥图像、撰写文件、模拟和网络防护                                                             |
| `docker/vnc-browser/`               | Chromium 与VNC用于交互式浏览器会话                                                                |

主图像是根`Dockerfile`；参见[DOCKER_GUIDE](../guides/DOCKER_GUIDE.md) 。

## `contrib/` —社区菜谱（未官方支持）

| 小路                    | 目的                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman 四元组（容器、卷、网络、 Redis）                                                                   |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                       |
| `contrib/windows/`      | 用于从Windows结帐运行的`.bat`启动器                                                                       |
| `contrib/session-sync/` | README用于第三方会话同步浏览器扩展—请参阅[SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| 小路                            | 目的                                                    |
| ------------------------------- | ------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | 最小命令插件—参见[PLUGINS.md](../frameworks/PLUGINS.md) |
| `examples/plugins/`             | 示例插件：langfuse、请求记录器、主题管理器、欢迎横幅    |
| `examples/quickstart/`          | 客户端片段：curl、 Node.js (axios)、 PHP、Python        |

---

## `.github/` — GitHub集成

| 小路                                                         | 目的                                                                                                                                                                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), 安全扫描 (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), 预定的`nightly-*.yml`套件, 发布 (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), 发布和维护工作流程 |
| `.github/actions/npm-ci-retry/`                              | 复合操作：带有缓存和重试的`npm ci`                                                                                                                                                                                                          |
| `.github/actions/prepare-unit-storage/`                      | 复合操作：释放运行程序磁盘空间，然后安装依赖项                                                                                                                                                                                              |
| `.github/ISSUE_TEMPLATE/`                                    | 错误、功能和测试覆盖率问题表                                                                                                                                                                                                                |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | 默认PR模板加上bugfix/feature变体                                                                                                                                                                                                            |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | 代码所有者、赞助链接、依赖项更新                                                                                                                                                                                                            |
| `.github/labels.yml`                                         | `npm run labels:sync`应用的标签定义                                                                                                                                                                                                         |
| `.github/copilot-instructions.md`                            | GitHub Copilot指令（代理指令表面）                                                                                                                                                                                                          |

CI工作地图： [QUALITY_GATES.md](QUALITY_GATES.md) 。

## `.husky/` — git 钩子

| 文件         | 目的                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `pre-commit` | Git 身份检查、lint-staged、门清单、文档同步、任意预算、类型规模棘轮、跟踪工件和 ui-kit 快照检查 |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs`关于提交消息                                            |
| `pre-push`   | 故意轻：退出 0 的PATH/npm健全性检查                                                             |

`.husky/_/`中的钩子运行时是在安装时生成的，不会被跟踪。

---

## 导航提示

- **新贡献者？** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md) 。
- **改变一些常见的东西**（提供者、路线、 DB模块、 MCP工具、 A2A技能）？关注[MODIFICATION_SCENARIOS](MODIFICATION_SCENARIOS.md) 。
- **添加提供者？**首先检查[REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) ，然后交叉检查[PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) 。
- **本地运行？** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **部署？** [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md) 、 [SELF_HOST_GUIDE](../getting-started/SELF_HOST_GUIDE.md) 、 [VM_DEPLOYMENT_GUIDE](../ops/VM_DEPLOYMENT_GUIDE.md) 、 [FLY_IO_DEPLOYMENT_GUIDE](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) 、 [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) 。
- **释放？** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **质量门失败了？** [QUALITY_GATES.md](QUALITY_GATES.md)和[QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md) 。
