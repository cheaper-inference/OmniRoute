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

CI和 Quality Gates 工作流程各自發出穩定的結論： `Gate / CI`和`Gate / Quality`。他們的版本化准入政策根據需要或建議列舉了每個上游工作。適用的所需作業必須成功：缺失、取消、跳過、待處理和未知結果無法建立PASS。有效的僅文件或僅目錄分類可能會使程式碼通道不適用；普通草案PR不是被接受的候選者。 `hotfix`標籤並不放棄證據。

兩個工作流程都涵蓋PRs到main/release分支、推送到`main`、手動調度和合併組事件。推送、調度和合併組運行完整選擇。受信任的 Mergify 佇列草稿也執行適用的`full-code`/`full-code-e2e`作業；普通PRs跳過它們。在手動合併之前，對確切的候選者運行完整調度。推送到`release/**`不會啟動這些工作流程； Release-Green 單獨觀察合併基地（`docs/ops/RUNNER_BOX.md` →託管通道）。分叉和合併群組使用託管運行器來執行作業，否則會選擇自託管運行器；在推出之前必須驗證足夠的託管容量。

普通的PR運行快速選擇。准入策略的`full-code`和`full-code-e2e`通道（E2E、整合、包工件、 Electron煙霧、 Bun SQLite、生態系統和協議用戶端）僅在 Mergify 佇列草稿或完整運行上運行： `gh workflow run ci.yml --ref <branch>`。

每張JSON收據都標識已簽出的SHA、工作流程運作和嘗試。 CLI拒絕checkout/event SHA不匹配。工作流程測試將策略成員資格綁定到判定作業的`needs`列表，因此新的或刪除的通道不會悄無聲息地消失。這些收據涵蓋了它們自己的工作流程，而不是發布、部署或現有諮詢掃描器的內部結構。進行分支機構規則中要求的適用檢查是一項單獨的管理變更；定義他們的工作本身並不能保護分支機構。

`API Route Typecheck`是一種獨立的工作流程檢查，位於聚合判決和本地完整觀察者的靜態配置文件之外。單獨檢查其結果以查找確切的候選者。 `.github/workflows/api-route-typecheck.yml`在PRs上運行到`main`或`release/**`中，推送到任一分支系列、手動調度和`checks_requested`類型的`merge_group`事件。它沒有路徑過濾器。合併組查看`merge_group.head_sha`；其他事件查看`github.sha`。所有事件都使用相同的API診斷門和門單元測試。 PR基地重定向請求新的檢查； body/title編輯使用僅觀察名稱`Admission not requested / API Route Typecheck` ，並且不能替代准入檢查。

### 在接受減速器中保留證據

`scripts/quality/validate-release-acceptance.mjs`減少提供的計劃及其清單；它沒有確定該計劃涵蓋完整的發布管道。其報告明確規定了`releaseAcceptance: false`，即使該計劃是`VERIFIED`。 `release-acceptance.yml`工作流程仍然使用影子裝置，而不是真正的建造、打包、啟動或促銷收據。

CLI要求`--evidence-root`驗證保留的證據。文件解析為`<evidence-root>/<artifact_id>/<member>`並散列為SHA-256。沒有證據的PASS記錄、遺失或更改的檔案、不安全的路徑或符號連結會阻止驗證。遺失的檔案並不等於空的成功日誌。現有的SHA/run/attempt檢查保持獨立：匹配的位元組無法挽救陳舊的收據。文件完整性並不是執行真實性或工件升級的證明。

### DAST使用經過驗證的CI構建

所需的`dast-smoke` CI作業在`build`之後呼叫`.github/workflows/dast-smoke.yml` 。它遵循與構建相同的code/draft選擇，包括支援的分叉PRs、發布目標PRs和合併組。遺失、失敗、取消或意外跳過的DAST作業會阻止`Gate / CI`。可重複使用的工作流程沒有獨立的PR/dispatch觸發器；手動驗證使用CI的調度，因此建置和消費者保持在一次運行中。

`scripts/ci/next-build-provenance.mjs`使用其 tar 摘要、 repository/event/run、生產者嘗試、 head/base/checkout/tree、工作流程身分、鎖定檔案、精確節點version/ABI、平台和捆綁器來密封完整的 Next 工件。 DAST從`needs.build.outputs`選擇不可變的工件ID ，需要下載摘要驗證，並在透過`scripts/ci/unpack-ci-build.py`提取其兩個允許清單成員之前，根據生產者摘要獨立地對ZIP進行雜湊處理。在提取 Next 樹之前，清單和 tar 檔案也必須與獨立生產者產出相符。它從不搜尋最新的成功分支構建。當ID和所有輸入仍然匹配時，部分重新運行可以重複使用相同的生產者嘗試；收據記錄了兩次嘗試。

消費者停留在託管的Linux運行器上，具有唯讀儲存庫權限，且沒有儲存庫機密。它安裝生產者的確切 Node 版本，然後將CLI與`OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`組裝在一起。 `scripts/build/standaloneInput.mjs`在任何回退建置之前拒絕遺失的獨立伺服器；正常的本機CLI建置保留其現有的後備。伺服器準備就緒、Schemathesis 和 Promptfoo 必須在未更改的 25 分鐘作業限制內全部成功。出處收據證明輸入身分和字節，而不是成功的DAST掃描。工件過期、運作中斷或掃描器故障仍然不完整或失敗的證據；它不能透過諮詢包裝器變成PASS 。

### UI執行能力

