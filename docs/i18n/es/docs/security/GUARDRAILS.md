# Guardrails (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fuente de referencia:** `src/lib/guardrails/`
> **Última actualización:** 2026-08-29 — v3.8.51 (la procedencia de la transcripción de Video Bridge es declarada por quien realiza la llamada,
> aún no está verificada por el servidor — aclarado según #11661)

Las barreras de seguridad aplican medidas de seguridad, políticas y transformaciones de contenido en el límite
entre OmniRoute y los proveedores ascendentes. Cada barrera puede inspeccionar (y
opcionalmente rechazar, transformar o anotar) las cargas útiles de las solicitudes (`preCall`) y
las respuestas ascendentes (`postCall`).

El sistema es **fail-open**: si una barrera genera una excepción durante la ejecución, el registro
guarda el error y continúa con la siguiente barrera en lugar de hacer que falle la
solicitud. El bloqueo es una decisión explícita (`block: true`), nunca un accidente.

## Barreras de protección integradas

El registro carga automáticamente seis barreras de protección por orden de prioridad al importarse
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridad | Nombre              | Etapa(s)       | Archivo               |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Los números de prioridad más bajos se ejecutan **primero**.

### Puente de visión (`visionBridge.ts`) — Puente de modalidad PR-1

Intercepta las solicitudes que contienen imágenes y están dirigidas a **modelos sin capacidad de visión**, y redirige toda la solicitud a un modelo con capacidad de visión o sustituye las partes de imagen por descripciones de texto generadas por un modelo de visión configurable antes de la llamada al proveedor. Esto permite que los proveedores de solo texto gestionen de forma transparente cargas útiles multimodales.

Flujo:

1. Omitir si el modelo de destino ya admite visión (a menos que aparezca en la
   lista de puente forzado `isVisionBridgeForcedModel`).
2. Extraer las partes de imagen mediante `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega en el **detector multimedia
   unificado** `detectMediaParts()` de `open-sse/utils/mediaParts.ts`: la
   única fuente de verdad compartida con el filtro de compatibilidad de combo.
   La extracción se limita mediante una lista de permitidos a partes de nivel superior con las formas
   que `replaceImageParts` puede volver a insertar (el contrato extract↔replace): `image_url`
   de OpenAI, `source.type:"base64"` en base64 de Anthropic, URL de Anthropic
   `source.type:"url"` e `input_image` de la API Responses. Las coincidencias
   anidadas y las formas que solo actúan como indicadores son material del filtro de combo y nunca se extraen.
   Omitir si no se encuentra ninguna.
3. Resolver la configuración en tiempo de ejecución mediante `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): las nuevas claves de configuración `modalityBridge*`
   tienen prioridad; las claves heredadas `visionBridge*` permanecen como **mecanismo alternativo durante un ciclo**
   (ventana de reversión). Omitir antes de cualquier recorrido del contenido multimedia cuando el
   puente esté deshabilitado.
4. El selector de modo (`modalityBridgeVisionMode`, consulte la tabla siguiente) decide entre
   redirigir y describir. La redirección devuelve `modifiedPayload` con solo `model`
   sustituido, además de los metadatos `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ruta de descripción: limitar las imágenes a `maxImages`, componer el prompt contextualizado según la tarea,
   consultar la caché de descripciones, llamar al modelo de visión **en paralelo**
   (`Promise.allSettled`) e insertar en su lugar partes de texto `[Imagen N]: <descripción>`.
   Una descripción fallida produce `null` y la parte de imagen original se
   **conserva** (#4012), excepto en la ruta de descripción de combo cuando todas las
   descripciones fallan, en cuyo caso un proveedor ascendente confirmado como carente de visión recibe en su lugar
   un marcador `(no disponible — no hay ningún proveedor con capacidad de visión conectado)` (#8430).
6. Devolver `modifiedPayload` + metadatos (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Predeterminado | Comportamiento                                                                                                                                                                                                                                                                                                                                         |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔              | Heurística heredada, sin cambios (#6640/#7204): los modelos que no son combo/`auto/` se redirigen al mejor modelo de visión, a menos que el modelo original ya tenga credenciales utilizables (en cuyo caso se describe); los destinos combo siempre describen.                                                                                        |
| `describe` |                | Describir siempre: el bloque de redirección se omite por completo; el modelo elegido por el usuario siempre responde.                                                                                                                                                                                                                                  |
| `reroute`  |                | Forzar la redirección: se omite la protección para conservar el modelo con credenciales. La protección de credenciales del **destino** de redirección sigue aplicándose; cuando no existe ningún destino de visión utilizable, la solicitud pasa a la descripción para que las imágenes sin procesar nunca lleguen a un backend de solo texto (#8430). |

Los modos forzados cortocircuitan **antes** de que se ejecute la heurística automática; el comportamiento de `auto`
es idéntico byte por byte al de la barrera de protección anterior a PR-1.

#### Alcance de la clave de API (`visionBridgeKeyScope.ts`)

Cuando la clave de API del llamante restringe `allowedConnections`, los grupos de cuotas
(`allowedQuotas`) o los modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), el puente solo
elige modelos de redirección y descripción que la clave pueda utilizar, en conexiones que la clave pueda
utilizar. Después, la llamada de descripción siempre pasa por el bucle interno de OmniRoute con
el encabezado `x-omniroute-self-loop-key-id`, para que la solicitud de chat receptora
vuelva a aplicar la política de conexiones y modelos de esa clave. `enforceApiKeyPolicy()`
solo admite ese encabezado junto con el bearer del bucle interno, por lo que únicamente puede
restringir el acceso, y se rechaza un id que no pueda resolverse.

Si no se permite ningún modelo de visión para la clave, la ruta de descripción se aparta y
la solicitud pasa sin cambios, con el mismo comportamiento fail-open que una barrera de protección deshabilitada
(metadatos `{ skipped: true, reason: "no_permitted_vision_model" }`).
Las solicitudes sin clave y las claves sin estas restricciones se comportan exactamente igual que
antes.

#### Prompt de descripción contextualizado según la tarea (`modalityBridgeVisionTaskAware`)

Valor predeterminado: **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) añade
el texto del **último mensaje del usuario** (truncado a 500 caracteres) al prompt
base de descripción, orientando la descripción hacia lo que el usuario realmente
solicitó (patrón codex-vision-proxy) y pidiendo al modelo de visión que transcriba
el texto visible. Con la opción desactivada —o sin texto del usuario—, el prompt
base se utiliza sin cambios.

La solicitud propia compatible con OpenAI del bucle de autodescripción
(`callVisionModelSingle()` en `visionBridgeHelpers.ts`) siempre solicita
`image_url.detail: "high"` —de forma incondicional, para cada cliente/proveedor,
sin depender de ninguna señal del cliente—. El muestreo con poco detalle degrada
la precisión del OCR precisamente para la tarea de transcripción de texto que
solicita este prompt, por lo que la propia llamada de descripción siempre pide
un nivel de detalle alto, independientemente del nivel de detalle utilizado por
la solicitud entrante original. Esto solo afecta al cuerpo de la solicitud
interna de descripción; no cambia la forma en que OmniRoute reenvía el
`image_url.detail` propio del cliente en la solicitud principal —ese valor
predeterminado se aplica por separado y solo para clientes OpenCode detectados,
en `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)—. La
rama con formato de conexión de Anthropic del bucle de autodescripción no tiene
ningún campo `detail` y no se ve afectada por ninguno de los dos valores
predeterminados.

#### Límite de salida de la descripción (`modalityBridgeVisionMaxChars`)

| Clave                          | Valor predeterminado | Intervalo       |
| ------------------------------ | -------------------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`                  | `0` o 100–50000 |

`0` (valor predeterminado) significa **sin límite**: la descripción devuelta por
`callVisionModel()` se transmite sin modificaciones, preservando el
comportamiento existente. Cualquier valor del intervalo 100–50000 trunca la
descripción con un sufijo `…` antes de insertarla de nuevo como
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` en
`src/lib/guardrails/visionBridge.ts`). Aumente este valor para tareas de OCR con
muchos detalles en las que el modelo posterior necesite la transcripción
completa; redúzcalo para limitar el uso de tokens con modelos de visión
verbosos. El campo del panel de control se encuentra en el panel Avanzado de la
pestaña Visión (`modality-bridge-max-chars` en
`ModalityBridgeVisionTab.tsx`) y ajusta cualquier valor entre 1 y 99 al mínimo
de 100, mientras deja intacto un `0` explícito: `0` es un valor Zod válido por
sí mismo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), no solo el
valor predeterminado «sin establecer».

