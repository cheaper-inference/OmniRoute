# Redis Production Configuration Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## ទិដ្ឋភាពទូទៅ

Redis គឺជា **dependency ជាជម្រើស និងមិនតឹងរឹង** នៅក្នុង OmniRoute — កម្មវិធីនឹងបន្តដំណើរការដោយបន្ថយសមត្ថភាពយ៉ាងរលូន (ប្រើជម្រើសជំនួសក្នុងអង្គចងចាំ)
នៅពេល Redis មិនអាចប្រើបាន។ នៅក្នុងបរិស្ថាន production ការកែតម្រូវ Redis ឱ្យសមស្របជួយកាត់បន្ថយ latency សម្រាប់ workload បួនប្រភេទផ្សេងគ្នា៖

| Workload                              | Driver                        | Client Factory                                      | ទម្រង់ Key                                                          |
| ------------------------------------- | ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| ការកំណត់អត្រា                         | `rateLimiter.ts`              | `getRedisClient()` — `ioredis` singleton បែប lazy   | `<prefix>rl:*` ចន្លោះពេលកំណត់អត្រាបែប Lua‑atomic                    |
| ឃ្លាំងសម្ងាត់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ | `apiKeys.ts`                  | ប្រើ client របស់ `rateLimiter` ឡើងវិញ               | `<prefix>auth:api_key:<sha256>` ជាមួយ TTL                           |
| កន្លែងផ្ទុកកូតា                       | `redisQuotaStore.ts`          | `getRedisClient(url)` singleton ដាច់ដោយឡែក          | `<prefix>quota:*` ដែលអាចកំណត់រចនាសម្ព័ន្ធបានសម្រាប់ instance នីមួយៗ |
| Circuit breaker សម្រាប់ warmup        | `redisCircuitBreakerStore.ts` | Client ដាច់ដោយឡែកនៅក្នុង `circuitBreakerFactory.ts` | `<prefix>warmup:cb:<connectionId>`                                  |

Workload ទាំងបួនប្រើ prefix របស់ namespace តែមួយ ដើម្បីឱ្យ OmniRoute អាចដំណើរការរួមជាមួយកម្មវិធីផ្សេងទៀតនៅលើ
Redis instance តែមួយ (ឧ. `127.0.0.1:6379`)។ សូមមើល [ការបែងចែក Namespace សម្រាប់ Key](#key-namespacing)។

---

## ការកំណត់រចនាសម្ព័ន្ធបច្ចុប្បន្ន (តម្លៃលំនាំដើមក្នុងកូដ)

| ការកំណត់                             | តម្លៃ                                                                           | ទីតាំង                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| អថេរបរិស្ថាន `REDIS_URL`             | `redis://redis:6379` (compose), ជាជម្រើស                                        | `rateLimiter.ts:5`, `.env.example`                                                    |
| អថេរបរិស្ថាន `REDIS_KEY_PREFIX`      | `omniroute:` (លំនាំដើម)                                                         | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| អថេរបរិស្ថាន `QUOTA_STORE_REDIS_URL` | ដាច់ដោយឡែក និងអាចខុសពី `REDIS_URL`                                              | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`                 | `"sqlite"` (លំនាំដើម), `"redis"` ជាជម្រើស                                       | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`       | `3`                                                                             | ការបង្កើត client នៅក្នុង `rateLimiter.ts`                                             |
| `enableReadyCheck`                   | មិនបានកំណត់ (លំនាំដើមរបស់ ioredis៖ `true`)                                      | —                                                                                     |
| `lazyConnect`                        | មិនបានកំណត់ (លំនាំដើមរបស់ ioredis៖ `false`)                                     | —                                                                                     |
| `retryStrategy`                      | មិនបានកំណត់ (លំនាំដើមរបស់ ioredis៖ មូលដ្ឋាន 200ms និងកើនឡើងតាមអិចស្ប៉ូណង់ស្យែល) | —                                                                                     |
| TLS / ពាក្យសម្ងាត់ / DB index        | **មិនបានកំណត់រចនាសម្ព័ន្ធ**                                                     | —                                                                                     |
| Sentinel / Cluster                   | **មិនបានកំណត់រចនាសម្ព័ន្ធ** — គាំទ្រតែ standalone single-node ប៉ុណ្ណោះ          | —                                                                                     |

---

## ការបែងចែក Namespace សម្រាប់ Key

OmniRoute ប្រើ Redis instance រួមជាមួយអ្វីផ្សេងទៀតដែលដំណើរការលើ host។ បើគ្មាន namespace ទេ
key ដូចជា `auth:api_key:<sha256>` ឬ `rl:*` អាចប៉ះទង្គិចជាមួយ key ពីកម្មវិធីផ្សេងទៀត
ដែលប្រើ Redis ដូចគ្នា (instance នេះដំណើរការ Redis នៅលើ `127.0.0.1:6379` រួមជាមួយ service ផ្សេងទៀត)។

កំណត់ `REDIS_KEY_PREFIX` ជា string ដែលមិនទទេ ដើម្បីបន្ថែម prefix ទៅខាងមុខ key **ទាំងអស់** របស់ OmniRoute៖

```bash
# .env — key ទាំងអស់របស់ OmniRoute ក្លាយជា omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **លំនាំដើម៖** `omniroute:` (ត្រូវបានអនុវត្តនៅពេល `REDIS_KEY_PREFIX` មិនបានកំណត់ ឬទទេ)។
- **អនុវត្តចំពោះ៖** rate limiter + auth cache (ប្រើ `ioredis` client រួមគ្នាតាមរយៈ `keyPrefix`) និង
  quota store (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) ព្រមទាំង warmup circuit breaker
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`)។
- **ការផ្លាស់ប្តូរ prefix** នៅពេលមាន key រួចហើយក្នុង Redis នឹងធ្វើឱ្យ key ចាស់ៗលែងត្រូវបានយោង (ពួកវានឹងផុតកំណត់
  តាមរយៈ TTL / LRU)។ អាចផ្លាស់ប្តូរបានដោយសុវត្ថិភាព ហើយមិនចាំបាច់ធ្វើ migration ទេ។ ករណីលើកលែងតែមួយគត់គឺ key របស់ warmup
  circuit-breaker សម្រាប់ connection ដែលបានសម្គាល់ថា forbidden៖ វាត្រូវបានរក្សាទុកដោយគ្មាន TTL ដូច្នេះ
  សូមរាយបញ្ជី key ដែលនៅសេសសល់ដោយប្រើ `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` ហើយលុបពួកវា។
