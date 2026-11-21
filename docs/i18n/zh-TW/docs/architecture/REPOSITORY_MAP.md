# Repository Map (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md)

---

> **什麼存在於哪裡：每個追蹤的頂級目錄和根文件，具有一行目的。**最後更新：2026-11-13（OmniRoute v3.8.54）
>
> 使用此地圖來尋找程式碼庫，然後點擊專用文件的連結。文件計數是在上述日期使用`git ls-files`進行測量的。它們幾乎隨著每個版本的發布而變化，因此將它們視為數量級。

## 頂級樹

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

本地、生成或私有路徑（所有 gitignored，從未提交，不進一步描述）：

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

儲存庫根 (`git ls-files | grep -v /`) 中的所有追蹤文件，按功能分組。

### 專案文件

| 文件                     | 目的                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| `README.md`              | Landing page: feature overview, quick start, install methods             |
| `CHANGELOG.md`           | Per-release changelog (fragments from `changelog.d/` are folded in here) |
| `ROADMAP.md`             | 公共路線圖                                                               |
| `LICENSE`                | MIT許可證                                                                |
| `THIRD_PARTY_NOTICES.md` | Notices for bundled third-party code (for example the wreq-js bindings)  |
| `CONTRIBUTING.md`        | Contributor guide: setup, conventional commits, test matrix, PR flow     |
| `SECURITY.md`            | 漏洞通報政策                                                             |
| `CODE_OF_CONDUCT.md`     | 社區行為期望                                                             |
| `llm.txt`                | LLM爬蟲和助手的純文字項目總結                                            |

### AI輔助指令

| 文件        | 目的                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| `AGENTS.md` | Single source of truth for every AI assistant: conventions, quality gates, Hard Rules |
| `CLAUDE.md` | 克勞德代碼 - 特定的增量；進口`AGENTS.md`                                              |
| `GEMINI.md` | 雙子座特有的三角洲；指向`AGENTS.md`                                                   |

Nested guides also exist next to the code they describe: `open-sse/services/AGENTS.md` and `src/lib/db/AGENTS.md`.

### 包清單和節點工具鏈

| 文件                       | 目的                                                                      |
| -------------------------- | ------------------------------------------------------------------------- |
| `package.json`             | npm 清單：腳本、依賴項、 `engines`、 `workspaces`、已發佈的`files`        |
| `package-lock.json`        | 鎖定的依賴樹                                                              |
| `pnpm-workspace.yaml`      | pnpm workspace list (`packages/*`, `open-sse`) and native-build allowlist |
| `.npmrc` / `.npmignore`    | npm 配置和發布排除                                                        |
| `.node-version` / `.nvmrc` | 版本管理器的節點版本引腳                                                  |
| `flake.nix` / `flake.lock` | Nix dev shell 及其鎖                                                      |
| `Makefile`                 | 委託給 npm 腳本的`make`快捷方式                                           |

### TypeScript、 Next.js和文件構建

| 文件                                      | 目的                                                                |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `tsconfig.json`                           | 基本TypeScript配置與路徑別名（`@/*`、 `@omniroute/open-sse`）       |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core`切片                                        |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` （嚴格`noImplicitAny`）切片     |
| `tsconfig.typecheck-api.json`             | API 路由類型檢查切片 (`scripts/check/check-api-typecheck.mjs`)      |
| `tsconfig.typecheck-dashboard.json`       | 儀表板類型檢查切片 (`npm run check:dashboard-typecheck`)            |
| `tsconfig.build.json`                     | 生產型式檢查（`npm run typecheck:build`、 `check:build-typecheck`） |
| `tsconfig.mitm.json`                      | `scripts/build/buildMitm.mjs`使用的MITM建構配置                     |
| `next.config.mjs`                         | Next.js 16 設定（獨立輸出，建構設定檔別名）                         |
| `source.config.ts`                        | Fumadocs `defineDocs`配置：哪些`docs/`部分編譯成`/docs`             |
| `postcss.config.mjs`                      | PostCSS / Tailwind管道                                              |

### Lint 和格式化

