# Resilience Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute有三種不同但相關的彈性機制。每個都有不同的範圍和目的。調試路由行為時將它們分開。

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 來源： [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **彈性切換的環境與儀表板優先權。**從環境— `QUOTA_PREFLIGHT_CUTOFF_ENABLED`、 `PROVIDER_COOLDOWN_ENABLED`、 `STREAM_RECOVERY_ENABLED`、 `STREAM_RECOVERY_MIDSTREAM_ENABLED`、 `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —播種的選擇加入彈性切換僅提供 *default* （`DEFAULT_RESILIENCE_SETTINGS`、 `src/lib/resilience/settings.ts`）。 `resilienceSettings`中保留了一個布林值（儀表板→**設定→彈性**/ `PATCH /api/resilience`，儲存在`key_value`中）勝過 env 值：規範化（`toBoolean`， `src/lib/resilience/settings/normalize.ts`）在存在時保留儲存的布林值。在儀表板已儲存`false`部署上將這樣的環境變數設為`true`因此不會改變任何—翻轉切換**設定→彈性**（或清除儲存的欄位）。

## 1. 提供者斷路器(Provider Circuit Breaker)

**範圍:**整個提供者(例如 `glm`、`openai`、`anthropic`)。

**用途:**停止將流量傳送給在上游/服務層級反覆失敗的提供者。

**實作:**

- 核心類別:`src/shared/utils/circuitBreaker.ts`
- 串接位置:`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 狀態 API:`GET /api/monitoring/health`
- 重設 API:`POST /api/resilience/reset`
- 包裝器:`open-sse/services/accountFallback.ts`
- 資料庫資料表:`domain_circuit_breakers`

**狀態:**

- `CLOSED` — 允許正常流量
- `DEGRADED` — 仍允許流量,但正在追蹤升高的提供者失敗次數;在累積足夠的成功次數、連線測試通過,或最後一種失敗類型經過最長的 `OPEN` 保持時間(其 `cooldownByKind` 值,否則為 `resetTimeout`,× `maxBackoffMultiplier`,至少一個冷卻期)且無新失敗後,返回 `CLOSED`
- `OPEN` — 提供者暫時被封鎖;組合路由會跳過它
- `HALF_OPEN` — 重設逾時已屆滿;允許探測請求

**可設定的預設值(`open-sse/config/constants.ts`,於儀表板 → 設定 → 韌性中公開):**

| 類別    | 降級於   | 開啟於    | 重設逾時 |
| ------- | -------- | --------- | -------- |
| OAuth   | 5 次失敗 | 8 次失敗  | 60s      |
| API-key | 7 次失敗 | 12 次失敗 | 30s      |
| Local   | 衍生     | 2 次失敗  | 15s      |

`degradationThreshold` 控制提供者何時進入 `DEGRADED`;`failureThreshold` 控制其何時開啟並被跳過。本機提供者設定檔尚未在韌性設定頁面中公開。

**觸發代碼:**僅提供者層級狀態碼 `[408, 500, 502, 503, 504]`。請勿因帳號層級錯誤而觸發(大多數 401/403/429 — 那些屬於冷卻或鎖定的範疇)。

**延遲復原:**當 `OPEN` 到期時,`getStatus()`、`canExecute()`、`getRetryAfterMs()` 會將狀態刷新為 `HALF_OPEN`。相同的讀取(以及下一次失敗)會使過期的 `DEGRADED` 衰減回 `CLOSED`。不需要背景計時器。

---

### 選擇性啟用的全域提供者冷卻(時間窗閘門)

第四個**選擇性啟用**的層級(`PROVIDER_COOLDOWN_ENABLED`,預設**關閉**)在
`open-sse/services/providerCooldownTracker.ts` 中保存失敗提供者的跨請求記憶,
組合目標解析會查詢此記憶,使連續的組合請求不再重新走訪剛失敗的提供者。
提供者層級項目遵循 `PROVIDER_PROFILES` 時間窗閘門:

| 設定檔  | 觸發於(`providerFailureThreshold`) | 時間窗內(`providerFailureWindowMs`) | 冷卻時間(`providerCooldownMs`) |
| ------- | ---------------------------------: | ----------------------------------: | -----------------------------: |
| OAuth   |                               `10` |                             `15min` |                         `5min` |
| API key |                               `15` |                             `30min` |                        `10min` |

低於閾值時,提供者**不會**被視為冷卻中;一次成功會清除該時間窗。
連線層級項目(`provider:connectionId`)則改為保留指數式的
`minRetryCooldownMs → maxRetryCooldownMs` 退避。覆寫方式:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
迴歸防護:`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 連線冷卻

**範圍：** 單一提供者連線／帳戶／金鑰。

**目的：** 略過一個有問題的金鑰，同時讓同一提供者的其他連線繼續提供服務。

**實作：**

- 標記為不可用：`src/sse/services/auth.ts::markAccountUnavailable()`
- 選取：同一檔案中的 `getProviderCredentials*`
- 冷卻計算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定：`src/lib/resilience/settings.ts`

**每個連線的欄位：**

- `rateLimitedUntil` — 冷卻到期前的時間戳記
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指數退避計數器

**預設冷卻時間：**

- OAuth 基準值：5s
- API 金鑰基準值：3s
- API 金鑰 429：優先使用上游的 `Retry-After`／重設標頭／可解析的重設文字
- 退避：`baseCooldownMs * 2 ** failureIndex`

**每個提供者的重試延遲。** 提供者詳細資料頁面有一個 **重試延遲** 選取欄位（自動、15s 至 1h）。它會將值儲存至
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
（1–21600，透過 `PATCH /api/resilience`）。當限流錯誤沒有上游重試提示時，該值會取代提供者的縮放退避時間，並將
`backoffLevel` 重設為 0（`open-sse/services/rotationConfig.ts::overrideFor`）。對於限流錯誤，優先順序由高至低為：上游重試提示、每個連線的
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`、每個提供者的重試延遲、環境變數
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`，最後是縮放退避時間。自動模式會移除該欄位。它只會影響限流原因，絕不影響終止狀態。

**防驚群保護：** 防止並行錯誤過度延長冷卻時間，或重複遞增 `backoffLevel`。

**並行限制 429 不會提升退避階梯。** 其本文回報並行限制（「同時請求過多」、「並行限制」、「平行請求限制」、GLM 的
`并发数过高`）的 `429`，表示帳戶健康但目前繁忙。
`checkFallbackError()` 會回傳 `concurrency_limited` 原因：立即切換至下一個連線，讓此連線固定冷卻
`CONCURRENCY_LIMIT_COOLDOWN_MS`（1s），或使用上游重試提示；保持 `backoffLevel` 不變，並設定
`skipProviderBreaker`。
明確的配額本文仍優先，因此同時符合配額模式的本文仍會判定為配額錯誤。偵測：`src/shared/utils/classify429.ts` 中的
`looksLikeConcurrencyLimit()`；判定：`open-sse/services/accountFallback/concurrencyLimit429.ts`。
`classify429()`（斷路器的 `FailureKind`）維持不變，對這些本文仍會讀取 `rate_limit`。

**串流內容停滯不會冷卻帳戶。** 當內容停滯監視器（`open-sse/utils/streamHandler.ts`）放棄一個在指定時間內未傳送模型輸出的串流時，
`markAccountUnavailable()` 會在連線上記錄錯誤，但不設定冷卻時間：停滯屬於該請求，通常是因為長時間的推理回合尚未產生輸出。
操作人員可以透過 `resilienceSettings.streamStallCooldown.enabled` 重新啟用此功能（預設為 `false`）。

**供 `p2c` 帳戶選取使用的選用延遲訊號。** 每次派送的嘗試都會針對每個連線（以及每個連線 + 模型）在記憶體中的滾動視窗記錄其
首位元組時間與結果：15 分鐘內的最近 20 個樣本
（`open-sse/services/connectionLatencyTracker.ts`，由 `src/sse/handlers/chatHelpers.ts` 中的
`safeLogEvents()` 記錄）。當 `resilienceSettings.p2cLatency.weight` 大於 `0`
（範圍為 0-20，預設 `0` = 關閉）時，`src/sse/services/auth.ts` 中的
`compareP2CConnections()` 會為候選配對中的每個候選連線加上最多 `weight` 分。這些分數的一半來自相對於較快候選連線的延遲比例（速度慢兩倍時取得完整的一半分數），另一半來自滾動錯誤率。
只有當兩個候選連線各自至少有 3 個樣本時才會套用此項，因此不會懲罰新帳戶；其上限也維持低於配額封鎖與配額耗盡的懲罰。
它不會自行建立任何斷路機制：失敗的帳戶仍由冷卻、鎖定與斷路器層處理。使用以下設定：
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`。

**推理框架會重新開始計算內容停滯預算。** 推理模型可能需要數分鐘才會產生第一個可見 token：Claude 會串流
`thinking_delta` 框架，其 thinking 文字可能為空，而 Responses API 會接連串流一個又一個推理項目。
`isReasoningProgressFrame()`（`open-sse/utils/streamReadiness.ts`）會辨識這些框架，監視器會在每個框架上重新開始計算其預算，而不是取消該回合。
它們仍不是模型輸出，因此只以推理結束的回合仍會回報為空白，而停止推理後只傳送心跳的回合仍會觸發監視器。

Kiro 的二進位 `reasoningContentEvent` 框架若具有非空簽章，會透過執行器將此推理活動保留為空的
`reasoning_content` delta。簽章不會被轉送。中繼資料、不完整框架與空白簽章不會重新開始內容預算；獨立的作用中串流逾時與用戶端取消仍然適用（`open-sse/executors/kiro/reasoning.ts`）。

**終止狀態（不是冷卻）：**

- `banned` — 由禁止關鍵字／帳戶封鎖偵測設定（請參閱 [BAN_DETECTION](../security/BAN_DETECTION.md)）。上游每個請求的拒絕（`request_rejected`，例如 Anthropic OAuth 403「Request not allowed」）絕不會設定此狀態：它們會依連線與模型分別計數，並以逐漸增加且上限為 `REQUEST_REJECTED_MAX_COOLDOWN_MS`（1 h）的冷卻時間將該模型移出輪替；若不知道模型，則會冷卻該連線 — `open-sse/services/requestRejectedStreak.ts`
- `expired`（在有限次重試後轉換為終止狀態 — `EXPIRED_RETRY_MAX = 3` 並採用指數退避 — 因此暫時性的 OAuth 錯誤可以在帳戶永久停用前自行復原）
- `credits_exhausted`

這些狀態會持續存在，直到憑證變更或操作員將其重設。請勿以暫時性的冷卻狀態覆寫終止狀態。

**延遲復原：**當 `rateLimitedUntil` 已過期時，連線會再次符合使用資格。成功使用後，`clearAccountError()` 會清除所有錯誤欄位。

### Claude OAuth 用量牆：較低優先順序通道 + 工作階段限制重設

**範圍：**單一 Claude 訂閱（OAuth）連線。這兩項功能皆為**每個連線選擇性啟用**
（編輯連線 → Claude 區段 → `providerSpecificData` 中的 `lowPriorityMode` /
`autoLimitReset`，兩者預設皆為關閉），並對應 Claude Code 的 `/low-priority` 與
`/limit-reset` 命令（線路合約擷取自 Claude Code 2.1.263）。

**實作：**

- 狀態機 + 回應分類：`open-sse/services/claudeLowPriority.ts`
- 重設狀態/領取用戶端：`open-sse/services/claudeLimitReset.ts`
- 執行器掛鉤（標頭注入 + 相同帳戶重試）：`open-sse/executors/base.ts::execute()`
- 選擇性啟用持久化：`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**觸發條件：**5 小時用量牆 — 一個標頭帶有
`anthropic-ratelimit-unified-status: rejected`，且當帳戶符合資格時帶有
`anthropic-ratelimit-unified-slow-offer: treatment` 的 `429`。在第一次遇到該用量牆
429 前不會傳送任何內容；不含統一標頭的突發 429 會走一般冷卻路徑。

**較低優先順序通道**（`lowPriorityMode`）：

- 遇到用量牆 429 時，執行器會接受提議，並立即使用
  `anthropic-usage-limit: slow` 重試**相同**帳戶；此通道會保持啟用，直到公告的
  `anthropic-ratelimit-unified-reset`（+60 秒寬限期），且該時間範圍內的每個要求都會帶有
  此標頭。遭攔截的 429 永遠不會到達 `handleChatCore`，因此連線
  **不會**進入冷卻，也不會輪替到其他連線。
- 後續回應中的 `anthropic-ratelimit-unified-slow-status`：`active` / `not_needed`
  會維持此通道；`slot_busy`（429）或 `529` 會依伺服器的
  `anthropic-ratelimit-unified-slow-retry-after` 等待（預設 20 秒，限制於 5–600 秒，±30% 抖動）
  並重試，且受 `anthropic-ratelimit-unified-slow-max-wait` 限制（預設 20 分鐘，限制於
  1 分鐘–6 小時）— 超過該時間後，此通道會結束，且有 10 分鐘的冷卻期阻止再次接受。
  等待時間還會受要求本身剩餘的上游啟動逾時
  （`resolveFetchStartTimeout`，預設 10 分鐘）減去 5 秒餘裕所限制：若無此限制，
  預設 20 分鐘的最大等待時間會超過要求的存續時間，且休眠會在等待途中遭到中止，
  導致浮現 `TimeoutError`，而不是正常的 `max_wait` 結束 + 冷卻。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5 小時視窗輪替，或
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`（由於付費超額用量現在會涵蓋
  用量牆，因此無論任何狀態都會以 `extra_usage` 結束）會終止此通道；之後回應會流向
  一般冷卻路徑。`budget_exhausted` 會被記住，直到公告的預算重設時間（≤ 8 天）。
- 用量牆檢查會在執行器自身由 400 驅動的嘗試內重試（內容編輯、
  思考/投入程度限制、參數自動學習）之後執行，因此僅在其中一次重試中出現的用量牆 429
  仍會遭到攔截，而不會到達冷卻路徑。
- 狀態會依每個連線保存在記憶體中（重新啟動會多耗費一次用量牆 429 才能重新接受）。

**工作階段限制重設**（`autoLimitReset`，兩者皆啟用時會在通道前先嘗試）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  區塊；當 `arm: "reset"` 且 `available: true` 時，
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`，並帶有
  `{ "program": "juniper_tide" }`（組織 UUID 來自
  `providerSpecificData.organizationUUID`，並有啟動程序備援）。
- `result: reset|not_limited` → 要求會以全速重試（不帶慢速標頭）。
  `already_used` / `not_offered` 會記憶 `next_available_at`（預設一週）；任何
  失敗都會退避 15 分鐘。重設每週僅能執行一次，且仍會計入每週限制。

迴歸防護：`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 自動應用儲存重置

**範圍：** Codex和Claude訂閱 (OAuth) 連線。**選擇加入**： `bankedResetAutoApply`設定關閉並預設為`dry-run`模式（設定→ AI →自動套用分組重設）。

**目的：**當帳戶達到使用限制時，銀行支出會自行重置，而不是等待操作員在提供者限制頁面上按「兌換」。

| 信用類型（`creditTypes`） | 贖回的是什麼                   | 它運行在哪裡                           |
| ------------------------- | ------------------------------ | -------------------------------------- |
| `codexCredits`            | Codex重置積分                  | 後台作業，每 60 秒                     |
| `claudeCredits`           | Claude銀行補助（`GRANT`學分）  | 後台作業，每 60 秒                     |
| `claudeSessionReset`      | Claude每週會話限制重置（上圖） | 請求路徑，透過與每個帳戶切換相同的策略 |

**執行：**

- 純粹決策（一條規則集適用於兩條路徑）： `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- 後台作業： `src/lib/services/bankedResetAutoApply.ts` （從`src/instrumentation-node.ts`開始）
- Claude請求路徑門： `src/lib/usage/claudeSessionResetPolicy.ts`，透過`setClaudeLimitResetPolicy()`在`open-sse/services/claudeLimitReset.ts`中註冊
- 歷史、上限和 webhook： `src/lib/usage/bankedResetAudit.ts`
- 歷史API： `GET /api/settings/banked-reset-auto/history?limit=50` （管理授權）

**決策順序**（第一個失敗規則是記錄的原因）：

1. 功能關閉、信用類型關閉或帳戶超出範圍（`accountScope` `all` / `selected`加上每個帳戶的`connections`地圖）。
2. 在可選的UTC時間表之外（`startHourUtc` > `endHourUtc`穿過午夜）。
3. 過去 24 小時內的上限：任兩次兌換之間的`maxPerAccountPerDay` (1)、 `maxPerDay` (3) 和`minSpacingMinutes` (30)。
4. 觸發器：受圍牆的`session`或`weekly`視窗（從`getQuotaWindowStatus().reachedThreshold`讀取，而不是`isAccountQuotaExhausted()`，後者僅報告每個視窗花費的帳戶），或至少使用`expiringCreditMinUsedPercent` (50) 的帳戶在`expiringCreditHours` (24) 內到期的信用。
5. 自然重置守衛：當`sessionResetGuardMinutes` （90）內的圍牆5小時窗口重置或`weeklyResetGuardHours` （12）內的圍牆每週窗口重置時跳過。
6. 每週下限：每週剩餘時間低於`weeklyFloorPercent` (10) 時，跳過 5 小時重置。
7. `last-resort`模式：當同一提供者的另一個範圍內帳戶在兩個視窗中至少剩餘`poolHeadroomPercent` (10) 時跳過。到期信用觸發器繞過了這個。
8. `dry-run`記錄了一行並且沒有贖回任何東西； `last-resort`和`eager`兌換。

遺失配額資料永遠無法解鎖兌換：未知的重置時間或每週使用量跳過。

**Claude會話重置：**當該功能關閉或`claudeSessionReset`關閉時，每個帳戶的`autoLimitReset`切換會像以前一樣做出決定。啟用兩者後，此功能將取代每個帳戶的切換：範圍內的帳戶僅在策略允許時才可以提出索賠，而在`dry-run`模式下則不會提出索賠。

**安全：**該作業每次蜱最多兌換一個積分，在列出積分之前決定（跳過的帳戶永遠不會列出），使用冪等性密鑰`auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`，並在列出或兌換失敗後將帳戶退回 1 小時。每個兌換、失敗和試運行決策都會寫入`audit_log` （`action: "bankedReset.redeem"`，無代幣或信用 ID）；上限是從這些行中計算的，因此它們在重新啟動後仍然存在。成功兌換也會觸發`provider.reset_redeemed` webhook。

回歸守衛： `tests/unit/banked-reset-policy.test.ts`、 `tests/unit/banked-reset-auto-apply.test.ts`、 `tests/unit/claude-limit-reset-policy-gate.test.ts`、 `tests/unit/banked-reset-history-route.test.ts`。

### 工作階段親和性 (#7274)

**範圍：**將一個用戶端工作階段（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 標頭）固定至一個連線，適用於**任何**提供者。

**目的：**讓多輪代理程式（Claude Code、aider、自訂代理程式）在多個要求間使用相同帳戶，減少跨帳戶內容遺失，以及在具有每帳戶工作階段狀態的提供者上重複發生冷啟動 429。

**實作：**

- TTL 解析：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 固定連線選擇/建立：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 標頭擷取（通用，任何提供者）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化固定關聯表：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 設定：`sessionAffinityTtlMs`（以毫秒為單位的全域 TTL，`0` 表示停用）— `src/lib/db/settings.ts`。由遷移 `124_generic_session_affinity_ttl.sql` 將僅限 Codex 的 `codexSessionAffinityTtlMs` 重新命名而來，該遷移會將先前設定的任何 Codex TTL 沿用為新的預設值。

在 #7274 之前，`resolveSessionAffinityTtlMs()` 對 `codex` 以外的每個提供者都會直接提早中止並傳回 `0`，因此 TTL 設定（及工作階段標頭）在其他任何地方都不會生效，儘管固定機制與標頭擷取已與提供者無關。此修正移除了該提早傳回；現在，只要全域設定為高於 `0`，TTL 就會一致套用至每個提供者。

這三個工作階段親和性標頭絕不會轉送至上游 — 執行器會從頭建構自己的上游標頭，而不是直接傳遞用戶端標頭，因此這只會作為內部關聯 ID。

### 獨佔式受管理工作階段連線租約

**範圍：** 一個作用中的受管理 HTTP 用戶端／工作階段擁有一個符合資格的 OmniRoute 連線。

**目的：** 為需要跨要求維持硬性路由隔離的用戶端，提供持久且專用的連線擁有權。這不同於工作階段親和性；後者是軟性的連續性偏好：專用租約會在 SQLite 中持久化生命週期狀態、強制全域作用中擁有者與作用中連線的唯一性，並在分派至提供者前拒絕過時的世代。

此功能可依 API 金鑰選擇性啟用。受管理金鑰必須具有 `lease:exclusive` 範圍，以及明確且非空的 `allowedConnections` 清單。任何 HTTP 用戶端都可以使用生命週期端點；不需要用戶端名稱、user-agent、提供者、OAuth 方法或模型。租約擁有的是連線，而非模型，因此只要連線仍符合一般資格，變更模型仍會保留該連線繫結。一般的模型、配額、健康狀態、冷卻時間與允許清單規則仍具最高權威，且可能將同一世代轉移至另一個可用的符合資格連線。

生命週期為 `POST /api/v1/session-leases`，搭配 `acquire`、`renew` 和 `release` JSON 動作。受管理的推論要求會提供不透明的 `X-OmniRoute-Lease-Owner` 值與完全相符的 `X-OmniRoute-Lease-Generation`。擁有者使用 `vlo_` 加上 43 個 base64url 字元；系統只會儲存其 SHA-256 雜湊。每個最終分派隔離也會繫結已驗證的 API 金鑰 ID 與作用中連線 ID。租約控制標頭會從記錄、保留的要求快照以及上游執行器標頭中移除。

如果一般路由具有符合資格的受管理候選項目，但每個可用候選項目都已被其他擁有者的作用中租約占用，OmniRoute 會傳回 HTTP `429`、租約容量不可用代碼、等待容量狀態，以及根據最早相關到期時間計算且有上限的 `Retry-After`。一般的可用資格為空並不屬於租約爭用，仍會沿用現有的路由錯誤語意。

相關機制仍彼此分離：

- OAuth 工作階段占用是 OAuth 帳戶的程序內軟性分配。
- 帳戶信號量會授予要求並行處理許可，並在要求完成時結束。
- 受管理的專用工作階段租約是具持久性的生命週期擁有權，並具有世代隔離機制。

---

## 3. 模型鎖定

**範圍：** provider + connection + model 三元組。

**依狀態決定範圍：**失敗狀態決定鎖定寫入哪個金鑰
（`open-sse/services/accountFallback/exactModelLock.ts` 中的
`resolveLockoutScope()`）：

- `429` / `403` / `402` — 配額或權限訊號 — 鎖定**配額系列**：
  對 codex 而言，是整個 `codex` / `spark` 範圍（該連線的所有
  `gpt-5*` 模型）；對其他 provider，則使用
  `getQuotaScopedModelForProvider()`。
- `404` 鎖定基礎模型（`getModelLockKey()` 會縮小 `not_found` 的範圍）。
- 任何其他狀態 — `5xx` 傳輸／伺服器失敗，以及 OmniRoute 在品質驗證中自行
  合成的 `502` — 僅鎖定**確切的** provider/connection/model 三元組。某個模型的
  串流異常不能代表帳戶的配額；在此規則之前，`codex/gpt-5.6-luna` 的一次空
  回應就會讓該連線的所有 `gpt-5*` 模型在 2–30 分鐘內（逐步延長）停止
  路由，而其配額完全不受影響。
- 呼叫端明確指定的 `scope` 選項永遠優先（Antigravity 傳入 `"exact"`）。

**目的：**避免只因單一模型無法使用或受配額限制，就停用整個連線。

**範例：**

- 回傳 429 的模型級配額 provider
- 對某個缺少的模型回傳 404 的本機 provider
- Provider 特定的模式／模型權限失敗（例如 Grok 模式）

**實作：**`open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷卻時間儀表板（v3.8.0）

UI：設定 → 模型冷卻時間（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出作用中的鎖定項目，包括：provider、connection、model、reason、expiresAt。操作人員可以從卡片中手動重新啟用模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` — 列出作用中的鎖定項目
- `DELETE /api/resilience/model-cooldowns` — 手動重新啟用。Body：`{provider, connection, model}`。驗證：management。

### 冷卻時間管理員

UI：監控 → 冷卻時間管理員（`src/app/(dashboard)/dashboard/resilience/cooldowns/`）。

為每個因暫時性原因而停止路由的連線提供單一頁面，無需逐一開啟各 provider 頁面。此頁面列出連線冷卻時間、模型鎖定項目與終止狀態，並可針對單一連線、選取的連線，或某個 provider 的所有連線清除這些狀態；同時也能編輯最常調整的冷卻規則：`streamStallCooldown.enabled` 以及 OAuth／API-key 的 `connectionCooldown` 基礎冷卻時間與最大退避步數（透過 `PATCH /api/resilience` 儲存）。終止狀態（`banned`、`expired`、`credits_exhausted`）會列出，但絕不會在此處清除。

同一頁上的**錯誤冷卻規則**卡片會透過 `PATCH /api/settings` 編輯操作人員錯誤規則（`settings.providerErrorRules`）與各 provider 的全域預設值（`settings.providerErrorDefaults`）— 關於其比對方式，請參閱 §7 的「操作人員宣告的規則」。持續時間可選擇預設值（無明確冷卻時間）、30 分鐘、1 小時、5 小時、24 小時，或自訂 1 至 43,200 分鐘（30 天）。

**REST API**（`src/lib/resilience/cooldownManager.ts`，驗證：management）：

- `GET /api/resilience/cooldowns[?provider=]` — 列出連線狀態、剩餘冷卻時間、退避等級、上次錯誤類型與模型鎖定項目（不含憑證）
- `POST /api/resilience/cooldowns` — Body `{connectionIds: string[]}` 或 `{all: true, provider?}`；回傳 `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### 鎖定設定 UI + 成功衰減復原（v3.8.23）

模型鎖定已從永遠啟用的硬編碼行為，改為完全可設定、選擇性啟用的功能，並具備獨立的設定卡片與自動修復復原路徑。

**設定卡片：**設定 → 模型鎖定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
這與上方僅供讀取的 `ModelCooldownsCard` **不同**（該卡片只會
_列出_作用中的鎖定項目）— 新卡片用來_設定參數_。預設值位於
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）：

| 設定                    | 預設值                           | 說明                                   |
| ----------------------- | -------------------------------- | -------------------------------------- |
| `enabled`               | `false`                          | 主開關 — 模型鎖定**預設為關閉**。      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 計為模型範圍失敗的上游狀態。           |
| `baseCooldownMs`        | `120_000`（120 秒）              | 第一次失敗時的初始鎖定持續時間。       |
| `maxCooldownMs`         | `1_800_000`（30 分鐘）           | 逐步延長的冷卻時間上限。               |
| `maxBackoffSteps`       | `10`                             | 指數退避延長的最大步數。               |
| `useExponentialBackoff` | `true`                           | 重複失敗時是否以指數方式延長冷卻時間。 |

設定會透過一般設定儲存區保存，並透過復原能力設定結構描述進行驗證；該卡片會限制
`baseCooldownMs`／`maxCooldownMs`（其中 `maxCooldownMs ≥ baseCooldownMs`）及
`maxBackoffSteps` 的範圍。

**成功衰減復原：**復原**不只是**等待計時器到期。健康的
回應會逐步降低模型的失敗計數，因此已在期間中復原的模型會停止
延長冷卻（並在計時器到期前解除鎖定）。在成功的組合目標上，
`open-sse/services/combo.ts` 會呼叫 `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`），將儲存的
`failureCount` **減半**（`Math.floor(failureCount / 2)`）；當其降至 `0` 時，鎖定項目會完全刪除。對應的
`recordModelLockoutFailure()` 會在延長期間內發生失敗時遞增計數（並延長冷卻時間）。這項成功衰減機制是在單純計時器到期之外的額外復原方式 —
任一路徑都能重新啟用模型。

**狀態：** 鎖定狀態保留在**記憶體中**（每個程序中，以 `provider:connectionId:model` 為鍵的
`ModelLockoutEntry` `Map`，精確範圍鎖定則使用
`provider:connectionId:exact:model`），不會持久化至
DB — 重新啟動後即會遺失。_設定_會持久化；作用中的鎖定_狀態_則是暫時性的。

---

## 4. 配額共用並行控制 (v3.8.36)

訂閱帳戶（GLM、MiniMax 等）通常僅接受約 1–3 個並行請求；超過此數量會觸發 429 和冷卻時間。在 **配額共用** (`qtSd/…`) 組合下，這個問題尤其嚴重，因為多個 API 金鑰會共用同一個上游帳戶。以下三個層級可避免共用帳戶遭到大量請求淹沒。

### 每個連線的並行上限 (`max_concurrent`)

每個提供者連線都可以宣告 `max_concurrent` 上限
（`provider_connections.max_concurrent`，可在連線對話方塊 / API / DB 中設定）。
留空表示不限制。這是驅動下方序列化層的單一控制項 — 將其設為帳戶的實際並行數
（例如 GLM 約為 1、MiniMax 約為 2）。

### 每個模型的並行上限 (`modelConcurrency`)

連線還可以在其 `rateLimitOverrides` map 中宣告精確的每個模型並行上限：

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

可在連線對話方塊中設定（**速率限制覆寫 → 每個模型的並行上限**，每行一個
`model=cap`），或透過具有相同 JSON 結構的
`PATCH /api/providers/[id]` 設定。主要語意如下：

- **整個連線與特定模型：** `maxConcurrent` 仍是整個共用連線的上限。兩者同時適用時，兩個閘門會在同一個複合閘門中以原子方式取得
  （`global → provider → account → model`）；實際行為採用適用限制中較嚴格者。
- **精確的模型金鑰比對：** 金鑰是路由解析後傳給執行器的模型字串 — 通常是上游模型的裸 ID
  (`glm-5`)，而不是用戶端的 `provider/model` 別名（`zai/glm-5` 不會比對到
  `glm-5`）。值必須是正整數的並行請求上限。
- **本機排隊，不進行探索：** 超出的請求會依現有的佇列 / 逾時語意在本機排隊（具類型的 `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` 准入錯誤）。OmniRoute 不會探索或推斷上游政策 — 它只會
  強制執行操作員所設定的確切上限。已飽和的模型閘門絕不會停用提供者，也不會建立永久的模型鎖定；上游 429 / 冷卻 / 備援行為
  仍是錯誤防線。
- **每個連線、每個程序的範圍：** 上限以資料庫連線為單位，並保存在記憶體中，因此重複使用相同上游 API 金鑰的兩個連線彼此不會協調。
- **未設定表示維持不變：** 省略 map（或將儀表板欄位留白）不會新增模型閘門。以下是未宣告任何通用提供者限制的範例設定：

```text
glm-5=1
glm-4.7=3
```

### 配額共用請求序列化

當配額共用分派的目標連線宣告了正值的
`max_concurrent` 時，對該**帳戶**的並行請求會透過每個連線的 semaphore（索引鍵 `qsconn:<connectionId>`）進行序列化：超出的請求會**在佇列中等待**，而不是讓大量請求淹沒帳戶。這是**故障開放**（fail-open）設計 — 佇列已滿或逾時時，會不取得插槽便繼續，而不會拒絕任何原本可分派的請求。在**設定 → 復原能力 → 配額共用的每個連線並行控制**中切換
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，預設開啟）。未設定
`max_concurrent` 上限時，行為維持不變。

> 配額共用路由閘門（`selectQuotaShareTarget`、DRR + P2C）本身也是
> 故障開放，並且只會將已達上限的連線降低優先順序 — 在只有一個連線的
> pool 中無法硬性限制，因此實際遏止大量請求的是這個 semaphore。

### 組合冷卻感知重試

對於每個組合策略（啟用時），如果某個請求會因短暫冷卻而確實觸發 429，
則會等待冷卻結束後重新分派，而不是直接傳回 429 — 這涵蓋 Gemini 類型的 TPM/RPM
時間窗（約 60 秒的 retry-after）在多模型組合中的情況，例如 2 個模型組合的兩個目標都觸發每個模型的速率限制。此行為受**設定 → 復原能力**中的
`comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、
`budgetMs`）限制。對 `quota_exhausted`（鎖定至午夜）或驗證 / 找不到原因，
絕不會等待。

組合可透過 `config.comboCooldownWaitEnabled: false` 選擇退出。只有字面值
`false` 會停用這些共用組合等待（分派後冷卻，以及分派前的電路開啟 / 模型鎖定等待）及其等待預算逾時下限延伸。缺少此設定或設定為 `true` 會保留全域政策；`true` 無法在全域停用等待時啟用等待。明確設定的 `targetTimeoutMs` 仍具有優先權。此退出設定不會變更獨立的原生 Codex 回合釘選分派前等待。

相同閘門也涵蓋分派前的情況（#16319）：當組合的每個目標都在尚未進行任何嘗試前，因其模型處於短暫暫時性鎖定而被略過時，零嘗試路徑會在相同上限下等待鎖定解除並重新分派，而不是回應不含提示的
`503 ALL_TARGETS_SKIPPED`。當不允許等待時（已達上限、嘗試次數或預算耗盡，或功能已關閉），終端回應會升級為
`429 rate_limit_error`，並從最早的暫時性鎖定到期時間攜帶
`retry_after` / `reset_at`；配額、驗證及找不到原因的鎖定則維持不含提示的 503。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 請求佇列准入控制(v3.8.49 · issue #6593)

**範圍**:本機的每個「提供者+連線」速率限制佇列(`open-sse/services/rateLimitManager.ts`,由 Bottleneck 支撐),位於上述三個機制的下一層。

**`maxWaitMs` 限制佇列等待;`executionMaxWaitMs` 限制執行。** 兩者是刻意分開的,彼此互不回饋給對方。

`resilienceSettings.requestQueue.maxWaitMs` 是**佇列等待預算**:它涵蓋等待提供者槽位以及隨後處於 QUEUED 狀態的時間,其計時器在工作離開 QUEUED 並開始執行的那一刻即被清除(`rateLimitManager.ts`,`wrappedFn`)。超過此預算的請求永遠不會到達上游。預設為 30000ms,由 `src/lib/resilience/settings.ts` 中的 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` 提供,並由 `tests/unit/ratelimit-admission-control-6593.test.ts` 鎖定,因此變更該值會讓該測試變紅,而不會讓本段悄悄過時。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是 Bottleneck 所接收的工作 `expiration`,其計時器僅在派送後才啟動。它是為本身沒有上游逾時的執行器所設的後備保護,且當執行器自己的 fetch 起始逾時更長時,它會被提高到該值,因此不會截斷健康的傳輸中回應。預設為 600000ms(10 分鐘)。

將佇列預算餵給 `expiration`,正是過去會在傳輸中途殺死非增量式閘道的原因——它們在收到第一個位元組之前,合法地執行長達數分鐘——這也是為什麼 expiration 會以 `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)呈現,而佇列預算則帶有佇列逾時代碼。可透過 `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(環境變數)或儀表板(**設定 → 韌性**)覆寫任一者。兩者在正規化時都會被夾限在 1ms–24h 之間。

**兩者的優先順序:**環境變數僅提供_預設值_。持久化在 `resilienceSettings.requestQueue` 中的值(儀表板 / API patch,儲存於 `key_value`)優先於它,而每個連線的 `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又優先於前者。因此,在已有持久化值的部署上設定環境變數不會改變任何事——請改為清除或更新持久化的設定。

佇列停留時間由 `maxWaitMs` 限制;下方的 `maxQueueDepth` 則限制同時可有多少呼叫者排入佇列。

**回應內文聲明的重試:配速與鎖定。** 429 回應內文可以自行指定等待時間(Gemini 的 `RetryInfo.retryDelay`、"retry after Ns" 文字),由 `updateFromResponseBody` 讀取。符合連線 `maxWaitMs` 的等待時間屬於配速(pacing):限制器會在該段時間內耗盡其儲量,待其重新填充時,佇列中的呼叫便會派送。比 `maxWaitMs` 更長的等待時間並非佇列能坐等的——Gemini 對已用盡的每日配額會回以 `retryDelay: "86399s"`。重建後 429 上所轉發的 `Retry-After`(#16528)已使備援引擎在該時間窗內鎖定模型,但若同時為此暫停限制器,仍會讓任何提早到達金鑰的呼叫(例如在韌性重置之後)停滯整整 `maxWaitMs`。當此類等待來自有類型的 Google `RetryInfo` 詳細資訊(`google_rpc_retry_info` 來源),且金鑰的限制器已限定於模型範圍(見 `getLimiterKey`)時,429 會改為在該連線上成為模型鎖定(`open-sse/services/rateLimitManager/bodyRetryPause.ts` 中的 `lockModelForLongBodyRetry`,上限 24 小時),而限制器保持不暫停。帳號選擇會透過 `isModelLocked()` 在該鎖定上跳過,針對綁定到該連線之目標的 combo 派送前閘門亦然。在 antigravity 上,其限制器是按配額家族劃分的,鎖定落在確切模型上,如同其其他配額鎖定。當別名將客戶端請求的名稱解析到該模型時,該名稱也會被鎖定,因為這些檢查使用的是請求的名稱;它是精確鎖定的(`lockExactModel`),因此跨越 antigravity 配額家族或 codex 範圍的別名永遠不會鎖定自身。純文字提示、無類型的 `retryDelay`,或整個連線共用的限制器,則保留暫停行為。當 429 路徑剛重建的限制器確實暫停時,剩餘佇列時間早於暫停結束的呼叫者會立即以佇列逾時代碼被拒絕(`checkLimiterPause`),而非等待那段時間耗盡;記錄的結束時間錨定在限制器建立之前——即 Bottleneck 啟動其刷新時鐘之處——之後對儲量的任何變更都會忘記它。由 `tests/unit/rate-limit-long-body-retry-lockout.test.ts` 與 `tests/unit/rate-limit-body-retry-pause.test.ts` 涵蓋。

**`maxQueueDepth` — 選擇加入的准入上限(新)。** `resilienceSettings.requestQueue.maxQueueDepth` 限制單一「提供者+連線」同時可有多少請求處於佇列中(尚未派送)。當佇列已持有 `maxQueueDepth` 個請求時,新請求會在到達 `limiter.schedule()` **之前**就以帶類型的 `code: "RATE_LIMIT_QUEUE_FULL"` 錯誤被快速拒絕——因此拒絕成本低廉,且發生在該請求的任何下游 prompt 壓縮 / 翻譯工作之前。預設 `0` = 停用,保留現有的無界佇列行為;範圍 0–100000。可透過 `RATE_LIMIT_MAX_QUEUE_DEPTH`(環境變數)或 `resilienceSettings.requestQueue.maxQueueDepth`(儀表板 / API patch)覆寫。

准入檢查本身是一個純函式(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`),因此無需真實的 Bottleneck 限制器即可進行單元測試。

