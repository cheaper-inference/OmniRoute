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

## Guardrails integrados

El registro carga automáticamente seis guardrails en orden de prioridad al importarse
(ver `registry.ts` → `registerDefaultGuardrails()`):

| Prioridad | Nombre              | Etapa(s)       | Archivo               |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Los números de prioridad más bajos se ejecutan **primero**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

El modelo base GLM 5.3 y `glm-5.3-{low,high,max}` tienen metadatos explícitos
`supportsVision:false` en el registro/especificaciones. Las variantes GLM 5.3 Flash
siguen siendo modelos con visión nativa. La ruta `/v1/messages` de Claude Code entra en
la cadena compartida de guardrails pre-call de `handleChat` **antes** de la
traducción de Claude a OpenAI; las imágenes anidadas en los resultados de la herramienta
`Read` deben describirse o manejarse antes de que esa traducción las eleve a
contenido `image_url` de OpenAI (#17069).

Intercepta las solicitudes que llevan imágenes dirigidas a **modelos sin visión** y, o bien
reenruta toda la solicitud a un modelo con capacidad de visión, o reemplaza las
partes de imagen con descripciones de texto producidas por un modelo de visión configurable
antes de la llamada upstream. Esto permite que los proveedores de solo texto manejen
cargas útiles multimodales de forma transparente.

Flujo:

1. Se omite si el modelo de destino ya admite visión (a menos que aparezca en la
   lista de puente forzado `isVisionBridgeForcedModel`).
2. Extrae las partes de imagen mediante `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega en el **detector unificado de
   medios** `detectMediaParts()` en `open-sse/utils/mediaParts.ts` — la
   única fuente de verdad compartida con el filtro de compatibilidad de combos.
   La extracción está restringida (mediante lista de permitidos) a las formas que
   `replaceImageParts` puede volver a insertar (el contrato extract↔replace): `image_url` de OpenAI,
   `source.type:"base64"` de Anthropic en base64, `source.type:"url"` de Anthropic con URL, y
   `input_image` de la API de Responses. Las imágenes coincidentes anidadas dentro de
   `tool_result.content` de Claude Code y las salidas de herramientas de Responses también se extraen y
   se reemplazan en sus rutas originales; las formas que son solo indicadores son
   material del filtro de combos y no se extraen.
   Se omite si no se encuentra ninguna.
3. Resuelve la configuración en tiempo de ejecución mediante `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): las nuevas claves de configuración
   `modalityBridge*` tienen prioridad; las claves heredadas `visionBridge*` siguen siendo un
   **fallback de un ciclo** (ventana de reversión). Se omite antes de cualquier
   recorrido de medios cuando el puente está deshabilitado.
