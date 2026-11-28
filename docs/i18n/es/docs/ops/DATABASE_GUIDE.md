# Database Schema & Operations Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute utiliza **SQLite con registro WAL** como almacenamiento principal, con cifrado **AES-256-GCM** en reposo para los campos confidenciales. Esta guía abarca el esquema, las migraciones, las copias de seguridad y recuperación, y los procedimientos operativos.

**Fuentes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tablas base)
- `src/lib/db/migrationRunner.ts` — migraciones versionadas
- `src/lib/db/migrations/` — 167 archivos SQL versionados
- `src/lib/db/encryption.ts` — funciones auxiliares de cifrado
- `src/lib/db/backup.ts` — exportación/importación de copias de seguridad
- `src/lib/db/healthCheck.ts` — diagnósticos de estado

---

## ¿Por qué SQLite?

OmniRoute eligió SQLite en lugar de PostgreSQL/MySQL por varios motivos:

| Factor                 | SQLite                                       | PostgreSQL                                           |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Despliegue**         | Integrado — no requiere un servidor separado | Requiere configurar un servidor                      |
| **Cifrado**            | Capa de aplicación (AES-256-GCM)             | TDE integrado                                        |
| **Rendimiento**        | Más rápido para cargas pequeñas/medianas     | Mejor para un gran volumen de escrituras simultáneas |
| **Concurrencia**       | El modo WAL permite lecturas simultáneas     | MVCC completo                                        |
| **Copia de seguridad** | Copia de un único archivo                    | `pg_dump` o instantánea del sistema de archivos      |
| **Caso de uso**        | Instalación por usuario, integrado           | SaaS multiinquilino                                  |

Para despliegues de **un solo usuario y una sola instancia** (el caso de uso principal de OmniRoute), SQLite es más sencillo y rápido.

### Registro WAL

`core.ts` abre la base de datos en **modo WAL (registro de escritura anticipada)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permite **lecturas simultáneas** durante las escrituras, algo importante para el panel, que realiza consultas mientras se registran las solicitudes.

El tamaño predeterminado de la caché es de **65,536 KiB (64 MiB)**. SQLite interpreta un valor negativo de
`cache_size` como un límite superior aproximado en KiB y asigna páginas según sea necesario.
**Configuración > Sistema y almacenamiento > Tamaño de caché** acepta valores enteros de **1 a
1,000,000 KiB**; al guardar la configuración, esta se aplica a la conexión activa de la base de datos,
y OmniRoute restaura el valor almacenado durante el inicio.

---

## Ubicación de la base de datos

El archivo SQLite se almacena en:

| SO      | Ruta                                                          |
| ------- | ------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                 |
| macOS   | `~/.omniroute/storage.sqlite`                                 |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker  | `/app/data/storage.sqlite` (configurable mediante `DATA_DIR`) |

Archivos complementarios:

- `storage.sqlite-wal` — registro de escritura anticipada
- `storage.sqlite-shm` — archivo de memoria compartida
- `call_logs/` — artefactos de las cargas útiles de las solicitudes (si están habilitados)

**Sobrescribir la ubicación:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitectura de módulos de dominio

La base de datos de OmniRoute tiene **110 módulos TypeScript de nivel superior** en `src/lib/db/`. Cada módulo de dominio:

- Gestiona una o más tablas específicas
- Exporta funciones CRUD tipadas
- Nunca accede a las tablas de otro módulo
- Usa `getDbInstance()` de `core.ts` para acceder a la base de datos

### Los 110 módulos de base de datos de nivel superior

OmniRoute tiene **110 archivos TypeScript de nivel superior** en `src/lib/db/`. A continuación se muestra una selección de los módulos principales; consulta el listado del directorio para ver la lista completa:

| Módulo                  | Tablas                                                         | Responsabilidad                                                                           |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registro y credenciales de proveedores mediante OAuth/claves de API                       |
| `models.ts`             | `key_value` (datos de modelos)                                 | Definiciones, capacidades y precios de los modelos                                        |
| `combos.ts`             | `combos`                                                       | Configuraciones y orden de enrutamiento de combos                                         |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida, ámbitos y seguimiento de cuotas de las claves de API                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuración del sistema y almacén KV compartido                                         |
| `backup.ts`             | —                                                              | Operaciones de exportación/importación de copias de seguridad                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configuraciones de proxy y reglas de enrutamiento                                         |
| `prompts.ts`            | `prompt_templates`                                             | Plantillas de prompts reutilizables y control de versiones                                |
| `webhooks.ts`           | `webhooks`                                                     | Suscripciones y registros de webhooks basados en eventos                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registro de auditoría por solicitud (opcional, de gran volumen)                           |
| `domainState.ts`        | `domain_*` (5 tablas)                                          | Presupuestos de dominio, disyuntores, bloqueos, cadenas de respaldo e historial de costes |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Claves de API incluidas en la lista blanca para MCP/A2A                                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Uso histórico de cuotas                                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Asignación de modelos a combos predeterminados                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico de la CLI                                                   |
| `encryption.ts`         | —                                                              | Utilidades para cifrar/descifrar campos                                                   |
| `readCache.ts`          | —                                                              | Caché en memoria para operaciones con gran volumen de lecturas                            |
| `secrets.ts`            | `key_value` (entradas cifradas)                                | Almacenamiento cifrado de secretos                                                        |
| `stateReset.ts`         | —                                                              | Borrado/restablecimiento del estado de la base de datos para pruebas                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto de sesión para la transferencia entre agentes                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Seguimiento del uso                                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuración de compresión                                                               |

