# Database Schema & Operations Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**：OmniRoute 使用啟用 **WAL 日誌記錄**的 **SQLite** 作為主要儲存區，並以 **AES-256-GCM** 對靜態儲存的敏感欄位進行加密。本指南涵蓋結構描述、遷移、備份／復原及維運操作手冊。

**來源：**

- `src/lib/db/core.ts` — 單例 + SCHEMA_SQL（17 個基礎資料表）
- `src/lib/db/migrationRunner.ts` — 版本化遷移
- `src/lib/db/migrations/` — 167 個版本化 SQL 檔案
- `src/lib/db/encryption.ts` — 加密輔助函式
- `src/lib/db/backup.ts` — 備份匯出／匯入
- `src/lib/db/healthCheck.ts` — 健康狀態診斷

---

## 為什麼選擇 SQLite？

OmniRoute 選擇 SQLite 而非 PostgreSQL/MySQL，原因如下：

| 因素         | SQLite                      | PostgreSQL               |
| ------------ | --------------------------- | ------------------------ |
| **部署**     | 內嵌式 — 不需要獨立伺服器   | 需要設定伺服器           |
| **加密**     | 應用程式層級（AES-256-GCM） | 內建 TDE                 |
| **效能**     | 對小型／中型工作負載更快    | 更適合大量並行寫入       |
| **並行處理** | WAL 模式允許並行讀取        | 完整 MVCC                |
| **備份**     | 複製單一檔案                | `pg_dump` 或檔案系統快照 |
| **使用案例** | 每位使用者個別安裝、內嵌式  | 多租戶 SaaS              |

對於**單一使用者、單一執行個體**的部署（OmniRoute 的主要使用案例），SQLite 更簡單也更快速。

### WAL 日誌記錄

`core.ts` 會使用 **WAL（預寫式日誌，Write-Ahead Logging）模式**開啟資料庫：

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL 允許在寫入期間進行**並行讀取**，這對儀表板非常重要，因為它會在記錄請求的同時執行查詢。

預設快取大小為 **65,536 KiB（64 MiB）**。SQLite 會將負數
`cache_size` 解讀為以 KiB 為單位的近似上限，並依需求配置頁面。
**設定 > 系統與儲存空間 > 快取大小**接受 **1 至
1,000,000 KiB** 的整數值；儲存設定後會將其套用至即時資料庫連線，
而 OmniRoute 會在啟動時還原已保存的值。

---

## 資料庫位置

SQLite 檔案儲存於：

| 作業系統 | 路徑                                                 |
| -------- | ---------------------------------------------------- |
| Linux    | `~/.omniroute/storage.sqlite`                        |
| macOS    | `~/.omniroute/storage.sqlite`                        |
| Windows  | `%USERPROFILE%\.omniroute\storage.sqlite`            |
| Docker   | `/app/data/storage.sqlite`（可透過 `DATA_DIR` 設定） |

附屬檔案：

- `storage.sqlite-wal` — 預寫式日誌
- `storage.sqlite-shm` — 共用記憶體檔案
- `call_logs/` — 請求承載資料成品（若已啟用）

**覆寫位置：**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 網域模組架構

OmniRoute 的資料庫在 `src/lib/db/` 中有 **110 個頂層 TypeScript 模組**。每個網域模組：

- 擁有一個或多個特定資料表
- 匯出具類型的 CRUD 函式
- 絕不存取其他模組的資料表
- 使用來自 `core.ts` 的 `getDbInstance()` 存取資料庫

### 110 個頂層資料庫模組

OmniRoute 在 `src/lib/db/` 中有 **110 個頂層 TypeScript 檔案**。以下列出部分核心模組；完整清單請參閱目錄內容：

