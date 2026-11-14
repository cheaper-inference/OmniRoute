# Redis Production Configuration Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇺 [ru](../../../ru/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Visão geral

O Redis é uma **dependência opcional e não obrigatória** no OmniRoute — a aplicação reduz graciosamente as suas funcionalidades (recorrendo a alternativas
em memória) quando o Redis não está disponível. Em produção, o ajuste do Redis reduz a latência de quatro cargas de trabalho
distintas:

| Carga de trabalho        | Controlador                   | Fábrica de clientes                                                 | Padrão de chave                                          |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| Limitação de taxa        | `rateLimiter.ts`              | `getRedisClient()` — singleton `ioredis` com inicialização diferida | Janelas de limitação de taxa Lua atómicas `<prefix>rl:*` |
| Cache de autenticação    | `apiKeys.ts`                  | Reutiliza o cliente de `rateLimiter`                                | `<prefix>auth:api_key:<sha256>` com TTL                  |
| Armazenamento de quotas  | `redisQuotaStore.ts`          | Singleton `getRedisClient(url)` separado                            | `<prefix>quota:*` configurável por instância             |
| Disjuntor de aquecimento | `redisCircuitBreakerStore.ts` | Cliente separado em `circuitBreakerFactory.ts`                      | `<prefix>warmup:cb:<connectionId>`                       |

