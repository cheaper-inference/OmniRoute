# 🗜️ Prompt Compression Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Ahorra automáticamente entre un 15 % y un 95 % del contexto elegible. Para obtener una descripción general rápida, consulta la [sección sobre compresión del README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Descripción general

OmniRoute implementa una canalización modular de compresión de prompts que se ejecuta **proactivamente** antes de que las solicitudes lleguen a los proveedores ascendentes. Esto significa que el ahorro de tokens se produce de forma transparente, sin necesidad de realizar cambios en tu flujo de trabajo.

```
Solicitud del cliente
  → Selector de estrategia de compresión
    → ¿Sobrescritura mediante combo? → Usar la configuración del combo
    → ¿Umbral de activación automática? → Usar el modo automático
    → ¿Modo predeterminado? → Usar la configuración global
    → ¿Desactivado? → Omitir la compresión
  → Modo de compresión seleccionado
    → Desactivado: Sin compresión
    → Ligero: Limpieza segura de espacios en blanco/formato (~15 %)
    → Estándar: Eliminación de contenido superfluo al estilo cavernícola (~30 %)
    → Agresivo: Envejecimiento del historial + resumen (~50 %)
    → Ultra: Poda heurística + reducción de bloques de código (~75 %)
    → RTK: Filtrado de terminal/salida de herramientas basado en comandos (intervalo ascendente del 60-90 %)
    → Apilado: Canalización ordenada con varios motores, normalmente RTK y después Caveman (intervalo elegible del 78-95 %)
  → Solicitud comprimida → Proveedor
```

---

## Modos de compresión

### Desactivado

No se aplica ninguna compresión. Todos los mensajes pasan sin cambios.

### Modo Lite (ahorro de ~15 %, latencia <1 ms)

El modo más seguro: limpieza del formato. Su truncamiento de resultados de herramientas es con pérdida, por lo que la ruta predeterminada (sin la autorización `allow-lossy`, `engine:lite` ni la activación de una combinación con nombre) ejecuta Lite con
`compressToolResults: false`: los resultados anteriores de las herramientas llegan sin cambios al proveedor.

| Técnica                  | Descripción                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Combina líneas en blanco consecutivas y espacios finales                                                                                  |
| `dedupSystemPrompt`      | Elimina mensajes del sistema duplicados                                                                                                   |
| `compressToolResults`    | Trunca los resultados anteriores de las herramientas al límite de Lite (con pérdida: solo con una autorización explícita en la solicitud) |
| `removeRedundantContent` | Elimina instrucciones repetidas                                                                                                           |
| `replaceImageUrls`       | Acorta los URI de datos de imágenes en base64                                                                                             |

**Ideal para:** Uso permanente y flujos de trabajo críticos para la seguridad.

### Modo Standard (ahorro de ~30 %)

