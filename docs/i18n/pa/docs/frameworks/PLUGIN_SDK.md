# OmniRoute Plugin SDK (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ਤੇਜ਼ ਸ਼ੁਰੂਆਤ

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

## API ਹਵਾਲਾ

### `definePlugin(def: PluginDefinition): Plugin`

ਫੈਕਟਰੀ ਫੰਕਸ਼ਨ ਜੋ ਡਿਫੌਲਟ ਨਾਲ ਇੱਕ ਪਲੱਗਇਨ ਆਬਜੈਕਟ ਬਣਾਉਂਦਾ ਹੈ।

**ਪੈਰਾਮੀਟਰ:**

- ਕਬਾਬ-ਕੇਸ ਵਿੱਚ `name` (ਸਤਰ, ਲੋੜੀਂਦਾ) — ਪਲੱਗਇਨ ਨਾਮ
- `priority` (ਨੰਬਰ, ਵਿਕਲਪਿਕ, ਡਿਫੌਲਟ: 100) — ਲੋਅਰ ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ
- `enabled` (ਬੁਲੀਅਨ, ਵਿਕਲਪਿਕ, ਡਿਫੌਲਟ: ਸਹੀ) — ਸਟਾਰਟ ਸਮਰੱਥ ਹੈ?
- `onRequest` (ਫੰਕਸ਼ਨ, ਵਿਕਲਪਿਕ) — ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ
- `onResponse` (ਫੰਕਸ਼ਨ, ਵਿਕਲਪਿਕ) — ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਬਾਅਦ ਚੱਲਦਾ ਹੈ
- `onError` (ਫੰਕਸ਼ਨ, ਵਿਕਲਪਿਕ) — ਹੈਂਡਲਰ ਗਲਤੀ 'ਤੇ ਚੱਲਦਾ ਹੈ

### `blockRequest(response?): BlockingHookResult`

ਬੇਨਤੀ ਨੂੰ ਬਲੌਕ ਕਰੋ ਅਤੇ ਵਿਕਲਪਿਕ ਤੌਰ 'ਤੇ ਇੱਕ ਕਸਟਮ ਜਵਾਬ ਵਾਪਸ ਕਰੋ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

ਪ੍ਰਦਾਤਾ ਤੱਕ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਬੇਨਤੀ ਬਾਡੀ ਨੂੰ ਸੋਧੋ।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ਬੇਨਤੀ ਸੰਦਰਭ ਵਿੱਚ ਮੈਟਾਡੇਟਾ ਨੱਥੀ ਕਰੋ।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ਪਲੱਗਇਨ ਸੰਦਰਭ (`PluginContext`)

| ਖੇਤਰ         | ਟਾਈਪ ਕਰੋ                  | ਵਰਣਨ                          |
| ------------ | ------------------------- | ----------------------------- |
| `requestId`  | `string`                  | ਵਿਲੱਖਣ ਬੇਨਤੀ ਪਛਾਣਕਰਤਾ         |
| `model`      | `string`                  | ਮਾਡਲ ਨਾਮ ਦੀ ਬੇਨਤੀ ਕੀਤੀ        |
| `provider`   | `string`                  | ਟੀਚਾ ਪ੍ਰਦਾਤਾ ID               |
| `body`       | `Record<string, unknown>` | ਸਰੀਰ ਨੂੰ ਬੇਨਤੀ ਕਰੋ            |
| `headers`    | `Record<string, string>`  | ਬੇਨਤੀ ਹੈਡਰ (ਨੋਟ ਦੇਖੋ)         |
| `metadata`   | `Record<string, unknown>` | ਪਰਿਵਰਤਨਸ਼ੀਲ ਮੈਟਾਡੇਟਾ          |
| `timestamp`  | `number`                  | ਟਾਈਮਸਟੈਂਪ ਦੀ ਬੇਨਤੀ ਕਰੋ        |
| `apiKeyInfo` | `object` (ਵਿਕਲਪਿਕ)        | API ਕੁੰਜੀ ਮੈਟਾਡੇਟਾ (ਨੋਟ ਦੇਖੋ) |

