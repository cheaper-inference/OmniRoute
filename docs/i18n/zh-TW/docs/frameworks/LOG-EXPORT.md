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

設定鍵（`type: "bigquery"`）：

| 鍵                   | 說明                                             |
| -------------------- | ------------------------------------------------ |
| `projectId`          | 存放資料集的 GCP 專案                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                  |
| `location`           | 僅在需要建立資料集時使用（預設為 `EU`）          |
| `serviceAccountJson` | 服務帳戶金鑰。機密資訊：靜態儲存時加密，絕不傳回 |
| `autoCreate`         | 首次匯出時建立資料集與資料表（預設為 `true`）    |

服務帳戶需要目標資料表的 `bigquery.tables.updateData` 權限，且在
啟用 `autoCreate` 時，還需要 `bigquery.datasets.create` / `bigquery.tables.create` 權限。

設定的批次是以**游標**為單位，而非以 HTTP 為單位：`send()` 會將其分割成每次最多 500 列的 insertAll
呼叫，因此較大的 `batch_size` 不會觸及 BigQuery 的 10 MB 請求上限。
暫時性狀態碼（408/429/500/502/503/504）會採用指數
退避策略重試最多三次，並重複使用相同的 insertIds；驗證與結構定義失敗則會在第一次嘗試時擲出例外，而不會
白白耗費整次執行。

剛建立的資料表尚無法被串流端點看見，因此端點會在幾秒內回應
404。此 404 會觸發重試，但**僅限於資料表是在本次執行中建立的情況** —
若資料表確實不存在，仍會快速失敗。請注意，若以最近才刪除的資料表名稱
重新建立資料表，BigQuery 會在數分鐘內拒絕串流插入；這是
先刪除再重建的固有行為，因此請優先使用新的資料表名稱，而非刪除後再以原名稱新增。

**部分失敗會以 HTTP 200 回應，並包含非空的 `insertErrors[]`。** 這會被視為
失敗並擲出例外，藉此防止游標越過 BigQuery 從未
接受的資料列；`tests/unit/log-export-bigquery.test.ts` 會確保此行為維持不變。

傳輸採用純 REST — 先以自行簽署的 RS256 宣告在
`https://oauth2.googleapis.com/token` 換取存取權杖，再將資料列傳送至 `tabledata.insertAll`。不會
引入 Google SDK。存取權杖會在處理程序內依（服務帳戶、範圍）組合快取。

建立的資料表會為「記錄」分頁中的每個欄位各設一個資料欄，另加上 `exported_at`，並依照
實際查詢呼叫記錄的方式配置：

- **依 `timestamp` 按日分割**，因此以日期限定範圍的查詢只會掃描指定的日期。
- **依 `api_key_name`、`provider`、`model`、`status` 分群**（依此順序），因此依
  執行者、傳送目的地或是否失敗進行篩選時，可排除各分割區內不相關的區塊。BigQuery
  最多允許四個分群欄，且順序很重要：僅依 `api_key_name` 篩選
  即可排除區塊，但僅依 `status` 篩選則無法。
- **可選的分割區保留期限**，透過 `partitionExpirationDays` 設定（0 表示保留所有資料），於
  建立資料表時套用。

這兩項設定都會在建立時套用。既有資料表會保留原有配置，因此
若要採用這些設定，請將目的地指向新的資料表 ID。

`tests/unit/log-export-bigquery.test.ts` 會斷言對應器與資料表結構定義保持
同步，確保新的呼叫記錄欄位不會在匯出過程中遭到無聲捨棄。

批次會**同時**依資料列數與序列化後的位元組數分割成區塊。一旦匯出包含酬載，
僅考量資料列數便不足以控制大小：含有提示詞的 500 列資料可能達數十 MB，而 insertAll
會拒絕超過 10 MB 的請求。區塊會在達到 500 列或 9 MB 時結束，以先達到者為準。

---

