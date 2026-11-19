# Log export (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md)

---

持續以增量方式將 OmniRoute 呼叫日誌匯出至外部分析儲存區。

日誌儀表板分頁會將請求歷程記錄保存在 SQLite (`call_logs`) 中，其容量受
輪替與保留政策限制。日誌匯出會依排程將同一組記錄傳送至外部，使其保存時間能超越
本機資料庫，並可與其他資料進行聯結。BigQuery 是第一個目的地；
此管線採用登錄機制，因此可透過擴充來新增更多目的地。

---

## 1. 運作方式

```
伺服器（解密並驗證設定、協調游標）
  → 啟動 IPC → 隔離的 exportChild 作業系統程序
    → 唯讀 storage.sqlite → 共用的呼叫日誌查詢／對應
      → 非同步構件載入 → 目的地 prepare()/send()
        → 批次 IPC → 伺服器保存游標 → 確認 IPC
          → 下一批次；完成 IPC → 伺服器記錄成功
```

- **排程** — 一個 `JobRegistry` cron 工作，名稱為 `log_export`，預設為 `0 * * * *`（每小時，
  UTC）。在 `src/lib/initCloudSync.ts` 中註冊；可透過 `OMNIROUTE_LOG_EXPORT_CRON` 覆寫。
  每次觸發時，會依序處理每個**已啟用**目的地的待匯出資料。
- **游標** — 使用 SQLite 隱含的 `call_logs.rowid`，並針對每個目的地保存在
  `log_export_destinations.cursor_row_id` 中。刻意不使用 `timestamp` 作為游標：呼叫端
  可能提供自己的值，因此較慢的請求可能在較晚開始但較快完成的請求之後才寫入，
  而以時間戳記為游標便會略過它。
- **批次處理** — 每個請求處理 `batch_size` 筆資料列（預設為 500），每次執行處理 `max_rows_per_run` 筆資料列
  （預設為 10000），讓大量積壓資料能分散至多次觸發處理，而非阻塞單次執行。
- **傳遞** — 只有在 `send()` 成功完成後，游標才會向前推進。批次失敗時，
  游標會維持原位，因此下次執行時會重試相同的資料列。其保證為
  至少一次傳遞加上目的地端去重，而非真正的恰好一次傳遞：BigQuery 使用呼叫日誌 ID 作為每個
  資料列的索引鍵，並在自身的去重時間窗內盡力遵循此索引鍵。
- **重疊防護** — cron 觸發與 `POST .../run` 可能同時發生。若某個目的地
  已在處理待匯出資料，便會略過，而不會重複處理（執行結果中為 `skipped: true`），
  因此並行執行不會重新傳送批次，也不會將游標寫回較早的位置。
- **清除後復原** — 如果 `cursor_row_id` 最終高於 `MAX(rowid)`（整個資料表已
  清除且 rowid 重新起算），執行器會將游標重設為 0，而非永久無法讀取新資料。

### 隔離執行器與限制

在 Node 上，每個目的地的執行都會啟動一個獨立、短暫存續的作業系統子程序（使用具備 IPC 的 `child_process`，
而非 `worker_threads`）。主體讀取、負載 JSON 解析／序列化、目的地
`prepare()` 與目的地網路 I/O 都在其中執行，而非在伺服器的事件迴圈上執行。
只有設定與小型進度訊息會透過 IPC 傳遞；匯出的記錄絕不會回傳至
伺服器。cron 工作與「立即執行」路由維持相同的公開結果與重疊防護。

子程序會使用 `node:sqlite`，以唯讀方式開啟伺服器解析出的 `DATA_DIR/storage.sqlite`，
並設定 `busy_timeout=5000` 與 `query_only=ON`。它不會匯入任何資料庫單例，也不會執行
遷移、備份或 SQLite 更新。遺失／損毀構件的簿記處理（包括
損毀構件的 UPDATE）仍僅限於儀表板詳細資料路徑。兩條路徑共用一個純函式
詳細資料解析器；匯出使用非同步檔案系統讀取，並採用相同的構件 → 舊版
內嵌 → 舊版磁碟 → 無的解析順序。子程序開啟讀取器時，每次執行會擷取當下最大插入 rowid
的快照；之後插入的資料會等到下次執行才處理。這是插入
邊界，而非長時間存續的 SQLite 交易：在等待網路期間，WAL 寫入器與檢查點仍可自由運作。
此邊界不會凍結現有資料列的更新／刪除。

