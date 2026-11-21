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

## 門庫存和執行情況

### 考生錄取

CI和 Quality Gates 工作流程各自發出穩定的結論： `Gate / CI`和`Gate / Quality`。他們的版本化准入政策根據需要或建議列舉了每個上游工作。適用的所需作業必須成功：遺失、取消、跳過、待處理和未知結果無法建立PASS。有效的僅文件或僅目錄分類可能會使程式碼通道不適用； PR草案不是被接受的候選者。 `hotfix`標籤並不放棄證據。

兩個工作流程都涵蓋PRs到main/release分支、推送到`main`、手動調度和合併組事件。推送、調度和合併組運行完整選擇。推送到`release/**`不會啟動它們（2026-10-18）：每個更改都已經在其PR上運行了矩陣，並且合併的組合是 Release-Green 的工作（`docs/ops/RUNNER_BOX.md` →託管通道）。分叉和合併群組使用託管運行器來執行作業，否則會選擇自託管運行器；在推出之前必須驗證足夠的託管容量。

普通的PR運行快速選擇。准入策略的`full-code`和`full-code-e2e`通道（E2E、整合、包工件、 Electron Smoke、 Bun SQLite、生態系統和協定用戶端）僅在 Mergify 佇列草稿或完整運行上運行： `gh workflow run ci.yml --ref <branch>`。

每張JSON收據都標識已簽出的SHA、工作流程運作和嘗試。 CLI拒絕checkout/event SHA不符。工作流程測試將策略成員資格綁定到判定作業的`needs`列表，因此新的或刪除的通道不會悄無聲息地消失。這些收據涵蓋了它們自己的工作流程，而不是發布、部署或現有諮詢掃描器的內部結構。啟動分支規則中的兩個檢查名稱是一項單獨的管理變更；添加這些工作本身並不能保護分支機構。

### 合併隊列

> **2026-11-19: Mergify 合併佇列已停用**（所有者的決定）。 `.mergify.yml`不再定義佇列並拒絕合併或重寫拉取請求的Mergify指令。向發布分支發出的拉取請求會在儲存庫規則集「Require green gates on the active release」 (`Gate / CI` + `Gate / Quality`) 下手動合併，直到omni-queue 在 live 模式下運行，然後透過omni-queue ([OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)) 進行合併。以下所描述的Mergify草稿的工作流程仍在`ci.yml`和`quality.yml`中，但不再開啟Mergify草稿。

`queue`標籤將PR傳送到 Mergify 佇列 (`.mergify.yml`)。 Mergify 在`mergify/merge-queue/`分支上開啟草稿PR ， CI在那裡運行完整選擇，並且當`Gate / CI`、 `Gate / Quality`和`Merge integrity (changelog + generated skills)`通過時原始PR合併。

Mergify 將其佇列摘要寫入草稿的描述中，其他應用程式也可以對其進行編輯。此類草稿上的`pull_request` `edited`事件採用自己的並發組 (`-queue-edit-<run_id>`)，因此它無法取消草稿的實際運行，並且它會跳過門和矩陣。只有`Merge integrity`還在運作。跳過的門作業帶有不同的檢查名稱，因為 Mergify 將跳過的`Gate / CI`讀取為失敗的檢查並使PR出列。

出隊後，推播並不總是將PR重新排隊。評論`@mergifyio queue`吧。

### 在接受減速器中保留證據

`scripts/quality/validate-release-acceptance.mjs`減少提供的計劃及其清單；它沒有確定該計劃涵蓋完整的發布管道。它的報告明確設定了`releaseAcceptance: false`，即使該計劃是`VERIFIED`。 `release-acceptance.yml`工作流程仍然使用影子裝置，而不是真正的建造、打包、啟動或升級收據。

CLI要求`--evidence-root`驗證保留的證據。檔案解析為`<evidence-root>/<artifact_id>/<member>`並散列為SHA-256。沒有證據的PASS記錄、遺失或更改的檔案、不安全的路徑或符號連結都會阻止驗證。遺失的檔案並不等於空的成功日誌。現有的SHA/run/attempt檢查保持獨立：匹配的位元組無法挽救陳舊的收據。文件完整性並不是執行真實性或工件升級的證明。

### 靜態掃描庫存

版本化的 npm-alias 庫存和靜態掃描成員資格位於`config/quality/gate-manifest.json`。執行`npm run check:gate-manifest`以驗證腳本名稱和針對`package.json`的確切命令；新增、刪除和命令漂移都會使本機掛鉤和CI中的變更分類作業失敗。別名不是工作流程作業、矩陣實例或測試案例：這些計數不得以可互換的形式呈現。

使用`npm run quality:scan -- --list`或`npm run quality:scan:fast -- --list`檢查選定的別名而不執行它們。運行程序呼叫 npm 入口點，因此其運行時（包括配置的Bun ）被保留。清單將這些設定檔之外的別名記錄為單獨呼叫的，並且在唯讀掃描設定檔中禁止維護命令。

These profiles cover the static scan only. They do not certify product tests, coverage, packaging, external checks or a candidate's full release acceptance. Workflow admission uses the linked `config/quality/admission-policy.json` and `scripts/quality/admission-verdict.mjs`. Release-observer profiles remain separate; inspect their applicable checks and receipts independently. The full observer's static commands are declared in `config/quality/release-green-static-profile.json`, including `audit:deps`, mutation-test selection and translation checks. The loader validates npm commands against package.json and modeled CI/Quality declarations; it rejects drift instead of executing shell tokens as arguments. Required scanner SKIP/INCOMPLETE output cannot establish PASS. The profile records its external exclusions and does not replace hosted coverage, test matrices, package or deployment evidence. The prose inventory below is a reference, not proof that a gate actually ran.

腳本位於`scripts/check/` （策略門）和`scripts/quality/` （棘輪引擎）下。 CI的事實來源是`.github/workflows/ci.yml`。

### 發布PR快速路徑 (`quality.yml`)

