# Log export (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md)

---

持續以增量方式將 OmniRoute 呼叫日誌匯出至外部分析儲存區。

日誌儀表板分頁會將請求歷程記錄保存在 SQLite (`call_logs`) 中，其容量受
輪替與保留政策限制。日誌匯出會依排程將同一組記錄傳送至外部，使其保存時間能超越
本機資料庫，並可與其他資料進行聯結。BigQuery 是第一個目的地；
此管線採用登錄機制，因此可透過擴充來新增更多目的地。

---

## 1. 運作原理

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **行程**—一個`JobRegistry` cron 作業`log_export`，預設為`0 * * * *` （每小時， UTC）。已在`src/lib/initCloudSync.ts`註冊；可使用`OMNIROUTE_LOG_EXPORT_CRON`覆蓋。每一次蜱蟲都會耗盡**已啟用**目的地，依序。
- **Cursor** — SQLite的隱式`call_logs.rowid`，在`log_export_destinations.cursor_row_id`中的每個目標上持續存在。 `timestamp`故意不是遊標：呼叫者可以提供自己的值，因此可以在稍後啟動的較快請求之後寫入較慢的請求，並且時間戳遊標會跳過它。
- **食材**— `batch_size`每個請求行數（預設 500）， `max_rows_per_run`每次運行行數（預設 10000），因此大量積壓會在幾個週期內耗盡，而不是阻塞一個週期。
- **送貨**—遊標僅在`send()`解析後前進。失敗的批次處理會將遊標留在原來的位置，因此在下次運行時會重試相同的行。保證是至少一次加上目標端重複資料刪除，而不是真正的精確一次： BigQuery透過呼叫日誌 ID 來對每一行進行鍵控，它在自己的重複資料刪除視窗中盡最大努力遵守該 ID。
- **重疊防護**— cron tick 和`POST .../run`可以一起觸發。已耗盡的目標將被跳過，而不是耗盡兩次（運行結果中的`skipped: true` ），因此並發運行無法重新發送批次或向後寫入遊標。
- **吹掃恢復**—如果`cursor_row_id`最終高於`MAX(rowid)` （整個表被清除並且 rowids 重新啟動），則跑步者將倒回到 0 而不是永久失明。

### 孤立的跑步者和限制

Every destination run on Node starts a separate, short-lived OS child process (`child_process` with IPC, not `worker_threads`). Body reads, payload JSON parsing/serialization, destination `prepare()` and destination network I/O all run there, not on the server's event loop. Only configuration and small progress messages cross IPC; exported records never return to the server. The cron job and Run now route keep the same public result and overlap guard.

子进程使用`node:sqlite`、 `busy_timeout=5000`和`query_only=ON`以只读方式打开服务器解析的`DATA_DIR/storage.sqlite` 。它不导入DB单例，也不执行迁移、备份或SQLite更新。 Missing/corrupt工件簿記（包括損壞的工件UPDATE）僅保留在儀表板詳細資料路徑中。兩條路徑共享一個純細節解析器；導出使用非同步檔案系統讀取和相同的工件→傳統內聯→傳統磁碟→無解析順序。当子进程打开其读取器时，运行会快照最大插入 rowid；稍后插入等待下一次运行。这是一个插入边界，而不是一个长期存在的SQLite事务： WAL编写器和检查点在网络等待期间保持空闲。現有行的Updates/deletions不會被此邊界凍結。

在每個接受的批次之後，孩子都會等待確認。伺服器首先使用`advanceLogExportCursor`持久化遊標，然後發送`ack`；在此之前沒有下一批開始。傳送失敗、崩潰或逾時會記錄失敗，但不會推進該批次。先前確認的批次保持承諾狀態；最多可以重新發送一個未確認的批次。只有在`done`和乾淨的子退出之後才會記錄成功。失敗會透過SIGTERM終止子進程，並在 500 毫秒後升級為SIGKILL ，並且執行程式等待進程關閉。

| 環境變數                                      | 預設   | 目的                 |
| --------------------------------------------- | ------ | -------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | 每個目的地的掛鐘限制 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | MB中子 V8 舊空間限制 |

