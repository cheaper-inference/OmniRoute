# Redis Production Configuration Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Àyẹ̀wò Gbogbogbò

Redis jẹ́ **ìgbẹ́kẹ̀lé àṣàyàn tí kò fi dandan múlẹ̀** nínú OmniRoute — ohun èlò náà ń tẹ̀síwájú láìsí ìṣòro tó pọ̀ (nípa lílo àwọn
àṣàyàn ìpadàsí inú ìrántí) nígbà tí Redis kò bá sí. Nínú production, ṣíṣe àtúnṣe Redis máa ń dín ìdádúró kù fún àwọn
ẹrù iṣẹ́ mẹ́rin ọ̀tọ̀ọ̀tọ̀:

| Ẹrù Iṣẹ́                | Driver                        | Ilé-iṣẹ́ Client                                                                 | Àpẹẹrẹ Key                                          |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| Ìdíwọ̀n oṣùwọ̀n          | `rateLimiter.ts`              | `getRedisClient()` — singleton `ioredis` aláìṣiṣẹ́ títí di ìgbà tí a bá nílò rẹ̀ | `<prefix>rl:*` àwọn fèrèsé ìdíwọ̀n oṣùwọ̀n Lua‑atomic |
| Cache ìfàṣẹsí          | `apiKeys.ts`                  | Tún ń lo client `rateLimiter`                                                  | `<prefix>auth:api_key:<sha256>` pẹ̀lú TTL            |
| Ibi ìpamọ́ quota        | `redisQuotaStore.ts`          | Singleton `getRedisClient(url)` ọ̀tọ̀                                            | `<prefix>quota:*` tí a lè ṣètò fún instance kọ̀ọ̀kan  |
| Circuit breaker warmup | `redisCircuitBreakerStore.ts` | Client ọ̀tọ̀ nínú `circuitBreakerFactory.ts`                                     | `<prefix>warmup:cb:<connectionId>`                  |