## 5. OTLP/HTTP 追蹤資料目的地

設定使用 `type: "otlp-http"`。這是以游標為基礎、定期匯出已持久化呼叫記錄的機制，
並非 `open-sse/services/routing/otel.ts` 中盡力而為的即時路由事件接收端。
它不會讀取或變更該接收端的環境變數、計時器或緩衝區。同時啟用兩者可能產生兩種獨立的 span；
請使用 `omniroute.log-export` 插樁範圍來區分這些呼叫記錄 span。

| 索引鍵                   | 預設值 / 用途                                               |
| ------------------------ | ----------------------------------------------------------- |
| `endpoint`               | 必填的完整 HTTP(S) 追蹤資料 URL；不會附加 `/v1/traces` 後綴 |
| `headers`                | 選填的 `Name: value` 行或由字串組成的 JSON 物件；會加密     |
| `requestHeaderAllowlist` | 空白（關閉）；要擷取為 span 屬性的用戶端標頭名稱／前綴      |
| `serviceName`            | `omniroute`；資源的 `service.name`                          |
| `langfuseMapping`        | `false`；新增 Langfuse 生成／工作階段／使用者屬性           |
| `identity`               | `pseudonymous`、`keyName` 或 `none`                         |
| `paths`                  | `/v1/chat/completions`、`/v1/responses`、`/v1/messages`     |
| `timeoutMs`              | 每次 HTTP 嘗試為 `30000`                                    |
| `environment`            | 未設定；選填的 `langfuse.environment`                       |

通用儀表板會呈現這些欄位。`paths` 接受 API 陣列，或在文字區域中以換行／逗號
分隔的精確路徑。除非明確允許，否則會略過嵌入、重新排序及其他路徑。
略過的資料列仍會推進游標；現有執行器的 `exported`/`exportedTotal` 計數器
計算的是已處理的來源資料列（包含已篩除的資料列），而非已接受的 span。
篩選會在子程序中執行，不會變更其 IPC／游標契約。

URL 驗證使用 `src/shared/network/outboundUrlGuard.ts` 中不依賴資料庫的
`parseAndValidateNonMetadataUrl` 輔助函式，也就是 `block-metadata` 原則。
它與已允許私人 URL 的 webhook 驗證器一樣，會無條件檢查中繼資料／通訊協定／內嵌認證資訊，
但刻意允許 localhost／LAN 目標，而不需要全域功能旗標覆寫。
這讓自行託管的 Langfuse、Phoenix、Tempo 和 Collector 端點得以使用，包括私人 HTTP 端點。
雲端中繼資料主機一律會遭到封鎖。
不會跟隨重新導向，因此收集器無法將認證資訊重新導向至其他主機。
如同現有的詞彙式 URL 防護機制，這不會固定 DNS 解析結果；請只設定由營運者控制的主機。
只要端點不在受信任的網路上，就應優先使用 HTTPS。

### 承載資料與傳遞

OTLP/HTTP JSON（`ExportTraceServiceRequest`、`Content-Type: application/json`）會為每個
允許的資料列傳送一個 CLIENT span，並以其精確的請求路徑命名。以路徑命名可區分
Chat Completions、Responses 和 Messages，而不會將模型或身分資料嵌入 span 名稱。
資源屬性包含 `service.name` 和套件的 `service.version`。

一般聊天嘗試記錄器（`open-sse/handlers/chatCore/attemptLogging.ts`）會在完成時寫入
`duration = Date.now() - startTime`，但不提供時間戳記；
`src/lib/usage/callLogs.ts` 中的 `saveCallLogOperation` 預設會將時間戳記設為寫入
（完成）時間。因此，匯出時會將結束時間設為資料列時間戳記，開始時間設為結束時間減去持續時間
（以毫秒為單位，轉換為十進位奈秒）。呼叫端提供的歷史時間戳記
也會保留為結束時間；並沒有逐列區分開始／完成時間的標記。
空值持續時間會變成零。無效或缺少的時間戳記會導致整批失敗，而不是建立
非確定性的 span。`ttftMs` 可為空值，並對應至 `omniroute.ttft_ms`。

