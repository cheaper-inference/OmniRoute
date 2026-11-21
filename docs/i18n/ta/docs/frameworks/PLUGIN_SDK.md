# OmniRoute Plugin SDK (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## விரைவு தொடக்கம்

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

## API குறிப்பு

### `definePlugin(def: PluginDefinition): Plugin`

இயல்புநிலையுடன் ஒரு செருகுநிரல் பொருளை உருவாக்கும் தொழிற்சாலை செயல்பாடு.

**அளவுருக்கள்:**

- `name` (சரம், தேவை) — kebab-case இல் செருகுநிரல் பெயர்
- `priority` (எண், விருப்பமானது, இயல்புநிலை: 100) — லோயர் முதலில் இயங்கும்
- `enabled` (பூலியன், விருப்பமானது, இயல்புநிலை: உண்மை) — தொடக்கம் இயக்கப்பட்டதா?
- `onRequest` (செயல்பாடு, விருப்பமானது) — அரட்டை கையாளுபவருக்கு முன் இயங்கும்
- `onResponse` (செயல்பாடு, விருப்பத்தேர்வு) — அரட்டை ஹேண்ட்லருக்குப் பிறகு இயங்கும்
- `onError` (செயல்பாடு, விருப்பமானது) — ஹேண்ட்லர் பிழையில் இயங்குகிறது

### `blockRequest(response?): BlockingHookResult`

கோரிக்கையைத் தடுத்து, விருப்பமான பதிலை வழங்கவும்.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

வழங்குநரை அடையும் முன் கோரிக்கை அமைப்பை மாற்றவும்.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

கோரிக்கை சூழலில் மெட்டாடேட்டாவை இணைக்கவும்.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## செருகுநிரல் சூழல் (`PluginContext`)

| களம்         | வகை                       | விளக்கம்                                          |
| ------------ | ------------------------- | ------------------------------------------------- |
| `requestId`  | `string`                  | தனிப்பட்ட கோரிக்கை அடையாளங்காட்டி                 |
| `model`      | `string`                  | மாடல் பெயர் கோரப்பட்டது                           |
| `provider`   | `string`                  | இலக்கு வழங்குநர் ID                               |
| `body`       | `Record<string, unknown>` | கோரிக்கை உடல்                                     |
| `headers`    | `Record<string, string>`  | கோரிக்கை தலைப்புகள் (குறிப்பைப் பார்க்கவும்)      |
| `metadata`   | `Record<string, unknown>` | மாறக்கூடிய மெட்டாடேட்டா                           |
| `timestamp`  | `number`                  | நேர முத்திரையைக் கோரவும்                          |
| `apiKeyInfo` | `object` (விரும்பினால்)   | API முக்கிய மெட்டாடேட்டா (குறிப்பைப் பார்க்கவும்) |

சூழல் கிளையண்டின் நற்சான்றிதழ்களைக் கொண்டிருக்காது: `authorization`, `x-api-key`, `proxy-authorization` மற்றும் `cookie` தலைப்புகள் அகற்றப்படும் (ஏதேனும் உறை), மேலும் `apiKeyInfo` விசையின் மெட்டாடேட்டாவை ( `id`, `name` மற்றும் `scopes` போன்றவை) வைத்திருக்கும், ஆனால் முக்கிய மதிப்பு அல்லது அதன் கைரேகை (`redactPluginContext()` `src/lib/plugins/hooks.ts`) இல் இல்லை. இது `onRequest`, `onResponse` மற்றும் `onError` க்கு பொருந்தும்.

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

### Hook முன்னுரிமை

Hooks-ஐ முன்னுரிமையுடன் உள்ளமைக்கலாம் (குறைந்த மதிப்பு = முதலில் இயங்கும்):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

