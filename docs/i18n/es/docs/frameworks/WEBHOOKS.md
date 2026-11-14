# Webhooks (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fuente de referencia:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute puede activar webhooks HTTP en respuesta a eventos de la plataforma. Úselos para integrarse con
Slack, PagerDuty, Datadog, servicios internos de alertas o cualquier receptor HTTP.

El despachador firma cada entrega con HMAC-SHA256, reintenta ante fallos
transitorios, supervisa el estado de las entregas de cada webhook y deshabilita automáticamente los endpoints que
siguen fallando.

## Eventos admitidos

El tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consumido por `src/lib/webhookDispatcher.ts`) actualmente modela ocho eventos:

| Evento                    | Se dispara cuando                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Una solicitud de proxy se completa con éxito                                                                         |
| `request.failed`          | Una solicitud de proxy falla después de todo retries/fallback                                                        |
| `quota.exceeded`          | Una clave API cruza un umbral budget/quota                                                                           |
| `proxy.set_aside`         | Un miembro del grupo de proxy se aparta después de repetidos rechazos (solo transición)                              |
| `proxy.pool.exhausted`    | Cada miembro del alcance de un grupo de proxy se reserva                                                             |
| `provider.reset_redeemed` | La aplicación automática de reinicios bancarios canjeó un crédito de reinicio o el reinicio de sesión semanal Claude |
| `provider.exhausted`      | Cada cuenta de un proveedor se está enfriando (como máximo una vez por proveedor cada 10 minutos)                    |
| `test.ping`               | Evento sintético utilizado por el punto final de la prueba                                                           |

Las suscripciones aceptan el literal `"*"` para recibir cada evento. Los nombres de eventos desconocidos en `events` se ignoran en el momento del envío.

> Nota: el despachador API está conectado, pero los sitios de llamadas de producción para algunos de los eventos que no son `test.ping` aún están llegando. Verifique `grep dispatchEvent` para ver qué rutas invocan actualmente al despachador en su versión.

## Arquitectura