### Límites entre módulos

Una regla arquitectónica fundamental: **los módulos no acceden directamente a las tablas de otros módulos**. Para trabajar con los datos de otro módulo, importa la función de ese módulo.

```ts
// ❌ INCORRECTO: SQL directo desde otro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRECTO: usa la función del módulo de proveedores
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Esta regla se aplica mediante la revisión de código: no existe una comprobación estática, pero las infracciones se señalan.

---

## Esquema base (17 tablas)

`core.ts` define las 17 tablas base en `SCHEMA_SQL`. Estas se crean mediante la migración `001_initial_schema.sql` y conforman el esquema principal.

### Tablas principales (creadas en la migración inicial)

| Tabla                      | Propósito                                     | Columnas clave                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciales del proveedor (cifradas)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Información de enrutamiento de nodos          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Almacén KV de propósito general               | `namespace`, `key`, `value`                                             |
| `combos`                   | Definiciones de combinaciones de enrutamiento | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Claves de API para la puerta de enlace        | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadatos de la base de datos                 | `key`, `value`                                                          |
| `usage_history`            | Registros de uso de solicitudes               | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Cargas útiles y respuestas de las solicitudes | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Registros de solicitudes del proxy            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadenas de modelos a proveedores              | `model`, `chain`                                                        |
| `domain_budgets`           | Presupuestos de gasto por dominio             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historial de restablecimientos de presupuesto | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Seguimiento de costes por dominio             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado del límite de solicitudes por dominio  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado del disyuntor por dominio              | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Caché de respuestas del LLM                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantáneas históricas de cuotas             | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tablas adicionales (añadidas mediante migraciones posteriores)

Las migraciones posteriores añaden tablas como:

- `cli_tool_state` (migración 011) — estado de la herramienta CLI
- Tablas `mcp_*` — auditoría del servidor MCP
- Tablas `a2a_*` — estado de tareas A2A
- Tablas `usage_*` — seguimiento del uso
- Tablas `plugin_*` — sistema de complementos
- `skill_executions` — historial de ejecución de habilidades
- Tablas `memory_*` — sistema de memoria
- Tablas `compression_*` — sistema de compresión
- Tablas `webhook_*` — registro de entrega de webhooks
- Tablas `acp_*` — Protocolo de Cliente de Agente
- Tablas `oneproxy_*` — mercado de 1proxy
- `proxy_assignments` — vinculaciones de ámbito del proxy
- `detailed_call_artifacts` — metadatos de artefactos del registro de llamadas
- `quota_alert_history` — auditoría de alertas de cuota
- `command_code_auth_sessions` — sesiones OAuth de Command Code

La lista completa de más de 30 tablas se encuentra en `src/lib/db/migrations/`.

---

## Migraciones

usos OmniRoute** migraciones versionadas e idempotentes** en `src/lib/db/migrations/`. Cada migración es un único archivo SQL. Coexisten dos formatos de nombres; la versión registrada en `_omniroute_migrations` es el prefijo numérico.

### Nomenclatura de migración

| Formato                                            | Ejemplo                              | Utilizado para                                                                                                                                                                   |
| -------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exactamente 3 dígitos)      | `241_seen_models.sql`                | La antigua serie `001`–`241`. Congelado cuando llegó el formato de marca de tiempo (`240` y `241` se fusionaron justo antes): ningún archivo nuevo obtiene un número secuencial. |
| `YYYYMMDDHHMMSS_description.sql` (14 dígitos, UTC) | `20261113120000_add_usage_index.sql` | Cada migración creada a partir del 13/11/2026 en adelante.                                                                                                                       |

Por qué el cambio: con números secuenciales, PRs paralelo eligió el mismo número siguiente y todos menos uno tuvieron que volver a numerarse antes de fusionarse. Una marca de tiempo UTC le da a cada PR su propia versión.

Reglas para el formato de marca de tiempo (aplicadas por `npm run check:migration-numbering`, compartidas con el generador en `scripts/check/lib/migrationNaming.mjs`):

- La marca de tiempo es una fecha y hora UTC reales, no antes de `20261113000000` y no más de 10 minutos en el futuro.
- La descripción es `snake_case` minúscula comenzando con una letra (`a-z`, `0-9`, `_` simple entre palabras), como máximo 80 caracteres.
- Dos archivos con la misma marca de tiempo son duplicados.
- La regla de no espacios se aplica sólo a la serie antigua: todos los números de `001` a `241` deben existir, excepto los espacios conocidos `026`, `055` y `121`. Eliminar `241` (o cualquier archivo antiguo) falla. `001` y `241` nunca se pueden agregar a la lista de permitidos `KNOWN_GAPS`. Los archivos con marca de tiempo nunca crean un espacio.
- Cada entrada en `src/lib/db/migrations/` debe ser un archivo normal con un nombre `.sql` en minúscula válido. Un directorio, un enlace simbólico, un archivo `.SQL` o `.sql.bak`, un archivo oculto o un nombre con un espacio fallan en la puerta, porque el ejecutor lo omitiría silenciosamente o fallaría en el arranque.

**Aplicar orden.** El corredor ordena por el valor numérico del prefijo, no por texto: primero los archivos antiguos `001`–`241`, luego los archivos con marca de tiempo en orden de marca de tiempo, luego cualquier directorio con espacio de nombres registrado con `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versiones como `ee-001`). Una migración pendiente es cualquier archivo cuya versión no esté en `_omniroute_migrations`, por lo que una migración desde una rama anterior que se fusiona después de una más nueva aún se aplica en las bases de datos existentes.