每個批次獲接受後，子程序會等待確認。伺服器會先透過 `advanceLogExportCursor`
保存游標，接著傳送 `ack`；在此之前不會開始下一個批次。
傳送失敗、當機或逾時時，會記錄失敗，且不會推進該批次的游標。先前
已確認的批次仍維持提交狀態；最多只有那一個尚未確認的批次可能重新傳送。
只有收到 `done` 且子程序正常結束後，才會記錄成功。發生失敗時，會使用 SIGTERM 終止子程序，
並在 500 ms 後升級為 SIGKILL，執行器則會等待程序關閉。

| 環境變數                                      | 預設值 | 用途                                |
| --------------------------------------------- | ------ | ----------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | 每個目的地的實際經過時間上限        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | 子程序 V8 老生代空間上限，單位為 MB |

無效、非正數或非整數的值會使用預設值。堆積設定並非總
RSS 上限；非常大的批次仍可能耗盡子程序記憶體，並使執行安全地失敗。
1024 MB 的預設值為啟用主體、使用 512 KiB 構件的預設 500 筆資料列批次
保留了餘裕，其中包含 BigQuery 依位元組分塊的 JSON 序列化所需空間。這並不代表
含有主體的 10000 筆資料列批次就能安全執行。V8 堆積耗盡時會記錄可採取行動的失敗資訊：降低批次
大小或提高 `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`；游標會停留在最後一個
已確認的批次。歷史內嵌／磁碟主體不受現代構件大小上限約束。
操作人員必須另外規劃 RSS 預算，尤其是在記憶體受限的容器內。

