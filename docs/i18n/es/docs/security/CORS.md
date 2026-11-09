# CORS Configuration & Security (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controla qué **orígenes del navegador** puede leer respuestas de distintos orígenes desde una única lista de permitidos centralizada. El modelo es **cerrado por falla por defecto** : no se permite ningún origen hasta que usted opte por uno. Esta página documenta cómo se resuelve la lista de permitidos, qué expone realmente `CORS_ALLOW_ALL=true` (y, lo que es más importante, qué hace).**no** ), cómo configurar desarrollo versus producción de forma segura y la advertencia de tiempo de ejecución que el panel muestra cuando hay un comodín activo.

**Fuente de la verdad:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). La lista de permitidos se aplica una vez; en el middleware (`src/server/authz/pipeline.ts`), los controladores — por ruta no configuran `Access-Control-Allow-Origin` por sí mismos.

## Cómo se resuelve un origen

Para cada solicitud, el middleware calcula el valor `Access-Control-Allow-Origin` en este orden:

1. **`CORS_ALLOW_ALL=true`** (o el `CORS_ORIGIN=*` heredado) → repite el `Origin` de la persona que llama (o `*` cuando no hay un encabezado `Origin` ), con `Vary: Origin` para que los cachés se mantengan correctos. El mismo punto de estrangulamiento `applyCorsHeaders()` también agrega `Vary: Accept-Encoding` a cada respuesta 2xx con cuerpo en la superficie `/v1*`/`/v1beta*` autenticada mediante token (`relaxForTokenAuth`, RFC 9110 §12.5.5, problema #6737), por lo que los cachés downstream/shared pueden distinguir correctamente las variantes comprimidas y sin comprimir.
2. De lo contrario, la solicitud `Origin` se normaliza (en minúsculas, sin barra diagonal) y se compara con la **lista de permitidos fusionada** :
   - ambiente **`CORS_ALLOWED_ORIGINS`** Lista — separada por comas, y
   - el tiempo de ejecución **`corsOrigins`** configuración (Dashboard → Security → _CORS Allowed Origins_), inyectada a través de `setRuntimeAllowedOrigins()` desde `src/lib/config/runtimeSettings.ts`.
3. No hay coincidencia →**no se emite ningún encabezado `Access-Control-Allow-Origin`** . El navegador bloquea la lectura entre orígenes. Este es el valor predeterminado de cierre fallido previsto.

| var.env                | Significado                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de orígenes exactos para permitir (recomendado).                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → repite cualquier origen (comodín). Solo desarrollador.                               |
| `CORS_ORIGIN`          | Legado. `*` se comporta como `CORS_ALLOW_ALL`; se agrega un único valor a la lista de permitidos. |

## El modelo de amenaza — lo que realmente expone `CORS_ALLOW_ALL=true`

Vale la pena tomar en serio la advertencia genérica OWASP ("comodín CORS = cualquier sitio puede llamar a su API"), pero la exposición de OmniRoute es **más estrecho que el caso genérico** , debido a un hecho de implementación concreto:

> **La central `applyCorsHeaders()` nunca emite `Access-Control-Allow-Credentials`.** Un navegador no expondrá una respuesta de origen cruzado _credentialed_ (que contiene cookies) a menos que el servidor envíe `Access-Control-Allow-Credentials: true`. La ruta CORS compartida de OmniRoute nunca lo hace.

Qué significa eso por superficie, incluso con `CORS_ALLOW_ALL=true`:

| Superficie                                | Mecanismo de autenticación       | Efecto del comodín CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel de control / MANAGEMENT `/api/*`    | Sesión de cookies                | Se repite el origen, pero **sin `Allow-Credentials`** el navegador **bloques** la lectura acreditada. Un sitio malicioso de origen cruzado **no puedo leer** sus respuestas autenticadas del panel y la cookie de sesión no está expuesta.                                                                                                                                                                                                                                                                                                                     |
| Cliente API `/v1/*`, `/v1beta/*`          | Encabezado portador/ `x-api-key` | ya permisivo **a propósito** (`relaxForTokenAuth`): los navegadores nunca adjuntan automáticamente `Authorization`/`x-api-key`, por lo que la página de un atacante no puede proporcionar su clave. El eco relajado requiere un asunto autenticado (una clave API validada o una sesión del panel), no solo un encabezado de credencial, y nunca incluye `Access-Control-Allow-Credentials`. Las respuestas anónimas (`REQUIRE_API_KEY=false`) utilizan la lista de permitidos de origen configurada, incluida una aceptación explícita `CORS_ALLOW_ALL=true`. |
| Público de solo lectura (`/api/health`,…) | Ninguno                          | No sensible; el comodín es inofensivo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

Entonces el **residual** la exposición de `CORS_ALLOW_ALL=true` se limita a: (a) países de origen cruzado no acreditados **lee** de datos ya no autenticados, y (b) permitir que CORS**pase de verificación previa** en rutas de administración — que aún requieren autenticación que una página de origen cruzado no puede proporcionar. Es **no** un vector de secuestro de sesión o robo de credenciales en la ruta CORS compartida.

### Una verdadera excepción — `/api/v1/agents/`

Las rutas Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) establecen sus **propio** Cabeceras CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) y **hacer** emite `Access-Control-Allow-Origin: <origin>|*` junto con `Access-Control-Allow-Credentials: true`. Ésta es la única superficie donde coexisten origen-eco y credenciales, y es **independiente de `CORS_ALLOW_ALL`** . Estas rutas están autenticadas por la administración (`requireManagementAuth`); Los operadores que exponen el panel fuera del host deben tener en cuenta que este es el único lugar donde los encabezados de respuesta permiten una lectura con credenciales de origen cruzado. Ajustarlo a una lista de permitidos explícitos se rastrea por separado de esta guía CORS.

