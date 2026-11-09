# Resilience Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute tiene tres mecanismos de resiliencia distintos pero relacionados. Cada uno tiene un alcance y propósito diferente. Manténgalos separados al depurar el comportamiento de enrutamiento.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Fuente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Prioridad de entorno frente a panel para cambios de resiliencia.** Los conmutadores de resistencia de inclusión seleccionados desde el entorno — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — solo proporcionan el _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Un booleano persistió en `resilienceSettings` (Dashboard →** Configuración de resiliencia →** / `PATCH /api/resilience`, almacenado en `key_value`) gana sobre el valor env: la normalización (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mantiene el booleano almacenado siempre que exista. Establecer dicha var de entorno en `true` en una implementación donde el panel ya guardó `false` por lo tanto, no cambia nada — activa la palanca** Configuración de resiliencia →** (o borre el campo almacenado) en su lugar.

## 1. Circuit Breaker de proveedor

**Alcance:** proveedor completo (p. ej., `glm`, `openai`, `anthropic`).

**Propósito:** dejar de enviar tráfico a un proveedor que está fallando repetidamente a nivel de servicio ascendente (upstream).

**Implementación:**

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Integración: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de restablecimiento: `POST /api/resilience/reset`
- Envoltorios: `open-sse/services/accountFallback.ts`
- Tabla de BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — se permite el tráfico normal
- `DEGRADED` — el tráfico sigue permitido, pero se están rastreando fallos elevados del proveedor; vuelve a `CLOSED` tras suficientes éxitos, tras una prueba de conexión válida, o después de la retención `OPEN` más larga para el último tipo de fallo (su valor `cooldownByKind`, o en su defecto `resetTimeout`, × `maxBackoffMultiplier`, con un mínimo de un cooldown) sin un nuevo fallo
- `OPEN` — proveedor bloqueado temporalmente; el enrutamiento combo lo omite
- `HALF_OPEN` — el tiempo de espera de restablecimiento ha transcurrido; se permite una solicitud de sondeo

**Valores predeterminados configurables (`open-sse/config/constants.ts`, expuestos en Panel → Configuración → Resiliencia):**

| Clase   | Se degrada a los | Se abre a los | Tiempo de restablecimiento |
| ------- | ---------------- | ------------- | -------------------------- |
| OAuth   | 5 fallos         | 8 fallos      | 60s                        |
| API-key | 7 fallos         | 12 fallos     | 30s                        |
| Local   | derivado         | 2 fallos      | 15s                        |

`degradationThreshold` controla cuándo un proveedor entra en `DEGRADED`; `failureThreshold` controla cuándo se abre y se omite. Los perfiles de proveedor local aún no están expuestos en la página de configuración de Resiliencia.

**Códigos de disparo:** solo estados a nivel de proveedor `[408, 500, 502, 503, 504]`. NO se dispara por errores a nivel de cuenta (la mayoría de los 401/403/429 — esos pertenecen al cooldown o al bloqueo).

**Recuperación diferida:** cuando `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` actualizan el estado a `HALF_OPEN`. Las mismas lecturas (y el siguiente fallo) hacen decaer un `DEGRADED` obsoleto de vuelta a `CLOSED`. No se necesita ningún temporizador en segundo plano.

---

### Cooldown global de proveedor optativo (window gate)

Una cuarta capa, **optativa** (`PROVIDER_COOLDOWN_ENABLED`, predeterminada en **desactivada**), mantiene una memoria entre solicitudes de los proveedores que fallan en `open-sse/services/providerCooldownTracker.ts`, consultada por la resolución de destinos de combo para que las solicitudes combo consecutivas dejen de recorrer de nuevo un proveedor que acaba de fallar. Las entradas a nivel de proveedor respetan el window gate de `PROVIDER_PROFILES`:

| Perfil  | se dispara tras (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | se enfría durante (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ------------------------------------: | ---------------------------------------: |
| OAuth   |                                         `10` |                               `15min` |                                   `5min` |
| API key |                                         `15` |                               `30min` |                                  `10min` |

Por debajo del umbral, el proveedor **no** se considera en enfriamiento; un éxito limpia la ventana. Las entradas a nivel de conexión (`provider:connectionId`) mantienen en su lugar el backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Anulaciones: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Protección contra regresiones: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Enfriamiento de la conexión

**Ámbito:** una única conexión/cuenta/clave del proveedor.

**Propósito:** omitir una clave con problemas mientras otras conexiones del mismo proveedor siguen atendiendo solicitudes.

**Implementación:**

- Marcar como no disponible: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección: `getProviderCredentials*` en el mismo archivo
- Cálculo del enfriamiento: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuración: `src/lib/resilience/settings.ts`

**Campos por conexión:**

- `rateLimitedUntil` — marca de tiempo hasta que expire el enfriamiento
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de retroceso exponencial

**Enfriamientos predeterminados:**

- Base de OAuth: 5s
- Base de clave de API: 3s
- API-key 429: prefiere los encabezados `Retry-After`/reset del upstream/texto de reset analizable
- Retroceso: `baseCooldownMs * 2 ** failureIndex`

**Retraso de reintento por proveedor.** La página de detalles del proveedor tiene un selector de **Retraso de reintento** (Automático, de
15s hasta 1h). Guarda `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, mediante `PATCH /api/resilience`). Cuando un error de limitación de tasa no contiene ninguna
indicación de reintento del upstream, ese valor reemplaza el retroceso escalado para el proveedor y restablece
`backoffLevel` a 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Precedencia para un error de limitación de tasa, de mayor a
menor: indicación de reintento del upstream, después `providerSpecificData.rotationOverrides.rateLimitResetSeconds`
por conexión, después el retraso de reintento por proveedor, después
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` del entorno y, por último, el retroceso
escalado. Automático elimina el campo. Solo afecta al motivo de limitación de tasa, nunca a los estados terminales.

**Protección contra la estampida:** evita que los fallos simultáneos prolonguen excesivamente el enfriamiento o incrementen dos veces `backoffLevel`.

**Los 429 por límite de concurrencia no suben por la escala de retroceso.** Un `429` cuyo cuerpo informa de un
límite de concurrencia ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa que la cuenta está sana, pero ocupada.
`checkFallbackError()` devuelve el motivo `concurrency_limited`: conmuta inmediatamente a la siguiente
conexión, enfría esta durante un tiempo fijo `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) o hasta la indicación de reintento del
upstream, mantiene `backoffLevel` sin cambios y establece `skipProviderBreaker`.
Un cuerpo de cuota explícito tiene prioridad, por lo que un cuerpo que también coincida con un patrón de cuota
conserva el veredicto de cuota. Detección: `looksLikeConcurrencyLimit()` en `src/shared/utils/classify429.ts`;
veredicto: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (el `FailureKind` del disyuntor) no cambia y
sigue leyendo `rate_limit` para estos cuerpos.

**Los bloqueos del contenido del flujo no enfrían la cuenta.** Cuando el watchdog de bloqueo de contenido
(`open-sse/utils/streamHandler.ts`) abandona un flujo que no envió ninguna salida del modelo a tiempo,
`markAccountUnavailable()` registra el error en la conexión, pero no establece ningún enfriamiento: el bloqueo
pertenece a esa solicitud, normalmente un turno de razonamiento largo que aún no ha producido salida.
Los operadores pueden habilitarlo de forma opcional con `resilienceSettings.streamStallCooldown.enabled`
(valor predeterminado `false`).

**Señal de latencia opcional para la selección de cuentas `p2c`.** Cada intento enviado registra su tiempo hasta el primer byte
y su resultado por conexión (y por conexión + modelo) en una ventana móvil en memoria: las últimas 20 muestras dentro de 15 minutos
(`open-sse/services/connectionLatencyTracker.ts`, registradas desde `safeLogEvents()` en
`src/sse/handlers/chatHelpers.ts`). Cuando `resilienceSettings.p2cLatency.weight` es mayor que `0`
(rango 0-20, valor predeterminado `0` = desactivado), `compareP2CConnections()` en `src/sse/services/auth.ts` añade
hasta `weight` puntos a cada candidato del par. La mitad proviene de la latencia como proporción respecto al candidato más rápido
(el doble de lento obtiene la mitad completa) y la otra mitad de la tasa de errores móvil.
El término solo se aplica cuando ambos candidatos tienen al menos 3 muestras, de modo que las cuentas nuevas no son
penalizadas, y su límite permanece por debajo de las penalizaciones de cuota bloqueada y cuota agotada.
No añade ningún circuito propio: las cuentas con fallos siguen gestionándose mediante las capas de enfriamiento,
bloqueo y disyuntor. Establézcalo con `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Los marcos de razonamiento reinician el presupuesto de bloqueo del contenido.** Un modelo de razonamiento puede pensar durante
minutos antes de su primer token visible: Claude transmite marcos `thinking_delta` cuyo texto de razonamiento puede estar vacío,
y la API de Responses transmite un elemento de razonamiento tras otro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconoce
estos marcos, y el watchdog reinicia su presupuesto con cada uno en lugar de cancelar el turno. Siguen sin ser salida del modelo,
por lo que un turno que termina únicamente con razonamiento sigue notificándose como vacío, y un turno que deja de razonar y solo
envía latidos sigue activando el watchdog.

Los marcos binarios `reasoningContentEvent` de Kiro con una firma no vacía conservan esta actividad de razonamiento a través del ejecutor
como un delta `reasoning_content` vacío. La firma no se reenvía. Los metadatos, los marcos incompletos y las firmas vacías no reinician
el presupuesto de contenido; el tiempo de espera independiente del flujo activo y la cancelación del cliente siguen aplicándose
(`open-sse/executors/kiro/reasoning.ts`).

**Estados terminales (NO son enfriamientos):**

- `banned` — se establece mediante la detección de palabras clave prohibidas / baneo de cuentas (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)). Las denegaciones del upstream por solicitud (`request_rejected`, por ejemplo, el error 403 de OAuth de Anthropic "Request not allowed") nunca lo establecen: se contabilizan por conexión y modelo, y ese modelo se retira de la rotación con un enfriamiento creciente limitado por `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), o se enfría la conexión cuando no se conoce ningún modelo — `open-sse/services/requestRejectedStreak.ts`
- `expired` (pasa a terminal después de reintentos acotados — `EXPIRED_RETRY_MAX = 3` con retroceso exponencial — para que los errores transitorios de OAuth puedan recuperarse automáticamente antes de que la cuenta se desactive permanentemente)
- `credits_exhausted`

Estos estados persisten hasta que cambien las credenciales o un operador los restablezca. No sobrescriba los estados terminales con un estado transitorio de enfriamiento.

**Recuperación diferida:** cuando `rateLimitedUntil` haya pasado, la conexión vuelve a ser elegible. Tras un uso exitoso, `clearAccountError()` borra todos los campos de error.

### Límite de uso de Claude OAuth: canal de menor prioridad + restablecimiento del límite de sesión

**Alcance:** una conexión de suscripción de Claude (OAuth). Ambas funciones son **opcionales por conexión** (Editar conexión → sección Claude → `lowPriorityMode` / `autoLimitReset` en `providerSpecificData`, ambas desactivadas de forma predeterminada) y reflejan los comandos `/low-priority` y `/limit-reset` de Claude Code (contrato de comunicación capturado de Claude Code 2.1.263).

**Implementación:**

- Máquina de estados y clasificación de respuestas: `open-sse/services/claudeLowPriority.ts`
- Cliente de estado/solicitud de restablecimiento: `open-sse/services/claudeLimitReset.ts`
- Hook del ejecutor (inyección de encabezados + reintento con la misma cuenta): `open-sse/executors/base.ts::execute()`
- Persistencia de la activación opcional: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Activación:** el límite de uso de 5 horas: un `429` cuyos encabezados contienen
`anthropic-ratelimit-unified-status: rejected` y, cuando la cuenta es elegible,
`anthropic-ratelimit-unified-slow-offer: treatment`. No se envía nada antes del primer
`429` de límite; un `429` en ráfaga sin encabezados unificados sigue la ruta normal de enfriamiento.

**Canal de menor prioridad** (`lowPriorityMode`):

- En el `429` de límite, el ejecutor acepta la oferta y reintenta inmediatamente con la **misma**
  cuenta usando `anthropic-usage-limit: slow`; el canal permanece activo hasta el
  `anthropic-ratelimit-unified-reset` anunciado (+60 s de margen), y cada solicitud durante esa
  ventana incluye el encabezado. El `429` interceptado nunca llega a `handleChatCore`, por lo que la conexión
  **no** entra en enfriamiento ni se rota.
- `anthropic-ratelimit-unified-slow-status` en respuestas posteriores: `active` / `not_needed`
  mantienen el canal; `slot_busy` (429) o un `529` esperan el valor
  `anthropic-ratelimit-unified-slow-retry-after` del servidor (20 s de forma predeterminada, límite de 5–600 s, fluctuación de ±30 %)
  y reintentan, limitados por `anthropic-ratelimit-unified-slow-max-wait` (20 min de forma predeterminada, límite de
  1 min–6 h). Una vez superado ese tiempo, el canal termina y un periodo de enfriamiento de 10 minutos bloquea la
  nueva aceptación. La espera también está limitada por el tiempo restante del propio tiempo de espera de inicio de la solicitud
  upstream (`resolveFetchStartTimeout`, 10 min de forma predeterminada), menos un margen de 5 s: sin ese límite, el
  `max-wait` predeterminado de 20 minutos superaría la duración de la solicitud y el proceso de espera se abortaría a mitad,
  mostrando un `TimeoutError` en lugar de una finalización controlada `max_wait` seguida del enfriamiento.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, el cambio de ventana de 5 horas o
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que lo finaliza como
  `extra_usage` en cualquier estado, ya que el exceso de pago ahora cubre el límite) terminan el canal;
  la respuesta continúa entonces por la ruta normal de enfriamiento. `budget_exhausted` se conserva hasta el
  restablecimiento de presupuesto anunciado (≤ 8 días).
- La comprobación del límite se ejecuta después de los propios reintentos dentro del intento del ejecutor activados por 400
  (edición de contexto, límites de pensamiento/esfuerzo, aprendizaje automático de parámetros), por lo que un `429` de límite que
  solo aparezca en uno de esos reintentos se intercepta igualmente en lugar de llegar a la ruta de enfriamiento.
- El estado se mantiene en memoria por conexión (un reinicio requiere un `429` de límite adicional para volver a aceptar).

**Restablecimiento del límite de sesión** (`autoLimitReset`, se intenta antes que el canal cuando ambas opciones están activadas):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloque
  `juniper_tide`; cuando `arm: "reset"` y `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID de la organización de `providerSpecificData.organizationUUID`, con alternativa de arranque).
