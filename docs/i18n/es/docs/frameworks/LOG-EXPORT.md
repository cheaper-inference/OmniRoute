# Log export (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Exportación continua e incremental de los registros de llamadas de OmniRoute a un almacén de análisis externo.

La pestaña Registros del panel conserva el historial de solicitudes en SQLite (`call_logs`), limitado por
la rotación y la retención. La exportación de registros envía el mismo conjunto de registros de forma programada para que pueda conservarse más tiempo que
la base de datos local y combinarse con otros datos. BigQuery es el primer destino; la
canalización se basa en un registro, por lo que se pueden añadir más destinos.

---

## 1. Cómo funciona

```
servidor (descifrar + validar configuración, conciliar cursor)
  → iniciar IPC → proceso aislado del SO exportChild
    → storage.sqlite de solo lectura → consulta/asignación compartida de registros de llamadas
      → hidratación asíncrona de artefactos → destino prepare()/send()
        → IPC de lote → el servidor persiste el cursor → IPC de confirmación
          → siguiente lote; IPC de finalización → el servidor registra el éxito
```

- **Programación** — una tarea cron de `JobRegistry`, `log_export`, con el valor predeterminado `0 * * * *` (cada hora,
  UTC). Se registra en `src/lib/initCloudSync.ts`; se puede sobrescribir con `OMNIROUTE_LOG_EXPORT_CRON`.
  Cada ejecución procesa todos los destinos **habilitados**, de forma secuencial.
- **Cursor** — el `call_logs.rowid` implícito de SQLite, persistido por destino en
  `log_export_destinations.cursor_row_id`. Se evita deliberadamente usar `timestamp` como cursor: quienes realizan las llamadas
  pueden proporcionar su propio valor, por lo que una solicitud lenta puede escribirse después de otra más rápida que comenzó
  más tarde, y un cursor basado en marcas de tiempo la omitiría.
- **Procesamiento por lotes** — `batch_size` filas por solicitud (500 de forma predeterminada), `max_rows_per_run` filas por ejecución
  (10000 de forma predeterminada), para que una acumulación grande se procese a lo largo de varias ejecuciones en lugar de bloquear una sola.
- **Entrega** — el cursor avanza solo después de que `send()` se resuelva. Si un lote falla, el
  cursor permanece donde estaba, por lo que se vuelve a intentar enviar las mismas filas en la siguiente ejecución. La garantía es
  de entrega al menos una vez más deduplicación en el destino, no de entrega real exactamente una vez: BigQuery identifica cada
  fila mediante el identificador del registro de llamada, que respeta en la medida de lo posible dentro de su propia ventana de deduplicación.
- **Protección contra solapamientos** — la ejecución de cron y `POST .../run` pueden activarse al mismo tiempo. Un destino
  que ya se esté procesando se omite en lugar de procesarse dos veces (`skipped: true` en el resultado de la ejecución),
  por lo que una ejecución simultánea no puede reenviar un lote ni hacer retroceder el cursor.
- **Recuperación tras una purga** — si `cursor_row_id` queda por encima de `MAX(rowid)` (se purgó toda la tabla
  y se reiniciaron los rowid), el ejecutor retrocede a 0 en lugar de dejar de detectar registros de forma permanente.

### Ejecutor aislado y límites

Cada ejecución de un destino en Node inicia un proceso hijo del SO independiente y de corta duración (`child_process`
con IPC, no `worker_threads`). Las lecturas de cuerpos, el análisis y la serialización JSON de las cargas útiles, el
`prepare()` del destino y las operaciones de E/S de red del destino se ejecutan allí, no en el bucle de eventos del servidor.
Solo la configuración y pequeños mensajes de progreso atraviesan el IPC; los registros exportados nunca vuelven
al servidor. La tarea cron y la ruta Ejecutar ahora mantienen el mismo resultado público y la protección contra solapamientos.

El proceso hijo abre el `DATA_DIR/storage.sqlite` resuelto del servidor en modo de solo lectura mediante `node:sqlite`,
con `busy_timeout=5000` y `query_only=ON`. No importa ningún singleton de base de datos ni realiza
migraciones, copias de seguridad ni actualizaciones de SQLite. La gestión de artefactos ausentes o corruptos (incluido el
UPDATE de artefactos corruptos) permanece exclusivamente en la ruta de detalle del panel. Ambas rutas comparten un
resolvedor de detalles puro; la exportación utiliza lecturas asíncronas del sistema de archivos y el mismo orden de resolución:
artefacto → contenido en línea heredado → disco heredado → ninguno. Una ejecución toma una instantánea del rowid máximo de inserción
cuando el proceso hijo abre su lector; las inserciones posteriores esperan a la siguiente ejecución. Este es un límite
de inserción, no una transacción SQLite de larga duración: los escritores del WAL y los puntos de control siguen sin bloquearse durante
las esperas de red. Las actualizaciones y eliminaciones de filas existentes no quedan congeladas por este límite.

