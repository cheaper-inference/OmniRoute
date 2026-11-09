# Reasoning Replay Cache (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fuente de referencia:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute captura el `reasoning_content` del asistente generado por modelos con modo de razonamiento y lo reproduce de forma transparente en solicitudes con múltiples turnos cuando el proveedor ascendente lo requiere. Esto elimina los errores HTTP 400 que generan los proveedores estrictos cuando al historial de conversación de un cliente le falta el razonamiento del turno anterior.

## Por qué existe esto

Varios proveedores con modo de razonamiento rechazan un turno posterior a menos que el **mensaje anterior del asistente incluya el `reasoning_content` original**. El proveedor ascendente devuelve un error 400 con mensajes como:

```
Parámetro incorrecto: El reasoning_content del modo de razonamiento debe enviarse de vuelta a la API.
```

Sin embargo, los clientes habituales (Cursor, Cline, Roo Code, OpenAI SDK) eliminan el `reasoning_content` del historial que reproducen. OmniRoute lo restaura desde una caché del lado del servidor para que la solicitud que recibe el proveedor ascendente sea coherente. La incidencia #1628 introdujo la persistencia híbrida en memoria/SQLite para que la caché sobreviva a los reinicios del proceso.

## Arquitectura

```
Turno N (el asistente genera):
  → la respuesta contiene reasoning_content + tool_calls
  → si requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      escribe en (memoria + BD), indexado por cada tool_call.id
  → reenvía la respuesta al cliente (que puede conservar o no el razonamiento)

Turno N+1 (el cliente envía un seguimiento):
  → el traductor detecta: requiresReasoningReplay(provider, model) === true
  → para cada mensaje del asistente con tool_calls y sin reasoning_content:
      lookupReasoning(toolCalls[0].id) → memoria → BD
      encontrado  → msg.reasoning_content = cached; recordReplay()
      no encontrado → msg.reasoning_content = "" (alternativa heredada para versiones anteriores de DeepSeek)
  → el servicio de origen recibe un historial coherente → no se produce un error 400
```

La captura se realiza en `open-sse/handlers/chatCore.ts` (en dos lugares, en los dos puntos donde se llama a `cacheReasoningFromAssistantMessage`). La reproducción se realiza en `open-sse/translator/index.ts` después de la coerción del esquema, pero antes del envío.

Los turnos simples del asistente (sin llamadas a herramientas) se indexan de forma diferente: `buildAssistantMessageCacheKey()` genera un resumen criptográfico del ámbito de la sesión junto con la transcripción normalizada en formato OpenAI hasta ese turno, porque DeepSeek requiere el razonamiento de _todos_ los turnos anteriores cuando `tools` está presente. Para los destinos de la API Responses (por ejemplo, `opencode-go/deepseek-v4-flash`, dirigido a `/responses`), el cuerpo enviado al servicio de origen contiene `input`, no `messages`, por lo que `translateRequest()` (`open-sse/translator/index.ts`) comunica mediante una opción de devolución de llamada la transcripción intermedia cuyo resumen criptográfico generó, y los puntos de captura generan el resumen criptográfico de esa misma transcripción. La fase de reproducción de Responses se ejecuta sobre la representación intermedia de OpenAI para todos los formatos de origen, por lo que también se reproducen los clientes de Anthropic Messages (Claude → OpenAI → Responses).

## Almacenamiento — Memoria híbrida + SQLite

La ruta crítica utiliza un `Map` en memoria (LRU por creación), respaldado por una tabla SQLite para la recuperación tras fallos y la visibilidad en el panel.

| Capa    | Implementación                                 | Finalidad                                                         |
| ------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| Memoria | `Map` en `open-sse/services/reasoningCache.ts` | Consultas rápidas; expulsa la entrada más antigua al llegar a 200 |
| BD      | Tabla `reasoning_cache` (`src/lib/db/`)        | Persiste entre reinicios y proporciona estadísticas               |