| 文件                                      | 目的                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | 主要ESLint平面配置（`npm run lint`，與`config/quality/eslint-suppressions.json`） |
| `eslint.complexity-ratchets.config.mjs`   | 一次ESLint傳遞中的複雜性和認知複雜性棘輪所使用的獨立配置                          |
| `eslint.complexity.config.mjs`            | 僅具有核心`complexity` + `max-lines-per-function`獨立配置（由測試使用）           |
| `prettier.config.mjs` / `.prettierignore` | Prettier規則和排除                                                                |
| `.editorconfig`                           | 編輯器預設值（2 個空格縮排）                                                      |
| `.markdownlint.json`                      | 諮詢 Markdown lint (`npm run lint:md`)                                            |
| `.vale.ini`                               | 諮商散文 lint (`npm run lint:prose`)， `.vale/`中的詞彙                           |

### 測試、評估和覆蓋範圍

| 文件                          | 目的                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest套件： `npm run test:vitest:ui` （儀表板`.tsx`、hooks、 memory/skills測試）      |
| `vitest.mcp.config.ts`        | 節點Vitest套件： `npm run test:vitest` （MCP伺服器， autoCombo，組合， API `.spec.ts`）      |
| `vitest.quarantine.config.ts` | 運行`config/quality/vitest-exclusions.json`中列出的隔離文件                                  |
| `vitest.e2e-live.config.ts`   | 實時伺服器Vitest套件（`tests/e2e/ecosystem.test.ts`、 `tests/e2e/protocol-clients.test.ts`） |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                |
| `stryker.conf.mjs`            | Stryker 突變測試（`npm run test:mutation`；根據`mutate`計算`tap.testFiles` ）                |
| `stryker.disablebail.mjs`     | 不含卡環的 Stryker 型號，用於測試冗餘測量                                                    |
| `promptfooconfig.yaml`        | Promptfoo LLM-安全套件                                                                       |
| `codecov.yml`                 | Codecov 補丁覆蓋設置                                                                         |

### Docker和部署

| 文件                              | 目的                                                                   |
| --------------------------------- | ---------------------------------------------------------------------- |
| `Dockerfile`                      | 多階段影像 (`builder` → `runner-base` → `runner-web` / `runner-cli*`)  |
| `Dockerfile.bun`                  | Bun運行時上的替代映像（由`docker-publish.yml`建構）                    |
| `docker-compose.yml`              | 預設使用設定檔（base、web、cli、host、記憶體、cliproxyapi 等）進行組合 |
| `docker-compose.prod.yml`         | 在連接埠 20130 上的單獨生產快照實例                                    |
| `docker-compose.selfhost.yml`     | 一指令環回自主機（與`.env.selfhost.example`配對）                      |
| `docker-compose.ollama-local.yml` | Docker OmniRoute與主機本地Ollama對話                                   |
| `.dockerignore`                   | Docker建構上下文排除                                                   |
| `fly.toml`                        | Fly.io 應用程式設定（連接埠 20128， `/data`磁碟區）                    |

### 安全、供應鏈和儲存庫機器人

| 文件                                         | 目的                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks 秘密掃描規則和白名單                                        |
| `.trivyignore`                               | 容器鏡像掃描可接受的風險抑制                                         |
| `.zizmor.yml`                                | zizmor GitHub操作安全審核配置                                        |
| `socket.yml`                                 | Socket.dev 應用程式配置（路徑忽略；不是CI門）                        |
| `sonar-project.properties`                   | SonarQube/SonarCloud專案配置                                         |
| `knip.json`                                  | Knip 未使用的files/exports/deps配置（提供`npm run check:dead-code`） |
| `.size-limit.json`                           | 捆綁預算                                                             |
| `.mergify.yml`                               | Mergify 合併佇列配置                                                 |
| `.coderabbit.yaml`                           | CodeRabbit審核配置                                                   |
| `.cbmignore`                                 | 忽略 codebase-memory-mcp 代碼索引列表                                |
| `.gitignore` / `.gitattributes` / `.mailmap` | 忽略規則、腳本的LF行結尾、規範作者身份                               |

### 環境範本、狀態和來源

| 文件                        | 目的                                              |
| --------------------------- | ------------------------------------------------- |
| `.env.example`              | 首次安裝時將模板複製到`.env` ；環境變數的參考列表 |
| `.env.selfhost.example`     | `docker-compose.selfhost.yml`模板                 |
| `.env.homolog.example`      | 認證跑者的範本 (`npm run homolog`)                |
| `.env.devin-bridge.example` | Devin橋設定的範例 env 檔案                        |
| `.i18n-state.json`          | 增量翻譯狀態（每個文件和區域設定的來源哈希）      |
| `news.json`                 | 由儀表板讀取的本地化公告提要（架構 v2）           |

