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

### Modo ligero (~15 % de ahorro, <1 ms de latencia)

El modo más seguro: ningún cambio semántico, solo limpieza de formato:

| Técnica                  | Descripción                                              |
| ------------------------ | -------------------------------------------------------- |
| `collapseWhitespace`     | Fusiona líneas en blanco consecutivas y espacios finales |
| `dedupSystemPrompt`      | Elimina mensajes del sistema duplicados                  |
| `compressToolResults`    | Comprime salidas detalladas de herramientas/funciones    |
| `removeRedundantContent` | Elimina instrucciones repetidas                          |
| `replaceImageUrls`       | Acorta los URI de datos de imágenes en base64            |

**Ideal para:** Uso permanente y flujos de trabajo críticos para la seguridad.

### Modo estándar (~30 % de ahorro)

Inspirado en [Caveman](https://github.com/JuliusBrussee/caveman): elimina palabras de relleno y expresiones innecesariamente largas, a la vez que preserva el significado:

- Elimina palabras de relleno («por favor», «creo que», «básicamente», «en realidad»)
- Condensa frases innecesariamente largas («con el fin de» → «para», «como resultado de» → «debido a»)
- Elimina expresiones corteses e indirectas («¿Te importaría...?», «Si fuera posible...»)
- Más de 30 reglas regex ajustadas para prompts de programación

**Ideal para:** Flujos de trabajo diarios de programación y equipos que buscan reducir costes.

### Modo agresivo (~50 % de ahorro)

Gestión inteligente del historial para sesiones largas:

- **Envejecimiento de mensajes** — los mensajes más antiguos se comprimen progresivamente
- **Compresión de resultados de herramientas** — las salidas largas de herramientas se truncan u omiten (primeras/últimas líneas,
  filtrado de líneas coincidentes, compactación de claves JSON)
- **Protecciones de integridad estructural** — garantizan que los pares `tool_use` + `tool_result` permanezcan coherentes
- **Consideración de la ventana de contexto** — respeta los límites de tokens de cada modelo

**Ideal para:** Sesiones prolongadas de depuración y grandes bases de código.

### Modo ultra (~75 % de ahorro)

Compresión máxima para situaciones en las que los tokens son críticos:

- **Poda heurística** — poda de tokens de texto en prosa basada en puntuaciones
- **Preservación de la estructura** — los bloques de código delimitados, el código en línea, las URL y los identificadores se
  sustituyen temporalmente y se vuelven a insertar literalmente; nunca se podan
- **Nivel SLM opcional** — un pequeño modelo local puede refinar la poda cuando está configurado
- Independiente del modo agresivo: no ejecuta el envejecimiento de mensajes, la compresión de resultados de herramientas
  ni el resumidor alternativo (solo un fallo del nivel SLM puede dirigir una pasada alternativa a través
  del modo agresivo)

**Ideal para:** Cuando alcanzas repetidamente los límites de contexto.

### Modo RTK (intervalo ascendente del 60-90 %)

El modo RTK está optimizado para las salidas detalladas de herramientas que aparecen en las sesiones de agentes de programación:

- Detecta clases de comandos/salidas como `git status`, `git diff`, `git log`, ejecutores de pruebas,
  compilaciones de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorías/instalaciones de npm, registros de Docker, salidas de infraestructura
  y salidas genéricas del shell
- Aplica paquetes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros del esquema TOML v1 de RTK desde archivos `filters.toml` del proyecto o globales, con validación mediante pruebas
  en línea y control de confianza para los archivos del proyecto
- Incluye 55 filtros integrados con muestras de verificación en línea
- Elimina secuencias de control ANSI, barras de progreso, líneas repetidas y ruido que no permite tomar medidas
- Conserva fallos, errores, advertencias, archivos modificados, resúmenes y la parte final de las salidas largas
- Admite filtros de proyecto con control de confianza, filtros globales y recuperación opcional de la salida sin procesar redactada

**Ideal para:** Sesiones de agentes con transcripciones de shell, compilación, pruebas, git, grep y salidas de archivos.

### Modo apilado (intervalo elegible del 78-95 %)

El modo apilado ejecuta varios motores de compresión en un orden determinista. La canalización predeterminada es:

```txt
RTK -> Caveman
```

Ese orden compacta primero la salida de terminal/herramientas y, después, aplica la condensación semántica de Caveman al
prompt restante en lenguaje natural. Las canalizaciones apiladas pueden configurarse globalmente o mediante
combos de compresión asignados a combos de enrutamiento.

**Ideal para:** Contexto mixto con grandes registros de herramientas, además de instrucciones humanas o resúmenes del asistente.

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

Ve a `Panel → Contexto y caché`:

- **Caveman** — selección de modo, paquetes de idioma, vista previa y valores predeterminados globales
- **RTK** — vista previa del filtro de comandos, configuración de seguridad de RTK y catálogo de filtros
- **Combinaciones de compresión** — canalizaciones de motores con nombre asignadas a combinaciones de enrutamiento
- **Umbral de activación automática** — activa automáticamente la compresión cuando el número de tokens supera el umbral

### Anulación por combinación

En `Panel → Contexto y caché → Combinaciones de compresión`, asigna una combinación de compresión a una
combinación de enrutamiento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Esto permite usar compresión apilada con proveedores gratuitos o de programación, mientras se mantiene
el modo Lite en las suscripciones de pago.

Esta asignación de "anulación por combinación" es un control distinto de la anulación del **modo de
compresión de la combinación de enrutamiento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses;
el esquema del campo también acepta `rtk`, `stacked` y `omniglyph`): esa anulación no selecciona una
canalización de combinación de compresión con nombre; simplemente establece el campo `compressionMode`
consultado por `resolveCompressionPlan`. Puede configurarse en la tarjeta de la combinación
(`Panel → Combinaciones`) o, desde #6760, por combinación de enrutamiento en la lista "Asignar al
enrutamiento" de `Panel → Contexto y caché → Combinaciones de compresión`, justo al lado de la casilla
de asignación de canalización documentada anteriormente. Ambas interfaces guardan los cambios mediante
el mismo endpoint `PUT /api/combos/{id}`.