Las escrituras se realizan en ambas capas. Las lecturas consultan primero la memoria y, después, recurren a la BD (los aciertos de la BD vuelven a introducirse en la memoria). Los fallos de la BD no son fatales: la caché en memoria continúa atendiendo la ruta crítica.

**Valores predeterminados:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Máximo de entradas en memoria: `200` (`MAX_MEMORY_ENTRIES`)
- Expulsión: primero el `createdAt` más antiguo

## Esquema de la base de datos

Migración: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Índices: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se almacena como segundos desde la época Unix; la capa SELECT normaliza los valores de texto heredados mediante `EXPIRES_AT_EPOCH_SQL`.

## Detección de proveedor / modelo

La reproducción se habilita cuando `requiresReasoningReplay(provider, model)` devuelve `true`. La función comprueba dos listas en `open-sse/services/reasoningCache.ts`.

**ID de proveedores (coincidencia exacta, sin distinguir mayúsculas y minúsculas):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Patrones de expresiones regulares para modelos (sin distinguir mayúsculas y minúsculas):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` y `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, sufijo `-free` opcional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Añadir un nuevo proveedor/modelo estricto implica incorporarlo a una de estas listas y escribir una prueba unitaria que verifique la inyección de la reproducción. La descripción del PR debe citar la cadena 400 exacta del servicio upstream que motivó el cambio.

## API REST