- `result: reset|not_limited` → la solicitud se reintenta a velocidad normal (sin encabezado slow).
  `already_used` / `not_offered` memorizan `next_available_at` (una semana de forma predeterminada); cualquier
  error aplica una espera progresiva de 15 minutos. El restablecimiento se realiza una vez por semana y sigue contando para el límite semanal.

Protecciones contra regresiones: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Aplicar automáticamente restablecimientos bancarios

**Alcance:** Conexiones de suscripción Codex y Claude (OAuth).**Inscribirse** : la configuración `bankedResetAutoApply` está desactivada y en modo `dry-run` de forma predeterminada (Configuración → AI → Auto-aplicar restablecimientos bancarios).

**Objetivo:** gastar los reinicios bancarios por su cuenta cuando una cuenta llega a un límite de uso, en lugar de esperar a que un operador presione "Canjear" en la página de Límites del proveedor.

| Tipo de crédito (`creditTypes`) | lo que se redime                                              | donde corre                                                                    |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `codexCredits`                  | Créditos de reinicio Codex                                    | trabajo en segundo plano, cada 60 s                                            |
| `claudeCredits`                 | Ayudas bancarias Claude (créditos `GRANT` )                   | trabajo en segundo plano, cada 60 s                                            |
| `claudeSessionReset`            | Restablecimiento del límite de sesión semanal Claude (arriba) | ruta de solicitud, a través de la misma política que la alternancia por cuenta |

**Implementación:**

- Decisión pura (una regla establecida para ambos caminos): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Trabajo en segundo plano: `src/lib/services/bankedResetAutoApply.ts` (iniciado en `src/instrumentation-node.ts`)
- Puerta de ruta de solicitud Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, registrada a través de `setClaudeLimitResetPolicy()` en `open-sse/services/claudeLimitReset.ts`
- Historia, mayúsculas y webhook: `src/lib/usage/bankedResetAudit.ts`
- Historia API: `GET /api/settings/banked-reset-auto/history?limit=50` (autenticación de gestión)

**Orden de decisión** (la primera regla fallida es el motivo registrado):

1. Función desactivada, tipo de crédito desactivado o cuenta fuera de alcance (`accountScope` `all` / `selected` más el mapa `connections` por cuenta).
2. Fuera del horario opcional UTC (`startHourUtc` > `endHourUtc` cruza la medianoche).
3. Límites en las últimas 24 h: `maxPerAccountPerDay` (1), `maxPerDay` (3) y `minSpacingMinutes` (30) entre dos reembolsos cualesquiera.
4. Activador: una ventana `session` o `weekly` bloqueada (leída de `getQuotaWindowStatus().reachedThreshold`, no `isAccountQuotaExhausted()`, que solo informa una cuenta con cada ventana gastada), o un crédito que vence dentro de `expiringCreditHours` (24) en una cuenta que ha utilizado al menos `expiringCreditMinUsedPercent` (50).
5. Guardia de reinicio natural: omita cuando la ventana amurallada de 5 horas se reinicie dentro de `sessionResetGuardMinutes` (90), o la ventana amurallada semanal dentro de `weeklyResetGuardHours` (12).
6. Piso semanal: omita un reinicio de 5 horas cuando el resto semanal esté por debajo de `weeklyFloorPercent` (10).
7. Modo `last-resort` : omita mientras a otra cuenta dentro del alcance del mismo proveedor le queden al menos `poolHeadroomPercent` (10) en ambas ventanas. Los desencadenantes del crédito vencido evitan esto.
8. `dry-run` registra una fila y no canjea nada; Canje `last-resort` y `eager`.

La falta de datos de cuota nunca desbloquea un canje: un tiempo de reinicio desconocido o saltos de uso semanal.

**Restablecimiento de sesión Claude :** Con la función desactivada o `claudeSessionReset` desactivado, el interruptor `autoLimitReset` por cuenta decide exactamente como antes. Con ambos activados, la función reemplaza las alternancias por cuenta: una cuenta dentro del alcance puede reclamar solo cuando la póliza lo permite, y en el modo `dry-run` no se realiza ningún reclamo.

**Seguridad:** el trabajo canjea como máximo un crédito por tick, decide antes de enumerar los créditos (una cuenta omitida nunca aparece en la lista), utiliza claves de idempotencia `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` y respalda una cuenta durante 1 hora después de una inclusión o canje fallido. Cada decisión de canje, fracaso y ejecución en seco se escribe en `audit_log` (`action: "bankedReset.redeem"`, sin tokens ni identificadores de crédito); los límites se cuentan a partir de esas filas, por lo que sobreviven a los reinicios. Los canjes exitosos también activan el webhook `provider.reset_redeemed`.

