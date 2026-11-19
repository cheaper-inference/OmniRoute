# Redis Production Configuration Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## 概述

Redis 是 OmniRoute 中的**可选软依赖**——当 Redis 不可用时，应用会优雅降级（使用内存回退机制）。在生产环境中，调优 Redis 可降低以下四种不同工作负载的延迟：

| 工作负载     | 驱动程序                      | 客户端工厂                                       | 键模式                                  |
| ------------ | ----------------------------- | ------------------------------------------------ | --------------------------------------- |
| 速率限制     | `rateLimiter.ts`              | `getRedisClient()` — 延迟初始化的 `ioredis` 单例 | `<prefix>rl:*` Lua 原子速率限制窗口     |
| 身份验证缓存 | `apiKeys.ts`                  | 复用 `rateLimiter` 的客户端                      | `<prefix>auth:api_key:<sha256>`，带 TTL |
| 配额存储     | `redisQuotaStore.ts`          | 独立的 `getRedisClient(url)` 单例                | `<prefix>quota:*`，可按实例配置         |
| 预热熔断器   | `redisCircuitBreakerStore.ts` | `circuitBreakerFactory.ts` 中的独立客户端        | `<prefix>warmup:cb:<connectionId>`      |

所有四种工作负载共享同一个命名空间前缀，因此 OmniRoute 可以与其他应用共存于同一个 Redis 实例（例如 `127.0.0.1:6379`）。请参阅[键命名空间](#key-namespacing)。

## 当前配置（代码默认值）

| 设置                             | 值                                                 | 位置                                                                                  |
| -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` 环境变量             | `redis://redis:6379`（compose），可选              | `rateLimiter.ts:5`、`.env.example`                                                    |
| `REDIS_KEY_PREFIX` 环境变量      | `omniroute:`（默认值）                             | `rateLimiter.ts`、`redisQuotaStore.ts`、`redisCircuitBreakerStore.ts`、`.env.example` |
| `QUOTA_STORE_REDIS_URL` 环境变量 | 独立设置，可与 `REDIS_URL` 不同                    | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`             | `"sqlite"`（默认值），可选 `"redis"`               | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`   | `3`                                                | `rateLimiter.ts` 客户端创建                                                           |
| `enableReadyCheck`               | 未设置（ioredis 默认值：`true`）                   | —                                                                                     |
| `lazyConnect`                    | 未设置（ioredis 默认值：`false`）                  | —                                                                                     |
| `retryStrategy`                  | 未设置（ioredis 默认值：200ms 基础延迟，指数退避） | —                                                                                     |
| TLS / 密码 / DB 索引             | **未配置**                                         | —                                                                                     |
| Sentinel / Cluster               | **未配置** — 仅支持独立单节点                      | —                                                                                     |

---

## 键命名空间

OmniRoute 与主机上运行的其他服务共享 Redis 实例。如果没有命名空间，`auth:api_key:<sha256>` 或 `rl:*` 等键可能会与使用同一 Redis 的其他应用程序的键发生冲突（此实例在 `127.0.0.1:6379` 上运行 Redis，并与其他服务共存）。

将 `REDIS_KEY_PREFIX` 设置为非空字符串，为**每个** OmniRoute 键添加前缀：

```bash
# .env — 所有 OmniRoute 键都会变成 omniroute:rl:*、omniroute:auth:*、omniroute:quota:*、omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **默认值：** `omniroute:`（当 `REDIS_KEY_PREFIX` 未设置或为空时应用）。
- **应用范围：**速率限制器 + 身份验证缓存（通过 `keyPrefix` 共享 `ioredis` 客户端）、配额存储（`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`）以及预热熔断器（`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`）。
- 当 Redis 中已存在键时，**更改前缀**会使旧键成为孤立键（它们会通过 TTL / LRU 过期）。可以安全更改，无需迁移。唯一的例外是标记为禁止的连接所对应的预热熔断器键：该键会在不设置 TTL 的情况下持久保存，因此请使用 `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` 列出残留键并将其删除。
- **ioredis `keyPrefix`**会在写入时自动添加前缀，**并且**在读取时将其去除，因此应用程序代码永远不会看到该前缀。

---

## 推荐的生产环境调优

### 1. 连接池 / 客户端选项（ioredis `Redis` 构造函数）

当前代码创建了一个没有自定义选项的 `new Redis(url)`。对于生产环境中的多副本部署，请在代码中传入客户端工厂，或包装 `getRedisClient()`：

```typescript
const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null, // 不限制重试次数；由 retryStrategy 决定
  enableReadyCheck: true, // 在接受调用前确认服务器已就绪
  lazyConnect: true, // 构造时不连接；等待首次调用
  retryStrategy: (times) => {
    if (times > 10) return null; // 10 次重试后放弃 → 稍后重新连接
    return Math.min(times * 200, 5000); // 200 毫秒、400 毫秒，……，上限为 5 秒
  },
  enableAutoPipelining: true, // 将并发命令合并为一次 TCP 写入
  keepAlive: 10000, // 每 10 秒发送一次 TCP 保活
});
```

**主要权衡：**

- `maxRetriesPerRequest: null` + `retryStrategy` — 生产环境首选，这样 Redis 短暂重启不会立即导致每个请求失败。`checkRateLimit()` 中的内存回退机制会吸收失败路径。
- `lazyConnect: true` — 避免服务器在开始接受连接前必须依赖 Redis 已经启动。
- `enableAutoPipelining: true` — 减少并发速率限制检查的往返次数；在单个连接上达到 >50 RPS 时效果显著。

### 2. Redis 服务器配置（`redis.conf`）

```
# 内存
maxmemory 80%                        # 为操作系统页缓存留出空间
maxmemory-policy allkeys-lru         # 内存压力下驱逐过期的身份验证缓存条目