Después de cada lote aceptado, el proceso hijo espera una confirmación. El servidor primero persiste
el cursor con `advanceLogExportCursor` y luego envía `ack`; no se inicia ningún lote nuevo antes de ello.
Un fallo de envío, una caída o un tiempo de espera agotado registra un fallo sin hacer avanzar ese lote. Los lotes
confirmados previamente permanecen consolidados; como máximo, solo puede reenviarse el lote no confirmado.
El éxito se registra únicamente después de `done` y de una salida limpia del proceso hijo. Los fallos terminan el proceso hijo
con SIGTERM, pasando a SIGKILL después de 500 ms, y el ejecutor espera a que se cierre el proceso.

| Variable de entorno                           | Valor predeterminado | Propósito                                               |
| --------------------------------------------- | -------------------- | ------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000               | Límite de tiempo real por destino                       |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024                 | Límite del espacio antiguo de V8 del proceso hijo en MB |

Los valores no válidos, no positivos o no enteros utilizan los valores predeterminados. El ajuste del montículo no es un límite
total de RSS; los lotes muy grandes aún pueden agotar la memoria del proceso hijo y hacer que la ejecución falle de forma segura.
El valor predeterminado de 1024 MB deja margen para el lote predeterminado de 500 filas de artefactos de 512 KiB con
los cuerpos habilitados, incluida la serialización JSON en fragmentos de bytes de BigQuery. No hace que un
lote de 10000 filas con cuerpos sea seguro. El agotamiento del montículo de V8 registra un fallo que indica cómo actuar: reduzca el tamaño
del lote o aumente `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; el cursor permanece en el último
lote confirmado. Los cuerpos históricos en línea o en disco no están cubiertos por el límite de los artefactos modernos.
Los operadores deben presupuestar la RSS por separado, especialmente dentro de contenedores con memoria limitada.

El proceso hijo hereda únicamente el valor resuelto de `DATA_DIR`, `NODE_ENV`, el valor explícito de `TZ` (resolución
de la hora local para nombres de archivo heredados), `ELECTRON_RUN_AS_NODE` cuando está presente y las siguientes variables para conexiones salientes:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (y sus formas en minúsculas),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Un despachador global de Undici comparte la resolución del proxy basada exclusivamente en variables de entorno del servidor y las reglas
para omitir el proxy en hosts locales, incluido `NO_PROXY`; no importa `proxyFetch.ts` ni sus indicadores de base de datos o de funcionalidades.
Las credenciales del proxy se ocultan en la salida reenviada y en los errores registrados. Las credenciales del destino
se transmiten únicamente en un mensaje IPC de inicio, nunca en argv ni en el entorno; la salida y los errores reenviados
llevan un prefijo y se sanean. Solo se desactiva `ExperimentalWarning` en los argumentos de ejecución del proceso hijo para evitar
repetir la advertencia de SQLite de Node en cada ejecución de cron; los demás tipos de advertencias siguen siendo visibles.

Los módulos de destino deben poder importarse sin dependencias de Next.js ni exclusivas del servidor. La implementación
actual de BigQuery ya cumple ese contrato. Las cachés de tokens de acceso solo duran lo que dura la ejecución del proceso hijo,
no se conservan entre ejecuciones. Node es el entorno de ejecución compatible (engines de `package.json`), pero la sección
de instalación con Bun del README y `Dockerfile.bun` también anuncian una vía de compatibilidad en producción mediante
`bun:sqlite` (`src/lib/db/core.ts` / adaptadores). Por tanto, con Bun, las exportaciones mantienen la vía anterior
dentro del mismo proceso y emiten una advertencia una sola vez: el aislamiento del heap y del tiempo de espera mediante un proceso hijo no está disponible. Use
Node para aislar el bucle de eventos y los fallos por falta de memoria; aquí Bun no se considera exclusivo para desarrollo.

Cuando `includeBodies` esté habilitado, es preferible una frecuencia de unos minutos, como
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, en lugar de acumular una hora de datos de carga útil pendientes.
Los límites de lotes y filas siguen acotando cada ejecución. El coste de iniciar el proceso se paga por destino y por ejecución;
esto intercambia un pequeño coste de inicio por el aislamiento del bucle de eventos del servidor, no por un menor uso total de CPU.

### Cargas útiles (prompts y respuestas)

De forma predeterminada, la exportación solo incluye los campos de resumen que muestra la **lista** de registros. Al activar
**Exportar prompts y respuestas** (`includeBodies`), también se envía lo que muestra el panel de **detalles**
de registros para cada llamada:

| Campo                            | Contenido                                                           |
| -------------------------------- | ------------------------------------------------------------------- |
| `request_body` / `response_body` | Las cargas útiles de la llamada tal como las muestra el panel       |
| `pipeline_route_decision`        | El destino y el modelo que eligió el enrutador                      |
| `pipeline_client_request`        | La solicitud sin procesar, exactamente como la envió el cliente     |
| `pipeline_openai_request`        | Tras la conversión al formato interno de OpenAI                     |
| `pipeline_provider_request`      | Tal como se envió realmente al proveedor, en su formato             |
| `pipeline_provider_response`     | La respuesta sin procesar del proveedor                             |
| `pipeline_client_response`       | Lo que se devolvió al llamante                                      |
| `pipeline_error`                 | Detalles del error a nivel de canalización para una llamada fallida |
| `bodies_truncated`               | Verdadero cuando algún campo anterior alcanzó `maxBodyBytes`        |

Se trata del contenido de los prompts, por lo que está **desactivado de forma predeterminada** y se elige deliberadamente para cada destino.
Lo que se envía es lo que muestra el panel, porque la exportación y `getCallLogById` comparten la resolución
de detalles: las cargas útiles
ya tienen saneada la información de identificación personal y ocultos los secretos cuando se escriben, y una llamada realizada con una
clave de API `noLog` no almacena ninguna carga útil, por lo que no hay nada que exportar.

Las cargas útiles se leen por fila desde el artefacto del sistema de archivos, por lo que la hidratación solo se ejecuta para los destinos
que la han solicitado. Si un artefacto falta o está dañado, se exporta su resumen con cargas útiles nulas en lugar
de hacer fallar el lote y dejar el cursor bloqueado.

`maxBodyBytes` (valor predeterminado: 262144) limita cada campo. Las cargas útiles más largas se **truncan en lugar de
descartarse** — un prompt recortado sigue respondiendo a «qué se preguntó» — y la fila se marca con
`bodies_truncated`. No se exportan los incrementos transmitidos fragmento a fragmento; la respuesta ensamblada
ya está en `pipeline_provider_response` y `pipeline_client_response`.

---

## 2. Archivos

| Componente                                     | Ubicación                                    |
| ---------------------------------------------- | -------------------------------------------- |
| Contrato de destino                            | `src/lib/logExport/types.ts`                 |
| Registro                                       | `src/lib/logExport/registry.ts`              |
| Gestión de secretos                            | `src/lib/logExport/secrets.ts`               |
| Ejecutor (IPC del proceso padre)               | `src/lib/logExport/runner.ts`                |
| Ciclo de vida del proceso                      | `src/lib/logExport/childRunner.ts`           |
| Punto de entrada del proceso hijo              | `src/lib/logExport/exportChild.ts`           |
| Apertura en modo de solo lectura               | `src/lib/db/logExportReadOnly.ts`            |
| Consulta y mapeo compartidos                   | `src/lib/usage/callLogExportQueries.ts`      |
| Resolución de detalles                         | `src/lib/usage/callLogDetailResolver.ts`     |
| Proyección de la API                           | `src/lib/logExport/presenter.ts`             |
| Destino BigQuery                               | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticación con cuenta de servicio de Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Origen del registro de llamadas                | `src/lib/usage/callLogExportSource.ts`       |
| Persistencia                                   | `src/lib/db/logExportDestinations.ts`        |
| Tarea cron                                     | `src/lib/jobs/logExportJob.ts`               |
| Capa REST                                      | `src/app/api/log-export/`                    |
| Página del panel                               | `src/app/(dashboard)/dashboard/log-export/`  |

Esquema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Todas las rutas requieren autenticación de administración (`requireManagementAuth`). Los secretos nunca se devuelven:
un secreto almacenado se devuelve como el literal `__stored__`, y enviar ese valor en una actualización
conserva la credencial almacenada.

Crear o actualizar un destino cuyo tipo declare un secreto **requiere
`STORAGE_ENCRYPTION_KEY`**. Sin ella, `encrypt()` deja pasar el valor sin cifrarlo ni avisar, por lo que la escritura se
rechaza con un código 400 en lugar de guardar una credencial en SQLite en texto plano (la misma protección que
aplica el webhook de Telegram).

| Método   | Ruta                                     | Propósito                                                                               |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipos de destino y su lista de campos de configuración                                  |
| `GET`    | `/api/log-export/destinations`           | Listar destinos (con los secretos ocultos)                                              |
| `POST`   | `/api/log-export/destinations`           | Crear un destino                                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Consultar un destino                                                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | Actualizar nombre / activación / configuración / procesamiento por lotes                |
| `DELETE` | `/api/log-export/destinations/{id}`      | Eliminar                                                                                |
| `POST`   | `/api/log-export/destinations/{id}/test` | Comprobar credenciales sin escribir nada                                                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Procesar los registros pendientes ahora, con el mismo flujo que la ejecución programada |
| `GET`    | `/api/log-export/status`                 | Estado de cron, ejecuciones recientes y registros pendientes por destino                |

`GET /api/log-export/types` es lo que permite que la interfaz sea genérica: el formulario del panel se genera a partir de
los descriptores de campos devueltos, por lo que añadir un nuevo destino no requiere cambios en la interfaz.

---

## 4. Destino BigQuery

Claves de configuración (`type: "bigquery"`):

| Clave                | Notas                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | Proyecto de GCP que contiene el conjunto de datos                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | Solo se usa cuando es necesario crear el conjunto de datos (valor predeterminado: `EU`)        |
| `serviceAccountJson` | Clave de la cuenta de servicio. Secreto: se cifra en reposo y nunca se devuelve                |
| `autoCreate`         | Crear el conjunto de datos y la tabla en la primera exportación (valor predeterminado: `true`) |

La cuenta de servicio necesita `bigquery.tables.updateData` en la tabla de destino, además de
`bigquery.datasets.create` / `bigquery.tables.create` cuando `autoCreate` está activado.

Un lote configurado es una unidad de **cursor**, no de HTTP: `send()` lo divide en llamadas a insertAll
de un máximo de 500 filas, por lo que un valor elevado de `batch_size` no puede superar el límite de 10 MB por solicitud de BigQuery.
Los códigos de estado transitorios (408/429/500/502/503/504) se reintentan hasta tres veces con espera
exponencial, reutilizando los mismos insertIds; los fallos de autenticación y de esquema lanzan una excepción en el primer intento en lugar
de malgastar la ejecución.

Una tabla recién creada aún no es visible para el endpoint de streaming, que responde
con un 404 durante unos segundos. Ese 404 se reintenta, pero **solo cuando la tabla se ha creado en esta ejecución** —
si la tabla realmente no existe, se sigue fallando de inmediato. Ten en cuenta que volver a crear una tabla con un nombre que
se ha eliminado recientemente hace que BigQuery rechace las inserciones en streaming durante varios minutos; es una
característica del proceso de eliminar y volver a crear, así que es preferible usar un nombre de tabla nuevo en lugar de eliminarla y volver a añadirla.

**Un fallo parcial llega como HTTP 200 con un `insertErrors[]` no vacío.** Se trata como
un fallo y lanza una excepción, lo que impide que el cursor avance más allá de las filas que BigQuery nunca
aceptó; `tests/unit/log-export-bigquery.test.ts` verifica este comportamiento.

El transporte utiliza REST directamente: se intercambia una aserción RS256 autofirmada por un token de acceso en
`https://oauth2.googleapis.com/token` y, después, las filas se envían a `tabledata.insertAll`. No se
incorpora ningún SDK de Google. Los tokens de acceso se almacenan en la caché del proceso por cada par (cuenta de servicio, ámbito).

