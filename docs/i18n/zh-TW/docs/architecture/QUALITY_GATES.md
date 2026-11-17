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

CI 和 Quality Gates 工作流程各自產生穩定的判定結果：`Gate / CI` 和
`Gate / Quality`。其版本化納入政策會將每個上游工作列為必要或提示性工作。
適用的必要工作必須成功：遺失、已取消、已略過、擱置中和未知的結果都無法建立 PASS。
有效的僅文件或僅目錄分類可以使程式碼路徑不適用；草稿 PR 不會被接受為候選項目。
`hotfix` 標籤不會免除證據要求。

這兩個工作流程涵蓋進入 main/release 分支的 PR、推送至 `main`、手動分派
和 merge-group 事件。推送、分派和 merge-group 會執行完整選取。推送至
`release/**` 不會啟動這些工作流程（2026-10-18）：每項變更已在其 PR 上執行矩陣，
而合併後的組合則是 Release-Green 的工作（`docs/ops/RUNNER_BOX.md` → Hosted lane）。
Fork 和 merge group 會對原本會選取自託管執行器的工作使用託管執行器；
推出前必須確認有足夠的託管容量。

一般 PR 會執行快速選取。納入政策中的 `full-code` 和 `full-code-e2e` 路徑
（E2E、整合、套件成品、Electron smoke、Bun SQLite、生態系統與通訊協定用戶端）
只會在 Mergify 佇列草稿或完整執行時執行：
`gh workflow run ci.yml --ref <branch>`。

每個 JSON 收據都會識別已簽出的 SHA、工作流程執行及嘗試次數。
CLI 會拒絕簽出／事件 SHA 不一致的情況。工作流程測試會將政策成員資格繫結至判定
工作的 `needs` 清單，因此新增或移除的路徑不會在無聲無息間消失。
這些收據涵蓋其自身的工作流程，不涵蓋發佈、部署或現有提示性掃描器的內部作業。
在分支規則中啟用兩個檢查名稱是另一項管理變更；新增這些工作本身不會保護分支。

### 合併佇列

`queue` 標籤會將 PR 傳送至 Mergify 佇列（`.mergify.yml`）。Mergify 會在
`mergify/merge-queue/` 分支上開啟草稿 PR，CI 會在該處執行完整選取，而原始 PR
會在 `Gate / CI`、`Gate / Quality` 和 `Merge integrity (changelog + generated skills)` 通過後合併。

Mergify 會將其佇列摘要寫入草稿的描述中，其他應用程式也可以編輯該描述。
此類草稿上的 `pull_request` `edited` 事件會取得自己的並行群組
（`-queue-edit-<run_id>`），因此不會取消草稿的實際執行，且會略過 gate 和矩陣。
只有 `Merge integrity` 仍會執行。被略過的 gate 工作會帶有不同的檢查名稱，
因為 Mergify 會將被略過的 `Gate / CI` 視為失敗檢查，並將 PR 移出佇列。

移出佇列後，推送不一定會重新將 PR 加入佇列。在其上留言 `@mergifyio queue`。

### 接受性 reducer 中保留的證據

`scripts/quality/validate-release-acceptance.mjs` 會縮減所提供的計畫及其
manifest；它不會建立該計畫涵蓋完整發佈管線的事實。
其報告會明確設定 `releaseAcceptance: false`，即使該計畫是
`VERIFIED`。`release-acceptance.yml` 工作流程仍使用陰影 fixture，而非
真實的建置、套件、啟動或晉升收據。

CLI 需要 `--evidence-root` 才能驗證保留的證據。檔案會以
`<evidence-root>/<artifact_id>/<member>` 解析，並以 SHA-256 雜湊。
沒有證據的 PASS 記錄、遺失或已變更的檔案、不安全的路徑或符號連結都會阻止驗證。
遺失的檔案不等同於空白的成功日誌。現有的 SHA/run/attempt 檢查仍彼此獨立：
相符的位元組無法挽救過時的收據。檔案完整性並不代表執行真實性或成品晉升的證明。

### 靜態掃描清單

版本化的 npm 別名清單與靜態掃描成員資格位於
`config/quality/gate-manifest.json`。執行 `npm run check:gate-manifest`，
以根據 `package.json` 驗證指令碼名稱和確切指令；新增、移除及指令漂移都會使
本機 hook 與 CI 中的變更分類工作失敗。一個別名不是工作流程工作、矩陣實例或測試案例：
這些數量不得被當作可互換的項目呈現。

使用 `npm run quality:scan -- --list` 或 `npm run quality:scan:fast -- --list`
即可在不執行的情況下檢查所選的別名。執行器會呼叫 npm 入口點，因此其執行環境
（包括設定中的 Bun）會獲得保留。manifest 會將這些設定檔之外的別名記錄為分開呼叫，
而維護指令則禁止出現在唯讀掃描設定檔中。

這些設定檔只涵蓋靜態掃描。它們不會認證產品測試、覆蓋率、套件化、外部檢查或
候選項目的完整發佈接受性。工作流程納入使用連結的
`config/quality/admission-policy.json` 和 `scripts/quality/admission-verdict.mjs`。
Release-observer 設定檔仍然分開；請獨立檢查其適用的檢查與收據。
完整 observer 的靜態指令宣告於 `config/quality/release-green-static-profile.json`，
包括 `audit:deps`、mutation-test 選取和翻譯檢查。載入器會根據 package.json 和
建模的 CI/Quality 宣告驗證 npm 指令；它會拒絕漂移，而不是將 shell 權杖作為引數執行。
必要掃描器的 SKIP/INCOMPLETE 輸出無法建立 PASS。設定檔會記錄其外部排除項目，
不會取代託管覆蓋率、測試矩陣、套件或部署證據。以下的文字清單是參考資料，
不能證明某個 gate 實際執行過。

指令碼位於 `scripts/check/`（政策 gate）和 `scripts/quality/`（ratchet 引擎）。
CI 的真實來源是 `.github/workflows/ci.yml`。

### Release PR 快速路徑（`quality.yml`）

`.github/workflows/quality.yml` 在 main/release PR、推送至 `main`、分派
和 merge group 上補充 CI。PR 使用依路徑篩選的快速檢查。
永久停用的重複建置已移除；實際的建置／套件／啟動檢查仍保留在 CI 中。
單元測試套件和 vitest 只在 CI 中執行（`Unit Tests (N/8)` 和 `Vitest`）。

| 工作                                             | 範圍                                                                                        | 阻擋          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 文件/程式碼 PR；API 文件參照與 docs-all                                                     | 是            |
| `Fast Quality Gates`                             | 程式碼 PR；靜態檢查、類型檢查、儀表板類型檢查、受影響的單元測試、遺漏的同源測試（僅供參考） |
| `No new ESLint warnings`                         | 程式碼 PR；考量抑制設定的 lint 防護                                                         | 是，包括 fork |
| `Merge integrity (changelog + generated skills)` | 非草稿 PR；變更日誌與產生的技能同步                                                         | 是，包括 fork |

#### 遺漏的同源測試報告

`npm run check:forgotten-sibling-tests` 會以建議步驟的形式，作為 `Fast Quality Gates` 的一部分執行，並重複使用測試影響範圍對映背後的匯入解析器。
對於每個變更的產品模組，它會在候選測試不存在於 pull request 差異中時，報告確定性的
`changed module/symbol -> static consumer -> candidate sibling test` 鏈。Markdown 摘要與 JSON 結果會以
`forgotten-sibling-tests` 工作流程成品的形式保留，以便在任何阻擋式推出前進行校準。

Barrel 重新匯出與動態匯入僅供解析診斷使用；它們絕不會產生阻擋性發現。經審查的例外列於
`config/quality/forgotten-sibling-allowlist.json`。每個項目都必須指定使用者與候選
測試、提供具體理由，並連結 GitHub issue 或 pull request。格式錯誤的項目會以預設拒絕方式失敗。例外不得抑制已刪除的候選測試，或新增 `.skip`/`.todo` 的差異；
斷言弱化與其他遮蔽行為則由獨立且具阻擋性的
`check:test-masking` 閘門負責。

### 工作：`lint`

在每個針對 `main` 的 PR 上執行。失敗時會阻擋合併。