屬性包含 `gen_ai.operation.name="chat"`、提供者、請求／回應模型、
輸入／輸出權杖數、選填的快取讀取／快取建立／推理權杖數、HTTP 狀態、
組合、快取來源、工作階段標籤及關聯識別碼。OTLP 整數值與時間戳記
使用十進位字串；字串、布林值及小數則使用其原生 OTLP 值變體。
錯誤 span 的狀態為 ERROR，並帶有經清理的狀態訊息。標準記錄
沒有上游主機 URL，因此會省略 `server.address`，而非錯誤地
將收集器識別為模型伺服器。不會匯出費用。

只有 `includeBodies=true` 才會載入內容。當 `langfuseMapping=false` 時，
`gen_ai.input.messages` / `gen_ai.output.messages` 會承載 OmniRoute 所儲存、經清理的請求／回應
主體 JSON（可解析時會正規化），而非重新塑形的 semconv
訊息陣列。遭截斷／非 JSON 的主體會保留為原始文字。當 `langfuseMapping=true` 時，
主體只會以 `langfuse.observation.input` / `langfuse.observation.output` 輸出；
會省略 `gen_ai.*.messages` 屬性，讓每個主體只傳送一次。兩種模式
皆從現有的內容載入流程繼承 `maxBodyBytes`；
`omniroute.bodies_truncated=true` 表示內容遭截斷。
此目的地不會新增額外的管線快照，也不會讀取未經清理的產物；
選用的請求標頭擷取功能會使用下方所述、現有已載入的用戶端快照。
匯出主體時，請使用分鐘級的排程間隔，例如 `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，
而非累積每小時的待處理資料。

### 選用的用戶端請求標頭

標頭擷取**預設為關閉**。請在目的地設定中指定 `requestHeaderAllowlist`，
並啟用**匯出提示與回應**（目的地上的 `includeBodies: true`）。
允許清單接受 API 陣列，或在文字區域中以換行／逗號分隔的名稱：

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

名稱比對不區分大小寫，且必須完全相符；但若結尾有單一 `*`，則會選取符合非空標頭名稱前綴的項目。
不接受單獨的 `*`、嵌入式萬用字元及無效的 HTTP 標頭名稱。
最多可設定 64 個選取器，每個名稱／前綴最多為 256 個 ASCII 位元組。
此設定與 `headers` 分開，後者用於讓匯出器向收集器進行驗證。

擷取作業僅讀取 `pipeline_client_request`，其內容來自已儲存的詳細管線中的
`clientRawRequest`（或舊版的 `clientRequest`）。它絕不會退而使用提供者的請求標頭。
記錄請求時，必須已啟用詳細管線記錄。若停用
`includeBodies`，或用戶端快照 JSON 遺失、損毀或遭截斷，則不會輸出任何標頭
屬性。增加 `maxBodyBytes` 可避免匯出時截斷快照；
但無法還原從未儲存的詳細資料。超過 1 MiB 或包含超過
256 個標頭項目的快照會被忽略。既有的提示／回應匯出功能會與
標頭擷取一併保持啟用；允許清單不提供僅載入標頭的模式。

選取的值會成為 `http.request.header.<full lowercase header name>` OTLP 字串陣列，
即使只有單一字串也一樣。例如，`X-OmniRoute-Meta-Team: example-team` 會成為
`http.request.header.x-omniroute-meta-team`，其值為
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`。
完整前綴會予以保留：這些是一般標頭，不會進行業務欄位剖析，也不會
轉換為 `omniroute.metadata.*` / Langfuse 中繼資料。`langfuseMapping` 不會改變標頭
語意。選取的單值 `User-Agent` 也會設定標準純量屬性
`user_agent.original`。單一值中的逗號不會用來分割值。大小寫不同的項目會依儲存的
項目順序合併；只要其中任一變體無效，就會略過整個標頭。屬性依小寫名稱排序。