| 模組                    | 資料表                                                         | 職責                                     |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 金鑰提供者註冊與憑證管理       |
| `models.ts`             | `key_value`（模型資料）                                        | 模型定義、能力與定價                     |
| `combos.ts`             | `combos`                                                       | 組合路由設定與排序                       |
| `apiKeys.ts`            | `api_keys`                                                     | API 金鑰生命週期、作用域與配額追蹤       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | 系統設定與共用 KV 儲存區                 |
| `backup.ts`             | —                                                              | 備份匯出／匯入作業                       |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy 設定與路由規則                     |
| `prompts.ts`            | `prompt_templates`                                             | 可重複使用的提示詞範本與版本控制         |
| `webhooks.ts`           | `webhooks`                                                     | 事件驅動的 Webhook 訂閱與日誌            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 逐請求稽核記錄（選用，高資料量）         |
| `domainState.ts`        | `domain_*`（5 個資料表）                                       | 網域預算、斷路器、鎖定、備援鏈與成本歷程 |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A 的白名單 API 金鑰                |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 歷史配額用量                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 將模型對應至預設組合                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 專用持久化狀態                       |
| `encryption.ts`         | —                                                              | 用於加密／解密欄位的輔助工具             |
| `readCache.ts`          | —                                                              | 供大量讀取作業使用的記憶體內快取         |
| `secrets.ts`            | `key_value`（加密項目）                                        | 加密的機密資料儲存                       |
| `stateReset.ts`         | —                                                              | 清除／重設資料庫狀態以進行測試           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 代理交接的工作階段上下文                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | 用量追蹤                                 |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | 壓縮設定                                 |

### 模組邊界

核心架構規則：**模組不得直接存取彼此的資料表**。若要使用另一個模組的資料，請從該模組匯入相關函式。