---

## `src/` — Next.js應用

大約 4,550 個追蹤文件。路徑別名`@/*` → `src/*`。

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

### `src/app/` —應用路由器

| 小路                                                                | 目的                                                                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | 公共 OpenAI 相容API：聊天、完成、回應、訊息、嵌入、圖像、音訊、視訊、音樂、重新排名、審核、搜尋、檔案、批次、ws、模型…           |
| `app/api/v1beta/`                                                   | 雙子座風格的端點                                                                                                                 |
| `app/api/` （其他資料夾）                                           | 管理和管理路線：提供程序、組合、設定、金鑰、使用情況、日誌、mcp、a2a、acp、記憶體、技能、評估、webhooks、隧道、插件、雷達、工具… |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API —參見[AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                         |
| `app/api/tools/traffic-inspector/`                                  | 交通督察REST API —參見[TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                 |
| `app/(dashboard)/dashboard/`                                        | 每個儀表板部分一個資料夾（提供程序、組合、日誌、使用情況、成本、快取、壓縮、記憶體、遊樂場、搜尋工具、設定、工具等）             |
| `app/(dashboard)/home/`                                             | 主螢幕及其小工具                                                                                                                 |
| `app/docs/`                                                         | 文件檢視器呈現`source.config.ts`中列出的 Fumadocs 部分                                                                           |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | 根佈局、根條目（重定向）、 PWA清單、全域CSS                                                                                      |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | 錯誤邊界和回退                                                                                                                   |

API路線遵循`Route → CORS → Zod validation → optional auth → policy → handler`；請參閱[ARCHITECTURE.md](ARCHITECTURE.md)和[API_REFERENCE.md](../reference/API_REFERENCE.md) 。

### `src/lib/` —伺服器庫

大約 90 個子資料夾加上大約 90 個頂級模組。主要群體：

| 區域               | 資料夾/文件                                                                                                         | 深潛                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 資料庫             | `db/` —域模組、 `migrations/`、 `adapters/`、 `repositories/`、 `migrationRunner/`                                  | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE](../ops/DATABASE_GUIDE.md)                                            |
| 使用量、配額和支出 | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE](../routing/QUOTA_SHARE.md), [COST_TRACKING](../guides/COST_TRACKING.md)                                                       |
| 提供者和模型       | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                    |
| OAuth和憑證        | `oauth/` （提供者/、服務/、utils/）、 `zed-oauth/`、 `copilot/`、 `cursor/`、 `credentialHealth/`                   | `resolvePublicCred()` （運營商文件，未公開提供）                                                                                            |
| 安全與治理         | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                      |
| 代理特點           | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| 插件和服務         | `plugins/`、 `services/` （嵌入式服務安裝人員與主管）                                                               | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                          |
| 路由和彈性         | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                     |
| 代理商和網路       | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, 隧道模組                                       | [PROXY_GUIDE](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE](../ops/TUNNELS_GUIDE.md)                                                              |
| 工作和日程安排     | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                             |
| 可觀察性和導出     | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                      |
| CLI和IDE集成       | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                 |
| 上下文來源         | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| 其他特點           | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

值得了解的頂級模組：

| 文件                                                           | 目的                                          |
| -------------------------------------------------------------- | --------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | 回應快取和冪等性                              |
| `webhookDispatcher.ts`                                         | HMAC 簽署的 Webhook 交付                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | 隧道管理者                                    |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | 後台憑證健康檢查和刷新電路                    |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | 串流媒體回應消毒劑                            |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | 流程生命週期                                  |
| `*.stub.ts`                                                    | 建置設定檔存根由`next.config.mjs`中的別名交換 |

### `src/lib/db/` —資料庫