> 建立 #6593 的那份 RFC 同時也提出了一個 `bypassCompressionOnRateLimit`
> 旗標。此儲存庫的 `open-sse/services/compression/` 管線是針對外送 LLM 請求的
> 提示詞/上下文壓縮（`chatCore.ts`，大約在 `resolveCompressionSettings`/`selectCompressionStrategy` 區塊附近），
> 而不是針對合成的 429 回應主體進行 HTTP 回應壓縮——因此沒有與字面上的 bypass 旗標相對應的程式碼路徑。
> 該提示詞壓縮步驟目前也在請求管線中於 `withRateLimit()` _之前_執行，
> 因此要重新排序以便在佇列已滿的拒絕情況下跳過它，是一個超出此議題範圍的獨立且更大的變更；
> 此處刻意**未**實作，若節省 CPU 的效益值得承擔重新排序的風險，則留待後續處理。

### 速率限制自動啟用安全網與連線保護（`rateLimitProtection`）

**自動啟用安全網**（`resilienceSettings.requestQueue.autoEnableApiKeyProviders`，預設 `true`）：
預設情況下，OmniRoute 會自動為所有使用中的 API 金鑰提供者連線（`getProviderCategory(provider) === "apikey"`）啟用速率限制佇列保護。這可確保送往對速率敏感的上游 API 金鑰的傳入請求會透過 Bottleneck 排隊並節流，而不是突發湧入上游而產生 429 錯誤。此安全網可透過 `RATE_LIMIT_AUTO_ENABLE` 環境變數覆寫（`false`/`0`/`off` 為停用，`true`/`1`/`on` 為強制啟用），其優先順序高於已持久化的儀表板設定（**設定 → 韌性** / `PATCH /api/resilience`）。

