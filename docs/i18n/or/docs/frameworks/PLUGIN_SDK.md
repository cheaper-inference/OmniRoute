# OmniRoute Plugin SDK (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ଶୀଘ୍ର ଆରମ୍ଭ

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

## API ସନ୍ଦର୍ଭ

### `definePlugin(def: PluginDefinition): Plugin`

କାରଖାନା କାର୍ଯ୍ୟ ଯାହା ଡିଫଲ୍ଟ ସହିତ ଏକ ପ୍ଲଗଇନ୍ ବସ୍ତୁ ସୃଷ୍ଟି କରେ।

**ପାରାମିଟରଗୁଡିକ:**

- `name` (ଷ୍ଟ୍ରିଙ୍ଗ, ଆବଶ୍ୟକ) — କେବାବ-କ୍ଷେତ୍ରରେ ପ୍ଲଗଇନ୍ ନାମ।
- `priority` (ସଂଖ୍ୟା, ବ al କଳ୍ପିକ, ଡିଫଲ୍ଟ: 100) — ଲୋୟର ପ୍ରଥମେ ଚାଲିଥାଏ।
- `enabled` (ବୁଲିଅନ୍, ବ al କଳ୍ପିକ, ଡିଫଲ୍ଟ: ସତ୍ୟ) — ଆରମ୍ଭ ସକ୍ଷମ?
- `onRequest` (କାର୍ଯ୍ୟ, ବ al କଳ୍ପିକ) — ଚାଟ୍ ହ୍ୟାଣ୍ଡେଲର୍ ପୂର୍ବରୁ ଚାଲିଥାଏ।
- `onResponse` (କାର୍ଯ୍ୟ, ବ al କଳ୍ପିକ) — ଚାଟ୍ ହ୍ୟାଣ୍ଡେଲର୍ ପରେ ଚାଲିଥାଏ।
- `onError` (କାର୍ଯ୍ୟ, ବ al କଳ୍ପିକ) — ହ୍ୟାଣ୍ଡେଲର୍ ତ୍ରୁଟିରେ ଚାଲିଥାଏ।

### `blockRequest(response?): BlockingHookResult`

ଅନୁରୋଧକୁ ଅବରୋଧ କରନ୍ତୁ ଏବଂ ବ option କଳ୍ପିକ ଭାବରେ ଏକ କଷ୍ଟମ୍ ପ୍ରତିକ୍ରିୟା ଫେରସ୍ତ କରନ୍ତୁ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

ଏହା ପ୍ରଦାନକାରୀଙ୍କ ନିକଟରେ ପହଞ୍ଚିବା ପୂର୍ବରୁ ଅନୁରୋଧ ସଂସ୍ଥାକୁ ପରିବର୍ତ୍ତନ କରନ୍ତୁ।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ଅନୁରୋଧ ପ୍ରସଙ୍ଗରେ ମେଟାଡାଟା ସଂଲଗ୍ନ କରନ୍ତୁ।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ପ୍ଲଗଇନ୍ ପ୍ରସଙ୍ଗ (`PluginContext`)

| କ୍ଷେତ୍ର      | ଟାଇପ୍ କରନ୍ତୁ।             | ବର୍ଣ୍ଣନା                          |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | ଅନନ୍ୟ ଅନୁରୋଧ ପରିଚାୟକ।             |
| `model`      | `string`                  | ଅନୁରୋଧ କରାଯାଇଥିବା ମଡେଲ ନାମ।       |
| `provider`   | `string`                  | ଲକ୍ଷ୍ୟ ପ୍ରଦାନକାରୀ ID              |
| `body`       | `Record<string, unknown>` | ଶରୀର ପାଇଁ ଅନୁରୋଧ।                 |
| `headers`    | `Record<string, string>`  | ହେଡର୍ ଅନୁରୋଧ (ଟିପ୍ପଣୀ ଦେଖନ୍ତୁ)    |
| `metadata`   | `Record<string, unknown>` | ପରିବର୍ତ୍ତନଶୀଳ ମେଟାଡାଟା।           |
| `timestamp`  | `number`                  | ସମୟ ସୀମା ଅନୁରୋଧ।                  |
| `apiKeyInfo` | `object` (ବ al କଳ୍ପିକ)    | API କି ମେଟାଡାଟା (ଟିପ୍ପଣୀ ଦେଖନ୍ତୁ) |