அல்லது எளிய boolean மதிப்புகளாகக் குறிப்பிடலாம் (இயல்புநிலை முன்னுரிமை 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## அனுமதி அமைப்பு

முன்னிருப்பாக செருகுநிரல்கள்** சாண்ட்பாக்ஸ் இல்லை** . ஒவ்வொரு செயலில் உள்ள செருகுநிரலும், VM சூழல் மற்றும் Node.js அனுமதிக் கொடிகள் இல்லாமல், OmniRoute போன்ற அதே இயக்க முறைமை பயனரின் கீழ் ஒரு தனி, சாதாரண Node.js குழந்தை செயல்முறையாக ( `src/lib/plugins/loader.ts` இல்`loadPlugin()` ) இயங்குகிறது. செருகுநிரல் குறியீடு `node:fs`, `node:child_process`, `fetch` மற்றும் மற்ற எல்லா Node.js API பயன்படுத்தலாம்: இது OmniRoute பயனரால் (தரவு அடைவு உட்பட) எந்த கோப்பையும் படிக்கவும் எழுதவும் முடியும், நிரல்களை இயக்கவும் மற்றும் பிணையத்தை அடையவும் முடியும்.

மேனிஃபெஸ்ட்டின் `requires.permissions` `network`, `file-read`, `file-write`, `env` மற்றும் `exec` ஐ ஏற்றுக்கொள்கிறது. இயல்புநிலை அமைப்புகளுடன், இயக்க நேரத்தில் `env` மட்டுமே விளைவைக் கொண்டுள்ளது.

### தேர்வு அனுமதி மாதிரி (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` அம்சக் கொடி (வகை `security`,** முன்னிருப்பாக ஆஃப்** ) ஒவ்வொரு செருகுநிரல் செயல்முறையையும் [Node.js அனுமதி மாதிரியுடன்](https://nodejs.org/api/permissions.html) தொடங்குகிறது (`--permission`, ஒவ்வொரு ஆதரிக்கப்படும் Node.js வரியால் ஏற்றுக்கொள்ளப்பட்டது: 22.22 +, 24 மற்றும் 26). கொடிகள் மேனிஃபெஸ்ட்டில் இருந்து `buildPermissionModelArgs()` இல் `src/lib/plugins/permissionModel.ts` இல் கட்டப்பட்டுள்ளன. ஒரு செருகுநிரல் செயல்படுத்தப்படும் போது கொடி படிக்கப்படுகிறது, எனவே மாற்றத்திற்குப் பிறகு செயல்படுத்தப்பட்ட செருகுநிரல்களுக்கு இது பொருந்தும்; இயங்கும் செருகுநிரலை செயலிழக்கச் செய்து செயல்படுத்தவும்.

செருகுநிரல் தரவு கோப்பகம் சொருகி ரூட்டிற்கு அடுத்துள்ள `plugin-data/<plugin-name>` ஆகும் (இயல்புநிலையாக `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). கொடி இயக்கப்பட்டவுடன், அதன் பாதை `PLUGIN_DATA_DIR` என செருகுநிரலுக்கு அனுப்பப்படும்.

| அனுமதி        | ஃபிளாக் ஆஃப் (இயல்புநிலை)                                                                                                                                                                                                                                                        | கொடி                                                                                                                                                                                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (எதுவுமில்லை) | OmniRoute பயனரின் முழுச் சலுகைகள்.                                                                                                                                                                                                                                               | கோப்பு செருகுநிரல் கோப்பகத்தில் மட்டுமே படிக்கும். எந்த கோப்பும் எழுதவில்லை, குழந்தை செயல்முறைகள் இல்லை, தொழிலாளி நூல்கள் இல்லை, சொந்த துணை நிரல்கள் இல்லை, WASI இல்லை .                                                                                                                |
| `env`         | செருகுநிரல் செயல்முறை `PORT`, `HOSTNAME`, `TZ` மற்றும் `TMPDIR` ஆகியவற்றையும் பெறுகிறது. அது இல்லாமல், அது `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` மற்றும் `PLUGIN_NAME` ( Windows இல் `SystemRoot` மற்றும் `windir` ) ஆகியவற்றை மட்டுமே பெறுகிறது. | கொடியை ஏற்றியது போலவே.                                                                                                                                                                                                                                                                  |
| `file-read`   | எதுவும் இல்லை (அறிவிப்பு மட்டும்).                                                                                                                                                                                                                                               | செருகுநிரல் தரவு கோப்பகமும் படிக்கக்கூடியதாக மாறும் (காணவில்லை என்றால் அது உருவாக்கப்படும்).                                                                                                                                                                                            |
| `file-write`  | எதுவும் இல்லை (அறிவிப்பு மட்டும்).                                                                                                                                                                                                                                               | செருகுநிரல் தரவு அடைவு படிக்கக்கூடியதாகவும் எழுதக்கூடியதாகவும் மாறும் (`--allow-fs-write`). வேறு எதுவும் எழுத முடியாது.                                                                                                                                                                 |
| `exec`        | எதுவும் இல்லை (அறிவிப்பு மட்டும்).                                                                                                                                                                                                                                               | குழந்தை செயல்முறைகள் அனுமதிக்கப்படுகின்றன (`--allow-child-process`). Node.js `NODE_OPTIONS` மூலம் குழந்தை Node.js செயல்முறைகளுக்கு அனுமதி கொடிகளை அனுப்புகிறது, ஆனால் வேறு எந்த நிரலும் கட்டுப்பாடுகள் இல்லாமல் இயங்குகிறது, எனவே `exec` கோப்பு முறைமை வரம்புகளை திறம்பட உயர்த்துகிறது. |
| `network`     | எதுவும் இல்லை (அறிவிப்பு மட்டும்).                                                                                                                                                                                                                                               | இல்லை. Node.js அனுமதி மாதிரியானது வெளிச்செல்லும் பிணைய அணுகலைக் கட்டுப்படுத்தாது, எனவே `network` ஒரு அறிவிப்பாகவே இருக்கும், அது ஒருபோதும் செயல்படுத்தப்படாது.                                                                                                                          |

தங்கள் சொந்த கோப்பகத்திற்கு வெளியே உள்ள கோப்புகளைப் படிக்கும் செருகுநிரல்களில் கொடியைத் திருப்புதல் (எடுத்துக்காட்டாக, பெற்றோர் `node_modules` இலிருந்து தீர்க்கப்பட்ட தொகுதி), அவற்றின் தரவு கோப்பகத்தைத் தவிர வேறு எங்கும் எழுதலாம் அல்லது `exec` அறிவிக்காமல் செயல்முறைகளை உருவாக்கலாம். செருகுநிரலில் உள்ள கொடியுடன் கூட பிணைய அணுகலை வைத்திருக்கிறது மற்றும் OmniRoute பயனராக இயங்குகிறது, எனவே நீங்கள் நம்பும் ஆதாரத்தை மட்டும் நிறுவவும்.

## கட்டமைப்பு ஸ்கீமா

கட்டமைக்கக்கூடிய அமைப்புகளை `configSchema`-இல் வரையறுக்கவும்:

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

புல வகைகள்: `string`, `number`, `boolean`, `select`

புல விருப்பங்கள்: `default`, `min`, `max`, `enum`, `description`

கட்டமைப்பு மதிப்புகள் தரவுத்தளத்தில் நிலையாகச் சேமிக்கப்பட்டு, dashboard கட்டமைப்புப் பக்கத்தின் வழியாக அணுகக்கூடியவையாக இருக்கும்.

## உள்ளமைக்கப்பட்ட நிகழ்வுகள்

| நிகழ்வு           | எப்போது                                                                | பேலோடு                        |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | அரட்டை ஹேண்ட்லருக்கு முன்                                              | கோரிக்கை சூழல்                |
| `onResponse`      | அரட்டை ஹேண்ட்லருக்குப் பின்                                            | பதில் தரவு                    |
| `onError`         | ஹேண்ட்லர் பிழையின்போது                                                 | பிழைப் பொருள்                 |
| `onModelSelect`   | வழிப்படுத்தலுக்காக மாடல் தேர்ந்தெடுக்கப்படும்போது                      | மாடல் தகவல்                   |
| `onComboResolve`  | காம்போ வழிப்படுத்தல் தீர்மானிக்கப்படும்போது                            | காம்போ இலக்குகள்              |
| `onRateLimit`     | விகித வரம்பு எட்டப்படும்போது                                           | வரம்புத் தகவல்                |
| `onQuotaExhaust`  | ஒதுக்கீடு தீர்ந்துபோகும்போது                                           | ஒதுக்கீட்டுத் தகவல்           |
| `onProviderError` | வழங்குநர் பிழையைத் திருப்பியபோது                                       | பிழை விவரங்கள்                |
| `onStreamStart`   | SSE ஸ்ட்ரீம் தொடங்கும்போது                                             | ஸ்ட்ரீம் தகவல்                |
| `onStreamEnd`     | SSE ஸ்ட்ரீம் முடிவடையும்போது                                           | ஸ்ட்ரீம் புள்ளிவிவரங்கள்      |
| `onInstall`       | செருகுநிரல் நிறுவப்படும்போது                                           | `{ name, version, manifest }` |
| `onActivate`      | செருகுநிரல் செயல்படுத்தப்படும்போது                                     | `{ name, version, manifest }` |
| `onDeactivate`    | செருகுநிரல் செயலிழக்கச் செய்யப்படும்போது                               | `{ name, version, manifest }` |
| `onUninstall`     | செருகுநிரல் நிறுவல் நீக்கப்படும்போது (கோப்புகள் நீக்கப்படுவதற்கு முன்) | `{ name, version, manifest }` |

## எடுத்துக்காட்டுகள்

### லாகர் கோரிக்கை

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### விகித வரம்பு

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

### பதில் மின்மாற்றி

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
