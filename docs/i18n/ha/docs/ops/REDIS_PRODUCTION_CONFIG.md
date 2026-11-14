# Redis Production Configuration Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Bayani Gabaɗaya

Redis wani **zaɓi ne, kuma dogaro ne mai sassauci** a cikin OmniRoute — manhajar tana ci gaba da aiki yadda ya kamata (ta amfani da
madadin ajiyar cikin ƙwaƙwalwa) idan Redis ba ya samuwa. A yanayin samarwa, daidaita Redis yana rage jinkiri ga nau'ikan
ayyuka huɗu:

| Nau'in aiki                | Mai tafiyarwa                 | Masana'antar Kliyanta                                           | Tsarin Maɓalli                                                               |
| -------------------------- | ----------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Iyakance ƙimar buƙatu      | `rateLimiter.ts`              | `getRedisClient()` — singleton na `ioredis` mai jinkirin farawa | `<prefix>rl:*` tagogin iyakance ƙima na Lua masu aiki a matsayin raka'a ɗaya |
| Ma'ajiyar tantancewa       | `apiKeys.ts`                  | Yana sake amfani da kliyantar `rateLimiter`                     | `<prefix>auth:api_key:<sha256>` tare da TTL                                  |
| Ma'ajiyar ƙayyadadden kaso | `redisQuotaStore.ts`          | Singleton na `getRedisClient(url)` na daban                     | `<prefix>quota:*` mai iya daidaitawa ga kowane instance                      |
| Circuit breaker na warmup  | `redisCircuitBreakerStore.ts` | Kliyanta na daban a cikin `circuitBreakerFactory.ts`            | `<prefix>warmup:cb:<connectionId>`                                           |

