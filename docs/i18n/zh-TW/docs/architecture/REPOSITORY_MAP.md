# Repository Map (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md)

---

> **每個目錄與根目錄檔案的一行說明。**
> 最後更新：2026-06-28 — OmniRoute v3.8.40
>
> 使用此地圖快速瀏覽程式碼庫。如需深入瞭解，請前往各專門文件的連結。

## 頂層目錄樹

```
OmniRoute/
├── src/                  # Next.js 16 應用程式（UI + API 路由 + 函式庫 + 領域層 + 伺服器）
├── open-sse/             # 串流引擎工作區（處理常式、執行器、轉譯器、MCP 伺服器）
├── packages/            # npm 工作區：ui-kit（內建的 Keak CI UI Kit）與 browser-pool
├── electron/             # 桌面封裝程式（Electron 41 + electron-builder 26.10）
├── bin/                  # CLI 進入點與命令處理常式
├── scripts/              # 建置、檢查、同步與一次性指令碼
├── docs/                 # 公開文件（您目前位於此處）
├── tests/                # 所有測試套件（單元、整合、e2e、協定用戶端）
├── public/               # Next.js 靜態資源、PWA manifest、service worker、圖示
├── config/               # 靜態設定 + 品質閘門狀態（i18n、payloadRules、quality/）
├── images/               # 行銷／README 圖片資源
├── @omniroute/           # 可發布的配套套件（opencode-plugin、opencode-provider）
├── skills/               # CLI／代理程式技能套件（cli-* + omni-* + config-codex-cli）
├── examples/             # 範例外掛程式 + omniroute-cmd-hello 起始範本
├── contrib/              # 社群貢獻內容（podman/）
├── .source/              # Fumadocs 來源設定（source.config.mjs + server/browser/dynamic）
├── .github/              # GitHub Actions 工作流程 + 議題範本 + PR 範本
├── .husky/               # Git 掛鉤（pre-commit、pre-push）
├── .claude/              # Claude Code 斜線命令（專案範圍）
├── .agents/              # Codex／通用代理程式工作流程 + 技能（.claude/ 的鏡像）
├── .vscode/              # VS Code 工作區設定
├── _ideia/               # 規劃筆記（非正式；不隨產品發布）
├── _mono_repo/           # 歷史子專案（cloud、site、vscode-extension）
├── _references/          # 來自相關 OSS 專案的唯讀參考複本
├── _tasks/               # 各版本的工作追蹤檔案（非正式）
├── .build/ .worktrees/ dist/   # 本機建置／git-worktree／建置輸出的暫存空間（gitignored）
├── .issues/              # 本機議題快取（gitignored）
├── .playwright-mcp/      # Playwright MCP 測試產出物
├── coverage/             # c8 覆蓋率輸出（gitignored）
├── logs/                 # 執行階段日誌（gitignored）
├── node_modules/         # 相依套件（gitignored）
├── package/              # npm pack 暫存區（建置產出物）
├── .next/                # Next.js 建置輸出（gitignored）
└──（根目錄檔案 — 請見下方）
```

---

## 根目錄檔案