子程序僅繼承解析後的 `DATA_DIR`、`NODE_ENV`、明確設定的 `TZ`（用於舊版檔名的
本地時間解析）、存在時的 `ELECTRON_RUN_AS_NODE`，以及下列對外連線輸入：
`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY`（及其小寫形式）、
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`、`NODE_EXTRA_CA_CERTS`、`SSL_CERT_FILE`、`SSL_CERT_DIR`。
全域 Undici dispatcher 與伺服器共用僅依環境變數進行的代理解析及本機主機
略過規則，包括 `NO_PROXY`；它不會匯入 `proxyFetch.ts` 或其資料庫／功能旗標。
代理認證資訊會從轉送的輸出與記錄的錯誤中遮蔽。目的地認證資訊
僅透過一則啟動 IPC 訊息傳遞，絕不透過 argv 或環境變數傳遞；轉送的輸出／錯誤會
加上前綴並經過清理。子程序的執行引數僅停用 `ExperimentalWarning`，以免
每次 cron 執行都重複顯示 Node 的 SQLite 警告；其他類型的警告仍會顯示。

目的地模組必須能在不依賴 Next.js／僅限伺服器端相依套件的情況下匯入。現有的
BigQuery 實作已符合此契約。存取權杖快取僅在該次子程序
執行期間有效，不會跨次執行保留。Node 是受支援的執行階段（`package.json` engines），但 README 的 Bun
安裝章節與 `Dockerfile.bun` 也宣告提供使用
`bun:sqlite`（`src/lib/db/core.ts`／介接器）的正式環境相容途徑。因此，在 Bun 下，匯出作業會保留先前的
處理程序內執行途徑，並發出一次性警告：無法使用子程序堆積記憶體／逾時隔離。請使用
Node 以獲得事件迴圈與 OOM 隔離；此處並未將 Bun 視為僅供開發使用。

啟用 `includeBodies` 時，建議採用分鐘級排程，例如
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，而非累積每小時的酬載待處理量。
每次執行仍受批次與資料列限制約束。每個目的地的每次執行都會產生處理程序啟動成本；
這是以少量啟動成本換取伺服器事件迴圈隔離，而非降低總 CPU 使用量。

### 酬載（提示與補全）

預設情況下，匯出僅包含記錄**清單**所顯示的摘要欄位。啟用
**匯出提示與回應**（`includeBodies`）後，還會傳送記錄**詳細資料**
窗格中每次呼叫所顯示的內容：

| 欄位                             | 內容                                      |
| -------------------------------- | ----------------------------------------- |
| `request_body` / `response_body` | 儀表板呈現的呼叫酬載                      |
| `pipeline_route_decision`        | 路由器選擇的目標與模型                    |
| `pipeline_client_request`        | 與用戶端傳送內容完全相同的原始請求        |
| `pipeline_openai_request`        | 轉換為內部 OpenAI 格式後的請求            |
| `pipeline_provider_request`      | 實際傳送至上游、採用提供者格式的請求      |
| `pipeline_provider_response`     | 原始上游回應                              |
| `pipeline_client_response`       | 傳回給呼叫端的內容                        |
| `pipeline_error`                 | 呼叫失敗時的管線層級錯誤詳細資訊          |
| `bodies_truncated`               | 上述任一欄位達到 `maxBodyBytes` 時為 True |

這些屬於提示內容，因此**預設關閉**，並刻意設計為依目的地個別選擇。
傳送的內容就是儀表板顯示的內容，因為匯出與 `getCallLogById` 共用詳細資料
解析邏輯：酬載在
寫入時就已完成個人識別資訊（PII）清理與機密資訊遮蔽，而使用
`noLog` API 金鑰進行的呼叫完全不會儲存酬載，因此沒有可匯出的內容。

酬載會逐列從檔案系統產物讀取，因此只有要求包含酬載的目的地
才會執行資料填入。若產物遺失或損毀，仍會匯出摘要，但酬載為 null，而不會
導致整個批次失敗並使游標停滯。

`maxBodyBytes`（預設為 262144）限制每個欄位的大小。較長的酬載會**截斷而非
捨棄** — 經截斷的提示仍可回答「提出了什麼要求」— 且該資料列會以
`bodies_truncated` 標記。不會匯出串流逐區塊的增量資料；組合後的回應
已包含在 `pipeline_provider_response` 與 `pipeline_client_response` 中。

---

## 2. 檔案

| 元件                 | 位置                                         |
| -------------------- | -------------------------------------------- |
| 目的地介面契約       | `src/lib/logExport/types.ts`                 |
| 登錄表               | `src/lib/logExport/registry.ts`              |
| 機密處理             | `src/lib/logExport/secrets.ts`               |
| 執行器（父程序 IPC） | `src/lib/logExport/runner.ts`                |
| 程序生命週期         | `src/lib/logExport/childRunner.ts`           |
| 子程序進入點         | `src/lib/logExport/exportChild.ts`           |
| 唯讀開啟器           | `src/lib/db/logExportReadOnly.ts`            |
| 共用查詢／對應       | `src/lib/usage/callLogExportQueries.ts`      |
| 詳細資料解析器       | `src/lib/usage/callLogDetailResolver.ts`     |
| API 投影             | `src/lib/logExport/presenter.ts`             |
| BigQuery 目的地      | `src/lib/logExport/destinations/bigquery.ts` |
| Google 服務帳戶驗證  | `src/lib/logExport/googleServiceAccount.ts`  |
| 呼叫記錄來源         | `src/lib/usage/callLogExportSource.ts`       |
| 持久化               | `src/lib/db/logExportDestinations.ts`        |
| Cron 工作            | `src/lib/jobs/logExportJob.ts`               |
| REST 層              | `src/app/api/log-export/`                    |
| 儀表板頁面           | `src/app/(dashboard)/dashboard/log-export/`  |

結構描述：`src/lib/db/migrations/170_log_export_destinations.sql`。

---

## 3. REST API

所有路由皆須通過管理權限驗證（`requireManagementAuth`）。絕不回傳機密：
已儲存的機密會以字面值 `__stored__` 回傳，而在更新時傳回該值
會保留已儲存的憑證。

建立或更新其類型宣告含有機密的目的地時，**必須設定
`STORAGE_ENCRYPTION_KEY`**。若未設定，`encrypt()` 會直接傳回原值且不發出警告，因此寫入作業會
以 400 拒絕，而不會將憑證以明文存入 SQLite（與
Telegram webhook 採用相同的防護機制）。

| 方法     | 路徑                                     | 用途                                           |
| -------- | ---------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 目的地類型及其設定欄位清單                     |
| `GET`    | `/api/log-export/destinations`           | 列出目的地（機密已遮蔽）                       |
| `POST`   | `/api/log-export/destinations`           | 建立目的地                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | 讀取單一目的地                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | 更新名稱／啟用狀態／設定／批次處理             |
| `DELETE` | `/api/log-export/destinations/{id}`      | 刪除                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | 測試憑證，不寫入任何資料                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 立即處理完待匯出資料，採用與排程執行相同的流程 |
| `GET`    | `/api/log-export/status`                 | Cron 狀態、近期執行記錄、各目標的待處理資料量  |

`GET /api/log-export/types` 讓 UI 具備通用性：儀表板表單會根據
回傳的欄位描述資訊呈現，因此新增目的地時無須變更 UI。

---

## 4. BigQuery 目的地

設定金鑰（`type: "bigquery"`）：

| 金鑰                 | 備註                                                                            |
| -------------------- | ------------------------------------------------------------------------------- |
| `projectId`          | 持有資料集的 GCP 專案                                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                 |
| `location`           | 僅在需要建立資料集時使用（預設為 `EU`）                                         |
| `serviceAccountJson` | 服務帳戶金鑰。秘密：靜態加密，絕不回傳                                          |
| `autoCreate`         | 建立缺少的資料集／資料表；有條件地新增可為 null 的使用證據欄位（預設為 `true`） |

服務帳戶需要對目標資料表具備 `bigquery.tables.updateData` 權限，並在啟用
`autoCreate` 時具備 `bigquery.datasets.create`／`bigquery.tables.create` 權限。
更新現有資料表以新增兩個可為 null 的使用證據欄位時，也需要
`bigquery.tables.update` 權限。缺少任何必要權限都會使匯出失敗，且不會推進其游標。

一個已設定的批次是**游標**單位，而非 HTTP 單位：`send()` 會將其分割成每次最多
500 列的 insertAll 呼叫，因此較大的 `batch_size` 不會觸發 BigQuery 的 10 MB 要求上限。
暫時性狀態（408/429/500/502/503/504）最多會以指數
退避重試三次，並重複使用相同的 insertIds；驗證和結構描述錯誤會在第一次嘗試時擲出，
而不會消耗此次執行。

剛建立不久的資料表尚未能被串流端點看見，因此會在幾秒內回應 404。
該 404 會重試，但**僅限於此執行建立了資料表的情況** — 真正缺少的資料表仍會立即失敗。
請注意，使用近期刪除過的名稱重新建立資料表，會使 BigQuery 拒絕串流插入數分鐘；
這是先刪除再重新建立的特性，因此相比刪除並重新新增資料表，建議使用新的資料表名稱。

**部分失敗會以 HTTP 200 且 `insertErrors[]` 非空的形式抵達。** 這會被視為
失敗並擲出錯誤，藉此阻止游標越過 BigQuery 從未接受的資料列；
`tests/unit/log-export-bigquery.test.ts` 固定了此行為。

傳輸使用純 REST — 自簽署的 RS256 assertion 會在
`https://oauth2.googleapis.com/token` 交換存取權杖，接著資料列會傳送至
`tabledata.insertAll`。不會引入任何 Google SDK。存取權杖會在程序內依
（服務帳戶、範圍）快取。

