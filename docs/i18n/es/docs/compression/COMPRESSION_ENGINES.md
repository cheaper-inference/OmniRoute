# Compression Engines (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

La compresión de OmniRoute se basa en contratos de motores. Un modo puede ejecutar directamente un motor
(`caveman` o `rtk`) o una canalización apilada determinista que ejecuta varios motores en orden.

## Modos

| Modo         | Ruta del motor                                                                                                  | Entrada prevista                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `off`        | ninguna                                                                                                         | Conservación exacta del prompt                          |
| `lite`       | Herramientas auxiliares ligeras de Caveman                                                                      | Limpieza permanente de bajo riesgo                      |
| `standard`   | Caveman                                                                                                         | Condensación de prompts en lenguaje natural             |
| `aggressive` | Caveman + resumidores de historial/herramientas                                                                 | Sesiones de chat largas                                 |
| `ultra`      | Caveman + herramientas auxiliares de poda                                                                       | Recuperación del límite de contexto                     |
| `rtk`        | RTK                                                                                                             | Salida de terminal, shell, compilación, pruebas y git   |
| `omniglyph`  | OmniGlyph                                                                                                       | Contexto como imagen en el canal nativo del proveedor   |
| `stacked`    | Canalización. El valor predeterminado de la solicitud es `session-dedup -> lite`. `rtk -> caveman` es opcional. | Registros mixtos de herramientas y prosa, máximo ahorro |

### Perfiles de compresión de OmniGlyph

El motor `omniglyph` (paquete `omniglyph`, 1.4.0+) acepta un perfil semántico con nombre, configurado
globalmente mediante `omniglyph.profile` en los ajustes de compresión o por paso mediante la
configuración de pasos de la canalización apilada:

| Perfil        | Límite                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Predeterminado. La política medida por los recibos publicados: convierte en imágenes el sistema, la documentación de herramientas y el historial denso |
| `balanced`    | Mantiene el estado activo en formato nativo, protege los últimos 8 turnos y condensa el historial cerrado más antiguo                                  |
| `coding-safe` | Mantiene en formato nativo la autoridad, los esquemas de herramientas y la salida activa de herramientas; protege los últimos 12 turnos                |
| `passthrough` | Enruta sin transformar; se omite el motor                                                                                                              |

El perfil es un **techo, no un suelo**: `mergeCompressionProfileOptions` en el paquete
impide que una sobrescritura del llamador vuelva a abrir una vía con pérdidas que el perfil había cerrado, por lo que un valor por paso
`preserveSystemPrompt: false` no puede volver a habilitar la compresión del sistema con `coding-safe`.

Según las mediciones realizadas en este código base: `coding-safe` y `balanced` elevan `minCompressChars` a su
valor máximo y mantienen el sistema, los esquemas de herramientas y los resultados de herramientas en formato nativo, por lo que una sesión que aún no ha
acumulado historial se detiene en `below_min_chars` y el motor no transforma nada. Por eso
el valor predeterminado es `aggressive` en lugar del perfil más seguro.

El paquete determina el ámbito de su propio modelo y el perfil a partir de la configuración de su entorno.
OmniRoute nunca delega la decisión: el adaptador fija la puerta de acceso del modelo al ámbito más restrictivo
del paquete, por lo que la configuración del entorno del host solo puede reducir la lista de permitidos, nunca
ampliarla más allá de los recibos medidos de OmniRoute.

## Registro de motores

El registro se encuentra en `open-sse/services/compression/engines/registry.ts`. Los motores exponen un
contrato compartido:

- `id`: identificador estable del motor, como `caveman` o `rtk`
- `apply(text, config)`: ruta de ejecución heredada utilizada por canalizaciones apiladas
- `compress(input, config)`: ruta de ejecución principal que devuelve texto + estadísticas
- `getConfigSchema()`: devuelve la estructura similar a JSON Schema de la configuración válida
- `validateConfig(config)`: devuelve `{ valid, errors[] }`

El registro utiliza `registerCompressionEngine(engine)` (o `registerEngine` para casos avanzados),
que llama a `assertValidEngine()` y `validateConfig(defaultConfig)` antes de aceptar el motor.
Use `unregisterCompressionEngine(id)` para eliminar un motor en tiempo de ejecución.

`strategySelector.ts` registra los motores integrados antes de ejecutar la compresión. Esto permite que la vista previa,
la compresión en tiempo de ejecución, el modo apilado, las pruebas y los motores futuros utilicen la misma ruta de ejecución.