## Lista de verificación de producción

- **Nunca ponga `CORS_ALLOW_ALL=true` en producción.** Déjalo sin configurar.
- Establecer un **explícito** lista de origen — ya sea la var env o el campo de la pestaña Seguridad:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Si OmniRoute se ejecuta detrás de un túnel/proxy inverso (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS es **no** su único control — la protección de ruta de bucle invertido aún protege las rutas con capacidad de generación (consulte [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). No falsifique `X-Forwarded-For: 127.0.0.1` para "arreglar" un 403; que vuelve a abrir la clase RCE y cierra la guardia de ruta.
- Confirme el estado del tiempo de ejecución: el panel muestra un **bandera ámbar persistente** en el Panel de control → Security → Authorization Inventory cada vez que `CORS_ALLOW_ALL=true` está activo y `/api/settings/authz-inventory` devuelve un sobre `cors: { allowAll, allowedOrigins }` que las herramientas de monitoreo pueden sondear.

## Conveniencia de desarrollo — permite orígenes locales específicos

Rara vez necesitas el comodín, incluso en desarrollo. Permita solo los servidores de desarrollo que utiliza:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Los orígenes no distinguen entre mayúsculas y minúsculas y se ignora la barra diagonal, por lo que `http://localhost:3000` y `http://localhost:3000/` son equivalentes. El mismo CSV se puede configurar en tiempo de ejecución en **Panel de control → Seguridad → CORS Orígenes permitidos** sin reiniciar.

## Claves API frente a sesiones de cookies

- **Portador/ `x-api-key` (la superficie de inferencia `/v1/*` ):** Los navegadores nunca los adjuntan automáticamente. CORS no es una barrera significativa aquí — la clave API es la barrera —, por lo que esa superficie es intencionalmente permisiva para que el navegador y los clientes Electron puedan leer las respuestas a las que ya tienen derecho. El eco relajado requiere un asunto autenticado (una clave API validada o una sesión de panel), no solo un encabezado de credencial, y nunca incluye `Access-Control-Allow-Credentials`. Las respuestas anónimas (`REQUIRE_API_KEY=false`) utilizan la lista de permitidos de origen configurada, incluida una aceptación explícita `CORS_ALLOW_ALL=true`. Los rechazos de autenticación (401) permanecen legibles para que los clientes puedan mostrar una clave revocada o mal escrita (#5242): el propio 401 de la tubería mantiene el eco, y una ruta que rechaza la clave en sí después de que la tubería la entregó como anónima (`/v1/models` y `/v1beta/models` con autenticación de administración configurada, las rutas candidatas `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` y de combinación automática con alcance del propietario) agrega el eco a ese 401 a través de `credentialRejectionHeaders()`. El eco se codifica en la solicitud que lleva un encabezado de credencial (`Authorization`, `x-api-key`, `x-goog-api-key` o la cookie `auth_token` ), no en cuál de ellas se verificó la ruta, y nunca se empareja con `Access-Control-Allow-Credentials`; el cuerpo es un sobre de error fijo. Las rutas de administración bajo `/api/v1/` custodiadas por `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) no utilizan esta excepción de rechazo de credenciales: con `REQUIRE_API_KEY=false`, sus respuestas 401/403 siguen la política de origen CORS configurada.
- **Sesión de cookies (el panel de control):** protegido por el valor predeterminado de cierre fallido **y** por la ausencia de `Access-Control-Allow-Credentials` en el camino compartido. Mantenga los orígenes management/dashboard fuera de cualquier configuración permisiva; deben permanecer exactamente cerrados a prueba de fallos.

## Apretones de manos WebSocket (`/v1/responses`, `/v1/ws`)

Los navegadores no aplican CORS a WebSocket, por lo que los transportes WebSocket que devuelven la salida de inferencia verifican el protocolo de enlace `Origin` (`src/server/origin/wsOrigin.ts`): las respuestas WebSocket (`/v1/responses`) y, cuando OmniRoute se ejecuta a través de `npm start` / `npm run dev`, el puente `/v1/ws` y `/api/v1/ws`, que transmite `/v1/chat/completions`, `/v1/messages` y `/v1/responses` como marcos. El puente solicita el veredicto `/api/v1/ws?handshake=1` y se niega a actualizar a menos que esa ruta haya pasado la verificación. Los requisitos de autenticación aún se aplican por separado. La verificación de origen pasa cuando:

- no tiene encabezado `Origin` (Codex CLI, SDKs y otros clientes que no son de navegador);
- la `Origin` es admitida por la lista de permitidos anterior (`CORS_ALLOWED_ORIGINS`, la configuración `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- el `Origin` es uno de los propios orígenes públicos del OmniRoute(la base pública configurada URL, el origen reenviado de un proxy confiable o un host loopback/LAN directo dado como un literal IP o `localhost` — los mismos candidatos que utiliza la verificación de mutaciones del tablero); o
- lleva una clave API válida, como en la superficie HTTP `/v1/*`.

Todo lo demás recibe `403 ws_origin_forbidden`. Una cookie de sesión del panel no exime a una `Origin` externa, porque el navegador la adjunta al socket de cualquier página. `localhost` en otro puerto no se trata como del mismo origen; agregue dichos orígenes de desarrollo a `CORS_ALLOWED_ORIGINS`.

## Ejemplo: proxy inverso frente a OmniRoute

La propia OmniRoute aplica CORS, por lo que el proxy generalmente debería **no** agregue o reescriba encabezados `Access-Control-*` (los encabezados dobles interrumpen los navegadores). Termine TLS y reenvíe — para que OmniRoute responda la verificación previa:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Configure los orígenes del navegador permitidos en OmniRoute (`CORS_ALLOWED_ORIGINS` o la pestaña Seguridad), no en el proxy.

## Archivos fuente

| Inquietud                                                   | Archivo                                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Resolución de lista blanca + `getCorsStatus()`              | `src/server/cors/origins.ts`                                         |
| Aplicación de middleware (única fuente de verdad)           | `src/server/authz/pipeline.ts`                                       |
| Configuración Inyección de origen del tiempo de ejecución → | `src/lib/config/runtimeSettings.ts`                                  |
| Estado de tiempo de ejecución del panel                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner de advertencia del panel                             | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo Orígenes permitidos CORS                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS por ruta del agente de nube (la excepción)             | `src/lib/cloudAgent/api.ts`                                          |
| Apretón de manos WebSocket Comprobación `Origin`            | `src/server/origin/wsOrigin.ts`                                      |

## Ver también

- [Niveles de Route Guard](./ROUTE_GUARD_TIERS.md) Aplicación de loopback — para rutas con capacidad de generación (un control independiente y complementario).
- [Guía de autorización](../architecture/AUTHZ_GUIDE.md) — el proceso de autenticación completo.
