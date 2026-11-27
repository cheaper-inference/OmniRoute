# OmniRoute Plugin SDK (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Inicio rápido

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## Referencia API

### `definePlugin(def: PluginDefinition): Plugin`

Función de fábrica que crea un objeto Plugin con valores predeterminados.

**Parámetros:**

- `name` (cadena, requerida) — Nombre del complemento en kebab-case
- `priority` (número, opcional, predeterminado: 100) — La parte inferior se ejecuta primero
- `enabled` (booleano, opcional, predeterminado: verdadero) — Inicio habilitado?
- `onRequest` (función, opcional) — Se ejecuta antes del controlador de chat
- `onResponse` (función, opcional) — Se ejecuta después del controlador de chat
- `onError` (función, opcional) — Se ejecuta en caso de error del controlador

### `blockRequest(response?): BlockingHookResult`

Bloquee la solicitud y, opcionalmente, devuelva una respuesta personalizada.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Modifique el cuerpo de la solicitud antes de que llegue al proveedor.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Adjunte metadatos al contexto de la solicitud.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Contexto del complemento (`PluginContext`)

| Campo        | Tipo                      | Descripción                      |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | Identificador de solicitud único |
| `model`      | `string`                  | Nombre del modelo solicitado     |
| `provider`   | `string`                  | Proveedor de destino ID          |
| `body`       | `Record<string, unknown>` | Cuerpo de la solicitud           |
| `headers`    | `Record<string, string>`  | Solicitar encabezados (ver nota) |
| `metadata`   | `Record<string, unknown>` | Metadatos mutables               |
| `timestamp`  | `number`                  | Solicitar marca de tiempo        |
| `apiKeyInfo` | `object` (opcional)       | Metadatos clave API (ver nota)   |

El contexto nunca lleva las credenciales del cliente: los encabezados `authorization`, `x-api-key`, `proxy-authorization` y `cookie` se eliminan (cualquier mayúscula), y `apiKeyInfo` conserva los metadatos de la clave (como `id`, `name` y `scopes`) pero no el valor de la clave ni su huella digital (`redactPluginContext()` en `src/lib/plugins/hooks.ts`). Esto se aplica a `onRequest`, `onResponse` y `onError`.

## Manifiesto (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Prioridad de los hooks

Los hooks pueden configurarse con una prioridad (un valor más bajo significa que se ejecutan primero):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

O como valores booleanos simples (prioridad predeterminada: 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistema de permisos

Los complementos son** no en la zona de pruebas** . Cada complemento activo se ejecuta como un proceso secundario Node.js ordinario e independiente (`loadPlugin()` en `src/lib/plugins/loader.ts`) bajo el mismo usuario del sistema operativo que OmniRoute, sin contexto VM ni indicadores de permiso Node.js. El código de complemento puede usar `node:fs`, `node:child_process`, `fetch` y cualquier otro Node.js API: puede leer y escribir cualquier archivo que el usuario OmniRoute pueda (incluido el directorio de datos), ejecutar programas y acceder a la red.

El `requires.permissions` del manifiesto acepta `network`, `file-read`, `file-write`, `env` y `exec`, pero hoy en día solo `env` tiene efecto en tiempo de ejecución:

| Permiso                                      | Efecto hoy                                                                                                                                                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | El proceso del complemento también recibe `PORT`, `HOSTNAME`, `TZ` y `TMPDIR`. Sin él, recibe solo `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` y `PLUGIN_NAME` (más `SystemRoot` y `windir` en Windows). |
| `network`, `file-read`, `file-write`, `exec` | Ninguno. Son sólo declaraciones: no se bloquea nada cuando faltan.                                                                                                                                                                |

Instalar un complemento es como instalar cualquier otro programa en el host. Instale solo complementos cuya fuente confíe.

## Esquema de configuración

Define los ajustes configurables en `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Clave de API externa" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Tipos de campo: `string`, `number`, `boolean`, `select`

Opciones de campo: `default`, `min`, `max`, `enum`, `description`

Los valores de configuración se conservan en la base de datos y se puede acceder a ellos desde la página de configuración del panel.

## Eventos integrados

| Evento            | Cuándo                                                          | Carga útil                    |
| ----------------- | --------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Antes del controlador del chat                                  | Contexto de la solicitud      |
| `onResponse`      | Después del controlador del chat                                | Datos de la respuesta         |
| `onError`         | Cuando se produce un error en el controlador                    | Objeto de error               |
| `onModelSelect`   | Cuando se selecciona un modelo para el enrutamiento             | Información del modelo        |
| `onComboResolve`  | Cuando se resuelve el enrutamiento combinado                    | Destinos de la combinación    |
| `onRateLimit`     | Cuando se alcanza el límite de solicitudes                      | Información del límite        |
| `onQuotaExhaust`  | Cuando se agota la cuota                                        | Información de la cuota       |
| `onProviderError` | Cuando el proveedor devuelve un error                           | Detalles del error            |
| `onStreamStart`   | Cuando se inicia el flujo SSE                                   | Información del flujo         |
| `onStreamEnd`     | Cuando finaliza el flujo SSE                                    | Estadísticas del flujo        |
| `onInstall`       | Cuando se instala el plugin                                     | `{ name, version, manifest }` |
| `onActivate`      | Cuando se activa el plugin                                      | `{ name, version, manifest }` |
| `onDeactivate`    | Cuando se desactiva el plugin                                   | `{ name, version, manifest }` |
| `onUninstall`     | Cuando se desinstala el plugin (antes de eliminar los archivos) | `{ name, version, manifest }` |

## Ejemplos

### Solicitar registrador

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitador de velocidad

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### Transformador de respuesta

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