#### Caché de descripciones (`modalityBridge/bridgeCache.ts`)

Caché LRU + TTL en memoria para las salidas de descripción, compartida en todo
el proceso. Clave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
con delimitación mediante prefijos de longitud (sin colisiones entre límites de
campos). El componente del modelo es el modelo del puente **configurado**, no el
modelo que realmente respondió: `callVisionModel` puede recurrir internamente a
un modelo alternativo y generar claves por intento fragmentaría la caché. Las
descripciones fallidas nunca se almacenan en caché. Configuración:

| Clave                           | Valor predeterminado | Intervalo |
| ------------------------------- | -------------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`               | —         |
| `modalityBridgeCacheTtlMinutes` | `60`                 | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`                | 10–5000   |

#### Normalización de imágenes remotas (descripción en bucle propio/obtención en base64)

Cuando el puente obtiene por sí mismo una imagen **remota** —la llamada propia
de descripción de Anthropic y la conversión a base64 con formato de conexión de
Claude (`ensureBase64ImagesForClaudeWire`), ambas mediante
`fetchRemoteImageAsDataUri()` en `visionBridgeHelpers.ts`—, el URI de datos
resultante se procesa mediante `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de incorporarlo a la solicitud del
modelo de visión. Las imágenes sobredimensionadas se reducen a un **lado largo
de 2048px** (igualando el límite de redimensionamiento que OpenAI/Anthropic ya
aplican en el servidor), lo que reduce los bytes de carga y la latencia sin
cambiar lo que ve el modelo de visión. El redimensionamiento utiliza `sharp`,
cargado mediante importación dinámica: en una plataforma donde su binario
nativo no pueda cargarse, `normalizeDataUri()` **nunca lanza una excepción**;
en su lugar, transmite los bytes originales sin cambios, de modo que la ruta de
descripción/conversión a base64 siempre sigue funcionando. Los bytes que no
correspondan a una imagen (una obtención que no haya devuelto una imagen
decodificable) también se transmiten sin cambios. Esta normalización se limita
a las imágenes que el puente obtiene para su propia llamada interna; nunca se
aplica a la carga útil sin procesar del cliente, de acuerdo con el principio de
mutación exclusivamente voluntaria (Regla estricta n.º 20).

#### Esquema de configuración + migración

Las nuevas claves `modalityBridge*` se validan con Zod en
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, el trío
`modalityBridgeCache*` y el grupo `modalityBridgeAudio*` utilizado por Audio
Bridge. La migración `141_modality_bridge_settings.sql` copia los valores
heredados existentes de `visionBridge*` a las nuevas claves correspondientes
(es idempotente y nunca sobrescribe un valor `modalityBridge*` establecido por
un operador); las claves heredadas siguen aceptándose como alternativa de
lectura durante un ciclo de versiones.

#### Encabezado de transparencia + estadísticas

Las respuestas transformadas mediante descripción incluyen
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construido por `buildModalityBridgeHeader()` en
`modalityBridge/bridgeStats.ts` y añadido por
`withModalityBridgeHeader()` en `src/sse/handlers/chatHelpers.ts`).
Las solicitudes redirigidas **no** reciben ningún encabezado: la carga útil no
se modificó y el cambio de modelo ya es visible en el campo `model` del cuerpo
de la respuesta.

`GET /api/modality-bridge/stats` (autenticación de administración, mismo nivel que
`GET /api/settings`) devuelve los contadores en memoria por modalidad
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` y
`video`. `averageLatencyMs` usa `latencySamples`, no todos los intentos, como
denominador; una operación sin medición de tiempo no genera artificialmente una
muestra de cero milisegundos. `bridged` se mantiene como alias retrocompatible
de las conversiones correctas; los intentos fallidos no lo incrementan.
Los contadores se restablecen al reiniciar el proceso por diseño
(telemetría, no contabilidad).

#### Configuración del panel

La página específica del panel es
`/dashboard/settings/modality-bridge`. Sus pestañas `Vision`, `Audio` y
`Video`, direccionables mediante URL, conservan los parámetros de consulta al
cambiar el valor de `tab`. La pestaña Vision permite configurar la activación,
el modo, la selección del modelo (incluido el valor predeterminado automático),
las instrucciones adaptadas a la tarea, los límites avanzados de tiempo de
espera, imagen, longitud de descripción y caché, los contadores de tiempo de
ejecución y una solicitud de muestra protegida. La pestaña Audio también está
operativa: permite configurar la activación, un selector de modelos exclusivos
para STT con Auto, los límites de tiempo de espera y duración máxima del clip,
los contadores de audio y una prueba de muestra `input_audio`. La pestaña Video
es funcional: informa del estado de FFmpeg/ffprobe en tiempo de ejecución —uno
de cuatro estados explícitos de la interfaz de usuario (`unknown` mientras el
sondeo está en curso o no se pudo completar, `restricted` en un host del panel
que no sea de bucle invertido, donde el sondeo se omite del lado del cliente,
`unavailable` una vez realizado el sondeo y confirmada su ausencia, o
`available` con las versiones de FFmpeg/ffprobe)—, conserva los límites de
activación, modelo, fotogramas, vídeo y tiempo de espera, filtra el selector de
modelos para mostrar aquellos compatibles con visión y expone los contadores de
vídeo.

La antigua tarjeta Vision Bridge de la configuración de IA es un enlace de
compatibilidad a la nueva página; ya no mantiene una segunda copia del
formulario. Media Providers también enlaza los flujos de trabajo Image-to-Text
y Speech-to-Text con las pestañas correspondientes de Modality Bridge sin
eliminar el entorno de pruebas existente de Speech-to-Text.

