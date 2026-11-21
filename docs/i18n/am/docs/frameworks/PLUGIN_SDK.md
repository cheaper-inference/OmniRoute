# OmniRoute Plugin SDK (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ፈጣን ጅምር

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

## API ማጣቀሻ

### `definePlugin(def: PluginDefinition): Plugin`

ከነባሪዎች ጋር ተሰኪ ነገርን የሚፈጥር የፋብሪካ ተግባር።

**መለኪያዎች፡-**

- `name` (ሕብረቁምፊ፣ ያስፈልጋል) — የተሰኪ ስም በ kebab-case
- `priority` (ቁጥር፣ አማራጭ፣ ነባሪ፡ 100) — ዝቅተኛው መጀመሪያ ይሰራል
- `enabled` (ቦሊያን፣ አማራጭ ያልሆነ፣ ነባሪ፡ እውነት) — ነቅቷል?
- `onRequest` (ተግባር፣ አማራጭ) — ከቻት ተቆጣጣሪ በፊት ይሰራል
- `onResponse` (ተግባር፣ አማራጭ) — ከቻት ተቆጣጣሪ በኋላ ይሰራል
- `onError` (ተግባር፣ አማራጭ) — በተቆጣጣሪ ስህተት ላይ ይሰራል

### `blockRequest(response?): BlockingHookResult`

ጥያቄውን ያግዱ እና እንደ አማራጭ ብጁ ምላሽ ይመልሱ።

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

የጥያቄውን አካል ወደ አቅራቢው ከመድረሱ በፊት ያሻሽሉ።

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ከጥያቄው አውድ ጋር ሜታዳታን ያያይዙ።

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ተሰኪ አውድ (`PluginContext`)

| መስክ          | ዓይነት                      | መግለጫ                       |
| ------------ | ------------------------- | -------------------------- |
| `requestId`  | `string`                  | ልዩ የጥያቄ መለያ                |
| `model`      | `string`                  | የተጠየቀው የሞዴል ስም             |
| `provider`   | `string`                  | የዒላማ አቅራቢ ID               |
| `body`       | `Record<string, unknown>` | አካል ይጠይቁ                   |
| `headers`    | `Record<string, string>`  | ራስጌዎችን ይጠይቁ (ማስታወሻ ይመልከቱ)  |
| `metadata`   | `Record<string, unknown>` | ተለዋዋጭ ዲበ ውሂብ               |
| `timestamp`  | `number`                  | የጊዜ ማህተም ይጠይቁ              |
| `apiKeyInfo` | `object` (አማራጭ)           | API ቁልፍ ዲበዳታ (ማስታወሻ ይመልከቱ) |

ዐውደ-ጽሑፉ የደንበኛውን ምስክርነቶች በፍፁም አይይዝም `authorization`፣ `x-api-key`፣ `proxy-authorization` እና `cookie` ራስጌዎች ተወግደዋል (ማንኛውም መያዣ)፣ እና `apiKeyInfo` የቁልፉን ሜታዳታ (እንደ `id`፣ `name` እና `scopes` ያሉ) ያቆያል፣ ነገር ግን የቁልፍ እሴቱ ወይም የጣት አሻራው (`redactPluginContext()` in `src/lib/plugins/hooks.ts`) አይደለም። ይህ `onRequest`, `onResponse` እና `onError` ላይ ተፈጻሚ ይሆናል.

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

### የHook ቅድሚያ

Hooks በቅድሚያ ሊዋቀሩ ይችላሉ (ዝቅተኛ = ቀድሞ ይሰራል)፦

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ወይም እንደ ቀላል boolean እሴቶች (ነባሪ ቅድሚያ 100)፦

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## የፈቃድ ስርዓት