ਸੰਦਰਭ ਕਦੇ ਵੀ ਕਲਾਇੰਟ ਦੇ ਪ੍ਰਮਾਣ ਪੱਤਰਾਂ ਨੂੰ ਨਹੀਂ ਰੱਖਦਾ: `authorization`, `x-api-key`, `proxy-authorization` ਅਤੇ `cookie` ਸਿਰਲੇਖਾਂ ਨੂੰ ਹਟਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ (ਕੋਈ ਵੀ ਕੇਸਿੰਗ), ਅਤੇ `apiKeyInfo` ਕੁੰਜੀ ਦਾ ਮੈਟਾਡੇਟਾ ਰੱਖਦਾ ਹੈ (ਜਿਵੇਂ ਕਿ `id`, `name` ਅਤੇ `scopes`) ਪਰ ਕੁੰਜੀ ਮੁੱਲ ਜਾਂ ਇਸਦੇ ਫਿੰਗਰਪ੍ਰਿੰਟ (`redactPluginContext()` ) `src/lib/plugins/hooks.ts` ਨਹੀਂ ਰੱਖਦਾ। ਇਹ `onRequest`, `onResponse` ਅਤੇ `onError`'ਤੇ ਲਾਗੂ ਹੁੰਦਾ ਹੈ।

## ਮੈਨੀਫੈਸਟ (`plugin.json`)

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

### Hook ਦੀ ਤਰਜੀਹ