```ts
// ❌ 錯誤：直接對另一個模組執行 SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正確：使用 providers 模組的函式
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

此規則透過程式碼審查來強制執行——目前沒有靜態檢查，但違規情況會被標記。

---

## 基礎結構描述（17 個資料表）

`core.ts` 在 `SCHEMA_SQL` 中定義了 17 個基礎資料表。這些資料表由遷移 `001_initial_schema.sql` 建立，並構成核心結構描述。

### 核心資料表（於初始遷移中建立）

| 資料表                     | 用途                 | 主要欄位                                                                |
| -------------------------- | -------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 提供者憑證（已加密） | `id`、`provider`、`auth_type`、`api_key`、`is_active`                   |
| `provider_nodes`           | 提供者節點路由資訊   | `id`、`type`、`name`、`base_url`、`created_at`                          |
| `key_value`                | 通用 KV 儲存區       | `namespace`、`key`、`value`                                             |
| `combos`                   | 路由組合定義         | `id`、`name`、`data`、`sort_order`                                      |
| `api_keys`                 | 閘道的 API 金鑰      | `id`、`name`、`key`、`machine_id`、`allowed_models`                     |
| `db_meta`                  | 資料庫中繼資料       | `key`、`value`                                                          |
| `usage_history`            | 請求用量記錄         | `id`、`provider`、`model`、`tokens_input`、`tokens_output`、`timestamp` |
| `call_logs`                | 請求承載資料與回應   | `id`、`timestamp`、`status`、`model`、`provider`、`latency_ms`          |
| `proxy_logs`               | Proxy 請求日誌       | `id`、`timestamp`、`proxy_type`、`status`、`provider`                   |
| `domain_fallback_chains`   | 模型至提供者的鏈結   | `model`、`chain`                                                        |
| `domain_budgets`           | 各網域的支出預算     | `api_key_id`、`daily_limit_usd`、`warning_threshold`、`reset_interval`  |
| `domain_budget_reset_logs` | 預算重設歷程         | `id`、`api_key_id`、`reset_interval`、`previous_spend`、`reset_at`      |
| `domain_cost_history`      | 各網域的成本追蹤     | `id`、`api_key_id`、`cost`、`timestamp`                                 |
| `domain_lockout_state`     | 網域速率限制狀態     | `identifier`、`attempts`、`locked_until`                                |
| `domain_circuit_breakers`  | 各網域的斷路器狀態   | `name`、`state`、`failure_count`、`last_failure_time`                   |
| `semantic_cache`           | LLM 回應快取         | `id`、`signature`、`model`、`prompt_hash`、`response`                   |
| `quota_snapshots`          | 歷史配額快照         | `id`、`provider`、`connection_id`、`window_key`、`remaining_percentage` |

### 額外資料表（由後續遷移新增）

後續遷移會新增以下資料表：

- `cli_tool_state`（遷移 011）— CLI 工具狀態
- `mcp_*` 資料表 — MCP 伺服器稽核
- `a2a_*` 資料表 — A2A 任務狀態
- `usage_*` 資料表 — 用量追蹤
- `plugin_*` 資料表 — 外掛系統
- `skill_executions` — 技能執行歷程
- `memory_*` 資料表 — 記憶系統
- `compression_*` 資料表 — 壓縮系統
- `webhook_*` 資料表 — Webhook 傳遞日誌
- `acp_*` 資料表 — Agent Client Protocol
- `oneproxy_*` 資料表 — 1proxy 市集
- `proxy_assignments` — Proxy 範圍繫結
- `detailed_call_artifacts` — 呼叫日誌成品中繼資料
- `quota_alert_history` — 配額警示稽核
- `command_code_auth_sessions` — Command Code OAuth 工作階段

約 30 多個資料表的完整清單位於 `src/lib/db/migrations/`。

---

## 遷移

OmniRoute使用**版本化、冪等遷移**在`src/lib/db/migrations/`.每個遷移都是一個SQL檔。兩種命名格式並存； `_omniroute_migrations`中記錄的版本是數字前綴。

### 遷移命名

| 格式                                                 | 例子                                 | 用於                                                                                          |
| ---------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| `NNN_description.sql` （剛好 3 位數字）              | `241_seen_models.sql`                | 舊系列`001`–`241`。當時間戳格式登陸時凍結（`240`和`241`就在它之前合併）：沒有新檔案獲得序號。 |
| `YYYYMMDDHHMMSS_description.sql` （14 位數字， UTC） | `20261113120000_add_usage_index.sql` | 自 2026 年 11 月 13 日起創建的每個遷移。                                                      |

為什麼改變：對於連續編號，並行PRs選擇相同的下一個編號，除了一個編號外，所有編號都必須在合併之前重新編號。 UTC時間戳為每個PR提供了自己的版本。

時間戳格式規則（由`npm run check:migration-numbering`強制執行，與`scripts/check/lib/migrationNaming.mjs`中的生成器共用）：

- 時間戳記是真實的UTC日期和時間，不早於`20261113000000`且不超過未來10分鐘。
- 描述為小寫`snake_case`以字母開頭（`a-z`、 `0-9`、單字之間單一`_` ），最多 80 個字元。
- 具有相同時間戳記的兩個檔案是重複的。
- 無間隙規則僅適用於舊系列：從`001`到`241`每個數字都必須存在，除了已知的間隙`026`、 `055`和`121`。刪除`241` （或任何舊檔案）會使門失敗。 `001`和`241`永遠無法加入`KNOWN_GAPS`名單。帶有時間戳的文件永遠不會產生間隙。
- `src/lib/db/migrations/`中的每個條目都必須是具有有效小寫`.sql`名稱的常規檔案。目錄、符號連結、 `.SQL`或`.sql.bak`檔案、隱藏檔案或帶有空格的名稱都無法通過該門，因為執行程式會默默地跳過它或在啟動時崩潰。

**申請訂單。**運行程式按前綴的數值排序，而不是按文字排序：首先是舊的`001`–`241`文件，然後是按時間戳順序的帶時間戳的文件，然後是使用`OMNIROUTE_EXTRA_MIGRATIONS_DIRS`註冊的任何命名空間目錄（例如`ee-001`等版本）。掛起的遷移是其版本不在`_omniroute_migrations`中的任何文件，因此從舊分支遷移到新分支之後合併的遷移仍然適用於現有資料庫。

**時間戳記是建立順序，而不是合併順序。**如果您的遷移依賴由遷移建立的表或列**較新的**時間戳（例如，來自首先合併的另一個PR資料庫），新的資料庫將首先執行您的資料庫並失敗。當您的PR仍然打開時，使用`npm run db:new-migration`重新產生檔案名，以便它獲得更新的時間戳，或使其獨立。 `npm run test:migrations:fresh`將每個遷移應用到一個空資料庫並捕獲它。

### 合併的遷移永遠不會被刪除或重新命名

一旦遷移檔案位於發布分支或`main`上，它就已經在同源資料庫和開發人員資料庫、 VPS安裝和企業同步中運作。從此：

- **切勿刪除它。**全新安裝將遺失其架構，而升級的資料庫則保留其架構。
- **永遠不要重命名它。** `_omniroute_migrations`中的版本將不再與檔案匹配，因此每個已應用該版本的資料庫都將再次運行它。然後，非冪等SQL會複製資料或停止啟動。
- **需要不同的架構嗎？**使用`npm run db:new-migration`建立新的遷移。

重新命名僅對於尚未合併的檔案是安全的，這就是門的提示所指的情況。發布標籤在這裡不會改變任何內容：每次推送到`release/v*`分支都會發布Docker `:next`映像並在同源、 VPS安裝和企業同步上運行，因此在任何`vX.Y.Z`標籤存在之前，合併遷移已在真實資料庫上運行。每次刪除基本文件（無論是否已標記）都會失敗。

- **恢復合併的遷移。**刪除檔案的`git revert`會失敗。保留檔案並在新遷移中撤銷其架構： `npm run db:new-migration -- <description>`、 `DROP TABLE IF EXISTS`、 `DROP INDEX IF EXISTS`等。升級後的新資料庫將以相同的架構結束。
- **接受的重命名是：相容性條目和相同的內容。**如果合併的檔案必須移動（例如，兩個合併的檔案共用時間戳記並且執行程式因版本衝突而停止），請重新命名後一個檔案而不觸及其SQL並將`{ fromVersion, fromName, toVersion, toName }`新增至`src/lib/db/migrationRunner/constants.ts`中的`RENAMED_MIGRATION_COMPATIBILITY` 。應用舊版的資料庫會移動其`_omniroute_migrations`行，而不是再次執行該檔案。無論新的時間戳記是什麼，門都會對此類重命名發出警告，並始終對其運行交換檢查：全新安裝將文件應用到新位置，升級的數據庫則不會，因此請選擇靠近舊時間戳的新時間戳。如果內容發生變更（新遷移中仍會發生架構變更），或者條目的目標檔案不在磁碟上，則門將導致重新命名失敗。
- **切勿在同一時間戳記內重新命名。**保留時間戳記並僅更改描述的重命名會失敗，無論有或沒有條目。對於`toVersion`等於`fromVersion`的條目，執行程式將刪除舊的`_omniroute_migrations`行，並將該檔案再次套用於已執行該檔案的每個資料庫。如果沒有條目，運行程式將僅追蹤版本：它會跳過這些資料庫上的檔案（新內容永遠不會在那裡運行）並在每次啟動時記錄重新編號錯誤。使用另一個時間戳加上相容性條目，或保留名稱。
- **該門檢查重新命名的檔案是否不會再次運作。**對於每個覆蓋的重命名，門將新檔案名稱傳遞給`--must-not-apply`進行交換檢查。檢查使用真實的執行程式啟動升級的資料庫，如果執行程式再次套用該檔案（例如，因為條目的版本或名稱錯誤，或因為閘的文字解析器讀取`constants.ts`與TypeScript不同），則閘門會失敗並顯示`migration renomeada rodaria de novo`並要求您檢查條目的舊版本和新版本和名稱。

### 大門與基地檢查什麼

在拉取請求和合併佇列運行時， `npm run check:migration-numbering`將磁碟上的`src/lib/db/migrations/`與基本分支上的相同目錄進行比較。基數依此順序為： `--base-latest-tag`、 `--base <ref>`、 `MIGRATION_BASE_REF`變量，或者，當`GITHUB_EVENT_NAME`為`pull_request`、 `pull_request_target`或`merge_group`時，合併提交的第一個父級、事件負載的`merge_group.base_sha`或`git merge-base HEAD origin/$GITHUB_BASE_REF`。在沒有可解析基礎的拉取請求或合併佇列運行中，門會失敗。在沒有`--base` CI之外，它會列印`comparação com a base: pulada (sem --base)`並跳過這些規則。

`--base-latest-tag`與`HEAD`歷史記錄中的最新版本標籤（按 semver 順序的`vX.Y.Z` ；nightlies 等後綴標籤不算在內）進行比較，規則與`--base`相同。 Release-Green (`scripts/quality/validate-release-green.mjs`) 以這種方式運行門，因為推送和計劃運行沒有拉取請求基礎，並且合併可以在沒有新的CI運行的情況下落地。由於歷史記錄中沒有發布標籤，門會失敗；運行`git fetch --tags` （在CI中， `actions/checkout`和`fetch-depth: 0`帶來標籤）。

| 拉取請求的更改                                                              | 結果                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 基地上存在的文件被重新命名，帶有`RENAMED_MIGRATION_COMPATIBILITY`條目       | **警告**如果內容相同，並且無論新時間戳如何，換向檢查都會運行；如果新位置更改了最終架構（撤消重命名，或在通勤時選擇另一個新時間戳），或者運行程序在升級的資料庫上再次應用重命名的文件，則該操作會失敗。**失敗**如果內容發生變化。 |
| 基地上存在的文件被重新命名，保留其時間戳（僅描述發生變化）                  | **失敗**，有或沒有條目：跑步者將再次應用它（帶有條目）或按版本跳過它（沒有條目）。使用另一個時間戳加上相容性條目，或保留名稱。                                                                                                   |
| 基礎上存在的檔案被刪除，或在沒有條目的情況下重新命名                        | **失敗**，無論文件是否在發布標籤中。若要撤銷它，請使用`git checkout <base> -- src/lib/db/migrations/<file>`復原檔案；若要還原其架構，請使用`DROP ... IF EXISTS`新增的遷移。                                                      |
| 基地上存在的文件有不同的內容                                                | **警告**（ GitHub操作中的`::warning`註釋），並且執行換向檢查。如果編輯更改了最終架構，則會失敗，因為升級的資料庫不會再次套用編輯的檔案：將變更放入新的遷移中。無害的編輯（評論， `IF NOT EXISTS`）僅發出警告。                   |
| 添加帶有時間戳的文件，其時間戳記不比基礎的最新時間戳更新                    | 運行換向檢查，如下所述。                                                                                                                                                                                                         |
| 舊格式`NNN_`檔案新增了一個數字，位於基地最新的舊格式檔案下方                | **失敗**，即使`KNOWN_GAPS`在同一個拉取請求中進行編輯：舊系列已凍結，請使用`npm run db:new-migration`建立遷移。接受高於基地最新文件（ `release/v*`到`main`拉取請求）的舊格式檔案。                                                |
| 無序、編輯或重新命名的檔案包含`INSERT`、 `UPDATE`、 `DELETE`或`REPLACE`語句 | **警告**：交換檢查不會比較數據，因此請檢查升級後的資料庫和新資料庫應用它的順序是否會更改結果。                                                                                                                                   |

一次交換檢查會將無序、已編輯和重新命名的檔案一起覆寫。

交換檢查（`scripts/check/migration-commutation.ts`）使用實際安裝路徑建立兩個臨時資料庫：一個**升級版**一個（使用基本遷移啟動，然後使用拉取請求的遷移在同一文件上再次啟動）和一個**新鮮的**一個（透過拉取請求的遷移啟動一次）。它比較結果模式：表和列（忽略列順序）、 UNIQUE / PRIMARY KEY和FOREIGN KEY約束、每個表的規範化`CREATE TABLE`文字（涵蓋CHECK約束、排序規則、產生的列和表選項）、索引、觸發器和視圖。不比較行數據。如果它們匹配，門就會列印出文件無序，但會通勤並通過。如果它們不同，則門會失敗，並顯示差異和情況提示：對於無序文件，使用`npm run db:new-migration`重新生成其名稱，這是安全的，因為文件尚未合併；對於已編輯的基礎文件，恢復基礎內容並將更改放入新的遷移中；對於重命名的文件，撤消重命名或在其通勤處選擇另一個新時間戳，切勿使用其他名稱的相同時間戳。如果檢查本身無法運行，則CI中的門會失敗，並且僅在本地發出警告。對於已編輯的基本文件，升級的資料庫是使用該文件的基本內容構建的，並且第二次引導會跳過它，因為它的版本已被記錄。對於重命名的文件，升級後的資料庫是使用舊名稱下的文件構建的，第二次啟動時將其`_omniroute_migrations`行移動到相容性條目，而不是再次運行；門通過`--must-not-apply`傳遞新名稱，因此如果第二次啟動應用它，檢查將失敗。如果拉取請求遷移無法套用於升級的路徑，即在每次基礎遷移之後（無論是否在全新安裝時也失敗），gate 會報告`migration do PR não aplica`並要求您針對基礎的當前架構修復SQL ；如果檔案依賴具有較晚時間戳的另一個拉取請求遷移，請使用`npm run db:new-migration`重新產生其名稱。

要在本地運行相同的比較，請明確傳遞基數，例如`npm run check:migration-numbering -- --base origin/<base-branch>`或`npm run check:migration-numbering -- --base-latest-tag`來與最新版本進行比較。

### 轉換 Open PR的`NNN`遷移

在切換之前開啟的拉取請求可能仍然攜帶順序文件，例如`242_add_widgets.sql`。 `241`以上的舊數字被拒絕，因此在合併之前將其轉換：

1. **使用生成器重新命名文件，保留描述。**執行`npm run db:new-migration -- <same description>`以取得新名稱，將SQL移入其中，然後刪除舊的`NNN_`檔。描述必須保持相同：下面的相容性條目與之相符。
2. **如果持久性資料庫執行舊版本，請新增相容性條目。**如果保留的任何資料庫（同源、 VPS、貢獻者自己的安裝）使用`NNN_`檔案運行PR的構建，請將`{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }`添加到`src/lib/db/migrationRunner/constants.ts`中的`RENAMED_MIGRATION_COMPATIBILITY` 。這是**`237`到`241`所需**：這些槽現在保存規範的`237_usage_history_calculated_cost.sql`、 `238_codex_connection_fences.sql`、 `239_call_logs_pending_detail_index.sql`、 `240_provider_node_custom_json_config.sql`和`241_seen_models.sql`，如果沒有該條目，這樣的資料庫將永遠跳過規範遷移並再次執行轉換後的遷移。當目標是時間戳時，它也適用於保持空的槽，例如`242`。如有疑問，請新增該條目。將其新增至陣列中的位置並不重要：當一個條目的目標槽仍然保留另一個條目移走的行時（例如`237`持有PR行，而較舊的`usage_history_calculated_cost`行等待移入`237`），執行程式會讓該條目等待，直到槽空閒。只有真正的衝突，例如沒有條目移動的行所持有的槽，或交換槽的兩個條目，才會停止`Cannot reconcile ...`的引導。
3. **保持SQL冪等**（`CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `INSERT OR IGNORE`），因為轉換後的遷移可能會遇到其架構已存在的資料庫。
4. **行動版鍵控的特殊情況。**如果PR在`isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) 或`OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) 中新增了舊編號的情況，請將金鑰變更為新時間戳記。

