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

## 閘門清單與執行設定檔

### 候選版本准入

CI 與 Quality Gates 工作流程各自產生穩定的判定結果：`Gate / CI` 與
`Gate / Quality`。其版本化准入政策會將每個上游工作列為必要或建議項目。適用的
必要工作必須成功：缺少、已取消、已略過、待處理及未知結果皆無法判定為 PASS。
有效的僅文件或僅目錄分類可使程式碼執行通道不適用；草稿 PR 並非可接受的候選版本。
`hotfix` 標籤不會免除證據要求。

這兩個工作流程涵蓋以 main/release 分支為目標的 PR、推送至 `main`、手動分派
及合併群組事件。推送、分派與合併群組會執行完整選擇。推送至
`release/**` 不會啟動這些流程（2026-10-18）：每項變更皆已在其 PR 上執行矩陣，
而合併後的組合則由 Release-Green 負責（`docs/ops/RUNNER_BOX.md` → 託管執行通道）。分支複本
與合併群組會為原本選用自託管執行器的工作改用託管執行器；
在推出前必須確認具備足夠的託管容量。

每份 JSON 收據都會識別已簽出的 SHA、工作流程執行及嘗試次數。
CLI 會拒絕簽出 SHA 與事件 SHA 不相符的情況。工作流程測試會將政策成員資格
繫結至判定工作的 `needs` 清單，使新增或移除的執行通道無法在未被察覺的情況下消失。
收據涵蓋的是其本身的工作流程，而非發布、部署或現有建議性掃描器的內部機制。將適用的檢查設為分支規則中的必要條件，是另一項獨立的管理變更；僅定義其工作並不會保護分支。

`API Route Typecheck` 是一項獨立的工作流程檢查，不包含在兩個彙總判定或本機完整觀察器的靜態設定檔中。請針對確切的候選項目個別檢查其結果。`.github/workflows/api-route-typecheck.yml` 會在以 `main` 或 `release/**` 為目標的 PR、推送至任一分支系列，以及手動分派時執行。它沒有路徑篩選器。重新設定 PR 基底分支會要求執行新的檢查；本文或標題的編輯會使用僅供觀察的名稱 `Admission not requested / API Route Typecheck`，且無法取代准入檢查。此工作流程未宣告合併群組觸發條件。任何要求此檢查的合併佇列推出作業，都必須先確保它會針對該事件執行。

### UI 執行容量

CI 會透過四個 `test-vitest` 矩陣分片執行完整的 UI 清單，每個分片最多使用
兩個工作程序，並沿用現有的 15 分鐘工作期限。第一個分片也會執行
MCP/autoCombo Vitest 測試套件。必要工作的結果涵蓋每個矩陣執行項；任一分片失敗
或遭取消皆無法建立候選版本的准入資格。

每夜觀察器會為每個 UI 分片保留各自獨立且精確對應候選版本的收據，
其中第一份收據包含 MCP 執行。四份收據、記錄及相符的
執行身分缺一不可。本機的 `npm run test:vitest:ui` 仍會選取
完整測試套件；單次 `--shard` 執行僅能作為部分證據。

### 單元測試涵蓋率收集

十二個單元測試分片會在現有測試執行期間收集 V8 涵蓋率。成功的
分片會執行 `scripts/ci/compact-v8-coverage.mjs`，以壓縮原始檔案，而不產生
中介的 Istanbul 報告。最終的 Coverage 工作會依據
候選版本 SHA、執行階段、來源根目錄及資料雜湊驗證全部十二份資訊清單，接著執行 c8 的報告器及現有的
涵蓋率門檻。輸入會保留 c8 的全域檔名順序；對混合函式／區塊涵蓋率而言，
逐分片預先合併並不安全。缺少、格式錯誤或不相容的分片會導致准入失敗。
失敗的測試分片會另行保留原始診斷涵蓋率；該資料不得進入最終合併。

### 單元執行進度收據

共用的 `test:unit:ci:shard` 命令會透過 `scripts/ci/unit-progress-reporter.mjs` 記錄 `primary`、`dashboard` 和 `serial` 階段。一般測試報告仍可使用。另一份僅包含中繼資料的收據會記錄每個檔案的開始與完成狀態，而每 30 秒一次的心跳會列出仍在執行中的檔案及其經過時間。它只記錄允許清單中的執行中繼資料；不會序列化測試描述、輸出、錯誤內容及完整環境。

CI 和 Quality 會將 JSONL 檔案保留為 `unit-progress-ci-<run>-<attempt>-<shard>` 和 `unit-progress-quality-<run>-<attempt>-<shard>`。作業逾時可能會導致後續上傳無法進行；已發出的心跳仍可作為診斷依據。心跳缺失也可能表示執行器程序遭到阻塞或終止。這些收據會保留現有的測試選擇、並行設定、截止時間及結束狀態；它們並非候選項目准入的判定結果。

### 驗收結果歸約器中的留存證據

`scripts/quality/validate-release-acceptance.mjs` 彙整傳入的計畫及其清單，並不證明該計畫涵蓋完整的發布管線。即使計畫的狀態為 `VERIFIED`，其報告也會明確設定 `releaseAcceptance: false`。`release-acceptance.yml` 工作流程仍然使用影子測試資料，而非實際的建置、封裝、啟動或晉級回執。

CLI 需要 `--evidence-root` 才能核驗留存證據。檔案依 `<evidence-root>/<artifact_id>/<member>` 路徑解析，並計算 SHA-256 雜湊。沒有證據的 PASS 記錄、遺失或已變更的檔案、不安全的路徑或符號連結，都會阻止核驗通過。檔案遺失不等同於成功執行產生的空白日誌。現有的 SHA/run/attempt 檢查仍然獨立：位元組相同無法使過期回執有效。檔案完整性不能證明執行的真實性或產物已完成晉級。

### 靜態掃描清單

版本化的 npm 別名清單及靜態掃描成員資格位於
`config/quality/gate-manifest.json`。執行 `npm run check:gate-manifest`，以根據
`package.json` 驗證指令碼名稱及確切命令；新增、移除及
命令偏移都會導致本機掛鉤及 CI 中的變更分類工作失敗。
別名並非工作流程工作、矩陣執行個體或測試案例：不得將這些計數
當作可互換的數值呈現。