**Omisión de admisión para el bucle propio:** cuando la llamada de descripción
se enruta mediante el bucle propio `/v1` de OmniRoute (modelo de proveedor no
estándar), la solicitud secundaria envía
`x-omniroute-admission-bypass: internal` y se autentica con la credencial de
bucle propio resuelta: el marcador local `sk_omniroute` en modo local, o la clave
de entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada por el operador
(#1350), para que las implementaciones con `REQUIRE_API_KEY=true` puedan seguir
ejecutando la llamada de descripción. La omisión solo se acepta para esas
credenciales exactas, por lo que los clientes externos no pueden usar el
encabezado para eludir la admisión.

Los valores predeterminados heredados se encuentran en
`src/shared/constants/visionBridgeDefaults.ts`; los nuevos valores
predeterminados de modo, adaptación a la tarea y caché, así como el solucionador
de configuración, se encuentran en
`src/shared/constants/modalityBridgeDefaults.ts`. El mecanismo de protección
expone una opción de constructor `deps` para que las pruebas puedan inyectar
implementaciones simuladas de `getSettings` y `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta las solicitudes de chat que contienen audio antes de que lleguen a un
destino del que no se sabe si acepta entradas de audio. Nunca redirige la
solicitud de chat: las partes de audio se transcriben mediante el endpoint
multipart existente compatible con OpenAI, y el modelo de chat seleccionado
continúa con las transcripciones de texto.

Flujo:

1. Resuelve `supportsAudio` mediante `getResolvedModelCapabilities()`. Tienen
   prioridad los metadatos explícitos del registro de proveedores, seguidos de
   los metadatos estáticos del modelo y, por último, de `modalities_input`
   sincronizado. Una lista de entradas declarada sin `audio` da como resultado
   `false`; si no hay pruebas sobre la capacidad, el resultado sigue siendo
   `null`. Tanto `false` como `null` activan el puente conservador, mientras que
   `true` lo omite.
2. Resuelve la configuración `modalityBridgeAudio*` y extrae las partes de audio
   de nivel superior que pueden sustituirse en cada mensaje mediante el detector
   compartido `detectMediaParts()`. Los formatos de transmisión admitidos son
   `input_audio` y `audio_url` de OpenAI, además de
   `source.media_type: "audio/*"`. El audio anidado se detecta para el
   enrutamiento, pero la ruta de sustitución no lo elimina. El trabajo está
   limitado por `modalityBridgeAudioMaxClips`; las partes posteriores permanecen
   intactas.
3. Respeta un `provider/model` configurado o permite que
   `selectAudioBridgeModel()` recorra `AUDIO_TRANSCRIPTION_PROVIDERS` en el orden
   estable del catálogo y seleccione el primer modelo que tenga una credencial
   de proveedor activa y utilizable.
4. `callAudioTranscription()` convierte el audio base64/URI de datos en un
   `file` multipart, o descarga un `audio_url` remoto mediante la protección
   pública de salida con fijación de DNS y un límite de 25 MB. A continuación,
   envía mediante POST el archivo y el modelo seleccionado al bucle propio local
   `/v1/audio/transcriptions`, autenticado con `resolveSelfLoopBearer()`. La ruta
   de transcripción existente realiza la búsqueda normal de credenciales, la
   gestión de periodos de espera y límites de frecuencia, y el envío al
   proveedor.
5. Las llamadas correctas sustituyen sus partes por
   `[Audio N]: <transcript>`. Las llamadas se ejecutan con
   `Promise.allSettled`: un fallo individual conserva la parte de audio original
   correspondiente (contrato #4012). Si todas las llamadas fallan y se ha
   demostrado que el destino tiene `supportsAudio === false`, las partes pasan
   a ser `[Audio N]: (unavailable — no STT provider connected)` (contrato
   #8430). Para un destino desconocido (`null`), si todas fallan, la solicitud
   permanece intacta. Un destino que se sabe que solo admite texto y que no
   dispone de una credencial STT utilizable recibe el mismo marcador explícito
   sin realizar una llamada de red.

Las transcripciones correctas usan la caché LRU/TTL de Modality Bridge compartida
por todo el proceso. La clave combina la referencia de audio, la etiqueta estable
de operación `audio-transcription` y el modelo STT seleccionado; los fallos nunca
se almacenan en caché. Los intentos de audio actualizan los contadores compartidos
`bridged`, `cacheHits`, `failures` y `lastUsedAt`. Las respuestas transformadas
incluyen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; las
solicitudes intactas no reciben un segmento de Audio Bridge.

La configuración en tiempo de ejecución se almacena en la base de datos y se
valida mediante Zod:

| Clave                         | Predeterminado | Rango            |
| ----------------------------- | -------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`         | —                |
| `modalityBridgeAudioModel`    | `""`           | Auto o ID de STT |
| `modalityBridgeAudioTimeout`  | `60000`        | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`            | 1–10             |

La caché compartida sigue estando controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` y `modalityBridgeCacheMaxEntries`.

### Puente de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta las partes de vídeo de nivel superior en `messages` de Chat Completions
y en `input` de la API Responses antes de llamar a un destino sin compatibilidad
nativa conocida con vídeo. Las formas compatibles son `input_video`, `video_url`,
`video_source`, las URL HTTPS y los URI de datos `data:video/*;base64,...`. Los
nombres de archivo simples incluidos en el texto no se tratan como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) se encarga del recorrido de la
solicitud, la comprobación de capacidades/políticas, la agregación por solicitud
y la carga útil de la respuesta. El trabajo por vídeo —la adquisición, la caché
del resultado completo, la descripción de una secuencia de fotogramas (que
combina cualquier transcripción de audio declarada por el invocador) y las
métricas, cancelación y limpieza de cada intento— queda oculto tras
`processVideoPart` en `videoBridgePipeline.ts`, al que se llama una vez por cada
parte de vídeo dentro del bucle de `preCall`. Ese módulo también define los
límites de puerto explícitos `VideoMediaBrokerPort` (adquisición de bytes y
extracción de fotogramas muestreados), `VideoAudioTranscriptionPort` (combinación
de una transcripción de audio declarada por el invocador con los subtítulos
muestreados) y `VideoDrilldownPort` (el límite de persistencia para el análisis
detallado de fotogramas; todavía no está conectado a `processVideoPart`: hoy en
día, solo la ruta independiente `/api/modality-bridge/video/drilldown` escribe
entradas de análisis detallado).

La ruta pública de solicitudes `/v1` nunca importa ni invoca un subproceso. Los
vídeos remotos se descargan con un límite de 50 MiB; los vídeos base64 en línea
tienen un límite conservador de 36 MiB decodificados por vídeo, de modo que la
envoltura del modelo, los mensajes y el enmarcado puedan permanecer dentro del
límite público de admisión de solicitudes JSON de 50 MiB. La longitud en línea
y las estimaciones del tamaño decodificado se comprueban antes de asignar
memoria. Se requiere HTTPS en la URL remota inicial y en cada redirección,
utilizando la protección de salida existente, restringida a destinos públicos,
con fijación de DNS. A continuación, los bytes cruzan el límite interno exacto
del bróker `POST /api/modality-bridge/video/extract`. Esa ruta es tanto
`LOCAL_ONLY` como `SPAWN_CAPABLE`, solo acepta solicitudes autenticadas por
proceso procedentes de un bucle invertido de confianza y nunca acepta una URL,
una ruta del sistema de archivos, un ejecutable ni una lista de argumentos. La
canalización del límite de tamaño del cuerpo de la API y el lector incremental
del cuerpo del controlador aplican de forma independiente un límite de entrada
de 50 MiB para el bróker. Su cola acotada ejecuta una extracción a la vez,
permite cuatro trabajos pendientes y limita la entrada pendiente a 100 MiB.

Dentro del bróker, `ffprobe` lee un archivo local privado; la lista fija de
formatos permitidos excluye los formatos de listas de reproducción y
manifiestos. Para los contenedores permitidos de la familia MOV, las referencias
externas a datos MOV permanecen deshabilitadas de forma predeterminada y el
comando fijo no las habilita. Tanto `ffprobe` como `ffmpeg` utilizan la lista
blanca de protocolos limitada exclusivamente a `file`, un hilo, matrices de
argumentos fijas, ningún shell y ejecutables resueltos desde `PATH`. Los flujos
de imágenes de portada adjuntas no son candidatos reproducibles. Todos los
flujos reproducibles deben satisfacer los límites, y se da preferencia a un
flujo predeterminado explícito antes de recurrir de forma determinista al de
menor índice. Los vídeos están limitados a 600 segundos, 8.192 píxeles por
dimensión y 33.554.432 píxeles de origen. FFmpeg muestrea entre 1 y 16
fotogramas JPEG de puntos medios, reduce el borde largo a un máximo de 1.024
píxeles sin ampliar las entradas más pequeñas y nunca recibe una URL. El
muestreo es `uniform` de forma predeterminada. Las políticas opcionales
`scene_aware` y `segment_aware`, esta última experimental, realizan una pasada
fija adicional de FFmpeg sobre el flujo local ya validado, seleccionan marcas de
tiempo de escena `showinfo` acotadas y recurren de forma determinista a los
mismos puntos medios uniformes si falla el detector, se agota el tiempo, la
salida está mal formada o el conjunto de candidatos está vacío. El modo
orientado a segmentos asigna muestras de puntos medios proporcionalmente a los
intervalos de escena validados; la evidencia orientada a segmentos y el
comportamiento alternativo se detallan a continuación. El límite estricto de 16
fotogramas se aplica después de la selección en todas las políticas. Cuando una
solicitud orientada a escenas solo dispone de un fotograma, utiliza el punto
medio uniforme del vídeo completo activo o de la ventana de enfoque e informa
`policyEffective: uniform`: un único fotograma de escena seleccionado no puede
preservar ambos extremos temporales. El invocador puede proporcionar
opcionalmente una ventana de enfoque finita (`start`/`end` en segundos); los
límites se restringen a la duración del contenido multimedia, se rechazan las
ventanas invertidas o no finitas y todas las políticas de muestreo se aplican
únicamente dentro del intervalo normalizado. La ventana resultante se incluye
en los metadatos de muestreo y en el prefijo de descripción no confiable para
que los modelos posteriores puedan distinguir un fragmento enfocado de la línea
temporal completa.

