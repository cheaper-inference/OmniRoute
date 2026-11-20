# Plugin Marketplace (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fuente de referencia:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` y
> `src/app/(dashboard)/dashboard/plugins/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute incluye un sistema de plugins al estilo de WordPress. Los plugins son
directorios independientes —cada uno con un manifiesto `plugin.json` y un archivo
de entrada— que se conectan a la canalización de solicitudes (`onRequest` /
`onResponse` / `onError`) y a los eventos del ciclo de vida (`onInstall` /
`onActivate` / `onDeactivate` / `onUninstall`).

El **Marketplace de plugins** es la capa de descubrimiento situada sobre ese
sistema. Ofrece un catálogo navegable de plugins instalables. De forma
predeterminada, el catálogo es un pequeño registro semilla integrado; un operador
puede configurarlo para que use la URL de un registro remoto personalizado, en
cuyo caso la obtención está protegida mediante una defensa contra SSRF que
resuelve DNS (consulte [Seguridad](#security)).

Todas las rutas de plugins son **exclusivas de loopback** (nivel 1 —
`LOCAL_ONLY`): los plugins cargan y ejecutan código en procesos secundarios, por
lo que no se puede acceder a las rutas desde un origen que no sea de loopback,
independientemente de la autenticación. Consulte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cómo se adapta Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **capa de registro** — `src/lib/plugins/marketplace.ts`: enumera/busca en el catálogo, recurriendo al registro de semillas en caso de falla.
- **Capa de ciclo de vida** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalar, actualizar, activar, desactivar, desinstalar, escanear, cargar inicio.
- **capa manifiesta** — `src/lib/plugins/manifest.ts`: esquema Zod valores predeterminados de + para `plugin.json`.
- **Escáner** — `src/lib/plugins/scanner.ts`: descubre complementos en el disco en el directorio de complementos.
- **Cargador** — `src/lib/plugins/loader.ts`: genera cada complemento en un proceso secundario Node.js separado y los intermediarios enlazan llamadas a través de IPC. El niño no es un entorno limitado (consulte "Aislamiento de ejecución de complementos" a continuación).

## Catálogo del Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) devuelve una lista
de objetos `MarketplaceEntry`:

| Campo         | Tipo     | Notas                                             |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Nombre del plugin en kebab-case                   |
| `version`     | string   | semver                                            |
| `description` | string   | Resumen breve                                     |
| `author`      | string   | Autor/organización                                |
| `license`     | string   | Identificador de licencia de estilo SPDX          |
| `downloadUrl` | string   | URL de descarga de la fuente (puede estar vacía)  |
| `repository`  | string?  | URL opcional del repositorio                      |
| `tags`        | string[] | Etiquetas de búsqueda/filtrado                    |
| `downloads`   | number   | Número de descargas                               |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Indica si la entrada está marcada como verificada |
| `lastUpdated` | string   | Cadena de fecha en formato similar a ISO          |

Cuando no se configura la URL de un registro personalizado, el catálogo es el
`SEED_REGISTRY` integrado (actualmente `request-logger`, `rate-limiter`,
`cost-tracker` y `theme-manager`). El registro semilla siempre está disponible:
si un registro remoto configurado no está disponible, devuelve un estado que no
es `200` o devuelve un cuerpo no reconocido, `listMarketplacePlugins()` registra
una advertencia y recurre a la lista semilla.

> Nota: el **catálogo** del Marketplace (exploración/búsqueda) está integrado de
> extremo a extremo, pero la **instalación** con un clic desde el catálogo aún no
> está implementada: actualmente, el botón "Instalar" del panel para una entrada
> del Marketplace muestra un aviso de "próximamente". En la actualidad, la
> instalación se realiza mediante el flujo de instalación desde una ruta local
> (`POST /api/plugins`) y la detección en disco (`POST /api/plugins/scan`).

## REST API

Todos los puntos finales requieren autenticación de administración (`requireManagementAuth`)** y** son de bucle invertido — `/api/plugins` y `/api/plugins/` se enumeran en `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Punto final                      | Método | Descripción                                                             |
| -------------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista de complementos instalados (filtro `?status=` opcional)           |
| `/api/plugins`                   | POST   | Instale un complemento desde el directorio de fuentes de complementos   |
| `/api/plugins/scan`              | POST   | Escanee el directorio de complementos y registre nuevos complementos    |
| `/api/plugins/marketplace`       | GET    | Enumerar entradas del catálogo del mercado                              |
| `/api/plugins/[name]`            | GET    | Obtener detalles del complemento instalado                              |
| `/api/plugins/[name]`            | DELETE | Desinstalar un complemento                                              |
| `/api/plugins/[name]/activate`   | POST   | Activar (cargar ganchos de registro + )                                 |
| `/api/plugins/[name]/deactivate` | POST   | Desactivar (disparar `onDeactivate`, cancelar el registro de ganchos)   |
| `/api/plugins/[name]/config`     | GET    | Obtener el esquema de configuración + de configuración del complemento  |
| `/api/plugins/[name]/config`     | PUT    | Actualizar la configuración del complemento (validado según el esquema) |