La tabla creada contiene una columna por cada campo de la pestaña de registros, más `exported_at`, y se organiza según
la forma en que se consultan realmente los registros de llamadas:

- **Particionada por día según `timestamp`**, de modo que una consulta acotada por fechas solo examina esos días.
- **Agrupada por `api_key_name`, `provider`, `model`, `status`** (en ese orden), de modo que filtrar por
  quién ejecutó la llamada, adónde se dirigió o si falló permite descartar bloques dentro de cada partición. BigQuery
  permite un máximo de cuatro columnas de agrupación y el orden importa: un filtro solo por `api_key_name`
  descarta bloques; un filtro solo por `status`, no.
- **Retención opcional de particiones** mediante `partitionExpirationDays` (0 lo conserva todo), aplicada
  cuando se crea la tabla.

Ambos ajustes se aplican en el momento de la creación. Una tabla existente conserva la organización que ya tenga, así que
apunta el destino a un identificador de tabla nuevo si quieres adoptarlos.

`tests/unit/log-export-bigquery.test.ts` comprueba que el mapeador y el esquema de la tabla se mantienen
sincronizados, para que ninguna columna nueva del registro de llamadas se descarte silenciosamente durante la exportación.

Los lotes se dividen según **ambos** criterios: el número de filas y los bytes serializados. El número de filas por sí solo no basta
cuando se exportan las cargas útiles: 500 filas con prompts pueden ocupar decenas de megabytes, e insertAll
rechaza las solicitudes de más de 10 MB. Cada fragmento se cierra al alcanzar 500 filas o 9 MB, lo que ocurra primero.