### Anulación por solicitud

Envía el encabezado de solicitud `x-omniroute-compression` para anular el plan de compresión de una sola
solicitud. Tiene la máxima prioridad: prevalece sobre la anulación de la combinación de enrutamiento,
el perfil activo, la activación automática y el valor Default del panel. Los valores desconocidos se
ignoran (la solicitud nunca se rechaza) y el interruptor maestro global sigue controlándolo todo: cuando
la compresión está desactivada globalmente, el encabezado no puede activarla. Valores:

| Valor         | Efecto                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `off`         | Sin compresión para esta solicitud.                                                                                     |
| `default`     | El perfil Default derivado del panel (ignora el perfil activo). Los motores con pérdida permanecen desactivados.        |
| `safe`        | Igual que omitir el encabezado: solo deduplicación y compactación de espacios en blanco.                                |
| `allow-lossy` | Mantiene el plan del operador para esta solicitud, incluidos resúmenes, filtros de relevancia y reescrituras de estilo. |
| `engine:<id>` | Un único motor cuando está habilitado, p. ej., `engine:rtk`. Esta es la activación por solicitud para ese motor.        |
| `<combo>`     | Una combinación con nombre; primero se busca por nombre (sin distinguir mayúsculas y minúsculas) y después por id.      |

Sin `allow-lossy`, `engine:<id>` o una combinación con nombre, no se aplican motores con pérdida. La
solicitud sigue recibiendo deduplicación de sesión y compactación de espacios en blanco cuando la
compresión está activada.

El plan aplicado se devuelve en el encabezado de respuesta
`X-OmniRoute-Compression: <mode>; source=<source>`, donde `<source>` es uno de `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` u `off`.

### API