`tests/unit/db/codex-fence-migration-rename.test.ts`是重命名遷移測試的工作範例。

### 向後移植到切換前的分支

切勿將`YYYYMMDDHHMMSS_`檔案挑選或反向移植到交換器之前的分支（例如較舊的`release/v*`分支）。那裡的運行程序將文件名排序為文本，因此帶有時間戳的文件將在新資料庫上的`201_`和`202_`之間運行，而那裡的舊門不理解 14 位元前綴。在這樣的分支上，將更改寫入該分支自己的下一個`NNN_`文件，冪等，因此當帶有時間戳的版本稍後到達時，它是一個無操作。

### 遷移如何運作

啟動時， `migrationRunner.ts`：

1. 如果`_omniroute_migrations`表不存在則創建
2. 查詢已套用的遷移
3. 按順序應用任何新遷移，每個遷移都在一個事務中
4. 記錄每個應用程式的遷移和時間戳

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### 冪等性

遷移必須是**冪等的**—運行它們兩次應該是無操作：

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

自由使用`IF NOT EXISTS`、 `IF EXISTS`和`OR IGNORE` / `OR REPLACE`子句。

### 新增的遷移

1. **使用生成器建立文件**: `npm run db:new-migration -- <description>` （例如`npm run db:new-migration -- add combo priority`）。它使用當前UTC時間和註解標頭寫入`src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` ，如果採用該時間戳記則向前移動一秒，並且永遠不會覆蓋檔案。不要手動選擇號碼。
2. **使用安全DDL** ： `CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `ALTER TABLE ... ADD COLUMN`
3. **仔細回填數據**：使用`UPDATE ... WHERE ...`處理現有行
4. **檢查順序和命名**： `npm run test:migrations:fresh` （空資料庫上的所有遷移）和`npm run check:migration-numbering`
5. **在副本上測試**：永遠不要在生產環境中執行未經測試的遷移
6. **從程式碼建立的表也需要遷移**：如果模組也延遲建立表（`CREATE TABLE IF NOT EXISTS`，保留為自我修復路徑），則遷移必須使用相同的DDL來建立它。否則，全新安裝和升級安裝最終會產生不同的架構，這取決於該程式碼路徑是否運作。 `tests/unit/db/lazy-table-migration-guard.test.ts`掃描`src/`和`open-sse/`並在沒有遷移的惰性`CREATE`上失敗 (#20557)。範例： `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`。

例子：

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **向後不相容的更改**（例如，刪除列）很棘手。 OmniRoute NOT是否支援降級—一旦應用遷移，架構變更是永久性的。相應地計劃。

---

## 靜態資料加密

敏感欄位（API 金鑰、OAuth 權杖、連線字串）使用 **AES-256-GCM** 進行靜態資料加密。

### 運作方式

```ts
// src/lib/db/encryption.ts（簡化版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用位置