---

## 5. Destino de trazas OTLP/HTTP

La configuración usa `type: "otlp-http"`. Se trata de una exportación programada de registros
de llamadas persistidos basada en un cursor, no del receptor de eventos de enrutamiento en vivo
con entrega de mejor esfuerzo de `open-sse/services/routing/otel.ts`. No lee ni modifica las variables
de entorno, los temporizadores ni los búferes de ese receptor. Habilitar ambos puede producir dos tipos independientes de spans;
use el ámbito de instrumentación `omniroute.log-export` para distinguir estos spans de registros de llamadas.

| Clave                    | Valor predeterminado / finalidad                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) completa de trazas obligatoria; no se añade el sufijo `/v1/traces`                           |
| `headers`                | Líneas `Name: value` opcionales u objeto JSON de cadenas; cifrados                                       |
| `requestHeaderAllowlist` | Vacía (desactivada); nombres/prefijos de cabeceras del cliente que se capturarán como atributos del span |
| `serviceName`            | `omniroute`; atributo de recurso `service.name`                                                          |
| `langfuseMapping`        | `false`; añade atributos de generación/sesión/usuario de Langfuse                                        |
| `identity`               | `pseudonymous`, `keyName` o `none`                                                                       |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                  |
| `timeoutMs`              | `30000` por intento HTTP                                                                                 |
| `environment`            | Sin establecer; `langfuse.environment` opcional                                                          |