CI將完整的UI庫存作為四個`test-vitest`矩陣分片運行，每個分片最多有兩名工作人員，並且現有的 15 分鐘作業截止時間。第一個分片也運行MCP/autoCombo Vitest套件。所需的工作結果涵蓋每個矩陣分支；一個分片的失敗或取消不能確定候選人的准入。

夜間觀察者為每個UI分片保留一個單獨的精確候選收據，包括第一個收據中的MCP執行。需要所有四個收據、日誌和匹配的執行身分。當地`npm run test:vitest:ui`仍選擇整套；一次`--shard`運行只是部分證據。

### 單位覆蓋範圍收集

12 個單元分片在現有測試執行期間收集 V8 覆蓋率。成功的分片運行`scripts/ci/compact-v8-coverage.mjs`來壓縮原始文件，而不產生中間的伊斯坦堡報告。最終的覆蓋作業根據候選SHA、執行時間、來源根和資料雜湊驗證所有 12 個清單，然後執行 c8 的報告器和現有覆蓋閾值。輸入保留 c8 的全域檔案名稱順序；每個分片的預合併對於混合function/block覆蓋是不安全的。遺失、格式錯誤或不相容的分片將無法准入。失敗的測試分片單獨保留原始診斷覆蓋率；它無法進入最終合併。

### 單位執行進度收據

共享`test:unit:ci:shard`指令透過`scripts/ci/unit-progress-reporter.mjs`記錄`primary`、 `dashboard`和`serial`階段。正常的測試報告仍然可用。單獨的僅元資料收據記錄每個檔案的開始和完成，30 秒的偵測訊號列出仍處於活動狀態的檔案及其已使用時間。它僅記錄列入許可名單的執行元資料；測試描述、輸出、錯誤主體和完整環境未序列化。

CI將JSONL文件保留為`unit-progress-ci-<run>-<attempt>-<shard>`。作業逾時可以阻止稍後的上傳；已經發出的心跳仍然是診斷證據。丟失心跳還可以反映運行程序進程被阻止或終止。這些收據保留了現有的測試選擇、並發性、截止日期和退出狀態；它們不是候選人錄取判決。

### 合併隊列

`queue`標籤將PR傳送到合併佇列 (`.mergify.yml`)。 Mergify 在`mergify/merge-queue/`分支上打開草稿PR ， CI在那裡運行完整選擇，並且當`Gate / CI`、 `Gate / Quality`和`Merge integrity (changelog + generated skills)`通過時原始PR合併。

Mergify 將其佇列摘要寫入草稿的描述中。 Body/title-only `pull_request` `edited`事件使用特定於運行的並發群組，並且不會重新運行分類、測試矩陣、合併完整性或准入判決。僅觀察檢查名稱不能取代`Gate / CI`或`Gate / Quality`。更改目標庫的編輯需要新的候選驗證。

出隊後，推播並不總是將PR重新排隊。評論`@mergifyio queue`吧。

### 靜態掃描庫存

版本化的 npm-alias 庫存和靜態掃描成員資格位於`config/quality/gate-manifest.json`。執行`npm run check:gate-manifest`以根據`package.json`驗證腳本名稱和確切命令；新增、刪除和命令漂移都會使本機掛鉤和CI中的變更分類作業失敗。別名不是工作流程作業、矩陣實例或測試案例：這些計數不得以可互換的形式呈現。

使用`npm run quality:scan -- --list`或`npm run quality:scan:fast -- --list`檢查選定的別名而不執行它們。運行程序呼叫 npm 入口點，因此其運行時（包括配置的Bun ）被保留。清單將這些設定檔之外的別名記錄為單獨呼叫的，並且在唯讀掃描設定檔中禁止維護命令。

這些設定檔僅涵蓋靜態掃描。他們不證明產品測試、覆蓋範圍、包裝、外部檢查或候選者的完全發布驗收。工作流程准入使用連結的`config/quality/admission-policy.json`和`scripts/quality/admission-verdict.mjs`。發布觀察者資料保持獨立；獨立檢查其適用的支票和收據。完整觀察者的靜態命令在`config/quality/release-green-static-profile.json`中聲明，包括`audit:deps`、突變測試選擇和翻譯檢查。載入程式根據package.json和建模的CI/Quality聲明驗證 npm 命令；它拒絕漂移，而不是將 shell 標記作為參數執行。所需的掃描器SKIP/INCOMPLETE輸出無法建立PASS。此設定檔記錄其外部排除，並且不會取代託管覆蓋範圍、測試矩陣、套件或部署證據。以下的散文清單僅供參考，並不是門實際運作的證據。

腳本位於`scripts/check/` （策略門）和`scripts/quality/` （棘輪引擎）下。 CI的事實來源是`.github/workflows/ci.yml`。

### 已發布的文件健康狀況

`.github/workflows/i18n-base-health.yml`在選定推送到`main`和`release/v*`以及手動調度後觀察文件運行狀況。它的過濾器涵蓋文件、根 Markdown、 `llm.txt`、翻譯state/configuration和相關的 i18n 工具。單一`Published base documentation health`作業使用託管 Ubuntu 和五分鐘的截止日期。它執行唯讀驗證並寫入診斷收據，無需依賴安裝、轉換或狀態採用。

`scripts/i18n/check-base-health.mjs`要求零源哈希、缺失目標、目標哈希、陳舊翻譯和部分快取不一致。它還驗證了目前的核心document/locale範圍及其記錄的來源。無效的上下文、不完整的覆蓋範圍或中斷的檢查器會產生`INCOMPLETE`；確認漂移產生`FAIL`。兩者都返回失敗的退出狀態。收據綁定到結帳SHA、工作流程、運行和嘗試，並保留為`i18n-base-health-<sha>-<run>-<attempt>`。