| 小路                  | 目的                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()`單例（WAL日誌）                                                          |
| `db/migrations/`      | 編號、冪等`.sql`遷移（撰寫本文時有 236 個檔案； `check-migration-numbering.mjs`保護編號） |
| `db/migrationRunner/` | 遷移運行者                                                                                |
| `db/adapters/`        | SQLite驅動器（better-sqlite3、node:sqlite、bun:sqlite、 sql.js）                          |
| `db/repositories/`    | SQLite儲存庫實作（組合、遊樂場預設、路由配置）                                            |
| `db/<domain>.ts`      | 大約 175 個域模組（提供者、組合、 apiKeys、設定、用法等） —總是直接導入這些模組           |

### `src/domain/`, `src/server/`, `src/shared/`

| 小路                                                           | 目的                                                                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | 策略引擎                                                                                                                                 |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | 後備決策、鎖定政策、成本規則                                                                                                             |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | 配額快取和快照持久化                                                                                                                     |
| `domain/assessment/`                                           | 模型評估（評估器、分類器、自我修復器）                                                                                                   |
| `server/authz/`                                                | 授權管道和路由保護 (`routeGuard.ts`) —請參閱[AUTHZ_GUIDE.md](AUTHZ_GUIDE.md) 、 [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS原點解析和CORS —參見[CORS.md](../security/CORS.md)                                                                          |
| `server/ws/`                                                   | 即時儀表板WebSocket伺服器                                                                                                                |
| `shared/components/`                                           | `packages/ui-kit` —上的儀表板組件和轉接器請參閱[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                      |
| `shared/constants/`                                            | 提供者目錄 (`providers.ts`)、路由策略、 CLI工具、圖示圖、上游標頭拒絕清單等                                                              |
| `shared/validation/`                                           | Zod模式和驗證助手                                                                                                                        |
| `shared/utils/`                                                | 斷路器、API 金鑰身份驗證、取得逾時、功能標誌…                                                                                            |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | 聊天准入中間件、網路助理、客戶端服務、 React掛鉤                                                                                         |

---

## `open-sse/` —串流引擎工作區

npm 工作區`@omniroute/open-sse` （約 2,390 個追蹤文件）。它負責請求處理和提供者執行。概述： [OPEN_SSE_ARCHITECTURE](../frameworks/OPEN_SSE_ARCHITECTURE.md) 。

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
| `combo.ts` + `combo/`                                                                          | 組合路由策略—參見[AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                       |
| `autoCombo/`                                                                                   | 自動組合評分和模式包                                                                                                                             |
| `accountFallback.ts` + `accountFallback/`                                                      | 連接冷卻和模型鎖定—參見[RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | 速率限制追蹤和標頭解析                                                                                                                           |
| `compression/`                                                                                 | 壓縮引擎 (`engines/`)、規則包 (`rules/`)、 `eval/`、 `harness/`、 `riskGate/` —請參閱[COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | 令牌刷新、使用情況統計、快取、存取通道、會話池、 Codex帳戶、路由助手                                                                             |
| `__tests__/`                                                                                   | 共置Vitest套件（由Vitest配置收集）                                                                                                               |
| `AGENTS.md`                                                                                    | 此資料夾的代理指南                                                                                                                               |

模式：資料夾`X/`旁邊的大模組`X.ts`表示該模組被拆分為較小的檔案（`handlers/chatCore.ts` + `handlers/chatCore/`、 `services/combo.ts` + `services/combo/`）。

### `open-sse/mcp-server/`

| 小路                  | 目的                                                                   |
| --------------------- | ---------------------------------------------------------------------- |
| `server.ts`           | MCP伺服器生命週期                                                      |
| `httpTransport.ts`    | 可串流HTTP和SSE                                                        |
| `scopeEnforcement.ts` | 每個工具範圍檢查                                                       |
| `audit.ts`            | 工具呼叫審核日誌記錄                                                   |
| `schemas/`            | 工具定義和範圍                                                         |
| `tools/`              | 工具實作（記憶體、技能、壓縮…）                                        |
| `toolSearch/`         | 工具搜尋                                                               |
| `README.md`           | 內部架構筆記；完整目錄在[MCP-SERVER.md](../frameworks/MCP-SERVER.md)中 |

---

## `packages/` — npm 工作區

| 小路                     | 目的                                                                                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`：Keak CI UI套件的供應快照，用作來源。 `UPSTREAM.md`固定上游提交， `PATCHES.md`列出本地補丁。 `src/`僅由`scripts/dev/sync-ui-kit.sh`同步並由`npm run check:ui-kit-snapshot`保護。參見[DESIGN_SYSTEM](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`：瀏覽器池介面與實作（`packages/browser-pool/src/index.ts`， `packages/browser-pool/src/interfaces.ts`）。列於`workspaces`；網關使用的執行時間瀏覽器池位於`open-sse/services/`中                                 |

## `@omniroute/` —單獨發布包

這些不是 npm 工作區。每個都有自己的`package.json`和鎖定檔案；該資料夾以`omniroute` tarball (`files: ["@omniroute/"]`) 形式提供。

| 小路                             | 目的                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | OpenCode插件（模型發現、 `/connect` auth）； `omniroute setup-opencode`使用—參見[OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | v2 Promise 的OpenCode插件API —參見[OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                               |
| `@omniroute/opencode-provider/`  | 靜態配置產生器；在自己的`package.json`中標記為棄用，轉而使用`opencode-plugin`                                            |

---

## `bin/` — CLI和 ops 腳本

| 小路                                                                        | 目的                                                                            |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | 主要CLI條目（`omniroute serve`、 `setup`、 `doctor`、 `providers`、 `combo`等） |
| `reset-password.mjs`                                                        | `omniroute-reset-password`進位文件                                              |
| `mcp-server.mjs`                                                            | MCP stdio 入口點                                                                |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | 輔助橋/ MCP入口點                                                               |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM解析鉤子，對應全域安裝的 tsconfig 路徑別名                                   |
| `nodeRuntimeSupport.mjs`                                                    | 支援Node.js版本檢查                                                             |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | 自託管事件復原腳本（共享`_ops-common.sh`）                                      |
| `cold-start-bench.sh`                                                       | 冷啟動基準—請參考[PERF_BASELINE.md](../ops/PERF_BASELINE.md)                    |
| `cli/commands/`                                                             | 每個CLI指令一個模組（約 100 個，包括`setup-*`整合）                             |
| `cli/api-commands/`                                                         | 由`npm run build:cli-api` —從`docs/openapi.yaml`生成，請勿編輯                  |
| `cli/locales/`                                                              | CLI訊息目錄（67 語言環境）                                                      |
| `cli/tui/`, `cli/tui-components/`                                           | 終端UI                                                                          |
| `cli/tray/`                                                                 | 系統托盤和自動啟動（Windows PowerShell後端， macOS/Linux上的系統托盤）          |
| `cli/runtime/`                                                              | 本機運行時解析（`sqliteRuntime.mjs`、 `magicBytes.mjs`）、進程管理器            |
| `cli/*.mjs`                                                                 | 共享助理（參數、 API客戶端、資料目錄、加密、提供者儲存、設定儲存等）            |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI內部結構與約定                                                               |

請參閱[CLI-TOOLS.md](../reference/CLI-TOOLS.md)和[CLI-COMPANION.md](../guides/CLI-COMPANION.md) 。

## `electron/` —桌面應用程式

| 小路                                                       | 目的                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `main.js`                                                  | Electron主流程（視窗、嵌入式伺服器、托盤、更新）             |
| `preload.js`                                               | IPC橋暴露給渲染器                                            |
| `lib/`                                                     | 視窗生命週期、伺服器準備、運行狀況監視程式、遠端伺服器首選項 |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | 遠端伺服器提示視窗                                           |
| `processTree.js`, `sqlite-inspection.js`                   | 子進程清理和SQLite檢查助手                                   |
| `package.json` / `package-lock.json`                       | Electron-builder 配置和Electron依賴項                        |
| `assets/`                                                  | 應用程式和托盤圖示（`.ico`、 `.icns`、 `.png`）              |
| `README.md`                                                | 內註—參見[ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)    |

## `public/` —靜態資產

| 小路                                        | 目的                                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `providers/`                                | 由 id (`/providers/<id>.svg`) 載入的提供者徽標；出處`config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | 瀏覽器和PWA圖標                                                                                       |
| `sw.js`                                     | 服務工作者—參見[PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                 |
| `openapi.yaml`                              | `npm run gen:public-openapi`產生的`docs/openapi.yaml`的副本                                           |
| `images/`, `sponsors/`, `deyin.svg`         | 層級流程圖、贊助商橫幅、 README圖稿                                                                   |

## `skills/` —代理技能

46個技能，一個資料夾每個有一個`SKILL.md` （`cli-*`， `omni-*`， `config-codex-cli`， `ponytail`），加上`skills/README.md`。 `src/lib/agentSkills/catalog.ts`在運行時讀取它們並透過`/api/agent-skills`、 MCP和A2A公開它們。大多數清單是由`src/lib/agentSkills/generator.ts`產生的（`scripts/skills/generate-agent-skills.mjs`； `npm run check:agent-skills-sync`檢查漂移）。參見[AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md) 。

---

## `scripts/` —建造、大門與工具

大約 435 個追蹤文件。新腳本進入`AGENTS.md`允許的子資料夾之一；一次性程式碼放入`scripts/ad-hoc/`。

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

常用的入口點：

| 腳本                                                                | 目的                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start`跑者                                                      |
| `build/build-next-isolated.mjs`                                     | `npm run build` （Next.js獨立建構）                                                  |
| `build/prepublish.ts`                                               | `npm run build:cli`：組裝 npm `dist/`                                                |
| `build/postinstall.mjs`                                             | npm `postinstall`鉤子                                                                |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` （重新產生PROVIDER_REFERENCE.md）                   |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` （生成`src/app/docs/lib/openapi.generated.ts`）                      |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` （文件鏡像）                                                      |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                            |
| `release/aggregate-changelog.mjs`                                   | 將`changelog.d/`片段折疊成`CHANGELOG.md`                                             |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` （文件準確度門）                                     |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` （阻止追蹤的根`_*`路徑）                           |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` （針對`config/quality/`公制棘輪）                          |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                               |
| `dev/new-worktree.sh`                                               | 建立一個獨立的開發工作樹—請參閱[WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | 將`packages/ui-kit/src`同步到固定的上游提交                                          |

門庫存和政策： [QUALITY_GATES.md](QUALITY_GATES.md) 。

## `config/` —版本化配置與門狀態

| 小路                                     | 目的                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | 支援的區域設定（區域設定計數的來源）及其架構                                         |
| `payloadRules.json`                      | 上游負載規則 (`open-sse/services/payloadRules.ts`)                                   |
| `cli-tools-manifest.json`                | 可整合CLI工具清單 (`bin/cli/cli-manifest.mjs`)                                       |
| `alibaba-free-tier-allowlist.json`       | Alibaba免費層模型白名單                                                              |
| `ci/toolchain.json`                      | CI工具鏈版本                                                                         |
| `quality/quality-baseline.json`          | 多指標棘輪基線（覆蓋、警告、重複…）                                                  |
| `quality/*-baseline.json`                | 各個門的凍結基線（複雜性、重複、檔案大小、類型檢查切片、測試發現…）                  |
| `quality/*-allowlist.json`               | 限制許可名單（依賴項、許可證、 AI歸因、遺忘兄弟測試等）                              |
| `quality/eslint-suppressions.json`       | `npm run lint`應用的凍結ESLint抑制                                                   |
| `quality/gate-manifest.json`             | `scripts/quality/gate-manifest.mjs`檢查的登機口清單                                  |
| `quality/vitest-exclusions.json`         | `vitest.quarantine.config.ts`檢疫庫存                                                |
| `quality/skill-templates/`               | 由`scripts/quality/check-skill-contract.mjs`檢查的規格SKILL.md模板                   |
| `quality/release-acceptance.schema.json` | 發布-接受證據模式—請參閱[QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md) |
| `release/`                               | 變更日誌協調和 wreq-js 本機清單、許可證清單和通知                                    |

## `changelog.d/` —變更日誌片段

PR加入一個片段，而不是編輯`CHANGELOG.md`： `features/`、 `fixes/`或`maintenance/`，名為`<PR-number>-<slug>.md`。在發佈時`scripts/release/aggregate-changelog.mjs`將它們折疊到`CHANGELOG.md`中並刪除它們； `npm run check:changelog-integrity`驗證了它們。詳情請見`changelog.d/README.md`。

---

## `docs/` —公共文件

`source.config.ts`中列出的部分編譯到`/docs`站點（不包括一些僅限操作員的安全頁面）； `docs/meta.json`設定側邊欄順序。從[README.md](../README.md)開始。

| 小路               | 內容                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `getting-started/` | 快速啟動、自架、提供者、免費套餐、自動組合和網頁 cookie 指南                                                                   |
| `guides/`          | 操作員和開發人員指南：設定、 Docker、 Electron、 PWA、Termux、 CLIs、i18n、故障排除、使用者指南                                |
| `architecture/`    | 架構、程式碼庫參考、修改配方、授權、彈性、品質閘、設計系統、這張地圖                                                           |
| `reference/`       | API參考、環境變數、功能標誌、 CLI工具、免費套餐、產生的提供者參考、刪除的提供程序                                              |
| `frameworks/`      | MCP、 A2A、 ACP、技能、記憶體、插件、雲端代理、webhooks、evals、日誌匯出、雷達、Playground，...                                |
| `routing/`         | 自動連擊、推理replay/routing、配額份額、認購階梯、嚴格零成本…                                                                  |
| `security/`        | 護欄、錯誤清理、 CORS、 SSO、出口策略、路由保護層、供應鏈…                                                                     |
| `compression/`     | 壓縮指南、引擎、 RTK、規則格式、語言包、上下文編輯                                                                             |
| `ops/`             | 發布流程、分支、合併訓練、部署（VM、Fly.io、Kubernetes）、資料庫、代理、工作樹、硬規則詳細信息                                 |
| `providers/`       | 每個提供者的指南（Claude Code、 ChatGPT Web、 Cursor、 GitHub Copilot等）                                                      |
| `comparison/`      | OmniRoute與替代方案的比較                                                                                                      |
| `integrations/`    | 整合說明（fal.ai 原生、 MarkItDown MCP）；沒有編譯進`/docs`                                                                    |
| `openapi.yaml`     | OpenAPI來源；提供`src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml`和`bin/cli/api-commands/`                       |
| `diagrams/`        | 美人魚來源 (`.mmd`)、渲染的SVGs (`exported/`) 和README SVGs來自`scripts/docs/gen-readme-*`                                     |
| `assets/`          | 語言標記SVGs和其他README資產                                                                                                   |
| `screenshots/`     | README和指南使用的螢幕截圖                                                                                                     |
| `i18n/`            | 翻譯後的鏡像：每個語言環境 (66) 一個資料夾，包含根文件和`docs/`子集；由`npm run i18n:run`製作—參見[I18N.md](../guides/I18N.md) |
| 頂級`*.md`         | `README.md` （文件索引）、 `DEVELOPER-ENVIRONMENT.md`和一些獨立註釋                                                            |

關鍵入口點： [ARCHITECTURE.md](ARCHITECTURE.md) 、 [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md) 、 [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md) 、 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 、 [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) （由`npm run gen:provider-reference`產生）。

---

## `tests/` —測試套件

大約 9,670 個追蹤文件。測試檔案屬於此處，而不是專案根目錄。例外： Vitest配置收集的`src/`和`open-sse/`中的同位`__tests__/`資料夾。

| 小路                                                   | 內容                                                                                                                                                                         | 跑者                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Unit tests (over 9,000 files): many at the top level, plus domain folders (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | 節點測試運行器（`npm run test:unit`）； `*.tsx`透過`test:vitest:ui`                     |
| `tests/unit/serial/`                                   | CPU 敏感測試以併發 1 運行                                                                                                                                                    | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | 單元樹內的Vitest套件                                                                                                                                                         | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | 多模組和DB整合測試； `combo-matrix/`, , , `combo-live/`, , , , , , , `services/`                                                                                             | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` +現場套房`ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                              | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts`針對正在運行的實例                                                                                                                                           | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | 認證套件（`api/`、 `ui/`及其自己的Playwright配置）                                                                                                                           | `npm run homolog` —參見[HOMOLOGATION.md](../ops/HOMOLOGATION.md)                        |
| `tests/load/`                                          | 載入和浸泡腳本 (k6)                                                                                                                                                          | 夜間彈性工作流程                                                                        |
| `tests/_setup/`                                        | `--import` / 設定檔（隔離資料目錄、出口防護、 Vitest UI polyfills）                                                                                                          | 由跑步者加載                                                                            |
| `tests/_helpers/`, `tests/helpers/`                    | 共享測試助理（黃金快照、管理會話…）                                                                                                                                          | 透過測試導入                                                                            |
| `tests/fixtures/`                                      | 夾具資料和子進程夾具                                                                                                                                                         | 透過測試導入                                                                            |
| `tests/snapshots/`                                     | `tests/helpers/goldenSnapshot.ts`的黃金文件                                                                                                                                  | 透過測試導入                                                                            |
| `tests/manual/`                                        | 用於手動REST呼叫的`.http`文件                                                                                                                                                | 手動的                                                                                  |
| `tests/security/`                                      | 安全性 shell 腳本                                                                                                                                                            | 手動/單元測試裝置                                                                       |
| `tests/types/`                                         | 型式合約裝置                                                                                                                                                                 | —                                                                                       |

完整矩陣： `CONTRIBUTING.md` → “運行測試”和[COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md) 。

---

## `deploy/` — Kubernetes

| 小路                                               | 目的                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Helm 圖表（`Chart.yaml`、 `values.yaml`、部署範本、服務、入口、 PVC、機密、configmap） |
| `deploy/kubernetes/base/`                          | Kustomize 基礎（命名空間、部署、服務、 PVC、 configmap 、 `secret.example.yaml`）      |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | 特定於叢集的覆蓋（入口、儲存類別、資源、探測器）                                       |

請參閱[KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) 。

## `docker/` —輔助影像

| 小路                                | 目的                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | 無頭瀏覽器圖像，帶有ChatGPT Web 執行器CDP代理—請參閱[CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin橋影像、撰寫檔案、模擬與網路防護                                                             |
| `docker/vnc-browser/`               | Chromium 與VNC用於互動式瀏覽器會話                                                                |

主圖像是根`Dockerfile`；參見[DOCKER_GUIDE](../guides/DOCKER_GUIDE.md) 。

## `contrib/` —社群食譜（未官方支援）

| 小路                    | 目的                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman 四元組（容器、磁碟區、網路、 Redis）                                                                   |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                           |
| `contrib/windows/`      | 用於從Windows結帳運行的`.bat`啟動器                                                                           |
| `contrib/session-sync/` | README用於第三方會話同步瀏覽器擴充功能—請參閱[SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| 小路                            | 目的                                                    |
| ------------------------------- | ------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | 最小指令插件—參見[PLUGINS.md](../frameworks/PLUGINS.md) |
| `examples/plugins/`             | 範例外掛：langfuse、請求記錄器、主題管理器、歡迎橫幅    |
| `examples/quickstart/`          | 客戶端片段：curl、 Node.js (axios)、 PHP、Python        |

---

## `.github/` — GitHub集成

| 小路                                                         | 目的                                                                                                                                                                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), 安全掃描 (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), 預定的`nightly-*.yml`套件, 發布 (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), 發布和維護工作流程 |
| `.github/actions/npm-ci-retry/`                              | 複合操作：帶有快取和重試的`npm ci`                                                                                                                                                                                                          |
| `.github/actions/prepare-unit-storage/`                      | 複合操作：釋放運行程式磁碟空間，然後安裝依賴項                                                                                                                                                                                              |
| `.github/ISSUE_TEMPLATE/`                                    | 錯誤、功能和測試覆蓋率問題表                                                                                                                                                                                                                |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | 預設PR模板加上bugfix/feature變體                                                                                                                                                                                                            |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | 程式碼擁有者、贊助連結、相依性更新                                                                                                                                                                                                          |
| `.github/labels.yml`                                         | `npm run labels:sync`應用程式的標籤定義                                                                                                                                                                                                     |
| `.github/copilot-instructions.md`                            | GitHub Copilot指令（代理指令表面）                                                                                                                                                                                                          |

CI工作圖： [QUALITY_GATES.md](QUALITY_GATES.md) 。

## `.husky/` — git 鉤子

| 文件         | 目的                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `pre-commit` | Git 身分檢查、lint-staged、門清單、文件同步、任意預算、類型規模棘輪、追蹤工件和 ui-kit 快照檢查 |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs`關於提交訊息                                            |
| `pre-push`   | 故意輕：退出 0 的PATH/npm健全性檢查                                                             |

`.husky/_/`中的鉤子運行時是在安裝時產生的，不會被追蹤。

---

## 導航提示

- **新貢獻者？** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md) 。
- **改變一些常見的東西**（提供者、路線、 DB模組、 MCP工具、 A2A技能）？關注[MODIFICATION_SCENARIOS](MODIFICATION_SCENARIOS.md) 。
- **新增提供者？**首先檢查[REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) ，然後交叉檢查[PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) 。
- **本地運行？** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **部署？** [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md) 、 [SELF_HOST_GUIDE](../getting-started/SELF_HOST_GUIDE.md) 、 [VM_DEPLOYMENT_GUIDE](../ops/VM_DEPLOYMENT_GUIDE.md) 、 [FLY_IO_DEPLOYMENT_GUIDE](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) 、 [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) 。
- **釋放？** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **質量門失敗了？** [QUALITY_GATES.md](QUALITY_GATES.md)和[QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md) 。
