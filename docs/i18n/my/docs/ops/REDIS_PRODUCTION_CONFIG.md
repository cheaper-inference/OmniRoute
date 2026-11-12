# Redis Production Configuration Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## ခြုံငုံသုံးသပ်ချက်

Redis သည် တစ်ခုဖြစ်သည်။**ရွေးချယ်နိုင်သည်၊ ပျော့ပျောင်းသောမှီခိုမှု** OmniRoute — တွင် Redis မရရှိနိုင်သောအခါ အပလီကေးရှင်းသည် (မှတ်ဉာဏ်အတွင်း ကျဆင်းမှုများ) ကို ကောင်းမွန်စွာ ကျဆင်းစေသည်။ ထုတ်လုပ်မှုတွင်၊ ချိန်ညှိခြင်း Redis ထူးခြားသောအလုပ်ဝန်လေးခုအတွက် latency ကို လျှော့ချပေးသည်-

| အလုပ်ဝန်               | ဒရိုက်ဘာ                      | ဖောက်သည်စက်ရုံ                                   | သော့ပုံစံ                                                |
| ---------------------- | ----------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| နှုန်းကန့်သတ်ချက်      | `rateLimiter.ts`              | `getRedisClient()` — ပျင်းရိ `ioredis` singleton | `<prefix>rl:*` Lua-atomic rate ကန့်သတ်ချက် windows       |
| Auth cache             | `apiKeys.ts`                  | `rateLimiter`၏ client ကို ပြန်သုံးသည်။           | TTL ဖြင့်`<prefix>auth:api_key:<sha256>`                 |
| ခွဲတမ်းတိုး            | `redisQuotaStore.ts`          | သီးခြား `getRedisClient(url)` singleton          | `<prefix>quota:*` သာဓကတစ်ခုစီကို ပြင်ဆင်သတ်မှတ်နိုင်သည်။ |
| အပူပေး circuit breaker | `redisCircuitBreakerStore.ts` | `circuitBreakerFactory.ts` တွင် သီးခြားဖောက်သည်  | `<prefix>warmup:cb:<connectionId>`                       |

