# OmniRoute Plugin SDK (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Tús Tapa

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

## Tagairt API

### `definePlugin(def: PluginDefinition): Plugin`

Feidhm mhonarcha a chruthaíonn réad Breiseán le réamhshocruithe.

**Paraiméadair:**

- `name` (teaghrán, riachtanach) — Ainm an bhreiseáin sa chás ceibeab
- `priority` (uimhir, roghnach, réamhshocraithe: 100) — Ritheann níos ísle ar dtús
- `enabled` (boolean, roghnach, réamhshocraithe: fíor) — Tosaigh cumasaithe?
- `onRequest` (feidhm, roghnach) — Ritheann sé roimh an láimhseálaí comhrá
- `onResponse` (feidhm, roghnach) — Ritheann tar éis an láimhseálaí comhrá
- `onError` (feidhm, roghnach) — Ritheann sé ar earráid láimhseálaí

### `blockRequest(response?): BlockingHookResult`

Cuir bac ar an iarratas agus seol freagra saincheaptha ar ais go roghnach.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Déan an comhlacht iarratais a mhodhnú sula sroicheann sé an soláthraí.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Ceangail meiteashonraí le comhthéacs an iarratais.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Comhthéacs an Bhreiseáin (`PluginContext`)

| Réimse       | Cineál                    | Cur síos                               |
| ------------ | ------------------------- | -------------------------------------- |
| `requestId`  | `string`                  | Aitheantóir iarratais uathúil          |
| `model`      | `string`                  | Ainm múnla iarrtha                     |
| `provider`   | `string`                  | Soláthraí sprice ID                    |
| `body`       | `Record<string, unknown>` | Comhlacht iarratais                    |
| `headers`    | `Record<string, string>`  | Ceanntásca iarratais (féach nóta)      |
| `metadata`   | `Record<string, unknown>` | Meiteashonraí mutable                  |
| `timestamp`  | `number`                  | Stampa ama iarratais                   |
| `apiKeyInfo` | `object` (roghnach)       | meiteashonraí eochair API (féach nóta) |

Ní iompraíonn an comhthéacs dintiúir an chliaint riamh: baintear na ceanntásca `authorization`, `x-api-key`, `proxy-authorization` agus `cookie` (aon chásáil), agus coinníonn `apiKeyInfo` meiteashonraí na heochrach (ar nós `id`, `name` agus `scopes`) ach ní an eochairluach ná a méarlorg (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Baineann sé seo le `onRequest`, `onResponse` agus `onError`.

## Lastliosta (`plugin.json`)

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

### Tosaíocht na gCrúcaí

Is féidir crúcaí a chumrú le tosaíocht (luach níos ísle = ritheann sé ar dtús):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Nó mar luachanna simplí boolean (tosaíocht réamhshocraithe 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Córas Ceada

Tá breiseáin** ní sandboxed** . Ritheann gach breiseán gníomhach mar ghnáthphróiseas linbh Node.js ar leith (`loadPlugin()` in `src/lib/plugins/loader.ts`) faoin úsáideoir córais oibriúcháin céanna le OmniRoute, gan comhthéacs VM agus gan aon bhratacha cead Node.js. Is féidir le cód breiseán `node:fs`, `node:child_process`, `fetch` agus gach ceann eile Node.js API a úsáid : is féidir leis aon chomhad a léamh agus a scríobh is féidir leis an úsáideoir OmniRoute (lena n-áirítear an t-eolaire sonraí), cláir a reáchtáil agus an líonra a bhaint amach.

Glacann `requires.permissions` an fhoriomláin `network`, `file-read`, `file-write`, `env` agus `exec`, ach inniu níl ach éifeacht ag `env` ag am rite:

| Cead                                         | Éifeacht inniu                                                                                                                                                                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Faigheann an próiseas breiseán freisin `PORT`, `HOSTNAME`, `TZ` agus `TMPDIR`. Gan é, ní fhaigheann sé ach `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` agus `PLUGIN_NAME` ( móide `SystemRoot` agus `windir` ar Windows). |
| `network`, `file-read`, `file-write`, `exec` | Dada. Is dearbhuithe amháin iad: ní chuirtear bac ar aon rud nuair a bhíonn siad in easnamh.                                                                                                                                                       |

Is ionann breiseán a shuiteáil agus aon chlár eile a shuiteáil ar an óstach. Suiteáil forlíontáin a bhfuil muinín agat as a bhfoinse amháin.

## Scéimre Cumraíochta

Sainigh socruithe inchumraithe in `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Eochair API sheachtrach" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Cineálacha réimsí: `string`, `number`, `boolean`, `select`

Roghanna réimsí: `default`, `min`, `max`, `enum`, `description`

Coimeádtar luachanna cumraíochta sa bhunachar sonraí agus tá siad inrochtana trí leathanach cumraíochta an deais.

## Imeachtaí Insuite

| Imeacht           | Cathain                                                    | Pálasta                       |
| ----------------- | ---------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Roimh láimhseálaí an chomhrá                               | Comhthéacs an iarratais       |
| `onResponse`      | Tar éis láimhseálaí an chomhrá                             | Sonraí an fhreagra            |
| `onError`         | Nuair a tharlaíonn earráid láimhseálaí                     | Réad earráide                 |
| `onModelSelect`   | Nuair a roghnaítear samhail don ródú                       | Faisnéis faoin tsamhail       |
| `onComboResolve`  | Nuair a réitítear ródú teaglama                            | Spriocanna teaglama           |
| `onRateLimit`     | Nuair a shroichtear teorainn an ráta                       | Faisnéis faoin teorainn       |
| `onQuotaExhaust`  | Nuair a ídítear an cuóta                                   | Faisnéis faoin gcuóta         |
| `onProviderError` | Nuair a thugann an soláthraí earráid ar ais                | Sonraí na hearráide           |
| `onStreamStart`   | Nuair a thosaíonn sruth SSE                                | Faisnéis faoin sruth          |
| `onStreamEnd`     | Nuair a chríochnaíonn sruth SSE                            | Staitisticí an tsrutha        |
| `onInstall`       | Nuair a shuiteáiltear breiseán                             | `{ name, version, manifest }` |
| `onActivate`      | Nuair a ghníomhachtaítear breiseán                         | `{ name, version, manifest }` |
| `onDeactivate`    | Nuair a dhíghníomhachtaítear breiseán                      | `{ name, version, manifest }` |
| `onUninstall`     | Nuair a dhíshuiteáiltear breiseán (sula scriostar comhaid) | `{ name, version, manifest }` |

## Samplaí

### Logálaí Iarratas

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Teorantóir Rátaí

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

### Trasfhoirmeoir Freagra

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