El panel genérico muestra estos campos. `paths` acepta un array de la API o un área de texto
con rutas exactas separadas por saltos de línea/comas. Las rutas de embeddings, rerank y otras
se omiten salvo que se permitan explícitamente. Las filas omitidas también hacen avanzar el cursor; los contadores
`exported`/`exportedTotal` del ejecutor existente cuentan las filas de origen procesadas, incluidas las filtradas,
en lugar de los spans aceptados. El filtrado se realiza en el proceso hijo, sin cambiar su
contrato de IPC/cursor.

La validación de URL usa la función auxiliar `parseAndValidateNonMetadataUrl`, que no requiere base de datos, de
`src/shared/network/outboundUrlGuard.ts`: la política `block-metadata`. Tiene las mismas
comprobaciones incondicionales de metadatos/protocolo/credenciales incrustadas que el validador de webhooks con
las URL privadas habilitadas, pero permite deliberadamente destinos localhost/LAN sin necesidad de una
anulación global mediante un indicador de funcionalidad. Esto permite endpoints de Langfuse, Phoenix, Tempo y Collector
autoalojados, incluidos endpoints HTTP privados. Los hosts de metadatos de la nube siempre se bloquean.
No se siguen redirecciones, por lo que un recopilador no puede redirigir credenciales a otro host.
Al igual que la protección léxica de URL existente, esto no fija la resolución DNS; configure únicamente
hosts controlados por el operador. Dé preferencia a HTTPS siempre que el endpoint no esté en una red de confianza.

### Carga útil y entrega

El JSON de OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) transporta un
span CLIENT por cada fila permitida, cuyo nombre es la ruta exacta de su solicitud. Los nombres basados en rutas distinguen
Chat Completions, Responses y Messages sin incrustar datos del modelo ni de identidad en el
nombre del span. Los atributos del recurso incluyen `service.name` y `service.version` del paquete.

El registrador habitual de intentos de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) escribe
`duration = Date.now() - startTime` al finalizar y no proporciona una marca de tiempo;
`saveCallLogOperation` en `src/lib/usage/callLogs.ts` establece de forma predeterminada la marca de tiempo en el momento de escritura
(finalización). Por tanto, la exportación establece el fin = marca de tiempo de la fila y el inicio = fin − duración
(milisegundos, convertidos a nanosegundos decimales). Las marcas de tiempo históricas proporcionadas por quien realiza la llamada
también se conservan como hora de finalización; no hay ningún discriminador de inicio/finalización por fila.
Una duración nula se convierte en cero. Las marcas de tiempo no válidas o ausentes hacen que falle el lote en lugar de crear
spans no deterministas. `ttftMs` admite valores nulos y se asigna a `omniroute.ttft_ms`.