建立的資料表會為 Logs 分頁的每個欄位各建立一個欄，另加上 `exported_at`，並針對
實際查詢通話記錄的方式進行配置：

- **依 `timestamp` 按日分割**，因此以日期限定範圍的查詢只會掃描那些日期。
- **依 `api_key_name`、`provider`、`model`、`status` 叢集**（依此順序），因此依
  執行者、目的地或是否失敗進行篩選時，可以修剪每個分割區內的區塊。BigQuery
  最多允許四個叢集欄位，且順序很重要：僅篩選 `api_key_name` 會進行修剪，而僅篩選
  `status` 則不會。
- 建立資料表時可透過 `partitionExpirationDays` 設定**選用的分割區保留期限**
  （0 代表永久保留）。

這兩項設定只會在建立時套用。現有資料表會保留其既有配置，因此若要採用這些設定，
請將目的地指向新的資料表 ID。

`tests/unit/log-export-bigquery.test.ts` 會斷言對映器與資料表結構描述保持同步，因此
新的通話記錄欄位不會在匯出過程中無聲無息地遺失。

批次會同時依**資料列數和序列化後的位元組數**進行分割。僅依資料列數並不足夠，
因為匯出承載內容後：包含提示的 500 列可能達到數十 MB，而 insertAll
會拒絕超過 10 MB 的要求。分塊會在 500 列或 9 MB 時關閉，以先達到者為準。

---

