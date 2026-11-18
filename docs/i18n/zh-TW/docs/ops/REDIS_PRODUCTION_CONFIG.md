# Redis Production Configuration Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## 概述

Redis 是 OmniRoute 中的**選用性軟依賴** — 當 Redis 無法使用時，應用程式會優雅降級（使用記憶體內的
備援機制）。在正式環境中，調整 Redis 可降低四種不同工作負載的延遲：

| 工作負載   | 驅動程式                      | 用戶端 Factory                                 | 金鑰模式                                |
| ---------- | ----------------------------- | ---------------------------------------------- | --------------------------------------- |
| 速率限制   | `rateLimiter.ts`              | `getRedisClient()` — 延遲載入的 `ioredis` 單例 | `<prefix>rl:*` Lua 原子速率限制視窗     |
| 驗證快取   | `apiKeys.ts`                  | 重複使用 `rateLimiter` 的用戶端                | `<prefix>auth:api_key:<sha256>`，含 TTL |
| 配額儲存   | `redisQuotaStore.ts`          | 個別的 `getRedisClient(url)` 單例              | `<prefix>quota:*`，可依執行個體設定     |
| 預熱斷路器 | `redisCircuitBreakerStore.ts` | `circuitBreakerFactory.ts` 中的個別用戶端      | `<prefix>warmup:cb:<connectionId>`      |

這四種工作負載共用同一個命名空間前綴，因此 OmniRoute 可以與其他應用程式共存於單一 Redis
執行個體上（例如 `127.0.0.1:6379`）。請參閱[金鑰命名空間](#key-namespacing)。

---

## 目前的設定（程式碼預設值）

| 設定                             | 值                                           | 位置                                                                                  |
| -------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` 環境變數             | `redis://redis:6379`（compose），選用        | `rateLimiter.ts:5`、`.env.example`                                                    |
| `REDIS_KEY_PREFIX` 環境變數      | `omniroute:`（預設）                         | `rateLimiter.ts`、`redisQuotaStore.ts`、`redisCircuitBreakerStore.ts`、`.env.example` |
| `QUOTA_STORE_REDIS_URL` 環境變數 | 分開設定，可與 `REDIS_URL` 不同              | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`             | `"sqlite"`（預設），`"redis"` 選用           | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`   | `3`                                          | `rateLimiter.ts` 用戶端建立                                                           |
| `enableReadyCheck`               | 未設定（ioredis 預設值：`true`）             | —                                                                                     |
| `lazyConnect`                    | 未設定（ioredis 預設值：`false`）            | —                                                                                     |
| `retryStrategy`                  | 未設定（ioredis 預設值：200ms 基準、指數式） | —                                                                                     |
| TLS／密碼／資料庫索引            | **未設定**                                   | —                                                                                     |
| Sentinel／Cluster                | **未設定** — 僅支援獨立單節點                | —                                                                                     |

---

## 鍵命名空間

OmniRoute 會與主機上執行的其他服務共用 Redis 執行個體。若沒有命名空間，`auth:api_key:<sha256>` 或 `rl:*` 等鍵可能會與使用同一 Redis 的其他應用程式所建立的鍵發生衝突（此執行個體在 `127.0.0.1:6379` 上執行 Redis，並與其他服務並存）。

將 `REDIS_KEY_PREFIX` 設為非空字串，為 OmniRoute 的**每一個**鍵加上前綴：

```bash
# .env——所有 OmniRoute 鍵都會變成 omniroute:rl:*、omniroute:auth:*、omniroute:quota:*、omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **預設值：** `omniroute:`（當 `REDIS_KEY_PREFIX` 未設定或為空白時套用）。
- **套用範圍：**速率限制器與驗證快取（透過 `keyPrefix` 共用 `ioredis` 用戶端）、配額儲存區（`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`），以及預熱斷路器（`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`）。
- 當 Redis 中已存在鍵時，**變更前綴**會使舊鍵成為孤立鍵（它們會透過 TTL／LRU 到期）。此變更是安全的，無需移轉。唯一的例外是標示為禁止之連線的預熱斷路器鍵：該鍵會在沒有 TTL 的情況下持久保存，因此請使用 `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` 列出遺留鍵並將其刪除。
- **ioredis `keyPrefix`** 會在寫入時自動加上前綴，並在讀取時將其移除，因此應用程式碼永遠不會看到該前綴。

---

## 建議的正式環境調校

### 1. 連線池／用戶端選項（ioredis `Redis` 建構函式）

目前的程式碼會建立單一的 `new Redis(url)`，且未使用自訂選項。對於正式環境的
多副本部署，請在程式碼中傳入用戶端工廠，或包裝 `getRedisClient()`：

```typescript
const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null, // 無重試限制；由 retryStrategy 決定
  enableReadyCheck: true, // 在接受呼叫前確認伺服器已就緒
  lazyConnect: true, // 建構時不要連線；等待第一次呼叫
  retryStrategy: (times) => {
    if (times > 10) return null; // 重試 10 次後放棄 → 稍後重新連線
    return Math.min(times * 200, 5000); // 200ms、400ms、…、上限 5s
  },
  enableAutoPipelining: true, // 將並行命令合併為一次 TCP 寫入
  keepAlive: 10000, // 每 10 秒執行一次 TCP keep-alive
});
```

**主要取捨：**

- `maxRetriesPerRequest: null` + `retryStrategy` — 正式環境的首選設定，如此暫時性的
  Redis 重新啟動不會立即導致每個請求失敗。`checkRateLimit()` 中的記憶體內備援會
  吸收失敗路徑。
- `lazyConnect: true` — 避免伺服器在開始接受連線前，必須先確保 Redis 已啟動。
- `enableAutoPipelining: true` — 減少並行速率限制檢查的往返次數；
  在單一連線上超過 50 RPS 時很有幫助。

### 2. Redis 伺服器設定（`redis.conf`）

```
# 記憶體
maxmemory 80%                        # 為 OS 頁面快取保留空間
maxmemory-policy allkeys-lru         # 在記憶體壓力下驅逐過時的驗證快取項目

