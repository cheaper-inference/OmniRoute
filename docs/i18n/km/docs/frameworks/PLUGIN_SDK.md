# OmniRoute Plugin SDK (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ចាប់ផ្តើមរហ័ស

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

## API ឯកសារយោង

### `definePlugin(def: PluginDefinition): Plugin`

មុខងាររោងចក្រដែលបង្កើតវត្ថុកម្មវិធីជំនួយជាមួយលំនាំដើម។

**ប៉ារ៉ាម៉ែត្រ៖**

- `name` (ខ្សែអក្សរ, ទាមទារ) — ឈ្មោះកម្មវិធីជំនួយក្នុង kebab-case
- `priority` (ចំនួន ស្រេចចិត្ត លំនាំដើម៖ 100) — ដំណើរការទាបជាងមុន។
- `enabled` (ប៊ូលីន ស្រេចចិត្ត លំនាំដើម៖ ពិត) — ចាប់ផ្តើមបើកដំណើរការ?
- `onRequest` (មុខងារ ជាជម្រើស) — ដំណើរការមុនពេលអ្នកដោះស្រាយការជជែក
- `onResponse` (មុខងារ ជាជម្រើស) — ដំណើរការបន្ទាប់ពីអ្នកដោះស្រាយការជជែក
- `onError` (អនុគមន៍ ជាជម្រើស) — ដំណើរការលើបញ្ហាអ្នកដោះស្រាយ

### `blockRequest(response?): BlockingHookResult`

រារាំងសំណើរ ហើយត្រឡប់ជាជម្រើសវិញនូវការឆ្លើយតបផ្ទាល់ខ្លួន។

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

កែប្រែផ្នែកសំណើ មុនពេលវាទៅដល់អ្នកផ្តល់សេវា។

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ភ្ជាប់ទិន្នន័យមេតាទៅបរិបទសំណើ។

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## បរិបទកម្មវិធីជំនួយ (`PluginContext`)

| វាល          | ប្រភេទ                    | ការពិពណ៌នា                          |
| ------------ | ------------------------- | ----------------------------------- |
| `requestId`  | `string`                  | ការកំណត់អត្តសញ្ញាណសំណើតែមួយគត់      |
| `model`      | `string`                  | ឈ្មោះម៉ូដែលដែលបានស្នើសុំ            |
| `provider`   | `string`                  | អ្នកផ្តល់គោលដៅ ID                   |
| `body`       | `Record<string, unknown>` | ស្នើសុំរាងកាយ                       |
| `headers`    | `Record<string, string>`  | ស្នើសុំចំណងជើង (សូមមើលកំណត់ចំណាំ)   |
| `metadata`   | `Record<string, unknown>` | ទិន្នន័យមេតាដែលអាចផ្លាស់ប្តូរបាន។   |
| `timestamp`  | `number`                  | ស្នើសុំត្រាពេលវេលា                  |
| `apiKeyInfo` | `object` (ស្រេចចិត្ត)     | ទិន្នន័យមេតាគន្លឹះAPI (សូមមើលចំណាំ) |

បរិបទមិនដែលយកព័ត៌មានសម្ងាត់របស់អតិថិជនទេ៖ បឋមកថា `authorization`, `x-api-key`, `proxy-authorization` និង `cookie` ត្រូវបានយកចេញ (ប្រអប់ណាមួយ) ហើយ `apiKeyInfo` រក្សាទិន្នន័យមេតារបស់សោ (ដូចជា `id`, `name` និង `scopes`) ប៉ុន្តែមិនមែនតម្លៃសោ ឬស្នាមម្រាមដៃរបស់វា (`redactPluginContext()` ក្នុង `src/lib/plugins/hooks.ts`) ទេ។ នេះអនុវត្តចំពោះ `onRequest`, `onResponse` និង `onError`។

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

### អាទិភាព Hook

Hook អាចត្រូវបានកំណត់រចនាសម្ព័ន្ធជាមួយនឹងអាទិភាព (តម្លៃទាបជាង = ដំណើរការមុន)៖

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ឬជាតម្លៃ boolean ធម្មតា (អាទិភាពលំនាំដើម 100)៖

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ប្រព័ន្ធអនុញ្ញាត

តាមលំនាំដើមកម្មវិធីជំនួយគឺ** មិនមែនជាប្រអប់ខ្សាច់ទេ។** . កម្មវិធីជំនួយសកម្មនីមួយៗដំណើរការជាដំណើរការកូន Node.js ធម្មតាដាច់ដោយឡែកមួយ (`loadPlugin()` in `src/lib/plugins/loader.ts`) ក្រោមអ្នកប្រើប្រាស់ប្រព័ន្ធប្រតិបត្តិការដូចគ្នាជាមួយ OmniRoute ដោយគ្មានបរិបទ VM និងគ្មានទង់ការអនុញ្ញាត Node.js ។ កូដកម្មវិធីជំនួយអាចប្រើ `node:fs`, `node:child_process`, `fetch` និង Node.js API ផ្សេងទៀត៖ វាអាចអាន និងសរសេរឯកសារណាមួយដែលអ្នកប្រើប្រាស់ OmniRoute អាច (រួមទាំងថតទិន្នន័យ) ដំណើរការកម្មវិធី និងទៅដល់បណ្តាញ។