`.github/workflows/quality.yml`補充了main/release PRs上的CI ，推送到`main`、調度和合併組。 PRs使用路徑過濾的快速檢查。永久禁用的重複建置已被刪除； the real build/package/boot checks remain in CI.單元套件和 vitest 僅在CI （`Unit Tests (N/8)`和`Vitest`）中運行。

| 工作                                             | 範圍                                                                                      | 阻塞           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API文件參考與文件全部                                                      | 是的           |
| `Fast Quality Gates`                             | 程式碼PRs；靜態檢查、類型檢查、儀表板類型檢查、受影響的單元測試、被遺忘的同級測試（諮詢） |
| `No new ESLint warnings`                         | 代碼PRs；抑制感知的棉絨防護                                                               | 是的，包括叉子 |
| `Merge integrity (changelog + generated skills)` | 非草稿PRs；變更日誌和產生的技能同步                                                       | 是的，包括叉子 |

#### 忘記兄弟姐妹測試報告

`npm run check:forgotten-sibling-tests`作為`Fast Quality Gates`的諮詢步驟運行，並重複使用測試影響圖背後的導入解析器。對於每個變更的生產模組，當拉取請求差異中缺少候選測試時，它會報告確定性`changed module/symbol -> static consumer -> candidate sibling test`鏈。 Markdown 摘要和JSON結果將保留為`forgotten-sibling-tests`工作流程工件，以便在任何阻止推出之前進行校準。

桶再匯出和動態匯入僅用於解析度診斷； they never create a blocking finding. 在`config/quality/forgotten-sibling-allowlist.json`中查看異常。每個條目必須命名消費者和候選測試，給出具體的理由，並連結GitHub問題或拉取請求。格式錯誤的條目無法關閉。異常無法抑制已刪除的候選測試或添加`.skip`/`.todo`的差異；斷言弱化和其他屏蔽仍然由獨立阻塞的`check:test-masking`門擁有。

### 職位： `lint`

在每個PR到`main`上運行。失敗時區塊合併。