**La marca de tiempo es el orden de creación, no el orden de fusión.** Si su migración depende de una tabla o columna creada por una migración con un** más nuevo** marca de tiempo (por ejemplo, una de otro PR que se fusionó primero), una base de datos nueva ejecutaría la suya primero y fallaría. Mientras su PR aún esté abierto, regenere el nombre del archivo con `npm run db:new-migration` para que obtenga una marca de tiempo más nueva o hágalo independiente. `npm run test:migrations:fresh` aplica cada migración a una base de datos vacía y la detecta.

### Una migración fusionada nunca se elimina ni se le cambia el nombre

Una vez que un archivo de migración está en una rama de lanzamiento o `main`, ya se ha ejecutado en las bases de datos de homólogos y desarrolladores, en las instalaciones VPS y en la sincronización empresarial. A partir de entonces:

- **Nunca lo borres.** Las instalaciones nuevas perderían su esquema, mientras que las bases de datos actualizadas lo conservarían.
- **Nunca le cambies el nombre.** La versión en `_omniroute_migrations` ya no coincidiría con un archivo, por lo que cada base de datos que ya la aplicara la ejecutaría nuevamente. SQL no idempotente duplica los datos o detiene el arranque.
- **¿Necesita un esquema diferente?** Crea una nueva migración con `npm run db:new-migration`.

Cambiar el nombre es seguro sólo para un archivo que aún no está fusionado, que es el caso al que se refieren las sugerencias de la puerta. Una etiqueta de lanzamiento no cambia nada aquí: cada envío a una rama `release/v*` publica la imagen Docker `:next` y se ejecuta en homolog, instalaciones VPS y Enterprise sync, por lo que se ejecuta una migración fusionada en bases de datos reales antes de que exista cualquier etiqueta `vX.Y.Z`. La puerta falla en cada eliminación de un archivo base, etiquetado o no.

- **Revertir una migración fusionada.** Un `git revert` que elimina el archivo falla la puerta. Mantenga el archivo y deshaga su esquema en una nueva migración: `npm run db:new-migration -- <description>`, con `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS`, etc. Las bases de datos actualizadas y nuevas terminan con el mismo esquema.
- **El cambio de nombre aceptado: una entrada de compatibilidad y contenido idéntico.** Si un archivo fusionado debe moverse (por ejemplo, dos archivos fusionados comparten una marca de tiempo y el ejecutor se detiene con una colisión de versiones), cambie el nombre del último sin tocar su SQL y agregue `{ fromVersion, fromName, toVersion, toName }` a `RENAMED_MIGRATION_COMPATIBILITY` en `src/lib/db/migrationRunner/constants.ts`. Las bases de datos que aplicaron la versión anterior mueven su fila `_omniroute_migrations` en lugar de ejecutar el archivo nuevamente. La puerta advierte sobre dicho cambio de nombre y siempre ejecuta la verificación de conmutación, cualquiera que sea la nueva marca de tiempo: las instalaciones nuevas aplican el archivo en su nueva posición, las bases de datos actualizadas no, así que elija una nueva marca de tiempo cerca de la anterior. La puerta no puede cambiar el nombre si el contenido cambió (un cambio de esquema aún se realiza en una nueva migración) o si el archivo de destino de la entrada no está en el disco.
- **Nunca cambie el nombre dentro de la misma marca de tiempo.** Un cambio de nombre que mantiene la marca de tiempo y cambia solo la descripción falla en la puerta, con o sin una entrada. Con una entrada cuyo `toVersion` es igual a su `fromVersion`, el corredor elimina la antigua fila `_omniroute_migrations` y aplica el archivo nuevamente en cada base de datos que ya lo ejecutó. Sin una entrada, el ejecutor rastrea solo la versión: omite el archivo en esas bases de datos (el contenido nuevo nunca se ejecuta allí) y registra un error de renumeración en cada arranque. Utilice otra marca de tiempo más una entrada de compatibilidad o conserve el nombre.
- **La puerta comprueba que el archivo renombrado no se vuelva a ejecutar.** Para cada cambio de nombre cubierto, la puerta pasa el nuevo nombre de archivo a la verificación de conmutación con `--must-not-apply`. La verificación inicia la base de datos actualizada con el corredor real, y si el corredor aplica ese archivo nuevamente (por ejemplo, porque la entrada tiene una versión o nombre incorrecto, o porque el analizador de texto de la puerta lee `constants.ts` de manera diferente a TypeScript), la puerta falla con `migration renomeada rodaria de novo` y le pide que verifique las versiones y nombres antiguos y nuevos de la entrada.