**各連線 `rateLimitProtection` 的語意：**
各連線的速率限制保護是透過提供者連線上的 `rateLimitProtection` 布林欄位追蹤（在 SQLite 中持久化為 `rate_limit_protection`）：

- **明確開啟（`rateLimitProtection === true`）**：無論提供者類別為何，或自動啟用安全網是否開啟，皆會明確為此連線啟用速率限制保護。
- **明確關閉（`rateLimitProtection === false`）**：停用明確保護，但**不會**讓使用中的 API 金鑰連線退出全域自動啟用安全網。在 `reconcileEnabledConnections`（`open-sse/services/rateLimitManager.ts`）中，`false` 與 `undefined` 是等價的：只有 `rateLimitProtection === true` 會被視為明確覆寫。若 `rateLimitProtection` 為 `false`（或未設定），使用中的 API 金鑰連線仍符合自動啟用條件，並持續受到速率限制保護。
- **無各連線退出機制**：在保持其他連線的自動啟用功能運作的情況下，操作者目前無法表達「這個單一使用中的 API 金鑰連線必須在沒有速率限制佇列保護的情況下執行」。若要完全讓 API 金鑰連線在沒有速率限制佇列的情況下執行，必須全域關閉安全網（`RATE_LIMIT_AUTO_ENABLE=false` 或 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**支援的寫入路徑：**

