# REASONING_REPLAY (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fuente de la verdad:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Última actualización:** 2026-06-28 —

OmniRoute captura el asistente `reasoning_content` producido por modelos en modo de pensamiento y lo reproduce de forma transparente en solicitudes de múltiples turnos cuando el proveedor ascendente lo requiere. Esto elimina los errores HTTP 400 que los proveedores estrictos generan cuando al historial de conversaciones de un cliente le falta el razonamiento del turno anterior.

## Por qué existe esto

Varios proveedores de modos de pensamiento rechazan un turno de seguimiento a menos que el** El mensaje anterior del asistente incluye el `reasoning_content` original.** . El upstream devuelve 400 con mensajes como:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Pero los clientes típicos (Cursor, Cline, Roo Code, OpenAI SDK) eliminan `reasoning_content` del historial que reproducen. OmniRoute lo restaura desde una caché del lado del servidor para que la solicitud que ve el flujo ascendente sea consistente. El número #1628 introdujo la persistencia híbrida memory/SQLite para que la caché sobreviva a los reinicios del proceso.

## Arquitectura

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

La captura ocurre en `open-sse/handlers/chatCore.ts` (dos sitios, en los dos sitios de llamada `cacheReasoningFromAssistantMessage` ). La reproducción ocurre en `open-sse/translator/index.ts` después de la coerción del esquema pero antes del envío.

Los turnos de asistente simples (sin llamadas de herramientas) se codifican de manera diferente: `buildAssistantMessageCacheKey()` digiere el alcance de la sesión más la transcripción normalizada en formato OpenAI hasta ese turno, porque DeepSeek requiere el razonamiento de _cada_ turno anterior una vez que `tools` está presente. Para objetivos de API de Respuestas (por ejemplo, `opencode-go/deepseek-v4-flash`, enrutado a `/responses`), el cuerpo ascendente transporta `input`, no `messages`, por lo que `translateRequest()` (`open-sse/translator/index.ts`) informa la transcripción dinámica que digirió a través de una opción de devolución de llamada y los sitios de captura digieren esa misma transcripción. El pase de reproducción de Respuestas se ejecuta en OpenAI pivot para cada formato de origen, por lo que los clientes de mensajes Anthropic (Claude → OpenAI → Responses) también se reproducen.

## Almacenamiento — Memoria híbrida + SQLite

La ruta activa utiliza un `Map` en memoria (LRU por creación) respaldado por una tabla SQLite para la recuperación de fallos y la visibilidad del panel.

| Capa    | Implementación                                 | Objetivo                                                 |
| ------- | ---------------------------------------------- | -------------------------------------------------------- |
| Memoria | `Map` en `open-sse/services/reasoningCache.ts` | Búsquedas rápidas, desaloja a los más antiguos a los 200 |
| DB      | tabla `reasoning_cache` (`src/lib/db/`)        | Persiste durante los reinicios, impulsa las estadísticas |

Las escrituras van a ambos. Las lecturas consultan la memoria primero, luego recurren a DB (las visitas DB se promueven nuevamente a la memoria). Las fallas DB no son fatales. La caché en memoria — sirviendo la ruta activa.

**Valores predeterminados:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entradas de memoria máxima: `200` (`MAX_MEMORY_ENTRIES`)
- Desalojo: `createdAt` más antigua primero

## Esquema de base de datos

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

Índices: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se almacena como segundos de época Unix; la capa SELECT normaliza los valores de texto heredados mediante `EXPIRES_AT_EPOCH_SQL`.

## Detección de proveedor/modelo

La reproducción está habilitada cuando `requiresReasoningReplay(provider, model)` devuelve `true`. La función verifica dos listas en `open-sse/services/reasoningCache.ts`.

**Proveedor IDs (coincidencia exacta, no distingue entre mayúsculas y minúsculas):**

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

**Modelo de patrones de expresiones regulares (no distingue entre mayúsculas y minúsculas):**

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

Agregar un nuevo provider/model estricto significa agregarlo a una de estas listas y escribir una prueba unitaria que afirme la inyección de repetición. La descripción PR debe citar la cadena 400 ascendente exacta que motivó el cambio.

## REST API

