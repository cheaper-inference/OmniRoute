# OmniRoute Auto-Combo Engine (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para usuarios**: ¿Buscas una guía de inicio rápido? Consulta la [Guía de usuario de Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obtener explicaciones sencillas y ejemplos.

> Cadenas de modelos autogestionadas con puntuación adaptativa + enrutamiento automático sin configuración

## Enrutamiento automático sin configuración (prefijo `auto/`)

> **NUEVO:** No es necesario crear combos. Usa el prefijo `auto/` directamente en cualquier cliente.

### Ejemplos rápidos

| ID del modelo  | Variante | Comportamiento                                                                          |
| -------------- | -------- | --------------------------------------------------------------------------------------- |
| `auto`         | default  | Todos los proveedores conectados, estrategia LKGP, pesos equilibrados                   |
| `auto/coding`  | coding   | Pesos que priorizan la calidad, adecuados para la generación de código                  |
| `auto/fast`    | fast     | Selección ponderada de baja latencia                                                    |
| `auto/cheap`   | cheap    | Enrutamiento optimizado para costes (primero el de menor coste)                         |
| `auto/offline` | offline  | Favorece a los proveedores con mayor disponibilidad de cuota                            |
| `auto/smart`   | smart    | Prioridad a la calidad + mayor tasa de exploración (10%) para descubrir mejores modelos |
| `auto/lkgp`    | lkgp     | LKGP explícito (igual que `auto` de forma predeterminada)                               |
| `auto/chaos`   | chaos    | Distribución paralela, un modelo por proveedor (no es inyección de fallos)              |

### Composición categoría × nivel (`auto/<category>:<tier>`)