### Lo que la puerta compara con la base

Al ejecutar una solicitud de extracción y una cola de fusión, `npm run check:migration-numbering` compara `src/lib/db/migrations/` en el disco con el mismo directorio en la rama base. La base es, en este orden: `--base-latest-tag`, `--base <ref>`, la variable `MIGRATION_BASE_REF` o, cuando `GITHUB_EVENT_NAME` es `pull_request`, `pull_request_target` o `merge_group`, el primer padre de la confirmación de fusión, el `merge_group.base_sha` de la carga útil del evento o `git merge-base HEAD origin/$GITHUB_BASE_REF`. En una ejecución de solicitud de extracción o cola de fusión sin una base resoluble, la puerta falla. Fuera CI sin `--base`, imprime `comparação com a base: pulada (sem --base)` y omite estas reglas.

`--base-latest-tag` se compara con la etiqueta de lanzamiento más reciente (`vX.Y.Z` en orden semver; las etiquetas con sufijos como nightlies no cuentan) que está en la historia de `HEAD`, con las mismas reglas que `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) ejecuta la puerta de esta manera, porque las ejecuciones push y programadas no tienen una base de solicitud de extracción y una combinación puede realizarse sin una nueva ejecución CI. Sin una etiqueta de liberación en el historial, la puerta falla; ejecute `git fetch --tags` (en CI, `actions/checkout` con `fetch-depth: 0` trae las etiquetas).

| Cambio en la solicitud de extracción                                                                                        | Resultado                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Se cambia el nombre de un archivo que existe en la base, con una entrada `RENAMED_MIGRATION_COMPATIBILITY`                  | **Advertencia** si el contenido es idéntico y la verificación de conmutación se ejecuta cualquiera que sea la nueva marca de tiempo; falla si la nueva posición cambia el esquema final (deshacer el cambio de nombre o elegir otra nueva marca de tiempo donde conmuta) o si el corredor aplicaría el archivo renombrado nuevamente en una base de datos actualizada.** falla** si el contenido cambió. |
| Un archivo que existe en la base cambia de nombre manteniendo su marca de tiempo (solo cambia la descripción)               | **falla** , con o sin entrada: el corredor lo volvería a aplicar (con la entrada) o lo saltaría por versión (sin). Utilice otra marca de tiempo más una entrada de compatibilidad o conserve el nombre.                                                                                                                                                                                                  |
| Un archivo que existe en la base se elimina o se le cambia el nombre sin una entrada                                        | **falla** , ya sea que el archivo esté o no en una etiqueta de lanzamiento. Para deshacerlo, restaure el archivo con `git checkout <base> -- src/lib/db/migrations/<file>`; para revertir su esquema, agregue una nueva migración con `DROP ... IF EXISTS`.                                                                                                                                              |
| Un archivo que existe en la base tiene contenido diferente                                                                  | **Advertencia** (una anotación `::warning` en Acciones GitHub ) y se ejecuta la verificación de conmutación. Falla si la edición cambia el esquema final, porque las bases de datos actualizadas no aplican el archivo editado nuevamente: coloque el cambio en una nueva migración. Una edición inofensiva (un comentario, `IF NOT EXISTS`) sólo advierte.                                              |
| Se agrega un archivo con marca de tiempo con una marca de tiempo no más reciente que la más reciente de la base.            | Ejecuta la verificación de conmutación, que se describe a continuación.                                                                                                                                                                                                                                                                                                                                  |
| Se agrega un archivo `NNN_` de formato antiguo con un número debajo del archivo de formato antiguo más reciente de la base. | **falla** , incluso si `KNOWN_GAPS` se edita en la misma solicitud de extracción: la serie anterior está congelada, cree la migración con `npm run db:new-migration`. Se aceptan archivos de formato antiguo por encima del más nuevo de la base (una solicitud de extracción de `release/v*` a `main` ).                                                                                                |
| Un archivo desordenado, editado o renombrado contiene declaraciones `INSERT`, `UPDATE`, `DELETE` o `REPLACE`                | **Advertencia** : la verificación de conmutación no compara datos, por lo tanto, revise si el orden en que se aplican las bases de datos actualizadas y nuevas cambia el resultado.                                                                                                                                                                                                                      |

Una ejecución de la verificación de conmutación cubre los archivos desordenados, editados y renombrados juntos.

La verificación de conmutación (`scripts/check/migration-commutation.ts`) crea dos bases de datos temporales con la ruta de instalación real: una** actualizado** uno (arrancar con las migraciones base, luego arrancar nuevamente en el mismo archivo con las migraciones de la solicitud de extracción) y un** fresco** uno (un arranque con las migraciones de la solicitud de extracción). Compara los esquemas resultantes: tablas y columnas (ignorando el orden de las columnas), restricciones UNIQUE / PRIMARY KEY y FOREIGN KEY, el texto `CREATE TABLE` normalizado de cada tabla (que cubre restricciones CHECK, intercalaciones, columnas generadas y opciones de tabla), índices, activadores y vistas. Los datos de las filas no se comparan. Si coinciden, la puerta imprime que el archivo no está en orden, pero viaja y pasa. Si difieren, la puerta falla con la diferencia y una pista para el caso: para un archivo desordenado, regenere su nombre con `npm run db:new-migration`, lo cual es seguro porque el archivo aún no está fusionado; para un archivo base editado, restaure el contenido base y coloque el cambio en una nueva migración; para un archivo renombrado, deshaga el cambio de nombre o elija otra nueva marca de tiempo donde conmuta, nunca la misma marca de tiempo con otro nombre. Si la verificación en sí no puede ejecutarse, la puerta falla en CI y solo advierte localmente. Para un archivo base editado, la base de datos actualizada se crea con el contenido base de ese archivo y el segundo arranque lo omite porque su versión ya está registrada. Para un archivo renombrado, la base de datos actualizada se crea con el archivo con su nombre anterior y el segundo arranque mueve su fila `_omniroute_migrations` a través de la entrada de compatibilidad en lugar de ejecutarlo nuevamente; la puerta pasa el nuevo nombre con `--must-not-apply`, por lo que la verificación falla si el segundo arranque lo aplica. Si una migración de solicitud de extracción no se aplica en la ruta actualizada, es decir, después de cada migración base (ya sea que falle o no en una instalación nueva), la puerta informa `migration do PR não aplica` y le solicita que corrija el SQL con el esquema actual de la base; Si el archivo depende de otra migración de solicitud de extracción con una marca de tiempo posterior, regenere su nombre con `npm run db:new-migration`.

Para ejecutar la misma comparación localmente, pase la base explícitamente, por ejemplo `npm run check:migration-numbering -- --base origin/<base-branch>` o `npm run check:migration-numbering -- --base-latest-tag` para comparar con la última versión.

### Conversión de una migración `NNN` de Open PR

Una solicitud de extracción abierta antes del cambio aún puede contener un archivo secuencial como `242_add_widgets.sql`. Los números antiguos por encima de `241` se rechazan, así que conviértalos antes de fusionarlos:

1. **Cambie el nombre del archivo con el generador, manteniendo la descripción.** Ejecute `npm run db:new-migration -- <same description>` para obtener el nuevo nombre, mueva SQL a él y elimine el archivo `NNN_` antiguo. La descripción debe ser idéntica: la entrada de compatibilidad que aparece a continuación coincide con ella.
2. **Agregue una entrada de compatibilidad si una base de datos persistente ejecutó el número anterior.** Si alguna base de datos que se mantiene (homóloga, VPS, instalación propia de un colaborador) ejecutó una compilación del PR con el archivo `NNN_`, agregue `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` a `RENAMED_MIGRATION_COMPATIBILITY` en `src/lib/db/migrationRunner/constants.ts`. Esto es** requerido para `237` a `241`** : esas ranuras ahora contienen los canónicos `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` y `241_seen_models.sql`, y sin la entrada dicha base de datos se salta la migración canónica para siempre y ejecuta la convertida nuevamente. También funciona para un espacio que permanece vacío, como `242`, cuando el destino es una marca de tiempo. En caso de duda, agregue la entrada. No importa dónde lo agregue en la matriz: cuando la ranura de destino de una entrada todavía contiene una fila que otra entrada aleja (por ejemplo `237` mantiene una fila PR mientras una fila `usage_history_calculated_cost` más antigua espera moverse a `237`), el corredor deja que esa entrada espere hasta que la ranura esté libre. Sólo un conflicto real, como una ranura ocupada por una fila sin movimientos de entrada, o dos entradas que intercambian ranuras, detiene el arranque con `Cannot reconcile ...`.
3. **Mantener el SQL idempotente** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), porque la migración convertida puede encontrarse con una base de datos donde su esquema ya existe.
4. **Mover casos especiales con clave de versión.** Si PR agregó mayúsculas y minúsculas a su número anterior en `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) o en `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), cambie la clave a la nueva marca de tiempo.

`tests/unit/db/codex-fence-migration-rename.test.ts` es un ejemplo práctico de una prueba para una migración renombrada.

### Backports a sucursales antes del cambio

Nunca seleccione ni traslade un archivo `YYYYMMDDHHMMSS_` a una rama anterior al cambio (por ejemplo, una rama `release/v*` anterior). El corredor allí clasifica los nombres de los archivos como texto, por lo que un archivo con marca de tiempo se ejecutaría entre `201_` y `202_` en una base de datos nueva, y la puerta anterior no comprende los prefijos de 14 dígitos. En dicha rama, escriba el cambio como el siguiente archivo `NNN_` de esa rama, idempotente, por lo que no será operativo cuando la versión con marca de tiempo llegue más tarde.

### Cómo se ejecutan las migraciones

Al inicio, `migrationRunner.ts`:

1. Crea una tabla `_omniroute_migrations` si no existe.
2. Consultas sobre migraciones ya aplicadas
3. Aplica cualquier nueva migración en orden, cada una en una transacción.
4. Registra cada migración aplicada con marca de tiempo

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotencia

Las migraciones deben ser** idempotente** — ejecutarlos dos veces debería ser una operación no operativa:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilice cláusulas `IF NOT EXISTS`, `IF EXISTS` y `OR IGNORE` / `OR REPLACE` generosamente.

### Agregar una nueva migración

1. **Crea el archivo con el generador.** : `npm run db:new-migration -- <description>` (por ejemplo `npm run db:new-migration -- add combo priority`). Escribe `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` con la hora actual UTC y un encabezado de comentario, avanza un segundo si se toma esa marca de tiempo y nunca sobrescribe un archivo. No elija un número a mano.
2. **Utilice DDL seguro** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Rellene los datos con cuidado** : use `UPDATE ... WHERE ...` para manejar filas existentes
4. **Consultar orden y denominación** : `npm run test:migrations:fresh` (todas las migraciones en una base de datos vacía) y `npm run check:migration-numbering`. El gancho de confirmación previa de Husky ejecuta `check:migration-numbering` por sí solo cuando la confirmación prepara un archivo bajo `src/lib/db/migrations/`, por lo que un nombre seleccionado manualmente o mal formado (por ejemplo `242_x.sql`) falla la confirmación local con el mismo mensaje que imprime CI. El gancho comprueba nombres, duplicados y las series congeladas `001`–`241` únicamente; la comparación con la base PR (migraciones eliminadas, renombradas o fuera de orden) todavía se ejecuta en CI
5. **Prueba en una copia** : nunca ejecute migraciones no probadas en producción
6. **Una tabla creada a partir de código también necesita una migración** : si un módulo también crea la tabla de forma diferida (`CREATE TABLE IF NOT EXISTS`, mantenida como una ruta de autorreparación), una migración debe crearla con el mismo DDL. De lo contrario, una instalación limpia y una instalación actualizada terminarán con esquemas diferentes, dependiendo de si se ejecutó esa ruta de código. `tests/unit/db/lazy-table-migration-guard.test.ts` escanea `src/` y `open-sse/` y falla en un `CREATE` diferido sin migración (#20557). Ejemplo: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Ejemplo:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Cambios incompatibles con versiones anteriores** (por ejemplo, eliminar columnas) son complicados. OmniRoute admite NOT degradar — una vez que se aplica una migración, el cambio de esquema es permanente. Planifique en consecuencia.

---

## Cifrado en reposo

Los campos sensibles (claves de API, tokens de OAuth y cadenas de conexión) se cifran en reposo mediante **AES-256-GCM**.

### Cómo funciona

```ts
// src/lib/db/encryption.ts (simplificado)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Dónde se utiliza