使用 `npm run quality:scan -- --list` 或 `npm run quality:scan:fast -- --list`
可檢視選取的別名而不執行它們。執行器會叫用
npm 進入點，因此會保留其執行階段（包括設定使用 Bun 的情況）。
資訊清單會將這些設定檔以外的別名記錄為個別叫用項目，且
唯讀掃描設定檔禁止使用維護命令。

這些設定檔僅涵蓋靜態掃描。它們不會認證產品測試、
涵蓋率、封裝、外部檢查或候選版本的完整發行驗收。
工作流程准入會使用連結的 `config/quality/admission-policy.json` 及
`scripts/quality/admission-verdict.mjs`。發行觀察器設定檔仍為獨立項目；
請個別檢查其適用的檢查項目及收據。完整觀察器的靜態
命令宣告於 `config/quality/release-green-static-profile.json`，其中包括
`audit:deps`、突變測試選擇及翻譯檢查。載入器會根據 package.json
及建模的 CI/Quality 宣告驗證 npm 命令；若發生偏移，載入器會予以拒絕，
而非將 shell 詞法單元當作引數執行。必要掃描器的 SKIP/INCOMPLETE 輸出
無法建立 PASS。設定檔會記錄其外部排除項目，且無法取代
託管涵蓋率、測試矩陣、套件或部署證據。下方的文字清單
僅供參考，無法證明閘門確實已執行。

指令碼位於 `scripts/check/`（政策閘門）及 `scripts/quality/`（棘輪引擎）。
CI 的單一真實來源為 `.github/workflows/ci.yml`。

### 已發布基準文件的健康狀態

`.github/workflows/i18n-base-health.yml` 會在選定的推送至 `main` 與 `release/v*` 後，以及手動分派時，觀察文件的健康狀態。其篩選條件涵蓋文件、根目錄 Markdown、`llm.txt`、翻譯狀態／設定，以及相關的 i18n 工具。唯一的 `Published base documentation health` 工作使用託管的 Ubuntu，並設有五分鐘的期限。它會執行唯讀驗證並寫入診斷收據，而不會安裝相依套件、進行翻譯或採用狀態。

`scripts/i18n/check-base-health.mjs` 要求來源雜湊、目標缺失、目標雜湊、過時翻譯及章節快取的不一致情況均為零。它也會驗證目前的核心文件／語系範圍及其記錄的來源資訊。無效的情境、不完整的涵蓋範圍或檢查程式中斷，都會產生 `INCOMPLETE`；確認存在偏移則會產生 `FAIL`。兩者都會傳回表示失敗的結束狀態。收據會綁定至簽出 SHA、工作流程、執行與嘗試次數，並以 `i18n-base-health-<sha>-<run>-<attempt>` 的名稱保留。

這是對已發布基準的獨立觀察。它不會新增 PR 或合併群組事件、必要的 PR 檢查、npm 別名或靜態掃描設定檔成員。現有的差異式 PR 政策與底層檢查程式的建議性分類仍維持分離。成功上傳無法將失敗的健康狀態結果轉變為 PASS。

### 發行 PR 快速路徑（`quality.yml`）

`.github/workflows/quality.yml` 會在 main/release PR、推送至 `main`、
分派及合併群組時補充 CI。PR 使用依路徑篩選的快速檢查。永久
停用的重複建置已移除；實際的建置／套件／啟動檢查仍保留在 CI 中。

| 工作                                             | 範圍                                                                                                                         | 阻擋性        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 文件／程式碼 PR；API 文件參照與 docs-all                                                                                     | 是            |
| `Fast Quality Gates`                             | 程式碼 PR；靜態檢查、類型檢查、儀表板類型檢查、受影響的單元測試                                                              | 是            |
| `Forgotten sibling tests`                        | 程式碼 PR；追蹤已變更模組的靜態使用端與候選同層測試；barrel 與動態匯入路徑會回報為提示性診斷，並附上所參照的允許清單例外項目 | **提示性**    |
| `Vitest (fast-path)`                             | 程式碼 PR；快速 vitest 測試套件                                                                                              | 是            |
| `Unit Tests fast-path`                           | 程式碼 PR；分成 4 個分片的單元測試套件                                                                                       | 是            |
| `No new ESLint warnings`                         | 程式碼 PR；可識別抑制設定的 lint 防護檢查                                                                                    | 是，包括 fork |
| `Merge integrity (changelog + generated skills)` | 非草稿 PR；變更日誌與產生的 skill 同步                                                                                       | 是，包括 fork |

#### 遺漏的同層測試報告

`npm run check:forgotten-sibling-tests` 會重複使用測試影響對應表背後的匯入解析器。
對於每個已變更的正式環境模組，若候選測試未出現在提取要求的差異中，它會回報具確定性的
`changed module/symbol -> static consumer -> candidate sibling test` 鏈。Markdown 摘要與 JSON 結果會保留為
`forgotten-sibling-tests` 工作流程成品，以便在推出任何阻擋性檢查前進行校準。

Barrel 重新匯出與動態匯入僅屬解析診斷；絕不會產生阻擋性發現。經審查的例外項目位於
`config/quality/forgotten-sibling-allowlist.json`。每個項目都必須指定使用端與候選
測試、提供具體理由，並連結至 GitHub issue 或提取要求。格式錯誤的項目會採取封閉式失敗。
例外項目無法抑制已刪除的候選測試，或新增 `.skip`／`.todo` 的差異；
弱化斷言及其他遮蔽行為仍由獨立且具阻擋性的
`check:test-masking` 閘門負責。

### 工作：`lint`

針對每個以 `main` 為目標的 PR 執行。失敗時會阻止合併。

