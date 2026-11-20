# OmniRoute Plugin SDK (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Mabilis na Pagsisimula

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

## API Sanggunian

### `definePlugin(def: PluginDefinition): Plugin`

Factory function na lumilikha ng isang Plugin object na may mga default.

**Mga Parameter:**

- `name` (string, kinakailangan) — Plugin name sa kebab-case
- `priority` (numero, opsyonal, default: 100) — Lower ay unang tumatakbo
- `enabled` (boolean, opsyonal, default: true) — Start enabled?
- `onRequest` (function, opsyonal) — Tumatakbo bago ang handler ng chat
- `onResponse` (function, opsyonal) — Tumatakbo pagkatapos ng handler ng chat
- `onError` (function, opsyonal) — Tumatakbo sa error sa handler

### `blockRequest(response?): BlockingHookResult`

I-block ang kahilingan at opsyonal na magbalik ng custom na tugon.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Baguhin ang katawan ng kahilingan bago ito makarating sa provider.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Maglakip ng metadata sa konteksto ng kahilingan.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Konteksto ng Plugin (`PluginContext`)

| Patlang      | Uri                       | Paglalarawan                              |
| ------------ | ------------------------- | ----------------------------------------- |
| `requestId`  | `string`                  | Natatanging identifier ng kahilingan      |
| `model`      | `string`                  | Hiniling na pangalan ng modelo            |
| `provider`   | `string`                  | Target na provider ID                     |
| `body`       | `Record<string, unknown>` | Humiling ng katawan                       |
| `headers`    | `Record<string, string>`  | Humiling ng mga header (tingnan ang tala) |
| `metadata`   | `Record<string, unknown>` | Nababagong metadata                       |
| `timestamp`  | `number`                  | Humiling ng timestamp                     |
| `apiKeyInfo` | `object` (opsyonal)       | API key metadata (tingnan ang tala)       |

Ang konteksto ay hindi kailanman nagdadala ng mga kredensyal ng kliyente: ang `authorization`, `x-api-key`, `proxy-authorization` at `cookie` na mga header ay tinanggal (anumang casing), at pinapanatili `apiKeyInfo` ang metadata ng key (gaya ng `id`, `name` at `scopes`) ngunit hindi ang key value o ang fingerprint nito (`redactPluginContext()` sa `src/lib/plugins/hooks.ts`). Nalalapat ito sa `onRequest`, `onResponse` at `onError`.

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

### Priyoridad ng Hook

Maaaring i-configure ang mga hook gamit ang priority (mas mababa = nauunang tumakbo):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

O bilang mga simpleng boolean (default na priority na 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistema ng Pahintulot

Ang mga plugin ay** hindi naka-sandbox** . Ang bawat aktibong plugin ay tumatakbo bilang isang hiwalay, ordinaryong Node.js child na proseso (`loadPlugin()` sa `src/lib/plugins/loader.ts`) sa ilalim ng parehong operating-system user bilang OmniRoute, na walang VM context at walang Node.js na mga flag ng pahintulot. Maaaring gamitin ng plugin code `node:fs`, `node:child_process`, `fetch` at lahat ng iba pang Node.js API: maaari itong magbasa at magsulat ng anumang file na magagawa ng OmniRoute user (kabilang ang direktoryo ng data), magpatakbo ng mga programa at maabot ang network.

Ang `requires.permissions` ng manifest ay tumatanggap `network`, `file-read`, `file-write`, `env` at `exec`, ngunit ngayon ay `env` lang ang may epekto sa runtime:

| Pahintulot                                   | Epekto ngayon                                                                                                                                                                                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Ang proseso ng plugin ay tumatanggap din `PORT`, `HOSTNAME`, `TZ` at `TMPDIR`. Kung wala ito, tumatanggap lang ito `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` at `PLUGIN_NAME` (plus `SystemRoot` at `windir` sa Windows). |
| `network`, `file-read`, `file-write`, `exec` | wala. Ang mga ito ay mga deklarasyon lamang: walang naharang kapag sila ay nawawala.                                                                                                                                                                 |

Ang pag-install ng plugin ay tulad ng pag-install ng anumang iba pang program sa host. Mag-install lamang ng mga plugin na pinagkakatiwalaan mo ang pinagmulan.

## Schema ng Config

Tukuyin ang mga nako-configure na setting sa `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External na API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Mga uri ng field: `string`, `number`, `boolean`, `select`

Mga opsyon ng field: `default`, `min`, `max`, `enum`, `description`

Iniimbak sa database ang mga value ng config at maa-access ang mga ito sa pamamagitan ng page ng config sa dashboard.

## Mga Built-in na Event

| Event             | Kailan                                              | Payload                       |
| ----------------- | --------------------------------------------------- | ----------------------------- |
| `onRequest`       | Bago ang chat handler                               | Konteksto ng request          |
| `onResponse`      | Pagkatapos ng chat handler                          | Data ng response              |
| `onError`         | Kapag may error sa handler                          | Object ng error               |
| `onModelSelect`   | Napili ang model para sa routing                    | Impormasyon ng model          |
| `onComboResolve`  | Nalutas ang combo routing                           | Mga target ng combo           |
| `onRateLimit`     | Naabot ang rate limit                               | Impormasyon ng limit          |
| `onQuotaExhaust`  | Naubos ang quota                                    | Impormasyon ng quota          |
| `onProviderError` | Nagbalik ng error ang provider                      | Mga detalye ng error          |
| `onStreamStart`   | Nagsimula ang SSE stream                            | Impormasyon ng stream         |
| `onStreamEnd`     | Natapos ang SSE stream                              | Mga estadistika ng stream     |
| `onInstall`       | Na-install ang plugin                               | `{ name, version, manifest }` |
| `onActivate`      | Na-activate ang plugin                              | `{ name, version, manifest }` |
| `onDeactivate`    | Na-deactivate ang plugin                            | `{ name, version, manifest }` |
| `onUninstall`     | Na-uninstall ang plugin (bago burahin ang mga file) | `{ name, version, manifest }` |

## Mga halimbawa

### Humiling ng Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitasyon ng Rate

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

### Transpormer ng Tugon

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
