# OmniRoute Plugin SDK (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ತ್ವರಿತ ಪ್ರಾರಂಭ

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

## API ಉಲ್ಲೇಖ

### `definePlugin(def: PluginDefinition): Plugin`

ಡೀಫಾಲ್ಟ್ಗಳೊಂದಿಗೆ ಪ್ಲಗಿನ್ ವಸ್ತುವನ್ನು ರಚಿಸುವ ಫ್ಯಾಕ್ಟರಿ ಕಾರ್ಯ.

**ನಿಯತಾಂಕಗಳು:**

- `name` (ಸ್ಟ್ರಿಂಗ್, ಅಗತ್ಯವಿದೆ) — ಕಬಾಬ್-ಕೇಸ್ನಲ್ಲಿ ಪ್ಲಗಿನ್ ಹೆಸರು
- `priority` (ಸಂಖ್ಯೆ, ಐಚ್ಛಿಕ, ಡೀಫಾಲ್ಟ್: 100) — ಲೋವರ್ ಮೊದಲು ರನ್ ಮಾಡುತ್ತದೆ
- `enabled` (ಬೂಲಿಯನ್, ಐಚ್ಛಿಕ, ಡೀಫಾಲ್ಟ್: ನಿಜ) — ಪ್ರಾರಂಭವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆಯೇ?
- `onRequest` (ಕಾರ್ಯ, ಐಚ್ಛಿಕ) — ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ ಮೊದಲು ರನ್ ಆಗುತ್ತದೆ
- `onResponse` (ಕಾರ್ಯ, ಐಚ್ಛಿಕ) — ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ ನಂತರ ರನ್ ಆಗುತ್ತದೆ
- `onError` (ಕಾರ್ಯ, ಐಚ್ಛಿಕ) — ಹ್ಯಾಂಡ್ಲರ್ ದೋಷದಲ್ಲಿ ರನ್ ಆಗುತ್ತದೆ

### `blockRequest(response?): BlockingHookResult`

ವಿನಂತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಿ ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ ಕಸ್ಟಮ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹಿಂತಿರುಗಿ.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

ಪೂರೈಕೆದಾರರನ್ನು ತಲುಪುವ ಮೊದಲು ವಿನಂತಿಯ ದೇಹವನ್ನು ಮಾರ್ಪಡಿಸಿ.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ವಿನಂತಿಯ ಸಂದರ್ಭಕ್ಕೆ ಮೆಟಾಡೇಟಾವನ್ನು ಲಗತ್ತಿಸಿ.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ಪ್ಲಗಿನ್ ಸಂದರ್ಭ (`PluginContext`)

| ಕ್ಷೇತ್ರ      | ಟೈಪ್ ಮಾಡಿ                 | ವಿವರಣೆ                         |
| ------------ | ------------------------- | ------------------------------ |
| `requestId`  | `string`                  | ಅನನ್ಯ ವಿನಂತಿ ಗುರುತಿಸುವಿಕೆ      |
| `model`      | `string`                  | ಮಾದರಿ ಹೆಸರನ್ನು ವಿನಂತಿಸಲಾಗಿದೆ   |
| `provider`   | `string`                  | ಟಾರ್ಗೆಟ್ ಪ್ರೊವೈಡರ್ ID          |
| `body`       | `Record<string, unknown>` | ದೇಹವನ್ನು ವಿನಂತಿಸಿ              |
| `headers`    | `Record<string, string>`  | ವಿನಂತಿ ಶಿರೋನಾಮೆ (ಟಿಪ್ಪಣಿ ನೋಡಿ) |
| `metadata`   | `Record<string, unknown>` | ಬದಲಾಯಿಸಬಹುದಾದ ಮೆಟಾಡೇಟಾ         |
| `timestamp`  | `number`                  | ಸಮಯಸ್ಟ್ಯಾಂಪ್ ಅನ್ನು ವಿನಂತಿಸಿ    |
| `apiKeyInfo` | `object` (ಐಚ್ಛಿಕ)         | API ಕೀ ಮೆಟಾಡೇಟಾ (ಟಿಪ್ಪಣಿ ನೋಡಿ) |