### Compresión de descripciones MCP (relacionado)

Un registro independiente comprime los metadatos de descripción de las herramientas MCP a nivel de registro; consulte
`open-sse/mcp-server/descriptionCompressor.ts` y [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Reutiliza
las reglas de Caveman, pero opera sobre los metadatos de las herramientas, no sobre las cargas útiles de las solicitudes.

### Motores integrados adicionales

Además de Caveman, RTK y LLMLingua-2, el registro incluye varios motores especializados sin pérdidas /
estructurales (utilizados por las canalizaciones apiladas, el entorno de pruebas y las pruebas):

| Motor         | Id              | Qué hace                                                                                                                                                                                                           |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): sustituye grandes bloques de texto contiguos por referencias direccionadas por contenido, de modo que los bloques repetidos/grandes se envían una sola vez y luego se referencian. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): compactación tabular sin pérdidas de cargas útiles de matrices JSON homogéneas en un formato columnar `[N rows]`.                                                                          |
| ionizer       | `ionizer`       | Muestreo de filas del inicio, centro y final para bloques homogéneos muy grandes, almacenando la parte central omitida como una referencia CCR direccionada por contenido.                                         |
| session-dedup | `session-dedup` | Deduplicación entre turnos direccionada por contenido (inspirada en TokenMizer): omite texto ya visto en turnos anteriores de la misma sesión.                                                                     |

**Instrucción del protocolo de recuperación de CCR (#8033):** la primera vez que CCR sustituye ≥1 bloque en una
solicitud, el motor antepone un único mensaje `system` idempotente (que comienza con el
centinela `[CCR protocol]`) para enseñar al llamador el contrato entre el marcador y la herramienta: qué significa un
marcador `[CCR retrieve hash=<24hex> chars=N]`, que el hash debe copiarse literalmente
(los 24 caracteres hexadecimales; los hashes copiados incorrectamente son la causa más probable de los errores
"block not found"), y que un marcador `[dedup:ref sha=...]` significa "consultar el historial", no "llamar a la
herramienta". La nota se inyecta **solo cuando las `tools[]` anunciadas por el llamador demuestran que este puede
acceder realmente a `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` en
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`); un llamador simple
compatible con OpenAI que no disponga de esa herramienta nunca recibe instrucciones para llamar a algo
a lo que no puede acceder. La idempotencia se garantiza examinando el historial de mensajes en busca del centinela
antes de realizar la inyección, de modo que las solicitudes de múltiples turnos (que reproducen los mensajes anteriores) no acumulen
una nota por turno.

## Caveman

El modo Caveman se centra en la condensación semántica de texto normal:

- conserva bloques de código, URLs, JSON, rutas y datos estructurados
- elimina relleno, matizaciones, contexto repetido y frases de enlace innecesariamente extensas
- admite paquetes de reglas específicos de cada lenguaje en `open-sse/services/compression/rules/`
- sigue disponible mediante los modos heredados `standard`, `aggressive` y `ultra`

La sección correspondiente del panel es `Dashboard -> Context & Cache -> Caveman`.

El proyecto original de Caveman informa de `~75%` menos tokens de salida y un ahorro medio de salida del `65%` en pruebas comparativas, con un intervalo del `22-87%`, además de una herramienta de compresión de entrada de `~46%`. OmniRoute utiliza la cifra de entrada de Caveman al documentar el ahorro combinado de prompts/contexto; el modo de salida de Caveman sigue siendo una función independiente del comportamiento de las respuestas.

## RTK

El modo RTK se centra en la salida de comandos y herramientas:

- detecta clases de salida como `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  pruebas de Cargo/Go, compilaciones de TypeScript/Vite/Webpack, ESLint, auditorías/instalaciones de npm, registros de Docker,
  `find`/`grep` del shell, trazas de pila y registros genéricos
- aplica 49 filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- admite el pipeline declarativo de estilo RTK: eliminación de ANSI, sustitución, cortocircuito por coincidencia de salida,
  eliminación/conservación de líneas, truncamiento por línea, truncamiento head/tail/max-line y alternativa cuando la salida está vacía
- admite filtros de proyecto sujetos a confianza en `.rtk/filters.json` y filtros globales en
  `DATA_DIR/rtk/filters.json`
- elimina secuencias ANSI, ruido de progreso, líneas repetidas y texto estándar poco útil
- conserva errores accionables, advertencias, resúmenes, archivos modificados y contexto final
- puede conservar opcionalmente la salida sin procesar redactada para recuperación/depuración mediante rutas de administración autenticadas

La sección correspondiente del panel es `Dashboard -> Context & Cache -> RTK`.

Los detalles operativos sobre filtros personalizados, confianza, verificación y recuperación de la salida sin procesar se encuentran en
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

El proyecto original de RTK informa de un ahorro del `60-90%` en la compresión de la salida de comandos. El ejemplo de su README muestra una sesión de Claude Code de 30 minutos que pasa de `~118,000` tokens a `~23,900`, lo que supone un ahorro del `79.7%`.

## LLMLingua-2 (Poda semántica)

El modo LLMLingua-2 realiza **poda semántica de tokens** en texto mediante un pequeño clasificador de tokens ONNX, como complemento de los motores Caveman y RTK basados en reglas:

- comprime texto únicamente en mensajes que no sean del sistema; los bloques de código delimitados y otras
  estructuras preservadas nunca se modifican
- ejecuta el backend `@atjsh/llmlingua-2` (ONNX mediante `@huggingface/transformers`) en un
  hilo de trabajo, por lo que la inferencia del modelo nunca bloquea el bucle de eventos de las solicitudes
- es **combinable** (`stackPriority` 35): en un pipeline combinado se ejecuta después de los
  motores estructurales (CCR, session-dedup, headroom y Caveman), pero antes de `ultra`, ya que
  la poda semántica es más eficaz sobre texto previamente comprimido a nivel estructural; por ejemplo,
  `rtk -> caveman -> llmlingua`
- **continúa de forma segura ante cualquier error** (dependencias opcionales ausentes, creación del proceso de trabajo, carga del modelo, inferencia
  o tiempo de espera agotado) → el texto original se devuelve sin cambios; nunca se devuelve un error

Ubicación del motor: `open-sse/services/compression/engines/llmlingua/`. La sección correspondiente del panel
es `Dashboard -> Context & Cache -> LLMLingua`.

### Modelos

El modelo predeterminado es **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rápido). Hay disponible un modelo **BERT-base** de mayor precisión (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) mediante el campo `model` de la configuración del motor. `@huggingface/transformers`
descarga de forma diferida el modelo seleccionado desde HuggingFace Hub en
`${DATA_DIR}/models/llmlingua` durante la primera llamada (`modelStore.ts`); una configuración
alternativa de `modelPath` permite apuntar a una copia local (instalaciones sin conexión o aisladas de la red).