- `provider_connections.api_key`——在應用程式層級加密
- `provider_connections.access_token`、`refresh_token`、`id_token`——在應用程式層級加密
- `namespace = "secrets"` 的 `key_value` 項目——在應用程式層級加密
- `proxy_registry.auth`——若存在，則在應用程式層級加密

### 加密金鑰

加密金鑰由**通關密語**（透過 `STORAGE_ENCRYPTION_KEY` 環境變數設定）和**鹽值**（儲存在資料庫中）衍生而來。解密資料時，兩者缺一不可。

```bash
# 產生安全的通關密語
openssl rand -hex 32

# 在 .env 中設定
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **重要**：遺失加密金鑰即表示無法再存取所有加密資料。**請將金鑰與資料庫分開備份**。

### 未加密的內容

基於效能考量，以下內容會以純文字儲存：

- 提供者顯示名稱
- 模型定義（已是公開資訊）
- 路由規則
- 使用量記錄（不含個人識別資訊）

---

## 加密注意事項 (v3.8.16+)

OmniRoute 使用 **`migrateLegacyEncryptedString()`** 透明地處理兩種加密方案：

- **舊版**（v3.5.0 之前）：基於 XOR 的「加密」（並非真正的密碼學加密）
- **目前版本**：使用正確 IV 與驗證標籤的 AES-256-GCM

遷移輔助工具會偵測舊版格式，並在首次讀取時使用新方案重新加密。這表示您可以升級舊資料庫而不會遺失憑證。

---

## 讀取快取

對於經常讀取的資料（模型、提供者、設定），`readCache.ts` 提供了**記憶體內快取**：

```ts
// 啟動時快取，寫入時使其失效
const providers = await getCachedProviders(); // 快速，記憶體內
const fresh = await listProviders(); // 緩慢，存取資料庫
```

| 快取實體               | 快取鍵         | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | 直到寫入時 |
| `provider_connections` | `providers:v1` | 直到寫入時 |
| `settings`             | `settings:v1`  | 直到寫入時 |
| `combos`               | `combos:v1`    | 直到寫入時 |

每次寫入對應的資料表時，快取都會失效。

---

## 備份與復原

### 手動備份

```bash
# 使用 CLI 建立本機備份
omniroute backup create --name pre-migration

