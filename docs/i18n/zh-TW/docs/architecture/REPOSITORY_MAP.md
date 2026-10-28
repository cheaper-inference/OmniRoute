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

## `src/` — Next.js 應用程式

```
src/
├── app/                 # App Router（頁面 + API 路由 + 狀態頁面 + 登陸頁面）
├── lib/                 # 核心函式庫／領域模組（80 個子目錄 + 約 70 個頂層檔案）
├── domain/              # 純領域邏輯（原則引擎、備援、成本、鎖定、comboResolver、評估）
├── server/              # 僅限伺服器的模組（授權管線、cors、驗證中介軟體）— 用戶端無法匯入
├── shared/              # 在安全情況下由伺服器與用戶端共用（常數、類型、驗證、契約、工具）
├── i18n/                # next-intl 設定 + 各語系訊息 JSON（67 個語系）
├── middleware/          # Next.js 中介軟體（請求擴充、語系偵測）
├── mitm/                # MITM Proxy 核心：憑證產生／安裝、處理器、目標、檢查器、遮罩、直通
│   ├── handlers/        # 9 個擴充 MitmHandlerBase 的 IDE 代理程式處理器類別（antigravity、kiro、copilot、codex、cursor、zed、claudeCode、openCode、trae）
│   └── inspector/       # 流量擷取層：緩衝區（記憶體內環形緩衝區）、sseMerger、conversationNormalizer、kindDetector、contextKey、httpProxyServer、systemProxyConfig
├── models/              # 模型配接器銜接層（舊版相容層）
├── scripts/             # 原始碼樹內的維護指令碼（例如 backfillAggregation）
├── sse/                 # 舊版 SSE 處理器／服務（chat.ts、chatHelpers.ts、services/auth.ts）
├── store/               # 舊版記憶體內儲存區（正逐步改用 src/lib/db）
├── types/               # 共用 TS 類型檔案
├── instrumentation.ts   # Next.js 遙測掛鉤（瀏覽器 + 邊緣執行環境）
├── instrumentation-node.ts  # 僅限 Node 的檢測
└── proxy.ts             # HTTP Proxy 入口相容層
```

### `src/app/` — App Router（Next.js 16）