```
Invocador (controlador, servicio, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrar por webhook.events
    -> para cada coincidencia (en paralelo):
       deliverWebhook(url, payload, secret)
         crear la carga útil { event, timestamp, data }
         firmar el cuerpo con HMAC-SHA256 (si hay un secreto)
         POST con un tiempo de espera de 10 s
         reintentar hasta 3 veces ante errores 5xx/de red
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

El despacho no bloquea ni espera resultados para el invocador: `Promise.allSettled` absorbe los
errores de cada webhook, de modo que un receptor defectuoso no pueda bloquear a los demás.

## Firma HMAC

Cuando un webhook tiene un `secret`, OmniRoute firma el cuerpo JSON y envía:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Los nombres de las cabeceras utilizan el prefijo `X-Webhook-*` (no `X-OmniRoute-*`). El valor de la firma
> es `sha256=<hex>`; verifique el prefijo completo.

Si se llama a `createWebhook` sin un secreto, el módulo de la base de datos genera uno
(`whsec_<48 hex>`), por lo que todos los webhooks se firman de forma predeterminada.

### Verificación en el receptor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifique siempre la firma con respecto al cuerpo **sin procesar** de la solicitud, antes de cualquier análisis de JSON.

## Política de reintentos y fallos

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tiempo de espera de 10 segundos por intento (`AbortController`).
- Una respuesta HTTP 2xx se considera un éxito.
- Una respuesta HTTP 3xx/4xx se considera un estado final no reintentable — se registra como entregada
  con `success = res.ok`.
- Las respuestas HTTP 5xx y los errores de red se reintentan con retroceso exponencial:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Después de `maxRetries`, la entrega se registra como fallida.
- Cada entrega actualiza `last_triggered_at`, `last_status` y restablece
  o incrementa `failure_count`.
- El despachador llama a `disableWebhooksWithHighFailures(10)` después de cada distribución,
  por lo que cualquier webhook con `failure_count >= 10` se deshabilita automáticamente.

## Base de datos

Tabla `webhooks` (migración `011_webhooks.sql`):

| Columna             | Tipo    | Notas                                                        |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | URL de destino                                               |
| `events`            | TEXT    | Matriz JSON; valor predeterminado `["*"]`                    |
| `secret`            | TEXT    | Secreto HMAC (generado automáticamente si no se proporciona) |
| `enabled`           | INT     | 0/1; valor predeterminado 1                                  |
| `description`       | TEXT    | Etiqueta legible opcional                                    |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Se actualiza en cada intento de entrega                      |
| `last_status`       | INT     | Estado HTTP del último intento (0 = red)                     |
| `failure_count`     | INT     | Se restablece a 0 en caso de éxito, +1 en caso de fallo      |

El historial de entregas se conserva en la tabla específica `webhook_deliveries`
(migración `069_webhook_deliveries.sql`, escrito mediante
`src/lib/db/webhookDeliveries.ts::insertDelivery` en cada intento), además
de los contadores agregados en la fila de `webhooks`. Los metadatos de tipo (Slack / Discord /
Telegram / transformadores de carga útil personalizados) se añadieron mediante `070_webhooks_kind_metadata.sql`.

## REST API

Todos los puntos finales requieren autenticación de administración (`requireManagementAuth`).

| Punto final                     | Método | Descripción                                    |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Listar webhooks (secretos enmascarados)        |
| `/api/webhooks`                 | POST   | Crear webhook                                  |
| `/api/webhooks/[id]`            | GET    | Detalle del webhook (secreto completo)         |
| `/api/webhooks/[id]`            | PUT    | Actualizar campos                              |
| `/api/webhooks/[id]`            | DELETE | Eliminar                                       |
| `/api/webhooks/[id]/test`       | POST   | Dispara un `test.ping` (sin reintentos)        |
| `/api/webhooks/[id]/deliveries` | GET    | Intentos de entrega recientes para un webhook  |
| `/api/webhooks/validate-url`    | POST   | Validación URL previa al vuelo (guardia SSRF ) |

`GET /api/webhooks` enmascara el secreto de `<first 10 chars>...` para evitar filtraciones en las páginas de listado. Utilice `[id]` GET cuando realmente necesite el secreto.

### Crear webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Si se omite `secret`, el servidor genera un secreto `whsec_<hex>` y lo devuelve en la respuesta.

### Webhook de prueba

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Devuelve `{ delivered, status, error }`. No se intentan reintentos. — es útil para validar rápidamente que el receptor acepta la carga útil y la firma.

## Panel de control

La página del panel de control en `/dashboard/webhooks` (consulte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) permite:

- Crear/editar webhooks con un selector de eventos
- Indicador de estado (activo / inactivo / con errores) basado en `enabled`,
  `failure_count` y `last_status`
- Entrega de prueba con un solo clic
- Activación/desactivación manual

## Ejemplos de carga útil

### solicitud.completada

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### prueba.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Las formas de los campos para eventos que no son `test.ping` están definidas por los sitios de llamada que los emiten; trate el objeto `data` como compatible con versiones posteriores (agregue campos, no dependa de la ausencia).

## Prácticas recomendadas

- **Verifique la firma en cada entrega** comparándola con el cuerpo sin procesar; esto evita
  solicitudes POST falsificadas de cualquiera que adivine la URL de su webhook.
- **Responda con un código 2xx en un plazo de ~5 segundos**; el tiempo de espera del despachador se agota a los 10 s. Los receptores
  lentos consumirán reintentos e incrementarán `failure_count`.
- **Haga que los controladores sean idempotentes**; los reintentos y la semántica de entrega
  de al menos una vez implican que puede haber duplicados.
- **Suscríbase de forma selectiva**; incluya solo los eventos que realmente consume; `"*"`
  añadirá costes en receptores que no controla.
- **Supervise `failure_count`**; los endpoints se desactivan automáticamente tras 10 fallos
  consecutivos; restablézcalos llamando a `PUT /api/webhooks/[id]` con `enabled: true`
  después de corregir el receptor.
- **Rote los secretos periódicamente**; envíe mediante `PUT` un nuevo `secret`, despliegue el nuevo valor
  en el receptor y confírmelo mediante el endpoint de prueba.

## Véase también

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — referencia completa de la API de administración
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semántica del disyuntor / período de espera
  utilizada para los fallos de proveedores expuestos mediante `request.failed`
- Código fuente: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
