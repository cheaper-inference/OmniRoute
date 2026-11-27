# OmniRoute Plugin SDK (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ඉක්මන් ආරම්භය

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

## API යොමුව

### `definePlugin(def: PluginDefinition): Plugin`

පෙරනිමියෙන් ප්ලගින වස්තුවක් සාදන කර්මාන්තශාලා ශ්‍රිතය.

**පරාමිතීන්:**

- `name` (string, අවශ්‍ය) — ප්ලගින නම kebab-case
- `priority` (අංකය, විකල්ප, පෙරනිමිය: 100) — පහළ පළමුව ධාවනය වේ
- `enabled` (බූලියන්, විකල්ප, පෙරනිමිය: සත්‍ය) — ආරම්භය සබල කර තිබේද?
- `onRequest` (ක්‍රියාකාරීත්වය, විකල්ප) — චැට් හසුරුවන්නාට පෙර ධාවනය වේ
- `onResponse` (ක්‍රියාකාරීත්වය, විකල්ප) — කතාබස් හසුරුවන්නාට පසුව ධාවනය වේ
- `onError` (ක්‍රියාකාරීත්වය, විකල්ප) — හසුරුවන්නෙහි දෝෂය මත ධාවනය වේ

### `blockRequest(response?): BlockingHookResult`

ඉල්ලීම අවහිර කර විකල්ප වශයෙන් අභිරුචි ප්‍රතිචාරයක් ලබා දෙන්න.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

ඉල්ලුම් පත්‍රය සැපයුම්කරු වෙත ළඟා වීමට පෙර එය වෙනස් කරන්න.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ඉල්ලීම් සන්දර්භයට පාරදත්ත අමුණන්න.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ප්ලගින සන්දර්භය (`PluginContext`)

| ක්ෂේත්රය     | ටයිප් කරන්න               | විස්තරය                        |
| ------------ | ------------------------- | ------------------------------ |
| `requestId`  | `string`                  | අද්විතීය ඉල්ලීම් හඳුනාගැනීම    |
| `model`      | `string`                  | ඉල්ලූ මාදිලියේ නම              |
| `provider`   | `string`                  | ඉලක්ක සපයන්නා ID               |
| `body`       | `Record<string, unknown>` | ශරීරය ඉල්ලන්න                  |
| `headers`    | `Record<string, string>`  | ඉල්ලීම් ශීර්ෂ (සටහන බලන්න)     |
| `metadata`   | `Record<string, unknown>` | විකෘති පාරදත්ත                 |
| `timestamp`  | `number`                  | කාල මුද්‍රාව ඉල්ලන්න           |
| `apiKeyInfo` | `object` (විකල්ප)         | API යතුරු පාරදත්ත (සටහන බලන්න) |

සන්දර්භය කිසිවිටක සේවාලාභියාගේ අක්තපත්‍ර රැගෙන නොයයි: `authorization`, `x-api-key`, `proxy-authorization` සහ `cookie` ශීර්ෂ ඉවත් කරනු ලැබේ (ඕනෑම ආවරණයක්), සහ `apiKeyInfo` යතුරේ පාර-දත්ත ( `id`, `name` සහ `scopes` වැනි) තබා ගනී නමුත් ප්‍රධාන අගය හෝ එහි ඇඟිලි සලකුණ `src/lib/plugins/hooks.ts` `redactPluginContext()` තුළ නොවේ. මෙය `onRequest`, `onResponse` සහ `onError` සඳහා අදාළ වේ.

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

### Hook ප්රමුඛතාව