ପ୍ରସଙ୍ଗ କଦାପି ଗ୍ରାହକଙ୍କ ପରିଚୟ ବହନ କରେ ନାହିଁ: `authorization`, `x-api-key`, `proxy-authorization` ଏବଂ `cookie` ହେଡର୍ ଗୁଡିକ ଅପସାରଣ କରାଯାଏ (ଯେକ any ଣସି କେସିଙ୍ଗ୍), ଏବଂ `apiKeyInfo` ଚାବିର ମେଟାଡାଟା (ଯେପରିକି `id`, `name` ଏବଂ `scopes`) ରଖେ କିନ୍ତୁ ଏହାର ମୁଖ୍ୟ ମୂଲ୍ୟ କିମ୍ବା ଏହାର ଫିଙ୍ଗର ପ୍ରିଣ୍ଟ ନୁହେଁ ( `src/lib/plugins/hooks.ts` ରେ`redactPluginContext()` )। ଏହା `onRequest`, `onResponse` ଏବଂ `onError` ପାଇଁ ପ୍ରଯୁଜ୍ୟ।

## ମାନିଫେଷ୍ଟ (`plugin.json`)

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

### Hook ଅଗ୍ରାଧିକାର

Hooksକୁ ଅଗ୍ରାଧିକାର ସହିତ ବିନ୍ୟାସ କରାଯାଇପାରେ (କମ୍ = ପ୍ରଥମେ ଚାଲେ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

କିମ୍ବା ସରଳ boolean ଭାବରେ (ଡିଫଲ୍ଟ ଅଗ୍ରାଧିକାର 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ଅନୁମତି ବ୍ୟବସ୍ଥା।

ଡିଫଲ୍ଟ ଭାବରେ ପ୍ଲଗଇନ୍ ଗୁଡିକ।** ବାଲୁକା ବାକ୍ସ ନୁହେଁ।** । ପ୍ରତ୍ୟେକ ସକ୍ରିୟ ପ୍ଲଗଇନ୍ ଏକ ଅଲଗା, ସାଧାରଣ Node.js ଶିଶୁ ପ୍ରକ୍ରିୟା ( `src/lib/plugins/loader.ts` ରେ`loadPlugin()` ) OmniRoute ସହିତ ସମାନ ଅପରେଟିଂ ସିଷ୍ଟମ୍ ଉପଭୋକ୍ତା ଭାବରେ ଚାଲିଥାଏ, କ z ଣସି VM ପ୍ରସଙ୍ଗ ଏବଂ Node.js ଅନୁମତି ପତାକା ବିନା। ପ୍ଲଗଇନ୍ କୋଡ୍ `node:fs`, `node:child_process`, `fetch` ଏବଂ ଅନ୍ୟାନ୍ୟ Node.js API ବ୍ୟବହାର କରିପାରିବ: ଏହା OmniRoute ବ୍ୟବହାରକାରୀ (ଡାଟା ଡିରେକ୍ଟୋରୀକୁ ଅନ୍ତର୍ଭୂକ୍ତ କରି) ଯେକ any ଣସି ଫାଇଲ ପ read ି ଲେଖିପାରେ, ପ୍ରୋଗ୍ରାମ ଚଲାଇ ନେଟୱର୍କରେ ପହଞ୍ଚିପାରେ।

ମନିଫେଷ୍ଟର `requires.permissions` `network`, `file-read`, `file-write`, `env` ଏବଂ `exec` ଗ୍ରହଣ କରେ। ଡିଫଲ୍ଟ ସେଟିଂସମୂହ ସହିତ ଚାଲିବା ସମୟରେ କେବଳ `env` ପ୍ରଭାବ ଅଛି।

### ଅପ୍ଟ-ଇନ୍ ଅନୁମତି ମଡେଲ୍ (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` feature ଶିଷ୍ଟ୍ୟ ପତାକା (ବର୍ଗ `security`,** ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ।** ) ପ୍ରତ୍ୟେକ ପ୍ଲଗଇନ୍ ପ୍ରକ୍ରିୟା [Node.js ଅନୁମତି ମଡେଲ](https://nodejs.org/api/permissions.html) ସହିତ ଆରମ୍ଭ କରିଥାଏ (`--permission`, ପ୍ରତ୍ୟେକ ସମର୍ଥିତ Node.js ଲାଇନ ଦ୍ୱାରା ଗ୍ରହଣ କରାଯାଇଛି: 22.22 +, 24 ଏବଂ 26)। ପତାକା `src/lib/plugins/permissionModel.ts` ରେ `buildPermissionModelArgs()` ଦ୍ୱାରା ମନିଫେଷ୍ଟରୁ ନିର୍ମିତ। ଏକ ପ୍ଲଗଇନ୍ ସକ୍ରିୟ ହେଲେ ପତାକା ପ read ାଯାଏ, ତେଣୁ ଏହା ପରିବର୍ତ୍ତନ ପରେ ସକ୍ରିୟ ହୋଇଥିବା ପ୍ଲଗଇନ୍ ପାଇଁ ପ୍ରଯୁଜ୍ୟ; ଏହାକୁ ପ୍ରୟୋଗ କରିବା ପାଇଁ ଏକ ଚାଲୁଥିବା ପ୍ଲଗଇନକୁ ନିଷ୍କ୍ରିୟ କରନ୍ତୁ ଏବଂ ସକ୍ରିୟ କରନ୍ତୁ।

ପ୍ଲଗଇନ୍ ଡାଟା ଡିରେକ୍ଟୋରୀ ହେଉଛି ପ୍ଲଗଇନ୍ ରୁଟ୍ ପାଖରେ `plugin-data/<plugin-name>` (ଡିଫଲ୍ଟ ଭାବରେ`~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`)। ପତାକା ଅନ୍ ହେବା ସହିତ ଏହାର ପଥ ପ୍ଲଗଇନକୁ `PLUGIN_DATA_DIR` ଭାବରେ ପଠାଯାଏ।

| ଅନୁମତି       | ଫ୍ଲାଗ୍ ଅଫ୍ (ଡିଫଲ୍ଟ)                                                                                                                                                                                                                      | ଫ୍ଲାଗ୍ ଅନ୍ କରନ୍ତୁ।                                                                                                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (କିଛି ନୁହେଁ) | OmniRoute ବ୍ୟବହାରକାରୀଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଅଧିକାର।                                                                                                                                                                                             | ଫାଇଲ୍ କେବଳ ପ୍ଲଗଇନ୍ ଡିରେକ୍ଟୋରୀ ଭିତରେ ପ read େ। କ file ଣସି ଫାଇଲ ଲେଖ ନାହିଁ, କ child ଣସି ଶିଶୁ ପ୍ରକ୍ରିୟା ନାହିଁ, କ worker ଣସି ଶ୍ରମିକ ସୂତ୍ର ନାହିଁ, ନା ଦେଶୀ ଆଡୋନ୍, ନା WASI।                                                                                           |
| `env`        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). | ପତାକା ବନ୍ଦ ସହିତ ସମାନ।                                                                                                                                                                                                                                         |
| `file-read`  | କିଛି ନୁହେଁ (କେବଳ ଘୋଷଣା)।                                                                                                                                                                                                                 | ପ୍ଲଗଇନ୍ ଡାଟା ଡିରେକ୍ଟୋରୀ ମଧ୍ୟ ପଠନୀୟ ହୋଇଯାଏ (ଯଦି ହଜିଯାଏ ତେବେ ଏହା ସୃଷ୍ଟି ହୁଏ)।                                                                                                                                                                                   |
| `file-write` | କିଛି ନୁହେଁ (କେବଳ ଘୋଷଣା)।                                                                                                                                                                                                                 | ପ୍ଲଗଇନ୍ ଡାଟା ଡିରେକ୍ଟୋରୀ ପ read ଼ିବା ଏବଂ ଲେଖିବା ଯୋଗ୍ୟ (`--allow-fs-write`) ହୋଇଯାଏ। ଅନ୍ୟ କିଛି ଲେଖା ଯୋଗ୍ୟ ନୁହେଁ।                                                                                                                                                 |
| `exec`       | କିଛି ନୁହେଁ (କେବଳ ଘୋଷଣା)।                                                                                                                                                                                                                 | ଶିଶୁ ପ୍ରକ୍ରିୟା ଅନୁମତିପ୍ରାପ୍ତ (`--allow-child-process`)। Node.js ଅନୁମତି ପତାକାକୁ `NODE_OPTIONS` ମାଧ୍ୟମରେ ଶିଶୁ Node.js ପ୍ରକ୍ରିୟାରେ ଦେଇଥାଏ, କିନ୍ତୁ ଅନ୍ୟ କ program ଣସି ପ୍ରୋଗ୍ରାମ ପ୍ରତିବନ୍ଧକ ବିନା ଚାଲିଥାଏ, ତେଣୁ `exec` ଫାଇଲ-ସିଷ୍ଟମ ସୀମାକୁ ପ୍ରଭାବଶାଳୀ ଭାବରେ ଉଠାଇଥାଏ। |
| `network`    | କିଛି ନୁହେଁ (କେବଳ ଘୋଷଣା)।                                                                                                                                                                                                                 | କିଛି ନୁହେଁ। Node.js ଅନୁମତି ମଡେଲ ଆଉଟବାଉଣ୍ଡ ନେଟୱାର୍କ ପ୍ରବେଶକୁ ପ୍ରତିବନ୍ଧିତ କରେ ନାହିଁ, ତେଣୁ `network` ଏକ ଘୋଷଣାନାମା ରଖେ ଏବଂ ଏହା କେବେହେଲେ କାର୍ଯ୍ୟକାରୀ ହୁଏ ନାହିଁ।                                                                                                    |

ବ୍ରେକ୍ ପ୍ଲଗଇନ୍ ଗୁଡିକରେ ଫ୍ଲାଗ୍ ଟର୍ନ୍ କରିବା ଯାହାକି ନିଜ ନିଜ ଡିରେକ୍ଟୋରୀ ବାହାରେ ଫାଇଲ ପ read ିଥାଏ (ଉଦାହରଣ ସ୍ୱରୂପ ଏକ ପ୍ୟାରେଣ୍ଟ୍ `node_modules` ରୁ ସମାଧାନ ହୋଇଥିବା ଏକ ମଡ୍ୟୁଲ୍), ଯେକ anywhere ଣସି ସ୍ଥାନରେ ଲେଖନ୍ତୁ କିନ୍ତୁ ସେମାନଙ୍କର ଡାଟା ଡିରେକ୍ଟୋରୀ, କିମ୍ବା `exec` ଘୋଷଣା ନକରି ପ୍ରକ୍ରିୟା। ପ୍ଲଗଇନ୍ରେ ଥିବା ପତାକା ସହିତ ନେଟୱର୍କ ପ୍ରବେଶକୁ ରଖେ ଏବଂ OmniRoute ବ୍ୟବହାରକାରୀ ଭାବରେ ଚାଲିଥାଏ, ତେଣୁ କେବଳ ପ୍ଲଗଇନ୍ ସଂସ୍ଥାପନ କର ଯାହାର ଉତ୍ସ ଉପରେ ତୁମେ ବିଶ୍ୱାସ କର।

## କନଫିଗ୍ ସ୍କିମା

କନଫିଗର୍ କରାଯାଇପାରୁଥିବା ସେଟିଂସ୍ଗୁଡ଼ିକୁ `configSchema`ରେ ପରିଭାଷିତ କରନ୍ତୁ:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "ବାହ୍ୟ API କୀ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ଫିଲ୍ଡ ପ୍ରକାରଗୁଡ଼ିକ: `string`, `number`, `boolean`, `select`

ଫିଲ୍ଡ ବିକଳ୍ପଗୁଡ଼ିକ: `default`, `min`, `max`, `enum`, `description`

କନଫିଗ୍ ମୂଲ୍ୟଗୁଡ଼ିକ ଡାଟାବେସ୍ରେ ସ୍ଥାୟୀ ଭାବରେ ସଂରକ୍ଷିତ ହୁଏ ଏବଂ ଡ୍ୟାସ୍ବୋର୍ଡ କନଫିଗ୍ ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଆକ୍ସେସ୍ କରାଯାଇପାରେ।

## ବିଲ୍ଟ-ଇନ୍ ଇଭେଣ୍ଟଗୁଡ଼ିକ

| ଇଭେଣ୍ଟ            | କେତେବେଳେ                                                  | ପେଲୋଡ୍                        |
| ----------------- | --------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ଚାଟ୍ ହ୍ୟାଣ୍ଡଲର୍ ପୂର୍ବରୁ                                   | ଅନୁରୋଧ ପ୍ରସଙ୍ଗ                |
| `onResponse`      | ଚାଟ୍ ହ୍ୟାଣ୍ଡଲର୍ ପରେ                                       | ପ୍ରତିକ୍ରିୟା ଡାଟା              |
| `onError`         | ହ୍ୟାଣ୍ଡଲର୍ ତ୍ରୁଟି ସମୟରେ                                   | ତ୍ରୁଟି ଅବଜେକ୍ଟ                |
| `onModelSelect`   | ରାଉଟିଂ ପାଇଁ ମଡେଲ୍ ଚୟନ ହେଲେ                                | ମଡେଲ୍ ସୂଚନା                   |
| `onComboResolve`  | କମ୍ବୋ ରାଉଟିଂ ସମାଧାନ ହେଲେ                                  | କମ୍ବୋ ଲକ୍ଷ୍ୟଗୁଡ଼ିକ            |
| `onRateLimit`     | ରେଟ୍ ସୀମାରେ ପହଞ୍ଚିଲେ                                      | ସୀମା ସୂଚନା                    |
| `onQuotaExhaust`  | କୋଟା ଶେଷ ହେଲେ                                             | କୋଟା ସୂଚନା                    |
| `onProviderError` | ପ୍ରଦାନକାରୀ ତ୍ରୁଟି ଫେରାଇଲେ                                 | ତ୍ରୁଟି ବିବରଣୀ                 |
| `onStreamStart`   | SSE ଷ୍ଟ୍ରିମ୍ ଆରମ୍ଭ ହେଲେ                                   | ଷ୍ଟ୍ରିମ୍ ସୂଚନା                |
| `onStreamEnd`     | SSE ଷ୍ଟ୍ରିମ୍ ଶେଷ ହେଲେ                                     | ଷ୍ଟ୍ରିମ୍ ପରିସଂଖ୍ୟାନ           |
| `onInstall`       | ପ୍ଲଗଇନ୍ ଇନ୍ଷ୍ଟଲ୍ ହେଲେ                                     | `{ name, version, manifest }` |
| `onActivate`      | ପ୍ଲଗଇନ୍ ସକ୍ରିୟ ହେଲେ                                       | `{ name, version, manifest }` |
| `onDeactivate`    | ପ୍ଲଗଇନ୍ ନିଷ୍କ୍ରିୟ ହେଲେ                                    | `{ name, version, manifest }` |
| `onUninstall`     | ପ୍ଲଗଇନ୍ ଅନ୍ଇନ୍ଷ୍ଟଲ୍ ହେଲେ (ଫାଇଲ୍ଗୁଡ଼ିକ ବିଲୋପ ହେବା ପୂର୍ବରୁ) | `{ name, version, manifest }` |

## ଉଦାହରଣଗୁଡିକ

### ଲଗର୍ ଅନୁରୋଧ।

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ରେଟ୍ ସୀମା

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

### ପ୍ରତିକ୍ରିୟା ଟ୍ରାନ୍ସଫର୍ମର।

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