這是對已發表的基礎的獨立觀察。它不會添加PR或合併群組事件、所需的PR檢查、npm 別名或靜態掃描設定檔成員。底層檢查器也會以絕對模式阻止所有五個類別。普通PR準備與入院保持分開。成功上傳無法將失敗的健康結果轉為PASS。

普通的PR使用`--preflight`和`--baseline-evidence`產生的基礎報告。只有當完整翻譯記錄和實際目標位元組相對於該確切基數沒有變化時，它才可能使英語來源處於待處理狀態。新的目標或部分快取不一致仍然會阻塞，不完整的證據無法授權準備。該報告分別公開了`preparationPending`和`mergeReady` ：成功的準備並不能使待處理的翻譯做好合併的準備。在入場前刷新組合候選中受影響的鏡像。受信任的 Mergify 佇列候選者、 `merge_group`、分支推送和手動CI運行使用絕對檢查器，沒有`--warn`或繼承故障寬恕。遺失目標雜湊值和因刪除記錄的核心文件而縮小的範圍無法產生成功的絕對判決。

### 發布PR快速路徑（`quality.yml`）

`.github/workflows/quality.yml`在main/release PRs上補充CI ，推送到`main`，調度和合併組。 PRs使用路徑過濾快速檢查。永久禁用的重複建置已被刪除；真正的build/package/boot檢查保留在CI中。單元套件和 vitest 僅在CI （`Unit Tests (N/12)`和`Vitest`）中運行。

| 工作                                             | 範圍                                                                                                      | 阻塞           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API文件參考和完整文件                                                                      | 是的           |
| `Fast Quality Gates`                             | 程式碼PRs；靜態檢查、類型檢查、儀表板類型檢查、受影響的單元測試                                           | 是的           |
| `Forgotten sibling tests`                        | 程式碼PRs；更改的模組可追溯到靜態消費者和候選兄弟測試；桶和動態導入路徑被報告為諮詢診斷，並引用白名單例外 | **諮詢**       |
| `No new ESLint warnings`                         | 代碼PRs；抑制感知的棉絨防護                                                                               | 是的，包括叉子 |
| `Merge integrity (changelog + generated skills)` | 非草稿PRs；變更日誌和產生的技能同步                                                                       | 是的，包括叉子 |

#### 忘記兄弟姐妹測試報告

`npm run check:forgotten-sibling-tests`作為`Fast Quality Gates`的諮詢步驟運行，並重複使用測試影響圖背後的導入解析器。對於每個變更的生產模組，當拉取請求差異中缺少候選測試時，它會報告確定性`changed module/symbol -> static consumer -> candidate sibling test`鏈。 Markdown 摘要和JSON結果將保留為`forgotten-sibling-tests`工作流程工件，以便在任何阻止推出之前進行校準。

桶再導出和動態導入僅用於分辨率診斷；他們絕不會造成阻礙性的發現。在`config/quality/forgotten-sibling-allowlist.json`中即時查看異常情況。每個條目必須命名消費者和候選測試，給出具體的理由，並連結GitHub問題或拉取請求。格式錯誤的條目無法關閉。異常不能抑制已刪除的候選測試或添加`.skip`/`.todo`的差異；斷言弱化和其他屏蔽仍然由獨立阻塞的`check:test-masking`門擁有。

### 職位： `lint`

在每個PR到`main`上運行。失敗時區塊合併。