## 5. OTLP/HTTP traces 目的地

設定使用 `type: "otlp-http"`。這是對已持久化呼叫記錄進行排程、由游標支援的匯出，
並非 `open-sse/services/routing/otel.ts` 中盡力而為的即時路由事件接收器。它不會讀取或變更該接收器的環境
變數、計時器或緩衝區。同時啟用兩者可能產生兩種彼此獨立的 span；
請使用 `omniroute.log-export` instrumentation scope 來區分這些呼叫記錄 span。

| Key                      | Default / purpose                                         |
| ------------------------ | --------------------------------------------------------- |
| `endpoint`               | 必要的完整 HTTP(S) traces URL；不會附加 `/v1/traces` 後綴 |
| `headers`                | 選用的 `Name: value` 行或字串 JSON 物件；已加密           |
| `requestHeaderAllowlist` | 空白（停用）；要擷取為 span 屬性的用戶端標頭名稱／前綴    |
| `serviceName`            | `omniroute`；資源 `service.name`                          |
| `langfuseMapping`        | `false`；新增 Langfuse generation/session/user 屬性       |
| `identity`               | `pseudonymous`、`keyName` 或 `none`                       |
| `paths`                  | `/v1/chat/completions`、`/v1/responses`、`/v1/messages`   |
| `timeoutMs`              | 每次 HTTP 嘗試為 `30000`                                  |
| `environment`            | 未設定；選用的 `langfuse.environment`                     |

一般儀表板會呈現這些欄位。`paths` 接受 API 陣列，或以換行／逗號分隔精確路徑的文字區域。
除非明確允許，否則會略過 Embeddings、rerank 及其他路徑。略過的列仍會推進游標；現有 runner 的
`exported`／`exportedTotal` 計數器會計算已處理的來源列，包括已篩選的列，而不是已接受的 span。
篩選會在子程序中完成，不會變更其 IPC／游標合約。

URL 驗證使用來自 `src/shared/network/outboundUrlGuard.ts` 的不依賴 DB 的
`parseAndValidateNonMetadataUrl` helper：`block-metadata` 政策。它具有與 webhook 驗證器相同的
無條件 metadata／protocol／embedded-credential 檢查，並允許 private URL，但刻意允許 localhost／LAN
目標，而不需要全域 feature flag 覆寫。這可支援自架的 Langfuse、Phoenix、Tempo 與 Collector
端點，包括 private HTTP 端點。Cloud-metadata 主機一律會被封鎖。
不會跟隨重新導向，因此 collector 無法將認證資訊重新導向至不同主機。
如同現有的 lexical URL guard，這不會固定 DNS 解析；只能設定由操作人員控制的主機。
只要端點不在受信任的網路上，便優先使用 HTTPS。

### Payload 與傳遞

OTLP/HTTP JSON（`ExportTraceServiceRequest`、`Content-Type: application/json`）會為每個允許的列
攜帶一個 CLIENT span，其名稱取自精確的請求路徑。路徑命名可區分 Chat Completions、Responses 與
Messages，而不會將模型或身分資料嵌入 span 名稱。資源屬性包含 `service.name` 與套件的
`service.version`。

一般聊天嘗試記錄器（`open-sse/handlers/chatCore/attemptLogging.ts`）會在完成時寫入
`duration = Date.now() - startTime`，且不提供時間戳記；
`src/lib/usage/callLogs.ts` 中的 `saveCallLogOperation` 會將時間戳記預設為寫入
（完成）時間。因此，匯出會將結束時間設為列的時間戳記，並將開始時間設為結束時間減去 duration
（毫秒，再轉換為十進位奈秒）。呼叫端提供的歷史時間戳記同樣會保留為結束時間；每列沒有開始／完成的區分資訊。
null duration 會變成零。無效／遺失的時間戳記會使批次失敗，而不是建立非確定性的 span。
`ttftMs` 可為 nullable，並會對應至 `omniroute.ttft_ms`。

屬性包含 `gen_ai.operation.name="chat"`、provider、請求／回應模型、輸入／輸出 token、選用的
cache-read／cache-creation／reasoning token、HTTP 狀態、combo、快取來源、session tag 與 correlation id。
整數 OTLP 值與時間戳記為十進位字串；字串、布林值與小數會使用其原生 OTLP 值變體。
錯誤 span 具有 ERROR 狀態與經過清理的狀態訊息。規範記錄沒有上游主機 URL，因此會省略
`server.address`，而不會錯誤地將 collector 識別為模型伺服器。Cost 不會匯出。