# 或透過 API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

備份檔案包含：

- 所有資料庫資料表（序列化為 JSON）
- 呼叫記錄成品（使用 base64 編碼，可選）
- 設定 + 密鑰（已加密）
- 外掛程式組態

### 還原

```bash
# 透過 CLI
omniroute restore pre-migration

# 透過 API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**：還原會覆寫整個資料庫。請先停止所有用戶端。

### 自動備份

```bash
# 透過 CLI 啟用每日自動備份
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

排程由伺服器端的背景工作執行，該工作預設每 30 秒觸發一次，並根據本機伺服器時間評估 cron 運算式。

| 變數                                        | 預設值  | 說明                                                                                          |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 觸發間隔，以毫秒為單位（最小值為 `5000`）。必須短於 60 秒，才能可靠地落在符合 cron 的分鐘內。 |

### SQLite 熱備份

若要在不停機的情況下備份即時資料庫：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

這會使用 SQLite 的線上備份 API——可在 OmniRoute 執行期間安全運行。

---

## 效能調優

### WAL模式

WAL預設啟用。對於高寫入工作負載，請考慮：

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute不設定`journal_size_limit`。檢查點將WAL幀移動到主檔案中，但WAL檔案保持其最大分配大小。 `OMNIROUTE_WAL_GUARD_MAX_MB`守衛僅警告並運行`wal_checkpoint(RESTART)`；它不是磁碟大小上限。