- `provider_connections.api_key`: cifrado en el nivel de la aplicación
- `provider_connections.access_token`, `refresh_token`, `id_token`: cifrados en el nivel de la aplicación
- Entradas de `key_value` con `namespace = "secrets"`: cifradas en el nivel de la aplicación
- `proxy_registry.auth`: cifrado en el nivel de la aplicación (si está presente)

### Clave de cifrado

La clave de cifrado se deriva de una **frase de contraseña** (configurada mediante la variable de entorno `STORAGE_ENCRYPTION_KEY`) y una **sal** (almacenada en la base de datos). Ambas son necesarias para descifrar los datos.

```bash
# Genere una frase de contraseña segura
openssl rand -hex 32

# Configúrela en .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Importante**: perder la clave de cifrado implica perder el acceso a todos los datos cifrados. **Realice una copia de seguridad de la clave por separado de la base de datos**.

### Qué NO está cifrado

Por motivos de rendimiento, los siguientes elementos se almacenan en texto sin formato:

- Nombres para mostrar de los proveedores
- Definiciones de modelos (ya son públicas)
- Reglas de enrutamiento
- Registros de uso (sin PII)

---

## Consideraciones sobre el cifrado (v3.8.16+)

OmniRoute utiliza **`migrateLegacyEncryptedString()`** para gestionar de forma transparente dos esquemas de cifrado:

- **Heredado** (anterior a v3.5.0): «cifrado» basado en XOR (no es criptografía real)
- **Actual**: AES-256-GCM con un IV y una etiqueta de autenticación adecuados

La función auxiliar de migración detecta el formato heredado y vuelve a cifrar los datos con el nuevo esquema durante la primera lectura. Esto significa que puede actualizar una base de datos antigua sin perder las credenciales.

---

## Caché de lectura

Para los datos que se leen con frecuencia (modelos, proveedores y ajustes), `readCache.ts` proporciona una **caché en memoria**:

```ts
// Almacenado en caché al iniciar; se invalida al escribir
const providers = await getCachedProviders(); // Rápido, en memoria
const fresh = await listProviders(); // Lento, consulta la BD
```

| Entidad almacenada en caché | Clave de caché | TTL                |
| --------------------------- | -------------- | ------------------ |
| `models`                    | `models:v1`    | Hasta la escritura |
| `provider_connections`      | `providers:v1` | Hasta la escritura |
| `settings`                  | `settings:v1`  | Hasta la escritura |
| `combos`                    | `combos:v1`    | Hasta la escritura |

La caché se invalida con cada escritura en la tabla correspondiente.

---

## Copia de seguridad y recuperación

### Copia de seguridad manual

```bash
# Utilice la CLI para crear una copia de seguridad local
omniroute backup create --name pre-migration

