# Redis Production Configuration Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Ülevaade

Redis on OmniRoute'i **valikuline, nõrk sõltuvus** — rakendus jätkab Redise kättesaamatuse korral sujuvalt tööd (kasutades mälupõhiseid
varulahendusi). Tootmiskeskkonnas vähendab Redise häälestamine latentsust nelja erineva
töökoormuse puhul:

| Töökoormus                 | Draiver                       | Kliendi tehas                                                  | Võtmemuster                                                      |
| -------------------------- | ----------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Päringusageduse piiramine  | `rateLimiter.ts`              | `getRedisClient()` — laisalt loodav `ioredis`-e üksikeksemplar | `<prefix>rl:*` Lua abil atomaarse päringusageduse piirangu aknad |
| Autentimisvahemälu         | `apiKeys.ts`                  | Kasutab uuesti `rateLimiter`-i klienti                         | `<prefix>auth:api_key:<sha256>` koos TTL-iga                     |
| Kvoodihoidla               | `redisQuotaStore.ts`          | Eraldi `getRedisClient(url)`-i üksikeksemplar                  | `<prefix>quota:*`, seadistatav eksemplaripõhiselt                |
| Eelsoojenduse kaitselüliti | `redisCircuitBreakerStore.ts` | Eraldi klient failis `circuitBreakerFactory.ts`                | `<prefix>warmup:cb:<connectionId>`                               |