La caché expone dos endpoints en `src/app/api/cache/reasoning/route.ts`. Ambos requieren autenticación de administración (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Endpoint                                                  | Descripción                                                             |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estadísticas + entradas paginadas                                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listado filtrado (`limit` restringido al intervalo `[1, 200]`)          |
| DELETE | `/api/cache/reasoning`                                    | Borra todo (memoria + BD) y restablece los recuentos de aciertos/fallos |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Borra únicamente las entradas de un proveedor                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Elimina una sola entrada                                                |

**Estructura de la respuesta GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Notas operativas

- **Limpieza:** `cleanupReasoningCache()` elimina las entradas caducadas de la memoria y ejecuta `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Los workers de comprobación de estado llaman a esta función periódicamente.
- **Recuperación tras fallos:** Después de un reinicio, la memoria está vacía, pero la BD sigue conservando las entradas no caducadas. La primera búsqueda de un `tool_call_id` determinado produce un acierto en la BD; las búsquedas posteriores producen aciertos en memoria.
- **Sin razonamiento, no hay caché:** `cacheReasoningFromAssistantMessage` devuelve `0` cuando el mensaje del asistente no contiene ningún campo `reasoning_content` / `reasoning`, por lo que las respuestas sin razonamiento no tienen coste.
- **La escritura también está condicionada:** ambos puntos de llamada en `chatCore.ts` (sin streaming y con streaming) solo llaman a `cacheReasoningFromAssistantMessage()` cuando `requiresReasoningReplay(provider, model)` es `true`, el mismo predicado que comprueba el lado de lectura. Las instalaciones que nunca utilizan un proveedor con reproducción dejan de asumir el coste de la escritura, la actualización del índice y el bloque try/catch en cada respuesta que contiene razonamiento.
- **Proveedores no estrictos:** Cuando `requiresReasoningReplay` es `false` y el formato de destino es OpenAI, el traductor **elimina** cualquier campo `reasoning_content` de los mensajes salientes; OpenAI Chat Completions no lo acepta.

## Propiedad del razonamiento opaco de Muse

Muse (`muse-code`) devuelve razonamiento opaco vinculado al llamador (`encrypted_content`). Reproducirlo con otra cuenta o con una credencial reemitida falla en el upstream, por lo que las solicitudes OAuth nativas usan propiedad a nivel de sesión en lugar de rotación por solicitud (`src/sse/services/museSessionOwnership.ts`, aplicada en `src/sse/handlers/chat.ts`). Las conexiones por clave de API seleccionadas explícitamente y las configuraciones que solo usan claves de API conservan su enrutamiento existente sin este modo de propiedad.

- Proporcione un ID de sesión estable en cada turno: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` o `x-codex-session-id`; alternativamente, use `prompt_cache_key`, `session_id`, `conversation_id` o `metadata.session_id` en el cuerpo (en ese orden de prioridad). Los IDs ausentes o vacíos devuelven 400 cuando hay dos o más cuentas OAuth nativas activas; con una sola cuenta OAuth no hay otra cuenta hacia la que rotar, así que esa solicitud conserva el enrutamiento sin fijación. El ámbito incluye el ID de la clave de API de OmniRoute del llamador.
- Las sesiones nuevas e independientes se reparten por round-robin entre las cuentas OAuth nativas activas permitidas por la política de conexiones de la clave de API, ordenadas por ID de conexión. El round-robin omite cuentas en espera de conexión, con estado terminal (`banned`, `expired`, `credits_exhausted`) o bloqueadas para el modelo solicitado; los fallos del upstream Muse registran la espera y el estado del circuit breaker como los demás proveedores. Una conexión forzada explícitamente omite el round-robin para una sesión nueva, pero no puede sustituir a un propietario después de que haya servido una respuesta correcta.
- Hasta que el propietario sirva una respuesta correcta, una sesión cuyo propietario haya quedado indisponible se reasigna a una cuenta en buen estado. Tras la primera respuesta correcta, la sesión permanece fijada a ese propietario hasta haber estado inactiva durante 30 días (`MUSE_SESSION_IDLE_TTL_MS`).
- Cada continuación y turno de resultado de herramienta sigue fijado al propietario de la sesión: conexión, identidad de cuenta y generación de credencial de inferencia, comprobadas otra vez antes de los intentos en el upstream, incluidos los reintentos tras actualizar credenciales. Los IDs de llamada/referencias de elementos de Responses y los IDs de llamada de herramienta de Chat Completions deben haberse registrado para esa sesión y generación.
- Los registros SQLite `key_value` del espacio de nombres `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) persisten la propiedad y el cursor de rotación entre reinicios. Cada asignación y respuesta servida actualiza la marca de actividad de la sesión; una sesión inactiva durante más de `MUSE_SESSION_IDLE_TTL_MS` se elimina (asociación del propietario, indicador de respuesta servida y hashes registrados de contenido opaco/referencias), como máximo una vez cada 10 minutos y en lotes limitados, de modo que una reproducción posterior de su historial se bloquea por seguridad como propietario desconocido. Los registros contienen IDs de conexión y hashes de identidad de cuenta, credenciales, contenido opaco y referencias de continuación, no secretos ni historial de conversación. Los clientes deben conservar y enviar su historial completo y el razonamiento opaco.
- El razonamiento opaco desconocido o ajeno, la ausencia de propietario, una cuenta propietaria indisponible o un cambio de generación con historial registrado provocan un bloqueo por seguridad con un 4xx/503 explícito: nunca hay failover silencioso entre cuentas ni se descarta el razonamiento.
- Una clave reemitida de la misma cuenta solo se adopta si la sesión no registró historial reproducible; las sesiones con registros siguen bloqueándose por seguridad hasta iniciarse de nuevo desde cero.
- Una respuesta vacía del upstream (`upstream_empty_response` / `empty_response`, sin emitir nada al llamador) se reintenta como máximo dos veces con el mismo propietario, tras 0.5 s y después 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Si todos los intentos están vacíos, se devuelve el 502 original sin marcar espera ni circuit breaker, para que una respuesta inestable nunca bloquee al propietario.
- Todas las solicitudes `muse-code` omiten las lecturas y escrituras de la caché semántica, incluidas las escrituras de streaming, para que una salida opaca en caché no adquiera otro propietario de sesión.

Protecciones contra regresiones: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` y `tests/unit/chatcore-semantic-cache.test.ts`.

## Ver también

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — disyuntores, períodos de espera, bloqueos de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnóstico de errores 400 de servicios externos
- Código fuente: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migración: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Ruta de la API: `src/app/api/cache/reasoning/route.ts`
- Incidencia original: #1628