# O mediante la API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

El archivo de copia de seguridad incluye:

- Todas las tablas de la BD (serializadas en JSON)
- Artefactos del registro de llamadas (codificados en base64, opcionales)
- Ajustes y secretos (cifrados)
- Configuración de complementos

### Restauración

```bash
# Mediante la CLI
omniroute restore pre-migration

# Mediante la API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advertencia**: La restauración sobrescribe toda la BD. Detenga primero todos los clientes.

### Copias de seguridad automatizadas

```bash
# Habilite las copias de seguridad diarias automatizadas mediante la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La programación se ejecuta en el servidor mediante una tarea en segundo plano que se activa cada 30 segundos
(de forma predeterminada) y evalúa la expresión cron según la hora local del servidor.

| Variable                                    | Valor predeterminado | Descripción                                                                                                              |
| ------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`              | Intervalo de activación en ms (mín. `5000`). Debe ser inferior a 60 s para coincidir de forma fiable con el minuto cron. |

### Copia de seguridad en caliente de SQLite

Para realizar una copia de seguridad sin tiempo de inactividad de una BD activa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Esto utiliza la API de copia de seguridad en línea de SQLite; es seguro ejecutarlo mientras OmniRoute está en funcionamiento.

---

## Ajuste de rendimiento

### Modo WAL

WAL está habilitado de forma predeterminada. Para cargas de trabajo de alta escritura, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute no establece `journal_size_limit`. Un punto de control mueve fotogramas WAL al archivo principal, pero el archivo WAL mantiene su tamaño asignado más grande. El `OMNIROUTE_WAL_GUARD_MAX_MB` guard sólo advierte y ejecuta `wal_checkpoint(RESTART)`; no es un límite del tamaño de un disco.

### Índices

Índices clave para el rendimiento (creados automáticamente por migraciones):

- Búsquedas de modelos `idx_models_provider` — por proveedor
- Expansión de objetivo combo `idx_combo_targets_combo_id` —
- análisis de uso — `idx_usage_history_api_key_timestamp`
- seguimiento de cuota `idx_quota_snapshots_api_key_window` —
- consultas del registro de llamadas `idx_call_logs_timestamp` —

Para agregar un nuevo índice, cree una migración:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O mapeado en memoria

Para bases de datos muy grandes (> 10 GB), la asignación de memoria se puede ajustar mediante SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactación

Las instancias OmniRoute de larga duración se benefician de `VACUUM` ocasional:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Ejecute mensualmente durante períodos de poco tráfico. (El modo WAL reduce la necesidad, pero no la elimina).

---

## Comprobación de estado

`src/lib/db/healthCheck.ts` proporciona **diagnósticos del estado de la base de datos**:

Ambos verbos requieren autenticación (de lo contrario, se devuelve `401`). `GET` solo realiza el diagnóstico; `POST` ejecuta la
misma comprobación con `autoRepair` habilitado.

```bash
GET  /api/db/health   # diagnosticar
POST /api/db/health   # diagnosticar + reparar
```

La respuesta es el `DbHealthCheckResult` generado por `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Los presupuestos de dominio hacían referencia a claves de API que ya no existen.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significado                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` cuando `issues` está vacío. `driver` nunca influye en este valor.                                                                                                                                           |
| `issues[].type`   | Uno de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                                            |
| `repairedCount`   | Filas reparadas durante esta ejecución; siempre es `0` cuando `autoRepair` es falso.                                                                                                                               |
| `backupCreated`   | Indica si se creó una copia de seguridad antes de realizar la reparación.                                                                                                                                          |
| `checkedAt`       | Marca de tiempo ISO compartida por la ejecución y por cualquier nota de reparación que esta escriba.                                                                                                               |
| `driver.name`     | Controlador de SQLite que atiende la base de datos comprobada.                                                                                                                                                     |
| `driver.degraded` | `true` cuando las escrituras no están respaldadas de forma duradera por el archivo de la base de datos: el mecanismo alternativo WASM `sql.js` (persistencia del archivo completo) o una base de datos en memoria. |

La herramienta MCP `omniroute_db_health_check` devuelve la misma carga útil.

Ejecute `PRAGMA integrity_check` para detectar daños:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Debería mostrar: ok
```

