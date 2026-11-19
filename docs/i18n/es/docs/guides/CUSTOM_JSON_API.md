# Custom JSON API provider nodes (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Un nodo JSON API personalizado conecta un punto final empresarial JSON que no habla el protocolo OpenAI o Anthropic. OmniRoute llena una plantilla de solicitud JSON, la envía al punto final completo URL, lee la respuesta de una ruta de respuesta y la devuelve al cliente en el formato propio del cliente (finalizaciones de chat, respuestas, mensajes, ...).

Es un nodo compatible con OpenAI con `apiType: "custom-json"`; su identificación tiene la forma `openai-compatible-custom-json-<suffix>`. El formulario del panel aún no está disponible. Cree y edite estos nodos a través del nodo de proveedor API a continuación.

## Crear un nodo

`POST /api/provider-nodes` (autenticación de gestión):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` es el** completo** punto final URL. No se agrega nada (ni `/chat/completions` ni `/models`) y, a diferencia de otros nodos compatibles con OpenAI, no hay URL predeterminado. Debe ser `http(s)`, sin credenciales integradas ni `#fragment`, y pasa la misma protección URL de salida que cada nodo proveedor, tanto cuando se guarda el nodo como en cada solicitud.
- Un nodo que envía la clave de conexión (`authType` `bearer` o `api-key`, incluida la predeterminada) debe usar `https://`. `http://` simple se acepta solo para un host loopback (`localhost`, `127.0.0.0/8`, `::1`) o con `authType: "none"`, que no envía ninguna clave. Las direcciones LAN privadas (`10.x`, `172.16-31.x`, `192.168.x`) no están exentas: cualquiera en esa red podría leer la clave. Guardar dicho nodo falla con `400` y un nodo almacenado anteriormente falla al cerrarse en cada solicitud con el mismo mensaje, antes de enviar cualquier solicitud. Para un punto final con clave en LAN, colóquelo detrás de TLS (por ejemplo, un proxy inverso).
- `customJson` se valida con Zod; Se rechazan las claves desconocidas. Cada campo es opcional:

| Campo             | Valores                                      | Por defecto                                            |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | nombre del encabezado usado cuando `api-key` | `X-API-Key`                                            |
| `requestTemplate` | Objeto JSON (≤ 64 KB, profundidad ≤ 32)      | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | camino de campo, o `$` para todo el cuerpo   | `choices[0].message.content`                           |

- El secreto permanece en la clave API de la conexión, nunca en la plantilla. `bearer` envía `Authorization: Bearer <key>`; `api-key` envía `<authHeader>: <key>`. El encabezado de autenticación no puede ser `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` o un encabezado salto por salto. Con `none`, las conexiones no necesitan clave.
- Los encabezados estáticos adicionales utilizan el `customHeaders` normal del nodo (la misma validación que cualquier otro nodo compatible; los encabezados de autenticación no están permitidos allí).

`PUT /api/provider-nodes/<id>` acepta el mismo `customJson` y reescribe `baseUrl` y la configuración en cada conexión existente del nodo. Omitir `customJson` mantiene la configuración almacenada; cambiar `apiType` a `chat` o `responses` lo elimina del nodo y sus conexiones.

Luego agregue una conexión al nodo como de costumbre (`POST /api/providers` con la identificación del nodo) y solicite `<prefix>/<model>`, por ejemplo `biz/assistant-v1`. El punto final no muestra ninguna lista de modelos, por lo tanto, agregue los identificadores de modelo manualmente.

## Solicitar plantillas

Las plantillas son simples JSON. Un valor de cadena puede contener marcadores `{{placeholder}}` ; no se evalúa ni ejecuta nada y las claves de objeto nunca se sustituyen.

| Marcador de posición | Valor                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `{{prompt}}`         | Texto del último mensaje del usuario (partes de texto unidas con nuevas líneas) |
| `{{messages}}`       | La conversación en formato chat OpenAI                                          |
| `{{model}}`          | La identificación del modelo solicitado, sin el prefijo del proveedor.          |
| `{{stream}}`         | Siempre `false` — el punto final responde con un documento JSON                 |
| `{{request.<path>}}` | Un campo de la solicitud traducida (formato de chat OpenAI )                    |

- Un valor que es exactamente un marcador de posición mantiene su tipo JSON (`"{{messages}}"` se convierte en una matriz); un marcador de posición dentro de una cadena más larga se inserta como texto.
- Un marcador de posición que no resuelve nada falla la solicitud con HTTP 400 en lugar de enviar una carga útil incompleta.
- Las rutas utilizan notación de puntos e índices numéricos (`data.items[0].text`). `__proto__`, `prototype` y `constructor` se rechazan en claves y rutas.

## Respuestas

El valor en `responsePath` se convierte en la respuesta del asistente: las cadenas pasan, otros valores JSON se serializan. Un campo faltante o `null`, o un cuerpo que no es JSON, devuelve HTTP 502. Se pasan los estados de error ascendentes. Para clientes de streaming OmniRoute espera la respuesta completa JSON y luego la emite como un fragmento de contenido más el fragmento final; Esto no es una transmisión de tokens. Las llamadas a herramientas y los campos de uso no están asignados.

## Nunca repetido

Una solicitud comercial puede tener efectos secundarios incluso cuando falla. OmniRoute por lo tanto lo envía una vez:

- sin reintento de transporte ni seguimiento de redireccionamiento;
- no hay reintento en otra conexión (reserva de cuenta) — el error se devuelve tal cual y la conexión no se enfría;
- no hay retroceso al siguiente objetivo combinado, incluso en el caso de una respuesta vacía o fallida.

Las solicitudes de clientes separadas y los paneles de fusión que llaman explícitamente a varios modelos aún invocan el punto final de forma independiente.

## Probando un nodo

Guardar una conexión, la conexión** Prueba** Las comprobaciones de estado de los botones y en segundo plano nunca llaman al punto final: solo validan la configuración almacenada e informan que la conexión no es verificable.

`POST /api/provider-nodes/validate` con `"apiType": "custom-json"` y los campos de nodo (`baseUrl`, `apiKey`, `customJson`, opcional `customHeaders` y `modelId`) envía exactamente una solicitud real, con `ping` como el último texto del usuario. Responde `{ "valid": true }` o al estado ascendente (nunca al cuerpo ascendente).

## Almacenamiento

La configuración se almacena en `provider_nodes.custom_json_config_json` (migración `240_provider_node_custom_json_config.sql`) y se copia en el `providerSpecificData.customJson` de cada conexión.

Implementación: `open-sse/utils/customJson.ts` (validación y creación de plantillas), `open-sse/executors/customJson.ts` (ejecutor), `open-sse/services/combo/noReplayLatch.ts` y `src/sse/handlers/chat/responsePolicies.ts` (sin repetición).