# 持久化（可选 — OmniRoute 即使没有持久化也能安全处理崩溃）
save 300 1                           # 如果至少有 1 个键发生变化，则每 5 分钟至少创建一次快照
appendonly no                        # 不需要 AOF；数据可以重新生成
appendfsync no                       # 无 fsync 开销（RDB 已足够）

# 网络
timeout 0                            # 不因空闲而断开连接
tcp-keepalive 300                    # 5 分钟 TCP 保活
tcp-backlog 511                      # 应对突发负载的连接积压队列

# 性能
hz 10                                # 默认值；对延迟敏感时设为 100
activedefrag yes                     # 碎片率 >10% 时自动进行碎片整理
```

**`maxmemory-policy allkeys-lru` 的权衡：** 身份验证缓存条目可能会在内存压力下被驱逐。这是安全的 — `setCachedApiKey` 在缓存未命中时始终会重新填充，SQLite 回退存储是权威数据源。速率限制器 Lua 脚本创建的键本身就很小且生命周期很短。

### 3. Docker Compose 设置

生产环境的 compose（`docker-compose.prod.yml`）使用 `redis:8.6.2-alpine`。添加：

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

### 4. 多实例 / 扩展注意事项

**所有副本使用同一个 Redis** — 速率限制器 Lua 脚本依赖单一的权威键空间。副本后配置多个 Redis 实例会破坏原子性并使配额加倍。所有应用副本应使用单个 Redis（或支持故障转移的 Redis Sentinel 集群）。

**连接数：** 每个应用副本会打开到 Redis 的 **2 个 TCP 连接**（速率限制器客户端 + 配额存储客户端）。10 个副本对应 20 个连接，远低于默认 Redis 实例的 10k 连接上限。

### 5. 监控

通过健康检查端点暴露：

```typescript
// src/app/api/monitoring/health/route.ts 已经调用 rateLimiter 函数
// 添加 Redis 专属检查：
//   1. 通过 ioredis .ping() 检查 PING 延迟
//   2. 通过 INFO memory 检查内存使用情况
//   3. 通过 INFO clients 检查连接数
//   4. 检查 maxmemory-policy 的命中率（evicted_keys / keyspace_hits）
```

需要关注的关键指标：

- **每秒驱逐的键数** — 如果持续非零，请增加 `maxmemory`
- **被阻塞的客户端** — 非零通常表示 Lua 脚本执行缓慢或竞争激烈
- **被拒绝的连接** — 已达到连接数限制；对于 20 个连接来说很少见

### 6. Redis 兼容服务器

此处使用的任何服务器都必须能够运行 Lua 脚本：速率限制器会执行一次 `EVAL`。在不支持 Lua 的服务器上，`checkRateLimit()` 会记录 `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting`，并按进程计数，因此每个副本会独立执行限制。选择启用的共享会话亲和性存储（`OMNIROUTE_SESSION_AFFINITY_STORE=redis`）也会通过 `EVAL` 读取和更新固定关系；不支持 Lua 时，它会记录 `[SESSION_AFFINITY] Redis error; falling back to SQLite.`，并且每个副本维护自己的固定关系。其他工作负载使用普通命令（`SET ... EX`、`GET`、`DEL`、`MGET`、`EXPIRE`、`INCRBYFLOAT`、哈希和集合），语义缓存的 Redis 后端不会发送任何 `FT.*` 命令。

已使用 OmniRoute 3.8.52 进行测试：KiviDB 1.2.0 及其 Lua 镜像（`kividb/kividb:v1.2.0-lua`）。速率限制器（包括共享计数器的第二个进程）、身份验证缓存、配额存储、预热断路器、语义缓存存储，以及通过聊天处理程序发送的 `/v1/chat/completions` 请求，通过了 Redis 8.10.3 上 19 项检查中的 18 项。唯一不同的是：`INCRBYFLOAT` 将 `0.1 + 0.2` 存储为 `0.30000000000000004`，而 Redis 存储为 `0.3`（[kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387)）。配额存储会使用 `parseFloat` 解析二者，但这两个数字在末位有所不同，因此恰好落在配额边界上的比较结果可能会不同。会话亲和性存储未包含在该次运行中。
（[设置](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md)，
[结果](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat)）

---

## 架构图

```mermaid
flowchart LR
    subgraph App["应用副本"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\n共享实例)]
    AK -- "复用 RL 的客户端" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\n配额存储)]
    R1 --> R2 -- "可以是同一实例" --> R1
```

---

## 参考资料

| 文件                               | 用途                                             |
| ---------------------------------- | ------------------------------------------------ |
| `src/shared/utils/rateLimiter.ts`  | 主要 Redis 客户端、Lua 限流脚本、内存回退机制    |
| `src/lib/db/apiKeys.ts`            | 身份验证缓存 — Redis→SQLite 回退                 |
| `src/lib/quota/redisQuotaStore.ts` | 用于可选配额存储的独立 Redis 客户端              |
| `src/lib/quota/storeFactory.ts`    | 在 `sqlite` 和 `redis` 配额驱动程序之间切换      |
| `docker-compose.prod.yml`          | 生产环境 Redis 容器（镜像 `redis:8.6.2-alpine`） |
| `.env.example`                     | Redis 环境变量文档                               |
| `src/app/api/local/redis/`         | 用于开发容器编排的 API 路由                      |
| `bin/cli/commands/redis.mjs`       | 用于开发容器编排的 CLI 命令                      |