Inspirado en [Caveman](https://github.com/JuliusBrussee/caveman): elimina palabras de relleno y expresiones verbosas, conservando el significado:

- Elimina palabras de relleno («please», «I think», «basically», «actually»)
- Condensa expresiones verbosas («in order to» → «to», «as a result of» → «because»)
- Elimina atenuantes corteses («Would you mind...», «If you could possibly...»)
- Más de 30 reglas de expresiones regulares optimizadas para solicitudes de programación

**Ideal para:** Flujos de trabajo diarios de programación y equipos preocupados por los costes.

### Modo Aggressive (ahorro de ~50 %)

Gestión inteligente del historial para sesiones largas:

- **Envejecimiento de mensajes**: los mensajes antiguos se comprimen progresivamente
- **Compresión de resultados de herramientas**: las salidas extensas de herramientas se truncan o se omiten (primeras/últimas líneas, filtrado por líneas coincidentes, compactación de claves JSON)
- **Protecciones de integridad estructural**: garantiza que los pares `tool_use` + `tool_result` mantengan la coherencia
- **Conocimiento de la ventana de contexto**: respeta los límites de tokens por modelo

**Ideal para:** Sesiones prolongadas de depuración y bases de código grandes.

### Modo Ultra (ahorro de ~75 %)

Compresión máxima para situaciones críticas en cuanto a tokens:

- **Poda heurística**: poda de tokens de la prosa basada en puntuaciones
- **Conservación de la estructura**: los bloques de código delimitados, el código en línea, las URL y los identificadores se marcan temporalmente y se vuelven a insertar literalmente; nunca se eliminan
- **Nivel SLM opcional**: un modelo local pequeño puede refinar la poda cuando está configurado
- Independiente del modo Aggressive: no ejecuta el envejecimiento de mensajes, la compresión de resultados de herramientas ni el resumidor alternativo (solo un fallo del nivel SLM puede dirigir un paso alternativo a través de Aggressive)

**Ideal para:** Cuando se alcanzan repetidamente los límites de contexto.

### Modo RTK (rango ascendente del 60-90 %)

El modo RTK está optimizado para las salidas detalladas de herramientas que aparecen en sesiones con agentes de programación:

- Detecta clases de comandos/salidas como `git status`, `git diff`, `git log`, ejecutores de pruebas, compilaciones de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorías/instalaciones de npm, registros de Docker, salidas de infraestructura y salidas genéricas del shell
- Aplica paquetes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros de esquema TOML v1 de RTK desde archivos `filters.toml` del proyecto o globales, con validación mediante pruebas en línea y control de confianza para los archivos del proyecto
- Incluye 56 filtros integrados con ejemplos de verificación en línea
- Elimina secuencias de control ANSI, barras de progreso, líneas repetidas y ruido no accionable
- Conserva fallos, errores, advertencias, archivos modificados, resúmenes y el final de las salidas extensas
- Admite filtros del proyecto sujetos a control de confianza, filtros globales y recuperación opcional de la salida sin procesar redactada

**Ideal para:** Sesiones de agentes con transcripciones de shell, compilaciones, pruebas, git, grep y salidas de archivos.

### Modo Stacked (rango elegible del 78-95 %)

El modo Stacked ejecuta varios motores de compresión en un orden determinista. La canalización predeterminada es:

```txt
RTK -> Caveman
```

Este orden mantiene primero compacta la salida de terminal/herramientas y, después, aplica la condensación semántica de Caveman a la solicitud restante en lenguaje natural. Las canalizaciones Stacked se pueden configurar globalmente o mediante combinaciones de compresión asignadas a combinaciones de enrutamiento.

**Ideal para:** Contextos mixtos con registros extensos de herramientas y también instrucciones humanas o resúmenes del asistente.

---

## Cálculo del ahorro upstream

OmniRoute documenta el ahorro por compresión a partir de dos fuentes: benchmarks de proyectos upstream y
la propia composición de motores de OmniRoute.

| Fuente  | Cifra del README upstream utilizada aquí                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menos tokens de salida, `65%` de ahorro medio de salida en benchmarks, rango de `22-87%` y herramienta de compresión de entrada de `~46%` |
| RTK     | `60-90%` de ahorro en la salida de comandos; sesión de ejemplo de `~118,000 -> ~23,900` tokens, o un `79.7%` ahorrado (`~80%`)                   |

Para las cargas de herramientas/contexto que se solapan, la combinación predeterminada de OmniRoute apila los motores:

```txt
RTK -> Caveman
```

El ahorro combinado es multiplicativo, no aditivo:

```txt
combinado = 1 - (1 - ahorro de RTK) * (1 - ahorro de entrada de Caveman)
promedio  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rango     = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ese valor de `78-95%` se aplica cuando tanto RTK como Caveman pueden reducir la misma carga de entrada/contexto.
El modo de salida de respuestas de Caveman es independiente: cuando está habilitado, utiliza el ahorro de salida propio de Caveman (`65%`
de promedio, `~75%` como cifra destacada, rango de `22-87%`). El ahorro total de facturación depende de la proporción entre prompts y salidas.

### Qué significa realmente "elegible"

El rango destacado de 15-95% es real, pero solo se aplica a contenido **redundante o verboso**: líneas de
error repetidas, un registro de compilación que repite constantemente la misma advertencia, un volcado sobredimensionado de `grep`/lectura de archivos. **No**
significa que cada solicitud ahorre esa cantidad.

Verificado empíricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): una
ejecución `stacked` (RTK + Caveman) sobre un bloque `tool_result` con formato de Anthropic que contenía 300 líneas
de error idénticas produjo un **95.93% de ahorro de tokens / 96.26% de ahorro de caracteres**, claramente dentro del rango
anunciado. Sin embargo, la misma canalización ejecutada sobre una salida de herramienta normal y no redundante (una lista limpia de coincidencias de `grep`,
una lectura breve de archivo, texto conversacional ordinario) produce correctamente un **ahorro casi nulo**, porque
no hay nada repetitivo que eliminar y `validateCompression()` (`validation.ts`) se niega a entregar una
reescritura que elimine o altere bloques de código, URLs, encabezados, versiones o identificadores de constantes en MAYÚSCULAS.

Este es un comportamiento esperado y seguro, no un error: una sesión de programación que principalmente lea/busque con grep en archivos limpios
obtendrá un ahorro total modesto incluso con la compresión completamente habilitada, mientras que una sesión que entre en un bucle fallido
o utilice un linter muy verboso obtendrá el rango completo de 78-95% sobre ese tráfico. No utilices el
bajo porcentaje de ahorro agregado de una sola sesión como prueba de que la compresión está mal configurada: comprueba primero si la
salida subyacente de la herramienta era realmente redundante.

---

## Visualización del ahorro de tokens

```
Sin compresión:       47K tokens enviados al LLM
Con Lite:             40K tokens enviados          (15% ahorrado — seguro, siempre activo)
Con Standard:         33K tokens enviados          (30% ahorrado — reglas de habla cavernícola)
Con Aggressive:       24K tokens enviados          (50% ahorrado — envejecimiento + resumen)
Con Ultra:            12K tokens enviados          (75% ahorrado — poda heurística)
Con RTK:              19K-5K tokens enviados       (60-90% ahorrado en la salida de comandos/herramientas)
Con Stacked:          10K-2.5K tokens enviados     (rango elegible de RTK+Caveman del 78-95%)
```

---

## Configuración

### Panel

Navega a `Dashboard → Context & Cache`:

- **Caveman** — selección del modo, paquetes de idiomas, vista previa y valores predeterminados globales
- **RTK** — vista previa del filtro de comandos, configuración de seguridad de RTK y catálogo de filtros
- **Compression Combos** — canalizaciones de motores con nombre asignadas a combos de enrutamiento
- **Auto-Trigger Threshold** — activa automáticamente la compresión cuando el recuento de tokens supera el umbral

### Anulación por combo

En `Dashboard → Context & Cache → Compression Combos`, asigna un combo de compresión a un
combo de enrutamiento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Esto te permite usar compresión apilada en proveedores gratuitos o de programación, mientras mantienes
el modo lite en las suscripciones de pago.

Esta asignación de **"Per-Combo Override"** es un control diferente de la anulación del **modo de
compresión del combo de enrutamiento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses;
el esquema del campo también acepta `rtk`, `stacked` y `omniglyph`): dicha anulación no selecciona
una canalización de combo de compresión con nombre; simplemente establece el campo
`compressionMode` que consulta `resolveCompressionPlan`. Se puede establecer en la tarjeta del combo
(`Dashboard → Combos`) o, desde #6760, por combo de enrutamiento en la lista "Assign to routing" de
`Dashboard → Context & Cache → Compression Combos`, justo al lado de la casilla de asignación de
canalización documentada anteriormente. Ambas superficies persisten mediante el mismo endpoint
`PUT /api/combos/{id}`.

### Anulación por solicitud

Envía el encabezado de solicitud `x-omniroute-compression` para anular el plan de compresión de una
sola solicitud. Tiene la precedencia más alta: prevalece sobre la anulación del combo de enrutamiento,
el perfil activo, el activador automático y el valor predeterminado del panel. Los valores
desconocidos se ignoran (la solicitud nunca se rechaza) y el interruptor maestro global sigue
controlándolo todo: cuando la compresión está desactivada globalmente, el encabezado no puede
activarla. Valores:

| Valor         | Efecto                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Sin compresión para esta solicitud.                                                                                                 |
| `default`     | El perfil Default derivado del panel (ignora el perfil activo). Los motores con pérdida quedan desactivados.                        |
| `safe`        | Igual que omitir el encabezado.                                                                                                     |
| `allow-lossy` | Mantiene el plan del operador para esta solicitud, incluidos los resúmenes, los filtros de relevancia y las reescrituras de estilo. |
| `engine:<id>` | Un único motor cuando está habilitado, por ejemplo, `engine:rtk`. Es la activación explícita de ese motor por solicitud.            |
| `<combo>`     | Un combo con nombre, identificado primero por nombre (sin distinguir mayúsculas y minúsculas) y después por id.                     |

Sin `allow-lossy`, `engine:<id>` o un combo con nombre, los motores con pérdida no se aplican. Cuando
se degrada un valor Default, un activador automático o una anulación de enrutamiento con pérdida,
OmniRoute conserva los pasos sin pérdida reconocidos de la canalización apilada configurada, en el
orden configurado. Solo recurre a `session-dedup → lite` cuando no sobrevive ningún paso sin pérdida
configurado.

La vista previa **Effective pipeline** del panel Settings muestra el plan ordinario en reposo. Cuando
puede ejecutarse un activador automático, la misma vista previa también muestra su canalización
efectiva condicional, de modo que la resolución del panel y la resolución del tiempo de ejecución sin
encabezado permanezcan alineadas.

El plan aplicado se devuelve en el encabezado de respuesta
`X-OmniRoute-Compression: <mode>; source=<source>`, donde `<source>` es uno de
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` u `off`.

### API

```bash
# Obtener la configuración de compresión
curl http://localhost:20128/api/settings/compression

# Actualizar la configuración de compresión
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Obtener una vista previa de una carga útil RTK/stacked específica
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Enumerar los paquetes de filtros de RTK
curl http://localhost:20128/api/context/rtk/filters

# Probar RTK directamente con metadatos de comando opcionales
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Qué se protege

El motor de compresión **siempre conserva:**

- ✅ Bloques de código (delimitados y en línea)
- ✅ URLs y rutas de archivo
- ✅ Estructuras JSON y datos estructurados
- ✅ Identificadores y tokens técnicos protegidos
- ✅ Expresiones matemáticas
- ✅ Definiciones de llamadas a herramientas/funciones
- ✅ Prompts del sistema (en modo lite)

La recuperación de salida sin procesar de RTK censura claves de API comunes, tokens de portador, tokens de Slack, claves de acceso de AWS,
contraseñas, tokens y secretos antes de que se conserve cualquier dato.

---

## Estadísticas de compresión

Cada solicitud comprimida incluye estadísticas en los registros del servidor:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Hoja de ruta por fases

| Fase    | Modos                                                                                                                                                            | Estado       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Fase 1  | Desactivado, Lite                                                                                                                                                | ✅ Publicada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                      | ✅ Publicada |
| Fase 3  | RTK, Stacked, combinaciones de compresión                                                                                                                        | ✅ Publicada |
| Fase 4  | Estilos de salida, Ultra de nivel SLM, conjunto de evaluación                                                                                                    | ✅ Publicada |
| Fase 4C | Presupuesto de contexto adaptativo («dial») — motor de cálculo + API (`contextBudget` en `PUT /api/settings/compression`) + controles de modo/política del panel | ✅ Publicada |

---

## Agradecimientos

Las reglas de compresión del modo Standard están inspiradas en **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ más de 51 000) — el proyecto viral «why use many token when few token do trick». Caveman informa de `~75%` menos tokens de salida, un ahorro medio de salida del `65%` en pruebas comparativas, un intervalo de salida del `22-87%` y una herramienta de compresión de entrada de `~46%`.

El modo RTK está inspirado en **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** de **[RTK AI](https://github.com/rtk-ai)** — el proyecto de compresión de salida de comandos de alto rendimiento para terminales, compilaciones, pruebas, git y filtrado de salida de herramientas. RTK informa de un ahorro del `60-90%`, y la sesión de ejemplo de su README muestra un ahorro de `~80%`.

---

## Sistemas de compresión avanzados

Más allá de los 7 modos descritos anteriormente (la fuente también acepta los modos `codex-responses` y `omniglyph`, que esta guía no cubre), las secciones siguientes cubren características que funcionan dentro o junto a esos modos: La compresión de resultados de la herramienta y el envejecimiento progresivo son los pasos 1 y 2 del motor agresivo (modo agresivo y un paso `aggressive` de una canalización apilada), la canalización apilada es cómo se ejecuta el modo apilado, la compresión compatible con caché degrada `aggressive` y `ultra` a `standard` para proveedores de almacenamiento en caché. mientras la compresión está activada, y el Modo de salida de Caveman y los Estilos de salida son instrucciones de aviso del sistema opcionales, desactivadas de forma predeterminada, que dan forma a la salida del modelo en lugar de comprimir la solicitud.

### Compresión basada en caché

Algunos proveedores (como Anthropic con almacenamiento en caché rápido) admiten** almacenamiento en caché rápido** , lo que les permite almacenar en caché partes del mensaje para reducir costos y latencia. Cuando el almacenamiento en caché está habilitado, la compresión agresiva puede en realidad** herir** rendimiento porque cambia los tokens almacenados en caché, invalidando el caché.

El módulo `cachingAware.ts` resuelve esto mediante** detectando el contexto de almacenamiento en caché** y** ajustando la estrategia de compresión** respectivamente.

#### como funciona

1. **Detectar contexto de almacenamiento en caché** — escanea el cuerpo de la solicitud en busca de marcadores `cache_control`
2. **Identificar proveedores de almacenamiento en caché** — Comprueba si el proveedor de destino admite el almacenamiento en caché
3. **Ajustar estrategia** — Degrada `aggressive`/`ultra` a `standard` para proveedores de almacenamiento en caché
4. **Saltar aviso del sistema** Las indicaciones del sistema — generalmente se almacenan en caché, así que no las comprima

El asistente de estrategia también devuelve una bandera `deterministicOnly`, pero el creador del plan consume solo la estrategia — nada en sentido posterior lee la bandera hoy.

#### Ejemplo de código

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### cuando usar

La compresión con reconocimiento de caché es** siempre encendido** — no se necesita configuración. Se activa siempre que la compresión está activada y el proveedor de destino admite el almacenamiento en caché (Anthropic, OpenAI, etc.); Los marcadores `cache_control` explícitos no son necesarios — un proveedor de almacenamiento en caché por sí solo desencadena la degradación, y los marcadores por sí solos nunca lo hacen (la detección de marcadores alimenta la telemetría de la caché, no la decisión de estrategia).

OpenRouter cuenta como proveedor de almacenamiento en caché solo para los modelos `anthropic/*` : las solicitudes de código Claude mantienen sus puntos de interrupción `cache_control` (4 como máximo) y la protección protege el prefijo, mientras que todas las demás familias OpenRouter (`openai/`, `google/`, `qwen/`,…) permanecen despojadas y sin protección.

### Envejecimiento progresivo

Las conversaciones largas acumulan muchos mensajes, pero los más antiguos se vuelven menos relevantes. El módulo `progressiveAging.ts`** degrada los mensajes por distancia de giro** (distancia medida desde el final de la conversación). Con los valores predeterminados enviados (`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distancia ≤ 2)** : Mantenido palabra por palabra
- **Distancia 3** : Compresión cavernícola (eliminación de relleno)
- **Distancia 4 +** : Mensajes del asistente resumidos; mensajes de usuario reducidos a su primera línea, con un límite de 120 caracteres; otros roles intactos. Las indicaciones del sistema, los mensajes ya antiguos y el último mensaje del usuario siempre se guardan palabra por palabra, independientemente de la distancia. No se elimina nada por completo y la banda `light` es inalcanzable con los valores predeterminados enviados (`light` es igual `verbatim`).

#### Ejemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### cuando usar

El envejecimiento progresivo es** siempre encendido** para el modo `aggressive` — es el paso 2 de `compressAggressive()`. El modo Ultra no lo ejecuta. Es particularmente eficaz para:

- Sesiones de codificación de larga duración
- Conversaciones de varios días
- Flujos de trabajo agentes con muchas llamadas de herramientas

### Modo de salida cavernícola

Se agrega el modo de salida cavernícola** instrucciones del sistema** que le piden al modelo en sí una salida concisa — el nivel `lite` pide respuestas concisas que mantengan oraciones completas, `full` le pide que "responda concisamente como un cavernícola inteligente" y `ultra` le pide una salida telegráfica; Las instrucciones solo lo piden, no pueden garantizarlo. Las solicitudes las reciben a través de `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` primero resuelve la selección con la corrección de retrocompatibilidad (`resolveOutputStyleSelection()` en `open-sse/services/compression/outputStyles/backCompat.ts`), que, mientras `outputStyles` está vacío, asigna un `cavemanOutputMode` habilitado al estilo de salida `terse-prose` en `cavemanOutputMode.intensity` (consulte Retrocompatibilidad a continuación); una selección `outputStyles` no vacía se usa tal cual, y `cavemanOutputMode.enabled` y `intensity` no tienen ningún efecto, mientras que su alternancia `autoClarity` aún se aplica. `outputMode.ts` contiene los textos de instrucciones (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), la omisión de contenido y el ayudante de ubicación que utiliza la inyección; su propio inyector `applyCavemanOutputMode()` no tiene un llamador de producción.

#### como funciona

Este modo no comprime la entrada. Agrega un bloque de instrucciones al indicador del sistema (consulte Cómo funciona la inyección a continuación), y cualquier modo de compresión de entrada seleccionado para la solicitud aún se ejecuta después, en el cuerpo que ahora lleva el bloque. Antes de la cláusula de límites compartidos con la que termina cada nivel, el nivel `full` en inglés dice:

> "Responde concisamente como un hombre de las cavernas inteligente. Elimina artículos (a/an/the), relleno (just/really/basically/actually/simply), bromas, coberturas. Fragmentos OK. Sinónimos cortos (grande, no extenso, arregla, no implementa). Mantén toda la sustancia técnica, el código, los errores, URLs y los identificadores exactos".

Esto funciona particularmente bien para:

- Generación de código (salida más tersa = menos tokens)
- Preguntas y respuestas rápidas (sin necesidad de explicaciones elaboradas)
- Procesamiento por lotes (maximizar el rendimiento)

#### cuando usar

El modo de salida cavernícola es** optar por** . Con la compresión activada (`enabled: true`, el interruptor maestro en la página Configuración de compresión), actívela con `cavemanOutputMode.enabled`; `intensity` elige `lite`, `full` o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Un combo de compresión** Modo de salida** toggle (`outputMode`, nivel en `outputModeIntensity`) establece el mismo interruptor para las solicitudes a las que se aplica combo, y la herramienta `omniroute_set_compression_engine` MCP lo escribe a través de su argumento booleano `outputMode`. Una selección `outputStyles` que no esté vacía tiene prioridad sobre este modificador. En el tablero, habilitando el** prosa concisa** El estilo de salida inyecta el mismo bloque (consulte Estilos de salida a continuación).

### Estilos de salida (catálogo)

El modo de salida cavernícola anterior es el** ruta heredada de estilo único** . La fase 4 lo generalizó en un catálogo de estilos de salida componibles: `OUTPUT_STYLE_CATALOG` en `open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo es una instrucción del sistema que solicita al propio modelo una salida más económica; Los estilos se pueden habilitar juntos y se inyectan en el orden del catálogo.

| Estilo                                          | `id`            | que hace                                                                                                                                                                                                                                                               | Idiomas de instrucción                        |
| ----------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| prosa concisa                                   | `terse-prose`   | Soltar filler/articles/hedging; mantener exacta la sustancia técnica. El mismo texto que el modo de salida heredado del cavernícola (referenciado, no reescrito).                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menos código                                    | `less-code`     | Escalera YAGNI : cambio de trabajo más pequeño, sin abstracciones no solicitadas.                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Cola de caballo (desarrollador senior perezoso) | `ponytail`      | "El mejor código es el código que nunca se escribe": reutilizar la reescritura >, causa raíz del síntoma >, diferencia de trabajo más corta.                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tengo ADHD (acción-primero)                     | `i-have-adhd`   | Acción primero (command/path/snippet antes de prosa), pasos acotados numerados, ONE siguiente paso concreto, no preamble/recap/closers. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtro UI antideslizamiento                     | `antislop-ui`   | Cada técnica visual debe pasar una prueba de propósito (jerarquía, identidad, legibilidad); sin gradients/glass/glow predeterminado, paleta limitada, sin diseños de plantilla. Ambos estilos anti-slop añaden un límite sin controles muertos ni reclamos fabricados. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Copia antislop y filtro humano.                 | `antislop-copy` | Copia específica (sin em dash, CTAs genérico, palabras de moda, cierres de chatbot, hechos inventados) más reglas de personas: contraste WCAG AA, enfoque visible, alcance del teclado, estados empty/loading/error, reflujo móvil.                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Conciso CJK (文言)                              | `terse-cjk`     | respuesta `full`/`ultra` en chino clásico (文言); `lite` solo pide respuestas breves sin palabras funcionales, bromas ni adornos.                                                                                                                                      | zh (localizado, ver más abajo)                |

Cada estilo incluye tres niveles de intensidad — `lite`, `full`, `ultra` — y cada nivel termina con la cláusula de límites compartidos (`SHARED_BOUNDARIES` en `outputMode.ts`), que mantiene exactos los bloques de código, rutas de archivos, comandos, errores y URLs. Los textos de nivel `terse-prose` y `terse-cjk` añaden identificadores a esa lista.

`terse-cjk` tiene acceso local a `zh` en dos lugares. La página Configuración de compresión enumera su fila solo cuando el idioma UI del panel es chino (`zh-CN` o `zh-TW`), y `applyOutputStyles()` la inyecta solo cuando el idioma resuelto de la solicitud (consulte Selección de idioma a continuación) es `zh`. Ocultar la fila no borra una selección `terse-cjk` guardada: la configuración API acepta cualquier ID de estilo y guardar otros estilos en la página la mantiene. En el momento de la solicitud, la verificación de idioma `applyOutputStyles()` es la única puerta de acceso local.

#### Cómo funciona la inyección

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resuelve la selección en el catálogo (los identificadores desconocidos y los estilos que no coinciden con la configuración regional se descartan, nunca es un error; una selección que no se resuelve en ningún estilo deja el cuerpo sin cambios, se omite como `no_styles`), concatena las instrucciones seleccionadas en el orden del catálogo, agrega la cláusula de límites** una vez** (más la cláusula de seguridad, `SAFETY_BOUNDARIES` o su traducción, cuando se selecciona `less-code` o `ponytail` ), y comienza el bloque con un único marcador de idempotencia (`[OmniRoute Output Styles]`), por lo que volver a aplicar no es una operación. Cuando el idioma resuelto (consulte Selección de idioma a continuación) tiene una traducción, se inyecta la instrucción localizada en lugar del inglés.

En un cuerpo con una matriz `messages` no vacía, la verificación de idempotencia se ejecuta antes de omitir el contenido: cuando el marcador `[OmniRoute Output Styles]` ya está en el campo `system` de nivel superior (una cadena o una matriz de bloques de contenido) o en un mensaje del sistema con contenido de cadena, el cuerpo se deja sin cambios como `already_applied` y no se ejecuta ninguna verificación de palabras clave. De lo contrario, una omisión de contenido (`shouldBypassCavemanOutputMode()` en `open-sse/services/compression/outputMode.ts`) verifica el texto de los últimos tres mensajes, cualquiera que sea su función, y omite los estilos durante todo el turno cuando ese texto coincide con sus palabras clave de seguridad, acción irreversible o aclaración, o una secuencia sensible al orden: `first`, `then`, `after that`, `before`, `rollback` o `backup` seguido dentro de 240 caracteres por `delete`, `drop`, `migrate`, `deploy` o `release`. . El bypass funciona mientras el** Omisión de claridad automática** alternar (`cavemanOutputMode.autoClarity`, activado de forma predeterminada) está activado; Al desactivar la opción se omite la verificación de palabras clave.

Cuando el bypass deja pasar el giro, `placeSystemInstruction()` (mismo archivo), que nunca crea un nuevo `messages[0]`, coloca el bloque en el primero de estos que encuentra:

1. Un mensaje inicial del sistema con contenido de cadena: el bloque se agrega después de su texto.
2. El campo `system` de nivel superior: el bloque se agrega después del texto de una cadena o se agrega como un nuevo bloque de texto a una matriz de bloques de contenido.
3. El primer mensaje posterior del sistema con contenido de cadena: el bloque se agrega después de su texto.
4. Ninguno de los anteriores: el bloque entra en un nuevo mensaje del sistema al final de `messages`.

En un cuerpo sin una matriz `messages` (o con una vacía), no se ejecuta ninguna omisión de contenido y no se consulta un campo `system` de nivel superior. El bloque se agrega después del texto de un campo `instructions` de cadena, a menos que ese campo ya contenga el marcador `[OmniRoute Output Styles]`, en cuyo caso el cuerpo se deja sin cambios como `already_applied`. Cuando el cuerpo no tiene un campo `instructions` de cadena pero lleva `input` (una cadena o una matriz), el bloque se convierte en `instructions`, reemplazando cualquier valor que no sea una cadena que contenga ese campo. Un cuerpo sin un campo `instructions` de cadena ni una cadena o matriz `input` no se modifica y se omite como `no_messages`.

#### Cómo habilitar

En el tablero:** Contexto de compresión Configuración de compresión →** (`/dashboard/context/settings`), sección de estilos de salida: una fila por estilo con un interruptor on/off y un selector de nivel. Los estilos se inyectan mientras la compresión está activada (el interruptor principal de la página, `enabled`). El** Omisión de claridad automática** alternar está en el** Cavernícola** página (`/dashboard/context/caveman`), en su** Modo de salida** tarjeta. Mediante programación, la configuración de compresión persiste la selección como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Retrocompatibilidad: mientras `outputStyles` está vacío, la configuración `cavemanOutputMode.enabled` heredada se asigna a `terse-prose` en `cavemanOutputMode.intensity`. Luego, el bloque comienza con el marcador `[OmniRoute Output Styles]`, donde el inyector `applyCavemanOutputMode()` heredado escribió `[OmniRoute Caveman Output Mode]`. Debajo del marcador, el texto coincide con la inyección heredada en en, pt-BR, es, de, fr, it, ru, id y vi; en ja y zh lleva un espacio adicional antes de la cláusula de límites. `terse-prose` se traduce a pt-BR, es, de, fr, it, ru, zh, ja, id y vi, por lo que una solicitud cuyo idioma resuelto es `hu` obtiene el texto en inglés donde el inyector heredado usó el húngaro.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

La matriz de lenguaje de estilo × está fijada por `tests/unit/compression/output-styles-i18n-matrix.test.ts`: cada estilo de catálogo necesita una entrada en el `BASELINE_LANGUAGES` de la prueba; un estilo que no está controlado por la configuración regional debe enviar una traducción pt-BR (el `terse-cjk` controlado por la configuración regional está exento de esta regla) a menos que esté listado en `KNOWN_ENGLISH_ONLY`, que puede contener solo estilos sin ninguna traducción — si un estilo listado que tiene alguna traducción no pasa la prueba; y un estilo no pasa la prueba cuando pierde un idioma que su entrada `BASELINE_LANGUAGES` enumera. Para agregar un estilo, consulte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compresión de resultados de herramientas

`compressToolResult()` en `open-sse/services/compression/toolResultCompressor.ts` comprime el texto del resultado de la herramienta con** 5 estrategias** . Los prueba en este orden y la primera estrategia habilitada cuya verificación coincida con el contenido decide el resultado:

1. **`fileContent`** : contenido de 3 o más líneas en el que al menos una línea, ignorando la sangría inicial, comienza con `import `, `export `, `function `, `class `, `const `, `let `, `var ` o `return ` (la palabra clave más un espacio), o con `if`, `for` o `while` seguido de `(` o ` (`, mantiene sus primeras 20 y últimas 5 líneas, con el medio elidido marcado.
2. **`grepSearch`** : contenido con al menos una línea del formato `<path>:<digits>:`, donde el texto antes de los primeros dos puntos no tiene espacios en blanco, mantiene solo esas líneas, como máximo 30, seguidas de un recuento de las coincidencias adicionales y la lista de archivos coincidentes; cada dos líneas se eliminan. Una de esas líneas es suficiente para activar la estrategia, por lo que también cuenta una línea de registro que comienza con una marca de tiempo como `12:30:45`.
3. **`shellOutput`** : la salida que contiene una secuencia ANSI CSI (`ESC[` luego dígitos o punto y coma luego una letra, como en los códigos de color) o un `$` seguido de espacios en blanco en cualquier parte del texto pierde esas secuencias (se mantienen otros escapes, como `ESC[?25l` o una secuencia de título de ventana OSC ) y mantiene sus últimas 50 líneas, con líneas repetidas consecutivas colapsadas. Debido a que esta verificación se ejecuta antes de `json` y `errorMessage`, JSON o la salida de error que contiene dicho `$` nunca llega a ellos mientras `shellOutput` está activado.
4. **`json`** : se resume una carga útil JSON de más de 2000 caracteres que comienza con `{` o `[` (después de un espacio en blanco opcional) y se analiza: una matriz de más de 7 elementos mantiene sus primeros 5 y últimos 2 elementos y su recuento total, y un objeto mantiene sus primeras 20 claves, con cada objeto anidado o valor de matriz reemplazado por un marcador de posición `{…N keys}` (para una matriz, N es su longitud) y un marcador `_remaining_<N>_keys` que cuenta las claves eliminadas más allá de las primeras 20. Los valores escalares se copian completos, por lo que un objeto de 20 claves o menos sin valores anidados solo se vuelve a sangrar — uno minificado gana caracteres y permanece sin cambios.
5. **`errorMessage`** : salida que contiene, en cualquier lugar y en cualquier letra mayúscula, `error:`, `error ` (la palabra seguida de un espacio, como en `no error found`), `[error]`, `exception:`, `exception `, `[exception]` o `traceback` mantiene su primera línea, las siguientes 10 líneas y las últimas 3, con un marcador `… [N frames elided] …` en lugar de las líneas entre ellas. El marcador aparece solo cuando más de 13 líneas siguen a la primera línea, por lo que la salida de error de 14 líneas o menos no se acorta (en 12 o 13 líneas, las últimas 3 líneas repetidas ya se mantienen).

Después de que una estrategia coincide, incluso una que no ahorra nada, las estrategias posteriores no se prueban. Cuando la estrategia de coincidencia no guarda tokens estimados (longitud ÷ 4, redondeado hacia arriba) — por ejemplo, un archivo similar a un código de 25 líneas o menos, o una matriz JSON de más de 2000 caracteres con 7 elementos o menos — el motor agresivo mantiene el resultado original de la herramienta: ambas personas que llaman (`compressAggressive()` y `compressAnthropicToolResultBlock()`) conservan el original cuando `saved` es 0 o menos, mientras que `compressToolResult()` sigue devolviendo el resultado de esa estrategia. El paso de resultado de la herramienta no es la última palabra: el resumidor alternativo del motor aún puede acortar un mensaje `tool` o `function` de más de 8192 caracteres (`maxTokensPerMessage`, 2048, multiplicado por 4).

#### cuando usar

La compresión de resultados de la herramienta es el paso 1 del motor agresivo (`compressAggressive()` en `open-sse/services/compression/aggressive.ts`), por lo que se ejecuta en modo agresivo y en un paso `aggressive` de una canalización apilada. Comprime los mensajes `tool` y `function` en forma de OpenAI y el texto dentro de los bloques Anthropic `tool_result`. Cada estrategia tiene su propio interruptor en `aggressive.toolStrategies`, todo activado de forma predeterminada. En el tablero, los interruptores están en la página de Caveman.** Avanzado** ver mientras la compresión está activada y el modo predeterminado es Agresivo.

### Tubería apilada

El modo apilado se ejecuta** múltiples motores en secuencia** — generalmente RTK primero (60-90% de ahorro en la salida de la herramienta), luego Caveman en el texto restante (~ 46% de ahorro en la entrada). Compuesto, ese es el** 78-95% rango elegible** (consulte Matemáticas de ahorro ascendentes arriba): `1 - (1 - 0.60..0.90) × (1 - 0.46)` promedia ≈ 89%.

#### como funciona

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### cuando usar

Utilice el modo apilado para:

- Flujos de trabajo con muchas herramientas (codificación agente, investigación)
- Procesamiento por lotes económico
- Cuando necesita el máximo ahorro de tokens

Las canalizaciones apiladas se configuran a través de la configuración de compresión `stackedPipeline` global, o mediante un combo de compresión con nombre asignado a un combo de enrutamiento (consulte Anulación por combo más arriba) — no a través de un `modePack` de combo automático (ese campo solo vuelve a ponderar la selección del modelo de combo automático y `stacked` no es un nombre de paquete válido).

---

## Anulaciones de combinación de compresión

Puede anular el modo de compresión global **por combinación** para ajustar con precisión el comportamiento
en distintos casos de uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Esto resulta útil para:

- **Combinaciones de programación**: Use el modo `aggressive` para sesiones largas
- **Combinaciones de preguntas y respuestas rápidas**: Use el modo `lite` para obtener respuestas rápidas
- **Combinaciones con uso intensivo de herramientas**: Use el modo `stacked` para maximizar el ahorro
- **Combinaciones de producción**: deje desactivada la anulación para los proveedores con almacenamiento en caché; el ajuste siempre activo
  que tiene en cuenta la caché cambia automáticamente `aggressive`/`ultra` a `standard`
  (no existe un modo `cache-aware` seleccionable)

---

## Véase también

- [Configuración del entorno](../reference/ENVIRONMENT.md) — Variables de entorno de compresión
- [Guía de arquitectura](../architecture/ARCHITECTURE.md) — Funcionamiento interno de la canalización de compresión
- [Guía del usuario](../guides/USER_GUIDE.md) — Primeros pasos con la compresión
- [Compresión RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confianza, puerta de verificación y recuperación de la salida sin procesar
- [Motores de compresión](./COMPRESSION_ENGINES.md) — Caveman, RTK, apilamiento, API, MCP y panel de control
- [Formato de las reglas de compresión](./COMPRESSION_RULES_FORMAT.md) — Formato del paquete de reglas JSON
- [Paquetes de idiomas de compresión](./COMPRESSION_LANGUAGE_PACKS.md) — Reglas de Caveman específicas de cada idioma