| 檔案                                        | 用途                                                                             |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| **README.md**                               | 行銷登陸頁面 + 快速入門 + 功能矩陣（另請參閱 `llm.txt`）                         |
| **CHANGELOG.md**                            | 各版本的變更日誌（由 `/version-bump-cc` 技能自動產生）                           |
| **LICENSE**                                 | MIT 授權條款文字                                                                 |
| **CLAUDE.md**                               | Claude Code 代理程式的專案規則（強制規則、慣例、情境）                           |
| **AGENTS.md**                               | 與 CLAUDE.md 相同，但適用於非 Claude AI 代理程式（Codex、Cursor 等）             |
| **GEMINI.md**                               | 適用於 Gemini 型代理程式的精簡規則（CLAUDE.md 的子集）                           |
| **CONTRIBUTING.md**                         | 貢獻者指南：設定、慣例式提交、測試、PR 流程                                      |
| **SECURITY.md**                             | 漏洞回報政策、支援的版本、威脅模型                                               |
| **CODE_OF_CONDUCT.md**                      | 貢獻者公約——社群行為準則                                                         |
| **llm.txt**                                 | 針對 LLM 爬蟲最佳化的純文字登陸頁面（面向 AI 助理的 SEO）                        |
| **package.json**                            | npm 資訊清單、指令碼、相依套件、引擎、c8 覆蓋率門檻                              |
| **package-lock.json**                       | 鎖定的相依套件樹                                                                 |
| **tsconfig.json**                           | 根層級 TypeScript 設定                                                           |
| **tsconfig.typecheck-core.json**            | `src/` 核心的類型檢查設定                                                        |
| **tsconfig.typecheck-noimplicit-core.json** | 嚴格的（`noImplicitAny`）類型檢查                                                |
| **tsconfig.tsbuildinfo**                    | TS 增量建置快取（已由 git 忽略）                                                 |
| **next.config.mjs**                         | Next.js 16 建置設定（獨立輸出）                                                  |
| **next-env.d.ts**                           | Next.js 自動產生的環境類型                                                       |
| **eslint.config.mjs**                       | ESLint 扁平設定（依專案區域套用規則）                                            |
| **prettier.config.mjs**                     | Prettier 格式化規則                                                              |
| **postcss.config.mjs**                      | Tailwind/CSS 管線的 PostCSS 設定                                                 |
| **playwright.config.ts**                    | Playwright E2E 測試設定                                                          |
| **vitest.config.ts**                        | Vitest 設定（預設測試套件）                                                      |
| **vitest.mcp.config.ts**                    | MCP 伺服器／autoCombo／快取測試套件的 Vitest 設定                                |
| **sonar-project.properties**                | SonarQube/SonarCloud 設定（程式碼品質）                                          |
| **Dockerfile**                              | 多階段 Docker 建置（builder → runner-base → runner-cli）                         |
| **docker-compose.yml**                      | 開發用 compose，包含 4 個 profile（base、cli、host、cliproxyapi）+ redis sidecar |
| **docker-compose.prod.yml**                 | 正式環境 compose（連接埠 20130、redis、具名磁碟區）                              |
| **.dockerignore**                           | 從 Docker context 排除的檔案                                                     |
| **fly.toml**                                | Fly.io 部署設定（區域 `sin`、連接埠 20128、/data 磁碟區）                        |
| **.env.example**                            | 環境檔範本（首次安裝時自動複製為 `.env`）                                        |
| **.gitignore**                              | Git 忽略模式                                                                     |
| **.npmignore**                              | npm 發佈排除清單                                                                 |
| **.npmrc**                                  | npm 設定（registry、lockfile 政策）                                              |
| **.node-version**                           | Node 版本釘選（供 nvm 相容工具使用）                                             |
| **.nvmrc**                                  | nvm 的 Node 版本釘選                                                             |
| **eslint.complexity.config.mjs**            | 複雜度棘輪的 ESLint 設定（`scripts/check/check-complexity.mjs --config`）        |
| **eslint.sonarjs.config.mjs**               | SonarJS 規則的 ESLint 設定（認知複雜度／重複）                                   |
| **source.config.ts**                        | Fumadocs `defineDocs` 來源設定（提供給 `.source/`）                              |
| **knip.json**                               | Knip 設定——未使用的檔案／匯出／相依套件（提供給無用程式碼閘門）                  |
| **stryker.conf.json**                       | Stryker 突變測試設定                                                             |
| **.size-limit.json**                        | size-limit bundle 預算設定                                                       |
| **promptfooconfig.yaml**                    | promptfoo 評估設定                                                               |
| **.gitleaks.toml**                          | gitleaks 機密掃描規則集                                                          |
| **.zizmor.yml**                             | zizmor GitHub Actions 安全性 lint 設定                                           |
| **socket.yml**                              | Socket.dev 軟體供應鏈設定                                                        |
| **news.json**                               | 本地化的 v2 公告動態消息；Radar 上線項目以停用狀態發布                           |
| **flake.nix** / **flake.lock**              | Nix 開發 shell 定義與鎖定檔                                                      |
| **.env**                                    | 本機機密資料（已由 git 忽略——根據 `.env.example` 產生）                          |