El enfoque semántico de los subtítulos es una configuración independiente y
explícita. El modo de análisis predeterminado `full` conserva el prompt de
fotogramas existente y nunca reenvía el texto de la solicitud al modelo de
subtítulos. En el modo `focused`, el puente lee únicamente el último
`text`/`input_text` no vacío creado por el usuario dentro del mismo contenedor
de Chat o Responses, lo normaliza a NFC, contrae los caracteres de control y
los espacios en blanco y lo limita a 500 puntos de código Unicode. Un resultado
vacío recurre al prompt `full` exacto. Una indicación utilizable se serializa
como JSON en un bloque dedicado de contexto de usuario no confiable y solo puede
priorizar detalles observables; no puede anular la advertencia independiente de
no seguir las instrucciones visibles o audibles en el contenido multimedia. El
enfoque textual nunca infiere `start`/`end` ni modifica el muestreador temporal.

#### Evidencia estructural de segmentos de FU-07

`segment_aware` utiliza una única pasada acotada de preanálisis sobre el flujo
de vídeo local ya validado. La cadena fija de filtros primero reduce la escala a
un ancho máximo de 320 píxeles, detecta cambios de escena e intervalos congelados
y, a continuación, muestrea 1 fotograma por segundo para medir el desenfoque, la
luma media y la información espacial/temporal. La pasada está limitada a 600
muestras estructurales, un subproceso de FFmpeg/filtro, las mismas listas de
permitidos de contenedores y del protocolo exclusivo `file`, un límite de 1 MiB
para la salida del proceso y un máximo de 30 segundos dentro de la cancelación o
fecha límite compartida del bróker. Nunca acepta de la solicitud un comando,
filtro, ruta ni URL.

Los valores estructurales son evidencias de muestreo deterministas, no una
comprensión semántica del vídeo. No infieren sujetos, acciones, subtítulos,
habla ni la intención del usuario. Los límites de escenas y congelaciones forman
segmentos; la cobertura de congelaciones, el desenfoque, la exposición, el
detalle espacial y el cambio temporal solo influyen en cómo se distribuye el
presupuesto existente de 1–16 fotogramas. Un segmento completamente congelado
está limitado a un fotograma, mientras que los segmentos no congelados compiten
por el presupuesto restante. Cuando hay más límites que fotogramas, se conserva
una cobertura uniforme de la línea temporal para que los cortes rápidos iniciales
no puedan ocultar un segmento final largo. Los límites de escena situados dentro
de la resolución de análisis de 1 segundo respecto a un límite de congelación se
fusionan.