只有 `includeBodies=true` 才會載入內容。當 `langfuseMapping=false` 時，
`gen_ai.input.messages`／`gen_ai.output.messages` 會攜帶由 OmniRoute 儲存的經過清理之請求／回應
body JSON（可解析時會進行規範化），而不是重新塑形的 semconv messages 陣列。
遭截斷／非 JSON 的 body 會保留為原始文字。當 `langfuseMapping=true` 時，
body 僅會以 `langfuse.observation.input`／`langfuse.observation.output` 發出；
`gen_ai.*.messages` 屬性會省略，以便每個 body 只傳送一次。兩種模式都會沿用現有載入路徑中的
`maxBodyBytes`；`omniroute.bodies_truncated=true` 會標示截斷。
此目的地不會新增額外的 pipeline snapshots 或未經清理的 artifact 讀取；
選用的請求標頭擷取會使用下方所述現有的 hydrated client snapshot。
匯出 body 時，請使用每分鐘級別的頻率，例如 `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，
而不要累積每小時的待處理項目。

### 選用的用戶端請求標頭

標頭擷取預設為**關閉**。在目的地設定中設定 `requestHeaderAllowlist`，
並啟用**Export prompts and responses**（目的地上的 `includeBodies: true`）。
allowlist 接受 API 陣列，或以換行／逗號分隔名稱的文字區域：

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

名稱會以不區分大小寫且完全相符的方式比對，除非結尾的單一 `*` 用於選取非空的標頭名稱前綴。裸露的 `*`、嵌入式萬用字元和無效的 HTTP 標頭名稱都會被拒絕。
最多可有 64 個選取器，每個選取器的名稱／前綴最多 256 個 ASCII 位元組。
此設定與 `headers` 分離，後者用於向收集器驗證 exporter 身分。

Capture 僅讀取 `pipeline_client_request`，其內容來自已儲存的詳細 pipeline 中的
`clientRawRequest`（或舊版的 `clientRequest`）。它不會回退到 provider request headers。
記錄請求時必須已啟用詳細 pipeline 記錄。停用 `includeBodies`，或 client-snapshot JSON
遺失、損毀或遭截斷時，都不會發出標頭屬性。提高 `maxBodyBytes` 可以避免匯出時的快照截斷；
但無法恢復從未儲存的詳細資料。超過 1 MiB 或包含超過 256 個標頭項目的快照會被忽略。
現有的提示／回應匯出仍會與標頭擷取一併啟用；允許清單不會提供僅標頭的 hydration 模式。

選取的值會成為 `http.request.header.<full lowercase header name>` OTLP 字串陣列，
即使只有單一字串也是如此。例如，`X-OmniRoute-Meta-Team: example-team` 會成為
`http.request.header.x-omniroute-meta-team`，其內容為
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`。
完整前綴會被保留：這些是一般標頭，不會進行業務欄位解析，也不會轉換為
`omniroute.metadata.*`／Langfuse 中繼資料。`langfuseMapping` 不會改變標頭語意。選取的單值
`User-Agent` 也會設定標準純量 `user_agent.original`。單一值中的逗號不會被分割。
大小寫變體會依儲存的項目順序合併；任何無效變體都會使整個標頭被省略。屬性會依小寫名稱排序。

`Authorization`、`Proxy-Authorization`、`Cookie`、`Set-Cookie`、API 金鑰標頭、名稱中包含
auth/token/secret/password/credential 標記的標頭，以及內部 gateway 憑證，即使已被選取或在儲存中部分遮罩，
也一律會被排除。已知的憑證模式會重用共用的憑證偵測器；遮蔽標記會被省略，不會以安全值匯出。
只接受字串和非空字串陣列；不會強制轉換數字或物件。無效名稱、原型鍵、控制字元（水平定位字元除外）
以及格式錯誤的 Unicode 會被忽略，不會使批次失敗，也不會在錯誤中反映其內容。

每個 span 最多擷取 32 個標頭、每個標頭 16 個值、每個值 4096 個 UTF-8 位元組，
以及所有已擷取標頭名稱和值合計 16384 個 UTF-8 位元組。過大／無效的標頭會整個省略，不會被截斷。
選取是操作員的隱私決策：看似安全的名稱仍可能包含個人資料，而這些上限／偵測器並非通用的 PII 清理器。

