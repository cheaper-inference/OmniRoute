# Redis Production Configuration Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Prehľad

Redis je **voliteľná, mäkká závislosť** v OmniRoute — sa aplikácia ladne degraduje (výpadky v pamäti), keď Redis nie je k dispozícii. V produkcii ladenie Redis znižuje latenciu pre štyri rôzne pracovné zaťaženia:

| Pracovná záťaž    | Vodič                         | Klientsky závod                                 | Kľúčový vzor                                                |
| ----------------- | ----------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| Obmedzenie sadzby | `rateLimiter.ts`              | `getRedisClient()` — lenivý `ioredis` singleton | Okná limitu atómovej rýchlosti `<prefix>rl:*` Lua           |
| Auth cache        | `apiKeys.ts`                  | Opätovne používa klienta `rateLimiter`          | `<prefix>auth:api_key:<sha256>` so TTL                      |
| Obchod s kvótami  | `redisQuotaStore.ts`          | Samostatný singleton `getRedisClient(url)`      | `<prefix>quota:*` konfigurovateľné pre jednotlivé inštancie |
| Zahrievací istič  | `redisCircuitBreakerStore.ts` | Samostatný klient v `circuitBreakerFactory.ts`  | `<prefix>warmup:cb:<connectionId>`                          |

Všetky štyri pracovné zaťaženia zdieľajú jednu predponu menného priestoru, takže OmniRoute môže koexistovať s inými aplikáciami v jednej inštancii Redis (napr. `127.0.0.1:6379`). Pozri [Key Namespace](#key-namespacing).

---

## Aktuálna konfigurácia (predvolené nastavenia kódu)

| Nastavenie                      | Hodnota                                                                        | Kde                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `REDIS_URL` env var             | `redis://redis:6379` (komponovať), voliteľné                                   | `rateLimiter.ts:5`, `.env.example`                                                    |
| `REDIS_KEY_PREFIX` env var      | `omniroute:` (predvolené)                                                      | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| `QUOTA_STORE_REDIS_URL` env var | samostatné, môže sa líšiť od `REDIS_URL`                                       | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`            | `"sqlite"` (predvolené), `"redis"` voliteľné                                   | `quota/storeFactory.ts`                                                               |
| ioredis `maxRetriesPerRequest`  | `3`                                                                            | Vytvorenie klienta `rateLimiter.ts`                                                   |
| `enableReadyCheck`              | nie je nastavené (predvolené nastavenie ioredis: `true`)                       | —                                                                                     |
| `lazyConnect`                   | nie je nastavené (predvolené nastavenie ioredis: `false`)                      | —                                                                                     |
| `retryStrategy`                 | nie je nastavené (predvolené nastavenie ioredis: základ 200 ms, exponenciálne) | —                                                                                     |
| TLS / heslo / index DB          | **nie je nakonfigurovaný**                                                     | —                                                                                     |
| Sentinel / Cluster              | **nie je nakonfigurovaný** Iba samostatný jednouzlový uzol —                   | —                                                                                     |

---

## Menné priestory kľúčov

OmniRoute zdieľa inštanciu Redis so všetkým ostatným, čo je spustené na hostiteľovi. Bez menného priestoru by mohlo dôjsť ku kolízii kľúčov, ako sú `auth:api_key:<sha256>` alebo `rl:*`, s kľúčmi iných aplikácií používajúcich rovnaký Redis (táto inštancia používa Redis na adrese `127.0.0.1:6379` spolu s ďalšími službami).

Nastavte `REDIS_KEY_PREFIX` na neprázdny reťazec, ktorý sa pridá pred **každý** kľúč OmniRoute:

```bash
# .env — všetky kľúče OmniRoute budú mať podobu omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **Predvolená hodnota:** `omniroute:` (použije sa, keď `REDIS_KEY_PREFIX` nie je nastavená alebo je prázdna).
- **Používa sa pre:** obmedzovač frekvencie požiadaviek + vyrovnávaciu pamäť autentifikácie (zdieľaný klient `ioredis` prostredníctvom `keyPrefix`), úložisko kvót (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) a istič zahrievania (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Zmena predpony**, keď už kľúče v Redis existujú, spôsobí, že staré kľúče zostanú nepoužívané (ich platnosť skončí prostredníctvom TTL / LRU). Zmena je bezpečná; migrácia nie je potrebná. Jedinou výnimkou je kľúč ističa zahrievania pre pripojenie označené ako zakázané: ukladá sa bez TTL, preto zostávajúce kľúče vypíšte pomocou `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` a odstráňte ich.
- **`keyPrefix` v ioredis** automaticky pridáva predponu pri zápise **a** odstraňuje ju pri čítaní, takže aplikačný kód predponu nikdy nevidí.

---

## Odporúčané výrobné ladenie

### 1. Oblasť pripojení / Možnosti klienta (ioredis `Redis` konštruktor)

Aktuálny kód vytvára jeden `new Redis(url)` bez vlastných možností. Pre produkčné nasadenia s viacerými replikami odovzdajte továreň klienta v kóde alebo zabaľte `getRedisClient()`:

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

**Kľúčové kompromisy:**

- `maxRetriesPerRequest: null` + `retryStrategy` — sa uprednostňuje pri výrobe, takže prechodné reštarty Redis nezlyhajú okamžite pri každej požiadavke. Záložná funkcia v pamäti v `checkRateLimit()` absorbuje cestu zlyhania.
- `lazyConnect: true` — sa vyhýba závislosti spustenia od toho, že Redis je zapnuté predtým, ako server začne prijímať pripojenia.
- `enableAutoPipelining: true` — redukuje spiatočné lety pre súbežné kontroly rýchlostných limitov; výhodné pri > 50 RPS na jedno pripojenie.

### 2. Konfigurácia servera Redis (`redis.conf`)

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

**Výmena za `maxmemory-policy allkeys-lru`:** Auth cache položky môžu byť vymazané pod tlakom pamäte. Toto je bezpečné, — `setCachedApiKey` sa vždy znova naplní, keď sa nestihne, a záložné riešenie SQLite je smerodajné. Skript Lua s obmedzovačom rýchlosti vytvára malé klávesy, ktorých životnosť je krátka.

### 3. Nastavenia Docker Compose

Prod compose (`docker-compose.prod.yml`) používa `redis:8.6.2-alpine`. Pridať:

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

### 4. Úvahy o viacerých inštanciách / škálovaní

**Jediný Redis pre všetky repliky** — skript Lua obmedzovača rýchlosti závisí od jedného autoritatívneho kľúčového priestoru. Viaceré inštancie Redis za replikami by stratili atomicitu a zdvojnásobili by rozpočet. Použite jeden Redis (alebo klaster Redis Sentinel s núdzovým prepnutím) pre všetky repliky aplikácií.

**Počet pripojení:** Otvorí sa každá replika aplikácie **2 pripojenia TCP** na Redis (klient úložiska kvót + s obmedzovačom rýchlosti). Pri 10 replikách pripojení → 20, v rámci 10k stropu pripojenia predvolenej inštancie Redis.

### 5. Monitorovanie

Vystaviť prostredníctvom koncového bodu kontroly stavu:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Kľúčové metriky na sledovanie:

- **Vysunuté kľúče / sek** Ak je — trvalo nenulové, zvýšte `maxmemory`
- **Blokovaní klienti** — nenulové naznačuje pomalé skripty Lua alebo vysokú hádku
- **Odmietnuté spojenia** Dosiahnutie limitu pripojenia — ; vzácne pri 20 spojeniach

### 6. Servery kompatibilné s Redis

Každý server, ktorý sa tu používa, musí spúšťať skripty Lua: obmedzovač rýchlosti je jeden `EVAL`. Na serveri bez Lua `checkRateLimit()` zaznamená `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` a počíta za proces, takže každá replika vynucuje limit sám. Voliteľný obchod zdieľanej relácie afinity (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) tiež číta a aktualizuje piny pomocou `EVAL`; bez Lua zaznamená `[SESSION_AFFINITY] Redis error; falling back to SQLite.` a každá replika si ponechá svoje vlastné piny. Ostatné pracovné zaťaženia používajú obyčajné príkazy (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashe a sady) a backend Redis sémantickej vyrovnávacej pamäte neposiela žiadne príkazy `FT.*`.

Testované so OmniRoute 3.8.52: KiviDB 1.2.0 s obrazom Lua (`kividb/kividb:v1.2.0-lua`). Obmedzovač rýchlosti (vrátane druhého procesu zdieľajúceho počítadlá), auth cache, úložisko kvót, istič zahrievacieho obvodu, úložisko sémantickej vyrovnávacej pamäte a požiadavka `/v1/chat/completions` cez obslužný program chatu prešli 18 z 19 kontrol, ktoré prešli na Redis 8.10.3. Ten, ktorý sa líši: `INCRBYFLOAT` ukladá `0.1 + 0.2` ako `0.30000000000000004`, kde Redis ukladá `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Úložisko kvót analyzuje obe pomocou `parseFloat`, ale tieto dve čísla sa líšia v posledných čísliciach, takže porovnanie, ktoré presne spadá na hranicu kvóty, môže vyjsť inak. Úložisko relácií afinity nebolo súčasťou tohto behu. ( [nastavenie](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [výsledky](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Diagram architektúry

```mermaid
flowchart LR
    subgraph App["Replika aplikácie"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nzdieľaný)]
    AK -- "opätovne používa klienta RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\núložisko kvót)]
    R1 --> R2 -- "môže byť rovnaká inštancia" --> R1
```

---

## Referencie

| Súbor                              | Účel                                                             |
| ---------------------------------- | ---------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Primárny klient Redis, skript limitu sadzby Lua, záloha v pamäti |
| `src/lib/db/apiKeys.ts`            | Auth cache — Redis→SQLite núdzová                                |
| `src/lib/quota/redisQuotaStore.ts` | Samostatný klient Redis pre voliteľné úložisko kvót              |
| `src/lib/quota/storeFactory.ts`    | Prepína medzi ovládačmi kvóty `sqlite` a `redis`                 |
| `docker-compose.prod.yml`          | Prod Redis kontajner (obrázok `redis:8.6.2-alpine`)              |
| `.env.example`                     | Redis env vars dokumentácia                                      |
| `src/app/api/local/redis/`         | Trasy API pre organizáciu kontajnerov pre vývojárov              |
| `bin/cli/commands/redis.mjs`       | Príkazy CLI pre dev kontajnerovú orchestráciu                    |
