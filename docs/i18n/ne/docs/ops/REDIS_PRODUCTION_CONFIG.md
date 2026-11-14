# Redis Production Configuration Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## सिंहावलोकन

Redis OmniRoute मा एउटा **वैकल्पिक, कमजोर निर्भरता** हो — Redis उपलब्ध नभएको अवस्थामा अनुप्रयोगले सहज रूपमा कार्यक्षमता घटाउँछ (इन-मेमोरी
फल्ब्याकहरू)। उत्पादन वातावरणमा Redis ट्युन गर्दा चारवटा अलग-अलग
कार्यभारका लागि विलम्बता घट्छ:

| कार्यभार              | ड्राइभर                       | क्लाइन्ट फ्याक्ट्री                           | कुञ्जी ढाँचा                                                      |
| --------------------- | ----------------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| दर सीमित गर्ने        | `rateLimiter.ts`              | `getRedisClient()` — लेजी `ioredis` सिङ्गलटन  | `<prefix>rl:*` Lua‑एटोमिक दर सीमा विन्डोहरू                       |
| प्रमाणीकरण क्यास      | `apiKeys.ts`                  | `rateLimiter` को क्लाइन्ट पुनः प्रयोग गर्छ    | TTL सहितको `<prefix>auth:api_key:<sha256>`                        |
| कोटा स्टोर            | `redisQuotaStore.ts`          | छुट्टै `getRedisClient(url)` सिङ्गलटन         | प्रत्येक इन्स्ट्यान्सअनुसार कन्फिगर गर्न मिल्ने `<prefix>quota:*` |
| वार्मअप सर्किट ब्रेकर | `redisCircuitBreakerStore.ts` | `circuitBreakerFactory.ts` मा छुट्टै क्लाइन्ट | `<prefix>warmup:cb:<connectionId>`                                |