### Dependencias opcionales e instalación bajo demanda

La pila de pares del entorno de ejecución podable de LLMLingua es **opcional**. Dos paquetes están declarados como
`optionalDependencies` en `package.json` y se mantienen **externos** en la compilación de producción
(`scripts/build/prepublish.ts` no los incluye):

| Paquete              | Versión (fijada) | Notas                                            |
| -------------------- | ---------------- | ------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`          | Paquete de entrada; declara los demás como pares |
| `js-tiktoken`        | `^1.0.20`        | Tokenizador                                      |

`@huggingface/transformers` está fijado en `^4.2.0` (se comparte con la ruta de embeddings locales y
también se incluye en el seguimiento del paquete independiente); `@atjsh/llmlingua-2@2.0.5` lo admite como dependencia par con
`"^3.5.2 || ^4.0.0"`, por lo que son compatibles tanto Transformers.js v3 como v4. Desde 2.0.4,
`@atjsh/llmlingua-2` ya no requiere `@tensorflow/tfjs`, lo que eliminó de la pila SLM el componente individual
de mayor tamaño (TensorFlow.js). Solo los dos paquetes anteriores son pares SLM podables.
Una ejecución estándar de `npm install` (desarrollo) instala automáticamente la pila opcional, salvo que se omitan las dependencias opcionales.

**Motivo de la instalación bajo demanda:** el paquete publicado en npm, el paquete independiente y la imagen de Docker
se distribuyen **sin** estas dependencias para mantener un tamaño reducido. Cuando no están presentes, la comprobación de dependencias
del proceso de trabajo (una comprobación de resolución de `@atjsh/llmlingua-2` en `worker.ts`) falla y el motor
**continúa silenciosamente de forma segura**: seleccionar LLMLingua se convierte en una operación nula (el texto se devuelve sin cambios y no
se registra ningún error). Para activarlo en un entorno podado, instala la pila opcional:

```bash
# fija las versiones declaradas en optionalDependencies de package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