Gbogbo ẹrù iṣẹ́ mẹ́rẹ̀ẹ̀rin ń pín prefix namespace kan náà kí OmniRoute lè ṣiṣẹ́ pọ̀ pẹ̀lú àwọn app mìíràn lórí
instance Redis kan ṣoṣo (fún àpẹẹrẹ `127.0.0.1:6379`). Wo [Ṣíṣe Namespace fún Àwọn Key](#key-namespacing).

---

## Ìṣètò Lọ́wọ́lọ́wọ́ (Àwọn Àìyípadà Code)

| Ètò                               | Iye                                                                      | Ibi                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| env var `REDIS_URL`               | `redis://redis:6379` (compose), àṣàyàn                                   | `rateLimiter.ts:5`, `.env.example`                                                    |
| env var `REDIS_KEY_PREFIX`        | `omniroute:` (àìyípadà)                                                  | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| env var `QUOTA_STORE_REDIS_URL`   | ọ̀tọ̀, ó lè yàtọ̀ sí `REDIS_URL`                                            | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`              | `"sqlite"` (àìyípadà), `"redis"` jẹ́ àṣàyàn                               | `quota/storeFactory.ts`                                                               |
| `maxRetriesPerRequest` ti ioredis | `3`                                                                      | ṣíṣẹ̀dá client nínú `rateLimiter.ts`                                                   |
| `enableReadyCheck`                | a kò ṣètò rẹ̀ (àìyípadà ioredis: `true`)                                  | —                                                                                     |
| `lazyConnect`                     | a kò ṣètò rẹ̀ (àìyípadà ioredis: `false`)                                 | —                                                                                     |
| `retryStrategy`                   | a kò ṣètò rẹ̀ (àìyípadà ioredis: ìpìlẹ̀ 200ms, ń pọ̀ sí i lọ́nà exponential) | —                                                                                     |
| TLS / password / atọ́ka DB         | **a kò ṣètò wọn**                                                        | —                                                                                     |
| Sentinel / Cluster                | **a kò ṣètò wọn** — standalone olójú-òpó kan ṣoṣo nìkan                  | —                                                                                     |

---

## Ṣíṣe Namespace fún Àwọn Key

OmniRoute ń pín instance Redis kan pẹ̀lú ohunkóhun mìíràn tó ń ṣiṣẹ́ lórí host náà. Láìsí namespace,
àwọn key bíi `auth:api_key:<sha256>` tàbí `rl:*` lè bá àwọn key láti inú àwọn ohun èlò mìíràn
tó ń lo Redis kan náà kọlu ara wọn (instance yìí ń ṣiṣẹ́ Redis lórí `127.0.0.1:6379` lẹ́gbẹ̀ẹ́ àwọn iṣẹ́ mìíràn).

Ṣètò `REDIS_KEY_PREFIX` sí ọ̀rọ̀ tí kò ṣófo láti fi prefix sí **gbogbo** key OmniRoute:

```bash
# .env — gbogbo key OmniRoute di omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **Àìyípadà:** `omniroute:` (a máa lò ó nígbà tí `REDIS_KEY_PREFIX` kò bá ṣètò tàbí tí ó ṣófo).
- **A lò ó sí:** rate limiter + cache ìfàṣẹsí (client `ioredis` tí wọ́n ń pín nípasẹ̀ `keyPrefix`) àti
  ibi ìpamọ́ quota (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) àti circuit breaker warmup
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Yíyí prefix padà** nígbà tí àwọn key ti wà tẹ́lẹ̀ nínú Redis máa ń sọ àwọn key àtijọ́ di aláìní olùtọ́jú (wọ́n máa ń parí
  nípasẹ̀ TTL / LRU). Ó ní ààbò láti yí i padà; kò nílò migration. Ìyàtọ̀ kan ṣoṣo ni key
  circuit-breaker warmup fún connection tí a sàmì sí gẹ́gẹ́ bí èyí tí a fi dè: a fi í pamọ́ láìsí TTL, nítorí náà
  ṣàkójọ àwọn tó ṣẹ́kù pẹ̀lú `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` kí o sì pa wọ́n rẹ́.
- **`keyPrefix` ioredis** máa ń fi prefix sí iwájú láìfọwọ́sí nígbà ìkọ̀wé, ó sì máa ń yọ ọ́ kúrò nígbà kíkà,
  nítorí náà code ohun èlò kò ní rí prefix náà láéláé.

---

## Niyanju Production Tuning

### 1. Pool Asopọmọra / Awọn aṣayan Onibara (ioredis `Redis` Constructor)

Koodu lọwọlọwọ ṣẹda `new Redis(url)` ẹyọkan laisi awọn aṣayan aṣa. Fun iṣelọpọ awọn imuṣiṣẹ olona-ajọra, kọja ile-iṣẹ alabara kan ninu koodu tabi fi ipari si `getRedisClient()`:

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

**Awọn iṣowo bọtini:**

- `maxRetriesPerRequest: null` + `retryStrategy` — fẹ fun iṣelọpọ nitoribẹẹ awọn atunbere Redis igba diẹ maṣe kuna lẹsẹkẹsẹ gbogbo ibeere. Ipadabọ-iranti ni `checkRateLimit()` fa ọna ikuna naa.
- `lazyConnect: true` — yago fun igbẹkẹle ibẹrẹ lori Redis ti o wa ni oke ṣaaju ki olupin bẹrẹ gbigba awọn asopọ.
- `enableAutoPipelining: true` — dinku awọn irin-ajo-yika fun awọn sọwedowo iye-iye nigbakanna; anfani ni > 50 RPS lori kan nikan asopọ.

### 2. Iṣeto olupin Redis (`redis.conf`)

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

**Iṣowo fun `maxmemory-policy allkeys-lru`:** Awọn titẹ sii kaṣe ijẹrisi le jẹ jade labẹ titẹ iranti. Eyi jẹ ailewu — `setCachedApiKey` nigbagbogbo tun gbejade lori miss, ati pe SQLite fallback jẹ aṣẹ. Iwe afọwọkọ Lua opin-oṣuwọn ṣẹda awọn bọtini kekere ti o jẹ igba diẹ nipasẹ apẹrẹ.

### 3. Docker Ṣajọ Eto

Awọn prod compose (`docker-compose.prod.yml`) nlo `redis:8.6.2-alpine`. Fi kun:

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

### 4. Awọn Apeere Olona-Apeere / Iwọn Iwọn

**Nikan Redis fun gbogbo awọn ẹda** — oṣuwọn-ipin iwe afọwọkọ Lua da lori aaye bọtini alaṣẹ ẹyọkan. Awọn iṣẹlẹ Redis pupọ lẹhin awọn ẹda yoo padanu atomity ati ilọpo meji isuna. Lo Redis ẹyọkan (tabi iṣupọ Sentinel Redis pẹlu ikuna) fun gbogbo awọn ẹda ohun elo.

**Iwọn asopọ:** Ajọra ohun elo kọọkan ṣii** 2 TCP awọn isopọ** to Redis (oṣuwọn limiter klient + ktaa itaja ni ose). Ni 10 replicas → 20 awọn isopọ, daradara laarin a aiyipada Redis apeere ká 10k asopọ aja.

### 5. Abojuto

Fihan nipasẹ aaye ipari ayẹwo ilera:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Awọn metiriki bọtini lati wo:

- **Awọn bọtini ti a yọ kuro / iṣẹju-aaya** — ti o ba jẹ pe kii ṣe odo, pọ si `maxmemory`
- **Dina onibara** — ti kii-odo ni imọran awọn iwe afọwọkọ Lua ti o lọra tabi ariyanjiyan giga
- **Kọ awọn asopọ** — to buruju; toje ni 20 awọn isopọ

### 6. Redis-ibaramu Servers

Olupin eyikeyi ti a lo nibi gbọdọ ṣiṣe awọn iwe afọwọkọ Lua: opin oṣuwọn jẹ ọkan `EVAL`. Lori olupin laisi Lua, `checkRateLimit()` ṣe igbasilẹ `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` ati iṣiro fun ilana kan, nitorinaa ẹda kọọkan ṣe imudara opin lori tirẹ. Ile-itaja ifaramọ igba pinpin (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) tun ka ati ṣe imudojuiwọn awọn pinni pẹlu `EVAL`; laisi Lua o ṣe igbasilẹ `[SESSION_AFFINITY] Redis error; falling back to SQLite.` ati ẹda kọọkan tọju awọn pinni tirẹ. Awọn ẹru iṣẹ miiran lo awọn aṣẹ lasan (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashes ati ṣeto), ati pe ẹyìn Redis kaṣe atunmọ ko firanṣẹ awọn aṣẹ `FT.*`.

Idanwo pẹlu OmniRoute 3.8.52: KiviDB 1.2.0 pẹlu aworan Lua rẹ (`kividb/kividb:v1.2.0-lua`). Idiwọn oṣuwọn (pẹlu ilana keji pinpin awọn onka), kaṣe auth, ibi-itaja ipin, fifọ Circuit warmup, ile itaja kaṣe atunmọ, ati ibeere `/v1/chat/completions` nipasẹ olutọju iwiregbe kọja 18 ti awọn sọwedowo 19 ti o kọja lori Redis 8.10.3. Eyi ti o yato si: `INCRBYFLOAT` awọn ile itaja `0.1 + 0.2` bi `0.30000000000000004` nibiti awọn ile itaja Redis `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Ile-itaja ipin-ipin naa n ṣalaye mejeeji pẹlu `parseFloat`, ṣugbọn awọn nọmba meji yatọ ni awọn nọmba ti o kẹhin, nitorinaa lafiwe ti o ṣubu ni deede lori aala ipin kan le jade ni oriṣiriṣi. Ile itaja ijora igba kii ṣe apakan ti ṣiṣe yẹn. ( [Eto](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [awọn abajade](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Àwòrán Àkànṣe Ẹ̀rọ

```mermaid
flowchart LR
    subgraph App["Àdàkọ App"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\npínpín)]
    AK -- "tún ń lo client ti RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nibi ìpamọ́ quota)]
    R1 --> R2 -- "ó lè jẹ́ instance kan náà" --> R1
```

---

## Àwọn Ìtọ́kasí

| Fáìlì                              | Ìdí                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Client Redis àkọ́kọ́, script Lua fún dídín ìwọ̀n ìbéèrè kù, àti fallback inú-memory |
| `src/lib/db/apiKeys.ts`            | Cache ìfàṣẹsí — fallback Redis→SQLite                                            |
| `src/lib/quota/redisQuotaStore.ts` | Client Redis ọ̀tọ̀ fún ibi ìpamọ́ quota àṣàyàn                                      |
| `src/lib/quota/storeFactory.ts`    | Ń yí padà láàárín àwọn driver quota `sqlite` àti `redis`                         |
| `docker-compose.prod.yml`          | Container Redis fún prod (image `redis:8.6.2-alpine`)                            |
| `.env.example`                     | Ìwé àlàyé àwọn env vars Redis                                                    |
| `src/app/api/local/redis/`         | Àwọn ipa-ọ̀nà API fún ìṣètò container dev                                         |
| `bin/cli/commands/redis.mjs`       | Àwọn àṣẹ CLI fún ìṣètò container dev                                             |