በነባሪ ተሰኪዎች ናቸው።** ማጠሪያ አይደለም** . እያንዳንዱ ንቁ ፕለጊን እንደ የተለየ፣ ተራ Node.js ልጅ ሂደት (`loadPlugin()` in `src/lib/plugins/loader.ts`) በተመሳሳይ ስርዓተ ክወና ተጠቃሚ እንደ OmniRoute ይሰራል፣ ያለ VM አውድ እና Node.js ፍቃድ ባንዲራዎች የሉትም። ተሰኪ ኮድ `node:fs`, `node:child_process`, `fetch` እና ሁሉም Node.js API መጠቀም ይችላል: OmniRoute ተጠቃሚው የሚችለውን ማንኛውንም ፋይል ማንበብ እና መፃፍ ይችላል (የውሂብ ማውጫን ጨምሮ) ፕሮግራሞችን ማስኬድ እና አውታረ መረቡ ላይ መድረስ ይችላል።

አንጸባራቂው `requires.permissions` `network`, `file-read`, `file-write`, `env` እና `exec` ይቀበላል. በነባሪ ቅንጅቶች `env` ብቻ በሂደት ላይ ተጽእኖ ይኖረዋል።

### መርጦ የመግባት ፍቃድ ሞዴል (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` ባህሪ ባንዲራ (ምድብ `security`፣** በነባሪ ጠፍቷል** ) እያንዳንዱን ተሰኪ ሂደት በ [Node.js ፍቃድ ሞዴል](https://nodejs.org/api/permissions.html) ይጀምራል (`--permission`፣ በእያንዳንዱ የሚደገፍ Node.js መስመር ተቀባይነት ያለው፡ 22.22 +፣ 24 እና 26)። ባንዲራዎቹ ከመገለጫው በ `buildPermissionModelArgs()` በ `src/lib/plugins/permissionModel.ts` የተገነቡ ናቸው። ባንዲራ የሚነበበው ፕለጊን ሲነቃ ነው፣ ስለዚህ ከለውጡ በኋላ ለሚነቁ ተሰኪዎች ተፈጻሚ ይሆናል፤ እሱን ተግባራዊ ለማድረግ የሚሄድ ተሰኪን ያቦዝኑት እና ያግብሩት።

የፕለጊን ዳታ ማውጫ `plugin-data/<plugin-name>` ከፕለጊን ስርወ ቀጥሎ ነው (`~/.omniroute/plugin-data/<plugin-name>` በነባሪ፣ `getPluginDataDir()`)። ባንዲራ በርቶ፣ መንገዱ ወደ ተሰኪው እንደ `PLUGIN_DATA_DIR` ይተላለፋል።

| ፍቃድ          | ይጠቁሙ (ነባሪ)                                                                                                                                                                                           | ጠቁም።                                                                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (ምንም)        | የ OmniRoute ተጠቃሚ ሙሉ መብቶች።                                                                                                                                                                            | ፋይል የሚነበበው በተሰኪው ማውጫ ውስጥ ብቻ ነው። ምንም ፋይል አይጽፍም, ምንም ልጅ ሂደቶች የሉም, ምንም የሰራተኛ ክሮች የሉም, ምንም ቤተኛ addons የለም, ምንም WASI የለም.                                                                    |
| `env`        | የፕለጊኑ ሂደት `PORT`፣ `HOSTNAME`፣ `TZ` እና `TMPDIR` ይቀበላል። ያለሱ, `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` እና `PLUGIN_NAME` (በተጨማሪም `SystemRoot` እና `windir` Windows ላይ) ይቀበላል. | ባንዲራ እንደተወገደ አይነት።                                                                                                                                                                      |
| `file-read`  | የለም (መግለጫ ብቻ)።                                                                                                                                                                                       | የፕለጊን ዳታ ማውጫው ሊነበብ የሚችል ይሆናል (ከጎደለ ነው የተፈጠረው)።                                                                                                                                          |
| `file-write` | የለም (መግለጫ ብቻ)።                                                                                                                                                                                       | የተሰኪው ዳታ ማውጫ ሊነበብ እና ሊፃፍ የሚችል ይሆናል (`--allow-fs-write`)። ሌላ የሚጻፍ ነገር የለም።                                                                                                               |
| `exec`       | የለም (መግለጫ ብቻ)።                                                                                                                                                                                       | የልጆች ሂደቶች ተፈቅደዋል (`--allow-child-process`). Node.js የፍቃድ ባንዲራዎችን ወደ ልጅ Node.js ሂደቶች በ `NODE_OPTIONS` ያስተላልፋል፣ ነገር ግን ማንኛውም ሌላ ፕሮግራም ያለ ገደብ ይሰራል፣ ስለዚህ `exec` የፋይል-ስርዓት ወሰኖችን በብቃት ያነሳል። |
| `network`    | የለም (መግለጫ ብቻ)።                                                                                                                                                                                       | ምንም። የ Node.js ፍቃድ ሞዴል ወደ ውጭ የሚወጣ የአውታረ መረብ መዳረሻን አይገድበውም፣ ስለዚህ `network` መግለጫ ሆኖ ይቆያል እና በጭራሽ አይተገበርም።                                                                                 |

