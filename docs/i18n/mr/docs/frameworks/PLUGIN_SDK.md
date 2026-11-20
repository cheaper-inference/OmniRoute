# OmniRoute Plugin SDK (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## क्विक स्टार्ट

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

## API संदर्भ

### `definePlugin(def: PluginDefinition): Plugin`

फॅक्टरी फंक्शन जे डीफॉल्टसह प्लगइन ऑब्जेक्ट तयार करते.

**पॅरामीटर्स:**

- कबाब-केसमध्ये`name` (स्ट्रिंग, आवश्यक) — प्लगइनचे नाव
- `priority` (संख्या, पर्यायी, डीफॉल्ट: 100) — लोअर प्रथम धावते
- `enabled` (बूलियन, पर्यायी, डीफॉल्ट: सत्य) — प्रारंभ सक्षम?
- `onRequest` (फंक्शन, पर्यायी) — चॅट हँडलरच्या आधी चालते
- `onResponse` (कार्य, पर्यायी) — चॅट हँडलर नंतर चालते
- `onError` (फंक्शन, पर्यायी) — हँडलर त्रुटीवर चालते

### `blockRequest(response?): BlockingHookResult`

विनंती अवरोधित करा आणि वैकल्पिकरित्या सानुकूल प्रतिसाद परत करा.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

प्रदात्यापर्यंत पोहोचण्यापूर्वी विनंती मुख्य भाग सुधारित करा.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

विनंती संदर्भाशी मेटाडेटा संलग्न करा.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## प्लगइन संदर्भ (`PluginContext`)

| फील्ड        | प्रकार                    | वर्णन                             |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | अद्वितीय विनंती ओळखकर्ता          |
| `model`      | `string`                  | मॉडेल नावाची विनंती केली          |
| `provider`   | `string`                  | लक्ष्य प्रदाता ID                 |
| `body`       | `Record<string, unknown>` | विनंती शरीर                       |
| `headers`    | `Record<string, string>`  | शीर्षलेखांची विनंती करा (टीप पहा) |
| `metadata`   | `Record<string, unknown>` | बदलण्यायोग्य मेटाडेटा             |
| `timestamp`  | `number`                  | टाइमस्टॅम्पची विनंती करा          |
| `apiKeyInfo` | `object` (पर्यायी)        | API की मेटाडेटा (टीप पहा)         |

संदर्भ कधीही क्लायंटची क्रेडेन्शियल ठेवत नाही: `authorization`, `x-api-key`, `proxy-authorization` आणि `cookie` शीर्षलेख काढून टाकले जातात (कोणतेही आवरण), आणि `apiKeyInfo` कीचा मेटाडेटा (जसे की `id`, `name` आणि `scopes`) ठेवते परंतु की मूल्य किंवा त्याचे फिंगरप्रिंट (`redactPluginContext()` ) ठेवत `src/lib/plugins/hooks.ts`. हे `onRequest`, `onResponse` आणि `onError` वर लागू होते.

## मॅनिफेस्ट (`plugin.json`)

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

### हुक प्राधान्य

हुक प्राधान्यानुसार कॉन्फिगर करता येतात (कमी मूल्य = प्रथम चालते):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