- **`keyPrefix` របស់ ioredis** បន្ថែម prefix ទៅខាងមុខដោយស្វ័យប្រវត្តិពេលសរសេរ **និង** ដកវាចេញពេលអាន
  ដូច្នេះកូដកម្មវិធីមិនឃើញ prefix ឡើយ។

---

## ការលៃតម្រូវផលិតកម្មដែលបានណែនាំ

### 1. Connection Pool/Client Options (ioredis `Redis` constructor)

លេខកូដបច្ចុប្បន្នបង្កើត `new Redis(url)` តែមួយដោយគ្មានជម្រើសផ្ទាល់ខ្លួន។ សម្រាប់ការដាក់ពង្រាយការចម្លងច្រើនផលិតកម្ម សូមឆ្លងកាត់រោងចក្រអតិថិជនក្នុងកូដ ឬរុំ `getRedisClient()`៖

```typescript
const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null, // no retry limit; let retryStrategy decide
  enableReadyCheck: true, // verify server is ready before accepting calls
  lazyConnect: true, // don't connect on construction; wait for first call
  retryStrategy: (times) => {
    if (times > 10) return null; // give up after 10 retries → reconnect later
    return Math.min(times * 200, 5000); // 200ms, 400ms, …, 5s cap
  },
  enableAutoPipelining: true, // coalesce concurrent commands into one TCP write
  keepAlive: 10000, // TCP keep‑alive every 10s
});
```

**ការដោះដូរសំខាន់ៗ៖**

- `maxRetriesPerRequest: null` + `retryStrategy` — ពេញចិត្តសម្រាប់ផលិតកម្ម ដូច្នេះការចាប់ផ្ដើម Redis បណ្តោះអាសន្នមិនបរាជ័យភ្លាមៗរាល់សំណើ។ ការធ្លាក់ចុះនៅក្នុងសតិនៅក្នុង `checkRateLimit()` ស្រូបយកផ្លូវបរាជ័យ។
- `lazyConnect: true` — ជៀសវាងការពឹងផ្អែកនៃការចាប់ផ្តើមនៅលើ Redis មុនពេលដែលម៉ាស៊ីនមេចាប់ផ្តើមទទួលយកការតភ្ជាប់។
- `enableAutoPipelining: true` — កាត់បន្ថយការធ្វើដំណើរទៅមកសម្រាប់ការត្រួតពិនិត្យដែនកំណត់អត្រាស្របគ្នា។ អត្ថប្រយោជន៍នៅ > 50 RPS នៅលើការតភ្ជាប់តែមួយ។