Hooks ਨੂੰ ਤਰਜੀਹ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ (ਘੱਟ = ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ਜਾਂ ਸਧਾਰਨ boolean ਮੁੱਲਾਂ ਵਜੋਂ (ਡਿਫਾਲਟ ਤਰਜੀਹ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ਇਜਾਜ਼ਤ ਸਿਸਟਮ

ਪਲੱਗਇਨ ਹਨ** ਸੈਂਡਬਾਕਸਡ ਨਹੀਂ** . ਹਰੇਕ ਕਿਰਿਆਸ਼ੀਲ ਪਲੱਗਇਨ ਇੱਕ ਵੱਖਰੀ, ਆਮ Node.js ਚਾਈਲਡ ਪ੍ਰਕਿਰਿਆ ( `src/lib/plugins/loader.ts` ਵਿੱਚ `loadPlugin()` ) ਉਸੇ ਓਪਰੇਟਿੰਗ-ਸਿਸਟਮ ਉਪਭੋਗਤਾ OmniRoute ਦੇ ਅਧੀਨ ਚਲਦੀ ਹੈ, ਬਿਨਾਂ VM ਸੰਦਰਭ ਅਤੇ ਕੋਈ Node.js ਅਨੁਮਤੀ ਫਲੈਗ ਦੇ ਬਿਨਾਂ। ਪਲੱਗਇਨ ਕੋਡ `node:fs`, `node:child_process`, `fetch` ਅਤੇ ਹਰ ਦੂਜੇ Node.js API ਵਰਤੋਂ ਕਰ ਸਕਦਾ ਹੈ: ਇਹ ਕਿਸੇ ਵੀ ਫਾਈਲ ਨੂੰ ਪੜ੍ਹ ਅਤੇ ਲਿਖ ਸਕਦਾ ਹੈ ਜੋ OmniRoute ਉਪਭੋਗਤਾ (ਡਾਟਾ ਡਾਇਰੈਕਟਰੀ ਸਮੇਤ), ਪ੍ਰੋਗਰਾਮ ਚਲਾ ਸਕਦਾ ਹੈ ਅਤੇ ਨੈਟਵਰਕ ਤੱਕ ਪਹੁੰਚ ਸਕਦਾ ਹੈ।

ਮੈਨੀਫੈਸਟ ਦਾ `requires.permissions` `network`, `file-read`, `file-write`, `env` ਅਤੇ `exec` ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ, ਪਰ ਅੱਜ ਰਨਟਾਈਮ 'ਤੇ ਸਿਰਫ਼ `env` ਹੀ ਪ੍ਰਭਾਵ ਹੈ:

| ਇਜਾਜ਼ਤ                                       | ਅੱਜ ਪ੍ਰਭਾਵ                                                                                                                                                                                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). |
| `network`, `file-read`, `file-write`, `exec` | ਕੋਈ ਨਹੀਂ। ਉਹ ਸਿਰਫ ਘੋਸ਼ਣਾਵਾਂ ਹਨ: ਜਦੋਂ ਉਹ ਗੁੰਮ ਹੋਣ ਤਾਂ ਕੁਝ ਵੀ ਬਲੌਕ ਨਹੀਂ ਹੁੰਦਾ।                                                                                                                                                             |

ਇੱਕ ਪਲੱਗਇਨ ਸਥਾਪਤ ਕਰਨਾ ਹੋਸਟ 'ਤੇ ਕੋਈ ਹੋਰ ਪ੍ਰੋਗਰਾਮ ਸਥਾਪਤ ਕਰਨ ਵਰਗਾ ਹੈ। ਸਿਰਫ਼ ਪਲੱਗਇਨ ਸਥਾਪਤ ਕਰੋ ਜਿਨ੍ਹਾਂ ਦੇ ਸਰੋਤ 'ਤੇ ਤੁਸੀਂ ਭਰੋਸਾ ਕਰਦੇ ਹੋ।

## ਕੌਂਫਿਗ ਸਕੀਮਾ

ਕੌਂਫਿਗਰ ਕਰਨ ਯੋਗ ਸੈਟਿੰਗਾਂ ਨੂੰ `configSchema` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ:

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

ਫ਼ੀਲਡ ਕਿਸਮਾਂ: `string`, `number`, `boolean`, `select`

ਫ਼ੀਲਡ ਵਿਕਲਪ: `default`, `min`, `max`, `enum`, `description`

ਕੌਂਫਿਗ ਮੁੱਲ ਡੇਟਾਬੇਸ ਵਿੱਚ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਕੌਂਫਿਗ ਪੰਨੇ ਰਾਹੀਂ ਪਹੁੰਚਯੋਗ ਹੁੰਦੇ ਹਨ।

## ਬਿਲਟ-ਇਨ ਇਵੈਂਟ

| ਇਵੈਂਟ             | ਕਦੋਂ                                                | ਪੇਲੋਡ                         |
| ----------------- | --------------------------------------------------- | ----------------------------- |
| `onRequest`       | ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਪਹਿਲਾਂ                               | ਬੇਨਤੀ ਸੰਦਰਭ                   |
| `onResponse`      | ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਬਾਅਦ                                 | ਜਵਾਬ ਡੇਟਾ                     |
| `onError`         | ਹੈਂਡਲਰ ਗਲਤੀ ਹੋਣ 'ਤੇ                                 | ਗਲਤੀ ਆਬਜੈਕਟ                   |
| `onModelSelect`   | ਰੂਟਿੰਗ ਲਈ ਮਾਡਲ ਚੁਣੇ ਜਾਣ 'ਤੇ                         | ਮਾਡਲ ਜਾਣਕਾਰੀ                  |
| `onComboResolve`  | ਕੌਂਬੋ ਰੂਟਿੰਗ ਹੱਲ ਹੋਣ 'ਤੇ                            | ਕੌਂਬੋ ਟਾਰਗੇਟ                  |
| `onRateLimit`     | ਦਰ ਸੀਮਾ ਪੂਰੀ ਹੋਣ 'ਤੇ                                | ਸੀਮਾ ਜਾਣਕਾਰੀ                  |
| `onQuotaExhaust`  | ਕੋਟਾ ਖ਼ਤਮ ਹੋਣ 'ਤੇ                                   | ਕੋਟਾ ਜਾਣਕਾਰੀ                  |
| `onProviderError` | ਪ੍ਰਦਾਤਾ ਵੱਲੋਂ ਗਲਤੀ ਵਾਪਸ ਕੀਤੇ ਜਾਣ 'ਤੇ                | ਗਲਤੀ ਵੇਰਵੇ                    |
| `onStreamStart`   | SSE ਸਟ੍ਰੀਮ ਸ਼ੁਰੂ ਹੋਣ 'ਤੇ                            | ਸਟ੍ਰੀਮ ਜਾਣਕਾਰੀ                |
| `onStreamEnd`     | SSE ਸਟ੍ਰੀਮ ਖ਼ਤਮ ਹੋਣ 'ਤੇ                             | ਸਟ੍ਰੀਮ ਅੰਕੜੇ                  |
| `onInstall`       | ਪਲੱਗਇਨ ਇੰਸਟਾਲ ਹੋਣ 'ਤੇ                               | `{ name, version, manifest }` |
| `onActivate`      | ਪਲੱਗਇਨ ਸਰਗਰਮ ਹੋਣ 'ਤੇ                                | `{ name, version, manifest }` |
| `onDeactivate`    | ਪਲੱਗਇਨ ਨਿਸ਼ਕ੍ਰਿਆ ਹੋਣ 'ਤੇ                            | `{ name, version, manifest }` |
| `onUninstall`     | ਪਲੱਗਇਨ ਅਣਇੰਸਟਾਲ ਹੋਣ 'ਤੇ (ਫ਼ਾਈਲਾਂ ਮਿਟਾਉਣ ਤੋਂ ਪਹਿਲਾਂ) | `{ name, version, manifest }` |

## ਉਦਾਹਰਨਾਂ

### ਲੌਗਰ ਦੀ ਬੇਨਤੀ ਕਰੋ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ਦਰ ਸੀਮਾ

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

### ਜਵਾਬ ਟ੍ਰਾਂਸਫਾਰਮਰ

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