| 指令碼（`npm run ...`）           | 驗證項目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 阻擋                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js 版本位於支援的範圍內                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:test-tla-order`            | `tests/unit` 下沒有任何 `node:test` 檔案會先註冊測試、遇到頂層 `await`，接著再註冊更多測試（#18045；棘輪機制：`test-tla-order-allowlist.json` 只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:cycles`                    | 檢查整個 `src/` + `open-sse/` 的循環匯入（以 AST 為基礎，並解析 tsconfig `paths`）。只要存在任何循環，單獨執行便會以狀態碼 1 結束（自 #15281 起採失敗關閉），並列出 SCC。`check:cycles:ratchet`（CI 實際執行的項目）會在數量超過 `quality-baseline.json` 中的 `metrics.cycles` 上限時阻擋——目前為 14，`direction: down`，因此只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                | 是（棘輪機制）                          |
| `check:boundary`                  | `open-sse → src` 耦合：從引擎匯入應用程式的唯一檔案對檔案匯入（`scripts/quality/measure-boundary.mjs`；邊列表是 v4 核心／模組拆分的修復待辦清單）。單獨執行 = 提示性報告（與 `quality:boundary` 相同）。`check:boundary:ratchet`（CI 實際執行的項目，也位於 `quality.yml` 快速關卡的棘輪迴圈中）會在數量超過 `quality-baseline.json` 中的 `metrics.boundaryOpenSseToSrc` 上限時阻擋——初始值設為實測的 771，`direction: down`；`--update` 只能降低該值；在 PR 中以基底為基準（`--base-ref`，見下文）                                                                                                                                                                                      | 是（棘輪機制）                          |
| `check:route-validation:t06`      | 所有路由皆具有 Zod schema（第 6 級政策）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` 的數量未超過預算（第 11 級閘門）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:provider-consistency`      | `providers.ts` 中的每個提供者在 `providerRegistry.ts` 中都有相符的項目（反之亦然，但僅限允許清單內）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是                                      |
| `check:model-lifecycle`           | 三個手動維護的路由表須與存入版本控制的生命週期快照（#11503）保持一致：`FITNESS_TABLE`（`taskFitness.ts`）不會對任何 `REGISTRY` 可路由的已淘汰 ID 評分；每個 `BUILT_IN_ALIASES` 目標皆存在於 `REGISTRY` 中，且不存在於已淘汰 ID 快照中；`REGISTRY` 中仍存在的每個已淘汰 ID 都會被轉送，或列於 `allowedRetiredInCatalog` 中；此外，`DEFAULT_DEGRADATION_MAP` 的來源或目標皆不得在該快照中顯示為已淘汰。這無法證明模型目前確實由正常運作的上游提供服務。離線作業——與 `config/quality/model-lifecycle.json` 比較；該檔案需透過 `npm run quality:refresh-model-lifecycle` 手動重新整理（需要網路；未整合至 CI）。`allowedRetiredInCatalog` 是逐步縮減的棘輪機制：僅能在有追蹤議題時新增項目。 | 是                                      |
| `check:fetch-targets`             | 用戶端 `src/` 中的每個 `fetch("/api/...")` 都會解析至實際存在的 `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:deps`                      | 儲存庫中每個 `package.json` 內所有可透過 `npm install` 安裝的相依套件，都必須列於 `dependency-allowlist.json` 中；新增的未鎖定版本或疑似拼寫劫持套件會被標記                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `audit:deps`                      | 對全部五個獨立的 lockfile（根目錄、Electron、OpenCode 外掛程式 v1/v2 與 provider）執行 npm audit。重大公告會阻擋；高風險公告仍會顯示為警告。缺少/失敗的稽核會標記為 INCOMPLETE 並阻擋；保留各範圍的 lock 雜湊與報告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:lockfile`                  | `package-lock.json` 完整性 — https registry、完整性雜湊、無主機覆寫                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是                                      |
| `check:licenses`                  | 正式環境相依套件的 SPDX 授權允許清單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是                                      |
| `check:tracked-artifacts`         | 不得有建置產物／已提交的 `node_modules` 符號連結（也會在 husky pre-commit 中執行；pre-push 刻意保持輕量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:ai-attribution`            | PR 提交、標題或內文中不得有 AI/機器人的 `Co-Authored-By` 尾註或 AI 生成頁尾 — 強制規則 #16（位於 PR→`release/**` 的 `quality.yml` 快速閘門迴圈中 — 讀取事件酬載，非 PR 時不執行任何操作 — 並在 PR→`main` 的 `ci.yml` lint 中設有僅限 PR 的步驟；另有 husky `commit-msg` hook；允許人類共同作者；#14436）                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | 每個 Vitest 排除項目都必須指明追蹤 issue，並列於 `config/quality/vitest-exclusions.json` 中（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:file-size`                 | 原始碼檔案（`src/`、`open-sse/`、`electron/`、`bin/` 中的 `.ts`/`.tsx`）不得超過 `cap`，測試檔案（`*.test.ts(x)`）不得超過 `testCap`；凍結於 `file-size-baseline.json` 中的檔案（`frozen` / `testFrozen`）不得超過其記錄的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:error-helper`              | 執行器／處理常式中的錯誤回應使用 `buildErrorBody()` / `sanitizeErrorMessage()`（硬性規則 #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:migration-numbering`       | 遷移 SQL 檔案須依序編號，不得有缺號或重複編號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是                                      |
| `check:public-creds`              | 除 `publicCreds.ts` 外，不得出現 OAuth `client_id`/`client_secret` 或 Firebase Web 金鑰的字面值（硬性規則 #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是                                      |
| `check:db-rules`                  | `src/lib/db/` 模組之外不得使用原始 SQL；不得從 `localDb.ts` 進行桶式匯入（硬性規則 #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:known-symbols`             | 登錄於分派表中的提供者執行器、路由策略及轉譯器必須與磁碟上的檔案相符，不得有孤立或未宣告的符號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:route-guard-membership`    | 每個會產生子程序的路由都由 `isLocalOnlyPath()` 分類（硬性規則 #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:test-discovery`            | 儲存庫中的每個 `*.test.ts` / `*.spec.ts` 檔案都至少由一個測試執行器收集（棘輪機制：`test-discovery-baseline.json` 中的孤立檔案清單只能縮減）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:agent-skills-sync`         | 產生的代理技能成品與其來源目錄一致（無偏移）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | 提供者標誌／資產具有已記錄的來源條目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON 設定檔可正確解析，並符合儲存庫的 lint 規則                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript 編譯無錯誤（僅有提示性警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `typecheck:noimplicit:core`       | 嚴格的 `noImplicitAny`——著眼未來；許多既有呼叫位置仍需新增類型註記                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **提示性**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | 將 `tsc` 限定於 `src/app/(dashboard)/**` (#7033) — `typecheck:core` 精選的 27 個檔案允許清單未包含任何儀表板 TSX，而 `next build` 也從不對其進行類型檢查（`next.config.mjs` 設定了 `ignoreBuildErrors: true`），因此其中的孤立識別碼迴歸問題 (#6625/#6909) 對 CI 而言不可見。與凍結的逐檔案／逐 TS 程式碼計數基準線（`config/quality/dashboard-typecheck-baseline.json`，採用與 `check:known-symbols` 相同的過時強制執行模式）進行差異比對 — 只有超出基準線計數的「新」錯誤才會使閘門失敗；修正既有錯誤時，使用 `--update` 逐步下調基準線。                                                                                                                                              | 是                                      |