El caché expone dos puntos finales bajo `src/app/api/cache/reasoning/route.ts`. Ambos requieren autenticación de administración (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Punto final                                               | Descripción                                                     |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estadísticas + entradas paginadas                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listado filtrado (`limit` sujeto a `[1, 200]`)                  |
| DELETE | `/api/cache/reasoning`                                    | Borrar todo (memoria + DB) y restablecer los recuentos hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Borrar solo entradas para un proveedor                          |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Eliminar una sola entrada                                       |

**forma de respuesta GET :**

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

- **Limpieza:** `cleanupReasoningCache()` purga las entradas de memoria caducadas y ejecuta `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Los trabajadores del control de salud llaman a esto periódicamente.
- **Recuperación de fallos:** Después de reiniciar, la memoria está vacía pero el DB aún contiene entradas no vencidas. La primera búsqueda de un `tool_call_id` determinado es un resultado DB ; las búsquedas posteriores son accesos a la memoria.
- **Sin razonamiento, sin caché:** `cacheReasoningFromAssistantMessage` devuelve `0` cuando el mensaje del asistente no tiene el campo `reasoning_content` / `reasoning`, por lo que las respuestas irreflexivas no cuestan nada.
- **La escritura también está cerrada:** ambos sitios de llamadas en `chatCore.ts` (sin transmisión y transmisión) solo llaman a `cacheReasoningFromAssistantMessage()` cuando `requiresReasoningReplay(provider, model)` es `true` — el mismo predicado que verifica el lado de lectura. Las instalaciones que nunca tocan un proveedor de reproducción dejan de pagar por la escritura, la actualización del índice y el try/catch en cada respuesta que contenga razonamiento.
- **Proveedores no estrictos:** Cuando `requiresReasoningReplay` es `false` y el formato de destino es OpenAI, el traductor** tiras** cualquier campo `reasoning_content` de mensajes salientes — OpenAI Chat Completions no lo acepta.

## Muse Propiedad de razonamiento opaco

Muse (`muse-code`) devuelve un razonamiento opaco vinculado a la persona que llama (`encrypted_content`). La reproducción con una cuenta diferente o con una credencial reinstalada falla en sentido ascendente, por lo que las solicitudes OAuth nativas utilizan la propiedad a nivel de sesión en lugar de la rotación por solicitud (`src/sse/services/museSessionOwnership.ts`, aplicada en `src/sse/handlers/chat.ts`). Las conexiones de clave API seleccionadas explícitamente y las configuraciones de solo clave API conservan su enrutamiento existente sin este modo de propiedad.

- Proporcione una sesión estable ID en cada turno: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` o `x-codex-session-id`; alternativamente use `prompt_cache_key`, `session_id`, `conversation_id` o `metadata.session_id` en el cuerpo (en ese orden de precedencia). IDs faltante o en blanco devuelve 400 cuando dos o más cuentas OAuth nativas están activas; con una sola cuenta OAuth no hay nada a lo que rotar, por lo que dicha solicitud mantiene el enrutamiento sin fijar. El alcance incluye la clave API OmniRoute ID de la persona que llama.
- Nuevas sesiones independientes por turnos entre cuentas OAuth nativas activas permitidas por la política de conexión de clave API, ordenadas por conexión ID. La operación por turnos omite las cuentas en el tiempo de reutilización de la conexión, con un estado de terminal (`banned`, `expired`, `credits_exhausted`) o modelo bloqueado para el modelo solicitado; Las fallas ascendentes de Muse registran el tiempo de reutilización y el estado del disyuntor como otros proveedores. Una conexión explícitamente forzada omite el round-robin para una nueva sesión, pero no puede anular a un propietario existente.
- Hasta que el propietario entregue una respuesta exitosa, una sesión cuyo propietario ya no esté disponible se vuelve a reclamar en una cuenta saludable. Después de la primera respuesta exitosa, la sesión permanece fijada a ese propietario hasta que haya estado inactiva durante 30 días (`MUSE_SESSION_IDLE_TTL_MS`).
- Cada turno de continuación y resultado de la herramienta permanece anclado al propietario de la sesión: conexión, identidad de la cuenta y generación de credenciales de inferencia, verificadas nuevamente antes de los intentos ascendentes, incluidos los reintentos de actualización de credenciales. Las respuestas llaman a las referencias IDs/item y la llamada a la herramienta de finalización de chat IDs deben haberse registrado para esa sesión y generación.
- Los registros SQLite `key_value` en el espacio de nombres `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) conservan la propiedad y el cursor de rotación se reinicia. Cada reclamo y respuesta entregada actualiza el sello de actividad de la sesión; una sesión inactiva durante más tiempo que `MUSE_SESSION_IDLE_TTL_MS` se elimina (pin de propietario, indicador servido y hashes opaque/reference registrados), como máximo una vez cada 10 minutos y en lotes limitados, por lo que una repetición posterior de su historial no se cierra como propietario desconocido. Los registros contienen IDs de conexión y hashes de identidad de cuenta, credenciales, contenido opaco y referencias de continuación, no secretos ni historial de conversaciones. Los clientes deben conservar y enviar su historial completo y razonamiento opaco.
- Un razonamiento opaco desconocido o extraño, un propietario faltante, una cuenta de propietario no disponible o un cambio de generación con un historial registrado fallan al cerrarse con un 4xx/503 — explícito, nunca se silencia la conmutación por error entre cuentas y nunca se descarta el razonamiento.
- Se adopta una clave de la misma cuenta recordada solo cuando la sesión no registró ningún historial reproducible; las sesiones grabadas siguen fallando y se cierran hasta que se inician de nuevo.
- Una respuesta ascendente vacía (`upstream_empty_response` / `empty_response`, no se emite nada a la persona que llama) se reintenta como máximo dos veces con el mismo propietario, después de 0,5 s y luego 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Si todos los intentos son vacíos, el 502 original se devuelve sin tiempo de reutilización ni marca de interruptor, por lo que una respuesta incorrecta nunca bloquea al propietario.
- Todas las solicitudes `muse-code` omiten las lecturas y escrituras de la caché semántica, incluidas las escrituras en streaming, por lo que la salida opaca almacenada en caché no puede adquirir un propietario de sesión diferente.

Guardias de regresión: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` y `tests/unit/chatcore-semantic-cache.test.ts`.

## Ver también

- Disyuntores [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —, tiempos de reutilización, bloqueos de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticando 400 aguas arriba
- Fuente: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migración: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Ruta API : `src/app/api/cache/reasoning/route.ts`
- Número original: #1628
