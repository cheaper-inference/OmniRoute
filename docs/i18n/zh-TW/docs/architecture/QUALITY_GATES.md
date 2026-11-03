# Quality Gates Reference (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md)

---

本文件是 OmniRoute 中所有 CI 品質閘門的權威參考資料。
其中描述每個閘門、其驗證內容、執行所在的 CI 作業、是否使用
棘輪基準或通過／失敗政策，以及其會阻擋建置還是僅提供建議。

如需簡短摘要與允許清單政策，請參閱 `AGENTS.md` 中的「Quality Gates & Ratchets」章節。
如需同一套系統的關鍵評估、成熟度分類，以及與工具無關的
複製計畫，請參閱
[品質閘門實務手冊](../ops/QUALITY_GATE_PLAYBOOK.md)。

---

## Gate 清單與執行設定檔

### 候選項目納入

CI 與 Quality Gates 工作流程各自產生穩定的判定結果：`Gate / CI` 與
`Gate / Quality`。其具版本控管的納入政策會將每個上游工作列舉為必要或建議。
適用的必要工作必須成功：缺少、已取消、已跳過、等待中與未知結果都無法建立 PASS。
有效的僅文件或僅目錄分類可使程式碼通道不適用；草稿 PR 不會被接受為候選項目。
`hotfix` 標籤不會免除證據要求。

兩個工作流程涵蓋合併至 main/release 分支的 PR、推送至 `main`、手動派送與 merge-group
事件。推送、派送與 merge-group 會執行完整選取流程。推送至
`release/**` 不會啟動這些工作流程 (2026-10-18)：每項變更已在其 PR 上執行矩陣，
而合併後的組合則由 Release-Green 負責（`docs/ops/RUNNER_BOX.md` → Hosted lane）。
Fork 與 merge group 對於原本會選取自託管執行器的工作，會使用託管執行器；
在推出前必須確認有足夠的託管容量。

每份 JSON 收據都會識別已簽出的 SHA、工作流程執行與嘗試次數。
CLI 會拒絕 checkout/event SHA 不一致的情況。工作流程測試會將政策成員資格綁定至判定
工作中的 `needs` 清單，因此新增或移除的通道無法靜默消失。收據涵蓋其自身的工作流程，
不包含發佈、部署、或現有建議掃描器的內部內容。在分支規則中啟用這兩個檢查名稱
是另一項管理變更；新增這些工作本身並不會保護分支。

### 靜態掃描清單

具版本控管的 npm 別名清單與靜態掃描成員資格位於
`config/quality/gate-manifest.json`。執行 `npm run check:gate-manifest`，以根據
`package.json` 驗證指令碼名稱與確切命令；新增、移除與命令漂移都會使本機 hook
以及 CI 中的變更分類工作失敗。別名不是工作流程工作、矩陣執行個體或測試案例：
這些數量不得被當作可互換的項目呈現。

使用 `npm run quality:scan -- --list` 或 `npm run quality:scan:fast -- --list`
可在不執行的情況下檢視選取的別名。執行器會呼叫 npm 進入點，因此其執行環境
（包括設定中的 Bun）會獲得保留。清單會將不屬於這些設定檔的別名記錄為個別呼叫，
且唯讀掃描設定檔禁止使用維護命令。

這些設定檔僅涵蓋靜態掃描。它們不會核發產品測試、涵蓋率、封裝、外部檢查或候選項目
完整版本接受度的認證。工作流程納入會使用連結的
`config/quality/admission-policy.json` 與 `scripts/quality/admission-verdict.mjs`。
Release-observer 設定檔仍然分開；請個別檢查其適用的檢查與收據。下方的文字清單
是參考資料，不能證明某個閘門確實執行過。

指令碼位於 `scripts/check/`（政策閘門）與 `scripts/quality/`（遞增引擎）下。
CI 的唯一真實來源是 `.github/workflows/ci.yml`。

### Release PR 快速路徑 (`quality.yml`)

`.github/workflows/quality.yml` 在 main/release PR、推送至 `main`、
派送與 merge group 上補充 CI。PR 使用依路徑篩選的快速檢查。
永久停用的重複建置已移除；實際的建置／封裝／啟動檢查仍保留在 CI 中。

| 工作                                             | 範圍                                                                                                                         | 阻擋          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 文件／程式碼 PR；API 文件參照與 docs-all                                                                                     | 是            |
| `Fast Quality Gates`                             | 程式碼 PR；靜態檢查、類型檢查、儀表板類型檢查、受影響的單元測試                                                              | 是            |
| `Forgotten sibling tests`                        | 程式碼 PR；追蹤至靜態消費者與候選同儕測試的變更模組；barrel 與 dynamic-import 路徑會回報為建議診斷，並附有參照的允許清單例外 | **建議**      |
| `Vitest (fast-path)`                             | 程式碼 PR；快速 vitest 套件                                                                                                  | 是            |
| `Unit Tests fast-path`                           | 程式碼 PR；4 分片單元套件                                                                                                    | 是            |
| `No new ESLint warnings`                         | 程式碼 PR；考量抑制項目的 lint 防護                                                                                          | 是，包括 fork |
| `Merge integrity (changelog + generated skills)` | 非草稿 PR；變更日誌與產生的技能同步                                                                                          | 是，包括 fork |

#### Forgotten sibling tests 報告

`npm run check:forgotten-sibling-tests` 會重複使用測試影響對映背後的匯入解析器。
對每個變更的正式環境模組，當候選測試未出現在 pull request 差異中時，它會回報具決定性的
`changed module/symbol -> static consumer -> candidate sibling test` 鏈結。Markdown 摘要與
JSON 結果會保留為 `forgotten-sibling-tests` 工作流程成品，以便在任何阻擋式部署前進行校準。

Barrel 重新匯出與動態匯入僅用於解析診斷；它們絕不會建立阻擋式發現結果。經審查的例外位於
`config/quality/forgotten-sibling-allowlist.json`。每個項目都必須指定消費者與候選測試、提供具體的
理由，並連結至 GitHub issue 或 pull request。格式錯誤的項目會以故障關閉。例外無法抑制已刪除的候選測試，或新增 `.skip`/`.todo` 的差異；
弱化 assertion 及其他遮蔽行為則由獨立且具阻擋作用的
`check:test-masking` 閘門負責。

### 工作：`lint`

每次對 `main` 提出 PR 時執行。失敗時會阻擋合併。

