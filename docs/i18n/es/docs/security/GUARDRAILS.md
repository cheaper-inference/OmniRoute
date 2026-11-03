# Guardrails (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fuente de verdad:** `src/lib/guardrails/`
> **Última actualización:** 2026-10-17 — v3.8.52 (se añadió [Cobertura y límites](#coverage-and-limits):
> qué rutas y rutas de respuesta alcanzan los hooks, los encabezados de desactivación combinados (#16412), el modo de bloqueo de inyección como límite obligatorio (#16413), y qué ve una respuesta antes del post-call)

Los guardrails aplican transformaciones de seguridad, política y contenido en el límite
entre OmniRoute y los proveedores upstream. Cada guardrail puede inspeccionar (y
opcionalmente rechazar, transformar o anotar) las cargas útiles de las solicitudes (`preCall`) y
las respuestas upstream (`postCall`).

El sistema es **fail-open**: si un guardrail lanza una excepción durante la ejecución, el registro
registra el error y continúa con el siguiente guardrail en lugar de fallar la
solicitud. El bloqueo es una decisión explícita (`block: true`), nunca un accidente.
La única excepción es una solicitud abortada: cuando la `signal` del llamador se aborta,
un guardrail que lanza una excepción rechaza la ejecución del hook en lugar de ser omitido.

Los hooks **no** se ejecutan en cada ruta ni en cada respuesta. Lee
[Cobertura y límites](#coverage-and-limits) antes de confiar en un guardrail como
control de seguridad.

## Barandillas incorporadas

El registro carga automáticamente seis barreras de seguridad en orden de prioridad al importar (consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridad | Nombre              | Etapa(s)       | Archivo               |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Se ejecutan números de menor prioridad** primero** .

### Puente Visión (`visionBridge.ts`) — Modalidad Puente PR-1

El modelo base GLM 5.3 y `glm-5.3-{low,high,max}` tienen metadatos `supportsVision:false` registry/spec explícitos. Las variantes GLM 5.3 Flash siguen siendo modelos de visión nativa. La ruta `/v1/messages` del código Claude ingresa a la cadena de barandilla previa a la llamada `handleChat` compartida** antes** Traducción de Claude a OpenAI; Las imágenes anidadas de resultados de la herramienta `Read` deben describirse o manejarse antes de que la traducción las convierta en contenido OpenAI `image_url` (#17069).

Intercepta solicitudes de imágenes dirigidas a** modelos sin visión** y redirige toda la solicitud a un modelo con capacidad de visión o reemplaza las partes de la imagen con descripciones de texto producidas por un modelo de visión configurable antes de la llamada ascendente. Esto permite a los proveedores de solo texto manejar de forma transparente cargas útiles multimodales.

Fluir:

1. Omita si el modelo de destino ya admite visión (a menos que aparezca en la lista de puentes forzados `isVisionBridgeForcedModel`).
2. Extraiga partes de la imagen a través de `extractImageParts(messages)` (`visionBridgeHelpers.ts`), que delega al** detector de medios unificado** `detectMediaParts()` en `open-sse/utils/mediaParts.ts` — la única fuente de verdad compartida con el filtro de compatibilidad combinado. La extracción está incluida en la lista de permitidos para las formas `replaceImageParts` puede volver a unir (el contrato de reemplazo de extracto ↔): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` y Responses API `input_image`. Las imágenes coincidentes anidadas dentro de Claude Code `tool_result.content` y las salidas de la herramienta Respuestas también se extraen y reemplazan en sus rutas originales; Las formas de solo indicador son material de filtro combinado y no se extraen. Omita si no encuentra ninguno.
3. Resolver la configuración del tiempo de ejecución a través de `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): ganan las nuevas claves de configuración `modalityBridge*` ; Las claves `visionBridge*` heredadas siguen siendo una** retroceso de un ciclo** (ventana de retroceso). Salte antes de cualquier recorrido de medios cuando el puente esté deshabilitado.
4. El selector de modo (`modalityBridgeVisionMode`, consulte la tabla a continuación) decide redireccionar versus describir. Redirigir devuelve `modifiedPayload` con solo `model` intercambiado, más meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Describir ruta: tapar imágenes en `maxImages`, redactar el mensaje de tarea, consultar el caché de descripción, llamar al modelo de visión** en paralelo** (`Promise.allSettled`) e inyectar partes de texto `[Image N]: <description>` en su lugar. Una descripción fallida produce `null`: la imagen sin procesar se conserva para los objetivos unknown/vision-capable (#4012), pero** objetivo directo confirmado de solo texto** o el combo de visión cero obtiene un código auxiliar de texto `(unavailable — no vision-capable provider connected)` explícito para cada imagen no descrita, incluidas fallas parciales e imágenes más allá del límite de llamada de descripción (#17069). El combo de descripción fallida existente permanece vigente (#8430).
6. Devuelve `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Por defecto | Comportamiento                                                                                                                                                                                                                                                                                                                           |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Heurística heredada, intacta (#6640/#7204): los modelos no combinados/`auto/` se redirigen al mejor modelo de visión a menos que el modelo original ya tenga credenciales utilizables (luego describa); Los objetivos combinados siempre describen.                                                                                      |
| `describe` |             | Describa siempre — el bloque de redireccionamiento se omite por completo; El modelo elegido por el usuario siempre responde.                                                                                                                                                                                                             |
| `reroute`  |             | Forzar redireccionamiento: se omite la protección del modelo para mantener credenciales. El desvío-** objetivo** La protección de credenciales aún aplica — cuando no existe un objetivo de visión utilizable, el puente se bloquea con un error claro en lugar de describir o enviar imágenes sin procesar a un objetivo de solo texto. |

Cortocircuito de modos forzados** antes** la auto heurística se ejecuta; El comportamiento `auto` es byte idéntico al de la barandilla pre-PR-1.

#### Alcance de la clave API (`visionBridgeKeyScope.ts`)

Cuando la clave API de la persona que llama restringe `allowedConnections`, grupos de cuotas (`allowedQuotas`) o modelos (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), el puente solo selecciona redireccionar y describir los modelos que la clave puede usar, en las conexiones que la clave puede usar. Luego, la llamada de descripción siempre pasa por el bucle automático OmniRoute con el encabezado `x-omniroute-self-loop-key-id`, por lo que la solicitud de chat de recepción aplica nuevamente la política de conexión y modelo de esa clave. `enforceApiKeyPolicy()` respeta ese encabezado solo junto con el portador de bucle automático, por lo que solo puede restringir el acceso y una identificación que no se resuelve se rechaza.

Si no se permite ningún modelo de visión para la clave, se** destino de solo texto confirmado** rechaza la solicitud de imagen localmente con un HTTP 400 claro en lugar de reenviar bytes de imagen a un upstream incapaz (#17069). Para objetivos con capacidad de visión nativa o desconocida, la ruta de descripción conserva su comportamiento anterior de apertura fallida (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Las solicitudes sin clave y las claves sin estas restricciones se comportan exactamente como antes.

#### Mensaje de descripción consciente de tareas (`modalityBridgeVisionTaskAware`)

Por defecto** verdadero** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) añade el texto del** último mensaje de usuario** (truncado a 500 caracteres) al mensaje de descripción base, dirigiendo la descripción hacia lo que el usuario realmente preguntó (patrón codex-vision-proxy) y pidiendo al modelo de visión que transcriba el texto visible. Con la bandera — desactivada o sin texto de usuario — el mensaje base se utiliza sin cambios.

La solicitud compatible con OpenAI del propio bucle propio de descripción (`callVisionModelSingle()` en `visionBridgeHelpers.ts`) siempre solicita `image_url.detail: "high"` — incondicionalmente, para cada caller/provider, sin estar activada por ninguna señal del cliente. El muestreo con poco detalle degrada la precisión OCR exactamente para la tarea de transcripción de texto que solicita este mensaje, por lo que la llamada describe siempre solicita un alto nivel de detalle independientemente del nivel de detalle utilizado por la solicitud entrante original. Esto sólo afecta al cuerpo interno de la solicitud de descripción; no cambia cómo OmniRoute reenvía el propio `image_url.detail` de la persona que llama en la solicitud principal — que de forma predeterminada se aplica por separado, y solo para los clientes OpenCode detectados, en `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La rama de formato de cable Anthropic del bucle propio de descripción no tiene campo `detail` y no se ve afectada por ninguno de los valores predeterminados.

#### Describir el límite de salida (`modalityBridgeVisionMaxChars`)

| Llave                          | Por defecto | Rango           |
| ------------------------------ | ----------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` o 100–50000 |

`0` (predeterminado) significa** sin gorra** — la descripción devuelta por `callVisionModel()` se pasa sin modificar, preservando el comportamiento existente. Cualquier valor en el rango de 100 a 50000 trunca la descripción con un sufijo `…` antes de volver a unirla como `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` en `src/lib/guardrails/visionBridge.ts`). Aumente esto para tareas OCR con muchos detalles donde el modelo posterior necesita la transcripción completa; bájelo al uso limitado de tokens en modelos de visión habladora. El campo del panel se encuentra en el panel Avanzado de la pestaña Visión (`modality-bridge-max-chars` en `ModalityBridgeVisionTab.tsx`) y fija cualquier valor entre 1 y 99 hasta el piso 100 mientras deja un `0` explícito intacto. — `0` es un valor Zod válido por derecho propio (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), no simplemente el valor predeterminado "no configurado".

#### Describir caché (`modalityBridge/bridgeCache.ts`)

Caché LRU + TTL en memoria para describir resultados, compartido en todo el proceso. Clave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con encuadre de prefijo de longitud (sin colisiones de límites de campo). El componente del modelo es el** configurado** El modelo de puente, no el modelo que realmente respondió — `callVisionModel` puede retroceder internamente, y la codificación por intento fragmentaría el caché. Las descripciones fallidas nunca se almacenan en caché. Ajustes:

| Llave                           | Por defecto | Rango   |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Normalización remota de imágenes (búsqueda describe/base64 de bucle automático)

Cuando el puente trae un** remoto** la imagen en sí — Anthropic describe la autollamada y la conversión base64 de formato claude-wire (`ensureBase64ImagesForClaudeWire`), ambas a través de `fetchRemoteImageAsDataUri()` en `visionBridgeHelpers.ts` —, los datos resultantes URI se pasan a través de `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de incrustarse en la solicitud del modelo de visión. Las imágenes de gran tamaño se reducen a un** 2048px borde largo** (que coincide con el límite de cambio de tamaño OpenAI/Anthropic que ya se aplica en el lado del servidor), lo que corta la carga de bytes/latency sin cambiar lo que ve el modelo de visión. El cambio de tamaño utiliza `sharp`, cargado mediante importación dinámica: en una plataforma donde su binario nativo no se carga, `normalizeDataUri()`** nunca tira** — recurre a un paso de los bytes originales, por lo que la ruta describe/base64-conversion siempre sigue funcionando. Los bytes que no son de imagen (una recuperación que no devolvió una imagen decodificable) también se pasan intactos. Esta normalización tiene como alcance las imágenes que el puente obtiene para su propia autollamada — y nunca se aplica a la carga útil de paso sin procesar de la persona que llama, de acuerdo con el principio de mutación de solo participación voluntaria (Regla estricta n.° 20).

#### Configuración del esquema de migración +

Las nuevas claves `modalityBridge*` están validadas por Zod en `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, el trío `modalityBridgeCache*` y el grupo `modalityBridgeAudio*` utilizado por Audio Bridge. La migración `141_modality_bridge_settings.sql` copia los valores `visionBridge*` heredados existentes en las nuevas claves correspondientes (idempotente, nunca sobrescribe un valor `modalityBridge*` establecido por el operador); las claves heredadas siguen siendo aceptadas como alternativa de lectura durante un ciclo de lanzamiento.

#### Encabezado de transparencia estadísticas +

Las respuestas de descripción transformada llevan `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construido por `buildModalityBridgeHeader()` en `modalityBridge/bridgeStats.ts`, estampado por `withModalityBridgeHeader()` en `src/sse/handlers/chatHelpers.ts`). Las solicitudes redirigidas obtienen** No** encabezado — la carga útil no se modificó y el intercambio de modelo ya es visible en el campo `model` del cuerpo de la respuesta.

`GET /api/modality-bridge/stats` (autenticación de administración, mismo nivel que `GET /api/settings`) devuelve los contadores por modalidad en memoria `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` y `video`. `averageLatencyMs` usa `latencySamples`, no todos los intentos, como denominador; una operación sin cronometraje no fabrica una muestra de cero milisegundos. `bridged` sigue siendo el alias compatible con versiones anteriores para conversiones exitosas; los intentos fallidos no lo incrementan. Los contadores se reinician al reiniciar el proceso por diseño (telemetría, no contabilidad).

#### Configuración del panel

La página del panel dedicada es `/dashboard/settings/modality-bridge`. Sus pestañas `Vision`, `Audio` y `Video` con dirección URL conservan los parámetros de consulta mientras cambian el valor `tab`. La pestaña Visión expone la habilitación, el modo, la selección del modelo (incluido el valor predeterminado automático), las indicaciones según las tareas, los límites avanzados timeout/image/description-length/cache, los contadores de tiempo de ejecución y una solicitud de muestra protegida. La pestaña Audio también está activa: expone la habilitación, un selector de modelo solo STT con Auto, límites timeout/max-clip, contadores de audio y una prueba de muestra `input_audio`. La pestaña Video es funcional: informa el estado de tiempo de ejecución FFmpeg/ffprobe — uno de los cuatro estados explícitos UI (`unknown` mientras la sonda está en vuelo o no se pudo completar, `restricted` en un host de panel sin bucle invertido donde la sonda se omite en el lado del cliente, `unavailable` una vez sondeado y confirmado que falta, o `available` con las versiones FFmpeg/ffprobe ). — persiste en los límites enable/model/frame/video/timeout, filtra el selector de modelos a modelos con capacidad de visión y expone contadores de video.

La antigua tarjeta Vision Bridge en la configuración AI es un enlace de compatibilidad a la nueva página; ya no posee una segunda copia del formulario. Los proveedores de medios también vinculan los flujos de trabajo de imagen a texto y de voz a texto a las pestañas correspondientes de Modality Bridge sin eliminar el área de juegos de voz a texto existente.

**Bypass de admisión de bucle automático:** cuando la llamada de descripción se enruta a través del propio bucle automático `/v1` de OmniRoute(modelo de proveedor no estándar), la subsolicitud envía `x-omniroute-admission-bypass: internal` y se autentica con la credencial de bucle automático resuelta — el centinela `sk_omniroute` local en modo local, o la clave env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada por el operador (#1350) para que las implementaciones `REQUIRE_API_KEY=true` aún puedan ejecutar la llamada de descripción. La omisión solo se respeta para esas credenciales exactas, por lo que los clientes externos no pueden usar el encabezado para omitir la admisión.

Los valores predeterminados heredados se encuentran en `src/shared/constants/visionBridgeDefaults.ts`; Los nuevos valores predeterminados mode/task-aware/cache y el solucionador de configuraciones se encuentran en `src/shared/constants/modalityBridgeDefaults.ts`. La barrera de seguridad expone una opción de constructor `deps` para que las pruebas puedan inyectar implementaciones `getSettings` y `callVisionModel` falsas.

### Puente de audio (`audioBridge.ts`) — Puente de modalidad PR-3

Intercepta solicitudes de chat con audio antes de que lleguen a un objetivo que no acepta entradas de audio. Nunca redirige la solicitud de chat: las partes de audio se transcriben a través del punto final multiparte existente compatible con OpenAI y el modelo de chat elegido continúa con transcripciones de texto.

Fluir:

1. Resolver `supportsAudio` hasta `getResolvedModelCapabilities()`. Prevalecen los metadatos explícitos del registro de proveedores, luego los metadatos del modelo estático y luego `modalities_input` sincronizado. Una lista de entrada declarada sin `audio` es `false`; no queda evidencia de capacidad `null`. Tanto `false` como `null` activan el puente conservador, mientras que `true` lo evita.
2. Resuelva la configuración `modalityBridgeAudio*` y extraiga partes de audio de nivel superior empalmables de cada mensaje a través del detector `detectMediaParts()` compartido. Las formas de cable admitidas son OpenAI `input_audio`, `audio_url` y `source.media_type: "audio/*"`. El audio anidado se detecta para el enrutamiento, pero la ruta de empalme no lo elimina. El trabajo está limitado por `modalityBridgeAudioMaxClips`; Las partes posteriores permanecen intactas.
3. Respete un `provider/model` configurado o deje que `selectAudioBridgeModel()` recorra `AUDIO_TRANSCRIPTION_PROVIDERS` en un orden de catálogo estable y seleccione el primer modelo con una credencial de proveedor activa utilizable.
4. `callAudioTranscription()` convierte audio base64/data-URI a un `file` multiparte, o descarga un `audio_url` remoto a través de la guardia de salida solo pública con fijación DNS y un enlace de 25 MB. Luego POSTs el archivo y el modelo seleccionado en el autobucle `/v1/audio/transcriptions` local, autenticado con `resolveSelfLoopBearer()`. La ruta de transcripción existente realiza búsqueda de credenciales normal, manejo cooldown/rate-limit y envío de proveedores.
5. Las llamadas exitosas reemplazan sus piezas con `[Audio N]: <transcript>`. Llamadas ejecutadas con `Promise.allSettled`: una falla individual preserva esa parte de audio original (contrato #4012). Si todas las llamadas fallan y se prueba el objetivo `supportsAudio === false`, las partes se convierten en `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para un objetivo desconocido (`null`), un resultado de falla total permanece intacto. Un objetivo probado de solo texto sin credencial STT utilizable recibe el mismo código auxiliar explícito sin emitir una llamada de red.

Las transcripciones exitosas utilizan el caché LRU/TTL de Modality Bridge en todo el proceso. La clave combina la referencia de audio, la etiqueta de operación `audio-transcription` estable y el modelo STT seleccionado; los fallos nunca se almacenan en caché. Los intentos de audio actualizan los contadores `bridged`, `cacheHits`, `failures` y `lastUsedAt` compartidos. Las respuestas transformadas llevan `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; Las solicitudes intactas no reciben un segmento de Audio Bridge.

La configuración del tiempo de ejecución está respaldada por DB y validada por Zod:

| Llave                         | Por defecto | Rango         |
| ----------------------------- | ----------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —             |
| `modalityBridgeAudioModel`    | `""`        | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10          |

La caché compartida permanece controlada por `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y `modalityBridgeCacheMaxEntries`.

### Puente de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de video de nivel superior en Finalizaciones de chat `messages` y Respuestas API `input` antes de que se llame a un objetivo sin soporte de video nativo conocido. Las formas admitidas son `input_video`, `video_url`, `video_source`, HTTPS URLs y `data:video/*;base64,...` data URIs. Los nombres de archivos simples en texto no se tratan como videos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) posee el recorrido de solicitudes, la verificación capability/policy, la agregación por solicitud y la carga útil de respuesta. La adquisición de — por video, el caché de resultados completos, que describe una secuencia de fotogramas (que fusiona cualquier transcripción de audio declarada por la persona que llama) y metrics/abort/cleanup — por intento está oculto detrás `processVideoPart` en `videoBridgePipeline.ts`, llamado una vez por parte de video dentro del bucle de `preCall`. Ese módulo también define los límites explícitos del puerto `VideoMediaBrokerPort` (adquirir bytes y extraer cuadros de muestra), `VideoAudioTranscriptionPort` (fusionar una transcripción de audio declarada por la persona que llama con los subtítulos de muestra) y `VideoDrilldownPort` (el límite de persistencia de desglose del marco; aún no conectado a `processVideoPart` — solo la ruta separada `/api/modality-bridge/video/drilldown` escribe entradas de desglose hoy).

La ruta de solicitud pública `/v1` nunca importa ni invoca un subproceso. Los vídeos remotos se descargan con un límite de 50 MiB ; Los videos base64 en línea tienen un límite conservador de 36 MiB decodificados por video, por lo que el sobre model/messages/framing puede permanecer dentro del límite de admisión de solicitudes públicas de JSON de 50 MiB. Las estimaciones de longitud en línea y tamaño decodificado se verifican antes de la asignación. Se requiere HTTPS en el URL remoto inicial y en cada redireccionamiento, utilizando la protección de salida existente solo pública con fijación DNS. Luego, los bytes cruzan el límite interno exacto del corredor `POST /api/modality-bridge/video/extract`. Esa ruta es `LOCAL_ONLY` y `SPAWN_CAPABLE`, acepta solo una solicitud de bucle invertido confiable autenticada por proceso y nunca acepta un URL, una ruta del sistema de archivos, un ejecutable o una lista de argumentos. La canalización de tamaño de cuerpo API y el lector de cuerpo incremental del controlador aplican de forma independiente un límite de entrada de corredor de 50 MiB. Su cola limitada ejecuta una extracción a la vez, permite cuatro trabajos pendientes y limita la entrada pendiente a 100 MiB.

Dentro del corredor, `ffprobe` lee un archivo local privado; la lista permitida de formato fijo excluye los formatos de lista de reproducción y manifiesto. Para los contenedores de la familia MOV permitidos, las referencias de datos MOV externos permanecen deshabilitadas de forma predeterminada y el comando fijo no las habilita. Tanto `ffprobe` como `ffmpeg` usan la lista blanca del protocolo `file` -only, un hilo, matrices de argumentos fijos, sin shell y ejecutables resueltos desde `PATH`. Las transmisiones de portada con imágenes adjuntas no son candidatas reproducibles. Todos los flujos reproducibles deben satisfacer los límites, y se prefiere un flujo predeterminado explícito antes del retroceso determinista de índice más bajo. Los videos están limitados a 600 segundos, 8192 píxeles por dimensión y 33,554,432 píxeles de origen. FFmpeg toma muestras de 1 a 16 cuadros JPEG de punto medio, reduce el borde largo a un máximo de 1024 píxeles sin aumentar la escala de entradas más pequeñas y nunca recibe un URL. El muestreo es `uniform` por defecto. Las políticas opcionales `scene_aware` y `segment_aware` experimental realizan un paso FFmpeg fijo adicional sobre el flujo local ya validado, seleccionan marcas de tiempo de escena `showinfo` limitadas y recurren de manera determinista a los mismos puntos medios uniformes en caso de falla del detector, tiempo de espera, salida con formato incorrecto o un conjunto de candidatos vacío. El modo con reconocimiento de segmentos asigna muestras de puntos medios proporcionalmente a los intervalos de escena validados; A continuación se detallan la evidencia basada en segmentos y el comportamiento alternativo. El límite estricto de 16 cuadros se aplica después de la selección en cada póliza. Cuando una solicitud con reconocimiento de escena tiene solo un presupuesto de un cuadro, utiliza el punto medio uniforme de la ventana activa de video completo o de enfoque e informa `policyEffective: uniform`: un solo cuadro de escena seleccionado no puede preservar ambos extremos temporales. Opcionalmente, la persona que llama puede proporcionar una ventana de enfoque finita (`start`/`end` segundos); los límites se limitan a la duración del medio, se rechazan las ventanas invertidas o no finitas y todas las políticas de muestreo se realizan solo dentro del intervalo normalizado. La ventana resultante se incluye en los metadatos de muestreo y en el prefijo de descripción que no es de confianza para que los modelos posteriores puedan distinguir un extracto enfocado de la línea de tiempo completa.

El enfoque de los subtítulos semánticos es un entorno explícito e independiente. El modo de análisis `full` predeterminado conserva el mensaje de fotograma existente y nunca reenvía el texto de la solicitud al modelo de título. En el modo `focused`, el puente lee solo el último `text`/`input_text` no vacío creado por el usuario del mismo contenedor de Chat o Respuestas, lo normaliza a NFC, contrae los caracteres de control y los espacios en blanco y lo limita a 500 puntos de código Unicode. Un resultado vacío vuelve al mensaje `full` exacto. Una sugerencia utilizable se serializa como JSON en un bloque dedicado de contexto de usuario que no es de confianza y solo puede priorizar detalles observables; no puede anular la advertencia separada contra el seguimiento de instrucciones visibles o audibles en los medios. El enfoque textual nunca infiere `start`/`end` ni cambia la muestra temporal.

#### evidencia del segmento estructural FU-07

`segment_aware` utiliza un pase de preanálisis limitado sobre la transmisión de video local ya validada. La cadena de filtros fijos primero se escala hasta un máximo de 320 píxeles de ancho, detecta cambios de escena e intervalos congelados, luego toma muestras a 1 fotograma por segundo para obtener información de desenfoque, luma promedio y spatial/temporal. El pase está limitado a 600 muestras estructurales, un subproceso FFmpeg/filter, el mismo protocolo `file` -only y listas permitidas de contenedor, un enlace de salida de proceso de 1 MiB y como máximo 30 segundos dentro del abort/deadline. compartido del intermediario. Nunca acepta un comando, filtro, ruta o URL de la solicitud.

Los valores estructurales son evidencia de muestreo determinista, no comprensión semántica del video. No infieren temas, acciones, subtítulos, discursos o intenciones del usuario. Los límites de escena y congelación forman segmentos; congelar la cobertura, el desenfoque, la exposición, los detalles espaciales y el cambio temporal solo influyen en cómo se asigna el presupuesto existente de 1 a 16 fotogramas. Un segmento completamente congelado tiene un límite de un fotograma, mientras que los segmentos no congelados compiten por el presupuesto restante. Cuando los límites superan en número a los fotogramas, se conserva una cobertura uniforme de la línea de tiempo para que los primeros cortes rápidos no puedan ocultar un largo segmento final. Los límites de la escena dentro de la resolución de análisis de 1 segundo de un límite congelado se fusionan.

Los filtros faltantes, la evidencia malformed/empty, un error del detector o el tiempo de espera previo al análisis limitado no se abren a la política de punto medio uniforme exacta. Una cancelación de llamada o una fecha límite de intermediario no falla al abrirse: finaliza el subproceso en curso, evita la extracción posterior de fotogramas y el árbol temporal privado se elimina en `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera accesorios FFmpeg reales deterministas para ahorros de llamadas de subtítulos posteriores a la deducción, asignación de presupuesto de movimiento denso, evidencia blur/exposure/SI-TI, cortes rápidos con una cola larga y falsos positivos de desvanecimiento gradual. Registra el tiempo de pared previo al análisis y, cuando `/usr/bin/time` está disponible, CPU secundario y RSS máximo. Sus controles de calidad son únicamente oráculos estructurales. La calidad real del modelo de título sigue siendo `HOLD` porque este arnés no tiene un punto final autorizado ni un juez congelado. Los ahorros monetarios también siguen siendo `HOLD` a menos que `--caption-cost-per-call-usd` proporcione una estimación positiva explícita por llamada; el guión nunca fabrica ninguno de los resultados.

Cada trama está limitada a 4 MiB, todas las tramas sin formato juntas a 23 MiB y la respuesta del intermediario serializado a 32 MiB. Un directorio temporal privado se elimina en `finally`. OmniRoute no incluye FFmpeg y no acepta una ruta ejecutable personalizada. Antes de los subtítulos, el puente aplica una pasada de deduplicación visual conservadora: cada JPEG se reduce a un búfer de escala de grises de 16 × y 16 y se compara solo con el último fotograma retenido. Para un presupuesto de subtítulos solicitado superior a un fotograma, la extracción proporciona un grupo de candidatos limitado de hasta el doble de ese presupuesto y nunca más de 16 fotogramas. El límite solicitado se aplica solo después de la deduplicación, y los candidatos seleccionados primero y final se conservan durante la reducción final cuando el presupuesto es de al menos dos. La política `grayscale-16x16-mean-cells-v2` versionada utiliza el mayor entre el delta de luma medio y la proporción de celdas en miniatura cuyo delta normalizado es al menos 0,05. El umbral duplicado es la constante 0,04, elegida por motivos de previsibilidad en lugar de expuesta como una configuración de tiempo de ejecución. Esta señal secundaria de alto contraste preserva pequeños cambios de movimiento y texto visible que una comparación de sólo media puede ocultar. Los errores del comparador o decodificador fallan al abrirse y mantener la cobertura. Los metadatos de salida separan los candidatos extraídos, los fotogramas utilizados con éxito y los duplicados visuales eliminados.

Una parte de vídeo marcada explícitamente puede solicitar una hoja de contacto con marca de tiempo. El puente construye como máximo una cuadrícula JPEG de 4 columnas y 16 marcos. Cada celda de 512 píxeles graba su marca de tiempo de origen en una banda inferior de alto contraste, mientras que las mismas marcas de tiempo permanecen en metadatos textuales para asociación y auditoría posteriores. El JPEG completo sigue teniendo un límite de 32 MiB. Si `sharp` no puede decodificar o componer la cuadrícula, el puente vuelve a los cuadros JPEG individuales; la cancelación de un cliente aún se propaga a través de la operación de hoja.

La evidencia de promoción está deliberadamente separada del microbenchmark de composición sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define un arnés A/B con versión de esquema para modelos de visión reales compatibles con OpenAI. Mide los tokens informados por el proveedor, la latencia del muro de un extremo a otro (incluida la composición de la hoja), el recuento de llamadas de modelos y la retención de hechos definidos por el manifiesto. Las respuestas del modelo sin procesar no se escriben en el informe; sólo se conservan los resúmenes SHA-256 y los hechos coincidentes IDs. El arnés no realiza ninguna llamada de red o de modelo pago a menos que se pase `--execute-real` y se configuren `--model`, `OMNIROUTE_BASE_URL` y `OMNIROUTE_API_KEY`. Sin esa ejecución real explícita, su veredicto legible por máquina sigue siendo `HOLD`; Las mediciones sintéticas payload/call-count por sí solas no son evidencia de promoción.

Las personas que llaman pueden adjuntar una matriz `transcript.cues` opcional a una parte de video compatible cuando ya poseen texto alineado. Cada señal debe llevar `text`, un intervalo finito `start`/`end` dentro de la duración probada y un `source` incluido en la lista blanca (`client`, `embedded` o `audio-bridge`); `confidence` tiene por defecto `1` y debe permanecer entre `0` y `1`. Las señales duplicadas exactas están colapsadas. OmniRoute nunca inicia la transcripción a partir de estos metadatos: las señales validadas se copian en el resultado descrito con fuente, confianza e intervalo, y se representan como observaciones que no son de confianza junto con los títulos de los fotogramas. El texto no válido, fuera de rango o sin procedencia se rechaza en lugar de mezclarse con el flujo de subtítulos. Ambos canales de transcripción del cuerpo de la solicitud normalizan la procedencia proporcionada a `client`, incluidas las etiquetas `embedded` o `audio-bridge` autoafirmadas. Sólo un adaptador propiedad del servidor puede asignar esas etiquetas confiables a través del argumento `trustedSource` de solo código; un campo de solicitud JSON no puede alcanzar ese argumento. El texto de la transcripción sigue siendo contenido derivado de medios que no es de confianza, independientemente de su procedencia, y nunca debe determinar la autorización.

Una persona que llama con experiencia puede proporcionar una pista `audioTranscript` para el mismo vídeo; se trata como texto proporcionado por el cliente, no como prueba de transcripción del servidor. La costura de fusión ejecuta observaciones visuales y de audio bajo una fecha límite y una señal de cancelación, las ordena en una línea de tiempo común, colapsa duplicados exactos e informa un resultado parcial cuando solo un lado tiene éxito. Un `audioTranscript` no válido se degrada a ese resultado parcial — la descripción visual se mantiene y la rama de audio registra un código de falla desinfectado — en lugar de fallar todo el video. La disponibilidad por rama, el indicador parcial y los códigos de error desinfectados se conservan en el resultado descrito, en los metadatos de la barandilla (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), en los metadatos de la caché de resultados y en los contadores de fusión del puente. La ruta predeterminada de Video Bridge no invoca la conversión de voz a texto ni descarga una segunda copia multimedia; sin esa pista explícita, sigue siendo sólo vídeo.

**Retención de transcripción (#12150 P1).** Esto se aplica automáticamente cada vez que Video Bridge (en sí mismo opcional) genera una señal de transcripción — no hay un indicador de retención separado. Cuando una solicitud genera cualquier señal de transcripción (un `transcript` declarado por la persona que llama o un `audioTranscript` fusionado), la barrera de seguridad lo marca como `videoBridgeObserved` y produce una sombra redactada de la descripción del video — una representación idéntica en la que el cuerpo de texto libre de cada señal se reemplaza por `[redacted-video-transcript]`, creado sustituyendo el campo de señal estructurado antes de ensamblar la cadena (nunca analizando el texto aplanado, por lo que no hay contenido de señal — adversario u ordinario, incluidos los cuerpos). que contengan `]` como `[inaudible]`/`[music]` — pueden sobrevivir). El cuerpo de la solicitud de registro de llamadas persistente intercambia cada parte de texto derivado del video por esa sombra redactada, que coincide con la igualdad de contenido; el ancla `fullText` se vuelve a leer desde la carga útil de la barandilla previa a la llamada terminada, por lo que la coincidencia aún tiene éxito después de que las barandillas de cadena posteriores (los enmascaradores de credenciales y PII, prioridades 10/95) reescriban el texto de descripción en su lugar y después de que la inyección system-prompt/handoff/memory cambie la forma de la matriz de mensajes. El cuerpo enviado aguas arriba del modelo no ha cambiado. Una solicitud observada tampoco llena ninguna memoria duradera (se omiten tanto la extracción derivada de la solicitud como la de la respuesta), por lo que la propia respuesta del modelo no puede hacer eco del texto de la transcripción en la memoria.

**Campos de vídeo sin procesar (#12430).** Cuando el puente está habilitado y la compatibilidad con video nativo es desconocida o ausente, los campos `transcript`/`audioTranscript` definidos también activan `videoBridgeObserved`, incluso después de una falla en la descripción o un límite `maxVideos`. `null` y cadenas vacías cuentan; los campos ausentes y los metadatos que no son de vídeo no lo hacen. Las copias retenidas redactan estos campos u omiten la solicitud y se omite caches/Memory.

En esas rutas alternativas, las señales de llamada válidas se convierten en partes `text`/`input_text` compatibles en lugar de campos de proveedor no estándar. Ambas pistas proporcionadas por solicitud siguen siendo observaciones `client` no son confiables, con una advertencia explícita de que el video no fue descrito y las marcas de tiempo no fueron verificadas con los medios. Los presupuestos 256-cue/64-KiB total y por señal existentes se aplican en las dos pistas juntas; las marcas de tiempo deben ajustarse al límite máximo de 600 segundos del corredor y a cualquier ventana de enfoque proporcionada. Las pistas no válidas se descartan y no se reenvían como texto arbitrario; aún se puede utilizar un hermano válido a menos que se exceda su presupuesto combinado. Los campos Null/empty no añaden texto. Esta alternativa no agrega ninguna recuperación de medios ni transcripción. Los campos de extensión de transcripción se eliminan del soporte de vídeo alternativo y sus objetos `video_url`/`source`. La lista de permitidos de OpenAI wire sigue siendo estricta; Los portadores de video nativos desconocidos permanecen disponibles y los destinos conocidos de solo texto mantienen marcadores seguros. Las sombras de redacción estructuradas protegen el texto de la transcripción adjunta, mientras que la solicitud original propiedad de la persona que llama permanece sin cambios. Los destinos compatibles de forma nativa y los puentes deshabilitados conservan su comportamiento de omisión existente.

Las copias retenidas adicionales utilizan la misma señal de solicitud observada. La instantánea sin procesar de la solicitud del cliente previa a la barrera, la solicitud pendiente en memoria y el registro de solicitudes rechazadas tempranamente reemplazan estructuralmente los campos de transcripción en las partes del video; Las indicaciones de cadena sintetizadas por las etapas de la canalización y la transferencia de contexto se redactan en el receptor del cuerpo de solicitud persistente. El marcador `video_content_removed` persistente hace que la continuación `previous_response_id` falle al cerrarse en lugar de reconstruir el texto que se descartó intencionalmente. Si una solicitud observada pierde su sombra de redacción por parte antes del inicio de sesión, o incluso una de varias sombras de video no coincide después de mutaciones posteriores de la solicitud, el cuerpo de la solicitud retenido se omite por completo en lugar de conservar una transcripción parcialmente redactada.

Para una solicitud observada, una respuesta modelo podría citar cualquier parte de la transcripción sin un límite de referencia estructurado. Por lo tanto, su registro de llamadas persistente `responseBody` se reemplaza por un marcador de omisión; el artefacto de canalización detallado (que puede incluir cuerpos upstream/client y fragmentos de flujo) no se conserva. Los cachés semánticos, de idempotencia y de reproducción de razonamiento omiten las lecturas y escrituras de esa solicitud. La solicitud del proveedor y la respuesta visible del cliente permanecen sin cambios. Los primeros bytes de mantenimiento de actividad se drenarán del búfer temporal cuando se omita el artefacto detallado. La advertencia de EventStream con formato incorrecto de Kiro informa solo el recuento de bytes de carga útil, nunca su contenido ni el error sin formato del analizador JSON. Esto no afirma que se hayan auditado todos los diagnósticos provider/plugin no relacionados; El barrido más amplio del fregadero retenido se rastrea en el n.º 11658. (#11658)

El ciclo de vida interno `/api/modality-bridge/video/drilldown` es un sustrato de caché loopback/token-authenticated independiente. Cada operación también requiere un principal opaco canónico ID. Antes de habilitar un llamador de producción, debe derivar ese ID del inquilino autenticado y nunca debe reenviar un valor seleccionado por el cliente. Las claves de caché vinculan esa entidad principal a la sesión canónica y la videoreferencia IDs, almacenan solo sus claves SHA-256-derived y limitan tanto las lecturas como la eliminación a la misma entidad principal. El caché almacena como máximo 16 fotogramas JPEG derivados por entrada, los caduca después de diez minutos y admite lecturas `start`/`end` limitadas o la eliminación explícita de sesiones.

Cada principal está limitado a 16 entradas y 64 MiB de datos JPEG canónicos. Esos límites son independientes del techo global 64-entry/256 MiB : la presión de la cuota principal desaloja solo las entradas menos utilizadas recientemente por ese principal antes de que se considere el desalojo global LRU. Las entradas caducadas se eliminan de la contabilidad principal y global según la actividad de la caché, mientras que la cancelación y el error de validación no comprometen un reemplazo parcial.

La caché rechaza Base64 no canónico, exceso de relleno, medios que no sean JPEG, JPEGs con formato incorrecto o truncado y JPEGs que producen una advertencia durante una decodificación `sharp` de imagen completa limitada. Vuelve a codificar cada imagen aceptada como un JPEG canónico, deriva el ancho y el alto de los bytes decodificados en lugar de confiar en los campos de la persona que llama, y descarta los bytes políglotas finales en lugar de retenerlos. Solo el búfer comprimido canónico limitado se carga a ambas cuotas. El límite de cables JSON incluye gastos generales de Base64 para el techo de entrada decodificada de 32 MiB. Cada derivación almacenada registra su JPEG format/resolution validado, política de muestreo, versión de derivación, hora de creación, hash de contenido calculado por el servidor y referencia principal con hash más el hash de contenido principal de la persona que llama de confianza. La cancelación se verifica entre las fases asincrónicas decode/hash antes de la confirmación de la caché atómica.

Este tramo aún no conecta a un productor de producción con la ruta y no proporciona selección de variantes de resolución múltiple. Por lo tanto, la ruta de solicitud transparente de Video Bridge no genera trabajo adicional, mientras que la derivación principal vinculada al inquilino y el ciclo de vida completo de resolución múltiple FU-08 siguen siendo un trabajo de seguimiento explícito en lugar de documentarse como un comportamiento completo.

Los fotogramas se subtitulan secuencialmente con el modelo de vídeo configurado. Una anulación de vídeo vacía hereda la configuración de Visión; Si ambos están vacíos, el enrutador automático Vision selecciona el modelo efectivo con capacidad de visión. Los subtítulos exitosos reemplazan la parte original con un prefijo `[Video description:` estable que también marca el texto como una observación derivada de los medios no confiable y les dice a los modelos posteriores que no sigan las instrucciones que se encuentran en los medios. Las claves de caché de subtítulos de fotogramas incluyen los bytes JPEG, el mensaje, la marca de tiempo y el modelo efectivo; sólo se almacenan en caché los subtítulos exitosos. Las entradas de la caché conservan el modelo de productor exitoso real, incluido un modelo alternativo; el puente informa `mixed` cuando diferentes modelos produjeron diferentes marcos. Un acierto de caché reutiliza esa identidad de productor en lugar de volver a etiquetarla como el plan de enrutamiento solicitado. El caché de resultados de video completo se ingresa en cada entrada que cambia el indicador — de salida, el modelo efectivo, la política de muestreo, el recuento de fotogramas, el modo de análisis semántico, la huella digital SHA-256 de la sugerencia de enfoque normalizada, la ventana de enfoque, `transcript`, `audioTranscript` y el indicador de la hoja de contactos —, por lo que cambiar cualquiera de esas dimensiones es un error de caché, nunca una reutilización obsoleta. La versión de la política de deduplicación visual, el umbral y el recuento de fotogramas candidatos limitados también son explícitos en la clave y los metadatos de la caché de resultados; Por lo tanto, un cambio de política no puede reutilizar una descripción obsoleta de un vídeo completo. Los metadatos de Result-cache v4 mantienen el modo y la huella digital, nunca la tarea del usuario sin procesar. Los metadatos de Guardrail informan los modos de análisis solicitados y efectivos; un modo `focused` solicitado sin texto de usuario utilizable se informa como efectivamente `full`.

La barrera de seguridad extrae todas las partes de vídeo compatibles, pero no describe más que `modalityBridgeVideoMaxVideos`. Para un objetivo que se ha demostrado que tiene `supportsVideo === false`, los videos fallidos y que exceden el límite se convierten en marcadores de texto seguro explícitos, por lo que ningún video sin formato sobrevive. Cuando se desconoce la capacidad, esas partes conservan su soporte de vídeo; cualquier transcripción alternativa sigue la conversión de texto delimitado anterior. Los objetivos con `supportsVideo === true` evitan el puente. La señal de cancelación de la solicitud del cliente se propaga a través de descargas, colas de intermediarios, subprocesos y llamadas de subtítulos; aborta la parada entre videos y nunca falla al abrirse a medios sin formato.

La configuración del tiempo de ejecución está respaldada por DB y validada por Zod:

| Llave                               | Por defecto | Rango / comportamiento                                                                                                     |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Tiempo de ejecución opcional, suscripción voluntaria                                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` conserva títulos genéricos; `focused` utiliza un contexto de usuario más reciente limitado y que no es de confianza |
| `modalityBridgeVideoModel`          | `""`        | Heredar el modelo Vision Bridge                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` o `segment_aware` proporcional; El fallo del detector vuelve a caer en `uniform`                  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000-120000 ms                                                                                                             |

Los valores de tiempo de espera de video persistente heredado superiores a 120 segundos están sujetos a la fecha límite del corredor; Las escrituras de nuevas configuraciones por encima de ese límite se rechazan. `GET /api/modality-bridge/video/runtime` requiere una localidad de bucle invertido estampada confiable antes de la autenticación o el sondeo en tiempo de ejecución, luego requiere autenticación de administración. Devuelve solo `available`, versiones desinfectadas FFmpeg/ffprobe y un motivo fijo cuando el tiempo de ejecución no está disponible. El punto final de extracción interna no es un API de carga pública: la saturación de la cola devuelve `503` más `Retry-After`, una desconexión de la persona que llama devuelve `499` y la fecha límite fija del agente devuelve `504`. Las respuestas convertidas agregan `video->text;model=<visionModel>;parts=<videos>` al encabezado `x-omniroute-modality-bridge` central sin eliminar los segmentos de Visión o Audio.

### Enmascarador PII (`piiMasker.ts`)

Sigue funcionando** ambos** etapas.

- **`preCall`** clona la carga útil, recorre `system`, `messages`, `input` y `prompt` (incluidos los elementos de cadena simples) y aplica `processPII()` (de `@/shared/utils/inputSanitizer`) a los campos de cadena `content`/`text`. Cuando `PII_REDACTION_ENABLED=true`, PII detectado se redacta en la carga útil saliente. Esto es independiente de `INPUT_SANITIZER_MODE` (que solo controla la política de inyección rápida). Cuando la redacción está desactivada, la detección de registros de llamadas cuenta sin reescribir el contenido.
- **`postCall`** clona en profundidad la respuesta, ejecuta `sanitizePIIResponse()` más el enmascarador de forma de API de respuestas (`maskResponsesOutput` — cubre `output_text` y `output[].content[].text`). Si se produce alguna redacción, la respuesta modificada reemplaza la original.

La barandilla nunca bloquea; solo anota (`meta.detections`, `meta.redacted`) o reescribe.

#### Selección por tipo, patrones personalizados y contadores de detección

**Panel de control → Configuración → Seguridad → PII enmascaramiento** elige _qué_ está enmascarado. No activa el enmascaramiento: sigue siendo `PII_REDACTION_ENABLED` (solicitud) y `PII_RESPONSE_SANITIZATION` (respuesta + SSE), ambos desactivados de forma predeterminada.

- **Selección por tipo** — los identificadores integrados se enumeran en `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Desarmado significa cada tipo (el comportamiento antes de que existiera esta configuración). El patrón `ssn_us` del motor de solicitudes se asigna a `ssn`. Las plantillas (Mínima, Estándar, Financiera, Brasileña, USA, GDPR, POPIA, Completa) solo llenan las casillas de verificación en UI.
- **identificadores GDPR y POPIA** — doce identificadores integrados que cubren EU y identificadores personales sudafricanos (tabla a continuación). Sus expresiones regulares, validadores y etiquetas de jurisdicción viven en una tabla, `src/shared/utils/piiPatterns.ts`, que consumen tanto el desinfectante de respuesta (`src/lib/piiSanitizer.ts`) como el enmascarador de solicitudes (`src/shared/utils/inputSanitizer.ts`). Una coincidencia se redacta sólo cuando su validador la acepta; una simple serie de dígitos nunca es suficiente. Un operador que guardó una selección reducida antes de que existieran estos identificadores mantiene el comportamiento que tenía hasta que se marcan los nuevos identificadores.
- **Patrones personalizados** — hasta 20 patrones de expresiones regulares o comodines (`*` = hasta 64 caracteres que no sean espacios en blanco, `?` = uno). Las coincidencias se convierten en `[CUSTOM_REDACTED]`. Cada patrón pasa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): como máximo 500 caracteres, las banderas se limitan a `g i m s u`, debe compilarse, debe pasar `safe-regex` (retroceso catastrófico) y no debe coincidir con una cadena vacía o un marcador de posición de redacción. Un patrón que falla se rechaza cuando se guarda y se prueba, y una fila almacenada que falla se omite en tiempo de ejecución en lugar de compilarse. Los patrones personalizados solo se ejecutan mientras la máscara está activada.
- **Contadores de detección** — cuenta por tipo (valores que nunca coinciden), se mantiene en la memoria y se restablece al reiniciar (`src/lib/pii/piiDetectionStats.ts`). Solo aumentan mientras el enmascaramiento está activado.

La configuración se encuentra en la tabla `key_value` (espacio de nombres `pii_settings`, `src/lib/db/piiSettings.ts`) y se lee a través de un caché de 1 s. API:

| Método | Camino                   | Objetivo                                                                           |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado del pabellón, `enabledTypes`, `customPatterns`, contadores de detección     |
| `PUT`  | `/api/settings/pii`      | Reemplazar `enabledTypes` (`null` = todos) and/or `customPatterns`                 |
| `POST` | `/api/settings/pii/test` | Realice un ensayo en seco con una muestra de como máximo 8 KB; no se almacena nada |

Los tres requieren autenticación de gestión y validan el cuerpo con Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### Identificadores GDPR (EU) y POPIA (Sudáfrica)

| Identificación      | Identificador                 | Validación                                                                                       |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                          | País conocido, longitud exacta para ese país, ISO 13616 MOD-97-10                                |
| `eu_vat`            | número EU VAT                 | Prefijo de estado miembro conocido y formato de número de ese estado (sin búsqueda VIES )        |
| `es_dni_nie`        | Español DNI / NIE             | Letra de control (valor mod 23); NIE es `X/Y/Z` + 7 dígitos                                      |
| `it_codice_fiscale` | Códice fiscal italiano        | Carta de control de las tablas de posición odd/even                                              |
| `pl_pesel`          | PESEL polaco                  | Suma de verificación ponderada y fecha de nacimiento codificada que existe                       |
| `nl_bsn`            | BSN holandés                  | Prueba 11 (pesos 9..2, -1)                                                                       |
| `de_steuer_id`      | Identificación Steuer alemana | ISO 7064 Mod 11,10 más las reglas de estructura de dígitos (sin 0 inicial)                       |
| `se_personnummer`   | número de persona sueco       | Luhn sobre los últimos diez dígitos y una fecha de nacimiento plausible (10 o 12 dígitos)        |
| `za_id`             | Número ID sudafricano         | Luhn sobre los 13 dígitos, nacimiento válido month/day, dígito de ciudadanía 0 o 1               |
| `za_phone`          | teléfono sudafricano          | Prefijo `+27` / `27`, o la forma nacional `0..` escrita con un espacio o guión                   |
| `za_vat`            | Número VAT sudafricano        | 10 dígitos que comienzan con `4`** y** "VAT" / "BTW" en los 48 caracteres anteriores             |
| `za_tax_ref`        | Ref. fiscal sudafricana.      | 10 dígitos que comienzan con `0`-`3`, Luhn,** y** "tax" / "SARS" en los 48 caracteres anteriores |

Debido a que los formatos de solo dígitos chocan con los números de pedido, los números de compilación y las marcas de tiempo, los más débiles (`za_vat`, `za_tax_ref`) necesitan la palabra clave, y un número `0..` de diez dígitos no se trata como un número de teléfono sudafricano. IBANs espaciados (`GB29 NWBK ...`) no coinciden. En la ruta de transmisión, la señal se busca dentro del fragmento actual únicamente. Los identificadores se ubican por delante de los patrones telefónicos genéricos, por lo que un identificador validado mantiene su propio marcador de posición (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Las plantillas `gdpr` y `popia` seleccionan los identificadores EU y sudafricano respectivamente. El enmascaramiento en sí sigue siendo opcional (Regla estricta n.° 20): nada aquí cambia el valor predeterminado de un indicador de función.

### Inyección inmediata (`promptInjection.ts`)

Detecta estructuras adversas en el contenido proporcionado por el usuario y aplica la política configurada. El comportamiento está impulsado por variables de entorno y opciones del constructor:

| Configuración     | var.env                                                                                               | Por defecto | Efecto                                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activado          | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Cuando `false`, la barandilla sufre un cortocircuito.                                                                                                                                                                                       |
| Modo              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Política de inyección: `block`, `warn` o `log`. (`redact` se acepta para compatibilidad con versiones anteriores, pero no** no** texto de inyección de tiras; La solicitud de reescritura PII está controlada por `PII_REDACTION_ENABLED`). |
| Umbral de bloqueo | opción `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Severidad mínima requerida para bloquear. Medio es solo de observación por defecto.                                                                                                                                                         |

**Prioridad de modo** (`getMode`): llamador `options.mode` → `INJECTION_GUARD_MODE`** anulación de bandera de característica DB** (Panel de control Configuración → Indicadores de funciones → ) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Por lo tanto, una anulación del tablero supera las variables de entorno, por lo que Feature Flags UI controla la guardia en ejecución en vivo (sin reinicio). La lectura DB es a prueba de fallos: si se produce un error, la protección vuelve al comportamiento basado en env y, cuando no se establece ninguna anulación, el comportamiento es idéntico a la resolución de solo env.

Fuentes de detección:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores compartido utilizado en otras partes del proceso).
2. `DEFAULT_GUARD_PATTERNS` incorporado (actualmente `system_override_inline` y `markdown_system_block`, ambos con gravedad `high` ).
3. `customPatterns` opcional pasado a través de opciones de constructor (cadenas, expresiones regulares o registros `{ name, pattern, severity }` ).

cuando `mode === "block"`** y** al menos una detección alcanza el umbral de gravedad, `preCall` devuelve `{ block: true, message: "Request rejected: suspicious content detected" }`. En los modos `warn`/`log`, la barandilla registra pero permite la llamada. El asistente compartido `evaluatePromptInjection()` también se exporta para las personas que llaman y necesitan evaluar las indicaciones sin pasar por el registro.

**Escaneo encuadernado (v3.8.20):** El detector sólo inspecciona el** primeros 16 KB** del texto del mensaje unido — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) en `src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de ejecutar el bucle del patrón. Las directivas de inyección se encuentran cerca de la parte superior de una entrada, por lo que esto limita la expresión regular CPU/GC en cargas útiles de varios cientos de KB sin debilitar la detección (cf. #3932, #4041).

### Enmascarador de credenciales (`credentialMasker.ts`)

Sigue funcionando** ambos** etapas, últimas en la cadena predeterminada (prioridad `95`). Redacta patrones de clave API/token secreto conocidos de la carga útil saliente (contenido del mensaje, argumentos de llamada de herramientas, resultados de herramientas)** y** la respuesta del proveedor, por lo que una credencial pegada en un mensaje (o reflejada por el resultado de una herramienta) no se filtra al proveedor ascendente ni al cliente.

- **Solo registrarse** , misma convención que la redacción PII (Regla estricta n.º 20 adyacente): deshabilitada a menos que `settings.credentialRedactionEnabled === true`** o** `CREDENTIAL_REDACTION_ENABLED=true`. Sin ella, la barandilla no funciona — nunca bloquea ni reescribe.
- `redactCredentials()` recorre el árbol payload/response completo (`walkValue()`, prototipo-pollución-seguro, ciclo-seguro vía `WeakSet`) y reemplaza las coincidencias con un marcador de posición `[REDACTED:<type>]`, clonando solo las ramas que realmente cambiaron.
- `CREDENTIAL_PATTERNS` cubre claves de proveedor LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), claves de pago (Stripe, Square), claves de nube (clave de acceso AWS, Twilio, SendGrid, Mailgun), claves privadas/ JWTs, cadenas de conexión con credenciales (`mongodb://user:pass@...`, etc.) y un patrón de valor de encabezado genérico `Authorization`/`x-api-key`/`api-key`/`apikey`. Las claves con forma de encabezado (`authorization`, `x-api-key`, `api-key`, `apikey`) se redactan estructuralmente (solo valor, se conserva el prefijo de esquema como `Bearer `/`Basic ` ) en lugar de mediante la expresión regular de texto genérica.
- La barandilla nunca bloquea; solo reescribe (`modifiedPayload` / `modifiedResponse`) y anota (`meta.credentialsRedacted`, `meta.count`).

Guardia de regresión: `tests/unit/credential-masker-guardrail.test.ts`.

## Contrato base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true cortocircuita la cadena
  message?: string; // se muestra al bloquear
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // devuelto por preCall para reescribir la solicitud
  modifiedResponse?: TValue; // devuelto por postCall para reescribir la respuesta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un guardrail indica "sin cambios" devolviendo `void`, `{}` o
`{ block: false }`. Devolver un `modifiedPayload`/`modifiedResponse` reemplaza
el valor que fluye por la cadena para los guardrails posteriores.
`signal?: AbortSignal` traslada el ciclo de vida del llamador a los guardrails. Una cancelación de la solicitud es la excepción deliberada de fail-open: los puentes de medios detienen el trabajo y realizan la limpieza sin restaurar los medios sin procesar a un destino que se sabe que no los admite.

## Registro (`registry.ts`)

El singleton `guardrailRegistry` expone:

- `register(guardrail)` — añade (o reemplaza por nombre normalizado) un guardrail y
  vuelve a ordenar por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — itera los guardrails activos, pasa el
  payload a través de `modifiedPayload` y se detiene en el primer `block: true`.
- `runPostCallHooks(response, context)` — el mismo flujo en el lado de la respuesta.
- `resetGuardrailsForTests({ registerDefaults })` — limpia el estado y, opcionalmente,
  vuelve a registrar los valores predeterminados para un aislamiento limpio de las pruebas.

Ambos ejecutores devuelven `{ blocked, payload|response, results, guardrail?, message? }`,
donde `results` es un arreglo de registros `GuardrailExecutionResult` que incluyen
los campos `blocked`, `skipped`, `modified`, `error` y `meta` por guardrail,
útiles para el rastreo.

### Desactivación de guardrails por solicitud

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega una lista
sin duplicados de nombres de guardrails que deben omitirse para la solicitud
actual. Hay cinco canales, leídos en este orden y combinados en una sola lista
(la primera ocurrencia prevalece al eliminar duplicados):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` del cuerpo de la solicitud (nivel superior)
3. `metadata.disabledGuardrails` del cuerpo de la solicitud (solo cuando `metadata` es un objeto)
4. Encabezado `x-omniroute-disabled-guardrails`
5. Encabezado heredado `x-disabled-guardrails`

Los cinco canales se combinan, incluidos los dos encabezados: enviar tanto
`x-omniroute-disabled-guardrails` como `x-disabled-guardrails` omite la unión de
sus listas, y un encabezado moderno vacío ya no oculta el heredado
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), corregido en
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Los valores pueden ser arreglos de cadenas o una cadena separada por comas; los
nombres se recortan y se normalizan a kebab-case en minúsculas (`pii_masker` →
`pii-masker`), y las entradas vacías se descartan. El resultado se pasa a través
de `context.disabledGuardrails` al registro, que omite los guardrails
coincidentes (`skipped: true` en `results`).

La lista de desactivación solo afecta al **registro**. El modo `block` de
inyección de prompts es un límite obligatorio: el middleware de protección
contra inyecciones (`src/middleware/promptInjectionGuard.ts`) llama a
`evaluatePromptInjection()` sin ninguna lista de desactivación controlada por el
llamador (la llamada muerta a `resolveDisabledGuardrails({ body })` que solía
hacer se eliminó en
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), por lo que una
solicitud que desactiva `prompt-injection` sigue siendo rechazada en modo
`block`. Esto es intencional. Los canales de desactivación están controlados por
el llamador (cuerpo de la solicitud, metadatos, encabezados), y un llamador no
debe poder desactivar un control de seguridad establecido por el operador
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). La unión de
encabezados de [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
solo cambia qué guardrails del registro se omiten; no permite que un cliente
evada el middleware. Las políticas obligatorias de guardrails por clave y por
grupo se siguen en el RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Consulta [Cobertura y límites](#coverage-and-limits).

## Orden de ejecución

Para cada solicitud que fluye a través de `src/sse/handlers/chat.ts` y
`open-sse/handlers/chatCore.ts` (las rutas de la familia de chat enumeradas en
[Cobertura y límites](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` construye la lista de omisiones a partir de
   la clave de API, el cuerpo y las cabeceras.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ejecuta los guardrails en
   orden ascendente de prioridad:
   - Los guardrails desactivados se registran como `skipped`.
   - El `preCall` de cada guardrail puede reescribir el payload mediante
     `modifiedPayload`.
   - El primer `block: true` cortocircuita la cadena y el manejador devuelve
     una respuesta de rechazo del guardrail.
3. El payload (potencialmente reescrito) fluye hacia el enrutamiento de combos
   y el despacho al upstream.
4. **Solo sin streaming:** después de que se ensambla la respuesta,
   `guardrailRegistry.runPostCallHooks(...)` ejecuta la misma cadena sobre la
   respuesta. Un `block: true` aquí descarta la respuesta del upstream y devuelve
   HTTP 400. Las respuestas en streaming omiten este paso por completo.

Los guardrails que lanzan errores se registran con `error: <message>` y se
anotan mediante `logger.warn`, pero la cadena continúa: es fail-open por diseño.

## Cobertura y límites

El registro de guardrails está conectado únicamente al pipeline de chat. Estos
límites están fijados por
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` y
`tests/unit/guardrail-pipeline-characterization.test.ts`; actualiza esas pruebas
de forma deliberada cuando el comportamiento cambie.

### Dónde se ejecutan los hooks

| Hook / control                        | Se ejecuta en                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                     | Solicitudes manejadas por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (y `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` y el proxy de chat de Telegram. También el endpoint de prueba del dashboard `/api/guardrails/test`. Un bloqueo pre-call devuelve HTTP 400. |
| `runPostCallHooks`                    | Solo respuestas de chat **sin streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Las respuestas en streaming nunca llegan a él.                                                                                                                                                                                                                                                                                                   |
| PII en streaming                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), canalizado en `streamingPipeline.ts` cuando `PII_RESPONSE_SANITIZATION` está activado. No es un guardrail, por lo que los canales de desactivación no lo afectan.                                                                                                                                                                                                                    |
| Middleware injection-guard (heredado) | Todas las rutas `/v1` que transportan prompts, incluida la familia de chat (consulta [cobertura de rutas](#injection-guard-route-coverage--red-team-phase-8--block-d)). Solo inyección de prompts.                                                                                                                                                                                                                                                 |

### Qué no está cubierto

- **Las rutas de medios, embeddings y datos** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca llegan al registro. Allí
  no se ejecuta enmascaramiento de PII, enmascaramiento de credenciales ni el
  puente de modalidad. Su única comprobación es el middleware heredado de
  injection-guard.
- **Las respuestas en streaming** no reciben guardrails post-call: ni
  `pii-masker` ni `credential-masker` post-call, ni bloqueo post-call. Solo se
  aplica la transformación de PII en streaming (cuando
  `PII_RESPONSE_SANITIZATION` está activado). Una credencial devuelta en una
  respuesta en streaming no se redacta.
- **Canales de desactivación frente al middleware (por diseño):** el middleware
  evalúa la inyección de prompts con su propia llamada a
  `evaluatePromptInjection()`, sin pasar ninguna lista de desactivación
  controlada por el llamante. El modo `block` es un límite obligatorio que las
  desactivaciones controladas por el llamante no pueden eludir, incluso en las
  rutas de la familia de chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Desactivar
  `prompt-injection` solo omite el guardrail del registro.

### Qué ve una respuesta antes del post-call

En la ruta sin streaming el orden es: extracción de memoria → ejecución de
herramientas integradas → guardrails post-call → salida por bloqueo post-call →
almacenamiento en la caché semántica.

- **La extracción de memoria** y **la ejecución de herramientas** ven la respuesta antes de que los
  guardrails posteriores a la llamada puedan reescribirla o bloquearla. Desde
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), la extracción
  de memoria pasa el texto extraído a través de `sanitizePII` cuando
  `PII_RESPONSE_SANITIZATION` está activado (tanto en streaming como en no streaming), pero una
  respuesta que el post-call bloquea posteriormente aún ha sido ofrecida a la memoria y
  a las herramientas.
- **La caché semántica** almacena la respuesta después del post-call, por lo que almacena la
  respuesta reescrita, y una respuesta bloqueada nunca se almacena en caché. Las entradas de caché
  se indexan por clave de API.

## Configuración

Variables de entorno leídas por las protecciones integradas:

| Variable                              | Utilizada por              | Efecto                                                                                                                            |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Establezca `false` para desactivar la detección por completo.                                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de inyección: `warn`, `block` o `log`. El valor heredado `redact` no reescribe el texto de inyección.                    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo de la protección contra inyecciones; también es una feature flag en la BD que **anula** las variables de entorno (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Severidad mínima que `MODE=block` rechaza: `high` (predeterminado), `medium` o `low`.                                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias heredado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                              |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Cuando es `true`, la PII de la solicitud se anonimiza (independientemente del modo de inyección).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aguas abajo) | Controla el comportamiento del enmascarador del lado de la respuesta.                                                             |

Las protecciones de Modality Bridge leen la configuración en tiempo de ejecución
desde el almacén de ajustes respaldado por la BD (`getSettings()`), no desde las
variables de entorno. Las claves principales de Vision son
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y
`modalityBridgeCacheMaxEntries`. Las claves heredadas
`visionBridge*` solo se aceptan como el fallback de lectura de un ciclo
documentado; las escrituras del panel usan las claves principales. Los valores
predeterminados y el resolvedor de fallback se encuentran en
`src/shared/constants/modalityBridgeDefaults.ts`, con las constantes heredadas
conservadas en `src/shared/constants/visionBridgeDefaults.ts`.

Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` y `modalityBridgeAudioMaxClips`, además de los
ajustes compartidos `modalityBridgeCache*`. Audio no tiene fallback de claves
heredadas porque estas claves se introdujeron con el esquema de Modality Bridge.

Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` y
`modalityBridgeVideoTimeout`, además de los ajustes compartidos
`modalityBridgeCache*`. Está desactivado de forma predeterminada porque
FFmpeg/ffprobe son dependencias operativas opcionales y la generación de
descripciones de fotogramas añade latencia y costo de modelo.

## Guardrails personalizados

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Pasos:

1. Crea `src/lib/guardrails/myGuardrail.ts` extendiendo `BaseGuardrail`.
2. Implementa `preCall` y/o `postCall`.
3. Regístralo en el momento de la importación (push desde `registerDefaultGuardrails`) o
   llama a `guardrailRegistry.register(...)` en tiempo de ejecución: el registro reemplaza
   cualquier guardrail anterior con el mismo nombre normalizado.
4. Añade pruebas bajo `tests/unit/` (ejemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pruebas

Usa `resetGuardrailsForTests()` entre pruebas para partir de un estado conocido.
Pasa `{ registerDefaults: false }` para comenzar con un registro vacío y
registrar únicamente los guardrails bajo prueba. Vision Bridge acepta
inyección de dependencias (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge expone
los puntos de extensión equivalentes para ajustes, capacidades, selección del modelo STT,
verificaciones de credenciales y transcripción. Por lo tanto, las pruebas pueden ejercitar
ambos flujos sin acceso a la base de datos ni a la red.

## Véase también

- `src/lib/guardrails/` — implementación
- `src/shared/utils/inputSanitizer.ts` — detector compartido que impulsa la
  detección de inyección de prompts y el enmascaramiento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — valores predeterminados de Vision Bridge y
  lista de modelos de puente forzado
- `src/shared/constants/modalityBridgeDefaults.ts` — valores predeterminados compartidos en tiempo de ejecución para Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — capa ortogonal (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — referencia completa de variables de entorno

## Cobertura de rutas del guard de inyección y red team (Fase 8 · Bloque D)

El guard de inyección (`createInjectionGuard` / `withInjectionGuard`) cubre todas las rutas
que aceptan prompts del usuario. Respeta `INJECTION_GUARD_MODE` (predeterminado `warn` = solo registro;
`block` = devuelve HTTP 400 `SECURITY_001`).

| Tipo               | Rutas                                                                                                                                                | Modo predeterminado |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Texto (existentes) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generativas        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Datos              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

La extracción de texto (`extractMessageContents`) cubre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (nocturno, `nightly-llm-security.yml`):** promptfoo valida que cada ruta bloquee
el corpus OWASP-LLM en `INJECTION_GUARD_MODE=block`; garak ejecuta sondas (se omite sin el secreto).
`moderations` se incluye por consistencia. El modo de bloqueo es un límite obligatorio: `evaluatePromptInjection()`
ignora la lista de desactivación por solicitud que le pasa el middleware, por lo que `disabledGuardrails`
**no** exime a una ruta de él ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

El flujo de trabajo nocturno (`.github/workflows/nightly-llm-security.yml`, cron + ejecución
manual) tiene dos trabajos:

- **`promptfoo-guard` (bloqueante)** — ejecuta `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Cada caso adversarial (p. ej., "ignore all
  previous instructions…", jailbreaks estilo DAN) verifica que la respuesta lleve
  `error.code === "SECURITY_001"`, es decir, que el guard realmente rechazó la solicitud.
- **`garak` (informativo)** — ejecuta garak `--probes promptinject,dan,leakreplay`
  contra una instancia local de OmniRoute (`http://localhost:20128/v1`). Condicionado a un
  secreto de proveedor (`PROMPTFOO_PROVIDER_KEY`); se omite de forma controlada y lleva el
  sufijo `|| true`, por lo que informa sin hacer fallar el CI.

La cobertura del helper del guard (`createInjectionGuard` / `withInjectionGuard`)
abarca todas las rutas `/v1` que contienen prompts; el texto del prompt se extrae de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mediante
`extractMessageContents()` en `src/shared/utils/inputSanitizer.ts`.
