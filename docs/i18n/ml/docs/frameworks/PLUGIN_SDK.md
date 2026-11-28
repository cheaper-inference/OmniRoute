# OmniRoute Plugin SDK (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ദ്രുത ആരംഭം

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

## API റഫറൻസ്

### `definePlugin(def: PluginDefinition): Plugin`

സ്ഥിരസ്ഥിതികളുള്ള ഒരു പ്ലഗിൻ ഒബ്ജക്റ്റ് സൃഷ്ടിക്കുന്ന ഫാക്ടറി പ്രവർത്തനം.

**പരാമീറ്ററുകൾ:**

- `name` (സ്ട്രിംഗ്, ആവശ്യമാണ്) — കബാബ് കേസിൽ പ്ലഗിൻ നാമം
- `priority` (നമ്പർ, ഓപ്ഷണൽ, ഡിഫോൾട്ട്: 100) — ലോവർ ആദ്യം പ്രവർത്തിക്കുന്നു
- `enabled` (ബൂളിയൻ, ഓപ്ഷണൽ, ഡിഫോൾട്ട്: ട്രൂ) — ആരംഭിക്കുക പ്രവർത്തനക്ഷമമാക്കിയോ?
- `onRequest` (പ്രവർത്തനം, ഓപ്ഷണൽ) — ചാറ്റ് ഹാൻഡ്ലറിന് മുമ്പ് പ്രവർത്തിക്കുന്നു
- `onResponse` (പ്രവർത്തനം, ഓപ്ഷണൽ) — ചാറ്റ് ഹാൻഡ്ലറിന് ശേഷം പ്രവർത്തിക്കുന്നു
- `onError` (ഫംഗ്ഷൻ, ഓപ്ഷണൽ) — ഹാൻഡ്ലർ പിശകിൽ പ്രവർത്തിക്കുന്നു

### `blockRequest(response?): BlockingHookResult`

അഭ്യർത്ഥന തടഞ്ഞ് ഓപ്ഷണലായി ഒരു ഇഷ്ടാനുസൃത പ്രതികരണം നൽകുക.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

അഭ്യർത്ഥന ബോഡി ദാതാവിൽ എത്തുന്നതിന് മുമ്പ് അത് പരിഷ്ക്കരിക്കുക.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

അഭ്യർത്ഥന സന്ദർഭത്തിലേക്ക് മെറ്റാഡാറ്റ അറ്റാച്ചുചെയ്യുക.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## പ്ലഗിൻ സന്ദർഭം (`PluginContext`)

| ഫീൽഡ്        | ടൈപ്പ് ചെയ്യുക            | വിവരണം                                  |
| ------------ | ------------------------- | --------------------------------------- |
| `requestId`  | `string`                  | അദ്വിതീയ അഭ്യർത്ഥന ഐഡൻ്റിഫയർ            |
| `model`      | `string`                  | മോഡലിൻ്റെ പേര് അഭ്യർത്ഥിച്ചു            |
| `provider`   | `string`                  | ടാർഗെറ്റ് പ്രൊവൈഡർ ID                   |
| `body`       | `Record<string, unknown>` | ശരീരം അഭ്യർത്ഥിക്കുക                    |
| `headers`    | `Record<string, string>`  | അഭ്യർത്ഥന തലക്കെട്ടുകൾ (കുറിപ്പ് കാണുക) |
| `metadata`   | `Record<string, unknown>` | മാറ്റാവുന്ന മെറ്റാഡാറ്റ                 |
| `timestamp`  | `number`                  | ടൈംസ്റ്റാമ്പ് അഭ്യർത്ഥിക്കുക            |
| `apiKeyInfo` | `object` (ഓപ്ഷണൽ)         | API കീ മെറ്റാഡാറ്റ (കുറിപ്പ് കാണുക)     |

സന്ദർഭം ഒരിക്കലും ക്ലയൻ്റിൻ്റെ ക്രെഡൻഷ്യലുകൾ വഹിക്കുന്നില്ല: `authorization`, `x-api-key`, `proxy-authorization`, `cookie` തലക്കെട്ടുകൾ നീക്കം ചെയ്യപ്പെടും (ഏതെങ്കിലും കേസിംഗ്), കൂടാതെ `apiKeyInfo` കീയുടെ മെറ്റാഡാറ്റ ( `id`, `name`, `scopes` പോലുള്ളവ) സൂക്ഷിക്കുന്നു, പക്ഷേ കീ മൂല്യമോ അതിൻ്റെ വിരലടയാളമോ അല്ല `src/lib/plugins/hooks.ts` `redactPluginContext()`. ഇത് `onRequest`, `onResponse`, `onError` എന്നിവയ്ക്ക് ബാധകമാണ്.