| 指令 (`npm run ...`)              | 驗證                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 阻擋                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js 版本位於支援範圍內                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是                                      |
| `check:cycles`                    | `src/` + `open-sse/` 中的所有循環匯入（以 AST 為基礎，解析 tsconfig `paths`）。直接執行時，只要存在任何循環便會結束並回傳 1（自 #15281 起採取失敗關閉策略），並列出 SCC。`check:cycles:ratchet`（CI 執行的項目）會在計數超過 `quality-baseline.json` 中的 `metrics.cycles` 上限時阻擋——目前為 14，`direction: down`，因此只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                           | 是（ratchet）                           |
| `check:boundary`                  | `open-sse → src` 的耦合：引擎匯入應用程式中的檔案對檔案唯一匯入（`scripts/quality/measure-boundary.mjs`；邊緣清單是 v4 核心／模組拆分修正待辦清單）。直接執行時會產生建議性報告（與 `quality:boundary` 相同）。`check:boundary:ratchet`（CI 執行的項目，也包含在 `quality.yml` fast-gates ratchet 迴圈中）會在計數超過 `quality-baseline.json` 中的 `metrics.boundaryOpenSseToSrc` 上限時阻擋——以測得的 771 為初始值，`direction: down`；`--update` 只能降低此值；在 PR 上以基準為相對值（`--base-ref`，請見下文）                                                                                                                                                                                                                                                              | 是（ratchet）                           |
| `check:route-validation:t06`      | 所有路由上均存在 Zod 結構描述（Tier 6 政策）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` 計數不得超過預算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:provider-consistency`      | `providers.ts` 中的每個 provider 都必須在 `providerRegistry.ts` 中有相符的項目（反之亦然，但須符合允許清單）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:model-lifecycle`           | 三個手動維護的路由表必須與已提交的生命週期快照（#11503）保持一致：`FITNESS_TABLE`（`taskFitness.ts`）不得為 `REGISTRY` 能夠路由的任何已退役 id 評分；每個 `BUILT_IN_ALIASES` 目標都必須存在於 `REGISTRY` 中，且不得出現在已退役 id 快照中；`REGISTRY` 中仍存在的每個已退役 id 都必須被轉送，或列於 `allowedRetiredInCatalog` 中；此外，`DEFAULT_DEGRADATION_MAP` 的任何來源或目標都不得在該快照中標示為已退役。這無法證明模型目前由運作中的上游服務提供。離線執行 — 會比對 `config/quality/model-lifecycle.json`；此檔案由手動執行 `npm run quality:refresh-model-lifecycle` 更新（需要網路；未接入 CI）。`allowedRetiredInCatalog` 是一項逐步清除的棘輪機制：只有在有追蹤議題時才能新增項目。                                                                                  | 是                                      |
| `check:fetch-targets`             | 用戶端 `src/` 中的每個 `fetch("/api/...")` 都必須解析至實際存在的 `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:deps`                      | 儲存庫中每個 `package.json` 內所有可由 `npm install` 安裝的相依套件，都必須列於 `dependency-allowlist.json` 中；系統會標記新增的未固定版本或 slopsquatted 套件                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `audit:deps`                      | 對全部五個獨立鎖定檔（根目錄、Electron、OpenCode 外掛程式 v1/v2，以及 provider）執行 npm audit。重大公告會阻擋流程；高嚴重性公告仍會以可見警告呈現。缺少稽核或稽核失敗時，結果為 INCOMPLETE 並會阻擋流程；系統會保留各範圍的鎖定檔雜湊與報告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:lockfile`                  | `package-lock.json` 完整性 — HTTPS registry、完整性雜湊值、不允許主機覆寫                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是                                      |
| `check:licenses`                  | 生產環境相依套件的 SPDX 授權條款允許清單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:tracked-artifacts`         | 不得有建置產物／已提交的 `node_modules` 符號連結（也會在 husky pre-commit 中執行；pre-push 刻意維持輕量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:ai-attribution`            | PR 提交、標題或本文中不得有 AI／機器人 `Co-Authored-By` 尾註或 AI 產生頁尾 — 硬性規則 #16（位於 `quality.yml` 中 PR→`release/**` 的快速閘門迴圈 — 讀取事件承載資料，非 PR 時不執行 — 以及 `ci.yml` lint 中針對 PR→`main` 的僅 PR 步驟；同時也是 husky `commit-msg` hook；允許人類共同作者；#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | 每個 Vitest 排除項目都必須指定追蹤議題，且出現在 `config/quality/vitest-exclusions.json` 中（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:file-size`                 | 來源檔案（`src/`、`open-sse/`、`electron/`、`bin/` 中的 `.ts`／`.tsx`）必須維持在 `cap` 以內，測試檔案（`*.test.ts(x)`）必須維持在 `testCap` 以內；在 `file-size-baseline.json` 中凍結的檔案（`frozen`／`testFrozen`）不得成長至超過其記錄大小                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:error-helper`              | executors/handlers 中的錯誤回應使用 `buildErrorBody()` / `sanitizeErrorMessage()`（硬性規則 #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:migration-numbering`       | Migration SQL 檔案依序編號，沒有缺號或重複                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是                                      |
| `check:public-creds`              | 除了 `publicCreds.ts` 之外，不得有 OAuth `client_id`/`client_secret` 或 Firebase Web 金鑰的字面值（硬性規則 #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:db-rules`                  | `src/lib/db/` 模組之外不得有原始 SQL；不得從 `localDb.ts` 進行 barrel-import（硬性規則 #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:known-symbols`             | 在其 dispatch table 中註冊的 Provider 執行器、路由策略與轉譯器，必須與磁碟上的檔案相符——不得有孤立或未宣告的符號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是                                      |
| `check:route-guard-membership`    | 每個會產生子程序的路由，都必須由 `isLocalOnlyPath()` 進行分類（硬性規則 #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:test-discovery`            | 儲存庫中的每個 `*.test.ts` / `*.spec.ts` 檔案至少由一個測試執行器收集（棘輪機制：`test-discovery-baseline.json` 中的孤立清單只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是                                      |
| `check:test-tla-order`            | `tests/unit` 下沒有任何 `node:test` 檔案註冊測試、執行頂層 `await`，然後再註冊更多測試（#18045；棘輪機制：`test-tla-order-allowlist.json` 只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是                                      |
| `check:agent-skills-sync`         | 產生的 agent-skills 成品與其來源目錄一致（沒有偏移）。發佈模式會檢查每項技能；功能 PR（`pr` 模式）只會檢查其產生文字遭到編輯的技能 — 請參閱[產生的檔案與衍生基準（在發佈時寫入）](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | 提供者標誌／資產具有已記錄的來源資訊                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON 設定檔可成功解析，並符合儲存庫的 lint 規則                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScript 編譯無錯誤（僅提供建議性警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是                                      |
| `typecheck:noimplicit:core`       | 嚴格的 `noImplicitAny` — 面向未來；許多既有呼叫端仍需要加上註解                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **建議性**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | 將 `tsc` 限定於 `src/app/(dashboard)/**`（#7033）— `typecheck:core` 精選的 27 個檔案允許清單不包含任何 dashboard TSX，而 `next build` 也完全不會對其進行類型檢查（`next.config.mjs` 設定了 `ignoreBuildErrors: true`），因此其中孤立識別碼的回歸（#6625/#6909）在 CI 中無法被發現。與凍結的逐檔案／逐 TS 程式碼計數基準（`config/quality/dashboard-typecheck-baseline.json`，採用與 `check:known-symbols` 相同的過時強制模式）進行差異比較 — 只有超出基準計數的新增錯誤會使閘門失敗；修復既有錯誤後，使用 `--update` 逐步降低基準。                                                                                                                                                                                                                                             | 是                                      |
| `check:build-typecheck`           | 針對 `tsconfig.build.json`（`src`、`open-sse`、`packages`、`bin`、`scripts`、`electron/**/*.d.ts`）執行全應用程式的生產環境類型檢查；這是 `typecheck:core` 的 27 個檔案允許清單及 dashboard 閘門未涵蓋的範圍。與 `config/quality/build-typecheck-baseline.json` 進行差異比較；新的或增加的逐（檔案、程式碼）計數會導致失敗，較低的計數則要求你逐步調整基準。若執行中包含新的或增加的配對，`--update` 會拒絕執行，除非傳入 `--force-regressions`；若出現新被靜默的檔案，則除非傳入 `--force-nocheck`，否則也會拒絕執行，因此擴大基準以取得綠燈，以及授予永久靜默，是兩個需要刻意分開執行的動作。單獨使用 `--force` 會被拒絕。也會依據 `config/quality/ts-nocheck-baseline.json` 掃描建置範圍中的 `@ts-nocheck`，因為使用它的檔案完全不會回報診斷資訊，否則將無法被任何閘門發現。 | 是                                      |

#### 兩個類型檢查程式的回答不同

`typecheck:core` 和 `check:build-typecheck` 會在不同選項下編譯不同的程式，
因此同一個檔案可能在其中一個程式中沒有問題，在另一個程式中卻充滿錯誤。

`tsconfig.build.json` 設定 `"strict": false`，因此 `noImplicitAny` 為關閉狀態。核心
設定會以更嚴格的選項編譯精選的 27 個檔案允許清單，並追蹤每個項目的匯入圖，
因此從未出現在建置程式中的檔案，仍會在此處接受檢查。

在判斷檔案是否已完成類型化時，這項差異很重要：**`check:build-typecheck` 下的零個診斷
不代表零個錯誤**。從 26 個檔案移除 `@ts-nocheck` 後，其中 23 個在建置程式中沒有錯誤；
其中 16 個在嚴格模式下顯現出約 120 個 implicit-any 錯誤。在宣稱檔案乾淨之前，請同時檢查兩者。

### 工作：`quality-gate`

在 `test-coverage` 之後執行。失敗時會阻擋合併。

| 指令                         | 驗證內容                                                                                                                                  | 是否阻擋                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | 產生 `quality-metrics.json`（ESLint 警告數量、合併分片報告中的涵蓋率）                                                                    | 是（位於 ratchet 的上游） |
| `quality:ratchet`            | `quality-baseline.json` 中的每項指標皆未發生退化（ESLint 警告 ≤ 基準；涵蓋率 ≥ 基準）                                                     | 是                        |
| `check:duplication`          | 程式碼重複度（jscpd@4）不超過 `quality-baseline.json` 中的基準                                                                            | 是                        |
| `check:complexity`           | 檔案層級的圈複雜度不超過上限（核心 ESLint `complexity` + `max-lines-per-function`）                                                       | 是                        |
| `check:cognitive-complexity` | 認知複雜度 ratchet（`eslint-plugin-sonarjs`）— 獨立的 ESLint 傳遞；CI 將兩者合併為單一 `check:complexity-ratchets` 步驟執行               | 是                        |
| `check:dead-code`            | 未使用的匯出／檔案 ratchet（knip）相較於基準未發生退化                                                                                    | 是                        |
| `check:compression-budget`   | 壓縮基準測試預算 — 各引擎的 token 節省下限不得發生退化                                                                                    | 是                        |
| `check:type-coverage`        | 類型涵蓋率百分比 ratchet（`type-coverage`）未發生退化；大致上涵蓋 `typecheck:noimplicit:core`                                             | 是                        |
| `check:codeql-ratchet`       | 開啟中的 CodeQL 警示數量未發生退化（透過 `gh api` 讀取；沒有 token 時會正常略過）— 更新週期與手動觸發方式：請參閱下方的「CodeQL ratchet」 | 是                        |

### 工作：`quality-extended`

整個工作皆為建議性質（`continue-on-error: true`）。以 npm 為基礎的 ratchet 會實際執行；外部掃描器透過
`gh release download` 安裝，若二進位檔仍不存在則自行略過（結束碼 0）。

| 指令                     | 驗證內容                                                                                                                                                    | 是否阻擋                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | 沒有循環相依性（dpdm）                                                                                                                                      | **建議性**                              |
| `check:bundle-size`      | 套件大小不超過上限                                                                                                                                          | **建議性**                              |
| `check:secrets`          | 秘密掃描（gitleaks）— 若二進位檔不存在則略過                                                                                                                | **建議性**                              |
| `check:vuln-ratchet`     | 相依性漏洞（osv-scanner）未發生退化 — 若未測量，`--ratchet` 會以 INCOMPLETE 失敗（結束碼 2）                                                                | **建議性**                              |
| `check:workflows`        | 工作流程 lint（actionlint + zizmor）；缺少／損壞的掃描器、無效報告或缺少 ratchet 基準時會以 INCOMPLETE 失敗。有效發現會遵循所選的嚴格／建議性／ratchet 原則 | 需要執行；zizmor ratchet 在 CI 中會阻擋 |
| `check:openapi-breaking` | 針對固定事件提交的公開 API 合約（PR 合併基準、推送前版本、merge-group 基準；排程／手動執行時先 checkout 第一個父提交）；必要的測量失敗時會拒絕繼續          | **使用 --ratchet 時會阻擋**             |

### 工作：`docs-sync-strict`

在每個 PR 送往 `main` 時執行。失敗時會阻擋合併。

| Script                         | 驗證內容                                                                                                                         | 阻擋                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 依序執行以下 6 個子閘門的總閘門                                                                                                  | 是                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI 版本一致性；發布模式也會檢查 66 個 `llm.txt` 鏡像檔與已翻譯的 CHANGELOG 區段（PR 模式：鏡像檔彼此一致）      | 是                         |
| ↳ `check:docs-counts`          | 內文中的數量（提供者數量、遷移數量等）。有兩種模式：功能 PR 使用 `pr`，其他情況使用 `release` — 請參閱下方的「衍生值」           | 是                         |
| ↳ `check:env-doc-sync`         | `.env.example` 中的每個環境變數都記錄在文件表格中，反之亦然                                                                      | 是                         |
| ↳ `check:deprecated-versions`  | 文件中不得包含任何已棄用的版本字串                                                                                               | 是                         |
| ↳ `check:doc-links`            | 文件中的內部 Markdown 連結可解析至實際檔案（`[text]`/`(path)` 格式）                                                             | 是                         |
| ↳ `check:fabricated-docs`      | 文件中引用的路由、環境變數、CLI 命令、勾點名稱與檔案路徑皆存在於程式碼庫中。使用 `--strict` 時為硬性閘門；未使用旗標時則軟失敗。 | 是（CI 中透過 `--strict`） |
| `check:cli-i18n`               | CLI `t()` 金鑰存在於 `bin/cli/locales/en.json` 中（兩種模式）；僅在發布模式下檢查 pt-BR / zh-CN / zh-TW 與 `en.json` 的一致性    | 是                         |
| `check:openapi-coverage`       | OpenAPI 規格涵蓋至少達到經逐步提高門檻的實際路由數量                                                                             | 是                         |
| `check:openapi-security-tiers` | `openapi.yaml` 中的安全層級註解與 `routeGuard.ts` 的分類一致                                                                     | **建議性**                 |
| `check:openapi-routes`         | `openapi.yaml` 中的每個路徑都可解析至實際的 `route.ts`（防止幻覺產生）                                                           | 是                         |
| `check:docs-symbols`           | `docs/**/*.md` 中的每個 `/api/...` 參照都可解析至實際的 `route.ts`（防止幻覺產生）                                               | 是                         |
| `i18n translation drift`       | `docs/i18n/**` 鏡像檔與 `.i18n-state.json` — PR 上為建議性（鏡像檔由翻譯批次更新），推送與 nightly 時為嚴格檢查                  | PR 上為**建議性**          |

#### 翻譯鏡像檔是衍生檔案（PR 模式與發布模式）

功能 PR 僅編輯英文來源。`docs/i18n/<locale>/**` 鏡像檔（包括 66 份
`llm.txt` 副本與已翻譯的 `CHANGELOG.md` 檔案）以及 `.i18n-state.json`，會由翻譯批次（`docs/i18n-*` / `chore/i18n-*` 分支、排程執行的
`i18n-mirror-refresh.yml`）以及發布流程（`npm run release:sync-changelog-i18n`）在單一步驟中重新寫入。因此，鏡像檔閘門會以兩種模式執行，模式由
`scripts/check/lib/gateMode.mjs` 解析（`--mode=pr|release`，接著是
`OMNIROUTE_GATE_MODE`，最後是 Actions 事件；本機執行時為 `release`）：

- `check:docs-sync` — 發行模式會執行所有檢查。PR 模式會保留 package.json/OpenAPI 版本、
  根目錄 CHANGELOG 標題和已取代文件防護，並針對
  `llm.txt` 鏡像副本和已翻譯的 CHANGELOG 區段輸出
  `SKIP reason=pr-mode` — 除非 PR 會寫入鏡像：在
  `config/quality/derived-paths/*.json` 中宣告為 `docs/i18n/**` 系列寫入者的 head 分支會嚴格執行兩項檢查，
  而且當差異基準可解析時，若某項變更本身的差異編輯了
  `docs/i18n/<locale>/llm.txt` 或 `CHANGELOG.md`，則會嚴格執行該項檢查。差異基準在深度為 1 的 checkout（`docs-sync-strict`
  工作）中無法解析，因此 PR 模式也會執行一項不需要基準的檢查：每個 `llm.txt` 鏡像都必須存在、保留其
  `---` 分隔符，並包含根目錄本文或大多數鏡像共用的本文。基準若移動，會使所有鏡像同樣過時並通過；手動編輯單一鏡像則會失敗。已翻譯的
  `CHANGELOG.md` 檔案在深度為 1 的 PR checkout 中沒有此類檢查。
- 預提交 hook 會執行 `check-docs-sync.mjs --mode=pr`：提交會根據其實際變更內容判定。
  未帶旗標的本機執行會採用發行模式，而一個編輯根目錄 `llm.txt` 的已合併 PR
  會使之後所有以該基準為基礎的提交都被阻擋，直到該批次執行為止。Husky hook 執行的任何具模式感知的閘門也遵循相同規則：
  hook 會傳入 `--mode=pr`，而嚴格判定則保留給發行模式的執行（發行 PR、推送至 `main`、一般本機執行）。
- 鏡像內容單元測試（`tests/_helpers/mirrorFreshness.ts`：`cycle-docs-mirror-contract`、
  `resilience-pre-dispatch-docs-mirrors`、`cli-env-quality-docs-mirrors`、
  `docs/*-locales`）— 發行模式會斷言所有語系。PR 模式只會斷言根據 `.i18n-state.json` 與英文來源同步的鏡像
  （整個檔案的雜湊，或測試固定之區段的已記錄區段雜湊），並附帶原因跳過過時的鏡像。`target_hash` 來源檢查在兩種模式中都會針對所有語系執行。新鮮度以每個 `## `
  區段為單位，單元 `run-translation.mjs` 會計算雜湊；較長的區段（此檔案的閘門清單約佔其一半）表示其中任何編輯都會使那些鏡像過時，而其 PR 模式斷言會跳過，直到下一批次翻譯。若英文來源不再包含某個錨點，則會回退到整個檔案的比較。
- `i18n translation drift` — PR 上為建議性檢查，在推送、夜間執行和發行截點時為嚴格檢查，因此過時鏡像無法在發行版本中交付。

`scripts/i18n/sync-llm-mirrors.mjs`（也以 `syncLlmMirrors()` 匯出，並支援 `--dry-run`）
會重寫 `llm.txt` 鏡像；發行重新整理、翻譯批次和排程的
`i18n-mirror-refresh.yml` 都會執行它（重新整理會透過 dry run 偵測過時的 `llm.txt` 鏡像，因為漂移報告不會列出這些鏡像，並在
`check:docs-all` 之前同步它們）。

`docs/diagrams/` 下的十二個 README SVG 是產生的（`scripts/docs/gen-readme-<name>.mjs`；
`npm run docs:readme-diagrams` 會重新產生全部檔案）。每個檔案都有一項位元組比較單元測試
（`tests/unit/docs/readme-*-svg.test.ts`，工作 `test-unit`），在發行模式中若提交的檔案過時便會失敗；在 PR 中，
`check:generated-artifacts` 會判定 PR 編輯的 SVG，而基準的漂移則交由發行重新整理處理（請參閱[產生的檔案與在發行時寫入的衍生基準](#generated-files-and-derived-baselines-written-at-release)）— 而 `check:docs-counts` 會從其 `<text>` 節點讀取標準數字 — 這也是為什麼
描邊步驟會將每個描邊後的字串以隱形 `<text>` 保留在檔案中。SVG 標準數字檢查會讀取
`SVG_DIAGRAM_FILES`（`scripts/check/check-docs-counts-sync.mjs`）中列出的檔案：`docs/diagrams/readme-hero.svg`、
`free-tier-budget.svg`、`promise-pillars.svg`、`comparison-table.svg`、`cli-terminal.svg`、
`tier-cascade.svg`，以及 `public/images/tier-flow-dark.svg` 和 `tier-flow-light.svg`；
free-forever、catalog-entry、recurring-pool 和 scoring-factors 聲明也會讀取
`promise-pillars.svg`、`free-tier-budget.svg` 和 `strategies-grid.svg`。這些
產生器繪製的數量（提供者總數、MCP 工具、路由策略、free-forever 提供者等）會透過
`scripts/docs/readmeFacts.mjs` 來自事實快照 `docs/reference/derived-facts.json`，
而不是來自常值，因此在任何分支上重新產生圖表都會重現已提交的檔案。
`free-tier-budget.svg` 會從相同快照繪製其列（`code.freeTierBudget`，即事實探測器記錄的目錄摘要），因此
對 `FREE_MODEL_BUDGETS` 的變更會在下一次重新整理時傳達到卡片，而不會使 CI 變紅。

### 衍生值：`pr` 與 `release` 閘道模式

功能 PR 絕不會寫入取決於其基準狀態的值：提供者、遷移、
MCP 工具和策略數量、README SVG 數字、事實快照。單一步驟會重新計算所有
這些值，即由發行流程和夜間衍生重新整理 PR 執行的 `npm run release:refresh-derived`。因此**在發行之間，基準刻意落後於即時程式碼**，而在同儕新增提供者後，若閘門或測試將樹狀結構與即時程式碼比較，之後的每個 PR 都會變紅。判定衍生值的閘門會以兩種模式之一執行，模式由
`scripts/check/lib/gateMode.mjs` 解析（採用第一個符合項）：

1. 命令列上的 `--mode=pr|release`；
2. `OMNIROUTE_GATE_MODE` 環境變數（`pr` 或 `release`）；
3. 根據 GitHub Actions 事件自動判定：head 不是 `release/v*` 的 `pull_request`、
   `merge_group`，或推送至 `omni-queue/**` → `pr`；其他所有情況（推送、排程、
   dispatch、發行 PR `release/v* → main`、任何本機執行）→ `release`。

`check:docs-counts`（`scripts/check/check-docs-counts-sync.mjs`）在每種模式中會失敗的情況：

| 模式      | 失敗條件                                                                                                                                                                                                                                                                                | 是否需要即時事實 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `release` | 每項檢查都會與從原始碼樹收集的事實進行嚴格相等比較（這是閘門一貫採用的行為）：過時的計數、版本、覆蓋率下限或 SVG 數字都屬於 STRICT 漂移                                                                                                                                                 | 是               |
| `pr`      | 僅檢查變更所做的事，使用相同的宣告擷取器與 PR 基底進行差異比較：(1) 某項檢查與檔案的基底中不存在的受管理值（「PR 編輯了受管理的數字——請將該行還原為基底文字」）；(2) 基底原本具有但 head 遺失的必要宣告。不需要事實的內容不變量會如 release 模式般執行；僅限 release 的檢查會列出並略過 | 否               |

代理程式指示檔完全**不**包含任何衍生計數：`AGENTS.md`、`llm.txt`（及其
`docs/i18n/*/llm.txt` 副本）、bs 的 `AGENTS.md` 分支版本、`open-sse/services/AGENTS.md`、
`src/shared/constants/agentSkills.ts`、`skills/README.md` 及每個 `skills/*/SKILL.md` 都改為指向
來源（例如 `src/shared/constants/routingStrategies.ts` 中的 `ROUTING_STRATEGY_VALUES`）以及
`npm run facts`。不變量「代理程式指示檔中不得有衍生計數……」在兩種模式下，只要其中出現計數
（提供者、遷移、MCP 工具與作用域、路由策略、評分因素、模式套件）就會失敗，因此 release 重新整理永遠不必重寫指示檔。

在 `pr` 模式下，寫入者分支可以編輯受管理值：`chore/derived-*`（每夜重新整理
PR）、`release/v*`，以及翻譯批次 `docs/i18n-*` 和 `chore/i18n-*`
（`scripts/check/lib/derivedClaimsDiff.mjs`）。佇列批次（`merge_group`、Mergify 草稿、
`omni-queue/**`）不會再次接受判定：它們彙總的是閘門已逐一判定過的 PR。

結束代碼：`0` 無問題 · `1` STRICT 漂移（或搭配 `--strict` 的軟性漂移）或受管理值
違規 · `2` 基礎架構問題——無法收集程式碼事實（tsx 探查失敗或
逾時；逾時由 `OMNIROUTE_FACTS_TIMEOUT_MS` 控制，預設為 600000 ms），或在 CI 中無法解析 PR 差異
基底。結束代碼 2 絕不代表文件有差異：請重新執行工作或修正
環境。

各模式的執行位置：

| 位置                                                                                       | 模式                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 功能 PR——`ci.yml` 工作 `docs-sync-strict`、`quality.yml` 步驟「文件準確性」                | `pr`（自動）；工作透過 `BASE_SHA` 傳入基底，並使用 `fetch-depth: 2` 簽出                                                                                                                  |
| `merge_group`、`omni-queue/**` 候選項、合併列車的完整閘門清單                              | `pr`                                                                                                                                                                                      |
| Release PR（`release/v* → main`）、推送、排程及手動執行                                    | `release`                                                                                                                                                                                 |
| Release-Green（`scripts/quality/validate-release-green.mjs`）                              | HARD 項目使用 `OMNIROUTE_GATE_MODE=pr` 執行（「基底是否造成失敗？」）；DRIFT 項目 `derived-refresh` 執行 `npm run release:refresh-derived -- --check`（嚴格檢視，絕不在基底為紅燈時開啟） |
| Release（`/generate-release` 階段 0a 與 1；技能接線是另一項需擁有者核准的變更）            | `npm run release:refresh-derived` 寫入衍生檔案；之後 release PR 本身的檢查會以 `release` 模式執行                                                                                         |
| `nightly-derived-refresh.yml`（每日、最高的 `release/vX.Y.Z`，在 release-freeze 期間略過） | `npm run release:refresh-derived -- --profile=nightly`；若有差異，會從 `chore/derived-refresh` 維持開啟「一個」PR；絕不合併                                                               |

其背後的命令：

- `npm run facts` 會將每個衍生數字以 JSON 輸出（`scripts/release/facts.mjs`）。
  `--key=code.mcpTools` 會輸出單一值，`--snapshot` 會讀取已提交的快照，而非
  即時樹狀目錄。若無法收集 facts，則結束碼為 2。
- `npm run release:refresh-derived`（`scripts/release/refresh-derived.mjs`）會依下列順序一次
  重新計算衍生檔案（`--only=` 的步驟 ID）：`provider-reference`
  （`docs/reference/PROVIDER_REFERENCE.md`）、`facts`（快照）、`numbers`（將 counts gate 的
  重寫計畫套用至文件，然後帶到其 `docs/i18n/` 鏡像）、`readme-diagrams`、`skills`（產生的
  `SKILL.md`）、`e2e-timings`（在樹狀目錄提供 `syncE2eTimings` 前跳過）、`ui-keys`（刪除
  `en.json` 移除的鍵，並使用 `--rewritten-since=<ref>`——預設為 `origin/main`——重新佇列
  自上次發行後重寫的英文值）、`llm-mirrors` 和 `verify-generated`（寫入後，release 模式下的
  `check:generated-artifacts` 和 `check:agent-skills-sync` 必須通過；在 `--check` 中以及
  `--only` 排除該步驟時跳過；失敗時結束碼為 2）。`changelog` 步驟為選用（僅限 release
  設定檔，使用 `--with-changelog`）。`--profile=nightly` 絕不修改版本宣告。搭配
  `-- --check` 時不會寫入任何內容；若任何檔案將會變更，或受管理的值需要手動編輯，則列出
  兩者並以 1 結束；基礎架構失敗時以 2 結束。`--json` 會將結果以 JSON 輸出。
- `docs/reference/derived-facts.json` 是上次重新整理所使用 facts 的快照。只有重新整理程序會寫入
  它。README SVG 產生器會讀取它，而 PR 時的單元測試會以它比對已提交的文件與產生檔案——絕不
  使用即時程式碼。測試套件唯一的即時比對是
  `tests/unit/check-docs-counts-sync.test.ts` 中的「重新整理發行會完成循環」：使用即時 facts 時，
  將重新整理的重寫計畫套用於記憶體後，不會留下任何未回報的 STRICT 漂移，而再次規劃也不會
  產生任何變更。

若要在本機重現（本機執行預設為 `release`）：

```bash
npm run check:docs-counts                                       # release：嚴格模式，即時 facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # 功能 PR 所依據的判定內容
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # 發行會重寫的內容
```

若沒有可解析的基礎（沒有 `BASE_SHA`/`BASE_REF`，且沒有本機
`origin/release/v<version>`），本機的 `pr` 執行會列印警告並跳過差異比對，而不會失敗。

### 工作：`i18n-ui-coverage`

| 指令                             | 驗證內容                                                                                                                                                | 阻擋                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage`（內嵌） | UI i18n 鍵覆蓋率 ≥ 65%                                                                                                                                  | 是（兩種模式）        |
| `check:ui-icu`                   | 每個 UI 目錄的每則訊息都能以 `IntlMessageFormat` 編譯                                                                                                   | 是（兩種模式）        |
| `check-ui-value-drift`（內嵌）   | 重寫的英文**值**不會留下過時的翻譯                                                                                                                      | 是（僅 release 模式） |
| `check-new-key-coverage`（內嵌） | 每個**新增**的英文鍵都已翻譯至所有語系——會拒絕 `__MISSING__:` 標記                                                                                      | 是（僅 release 模式） |
| `check-key-completeness`（內嵌） | 每個 UI 目錄（以及使用 `--catalog=cli` 時的每個 CLI 目錄）都恰好包含其 `en.json` 的鍵集合；在 `pr` 模式中，每個 PR 變更的目錄都會在合併基準上與自身比對 | 是（兩種模式）        |
| `check-translation-ratio`        | 每個語系的實際翻譯比例（相同於英文／佔位符／缺少的項目，在允許清單之外）不得超過 `config/quality/i18n-translation-baseline.json` + 寬限值               | 是（僅 release 模式） |

需要 `fetch-depth: 0`——value-drift gate 會將 `en.json` 與合併基準進行差異比對。

**兩種模式（自 2026-11-13 起）。**功能 PR 會在 `en.json`（以及
`bin/cli/locales/en.json`）中新增或重寫鍵，且不會修改其他語系；`check:pr-derived-paths`（工作
`pr-test-policy`，系列 `config/quality/derived-paths/translation.json`）會使修改其他語系的功能 PR
失敗。其他語系會由 `release:refresh-derived` 每次發行完成一次；該程序會呼叫
`scripts/i18n/sync-ui-keys.mjs` 中的 `syncUiKeys()`（新增缺少的鍵、刪除已移除的鍵、使用
`rewrittenSinceRef` 標記英文重寫內容的翻譯、進行翻譯），或透過翻譯波次完成。
各 gate 會從 `scripts/check/lib/gateMode.mjs` 讀取模式：在 `pr` 模式（功能 PR、
`merge_group`、`omni-queue/**`）中，上述 release 模式 gate 會列印 `SKIP reason=pr-mode` 並以
0 結束；在 `release` 模式（release PR、推送至 `main`、`workflow_dispatch`、本機執行）中，
它們會如以往一樣嚴格，而在 release PR 上，具差異感知能力的 gate 會取得
`BASE_REF=origin/main`，因此會判定此循環新增或重寫的每個鍵。使用 `--mode=pr` 可在本機預覽
功能 PR 的判定結果。

仍會在 `pr` 模式中變更語系目錄的 PR（翻譯批次、版本發布重新整理、僅翻譯修正）不會被跳過：`check-key-completeness` 會將每個變更過的目錄，與合併基準中的相同目錄（`scripts/i18n/lib/touched-catalogs.mjs`）進行比對，若目錄遺失某個鍵、`en.json` 缺少某個鍵、原本的實際翻譯變成 `__MISSING__:` 標記或英文文字，或某個值不再插入 PR 未變更之英文字串的預留位置／標籤，就會失敗。PR 中新增的語系目錄必須包含完整的 `en.json` 鍵集合。這涵蓋了對於 PR 所變更目錄而言，比例與 CLI parity 閘門會看到的內容。

語系 parity 單元測試（`cli-i18n-catalog`、`i18n-pt-br`、`i18n-vi-completeness`、`i18n-placeholder-parity`）透過 `tests/_helpers/localeParityMode.ts` 遵循相同的模式：在 `pr` 模式中，它們會跳過鍵 parity 斷言，並將英文自合併基準以來有所變更之鍵的預留位置 parity 留給版本發布重新整理處理（當單元測試工作中的淺層 checkout 無法讀取合併基準時，則為所有鍵）。該 helper 是**唯一**獲准的模式條件式跳過機制：`check:test-masking` 會計算 `.skip(` 與 `{ skip: true }`，但不會計算它所回傳的計算結果 `{ skip: "<reason>" }`，因此 `tests/unit/locale-parity-mode.test.ts` 會鎖定允許使用它的測試清單——新增項目必須經審查後編輯該清單。

#### `check-ui-value-drift` — 過時翻譯閘門

捕捉其他閘門在結構上無法看見的 i18n 回歸問題：英文值被重寫，而從先前英文值衍生的翻譯仍停留在原處，因此非英文使用者會持續讀到措辭看似肯定、如今卻已錯誤的內容。

這項功能確實曾在正式環境中發生問題。Antigravity 登入 helper 合併時（#5203），`oauthModal.googleOAuthWarning` 曾被重寫；**43 個語系中有 39 個**仍保留著告訴操作人員「複製完整 URL 並貼到下方」的文字——但對該提供者而言，這個流程根本無法完成。直到 #8463 才被發現，原因如下：

- `sync-ui-keys` 只會補回**不存在**的鍵，不會處理已存在但**過時**的鍵；
- `check-ui-keys-coverage` 計算的是鍵的_存在性_，因此過時翻譯仍會被算作已涵蓋；
- `check-translation-drift` 追蹤 `docs/i18n/<locale>/**.md` 文件鏡像——它從不讀取 `src/i18n/messages/*.json`。它在 `docs-sync-strict` 工作中執行：PR 上為提示性檢查，在 push 與 nightly 上則為嚴格檢查；翻譯批次會重新整理鏡像，而不是功能 PR。

**依差異判斷，而非依基準判斷。**它會比較合併基準中的 `en.json` 與工作樹；對於每個英文值有所變更的鍵，任何仍保留未被觸碰之翻譯的語系都會被視為過時。這會刻意**凍結既有負債**——差異無法揭示長期存在的翻譯是源自哪個舊英文值，因此閘門只會判斷目前變更所觸及的內容。另一種做法是使用每鍵雜湊基準，但那會需要約 600 KB 的產生檔案，是現有最大基準檔的 3 倍，且每次 i18n PR 都會造成變動。

有兩種方式可以通過：

1. 更新受影響的翻譯，或
2. 將它們設為 `__MISSING__:<new english>`——執行階段接著會提供修正後的英文（`src/i18n/request.ts::deepMergeFallback`、#7258），而該鍵也會進入翻譯佇列。

如果字串的**含義**有所變更，請優先**重新命名鍵**：新鍵不可能繼承過時翻譯。#8463 採用的就是這種模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

當無法讀取基準目錄時（沒有基準 ref 的淺層 clone），會以 `SKIP reason=base-unresolved` 結束並返回 0，與 `check-openapi-breaking` 的行為一致。僅限版本發布模式：功能 PR 重寫英文後就停止；版本發布重新整理會標記其留下的翻譯（`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`，使用相同的 `findStaleTranslations`）。

### 工作：`i18n`

完整的 i18n 驗證矩陣（每個語系一個工作）。整個工作為提示性檢查。

| Script                          | Validates            | Blocking                                             |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | 每個語系的翻譯完整性 | **提示性**（整個工作使用 `continue-on-error: true`） |

### 工作：`pr-test-policy`

僅在 pull request 上執行。

| Script                 | Validates                                                                                                | Blocking |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | 變更 `src/`、`open-sse/`、`electron/` 或 `bin/` 中正式環境程式碼的 PR，必須包含或更新測試（硬性規則 #8） | 是       |
| `check:test-masking`   | 變更後的測試檔案不會減少斷言總數，也不會新增 `assert.ok(true)` 同義反覆斷言                              | 是       |
| `check:pr-evidence`    | PR 內文引用變更的測試／VPS 證據（透過搜尋 PR 文字將硬性規則 #18 機械化——較脆弱，詳見 Backlog）           | 是       |

### 工作：`test-vitest`

在 `build` 之後執行。失敗時會阻止合併。

| 測試套件         | 驗證內容                                                  | 阻擋性                                                               |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| `test:vitest`    | MCP 伺服器（110 個工具）、autoCombo、快取 — vitest 執行器 | 是                                                                   |
| `test:vitest:ui` | UI 元件測試 — vitest 執行器                               | **阻擋性** — `vitest.config.ts` 明確排除既有失敗；新失敗將使工作失敗 |

### 每夜工作流程（排程執行，僅供參考）

這些工作流程會依 cron 排程（以及 `workflow_dispatch`）執行，絕不會在 PR 上執行。全部僅供參考。

| 工作流程               | 驗證內容                                                                                                                               | 阻擋性       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | 使用隨機種子與高執行次數的 fast-check 屬性測試                                                                                         | **僅供參考** |
| `nightly-resilience`   | 堆積成長閘門、混沌故障注入、k6 負載／浸泡測試                                                                                          | **僅供參考** |
| `nightly-llm-security` | promptfoo 注入防護（阻擋模式）及 garak 探測（沒有提供者密鑰時略過）                                                                    | **僅供參考** |
| `nightly-schemathesis` | 使用 `docs/openapi.yaml` 對執行中的 OmniRoute 進行 OpenAPI 合約模糊測試（schemathesis）— 揭示規格違規／未處理的 500 錯誤（階段 8 B.4） | **僅供參考** |
| `nightly-mutation`     | 在快速單元測試階段執行 Stryker 變異測試評分 — 存活的變異體會揭示較弱的 assert                                                          | **僅供參考** |
| `nightly-compat`       | 涵蓋受支援 `engines.node` 範圍的 Node 引擎相容性矩陣                                                                                   | **僅供參考** |

效能基準（堆積、TTFB、建置時間）會被記錄，但不會作為閘門：請參閱 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）。

---

## Velocity 階段（2026-08-30 → v4.0 LTS）：所有基準線放寬 20%

擁有者決策（2026-08-30）：在 v4.0 模組化完成前，交付速度比維持債務上限更重要。所有**數值型**調整基準線都在一次可稽核的操作中放寬 20%，並在 `config/quality/quality-baseline.json` 中宣告此階段：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 變更內容                                                                                                                                             | 位置                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 越低越佳的計數 ×1.2，越高越佳的百分比 ÷1.2（保留 60 的涵蓋率下限，`eslintErrors` 維持 0，`eslintWarnings` 為凍結抑制計數的 20%） | `quality-baseline.json`（`_relax_velocity_2026_08_30` 註記列出每個變更的前值 → 後值）                  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                     | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`、每個 `frozen[*]` / `testFrozen[*]` 的行數上限 ×1.2                                                                                 | `file-size-baseline.json`                                                                              |
| 每個檔案／每個 TS 程式碼的計數 ×1.2                                                                                                                  | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                             |
| 當 `_policy.requireTighten === false` 時，`--require-tighten` 改為提供建議                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nightly `bank-ratchet-shrinks` 暫停（它會儲存測得的縮減並抵銷預留空間）                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

允許清單（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`、…）**不是**預算，因此未予變更。通過／失敗政策閘門（秘密、SQL 規則、文件／環境合約、i18n 同步性、單元測試）維持不變 — 紅色測試仍然是紅色測試。

**工具**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 一次性放寬操作（`scripts/quality/relax-baselines.mjs`）；拒絕以相同註記執行兩次。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — 以 CI 的方式測量每個數值閘門，並輸出各閘門剩餘的預留空間（`scripts/quality/baseline-headroom.mjs`）。每晚的 `baseline-headroom` 工作會將表格發佈在工作流程執行摘要中，並將其 JSON／Markdown 報告以上傳至 `baseline-headroom-<run_id>`，保留 90 天。警告與嚴重列會標示距離上限 10% 以內或已超過上限的閘門。請將這些報告視為預算即將耗盡的早期警告；檢查有問題閘門的 `_rebaseline_*` 註記。此工作不再建立或更新永久議題；#12149 保留較早的報告歷史。

**新程式碼模式（Clean-as-You-Code）— 自 2026-08-30 起，僅限 PR 快速路徑**

在 `pull_request` 事件中，`quality.yml` 會將 `--base-ref <PR base SHA>` 傳給 `check:file-size`、`check:complexity-ratchets` 和 `check:dead-code`。對於 `check:complexity-ratchets` 和 `check:dead-code`，閘門會將 HEAD 與合併基準進行比較，且**僅限於 PR 修改過的檔案**（`scripts/check/newCodeMode.mjs`：合併基準會具體化到一次性的 `git worktree` 中，ESLint／knip 會在該處及 HEAD 上執行，並比較每個檔案的計數）：

- **阻擋** — PR 在其修改的檔案中新增圈複雜度／認知複雜度違規或無效匯出（記錄中會出現 `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）；
- **提供建議** — 全域總數與凍結基準線的比較。繼承的漂移不會使無辜的 PR 變紅；漂移會在版本發佈協調時重新凍結，並由預留空間工作加以監控。

`check:file-size` 會依自身規則使用基準參照（`scripts/check/check-file-size.mjs`、#8522）：它會檢查樹狀結構中的每個原始碼與測試檔案，透過 `git show` 讀取每個檔案在 PR 基準版本的行數，且只有當檔案成長超過其基準線上限（`frozen`／`testFrozen`，或基準線之外檔案的 `cap`／`testCap`）與其基準版本大小兩者中較大者時，才會使檔案失敗。因此，在基準版本上已經漂移的檔案不會使無辜的 PR 變紅。

`check:boundary:ratchet` 對其單一數值套用相同規則
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`)：在 PR 事件中，
`quality.yml` 的快速閘門與 `ci.yml` 的 lint 工作都會傳入 PR 基底 SHA，基底提交會從
`git archive` 匯出內容進行測量，而 PR 僅在其 `open-sse → src` 邊數超過
`metrics.boundaryOpenSseToSrc` 與基底計數兩者中較大者時失敗。基底超過上限的漂移會被回報
（`base drift herdado`），但絕不會讓原本無辜的 PR 失敗；push → main 維持絕對上限，而
無法解析的基底 SHA 則會在發出警告後回退至該上限。

一個 omni-queue 候選項目（推送至 `omni-queue/**`，請參閱
[OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)）會獲得與 pull request 相同的處理方式：
兩個工作流程都會將候選基底（`needs.changes.outputs.candidateBase`）作為 `--base-ref`
傳入，而 `check:ts7-diagnostics-ratchet` 也會針對它執行。對於兩個新程式碼閘門，比較基底
就是該 SHA 本身，而不是頂端 merge 提交的第一個父提交，因此批次中的每個 pull request
都會受到評估。

`workflow_dispatch` 執行、release-green sweep 與 nightly headroom 工作都沒有 PR 基底，
因此維持絕對（全域）比較。目前覆蓋率、重複程式碼與類型覆蓋率仍維持全域（這些工具
無法以低成本產生逐檔差異）——候選項目將採用相同處理方式。

**在 v4.0 完成階段（LTS = 比之前更嚴格，而非「恢復正常」）**

1. 在純粹的 `release/v4.0.0` 頂端執行 `npm run quality:headroom --json` 以保留紀錄，接著
   執行 `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`，以及每個 typecheck 閘門的
   `--update`——每個基準都會降至測量值。
2. 從 `quality-baseline.json` 刪除 `_policy`（重新啟用 `--require-tighten` 與 nightly
   banking），並在 `check-openapi-coverage.mjs` 中還原 `THRESHOLD = 36`（或更高）。
3. 在模組化帶來改善的部分，進一步收緊至低於測量值的門檻：檔案大小的 `cap` 恢復為 1000
   （或 800）、覆蓋率下限提高 5，以及模組化套件的 dead exports 設為 0。

## Ratchet 基準線 (`quality-baseline.json`)

Ratchet 引擎 (`scripts/quality/check-quality-ratchet.mjs`) 會讀取 `quality-baseline.json`
並將其與新收集的 `quality-metrics.json` 進行比較。任何超出其 epsilon 而發生退化的指標都會使建置失敗。

目前追蹤的指標：

| 指標                  | 方向   | 意義                    |
| --------------------- | ------ | ----------------------- |
| `eslintWarnings`      | `down` | ESLint 警告數量不得增加 |
| `coverage.statements` | `up`   | 陳述式涵蓋率不得下降    |
| `coverage.lines`      | `up`   | 行涵蓋率不得下降        |
| `coverage.functions`  | `up`   | 函式涵蓋率不得下降      |
| `coverage.branches`   | `up`   | 分支涵蓋率不得下降      |

若要在確實改善後更新基準線：

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 旗標會將目前測量的值寫入 `quality-baseline.json`。
將改善納入基準線是發行／夜間工作，而不是功能 PR 的工作：`--require-tighten`
（Fase 6A.5）只會在發行模式（推送、排程、發行 PR、本機執行）中，針對尚未納入基準線的改善使檢查失敗。
在功能 PR（`pr` gate mode）中，它會將改善列為資訊並通過；在兩種模式中，退化都會導致失敗。
在速度階段，所有地方都僅提供建議（`_policy.requireTighten: false`）。請參閱
[發行時寫入的產生檔案與衍生基準線](#generated-files-and-derived-baselines-written-at-release)。

### CodeQL ratchet：重新整理週期與手動觸發

`check:codeql-ratchet` 讀取的是**按排程重新整理的儲存庫狀態，而不是每個 PR 的狀態。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` 回報
`state: configured`、`schedule: weekly`：這是 GitHub 的預設設定掃描，而不是每次推送時的分析。
結果是：修正警示的 PR 合併後，ratchet 會持續讀取舊的、較高的數量，直到下一次排程掃描執行為止——因此在掃描追上之前，
它會在每個開啟的 PR（包括修正 PR 自身的後續 PR）中回報退化。

**手動重新整理**：`gh workflow run codeql.yml --ref release/vX.Y.Z` 會重新執行
分析，並在數分鐘內重新發布警示。先閱讀 `.github/workflows/codeql.yml` ——
其標頭說明它僅支援 `workflow_dispatch`，**因為這會與 GitHub 的「預設設定」衝突**
（`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`）。恢復 `push`/`pull_request`/
`schedule` 觸發程序需要先由**擁有者執行操作**：Settings → Code security →
CodeQL: Default → Advanced。未進行該切換前，請勿新增 `schedule:` 觸發程序 ——
它只會產生失敗的執行結果。

**數量下降後收緊基準線** — `node scripts/check/check-codeql-ratchet.mjs
--update` 會將新的測量數量寫入 `quality-baseline.json` →
`metrics.codeqlAlerts.value`，使 ratchet 不會悄悄允許數量回升至舊的上限。工作範例（2026-09-02/03）：
PR #12502 修正了 7 個實際警示（測量到的開啟警示數量由 13 → 6）；PR #12530 將凍結的基準線從 11 → 6 收緊以符合現況；
接著其餘 6 個警示透過逐項提供理由予以駁回，使開啟數量降至 0。

**是否駁回警示由操作人員決定（硬性規則 #14）** — 絕不在駁回 CodeQL 警示時不記錄技術理由於駁回留言中：
對於上游協定要求，使用 `won't fix`；對於測試裝置，使用 `used in tests`；對於 CodeQL 無法辨識的清理器，使用 `false positive`
（先例：`docs/security/ERROR_SANITIZATION.md`）。

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

## 產生的檔案與衍生基準（於發佈時寫入）

計畫 2026-11-13（「衍生數字與文字僅在發佈時解析」）：一個功能 PR 會變更
**來源** — `src/shared/constants/providers.ts`、`docs/openapi.yaml`、技能目錄、
免費方案目錄，以及新的 e2e 規格。它不會重新產生由該來源計算出的檔案，也不會將測得的改善值寫入基準。
這些檔案會由發佈重新整理（`release:refresh-derived`）或 nightly refresh PR 重寫一次。在此之前，每個相鄰的
PR 都會攜帶自己重新產生的副本，並與下一次合併發生衝突（2026-11-13：321 個開放
PR 中有 30 個重寫了 `PROVIDER_REFERENCE.md`，26–28 個重寫了 README 圖表）。

**防護機制。** `check:pr-derived-paths`（工作 `pr-test-policy`）會讓觸及
`config/quality/derived-paths/` 中某個系列檔案的功能 PR 失敗：

| 系列        | 檔案                                                                                                                                                           | 由誰重寫                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`；`docs/reference/PROVIDER_REFERENCE.md`；十二個產生的 README SVG；`skills/*/references/**`；沒有自訂區塊的 `SKILL.md` 檔案 | `release:refresh-derived`（facts）、`gen:provider-reference`、`docs:readme-diagrams`、`generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                              | `balance-e2e-shards.mjs --sync`（`syncE2eTimings()`）                                                                     |

寫入者（`release/v*`、`chore/derived-*`，以及基準的 `chore/bank-ratchet-*`）可免於此限制；只變更一個系列及其
伴隨檔案的 PR 也同樣免除（對於 `generated`：產生器指令碼、其測試、agent-skill 輸入 — `src/shared/constants/agentSkills.ts`、手寫的 `skills/**`
文件、`docs/openapi.yaml` — 以及 `changelog.d/**`），例如英雄版面變更及其重新產生的 SVG，
或測試會讀取重新產生的 `SKILL.md` 檔案的技能修正。含有手寫
`<!-- skill:custom-start -->` 區塊的 `SKILL.md` 不屬於該系列：其自訂區塊仍可在功能旁編輯。

**各閘道模式的檢查**（`scripts/check/lib/gateMode.mjs`；輔助程式
`scripts/check/lib/derivedArtifactScope.mjs`）：

| 檢查                                                                  | `release`（push、排程、release PR、本機）                      | `pr`（功能 PR、佇列批次）                                                                                                                                                   |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                             | 每個技能都必須等於產生器輸出                                   | 僅檢查 PR 編輯的技能（其產生文字（自訂區塊以外）或 `references/`）；否則為 `SKIP reason=pr-mode`                                                                            |
| `check:generated-artifacts`（README SVG + e2e timings；需要完整歷史） | 每個 SVG 都必須等於其產生器輸出；每個規格都必須有 timings 項目 | 僅檢查 PR 編輯的成品；其餘為 `SKIP reason=pr-mode`；沒有差異基準 → 檢查每個成品（失敗關閉）                                                                                 |
| README SVG 位元組比較測試（`tests/unit/docs/readme-*-svg.test.ts`）   | 每個 SVG                                                       | 僅檢查 PR 編輯的 SVG（在基準可解析時）；`test-unit` 的淺層 PR checkout 沒有基準，因此測試會以 `SKIP reason=base-unresolved` 略過，並由 `check:generated-artifacts` 負責比較 |
| e2e timings 完整性（`tests/unit/balance-e2e-shards.test.ts`）         | 每個規格都必須有項目                                           | 與 SVG 測試相同的規則（新規格會以中位數權重執行）                                                                                                                           |
| `check-quality-ratchet.mjs --require-tighten`                         | 未入帳的改善會失敗（除非 `_policy`）                           | 回報改善，但永不失敗；回歸仍會失敗                                                                                                                                          |

Release 模式保留這些檢查在拆分前的判定結果、結束碼和訊息；最多會新增一行，用於標示解析後的模式（`[agent-skills-sync] mode=release (auto: local run)`）。
測試會透過 node:test 的 `{ skip: releaseOnlyUnlessTouched(...) }` 選項略過，而
`check:test-masking` 會在僅報告區塊中列出此選項（它既不是 `.skip(`，也不是 `{ skip: true }`，因此
不會算作硬略過）。`check:generated-artifacts` 會在基底可解析的位置執行：工作 `lint`（`fetch-depth: 0`），緊接在
`check:agent-skills-sync` 之後。在本機執行
`npm run check:generated-artifacts -- --mode=pr` 可查看該步驟在 PR 上判定的內容。`check:docs-counts` 的提供者總數
交叉檢查（「Provider reference total (doc vs live modules)」）屬於計數閘門的一部分，並遵循該閘門自身的模式。

刻意不歸入任何家族：由人員決定的政策檔案（`gate-manifest.json`、允許清單、
`admission-policy.json`、`provider-assets-provenance.jsonl`、`model-lifecycle.json`），以及功能 PR 可能必須與程式碼
一同修改的上限（`quality-baseline.json` 的指標項目、類型檢查／檔案大小／複雜度基準、`eslint-suppressions.json` — 當 PR 修正
已凍結的違規時，由提交前的 ESLint 執行程序刪減）。`src/i18n/routeNamespaces.generated.json` 也
是產生的檔案，但仍保留在功能 PR 中：應用程式會在執行階段匯入它，因此無法等到重新整理時才處理。

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

## 白名單政策

每個無法因既有違規而失敗的 gate 都使用凍結的白名單
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。政策如下：

**修正根本原因；僅在違規原本就存在，且無法在同一個 PR 中修正時，才使用白名單。**

新增白名單項目時：

1. 加入包含正當理由的註解。
2. 參照追蹤議題（例如：`// #3498 — Phase 2 feature, not yet implemented`）。
3. 在修正違規的同一個 PR 中移除該項目 — 不再抑制作用中違規的過時項目本身就是缺陷（實作 6A.3 過時執行檢查後，孤立的白名單項目將使 gate 失敗）。

**請勿為了讓測試更快通過而新增白名單項目。** 白名單持續增長但 gate 顯示為綠色，只是一種品質良好的錯覺。

### 當 gate 在你的 PR 上失敗時

1. **仔細閱讀 gate 輸出** — 它會明確指出違反規則的檔案或符號。
2. **修正違規** — 大多數 gate 都是確定性的檔案系統檢查，只要程式碼正確就會通過。
3. **如果違規原本就存在**（也就是說，並非由你引入，但現在涵蓋於 gate 中）：加入包含正當理由註解及追蹤議題的白名單項目。
4. **如果 gate 是 ratchet**（涵蓋率、ESLint 警告、重複程式碼、複雜度）：表示你的變更使指標惡化。請修正根本問題；或（極少數情況下）執行
   `npm run quality:ratchet -- --update`，如果該變更是刻意的，且指標惡化可接受 — 但請在 PR 說明中記錄原因。
5. **建議性 gate**（`continue-on-error: true`）僅供參考 — 不會阻擋合併，但會出現在 CI 摘要中。仍請修正這些問題。

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

## 合理化待辦清單（ROI 審查 — 第 9 階段第 3 波）

此清單已於 2026-06-17 與 `ci.yml` 進行核對（先前版本遺漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。對核對後的集合進行 ROI 審查後，
確認了以下合理化候選項目。**合併是機械式的 CI 變更；切換／刪除則是保留給操作人員的政策決策。** 以下項目目前尚未套用。

**上方同樣未記錄的項目**（建議性、低訊號）：`docs-lint` 工作
（markdownlint + Vale，整個工作均設為 `continue-on-error`），以及獨立的掃描器工作流程
`semgrep.yml`／`codeql.yml`／`scorecard.yml`。`semgrepFindings: 0` 位於
`quality-baseline.json` 中，但未連接至 `ci.yml` 的阻擋式 ratchet — 此指標目前是孤立的。

### 合併／去重（機械式、較低風險）

每個候選項目都已於 2026-06-17 根據即時閘門狀態進行驗證（信任但驗證）；
其中數個「顯而易見」的合併結果被證實隱藏著技術債，因此**並非**可直接套用的合併。

- **`check:docs-sync` 執行兩次** — 在 `lint` 工作中獨立執行一次，並再次包含於 `check:docs-all`（`docs-sync-strict`）和 husky pre-commit hook 中。✅ **已完成** — 已移除獨立的 `lint` 呼叫。
- **CVE 掃描** — ❌ **並非乾淨的合併。** `audit:deps` 會阻擋所有五個 lockfile 中的重大公告和不完整稽核，同時依目前政策將高風險公告列為警告；`check:vuln-ratchet`（osv）僅在相較於已提交基準線發生_regression_時失敗，並在需要測量值時拒絕缺少測量值。語意不同 — 捨棄 `audit:deps` 將失去絕對重大風險閘門和獨立的套件稽核收據。兩者都保留。
- **循環偵測** — ✅ **已完成**（#15159 G-01/G-02）。此處舊文字將 `check:cycles` 稱為「綠色、精選的」閘門，並以 `check:circular-deps`（dpdm）回報 91 個循環為由，說明為何保留其阻擋功能。該綠色狀態是**錯誤的綠色**：`check:cycles` 掃描了 5 個子目錄（450 個檔案），只比對靜態的 `import|export … from`，並捨棄所有 `@/` 和 `@omniroute/open-sse/` 指定符，因此無法偵測主導儲存庫的動態匯入加別名循環。已修正：此閘門現在會遍歷 `src` + `open-sse`（5023 個檔案），從 TypeScript AST 收集指定符（因此 `import("…")` 會計入，而類型位置的 `typeof import("…")` 不會），並解析 tsconfig `paths`。它找到了 **14** 個循環，而非 0 個。由於 14 個既有循環無法在閘門 PR 中修正，`check:cycles` 現在是 **ratchet**（`--ratchet`，`quality-baseline.json` 中的上限 `metrics.cycles.value = 14`，`direction: down`）— 它會阻擋任何_回歸_，且數量只能下降。CI 執行 `npm run check:cycles:ratchet`。消除循環的工作與 **A-01** 一併進行。`check:circular-deps`（dpdm）作為範圍更廣的第二意見，仍維持建議性質。
- **複雜度** — ✅ **已完成**（`check:complexity-ratchets`／`eslint.complexity-ratchets.config.mjs`）：一次 ESLint 遍歷，依 ruleId 計數，使圈複雜度與 max-lines 以及認知複雜度基準線保持獨立；個別的 `check:complexity`／`check:cognitive-complexity` 仍保留供本機使用 `--update`。
- **`/api` 反幻覺** — ✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：對 `src/app/api` 進行一次 FS 清查，openapi-routes + docs-symbols 仍分別回報；個別項目仍保留供本機執行。
- **`check:node-runtime` 在 11 個工作中執行** — ⚠️ **ROI 低。** 每個都是獨立的 runner，而此檢查耗時 <1 秒；總節省時間約 10 秒，卻會失去低成本的每工作防護。無值得進行這項變更。
- **CI lint 中的 `typecheck:noimplicit:core`** — ✅ **已從 lint 工作移除**（原本是建議性質的 `continue-on-error`）；阻擋式類型範圍為 `typecheck:core` + `check:type-coverage`。本機指令仍保留。

### 切換／決定（操作人員政策）

- `check:openapi-security-tiers`（建議性質）— ❌ **無法乾淨地切換。** 它會以結束碼 0 結束，但警告 `LOCAL_ONLY_API_PREFIXES` 下的數個 `traffic-inspector` 路由缺少 `x-loopback-only: true` 註解。若要強制執行，必須先將這些註解加入 `openapi.yaml`。
- `typecheck:noimplicit:core`（建議性質）— 大致已由阻擋式的 `check:type-coverage` ratchet 涵蓋。可切換為 ratchet，或捨棄多餘的第二次 `tsc` 傳遞。
- `test:vitest:ui`（目前為**阻擋式**）— 既有失敗已透過 `vitest.config.ts` 中的 `// #8618` 追蹤註解明確排除；新的失敗會使工作失敗。
- `check:secrets`（gitleaks，阻擋式 ratchet 凍結於 3 個已記錄的誤判）— 將這 3 個誤判加入允許清單以達到 0，或降級為建議性質。與 GitHub 原生 secret-scanning + `check:public-creds` 有重疊。
- `check:pr-evidence`（阻擋式，會 grep PR 內文）— 誤判風險高；若捨棄，將削弱 Hard Rule #18 的執行，因此這是真正的政策決策。
- `semgrep`（建議性的獨立項目）— 與 CodeQL 在 OWASP 系列上有重疊；將其基準線連接至 ratchet，或捨棄。

## 相關文件

- 軟體供應鏈（來源追蹤、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 金鑰集合一致性閘門

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，工作 `i18n-ui-coverage`）。
比較每個 `src/i18n/messages/<locale>.json` 與 `en.json` 的葉節點金鑰集合，若有任何缺少或多出的葉節點便失敗，
無論該金鑰何時加入。`__MISSING__:` 佔位符會計為已存在（其內容由比例閘門處理）。這是兩個基於差異／百分比閘門的絕對互補：
`check-ui-keys-coverage` 對每個語系強制 80% 的下限（約 13,000 個金鑰中缺少 43 個仍會顯示 99.7%），而
`check-new-key-coverage` 只判定 PR 加入 `en.json` 的金鑰。語系批次是從分支建立當日的 `en.json` 產生，
並持續翻譯數日，而基礎分支仍持續加入金鑰；該批次 PR 本身不加入任何金鑰，因此當批次 1（#13044）在九個語系中少了 43 個金鑰，以及批次 2（#13660）在八個語系中少了 10 個金鑰（2026-09-15）時，
兩個同級閘門都保持沉默。使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修正紅燈；`extra` 葉節點表示來源已移除該金鑰 — `sync-ui-keys` 會移除它（`--prune-extra` 為預設值）。`--warn`
只會回報而不會失敗。
`--catalog=cli` 會對 `bin/cli/locales` 執行相同比較（`npm run i18n:check-keys:cli`）；
兩個步驟都位於工作 `i18n-ui-coverage` 中。絕對檢查僅限發布模式：功能 PR 會看到
`SKIP reason=pr-mode`，修正會在發布重新整理或翻譯批次中執行，絕不會在功能 PR 中執行；變更語系目錄的
PR 則會改以合併基準進行判定（請參閱工作 `i18n-ui-coverage` 下的「兩種模式」）。

#### `check-new-key-coverage` — 新金鑰 i18n 閘門

`check-ui-value-drift` 的同級閘門。前者會捕捉英文值已被**重寫**、但翻譯仍停留原樣的情況；本閘門則會捕捉英文金鑰已被**加入**、但部分語系從未收到該金鑰的情況。

`check-ui-keys-coverage` 看不到這一類問題：它對每個語系強制百分比下限，而約 13,000 個葉節點中缺少 11 個金鑰，涵蓋率仍有 99.9%。單一語言的百分比無法表達「這項功能以未翻譯狀態發布」——整項功能可以在新的語系中加入而沒有任何文字，數字卻永遠不會變動。

它所記錄的事件如下：Orchestration Canvas 第 3 階段在當時已存在的 42 個語系中翻譯了 11 個金鑰。數小時後，EU 語言批次（#13044）將儲存庫擴增至 51 個語系，而新增的九個語系（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）從未收到這些金鑰。`deepMergeFallback` 會以英文替代缺少的金鑰，因此故障模式是未翻譯的 UI，而不是空白的 UI——這是真實問題，而且其設計本身便是無聲的。

與其同級閘門一樣，它具備**差異感知能力**，會比較合併基準與工作樹中的英文，因此既有缺口會維持不變，啟用此閘門也不需要進行遷移。

**`__MISSING__:<english>` 標記不再符合條件（自 2026-09-17 起）。** 過去它是文件記載的延後處理方式——執行時會回退至正確的英文——直到 2026-09-16 有八個功能 PR 新增 61 個金鑰，並在全部 65 個語系中寫入該標記，而非進行翻譯：此閘門接受了每一個金鑰，沒有任何內容阻擋這些 PR，接著會阻擋發布的真實翻譯比例閘門對所有人失敗（pt-BR 為 3.2 % > 2.5 % + 0.5）。現在標記會被判定為缺少翻譯。僅限發布模式，自 2026-11-13 起：功能 PR 會看到
`SKIP reason=pr-mode`，而在發布 PR（`BASE_REF=origin/main`）中，閘門會判定本週期加入的每個金鑰。使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 在發布重新整理或翻譯批次中修正紅燈，或使用
`npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，可安全在分離狀態下執行；若沒有 `OMNIROUTE_TRANSLATION_*` 環境變數則拒絕啟動）並行處理所有語系。必須維持英文的金鑰（固定的產品／引擎／旗標名稱）應放在
`scripts/i18n/untranslatable-keys.json` 中，絕不要使用標記。`vi` 完全禁止標記（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暫停測試閘門

`vitest.config.ts` 的 `exclude` 清單中的檔案是未執行的測試，而閱讀樹狀結構的人會將其視為涵蓋範圍。共有 62 個檔案累積在註解
`// #8618 — pre-existing failure; remove this exclusion when fixed` 之後。問題 #8618 已於
2026-08-11 關閉，但它所追蹤的清單卻從 45 個項目增長至 62 個，每個新增項目都繼承了指向已失效問題的註解。當清單最終逐檔測量時（#13204），**62 個檔案中有 51 個在沒有變更來源的情況下，便能通過目前的樹狀結構**。

此閘門要求每個解析為實際檔案的排除項目：(a) 指定一個追蹤問題，以及
(b) 在 `config/quality/vitest-exclusions.json` 中以其測量狀態列出，讓新增項目成為專用檔案中的可審查差異，而不是在包含 60 個項目的陣列中再增加一行。它刻意不重新執行已排除的測試——這需要約 10 分鐘，應歸屬於定期工作；清冊會記錄每個項目上次測量的時間。