### 索引

效能關鍵指標（由遷移自動建立）：

- 按提供者尋找`idx_models_provider` —模型
- `idx_combo_targets_combo_id` —組合目標擴展
- `idx_usage_history_api_key_timestamp` —使用情形分析
- `idx_quota_snapshots_api_key_window` —配額跟踪
- `idx_call_logs_timestamp` —通話記錄查詢

若要新增索引，請建立遷移：

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 記憶體映射I/O

對於非常大的資料庫（> 10GB），可以透過SQLite pragma 調整記憶體映射：

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 壓實

長期運行的OmniRoute實例受益於偶爾的`VACUUM`：

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

在低流量時段每月運行一次。 （WAL模式減少了這種需求，但並沒有消除它。）

---

## 健康狀態檢查

`src/lib/db/healthCheck.ts` 提供**資料庫層級的健康狀態診斷**：

這兩種 HTTP 動詞都需要驗證（否則傳回 `401`）。`GET` 僅執行診斷；`POST` 則執行相同的檢查，並啟用 `autoRepair`。

```bash
GET  /api/db/health   # 診斷
POST /api/db/health   # 診斷並修復
```

回應是由 `runDbHealthCheck()` 產生的 `DbHealthCheckResult`
（`src/lib/db/healthCheck.ts`）：

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "網域預算參照了已不存在的 API 金鑰。",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| 欄位              | 含義                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | 當 `issues` 為空時為 `true`。`driver` 絕不會影響此值。                                                               |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` 其中之一。                           |
| `repairedCount`   | 此次執行期間修復的資料列數；當 `autoRepair` 為 false 時一律為 `0`。                                                  |
| `backupCreated`   | 是否在修復前建立了備份。                                                                                             |
| `checkedAt`       | 此次執行與其寫入的任何修復註記共用的 ISO 時間戳記。                                                                  |
| `driver.name`     | 為受檢查資料庫提供服務的 SQLite 驅動程式。                                                                           |
| `driver.degraded` | 當寫入內容未由資料庫檔案提供持久性儲存時為 `true`——即使用 `sql.js` WASM 後備方案（整個檔案持久化）或記憶體內資料庫。 |

`omniroute_db_health_check` MCP 工具會傳回相同的酬載。

執行 `PRAGMA integrity_check` 以偵測損毀：

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 應輸出：ok
```

