# Authorization Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fuente de referencia:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Última actualización:** 2026-09-22 — los espacios de nombres de alcance apuntan a MCP-SERVER.md

OmniRoute dispone de una canalización de autorización que tiene en cuenta las rutas y controla cada solicitud de API. La clasificación es **determinista** y **cerrada por defecto**: todo lo que no pueda clasificarse termina como `MANAGEMENT` y requiere una sesión o un token de nivel de gestión. Esta página explica el modelo para los ingenieros que mantienen rutas o diseñan nuevos endpoints.

![Canalización de AuthZ (3 clases de rutas + evaluación de políticas)](../diagrams/exported/authz-pipeline.svg)

> Fuente: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dos modos de autenticación

### 1. Clave de API (Bearer)

Se utiliza para las API de cliente compatibles con OpenAI/Anthropic/Gemini y para algunas rutas de administración cuando la clave tiene el ámbito `manage`.

```
Authorization: Bearer <api-key>
```

Validado por `isValidApiKey()` / `extractApiKey()` en `src/sse/services/auth.ts` y reexportado a través de `src/shared/utils/apiAuth.ts`. El validador también acepta las variables de entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como claves de transferencia persistentes (issue #1350).

### 2. Sesión del panel (cookie auth_token)

Para las páginas del panel y las operaciones de administración.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Una cookie solo es una sesión cuando el JWT se verifica **y** contiene `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todos los
consumidores de la cookie (protección de rutas del panel (`isDashboardSessionAuthenticated()`), actualización de la canalización de autorización, enlace de WebSocket, servidor en tiempo real,
`/api/settings/require-login`, `/api/auth/status`) pasan por ese helper.
Existen otros JWT firmados con `JWT_SECRET`: la transferencia de Cursor CLI
emite tokens con `iss "omniroute" / aud "cursor-cli"` para los titulares de claves,
y nunca son sesiones
(#13298).

Verificado por `isDashboardSessionAuthenticated()` en `src/shared/utils/apiAuth.ts`. La canalización actualiza automáticamente el JWT cuando le quedan menos de 7 días de su vigencia de 30 días.

Una sesión también puede finalizar antes de que transcurran sus 30 días, porque cada emisor pasa por `mintDashboardSessionToken` (un tiempo de emisión `iat` y un identificador `jti`) y el verificador comprueba dos configuraciones: `sessionsValidAfter`, establecida al cambiar la contraseña para que ninguna sesión emitida antes de ese momento siga verificándose (el navegador que cambió la contraseña recibe una cookie nueva), y `revokedDashboardSessions`, a la que `POST /api/auth/logout` añade el `jti` de la sesión cerrada. Las sesiones emitidas por una versión anterior no contienen ninguna de las dos notificaciones y siguen siendo válidas hasta el primer cambio de contraseña. Si no se pueden leer las configuraciones, la sesión no se considera de confianza.

Algunas rutas de administración aceptan **cualquiera** de los dos modos: cookie O `Bearer <key>` cuando la clave de API tiene el ámbito `manage` (o `admin`). Esto es lo que permite el flujo de trabajo «configurable mediante llamadas a la API» añadido en v3.8.

#### Puerta de enlace de inicio de sesión OIDC opcional (#6973)

El inicio de sesión de administrador del panel también admite un flujo OIDC (OpenID Connect) **optativo** junto con el inicio de sesión predeterminado mediante contraseña; el inicio de sesión mediante contraseña nunca se elimina, solo se
complementa:

- Deshabilitado a menos que `settings.oidcEnabled === true` **y** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estén todos configurados (Configuración → Autenticación).
  `GET /api/auth/oidc/login` devuelve `400` en caso contrario.
- `GET /api/auth/oidc/login` descubre `authorization_endpoint` desde
  `/.well-known/openid-configuration` del emisor (recurre a
  `<issuer>/authorize`), construye la URI de redirección a partir de la solicitud
  entrante (compatible con `x-forwarded-proto`) y redirige al IdP con un `state`
  aleatorio almacenado en una cookie `httpOnly` llamada `oidc_state`.
- `GET /api/auth/oidc/callback` valida `state`, intercambia el código de autorización
  y verifica la firma del token de identidad mediante el JWKS del emisor
  (`createRemoteJWKSet` de `jose`, almacenado en caché por URI de JWKS), con
  comprobaciones de `issuer`/`audience`. El acceso al panel requiere una lista
  `oidcAllowedSubjects` no vacía, una política `oidcAdmissionClaim`, o ambas.
  La lista de sujetos coincide con `sub` o `email` únicamente cuando
  `email_verified === true`. La política de claims opcional toma una ruta de
  claim del token de identidad separada por puntos (por ejemplo,
  `realm_access.roles`) y una matriz de valores aceptados; el claim resuelto debe
  ser una matriz de cadenas que contenga al menos un valor aceptado. Si ambas
  políticas están configuradas, ambas deben cumplirse. Los claims ausentes o con
  formato incorrecto provocan un rechazo seguro y, sin ninguna de las dos
  políticas, el callback rechaza el inicio de sesión (`not_configured`). Las
  configuraciones existentes basadas únicamente en sujetos continúan sin cambios.
- Normalmente, Keycloak asigna los roles del realm a los tokens de acceso, no
  necesariamente a los tokens de identidad. Para requerir el rol de realm `admin`,
  configura un asignador de protocolo para este cliente que incluya
  `realm_access.roles` en su **token de identidad** y, a continuación, establece
  `oidcAdmissionClaim` en `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Comprueba el claim real del token de identidad para este cliente antes de
  habilitar el acceso basado únicamente en roles; la aplicación no lee los roles
  del token de acceso. El rechazo de tokens por parte del IdP puede complementar,
  pero no sustituye, esta comprobación del lado de la aplicación.
- Cuando se realiza correctamente, genera el **mismo** JWT `auth_token` de 30 días
  que emite el inicio de sesión mediante contraseña
  (`src/app/api/auth/login/route.ts`), por lo que el resto del flujo de sesión
  del panel (renovación automática, indicadores de cookies) no cambia:
  OIDC solo sustituye la forma en que se genera la cookie, no lo que esta
  concede. Los cambios en los roles o grupos del IdP no invalidan las sesiones
  existentes de OmniRoute; el cierre de sesión, la rotación de la contraseña o
  la expiración de la sesión siguen determinando su duración.
- Cada configuración `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) está incluida en
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  responde `400 PASSWORD_REQUIRED` a menos que el cuerpo incluya la contraseña
  de administración como `currentPassword` (`401 PASSWORD_MISMATCH` cuando es
  incorrecta). `oidcDisablePasswordLogin` rechaza el _inicio de sesión_ mediante
  contraseña (`POST /api/auth/login`), pero conserva el hash de la contraseña
  almacenado, y la reautenticación continúa comprobando `currentPassword` contra
  dicho hash.
- `corsOrigins` y `bruteForceProtection` también están incluidos en
  `SECURITY_IMPACTING_SETTINGS_KEYS`: flexibilizar cualquiera de ellos debilita
  las defensas del inicio de sesión, por lo que requieren la misma
  reautenticación mediante `currentPassword` (la pestaña Seguridad la solicita)
  y la importación JSON los omite.
- Cada clave de política de seguridad —las entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, todas las claves `oidc*` y el estado de
  sesión del panel— es **solo para operadores** en `PATCH /api/settings`: una
  clave de API con alcance de administración o un token de acceso `oma_` se
  rechaza con `403` incluso cuando envía el `currentPassword` correcto, y el
  rechazo se audita como `settings.update_failed` con
  `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` en
  `src/lib/api/operatorCredential.ts`). La configuración ordinaria (tema,
  preferencias de visualización) sigue siendo modificable mediante una clave
  `manage` o un token de acceso `admin`. Toda mutación de `/api/settings` (y de
  `/api/settings/require-login`) también requiere el alcance del token de acceso
  `admin` (`ADMIN_MUTATION_EXACT_PATHS` en `src/server/authz/accessScopes.ts`,
  coincidencia exacta de ruta); `GET` mantiene el alcance `read`, y las demás
  subrutas `/api/settings/*` (proxies, valores predeterminados de combinación,
  alias de modelos, compresión, purgas…) conservan el alcance `write` inferido
  por el método.
- `POST /api/settings/import-json` omite esa reautenticación, por lo que elimina
  todas las claves incluidas en `IMPORT_STRIPPED_SETTINGS_KEYS` (en el mismo
  archivo) antes de escribir: la contraseña y `currentPassword`, todas las
  entradas de `SECURITY_IMPACTING_SETTINGS_KEYS` y el estado de sesión del panel
  (`sessionsValidAfter`, `revokedDashboardSessions`). Por tanto, importar una
  copia de seguridad antigua no puede reactivar una sesión que ya haya terminado
  por un cambio de contraseña o un cierre de sesión.

#### Inicio de sesión opcional con autenticación de dos factores TOTP (#16619)

Se configura desde Configuración → Seguridad; permanece desactivado hasta que
el operador lo activa (`src/server/auth/dashboardMfa.ts`).

- **Qué cubre:** inicio de sesión con contraseña (`POST /api/auth/login`, que después necesita
  `POST /api/auth/mfa/verify`) y `omniroute connect` (`POST /api/cli/connect`,
  que rechaza un intercambio basado únicamente en contraseña y toma el código como
  `totp`).
- **Qué no cubre:** el inicio de sesión mediante OIDC / SSO (`/api/auth/oidc/callback`) no
  solicita el TOTP de OmniRoute. Depende del segundo factor propio del proveedor de identidad,
  por lo que debe exigir MFA en el IdP si OIDC está habilitado.
- **Recuperación** (dispositivo perdido, sin códigos de recuperación disponibles o un factor que
  ya no se puede verificar, por ejemplo, después de cambiar `STORAGE_ENCRYPTION_KEY`):
  1. Reinicie el servidor con `OMNIROUTE_DISABLE_MFA=true`.
  2. En el propio host (par de loopback y `Host` de loopback, como
     `http://localhost:20128`), inicie sesión con la contraseña. El segundo factor se omite
     únicamente para ese origen; cualquier otro origen seguirá necesitando el código.
  3. En Configuración → Seguridad → Deshabilitar, introduzca la contraseña y deje el código
     en blanco. `POST /api/auth/mfa/disable` acepta un cuerpo sin `code` únicamente mientras
     la variable esté establecida y la solicitud provenga del host; aun así, requiere la sesión
     del panel y la contraseña actual, y se audita como `auth.mfa.disabled` con
     `secondFactor: "recovery_switch"`.
  4. Anule `OMNIROUTE_DISABLE_MFA`, reinicie y vuelva a inscribirse si es necesario.

## Clases de rutas

`src/server/authz/types.ts` define tres clases; cualquier ruta que no pueda clasificarse de forma determinista recurre a `MANAGEMENT`.

| Clase        | Descripción                                                                                                                                                     | Autenticación requerida                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `PUBLIC`     | Rutas explícitamente seguras: inicio de sesión, cierre de sesión, estado, comprobación de estado, arranque de la incorporación.                                 | Ninguna                                                                        |
| `CLIENT_API` | Endpoints que sirven modelos: `/api/v1/*`, `/api/v1beta/*`, además de los alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Clave Bearer cuando la feature flag efectiva `REQUIRE_API_KEY` está habilitada |
| `MANAGEMENT` | Páginas del panel, configuración, proveedores, claves, endpoints de administración y diagnóstico.                                                               | Sesión del panel O Bearer con el ámbito `manage`                               |

Algunas acciones de `MANAGEMENT` son **exclusivas del operador**: una clave con `manage` no es suficiente. Exportar
credenciales almacenadas (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), restaurar una copia de seguridad sobre los datos activos
(`POST /api/db-backups/import`, incluido `dryRun=true`, `POST /api/db-backups` para restaurar por id,
`POST /api/settings/import-json`), destruir puntos de restauración (`DELETE /api/db-backups` para la limpieza,
y `PATCH /api/db-backups`, porque la retención que persiste controla la poda automática después de cada copia de seguridad)
requieren una sesión del panel, el sujeto de la CLI local o que el inicio de sesión esté deshabilitado. Emitir un
token de sincronización (`POST /api/sync/tokens`) y acuñar un token de acceso de la CLI con `admin`
(`POST /api/cli/tokens`) requieren una sesión del panel o el sujeto de la CLI local en cualquier modo de inicio de sesión.
Las claves de API de cualquier ámbito y los tokens de acceso `oma_` no son credenciales del operador: reciben `403`
siempre que se requiera una. La comprobación
se encuentra en `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`). Cambiar la configuración de inicio de sesión también es exclusivo del operador:
`POST /api/settings/require-login` (establecer la contraseña de administración / alternar `requireLogin`) acepta
únicamente esas credenciales una vez que existe una contraseña —la ventana de arranque inicial (cuando aún no hay
contraseña) no cambia— y una sesión del panel debe enviar `currentPassword` para reemplazar la contraseña
(`403` cuando falta o es incorrecta, auditado como `settings.update_failed`). La CLI local y una
instancia con el inicio de sesión deshabilitado conservan la ruta de recuperación y pueden establecer una contraseña sin ella,
ya que ambas están vinculadas al host que posee el directorio de datos.

## Tubería

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Los encabezados internos confiables (definidos en `src/server/authz/headers.ts`) son** eliminado de las solicitudes entrantes** antes de la clasificación, los clientes — no pueden completar previamente `x-omniroute-auth-*` para hacerse pasar por un sujeto.

### Contratos de póliza

Cada clase de ruta tiene una política en `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — siempre devuelve `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrae el portador y lo valida mediante `validateApiKey()`. Pasa a ser anónimo solo cuando el indicador de función `REQUIRE_API_KEY` efectivo está deshabilitado. El indicador efectivo se resuelve mediante `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), de modo que los indicadores de funciones del panel y las variables de entorno gobiernan `/api/v1/*`, `/api/v1beta/*` y los alias de manera consistente; Las fallas del solucionador fallan cerradas. Permite solicitudes de sesiones de panel en rutas API del cliente (incluido `/api/v1/models`, utilizado por el catálogo de modelos de panel). Cuando Entra ID SSO está habilitado, un portador que es estructuralmente un token de Entra (tres segmentos base64url, `RS*` alg, `kid`) es manejado por la rama SSO** antes** `validateApiKey()` y su veredicto es final — nunca pasa por la ruta de la clave API o la rama degradada a anónima, por lo que una interrupción del proveedor de identidad no puede convertirse en acceso abierto. Las claves estáticas API no se ven afectadas. Ver [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — acepta sesiones de panel, solicitudes internas de sincronización de modelos (comparadas con `/api/providers/[name]/(sync-models|models)`) o las omite por completo si `isAuthRequired()` devuelve false. Devuelve 403 (`AUTH_001`) cuando un token de portador está presente pero no es válido; en caso contrario, 401. También aplica los niveles de protección de ruta (LOCAL_ONLY / ALWAYS_PROTECTED) antes de cualquier rama de autenticación — Consulte [Niveles de protección de ruta](../security/ROUTE_GUARD_TIERS.md). Se puede acceder a las rutas LOCAL_ONLY en `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (hoy: `/api/mcp/`) desde un sistema sin bucle invertido cuando la clave portadora lleva el alcance `manage` ; todas las demás rutas LOCAL_ONLY siguen siendo de bucle invertido estricto independientemente del alcance.

Una política exitosa devuelve `AuthSubject` con `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Los controladores posteriores pueden leerlo a través de `assertAuth(request, "CLIENT_API")` en `src/server/authz/assertAuth.ts` en lugar de volver a ejecutar la lógica de autenticación.

## Lista de rutas públicas

`src/shared/constants/publicApiRoutes.ts` es la lista de permitidos explícita:

La lista se divide por **forma**, y esta división es fundamental (GHSA-74g9-q8f6-793h): un prefijo se
compara con `startsWith()`, por lo que también coincide con todas las rutas adyacentes que comparten
sus caracteres iniciales.
`/api/usage/om-usage` como prefijo marcaba `/api/usage/om-usage<anything>` como PÚBLICA, y Next resuelve
eso en `/api/usage/[connectionId]`: un controlador sin autenticación propia.

```ts
// Subárboles genuinos. Cada entrada DEBE terminar en "/" (verificado mediante una prueba unitaria).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // se trata como CLIENT_API en classify, no como "público sin autenticación"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rutas individuales, coinciden EXACTAMENTE (con o sin una barra final).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // paso 2 del inicio de sesión para TOTP activado opcionalmente; necesita la cookie MFA-pending
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rutas individuales de solo lectura que también aceptan la relajación del origen CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Ruta individual de solo lectura SIN la relajación de CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Las rutas de solo lectura son públicas **únicamente** para métodos seguros. Nota: `classifyRoute()` excluye `/api/v1/*` y `/api/v1beta/*` del resultado alternativo PUBLIC; esas rutas siempre son `CLIENT_API`, por lo que la política de claves Bearer sigue aplicándose.

## Añadir una ruta nueva

### Patrón 1 — Endpoint público de la API de cliente (autenticación Bearer)

Las rutas bajo `/api/v1/` y `/api/v1beta/` se clasifican automáticamente como `CLIENT_API`. El middleware aplica la comprobación Bearer; los controladores de rutas no necesitan repetirla, pero pueden leer el sujeto si resulta útil.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lógica del controlador
}
```

### Patrón 2 — Endpoint de administración (sesión o Bearer + manage)

Use `requireManagementAuth()` de `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lógica del controlador
}
```

`requireManagementAuth()` devuelve `null` si la operación tiene éxito o una `Response` de error JSON:

- 401 `AUTH_001` "Autenticación requerida" — no hay ninguna credencial
- 403 — Bearer no válido **o** Bearer presente, pero la clave carece del ámbito `manage` / `admin`

`hasManageScope(scopes)` devuelve true para `"manage"` o `"admin"`.

### Patrón 3 — Añadir a la lista de permitidos pública

Elija el conjunto según la forma, no por conveniencia. Una ruta individual debe incluirse en `PUBLIC_API_ROUTES_EXACT` (o en `PUBLIC_READONLY_CORS_API_ROUTES` si solo admite GET); únicamente un subárbol auténtico debe incluirse en `PUBLIC_API_ROUTE_PREFIXES`, y **debe terminar en `/`**. Incluir una sola ruta en la lista de prefijos también publica todas las rutas adyacentes que compartan sus caracteres iniciales, incluidos los elementos hermanos con segmentos dinámicos que se añadan posteriormente (GHSA-74g9-q8f6-793h). Actualice las pruebas unitarias en `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` y `tests/unit/authz/classify.test.ts`.

## Ámbitos

Tres espacios de nombres. Cada verificador lee únicamente sus propias cadenas. La comparación en paralelo,
incluido por qué `manage` no supera `scopeMatches` para `read:compression` y por qué un
token de acceso `read` no puede ejecutar `PATCH /api/keys/{id}`, se encuentra en
[Tres espacios de nombres de ámbitos](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Las claves de API incluyen un array `scopes` (almacenado como JSON en `api_keys.scopes`; consulta `src/lib/db/apiKeys.ts`).

### Ámbito de administración

- `manage` / `admin` — `hasManageScope`. Acceso Bearer a las rutas de la API de administración.
- `mcp:connect`, `self:usage`, `self:account-quota` y
  `policy:bypass-provider-quota` son ámbitos aditivos de coincidencia exacta. Se encuentran
  fuera de `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` habilita únicamente la
  excepción para conexiones que no sean de loopback de `/api/mcp/`.

### Ámbitos de herramientas MCP

Catálogo y reglas de coincidencia (cadena idéntica o un ámbito concedido que termine en `*`):
[Ámbitos de herramientas MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` en `src/shared/constants/mcpScopes.ts` es el subconjunto tipado
original, no el catálogo completo. La aplicación se ejecuta en
`open-sse/mcp-server/scopeEnforcement.ts` después de que `resolveCallerScopeContext()`
resuelva los ámbitos a partir de la información de autenticación de MCP, los metadatos de la solicitud o `OMNIROUTE_MCP_SCOPES`.
Permanece desactivada a menos que `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Ámbitos de tokens de acceso

`read` / `write` / `admin` en tokens `oma_live_…`, clasificados por `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Esta clasificación se aplica únicamente a la
credencial del token de acceso. Consulta [Autenticación de administración](../guides/MANAGEMENT-AUTH.md).

## Interruptor de autenticación requerida

`isAuthRequired()` en `src/shared/utils/apiAuth.ts` decide si se exige **cualquier** autenticación para una solicitud:

- `settings.requireLogin === false` → la autenticación está deshabilitada globalmente, excepto para el
  nivel siempre protegido (consulta [Niveles de protección de rutas](../security/ROUTE_GUARD_TIERS.md)) y las llamadas que entregan una
  credencial que acepta, las cuales necesitan la misma credencial que cuando el inicio de sesión está
  activado: emitir tokens de sincronización, generar tokens de acceso de CLI en cualquier ámbito y
  crear una clave de API con el ámbito `manage`/`admin`, conceder ese ámbito a una clave o regenerar o
  revelar una clave de ese tipo
  (`requireCredentialForManagementScopedKey()` en `src/lib/api/requireManagementAuth.ts`).
  Las claves de solo inferencia permanecen abiertas. La escritura de un indicador de función protegido
  (`REQUIRE_API_KEY`, los demás indicadores de Seguridad y los indicadores de SSRF / TLS / ámbito de MCP / sandbox
  enumerados en [Indicadores de funciones](../reference/FEATURE_FLAGS.md#rest-api)) y el guardado de la configuración de enmascaramiento de PII
  (`PUT /api/settings/pii`) también siguen necesitando una credencial.
- No hay ninguna contraseña configurada **ni** ninguna variable de entorno `INITIAL_PASSWORD` → el modo de
  arranque permite el asistente de incorporación y las solicitudes de loopback, pero las solicitudes de red
  expuestas siguen necesitando credenciales. Excepción: la escritura de un indicador de función protegido y
  el guardado de la configuración de enmascaramiento de PII (`PUT /api/settings/pii`) necesitan una
  credencial incluso desde loopback, por lo que el loopback por sí solo no es suficiente en esos casos.
- Cualquier error de la base de datos → se deniega el acceso de forma predeterminada (seguro por defecto).

La aplicación de claves de API del cliente utiliza `isRequireApiKeyEnabled()` en `src/shared/utils/featureFlags.ts`, no una lectura directa de `process.env.REQUIRE_API_KEY`. Esto es importante para las instancias implementadas: alternar `REQUIRE_API_KEY` en Panel → Indicadores de funciones almacena una anulación en la base de datos y afecta inmediatamente a `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` y otras comprobaciones de autenticación de la API del cliente que comparten este helper. Si no se puede leer el almacén de indicadores de funciones, la autenticación de la API del cliente deniega el acceso de forma predeterminada y exige una clave.

## Cambio incompatible — v3.8.0

Los endpoints `/api/v1/agents/tasks/*` y `/api/resilience/model-cooldowns` **ahora requieren autenticación de gestión** (commit `588a0333`). Los clientes que anteriormente enviaban una clave de API normal sin el ámbito `manage` reciben `403`. Migración: asigne el ámbito `manage` a la clave en el panel API Keys o utilice una sesión iniciada en el panel.

## Cambio de comportamiento — v3.8.2

`/api/mcp/*` (el servidor MCP remoto) sigue siendo LOCAL_ONLY de forma predeterminada, pero ahora acepta solicitudes que no sean de loopback cuando el encabezado `Authorization: Bearer <api-key>` incluye el ámbito `manage`. La excepción se habilita explícitamente para cada ruta mediante `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` en `src/server/authz/routeGuard.ts`; el prefijo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` intencionadamente NO permite esta excepción porque puede generar subprocesos arbitrarios. Las solicitudes anónimas a `/api/mcp/*` que no sean de loopback siguen devolviendo `403 LOCAL_ONLY`; el comportamiento predeterminado de cualquier ruta LOCAL_ONLY nueva continúa siendo estrictamente de loopback. Consulte [Niveles de protección de rutas](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pruebas

- Pruebas unitarias: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permitidos pública: `tests/unit/public-api-routes.test.ts`.
- Ejecución específica: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuración

El canal siempre marca las respuestas con:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para solicitudes autenticadas, los encabezados de solicitud ascendentes (del lado del controlador) también incluyen:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Utilice `assertAuth(req, expectedClass)` dentro de los controladores — arroja `AuthzAssertionError` con el código `AUTHZ_NOT_INITIALIZED` si se omitió el middleware (útil para detectar regresiones de configuración en las pruebas).

## Véase también

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticación por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registro de auditoría de eventos de autenticación
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tres espacios de nombres de ámbitos y catálogo de ámbitos de herramientas MCP
- Código fuente: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
