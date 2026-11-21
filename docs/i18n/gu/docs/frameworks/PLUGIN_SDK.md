# OmniRoute Plugin SDK (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ઝડપી શરૂઆત

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

## API સંદર્ભ

### `definePlugin(def: PluginDefinition): Plugin`

ફેક્ટરી ફંક્શન કે જે ડિફોલ્ટ સાથે પ્લગઇન ઑબ્જેક્ટ બનાવે છે.

**પરિમાણો:**

- કબાબ-કેસમાં`name` (સ્ટ્રિંગ, જરૂરી) — પ્લગઇન નામ
- `priority` (નંબર, વૈકલ્પિક, ડિફોલ્ટ: 100) — લોઅર પ્રથમ ચાલે છે
- `enabled` (બુલિયન, વૈકલ્પિક, ડિફોલ્ટ: સાચું) — પ્રારંભ સક્ષમ છે?
- `onRequest` (કાર્ય, વૈકલ્પિક) — ચેટ હેન્ડલર પહેલાં ચાલે છે
- `onResponse` (ફંક્શન, વૈકલ્પિક) — ચેટ હેન્ડલર પછી ચાલે છે
- `onError` (કાર્ય, વૈકલ્પિક) — હેન્ડલર ભૂલ પર ચાલે છે

### `blockRequest(response?): BlockingHookResult`

વિનંતીને અવરોધિત કરો અને વૈકલ્પિક રીતે કસ્ટમ પ્રતિસાદ પરત કરો.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

પ્રદાતા સુધી પહોંચે તે પહેલાં વિનંતીના મુખ્ય ભાગમાં ફેરફાર કરો.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

વિનંતી સંદર્ભમાં મેટાડેટા જોડો.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## પ્લગઇન સંદર્ભ (`PluginContext`)

| ક્ષેત્ર      | પ્રકાર                    | વર્ણન                         |
| ------------ | ------------------------- | ----------------------------- |
| `requestId`  | `string`                  | અનન્ય વિનંતી ઓળખકર્તા         |
| `model`      | `string`                  | મોડેલ નામની વિનંતી કરી        |
| `provider`   | `string`                  | લક્ષ્ય પ્રદાતા ID             |
| `body`       | `Record<string, unknown>` | શરીરની વિનંતી કરો             |
| `headers`    | `Record<string, string>`  | મથાળાની વિનંતી કરો (નોંધ જુઓ) |
| `metadata`   | `Record<string, unknown>` | પરિવર્તનશીલ મેટાડેટા          |
| `timestamp`  | `number`                  | ટાઇમસ્ટેમ્પની વિનંતી કરો      |
| `apiKeyInfo` | `object` (વૈકલ્પિક)       | API કી મેટાડેટા (નોંધ જુઓ)    |

સંદર્ભ ક્યારેય ક્લાયંટના ઓળખપત્રોને વહન કરતું નથી: `authorization`, `x-api-key`, `proxy-authorization` અને `cookie` હેડરો દૂર કરવામાં આવે છે (કોઈપણ કેસીંગ), અને `apiKeyInfo` કીના મેટાડેટા (જેમ કે `id`, `name` અને `scopes`) રાખે છે પરંતુ કી મૂલ્ય અથવા તેની ફિંગરપ્રિન્ટ `src/lib/plugins/hooks.ts` `redactPluginContext()` માં નહીં. આ `onRequest`, `onResponse` અને `onError` પર લાગુ થાય છે.

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

### Hookની પ્રાથમિકતા

Hooksને પ્રાથમિકતા સાથે ગોઠવી શકાય છે (ઓછું મૂલ્ય = પહેલાં ચાલે છે):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

