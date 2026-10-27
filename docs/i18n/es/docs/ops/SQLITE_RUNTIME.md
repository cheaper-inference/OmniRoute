# SQLite Runtime Resolution (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute resuelve su controlador de SQLite al iniciarse mediante una cadena de respaldo de 5 pasos:

1. **`better-sqlite3` incluido** (mediante `dependencies` en `package.json`)
   — la opción más rápida, con binario nativo, instalada por `npm install` cuando las herramientas de compilación están disponibles.

2. **`better-sqlite3` instalado en tiempo de ejecución** (en `~/.omniroute/runtime/`)
   — se instala de forma diferida en la primera ejecución **O BIEN** mediante `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valida los bytes mágicos del archivo `.node` nativo (ELF / Mach-O / PE) antes de cargarlo
   para protegerse frente a binarios dañados o destinados a otra plataforma.

3. **`node:sqlite`** (biblioteca estándar de Node ≥22.5) — no requiere compilación nativa; se utiliza cuando
   fallan ambas rutas de better-sqlite3. Conjunto de funciones limitado.

4. **`sql.js`** (WASM) — último recurso. Funciona en todas partes, pero es más lento
   y escribe los datos periódicamente en lugar de hacerlo de forma síncrona.

## ¿Por qué esta complejidad?

- **EBUSY en Windows**: `npm install -g omniroute@latest` puede fallar si el archivo
  `better_sqlite3.node` de la versión anterior está bloqueado por un proceso en ejecución. La instalación
  en tiempo de ejecución en `~/.omniroute/runtime/` evita la caché global de npm.
- **Sin herramientas de compilación**: Algunos entornos (Windows corporativo sin VS Build
  Tools, imágenes mínimas de Docker) no pueden compilar `better-sqlite3`. El instalador
  en tiempo de ejecución obtiene un binario precompilado del registro de npm; los controladores
  de respaldo garantizan que OmniRoute pueda iniciarse aunque esto falle.
- **Sistemas aislados de la red**: Si no se puede acceder al registro de npm, `node:sqlite`
  o `sql.js` garantizan una funcionalidad básica.

## Validación de bytes mágicos

Antes de cargar un archivo `.node` instalado en tiempo de ejecución, OmniRoute lee los primeros 8
bytes y los compara con los valores mágicos conocidos de las plataformas:

| Plataforma            | Bytes (hex)   | Etiqueta    |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS de 64 bits BE   | `FE ED FA CF` | `macho`     |
| macOS de 64 bits LE   | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Un valor mágico que no coincida → el archivo se ignora y el proceso de respaldo continúa con el siguiente paso.

## Comprobación del controlador activo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Control manual

```bash
# Omitir el calentamiento posterior a la instalación (para instalaciones rápidas de CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forzar la reinstalación de better-sqlite3 en tiempo de ejecución
rm -rf ~/.omniroute/runtime
omniroute  # se reinstalará en el siguiente inicio

# Comprobar qué controlador está activo
omniroute config db-info  # (si existe el comando de la CLI)
```

## Diagnóstico de bloqueos síncronos

Con `better-sqlite3`, establezca `OMNIROUTE_SQLITE_SLOW_MS=200` antes del inicio para activar
la medición de tiempos del adaptador síncrono. Está desactivada de forma predeterminada. Una operación completada que tarde
al menos esa cantidad de milisegundos emite una advertencia `[SQLITE-SLOW]`, como máximo una vez cada
diez segundos por adaptador. La advertencia solo contiene el controlador, la clase de operación
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transacción o mantenimiento) y
los milisegundos transcurridos: no incluye SQL, parámetros, filas, rutas ni texto de excepciones.

Se trata de una ayuda para el diagnóstico, no de un tiempo de espera ni de una optimización de consultas. No puede informar
sobre una operación que nunca finaliza, distinguir el trabajo de CPU de las esperas de disco, identificar
el SQL exacto ni observar operaciones realizadas mediante el identificador sin procesar del controlador.
La duración de las copias de seguridad asíncronas se excluye deliberadamente; los demás controladores de SQLite no
se instrumentan mediante esta opción. Desactivar la variable restaura el adaptador original
sin contenedores de medición de tiempos. No se modifica el esquema de la base de datos ni la configuración almacenada.

La advertencia de retraso de `/healthz` informa del pico del bucle de eventos desde la muestra anterior,
no del promedio de toda la vida útil. Correlacione sus marcas de tiempo con las advertencias de operaciones lentas
y las métricas del host y del almacenamiento antes de atribuir un bloqueo a SQLite o a un fallo del disco.

## Referencia

Implementación:

- `bin/cli/runtime/magicBytes.mjs` — utilidades de validación de bytes mágicos binarios
- `bin/cli/runtime/sqliteRuntime.mjs` — resolvedor de tiempo de ejecución de 5 pasos + instalador diferido
- `bin/cli/runtime/index.mjs` — orquestador de inicio (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — enlace posterior a la instalación de npm (calentamiento no fatal)
- `src/lib/db/core.ts` — exportaciones de `ensureDbInitialized()` / `getDriverInfo()`

## Topología de un solo escritor (HA no compatible)

La cadena de controladores de respaldo anterior sigue ejecutándose en **un solo proceso**. De forma predeterminada, SQLite
en OmniRoute funciona con **un solo escritor**:

- No conecte dos réplicas de OmniRoute al mismo archivo `storage.sqlite`.
- Un reinicio del contenedor, un despliegue Recreate, una finalización por OOM o un reinicio por HEALTHCHECK interrumpe
  todas las sesiones SSE en curso. No se drenan las sesiones en la ruta estándar.
- Una comprobación de actividad del orquestador que considere que un `/healthz` lento está inactivo eliminará la única
  réplica. Es preferible usar comprobaciones de actividad mediante TCP + disponibilidad mediante HTTP `/healthz`. Consulte
  la [Guía de Docker — disponibilidad](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  y las [recomendaciones de sondas de Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