Guardias de regresión: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinidad de sesión (#7274)

**Alcance:** una sesión de cliente (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) fijada a una conexión, para **cualquier** proveedor.

**Propósito:** mantener a un agente con varias interacciones (Claude Code, aider, agentes personalizados) en la misma cuenta entre solicitudes, reduciendo la pérdida de contexto entre cuentas y los `429` repetidos de arranque en frío en proveedores con estado de sesión por cuenta.

**Implementación:**

- Resolución del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selección/creación de la fijación: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extracción del encabezado (genérica, cualquier proveedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabla de fijaciones persistentes: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuración: `sessionAffinityTtlMs` (TTL global en ms, `0` desactiva) — `src/lib/db/settings.ts`. Renombrada de la opción exclusiva de Codex `codexSessionAffinityTtlMs` mediante la migración `124_generic_session_affinity_ttl.sql`, que transfiere cualquier TTL de Codex configurado previamente como el nuevo valor predeterminado.

Antes de #7274, `resolveSessionAffinityTtlMs()` terminaba inmediatamente con `0` para todos los proveedores excepto
`codex`, por lo que la configuración del TTL (y los encabezados de sesión) no tenía efecto en ningún otro lugar, aunque el mecanismo de fijación y la extracción de encabezados ya eran independientes del proveedor. La corrección eliminó ese retorno anticipado; el TTL ahora se aplica de forma uniforme a todos los proveedores una vez configurado globalmente por encima de `0`.

Los tres encabezados de afinidad de sesión nunca se reenvían upstream — los ejecutores construyen sus propios encabezados upstream desde cero en lugar de pasar los encabezados del cliente, por lo que esto sigue siendo únicamente un id de correlación interno.

### Arrendamientos exclusivos de conexión para sesiones administradas

**Ámbito:** un único cliente HTTP/sesión administrado posee una conexión de OmniRoute elegible.

**Propósito:** proporcionar una propiedad exclusiva y duradera de la conexión para los clientes que
necesitan una barrera de enrutamiento estricta entre solicitudes. Esto difiere de la afinidad de
sesión, que es una preferencia de continuidad flexible:
un arrendamiento exclusivo persiste el estado del ciclo de vida en SQLite, impone la unicidad
global del propietario activo y de la conexión activa, y rechaza una generación obsoleta antes
del envío al proveedor.

La funcionalidad se habilita de forma opcional por clave de API. Una clave administrada debe
tener el ámbito `lease:exclusive` y una lista `allowedConnections` explícita y no vacía. Cualquier
cliente HTTP puede utilizar el endpoint del ciclo de vida; no se requiere nombre del cliente,
agente de usuario, proveedor, método OAuth ni modelo. El arrendamiento posee una conexión,
no un modelo, por lo que un cambio de modelo conserva la vinculación mientras la conexión siga
siendo normalmente elegible. Las reglas normales de modelo, cuota, estado, enfriamiento y lista
de permitidos siguen teniendo autoridad y pueden transferir la misma generación a otra conexión
elegible libre.

El ciclo de vida es `POST /api/v1/session-leases` con las acciones JSON `acquire`, `renew` y `release`.
Las solicitudes de inferencia administradas presentan el valor opaco
`X-OmniRoute-Lease-Owner` y el valor exacto de `X-OmniRoute-Lease-Generation`. El propietario usa
`vlo_` seguido de 43 caracteres base64url; solo se almacena su hash SHA-256. Cada barrera de envío
final también vincula el ID de la clave de API autenticada y el ID de la conexión activa. Los
encabezados de control del arrendamiento se eliminan de los registros, de las instantáneas de
solicitudes retenidas y de los encabezados del ejecutor ascendente.

Si el enrutamiento normal tiene candidatos administrados elegibles, pero todos los candidatos
libres están ocupados por un arrendamiento activo extranjero, OmniRoute devuelve HTTP `429`, el
código lease-capacity-unavailable, el estado waiting-for-capacity y un `Retry-After` acotado
derivado de la expiración relevante más próxima. La ausencia ordinaria de elegibilidad no es
contención de arrendamiento y conserva la semántica de error de enrutamiento existente.

Los mecanismos relacionados siguen siendo independientes:

- La ocupación de sesiones OAuth es una distribución flexible y local al proceso para las cuentas OAuth.
- Los semáforos de cuenta conceden permisos de concurrencia de solicitudes y finalizan cuando se completa una solicitud.
- Los arrendamientos exclusivos de sesiones administradas son una propiedad duradera del ciclo de vida con una barrera de generación.

---

## 3. Bloqueo de modelos

**Alcance:** combinación de proveedor + conexión + modelo.

**Alcance según el estado:** el estado que provoca el fallo determina la clave en la que se escribe el bloqueo
(`resolveLockoutScope()` en `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — una señal de cuota o autorización — bloquea la **familia de cuota**:
  para codex, todo el alcance `codex` / `spark` (cada modelo `gpt-5*` de
  la conexión); para otros proveedores, `getQuotaScopedModelForProvider()`.
- `404` bloquea el modelo sin modificaciones (`getModelLockKey()` restringe `not_found`).
- Cualquier otro estado — fallos de transporte/servidor `5xx` y el `502` sintetizado por OmniRoute
  a partir de la validación de calidad — bloquea únicamente la tupla **exacta**
  de proveedor/conexión/modelo. Un flujo defectuoso en un modelo no demuestra nada sobre la cuota de la cuenta;
  antes de esta regla, una respuesta vacía en
  `codex/gpt-5.6-luna` eliminaba todos los modelos `gpt-5*` de esa conexión del
  enrutamiento durante 2–30 min (con escalado), mientras su cuota permanecía intacta.
- La opción `scope` explícita del llamador siempre prevalece (Antigravity pasa `"exact"`).

**Propósito:** evitar deshabilitar una conexión completa cuando solo un modelo no está disponible o tiene una cuota limitada.

**Ejemplos:**

- Proveedores con cuotas por modelo que devuelven 429
- Proveedores locales que devuelven 404 para un modelo inexistente
- Fallos de permisos específicos del proveedor para modos/modelos (por ejemplo, modos de Grok)

**Implementación:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel de control de tiempos de espera de modelos (v3.8.0)

UI: Configuración → Tiempos de espera de modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Muestra los bloqueos activos con: proveedor, conexión, modelo, motivo y expiresAt. Los operadores pueden volver a habilitar manualmente un modelo desde la tarjeta.

**API REST:**

- `GET /api/resilience/model-cooldowns` — lista los bloqueos activos
- `DELETE /api/resilience/model-cooldowns` — vuelve a habilitar manualmente. Cuerpo: `{provider, connection, model}`. Autenticación: management.

### Gestor de tiempos de espera

UI: Supervisión → Gestor de tiempos de espera (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una página para cada conexión que está fuera del enrutamiento por un motivo transitorio, en lugar de
abrir la página de cada proveedor. Muestra los tiempos de espera de las conexiones, los bloqueos de modelos y los estados terminales,
los elimina por conexión, para una selección o para todas las conexiones de un proveedor,
y edita las reglas de tiempo de espera más ajustadas: `streamStallCooldown.enabled` y el
tiempo de espera base `connectionCooldown` de OAuth / clave de API, así como el número máximo de pasos de retroceso (guardados mediante
`PATCH /api/resilience`). Los estados terminales (`banned`, `expired`, `credits_exhausted`) se
muestran, pero nunca se eliminan aquí.

La tarjeta **Reglas de tiempo de espera de errores** de la misma página edita las reglas de errores del operador
(`settings.providerErrorRules`) y los valores predeterminados generales por proveedor
(`settings.providerErrorDefaults`) mediante `PATCH /api/settings`; consulta "Reglas declaradas por el operador"
en §7 para saber cómo coinciden. Las duraciones son Predeterminada (sin tiempo de espera explícito), 30 min,
1 h, 5 h, 24 h o un valor personalizado de 1 a 43.200 minutos (30 días).

**API REST** (`src/lib/resilience/cooldownManager.ts`, autenticación: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiones con estado, tiempo de espera restante,
  nivel de retroceso, último tipo de error y bloqueos de modelos (sin credenciales)
- `POST /api/resilience/cooldowns` — cuerpo `{connectionIds: string[]}` o
  `{all: true, provider?}`; devuelve `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI de configuración de bloqueos + recuperación por reducción tras éxitos (v3.8.23)

El bloqueo de modelos pasó de ser un comportamiento codificado siempre activo a una función
totalmente configurable y opcional, con su propia tarjeta de configuración y una ruta de recuperación autorreparable.

**Tarjeta de configuración:** Configuración → Bloqueo de modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Esto es **distinto** de `ModelCooldownsCard`, de solo lectura, mencionado arriba (que solo
_hace una lista_ de los bloqueos activos); la nueva tarjeta _configura los parámetros_. Los valores predeterminados
se encuentran en `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Configuración           | Valor predeterminado             | Significado                                                                              |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruptor maestro: el bloqueo de modelos está **desactivado de forma predeterminada**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Estados ascendentes que cuentan como un fallo con alcance de modelo.                     |
| `baseCooldownMs`        | `120_000` (120 s)                | Duración inicial del bloqueo para el primer fallo.                                       |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Límite del tiempo de espera escalado.                                                    |
| `maxBackoffSteps`       | `10`                             | Número máximo de pasos de escalado del retroceso exponencial.                            |
| `useExponentialBackoff` | `true`                           | Indica si los fallos repetidos aumentan exponencialmente el tiempo de espera.            |

La configuración se conserva mediante el almacén de configuración normal y se valida mediante el
esquema de configuración de resiliencia; la tarjeta limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) y `maxBackoffSteps`.

**Recuperación por reducción tras éxitos:** la recuperación **no** depende únicamente de que expire el temporizador. Una
respuesta correcta reduce el recuento de fallos del modelo, de modo que un modelo que se recuperó
a mitad de la ventana deja de escalar (y se desbloquea) antes de que expire su temporizador. En un destino de combinación correcto,
`open-sse/services/combo.ts` llama a `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **divide por dos** el
`failureCount` almacenado (`Math.floor(failureCount / 2)`); cuando llega a `0`, la entrada de bloqueo se elimina por completo. Su
contraparte, `recordModelLockoutFailure()`, incrementa el recuento (y escala el tiempo de espera) en los fallos que ocurren dentro de la ventana de escalado. Esta reducción tras éxitos se suma a la simple expiración del temporizador:
cualquiera de las dos rutas puede volver a habilitar un modelo.

**Estado:** los bloqueos se mantienen **en memoria** (mediante `Map`s por proceso de
`ModelLockoutEntry`, con claves `provider:connectionId:model`; los bloqueos de ámbito exacto usan
`provider:connectionId:exact:model`), y no se persisten en
la base de datos — se pierden al reiniciar. Los _ajustes_ se persisten; el _estado_ activo de los
bloqueos es efímero.

---

## 4. Control de concurrencia de cuota compartida (v3.8.36)

Las cuentas de suscripción (GLM, MiniMax, etc.) a menudo aceptan solo ~1–3
solicitudes simultáneas; superar ese límite activa respuestas 429 y períodos de
espera. Esto es especialmente problemático con las combinaciones de
**cuota compartida** (`qtSd/…`), donde varias claves de API comparten una cuenta
ascendente. Tres capas evitan que una cuenta compartida se inunde.

### Límite de concurrencia por conexión (`max_concurrent`)

Cada conexión de proveedor puede declarar un límite máximo de `max_concurrent`
(`provider_connections.max_concurrent`, establecido en el modal de conexión / API / DB).
Déjelo vacío para no aplicar ningún límite. Este es el único parámetro que controla
la capa de serialización descrita a continuación: establézcalo en la concurrencia
real de la cuenta (por ejemplo, GLM ~1, MiniMax ~2).

### Límites de concurrencia por modelo (`modelConcurrency`)

Una conexión también puede declarar límites exactos de concurrencia por modelo
dentro de su mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Establézcalo en el modal de conexión (**Anulaciones del límite de velocidad →
Límites de concurrencia por modelo**, un `model=cap` por línea) o mediante
`PATCH /api/providers/[id]` con la misma estructura JSON. Semántica de las claves:

- **Límite para toda la conexión frente a límite específico del modelo:** `maxConcurrent` sigue siendo el límite compartido para toda la conexión. Cuando se aplican ambos, las dos puertas se adquieren atómicamente en la misma puerta compuesta
  (`global → provider → account → model`); el comportamiento efectivo es el límite
  aplicable más estricto.
- **Coincidencia exacta de la clave del modelo:** la clave es la cadena del modelo
  que se pasa al ejecutor después de resolver el enrutamiento —normalmente el
  identificador de modelo ascendente sin prefijo (`glm-5`), no un alias
  `provider/model` del cliente (`zai/glm-5` no coincide con `glm-5`). Los valores
  son límites de solicitudes simultáneas expresados como enteros positivos.
- **Cola local, sin descubrimiento:** las solicitudes excedentes esperan en la cola
  local con la semántica existente de cola/tiempo de espera (errores de admisión
  tipados `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute no descubre ni
  infiere la política ascendente: aplica los límites exactos configurados por el
  operador. Una puerta de modelo saturada nunca desactiva el proveedor ni crea un
  bloqueo permanente del modelo; el comportamiento de respuestas 429, período de
  espera y alternativa del proveedor ascendente sigue siendo el mecanismo de
  respaldo ante errores.
- **Ámbito por conexión y por proceso:** los límites se aplican por conexión de
  base de datos y se mantienen en memoria, por lo que dos conexiones que
  reutilicen la misma clave de API ascendente no se coordinan entre sí.
- **Sin configuración significa sin cambios:** omitir el mapa (o dejar vacío el
  campo del panel) no añade ninguna puerta de modelo. Ejemplo de configuración
  sin afirmar ningún límite universal del proveedor:

```text
glm-5=1
glm-4.7=3
```

### Serialización de solicitudes de cuota compartida

Cuando un despacho de cuota compartida apunta a una conexión que declara un
`max_concurrent` positivo, las solicitudes simultáneas a esa **cuenta** se
serializan mediante un semáforo por conexión (`qsconn:<connectionId>`): las
solicitudes excedentes **esperan en la cola** en lugar de inundar la cuenta. Es
de **apertura ante fallos**: una cola saturada o un tiempo de espera agotado
continúa sin un espacio, en lugar de rechazar una solicitud que se puede
despachar. Se activa en **Configuración → Resiliencia → Concurrencia de cuota
compartida por conexión**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activado de forma
predeterminada). Sin un límite `max_concurrent`, el comportamiento no cambia.

> La puerta de enrutamiento de cuota compartida (`selectQuotaShareTarget`, DRR + P2C) es
> por sí misma de **apertura ante fallos** y solo _reduce la prioridad_ de una
> conexión que ha alcanzado su límite; con un grupo de una sola conexión no puede
> imponer un límite estricto, por lo que este semáforo es el que realmente
> contiene la avalancha.

### Reintento de combinaciones teniendo en cuenta el período de espera

Para cada estrategia de combinación (cuando está activada), una solicitud que
provocaría una respuesta 429 durante un período de espera transitorio CORTO
espera a que transcurra y vuelve a despacharse en lugar de devolver la respuesta 429. Esto incluye las ventanas TPM/RPM de tipo Gemini (~60 s de
`retry-after`) en combinaciones de varios modelos; por ejemplo, cuando ambos
destinos de una combinación de 2 modelos alcanzan un límite de velocidad por
modelo. Está limitado por `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) en **Configuración → Resiliencia**. Nunca espera ante
`quota_exhausted` (bloqueado hasta medianoche) ni ante motivos de autenticación o
de recurso no encontrado.

Una combinación puede excluirse mediante `config.comboCooldownWaitEnabled: false`.
Solo `false` literal desactiva estas esperas compartidas de combinación (espera
de período de espera posterior al despacho y esperas previas al despacho por
circuito abierto/bloqueo del modelo), así como su extensión del límite inferior
del tiempo de espera según el presupuesto. La ausencia del valor o `true`
mantiene la política global; `true` no puede activar globalmente una espera que
esté desactivada. Un `targetTimeoutMs` explícito sigue teniendo prioridad. Esta
exclusión no cambia la espera previa al despacho independiente de fijación de
turno de Codex nativo.

La misma puerta cubre el caso previo al despacho (#16319): cuando todos los
destinos de una combinación se omiten antes de realizar cualquier intento porque
su modelo se encuentra en un bloqueo transitorio corto, la ruta sin intentos
espera a que termine el bloqueo bajo los mismos límites y vuelve a despacharse,
en lugar de responder con un `503 ALL_TARGETS_SKIPPED` sin indicación. Cuando no
se permite esperar (se agotó el límite, el número de intentos o el presupuesto,
o la función está desactivada), la respuesta terminal se actualiza a
`429 rate_limit_error` e incluye `retry_after` / `reset_at` del vencimiento más
temprano del bloqueo transitorio; los bloqueos por cuota, autenticación y
recurso no encontrado mantienen el 503 sin indicación.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Control de admisión de la cola de solicitudes (v3.8.49 · issue #6593)

**Alcance**: la cola local de limitación de tasa por proveedor+conexión (`open-sse/services/rateLimitManager.ts`, respaldada por Bottleneck), una capa por debajo de los tres mecanismos anteriores.

**`maxWaitMs` limita la espera en cola; `executionMaxWaitMs` limita la ejecución.**
Ambos están deliberadamente separados y ninguno alimenta al otro.

`resilienceSettings.requestQueue.maxWaitMs` es el **presupuesto de espera en cola**: cubre la espera por una ranura de proveedor y después la permanencia en estado QUEUED, y su temporizador se cancela en el momento en que el trabajo sale de QUEUED y comienza a ejecutarse (`rateLimitManager.ts`, `wrappedFn`). Una solicitud que lo excede nunca llega al upstream. Valor predeterminado: 30000 ms, proporcionado por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` en `src/lib/resilience/settings.ts` y fijado por `tests/unit/ratelimit-admission-control-6593.test.ts`, de modo que un cambio en él pone esa prueba en rojo en lugar de dejar este párrafo silenciosamente desactualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` es lo que Bottleneck recibe como `expiration` del trabajo, cuyo temporizador solo se inicia después del despacho. Es una salvaguarda para ejecutores que no tienen un tiempo de espera de upstream propio, y se eleva hasta el tiempo de espera de inicio del fetch del propio ejecutor cuando este es mayor, de modo que no puede cortar una respuesta en curso saludable. Valor predeterminado: 600000 ms (10 min).

Alimentar el presupuesto de la cola en `expiration` es lo que antes mataba a los gateways no incrementales a mitad de vuelo —legítimamente funcionan durante minutos antes de los primeros bytes— y es la razón por la que una expiración se expone como `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mientras que el presupuesto de la cola lleva el código de tiempo de espera de cola. Se puede sobrescribir cualquiera de los dos mediante `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (entorno) o el panel (**Configuración → Resiliencia**). Ambos se acotan a 1 ms–24 h al normalizarse.

**Precedencia, para ambos:** la variable de entorno solo proporciona el _valor predeterminado_. Un valor persistido en `resilienceSettings.requestQueue` (panel / parche de API, almacenado en `key_value`) tiene prioridad sobre él, y un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por conexión tiene prioridad sobre ese. Por lo tanto, establecer la variable de entorno en un despliegue que ya tiene un valor persistido no cambia nada: borre o actualice la configuración persistida en su lugar.

La permanencia en cola está limitada por `maxWaitMs`; `maxQueueDepth`, más abajo, limita cuántos llamadores pueden estar en cola a la vez.

**Reintentos declarados en el cuerpo: espaciado frente a bloqueo.** Un cuerpo 429 puede indicar su propia espera (Gemini `RetryInfo.retryDelay`, texto "retry after Ns"), que `updateFromResponseBody` lee. Una espera que cabe en el `maxWaitMs` de la conexión es espaciado: el limitador vacía su reserva durante ese tiempo y las llamadas en cola se despachan cuando esta se rellena. Una espera más larga que `maxWaitMs` no es algo que la cola pueda aguantar: Gemini responde a una cuota diaria agotada con `retryDelay: "86399s"`. El `Retry-After` retransmitido en el 429 reconstruido (#16528) ya hace que el motor de fallback bloquee el modelo durante esa ventana, pero pausar también el limitador por ello seguiría bloqueando cualquier llamada que llegue a la clave antes de tiempo (después de un reinicio de resiliencia, por ejemplo) durante todo el `maxWaitMs`. Cuando tal espera proviene de un detalle `RetryInfo` tipado de Google (la procedencia `google_rpc_retry_info`) y el limitador de la clave ya tiene como ámbito el modelo (véase `getLimiterKey`), el 429 se convierte en su lugar en un bloqueo del modelo en esa conexión (`lockModelForLongBodyRetry` en `open-sse/services/rateLimitManager/bodyRetryPause.ts`, con un tope de 24 h), y el limitador queda sin pausar. La selección de cuenta se salta esa clave por ese bloqueo mediante `isModelLocked()`, y lo mismo hace la compuerta de pre-despacho del combo para los destinos fijados a la conexión. En antigravity, cuyo limitador es por familia de cuotas, el bloqueo recae sobre el modelo exacto, como sus otros bloqueos de cuota. El nombre que el cliente pidió también se bloquea cuando un alias lo resolvió a ese modelo, porque esas comprobaciones usan el nombre solicitado; se bloquea de forma exacta (`lockExactModel`), de modo que un alias que cruza una familia de cuotas de antigravity o un ámbito de codex nunca bloquea el suyo propio. Una pista en prosa, un `retryDelay` sin tipo o un limitador compartido por toda la conexión mantiene la pausa. Cuando el limitador que la ruta 429 acaba de reconstruir sí se pausa, un llamador cuyo tiempo restante en cola termina antes que la pausa es rechazado de inmediato con el código de tiempo de espera de cola (`checkLimiterPause`), en lugar de esperar a que ese tiempo expire; el fin registrado se ancla antes de que se construya el limitador, donde Bottleneck inicia su reloj de refresco, y cualquier cambio posterior en la reserva lo olvida. Cubierto por `tests/unit/rate-limit-long-body-retry-lockout.test.ts` y `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — límite de admisión opcional (nuevo).** `resilienceSettings.requestQueue.maxQueueDepth` limita cuántas solicitudes pueden estar en cola (aún no despachadas) para un proveedor+conexión a la vez. Cuando la cola ya contiene `maxQueueDepth` solicitudes, una nueva solicitud se rechaza rápidamente con un error tipado `code: "RATE_LIMIT_QUEUE_FULL"` **antes** de que llegue siquiera a `limiter.schedule()`, de modo que el rechazo es barato y ocurre antes de cualquier trabajo posterior de compresión de prompts / traducción para esa solicitud. Valor predeterminado `0` = desactivado, lo que preserva el comportamiento existente de cola ilimitada; acotado a 0–100000. Se sobrescribe mediante `RATE_LIMIT_MAX_QUEUE_DEPTH` (entorno) o `resilienceSettings.requestQueue.maxQueueDepth` (panel/parche de API).

La comprobación de admisión en sí es una función pura (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), por lo que se puede probar de forma unitaria sin un limitador Bottleneck real.

> El RFC que abrió #6593 también propuso un flag `bypassCompressionOnRateLimit`.
> El pipeline `open-sse/services/compression/` de este repositorio es
> compresión de prompt/contexto en la solicitud saliente al LLM (`chatCore.ts`,
> alrededor del bloque `resolveCompressionSettings`/`selectCompressionStrategy`),
> no compresión de respuestas HTTP sobre cuerpos 429 sintetizados — no existe
> una ruta de código correspondiente para un flag de bypass literal. Ese paso
> de compresión de prompt también se ejecuta actualmente _antes_ de
> `withRateLimit()` en el pipeline de solicitudes, por lo que reordenarlo para
> omitirlo ante un rechazo por cola llena es un cambio separado y mayor que el
> alcance de este issue; intencionalmente **no** se implementó aquí y se deja
> como trabajo posterior si la ganancia de ahorro de CPU justifica el riesgo
> de reordenar.

### Red de seguridad de activación automática de límite de tasa y protección de conexiones (`rateLimitProtection`)

**Red de seguridad de activación automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predeterminado `true`):
De forma predeterminada, OmniRoute habilita automáticamente la protección de cola de límite de tasa para todas las conexiones activas de proveedores con clave API (`getProviderCategory(provider) === "apikey"`). Esto garantiza que las solicitudes entrantes hacia claves API ascendentes sensibles a límites de tasa se encolen y se regulen a través de Bottleneck en lugar de irrumpir en ráfagas que provocan errores 429 ascendentes. La red de seguridad puede anularse mediante la variable de entorno `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` la desactiva, `true`/`1`/`on` la fuerza a activarse), que tiene prioridad sobre la configuración persistida del panel (**Configuración → Resiliencia** / `PATCH /api/resilience`).

**Semántica de `rateLimitProtection` por conexión:**
La protección de límite de tasa por conexión se registra mediante el campo booleano `rateLimitProtection` en las conexiones de proveedores (persistido como `rate_limit_protection` en SQLite):

- **Activada explícitamente (`rateLimitProtection === true`)**: La protección de límite de tasa está explícitamente habilitada para esta conexión, independientemente de la categoría del proveedor o de si la red de seguridad de activación automática está activada.
- **Desactivada explícitamente (`rateLimitProtection === false`)**: Desactiva la protección explícita, pero **no** excluye a una conexión activa de clave API de la red de seguridad global de activación automática. En `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` y `undefined` son equivalentes: solo `rateLimitProtection === true` se trata como una anulación explícita. Si `rateLimitProtection` es `false` (o no está definido), una conexión activa de clave API aún cumple la condición de activación automática y permanece protegida por el límite de tasa.
- **Sin exclusión por conexión**: Un operador no puede expresar actualmente "esta única conexión activa de clave API debe ejecutarse sin protección de cola de límite de tasa" mientras mantiene la activación automática activa para las demás. Para ejecutar conexiones de clave API completamente sin colas de límite de tasa, la red de seguridad debe desactivarse globalmente (`RATE_LIMIT_AUTO_ENABLE=false` o `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Rutas de escritura admitidas:**

- **`POST /api/rate-limits`**: La ruta de escritura de gestión admitida para alternar `rateLimitProtection` de una conexión (`{ connectionId: string, enabled: boolean }`). Llamarla con `enabled: true` activa la protección explícita; llamarla con `enabled: false` elimina la protección explícita (aunque las conexiones activas de clave API permanecen cubiertas por la red de seguridad global si la activación automática está activada).
- **`PUT /api/providers/[id]`**: Deliberadamente **no** acepta ni modifica `rateLimitProtection` (#11278). Actualizar los metadatos de la conexión del proveedor mediante `PUT /api/providers/[id]` nunca cambiará el estado persistido de la protección de límite de tasa.

---

## 6. Vigilancia del rendimiento de flujo lento (#9709)

El `resilienceSettings.streamRecovery.throughputWatchdog` guard opcional detecta un flujo ascendente que todavía envía fragmentos pero produce una salida del asistente por debajo de la tasa de salida útil configurada. Es deliberadamente distinto del tiempo de espera de inactividad: los latidos y los metadatos no reinician el temporizador y no cuentan como progreso. También se diferencia de la fecha límite de intento duro (#9153), que sigue siendo un límite de seguridad absoluto independientemente de la calidad del resultado.

El mecanismo de vigilancia requiere un período de calentamiento seguido de una ventana móvil completa antes de poder abortar. Cuenta los deltas de texto de los eventos de salida API respuestas y finalizaciones de chat (un proxy de bytes UTF-8 conservador), ignora los eventos vacíos y de solo uso, y suspende el juicio mientras los eventos de razonamiento o llamadas a herramientas están en curso. Está deshabilitado de forma predeterminada y se puede habilitar con `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ese valor env solo genera el — predeterminado, un `resilienceSettings.streamRecovery.throughputWatchdog.enabled` booleano guardado gana; consulte la nota de precedencia env-vs-dashboard en la parte superior de esta guía); la ventana, el calentamiento, la tasa mínima y la salida mínima mensurable están delimitadas por la capa de normalización de configuración de resiliencia normal.

Cuando está habilitado, se aplica una cancelación de vigilancia solo al intento ascendente activo. Antes de cualquier byte visible para el cliente, la ruta de recuperación temprana existente de la misma cuenta puede reabrir el intento. Después de la confirmación, la transmisión nunca se reproduce a ciegas; solo el contrato de continuación seguro a mitad de camino existente puede unir un sufijo. La finalización sigue siendo de una sola vez, por lo que la contabilidad de uso y la liberación del semáforo no se duplican.

---

## 7. Restablecimiento del estado upstream (errores de cuota indicados incorrectamente)

**Ámbito:** una puerta de enlace upstream que informa del agotamiento temporal de la cuota con un estado HTTP incorrecto.

**Propósito:** corregir un estado engañoso ANTES de la clasificación, para que los consumidores posteriores (el motor de fallback, la agregación de combos y la respuesta destinada al cliente) vean la verdadera naturaleza reintentable del fallo.

Algunas puertas de enlace indican el agotamiento TEMPORAL de la cuota con un estado HTTP que no permite reintentos. `agentrouter.org` devuelve `403` (a veces `400`) con un cuerpo en chino (`用户额度不足` / `额度不足`) en lugar del `429` estándar. Los clientes como Claude
Code consideran `403` permanente y abortan la sesión y, sin esta corrección,
el motor de fallback lo clasificaría como `AUTH_ERROR` en lugar de como un
evento de cuota.

**Implementación:**

- Registro + comparador: `open-sse/config/upstreamStatusRestatement.ts` — una
  lista de reglas por proveedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), comparadas mediante `applyStatusRestatement()`.
- Punto de llamada: el bloque `providerFailure:` en `open-sse/handlers/chatCore.ts`
  (alrededor de la línea 3654), justo después de que `parseUpstreamError()`
  analiza una respuesta upstream con un estado HTTP de error
  (`!providerResponse.ok`) y antes de que se ejecute cualquier clasificación,
  para que todos los consumidores posteriores vean el estado corregido. Los
  errores incluidos en un flujo SSE `200` siguen una ruta posterior e
  independiente de análisis del flujo y **no** están cubiertos actualmente por
  este hook — es una limitación conocida, que todavía no es necesaria para el
  error de estado de agentrouter (que se presenta como un estado HTTP de error).
- Elegibilidad para reintentos: `429` está incluido en
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), por lo que un error cuyo
  estado se ha restablecido lleva una ventana de reintento real en lugar de
  presentarse como un `403` inactivo.
- El `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  solo es lo que la respuesta con el estado restablecido comunica al
  **cliente**; no es la duración interna de enfriamiento/bloqueo de la
  conexión — esta se rige por separado mediante el mecanismo que realmente
  gestione el error cuyo estado se ha restablecido (el backoff escalonado de
  Connection Cooldown, §2, con una base de `3s` para proveedores con claves de
  API; o Model Lockout, §3, para proveedores con cuota por modelo como
  agentrouter). El router puede estar listo para reintentar internamente antes
  de que transcurra la ventana de 60s que anuncia al cliente — es margen
  intencionado, no un error.

Los errores permanentes (el `无权访问模型` de agentrouter — no se tiene acceso a
este modelo) NUNCA se restablecen: `excludeMarkers` anula la regla incluso
cuando `textMarkers` coinciden, por lo que el error conserva su estado original
y nada lo reintenta indefinidamente. La regla de clasificación del proveedor
correspondiente (`agentrouter-model-access-denied` en `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, un cooldown base declarado de `6h`)
se consulta mediante `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _antes_ del retorno anticipado
genérico `FORBIDDEN` de la categoría apikey, condicionado por
`honorsRuleLockScope(provider)` (#10334 — actualmente exclusivo de agentrouter
mediante la allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` en
`providerErrorRules.ts`). El cooldown declarado de 6h de la regla se transmite
como `fallbackResult.baseCooldownMs`, pero aun así alimenta la ruta de bloqueo
por modelo preexistente (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, sin cambios por #10334 salvo por el origen del
cooldown): se limita al valor `mlSettings.maxCooldownMs` del operador
(predeterminado: `1_800_000ms` / 30min), como cualquier otro bloqueo de modelo,
y el _motivo del bloqueo persistido_ sigue siendo el valor preexistente
codificado de forma fija `"forbidden"`, no el `"auth_error"` de la regla —
solo se respeta de extremo a extremo la duración del cooldown, no la cadena del
motivo. La conexión permanece activa; los modelos hermanos de la misma
conexión no se ven afectados.