सबै चार कार्यभारले एउटै नेमस्पेस प्रिफिक्स साझा गर्छन्, जसले गर्दा OmniRoute अन्य एपहरूसँग एउटै
Redis इन्स्ट्यान्समा (उदाहरणका लागि `127.0.0.1:6379`) सह-अस्तित्वमा रहन सक्छ। [कुञ्जी नेमस्पेसिङ](#key-namespacing) हेर्नुहोस्।

---

## हालको कन्फिगरेसन (कोडका पूर्वनिर्धारित मानहरू)

| सेटिङ                                | मान                                                                  | स्थान                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` वातावरणीय चर             | `redis://redis:6379` (compose), वैकल्पिक                             | `rateLimiter.ts:5`, `.env.example`                                                    |
| `REDIS_KEY_PREFIX` वातावरणीय चर      | `omniroute:` (पूर्वनिर्धारित)                                        | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| `QUOTA_STORE_REDIS_URL` वातावरणीय चर | छुट्टै, `REDIS_URL` भन्दा फरक हुन सक्छ                               | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`                 | `"sqlite"` (पूर्वनिर्धारित), `"redis"` वैकल्पिक                      | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`       | `3`                                                                  | `rateLimiter.ts` क्लाइन्ट सिर्जना                                                     |
| `enableReadyCheck`                   | सेट नगरिएको (ioredis को पूर्वनिर्धारित: `true`)                      | —                                                                                     |
| `lazyConnect`                        | सेट नगरिएको (ioredis को पूर्वनिर्धारित: `false`)                     | —                                                                                     |
| `retryStrategy`                      | सेट नगरिएको (ioredis को पूर्वनिर्धारित: 200ms आधार, एक्स्पोनेन्सियल) | —                                                                                     |
| TLS / पासवर्ड / DB इन्डेक्स          | **कन्फिगर नगरिएको**                                                  | —                                                                                     |
| Sentinel / Cluster                   | **कन्फिगर नगरिएको** — स्ट्यान्डअलोन एकल-नोड मात्र                    | —                                                                                     |

---

## कुञ्जी नेमस्पेसिङ

OmniRoute ले होस्टमा चलिरहेका अन्य सेवाहरूसँग Redis इन्स्ट्यान्स साझा गर्छ। नेमस्पेसबिना,
`auth:api_key:<sha256>` वा `rl:*` जस्ता कुञ्जीहरू उही Redis प्रयोग गर्ने अन्य अनुप्रयोगका
कुञ्जीहरूसँग ठोक्किन सक्छन् (यो इन्स्ट्यान्स अन्य सेवाहरूसँगै `127.0.0.1:6379` मा Redis चलाउँछ)।

OmniRoute को **प्रत्येक** कुञ्जीमा प्रिफिक्स थप्न `REDIS_KEY_PREFIX` लाई कुनै खाली नभएको स्ट्रिङमा सेट गर्नुहोस्:

```bash
# .env — OmniRoute का सबै कुञ्जीहरू omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:* बन्छन्
REDIS_KEY_PREFIX=omniroute:
```

- **पूर्वनिर्धारित:** `omniroute:` (`REDIS_KEY_PREFIX` सेट नगरिएको वा खाली हुँदा लागू हुन्छ)।
- **यसमा लागू हुन्छ:** दर लिमिटर + प्रमाणीकरण क्यास (`keyPrefix` मार्फत साझा गरिएको `ioredis` क्लाइन्ट) र
  कोटा स्टोर (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) तथा वार्मअप सर्किट ब्रेकर
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`)।
- Redis मा कुञ्जीहरू पहिल्यै अवस्थित हुँदा **प्रिफिक्स परिवर्तन गरेमा** पुराना कुञ्जीहरू छुटेर रहन्छन् (ती
  TTL / LRU मार्फत समाप्त हुन्छन्)। परिवर्तन गर्न सुरक्षित छ; माइग्रेसन आवश्यक पर्दैन। यसको एउटा अपवाद भनेको निषेधित भनी चिनो लगाइएको कनेक्सनको वार्मअप
  सर्किट-ब्रेकर कुञ्जी हो: यो TTL बिना स्थायी रूपमा भण्डारण हुन्छ, त्यसैले बाँकी रहेका कुञ्जीहरूलाई `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` प्रयोग गरेर सूचीबद्ध गरी मेटाउनुहोस्।
- **ioredis `keyPrefix`** ले लेख्दा स्वचालित रूपमा प्रिफिक्स अगाडि थप्छ **र** पढ्दा त्यसलाई हटाउँछ,
  त्यसैले अनुप्रयोग कोडले प्रिफिक्स कहिल्यै देख्दैन।

---

## उत्पादन ट्युनिङ सिफारिस गर्नुभयो

### 1. जडान पूल / ग्राहक विकल्पहरू (ioredis `Redis` कन्स्ट्रक्टर)

हालको कोडले कुनै अनुकूलन विकल्पहरू बिना एकल `new Redis(url)` सिर्जना गर्दछ। उत्पादन बहु-प्रतिकृति परिनियोजनका लागि, कोडमा ग्राहक कारखाना पास गर्नुहोस् वा `getRedisClient()` र्‍याप गर्नुहोस्:

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

**प्रमुख व्यापार-अफहरू:**

- `maxRetriesPerRequest: null` + `retryStrategy` — उत्पादनको लागि रुचाइएको छ त्यसैले क्षणिक Redis पुन: सुरु गर्दा तुरुन्तै प्रत्येक अनुरोध असफल हुँदैन। `checkRateLimit()` मा इन-मेमोरी फलब्याकले असफलताको बाटो अवशोषित गर्दछ।
- `lazyConnect: true` — सर्भरले जडानहरू स्वीकार गर्न सुरु गर्नु अघि Redis मा स्टार्टअप निर्भरतालाई बेवास्ता गर्छ।
- `enableAutoPipelining: true` — समवर्ती दर-सीमा जाँचहरूको लागि राउन्ड-ट्रिपहरू घटाउँछ; एकल जडानमा > 50 RPS मा लाभदायक।

### 2. Redis सर्भर कन्फिगरेसन (`redis.conf`)

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

**`maxmemory-policy allkeys-lru` को लागि व्यापार बन्द:** प्रमाणीकरण क्यास प्रविष्टिहरू मेमोरी दबाबमा बेदखल गर्न सकिन्छ। यो सुरक्षित छ — `setCachedApiKey` सधैं मिसमा पुन: भरिन्छ, र SQLite फलब्याक आधिकारिक छ। दर-सीमा गर्ने लुआ स्क्रिप्टले सानो कुञ्जीहरू सिर्जना गर्दछ जुन डिजाइनद्वारा छोटो अवधिको हुन्छ।

### 3. Docker रचना सेटिङहरू

प्रोड कम्पोज (`docker-compose.prod.yml`) ले `redis:8.6.2-alpine` प्रयोग गर्दछ। थप्नुहोस्:

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

### 4. बहु-उदाहरण / स्केलिंग विचारहरू

**सबै प्रतिकृतिहरूको लागि एकल Redis** — दर-सीमा लुआ लिपि एकल आधिकारिक कुञ्जी स्थानमा निर्भर गर्दछ। प्रतिकृतिहरू पछाडि धेरै Redis उदाहरणहरूले परमाणुता गुमाउनेछ र बजेट दोब्बर हुनेछ। सबै अनुप्रयोग प्रतिकृतिहरूका लागि एकल Redis (वा फेलओभरको साथ Redis Sentinel क्लस्टर) प्रयोग गर्नुहोस्।

**जडान गणना:** प्रत्येक अनुप्रयोग प्रतिकृति खुल्छ** २ TCP जडानहरू** Redis मा (दर लिमिटर ग्राहक + कोटा स्टोर ग्राहक)। 10 replicas → 20 जडानहरूमा, राम्रोसँग पूर्वनिर्धारित Redis उदाहरणको 10k जडान छत भित्र।

### 5. अनुगमन

स्वास्थ्य जाँच अन्त्य बिन्दु मार्फत खुलासा गर्नुहोस्:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

हेर्नको लागि प्रमुख मेट्रिक्स:

- **निष्कासित कुञ्जीहरू / सेकेन्ड** — यदि लगातार गैर-शून्य छ भने, `maxmemory` बढाउनुहोस्
- **अवरुद्ध ग्राहकहरु** — गैर-शून्यले ढिलो लुआ लिपि वा उच्च विवादको सुझाव दिन्छ
- **अस्वीकृत जडानहरू** — जडान सीमा हिट; 20 जडानहरूमा दुर्लभ

### 6. Redis-कम्प्याटिबल सर्भरहरू

यहाँ प्रयोग गरिएको कुनै पनि सर्भरले लुआ स्क्रिप्टहरू चलाउनु पर्छ: दर सीमित गर्ने एक `EVAL` हो। Lua बिना सर्भरमा, `checkRateLimit()` ले `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` लग गर्दछ र प्रति प्रक्रिया गणना गर्दछ, त्यसैले प्रत्येक प्रतिकृतिले आफ्नै सीमा लागू गर्दछ। अप्ट-इन साझा सत्र-अफिनिटी स्टोर (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) ले `EVAL` सँग पिनहरू पनि पढ्छ र अद्यावधिक गर्दछ; लुआ बिना यसले `[SESSION_AFFINITY] Redis error; falling back to SQLite.` लग गर्छ र प्रत्येक प्रतिकृतिले आफ्नै पिन राख्छ। अन्य कार्यभारहरूले सादा आदेशहरू प्रयोग गर्दछ (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, ह्यास र सेटहरू), र सिमेन्टिक क्यासको Redis ब्याकइन्डले कुनै `FT.*` आदेशहरू पठाउँदैन।

OmniRoute 3.8.52: KiviDB 1.2.0 यसको Lua छवि (`kividb/kividb:v1.2.0-lua`) को साथ परीक्षण गरियो। रेट लिमिटर (काउन्टरहरू साझेदारी गर्ने दोस्रो प्रक्रिया सहित), प्रमाणीकरण क्यास, कोटा स्टोर, वार्मअप सर्किट ब्रेकर, सिमान्टिक क्यास स्टोर, र च्याट ह्यान्डलर मार्फत `/v1/chat/completions` अनुरोधले Redis 8.10.3 मा पास हुने 19 चेकहरू मध्ये 18 पारित गरेको छ। जुन फरक छ: `INCRBYFLOAT` `0.1 + 0.2` `0.30000000000000004` को रूपमा भण्डार गर्दछ जहाँ Redis `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ) भण्डार गर्दछ। कोटा स्टोरले दुवैलाई `parseFloat` सँग पार्स गर्छ, तर अन्तिम अंकहरूमा दुई नम्बरहरू फरक हुन्छन्, त्यसैले कोटा सीमामा ठ्याक्कै पर्ने तुलना फरक रूपमा आउन सक्छ। सत्र-सम्बन्ध स्टोर त्यो दौडको भाग थिएन। ( [सेटअप](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [परिणाम](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## वास्तुकला रेखाचित्र

```mermaid
flowchart LR
    subgraph App["App Replica"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nshared)]
    AK -- "reuses RL's client" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nquota store)]
    R1 --> R2 -- "can be same instance" --> R1
```

---

## सन्दर्भहरू

| फाइल                               | उद्देश्य                                                          |
| ---------------------------------- | ----------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | प्राथमिक Redis क्लाइन्ट, Lua दर-सीमा स्क्रिप्ट, इन-मेमोरी फलब्याक |
| `src/lib/db/apiKeys.ts`            | प्रमाणीकरण क्यास — Redis→SQLite फलब्याक                           |
| `src/lib/quota/redisQuotaStore.ts` | वैकल्पिक कोटा स्टोरका लागि छुट्टै Redis क्लाइन्ट                  |
| `src/lib/quota/storeFactory.ts`    | `sqlite` र `redis` कोटा ड्राइभरहरूबीच स्विच गर्छ                  |
| `docker-compose.prod.yml`          | उत्पादन Redis कन्टेनर (`redis:8.6.2-alpine` इमेज)                 |
| `.env.example`                     | Redis वातावरण चरहरूको दस्तावेजीकरण                                |
| `src/app/api/local/redis/`         | विकास कन्टेनर सञ्चालन व्यवस्थापनका लागि API रुटहरू                |
| `bin/cli/commands/redis.mjs`       | विकास कन्टेनर सञ्चालन व्यवस्थापनका लागि CLI कमाण्डहरू             |