如果傳回 `ok` 以外的任何內容，請**立即停止使用該資料庫**，並從備份還原。

---

## 災難復原

### 情境 1：WAL 檔案遺失

`-wal` 檔案遺失，但 `-shm` 與主資料庫仍完整：

```bash
# 下次開啟時會自動復原
omniroute
```

如果 SQLite 無法自動復原：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 情境 2：主資料庫檔案損毀

從備份還原：

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` 只會從執行中的伺服器下載完整的 `.tar.gz` 封存檔
（`GET /api/db-backups/exportAll`，需要操作員憑證）；它不會還原任何內容。

### 情境 3：加密金鑰遺失

沒有金鑰就**無法復原**。加密欄位將無法讀取。請使用新的憑證，手動重新新增所有提供者。

> **緩解措施**：務必另外備份加密金鑰，最好儲存在密碼管理器或 KMS 中。

### 情境 4：磁碟空間已滿

SQLite 將傳回 `SQLITE_FULL` 錯誤。釋放磁碟空間後，執行：

```bash
# 對 WAL 執行檢查點操作以釋放空間
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 常用操作

### 檢查表

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 計算所有表中的行數

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 重置（清除）所有數據

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

對於一個**選擇性的**重置（保留提供程序，擦除使用情況）：

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 匯出單表

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 疑難排解

### 「資料庫已被鎖定」

另一個程序持有寫入鎖定。您可以：

- 等待其他程序完成（使用 `lsof | grep storage.sqlite` 檢查）
- 終止其他程序
- 如果問題持續發生，請重新啟動 OmniRoute

### 「外部索引鍵條件約束失敗」

某個領域模組違反了參照完整性。請檢查：

- 相依資料表中的孤立資料列
- 未正確傳播的串聯刪除
- 最近變更外部索引鍵的遷移

執行 `PRAGMA foreign_key_check;` 以找出違規項目。

### 「記憶體不足」

SQLite 的記憶體映射 I/O 超出作業系統限制。請透過 SQLite pragma 降低其大小：

```sql
PRAGMA mmap_size = 134217728;  -- 使用 128MB，而非 256MB
```

或將其停用：

```sql
PRAGMA mmap_size = 0;
```

### 「遷移執行到一半失敗」

遷移是在交易中執行，因此應已回復。如果沒有：

1. **停止 OmniRoute**（防止進一步嘗試）
2. **使用 `sqlite3` 檢查資料庫狀態**
3. **手動修正**未完成的遷移
4. **重新執行** OmniRoute（將重試遷移）

為避免此問題，請一律先在副本上測試遷移。

---

## 另請參閱

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量資料表
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 健全狀況監控
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 發布流程
- 原始碼：`src/lib/db/`（80+ 個檔案，約 25K 行程式碼）