Los atributos incluyen `gen_ai.operation.name="chat"`, proveedor, modelo solicitado/de respuesta,
tokens de entrada/salida, tokens opcionales de lectura de caché/creación de caché/razonamiento, estado HTTP,
combo, origen de caché, etiqueta de sesión e identificador de correlación. Los valores enteros de OTLP y las marcas de tiempo
son cadenas decimales; las cadenas, los booleanos y los números fraccionarios usan sus variantes nativas de valores
OTLP. Los spans de error tienen el estado ERROR y un mensaje de estado saneado. El registro
canónico no contiene la URL del host de origen, por lo que se omite `server.address` en lugar de
identificar incorrectamente al recopilador como servidor del modelo. No se exporta el coste.

Solo `includeBodies=true` carga el contenido completo. Con `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` contienen el JSON saneado del cuerpo de la solicitud/respuesta
tal como lo almacena OmniRoute (canonicalizado cuando se puede analizar), no un array de mensajes
reestructurado según las convenciones semánticas. Los cuerpos recortados o que no son JSON se mantienen como texto sin procesar. Con `langfuseMapping=true`,
los cuerpos se emiten únicamente como `langfuse.observation.input` / `langfuse.observation.output`;
los atributos `gen_ai.*.messages` se omiten para que cada cuerpo se envíe una sola vez. Ambos modos
heredan `maxBodyBytes` del mecanismo existente de carga de contenido;
`omniroute.bodies_truncated=true` indica el recorte.
Este destino no añade instantáneas adicionales de la canalización ni lecturas de artefactos sin sanear;
la captura opcional de cabeceras de solicitud usa la instantánea existente del cliente con el contenido cargado que se describe a continuación.
Use una frecuencia de minutos, como `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, al exportar
cuerpos, en lugar de acumular un lote pendiente cada hora.

### Cabeceras opcionales de solicitud del cliente

La captura de cabeceras está **desactivada de forma predeterminada**. Establezca `requestHeaderAllowlist` en la configuración del destino
y habilite **Exportar prompts y respuestas** (`includeBodies: true` en el destino).
La lista de permitidos acepta un array de la API o un área de texto con nombres separados por saltos de línea/comas:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Los nombres coinciden de forma exacta y sin distinguir entre mayúsculas y minúsculas, salvo cuando un único `*` al final selecciona un prefijo
no vacío de nombre de cabecera. Se rechazan `*` por sí solo, los comodines intercalados y los nombres de cabecera HTTP no válidos.
Se permiten como máximo 64 selectores, cada uno con un nombre o prefijo de hasta 256 bytes ASCII.
Este ajuste es independiente de `headers`, que autentica al exportador ante el colector.

La captura solo lee `pipeline_client_request`, que se rellena a partir de
`clientRawRequest` (o del campo heredado `clientRequest`) del registro detallado guardado del pipeline. Nunca recurre a las cabeceras de solicitud del proveedor.
El registro detallado del pipeline debe haber estado habilitado cuando se registró la solicitud. Si
`includeBodies` está deshabilitado, o si el JSON de la instantánea del cliente falta, está dañado o está truncado, no se emiten
atributos de cabecera. Aumentar `maxBodyBytes` puede evitar que se trunque la instantánea durante la exportación;
no puede restaurar detalles que nunca se guardaron. Se ignoran las instantáneas de más de 1 MiB o que contengan más de
256 entradas de cabecera. La exportación existente de prompts y respuestas sigue habilitada junto con
la captura de cabeceras; la lista de permitidos no proporciona un modo de hidratación exclusivo de cabeceras.

Los valores seleccionados se convierten en matrices de cadenas OTLP `http.request.header.<full lowercase header name>`,
incluso cuando se trata de una sola cadena. Por ejemplo, `X-OmniRoute-Meta-Team: example-team` se convierte en
`http.request.header.x-omniroute-meta-team` con
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Se conserva el prefijo completo: son cabeceras ordinarias, sin análisis de campos de negocio ni
conversión a `omniroute.metadata.*` o a metadatos de Langfuse. `langfuseMapping` no cambia la semántica
de las cabeceras. Una cabecera `User-Agent` seleccionada con un único valor también establece el atributo escalar estándar
`user_agent.original`. Las comas dentro de un valor no se usan para dividirlo. Las variantes de mayúsculas y minúsculas se combinan en el orden
de las entradas guardadas; cualquier variante no válida hace que se omita toda esa cabecera. Los atributos se ordenan por el nombre en minúsculas.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, las cabeceras de claves de API, los nombres que contienen
marcadores de auth/token/secret/password/credential y las credenciales internas de la pasarela siempre se
excluyen, aunque se hayan seleccionado o estén parcialmente enmascarados en el almacenamiento. Los patrones de credenciales conocidos reutilizan
el detector de credenciales compartido; los marcadores de ocultación se omiten, no se exportan como valores seguros.
Solo se aceptan cadenas y matrices de cadenas no vacías; no se convierten números ni objetos.
Los nombres no válidos, las claves de prototipo, los caracteres de control (excepto la tabulación horizontal) y el Unicode mal formado
se ignoran sin provocar el fallo del lote ni reflejar su contenido en los errores.

Cada span captura como máximo 32 cabeceras, 16 valores por cabecera, 4096 bytes UTF-8 por valor
y 16384 bytes UTF-8 en total entre los nombres y valores de las cabeceras capturadas. Las cabeceras demasiado grandes o no válidas
se omiten por completo, no se truncan. La selección es una decisión de privacidad del operador: los nombres aparentemente seguros
pueden contener datos personales, y estos límites y detectores no constituyen un mecanismo general de eliminación de información de identificación personal.

### Límites de entrega

Las solicitudes están limitadas a 500 spans y 4 MiB de JSON UTF-8, incluida la envoltura.
Se comprueba el tamaño de cada span permitido antes de la primera solicitud de un lote del cursor. Si un
span individual supera el límite, no se envía ninguna parte de ese lote y se produce un error que indica que se debe reducir
`maxBodyBytes`; no se descarta silenciosamente. La comprobación previa solo conserva las referencias a los registros y
los recuentos de bytes, y descarta cada span y JSON temporal; los spans se reconstruyen para fragmentos de tamaño limitado
en lugar de mantener una segunda copia serializada del lote. Los estados HTTP 408/429/5xx, los fallos de red y los tiempos de espera agotados dan lugar a un máximo de
tres intentos, con una espera exponencial de 250/500 ms. Los segundos o las fechas HTTP de `Retry-After`
pueden ampliar la espera hasta 5 segundos. Los demás estados provocan un fallo inmediato. El rechazo parcial OTLP con estado 2xx también lanza una excepción en lugar de
confirmar un span perdido; se aceptan confirmaciones vacías o con JSON válido, con un
límite de lectura de respuesta de 64 KiB.

Los errores solo contienen información propia del exportador: estado HTTP, categoría de reintento, intentos y recuentos
de spans enviados, o mensajes fijos de fallo de confirmación o de red. Los cuerpos de respuesta del colector,
los recuentos de éxito parcial y las cabeceras de respuesta nunca se copian en los errores, los registros ni el
panel de control. Un lote fallido o parcialmente aceptado no se confirma: el destino muestra
un estado de fallo con ese código de estado, el cursor permanece en el último lote confirmado y la siguiente ejecución
reenvía las mismas filas. Los estados permanentes siguen provocando fallos hasta que se corrija el colector o la
configuración. Consulte los registros del propio colector para obtener detalles de la respuesta. Los resúmenes de errores del registro de llamadas conservan
su mecanismo de ocultación independiente.
`prepare()` no aprovisiona nada; la prueba envía mediante POST exactamente `{"resourceSpans":[]}` e informa del
estado HTTP sin escribir spans del registro de llamadas.

Los identificadores de traza y de span son los primeros 32/16 dígitos hexadecimales del SHA-256 de
`"omniroute.trace\\0" + callLogId` y `"omniroute.span\\0" + callLogId`. Los reenvíos llevan
identificadores idénticos. Esto no garantiza la deduplicación: algunos backends, incluida la ingesta de Langfuse
v4, no deduplican los spans con el mismo identificador. Un cierre inesperado o un fallo parcial de un fragmento puede
provocar el reenvío, como máximo, del único lote del cursor sin confirmar; puede duplicarse todo ese lote,
no solo su último fragmento HTTP. Elija el tamaño del lote del cursor teniendo en cuenta esta contrapartida.

### Ejemplo de Langfuse

Configure estos campos para una instancia de Langfuse autoalojada:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Construya localmente el valor de Authorization como la codificación Base64 de la cadena literal `public-key:secret-key`
(por ejemplo, con `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
No pegue credenciales reales en registros, capturas de pantalla ni incidencias. El mapeo establece automáticamente
`x-langfuse-ingestion-version: 4`; Authorization se sigue proporcionando en `headers`.
Tanto las cabeceras como la sal de identidad generada utilizan el mecanismo existente de campos secretos cifrados
y los marcadores de posición de la API; se requiere `STORAGE_ENCRYPTION_KEY`.