- **`POST /api/rate-limits`**：用於切換連線 `rateLimitProtection` 的受支援管理寫入路徑（`{ connectionId: string, enabled: boolean }`）。以 `enabled: true` 呼叫會開啟明確保護；以 `enabled: false` 呼叫會移除明確保護（不過若自動啟用已開啟，使用中的 API 金鑰連線仍受全域安全網涵蓋）。
- **`PUT /api/providers/[id]`**：刻意**不**接受或翻轉 `rateLimitProtection`（#11278）。透過 `PUT /api/providers/[id]` 更新提供者連線中繼資料，永遠不會改變已持久化的速率限制保護狀態。

---

## 6. 慢流吞吐量看門狗 (#9709)

可選的`resilienceSettings.streamRecovery.throughputWatchdog`防護偵測到仍在發送區塊但產生低於配置的有用輸出速率的輔助輸出的上游。它故意與空閒超時不同：心跳和元資料都不會重置計時器，也不計為進度。它也與硬嘗試截止日期（#9153）不同，無論輸出品質如何，它仍然是絕對的安全上限。

看門狗需要一段預熱期，然後是一個完整的滾動窗口，然後才能中止。它計算聊天完成和回應API輸出事件（保守的UTF-8位元組代理）的文字增量，忽略僅使用事件和空事件，並在工具呼叫或推理事件正在進行時暫停判斷。預設情況下它是停用的，可以透過`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`啟用（此 env 值僅種子預設—已儲存的`resilienceSettings.streamRecovery.throughputWatchdog.enabled`布林值獲勝；請參閱本指南頂部的 env-vs-dashboard 優先註解）；視窗、預熱、最小速率和最小可測量輸出受到正常彈性設定歸一化層的限制。