La eliminación de `@tensorflow/tfjs` (2.0.4+) suprime el componente de ~800 MB que anteriormente dominaba
el tamaño total; el espacio restante corresponde a los entornos de ejecución transformers.js + onnxruntime-node,
además del modelo TinyBERT (~57 MB), que se descarga durante el primer uso (no mediante npm).

Por entorno:

- **Desarrollo / `npm install`** — se instala automáticamente, salvo que hayas usado `--omit=optional`
  (o `--no-optional`). No es necesario realizar ninguna acción.
- **npm global (`npm i -g omniroute`) / independiente** — ejecuta el comando de instalación anterior dentro
  del directorio del paquete instalado, o vuelve a instalarlo sin omitir las dependencias opcionales.
- **Docker** — añade el comando de instalación en una capa de imagen derivada; la imagen publicada
  es deliberadamente ligera.
- **VPS (PM2)** — instálalo en `node_modules` de la aplicación y, a continuación, reinicia el proceso para que el
  worker vuelva a comprobar la puerta.
- **Next independiente sin procesar (`npm run build` → `.build/next/standalone/server.js`)** — el
  rastreo independiente no incluye NI el worker NI las dependencias opcionales, por lo que el motor
  pasa silenciosamente a modo abierto ante fallos. `scripts/build/colocate-standalone.mjs` vuelve a aplicar ambos elementos (esbuild del worker +
  el cierre de dependencias opcionales en el árbol independiente); se ejecuta automáticamente mediante el hook
  `postbuild` de npm después de cada compilación. Es idempotente y tolera los fallos cuando no hay dependencias.

**Comprueba que está activo:** con LLMLingua seleccionado, el texto real se reduce de verdad (el motor
deja de pasar a modo abierto ante fallos) y la primera solicitud activa la descarga del modelo en
`${DATA_DIR}/models/llmlingua`. La puerta comprueba intencionadamente solo `@atjsh/llmlingua-2` —
los demás pares son exclusivamente ESM y `require.resolve` genera una excepción con ellos incluso cuando están presentes—, por lo que
el worker sigue pasando a modo abierto ante fallos si realmente falta algún par al ejecutar `import()`.

## Canalizaciones apiladas

El modo apilado ejecuta los pasos de la canalización en orden. El valor predeterminado es:

```txt
rtk -> caveman
```

Úselo para sesiones con agentes de programación en las que un prompt combina la salida de comandos con prosa humana o del asistente. RTK reduce primero los registros ruidosos de las herramientas y, después, Caveman comprime el lenguaje natural restante.

Los pasos de la canalización se configuran con `stackedPipeline` en los ajustes de compresión o mediante combinaciones de compresión.

Cuando ambos motores reducen la misma carga útil apta, el ahorro se acumula:

```txt
combinado = 1 - (1 - ahorro de RTK) * (1 - ahorro de entrada de Caveman)
promedio  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervalo = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtro del árbol de accesibilidad de MCP

El filtro inteligente del árbol de accesibilidad de MCP es una capa de compresión posterior a la ejecución que se aplica a los **resultados de herramientas** de MCP, no a los prompts ni al contexto. Se centra en las cargas útiles detalladas de árboles de accesibilidad y capturas del navegador que devuelven herramientas como Playwright, computer-use y servidores MCP de automatización del navegador.

### Qué hace

1. **Eliminación de ruido** — elimina entradas genéricas o de texto vacías (`- generic:`, `- text: ""`)
2. **Contracción de elementos hermanos** — cuando hay ≥ `collapseThreshold` (valor predeterminado: 30) líneas consecutivas que son repeticiones estructurales, las contrae en las primeras `collapseKeepHead` (valor predeterminado: 10) líneas + un resumen con el recuento + las últimas `collapseKeepTail` (valor predeterminado: 5) líneas
3. **Conservación de referencias** — los anclajes `[ref=eXX]` que necesitan Playwright y computer-use nunca se modifican
4. **Truncamiento estricto** — si el texto después de la contracción aún supera `maxTextChars` (valor predeterminado: 50,000), se trunca con una indicación de navegación para que el agente pueda seguir trabajando

### Ubicación del motor

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← punto de entrada de smartFilterText()
  collapseRepeated.ts ← algoritmo de contracción de elementos hermanos
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuración

Se controla mediante `compression.mcpAccessibility` en los ajustes globales (migración 056). Configuración predeterminada:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

El filtro solo se aplica a las cargas útiles de resultados de herramientas cuyo `type` sea `"text"` y cuya longitud supere `minLengthToProcess`. No afecta a la compresión de prompts ni a las cargas útiles de solicitudes.

### Ahorro esperado

Entre un 60 y un 80 % en los resultados de herramientas de captura del navegador, según la complejidad de la página. El algoritmo de contracción es O(n) respecto al número de líneas y añade una latencia insignificante.

### Comparación entre este filtro y los motores de compresión anteriores

| Aspecto                | Caveman / RTK / Stacked         | Filtro de accesibilidad de MCP         |
| ---------------------- | ------------------------------- | -------------------------------------- |
| Objetivo               | Prompts / contexto de solicitud | Resultados de herramientas de MCP      |
| Activador              | Ajuste del modo de compresión   | `compression.mcpAccessibility.enabled` |
| Alcance                | Todos los mensajes SSE          | Solo resultados de herramientas        |
| Anclajes de referencia | N/A                             | Se conservan incondicionalmente        |

---

## Combinaciones de compresión

Las combinaciones de compresión son perfiles de compresión con nombre que se pueden asignar a combinaciones de enrutamiento:

- `compression_combos`: almacena el modo, la canalización, la configuración de RTK, la configuración de idioma y el marcador predeterminado
- `compression_combo_assignments`: asigna una combinación de compresión a una combinación de enrutamiento
- la integración en tiempo de ejecución resuelve una combinación de compresión asignada antes que las sobrescrituras genéricas de combinaciones
- los análisis incluyen `compression_combo_id` y `engine`

Ubicación en el panel: `Dashboard -> Context & Cache -> Compression Combos`.

## Requisitos previos/guía del operador (CCR y session-dedup)

CCR (`ccr`) y `session-dedup` reemplazan o eliminan el texto y dejan un** marcador** detrás. Esta sección es la referencia del operador para conectar un cliente, leer los dos marcadores y recuperar o diagnosticar el contenido elidido. La mecánica de cada motor se trata arriba; esta es la capa "cómo lo ejecuto".

### Transportes y puntos finales

Se puede acceder al servidor MCP que expone las herramientas CCR de tres maneras. La base URL predeterminada es `http://localhost:20128` (`OMNIROUTE_BASE_URL`):

| Transporte                             | URL /comando                            | Notas                                                                                                                                     |
| -------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Streamable HTTP (cliente, recomendado) | `http://localhost:20128/api/mcp/stream` | El punto final con el que hablan los clientes actuales MCP.                                                                               |
| Singleton SSE heredado                 | `http://localhost:20128/api/mcp/sse`    | Transporte singleton más antiguo. Él** cierra** sesiones transmitibles; use clientes `streamable-http` contra `/api/mcp/stream`, no este. |
| stdio                                  | `omniroute --mcp`                       | Para la configuración IDE MCP que genera el proceso. No hay bandera `--dev` ; `omniroute --mcp` es el punto de entrada estándar.          |

### Niveles de almacenamiento (lo que sobrevive a un reinicio)

CCR es un** dos niveles** almacenar, no solo en memoria:

- **Nivel caliente en memoria** — límite por bloque 2 MiB, por principal 16 MiB, global 64 MiB. Las entradas por defecto son de 24 TTL (máximo 7 días). La recuperación completa MCP desde la memoria tiene un límite de 256 KiB; cualquier cosa más grande aún es accesible a través de los modos a distancia/grep.
- **Nivel SQLite duradero** (`ccr_blocks`, `COMPRESSION_CCR_DURABLE_STORE`, activado de forma predeterminada) — respalda el nivel en memoria para que un bloque sobreviva al desalojo LRU, a un reinicio o a una recuperación en otra instancia. La fila mantiene el TTL del bloque, por lo que un bloque que pasa su TTL desaparece de ambos niveles.

Tres guardias mantienen el nivel duradero delimitado — un bloque permanece solo en memoria cuando:

1. el bloque ha terminado** 512 KB** (`MAX_DURABLE_BLOCK_BYTES`);
2. el tiempo de ejecución es un tiempo de ejecución en la nube (sin disco local);
3. `COMPRESSION_CCR_DURABLE_STORE=false`.