```bash
# Obtener la configuración de compresión
curl http://localhost:20128/api/settings/compression

# Actualizar la configuración de compresión
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previsualizar una carga útil RTK/stacked específica
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

Además de los 7 modos descritos anteriormente (el código fuente también acepta los modos
`codex-responses` y `omniglyph`, que esta guía no aborda), las secciones siguientes cubren funciones
que operan dentro de esos modos o junto a ellos: la compresión de resultados de herramientas y el envejecimiento progresivo
son los pasos 1 y 2 del motor agresivo (el modo Aggressive y un paso `aggressive` de una
canalización apilada), la canalización apilada es el mecanismo mediante el cual se ejecuta el modo Stacked, la compresión compatible
con caché rebaja `aggressive` y `ultra` a `standard` para los proveedores con almacenamiento en caché mientras la compresión
está activa, y el modo de salida cavernícola y los estilos de salida son instrucciones opcionales del prompt del sistema,
desactivadas de forma predeterminada, que dan forma a la salida del modelo en lugar de comprimir la solicitud.

### Compresión compatible con caché

Algunos proveedores (como Anthropic con almacenamiento en caché de prompts) admiten el **almacenamiento en caché de prompts**,
lo que les permite almacenar partes del prompt en caché para reducir los costes y la latencia. Cuando
el almacenamiento en caché está habilitado, la compresión agresiva puede, de hecho, **perjudicar** el rendimiento
porque modifica los tokens almacenados en caché, invalidando la caché.

El módulo `cachingAware.ts` resuelve este problema al **detectar el contexto de almacenamiento en caché** y
**ajustar la estrategia de compresión** en consecuencia.

#### Cómo funciona

1. **Detectar el contexto de almacenamiento en caché** — Examina el cuerpo de la solicitud en busca de marcadores `cache_control`
2. **Identificar proveedores con almacenamiento en caché** — Comprueba si el proveedor de destino admite almacenamiento en caché
3. **Ajustar la estrategia** — Rebaja `aggressive`/`ultra` a `standard` para los proveedores con almacenamiento en caché
4. **Omitir el prompt del sistema** — Los prompts del sistema suelen almacenarse en caché, por lo que no deben comprimirse

El asistente de estrategia también devuelve un indicador `deterministicOnly`, pero el generador del plan utiliza
únicamente la estrategia; actualmente, ningún componente posterior lee el indicador.

#### Ejemplo de código

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcador de caché
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Cuándo usarla

La compresión compatible con caché está **siempre activa**; no requiere configuración. Se activa siempre que
la compresión está habilitada y el proveedor de destino admite el almacenamiento en caché de prompts (Anthropic, OpenAI,
etc.); no se requieren marcadores `cache_control` explícitos: un proveedor con almacenamiento en caché por sí solo
activa la rebaja, mientras que los marcadores por sí solos nunca lo hacen (la detección de marcadores alimenta la
telemetría de caché, no la decisión de estrategia).

### Envejecimiento progresivo

Las conversaciones largas acumulan muchos turnos de mensajes, pero los turnos más antiguos pierden
relevancia. El módulo `progressiveAging.ts` **degrada los mensajes según la distancia de turnos**
(distancia medida desde el final de la conversación). Con los valores predeterminados incluidos
(`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distancia ≤ 2)**: Se conservan literalmente
- **Distancia 3**: Compresión cavernícola (eliminación de contenido superfluo)
- **Distancia 4+**: Los mensajes del asistente se resumen; los mensajes del usuario se reducen a su primera
  línea, con un máximo de 120 caracteres; los demás roles no se modifican. Los prompts del sistema, los mensajes
  ya envejecidos y el último mensaje del usuario siempre se conservan literalmente, independientemente de la distancia.
  No se elimina nada por completo, y la banda `light`
  es inalcanzable con los valores predeterminados incluidos (`light` es igual a `verbatim`).

#### Ejemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 turnos más ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // últimos 3 turnos: literales
  light: 8, // distancia <= 8: compresión ligera
  moderate: 20, // distancia <= 20: compresión cavernícola
  fullSummary: 5, // requerido por el tipo, no leído por el código de clasificación por bandas
  // distancia > 20: resumido (asistente) / se conserva la primera línea (usuario)
});

