# Cost & Spend Tracking (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Cómo OmniRoute estima, registra e informa del coste de cada solicitud, y por qué la
cifra del panel es un **seguimiento de ahorros**, no una factura.

Consulte también: [Guía del usuario](./USER_GUIDE.md) · [Galería de funcionalidades](./FEATURES.md)

---

## Qué es (y qué no es)

OmniRoute atribuye un coste en USD por solicitud a cada finalización multiplicando los
recuentos de tokens por las tarifas del modelo. Estas cifras alimentan el panel de
**Costes**, la CLI `omniroute cost` / `omniroute usage`, las exportaciones CSV/JSON y los
presupuestos por clave de API.

> **El "coste" del panel es un seguimiento de ahorros, no una factura.** OmniRoute nunca
> le cobra: enruta sus solicitudes a proveedores que usted ya ha conectado (sus propias
> suscripciones, niveles gratuitos y claves de API). Un "coste total de $290" acumulado
> íntegramente en modelos gratuitos significa que, aproximadamente, **no pagó _$290_** a
> una API de pago. La cifra es una _estimación_ de lo que habría costado el mismo tráfico
> a precios de lista estándar, de modo que pueda ver dónde se concentra su uso y cuánto
> está ahorrando al enrutar a proveedores más baratos o gratuitos.