ಸಂದರ್ಭವು ಕ್ಲೈಂಟ್ನ ರುಜುವಾತುಗಳನ್ನು ಎಂದಿಗೂ ಒಯ್ಯುವುದಿಲ್ಲ: `authorization`, `x-api-key`, `proxy-authorization` ಮತ್ತು `cookie` ಹೆಡರ್ಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ (ಯಾವುದೇ ಕೇಸಿಂಗ್), ಮತ್ತು `apiKeyInfo` ಕೀಲಿಯ ಮೆಟಾಡೇಟಾವನ್ನು ( `id`, `name` ಮತ್ತು `scopes` ನಂತಹ) ಇರಿಸುತ್ತದೆ ಆದರೆ ಕೀ ಮೌಲ್ಯ ಅಥವಾ ಅದರ ಫಿಂಗರ್ಪ್ರಿಂಟ್ ಅಲ್ಲ (`redactPluginContext()` `src/lib/plugins/hooks.ts`). ಇದು `onRequest`, `onResponse` ಮತ್ತು `onError` ಗೆ ಅನ್ವಯಿಸುತ್ತದೆ.

## ಮ್ಯಾನಿಫೆಸ್ಟ್ (`plugin.json`)

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

### Hook ಆದ್ಯತೆ

Hookಗಳನ್ನು ಆದ್ಯತೆಯೊಂದಿಗೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು (ಕಡಿಮೆ = ಮೊದಲು ರನ್ ಆಗುತ್ತದೆ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ಅಥವಾ ಸರಳ boolean ಮೌಲ್ಯಗಳಾಗಿ (ಡೀಫಾಲ್ಟ್ ಆದ್ಯತೆ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ಅನುಮತಿ ವ್ಯವಸ್ಥೆ

ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಪ್ಲಗಿನ್ಗಳು** ಸ್ಯಾಂಡ್ಬಾಕ್ಸ್ ಮಾಡಲಾಗಿಲ್ಲ** . ಪ್ರತಿಯೊಂದು ಸಕ್ರಿಯ ಪ್ಲಗಿನ್ ಪ್ರತ್ಯೇಕವಾದ, ಸಾಮಾನ್ಯವಾದ Node.js ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆಯಾಗಿ ( `src/lib/plugins/loader.ts` ನಲ್ಲಿ`loadPlugin()` ) OmniRoute ನಂತೆ ಅದೇ ಆಪರೇಟಿಂಗ್-ಸಿಸ್ಟಮ್ ಬಳಕೆದಾರರ ಅಡಿಯಲ್ಲಿ ಚಲಿಸುತ್ತದೆ, ಯಾವುದೇ VM ಸಂದರ್ಭ ಮತ್ತು ಯಾವುದೇ Node.js ಅನುಮತಿ ಫ್ಲ್ಯಾಗ್ಗಳಿಲ್ಲ. ಪ್ಲಗಿನ್ ಕೋಡ್ `node:fs`, `node:child_process`, `fetch` ಮತ್ತು ಇತರ ಪ್ರತಿಯೊಂದು Node.js API ಬಳಸಬಹುದು: ಇದು OmniRoute ಬಳಕೆದಾರರು (ಡೇಟಾ ಡೈರೆಕ್ಟರಿ ಸೇರಿದಂತೆ) ಯಾವುದೇ ಫೈಲ್ ಅನ್ನು ಓದಬಹುದು ಮತ್ತು ಬರೆಯಬಹುದು (ಡೇಟಾ ಡೈರೆಕ್ಟರಿಯನ್ನು ಒಳಗೊಂಡಂತೆ), ಪ್ರೋಗ್ರಾಂಗಳನ್ನು ರನ್ ಮಾಡಬಹುದು ಮತ್ತು ನೆಟ್ವರ್ಕ್ ಅನ್ನು ತಲುಪಬಹುದು.

ಮ್ಯಾನಿಫೆಸ್ಟ್ನ `requires.permissions` `network`, `file-read`, `file-write`, `env` ಮತ್ತು `exec` ಸ್ವೀಕರಿಸುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ ಸೆಟ್ಟಿಂಗ್ಗಳೊಂದಿಗೆ ರನ್ಟೈಮ್ನಲ್ಲಿ `env` ಮಾತ್ರ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ.

### ಆಯ್ಕೆಯ ಅನುಮತಿ ಮಾದರಿ (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` ವೈಶಿಷ್ಟ್ಯದ ಧ್ವಜ (ವರ್ಗ `security`,** ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಆಫ್** ) [Node.js ಅನುಮತಿ ಮಾದರಿಯೊಂದಿಗೆ](https://nodejs.org/api/permissions.html) ಪ್ರತಿ ಪ್ಲಗಿನ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ (`--permission`, ಪ್ರತಿ ಬೆಂಬಲಿತ Node.js ಲೈನ್ನಿಂದ ಸ್ವೀಕರಿಸಲಾಗಿದೆ: 22.22 +, 24 ಮತ್ತು 26). ಧ್ವಜಗಳನ್ನು ಮ್ಯಾನಿಫೆಸ್ಟ್ನಿಂದ `buildPermissionModelArgs()` ನಿಂದ `src/lib/plugins/permissionModel.ts` ನಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ಪ್ಲಗಿನ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು ಓದಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಬದಲಾವಣೆಯ ನಂತರ ಸಕ್ರಿಯಗೊಳಿಸಲಾದ ಪ್ಲಗಿನ್ಗಳಿಗೆ ಇದು ಅನ್ವಯಿಸುತ್ತದೆ; ಅದನ್ನು ಅನ್ವಯಿಸಲು ಚಾಲನೆಯಲ್ಲಿರುವ ಪ್ಲಗಿನ್ ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ ಮತ್ತು ಸಕ್ರಿಯಗೊಳಿಸಿ.

ಪ್ಲಗಿನ್ ಡೇಟಾ ಡೈರೆಕ್ಟರಿಯು ಪ್ಲಗಿನ್ ರೂಟ್ನ ಪಕ್ಕದಲ್ಲಿ `plugin-data/<plugin-name>` ಆಗಿದೆ (ಡಿಫಾಲ್ಟ್ ಆಗಿ`~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). ಫ್ಲ್ಯಾಗ್ ಆನ್ನೊಂದಿಗೆ, ಅದರ ಮಾರ್ಗವನ್ನು ಪ್ಲಗಿನ್ಗೆ `PLUGIN_DATA_DIR` ಎಂದು ರವಾನಿಸಲಾಗುತ್ತದೆ.

| ಅನುಮತಿ        | ಫ್ಲ್ಯಾಗ್ ಆಫ್ (ಡೀಫಾಲ್ಟ್)                                                                                                                                                                                                                                   | ಫ್ಲ್ಯಾಗ್ ಆನ್ ಮಾಡಿ                                                                                                                                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (ಯಾವುದೂ ಇಲ್ಲ) | OmniRoute ಬಳಕೆದಾರರ ಸಂಪೂರ್ಣ ಸವಲತ್ತುಗಳು.                                                                                                                                                                                                                    | ಫೈಲ್ ಪ್ಲಗಿನ್ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಮಾತ್ರ ಓದುತ್ತದೆ. ಯಾವುದೇ ಫೈಲ್ ಬರೆಯುವುದಿಲ್ಲ, ಯಾವುದೇ ಮಕ್ಕಳ ಪ್ರಕ್ರಿಯೆಗಳಿಲ್ಲ, ಯಾವುದೇ ವರ್ಕರ್ ಥ್ರೆಡ್ಗಳಿಲ್ಲ, ಸ್ಥಳೀಯ ಆಡ್ಆನ್ಗಳಿಲ್ಲ, WASI ಇಲ್ಲ.                                                                                                                      |
| `env`         | ಪ್ಲಗಿನ್ ಪ್ರಕ್ರಿಯೆಯು `PORT`, `HOSTNAME`, `TZ` ಮತ್ತು `TMPDIR` ಸಹ ಪಡೆಯುತ್ತದೆ. ಅದು ಇಲ್ಲದೆ, ಇದು `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ಮತ್ತು `PLUGIN_NAME` ಮಾತ್ರ ಪಡೆಯುತ್ತದೆ (ಜೊತೆಗೆ Windows ನಲ್ಲಿ `SystemRoot` ಮತ್ತು `windir` ). | ಫ್ಲ್ಯಾಗ್ ಆಫ್ ಮಾಡಿದಂತೆಯೇ.                                                                                                                                                                                                                                                             |
| `file-read`   | ಯಾವುದೂ ಇಲ್ಲ (ಘೋಷಣೆ ಮಾತ್ರ).                                                                                                                                                                                                                                | ಪ್ಲಗಿನ್ ಡೇಟಾ ಡೈರೆಕ್ಟರಿಯನ್ನು ಸಹ ಓದಬಹುದಾಗಿದೆ (ಕಳೆದುಹೋದರೆ ಅದನ್ನು ರಚಿಸಲಾಗುತ್ತದೆ).                                                                                                                                                                                                        |
| `file-write`  | ಯಾವುದೂ ಇಲ್ಲ (ಘೋಷಣೆ ಮಾತ್ರ).                                                                                                                                                                                                                                | ಪ್ಲಗಿನ್ ಡೇಟಾ ಡೈರೆಕ್ಟರಿ ಓದಬಲ್ಲ ಮತ್ತು ಬರೆಯಬಲ್ಲ (`--allow-fs-write`) ಆಗುತ್ತದೆ. ಬೇರೇನೂ ಬರೆಯುವಂತಿಲ್ಲ.                                                                                                                                                                                     |
| `exec`        | ಯಾವುದೂ ಇಲ್ಲ (ಘೋಷಣೆ ಮಾತ್ರ).                                                                                                                                                                                                                                | ಮಕ್ಕಳ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ (`--allow-child-process`). Node.js `NODE_OPTIONS` ಮೂಲಕ ಮಕ್ಕಳ Node.js ಪ್ರಕ್ರಿಯೆಗಳಿಗೆ ಅನುಮತಿ ಫ್ಲ್ಯಾಗ್ಗಳನ್ನು ರವಾನಿಸುತ್ತದೆ, ಆದರೆ ಯಾವುದೇ ಇತರ ಪ್ರೋಗ್ರಾಂ ನಿರ್ಬಂಧಗಳಿಲ್ಲದೆ ಚಲಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ `exec` ಫೈಲ್-ಸಿಸ್ಟಮ್ ಮಿತಿಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಎತ್ತುತ್ತದೆ. |
| `network`     | ಯಾವುದೂ ಇಲ್ಲ (ಘೋಷಣೆ ಮಾತ್ರ).                                                                                                                                                                                                                                | ಯಾವುದೂ ಇಲ್ಲ. Node.js ಅನುಮತಿ ಮಾದರಿಯು ಹೊರಹೋಗುವ ನೆಟ್ವರ್ಕ್ ಪ್ರವೇಶವನ್ನು ನಿರ್ಬಂಧಿಸುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ `network` ಘೋಷಣೆಯಾಗಿ ಉಳಿಯುತ್ತದೆ ಮತ್ತು ಎಂದಿಗೂ ಜಾರಿಗೊಳಿಸುವುದಿಲ್ಲ.                                                                                                                        |

ತಮ್ಮದೇ ಡೈರೆಕ್ಟರಿಯ ಹೊರಗೆ ಫೈಲ್ಗಳನ್ನು ಓದುವ ಬ್ರೇಕ್ಗಳ ಪ್ಲಗಿನ್ಗಳಲ್ಲಿ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು ತಿರುಗಿಸುವುದು (ಉದಾಹರಣೆಗೆ ಪೋಷಕ `node_modules` ನಿಂದ ಪರಿಹರಿಸಲಾದ ಮಾಡ್ಯೂಲ್), ಅವುಗಳ ಡೇಟಾ ಡೈರೆಕ್ಟರಿಯನ್ನು ಹೊರತುಪಡಿಸಿ ಎಲ್ಲಿಯಾದರೂ ಬರೆಯಿರಿ ಅಥವಾ `exec` ಘೋಷಿಸದೆ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಸ್ಪಾನ್ ಮಾಡಿ. ಪ್ಲಗ್ಇನ್ನಲ್ಲಿ ಫ್ಲ್ಯಾಗ್ನೊಂದಿಗೆ ನೆಟ್ವರ್ಕ್ ಪ್ರವೇಶವನ್ನು ಇರಿಸುತ್ತದೆ ಮತ್ತು OmniRoute ಬಳಕೆದಾರರಂತೆ ರನ್ ಆಗುತ್ತದೆ, ಆದ್ದರಿಂದ ನೀವು ನಂಬುವ ಮೂಲ ಪ್ಲಗಿನ್ಗಳನ್ನು ಮಾತ್ರ ಸ್ಥಾಪಿಸಿ.

## ಕಾನ್ಫಿಗ್ ಸ್ಕೀಮಾ

ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದಾದ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು `configSchema` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಿ:

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

ಫೀಲ್ಡ್ ಪ್ರಕಾರಗಳು: `string`, `number`, `boolean`, `select`

ಫೀಲ್ಡ್ ಆಯ್ಕೆಗಳು: `default`, `min`, `max`, `enum`, `description`

ಕಾನ್ಫಿಗ್ ಮೌಲ್ಯಗಳನ್ನು ಡೇಟಾಬೇಸ್ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ ಕಾನ್ಫಿಗ್ ಪುಟದ ಮೂಲಕ ಪ್ರವೇಶಿಸಬಹುದು.

## ಅಂತರ್ನಿರ್ಮಿತ ಈವೆಂಟ್ಗಳು

| ಈವೆಂಟ್            | ಯಾವಾಗ                                          | ಪೇಲೋಡ್                        |
| ----------------- | ---------------------------------------------- | ----------------------------- |
| `onRequest`       | ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗೂ ಮೊದಲು                        | ವಿನಂತಿಯ ಸಂದರ್ಭ                |
| `onResponse`      | ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ನ ನಂತರ                          | ಪ್ರತಿಕ್ರಿಯೆಯ ಡೇಟಾ             |
| `onError`         | ಹ್ಯಾಂಡ್ಲರ್ ದೋಷ ಸಂಭವಿಸಿದಾಗ                      | ದೋಷದ ಆಬ್ಜೆಕ್ಟ್                |
| `onModelSelect`   | ರೂಟಿಂಗ್ಗಾಗಿ ಮಾಡೆಲ್ ಆಯ್ಕೆ ಮಾಡಿದಾಗ               | ಮಾಡೆಲ್ ಮಾಹಿತಿ                 |
| `onComboResolve`  | ಕಾಂಬೊ ರೂಟಿಂಗ್ ಪರಿಹರಿಸಿದಾಗ                      | ಕಾಂಬೊ ಗುರಿಗಳು                 |
| `onRateLimit`     | ದರ ಮಿತಿ ತಲುಪಿದಾಗ                               | ಮಿತಿಯ ಮಾಹಿತಿ                  |
| `onQuotaExhaust`  | ಕೋಟಾ ಮುಗಿದಾಗ                                   | ಕೋಟಾ ಮಾಹಿತಿ                   |
| `onProviderError` | ಪೂರೈಕೆದಾರರು ದೋಷವನ್ನು ಹಿಂದಿರುಗಿಸಿದಾಗ            | ದೋಷದ ವಿವರಗಳು                  |
| `onStreamStart`   | SSE ಸ್ಟ್ರೀಮ್ ಪ್ರಾರಂಭವಾದಾಗ                      | ಸ್ಟ್ರೀಮ್ ಮಾಹಿತಿ               |
| `onStreamEnd`     | SSE ಸ್ಟ್ರೀಮ್ ಮುಗಿದಾಗ                           | ಸ್ಟ್ರೀಮ್ ಅಂಕಿಅಂಶಗಳು           |
| `onInstall`       | ಪ್ಲಗಿನ್ ಸ್ಥಾಪಿಸಿದಾಗ                            | `{ name, version, manifest }` |
| `onActivate`      | ಪ್ಲಗಿನ್ ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ                        | `{ name, version, manifest }` |
| `onDeactivate`    | ಪ್ಲಗಿನ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ                     | `{ name, version, manifest }` |
| `onUninstall`     | ಪ್ಲಗಿನ್ ಅಸ್ಥಾಪಿಸಿದಾಗ (ಫೈಲ್ಗಳನ್ನು ಅಳಿಸುವ ಮೊದಲು) | `{ name, version, manifest }` |

## ಉದಾಹರಣೆಗಳು

### ವಿನಂತಿ ಲಾಗರ್

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ದರ ಮಿತಿ

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

### ಪ್ರತಿಕ್ರಿಯೆ ಪರಿವರ್ತಕ

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