Dukkan nau'ikan ayyukan huɗu suna amfani da prefix na namespace guda ɗaya domin OmniRoute ya iya kasancewa tare da sauran manhajoji a kan
instance ɗin Redis guda ɗaya (misali, `127.0.0.1:6379`). Duba [Rarraba Sunayen Maɓalli](#key-namespacing).

---

## Tsarin Yanzu (Ƙimar Tsoho ta Lamba)

| Saiti                              | Ƙima                                                                              | Wuri                                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| env var na `REDIS_URL`             | `redis://redis:6379` (compose), na zaɓi                                           | `rateLimiter.ts:5`, `.env.example`                                                    |
| env var na `REDIS_KEY_PREFIX`      | `omniroute:` (tsoho)                                                              | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| env var na `QUOTA_STORE_REDIS_URL` | na daban, zai iya bambanta da `REDIS_URL`                                         | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`               | `"sqlite"` (tsoho), `"redis"` na zaɓi                                             | `quota/storeFactory.ts`                                                               |
| `maxRetriesPerRequest` na ioredis  | `3`                                                                               | ƙirƙirar kliyanta a `rateLimiter.ts`                                                  |
| `enableReadyCheck`                 | ba a saita ba (tsohon saitin ioredis: `true`)                                     | —                                                                                     |
| `lazyConnect`                      | ba a saita ba (tsohon saitin ioredis: `false`)                                    | —                                                                                     |
| `retryStrategy`                    | ba a saita ba (tsohon saitin ioredis: tushe na 200ms, yana ƙaruwa ta exponential) | —                                                                                     |
| TLS / kalmar sirri / fihirisar DB  | **ba a saita ba**                                                                 | —                                                                                     |
| Sentinel / Cluster                 | **ba a saita ba** — standalone mai node guda ɗaya kawai                           | —                                                                                     |

---

## Rarraba Sunayen Maɓalli

OmniRoute yana amfani da instance ɗin Redis tare da duk wani abu da ke gudana a kan host ɗin. Ba tare da namespace ba,
maɓallai kamar `auth:api_key:<sha256>` ko `rl:*` za su iya karo da maɓallan wasu manhajoji
masu amfani da Redis ɗin guda ɗaya (wannan instance ɗin yana gudanar da Redis a `127.0.0.1:6379` tare da sauran ayyuka).

Saita `REDIS_KEY_PREFIX` zuwa wani rubutu marar fanko domin saka prefix ga **kowane** maɓallin OmniRoute:

```bash
# .env — duk maɓallan OmniRoute za su zama omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **Tsoho:** `omniroute:` (ana amfani da shi idan ba a saita `REDIS_KEY_PREFIX` ba ko kuma babu komai a cikinsa).
- **Ana amfani da shi ga:** mai iyakance ƙimar buƙatu + ma'ajiyar tantancewa (kliyantar `ioredis` da ake rabawa ta hanyar `keyPrefix`) da kuma
  ma'ajiyar ƙayyadadden kaso (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) da circuit breaker na warmup
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Canza prefix** yayin da maɓallai suka riga suka kasance a Redis yana barin tsoffin maɓallan ba tare da mai amfani da su ba (za su ƙare
  ta hanyar TTL / LRU). Ana iya canza shi lafiya; ba a buƙatar migration. Banda guda ɗaya shi ne maɓallin
  circuit-breaker na warmup na connection da aka yi wa alamar haramun: ana adana shi ba tare da TTL ba, saboda haka
  jera ragowar da `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` sannan a share su.
- **`keyPrefix` na ioredis** yana ƙara prefix ɗin kai tsaye yayin rubutawa **kuma** yana cire shi yayin karantawa,
  saboda haka lambar manhajar ba ta taɓa ganin prefix ɗin.

---

## Gyaran Samar da Nasiha

### 1. Pool Connection/Client Options (ioredis `Redis` constructor)

Lambar yanzu tana ƙirƙirar `new Redis(url)` guda ɗaya ba tare da zaɓuɓɓukan al'ada ba. Don samar da kayan aiki iri-iri, wuce masana'antar abokin ciniki a cikin lambar ko kunsa `getRedisClient()`:

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

**Mabuɗin ciniki:**

- `maxRetriesPerRequest: null` + `retryStrategy` — an fi so don samarwa don haka sake kunnawa Redis na wucin gadi kada nan da nan ya gaza ga kowane buƙatu. Komawar cikin ƙwaƙwalwar ajiya a cikin `checkRateLimit()` tana ɗaukar hanyar gazawa.
- `lazyConnect: true` — yana guje wa dogaron farawa akan Redis kasancewa sama kafin uwar garken ya fara karɓar haɗi.
- `enableAutoPipelining: true` — yana rage tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye-tafiye na lokaci-lokaci; yana da fa'ida a > 50 RPS akan haɗin gwiwa guda ɗaya.

### 2. Kanfigareshan Sabar Redis (`redis.conf`)

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

**Ciniki don `maxmemory-policy allkeys-lru`:** Ana iya fitar da shigarwar bayanan cache a ƙarƙashin matsin ƙwaƙwalwar ajiya. Wannan amintaccen — `setCachedApiKey` koyaushe yana sake cikawa akan kuskure, kuma faɗuwar SQLite tana da iko. Rubutun Lua mai iyaka-ƙididdigar ƙirƙira ƙananan maɓalli waɗanda ba su daɗe da ƙira.

### 3. Docker Rubuta Saituna

Ƙirƙirar samfurin (`docker-compose.prod.yml`) tana amfani da `redis:8.6.2-alpine`. Ƙara:

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

### 4. La'akari da Matsaloli da yawa / Sikeli

**Redis ɗaya don duk kwafi** — rubutun Lua mai iyaka-ƙididdigar ya dogara da sarari maɓalli ɗaya mai iko. Misalin Redis da yawa a bayan kwafi zai rasa atomity kuma ya ninka kasafin kuɗi. Yi amfani da Redis guda ɗaya (ko Redis Sentinel cluster tare da gazawa) don duk kwafin aikace-aikacen.

**Ƙididdigar haɗin kai:** Kowane kwafin aikace-aikacen yana buɗewa** 2 TCP haɗi** zuwa Redis (ƙididdige ƙimar abokin ciniki + keɓaɓɓen kantin sayar da abokin ciniki). A 10 replicas → 20 haɗin gwiwa, da kyau a cikin tsoho Redis misali rufin haɗin 10k.

### 5. Kulawa

Bayyana ta hanyar ƙarshen duba lafiya:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Mabuɗin ma'auni don kallo:

- **Maɓallai da aka fitar / s** — idan naci ba zero ba, ƙara `maxmemory`
- **Abokan ciniki da aka toshe** — mara sifili yana nuna jinkirin rubutun Lua ko babban jayayya
- **An ƙi haɗin haɗin gwiwa** iyakar haɗin — buga; rare a 20 haɗi

### 6. Sabis masu dacewa da Redis

Duk wani uwar garken da aka yi amfani da shi anan dole ne ya gudanar da rubutun Lua: madaidaicin ƙimar `EVAL` ɗaya ce. A kan uwar garken ba tare da Lua ba, `checkRateLimit()` yana yin rajistar `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` kuma yana ƙirga kowane tsari, don haka kowane kwafi yana tilasta iyaka da kansa. Store-in shared session-affinity Store (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) yana karantawa kuma yana sabunta fil tare da `EVAL`; ba tare da Lua ba yana yin rajistar `[SESSION_AFFINITY] Redis error; falling back to SQLite.` kuma kowane kwafi yana riƙe fil ɗinsa. Sauran kayan aikin suna amfani da umarni a sarari (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashes da saiti ), kuma madaidaicin cache na Redis baya aika babu umarnin `FT.*`.

An gwada da OmniRoute 3.8.52: KiviDB 1.2.0 tare da hoton Lua (`kividb/kividb:v1.2.0-lua`). Ƙididdigar ƙima (gami da tsari na biyu na raba masu ƙididdiga), cache na auth, kantin keɓaɓɓu, mai kashe wutar lantarki, kantin ma'ajin ma'ana, da buƙatun `/v1/chat/completions` ta wurin mai kula da taɗi sun wuce 18 daga cikin cak 19 waɗanda suka wuce Redis 8.10.3. Wanda ya bambanta: `INCRBYFLOAT` yana adana `0.1 + 0.2` a matsayin `0.30000000000000004` inda Redis ke ajiyar `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Kantin sayar da keɓaɓɓun yana rarraba duka biyu tare da `parseFloat`, amma lambobi biyu sun bambanta a cikin lambobi na ƙarshe, don haka kwatancen da ya faɗi daidai akan iyakar keɓe zai iya fitowa daban. Kantin sayar da zaman-dangin ba ya cikin wannan gudu. ( [saitin](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [sakamako](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Zanen Tsarin Gine-gine

```mermaid
flowchart LR
    subgraph App["Kwafin App"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nna bai ɗaya)]
    AK -- "yana sake amfani da client na RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nma'ajiyar quota)]
    R1 --> R2 -- "za su iya zama instance ɗaya" --> R1
```

---

## Manazarta

| Fayil                              | Manufa                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Babban client na Redis, skriptin iyakance ƙima na Lua, da madadin cikin ƙwaƙwalwa |
| `src/lib/db/apiKeys.ts`            | Ma'ajiyar wucin gadi ta tantancewa — madadin Redis→SQLite                         |
| `src/lib/quota/redisQuotaStore.ts` | Client na Redis daban don ma'ajiyar quota ta zaɓi                                 |
| `src/lib/quota/storeFactory.ts`    | Yana sauyawa tsakanin direbobin quota na `sqlite` da `redis`                      |
| `docker-compose.prod.yml`          | Kwantenan Redis na prod (image `redis:8.6.2-alpine`)                              |
| `.env.example`                     | Takardun bayanin env vars na Redis                                                |
| `src/app/api/local/redis/`         | Hanyoyin API don tsara tafiyar kwantenan dev                                      |
| `bin/cli/commands/redis.mjs`       | Umarnin CLI don tsara tafiyar kwantenan dev                                       |