4. El selector de modo (`modalityBridgeVisionMode`, ver la tabla a continuación) decide entre
   reenrutar o describir. El reenrutado devuelve `modifiedPayload` con solo `model`
   intercambiado, más meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ruta de descripción: limita las imágenes a `maxImages`, compone el prompt adaptado a la tarea,
   consulta la caché de descripciones, llama al modelo de visión **en paralelo**
   (`Promise.allSettled`) e inyecta partes de texto `[Image N]: <description>` en
   su lugar. Una descripción fallida produce `null`: la imagen sin procesar se conserva para
   destinos desconocidos o con capacidad de visión (#4012), pero un **destino directo
   confirmado de solo texto** o un combo sin visión recibe un stub de texto explícito
   `(unavailable — no vision-capable provider connected)` para cada imagen no descrita,
   incluidos los fallos parciales y las imágenes que exceden el límite de llamadas de
   descripción (#17069). El fallback existente de descripción de combos cuando todas fallan
   permanece en su lugar (#8430).
6. Devuelve `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Predeterminado | Comportamiento                                                                                                                                                                                                                                                                                                                                |
| ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔              | Heurística heredada, sin cambios (#6640/#7204): los modelos que no son combo/`auto/` se redirigen al mejor modelo de visión, a menos que el modelo original ya tenga credenciales utilizables (entonces describe); los destinos combo siempre describen.                                                                                      |
| `describe` |                | Siempre describe: el bloque de redirección se omite por completo; el modelo elegido por el usuario siempre responde.                                                                                                                                                                                                                          |
| `reroute`  |                | Fuerza la redirección: se omite la protección de mantener el modelo con credenciales. La protección de credenciales del **destino** de redirección sigue aplicándose: cuando no existe un destino de visión utilizable, el bridge bloquea con un error claro en lugar de describir o enviar imágenes sin procesar a un destino de solo texto. |

Los modos forzados cortocircuitan **antes** de que se ejecute la heurística automática; el comportamiento de `auto`
es idéntico byte a byte a la protección anterior a la PR-1.

#### Ámbito de la clave de API (`visionBridgeKeyScope.ts`)

Cuando la clave de API del llamante restringe `allowedConnections`, los grupos de cuota
(`allowedQuotas`) o los modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), el bridge solo
elige modelos de redirección y descripción que la clave puede usar, en conexiones que la clave puede
usar. La llamada de descripción pasa entonces siempre por el self-loop de OmniRoute con
el encabezado `x-omniroute-self-loop-key-id`, de modo que la solicitud de chat receptora
vuelve a aplicar la política de conexiones y modelos de esa clave. `enforceApiKeyPolicy()`
respeta ese encabezado solo junto con el bearer del self-loop, por lo que solo puede
restringir el acceso, y un id que no se resuelve es rechazado.

Si no se permite ningún modelo de visión para la clave, un **destino confirmado de solo
texto** rechaza la solicitud de imagen localmente con un HTTP 400 claro en lugar de
reenviar los bytes de la imagen a un upstream incapaz (#17069). Para destinos con
capacidad de visión desconocida o nativa, la ruta de descripción conserva su comportamiento
fail-open anterior (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Las solicitudes sin clave y las claves sin estas restricciones se comportan exactamente
como antes.

#### Prompt de descripción consciente de la tarea (`modalityBridgeVisionTaskAware`)

Predeterminado: **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) añade
el texto del **último mensaje del usuario** (truncado a 500 caracteres) al prompt base
de descripción, orientando la descripción hacia lo que el usuario realmente preguntó
(patrón codex-vision-proxy) y pidiendo al modelo de visión que transcriba el texto
visible. Con el flag desactivado —o sin texto del usuario—, se usa el prompt base sin cambios.

La propia solicitud compatible con OpenAI del self-loop de descripción (`callVisionModelSingle()`
en `visionBridgeHelpers.ts`) siempre solicita `image_url.detail: "high"` —
incondicionalmente, para cada llamante/proveedor, sin depender de ninguna señal del cliente.
El muestreo de bajo detalle degrada la precisión del OCR precisamente para la tarea de
transcripción de texto que este prompt solicita, por lo que la propia llamada de descripción
siempre pide alto detalle independientemente del nivel de detalle que usó la solicitud
entrante original. Esto solo afecta al cuerpo de la solicitud interna de descripción; no
cambia cómo OmniRoute reenvía el `image_url.detail` del llamante en la solicitud
principal: ese valor predeterminado se aplica por separado, y solo para clientes OpenCode
detectados, en `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La
rama de formato wire de Anthropic del self-loop de descripción no tiene campo `detail`
y no se ve afectada por ninguno de los dos valores predeterminados.

#### Límite de salida de la descripción (`modalityBridgeVisionMaxChars`)

| Clave                          | Predeterminado | Rango           |
| ------------------------------ | -------------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`            | `0` o 100–50000 |

`0` (predeterminado) significa **sin límite**: la descripción devuelta por
`callVisionModel()` se pasa sin modificar, preservando el comportamiento
existente. Cualquier valor en el rango 100–50000 trunca la descripción con un
sufijo `…` antes de que se vuelva a insertar como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` en `src/lib/guardrails/visionBridge.ts`).
Auméntalo para tareas de OCR intensivas en detalle donde el modelo posterior
necesita la transcripción completa; redúcelo para limitar el uso de tokens en
modelos de visión verbosos. El campo del dashboard se encuentra en el panel
Avanzado de la pestaña Vision (`modality-bridge-max-chars` en
`ModalityBridgeVisionTab.tsx`) y ajusta cualquier valor entre 1 y 99 hasta el
mínimo de 100, dejando un `0` explícito intacto: `0` es un valor Zod válido
por derecho propio (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
no meramente el valor predeterminado de "no establecido".

#### Caché de descripciones (`modalityBridge/bridgeCache.ts`)

Caché LRU + TTL en memoria para las salidas de descripción, compartida en todo el proceso.
Clave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con
encuadre de prefijo de longitud (sin colisiones en los límites de campos). El componente
del modelo es el modelo de bridge **configurado**, no el modelo que realmente respondió:
`callVisionModel` puede recurrir a fallback internamente, y usar la clave por intento
fragmentaría la caché. Las descripciones fallidas nunca se almacenan en caché. Configuración:

| Clave                           | Predeterminado | Rango   |
| ------------------------------- | -------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`         | —       |
| `modalityBridgeCacheTtlMinutes` | `60`           | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`          | 10–5000 |

#### Normalización de imágenes remotas (autollamada de descripción/obtención de base64)

Cuando el bridge obtiene una imagen **remota** por sí mismo — la autollamada de descripción de Anthropic y la conversión a base64 del formato wire de Claude (`ensureBase64ImagesForClaudeWire`), ambas a través de `fetchRemoteImageAsDataUri()` en `visionBridgeHelpers.ts` — el URI de datos resultante se pasa por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de incrustarse en la solicitud al modelo de visión. Las imágenes sobredimensionadas se reducen a un **borde largo de 2048px** (igualando el límite de redimensionado que OpenAI/Anthropic ya aplican del lado del servidor), lo que reduce los bytes y la latencia de subida sin cambiar lo que ve el modelo de visión. El redimensionado usa `sharp`, cargado mediante importación dinámica: en una plataforma donde su binario nativo no logra cargarse, `normalizeDataUri()` **nunca lanza una excepción** — recurre a un paso directo de los bytes originales, de modo que la ruta de descripción/conversión a base64 siempre sigue funcionando. Los bytes que no son imagen (una obtención que no devolvió una imagen decodificable) también se pasan sin modificar. Esta normalización se limita a las imágenes que el bridge obtiene para su propia autollamada — nunca se aplica al payload de paso directo sin procesar del llamante, en consonancia con el principio de mutación solo por activación explícita (Regla estricta n.º 20).

#### Esquema de configuración + migración

Las nuevas claves `modalityBridge*` se validan con Zod en `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, el trío `modalityBridgeCache*` y el grupo
`modalityBridgeAudio*` utilizado por el Audio Bridge. La migración
`141_modality_bridge_settings.sql` copia los valores heredados existentes de
`visionBridge*` a las nuevas claves correspondientes (idempotente, nunca sobrescribe
un valor `modalityBridge*` establecido por el operador); las claves heredadas siguen
aceptándose como respaldo de lectura durante un ciclo de lanzamiento.

#### Encabezado de transparencia + estadísticas

Las respuestas transformadas mediante descripción llevan
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construido por `buildModalityBridgeHeader()` en `modalityBridge/bridgeStats.ts`,
estampado por `withModalityBridgeHeader()` en `src/sse/handlers/chatHelpers.ts`).
Las solicitudes redirigidas **no** reciben encabezado — el payload no fue modificado
y el cambio de modelo ya es visible en el campo `model` del cuerpo de la respuesta.

`GET /api/modality-bridge/stats` (autenticación de gestión, mismo nivel que
`GET /api/settings`) devuelve los contadores en memoria por modalidad
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` y
`video`. `averageLatencyMs` usa `latencySamples`, no todos los intentos, como
denominador; una operación sin medición de tiempo no fabrica una muestra de cero
milisegundos. `bridged` sigue siendo el alias retrocompatible para las conversiones
exitosas; los intentos fallidos no lo incrementan.
Los contadores se reinician al reiniciar el proceso por diseño
(telemetría, no contabilidad).

#### Configuración del panel

La página dedicada del panel es
`/dashboard/settings/modality-bridge`. Sus pestañas `Vision`, `Audio` y
`Video`, direccionables por URL, conservan los parámetros de consulta al cambiar el valor de `tab`.
La pestaña Vision expone la habilitación, el modo, la selección de modelo (incluido el
predeterminado automático), los prompts adaptados a la tarea, límites avanzados de
tiempo de espera/imagen/longitud de descripción/caché, contadores de ejecución y una
solicitud de ejemplo protegida. La pestaña Audio también está activa: expone la
habilitación, un selector de modelos exclusivamente STT con Auto, límites de tiempo de
espera/clip máximo, contadores de audio y una prueba de ejemplo de `input_audio`. La
pestaña Video es funcional: informa del estado en tiempo de ejecución de
FFmpeg/ffprobe — uno de cuatro estados explícitos de la interfaz (`unknown` mientras
el sondeo está en curso o no pudo completarse, `restricted` en un host del panel que
no es loopback donde el sondeo se omite del lado del cliente, `unavailable` una vez
sondeado y confirmado como ausente, o `available` con las versiones de
FFmpeg/ffprobe) — persiste los límites de habilitación/modelo/fotogramas/video/tiempo
de espera, filtra el selector de modelos a modelos con capacidad de visión y expone
contadores de video.

La antigua tarjeta Vision Bridge en la configuración de IA es un enlace de
compatibilidad a la nueva página; ya no posee una segunda copia del formulario. Media
Providers también enlaza los flujos de trabajo de imagen a texto y de voz a texto a las
pestañas correspondientes de Modality Bridge sin eliminar el playground de voz a texto
existente.

**Bypass de admisión del self-loop:** cuando la llamada de descripción se enruta a
través del self-loop `/v1` propio de OmniRoute (modelo de proveedor no estándar), la
subsolicitud envía `x-omniroute-admission-bypass: internal` y se autentica con la
credencial de self-loop resuelta — el centinela local `sk_omniroute` en modo local, o
la clave de entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada por el operador
(#1350), de modo que los despliegues con `REQUIRE_API_KEY=true` puedan seguir
ejecutando la llamada de descripción. El bypass solo se respeta para esas credenciales
exactas, por lo que los clientes externos no pueden usar el encabezado para saltarse
la admisión.

Los valores predeterminados heredados residen en
`src/shared/constants/visionBridgeDefaults.ts`; los nuevos valores predeterminados de
modo/adaptación a la tarea/caché y el resolvedor de configuración residen en
`src/shared/constants/modalityBridgeDefaults.ts`. El guardrail expone una opción de
constructor `deps` para que las pruebas puedan inyectar implementaciones falsas de
`getSettings` y `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta las solicitudes de chat que contienen audio antes de que lleguen a un
destino del que no consta que acepte entrada de audio. Nunca redirige la solicitud de
chat: las partes de audio se transcriben a través del endpoint multipart existente
compatible con OpenAI y el modelo de chat elegido continúa con las transcripciones de
texto.

Flujo:

1. Resuelve `supportsAudio` a través de `getResolvedModelCapabilities()`. Los metadatos explícitos del registro de proveedores tienen prioridad, luego los metadatos estáticos del modelo y después el `modalities_input` sincronizado. Una lista de entradas declarada sin `audio` es `false`; sin evidencia de capacidad permanece `null`. Tanto `false` como `null` activan el puente conservador, mientras que `true` lo omite.
2. Resuelve la configuración `modalityBridgeAudio*` y extrae las partes de audio de nivel superior empalmables de cada mensaje mediante el detector compartido `detectMediaParts()`. Los formatos de transmisión admitidos son `input_audio` de OpenAI, `audio_url` y `source.media_type: "audio/*"`. El audio anidado se detecta para el enrutamiento, pero la ruta de empalme no lo elimina. El trabajo está limitado por `modalityBridgeAudioMaxClips`; las partes posteriores permanecen intactas.
3. Respeta un `provider/model` configurado, o deja que `selectAudioBridgeModel()` recorra `AUDIO_TRANSCRIPTION_PROVIDERS` en el orden estable del catálogo y seleccione el primer modelo con una credencial de proveedor activa utilizable.
4. `callAudioTranscription()` convierte el audio base64/data-URI en un `file` multiparte, o descarga una `audio_url` remota a través del guardián de salida solo a destinos públicos con fijación de DNS y un límite de 25 MB. Luego envía por POST el archivo y el modelo seleccionado al bucle interno local `/v1/audio/transcriptions`, autenticado con `resolveSelfLoopBearer()`. La ruta de transcripción existente realiza la búsqueda normal de credenciales, la gestión de cooldown/límite de tasa y el despacho al proveedor.
5. Las llamadas exitosas reemplazan sus partes con `[Audio N]: <transcript>`. Las llamadas se ejecutan con `Promise.allSettled`: un fallo individual conserva esa parte de audio original (contrato #4012). Si todas las llamadas fallan y el destino está confirmado como `supportsAudio === false`, las partes se convierten en `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para un destino desconocido (`null`), un resultado de fallo total permanece intacto. Un destino confirmado como solo texto sin credencial STT utilizable recibe el mismo marcador explícito sin realizar una llamada de red.

Las transcripciones exitosas usan la caché LRU/TTL de Modality Bridge para todo el proceso. La clave combina la referencia de audio, la etiqueta de operación estable `audio-transcription` y el modelo STT seleccionado; los fallos nunca se almacenan en caché. Los intentos de audio actualizan los contadores compartidos `bridged`, `cacheHits`, `failures` y `lastUsedAt`. Las respuestas transformadas llevan `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; las solicitudes intactas no reciben un segmento de Audio Bridge.

La configuración en tiempo de ejecución está respaldada por la base de datos y validada con Zod:

| Clave                         | Predeterminado | Rango                  |
| ----------------------------- | -------------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`         | —                      |
| `modalityBridgeAudioModel`    | `""`           | Automático o ID de STT |
| `modalityBridgeAudioTimeout`  | `60000`        | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`            | 1–10                   |

La caché compartida sigue controlada por `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta las partes de video de nivel superior en los `messages` de Chat Completions y en el `input` de la API de Responses antes de que se llame a un destino sin soporte nativo de video conocido. Las formas admitidas son `input_video`, `video_url`, `video_source`, URLs HTTPS y URIs de datos `data:video/*;base64,...`. Los nombres de archivo simples en el texto no se tratan como video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) se encarga del recorrido de la solicitud, la verificación de capacidad/política, la agregación por solicitud y la carga útil de la respuesta. El trabajo por video — adquisición, la caché de resultado completo, la descripción de una secuencia de fotogramas (que fusiona cualquier transcripción de audio declarada por el llamador) y las métricas/aborto/limpieza por intento — está oculto detrás de `processVideoPart` en `videoBridgePipeline.ts`, al que se llama una vez por cada parte de video dentro del bucle de `preCall`. Ese módulo también define los límites de puerto explícitos `VideoMediaBrokerPort` (adquisición de bytes y extracción de fotogramas muestreados), `VideoAudioTranscriptionPort` (fusión de una transcripción de audio declarada por el llamador con las descripciones muestreadas) y `VideoDrilldownPort` (el límite de persistencia del desglose de fotogramas; aún no conectado a `processVideoPart` — hoy solo la ruta separada `/api/modality-bridge/video/drilldown` escribe entradas de desglose).

La ruta pública de solicitudes `/v1` nunca importa ni invoca un subproceso. Los videos remotos se descargan bajo un límite de 50 MiB; los videos base64 en línea tienen un límite conservador de 36 MiB decodificados por video, de modo que la envoltura de modelo/mensajes/encuadre pueda permanecer dentro del límite de admisión de solicitudes JSON públicas de 50 MiB. La longitud en línea y las estimaciones de tamaño decodificado se verifican antes de la asignación. Se requiere HTTPS en la URL remota inicial y en cada redirección, usando el guardián de salida solo a destinos públicos existente con fijación de DNS. Los bytes luego cruzan el límite exacto del intermediario interno `POST /api/modality-bridge/video/extract`. Esa ruta es tanto `LOCAL_ONLY` como `SPAWN_CAPABLE`, solo acepta una solicitud de loopback confiable autenticada por proceso, y nunca acepta una URL, una ruta del sistema de archivos, un ejecutable o una lista de argumentos. El pipeline de tamaño de cuerpo de la API y el lector de cuerpo incremental del manejador imponen de forma independiente un límite de entrada del intermediario de 50 MiB. Su cola acotada ejecuta una extracción a la vez, permite cuatro trabajos pendientes y limita la entrada pendiente a 100 MiB.

Dentro del broker, `ffprobe` lee un archivo local privado; la lista fija de formatos permitidos excluye los formatos de lista de reproducción y de manifiesto. Para los contenedores permitidos de la familia MOV, las referencias externas de datos MOV permanecen deshabilitadas de forma predeterminada, y el comando fijo no las habilita. Tanto `ffprobe` como `ffmpeg` utilizan la lista blanca de protocolos exclusivamente `file`, un solo hilo, arrays de argumentos fijos, sin shell, y ejecutables resueltos desde `PATH`. Los flujos de portada de imagen adjunta no son candidatos reproducibles. Todos los flujos reproducibles deben cumplir los límites, y se prefiere un flujo predeterminado explícito antes que la reserva determinista de índice más bajo. Los videos están limitados a 600 segundos, 8.192 píxeles por dimensión y 33.554.432 píxeles de origen. FFmpeg muestrea entre 1 y 16 fotogramas JPEG de punto medio, reduce el borde largo a un máximo de 1.024 píxeles sin ampliar las entradas más pequeñas, y nunca recibe una URL. El muestreo es `uniform` de forma predeterminada. Las políticas opcional `scene_aware` y experimental `segment_aware` ejecutan un pase fijo adicional de FFmpeg sobre el flujo local ya validado, seleccionan marcas de tiempo de escena acotadas de `showinfo`, y recurren de forma determinista a los mismos puntos medios uniformes ante un fallo del detector, un tiempo de espera agotado, una salida malformada o un conjunto de candidatos vacío. El modo sensible a segmentos asigna las muestras de punto medio proporcionalmente a los intervalos de escena validados; la evidencia sensible a segmentos y el comportamiento de reserva se detallan más abajo. El límite estricto de 16 fotogramas se aplica después de la selección en todas las políticas. Cuando una solicitud sensible a escenas solo dispone de un presupuesto de un fotograma, utiliza el punto medio uniforme de la ventana activa, ya sea de video completo o de enfoque, y reporta `policyEffective: uniform`: un único fotograma de escena seleccionado no puede preservar ambos extremos temporales. El llamante puede proporcionar opcionalmente una ventana de enfoque finita (segundos `start`/`end`); los límites se ajustan a la duración del medio, las ventanas invertidas o no finitas se rechazan, y todas las políticas de muestreo se ejecutan únicamente dentro del intervalo normalizado. La ventana resultante se incluye en los metadatos de muestreo y en el prefijo de descripción no confiable, de modo que los modelos posteriores puedan distinguir un extracto enfocado de la línea temporal completa.

El enfoque semántico de subtítulos es un ajuste independiente y explícito. El modo de análisis `full` predeterminado conserva el prompt de fotogramas existente y nunca reenvía texto de la solicitud al modelo de subtítulos. En el modo `focused`, el bridge lee únicamente el último `text`/`input_text` no vacío escrito por el usuario del mismo contenedor de Chat o Responses, lo normaliza a NFC, colapsa los caracteres de control y los espacios en blanco, y lo limita a 500 puntos de código Unicode. Un resultado vacío recurre al prompt `full` exacto. Una sugerencia utilizable se serializa como JSON en un bloque dedicado de contexto de usuario no confiable y solo puede priorizar detalles observables; no puede anular la advertencia independiente contra seguir instrucciones visibles o audibles en el medio. El enfoque textual nunca infiere `start`/`end` ni modifica el muestreador temporal.

#### FU-07 evidencia estructural de segmentos

`segment_aware` utiliza un único pase de preanálisis acotado sobre el flujo de video local ya validado. La cadena de filtros fija primero escala a un máximo de 320 píxeles de ancho, detecta cambios de escena e intervalos congelados, y a continuación muestrea a 1 fotograma por segundo para obtener desenfoque, luma promedio e información espacial/temporal. El pase está limitado a 600 muestras estructurales, un hilo de FFmpeg/filtro, las mismas listas de permitidos de protocolo exclusivamente `file` y de contenedores, un límite de salida de proceso de 1 MiB, y un máximo de 30 segundos dentro del aborto/plazo compartido del broker. Nunca acepta un comando, filtro, ruta o URL de la solicitud.

Los valores estructurales son evidencia de muestreo determinista, no comprensión semántica del video. No infieren sujetos, acciones, subtítulos, habla ni intención del usuario. Los límites de escena y de congelación forman segmentos; la cobertura de congelación, el desenfoque, la exposición, el detalle espacial y el cambio temporal solo influyen en cómo se asigna el presupuesto existente de 1 a 16 fotogramas. Un segmento completamente congelado se limita a un fotograma, mientras que los segmentos no congelados compiten por el presupuesto restante. Cuando los límites superan en número a los fotogramas, se conserva la cobertura uniforme de la línea temporal, de modo que los cortes rápidos al inicio no puedan ocultar un segmento final largo. Los límites de escena que caen dentro de la resolución de análisis de 1 segundo de un límite de congelación se fusionan.

Los filtros ausentes, la evidencia malformada o vacía, un error del detector o el tiempo de espera agotado del preanálisis acotado fallan en modo abierto hacia la política exacta de punto medio uniforme. Un aborto del llamante o un plazo límite del broker no falla en modo abierto: termina el subproceso en curso, impide la extracción posterior de fotogramas, y el árbol temporal privado se elimina en `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixtures reales y deterministas de FFmpeg para el ahorro de llamadas de subtítulos tras la deduplicación, la asignación de presupuesto en movimiento denso, la evidencia de desenfoque/exposición/SI-TI, los cortes rápidos con una cola larga y los falsos positivos por fundido gradual. Registra el tiempo de reloj del preanálisis y, cuando `/usr/bin/time` está disponible, la CPU del proceso hijo y el RSS pico. Sus comprobaciones de calidad son únicamente oráculos estructurales. La calidad real del modelo de subtítulos permanece en `HOLD` porque este banco de pruebas carece de un endpoint autorizado y de un juez congelado. El ahorro monetario también permanece en `HOLD` a menos que `--caption-cost-per-call-usd` proporcione una estimación explícita y positiva por llamada; el script nunca fabrica ninguno de los dos resultados.

Cada fotograma está limitado a 4 MiB, todos los fotogramas sin procesar en conjunto a 23 MiB, y la respuesta serializada del broker a 32 MiB. Un directorio temporal privado se elimina en `finally`. OmniRoute no incluye FFmpeg ni acepta una ruta de ejecutable personalizada. Antes del subtitulado, el puente aplica una pasada conservadora de desduplicación visual: cada JPEG se reduce a un búfer en escala de grises de 16×16 y se compara únicamente con el último fotograma retenido. Para un presupuesto de subtítulos solicitado superior a un fotograma, la extracción suministra un conjunto acotado de candidatos de hasta el doble de ese presupuesto y nunca más de 16 fotogramas. El límite solicitado se aplica solo después de la desduplicación, con el primer y el último candidato seleccionados preservados durante la reducción final cuando el presupuesto es de al menos dos. La política versionada `grayscale-16x16-mean-cells-v2` utiliza el mayor entre el delta medio de luma y la proporción de celdas de miniatura cuyo delta normalizado es de al menos 0.05. El umbral de duplicados es la constante 0.04, elegida por previsibilidad en lugar de exponerse como un ajuste en tiempo de ejecución. Esta señal secundaria de alto contraste preserva movimientos pequeños y cambios de texto visible que una comparación basada únicamente en la media puede ocultar. Los errores del comparador o del decodificador fallan en modo abierto y mantienen la cobertura. Los metadatos de salida separan los candidatos extraídos, los fotogramas utilizados con éxito y los duplicados visuales descartados.

Una parte de vídeo marcada explícitamente puede solicitar una hoja de contactos con marcas de tiempo. El puente construye como máximo una cuadrícula JPEG de 4 columnas y 16 fotogramas. Cada celda de 512 píxeles graba su marca de tiempo de origen en una banda inferior de alto contraste, mientras que las mismas marcas de tiempo permanecen en los metadatos textuales para su asociación y auditoría posteriores. El JPEG completo permanece limitado a 32 MiB. Si `sharp` no puede decodificar o componer la cuadrícula, el puente recurre a los fotogramas JPEG individuales; una cancelación del cliente aún se propaga a través de la operación de la hoja.

La evidencia de promoción está deliberadamente separada del microbenchmark sintético de composición. `scripts/perf/video-bridge-contact-sheet-eval.ts` define un arnés A/B con esquema versionado para modelos de visión reales compatibles con OpenAI. Mide los tokens reportados por el proveedor, la latencia real de extremo a extremo (incluida la composición de la hoja), el número de llamadas al modelo y la retención de hechos definida por el manifiesto. Las respuestas crudas del modelo no se escriben en el informe; solo se conservan los resúmenes SHA-256 y los ID de hechos coincidentes. El arnés no realiza ninguna llamada de red ni de modelo de pago a menos que se pase `--execute-real` y estén configurados `--model`, `OMNIROUTE_BASE_URL` y `OMNIROUTE_API_KEY`. Sin esa ejecución real explícita, su veredicto legible por máquina permanece en `HOLD`; las mediciones sintéticas de carga útil/número de llamadas por sí solas no constituyen evidencia de promoción.

Los llamadores pueden adjuntar un array opcional `transcript.cues` a una parte de vídeo compatible cuando ya poseen texto alineado. Cada cue debe llevar `text`, un intervalo finito `start`/`end` dentro de la duración sondeada y un `source` incluido en la lista blanca (`client`, `embedded` o `audio-bridge`); `confidence` tiene como valor predeterminado `1` y debe permanecer entre `0` y `1`. Los cues duplicados exactos se colapsan. OmniRoute nunca inicia la transcripción a partir de estos metadatos: los cues validados se copian en el resultado descrito con su origen, confianza e intervalo, y se presentan como observaciones no confiables junto a los subtítulos de los fotogramas. El texto no válido, fuera de rango o sin procedencia se rechaza en lugar de mezclarse en el flujo de subtítulos. Ambos canales de transcripción del cuerpo de la solicitud normalizan la procedencia suministrada a `client`, incluidas las etiquetas autodeclaradas `embedded` o `audio-bridge`. Solo un adaptador controlado por el servidor puede asignar esas etiquetas confiables mediante el argumento `trustedSource`, accesible únicamente desde el código; un campo JSON de la solicitud no puede alcanzar ese argumento. El texto de la transcripción sigue siendo contenido no confiable derivado de medios, independientemente de su procedencia, y nunca debe determinar la autorización.

Un llamador avanzado puede proporcionar una pista `audioTranscript` para el mismo vídeo; se trata como texto proporcionado por el cliente, no como prueba de transcripción del servidor. La costura de fusión ejecuta las observaciones visuales y de audio bajo un mismo plazo y una misma señal de cancelación, las ordena en una línea de tiempo común, colapsa los duplicados exactos y reporta un resultado parcial cuando solo un lado tiene éxito. Un `audioTranscript` no válido degrada a ese resultado parcial —la descripción visual se conserva y la rama de audio registra un código de fallo saneado— en lugar de hacer fallar todo el vídeo. La disponibilidad por rama, el indicador de parcialidad y los códigos de fallo saneados se preservan en el resultado descrito, en los metadatos de protección (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), en los metadatos de la caché de resultados y en los contadores de fusión del puente. La ruta predeterminada del Video Bridge no invoca la conversión de voz a texto ni descarga una segunda copia del medio; sin esa pista explícita, permanece en modo solo vídeo.

**Retención de transcripciones (#12150 P1).** Esto se aplica automáticamente siempre que el
Video Bridge (opt-in por sí mismo) renderiza una señal (cue) de transcripción — no existe una
bandera de retención separada. Cuando una solicitud renderiza cualquier señal de transcripción (un
`transcript` declarado por el llamante o un `audioTranscript` fusionado), el guardarraíl la marca como
`videoBridgeObserved` y produce una sombra redactada de la descripción del video —
una representación idéntica en la que el cuerpo de texto libre de cada señal se reemplaza por
`[redacted-video-transcript]`, construida sustituyendo el campo estructurado de la señal
antes de que la cadena sea ensamblada (nunca analizando el texto aplanado, de modo que ningún contenido
de las señales —adversarial u ordinario, incluidos cuerpos que contienen `]` como
`[inaudible]`/`[music]`— puede sobrevivir). El cuerpo de la solicitud persistido en el registro de llamadas intercambia
cada parte de texto derivada del video por esa sombra redactada, emparejada por igualdad
de contenido; el ancla `fullText` se vuelve a leer desde la carga útil finalizada del guardarraíl
previo a la llamada, de modo que la coincidencia sigue teniendo éxito después de que guardarraíles posteriores de la cadena (los enmascaradores de PII y
credenciales, prioridades 10/95) reescriban el texto de la descripción in situ y
después de que la inyección de system-prompt/handoff/memoria remodele el arreglo de mensajes. El
cuerpo enviado upstream al modelo permanece sin cambios. Una solicitud observada tampoco pobla
ninguna Memory durable (se omite la extracción derivada tanto de la solicitud como de la respuesta),
de modo que la propia respuesta del modelo no puede hacer eco del texto de la transcripción en Memory.

**Campos de video sin procesar (#12430).** Cuando el bridge está habilitado y el soporte nativo de video es desconocido o está ausente, los campos `transcript`/`audioTranscript` definidos también activan `videoBridgeObserved`, incluso tras un fallo de descripción o un límite de `maxVideos`. Los valores `null` y las cadenas vacías cuentan; los campos ausentes y los metadatos que no son de video no. Las copias retenidas redactan estos campos u omiten la solicitud, y las cachés/Memory se omiten (bypass).

En esas rutas de fallback, las señales válidas del llamante se convierten en partes
`text`/`input_text` soportadas en lugar de campos de proveedor no estándar. Ambas pistas
suministradas en la solicitud permanecen como observaciones `client` no confiables, con una advertencia explícita de que el video
no fue descrito y que las marcas de tiempo no fueron verificadas contra el medio. Los
presupuestos existentes de 256 señales/64 KiB en total y por señal se aplican a las dos pistas en conjunto;
las marcas de tiempo deben ajustarse al techo de 600 segundos del broker y a cualquier ventana
de enfoque suministrada. Las pistas inválidas se descartan, no se reenvían como texto arbitrario; una pista
hermana válida aún puede usarse a menos que se exceda su presupuesto combinado. Los campos nulos/vacíos
no agregan texto. Este fallback no agrega ninguna obtención de medios ni transcripción.
Los campos de extensión de transcripción se eliminan del portador de video de fallback y de sus
objetos `video_url`/`source`. La lista de permitidos (allowlist) del wire de OpenAI permanece estricta; los portadores de video
con soporte nativo desconocido permanecen disponibles y los destinos conocidos de solo texto conservan marcadores seguros.
Las sombras de redacción estructuradas protegen el texto de transcripción anexado, mientras que la
solicitud original propiedad del llamante permanece sin cambios. Los destinos con soporte nativo y los
bridges deshabilitados conservan su comportamiento de bypass existente.

Las copias retenidas adicionales usan la misma señal de solicitud observada. La
instantánea de la solicitud del cliente previa al guardarraíl, la solicitud pendiente en memoria y el registro
temprano de solicitudes rechazadas reemplazan estructuralmente los campos de transcripción en las partes de video;
los prompts de cadena sintetizados por etapas del pipeline y por el handoff de contexto se redactan
en el sumidero (sink) del cuerpo de solicitud persistido. El marcador persistido `video_content_removed`
hace que la continuación con `previous_response_id` falle de forma cerrada (fail closed) en lugar de reconstruir
texto que fue descartado intencionalmente. Si una solicitud observada pierde su
sombra de redacción por parte antes del registro, o incluso si una de varias sombras de video
no logra coincidir después de mutaciones posteriores de la solicitud, el cuerpo de la solicitud retenido se
omite por completo en lugar de retener una transcripción parcialmente redactada.

Para una solicitud observada, una respuesta del modelo podría citar cualquier porción de la
transcripción sin un límite de señal estructurado. Por lo tanto, su `responseBody` persistido en el registro de llamadas
es reemplazado por un marcador de omisión; el artefacto detallado
del pipeline (que puede incluir cuerpos upstream/del cliente y fragmentos del stream)
no se retiene. Las cachés semántica, de idempotencia y de reproducción de razonamiento omiten
lecturas y escrituras para esa solicitud. La solicitud al proveedor y la respuesta
visible para el cliente permanecen sin cambios. Los bytes de keepalive tempranos se drenan del búfer
temporal cuando el artefacto detallado se omite. La advertencia de EventStream
malformado de Kiro reporta solo el recuento de bytes de la carga útil, nunca su contenido ni el
error crudo del analizador JSON.
Esto no afirma que cada diagnóstico no relacionado de proveedor/plugin haya sido
auditado; el barrido más amplio de sumideros retenidos se rastrea en #11658.

El ciclo de vida interno de `/api/modality-bridge/video/drilldown` es un sustrato de caché separado,
autenticado por loopback/token. Cada operación también requiere un
ID de principal opaco canónico. Antes de que un llamante de producción sea habilitado, debe
derivar ese ID del tenant autenticado y nunca debe reenviar un
valor seleccionado por el cliente. Las claves de caché vinculan ese principal con IDs canónicos de sesión y
de referencia de video, almacenan solo sus claves derivadas de SHA-256 y limitan tanto las lecturas
como la eliminación al mismo principal. La caché almacena como máximo 16 fotogramas JPEG
derivados por entrada, los expira después de diez minutos y admite lecturas acotadas
por `start`/`end` o la eliminación explícita de la sesión.

Cada principal está limitado a 16 entradas y 64 MiB de datos JPEG canónicos. Esos
límites son independientes del techo global de 64 entradas/256 MiB: la presión de cuota
del principal expulsa solo las entradas menos recientemente usadas de ese principal antes de que se considere la expulsión
LRU global. Las entradas expiradas se barren de la contabilidad tanto del principal como
global durante la actividad de la caché, mientras que la cancelación y el fallo de validación no
confirman un reemplazo parcial.

La caché rechaza Base64 no canónico, relleno excesivo, contenido multimedia que no sea JPEG, JPEG malformados o truncados, y JPEG que produzcan una advertencia durante una decodificación `sharp` acotada de imagen completa. Vuelve a codificar cada imagen aceptada como un JPEG canónico, deriva el ancho y el alto de los bytes decodificados en lugar de confiar en los campos del llamante, y descarta cualquier byte políglota final en lugar de conservarlo. Solo el búfer comprimido canónico acotado se imputa a ambas cuotas. El límite de transmisión JSON incluye la sobrecarga de Base64 para el tope de entrada decodificada de 32 MiB. Cada
derivación almacenada registra su formato/resolución JPEG validados, la política de muestreo,
la versión de derivación, la hora de creación, el hash de contenido calculado por el servidor y la referencia hasheada al padre, además del hash de contenido del padre del llamante confiable. La cancelación se comprueba
entre las fases asíncronas de decodificación/hash antes de la escritura atómica en la caché.

Este tramo aún no conecta un productor de producción a la ruta y no
proporciona selección de variantes multirresolución. Por lo tanto, la ruta de solicitud transparente del Video Bridge no incurre en trabajo adicional, mientras que la derivación del principal vinculado al inquilino y el ciclo de vida multirresolución completo de FU-08 permanecen como trabajo de seguimiento explícito en lugar
de documentarse como comportamiento completo.

Los fotogramas se describen secuencialmente con el modelo de Video configurado. Una anulación de Video
vacía hereda la configuración de Vision; si ambas están vacías, el
enrutador automático de Vision selecciona el modelo con capacidad de visión efectivo. Las descripciones exitosas
reemplazan la parte original con un prefijo estable `[Video description:` que también
marca el texto como una observación no confiable derivada del contenido multimedia e indica a los modelos
posteriores que no sigan las instrucciones encontradas en dicho contenido. Las claves de caché de las descripciones de
fotogramas
incluyen los bytes JPEG, el prompt, la marca de tiempo y el modelo efectivo; solo
se almacenan en caché las descripciones exitosas. Las entradas de caché conservan el modelo productor real que tuvo éxito,
incluido un modelo de respaldo; el bridge informa `mixed` cuando distintos fotogramas
fueron producidos por distintos modelos. Un acierto de caché reutiliza esa identidad de productor
en lugar de reetiquetarla como el plan de enrutamiento solicitado. La caché de resultados de
video completo se indexa por cada entrada que cambia la salida — prompt, modelo
efectivo, política de muestreo, número de fotogramas, modo de análisis semántico, la huella SHA-256 de la
sugerencia de enfoque normalizada, la ventana de enfoque, `transcript`,
`audioTranscript` y el indicador de hoja de contacto — de modo que cambiar cualquiera de esas
dimensiones es un fallo de caché, nunca una reutilización obsoleta. La versión de la política de
deduplicación visual, el umbral y el número acotado de fotogramas candidatos también son explícitos en la
clave y los metadatos de la caché de resultados; por lo tanto, un cambio de política no puede reutilizar una
descripción obsoleta de video completo. Los metadatos v4 de la caché de resultados conservan el modo y la
huella, nunca la tarea de usuario sin procesar. Los metadatos del guardrail informan tanto los
modos de análisis solicitados como los efectivos; un modo `focused` solicitado sin
texto de usuario utilizable se informa como efectivamente `full`.

El guardrail extrae cada parte de video compatible, pero no describe más de
`modalityBridgeVideoMaxVideos`. Para un destino del que se ha comprobado que tiene
`supportsVideo === false`, los videos fallidos y los que superan el límite se convierten en marcadores de texto seguros
explícitos, de modo que no sobreviva ningún video sin procesar. Cuando la capacidad es desconocida, esas partes
conservan su portador de video; cualquier transcripción de respaldo sigue la conversión de texto
acotada descrita anteriormente. Los destinos con `supportsVideo === true` omiten el bridge.
La señal de aborto de la solicitud del cliente se propaga a través de la descarga, la cola del broker,
los subprocesos y las llamadas de descripción; los abortos se detienen entre videos y nunca fallan
en abierto dejando pasar contenido multimedia sin procesar.

La configuración en tiempo de ejecución está respaldada por la base de datos y validada con Zod:

| Clave                               | Predeterminado | Rango / comportamiento                                                                                           |
| ----------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`        | Opcional en tiempo de ejecución, de activación voluntaria                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`       | `full` conserva descripciones genéricas; `focused` utiliza el contexto acotado y no confiable del último usuario |
| `modalityBridgeVideoModel`          | `""`           | Hereda el modelo del Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`            | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`    | `uniform`, `scene_aware` o `segment_aware` proporcional; un fallo del detector recurre a `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`            | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`       | 1000–120000 ms                                                                                                   |

Los valores de tiempo de espera de Video heredados persistidos por encima de 120 segundos
se limitan al plazo del broker; las nuevas escrituras de configuración por encima de ese límite se rechazan.
`GET /api/modality-bridge/video/runtime` requiere una localidad de loopback sellada
y confiable antes de la autenticación o el sondeo del runtime, y luego requiere autenticación de
gestión. Devuelve solo `available`, versiones saneadas de FFmpeg/ffprobe y una
razón fija cuando el runtime no está disponible. El endpoint interno de extracción no es
una API pública de carga: la saturación de la cola devuelve `503` más `Retry-After`, una desconexión
del llamante devuelve `499` y el plazo fijo del broker devuelve `504`. Las respuestas convertidas añaden
`video->text;model=<visionModel>;parts=<videos>` al encabezado central
`x-omniroute-modality-bridge` sin eliminar los segmentos de Vision o Audio.

### PII Masker (`piiMasker.ts`)

Se ejecuta en **ambas** etapas.

- **`preCall`** clona el payload, recorre `system`, `messages`, `input` y
  `prompt` (incluidos los elementos que son cadenas simples), y aplica
  `processPII()` (de `@/shared/utils/inputSanitizer`) a los campos de cadena
  `content`/`text`. Cuando `PII_REDACTION_ENABLED=true`, la PII detectada se
  enmascara en el payload saliente. Esto es independiente de
  `INPUT_SANITIZER_MODE` (que solo controla la política de inyección de
  prompts). Cuando el enmascaramiento está desactivado, la llamada registra los
  conteos de detección sin reescribir el contenido.
- **`postCall`** clona en profundidad la respuesta, ejecuta
  `sanitizePIIResponse()` junto con el enmascarador para la forma de la API de
  Responses (`maskResponsesOutput`, que cubre `output_text` y
  `output[].content[].text`). Si se produce algún enmascaramiento, la respuesta
  modificada reemplaza a la original.

El guardrail nunca bloquea; solo anota (`meta.detections`, `meta.redacted`) o
reescribe.

#### Selección por tipo, patrones personalizados y contadores de detección

**Panel → Configuración → Seguridad → Enmascaramiento de PII** elige _qué_ se
enmascara. No activa el enmascaramiento: eso sigue correspondiendo a
`PII_REDACTION_ENABLED` (solicitud) y `PII_RESPONSE_SANITIZATION` (respuesta +
SSE), ambos desactivados de forma predeterminada.

- **Selección por tipo**: los identificadores integrados se enumeran en
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Si no se configura,
  se aplican todos los tipos (el comportamiento anterior a la existencia de
  este ajuste). El patrón `ssn_us` del motor de solicitudes se asigna a `ssn`.
  Las plantillas (Minimal, Standard, Financial, Brazilian, USA, Full) solo
  rellenan las casillas de verificación en la interfaz.
- **Patrones personalizados**: hasta 20 patrones de expresión regular o de
  comodín (`*` = hasta 64 caracteres que no sean espacios en blanco, `?` =
  uno). Las coincidencias se convierten en `[CUSTOM_REDACTED]`. Cada patrón
  pasa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  máximo 500 caracteres, flags limitadas a `g i m s u`, debe compilar, debe
  pasar `safe-regex` (retroceso catastrófico) y no debe coincidir con una
  cadena vacía ni con un marcador de posición de enmascaramiento. Un patrón que
  falla se rechaza al guardarlo y al probarlo, y una fila almacenada que falla
  se omite en tiempo de ejecución en lugar de compilarse. Los patrones
  personalizados solo se ejecutan mientras el enmascaramiento está activado.
- **Contadores de detección**: conteos por tipo (nunca los valores
  coincidentes), mantenidos en memoria y restablecidos al reiniciar
  (`src/lib/pii/piiDetectionStats.ts`). Solo aumentan mientras el
  enmascaramiento está activado.

Los ajustes residen en la tabla `key_value` (espacio de nombres `pii_settings`,
`src/lib/db/piiSettings.ts`) y se leen a través de una caché de 1 s. API:

| Método | Ruta                     | Propósito                                                                          |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado de las flags, `enabledTypes`, `customPatterns`, contadores de detección     |
| `PUT`  | `/api/settings/pii`      | Reemplazar `enabledTypes` (`null` = todos) y/o `customPatterns`                    |
| `POST` | `/api/settings/pii/test` | Prueba en seco de un patrón contra una muestra de máximo 8 KB; no se almacena nada |

Los tres requieren autenticación de gestión y validan el cuerpo con Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Inyección de prompts (`promptInjection.ts`)

Detecta estructuras adversarias en el contenido proporcionado por el usuario y
aplica la política configurada. El comportamiento se controla mediante
variables de entorno y opciones del constructor:

| Configuración     | Variable de entorno                                                                                   | Valor predeterminado | Efecto                                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`               | Cuando es `false`, el guardrail se cortocircuita.                                                                                                                                                                                           |
| Modo              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`               | Política de inyección: `block`, `warn` o `log`. (`redact` se acepta por compatibilidad con versiones anteriores, pero **no** elimina el texto de inyección; la reescritura de PII de la solicitud se controla con `PII_REDACTION_ENABLED`.) |
| Umbral de bloqueo | opción `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`               | Severidad mínima requerida para bloquear. Con el valor predeterminado, la severidad media es solo de observación.                                                                                                                           |

**Precedencia de modos** (`getMode`): `options.mode` del llamador →
`INJECTION_GUARD_MODE` **anulación por feature flag de la base de datos**
(Panel → Configuración → Feature Flags) → variable de entorno
`INJECTION_GUARD_MODE` → variable de entorno `INPUT_SANITIZER_MODE` → `warn`.
Por tanto, una anulación desde el panel prevalece sobre las variables de
entorno, de modo que la interfaz de Feature Flags controla el guard en
ejecución en vivo (sin reinicio). La lectura de la base de datos es a prueba de
fallos: si produce un error, el guard vuelve al comportamiento basado en
variables de entorno, y cuando no hay ninguna anulación configurada, el
comportamiento es idéntico a la resolución solo por variables de entorno.

Fuentes de detección:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de
   detectores compartido que se usa en otras partes del pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrados (actualmente `system_override_inline` y
   `markdown_system_block`, ambos de severidad `high`).
3. `customPatterns` opcionales pasados mediante las opciones del constructor
   (cadenas, expresiones regulares o registros `{ name, pattern, severity }`).

Cuando `mode === "block"` **y** al menos una detección alcanza el umbral de
severidad, `preCall` devuelve
`{ block: true, message: "Request rejected: suspicious content detected" }`.
En los modos `warn`/`log` el guardarraíl registra pero permite la llamada. El
helper compartido `evaluatePromptInjection()` también se exporta para quienes
necesiten evaluar prompts sin pasar por el registro.

**Límite de escaneo (v3.8.20):** el detector solo inspecciona los **primeros
16 KB** del texto del prompt concatenado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bytes) en `src/shared/utils/inputSanitizer.ts`. Tanto
`detectInjection()` como `evaluatePromptInjection()` aplican
`slice(0, MAX_INJECTION_SCAN_BYTES)` antes de ejecutar el bucle de patrones.
Las directivas de inyección se ubican cerca del inicio de una entrada, por lo
que esto acota el uso de CPU/GC de las regex en cargas útiles de varios cientos
de KB sin debilitar la detección (cf. #3932, #4041).

### Enmascarador de credenciales (`credentialMasker.ts`)

Se ejecuta en **ambas** etapas, último en la cadena predeterminada (prioridad
`95`). Enmascara patrones conocidos de claves de API / tokens secretos en la
carga útil saliente (contenido de mensajes, argumentos de llamadas a
herramientas, resultados de herramientas) **y** en la respuesta del proveedor,
de modo que una credencial pegada en un prompt (o repetida por el resultado de
una herramienta) no se filtre al proveedor ascendente ni de vuelta al cliente.

- **Solo opt-in**, misma convención que el enmascaramiento de PII (relacionado
  con la Regla estricta n.º 20): deshabilitado a menos que
  `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Con esta opción desactivada, el
  guardarraíl es un no-op: nunca bloquea y nunca reescribe.
- `redactCredentials()` recorre el árbol completo de la carga útil/respuesta
  (`walkValue()`, seguro frente a la contaminación de prototipos, seguro frente
  a ciclos gracias a `WeakSet`) y reemplaza las coincidencias con un marcador
  `[REDACTED:<type>]`, clonando solo las ramas que realmente cambiaron.
- `CREDENTIAL_PATTERNS` cubre claves de proveedores de LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), claves de pago
  (Stripe, Square), claves de nube (clave de acceso de AWS, Twilio, SendGrid,
  Mailgun), claves privadas / JWT, cadenas de conexión que contienen
  credenciales (`mongodb://user:pass@...`, etc.) y un patrón genérico de valor
  de encabezado `Authorization`/`x-api-key`/`api-key`/`apikey`. Las claves con
  forma de encabezado (`authorization`, `x-api-key`, `api-key`, `apikey`) se
  enmascaran estructuralmente (solo el valor; se conserva el prefijo del
  esquema, como `Bearer `/`Basic `) en lugar de hacerlo mediante la regex
  genérica de texto.
- El guardarraíl nunca bloquea; solo reescribe (`modifiedPayload` /
  `modifiedResponse`) y anota (`meta.credentialsRedacted`, `meta.count`).

Protección contra regresiones: `tests/unit/credential-masker-guardrail.test.ts`.

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
