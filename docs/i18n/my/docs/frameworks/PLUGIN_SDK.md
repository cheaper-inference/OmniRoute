# OmniRoute Plugin SDK (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## အမြန်စတင်ပါ။

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

## API အကား

### `definePlugin(def: PluginDefinition): Plugin`

ပုံသေများဖြင့် Plugin အရာဝတ္ထုကို ဖန်တီးပေးသည့် Factory Function

**ကန့်သတ်ချက်များ-**

- kebab-case တွင်`name` (string၊ လိုအပ်သည်) — ပလပ်အင်အမည်
- `priority` (နံပါတ်၊ ရွေးချယ်နိုင်သည်၊ ပုံသေ- 100) — အောက်ပိုင်းသည် ပထမဆုံး လုပ်ဆောင်သည်။
- `enabled` (boolean၊ ရွေးချယ်နိုင်သည်၊ ပုံသေ- မှန်) — စတင်ဖွင့်ထားမလား။
- `onRequest` (function၊ optional) — သည် chat handler မတိုင်မီ လုပ်ဆောင်သည်။
- `onResponse` (function၊ optional) — သည် chat handler ပြီးနောက် လုပ်ဆောင်သည်။
- `onError` (function၊ optional) — သည် handler error တွင်အလုပ်လုပ်သည်။

### `blockRequest(response?): BlockingHookResult`

တောင်းဆိုမှုကို ပိတ်ဆို့ပြီး စိတ်ကြိုက် တုံ့ပြန်မှုကို ရွေးချယ်နိုင်သည်။

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

ဝန်ဆောင်မှုပေးသူထံ မရောက်ရှိမီ တောင်းဆိုချက်ကိုယ်ထည်ကို ပြင်ဆင်ပါ။

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

တောင်းဆိုချက်အကြောင်းအရာတွင် မက်တာဒေတာကို ပူးတွဲပါ။

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ပလပ်အင် အကြောင်းအရာ (`PluginContext`)

| လယ်ကွင်း     | ရိုက်ပါ။                       | ဖော်ပြချက်                                        |
| ------------ | ------------------------------ | ------------------------------------------------- |
| `requestId`  | `string`                       | သီးသန့်တောင်းဆိုမှု အထောက်အထား                    |
| `model`      | `string`                       | မော်ဒယ်အမည်ကို တောင်းဆိုထားသည်။                   |
| `provider`   | `string`                       | ပစ်မှတ်ပံ့ပိုးသူ ID                               |
| `body`       | `Record<string, unknown>`      | ခန္ဓာကိုယ်ကို တောင်းဆိုပါ။                        |
| `headers`    | `Record<string, string>`       | ခေါင်းစီးများကို တောင်းဆိုပါ (မှတ်ချက်ကိုကြည့်ပါ) |
| `metadata`   | `Record<string, unknown>`      | ပြောင်းလဲနိုင်သော မက်တာဒေတာ                       |
| `timestamp`  | `number`                       | အချိန်တံဆိပ်ကို တောင်းဆိုပါ။                      |
| `apiKeyInfo` | `object` (ချန်လှပ်ထားနိုင်သည်) | API သော့မက်တာဒေတာ (မှတ်ချက်ကိုကြည့်ပါ)            |

အကြောင်းအရာသည် ကလိုင်းယင့်၏အထောက်အထားများကို ဘယ်သောအခါမှ မသယ်ဆောင်ပါ- `authorization`၊ `x-api-key`၊ `proxy-authorization` နှင့် `cookie` ခေါင်းစီးများကို ဖယ်ရှားလိုက်သည် (မည်သည့်အကွက်မဆို)၊ `apiKeyInfo` သော့၏မက်တာဒေတာ (ဥပမာ `id`၊ `name` နှင့် `scopes` ကဲ့သို့) သော့တန်ဖိုး သို့မဟုတ် ၎င်း၏လက်ဗွေ (`redactPluginContext()` in `src/lib/plugins/hooks.ts`) ကို သိမ်းဆည်းထားသည်။ ၎င်းသည် `onRequest`၊ `onResponse` နှင့် `onError` တို့နှင့် သက်ဆိုင်သည်။

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

### Hook ဦးစားပေးအဆင့်