El filtro `GET /api/plugins` `status` acepta uno de `installed` / `active` / `inactive` / `error`. Un valor no válido devuelve `400`.

### Listar complementos instalados

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalar desde una ruta local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

La `path` debe ser una** absoluto** ruta a un directorio** dentro del directorio de fuentes del complemento** : `plugin-sources` al lado de la raíz del complemento, por lo que `~/.omniroute/plugin-sources/` de forma predeterminada, o `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` cuando esa variable está configurada (`getPluginSourcesDir()` en `src/lib/plugins/installSource.ts`). Copie o clone el complemento allí primero. La instalación se rechaza con `400` cuando la ruta contiene `..` o un byte nulo, se encuentra fuera de ese directorio, se resuelve fuera de él a través de un enlace simbólico, contiene un enlace simbólico cuyo destino está fuera de él o cuando el directorio no existe. El directorio de origen debe contener un `plugin.json` válido (o ser padre de uno). En caso de éxito, la respuesta es `201` con la fila del complemento instalado.

A diferencia de otras rutas de complementos, esta requiere la credencial de administración (una sesión de panel o una clave API con alcance de administración) incluso cuando el inicio de sesión está deshabilitado (`requireLogin=false`): la instalación del código nunca es una acción anónima.

### Navegar por el mercado

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Actualizar la configuración del complemento

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valida cada valor proporcionado con el `configSchema` del complemento (declarado en el manifiesto): los campos `number` respetan `min`/`max`, los campos `select` deben coincidir con el `enum` declarado. Se permiten las claves que no están presentes en el esquema.

## Configuración

### Directorio de plugins

Los plugins se encuentran en el directorio de datos de OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o aquello a lo que apunte manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) resuelve ese directorio en
tres pasos:

1. **`OMNIROUTE_PLUGINS_DIR`**, cuando está definida: se utiliza literalmente, independientemente de lo que indique `HOME`. Este es
   el control explícito para Docker/K8s, donde el árbol de plugins se monta mediante bind mount en una ruta
   que normalmente no tiene ninguna relación con el directorio de inicio del contenedor (#11827).
2. `<home>/.omniroute/plugins`, donde `<home>` se obtiene de las variables de entorno `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, cuando el proceso no exporta ningún directorio de inicio.

El directorio resuelto se registra una vez durante el inicio como `scanner.dir_resolved`, indicando la
entrada seleccionada (`OMNIROUTE_PLUGINS_DIR`, `home` o `no-home-fallback`); de este modo, una imagen
que termina silenciosamente en el paso 3 lo comunica, en lugar de limitarse a informar de una lista de plugins vacía.
`POST /api/plugins/scan` descubre cualquier subdirectorio de esa ubicación que contenga un
`plugin.json` válido y lo registra; ese mismo directorio es la raíz en la que
`pluginManager.install()` copia los plugins, por lo que una sobrescritura mueve conjuntamente el descubrimiento y
la instalación.

> **`OMNIROUTE_PLUGINS_DIR` no es `OMNIROUTE_PLUGIN_PATH`.** Esta última solo es leída por
> el cargador de plugins de comandos de la CLI (`bin/cli/plugins.mjs`) para encontrar paquetes npm
> `omniroute-cmd-*` que añaden subcomandos a `omniroute`; no afecta al escáner en tiempo de ejecución
> descrito aquí. Consulta [PLUGINS.md](./PLUGINS.md) para obtener información sobre ese aspecto.

### URL personalizada del registro del marketplace

El origen del catálogo del marketplace se obtiene del ajuste `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` lee `settings.pluginMarketplaceUrl`). Cuando
se establece en una URL `http(s)`, `listMarketplacePlugins()` obtiene esa URL y acepta
un array JSON de entradas en el nivel superior o un objeto con un array `plugins`;
se filtran las entradas que no tengan un `name` de tipo string. Cuando no está configurada (o cuando la solicitud
no supera la protección SSRF o devuelve una respuesta incorrecta), se utiliza el registro inicial
integrado.

La pestaña "Marketplace" del panel expone un campo para esta URL (que vuelve a leerse mediante
`GET /api/settings`).

> Nota de implementación: la acción "Guardar" del panel envía
> `pluginMarketplaceUrl` a `PATCH /api/settings`. En el momento de redactar este documento, esta
> clave no está declarada en `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), por lo que debes verificar la persistencia en tu
> versión antes de depender de ella; la ruta de **lectura** (`getSettings()` →
> `listMarketplacePlugins()`) respeta la clave una vez que está presente en el almacén de
> ajustes.

## Seguridad

### Solo bucle invertido de nivel de ruta —

Los complementos ejecutan código en procesos secundarios generados, por lo que toda la superficie `/api/plugins` se clasifica como `LOCAL_ONLY` (Nivel 1). La aplicación de loopback se ejecuta incondicionalmente** antes** cualquier verificación de autenticación, por lo que un token de administración filtrado que llegue a la caja a través de un túnel aún no puede instalar, activar o desinstalar un complemento. Consulte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) y Reglas estrictas #15 / #17.

### Registro de mercado SSRF guard

