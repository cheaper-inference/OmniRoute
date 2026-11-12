# Redis Production Configuration Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Ülevaade

Redis on **valikuline, pehme sõltuvus** OmniRoute — taandub rakendus graatsiliselt (mälus olevad varud), kui Redis pole saadaval. Tootmises vähendab Redis häälestamine latentsusaega nelja erineva töökoormuse jaoks:

| Töökoormus        | Juht                          | Kliendi tehas                                  | Võtme muster                                       |
| ----------------- | ----------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| Kiiruse piiramine | `rateLimiter.ts`              | `getRedisClient()` — laisk `ioredis` singleton | `<prefix>rl:*` Lua-aatomi kiiruspiirangu aknad     |
| Auth vahemälu     | `apiKeys.ts`                  | Taaskasutab `rateLimiter` klienti              | `<prefix>auth:api_key:<sha256>` koos TTL           |
| Kvoodipood        | `redisQuotaStore.ts`          | Eraldi `getRedisClient(url)` üksiktoon         | `<prefix>quota:*` konfigureeritav eksemplari kohta |
| Soojenduslüliti   | `redisCircuitBreakerStore.ts` | Eraldi klient `circuitBreakerFactory.ts` s     | `<prefix>warmup:cb:<connectionId>`                 |

Kõik neli töökoormust jagavad ühte nimeruumi eesliidet, nii et OmniRoute saab eksisteerida koos teiste rakendustega ühes Redis eksemplaris (nt `127.0.0.1:6379`). Vt [Võtme nimevahed](#key-namespacing).

---

## Praegune konfiguratsioon (koodi vaikeseaded)

| Seadistamine                    | Väärtus                                                           | Kus                                                                                   |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `REDIS_URL` env var             | `redis://redis:6379` (koostamine), valikuline                     | `rateLimiter.ts:5`, `.env.example`                                                    |
| `REDIS_KEY_PREFIX` env var      | `omniroute:` (vaikimisi)                                          | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| `QUOTA_STORE_REDIS_URL` env var | eraldi, võib erineda `REDIS_URL`                                  | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`            | `"sqlite"` (vaikimisi), `"redis"` valikuline                      | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`  | `3`                                                               | `rateLimiter.ts` kliendi loomine                                                      |
| `enableReadyCheck`              | pole määratud (ioredise vaikimisi: `true`)                        | —                                                                                     |
| `lazyConnect`                   | pole määratud (ioredise vaikimisi: `false`)                       | —                                                                                     |
| `retryStrategy`                 | pole määratud (ioredise vaikimisi: 200 ms baas, eksponentsiaalne) | —                                                                                     |
| TLS / parool / DB indeks        | **pole konfigureeritud**                                          | —                                                                                     |
| Sentinel / klaster              | **pole konfigureeritud** Ainult — eraldiseisev ühe sõlmega        | —                                                                                     |

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

Praegune kood loob ühe `new Redis(url)`, millel pole kohandatud valikuid. Mitme koopia tootmiseks juurutamiseks edastage kliendi tehas koodis või mähitage `getRedisClient()`:

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

- `maxRetriesPerRequest: null` + `retryStrategy` — eelistatakse tootmiseks, nii et mööduvad Redis taaskäivitused ei kukuks kohe iga taotluse läbi. `checkRateLimit()` -i mälusisene varu neelab tõrketee.
- `lazyConnect: true` — väldib käivitamisel sõltuvust sellest, et Redis on üleval enne, kui server hakkab ühendusi vastu võtma.
- `enableAutoPipelining: true` — vähendab edasi-tagasi lende samaaegsete piirmäärade kontrollide jaoks; kasulik > 50 RPS ühe ühenduse korral.

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

**Kompromiss `maxmemory-policy allkeys-lru` jaoks:** Vahemälu autentimiskirjed võidakse mälu surve all välja tõsta. See on turvaline. — `setCachedApiKey` täidetakse vahelejäämise korral alati uuesti ja SQLite varuvaru on autoriteetne. Kiirusepiiraja Lua skript loob väikesed võtmed, mis on disainilt lühiajalised.

### 3. Docker koostamisseaded

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

**Üks Redis kõigi koopiate jaoks** — kiiruspiiraja Lua skript sõltub ühest autoriteetsest võtmeruumist. Mitu Redis eksemplari koopiate taga kaotaks tuumasuse ja kahekordistaks eelarve. Kasutage kõigi rakenduste koopiate jaoks ühte Redis (või tõrkesiirdega Redis Sentineli klastrit).

**Ühenduste arv:** Avaneb iga rakenduse koopia **2 TCP ühendust** Redis (määra piiraja klient + kvoodipoe klient). 10 → 20 ühenduse koopia puhul, mis jääb Redis eksemplari vaikeeksemplari 10 000 ühenduse ülemmäära piiresse.

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

- **Välja tõstetud võtmed / sek** Kui — on püsivalt nullist erinev, suurendage `maxmemory`
- **Blokeeritud kliendid** — mis ei ole null, viitab aeglastele Lua skriptidele või kõrgele konkurentsile
- **Keelatud ühendused** — ühenduse limiit tabas; haruldane 20 ühenduse juures

### 6. Redis-ühilduvad serverid

Iga siin kasutatav server peab käivitama Lua skripte: kiiruse piiraja on üks `EVAL`. Lua-ta serveris logib `checkRateLimit()` `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` ja loendab protsessi kohta, nii et iga koopia jõustab piirangu ise. Valitud jagatud seansi affinity store (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) loeb ja värskendab ka kontakte `EVAL` abil; ilma Luata logib see `[SESSION_AFFINITY] Redis error; falling back to SQLite.` ja iga koopia säilitab oma tihvtid. Teised töökoormused kasutavad tavalisi käske (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, räsid ja komplektid) ning semantilise vahemälu Redis -i taustaprogramm ei saada `FT.*` käske.

Testitud versiooniga OmniRoute 3.8.52: KiviDB 1.2.0 koos selle Lua kujutisega (`kividb/kividb:v1.2.0-lua`). Kiiruse piiraja (sealhulgas loendureid jagav teine protsess), autentimisvahemälu, kvoodisalv, soojenduskaitselüliti, semantiline vahemälu salvestamine ja vestluse töötleja kaudu edastatud `/v1/chat/completions` päring läbisid 18 19-st Redis 8.10.3 kontrollimisest. See, mis erineb: `INCRBYFLOAT` salvestab `0.1 + 0.2` kui `0.30000000000000004`, kus Redis salvestab `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Kvoodipood analüüsib mõlemat koodiga `parseFloat`, kuid need kaks numbrit erinevad viimaste numbrite poolest, nii et täpselt kvoodipiirile langev võrdlus võib välja tulla erinevalt. Seansi seotuse pood ei olnud selle käitamise osa. ( [seadistus](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [tulemused](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

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

| Fail                               | Eesmärk                                                         |
| ---------------------------------- | --------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Esmane Redis klient, Lua kiiruspiirangu skript, mälusisene varu |
| `src/lib/db/apiKeys.ts`            | Vahemälu autentimine — Redis→SQLite varundus                    |
| `src/lib/quota/redisQuotaStore.ts` | Eraldi Redis klient valikulise kvoodipoe jaoks                  |
| `src/lib/quota/storeFactory.ts`    | Lülitab `sqlite` ja `redis` kvoodidraiverite vahel              |
| `docker-compose.prod.yml`          | Prod Redis konteiner (pilt `redis:8.6.2-alpine`)                |
| `.env.example`                     | Redis env vars dokumentatsioon                                  |
| `src/app/api/local/redis/`         | API marsruudid arendaja konteinerite orkestreerimiseks          |
| `bin/cli/commands/redis.mjs`       | CLI käsud arendaja konteineri orkestreerimiseks                 |