As quatro cargas de trabalho partilham um único prefixo de espaço de nomes, para que o OmniRoute possa coexistir com outras aplicações numa
única instância do Redis (por exemplo, `127.0.0.1:6379`). Consulte [Espaços de nomes das chaves](#key-namespacing).

---

## Configuração atual (predefinições do código)

| Definição                                    | Valor                                                              | Localização                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Variável de ambiente `REDIS_URL`             | `redis://redis:6379` (compose), opcional                           | `rateLimiter.ts:5`, `.env.example`                                                    |
| Variável de ambiente `REDIS_KEY_PREFIX`      | `omniroute:` (predefinição)                                        | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| Variável de ambiente `QUOTA_STORE_REDIS_URL` | separada, pode ser diferente de `REDIS_URL`                        | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`                         | `"sqlite"` (predefinição), `"redis"` opcional                      | `quota/storeFactory.ts`                                                               |
| `maxRetriesPerRequest` do ioredis            | `3`                                                                | criação do cliente em `rateLimiter.ts`                                                |
| `enableReadyCheck`                           | não definido (predefinição do ioredis: `true`)                     | —                                                                                     |
| `lazyConnect`                                | não definido (predefinição do ioredis: `false`)                    | —                                                                                     |
| `retryStrategy`                              | não definido (predefinição do ioredis: base de 200ms, exponencial) | —                                                                                     |
| TLS / palavra-passe / índice da BD           | **não configurados**                                               | —                                                                                     |
| Sentinel / Cluster                           | **não configurados** — apenas nó único autónomo                    | —                                                                                     |

---

## Espaços de nomes das chaves

O OmniRoute partilha uma instância do Redis com quaisquer outros serviços executados no anfitrião. Sem um espaço de nomes,
chaves como `auth:api_key:<sha256>` ou `rl:*` podem entrar em conflito com chaves de outras aplicações
que utilizem o mesmo Redis (esta instância executa o Redis em `127.0.0.1:6379` juntamente com outros serviços).

Defina `REDIS_KEY_PREFIX` como uma cadeia não vazia para adicionar um prefixo a **todas** as chaves do OmniRoute:

```bash
# .env — todas as chaves do OmniRoute passam a ser omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **Predefinição:** `omniroute:` (aplicada quando `REDIS_KEY_PREFIX` não está definida ou está vazia).
- **Aplicado a:** limitador de taxa + cache de autenticação (cliente `ioredis` partilhado através de `keyPrefix`), ao
  armazenamento de quotas (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) e ao disjuntor de aquecimento
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Alterar o prefixo** quando já existem chaves no Redis torna as chaves antigas órfãs (expiram
  através de TTL / LRU). A alteração é segura; não é necessária qualquer migração. A única exceção é uma chave do
  disjuntor de aquecimento para uma ligação marcada como proibida: esta é persistida sem TTL, pelo que deve
  listar os resíduos com `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` e eliminá-los.
- O **`keyPrefix` do ioredis** adiciona automaticamente o prefixo nas escritas **e** remove-o nas leituras,
  pelo que o código da aplicação nunca vê o prefixo.

---

## Ajuste de produção recomendado

### 1. Opções de pool de ligação/cliente (construtor ioredis `Redis` )

O código atual cria um único `new Redis(url)` sem opções personalizadas. Para implementações de múltiplas réplicas de produção, passe uma fábrica do cliente no código ou envolva `getRedisClient()`:

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

**Principais compensações:**

- `maxRetriesPerRequest: null` + `retryStrategy` — preferido para produção, para que as reinicializações transitórias Redis não falhem imediatamente em todos os pedidos. O fallback na memória no `checkRateLimit()` absorve o caminho da falha.
- `lazyConnect: true` — evita que uma dependência de arranque do Redis esteja ativo antes de o servidor começar a aceitar ligações.
- `enableAutoPipelining: true` — reduz as viagens de ida e volta para verificações simultâneas do limite de taxas; benéfico em > 50 RPS numa única ligação.

### 2. Configuração do servidor Redis (`redis.conf`)

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

**Compensação para `maxmemory-policy allkeys-lru`:** As entradas da cache de autenticação podem ser removidas sob pressão de memória. Isto é seguro — `setCachedApiKey` é sempre novamente preenchido em caso de falha, e o substituto SQLite é oficial. O script Lua do limitador de taxa cria pequenas chaves que têm uma vida curta por design.

### 3. Configurações de composição Docker

O prod compose (`docker-compose.prod.yml`) utiliza `redis:8.6.2-alpine`. Adicionar:

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

### 4. Considerações sobre multiinstâncias/escalonamento

**Redis único para todas as réplicas** — o script Lua do limitador de taxa depende de um único espaço de chaves autorizado. Várias instâncias Redis atrás de réplicas perderiam a atomicidade e duplicariam o orçamento. Utilize um único Redis (ou cluster Redis Sentinel com failover) para todas as réplicas de aplicações.

**Contagem de ligações:** Cada réplica de aplicação é aberta** 2 ligações TCP** para Redis (cliente limitador de taxa + quota store client). Com 10 réplicas → 20 ligações, bem dentro do limite máximo de ligações de 10k de uma instância Redis padrão.

### 5. Monitorização

Expor através de endpoint de verificação de integridade:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Principais métricas a observar:

- **Chaves despejadas/s** — se persistentemente diferente de zero, aumente `maxmemory`
- **Clientes bloqueados** — diferente de zero sugere scripts Lua lentos ou alta contenção
- **Conexões rejeitadas** limite de ligação — atingido; raro em 20 ligações

### 6. Servidores compatíveis com o Redis

Qualquer servidor aqui utilizado deve executar scripts Lua: o limitador de taxa é um `EVAL`. Num servidor sem Lua, `checkRateLimit()` regista `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` e conta por processo, de modo a que cada réplica imponha o limite por si só. O armazenamento de afinidade de sessão partilhada opcional (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) também lê e atualiza os pinos com `EVAL`; sem Lua regista `[SESSION_AFFINITY] Redis error; falling back to SQLite.` e cada réplica mantém os seus próprios pins. As outras cargas de trabalho utilizam comandos simples (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, hashes e sets), e o back-end Redis da cache semântica não envia comandos `FT.*`.

Testado com OmniRoute 3.8.52: KiviDB 1.2.0 com a sua imagem Lua (`kividb/kividb:v1.2.0-lua`). O limitador de taxa (incluindo um segundo processo que partilha os contadores), a cache de autenticação, o armazenamento de quotas, o disjuntor de aquecimento, o armazenamento de cache semântico e um pedido `/v1/chat/completions` através do manipulador de chat passaram 18 das 19 verificações aprovadas no Redis 8.10.3. O que difere: `INCRBYFLOAT` armazena `0.1 + 0.2` como `0.30000000000000004` onde Redis armazena `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). O armazenamento de quotas analisa ambos com `parseFloat`, mas os dois números diferem nos últimos dígitos, pelo que uma comparação que caia exatamente num limite de quota pode sair de forma diferente. O armazenamento de afinidade de sessão não fez parte desta execução. ( [configuração](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [resultados](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Diagrama de Arquitetura

```mermaid
flowchart LR
    subgraph App["Réplica da Aplicação"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\npartilhado)]
    AK -- "reutiliza o cliente de RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\narmazenamento de quotas)]
    R1 --> R2 -- "pode ser a mesma instância" --> R1
```

---

## Referências

| Ficheiro                           | Finalidade                                                                          |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `src/shared/utils/rateLimiter.ts`  | Cliente Redis principal, script Lua de limitação de pedidos, alternativa em memória |
| `src/lib/db/apiKeys.ts`            | Cache de autenticação — alternativa Redis→SQLite                                    |
| `src/lib/quota/redisQuotaStore.ts` | Cliente Redis separado para o armazenamento de quotas opcional                      |
| `src/lib/quota/storeFactory.ts`    | Alterna entre os controladores de quotas `sqlite` e `redis`                         |
| `docker-compose.prod.yml`          | Contentor Redis de produção (imagem `redis:8.6.2-alpine`)                           |
| `.env.example`                     | Documentação das variáveis de ambiente do Redis                                     |
| `src/app/api/local/redis/`         | Rotas da API para orquestração do contentor de desenvolvimento                      |
| `bin/cli/commands/redis.mjs`       | Comandos da CLI para orquestração do contentor de desenvolvimento                   |