// saved = número de tokens ahorrados
```

#### Cuándo usarlo

El envejecimiento progresivo está **siempre activo** en el modo `aggressive`: es el paso 2 de
`compressAggressive()`. El modo Ultra no lo ejecuta. Es
especialmente eficaz para:

- Sesiones de programación de larga duración
- Conversaciones de varios días
- Flujos de trabajo con agentes y muchas llamadas a herramientas

### Modo de salida cavernícola

El modo de salida cavernícola añade **instrucciones al prompt del sistema** que solicitan al propio modelo
una salida concisa: el nivel `lite` pide respuestas concisas que mantengan oraciones completas, `full`
le pide «responder de forma escueta como un cavernícola inteligente» y `ultra` solicita una salida telegráfica;
las instrucciones solo lo solicitan, no pueden garantizarlo. Las solicitudes las reciben mediante
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` resuelve primero la selección mediante la capa de compatibilidad retroactiva
(`resolveOutputStyleSelection()` en
`open-sse/services/compression/outputStyles/backCompat.ts`), que, mientras `outputStyles`
está vacío, asigna un `cavemanOutputMode` habilitado al estilo de salida `terse-prose` con
`cavemanOutputMode.intensity` (consulte Compatibilidad retroactiva más abajo); una selección `outputStyles`
no vacía se utiliza tal cual, y `cavemanOutputMode.enabled` e `intensity` dejan entonces de tener
efecto, mientras que su opción `autoClarity` sigue aplicándose. `outputMode.ts` contiene los
textos de las instrucciones (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), la omisión basada en el contenido y el
asistente de ubicación que utiliza la inyección; su propio inyector `applyCavemanOutputMode()` no tiene
ningún consumidor en producción.

#### Cómo funciona

Este modo no comprime la entrada. Añade un bloque de instrucciones al prompt del sistema
(consulte Cómo funciona la inyección más abajo), y cualquier modo de compresión de entrada seleccionado para la solicitud
se ejecuta después, sobre el cuerpo que ahora contiene el bloque. Antes de la cláusula de
límites compartidos con la que termina cada nivel, el nivel `full` en inglés dice:

> "Responde de forma concisa, como cavernícola inteligente. Omite artículos (un/una/el/la), relleno (solo/realmente/básicamente/en realidad/simplemente), cortesías y expresiones dubitativas. Se permiten fragmentos. Sinónimos cortos (grande, no extenso; arreglar, no implementar). Mantén exactos todo el contenido técnico, código, errores, URLs e identificadores."

Esto funciona especialmente bien para:

- Generación de código (salida más concisa = menos tokens)
- Preguntas y respuestas rápidas (sin necesidad de explicaciones elaboradas)
- Procesamiento por lotes (maximiza el rendimiento)

#### Cuándo usarlo

El modo de salida cavernícola es **opcional**. Con la compresión activada (`enabled: true`, el interruptor principal
de la página Configuración de compresión), actívelo con `cavemanOutputMode.enabled`; `intensity`
selecciona `lite`, `full` o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

El interruptor **Modo de salida** de una combinación de compresión (`outputMode`, con el nivel en `outputModeIntensity`)
establece el mismo ajuste para las solicitudes a las que se aplica esa combinación, y la
herramienta MCP `omniroute_set_compression_engine` lo configura mediante su argumento booleano `outputMode`.
Una selección no vacía de `outputStyles` tiene prioridad sobre este interruptor. En el
panel, activar el estilo de salida **Prosa concisa** inyecta el mismo bloque (consulte Estilos de
salida más abajo).

### Estilos de salida (catálogo)

El modo de salida cavernícola anterior es la **ruta heredada de estilo único**. La fase 4 lo generalizó
en un catálogo de estilos de salida combinables: `OUTPUT_STYLE_CATALOG` en
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo es una instrucción del prompt del sistema
que pide al propio modelo una salida más económica; los estilos pueden activarse
conjuntamente y se inyectan en el orden del catálogo.