Este enfoque se indica directamente en el [README](../../README.md) del proyecto ("el
'coste' del panel es un seguimiento de ahorros, no una factura").

Dado que la cifra es una estimación:

- Depende de la tabla de precios que OmniRoute tenga para cada modelo. Un modelo sin una
  entrada de precios contribuye con un coste de `0` (aparece como una fila "Heredado /
  Gratuito" en el explorador).
- El tráfico de niveles gratuitos y suscripciones sigue acumulando un coste _estimado_;
  esa es la cantidad que está ahorrando, no una cantidad adeudada.

---

## Cómo se estiman los costos

### La fuente de precios

Los costos provienen de la tabla de precios fusionada en [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), en este orden de precedencia (**más alto primero** ):

1. **Anulaciones de usuario** Precios — establecidos en el panel o mediante `PATCH /api/pricing` (el espacio de nombres `pricing` ).
2. **sincronización de modelos.dev** Precios — obtenidos de `https://models.dev/api.json` (el espacio de nombres `models_dev_pricing` ).
3. **sincronización LiteLLM** Precios — obtenidos del `model_prices_and_context_window.json` público de LiteLLM(el espacio de nombres `pricing_synced` ).
4. **Valores predeterminados codificados** Tarifas — enviadas en [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

Para el mismo provider/model, los valores de las capas de mayor prioridad sobrescriben los campos coincidentes en las capas inferiores; Los campos ausentes de una capa superior aún pueden provenir de una capa inferior. El orden es fijo incluso cuando ambos trabajos de sincronización independientes se ejecutan al mismo tiempo. `GET /api/pricing?includeSources=1` devuelve `pricing` y `sourceMap`, cuyas etiquetas por modelo (`user`, `modelsDev`, `litellm`, `default`) identifican la capa de mayor prioridad que contiene ese modelo.

**sincronización LiteLLM** es opcional, deshabilitado de forma predeterminada. Sus variables de entorno (ver [`.env.example`](../../.env.example) ) son:

| var.env                 | Por defecto | Objetivo                                                                                 |
| ----------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`     | Habilite la sincronización de precios LiteLLM en segundo plano.                          |
| `PRICING_SYNC_INTERVAL` | `86400`     | Intervalo de sincronización en segundos (diario).                                        |
| `PRICING_SYNC_SOURCES`  | `litellm`   | Selección de fuente solo para esta sincronización; Actualmente solo se admite `litellm`. |

**sincronización de modelos.dev** está separado de la sincronización LiteLLM y también está deshabilitado de forma predeterminada. Habilítelo en Configuración (sincronización de models.dev) o use estas variables:

| var.env                    | Por defecto   | Objetivo                                                                                                                                                            |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(desarmado)_ | Desarmar sigue el interruptor de Configuración; `1/true/on/yes` fuerza el encendido y `0/false/off/no` fuerza el apagado (incluso si la Configuración lo habilita). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`       | Intervalo de sincronización predeterminado de models.dev en segundos (diario).                                                                                      |

`PRICING_SYNC_SOURCES` hace **no** habilitar modelos.dev; controla sólo la sincronización LiteLLM. La eliminación de una anulación de usuario no borra ninguno de los espacios de nombres sincronizados; la siguiente capa de precios disponible entra en vigor. Para un modelo sin precio, verifique tanto la configuración de sincronización como el `sourceMap` antes de agregar una anulación manual.

### La fórmula del costo

El costo se calcula por solicitud a partir del recuento de tokens y las tasas por millón de tokens en [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`):

- **Fichas de entrada** (menos lecturas de caché y tokens de creación de caché) Tasa × `input`.
- **Tokens de lectura de caché** Tasa × `cached` (vuelve a la tasa de entrada).
- **Tokens de creación de caché** Tasa × `cache_creation` (vuelve a la tasa de entrada).
- **Fichas de salida** Tasa × `output`.
- **fichas de razonamiento** Tasa × `reasoning` (vuelve a la tasa de salida).

Todas las tasas se interpretan como USD por 1.000.000 de tokens. Un nivel de servicio Codex "rápido"/"prioritario" o "flexible" aplica un multiplicador de costos (`getCodexFastCostMultiplier`). — por ejemplo, flex se factura con un descuento simbólico del 50%, que aparece como **ahorro flexible** en el tablero.

Los nombres de los modelos se normalizan primero (los prefijos de ruta del proveedor, como `openai/` o `accounts/fireworks/models/` se eliminan), por lo que las filas históricas aún coinciden con un precio.

### Cómo se registra el gasto

- El costo por solicitud se calcula al finalizar la solicitud. El consumo de cuota compartida se programa en el siguiente ciclo de eventos a través de [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- El gasto de claves API se almacena en búfer y se vacía en lotes mediante [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalo de descarga predeterminado de 60 segundos, búfer de 1000 entradas). Sintonizable vía:

  | var.env                             | Por defecto | Objetivo                                                      |
  | ----------------------------------- | ----------- | ------------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`     | Intervalo de descarga en milisegundos.                        |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`      | Máximo de entradas almacenadas en el búfer antes del vaciado. |

Los costos prefieren un cargo exacto informado por el proveedor (`provider_cost_usd`), luego una instantánea de solicitud con precio de catálogo (`calculated_cost_usd`) y luego una nueva fijación de precios simbólica del catálogo actual. Los costos almacenados no se vuelven a cobrar a través de sus recuentos de tokens. Las filas de tokens heredados aún cambian cuando cambia el precio de su catálogo.

### OCR e incrustaciones

- Las solicitudes `/v1/ocr` exitosas utilizan `usage_info.pages_processed` ascendente, no el rango de páginas solicitado ni la cantidad de objetos de página devueltos. La estimación es páginas × `ocr_cost_per_page` ( USD/page absoluto,**no** USD/million).
- Las solicitudes con anotaciones en documentos o cuadros delimitadores requieren una tarifa `ocr_cost_per_annotated_page` separada. Sin él, el costo sigue siendo desconocido; la tarifa ordinaria OCR no se sustituye silenciosamente.
- La sincronización LiteLLM asigna su campo `annotation_cost_per_page` ascendente a `ocr_cost_per_annotated_page`, conservando el valor USD/page absoluto y las entradas de solo anotaciones, incluido el cero explícito. Un campo canónico proporcionado tiene prioridad; Los valores de alias no válidos se ignoran. Las anulaciones de precios de usuario conservan su prioridad normal. Consulte [las claves de precios OCR de LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- El uso de OCR almacena el recuento de páginas, el precio unitario, el costo USD calculado, la clave API y la conexión seleccionada. Las páginas nunca se representan como tokens. Los registros de llamadas contienen metadatos de facturación, no documentos URLs, bytes PDF ni texto extraído.
- Las solicitudes `/v1/embeddings` exitosas registran una fila de uso por lote físico, incluidos lotes separados completados en el mismo milisegundo. Los cargos informados por el proveedor tienen prioridad sobre las estimaciones simbólicas; Los envoltorios combinados no añaden ningún cargo.
- El historial de uso, el análisis de costos, las ventanas provider/account, los límites de gasto de claves API, el libro de contabilidad de costos de solicitudes y los resúmenes de uso diario incluyen estos cargos. Las claves sin registro conservan la contabilidad numérica sin conservar el texto fuente.
- El uso o las tarifas faltantes son **desconocido** , no gratuito: se omite el encabezado del costo de respuesta y la política de uso sin precio existente se aplica a claves API limitadas. Las tarifas cero configuradas explícitamente siguen siendo un uso válido de costo cero.

Esta es una contabilidad sólo hacia adelante. Las llamadas OCR/embedding antiguas que nunca escribieron el historial de uso no se pueden reconstruir a partir de esta migración. Las estimaciones del catálogo son estimaciones USD, no una factura, y no incluyen conversión de moneda, impuestos ni descuentos.

---

## Panel: la página Costes

La página **Costes** se encuentra en `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Su vista principal es la pestaña **Resumen de costes**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
que carga todos los datos desde `GET /api/usage/analytics`.

Qué muestra:

- **Tarjetas de gasto** — gasto estimado para _Hoy (1d)_, _7d_, _30d_ y el intervalo
  seleccionado. Selector de intervalo: `7d`, `30d`, `90d`, `all`.
- **Métricas principales** — solicitudes en el intervalo, proveedores activos, modelos activos y coste
  medio por solicitud.
- **Explorador de costes** — una tabla ordenable y filtrable agrupada por **proveedor**, **modelo**,
  **clave de API**, **cuenta** o **nivel de servicio**, con coste, solicitudes, tokens, coste
  medio por solicitud y porcentaje del total.
- **Uso de tokens** — tokens totales / de entrada / de salida y proporción entre entrada y salida.
- **Eficiencia de enrutamiento** — número de alternativas usadas, tasa de uso de alternativas y cobertura del modelo solicitado.
- **Previsión mensual** — proyecta el gasto al final del mes a partir del promedio diario reciente.
- **Comparación de períodos** — cambio porcentual entre la primera y la segunda mitad del intervalo.
- **Gráficos** — tendencia diaria de costes, cuota por proveedor (circular), principales proveedores, principales modelos, coste
  por clave de API, coste por cuenta, patrón de uso semanal y un mapa de calor de actividad.
- **Exportación** — descarga el intervalo actual como **CSV** o **JSON** (los botones aparecen
  cuando existen datos de costes distintos de cero).

Cuando no hay tráfico con precio, las filas muestran la etiqueta "Heredado / Gratuito" en lugar de `$0`,
lo que refleja el modelo de seguimiento de ahorros.

### Subpáginas relacionadas con Costes

El área Costes también incluye (todas bajo `/dashboard/costs/`):

- **Precios** (`/dashboard/costs/pricing`) — permite consultar y reemplazar los precios por modelo (renderiza
  la pestaña compartida Precios).
- **Presupuesto** (`/dashboard/costs/budget`) — permite establecer límites de gasto por ámbito (renderiza la pestaña compartida
  Presupuesto).
- **Cuota compartida** (`/dashboard/costs/quota-share`) — grupos de cuotas compartidas y vistas de la tasa
  de consumo.

---

## Endpoints de la API

Todos requieren autenticación de administración (bucle local/JWT, mediante `requireManagementAuth`), salvo que
se indique lo contrario.

### Análisis de uso y costes

| Método | Endpoint                 | Finalidad                                                                                                                                                                      |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/analytics`   | Análisis completo de costes/uso: resumen, tendencia diaria, por proveedor/modelo/clave de API/cuenta/nivel. Consulta: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Utilización de la cuota por proveedor a lo largo del tiempo. Consulta: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                            |
| `GET`  | `/api/usage/history`     | Filas sin procesar del historial de uso.                                                                                                                                       |
| `GET`  | `/api/usage/call-logs`   | Registros por solicitud (modelo, tokens, coste, latencia, estado).                                                                                                             |
| `GET`  | `/api/usage/quota`       | Estado de la cuota del proveedor.                                                                                                                                              |
| `GET`  | `/api/usage/proxy-logs`  | Registros de solicitudes del proxy.                                                                                                                                            |

### Presupuestos

| Método | Endpoint                 | Finalidad                                                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Resumen de costes + comprobación del presupuesto para una clave de API (se requiere el parámetro de consulta `apiKeyId`). |
| `POST` | `/api/usage/budget`      | Establece límites diarios/semanales/mensuales en USD + umbral de advertencia para una clave de API.                       |
| `GET`  | `/api/usage/budget/bulk` | Resúmenes de presupuestos en bloque para todas las claves de API.                                                         |

> La API de presupuestos tiene como ámbito cada **clave de API** (`apiKeyId`). Los límites devueltos por
> `GET /api/usage/budget` incluyen `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> un `warningThreshold` y los totales acumulados (`totalCostToday`, `totalCostMonth`, …).

### Precios

| Método   | Endpoint                | Finalidad                                                                                                                                                                                 |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Precios combinados de cuatro capas (usuario, models.dev, LiteLLM y valores predeterminados). `?includeSources=1` devuelve `pricing` + `sourceMap`.                                        |
| `PATCH`  | `/api/pricing`          | Reemplaza los precios para `{ provider: { model: { input, output, cached, … } } }`.                                                                                                       |
| `DELETE` | `/api/pricing`          | Elimina las anulaciones de precios del usuario (opcionalmente acotadas por `?provider=&model=`); los precios sincronizados o predeterminados del código siguen disponibles como respaldo. |
| `GET`    | `/api/pricing/defaults` | Muestra las tarifas alternativas predeterminadas por millón.                                                                                                                              |
| `GET`    | `/api/pricing/models`   | Precios indexados por modelo.                                                                                                                                                             |
| `POST`   | `/api/pricing/sync`     | Activa una sincronización manual desde fuentes externas (LiteLLM).                                                                                                                        |
| `GET`    | `/api/pricing/sync`     | Estado actual de la sincronización.                                                                                                                                                       |
| `DELETE` | `/api/pricing/sync`     | Borra solo los precios sincronizados de LiteLLM (`pricing_synced`); los datos de models.dev son independientes.                                                                           |

### Otros endpoints relevantes para los costes

| Método | Endpoint                      | Propósito                                                                      |
| ------ | ----------------------------- | ------------------------------------------------------------------------------ |
| `GET`  | `/api/free-tier/summary`      | Totales de tokens de modelos gratuitos, uso de este mes y asignación restante. |
| `GET`  | `/api/quota/pools/[id]/usage` | Uso de un grupo de cuota compartida.                                           |

---

## CLI

La CLI de OmniRoute proporciona comandos de costes, uso y precios (registrados en
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Un informe de costes agregado a partir de `/api/usage/analytics`.

```bash
omniroute cost                          # últimos 30 días, agrupados por proveedor
omniroute cost --period 7d              # últimos 7 días
omniroute cost --group-by model         # agrupar por provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Columnas: grupo, solicitudes, tokens de entrada/salida, coste (USD) y porcentaje del total. Al final
se muestra una línea con el total general (se omite con `--quiet` o `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # resumen de costes por proveedor
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Presupuestos
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` consulta `GET /api/pricing/defaults`. Para editar los precios de modelos
> individuales, utiliza en su lugar la página **Precios** del panel o `PATCH /api/pricing`.

---

## Solución de problemas

- **Todos los costes muestran $0 / "Legacy / Free".** Los modelos utilizados no tienen ninguna entrada de precios.
  Habilita la sincronización externa (`PRICING_SYNC_ENABLED=true`) y ejecuta `omniroute pricing sync`, o
  establece los precios manualmente desde la página Precios o mediante `PATCH /api/pricing`.
- **El precio de un modelo histórico es incorrecto.** Corrige el precio (sobrescribiéndolo o volviendo a sincronizarlo); el coste se
  recalcula a partir del número de tokens en cada consulta de analíticas, por lo que las estimaciones se actualizan retroactivamente.
- **El gasto está retrasado con respecto al tiempo real.** El gasto por clave se procesa por lotes; reduce
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` si necesitas cifras más actualizadas.

---

Para saber cómo encaja esto en el panel general, consulta la [Guía del usuario](./USER_GUIDE.md) y
la [Galería de funcionalidades](./FEATURES.md).