Los errores de cuota cuyo estado se ha restablecido (`额度不足`) llegan a una
regla de proveedor en producción
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sin cooldown declarado propio — se aplica el backoff
predeterminado escalado de la capa de persistencia). Desde #10334, `scope` en
`ProviderErrorRuleMatch` SE consume de extremo a extremo, pero **solo** para
los proveedores incluidos en la allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — actualmente solo
`"agentrouter"`, condicionado mediante `honorsRuleLockScope()`). Para cualquier
otro proveedor, `scope` sigue siendo informativo, exactamente como antes de
#10334. `checkFallbackError` expone el ámbito de la regla coincidente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) es la protección compartida que confirma que un
`ruleScope` es realmente seguro de respetar como señal autorrecuperable para
toda la conexión (ámbito `"connection"`, motivo `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted` — una defensa contra una futura
combinación de la regla que empareje el ámbito `"connection"` con un estado de
cuenta permanente). Dos consumidores la invocan:

- **Persistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  en lugar de entrar en la rama de bloqueo **por modelo** del proveedor passthrough
  (agentrouter tiene `passthroughModels: true` → `hasPerModelQuota()`
  devuelve `true`), aplica un **periodo de enfriamiento temporal de la conexión** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca un estado terminal
  (`credits_exhausted`/`banned`/`expired`) — para que la conexión se recupere
  automáticamente cuando expire el periodo de enfriamiento, en lugar de requerir
  un restablecimiento manual de las credenciales.
  Se omite para las conexiones con `disableCooling: true` (#2997): esta exclusión
  voluntaria continúa hacia el bloqueo por modelo (una compensación documentada;
  consulta el comentario del código situado sobre la rama).
- **Enrutamiento combinado en la misma solicitud** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la misma protección marca
  la conexión en el conjunto en memoria `exhaustedConnections`, con la clave
  `${provider}:${connectionId}`. Esto solo omite un destino restante de la MISMA
  SOLICITUD que _ya incluya por sí mismo ese `connectionId` exacto_ en su propio
  objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes de la búsqueda en `exhaustedConnections`) — una combinación
  simple de lista de modelos, cuyos destinos hermanos no incluyen ningún
  `connectionId` fijado propio y cuyo valor solo se resuelve por despacho a partir
  del encabezado `X-OmniRoute-Selected-Connection-Id` de la respuesta, nunca
  encuentra esa coincidencia de clave. En ese caso habitual, la protección real
  contra que un paso restante reutilice la cuenta que acaba de agotarse NO es este
  conjunto — es la capa de persistencia anterior (el `rateLimitedUntil` de la
  conexión está ahora en el futuro), combinada con que esta misma protección
  suprima `transientRateLimitedProviders` para el fallo (consulta «Diseño en dos
  etapas» y el comentario del código sobre la rama
  `isAgentrouterConnectionQuotaScope` en `targetExhaustion.ts`): al dejar ese
  conjunto sin marcar, la autorización forzada de
  `allowRateLimitedConnection` de `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NO se activa para los
  pasos restantes del proveedor, por lo que el filtro de credenciales
  `rateLimitedUntil` (`src/sse/services/auth.ts:1238`) se respeta normalmente y
  el paso restante selecciona otra conexión de agentrouter que siga siendo
  elegible, o falla indicando que no hay credenciales disponibles; no fuerza su
  regreso a la conexión que esta rama acaba de poner en enfriamiento.

### Diseño en dos etapas: reformulación del estado y, después, clasificación

La reformulación del estado (`upstreamStatusRestatement.ts`) y las reglas de
clasificación de proveedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) son registros independientes que utilizan como claves
el id del proveedor y marcadores de texto, pero se ejecutan en lugares distintos
y tienen finalidades diferentes: la reformulación reescribe pronto el estado HTTP
en `chatCore.ts`; las reglas de clasificación seleccionan el `reason` de reserva
y bloquean el `scope` (`model` / `provider` / `connection`) dentro de
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Las reglas de clasificación solo ven el **texto** completo del error (necesario
para encontrar marcadores en el cuerpo como `额度不足`) para los proveedores
incluidos en la lista de permitidos `FULL_TEXT_RULE_PROVIDERS` de
`providerErrorRules.ts` — actualmente solo `"agentrouter"`. Para cualquier otro
proveedor del **catálogo integrado**, `checkFallbackError` solo proporciona a
`getProviderErrorRuleMatch` el error estructurado (`{code, type}`), suficiente
para las reglas basadas en encabezados/estado/código, pero ciego a los marcadores
de texto del cuerpo. El ayudante `resolveRuleMatchBody()` realiza esta selección:
el texto completo del error para los proveedores de la lista de permitidos y el
error estructurado en los demás casos. Añadir un proveedor **integrado** a
`FULL_TEXT_RULE_PROVIDERS` es una habilitación explícita por proveedor: existe
para que la ruta predeterminada de todos los proveedores que no están en la
lista permanezca sin cambios, byte por byte.

El `scope` de una regla (`model` / `provider` / `connection`) es una habilitación
independiente de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` solo lo expone
como `fallbackResult.ruleScope`, y los consumidores posteriores solo lo respetan
como algo distinto de una etiqueta informativa para los proveedores incluidos en
la lista de permitidos `HONORS_RULE_LOCK_SCOPE_PROVIDERS` del mismo archivo
(controlado mediante `honorsRuleLockScope()`; actualmente solo `"agentrouter"`).
Consulta «Errores de cuota reformulados» más arriba para saber qué hace realmente
una coincidencia `scope: "connection"` cuando un proveedor está incluido en esa
lista de permitidos.

