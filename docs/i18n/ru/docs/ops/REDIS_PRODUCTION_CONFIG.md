# Redis Production Configuration Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇹 [am](../../../am/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇦 [ar](../../../ar/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇿 [az](../../../az/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇬 [bg](../../../bg/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇩 [bn](../../../bn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇦 [bs](../../../bs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇿 [cs](../../../cs/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇰 [da](../../../da/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇩🇪 [de](../../../de/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇷 [el](../../../el/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇸 [es](../../../es/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇪🇪 [et](../../../et/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇷 [fa](../../../fa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇮 [fi](../../../fi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇫🇷 [fr](../../../fr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇪 [ga](../../../ga/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [gu](../../../gu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ha](../../../ha/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇱 [he](../../../he/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [hi](../../../hi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇷 [hr](../../../hr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇭🇺 [hu](../../../hu/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇦🇲 [hy](../../../hy/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇩 [id](../../../id/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [ig](../../../ig/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇹 [it](../../../it/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇯🇵 [ja](../../../ja/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇬🇪 [ka](../../../ka/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇭 [km](../../../km/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [kn](../../../kn/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇷 [ko](../../../ko/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇹 [lt](../../../lt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇻 [lv](../../../lv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ml](../../../ml/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [mr](../../../mr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇾 [ms](../../../ms/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇹 [mt](../../../mt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇲🇲 [my](../../../my/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇵 [ne](../../../ne/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇱 [nl](../../../nl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇴 [no](../../../no/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [or](../../../or/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [pa](../../../pa/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇭 [phi](../../../phi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇱 [pl](../../../pl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇹 [pt](../../../pt/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇴 [ro](../../../ro/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇱🇰 [si](../../../si/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇰 [sk](../../../sk/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇮 [sl](../../../sl/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇷🇸 [sr](../../../sr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇸🇪 [sv](../../../sv/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇰🇪 [sw](../../../sw/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [ta](../../../ta/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇮🇳 [te](../../../te/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇭 [th](../../../th/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇷 [tr](../../../tr/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇵🇰 [ur](../../../ur/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇺🇿 [uz](../../../uz/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇻🇳 [vi](../../../vi/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇳🇬 [yo](../../../yo/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/REDIS_PRODUCTION_CONFIG.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/REDIS_PRODUCTION_CONFIG.md)

---

## Обзор

Redis — это **необязательная, некритичная зависимость** в OmniRoute: при недоступности Redis приложение продолжает работать с пониженной функциональностью (используя
резервные механизмы в памяти). В рабочей среде настройка Redis снижает задержки для четырёх отдельных
типов нагрузки:

| Тип нагрузки                        | Модуль                        | Фабрика клиента                                                 | Шаблон ключа                                                             |
| ----------------------------------- | ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Ограничение частоты запросов        | `rateLimiter.ts`              | `getRedisClient()` — лениво инициализируемый синглтон `ioredis` | `<prefix>rl:*` атомарные окна ограничения частоты запросов на основе Lua |
| Кеш аутентификации                  | `apiKeys.ts`                  | Повторно использует клиент из `rateLimiter`                     | `<prefix>auth:api_key:<sha256>` с TTL                                    |
| Хранилище квот                      | `redisQuotaStore.ts`          | Отдельный синглтон `getRedisClient(url)`                        | `<prefix>quota:*`, настраиваемый для каждого экземпляра                  |
| Автоматический выключатель прогрева | `redisCircuitBreakerStore.ts` | Отдельный клиент в `circuitBreakerFactory.ts`                   | `<prefix>warmup:cb:<connectionId>`                                       |