### 作業：`quality-gate`

在 `test-coverage` 之後執行。失敗時會阻止合併。

| 指令碼                       | 驗證項目                                                                                                                          | 阻擋性               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | 產生 `quality-metrics.json`（ESLint 警告數量、合併後分片報告中的覆蓋率）                                                          | 是（棘輪檢查的上游） |
| `quality:ratchet`            | `quality-baseline.json` 中的每項指標皆未退步（ESLint 警告數量 ≤ 基準線；覆蓋率 ≥ 基準線）                                         | 是                   |
| `check:duplication`          | 程式碼重複度 (jscpd@4) 未超過 `quality-baseline.json` 中的基準線                                                                  | 是                   |
| `check:complexity`           | 檔案層級的循環複雜度未超過上限（核心 ESLint `complexity` + `max-lines-per-function`）                                             | 是                   |
| `check:cognitive-complexity` | 認知複雜度棘輪檢查 (`eslint-plugin-sonarjs`) — 獨立的 ESLint 執行階段；CI 將兩者合併為單一 `check:complexity-ratchets` 步驟執行   | 是                   |
| `check:dead-code`            | 未使用匯出／檔案的棘輪檢查 (knip) 相較基準線未退步                                                                                | 是                   |
| `check:compression-budget`   | 壓縮基準測試預算 — 各引擎的權杖節省下限不得退步                                                                                   | 是                   |
| `check:type-coverage`        | 已標註類型百分比的棘輪檢查 (`type-coverage`) 未退步；大致涵蓋 `typecheck:noimplicit:core`                                         | 是                   |
| `check:codeql-ratchet`       | 未解決的 CodeQL 警示數量未退步（透過 `gh api` 讀取；無權杖時會優雅略過）— 更新頻率與手動觸發方式：請參閱下方的「CodeQL 棘輪檢查」 | 是                   |

### 作業：`quality-extended`

此作業會阻止適用的候選項目。套件大小、祕密資訊發現項目、漏洞
發現項目、工作流程發現項目及 OpenAPI 變更，皆會透過必要的棘輪機制進行檢查。
循環相依性診斷仍僅供參考。掃描器安裝是必要條件：
`scripts/ci/install-quality-scanners.sh` 會佈建固定版本並傳遞
安裝失敗。缺少工具、報告無效或缺少基準線，都會使
必要的掃描器閘門保持為 INCOMPLETE。

| 指令碼                   | 驗證項目                                                                                                                                                             | 阻擋條件                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | 無循環相依性（dpdm）                                                                                                                                                 | **諮詢性**                                |
| `check:bundle-size`      | Bundle 大小不超過上限；無法取得測量結果時即判定失敗                                                                                                                  | **使用 --ratchet 時具阻擋性**             |
| `check:secrets`          | Gitleaks 發現不得惡化；必要掃描會拒絕缺少工具／原始碼／基準、掃描失敗及無效報告                                                                                      | **使用 --ratchet 時具阻擋性**             |
| `check:vuln-ratchet`     | 相依套件弱點不得惡化；必要掃描會拒絕缺少工具、無效報告或缺少基準                                                                                                     | **使用 --ratchet 時具阻擋性**             |
| `check:workflows`        | 工作流程 lint（actionlint + zizmor）；掃描器缺失／損壞、報告無效或缺少 ratchet 基準時，會以 INCOMPLETE 判定失敗。有效發現會遵循所選的嚴格／諮詢／ratchet 政策        | 必須執行；zizmor ratchet 在 CI 中具阻擋性 |
| `check:openapi-breaking` | 根據固定的事件提交驗證公開 API 合約（PR merge-base、推送前的提交、merge-group 基底；排程／手動執行時使用 checkout 的第一個父提交）；必要測量失敗時採取封閉式失敗處理 | **使用 --ratchet 時具阻擋性**             |

### 作業：`docs-sync-strict`

對於目標為 `main` 或 `release/**` 的 pull request，此作業僅對非草稿（或位於受信任佇列中）、且被分類為文件或程式碼變更的候選版本執行。它也會在非 PR 的 CI 事件中執行；此工作流程的 push 觸發條件僅涵蓋 `main`，不涵蓋 `release/**`。步驟以非零結束碼結束時會阻擋作業；下列僅供報告的發現與已記錄的例外不會阻擋。