Hook များကို ဦးစားပေးအဆင့်ဖြင့် သတ်မှတ်နိုင်သည် (တန်ဖိုးနိမ့်လေလေ = ဦးစွာ လုပ်ဆောင်လေလေ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

သို့မဟုတ် ရိုးရှင်းသော boolean တန်ဖိုးများအဖြစ် သတ်မှတ်နိုင်သည် (မူလဦးစားပေးအဆင့် 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ခွင့်ပြုချက်စနစ်

ပုံမှန်အားဖြင့် Plugins များဖြစ်သည်။** sandboxed မဟုတ်ပါ။** . တက်ကြွသောပလပ်အင်တစ်ခုစီသည် သီးခြား Node.js ကလေးလုပ်ငန်းစဉ် (`loadPlugin()` in `src/lib/plugins/loader.ts`) အဖြစ် OmniRoute ကဲ့သို့ တူညီသောလည်ပတ်မှုစနစ်အသုံးပြုသူအောက်တွင် VM ဆက်စပ်မှုမရှိဘဲ Node.js ခွင့်ပြုချက်အလံများမပါရှိပါ။ ပလပ်အင်ကုဒ်သည် `node:fs`, `node:child_process`, `fetch` နှင့် အခြား Node.js API အားလုံးကို သုံးနိုင်သည် - ၎င်းသည် OmniRoute အသုံးပြုသူ (ဒေတာလမ်းညွှန်အပါအဝင်)၊ ပရိုဂရမ်များကိုဖွင့်ပြီး ကွန်ရက်သို့ရောက်ရှိနိုင်သည့် မည်သည့်ဖိုင်ကိုမဆို ဖတ်နိုင်၊ ရေးနိုင်သည်။

manifest ၏ `requires.permissions` `network`, `file-read`, `file-write`, `env` နှင့် `exec` ကို လက်ခံသည်။ မူရင်းဆက်တင်များဖြင့် `env` runtime တွင်သာအကျိုးသက်ရောက်မှုရှိသည်။

### ရွေးချယ်ခွင့် မော်ဒယ် (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` အင်္ဂါရပ်အလံ (အမျိုးအစား `security`၊** ပုံသေအားဖြင့် ပိတ်သည်။** ) သည် [Node.js ခွင့်ပြုချက်ပုံစံ](https://nodejs.org/api/permissions.html) (`--permission`၊ ပံ့ပိုးထားသော Node.js လိုင်းတိုင်းမှ လက်ခံသည်- 22.22 +၊ 24 နှင့် 26) ဖြင့် plugin လုပ်ငန်းစဉ်တစ်ခုစီကို စတင်သည်။ အလံများကို `buildPermissionModelArgs()` ဖြင့် `src/lib/plugins/permissionModel.ts` ဖြင့် manifest မှတည်ဆောက်ထားသည်။ ပလပ်အင်ကို အသက်သွင်းသောအခါတွင် အလံကို ဖတ်ရသောကြောင့် ၎င်းသည် ပြောင်းလဲပြီးနောက်တွင် အသက်သွင်းထားသော ပလပ်အင်များနှင့် သက်ဆိုင်ပါသည်။ ၎င်းကိုအသုံးပြုရန် လည်ပတ်နေသော ပလပ်အင်ကို ပိတ်ပြီး အသက်သွင်းပါ။

ပလပ်အင်ဒေတာလမ်းညွှန်သည် ပလပ်အင်အမြစ်၏ဘေးတွင် `plugin-data/<plugin-name>` ဖြစ်သည် (ပုံမှန်အားဖြင့်`~/.omniroute/plugin-data/<plugin-name>` ၊ `getPluginDataDir()`)။ အလံဖွင့်ထားခြင်းဖြင့် ၎င်း၏လမ်းကြောင်းသည် `PLUGIN_DATA_DIR` အဖြစ် plugin သို့ ရောက်သွားပါသည်။

| ခွင့်ပြုချက် | အလံပိတ် (မူလ)                                                                                                                                                                                                                                                      | အလံတင်                                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (တစ်ခုမှ)    | OmniRoute အသုံးပြုသူ၏အခွင့်အရေး အပြည့်အစုံ။                                                                                                                                                                                                                        | ဖိုင်သည် plugin directory အတွင်းသာဖတ်သည်။ ဖိုင်မရေးရ၊ ကလေးလုပ်ငန်းစဉ်များမရှိ၊ အလုပ်သမားစာတွဲများမရှိ၊ မူရင်း addons မရှိ၊ WASI မရှိပါ။                                                                                                                                                                             |
| `env`        | plugin လုပ်ငန်းစဉ်သည် `PORT`၊ `HOSTNAME`၊ `TZ` နှင့် `TMPDIR` တို့ကိုလည်း လက်ခံရရှိသည် ။ ၎င်းမရှိဘဲ၊ ၎င်းသည် `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` နှင့် `PLUGIN_NAME` (plus `SystemRoot` နှင့် `windir` on Windows) ကိုသာ ရရှိသည်။ | အလံပိတ်တာနဲ့ အတူတူပါပဲ။                                                                                                                                                                                                                                                                                             |
| `file-read`  | မရှိ (ကြေငြာချက်သာ)။                                                                                                                                                                                                                                               | ပလပ်အင်ဒေတာလမ်းညွှန်သည်လည်း ဖတ်နိုင်ဖြစ်လာသည် (ပျောက်ဆုံးပါက ဖန်တီးထားသည်)။                                                                                                                                                                                                                                         |
| `file-write` | မရှိ (ကြေငြာချက်သာ)။                                                                                                                                                                                                                                               | ပလပ်အင်ဒေတာလမ်းညွှန်သည် ဖတ်နိုင်၊ ရေးနိုင်သော (`--allow-fs-write`) ဖြစ်လာသည်။ တခြားဘာမှ ရေးလို့မရဘူး။                                                                                                                                                                                                               |
| `exec`       | မရှိ (ကြေငြာချက်သာ)။                                                                                                                                                                                                                                               | ကလေးလုပ်ငန်းစဉ်များကို ခွင့်ပြုထားသည် (`--allow-child-process`)။ Node.js `NODE_OPTIONS` မှတဆင့် ကလေး Node.js လုပ်ငန်းစဉ်များသို့ ခွင့်ပြုချက်အလံများကို ဖြတ်သန်းသည်၊ သို့သော် အခြားမည်သည့်ပရိုဂရမ်မဆို ကန့်သတ်ချက်များမရှိဘဲ လုပ်ဆောင်သောကြောင့် `exec` ဖိုင်စနစ်ကန့်သတ်ချက်များကို ထိထိရောက်ရောက် ဖယ်ရှားပေးပါသည်။ |
| `network`    | မရှိ (ကြေငြာချက်သာ)။                                                                                                                                                                                                                                               | တစ်ခုမှ Node.js ခွင့်ပြုချက်မော်ဒယ်သည် ပြင်ပကွန်ရက်ဝင်ရောက်ခွင့်ကို ကန့်သတ်မထားသောကြောင့် `network` ကြေငြာချက်တစ်ခုအဖြစ် ဆက်လက်တည်ရှိနေပြီး မည်သည့်အခါမျှ ကျင့်သုံးမည်မဟုတ်ပါ။                                                                                                                                      |

အလံကိုဖွင့်ခြင်းသည် ၎င်းတို့၏ကိုယ်ပိုင်လမ်းညွှန်အပြင်ဘက်ရှိ ဖိုင်များကိုဖတ်သည့်ပလပ်အင်များကို ဖြတ်တောက်ခြင်း (ဥပမာ၊ မိဘ `node_modules` မှဖြေရှင်းထားသော module တစ်ခု)၊ ၎င်းတို့၏ဒေတာလမ်းညွှန်မှလွဲ၍ မည်သည့်နေရာတွင်မဆိုရေးပါ သို့မဟုတ် `exec` မကြေငြာဘဲ ပေါက်ပွားသည့်လုပ်ငန်းစဉ်များကို ဖျက်သည်။ ပလပ်အင်ပေါ်ရှိ အလံဖြင့်ပင် ကွန်ရက်ဝင်ရောက်ခွင့်ကို ထိန်းထားကာ OmniRoute အသုံးပြုသူအဖြစ် လုပ်ဆောင်နေသောကြောင့် သင်ယုံကြည်ရသော အရင်းအမြစ်၏ ပလပ်အင်များကိုသာ ထည့်သွင်းပါ။

## Config Schema

ပြင်ဆင်သတ်မှတ်နိုင်သော ဆက်တင်များကို `configSchema` တွင် သတ်မှတ်ပါ-

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "ပြင်ပ API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Field အမျိုးအစားများ- `string`, `number`, `boolean`, `select`

Field ရွေးချယ်စရာများ- `default`, `min`, `max`, `enum`, `description`

Config တန်ဖိုးများကို database ထဲတွင် သိမ်းဆည်းထားပြီး dashboard config စာမျက်နှာမှတစ်ဆင့် အသုံးပြုနိုင်သည်။

## ထည့်သွင်းပေးထားသော Event များ

| Event             | ဖြစ်ပွားချိန်                          | Payload                       |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | Chat handler မတိုင်မီ                  | Request context               |
| `onResponse`      | Chat handler ပြီးနောက်                 | Response data                 |
| `onError`         | Handler error ဖြစ်ပေါ်ချိန်            | Error object                  |
| `onModelSelect`   | Routing အတွက် model ရွေးချယ်သည့်အချိန် | Model အချက်အလက်               |
| `onComboResolve`  | Combo routing ဖြေရှင်းပြီးချိန်        | Combo target များ             |
| `onRateLimit`     | Rate limit ပြည့်သွားချိန်              | Limit အချက်အလက်               |
| `onQuotaExhaust`  | Quota ကုန်ဆုံးချိန်                    | Quota အချက်အလက်               |
| `onProviderError` | Provider က error ပြန်ပေးချိန်          | Error အသေးစိတ်                |
| `onStreamStart`   | SSE stream စတင်ချိန်                   | Stream အချက်အလက်              |
| `onStreamEnd`     | SSE stream ပြီးဆုံးချိန်               | Stream စာရင်းအင်း             |
| `onInstall`       | Plugin ထည့်သွင်းပြီးချိန်              | `{ name, version, manifest }` |
| `onActivate`      | Plugin ကို အသက်သွင်းချိန်              | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin ကို ပိတ်ချိန်                   | `{ name, version, manifest }` |
| `onUninstall`     | Plugin ဖယ်ရှားချိန် (ဖိုင်များမဖျက်မီ) | `{ name, version, manifest }` |

## ဥပမာများ

### Logger ကိုတောင်းဆိုပါ။

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### နှုန်းကန့်သတ်ချက်

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

### တုံ့ပြန်မှု Transformer

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