### 傳送限制

請求受限於 500 個 span 和 4 MiB 的 UTF-8 JSON，其中包括封套。
每個允許的 span 都會在 cursor 批次的第一個請求之前進行大小檢查。個別
span 若大於限制，該批次不會傳送任何部分，並會失敗，同時提供降低
`maxBodyBytes` 的指引；不會靜默丟棄。預檢只保留記錄參照
和位元組計數，並捨棄每個暫存 span／JSON；span 會針對受限大小的區塊重新建立，
而不是保留批次的第二份序列化副本。HTTP 408/429/5xx、網路失敗和逾時最多會
重試三次，並採用 250/500 毫秒的指數退避。`Retry-After` 秒數或 HTTP 日期
可以將延遲延長至最多 5 秒。其他狀態會立即失敗。OTLP 2xx 部分拒絕也會擲出錯誤，而不是
確認已遺失的 span；空白或有效的 JSON 確認會被接受，且
回應讀取上限為 64 KiB。

錯誤僅包含 exporter 自有的事實：HTTP 狀態、重試類別、嘗試次數和已傳送的 span
數量，或固定的確認／網路失敗文字。收集器回應本文、部分成功計數和回應標頭絕不會被複製到錯誤、
日誌或儀表板。失敗或部分接受的批次不會被確認：目的地會顯示帶有該狀態的
Failing，cursor 會停留在最後一個已確認的批次，而下一次執行會
重新傳送相同的資料列。永久狀態會持續失敗，直到收集器或設定被修正。請使用收集器自己的
日誌查看回應詳細資料。呼叫日誌錯誤摘要保留其獨立的遮蔽處理。
`prepare()` 不會佈建任何內容；Test 只會發出 `{"resourceSpans":[]}`，並回報
HTTP 狀態，而不寫入呼叫日誌 span。

Trace id 和 span id 分別是對
`"omniroute.trace\\0" + callLogId` 和 `"omniroute.span\\0" + callLogId` 執行 SHA-256 後的前 32／16 個十六進位字元。
重新傳送時會攜帶相同的 id。這並不保證去重：包括 Langfuse
v4 ingestion 在內的某些後端，不會對相同 id 的 span 去重。當機或部分區塊失敗時，最多會重新傳送一個未確認的 cursor 批次；
整個批次都可能重複，而不只是其最後一個 HTTP 區塊。請在選擇 cursor 批次大小時將此取捨納入考量。

### Langfuse 範例

為自架的 Langfuse 執行個體設定以下欄位：

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

在本機將 Authorization 值建立為文字 `public-key:secret-key` 的 Base64
（例如使用 `Buffer.from(publicKey + ":" + secretKey).toString("base64")`）。
請勿將真實憑證貼入日誌、螢幕擷取畫面或問題回報中。此對應會自動
設定 `x-langfuse-ingestion-version: 4`；Authorization 仍需在 `headers` 中提供。
標頭和產生的 identity salt 都會使用現有的加密秘密欄位機制和 API 佔位符；
必須設定 `STORAGE_ENCRYPTION_KEY`。

映射新增生成類型/模型、JSON 使用詳細資料（input/output/total 與可用的快取金鑰）、JSON 輸入/輸出快照、ERROR/DEFAULT 層級、經清理的狀態訊息、追蹤名稱、工作階段 ID、選用的環境，以及可篩選的
`langfuse.observation.metadata.<key>`，用於提供者、要求的模型、路徑、組合、快取
來源和狀態。`langfuse.observation.completion_start_time` 是 ISO 8601 格式，僅在已知 TTFT
且其值落在持續時間內時，才會設為開始時間 + TTFT。不會傳送任何成本屬性。

身分模式套用至 `langfuse.user.id`：

- `pseudonymous`（預設）：使用隨機產生、每個目的地各自獨有的 32 位元組 salt，對 API 金鑰的內部 ID 進行 HMAC-SHA256。若建立時沒有 salt，系統會產生該 salt，並以 `identitySalt` 加密；它不會被傳回，且在編輯期間保留。原始金鑰 ID 絕不會放入 span 屬性中。重新建立或輪替目的地的 salt 會變更身分。
- `keyName`：已設定的 API 金鑰名稱，會刻意揭露該操作員標籤。
- `none`：不使用使用者 ID。若工作階段標籤存在，仍會匯出；這些模式不會將任意提示內容或操作員提供的工作階段/關聯標籤匿名化。

