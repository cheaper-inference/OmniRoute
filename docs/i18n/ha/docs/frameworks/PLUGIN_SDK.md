# OmniRoute Plugin SDK (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Saurin Farawa

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

## API Reference

### `definePlugin(def: PluginDefinition): Plugin`

Aikin masana'anta wanda ke haifar da abin toshewa tare da gazawa.

**Siga:**

- `name` (kirtani, da ake buƙata) — Sunan plugin a cikin kebab-case
- `priority` (lamba, na zaɓi, tsoho: 100) — Ƙananan yana farawa da farko
- `enabled` (boolean, na zaɓi, tsoho: gaskiya) — An kunna farawa?
- `onRequest` (aiki, na zaɓi) — Yana gudana kafin mai sarrafa taɗi
- `onResponse` (aiki, na zaɓi) — Yana gudana bayan mai sarrafa taɗi
- `onError` (aiki, na zaɓi) — Yana gudana akan kuskuren mai sarrafa

### `blockRequest(response?): BlockingHookResult`

Toshe buƙatun kuma a zaɓi mayar da martani na al'ada.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Gyara ƙungiyar buƙatar kafin ta kai ga mai bayarwa.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Haɗa metadata zuwa mahallin buƙatar.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Ma'anar Plugin (`PluginContext`)

| Filin        | Nau'in                    | Bayani                                 |
| ------------ | ------------------------- | -------------------------------------- |
| `requestId`  | `string`                  | Mai gano buƙatun musamman              |
| `model`      | `string`                  | Sunan samfurin da ake nema             |
| `provider`   | `string`                  | mai bada manufa ID                     |
| `body`       | `Record<string, unknown>` | Nemi jiki                              |
| `headers`    | `Record<string, string>`  | Nemi kanun labarai (duba bayanin kula) |
| `metadata`   | `Record<string, unknown>` | metadata mai canzawa                   |
| `timestamp`  | `number`                  | Nemi tambarin lokaci                   |
| `apiKeyInfo` | `object` (na zaɓi)        | API key metadata (duba bayanin kula)   |

Mahallin bai taɓa ɗaukar takaddun shaidar abokin ciniki ba: ana cire masu kai na `authorization`, `x-api-key`, `proxy-authorization` da `cookie` (kowane casing), kuma `apiKeyInfo` yana adana metadata na maɓalli (kamar `id`, `name` da `scopes`) amma ba ƙima mai mahimmanci ko sawun yatsansa (`redactPluginContext()` a `src/lib/plugins/hooks.ts`). Wannan ya shafi `onRequest`, `onResponse` da `onError`.

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

### Fifikon Hook

Ana iya saita hooks tare da fifiko (ƙarami = yana fara aiki):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ko kuma a matsayin booleans masu sauƙi (tsohon fifiko 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Tsarin izini

Plugins su ne** ba sandboxed** . Kowane plugin mai aiki yana gudana azaman keɓanta, tsarin tsarin yara na Node.js na yau da kullun (`loadPlugin()` a `src/lib/plugins/loader.ts`) ƙarƙashin mai amfani da tsarin aiki ɗaya kamar OmniRoute, ba tare da mahallin VM ba kuma babu tutocin izinin Node.js. Plugin code na iya amfani da `node:fs`, `node:child_process`, `fetch` da kowane Node.js API: yana iya karantawa da rubuta kowane fayil da mai amfani da OmniRoute zai iya (ciki har da kundin bayanan bayanai), gudanar da shirye-shirye kuma isa ga hanyar sadarwa.

`requires.permissions` mai bayyanawa yana karɓar `network`, `file-read`, `file-write`, `env` da `exec`, amma a yau kawai `env` yana da tasiri a lokacin aiki:

| Izini                                        | Tasiri a yau                                                                                                                                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Tsarin plugin ɗin kuma yana karɓar `PORT`, `HOSTNAME`, `TZ` da `TMPDIR`. Ba tare da shi ba, yana karɓar `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` da `PLUGIN_NAME` (da `SystemRoot` da `windir` akan Windows). |
| `network`, `file-read`, `file-write`, `exec` | Babu. Sanarwa ne kawai: babu abin da ke toshe lokacin da suka ɓace.                                                                                                                                                                       |

Shigar da plugin yana kama da shigar da kowane shirin akan mai watsa shiri. Shigar da plugins kawai waɗanda kuka amince da tushen su.

## Tsarin Config

Ƙayyade saitunan da za a iya daidaitawa a cikin `configSchema`:

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

Nau'ikan filaye: `string`, `number`, `boolean`, `select`

Zaɓuɓɓukan filaye: `default`, `min`, `max`, `enum`, `description`

Ana adana ƙimomin config a cikin ma'ajiyar bayanai kuma ana iya samun damar su ta shafin config na dashboard.

## Abubuwan da aka Gina a Ciki

| Event             | Lokacin da yake faruwa                 | Payload                       |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | Kafin chat handler                     | Mahallin request              |
| `onResponse`      | Bayan chat handler                     | Bayanan response              |
| `onError`         | Lokacin kuskuren handler               | Abun kuskure                  |
| `onModelSelect`   | An zaɓi model don routing              | Bayanin model                 |
| `onComboResolve`  | An warware combo routing               | Manufofin combo               |
| `onRateLimit`     | An kai iyakar rate                     | Bayanin iyaka                 |
| `onQuotaExhaust`  | Quota ya ƙare                          | Bayanin quota                 |
| `onProviderError` | Provider ya mayar da kuskure           | Cikakkun bayanan kuskure      |
| `onStreamStart`   | An fara SSE stream                     | Bayanin stream                |
| `onStreamEnd`     | SSE stream ya ƙare                     | Ƙididdigar stream             |
| `onInstall`       | An girka plugin                        | `{ name, version, manifest }` |
| `onActivate`      | An kunna plugin                        | `{ name, version, manifest }` |
| `onDeactivate`    | An kashe plugin                        | `{ name, version, manifest }` |
| `onUninstall`     | An cire plugin (kafin a goge fayiloli) | `{ name, version, manifest }` |

## Misalai

### Nemi Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ƙimar iyaka

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

### Response Transformer

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