| Estilo                                 | `id`            | Qué hace                                                                                                                                                                                                                                                                                   | Idiomas de las instrucciones                                    |
| -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Prosa concisa                          | `terse-prose`   | Omite relleno/artículos/expresiones dubitativas; mantiene exacto el contenido técnico. El mismo texto que el modo de salida cavernícola heredado (referenciado, no repetido).                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Menos código                           | `less-code`     | Escala YAGNI: el cambio funcional más pequeño, sin abstracciones no solicitadas.                                                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Coleta (desarrollador sénior perezoso) | `ponytail`      | "El mejor código es el que nunca se escribe": reutilizar > reescribir, causa raíz > síntoma, el diff funcional más corto.                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Tengo TDAH (acción primero)            | `i-have-adhd`   | Primero la acción (comando/ruta/fragmento antes que la prosa), pasos numerados y acotados, UN siguiente paso concreto, sin preámbulo/resumen/cierres. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Filtro antislop de IU                  | `antislop-ui`   | Toda técnica visual debe superar una prueba de propósito (jerarquía, identidad, legibilidad); sin degradados/cristal/brillo predeterminados, paleta limitada, sin diseños de plantilla. Ambos estilos antislop añaden un límite que prohíbe controles inactivos y afirmaciones inventadas. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Filtro antislop de texto y humano      | `antislop-copy` | Texto específico (sin raya, CTA genéricos, palabras de moda, cierres de chatbot ni hechos inventados), además de reglas para personas: contraste WCAG AA, foco visible, acceso mediante teclado, estados vacío/de carga/de error y reajuste móvil.                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| CJK conciso (文言)                     | `terse-cjk`     | Respuesta `full`/`ultra` en chino clásico (文言); `lite` solo pide respuestas breves sin palabras funcionales, cortesías ni adornos.                                                                                                                                                       | zh (restringido por configuración regional; consulte más abajo) |

Cada estilo incluye tres niveles de intensidad —`lite`, `full`, `ultra`— y cada nivel
termina con la cláusula de límites compartidos (`SHARED_BOUNDARIES` en `outputMode.ts`), que
mantiene exactos los bloques de código, las rutas de archivos, los comandos, los errores y las URLs. Los textos de los niveles
`terse-prose` y `terse-cjk` añaden los identificadores a esa lista.

`terse-cjk` está restringido a la configuración regional `zh` en dos lugares. La página Configuración de compresión muestra
su fila solo cuando el idioma de la IU del panel es chino (`zh-CN` o `zh-TW`), y
`applyOutputStyles()` solo lo inyecta cuando el idioma resuelto de la solicitud (consulte Selección de
idioma más abajo) es `zh`. Ocultar la fila no elimina una selección guardada de `terse-cjk`:
la API de configuración acepta cualquier id de estilo, y guardar otros estilos en la página lo conserva. En el
momento de la solicitud, la comprobación de idioma de `applyOutputStyles()` es la única restricción de configuración regional.

#### Cómo funciona la inyección

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resuelve
la selección según el catálogo (los ids desconocidos y los estilos cuyo idioma no coincide
se descartan, nunca producen un error; una selección que no resuelve ningún estilo deja el cuerpo
sin cambios y se omite como `no_styles`), concatena las instrucciones seleccionadas en el orden
del catálogo,
añade la cláusula de límites **una vez** (más la cláusula de seguridad, `SAFETY_BOUNDARIES` o su
traducción, cuando se selecciona `less-code` o `ponytail`) e inicia el bloque con un
único marcador de idempotencia (`[OmniRoute Output Styles]`), por lo que volver a aplicarlo
no tiene efecto. Cuando el idioma resuelto (consulte Selección de idioma más abajo) tiene una
traducción, se inserta la instrucción localizada en lugar de la inglesa.

En un cuerpo con un array `messages` no vacío, la comprobación de idempotencia se ejecuta antes que
la omisión por contenido: cuando el marcador `[OmniRoute Output Styles]` ya está en el campo
`system` de nivel superior (una cadena o un array de bloques de contenido) o en un mensaje de sistema
con contenido de cadena, el cuerpo se deja sin cambios como `already_applied` y no se realiza ninguna
comprobación de palabras clave. De lo contrario, una omisión por contenido
(`shouldBypassCavemanOutputMode()` en
`open-sse/services/compression/outputMode.ts`) comprueba el texto de los últimos tres
mensajes, sea cual sea su rol, y omite los estilos durante todo el turno cuando dicho texto
coincide con sus palabras clave de seguridad, acciones irreversibles o aclaración, o con una
secuencia sensible al orden: `first`, `then`, `after that`, `before`, `rollback` o
`backup` seguida, en un máximo de 240 caracteres, por `delete`, `drop`, `migrate`, `deploy` o
`release`. La omisión se ejecuta mientras el interruptor **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, activado de forma predeterminada) esté activado; desactivar el
interruptor omite la comprobación de palabras clave.