> **在 v3.8.26 中移出根目錄（減少雜亂）：**
>
> - **→ `config/quality/`：** `quality-baseline.json`、`complexity-baseline.json`、`duplication-baseline.json`、`file-size-baseline.json`、`test-discovery-baseline.json`、`dependency-allowlist.json`、`.license-allowlist.json`，以及產生的 `quality-metrics.json`（已由 git 忽略）。請參閱 [`## config/`](#config--static-configs--quality-gate-state)。

---

## `src/` — Next.js應用程式

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

### `src/app/` — 應用程式路由器 (Next.js 16)

| 小路                                                                         | 目的                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | 公共 OpenAI-compat API （~ 25 條子路線：聊天、完成、嵌入、文件、批次、音訊、圖像、視訊、音樂、重新排名、審核、搜尋、ws、代理商、帳戶、提供者等）                                                                                                                                                                    |
| `app/api/v1beta/`                                                            | Gemini 風格的API端點                                                                                                                                                                                                                                                                                                |
| `app/api/playground/`                                                        | Playground Studio 路線： `improve-prompt/` (POST — LLM提示字元重寫器)、 `presets/` (GET list / POST create)、 `presets/[id]/` (GET / PUT / DELETE) — 請參閱`docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                   |
| `app/api/` （非 v1）                                                         | Management/admin路由（~ 60 目錄：提供者、組合、設定、mcp、a2a、evals、記憶體、技能、webhooks、合規性、彈性、監控、隧道、cli 工具等）                                                                                                                                                                                |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 條路由（伺服器控制、代理state/DNS/mappings、旁路、憑證、上游 CA）。 LOCAL_ONLY + SPAWN_CAPABLE。參見`docs/frameworks/AGENTBRIDGE.md §7`。                                                                                                                                                 |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 個+路由（請求、會話、主機、捕獲模式、匯出、ws）。 LOCAL_ONLY + SPAWN_CAPABLE。參見`docs/frameworks/TRAFFIC_INSPECTOR.md §8`。                                                                                                                                                  |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 入口點 (`POST /a2a`)                                                                                                                                                                                                                                                                               |
| `app/.well-known/agent.json/`                                                | A2A代理卡（發現）                                                                                                                                                                                                                                                                                                   |
| `app/(dashboard)/dashboard/`                                                 | 儀表板UI頁面（50 個+部分、 ~ 118 個page.tsx檔案：提供者、組合、設定、記憶體、技能、webhooks、評估、稽核、批次、快取、成本、運作狀況、系統、活動等）                                                                                                                                                                 |
| `app/(dashboard)/dashboard/search-tools/`                                    | 搜尋工具 Studio UI （3 個選項卡： Search/Scrape/Compare + SearchConceptCard + ProviderCatalog） — 請參閱`docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（計畫 21）： `page.tsx` （3-tab shell）、 `components/` （MemoryConceptCard、 MemoryEngineStatus、 EmbeddingSourceSelector、 EditMemoryModal、 RetrievePreview、 QdrantConfigCard、 RerankConfigCard）、 `components/tabs/` （MemoriesTab、 PlaygroundTab、 EngineTab）、 `hooks/` （ zqj （ zqk 、 z |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge儀表板頁面 — 伺服器卡、9 個代理卡、設定精靈、模型對應、旁路清單。 i18n PT-BR + EN。參見`docs/frameworks/AGENTBRIDGE.md`。                                                                                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector 儀表板頁面 — DevTools拆分、7 個詳細資料標籤、4 個捕獲模式切換、會話記錄器、上下文著色。 i18n PT-BR + EN。參見`docs/frameworks/TRAFFIC_INSPECTOR.md`。                                                                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | 活動動態頁面（B 群組）： `page.tsx` （伺服器） + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — 請參閱`docs/architecture/MONITORING_SECTIONS.md`                                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | 配額分享頁（B組）： `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                     |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | 提供者計畫配置頁面（B 組）： `page.tsx` + `ProviderPlanConfigClient.tsx` — 每個連線覆蓋的配額維度                                                                                                                                                                                                                   |
| `app/docs/`                                                                  | 嵌入式文件檢視器（呈現`docs/*.md`）                                                                                                                                                                                                                                                                                 |
| `app/landing/`                                                               | 行銷登陸頁面                                                                                                                                                                                                                                                                                                        |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Auth相關頁面                                                                                                                                                                                                                                                                                                        |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP錯誤頁面                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status頁面                                                                                                                                                                                                                                                                                                   |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | 根佈局、home、 PWA清單、全域CSS                                                                                                                                                                                                                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | 誤差邊界                                                                                                                                                                                                                                                                                                            |

### `src/lib/` — 核心庫（~ 50 個模組）

| 模組                                     | 目的                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A協定任務管理器、技能（5）、串流媒體                                                                                                                                                                                                                                                                                |
| `acp/`                                   | CLI代理註冊表（本地CLI發現 — 請參閱`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`）                                                                                                                                                                                                                                       |
| `api/`                                   | 共享API助手（`requireManagementAuth`、驗證）                                                                                                                                                                                                                                                                          |
| `auth/`                                  | 會話、密碼雜湊、令牌驗證                                                                                                                                                                                                                                                                                              |
| `batches/`                               | OpenAI批次API處理程序                                                                                                                                                                                                                                                                                                 |
| `catalog/`                               | 提供者目錄Zod驗證+能力解析                                                                                                                                                                                                                                                                                            |
| `cloudAgent/`                            | 雲端代理（Codex Cloud、 Devin、 Jules） — 請參閱`docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                      |
| `combos/`                                | 組合解析+重新排序助手                                                                                                                                                                                                                                                                                                 |
| `audit/`                                 | 活動提要小幫手： `highLevelActions.ts` （允許清單+ `isHighLevelAction()`）、 `activityIcons.ts` （操作→ icon/verb地圖）、 `timeline.ts` (groupByDay/relativeTime) — 請參閱`docs/architecture/MONITORING_SECTIONS.md`                                                                                                  |
| `compliance/`                            | 審核日誌+提供者審核 — 請參閱`docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                             |
| `compression/`                           | 壓縮引擎膠（引擎住`open-sse/services/compression/`）                                                                                                                                                                                                                                                                  |
| `config/`                                | 運行時配置助手                                                                                                                                                                                                                                                                                                        |
| `db/`                                    | 120 +域DB模組+ 168 遷移（對於SQLite始終通過此處）                                                                                                                                                                                                                                                                     |
| `quota/`                                 | 配額共享引擎： `dimensions.ts` (types/Zod)、 `types.ts` (QuotaStore介面)、 `sqliteQuotaStore.ts`、 `redisQuotaStore.ts`、 `storeFactory.ts`、 `fairShare.ts`、 `burnRate.ts`、 `planResolver.ts`、 `planRegistry.ts`、 `saturationSignals.ts`、 `enforce.ts`、 `spendRecorder.ts` — 參見`docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | 雷達自由模型目錄客戶端： `feedSchema.ts`、 `pinnedKeys.ts`、 `verify.ts`、 `sync.ts`、 `applyFeed.ts`、 `index.ts` (`getRadarCatalog()`) — 參見`docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | UI格式化助手（成本、延遲等）                                                                                                                                                                                                                                                                                          |
| `embeddings/`                            | 嵌入服務助理                                                                                                                                                                                                                                                                                                          |
| `env/`                                   | Env變數解析+驗證                                                                                                                                                                                                                                                                                                      |
| `evals/`                                 | Eval 框架（套件、執行程式、執行時間）- 請參閱`docs/frameworks/EVALS.md`                                                                                                                                                                                                                                               |
| `guardrails/`                            | PII masker、提示注入、視覺橋 — 參見`docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                      |
| `jobs/`                                  | 後台作業（類似 cron）                                                                                                                                                                                                                                                                                                 |
| `memory/`                                | 對話記憶（SQLite FTS5 + sqlite-vec 混合RRF + Qdrant第 2 層） - 參考`docs/frameworks/MEMORY.md`                                                                                                                                                                                                                        |
| `memory/embedding/`                      | 多源嵌入層： `index.ts` （解析器）、 `remote.ts`、 `staticPotion.ts`、 `transformersLocal.ts`、 `cache.ts`、 `types.ts` （方案21）                                                                                                                                                                                    |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 包裝器 — KNN暴力+混合RRF （FTS5 +向量，k = 60）。 Lazy-init，當 sqlite-vec 不可用時優雅地降級。 （計劃21）                                                                                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — 在背景使用`needs_reindex=1`處理記憶體；由`POST /api/memory/reindex`和惰性回填路徑呼叫。 （計劃21）                                                                                                                                                                                              |
| `monitoring/`                            | 健康檢查、指標排放                                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | 22 個提供者模組的OAuth/import流程（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、vg-cli、kilocode、kimi-cogitlab-duo、grok-cli-oauth、p-cli、kilo                                                                                     |
| `plugins/`                               | 外掛程式註冊表                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | 人類風格的提示快取斷點                                                                                                                                                                                                                                                                                                |
| `skills/`                                | 技能架構（內建+市場+ SkillsSH）—參見`docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                       |
| `playground/`                            | Playground Studio 共用助理： `codeExport.ts` （curl/Python/TS產生器）、 `promptImprover.ts` （元提示建構器）、 `streamMetrics.ts` （純TTFT/TPS）、 `types.ts` （定價表）— 請參閱`docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                |
| `webhookDispatcher.ts`                   | HMAC webhook 交付 — 請參閱`docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | 隧道管理器 — 請參閱`docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                        |
| `cloudSync.ts`, `initCloudSync.ts`       | 可選的狀態雲同步                                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                             | 重新匯出資料庫模組的桶（無邏輯 - 僅重新導出）                                                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | 請求快取+冪等性                                                                                                                                                                                                                                                                                                       |
| （~ 30多個頂級檔案）                     | 專門的助手（logEnv、modelsDevSync、piiSanitizer 等）                                                                                                                                                                                                                                                                  |

### `src/lib/db/` — 資料庫（147 個模組+ 208 個遷移）

| 子目錄                    | 目的                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | 帶有WAL日誌功能的`getDbInstance()`單例                                                                                                                               |
| `db/migrations/`          | 版本化的SQL檔（冪等、事務）。 `073_memory_vec.sql`增加`memory_vec_meta` + `needs_reindex`列（方案 21）。                                                             |
| `db/playgroundPresets.ts` | Playground Studio 預設的CRUD模組（`listPlaygroundPresets`、 `getPlaygroundPreset`、 `createPlaygroundPreset`、 `updatePlaygroundPreset`、 `deletePlaygroundPreset`） |
| `db/memoryVec.ts`         | CRUD for `memory_vec_meta` （active_dim、embedding_signature、last_reset_at、vec_loaded） + `markMemoryNeedsReindex`、 `getMemoryReindexQueue`等（計畫 21）          |
| `db/<domain>.ts`          | 每個網域一個模組：providers、combos、apiKeys、users、sessions、usage、audit log、webhooks、skills、memory_entries、cloud_agent_tasks、evals* \* 、推理快取等         |

### `src/domain/`

| 模組                   | 目的                                     |
| ---------------------- | ---------------------------------------- |
| `policy.ts`            | 策略引擎                                 |
| `fallbackPolicy.ts`    | 後備決策樹                               |
| `costRules.ts`         | 成本計算規則                             |
| `lockoutPolicy.ts`     | Model/connection鎖定政策                 |
| `tagRouter.ts`         | 基於標籤的路由                           |
| `comboResolver.ts`     | 組合解析度（由組合引擎使用）             |
| `modelAvailability.ts` | 每個型號的可用性檢查                     |
| `assessment/`          | 模型評估（RFC-AUTO-ASSESSMENT 第一階段） |

### `src/server/`

| 模組     | 目的                                                                                    |
| -------- | --------------------------------------------------------------------------------------- |
| `authz/` | 授權管道： `classify` → `policies` → `enforce` — 參見`docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS配置                                                                                |
| `auth/`  | 會話中介軟體                                                                            |

### `src/shared/`

| 模組                             | 目的                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `components/`                    | 儀表板組件API： `packages/ui-kit`上的轉接器 — 請參閱`docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`：螢幕使用的圖示名稱→ Lucide 元件 (`<Icon>`)                                   |
| `constants/providers.ts`         | **377 提供者**透過Zod驗證（事實來源）                                                    |
| `constants/cliTools.ts`          | 外部CLI工具註冊表                                                                        |
| `constants/routingStrategies.ts` | **20種路由策略**有優先事項                                                               |
| `constants/publicApiRoutes.ts`   | 需要承載（與管理）身份驗證的路由                                                         |
| `constants/upstreamHeaders.ts`   | 上游請求的標頭拒絕列表                                                                   |
| `validation/schemas.ts`          | ~ 80 Zod模式（ API合約的單一事實來源）                                                   |
| `validation/helpers.ts`          | Zod驗證助理（`validateBody`等）                                                          |
| `types/`                         | 共享TS類型                                                                               |
| `contracts/`                     | 公共API合約（由`package.json`中的`files:`使用）                                          |
| `utils/circuitBreaker.ts`        | 提供者斷路器（參見`docs/architecture/RESILIENCE_GUIDE.md`）                              |
| `utils/apiAuth.ts`               | API金鑰驗證、範圍檢查                                                                    |
| `utils/fetchTimeout.ts`          | 用於上游取得的Timeout/abort包裝器                                                        |
| `utils/releaseNotes.ts`          | 關閉v2/legacy公告解析器、本地化和ID解僱                                                  |

---

## `open-sse/` — 串流引擎工作區

獨立的 npm 工作區（`@omniroute/open-sse`）。負責請求處理與提供者執行。

```
open-sse/
├── handlers/            # 16 個檔案（12 個處理器 + 4 個輔助程式）：chatCore、responsesHandler、embeddings、audio、image、video、music、rerank、moderations、search 等。
├── executors/           # 150 個執行器模組（擴充 BaseExecutor 的類別 + 各提供者專用輔助程式）
├── translator/          # 格式轉換器（9 個請求、9 個回應、9 個輔助程式）
├── transformer/         # Responses API ↔ Chat Completions（TransformStream）
├── services/            # 約 80+ 個服務模組（combo、accountFallback、autoCombo、reasoningCache、claude code/chatgpt stealth、modelDeprecation、taskAwareRouter、workflowFSM 等）
├── mcp-server/          # MCP 伺服器（110 個工具、3 種傳輸方式、33 個範圍）
├── config/              # 提供者／模型登錄、標頭設定、模型別名
├── utils/               # TLS 用戶端、代理擷取／分派器、網路輔助程式
├── index.ts             # 工作區進入點
├── package.json         # 工作區資訊清單
├── tsconfig.json        # 工作區 TS 設定
└── types.d.ts           # 工作區類型宣告
```

### `open-sse/mcp-server/`

| 路徑                        | 用途                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `server.ts`                 | MCP 伺服器生命週期（stdio + HTTP 傳輸）                               |
| `httpTransport.ts`          | HTTP Streamable + SSE 傳輸（`/api/mcp/sse`、`/api/mcp/stream`）       |
| `audit.ts`                  | 將稽核日誌記錄至 `mcp_tool_audit` 資料表                              |
| `scopeEnforcement.ts`       | 各工具的範圍驗證                                                      |
| `runtimeHeartbeat.ts`       | 將健康狀態心跳寫入 `DATA_DIR/runtime/mcp-heartbeat.json`              |
| `descriptionCompressor.ts`  | 壓縮工具描述中繼資料以節省上下文                                      |
| `schemas/tools.ts`          | 36 個基礎工具定義 + 範圍                                              |
| `tools/advancedTools.ts`    | 進階工具實作                                                          |
| `tools/memoryTools.ts`      | 3 個記憶體工具（搜尋／新增／清除）                                    |
| `tools/skillTools.ts`       | 4 個技能工具（列出／啟用／執行／執行記錄）                            |
| `tools/compressionTools.ts` | 5 個壓縮工具                                                          |
| `README.md`                 | 內部 MCP 伺服器 README（從 `docs/frameworks/MCP-SERVER.md` 交叉連結） |

---

## `packages/` — 工作區

| 路徑                     | 用途                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — Keak CI UI Kit 的內嵌快照（`private`、`UNLICENSED`），直接以原始碼形式使用（無需建置）。`UPSTREAM.md` 固定上游提交並記錄授權許可；`PATCHES.md` 列出本機修補程式（目前無）；`src/` 僅透過 `scripts/dev/sync-ui-kit.sh` 同步，並由 `npm run check:ui-kit-snapshot` 進行防護。請參閱 `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — 選用的瀏覽器池服務（CloakBrowser 與由 Playwright 支援的聊天功能）                                                                                                                                                                                                                                                |

---

## `electron/` — 桌面封裝程式

| 檔案             | 用途                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| `main.js`        | Electron 主程序（BrowserWindow、內嵌 Next.js 伺服器、系統匣、自動更新） |
| `preload.js`     | IPC 橋接器（contextBridge → `window.omniroute`）                        |
| `package.json`   | electron-builder 設定 + Electron 41 + electron-builder 26.10 相依套件   |
| `assets/`        | 應用程式圖示（Windows .ico、macOS .icns、Linux .png）                   |
| `dist-electron/` | 建置輸出（已由 git 忽略）                                               |
| `types.d.ts`     | 轉譯器橋接器的類型宣告                                                  |
| `README.md`      | Electron 內部 README（另請參閱 `docs/guides/ELECTRON_GUIDE.md`）        |

---

## `bin/` — CLI

| 檔案                                                                                                        | 用途                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | 主要 CLI 進入點 — `omniroute serve`、`omniroute setup`、`omniroute doctor`、`omniroute providers`、`omniroute combos` 等 |
| `reset-password.mjs`                                                                                        | 獨立的密碼重設 CLI                                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | 互動式 + 非互動式設定精靈                                                                                                |
| `cli/commands/doctor.mjs`                                                                                   | 系統健康狀況診斷（8 項以上的檢查）                                                                                       |
| `cli/commands/providers.mjs`                                                                                | 提供者清單／測試／驗證                                                                                                   |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI 輔助模組                                                                                                             |
| `cli/tray/tray.ts`                                                                                          | 系統匣整合（跨平台：Windows 使用 NotifyIcon，macOS/Linux 使用 systray2）                                                 |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon 後端（Windows，無需新增二進位檔案）                                                                |
| `cli/tray/autostart.ts`                                                                                     | 跨平台自動啟動（LaunchAgent / .desktop / 登錄檔）                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 步驟 SQLite 驅動程式解析鏈（內附 → 執行階段 → 延遲安裝 → node:sqlite → sql.js）                                        |
| `cli/runtime/magicBytes.mjs`                                                                                | 二進位魔術位元組驗證（ELF / Mach-O / Mach-O fat / PE）                                                                   |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — 在 postinstall／首次啟動時預先解析驅動程式                                                          |
| `nodeRuntimeSupport.mjs`                                                                                    | 安裝時驗證受支援的 Node.js 版本                                                                                          |

---

## `skills/` — 公開代理技能

| 檔案                         | 用途                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 提供給外部 AI 代理（Claude Desktop、ChatGPT、Cursor、Cline）的 10 個技能清單 |

---

## `scripts/` — 建置與檢查指令碼

| 指令碼                              | 用途                                                                  |
| ----------------------------------- | --------------------------------------------------------------------- |
| `run-next.mjs`                      | 具備環境變數載入功能的開發／啟動執行器                                |
| `build-next-isolated.mjs`           | 獨立建置（Next.js 16 standalone）                                     |
| `prepublish.ts`                     | 在 `npm pack` 前準備套件                                              |
| `postinstall.mjs`                   | 首次安裝時自動從 `.env.example` 建立 `.env`                           |
| `sync-env.mjs`                      | 將 `.env` 的鍵與 `.env.example` 重新同步                              |
| `check-cycles.mjs`                  | 偵測循環相依性                                                        |
| `check-route-validation.mjs`        | 驗證所有 API 路由均具有 Zod 驗證                                      |
| `check-t11-any-budget.mjs`          | 強制執行每個檔案明確的 `any` 配額                                     |
| `check-docs-sync.mjs`               | 驗證文件版本同步（現有的提交前檢查）                                  |
| **`check-env-doc-sync.mjs`**        | 新增：交叉檢查程式碼、`.env.example` 與 `ENVIRONMENT.md` 中的環境變數 |
| **`check-docs-counts-sync.mjs`**    | 新增：驗證數量（執行器、策略、OAuth、A2A 技能）是否與文件一致         |
| **`check-deprecated-versions.mjs`** | 新增：標示文件中過時的版本／日期                                      |
| `check-supported-node-runtime.ts`   | 驗證目前的 Node 版本是否受支援                                        |
| `check-pr-test-policy.mjs`          | 對正式環境程式碼變更強制執行「必須測試」規則                          |
| **`gen-provider-reference.ts`**     | 新增：從目錄自動產生 `docs/reference/PROVIDER_REFERENCE.md`           |
| `i18n/generate-multilang.mjs`       | 透過 Google Translate 翻譯 UI 字串與文件                              |
| `i18n_autotranslate.py`             | 以 LLM 為基礎的文件翻譯管線                                           |
| `validate_translation.py`           | 逐語系翻譯驗證                                                        |
| `check_translations.py`             | 程式碼端 i18n 鍵檢查                                                  |
| `run-playwright-tests.mjs`          | Playwright E2E 執行器                                                 |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E 執行器                                                    |
| `run-ecosystem-tests.mjs`           | 生態系統（提供者整合）測試                                            |
| `test-report-summary.mjs`           | 產生涵蓋率摘要 markdown                                               |
| `smoke-electron-packaged.mjs`       | 對封裝後的 Electron 建置執行冒煙測試                                  |
| `native-binary-compat.mjs`          | 驗證原生相依套件（`better-sqlite3`）是否與 Electron 的 Node 相符      |
| `validate-pack-artifact.ts`         | 驗證 npm pack 輸出                                                    |
| `responses-ws-proxy.mjs`            | Codex Responses API 的 WebSocket 橋接器                               |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` 端點的 WebSocket 橋接器                                  |
| `standalone-server-ws.mjs`          | 獨立 WS 伺服器執行器                                                  |
| `system-info.mjs`                   | 輸出系統／執行階段資訊以供支援使用                                    |
| `healthcheck.mjs`                   | 單次健康狀態檢查（由 Docker HEALTHCHECK 使用）                        |
| `uninstall.mjs`                     | 完整解除安裝指令碼                                                    |
| `dev/sync-ui-kit.sh`                | 將固定提交版本的 CI UI Kit `src/` 複製至 `packages/ui-kit/src`        |
| `check/check-ui-kit-snapshot.mjs`   | 提交前閘門：確認 `packages/ui-kit/src` 與固定的上游提交版本一致       |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — 列出使用中但未由 `ICON_MAP` 對應的圖示名稱   |
| `dev/codemod-material-icons.mjs`    | 將字面值 Material Symbols span 重寫為 `<Icon>`（遷移工具）            |

---

## `docs/` — 公共文件（7 個根檔案+ 17 個子目錄）

### 頂級指南

| 醫生                        | 目的                                                                       |
| --------------------------- | -------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高層架構、子系統圖、儀表板表面                                             |
| `CODEBASE_DOCUMENTATION.md` | 工程參考：目錄、模組、約定                                                 |
| `FEATURES.md`               | v3.8 亮點功能矩陣                                                          |
| `USER_GUIDE.md`             | 最終使用手冊（設定、模型、組合、 CLIs、音訊等）                            |
| `API_REFERENCE.md`          | 具有身份驗證模型的API端點參考                                              |
| `openapi.yaml`              | OpenAPI 3.0 規範（121 條路徑）                                             |
| `SETUP_GUIDE.md`            | 安裝方法（npm、npx、 Docker、 Electron、Termux、來源）                     |
| `ENVIRONMENT.md`            | 所有環境變數（~ 800 記錄， ~ 3,050 行`.env.example`）                      |
| `TROUBLESHOOTING.md`        | 常見錯誤+ v3.8.0 已知問題                                                  |
| `RELEASE_CHECKLIST.md`      | 完整的發布流程（技能、husky、常規提交、部署）                              |
| `COVERAGE_PLAN.md`          | 覆蓋目標和現狀                                                             |
| `FREE_TIERS.md`             | 精選的免費提供者（48 +免費+ 11 OAuth）                                     |
| `CLI-TOOLS.md`              | 外部CLI整合+內部OmniRoute CLI                                              |
| `I18N.md`                   | i18n 架構，新增語言，67 語言環境                                           |
| `UNINSTALL.md`              | 乾淨卸載步驟                                                               |
| `PROVIDER_REFERENCE.md`     | **自動生成**377 個提供者的目錄（regen： `npm run gen:provider-reference`） |

### 子系統深入研究

| 醫生                                          | 目的                                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP伺服器：110 個工具、3 個傳輸、33 個範圍、 REST端點 |
| `A2A-SERVER.md`                               | A2A v0.3：JSON-RPC、6 種技能、 REST助理、代理卡       |
| `AGENT_PROTOCOLS_GUIDE.md`                    | 統一指南： A2A 、 ACP 、雲代理                        |
| `CLOUD_AGENT.md`                              | Codex雲/ Devin / Jules編排                            |
| `SKILLS.md`                                   | 技能架構（內建+市場+ SkillsSH +沙箱）                 |
| `RADAR.md`                                    | 雷達自由模型目錄覆蓋（`RADAR_ENABLED`，預設為關閉）   |
| `MEMORY.md`                                   | 記憶體系統（SQLite FTS5 + Qdrant）                    |
| `EVALS.md`                                    | 評估框架（套件、運行、評分標準）                      |
| `GUARDRAILS.md`                               | PII masker、即時注入、視覺橋                          |
| `COMPLIANCE.md`                               | 審核日誌、保留、noLog 選擇退出                        |
| `WEBHOOKS.md`                                 | HMAC 簽署的 Webhook 交付                              |
| `REASONING_REPLAY.md`                         | `reasoning_content`的混合memory/SQLite快取            |
| `AUTHZ_GUIDE.md`                              | 授權管道（`classify` → `policies` → `enforce`）       |
| `RESILIENCE_GUIDE.md`                         | 斷路器+冷卻+模型鎖定                                  |
| `docs/security/STEALTH_GUIDE.md` （僅限 git） | TLS指紋 (JA3/JA4)、 Claude代碼CCH、 MITM證書          |
| `AUTO-COMBO.md`                               | 自動組合引擎（16 因素評分、6 個模式套件、虛擬工廠）   |

### 壓縮

| 醫生                            | 目的                          |
| ------------------------------- | ----------------------------- |
| `COMPRESSION_GUIDE.md`          | 壓縮模式概述+路線圖           |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK引擎、註冊表合約 |
| `COMPRESSION_RULES_FORMAT.md`   | 穴居人規則包JSON模式          |
| `COMPRESSION_LANGUAGE_PACKS.md` | 每種語言的規則包清單          |
| `RTK_COMPRESSION.md`            | RTK聲明式管道（56 個過濾器）  |

### 部署

| 醫生                         | 目的                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker建置、設定檔 (base/cli/host/cliproxyapi)、 Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | 通用VM/VPS部署（Ubuntu/Debian + nginx + systemd）              |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io部署（目前僅限中文）                                     |
| `TERMUX_GUIDE.md`            | 透過 Termux 實現 Android 無頭                                  |
| `PWA_GUIDE.md`               | 漸進式 Web 應用程式安裝+ Service Worker                        |
| `ELECTRON_GUIDE.md`          | 桌面應用程式建構+簽名+分發                                     |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale漏斗                            |
| `PROXY_GUIDE.md`             | 4 級出站代理+ 1proxy 市場                                      |

### 子目錄

| 子目錄                | 目的                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | 在地化文件翻譯（41 語言環境）                                                                                                               |
| `docs/screenshots/`   | 指南的圖像資源                                                                                                                              |
| `_tasks/superpowers/` | 超級大國（`writing-plans`/`brainstorming`）的Plans/specs +研究 — 孤立的、單獨版本的儲存庫，被主樹忽略。參見CLAUDE.md → 《規劃與研究工件》。 |

---

## `tests/` — 測試套件

| 子目錄                               | 類型                                  | 執行器                          |
| ------------------------------------ | ------------------------------------- | ------------------------------- |
| `tests/unit/`                        | 單元測試（約 4,800 個檔案，速度最快） | Node 原生測試執行器             |
| `tests/integration/`                 | 多模組 + DB 整合測試                  | Node 原生測試執行器（並行度 1） |
| `tests/e2e/`                         | UI + 工作流程 E2E                     | Playwright                      |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A 真實客戶端 E2E              | 自訂協定客戶端                  |
| `tests/e2e/ecosystem.test.ts`        | 提供者整合（會存取網路）              | Node 原生測試執行器             |

---

## `public/` — 靜態資產

| 路徑                | 用途                                                     |
| ------------------- | -------------------------------------------------------- |
| `public/`（根目錄） | 網站圖示、robots.txt、manifest、Service Worker、行銷圖片 |
| `public/providers/` | 提供者標誌 PNG/SVG（用於儀表板）                         |

---

## `config/` — 靜態設定 + 品質閘門狀態

隨附的設定範本，以及已提交的品質閘門基準
（在 v3.8.26 中從儲存庫根目錄移至此處，以保持根目錄精簡）。

| 路徑                                          | 用途                                                               |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `config/i18n.json`                            | 語系清單 + 中繼資料（42 個語系計數的標準來源）                     |
| `config/i18n-schema.json`                     | 用於驗證 `i18n.json` 的 JSON schema                                |
| `config/payloadRules.json`                    | 上游酬載清理規則                                                   |
| `config/quality/quality-baseline.json`        | 多指標棘輪基準（`scripts/quality/check-quality-ratchet.mjs`）      |
| `config/quality/complexity-baseline.json`     | 凍結的 ESLint 複雜度基準（`check-complexity.mjs`）                 |
| `config/quality/duplication-baseline.json`    | 凍結的 jscpd 重複基準（`check-duplication.mjs`）                   |
| `config/quality/file-size-baseline.json`      | 凍結的逐檔案大小基準（`check-file-size.mjs`）                      |
| `config/quality/test-discovery-baseline.json` | 凍結的孤立測試基準（`check-test-discovery.mjs`）                   |
| `config/quality/dependency-allowlist.json`    | 核准的相依套件允許清單（`check-deps.mjs`）                         |
| `config/quality/.license-allowlist.json`      | SPDX 授權允許清單（`check-licenses.mjs`）                          |
| `config/quality/quality-metrics.json`         | 暫時收集的指標（由 `collect-metrics.mjs` 產生；**已由 git 忽略**） |

---

## `.github/` — GitHub 整合

| 路徑                               | 用途                                                            |
| ---------------------------------- | --------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD 工作流程（程式碼檢查、測試、覆蓋率、發布） |
| `.github/ISSUE_TEMPLATE/`          | 錯誤／功能議題範本                                              |
| `.github/pull_request_template.md` | PR 範本                                                         |
| `.github/dependabot.yml`           | 相依套件更新設定                                                |

---

## `.husky/` — Git Hooks

| 檔案         | 用途                                                        |
| ------------ | ----------------------------------------------------------- |
| `pre-commit` | 執行 `lint-staged + check-docs-sync + check:any-budget:t11` |
| `pre-push`   | 目前已停用（已註解）。請手動執行 `npm run test:unit`。      |
| `_/`         | Husky 內部檔案                                              |

---

## `.claude/` — Claude Code 斜線命令

| 檔案                                                | 用途                                              |
| --------------------------------------------------- | ------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — 提升版本號並自動產生變更日誌 |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — 完整發布工作流程         |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | 部署至 VPS                                        |
| `commands/capture-release-evidences-cc.md`          | 在瀏覽器中將新功能錄製為 WebP                     |
| `commands/review-{prs,discussions}-cc.md`           | 分流處理 GitHub PR／討論                          |
| `commands/{review-issues,implement-features}-cc.md` | 議題工作流程                                      |
| `settings.local.json`                               | 個別專案的 Claude Code 設定                       |

---

## `.agents/` — 通用代理工作流程（Codex／Cursor 等）

| 路徑                     | 用途                                            |
| ------------------------ | ----------------------------------------------- |
| `workflows/*-ag.md`      | 11 個工作流程定義（`.claude/commands/` 的鏡像） |
| `skills/<name>/SKILL.md` | 9 個包含 Codex 執行注意事項的技能定義           |

> **注意：**工作流程與命令目前逐位元組完全相同。如果 `.agents/` 是用於不同的代理執行環境（Codex），各版本就需要有實質差異。

---

## `_ideia/`、`_mono_repo/`、`_references/`、`_tasks/` — 樹狀結構外內容

這些以下劃線為前綴的目錄存放不隨套件發布的內容：

- **`_ideia/`** — 設計筆記（defer／notfit／viable 分類）
- **`_mono_repo/`** — 歷史子專案（omnirouteCloud、omnirouteSite、vscode-extension）
- **`_references/`** — 相關 OSS 專案的唯讀複本（LiteLLM、9router、ClawRouter、CLIProxyAPI、modelrelay、new-api 等），供開發期間交叉參考
- **`_tasks/`** — 各版本的任務追蹤檔案（非正式）

不包含在 `npm pack` 輸出中。請參閱 `.npmignore`。

---

## 產生內容 / Git 已忽略項目

| 路徑                   | 用途                      |
| ---------------------- | ------------------------- |
| `node_modules/`        | npm 相依套件              |
| `.next/`               | Next.js 建置輸出          |
| `coverage/`            | c8 覆蓋率報告             |
| `logs/`                | 執行階段日誌              |
| `package/`             | npm pack 暫存區           |
| `.playwright-mcp/`     | Playwright MCP 測試產出物 |
| `.issues/`             | 本機 issue 快取           |
| `tsconfig.tsbuildinfo` | TS 增量建置快取           |

---

## 導覽提示

- **新貢獻者？** 請依序閱讀 `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`。
- **新增 provider？** 請遵循 `docs/architecture/ARCHITECTURE.md § Adding a New Provider`，並交叉核對 `docs/reference/PROVIDER_REFERENCE.md`。
- **新增 route？** 請參閱 `docs/architecture/ARCHITECTURE.md § Adding a New API Route` 和 `src/shared/validation/schemas.ts`。
- **新增 MCP tool？** 請參閱 `docs/frameworks/MCP-SERVER.md § Adding a Tool`。
- **新增 A2A skill？** 請參閱 `docs/frameworks/A2A-SERVER.md § Adding a New Skill`。
- **在本機執行？** 請參閱 `docs/guides/SETUP_GUIDE.md`。
- **部署？** 請參閱 `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`。
- **發布版本？** 請參閱 `docs/ops/RELEASE_CHECKLIST.md`（以及 `/generate-release-cc` Claude Code skill）。