啟用後，看門狗中止僅應用於活動的上游嘗試。在任何用戶端可見位元組之前，現有的相同帳戶早期復原路徑可能會重新開始嘗試。提交後，串流不會盲目重播；只有現有的安全中游延續合約才可以拼接後綴。最終確定仍然是單次的，因此使用情況統計和信號量釋放不會重複。

---

## 7. 上游狀態重述（錯誤陳述的配額錯誤）

**範圍：** 一個以錯誤 HTTP 狀態回報暫時配額耗盡的上游閘道。

**目的：** 在分類之前更正誤導性的狀態，讓下游取用者（fallback 引擎、組合彙總、面向用戶端的回應）看見失敗的真正可重試性質。

部分閘道會以不可重試的 HTTP 狀態表示暫時配額耗盡。`agentrouter.org` 會回傳 `403`（有時為 `400`），並附帶中文本文（`用户额度不足` / `额度不足`），而不是標準的 `429`。Claude
Code 等用戶端會將 `403` 視為永久錯誤並中止工作階段；若不加以更正，
fallback 引擎會將其分類為 `AUTH_ERROR`，而不是配額事件。

**實作：**

- 登錄表 + 比對器：`open-sse/config/upstreamStatusRestatement.ts` — 每個提供者各自擁有規則清單（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`），透過 `applyStatusRestatement()` 進行比對。
- 呼叫位置：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 區塊
  （約第 3654 行），緊接在 `parseUpstreamError()` 解析出帶有錯誤 HTTP 狀態的上游回應（`!providerResponse.ok`）之後，且在任何分類執行之前，因此每個下游取用者都能看見更正後的狀態。嵌入 `200` SSE 串流中的錯誤會遵循另一個較晚的串流解析路徑，目前**不**涵蓋在此 hook 中 — 這是已知限制，目前 agentrouter 的錯誤狀態尚不需要此功能（因為它會以錯誤 HTTP 狀態呈現）。
- 重試資格：`429` 位於 `RETRY_AFTER_ELIGIBLE_STATUSES`
  （`open-sse/services/combo/unavailableRetryGate.ts`）中，因此重述後的錯誤會攜帶實際的重試時間窗，而不是以失效的 `403` 呈現。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）僅是重述後的回應告知**用戶端**的值；它本身不是連線內部的冷卻／鎖定持續時間 — 該時間由實際處理重述錯誤的機制另行控管（Connection Cooldown 的遞增退避，第 2 節，API 金鑰提供者的基準值為 `3s`；或 Model Lockout，第 3 節，適用於 agentrouter 等每模型配額提供者）。路由器可能會在對用戶端宣告的 60 秒時間窗之前，於內部更早具備重試資格 — 這是刻意保留的緩衝空間，而非錯誤。

永久錯誤（agentrouter 的 `无权访问模型` — 無權存取此模型）**絕不會**被重述：即使 `textMarkers` 命中，`excludeMarkers` 也會否決該規則，因此錯誤會保留原始狀態，且不會永遠重試。相符的提供者分類規則
（`open-sse/config/providerErrorRules.ts` 中的 `agentrouter-model-access-denied`：
`reason: "auth_error"`、`scope: "model"`，宣告的基準冷卻時間為 `6h`）會由
`checkFallbackError`（`open-sse/services/accountFallback.ts`）
在通用 apikey 類別 `FORBIDDEN` 提前返回之前進行查詢，條件是
`honorsRuleLockScope(provider)`（#10334 — 目前僅透過
`providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單專屬於 agentrouter）。規則宣告的 6h 冷卻時間會以
`fallbackResult.baseCooldownMs` 的形式傳遞，但仍會進入既有的每模型配額鎖定路徑
（`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`，#10334 僅變更冷卻時間來源）：如同其他模型鎖定一樣，該時間會被限制在操作員的
`mlSettings.maxCooldownMs`（預設為 `1_800_000ms` / 30 分鐘）以下，而_persisted lockout reason_仍維持既有的硬編碼值 `"forbidden"`，不會改為規則的 `"auth_error"` — 端到端遵循的只有冷卻時間長度，而非原因字串。連線本身會保持啟用；同一連線上的兄弟模型不受影響。