El mapeo añade el tipo/modelo de generación, detalles de uso en JSON (entrada/salida/total y claves
de caché disponibles), instantáneas de entrada/salida en JSON, nivel ERROR/DEFAULT, mensaje de estado saneado,
nombre de traza, identificador de sesión, entorno opcional y
`langfuse.observation.metadata.<key>` filtrable para el proveedor, el modelo solicitado, la ruta, la combinación, el origen
de la caché y el estado. `langfuse.observation.completion_start_time` se expresa en ISO 8601 como
inicio + TTFT solo cuando se conoce el TTFT y está dentro de la duración. No se envían atributos de coste.

Los modos de identidad se aplican a `langfuse.user.id`:

- `pseudonymous` (predeterminado): HMAC-SHA256 del identificador interno de la clave de API con una sal aleatoria
  de 32 bytes por destino. La sal se genera durante la creación si no existe, se cifra
  como `identitySalt`, nunca se devuelve y se conserva durante las ediciones. Los identificadores de clave sin procesar nunca
  se incluyen en los atributos de los spans. Volver a crear o rotar la sal de un destino cambia las identidades.
- `keyName`: el nombre configurado de la clave de API, que revela intencionadamente esa etiqueta del operador.
- `none`: sin identificador de usuario. Las etiquetas de sesión se siguen exportando cuando están presentes; estos modos no
  anonimizan el contenido arbitrario de los prompts ni las etiquetas de sesión/correlación proporcionadas por el operador.