Entonces, "el bloque desapareció" no es una historia general de reinicio: un bloque sub-512 KB en un tiempo de ejecución local, fuera de la nube, sobrevive a un reinicio a través del nivel duradero hasta que se agota su TTL. Consulte [la referencia del entorno](../reference/ENVIRONMENT.md) para la variable.

### Los dos marcadores

| Marcador                              | Significado                                                                                                                                            | ¿Qué debe hacer el modelo?                                                                                                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[CCR retrieve hash=<24hex> chars=N]` | Se almacenó un bloque grande con contenido direccionado.                                                                                               | Llama `omniroute_ccr_retrieve` con el** Hash de 24 hexadecimales copiado palabra por palabra** para recuperar el texto original.                                                                                         |
| `[dedup:ref sha=…]`                   | `session-dedup` texto elidido ya enviado en un turno anterior de la misma sesión. Este es un** mirada atrás intencional** , no una pérdida o un error. | Hacer** no** llama a cualquier herramienta y hazlo** no** Intenta "reconstruirlo". La primera aparición del texto es la copia canónica; el turno actual nunca se reescribe, sino que se deduplica en un turno posterior. |

La revisión `[dedup:ref]` es una decisión de protocolo deliberada — no hay reconstrucción previa al envío. Trátelo como si "este texto exacto ya estuviera en el cable anteriormente en esta sesión".

### Requisitos previos del cliente

- **Clave (estdio):** una persona que llama stdio no tiene identidad por solicitud, por lo que se autentica con `OMNIROUTE_API_KEY` (configurado en `env` del servidor MCP ). Sin él, la persona que llama es anónima y las herramientas que requieren un principal pueden degradarse.
- **`tools[]` es la condición previa de la inyección.** Se inyecta la instrucción de protocolo de recuperación CCR (#8033).** solo** cuando el `tools[]` anunciado en la solicitud demuestra que el cliente realmente puede comunicarse con `omniroute_ccr_retrieve`. La coincidencia es una coincidencia de segmento final delimitada por un separador (`__`, `.`, `/`, `:`). — nunca es una subcadena simple — por lo que un nombre con espacio de nombres como `mcp__gateway__omniroute_ccr_retrieve` todavía cuenta. Un `tools[]` ausente o que no coincide significa que la instrucción _no_ se inyecta, por diseño.
- **`codemode:false` (clientes OpenCode ).** OpenCode utiliza de forma predeterminada el modo Código, que anuncia solo sus herramientas nativas al modelo y** no** coloque las herramientas MCP en la lista nativa `tools[]`. Configure `codemode: false` en la entrada del servidor MCP para que se anuncien las herramientas `omniroute_ccr_*`. Este es un** cliente** configuración, no una OmniRoute. Aún no se inyecta la instrucción CCR : OpenCode nombra una herramienta `<server>_<tool>`, por lo que un servidor llamado `omniroute` expone `omniroute_omniroute_ccr_retrieve` y `_` no es uno de los separadores coincidentes.
- **Directores.** El almacenamiento y la recuperación están aislados por entidad principal autenticada (por clave API ). Una clave sólo ve sus propios bloques.

### Alcances por herramienta

La aplicación del alcance siempre está activada para quienes llaman HTTP/SSE con un alcance limitado. Las herramientas `omniroute_` CCR requieren:

| Herramienta              | Alcance             |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

Un alcance faltante devuelve un** resultado del error de la herramienta MCP** (`isError: true`, no un HTTP 403 — el `403 LOCAL_ONLY` es la autenticación de protección de ruta de bucle invertido separada): `Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` Una clave remota mínima puede contener `mcp:connect` (autoriza la exclusión solo local `/api/mcp/` ) más el alcance read/write específico que necesita.

### Matriz de clientes

| Cliente               | Transporte                                        | Configuración para usar                                                                                                                                                                                                                                     | `tools[]` anunciado? (instrucción → CCR inyectada)                                                                                                                                                              |
| --------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Código Claude         | streaming-http                                    | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                                                           | Sí — compatible con MCP; inyectado.                                                                                                                                                                             |
| Cursor / Cline        | `stdio`** o** `streamable-http`                   | stdio: `omniroute --mcp` con `OMNIROUTE_API_KEY` en `env`; o una entrada MCP remota que apunte a `http://localhost:20128/api/mcp/stream` (consulte [la Guía de instalación → MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) ) | Sí — anuncia las herramientas `omniroute_ccr_*`.                                                                                                                                                                |
| OpenCode              | streaming-http                                    | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream`, más `codemode: false`                                                                                                                                                             | Herramientas anunciadas sólo con `codemode: false`; la instrucción aún no se inyecta porque `omniroute_omniroute_ccr_retrieve` no coincide (consulte [Requisitos previos del cliente](#client-prerequisites) ). |
| Compatible con OpenAI | HTTP compatible con OpenAI (finalización de chat) | cliente estándar de finalización de chat contra el punto final compatible con OpenAI                                                                                                                                                                        | **Nunca** — a una persona que llama simplemente compatible con OpenAI nunca se le dice que llame a la herramienta y la instrucción no se inyecta.                                                               |

### Límites de recuperación y paginación

Los resultados del texto de la herramienta MCP se recortan alrededor de `mcpAccessibility.maxTextChars` ( `50000` predeterminado). La recuperación `full` de un bloque tiene un límite de 256 KiB —** no hay recuperación completa ilimitada** . Cuando el `chars=N` de un bloque es grande, paginalo en lugar de extraerlo todo:

- Regla de oro:**`chars > 40000` → usa un `mode`** , nunca un completo completo.
- `mode:"grep"` — regex `pattern` coincide línea por línea, hasta 1000 líneas coincidentes (`unique: true` elimina repeticiones), más barato para "encontrar la línea que necesito".
- `mode:"lines"` — un rango de 1 línea indexada; necesita tanto `start` como `end`.
- `mode:"head"` / `mode:"tail"` — first/last `n` líneas.
- `mode:"stats"` — recuentos de líneas, caracteres y bytes sin el cuerpo.

Utilice `mode:"lines"` con `start`/`end` para recorrer un bloque largo de páginas en lugar de solicitar todo de una vez.

### Denominación de herramientas

La herramienta de recuperación actualmente se llama `omniroute_ccr_retrieve` (el prefijo `omniroute_` es una solución alternativa anticuada para las colisiones de nombres entre servidores). Un nombre de herramienta con sufijo acotado más limpio y una solución para los resultados MCP JSON truncados en mitad de la cadena se rastrean como seguimientos ascendentes; Esta página documenta únicamente el comportamiento actual enviado.

### Ciclo de vida de la sesión

Las sesiones Streamable-HTTP quedan inactivas y el servidor las cosecha; la ventana inactiva la configura `OMNIROUTE_MCP_SESSION_IDLE_MS`, recurriendo a `DEFAULT_MCP_SESSION_IDLE_MS` en `open-sse/mcp-server/httpTransport.ts`. El síntoma de una sesión inactiva es un HTTP 404 con `Unknown Mcp-Session-Id` — la solución es volver a conectar o reiniciar la sesión.**no** para rotar una clave, cambiar un alcance o cambiar el nombre de una herramienta.

## Superficie de la API

| Ruta                                   | Propósito                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Configuración global de compresión (incluye la configuración `mcpAccessibility`) |
| `/api/compression/preview`             | Previsualizar cualquier modo de compresión                                       |
| `/api/compression/language-packs`      | Enumerar los paquetes de idioma Caveman disponibles                              |
| `/api/context/caveman/config`          | Alias de la configuración de Caveman                                             |
| `/api/context/rtk/config`              | Valores predeterminados y configuración de RTK                                   |
| `/api/context/rtk/filters`             | Catálogo de filtros de RTK                                                       |
| `/api/context/rtk/test`                | Endpoint de previsualización/prueba de RTK                                       |
| `/api/context/rtk/raw-output/[id]`     | Recuperación autenticada de la salida sin procesar censurada                     |
| `/api/context/combos`                  | CRUD de combinaciones de compresión                                              |
| `/api/context/combos/[id]/assignments` | CRUD de asignaciones de combinaciones de enrutamiento                            |
| `/api/context/analytics`               | Alias de análisis de compresión                                                  |

Las rutas de administración requieren autenticación de administración o comprobaciones de políticas de claves de API.

## Herramientas MCP

La compresión expone cinco herramientas MCP:

| Herramienta                         | Ámbito              | Propósito                                       |
| ----------------------------------- | ------------------- | ----------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Configuración, análisis y estadísticas de caché |
| `omniroute_compression_configure`   | `write:compression` | Actualizar la configuración global              |
| `omniroute_set_compression_engine`  | `write:compression` | Establecer el modo y la canalización opcional   |
| `omniroute_list_compression_combos` | `read:compression`  | Enumerar las combinaciones de compresión        |
| `omniroute_compression_combo_stats` | `read:compression`  | Consultar análisis por combinación/motor        |

## Alcance y exclusiones

**Los embeddings nunca se comprimen.** `open-sse/handlers/embeddings.ts` nunca invoca ningún
motor de compresión: los cuerpos de solicitud/respuesta pasan directamente al ejecutor sin modificaciones.
Esto es estructural actualmente (los embeddings y las finalizaciones de chat tienen controladores independientes), no una
comprobación en tiempo de ejecución, pero significa que el problema de distorsión vectorial de #8034 no tiene ninguna superficie de exposición
en la ruta de embeddings.

**Filtro de exclusión por modelo/endpoint (#8034).** Para las finalizaciones de chat, un operador puede indicar
los identificadores de modelo o destinos `provider/model` que nunca deben comprimirse; una medida de protección útil si
la compresión llegara a conectarse más adelante a una ruta próxima a los embeddings y, en general, útil
para cualquier modelo en el que importe que el prompt sea exacto byte por byte (evaluaciones deterministas, prefijos
sensibles a la caché, etc.).

- Campo de configuración: `exclusions?: string[]` en la configuración global de compresión
  (`GET`/`PUT /api/settings/compression`), conservado mediante el espacio de nombres de compresión `key_value`
  existente (`src/lib/db/compression.ts`); no se requiere ninguna tabla nueva.
- Pestaña del panel: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaxis de patrones: `*` es el único comodín. Todos los demás metacaracteres de expresiones regulares de un patrón se
  escapan antes de la comparación, por lo que `gpt-5.6` solo coincide con la cadena literal, nunca con `gpt-5x6`
  (resistente a ReDoS, acotado y sin cuantificadores anidados). Los patrones se comparan sin distinguir entre mayúsculas y minúsculas
  tanto con el identificador de modelo simple como con el compuesto `provider/model`: `gpt-5-6`, `openai/gpt-5-6`
  y `openai/*` funcionan, y `*` por sí solo excluye todos los modelos.
- Coincidencia: `isCompressionExcluded()` / `normalizeCompressionExclusions()` en
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` comprueba el destino excluido
  justo después de resolver la configuración de compresión, **antes de que se ejecute cualquier motor**, y trata una coincidencia
  exactamente igual que si la compresión estuviera deshabilitada globalmente: el cuerpo de la solicitud es
  demostrablemente idéntico byte por byte. La omisión se registra mediante `writeCompressionSkip(..., "excluded")` para
  aportar visibilidad en los análisis.
- Valor predeterminado (lista vacía/ausente): comportamiento idéntico al anterior a #8034; no se excluye nada.

## Limitaciones conocidas

- **LLMLingua-2 (SLM) requiere dependencias opcionales coubicadas.** El worker solo se ejecuta en una
  compilación de producción cuando `@atjsh/llmlingua-2` y sus dependencias pares se coubican en
  `dist/node_modules` (véase `scripts/build/colocateOptionals.mjs`, #4286). Sin ellas, el
  motor aplica una apertura ante fallos (devuelve el texto original). La resolución del worker ya no depende de
  `import.meta.url` (falla en el paquete independiente), sino que se basa en el
  cwd del entorno de ejecución / `argv[1]`.
- **Los paquetes de idiomas `de` / `fr` / `ja` de Caveman están incompletos.** Incluyen reglas
  `context` + `filler` + `structural`, pero no paquetes `dedup` / `ultra`, por lo que la intensidad
  `ultra` no es mayor que `full` para esos idiomas (utilizan únicamente sus propias reglas; no hay
  una conmutación por error silenciosa a las reglas `dedup`/`ultra` en inglés, lo que deformaría el texto extranjero).
  `en` / `es` / `id` / `pt-BR` están completos. Se agradecen contribuciones de `dedup.json` + `ultra.json`
  para los paquetes incompletos.
- **La telemetría apilada solo enumera los motores que realizaron compresión.** Un paso de una canalización apilada cuyo
  motor se ejecutó, pero produjo un ahorro del 0 %, devuelve `stats:null` y, por tanto, no aparece en
  `engineBreakdown`; resulta indistinguible de un paso que se omitió. Distinguir entre
  «ejecutado, 0 %» y «omitido» requeriría un cambio en el modelo de desglose y se ha pospuesto.

## Validación

Las puertas enfocadas para esta área son:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
