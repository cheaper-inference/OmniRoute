---
title: "OmniRoute Plugin SDK"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Plugin SDK

## Quick Start

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

## API Reference

### `definePlugin(def: PluginDefinition): Plugin`

Factory function that creates a Plugin object with defaults.

**Parameters:**

- `name` (string, required) — Plugin name in kebab-case
- `priority` (number, optional, default: 100) — Lower runs first
- `enabled` (boolean, optional, default: true) — Start enabled?
- `onRequest` (function, optional) — Runs before chat handler
- `onResponse` (function, optional) — Runs after chat handler
- `onError` (function, optional) — Runs on handler error

### `blockRequest(response?): BlockingHookResult`

Block the request and optionally return a custom response.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Modify the request body before it reaches the provider.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Attach metadata to the request context.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| Field        | Type                      | Description                 |
| ------------ | ------------------------- | --------------------------- |
| `requestId`  | `string`                  | Unique request identifier   |
| `model`      | `string`                  | Requested model name        |
| `provider`   | `string`                  | Target provider ID          |
| `body`       | `Record<string, unknown>` | Request body                |
| `headers`    | `Record<string, string>`  | Request headers (see note)  |
| `metadata`   | `Record<string, unknown>` | Mutable metadata            |
| `timestamp`  | `number`                  | Request timestamp           |
| `apiKeyInfo` | `object` (optional)       | API key metadata (see note) |

The context never carries the client's credentials: the `authorization`, `x-api-key`,
`proxy-authorization` and `cookie` headers are removed (any casing), and `apiKeyInfo` keeps the key's
metadata (such as `id`, `name` and `scopes`) but not the key value or its fingerprint
(`redactPluginContext()` in `src/lib/plugins/hooks.ts`). This applies to `onRequest`,
`onResponse` and `onError`.

## Manifest (`plugin.json`)

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
    "apiKey": { "type": "string", "description": "API key for external service" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Hook Priority

Hooks can be configured with priority (lower = runs first):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Or as simple booleans (default priority 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Permission System

By default plugins are **not sandboxed**. Each active plugin runs as a separate, ordinary Node.js
child process (`loadPlugin()` in `src/lib/plugins/loader.ts`) under the same operating-system user
as OmniRoute, with no VM context and no Node.js permission flags. Plugin code can use `node:fs`,
`node:child_process`, `fetch` and every other Node.js API: it can read and write any file the
OmniRoute user can (including the data directory), run programs and reach the network.

The manifest's `requires.permissions` accepts `network`, `file-read`, `file-write`, `env` and
`exec`. With the default settings only `env` has an effect at runtime.

### Opt-in permission model (`PLUGIN_PERMISSION_MODEL_ENABLED`)

The `PLUGIN_PERMISSION_MODEL_ENABLED` feature flag (category `security`, **off by default**) starts
each plugin process with the
[Node.js permission model](https://nodejs.org/api/permissions.html) (`--permission`, accepted by
every supported Node.js line: 22.22+, 24 and 26). The flags are built from the manifest by
`buildPermissionModelArgs()` in `src/lib/plugins/permissionModel.ts`. The flag is read when a plugin
is activated, so it applies to plugins activated after the change; deactivate and activate a
running plugin to apply it.

The plugin data directory is `plugin-data/<plugin-name>` next to the plugin root
(`~/.omniroute/plugin-data/<plugin-name>` by default, `getPluginDataDir()`). With the flag on, its
path is passed to the plugin as `PLUGIN_DATA_DIR`.

| Permission   | Flag off (default)                                                                                                                                                                                                                       | Flag on                                                                                                                                                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (none)       | Full privileges of the OmniRoute user.                                                                                                                                                                                                   | File reads only inside the plugin directory. No file writes, no child processes, no worker threads, no native addons, no WASI.                                                                                                                        |
| `env`        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). | Same as with the flag off.                                                                                                                                                                                                                            |
| `file-read`  | None (declaration only).                                                                                                                                                                                                                 | The plugin data directory also becomes readable (it is created if missing).                                                                                                                                                                           |
| `file-write` | None (declaration only).                                                                                                                                                                                                                 | The plugin data directory becomes readable and writable (`--allow-fs-write`). Nothing else is writable.                                                                                                                                               |
| `exec`       | None (declaration only).                                                                                                                                                                                                                 | Child processes are allowed (`--allow-child-process`). Node.js passes the permission flags on to child Node.js processes through `NODE_OPTIONS`, but any other program runs without restrictions, so `exec` effectively lifts the file-system limits. |
| `network`    | None (declaration only).                                                                                                                                                                                                                 | None. The Node.js permission model does not restrict outbound network access, so `network` stays a declaration and is never enforced.                                                                                                                 |

Turning the flag on breaks plugins that read files outside their own directory (for example a
module resolved from a parent `node_modules`), write anywhere but their data directory, or spawn
processes without declaring `exec`. Even with the flag on the plugin keeps network access and runs
as the OmniRoute user, so install only plugins whose source you trust.

## Config Schema

Define configurable settings in `configSchema`:

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

Field types: `string`, `number`, `boolean`, `select`

Field options: `default`, `min`, `max`, `enum`, `description`

Config values are persisted in the database and accessible via the dashboard config page.

## Built-in Events

| Event             | When                                      | Payload                       |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | Before chat handler                       | Request context               |
| `onResponse`      | After chat handler                        | Response data                 |
| `onError`         | On handler error                          | Error object                  |
| `onModelSelect`   | Model selected for routing                | Model info                    |
| `onComboResolve`  | Combo routing resolved                    | Combo targets                 |
| `onRateLimit`     | Rate limit hit                            | Limit info                    |
| `onQuotaExhaust`  | Quota exhausted                           | Quota info                    |
| `onProviderError` | Provider returned error                   | Error details                 |
| `onStreamStart`   | SSE stream started                        | Stream info                   |
| `onStreamEnd`     | SSE stream ended                          | Stream stats                  |
| `onInstall`       | Plugin installed                          | `{ name, version, manifest }` |
| `onActivate`      | Plugin activated                          | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deactivated                        | `{ name, version, manifest }` |
| `onUninstall`     | Plugin uninstalled (before files deleted) | `{ name, version, manifest }` |

## Examples

### Request Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Rate Limiter

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

### Response Transformer

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
