# OmniRoute Plugin SDK (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Anza Haraka

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

## API Rejea

### `definePlugin(def: PluginDefinition): Plugin`

Chaguo za kukokotoa za kiwandani zinazounda kipengee cha programu-jalizi na chaguo-msingi.

**Vigezo:**

- `name` (kamba, inahitajika) — Jina la programu-jalizi katika kesi ya kebab
- `priority` (idadi, hiari, chaguo-msingi: 100) — Chini inaendesha kwanza
- `enabled` (boolean, hiari, chaguo-msingi: kweli) — Je, Umewasha?
- `onRequest` (kazi, hiari) — Huendesha kabla ya kidhibiti cha gumzo
- `onResponse` (kazi, hiari) — Huendesha baada ya kidhibiti cha gumzo
- `onError` (kazi, hiari) — Huendesha hitilafu ya kidhibiti

### `blockRequest(response?): BlockingHookResult`

Zuia ombi na urudishe jibu maalum kwa hiari.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Rekebisha shirika la ombi kabla ya kumfikia mtoa huduma.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Ambatisha metadata kwa muktadha wa ombi.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Muktadha wa programu-jalizi (`PluginContext`)

| Shamba       | Aina                      | Maelezo                              |
| ------------ | ------------------------- | ------------------------------------ |
| `requestId`  | `string`                  | Kitambulisho cha ombi la kipekee     |
| `model`      | `string`                  | Umeomba jina la mfano                |
| `provider`   | `string`                  | Mtoa huduma lengwa ID                |
| `body`       | `Record<string, unknown>` | Omba mwili                           |
| `headers`    | `Record<string, string>`  | Omba vichwa (angalia dokezo)         |
| `metadata`   | `Record<string, unknown>` | Metadata inayoweza kubadilishwa      |
| `timestamp`  | `number`                  | Omba muhuri wa muda                  |
| `apiKeyInfo` | `object` (si lazima)      | API metadata muhimu (angalia dokezo) |

Muktadha huwa haubebi kitambulisho cha mteja: vichwa vya `authorization`, `x-api-key`, `proxy-authorization` na `cookie` huondolewa (casing yoyote), na `apiKeyInfo` huhifadhi metadata ya ufunguo (kama vile `id`, `name` na `scopes`) lakini si thamani kuu au alama ya kidole chake (`redactPluginContext()` katika `src/lib/plugins/hooks.ts`). Hii inatumika kwa `onRequest`, `onResponse` na `onError`.

## Manifesti (`plugin.json`)

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

### Kipaumbele cha Hook

Hook zinaweza kusanidiwa kwa kipaumbele (thamani ya chini = hutekelezwa kwanza):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Au kama thamani rahisi za boolean (kipaumbele chaguomsingi ni 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Mfumo wa Ruhusa

Plugins ni** sio sandbox** . Kila programu-jalizi inayotumika huendeshwa kama mchakato tofauti, wa kawaida wa mtoto Node.js (`loadPlugin()` in `src/lib/plugins/loader.ts`) chini ya mtumiaji wa mfumo wa uendeshaji sawa na OmniRoute, bila muktadha VM na bendera za ruhusa za Node.js. Nambari ya programu-jalizi inaweza kutumia `node:fs`, `node:child_process`, `fetch` na kila Node.js API: inaweza kusoma na kuandika faili yoyote ambayo mtumiaji wa OmniRoute anaweza (pamoja na saraka ya data), kuendesha programu na kufikia mtandao.

`requires.permissions` ya faili ya maelezo inakubali `network`, `file-read`, `file-write`, `env` na `exec`, lakini leo ni `env` pekee inayo athari wakati wa utekelezaji:

| Ruhusa                                       | Athari leo                                                                                                                                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`                                        | Mchakato wa programu-jalizi pia hupokea `PORT`, `HOSTNAME`, `TZ` na `TMPDIR`. Bila hivyo, inapokea tu `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` na `PLUGIN_NAME` (pamoja na `SystemRoot` na `windir` juu ya Windows). |
| `network`, `file-read`, `file-write`, `exec` | Hakuna. Ni matamko pekee: hakuna kinachozuiwa yanapokosekana.                                                                                                                                                                                    |

Kusakinisha programu-jalizi ni kama kusakinisha programu nyingine yoyote kwenye seva pangishi. Sakinisha programu-jalizi ambazo unaamini chanzo chake.

## Muundo wa Usanidi

Bainisha mipangilio inayoweza kusanidiwa katika `configSchema`:

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

Aina za sehemu: `string`, `number`, `boolean`, `select`

Chaguo za sehemu: `default`, `min`, `max`, `enum`, `description`

Thamani za usanidi huhifadhiwa katika kanzidata na zinaweza kufikiwa kupitia ukurasa wa usanidi wa dashibodi.

## Matukio Yaliyojengewa Ndani

| Tukio             | Wakati                                                 | Data inayotumwa                  |
| ----------------- | ------------------------------------------------------ | -------------------------------- |
| `onRequest`       | Kabla ya kishughulikiaji cha gumzo                     | Muktadha wa ombi                 |
| `onResponse`      | Baada ya kishughulikiaji cha gumzo                     | Data ya jibu                     |
| `onError`         | Hitilafu ya kishughulikiaji inapotokea                 | Kitu cha hitilafu                |
| `onModelSelect`   | Modeli inapochaguliwa kwa uelekezaji                   | Taarifa za modeli                |
| `onComboResolve`  | Uelekezaji wa mchanganyiko unapotatuliwa               | Malengo ya mchanganyiko          |
| `onRateLimit`     | Kikomo cha kiwango kinapofikiwa                        | Taarifa za kikomo                |
| `onQuotaExhaust`  | Kiwango kilichotengwa kinapoisha                       | Taarifa za kiwango kilichotengwa |
| `onProviderError` | Mtoa huduma anaporudisha hitilafu                      | Maelezo ya hitilafu              |
| `onStreamStart`   | Mtiririko wa SSE unapoanzishwa                         | Taarifa za mtiririko             |
| `onStreamEnd`     | Mtiririko wa SSE unapoisha                             | Takwimu za mtiririko             |
| `onInstall`       | Programu-jalizi inaposakinishwa                        | `{ name, version, manifest }`    |
| `onActivate`      | Programu-jalizi inapoamilishwa                         | `{ name, version, manifest }`    |
| `onDeactivate`    | Programu-jalizi inapoondolewa uamilifu                 | `{ name, version, manifest }`    |
| `onUninstall`     | Programu-jalizi inapoondolewa (kabla ya faili kufutwa) | `{ name, version, manifest }`    |

## Mifano

### Omba Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Kiwango cha Kikomo

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

### Kibadilishaji cha Majibu

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
