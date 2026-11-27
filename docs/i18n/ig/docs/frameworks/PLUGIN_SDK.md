# OmniRoute Plugin SDK (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Mmalite ngwa ngwa

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

## API

### `definePlugin(def: PluginDefinition): Plugin`

Ọrụ ụlọ ọrụ na-emepụta ihe nkwụnye nwere ndabara.

**Oke:**

- `name` (eriri, achọrọ) — Aha ngwa mgbakwunye na kebab-case
- `priority` (nọmba, nhọrọ, ndabara: 100) — Lower agba mbụ
- `enabled` (boolean, nhọrọ, ndabara: ezi) — Agbanyere aka?
- `onRequest` (ọrụ, nhọrọ) — Na-agba ọsọ tupu onye njikwa nkata
- `onResponse` (ọrụ, nhọrọ) — Na-agba ọsọ ma onye njikwa nkata gachara
- `onError` (ọrụ, nhọrọ) — Na-agba ọsọ na njehie njikwa

### `blockRequest(response?): BlockingHookResult`

Gbochie arịrịọ ahụ wee weghachi nzaghachi omenala na nhọrọ.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Gbanwee otu arịrịọ tupu ọ rute onye na-eweta ya.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Tinye metadata na mpaghara arịrịọ.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Ọdịnihu ngwa mgbakwunye (`PluginContext`)

| Ubi          | Ụdị                       | Nkọwa                              |
| ------------ | ------------------------- | ---------------------------------- |
| `requestId`  | `string`                  | Ihe nchọpụta arịrịọ pụrụ iche      |
| `model`      | `string`                  | Aha ụdị achọrọ                     |
| `provider`   | `string`                  | Onye na-eweta ebumnuche ID         |
| `body`       | `Record<string, unknown>` | Rịọ ahụ                            |
| `headers`    | `Record<string, string>`  | Rịọ nkụnye eji isi mee (lee ndetu) |
| `metadata`   | `Record<string, unknown>` | metadata agbanwe agbanwe           |
| `timestamp`  | `number`                  | Rịọ akara oge                      |
| `apiKeyInfo` | `object` (nhọrọ)          | metadata igodo API (lee ndetu)     |

Ihe gbara ya gburugburu anaghị eburu nzere onye ahịa: ewepụrụ `authorization`, `x-api-key`, `proxy-authorization` na `cookie` nkụnye eji isi mee ( casing ọ bụla), na `apiKeyInfo` na-edobe metadata igodo (dị ka `id`, `name` na `scopes`) mana ọ bụghị uru isi ma ọ bụ akara mkpịsị aka ya (`redactPluginContext()` na `src/lib/plugins/hooks.ts`). Nke a na-emetụta `onRequest`, `onResponse` na `onError`.

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

### Ibu Ụzọ nke Hook

Enwere ike iji ibu ụzọ hazie hooks (nke dị ala = na-arụ ọrụ mbụ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ma ọ bụ dịka boolean ndị dị mfe (ibu ụzọ ndabara 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistemụ ikike

Ngwa mgbakwunye bụ** ọ bụghị sandboxed** . Ngwa mgbakwunye ọ bụla na-arụ ọrụ na-agba ọsọ dị ka usoro Node.js nkịtị dị iche (`loadPlugin()` na `src/lib/plugins/loader.ts`) n'okpuru otu onye ọrụ sistemụ dị ka OmniRoute, na-enweghị ọnọdụ VM yana enweghị ọkọlọtọ ikike Node.js. Koodu ngwa mgbakwunye nwere ike iji `node:fs`, `node:child_process`, `fetch` na Node.js API ọ bụla: ọ nwere ike ịgụ ma dee faịlụ ọ bụla onye ọrụ OmniRoute nwere ike (gụnyere ndekọ data), mee mmemme wee rute netwọkụ.

Ihe ngosi `requires.permissions` na-anabata `network`, `file-read`, `file-write`, `env` na `exec`, mana taa naanị `env` nwere mmetụta na oge ọsọ:

| Ikike                                        | Mmetụta taa                                                                                                                                                                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Usoro ngwa mgbakwunye na-enwetakwa `PORT`, `HOSTNAME`, `TZ` na `TMPDIR`. Na-enweghị ya, ọ na-enweta naanị `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` na `PLUGIN_NAME` (gbakwunyere `SystemRoot` na `windir` na Windows). |
| `network`, `file-read`, `file-write`, `exec` | Ọ dịghị. Ha bụ naanị nkwupụta: ọ dịghị ihe na-egbochi mgbe ha na-efu.                                                                                                                                                                              |

Ịwụnye ngwa mgbakwunye dị ka ịwụnye mmemme ọ bụla na onye ọbịa. Wụnye naanị plugins ndị ị tụkwasịrị obi isi mmalite ha.

## Schema Nhazi

Kọwaa ntọala ndị enwere ike ịhazi n'ime `configSchema`:

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

Ụdị field: `string`, `number`, `boolean`, `select`

Nhọrọ field: `default`, `min`, `max`, `enum`, `description`

A na-echekwa uru config n'ime database, a pụkwara ịnweta ha site na ibe config nke dashboard.

## Events Ndị E Wuru N'ime Ya

| Event             | Mgbe                                      | Payload                       |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | Tupu chat handler                         | Ọnọdụ request                 |
| `onResponse`      | Mgbe chat handler mechara                 | Data response                 |
| `onError`         | Mgbe njehie handler mere                  | Object njehie                 |
| `onModelSelect`   | Mgbe ahọpụtara model maka routing         | Ozi model                     |
| `onComboResolve`  | Mgbe e doziri combo routing               | Ebe combo na-aga              |
| `onRateLimit`     | Mgbe e ruru rate limit                    | Ozi limit                     |
| `onQuotaExhaust`  | Mgbe quota gwụsịrị                        | Ozi quota                     |
| `onProviderError` | Mgbe provider weghachiri njehie           | Nkọwa njehie                  |
| `onStreamStart`   | Mgbe SSE stream malitere                  | Ozi stream                    |
| `onStreamEnd`     | Mgbe SSE stream kwụsịrị                   | Ndekọ ọnụ ọgụgụ stream        |
| `onInstall`       | Mgbe arụnyere plugin                      | `{ name, version, manifest }` |
| `onActivate`      | Mgbe e mere ka plugin rụọ ọrụ             | `{ name, version, manifest }` |
| `onDeactivate`    | Mgbe a kwụsịrị plugin ịrụ ọrụ             | `{ name, version, manifest }` |
| `onUninstall`     | Mgbe ewepụrụ plugin (tupu ehichapụ faịlụ) | `{ name, version, manifest }` |

## Ihe atụ

### Rịọ Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Oke oke

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

### Ihe ntụgharị nzaghachi

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