| 腳本（`npm run ...`）             | 驗證                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 阻塞                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | Node.js版本在支援範圍內                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是的                                |
| `check:cycles`                    | 跨所有`src/` + `open-sse/`的循環導入（基於 AST，tsconfig `paths`已解決）。只要存在任何循環（自#15281以來失敗關閉），Bare 就會退出 1 並列出SCCs。 `check:cycles:ratchet` （ CI運行的）當計數超過`quality-baseline.json` —中的`metrics.cycles`上限時阻塞，當前為14， `direction: down`，因此它只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                     | 是（棘輪）                          |
| `check:boundary`                  | `open-sse → src` coupling: unique file-to-file imports from the engine into the app (`scripts/quality/measure-boundary.mjs`; the edge list is the v4 core/module-split remediation backlog). Bare = advisory report (same as `quality:boundary`). `check:boundary:ratchet` (what CI runs, also in the `quality.yml` fast-gates ratchet loop) blocks when the count exceeds the `metrics.boundaryOpenSseToSrc` ceiling in `quality-baseline.json` — seeded at the measured 771, `direction: down`; `--update` only lowers it; base-relative on PRs (`--base-ref`, see below)                                                                                                                  | 是（棘輪）                          |
| `check:route-validation:t06`      | 所有路由上都存在Zod架構（第 6 層策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是的                                |
| `check:any-budget:t11`            | `@ts-expect-error // any`數量不超過預算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是的                                |
| `check:provider-consistency`      | `providers.ts`中的每個提供者在`providerRegistry.ts`中都有一個匹配的條目（反之亦然，在允許清單中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                |
| `check:model-lifecycle`           | 三個手動維護的路由表與簽入的生命週期快照（#11503）保持一致： `FITNESS_TABLE` （`taskFitness.ts`）沒有獲得`REGISTRY`可以路由的退休ID；每個`BUILT_IN_ALIASES`目標都存在於`REGISTRY`中，但不存在於退休 ID 快照中； `REGISTRY`中的每個已退休 ID 都會轉送或列在`allowedRetiredInCatalog`中出現在`DEFAULT_DEGRADATION_MAP` IDiq這並不能證明模型目前由即時上游提供服務。離線—與`config/quality/model-lifecycle.json`進行比較，使用`npm run quality:refresh-model-lifecycle`手動刷新（網路；未連接到CI）。 `allowedRetiredInCatalog`是燃盡棘輪：僅添加具有追蹤問題的條目。                                                                                                                           | 是的                                |
| `check:fetch-targets`             | 客戶端`src/`中的每個`fetch("/api/...")`都會解析為真正的`route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                |
| `check:deps`                      | 儲存庫中每個`package.json`的所有`npm install` -able依賴項都在`dependency-allowlist.json`中；新的未固定或已標記的包裹                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `audit:deps`                      | 對所有五個獨立鎖定檔案（root、 Electron、 OpenCode插件v1/v2和提供者）進行 npm 審核。關鍵建議塊；高度警告仍然是明顯的警告。 Missing/failed審計有INCOMPLETE和block；保留每個範圍的鎖雜湊和報告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                |
| `check:lockfile`                  | `package-lock.json`完整性— https 登錄、完整性雜湊、無主機覆蓋                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                |
| `check:licenses`                  | 生產依賴項的SPDX許可證白名單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                |
| `check:tracked-artifacts`         | 沒有建立工件/提交的`node_modules`符號連結（也在 husky 預提交中運行；預推送有意為輕— #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                |
| `check:ai-attribution`            | PR提交、標題或正文中沒有AI/bot `Co-Authored-By`預告片或 AI 生成頁腳—硬規則#16 （在PR→ `release/**` — `quality.yml`快速門循環#14436讀取事件負載， PRs →— `commit-msg`操作和`ci.yml` lint 中`main`人類PR                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | 每個Vitest排除都會命名一個追蹤問題並出現在`config/quality/vitest-exclusions.json` (#13204) 中                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                |
| `check:file-size`                 | 來源檔案（ `src/`、 `open-sse/`、 `electron/`、 `bin/`中的`.ts`/`.tsx` ）保留在`cap`中，測試檔案（`*.test.ts(x)`）保留在`testCap`中；凍結在`file-size-baseline.json` (`frozen` / `testFrozen`) 中的檔案不得超過其記錄的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                |
| `check:error-helper`              | executors/handlers中的錯誤回應使用`buildErrorBody()` / `sanitizeErrorMessage()` （硬規則#12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                |
| `check:migration-numbering`       | 移轉檔名：舊的`001`–`241`系列被凍結，新檔為`YYYYMMDDHHMMSS_<description>.sql`。針對PR基礎，它拒絕已刪除的遷移、沒有相容性條目的重命名遷移，以及最終架構無法交換的無序或編輯的遷移                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:public-creds`              | `publicCreds.ts`之外沒有文字OAuth `client_id`/`client_secret`或 Firebase Web 金鑰（硬規則#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                |
| `check:db-rules`                  | `src/lib/db/`模組之外沒有原始SQL ；沒有從`localDb.ts`進口桶（硬規則#2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是的                                |
| `check:known-symbols`             | 在其調度表中註冊的提供者執行程式、路由策略和轉換器與磁碟上的檔案—沒有孤立或未聲明的符號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是的                                |
| `check:route-guard-membership`    | 每個生成子程序的路由都依`isLocalOnlyPath()`分類（硬規則#15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                |
| `check:test-discovery`            | 儲存庫中的每個`*.test.ts` / `*.spec.ts`檔案都由至少一個測試運行程式收集（棘輪： `test-discovery-baseline.json`中的孤兒清單只能縮小）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `check:test-tla-order`            | `tests/unit`下沒有`node:test`檔案註冊測試，命中頂級`await`，然後註冊更多（#18045；棘輪： `test-tla-order-allowlist.json`只能收縮）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                |
| `check:agent-skills-sync`         | 產生的代理技能工件與其來源目錄相符（無偏差）。釋放模式檢查每項技能；功能PR （`pr`模式）僅檢查其編輯生成文本的技能—請參閱[生成的文件和派生基線](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | 提供者logos/assets帶有記錄的出處條目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON設定檔解析並滿足 repo lint 規則                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript編譯沒有錯誤（僅建議警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `typecheck:noimplicit:core`       | 嚴格`noImplicitAny` —前瞻性；許多預先存在的呼叫站點仍然需要註釋                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **諮詢**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`範圍為`src/app/(dashboard)/**` (#7033) — `typecheck:core`的策劃的 27 個文件允許列表不包括任何儀表板TSX，並且`next build`也從不對其進行類型檢查（`next.config.mjs`設置`ignoreBuildErrors: true`），因此那裡的孤立標識符（#6625/#6909）對CI是不可見的。與凍結的per-file/per-TS-code計數基線不同（`config/quality/dashboard-typecheck-baseline.json`，與`check:known-symbols`相同的過時執行模式） —只有超出基線計數的NEW錯誤才會通過閘；當預先存在的錯誤被修復時，使用`--update`逐步降低。                                                                                                                                                                                                 | 是的                                |
| `check:build-typecheck`           | 對`tsconfig.build.json` （`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`）進行整個應用程式生產類型檢查，表面`typecheck:core`的 27 個檔案白名單和儀表板門不包括在內。與`config/quality/build-typecheck-baseline.json`不同；新的或增加的每個（檔案、代碼）計數失敗，較低的計數要求您進行棘輪調整。當運行包含新的或提升的對時， `--update`會拒絕，除非通過`--force-regressions` ，並且拒絕新的靜默文件，除非通過`--force-nocheck` ，因此加寬基線以變為綠色並授予永久靜默是兩個單獨的故意行為。裸露的`--force`被拒絕。也根據`config/quality/ts-nocheck-baseline.json`掃描`@ts-nocheck`的構建範圍，因為使用它的文件根本不報告任何診斷信息，否則對每個門都是不可見的。 | 是的                                |

#### 兩個類型檢查程序的答案不同

`typecheck:core`和`check:build-typecheck`在不同的選項下編譯不同的程序，同一個檔案可以在一個中是乾淨的，而在另一個中則充滿錯誤。

`tsconfig.build.json`設定`"strict": false`，因此`noImplicitAny`關閉。核心配置使用更嚴格的選項編譯一個包含 27 個檔案的允許列表，並遵循每個條目的導入圖，因此從未出現在建置程式中的檔案仍會在那裡進行檢查。

在判斷文件是否輸入時，結果很重要：** `check:build-typecheck`下的零診斷並不意味著零**。從 26 個檔案中剝離`@ts-nocheck`顯示其中 23 個檔案在建置程式中是乾淨的；其中 16 個出現了大約 120 個隱含的嚴格錯誤。在呼叫文件清理之前檢查兩者。

### 職位： `quality-gate`

在`test-coverage`之後運行。失敗時區塊合併。

| 腳本                         | 驗證                                                                                                                              | 阻塞           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `quality:collect`            | 發出`quality-metrics.json` （ESLint警告計數，合併分片報告的覆蓋範圍）                                                             | 是（棘輪上游） |
| `quality:ratchet`            | `quality-baseline.json`中的每個指標都沒有回歸（ESLint警告≤基線；覆蓋≥基線）                                                       | 是的           |
| `check:duplication`          | 程式碼重複 (jscpd@4) 不超過`quality-baseline.json`中的基線                                                                        | 是的           |
| `check:complexity`           | 檔案級圈複雜度不超過上限（核心ESLint `complexity` + `max-lines-per-function`）                                                    | 是的           |
| `check:cognitive-complexity` | 認知複雜度棘輪 (`eslint-plugin-sonarjs`) —單獨ESLint通行證； CI將兩者合併為單一`check:complexity-ratchets`步驟運行                | 是的           |
| `check:dead-code`            | 未使用的匯出/文件棘輪（刀）與基線相比不會回歸                                                                                     | 是的           |
| `check:compression-budget`   | 壓縮基準預算—每引擎代幣節省下限不得回歸                                                                                           | 是的           |
| `check:type-coverage`        | 百分比型棘輪 (`type-coverage`) 不會回歸；很大程度包含`typecheck:noimplicit:core`                                                  | 是的           |
| `check:codeql-ratchet`       | 打開CodeQL警報計數不會回歸（透過`gh api`讀取；無需令牌即可優雅跳過） —刷新節奏和手動觸發：請參閱下面的“CodeQL棘輪”                | 是的           |
| `check:type-scale-ratchet`   | 套件類型比例：12 px 以下的尺寸和`src/`中的`font-bold`只會下降（`typeScaleSubFloorSizes`、 `typeScaleFontBold`）；也在預提交掛鉤中 | 是的           |

### 職位： `quality-extended`

混合作業，沒有作業等級`continue-on-error`：透過`--ratchet`的步驟在測量迴歸與`quality-baseline.json`上失敗。只有`check:circular-deps`和掃描器安裝步驟是建議性的（步驟等級`continue-on-error: true`）。外部掃描器透過`gh release download`安裝；當 gitleaks 不存在時， `check:secrets`會自我跳過（退出 0），而`check:vuln-ratchet`、 `check:workflows`和`check:openapi-breaking`當缺少測量值時會失敗關閉。

| 腳本                     | 驗證                                                                                                                                                    | 阻塞                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `check:circular-deps`    | 無迴圈依賴 (dpdm)                                                                                                                                       | **諮詢**                        |
| `check:bundle-size`      | 捆紮尺寸不超過上限；無法測量的尺寸也會失敗                                                                                                              | **使用--ratchet進行阻止**       |
| `check:secrets`          | 如果二進位檔案不存在，秘密掃描 (gitleaks) —會跳過                                                                                                       | **使用--ratchet進行阻止**       |
| `check:vuln-ratchet`     | 依賴項漏洞（osv-scanner）不會回歸—如果未測量， `--ratchet`會像INCOMPLETE一樣失敗（退出 2）                                                              | **使用--ratchet進行阻止**       |
| `check:workflows`        | 工作流程 lint (actionlint + zizmor)； missing/broken掃描器、無效報告或缺少棘輪基線會失敗，如INCOMPLETE。有效的結果遵循選定的strict/advisory/ratchet政策 | 需要執行; zizmor 棘輪在CI中阻塞 |
| `check:openapi-breaking` | 針對固定事件提交的公共API合約（PR merge-base、push before、merge-group base； scheduled/manual checkout 第一個父級）；所需測量失敗關閉                  | **使用--ratchet進行阻止**       |

### 職位： `docs-sync-strict`

在每個PR到`main`上運行。失敗時區塊合併。

| 腳本                           | 驗證                                                                                                             | 阻塞                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | 依序運行下面 6 個子門的元門                                                                                      | 是的                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI版本一致性；發布模式還有 66 個`llm.txt`鏡像和翻譯的CHANGELOG部分（PR模式：鏡像同意）          | 是的                        |
| ↳ `check:docs-counts`          | 散文中的計數（提供者計數、遷移計數等）。兩種模式： `pr`功能PRs， `release`其他地方—請參閱下面的“派生值”          | 是的                        |
| ↳ `check:env-doc-sync`         | `.env.example`中的每個環境變數都會記錄在文件表中，反之亦然                                                       | 是的                        |
| ↳ `check:deprecated-versions`  | 文件中沒有已棄用的版本字串                                                                                       | 是的                        |
| ↳ `check:doc-links`            | 文件中的內部降價連結解析為真實文件（`[text]`/`(path)`形式）                                                      | 是的                        |
| ↳ `check:fabricated-docs`      | 文件中引用的路由、環境變數、 CLI命令、掛鉤名稱和檔案路徑存在於程式碼庫中。通過`--strict`硬門；沒有標誌的軟故障。 | 是（透過CI中的`--strict` ） |
| `check:cli-i18n`               | CLI `t()`密鑰存在於`bin/cli/locales/en.json` （兩種模式）；pt-BR / zh-CN / zh-TW 僅在發布模式下與`en.json`同等   | 是的                        |
| `check:openapi-coverage`       | OpenAPI規範至少涵蓋真實路線的棘輪地板                                                                            | 是的                        |
| `check:openapi-security-tiers` | `openapi.yaml`中的安全層註釋與`routeGuard.ts`分類一致                                                            | **諮詢**                    |
| `check:openapi-routes`         | `openapi.yaml`中的每條路徑都會解析為真正的`route.ts` （反幻覺）                                                  | 是的                        |
| `check:docs-symbols`           | `docs/**/*.md`中的每個`/api/...`引用都會解析為真正的`route.ts` （反幻覺）                                        | 是的                        |
| `i18n translation drift`       | `docs/i18n/**`鏡像 vs `.i18n-state.json` —關於PRs的諮詢（鏡像透過翻譯波刷新），嚴格推送和每晚                    | **諮詢**上PRs               |

#### 翻譯鏡像是衍生檔（PR模式與release模式）

PR功能僅編輯英文來源。 `docs/i18n/<locale>/**`鏡像（包括 66 個`llm.txt`副本和翻譯後的`CHANGELOG.md`檔）和`.i18n-state.json`由翻譯波（`docs/i18n-*` / `chore/i18n-*`分支，預定的`i18n-mirror-refresh.yml`）和發布（`npm run release:sync-changelog-i18n`）一步重寫。因此，鏡像閘門以兩種模式運行，由`scripts/check/lib/gateMode.mjs`解析（`--mode=pr|release`，然後`OMNIROUTE_GATE_MODE`，然後 Actions 事件；本地運行是`release`）：

- `check:docs-sync` —發布模式運行每次檢查。 PR模式保留package.json/OpenAPI版本、根CHANGELOG标题和取代的文档防护，并为`llm.txt`镜像副本和翻译的CHANGELOG部分—打印`SKIP reason=pr-mode` ，除非PR写入镜像：在`config/quality/derived-paths/*.json`中声明为`docs/i18n/**`系列编写器的头分支严格运行这两项检查，并且当 diff 基解析时，其自己的 diff 编辑`docs/i18n/<locale>/llm.txt`或`CHANGELOG.md`更改会严格运行该检查。 diff 基础不会在depth-1签出（ `docs-sync-strict`作业）中解析，因此PR模式还运行一项不需要基础的检查：每个`llm.txt`镜像都必须存在，保留其`---`分隔符并携带根主体或大多数镜像共享的主体。移動的底座會使所有鏡子同樣陳舊和失效；對一個鏡像的手動編輯失敗。翻譯後的`CHANGELOG.md`檔案在depth-1 PR簽出中沒有此類檢查。
- 預提交掛鉤運行`check-docs-sync.mjs --mode=pr`：根據提交的作用來判斷提交。如果沒有該標誌，本地運行就是發布模式，並且編輯根`llm.txt`的合併PR將阻止該基礎上的每個後續提交，直到 Wave 運行。同样的规则适用于 Husky 钩子运行的任何模式感知门：钩子传递`--mode=pr`，并且严格的判决保留在发布模式运行中（发布PR，推送到`main`，一个普通的本地运行）。
- 鏡像內容單元測試（`tests/_helpers/mirrorFreshness.ts`： `cycle-docs-mirror-contract`、 `resilience-pre-dispatch-docs-mirrors`、 `cli-env-quality-docs-mirrors`、 `docs/*-locales`） —發布模式斷言每個區域設定。 PR模式根據`.i18n-state.json` （整個文件哈希，或測試引腳的部分記錄的部分哈希）僅斷言英文源當前的鏡像，並有理由跳過過時的鏡像。 `target_hash`來源檢查在兩種模式下針對每個區域設定運作。新鮮度是每個`## `部分，單位`run-translation.mjs`哈希值；較長的部分（該文件的門庫存大約是其中的一半）意味著其中的任何編輯都會使這些鏡像變得陳舊，並且它們的 PR 模式斷言會跳過，直到下一波。英文來源不再包含的錨點會退回到整個文件比較。
- `i18n translation drift` —關於PRs諮詢，嚴格推送、夜間和發布削減，因此過時的鏡像無法在發布中發布。

`scripts/i18n/sync-llm-mirrors.mjs` (also exported as `syncLlmMirrors()`, with `--dry-run`) rewrites the `llm.txt` mirrors; the release refresh, the translation wave and the scheduled `i18n-mirror-refresh.yml` run it (the refresh detects stale `llm.txt` mirrors with a dry run, since the drift report does not list them, and syncs them before `check:docs-all`).

`docs/diagrams/`下的 12 個README SVGs已產生（`scripts/docs/gen-readme-<name>.mjs`； `npm run docs:readme-diagrams`重新產生所有這些）。每個都有一個位元組比較單元測試（`tests/unit/docs/readme-*-svg.test.ts`、 job `test-unit`），當提交的文件在發布模式下過時時，該測試會失敗；在PR中， `check:generated-artifacts`判斷PR編輯的SVG ，並且基礎的漂移留給發布刷新（請[參閱生成的文件和派生基線](#generated-files-and-derived-baselines-written-at-release)`<text>` — — `check:docs-counts` `<text>` SVG規範數字檢查讀取`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) 中列出的檔案： `docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`，以及`public/images/tier-flow-dark.svg`和`tier-flow-light.svg`；永久免費、目錄條目、循環池和評分因素聲明也為`promise-pillars.svg`、 `free-tier-budget.svg`和`strategies-grid.svg`。這些生成器繪製的計數（提供程式總數、 MCP工具、路由策略、永久免費提供者等）來自`docs/reference/derived-facts.json`到`scripts/docs/readmeFacts.mjs`的事實快照，而不是來自文字，因此在任何分支上重新產生圖表都會重現提交的檔案。 `free-tier-budget.svg`從同一快照（`code.freeTierBudget`，事實探測記錄的目錄摘要）中提取行，因此對`FREE_MODEL_BUDGETS`的更改會在下次刷新時到達卡，而不是將CI變成紅色。

### 派生值： `pr`和`release`閘模式

功能PR永遠不會寫入取決於其基礎狀態的值：提供者、遷移、MCP 工具和策略計數、 README SVG數字、事實快照。一步重新計算所有`npm run release:refresh-derived`，由發布版本和每晚派生刷新PR運行。所以**在版本之間，基礎設計位於即時程式碼後面**，並且在兄弟添加了提供者之後，將樹與實時代碼進行比較的門或測試將在每個PR上顯示為紅色。因此，判斷派生值的閘門以兩種模式之一運行，由`scripts/check/lib/gateMode.mjs`解析（第一個匹配獲勝）：

1. `--mode=pr|release`在命令列上；
2. `OMNIROUTE_GATE_MODE`環境變數（`pr`或`release`）；
3. 自動，來自GitHub Actions 事件：頭不是`release/v*`、 `merge_group`或`omni-queue/**` → `pr`的`pull_request` ；其他一切（推送、調度、調度、發布PR `release/v* → main`、任何本地運行） → `release`。

`check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) 在每種模式下會失敗：

| 模式      | 失敗                                                                                                                                                                                                                           | 需要活生生的事實 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `release` | 每次檢查，嚴格平等地對待從樹中收集的事實（門始終具有的行為）：過時的計數、版本、覆蓋範圍或SVG編號是STRICT漂移                                                                                                                  | 是的             |
| `pr`      | 只有所做的更改與具有相同聲明提取器的PR基礎不同：(1) 該檢查和文件的基礎中不存在託管值（“PR編輯了託管數字—將行恢復到基礎文本”）； (2) 底座承載和頭部損失的要求索賠。不需要事實的內容不變量在發布模式下運行；列出並跳過僅發布檢查 | 不               |

代理指令文件攜帶**不**派生計數： `AGENTS.md`、 `llm.txt` （及其`docs/i18n/*/llm.txt`副本）、bs `AGENTS.md`分支、 `open-sse/services/AGENTS.md`、 `src/shared/constants/agentSkills.ts`、 `skills/README.md`和每個`skills/*/SKILL.md`都指向來源（例如`src/shared/constants/routingStrategies.ts`中的`ROUTING_STRATEGY_VALUES` ）並指向`npm run facts` 。在兩種模式下，不變的「無派生計數（代理指令檔…）」都會導致計數失敗（提供者、遷移、 MCP工具和範圍、路由策略、評分因素、模式包），因此發布刷新永遠不必重寫指令檔。

在`pr`模式下，編寫者分支可以編輯託管值： `chore/derived-*` （夜間刷新PR）、 `release/v*`以及平移波`docs/i18n-*`和`chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`)。佇列批次（`merge_group`、 Mergify Drafts 、 `omni-queue/**`）不會再判斷：它們將PRs與已經判斷的門一一求和。

退出代碼： `0` clean · `1` STRICT漂移（或使用`--strict`進行軟漂移）或託管值違規 · `2`基礎設施—無法收集代碼事實（tsx 探測失敗或超時；超時為`OMNIROUTE_FACTS_TIMEOUT_MS`，預設為 600000 毫秒），或在CI中，無法解析PR diffhiffh。退出 2 絕不是文件分歧：重新運行作業或修復環境。

每種模式運作的位置：

| 在哪裡                                                                         | 模式                                                                                                                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 功能PR — `ci.yml`作業`docs-sync-strict`、 `quality.yml`步驟“文件準確性”        | `pr` （自動）；此作業將基礎作為`BASE_SHA`傳遞並使用`fetch-depth: 2`進行檢查                                                                                                |
| `merge_group`、 `omni-queue/**`候選人、合併列車的完整登機口列表                | `pr`                                                                                                                                                                       |
| 發布PR (`release/v* → main`)、推送、計劃和手動運行                             | `release`                                                                                                                                                                  |
| 發布-綠色 (`scripts/quality/validate-release-green.mjs`)                       | HARD專案與`OMNIROUTE_GATE_MODE=pr`一起運作（「底座壞了嗎？」）； DRIFT項`derived-refresh`運行`npm run release:refresh-derived -- --check` （嚴格來看，永遠不會打開基紅色） |
| 發布（`/generate-release`階段 0a 和 1；技能連接是單獨的所有者批准的更改）      | `npm run release:refresh-derived`寫入衍生檔；發布PR自己的檢查然後在`release`模式下執行                                                                                     |
| `nightly-derived-refresh.yml` （每日，最高`release/vX.Y.Z`，在發布凍結下跳過） | `npm run release:refresh-derived -- --profile=nightly`;在差異上，它使ONE PR從`chore/derived-refresh`保持開啟狀態；從不合併                                                 |

背後的命令：

- `npm run facts`每個派生數字列印為JSON (`scripts/release/facts.mjs`)。 `--key=code.mcpTools`列印一個值， `--snapshot`讀取已提交的快照而不是即時樹。當無法收集到事實時，退出2。
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) 一次重新計算派生文件，按以下順序（ `--only=`的步驟 ID）： `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`)、 `facts` (快照)、 `numbers` (計數門的重寫計劃應用於文件，然後傳送到它們的`docs/i18n/`鏡像)、 `readme-diagrams`、 `skills` ( `SKILL.md`)、 `--rewritten-since=<ref>` `e2e-timings` `syncE2eTimings` `ui-keys` — `en.json` `origin/main`自上次發布以來重寫的英文值；這些值由環境中配置的後端— `.env` （`OMNIROUTE_TRANSLATION_*`，僅讀取這些鍵）或Google引擎在同一運行中進行轉換。如果沒有後端`check:agent-skills-sync` `verify-generated` `check:generated-artifacts` `__MISSING__` `--allow-untranslated` `llm-mirrors` `--check`跳過，當`--only`將其排除時；失敗為退出 2）。 `changelog`步驟是選擇加入的（`--with-changelog`，僅發布設定檔）。 `--profile=nightly`從不觸及版本聲明。使用`-- --check` ，當任何文件發生變更或託管值需要手動編輯（列出兩者）時，它不會寫入任何內容並退出 1；基礎設施故障時退出 2。 `--json`將結果印為JSON。
- `docs/reference/derived-facts.json`是上次刷新所使用的事實的快照。只有刷新才會寫它。 README SVG產生器讀取它，PR-time 單元測試將提交的文件和生成的文件與它進行比較— never 與實時代碼。此套件的單一即時比較是`tests/unit/check-docs-counts-sync.test.ts`中的「發布刷新關閉循環」：根據即時事實，應用於記憶體中的刷新重寫計畫不會留下任何未報告的STRICT漂移，並且重新規劃不會改變任何內容。

要在本地重現（本地運行預設為`release`）：

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

如果沒有可解析的基礎（沒有`BASE_SHA`/`BASE_REF`，沒有本地`origin/release/v<version>`），本地`pr`運行會列印警告並跳過差異而不是失敗。

### 職位： `i18n-ui-coverage`

| 腳本                              | 驗證                                                                                                                                | 阻塞               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` （內聯） | UI i18n 金鑰覆蓋率為≥ 65%                                                                                                           | 是（兩種模式）     |
| `check:ui-icu`                    | 每個UI目錄的每個訊息都用`IntlMessageFormat`編譯                                                                                     | 是（兩種模式）     |
| `check-ui-value-drift` （內聯）   | 重寫的英語**價值**不留下過時的翻譯                                                                                                  | 是（僅限發布模式） |
| `check-new-key-coverage` （內聯） | 一個**新的**英文密鑰在每個語言環境中都被翻譯— `__MISSING__:`標記被拒絕                                                              | 是（僅限發布模式） |
| `check-key-completeness` （內聯） | 每個UI目錄（以及每個`--catalog=cli`目錄） CLI準確地攜帶其`en.json`的密鑰集；在`pr`模式下， PR在合併基礎上針對自身更改的每個目錄     | 是（兩種模式）     |
| `check-translation-ratio`         | 每個語言環境的實際翻譯比例（與英語相同/佔位符/允許列表之外的缺失部分）不超過`config/quality/i18n-translation-baseline.json` + slack | 是（僅限發布模式） |

需要`fetch-depth: 0` —值漂移閘門將`en.json`與合併基礎進行比較。

**兩種模式（自2026年11月13日起）。**功能PR新增或重寫`en.json` （和`bin/cli/locales/en.json`）中的鍵，且不涉及其他語言環境； `check:pr-derived-paths` （工作`pr-test-policy`、家庭`config/quality/derived-paths/translation.json`）無法滿足PR的功能。其他語言環境在每個版本中由`release:refresh-derived`完成一次，它在`scripts/i18n/sync-ui-keys.mjs`中呼叫`syncUiKeys()` （添加缺少的鍵、修剪掉的鍵、用`rewrittenSinceRef`標記重寫的英語的翻譯、翻譯），或通過翻譯 Wave 完成一次。門從`scripts/check/lib/gateMode.mjs`讀取模式：在`pr`模式（功能PRs、 `merge_group`、 `omni-queue/**`）中，上面的釋放模式門打印`SKIP reason=pr-mode`並退出 0；在`release`模式下（發布PR，推送到`main`， `workflow_dispatch`，本地運行），它們像以前一樣嚴格，並且在`BASE_REF=origin/main` PR在發布者身上，因此使用`--mode=pr`在本地預覽功能 PR 判決。

不會跳過在`pr`模式下仍然更改語言環境目錄的PR （翻譯波、發布刷新、僅翻譯修復PR ： `check-key-completeness`會根據合併基礎 (`scripts/i18n/lib/touched-catalogs.mjs`) 上的同一目錄來判斷它更改的每個目錄，並在目錄丟失的鍵、 `en.json`缺少的鍵、真正的翻譯變成`__MISSING__:`標記或英文文本、或者不再觸及字串placeholders/tags PR中新的目錄必須攜帶整個`en.json`密鑰集。對於PR涉及的目錄，這涵蓋了比率和 CLI 奇偶校驗門將看到的內容。

語言環境奇偶校驗單元測試（`cli-i18n-catalog`、 `i18n-pt-br`、 `i18n-vi-completeness`、 `i18n-placeholder-parity`）透過`tests/_helpers/localeParityMode.ts`遵循相同的模式：在`pr`模式下，它們跳過鍵奇偶校驗斷言，並讓發布刷新其英語自合併基礎以來發生變化的鍵的佔位符奇偶校驗（單元測試作業作業的簽出無法讀取時的每個鍵奇偶校驗（單元測試作業的簽出無法讀取時的每個鍵奇偶校驗（單元測試作業的簽出無法讀取時的每個鍵奇偶校驗）。 That helper is the**僅有的**已批准的模式條件跳過： `check:test-masking`計算`.skip(`和`{ skip: true }` ，但不計算它返回的計算`{ skip: "<reason>" }` ，因此`tests/unit/locale-parity-mode.test.ts`固定允許使用它的測試列表—添加一個是對該列表的審查編輯。

#### `check-ui-value-drift` —陳舊翻譯門

捕獲其他門在結構上看不到的國際化回歸：英語值被重寫，並且從_先前_英語派生的翻譯保留下來，因此非英語用戶繼續閱讀措辭自信、現在錯誤的副本。

這是真的出貨了。當反重力登入助理登陸時， `oauthModal.googleOAuthWarning`被重寫（#5203）；** 43 語言環境中的 39 個**保留文字告訴操作員「複製完整的URL並將其貼到下面」 —該提供者無法完成的流程。直到#8463才注意到它，因為：

- `sync-ui-keys`僅回填以下鍵**缺席的**，從來沒有那些**陳舊**;
- `check-ui-keys-coverage`計算密鑰_存在_，因此過時的翻譯分數被覆蓋；
- `check-translation-drift`追蹤`docs/i18n/<locale>/**.md`文件鏡像—它從不讀取`src/i18n/messages/*.json`。它在作業`docs-sync-strict`中運行：對PRs進行諮詢，對推送和每晚嚴格；平移波刷新了鏡子，而不是特徵PR。

**差異感知，不支持基線。**它將合併基礎上的`en.json`與工作樹進行比較；對於每個英文值變化的鍵，任何仍保留未更改翻譯的語言環境都是陳舊的。這是故意的**凍結先前存在的債務**— a diff 無法揭示長期翻譯來自哪個古英語，因此門僅判斷當前變更涉及的內容。另一種方法（每個鍵的哈希基線）將花費~ 600 KB產生的文件，3 ×最大的現有基線，在每個 i18n PR上攪拌。

滿足它的方法有兩種：

1. 更新受影響的翻譯，或
2. 將它們設定為`__MISSING__:<new english>` —運行時然後提供修正的英文（`src/i18n/request.ts::deepMergeFallback`、 #7258）和用於翻譯的金鑰佇列。

如果字串的**意義**改變了，更喜歡**重新命名密鑰**：新密鑰無法繼承過時的翻譯。這就是#8463使用的模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

當無法讀取基本目錄時使用`SKIP reason=base-unresolved`退出 0（沒有基本引用的淺克隆），鏡像`check-openapi-breaking`。僅發布模式： PR重寫英文並停在那裡；版本刷新標記了它留下的翻譯（`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`，相同的`findStaleTranslations`）。

### 職位： `i18n`

完整的 i18n 驗證矩陣（每個區域一項作業）。整個工作都是諮詢性的。

| 腳本                            | 驗證                     | 阻塞                                          |
| ------------------------------- | ------------------------ | --------------------------------------------- |
| `validate_translation.py quick` | 每個語言環境的翻譯完整性 | **諮詢**（`continue-on-error: true`整個工作） |

### 職位： `pr-test-policy`

僅在拉取請求上運行。

| 腳本                   | 驗證                                                                                              | 阻塞 |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | 更改`src/`、 `open-sse/`、 `electron/`或`bin/`中的生產代碼的PRs必須包含或更新測試（硬規則#8）     | 是的 |
| `check:test-masking`   | 更改的測試文件不會減少淨斷言計數或添加`assert.ok(true)`同義反复                                   | 是的 |
| `check:pr-evidence`    | PR主體引用了test/VPS變更證據（透過 greping PR散文—脆弱化來機械化 Hard Rule #18 ，請參閱 Backlog） | 是的 |

### 職位： `test-vitest`

在`build`之後運行。失敗時區塊合併。

| 套房             | 驗證                                                     | 阻塞                                                                        |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `test:vitest`    | MCP伺服器（110 個工具）、 autoCombo、快取— vitest runner | 是的                                                                        |
| `test:vitest:ui` | UI元件測試— vitest runner                                | **阻塞**—預先存在的故障在`vitest.config.ts`中被明確排除；新的失敗使工作失敗 |

### 每晚工作流程（預定、建議）

它們按照 cron 計劃（和`workflow_dispatch`）運行，而不是在PRs上運行。一切都是諮詢性的。

| 工作流程               | 驗證                                                                                                                | 阻塞     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 使用隨機種子+高運行次數進行快速檢查屬性測試                                                                         | **諮詢** |
| `nightly-resilience`   | 堆增長門、混沌故障注入、k6 load/soak                                                                                | **諮詢** |
| `nightly-llm-security` | Promptfoo 注入防護（區塊模式） + garak 探針（在沒有提供者機密的情況下跳過）                                         | **諮詢** |
| `nightly-schemathesis` | 使用`docs/openapi.yaml` —表面規範違規/未處理的 500 秒（Fase 8 B.4）針對即時OmniRoute進行OpenAPI合約模糊測試（架構） | **諮詢** |
| `nightly-mutation`     | Stryker 突變測試分數超過快速單位通道—倖存突變體表面弱斷言                                                           | **諮詢** |
| `nightly-compat`       | 支援的`engines.node`範圍內的節點引擎相容性矩陣                                                                      | **諮詢** |

性能基線（堆、 TTFB、建造時間）被記錄，而不是門控：請參閱[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)。

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

## 產生的文件和派生基線（在發佈時編寫）

計畫 2026-11-13（「僅在發佈時解析的派生數字和文字」）： PR一項功能更改了**來源**— `src/shared/constants/providers.ts`、 `docs/openapi.yaml`、技能目錄、免費目錄、新的 e2e 規格。它不會重新產生從該來源計算出的文件，也不會將測量到的改進儲存到基線中。這些檔案透過發布刷新 (`release:refresh-derived`) 或每晚刷新PR重寫一次。在此之前，每個同級PR都攜帶自己的重新生成的副本，並與下一次合併發生衝突（2026-11-13：321 個打開的PRs中的 30 重寫了`PROVIDER_REFERENCE.md`，26-28 重寫了README圖）。

**守衛。** `check:pr-derived-paths` (job `pr-test-policy`) 使觸及`config/quality/derived-paths/`中的系列檔案的PR功能失敗：

| 家庭        | 文件                                                                                                                                                   | 重寫者                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`;十二生成README SVGs; `skills/*/references/**`;沒有自訂區塊的`SKILL.md`文件 | `release:refresh-derived` （事實）、 `gen:provider-reference`、 `docs:readme-diagrams`、 `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                      | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                         |

Writers (`release/v*`, `chore/derived-*`, and `chore/bank-ratchet-*` for baselines) are exempt; so is a PR that changes only one family plus its companions (for `generated`: the generator scripts, their tests, the agent-skill inputs — `src/shared/constants/agentSkills.ts`, the hand-written `skills/**` docs, `docs/openapi.yaml` — and `changelog.d/**`), e.g. a hero layout change with its regenerated SVG, or a skills fix whose test reads the regenerated `SKILL.md` files. A `SKILL.md` with a hand-written `<!-- skill:custom-start -->` block is not in the family: its custom block stays editable next to a feature.

孤兒清理也不由家族來判斷：當合併基礎具有該鏡像且`<doc>`不再存在於PR的頭部時， PR可以刪除`docs/i18n/<locale>/<doc>` ，並且可以編輯`.i18n-state.json`僅從`sources`中刪除此類文件。守衛在`orphan-cleanup`下列出了這些文件。刪除仍然存在的文件的鏡像仍然是一種違規：沒有其他管道追蹤該狀態，並且`llm.txt`和`CHANGELOG.md`鏡像有自己的編寫器。

**檢查，每門模式**（`scripts/check/lib/gateMode.mjs`；助手`scripts/check/lib/derivedArtifactScope.mjs`）：

| 查看                                                                     | `release` （推送、調度、發布PR、本地）          | `pr` （特徵PR，佇列批次）                                                                                                                     |
| ------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                | 每個技能必須等於發電機輸出                      | 僅限PR編輯生成文字（自訂區塊之外）或`references/`的技能；否則`SKIP reason=pr-mode`                                                            |
| `check:generated-artifacts` （README SVGs + e2e 計時；需要完整歷史記錄） | 每個SVG等於它的產生器；每個規格都有一個計時條目 | 僅PR編輯的工件；其餘`SKIP reason=pr-mode`；沒有差異基礎→判斷每個工件（失敗關閉）                                                              |
| README SVG位元組比較測試 (`tests/unit/docs/readme-*-svg.test.ts`)        | 每個SVG                                         | 當基礎解析時， PR僅編輯SVG ； `test-unit`的淺PR結帳沒有基礎，因此測試會跳過`SKIP reason=base-unresolved`和`check:generated-artifacts`擁有比較 |
| e2e 時序完整性 (`tests/unit/balance-e2e-shards.test.ts`)                 | 每個規格都有一個條目                            | 與SVG測試相同的規則（新規範以中位數權重運行）                                                                                                 |
| `check-quality-ratchet.mjs --require-tighten`                            | 無銀行改進失敗（除非`_policy`）                 | 報告有改進，從未失敗；回歸仍失敗                                                                                                              |

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
