# OmniRoute Plugin SDK (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Início rápido

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

## Referência API

### `definePlugin(def: PluginDefinition): Plugin`

Função de fábrica que cria um objeto Plugin com padrões.

**Parâmetros:**

- `name` (string, obrigatório) — Nome do plugin no kebab-case
- `priority` (número, opcional, predefinição: 100) — O baixo é executado primeiro
- `enabled` (booleano, opcional, predefinição: verdadeiro) — Iniciar ativado?
- `onRequest` (função, opcional) — É executado antes do manipulador de chat
- `onResponse` (função, opcional) — É executado após o manipulador de chat
- `onError` (função, opcional) — É executado em caso de erro do manipulador

### `blockRequest(response?): BlockingHookResult`

Bloqueie o pedido e, opcionalmente, devolva uma resposta personalizada.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Modifique o corpo do pedido antes que este chegue ao prestador.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Anexe metadados ao contexto do pedido.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Contexto do plugin (`PluginContext`)

| Campo        | Tipo                      | Descrição                         |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | Identificador de pedido exclusivo |
| `model`      | `string`                  | Nome do modelo solicitado         |
| `provider`   | `string`                  | Fornecedor de destino ID          |
| `body`       | `Record<string, unknown>` | Solicitar corpo                   |
| `headers`    | `Record<string, string>`  | Solicitar cabeçalhos (ver nota)   |
| `metadata`   | `Record<string, unknown>` | Metadados mutáveis                |
| `timestamp`  | `number`                  | Solicitar carimbo de data/hora    |
| `apiKeyInfo` | `object` (opcional)       | Metadados da chave API (ver nota) |

O contexto nunca carrega as credenciais do cliente: os cabeçalhos `authorization`, `x-api-key`, `proxy-authorization` e `cookie` são removidos (qualquer caixa) e `apiKeyInfo` mantém os metadados da chave (como `id`, `name` e `scopes`), mas não o valor da chave ou a sua impressão digital (`redactPluginContext()` em `src/lib/plugins/hooks.ts`). Isto aplica-se a `onRequest`, `onResponse` e `onError`.

## Manifesto (`plugin.json`)

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

### Prioridade dos Hooks

Os hooks podem ser configurados com uma prioridade (valor mais baixo = executado primeiro):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ou como valores booleanos simples (prioridade predefinida: 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistema de permissão

Os plug-ins são** não em sandbox** . Cada plug-in ativo é executado como um processo filho Node.js comum e separado (`loadPlugin()` em `src/lib/plugins/loader.ts`) sob o mesmo utilizador do sistema operativo que OmniRoute, sem contexto VM e sem sinalizadores de permissão Node.js. O código do plug-in pode utilizar `node:fs`, `node:child_process`, `fetch` e todos os outros Node.js API: pode ler e escrever qualquer ficheiro que o utilizador OmniRoute possa (incluindo o directório de dados), executar programas e aceder à rede.

O `requires.permissions` do manifesto aceita `network`, `file-read`, `file-write`, `env` e `exec`, mas hoje apenas `env` tem efeito em tempo de execução:

| Permissão                                    | Efeito hoje                                                                                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`                                        | O processo do plugin também recebe `PORT`, `HOSTNAME`, `TZ` e `TMPDIR`. Sem ele, recebe apenas `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` e `PLUGIN_NAME` (mais `SystemRoot` e `windir` em Windows). |
| `network`, `file-read`, `file-write`, `exec` | Nenhum. São apenas declarações: nada é bloqueado quando faltam.                                                                                                                                                                |

Instalar um plugin é como instalar qualquer outro programa no host. Instale apenas plug-ins cuja fonte confie.

## Esquema de Configuração

Defina as opções configuráveis em `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Tipos de campo: `string`, `number`, `boolean`, `select`

Opções de campo: `default`, `min`, `max`, `enum`, `description`

Os valores de configuração são guardados na base de dados e estão acessíveis através da página de configuração do painel.

## Eventos Incorporados

| Evento            | Quando                                                       | Payload                       |
| ----------------- | ------------------------------------------------------------ | ----------------------------- |
| `onRequest`       | Antes do processador de chat                                 | Contexto do pedido            |
| `onResponse`      | Após o processador de chat                                   | Dados da resposta             |
| `onError`         | Quando ocorre um erro no processador                         | Objeto de erro                |
| `onModelSelect`   | Modelo selecionado para encaminhamento                       | Informações do modelo         |
| `onComboResolve`  | Encaminhamento combinado resolvido                           | Destinos da combinação        |
| `onRateLimit`     | Limite de pedidos atingido                                   | Informações do limite         |
| `onQuotaExhaust`  | Quota esgotada                                               | Informações da quota          |
| `onProviderError` | O fornecedor devolveu um erro                                | Detalhes do erro              |
| `onStreamStart`   | Fluxo SSE iniciado                                           | Informações do fluxo          |
| `onStreamEnd`     | Fluxo SSE terminado                                          | Estatísticas do fluxo         |
| `onInstall`       | Plugin instalado                                             | `{ name, version, manifest }` |
| `onActivate`      | Plugin ativado                                               | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin desativado                                            | `{ name, version, manifest }` |
| `onUninstall`     | Plugin desinstalado (antes de os ficheiros serem eliminados) | `{ name, version, manifest }` |

## Exemplos

### Registador de solicitações

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitador de taxa

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

### Transformador de resposta

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