### 不使用回填開始

僅在建立時，啟用 **從目前位置開始（略過現有記錄）**，或在建立 API payload 的頂層傳入
`startFromCurrentPosition: true`。這會使用現有的游標輔助程式，將
`cursor_row_id` 初始化為目前保留呼叫記錄的最大 rowid，而不進行遷移。預設值為 false（游標為 0，並回填保留的歷史記錄）。
這不是更新時用來重設游標的設定。

共用的 `ttftMs` 新增功能也會在 BigQuery mapper 和新資料表 schema 中新增可為 null 的 `ttft_ms` 欄位：
其 schema 測試要求每個標準記錄欄位都必須有對應的欄位。現有資料表會維持原樣匯出：
`prepare()` 會讀取資料表 schema，並僅在該欄位不存在時省略 `ttft_ms`。新增可為 null 的 INT64 欄位即可在下一次執行時取得 TTFT，或使用新的資料表。選用的 TTFT 欄位不會觸發 schema 更新。使用量證據欄位則遵循下方的條件式、選擇加入的相容性流程；其他資料列欄位仍會進行嚴格的 schema 檢查。

---

## 6. 新增目的地

1. 建立 `src/lib/logExport/destinations/<name>.ts`，匯出一個 `LogExportDestinationType`：
   包含 Zod `configSchema`、供 UI 使用的 `fields` 描述元陣列、`secretFields`，以及
   回傳 `test()` / `prepare()` / `send(records)` 的 `createClient(config)`。
2. 將其加入 `src/lib/logExport/registry.ts` 中的 `DESTINATIONS` 陣列。
3. 在 `tests/unit/` 下撰寫測試。

這就是全部的變更：持久化儲存、cron 工作、REST 層、機密資訊加密及
儀表板表單都會讀取登錄表。

新增目的地時須遵守兩項規則：

- `send()` 在部分失敗時**必須拋出例外**。正常完成代表「目的地已擁有這些資料列」，
  而游標會永久移過這些資料列。
- 接受使用者提供 URL 的目的地，必須在發出請求前，透過
  `parseAndValidateWebhookUrl`（`src/shared/network/outboundUrlGuardPolicy.ts`）驗證該 URL，
  做法與 webhook 相同。BigQuery 不需要這項驗證：其主機位址皆為常數。

---

## 7. 操作方式

- **儀表板**：整合 → 日誌匯出。新增目的地，執行 **測試** 以檢查認證資訊
  而不寫入資料列，然後啟用它。
- **待處理項目**：每張目的地卡片會顯示待處理資料列和游標；`GET
/api/log-export/status` 會傳回相同數值，以及最近 20 次工作執行記錄。
- **某個失敗的目的地不會導致其他目的地失敗** — 執行摘要會在 `last_status` / `last_error` 中記錄每個目的地的
  狀態，而工作執行記錄會保留彙總結果。
- **刪除目的地會刪除其游標。** 重新新增該目的地時，會從最舊的保留
  呼叫記錄開始，因此會重新傳送目的地可能已持有的資料列。在 BigQuery 中，每列的
  `insertId` 只能在 BigQuery 自身的去重視窗內吸收這種情況，因此建議停用
  目的地，而不要刪除它。

### 使用量證據結構相容性

新的 BigQuery 資料表包含可為 Null 的 `usage_evidence`（包含 JSON 的 STRING）和
`usage_estimated`（BOOL）。啟用 `autoCreate` 後，現有資料表只能接收這些缺少的可為 Null 欄位。匯出程式會保留完整的現有
結構，包括欄位中繼資料，並使用傳回的 etag 提交條件式 PATCH。並行的結構變更會使匯出失敗，而不會覆寫
資料表；下一次執行時會再次讀取資料表。

停用 `autoCreate` 時，請先自行新增這些欄位，再匯出包含使用量證據的記錄。缺少結構描述／etag 中繼資料或更新失敗，也會阻止包含證據的插入作業。匯出游標不會因該失敗而前進，且證據永遠不會遭到靜默捨棄。匯出遭到阻擋時，本機記錄保留政策仍會套用，因此請在保留的來源資料列過期前解決該失敗。