Authorization、Proxy-Authorization、Cookie、Set-Cookie、API 金鑰標頭、名稱含有
auth/token/secret/password/credential 標記的標頭，以及內部閘道憑證，一律會被
排除，即使已選取或在儲存時已部分遮罩也一樣。已知憑證模式會重用
共用的憑證偵測器；遮蔽標記會被略過，而不會當作安全值匯出。
僅接受字串與非空的字串陣列；不會強制轉換數字或物件。
無效名稱、原型鍵、控制字元（水平定位字元除外）及格式錯誤的 Unicode
會被忽略，不會導致整批失敗，也不會在錯誤中呈現其內容。

每個 span 最多擷取 32 個標頭，每個標頭最多 16 個值，每個值最多 4096 個 UTF-8 位元組，
且所擷取的標頭名稱與值合計最多 16384 個 UTF-8 位元組。過大／無效的標頭
會整個略過，而非截斷。選取哪些標頭是操作人員的隱私決策：看似安全的名稱
仍可能包含個人資料，這些限制／偵測器並非通用的個人識別資訊清除工具。

### 傳送限制

每個請求上限為 500 個 span，以及包含封裝在內的 4 MiB UTF-8 JSON。
游標批次的第一個請求送出前，會先檢查每個允許的 span 的大小。若個別
span 超過限制，該批次的任何部分都不會送出，並會回報失敗，提示降低
`maxBodyBytes`；不會默默將其捨棄。預先檢查只保留記錄參照與
位元組計數，並捨棄每個暫存的 span／JSON；系統會針對大小受限的區塊重建 span，
而非保留整批資料的第二份序列化副本。HTTP 408/429/5xx、網路失敗及逾時最多會
嘗試三次，並採用 250/500 ms 的指數退避。`Retry-After` 的秒數或 HTTP 日期
可將延遲延長至最多 5 秒。其他狀態會立即失敗。OTLP 2xx 部分拒絕也會擲出錯誤，而非
將遺失的 span 視為已確認；接受空白或有效 JSON 的確認回應，
回應讀取上限為 64 KiB。

錯誤僅包含匯出器自身掌握的資訊：HTTP 狀態、重試類別、嘗試次數及已傳送的 span
數量，或固定的確認回應／網路失敗訊息。收集器的回應本文、
部分成功計數及回應標頭絕不會複製到錯誤、記錄或
儀表板中。失敗或部分接受的批次不會被確認：目的地會顯示
失敗及該狀態，游標會停留在最後一個已確認的批次，而下次執行
會重新傳送相同的資料列。永久性狀態會持續造成失敗，直到收集器或設定
修正為止。請使用收集器本身的記錄查看回應詳細資訊。呼叫記錄的錯誤摘要會保留
其獨立的遮蔽處理。
`prepare()` 不會佈建任何資源；測試會精確地 POST `{"resourceSpans":[]}`，並回報
HTTP 狀態，不會寫入呼叫記錄 span。

追蹤 ID 與 span ID 分別是對
`"omniroute.trace\\0" + callLogId` 與 `"omniroute.span\\0" + callLogId` 計算 SHA-256 後，取前 32/16 個十六進位數字。重新傳送時會使用
相同的 ID。這不保證去重：某些後端（包括 Langfuse
v4 資料擷取）不會對相同 ID 的 span 去重。當機或部分區塊失敗時，
最多可能重新傳送一個尚未確認的游標批次；整個批次都可能重複，
而不只是最後一個 HTTP 區塊。選擇游標批次大小時，請考量此取捨。

### Langfuse 範例

為自行託管的 Langfuse 執行個體設定下列欄位：

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