| 指令碼                         | 驗證項目                                                                                                                                                                                                                                                                                   | 阻擋條件                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `check:docs-all`               | 依序執行下列 7 個子閘門的中繼閘門                                                                                                                                                                                                                                                          | 是                                                                                        |
| ↳ `check:docs-sync`            | 套件/OpenAPI/CHANGELOG 的版本一致性、`llm.txt` 的精確鏡像、已翻譯 CHANGELOG 的章節/大小不變條件，以及不存在已被取代的重複文件                                                                                                                                                              | 是                                                                                        |
| ↳ `check:docs-frontmatter`     | 已編譯的文件頁面包含有效的 frontmatter 標題                                                                                                                                                                                                                                                | 是                                                                                        |
| ↳ `check:docs-counts`          | 高可信度的數量不變條件採嚴格檢查；啟發式檔案數量檢查僅發出警告，除非指令碼收到 `--strict`（CI 中的中繼閘門不會傳入此旗標）                                                                                                                                                                 | 嚴格層級會阻擋；寬鬆層級僅供建議                                                          |
| ↳ `check:env-doc-sync`         | 套用明確的 ignore、doc-only 與 env-only 例外清單後，原始碼中讀取的環境變數、`.env.example` 與 `docs/reference/ENVIRONMENT.md` 必須一致                                                                                                                                                     | 是，已記錄的例外清單以外均適用                                                            |
| ↳ `check:deprecated-versions`  | 排除被忽略的文件後，報告安全歷史脈絡以外可能過時的版本，以及過時的更新日期                                                                                                                                                                                                                 | 目前 CI 接線方式下僅供建議（未傳入 `--strict`）                                           |
| ↳ `check:doc-links`            | 文件中的內部 markdown 連結會解析至實際檔案（`[text]`/`(path)` 格式）                                                                                                                                                                                                                       | 是                                                                                        |
| ↳ `check:fabricated-docs`      | 文件中引用的路由、環境變數、CLI 命令、hook 名稱及檔案路徑確實存在於程式碼庫中。使用 `--strict` 時為硬性閘門；未使用該旗標時為軟性失敗。                                                                                                                                                    | 是（CI 中透過 `--strict`）                                                                |
| `check:cli-i18n`               | CLI 使用的 `t()` 鍵必須存在於 `en`；`pt-BR` 保留每個最上層區段；`zh-CN` 和 `zh-TW` 包含 `en` 的每個鍵                                                                                                                                                                                      | 是                                                                                        |
| `check:openapi-coverage`       | OpenAPI 規格至少涵蓋真實路由的 ratchet 下限                                                                                                                                                                                                                                                | 是                                                                                        |
| `check:openapi-security-tiers` | 已宣告的 `x-loopback-only`/`x-always-protected` 註解必須有 `routeGuard.ts` 的支援；剖析器錯誤與正向檢查的不符會阻擋。對僅限本機的前綴下缺少 `x-loopback-only` 的反向檢查會發出警告，而僅由模式定義的路由不納入該反向檢查。                                                                 | 剖析器/正向檢查會阻擋；反向檢查僅供建議                                                   |
| `check:openapi-routes`         | 套用有理由依據的 `KNOWN_STALE_SPEC` 例外清單後，`openapi.yaml` 中的每個 `/api...` 路徑都必須忽略參數差異而解析至真實路由；過時的例外清單項目也會使檢查失敗                                                                                                                                 | 是                                                                                        |
| `check:docs-symbols`           | 非鏡像的標準文件中，內部 `/api/...` URL 參照必須解析至真實路由或路由群組；proxy/upstream/placeholder/檔案參照及有理由依據的 `KNOWN_STALE_DOC_REFS` 項目會被排除，過時的例外清單項目則使檢查失敗                                                                                            | 是                                                                                        |
| `i18n translation drift`       | 檢查核心文件的來源/目標雜湊及翻譯來源。PR 比較僅允許完全相同的繼承失敗；來源、缺少目標、目標雜湊、過時翻譯或章節快取方面新增或未經驗證的不一致均會阻擋通過。在 PR 比較之外，來源/缺少目標/目標雜湊失敗會阻擋通過，而過時翻譯和不一致的章節快取仍僅作警告。缺少舊格式的章節快取不屬於失敗。 | PR 中新增或未經驗證的差異會阻擋通過；完全相同的繼承差異僅作警告；非 PR 規則取決於失敗類型 |

### 作業：`i18n-ui-coverage`