Invalid/non-positive/non-integer值使用預設值。堆設定不是總RSS限制；非常大的批次仍然會耗盡子記憶體並使運行安全失敗。 1024 MB預設值為啟用主體的預設 500 行批次 512 KiB工件留出了空間，包括BigQuery的位元組分塊JSON序列化。它並不能使 10000 行主體批次安全。 V8 堆耗盡記錄了一個可操作的故障：降低批量大小或提高`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`；遊標停留在最後確認的批次上。歷史上的inline/disk屍體並沒有被現代神器上限所覆蓋。操作員必須單獨預算RSS ，尤其是在記憶體有限的容器內。

The child inherits only the resolved `DATA_DIR`, `NODE_ENV`, explicit `TZ` (legacy filename local-time resolution), `ELECTRON_RUN_AS_NODE` when present, and the following outbound inputs: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (and their lowercase forms), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. A global Undici dispatcher shares the server's pure environment-proxy resolution and local-host bypass rules, including `NO_PROXY`; it does not import `proxyFetch.ts` or its DB/feature flags. Proxy credentials are redacted from forwarded output and recorded errors. Destination credentials travel only in one start IPC message, never argv or environment; output/error forwarding is prefixed and sanitized. Only `ExperimentalWarning` is disabled in child exec arguments to avoid repeating Node's SQLite warning each cron run; other warning types remain visible.

目標模組必須可匯入而無需Next.js/server-only相依性。現有的BigQuery實作已經滿足該合約。存取令牌快取僅適用於子運行，而不適用於跨運行。 Node 是受支援的執行時間（`package.json`引擎）。存在盡力而為、不受支援的Bun相容性路徑（ `src/lib/db/core.ts` / 適配器中的`bun:sqlite`和`Dockerfile.bun`），因此導出不得在其下中斷。在Bun下，匯出保留先前的進程內路徑並發出一次性警告：子heap/timeout隔離不可用。使用 Node 進行事件循環和OOM隔離。

啟用`includeBodies`時，喜歡像`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`這樣的分鐘節奏，而不是累積每小時的有效負載積壓。批次和行數限制仍然限制每次運行。流程啟動按每次運行的目的地付費；這會以少量的啟動成本換取伺服器事件循環隔離，但不會減少CPU總使用量。

### 有效負載（提示和完成）

預設情況下，匯出僅包含日誌中的總計字段**清單**顯示。正在開啟**匯出提示和回應**(`includeBodies`) 也提供了日誌**細節**每個呼叫的窗格顯示：

| 場地                             | 它包含什麼                                   |
| -------------------------------- | -------------------------------------------- |
| `request_body` / `response_body` | 儀表板呈現時的呼叫有效負載                   |
| `pipeline_route_decision`        | 路由器選擇了哪個目標和型號                   |
| `pipeline_client_request`        | 與客戶端發送的原始請求完全相同               |
| `pipeline_openai_request`        | 翻譯成內部OpenAI形狀後                       |
| `pipeline_provider_request`      | 正如實際發送到上游的那樣，以提供者方言的形式 |
| `pipeline_provider_response`     | 原始上游回應                                 |
| `pipeline_client_response`       | 返還給呼叫者的內容是什麼                     |
| `pipeline_error`                 | 失敗呼叫的管道級錯誤詳細信息                 |
| `bodies_truncated`               | 當上面的任何字段命中`maxBodyBytes`時為真     |

這是提示內容，所以是**預設關閉**並刻意根據目的地進行選擇。所發送的是儀表板顯示的內容，因為導出和`getCallLogById`共享詳細解析：有效負載在寫入時已經經過 PII 清理和秘密編輯，並且使用`noLog` API密鑰進行的呼叫根本不存儲任何有效負載，因此沒有任何內容可以導出。

有效負載是從檔案系統工件中按行讀取的，因此水合僅針對需要它的目的地運行。遺失或損壞的工件會以空負載匯出其摘要，而不是使批次失敗並擱淺遊標。

`maxBodyBytes` （預設 262144）限制每個欄位。更長的有效載荷是**被截斷而不是被丟棄**—被剪輯的提示仍然回答「所問的內容」 —並且該行被標記為`bodies_truncated`。串流傳輸的逐塊增量不會導出；組裝的回應已在`pipeline_provider_response`和`pipeline_client_response`中。

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