在本機將字面值 `public-key:secret-key`
字串以 Base64 編碼，建立 Authorization 值（例如使用 `Buffer.from(publicKey + ":" + secretKey).toString("base64")`）。
請勿將真實憑證貼到記錄、螢幕擷取畫面或議題中。此對應會自動
設定 `x-langfuse-ingestion-version: 4`；Authorization 仍透過 `headers` 提供。
標頭與產生的身分識別鹽值皆使用既有的加密機密欄位
機制與 API 預留位置；必須設定 `STORAGE_ENCRYPTION_KEY`。

對應會新增生成類型／模型、JSON 用量詳細資訊（輸入／輸出／總計及可用的
快取鍵）、JSON 輸入／輸出快照、ERROR/DEFAULT 層級、經清理的狀態訊息、
追蹤名稱、工作階段 ID、選用的環境，以及可篩選的
`langfuse.observation.metadata.<key>`，用於提供者、請求的模型、路徑、組合、快取
來源及狀態。只有在 TTFT 已知且位於持續時間範圍內時，才會將 `langfuse.observation.completion_start_time` 設為
開始時間 + TTFT，並採用 ISO 8601 格式。不會傳送任何費用屬性。

身分識別模式適用於 `langfuse.user.id`：

- `pseudonymous`（預設）：使用每個目的地專屬的隨機
  32 位元組鹽值，對 API 金鑰的內部 ID 進行 HMAC-SHA256 運算。若建立時未提供鹽值，則會產生鹽值，並加密
  儲存為 `identitySalt`，絕不回傳，且在編輯時保留。原始金鑰 ID 絕不會
  放入 span 屬性中。重新建立／輪替目的地的鹽值會改變身分識別結果。
- `keyName`：設定的 API 金鑰名稱，會刻意揭露該操作人員標籤。
- `none`：不提供使用者 ID。若有工作階段標籤，仍會匯出；這些模式不會
  將任意提示內容或操作人員提供的工作階段／關聯標籤匿名化。

### 不回填歷史資料直接開始

僅在建立時，啟用 **從目前位置開始（略過現有日誌）**，或在
建立 API 的負載最上層傳入 `startFromCurrentPosition: true`。這會使用現有的游標
輔助函式，將 `cursor_row_id` 初始化為目前保留的呼叫日誌中最大的 rowid，
不需進行遷移。預設為 false（游標為 0，並回填保留的歷史資料）。
這不是更新時用來重設游標的設定。

共用的 `ttftMs` 新增項目也會在 BigQuery 對應器
和新資料表結構中新增可為 null 的 `ttft_ms` 欄位：其結構測試要求每個標準記錄欄位都有
對應的資料表欄位。現有資料表會維持原樣繼續匯出：`prepare()` 會讀取資料表結構，
並僅在缺少 `ttft_ms` 欄位時省略該欄位。新增可為 null 的 INT64 欄位，即可在下次執行時取得 TTFT，
或改用新資料表。不需要 PATCH、自動變更結構或額外
權限；所有其他資料列欄位仍會進行嚴格的結構檢查。

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

- **儀表板**：整合 → 日誌匯出。新增目的地，執行**測試**以檢查憑證
  而不寫入資料列，然後啟用目的地。
- **待處理資料**：每張目的地卡片都會顯示待處理的資料列和游標；`GET
/api/log-export/status` 會回傳相同的數據，以及最近 20 次工作執行記錄。
- **某個目的地失敗不會導致其他目的地失敗** — 執行摘要會在 `last_status` / `last_error` 中記錄各目的地的
  狀態，而工作執行歷史記錄則會保留彙總資訊。
- **刪除目的地也會刪除其游標。** 重新新增時，會從保留的最舊
  呼叫日誌開始，因此會重新傳送目的地可能已擁有的資料列。在 BigQuery 上，每列的
  `insertId` 只有在 BigQuery 本身的去重複時間範圍內才能消除這類重複，因此應優先選擇停用
  目的地，而不是刪除它。
