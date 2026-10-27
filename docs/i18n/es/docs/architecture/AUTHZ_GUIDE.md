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

Se valida mediante `isValidApiKey()` / `extractApiKey()` en `src/sse/services/auth.ts` y se vuelve a exportar a través de `src/shared/utils/apiAuth.ts`. El validador también acepta las variables de entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como claves persistentes de paso directo (incidencia #1350).

### 2. Sesión del panel (cookie auth_token)

Para las páginas del panel y las operaciones de administración.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Una cookie solo es una sesión cuando el JWT se verifica **y** contiene `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todos los
consumidores de la cookie (protección de rutas del panel (`isDashboardSessionAuthenticated()`), actualización de la canalización de autorización, negociación de WebSocket, servidor
en vivo, `/api/settings/require-login`, `/api/auth/status`) pasan por ese helper.
Existen otros JWT firmados con `JWT_SECRET`: el paso directo de la CLI de Cursor genera
tokens `iss "omniroute" / aud "cursor-cli"` para los titulares de claves, y nunca son sesiones
(#13298).

Se verifica mediante `isDashboardSessionAuthenticated()` en `src/shared/utils/apiAuth.ts`. La canalización actualiza automáticamente el JWT cuando le quedan menos de 7 días de sus 30 días de vigencia.

Una sesión también puede finalizar antes de que transcurran sus 30 días, porque todos los emisores pasan por `mintDashboardSessionToken` (una hora de emisión `iat` y un identificador `jti`) y el verificador comprueba dos ajustes: `sessionsValidAfter`, que se establece al cambiar la contraseña para que dejen de verificarse todas las sesiones emitidas anteriormente (el navegador que cambió la contraseña recibe una cookie nueva), y `revokedDashboardSessions`, al que `POST /api/auth/logout` añade el `jti` de la sesión cerrada. Las sesiones emitidas por una versión anterior no contienen ninguna de estas declaraciones y siguen siendo válidas hasta el primer cambio de contraseña. Si no se pueden leer los ajustes, la sesión no se considera de confianza.

Algunas rutas de administración aceptan **cualquiera** de los dos modos: cookie O `Bearer <key>` cuando la clave de API tiene el ámbito `manage` (o `admin`). Esto es lo que habilita el flujo de trabajo «configurable mediante llamadas a la API» añadido en v3.8.

#### Control de inicio de sesión OIDC opcional (#6973)

El inicio de sesión de administrador del panel también admite un flujo OIDC (OpenID Connect) **opcional**
junto con el inicio de sesión predeterminado mediante contraseña; el inicio de sesión mediante contraseña nunca se elimina, solo
se complementa:

- Deshabilitado a menos que `settings.oidcEnabled === true` **y** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estén todos configurados (Configuración → Autenticación).
  De lo contrario, `GET /api/auth/oidc/login` devuelve `400`.
- `GET /api/auth/oidc/login` obtiene el `authorization_endpoint` desde la
  configuración `/.well-known/openid-configuration` del emisor (con
  `<issuer>/authorize` como alternativa), construye el URI de redirección a partir de la solicitud
  entrante (teniendo en cuenta `x-forwarded-proto`) y redirige al IdP con un `state`
  aleatorio almacenado en una cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` valida `state`, intercambia el código de autorización
  y verifica la firma del token de ID mediante el JWKS del emisor
  (`createRemoteJWKSet` de `jose`, almacenado en caché por cada URI de JWKS), con comprobaciones de
  `issuer`/`audience`. La admisión al panel requiere una lista `oidcAllowedSubjects`
  no vacía, una política `oidcAdmissionClaim` o ambas. La lista de sujetos compara
  `sub` o `email` solo cuando `email_verified === true`. La política opcional de claims
  acepta una ruta de claim del token de ID separada por puntos (por ejemplo,
  `realm_access.roles`) y un array de valores aceptados; el claim resuelto debe ser
  un array de cadenas que contenga al menos un valor aceptado. Si se configuran
  ambas políticas, ambas deben cumplirse. Los claims ausentes o mal formados provocan
  una denegación segura y, sin ninguna de las dos políticas, el callback rechaza el
  inicio de sesión (`not_configured`). Las configuraciones existentes basadas únicamente
  en sujetos siguen funcionando sin cambios.
- Normalmente, Keycloak asigna los roles del realm a los tokens de acceso, pero no
  necesariamente a los tokens de ID. Para exigir el rol de realm `admin`, configura
  un protocol mapper para este cliente que incluya `realm_access.roles` en su
  **token de ID** y, a continuación, establece `oidcAdmissionClaim` en
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Comprueba el claim real del token de ID para este cliente antes de habilitar la
  admisión basada únicamente en roles; la aplicación no lee los roles del token de
  acceso. El rechazo de tokens por parte del IdP puede complementar esta comprobación
  en la aplicación, pero no sustituirla.
- Si tiene éxito, genera **exactamente el mismo** JWT `auth_token` de 30 días que
  emite el inicio de sesión con contraseña (`src/app/api/auth/login/route.ts`), por lo que
  el resto del flujo de sesiones del panel (actualización automática, flags de cookies)
  no cambia: OIDC solo sustituye la forma en que se genera la cookie, no los permisos
  que concede. Los cambios en los roles o grupos del IdP no invalidan las sesiones
  existentes de OmniRoute; el cierre de sesión, la rotación de contraseña o la
  expiración de la sesión siguen determinando su duración.
- Todos los ajustes `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) están incluidos en
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  responde con `400 PASSWORD_REQUIRED` a menos que el cuerpo incluya la contraseña
  de administración como `currentPassword` (`401 PASSWORD_MISMATCH` cuando es incorrecta).
  `oidcDisablePasswordLogin` impide el _inicio de sesión_ con contraseña
  (`POST /api/auth/login`), pero conserva el hash de la contraseña almacenada, y la
  reautenticación sigue comparando `currentPassword` con dicho hash.
- `corsOrigins` y `bruteForceProtection` también están incluidos en
  `SECURITY_IMPACTING_SETTINGS_KEYS`: relajar cualquiera de los dos debilita las
  defensas del inicio de sesión, por lo que requieren la misma reautenticación mediante
  `currentPassword` (la pestaña Seguridad lo solicita) y la importación JSON los
  descarta.
- Todas las claves de políticas de seguridad —las entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, todas las claves `oidc*` y el estado de sesión
  del panel— son **exclusivas del operador** en `PATCH /api/settings`: una clave de API
  con alcance `manage` o un token de acceso `oma_` se rechaza con `403`, incluso cuando
  envía el `currentPassword` correcto, y el rechazo se registra en la auditoría como
  `settings.update_failed` con `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` en `src/lib/api/operatorCredential.ts`).
  Los ajustes ordinarios (tema, preferencias de visualización) siguen pudiendo ser
  modificados por una clave `manage` o un token de acceso `admin`. Cada modificación
  del propio `/api/settings` (y de `/api/settings/require-login`) también necesita el
  alcance `admin` del token de acceso (`ADMIN_MUTATION_EXACT_PATHS` en
  `src/server/authz/accessScopes.ts`, coincidencia exacta de ruta); `GET` continúa
  requiriendo `read`, y las demás subrutas `/api/settings/*` (proxies, valores
  predeterminados de combos, alias de modelos, compresión, purgas…) conservan el
  alcance `write` inferido a partir del método.
- `POST /api/settings/import-json` omite esa reautenticación, por lo que descarta
  todas las claves incluidas en `IMPORT_STRIPPED_SETTINGS_KEYS` (el mismo archivo)
  antes de escribir: la contraseña y `currentPassword`, todas las entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS` y el estado de sesión del panel
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Por tanto, importar una copia de seguridad anterior no puede reactivar una sesión
  que ya haya finalizado debido a un cambio de contraseña o a un cierre de sesión.

## Clases de rutas

`src/server/authz/types.ts` define tres clases; cualquier ruta que no pueda clasificarse de forma determinista recurre a `MANAGEMENT`.

| Clase        | Descripción                                                                                                                                                         | Autenticación requerida                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Rutas explícitamente seguras: inicio de sesión, cierre de sesión, estado, inicialización, comprobación de salud y arranque del onboarding.                          | Ninguna                                                                      |
| `CLIENT_API` | Endpoints de servicio de modelos: `/api/v1/*`, `/api/v1beta/*`, además de los alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Clave Bearer cuando el feature flag `REQUIRE_API_KEY` efectivo está activado |
| `MANAGEMENT` | Páginas del panel, ajustes, proveedores, claves, endpoints de administración y diagnóstico.                                                                         | Sesión del panel O Bearer con el ámbito `manage`                             |

Algunas acciones de `MANAGEMENT` son **solo para operadores**: una clave `manage` no basta. Exportar credenciales almacenadas (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), restaurar una copia de seguridad sobre los datos activos (`POST /api/db-backups/import`, incluido `dryRun=true`, `POST /api/db-backups` restaurando por id, `POST /api/settings/import-json`), y eliminar puntos de restauración (la limpieza con `DELETE /api/db-backups` y `PATCH /api/db-backups`, porque la retención que guarda controla la poda automática tras cada copia de seguridad) requieren una sesión del panel, la identidad de la CLI local o el inicio de sesión desactivado. Emitir un token de sincronización (`POST /api/sync/tokens`) y acuñar un token de acceso de CLI con ámbito `admin` (`POST /api/cli/tokens`) requieren, en todos los modos de inicio de sesión, una sesión del panel o la identidad de la CLI local. Las claves de API de cualquier ámbito y los tokens de acceso `oma_` no son credenciales de operador: si se requiere una, reciben `403`. La comprobación está en `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Cambiar los ajustes de inicio de sesión también es exclusivo del operador: `POST /api/settings/require-login` (establecer la contraseña de gestión / activar o desactivar `requireLogin`) solo acepta esas credenciales una vez existe una contraseña. La ventana de arranque de la primera ejecución (sin contraseña todavía) no cambia. Una sesión del panel debe enviar `currentPassword` para reemplazar la contraseña (`403` si falta o es incorrecta, auditado como `settings.update_failed`). La CLI local y una instancia con el inicio de sesión desactivado conservan la vía de recuperación y pueden establecer una contraseña sin ese paso, ya que ambas están vinculadas al host que es propietario del directorio de datos.

## Canalización

```
Solicitud entrante → src/proxy.ts
  → runAuthzPipeline() en src/server/authz/pipeline.ts
    1. Eliminar encabezados internos de confianza (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generar el id de la solicitud y clasificar la ruta mediante classifyRoute()
    3. Si pathname == "/" → redirigir a /dashboard
    4. Si está en proceso de cierre (cierre ordenado) y la ruta es /api/* → 503
    5. Si no es GET y la ruta es /api/* → aplicar la protección checkBodySize()
    6. Si es OPTIONS → respuesta de verificación previa CORS 204
    7. Si options.enforce == false → continuar sin cambios con los encabezados de clase de ruta
    8. En caso contrario: POLICIES[routeClass].evaluate(ctx)
       - permitir  → establecer x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rechazar → error JSON con correlation_id (páginas del panel → 302 /login)
```

Los encabezados internos de confianza (definidos en `src/server/authz/headers.ts`) se **eliminan de las solicitudes entrantes** antes de la clasificación; los clientes no pueden rellenar previamente `x-omniroute-auth-*` para suplantar a un sujeto.

### Contratos de políticas

Cada clase de ruta tiene una política en `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — siempre devuelve `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrae Bearer y lo valida mediante `validateApiKey()`. Solo recurre al acceso anónimo cuando la marca de funcionalidad efectiva `REQUIRE_API_KEY` está deshabilitada. La marca efectiva se resuelve mediante `isRequireApiKeyEnabled()` (`anulación de la marca de funcionalidad de la base de datos > process.env.REQUIRE_API_KEY > valor predeterminado`), de modo que las marcas de funcionalidad del panel y las variables de entorno rijan de forma coherente `/api/v1/*`, `/api/v1beta/*` y los alias; los fallos del resolutor deniegan el acceso. Permite solicitudes con sesión del panel en las rutas de la API de cliente (incluida `/api/v1/models`, utilizada por el catálogo de modelos del panel).
- **`managementPolicy`** (`policies/management.ts`) — acepta sesiones del panel y solicitudes internas de sincronización de modelos (comparadas con `/api/providers/[name]/(sync-models|models)`), o se omite por completo si `isAuthRequired()` devuelve false. Devuelve 403 (`AUTH_001`) cuando hay un token Bearer presente pero no es válido y 401 en caso contrario. También aplica los niveles de protección de rutas (LOCAL_ONLY / ALWAYS_PROTECTED) antes de cualquier rama de autenticación; consulte [Niveles de protección de rutas](../security/ROUTE_GUARD_TIERS.md). Se puede acceder a las rutas LOCAL_ONLY incluidas en `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (actualmente: `/api/mcp/`) desde direcciones que no sean de loopback cuando la clave Bearer contiene el ámbito `manage`; todas las demás rutas LOCAL_ONLY siguen limitadas estrictamente a loopback, independientemente del ámbito.

Una política correcta devuelve `AuthSubject` con `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Los controladores posteriores pueden leerlo mediante `assertAuth(request, "CLIENT_API")` en `src/server/authz/assertAuth.ts`, en lugar de volver a ejecutar la lógica de autenticación.

## Lista de rutas públicas

`src/shared/constants/publicApiRoutes.ts` es la lista de permitidos explícita:

La lista está dividida por **forma**, y esta división es crítica (GHSA-74g9-q8f6-793h): un prefijo se compara con `startsWith()`, por lo que también coincide con todas las rutas adyacentes que comparten sus caracteres iniciales. Usar `/api/usage/om-usage` como prefijo marcaba `/api/usage/om-usage<anything>` como PUBLIC, y Next resolvía esto como `/api/usage/[connectionId]`, un controlador sin autenticación propia.

```ts
// Subárboles auténticos. Cada entrada DEBE terminar en "/" (verificado mediante una prueba unitaria).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // se trata como CLIENT_API en classify, no como pública "sin autenticación"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rutas individuales, comparadas de forma EXACTA (con o sin una barra final).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rutas individuales de solo lectura que también reciben la flexibilización del origen CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Ruta individual de solo lectura SIN la flexibilización de CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Las rutas de solo lectura son públicas **únicamente** para métodos seguros. Nota: `classifyRoute()` excluye `/api/v1/*` y `/api/v1beta/*` de la alternativa PUBLIC; estas rutas siempre son `CLIENT_API`, por lo que se sigue aplicando la política de claves Bearer.

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

`isAuthRequired()` en `src/shared/utils/apiAuth.ts` decide si se aplica **cualquier** autenticación a una solicitud:

- `settings.requireLogin === false` → la autenticación está desactivada globalmente, salvo para el nivel siempre protegido (ver [Niveles de Route Guard](../security/ROUTE_GUARD_TIERS.md)) y para las llamadas que entregan una credencial que este acepta; estas necesitan la misma credencial que con el inicio de sesión activado: emitir tokens de sincronización, acuñar tokens de acceso de CLI con cualquier ámbito, y crear una clave de API con el ámbito `manage`/`admin`, conceder ese ámbito a una clave, o regenerar o revelar una clave así (`requireCredentialForManagementScopedKey()` en `src/lib/api/requireManagementAuth.ts`). Las claves solo de inferencia siguen abiertas.
- No hay contraseña configurada **y** no existe la variable de entorno `INITIAL_PASSWORD` → el modo de arranque permite el asistente de onboarding y las solicitudes de loopback, pero las solicitudes de red expuestas siguen necesitando credenciales.
- Cualquier error de base de datos → falla en modo cerrado (seguro por defecto).

La aplicación de claves de API de cliente usa `isRequireApiKeyEnabled()` en `src/shared/utils/featureFlags.ts`, no una lectura directa de `process.env.REQUIRE_API_KEY`. Esto importa en instancias desplegadas: al activar o desactivar `REQUIRE_API_KEY` en Dashboard → Feature Flags se guarda una sobrescritura en la base de datos y afecta de inmediato a `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` y a otras comprobaciones de autenticación de la API de cliente que comparten este helper. Si el almacén de feature flags no puede leerse, la autenticación de la API de cliente falla en modo cerrado y exige una clave.

## Cambio incompatible — v3.8.0

Los endpoints `/api/v1/agents/tasks/*` y `/api/resilience/model-cooldowns` **ahora requieren autenticación de gestión** (commit `588a0333`). Los clientes que anteriormente enviaban una clave de API normal sin el ámbito `manage` reciben `403`. Migración: asigne el ámbito `manage` a la clave en el panel API Keys o utilice una sesión iniciada en el panel.

## Cambio de comportamiento — v3.8.2

`/api/mcp/*` (el servidor MCP remoto) sigue siendo LOCAL_ONLY de forma predeterminada, pero ahora acepta solicitudes que no sean de loopback cuando el encabezado `Authorization: Bearer <api-key>` incluye el ámbito `manage`. La excepción se habilita explícitamente para cada ruta mediante `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` en `src/server/authz/routeGuard.ts`; el prefijo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` intencionadamente NO permite esta excepción porque puede generar subprocesos arbitrarios. Las solicitudes anónimas a `/api/mcp/*` que no sean de loopback siguen devolviendo `403 LOCAL_ONLY`; el comportamiento predeterminado de cualquier ruta LOCAL_ONLY nueva continúa siendo estrictamente de loopback. Consulte [Niveles de protección de rutas](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pruebas

- Pruebas unitarias: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permitidos pública: `tests/unit/public-api-routes.test.ts`.
- Ejecución específica: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuración

El pipeline siempre añade los siguientes encabezados a las respuestas:

```
x-request-id:               <id de correlación, repetido en los cuerpos de error>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para las solicitudes autenticadas, los encabezados de solicitud del upstream (del lado del controlador) también incluyen:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<últimos-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcional)
x-omniroute-auth-scopes:    lista separada por comas
```

Usa `assertAuth(req, expectedClass)` dentro de los controladores; lanza `AuthzAssertionError` con el código `AUTHZ_NOT_INITIALIZED` si se omitió el middleware (útil para detectar regresiones de configuración en las pruebas).

## Véase también

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticación por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registro de auditoría de eventos de autenticación
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tres espacios de nombres de ámbitos y catálogo de ámbitos de herramientas MCP
- Código fuente: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