La ausencia de filtros, las evidencias mal formadas o vacías, un error del
detector o el tiempo de espera agotado del preanálisis acotado permiten continuar
con la política exacta y uniforme de puntos medios. Una cancelación del llamador
o la fecha límite del bróker no permiten continuar: terminan el subproceso en
curso, impiden la extracción posterior de fotogramas y el árbol temporal privado
se elimina en `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera recursos de prueba deterministas
con FFmpeg real para medir el ahorro en llamadas de generación de subtítulos
posterior a la deduplicación, la asignación de presupuesto para movimiento denso,
las evidencias de desenfoque/exposición/SI-TI, los cortes rápidos con una cola
larga y los falsos positivos por fundidos graduales. Registra el tiempo real del
preanálisis y, cuando `/usr/bin/time` está disponible, la CPU del proceso hijo y
el pico de RSS. Sus comprobaciones de calidad son únicamente oráculos
estructurales. La calidad del modelo real de subtítulos permanece en `HOLD`
porque este banco de pruebas no dispone de un endpoint autorizado ni de un juez
congelado. Los ahorros monetarios también permanecen en `HOLD`, salvo que
`--caption-cost-per-call-usd` proporcione una estimación positiva explícita del
coste por llamada; el script nunca inventa ninguno de los dos resultados.

Cada fotograma está limitado a 4 MiB, el conjunto de todos los fotogramas sin
procesar a 23 MiB y la respuesta serializada del bróker a 32 MiB. Un directorio
temporal privado se elimina en `finally`. OmniRoute no incluye FFmpeg ni acepta
una ruta de ejecutable personalizada. Antes de generar subtítulos, el puente
aplica una pasada conservadora de deduplicación visual: cada JPEG se reduce a un
búfer de escala de grises de 16×16 y se compara únicamente con el último
fotograma conservado. Para un presupuesto solicitado de subtítulos superior a
un fotograma, la extracción proporciona un conjunto acotado de candidatos de
hasta el doble de dicho presupuesto y nunca más de 16 fotogramas. El límite
solicitado solo se aplica después de la deduplicación; al realizar la reducción
final, se conservan el primer y el último candidato seleccionados cuando el
presupuesto es de al menos dos. La política versionada
`grayscale-16x16-mean-cells-v2` utiliza el mayor valor entre la diferencia media
de luma y la proporción de celdas de la miniatura cuya diferencia normalizada es
de al menos 0.05. El umbral de duplicados es la constante 0.04, elegida por su
previsibilidad en lugar de exponerla como una opción de configuración en tiempo
de ejecución. Esta señal secundaria de alto contraste conserva los movimientos
pequeños y los cambios de texto visible que una comparación basada solo en la
media puede ocultar. Los errores del comparador o del decodificador permiten
continuar y conservan la cobertura. Los metadatos de salida distinguen entre los
candidatos extraídos, los fotogramas utilizados correctamente y los duplicados
visuales descartados.

Una parte de vídeo marcada explícitamente puede solicitar una hoja de contactos
con marcas de tiempo. El puente crea una cuadrícula JPEG de 16 fotogramas como
máximo y hasta 4 columnas. Cada celda de 512 píxeles incrusta la marca de tiempo
de su origen en una banda inferior de alto contraste, mientras que las mismas
marcas de tiempo se conservan en los metadatos textuales para su asociación y
auditoría posteriores. El JPEG completo sigue estando limitado a 32 MiB. Si
`sharp` no puede decodificar o componer la cuadrícula, el puente recurre a los
fotogramas JPEG individuales; una cancelación del cliente continúa propagándose
a través de la operación de la hoja.

Las evidencias para la promoción se mantienen deliberadamente separadas del
microbenchmark sintético de composición.
`scripts/perf/video-bridge-contact-sheet-eval.ts` define un banco de pruebas A/B
con esquema versionado para modelos de visión reales compatibles con OpenAI.
Mide los tokens indicados por el proveedor, la latencia real de extremo a extremo
(incluida la composición de la hoja), el número de llamadas al modelo y la
retención de hechos definida en el manifiesto. Las respuestas sin procesar del
modelo no se escriben en el informe; solo se conservan los resúmenes SHA-256 y
los ID de los hechos coincidentes. El banco de pruebas no realiza ninguna
llamada de red ni a un modelo de pago, salvo que se especifique `--execute-real`
y estén configurados `--model`, `OMNIROUTE_BASE_URL` y `OMNIROUTE_API_KEY`. Sin
esa ejecución real explícita, su veredicto legible por máquina permanece en
`HOLD`; las mediciones sintéticas del tamaño de la carga útil o del número de
llamadas no constituyen por sí solas evidencias para la promoción.

Los llamadores pueden adjuntar un array opcional `transcript.cues` a una parte
de vídeo compatible cuando ya disponen de texto alineado. Cada entrada debe
incluir `text`, un intervalo finito `start`/`end` dentro de la duración detectada
y un `source` incluido en la lista de permitidos (`client`, `embedded` o
`audio-bridge`); `confidence` tiene como valor predeterminado `1` y debe
mantenerse entre `0` y `1`. Las entradas que sean duplicados exactos se fusionan.
OmniRoute nunca inicia una transcripción a partir de estos metadatos: las
entradas validadas se copian en el resultado descrito junto con su origen,
confianza e intervalo, y se muestran como observaciones no confiables junto a
los subtítulos de los fotogramas. El texto no válido, fuera de rango o sin
procedencia se rechaza en lugar de mezclarse con el flujo de subtítulos. Ambos
canales de transcripción del cuerpo de la solicitud normalizan la procedencia
proporcionada a `client`, incluidas las etiquetas autodeclaradas `embedded` o
`audio-bridge`. Solo un adaptador controlado por el servidor puede asignar esas
etiquetas confiables mediante el argumento exclusivo del código `trustedSource`;
un campo JSON de la solicitud no puede acceder a dicho argumento. El texto de
la transcripción sigue siendo contenido no confiable derivado del medio,
independientemente de su procedencia, y nunca debe determinar la autorización.

Un llamador avanzado puede proporcionar una pista `audioTranscript` para el mismo vídeo;
se trata como texto proporcionado por el cliente, no como prueba de una transcripción del servidor.
El punto de fusión ejecuta las observaciones visuales y de audio con
un único plazo y una única señal de cancelación, las ordena en una línea temporal común, combina
los duplicados exactos e informa de un resultado parcial cuando solo una de las partes tiene éxito.
Un `audioTranscript` no válido se degrada a ese resultado parcial: se conserva la
descripción visual y la rama de audio registra un código de error saneado,
en lugar de hacer que falle todo el vídeo. La disponibilidad por rama, el indicador de resultado parcial
y los códigos de error saneados se conservan en el resultado descrito, en los
metadatos de las barreras de seguridad (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), en los metadatos de la caché de resultados y en los contadores de
fusión del puente. La ruta predeterminada de Video Bridge no invoca la conversión de voz a texto
ni descarga una segunda copia del contenido multimedia; sin esa pista explícita, permanece
limitada al vídeo.

**Retención de transcripciones (#12150 P1).** Esto se aplica automáticamente siempre que
Video Bridge (que es opcional) renderiza una indicación de transcripción; no existe un indicador
de retención independiente. Cuando una solicitud renderiza cualquier indicación de transcripción (un
`transcript` declarado por el llamador o un `audioTranscript` fusionado), la barrera de seguridad la marca como
`videoBridgeObserved` y genera una copia redactada de la descripción del vídeo:
un renderizado idéntico en el que el cuerpo de texto libre de cada indicación se sustituye por
`[redacted-video-transcript]`, creado sustituyendo el campo estructurado de la indicación
antes de ensamblar la cadena (nunca analizando el texto aplanado, de modo que ningún contenido
de la indicación —adversario u ordinario, incluidos los cuerpos que contienen `]`, como
`[inaudible]`/`[music]`— pueda sobrevivir). El cuerpo de la solicitud persistido en el registro de llamadas sustituye
cada parte de texto derivada del vídeo por esa copia redactada, estableciendo la correspondencia por igualdad
de contenido; el ancla `fullText` se vuelve a leer de la carga útil finalizada de la barrera de seguridad
previa a la llamada, de modo que la correspondencia sigue teniendo éxito después de que las barreras de seguridad posteriores de la cadena
(los enmascaradores de PII y credenciales, con prioridades 10/95) reescriban el texto de la descripción
in situ y después de que la inyección del mensaje del sistema, la transferencia y la memoria reestructuren
la matriz de mensajes. El cuerpo enviado al modelo no cambia. Una solicitud observada tampoco
rellena ninguna Memory duradera (se omite la extracción derivada tanto de la solicitud como de la respuesta),
por lo que la propia respuesta del modelo no puede copiar texto de la transcripción en Memory.

**Campos de vídeo sin procesar (#12430).** Cuando el puente está habilitado y la compatibilidad nativa con vídeo es desconocida o inexistente, los campos `transcript`/`audioTranscript` definidos también activan `videoBridgeObserved`, incluso después de un error de descripción o de un límite `maxVideos`. `null` y las cadenas vacías cuentan; los campos ausentes y los metadatos que no son de vídeo, no. Las copias retenidas redactan estos campos u omiten la solicitud, y se eluden las cachés y Memory.

En esas rutas de reserva, las indicaciones válidas del llamador se convierten en partes
`text`/`input_text` compatibles, en lugar de campos de proveedor no estándar. Ambas pistas
proporcionadas en la solicitud siguen siendo observaciones `client` no fiables, con una advertencia explícita de que el vídeo
no se describió y de que las marcas de tiempo no se verificaron con respecto al contenido multimedia. Los límites existentes
de 256 indicaciones/64 KiB en total y por indicación se aplican conjuntamente a las dos pistas;
las marcas de tiempo deben ajustarse al límite máximo de 600 segundos del intermediario y a cualquier ventana de
enfoque proporcionada. Las pistas no válidas se descartan y no se reenvían como texto arbitrario; una pista
hermana válida aún puede utilizarse, salvo que se supere su límite combinado. Los campos nulos o vacíos
no añaden texto. Esta ruta de reserva no incorpora ninguna descarga del contenido multimedia ni ninguna transcripción.
Los campos de extensión de transcripción se eliminan del contenedor de vídeo de reserva y de sus
objetos `video_url`/`source`. La lista de elementos permitidos en la interfaz de OpenAI sigue siendo estricta; los contenedores de vídeo
con compatibilidad nativa desconocida siguen estando disponibles y los destinos conocidos que solo admiten texto conservan marcadores seguros.
Las copias de redacción estructurada protegen el texto de transcripción añadido, mientras que la
solicitud original propiedad del llamador permanece sin cambios. Los destinos con compatibilidad nativa y
los puentes deshabilitados conservan su comportamiento de omisión actual.

Las copias retenidas adicionales utilizan la misma señal de solicitud observada. La instantánea
sin procesar de la solicitud del cliente previa a la barrera de seguridad, la solicitud pendiente en memoria y el registro
de solicitudes rechazadas anticipadamente sustituyen estructuralmente los campos de transcripción en las partes de vídeo;
los mensajes de cadena sintetizados por las etapas de la canalización y la transferencia de contexto se redactan
en el destino del cuerpo de la solicitud persistida. El marcador `video_content_removed` persistido
hace que la continuación mediante `previous_response_id` falle de forma cerrada, en lugar de reconstruir
texto que se descartó intencionadamente. Si una solicitud observada pierde su
copia de redacción por parte antes del registro, o si incluso una de varias copias de vídeo
no logra encontrar una coincidencia después de mutaciones posteriores de la solicitud, el cuerpo retenido de la solicitud se
omite por completo, en lugar de conservar una transcripción parcialmente redactada.

Para una solicitud observada, una respuesta del modelo podría citar cualquier fragmento de la
transcripción sin un límite estructurado de indicación. Por lo tanto, su `responseBody` persistido en el registro
de llamadas se sustituye por un marcador de omisión; el artefacto detallado de la
canalización (que puede incluir cuerpos del proveedor o del cliente y fragmentos del flujo)
no se conserva. Las cachés semánticas, de idempotencia y de reproducción del razonamiento
omiten las lecturas y escrituras para esa solicitud. La solicitud al proveedor y la respuesta
visible para el cliente permanecen sin cambios. Los bytes iniciales de mantenimiento de conexión se vacían del búfer
temporal cuando se omite el artefacto detallado. La advertencia de EventStream con formato incorrecto
de Kiro informa únicamente del recuento de bytes de la carga útil, nunca de su contenido ni del error
sin procesar del analizador JSON.
Esto no afirma que se hayan auditado todos los diagnósticos no relacionados de proveedores o complementos;
la revisión más amplia de los destinos de retención se supervisa en #11658.

El ciclo de vida interno de `/api/modality-bridge/video/drilldown` es un sustrato de caché independiente, autenticado mediante token y loopback. Cada operación también requiere un ID principal opaco canónico. Antes de habilitar un consumidor de producción, este debe derivar dicho ID del tenant autenticado y nunca debe reenviar un valor seleccionado por el cliente. Las claves de caché vinculan ese principal con los ID canónicos de sesión y referencia de vídeo, almacenan únicamente sus claves derivadas mediante SHA-256 y restringen tanto las lecturas como la eliminación al mismo principal. La caché almacena como máximo 16 fotogramas JPEG derivados por entrada, los hace caducar después de diez minutos y admite lecturas acotadas mediante `start`/`end` o la eliminación explícita de sesiones.

Cada principal está limitado a 16 entradas y 64 MiB de datos JPEG canónicos. Esos límites son independientes del máximo global de 64 entradas/256 MiB: la presión de cuota de un principal desaloja únicamente las entradas usadas menos recientemente de ese principal antes de considerar el desalojo LRU global. Las entradas caducadas se eliminan de la contabilidad tanto del principal como global durante la actividad de la caché, mientras que la cancelación y los errores de validación no confirman un reemplazo parcial.

La caché rechaza Base64 no canónico, relleno excesivo, contenido que no sea JPEG, archivos JPEG malformados o truncados y archivos JPEG que produzcan una advertencia durante una decodificación acotada de la imagen completa mediante `sharp`. Vuelve a codificar cada imagen aceptada como un JPEG canónico, obtiene la anchura y la altura de los bytes decodificados en lugar de confiar en los campos proporcionados por el consumidor y descarta cualquier byte políglota final en vez de conservarlo. Solo el búfer comprimido canónico acotado se contabiliza en ambas cuotas. El límite de la transferencia JSON incluye la sobrecarga de Base64 correspondiente al límite máximo de entrada decodificada de 32 MiB. Cada derivación almacenada registra su formato/resolución JPEG validado, la política de muestreo, la versión de derivación, la hora de creación, el hash de contenido calculado por el servidor y la referencia principal con hash, junto con el hash de contenido principal proporcionado por el consumidor de confianza. La cancelación se comprueba entre las fases asíncronas de decodificación y hash antes de la confirmación atómica en la caché.

Este tramo todavía no conecta un productor de producción con la ruta ni proporciona selección de variantes de múltiples resoluciones. Por tanto, la ruta de solicitud transparente de Video Bridge no incurre en trabajo adicional, mientras que la derivación del principal vinculada al tenant y el ciclo de vida completo de múltiples resoluciones de FU-08 siguen siendo tareas de seguimiento explícitas, en lugar de documentarse como comportamiento completo.

Los fotogramas se subtitulan secuencialmente con el modelo de vídeo configurado. Una anulación de vídeo vacía hereda la configuración de Vision; si ambas están vacías, el enrutador automático de Vision selecciona el modelo efectivo compatible con visión. Los subtítulos correctos reemplazan la parte original con un prefijo estable `[Video description:` que también marca el texto como una observación no confiable derivada de contenido multimedia e indica a los modelos posteriores que no sigan las instrucciones encontradas en dicho contenido. Las claves de caché de subtítulos de fotogramas incluyen los bytes JPEG, el prompt, la marca de tiempo y el modelo efectivo; solo se almacenan en caché los subtítulos generados correctamente. Las entradas de caché conservan el modelo productor que realmente tuvo éxito, incluido un modelo alternativo; el puente informa `mixed` cuando distintos fotogramas fueron producidos por modelos diferentes. Un acierto de caché reutiliza esa identidad del productor en vez de volver a etiquetarla como el plan de enrutamiento solicitado. La caché de resultados del vídeo completo usa como clave todas las entradas que modifican el resultado: el prompt, el modelo efectivo, la política de muestreo, el número de fotogramas, el modo de análisis semántico, la huella SHA-256 de la indicación de enfoque normalizada, la ventana de enfoque, `transcript`, `audioTranscript` y el indicador de hoja de contactos; por tanto, modificar cualquiera de esas dimensiones produce un fallo de caché, nunca una reutilización de datos obsoletos. La versión de la política de deduplicación visual, el umbral y el número acotado de fotogramas candidatos también se incluyen explícitamente en la clave y los metadatos de la caché de resultados; por tanto, un cambio de política no puede reutilizar una descripción obsoleta del vídeo completo. Los metadatos v4 de la caché de resultados conservan el modo y la huella, pero nunca la tarea sin procesar del usuario. Los metadatos de las medidas de protección informan tanto del modo de análisis solicitado como del efectivo; un modo `focused` solicitado sin texto de usuario utilizable se notifica como efectivamente `full`.

La medida de protección extrae todas las partes de vídeo compatibles, pero no describe más de `modalityBridgeVideoMaxVideos`. Para un destino que se haya demostrado que tiene `supportsVideo === false`, los vídeos fallidos y los que superen el límite se convierten en marcadores de texto seguros explícitos, de modo que no sobreviva ningún vídeo sin procesar. Cuando se desconoce la capacidad, esas partes conservan su contenedor de vídeo; cualquier transcripción alternativa se somete a la conversión de texto acotada descrita anteriormente. Los destinos con `supportsVideo === true` omiten el puente. La señal de cancelación de la solicitud del cliente se propaga a través de la descarga, la cola del bróker, los subprocesos y las llamadas de subtitulado; las cancelaciones detienen el procesamiento entre vídeos y nunca permiten el paso de contenido multimedia sin procesar como mecanismo de tolerancia a fallos.

La configuración en tiempo de ejecución está respaldada por la base de datos y validada mediante Zod:

| Clave                               | Valor predeterminado | Rango / comportamiento                                                                                  |
| ----------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`              | Entorno de ejecución opcional, de activación voluntaria                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`             | `full` conserva subtítulos genéricos; `focused` usa contexto limitado y no confiable del último usuario |
| `modalityBridgeVideoModel`          | `""`                 | Hereda el modelo de Vision Bridge                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`                  | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`          | `uniform`, `scene_aware` o `segment_aware` proporcional; si falla el detector, se recurre a `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`                  | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`             | 1000–120000 ms                                                                                          |

Los valores heredados persistidos del tiempo de espera de Video superiores a 120 segundos se limitan al
plazo máximo del intermediario; se rechazan las nuevas escrituras de configuración que superen ese límite.
`GET /api/modality-bridge/video/runtime` exige una procedencia de bucle invertido
local confiable y sellada antes de la autenticación o del sondeo del entorno de ejecución y, después, exige
autenticación de administración. Solo devuelve `available`, las versiones saneadas de FFmpeg/ffprobe y un motivo
fijo cuando el entorno de ejecución no está disponible. El endpoint interno de extracción no es
una API pública de carga: la saturación de la cola devuelve `503` junto con `Retry-After`, una
desconexión del solicitante devuelve `499` y el plazo fijo del intermediario devuelve `504`. Las respuestas convertidas añaden
`video->text;model=<visionModel>;parts=<videos>` al encabezado central
`x-omniroute-modality-bridge` sin eliminar los segmentos de Vision o Audio.

### Enmascarador de PII (`piiMasker.ts`)

Se ejecuta en **ambas** etapas.

- **`preCall`** clona la carga útil, recorre `system`, `messages`, `input` y
  `prompt` (incluidos los elementos que son cadenas simples) y aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) a los campos de cadena `content`/`text`. Cuando
  `PII_REDACTION_ENABLED=true`, la PII detectada se oculta en la carga útil
  saliente. Esto es independiente de `INPUT_SANITIZER_MODE` (que solo controla
  la política de inyección de prompts). Cuando la ocultación está desactivada, la llamada registra
  los recuentos de detección sin reescribir el contenido.
