# OmniRoute Plugin SDK (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## త్వరిత ప్రారంభం

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

## API సూచన

### `definePlugin(def: PluginDefinition): Plugin`

డిఫాల్ట్లతో ప్లగిన్ ఆబ్జెక్ట్ని సృష్టించే ఫ్యాక్టరీ ఫంక్షన్.

**పారామితులు:**

- `name` (స్ట్రింగ్, అవసరం) — కబాబ్-కేస్లో ప్లగిన్ పేరు
- `priority` (సంఖ్య, ఐచ్ఛికం, డిఫాల్ట్: 100) — దిగువ మొదట పరుగులు
- `enabled` (బూలియన్, ఐచ్ఛికం, డిఫాల్ట్: నిజం) — ప్రారంభించబడిందా?
- `onRequest` (ఫంక్షన్, ఐచ్ఛికం) — చాట్ హ్యాండ్లర్కు ముందు నడుస్తుంది
- `onResponse` (ఫంక్షన్, ఐచ్ఛికం) — చాట్ హ్యాండ్లర్ తర్వాత రన్ అవుతుంది
- `onError` (ఫంక్షన్, ఐచ్ఛికం) — హ్యాండ్లర్ లోపంపై రన్ అవుతుంది

### `blockRequest(response?): BlockingHookResult`

అభ్యర్థనను బ్లాక్ చేయండి మరియు ఐచ్ఛికంగా అనుకూల ప్రతిస్పందనను అందించండి.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

రిక్వెస్ట్ బాడీ ప్రొవైడర్కి చేరేలోపు దాన్ని సవరించండి.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

అభ్యర్థన సందర్భానికి మెటాడేటాను అటాచ్ చేయండి.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ప్లగిన్ సందర్భం (`PluginContext`)

| ఫీల్డ్       | టైప్ చేయండి               | వివరణ                             |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | ప్రత్యేక అభ్యర్థన ఐడెంటిఫైయర్     |
| `model`      | `string`                  | మోడల్ పేరు అభ్యర్థించబడింది       |
| `provider`   | `string`                  | టార్గెట్ ప్రొవైడర్ ID             |
| `body`       | `Record<string, unknown>` | శరీరాన్ని అభ్యర్థించండి           |
| `headers`    | `Record<string, string>`  | అభ్యర్థన శీర్షికలు (గమనిక చూడండి) |
| `metadata`   | `Record<string, unknown>` | మార్చగల మెటాడేటా                  |
| `timestamp`  | `number`                  | సమయముద్రను అభ్యర్థించండి          |
| `apiKeyInfo` | `object` (ఐచ్ఛికం)        | API కీ మెటాడేటా (గమనిక చూడండి)    |

సందర్భం ఎప్పుడూ క్లయింట్ యొక్క ఆధారాలను కలిగి ఉండదు: `authorization`, `x-api-key`, `proxy-authorization` మరియు `cookie` హెడర్లు తీసివేయబడతాయి (ఏదైనా కేసింగ్), మరియు `apiKeyInfo` కీ యొక్క మెటాడేటాను ( `id`, `name` మరియు `scopes` వంటివి) ఉంచుతుంది కానీ కీ విలువ లేదా దాని వేలిముద్ర కాదు (`redactPluginContext()` `src/lib/plugins/hooks.ts`). ఇది `onRequest`, `onResponse` మరియు `onError` లకు వర్తిస్తుంది.

## మానిఫెస్ట్ (`plugin.json`)

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

### హుక్ ప్రాధాన్యత

హుక్లను ప్రాధాన్యతతో కాన్ఫిగర్ చేయవచ్చు (తక్కువ విలువ = ముందుగా అమలవుతుంది):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