Kõik neli töökoormust jagavad üht nimeruumi prefiksit, et OmniRoute saaks ühes
Redise eksemplaris teiste rakendustega koos eksisteerida (nt `127.0.0.1:6379`). Vaadake jaotist [Võtmete nimeruum](#key-namespacing).

---

## Praegune konfiguratsioon (koodi vaikeväärtused)

| Seadistus                                | Väärtus                                                                  | Asukoht                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Keskkonnamuutuja `REDIS_URL`             | `redis://redis:6379` (compose), valikuline                               | `rateLimiter.ts:5`, `.env.example`                                                    |
| Keskkonnamuutuja `REDIS_KEY_PREFIX`      | `omniroute:` (vaikimisi)                                                 | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| Keskkonnamuutuja `QUOTA_STORE_REDIS_URL` | eraldiseisev, võib erineda muutujast `REDIS_URL`                         | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`                     | `"sqlite"` (vaikimisi), `"redis"` valikuline                             | `quota/storeFactory.ts`                                                               |
| ioredis-e `maxRetriesPerRequest`         | `3`                                                                      | kliendi loomine failis `rateLimiter.ts`                                               |
| `enableReadyCheck`                       | määramata (ioredis-e vaikeväärtus: `true`)                               | —                                                                                     |
| `lazyConnect`                            | määramata (ioredis-e vaikeväärtus: `false`)                              | —                                                                                     |
| `retryStrategy`                          | määramata (ioredis-e vaikeväärtus: 200 ms baasväärtus, eksponentsiaalne) | —                                                                                     |
| TLS / parool / andmebaasi indeks         | **seadistamata**                                                         | —                                                                                     |
| Sentinel / Cluster                       | **seadistamata** — toetatud on ainult autonoomne üksiksõlm               | —                                                                                     |

---

## Võtmete nimeruum

OmniRoute jagab Redise eksemplari kõige muuga, mis hostis töötab. Ilma nimeruumita
võivad võtmed, nagu `auth:api_key:<sha256>` või `rl:*`, sattuda konflikti teiste rakenduste võtmetega,
mis kasutavad sama Redist (see eksemplar käitab Redist aadressil `127.0.0.1:6379` koos teiste teenustega).

Määrake `REDIS_KEY_PREFIX` mittetühjaks stringiks, et lisada prefiks **igale** OmniRoute'i võtmele:

```bash
# .env — kõik OmniRoute'i võtmed muutuvad kujule omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **Vaikeväärtus:** `omniroute:` (rakendatakse, kui `REDIS_KEY_PREFIX` on määramata või tühi).
- **Rakendatakse järgmistele:** päringusageduse piiraja + autentimisvahemälu (jagatud `ioredis`-e klient `keyPrefix`-i kaudu),
  kvoodihoidla (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) ja eelsoojenduse kaitselüliti
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Prefiksi muutmine** ajal, mil võtmed on Redises juba olemas, muudab vanad võtmed orvuks (need aeguvad
  TTL-i / LRU kaudu). Muutmine on ohutu; migreerimist pole vaja. Ainsaks erandiks on keelatuks
  märgitud ühenduse eelsoojenduse kaitselüliti võti: see säilitatakse ilma TTL-ita, seega
  loetlege jäägid käsuga `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` ja kustutage need.
- **ioredis-e `keyPrefix`** lisab prefiksi kirjutamisel automaatselt ette **ja** eemaldab selle lugemisel,
  mistõttu rakenduse kood prefiksit kunagi ei näe.

---

## Soovitatav tootmise häälestamine

### 1. Ühendusbassein / kliendi valikud (ioredis `Redis` konstruktor)

Praegune kood loob ühe `new Redis(url)`, millel pole kohandatud valikuid. Tootmise mitme koopia juurutamiseks edastage kliendi tehas koodis või mähkige `getRedisClient()`:

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

**Peamised kompromissid:**

- `maxRetriesPerRequest: null` + `retryStrategy` — on tootmiseks eelistatud, nii et mööduvad Redis taaskäivitused ei kukuks kohe iga taotluse läbi. `checkRateLimit()` -i mälusisene varu neelab tõrketee.
- `lazyConnect: true` — väldib käivitamisel sõltuvust sellest, et Redis on üleval enne, kui server hakkab ühendusi vastu võtma.
- `enableAutoPipelining: true` — vähendab samaaegsete piirmäärade kontrollide edasi-tagasi reise; kasulik > 50 RPS ühe ühenduse korral.

### 2. Redis serveri konfiguratsioon (`redis.conf`)

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

**Kompromiss `maxmemory-policy allkeys-lru` jaoks:** Vahemälu autentimiskirjed võidakse mälu surve all välja tõsta. See on ohutu. — `setCachedApiKey` asustatakse alati uuesti vahelejätmise korral ja SQLite varundus on autoriteetne. Kiirusepiiraja Lua skript loob väikesed võtmed, mis on disainilt lühiajalised.

### 3. Docker Koostamise seaded

Prod-koostamine (`docker-compose.prod.yml`) kasutab `redis:8.6.2-alpine`. Lisa:

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

### 4. Mitme eksemplari / skaleerimise kaalutlused

**Üksik Redis kõigi koopiate jaoks** — kiiruspiiraja Lua skript sõltub ühest autoriteetsest võtmeruumist. Mitu Redis eksemplari koopiate taga kaotaks aatomilisuse ja kahekordistaks eelarve. Kasutage kõigi rakenduste koopiate jaoks ühte Redis (või tõrkesiirdega Redis Sentinel-klastrit).

**Ühenduste arv:** Avaneb iga rakenduse koopia** 2 TCP ühendust** Redis (määra piiraja klient + kvoodipoe klient). 10 koopia korral → 20 ühendust, mis jääb Redis vaikeeksemplari 10 000 ühenduse piirmäära piiresse.

### 5. Seire

Esitage tervisekontrolli lõpp-punkti kaudu:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Peamised mõõdikud, mida vaadata:

- **Välja tõstetud võtmed / sek** — kui püsivalt nullist erinev, suurendage `maxmemory`
- **Blokeeritud kliendid** — mitte-null viitab aeglastele Lua skriptidele või kõrgele konkurentsile
- **Keelatud ühendused** — ühenduse limiit tabas; haruldane 20 ühenduse juures

### 6. Redis-ühilduvad serverid

Iga siin kasutatav server peab käivitama Lua skripte: kiiruse piiraja on üks `EVAL`. Ilma Lua-ta serveris logib `checkRateLimit()` `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` ja loendab protsessi kohta, nii et iga koopia jõustab piirangu ise. Valiku jagatud seansi affinity store (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) loeb ja värskendab ka kontakte `EVAL` abil; ilma Luata logib see `[SESSION_AFFINITY] Redis error; falling back to SQLite.` ja iga koopia säilitab oma tihvtid. Teised töökoormused kasutavad tavalisi käske (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, räsid ja komplektid) ning semantilise vahemälu Redis -taustaprogramm ei saada `FT.*` -käske.

Testitud versiooniga OmniRoute 3.8.52: KiviDB 1.2.0 koos selle Lua kujutisega (`kividb/kividb:v1.2.0-lua`). Kiiruse piiraja (sealhulgas loendureid jagav teine protsess), autentimisvahemälu, kvoodisalv, soojenduskaitselüliti, semantilise vahemälu salvestusruum ja vestluse töötleja kaudu `/v1/chat/completions` päring läbisid 18 19-st kontrollist, mis edastavad Redis 8.10.3. See, mis erineb: `INCRBYFLOAT` salvestab `0.1 + 0.2` kui `0.30000000000000004`, kus Redis salvestab `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Kvoodipood analüüsib mõlemat koodiga `parseFloat`, kuid need kaks numbrit erinevad viimaste numbrite poolest, nii et täpselt kvoodipiirile langev võrdlus võib välja tulla erinevalt. Seansi seotuse pood ei olnud selle käitamise osa. ( [seadistus](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [tulemused](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Arhitektuuriskeem

```mermaid
flowchart LR
    subgraph App["Rakenduse replika"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\njagatud)]
    AK -- "taaskasutab RL-i klienti" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nkvoodihoidla)]
    R1 --> R2 -- "võib olla sama eksemplar" --> R1
```

---

## Viited

| Fail                               | Otstarve                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Peamine Redise klient, Lua päringusageduse piiramise skript, mälupõhine varuvariant |
| `src/lib/db/apiKeys.ts`            | Autentimisvahemälu — Redis→SQLite varuvariant                                       |
| `src/lib/quota/redisQuotaStore.ts` | Eraldi Redise klient valikulise kvoodihoidla jaoks                                  |
| `src/lib/quota/storeFactory.ts`    | Vahetab kvoodidraivereid `sqlite` ja `redis`                                        |
| `docker-compose.prod.yml`          | Tootmiskeskkonna Redise konteiner (tõmmis `redis:8.6.2-alpine`)                     |
| `.env.example`                     | Redise keskkonnamuutujate dokumentatsioon                                           |
| `src/app/api/local/redis/`         | API marsruudid arenduskeskkonna konteineri orkestreerimiseks                        |
| `bin/cli/commands/redis.mjs`       | CLI käsud arenduskeskkonna konteineri orkestreerimiseks                             |