# 持久化（選用 — OmniRoute 即使沒有持久化也能安全處理當機）
save 300 1                           # 若至少有 1 個金鑰變更，至少每 5 分鐘建立一次快照
appendonly no                        # 不需要 AOF；資料可以重新產生
appendfsync no                       # 不產生 fsync 額外負擔（RDB 已足夠）

# 網路
timeout 0                            # 不因閒置而中斷連線
tcp-keepalive 300                    # 5 分鐘 keep-alive
tcp-backlog 511                      # 為突發負載設定的連線佇列

# 效能
hz 10                                # 預設值；對延遲敏感時使用 100
activedefrag yes                     # 碎片率 >10% 時自動進行碎片整理
```

**`maxmemory-policy allkeys-lru` 的取捨：** 驗證快取項目可能會在記憶體壓力下
遭到驅逐。這是安全的 — `setCachedApiKey` 在快取未命中時總會重新填入資料，
而 SQLite 備援是權威來源。速率限制器 Lua 指令碼會建立小型金鑰，這些金鑰本來
就會短暫存在。

### 3. Docker Compose 設定

正式環境的 compose（`docker-compose.prod.yml`）使用 `redis:8.6.2-alpine`。請加入：

```yaml
redis:
  image: redis:8.6.2-alpine
  command:
    [
      "redis-server",
      "--maxmemory",
      "512mb",
      "--maxmemory-policy",
      "allkeys-lru",
      "--activedefrag",
      "yes",
      "--save",
      "300 1",
    ]
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 3s
    retries: 3
    start_period: 5s