Cuando la omisión permite continuar con el turno, `placeSystemInstruction()` (en el mismo archivo), que
nunca crea un nuevo `messages[0]`, coloca el bloque en el primero de estos lugares que encuentra:

1. Un mensaje de sistema inicial con contenido de cadena: el bloque se añade después de su texto.
2. El campo `system` de nivel superior: el bloque se añade después del texto de una cadena, o
   se agrega como un nuevo bloque de texto a un array de bloques de contenido.
3. El primer mensaje de sistema posterior con contenido de cadena: el bloque se añade después de su
   texto.
4. Ninguno de los anteriores: el bloque se coloca en un nuevo mensaje de sistema al final de `messages`.

En un cuerpo sin un array `messages` (o con uno vacío), no se ejecuta ninguna omisión por contenido y
no se consulta un campo `system` de nivel superior. El bloque se añade después del texto de un
campo `instructions` de cadena, salvo que ese campo ya contenga el marcador
`[OmniRoute Output Styles]`, en cuyo caso el cuerpo se deja sin cambios como
`already_applied`. Cuando el cuerpo no tiene un campo `instructions` de cadena, pero contiene `input`
(una cadena o un array), el bloque se convierte en `instructions`, reemplazando cualquier valor que
no sea una cadena que tuviera dicho campo. Un cuerpo sin un campo `instructions` de cadena ni un
`input` que sea una cadena o un array se deja sin cambios y se omite como `no_messages`.

#### Cómo habilitarlo

En el panel: **Contexto de compresión → Configuración de compresión**
(`/dashboard/context/settings`), sección Estilos de salida: una fila por estilo con un
interruptor de activación/desactivación y un selector de nivel. Los estilos se insertan mientras la
compresión esté activada (el interruptor principal de la página, `enabled`). El interruptor
**Auto-Clarity Bypass** se encuentra en la página **Caveman**
(`/dashboard/context/caveman`), en su tarjeta **Output Mode**. Mediante programación, la
configuración de compresión conserva la selección como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidad con versiones anteriores: mientras `outputStyles` esté vacío, la configuración heredada
`cavemanOutputMode.enabled` se asigna a `terse-prose` con el valor de
`cavemanOutputMode.intensity`. El bloque comienza entonces con el marcador
`[OmniRoute Output Styles]`, mientras que el inyector heredado `applyCavemanOutputMode()`
escribía `[OmniRoute Caveman Output Mode]`. Debajo del marcador, el texto coincide con la
inserción heredada en en, pt-BR, es, de, fr, it, ru, id y vi; en ja y zh contiene un
espacio adicional antes de la cláusula de límites. `terse-prose` tiene traducciones a pt-BR, es, de,
fr, it, ru, zh, ja, id y vi, por lo que una solicitud cuyo idioma resuelto sea `hu` recibe el
texto en inglés, mientras que el inyector heredado usaba su versión en húngaro.