Un registro personalizado URL es una configuración influenciable por el atacante, por lo que antes de recuperarlo, `listMarketplacePlugins()` lo ejecuta a través de dos capas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rechaza todo lo que no sea `http:` / `https:`.
   - Rechaza hosts private/loopback/link-local/ULA literales (IPv4** y** IPv6, incluido IPv4-mapped) a través del canónico `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Resuelve** ambos** `A` y `AAAA` registran y rechazan si** cualquier** la dirección resuelta es privada — cerrando el nombre de host público → omisión de IP privada.
   - **Falla cerrada** : un fallo en la resolución DNS rechaza el URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): vuelve a aplicar la protección URL solo pública en el momento de la recuperación y** bloquea redirecciones** (sin pivot `30x` público → privado).

Un URL que falla en cualquiera de las capas no cancela la solicitud — el mercado recurre silenciosamente al registro de semillas incorporado y registra una advertencia.

> Esta guardia fue reforzada en PR #3774 específicamente para resolver A + AAAA y usar el `isPrivateHost` canónico en lugar de una verificación IPv4-only.

### Aislamiento de ejecución de complementos

> **Los complementos no están protegidos.** El hijo es un proceso Node.js ordinario que se ejecuta como usuario OmniRoute, sin contexto VM ni indicadores de permiso Node.js, por lo que el código del complemento puede leer y escribir cualquier archivo que el usuario pueda, ejecutar programas y acceder a la red. `requires.permissions` solo decide qué variables de entorno recibe el niño; los demás permisos no se aplican. Instale solo complementos en los que confíe. El límite del proceso siguiente contiene bloqueos y bloqueos; no es una frontera de seguridad.

- **Aislamiento de procesos** — `loadPlugin()` (`src/lib/plugins/loader.ts`) genera cada complemento en un proceso secundario Node.js separado y se comunica a través de IPC. Las llamadas de gancho tienen un tiempo de espera con escalada `SIGTERM` → `SIGKILL`.
- **Lista de entorno permitido** — el niño recibe solo un conjunto de variables de entorno incluidas en la lista permitida; el conjunto más amplio solo se otorga cuando el manifiesto solicita el permiso `env`.
- **Instalar contención de fuente** — `POST /api/plugins` solo lee desde el directorio de fuentes del complemento (consulte "Instalar desde una ruta local"): la ruta se canonicaliza con `realpath`, debe permanecer estrictamente dentro de ese directorio, y un árbol de fuentes que lleva un enlace simbólico que se escapa se rechaza antes de copiar algo.
- **Contención de camino** — install/upgrade/uninstall afirma que el directorio de complementos y `manifest.main` se resuelven** dentro** la raíz del complemento administrado antes de cualquier copia o eliminación recursiva (protege contra rutas DB manipuladas y recorrido `../` en `manifest.main`). La activación resuelve enlaces simbólicos a través de `realpath` y se niega a cargar un punto de entrada que escapa del directorio del complemento.
- **Pin de integridad opcional** — un manifiesto puede declarar un campo `integrity` (formato `sha256-<base64>`, SRI ). Cuando está presente, el cargador verifica el hash del archivo de entrada en el momento de la carga y se niega a activarse si no coincide. Es una detección de manipulación opcional,** no** un límite de seguridad: no limita lo que puede hacer un complemento cargado.
- **No hay credenciales de cliente en los ganchos** — el contexto pasado a `onRequest`, `onResponse` y `onError` tiene los encabezados `authorization`, `x-api-key`, `proxy-authorization` y `cookie` eliminados, y el registro de clave API no lleva ningún valor de clave (`redactPluginContext()` en `src/lib/plugins/hooks.ts`).

## Manifiesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo         | Notas                                                                  |
| ------------------ | ------------ | ---------------------------------------------------------------------- |
| `name`             | cadena       | Requerido; kebab-case (`^[a-z0-9-]+$`), 1–100 caracteres               |
| `version`          | cadena       | Requerido; semver (`MAJOR.MINOR.PATCH`)                                |
| `description`      | ¿cadena?     | ≤ 500 caracteres                                                       |
| `author`           | ¿cadena?     | ≤ 200 caracteres                                                       |
| `license`          | ¿cadena?     | El valor predeterminado es `MIT`                                       |
| `main`             | ¿cadena?     | expediente de entrada; por defecto es `index.js`                       |
| `source`           | enumeración? | `local` \| `marketplace` (por defecto `local`)                         |
| `tags`             | cadena[]?    | Buscar etiquetas                                                       |
| `requires`         | ¿objeto?     | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | ¿objeto?     | Booleanos que declaran qué ganchos implementa el complemento           |
| `skills`           | objeto[]?    | Definiciones de habilidades opcionales                                 |
| `enabledByDefault` | booleano?    | Activar automáticamente al instalar                                    |
| `configSchema`     | ¿objeto?     | Mapa de campos de configuración (`string`/`number`/`boolean`/`select`) |
| `integrity`        | ¿cadena?     | Pin de archivo de entrada `sha256-<base64>` opcional                   |

Los permisos se obtienen de la enumeración `network` / `file-read` / `file-write` / `env` / `exec`. Sólo `env` tiene un efecto de tiempo de ejecución (una lista de variables de entorno permitidas ligeramente más grande para el niño); los demás son declaraciones y no se aplican.

## Flujo del ciclo de vida

```
instalar (POST /api/plugins, ruta)
  → escanear/validar el manifiesto → copiar al área de preparación → comprobar que main esté dentro del directorio
  → cambio de nombre atómico a ~/.omniroute/plugins/<name> → insertar fila en la base de datos
  → ejecutar onInstall → si enabledByDefault: activar