```

### 4. 多執行個體／擴展考量

**所有副本使用單一 Redis** — 速率限制器 Lua 指令碼依賴單一權威金鑰空間。
在多個副本後方使用多個 Redis 執行個體會失去原子性，並使配額加倍。所有應用程式
副本應使用單一 Redis（或具備容錯移轉功能的 Redis Sentinel 叢集）。

**連線數量：** 每個應用程式副本會開啟 **2 個 TCP 連線** 至 Redis
（速率限制器用戶端 + 配額儲存區用戶端）。10 個副本即為 20 個連線，遠低於
預設 Redis 執行個體的 10k 連線上限。

### 5. 監控

透過健康檢查端點公開：

```typescript
// src/app/api/monitoring/health/route.ts 已呼叫 rateLimiter 函式
// 加入 Redis 專用檢查：
//   1. 透過 ioredis .ping() 取得 PING 延遲
//   2. 透過 INFO memory 取得記憶體使用量
//   3. 透過 INFO clients 取得連線數量
//   4. maxmemory-policy 的命中率（evicted_keys / keyspace_hits）
```

需要監控的主要指標：

- **驅逐金鑰數／秒** — 如果持續為非零，請增加 `maxmemory`
- **遭封鎖的用戶端** — 非零表示 Lua 指令碼執行緩慢或競爭程度很高
- **遭拒絕的連線** — 達到連線上限；在 20 個連線時很少發生

### 6. 與 Redis 相容的伺服器

此處使用的任何伺服器都必須執行 Lua 指令碼：速率限制器會執行一次 `EVAL`。在
不支援 Lua 的伺服器上，`checkRateLimit()` 會記錄 `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting`，
並以每個程序為單位計數，因此每個副本都會自行執行限制。選擇啟用的共用工作階段黏著
儲存區（`OMNIROUTE_SESSION_AFFINITY_STORE=redis`）也會使用 `EVAL` 讀取並更新
固定項目；不支援 Lua 時，會記錄 `[SESSION_AFFINITY] Redis error; falling back to SQLite.`，
且每個副本都會維護自己的固定項目。其他工作負載使用純命令（`SET ... EX`、`GET`、
`DEL`、`MGET`、`EXPIRE`、`INCRBYFLOAT`、雜湊和集合），而語意快取的 Redis 後端
不會傳送任何 `FT.*` 命令。

已使用 OmniRoute 3.8.52 進行測試：KiviDB 1.2.0 及其 Lua 映像
（`kividb/kividb:v1.2.0-lua`）。速率限制器（包括共用計數器的第二個程序）、
驗證快取、配額儲存區、暖機斷路器、語意快取儲存區，以及透過聊天處理常式傳送的
`/v1/chat/completions` 請求，在 Redis 8.10.3 上通過的 19 項檢查中通過了 18 項。
唯一不同之處是：`INCRBYFLOAT` 會將 `0.1 + 0.2` 儲存為 `0.30000000000000004`，
而 Redis 會儲存為 `0.3`（[kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387)）。
配額儲存區會使用 `parseFloat` 解析兩者，但兩個數字的最後幾位不同，因此恰好落在
配額邊界上的比較可能會產生不同結果。工作階段黏著儲存區不在該次執行範圍內。
([設定](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md)、
[結果](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat))

---

## 架構圖

```mermaid
flowchart LR
    subgraph App["應用程式副本"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\n共用)]
    AK -- "重複使用 RL 的用戶端" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\n配額儲存區)]
    R1 --> R2 -- "可以是相同執行個體" --> R1
```

---

## 參考資料

| File                               | Purpose                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | 主要 Redis 用戶端、Lua 速率限制指令碼、記憶體內備援機制 |
| `src/lib/db/apiKeys.ts`            | 驗證快取 — Redis→SQLite 備援                            |
| `src/lib/quota/redisQuotaStore.ts` | 用於選用配額儲存區的獨立 Redis 用戶端                   |
| `src/lib/quota/storeFactory.ts`    | 在 `sqlite` 和 `redis` 配額驅動程式之間切換             |
| `docker-compose.prod.yml`          | 生產環境 Redis 容器（映像 `redis:8.6.2-alpine`）        |
| `.env.example`                     | Redis 環境變數文件                                      |
| `src/app/api/local/redis/`         | 用於開發容器協調的 API 路由                             |
| `bin/cli/commands/redis.mjs`       | 用於開發容器協調的 CLI 指令                             |