重述後的配額錯誤（`额度不足`）在正式環境中會命中提供者規則
（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`，本身未宣告冷卻時間 — 持久化層的縮放退避預設值會套用）。自 #10334 起，
`ProviderErrorRuleMatch` 中的 `scope` 會端到端地被使用，但**僅**適用於
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單中的提供者（`providerErrorRules.ts` —
目前僅有 `"agentrouter"`，透過 `honorsRuleLockScope()` 控制）。對於其他所有提供者，`scope` 仍僅具參考資訊，與 #10334 之前完全相同。
`checkFallbackError` 會將相符規則的 scope 暴露為
`fallbackResult.ruleScope`；`isAgentrouterConnectionQuotaScope()`
（`src/sse/services/auth.ts`）是共用的防護，會確認 `ruleScope` 確實可安全地作為一個全連線範圍、可自行恢復的訊號來遵循（scope `"connection"`、原因為 `quota_exhausted`，絕不為 `permanent`，也絕不為 `creditsExhausted` — 用於防範未來將 scope `"connection"` 與永久帳戶狀態配對的情況）。有兩個取用者會呼叫它：

- **持久化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）：
  不再落入 passthrough-provider 的**按模型**鎖定分支（agentrouter 的設定為 `passthroughModels: true` → `hasPerModelQuota()` 回傳 `true`），而是套用**暫時性連線冷卻** — `testStatus: "unavailable"` + `rateLimitedUntil`，絕不設定終端狀態（`credits_exhausted`/`banned`/`expired`）— 如此一來，連線會在冷卻期結束後自行恢復，不需要手動重設憑證。
  對設定 `disableCooling: true` 的連線會跳過（#2997）：這個退出選項會改為落入按模型鎖定分支（這是已記錄的取捨 — 請參閱分支上方的程式碼註解）。
- **相同請求的組合路由**（`applyComboTargetExhaustion()`、`open-sse/services/combo/targetExhaustion.ts`）：相同的防護條件會將連線標記到記憶體中的 `exhaustedConnections` 集合，索引鍵為 `${provider}:${connectionId}`。這只會跳過仍在處理中的相同請求目標，且該目標本身必須在自己的 target 物件上帶有完全相同的 `connectionId`（`getExhaustedTargetSkipReason()`、`open-sse/services/combo/comboPredicates.ts`、在 `exhaustedConnections` 查找前的 `if (provider && connectionId)`）— 一般的模型清單組合中，同層目標本身不會帶有固定的 `connectionId`，而是每次分派時才從回應的 `X-OmniRoute-Selected-Connection-Id` 標頭解析其中一個，因此絕不會命中該索引鍵。對於這個常見情況，防止剩餘步驟重用剛剛耗盡額度的帳戶，真正發揮作用的不是這個 Set — 而是上方的持久化層（連線的 `rateLimitedUntil` 現在位於未來）與相同的防護條件共同抑制該失敗的 `transientRateLimitedProviders`（請參閱「兩階段設計」以及 `targetExhaustion.ts` 中 `isAgentrouterConnectionQuotaScope` 分支上的程式碼註解）：由於該 Set 未被標記，`combo.ts` 的 `allowRateLimitedConnection` 強制允許（`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）不會對該提供者的剩餘步驟生效，因此憑證選取的 `rateLimitedUntil` 篩選條件（`src/sse/services/auth.ts:1238`）會正常獲得遵守，剩餘步驟要麼選取其他仍符合資格的 agentrouter 連線，要麼因沒有可用憑證而失敗 — 不會強行回到這個分支剛剛冷卻的連線。

### 兩階段設計：狀態重述，然後分類

狀態重述（`upstreamStatusRestatement.ts`）與提供者分類規則（`open-sse/config/providerErrorRules.ts`、`providerRuleRegistry`）是分開的登錄表，兩者都以提供者 ID 和文字標記作為索引，但執行位置及用途不同：重述會在 `chatCore.ts` 中及早改寫 HTTP 狀態；分類規則則會在 `checkFallbackError()` 中選取後援 `reason` 並鎖定 `scope`（`model` / `provider` / `connection`）（`open-sse/services/accountFallback.ts`）。

只有對 `providerErrorRules.ts` 中 `FULL_TEXT_RULE_PROVIDERS` 允許清單所列的提供者，分類規則才會看到完整的錯誤**文字**（這是比對 `额度不足` 等本文標記所需的內容）— 目前只有 `"agentrouter"`。對於其他所有**內建目錄**提供者，`checkFallbackError` 傳給 `getProviderErrorRuleMatch` 的只有結構化錯誤（`{code, type}`），這對基於標頭／狀態／程式碼的規則已經足夠，但無法看到本文文字標記。輔助函式 `resolveRuleMatchBody()` 會執行這項選擇：對允許清單中的提供者使用完整錯誤文字，否則使用結構化錯誤。將**內建**提供者加入 `FULL_TEXT_RULE_PROVIDERS` 是針對每個提供者的明確選擇加入 — 其存在目的，是讓不在清單中的每個提供者仍維持位元組層級完全不變的預設路徑。

規則的 `scope`（`model` / `provider` / `connection`）與 `FULL_TEXT_RULE_PROVIDERS` 是彼此獨立的選擇加入項目：`checkFallbackError` 只會將其提供為 `fallbackResult.ruleScope`，而下游取用者只有在同一檔案中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單所列提供者上，才會將其視為不只是資訊標籤的內容（透過 `honorsRuleLockScope()` 控制 — 目前只有 `"agentrouter"`）。關於提供者加入該允許清單後，`scope: "connection"` 比對實際會執行什麼操作，請參閱上方的「重述後的配額錯誤」。

**#11104 — 操作者宣告的規則會繞過這兩個允許清單。**操作者可以在執行階段透過 `settings.providerErrorRules`（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）宣告每個提供者的規則，而不必編輯此檔案。讓操作者規則受 `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 限制 — 這兩個允許清單的用途是保護內建目錄規則的**預設**行為 — 會使設定機制對除清單中已列出的提供者以外的所有提供者失去作用，因為宣告規則本身已是操作者明確的選擇加入。`resolveRuleMatchBody()` 與 `honorsRuleLockScope()` 都會先檢查 `hasOperatorRuleForProvider()`：具有操作者規則的提供者會取得原始錯誤文字，並遵循其宣告的 `scope`，不論它是否同時出現在任一允許清單中。

**操作者宣告的規則**（`OperatorProviderErrorRule`）：每個規則都有選用的 `status` 與選用的 `match`（對錯誤文字執行簡單的不分大小寫子字串比對，絕不使用 RegExp，因此不會造成 ReDoS），且至少必須設定其中一項。兩者同時設定時會以 AND 條件組合；省略的欄位會比對任何內容，因此 `{match: "insufficient_quota"}` 會比對任何帶有該程式碼的狀態。第一個符合的規則會生效。`cooldownMs` 最多接受 30 天；規則總數最多為 50 個。