အလုပ်တာဝန် လေးခုစလုံးသည် Redis စံနမူနာတစ်ခုတည်းတွင် OmniRoute အခြားအက်ပ်များနှင့် အတူရှိနေနိုင်သည် (ဥပမာ `127.0.0.1:6379`)။ [Key Namespacing ကို](#key-namespacing) ကြည့်ပါ။

---

## လက်ရှိဖွဲ့စည်းပုံ (ကုဒ်မူရင်းများ)

| ဆက်တင်                          | တန်ဖိုး                                                     | ဘယ်မှာလဲ။                                                                             |
| ------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` env var             | `redis://redis:6379` (ရေးဖွဲ့)၊ စိတ်ကြိုက်ရွေးချယ်နိုင်သည်။ | `rateLimiter.ts:5`, `.env.example`                                                    |
| `REDIS_KEY_PREFIX` env var      | `omniroute:` (မူလ)                                          | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| `QUOTA_STORE_REDIS_URL` env var | သီးခြား၊ `REDIS_URL` နှင့်ကွဲပြားနိုင်သည်။                  | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`            | `"sqlite"` (မူလ)၊ `"redis"` ရွေးချယ်နိုင်သည်                | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`  | `3`                                                         | `rateLimiter.ts` သုံးစွဲသူ ဖန်တီးမှု                                                  |
| `enableReadyCheck`              | မသတ်မှတ်ထားပါ (ioredis မူရင်း- `true`)                      | —                                                                                     |
| `lazyConnect`                   | မသတ်မှတ်ထားပါ (ioredis မူရင်း- `false`)                     | —                                                                                     |
| `retryStrategy`                 | မသတ်မှတ်ထားပါ (ioredis မူရင်း- 200ms အခြေခံ၊ ထပ်ကိန်း)      | —                                                                                     |
| TLS / စကားဝှက် / DB အညွှန်း     | **ပြုပြင်မထားပါ။**                                          | —                                                                                     |
| Sentinel / Cluster              | **ပြုပြင်မထားပါ။** — standalone single-node သာ              | —                                                                                     |

---

## Key Namespacing

OmniRoute သည် host ပေါ်တွင် လည်ပတ်နေသည့် အခြားအရာများနှင့် Redis instance တစ်ခုကို မျှဝေသုံးစွဲသည်။ Namespace မရှိပါက
`auth:api_key:<sha256>` သို့မဟုတ် `rl:*` ကဲ့သို့သော key များသည် Redis တစ်ခုတည်းကို
အသုံးပြုနေသည့် အခြား application များ၏ key များနှင့် ထပ်တူကျနိုင်သည် (ဤ instance သည် အခြား service များနှင့်အတူ `127.0.0.1:6379` ပေါ်တွင် Redis ကို လည်ပတ်စေသည်)။

OmniRoute key **တိုင်း**၏ ရှေ့တွင် prefix ထည့်ရန် `REDIS_KEY_PREFIX` ကို အလွတ်မဟုတ်သော string တစ်ခုအဖြစ် သတ်မှတ်ပါ-

```bash
# .env — OmniRoute key အားလုံးသည် omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:* ဖြစ်လာမည်
REDIS_KEY_PREFIX=omniroute:
```

- **Default:** `omniroute:` (`REDIS_KEY_PREFIX` ကို မသတ်မှတ်ထားသည့်အခါ သို့မဟုတ် အလွတ်ဖြစ်သည့်အခါ အသုံးပြုသည်)။
- **အသုံးချသည့်နေရာများ:** rate limiter + auth cache (`keyPrefix` မှတစ်ဆင့် မျှဝေထားသော `ioredis` client)၊
  quota store (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) နှင့် warmup circuit breaker
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`)။
- Redis တွင် key များ ရှိပြီးသားဖြစ်နေချိန်၌ **prefix ကို ပြောင်းလဲခြင်း**သည် key အဟောင်းများကို အသုံးမပြုတော့သည့်အခြေအနေ ဖြစ်စေသည် (၎င်းတို့သည်
  TTL / LRU မှတစ်ဆင့် သက်တမ်းကုန်ဆုံးသည်)။ ပြောင်းလဲရန် ဘေးကင်းပြီး migration မလိုအပ်ပါ။ တစ်ခုတည်းသော ခြွင်းချက်မှာ forbidden အဖြစ် မှတ်သားထားသည့် connection တစ်ခုအတွက် warmup
  circuit-breaker key ဖြစ်သည်။ ၎င်းကို TTL မပါဘဲ အမြဲတမ်းသိမ်းဆည်းထားသောကြောင့်
  `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` ဖြင့် ကျန်ရှိနေသည့် key များကို စာရင်းပြုစုပြီး ဖျက်ပါ။
- **ioredis `keyPrefix`** သည် write လုပ်သည့်အခါ prefix ကို အလိုအလျောက် ရှေ့တွင် ထည့်ပေးပြီး read လုပ်သည့်အခါတွင်လည်း ၎င်းကို ဖယ်ရှားပေးသည်။
  ထို့ကြောင့် application code သည် prefix ကို မည်သည့်အခါမျှ မမြင်ရပါ။

---

## ထုတ်လုပ်မှု ချိန်ညှိခြင်းကို အကြံပြုထားသည်။

### 1. Connection Pool/Client Options (ioredis `Redis` constructor)

လက်ရှိကုဒ်သည် စိတ်ကြိုက်ရွေးချယ်စရာများမရှိဘဲ `new Redis(url)` တစ်ခုတည်းကို ဖန်တီးသည်။ ထုတ်လုပ်မှု ဘက်စုံပုံစံတူ အသုံးချမှုများအတွက်၊ ကုဒ်တွင် ဖောက်သည် စက်ရုံကို ဖြတ်သန်းပါ သို့မဟုတ် `getRedisClient()` ထုပ်ပိုးပါ-

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

**အဓိက အပေးအယူများ-**

- `maxRetriesPerRequest: null` + `retryStrategy` — ထုတ်လုပ်မှုအတွက် ဦးစားပေး ဖြစ်သောကြောင့် ယာယီ Redis ပြန်လည်စတင်ခြင်းသည် တောင်းဆိုမှုတိုင်းကို ချက်ချင်း မအောင်မြင်စေပါ။ `checkRateLimit()` ရှိ မမ်မိုရီအတွင်း ဆုတ်ယုတ်မှုသည် ကျရှုံးမှုလမ်းကြောင်းကို စုပ်ယူသည်။
- `lazyConnect: true` — ဆာဗာချိတ်ဆက်မှုများကို လက်ခံခြင်းမစမီ Redis တွင် စတင်ခြင်းအပေါ် မှီခိုမှုကို ရှောင်ရှားသည်။
- `enableAutoPipelining: true` — တစ်ပြိုင်တည်း နှုန်းကန့်သတ်ချက်စစ်ဆေးမှုများအတွက် အသွားအပြန်ခရီးများကို လျှော့ချပေးသည်။ ချိတ်ဆက်မှုတစ်ခုတည်းတွင် > 50 RPS တွင် အကျိုးရှိသည်။

### 2. Redis ဆာဗာပြင်ဆင်မှု (`redis.conf`)

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

**`maxmemory-policy allkeys-lru` အတွက် အပေးအယူ-** မှတ်ဉာဏ်ဖိအားအောက်တွင် Auth cache ထည့်သွင်းမှုများကို ဖယ်ရှားနိုင်သည်။ ၎င်းသည် အန္တရာယ်ကင်းသော — `setCachedApiKey` miss တွင် အမြဲတမ်းပြန်လည်ဖြည့်သွင်းနေပြီး SQLite သည် အတုအယောင်သည် တရားဝင်သည်။ Rate-limiter Lua script သည် ဒီဇိုင်းအားဖြင့် တိုတောင်းသော သော့ငယ်များကို ဖန်တီးပေးသည်။

### 3. Docker ဆက်တင်များကို ရေးပါ။

prod compose (`docker-compose.prod.yml`) သည် `redis:8.6.2-alpine` အသုံးပြုသည်။ ထည့်ရန်-

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

### 4. Multi-Instance/Scaling ထည့်သွင်းစဉ်းစားမှုများ

**ပုံတူအားလုံးအတွက် Redis တစ်ခုတည်း** — Lua script နှုန်းကန့်သတ်ချက်သည် တရားဝင်သော့နေရာတစ်ခုပေါ်တွင် မူတည်သည်။ ပုံတူများနောက်ကွယ်ရှိ Redis ဖြစ်ရပ်များစွာသည် အနုမြူစွမ်းအားကို ဆုံးရှုံးစေပြီး ဘတ်ဂျက်၏နှစ်ဆဖြစ်သည်။ အပလီကေးရှင်းပုံတူများအားလုံးအတွက် Redis (သို့မဟုတ် Redis Sentinel အစုအဝေးတစ်ခုမှ ပျက်ကွက်ခြင်း) ကို အသုံးပြုပါ။

**ချိတ်ဆက်မှုအရေအတွက်-** အပလီကေးရှင်းပုံတူတစ်ခုစီကို ဖွင့်သည်။**2 TCP ချိတ်ဆက်မှုများ** Redis (နှုန်းကန့်သတ်ထားသော ဖောက်သည် + ခွဲတမ်းစတိုးဆိုင်ကလိုင်းယင့်)။ ပုံတူ → 20 ချိတ်ဆက်မှု 10 ခုတွင်၊ မူရင်း Redis instance ၏ 10k ချိတ်ဆက်မှုမျက်နှာကျက်တွင် ကောင်းမွန်စွာ။

### 5. စောင့်ကြည့်လေ့လာခြင်း။

ကျန်းမာရေးစစ်ဆေးမှု အဆုံးမှတ်မှတစ်ဆင့် ဖော်ထုတ်ပါ-

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

ကြည့်ရှုရန် အဓိက မက်ထရစ်များ

- **နှင်ထုတ်ခံရသောသော့များ / စက္ကန့်** — သုညမဟုတ်ပါက၊ `maxmemory` တိုးပါ။
- **ပိတ်ထားသော ဖောက်သည်များ** — နှေးကွေးသော Lua scripts သို့မဟုတ် မြင့်မားသော အငြင်းပွားမှုကို အကြံပြုသည်။
- **ချိတ်ဆက်မှုများကို ငြင်းပယ်ခဲ့သည်။** — ချိတ်ဆက်မှုကန့်သတ်ချက်ထိမှန်; ချိတ်ဆက်မှု 20 တွင်ရှားပါးသည်။

### 6. Redis-လိုက်ဖက်သောဆာဗာများ

ဤနေရာတွင် အသုံးပြုသည့် ဆာဗာတိုင်းသည် Lua scripts များကို လုပ်ဆောင်ရပါမည်- နှုန်းကန့်သတ်ချက်မှာ `EVAL` တစ်ခုဖြစ်သည်။ Lua မရှိသောဆာဗာတွင် `checkRateLimit()` `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` မှတ်တမ်းများကို မှတ်တမ်းတင်ပြီး လုပ်ငန်းစဉ်တစ်ခုစီကို ရေတွက်ပေးသောကြောင့် ပုံတူတစ်ခုစီသည် ကန့်သတ်ချက်ကို ၎င်း၏ကိုယ်ပိုင်အဖြစ် ပြဌာန်းထားသည်။ မျှဝေထားသော session-affinity စတိုး (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) သည် `EVAL` ဖြင့် ပင်နံပါတ်များကို ဖတ်ပြီး အပ်ဒိတ်လုပ်ပါသည်။ Lua မပါဘဲ ၎င်းသည် `[SESSION_AFFINITY] Redis error; falling back to SQLite.` မှတ်တမ်းရှိပြီး ပုံတူတစ်ခုစီသည် ၎င်း၏ကိုယ်ပိုင် pin များကို သိမ်းဆည်းထားသည်။ အခြားအလုပ်ဝန်များသည် ရိုးရှင်းသောအမိန့်များ (`SET ... EX`၊ `GET`၊ `DEL`၊ `MGET`၊ `EXPIRE`၊ `INCRBYFLOAT`၊ hashes နှင့် sets ) ကိုအသုံးပြုပြီး semantic cache ၏ Redis နောက်ကွယ်တွင် `FT.*` ညွှန်ကြားချက်များကို မပို့ပါ။

OmniRoute 3.8.52 ဖြင့် စမ်းသပ်ထားသည်- KiviDB 1.2.0 ကို ၎င်း၏ Lua ပုံ (`kividb/kividb:v1.2.0-lua`) ဖြင့် စမ်းသပ်ထားသည်။ နှုန်းကန့်သတ်ချက် (ကောင်တာများကိုမျှဝေသည့်ဒုတိယလုပ်ငန်းစဉ်အပါအဝင်)၊ auth cache၊ ခွဲတမ်းစတိုး၊ warmup circuit breaker၊ semantic cache စတိုးနှင့် `/v1/chat/completions` တောင်းဆိုချက်သည် Redis 8.10.3 ပေါ်တွင်ဖြတ်သန်းသည့် စစ်ဆေးမှု 19 ခုအနက် 18 ခုကျော်သွားပါသည်။ ကွဲပြားသည်- `INCRBYFLOAT` သည် `0.1 + 0.2` `0.30000000000000004` အဖြစ် Redis သိမ်းဆည်းသည့်နေရာတွင် `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) )။ ခွဲတမ်းစတိုးသည် နှစ်ခုလုံးကို `parseFloat` ဖြင့် ခွဲခြမ်းစိပ်ဖြာသည်၊ သို့သော် ဂဏန်းနှစ်လုံးသည် နောက်ဆုံးဂဏန်းများတွင် ကွဲပြားသည်၊ ထို့ကြောင့် ခွဲတမ်းနယ်နိမိတ်ပေါ်တွင် အတိအကျကျရောက်သော နှိုင်းယှဉ်ချက်သည် ကွဲပြားနိုင်သည်။ session-affinity store သည် ထိုလည်ပတ်မှု၏အစိတ်အပိုင်းမဟုတ်ပါ။ ( [တပ်ဆင်မှု](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md) ၊ [ရလဒ်များ](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## ဗိသုကာပုံကြမ်း

```mermaid
flowchart LR
    subgraph App["အက်ပ်မိတ္တူ"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nမျှဝေသုံး)]
    AK -- "RL ၏ client ကို ပြန်လည်အသုံးပြုသည်" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nquota သိုလှောင်မှု)]
    R1 --> R2 -- "တူညီသော instance ဖြစ်နိုင်သည်" --> R1
```

---

## ကိုးကား

| ဖို                                | ရည်ရွယ်ချက်                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | မူလ Redis ကလိုင်းယင့်၊ Lua နှုန်းကန့်သတ်ထားသော ဇာတ်ညွှန်း၊ မန်မိုရီအတွင်း လှည့်ပြန်မှု |
| `src/lib/db/apiKeys.ts`            | Auth cache — Redis→SQLite အတုအယောင်                                                    |
| `src/lib/quota/redisQuotaStore.ts` | ရွေးချယ်နိုင်သော ခွဲတမ်းစတိုးအတွက် Redis ဖောက်သည်ကို ခွဲခြားပါ။                        |
| `src/lib/quota/storeFactory.ts`    | `sqlite` နှင့် `redis` ခွဲတမ်းဒရိုင်ဘာများအကြား ပြောင်းသည်။                            |
| `docker-compose.prod.yml`          | ထုတ်ကုန် Redis ကွန်တိန်နာ (ပုံ `redis:8.6.2-alpine`)                                   |
| `.env.example`                     | Redis env vars စာတမ်းပြုစုခြင်း။                                                       |
| `src/app/api/local/redis/`         | Develop container orchestration အတွက်API လမ်းကြောင်းများ                               |
| `bin/cli/commands/redis.mjs`       | dev container orchestration အတွက်CLI ညွှန်ကြားချက်များ                                 |