Все четыре типа нагрузки используют общий префикс пространства имён, чтобы OmniRoute мог сосуществовать с другими приложениями в
одном экземпляре Redis (например, `127.0.0.1:6379`). См. раздел [Пространство имён ключей](#key-namespacing).

---

## Текущая конфигурация (значения по умолчанию в коде)

| Параметр                                     | Значение                                                                                       | Где                                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Переменная окружения `REDIS_URL`             | `redis://redis:6379` (compose), необязательная                                                 | `rateLimiter.ts:5`, `.env.example`                                                    |
| Переменная окружения `REDIS_KEY_PREFIX`      | `omniroute:` (по умолчанию)                                                                    | `rateLimiter.ts`, `redisQuotaStore.ts`, `redisCircuitBreakerStore.ts`, `.env.example` |
| Переменная окружения `QUOTA_STORE_REDIS_URL` | отдельная, может отличаться от `REDIS_URL`                                                     | `quota/storeFactory.ts`                                                               |
| `QUOTA_STORE_DRIVER`                         | `"sqlite"` (по умолчанию), `"redis"` опционально                                               | `quota/storeFactory.ts`                                                               |
| `maxRetriesPerRequest` в ioredis             | `3`                                                                                            | создание клиента в `rateLimiter.ts`                                                   |
| `enableReadyCheck`                           | не задано (значение ioredis по умолчанию: `true`)                                              | —                                                                                     |
| `lazyConnect`                                | не задано (значение ioredis по умолчанию: `false`)                                             | —                                                                                     |
| `retryStrategy`                              | не задано (значение ioredis по умолчанию: базовая задержка 200ms, экспоненциальное увеличение) | —                                                                                     |
| TLS / пароль / индекс БД                     | **не настроено**                                                                               | —                                                                                     |
| Sentinel / Cluster                           | **не настроено** — поддерживается только автономный одиночный узел                             | —                                                                                     |

---

## Пространство имён ключей

OmniRoute совместно использует экземпляр Redis со всеми остальными сервисами, работающими на хосте. Без пространства имён
такие ключи, как `auth:api_key:<sha256>` или `rl:*`, могут конфликтовать с ключами других приложений,
использующих тот же Redis (этот экземпляр Redis работает по адресу `127.0.0.1:6379` вместе с другими сервисами).

Задайте для `REDIS_KEY_PREFIX` непустую строку, чтобы добавить префикс к **каждому** ключу OmniRoute:

```bash
# .env — все ключи OmniRoute будут иметь вид omniroute:rl:*, omniroute:auth:*, omniroute:quota:*, omniroute:warmup:cb:*
REDIS_KEY_PREFIX=omniroute:
```

- **По умолчанию:** `omniroute:` (применяется, если `REDIS_KEY_PREFIX` не задан или пуст).
- **Применяется к:** ограничителю частоты запросов + кешу аутентификации (общий клиент `ioredis` через `keyPrefix`), а также
  хранилищу квот (`KEY_PREFIX = "${REDIS_KEY_PREFIX}quota"`) и автоматическому выключателю прогрева
  (`KEY_PREFIX = "${REDIS_KEY_PREFIX}warmup:cb:"`).
- **Изменение префикса** при наличии ключей в Redis делает старые ключи недоступными (они удаляются
  по TTL / LRU). Префикс можно безопасно изменить; миграция не требуется. Единственное исключение — ключ автоматического
  выключателя прогрева для подключения, помеченного как запрещённое: он сохраняется без TTL, поэтому
  найдите оставшиеся ключи с помощью `redis-cli --scan --pattern '<old-prefix>warmup:cb:*'` и удалите их.
- **`keyPrefix` в ioredis** автоматически добавляет префикс при записи **и** удаляет его при чтении,
  поэтому код приложения никогда не видит префикс.

---

## Рекомендуемая настройка производства

### 1. Пул соединений/Параметры клиента (конструктор ioredis `Redis` )

Текущий код создает один `new Redis(url)` без каких-либо настраиваемых параметров. Для производственных развертываний с несколькими репликами передайте клиентскую фабрику в коде или оберните `getRedisClient()`:

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

**Ключевые компромиссы:**

- `maxRetriesPerRequest: null` + `retryStrategy` — предпочтительнее для рабочей среды, поэтому временные перезапуски Redis не приводят к немедленному сбою каждого запроса. Резервный вариант в памяти в `checkRateLimit()` поглощает путь отказа.
- `lazyConnect: true` — позволяет избежать зависимости запуска от запуска Redis до того, как сервер начнет принимать соединения.
- `enableAutoPipelining: true` — сокращает число циклов одновременных проверок ограничения скорости; выгодно по > 50 RPS за одно соединение.

### 2. Конфигурация сервера Redis (`redis.conf`)

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

**Компромисс для `maxmemory-policy allkeys-lru`:** Записи кэша аутентификации могут быть удалены из-за нехватки памяти. Это безопасно. — `setCachedApiKey` всегда повторно заполняется при промахе, а резервный вариант SQLite является авторитетным. Сценарий Lua с ограничителем скорости создает маленькие ключи, которые по своей конструкции недолговечны.

### 3. Настройки Docker Compose

Prod Compose (`docker-compose.prod.yml`) использует `redis:8.6.2-alpine`. Добавлять:

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

### 4. Многоэкземплярность/соображения масштабирования

**Единый Redis для всех реплик** — Lua-скрипт ограничителя скорости зависит от одного авторитетного ключевого пространства. Несколько экземпляров Redis за репликами потеряют атомарность и удвоят бюджет. Используйте один Redis (или кластер Redis Sentinel с отработкой отказа) для всех реплик приложений.

**Количество подключений:** Каждая реплика приложения открывается** 2 соединения TCP** в Redis (клиент-ограничитель скорости, клиент хранилища квот + ). При 10 репликах → 20 подключений, что вполне соответствует потолку в 10 тыс. подключений экземпляра Redis по умолчанию.

### 5. Мониторинг

Экспонирование через конечную точку проверки работоспособности:

```typescript
// src/app/api/monitoring/health/route.ts already calls rateLimiter functions
// Add Redis-specific checks:
//   1. PING latency via ioredis .ping()
//   2. Memory usage via INFO memory
//   3. Connection count via INFO clients
//   4. Hit rate for maxmemory-policy (evicted_keys / keyspace_hits)
```

Ключевые показатели, за которыми стоит следить:

- **Выселенных ключей/сек.** — если постоянно ненулевое значение, увеличьте `maxmemory`
- **Заблокированные клиенты** Ненулевое значение — предполагает медленные сценарии Lua или высокую конкуренцию
- **Отклоненные соединения** превышен лимит подключений — ; редко при 20 соединениях

### 6. Серверы, совместимые с Redis

Любой сервер, используемый здесь, должен запускать скрипты Lua: ограничитель скорости — один `EVAL`. На сервере без Lua `checkRateLimit()` регистрирует `[RATE_LIMITER] Redis eval failed, falling back to in-memory rate limiting` и подсчитывает количество процессов для каждого процесса, поэтому каждая реплика устанавливает ограничение самостоятельно. Включаемое общее хранилище привязки сеансов (`OMNIROUTE_SESSION_AFFINITY_STORE=redis`) также считывает и обновляет контакты с помощью `EVAL`; без Lua он регистрирует `[SESSION_AFFINITY] Redis error; falling back to SQLite.`, и каждая реплика сохраняет свои собственные контакты. Другие рабочие нагрузки используют простые команды (`SET ... EX`, `GET`, `DEL`, `MGET`, `EXPIRE`, `INCRBYFLOAT`, хэши и наборы), а серверная часть Redis семантического кэша не отправляет команды `FT.*`.

Протестировано с OmniRoute 3.8.52: KiviDB 1.2.0 с его изображением Lua (`kividb/kividb:v1.2.0-lua`). Ограничитель скорости (включая второй процесс, совместно использующий счетчики), кеш аутентификации, хранилище квот, прерыватель цепи прогрева, хранилище семантического кэша и запрос `/v1/chat/completions` через обработчик чата прошли 18 из 19 проверок, которые проходят в Redis 8.10.3. Отличие: `INCRBYFLOAT` хранит `0.1 + 0.2` как `0.30000000000000004`, где Redis хранит `0.3` ( [kividbio/kividb#387](https://github.com/kividbio/kividb/issues/387) ). Хранилище квот анализирует оба числа с помощью `parseFloat`, но эти два числа различаются последними цифрами, поэтому сравнение, попадающее точно на границу квоты, может получиться по-другому. Хранилище привязки сеансов не было частью этого запуска. ( [настройка](https://github.com/kividbio/kividb/blob/master/docs/integrations/omniroute.md), [результаты](https://github.com/kividbio/kividb/tree/master/benchmarks/omniroute-compat) )

---

## Диаграмма архитектуры

```mermaid
flowchart LR
    subgraph App["Реплика приложения"]
        RL[rateLimiter.ts]
        AK[apiKeys.ts]
        QS[redisQuotaStore.ts]
    end
    RL -- "REDIS_URL" --> R1[(Redis\nобщий)]
    AK -- "повторно использует клиент RL" --> R1
    QS -- "QUOTA_STORE_REDIS_URL" --> R2[(Redis\nхранилище квот)]
    R1 --> R2 -- "может быть тем же экземпляром" --> R1
```

---

## Справочные материалы

| Файл                               | Назначение                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/shared/utils/rateLimiter.ts`  | Основной клиент Redis, Lua-скрипт ограничения частоты запросов, резервный вариант в памяти |
| `src/lib/db/apiKeys.ts`            | Кеш аутентификации — резервный переход с Redis на SQLite                                   |
| `src/lib/quota/redisQuotaStore.ts` | Отдельный клиент Redis для опционального хранилища квот                                    |
| `src/lib/quota/storeFactory.ts`    | Переключает драйверы квот между `sqlite` и `redis`                                         |
| `docker-compose.prod.yml`          | Контейнер Redis для продакшена (образ `redis:8.6.2-alpine`)                                |
| `.env.example`                     | Документация по переменным окружения Redis                                                 |
| `src/app/api/local/redis/`         | Маршруты API для оркестрации контейнера разработки                                         |
| `bin/cli/commands/redis.mjs`       | Команды CLI для оркестрации контейнера разработки                                          |