### 2. ការកំណត់រចនាសម្ព័ន្ធម៉ាស៊ីន Redis (`redis.conf`)

```
# Memory
maxmemory 80%                        # leave room for OS page cache
maxmemory-policy allkeys-lru         # evict stale auth cache entries under pressure

# Persistence (optional — OmniRoute is crash‑safe without it)
save 300 1                           # snapshot at least every 5 min if ≥1 key changed
appendonly no                        # AOF not needed; data is regeneratable
appendfsync no                       # no fsync overhead (RDB is sufficient)

# Networking
timeout 0                            # no idle disconnect
tcp-keepalive 300                    # 5 min keep‑alive
tcp-backlog 511                      # connection backlog for bursty load

# Performance
hz 10                                # default; 100 for latency‑sensitive
activedefrag yes                     # auto‑defragment when fragmentation >10%
```

**ការដោះដូរសម្រាប់ `maxmemory-policy allkeys-lru`:** ធាតុឃ្លាំងសម្ងាត់អាចត្រូវបានបណ្តេញចេញក្រោមសម្ពាធនៃអង្គចងចាំ។ នេះគឺមានសុវត្ថិភាព — `setCachedApiKey` តែងតែបង្ហាញសារជាថ្មីនៅលើការខកខាន ហើយ SQLite fallback គឺជាការអនុញ្ញាត។ ស្គ្រីប Lua កំណត់អត្រាការប្រាក់បង្កើតកូនសោតូចៗដែលប្រើរយៈពេលខ្លីតាមការរចនា។

### 3. Docker តែងការកំណត់

ការតែងផលិតផល (`docker-compose.prod.yml`) ប្រើ `redis:8.6.2-alpine`។ បន្ថែម៖

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

### 4. Multi-Instance/Scaling Considerations

**Redis តែមួយសម្រាប់ការចម្លងទាំងអស់។** — ស្គ្រីប Lua កំណត់អត្រាការប្រាក់អាស្រ័យលើចន្លោះគន្លឹះអនុញ្ញាតតែមួយ។ ករណី Redis ជាច្រើននៅពីក្រោយការចម្លងនឹងបាត់បង់អាតូមិច និងបង្កើនថវិកាទ្វេដង។ ប្រើ Redis តែមួយ (ឬ Redis Sentinel cluster with failover) សម្រាប់ការចម្លងកម្មវិធីទាំងអស់។

**ចំនួននៃការតភ្ជាប់៖** ការចម្លងកម្មវិធីនីមួយៗបើក** 2 ការតភ្ជាប់ TCP** ទៅ Redis (អត្រា limiter client + quota store client)។ នៅការតភ្ជាប់ → 20 ចម្លងចំនួន 10 ល្អនៅក្នុងពិដានការតភ្ជាប់ 10k របស់ Redis លំនាំដើម។

### 5. ការត្រួតពិនិត្យ

បង្ហាញតាមរយៈចំណុចពិនិត្យសុខភាព៖

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

សូចនាករសំខាន់ៗដែលត្រូវមើល៖

- **គ្រាប់ចុចបណ្តេញចេញ / វិ** — ប្រសិនបើមិនជាប់សូន្យ បង្កើន `maxmemory`
- **អតិថិជនដែលបានទប់ស្កាត់** — non-zero ណែនាំស្គ្រីប Lua យឺត ឬជម្លោះខ្ពស់។
- **ការតភ្ជាប់ដែលបានបដិសេធ** ដែនកំណត់ការតភ្ជាប់ — បុក; កម្រមាន 20 ការតភ្ជាប់

### 6. ម៉ាស៊ីនមេដែលត្រូវគ្នានឹង Redis