**#11104 — las reglas declaradas por el operador omiten ambas listas de
permitidos.** Un operador puede declarar una regla por proveedor en tiempo de
ejecución mediante `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) sin
editar este archivo. Someter una regla del operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de
permitidos destinadas a proteger el comportamiento **predeterminado** de las
reglas del catálogo integrado — haría que el mecanismo de configuración no
tuviera efecto para ningún proveedor salvo los que ya aparecen en ellas, puesto
que declarar la regla ya constituye la habilitación explícita del operador.
`resolveRuleMatchBody()` y `honorsRuleLockScope()` comprueban primero
`hasOperatorRuleForProvider()`: un proveedor con una regla del operador obtiene
el texto sin procesar del error y respeta su `scope` declarado,
independientemente de que también aparezca en cualquiera de las listas de
permitidos.

**Reglas declaradas por el operador** (`OperatorProviderErrorRule`): cada regla
tiene un `status` opcional y un `match` opcional (una subcadena simple, sin
distinguir mayúsculas de minúsculas, del texto del error; nunca una RegExp, por
lo que no puede causar ReDoS), y debe establecer al menos uno de los dos.
Cuando ambos están establecidos, se combinan mediante AND; un campo omitido
coincide con cualquier valor, por lo que `{match: "insufficient_quota"}` coincide
con cualquier estado que incluya ese código. Gana la primera regla coincidente.
`cooldownMs` acepta hasta 30 días; como máximo se permiten 50 reglas en total.

**Valores predeterminados generales** (`settings.providerErrorDefaults`, opcional, configurado mediante
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
con `cooldownMs` de 1 minuto a 30 días. Un valor predeterminado solo se aplica cuando no
coincide ninguna regla del operador ni ninguna regla del catálogo integrado, y solo para los errores
402, 403, 408, 429 y 5xx. Los errores de forma de la solicitud (400, 404, 409, 413, 422) y los
401 sin información adicional conservan su propio tratamiento. Si no se especifica `reason`, el
motivo se obtiene del estado, de la misma manera que lo hace `classifyError`. Declarar un valor
predeterminado cuenta como una regla del operador para `hasOperatorRuleForProvider()`, por lo que
se respeta su `scope` (predeterminado `"connection"`). El tiempo de espera efectivo de un valor
predeterminado es el mayor entre su `cooldownMs` y la indicación de reintento propia del proveedor
(`Retry-After`, `x-ratelimit-reset` o una indicación de restablecimiento en el cuerpo, la misma
indicación que el motor respeta cuando está activada la opción de configuración de
connection-cooldown "usar indicaciones de reintento del upstream"), de modo que un valor
predeterminado puede ampliar una indicación upstream breve, pero nunca acortar un restablecimiento
real. Una regla explícita del operador conserva su `cooldownMs` exacto. Ni una regla ni un valor
predeterminado omiten las protecciones de connection-cooldown en `markAccountUnavailable`: un
tiempo de espera activo más largo nunca se acorta y un estado terminal nunca se sobrescribe. Los
detectores de texto integrados que se ejecutan antes en `checkFallbackError` (créditos agotados,
cuota diaria, cuenta desactivada) siguen teniendo prioridad para sus propias frases.

**Brecha conocida — `providerRuleRegistry` nunca se consulta para HTTP 400.**
La rama `BAD_REQUEST` de `checkFallbackError` clasifica el estado 400 por completo mediante sus
propios arrays de patrones (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. en `accountFallback.ts`) y retorna antes de que se alcance la
rama `configuredRule`/`getProviderErrorRuleMatch` situada arriba. Una regla del catálogo integrado
(o una regla del operador) con `status: 400` es sintácticamente válida, pero nunca se activará.
Actualmente ninguna regla existente apunta a 400, por lo que nada se ve afectado en producción;
sin embargo, una futura regla para 400 requerirá modificar primero esta rama, lo que supone un
cambio mayor que añadir una regla (reclasifica 400 para cada proveedor que ya dependa del
comportamiento de los arrays de patrones) y queda fuera del alcance de añadir una regla para un
solo proveedor.

### Añadir una nueva pasarela que indique incorrectamente la cuota

1. Registra un array de reglas en `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantén `textMarkers`
   específicos del proveedor; nunca reutilices frases genéricas en inglés que entren en conflicto
   con `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registra reglas de clasificación en
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para elegir el ámbito de bloqueo
   adecuado (`connection` para cuotas de toda la cuenta, `model` para errores por modelo). Este
   paso solo tiene efecto en producción para los proveedores cuyas reglas necesiten el texto
   completo del error (marcadores del cuerpo): añade el identificador del proveedor a
   `FULL_TEXT_RULE_PROVIDERS` en el mismo archivo; de lo contrario, `checkFallbackError` solo
   entrega a la regla el error estructurado `{code, type}` y una regla basada en el texto del cuerpo
   nunca coincidirá con el tráfico real.
   Las reglas que coinciden únicamente por `status`/`headers` (como las de Opencode o Minimax) no
   necesitan esta habilitación. Por separado, si la regla declara `scope: "connection"` y la
   intención es aplicar un tiempo de espera real para toda la conexión además de omitir la
   combinación en la misma solicitud (no solo mostrar una etiqueta informativa), añade el
   identificador del proveedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` en el mismo archivo; esto es lo
   que controla el consumo de tipo `isAgentrouterConnectionQuotaScope()` en
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) y
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sin ello, `scope`
   sigue fluyendo mediante `fallbackResult.ruleScope`, pero nada actúa sobre él.