Si devuelve cualquier valor distinto de `ok`, **deje de usar la base de datos inmediatamente** y restáurela desde una copia de seguridad.

---

## Recuperación ante desastres

### Escenario 1: Pérdida del archivo WAL

Falta el archivo `-wal`, pero `-shm` y la base de datos principal están intactos:

```bash
# Se recupera automáticamente la próxima vez que se abre
omniroute
```

Si SQLite no puede recuperarse automáticamente:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Escenario 2: Archivo de la base de datos principal dañado

Restaure desde una copia de seguridad:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` solo descarga un archivo `.tar.gz` completo desde un servidor en ejecución
(`GET /api/db-backups/exportAll`, se requieren credenciales de operador); no restaura nada.

### Escenario 3: Pérdida de la clave de cifrado

**No es posible recuperar los datos** sin la clave. Los campos cifrados son ilegibles. Vuelva a añadir manualmente todos los proveedores con credenciales nuevas.

> **Mitigación**: Haga siempre una copia de seguridad de la clave de cifrado por separado, preferiblemente en un gestor de contraseñas o KMS.

### Escenario 4: Disco lleno

SQLite devolverá errores `SQLITE_FULL`. Libere espacio en disco y, a continuación, ejecute:

```bash
# Crea un punto de control del WAL para liberar espacio
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operaciones comunes