किंवा साध्या boolean मूल्यांच्या स्वरूपात (डीफॉल्ट प्राधान्य 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## परवानगी प्रणाली

प्लगइन्स आहेत** सँडबॉक्स केलेले नाही** . प्रत्येक सक्रिय प्लगइन एक स्वतंत्र, सामान्य Node.js चाइल्ड प्रोसेस ( `src/lib/plugins/loader.ts` मध्ये`loadPlugin()` ) OmniRoute सारख्या ऑपरेटिंग-सिस्टम वापरकर्त्याच्या अंतर्गत चालते, कोणतेही VM संदर्भ आणि कोणतेही Node.js परवानगी ध्वज नाही. प्लगइन कोड `node:fs`, `node:child_process`, `fetch` आणि इतर प्रत्येक Node.js API वापरू शकतो: तो OmniRoute वापरकर्ता (डेटा निर्देशिकेसह) कोणतीही फाईल वाचू आणि लिहू शकतो, प्रोग्राम चालवू शकतो आणि नेटवर्कपर्यंत पोहोचू शकतो.

मॅनिफेस्टचा `requires.permissions` `network`, `file-read`, `file-write`, `env` आणि `exec` स्वीकारतो, परंतु आज रनटाइमवर फक्त `env` प्रभाव आहे:

| परवानगी                                      | आज प्रभाव                                                                                                                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | प्लगइन प्रक्रियेला `PORT`, `HOSTNAME`, `TZ` आणि `TMPDIR` देखील प्राप्त होते. त्याशिवाय, ते फक्त `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` आणि `PLUGIN_NAME` (अधिक Windows वर `SystemRoot` आणि `windir` ) प्राप्त करते. |
| `network`, `file-read`, `file-write`, `exec` | काहीही नाही. ते फक्त घोषणा आहेत: ते गहाळ असताना काहीही अवरोधित केलेले नाही.                                                                                                                                                                       |

प्लगइन स्थापित करणे हे होस्टवर इतर कोणताही प्रोग्राम स्थापित करण्यासारखे आहे. तुम्हाला विश्वास असल्याचे स्त्रोत केवळ प्लगइन स्थापित करा.

## कॉन्फिग स्कीमा

कॉन्फिगर करता येणाऱ्या सेटिंग्ज `configSchema` मध्ये परिभाषित करा:

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

फील्ड प्रकार: `string`, `number`, `boolean`, `select`

फील्ड पर्याय: `default`, `min`, `max`, `enum`, `description`

कॉन्फिग मूल्ये डेटाबेसमध्ये कायम ठेवली जातात आणि डॅशबोर्डच्या कॉन्फिग पृष्ठाद्वारे उपलब्ध असतात.

## अंगभूत इव्हेंट्स

| इव्हेंट           | केव्हा                                          | पेलोड                         |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | चॅट हँडलरपूर्वी                                 | विनंती संदर्भ                 |
| `onResponse`      | चॅट हँडलरनंतर                                   | प्रतिसाद डेटा                 |
| `onError`         | हँडलर त्रुटी आल्यावर                            | त्रुटी ऑब्जेक्ट               |
| `onModelSelect`   | रूटिंगसाठी मॉडेल निवडल्यावर                     | मॉडेल माहिती                  |
| `onComboResolve`  | कॉम्बो रूटिंग निश्चित झाल्यावर                  | कॉम्बो लक्ष्ये                |
| `onRateLimit`     | दरमर्यादा गाठल्यावर                             | मर्यादा माहिती                |
| `onQuotaExhaust`  | कोटा संपल्यावर                                  | कोटा माहिती                   |
| `onProviderError` | प्रदात्याने त्रुटी परत केल्यावर                 | त्रुटीचे तपशील                |
| `onStreamStart`   | SSE प्रवाह सुरू झाल्यावर                        | प्रवाह माहिती                 |
| `onStreamEnd`     | SSE प्रवाह संपल्यावर                            | प्रवाह आकडेवारी               |
| `onInstall`       | प्लगइन स्थापित झाल्यावर                         | `{ name, version, manifest }` |
| `onActivate`      | प्लगइन सक्रिय झाल्यावर                          | `{ name, version, manifest }` |
| `onDeactivate`    | प्लगइन निष्क्रिय झाल्यावर                       | `{ name, version, manifest }` |
| `onUninstall`     | प्लगइन विस्थापित झाल्यावर (फायली हटवण्यापूर्वी) | `{ name, version, manifest }` |

## उदाहरणे

### लॉगरची विनंती करा

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### रेट लिमिटर

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

### प्रतिसाद ट्रान्सफॉर्मर

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