Selección del idioma del estilo de salida (`resolveOutputStyleLanguage()` en
`outputStyles/apply.ts`): con `languageConfig.enabled` activado, `autoDetect` toma como muestra el
último mensaje de usuario de los que tengan texto en el array `messages` de la solicitud (contenido de
cadena o el `text` de sus partes de contenido) y ejecuta sobre él el detector del motor Caveman
(`detectCompressionLanguage()`). El detector devuelve `zh` para texto con caracteres Han
y sin kana; de lo contrario, devuelve el idioma de entre `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` e `id` que tenga más coincidencias de indicios, y `en` cuando no
haya ninguna coincidencia; el texto que no puede clasificar recibe el inglés, nunca
`defaultLanguage`, y `vi` nunca se detecta, aunque los estilos incluyan texto en `vi`. El cuerpo
de una Responses API conserva sus turnos en `input`, que no se toma como muestra, por lo que utiliza
`defaultLanguage` y, después, el inglés. Cuando ningún mensaje de usuario de `messages` tiene texto,
o con `autoDetect` desactivado, se aplica `defaultLanguage` y, después, el inglés. Con
`languageConfig.enabled` desactivado, el idioma es el inglés, salvo que se aplique una combinación
de compresión a la solicitud (una combinación asignada a la combinación de enrutamiento de la solicitud,
o la combinación de compresión predeterminada a la que recurre chatCore para la canalización apilada
integrada): aplicar una combinación activa `languageConfig.enabled` para esa solicitud y establece
`defaultLanguage` a partir de los paquetes de idiomas de la combinación (el valor guardado si es uno de los
paquetes de la combinación; de lo contrario, el primer paquete de la combinación, cuyo valor predeterminado
es `en`), mientras que el valor guardado de `autoDetect` (activado de forma predeterminada) sigue
aplicándose. El motor de entrada Caveman elige el idioma de su paquete de reglas de forma diferente:
por cada parte de texto y, con la detección automática desactivada, condicionado por `enabledPacks`.

La matriz de estilo × idioma está fijada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: cada estilo del catálogo necesita una
entrada en `BASELINE_LANGUAGES` de la prueba; un estilo que no esté restringido por configuración regional debe incluir una
traducción pt-BR (el estilo `terse-cjk`, restringido por configuración regional, está exento de esta regla), a menos que esté
incluido en `KNOWN_ENGLISH_ONLY`, que solo puede contener estilos sin ninguna traducción —
un estilo incluido que tenga alguna traducción hace que la prueba falle; y un estilo hace que la prueba falle cuando
pierde un idioma incluido en su entrada de `BASELINE_LANGUAGES`. Para añadir un estilo, consulta
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compresión de resultados de herramientas

`compressToolResult()` en `open-sse/services/compression/toolResultCompressor.ts`
comprime el texto de los resultados de herramientas mediante **5 estrategias**. Las prueba en este orden, y la
primera estrategia habilitada cuya comprobación coincida con el contenido determina el resultado:

1. **`fileContent`**: el contenido de 3 o más líneas en el que al menos una línea, ignorando
   la sangría inicial, comienza por `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` o `return ` (la palabra clave seguida de un espacio), o por `if`,
   `for` o `while` seguido de `(` o ` (`, conserva sus primeras 20 y sus últimas 5 líneas, con
   la parte intermedia omitida marcada.
2. **`grepSearch`**: el contenido con al menos una línea de la forma `<path>:<digits>:`,
   donde el texto anterior al primer signo de dos puntos no tiene espacios en blanco, conserva únicamente esas líneas, hasta
   un máximo de 30, seguidas del recuento de cualquier coincidencia adicional y de la lista de archivos coincidentes;
   todas las demás líneas se descartan. Una sola línea de este tipo basta para activar la estrategia, por lo que una
   línea de registro que comience con una marca de tiempo como `12:30:45` también cuenta.
3. **`shellOutput`**: la salida que contiene una secuencia ANSI CSI (`ESC[` seguido de dígitos o
   puntos y coma y, a continuación, una letra, como en los códigos de color) o un `$` seguido de un espacio en blanco
   en cualquier parte del texto pierde esas secuencias (se conservan otras secuencias de escape, como `ESC[?25l` o una
   secuencia OSC de título de ventana) y conserva sus últimas 50 líneas, agrupando las líneas repetidas
   consecutivas. Como esta comprobación se ejecuta antes que `json` y `errorMessage`,
   una salida JSON o de error que contenga dicho `$` nunca llega a ellas mientras
   `shellOutput` esté activada.
