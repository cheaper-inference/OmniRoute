# Redis Production Configuration Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Forbhreathnú

Tá Redis ina **roghnach, spleáchas bog** i OmniRoute — díghrádaítear an feidhmchlár go grástúil (tuilleoga sa chuimhne) nuair nach bhfuil Redis ar fáil. I dtáirgeadh, laghdaíonn tiúnadh Redis latency do cheithre ualach oibre ar leith:

| Ualach oibre           | Tiománaí                      | Monarcha Cliant                                    | Patrún Eochracha                                    |
| ---------------------- | ----------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| Teorainn rátaí         | `rateLimiter.ts`              | `getRedisClient()` — leisciúil `ioredis` singleton | Fuinneoga teorann ráta Lua-adamhach `<prefix>rl:*`  |
| Údar taisce            | `apiKeys.ts`                  | Athúsáideann cliant `rateLimiter`                  | `<prefix>auth:api_key:<sha256>` le TTL              |
| Siopa cuóta            | `redisQuotaStore.ts`          | `getRedisClient(url)` singleton ar leith           | `<prefix>quota:*` inchumraithe in aghaidh na huaire |
| Scoradán ciorcad teasa | `redisCircuitBreakerStore.ts` | Cliant ar leith i `circuitBreakerFactory.ts`       | `<prefix>warmup:cb:<connectionId>`                  |