Hooks ප්රමුඛතාවක් සමඟ වින්යාස කළ හැකිය (අඩු අගය = පළමුව ක්රියාත්මක වේ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

නැතහොත් සරල boolean අගයන් ලෙස (පෙරනිමි ප්රමුඛතාව 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## අවසර පද්ධතිය

ප්ලගීන වේ** වැලි පෙට්ටිය දමා නැත** . සෑම සක්‍රිය ප්ලගිනයක්ම වෙනම සාමාන්‍ය Node.js ළමා ක්‍රියාවලියක් ලෙස ක්‍රියා කරයි ( `src/lib/plugins/loader.ts` හි`loadPlugin()` ) OmniRoute ලෙස එකම මෙහෙයුම් පද්ධති පරිශීලකයෙකු යටතේ, VM සන්දර්භය සහ Node.js අවසර ධජ නොමැතිව. ප්ලගින කේතයට `node:fs`, `node:child_process`, `fetch` සහ අනෙකුත් සෑම Node.js API භාවිතා කළ හැක : එය OmniRoute පරිශීලකයාට (දත්ත නාමාවලිය ඇතුළුව), වැඩසටහන් ක්‍රියාත්මක කර ජාලයට ළඟා විය හැකි ඕනෑම ගොනුවක් කියවීමට සහ ලිවීමට හැකිය.

මැනිෆෙස්ටයේ `requires.permissions` `network`, `file-read`, `file-write`, `env` සහ `exec` පිළිගනී, නමුත් අද `env` පමණක් ධාවන වේලාවේදී බලපෑමක් ඇති කරයි:

| අවසරය                                        | අද බලපෑම                                                                                                                                                                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | ප්ලගින ක්‍රියාවලියට `PORT`, `HOSTNAME`, `TZ` සහ `TMPDIR` ද ලැබේ. එසේ නොමැතිව එයට ලැබෙන්නේ `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` සහ `PLUGIN_NAME` ( Windows මත `SystemRoot` සහ `windir` එකතු කිරීම ) පමණි. |
| `network`, `file-read`, `file-write`, `exec` | කිසිවක් නැත. ඒවා ප්‍රකාශයන් පමණි: ඒවා අතුරුදහන් වූ විට කිසිවක් අවහිර නොවේ.                                                                                                                                                               |

ප්ලගිනයක් ස්ථාපනය කිරීම සත්කාරකයේ වෙනත් ඕනෑම වැඩසටහනක් ස්ථාපනය කිරීම වැනි ය. ඔබ විශ්වාස කරන ප්ලගීන පමණක් ස්ථාපනය කරන්න.

## වින්යාස යෝජනා ක්රමය

වින්යාස කළ හැකි සැකසුම් `configSchema` තුළ අර්ථ දක්වන්න:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "බාහිර API යතුර" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ක්ෂේත්ර වර්ග: `string`, `number`, `boolean`, `select`

ක්ෂේත්ර විකල්ප: `default`, `min`, `max`, `enum`, `description`

වින්යාස අගයන් දත්ත සමුදාය තුළ සුරැකෙන අතර උපකරණ පුවරුවේ වින්යාස පිටුව හරහා ප්රවේශ විය හැක.

## ගොඩනඟා ඇති සිදුවීම්

| සිදුවීම           | සිදුවන අවස්ථාව                            | දත්ත භාරය                     |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | කතාබස් හසුරුවනයට පෙර                      | ඉල්ලීම් සන්දර්භය              |
| `onResponse`      | කතාබස් හසුරුවනයෙන් පසු                    | ප්රතිචාර දත්ත                 |
| `onError`         | හසුරුවන දෝෂයකදී                           | දෝෂ වස්තුව                    |
| `onModelSelect`   | මාර්ගගත කිරීම සඳහා ආකෘතිය තෝරාගත් විට     | ආකෘති තොරතුරු                 |
| `onComboResolve`  | සංයුක්ත මාර්ගගත කිරීම විසඳූ විට           | සංයුක්ත ඉලක්ක                 |
| `onRateLimit`     | අනුපාත සීමාවට ළඟා වූ විට                  | සීමා තොරතුරු                  |
| `onQuotaExhaust`  | කෝටාව අවසන් වූ විට                        | කෝටා තොරතුරු                  |
| `onProviderError` | සපයන්නා දෝෂයක් ලබා දුන් විට               | දෝෂ විස්තර                    |
| `onStreamStart`   | SSE ප්රවාහය ආරම්භ වූ විට                  | ප්රවාහ තොරතුරු                |
| `onStreamEnd`     | SSE ප්රවාහය අවසන් වූ විට                  | ප්රවාහ සංඛ්යාලේඛන             |
| `onInstall`       | ප්ලගීනය ස්ථාපනය කළ විට                    | `{ name, version, manifest }` |
| `onActivate`      | ප්ලගීනය සක්රිය කළ විට                     | `{ name, version, manifest }` |
| `onDeactivate`    | ප්ලගීනය අක්රිය කළ විට                     | `{ name, version, manifest }` |
| `onUninstall`     | ප්ලගීනය අස්ථාපනය කළ විට (ගොනු මැකීමට පෙර) | `{ name, version, manifest }` |

## උදාහරණ

### ලොගර් ඉල්ලන්න

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### අනුපාත සීමාව

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

### ප්‍රතිචාර ට්‍රාන්ස්ෆෝමරය

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