### Inspeccionar una tabla

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contar las filas de todas las tablas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Restablecer (borrar) todos los datos

```bash
# Detenga primero OmniRoute
omniroute stop

# Elimine el archivo de la base de datos
rm ~/.omniroute/storage.sqlite*

# Reinicie (se volverá a crear una base de datos vacía)
omniroute
```

Para un restablecimiento **selectivo** (conservar los proveedores y borrar el uso):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportar una sola tabla

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Solución de problemas

### "La base de datos está bloqueada"

Otro proceso mantiene un bloqueo de escritura. Puede:

- Esperar a que finalice el otro proceso (compruebe `lsof | grep storage.sqlite`)
- Finalizar el otro proceso
- Si el problema persiste, reiniciar OmniRoute

### "Error en la restricción de clave externa"

Un módulo de dominio está infringiendo la integridad referencial. Compruebe:

- Filas huérfanas en tablas dependientes
- Eliminaciones en cascada que no se propagaron
- Alguna migración reciente que haya modificado una clave externa

Ejecute `PRAGMA foreign_key_check;` para encontrar las infracciones.

### "Memoria insuficiente"

La E/S de SQLite asignada en memoria está superando el límite del sistema operativo. Redúzcala mediante un pragma de SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB en lugar de 256MB
```

O desactívela:

```sql
PRAGMA mmap_size = 0;
```

### "La migración falló a mitad del proceso"

La migración se ejecutó dentro de una transacción, por lo que debería haberse revertido. Si no fue así:

1. **Detenga OmniRoute** (para evitar nuevos intentos)
2. **Compruebe el estado de la base de datos** con `sqlite3`
3. **Corrija manualmente** la migración parcial
4. **Vuelva a ejecutar** OmniRoute (se reintentará la migración)

Para evitarlo, pruebe siempre las migraciones primero en una copia.

---

## Véase también

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tablas de uso
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — supervisión del estado
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — flujo de publicación
- Código fuente: `src/lib/db/` (más de 80 archivos, unas 25 000 líneas de código)