activar (POST /api/plugins/{name}/activate)
  → comprobar la contención con realpath → loadPlugin() (iniciar proceso secundario)
  → registrar los hooks declarados → status = "active" → ejecutar onActivate

desactivar (POST /api/plugins/{name}/deactivate)
  → ejecutar onDeactivate (ANTES de anular el registro) → anular el registro de los hooks
  → finalizar el proceso secundario → status = "inactive"

desinstalar (DELETE /api/plugins/{name})
  → desactivar si está activo → ejecutar onUninstall
  → eliminación recursiva con comprobación de contención del directorio del plugin → eliminar fila de la base de datos
```

Volver a ejecutar `install` en un directorio cuya versión del manifiesto sea **estrictamente
más reciente** que la versión instalada realiza una actualización automática (reinstalación limpia; la configuración se restablece
a los valores predeterminados). Se rechaza una versión igual o anterior.

## Base de datos

Tabla `plugins` (migración `076_create_plugins.sql`):

| Columna         | Tipo    | Notas                                                                |
| --------------- | ------- | -------------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                                 |
| `name`          | TEXT    | Único                                                                |
| `version`       | TEXT    | semver; valor predeterminado `1.0.0`                                 |
| `description`   | TEXT    | Opcional                                                             |
| `author`        | TEXT    | Opcional                                                             |
| `license`       | TEXT    | Valor predeterminado `MIT`                                           |
| `main`          | TEXT    | Archivo de entrada; valor predeterminado `index.js`                  |
| `source`        | TEXT    | Valor predeterminado `local`                                         |
| `tags`          | TEXT    | Array JSON; valor predeterminado `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                     |
| `enabled`       | INT     | 0/1; valor predeterminado 0                                          |
| `manifest`      | TEXT    | JSON completo del manifiesto                                         |
| `config`        | TEXT    | JSON; valor predeterminado `{}`                                      |
| `config_schema` | TEXT    | JSON; valor predeterminado `{}`                                      |
| `hooks`         | TEXT    | Array JSON de nombres de hooks declarados; valor predeterminado `[]` |
| `permissions`   | TEXT    | Array JSON; valor predeterminado `[]`                                |
| `plugin_dir`    | TEXT    | Directorio de instalación absoluto                                   |
| `error_message` | TEXT    | Se establece cuando `status = "error"`                               |
| `installed_at`  | TEXT    | `datetime('now')`                                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                                    |
| `activated_at`  | TEXT    | Se establece al activar                                              |

Las métricas y los análisis de los plugins se registran en tablas adicionales
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Panel

La página del panel en `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) proporciona dos pestañas:

- **Instalado** — enumera los complementos instalados con sus ganchos declarados, un interruptor activate/deactivate, un botón de desinstalación y una acción "Buscar complementos" (`POST /api/plugins/scan`).
- **Mercado** — muestra el catálogo de `GET /api/plugins/marketplace` con un campo para configurar el registro personalizado URL.

La página siempre muestra una advertencia de que los complementos se ejecutan con todos los privilegios del proceso OmniRoute.

Una página de configuración por complemento se encuentra en `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Véase también

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  por qué `/api/plugins` solo es accesible desde la interfaz de bucle invertido (Nivel 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — el framework de habilidades relacionado
  (`src/lib/skills/`); los plugins pueden declarar habilidades en su manifiesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integraciones salientes
  basadas en eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  el patrón `buildErrorBody()` que utiliza cada ruta de plugin para las respuestas de error