## മാനിഫെസ്റ്റ് (`plugin.json`)

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

### Hook മുൻഗണന

Hooks-ന് മുൻഗണന ക്രമീകരിക്കാം (കുറഞ്ഞ മൂല്യം = ആദ്യം പ്രവർത്തിക്കുന്നു):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

അല്ലെങ്കിൽ ലളിതമായ boolean മൂല്യങ്ങളായി നൽകാം (സ്ഥിര മുൻഗണന 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## അനുമതി സംവിധാനം

സ്ഥിരസ്ഥിതിയായി പ്ലഗിനുകൾ ആകുന്നു** സാൻഡ്ബോക്സ് ചെയ്തിട്ടില്ല** . ഓരോ സജീവ പ്ലഗിനും ഒരു പ്രത്യേക, സാധാരണ Node.js ചൈൽഡ് പ്രോസസായി ( `src/lib/plugins/loader.ts` ൽ `loadPlugin()` ) പ്രവർത്തിക്കുന്നു, OmniRoute അതേ ഓപ്പറേറ്റിംഗ് സിസ്റ്റം ഉപയോക്താവിന് കീഴിൽ, VM സന്ദർഭവും Node.js അനുമതി ഫ്ലാഗുകളും ഇല്ലാതെ. പ്ലഗിൻ കോഡിന് `node:fs`, `node:child_process`, `fetch` എന്നിവയും മറ്റെല്ലാ Node.js API ഉം ഉപയോഗിക്കാം: OmniRoute ഉപയോക്താവിന് (ഡാറ്റ ഡയറക്ടറി ഉൾപ്പെടെ) പ്രോഗ്രാമുകൾ പ്രവർത്തിപ്പിക്കാനും നെറ്റ്വർക്കിൽ എത്തിച്ചേരാനും കഴിയുന്ന ഏത് ഫയലും ഇതിന് വായിക്കാനും എഴുതാനും കഴിയും.

മാനിഫെസ്റ്റിൻ്റെ `requires.permissions` `network`, `file-read`, `file-write`, `env`, `exec` എന്നിവ സ്വീകരിക്കുന്നു. സ്വതവേയുള്ള ക്രമീകരണങ്ങളിൽ, റൺടൈമിൽ `env` മാത്രമേ ഫലമുണ്ടാകൂ.

### ഓപ്റ്റ്-ഇൻ അനുമതി മോഡൽ (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` ഫീച്ചർ ഫ്ലാഗ് (വിഭാഗം `security`,** സ്ഥിരസ്ഥിതിയായി ഓഫ്** ) [Node.js പെർമിഷൻ മോഡൽ](https://nodejs.org/api/permissions.html) ഉപയോഗിച്ച് ഓരോ പ്ലഗിൻ പ്രക്രിയയും ആരംഭിക്കുന്നു (`--permission`, പിന്തുണയ്ക്കുന്ന എല്ലാ Node.js ലൈനും അംഗീകരിക്കുന്നു: 22.22 +, 24 ഒപ്പം 26). പതാകകൾ മാനിഫെസ്റ്റിൽ നിന്ന് `buildPermissionModelArgs()` ൽ `src/lib/plugins/permissionModel.ts` കൊണ്ടാണ് നിർമ്മിച്ചിരിക്കുന്നത്. ഒരു പ്ലഗിൻ സജീവമാകുമ്പോൾ ഫ്ലാഗ് വായിക്കുന്നു, അതിനാൽ മാറ്റത്തിന് ശേഷം സജീവമാക്കിയ പ്ലഗിന്നുകൾക്ക് ഇത് ബാധകമാണ്; പ്രവർത്തിക്കുന്ന പ്ലഗിൻ നിർജ്ജീവമാക്കി സജീവമാക്കുക.

പ്ലഗിൻ റൂട്ടിന് അടുത്തുള്ള `plugin-data/<plugin-name>` ആണ് പ്ലഗിൻ ഡാറ്റ ഡയറക്ടറി (ഡിഫോൾട്ടായി`~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). ഫ്ലാഗ് ഓണായിരിക്കുമ്പോൾ, അതിൻ്റെ പാത `PLUGIN_DATA_DIR` ആയി പ്ലഗിനിലേക്ക് കൈമാറും.

| അനുമതി       | ഫ്ലാഗ് ഓഫ് (ഡിഫോൾട്ട്)                                                                                                                                                                                                                   | ഫ്ലാഗ് ഓൺ                                                                                                                                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (ഒന്നുമില്ല) | OmniRoute ഉപയോക്താവിൻ്റെ മുഴുവൻ പ്രത്യേകാവകാശങ്ങളും.                                                                                                                                                                                     | പ്ലഗിൻ ഡയറക്ടറിക്കുള്ളിൽ മാത്രമേ ഫയൽ വായിക്കൂ. ഫയലുകളൊന്നും എഴുതുന്നില്ല, ചൈൽഡ് പ്രോസസ്സുകളില്ല, വർക്കർ ത്രെഡുകളില്ല, നേറ്റീവ് ആഡോണുകളില്ല, WASI ഇല്ല .                                                                                                                              |
| `env`        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). | ഫ്ലാഗ് ഓഫ് ചെയ്തതുപോലെ തന്നെ.                                                                                                                                                                                                                                                        |
| `file-read`  | ഒന്നുമില്ല (പ്രഖ്യാപനം മാത്രം).                                                                                                                                                                                                          | പ്ലഗിൻ ഡാറ്റ ഡയറക്ടറിയും റീഡബിൾ ആയി മാറുന്നു (നഷ്ടപ്പെട്ടാൽ അത് സൃഷ്ടിക്കപ്പെടും).                                                                                                                                                                                                   |
| `file-write` | ഒന്നുമില്ല (പ്രഖ്യാപനം മാത്രം).                                                                                                                                                                                                          | പ്ലഗിൻ ഡാറ്റ ഡയറക്ടറി വായിക്കാവുന്നതും എഴുതാവുന്നതുമാണ് (`--allow-fs-write`). മറ്റൊന്നും എഴുതാനാവുന്നില്ല.                                                                                                                                                                           |
| `exec`       | ഒന്നുമില്ല (പ്രഖ്യാപനം മാത്രം).                                                                                                                                                                                                          | ശിശു പ്രക്രിയകൾ അനുവദനീയമാണ് (`--allow-child-process`). Node.js `NODE_OPTIONS` വഴി ചൈൽഡ് Node.js പ്രക്രിയകളിലേക്ക് അനുമതി ഫ്ലാഗുകൾ കൈമാറുന്നു, എന്നാൽ മറ്റേതെങ്കിലും പ്രോഗ്രാമുകൾ നിയന്ത്രണങ്ങളില്ലാതെ പ്രവർത്തിക്കുന്നു, അതിനാൽ `exec` ഫലപ്രദമായി ഫയൽ-സിസ്റ്റം പരിധികൾ ഉയർത്തുന്നു. |
| `network`    | ഒന്നുമില്ല (പ്രഖ്യാപനം മാത്രം).                                                                                                                                                                                                          | ഒന്നുമില്ല. Node.js പെർമിഷൻ മോഡൽ ഔട്ട്ബൗണ്ട് നെറ്റ്വർക്ക് ആക്സസ്സ് നിയന്ത്രിക്കുന്നില്ല, അതിനാൽ `network` ഒരു പ്രഖ്യാപനമായി തുടരുന്നു, അത് ഒരിക്കലും നടപ്പിലാക്കില്ല.                                                                                                                |

സ്വന്തം ഡയറക്ടറിക്ക് പുറത്തുള്ള ഫയലുകൾ വായിക്കുന്ന ബ്രേക്ക് പ്ലഗിനുകളിൽ ഫ്ലാഗ് ആക്കുന്നത് (ഉദാഹരണത്തിന് ഒരു പാരൻ്റ് `node_modules` യിൽ നിന്ന് പരിഹരിച്ച ഒരു മൊഡ്യൂൾ), അവരുടെ ഡാറ്റ ഡയറക്ടറി ഒഴികെ മറ്റെവിടെയെങ്കിലും എഴുതുക, അല്ലെങ്കിൽ `exec` പ്രഖ്യാപിക്കാതെ പ്രോസസ് സ്പോൺ ചെയ്യുക. പ്ലഗിനിലെ ഫ്ലാഗ് ഉപയോഗിച്ച് പോലും നെറ്റ്വർക്ക് ആക്സസ് നിലനിർത്തുകയും OmniRoute ഉപയോക്താവായി പ്രവർത്തിക്കുകയും ചെയ്യുന്നു, അതിനാൽ നിങ്ങൾ വിശ്വസിക്കുന്ന ഉറവിടം മാത്രം ഇൻസ്റ്റാൾ ചെയ്യുക.

## കോൺഫിഗ് സ്കീമ

കോൺഫിഗർ ചെയ്യാവുന്ന ക്രമീകരണങ്ങൾ `configSchema`-യിൽ നിർവചിക്കുക:

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

ഫീൽഡ് തരങ്ങൾ: `string`, `number`, `boolean`, `select`

ഫീൽഡ് ഓപ്ഷനുകൾ: `default`, `min`, `max`, `enum`, `description`

കോൺഫിഗ് മൂല്യങ്ങൾ ഡാറ്റാബേസിൽ നിലനിർത്തുകയും ഡാഷ്ബോർഡ് കോൺഫിഗ് പേജ് വഴി ആക്സസ് ചെയ്യാവുന്നതുമാണ്.

## ബിൽറ്റ്-ഇൻ ഇവന്റുകൾ

| ഇവന്റ്            | എപ്പോൾ                                                            | പേലോഡ്                        |
| ----------------- | ----------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ചാറ്റ് ഹാൻഡ്ലറിന് മുമ്പ്                                          | റിക്വസ്റ്റ് സന്ദർഭം           |
| `onResponse`      | ചാറ്റ് ഹാൻഡ്ലറിന് ശേഷം                                            | റെസ്പോൺസ് ഡാറ്റ               |
| `onError`         | ഹാൻഡ്ലർ പിശക് സംഭവിക്കുമ്പോൾ                                      | പിശക് ഒബ്ജക്റ്റ്              |
| `onModelSelect`   | റൂട്ടിങ്ങിനായി മോഡൽ തിരഞ്ഞെടുക്കുമ്പോൾ                            | മോഡൽ വിവരങ്ങൾ                 |
| `onComboResolve`  | കോംബോ റൂട്ടിങ് പരിഹരിക്കപ്പെടുമ്പോൾ                               | കോംബോ ലക്ഷ്യങ്ങൾ              |
| `onRateLimit`     | നിരക്ക് പരിധിയിലെത്തുമ്പോൾ                                        | പരിധി വിവരങ്ങൾ                |
| `onQuotaExhaust`  | ക്വാട്ട തീരുമ്പോൾ                                                 | ക്വാട്ട വിവരങ്ങൾ              |
| `onProviderError` | പ്രൊവൈഡർ പിശക് തിരികെ നൽകുമ്പോൾ                                   | പിശക് വിശദാംശങ്ങൾ             |
| `onStreamStart`   | SSE സ്ട്രീം ആരംഭിക്കുമ്പോൾ                                        | സ്ട്രീം വിവരങ്ങൾ              |
| `onStreamEnd`     | SSE സ്ട്രീം അവസാനിക്കുമ്പോൾ                                       | സ്ട്രീം സ്ഥിതിവിവരക്കണക്കുകൾ  |
| `onInstall`       | പ്ലഗിൻ ഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ                                      | `{ name, version, manifest }` |
| `onActivate`      | പ്ലഗിൻ സജീവമാക്കുമ്പോൾ                                            | `{ name, version, manifest }` |
| `onDeactivate`    | പ്ലഗിൻ നിർജ്ജീവമാക്കുമ്പോൾ                                        | `{ name, version, manifest }` |
| `onUninstall`     | പ്ലഗിൻ അൺഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ (ഫയലുകൾ ഇല്ലാതാക്കുന്നതിന് മുമ്പ്) | `{ name, version, manifest }` |

## ഉദാഹരണങ്ങൾ

### ലോഗർ അഭ്യർത്ഥിക്കുക

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### നിരക്ക് പരിധി

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

### പ്രതികരണ ട്രാൻസ്ഫോർമർ

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