| 路徑                                                                         | 用途                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | 公開的 OpenAI 相容 API（約 25 個子路由：chat、completions、embeddings、files、batches、audio、images、videos、music、rerank、moderations、search、ws、agents、accounts、providers 等）                                                                                                                                 |
| `app/api/v1beta/`                                                            | Gemini 風格的 API 端點                                                                                                                                                                                                                                                                                                 |
| `app/api/playground/`                                                        | Playground Studio 路由：`improve-prompt/`（POST — LLM 提示詞改寫器）、`presets/`（GET 列表 / POST 建立）、`presets/[id]/`（GET / PUT / DELETE）— 請參閱 `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                         |
| `app/api/`（非 v1）                                                          | 管理／系統管理路由（約 60 個目錄：providers、combos、settings、mcp、a2a、evals、memory、skills、webhooks、compliance、resilience、monitoring、tunnels、cli-tools 等）                                                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 個路由（伺服器控制、代理程式狀態／DNS／對應、略過、憑證、上游 CA）。LOCAL_ONLY + SPAWN_CAPABLE。請參閱 `docs/frameworks/AGENTBRIDGE.md §7`。                                                                                                                                                 |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 個以上的路由（requests、sessions、hosts、capture-modes、export、ws）。LOCAL_ONLY + SPAWN_CAPABLE。請參閱 `docs/frameworks/TRAFFIC_INSPECTOR.md §8`。                                                                                                                              |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 進入點（`POST /a2a`）                                                                                                                                                                                                                                                                                 |
| `app/.well-known/agent.json/`                                                | A2A Agent Card（探索）                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | 儀表板 UI 頁面（50 多個區段、約 118 個 page.tsx 檔案：providers、combos、settings、memory、skills、webhooks、evals、audit、batch、cache、costs、health、system、activity 等）                                                                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI（3 個分頁：搜尋／擷取／比較 + SearchConceptCard + ProviderCatalog）— 請參閱 `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（計畫 21）：`page.tsx`（3 分頁外殼）、`components/`（MemoryConceptCard、MemoryEngineStatus、EmbeddingSourceSelector、EditMemoryModal、RetrievePreview、QdrantConfigCard、RerankConfigCard）、`components/tabs/`（MemoriesTab、PlaygroundTab、EngineTab）、`hooks/`（useEngineStatus、useMemorySettings） |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge 儀表板頁面 — 伺服器卡片、9 張代理程式卡片、設定精靈、模型對應、略過清單。i18n PT-BR + EN。請參閱 `docs/frameworks/AGENTBRIDGE.md`。                                                                                                                                                                        |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector 儀表板頁面 — DevTools 分割檢視、7 個詳細資料分頁、4 個擷取模式切換開關、工作階段記錄器、情境著色。i18n PT-BR + EN。請參閱 `docs/frameworks/TRAFFIC_INSPECTOR.md`。                                                                                                                                   |
| `app/(dashboard)/dashboard/activity/`                                        | 活動動態頁面（群組 B）：`page.tsx`（伺服器端）+ `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — 請參閱 `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | 配額共享頁面（群組 B）：`QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | 提供者方案設定頁面（群組 B）：`page.tsx` + `ProviderPlanConfigClient.tsx` — 覆寫每個連線的配額維度                                                                                                                                                                                                                     |
| `app/docs/`                                                                  | 內嵌文件檢視器（呈現 `docs/*.md`）                                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | 行銷登陸頁面                                                                                                                                                                                                                                                                                                           |
| `app/login/`, `forgot-password/`, `forbidden/`                               | 驗證相關頁面                                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP 錯誤頁面                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | 靜態／狀態頁面                                                                                                                                                                                                                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | 根版面配置、首頁、PWA 資訊清單、全域 CSS                                                                                                                                                                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | 錯誤邊界                                                                                                                                                                                                                                                                                                               |

### `src/lib/` — 核心函式庫（約 50 個模組）

| 模組                                     | 用途                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A 協定任務管理器、技能（5 個）、串流                                                                                                                                                                                                                                                                        |
| `acp/`                                   | CLI 代理程式登錄檔（本機 CLI 探索——請參閱 `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`）                                                                                                                                                                                                                        |
| `api/`                                   | 共用 API 輔助工具（`requireManagementAuth`、驗證）                                                                                                                                                                                                                                                            |
| `auth/`                                  | 工作階段、密碼雜湊、權杖驗證                                                                                                                                                                                                                                                                                  |
| `batches/`                               | OpenAI Batches API 處理常式                                                                                                                                                                                                                                                                                   |
| `catalog/`                               | 提供者目錄 Zod 驗證 + 功能解析                                                                                                                                                                                                                                                                                |
| `cloudAgent/`                            | 雲端代理程式（Codex Cloud、Devin、Jules）——請參閱 `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                            |
| `combos/`                                | 組合解析 + 重新排序輔助工具                                                                                                                                                                                                                                                                                   |
| `audit/`                                 | 活動摘要輔助工具：`highLevelActions.ts`（允許清單 + `isHighLevelAction()`）、`activityIcons.ts`（動作 → 圖示／動詞對應表）、`timeline.ts`（groupByDay/relativeTime）——請參閱 `docs/architecture/MONITORING_SECTIONS.md`                                                                                       |
| `compliance/`                            | 稽核記錄 + 提供者稽核——請參閱 `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                   |
| `compression/`                           | 壓縮引擎黏合層（引擎位於 `open-sse/services/compression/`）                                                                                                                                                                                                                                                   |
| `config/`                                | 執行階段設定輔助工具                                                                                                                                                                                                                                                                                          |
| `db/`                                    | 120+ 個領域 DB 模組 + 168 個移轉（SQLite 一律透過此處存取）                                                                                                                                                                                                                                                   |
| `quota/`                                 | 配額共享引擎：`dimensions.ts`（類型/Zod）、`types.ts`（QuotaStore 介面）、`sqliteQuotaStore.ts`、`redisQuotaStore.ts`、`storeFactory.ts`、`fairShare.ts`、`burnRate.ts`、`planResolver.ts`、`planRegistry.ts`、`saturationSignals.ts`、`enforce.ts`、`spendRecorder.ts`——請參閱 `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar 免費模型目錄用戶端：`feedSchema.ts`、`pinnedKeys.ts`、`verify.ts`、`sync.ts`、`applyFeed.ts`、`index.ts`（`getRadarCatalog()`）— 請參閱 `docs/frameworks/RADAR.md`                                                                                                                                      |
| `display/`                               | UI 格式化輔助工具（成本、延遲等）                                                                                                                                                                                                                                                                             |
| `embeddings/`                            | Embeddings 服務輔助工具                                                                                                                                                                                                                                                                                       |
| `env/`                                   | 環境變數解析與驗證                                                                                                                                                                                                                                                                                            |
| `evals/`                                 | 評估框架（套件、執行器、執行階段）— 請參閱 `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                         |
| `guardrails/`                            | PII 遮罩器、提示詞注入防護、視覺橋接器 — 請參閱 `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                 |
| `jobs/`                                  | 背景工作（類似 cron）                                                                                                                                                                                                                                                                                         |
| `memory/`                                | 對話記憶（SQLite FTS5 + sqlite-vec 混合式 RRF + Qdrant 第二層）— 請參閱 `docs/frameworks/MEMORY.md`                                                                                                                                                                                                           |
| `memory/embedding/`                      | 多來源嵌入層：`index.ts`（解析器）、`remote.ts`、`staticPotion.ts`、`transformersLocal.ts`、`cache.ts`、`types.ts`（計畫 21）                                                                                                                                                                                 |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 包裝器 — KNN 暴力搜尋 + 混合式 RRF（FTS5 + 向量，k=60）。延遲初始化，當 sqlite-vec 不可用時可優雅降級。（計畫 21）                                                                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — 在背景處理 `needs_reindex=1` 的記憶；由 `POST /api/memory/reindex` 與延遲回填路徑呼叫。（計畫 21）                                                                                                                                                                                      |
| `monitoring/`                            | 健康狀態檢查、指標發送                                                                                                                                                                                                                                                                                        |
| `oauth/`                                 | 適用於 22 個提供者模組的 OAuth／匯入流程（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、zed-hosted、zed）                                         |
| `plugins/`                               | 外掛程式登錄檔                                                                                                                                                                                                                                                                                                |
| `promptCache/`                           | Anthropic 風格的提示詞快取中斷點                                                                                                                                                                                                                                                                              |
| `skills/`                                | Skills 框架（內建 + 市集 + SkillsSH）— 請參閱 `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                     |
| `playground/`                            | Playground Studio 共用輔助工具：`codeExport.ts`（curl/Python/TS 產生器）、`promptImprover.ts`（中繼提示詞建構器）、`streamMetrics.ts`（純 TTFT/TPS）、`types.ts`（定價表）— 請參閱 `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                     |
| `webhookDispatcher.ts`                   | HMAC webhook 傳送 — 請參閱 `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | 通道管理器 — 請參閱 `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                               |
| `cloudSync.ts`, `initCloudSync.ts`       | 選用的狀態雲端同步                                                                                                                                                                                                                                                                                            |
| `localDb.ts`                             | db 模組的重新匯出入口（無邏輯 — 僅重新匯出）                                                                                                                                                                                                                                                                  |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | 請求快取 + 冪等性                                                                                                                                                                                                                                                                                             |
| （約 30 個其他頂層檔案）                 | 專用輔助工具（logEnv、modelsDevSync、piiSanitizer 等）                                                                                                                                                                                                                                                        |

### `src/lib/db/` — 資料庫（147 個模組 + 208 個遷移）

| 子目錄                    | 用途                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | 使用 WAL 日誌模式的 `getDbInstance()` 單例                                                                                                                             |
| `db/migrations/`          | 具版本控制的 SQL 檔案（冪等、交易式）。`073_memory_vec.sql` 新增 `memory_vec_meta` + `needs_reindex` 欄位（計畫 21）。                                                 |
| `db/playgroundPresets.ts` | Playground Studio 預設集的 CRUD 模組（`listPlaygroundPresets`、`getPlaygroundPreset`、`createPlaygroundPreset`、`updatePlaygroundPreset`、`deletePlaygroundPreset`）   |
| `db/memoryVec.ts`         | `memory_vec_meta` 的 CRUD（active_dim、embedding_signature、last_reset_at、vec_loaded）+ `markMemoryNeedsReindex`、`getMemoryReindexQueue` 等（計畫 21）               |
| `db/<domain>.ts`          | 每個領域各一個模組：providers、combos、apiKeys、users、sessions、usage、audit*log、webhooks、skills、memory_entries、cloud_agent_tasks、evals*\*、reasoning_cache 等。 |

### `src/domain/`

| 模組                   | 用途                                        |
| ---------------------- | ------------------------------------------- |
| `policy.ts`            | 政策引擎                                    |
| `fallbackPolicy.ts`    | 備援決策樹                                  |
| `costRules.ts`         | 成本計算規則                                |
| `lockoutPolicy.ts`     | 模型／連線鎖定政策                          |
| `tagRouter.ts`         | 基於標籤的路由                              |
| `comboResolver.ts`     | 組合解析（供組合引擎使用）                  |
| `modelAvailability.ts` | 各模型可用性檢查                            |
| `assessment/`          | 模型評估（RFC-AUTO-ASSESSMENT 的第 1 階段） |

### `src/server/`

| 模組     | 用途                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `authz/` | 授權管線：`classify` → `policies` → `enforce` — 請參閱 `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS 設定                                                                                 |
| `auth/`  | 工作階段中介軟體                                                                          |

### `src/shared/`

| 模組                             | 用途                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `components/`                    | 儀表板元件 API：`packages/ui-kit` 的介接層 — 請參閱 `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`：畫面使用的圖示名稱 → Lucide 元件（`<Icon>`）                                 |
| `constants/providers.ts`         | 經 Zod 驗證的 **376 個提供者**（唯一真實來源）                                           |
| `constants/cliTools.ts`          | 外部 CLI 工具登錄檔                                                                      |
| `constants/routingStrategies.ts` | 具有優先順序的 **20 種路由策略**                                                         |
| `constants/publicApiRoutes.ts`   | 需要 Bearer 驗證（相對於管理驗證）的路由                                                 |
| `constants/upstreamHeaders.ts`   | 上游請求的標頭拒絕清單                                                                   |
| `validation/schemas.ts`          | 約 80 個 Zod 結構描述（API 合約的唯一真實來源）                                          |
| `validation/helpers.ts`          | Zod 驗證輔助函式（`validateBody` 等）                                                    |
| `types/`                         | 共用 TS 類型                                                                             |
| `contracts/`                     | 公開 API 合約（由 `package.json` 中的 `files:` 使用）                                    |
| `utils/circuitBreaker.ts`        | 提供者斷路器（請參閱 `docs/architecture/RESILIENCE_GUIDE.md`）                           |
| `utils/apiAuth.ts`               | API 金鑰驗證、範圍檢查                                                                   |
| `utils/fetchTimeout.ts`          | 上游擷取的逾時／中止包裝器                                                               |
| `utils/releaseNotes.ts`          | 已關閉的 v2／舊版公告剖析器、在地化及依 ID 忽略功能                                      |

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

## `docs/` — 公開文件（7 個根目錄檔案 + 17 個子目錄）

### 頂層指南

| 文件                        | 用途                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高階架構、子系統地圖、儀表板介面                                              |
| `CODEBASE_DOCUMENTATION.md` | 工程參考：目錄、模組、慣例                                                    |
| `FEATURES.md`               | 功能矩陣與 v3.8 重點                                                          |
| `USER_GUIDE.md`             | 終端使用者手冊（設定、模型、組合、CLI、音訊等）                               |
| `API_REFERENCE.md`          | API 端點參考與認證模型                                                        |
| `openapi.yaml`              | OpenAPI 3.0 規格（121 個路徑）                                                |
| `SETUP_GUIDE.md`            | 安裝方式（npm、npx、Docker、Electron、Termux、原始碼）                        |
| `ENVIRONMENT.md`            | 所有環境變數（約 800 個已記錄，`.env.example` 約 3,050 行）                   |
| `TROUBLESHOOTING.md`        | 常見錯誤 + v3.8.0 已知問題                                                    |
| `RELEASE_CHECKLIST.md`      | 完整發布流程（skills、husky、conventional commits、部署）                     |
| `COVERAGE_PLAN.md`          | 覆蓋率目標與目前狀態                                                          |
| `FREE_TIERS.md`             | 精選免費方案提供者（48+ 免費 + 11 個 OAuth）                                  |
| `CLI-TOOLS.md`              | 外部 CLI 整合 + 內部 OmniRoute CLI                                            |
| `I18N.md`                   | i18n 架構、新增語言、67 個地區設定                                            |
| `UNINSTALL.md`              | 完整解除安裝步驟                                                              |
| `PROVIDER_REFERENCE.md`     | **自動產生**的 376 個提供者目錄（重新產生：`npm run gen:provider-reference`） |

### 子系統深入探討

| 文件                                       | 用途                                                       |
| ------------------------------------------ | ---------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP 伺服器：110 個工具、3 種傳輸方式、33 個範圍、REST 端點 |
| `A2A-SERVER.md`                            | A2A v0.3：JSON-RPC、6 個技能、REST 輔助工具、代理卡片      |
| `AGENT_PROTOCOLS_GUIDE.md`                 | 統一指南：A2A vs ACP vs Cloud Agents                       |
| `CLOUD_AGENT.md`                           | Codex Cloud / Devin / Jules 協調編排                       |
| `SKILLS.md`                                | Skills 框架（內建 + 市集 + SkillsSH + 沙箱）               |
| `RADAR.md`                                 | Radar 免費模型目錄覆疊（`RADAR_ENABLED`，預設關閉）        |
| `MEMORY.md`                                | 記憶系統（SQLite FTS5 + Qdrant）                           |
| `EVALS.md`                                 | 評估框架（測試套件、執行、評分標準）                       |
| `GUARDRAILS.md`                            | PII 遮罩器、提示注入防護、視覺橋接                         |
| `COMPLIANCE.md`                            | 稽核日誌、資料保留、noLog 選擇退出                         |
| `WEBHOOKS.md`                              | HMAC 簽章的 webhook 遞送                                   |
| `REASONING_REPLAY.md`                      | `reasoning_content` 的混合記憶體/SQLite 快取               |
| `AUTHZ_GUIDE.md`                           | 授權管線（`classify` → `policies` → `enforce`）            |
| `RESILIENCE_GUIDE.md`                      | 斷路器 + 冷卻 + 模型鎖定                                   |
| `docs/security/STEALTH_GUIDE.md`（僅 git） | TLS 指紋識別（JA3/JA4）、Claude Code CCH、MITM 憑證        |
| `AUTO-COMBO.md`                            | Auto Combo 引擎（16 因子評分、6 個模式套件、虛擬工廠）     |

### 壓縮

| 文件                            | 用途                           |
| ------------------------------- | ------------------------------ |
| `COMPRESSION_GUIDE.md`          | 壓縮模式概覽 + 路線圖          |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK 引擎、註冊表契約 |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman 規則套件 JSON 結構描述 |
| `COMPRESSION_LANGUAGE_PACKS.md` | 各語言規則套件清單             |
| `RTK_COMPRESSION.md`            | RTK 宣告式管線（56 個篩選器）  |

### 部署

| 文件                         | 用途                                                            |
| ---------------------------- | --------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker 建置、設定檔（base/cli/host/cliproxyapi）、Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | 通用 VM/VPS 部署（Ubuntu/Debian + nginx + systemd）             |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io 部署（目前僅有中文版）                                   |
| `TERMUX_GUIDE.md`            | 透過 Termux 在 Android 上無頭運行                               |
| `PWA_GUIDE.md`               | 漸進式網頁應用程式（PWA）安裝 + service worker                  |
| `ELECTRON_GUIDE.md`          | 桌面應用程式建置 + 簽署 + 發佈                                  |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                          |
| `PROXY_GUIDE.md`             | 4 層出站代理 + 1proxy 市集                                      |

### 子目錄

| 子目錄                | 用途                                                                                                                                                                                         |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | 本地化文件翻譯（41 種語言）                                                                                                                                                                  |
| `docs/screenshots/`   | 指南使用的圖片資源                                                                                                                                                                           |
| `_tasks/superpowers/` | 來自 superpowers（`writing-plans`/`brainstorming`）的計畫/規格文件及研究資料 — 獨立隔離、單獨版本控制的儲存庫，已被主目錄樹 gitignore。請參閱 CLAUDE.md →「Planning & Research Artifacts」。 |

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