### Iniciar sin una carga retroactiva

Solo durante la creación, active **Iniciar desde la posición actual (omitir los registros existentes)** o pase
`startFromCurrentPosition: true` en el nivel superior del cuerpo de la solicitud de creación de la API. Esto inicializa
`cursor_row_id` con el rowid máximo actual de los registros de llamadas conservados mediante las funciones auxiliares
de cursor existentes, sin una migración. El valor predeterminado es false (cursor 0 y carga retroactiva del historial conservado).
No es un ajuste para restablecer el cursor durante una actualización.

La incorporación compartida de `ttftMs` también añade una columna `ttft_ms` que admite valores nulos al mapeador de BigQuery
y al esquema de las tablas nuevas: su prueba de esquema exige que cada campo del registro canónico tenga una
columna. Las tablas existentes siguen exportándose sin cambios: `prepare()` lee el esquema de la tabla y
omite únicamente `ttft_ms` cuando esa columna no existe. Añada la columna INT64 que admite valores nulos para obtener el TTFT
en la siguiente ejecución, o utilice una tabla nueva. No se requiere PATCH, ninguna modificación automática del esquema ni permisos
adicionales; todos los demás campos de las filas mantienen una comprobación estricta del esquema.

---

## 6. Añadir un destino

1. Crea `src/lib/logExport/destinations/<name>.ts` que exporte un `LogExportDestinationType`:
   un `configSchema` de Zod, un array descriptor `fields` para la interfaz de usuario, `secretFields` y una
   función `createClient(config)` que devuelva `test()` / `prepare()` / `send(records)`.
2. Añádelo al array `DESTINATIONS` en `src/lib/logExport/registry.ts`.
3. Escribe pruebas en `tests/unit/`.

Ese es todo el cambio: la persistencia, la tarea cron, la capa REST, el cifrado de secretos y el
formulario del panel consultan el registro.

Dos reglas para un destino nuevo:

- `send()` **debe lanzar una excepción** ante un fallo parcial. Resolver la promesa significa «el destino tiene estas filas»,
  y el cursor avanza más allá de ellas de forma permanente.
- Un destino que acepte una URL proporcionada por el usuario debe validarla mediante
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) antes de realizar la solicitud,
  del mismo modo que lo hacen los webhooks. BigQuery no lo necesita: sus hosts son constantes.

---

## 7. Uso y administración

- **Panel**: Integraciones → Exportación de registros. Añade un destino, ejecuta **Probar** para comprobar las credenciales
  sin escribir filas y, después, actívalo.
- **Filas pendientes**: cada tarjeta de destino muestra las filas pendientes y el cursor; `GET
/api/log-export/status` devuelve las mismas cifras junto con las últimas 20 ejecuciones de la tarea.
- **Un destino que falla no hace que fallen los demás** — el resumen de la ejecución registra el estado de cada destino
  en `last_status` / `last_error`, y el historial de ejecuciones de la tarea conserva el resultado agregado.
- **Eliminar un destino elimina su cursor.** Al volver a añadirlo, se empieza desde el registro de llamadas más antiguo
  que se conserve, lo que reenvía filas que el destino podría tener ya. En BigQuery, el
  `insertId` de cada fila evita esos duplicados únicamente dentro de la ventana de deduplicación del propio BigQuery, por lo que es preferible desactivar
  un destino en lugar de eliminarlo.