**兜底預設值**（`settings.providerErrorDefaults`，選擇性啟用，透過
`setOperatorProviderErrorDefaults` 設定）：`{[provider]: {cooldownMs, scope?, reason?}}`
其中 `cooldownMs` 的範圍為 1 分鐘至 30 天。只有在沒有任何操作員規則或內建目錄規則符合時，且錯誤為 402、403、408、429 或 5xx 時，才會套用預設值。請求形狀錯誤（400、404、409、413、422）以及單獨的 401 會維持各自的處理方式。若未明確指定 `reason`，原因會根據狀態碼取得，方式與 `classifyError` 相同。宣告預設值會在 `hasOperatorRuleForProvider()` 中被視為操作員規則，因此其 `scope`（預設為 `"connection"`）會受到遵循。預設值的實際冷卻時間取 `cooldownMs` 與提供者自身重試提示（`Retry-After`、`x-ratelimit-reset` 或本文中的重設提示，亦即當連線冷卻設定「使用上游重試提示」開啟時引擎所遵循的相同提示）兩者中較長者，因此預設值可以延長較短的上游提示，但絕不會縮短真正的重設時間。明確的操作員規則會保留其確切的 `cooldownMs`。規則與預設值都不會繞過 `markAccountUnavailable` 中的連線冷卻防護：作用中的較長冷卻時間絕不會被縮短，終止狀態也絕不會被覆寫。在 `checkFallbackError` 中較早執行的內建文字偵測器（額度耗盡、每日配額、帳戶停用）仍會優先處理其各自的詞組。

**已知缺口 — `providerRuleRegistry` 永遠不會針對 HTTP 400 進行查詢。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全透過自身的模式陣列（`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、`CONTEXT_OVERFLOW_PATTERNS` 等）對狀態 400 進行分類，並會在抵達上方的 `configuredRule`/`getProviderErrorRuleMatch` 分支之前返回。具有 `status: 400` 的內建目錄規則（或操作員規則）在語法上有效，但永遠不會觸發。目前沒有任何現有規則以 400 為目標，因此不會影響生產環境 — 但未來的 400 規則必須先修改此分支，這比新增規則更大的變更（因為會重新分類所有已依賴模式陣列行為的提供者所收到的 400），不在單一提供者規則新增的範圍內。

### 新增會錯誤陳述配額的閘道

1. 在 `statusRestatementRegistry` 中註冊一個規則陣列（`open-sse/config/upstreamStatusRestatement.ts`）。讓 `textMarkers`
   僅限於提供者專用；絕不要重複使用會與
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）衝突的通用英文詞組。
2. 可選擇在
   `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）中註冊分類規則，以選擇正確的鎖定範圍（帳戶層級配額使用
   `connection`，每個模型的錯誤使用 `model`）。此步驟只有在生產環境中，對於規則需要完整錯誤文字（本文標記）的提供者才會生效：將提供者 id 加入同一檔案中的 `FULL_TEXT_RULE_PROVIDERS` — 否則 `checkFallbackError` 只會將結構化的
   `{code, type}` 錯誤傳給規則，而本文文字規則在實際流量中永遠不會符合。純粹根據 `status`/`headers` 進行比對的規則（例如 Opencode 或 Minimax 的規則）不需要此選擇性啟用。另外，如果規則宣告 `scope: "connection"`，且目的是實際的全連線冷卻加上相同請求的組合跳過（而不只是資訊標籤），請將提供者 id 加入同一檔案中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` — 這是控制 `markAccountUnavailable()`（`src/sse/services/auth.ts`）中的 `isAgentrouterConnectionQuotaScope()` 類型消費，以及
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）的閘門；若未加入，`scope` 仍會透過 `fallbackResult.ruleScope` 傳遞，但不會有任何實際作用。
3. 新增對應的單元測試，參照
   `tests/unit/upstream-status-restatement.test.ts` 和
   `tests/unit/agentrouter-error-rules.test.ts`（包括
   not-permanent / not-creditsExhausted 防護；如果提供者需要允許清單，還要新增測試，確認 `resolveRuleMatchBody()` 僅會對該提供者返回完整文字）。

不需要修改 `chatCore.ts`、`classifyError` 或 combo。

#### Egress 分桶鎖定 (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 系列）會被視為以 IP 分桶的上游（opencode 免費層是以 IP 分桶，而非以帳戶分桶 — 參見 #9611）：被分類為 `quota_exhausted`
**或** `rate_limit_exceeded` 的 status-429，會在輪替嘗試連線之前，冷卻所有列入允許清單的系列連線，只要其最後已知的 egress IP 與失敗連線的 IP 相符
— 避免 N-1 次必然失敗的上游呼叫（形態與 #10460/#10525 相同）。
此處特意納入 `rate_limit_exceeded`：在 `markAccountUnavailable` 路徑中，opencode 專用規則永遠不會符合（沒有將標頭/本文傳給 `checkFallbackError`，且 opencode 不在 `FULL_TEXT_RULE_PROVIDERS` 中），因此，本文帶有訂閱配額文字（「monthly usage limit reached」）的 429，會先由配額文字後備處理（`buildSubscriptionQuotaFallback`、`accountFallback.ts`；1 小時冷卻）分類為 `quota_exhausted`，之後才會到達 `status_429` 規則 — 而不含配額文字的 429（一般速率限制）則會透過 `status_429` 規則分類為 `rate_limit_exceeded`，同樣會冷卻整個 IP 系列。對於列入允許清單的提供者而言，IP 分桶的速率限制與配額耗盡是相同的訊號。合理限制：

- **盡力而為**：鎖定會從 `proxy_logs`（24 小時視窗、同步、無快取）解析連線最後已知的 `egress_ip`
  。快取為冷狀態（從未探測過 egress IP）或沒有資料列時 → 失敗的連線仍會由分支進入冷卻狀態（如同目前的記錄方式），只是
  不會鎖定任何同層連線。
- **永不進入終止狀態**：冷卻是一個會續期的配額視窗
  （`testStatus: "unavailable"`）；永遠不會從 IP 層級訊號推導出永久狀態。`disableCooling` 連線會完全略過此分支。
- **允許清單家族的鎖定粒度變更**：這是範圍變更，而不只是同層連線最佳化。opencode 是 `passthroughModels`
  提供者，因此在此分支之前，429 會產生每個 MODEL 的鎖定；現在則會產生連線冷卻——包括操作人員只有單一連線、完全沒有同層連線的情況。這正是 opencode 規則表已宣告為正確的粒度（`scope: "connection"`、
  `providerErrorRules.ts`），只是到目前為止從未生效，因為 opencode 不在
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中。此分支會自行寫入失敗連線的冷卻狀態與 `backoffLevel`，仿照
  connection-scoped agentrouter 分支，然後返回——每個模型的封鎖與下方的通用路徑都不會被執行。
- **包含 Combo**：與 agentrouter 分支相同，此範圍會刻意忽略 Combo 呼叫端針對 429 套用的
  `persistUnavailableState`/`isCombo` 降級。每個模型的鎖定並不是此範圍的較弱形式，而是錯誤的單位：它完全無法表示耗盡的 IP，因此 Combo
  輪替仍會在每個同層連線上各消耗一次必然失敗的呼叫。
- **同層連線安全性**：已進入終止狀態（banned/credits_exhausted）的同層連線，或已處於更長冷卻狀態的同層連線，永遠不會被覆寫。
- **專屬允許清單**：擴大 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是明確的擁有者決策；不使用通用接線（pattern #10334/#10419）。同層連線查詢會繫結相同的允許清單，而不是在 SQL
  常值中重複它，因此擴大清單時只需變更一行。
- **雙向的 Egress IP 輪替**：查詢視窗（24 小時）遠大於 egress-IP 快取 TTL（5 分鐘），因此「最後已知 IP」代表的是歷史記錄，而非目前狀態。如果連線的 Proxy 在視窗內輪替過，鎖定可能會**遺漏**實際共用的 IP（記錄中的 IP 是新的、尚未耗盡的 IP）——反過來，也可能會讓已經從耗盡 IP
  輪替離開的同層連線進入冷卻狀態。第二種情況會讓該同層連線承受一次冷卻視窗；兩者都是基於歷史記錄查詢的盡力而為限制，並予以接受。
- **成本**：對 `proxy_logs` 執行兩次有界掃描（透過 `idx_pl_timestamp` 篩選視窗），且只在 429 頻率下執行。不新增索引（migration 134
  YAGNI）。測量結果來自中等規模、具有實際流量的資料庫副本；高吞吐量執行個體在相同視窗中會按比例保留更多資料列。

## 其他韌性功能

- **20 種路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）— 請參閱 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重置感知路由**（v3.8.0）— 依配額重置時間優先選擇連線。
- **背景模式降級** — Responses API 的 `background: true` 會降級為同步模式並附上警告。
- **動態工具上限偵測** — 達到工具數量上限時，對提供者進行退避。
- **緊急回退** — 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；操作人員可在功能旗標頁面覆寫此設定，無需重新啟動。

---

## 除錯

- 加權組合回應 `503 all_targets_cooling_down`（已設定 `Retry-After`，`diagnostics.excluded` 列出每個目標及其 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` 狀態）→ 表示集區已設定並連線，只是每個目標都被韌性計時器排除；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告會註明原因與剩餘秒數。同一組合若回應 `404 no_executable_targets`，則表示與韌性計時器無關（沒有可執行的目標，或每個帳號都未通過可用性探測）。此功能建置於 `open-sse/services/combo/pinRecovery.ts`，使用 `targetResolution.ts` 所收集的排除項目。
- 某提供者的所有金鑰都被略過 → 請同時檢查熔斷器狀態以及每個連線的 `rateLimitedUntil`/`testStatus`。
- 提供者在重置窗口過後仍被永久排除 → 程式碼直接讀取原始的 `state`，而非使用 `getStatus()`/`canExecute()`。
- 單一金鑰失敗、其他金鑰應可運作 → 優先使用連線冷卻而非熔斷器。
- 僅單一模型失敗 → 優先使用模型鎖定而非連線冷卻。
- 狀態應自動恢復但未恢復 → 檢查是否存在未來時間戳，以及讀取路徑是否會刷新過期狀態。永久狀態需要手動變更。