ម៉ាស៊ីនមេណាមួយដែលប្រើនៅទីនេះត្រូវតែដំណើរការស្គ្រីប Lua៖ ការកំណត់អត្រាគឺមួយ `EVAL`។ នៅលើម៉ាស៊ីនមេដោយគ្មាន Lua `checkRateLimit()` កត់ត្រា `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` និងរាប់ក្នុងមួយដំណើរការ ដូច្នេះការចម្លងនីមួយៗអនុវត្តដែនកំណត់ដោយខ្លួនឯង។ ហាងដែលជ្រើសរើសចូលចែករំលែក session-affinity store (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) ក៏អាន និងធ្វើបច្ចុប្បន្នភាពម្ជុលជាមួយ `EVAL`; ដោយគ្មាន Lua វាកត់ត្រា `[SESSION_AFFINITY] Redis error; falling back to SQLite.` ហើយការចម្លងនីមួយៗរក្សាម្ជុលផ្ទាល់ខ្លួន។ បន្ទុកការងារផ្សេងទៀតប្រើពាក្យបញ្ជាធម្មតា (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashes និង sets) ហើយផ្នែកខាងក្រោយ Redis របស់ semantic cache មិនផ្ញើពាក្យបញ្ជា `FT.*` ទេ។

សាកល្បងជាមួយ OmniRoute 3.8.52: KiviDB 1.2.0 ជាមួយនឹងរូបភាព Lua របស់វា (`kividb/kividb:v1.2.0-lua`) ។ ការកំណត់អត្រាការប្រាក់ (រួមទាំងដំណើរការទីពីរដែលចែករំលែកបញ្ជរ) ឃ្លាំងសម្ងាត់ ឃ្លាំងសម្ងាត់ ហាងលក់កូតា ឧបករណ៍បំបែកសៀគ្វីកម្ដៅ ឃ្លាំងផ្ទុកទិន្នន័យ និងសំណើ `/v1/chat/completions` តាមរយៈអ្នកដោះស្រាយការជជែកបានឆ្លងកាត់ការត្រួតពិនិត្យចំនួន 18 នៃ 19 ដែលឆ្លងកាត់ Redis 8.10.3 ។ មួយដែលខុសគ្នា៖ `INCRBYFLOAT` រក្សាទុក `0.1 + 0.2` ជា `0.30000000000000004` ដែល Redis រក្សាទុក `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ) ។ ហាងកូតាញែកទាំងពីរជាមួយ `parseFloat` ប៉ុន្តែលេខទាំងពីរខុសគ្នាក្នុងខ្ទង់ចុងក្រោយ ដូច្នេះការប្រៀបធៀបដែលស្ថិតនៅលើព្រំដែនកូតាអាចចេញមកខុសគ្នា។ ហាង Session-affinity មិនមែនជាផ្នែកនៃការដំណើរការនោះទេ។ ( [ការកំណត់](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [លទ្ធផល](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## ដ្យាក្រាមស្ថាបត្យកម្ម

```mermaid
flowchart LR
    subgraph App["ច្បាប់ចម្លង App"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nរួម)]
    AK -- "ប្រើ client របស់ RL ឡើងវិញ" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nឃ្លាំងកូតា)]
    R1 --> R2 -- "អាចជា instance តែមួយ" --> R1
```

---

## ឯកសារយោង

| ឯកសារ                              | គោលបំណង                                                               |
| ---------------------------------- | --------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Redis client ចម្បង, ស្គ្រីបកំណត់អត្រា Lua និង fallback ក្នុងអង្គចងចាំ |
| `src/lib/db/apiKeys.ts`            | ឃ្លាំងសម្ងាត់សម្រាប់ការផ្ទៀងផ្ទាត់ — fallback ពី Redis→SQLite         |
| `src/lib/quota/redisQuotaStore.ts` | Redis client ដាច់ដោយឡែកសម្រាប់ឃ្លាំងកូតាជាជម្រើស                      |
| `src/lib/quota/storeFactory.ts`    | ប្ដូររវាង driver កូតា `sqlite` និង `redis`                            |
| `docker-compose.prod.yml`          | កុងតឺន័រ Redis សម្រាប់បរិស្ថានផលិតកម្ម (image `redis:8.6.2-alpine`)   |
| `.env.example`                     | ឯកសារពន្យល់អំពីអថេរបរិស្ថាន Redis                                     |
| `src/app/api/local/redis/`         | API routes សម្រាប់ការរៀបចំ និងគ្រប់គ្រងកុងតឺន័រអភិវឌ្ឍន៍              |
| `bin/cli/commands/redis.mjs`       | ពាក្យបញ្ជា CLI សម្រាប់ការរៀបចំ និងគ្រប់គ្រងកុងតឺន័រអភិវឌ្ឍន៍          |