- **`postCall`** realiza una clonación profunda de la respuesta y ejecuta `sanitizePIIResponse()`, además
  del enmascarador para la estructura de Responses API (`maskResponsesOutput`, que abarca
  `output_text` y `output[].content[].text`). Si se produce alguna ocultación, la
  respuesta modificada reemplaza a la original.

La medida de protección nunca bloquea; solo añade anotaciones (`meta.detections`,
`meta.redacted`) o reescribe.

#### Selección por tipo, patrones personalizados y contadores de detección

**Panel → Configuración → Seguridad → Enmascaramiento de PII** permite elegir _qué_ se enmascara. No
activa el enmascaramiento: eso sigue dependiendo de `PII_REDACTION_ENABLED` (solicitud) y
`PII_RESPONSE_SANITIZATION` (respuesta + SSE), ambos desactivados de forma predeterminada.

- **Selección por tipo** — los identificadores integrados se enumeran en
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Si no se establece, se incluyen todos los
  tipos (el comportamiento anterior a la existencia de esta configuración). El patrón
  `ssn_us` del motor de solicitudes se asigna a `ssn`. Las plantillas (Mínima, Estándar, Financiera,
  Brasileña, EE. UU., Completa) solo rellenan las casillas de verificación en la interfaz.
- **Patrones personalizados** — hasta 20 patrones de expresiones regulares o comodines (`*` = hasta 64
  caracteres que no sean espacios en blanco, `?` = uno). Las coincidencias se convierten en `[CUSTOM_REDACTED]`.
  Cada patrón pasa por `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): un máximo de 500 caracteres, indicadores limitados
  a `g i m s u`, debe compilarse, superar la comprobación de `safe-regex` (retroceso
  catastrófico) y no debe coincidir con una cadena vacía ni con un marcador de ocultación.
  Un patrón que no cumpla estos requisitos se rechaza al guardarlo y al probarlo, y una fila almacenada
  que no los cumpla se omite durante la ejecución en lugar de compilarse. Los patrones personalizados solo
  se ejecutan mientras el enmascaramiento está activado.
- **Contadores de detección** — recuentos por tipo (nunca los valores coincidentes), conservados en
  memoria y restablecidos al reiniciar (`src/lib/pii/piiDetectionStats.ts`). Solo
  aumentan mientras el enmascaramiento está activado.

La configuración se almacena en la tabla `key_value` (espacio de nombres `pii_settings`,
`src/lib/db/piiSettings.ts`) y se lee mediante una caché de 1 s. API:

| Método | Ruta                     | Finalidad                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Estado de los indicadores, `enabledTypes`, `customPatterns`, contadores de detección |
| `PUT`  | `/api/settings/pii`      | Reemplaza `enabledTypes` (`null` = todos) y/o `customPatterns`                       |
| `POST` | `/api/settings/pii/test` | Prueba en seco de un patrón con una muestra de 8 KB como máximo; no se almacena nada |

Los tres requieren autenticación de administración y validan el cuerpo con Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Inyección de prompts (`promptInjection.ts`)

Detecta estructuras adversarias en el contenido proporcionado por el usuario y aplica la
política configurada. El comportamiento depende de las variables de entorno y de las opciones
del constructor:

| Configuración     | Variable de entorno                                                                                   | Valor predeterminado | Efecto                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`               | Cuando es `false`, la medida de protección finaliza de inmediato.                                                                                                                                                           |
| Modo              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`               | Política de inyección: `block`, `warn` o `log`. (`redact` se acepta por retrocompatibilidad, pero **no** elimina el texto de inyección; la reescritura de PII de la solicitud está controlada por `PII_REDACTION_ENABLED`.) |
| Umbral de bloqueo | Opción `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`               | Gravedad mínima requerida para bloquear. Con la configuración predeterminada, la gravedad media solo se observa.                                                                                                            |

**Precedencia del modo** (`getMode`): `options.mode` del invocador →
**anulación mediante el indicador de funcionalidad de la base de datos** `INJECTION_GUARD_MODE` (Panel de control → Configuración →
Indicadores de funcionalidad) → variable de entorno `INJECTION_GUARD_MODE` → variable de entorno `INPUT_SANITIZER_MODE` →
`warn`. Por lo tanto, una anulación desde el panel de control tiene prioridad sobre las variables de entorno, de modo que la interfaz de usuario de Indicadores de
funcionalidad controla en tiempo real la medida de protección en ejecución (sin reiniciar). La lectura de la base de datos es segura ante fallos:
si se produce un error, la medida de protección recurre al comportamiento basado en variables de entorno y, cuando no se
establece ninguna anulación, el comportamiento es idéntico a la resolución basada únicamente en variables de entorno.

Fuentes de detección:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores
   compartido utilizado en otras partes de la canalización).
2. `DEFAULT_GUARD_PATTERNS` integrados (actualmente `system_override_inline` y
   `markdown_system_block`, ambos con gravedad `high`).
3. `customPatterns` opcionales pasados mediante las opciones del constructor (cadenas, expresiones regulares
   o registros `{ name, pattern, severity }`).

Cuando `mode === "block"` **y** al menos una detección alcanza el umbral de
gravedad, `preCall` devuelve `{ block: true, message: "Request rejected:
suspicious content detected" }`. En los modos `warn`/`log`, la medida de protección registra el evento, pero
permite la llamada. El auxiliar compartido `evaluatePromptInjection()` también se exporta
para los invocadores que necesiten evaluar prompts sin pasar por el registro.

**Límite de análisis (v3.8.20):** el detector solo inspecciona los **primeros 16 KB** del
texto de prompt concatenado: `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) en
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como
`evaluatePromptInjection()` aplican `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de ejecutar
el bucle de patrones. Las directivas de inyección se encuentran cerca del principio de una entrada, por lo que esto
limita el uso de CPU/GC por las expresiones regulares en cargas útiles de varios cientos de KB sin debilitar la detección (véanse
#3932 y #4041).

### Enmascarador de credenciales (`credentialMasker.ts`)

Se ejecuta en **ambas** etapas, en último lugar de la cadena predeterminada (prioridad `95`). Censura
los patrones conocidos de claves de API/tókenes secretos en la carga útil saliente (contenido de los
mensajes, argumentos de llamadas a herramientas y resultados de herramientas) **y** en la respuesta del proveedor, de modo que una
credencial pegada en un prompt (o devuelta por el resultado de una herramienta) no se filtre
al proveedor ascendente ni de vuelta al cliente.

- **Solo mediante activación explícita**, siguiendo la misma convención que la censura de PII (próxima a la Regla estricta n.º 20):
  está deshabilitado salvo que `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Cuando está desactivado, la medida de protección no realiza ninguna operación:
  nunca bloquea ni reescribe.
- `redactCredentials()` recorre todo el árbol de la carga útil/respuesta (`walkValue()`,
  protegido contra la contaminación de prototipos y contra ciclos mediante `WeakSet`) y sustituye las coincidencias por
  un marcador de posición `[REDACTED:<type>]`, clonando únicamente las ramas que realmente
  cambiaron.
- `CREDENTIAL_PATTERNS` abarca claves de proveedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tókenes de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), claves de pago (Stripe, Square), claves de servicios
  en la nube (clave de acceso de AWS, Twilio, SendGrid, Mailgun), claves privadas/JWT,
  cadenas de conexión que contienen credenciales (`mongodb://user:pass@...`, etc.) y
  un patrón genérico de valor de cabecera `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Las claves con formato de cabecera (`authorization`, `x-api-key`, `api-key`,
  `apikey`) se censuran estructuralmente (solo el valor, conservando el prefijo del esquema, como
  `Bearer `/`Basic `) en lugar de usar la expresión regular genérica de texto.
- La medida de protección nunca bloquea; solo reescribe (`modifiedPayload` /
  `modifiedResponse`) y añade anotaciones (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true interrumpe inmediatamente la cadena
  message?: string; // se muestra cuando se bloquea
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

Un mecanismo de protección indica que «no hay cambios» devolviendo `void`, `{}` o
`{ block: false }`. Devolver un `modifiedPayload`/`modifiedResponse` reemplaza
el valor que fluye por la cadena para los mecanismos de protección posteriores.
`signal?: AbortSignal` transmite el ciclo de vida del llamador a los mecanismos de protección. La cancelación de una solicitud es la excepción deliberada de apertura ante fallos: los puentes multimedia detienen el trabajo y realizan la limpieza sin restaurar los datos multimedia sin procesar en un destino que se sabe que no los admite.

## Registro (`registry.ts`)

La instancia singleton `guardrailRegistry` expone:

- `register(guardrail)` — añade un mecanismo de protección (o reemplaza uno según su nombre normalizado) y
  vuelve a ordenarlos por `priority` ascendente.
- `clear()` / `list()` — funciones auxiliares administrativas.
- `runPreCallHooks(payload, context)` — recorre los mecanismos de protección activos, pasa el
  payload a través de `modifiedPayload` y se detiene ante el primer `block: true`.
- `runPostCallHooks(response, context)` — el mismo flujo en el lado de la respuesta.
- `resetGuardrailsForTests({ registerDefaults })` — borra el estado y, opcionalmente,
  vuelve a registrar los valores predeterminados para lograr un aislamiento limpio de las pruebas.

Ambos ejecutores devuelven `{ blocked, payload|response, results, guardrail?, message? }`,
donde `results` es un array de registros `GuardrailExecutionResult` que incluyen
los campos `blocked`, `skipped`, `modified`, `error` y `meta` por cada mecanismo de protección,
útiles para el seguimiento.

### Desactivar mecanismos de protección por solicitud

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` recopila una
lista sin duplicados de nombres de mecanismos de protección que deben omitirse en la
solicitud actual. Fuentes (todas opcionales y combinadas):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` en el cuerpo de la solicitud (nivel superior)
- `metadata.disabledGuardrails` en el cuerpo de la solicitud
- Encabezado `x-omniroute-disabled-guardrails` (o el heredado
  `x-disabled-guardrails`)

Los valores pueden ser arrays de cadenas o una cadena separada por comas; los nombres se
normalizan a minúsculas en formato kebab-case (`pii_masker` → `pii-masker`). El resultado
se pasa mediante `context.disabledGuardrails` al registro, que omite
los mecanismos de protección coincidentes (`skipped: true` en `results`).

## Orden de ejecución

Para cada solicitud que pasa por `src/sse/handlers/chat.ts` y
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` crea la lista de omisiones a partir de la clave de API, el cuerpo
   y los encabezados.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ejecuta las barreras de seguridad en orden
   ascendente de prioridad:
   - Las barreras de seguridad deshabilitadas se registran como `skipped`.
   - El método `preCall` de cada barrera de seguridad puede reescribir la carga útil mediante `modifiedPayload`.
   - El primer `block: true` interrumpe la cadena y el controlador devuelve
     una respuesta de rechazo de la barrera de seguridad.
3. La carga útil (posiblemente reescrita) pasa al enrutamiento combinado y al despacho
   ascendente.
4. Una vez creada la respuesta, `guardrailRegistry.runPostCallHooks(...)`
   ejecuta la misma cadena sobre la respuesta. En este caso, `block: true` descarta la respuesta
   ascendente.

Las barreras de seguridad que generan una excepción se registran con `error: <message>` y se anotan mediante
`logger.warn`, pero la cadena continúa; por diseño, se permite la operación en caso de fallo.

## Configuración

Variables de entorno leídas por las barreras de seguridad integradas:

| Variable                              | Utilizada por              | Efecto                                                                                                                                          |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Establézcala en `false` para deshabilitar por completo la detección.                                                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de inyección: `warn`, `block` o `log`. El valor heredado `redact` no reescribe el texto de la inyección.                               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo de la protección contra inyecciones; también es una marca de funcionalidad de la BD que **reemplaza** las variables de entorno (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Gravedad mínima que rechaza `MODE=block`: `high` (predeterminada), `medium` o `low`.                                                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias heredado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Cuando es `true`, se oculta la PII de la solicitud (independientemente del modo de inyección).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (descendente) | Controla el comportamiento del ocultador en las respuestas.                                                                                     |

Las barreras de seguridad de Modality Bridge leen la configuración en tiempo de ejecución del almacén
de ajustes respaldado por la BD (`getSettings()`), no de las variables de entorno. Las claves principales de Vision son
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y
`modalityBridgeCacheMaxEntries`. Las claves heredadas
`visionBridge*` solo se aceptan como mecanismo alternativo de lectura durante un ciclo, según lo documentado;
las escrituras del panel usan las claves principales. Los valores predeterminados y el
resolutor alternativo se encuentran en `src/shared/constants/modalityBridgeDefaults.ts`, mientras que las constantes
heredadas se conservan en `src/shared/constants/visionBridgeDefaults.ts`.

Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` y `modalityBridgeAudioMaxClips`, además de los ajustes compartidos
`modalityBridgeCache*`. Audio no tiene un mecanismo alternativo para claves heredadas porque estas
claves se introdujeron con el esquema de Modality Bridge.

Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` y
`modalityBridgeVideoTimeout`, además de los ajustes compartidos `modalityBridgeCache*`.
Está deshabilitado de forma predeterminada porque FFmpeg/ffprobe son dependencias operativas
opcionales y la descripción de fotogramas añade latencia y costes del modelo.

## Barreras de protección personalizadas

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

1. Cree `src/lib/guardrails/myGuardrail.ts` extendiendo `BaseGuardrail`.
2. Implemente `preCall` y/o `postCall`.
3. Regístrela durante la importación (incorpórela desde `registerDefaultGuardrails`) o
   llame a `guardrailRegistry.register(...)` en tiempo de ejecución; el registro reemplaza
   cualquier barrera de protección anterior que tenga el mismo nombre normalizado.
4. Añada pruebas en `tests/unit/` (ejemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pruebas

Use `resetGuardrailsForTests()` entre pruebas para comenzar desde un estado conocido.
Pase `{ registerDefaults: false }` para comenzar con un registro vacío y
registrar únicamente las barreras de protección que se estén probando. Vision Bridge admite
inyección de dependencias (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge expone los
puntos de integración equivalentes para la configuración, las capacidades, la selección del modelo STT, las comprobaciones
de credenciales y la transcripción. Por lo tanto, las pruebas pueden ejercitar ambos flujos sin acceso
a la base de datos ni a la red.

## Véase también

- `src/lib/guardrails/` — implementación
- `src/shared/utils/inputSanitizer.ts` — detector compartido que permite
  detectar la inyección de prompts y enmascarar PII
- `src/shared/constants/visionBridgeDefaults.ts` — valores predeterminados de Vision Bridge y
  lista de modelos con puente forzado
- `src/shared/constants/modalityBridgeDefaults.ts` — valores predeterminados compartidos de ejecución de Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — capa ortogonal (disyuntor, períodos de espera)
- `docs/reference/ENVIRONMENT.md` — referencia completa de variables de entorno

## Cobertura de rutas y red team de la protección contra inyecciones (Fase 8 · Bloque D)

La protección contra inyecciones (`createInjectionGuard` / `withInjectionGuard`) cubre todas las rutas
que aceptan prompts de usuario. Respeta `INJECTION_GUARD_MODE` (el valor predeterminado `warn` = solo registra;
`block` = devuelve HTTP 400 `SECURITY_001`).

| Tipo              | Rutas                                                                                                                                                | Modo predeterminado |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generativas       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Datos             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

La extracción de texto (`extractMessageContents`) cubre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (nocturno, `nightly-llm-security.yml`):** promptfoo valida que cada ruta bloquee
el corpus OWASP-LLM con `INJECTION_GUARD_MODE=block`; garak ejecuta sondas (se omite si no hay un secreto).
`moderations` se incluye para mantener la coherencia; los operadores que utilicen el modo de bloqueo pueden excluirla mediante
`resolveDisabledGuardrails`.

El flujo de trabajo nocturno (`.github/workflows/nightly-llm-security.yml`, cron + ejecución
manual) tiene dos trabajos:

- **`promptfoo-guard` (bloqueante)** — ejecuta `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Cada caso adversario (p. ej., «ignora todas las
  instrucciones anteriores…», jailbreaks de estilo DAN) comprueba que la respuesta contenga
  `error.code === "SECURITY_001"`, es decir, que la protección haya rechazado realmente la solicitud.
- **`garak` (consultivo)** — ejecuta garak `--probes promptinject,dan,leakreplay`
  contra una instancia local de OmniRoute (`http://localhost:20128/v1`). Está condicionado a un
  secreto del proveedor (`PROMPTFOO_PROVIDER_KEY`); se omite sin errores y lleva el sufijo
  `|| true`, por lo que genera informes sin provocar fallos en CI.

La cobertura del auxiliar de protección (`createInjectionGuard` / `withInjectionGuard`)
abarca todas las rutas `/v1` que admiten prompts; el texto del prompt se obtiene de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mediante
`extractMessageContents()` en `src/shared/utils/inputSanitizer.ts`.