Los sufijos al estilo de OpenRouter separan **qué tipo de ruta** (categoría) de **cómo optimizarla** (nivel), para que puedas combinarlos libremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorías** (filtran el conjunto de candidatos por capacidad): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` conservan los modelos con capacidades de visión; `reasoning` conserva los modelos de razonamiento/pensamiento.
- **Niveles** (seleccionan los pesos de puntuación o el filtro del conjunto): `fast` (entrega rápida) · `cheap` (alias `floor`, ahorro de costes) · `reliable` (estado del disyuntor + estabilidad de latencia) · `free` / `pro` (filtran el conjunto por nivel de modelo mediante `classifyTier`: nivel gratuito frente a prémium).

| Ejemplo                | Se resuelve como                                                             |
| ---------------------- | ---------------------------------------------------------------------------- |
| `auto/coding:fast`     | conjunto de codificación, pesos de baja latencia                             |
| `auto/coding:cheap`    | conjunto de codificación, optimizado para costes (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | solo modelos de razonamiento/pensamiento, nivel prémium                      |
| `auto/vision`          | modelos con capacidades de visión (sin nivel → pesos equilibrados)           |
| `auto/multimodal:free` | modelos con capacidades multimodales, solo nivel gratuito                    |

Cualquier `auto/<category>[:<tier>]` válido se resuelve bajo demanda; se anuncia un subconjunto seleccionado en `/v1/models` y en el panel (`AUTO_SUFFIX_VARIANTS` en `open-sse/services/autoCombo/builtinCatalog.ts`). El filtrado es **fail-open**: si una restricción no coincide con ningún modelo conectado, se utiliza el conjunto completo para que el enrutamiento nunca falle. El sistema de puntuación principal (`combo.ts`) no cambia; el filtro de categoría/nivel se aplica en `buildAutoCandidates`.

> **Inteligencia de modelos en tiempo real:** la idoneidad del enrutamiento automático se basa en clasificaciones de **Arena ELO** en tiempo real + datos de nivel de **models.dev** cuando la opción `ARENA_ELO_SYNC_ENABLED` está activada (de lo contrario, utiliza el mapa estático de idoneidad).

**Cómo usarlo:**

```bash
# Cualquier IDE o herramienta CLI compatible con el formato de OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# En tu código/configuración, establece el modelo como:
model: "auto"                 # valor predeterminado equilibrado
model: "auto/coding"          # mejor para tareas de codificación
model: "auto/fast"            # el más rápido disponible
model: "auto/cheap"           # el más barato por token
```

**Qué ocurre:**

1. OmniRoute detecta el prefijo `auto/` en `src/sse/handlers/chat.ts`
2. Consulta todas las **conexiones de proveedores activas** en la base de datos
3. Filtra las que tienen credenciales válidas (clave de API o token de OAuth)
4. Determina el modelo de cada conexión (`connection.defaultModel` o el primer modelo del proveedor)
5. Crea un **combo virtual** en memoria (no se almacena en la base de datos)
6. Enruta utilizando el perfil de pesos de la variante seleccionada + la estrategia LKGP

**Propiedades clave:**

- ✅ **Siempre activo:** No se necesita ningún interruptor, creación de combos ni configuración
- ✅ **Dinámico:** Refleja automáticamente los proveedores conectados actualmente
- ✅ **Persistencia de sesión:** LKGP garantiza que se priorice el último proveedor que tuvo éxito
- ✅ **Compatible con varias cuentas:** Cada conexión de proveedor se convierte en un candidato independiente
- ✅ **Sin escrituras en la base de datos:** El combo virtual solo existe durante la solicitud, sin sobrecarga de persistencia

### Control de candidatos por clave (#7819, nivel 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = el sufijo después de `auto/`, o
el literal `auto` para el canal base) es un endpoint de **solo lectura** que enumera el
conjunto actual de candidatos de un canal `auto/*`, complementado con datos de accesibilidad
en tiempo real y reutilizando las lecturas de resiliencia existentes (nunca el `state` sin procesar del disyuntor):

- disyuntor del proveedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- tiempo de espera de la conexión — `rateLimitedUntil` / `testStatus` en la fila resuelta de
  `provider_connections`
- bloqueo del modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato también incluye la marca `excluded` de esta clave de API. Las exclusiones se almacenan
por clave de API (tabla `auto_candidate_overrides`, migración `128`): OmniRoute es
monoinquilino y no tiene ninguna tabla `users`, por lo que `apiKeyId` es la identidad real
por solicitante más cercana; además, se aplican en el punto de control del conjunto de candidatos de
`open-sse/services/autoCombo/virtualFactory.ts` mediante la función pura y probada unitariamente
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
El filtro es **fail-open**: un apiKeyId/canal no definido o un fallo de consulta de la base de datos
dejan el conjunto sin filtrar, por lo que un operador sin anulaciones configuradas obtiene un
enrutamiento idéntico byte por byte al que había antes de esta funcionalidad.

**Pospuesto para una incidencia de seguimiento:** pesos por candidato + ordenación explícita (Nivel 3
— se integra en las rutas existentes de estrategias ponderadas/prioritarias) y fijación de una estrategia
`combo.ts` específica por canal `auto/*` (Nivel 4). Consulta el plan de #7819 para la cuestión pendiente
sobre si las anulaciones deben mantenerse por clave de API o pasar a ser globales dado el modelo
de inquilino único.

**Entre bastidores:**

```txt
Solicitud: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detecta el prefijo
   ↓
createVirtualAutoCombo('coding') → candidatePool de las conexiones activas
   ↓
handleComboChat (el mismo motor que los combos persistentes)
   ↓
La puntuación automática selecciona el mejor proveedor/modelo para cada solicitud
```

**Archivos de implementación:**

| Archivo                                                   | Propósito                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analizador de prefijos (`parseAutoPrefix`)                         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea objetos `AutoComboConfig` virtuales                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Punto de enlace de pruebas para simular el registro de proveedores |
| `src/sse/handlers/chat.ts`                                | Integración: atajo para el prefijo automático                      |
| `src/shared/constants/providers.ts`                       | Entrada del sistema `SYSTEM_PROVIDERS.auto`                        |

## Preferencias de cuenta para combos automáticos guardados

El editor automático inteligente ofrece una opción** Preferencias de cuenta** sección. Cada conexión puede ser Preferida, Normal (la predeterminada), Reserva o Excluida. Varias conexiones pueden compartir un nivel. Selecciona automáticamente dentro del primer nivel elegible y conserva su comportamiento scoring/router allí; Los intentos fallidos pasan a las cuentas concretas restantes, preferidas antes que lo normal antes que la reserva. Este combo nunca utiliza conexiones excluidas.

La configuración se almacena como `config.accountPreferences`, codificada por la conexión ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Un mapa omitido o vacío conserva la ruta existente. Las preferencias no habilitan conexiones deshabilitadas, no otorgan acceso a claves API, restauran candidatos bloqueados por cuotas ni eluden verificaciones presupuestarias. Cada intento está restringido a su conexión concreta, por lo que la cuenta alternativa no puede saltar niveles detrás del enrutador combinado. La afinidad de sesión existente puede conservar una cuenta elegible; excluir la cuenta vinculada a un turno nativo detiene ese turno en lugar de cambiar de cuenta silenciosamente.

Las preferencias configuradas utilizan la ruta automática con reconocimiento de cuenta: los accesos directos de caché de contexto independiente, canalización inteligente, caos y sombra no se distribuyen. La cobertura especulativa está deshabilitada para estas solicitudes, por lo que las cuentas de reserva no pueden competir con las preferidas. Otras estrategias combinadas no interpretan esta configuración. Cambiar un combo fuera de Auto mantiene las preferencias guardadas para un cambio posterior.

## Nombres de combos que coinciden con un ID de modelo real

Un combo cuyo `name` es idéntico a un ID de modelo sin prefijo (p. ej., un combo llamado
`gpt-5.5`) es un **patrón intencional y compatible**, no un error: es el
mecanismo para la conmutación por error entre proveedores por ID de modelo documentado en
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Dado que la
resolución de combos se comprueba antes que la resolución de IDs de modelo sin prefijo
(`getComboForModel()` en `src/sse/services/model.ts`), una solicitud para el ID sin prefijo
`gpt-5.5` se enruta a través de los destinos del combo (p. ej.,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) en lugar de dirigirse
directamente a un único proveedor; esto reutiliza la precedencia de combo antes de reescritura creada para
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) y cuenta con
pruebas de regresión en `tests/unit/responses-combo-resolution-3227.test.ts` y
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Crear o cambiar el nombre de un combo por uno que oculte un ID de modelo real
**nunca se rechaza**, ya que hacerlo interrumpiría este flujo de trabajo documentado. En su lugar
(#8530), `POST /api/combos` y `PUT /api/combos/[id]` añaden un campo
`warning` no bloqueante a la respuesta cuando el nombre (nuevo) entra en conflicto con un ID de
modelo real:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Durante el arranque, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) también registra una advertencia `[STARTUP]` de una sola línea
que enumera todos los combos existentes que ocultan un ID de modelo, de modo que los operadores que
se encuentren con esto por accidente (en lugar de hacerlo intencionadamente, según #6940) reciban una señal.
La función auxiliar de detección se encuentra en `src/lib/combos/modelNameCollision.ts`.

## Llamar a un combo personalizado desde un cliente

Los combos persistentes (Configuración → Combos) solo se utilizan cuando el cliente envía el **nombre exacto** del combo en el campo `model`; no hay coincidencia aproximada ni parcial del nombre del combo, ni interviene ningún prefijo `auto/`. Orden de resolución (`getComboForModel()` en `src/sse/services/model.ts`):

1. coincidencia exacta con el nombre del combo (`model: "my-combo"`),
2. prefijo `combo/<name>` (`model: "combo/my-combo"`),
3. asignaciones globales de modelo→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dos errores frecuentes:

- **`auto` no utiliza tus combos.** `auto`/`auto/*` crea su propio conjunto de candidatos sin configuración y solo consulta los combos persistentes si un combo se llama literalmente `auto` (no recomendado). Para enrutar mediante un combo, envía su nombre exacto, no `auto`.
- **`openrouter/auto` es un producto de pago real de OpenRouter** ("Auto Best Available"), no un alias de OmniRoute. Es la única entrada de modelo estática del registro de OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) y se factura por separado. Usa Configuración → Enrutamiento → Ocultar modelos de pago para excluirlo de los conjuntos de `auto`.

Consulta [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) y [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para conocer la confusión original que se documenta aquí.

## Cómo funciona (combos automáticos persistentes)

El motor Auto-Combo selecciona dinámicamente el mejor provider/model para cada solicitud utilizando un** Función de puntuación de 16 factores** (definido en `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Los pesos predeterminados suman `1.0`; Los pesos personalizados se vuelven a normalizar mediante `normalizeScoringWeights()`. Dos de los dieciséis — `cacheAffinity` y `resetWindowAffinity` — tienen un peso predeterminado de `0`; `reliability` lleva `0` en `DEFAULT_WEIGHTS` pero `0.03` en paquetes genéricos y `0.04` en `reliability-first`, y `quality` lleva `0.02` en paquetes (`0.03` en `quality-first`): todavía se calculan para cada candidato, y `cacheAffinity` activa la deduplicación de caché rápida fuera de la puntuación, por lo que los factores predeterminados cero simplemente no votan de forma predeterminada, mientras que los paquetes sí lo hacen.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Fuente: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerado vía `npm run docs:render-diagrams`). El nombre del archivo es histórico; La fuente y el diagrama renderizado muestran los 16 factores declarados en `DEFAULT_WEIGHTS`.

| Factor                | Peso predeterminado | Descripción                                                                                                                                                                                                                              |
| :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429              | Cuota restante/margen de límite de tasa [0..1]                                                                                                                                                                                           |
| `health`              | 0.1605              | Puntuación de estado del disyuntor (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                                              |
| `costInv`             | 0.1429              | Inverso** mezclado** costo (60% de entrada + 40% de salida precio del token, normalizado) — más barato = puntuación más alta                                                                                                             |
| `latencyInv`          | 0.1143              | Latencia inversa de p95 normalizada para agrupar — más rápido = puntuación más alta                                                                                                                                                      |
| `taskFit`             | 0.0762              | Adecuación del tipo de tarea (codificación, revisión, planificación, análisis, depuración, documentos)                                                                                                                                   |
| `stability`           | 0.0476              | Estabilidad basada en la varianza de la desviación estándar de latencia — un candidato cuyo tiempo de respuesta oscila obtiene puntuaciones más bajas                                                                                    |
| `tierPriority`        | 0.0476              | Prioridad de nivel de cuenta — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Free = 0.0                                                                                                                                                      |
| `tierAffinity`        | 0.0476              | Afinidad entre el nivel del candidato y el nivel recomendado por el manifiesto                                                                                                                                                           |
| `specificityMatch`    | 0.0476              | Coincidencia entre la especificidad de la solicitud (pista de manifiesto) y el nivel del modelo                                                                                                                                          |
| `contextAffinity`     | 0.0476              | Afinidad entre la necesidad de la ventana de contexto de la solicitud y la ventana de contexto del modelo                                                                                                                                |
| `sessionAvailability` | 0.0476              | Disponibilidad de la sesión OAuth de la conexión candidata para esta sesión (`getOAuthSessionAvailability()`; las conexiones que no son OAuth tienen una puntuación de 1,0)                                                              |
| `connectionDensity`   | 0.0476              | Distribuye la carga entre conexiones del mismo proveedor (anticoncentración)                                                                                                                                                             |
| `cacheAffinity`       | 0.00                | Afinidad de hash de encuentro hacia la conexión que probablemente ya contenga el prefijo de caché de solicitud de esta solicitud (`open-sse/services/combo/promptCacheAffinity.ts`); deshabilitado por defecto (#8008)                   |
| `resetWindowAffinity` | 0.00                | Sesgo hacia conexiones cuya ventana de restablecimiento de cuota es favorable (deshabilitada de forma predeterminada)                                                                                                                    |
| `quality`             | 0.03                | Señal de calidad de salida impulsada por retroalimentación desde el rastreador de calidad de eventos de enrutamiento; los candidatos sin observaciones reciben un 0,5 neutral                                                            |
| `reliability`         | 0.00                | Cuota de éxito observada, `1 - failureRate`, de 24 horas de historial de uso detrás de un piso de diez muestras (de lo contrario, métricas en tiempo real); Los candidatos sin observaciones se leen como 1,0. Deshabilitado por defecto |

El rastreador `quality` en memoria (`open-sse/services/routing/quality.ts`) está vacío después de un reinicio en frío, por lo que cada candidato obtiene un `0.5` neutral hasta que llegan las primeras observaciones.

> **Cuota ilegible (#15347).** Cuando un proveedor tiene un buscador de cuotas pero no devuelve nada legible (búsqueda fallida, credenciales faltantes, uso de solo mensajes o una instantánea con formato incorrecto sin `windows` analizable ni `percentUsed` finito, incluido `percentUsed: null`), el candidato puntúa `0` en el eje `quota` y su puntuación final se multiplica por `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0,5, `autoStrategy.ts`), el mismo patrón de penalización suave que la penalización del estado de conexión. Una lectura de uso fallida es evidencia de la telemetría, no del proveedor, por lo que se clasifica estrictamente por debajo de cualquier lectura real, incluida una confirmada 100%-used, pero nunca se bloquea ni se desaloja. Un proveedor sin límite informa `unlimited: true` y obtiene una cuota completa; un proveedor sin un buscador de cuotas registrado no tiene ninguna fuente de telemetría y mantiene el valor predeterminado de `100`.

**Suma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` como se declara en `DEFAULT_WEIGHTS`; `normalizeScoringWeights()` vuelve a normalizar los pesos configurados por el usuario en una distribución antes de puntuar.

## Paquetes de modos

Hay 6 perfiles de pesos predefinidos en `open-sse/services/autoCombo/modePacks.ts`. Cada paquete sustituye por completo los pesos predeterminados para orientar la selección hacia un objetivo. Cada paquete ya suma `1.0` (`0.9999` tal como se muestra con cuatro decimales), por lo que `normalizeScoringWeights()` no tiene nada significativo que corregir cuando un paquete está activo: los valores que aparecen a continuación son, salvo por el redondeo, los que aplica el sistema de puntuación.

| Factor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Notas:

- **Los paquetes incluyen `quality` y `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) y sustituyen por completo el mapa de pesos (`weights = pack`, no es una combinación). `DEFAULT_WEIGHTS` incluye `quality 0.03 / reliability 0`; seleccionar `balanced`/`default` conserva esos valores predeterminados, mientras que seleccionar un paquete utiliza los valores del paquete indicados anteriormente. En un conjunto en frío (todavía sin observaciones, por lo que `quality 0.5` y `reliability 1`), estos dos factores añaden `+0.04` con un paquete genérico (`0.03 + 0.01`), `+0.045` con `quality-first` y `+0.05` con `reliability-first`.
- `tierAffinity`, `specificityMatch` y `resetWindowAffinity` son explícitamente `0` en todos los paquetes.
- El énfasis de cada paquete, de un vistazo:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (conexiones saludables y de baja latencia)
  - **cost-saver** → costInv 0.3324 (ganan los tokens más baratos)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, el valor más alto de todos los paquetes (el mejor modelo para la tarea, con consistencia)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (máximo margen disponible independientemente de la velocidad o el coste)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, el valor más alto de todos los paquetes (la menor cantidad de sorpresas)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (el paquete de pesos que `auto/chaos` asigna a los miembros de su panel; la distribución paralela no lee estos pesos y este no es un perfil de inyección de fallos; consulte [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Controles por solicitud (encabezados) — #6023 / #6024 / #6025 / #3470

Un combo `auto` puede dirigirse **por solicitud** mediante tres encabezados, sin modificar la
configuración almacenada del combo. Estos solo se aplican a la estrategia `auto` y únicamente a la solicitud
que los incluye; los valores `modePack`/`budgetCap`/`budgetFallback` guardados del combo se utilizan
cuando el encabezado no está presente.

| Encabezado                    | Acepta                                                                                                                                                                                                            | Efecto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias predefinido (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) o el nombre sin procesar de un paquete (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Sobrescribe los pesos de puntuación para esta solicitud. `balanced`/`default` fuerzan los pesos predeterminados (sin paquete). Los valores desconocidos se ignoran (se conserva la configuración).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget`          | un número positivo (máximo de USD por solicitud)                                                                                                                                                                  | Límite estricto de coste: los candidatos cuyo coste estimado lo supere se filtran antes de la selección. Lo que ocurre cuando **todos** los candidatos lo superan se controla mediante `X-OmniRoute-Budget-Fallback`, que se describe a continuación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predeterminado, alias: `cheapest-viable`, `soft`) o `strict` (alias: `block`, `hard`)                                                                                                                 | `cheapest`: recurre al candidato globalmente más barato, aunque siga superando el límite (comportamiento heredado). `strict`: se niega a realizar la selección; la solicitud falla inmediatamente con `HTTP 402` en lugar de exceder silenciosamente el presupuesto. Los valores desconocidos se ignoran.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Effort`          | `auto` (otros valores reservados)                                                                                                                                                                                 | Presupuesto de razonamiento adaptativo: cuando la solicitud **no** incluye ningún campo de razonamiento de ningún tipo (`reasoning_effort`, `reasoning`, `thinking`), el gateway resuelve `auto` como `low`/`medium`/`high` a partir de señales deterministas de la estructura de la solicitud (longitud del último mensaje del usuario, tamaño del contexto hasta el último mensaje del usuario, resultados anteriores de herramientas, profundidad del bucle de herramientas). Las señales se limitan al turno actual — se ignora todo lo que aparezca después del último mensaje del usuario —, por lo que cada solicitud de un bucle de herramientas se resuelve en el mismo nivel (fijación sin estado por turno, sin estado de sesión y sin escalado a mitad del bucle que pudiera romper los prefijos de la caché de prompts del proveedor ascendente). Un campo de razonamiento explícito del cliente siempre tiene prioridad. Se limita a las solicitudes cuyo envío al proveedor ascendente se resuelve con la estructura de OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`): `reasoning_effort` es un campo con formato de OpenAI, por lo que el encabezado no tiene efecto en una solicitud dirigida a Claude o Gemini (consulta `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forzar el perfil más rápido, limitar esta solicitud a $0.05 y bloquearla estrictamente en lugar de exceder el presupuesto
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

La resolución es una función pura (`open-sse/services/autoCombo/requestControls.ts`); los
valores resueltos alimentan las entradas existentes `config.modePack` / `config.budgetCap` /
`config.budgetFallback` del motor. El valor `config.budgetFallback` almacenado de una combinación ("strict" |
"cheapest") establece la política persistente; el encabezado la sustituye para una sola solicitud.

## Todas las estrategias de enrutamiento

El motor combinado de OmniRoute es compatible** 22 estrategias de enrutamiento** (declarado en `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). El motor Auto Combo en sí está expuesto bajo la estrategia `auto` ; los demás están disponibles para combos persistentes.

| Estrategia          | Descripción                                                                                                                                                                                                                                                                 |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordenada del primer objetivo con prioridad explícita                                                                                                                                                                                                                  |
| `weighted`          | Ponderado aleatoriamente por peso por objetivo                                                                                                                                                                                                                              |
| `round-robin`       | Recorrer los objetivos en orden (por lotes; ver más abajo)                                                                                                                                                                                                                  |
| `context-relay`     | Transmitir contexto entre objetivos (conversaciones largas)                                                                                                                                                                                                                 |
| `fill-first`        | Llene la cuota de cada objetivo antes de pasar al siguiente                                                                                                                                                                                                                 |
| `p2c`               | equilibrio de carga aleatorio Power-of-2-choices                                                                                                                                                                                                                            |
| `random`            | Selección aleatoria uniforme                                                                                                                                                                                                                                                |
| `least-used`        | Elija el objetivo con la carga actual más baja                                                                                                                                                                                                                              |
| `cost-optimized`    | Minimice $ por solicitud según el precio del catálogo                                                                                                                                                                                                                       |
| `reset-aware` ⭐    | Priorizar por tiempo de restablecimiento de cuota — ventanas de restablecimiento breves clasificadas más arriba                                                                                                                                                             |
| `reset-window`      | Prefiere objetivos cuya ventana de cuota se restablezca lo antes posible                                                                                                                                                                                                    |
| `expiry-first`      | Gaste primero la cuenta cuya cuota, de otro modo, expiraría sin usarse — el saldo más alto con la fecha límite de reinicio más cercana va primero                                                                                                                           |
| `headroom`          | Elija el objetivo con el mayor margen de cuota restante                                                                                                                                                                                                                     |
| `quota-weighted`    | Omita las cuentas agotadas y luego elija entre el resto en proporción a la cuota sobrante dividida por la carga en vuelo; las conversaciones existentes permanecen fijadas                                                                                                  |
| `strict-random`     | Aleatorio sin deduplicación de repeticiones                                                                                                                                                                                                                                 |
| `auto`              | Utilice la puntuación de combo automático (16 factores) —** recomendado**                                                                                                                                                                                                   |
| `lkgp`              | Última ruta buena conocida (fija al último proveedor exitoso y luego vuelve a las reglas)                                                                                                                                                                                   |
| `context-optimized` | Elija el objetivo que mejor se ajuste al tamaño del contexto actual                                                                                                                                                                                                         |
| `cache-optimized`   | Reordenar los destinos por afinidad de caché de solicitud — Se intenta primero la conexión que es más probable que ya contenga el prefijo en caché de esta solicitud (`open-sse/services/combo/promptCacheAffinity.ts`, #8008).                                             |
| `fusion` 🧬         | Distribuya un panel de modelos en paralelo, luego sintetice una respuesta a través de un juez (ver más abajo)                                                                                                                                                               |
| `pipeline`          | Ejecute objetivos secuencialmente, conectando la salida de cada paso con la entrada del siguiente paso; sólo se devuelve la respuesta final (#6396)                                                                                                                         |
| `jev`               | Lista de preferencias clasificadas por el usuario; TypeSafe Jev admite qué entradas se ejecutan para esta solicitud. El ganador primero, otros objetivos admitidos mantienen el orden de los usuarios. Se abre al pedido del usuario cuando Jev no está disponible (#15276) |

⭐ = Nuevo en v3.8.0 · 🧬 = Nuevo en v3.8.36

### semántica `weighted`

`weighted` es un** sorteo aleatorio proporcional por solicitud** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), no es un ecualizador:

- Cada solicitud atrae** uno** paso con probabilidad `weight / totalWeight`; los pasos restantes se ordenan por peso descendente como cadena alternativa para esa solicitud.
- Un paso cuyo peso es `0` (o falta) es** nunca dibujado** mientras que cualquier otro paso tiene un peso > 0 — solo puede servir como respaldo después de que falla el paso dibujado. Sólo cuando** todo** los pesos son 0, la selección se vuelve uniforme.
- Los pasos cuyos objetivos son todos los disyuntores del proveedor — no disponibles `OPEN`, el tiempo de reutilización de la conexión y el bloqueo del modelo — se eliminan del sorteo antes de que suceda (`open-sse/services/combo/targetResolution.ts`), por lo que un solo paso saludable puede ganar temporalmente todas las solicitudes.
- `stickyWeightedLimit` (configuración combinada, `1` = predeterminado desactivado) fija el paso dibujado para esa cantidad de éxitos consecutivos antes de volver a dibujar.

Para una rotación estricta, utilice `round-robin`; pesos iguales en `weighted` dan — estadístico, no un equilibrio — estricto.

### Modo de canalización agente

Un combo `pipeline` con al menos dos modelos puede optar por el enrutamiento planner/executor con `config.agenticOrchestration.enabled`. El primer objetivo posee planificación y respuestas finales; el segundo objetivo emite llamadas a herramientas nativas del cliente. OmniRoute detecta la continuación de los resultados de la herramienta a partir del protocolo de solicitud, pregunta al planificador si se necesita otra ronda de herramientas y dinámicamente hace que el ejecutor o el planificador sean el paso final de cara al cliente.

`config.agenticOrchestration.contextCompaction` opcional aplica un presupuesto de carga útil separado antes del envío de cada planificador o ejecutor. Habilítelo explícitamente:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Estos son presupuestos de caracteres JSON serializados seleccionados por el operador, no ventanas de contexto de token ni límites ascendentes garantizados. El modelo exacto IDs anula el predeterminado. Por encima del umbral, la compactación elimina definiciones de herramientas idénticas, recorta la evidencia de herramientas de gran tamaño con un resumen y elimina los grupos históricos completos antiguos hacia la proporción objetivo. Conserva las instrucciones de system/developer, la última solicitud del usuario, la última ronda de herramientas que incluye calls/results paralelo y la instrucción de enrutamiento principal de Gemini. Se conservan las instrucciones de nivel superior y la configuración de herramientas. Un marcador de omisión registra el historial eliminado; Este es un recorte determinista, no un resumen semántico. Si el contexto fijado aún excede el presupuesto, la solicitud devuelve 413 antes de contactar al modelo. Con la compactación deshabilitada o por debajo del umbral, la solicitud pasa sin cambios.

En las continuaciones de resultados de herramientas, OmniRoute también detiene la ejecución cuando dos rondas completas consecutivas repiten las mismas llamadas a herramientas sin cambios, o cuando todos los resultados marcados explícitamente en dos rondas consecutivas fallaron. Los resultados modificados permiten llamadas repetidas (por ejemplo, sondeos). La guardia se reinicia ante una nueva solicitud de usuario, agrupa llamadas paralelas en una ronda y admite Anthropic, finalizaciones de chat, respuestas e historiales Gemini. El planificador recibe el motivo y es dueño de la respuesta final incluso si solicita otra ronda de herramientas.

Los modelos adicionales después del segundo objetivo son copias de seguridad de ejecutores ordenados. Una respuesta HTTP fallida o una excepción de transporte avanza al siguiente ejecutor, llevando la misma decisión del planificador y herramientas nativas, pero el propio paso del ejecutor y la conexión resuelta. La primera respuesta exitosa se devuelve sin cambios, incluida la transmisión SSE ; Los fallos después de que se inicie una transmisión exitosa no se pueden volver a intentar aquí. Si todos los ejecutores fallan, se devuelve el último error. El cliente cancela la detención del envío.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

El ejecutor puede emitir múltiples llamadas independientes en una sola respuesta. Las llamadas dependientes se manejan en turnos posteriores de resultados de la herramienta del cliente, y el planificador revisa cada resultado. `maxToolRounds` por defecto es `8` y acepta `1`–`32`; una vez alcanzado, el planificador debe producir la mejor respuesta final disponible. Las decisiones del planificador interno se almacenan en un buffer, mientras que la respuesta seleccionada de cara al cliente conserva la preferencia de transmisión original.

### lote adhesivo `round-robin` y expansión de cuenta

El round-robin es por lotes, no una solicitud por paso:

- `stickyRoundRobinLimit` (configuración combinada, luego `comboStickyRoundRobinLimit`, luego `settings.stickyRoundRobinLimit`, predeterminado** 3** ) mantiene el mismo objetivo durante esa cantidad de éxitos consecutivos antes de rotar. Establezca la anulación combinada en `1` para una rotación de una sola solicitud. El editor combinado muestra el valor efectivo y de qué capa proviene.
- `connectionAwareExpansion` (configuración combinada, luego configuración, predeterminada** FALSO** ) expande cada paso a nivel de proveedor a objetivos por cuenta antes de la rotación. Las estrategias del grupo B (prioridad, ponderada, round-robin, aleatoria, p2c, menos utilizada, de costo optimizado, lkgp, llenado primero, estrictamente aleatoria, optimizada para contexto, optimizada para caché, retransmisión de contexto, fusión, canalización, jev) mantienen una vista a nivel de proveedor hasta que esté activada. El editor combinado expone heredar/activar/desactivar; heredar utiliza el valor predeterminado global (desactivado).
- Enrutamiento de localidad de caché de solicitud (`promptCacheAffinityEnabled`, predeterminado** verdadero** ) reordena las conexiones fijadas para que las claves de caché coincidentes permanezcan en una cuenta. Tiene prioridad sobre la rotación por turnos y la rotación ponderada en los pasos fijados por cuenta. Desactívelo en Configuración → Combo defaults si necesita una rotación estricta. No hay anulación por combo.

Para rotación de múltiples cuentas en un modelo, prefiera** un paso de cuenta dinámica** ( `connectionId` vacío, grupo completo) con límite fijo `1`, no tres `connectionId` s fijados. Los pasos fijados más la afinidad colapsan en la misma cuenta incluso mientras el contador RR avanza.

## Estrategia de fusión

`fusion` es la única estrategia que lo hace** no** Elige un solo objetivo. Avisa el aviso para** cada modelo de panel en paralelo** , luego un configurable** modelo de juez** sintetiza una única respuesta final de todas las respuestas del panel. Portado desde `decolua/9router` ascendente (diseño Fusion de OpenRouter); Implementación en `open-sse/services/fusion.ts`.

Cómo funciona:

0. **Bypass portaherramientas** — una solicitud que lleva una matriz `tools` no vacía con `tool_choice` no `"none"` explícitamente omite el panel por completo: enruta directamente a un único modelo (el juez configurado, o `panel[0]`) con `tools`/`tool_choice` pasado sin modificar. Los miembros del panel no tienen acceso a herramientas y la directiva de síntesis del juez desalienta la emisión de llamadas de herramientas, por lo que los clientes agentic/tool-calling obtienen una decisión de llamada de herramientas real en lugar de prosa sintetizada (#6771).
1. **Distribución en abanico** (solo solicitudes que no contienen herramientas) — el mensaje se envía a cada modelo de panel a la vez, forzado sin transmisión con herramientas despojadas (el juez necesita prosa completa para sintetizar).
2. **Colección de gracia del quórum** — tan pronto como llegan las respuestas `minPanel`, se inicia un breve cronómetro de gracia para los rezagados, luego la fusión continúa con lo que se haya recolectado. Esto limita la penalización del modelo más lento en el tiempo de pared, limitada por un tiempo de espera estricto.
3. **Síntesis del juez** Las respuestas del panel — son anónimas (`Source 1`, `Source 2`, … — para que el juez sopese la sustancia, no la marca modelo) y se entregan al juez, quien analiza el consenso / contradicciones / cobertura parcial / ideas únicas / puntos ciegos, y luego escribe** uno** respuesta autorizada. La llamada de juez mantiene las herramientas `stream` flag + originales del cliente, por lo que el uso de herramientas de transmisión y descendente aún funciona.
4. **Degradación elegante** — 0 respuestas del panel → `503`; exactamente 1 sobreviviente → esa respuesta se devuelve directamente (nada que fusionar); un panel de un solo modelo responde directamente.

Un miembro del panel también puede ser un paso `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) que hace referencia a otro — combinado que se resuelve como** una voz de panel de caja negra** (un envío recursivo completo al combo al que se hace referencia, no un despliegue de los propios objetivos de ese combo), con la misma protección depth/cycle que ya utiliza cualquier otra estrategia que consuma referencias de combo (#6764).

### Configuración

Configurado en el blob `config` del combo (sin migración de esquema — reutiliza la tabla `combos` existente):

| Campo                                    | Tipo     | Por defecto            | Objetivo                                                                                                    |
| :--------------------------------------- | :------- | :--------------------- | :---------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primer modelo de panel | Modelo que sintetiza la respuesta final                                                                     |
| `config.fusionTuning.minPanel`           | `number` | `2`                    | Se requieren respuestas exitosas antes de que comience el cronómetro de gracia (fijado en `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                 | ¿Cuánto tiempo deben esperar los rezagados una vez que se alcanza el quórum?                                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                | Límite absoluto para que un modelo colgado no pueda detener la solicitud                                    |

Los valores predeterminados se encuentran en `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Ejemplo

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Luego llámalo como cualquier combo: `{"model":"fusion-panel","messages":[...]}`.

## Fábrica virtual de Auto-Combo

El motor Auto Combo no requiere combos predefinidos. En su lugar, `open-sse/services/autoCombo/virtualFactory.ts` genera candidatos sobre la marcha:

1. Obtiene `getProviderConnections({ isActive: true })` (todas las conexiones habilitadas)
2. Filtra aquellas que tienen credenciales válidas (clave de API o token OAuth no caducado mediante `hasUsableOAuthToken()`)
3. Cruza los datos con `getProviderRegistry()` para determinar la disponibilidad y los precios de los modelos
4. Para cada tupla `(provider, model, connection)`, crea un `VirtualAutoComboCandidate`
5. Selecciona `connection.defaultModel` (o el primer modelo del registro) como destino de enrutamiento
6. Puntúa cada candidato mediante `scorePool()`, que usa 16 factores, y el conjunto de pesos de la variante
7. Devuelve el `AutoComboConfig` resultante en memoria para `handleComboChat()`; nunca se persiste en la base de datos

Esto significa que **añadir un proveedor nuevo con `auto/*` habilitado amplía automáticamente el conjunto de candidatos**, sin necesidad de editar manualmente el combo. El combo virtual se reconstruye para cada solicitud, por lo que las conexiones recién añadidas o que acaban de recuperar un estado saludable se incorporan inmediatamente.

## Autorrecuperación

- **Exclusión temporal**: puntuación < 0.2 → excluido durante 5 min (espera progresiva, máximo de 30 min)
- **Conocimiento del disyuntor**: OPEN → exclusión automática; HALF_OPEN → solicitudes de prueba
- **Modo incidente**: >50 % en estado OPEN → deshabilita la exploración y maximiza la estabilidad
- **Recuperación tras el periodo de espera**: después de una exclusión, la primera solicitud es una «prueba» con un tiempo de espera reducido

## Exploración mediante bandits

El 5 % de las solicitudes (configurable) se enruta a proveedores aleatorios para fines de exploración. Esta función se deshabilita en el modo incidente.

## API

**No existe un endpoint `POST /api/combos/auto` dedicado** — Auto-Combo se utiliza de dos maneras:

1. **Sin configuración (recomendado):** Envía cualquier solicitud de finalización de chat con `model: "auto"` o `model: "auto/<variant>"`. La fábrica virtual crea la combinación para cada solicitud; no se necesita persistencia ni llamadas a la API.

2. **Combinación persistente con `strategy: "auto"`:** Crea una combinación normal mediante `POST /api/combos` y establece `strategy: "auto"`, además de `config.auto.weights` / `config.auto.candidatePool`. Se utiliza el mismo motor de puntuación; la combinación se almacena en `combos` y puede reutilizarse por ID.

Para la detección, `GET /api/combos/auto` enumera cada variante con su conjunto de candidatos resuelto, además de `context_length` / `max_output_tokens`: el valor MÁXIMO entre las ventanas del conjunto de candidatos. Los clientes (por ejemplo, el complemento de opencode) deben anunciar estos valores en lugar de `0`: un contexto de cero desactiva por completo la compactación automática de opencode, lo que permite que las sesiones crezcan hasta que la purga del historial de la puerta de enlace destruya el contexto. Es seguro anunciar el valor MÁXIMO porque el prefiltro de contexto de la combinación automática dirige las solicitudes sobredimensionadas a candidatos con ventanas grandes.

```bash
# Uso sin configuración (sin crear una combinación)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combinación automática persistente mediante el endpoint normal de combinaciones
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estrategias del enrutador automático

Las combinaciones persistentes con `strategy: "auto"` pueden establecer `config.routerStrategy` (o la opción heredada
`config.auto.routerStrategy`) en uno de los siguientes valores:

- `rules` — puntuación ponderada predeterminada
- `score` — selecciona la puntuación ponderada configurada más alta. Los empates exactos conservan el orden
  configurado de los candidatos; el `explorationRate` existente toma muestras del conjunto clasificado completo.
- `cost` / `eco` — proveedor disponible más económico
- `latency` / `fast` — latencia p95 más baja con penalización por fiabilidad
- `sla-aware` / `sla` — prioriza los candidatos que cumplen los SLO de latencia p95, tasa de errores y, opcionalmente,
  coste
- `lkgp` — prioriza el último proveedor conocido como válido
- `nadir` — consulta a la API de decisiones de [Nadir](https://getnadir.com) qué modelo del conjunto
  necesita el prompt; requiere activación expresa y, en caso de error, recurre a `rules`

### Estrategias del enrutador en detalle

El motor de combinaciones automáticas ofrece 7 implementaciones conectables de **RouterStrategy** que
puedes intercambiar mediante `config.routerStrategy` (o la opción heredada `config.auto.routerStrategy`).
Cada estrategia elige un proveedor del conjunto de candidatos a partir de un `RoutingContext`
(tipo de tarea, indicios sobre herramientas/visión, estimación de tokens, política de SLA opcional y
último proveedor conocido como válido opcional).

#### 1. `rules` (predeterminada) — puntuación ponderada de 16 factores

Encapsula el motor de puntuación existente. Filtra los candidatos con el disyuntor
en estado `OPEN` y, después, ejecuta `scorePool()` con el tipo de tarea actual y `getTaskFitness()`,
seleccionando el proveedor con la puntuación más alta.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: De forma predeterminada. Úsala cuando quieras un equilibrio entre todas las señales.

**Alias**: `rules` (sin alias)

---

#### 2. `cost` / `eco` — proveedor disponible más económico

Ordena el conjunto de candidatos por `costPer1MTokens` (en orden ascendente) y selecciona el más económico.
Primero filtra los candidatos con estado `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: Cargas de trabajo sensibles al coste, procesamiento por lotes o tareas en segundo plano.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — latencia p95 más baja con penalización por fiabilidad

Ordena según `p95LatencyMs + (errorRate * 1000)`. La penalización por tasa de errores garantiza
que los proveedores poco fiables obtengan una clasificación inferior, incluso si su latencia nominal es baja.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: Cargas de trabajo sensibles a la latencia, como chats en tiempo real, autocompletado o
asistentes de programación interactivos.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — cumplimiento de los SLO de latencia/error/coste

Puntúa cada candidato según el grado en que satisface la política de SLO configurada:

| Factor                    | Peso | Fórmula                                             |
| ------------------------- | ---- | --------------------------------------------------- |
| Puntuación de latencia    | 35%  | `threshold / max(value, ε)`                         |
| Puntuación de errores     | 35%  | `threshold / max(value, ε)`                         |
| Puntuación de salud       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)   |
| Puntuación de coste       | 10%  | `threshold / max(value, ε)` o inversa normalizada   |
| Puntuación de estabilidad | 5%   | desviación estándar de latencia normalizada inversa |

Cuando `hardConstraints: true`, los candidatos se ordenan principalmente por **puntuación de incumplimiento**
(cuánto exceden algún SLO) y, después, por la puntuación compuesta. De lo contrario, solo se utiliza
la puntuación compuesta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... puntúa cada candidato según la política: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campos de SLA** (definidos en la configuración combinada):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Cuándo usarla**: Cargas de trabajo de producción con presupuestos estrictos de latencia, tasa de errores o coste.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — primero el último proveedor conocido como válido

Prueba primero el **último proveedor conocido como válido** (si está definido) y, después, recurre a la
estrategia `rules`. Resulta útil para mantener la afinidad de sesión: el mismo proveedor gestiona
las solicitudes posteriores de una conversación.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Recurrir a la estrategia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Cuándo usarla**: Conversaciones de varios turnos en las que se desea que el mismo proveedor gestione
las solicitudes posteriores (por ejemplo, para el almacenamiento en caché, la continuidad del contexto o la coherencia de precios).

**Alias**: `lkgp` (sin alias)

---

#### 6. `nadir` — selección de modelos basada en el prompt mediante Nadir

Todas las estrategias anteriores clasifican a los candidatos según su propia telemetría; ninguna de ellas lee
la solicitud. `nadir` envía el último turno del usuario junto con los identificadores de modelo del grupo a
la API de decisión de [Nadir](https://getnadir.com) (`POST /v1/bucket`) y enruta hacia el modelo
que Nadir selecciona de ese menú (`simple` → el modelo competente más barato, `complex` → el
modelo de vanguardia). La conexión que sirve ese modelo sigue siendo seleccionada por `rules`, de modo que la cuota,
el estado y el coste continúan determinando qué cuenta se utiliza.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` y `OMNIROUTE_NADIR_BASE_URL` son valores alternativos de entorno para las dos
cadenas. `baseUrl` solo es necesario para una instancia autoalojada de Nadir (se admite un `/v1` final).
Las llamadas sin clave se dirigen al nivel anónimo de Nadir, cuya tasa está limitada por IP. Con una clave
([crea una](https://app.getnadir.com/dashboard/api-keys)), cada decisión se
registra en tu panel de Nadir. Configuración y verificación completas:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Qué sale del sistema: el texto del último mensaje del usuario (los primeros 16 000 caracteres), los identificadores
de los modelos candidatos y una etiqueta de canal `source: "omniroute"`. No se envían el prompt del sistema, el historial, las herramientas ni
las cabeceras.

El comportamiento ante fallos es abierto: un tiempo de espera agotado (2000 ms de forma predeterminada), una respuesta que no sea 2xx, un host
inaccesible, una respuesta con formato incorrecto o una selección que no pertenezca al grupo hacen que se utilice la decisión de `rules`
y que el motivo lleve el prefijo `NadirStrategy: fallback (…)`. Tras una llamada fallida, la
estrategia omite la red durante 30 s, por lo que una interrupción genera un único tiempo de espera agotado cada 30 s, en lugar de
uno por solicitud. Los eventos de enrutamiento informan de `strategy: "nadir"` únicamente cuando Nadir tomó realmente
la decisión.

**Cuándo usarla**: Tráfico de dificultad variable en un grupo que abarca varios niveles de modelos (uno pequeño, uno intermedio
y uno de vanguardia), cuando se desea reducir el coste de usar siempre el modelo de vanguardia.

**Alias**: `nadir` (sin alias)

---

### Estrategias de enrutamiento personalizadas

Puedes registrar tu propia implementación de `RouterStrategy` mediante la API pública:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Tu lógica de enrutamiento aquí
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Después, úsala:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guía de selección de estrategias de enrutamiento

| Caso de uso            | Estrategia  | Motivo                                        |
| ---------------------- | ----------- | --------------------------------------------- |
| Carga equilibrada      | `rules`     | Predeterminada — considera todos los factores |
| Minimizar costes       | `cost`      | Siempre elige la opción más barata            |
| Minimizar latencia     | `latency`   | Elige el proveedor fiable más rápido          |
| SLO estrictos          | `sla-aware` | Filtra por umbrales de p95/error/coste        |
| Chat multiconversación | `lkgp`      | Afinidad de sesión                            |
| Dificultad variable    | `nadir`     | Elige el nivel de modelo para cada prompt     |

Campos compatibles con SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adecuación por tarea

Más de 30 modelos evaluados en 6 tipos de tareas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Admite patrones comodín (p. ej., `*-coder` → puntuación alta en programación).

## Resumen de variantes automáticas

Incluyendo `auto` sin variante (valor predeterminado) y los 6 valores de `AutoVariant` declarados en `autoPrefix.ts`, hay **7 ID de modelo invocables**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` enumera 6 valores; la séptima opción es «sin variante» — `auto` sin variante — que `parseAutoPrefix()` gestiona como `variant: undefined`).

## Cómo encajan los niveles en Auto-Combo

La función de puntuación de 16 factores (`open-sse/services/autoCombo/scoring.ts`) trata la pertenencia a un nivel como dos señales: `tierPriority` (0.0476) y `tierAffinity` (0.0476). Consulta la [tabla canónica de factores de puntuación](#how-it-works-persisted-auto-combos) anterior para ver el conjunto completo de `DEFAULT_WEIGHTS`; las anulaciones por paquete (ship-fast/cost-saver/quality-first/
offline-friendly) aparecen en la tabla «Perfiles de pesos por paquete».

El nivel por sí solo **no** obliga a que el Nivel 1 sea el primero: si la latencia del Nivel 1 es mala o la relación entre coste y calidad no es óptima, gana el Nivel 2. Para imponer el orden de los niveles, usa la estrategia de combo `priority` y organiza los proveedores por nivel.

Para favorecer claramente el Nivel 1 (suscripción), aumenta el peso de `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulta [`docs/guides/TIERS.md`](../guides/TIERS.md) para conocer las definiciones de los niveles y la clasificación de los proveedores.

## Pruebas y cobertura

### Matriz determinista de decisión de enrutamiento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` prueba el enrutamiento** decisión** de las 21 estrategias públicas de un extremo a otro a través del canal combinado real con un upstream simulado. La cobertura incluye:

- Las 21 estrategias `ROUTING_STRATEGY_VALUES` (ordenadas, ponderadas, de costo, de contexto, de fusión,…).
- `quota-share` (interno) de extremo a extremo: equidad DRR despriorización de saturación + a través de la costura `selectQuotaShareTarget` real (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Cobertura de transferencia universal `context-relay` en todos los recuentos de objetivos.

Esta suite se ejecuta en CI (trabajo `test:integration` ) con `--test-concurrency=1` y `--test-force-exit`, por lo que es determinista y no requiere credenciales activas.

### Humo vivo cerrado (NOT en CI — proveedores reales)

| Dominio                                | que hace                                                                                     |
| :------------------------------------- | :------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Enrutamiento real en proceso con `RUN_COMBO_LIVE=1`; instantáneas de un OmniRoute en vivo DB |
| `npm run test:combo:live:vps`          | HTTP llama a un servidor OmniRoute en vivo (establezca `COMBO_LIVE_BASE_URL`)                |
| `npm run test:combo:live:vps:failover` | Lo mismo ocurre con escenarios de conmutación por error deliberados                          |

Estas pruebas de humo ejercitan la ruta del cable real (completación → del proveedor → ). Están excluidos intencionalmente de CI porque requieren credenciales activas y acceso VPS.

---

## Archivos

| Archivo                                                   | Objetivo                                                                                                                        |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                  | Función de puntuación de 16 factores, `DEFAULT_WEIGHTS`, norma del grupo                                                        |
| `open-sse/services/autoCombo/taskFitness.ts`              | Búsqueda de aptitud de tarea de modelo ×                                                                                        |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de selección, bandido, límite presupuestario.                                                                            |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusión, sondas, modo incidente.                                                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfiles de peso (envío rápido, ahorro de costos, calidad primero, compatible sin conexión, confiabilidad primero, modo caos) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analizador de prefijos `auto/` + 6 variantes                                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea `AutoComboConfig` en memoria a partir de conexiones en vivo.                                                               |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de prueba para burlarse del registro de proveedores                                                                      |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 estrategias)                                                                                      |
| `src/sse/handlers/chat.ts`                                | Integración: cortocircuito de prefijo automático                                                                                |