3. Añade pruebas unitarias que reproduzcan las de
   `tests/unit/upstream-status-restatement.test.ts`
   y `tests/unit/agentrouter-error-rules.test.ts` (incluidas las protecciones
   not-permanent / not-creditsExhausted y —si el proveedor necesita la lista de permitidos— una
   prueba que verifique que `resolveRuleMatchBody()` devuelve el texto completo solo para ese
   proveedor).

No se necesitan cambios en `chatCore.ts`, `classifyError` ni combo.

#### Bloqueo agrupado por bucket de salida (#10880)

Los proveedores de `EGRESS_BUCKETED_LOCK_PROVIDERS` (la familia opencode) se tratan
como upstream agrupado por IP (el nivel gratuito de opencode se agrupa por IP, no por cuenta;
consulta #9611): un estado 429 clasificado como `quota_exhausted`
**o** `rate_limit_exceeded` aplica un tiempo de espera a todas las conexiones de la familia incluida
en la lista de permitidos cuya última IP de salida conocida coincida con la de la conexión que
falló, antes de que la rotación pueda intentarlas
—evitando N-1 llamadas al upstream que fallarían inevitablemente (con la misma estructura que
#10460/#10525).
`rate_limit_exceeded` se incluye deliberadamente: en la ruta de `markAccountUnavailable`, las
reglas específicas de opencode nunca coinciden (no se entregan encabezados ni cuerpo a
`checkFallbackError`, y opencode no está en `FULL_TEXT_RULE_PROVIDERS`), por lo que un 429 cuyo
cuerpo contiene el texto de cuota de la suscripción ("límite de uso mensual alcanzado") se
clasifica como `quota_exhausted` mediante el fallback de texto de cuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; tiempo de espera de 1 h) antes de que se
alcance la regla `status_429`; mientras que un 429 sin texto de cuota (limitación de velocidad
simple) se clasifica mediante la regla `status_429` como `rate_limit_exceeded` y aun así aplica el
tiempo de espera a la familia de IP. Límites razonables:

- **Mejor esfuerzo**: el bloqueo resuelve el último `egress_ip` conocido de la conexión
  a partir de `proxy_logs` (ventana de 24 h, síncrono, sin caché). Caché fría (nunca se
  sondeó la IP de egreso) o ausencia de fila → la conexión fallida sigue enfriándose
  mediante la rama (registrado como hoy); simplemente no se bloquea ninguna conexión
  hermana.
- **Nunca terminal**: el enfriamiento es una ventana de cuota renovable
  (`testStatus: "unavailable"`); nunca se deriva un estado permanente a partir de una
  señal a nivel de IP. Las conexiones `disableCooling` omiten la rama por completo.
- **La granularidad del bloqueo cambia para la familia incluida en la lista de permitidos**: esto es un cambio de alcance, no solo una optimización de conexiones hermanas. opencode es un proveedor `passthroughModels`, por lo que antes de esta rama un 429 producía un bloqueo por MODELO; ahora produce un enfriamiento de la conexión, incluso para un operador que ejecuta una sola conexión sin ninguna conexión hermana. Esa es la granularidad que la tabla de reglas de opencode ya declara como correcta (`scope: "connection"`,
  `providerErrorRules.ts`), pero que nunca se había respetado porque opencode no está en
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La rama escribe por sí misma el enfriamiento y
  `backoffLevel` de la conexión fallida, replicando la rama de agentrouter con alcance de
  conexión, y retorna; el bloqueo por modelo y la ruta genérica de abajo nunca se alcanzan.
- **Combo incluido**: al igual que la rama de agentrouter, el alcance ignora deliberadamente
  la degradación `persistUnavailableState`/`isCombo` que aplica un llamador combo a un 429.
  Un bloqueo por modelo no es una forma más débil de este alcance, sino la unidad
  equivocada: no dice nada sobre la IP agotada, por lo que la rotación del combo seguiría
  consumiendo una llamada garantizada como fallida por cada conexión hermana.
- **Seguridad de las conexiones hermanas**: una conexión hermana que ya sea terminal
  (banned/credits_exhausted) o que ya esté en un enfriamiento más largo nunca se sobrescribe.
- **Lista de permitidos exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` es una
  decisión explícita del responsable; no hay integración genérica (patrón #10334/#10419).
  La consulta de conexiones hermanas vincula esa misma lista de permitidos en lugar de
  repetirla como un literal SQL, por lo que ampliarla sigue siendo un cambio de una sola línea.
- **Rotación de la IP de egreso, en ambas direcciones**: la ventana de búsqueda (24 h) es
  mucho más amplia que el TTL de la caché de IP de egreso (5 min), por lo que la «última IP
  conocida» es historial, no el estado actual. Si el proxy de una conexión rotó dentro de
  la ventana, el bloqueo puede **no detectar** una IP realmente compartida (la IP registrada
  es la nueva, aún no agotada) y, simétricamente, puede **enfriar una conexión hermana que
  desde entonces haya rotado** alejándose de la IP agotada. El segundo caso le cuesta a esa
  conexión hermana una ventana de enfriamiento; ambos son límites aceptados de mejor
  esfuerzo de una búsqueda basada en historial.
- **Coste**: dos exploraciones acotadas de `proxy_logs` (filtradas por ventana mediante
  `idx_pl_timestamp`), únicamente con la frecuencia de los 429. No se necesita un índice
  nuevo (migración 134 YAGNI). Medido en una copia de una base de datos con tráfico real y
  tamaño moderado; una instancia de alto rendimiento contiene proporcionalmente más filas
  en la misma ventana.

## Otras funciones de resiliencia

- **20 estrategias de enrutamiento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consulta [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Enrutamiento sensible al reinicio (reset-aware)** (v3.8.0) — prioriza las conexiones según el momento de reinicio de la cuota.
- **Degradación del modo en segundo plano** — el `background: true` de la Responses API se degrada a síncrono con una advertencia.
- **Detección dinámica del límite de herramientas** — aplica retroceso a los proveedores cuando se alcanzan los límites de cantidad de herramientas.
- **Fallback de emergencia** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; los operadores pueden anularlo desde la página Feature Flags sin reiniciar.

---

## Depuración

- El combo weighted responde `503 all_targets_cooling_down` (`Retry-After` establecido, `diagnostics.excluded` enumera cada objetivo con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → el pool está configurado y conectado, simplemente cada objetivo está excluido por un temporizador de resiliencia; la advertencia `[COMBO] Weighted selection: every target excluded before dispatch — …` indica los motivos y los segundos restantes. Un `404 no_executable_targets` del mismo combo significa que no intervino ningún temporizador de resiliencia (no hay nada que ejecutar, o todas las cuentas fallaron la sonda de disponibilidad). Implementado en `open-sse/services/combo/pinRecovery.ts` a partir de las exclusiones recopiladas en `targetResolution.ts`.
- Todas las claves de un proveedor omitidas → revisa tanto el estado del circuit breaker COMO el `rateLimitedUntil`/`testStatus` de cada conexión.
- Proveedor excluido permanentemente tras la ventana de reinicio → código que lee el `state` sin procesar en lugar de `getStatus()`/`canExecute()`.
- Una clave falla, las demás deberían funcionar → prefiere el cooldown de conexión en lugar del circuit breaker.
- Solo falla un modelo → prefiere el bloqueo de modelo (model lockout) en lugar del cooldown de conexión.
- El estado debería autorrecuperarse pero no lo hace → comprueba si hay una marca de tiempo futura y una ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales.

---

## Estado en tiempo de ejecución — referencia rápida para el agente

> Trasladado literalmente desde `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que la
> guía del agente se mantenga por debajo del presupuesto de contexto de 40k. Es la vista condensada,
> orientada al agente, de las secciones anteriores; las secciones numeradas siguen siendo la
> referencia completa.

OmniRoute tiene tres mecanismos de fallo temporal relacionados pero distintos. Mantén su
alcance separado al depurar el comportamiento de enrutamiento. Consulta el
[diagrama de resiliencia de 3 capas](../diagrams/exported/resilience-3layers.svg)
(fuente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para obtener un mapa de un vistazo.

### Circuit breaker de proveedor

**Alcance**: todo el proveedor, p. ej. `glm`, `openai`, `anthropic`.

**Propósito**: dejar de enviar tráfico a un proveedor que falla repetidamente a nivel de
upstream/servicio, de modo que un proveedor en mal estado no ralentice cada solicitud.

**Implementación**:

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Integración de la puerta de acceso/ejecución del chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado en tiempo de ejecución: `src/app/api/monitoring/health/route.ts`
- Wrappers compartidos: `open-sse/services/accountFallback.ts`
- Tabla de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: se permite el tráfico normal.
- `DEGRADED`: banda de alerta temprana — los fallos superaron el umbral de degradación pero aún
  no el umbral del breaker; el tráfico sigue fluyendo y los paneles muestran la advertencia. Una
  prueba de conexión válida o una ventana tranquila sin nuevos fallos lo devuelve a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` indica la ventana).
- `OPEN`: el proveedor está bloqueado temporalmente; los llamadores reciben una respuesta de
  circuito de proveedor abierto o el enrutamiento de combo salta a otro objetivo.
- `HALF_OPEN`: ha transcurrido el tiempo de espera de reinicio; se permite una solicitud de sondeo.
  Si tiene éxito, el breaker se cierra; si falla, se abre de nuevo.

**Valores predeterminados** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidos a través de
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` en `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` en `src/sse/handlers/chatHelpers.ts`). El breaker de proveedor
completo funciona con `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | se degrada en | se abre en (`circuitBreakerThreshold`) | reinicio (`circuitBreakerReset`) |
| ------- | ------------: | -------------------------------------: | -------------------------------: |
| OAuth   |           `5` |                                    `8` |                            `60s` |
| API key |           `7` |                                   `12` |                            `30s` |
| Local   |    (derivado) |                                    `2` |                            `15s` |

`PROVIDER_PROFILES` también define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) y `providerCooldownMs` (5/10/1 min): estos alimentan la
**puerta de ventana del Provider Cooldown global opcional** (`PROVIDER_COOLDOWN_ENABLED`,
desactivado por defecto): una entrada a nivel de proveedor en
`open-sse/services/providerCooldownTracker.ts` solo cuenta como en enfriamiento tras
`providerFailureThreshold` fallos dentro de `providerFailureWindowMs`, y luego se enfría durante
`providerCooldownMs`. NO son los umbrales del breaker activo — no los ajustes esperando un
comportamiento de breaker. Todos los valores predeterminados se pueden sobrescribir mediante las
variables de entorno `OMNIROUTE_PROVIDER_BREAKER_*` y `OMNIROUTE_CIRCUIT_BREAKER_*`; la tabla de
referencia precisa en tiempo de ejecución está en `docs/architecture/RESILIENCE_GUIDE.md`.

Solo los estados de fallo a nivel de proveedor deberían disparar el breaker de proveedor:

```ts
(408, 500, 502, 503, 504);
```

No dispares el breaker de proveedor completo por errores normales de cuenta/clave/modelo como la
mayoría de los casos `401`, `403` o `429`. Normalmente pertenecen al cooldown de conexión o al
bloqueo de modelo. Un `403` de un proveedor genérico con clave API debería ser recuperable a menos
que se clasifique como un error terminal de proveedor/cuenta.

El breaker usa recuperación diferida (lazy), no un temporizador en segundo plano. Cuando `OPEN` expira, las lecturas como `getStatus()`, `canExecute()` y `getRetryAfterMs()` actualizan el estado a `HALF_OPEN`, de modo que los dashboards y los constructores de candidatos de combos no sigan excluyendo indefinidamente a un proveedor expirado.

### Cooldown de conexión

**Alcance**: una conexión/cuenta/clave de proveedor.

**Objetivo**: omitir temporalmente una clave/cuenta defectuosa mientras se permite que otras conexiones del mismo proveedor sigan atendiendo solicitudes.

**Implementación**:

- Ruta de escritura/actualización: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección/filtrado de cuentas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuración: `src/lib/resilience/settings.ts`

Campos importantes en las conexiones de proveedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selección de cuentas, una conexión se omite mientras:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Los cooldowns también son diferidos: cuando `rateLimitedUntil` queda en el pasado, la conexión vuelve a ser elegible. Tras un uso exitoso, `clearAccountError()` limpia `testStatus`, `rateLimitedUntil`, los campos de error y `backoffLevel`.

Comportamiento predeterminado del cooldown de conexión:

- Cooldown base de OAuth: `5s`.
- Cooldown base de clave API: `3s`.
- El `429` de clave API debería preferir las sugerencias de reintento del upstream (`Retry-After`, encabezados de reinicio o texto de reinicio interpretable) cuando estén disponibles.
- Los fallos recuperables repetidos usan backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protección anti-thundering-herd evita que fallos concurrentes en la misma conexión extiendan repetidamente el cooldown o incrementen dos veces `backoffLevel`.

Los estados terminales no son cooldowns. `banned`, `expired` (que solo se vuelve terminal después de N reintentos acotados mediante `EXPIRED_RETRY_MAX`) y `credits_exhausted` están pensados para permanecer no disponibles hasta que cambien las credenciales/configuración o un operador los restablezca. No sobrescribas los estados terminales con estado transitorio de cooldown.

### Bloqueo de modelo

**Alcance**: proveedor + conexión + modelo.

**Objetivo**: evitar deshabilitar una conexión completa cuando solo un modelo no está disponible o tiene la cuota limitada para esa conexión.

Ejemplos:

- Proveedores con cuota por modelo que devuelven `429`.
- Proveedores locales que devuelven `404` para un modelo faltante.
- Fallos de permisos de modo/modelo específicos del proveedor, como ciertos modos de Grok.

El bloqueo de modelo reside en `open-sse/services/accountFallback.ts` y permite que la misma conexión siga atendiendo otros modelos.

### Guía de depuración

- Si se omiten todas las claves de un proveedor, inspecciona tanto el estado del breaker del proveedor como el `rateLimitedUntil`/`testStatus` de cada conexión.
- Si un proveedor parece excluido permanentemente después de la ventana de reinicio, verifica si el código está leyendo el `state` en bruto en lugar de usar `getStatus()`/`canExecute()`.
- Si una clave de proveedor falla pero otras deberían funcionar, prefiere el cooldown de conexión sobre el breaker del proveedor.
- Si solo falla un modelo, prefiere el bloqueo de modelo sobre el cooldown de conexión.
- Si un estado debería autorrecuperarse, debe tener una marca de tiempo futura/tiempo de espera de reinicio y una ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales en las credenciales o en la configuración.

---

## Fingerprinting TLS y sigilo

El sigilo específico del proveedor (JA3/JA4, CCH, ofuscación) está documentado por separado — consulta `docs/security/STEALTH_GUIDE.md` (git; no compilado en `/docs`).

---

## Pruebas de resiliencia (Fase 8 · Bloque C)

Más allá de las pruebas unitarias de la lógica de resiliencia, tres pruebas ejercitan el runtime bajo condiciones reales de estrés/fallo (todas de integración/nocturnas — ninguna bloquea los PRs):

| Prueba      | Qué                                                                                                                                                                                    | Ejecutar                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | El nodo fake-upstream inyecta latencia/reset/timeout/503 reales; valida que el circuit breaker se abre/recupera y que `checkFallbackError` clasifica el 503 como fallback recuperable. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` bajo `--expose-gc`; falla si el heap crece más allá del límite (protección OOM #3069).                                                              | `npm run test:heap`                      |
| k6 soak     | Carga sostenida contra `/api/monitoring/health`; umbrales de p95/errores.                                                                                                              | `k6 run tests/load/k6-soak.js` (nightly) |

Orquestado por `.github/workflows/nightly-resilience.yml` (cron + dispatch). En el `test:integration` por defecto, chaos y heap se omiten automáticamente (sin `RUN_CHAOS_INT`/`--expose-gc`).

---

## Véase también

- [Guía de arquitectura](./ARCHITECTURE.md) — Arquitectura del sistema e internos
- [Guía de usuario](../guides/USER_GUIDE.md) — Proveedores, combos, integración con la CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — Puntuación de 16 factores, paquetes de modos