અથવા સરળ boolean મૂલ્યો તરીકે (ડિફૉલ્ટ પ્રાથમિકતા 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## પરવાનગી સિસ્ટમ

મૂળભૂત રીતે પ્લગઈનો છે** સેન્ડબોક્સ નથી** . દરેક સક્રિય પ્લગઇન એક અલગ, સામાન્ય Node.js ચાઇલ્ડ પ્રોસેસ ( `src/lib/plugins/loader.ts` માં`loadPlugin()` ) તરીકે OmniRoute તરીકે સમાન ઓપરેટિંગ-સિસ્ટમ વપરાશકર્તા હેઠળ ચાલે છે, જેમાં કોઈ VM સંદર્ભ અને કોઈ Node.js પરવાનગી ફ્લેગ નથી. પ્લગઇન કોડ `node:fs`, `node:child_process`, `fetch` અને દરેક અન્ય Node.js API ઉપયોગ કરી શકે છે: તે OmniRoute વપરાશકર્તા (ડેટા ડિરેક્ટરી સહિત) કોઈપણ ફાઇલ વાંચી અને લખી શકે છે, પ્રોગ્રામ ચલાવી શકે છે અને નેટવર્ક સુધી પહોંચી શકે છે.

મેનિફેસ્ટનો `requires.permissions` `network`, `file-read`, `file-write`, `env` અને `exec` સ્વીકારે છે. ડિફૉલ્ટ સેટિંગ્સ સાથે માત્ર `env` રનટાઇમ પર અસર કરે છે.

### ઑપ્ટ-ઇન પરવાનગી મોડલ (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` લક્ષણ ધ્વજ (શ્રેણી `security`,** મૂળભૂત રીતે બંધ** ) દરેક પ્લગઇન પ્રક્રિયાને [Node.js પરવાનગી મોડલ](https://nodejs.org/api/permissions.html) સાથે શરૂ કરે છે (`--permission`, દરેક સપોર્ટેડ Node.js લાઇન દ્વારા સ્વીકારવામાં આવે છે: 22.22 +, 24 અને 26). ફ્લેગ્સ મેનિફેસ્ટમાંથી `src/lib/plugins/permissionModel.ts` માં `buildPermissionModelArgs()` દ્વારા બનાવવામાં આવે છે. જ્યારે પ્લગઇન સક્રિય થાય છે ત્યારે ધ્વજ વાંચવામાં આવે છે, તેથી તે ફેરફાર પછી સક્રિય થયેલા પ્લગિન્સને લાગુ પડે છે; તેને લાગુ કરવા માટે ચાલી રહેલ પ્લગઇનને નિષ્ક્રિય અને સક્રિય કરો.

પ્લગઇન ડેટા ડિરેક્ટરી પ્લગઇન રૂટની બાજુમાં `plugin-data/<plugin-name>` છે (`~/.omniroute/plugin-data/<plugin-name>` બાય ડિફોલ્ટ, `getPluginDataDir()`). ધ્વજ ચાલુ રાખીને, તેનો પાથ પ્લગઇનને `PLUGIN_DATA_DIR` તરીકે પસાર થાય છે.

| પરવાનગી      | ફ્લેગ ઓફ (ડિફોલ્ટ)                                                                                                                                                                                                                     | ધ્વજ ચાલુ કરો                                                                                                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (કોઈ નહીં)   | OmniRoute વપરાશકર્તાના સંપૂર્ણ વિશેષાધિકારો.                                                                                                                                                                                           | ફાઇલ ફક્ત પ્લગઇન ડિરેક્ટરીમાં જ વાંચે છે. કોઈ ફાઈલ લખતી નથી, કોઈ ચાઈલ્ડ પ્રોસેસ નથી, કોઈ વર્કર થ્રેડ નથી, કોઈ મૂળ એડઓન્સ નથી, WASI નથી.                                                                                                                 |
| `env`        | પ્લગઇન પ્રક્રિયા `PORT`, `HOSTNAME`, `TZ` અને `TMPDIR` પણ મેળવે છે. તેના વિના, તે માત્ર `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` અને `PLUGIN_NAME` (વત્તા Windows પર `SystemRoot` અને `windir` ) મેળવે છે. | ધ્વજવંદન સાથે સમાન.                                                                                                                                                                                                                                     |
| `file-read`  | કોઈ નહીં (ફક્ત ઘોષણા).                                                                                                                                                                                                                 | પ્લગઇન ડેટા ડિરેક્ટરી પણ વાંચી શકાય તેવી બની જાય છે (જો ખૂટે છે તો તે બનાવવામાં આવે છે).                                                                                                                                                                |
| `file-write` | કોઈ નહીં (ફક્ત ઘોષણા).                                                                                                                                                                                                                 | પ્લગઇન ડેટા ડાયરેક્ટરી વાંચી શકાય તેવી અને લખી શકાય તેવી બને છે (`--allow-fs-write`). બીજું કંઈ લખી શકાય એવું નથી.                                                                                                                                      |
| `exec`       | કોઈ નહીં (ફક્ત ઘોષણા).                                                                                                                                                                                                                 | બાળ પ્રક્રિયાઓને મંજૂરી છે (`--allow-child-process`). Node.js `NODE_OPTIONS` દ્વારા ચાઈલ્ડ Node.js પ્રક્રિયાઓને પરવાનગી ફ્લેગ્સ પસાર કરે છે, પરંતુ અન્ય કોઈપણ પ્રોગ્રામ પ્રતિબંધો વિના ચાલે છે, તેથી `exec` અસરકારક રીતે ફાઈલ-સિસ્ટમ મર્યાદાઓ ઉઠાવે છે. |
| `network`    | કોઈ નહીં (ફક્ત ઘોષણા).                                                                                                                                                                                                                 | કોઈ નહિ. Node.js પરવાનગી મોડલ આઉટબાઉન્ડ નેટવર્ક ઍક્સેસને પ્રતિબંધિત કરતું નથી, તેથી `network` એક ઘોષણા તરીકે રહે છે અને તેને ક્યારેય લાગુ કરવામાં આવતું નથી.                                                                                            |

ધ્વજને બ્રેક્સ પ્લગઇન્સ પર ચાલુ કરવાથી જે ફાઇલો તેમની પોતાની ડાયરેક્ટરી બહાર વાંચે છે (ઉદાહરણ તરીકે પેરેન્ટ `node_modules` માંથી ઉકેલાયેલ મોડ્યુલ), તેમની ડેટા ડાયરેક્ટરી સિવાય ગમે ત્યાં લખો, અથવા `exec` જાહેર કર્યા વિના પ્રક્રિયાઓ ફેલાવો. પ્લગઇન પરના ધ્વજ સાથે પણ નેટવર્ક એક્સેસ રાખે છે અને OmniRoute વપરાશકર્તા તરીકે ચાલે છે, તેથી ફક્ત તે જ પ્લગઇન્સ ઇન્સ્ટોલ કરો જેના સ્ત્રોત પર તમે વિશ્વાસ કરો છો.

## કૉન્ફિગ સ્કીમા

રૂપરેખાંકિત કરી શકાય તેવી સેટિંગ્સને `configSchema`માં વ્યાખ્યાયિત કરો:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "બાહ્ય API કી" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ફીલ્ડના પ્રકારો: `string`, `number`, `boolean`, `select`

ફીલ્ડ વિકલ્પો: `default`, `min`, `max`, `enum`, `description`

કૉન્ફિગ મૂલ્યો ડેટાબેઝમાં કાયમી રીતે સંગ્રહિત થાય છે અને ડૅશબોર્ડના કૉન્ફિગ પેજ દ્વારા ઍક્સેસ કરી શકાય છે.

## બિલ્ટ-ઇન ઇવેન્ટ્સ

| ઇવેન્ટ            | ક્યારે                                                  | પેલોડ                         |
| ----------------- | ------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ચેટ હેન્ડલર પહેલાં                                      | વિનંતીનો સંદર્ભ               |
| `onResponse`      | ચેટ હેન્ડલર પછી                                         | પ્રતિસાદ ડેટા                 |
| `onError`         | હેન્ડલરમાં ભૂલ થાય ત્યારે                               | ભૂલ ઑબ્જેક્ટ                  |
| `onModelSelect`   | રૂટિંગ માટે મોડલ પસંદ થાય ત્યારે                        | મોડલની માહિતી                 |
| `onComboResolve`  | કૉમ્બો રૂટિંગ ઉકેલાય ત્યારે                             | કૉમ્બોના લક્ષ્યો              |
| `onRateLimit`     | રેટ લિમિટ લાગુ થાય ત્યારે                               | લિમિટની માહિતી                |
| `onQuotaExhaust`  | ક્વોટા સમાપ્ત થાય ત્યારે                                | ક્વોટાની માહિતી               |
| `onProviderError` | પ્રદાતા ભૂલ પરત કરે ત્યારે                              | ભૂલની વિગતો                   |
| `onStreamStart`   | SSE સ્ટ્રીમ શરૂ થાય ત્યારે                              | સ્ટ્રીમની માહિતી              |
| `onStreamEnd`     | SSE સ્ટ્રીમ સમાપ્ત થાય ત્યારે                           | સ્ટ્રીમના આંકડા               |
| `onInstall`       | પ્લગિન ઇન્સ્ટોલ થાય ત્યારે                              | `{ name, version, manifest }` |
| `onActivate`      | પ્લગિન સક્રિય થાય ત્યારે                                | `{ name, version, manifest }` |
| `onDeactivate`    | પ્લગિન નિષ્ક્રિય થાય ત્યારે                             | `{ name, version, manifest }` |
| `onUninstall`     | પ્લગિન અનઇન્સ્ટોલ થાય ત્યારે (ફાઇલો કાઢી નાખતાં પહેલાં) | `{ name, version, manifest }` |

## ઉદાહરણો

### લોગરની વિનંતી કરો

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### રેટ લિમિટર

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

### પ્રતિભાવ ટ્રાન્સફોર્મર

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