| 指令碼                           | 驗證項目                                                                                                                                    | 是否阻擋合併 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage`（內嵌） | UI i18n 鍵覆蓋率 ≥ 65%                                                                                                                      | 是           |
| `check-ui-value-drift`（內嵌）   | 改寫後的英文**值**不會留下過時的翻譯                                                                                                        | 是           |
| `check-new-key-coverage`（內嵌） | **新增的**英文鍵已在每個語系中翻譯完成——`__MISSING__:` 標記會遭拒絕                                                                         | 是           |
| `check-translation-ratio`        | 每個語系的實際翻譯比率（與英文相同／預留位置／不在允許清單中的缺漏葉節點）不得超過 `config/quality/i18n-translation-baseline.json` + 寬限值 | **阻擋**     |

需要 `fetch-depth: 0`——值漂移閘門會將 `en.json` 與合併基準進行差異比較。

#### `check-ui-value-drift`——過時翻譯閘門

此閘門會捕捉其他閘門在結構上無法發現的一種 i18n 迴歸：英文值遭到改寫，但衍生自_先前_英文的翻譯仍被保留下來，導致非英文使用者繼續讀到措辭確定、但現在已不正確的文案。

這確實曾發佈至正式環境。當 Antigravity 登入輔助程式上線時（#5203），`oauthModal.googleOAuthWarning` 曾遭改寫；**43 個語系中有 39 個**仍保留告知操作人員「複製完整 URL 並將其貼到下方」的文字——但該提供者無法完成此流程。此問題直到 #8463 才被發現，原因如下：

- `sync-ui-keys` 只會補上**不存在**的鍵，絕不處理**過時**的鍵；
- `check-ui-keys-coverage` 計算的是鍵是否_存在_，因此過時的翻譯仍會被視為已覆蓋；
- `check-translation-drift` 追蹤的是 `docs/i18n/<locale>/**.md` 文件鏡像——
  它絕不會讀取 `src/i18n/messages/*.json`。自 2026-09 重新同步以來，在工作 `docs-sync-strict` 中具有阻擋作用：編輯核心文件 → `npm run i18n:run -- --files=<doc>`（章節層級，成本低）。

**差異感知，而非以基準為依據。** 它會將合併基準中的 `en.json` 與工作樹進行比較；對於英文值有所變更的每個鍵，任何仍保留未變更翻譯的語系都會被視為過時。這會刻意**凍結既有技術債**——差異無法揭示長期存在的翻譯源自哪個舊英文版本，因此此閘門只會判定目前變更觸及的內容。替代方案（每個鍵各自使用雜湊基準）會產生約 600 KB 的生成檔案，是現有最大基準的 3 倍，並會在每次 i18n PR 中大量變動。

有兩種方式可通過此閘門：

1. 更新受影響的翻譯，或
2. 將其設為 `__MISSING__:<new english>`——接著執行階段會提供修正後的英文
   （`src/i18n/request.ts::deepMergeFallback`，#7258），並將該鍵排入翻譯佇列。

如果字串的**語意**有所變更，建議優先**重新命名該鍵**：新鍵不會繼承過時的翻譯。#8463 採用的就是這種模式。

```bash
npm run i18n:check-value-drift          # 嚴格模式（CI 執行的模式）
npm run i18n:check-value-drift:warn     # 僅產生報告
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

值漂移與新鍵閘門共用來自
`scripts/i18n/resolve-ui-diff-base.mjs` 的同一個不可變比較結果。工作流程會將相同的基底、基底尖端與
候選 SHA 傳遞給兩項檢查。PR／基底重新定向、推送與合併群組執行會使用其事件
情境。分派候選分支時，必須有與其完全相符的開放中 PR，或明確提供
`i18n_base_sha` 輸入。在未提供該輸入的情況下，分派或排程觀察 `main` 或 `release/vX.Y.Z`
時，會將最後一筆提交與其第一個父提交進行比較；這並非對
所有繼承而來的翻譯技術債進行稽核。本機叫用需要明確的比較基底，
例如上方的 `BASE_REF` 命令。

比較情境遺失或有歧義、必要目錄無法讀取或無效，以及
候選項目發生變更時，都會產生 `INCOMPLETE` 並以結束代碼 **2** 結束，包括在警告模式下。
目錄讀取使用 `scripts/i18n/read-ui-catalog.mjs`；讀取失敗時不會以
空物件替代。基底無法取得或輸入不完整，皆不能判定為 PASS。

### 工作：`i18n`

完整的 i18n 驗證矩陣（每個語系各一項工作）。整項工作僅供參考。

| 指令碼                          | 驗證項目             | 是否阻擋合併                                           |
| ------------------------------- | -------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | 每個語系的翻譯完整度 | **僅供參考**（整項工作設定 `continue-on-error: true`） |

### 工作：`pr-test-policy`

僅在提取要求上執行。

| 指令碼                 | 驗證項目                                                                                                           | 是否阻擋合併 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check:pr-test-policy` | 變更 `src/`、`open-sse/`、`electron/` 或 `bin/` 中正式環境程式碼的 PR，必須包含或更新測試（硬性規則 #8）           | 是           |
| `check:test-masking`   | 變更後的測試檔案不會降低斷言淨數量，也不會新增 `assert.ok(true)` 這類恆真式                                        | 是           |
| `check:pr-evidence`    | PR 內文引用此次變更的測試／VPS 證據（透過 grep 搜尋 PR 文字，將硬性規則 #18 機械化——此方式較脆弱，請參閱待辦事項） | 是           |

### 工作：`test-vitest`

需要 `changes` 分類工作。適用的矩陣分片失敗時會阻擋合併。

| 套件             | 驗證項目                                                  | 阻擋                                                                              |
| ---------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 伺服器（110 個工具）、autoCombo、快取 — vitest 執行器 | 是                                                                                |
| `test:vitest:ui` | UI 元件測試 — vitest 執行器                               | **阻擋** — 已存在的失敗已在 `vitest.config.ts` 中明確排除；新的失敗會導致工作失敗 |

### 每夜工作流程（排程執行，僅供參考）

這些工作流程會依 cron 排程（以及透過 `workflow_dispatch`）執行，絕不會在 PR 上執行。全部僅供參考。

| 工作流程               | 驗證項目                                                                                                                               | 阻擋         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | 使用隨機種子與高執行次數的 fast-check 屬性測試                                                                                         | **僅供參考** |
| `nightly-resilience`   | 堆積成長閘門、混沌故障注入、k6 負載／持續負載測試                                                                                      | **僅供參考** |
| `nightly-llm-security` | promptfoo 注入防護（封鎖模式）+ garak 探測（若無提供者密鑰則略過）                                                                     | **僅供參考** |
| `nightly-schemathesis` | 使用 `docs/openapi.yaml` 對執行中的 OmniRoute 進行 OpenAPI 合約模糊測試（schemathesis）— 揭露規格違規／未處理的 500 錯誤（階段 8 B.4） | **僅供參考** |
| `nightly-mutation`     | 對快速單元測試通道執行 Stryker 突變測試評分 — 存活的突變體會揭露薄弱的斷言                                                             | **僅供參考** |
| `nightly-compat`       | 在受支援的 `engines.node` 範圍內執行 Node 引擎相容性矩陣                                                                               | **僅供參考** |

效能基準（堆積、TTFB、建置時間）會被記錄，但不作為閘門條件：請參閱 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）。

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
- **建議性** — 全域總量與凍結基準之間的比較。既有的偏差絕不會讓無辜的 PR
  顯示為紅色；該偏差會持續追蹤，以便在發布協調時修復，並由
  餘裕作業監控。

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

每個不會因既有違規而失敗的閘門都會使用凍結的允許清單
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。政策如下：

**修正根本原因；只有當違規是既有問題，且無法在同一個 PR 中修正時，才使用允許清單。**

將項目加入允許清單時：

1. 加入註解說明理由。
2. 引用追蹤議題（例如 `// #3498 — Phase 2 feature, not yet implemented`）。
3. 在修正違規的同一個 PR 中移除該項目——若過時項目已不再抑制任何有效違規，其本身就是缺陷（實作後，6A.3 過時強制檢查會在發現孤立的允許清單項目時，使閘門失敗）。

**請勿**為了讓測試更快通過而加入允許清單項目。允許清單持續增長卻仍顯示綠燈的閘門，只會帶來對品質的錯誤安全感。

### 當閘門因你的 PR 而失敗時

1. **仔細閱讀閘門輸出**——它會明確指出哪個檔案或符號違反規則。
2. **修正違規**——大多數閘門都是確定性的檔案系統檢查，只要程式碼正確就會通過。
3. **如果違規是既有問題**（也就是並非由你引入，但閘門現在已涵蓋該問題）：加入允許清單項目，並附上說明理由的註解與追蹤議題。
4. **如果閘門採用棘輪機制**（覆蓋率、ESLint 警告、重複程式碼、複雜度）：代表你的變更讓指標惡化。請修正根本問題；或者在少數情況下，若變更是刻意為之且指標下降可接受，可執行 `npm run quality:ratchet -- --update`——但請在 PR 說明中記錄原因。
5. **建議性閘門**（`continue-on-error: true`）僅供參考——它們不會阻擋合併，但會顯示在 CI 摘要中。即使如此，也請修正相關問題。

---

## 新增關卡

1. 建立 `scripts/check/check-<name>.mjs`（或 `.ts`）。政策關卡以 0/1 結束。
   棘輪式關卡透過 `collect-metrics.mjs` 將指標輸出至 `quality-metrics.json`。
2. 將 `"check:<name>": "node scripts/check/check-<name>.mjs"` 新增至 `package.json`，並
   在 `config/quality/gate-manifest.json` 中同步該別名及其完全相同的命令。
   變更或移除現有的驗證別名時，也請套用相同的同步操作。
   執行 `npm run check:gate-manifest`；pre-commit hook 與 CI 變更分類
   會強制執行此契約。
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

## 合理化待辦清單（ROI 審查 — 階段 9 第 3 波）

此清單已於 2026-06-17 對照 `ci.yml` 完成核對（先前版本遺漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。針對核對後集合進行的 ROI 審查
找出了下列合理化候選項目。**合併屬於機械式 CI
變更；切換／移除則是保留給操作者決定的政策事項。** 以下任何項目
目前皆尚未套用。

**上方亦未記載**（建議性、低訊號）：`docs-lint` 工作
（markdownlint + Vale，整個工作使用 `continue-on-error`），以及獨立掃描器工作流程
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0` 位於
`quality-baseline.json` 中，但未連接至 `ci.yml` 內具阻擋作用的棘輪機制——此指標
目前處於孤立狀態。

### 合併／去重（機械式、風險較低）

每個候選項目皆已於 2026-06-17 對照實際閘門狀態完成驗證（信任但仍需查證）；
數個「顯而易見」的合併實際上會掩蓋技術債，並**不能**直接無痛替換。

- **`check:docs-sync` 執行兩次**——一次在 `lint` 工作中獨立執行，另一次則在 `check:docs-all`（`docs-sync-strict`）和 husky pre-commit hook 中執行。✅ **已完成**——已移除 `lint` 中的獨立呼叫。
- **CVE 掃描**——❌ **無法乾淨合併。** `audit:deps` 會阻擋所有五個 lockfile 中的重大安全公告與未完成稽核，同時依目前政策將高風險安全公告回報為警告；`check:vuln-ratchet`（osv）僅在相較於已簽入的基準出現_退步_時失敗，且在必要時會拒絕缺失的測量結果。兩者語意不同——移除 `audit:deps` 將失去絕對的重大風險閘門，以及獨立的套件稽核紀錄。兩者皆保留。
- **循環偵測**——✅ **已完成**（#15159 G-01/G-02）。此處舊版文字將 `check:cycles` 稱為「綠燈、經過篩選」的閘門，並以 `check:circular-deps`（dpdm）回報 91 個循環為由，主張應保留其阻擋作用。該綠燈其實是**誤判綠燈**：`check:cycles` 掃描了 5 個子目錄（450 個檔案），僅比對靜態 `import|export … from`，並捨棄所有 `@/` 與 `@omniroute/open-sse/` 說明符，因此無法發現主導此儲存庫的動態 import + 別名循環。現已修正：閘門目前會走訪 `src` + `open-sse`（5023 個檔案），從 TypeScript AST 收集說明符（因此 `import("…")` 會計入，而類型位置中的 `typeof import("…")` 不會），並解析 tsconfig `paths`。其找到的是 **14** 個循環，而非 0 個。由於無法在閘門 PR 中修正 14 個既有循環，`check:cycles` 現已改為**棘輪機制**（`--ratchet`，上限為 `quality-baseline.json` 中的 `metrics.cycles.value = 14`，`direction: down`）——它會阻擋任何_退步_，且數量只能下降。CI 執行 `npm run check:cycles:ratchet`。逐步消減工作隨 **A-01** 推進。`check:circular-deps`（dpdm）仍維持建議性質，作為涵蓋範圍更廣的第二意見。
- **複雜度**——✅ **已完成**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：單次 ESLint 走訪，依 ruleId 計數，使循環複雜度 + 最大行數與認知複雜度基準彼此獨立；個別的 `check:complexity` / `check:cognitive-complexity` 仍保留供本機執行 `--update`。
- **`/api` 反幻覺檢查**——✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：對 `src/app/api` 進行一次檔案系統清查，openapi-routes + docs-symbols 仍會各自獨立回報；個別檢查仍保留供本機執行。
- **`check:node-runtime` 在 11 個工作中執行**——⚠️ **ROI 低。** 每個工作都使用獨立 runner，且檢查時間短於 1 秒；總節省時間約 10 秒，代價則是失去成本低廉的逐工作防護。不值得為此折騰。
- **CI lint 上的 `typecheck:noimplicit:core`**——✅ **已從 lint 工作中移除**（原本為建議性 `continue-on-error`）；具阻擋作用的類型介面為 `typecheck:core` + `check:type-coverage`。保留本機指令碼。

### 切換／決策（操作者政策）

- `check:openapi-security-tiers`（建議性）——❌ **無法直接乾淨切換。** 它以 0 結束，但會警告 `LOCAL_ONLY_API_PREFIXES` 下有數個 `traffic-inspector` 路由缺少 `x-loopback-only: true` 註解。若要強制執行，必須先將這些註解加入 `openapi.yaml`。
- `typecheck:noimplicit:core`（建議性）——大部分已由具阻擋作用的 `check:type-coverage` 棘輪機制涵蓋。可將其切換為棘輪機制，或移除多餘的第二次 `tsc` 執行。
- `test:vitest:ui`（目前**具阻擋作用**）——既有失敗已在 `vitest.config.ts` 中明確排除，並附有 `// #8618` 追蹤註解；新的失敗會使工作失敗。
- `check:secrets`（gitleaks，具阻擋作用的棘輪機制）——目前上限為 `quality-baseline.json` 中的 `metrics.secretFindings`。任何例外都需要在 `.gitleaks.toml` 中加入具充分理由的項目；無法取得測量結果時狀態為 INCOMPLETE。此掃描是 GitHub 原生機密掃描與 `check:public-creds` 的補充。
- `check:pr-evidence`（具阻擋作用，對 PR 內文進行 grep）——誤報風險高；若移除，將削弱 Hard Rule #18 的執行力度，因此這確實是一項政策決策。
- `semgrep`（建議性的獨立工作流程）——在 OWASP 類別方面與 CodeQL 重疊；可將其基準連接至棘輪機制，或予以移除。

---

## 相關文件

- 供應鏈（來源證明、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 鍵集合對等閘門

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，工作 `i18n-ui-coverage`）。
將每個 `src/i18n/messages/<locale>.json` 的葉節點鍵集合與 `en.json` 比較，只要有任何缺少或多餘的葉節點，
無論該鍵何時加入，都會判定失敗。`__MISSING__:` 預留位置視為存在（其內容由比例閘門處理）。
它是另外兩個以差異／百分比為基礎之閘門的絕對補充：`check-ui-keys-coverage` 對每個語系強制要求
80 % 的最低涵蓋率（在約 13,000 個鍵中缺少 43 個，仍會顯示為 99.7 %），而
`check-new-key-coverage` 只檢查 PR 新增至 `en.json` 的鍵。語系批次會以其分支建立當天的
`en.json` 產生，接著在基礎分支持續新增鍵的同時進行數天翻譯；批次 PR 本身不會新增任何鍵，
因此當批次 1（#13044）合併時，九個語系缺少 43 個鍵，而批次 2（#13660）合併時，八個語系缺少
10 個鍵（2026-09-15），兩個同類閘門都未發出警示。若閘門呈紅色，請使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修正；`extra` 葉節點
表示來源已移除該鍵——請從該語系中刪除它。`--warn` 只會回報而不判定失敗。
`--catalog=cli` 會對 `bin/cli/locales` 執行相同比較（`npm run i18n:check-keys:cli`）；
這兩個步驟都位於工作 `i18n-ui-coverage` 中。

#### `check-new-key-coverage` — 新鍵 i18n 閘門

`check-ui-value-drift` 的同類閘門。後者會偵測英文值已被**改寫**，但其翻譯未同步更新的情況；
本閘門則會偵測英文鍵已**新增**，但部分語系從未收到該鍵的情況。

`check-ui-keys-coverage` 無法偵測這類問題：它只會對每個語系強制要求最低百分比，而在約 13,000 個
葉節點中缺少 11 個鍵，涵蓋率仍為 99.9%。每種語言的百分比無法表達「此功能發佈時未經翻譯」——
整項功能可能在新語系中完全沒有文字，卻完全不會改變這個數字。

它所編碼的事件如下：Orchestration Canvas 第 3 階段在當時已有的 42 個語系中翻譯了其 11 個鍵。
數小時後，歐盟語言批次（#13044）將儲存庫擴增至 51 個語系，而九個新語系（`el`、`et`、`ga`、
`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）從未收到這些鍵。`deepMergeFallback` 會以英文替代缺少的鍵，
因此失敗模式是未翻譯的 UI，而不是空白 UI——這是真實問題，且其設計本來就不會發出警示。

如同它的同類閘門，本閘門也**能感知差異**，會比較合併基準點與工作樹中的英文，因此既有缺漏會保持
原狀，而啟用此閘門也不需要進行遷移。

**`__MISSING__:<english>` 標記無法滿足此閘門（自 2026-09-17 起）。** 它過去是文件記載的延後處理
方式——執行階段會回退至正確的英文——直到 2026-09-16 有八個功能 PR 新增了 61 個鍵，並在所有
65 個語系中填入該標記，而非進行翻譯：此閘門接受了每一個 PR，沒有任何機制加以阻擋，接著具阻擋作用的
真實翻譯比例閘門在發行版頂端對所有人失敗（pt-BR 3.2 % > 2.5 % + 0.5）。現在，標記會被判定為缺少
翻譯。若閘門呈紅色，請使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 修正，
或使用 `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，可安全脫離執行；
若沒有 `OMNIROUTE_TRANSLATION_*` 環境變數便會拒絕啟動）平行處理所有語系。必須保留英文的鍵
（固定的產品／引擎／旗標名稱）應放在 `scripts/i18n/untranslatable-keys.json` 中，絕不可隱藏在
標記之後。`vi` 完全禁止標記（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暫停測試閘門

位於 `vitest.config.ts` 的 `exclude` 清單中的檔案，是不會執行的測試，但對於閱讀目錄樹的人來說，
它看起來仍像是測試涵蓋的一部分。共有 62 個檔案累積在註解
`// #8618 — pre-existing failure; remove this exclusion when fixed` 之後。議題 #8618 已於
2026-08-11 關閉，但它追蹤的清單卻從 45 個項目增至 62 個，且每個新增項目都沿用了指向已失效議題的
註解。最終逐一測量清單中的檔案時（#13204），**62 個檔案中有 51 個不需變更任何原始碼，
便可在目前的程式碼樹上通過**。

此閘門要求每個解析至實際檔案的排除項目都必須：(a) 指定追蹤議題；以及 (b) 連同其測量狀態列於
`config/quality/vitest-exclusions.json` 中。如此一來，新增排除項目會成為專用檔案中可審查的差異，
而不是在含有 60 個項目的陣列裡再增加一行。它刻意不會重新執行被排除的測試——這需要約 10 分鐘，
應由週期性工作負責；清冊會記錄每個項目上次測量的時間。