ከራሳቸው ማውጫ ውጭ ፋይሎችን የሚያነቡ (ለምሳሌ ከወላጅ `node_modules` የተፈታ ሞጁል)፣ ከውሂባቸው ማውጫ በስተቀር የትኛውም ቦታ ይፃፉ፣ ወይም `exec` ሳያስታውቁ የሚፈልጓቸውን ፕለጊኖች ባንዲራውን በእረፍት ላይ ማብራት። በተሰኪው ላይ ባንዲራ ቢኖርም እንኳን የኔትወርክ መዳረሻን ያቆያል እና እንደ OmniRoute ተጠቃሚ ይሰራል፣ ስለዚህ ምንጫቸውን የሚያምኗቸውን ፕለጊኖች ብቻ ይጫኑ።

## የውቅረት Schema

ሊዋቀሩ የሚችሉ ቅንብሮችን በ`configSchema` ውስጥ ይግለጹ፦

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "የውጫዊ API ቁልፍ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

የመስክ አይነቶች፦ `string`፣ `number`፣ `boolean`፣ `select`

የመስክ አማራጮች፦ `default`፣ `min`፣ `max`፣ `enum`፣ `description`

የውቅረት እሴቶች በውሂብ ጎታው ውስጥ ይቀመጣሉ፣ እንዲሁም በdashboard የውቅረት ገጽ በኩል ማግኘት ይቻላል።

## አብረው የተካተቱ ክስተቶች

| ክስተት              | መቼ                             | Payload                       |
| ----------------- | ------------------------------ | ----------------------------- |
| `onRequest`       | ከchat handler በፊት              | የጥያቄ አውድ                      |
| `onResponse`      | ከchat handler በኋላ              | የምላሽ ውሂብ                      |
| `onError`         | የhandler ስህተት ሲከሰት             | የስህተት object                  |
| `onModelSelect`   | ለrouting model ሲመረጥ            | የmodel መረጃ                    |
| `onComboResolve`  | Combo routing ሲፈታ              | የCombo ዒላማዎች                  |
| `onRateLimit`     | የRate limit ገደብ ሲደረስ           | የገደብ መረጃ                      |
| `onQuotaExhaust`  | Quota ሲያልቅ                     | የQuota መረጃ                    |
| `onProviderError` | Provider ስህተት ሲመልስ             | የስህተት ዝርዝሮች                   |
| `onStreamStart`   | SSE stream ሲጀምር                | የStream መረጃ                   |
| `onStreamEnd`     | SSE stream ሲያበቃ                | የStream ስታቲስቲክስ               |
| `onInstall`       | Plugin ሲጫን                     | `{ name, version, manifest }` |
| `onActivate`      | Plugin ሲነቃ                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin ከስራ ሲቦዝን                | `{ name, version, manifest }` |
| `onUninstall`     | Plugin ሲወገድ (ፋይሎች ከመሰረዛቸው በፊት) | `{ name, version, manifest }` |

## ምሳሌዎች

### Loggerን ይጠይቁ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ደረጃ ወሰን

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

### ምላሽ ትራንስፎርመር

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