---

## 執行時期狀態 — 代理快速參考

> 自 `AGENTS.md` →「Resilience Runtime State」逐字搬移（PR #12743），使代理
> 指南維持在 40k 上下文預算之內。此為上述章節的精簡、面向代理版本；
> 編號章節仍是完整參考文件。

OmniRoute 有三種相關但各自不同的暫時性失敗機制。除錯路由行為時，
請務必區分它們的適用範圍。請參閱
[三層韌性架構圖](../diagrams/exported/resilience-3layers.svg)
（來源：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)）
以快速掌握全貌。

### 提供者熔斷器

**範圍**：整個提供者，例如 `glm`、`openai`、`anthropic`。

**目的**：停止將流量送往在上游/服務層級持續失敗的提供者，
避免單一不健康的提供者拖慢每一個請求。

**實作**：

- 核心類別：`src/shared/utils/circuitBreaker.ts`
- 聊天閘門/執行接線：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 執行時期狀態 API：`src/app/api/monitoring/health/route.ts`
- 共用包裝器：`open-sse/services/accountFallback.ts`
- 持久化狀態資料表：`domain_circuit_breakers`

**狀態**（4 種 — `src/shared/utils/circuitBreaker.ts`）：

- `CLOSED`：允許正常流量。
- `DEGRADED`：早期警告區間 — 失敗次數已超過降級閾值，但尚未達到
  熔斷器閾值；流量仍會通過，儀表板會顯示警告。有效的連線
  測試或一段沒有新失敗的安靜窗口會使其回到 `CLOSED`
  （窗口設定見 `docs/architecture/RESILIENCE_GUIDE.md`）。
- `OPEN`：提供者暫時被封鎖；呼叫端會收到 provider-circuit-open 回應，
  或組合路由跳至另一個目標。
- `HALF_OPEN`：重置逾時已屆滿；允許一個探測請求。成功則關閉
  熔斷器，失敗則再次開啟。

**預設值**（`open-sse/config/constants.ts` → `PROVIDER_PROFILES`，透過
`src/lib/resilience/settings.ts` 中的 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` 使用，
再接到 `src/sse/handlers/chatHelpers.ts` 中的 `getCircuitBreaker(provider, …)`）。
整個提供者層級的熔斷器依據 `circuitBreakerThreshold` / `circuitBreakerReset` 運作：

| 設定檔   |       降級於 | 開啟於（`circuitBreakerThreshold`） | 重置（`circuitBreakerReset`） |
| -------- | -----------: | ----------------------------------: | ----------------------------: |
| OAuth    |          `5` |                                 `8` |                         `60s` |
| API 金鑰 |          `7` |                                `12` |                         `30s` |
| 本地     | （推導得出） |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` 也定義了 `providerFailureThreshold`（10/15/2）、
`providerFailureWindowMs`（15/30/5 分鐘）與 `providerCooldownMs`（5/10/1 分鐘）：這些是
**選用式全域 Provider Cooldown 的窗口閘門**（`PROVIDER_COOLDOWN_ENABLED`，預設
關閉）的運作依據 — `open-sse/services/providerCooldownTracker.ts` 中的提供者層級
項目，只有在 `providerFailureWindowMs` 窗口內累積 `providerFailureThreshold` 次失敗後
才算進入冷卻，接著冷卻 `providerCooldownMs`。它們「不是」實際運作中熔斷器的
閾值 — 請勿調整它們並期望熔斷器行為改變。所有預設值都可透過
`OMNIROUTE_PROVIDER_BREAKER_*` 與 `OMNIROUTE_CIRCUIT_BREAKER_*` 環境變數覆寫；
執行時期最準確的參考表位於 `docs/architecture/RESILIENCE_GUIDE.md`。

只有提供者層級的失敗狀態碼才應觸發提供者熔斷器：

```ts
(408, 500, 502, 503, 504);
```

對於一般的帳號/金鑰/模型錯誤（例如大多數 `401`、`403` 或 `429`
情況），請勿觸發整個提供者層級的熔斷器。這些錯誤通常屬於連線冷卻
或模型鎖定的範疇。一般 API 金鑰提供者的 `403` 應可恢復，
除非它被歸類為終端性的提供者/帳號錯誤。

熔斷器採用惰性恢復（lazy recovery），而非背景計時器。當 `OPEN` 狀態過期時，諸如
`getStatus()`、`canExecute()` 與 `getRetryAfterMs()` 這類讀取操作會將狀態刷新為
`HALF_OPEN`，因此儀表板與組合候選建構器不會永遠持續排除一個已過期的提供者。

### 連線冷卻（Connection Cooldown）

**範圍**：單一提供者連線／帳號／金鑰。

**目的**：暫時跳過一個異常的金鑰／帳號，同時允許同一提供者的其他連線繼續服務請求。

**實作**：

- 寫入／更新路徑：`src/sse/services/auth.ts::markAccountUnavailable()`
- 帳號選擇／過濾：`src/sse/services/auth.ts::getProviderCredentials...`
- 冷卻時間計算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定：`src/lib/resilience/settings.ts`

提供者連線上的重要欄位：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在帳號選擇期間，當以下條件成立時，連線會被跳過：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷卻同樣是惰性的：當 `rateLimitedUntil` 已成過去時間，連線便再次具備資格。成功使用後，`clearAccountError()` 會清除 `testStatus`、
`rateLimitedUntil`、錯誤欄位以及 `backoffLevel`。

預設連線冷卻行為：

- OAuth 基礎冷卻時間：`5s`。
- API 金鑰基礎冷卻時間：`3s`。
- API 金鑰的 `429` 應優先採用上游的重試提示（`Retry-After`、重置標頭，或可解析的重置文字），若有的話。
- 重複發生的可恢復失敗會使用指數退避：

```ts
baseCooldownMs * 2 ** failureIndex;
```

防驚群（anti-thundering-herd）機制可防止同一連線上的併發失敗重複延長冷卻時間或重複遞增 `backoffLevel`。

終態不是冷卻。`banned`、`expired`（僅在透過 `EXPIRED_RETRY_MAX` 進行 N 次有上限的重試後才會成為終態）以及 `credits_exhausted`
旨在保持不可用狀態，直到憑證／設定變更或維運人員手動重置為止。請勿用暫時性冷卻狀態覆寫終態。

### 模型鎖定（Model Lockout）

**範圍**：提供者 + 連線 + 模型。

**目的**：當只有某個模型對該連線不可用或配額受限時，避免停用整條連線。

範例：

- 以模型為單位計算配額的提供者回傳 `429`。
- 本地提供者對某個缺失的模型回傳 `404`。
- 提供者特定的模式／模型權限失敗，例如所選的 Grok 模式。

模型鎖定位於 `open-sse/services/accountFallback.ts`，讓同一連線可繼續服務其他模型。

### 除錯指引

- 若某提供者的所有金鑰都被跳過，請同時檢查提供者熔斷器狀態以及每條連線的 `rateLimitedUntil`／`testStatus`。
- 若某提供者在重置窗口後仍被永久排除，請檢查程式碼是否直接讀取原始的 `state`，而非使用 `getStatus()`／`canExecute()`。
- 若某提供者的一組金鑰失敗但其他金鑰應可運作，請優先使用連線冷卻而非提供者熔斷器。
- 若只有一個模型失敗，請優先使用模型鎖定而非連線冷卻。
- 若某狀態應能自我恢復，它應具備未來的時間戳／重置逾時，以及能刷新過期狀態的讀取路徑。永久狀態需要手動變更憑證或設定。

---

## TLS 指紋識別與隱匿

針對特定提供者的隱匿技術(JA3/JA4、CCH、混淆)另有專文說明 — 請參閱 `docs/security/STEALTH_GUIDE.md`(git;未編譯進 `/docs`)。

---

## 韌性測試(Phase 8 · Block C)

除了韌性邏輯的單元測試之外,另有三項測試會在真實的壓力/故障條件下檢驗執行時期(全部為整合/夜間測試 — 皆不會阻擋 PR):

| 測試        | 說明                                                                                                               | 執行                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| Chaos       | 假上游節點注入真實的延遲/重設/逾時/503;驗證斷路器會開啟/恢復,且 `checkFallbackError` 會將 503 分類為可恢復的備援。 | `RUN_CHAOS_INT=1 npm run test:chaos` |
| Heap-growth | 在 `--expose-gc` 下透過 `createSSEStream` 建立約 500 個串流;若堆積(heap)增長超過上限則測試失敗(OOM 防護 #3069)。   | `npm run test:heap`                  |
| k6 soak     | 對 `/api/monitoring/health` 施加持續負載;p95/錯誤率門檻。                                                          | `k6 run tests/load/k6-soak.js`(夜間) |

由 `.github/workflows/nightly-resilience.yml`(cron + dispatch)統籌執行。在預設的
`test:integration` 中,chaos 與 heap 會自行略過(若未設定 `RUN_CHAOS_INT`/`--expose-gc`)。

---

## 另請參閱

- [架構指南](./ARCHITECTURE.md) — 系統架構與內部運作
- [使用者指南](../guides/USER_GUIDE.md) — 提供者、組合、CLI 整合
- [Auto-Combo 引擎](../routing/AUTO-COMBO.md) — 16 因子評分、模式組合包