| 腳本（`npm run ...`）             | 驗證                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 阻塞                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `check:node-runtime`              | Node.js版本在支援範圍內                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是的                                  |
| `check:cycles`                    | 跨所有`src/` + `open-sse/`循環導入（基於 AST，已解決 tsconfig `paths` ）。只要存在任何循環（自#15281以來失敗關閉），Bare 就會退出 1 並列出SCCs。 `check:cycles:ratchet` （ CI運行的）當計數超過`quality-baseline.json` —中的`metrics.cycles`上限時阻塞，目前為14， `direction: down`，因此它只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                       | 是（棘輪）                            |
| `check:boundary`                  | `open-sse → src`耦合：從引擎到應用程式的獨特檔案到檔案匯入（`scripts/quality/measure-boundary.mjs`；邊緣清單是 v4 core/module-split修復待辦事項）。裸=諮詢報告（與`quality:boundary`相同）。當計數超過`quality-baseline.json` —中的`metrics.boundaryOpenSseToSrc`上限（以測量的 771、 `direction: down`種子）時， `check:boundary:ratchet` （ CI運行的內容，也在`quality.yml`快速門棘輪循環中）會阻塞； `--update`只是降低了它； PRs上的相對基數（`--base-ref`，見下文）                                                                                                                                                                                                       | 是（棘輪）                            |
| `check:route-validation:t06`      | 所有路由上都存在Zod架構（第 6 層策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                  |
| `check:any-budget:t11`            | `@ts-expect-error // any`數量不超過預算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:provider-consistency`      | `providers.ts`中的每個提供者在`providerRegistry.ts`中都有一個匹配的條目（反之亦然，在允許清單中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                  |
| `check:model-lifecycle`           | 三個手動維護的路由表與簽入的生命週期快照（#11503）保持一致： `FITNESS_TABLE` （`taskFitness.ts`）沒有獲得`REGISTRY`可以路由的退休ID；每個`BUILT_IN_ALIASES`目標都存在於`REGISTRY`中，並且不存在於退休 ID 快照中； `REGISTRY`中的每個已退休 ID 都會轉送或列在`allowedRetiredInCatalog`中；並且已停用來源中沒有出現快照或已退出的`DEFAULT_DEGRADATION_MAP`來源。這並不能證明模型目前由即時上游提供服務。離線—與`config/quality/model-lifecycle.json`進行比較，以`npm run quality:refresh-model-lifecycle`手動刷新（網路；未連接CI）。 `allowedRetiredInCatalog`是一個燃盡棘輪：僅添加具有追蹤問題的條目。                                                                        | 是的                                  |
| `check:fetch-targets`             | 客戶端`src/`中的每個`fetch("/api/...")`都會解析為真正的`route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                  |
| `check:deps`                      | 倉庫中每個`package.json`的所有`npm install` -able依賴項都在`dependency-allowlist.json`中；新的未固定或已標記的包裹                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                  |
| `audit:deps`                      | 對所有五個獨立鎖定檔案（根、 Electron、 OpenCode插件v1/v2和提供者）進行 npm 審核。關鍵建議塊；高度警告仍然是明顯的警告。 Missing/failed審計是INCOMPLETE和區塊；保留每個範圍的鎖定雜湊值和報告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                  |
| `check:lockfile`                  | `package-lock.json`完整性— https 登錄、完整性雜湊、無主機覆蓋                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:licenses`                  | 生產依賴項的SPDX許可證許可名單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                  |
| `check:tracked-artifacts`         | 沒有建立工件/提交的`node_modules`符號連結（也在 husky 預提交中運行；預推送有意為輕— #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                  |
| `check:ai-attribution`            | PR提交中沒有AI/bot `Co-Authored-By`預告片或 AI 生成頁腳、標題或正文—硬規則#16 （在PR→ `release/**` —的`quality.yml`快速門循環中讀取事件負載、 PRs —無操作和PR→ `main`的`ci.yml` `commit-msg` lint lint lint 只合著者#14436                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | 每個Vitest排除都會命名一個追蹤問題並出現在`config/quality/vitest-exclusions.json` (#13204) 中                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:file-size`                 | 來源檔案（ `src/`、 `open-sse/`、 `electron/`、 `bin/`中的`.ts`/`.tsx` ）位於`cap`內，測試檔案（`*.test.ts(x)`）位於`testCap`內；凍結在`file-size-baseline.json` (`frozen` / `testFrozen`) 中的檔案不得超過其記錄的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是的                                  |
| `check:error-helper`              | executors/handlers中的錯誤回應使用`buildErrorBody()` / `sanitizeErrorMessage()` （硬規則#12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:migration-numbering`       | 遷移SQL檔案依序編號，無間隙或重複                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                  |
| `check:public-creds`              | `publicCreds.ts`以外沒有文字OAuth `client_id`/`client_secret`或 Firebase Web 金鑰（硬規則#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                  |
| `check:db-rules`                  | `src/lib/db/`模組以外沒有原始SQL ；沒有從`localDb.ts`進口桶（硬規則#2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:known-symbols`             | 在其調度表中註冊的提供者執行程序、路由策略和轉換器與磁碟上的檔案—匹配，沒有孤立或未聲明的符號                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:route-guard-membership`    | 每條生成子程序的路由均依`isLocalOnlyPath()`分類（硬規則#15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                  |
| `check:test-discovery`            | 儲存庫中的每個`*.test.ts` / `*.spec.ts`檔案都由至少一個測試運行程序收集（棘輪： `test-discovery-baseline.json`中的孤兒清單只能縮小）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                  |
| `check:test-tla-order`            | `tests/unit`下方沒有`node:test`檔案註冊一個測試，命中一個頂級`await`，然後註冊更多（#18045；棘輪： `test-tla-order-allowlist.json`只能縮）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:agent-skills-sync`         | 產生的代理技能工件與其來源目錄相符（無偏差）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 提供者logos/assets帶有記錄的出處條目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON設定檔解析並滿足 repo lint 規則                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | TypeScript編譯沒有錯誤（僅限建議警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                  |
| `typecheck:noimplicit:core`       | 嚴格`noImplicitAny` —前瞻；許多預先存在的呼叫站點仍然需要註釋                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **諮詢**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `tsc`範圍為`src/app/(dashboard)/**` (#7033) — `typecheck:core`策劃的 27 個檔案允許清單不包括任何儀表板TSX，並且`next build`也從不對其進行類型檢查（`next.config.mjs`設定`ignoreBuildErrors: true`），因此那裡的孤立標識符回歸（#6625/#6909）對於CI是不可見的。與凍結的per-file/per-TS-code計數基線（`config/quality/dashboard-typecheck-baseline.json`，與`check:known-symbols`相同的陳舊執行模式）相比， —只有超出基線計數的NEW錯誤才會通過閘；當預先存在的錯誤被修復時，使用`--update`逐步降低。                                                                                                                                                                             | 是的                                  |
| `check:build-typecheck`           | 對`tsconfig.build.json` （`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`）進行全應用生產類型檢查，表面`typecheck:core`的27文件白名單和儀表板門不覆蓋。與`config/quality/build-typecheck-baseline.json`不同；新的或增加的每個（檔案、代碼）計數失敗，較低的計數要求您進行棘輪調整。當運行包含新的或加註的對時， `--update`會拒絕，除非`--force-regressions`通過，並且拒絕新的靜默文件，除非`--force-nocheck`通過，因此加寬基線以獲得綠色和授予永久靜默是兩個單獨的故意行為。裸露的`--force`會被拒絕。還根據`config/quality/ts-nocheck-baseline.json`掃描`@ts-nocheck`的構建範圍，因為使用它的文件根本不報告任何診斷信息，否則對每個門都是不可見的。 | 是的                                  |

#### 兩個類型檢查程序的答案不同

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) 和`check:build-typecheck`在不同的選項下編譯不同的程序，同一個檔案可以在一個中是乾淨的，在另一個中充滿錯誤。

`tsconfig.build.json`設定`"strict": false`，因此`noImplicitAny`關閉。核心配置使用更嚴格的選項編譯一個包含 27 個檔案的允許列表，並遵循每個條目的導入圖，因此從未出現在建置程式中的檔案仍會在那裡進行檢查。

在判斷文件是否輸入時，結果很重要：**`check:build-typecheck`下的零診斷並不意味著零**。從 26 個檔案中剝離`@ts-nocheck`顯示其中 23 個檔案在建置程式中是乾淨的；其中 16 個出現了大約 120 個隱含的嚴格錯誤。在呼叫文件清理之前檢查兩者。

### 職位： `quality-gate`

在`test-coverage`之後運行。失敗時區塊合併。

| 腳本                         | 驗證                                                                                                              | 阻塞           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- |
| `quality:collect`            | 發出`quality-metrics.json` （ESLint警告計數、合併分片報告的覆蓋範圍）                                             | 是（棘輪上游） |
| `quality:ratchet`            | `quality-baseline.json`中的每個指標都沒有回歸（ESLint警告≤基線；覆蓋≥基線）                                       | 是的           |
| `check:duplication`          | 程式碼重複 (jscpd@4) 不超過`quality-baseline.json`中的基線                                                        | 是的           |
| `check:complexity`           | 文件級圈複雜度不超過上限（核心ESLint `complexity` + `max-lines-per-function`）                                    | 是的           |
| `check:cognitive-complexity` | 認知複雜度棘輪（`eslint-plugin-sonarjs`） —單獨ESLint通過； CI將兩者合併為單一`check:complexity-ratchets`步驟運行 | 是的           |
| `check:dead-code`            | 未使用的匯出/文件棘輪（刀）與基線相比不會回歸                                                                     | 是的           |
| `check:compression-budget`   | 壓縮基準預算—每引擎代幣節省下限不得回歸                                                                           | 是的           |
| `check:type-coverage`        | 百分比式棘輪（`type-coverage`）不回歸；很大程度包含`typecheck:noimplicit:core`                                    | 是的           |

### 工作： `codeql-scan`和`codeql-admission`

`codeql-scan`產生所有配置的分析類別。該作業成功後， `codeql-admission`驗證其確切上傳和候選警報棘輪。兩者都是`Gate / CI`必需的依賴項，包括僅文件候選者。管理激活和金絲雀要求在下面的“CodeQL棘輪”中描述。

| 腳本                   | 驗證                                                                                                               | 阻塞 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ---- |
| `check:codeql-ratchet` | 候選ref/SHA和所有配置的分析類別在警報棘輪之前必須是最新的；缺少證據區塊。全球庫存保持獨立—請參閱下面的“CodeQL棘輪” | 是的 |

### 職位： `quality-extended`

該職位會阻止適用的候選人。使用所需的棘輪檢查捆綁包大小、秘密發現、漏洞發現、工作流程發現和OpenAPI更改。循環依賴診斷仍然是建議性的。需要安裝掃描器： `scripts/ci/install-quality-scanners.sh`提供固定版本並傳播安裝失敗。缺少工具、無效報告或缺少基線會離開所需的掃描器門INCOMPLETE。

| 腳本                     | 驗證                                                                                                                                                  | 阻塞                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:circular-deps`    | 無迴圈依賴 (dpdm)                                                                                                                                     | **諮詢**                          |
| `check:bundle-size`      | 捆紮尺寸不超過上限；不可用的測量失敗                                                                                                                  | **使用--ratchet進行阻止**         |
| `check:secrets`          | Gitleaks 的發現不會回歸；所需的掃描拒絕遺失的tools/source/baseline、失敗的掃描和無效的報告                                                            | **使用--ratchet進行阻止**         |
| `check:vuln-ratchet`     | 依賴漏洞不會回歸；所需的掃描拒絕遺失的工具、無效的報告或遺失的基線                                                                                    | **使用--ratchet進行阻止**         |
| `check:workflows`        | 工作流程 lint (actionlint + zizmor)； missing/broken掃描器、無效報告或缺少棘輪基線會因INCOMPLETE失敗。有效的結果遵循所選的strict/advisory/ratchet政策 | 需要執行； CI中的 zizmor 棘輪阻塞 |
| `check:openapi-breaking` | 針對固定事件提交的公共API合約（PR合併基礎、推送前、合併組基礎； scheduled/manual檢查第一個父級）；所需測量失敗關閉                                    | **使用--ratchet進行阻止**         |

### 職位： `docs-sync-strict`

對於`main`或`release/**`的拉取請求，此作業僅針對分類為文件或程式碼變更的非草稿（或受信任佇列）候選者執行。它也在非 PR CI活動中運行；此工作流程的推送觸發器僅涵蓋`main` ，而不涵蓋`release/**`。退出非零的步驟會阻塞作業；以下僅報告的調查結果和記錄的豁免則不然。

| 腳本                           | 驗證                                                                                                                                                                                                                                                   | 阻塞                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `check:docs-all`               | 依序運行下面 7 個子門的元門                                                                                                                                                                                                                            | 是的                                                                                       |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG版本一致性、精確的`llm.txt`鏡像、翻譯的CHANGELOG section/size不變量以及不存在被取代的重複文件                                                                                                                                 | 是的                                                                                       |
| ↳ `check:docs-frontmatter`     | 編譯的文件頁面帶有有效的前題標題                                                                                                                                                                                                                       | 是的                                                                                       |
| ↳ `check:docs-counts`          | 高置信度計數不變量是嚴格的；啟發式檔案計數檢查僅發出警告，除非腳本收到`--strict` （ CI元閘不會通過它）                                                                                                                                                 | 嚴格的層級封鎖；軟層諮詢                                                                   |
| ↳ `check:env-doc-sync`         | 來源 env 讀取、 `.env.example`和`docs/reference/ENVIRONMENT.md`在明確忽略、僅文件和僅環境白名單後達成協議                                                                                                                                              | 是的，在記錄的許可名單之外                                                                 |
| ↳ `check:deprecated-versions`  | 報告安全歷史上下文之外的潛在過時版本和過時更新日期，不包括忽略的文件                                                                                                                                                                                   | 目前CI接線中的諮詢（`--strict`未通過）                                                     |
| ↳ `check:doc-links`            | 文件中的內部降價連結解析為真實文件（`[text]`/`(path)`形式）                                                                                                                                                                                            | 是的                                                                                       |
| ↳ `check:fabricated-docs`      | 文件中引用的路由、環境變數、 CLI命令、掛鉤名稱和檔案路徑存在於程式碼庫中。通過`--strict`硬門；沒有標誌的軟故障。                                                                                                                                       | 是（透過CI中的`--strict` ）                                                                |
| `check:cli-i18n`               | 使用的CLI `t()`密鑰存在於`en`中； `pt-BR`保留每個頂級部分； `zh-CN`和`zh-TW`包含`en`中的每個密鑰                                                                                                                                                       | 是的                                                                                       |
| `check:openapi-coverage`       | OpenAPI規範至少涵蓋真實路線的棘輪地板                                                                                                                                                                                                                  | 是的                                                                                       |
| `check:openapi-security-tiers` | 聲明的`x-loopback-only`/`x-always-protected`註釋必須得到`routeGuard.ts`的支援；解析器和轉發不匹配區塊。對僅本地前綴下遺失的`x-loopback-only`進行反向檢查會發出警告，並且僅模式路由將從該反向傳遞中排除。                                               | Parser/forward檢查阻塞；反向檢查諮詢                                                       |
| `check:openapi-routes`         | `openapi.yaml`中的每個`/api...`路徑在合理的`KNOWN_STALE_SPEC`白名單之後，不敏感地解析為真實路由；過時的白名單條目也會失敗                                                                                                                              | 是的                                                                                       |
| `check:docs-symbols`           | 規範非鏡像文件中的內部`/api/...` URL引用解析為真實路由或路由族； proxy/upstream/placeholder/file引用和合理的`KNOWN_STALE_DOC_REFS`條目被排除，過時的允許清單條目失敗                                                                                   | 是的                                                                                       |
| `i18n translation drift`       | 絕對准入要求零來源、缺少目標、目標雜湊、過時翻譯和部分快取不一致。普通的PR準備可能會保留精確的繼承證據或僅英語的未決更改，且完整狀態和目標位元組未更改；其報告單獨宣布合併準備就緒。缺少目標哈希值和不完整的基礎證據區塊。遺留節快取不存在並不是故障。 | 所有五個班級均阻止queue/base錄取；普通準備工作只允許經過證明的繼承工作或僅限英語的待定工作 |

產生`docs/diagrams/`下的12個README SVGs （`scripts/docs/gen-readme-<name>.mjs`； `npm run docs:readme-diagrams`重新產生全部）。每個都有一個位元組比較單元測試（`tests/unit/docs/readme-*-svg.test.ts`，作業`test-unit`），當提交的文件過時時會失敗，並且`check:docs-counts`從其`<text>`節點—讀取規範數字，這就是大綱步驟將文件中的每個大綱字串保持為不可見的`<text>`的原因。 SVG規範數字檢查讀取`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) 中列出的文件： `docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`，以及`public/images/tier-flow-dark.svg`和`tier-flow-light.svg`；永久免費、目錄條目、循環池和評分因素聲明也為`promise-pillars.svg`、 `free-tier-budget.svg`和`strategies-grid.svg`。 `free-tier-budget.svg`從即時目錄載入器中繪製其圖形，因此對`FREE_MODEL_BUDGETS`或提供者顯示名稱的變更會使CI變紅，直到重新產生該檔案。

### 職位： `i18n-ui-coverage`

| 腳本                              | 驗證                                                                                                                                  | 阻塞     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` （內聯） | UI i18n 金鑰覆蓋率為≥ 65%                                                                                                             | 是的     |
| `check-ui-value-drift` （內聯）   | 重寫的英語**價值**不留下過時的翻譯                                                                                                    | 是的     |
| `check-new-key-coverage` （內聯） | 一個**新的**英文密鑰在每個語言環境中都被翻譯— `__MISSING__:`標記被拒絕                                                                | 是的     |
| `check-translation-ratio`         | 每個語言環境的實際翻譯比例（與英語相同/佔位符/允許列表之外的缺失部分）不得超過`config/quality/i18n-translation-baseline.json` + slack | **阻塞** |

需要`fetch-depth: 0` —值漂移門將`en.json`與合併基礎進行比較。

#### `check-ui-value-drift` —過時翻譯門

捕獲其他門在結構上看不到的國際化回歸：英語值被重寫，並且從_先前_英語派生的翻譯保留下來，因此非英語用戶繼續閱讀措辭自信、現在錯誤的副本。

這是真的出貨了。 `oauthModal.googleOAuthWarning`在Antigravity登入助理落地時進行了重寫（#5203）；**43 語言環境中的 39 個**保留文字告訴操作員「複製完整的URL並將其貼到下面」 —是該提供者無法完成的流程。在#8463之前，它沒有引起人們的注意，因為：

- `sync-ui-keys`僅回填以下密鑰**缺席的**，從來沒有那些**陳舊**;
- `check-ui-keys-coverage`計算關鍵_存在_，因此過時的翻譯分數被覆蓋；
- `check-translation-drift`追蹤`docs/i18n/<locale>/**.md`文件鏡像—它從不讀取`src/i18n/messages/*.json`。自 2026-09 重新同步以來，作業`docs-sync-strict`被阻止：編輯核心文件→ `npm run i18n:run -- --files=<doc>` （部分級別，便宜）。

**差異感知，不支持基線。**它將合併基礎上的`en.json`與工作樹進行比較；對於每個英文值變化的鍵，任何仍保留未更改翻譯的語言環境都是陳舊的。這是故意的**凍結先前存在的債務**— a diff 無法揭示長期翻譯來自哪個古英語，因此門僅判斷當前更改涉及的內容。替代方案（每個密鑰哈希基線）將花費~ 600 KB產生的文件，3 ×最大的現有基線，在每個 i18n PR上攪拌。

滿足它的方法有兩種：

1. 更新受影響的翻譯，或
2. 將它們設定為`__MISSING__:<new english>` —運行時然後提供校正後的英文（`src/i18n/request.ts::deepMergeFallback`、 #7258）和用於翻譯的金鑰佇列。

如果字串的**意義**改變了，更喜歡**重新命名密鑰**：新密鑰無法繼承過時的翻譯。這就是#8463使用的模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

價值漂移和新密鑰門與`scripts/i18n/resolve-ui-diff-base.mjs`有一個不可改變的比較。工作流程將相同的基礎、基礎尖端和候選SHAs傳遞給這兩項檢查。 PR/base-retarget、push 和 merge-group 運行使用它們的事件上下文。調度候選分支需要其精確的開放PR或顯式`i18n_base_sha`輸入。沒有該輸入的`main`或`release/vX.Y.Z`的調度或計劃觀察會將最後一次提交與其第一個父級進行比較；它不是對所有繼承的翻譯債務的審計。本地呼叫需要明確比較基，例如上面的`BASE_REF`指令。

缺少或不明確的比較上下文、不可讀或無效的所需目錄以及更改的候選會產生帶有退出代碼`INCOMPLETE`**2** ，包括在警告模式下。目錄讀取使用`scripts/i18n/read-ui-catalog.mjs`；讀取失敗不會被空物件取代。不可用的基礎或不完整的輸入都無法建立PASS。

### 職位： `i18n`

完整的 i18n 驗證矩陣（每個區域一項作業）。整個工作都是諮詢性的。

| 腳本                            | 驗證                     | 阻塞                                          |
| ------------------------------- | ------------------------ | --------------------------------------------- |
| `validate_translation.py quick` | 每個語言環境的翻譯完整性 | **諮詢**（`continue-on-error: true`整個工作） |

### 職位： `pr-test-policy`

僅在拉取請求上運行。

| 腳本                   | 驗證                                                                                          | 阻塞 |
| ---------------------- | --------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | 更改`src/`、 `open-sse/`、 `electron/`或`bin/`中的生產代碼的PRs必須包含或更新測試（硬規則#8） | 是的 |
| `check:test-masking`   | 更改的測試文件不會減少淨斷言計數或添加`assert.ok(true)`同義反复                               | 是的 |
| `check:pr-evidence`    | PR機構引用了test/VPS變更證據（透過 grep PR散文—脆弱性來機械化硬規則#18 ，請參閱 Backlog）     | 是的 |

### 職位： `test-vitest`

需要`changes`分類作業。適用的矩陣分片在失敗時會阻止合併。

| 套房             | 驗證                                                   | 阻塞                                                                        |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------------- |
| `test:vitest`    | MCP伺服器（110 工具）、 autoCombo、快取— vitest runner | 是的                                                                        |
| `test:vitest:ui` | UI元件測試— vitest runner                              | **阻塞**—預先存在的故障在`vitest.config.ts`中被明確排除；新的失敗使工作失敗 |

### 每晚工作流程（預定、建議）

它們按照 cron 計劃（和`workflow_dispatch`）運行，而不是在PRs上運行。一切都是諮詢性的。

| 工作流程               | 驗證                                                                                                              | 阻塞     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 使用隨機種子+高運行次數進行快速檢查屬性測試                                                                       | **諮詢** |
| `nightly-resilience`   | 堆增長門、混沌故障注入、k6 load/soak                                                                              | **諮詢** |
| `nightly-llm-security` | Promptfoo 注入防護（區塊模式） + garak 探針（在沒有提供者機密的情況下跳過）                                       | **諮詢** |
| `nightly-schemathesis` | 使用`docs/openapi.yaml` —對即時OmniRoute進行OpenAPI合約模糊測試（架構），表面違反規範/未處理 500 秒（Fase 8 B.4） | **諮詢** |
| `nightly-mutation`     | Stryker 突變測試分數超過快速單位通道—倖存突變體表面弱斷言                                                         | **諮詢** |
| `nightly-compat`       | 支援的`engines.node`範圍內的節點引擎相容性矩陣                                                                    | **諮詢** |

性能基線（堆、 TTFB、建置時間）被記錄，而不是門控：請參閱[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)。

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

### CodeQL棘輪：候選人准入和儲存庫清單

CI透過明確依賴鏈擁有候選CodeQL准入： `codeql-scan`呼叫`codeql.yml`中的四語言矩陣，然後`codeql-admission`運行`node scripts/check/check-codeql-ratchet.mjs --candidate`。 `Gate / CI`需要兩個結果。品質保留自己的數位檢查，但在生產者完成之前不會詢問掃描器；僅`Gate / Quality`並不能完成候選人錄取。對於僅提供文件的候選人， CodeQL仍然是必需的。

`config/quality/codeql-admission-policy.json`中的策略選擇 Actions、 C/C++、 JavaScript/TypeScript和 Python、查詢套件預設值、遠端威脅模型和建置模式 none。生產者預檢拒絕掛起的啟動記錄並在顯式目標清單之外進行分支。目前的目標是main， release/v3.8.54.合約測試將這個有限清單和維護推送觸發器與套件版本進行比較；下一個版本需要審核入職。 CI現有的更廣泛發布的PR觸發器被保留，但未登入的目標在提取之前報告HOLD而不是獲取未測量的PASS。

每個矩陣作業記錄其實際的SARIF上傳ID、語言、類別、運行和嘗試、呼叫者工作流程身分、事件ref/head/base/merge SHA和策略雜湊。相關作業僅下載本次運行的收據並驗證工件摘要。它需要所有四個類別、一個成功的製作者並完成每個精確上傳的處理。它使用API的 sarif_id 過濾器，而不是在分支上找到的最新分析。部分重新運行可能會重複使用同一運行和候選者的早期嘗試中的成功類別，從而保留生成嘗試；當前失敗的生產商無法重複使用先前的綠色證據。

CodeQL操作等待處理，但其固定實作可以在狀態讀取失敗或耗盡等待後發出警告並繼續。因此，入場需再次驗證處理。缺少類別、待處理、失敗或取消的作業、過時的身份、不完整的分頁或不可用的APIs產生HOLD並退出 2。獨立掃描器工作流程不存在固定等待。未掃描的PR無法通過，因為警報查詢傳回 0。高於`metrics.codeqlAlerts.value`測量計數退出 1；不會提高基線來吸收另一個分支的警報。[上傳狀態和分析查找](https://docs.github.com/en/rest/code-scanning/code-scanning)。

收據記錄上傳和分析IDs、類別、工具版本、 ref/SHA、基線和警報編號。 SARIF identity/result計數、最小規則計數和精確警報執行個體仍然是強制性的。在接受之前會重新檢查PR/analysis身份。這些檢查建立配置的類別覆蓋範圍，而不是每個提取的來源檔案的清單。 C/C++無建置提取不包括專案建置期間產生的程式碼。來源排除仍然需要審查，貢獻者歸因需要可比較的精確基礎證據。

`codeql-maintenance.yml`提供主動發布的推播掃描和每週時間表，而無需重複PR/main生產者。 `nightly-codeql-inventory.yml`將儲存庫範圍的基線保持獨立，並在測量不可用時使用`--strict-measurement`和失敗。當地遺產收藏家的優雅跳過不是候選人入場。在驗證了較低的全球計數後，緊縮仍然是一個明確的`--update` 。

配置預設設定時不得發布高階工作流程： GitHub拒絕此組合。其版本化策略仍處於待定狀態，直到回讀經過審查的管理過渡。在發布之前，操作員會固定儲存庫、 head/base/tree、 policy/patch/rollback雜湊值和觀察到的設定狀態； `node scripts/quality/codeql-producer.mjs verify-admin-readback`檢查提供的預期和實際JSON記錄。這是一個技術防護，而不是操作員批准或取得新讀回的替代品。 PR令牌從不請求管理存取權限。推出和任何掃描器更改都需要單獨的回讀以及真正的PR、分叉和合併組相容性證據。

分叉使用託管運行器，無需持久憑證即可簽出，生產者中沒有專案install/build ，也沒有繼承的儲存庫機密。 GitHub支援SARIF上傳pull_request事件及其減少的分叉令牌；首次出資執行批准仍然是GitHub政策。切勿使用 pull_request_target 執行不受信任的程式碼。在考慮遷移完成之前，請確認受控金絲雀中的實際令牌權限、analysis_key 和所有類別環境。[分叉上傳規則](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible)，[衝突的設定模式](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows)。

**解僱由操作員決定（硬規則#14）** —絕不會在未在駁回評論中記錄技術理由的情況下駁回CodeQL警報： `won't fix`表示上游協議要求， `used in tests`表示測試夾具， `false positive`表示CodeQL無法看到的消毒劑（先例： `docs/security/ERROR_SANITIZATION.md`）。

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

**上文同樣未記載的項目**（建議性、訊號較弱）：`docs-lint` 作業（markdownlint + Vale，整個作業設定 `continue-on-error`）及獨立掃描器工作流程 `semgrep.yml` / `scorecard.yml`。CodeQL 現在於 `Gate / CI` 下具有必要的產生與准入作業，並受上述啟用要求約束。`quality-baseline.json` 中有 `semgrepFindings: 0`，但 `ci.yml` 尚未將其接入阻擋性棘輪——這項指標目前沒有對應的執行檢查。

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