| Script (`npm run ...`)            | 驗證                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 阻擋                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js 版本在支援範圍內                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:cycles`                    | 所有 `src/` + `open-sse/` 中的循環匯入（以 AST 為基礎，解析 tsconfig `paths`）。只要存在任何循環，Bare 就會一律以 1 結束（自 #15281 起採取失敗關閉策略），並列出 SCC。`check:cycles:ratchet`（CI 執行的項目）會在數量超過 `quality-baseline.json` 中 `metrics.cycles` 的上限時阻擋——目前為 14，`direction: down`，因此只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                   | 是（ratchet）                           |
| `check:boundary`                  | `open-sse → src` 耦合：引擎匯入應用程式的檔案對檔案唯一匯入（`scripts/quality/measure-boundary.mjs`；邊列表是 v4 核心／模組拆分修復待辦清單）。Bare = 諮詢性報告（與 `quality:boundary` 相同）。`check:boundary:ratchet`（CI 執行的項目，也包含在 `quality.yml` fast-gates ratchet 迴圈中）會在數量超過 `quality-baseline.json` 中 `metrics.boundaryOpenSseToSrc` 的上限時阻擋——以測得的 771 為基準，`direction: down`；`--update` 只能降低此上限；PR 採用相對於基準的比較（`--base-ref`，請參閱下文）                                                                                                                                                               | 是（ratchet）                           |
| `check:route-validation:t06`      | 所有路由上都存在 Zod 結構描述（Tier 6 政策）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` 計數不超過預算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是                                      |
| `check:provider-consistency`      | `providers.ts` 中的每個 provider 都有 `providerRegistry.ts` 中的對應項目（反之亦然，限於允許清單內）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:model-lifecycle`           | 三個手動維護的路由表與已提交的生命週期快照（#11503）保持一致：`FITNESS_TABLE`（`taskFitness.ts`）不會為 `REGISTRY` 能夠路由的已退役 id 評分；每個 `BUILT_IN_ALIASES` 目標都存在於 `REGISTRY` 中，且不在已退役 id 快照內；`REGISTRY` 中仍存在的每個已退役 id 都會被轉送，或列於 `allowedRetiredInCatalog`；此外，`DEFAULT_DEGRADATION_MAP` 的來源或目標都不會出現在該快照的已退役項目中。這無法證明某個模型目前由有效的上游服務提供。離線執行——會比對 `config/quality/model-lifecycle.json`，該檔案由手動執行 `npm run quality:refresh-model-lifecycle` 更新（需要網路；未接入 CI）。`allowedRetiredInCatalog` 是一項逐步清除的閘門：只有在有追蹤議題時才能新增項目。 | 是                                      |
| `check:fetch-targets`             | 用戶端 `src/` 中的每個 `fetch("/api/...")` 都會解析至實際存在的 `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:deps`                      | 儲存庫中每個 `package.json` 內所有可透過 `npm install` 安裝的相依套件，都列於 `dependency-allowlist.json` 中；新的未釘選版本或 slopsquatted 套件會被標記                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `audit:deps`                      | `npm audit`（root + electron）——不得有高風險／嚴重性安全公告（與 osv `check:vuln-ratchet` 重疊；請參閱 Rationalization Backlog）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是                                      |
| `check:lockfile`                  | `package-lock.json` 完整性 — https 登錄、完整性雜湊、不得有主機覆寫                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:licenses`                  | 生產環境相依套件的 SPDX 授權許可清單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:tracked-artifacts`         | 不得有建置產物／已提交的 `node_modules` 符號連結（也會在 husky pre-commit 中執行；pre-push 特意維持精簡 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:ai-attribution`            | PR 提交、標題或本文中不得有 AI／機器人的 `Co-Authored-By` trailer 或 AI 生成頁尾 — 硬性規則 #16（位於 PR→`release/**` 的 `quality.yml` fast-gates 迴圈中 — 讀取事件 payload，在非 PR 情況下不執行 — 以及 `ci.yml` lint 中僅限 PR→`main` 的步驟；同時也是 husky `commit-msg` hook；允許人類共同作者；#14436）                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | 每個 Vitest 排除項目都必須指定追蹤議題，並出現在 `config/quality/vitest-exclusions.json` 中（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是                                      |
| `check:file-size`                 | 來源檔案（`src/`、`open-sse/`、`electron/`、`bin/` 中的 `.ts`／`.tsx`）必須維持在 `cap` 以內，測試檔案（`*.test.ts(x)`）必須維持在 `testCap` 以內；在 `file-size-baseline.json` 中凍結的檔案（`frozen`／`testFrozen`）不得超過其記錄的大小                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:error-helper`              | 執行器/處理常式中的錯誤回應使用 `buildErrorBody()` / `sanitizeErrorMessage()`（硬性規則 #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:migration-numbering`       | Migration SQL 檔案皆依序編號，不得有缺號或重複                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是                                      |
| `check:public-creds`              | 除了 `publicCreds.ts` 外，不得有字面值 OAuth `client_id`/`client_secret` 或 Firebase Web 金鑰（硬性規則 #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:db-rules`                  | `src/lib/db/` 模組以外不得有原始 SQL；不得從 `localDb.ts` 使用彙總匯入（硬性規則 #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:known-symbols`             | 在其分派表中註冊的提供者執行器、路由策略和轉譯器，必須與磁碟上的檔案相符 — 不得有孤立或未宣告的符號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:route-guard-membership`    | 每個會產生子程序的路由，都必須透過 `isLocalOnlyPath()` 進行分類（硬性規則 #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:test-discovery`            | 儲存庫中的每個 `*.test.ts` / `*.spec.ts` 檔案至少由一個測試執行器收集（遞減限制：`test-discovery-baseline.json` 中的孤立清單只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:test-tla-order`            | `tests/unit` 下沒有任何 `node:test` 檔案在註冊測試、觸發頂層 `await` 後又註冊更多測試（#18045；遞減限制：`test-tla-order-allowlist.json` 只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:agent-skills-sync`         | 產生的 agent-skills 成品與其來源目錄相符（無差異）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Provider 標誌／資產都包含已記錄的來源資訊                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON 設定檔可解析，且符合儲存庫的 lint 規則                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript 編譯無錯誤（僅提供建議性警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是                                      |
| `typecheck:noimplicit:core`       | 嚴格的 `noImplicitAny` — 面向未來；許多既有呼叫端仍需要加上類型註解                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **建議性**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | 將 `tsc` 限定於 `src/app/(dashboard)/**` (#7033) — `typecheck:core` 精選的 27 個檔案允許清單不包含任何 dashboard TSX，而 `next build` 也完全不會對其進行類型檢查（`next.config.mjs` 設定了 `ignoreBuildErrors: true`），因此其中孤立識別碼的回歸問題 (#6625/#6909) 在 CI 中都無法被發現。與凍結的逐檔案／逐 TS 程式碼計數基準（`config/quality/dashboard-typecheck-baseline.json`，採用與 `check:known-symbols` 相同的過時強制執行模式）進行差異比對 — 只有超出基準計數的新增錯誤會使閘門失敗；修復既有錯誤後，使用 `--update` 將基準值調低。                                                                                                                        | 是                                      |

### 工作：`quality-gate`

在 `test-coverage` 之後執行。失敗時阻止合併。

| 指令                         | 驗證內容                                                                                                                                | 是否阻擋                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | 輸出 `quality-metrics.json`（ESLint 警告數量、合併分片報告中的涵蓋率）                                                                  | 是（ratchet 的上游步驟） |
| `quality:ratchet`            | `quality-baseline.json` 中的每項指標均未回歸（ESLint 警告 ≤ 基準值；涵蓋率 ≥ 基準值）                                                   | 是                       |
| `check:duplication`          | 程式碼重複率（jscpd@4）不超過 `quality-baseline.json` 中的基準值                                                                        | 是                       |
| `check:complexity`           | 檔案層級的圈複雜度不超過上限（核心 ESLint `complexity` + `max-lines-per-function`）                                                     | 是                       |
| `check:cognitive-complexity` | 認知複雜度 ratchet（`eslint-plugin-sonarjs`）— 獨立的 ESLint 傳遞；CI 會將兩者合併為單一的 `check:complexity-ratchets` 步驟             | 是                       |
| `check:dead-code`            | 未使用的匯出／檔案 ratchet（knip）相較於基準值沒有回歸                                                                                  | 是                       |
| `check:compression-budget`   | 壓縮基準測試預算 — 各引擎的 token 節省下限不得回歸                                                                                      | 是                       |
| `check:type-coverage`        | 類型涵蓋率 ratchet（`type-coverage`）沒有回歸；大致上涵蓋 `typecheck:noimplicit:core`                                                   | 是                       |
| `check:codeql-ratchet`       | 開啟中的 CodeQL 警示數量沒有回歸（透過 `gh api` 讀取；沒有 token 時會正常略過）— 更新週期與手動觸發方式：請參閱下方的「CodeQL ratchet」 | 是                       |

### 工作：`quality-extended`

整個工作皆為建議性質（`continue-on-error: true`）。以 npm 為基礎的 ratchet 會實際執行；外部掃描器透過 `gh release download` 安裝，若仍缺少二進位檔則自行略過（結束碼為 0）。

| 指令                     | 驗證內容                                                                                                                                                        | 是否阻擋                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | 沒有循環相依性（dpdm）                                                                                                                                          | **建議性**                                |
| `check:bundle-size`      | Bundle 大小不超過上限                                                                                                                                           | **建議性**                                |
| `check:secrets`          | 秘密掃描（gitleaks）— 若缺少二進位檔則略過                                                                                                                      | **建議性**                                |
| `check:vuln-ratchet`     | 相依性漏洞（osv-scanner）沒有回歸 — 若缺少二進位檔則略過                                                                                                        | **建議性**                                |
| `check:workflows`        | 工作流程 lint（actionlint + zizmor）；缺少／損壞的掃描器、無效報告或缺少 ratchet 基準時，會以 INCOMPLETE 失敗。有效的發現會遵循所選的嚴格／建議性／ratchet 政策 | 執行為必要；zizmor ratchet 在 CI 中會阻擋 |
| `check:openapi-breaking` | 相較於基礎分支，公開 API 契約（`openapi.yaml`）的重大變更（oasdiff）— 輸出 `openapiBreaking=N`；若缺少 oasdiff 或無法解析基礎規格則略過                         | **建議性**                                |

### 工作：`docs-sync-strict`

在每個對 `main` 的 PR 上執行。失敗時阻止合併。

| Script                         | 驗證內容                                                                                                                        | 阻擋                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 依序執行下方 6 個子閘門的總閘門                                                                                                 | 是                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt 版本一致性                                                                                        | 是                         |
| ↳ `check:docs-counts`          | 散文中的計數（提供者數量、遷移數量等）在實際計數的調整窗口內                                                                    | 是                         |
| ↳ `check:env-doc-sync`         | `.env.example` 中的每個環境變數都記錄在文件表格中，反之亦然                                                                     | 是                         |
| ↳ `check:deprecated-versions`  | 文件中不得有已棄用的版本字串                                                                                                    | 是                         |
| ↳ `check:doc-links`            | 文件中的內部 Markdown 連結解析至實際檔案（`[text]`/`(path)` 形式）                                                              | 是                         |
| ↳ `check:fabricated-docs`      | 文件中引用的路由、環境變數、CLI 命令、hook 名稱和檔案路徑都存在於程式碼庫中。透過 `--strict` 實施硬性閘門；沒有旗標時則軟失敗。 | 是（CI 中透過 `--strict`） |
| `check:cli-i18n`               | CLI 命令字串存在於所有 i18n 語系檔案中                                                                                          | 是                         |
| `check:openapi-coverage`       | OpenAPI 規格涵蓋至少達到調整後下限的實際路由                                                                                    | 是                         |
| `check:openapi-security-tiers` | `openapi.yaml` 中的安全層級註解與 `routeGuard.ts` 分類一致                                                                      | **建議性**                 |
| `check:openapi-routes`         | `openapi.yaml` 中的每個路徑都解析至實際的 `route.ts`（防止幻覺）                                                                | 是                         |
| `check:docs-symbols`           | `docs/**/*.md` 中的每個 `/api/...` 參照都解析至實際的 `route.ts`（防止幻覺）                                                    | 是                         |
| `i18n translation drift`       | i18n 語系檔案中的未翻譯金鑰 — 僅警告                                                                                            | **建議性**                 |

`docs/diagrams/` 下的十二個 README SVG 是產生的（`scripts/docs/gen-readme-<name>.mjs`；`npm run docs:readme-diagrams` 會重新產生全部檔案）。每個檔案都有一個位元組比較單元測試（`tests/unit/docs/readme-*-svg.test.ts`，工作 `test-unit`），當已提交的檔案過時時會失敗；而 `check:docs-counts` 會從其 `<text>` 節點讀取標準數字——這也是為什麼描邊步驟會將每個描邊後的字串以不可見 `<text>` 保留在檔案中。SVG 標準數字檢查會讀取 `SVG_DIAGRAM_FILES`（`scripts/check/check-docs-counts-sync.mjs`）中列出的檔案：`docs/diagrams/readme-hero.svg`、`free-tier-budget.svg`、`promise-pillars.svg`、`comparison-table.svg`、`cli-terminal.svg`、`tier-cascade.svg`，以及 `public/images/tier-flow-dark.svg` 和 `tier-flow-light.svg`；`free-forever`、`catalog-entry`、`recurring-pool` 和 `scoring-factors` 宣稱也會讀取 `promise-pillars.svg`、`free-tier-budget.svg` 和 `strategies-grid.svg`。`free-tier-budget.svg` 從即時 catalog 載入器取得其數值，因此變更 `FREE_MODEL_BUDGETS` 或提供者顯示名稱會使 CI 變紅，直到該檔案重新產生為止。

### 工作：`i18n-ui-coverage`

| Script                           | 驗證內容                                                                                                                                          | 阻擋       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage`（內嵌） | UI i18n 金鑰涵蓋率 ≥ 65%                                                                                                                          | 是         |
| `check-ui-value-drift`（內嵌）   | 重寫的英文 **值** 不會留下過時的翻譯                                                                                                              | 是         |
| `check-new-key-coverage`（內嵌） | **新**英文金鑰已在每個語系中翻譯 — `__MISSING__:` 標記會被拒絕                                                                                    | 是         |
| `check-translation-ratio`        | 每個語系的實際翻譯比例（與英文相同／佔位符／缺失的項目，不包括允許清單中的項目）不得超過 `config/quality/i18n-translation-baseline.json` + 寬限值 | **建議性** |

需要 `fetch-depth: 0` — 值差異閘門會將 `en.json` 與合併基準進行差異比較。

#### `check-ui-value-drift` — 過時翻譯閘門

捕捉到其他結構上無法看見的那個 i18n 回歸問題：英文值被改寫，而從 _先前_ 英文衍生出的翻譯卻留在原處，因此非英文使用者會持續閱讀措辭看似可信、實際上卻已錯誤的內容。

這確實已經發布到正式環境。`oauthModal.googleOAuthWarning` 在 Antigravity 登入輔助程式加入時被重寫（#5203）；**43 個語系中有 39 個**仍保留著告訴操作人員「複製完整 URL 並貼到下方」的文字——但該流程對這個提供者根本無法完成。直到 #8463 才被注意到，原因是：

- `sync-ui-keys` 只會補回**不存在**的金鑰，不會處理已經**過時**的金鑰；
- `check-ui-keys-coverage` 計算的是金鑰的 _存在_，因此過時的翻譯仍會被視為已涵蓋；
- `check-translation-drift` 追蹤的是 `docs/i18n/<locale>/**.md` 文件鏡像——它完全不會讀取 `src/i18n/messages/*.json`。自 2026-09 重新同步以來，`docs-sync-strict` 工作中的阻擋規則：編輯核心文件 → `npm run i18n:run -- --files=<doc>`（區段層級，成本低）。

**依差異判定，而非依基準判定。** 它會比較合併基準點中的 `en.json` 與工作樹；對於每個英文值有所變更的金鑰，任何仍保留未修改翻譯的語系都會被視為過時。這會刻意**凍結既有的欠債**——差異無法揭示長期存在的翻譯是源自哪個舊英文版本，因此此閘門只會判定目前變更所觸及的內容。另一種做法（每個金鑰使用雜湊基準）會需要一個約 600 KB 的產生檔案，是現有最大基準檔的 3 倍，且每個 i18n PR 都會造成變動。

有兩種方式可以符合要求：

1. 更新受影響的翻譯，或
2. 將其設為 `__MISSING__:<new english>` — 執行階段接著會提供修正後的英文（`src/i18n/request.ts::deepMergeFallback`、#7258），而該金鑰會進入翻譯佇列。

如果字串的**意義**已經改變，請優先**重新命名金鑰**：新的金鑰不可能繼承過時的翻譯。#8463 採用的就是這種模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

當無法讀取基準目錄（沒有基準 ref 的淺層複製）時，會以 `SKIP reason=base-unresolved` 結束並回傳 0，這與 `check-openapi-breaking` 的行為一致。

### 工作：`i18n`

完整的 i18n 驗證矩陣（每個語系一個工作）。整個工作僅供參考。

| Script                          | Validates                           | Blocking                                             |
| ------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | Translation completeness per locale | **非阻擋**（整個工作設有 `continue-on-error: true`） |

### 工作：`pr-test-policy`

僅在提取要求上執行。

| Script                 | Validates                                                                                                | Blocking |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中正式環境程式碼的 PR，必須包含或更新測試（硬性規則 #8） | 是       |
| `check:test-masking`   | 變更後的測試檔案不會減少淨斷言數量，也不會加入 `assert.ok(true)` 同語反覆                                | 是       |
| `check:pr-evidence`    | PR 內容引用變更的測試/VPS 證據（透過搜尋 PR 文字將硬性規則 #18 機械化——較脆弱，請參閱待辦事項）          | 是       |

### 工作：`test-vitest`

在 `build` 之後執行。失敗時會阻擋合併。

| Suite            | Validates                                                 | Blocking                                                             |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| `test:vitest`    | MCP 伺服器（110 個工具）、autoCombo、快取 — vitest runner | 是                                                                   |
| `test:vitest:ui` | UI 元件測試 — vitest runner                               | **阻擋** — `vitest.config.ts` 明確排除既有失敗；新的失敗會使工作失敗 |

### 每夜工作流程（排程執行，僅供參考）

這些工作會依 cron 排程（以及 `workflow_dispatch`）執行，永遠不會在 PR 上執行。全部僅供參考。

| Workflow               | 驗證                                                                                                                                     | 阻擋       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | 使用隨機種子與高執行次數進行 fast-check 屬性測試                                                                                         | **建議性** |
| `nightly-resilience`   | 堆積成長閘門、混沌故障注入、k6 負載／浸泡測試                                                                                            | **建議性** |
| `nightly-llm-security` | promptfoo 注入防護（封鎖模式）＋ garak 探測（沒有提供者密鑰時跳過）                                                                      | **建議性** |
| `nightly-schemathesis` | 使用 `docs/openapi.yaml`，針對執行中的 OmniRoute 進行 OpenAPI 合約模糊測試（schemathesis）—揭露規格違規／未處理的 500 錯誤（階段 8 B.4） | **建議性** |
| `nightly-mutation`     | 在快速單元測試流程中計算 Stryker 變異測試分數 — 存活的變異體會揭露薄弱的 assert                                                          | **建議性** |
| `nightly-compat`       | 跨受支援的 `engines.node` 範圍進行 Node 引擎相容性矩陣測試                                                                               | **建議性** |

效能基準（堆積、TTFB、建置時間）會予以記錄，但不會設為閘門：請參閱 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）。

---

## 速度階段（2026-08-30 → v4.0 LTS）：所有基準放寬 20%

負責人決定（2026-08-30）：在 v4.0 模組化完成之前，交付速度比守住技術債界線更重要。所有**數值型**棘輪基準均在一次可稽核的作業中放寬 20%，且此階段已在 `config/quality/quality-baseline.json` 中宣告：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 變更內容                                                                                                                                               | 位置                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 越低越好的計數 ×1.2，越高越好的百分比 ÷1.2（涵蓋率下限維持 60、`eslintErrors` 維持 0、`eslintWarnings` 由 0 → 凍結抑制數量的 20%） | `quality-baseline.json`（`_relax_velocity_2026_08_30` 註記列出每一項變更前 → 變更後）                  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                       | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`，以及每個 `frozen[*]` / `testFrozen[*]` 行數上限 ×1.2                                                                                 | `file-size-baseline.json`                                                                              |
| 每個檔案／每個 TS 程式碼的計數 ×1.2                                                                                                                    | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| 當 `_policy.requireTighten === false` 時，`--require-tighten` 改為僅提供建議                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 暫停每晚執行的 `bank-ratchet-shrinks`（它會記存實測縮減量，抵銷預留空間）                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

允許清單（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`，
……）**不是**預算，因此未進行修改。通過／失敗政策閘門（機密資訊、SQL 規則、
文件／環境合約、i18n 一致性、單元測試）維持不變——紅燈測試依然是紅燈測試。

**工具**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 一次性
  放寬作業（`scripts/quality/relax-baselines.mjs`）；若使用相同註記重複執行，將拒絕執行。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  以與 CI 相同的方式測量每個數值型閘門，並列印各閘門的剩餘空間
  （`scripts/quality/baseline-headroom.mjs`）。每晚執行的 `baseline-headroom` 工作會在
  工作流程執行摘要中發布表格，並將其 JSON/Markdown 報告以
  `baseline-headroom-<run_id>` 名稱上傳，保留 90 天。警告與嚴重狀態列會指出距離上限
  不到 10% 或已超過上限的閘門。請檢閱這些報告，將其作為預算逐漸被消耗的早期警示；
  並檢查違規閘門的 `_rebaseline_*` 註記。此工作不再建立或更新永久議題；
  #12149 保留了先前的報告歷史。

**新程式碼模式（Clean-as-You-Code）— 自 2026-08-30 起，僅適用於 PR 快速路徑**

在 `pull_request` 事件中，`quality.yml` 會將 `--base-ref <PR base SHA>` 傳遞給
`check:file-size`、`check:complexity-ratchets` 及 `check:dead-code`。對於
`check:complexity-ratchets` 與 `check:dead-code`，閘門會比較 HEAD 與合併基準，
但**僅限於 PR 所修改的檔案**（`scripts/check/newCodeMode.mjs`：合併基準會具體化至
一次性的 `git worktree` 中，ESLint/knip 會分別在該處與 HEAD 上執行，再對每個檔案的計數取差異）：

- **阻擋性** — PR 在其修改的檔案中新增了循環／認知複雜度違規或無效匯出
  （記錄中的 `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）；
- **建議性** — 全域總數與凍結基準的比較。繼承而來的偏移永遠不會讓無辜的 PR 變紅；
  該偏移會在發行協調時重新凍結，並由預留空間工作監控。

`check:file-size` 依照自身規則使用基準參照（`scripts/check/check-file-size.mjs`，#8522）：
它會檢查樹狀結構中的每個原始碼與測試檔案，使用 `git show` 讀取各檔案在 PR 基準上的行數，
並且只有當檔案增長超過以下兩者中的較大值時才判定失敗：其基準上限
（`frozen` / `testFrozen`；若檔案不在基準中，則為 `cap` / `testCap`）與其基準大小。
因此，已在基準分支上發生偏移的檔案，永遠不會讓無辜的 PR 變紅。

`check:boundary:ratchet` 會將相同規則套用至其單一數值
（`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`）：在 PR 事件中，
`quality.yml` 快速閘門與 `ci.yml` lint 工作都會傳入 PR 的基準 SHA，基準提交會從
`git archive` 匯出內容中進行測量，而只有在 PR 的 `open-sse → src` 邊界數量超過
`metrics.boundaryOpenSseToSrc` 與基準分支計數兩者中的較大值時，PR 才會失敗。超過上限
的基準漂移會被回報（`base drift herdado`），但絕不會讓無辜的 PR 變紅；push → main
會繼續採用絕對上限，而無法解析的基準 SHA 則會在發出警告後回退至該上限。

`workflow_dispatch` 執行、release-green 全面掃描與每夜 headroom 工作都沒有 PR 基準，
因此會繼續採用絕對（全域）比較。目前，覆蓋率、重複程式碼與類型覆蓋率仍維持全域
比較（其工具無法以低成本產生逐檔差異）——它們是未來採用相同處理方式的候選項目。

**在 v4.0 結束此階段（LTS = 比以前更嚴格，而非「恢復正常」）**

1. 在純淨的 `release/v4.0.0` 頂端：執行 `npm run quality:headroom --json` 以留存記錄，接著執行
   `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`，以及每個 typecheck 閘門的
   `--update`——每個基準值都會降至測量值。
2. 從 `quality-baseline.json` 刪除 `_policy`（重新啟用 `--require-tighten` 與每夜
   累積機制），並在 `check-openapi-coverage.mjs` 中還原 `THRESHOLD = 36`（或更高）。
3. 在模組化已產生效益之處，進一步收緊至低於測量值：將檔案大小的 `cap` 恢復為 1000
   （或 800）、覆蓋率下限提高 5、已模組化套件的無用匯出數設為 0。

## 棘輪基準線 (`quality-baseline.json`)

棘輪引擎 (`scripts/quality/check-quality-ratchet.mjs`) 會讀取 `quality-baseline.json`
並將其與最新收集的 `quality-metrics.json` 比較。任何退步幅度超過其 epsilon 的指標
都會導致建置失敗。

目前追蹤的指標：

| 指標                  | 方向   | 含義                    |
| --------------------- | ------ | ----------------------- |
| `eslintWarnings`      | `down` | ESLint 警告數量不得增加 |
| `coverage.statements` | `up`   | 陳述式覆蓋率不得下降    |
| `coverage.lines`      | `up`   | 行覆蓋率不得下降        |
| `coverage.functions`  | `up`   | 函式覆蓋率不得下降      |
| `coverage.branches`   | `up`   | 分支覆蓋率不得下降      |

在指標確實改善後更新基準線：

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 旗標會將目前測得的值寫入 `quality-baseline.json`。
請將此檔案與改善該指標的變更一併提交。如果 PR 改善了
指標卻未更新基準線，`--require-tighten` 將會偵測到此情況（階段 6A.5，
尚待實作）。

### CodeQL 棘輪：重新整理頻率與手動觸發

`check:codeql-ratchet` 讀取的是**依排程重新整理的儲存庫狀態，而非每個 PR 的狀態。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` 會回報
`state: configured`、`schedule: weekly`：這是 GitHub 的預設設定掃描，而非每次推送時
執行的分析。其後果是：當修正警示的 PR 合併後，棘輪仍會繼續讀取
舊的較高數量，直到下一次排程掃描執行為止——因此，在掃描結果更新之前，
每個開啟中的 PR 都會被回報為退步，包括修正該問題之 PR 自身的後續變更。

**手動重新整理**：`gh workflow run codeql.yml --ref release/vX.Y.Z` 會重新執行
分析，並在幾分鐘內重新發布警示。請先閱讀 `.github/workflows/codeql.yml`
——其標頭說明它僅支援 `workflow_dispatch`，**因為它會與
GitHub 的「預設設定」衝突**（`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`）。若要還原 `push`/`pull_request`/
`schedule` 觸發條件，**擁有者必須先執行一項操作**：Settings → Code security →
CodeQL: Default → Advanced。在完成該切換之前，請勿新增 `schedule:` 觸發條件——它
只會產生失敗的執行結果。

**在數量下降後收緊基準線**——`node scripts/check/check-codeql-ratchet.mjs
--update` 會將新測得的數量寫入 `quality-baseline.json` →
`metrics.codeqlAlerts.value`，如此一來，棘輪便不會悄悄允許數量回升至
舊的上限。實際範例（2026-09-02/03）：PR #12502 修正了 7 個真實警示
（測得的開啟中警示由 13 降至 6）；PR #12530 將凍結的基準線從 11 收緊至 6，使其相符；
接著，剩餘的 6 個警示均附上個別理由予以駁回，使開啟中的警示數降至 0。

**是否駁回由操作者決定（硬性規則 #14）**——絕不可在未於駁回註解中
記錄技術理由的情況下駁回 CodeQL 警示：若是上游通訊協定要求，使用 `won't fix`；
若是測試固定資料，使用 `used in tests`；若是 CodeQL 無法辨識的清理程式，
使用 `false positive`（先例：`docs/security/ERROR_SANITIZATION.md`）。

---

## 測試重試政策（WS5.4, v3.8.49）

重試是針對各個 runner 設定，絕不能全域套用——全面重試會將真正的迴歸
轉變成無法察覺的不穩定現象：

| Runner                | 政策                                                                                       | 原因                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Playwright (e2e)      | 僅在 CI 中設定 `retries: 1`，並搭配 `trace: on-first-retry`                                | 瀏覽器／網路時序確實具有非決定性；一次附帶 trace 的重試能將不穩定現象轉化為可診斷的產物 |
| Vitest                | 不設全域重試。經證實不穩定的測試會明確設定個別測試重試（可在 diff 中看見，並於 PR 中審查） | 將隔離清單保留在 repo 中，絕不使其不透明                                                |
| node:test（單元測試） | 絕不重試                                                                                   | 不穩定的單元測試就是測試本身的錯誤——修正它，不要靠重新執行碰運氣                        |

不穩定性遙測上線後的目標 SLO（WS5.2/5.3）：每項測試的不穩定率 <1%
（「立即修正」門檻），每條 pipeline 的通過率 ≥95%。這些是業界參考值——
請依據我們自己的測量結果重新校準。

## 發布層級的棘輪漂移（WS5.5, v3.8.49）

當棘輪（檔案大小、複雜度、eslint 警告）在純粹的發布
tip 上發生迴歸——亦即多次合併的組合導致迴歸，但沒有任何單一 PR 能在其自身分支上重現
該迴歸——則應由**發布負責人一次性地在發布分支上**修正：優先採用抽取／重構；只有在附有已記錄的
理由條目時才能重新建立基準。絕不可將組合漂移推給貢獻者的 PR，也絕不可
針對每個 PR 重新建立基準（那會掩蓋真正的迴歸）。請先加以判別：在認定是你的 PR 導致問題之前，
先於探測用 worktree 中，針對純粹的 tip 重現紅燈狀態。

## 將棘輪縮減存入基準——向下調整方向（#8584）

棘輪只有一半是自動化的，而且還是錯的那一半。**提高**上限只需手動編輯
JSON，十秒即可完成，也是解除紅燈 PR 阻塞最快的方法。
**降低**上限則需要有人執行 `--update` 並提交結果——而在
`bank-ratchet-shrinks` job 上線之前，沒有任何 workflow 會執行這項操作。實測結果
（2026-07-25）：有 18 個凍結檔案已經等於或低於新檔案的 800 行上限，其中最嚴重的
差距達 132 倍（`src/shared/validation/schemas.ts`，僅 19 行卻保留 2,523 的上限）；
複雜度上限在約 37 則重新建立基準的註記中從 `1794 → 2169`，且恰好只有一次
下降（−1）；而「下一個週期透過 `--update` 收緊」這句話寫了 31 次，卻只落實
一次。若上限比當初使其合理的程式碼存續得更久，就會悄無聲息地將每次已完成的
拆分成果，轉化為下一位編輯該檔案者可使用的成長額度。

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** 補上了這個循環：

|          |                                                                                              |
| -------- | -------------------------------------------------------------------------------------------- |
| 執行時機 | `schedule`（每日 3 次）+ `workflow_dispatch`——刻意**不**使用 `push`                          |
| 測量對象 | 最高版本的 `release/vX.Y.Z`，使用與 `release-green` 相同的解析方式與注入防護                 |
| 寫入內容 | `check:file-size --update` 與 `check:complexity-ratchets --update`（兩者的設計都只允許縮減） |
| 驗證方式 | `npm run check:ratchet-bank`（`scripts/quality/verify-ratchet-bank.mjs`）                    |
| 交付方式 | 一個永遠保持最新、以發布分支為目標的 PR——強制更新，絕不重複洗版                              |

基準存入採批次進行，而不是每次 push 都執行，因為它沒有延遲要求（在 8 小時內
存入縮減結果即可）；若每次合併都執行，則會在合併作業期間反覆重建 PR 分支，
並且每次都要支付完整 ESLint 掃描的成本。偵測仍在 push 時進行
（`release-green`）；只有基準存入採批次處理。

### 安全驗證器

該 job 會在無人監督的情況下寫入基準，因此 `verify-ratchet-bank.mjs` 是讓這項操作
可接受的關鍵。它會比較執行 `--update` 後的 tree 與 `HEAD`，並且在產生任何 commit
之前**中止該 job**——不開啟任何 PR——除非每項變更都屬於以下其中之一：

- `frozen` / `testFrozen` 數值條目被**降低**或**移除**
- `complexity-baseline.json` → `count` **降低**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **降低**

其他任何情況都會失敗：提高數值、新增條目、變更 `cap`/`testCap`，或
刪除／改寫 `_rebaseline_*` 註記（這些註記是記錄每個上限存在原因的稽核軌跡，
並與檔案條目一起儲存在同一個 `frozen` 物件中）。
能夠提高上限的 bot，會比現狀更加糟糕。迴歸防護：
`tests/unit/verify-ratchet-bank.test.ts`。

該 job 絕不會 push 至 `release/*`——PR 必須由人員合併，因此錯誤的測量結果
無法在未經審查的情況下進入分支。

## 允許清單政策

所有不能因既有違規而失敗的關卡都會使用凍結的允許清單
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。政策如下：

**修正根本原因；只有在違規原本就已存在，且無法在同一個 PR 中修正時，才使用允許清單。**

將項目新增至允許清單時：

1. 加入註解以說明理由。
2. 引用追蹤議題（例如 `// #3498 — 第 2 階段功能，尚未實作`）。
3. 在修正該違規的同一個 PR 中移除該項目——若過時項目已不再抑制有效違規，該項目本身即為缺陷（實作 6A.3 過時強制檢查後，孤立的允許清單項目將導致關卡失敗）。

**請勿**為了讓測試更快通過而新增允許清單項目。允許清單持續增長下的綠燈關卡，只會帶來虛假的品質安全感。

### 當您的 PR 未通過關卡時

1. **仔細閱讀關卡輸出**——它會明確告訴您哪個檔案或符號違反了規則。
2. **修正違規**——大多數關卡都是確定性的檔案系統檢查，只要程式碼正確就會通過。
3. **如果違規原本就已存在**（亦即並非由您引入，但關卡現在開始涵蓋它）：新增允許清單項目，並附上理由註解與追蹤議題。
4. **如果該關卡是棘輪式關卡**（覆蓋率、ESLint 警告、重複、複雜度）：您的變更使指標惡化。請修正根本問題；若變更是刻意為之且指標退化可以接受，則可在極少數情況下執行 `npm run quality:ratchet -- --update`——但必須在 PR 說明中記錄原因。
5. **建議性關卡**（`continue-on-error: true`）僅供參考——它們不會阻止合併，但會顯示在 CI 摘要中。儘管如此，仍應加以修正。

---

## 新增關卡

1. 建立 `scripts/check/check-<name>.mjs`（或 `.ts`）。政策關卡以 0/1 結束。
   棘輪式關卡透過 `collect-metrics.mjs` 將指標輸出至 `quality-metrics.json`。
2. 將 `"check:<name>": "node scripts/check/check-<name>.mjs"` 新增至 `package.json`。
3. 在 `.github/workflows/ci.yml` 中將其接入適當的工作
   （政策 → `lint` 或 `docs-sync-strict`；棘輪 → `quality-gate`）。
4. 如果它有允許清單，請套用來自
   `scripts/check/lib/allowlist.mjs` 的 `reportStaleEntries()`，以便自動偵測過時項目。
5. 在 `tests/unit/build/` 中撰寫測試，以涵蓋該關卡的偵測邏輯。
6. 更新本文件（在相關工作表格中新增一列）。

---

## 代理工具：迴圈內 LSP（選用）

除了 CI 關卡之外，OmniRoute 還提供**選用的** `agent-lsp` 鷹架
（專案層級的 `.mcp.json`，Fase 7 Task 15）。建立 `.mcp.json`
以向程式設計代理公開 TypeScript 語言伺服器，使其在撰寫程式碼**之前**解析符號／
診斷資訊——這是 `typecheck:core` 的「先編譯再宣稱」配套機制，可從源頭減少「虛構符號」錯誤。它刻意設計成
不會自動載入（由您選擇並驗證 MCP↔LSP 橋接）；損壞的項目只會記錄
連線錯誤，絕不會中斷工作階段。

---

## 合理化待辦清單（ROI 審查 — 階段 9 波次 3）

此清單已於 2026-06-17 依據 `ci.yml` 進行核對（先前版本遺漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。對核對後集合進行 ROI 審查，
找出了以下合理化候選項目。**合併屬於機械式 CI 變更；切換／移除則是保留給操作人員的政策決策。**
以下內容尚未套用。

**上方亦未記錄的項目**（建議性、訊號偏弱）：`docs-lint` 工作
（markdownlint + Vale，整個工作設定為 `continue-on-error`），以及獨立的掃描器工作流程
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0` 位於
`quality-baseline.json` 中，但並未連接到 `ci.yml` 內具阻擋效果的棘輪機制——此指標
目前處於孤立狀態。

### 合併／去重（機械式、風險較低）

每個候選項目都已於 2026-06-17 對照實際閘門狀態進行驗證（信任但要查證）；
數個「顯而易見」的合併其實隱藏了技術債，**並非**可直接替換的乾淨方案。

- **`check:docs-sync` 執行兩次**——在 `lint` 工作中獨立執行一次，並於 `check:docs-all`（`docs-sync-strict`）和 husky pre-commit hook 中再次執行。✅ **已完成**——已移除 `lint` 中的獨立呼叫。
- **CVE 掃描**——❌ **不是乾淨的合併。** `audit:deps` 遇到任何高／嚴重 CVE 時都會直接失敗；`check:vuln-ratchet`（osv）僅在相較基準發生_退步_時失敗（目前為 1 個 MODERATE）。兩者語意不同——移除 `audit:deps` 將失去絕對的高／嚴重風險閘門。兩者皆保留。
- **循環偵測**——✅ **已完成**（#15159 G-01/G-02）。此處舊文字將 `check:cycles` 稱為「綠燈、經過篩選的」閘門，並因 `check:circular-deps`（dpdm）回報 91 個循環，而主張其應繼續作為阻擋閘門。該綠燈其實是**假綠燈**：`check:cycles` 僅掃描 5 個子目錄（450 個檔案）、只比對靜態的 `import|export … from`，並捨棄所有 `@/` 和 `@omniroute/open-sse/` 說明符，因此無法看見存放庫中占主導地位的動態匯入 + 別名循環。現已修正：閘門目前會遍歷 `src` + `open-sse`（5023 個檔案），從 TypeScript AST 收集說明符（因此 `import("…")` 會計入，而類型位置的 `typeof import("…")` 不會），並解析 tsconfig `paths`。它找出了 **14** 個循環，而非 0。由於無法在閘門 PR 中修正 14 個既有循環，`check:cycles` 現已改為**棘輪機制**（`--ratchet`，`quality-baseline.json` 中的上限為 `metrics.cycles.value = 14`，`direction: down`）——它會阻擋任何_退步_，且數量只能下降。CI 執行 `npm run check:cycles:ratchet`。逐步消減工作併入 **A-01**。`check:circular-deps`（dpdm）保留為涵蓋範圍更廣的建議性第二意見。
- **複雜度**——✅ **已完成**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：只進行一次 ESLint 遍歷，依 ruleId 計數，使循環複雜度 + 最大行數與認知複雜度的基準維持獨立；個別的 `check:complexity` / `check:cognitive-complexity` 則保留供本機使用 `--update`。
- **`/api` 反幻覺**——✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：只對 `src/app/api` 進行一次 FS 清查，openapi-routes + docs-symbols 仍會各自獨立回報；個別檢查保留供本機執行。
- **`check:node-runtime` 會在 11 個工作中執行**——⚠️ **ROI 偏低。** 每個工作皆使用獨立 runner，而此檢查耗時不到 1 秒；總共僅節省約 10 秒，代價卻是失去成本低廉的逐工作防護。不值得為此進行改動。
- **CI lint 上的 `typecheck:noimplicit:core`**——✅ **已從 lint 工作中移除**（原本是建議性的 `continue-on-error`）；具阻擋效果的類型檢查面為 `typecheck:core` + `check:type-coverage`。本機腳本則予以保留。

### 切換／決策（操作人員政策）

- `check:openapi-security-tiers`（建議性）——❌ **無法直接切換。** 它會以 0 結束，但會警告 `LOCAL_ONLY_API_PREFIXES` 下有數個 `traffic-inspector` 路由缺少 `x-loopback-only: true` 註解。若要強制執行，必須先將這些註解新增至 `openapi.yaml`。
- `typecheck:noimplicit:core`（建議性）——大致已由具阻擋效果的 `check:type-coverage` 棘輪機制涵蓋。可將其切換為棘輪機制，或移除重複的第二次 `tsc` 執行。
- `test:vitest:ui`（目前**具阻擋效果**）——既有失敗已在 `vitest.config.ts` 中透過 `// #8618` 追蹤註解明確排除；新的失敗會使工作失敗。
- `check:secrets`（gitleaks，具阻擋效果的棘輪機制，凍結於 3 個已記錄的誤報）——將這 3 個項目加入允許清單以降至 0，或降級為建議性。與 GitHub 原生秘密掃描 + `check:public-creds` 有重疊。
- `check:pr-evidence`（具阻擋效果，對 PR 內文執行 grep）——誤報風險高；若移除，將削弱硬性規則 #18 的執行力，因此這是真正的政策決策。
- `semgrep`（建議性的獨立工作）——在 OWASP 類別上與 CodeQL 重疊；將其基準連接至棘輪機制，或予以移除。

---

## 相關文件

- 供應鏈（來源證明、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 鍵集合一致性閘門

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，作業 `i18n-ui-coverage`）。
將每個 `src/i18n/messages/<locale>.json` 的葉節點鍵集合與 `en.json` 比較，無論鍵是在何時新增，只要有任何缺少或多餘的葉節點就會失敗。`__MISSING__:` 佔位符會被視為存在（其內容屬於比例閘門的管轄範圍）。它是兩個基於差異／百分比之閘門的絕對補充：`check-ui-keys-coverage` 對每個語系強制設定 80 % 的下限（在約 13,000 個鍵中缺少 43 個，仍會顯示為 99.7 %），而 `check-new-key-coverage` 僅評估 PR 新增至 `en.json` 的鍵。語系批次是以建立其分支當天的 `en.json` 產生，並在基礎分支持續新增鍵的同時進行數天的翻譯；批次 PR 本身未新增任何鍵，因此當批次 1（#13044）合併時，九個語系短缺 43 個鍵，以及批次 2（#13660）八個語系短缺 10 個鍵時（2026-09-15），兩個同級閘門都沒有發出警示。若出現紅燈，請使用 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修正；`extra` 葉節點表示來源已移除該鍵——請將其從語系檔案中刪除。`--warn` 會回報但不會導致失敗。`--catalog=cli` 會對 `bin/cli/locales` 執行相同的比較（`npm run i18n:check-keys:cli`）；這兩個步驟都位於作業 `i18n-ui-coverage` 中。

#### `check-new-key-coverage` — 新鍵 i18n 閘門

`check-ui-value-drift` 的同級閘門。後者會偵測英文值已被**改寫**但其翻譯未隨之更新的情況；本閘門則會偵測已**新增**英文鍵但部分語系從未收到該鍵的情況。

`check-ui-keys-coverage` 無法發現這類問題：它對每個語系強制設定百分比下限，而在約 13,000 個葉節點鍵中缺少十一個，覆蓋率仍為 99.9%。每種語言的百分比無法表達「此功能在未翻譯的情況下發布」——整項功能可能在新語系中完全沒有文字，卻絲毫不影響該數字。

它所編碼的事件如下：Orchestration Canvas 的第 3 階段已將其十一個鍵翻譯至當時存在的 42 個語系。數小時後，歐盟語言批次（#13044）將儲存庫擴增至 51 個語系，而新增的九個語系（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）從未收到這些鍵。`deepMergeFallback` 會以英文取代缺少的鍵，因此失敗模式是未翻譯的 UI，而不是空白 UI——這是真實存在、且因設計使然而悄無聲息的問題。

和它的同級閘門一樣，它**會感知差異**，將合併基準點的英文內容與工作樹比較，因此既有缺漏會維持原狀，而啟用此閘門時不需要進行遷移。

**`__MISSING__:<english>` 標記無法滿足此閘門（自 2026-09-17 起）。** 它過去是文件中指定的延後處理方式——執行階段會回退至正確的英文——直到 2026-09-16 有八個功能 PR 新增了 61 個鍵，並在全部 65 個語系中加入該標記而未進行翻譯：此閘門全數接受，沒有任何機制阻擋這些 PR，而封鎖式的實際翻譯比例閘門隨後在發行版本頂端對所有人失敗（pt-BR 3.2 % > 2.5 % + 0.5）。標記現在會被判定為缺少翻譯。若出現紅燈，請使用 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 修正，或使用 `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，可安全地脫離終端執行；若沒有 `OMNIROUTE_TRANSLATION_*` 環境變數則拒絕啟動）平行處理所有語系。必須保留英文的鍵（固定的產品／引擎／旗標名稱）應放在 `scripts/i18n/untranslatable-keys.json` 中，絕不能藏在標記後方。`vi` 完全禁止標記（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暫置測試閘門

`vitest.config.ts` 的 `exclude` 清單中若有檔案，就表示該測試不會執行；但對檢視檔案樹的人而言，它看起來仍像是覆蓋範圍的一部分。有六十二個檔案逐漸累積在註解 `// #8618 — 既有失敗；修正後移除此排除項目` 之下。Issue #8618 已於 2026-08-11 關閉，但它所追蹤的清單卻從 45 個項目增加至 62 個，每個新項目都沿用了一則指向已關閉 Issue 的註解。當最終逐一測量清單中的檔案時（#13204），**62 個檔案中有 51 個無需變更原始碼即可在目前的工作樹上通過**。

此閘門要求每個可解析至實際檔案的排除項目都必須：(a) 指明一個追蹤 Issue；以及 (b) 連同其測量狀態出現在 `config/quality/vitest-exclusions.json` 中。如此一來，新增排除項目時，會在專用檔案中形成可供審查的差異，而不只是在含有 60 個項目的陣列中再增加一行。它刻意不重新執行遭排除的測試——這需要約 10 分鐘，應由週期性作業負責；清單則會記錄每個項目上次測量的時間。