4. **`json`**: una carga JSON de más de 2.000 caracteres que comienza por `{` o `[` (tras
   espacios en blanco opcionales) y se analiza correctamente se resume: un array de más de 7 elementos conserva
   sus primeros 5 y sus últimos 2 elementos, además de su recuento total, y un objeto conserva sus primeras 20
   claves, sustituyendo cada valor de objeto o array anidado por un marcador de posición `{…N keys}`
   (para un array, N es su longitud) y un marcador `_remaining_<N>_keys` que cuenta las claves
   descartadas después de las primeras 20. Los valores escalares se copian completos, por lo que un objeto de 20 claves
   o menos sin valores anidados solo vuelve a sangrarse — uno minificado gana caracteres
   y permanece sin cambios.
5. **`errorMessage`**: la salida que contiene, en cualquier parte y sin distinguir entre mayúsculas y minúsculas, `error:`,
   `error ` (la palabra seguida de un espacio, como en `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` o `traceback` conserva su primera línea, las
   10 líneas siguientes y las últimas 3, con un marcador `… [N frames elided] …` en lugar de las
   líneas intermedias. El marcador solo aparece cuando hay más de 13 líneas después de la primera
   línea, por lo que la salida de error de 14 líneas o menos no se acorta (con 12 o 13 líneas, las
   últimas 3 repiten líneas que ya se habían conservado).

Después de que una estrategia coincide, incluso si no ahorra nada, no se prueban las estrategias
posteriores. Cuando la estrategia coincidente no ahorra ningún token estimado (longitud ÷ 4, redondeada hacia arriba) —
por ejemplo, un archivo con apariencia de código de 25 líneas o menos, o un array JSON de más de 2.000
caracteres con 7 elementos o menos — el motor agresivo conserva el resultado original de la herramienta:
ambos consumidores (`compressAggressive()` y `compressAnthropicToolResultBlock()`)
conservan el original cuando `saved` es 0 o menos, mientras que `compressToolResult()` sigue
devolviendo la salida de esa estrategia. El paso de resultados de herramientas no tiene la última palabra: el
resumidor de respaldo del motor aún puede acortar un mensaje `tool` o `function` de más
de 8.192 caracteres (`maxTokensPerMessage`, 2.048, multiplicado por 4).

#### Cuándo usarla

La compresión de resultados de herramientas es el paso 1 del motor agresivo (`compressAggressive()` en
`open-sse/services/compression/aggressive.ts`), por lo que se ejecuta en el modo Agresivo y en un
paso `aggressive` de una canalización apilada. Comprime los mensajes `tool` y `function`
con formato de OpenAI y el texto dentro de los bloques `tool_result` de Anthropic. Cada estrategia tiene su propio
interruptor en `aggressive.toolStrategies`, todos activados de forma predeterminada. En el panel, los
interruptores están en la vista **Avanzada** de la página Caveman mientras la compresión está activada y el
modo predeterminado es Agresivo.

### Canalización apilada

El modo apilado ejecuta **varios motores en secuencia** — normalmente primero RTK
(ahorro del 60-90 % en la salida de herramientas) y después Caveman sobre el texto restante (~46 % de
ahorro de entrada). Combinados, forman el **intervalo elegible del 78-95 %** (consulta Cálculo del ahorro ascendente
más arriba): `1 - (1 - 0.60..0.90) × (1 - 0.46)` da un promedio de ≈89 %.

#### Cómo funciona

```
Entrada (1000 tokens)
  → RTK (filtro consciente de los comandos) → 200 tokens
    → Caveman (eliminación de relleno) → 108 tokens
  → Salida (108 tokens, ~89 % de ahorro)
```

#### Cuándo usarlo

Usa el modo apilado para:

- Flujos de trabajo con un uso intensivo de herramientas (programación con agentes, investigación)
- Procesamiento por lotes sensible a los costes
- Cuando necesites el máximo ahorro de tokens

Las canalizaciones apiladas se configuran mediante la opción global de compresión
`stackedPipeline`, o mediante una combinación de compresión con nombre asignada a una combinación de enrutamiento (consulta
Anulación por combinación más arriba) — no mediante un `modePack` de combinación automática (ese campo solo
repondera la selección de modelos de la combinación automática, y `stacked` no es un nombre de paquete válido).

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