`requires.permissions` របស់ manifest ទទួលយក `network`, `file-read`, `file-write`, `env` និង `exec`។ ជាមួយនឹងការកំណត់លំនាំដើមមានតែ `env` ប៉ុណ្ណោះដែលមានឥទ្ធិពលនៅពេលដំណើរការ។

### ជ្រើសរើសម៉ូដែលអនុញ្ញាត (`PLUGIN_PERMISSION_MODEL_ENABLED`)

ទង់លក្ខណៈ `PLUGIN_PERMISSION_MODEL_ENABLED` (ប្រភេទ `security`,** បិទតាមលំនាំដើម** ) ចាប់ផ្តើមដំណើរការកម្មវិធីជំនួយនីមួយៗជាមួយនឹង [គំរូការអនុញ្ញាត Node.js](https://nodejs.org/api/permissions.html) (`--permission` ទទួលយកដោយរាល់បន្ទាត់ Node.js ដែលគាំទ្រ៖ 22.22 + 24 និង 26)។ ទង់ជាតិត្រូវបានបង្កើតឡើងពីការបង្ហាញដោយ `buildPermissionModelArgs()` ក្នុង `src/lib/plugins/permissionModel.ts`។ ទង់ត្រូវបានអាននៅពេលដែលកម្មវិធីជំនួយត្រូវបានធ្វើឱ្យសកម្ម ដូច្នេះវាអនុវត្តចំពោះកម្មវិធីជំនួយដែលបានធ្វើឱ្យសកម្មបន្ទាប់ពីការផ្លាស់ប្តូរ។ អសកម្ម និងធ្វើឱ្យកម្មវិធីជំនួយដែលកំពុងដំណើរការ ដើម្បីអនុវត្តវា។

ថតទិន្នន័យកម្មវិធីជំនួយគឺ `plugin-data/<plugin-name>` នៅជាប់នឹងឫសកម្មវិធីជំនួយ (`~/.omniroute/plugin-data/<plugin-name>` តាមលំនាំដើម `getPluginDataDir()`) ។ ជាមួយនឹងទង់ជាតិនៅលើ ផ្លូវរបស់វាត្រូវបានបញ្ជូនទៅកម្មវិធីជំនួយជា `PLUGIN_DATA_DIR`។

| ការអនុញ្ញាត  | បិទទង់ជាតិ (លំនាំដើម)                                                                                                                                                                                                                     | ដាក់ទង់                                                                                                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (គ្មាន)      | សិទ្ធិពេញលេញរបស់អ្នកប្រើ OmniRoute ។                                                                                                                                                                                                      | ឯកសារអានតែនៅក្នុងថតកម្មវិធីជំនួយប៉ុណ្ណោះ។ គ្មានឯកសារសរសេរ គ្មានដំណើរការកុមារ គ្មានខ្សែស្រឡាយកម្មករ គ្មានកម្មវិធីបន្ថែមដើម គ្មាន WASI។                                                                                                               |
| `env`        | ដំណើរការកម្មវិធីជំនួយក៏ទទួលបាន `PORT`, `HOSTNAME`, `TZ` និង `TMPDIR` ផងដែរ។ បើគ្មានវាទេ វាទទួលបានតែ `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` និង `PLUGIN_NAME` (បូក `SystemRoot` និង `windir` នៅលើ Windows) ។ | ដូចគ្នានឹងការបិទទង់ជាតិដែរ។                                                                                                                                                                                                                         |
| `file-read`  | គ្មាន (ការប្រកាសតែប៉ុណ្ណោះ) ។                                                                                                                                                                                                             | ថតទិន្នន័យកម្មវិធីជំនួយក៏អាចអានបានដែរ (វាត្រូវបានបង្កើតប្រសិនបើបាត់)។                                                                                                                                                                               |
| `file-write` | គ្មាន (ការប្រកាសតែប៉ុណ្ណោះ) ។                                                                                                                                                                                                             | ថតទិន្នន័យកម្មវិធីជំនួយក្លាយជាអាចអានបាន និងអាចសរសេរបាន (`--allow-fs-write`)។ គ្មានអ្វីផ្សេងទៀតអាចសរសេរបានទេ។                                                                                                                                        |
| `exec`       | គ្មាន (ការប្រកាសតែប៉ុណ្ណោះ) ។                                                                                                                                                                                                             | ដំណើរការកុមារត្រូវបានអនុញ្ញាត (`--allow-child-process`) ។ Node.js បញ្ជូនទង់ការអនុញ្ញាតទៅដំណើរការ Node.js របស់កុមារតាមរយៈ `NODE_OPTIONS` ប៉ុន្តែកម្មវិធីណាមួយផ្សេងទៀតដំណើរការដោយគ្មានដែនកំណត់ ដូច្នេះ `exec` មានប្រសិទ្ធភាពលើកដែនកំណត់ប្រព័ន្ធឯកសារ។ |
| `network`    | គ្មាន (ការប្រកាសតែប៉ុណ្ណោះ) ។                                                                                                                                                                                                             | គ្មាន។ គំរូការអនុញ្ញាត Node.js មិនដាក់កម្រិតការចូលប្រើបណ្តាញខាងក្រៅទេ ដូច្នេះ `network` រក្សាការប្រកាស ហើយមិនត្រូវបានអនុវត្តទេ។                                                                                                                     |

ការបើកទង់នៅលើបំបែកកម្មវិធីជំនួយដែលអានឯកសារនៅខាងក្រៅថតផ្ទាល់ខ្លួនរបស់ពួកគេ (ឧទាហរណ៍ម៉ូឌុលដែលបានដោះស្រាយពី `node_modules` មេ) សរសេរកន្លែងណាក៏ដោយលើកលែងតែថតទិន្នន័យរបស់ពួកគេ ឬដំណើរការបង្កើតពងដោយមិនប្រកាស `exec`។ ទោះបីជាមានទង់នៅលើកម្មវិធីជំនួយរក្សាការចូលប្រើបណ្តាញ និងដំណើរការជាអ្នកប្រើប្រាស់ OmniRoute ដូច្នេះដំឡើងតែកម្មវិធីជំនួយប្រភពដែលអ្នកទុកចិត្តប៉ុណ្ណោះ។

## គ្រោងការកំណត់រចនាសម្ព័ន្ធ

កំណត់ការកំណត់ដែលអាចកែប្រែបានក្នុង `configSchema`៖

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "សោ API ខាងក្រៅ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ប្រភេទវាល៖ `string`, `number`, `boolean`, `select`

ជម្រើសវាល៖ `default`, `min`, `max`, `enum`, `description`

តម្លៃកំណត់រចនាសម្ព័ន្ធត្រូវបានរក្សាទុកក្នុងមូលដ្ឋានទិន្នន័យ និងអាចចូលប្រើបានតាមរយៈទំព័រកំណត់រចនាសម្ព័ន្ធនៃផ្ទាំងគ្រប់គ្រង។

## ព្រឹត្តិការណ៍ដែលមានស្រាប់

| ព្រឹត្តិការណ៍     | ពេលកើតឡើង                                            | ទិន្នន័យភ្ជាប់                |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | មុនកម្មវិធីដោះស្រាយការជជែក                           | បរិបទសំណើ                     |
| `onResponse`      | បន្ទាប់ពីកម្មវិធីដោះស្រាយការជជែក                     | ទិន្នន័យឆ្លើយតប               |
| `onError`         | នៅពេលមានកំហុសក្នុងកម្មវិធីដោះស្រាយ                   | វត្ថុកំហុស                    |
| `onModelSelect`   | ម៉ូដែលត្រូវបានជ្រើសរើសសម្រាប់ការបញ្ជូនផ្លូវ          | ព័ត៌មានម៉ូដែល                 |
| `onComboResolve`  | ការបញ្ជូនផ្លូវបែបបន្សំត្រូវបានដោះស្រាយ               | គោលដៅបែបបន្សំ                 |
| `onRateLimit`     | ឈានដល់ដែនកំណត់អត្រា                                  | ព័ត៌មានអំពីដែនកំណត់           |
| `onQuotaExhaust`  | កូតាត្រូវបានប្រើអស់                                  | ព័ត៌មានអំពីកូតា               |
| `onProviderError` | អ្នកផ្តល់សេវាបានបញ្ជូនកំហុសត្រឡប់មកវិញ               | សេចក្ដីលម្អិតអំពីកំហុស        |
| `onStreamStart`   | ស្ទ្រីម SSE បានចាប់ផ្ដើម                             | ព័ត៌មានអំពីស្ទ្រីម            |
| `onStreamEnd`     | ស្ទ្រីម SSE បានបញ្ចប់                                | ស្ថិតិស្ទ្រីម                 |
| `onInstall`       | កម្មវិធីជំនួយត្រូវបានដំឡើង                           | `{ name, version, manifest }` |
| `onActivate`      | កម្មវិធីជំនួយត្រូវបានធ្វើឱ្យសកម្ម                    | `{ name, version, manifest }` |
| `onDeactivate`    | កម្មវិធីជំនួយត្រូវបានធ្វើឱ្យអសកម្ម                   | `{ name, version, manifest }` |
| `onUninstall`     | កម្មវិធីជំនួយត្រូវបានលុបចេញ (មុនពេលឯកសារត្រូវបានលុប) | `{ name, version, manifest }` |

## ឧទាហរណ៍

### ស្នើសុំអ្នកកាប់ឈើ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ដែនកំណត់អត្រា

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

### Transformer ឆ្លើយតប

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