Roinneann na ceithre ualach oibre réimír ainmspáis amháin ionas gur féidir le OmniRoute a bheith ann in aontíos le haipeanna eile ar shampla amháin Redis (m.sh. `127.0.0.1:6379`). Féach [Spásáil Eochracha](#key-namespacing).

---

## Cumraíocht Reatha (Réamhshocraithe Cóid)

| Socrú                           | Luach                                                                 | Cá                                                                                    |
| ------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` env var             | `redis://redis:6379` (comhdhéanamh), roghnach                         | `rateLimiter.ts:5`, `.env.example`                                                    |
| `REDIS_KEY_PREFIX` env var      | `omniroute:` (réamhshocraithe)                                        | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| `QUOTA_STORE_REDIS_URL` env var | leithleach, difriúil ó `REDIS_URL`                                    | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`            | `"sqlite"` (réamhshocraithe), `"redis"` roghnach                      | `quota/storeFactory.ts`                                                               |
| ioredi `maxRetriesPerRequest`   | `3`                                                                   | Cruthú cliant `rateLimiter.ts`                                                        |
| `enableReadyCheck`              | gan a bheith socraithe (réamhshocrú iredis: `true`)                   | —                                                                                     |
| `lazyConnect`                   | gan a bheith socraithe (réamhshocrú iredis: `false`)                  | —                                                                                     |
| `retryStrategy`                 | gan a bheith socraithe (réamhshocrú iredis: bonn 200ms, easpónantúil) | —                                                                                     |
| TLS / pasfhocal / innéacs DB    | **gan a bheith cumraithe**                                            | —                                                                                     |
| Sentinel / Braisle              | **gan a bheith cumraithe** Nód aonair — amháin                        | —                                                                                     |

---

## Ainmspású Eochrach

Roinneann OmniRoute ásc Redis le cibé rud eile a ritheann ar an óstach. Gan ainmspás,
d’fhéadfadh eochracha amhail `auth:api_key:<sha256>` nó `rl:*` teacht salach ar eochracha ó fheidhmchláir eile
a úsáideann an Redis céanna (ritheann an ásc seo Redis ar `127.0.0.1:6379` taobh le seirbhísí eile).

Socraigh `REDIS_KEY_PREFIX` mar theaghrán neamhfholamh chun réimír a chur le **gach** eochair OmniRoute:

```bash
# .env — déantar omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:* de gach eochair OmniRoute
REDIS_KEY_PREFIX=omniroute:
```

- **Réamhshocrú:** `omniroute:` (cuirtear i bhfeidhm é nuair nach mbíonn `REDIS_KEY_PREFIX` socraithe nó nuair a bhíonn sé folamh).
- **Cuirtear i bhfeidhm ar:** an teorantóir ráta + an taisce fíordheimhnithe (cliant comhroinnte `ioredis` trí `keyPrefix`) agus an
  stór cuóta (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) agus an scoradán ciorcaid réamhthéimh
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- Má **athraítear an réimír** nuair atá eochracha ann cheana in Redis, fágtar na seaneochracha ina ndílleachtaí (téann siad in éag
  trí TTL / LRU). Is féidir í a athrú go sábháilte; níl aon aistriú de dhíth. Is é an t-aon eisceacht amháin ná eochair
  scoradáin ciorcaid réamhthéimh do nasc atá marcáilte mar thoirmiscthe: coinnítear í gan TTL, mar sin
  liostaigh na hiarsmaí le `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` agus scrios iad.
- Cuireann **`keyPrefix` ioredis** an réimír go huathoibríoch le linn scríbhneoireachta **agus** baineann sé í le linn léitheoireachta,
  mar sin ní fheiceann cód an fheidhmchláir an réimír riamh.

---

## Tiúnadh Táirgeadh Molta

### 1. Snámha Nasctha / Roghanna Cliant (déantóir iredis `Redis` )

Cruthaíonn an cód reatha `new Redis(url)` amháin gan aon roghanna saincheaptha. Le haghaidh imscaradh il-macasamhail táirgeachta, pas a fháil i monarcha cliant sa chód nó fillte `getRedisClient()`:

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

**Comhbhabhtáil eochair:**

- `maxRetriesPerRequest: null` + `retryStrategy` — is fearr le haghaidh táirgeadh ionas nach dteipeann ar atosú Redis neamhbhuan láithreach gach iarratas. Ionsúnn an t-aischur cuimhne i `checkRateLimit()` an cosán teip.
- `lazyConnect: true` Seachnaíonn — spleáchas tosaithe ar Redis a bheith suas sula dtosaíonn an freastalaí ag glacadh le naisc.
- `enableAutoPipelining: true` — laghdaítear turas slánaithe le haghaidh seiceálacha comhthráthacha teorainneacha ráta; tairbheach ag > 50 RPS ar nasc amháin.

### 2. Cumraíocht Freastalaí Redis (`redis.conf`)

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

**Comhbhabhtáil le haghaidh `maxmemory-policy allkeys-lru`:** Féadfar iontrálacha taisce Údar a dhíshealbhú faoi bhrú cuimhne. Tá sé seo sábháilte — `setCachedApiKey` ath-populates i gcónaí ar chailleann, agus tá an t-aischur SQLite údarásach. Cruthaíonn an script teorann-ráta Lua eochracha beaga atá gearrthéarmach ó thaobh dearaidh.

### 3. Socruithe Comhdhéanta Docker

Úsáideann an cumadóireacht táirgí (`docker-compose.prod.yml`) `redis:8.6.2-alpine`. Cuir leis:

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

### 4. Cúinsí Ilchéime / Scálú

**Redis singil do gach macasamhail** Braitheann an script Lua teorannaithe ráta — ar eochairspás amháin údarásach. Chaillfeadh cásanna iolracha Redis taobh thiar de na macasamhla adamhacht agus dhá oiread an buiséad. Úsáid Redis amháin (nó braisle Sentinel Redis le teip) le haghaidh gach macasamhail feidhmchlár.

**Comhaireamh ceangail:** Osclaíonn gach macasamhail feidhmchlár **2 nasc TCP** go Redis (teorannóir ráta cliant siopa cuóta + ). Ag 10 macasamhail de naisc → 20, go maith laistigh den uasteorainn cheangail réamhshocraithe 10k Redis.

### 5. Monatóireacht

Nochtadh trí chríochphointe seiceála sláinte:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Príomhmhéadracht le féachaint:

- **Eochracha / soic díshealbhaithe** — más rud é go seasta neamh-nialas, méadú `maxmemory`
- **Cliaint blocáilte** Molann — neamh-nialas scripteanna Lua mall nó ard-áitiú
- **Naisc diúltaithe** Buail teorainn nasc — ; annamh ag 20 nasc

### 6. Freastalaithe Redis-Comhoiriúnach

Ní mór d’aon fhreastalaí a úsáidtear anseo scripteanna Lua a rith: is é an teorannóir rátaí `EVAL` amháin . Ar fhreastalaí gan Lua, logálann `checkRateLimit()` `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` agus déantar é a chomhaireamh in aghaidh an phróisis, agus mar sin forfheidhmíonn gach macasamhail an teorainn leis féin. Chomh maith leis sin léann agus nuashonraíonn an stór rogha diúltaithe cleamhnais seisiúin roinnte (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) bioráin le `EVAL`; gan Lua logálann sé `[SESSION_AFFINITY] Redis error; falling back to SQLite.` agus coinníonn gach macasamhail a bioráin féin. Úsáideann na hualaí oibre eile gnáthorduithe (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashes agus tacair), agus ní sheolann inneall Redis an taisce shéimeantach aon orduithe `FT.*`.

Tástáilte le OmniRoute 3.8.52: KiviDB 1.2.0 lena íomhá Lua (`kividb/kividb:v1.2.0-lua`). D'éirigh leis an teorannóir rátaí (lena n-áirítear an dara próiseas a chomhroinneann na cuntair), taisce an údair, stór cuóta, scoradán ciorcaid téamh, stór taisce shéimeantach, agus iarratas `/v1/chat/completions` tríd an láimhseálaí comhrá 18 de na 19 seiceáil a chuireann Redis 8.10.3 ar aghaidh. An ceann atá difriúil: stórálann `INCRBYFLOAT` `0.1 + 0.2` mar `0.30000000000000004` áit a stórálann Redis `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Déanann an stór cuóta an dá cheann a pharsáil le `parseFloat`, ach tá difríocht idir an dá uimhir sna digití deiridh, agus mar sin is féidir comparáid a thiteann go díreach ar theorainn cuóta a bhaint amach ar bhealach difriúil. Ní raibh an siopa cleamhnais seisiúin mar chuid den rith sin. ( [socrú](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [torthaí](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Léaráid Ailtireachta

```mermaid
flowchart LR
    subgraph App["Macasamhail Aipe"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\ncomhroinnte)]
    AK -- "athúsáideann cliant RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nstór cuótaí)]
    R1 --> R2 -- "is féidir an t-ásc céanna a úsáid" --> R1
```

---

## Tagairtí

| Comhad                             | Cuspóir                                                           |
| ---------------------------------- | ----------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Cliant Redis bunscoile, script teorainn ráta Lua, cúl-aischuimhne |
| `src/lib/db/apiKeys.ts`            | Údar taisce — Redis→SQLite cúltaca                                |
| `src/lib/quota/redisQuotaStore.ts` | Cliant Redis ar leith le haghaidh stór cuóta roghnach             |
| `src/lib/quota/storeFactory.ts`    | Aistríonn sé idir tiománaithe cuóta `sqlite` agus `redis`         |
| `docker-compose.prod.yml`          | Coimeádán Prod Redis (íomhá `redis:8.6.2-alpine`)                 |
| `.env.example`                     | Doiciméadú Redis env vars                                         |
| `src/app/api/local/redis/`         | Bealaí API le haghaidh orchestration coimeádán dev                |
| `bin/cli/commands/redis.mjs`       | Orduithe CLI do cheolfhoireann coimeádán dev                      |