లేదా సాధారణ boolean విలువలుగా (డిఫాల్ట్ ప్రాధాన్యత 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## అనుమతి వ్యవస్థ

ప్లగిన్లు ఉన్నాయి** శాండ్బాక్స్ లేదు** . ప్రతి యాక్టివ్ ప్లగ్ఇన్ VM సందర్భం మరియు Node.js అనుమతి ఫ్లాగ్లు లేకుండా OmniRoute వలె అదే ఆపరేటింగ్-సిస్టమ్ వినియోగదారు క్రింద ప్రత్యేక, సాధారణ Node.js చైల్డ్ ప్రాసెస్ ( `src/lib/plugins/loader.ts` లో`loadPlugin()` ) వలె నడుస్తుంది. ప్లగిన్ కోడ్ `node:fs`, `node:child_process`, `fetch` మరియు ప్రతి ఇతర Node.js API ఉపయోగించవచ్చు: ఇది OmniRoute వినియోగదారు (డేటా డైరెక్టరీతో సహా) చేయగలిగిన ఏదైనా ఫైల్ను చదవగలదు మరియు వ్రాయగలదు, ప్రోగ్రామ్లను అమలు చేసి నెట్వర్క్కు చేరుకుంటుంది.

మానిఫెస్ట్ యొక్క `requires.permissions` `network`, `file-read`, `file-write`, `env` మరియు `exec` అంగీకరిస్తుంది, కానీ నేడు రన్టైమ్లో `env` మాత్రమే ప్రభావం చూపుతుంది:

| అనుమతి                                       | ఈరోజు ప్రభావం                                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). |
| `network`, `file-read`, `file-write`, `exec` | ఏదీ లేదు. అవి ప్రకటనలు మాత్రమే: అవి తప్పిపోయినప్పుడు ఏదీ నిరోధించబడదు.                                                                                                                                                                   |

ప్లగిన్ను ఇన్స్టాల్ చేయడం అనేది హోస్ట్లో ఏదైనా ఇతర ప్రోగ్రామ్ను ఇన్స్టాల్ చేయడం లాంటిది. మీరు విశ్వసించే ప్లగిన్లను మాత్రమే ఇన్స్టాల్ చేయండి.

## కాన్ఫిగ్ స్కీమా

కాన్ఫిగర్ చేయగల సెట్టింగ్లను `configSchema`లో నిర్వచించండి:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "బాహ్య API కీ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ఫీల్డ్ రకాలు: `string`, `number`, `boolean`, `select`

ఫీల్డ్ ఎంపికలు: `default`, `min`, `max`, `enum`, `description`

కాన్ఫిగ్ విలువలు డేటాబేస్లో నిల్వ చేయబడతాయి మరియు డ్యాష్బోర్డ్ కాన్ఫిగ్ పేజీ ద్వారా యాక్సెస్ చేయవచ్చు.

## అంతర్నిర్మిత ఈవెంట్లు

| ఈవెంట్            | ఎప్పుడు                                                         | పేలోడ్                        |
| ----------------- | --------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | చాట్ హ్యాండ్లర్కు ముందు                                         | అభ్యర్థన సందర్భం              |
| `onResponse`      | చాట్ హ్యాండ్లర్ తర్వాత                                          | ప్రతిస్పందన డేటా              |
| `onError`         | హ్యాండ్లర్ లోపం సంభవించినప్పుడు                                 | లోపం ఆబ్జెక్ట్                |
| `onModelSelect`   | రూటింగ్ కోసం మోడల్ ఎంపికైనప్పుడు                                | మోడల్ సమాచారం                 |
| `onComboResolve`  | కాంబో రూటింగ్ పరిష్కరించబడినప్పుడు                              | కాంబో లక్ష్యాలు               |
| `onRateLimit`     | రేట్ పరిమితిని చేరుకున్నప్పుడు                                  | పరిమితి సమాచారం               |
| `onQuotaExhaust`  | కోటా పూర్తిగా వినియోగించబడినప్పుడు                              | కోటా సమాచారం                  |
| `onProviderError` | ప్రొవైడర్ లోపాన్ని తిరిగి ఇచ్చినప్పుడు                          | లోపం వివరాలు                  |
| `onStreamStart`   | SSE స్ట్రీమ్ ప్రారంభమైనప్పుడు                                   | స్ట్రీమ్ సమాచారం              |
| `onStreamEnd`     | SSE స్ట్రీమ్ ముగిసినప్పుడు                                      | స్ట్రీమ్ గణాంకాలు             |
| `onInstall`       | ప్లగిన్ ఇన్స్టాల్ చేయబడినప్పుడు                                 | `{ name, version, manifest }` |
| `onActivate`      | ప్లగిన్ యాక్టివేట్ చేయబడినప్పుడు                                | `{ name, version, manifest }` |
| `onDeactivate`    | ప్లగిన్ డీయాక్టివేట్ చేయబడినప్పుడు                              | `{ name, version, manifest }` |
| `onUninstall`     | ప్లగిన్ అన్ఇన్స్టాల్ చేయబడినప్పుడు (ఫైల్లు తొలగించడానికి ముందు) | `{ name, version, manifest }` |

## ఉదాహరణలు

### రిక్వెస్ట్ లాగర్

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### రేటు పరిమితి

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

### ప్రతిస్పందన ట్రాన్స్ఫార్మర్

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
